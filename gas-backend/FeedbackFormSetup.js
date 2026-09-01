/**
 * Setup único: roda uma vez pelo editor do Apps Script (selecionar
 * `criarFormularioFeedback` no dropdown de função e clicar em "Executar").
 * Cria o Google Form de bugs/sugestões e conecta as respostas a uma aba
 * nova ("Feedback") nesta mesma planilha. Depois de rodar, apague ou deixe
 * este arquivo — ele não faz parte do fluxo do bookmarklet.
 *
 * O FormApp do Apps Script não expõe API para o banner de tema do Google
 * Forms (isso só dá pra ajustar na UI, em "Personalizar tema"). Pra ter uma
 * imagem mesmo assim, `docs/media/feedback-form-banner.png` é inserida como
 * o primeiro item do formulário. Suba esse PNG pro Google Drive, pegue o
 * ID do arquivo (na URL, entre `/d/` e `/view`) e cole abaixo antes de rodar.
 */
const BANNER_DRIVE_FILE_ID = 'COLE_AQUI_O_ID_DO_ARQUIVO_NO_DRIVE';

function criarFormularioFeedback() {
  const form = FormApp.create('Case Wizard — Bugs e Sugestões');
  form.setDescription(
    'Achou um bug ou tem uma ideia pro Case Wizard? Conta aqui — leva menos de 1 minuto.'
  );
  form.setCollectEmail(true);

  if (BANNER_DRIVE_FILE_ID && BANNER_DRIVE_FILE_ID !== 'COLE_AQUI_O_ID_DO_ARQUIVO_NO_DRIVE') {
    const banner = DriveApp.getFileById(BANNER_DRIVE_FILE_ID).getBlob();
    form.addImageItem().setImage(banner);
  }

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
