<!-- Tabelas de segmentos, linhas e sub-status geradas do CATALOG de docs/media/case-notes-table/preview.html em 2026-11-05. -->
# 🧾 NOTA EM TABELA (contrato do texto e regras do formulário)

Fonte: o padrão novo de notas (Docs "Template notas", "Template 2 e 3" e "Status", do Drive do
Lucas) e as decisões dele de 2026-11-05. Decisão em
`docs/decisions/0022-nota-em-tabela-catalogo-na-central.md` e, para a convivência com o módulo antigo,
`docs/decisions/0024-nota-em-tabela-modulo-novo-ao-lado-do-antigo.md`. Alvo visual:
`docs/media/case-notes-table/` (os cinco PNGs `01-comeco` a `05-prints` e o protótipo `preview.html`).

**Esta spec vence o protótipo.** O `CATALOG` do `preview.html` é a semente dos dados, mas se
os dois divergirem, vale este arquivo.

## 1. O texto da nota é contrato

A nota sai como **uma ou mais tabelas HTML**. É o formato do **módulo novo** (`notetable`); o Case Notes
atual **continua vivo e gerando o formato antigo** (`<b>rótulo</b><br>valor`), sem mudança (ADR-0024).
Quem audita lê a tabela, os rótulos e o `NA`. Mudar um rótulo,
a ordem ou um valor muda a métrica sem erro em lugar nenhum — por isso o texto vem do
catálogo (aprovado na Central), nunca de string solta no código.

- **Idioma:** os rótulos e o rodapé seguem o idioma do **atendimento** (`getOutputLanguage()`).
  Botões, dicas e mensagens da tela seguem o da **interface** (`getLanguage()`). Teste sempre
  com os dois knobs divergentes (ADR-0016).
- **Não se traduzem:** siglas e nomes do CRM (rulebook §4: BAU, AM, CID, SE ID, Speakeasy, GAM,
  Q+, SME, ACT, ECW…) e os valores do padrão `Yes`, `No`, `NA`, `TBW`, `N-TBW`, `YES`, `NO`.
- **Rótulo sem tradução** no idioma do atendimento cai no **EN** (o texto do padrão), e a Central
  mostra a lacuna (`PT 0/16`). **Nunca cai em PT** (learning: "Mapa de idioma só de ES").
- O texto digitado pelo agente entra como **texto, escapado**: `<` e `&` não viram marcação.
- Valor de várias linhas mantém as quebras (`<br>`), sem linha em branco no meio.
- **Negrito dentro de um valor:** `**texto**` vira `<b>texto</b>`, **depois** do escape, e é a **única**
  marcação aceita (nada de itálico, link ou lista). Asteriscos sem par ficam literais. É o que dá o título em
  negrito dos blocos do resumo (§9, "Cenários rápidos").

## 2. Segmentos, blocos e fases

O segmento é o **segmento do cliente (Sales Program)**. **O agente escolhe**; não existe coluna
nova na People (a `Segment` dela é idioma `pt|es|en`). As Configurações guardam o segmento em
que o Case Notes abre (§9). O mapa Sales Program → segmento foi **adiado**.

O corpo da tabela é do **bloco** e é compartilhado: três blocos aparecem em SBS-E e em MMS
com a mesma tabela. O **título impresso**, o "quando usar" e a sugestão são do **segmento**
(a *colocação* do bloco). Em segmento `multi` o agente liga vários blocos; em `single` escolhe
**uma fase** por nota.

| Segmento (`key`) | Seleção | Título acima da tabela | Blocos, na ordem (título impresso) |
|---|---|---|---|
| ALL TASKS (`all`) | vários blocos | não | `general` — General details<br>`before` — Before implementation<br>`impl` — Implementation<br>`after` — After implementation<br>`consult` — Consult routing path |
| ECL SBS-E (`sbse`) | uma fase por nota | sim | `audit` — Phase 1: Readiness Audit<br>`impl_call` — Phase 2: Implementation Call<br>`interim` — Interim Check-Ins or Pre-Impl. Closure: Seller/Advertiser Engagement & Updates |
| ECL MMS (`mms`) | uma fase por nota | sim | `triage` — Phase 0: Initial Triage<br>`eligibility` — Phase 1: Eligibility Verification<br>`audit` — Phase 2: Readiness Audit & Scheduling<br>`impl_call` — Phase 3: Pre-Implementation Call<br>`interim` — Interim Check-Ins or Pre-Impl. Closure: Seller/Advertiser Engagement & Updates |

**Título acima da tabela** (decisão de UX): imprime-se nos segmentos por fase e **não** no ALL
TASKS. Nas fases, o título é o que diz de qual fase é a nota quando alguém percorre o log do
caso (todas as fases abrem com "General Details (Mandatory)" e só as colunas diferem). No ALL
TASKS cada tabela já se identifica sozinha (a célula de grupo — "Implementation:" — e o próprio
cabeçalho), e um título repetiria isso. O texto impresso é **o cabeçalho exato do padrão**, para
a auditoria poder buscá-lo. É uma linha de texto **fora** da tabela: não altera a estrutura que
se audita. Configurável por segmento (`showTitle`).

