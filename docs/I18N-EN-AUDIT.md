# Auditoria de usabilidade em inglês

**Data**: 2026-10-29 · **Base**: `refactor-structure` @ `d5ed21c` · **Status**: levantamento, nenhuma linha de código alterada.

Pedido: achar tudo que ainda não funciona em EN e avaliar a mudança. Dois relatos do Lucas
abriram a auditoria — a splash sai em PT com a ferramenta em EN, e um atalho do Ctrl+K
"traduz de volta" os inputs para PT. Ambos reproduzidos e com causa raiz abaixo.

> **Histórico.** A primeira passada rodou sobre `ad53768` (v6.5.0). Enquanto ela corria, a
> remota recebeu 17 commits de uma rodada de i18n (`df1b796`, `4ebc329`, `afd4c34`,
> `95336f3`, `63b8106`, `759735c`, `d864d03`…). Este documento foi **reverificado inteiro**
> contra `d5ed21c`: cada item abaixo foi reexecutado ou relido nesse código. O que a rodada
> já resolveu está na seção B, para ninguém refazer.

## Como foi levantado (e o que isso não cobre)

| Método | O que pega | Limite |
|---|---|---|
| Scanner estático de strings PT/ES fora de blocos `pt:`/`es:`/`en:` | texto cravado em código | usa lista de palavras: tem lacuna de recall (na 1ª passada não pegou `Preencher no CRM`) |
| Rastreio no Chromium (mock) com EN/EN, **diff PT×EN do DOM** | tudo que renderiza e não muda ao trocar o idioma | só estados sem rede: Links/Biblioteca/Avisos vazios, diálogos e toasts não abertos |
| Execução dos dados (cenários, e-mails, links, call script) | cobertura EN do conteúdo embutido | só o embutido, não o publicado na Central |
| Probes dirigidos | atalho, palette, publicação parcial | — |

Por que o `test:i18n` ficou verde com tudo isto aberto: ele só olha dicionários
`const X = { pt, es, en }`. A rodada nova já fechou uma lacuna (agora reprova `X_ES` sem
`X_EN`; 6 pares). Seguem invisíveis a ele: ternários `getLanguage() === 'es' ? … : base`,
string cravada sem dicionário e objeto `{PT, ES}` maiúsculo (o EN vira `undefined || ""`:
título **em branco**, não PT). Chaves penduradas: **0**.

## A. Defeitos que gravam o idioma errado no caso — **abertos, reverificados**

Atingem ES também, não só EN. São o que importa primeiro.

| # | Onde | O que acontece | Esforço |
|---|---|---|---|
| A1 | `notes/core/notes-state.js:13` | `reset()` faz `currentLang = "pt"`; nada reaplica `getOutputLanguage()`. `resetModule()` (`notes-assistant.js:815`) roda em **Limpar** (`:689`), **guardar rascunho** (`:143`), **depois de inserir a nota** (`:777`) e em **todo atalho do Ctrl+K** (`:992`). Só a 1ª nota da sessão sai no idioma certo; as seguintes, em PT. **Reproduzido em `d5ed21c`**, EN/EN e ES/ES: `Context/What was done:` → `Contexto/O que foi feito:`; corpo `Fiz a primeira tentativa de ligação…`. | S — tirar `currentLang` do `reset()` (mesmo raciocínio do `visible`, comentado na linha 4) |
| A2 | `notes/core/output-generator.js:140`, `:57` | Rodapé `<i>Nota criada através do Cases Wizard.</i>` e fallback `'Evidência'` cravados em PT: vão para o CRM em toda nota EN/ES. | S |
| A3 | `notes/precall/precall-data.js:69` | `FOOTER = 'Gerado pelo Cases Wizard'`. A regra (`_MASTER_RULEBOOK` §4, ADR-0018) diz que o Pre-call sai **sempre em inglês**. | S |
| A4 | `notes/data/note-templates-service.js:94-98` | Se a Central tem o EN de **alguns** cenários, o espelho EN é **trocado inteiro** (`delete` + `assign`). **Reproduzido em `d5ed21c`**: `SCENARIO_EN` 27 → 1 ao publicar 1 cenário; 26 passam a sair em PT para todo agente EN. Gatilho realista enquanto o `seedMissingLangsNow()` não rodar em produção (PLAN → Waiting). Vale igual para ES. | S — mesclar por id em vez de substituir |
| A5 | `email-assistant/email-automation-service.js:627` | `[MM/DD/YYYY]` preenchido com `toLocaleDateString('pt-BR')` (dd/mm/aaaa) em e-mail ao anunciante, qualquer idioma. | S — locale pelo `getOutputLanguage()` |
| A6 | `call-script/call-script-assistant.js:148-152`, `:697` | `GROUP_TITLES[g][csaCurrentLang] \|\| ""` só tem `PT`/`ES`: em EN os títulos dos cartões ficam **em branco**. (Lido no código; o mock não abre o roteiro.) | S |

