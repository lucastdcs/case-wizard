// =========================================================
// ARQUIVO: ContentSeed_Broadcast.gs
//
// Migra os avisos da aba "Broadcast" para o módulo `broadcast` da Central de
// Conteúdo, e serve a rota legada `op=broadcast` a partir da Central.
//
// Escrito à mão, e não gerado por script, pelo mesmo motivo de
// ContentSeed_Tips.gs: os avisos nunca moraram no código. Moram numa planilha
// desde sempre, então não há literal em src/ para um gerador ler - a migração
// é de aba para aba, dentro do próprio Apps Script.
//
// COMO RODAR: no editor do Apps Script, escolha "seedBroadcastNow" no seletor
// de função e clique em Executar. Roda uma vez só; chamadas seguintes são
// ignoradas se o módulo já tiver itens no ar.
//
// A aba Broadcast NÃO é apagada. Fica como está, intocada: se algo der errado,
// o caminho de volta é reverter o código, não restaurar dado.
//
// O QUE NÃO VEM JUNTO: os avisos de "Disponibilidade BAU". Eles viram o módulo
// `bau_availability`, que guarda datas em campos próprios em vez de texto
// livre - e as datas do texto antigo só existem como prosa ("disponibilidade
// para 15/09, com melhor disponibilidade para 22/09"). Extrair isso de volta
// exigiria a mesma adivinhação por regex que a mudança existe para eliminar, e
// erraria. A disponibilidade corrente é publicada uma vez pela tela da Central,
// que leva menos de um minuto e nasce certa.
// =========================================================

// Índices das colunas da aba Broadcast, na ordem em que new_broadcast as
// escrevia: ID, Date, Type, Title, Text, Author, Active.
const BROADCAST_COL = { ID: 0, DATE: 1, TYPE: 2, TITLE: 3, TEXT: 4, AUTHOR: 5, ACTIVE: 6 };

// Como o widget antigo achava o aviso de disponibilidade. Reproduzido aqui só
// para EXCLUIR essas linhas da migração - é o último lugar do projeto onde essa
// heurística aparece.
const BROADCAST_BAU_TITLE_MARKER = 'disponibilidade bau';

function seedBroadcastNow() {
  const result = seedContentModule(buildBroadcastSeedPayload_());
  Logger.log(result);
  return result;
}

// Lê a aba Broadcast e monta o payload no formato que seedContentModule espera.
// Cada aviso vira um item cujo `value` é o registro composto em JSON, no mesmo
// padrão de email_template e note_template.
function buildBroadcastSeedPayload_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_BROADCAST);
  const items = [];

  if (!sheet) return { module: 'broadcast', items: items };

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const id = String(row[BROADCAST_COL.ID] || "").trim();
    if (!id) continue;

    // A aba usa uma coluna Active booleana como exclusão lógica: delete_broadcast
    // gravava false em vez de apagar a linha. Só o que estava no ar migra.
    const active = String(row[BROADCAST_COL.ACTIVE]).toUpperCase().trim();
    if (active !== 'TRUE' && active !== '1') continue;

    const title = String(row[BROADCAST_COL.TITLE] || "").trim();
    const text = String(row[BROADCAST_COL.TEXT] || "").trim();
    if (!title || !text) continue; // assertValidBroadcast_ recusaria depois.

    if (title.toLowerCase().indexOf(BROADCAST_BAU_TITLE_MARKER) !== -1) continue;

    items.push({
      key: id, // Preserva o ID antigo: é o que o localStorage de "lido" guarda.
      field: 'notice',
      lang: 'ALL',
      label: title,
      value: JSON.stringify({
        type: normalizeBroadcastType_(row[BROADCAST_COL.TYPE]),
        title: title,
        text: text,
        publishedAt: normalizeBroadcastDate_(row[BROADCAST_COL.DATE]),
        author: String(row[BROADCAST_COL.AUTHOR] || "").trim()
      }),
      sortOrder: i
    });
  }

  return { module: 'broadcast', items: items };
}

// Mesma normalização que getSheetData() fazia em Código.js: a coluna Type foi
// preenchida à mão ao longo do tempo e tem "Alerta", "critical", "Sucesso" e
// variações. Um tipo desconhecido cai em 'info' em vez de quebrar a migração.
function normalizeBroadcastType_(raw) {
  const type = String(raw || "").toLowerCase().trim();
  if (type.indexOf('alerta') !== -1 || type.indexOf('critical') !== -1) return 'critical';
  if (type.indexOf('sucesso') !== -1 || type.indexOf('success') !== -1) return 'success';
  return 'info';
}

function normalizeBroadcastDate_(raw) {
  if (raw instanceof Date) {
    return Utilities.formatDate(raw, Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss");
  }
  return String(raw || "").trim();
}

// =========================================================
//  ROTA LEGADA
// =========================================================

/**
 * Serve `op=broadcast` a partir da Central, no formato que o bundle antigo
 * espera. Mesma estratégia de getTipsForLegacyEndpoint(): as duas versões do
 * app leem a MESMA fonte durante a transição, então editar pela Central vale
 * para quem já recarregou e para quem ainda está com o bundle em cache.
 *
 * Não devolve o módulo bau_availability: bundle antigo não sabe o que fazer
 * com ele, e o widget de disponibilidade daquela versão continua vazio até a
 * pessoa recarregar. É a degradação certa - melhor um widget ausente do que um
 * aviso solto no feed com datas em prosa.
 */
function getBroadcastForLegacyEndpoint(ss) {
  try {
    const doCentral = readContentRows_(SHEET_CONTENT_ITEMS)
      .filter(function (r) {
        return String(r.Module).trim() === 'broadcast' && String(r.Status).trim() === CONTENT_STATUS.LIVE;
      })
      .map(function (r) {
        let parsed = {};
        try { parsed = JSON.parse(String(r.Value || "{}")); } catch (e) { parsed = {}; }

        return {
          id: String(r.Key || r.ID || "").trim(),
          date: String(parsed.publishedAt || r.Published_At || ""),
          type: normalizeBroadcastType_(parsed.type),
          title: String(parsed.title || r.Label || ""),
          text: String(parsed.text || ""),
          author: String(parsed.author || r.Published_By || ""),
          active: true
        };
      })
      .filter(function (m) { return m.title && m.text; })
      // Mais novo primeiro, que é o que o `data.reverse()` da rota antiga fazia
      // por acidente da ordem de escrita na aba. Aqui é explícito.
      .sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });

    if (doCentral.length) return doCentral;
  } catch (e) {
    // Central indisponível por qualquer motivo: cai pro comportamento antigo.
  }

  const sheet = (ss || SpreadsheetApp.getActiveSpreadsheet()).getSheetByName(SHEET_BROADCAST);
  return getSheetData(sheet);
}
