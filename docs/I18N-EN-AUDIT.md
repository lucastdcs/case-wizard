# Auditoria de usabilidade em inglês

**Data**: 2026-10-29 · **Base**: `refactor-structure` @ `d5ed21c` · **Status**: A1, A2, A4–A6 e C1–C10 corrigidos (seções A e C); A3 reclassificado, não é defeito. Seguem abertos o backend (D), a política de fallback (E) e as decisões (G).

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

## A. Defeitos que gravam o idioma errado no caso — **corrigidos** (exceto o A3, que não é defeito)

Atingiam ES também, não só EN. Cada correção tem teste que falha no código anterior.

| # | Onde | O que acontecia | Correção e trava |
|---|---|---|---|
| A1 | `notes/core/notes-state.js` | `reset()` fazia `currentLang = "pt"`; nada reaplicava `getOutputLanguage()`. `resetModule()` roda em **Limpar**, **guardar rascunho**, **depois de inserir a nota** e em **todo atalho do Ctrl+K**: só a 1ª nota da sessão saía no idioma certo. Reproduzido em EN/EN e ES/ES. | Idioma fora do `reset()`, inicializado no construtor (como o `visible`). `smoke:i18n` +15: percorre Limpar → atalho → nota inserida → caso seguinte em EN, ES e PT (controle). |
| A2 | `output-generator.js`, `notes-data.js` | Rodapé `Nota criada através do Cases Wizard.` e o reserva `Evidência` cravados em PT: iam para o CRM em toda nota EN/ES. | Chaves `nota_criada_rodape` e `evidencia` nos 3 idiomas; PT idêntico a antes. Travado no mesmo smoke (a nota inserida termina com o rodapé do idioma). |
| A3 | `notes/precall/precall-data.js:69` | **Não é defeito.** Eu o classifiquei errado: li a regra do rulebook ("Pre-call sai sempre em inglês") e não a exceção da spec. `specs/workflow/precall-checklist.md` define o rodapé `Gerado pelo Cases Wizard` como "a única linha em português, fixa nos três idiomas, fora do bloco auditado"; o ADR-0020 trata o inglês como exceção só do build avulso. | Nada a mudar. `test:precall` e `smoke:precall` já travam o texto. Registrado no rulebook §4 para não repetir o erro. |
| A4 | `notes/data/note-templates-service.js` | Mais grave do que eu descrevera. Publicar renomeia os ids dos cenários (`quickfill-x` → `cw-<substatus>-x`) e o espelho EN embutido é chaveado pelos ids antigos: com a Central servindo PT+ES e nenhum EN, **0 de 26** cenários achavam o EN (`getScenarioFields` devolve o objeto PT). Publicar o EN de **um** cenário ainda substituía o espelho inteiro e derrubava os outros 25. O teste existente só contava entradas do espelho e passava verde. | Espelho = embutido (religado ao publicado pelo `slug`) completado pelo que a Central serve, o publicado vence; reconstruído a cada hidratação. `test:note-templates` +4: consulta pelo id como o app, e o EN achado é o do mesmo cenário (3 falham antes). |
| A5 | `email-assistant/email-data.js`, `email-automation-service.js` | `[MM/DD/YYYY]` preenchido com `toLocaleDateString('pt-BR')` fixo, em e-mail ao anunciante. | `formatTemplateDate(data, idiomaDoAtendimento)`: PT e ES dia/mês/ano (igual a antes), EN mês/dia/ano. `test:emails` +1. |
| A6 | `call-script/call-script-data.js`, `call-script-assistant.js` | `GROUP_TITLES[g][lang] \|\| ""` só tinha PT/ES: o cartão do EN aparecia sem título. **Observado**: o cartão tinha só o contador `0/8`. | Mapa movido para ao lado do roteiro, com EN e fallback PT, nunca vazio. `test:call-script` +3. |

## B. Já resolvido pela rodada `d5ed21c` (verificado no código e no DOM; não refazer)

