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