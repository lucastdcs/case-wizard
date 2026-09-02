# 🏛️ Arquitetura do Sistema (TechSol Operations Assistant)

> **Nota sobre documentação:** este arquivo descreve a arquitetura em nível macro (visão geral, alto nível). Para regras de negócio, contrato de payloads, schema do banco (Sheets) e padrões de UI/DOM que o código deve seguir, a fonte da verdade é a pasta [`specs/`](../specs/_MASTER_RULEBOOK.md) — ela é mantida em sincronia com o código atual. Este `docs/` foca em visão geral e histórico de decisões.

## 1. Visão Geral
O projeto é uma **Overlay Application** (Aplicação de Sobreposição) injetada via **Bookmarklet**. Diferente de extensões de navegador, ela não possui armazenamento persistente próprio além do `localStorage` e roda no contexto da página alvo (CRM), compartilhando o mesmo DOM e objeto `window`.

### 1.1 O Mecanismo de Injeção
Para contornar a *Content Security Policy (CSP)* estrita do CRM, o bookmarklet de instalação utiliza a API `trustedTypes`.
* **Política:** Cria uma política chamada `default` que autoriza a execução de scripts vindos do domínio de hospedagem do bundle — hoje `cases-wizard.web.app` (Firebase Hosting). Durante a transição, `lucastdcs.github.io` continua servindo em paralelo para quem ainda não trocou o favorito.
* **Cache:** O bundle é servido com `Cache-Control` definido no `firebase.json` (`no-cache` em produção, `no-store` em dev) e a URL é estável. O cache-buster `?t=...` foi removido: ele existia porque o GitHub Pages servia com `max-age` fixo e sem controle nosso, e tornava cada clique um URL novo — o que garantia download completo e inutilizava o cache do navegador.

## 2. Estrutura de Inicialização (`src/app.js`)
O ponto de entrada é o arquivo `app.js`. Ele orquestra o "boot" da aplicação em uma ordem específica para garantir estabilidade visual e funcional:

1.  **Bloqueio de Múltiplas Instâncias:** Verifica `window.techSolInitialized` para impedir que o script rode duas vezes na mesma aba.
2.  **Styles & Fonts:** Injeta estilos globais e a fonte Roboto/Google Sans no `<head>` via `initGlobalStylesAndFont`.
3.  **Audio Engine:** Inicializa o `SoundManager` e adiciona listeners globais para feedback tátil (sons de hover/click).
4.  **Data Fetching:** Dispara a busca assíncrona das dicas (`DataService.fetchTips`) e resolve o perfil do agente (`fetchUserProfile`), que define tanto o idioma da interface (`applyProfileLanguage`) quanto o segmento que a pessoa atende (`setUserProfile`) — este último é o que decide qual disponibilidade BAU e quais avisos segmentados ela enxerga. Cada módulo busca o próprio conteúdo depois disso.
5.  **Module Init:** Instancia cada módulo (Notes, Email, Call Script, Timezone, BAU Central, Minha Biblioteca, Configurações, etc.), que retornam suas funções de controle (ex: `toggleNotes`).
6.  **Command Center:** Injeta a pílula flutuante principal, passando as funções de controle dos módulos para os botões.

