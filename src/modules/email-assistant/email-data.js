import { DataService } from "../shared/data-service.js";

// ==================================================================
//                    TEMPLATES DE E-MAIL (PT)
// ==================================================================
// A versão em espanhol vive em EMAIL_TEMPLATES_ES, no fim deste arquivo.
//
// IMPORTANTE: os tokens entre colchetes ([Seu Nome], [Nome do Cliente],
// [INSERIR URL], [URL], [DATA 1]...) são a chave que liga o corpo do e-mail
// ao campo que o agente preenche (`placeholders[].key`, usado como
// input.dataset.key em email-assistant.js) e às substituições automáticas
// de email-automation-service.js. Por isso eles permanecem EM PORTUGUÊS
// também no corpo em espanhol - traduzi-los quebraria o preenchimento.
// Só o texto ao redor e o `label` (o que o agente lê na tela) mudam.
export const EMAIL_TEMPLATES = [
  {
    "id": "attempt_10min",
    "name": "Tentativa de Contato (Antes dos 10min)",
    "category": "Tentativas & Agendamento",
    "subject": "Implementação com o Time de Soluções Técnicas do Google - Tentativa de Contato",
    "placeholders": [
      { "key": "[Seu Nome]", "label": "Seu Nome", "type": "text", "auto": "agentName" },
      { "key": "[INSERIR URL]", "label": "URL do Site", "type": "text" },
      { "key": "[LINK DO MEET]", "label": "Link da Reunião", "type": "text" }
    ],
    "template": "<p>Olá,</p><br><p>Aqui é o <strong>[Seu Nome]</strong> da equipe de Soluções Técnicas do Google. Tentei ligar no seguinte número: <strong>...</strong> sem sucesso, teria outro número para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, você pode acessar o link da nossa reunião: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google.</p>"
  },
  {"id": "reschedule2",
    "name": "Proposta de Reagendamento",
    "category": "Tentativas & Agendamento",
    "subject": "Reagendamento de Consultoria",
    "placeholders": [
      { "key": "[DATA 1]", "label": "Data 1", "type": "text" },
      { "key": "[HORA 1]", "label": "Hora 1", "type": "text" },
      { "key": "[DATA 2]", "label": "Data 2", "type": "text" },
      { "key": "[HORA 2]", "label": "Hora 2", "type": "text" },
      { "key": "[DATA 3]", "label": "Data 3", "type": "text" },
      { "key": "[HORA 3]", "label": "Hora 3", "type": "text" },
      { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
    ],
    "template": "<p>Olá, tudo bem?</p><br><p>Seguem as próximas datas disponíveis:</p><ul><li><strong>[DATA 1] às [HORA 1]</strong></li><li><strong>[DATA 2] às [HORA 2]</strong></li><li><strong>[DATA 3] às [HORA 3]</strong></li></ul><br><p>Também informo que se não houver resposta a este email nas próximas 48 horas o caso será encerrado.</p><p>Reforço que minha agenda é dinâmica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias disponíveis. Logo, quanto mais rápido conseguir me responder, mais garantido será o agendamento de data e horário.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google.</p>"
  },
  {
    "id": "max_reschedules",
    "name": "Limite de Reagendamentos Excedido",
    "category": "Tentativas & Agendamento",
    "subject": "Status do Agendamento - Time de Soluções Técnicas do Google",
    "placeholders": [
      { "key": "[Nome do Cliente]", "label": "Nome do Cliente", "type": "text" },
      { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
    ],
    "template": "<p>Olá, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementação das tags.</p><br><p>Infelizmente, <strong>não podemos mais reagendar este caso específico</strong>, pois excedemos o limite máximo de agendamentos permitido.</p><br><p>Se você deseja prosseguir com a implementação das tags, será necessário abrir um <strong>novo caso</strong> diretamente com a <a href=\"https://support.google.com/google-ads\">Ajuda do Google Ads</a>. Isso garantirá que você receba o acompanhamento e o suporte necessário para dar continuidade à sua solicitação.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colaboração.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>"
  },
  {
    "id": "2_6_day3",
    "name": "Dia 3 (Acompanhamento)",
    "category": "Follow Up",
    "subject": "Consultoria com a Equipe de Soluções Técnicas do Google",
    "placeholders": [
      { "key": "[Nome do Cliente]", "label": "Nome do Cliente", "type": "text" },
      { "key": "[INFORMAR QUAL AÇÃO FICOU PENDENTE]", "label": "Ação Pendente", "type": "text" },
      { "key": "[MM/DD/YYYY]", "label": "Data do Próximo Contato", "type": "date" },
      { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
    ],
    "template": "<p>Olá, <strong>[Nome do Cliente]</strong></p><br><p>Espero que você esteja bem!</p><p>Tentamos contato através do Número de Telefone, porém sem sucesso. Gostaria de saber se você já conseguiu <strong>[INFORMAR QUAL AÇÃO FICOU PENDENTE]</strong>, ou se você já possui uma previsão de quando essa ação será concluída.</p><br><p>Continuarei monitorando o status da implementação no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementação.</p><p>Se você tiver algum problema ou dúvidas que impossibilite de realizar a implementação, fique à vontade para compartilhá-lo conosco.</p><br><p>Fico à disposição.</p><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>"
  },
  {
    "id": "2_6_day6",
    "name": "Dia 6 (Acompanhamento Final)",
    "category": "Follow Up",
    "subject": "Consultoria com a Equipe de Soluções Técnicas do Google",
    "placeholders": [
      { "key": "[Nome do Cliente]", "label": "Nome do Cliente", "type": "text" },
      { "key": "[URL]", "label": "URL do Site", "type": "text" },
      { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
    ],
    "template": "<p>Olá, <strong>[Nome do Cliente]</strong></p><br><p>Espero que você esteja bem!</p><p>Após análise e revisão do status de implementação da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda está com a implementação pendente. Tentamos contato através do email, porém sem sucesso.</p><br><p>É essencial que seja implementado, pois ele oferece uma ampla gama de benefícios, como:</p><ul><li>Ajuda a rastrear conversões em tempo real</li><li>Melhora a geração de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os anúncios e acompanhar conversões</li><li>Fornece informações sobre a experiência do usuário</li></ul><br><p>Se você tiver algum problema ou dúvidas que o impossibilite de realizar a implementação, fique à vontade para compartilhá-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso não tenhamos nenhuma resposta nos próximos 3 dias, infelizmente o caso será encerrado.</p><br><p>Fico à disposição.</p><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>"
  },
  {
    "id": "2_6_completed_reschedule",
    "name": "Ações Concluídas (Solicitar Reagendamento)",
    "category": "Follow Up",
    "subject": "Continuidade da Implementação - Soluções Técnicas do Google",
    "placeholders": [
      { "key": "[Disponibilidade em BAU]", "label": "Próxima Disponibilidade", "type": "text" },
      { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
    ],
    "template": "<p>Olá, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as ações pendentes. Sendo assim, agora podemos continuar com a implementação das configurações em sua conta.</p><br><p>Para isso, peço, por favor, que me envie algumas das próximas datas e horários em que está disponível a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informação, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Também informo que se não houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve possível.</p><p>Reforço que minha agenda é dinâmica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias disponíveis. Logo, quanto mais rápido conseguir me responder, mais garantido será o agendamento de data e horário.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google.</p>"
  },
  {
    "id": "nrp_standard",
    "name": "NRP - Padrão (3ª Tentativa)",
    "category": "NRP / Encerramento",
    "subject": "Implementação com o Time de Soluções Técnicas do Google - Encerramento",
    "placeholders": [
      { "key": "[Nome do Cliente]", "label": "Nome do Cliente", "type": "text" },
      { "key": "[Task pedida pelo AM]", "label": "Task Solicitada", "type": "text" },
      { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
    ],
    "template": "<p>Olá, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para você hoje sobre o caso de Implementação da tag referente à solicitação para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita após 10 minutos, mas também não conseguimos contato com você.</p><p>Devido à grande demanda, não podemos reagendar um horário. Por isso, vamos encerrar este caso. No entanto, se você ainda quiser continuar com a implementação, basta você acessar este link e escolher a melhor data e horário para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reunião.</p><p>Lamentamos o inconveniente e esperamos trabalhar com você novamente no futuro.</p><br><p>Se você quiser saber mais, confira abaixo alguns links úteis de recursos valiosos relacionados à implementação de tags e suporte do Shopping.</p><p><strong>Em relação às tags</strong></p><ul><li><a href=\"https://developers.google.com/gtagjs\">Suporte à implementação de tags</a></li><li><a href=\"https://www.youtube.com/user/learnwithgoogle/playlists\">Google Ads</a></li><li><a href=\"https://www.youtube.com/user/googleanalytics\">Google Analytics</a></li></ul><p><strong>Em relação ao Shopping</strong></p><ul><li><a href=\"https://www.google.com/retail/\">Google for Retail</a></li><li><a href=\"https://www.google.com/retail/solutions/merchant-center/\">Google Merchant Center</a></li><li><a href=\"https://support.google.com/merchants/answer/188924\">Como configurar a conta e o feed</a></li><li><a href=\"https://support.google.com/merchants/topic/7294606\">Otimização do feed</a></li><li><a href=\"https://support.google.com/merchants/answer/9199328\">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>"
  },
  {
    "id": "nrp_dfa",
    "name": "NRP - DFA",
    "category": "NRP / Encerramento",
    "subject": "Implementação com o Time de Soluções Técnicas do Google - Encerramento",
    "placeholders": [
      { "key": "[Nome do Cliente]", "label": "Nome do Cliente", "type": "text" },
      { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
    ],
    "template": "<p>Olá, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para você hoje sobre o caso de Implementação da tag referente à solicitação. Outra tentativa foi feita após 10 minutos, mas também não conseguimos contato com você.</p><p>Devido à grande demanda, não podemos reagendar um horário. Por isso, vamos encerrar este caso. No entanto, se você ainda quiser continuar com a implementação, basta você acessar este link e escolher a melhor data e horário para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com você novamente no futuro.</p><br><p>Se você quiser saber mais, confira abaixo alguns links úteis de recursos valiosos relacionados à implementação de tags e suporte do Shopping.</p><p><strong>Em relação às tags</strong></p><ul><li><a href=\"https://developers.google.com/gtagjs\">Suporte à implementação de tags</a></li><li><a href=\"https://www.youtube.com/user/learnwithgoogle/playlists\">Google Ads</a></li><li><a href=\"https://www.youtube.com/user/googleanalytics\">Google Analytics</a></li></ul><p><strong>Em relação ao Shopping</strong></p><ul><li><a href=\"https://www.google.com/retail/\">Google for Retail</a></li><li><a href=\"https://www.google.com/retail/solutions/merchant-center/\">Google Merchant Center</a></li><li><a href=\"https://support.google.com/merchants/answer/188924\">Como configurar a conta e o feed</a></li><li><a href=\"https://support.google.com/merchants/topic/7294606\">Otimização do feed</a></li><li><a href=\"https://support.google.com/merchants/answer/9199328\">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>"
  }
];

// ==================================================================
//                  TEMPLATES DE E-MAIL EM ESPANHOL
// ==================================================================
// Espelho de EMAIL_TEMPLATES, chaveado pelo `id`. Um template sem entrada
// aqui cai no português inteiro (fallback em getEmailTemplate), então
// adicionar um template novo em PT nunca quebra o ES.
//
// `labels` traduz o rótulo que o agente lê no formulário, chaveado pelo
// token original — o token em si NUNCA muda (ver nota no topo do arquivo).
const EMAIL_TEMPLATES_ES = {
  "attempt_10min": {
    name: "Intento de Contacto (Antes de los 10min)",
    category: "Intentos y Programación",
    subject: "Implementación con el Equipo de Soluciones Técnicas de Google - Intento de Contacto",
    labels: { "[Seu Nome]": "Tu Nombre", "[INSERIR URL]": "URL del Sitio", "[LINK DO MEET]": "Enlace de la Reunión" },
    template: "<p>Hola,</p><br><p>Le habla <strong>[Seu Nome]</strong> del equipo de Soluciones Técnicas de Google. Intenté llamar al siguiente número: <strong>...</strong> sin éxito, ¿tendría otro número para que pueda ponerme en contacto?</p><br><p>Le recuerdo que voy a ayudarle a implementar la siguiente tarea:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>En su sitio: <strong>[INSERIR URL]</strong></p><p>Intentaré llamar nuevamente en 10 minutos; si lo prefiere, puede acceder al enlace de nuestra reunión: <strong>[LINK DO MEET]</strong></p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google.</p>"
  },
  "reschedule2": {
    name: "Propuesta de Reprogramación",
    category: "Intentos y Programación",
    subject: "Reprogramación de Consultoría",
    labels: { "[DATA 1]": "Fecha 1", "[HORA 1]": "Hora 1", "[DATA 2]": "Fecha 2", "[HORA 2]": "Hora 2", "[DATA 3]": "Fecha 3", "[HORA 3]": "Hora 3", "[Seu Nome]": "Firma" },
    template: "<p>Hola, ¿cómo está?</p><br><p>Estas son las próximas fechas disponibles:</p><ul><li><strong>[DATA 1] a las [HORA 1]</strong></li><li><strong>[DATA 2] a las [HORA 2]</strong></li><li><strong>[DATA 3] a las [HORA 3]</strong></li></ul><br><p>También le informo que si no hay respuesta a este correo en las próximas 48 horas el caso será cerrado.</p><p>Le recuerdo que mi agenda es dinámica, por lo que en cualquier momento se puede agendar una consultoría para los días disponibles. Por lo tanto, cuanto más rápido pueda responderme, más garantizada será la programación de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google.</p>"
  },
  "max_reschedules": {
    name: "Límite de Reprogramaciones Excedido",
    category: "Intentos y Programación",
    subject: "Estado de la Programación - Equipo de Soluciones Técnicas de Google",
    labels: { "[Nome do Cliente]": "Nombre del Cliente", "[Seu Nome]": "Firma" },
    template: "<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este correo le encuentre bien.</p><p>Le escribo en nombre del equipo de Google Ads para informarle sobre su solicitud de reprogramación para la implementación de las etiquetas.</p><br><p>Lamentablemente, <strong>ya no podemos reprogramar este caso específico</strong>, pues hemos excedido el límite máximo de programaciones permitido.</p><br><p>Si desea continuar con la implementación de las etiquetas, será necesario abrir un <strong>nuevo caso</strong> directamente con la <a href=\"https://support.google.com/google-ads\">Ayuda de Google Ads</a>. Esto garantizará que reciba el seguimiento y el soporte necesarios para dar continuidad a su solicitud.</p><br><p>Agradecemos su participación en este proceso y la oportunidad de ayudar. Esperamos continuar nuestra colaboración.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google</p>"
  },
  "2_6_day3": {
    name: "Día 3 (Seguimiento)",
    category: "Follow Up",
    subject: "Consultoría con el Equipo de Soluciones Técnicas de Google",
    labels: { "[Nome do Cliente]": "Nombre del Cliente", "[INFORMAR QUAL AÇÃO FICOU PENDENTE]": "Acción Pendiente", "[MM/DD/YYYY]": "Fecha del Próximo Contacto", "[Seu Nome]": "Firma" },
    template: "<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>¡Espero que se encuentre bien!</p><p>Intentamos contactarle por teléfono, pero sin éxito. Me gustaría saber si ya pudo <strong>[INFORMAR QUAL AÇÃO FICOU PENDENTE]</strong>, o si ya tiene una previsión de cuándo se concluirá esa acción.</p><br><p>Continuaré monitoreando el estado de la implementación en su sitio, y el día <strong>[MM/DD/YYYY]</strong> haré un nuevo seguimiento para verificar el avance de la implementación.</p><p>Si tiene algún problema o duda que le impida realizar la implementación, no dude en compartirlo con nosotros.</p><br><p>Quedo a disposición.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google</p>"
  },
  "2_6_day6": {
    name: "Día 6 (Seguimiento Final)",
    category: "Follow Up",
    subject: "Consultoría con el Equipo de Soluciones Técnicas de Google",
    labels: { "[Nome do Cliente]": "Nombre del Cliente", "[URL]": "URL del Sitio", "[Seu Nome]": "Firma" },
    template: "<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>¡Espero que se encuentre bien!</p><p>Tras analizar y revisar el estado de implementación de la etiqueta en su sitio, <strong>[URL]</strong>, verificamos que la etiqueta aún está pendiente de implementación. Intentamos contactarle por correo, pero sin éxito.</p><br><p>Es esencial que sea implementada, pues ofrece una amplia gama de beneficios, como:</p><ul><li>Ayuda a rastrear conversiones en tiempo real</li><li>Mejora la generación de ingresos, en términos de clics</li><li>Sirve para vincular Google Analytics con los anuncios y hacer seguimiento de las conversiones</li><li>Proporciona información sobre la experiencia del usuario</li></ul><br><p>Si tiene algún problema o duda que le impida realizar la implementación, no dude en compartirlo con nosotros. Estaremos encantados de ayudar.</p><p>Si no recibimos ninguna respuesta en los próximos 3 días, lamentablemente el caso será cerrado.</p><br><p>Quedo a disposición.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google</p>"
  },
  "2_6_completed_reschedule": {
    name: "Acciones Concluidas (Solicitar Reprogramación)",
    category: "Follow Up",
    subject: "Continuidad de la Implementación - Soluciones Técnicas de Google",
    labels: { "[Disponibilidade em BAU]": "Próxima Disponibilidad", "[Seu Nome]": "Firma" },
    template: "<p>Hola, ¿cómo está?</p><br><p>¡Excelente! Muy bueno saber que logró concluir las acciones pendientes. Siendo así, ahora podemos continuar con la implementación de las configuraciones en su cuenta.</p><br><p>Para eso, le pido, por favor, que me envíe algunas de las próximas fechas y horarios en los que esté disponible a partir del día <strong>[Disponibilidade em BAU]</strong>.</p><p>En cuanto me envíe esa información, crearé una reprogramación para que uno de nuestros agentes continúe ayudándole.</p><br><p>También le informo que si no hay respuesta a este correo, realizaré un seguimiento de este caso durante 6 días, en el que me pondré en contacto cada 3 días para intentar reprogramar su caso lo antes posible.</p><p>Le recuerdo que mi agenda es dinámica, por lo que en cualquier momento se puede agendar una consultoría para los días disponibles. Por lo tanto, cuanto más rápido pueda responderme, más garantizada será la programación de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google.</p>"
  },
  "nrp_standard": {
    name: "NRP - Estándar (3.º Intento)",
    category: "NRP / Cierre",
    subject: "Implementación con el Equipo de Soluciones Técnicas de Google - Cierre",
    labels: { "[Nome do Cliente]": "Nombre del Cliente", "[Task pedida pelo AM]": "Tarea Solicitada", "[Seu Nome]": "Firma" },
    template: "<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementación de la etiqueta referente a la solicitud de <strong>[Task pedida pelo AM]</strong>. Se hizo otro intento después de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si aún desea continuar con la implementación, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo, o si lo prefiere, póngase en contacto con su gerente de cuentas de Google para agendar una nueva reunión.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber más, consulte a continuación algunos enlaces útiles con recursos valiosos relacionados con la implementación de etiquetas y el soporte de Shopping.</p><p><strong>En relación con las etiquetas</strong></p><ul><li><a href=\"https://developers.google.com/gtagjs\">Soporte para la implementación de etiquetas</a></li><li><a href=\"https://www.youtube.com/user/learnwithgoogle/playlists\">Google Ads</a></li><li><a href=\"https://www.youtube.com/user/googleanalytics\">Google Analytics</a></li></ul><p><strong>En relación con Shopping</strong></p><ul><li><a href=\"https://www.google.com/retail/\">Google for Retail</a></li><li><a href=\"https://www.google.com/retail/solutions/merchant-center/\">Google Merchant Center</a></li><li><a href=\"https://support.google.com/merchants/answer/188924\">Cómo configurar la cuenta y el feed</a></li><li><a href=\"https://support.google.com/merchants/topic/7294606\">Optimización del feed</a></li><li><a href=\"https://support.google.com/merchants/answer/9199328\">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google</p>"
  },
  "nrp_dfa": {
    name: "NRP - DFA",
    category: "NRP / Cierre",
    subject: "Implementación con el Equipo de Soluciones Técnicas de Google - Cierre",
    labels: { "[Nome do Cliente]": "Nombre del Cliente", "[Seu Nome]": "Firma" },
    template: "<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementación de la etiqueta referente a la solicitud. Se hizo otro intento después de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si aún desea continuar con la implementación, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber más, consulte a continuación algunos enlaces útiles con recursos valiosos relacionados con la implementación de etiquetas y el soporte de Shopping.</p><p><strong>En relación con las etiquetas</strong></p><ul><li><a href=\"https://developers.google.com/gtagjs\">Soporte para la implementación de etiquetas</a></li><li><a href=\"https://www.youtube.com/user/learnwithgoogle/playlists\">Google Ads</a></li><li><a href=\"https://www.youtube.com/user/googleanalytics\">Google Analytics</a></li></ul><p><strong>En relación con Shopping</strong></p><ul><li><a href=\"https://www.google.com/retail/\">Google for Retail</a></li><li><a href=\"https://www.google.com/retail/solutions/merchant-center/\">Google Merchant Center</a></li><li><a href=\"https://support.google.com/merchants/answer/188924\">Cómo configurar la cuenta y el feed</a></li><li><a href=\"https://support.google.com/merchants/topic/7294606\">Optimización del feed</a></li><li><a href=\"https://support.google.com/merchants/answer/9199328\">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google</p>"
  }
};


// Mesmo overlay do EMAIL_TEMPLATES_ES acima, em inglês. Os tokens entre
// colchetes ([Nome do Cliente], [INSERIR URL], [MM/DD/YYYY]...) NUNCA são
// traduzidos: são a chave que liga o corpo ao campo preenchido pelo agente
// e às substituições automáticas do email-automation-service. Traduzi-los
// quebraria o preenchimento sem erro visível — o ADR-0001 já rejeitou isso
// explicitamente para o espanhol.
const EMAIL_TEMPLATES_EN = {
  "attempt_10min": {
    name: "Contact Attempt (Before the 10min)",
    category: "Attempts & Scheduling",
    subject: "Implementation with the Google Technical Solutions Team - Contact Attempt",
    labels: { "[Seu Nome]": "Signature", "[INSERIR URL]": "Site URL", "[LINK DO MEET]": "Meet Link" },
    template: "<p>Hello,</p><br><p>This is <strong>[Seu Nome]</strong> from the Google Technical Solutions team. I tried calling the following number: <strong>...</strong> without success. Would you have another number I could reach you on?</p><br><p>As a reminder, I will be helping you implement the following task:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>On your site: <strong>[INSERIR URL]</strong></p><p>I will try calling again within 10 minutes. If you prefer, you can join our meeting link: <strong>[LINK DO MEET]</strong></p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google.</p>"
  },
  "reschedule2": {
    name: "Rescheduling Proposal",
    category: "Attempts & Scheduling",
    subject: "Consultation Rescheduling",
    labels: { "[DATA 1]": "Date 1", "[HORA 1]": "Time 1", "[DATA 2]": "Date 2", "[HORA 2]": "Time 2", "[DATA 3]": "Date 3", "[HORA 3]": "Time 3", "[Seu Nome]": "Signature" },
    template: "<p>Hello, how are you?</p><br><p>Here are the next available dates:</p><ul><li><strong>[DATA 1] at [HORA 1]</strong></li><li><strong>[DATA 2] at [HORA 2]</strong></li><li><strong>[DATA 3] at [HORA 3]</strong></li></ul><br><p>Please note that if there is no reply to this email within the next 48 hours, the case will be closed.</p><p>My calendar is dynamic, so a consultation can be booked for the available days at any time. The sooner you can reply, the more likely it is that the date and time will be secured.</p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google.</p>"
  },
  "max_reschedules": {
    name: "Rescheduling Limit Exceeded",
    category: "Attempts & Scheduling",
    subject: "Scheduling Status - Google Technical Solutions Team",
    labels: { "[Nome do Cliente]": "Customer Name", "[Seu Nome]": "Signature" },
    template: "<p>Hello, <strong>[Nome do Cliente]</strong>,</p><br><p>I hope this email finds you well.</p><p>I am writing on behalf of the Google Ads team regarding your rescheduling request for the tag implementation.</p><br><p>Unfortunately, <strong>we can no longer reschedule this particular case</strong>, as we have exceeded the maximum number of bookings allowed.</p><br><p>If you would like to proceed with the tag implementation, you will need to open a <strong>new case</strong> directly with <a href=\"https://support.google.com/google-ads\">Google Ads Help</a>. That will ensure you receive the follow-up and support needed to continue with your request.</p><br><p>Thank you for your involvement in this process and for the opportunity to help. We look forward to continuing our collaboration.</p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>"
  },
  "2_6_day3": {
    name: "Day 3 (Follow-up)",
    category: "Follow Up",
    subject: "Consultation with the Google Technical Solutions Team",
    labels: { "[Nome do Cliente]": "Customer Name", "[INFORMAR QUAL AÇÃO FICOU PENDENTE]": "Pending Action", "[MM/DD/YYYY]": "Next Contact Date", "[Seu Nome]": "Signature" },
    template: "<p>Hello, <strong>[Nome do Cliente]</strong></p><br><p>I hope you are well!</p><p>We tried to reach you by phone, but without success. I would like to know whether you have been able to <strong>[INFORMAR QUAL AÇÃO FICOU PENDENTE]</strong>, or whether you have an estimate of when that action will be completed.</p><br><p>I will keep monitoring the implementation status on your site, and on <strong>[MM/DD/YYYY]</strong> I will follow up again to check on its progress.</p><p>If you run into any problem or question that prevents you from completing the implementation, please feel free to share it with us.</p><br><p>I remain at your disposal.</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>"
  },
  "2_6_day6": {
    name: "Day 6 (Final Follow-up)",
    category: "Follow Up",
    subject: "Consultation with the Google Technical Solutions Team",
    labels: { "[Nome do Cliente]": "Customer Name", "[URL]": "Site URL", "[Seu Nome]": "Signature" },
    template: "<p>Hello, <strong>[Nome do Cliente]</strong></p><br><p>I hope you are well!</p><p>After analyzing and reviewing the tag implementation status on your site, <strong>[URL]</strong>, we found that the tag is still pending implementation. We tried to reach you by email, but without success.</p><br><p>Implementing it is essential, as it offers a wide range of benefits, such as:</p><ul><li>It helps track conversions in real time</li><li>It improves revenue generation, in terms of clicks</li><li>It links Google Analytics to your ads and tracks conversions</li><li>It provides insight into the user experience</li></ul><br><p>If you run into any problem or question that prevents you from completing the implementation, please feel free to share it with us. We would be glad to help.</p><p>If we do not hear back within the next 3 days, the case will unfortunately be closed.</p><br><p>I remain at your disposal.</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>"
  },
  "2_6_completed_reschedule": {
    name: "Actions Completed (Request Rescheduling)",
    category: "Follow Up",
    subject: "Continuing the Implementation - Google Technical Solutions",
    labels: { "[Disponibilidade em BAU]": "Next Availability", "[Seu Nome]": "Signature" },
    template: "<p>Hello, how are you?</p><br><p>Great! Good to hear you managed to complete the pending actions. That means we can now continue with the setup on your account.</p><br><p>For that, please send me a few of the next dates and times you are available from <strong>[Disponibilidade em BAU]</strong> onwards.</p><p>As soon as you send that over, I will create a rescheduling so one of our agents can continue helping you.</p><br><p>Please also note that if there is no reply to this email, I will follow up on this case for 6 days, getting in touch every 3 days so we can reschedule your case as soon as possible.</p><p>My calendar is dynamic, so a consultation can be booked for the available days at any time. The sooner you can reply, the more likely it is that the date and time will be secured.</p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google.</p>"
  },
  "nrp_standard": {
    name: "NRP - Standard (3rd Attempt)",
    category: "NRP / Closure",
    subject: "Implementation with the Google Technical Solutions Team - Closure",
    labels: { "[Nome do Cliente]": "Customer Name", "[Task pedida pelo AM]": "Requested Task", "[Seu Nome]": "Signature" },
    template: "<p>Hello, <strong>[Nome do Cliente]</strong>,</p><br><p>We tried to call you today about the tag Implementation case regarding the request for <strong>[Task pedida pelo AM]</strong>. Another attempt was made after 10 minutes, but we were unable to reach you then either.</p><p>Due to high demand, we are unable to reschedule a time. We will therefore be closing this case. However, if you would still like to continue with the implementation, you can use this link to pick the best date and time to speak with our team, or if you prefer, contact your Google account manager to book a new meeting.</p><p>We apologize for the inconvenience and hope to work with you again in the future.</p><br><p>If you would like to know more, below are some useful links with valuable resources about tag implementation and Shopping support.</p><p><strong>Regarding tags</strong></p><ul><li><a href=\"https://developers.google.com/gtagjs\">Tag implementation support</a></li><li><a href=\"https://www.youtube.com/user/learnwithgoogle/playlists\">Google Ads</a></li><li><a href=\"https://www.youtube.com/user/googleanalytics\">Google Analytics</a></li></ul><p><strong>Regarding Shopping</strong></p><ul><li><a href=\"https://www.google.com/retail/\">Google for Retail</a></li><li><a href=\"https://www.google.com/retail/solutions/merchant-center/\">Google Merchant Center</a></li><li><a href=\"https://support.google.com/merchants/answer/188924\">How to set up the account and the feed</a></li><li><a href=\"https://support.google.com/merchants/topic/7294606\">Feed optimization</a></li><li><a href=\"https://support.google.com/merchants/answer/9199328\">Google platforms</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>"
  },
  "nrp_dfa": {
    name: "NRP - DFA",
    category: "NRP / Closure",
    subject: "Implementation with the Google Technical Solutions Team - Closure",
    labels: { "[Nome do Cliente]": "Customer Name", "[Seu Nome]": "Signature" },
    template: "<p>Hello, <strong>[Nome do Cliente]</strong>,</p><br><p>We tried to call you today about the tag Implementation case regarding the request. Another attempt was made after 10 minutes, but we were unable to reach you then either.</p><p>Due to high demand, we are unable to reschedule a time. We will therefore be closing this case. However, if you would still like to continue with the implementation, you can use this link to pick the best date and time to speak with our team.</p><p>We apologize for the inconvenience and hope to work with you again in the future.</p><br><p>If you would like to know more, below are some useful links with valuable resources about tag implementation and Shopping support.</p><p><strong>Regarding tags</strong></p><ul><li><a href=\"https://developers.google.com/gtagjs\">Tag implementation support</a></li><li><a href=\"https://www.youtube.com/user/learnwithgoogle/playlists\">Google Ads</a></li><li><a href=\"https://www.youtube.com/user/googleanalytics\">Google Analytics</a></li></ul><p><strong>Regarding Shopping</strong></p><ul><li><a href=\"https://www.google.com/retail/\">Google for Retail</a></li><li><a href=\"https://www.google.com/retail/solutions/merchant-center/\">Google Merchant Center</a></li><li><a href=\"https://support.google.com/merchants/answer/188924\">How to set up the account and the feed</a></li><li><a href=\"https://support.google.com/merchants/topic/7294606\">Feed optimization</a></li><li><a href=\"https://support.google.com/merchants/answer/9199328\">Google platforms</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>"
  }
};

// Template de e-mail no idioma ativo. Sem overlay para o idioma (ou sem
// entrada para este template), devolve o PT original intacto.
// O valor que entra no token [MM/DD/YYYY] do corpo preenchido automaticamente.
// É texto que o anunciante lê, então segue o idioma do ATENDIMENTO: PT e ES
// leem dia/mês/ano; só o EN lê mês/dia/ano - como o próprio nome do token diz.
// Era `toLocaleDateString('pt-BR')` fixo, e o e-mail EN saía com a data
// invertida em relação ao token.
const EMAIL_DATE_LOCALE = { pt: 'pt-BR', es: 'es-ES', en: 'en-US' };
export function formatTemplateDate(date, lang) {
    return date.toLocaleDateString(EMAIL_DATE_LOCALE[lang] || EMAIL_DATE_LOCALE.pt, {
        year: 'numeric', month: '2-digit', day: '2-digit',
    });
}

export function getEmailTemplate(tpl, lang) {
    const overlay = { es: EMAIL_TEMPLATES_ES, en: EMAIL_TEMPLATES_EN }[lang];
    if (!overlay) return tpl;
    const tr = overlay[tpl?.id];
    if (!tr) return tpl;
    return {
        ...tpl,
        name: tr.name ?? tpl.name,
        category: tr.category ?? tpl.category,
        subject: tr.subject ?? tpl.subject,
        template: tr.template ?? tpl.template,
        placeholders: (tpl.placeholders || []).map(ph => ({
            ...ph,
            label: tr.labels?.[ph.key] ?? ph.label
        }))
    };
}

// --- HIDRATAÇÃO PELA CENTRAL DE CONTEÚDO ---
// Os modelos acima viram fallback: é o que vale no primeiro load offline, sem
// resposta da API nem cache. Publicado na Central, o publicado vence.
//
// Na planilha cada idioma é uma linha do mesmo template (key = id, lang =
// PT|ES), e aqui as duas estruturas originais são remontadas - a lista PT e o
// overlay ES. É por isso que getEmailTemplate() acima não precisou mudar.
export function applyEmailContent(items) {
    if (!Array.isArray(items) || !items.length) return false;

    const sorted = items.slice().sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    const pt = [];
    const overlays = { ES: {}, EN: {} };

    for (const item of sorted) {
        const id = item.key;
        if (!id) continue;

        let v;
        try {
            v = JSON.parse(item.value || '{}');
        } catch (e) {
            continue; // Um modelo corrompido não pode derrubar os outros.
        }
        if (!v.subject || !v.template) continue;

        // O roteamento é por idioma EXPLÍCITO, não por "não é ES, então é PT".
        // Com a entrada do inglês, o `else` engolia as linhas EN e as empurrava
        // para a lista base: os modelos apareciam duplicados e as cópias
        // chegavam sem `placeholders`, porque um overlay só carrega rótulos.
        const lang = String(item.lang || '').toUpperCase();
        const overlay = overlays[lang];

        if (overlay) {
            overlay[id] = {
                name: item.label || '',
                category: item.field || '',
                subject: v.subject,
                template: v.template,
                labels: v.labels || {},
            };
        } else if (lang === 'PT' || lang === '' || lang === 'ALL') {
            pt.push({
                id,
                name: item.label || id,
                category: item.field || '',
                subject: v.subject,
                template: v.template,
                placeholders: v.placeholders || [],
            });
        }
        // Idioma desconhecido é ignorado: melhor faltar um overlay do que
        // contaminar a lista base com uma linha que ninguém sabe ler.
    }

    // Sem nenhum modelo PT não há o que exibir: melhor manter o embutido do que
    // deixar o assistente sem template nenhum.
    if (!pt.length) return false;

    EMAIL_TEMPLATES.length = 0;
    EMAIL_TEMPLATES.push(...pt);

    // Overlay que a Central não serviu não é overlay vazio — ver a mesma
    // regra em note-templates-service.js. Zerar aqui mandaria o agente EN
    // receber o modelo em português com a Central no ar e sem linha EN.
    for (const [lang, alvo] of [['ES', EMAIL_TEMPLATES_ES], ['EN', EMAIL_TEMPLATES_EN]]) {
        if (!Object.keys(overlays[lang]).length) continue;
        for (const key of Object.keys(alvo)) delete alvo[key];
        Object.assign(alvo, overlays[lang]);
    }

    return true;
}

export async function hydrateEmailsFromContentCentral() {
    const cached = DataService.getCachedContent('email_template');
    let applied = applyEmailContent(cached);

    try {
        const items = await DataService.fetchContentModule('email_template');
        applied = applyEmailContent(items) || applied;
    } catch (e) {
        console.warn('Central de Conteúdo indisponível; usando modelos embutidos.', e);
    }

    return applied;
}