BAU Form em EN (campos, opções, tooltips; sobra só o C7) · nomes de país/cidade dos
fusos, no Timezone e no seletor do BAU Form · rótulos dos atalhos padrão do Ctrl+K (`2 Day
Rule (Start/End)`) · Email Assistant (`Preencher no CRM`, estados vazios, dica do Smart CR)
· Split & Transfer e seletor de tasks · toasts do Case Notes (`Preencha o campo…`,
`Sessão restaurada!`…) · `notes-bridge`, `utils.js` (`Eliminar/Excluir`) e `wizard-shell`
("criado por") · erro fatal do `app.js` · mensagem de erro da Biblioteca · repintura na troca
de idioma · guarda `X_ES` sem `X_EN` no `test:i18n`.

## C. Interface do agente — **corrigidos** (cada um com teste que falha no código anterior)

| # | Onde | O que acontecia | Correção e trava |
|---|---|---|---|
| C1 | `shared/page-data.js`, `utils.js`, `shared/i18n.js` | **Splash** (prefixo, 15 frases, selo de sexta, nome de reserva) sem idioma: PT até para ES. Além do texto, a ordem: ela roda **antes** do perfil chegar (o e-mail que o busca é capturado dentro dela), então esperar o perfil não era opção. | Dicionário pt/es/en + o último idioma de perfil aplicado guardado (`cw_profile_lang`), valendo já no boot seguinte abaixo do override manual (ADR-0016, atualizado). O 1º boot de todos segue em PT. `test:i18n` +6, `smoke:i18n` +4 (relógio fixado numa sexta de manhã). |
| C2 | `shared/command-palette.js` | 11 das 12 linhas em PT em EN (hint só `{pt, es}`, cinco rótulos fixos, busca só por pt/es). | Rótulos = os nomes que cada módulo mostra no cabeçalho, hints e keywords nos 3 idiomas, resolvidos ao desenhar; a busca indexa todas as versões. `smoke:i18n` +9. |
| C3 | `utils.js`, `bau-form-assistant.js`, `timezone-assistant.js`, `i18n.js` | Datas/horas em `pt-BR`. | `getLocale()`/`getMonthStyle()` em `i18n.js`. EN = `en-GB` (24 h) com mês curto (`05 Sept 2026 at 14:30`). **24 h é requisito do código, não gosto**: o Timezone lê a hora pelo texto antes do `:`. Resolve a decisão G3. `test:i18n` +3, `smoke:i18n` +4. |
| C4 | `email-automation-service.js` | Dois avisos (não um) em PT, em **quatro** pontos: `Verifique o e-mail…` e `Verifique se o e-mail do AM…`. | `EAS_DICT` pt/es/en. Sem teste de navegador (o mock não tem a composição do CRM); paridade pelo `test:i18n`. |
| C5 | `step-tasks.js`, `notes-data.js` | Aviso do Win Criteria cravado em PT. | Chave `screenshots_aviso`. `smoke:i18n` (+3 junto com C7/C8). |
| C6 | `email-data.js`, seed da Central | Rótulos `Data 1…3`/`Hora 1…3` do EN em PT. | Traduzidos; `npm run seed:emails` regenerou o seed (muda só essa linha). `test:emails` +1: nenhum rótulo EN igual ao PT, salvo sigla/URL/link. |
| C7 | `bau-form-assistant.js` | A dica de erro do CID sob o campo era gravada uma vez com o texto do config (o toast já era traduzido). | `cidErrorText()`, na criação e na repintura da troca. `smoke:i18n` (+3). |
| C8 | `personal-library/*` | `Mídia` visível em PT. `Sem título` **não** é visível: a UI exige título, e só ela chama `save`. | `mediaTag` nos 3 idiomas; o default `Sem título/Sin título/Untitled` fica por consistência, sem teste (inalcançável pela UI). `smoke:i18n` (+3). |
| C9 | `data-service.js`, `BAU_API.js`, `Código.js` | Erros do BAU no toast sempre em PT, com o prefixo `Error:` do roteador. | O servidor manda `code` (`erroComCodigo_`); o cliente traduz por ele (`serverErrorMessage`) e usa o texto PT só como reserva. Contrato em `api-payloads.md`. `test:tl-decision` +6, `test:jsonp` +6. **Exige `clasp push`.** Timeout e conexão só têm paridade de dicionário. |
| C10 | `command-center.js` | Tooltip do selo DEV em PT, desenhado uma vez. | `devEnvTitle` no `CC_DICT`, repintado na troca. `smoke:i18n` +3. |

