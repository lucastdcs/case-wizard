/**
 * Setup único: roda uma vez pelo editor do Apps Script (selecionar
 * `criarFormularioFeedback` no dropdown de função e clicar em "Executar").
 * Cria o Google Form de bugs/sugestões e conecta as respostas a uma aba
 * nova ("Feedback") nesta mesma planilha. Depois de rodar, apague ou deixe
 * este arquivo — ele não faz parte do fluxo do bookmarklet.
 */
function criarFormularioFeedback() {
  const form = FormApp.create('Case Wizard — Bugs e Sugestões');
  form.setDescription(
    'Achou um bug ou tem uma ideia pro Case Wizard? Conta aqui — leva menos de 1 minuto.'
  );
  form.setCollectEmail(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Tipo')
    .setChoiceValues(['Bug', 'Sugestão'])
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle('O que aconteceu / o que você gostaria')
    .setHelpText('Só o essencial — se for bug grave, a gente te chama pra mais detalhe depois.')
    .setRequired(true);

  form
    .addListItem()
    .setTitle('Onde (tela/ação do CRM)')
    .setChoiceValues([
      'Nota de caso',
      'Rascunho de e-mail',
      'Escalonamento BAU',
      'Script de ligação',
      'Planejamento de fuso horário',
      'Outro / não sei dizer',
    ])
    .setRequired(false);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('Form criado: %s', form.getEditUrl());
  Logger.log('Link para preenchimento: %s', form.getPublishedUrl());
}