## B. Já resolvido pela rodada `d5ed21c` (verificado no código e no DOM; não refazer)

BAU Form em EN (campos, opções, tooltips; sobra só o C7) · nomes de país/cidade dos
fusos, no Timezone e no seletor do BAU Form · rótulos dos atalhos padrão do Ctrl+K (`2 Day
Rule (Start/End)`) · Email Assistant (`Preencher no CRM`, estados vazios, dica do Smart CR)
· Split & Transfer e seletor de tasks · toasts do Case Notes (`Preencha o campo…`,
`Sessão restaurada!`…) · `notes-bridge`, `utils.js` (`Eliminar/Excluir`) e `wizard-shell`
("criado por") · erro fatal do `app.js` · mensagem de erro da Biblioteca · repintura na troca
de idioma · guarda `X_ES` sem `X_EN` no `test:i18n`.

## C. Interface do agente — ainda aberto

| # | Onde | Estado | Esforço |
|---|---|---|---|
| C1 | `shared/page-data.js:139-182`, `utils.js:847` | **Splash**: prefixo, 15 frases, `🎉 Sextou!` e fallback `'Consultor'` sem idioma — PT até para ES. Observado em EN/EN: `Boa noite, Jules  Excelente dedicação.` Ordem: `playStartupAnimation()` (`app.js:87`) roda **antes** do perfil aplicar o idioma (`:154`, +2,5 s); escolha manual já vale (vem do `localStorage` no import), mas quem depende só do perfil veria a splash no idioma errado mesmo traduzida. | M — dicionário + decidir de onde sai o idioma antes do perfil |
| C2 | `shared/command-palette.js` `:165`, `:182-191`, `:200`, `:304` | **Ctrl+K**: 11 das 12 linhas com `hint` em PT (**observado**; só o Pre-call tem EN); rótulos `Central de Links`, `Minha Biblioteca`, `Fusos Horários`, `Avisos`, `Configurações` fixos; a busca (`:200`) indexa `hint.pt`/`hint.es`, não `hint.en`. | S |
| C3 | `shared/utils.js:1055-1083`, `bau-form-assistant.js:1706`, `timezone-assistant.js:497, 691` | **Datas/horas**: `formatToLocalUserDate` = `pt-BR` + `" às "` + `"Data indisponível"` (usada no detalhe do BAU Form: `:952, 963, 997`); eco do horário em `pt-BR`; Timezone usa `'es-ES' : 'pt-BR'` (EN cai em pt-BR). | S |
| C4 | `email-automation-service.js:455, 596` | aviso flutuante no CRM: `Atenção: Verifique se o e-mail do AM deve estar em cópia.` | S |
| C5 | `notes/components/step-tasks.js:~889` | aviso `Os screenshots seguem as diretrizes atuais do Win Criteria…` | S |
| C6 | `email-assistant/email-data.js` (`reschedule2`, EN) | EN só traduz `[Seu Nome]`: rótulos `Data 1…3`/`Hora 1…3` ficam em PT (o ES traduz). | S |
| C7 | `bau-form-assistant.js:774`, `bau-form-config.js:94` | erro do CID `Formato de CID incorreto` em PT no EN (o `FIELD_EN` cobre o resto). | S |
| C8 | `personal-library/personal-library-assistant.js:684`, `snippet-service.js:59` | `Mídia`, `Sem título` | S |
| C9 | `shared/data-service.js:130, 150, 339, 363, 406`, `gas-backend/BAU_API.js` | erros técnicos/mensagens do servidor; chegam ao agente via `bau-form-assistant.js:2112` (`errorPrefix(error.message)`). | S–M |
| C10 | `shared/command-center.js:779` | tooltip do selo DEV (só build dev) | baixa |