**Sugestão de blocos** (`suggest`): ACT ou ECW sugerem `before`, `impl` e `after`; `consult` também é sugerido em `SO - Troubleshooting Only` **depois que o agente gera a nota de Split & Transfer** (`splitAny` + `st.splitUsed`; o componente avisa por `onGenerated`, que o Doc cita como "Dual SO - Troubleshooting only + Split & Transfer"); `consult` é
sugerido em `IN - Troubleshooting [Transferred]` e `IN - Out of Scope - Rerouted`. É só uma
sugestão (etiqueta "sugerido"); o agente liga e desliga. O bloco `general` é `always`.

## 3. HTML da tabela (o que vai para o editor do CRM)

- Tags permitidas: `table`, `colgroup`, `col`, `tbody`, `tr`, `th`, `td`, `div`, `br`.
  **Só estilo inline**: nenhum `class`, `<style>` ou `<script>` (o editor do CRM não conhece o CSS
  do CW). Um teste trava isso.
- **Grade:** cada bloco declara `cols` (3, 4, 5 ou 6) e `widths` (percentuais, somando 100), com a **coluna de
  comentários em pelo menos 22%** (abaixo disso "Additional Comments (Optional)" parte a palavra numa tabela de ~456px).
  Nada disso se deduz das seções: o General details do ALL TASKS tem 4 colunas sem ter tabela por
  CID. Em toda linha a soma dos `colspan` (descontados os `rowspan` de cima) é `cols`.
- Seção chave-valor: última coluna = "Additional Comments (Optional)"; rótulo ocupa
  `cols == 3 ? 1 : 2` colunas; o valor ocupa `cols - rótulo - 1`.
  Seção de grupo (célula com `rowspan`): exige `cols == 4` (grupo | rótulo | valor | comentário).
  Seção por CID: cabeçalho `colspan = cols`, linha de colunas, uma linha por CID.
- Estilo (tokens de `notes-styles.js`): tabela com `border:1px solid #dadce0`, `border-radius:12px`,
  `overflow:hidden`, `border-collapse:separate`, `table-layout:fixed`, `width:100%`; célula com
  `padding:8px 12px`, `font-size:13px`; cabeçalho de seção `#e8f0fe`; cabeçalho de comentários
  `#f8f9fa` texto `#5f6368`; rótulo em negrito sobre `#f8f9fa`; célula de grupo em negrito,
  cor `#1a73e8`, `vertical-align:middle`. Borda de cima só nas linhas > 0 e de esquerda só nas
  colunas > 0 (a posição respeita os `rowspan`).
- Título da fase: `div` 13px, negrito, `#1a73e8`, `margin:16px 0 6px 0`. Entre tabelas, um `div` de
  10px. Rodapé: `div` itálico 12px `#5f6368` com `nota_criada_rodape` no idioma do atendimento.
- **A prévia viva marca a célula pendente** (fundo `#fef7e0`, texto "pendente"). Isso **nunca**
  vai para a saída: Copiar e Preencher não inserem enquanto houver pendência (§5).
- **Ainda não provado no CRM real:** o que o editor preserva de `colgroup` (larguras),
  `border-radius`, `overflow:hidden` e fundos coloridos. O Lucas já cola tabela com sucesso, mas
  com o estilo do outro projeto. Antes de qualquer release, ele cola uma caixa do `preview.html`
  num card de nota e confirma (PLAN.md → Waiting). **Não suponha.**

## 4. Linhas (o catálogo)

Cada linha tem `id` **estável e imutável** (rascunhos, regras e traduções apontam para ele), rótulo
`{pt, es, en}`, `type`, `required`, `na` (aceita NA), `visible` e as condições. Tipos:
`text`, `long`, `date`, `yesno`, `link`, `cid`, `speakeasy` e `derived` (somente leitura, vem do
estado). Os textos de ajuda (a instrução que no padrão vinha entre colchetes dentro da célula)
**não vão para a nota**: viram a dica sob o campo e moram no catálogo (`hint`).

**Condições** (`when`, `requiredWhen`, `suggest`; o backend valida o vocabulário, `NOTE_WHEN_KEYS`): `flow`, `europe`, `substatusAny`,
`tasksAny` (alguma destas tasks está marcada), `tasksNone` (há task marcada e **nenhuma** é destas), `splitAny` (o Split & Transfer foi gerado e o
sub-status está nesta lista) e `rowIs`. Linha `derived` com `auto: 'fixed'` e `value` (texto ou `{pt, es, en}`) tem valor **constante do catálogo**, no
idioma da nota: é o que dá "No" e o motivo do Tag Support quando a task não é ACT/ECW.

Correções do padrão original, já aplicadas no catálogo: colchetes que faltavam; `:` uniformes nos
rótulos; "Sub-status Reason :" sem o espaço; o rótulo do consentimento ganhou o `?` nos três
templates; as linhas só-ECW **não** imprimem "(only for ECW)" (a condição é metadado da linha); o
título "Interim…" usa o cabeçalho completo do padrão.

#### `general` — General details  ·  grade de 4 colunas, larguras [16, 16, 46, 22]%

*Seção kv — General Details (Mandatory)*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `date` | Date: | date | sim | não | automática: hoje |
| `speakeasy` | Speakeasy ID: | speakeasy | sim | sim | — |
| `substatus` | Sub-status: | derived | sim | não | vem do campo Sub-status |
| `next_followup` | Next Follow-Up Date: | date | sim | sim | regra do sub-status (§7) |
| `task_types` | Task types: | derived | sim | sim | vem das tasks marcadas |
| `impl_tags` | Implemented tags: | text | sim | sim | — |
| `cid` | CID: | cid | sim | sim | capturada do caso |
| `consent` | Checked and obtained recording consent from the customer before proceeding with the call? | yesno | sim | sim | regra do consentimento (§6) |
| `call_summary` | Call Summary: | long | sim | não | — |
| `substatus_reason` | Sub-status Reason: | long | sim | não | — |
| `additional_info` | Additional information: | long | não | sim | — |