Neutro, fora do escopo: `email-automation-service.js` `log()` (console), nomes de Canned
Response do CRM, rótulos de `crm-labels.js` (casam com a tela do CRM), seletor trilíngue
do onboarding. **Um limite que ficou:** `getAgentName()` devolve `"Consultor"` cru quando
não consegue o nome — é a assinatura do e-mail (texto de saída), não da splash; só a splash
traduz o nome de reserva.

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
| Reset volta a PT | A1 | **corrigido** |
| Fallback silencioso para PT | `getScenarioFields` (`notes-data.js:698`), `getEmailTemplate` (`email-data.js`), seção `meio` do call script ES (o A4 já não deixa o embutido sumir da Central, mas cenário **novo**, sem versão EN, segue em PT em silêncio) | ADR de política: chip/modelo sem versão no idioma ganha selo "só PT" (ou fica desabilitado) |
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

1. ~~**Defeitos A1–A6**~~ — **feito** (seção A). A1 estragava a nota de todo agente ES/EN após o 1º caso; A4 deixava o agente EN com 0 de 26 cenários em inglês quando a Central servia só PT e ES.
2. ~~**Interface restante** (C1–C10)~~ — **feito** (seção C).
3. **Guardas que ainda faltam** no `test:i18n`: falhar em `getLanguage()`/`getOutputLanguage()` comparado a `'es'`/`'pt'` fora de `i18n.js` (hoje nenhum sobrou em `src/`: a guarda é para o próximo); falhar em `{PT, ES}` maiúsculo sem `EN`; e um `smoke:i18n-diff` (renderiza PT e EN e lista o que não mudou — é o método que achou o BAU Form inteiro).
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

1. **Leitura da seção E** está certa? (é a premissa da política de fallback e do selo "só PT")
2. **Trocar "Language" para EN deve mover "Case Language" junto?** O ADR-0016 disse que não, de propósito (nota EN em caso PT é silencioso e caro). Proposta que mantém o ADR: mostrar no cabeçalho do Case Notes o idioma da nota ("Nota em: PT") com troca em um clique. Hoje, com só a 1ª linha em EN, o formulário inteiro fica em PT sem nenhuma pista visual.
3. ~~**Hora em EN**~~ — **decidida pelo código**: 24 h (`en-GB`). O Timezone lê a hora pelo texto antes do `:`, e `3:27 PM` quebraria o status aberto/fechado. Mudar exigiria mexer nessa leitura primeiro.
4. **Central em EN agora**, ou depois do agente?
5. **Data do `[MM/DD/YYYY]` no Email Assistant, caminho manual** (`email-assistant.js:674`): sai **sempre** mês/dia/ano, em qualquer idioma — diferente do caminho automático, que segue o idioma do atendimento (A5). É intencional? Para um anunciante PT/ES, `09/05` quer dizer 9 de maio, não 5 de setembro.

## H. Descartado (não refazer)

- 40 "campos sem override EN" nos cenários: todos valores neutros (`N/A`, `-`, `• N/A`).
- `Interface Language`, `SO - Solution Offered`, `Yes`, `Info`, `Tech`, `Argentina`, nomes de task (`Ads Conversion Tracking`…): inglês por regra do rulebook, igual nos idiomas, ou falso positivo do detector.
- Links: 60/60 descrições em EN; call script EN completo (incl. `meio`); 27/27 cenários e 8/8 e-mails com EN.
- `'Não'` em `TLDashboard.html` e `BAU_API.js`: comparação com valor gravado, não texto de tela.
- Standalone do Pre-call (`precall-standalone*.js`): não auditado aqui; tem smoke próprio com variante EN.
