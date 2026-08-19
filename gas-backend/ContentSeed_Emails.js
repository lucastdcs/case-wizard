// ARQUIVO GERADO - não edite à mão.
// Origem: npm run seed:emails (lê src/modules/email-assistant/email-data.js)
//
// Semeia o módulo "email_template" da Central de Conteúdo com os modelos do
// assistente de e-mail. NÃO inclui os e-mails de CR nem os disparados pelo
// Dashboard de TL - esses vivem em EmailEngine.gs e seguem fora da Central.
//
// COMO RODAR: no editor do Apps Script, escolha "seedEmailsNow" no seletor de
// função e clique em Executar. Roda uma vez só; chamadas seguintes são
// ignoradas se o módulo já tiver itens no ar.

const CONTENT_SEED_EMAILS = {
  "module": "email_template",
  "items": [
    {
      "key": "attempt_10min",
      "field": "Tentativas & Agendamento",
      "lang": "PT",
      "label": "Tentativa de Contato (Antes dos 10min)",
      "value": "{\"subject\":\"Implementação com o Time de Soluções Técnicas do Google - Tentativa de Contato\",\"template\":\"<p>Olá,</p><br><p>Aqui é o <strong>[Seu Nome]</strong> da equipe de Soluções Técnicas do Google. Tentei ligar no seguinte número: <strong>...</strong> sem sucesso, teria outro número para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, você pode acessar o link da nossa reunião: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google.</p>\",\"placeholders\":[{\"key\":\"[Seu Nome]\",\"label\":\"Seu Nome\",\"type\":\"text\",\"auto\":\"agentName\"},{\"key\":\"[INSERIR URL]\",\"label\":\"URL do Site\",\"type\":\"text\"},{\"key\":\"[LINK DO MEET]\",\"label\":\"Link da Reunião\",\"type\":\"text\"}]}",
      "sortOrder": 0
    },
    {
      "key": "attempt_10min",
      "field": "Intentos y Programación",
      "lang": "ES",
      "label": "Intento de Contacto (Antes de los 10min)",
      "value": "{\"subject\":\"Implementación con el Equipo de Soluciones Técnicas de Google - Intento de Contacto\",\"template\":\"<p>Hola,</p><br><p>Le habla <strong>[Seu Nome]</strong> del equipo de Soluciones Técnicas de Google. Intenté llamar al siguiente número: <strong>...</strong> sin éxito, ¿tendría otro número para que pueda ponerme en contacto?</p><br><p>Le recuerdo que voy a ayudarle a implementar la siguiente tarea:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>En su sitio: <strong>[INSERIR URL]</strong></p><p>Intentaré llamar nuevamente en 10 minutos; si lo prefiere, puede acceder al enlace de nuestra reunión: <strong>[LINK DO MEET]</strong></p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google.</p>\",\"labels\":{\"[Seu Nome]\":\"Tu Nombre\",\"[INSERIR URL]\":\"URL del Sitio\",\"[LINK DO MEET]\":\"Enlace de la Reunión\"}}",
      "sortOrder": 1
    },
    {
      "key": "reschedule2",
      "field": "Tentativas & Agendamento",
      "lang": "PT",
      "label": "Proposta de Reagendamento",
      "value": "{\"subject\":\"Reagendamento de Consultoria\",\"template\":\"<p>Olá, tudo bem?</p><br><p>Seguem as próximas datas disponíveis:</p><ul><li><strong>[DATA 1] às [HORA 1]</strong></li><li><strong>[DATA 2] às [HORA 2]</strong></li><li><strong>[DATA 3] às [HORA 3]</strong></li></ul><br><p>Também informo que se não houver resposta a este email nas próximas 48 horas o caso será encerrado.</p><p>Reforço que minha agenda é dinâmica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias disponíveis. Logo, quanto mais rápido conseguir me responder, mais garantido será o agendamento de data e horário.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google.</p>\",\"placeholders\":[{\"key\":\"[DATA 1]\",\"label\":\"Data 1\",\"type\":\"text\"},{\"key\":\"[HORA 1]\",\"label\":\"Hora 1\",\"type\":\"text\"},{\"key\":\"[DATA 2]\",\"label\":\"Data 2\",\"type\":\"text\"},{\"key\":\"[HORA 2]\",\"label\":\"Hora 2\",\"type\":\"text\"},{\"key\":\"[DATA 3]\",\"label\":\"Data 3\",\"type\":\"text\"},{\"key\":\"[HORA 3]\",\"label\":\"Hora 3\",\"type\":\"text\"},{\"key\":\"[Seu Nome]\",\"label\":\"Assinatura\",\"type\":\"text\",\"auto\":\"agentName\"}]}",
      "sortOrder": 2
    },
    {
      "key": "reschedule2",
      "field": "Intentos y Programación",
      "lang": "ES",
      "label": "Propuesta de Reprogramación",
      "value": "{\"subject\":\"Reprogramación de Consultoría\",\"template\":\"<p>Hola, ¿cómo está?</p><br><p>Estas son las próximas fechas disponibles:</p><ul><li><strong>[DATA 1] a las [HORA 1]</strong></li><li><strong>[DATA 2] a las [HORA 2]</strong></li><li><strong>[DATA 3] a las [HORA 3]</strong></li></ul><br><p>También le informo que si no hay respuesta a este correo en las próximas 48 horas el caso será cerrado.</p><p>Le recuerdo que mi agenda es dinámica, por lo que en cualquier momento se puede agendar una consultoría para los días disponibles. Por lo tanto, cuanto más rápido pueda responderme, más garantizada será la programación de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google.</p>\",\"labels\":{\"[DATA 1]\":\"Fecha 1\",\"[HORA 1]\":\"Hora 1\",\"[DATA 2]\":\"Fecha 2\",\"[HORA 2]\":\"Hora 2\",\"[DATA 3]\":\"Fecha 3\",\"[HORA 3]\":\"Hora 3\",\"[Seu Nome]\":\"Firma\"}}",
      "sortOrder": 3
    },
    {
      "key": "max_reschedules",
      "field": "Tentativas & Agendamento",
      "lang": "PT",
      "label": "Limite de Reagendamentos Excedido",
      "value": "{\"subject\":\"Status do Agendamento - Time de Soluções Técnicas do Google\",\"template\":\"<p>Olá, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementação das tags.</p><br><p>Infelizmente, <strong>não podemos mais reagendar este caso específico</strong>, pois excedemos o limite máximo de agendamentos permitido.</p><br><p>Se você deseja prosseguir com a implementação das tags, será necessário abrir um <strong>novo caso</strong> diretamente com a <a href=\\\"https://support.google.com/google-ads\\\">Ajuda do Google Ads</a>. Isso garantirá que você receba o acompanhamento e o suporte necessário para dar continuidade à sua solicitação.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colaboração.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>\",\"placeholders\":[{\"key\":\"[Nome do Cliente]\",\"label\":\"Nome do Cliente\",\"type\":\"text\"},{\"key\":\"[Seu Nome]\",\"label\":\"Assinatura\",\"type\":\"text\",\"auto\":\"agentName\"}]}",
      "sortOrder": 4
    },
    {
      "key": "max_reschedules",
      "field": "Intentos y Programación",
      "lang": "ES",
      "label": "Límite de Reprogramaciones Excedido",
      "value": "{\"subject\":\"Estado de la Programación - Equipo de Soluciones Técnicas de Google\",\"template\":\"<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este correo le encuentre bien.</p><p>Le escribo en nombre del equipo de Google Ads para informarle sobre su solicitud de reprogramación para la implementación de las etiquetas.</p><br><p>Lamentablemente, <strong>ya no podemos reprogramar este caso específico</strong>, pues hemos excedido el límite máximo de programaciones permitido.</p><br><p>Si desea continuar con la implementación de las etiquetas, será necesario abrir un <strong>nuevo caso</strong> directamente con la <a href=\\\"https://support.google.com/google-ads\\\">Ayuda de Google Ads</a>. Esto garantizará que reciba el seguimiento y el soporte necesarios para dar continuidad a su solicitud.</p><br><p>Agradecemos su participación en este proceso y la oportunidad de ayudar. Esperamos continuar nuestra colaboración.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google</p>\",\"labels\":{\"[Nome do Cliente]\":\"Nombre del Cliente\",\"[Seu Nome]\":\"Firma\"}}",
      "sortOrder": 5
    },
    {
      "key": "2_6_day3",
      "field": "Follow Up",
      "lang": "PT",
      "label": "Dia 3 (Acompanhamento)",
      "value": "{\"subject\":\"Consultoria com a Equipe de Soluções Técnicas do Google\",\"template\":\"<p>Olá, <strong>[Nome do Cliente]</strong></p><br><p>Espero que você esteja bem!</p><p>Tentamos contato através do Número de Telefone, porém sem sucesso. Gostaria de saber se você já conseguiu <strong>[INFORMAR QUAL AÇÃO FICOU PENDENTE]</strong>, ou se você já possui uma previsão de quando essa ação será concluída.</p><br><p>Continuarei monitorando o status da implementação no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementação.</p><p>Se você tiver algum problema ou dúvidas que impossibilite de realizar a implementação, fique à vontade para compartilhá-lo conosco.</p><br><p>Fico à disposição.</p><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>\",\"placeholders\":[{\"key\":\"[Nome do Cliente]\",\"label\":\"Nome do Cliente\",\"type\":\"text\"},{\"key\":\"[INFORMAR QUAL AÇÃO FICOU PENDENTE]\",\"label\":\"Ação Pendente\",\"type\":\"text\"},{\"key\":\"[MM/DD/YYYY]\",\"label\":\"Data do Próximo Contato\",\"type\":\"date\"},{\"key\":\"[Seu Nome]\",\"label\":\"Assinatura\",\"type\":\"text\",\"auto\":\"agentName\"}]}",
      "sortOrder": 6
    },
    {
      "key": "2_6_day3",
      "field": "Follow Up",
      "lang": "ES",
      "label": "Día 3 (Seguimiento)",
      "value": "{\"subject\":\"Consultoría con el Equipo de Soluciones Técnicas de Google\",\"template\":\"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>¡Espero que se encuentre bien!</p><p>Intentamos contactarle por teléfono, pero sin éxito. Me gustaría saber si ya pudo <strong>[INFORMAR QUAL AÇÃO FICOU PENDENTE]</strong>, o si ya tiene una previsión de cuándo se concluirá esa acción.</p><br><p>Continuaré monitoreando el estado de la implementación en su sitio, y el día <strong>[MM/DD/YYYY]</strong> haré un nuevo seguimiento para verificar el avance de la implementación.</p><p>Si tiene algún problema o duda que le impida realizar la implementación, no dude en compartirlo con nosotros.</p><br><p>Quedo a disposición.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google</p>\",\"labels\":{\"[Nome do Cliente]\":\"Nombre del Cliente\",\"[INFORMAR QUAL AÇÃO FICOU PENDENTE]\":\"Acción Pendiente\",\"[MM/DD/YYYY]\":\"Fecha del Próximo Contacto\",\"[Seu Nome]\":\"Firma\"}}",
      "sortOrder": 7
    },
    {
      "key": "2_6_day6",
      "field": "Follow Up",
      "lang": "PT",
      "label": "Dia 6 (Acompanhamento Final)",
      "value": "{\"subject\":\"Consultoria com a Equipe de Soluções Técnicas do Google\",\"template\":\"<p>Olá, <strong>[Nome do Cliente]</strong></p><br><p>Espero que você esteja bem!</p><p>Após análise e revisão do status de implementação da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda está com a implementação pendente. Tentamos contato através do email, porém sem sucesso.</p><br><p>É essencial que seja implementado, pois ele oferece uma ampla gama de benefícios, como:</p><ul><li>Ajuda a rastrear conversões em tempo real</li><li>Melhora a geração de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os anúncios e acompanhar conversões</li><li>Fornece informações sobre a experiência do usuário</li></ul><br><p>Se você tiver algum problema ou dúvidas que o impossibilite de realizar a implementação, fique à vontade para compartilhá-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso não tenhamos nenhuma resposta nos próximos 3 dias, infelizmente o caso será encerrado.</p><br><p>Fico à disposição.</p><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>\",\"placeholders\":[{\"key\":\"[Nome do Cliente]\",\"label\":\"Nome do Cliente\",\"type\":\"text\"},{\"key\":\"[URL]\",\"label\":\"URL do Site\",\"type\":\"text\"},{\"key\":\"[Seu Nome]\",\"label\":\"Assinatura\",\"type\":\"text\",\"auto\":\"agentName\"}]}",
      "sortOrder": 8
    },
    {
      "key": "2_6_day6",
      "field": "Follow Up",
      "lang": "ES",
      "label": "Día 6 (Seguimiento Final)",
      "value": "{\"subject\":\"Consultoría con el Equipo de Soluciones Técnicas de Google\",\"template\":\"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>¡Espero que se encuentre bien!</p><p>Tras analizar y revisar el estado de implementación de la etiqueta en su sitio, <strong>[URL]</strong>, verificamos que la etiqueta aún está pendiente de implementación. Intentamos contactarle por correo, pero sin éxito.</p><br><p>Es esencial que sea implementada, pues ofrece una amplia gama de beneficios, como:</p><ul><li>Ayuda a rastrear conversiones en tiempo real</li><li>Mejora la generación de ingresos, en términos de clics</li><li>Sirve para vincular Google Analytics con los anuncios y hacer seguimiento de las conversiones</li><li>Proporciona información sobre la experiencia del usuario</li></ul><br><p>Si tiene algún problema o duda que le impida realizar la implementación, no dude en compartirlo con nosotros. Estaremos encantados de ayudar.</p><p>Si no recibimos ninguna respuesta en los próximos 3 días, lamentablemente el caso será cerrado.</p><br><p>Quedo a disposición.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google</p>\",\"labels\":{\"[Nome do Cliente]\":\"Nombre del Cliente\",\"[URL]\":\"URL del Sitio\",\"[Seu Nome]\":\"Firma\"}}",
      "sortOrder": 9
    },
    {
      "key": "2_6_completed_reschedule",
      "field": "Follow Up",
      "lang": "PT",
      "label": "Ações Concluídas (Solicitar Reagendamento)",
      "value": "{\"subject\":\"Continuidade da Implementação - Soluções Técnicas do Google\",\"template\":\"<p>Olá, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as ações pendentes. Sendo assim, agora podemos continuar com a implementação das configurações em sua conta.</p><br><p>Para isso, peço, por favor, que me envie algumas das próximas datas e horários em que está disponível a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informação, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Também informo que se não houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve possível.</p><p>Reforço que minha agenda é dinâmica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias disponíveis. Logo, quanto mais rápido conseguir me responder, mais garantido será o agendamento de data e horário.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google.</p>\",\"placeholders\":[{\"key\":\"[Disponibilidade em BAU]\",\"label\":\"Próxima Disponibilidade\",\"type\":\"text\"},{\"key\":\"[Seu Nome]\",\"label\":\"Assinatura\",\"type\":\"text\",\"auto\":\"agentName\"}]}",
      "sortOrder": 10
    },
    {
      "key": "2_6_completed_reschedule",
      "field": "Follow Up",
      "lang": "ES",
      "label": "Acciones Concluidas (Solicitar Reprogramación)",
      "value": "{\"subject\":\"Continuidad de la Implementación - Soluciones Técnicas de Google\",\"template\":\"<p>Hola, ¿cómo está?</p><br><p>¡Excelente! Muy bueno saber que logró concluir las acciones pendientes. Siendo así, ahora podemos continuar con la implementación de las configuraciones en su cuenta.</p><br><p>Para eso, le pido, por favor, que me envíe algunas de las próximas fechas y horarios en los que esté disponible a partir del día <strong>[Disponibilidade em BAU]</strong>.</p><p>En cuanto me envíe esa información, crearé una reprogramación para que uno de nuestros agentes continúe ayudándole.</p><br><p>También le informo que si no hay respuesta a este correo, realizaré un seguimiento de este caso durante 6 días, en el que me pondré en contacto cada 3 días para intentar reprogramar su caso lo antes posible.</p><p>Le recuerdo que mi agenda es dinámica, por lo que en cualquier momento se puede agendar una consultoría para los días disponibles. Por lo tanto, cuanto más rápido pueda responderme, más garantizada será la programación de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google.</p>\",\"labels\":{\"[Disponibilidade em BAU]\":\"Próxima Disponibilidad\",\"[Seu Nome]\":\"Firma\"}}",
      "sortOrder": 11
    },
    {
      "key": "nrp_standard",
      "field": "NRP / Encerramento",
      "lang": "PT",
      "label": "NRP - Padrão (3ª Tentativa)",
      "value": "{\"subject\":\"Implementação com o Time de Soluções Técnicas do Google - Encerramento\",\"template\":\"<p>Olá, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para você hoje sobre o caso de Implementação da tag referente à solicitação para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita após 10 minutos, mas também não conseguimos contato com você.</p><p>Devido à grande demanda, não podemos reagendar um horário. Por isso, vamos encerrar este caso. No entanto, se você ainda quiser continuar com a implementação, basta você acessar este link e escolher a melhor data e horário para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reunião.</p><p>Lamentamos o inconveniente e esperamos trabalhar com você novamente no futuro.</p><br><p>Se você quiser saber mais, confira abaixo alguns links úteis de recursos valiosos relacionados à implementação de tags e suporte do Shopping.</p><p><strong>Em relação às tags</strong></p><ul><li><a href=\\\"https://developers.google.com/gtagjs\\\">Suporte à implementação de tags</a></li><li><a href=\\\"https://www.youtube.com/user/learnwithgoogle/playlists\\\">Google Ads</a></li><li><a href=\\\"https://www.youtube.com/user/googleanalytics\\\">Google Analytics</a></li></ul><p><strong>Em relação ao Shopping</strong></p><ul><li><a href=\\\"https://www.google.com/retail/\\\">Google for Retail</a></li><li><a href=\\\"https://www.google.com/retail/solutions/merchant-center/\\\">Google Merchant Center</a></li><li><a href=\\\"https://support.google.com/merchants/answer/188924\\\">Como configurar a conta e o feed</a></li><li><a href=\\\"https://support.google.com/merchants/topic/7294606\\\">Otimização do feed</a></li><li><a href=\\\"https://support.google.com/merchants/answer/9199328\\\">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>\",\"placeholders\":[{\"key\":\"[Nome do Cliente]\",\"label\":\"Nome do Cliente\",\"type\":\"text\"},{\"key\":\"[Task pedida pelo AM]\",\"label\":\"Task Solicitada\",\"type\":\"text\"},{\"key\":\"[Seu Nome]\",\"label\":\"Assinatura\",\"type\":\"text\",\"auto\":\"agentName\"}]}",
      "sortOrder": 12
    },
    {
      "key": "nrp_standard",
      "field": "NRP / Cierre",
      "lang": "ES",
      "label": "NRP - Estándar (3.º Intento)",
      "value": "{\"subject\":\"Implementación con el Equipo de Soluciones Técnicas de Google - Cierre\",\"template\":\"<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementación de la etiqueta referente a la solicitud de <strong>[Task pedida pelo AM]</strong>. Se hizo otro intento después de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si aún desea continuar con la implementación, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo, o si lo prefiere, póngase en contacto con su gerente de cuentas de Google para agendar una nueva reunión.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber más, consulte a continuación algunos enlaces útiles con recursos valiosos relacionados con la implementación de etiquetas y el soporte de Shopping.</p><p><strong>En relación con las etiquetas</strong></p><ul><li><a href=\\\"https://developers.google.com/gtagjs\\\">Soporte para la implementación de etiquetas</a></li><li><a href=\\\"https://www.youtube.com/user/learnwithgoogle/playlists\\\">Google Ads</a></li><li><a href=\\\"https://www.youtube.com/user/googleanalytics\\\">Google Analytics</a></li></ul><p><strong>En relación con Shopping</strong></p><ul><li><a href=\\\"https://www.google.com/retail/\\\">Google for Retail</a></li><li><a href=\\\"https://www.google.com/retail/solutions/merchant-center/\\\">Google Merchant Center</a></li><li><a href=\\\"https://support.google.com/merchants/answer/188924\\\">Cómo configurar la cuenta y el feed</a></li><li><a href=\\\"https://support.google.com/merchants/topic/7294606\\\">Optimización del feed</a></li><li><a href=\\\"https://support.google.com/merchants/answer/9199328\\\">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google</p>\",\"labels\":{\"[Nome do Cliente]\":\"Nombre del Cliente\",\"[Task pedida pelo AM]\":\"Tarea Solicitada\",\"[Seu Nome]\":\"Firma\"}}",
      "sortOrder": 13
    },
    {
      "key": "nrp_dfa",
      "field": "NRP / Encerramento",
      "lang": "PT",
      "label": "NRP - DFA",
      "value": "{\"subject\":\"Implementação com o Time de Soluções Técnicas do Google - Encerramento\",\"template\":\"<p>Olá, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para você hoje sobre o caso de Implementação da tag referente à solicitação. Outra tentativa foi feita após 10 minutos, mas também não conseguimos contato com você.</p><p>Devido à grande demanda, não podemos reagendar um horário. Por isso, vamos encerrar este caso. No entanto, se você ainda quiser continuar com a implementação, basta você acessar este link e escolher a melhor data e horário para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com você novamente no futuro.</p><br><p>Se você quiser saber mais, confira abaixo alguns links úteis de recursos valiosos relacionados à implementação de tags e suporte do Shopping.</p><p><strong>Em relação às tags</strong></p><ul><li><a href=\\\"https://developers.google.com/gtagjs\\\">Suporte à implementação de tags</a></li><li><a href=\\\"https://www.youtube.com/user/learnwithgoogle/playlists\\\">Google Ads</a></li><li><a href=\\\"https://www.youtube.com/user/googleanalytics\\\">Google Analytics</a></li></ul><p><strong>Em relação ao Shopping</strong></p><ul><li><a href=\\\"https://www.google.com/retail/\\\">Google for Retail</a></li><li><a href=\\\"https://www.google.com/retail/solutions/merchant-center/\\\">Google Merchant Center</a></li><li><a href=\\\"https://support.google.com/merchants/answer/188924\\\">Como configurar a conta e o feed</a></li><li><a href=\\\"https://support.google.com/merchants/topic/7294606\\\">Otimização do feed</a></li><li><a href=\\\"https://support.google.com/merchants/answer/9199328\\\">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>\",\"placeholders\":[{\"key\":\"[Nome do Cliente]\",\"label\":\"Nome do Cliente\",\"type\":\"text\"},{\"key\":\"[Seu Nome]\",\"label\":\"Assinatura\",\"type\":\"text\",\"auto\":\"agentName\"}]}",
      "sortOrder": 14
    },
    {
      "key": "nrp_dfa",
      "field": "NRP / Cierre",
      "lang": "ES",
      "label": "NRP - DFA",
      "value": "{\"subject\":\"Implementación con el Equipo de Soluciones Técnicas de Google - Cierre\",\"template\":\"<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementación de la etiqueta referente a la solicitud. Se hizo otro intento después de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si aún desea continuar con la implementación, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber más, consulte a continuación algunos enlaces útiles con recursos valiosos relacionados con la implementación de etiquetas y el soporte de Shopping.</p><p><strong>En relación con las etiquetas</strong></p><ul><li><a href=\\\"https://developers.google.com/gtagjs\\\">Soporte para la implementación de etiquetas</a></li><li><a href=\\\"https://www.youtube.com/user/learnwithgoogle/playlists\\\">Google Ads</a></li><li><a href=\\\"https://www.youtube.com/user/googleanalytics\\\">Google Analytics</a></li></ul><p><strong>En relación con Shopping</strong></p><ul><li><a href=\\\"https://www.google.com/retail/\\\">Google for Retail</a></li><li><a href=\\\"https://www.google.com/retail/solutions/merchant-center/\\\">Google Merchant Center</a></li><li><a href=\\\"https://support.google.com/merchants/answer/188924\\\">Cómo configurar la cuenta y el feed</a></li><li><a href=\\\"https://support.google.com/merchants/topic/7294606\\\">Optimización del feed</a></li><li><a href=\\\"https://support.google.com/merchants/answer/9199328\\\">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones Técnicas Cognizant, en nombre de Google</p>\",\"labels\":{\"[Nome do Cliente]\":\"Nombre del Cliente\",\"[Seu Nome]\":\"Firma\"}}",
      "sortOrder": 15
    }
  ]
};

function seedEmailsNow() {
  const result = seedContentModule(CONTENT_SEED_EMAILS);
  Logger.log(result);
  return result;
}
