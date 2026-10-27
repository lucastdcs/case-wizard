<!-- generated-by: groundrules v1.10.0 -->
# Glossary — Case Wizard

Domain vocabulary for the project. One entry per term, alphabetical order.

Keep definitions short and precise. The goal: a new developer (or Claude) quickly understands the domain language.

---

## B

**BAU** — "Business As Usual" case type/queue. One of the two main case categories (see LM). Cases can be escalated to a BAU queue via the BAU Central wizard.

**Bookmarklet** — A `javascript:` URI saved as a browser bookmark. Clicking it runs the code immediately in the context of whatever page is open (here, the CRM), injecting the app's `<script>` tag. This project's entire distribution mechanism — no extension, no install.

## C

**Categoria (de link)** — O grupo em que um link mora (Tasks, Ads, QA, Feedback…) e que vira um botão no trilho do módulo de Links. As 10 do sistema (`tasks, ads, analytics, shopping, tech, hr, lm, qa, suporte, feedback`) vêm no bundle; as demais são criadas pela Central (módulo `link_categories`, ADR-0019) com nome de até 12 letras, uma cor e um ícone de listas fechadas. A chave é imutável depois de publicada, porque cada link a guarda.

**CID** — Customer/case identifier captured live during a call (Call Script Assistant) or from the CRM page.

**Command Center** — The floating pill UI (`src/modules/shared/command-center.js`) that is the app's main entry point, surfacing every module and drag-repositionable on screen.

**Command Palette** — The `Ctrl/Cmd+K` quick-search overlay (`command-palette.js`) that calls the same toggle functions as clicking a Command Center icon, without duplicating open/close logic. It lists two groups: the agent's own **Shortcuts** first, then the modules.

**Shortcut (Ctrl+K)** — An agent-owned command in the palette (`shared/shortcut-service.js`): a case type + status + substatus + zero or more scenarios, with a name and a search alias. It stores *references* to scenarios, never their text, so published content corrections reach it for free. Created from Case Notes ("Salvar como atalho") or from Configurações → Meus Atalhos; capped at 8. Not to be confused with a **Scenario**, which is content, or a **Draft**, which is one unfinished note.

## D

**Deployment (Apps Script)** — A *promoted, pinned* version of the Apps Script project, served at a stable `/exec` or `/dev` URL. Distinct from the HEAD (see below): pushing code does not change what a deployment serves until someone explicitly promotes a new version into it.

**Destaque (de link)** — Um link posto na home do módulo de Links por um período, com título e resumo próprios. No máximo 3 no ar ao mesmo tempo (1 principal + 2). Não é um campo do link, e sim uma linha própria (módulo `link_highlights`, publicação direta) que aponta para a `Lineage` do link: assim o link continua na biblioteca quando a janela vence. A janela é avaliada no servidor, no fuso da planilha. Depois de encerrado, ele alimenta "Saíram do destaque" por 30 dias.

## G

**Genie Effect** — The open/close animation (`animations.js`) that computes a trajectory between the floating Command Center button and a module's on-screen position, evoking a "genie coming out of the lamp."

**Ghost draft** — A stray/incomplete Gmail draft left behind by a previous run of the Email Assistant. The assistant polls for and clears these before inserting a new template.

## H

**HEAD (Apps Script)** — The latest code visible in the Apps Script editor after `clasp push`. Updating HEAD does **not** update a live deployment URL — see Deployment.

## J

**JSONP** — The transport used for every call between the frontend and the Apps Script backend (`jsonpFetch` in `data-service.js`): a `<script src="...&callback=...">` tag instead of `fetch`, chosen to sidestep CORS restrictions in the CRM's environment. All parameters — including writes — travel in the URL query string.

## L

**Lineage (linhagem)** — A identidade estável de um item da Central ao longo das versões (`Content_Items.Lineage`, no formato `itm_<uuid>`). O `ID` muda a cada publicação, porque cada versão é uma linha nova; a linhagem não. É o que um destaque, um favorito ou um recente guardam para apontar para um link — nunca o `ID`, a URL ou uma cópia do nome. Um link do fallback embutido, que nunca passou pela Central, usa `u:<url>`.

**LM** — The other main case category alongside BAU (see BAU). Referenced together as "BAU/LM" throughout Case Notes and templates.

## O

**OOS** — "Out of scope": o pedido do anunciante está fora do que o time atende. No Pre-call Checklist é um dos três valores de *Next steps* (`Proceed` / `OOS` / `Infeasible`); no Case Notes corresponde ao substatus `IN_Out_of_Scope_Rerouted`.

## P

**Pre-call Checklist** — Formulário curto, feito antes da ligação, cujo resultado é o bloco "Pre-call checklist" da case note (`src/modules/notes/precall/`). Filtra cedo o que é OOS ou inviável. O bloco sai **sempre em inglês** e com texto fixo, porque a conformidade do SOP é medida lendo as notas (ADR-0018, `specs/workflow/precall-checklist.md`). Quem não faz o checklist (Live Meet, caso que chegou com menos de 1h) registra `Completed: No` com o motivo.

**Prévia (de link)** — Os dois textos curtos que o painel lateral do módulo de Links mostra ao passar o mouse ou focar num link: **"O que é"** (até 200 caracteres) e **"Quando usar"** (até 160), em PT/ES/EN. Moram no próprio link, não no destaque, então valem para a biblioteca inteira. Link sem prévia cai na descrição curta.

## S

**sGTM** — Server-side Google Tag Manager. Uma das perguntas Yes/No do Pre-call Checklist.

**Smart CR** — Email Assistant shortcuts tied to a Case Notes sub-status, letting an agent jump straight to the matching email template from the note-taking flow.

**Speakeasy ID** — An identifier automatically captured by Case Notes from the CRM page during note generation.

**Sub-status** — The second level of the Case Notes generation flow (Status → Sub-status → template): narrows a case's status down to the specific template variant to generate.

## T

**Task** — Uma implementação que o agente marca na nota, e também na grade do formulário BAU (GTM Installation, Ads Conversion Tracking, GA4 Setup…). O catálogo é um só nos dois lugares; o form consome apenas o nome (ADR-0014). Cada task carrega a lista de **screenshots** que o Win Criteria exige como evidência, em dois modos: `implementation` (o agente implementou pelo anunciante) e `education` (ensinou o anunciante a implementar). Desde 2026-09 é conteúdo gerenciável pelos SMEs — módulo `task_screenshots` da Central de Conteúdo, aba "Tasks" (ADR-0012) —, e não mais o `TASKS_DB` do bundle, que ficou como fallback embutido. A **chave** da task (`ads_conversion_tracking`) é a identidade que os modelos de nota (`linkedTask`), os rascunhos salvos e os atalhos do Ctrl+K guardam: não muda.

**TL Dashboard** — `gas-backend/TLDashboard.html`, a separate Apps Script HTML Service page (`?page=tl`) used by team leads to review and act on escalated BAU cases. Uses `google.script.run`, not the JSONP router.

**trustedTypes policy** — The browser API the production bookmarklet uses to satisfy the CRM's strict Content Security Policy before injecting the app's `<script>` tag.

## W

**Win Criteria** — A régua de qualidade do atendimento, mantida pelos SMEs numa planilha própria (linkada em Links → "Win Criteria"). Define, por task, quais evidências (screenshots) a nota precisa carregar para o caso ser considerado bem resolvido. O Case Wizard não interpreta a régua: ele exibe os rótulos de evidência publicados na Central e monta um campo de link para cada um.

<!-- Continue alphabetically -->