*Seção kv — Screenshots (Mandatory)*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `website` | Website URL worked upon: | link | sim | sim | — |
| `qplus` | Q+ entry: | link | sim | sim | — |
| `gvc` | GVC Chat: | link | sim | sim | — |
| `gam` | GAM: | link | sim | sim | — |
| `extra_general` | Additional Screenshots: | link | não | sim | — |

#### `before` — Before implementation  ·  grade de 4 colunas, larguras [22, 28, 28, 22]%

*Seção group — Screenshots (Mandatory) · grupo “Before implementation:”*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `b_status` | Google Ads Conversion Status: | link | sim | sim | — |
| `b_dup` | Duplicate Tags / Repeat Rate: | link | sim | sim | — |
| `b_bid` | Bidding Optimization: | link | sim | sim | — |
| `b_diag` | Tag Diagnostics: | link | sim | sim | só com ECW |
| `b_qual` | EC Qualdash: | link | sim | sim | — |

#### `impl` — Implementation  ·  grade de 4 colunas, larguras [22, 28, 28, 22]%

*Seção group — Screenshots (Mandatory) · grupo “Implementation:”*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `i_status` | Google Ads Conversion Status: | link | sim | sim | — |
| `i_settings` | Google Ads Conversion Settings: | link | sim | sim | — |
| `i_gtm` | GTM / Website Backend: | link | sim | sim | — |
| `i_fired` | Tag Assistant Tag Fired: | link | sim | sim | — |
| `i_ec` | Google Ads EC Settings: | link | sim | sim | só com ECW |
| `i_terms` | Customer Data Terms Accepted: | link | sim | sim | — |
| `i_em` | Error-Free em Parameter OR ecsid PII Stitching: | link | sim | sim | só com ECW |
| `i_hit` | “Hit Sent” in Tag Assistant OR Network Header 200 OK: | link | sim | sim | — |
| `i_extra` | Additional Screenshots: | link | não | sim | — |

#### `after` — After implementation  ·  grade de 4 colunas, larguras [22, 28, 28, 22]%

*Seção group — Screenshots (Mandatory) · grupo “After implementation:”*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `a_status` | Google Ads Conversion Status: | link | sim | sim | — |
| `a_diag` | Tag Diagnostics / EC Qualdash: | link | sim | sim | só com ECW |
| `a_dup` | Duplicate Tags / Repeat Rate: | link | sim | sim | — |
| `a_bid` | Bidding Optimization: | link | sim | sim | — |
| `a_extra` | Additional Screenshots: | link | não | sim | — |

#### `consult` — Consult routing path  ·  grade de 4 colunas, larguras [22, 26, 30, 22]%

*Seção group — Screenshots (Mandatory) · grupo “Consult Routing Path & SME Approval:”*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `c_path` | Consult Routing Path: | link | sim | sim | — |
| `c_sme` | SME Approval: | link | sim | sim | — |

#### `audit` — Readiness Audit  ·  grade de 6 colunas, larguras [12, 15, 11, 15, 25, 22]%

*Seção por CID — CID-Level Details (uma linha por CID)*

| Coluna (`id`) | Rótulo (EN) | Tipo | Obrigatória |
|---|---|---|---|
| `tbw` | To Be Worked? | tbw | sim |
| `cid` | CID | cid | sim |
| `mcc` | Under MCC? | yn | sim |
| `outcome` | Audit Outcome | text | sim |
| `alink` | Audit Link | link | sim |
| `sme` | SME sign-off | smeyes | sim |

*Seção kv — General Details (Mandatory)*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `substatus` | Current case Sub-Status: | derived | sim | não | vem do campo Sub-status |
| `next_followup` | Next Follow up Date: | date | sim | sim | regra do sub-status (§7) |
| `case_comments` | Case Comments: | long | sim | não | — |
| `audit_ss` | Audit Screenshots: | link | sim | sim | — |
| `gam` | GAM Ping, if any: | link | sim | sim | — |

#### `impl_call` — Implementation Call  ·  grade de 4 colunas, larguras [18, 22, 36, 24]%

*Seção por CID — CID-Level Details (uma linha por CID)*

| Coluna (`id`) | Rótulo (EN) | Tipo | Obrigatória |
|---|---|---|---|
| `tbw` | To Be Worked? | tbw | sim |
| `cid` | CID | cid | sim |
| `tag` | Tag implemented? | text | sim |
| `caseid` | Case ID mapping | text | sim |

*Seção kv — General Details (Mandatory)*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `substatus` | Current case Sub-status: | derived | sim | não | vem do campo Sub-status |
| `substatus_reason` | Sub-status Reason: | long | sim | não | — |
| `next_followup` | Next Follow up Date: | date | sim | sim | regra do sub-status (§7) |
| `speakeasy` | Speakeasy ID: | speakeasy | sim | sim | — |
| `oncall_comments` | On Call Comments: | long | sim | não | — |
| `consent` | Checked and obtained recording consent from the customer before proceeding with the call? | yesno | sim | sim | regra do consentimento (§6) |

