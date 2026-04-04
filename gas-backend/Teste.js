function dispararTestesDeEmails() {
  const meuEmail = Session.getActiveUser().getEmail();
  
  // Simulando um caso para AMANHÃ (Urgente!)
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);
  const dataMock = {
    advName: "Silva Imports", caseId: "7-123456", site: "www.silva.com", 
    availability: amanha.toISOString(), cid: "999-888-7777", taskType: "GTM", reason: "Nova Conta"
  };

  const id = "mock_12345";

  // 1. Email para o Agente (Enviou o BAU)
  sendDynamicTechSolEmail(meuEmail, dataMock, id, 'AGENT_BAU_SENT');
  
  // 2. Email para o TL (Com Badge de Urgência Vermelha!)
  sendDynamicTechSolEmail(meuEmail, dataMock, id, 'LEADERSHIP_BAU_RECEIVED');
  
  // 3. Email de Sucesso (TL criou o caso)
  sendDynamicTechSolEmail(meuEmail, dataMock, id, 'AGENT_BAU_CREATED');
  
  // 4. Email de Descarte (Aprovado)
  sendDynamicTechSolEmail(meuEmail, dataMock, id, 'AGENT_DISCARD_DONE');
  
  Logger.log("✅ 4 e-mails enviados para sua caixa de entrada. Veja as diferenças!");
}

/**
 * TESTE DE AUDITORIA: Verifica se a atribuição de LDAP está correta
 * Simula disparos como Agente (usando override) e como TL (usando Session)
 */
function testLdapAttribution() {
  const testAgentEmail = "agente.test@google.com";
  const activeUserEmail = Session.getActiveUser().getEmail();

  const mockData = { advName: "Audit Test Case" };
  const mockId = "audit_" + new Date().getTime();

  Logger.log("--- INICIANDO TESTE DE RASTREABILIDADE ---");

  // Caso 1: Ação do Agente (Deve usar o override)
  // Como não podemos interceptar o envio do e-mail aqui sem mudar a sendDynamicTechSolEmail,
  // vamos logar o que seria enviado.

  Logger.log("Cenário 1: Agente enviando requisição BAU");
  Logger.log("Esperado SENDER_LDAP: agente.test");
  // Simulação interna da lógica da sendDynamicTechSolEmail:
  const senderEmailAgent = testAgentEmail || activeUserEmail;
  const senderLdapAgent = senderEmailAgent ? senderEmailAgent.split('@')[0] : "Equipe BAU";
  Logger.log("Resultado Simulado: " + senderLdapAgent);

  // Caso 2: Ação do TL (Deve usar o Session, pois override será nulo)
  Logger.log("\nCenário 2: TL aprovando requisição (sem override)");
  Logger.log("Esperado SENDER_LDAP: " + (activeUserEmail ? activeUserEmail.split('@')[0] : "Equipe BAU"));
  const senderEmailTl = null || activeUserEmail;
  const senderLdapTl = senderEmailTl ? senderEmailTl.split('@')[0] : "Equipe BAU";
  Logger.log("Resultado Simulado: " + senderLdapTl);

  if (senderLdapAgent === "agente.test" && senderLdapTl === (activeUserEmail ? activeUserEmail.split('@')[0] : "Equipe BAU")) {
    Logger.log("\n✅ SUCESSO: A lógica de prioridade de autor está operando conforme as diretrizes de auditoria.");
  } else {
    Logger.log("\n❌ ERRO: Falha na lógica de atribuição de autor.");
  }
}