// ARQUIVO GERADO - não edite à mão.
// Origem: npm run seed:note-templates (lê o scenarioSnippets de
// src/modules/notes/data/notes-data.js)
//
// Semeia o módulo "note_template" da Central de Conteúdo com os cenários
// rápidos que o agente já usa hoje. É migração de conteúdo que já está em
// produção, não mudança nova - por isso publica direto, sem passar pela fila.
//
// COMO RODAR: no editor do Apps Script, escolha "seedNoteTemplatesNow" no
// seletor de função e clique em Executar. Roda uma vez só; chamadas seguintes
// são ignoradas se o módulo já tiver itens no ar.

const CONTENT_SEED_NOTE_TEMPLATES = {
  "module": "note_template",
  "items": [
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "PT",
      "label": "GTM Install",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Instalação do GTM finalizada.\",\"field-PASSOS_EXECUTADOS\":\"• Criamos a conta dentro do GTM\\n• Instalamos dentro do CMS/Hospedagem.\\n• Criamos o Vinculador de Conversões.\",\"field-RESULTADO\":\"• Validei a instalação.\"},\"linkedTask\":\"gtm_installation\"}",
      "sortOrder": 0
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "ES",
      "label": "GTM Install",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Instalación de GTM finalizada.\",\"field-PASSOS_EXECUTADOS\":\"• Creamos la cuenta dentro de GTM\\n• Lo instalamos dentro del CMS/Hosting.\\n• Creamos el Vinculador de Conversiones.\",\"field-RESULTADO\":\"• Validé la instalación.\"},\"linkedTask\":\"gtm_installation\"}",
      "sortOrder": 1
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "EN",
      "label": "GTM Install",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"GTM installation completed.\",\"field-PASSOS_EXECUTADOS\":\"• We created the account inside GTM\\n• We installed it inside the CMS/Hosting.\\n• We created the Conversion Linker.\",\"field-RESULTADO\":\"• I validated the installation.\"},\"linkedTask\":\"gtm_installation\"}",
      "sortOrder": 2
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "PT",
      "label": "Whatsapp",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Instalação do Ads Conversion tracking para Whatsapp finalizada.\",\"field-PASSOS_EXECUTADOS\":\"• Fizemos a criação da conversão no Ads.\\n• Criamos a Tag no GTM para os botões de WhatsApp.\\n• Realizamos os testes e validamos o funcionamento.\",\"field-RESULTADO\":\"• Task implementada com sucesso. Fecho o caso sem acompanhamento.\"},\"linkedTask\":\"ads_conversion_tracking\"}",
      "sortOrder": 3
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "ES",
      "label": "Whatsapp",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Instalación del Ads Conversion Tracking para WhatsApp finalizada.\",\"field-PASSOS_EXECUTADOS\":\"• Realizamos la creación de la conversión en Ads.\\n• Creamos la etiqueta en GTM para los botones de WhatsApp.\\n• Realizamos las pruebas y validamos el funcionamiento.\",\"field-RESULTADO\":\"• Tarea implementada con éxito. Cierro el caso sin seguimiento.\"},\"linkedTask\":\"ads_conversion_tracking\"}",
      "sortOrder": 4
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "EN",
      "label": "Whatsapp",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Ads Conversion Tracking installation for WhatsApp completed.\",\"field-PASSOS_EXECUTADOS\":\"• We created the conversion in Ads.\\n• We created the Tag in GTM for the WhatsApp buttons.\\n• We ran the tests and validated that it works.\",\"field-RESULTADO\":\"• Task implemented successfully. I am closing the case with no follow-up.\"},\"linkedTask\":\"ads_conversion_tracking\"}",
      "sortOrder": 5
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "PT",
      "label": "Form",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Instalação do Ads Conversion tracking para Form finalizada.\",\"field-PASSOS_EXECUTADOS\":\"• Fizemos a criação da conversão no Ads.\\n• Criamos a Tag no GTM.\\n• Realizamos os testes e validamos o funcionamento.\",\"field-RESULTADO\":\"• Task implementada com sucesso. Fecho o caso sem acompanhamento.\"},\"linkedTask\":\"ads_conversion_tracking\"}",
      "sortOrder": 6
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "ES",
      "label": "Form",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Instalación del Ads Conversion Tracking para Formulario finalizada.\",\"field-PASSOS_EXECUTADOS\":\"• Realizamos la creación de la conversión en Ads.\\n• Creamos la etiqueta en GTM.\\n• Realizamos las pruebas y validamos el funcionamiento.\",\"field-RESULTADO\":\"• Tarea implementada con éxito. Cierro el caso sin seguimiento.\"},\"linkedTask\":\"ads_conversion_tracking\"}",
      "sortOrder": 7
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "EN",
      "label": "Form",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Ads Conversion Tracking installation for Form completed.\",\"field-PASSOS_EXECUTADOS\":\"• We created the conversion in Ads.\\n• We created the Tag in GTM.\\n• We ran the tests and validated that it works.\",\"field-RESULTADO\":\"• Task implemented successfully. I am closing the case with no follow-up.\"},\"linkedTask\":\"ads_conversion_tracking\"}",
      "sortOrder": 8
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "PT",
      "label": "Ecw4 Close",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Finalização do acompanhamento de EC.\",\"field-PASSOS_EXECUTADOS\":\"• Após o período de acompanhamento, verifiquei o painel do Ads.\\n• A conversão está sendo registrada corretamente.\",\"field-RESULTADO\":\"• Valido o bom funcionamento da conversão otimizada.\\n• Assim, fecho o caso.\"},\"linkedTask\":\"ads_enhanced_conversions\"}",
      "sortOrder": 9
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "ES",
      "label": "Ecw4 Close",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Finalización del seguimiento de EC.\",\"field-PASSOS_EXECUTADOS\":\"• Después del período de seguimiento, verifiqué el panel de Ads.\\n• La conversión se está registrando correctamente.\",\"field-RESULTADO\":\"• Valido el buen funcionamiento de la conversión optimizada.\\n• Así, cierro el caso.\"},\"linkedTask\":\"ads_enhanced_conversions\"}",
      "sortOrder": 10
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "EN",
      "label": "Ecw4 Close",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"End of the EC follow-up.\",\"field-PASSOS_EXECUTADOS\":\"• After the follow-up period, I checked the Ads dashboard.\\n• The conversion is being recorded correctly.\",\"field-RESULTADO\":\"• I confirm the optimized conversion is working.\\n• I am therefore closing the case.\"},\"linkedTask\":\"ads_enhanced_conversions\"}",
      "sortOrder": 11
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "PT",
      "label": "GA4 Event Close",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Finalização do Acompanhamento de GA4.\",\"field-PASSOS_EXECUTADOS\":\"• Após o período de 48h de acompanhamento, verifiquei o painel.\\n• O evento está sendo registrado corretamente.\",\"field-RESULTADO\":\"• Valido o bom funcionamento do rastreamento de eventos.\\n• Assim, fecho o caso.\"},\"linkedTask\":\"ga4_event_tracking\"}",
      "sortOrder": 12
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "ES",
      "label": "GA4 Event Close",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Finalización del seguimiento de GA4.\",\"field-PASSOS_EXECUTADOS\":\"• Después del período de 48h de seguimiento, verifiqué el panel.\\n• El evento se está registrando correctamente.\",\"field-RESULTADO\":\"• Valido el buen funcionamiento del rastreo de eventos.\\n• Así, cierro el caso.\"},\"linkedTask\":\"ga4_event_tracking\"}",
      "sortOrder": 13
    },
    {
      "key": "SO_Implementation_Only",
      "field": "all",
      "lang": "EN",
      "label": "GA4 Event Close",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"End of the GA4 follow-up.\",\"field-PASSOS_EXECUTADOS\":\"• After the 48h follow-up period, I checked the dashboard.\\n• The event is being recorded correctly.\",\"field-RESULTADO\":\"• I confirm the event tracking is working.\\n• I am therefore closing the case.\"},\"linkedTask\":\"ga4_event_tracking\"}",
      "sortOrder": 14
    },
    {
      "key": "NI_Awaiting_Inputs",
      "field": "all",
      "lang": "PT",
      "label": "NI Inicio Manual",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Aguardando informações por parte do anunciante (Início 2/6)\"}}",
      "sortOrder": 15
    },
    {
      "key": "NI_Awaiting_Inputs",
      "field": "all",
      "lang": "ES",
      "label": "NI Inicio Manual",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Esperando información por parte del anunciante (Inicio 2/6)\"}}",
      "sortOrder": 16
    },
    {
      "key": "NI_Awaiting_Inputs",
      "field": "all",
      "lang": "EN",
      "label": "NI Inicio Manual",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Awaiting information from the advertiser (Start 2/6)\"}}",
      "sortOrder": 17
    },
    {
      "key": "NI_Awaiting_Inputs",
      "field": "all",
      "lang": "PT",
      "label": "NI CMS Access",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Aguardando informações por parte do anunciante (Início 2/6 - Sem Acesso ao CMS)\",\"field-TASKS_SOLICITADAS\":\"• Instalação do GTM\\n• Configuração de Conversões\",\"field-CONTEXTO_CALL\":\"• Percebi que o(a) anunciante não tinha GTM Instalado.\\n• Seguimos com a criação de conta no GTM.\\n• Entretanto, a conta de acesso ao painel do site (ex: WordPress) não tinha permissão para instalar plugins ou editar o código.\",\"field-IMPEDIMENTO_CLIENTE\":\"• Anunciante precisa conseguir acesso de administrador ao painel do site.\\n• OU\\n• Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.\",\"field-MINHA_ACAO\":\"• Coloco o caso em 2/6.\\n• Assim que o anunciante tiver o acesso ou a instalação for feita, abrirei um caso em BAU para dar continuidade.\"}}",
      "sortOrder": 18
    },
    {
      "key": "NI_Awaiting_Inputs",
      "field": "all",
      "lang": "ES",
      "label": "NI CMS Access",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Esperando información por parte del anunciante (Inicio 2/6 - Sin Acceso al CMS)\",\"field-TASKS_SOLICITADAS\":\"• Instalación de GTM\\n• Configuración de Conversiones\",\"field-CONTEXTO_CALL\":\"• Noté que el/la anunciante no tenía GTM instalado.\\n• Seguimos con la creación de la cuenta en GTM.\\n• Sin embargo, la cuenta de acceso al panel del sitio (ej: WordPress) no tenía permiso para instalar plugins o editar el código.\",\"field-IMPEDIMENTO_CLIENTE\":\"• El/la anunciante necesita conseguir acceso de administrador al panel del sitio.\\n• O\\n• El/la anunciante necesita contactar al/a la desarrollador(a) para que instale GTM.\",\"field-MINHA_ACAO\":\"• Coloco el caso en 2/6.\\n• Una vez que el/la anunciante tenga el acceso o se realice la instalación, abriré un caso en BAU para dar continuidad.\"}}",
      "sortOrder": 19
    },
    {
      "key": "NI_Awaiting_Inputs",
      "field": "all",
      "lang": "EN",
      "label": "NI CMS Access",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Awaiting information from the advertiser (Start 2/6 - No CMS Access)\",\"field-TASKS_SOLICITADAS\":\"• GTM Installation\\n• Conversion setup\",\"field-CONTEXTO_CALL\":\"• I noticed the advertiser did not have GTM installed.\\n• We went ahead with creating the GTM account.\\n• However, the account used to access the site's panel (e.g.: WordPress) did not have permission to install plugins or edit the code.\",\"field-IMPEDIMENTO_CLIENTE\":\"• The advertiser needs to obtain administrator access to the site's panel.\\n• OR\\n• The advertiser needs to contact their developer so that they install GTM.\",\"field-MINHA_ACAO\":\"• I am placing the case in 2/6.\\n• As soon as the advertiser has access or the installation is done, I will open a BAU case to continue.\"}}",
      "sortOrder": 20
    },
    {
      "key": "NI_Awaiting_Inputs",
      "field": "all",
      "lang": "PT",
      "label": "NI Lack OF Access",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Aguardando informações por parte do anunciante (Falta de acessos necessários)\",\"field-CONTEXTO_CALL\":\"• Durante a call, identificamos que os acessos necessários para prosseguir com a implementação não estavam disponíveis.\\n• Orientei o(a) anunciante sobre quais acessos são necessários e como obtê-los.\",\"field-IMPEDIMENTO_CLIENTE\":\"• Anunciante precisa providenciar os acessos necessários (ex: painel do site, plataforma de anúncios, ou contato com o(a) desenvolvedor(a)) para que a implementação seja concluída.\",\"field-MINHA_ACAO\":\"• Coloco o caso em 2/6.\\n• Assim que o anunciante obtiver os acessos, abrirei um caso em BAU para dar continuidade.\"}}",
      "sortOrder": 21
    },
    {
      "key": "NI_Awaiting_Inputs",
      "field": "all",
      "lang": "ES",
      "label": "NI Lack OF Access",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Esperando información por parte del anunciante (Falta de accesos necesarios)\",\"field-CONTEXTO_CALL\":\"• Durante la call, identificamos que los accesos necesarios para continuar con la implementación no estaban disponibles.\\n• Orienté al/a la anunciante sobre qué accesos son necesarios y cómo obtenerlos.\",\"field-IMPEDIMENTO_CLIENTE\":\"• El/la anunciante necesita proporcionar los accesos necesarios (ej: panel del sitio, plataforma de anuncios, o contacto con el/la desarrollador(a)) para que la implementación sea concluida.\",\"field-MINHA_ACAO\":\"• Coloco el caso en 2/6.\\n• Una vez que el/la anunciante obtenga los accesos, abriré un caso en BAU para dar continuidad.\"}}",
      "sortOrder": 22
    },
    {
      "key": "NI_Awaiting_Inputs",
      "field": "all",
      "lang": "EN",
      "label": "NI Lack OF Access",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Awaiting information from the advertiser (Missing required access)\",\"field-CONTEXTO_CALL\":\"• During the call we identified that the access required to proceed with the implementation was not available.\\n• I walked the advertiser through which access is required and how to obtain it.\",\"field-IMPEDIMENTO_CLIENTE\":\"• The advertiser needs to arrange the required access (e.g.: site panel, ads platform, or contact with their developer) so the implementation can be completed.\",\"field-MINHA_ACAO\":\"• I am placing the case in 2/6.\\n• As soon as the advertiser obtains the access, I will open a BAU case to continue.\"}}",
      "sortOrder": 23
    },
    {
      "key": "NI_Awaiting_Validation",
      "field": "all",
      "lang": "PT",
      "label": "NI Awaiting Ecw4",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Aguardando validação de dados (ECW4 - 7 Dias)\",\"field-TASKS_SOLICITADAS\":\"• Implementação de Conversões Otimizadas (ECW4)\"},\"linkedTask\":\"ads_enhanced_conversions\"}",
      "sortOrder": 24
    },
    {
      "key": "NI_Awaiting_Validation",
      "field": "all",
      "lang": "ES",
      "label": "NI Awaiting Ecw4",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Esperando validación de datos (ECW4 - 7 Días)\",\"field-TASKS_SOLICITADAS\":\"• Implementación de Conversiones Optimizadas (ECW4)\"},\"linkedTask\":\"ads_enhanced_conversions\"}",
      "sortOrder": 25
    },
    {
      "key": "NI_Awaiting_Validation",
      "field": "all",
      "lang": "EN",
      "label": "NI Awaiting Ecw4",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Awaiting data validation (ECW4 - 7 Days)\",\"field-TASKS_SOLICITADAS\":\"• Enhanced Conversions implementation (ECW4)\"},\"linkedTask\":\"ads_enhanced_conversions\"}",
      "sortOrder": 26
    },
    {
      "key": "NI_Awaiting_Validation",
      "field": "all",
      "lang": "PT",
      "label": "NI Awaiting GA4",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Aguardando validação de dados (GA4 Event - 48h)\",\"field-TASKS_SOLICITADAS\":\"• Implementação de Eventos GA4\"},\"linkedTask\":\"ga4_event_tracking\"}",
      "sortOrder": 27
    },
    {
      "key": "NI_Awaiting_Validation",
      "field": "all",
      "lang": "ES",
      "label": "NI Awaiting GA4",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Esperando validación de datos (GA4 Event - 48h)\",\"field-TASKS_SOLICITADAS\":\"• Implementación de Eventos GA4\"},\"linkedTask\":\"ga4_event_tracking\"}",
      "sortOrder": 28
    },
    {
      "key": "NI_Awaiting_Validation",
      "field": "all",
      "lang": "EN",
      "label": "NI Awaiting GA4",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Awaiting data validation (GA4 Event - 48h)\",\"field-TASKS_SOLICITADAS\":\"• GA4 Events implementation\"},\"linkedTask\":\"ga4_event_tracking\"}",
      "sortOrder": 29
    },
    {
      "key": "NI_Awaiting_Inputs",
      "field": "bau",
      "lang": "PT",
      "label": "NI Followup BAU",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Aguardando informações por parte do anunciante (Follow-up BAU 2/6)\",\"field-SPEAKEASY_ID\":\"N/A\",\"field-ON_CALL\":\"N/A\",\"field-CONTEXTO_CALL\":\"• No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas não obtive resposta. Envio na sequência o email referente ao dia respectivo.\",\"field-TASKS_SOLICITADAS\":\"N/A\",\"field-IMPEDIMENTO_CLIENTE\":\"N/A\",\"field-MINHA_ACAO\":\"N/A\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 30
    },
    {
      "key": "NI_Awaiting_Inputs",
      "field": "bau",
      "lang": "ES",
      "label": "NI Followup BAU",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Esperando información por parte del anunciante (Follow-up BAU 2/6)\",\"field-SPEAKEASY_ID\":\"N/A\",\"field-ON_CALL\":\"N/A\",\"field-CONTEXTO_CALL\":\"• El día {DIA} del 2/6 hice dos intentos de contacto seguidos, pero no obtuve respuesta. Envío a continuación el correo correspondiente al día respectivo.\",\"field-TASKS_SOLICITADAS\":\"N/A\",\"field-IMPEDIMENTO_CLIENTE\":\"N/A\",\"field-MINHA_ACAO\":\"N/A\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 31
    },
    {
      "key": "NI_Awaiting_Inputs",
      "field": "bau",
      "lang": "EN",
      "label": "NI Followup BAU",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Awaiting information from the advertiser (BAU Follow-up 2/6)\",\"field-SPEAKEASY_ID\":\"N/A\",\"field-ON_CALL\":\"N/A\",\"field-CONTEXTO_CALL\":\"• On day {DIA} of the 2/6 I made two consecutive contact attempts with no answer. I am sending the email for that day next.\",\"field-TASKS_SOLICITADAS\":\"N/A\",\"field-IMPEDIMENTO_CLIENTE\":\"N/A\",\"field-MINHA_ACAO\":\"N/A\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 32
    },
    {
      "key": "NI_Attempted_Contact",
      "field": "lm",
      "lang": "PT",
      "label": "NI Followup LM",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Tentativa de contato sem sucesso (Follow-up LM 2/6)\",\"field-SPEAKEASY_ID\":\"N/A\",\"field-ON_CALL\":\"N/A\",\"field-CONTEXTO_CALL\":\"• No dia {DIA} do 2/6 enviei e-mail de follow-up (caso LM, sem tentativas de ligação), mas não obtive resposta.\",\"field-TASKS_SOLICITADAS\":\"N/A\",\"field-IMPEDIMENTO_CLIENTE\":\"N/A\",\"field-MINHA_ACAO\":\"N/A\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 33
    },
    {
      "key": "NI_Attempted_Contact",
      "field": "lm",
      "lang": "ES",
      "label": "NI Followup LM",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Intento de contacto sin éxito (Follow-up LM 2/6)\",\"field-SPEAKEASY_ID\":\"N/A\",\"field-ON_CALL\":\"N/A\",\"field-CONTEXTO_CALL\":\"• El día {DIA} del 2/6 envié correo de follow-up (caso LM, sin intentos de llamada), pero no obtuve respuesta.\",\"field-TASKS_SOLICITADAS\":\"N/A\",\"field-IMPEDIMENTO_CLIENTE\":\"N/A\",\"field-MINHA_ACAO\":\"N/A\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 34
    },
    {
      "key": "NI_Attempted_Contact",
      "field": "lm",
      "lang": "EN",
      "label": "NI Followup LM",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Contact attempt unsuccessful (LM Follow-up 2/6)\",\"field-SPEAKEASY_ID\":\"N/A\",\"field-ON_CALL\":\"N/A\",\"field-CONTEXTO_CALL\":\"• On day {DIA} of the 2/6 I sent a follow-up email (LM case, no call attempts) with no answer.\",\"field-TASKS_SOLICITADAS\":\"N/A\",\"field-IMPEDIMENTO_CLIENTE\":\"N/A\",\"field-MINHA_ACAO\":\"N/A\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 35
    },
    {
      "key": "NI_Attempted_Contact",
      "field": "bau",
      "lang": "PT",
      "label": "NI Attempted 2day",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Attempted Contact (Início 2 Day Rule)\",\"field-CONTEXTO_CALL\":\"• Fiz a primeira tentativa de ligação, sem sucesso.\\n• Enviei uma message no chat para o AM.\\n• Aguardei 5 minutos e fiz a segunda tentativa de ligação, novamente sem sucesso.\\n• Aguardei mais 5 minutos e agora farei o acompanhamento 2 Day Rule.\"}}",
      "sortOrder": 36
    },
    {
      "key": "NI_Attempted_Contact",
      "field": "bau",
      "lang": "ES",
      "label": "NI Attempted 2day",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Attempted Contact (Inicio 2 Day Rule)\",\"field-CONTEXTO_CALL\":\"• Hice el primer intento de llamada, sin éxito.\\n• Envié un mensaje en el chat al AM.\\n• Esperé 5 minutos e hice el segundo intento de llamada, nuevamente sin éxito.\\n• Esperé 5 minutos más y ahora haré el seguimiento 2 Day Rule.\"}}",
      "sortOrder": 37
    },
    {
      "key": "NI_Attempted_Contact",
      "field": "bau",
      "lang": "EN",
      "label": "NI Attempted 2day",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Attempted Contact (Start 2 Day Rule)\",\"field-CONTEXTO_CALL\":\"• I made the first call attempt, with no success.\\n• I sent a chat message to the AM.\\n• I waited 5 minutes and made the second call attempt, again with no success.\\n• I waited another 5 minutes and will now proceed with the 2 Day Rule follow-up.\"}}",
      "sortOrder": 38
    },
    {
      "key": "IN_Not_Reachable",
      "field": "bau",
      "lang": "PT",
      "label": "IN NRP BAU",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"NRP (BAU - 3 tentativas)\",\"field-COMENTARIOS\":\"• Duas ligações seguidas, e e-mail \\\"Antes dos 10 minutos\\\" e uma terceira e ultima tentativa de ligação.\\n• Não houve resposta às tentativas de ligação ou e-mail, por isso o caso será inativado.\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 39
    },
    {
      "key": "IN_Not_Reachable",
      "field": "bau",
      "lang": "ES",
      "label": "IN NRP BAU",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"NRP (BAU - 3 intentos)\",\"field-COMENTARIOS\":\"• Dos llamadas seguidas, y correo \\\"Antes de los 10 minutos\\\" y un tercer y último intento de llamada.\\n• No hubo respuesta a los intentos de llamada o correo, por eso el caso será inactivado.\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 40
    },
    {
      "key": "IN_Not_Reachable",
      "field": "bau",
      "lang": "EN",
      "label": "IN NRP BAU",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"NRP (BAU - 3 attempts)\",\"field-COMENTARIOS\":\"• Two consecutive calls, the \\\"Before the 10 minutes\\\" email and a third and final call attempt.\\n• There was no answer to the call attempts or the email, so the case will be inactivated.\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 41
    },
    {
      "key": "IN_Not_Reachable",
      "field": "bau",
      "lang": "PT",
      "label": "IN NO Show BAU",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Sem resposta ao 2 Day Rule.\",\"field-ON_CALL\":\"N/A\",\"field-COMENTARIOS\":\"• O caso foi gerado e entrei na chamada no horário agendado.\\n• O anunciante não compareceu à reunião.\\n• Segui o protocolo de espera (BAU): realizei duas tentativas de ligação, sem sucesso.\\n• Nenhuma das ligações foi atendida (ex: Caixa Postal).\\n• Caso inativado após 2 Day Rule.\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 42
    },
    {
      "key": "IN_Not_Reachable",
      "field": "bau",
      "lang": "ES",
      "label": "IN NO Show BAU",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Sin respuesta al 2 Day Rule.\",\"field-ON_CALL\":\"N/A\",\"field-COMENTARIOS\":\"• El caso fue generado y entré a la llamada en el horario agendado.\\n• El/la anunciante no asistió a la reunión.\\n• Seguí el protocolo de espera (BAU): realicé dos intentos de llamada, sin éxito.\\n• Ninguna de las llamadas fue atendida (ej: Buzón de voz).\\n• Caso inactivado después del 2 Day Rule.\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 43
    },
    {
      "key": "IN_Not_Reachable",
      "field": "bau",
      "lang": "EN",
      "label": "IN NO Show BAU",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"No answer to the 2 Day Rule.\",\"field-ON_CALL\":\"N/A\",\"field-COMENTARIOS\":\"• The case was created and I joined the call at the scheduled time.\\n• The advertiser did not attend the meeting.\\n• I followed the waiting protocol (BAU): I made two call attempts, with no success.\\n• Neither call was answered (e.g.: voicemail).\\n• Case inactivated after the 2 Day Rule.\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 44
    },
    {
      "key": "IN_Not_Reachable",
      "field": "all",
      "lang": "PT",
      "label": "IN 2 6 Final",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Finalização (2/6)\",\"field-SPEAKEASY_ID\":\"-\",\"field-ON_CALL\":\"-\",\"field-COMENTARIOS\":\"• Dia 9 finalização do 2/6, durante o período do acompanhamento não houve retorno do anunciante, então o caso será encerrado.\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 45
    },
    {
      "key": "IN_Not_Reachable",
      "field": "all",
      "lang": "ES",
      "label": "IN 2 6 Final",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Finalización (2/6)\",\"field-SPEAKEASY_ID\":\"-\",\"field-ON_CALL\":\"-\",\"field-COMENTARIOS\":\"• Día 9 finalización del 2/6, durante el período de seguimiento no hubo respuesta del/de la anunciante, entonces el caso será cerrado.\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 46
    },
    {
      "key": "IN_Not_Reachable",
      "field": "all",
      "lang": "EN",
      "label": "IN 2 6 Final",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Closure (2/6)\",\"field-SPEAKEASY_ID\":\"-\",\"field-ON_CALL\":\"-\",\"field-COMENTARIOS\":\"• Day 9, closure of the 2/6. There was no response from the advertiser during the follow-up period, so the case will be closed.\",\"field-GTM_GA4_VERIFICADO\":\"N/A\"}}",
      "sortOrder": 47
    },
    {
      "key": "IN_Not_Reachable",
      "field": "all",
      "lang": "PT",
      "label": "IN NOT Reachable NO Return",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inativação por ausência de retorno do anunciante\",\"field-COMENTARIOS\":\"O(a) anunciante não compareceu à consultoria. Fiz as tentativas de ligação, mas não obtive retorno.\\n\\nIrei solicitar a inativação do caso, levando em conta a ausência de contato.\"}}",
      "sortOrder": 48
    },
    {
      "key": "IN_Not_Reachable",
      "field": "all",
      "lang": "ES",
      "label": "IN NOT Reachable NO Return",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inactivación por ausencia de respuesta del/de la anunciante\",\"field-COMENTARIOS\":\"El/la anunciante no asistió a la consultoría. Hice los intentos de llamada, pero no obtuve respuesta.\\n\\nSolicitaré la inactivación del caso, teniendo en cuenta la ausencia de contacto.\"}}",
      "sortOrder": 49
    },
    {
      "key": "IN_Not_Reachable",
      "field": "all",
      "lang": "EN",
      "label": "IN NOT Reachable NO Return",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inactivation due to no response from the advertiser\",\"field-COMENTARIOS\":\"The advertiser did not attend the consultation. I made the call attempts but got no response.\\n\\nI will request the inactivation of the case, taking the lack of contact into account.\"}}",
      "sortOrder": 50
    },
    {
      "key": "IN_Not_Ready",
      "field": "all",
      "lang": "PT",
      "label": "IN NOT Ready Lack OF Access",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inativação por falta de acessos (Reagendamento solicitado)\",\"field-COMENTARIOS\":\"Não conseguimos implementar nada durante a consultoria, já que o(a) anunciante não tinha os acessos necessários.\\n\\nIrei abrir caso em BAU para o dia solicitado e pedir a inativação do mesmo, levando em conta a falta de acessos e a solicitação de reagendamento.\"}}",
      "sortOrder": 51
    },
    {
      "key": "IN_Not_Ready",
      "field": "all",
      "lang": "ES",
      "label": "IN NOT Ready Lack OF Access",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inactivación por falta de accesos (Reprogramación solicitada)\",\"field-COMENTARIOS\":\"No pudimos implementar nada durante la consultoría, ya que el/la anunciante no tenía los accesos necesarios.\\n\\nAbriré un caso en BAU para el día solicitado y pediré la inactivación del mismo, teniendo en cuenta la falta de accesos y la solicitud de reprogramación.\"}}",
      "sortOrder": 52
    },
    {
      "key": "IN_Not_Ready",
      "field": "all",
      "lang": "EN",
      "label": "IN NOT Ready Lack OF Access",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inactivation due to missing access (Rescheduling requested)\",\"field-COMENTARIOS\":\"We were unable to implement anything during the consultation, as the advertiser did not have the required access.\\n\\nI will open a BAU case for the requested day and ask for it to be inactivated, taking into account the missing access and the rescheduling request.\"}}",
      "sortOrder": 53
    },
    {
      "key": "IN_Infeasible",
      "field": "all",
      "lang": "PT",
      "label": "IN Infeasible",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inativação por inviabilidade técnica\",\"field-COMENTARIOS\":\"• Avaliamos a implementação solicitada e identificamos que não é possível realizá-la devido à complexidade técnica/estrutura do site (ex: [descrever a limitação encontrada]).\\n• Não se trata de uma limitação do Google, e sim da estrutura atual do site/plataforma do anunciante.\\n• Oriento o(a) anunciante sobre as opções disponíveis (ex: alteração da plataforma, apoio de um(a) desenvolvedor(a) especializado(a)).\"}}",
      "sortOrder": 54
    },
    {
      "key": "IN_Infeasible",
      "field": "all",
      "lang": "ES",
      "label": "IN Infeasible",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inactivación por inviabilidad técnica\",\"field-COMENTARIOS\":\"• Evaluamos la implementación solicitada e identificamos que no es posible realizarla debido a la complejidad técnica/estructura del sitio (ej: [describir la limitación encontrada]).\\n• No se trata de una limitación de Google, sino de la estructura actual del sitio/plataforma del/de la anunciante.\\n• Oriento al/a la anunciante sobre las opciones disponibles (ej: cambio de plataforma, apoyo de un(a) desarrollador(a) especializado(a)).\"}}",
      "sortOrder": 55
    },
    {
      "key": "IN_Infeasible",
      "field": "all",
      "lang": "EN",
      "label": "IN Infeasible",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inactivation due to technical infeasibility\",\"field-COMENTARIOS\":\"• We assessed the requested implementation and found that it cannot be carried out due to the technical complexity/structure of the site (e.g.: [describe the limitation found]).\\n• This is not a Google limitation, but the current structure of the advertiser's site/platform.\\n• I walked the advertiser through the available options (e.g.: changing platform, support from a specialized developer).\"}}",
      "sortOrder": 56
    },
    {
      "key": "IN_Not_Interested",
      "field": "all",
      "lang": "PT",
      "label": "IN NOT Interested",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inativação por falta de interesse do anunciante\",\"field-COMENTARIOS\":\"• O(a) anunciante informou que não tem interesse em prosseguir com a consultoria neste momento.\\n• [Ou] O contato se limitou a perguntas gerais, sem intenção de realizar a implementação.\\n• Não há mais ações pendentes da nossa parte; caso encerrado a pedido do(a) anunciante.\"}}",
      "sortOrder": 57
    },
    {
      "key": "IN_Not_Interested",
      "field": "all",
      "lang": "ES",
      "label": "IN NOT Interested",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inactivación por falta de interés del/de la anunciante\",\"field-COMENTARIOS\":\"• El/la anunciante informó que no tiene interés en continuar con la consultoría en este momento.\\n• [O] El contacto se limitó a preguntas generales, sin intención de realizar la implementación.\\n• No hay más acciones pendientes de nuestra parte; caso cerrado a pedido del/de la anunciante.\"}}",
      "sortOrder": 58
    },
    {
      "key": "IN_Not_Interested",
      "field": "all",
      "lang": "EN",
      "label": "IN NOT Interested",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inactivation due to lack of advertiser interest\",\"field-COMENTARIOS\":\"• The advertiser said they are not interested in proceeding with the consultation at this time.\\n• [Or] The contact was limited to general questions, with no intention of carrying out the implementation.\\n• There are no further actions pending on our side; case closed at the advertiser's request.\"}}",
      "sortOrder": 59
    },
    {
      "key": "IN_Troubleshooting_Transferred",
      "field": "all",
      "lang": "PT",
      "label": "IN Troubleshooting Transferred",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inativação - Troubleshooting sem sucesso, caso transferido\",\"field-COMENTARIOS\":\"• Realizamos os passos de troubleshooting padrão para o problema relatado (ex: [listar testes/verificações feitas]).\\n• Os passos não resolveram o problema.\\n• Encaminho o caso para o time responsável ([nome do time]) para continuidade.\"}}",
      "sortOrder": 60
    },
    {
      "key": "IN_Troubleshooting_Transferred",
      "field": "all",
      "lang": "ES",
      "label": "IN Troubleshooting Transferred",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inactivación - Troubleshooting sin éxito, caso transferido\",\"field-COMENTARIOS\":\"• Realizamos los pasos de troubleshooting estándar para el problema reportado (ej: [listar pruebas/verificaciones realizadas]).\\n• Los pasos no resolvieron el problema.\\n• Derivo el caso al equipo responsable ([nombre del equipo]) para su continuidad.\"}}",
      "sortOrder": 61
    },
    {
      "key": "IN_Troubleshooting_Transferred",
      "field": "all",
      "lang": "EN",
      "label": "IN Troubleshooting Transferred",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Inactivation - Troubleshooting unsuccessful, case transferred\",\"field-COMENTARIOS\":\"• We ran the standard troubleshooting steps for the reported problem (e.g.: [list the tests/checks performed]).\\n• The steps did not resolve the problem.\\n• I am forwarding the case to the responsible team ([team name]) to continue.\"}}",
      "sortOrder": 62
    },
    {
      "key": "AS_Reschedule_1",
      "field": "all",
      "lang": "PT",
      "label": "AS NO Show",
      "value": "{\"fields\":{\"field-MOTIVO_REAGENDAMENTO\":\"• Precisamos reagendar o caso, já que o anunciante não compareceu na meet, porém respondeu o e-mail pedindo o reagendamento\"}}",
      "sortOrder": 63
    },
    {
      "key": "AS_Reschedule_1",
      "field": "all",
      "lang": "ES",
      "label": "AS NO Show",
      "value": "{\"fields\":{\"field-MOTIVO_REAGENDAMENTO\":\"• Necesitamos reprogramar el caso, ya que el/la anunciante no asistió al meet, pero respondió el correo pidiendo la reprogramación\"}}",
      "sortOrder": 64
    },
    {
      "key": "AS_Reschedule_1",
      "field": "all",
      "lang": "EN",
      "label": "AS NO Show",
      "value": "{\"fields\":{\"field-MOTIVO_REAGENDAMENTO\":\"• We need to reschedule the case, as the advertiser did not attend the meet but replied to the email asking to reschedule\"}}",
      "sortOrder": 65
    },
    {
      "key": "AS_Reschedule_1",
      "field": "all",
      "lang": "PT",
      "label": "AS Insufficient Time",
      "value": "{\"fields\":{\"field-MOTIVO_REAGENDAMENTO\":\"• Precisamos reagendar o caso, já que o tempo foi insuficiente para terminar as Tasks\\n• Implementamos [descrever o que foi feito]\"}}",
      "sortOrder": 66
    },
    {
      "key": "AS_Reschedule_1",
      "field": "all",
      "lang": "ES",
      "label": "AS Insufficient Time",
      "value": "{\"fields\":{\"field-MOTIVO_REAGENDAMENTO\":\"• Necesitamos reprogramar el caso, ya que el tiempo fue insuficiente para terminar las Tareas\\n• Implementamos [describir lo que se hizo]\"}}",
      "sortOrder": 67
    },
    {
      "key": "AS_Reschedule_1",
      "field": "all",
      "lang": "EN",
      "label": "AS Insufficient Time",
      "value": "{\"fields\":{\"field-MOTIVO_REAGENDAMENTO\":\"• We need to reschedule the case, as there was not enough time to finish the Tasks\\n• We implemented [describe what was done]\"}}",
      "sortOrder": 68
    },
    {
      "key": "AS_Reschedule_1",
      "field": "all",
      "lang": "PT",
      "label": "AS NO Access",
      "value": "{\"fields\":{\"field-MOTIVO_REAGENDAMENTO\":\"• Precisamos reagendar o caso, já que o(a) anunciante não tinha acesso ao site, ao código ou ao CMS necessários para a instalação do Google Tag Manager\"}}",
      "sortOrder": 69
    },
    {
      "key": "AS_Reschedule_1",
      "field": "all",
      "lang": "ES",
      "label": "AS NO Access",
      "value": "{\"fields\":{\"field-MOTIVO_REAGENDAMENTO\":\"• Necesitamos reprogramar el caso, ya que el/la anunciante no tenía acceso al sitio, al código o al CMS necesarios para la instalación de Google Tag Manager\"}}",
      "sortOrder": 70
    },
    {
      "key": "AS_Reschedule_1",
      "field": "all",
      "lang": "EN",
      "label": "AS NO Access",
      "value": "{\"fields\":{\"field-MOTIVO_REAGENDAMENTO\":\"• We need to reschedule the case, as the advertiser did not have access to the site, the code or the CMS required to install Google Tag Manager\"}}",
      "sortOrder": 71
    },
    {
      "key": "AS_Acceptable_Reschedule",
      "field": "all",
      "lang": "PT",
      "label": "AS Force Majeure",
      "value": "{\"fields\":{\"field-MOTIVO_REAGENDAMENTO\":\"• Reagendamento por fator maior fora do controle do anunciante (ex: falta de internet/energia, motivo de saúde) - dentro dos critérios de reagendamento aceitável.\\n• [Detalhar o fator específico relatado pelo anunciante]\"}}",
      "sortOrder": 72
    },
    {
      "key": "AS_Acceptable_Reschedule",
      "field": "all",
      "lang": "ES",
      "label": "AS Force Majeure",
      "value": "{\"fields\":{\"field-MOTIVO_REAGENDAMENTO\":\"• Reprogramación por fuerza mayor fuera del control del/de la anunciante (ej: falta de internet/energía, motivo de salud) - dentro de los criterios de reprogramación aceptable.\\n• [Detallar el factor específico reportado por el/la anunciante]\"}}",
      "sortOrder": 73
    },
    {
      "key": "AS_Acceptable_Reschedule",
      "field": "all",
      "lang": "EN",
      "label": "AS Force Majeure",
      "value": "{\"fields\":{\"field-MOTIVO_REAGENDAMENTO\":\"• Rescheduling due to force majeure outside the advertiser's control (e.g.: no internet/power, health reasons) - within the acceptable rescheduling criteria.\\n• [Detail the specific factor reported by the advertiser]\"}}",
      "sortOrder": 74
    },
    {
      "key": "DC_Other",
      "field": "all",
      "lang": "PT",
      "label": "DC LM Incomplete",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Nada foi implementado durante a consultoria (tempo insuficiente, limite de reagendamento excedido)\",\"field-COMENTARIOS\":\"Não conseguimos implementar nada durante a consultoria, pois não houve tempo o suficiente para terminar a task relacionada e o limite de reagendamentos já foi atingido.\\n\\nIrei abrir caso em BAU para o dia solicitado e pedir a inativação do mesmo.\"}}",
      "sortOrder": 75
    },
    {
      "key": "DC_Other",
      "field": "all",
      "lang": "ES",
      "label": "DC LM Incomplete",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Nada fue implementado durante la consultoría (tiempo insuficiente, límite de reprogramación excedido)\",\"field-COMENTARIOS\":\"No pudimos implementar nada durante la consultoría, pues no hubo tiempo suficiente para terminar la tarea relacionada y el límite de reprogramaciones ya fue alcanzado.\\n\\nAbriré un caso en BAU para el día solicitado y pediré la inactivación del mismo.\"}}",
      "sortOrder": 76
    },
    {
      "key": "DC_Other",
      "field": "all",
      "lang": "EN",
      "label": "DC LM Incomplete",
      "value": "{\"fields\":{\"field-REASON_COMMENTS\":\"Nothing was implemented during the consultation (insufficient time, rescheduling limit exceeded)\",\"field-COMENTARIOS\":\"We were unable to implement anything during the consultation, as there was not enough time to finish the related task and the rescheduling limit has already been reached.\\n\\nI will open a BAU case for the requested day and ask for it to be inactivated.\"}}",
      "sortOrder": 77
    }
  ]
};

function seedNoteTemplatesNow() {
  const result = seedContentModule(CONTENT_SEED_NOTE_TEMPLATES);
  Logger.log(result);
  return result;
}