*Seção kv — Screenshots (Mandatory)*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `oncall_ss` | On Call Screenshot: | link | sim | sim | — |
| `access_ss` | Account verification access level: | link | sim | sim | — |
| `gam` | GAM Ping, if any: | link | sim | sim | — |
| `extra_all` | All Additional Screenshots: | link | não | sim | — |

#### `interim` — Interim check-ins  ·  grade de 3 colunas, larguras [30, 48, 22]%

*Seção kv — General Details (Mandatory)*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `substatus` | Current case Sub-Status: | derived | sim | não | vem do campo Sub-status |
| `next_followup` | Next Follow up Date: | date | sim | sim | regra do sub-status (§7) |
| `case_comments` | Case Comments: | long | sim | não | — |
| `gam` | GAM Ping, if any: | link | sim | sim | — |
| `extra_all` | All Additional Screenshots: | link | não | sim | — |

#### `triage` — Initial Triage  ·  grade de 3 colunas, larguras [30, 48, 22]%

*Seção kv — General Details (Mandatory)*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `substatus` | Current case Sub-Status: | derived | sim | não | vem do campo Sub-status |
| `next_followup` | Next Follow up Date: | date | sim | sim | regra do sub-status (§7) |
| `case_comments` | Case Comments: | long | sim | não | — |
| `gam` | GAM Ping, if any: | link | sim | sim | — |

#### `eligibility` — Eligibility Verification  ·  grade de 5 colunas, larguras [16, 17, 20, 25, 22]%

*Seção por CID — CID-Level Details (uma linha por CID)*

| Coluna (`id`) | Rótulo (EN) | Tipo | Obrigatória |
|---|---|---|---|
| `tbw` | To Be Worked? | tbw | sim |
| `cid` | CID | cid | sim |
| `mcc` | Under MCC? | yn | sim |
| `elig` | Eligibility Status | text | sim |
| `galactic` | Galactic Screenshots | link | sim |

*Seção kv — General Details (Mandatory)*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `substatus` | Current case Sub-Status: | derived | sim | não | vem do campo Sub-status |
| `next_followup` | Next Follow up Date: | date | sim | sim | regra do sub-status (§7) |
| `case_comments` | Case Comments: | long | sim | não | — |
| `gam` | GAM Ping, if any: | link | sim | sim | — |

#### `extras` — Additional details  ·  grade de 3 colunas, larguras [32, 46, 22]%

*Seção kv — Additional Details*

| Linha (`id`) | Rótulo (EN) | Tipo | Obrig. | Aceita NA | Regra |
|---|---|---|---|---|---|
| `europe_case` | Europe case? | derived | sim | não | vem do seletor Caso da Europa; só no Caso da Europa |
| `oncall` | On Call signaled on time? | text | não | sim | só no fluxo BAU |
| `gtm_ga4` | GTM/GA4 verified: | text | conforme regra | sim | obrigatória em: SO - Implementation Only, SO - Educational Only, SO - Troubleshooting Only, NI - Awaiting Validation; fora desses, opcional (chip "+") |
| `ts_used` | Used Tag Support? | yesno | sim | não | padrão `No`; só com ACT ou ECW |
| `ts_reason` | Reason: | text | não | sim | só com ACT ou ECW; e `ts_used` = No |
| `ts_used_na` | Used Tag Support? | derived | não | não | `No` fixo; só com task marcada e **nenhuma** ACT/ECW (sem pergunta) |
| `ts_reason_na` | Reason: | derived | não | não | motivo fixo "Task does not apply to TSA usage." (idioma da nota); mesma condição |
| `call_attempt` | Call attempt: | link | sim | sim | só em: IN - Not Reachable |
| `ev_call1` | Contact evidence: Call 1 | link | não | sim | só em: NI - Attempted Contact |
| `ev_call2` | Contact evidence: Call 2 | link | não | sim | só em: NI - Attempted Contact |
| `ev_msg` | Contact evidence: Message to the AM | link | não | sim | só em: NI - Attempted Contact |


## 5. O valor de cada linha

- **Toda linha obrigatória fecha com valor ou `NA` explícito.** Vazio **não** vira `NA` em silêncio
  (o formato antigo imprimia `N/A` sozinho). Linha opcional vazia sai `NA`. Linha sem
  `na` (Date, Sub-status, Call Summary…) não tem botão NA.
- **Preencher** e **Copiar** não inserem com linha pendente: o clique abre a **faixa de pendências** ("N pendentes",
  **Próxima** e **Marcar o restante como NA**) e marca as linhas. A tela fica calma até essa tentativa. "Marcar o restante
  como NA" marca **só** as linhas obrigatórias que aceitam NA e ainda estão pendentes; Date, Sub-status, Call Summary e
  as demais sem NA continuam pendentes. O estado no rodapé ("N pendentes" / "Pronta para preencher") faz o mesmo ao clique.
- `date`: `AAAA-MM-DD`; atalhos Hoje, +2, +3 e +5 **dias úteis**. Sem `<input type=date>` (o locale do
  navegador decide o que se vê; ADR-0010). Formato inválido marca o campo; não bloqueia sozinho.
- `link`: URL `http(s)` ou `NA`; formato inválido só marca o campo.
- `cid`: `XXX-XXX-XXXX`, formatado ao sair do campo se tiver 10 dígitos; vários separados por vírgula.
- Valor automático (data de hoje, CID, tasks, sub-status, follow-up) leva a marca **Auto**; editar
  tira a marca. **Nada capturado sobrescreve o que o agente digitou** (mesma regra do Pre-call).
