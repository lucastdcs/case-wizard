# 🕷️ SCRAPING RULES (Extração de Dados)

## Proteção de Idioma (Show Original)
A tradução automática do navegador quebra as âncoras e os dados extraídos do DOM.
- **Passo Obrigatório:** Antes de qualquer rotina de captura (ex: `populateContextData`), o script deve buscar o botão de tradução do sistema:
  `<material-button class="toggle-translation-button ...">`
- O script deve forçar o clique (`element.click()`) neste botão para exibir o idioma original da página.
- **Wait Time:** Adicionar um atraso/timeout assíncrono (ex: 300ms a 500ms) após o clique para permitir que a interface original seja renderizada no DOM antes da extração.

## Tratamento de Erros Silencioso
- Toda a lógica de extração no DOM de terceiros deve ser envolvida em `try/catch`. 
- Se um elemento não for encontrado (ex: o botão "Show original" sumir em alguma atualização futura), o sistema deve falhar silenciosamente (`console.warn`), pular a etapa e permitir que o usuário preencha o dado manualmente no formulário. A aplicação nunca deve travar por falha de scraping.