## 3. Fluxo de Dados (Backend Serverless)
Como não possuímos um backend tradicional, utilizamos o **Google Apps Script** como API. O código-fonte do backend vive em [`gas-backend/`](../gas-backend/) neste mesmo repositório, sincronizado com o projeto Apps Script via [`clasp`](https://github.com/google/clasp) (job próprio dentro do mesmo `.github/workflows/deploy.yml`, separado do build do front-end — veja `docs/WORKFLOW.md` para o detalhe de push vs. promoção de implantação). O banco de dados é uma planilha Google Sheets (ver `specs/data-models/db-schema.md`).

* **Interface (front-end):** `src/modules/shared/data-service.js`.
* **Roteamento (back-end):** `gas-backend/Código.js`, função `doGet(e)` — despacha por `op` (`op=content_public`, `op=create_bau`, `op=get_user_profile`, etc.) para os módulos correspondentes (`BAU_API.js`, `EmailEngine.js`, `ContentAPI.js`...). `op=broadcast` e `op=tips` seguem existindo como rotas legadas, mas servem o conteúdo da Central — bundles antigos ainda em cache continuam lendo a mesma fonte que os novos.
* **Todas as chamadas (leitura e escrita) usam JSONP**, não `fetch`: o front cria uma tag `<script src="...&callback=cw_cb_XXXX">`, o backend devolve o JSON embrulhado nessa função de callback (`cw_cb_XXXX(...)`), e o front resolve a Promise quando a função global é chamada. Isso evita bloqueios de CORS, mas significa que toda operação (inclusive escritas como `create_bau`) passa pela URL como query string — e é por isso que **escrita de conteúdo institucional não mora aqui**: ver a Central de Conteúdo logo abaixo.

### 3.1 Central de Conteúdo

O conteúdo que a operação edita sem deploy (links, call script, modelos de e-mail e de nota, dicas, **avisos** e **disponibilidade BAU**) vive em `gas-backend/ContentAPI.js`, com a tela de gestão em `gas-backend/ContentDashboard.html`.

* **Leitura pelo app do agente:** `op=content_public&module=<nome>` — só devolve itens com status `live`. Não existe parâmetro de status nessa rota de propósito: conteúdo em revisão não tem caminho de leitura nenhum. A mesma rota aceita `modules=a,b,c` e devolve `{ modules: { nome: [...] } }`: o boot do agente pede os sete módulos numa execução só, em vez de uma por módulo — o que numa virada de turno era a diferença entre uma execução por pessoa e centenas simultâneas. A regra de módulo privado vale igual nas duas formas, então `people` não vaza pela lista.
* **Cache:** a leitura pública é servida por `CacheService` com TTL de 5 min por módulo, **invalidado explicitamente** por toda escrita que muda o que está no ar (aprovar, publicar direto, tirar do ar, reverter, semear). O TTL sozinho faria conteúdo aprovado demorar até cinco minutos para chegar ao agente; a invalidação sozinha deixaria entrada órfã se uma escrita falhasse no meio.
* **Trava de escrita:** o caminho de publicação roda sob `LockService.getScriptLock()`. Sem ela, duas aprovações simultâneas da mesma proposta passavam as duas pela checagem de "ainda está pendente?" e anexavam duas linhas `live` na mesma linhagem — item duplicado na tela do agente, para sempre, sem erro em log nenhum.
* **Escrita:** nunca por JSONP. A tela da Central usa `google.script.run`, que roda no contexto autenticado de quem carregou a página, com o papel verificado no servidor (`Content_Access`). Uma rota JSONP de escrita seria escrita por URL pública — foi exatamente o problema que tirou `new_broadcast`/`update_broadcast`/`delete_broadcast` do `doGet`.
* **Fluxo padrão:** rascunho → pendente → aprovado → live, com versionamento e rollback.
* **Exceção — o diretório de pessoas (`people`):** a aba **People** da planilha é editada pela mesma tela (aba "Pessoas") e passa pela mesma fila, mas é o único módulo cuja aprovação **não escreve em `Content_Items`** — ela aplica na própria aba People, que é o que `getUserProfileByLdap()` lê (`gas-backend/PeopleAPI.js`). Tem duas regras próprias, porque não é conteúdo e sim autorização: **só o ADMIN aprova** (papel errado abre o TL Dashboard para quem não devia, e quem aprova pode ser o beneficiado) e **quem não propõe também não lê**. Nunca é servido por `op=content_public`. Ver `docs/decisions/0006-aba-people-editavel-na-central.md`.
* **Exceção — publicação direta:** `broadcast` e `bau_availability` publicam direto em `live` (`publishContentDirect`), sem fila. Um alerta que espera revisor chega depois de já não importar, e uma data de disponibilidade aprovada amanhã é uma data errada na tela hoje. Continuam versionados e no log; só não esperam. Quem pode publicar segue a matriz de papéis: ADMIN e TL nos dois, WFM só na disponibilidade.
* **A tela da Central** é montada por `include()` (`Código.js`): a casca `ContentDashboard.html` traz a marcação, e estilo e comportamento entram de `ContentDashboard_Styles`, `_Core`, `_Catalog`, `_Ops` e `_Governance`. O corte segue o regime de publicação de cada módulo, não a ordem em que foram escritos. Como o Apps Script não tem imports, todas as partes caem no mesmo escopo global.
* **TL Dashboard (`gas-backend/TLDashboard.html`):** é servido diretamente pelo `doGet` (`?page=tl`) como uma página HTML Service própria, separada da API JSONP acima. As ações dessa página (`getPendingBAUCases`, `updateBAUCaseStatus`) usam a ponte nativa `google.script.run`, que roda no contexto autenticado de quem carregou a página — não passam pelo `op=` do roteador JSONP.
* **Acesso:** o Web App do Apps Script está configurado com `access: "DOMAIN"` (`gas-backend/appsscript.json`) — só usuários autenticados do mesmo domínio Google Workspace conseguem chamar a API, não é público na internet.
* **Dev vs. Produção são implantações (deployments) diferentes**, não uma só compartilhada: `main` e `refactor-structure` têm cada uma seu próprio `SCRIPT_ID`/deployment ID hardcoded em `data-service.js` (URLs `.../s/{id}/exec` distintas). Ambas compartilham o mesmo código-fonte (`gas-backend/`) e o mesmo projeto Apps Script, mas cada implantação fica travada na versão em que foi promovida por último — ver `docs/WORKFLOW.md`.

## 4. Design System & UI
A interface não usa frameworks (React/Vue). É construída com **Vanilla JS** e **CSS-in-JS**.
* **Header Factory:** Padroniza as janelas com efeito "Glassmorphism" (vidro), barra de gradiente Google e botões de controle.
* **Genie Effect:** O sistema de animação (`animations.js`) calcula a posição do botão flutuante e do centro da tela para criar o efeito de "gênio da lâmpada" ao abrir/fechar módulos.