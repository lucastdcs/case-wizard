// =========================================================
// ARQUIVO: ContentSeed_Tips.gs
//
// Semeia o módulo "tips" da Central de Conteúdo a partir da aba Tips que já
// existe.
//
// Este é escrito à mão, e não gerado por script como os outros seeds: as dicas
// nunca moraram no código, moram numa planilha desde sempre. Não há literal em
// src/ para ler - a migração é de aba para aba, dentro do próprio Apps Script.
//
// COMO RODAR: no editor do Apps Script, escolha "seedTipsNow" no seletor de
// função e clique em Executar. Roda uma vez só; chamadas seguintes são
// ignoradas se o módulo já tiver itens no ar.
//
// A aba Tips NÃO é apagada. Fica como está, intocada: se algo der errado, o
// caminho de volta é reverter o código, não restaurar dado.
// =========================================================

function seedTipsNow() {
  const result = seedContentModule(buildTipsSeedPayload_());
  Logger.log(result);
  return result;
}

// Lê a aba Tips (coluna A, uma dica por linha, pulando o cabeçalho) e monta o
// payload no formato que seedContentModule espera.
function buildTipsSeedPayload_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_TIPS);
  const items = [];

  if (!sheet) return { module: 'tips', items: items };

  const raw = sheet.getDataRange().getValues();

  for (let i = 1; i < raw.length; i++) {
    const texto = String(raw[i][0] || "").trim();
    if (!texto) continue;

    items.push({
      key: 'geral',
      // As dicas de hoje não são marcadas por idioma - são frases curtas de
      // carregamento, escritas em PT. 'ALL' evita inventar uma classificação
      // que ninguém fez; quem quiser separar por idioma depois é só editar.
      lang: 'ALL',
      // Uma dica é o próprio conteúdo: não existe título separado. O label
      // serve pra listagem na tela, então recebe o mesmo texto.
      label: texto,
      value: texto,
      sortOrder: items.length
    });
  }

  return { module: 'tips', items: items };
}

// Serve a rota legada `op=tips`. Prioriza a Central; enquanto o módulo não for
// semeado, devolve a aba Tips como sempre devolveu.
//
// É isso que permite migrar sem coordenar deploy com a base instalada: quem
// ainda roda um bundle antigo continua funcionando, e passa a ver o conteúdo
// gerenciado assim que a semeadura roda.
function getTipsForLegacyEndpoint(ss) {
  try {
    const doCentral = readContentRows_(SHEET_CONTENT_ITEMS)
      .filter(function (r) {
        return String(r.Module).trim() === 'tips' && String(r.Status).trim() === CONTENT_STATUS.LIVE;
      })
      .sort(function (a, b) { return (Number(a.Sort_Order) || 0) - (Number(b.Sort_Order) || 0); })
      .map(function (r) { return String(r.Value || "").trim(); })
      .filter(function (t) { return t; });

    if (doCentral.length) return doCentral;
  } catch (e) {
    // Central indisponível por qualquer motivo: cai pro comportamento antigo.
  }

  const sheet = (ss || SpreadsheetApp.getActiveSpreadsheet()).getSheetByName(SHEET_TIPS);
  if (!sheet) return [];

  const raw = sheet.getDataRange().getValues();
  const tips = [];
  for (let i = 1; i < raw.length; i++) {
    if (raw[i][0]) tips.push(raw[i][0]);
  }
  return tips;
}
