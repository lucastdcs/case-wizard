/**
 * Setup único: cole este arquivo no MESMO projeto Apps Script que já está
 * vinculado à planilha de operações (o que o clasp sincroniza — abra a
 * planilha e vá em Extensões > Apps Script, não crie um projeto avulso em
 * script.google.com, senão SpreadsheetApp.getActiveSpreadsheet() volta null
 * e o script quebra na hora de achar a planilha ativa).
 * Depois, selecione `criarFormularioFeedback` no dropdown de função e
 * clique em "Executar". Cria o Google Form de bugs/sugestões e conecta as
 * respostas a uma aba ("Feedback") nesta mesma planilha. Depois de rodar,
 * apague ou deixe este arquivo — ele não faz parte do fluxo do bookmarklet.
 *
 * A imagem de topo (docs/media/feedback-form-banner.png) não é aplicada por
 * aqui — o FormApp não tem API para o banner de tema do Google Forms, só a
 * UI ("Personalizar tema") permite. Suba manualmente depois de criar o form.
 *
 * Não força coleta de e-mail: sem `setRequireLogin` (que o Apps Script não
 * expõe — é config de organização no Workspace, fora do nosso controle),
 * `setCollectEmail(true)` viraria um campo obrigatório digitado à mão, o que
 * contradiz o objetivo de manter o form rápido de preencher.
 */
function criarFormularioFeedback() {
  const form = FormApp.create('Case Wizard — Bugs e Sugestões');
  form.setDescription(
    'Achou um bug ou tem uma ideia pro Case Wizard? Conta aqui — leva menos de 1 minuto.'
  );

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
  if (!ss) {
    throw new Error(
      'Nenhuma planilha ativa. Este script precisa estar no projeto Apps Script ' +
      'vinculado à planilha de operações — abra a planilha e use Extensões > Apps ' +
      'Script, em vez de rodar num projeto avulso criado em script.google.com.'
    );
  }
  const abasAntes = ss.getSheets().map((sheet) => sheet.getName());
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // setDestination não deixa escolher o nome da aba — ele cria uma nova
  // ("Respostas ao formulário 1" ou similar, depende do locale) que
  // precisamos identificar pelo que não existia antes e renomear.
  const abaNova = ss.getSheets().find((sheet) => !abasAntes.includes(sheet.getName()));
  if (abaNova) abaNova.setName('Feedback');

  Logger.log('Form criado: %s', form.getEditUrl());
  Logger.log('Link para preenchimento: %s', form.getPublishedUrl());
}