- Cada linha tem um comentário opcional (coluna "Additional Comments"), escondido atrás de um ícone de
  balão que só aparece em foco/hover (§9). **O primeiro redesenho do protótipo perdeu isto** e a suíte não
  pegou; hoje há checagens (campo abre, escreve na linha certa, ícone preenchido, fecha vazio).
- Lista de CIDs: vive com o **caso** (chave Case ID + CID, como o Pre-call). Trocar de fase mantém a
  lista. Outro caso na tela **zera antes** da captura lenta (learning "Formulário que se preenche
  por raspagem").

## 6. Consentimento de gravação e Caso da Europa

Ordem de decisão da linha `consent` (a primeira que valer):

1. **Sub-status `NI - Attempted Contact` ou `IN - Not Reachable`** → `NA` automático (regra do padrão:
   não houve call).
2. **Caso da Europa = Sim** → **sem padrão**; o agente precisa marcar `Yes` ou `No` (a linha fica
   pendente, com a etiqueta "Caso da Europa: marque"). É a lógica de hoje, só no caso europeu.
3. **Demais casos** → `Yes` por padrão, mostrado como "Yes · Padrão" com um botão **Alterar** que
   revela `Yes`/`No` (a alternativa fica escondida de propósito).

Trocar o Caso da Europa com o consentimento **intocado** recalcula o padrão; **tocado**, preserva o
que o agente marcou. A linha `europe_case` ("Europe case?" = `Yes`) entra no fim da nota (§8) só
no caso europeu.

## 7. Sub-status e follow-up

- O campo Sub-status é texto com a lista oficial como sugestão (`datalist`). Os `PI - …` do SBS-E e
  do MMS são **digitados à mão**: a lista deles ficou fora por ora. Valor fora da lista mostra o
  aviso "Fora da lista" (não bloqueia).
- O follow-up sugerido é em **dias úteis** (segunda a sexta; feriados não entram — o CRM não os
  informa). Número = dias úteis; `na` = a linha sai `NA`; os demais o agente decide.
- **Alinhar os nomes do código (`SUBSTATUS_TEMPLATES`) ao Status oficial é outra etapa**, não esta.
  Divergências conhecidas: `SO - Education Only` (oficial: `Educational Only`); três sub-status de
  Out of Scope no código contra **um** oficial (`IN - Out of Scope - Rerouted`, com as variantes
  como respostas prontas); `DC - Other` não existe no oficial; faltam `IN - Reschedule Limit
  Exceeded`, `IN - Instruction Shared` e os cinco `DC`. O arquivo exportado perde células
  mescladas: a lista pode estar incompleta (há respostas prontas "AS - New" e "AS - Work in
  Progress" sem sub-status listado).

#### Sub-status oficiais (arquivo Status, sem os `PI - …`) e regra de follow-up

| Sub-status | Follow-up |
|---|---|
| AS - Acceptable Reschedule | opcional (o agente decide) |
| AS - Reschedule 1 | opcional (o agente decide) |
| NI - Awaiting Inputs | conforme o cliente (o agente decide) |
| NI - In Consult | 3 dias úteis |
| NI - Awaiting Validation | 2 dias úteis |
| NI - Attempted Contact | conforme a política (o agente decide) |
| DC - Test Case | não se aplica (`NA`) |
| DC - Not Needed | não se aplica (`NA`) |
| DC - No response (Hybrid case) | não se aplica (`NA`) |
| DC - Out of Scope | não se aplica (`NA`) |
| DC - Authentication Failed | não se aplica (`NA`) |
| IN - Infeasible | não se aplica (`NA`) |
| IN - Not Reachable | não se aplica (`NA`) |
| IN - Not Interested | não se aplica (`NA`) |
| IN - Not Ready | não se aplica (`NA`) |
| IN - Out of Scope - Rerouted | não se aplica (`NA`) |
| IN - Reschedule Limit Exceeded | não se aplica (`NA`) |
| IN - Troubleshooting [Transferred] | não se aplica (`NA`) |
| IN - Instruction Shared | não se aplica (`NA`) |
| SO - Implementation Only | não se aplica (`NA`) |
| SO - Educational Only | não se aplica (`NA`) |
| SO - Troubleshooting Only | não se aplica (`NA`) |

> **Suposição a confirmar:** no arquivo Status, `DC - No response (Hybrid case)` e `DC - Authentication
> Failed` têm a coluna *Follow Up Date* **vazia** (os demais `DC`, `IN` e `SO` dizem `N/A`). O
> catálogo assume `NA` para os dois por serem encerramentos. Os números 2 e 3 do arquivo não dizem a
> unidade: o Lucas decidiu **dias úteis**.

## 8. Additional details (campos do formato anterior)

O Lucas mandou manter o que o formato antigo tinha, **como linhas no fim da nota**. Saem numa
**tabela própria, a última da nota**, com cabeçalho "Additional Details" e a grade do bloco `extras`
(3 colunas). Foi escolhida tabela separada, e não linhas coladas na última tabela do padrão,
porque a grade das tabelas do padrão varia (3 a 6 colunas) e quem lê o padrão por script não
encontra tabela mexida. Trocar para "linhas na última tabela" é uma mudança no renderizador, não
na regra.

Cada linha tem a própria condição (tabela do bloco `extras`, §4). Pontos que não saem da tabela:

- **On Call** só no fluxo BAU (no LM some, como hoje). Texto livre, opcional.
- **GTM/GA4** é obrigatória em `SO - *` e `NI - Awaiting Validation` (os antigos `requiresTasks`)
  e opcional nos demais, onde entra pelo chip "+ GTM/GA4 verified" (mesmo padrão dos campos
  opcionais do formulário antigo).
- **Tag Support** — **a pergunta só aparece com ACT ou ECW marcadas**; nasce em `No`. **Com tasks que não são ACT nem ECW** não há pergunta: a nota
  já sai com `Used Tag Support?` = `No` e o motivo "Task does not apply to TSA usage." (linhas `ts_used_na` e `ts_reason_na`, valor fixo do catálogo no
  idioma da nota; condição `tasksNone`), e o formulário mostra só uma linha informando isso (decisão do Lucas, 2026-11-12). Sem task nenhuma, nada. **No formulário** a pergunta (`ts_used` e, com
  `No`, `ts_reason`) sobe para um **cartão destacado** (fundo âmbar, faixa lateral, linha de ajuda) antes de qualquer
  bloco ou print, porque a resposta decide os prints de ACT/ECW (Lucas, 2026-11-12). **Só a ordem da tela muda:** as
  linhas continuam no bloco `extras` e saem na tabela Additional Details, a última da nota.
  **Aviso nos blocos de print:** quando o Tag Support dispensa os prints (linhas viram `NA` Auto), cada bloco Before, Implementation e After leva, no topo
  do grupo "Screenshots (Mandatory)", **uma linha de largura total** (`colspan` = colunas do bloco; fundo `#e6f4ea`, texto `#137333`, faixa lateral `#34a853`) com
  título em negrito ("Tag Support utilizado: prints dispensados") e o motivo (o Win Criteria dispensa os prints das tasks em que ele foi usado), para quem lê
  a nota depois saber POR QUE a coluna é só NA (Lucas, 2026-11-12). Só tags permitidas e estilo inline. O texto vem do dicionário de notas (`ts_bloco_*`), no
  idioma da nota, como o aviso de "Task types" (`ts_output_disclaimer`), e só entra com o texto no `opts` (`tsBlockNote`). Some com "Incluir mesmo assim" (os
  prints voltam) e com `No`. É conteúdo da nota: sai em Preencher e Copiar. Com `Yes`, cada task ACT/ECW em
  **Task types** leva o aviso do Win Criteria (`ts_output_disclaimer` do dicionário), como hoje, e o
  motivo some. Com `No`, o motivo é opcional. O lembrete do Form fica na dica.
  **Tudo igual ao módulo atual (decisão do Lucas, "continue como é hoje"):** com `Yes`, o Tag Support
  **dispensa os prints** de ACT/ECW, então as linhas de print dessas tasks em Before, Implementation e After
  viram `NA` **automático, com a marca Auto**. **"Incluir mesmo assim"** (`forcedScreenshots`, já no
  `step-tasks.js`) religa os prints da task forçada, e o aviso sai de Task types nessa task. Com `Yes` em só
  uma das duas tasks, só as linhas dela mudam; as linhas `onlyFor: ecw` seguem a ECW.
- **Evidências por task do Win Criteria** (o `SCREENSHOTS_LIST` antigo, módulo `task_screenshots`) seguem
  **como no módulo atual**: o seletor de tasks e a lista de prints da task são o `step-tasks.js` reaproveitado,
  **sem mudança**. O que o agente anexa ali vai para a tabela **Additional Details**, uma linha `link` por
  print, `<task> — <rótulo>`, depois das demais linhas do bloco. **ACT e ECW não repetem a lista**: o print
  delas é pedido pelas linhas de fase (Before, Implementation, After); pedir o mesmo print duas vezes é
  defeito. As demais tasks (GA4, GTM, e as que o Win Criteria acrescentar) mantêm a lista de hoje.
- **Evidências de contato** (3 linhas) só em `NI - Attempted Contact`; **Call attempt** só em
  `IN - Not Reachable`.
- **Europe case?** só no caso europeu (§6).

## 9. Fluxo, segmento padrão e janela

O desenho da tela (medidas, componentes, estados) está em **`specs/ui-ux/design-system.md`**, seção "Case Notes em
tabela: a tela". Aqui ficam só as regras de comportamento que ela implementa:

- **Janela única** de 560×760 (a mesma casca do Case Notes de hoje) e **gaveta da prévia atrás dela**, aberta por uma aba com
  o número de pendências. Não há painel fixo de prévia nem janela de duas colunas.
- **Contexto no topo:** um cartão com **Sub-status**, **Tasks**, **Blocos** (ou **Fase**) e **Nota**. **Não há seletor de tipo de
  nota no topo**: poucos agentes usam ECL SBS-E e ECL MMS, então o tipo mora dentro da linha **Nota**. Ela vem recolhida e resume
  `idioma · fluxo · Europa`; aberta, mostra **Tipo** (ALL TASKS|ECL SBS-E|ECL MMS, com a pista somente leitura "Sales program no
  CRM: <valor>" de `captureSalesProgram()`, que **não escolhe o template sozinha**), Idioma (PT|ES|EN), Fluxo (BAU|LM) e o
  interruptor do **Caso da Europa** (Sim deixa o resumo em âmbar). Só o tipo **fora do padrão** aparece: a linha Nota e a faixa fixa
  citam "ECL SBS-E" em azul; no padrão não citam nada. Com a linha em foco, a dica diz que o tipo está lá dentro. **General** não é
  chip (sempre ligado).
- **Tasks:** o seletor e a lista de prints por task são o **`step-tasks.js` do módulo atual, reaproveitado sem
  mudança** (os quatro chips do protótipo são só um substituto visual). As tasks vêm **pré-marcadas** do CRM
  (`Appointment tasks`, multivalorado) **só quando o texto é reconhecido com segurança** (na tela traduzida o
  campo vem em texto traduzido, não na chave `ads_conversion_tracking`); a linha mostra o resumo com a marca
  Auto e "Alterar", e cai no seletor de hoje quando não reconhece. **Nos tipos ECL a linha Tasks some** (a nota
  ECL não tem "Task types"), e o Tag Support some junto.
- **Blocos pré-selecionados** (não só um ponto de sugestão): com `Appointment time` **= hoje** (no fuso do
  agente) ligam Before e Implementation; com data **anterior**, After; Consult continua pela regra do
  sub-status. O CRM entrega a data em texto que varia com o idioma (`2026-Set-10 12:00:00 UTC` na tela original):
  o parse é tolerante a PT/ES/EN e, **se falhar, nada é pré-selecionado**. O agente liga e desliga os chips como
  hoje.
- **Idioma, Fluxo e Europa:** o **idioma** da nota vem automático do `Business language` do CRM (já lido por
  `captureLanguage`), com fallback para o **idioma de atendimento já configurado** (`getOutputLanguage()`, ADR-0016: o rótulo da nota nunca segue o idioma da interface); o agente pode trocar. O **Fluxo** (BAU ou LM, dois
  fluxos de atendimento) o agente troca na linha Nota, e o **padrão de cada agente** é a preferência
  `notes_default_flow` (`bau|lm`, padrão `bau`) em Configurações. A **Europa é sempre o agente quem marca**: não
  há leitura automática (decisão do Lucas).
- **Sub-status** é um seletor com busca por nome **ou atalho** (`ts so verif`); texto fora da lista é aceito (os `PI - …`).
- **Tipo padrão (o que abre sem trocar):** preferência do agente via `UserPrefsService`, chaves `notes_default_segment`
  (`all|sbse|mms|last`) e `notes_last_segment`. Opção em Configurações ("Case Notes · abrir em"). Sem preferência → `all`.
  Quem usa ECL todo dia escolhe `sbse`/`mms`/`last` lá e nunca mais abre a linha Nota para isso.
- **Só o que pede atenção fica à vista:** linhas com valor automático ou padrão (Date, Follow-up, CID, Consent) vão para o
  cartão recolhido "Preenchido automaticamente"; opcionais ficam em "Mais opções · N"; linhas derivadas (sub-status, Europa)
  não aparecem; a dica de uma linha só aparece com ela em foco.
- **"?" dos blocos (ajuda):** cada chip de bloco do ALL TASKS (Before, Implementation, After, Consult) tem um botão "?" (alvo de
  32×32) que abre, na linha do chip, um painel com **o que é, quando usar, sub-status, tasks, Tag Support** (e, no Consult, quando é
  obrigatório). Um por vez; clicar no "?" **não** liga nem desliga o bloco; Esc fecha só o painel e devolve o foco ao "?". O texto
  é de **tela**, no idioma da **interface**, tirado do Doc "fluxo after implementation before", e **nunca vai para a nota** (o painel
  traz o aviso). Mora em `note-table-help.js`, fora do catálogo (um segmento publicado na Central substitui o embutido inteiro).
  As **fases ECL** (SBS-E e MMS) também têm "?", com o texto do Doc "Template 2 e 3", **por segmento+bloco** (o mesmo bloco tem "quando usar" e
  sub-status diferentes em cada um: `audit` é Phase 1 no SBS-E e Phase 2 no MMS) e sem inventar o que o Doc não diz (a auditoria e o Interim do SBS-E
  não listam sub-status). `MMS only` e `M&A` ficam como o Doc os deixa, sem definição. No ECL (fase única) o bloco "fantasma" **troca** a fase
  na prévia em vez de somar uma segunda tabela, e a faixa vem antes do título da fase (`data-block-h`, só na prévia).
  **Prévia na gaveta:** abrir o "?" mostra **onde o bloco entra**. Com 536px livres à esquerda da janela a gaveta abre sozinha; sem eles
  (ela sobreporia a janela e esconderia o painel) o painel tem o botão "Ver na prévia". A prévia rola até a tabela do bloco (só o
  painel dela, nunca a página do CRM; `auto` com `prefers-reduced-motion`). Bloco **desligado** = tabela "fantasma" (esmaecida, tracejada)
  na posição do segmento, renderizada com o estado + o bloco, sem mexer no estado real nem nas pendências; bloco **ligado** = destaque.
  Uma faixa antes da tabela diz "Explicação — não vai para a nota", o "quando usar" e, no fantasma, que o bloco ainda não está na nota.
  `data-block` (âncora) e tudo isto existem **só na prévia viva**, como o `data-row`: a saída vem de `outputHtml()`, que renderiza do
  zero e nunca lê a prévia. Clicar numa linha do fantasma não leva a campo (o bloco não está no formulário). Esc fecha primeiro o que
  está por cima: a gaveta sobreposta, depois o painel, depois a gaveta ao lado.
- **Gaveta:** aberta pela aba (ou fechada por Esc), com o conteúdo `inert` quando fechada. A linha em foco acende a linha da nota
  e clicar numa linha da nota leva ao campo.
- **Faixa de contexto** fixa ao rolar além do contexto (sem o tipo, se for o padrão); **faixa de pendências** só depois de tentar
  preencher.
- **Linhas de print (links), o grosso da nota** (~17 das ~20 linhas de um ACT com Before e Implementation): colar um link válido
  mostra ✓ e **leva o foco ao próximo campo vazio**; **Enter** também (sem preencher nem marcar NA nada); a dica da linha seguinte
  aparece sozinha, dizendo o que o próximo print precisa mostrar. **NA e comentário só aparecem na linha em foco/hover**; o
  **estado** (NA marcado, comentário feito) fica sempre visível. Digitar `na` num campo que aceita NA vale NA (sai `NA`); digitar
  NA onde o padrão não aceita (Call Summary, Sub-status Reason) marca o campo. Tab continua passando por comentário e NA
  (acessibilidade); o caminho rápido é Enter e colar.
- **Comentário por linha** (§5): ícone de balão na própria linha, só em foco/hover; abre um campo logo abaixo, que escreve na coluna
  "Additional Comments" da **mesma linha** da nota; fica preenchido e visível quando há texto; esvaziado, fecha sozinho. Linhas
  derivadas não oferecem comentário.
- **Speakeasy ID:** o chip "Auto busca" some quando o campo tem valor (o ID tem 19 dígitos e o chip o cortava).
- **Rodapé (lacuna do protótipo, a portar do Case Notes de hoje):** o rodapé atual tem uma linha **"Preencher e-mail
  automaticamente"** (caixa marcada por padrão, **só aparece** quando o sub-status tem e-mail; `runEmailAutomation` depois de
  inserir). O protótipo **não a desenha**. No app novo ela entra como uma linha discreta sobre os botões, só quando se aplica.
  **Guardar** é o rascunho estacionado (`parkButton`) e **não** se confunde com o autosave de emergência (2 s após a última
  edição, `saveEmergency`): os dois ficam.
- **Cenários rápidos:** o protótipo mostra 3 chips fixos de exemplo. No app valem os de `getScenariosFor(subStatus, caseType)`:
  0 a 5 por sub-status (27 no total). A linha só aparece quando há ao menos um; com mais de 3, vira um menu.
  **Para onde vai cada campo do cenário** (decisão do Lucas): o que for **print (SS)** vai para **Additional**
  (`call_attempt`, evidências de contato, linhas por task, Additional Screenshots); `REASON_COMMENTS` vai para
  `substatus_reason`; `DIA` para `next_followup`; **todo o resto de texto é condensado no campo-resumo do bloco**
  (`call_summary`, `case_comments` ou `oncall_comments`), em **blocos, cada um com o título em negrito**:
  `**Contexto da call:** texto`, uma linha por bloco, com o título no idioma do atendimento. Combinar vários
  cenários acrescenta blocos; não sobrescreve o que o agente digitou.
- **Intenção de projeto, ainda não desenhada no protótipo:** a gaveta abre para a esquerda (a janela mora ao lado do dock; hoje
  `right: 100px` em `notes-popup.js`). A gaveta precisa de 536px à esquerda da janela, então a tela precisa de ~1196px; abaixo
  disso (ou com a janela arrastada para a borda esquerda) ela **sobrepõe a janela** em vez de sair da tela. O protótipo só mostra
  a abertura à esquerda, com espaço de sobra.

## 10. O que a Central controla e o que fica no código

| A Central (aprovação, versão, rollback, log) controla | O código controla |
|---|---|
| segmentos: nome, ordem, quais blocos, `select`, `showTitle` | os **tipos de seção** (`kv`, `group`, `cid`) |
| colocação: título impresso, "quando usar", sugestão | os **tipos de linha** e o que cada um desenha |
| linhas: rótulo em PT/ES/EN, obrigatória, aceita NA, visível, dica | a grade e as larguras (declaradas por bloco; editor só lê) |
| condições por sub-status, task, fluxo e Europa | o formato do HTML (§3) e o bloqueio por pendência |
| o bloco `extras` | a regra de dias úteis e do consentimento (§6, §7) |

O servidor valida o que a Central publica: `id` de linha no formato certo, único e **imutável**; `kind`
e `type` conhecidos; a grade fecha e as larguras somam 100; grupo só em 4 colunas; ao menos uma
linha obrigatória por bloco; o layout só aponta para blocos existentes e no ar. O app **nunca lança**
diante de `kind`/`type` desconhecido: ignora a linha com `console.warn` (learning 2026-10-23:
frontend antes do dado).

## 11. Fora do escopo desta entrega

- Mapa Sales Program → segmento (adiado pelo Lucas).
- Lista de sub-status `PI - …` (deixada de fora por ora).
- Alinhar `SUBSTATUS_TEMPLATES` ao arquivo Status (§7: etapa separada).
- Quando o módulo novo vira o padrão e o antigo se aposenta (ADR-0024: outra decisão).
- Migrar rascunhos do formato antigo (o novo tem rascunhos próprios e não lê os antigos).
- Colar vários links de uma vez e ler a Europa ou o Fluxo do CRM (o Lucas disse que não: um link por vez,
  Europa sempre manual, Fluxo por preferência).
