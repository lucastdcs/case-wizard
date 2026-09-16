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

## PII mascarada (e-mail e telefone do anunciante)

`Contact email`, `Login email` e `Phone number` chegam **mascarados**: o valor
não existe no DOM até alguém clicar no `.unmask-button` do `<pii-value>`. Ler o
container antes do clique devolve o rótulo do próprio botão ("Email", "Phone"),
que é o engano mais fácil de cometer aqui.

- Clique, **espere** o Angular renderizar (500 ms), e só então leia.
- Reconheça o valor pelo formato, não pela posição: o e-mail pelo `@`; o telefone
  por dígitos (8 a 15) e pontuação de telefone, descartando explicitamente o
  literal `Phone` e o `Is this:` do feedback do CRM.
- **Dispare os unmasks em paralelo.** `getPageData()` é chamado de sete pontos
  do app; dois cliques em série custariam 1 s a todos eles, e em paralelo custam
  os mesmos 500 ms de quando havia só um.
- Devolva `null` quando não achar — nunca `""` nem o rótulo. Quem consome
  precisa distinguir "não tem" de "não consegui ler".

## AM (Account Manager)

O AM é **o e-mail**, e só o e-mail. Ele vai para a coluna `AM_Nome` da planilha,
aparece como "AM Responsável" no TL Dashboard e é o BCC dos e-mails — três usos
em que um nome de exibição não serve: "Bianca Alves" não diz qual LDAP é a
pessoa, e o tradutor do CRM ainda pode reescrever esse texto.

- A resolução vive em `src/modules/shared/am-resolver.js` (ver ADR-0011). A fonte
  é o **case log**; o AM nunca é o `assignee`.
- **`<internal-user-info>` não identifica o AM.** Esse bloco lista os contatos
  internos da **conta**, não do caso — numa captura real são 55, todos com o
  mesmo `home-label`. Como a lista é da conta, ela é a mesma, e na mesma ordem,
  em **todos os casos daquele anunciante**: pegar "o primeiro da tela" grava o
  mesmo AM em todo caso que o log não resolver, em silêncio e com cara de
  raspagem bem-sucedida. Só use esse bloco como fallback quando houver
  **exatamente um** contato interno na tela.
- **Ambíguo devolve `null`.** Com 2+ candidatos e nada que desempate, não chute:
  o campo do formulário é obrigatório e o agente preenche. Chutar o AM errado
  manda BCC para a pessoa errada e polui a planilha — é pior que não preencher.
- Travado por `npm run test:scraping`, que exercita o caminho feliz **e** os
  cenários de fallback (sem candidato, 2 candidatos sem desempate, contato
  interno único).