Neutro, fora do escopo: `email-automation-service.js` `log()` (console), nomes de Canned
Response do CRM (`:519`), rótulos de `crm-labels.js` (casam com a tela do CRM), seletor
trilíngue do onboarding (`onboarding-wizard.js:228`, intencional).

## D. Backend — **intocado pela rodada nova** (só `DashReleaseNotes.js`)

| Superfície | Estado | Esforço |
|---|---|---|
| TL Dashboard (`TLDashboard.html`) | `pt/es/en` ok; ~8 strings JS cravadas: `:1805` (frases de sexta), `Sem ID`, `Erro ao sincronizar com o servidor`, toasts de decisão (`Caso mantido ativo`), `agora mesmo`, `agente desconhecido`/`solicitado por`. O resumo copiável tem EN. | S |
| `Código.js` | rodapé das telas (`Reportar bug ou sugestão`, `criado por`, `IMPLANTAÇÃO DESCONHECIDA`), títulos de página | S |
| `BAU_API.js`, `BAU_Dashboard.js` | mensagens de sucesso/erro em PT (14) | S–M (código de erro + dicionário no cliente, ou idioma no pedido) |
| `BAU_Alerts.js` | e-mail do alerta de fila só PT; destinatário fixo `lucaste` | baixa |
| `EmailEngine.js` | `pt/es/en` ok | — |
| **Central de Conteúdo** | shell traduzido (fase 1 do ADR-0017); fora de dicionário: `Catalog` 155 · `Governance` 97 · `Ops` 85 · `ContentDashboard.html` 84 · `Core` 65 ≈ **490 strings**, + mensagens de `ContentAPI.js` (195) e `PeopleAPI.js` (19). `ContentDashboard_Ops.html:15` `BC_LANG_LABEL` sem EN. | L — já planejado (ADR-0017, fases 2–4); público SME/maintainer |

## E. "Não deixar notas de outro idioma serem reutilizadas"

Leitura adotada (**a confirmar**): uma nota sai 100% no idioma do atendimento; quando faltar a
versão nesse idioma, a ferramenta **diz** em vez de usar PT em silêncio; nada guardado em um
idioma é reaplicado em outro.

| Vetor | Hoje | Proposta |
|---|---|---|
| Reset volta a PT | A1 | corrigir |
| Fallback silencioso para PT | `getScenarioFields` (`notes-data.js:698`), `getEmailTemplate` (`email-data.js:251`), A4, seção `meio` do call script ES | ADR de política: chip/modelo sem versão no idioma ganha selo "só PT" (ou fica desabilitado) |
| Rascunho e airbag | `collectFullState` grava `currentLang` (`notes-assistant.js:877`), mas `restoreFullState` ignora (`:897-899`). O ADR-0016 deixou isso como "revisitar se aparecer relato". | comparar na restauração; avisar/confirmar se o idioma do rascunho ≠ idioma atual |
| Atalhos | só guardam o `id` do cenário (**bom**: o texto vem do catálogo no idioma corrente). Os rótulos padrão já são por idioma (rodada nova); o `label`/`alias` que o agente escreve é texto livre | derivar o rótulo do substatus no idioma da interface; gravar `label` só se o agente editou |
| Minha Biblioteca | snippets são texto livre sem idioma | decisão de produto (etiqueta de idioma + filtro?) — não é bug |

## F. Avaliação da mudança

**Tamanho hoje:** 6 defeitos (A) + 10 pontos de interface (C) + 4 grupos de backend (D),
~25 arquivos, mais ~490 strings na Central. A rodada nova tirou do caminho o que era mais
volumoso (BAU Form, fusos, Email Assistant), então **o que sobra é pequeno e quase tudo
mecânico** — com exceção da splash (C1) e da política de fallback (E). Nada exige arquitetura
nova; o risco real é **recair**: o texto novo de amanhã volta a ser PT sem ninguém ver.

