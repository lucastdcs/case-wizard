// scripts/precall-standalone-en-labels.mjs
//
// Rótulos que o CRM mostra em inglês (a tela original), os únicos que o build em
// inglês do Pre-call deixa em `crm-labels.js`. Os em português e espanhol de lá
// só servem a uma tela traduzida cuja reversão falhou; na variante em inglês a
// tela é a original, e quem abrir o arquivo não pode achar "tarefas de
// agendamento" nele. Cada rótulo precisa existir na produção (o build confere), e
// o smoke proíbe no arquivo tudo o que a produção tem e esta lista não.

export const ROTULOS_EN = {
    serviceHorizontal: ['service horizontal'],
    serviceOffering: ['service offering'],
    specialization: ['specialization'],
    routingChannel: ['routing communication channel'],
    businessLanguage: ['business language'],
    vendorPartner: ['vendor partner'],
    appointmentTasks: ['appointment tasks'],
    salesProgram: ['sales program'],
    customerTimezone: ['customer time zone', 'time zone', 'timezone'],
    externalCustomerId: ['google ads external customer id'],
    additionalInfo: ['additional info'],
    givenName: ['given name'],
    familyName: ['family name'],
    contactEmail: ['contact email'],
    loginEmail: ['login email'],
    phoneNumber: ['phone number'],
    appointmentTime: ['appointment time'],
    neoOrg: ['neo org'],
    neoProduct: ['neo product'],
    website: ['website'],
    program: ['program'],
    adsBusinessSector: ['ads business sector'],
    interactionType: ['interaction type'],
    salesRegion: ['sales region'],
};
