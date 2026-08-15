# 🏛️ Arquitetura do Sistema (TechSol Operations Assistant)

> **Nota sobre documentação:** este arquivo descreve a arquitetura em nível macro (visão geral, alto nível). Para regras de negócio, contrato de payloads, schema do banco (Sheets) e padrões de UI/DOM que o código deve seguir, a fonte da verdade é a pasta [`specs/`](../specs/_MASTER_RULEBOOK.md) — ela é mantida em sincronia com o código atual. Este `docs/` foca em visão geral e histórico de decisões.

## 1. Visão Geral
O projeto é uma **Overlay Application** (Aplicação de Sobreposição) injetada via **Bookmarklet**. Diferente de extensões de navegador, ela não possui armazenamento persistente próprio além do `localStorage` e roda no contexto da página alvo (CRM), compartilhando o mesmo DOM e objeto `window`.

### 1.1 O Mecanismo de Injeção
Para contornar a *Content Security Policy (CSP)* estrita do CRM, o bookmarklet de instalação utiliza a API `trustedTypes`.
* **Política:** Cria uma política chamada `default` que autoriza a execução de scripts vindos do domínio `lucastdcs.github.io`.
* **Cache Busting:** Anexa um timestamp (`?t=...`) na URL do script para forçar o navegador a baixar a versão mais recente a cada execução.

## 2. Estrutura de Inicialização (`src/app.js`)
O ponto de entrada é o arquivo `app.js`. Ele orquestra o "boot" da aplicação em uma ordem específica para garantir estabilidade visual e funcional:

1.  **Bloqueio de Múltiplas Instâncias:** Verifica `window.techSolInitialized` para impedir que o script rode duas vezes na mesma aba.
2.  **Styles & Fonts:** Injeta estilos globais e a fonte Roboto/Google Sans no `<head>` via `initGlobalStylesAndFont`.
3.  **Audio Engine:** Inicializa o `SoundManager` e adiciona listeners globais para feedback tátil (sons de hover/click).
4.  **Data Fetching:** Dispara a busca assíncrona de dicas e broadcasts (`DataService.fetchTips`).
5.  **Module Init:** Instancia cada módulo (Notes, Email, Call Script, Timezone, BAU Central, Minha Biblioteca, Configurações, etc.), que retornam suas funções de controle (ex: `toggleNotes`).
6.  **Command Center:** Injeta a pílula flutuante principal, passando as funções de controle dos módulos para os botões.

## 3. Fluxo de Dados (Backend Serverless)
Como não possuímos um backend tradicional, utilizamos o **Google Apps Script** como API. O código-fonte do backend vive em [`gas-backend/`](../gas-backend/) neste mesmo repositório, sincronizado com o projeto Apps Script via [`clasp`](https://github.com/google/clasp) (fluxo de deploy separado do build do front-end — veja `docs/WORKFLOW.md`). O banco de dados é uma planilha Google Sheets (ver `specs/data-models/db-schema.md`).

* **Interface (front-end):** `src/modules/shared/data-service.js`.
* **Roteamento (back-end):** `gas-backend/Código.js`, função `doGet(e)` — despacha por `op` (`op=broadcast`, `op=create_bau`, `op=get_user_profile`, etc.) para os módulos correspondentes (`BAU_API.js`, `BAUForm.js`...).
* **Todas as chamadas (leitura e escrita) usam JSONP**, não `fetch`: o front cria uma tag `<script src="...&callback=cw_cb_XXXX">`, o backend devolve o JSON embrulhado nessa função de callback (`cw_cb_XXXX(...)`), e o front resolve a Promise quando a função global é chamada. Isso evita bloqueios de CORS, mas significa que toda operação (inclusive escritas como `new_broadcast` ou `create_bau`) passa pela URL como query string.
* **TL Dashboard (`gas-backend/TLDashboard.html`):** é servido diretamente pelo `doGet` (`?page=tl`) como uma página HTML Service própria, separada da API JSONP acima. As ações dessa página (`getPendingBAUCases`, `updateBAUCaseStatus`) usam a ponte nativa `google.script.run`, que roda no contexto autenticado de quem carregou a página — não passam pelo `op=` do roteador JSONP.
* **Acesso:** o Web App do Apps Script está configurado com `access: "DOMAIN"` (`gas-backend/appsscript.json`) — só usuários autenticados do mesmo domínio Google Workspace conseguem chamar a API, não é público na internet.

## 4. Design System & UI
A interface não usa frameworks (React/Vue). É construída com **Vanilla JS** e **CSS-in-JS**.
* **Header Factory:** Padroniza as janelas com efeito "Glassmorphism" (vidro), barra de gradiente Google e botões de controle.
* **Genie Effect:** O sistema de animação (`animations.js`) calcula a posição do botão flutuante e do centro da tela para criar o efeito de "gênio da lâmpada" ao abrir/fechar módulos.