Ordem sugerida (cada fase = um PR contra `refactor-structure`, sem misturar refactor e feature):

1. **Defeitos A1–A6** — ~meio dia com testes. Maior valor: A1 estraga nota de todo agente ES/EN após o 1º caso. Testes: `smoke:i18n` (EN/EN e ES/ES: após Limpar e após atalho, rótulo e corpo no idioma; rodapé), `test:note-templates` (+publicação parcial), `test:call-script`.
2. **Interface restante** (C1–C10): ~1 dia; a splash é o único item de desenho.
3. **Guardas que ainda faltam** no `test:i18n`: falhar em `getLanguage()`/`getOutputLanguage()` comparado a `'es'`/`'pt'` fora de `i18n.js` (`timezone-assistant.js:497, 691` ainda tem); falhar em `{PT, ES}` maiúsculo sem `EN`; e um `smoke:i18n-diff` (renderiza PT e EN e lista o que não mudou — é o método que achou o BAU Form inteiro).
4. **ADR de política de fallback** (seção E) + selo e guarda de rascunho. Decisão antes de código (CLAUDE.md → regime "fork").
5. **Backend** (D, exceto Central): ~1 dia.
6. **Central** fases 2–4 do ADR-0017: L; só se o público SME precisar em EN.

Riscos conhecidos:
- **Valor gravado não pode ser traduzido** (`Motivo_Abertura`, `Task_BAU`, motivo do descarte): só o texto exibido muda; o `value` do `<option>` fica em PT.
- Tokens de e-mail (`[Seu Nome]`, `[DATA 1]`) não se traduzem; só o rótulo.
- O build em inglês do Pre-call troca trechos **por texto exato** (`scripts/build-precall-standalone.mjs`): ao mexer em `notes-bridge.js`, `header-factory.js`, `crm-labels.js` ou `precall-data.js` (A3), rode `npm run smoke:precall-standalone`.
- Sem revisão de EN por falante nativo para o conteúdo atual (mesma pendência do ES no PLAN).
- Hora em EN (12 h × 24 h) interage com a decisão de 24 h do ADR-0010.

## G. Decisões que dependem do Lucas

1. **Leitura da seção E** está certa? (é a premissa de A4 e da política de fallback)
2. **Trocar "Language" para EN deve mover "Case Language" junto?** O ADR-0016 disse que não, de propósito (nota EN em caso PT é silencioso e caro). Proposta que mantém o ADR: mostrar no cabeçalho do Case Notes o idioma da nota ("Nota em: PT") com troca em um clique. Hoje, com só a 1ª linha em EN, o formulário inteiro fica em PT sem nenhuma pista visual.
3. **Hora em EN:** 24 h (`en-GB`, coerente com o ADR-0010) ou 12 h (`en-US`)?
4. **Central em EN agora**, ou depois do agente?
5. **Rodapé do Pre-call:** inglês (`Generated by Case Wizard`)? De passagem: os dois rodapés (A2, A3) grafam "Cases Wizard", com "s" — o produto se chama Case Wizard. Corrijo junto ou é de propósito?

## H. Descartado (não refazer)

- 40 "campos sem override EN" nos cenários: todos valores neutros (`N/A`, `-`, `• N/A`).
- `Interface Language`, `SO - Solution Offered`, `Yes`, `Info`, `Tech`, `Argentina`, nomes de task (`Ads Conversion Tracking`…): inglês por regra do rulebook, igual nos idiomas, ou falso positivo do detector.
- Links: 60/60 descrições em EN; call script EN completo (incl. `meio`); 27/27 cenários e 8/8 e-mails com EN.
- `'Não'` em `TLDashboard.html` e `BAU_API.js`: comparação com valor gravado, não texto de tela.
- Standalone do Pre-call (`precall-standalone*.js`): não auditado aqui; tem smoke próprio com variante EN.
