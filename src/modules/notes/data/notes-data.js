// src/modules/notes/data/notes-data.js

// ==================================================================
//               NOVO: Objeto de Traduções (Tarefa 2)
// ==================================================================
export const translations = {
    'pt': {
        'idioma': 'Idioma:',
        'fluxo': 'Fluxo:',
        'status_principal': 'Status Principal:',
        'select_status': 'Selecione',
        'substatus': 'Substatus:',
        'select_substatus': 'Selecione o Status',
        'cenarios_comuns': 'Cenários Comuns',
        'selecione_tasks': 'Selecione as Tasks',
        'preencha_detalhes': 'Preencha os Detalhes',
        'copiar': 'Copiar',
        'preencher': 'Preencher',
        'limpar': 'Limpar',
        'preencher_email_automaticamente': 'Preencher email automaticamente?',
        'gostaria_de_adicionar_uma_task': 'Gostaria de adicionar uma task',
        'rascunhos_salvos': 'Rascunhos Salvos',
        'nenhum_rascunho': 'Nenhum rascunho guardado',
        'guardar': 'Guardar',
        'acesso_rapido': 'Acesso Rápido',
        'buscar_catalogo': 'Buscar no catálogo...',
        'selecione_tarefas': 'Selecione tarefas para ver os campos.',
        'utilizou_tag_support': 'Utilizou o Tag Support para criar/verificar?',
        'motivo_ts': 'Qual foi o Motivo?',
        'lembre_preencher_form': 'Lembre-se de preencher o Form!',
        'link_aqui': 'Link aqui',
        'tag_support_output_label': 'Utilizou Tag Support?',
        'motivo_output_label': 'Motivo:',
        'auto_busca': '✨ Auto Busca',
        'utilize_marcadores': 'Utilize marcadores para detalhar...',
        'descreva_consideracoes': 'Descreva as considerações...',
        'remover': 'Remover',
        'remover_campo_confirm': 'Remover o campo "{campo}"? O texto digitado será perdido.',
        'meus_rascunhos': 'Meus Rascunhos',
        'confirmar_guardar_rascunho': 'Deseja guardar o rascunho atual e limpar os campos?',
        'rascunho_salvo_sucesso': 'Rascunho salvo com sucesso!',
        'erro_ler_dados': 'Erro: Não foi possível ler os dados.',
        'erro_ao_salvar': 'Erro ao salvar.',
        'cliente_sem_nome': 'Cliente Sem Nome',
        'sem_status': 'Sem Status',
        'retomar_caso': 'Retomar Caso',
        'descartar': 'Descartar',
        'retomar_rascunho_confirm': 'Retomar este rascunho? O formulário atual será substituído.',
        'rascunho_carregado': 'Rascunho carregado.',
        'excluir_rascunho_confirm': 'Excluir este rascunho?',
        'acoes_plural': 'Ações',
        'acao_singular': 'Ação',
        'definidas_plural': 'definidas',
        'definida_singular': 'definida',
        'renomear_tooltip': 'Clique para renomear esta task',
        'renomear_hint': '✎ Renomear',
        'cole_link_placeholder': 'Cole o link aqui...',
        'copiado_sucesso': 'Texto copiado com sucesso',
        'inserido_copiado': 'Texto inserido e copiado!',
        'campo_nao_encontrado': 'Campo não encontrado. O texto já foi copiado.',
        'ts_disclaimer': 'Não são necessários os screenshots em casos de conversões criadas/verificadas pelo Tag Support',
        'incluir_mesmo_assim': 'Incluir mesmo assim',
        'ajuda_scenarios': 'Como usar os Cenários?',
        'ajuda_scenarios_desc': 'Os cenários preenchem automaticamente vários campos da nota. Clique em um chip para aplicar. Você pode combinar vários cenários (ex: Instalação GTM + WhatsApp).',
        'ts_output_disclaimer': 'Tag criada/verificada pelo Tag Support, assim como a nota adicionada automáticamente ao caso indica. Não incluo os screenshots, de acordo com orientação do Win Criteria.',

        'caso_portugal': 'Caso de Portugal?',
        'consentiu_gravacao': '⏺️ Anunciante consentiu com a gravação?',
        'sim': 'Sim',
        'nao': 'Não',
        'pronto_comecar': 'Pronto para começar?',
        'selecione_status_ajuda': 'Selecione um status e substatus para<br>começar a sua nota técnica.',
        
        // Labels dos campos (Com Emojis conforme solicitado)
        'speakeasy_id': '🆔 Speakeasy ID:',
        'on_call': '📞 On Call signaled on time?',
        'tasks_solicitadas': '🎯 Task(s) solicitada(s):',
        'passos_executados': '👣 O que foi feito:',
        'resultado': '🏆 Resultado:',
        'duvidas': '❓ Dúvidas do anunciante:',
        'problemas': '⚠️ Problema inicial:',
        'resolucoes': '✅ Resoluções/Explicações:',
        'gtm_ga4_verificado': '🛡️ GTM/GA4 Verificado:',
        'tasks_implementadas_call': '🛠️ Tasks implementadas na call:',
        'proximos_passos': '🚀 Próximos passos (Acompanhamento):',
        'consideracoes': '💡 Considerações adicionais:',
        'contexto_call': '💬 Contexto/O que foi feito:',
        'impedimento_cliente': '🚧 Impedimento / Próximo passo (Anunciante):',
        'minha_acao': '👨‍💻 Minha Ação:',
        'dia': '📅 Dia do Follow-up (se aplicável):',
        'screenshots': '📸 Screenshots:',
        'comentarios': '💬 OnCall Comments:',
        'motivo_reagendamento': '💬 OnCall Comments:',
        'data_reagendamento': '📅 Data do reagendamento:',
        'multiple_cids': '📂 Multiple CIDs:',
        'reason_comments': '📌 Reason/Comments:',
        'tags_implemented': '🛠️ Tag Implemented:',
        'screenshots_list': '📸 Screenshots:',
        'label_substatus': '📋 Substatus:',
        'evidencias_contato': 'Evidências de Contato',
        'ligacao_1': 'Ligação 1',
        'ligacao_2': 'Ligação 2',
        'mensagem_am': 'Mensagem para AM',
        'tentativa_ligacao': '📞 Tentativa de ligação:'
    },
    'es': {
        'idioma': 'Idioma:',
        'fluxo': 'Flujo:',
        'status_principal': 'Estado Principal:',
        'select_status': 'Seleccione',
        'substatus': 'Subestado:',
        'select_substatus': 'Seleccione el Estado',
        'cenarios_comuns': 'Escenarios Comunes',
        'selecione_tasks': 'Seleccionar Tareas',
        'preencha_detalhes': 'Rellene los Detalles',
        'copiar': 'Copiar',
        'preencher': 'Rellenar',
        'limpar': 'Limpiar',
        'preencher_email_automaticamente': '¿Rellenar correo automáticamente?',
        'gostaria_de_adicionar_uma_task': 'Me gustaría agregar una tarea',
        'rascunhos_salvos': 'Borradores Guardados',
        'nenhum_rascunho': 'No hay borradores guardados',
        'guardar': 'Guardar',
        'acesso_rapido': 'Acceso Rápido',
        'buscar_catalogo': 'Buscar en el catálogo...',
        'selecione_tarefas': 'Seleccione tareas para ver los campos.',
        'utilizou_tag_support': '¿Utilizó Tag Support para crear/verificar?',
        'motivo_ts': '¿Cuál fue el motivo?',
        'lembre_preencher_form': '¡Recuerde completar el Formulario!',
        'link_aqui': 'Enlace aquí',
        'tag_support_output_label': '¿Utilizó Tag Support?',
        'motivo_output_label': 'Motivo:',
        'auto_busca': '✨ Búsqueda Automática',
        'utilize_marcadores': 'Utiliza viñetas para detallar...',
        'descreva_consideracoes': 'Describe las consideraciones...',
        'remover': 'Eliminar',
        'remover_campo_confirm': '¿Eliminar el campo "{campo}"? El texto ingresado se perderá.',
        'meus_rascunhos': 'Mis Borradores',
        'confirmar_guardar_rascunho': '¿Desea guardar el borrador actual y limpiar los campos?',
        'rascunho_salvo_sucesso': '¡Borrador guardado con éxito!',
        'erro_ler_dados': 'Error: No fue posible leer los datos.',
        'erro_ao_salvar': 'Error al guardar.',
        'cliente_sem_nome': 'Cliente Sin Nombre',
        'sem_status': 'Sin Estado',
        'retomar_caso': 'Retomar Caso',
        'descartar': 'Descartar',
        'retomar_rascunho_confirm': '¿Retomar este borrador? El formulario actual será reemplazado.',
        'rascunho_carregado': 'Borrador cargado.',
        'excluir_rascunho_confirm': '¿Eliminar este borrador?',
        'acoes_plural': 'Acciones',
        'acao_singular': 'Acción',
        'definidas_plural': 'definidas',
        'definida_singular': 'definida',
        'renomear_tooltip': 'Haz clic para renombrar esta tarea',
        'renomear_hint': '✎ Renombrar',
        'cole_link_placeholder': 'Pega el enlace aquí...',
        'copiado_sucesso': 'Texto copiado con éxito',
        'inserido_copiado': '¡Texto insertado y copiado!',
        'campo_nao_encontrado': 'Campo no encontrado. El texto ya ha sido copiado.',
        'ts_disclaimer': 'No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support',
        'incluir_mesmo_assim': 'Incluir de todos modos',
        'ajuda_scenarios': '¿Cómo usar los Escenarios?',
        'ajuda_scenarios_desc': 'Los escenarios completan automáticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalación GTM + WhatsApp).',
        'ts_output_disclaimer': 'Etiqueta creada/verificada por Tag Support, como indica la nota añadida automáticamente al caso. No incluyo las capturas de pantalla, según la guía de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)',

        'caso_portugal': '¿Caso de Portugal?',
        'consentiu_gravacao': '⏺️ ¿El anunciante consintió la grabación?',
        'sim': 'Sí',
        'nao': 'No',
        'pronto_comecar': '¿Listo para empezar?',
        'selecione_status_ajuda': 'Seleccione un estado y subestado para<br>comenzar su nota técnica.',
        
        // Labels dos campos
        'speakeasy_id': '🆔 Speakeasy ID:',
        'on_call': '📞 On Call signaled on time?',
        'tasks_solicitadas': '🎯 Tarea(s) solicitada(s):',
        'passos_executados': '👣 Qué se hizo:',
        'resultado': '🏆 Resultado:',
        'duvidas': '❓ Dudas del anunciante:',
        'problemas': '⚠️ Problema inicial:',
        'resolucoes': '✅ Resoluciones/Explicaciones:',
        'gtm_ga4_verificado': '🛡️ GTM/GA4 Verificado:',
        'tasks_implementadas_call': '🛠️ Tareas implementadas en la call:',
        'proximos_passos': '🚀 Próximos pasos:',
        'consideracoes': '💡 Consideraciones adicionales:',
        'contexto_call': '💬 Contexto/Qué se hizo:',
        'impedimento_cliente': '🚧 Impedimento / Próximo paso (Anunciante):',
        'minha_acao': '👨‍💻 Mi Acción:',
        'dia': '📅 Día de Follow-up (si aplica):',
        'screenshots': '📸 Screenshots:',
        'comentarios': '💬 OnCall Comments:',
        'motivo_reagendamento': '💬 OnCall Comments:',
        'data_reagendamento': '📅 Fecha de reprogramación:',
        'multiple_cids': '📂 Multiple CIDs:',
        'reason_comments': '📌 Reason/Comments:',
        'tags_implemented': '🛠️ Tag Implemented:',
        'screenshots_list': '📸 Screenshots:',
        'label_substatus': '📋 Substatus:',
        'evidencias_contato': 'Evidencias de Contacto',
        'ligacao_1': 'Llamada 1',
        'ligacao_2': 'Llamada 2',
        'mensagem_am': 'Mensaje para AM',
        'tentativa_ligacao': '📞 Intento de llamada:'
    }
};

export const TASKS_DB = {
   'gtm_installation': {
        name: 'GTM Installation',
        popular: true,
        screenshots: { implementation: ['GTM Instalado', 'Vinculador de conversões'], education: [] }
    },
    'ads_conversion_tracking': {
        name: 'Ads Conversion Tracking',
        popular: true,
        screenshots: {
            implementation: ['Tag criada', 'Teste GTM', 'Teste Ads', 'Versão Publicada', 'Status Ads'],
            education: ['Screenshot for TAG assistant of tag working:', 'Screenshot of conversion tracking status in Google Ads:']
        }
    },
    'ads_enhanced_conversions': {
        name: 'Ads Enhanced Conversions (ECW4)',
        popular: true,
        screenshots: {
            implementation: ['Termos aceitos no Ads', 'Tag implementada', 'Teste GTM', 'Teste Ads', 'Versão Publicada', 'Painel do Ads (após 7 dias)'],
            education: ['Termos aceitos no Ads', 'Tag implementada', 'Teste GTM', 'Teste Ads', 'Versão Publicada', 'Painel do Ads (após 7 dias)']
        }
    },
    'ga4_event_tracking': {
        name: 'Analytics Event Tracking (GA4)',
        popular: true,
        screenshots: {
            implementation: ['Tag do evento GA4 implementado no GTM', 'Teste GTM (tagassistant.google.com)', 'Teste GA4 (DebugView - tagassistant.google.com)', 'Versão publicada no GTM', '(Se houver parâmetros) Dimensões customizadas criadas no GA4', 'Evento marcado como principal no GA4', 'GA4 e Google Ads vinculados corretamente', 'Evento principal GA4 importado no Google Ads (como secundário)', 'Métricas app & web ativadas no Google Ads', '(Opcional) Teste no Relatório do Tempo Real (GA4)'],
            education: ['Tag do evento GA4 implementado no GTM', 'Teste GTM (tagassistant.google.com)', 'Teste GA4 (DebugView - tagassistant.google.com)', 'Versão publicada no GTM', '(Se houver parâmetros) Dimensões customizadas criadas no GA4', 'Evento marcado como principal no GA4', 'GA4 e Google Ads vinculados corretamente', 'Evento principal GA4 importado no Google Ads (como secundário)', 'Métricas app & web ativadas no Google Ads', '(Opcional) Teste no Relatório do Tempo Real (GA4)']
        }
    },
    'upd_for_ga4': {
        name: 'UPD for GA4 (User-Provided Data)',
        popular: true,
        screenshots: {
            implementation: ['Validação: Conta GA4 (somente fluxo web, não é setor de saúde)', '"Coleta de dados fornecidos pelo usuário" habilitado no GA4 (Admin > Coleta de Dados)', 'Confirmação de coleta de dados (UI)', 'Tag do evento GA4 otimizado (UPD) implementado no GTM', 'Teste GTM (tagassistant - parâmetro \'em\' sem erro)', 'Teste GA4 (DebugView - tagassistant)', 'Versão publicada no GTM', '(Treinamento) Evento principal importado no Google Ads como secundário'],
            education: ['Validação: Conta GA4 (somente fluxo web, não é setor de saúde)', '"Coleta de dados fornecidos pelo usuário" habilitado no GA4 (Admin > Coleta de Dados)', 'Confirmação de coleta de dados (UI)', 'Tag do evento GA4 otimizado (UPD) implementado no GTM', 'Teste GTM (tagassistant - parâmetro \'em\' sem erro)', 'Teste GA4 (DebugView - tagassistant)', 'Versão publicada no GTM', '(Treinamento) Evento principal importado no Google Ads como secundário'],
        }
    },
    'ads_website_call_conversion': {
        name: 'Google Ads Website Call Conversion',
        screenshots: {
            implementation: [
                'Tag implementado no GTM',
                'Versão publicada no GTM',
                'Teste do disparo da etiqueta de configuração no tag assistant em mais de uma página, mostrando ID e rótulo',
                'Teste usando o #google-wcc-debug',
                'Mudança do status da conversão no Google Ads [Aguardar alguns minutos]'
            ],
            education: []
        }
    },
    'ads_remarketing': {
        name: 'Ads Remarketing',
        screenshots: {
            implementation: [
                'Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)',
                'Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads',
                'Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data.'
            ],
            education: [
                'Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)',
                'Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads',
                'Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data.'
            ]
        }
    },
    'ads_dynamic_remarketing': {
        name: 'Ads Dynamic Remarketing',
        screenshots: {
            implementation: [
                'Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.',
                'Business vertical chosen in Google Ads.',
                'Dynamic Remarketing enabled on Merchant center for retail.',
                'Implementation of Dynamic Remarketing Tags on the website/GTM.',
                'Validating Dynamic Remarketing Tags using Tag Assistant.',
                'Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.',
                'Dynamic Remarketing audiences populating on Google Ads'
            ],
            education: [
                'Validating Dynamic Remarketing Tags using Tag Assistant.',
                'Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.',
                'Dynamic Remarketing audiences populating on Google Ads'
            ]
        }
    },
    'ga4_setup': {
        name: 'Analytics Set Up (GA4)',
        screenshots: {
            implementation: [
                'Implementation of GA4 tag on the Website/GTM',
                'Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.',
                'GA4 and Google Ads Linked.',
                'GA4 web metrics enabled'
            ],
            education: [
                'Implementation of GA4 tag on the Website/GTM',
                'Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.',
                'GA4 and Google Ads Linked.',
                'GA4 web metrics enabled'
            ]
        }
    },
    'ga4_standard_remarketing': {
        name: 'GA4 Standard Remarketing',
        screenshots: {
            implementation: [
                'Google signals in GA4 enabled.',
                'User data acknowledgement in GA4 checked.',
                'GA4 linked to the correct Google Ads Account',
                'Custom Audience(if requested) set up.',
                'GA4 audience lists imported to Google Ads populating data'
            ],
            education: [
                'Google signals in GA4 enabled.',
                'User data acknowledgement in GA4 checked.',
                'GA4 linked to the correct Google Ads Account',
                'Custom Audience(if requested) set up.',
                'GA4 audience lists imported to Google Ads populating data'
            ]
        }
    },
    'ga4_ecommerce_tracking': {
        name: 'Analytics eCommerce Tracking (GA4)',
        screenshots: {
            implementation: [
                'eCommerce Tag set up using gTag or GTM.',
                'Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.',
                'Monetization reports in GA4 recording purchases.',
                'Purchase conversion imported to the right Google Ads account.',
                'Ensuring GA4 web metrics are enabled.'
            ],
            education: [
                'eCommerce Tag set up using gTag or GTM.',
                'Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.',
                'Monetization reports in GA4 recording purchases.',
                'Purchase conversion imported to the right Google Ads account.',
                'Ensuring GA4 web metrics are enabled.'
            ]
        }
    },
    'ga4_cross_domain_tracking': {
        name: 'Analytics Cross-domain Tracking (GA4)',
        screenshots: {
            implementation: [
                'Tag Assistant to reflect all the domains are tagged with the same GA4.',
                'Domains added for cross-domain configuration in GA4 UI.',
                'Adding domains into Unwanted Referrals.',
                'Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.',
                'Validating the _ga cookie values are same on both the domains from the application tab in the developer tools.'
            ],
            education: [
                'Tag Assistant to reflect all the domains are tagged with the same GA4.',
                'Domains added for cross-domain configuration in GA4 UI.',
                'Adding domains into Unwanted Referrals.',
                'Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.',
                'Validating the _ga cookie values are same on both the domains from the application tab in the developer tools.'
            ]
        }
    },
    'fix_sitewide_tagging': {
        name: 'FIX SITEWIDE TAGGING (OGT & CT)',
        screenshots: {
            implementation: [
                '1. OGT (gTag/GTM com tag de vinculador de conversão) adicionado em todas as páginas',
                '2. A codificação automática (auto tagging) está habilitada no Google Ads (Admin > Config. da Conta)',
                '3. [Se for GTM] O vinculador de conversão está presente e o acionador definido para disparar em "Todas as Páginas".',
                '4. O gclid está sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?',
                '5. O gclid foi passado para a página de conversão?'
            ],
            education: [
                 '1. OGT (gTag/GTM com tag de vinculador de conversão) adicionado em todas as páginas',
                '2. A codificação automática (auto tagging) está habilitada no Google Ads (Admin > Config. da Conta)',
                '3. [Se for GTM] O vinculador de conversão está presente e o acionador definido para disparar em "Todas as Páginas".',
                '4. O gclid está sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?',
                '5. O gclid foi passado para a página de conversão?'
            ]
        }
    }
};

// ==================================================================
//        TRADUÇÃO DOS RÓTULOS DE SCREENSHOT (TASKS_DB → ES)
// ==================================================================
// Mapa por frase em vez de um `screenshots_es` por task: os mesmos rótulos
// ("Teste GTM", "Versão Publicada", "Tag implementada"...) se repetem em
// várias das 13 tasks, então duplicar arrays inteiros multiplicaria o
// mesmo texto e abriria espaço pra divergência silenciosa entre cópias.
//
// Qualquer rótulo ausente daqui cai no texto original (getTaskScreenshots
// abaixo) — é o que acontece de propósito com os rótulos que JÁ estão em
// inglês no TASKS_DB (Remarketing, Dynamic Remarketing, GA4 Setup,
// eCommerce, Cross-domain): eles seguem em inglês pro agente ES, exatamente
// como já seguem pro agente PT hoje. Traduzir só metade deixaria a lista
// pior.
const SCREENSHOT_LABEL_ES = {
    // Grafia idêntica nos dois idiomas — mapeado explicitamente pra deixar
    // claro que foi conferido, e não esquecido.
    'GTM Instalado': 'GTM Instalado',
    'Vinculador de conversões': 'Vinculador de conversiones',
    'Tag criada': 'Etiqueta creada',
    'Teste GTM': 'Prueba GTM',
    'Teste Ads': 'Prueba Ads',
    'Versão Publicada': 'Versión Publicada',
    'Status Ads': 'Estado Ads',
    'Termos aceitos no Ads': 'Términos aceptados en Ads',
    'Tag implementada': 'Etiqueta implementada',
    'Painel do Ads (após 7 dias)': 'Panel de Ads (después de 7 días)',
    'Tag do evento GA4 implementado no GTM': 'Etiqueta del evento GA4 implementada en GTM',
    'Teste GTM (tagassistant.google.com)': 'Prueba GTM (tagassistant.google.com)',
    'Teste GA4 (DebugView - tagassistant.google.com)': 'Prueba GA4 (DebugView - tagassistant.google.com)',
    'Versão publicada no GTM': 'Versión publicada en GTM',
    '(Se houver parâmetros) Dimensões customizadas criadas no GA4': '(Si hay parámetros) Dimensiones personalizadas creadas en GA4',
    'Evento marcado como principal no GA4': 'Evento marcado como principal en GA4',
    'GA4 e Google Ads vinculados corretamente': 'GA4 y Google Ads vinculados correctamente',
    'Evento principal GA4 importado no Google Ads (como secundário)': 'Evento principal de GA4 importado en Google Ads (como secundario)',
    'Métricas app & web ativadas no Google Ads': 'Métricas app y web activadas en Google Ads',
    '(Opcional) Teste no Relatório do Tempo Real (GA4)': '(Opcional) Prueba en el Informe de Tiempo Real (GA4)',
    'Validação: Conta GA4 (somente fluxo web, não é setor de saúde)': 'Validación: Cuenta GA4 (solo flujo web, no es sector salud)',
    '"Coleta de dados fornecidos pelo usuário" habilitado no GA4 (Admin > Coleta de Dados)': '"Recopilación de datos proporcionados por el usuario" habilitada en GA4 (Administrador > Recopilación de Datos)',
    'Confirmação de coleta de dados (UI)': 'Confirmación de recopilación de datos (UI)',
    'Tag do evento GA4 otimizado (UPD) implementado no GTM': 'Etiqueta del evento GA4 optimizado (UPD) implementada en GTM',
    "Teste GTM (tagassistant - parâmetro 'em' sem erro)": "Prueba GTM (tagassistant - parámetro 'em' sin error)",
    'Teste GA4 (DebugView - tagassistant)': 'Prueba GA4 (DebugView - tagassistant)',
    '(Treinamento) Evento principal importado no Google Ads como secundário': '(Capacitación) Evento principal importado en Google Ads como secundario',
    'Tag implementado no GTM': 'Etiqueta implementada en GTM',
    'Teste do disparo da etiqueta de configuração no tag assistant em mais de uma página, mostrando ID e rótulo': 'Prueba del disparo de la etiqueta de configuración en tag assistant en más de una página, mostrando ID y etiqueta',
    'Teste usando o #google-wcc-debug': 'Prueba usando #google-wcc-debug',
    'Mudança do status da conversão no Google Ads [Aguardar alguns minutos]': 'Cambio del estado de la conversión en Google Ads [Esperar algunos minutos]',
    '1. OGT (gTag/GTM com tag de vinculador de conversão) adicionado em todas as páginas': '1. OGT (gTag/GTM con etiqueta de vinculador de conversión) añadido en todas las páginas',
    '2. A codificação automática (auto tagging) está habilitada no Google Ads (Admin > Config. da Conta)': '2. El etiquetado automático (auto tagging) está habilitado en Google Ads (Administrador > Config. de la Cuenta)',
    '3. [Se for GTM] O vinculador de conversão está presente e o acionador definido para disparar em "Todas as Páginas".': '3. [Si es GTM] El vinculador de conversión está presente y el activador definido para dispararse en "Todas las Páginas".',
    '4. O gclid está sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?': '4. ¿El gclid se mantiene sin redirecciones y se almacena en la cookie _gcl_aw en la landing page?',
    '5. O gclid foi passado para a página de conversão?': '5. ¿El gclid fue pasado a la página de conversión?',
};

// Rótulos de screenshot de uma task no idioma ativo (ver mapa acima).
export function getTaskScreenshots(task, mode, lang) {
    const labels = task?.screenshots?.[mode] || [];
    if (lang !== 'es') return labels;
    return labels.map(l => SCREENSHOT_LABEL_ES[l] || l);
}

// Prefixo de campo do template no idioma ativo (fieldPrefixes_es sobrescreve
// fieldPrefixes quando existe).
export function getFieldPrefix(templateDef, fieldKey, lang) {
    if (lang === 'es' && templateDef?.fieldPrefixes_es?.[fieldKey]) {
        return templateDef.fieldPrefixes_es[fieldKey];
    }
    return templateDef?.fieldPrefixes?.[fieldKey] || "";
}

// Campos de um cenário rápido no idioma ativo. O espanhol vive num mapa
// próprio (SCENARIO_ES, no fim deste arquivo) em vez de um bloco `es`
// dentro de cada snippet: mantém scenarioSnippets — a fonte da verdade
// operacional, cheia de comentários de decisão do time — intocada, e deixa
// o espanhol num único bloco revisável de uma vez por um falante nativo.
// Só os campos de texto são sobrescritos; metadados (type/substatus/
// linkedTask) continuam vindo da definição base, sem duplicação.
export function getScenarioFields(snippet, lang, scenarioId) {
    if (lang !== 'es') return snippet;
    const overrides = SCENARIO_ES[scenarioId];
    if (!overrides) return snippet;
    return { ...snippet, ...overrides };
}

// Campos presentes em quase todo template (17 dos 18) mas de baixo valor por
// padrão — em vez de aparecer sempre pra todo mundo, ficam escondidos até o
// agente clicar pra adicionar (buildDynamicForm em core/form-builder.js).
// Não é por-template de propósito: são universais o bastante pra um único
// corte servir em qualquer substatus que os contenha.
export const optionalFields = ['GTM_GA4_VERIFICADO', 'MULTIPLE_CIDS'];

// Campo obrigatório em todo template (presente nos 18) — o motivo/narrativa
// do caso. Validado em handleGenerate() (notes-assistant.js) e marcado
// visualmente em core/form-builder.js.
export const requiredFields = ['REASON_COMMENTS'];

// requiredFields/optionalFields acima são a regra padrão (mesma pra todo
// template). Alguns campos precisam de uma regra sensível ao template atual
// — hoje só GTM_GA4_VERIFICADO, que vira obrigatório quando o template exige
// tarefa implementada (requiresTasks), já que não faz sentido pular a
// verificação de GTM/GA4 quando algo foi de fato implementado. Um template
// também pode declarar `extraOptionalFields` pra esconder por padrão um
// campo que só faz sentido pra ele (ver SO_Implementation_Only).
export function getEffectiveRequiredFields(templateData) {
    const fields = [...requiredFields];
    if (templateData?.requiresTasks) fields.push('GTM_GA4_VERIFICADO');
    return fields;
}
export function getEffectiveOptionalFields(templateData) {
    const base = [...optionalFields, ...(templateData?.extraOptionalFields || [])];
    const required = getEffectiveRequiredFields(templateData);
    return base.filter(f => !required.includes(f));
}

// ==================================================================
//               NOVA ESTRUTURA: SUBSTATUS_TEMPLATES
// ==================================================================
export const SUBSTATUS_TEMPLATES = {
    // --- AS (Assigned) ---
    'AS_Reschedule_1': {
        status: 'AS', 
        name: 'AS - Reschedule 1', 
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'MOTIVO_REAGENDAMENTO', 'DATA_REAGENDAMENTO', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS'],
        fieldPrefixes: {
            'REASON_COMMENTS': 'Caso Reagendado.'
        },
        fieldPrefixes_es: {
            'REASON_COMMENTS': 'Caso Reprogramado.'
        }
    },
    'AS_Acceptable_Reschedule': { 
        status: 'AS', 
        name: 'AS - Acceptable Reschedule', 
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'MOTIVO_REAGENDAMENTO', 'DATA_REAGENDAMENTO', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS'],
        fieldPrefixes: {
            'REASON_COMMENTS': 'Reagendamento aceitável.'
        },
        fieldPrefixes_es: {
            'REASON_COMMENTS': 'Reprogramación aceptable.'
        }
    },

    // --- NI (Need Info) ---
    'NI_Awaiting_Inputs': { 
        status: 'NI', 
        name: 'NI - Awaiting Inputs',
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'CONTEXTO_CALL', 'TASKS_SOLICITADAS', 'IMPEDIMENTO_CLIENTE', 'MINHA_ACAO', 'CONSIDERACOES', 'DIA', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS']
    },
    'NI_In_Consult': { 
        status: 'NI', 
        name: 'NI - In Consult', 
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'CONTEXTO_CALL', 'TASKS_SOLICITADAS', 'IMPEDIMENTO_CLIENTE', 'MINHA_ACAO', 'CONSIDERACOES', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS']
    },
    'NI_Awaiting_Validation': {
        status: 'NI', 
        name: 'NI - Awaiting Validation',
        requiresTasks: true,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'TASKS_SOLICITADAS', 'TASKS_IMPLEMENTADAS_CALL', 'PASSOS_EXECUTADOS', 'PROXIMOS_PASSOS', 'CONSIDERACOES', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS'],
        fieldPrefixes: {
            'REASON_COMMENTS': 'Aguardando Validações no Google Ads.'
        },
        fieldPrefixes_es: {
            'REASON_COMMENTS': 'Esperando Validaciones en Google Ads.'
        }
    },
    'NI_Attempted_Contact': {
        status: 'NI', 
        name: 'NI - Attempted Contact', 
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'CONTEXTO_CALL', 'TASKS_SOLICITADAS', 'IMPEDIMENTO_CLIENTE', 'MINHA_ACAO', 'CONSIDERACOES', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS']
    },

    // --- IN (Inactive) ---
    'IN_Infeasible': {
        status: 'IN', 
        name: 'IN - Infeasible', 
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'COMENTARIOS', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS']
    },
    'IN_Not_Reachable': {
        status: 'IN',
        name: 'IN - Not Reachable',
        requiresTasks: false,
        // TENTATIVA_LIGACAO: input simples e dedicado pro link de evidência
        // da tentativa de ligação (pedido direto, ver histórico) - SCREENSHOTS_LIST
        // não serve pra isso, é a lista de screenshots gerada a partir de
        // tasks selecionadas no catálogo (TASKS_DB), não um campo livre.
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'COMENTARIOS', 'TENTATIVA_LIGACAO', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS']
    },
    'IN_Not_Interested': {
        status: 'IN', 
        name: 'IN - Not Interested', 
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'COMENTARIOS', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS']
    },
    'IN_Not_Ready': {
        status: 'IN', 
        name: 'IN - Not Ready', 
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'COMENTARIOS', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS']
    },
    'IN_Out_of_Scope_Rerouted': {
        status: 'IN', 
        name: 'IN - Out of Scope - Rerouted to Internal Team', 
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'COMENTARIOS', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS']
    },
    'IN_Out_of_Scope_Unable_to_Transfer': {
        status: 'IN', 
        name: 'IN - Out of Scope - Unable to Transfer', 
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'COMENTARIOS', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS']
    },
    'IN_Out_of_Scope_Email_to_Seller': {
        status: 'IN', 
        name: 'IN - Out of Scope - Email to Seller', 
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'COMENTARIOS', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS']
    },
    'IN_Troubleshooting_Transferred': {
        status: 'IN', 
        name: 'IN - Troubleshooting [Transferred]', 
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'COMENTARIOS', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS']
    },

    // --- SO (Solution Offered) ---
    'SO_Implementation_Only': {
        status: 'SO',
        name: 'SO - Implementation Only',
        requiresTasks: true,
        // TASKS_SOLICITADAS/TASKS_IMPLEMENTADAS_CALL removidos: redundantes
        // com o que já aparece a partir das tarefas marcadas no catálogo
        // (TAGS_IMPLEMENTED). PROXIMOS_PASSOS só faz sentido quando o caso
        // tem acompanhamento, então fica em extraOptionalFields.
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'PASSOS_EXECUTADOS', 'RESULTADO', 'PROXIMOS_PASSOS', 'CONSIDERACOES', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS'],
        extraOptionalFields: ['PROXIMOS_PASSOS'],
        fieldPrefixes: {
            'REASON_COMMENTS': 'Task implementada com sucesso.'
        },
        fieldPrefixes_es: {
            'REASON_COMMENTS': 'Tarea implementada con éxito.'
        }
    },
    'SO_Education_Only': {
        status: 'SO',
        name: 'SO - Education Only',
        requiresTasks: true,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'DUVIDAS', 'RESOLUCOES', 'PROXIMOS_PASSOS', 'CONSIDERACOES', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS'],
        extraOptionalFields: ['PROXIMOS_PASSOS', 'CONSIDERACOES'],
        fieldPrefixes: {
            'REASON_COMMENTS': 'Consultoria utilizada para tirar dúvidas do anunciante.'
        },
        fieldPrefixes_es: {
            'REASON_COMMENTS': 'Consultoría utilizada para resolver dudas del anunciante.'
        }
    },
    'SO_Troubleshooting_Only': {
        status: 'SO', 
        name: 'SO - Troubleshooting Only',
        requiresTasks: true,
        templateFields: ['SPEAKEASY_ID', 'ON_CALL', 'label_substatus', 'REASON_COMMENTS', 'PROBLEMAS', 'RESOLUCOES', 'PROXIMOS_PASSOS', 'CONSIDERACOES', 'GTM_GA4_VERIFICADO', 'TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'MULTIPLE_CIDS'],
        fieldPrefixes: {
            'REASON_COMMENTS': 'Consultoria utilizada para testar e solucinar problemas da conversão.'
        },
        fieldPrefixes_es: {
            'REASON_COMMENTS': 'Consultoría utilizada para probar y solucionar problemas de la conversión.'
        }
    },
    'DC_Other': {
        status: 'DC',
        name: 'DC - Other',
        requiresTasks: false,
        templateFields: ['SPEAKEASY_ID', 'label_substatus', 'REASON_COMMENTS', 'COMENTARIOS'],
        customFooter: 'Obs.: Sigo as orientações presentes na documentação do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)'
    }
};

export const SUBSTATUS_SHORTCODES = {
    // AS
    'AS_Reschedule_1': 'ts as resched1',
    'AS_Acceptable_Reschedule': 'ts as reschedok',
    // NI
    'NI_Awaiting_Inputs': 'ts ni ai',
    'NI_In_Consult': 'ts ni ic',
    'NI_Awaiting_Validation': 'ts ni av',
    'NI_Attempted_Contact': 'ts ni ac',
    // IN
    'IN_Infeasible': 'ts in inf',
    'IN_Not_Reachable': 'ts in nrch',
    'IN_Not_Interested': 'ts in ni',
    'IN_Not_Ready': 'ts in nrdy',
    'IN_Out_of_Scope_Rerouted': 'ts in oost',
    'IN_Out_of_Scope_Unable_to_Transfer': 'ts in oosu',
    'IN_Out_of_Scope_Email_to_Seller': 'ts in oos seller',
    'IN_Troubleshooting_Transferred': null, 
    // SO
    'SO_Implementation_Only': 'ts so verif',
    'SO_Verified_No_Recent_Conversion': 'ts so verif nrc',
    'SO_Unverified': 'ts so unv',
    'SO_Education_Only': 'ts so Edu',
    'SO_Troubleshooting_Only': 'ts so trbl',
    'DC_Other': null
};

export const textareaListFields = [
    'TASKS_SOLICITADAS', 'PASSOS_EXECUTADOS', 'RESULTADO', 'DUVIDAS','PROBLEMAS', 'RESOLUCOES',
    'TASKS_IMPLEMENTADAS_CALL', 'PROXIMOS_PASSOS', 'CONTEXTO_CALL',
    'IMPEDIMENTO_CLIENTE', 'MINHA_ACAO', 'SCREENSHOTS',
    'MOTIVO_REAGENDAMENTO'
];

export const textareaParagraphFields = ['CONSIDERACOES', 'COMENTARIOS'];

// ==================================================================
//               CENÁRIOS RÁPIDOS (scenarioSnippets)
// ==================================================================
// Reorganizado seguindo specs/workflow/case-notes-status-rules.md (regras
// de status/substatus definidas pelo time). Cada snippet declara em qual(is)
// substatus ele deve aparecer via `substatus: [...]` (chave de
// SUBSTATUS_TEMPLATES, ver acima) - é isso que step-scenarios.js usa pra
// filtrar. Marcações "[PENDENTE]" abaixo são decisões que ficaram em aberto
// na reorganização (ver conversa) e ainda precisam de confirmação.
export const scenarioSnippets = {
    // ==============================================================
    // SO (Solution Offered) - só cenários que fecham/encerram o caso.
    // ==============================================================

    // --- SO_Implementation_Only: implementação de task / criação de algo ---
    'quickfill-gtm-install': {
        type: 'all',
        substatus: ['SO_Implementation_Only'],
        'field-REASON_COMMENTS': "Instalação do GTM finalizada.",
        'field-TASKS_SOLICITADAS': "• Instalação do GTM",
        'field-PASSOS_EXECUTADOS': "• Criamos a conta dentro do GTM\n• Instalamos dentro do CMS/Hospedagem.\n• Criamos o Vinculador de Conversões.",
        'field-RESULTADO': "• Validei a instalação.",
        linkedTask: 'gtm_installation'
    },
    'quickfill-whatsapp': {
        type: 'all',
        substatus: ['SO_Implementation_Only'],
        'field-REASON_COMMENTS': "Instalação do Ads Conversion tracking para Whatsapp finalizada.",
        'field-TASKS_SOLICITADAS': "• Criação de conversão para WHATSAPP",
        'field-PASSOS_EXECUTADOS': "• Fizemos a criação da conversão no Ads.\n• Criamos a Tag no GTM para os botões de WhatsApp.\n• Realizamos os testes e validamos o funcionamento.",
        'field-RESULTADO': "• Task implementada com sucesso. Fecho o caso sem acompanhamento.",
        linkedTask: 'ads_conversion_tracking'
    },
    'quickfill-form': {
        type: 'all',
        substatus: ['SO_Implementation_Only'],
        'field-REASON_COMMENTS': "Instalação do Ads Conversion tracking para Form finalizada.",
        'field-TASKS_SOLICITADAS': "• Criação de conversão para FORMULÁRIO (padrão, não-otimizada).",
        'field-PASSOS_EXECUTADOS': "• Fizemos a criação da conversão no Ads.\n• Criamos a Tag no GTM.\n• Realizamos os testes e validamos o funcionamento.",
        'field-RESULTADO': "• Task implementada com sucesso. Fecho o caso sem acompanhamento.",
        linkedTask: 'ads_conversion_tracking'
    },
    // [PENDENTE] Estes dois descrevem só verificação + fechamento (a
    // implementação em si foi num atendimento anterior) - não batem 100%
    // com nenhuma das 3 definições de SO do PDF (não é implementação nova,
    // não tem dúvida/educação, não tem alteração/troubleshooting). Deixei
    // só em SO_Implementation_Only por ora: cheguei a testar deixar
    // visível também em SO_Troubleshooting_Only, mas os campos que esses
    // dois preenchem (PASSOS_EXECUTADOS/RESULTADO) nem existem no
    // formulário desse substatus (que usa PROBLEMAS/RESOLUCOES) - o chip
    // apareceria lá mas preencheria só o REASON_COMMENTS, quase inútil.
    'quickfill-ecw4-close': {
        type: 'all',
        substatus: ['SO_Implementation_Only'],
        'field-REASON_COMMENTS': "Finalização do acompanhamento de EC.",
        'field-TASKS_SOLICITADAS': "• Acompanhamento da conversão otimizada (ECW4).",
        'field-PASSOS_EXECUTADOS': "• Após o período de acompanhamento, verifiquei o painel do Ads.\n• A conversão está sendo registrada corretamente.",
        'field-RESULTADO': "• Valido o bom funcionamento da conversão otimizada.\n• Assim, fecho o caso.",
        linkedTask: 'ads_enhanced_conversions'
    },
    'quickfill-ga4-event-close': {
        type: 'all',
        substatus: ['SO_Implementation_Only'],
        'field-REASON_COMMENTS': "Finalização do Acompanhamento de GA4.",
        'field-TASKS_SOLICITADAS': "• Acompanhamento de Eventos GA4 após 48h.",
        'field-PASSOS_EXECUTADOS': "• Após o período de 48h de acompanhamento, verifiquei o painel.\n• O evento está sendo registrado corretamente.",
        'field-RESULTADO': "• Valido o bom funcionamento do rastreamento de eventos.\n• Assim, fecho o caso.",
        linkedTask: 'ga4_event_tracking'
    },

    // --- SO_Education_Only: testes/dúvidas tiradas, sem implementação ---
    // Vazio - nenhum cenário existente descrevia esse caso (só dúvidas
    // tiradas, nada implementado/criado). Fica pra você adicionar os
    // cenários comuns que conhece.

    // --- SO_Troubleshooting_Only: testes + alterações + fechamento ---
    // Vazio pelo mesmo motivo acima.

    // ==============================================================
    // NI (Need Info) - aguardando algo pra seguir ou fechar.
    // ==============================================================

    // --- NI_Awaiting_Inputs: pendência do lado do anunciante ---
    'quickfill-ni-inicio-manual': {
        type: 'all',
        substatus: ['NI_Awaiting_Inputs'],
        'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Início 2/6)"
    },
    'quickfill-ni-cms-access': {
        type: 'all',
        substatus: ['NI_Awaiting_Inputs'],
        'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Início 2/6 - Sem Acesso ao CMS)",
        'field-TASKS_SOLICITADAS': "• Instalação do GTM\n• Configuração de Conversões",
        'field-CONTEXTO_CALL': "• Percebi que o(a) anunciante não tinha GTM Instalado.\n• Seguimos com a criação de conta no GTM.\n• Entretanto, a conta de acesso ao painel do site (ex: WordPress) não tinha permissão para instalar plugins ou editar o código.",
        'field-IMPEDIMENTO_CLIENTE': "• Anunciante precisa conseguir acesso de administrador ao painel do site.\n• OU\n• Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.",
        'field-MINHA_ACAO': "• Coloco o caso em 2/6.\n• Assim que o anunciante tiver o acesso ou a instalação for feita, abrirei um caso em BAU para dar continuidade.",
        'field-SCREENSHOTS': "• Print do painel do CMS mostrando a falta de permissão (opcional)."
    },
    // Movido de AS (estava em "quickfill-as-no-access", usando o campo
    // MOTIVO_REAGENDAMENTO que nem existe no template de NI_Awaiting_Inputs)
    // - falta de acesso é uma pendência do anunciante impedindo a
    // implementação, não um reagendamento da consultoria em si. Reescrito
    // pros campos certos do substatus, no mesmo estilo do cenário de CMS
    // acima, mas genérico pra qualquer tipo de acesso.
    'quickfill-ni-lack-of-access': {
        type: 'all',
        substatus: ['NI_Awaiting_Inputs'],
        'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Falta de acessos necessários)",
        'field-CONTEXTO_CALL': "• Durante a call, identificamos que os acessos necessários para prosseguir com a implementação não estavam disponíveis.\n• Orientei o(a) anunciante sobre quais acessos são necessários e como obtê-los.",
        'field-IMPEDIMENTO_CLIENTE': "• Anunciante precisa providenciar os acessos necessários (ex: painel do site, plataforma de anúncios, ou contato com o(a) desenvolvedor(a)) para que a implementação seja concluída.",
        'field-MINHA_ACAO': "• Coloco o caso em 2/6.\n• Assim que o anunciante obtiver os acessos, abrirei um caso em BAU para dar continuidade."
    },

    // --- NI_In_Consult: aguardando retorno do Consult / revisão de Feed ---
    // Vazio - nenhum cenário existente cobria esse fluxo e não tenho
    // contexto operacional suficiente (canal, prazo típico) pra inventar
    // um texto útil sozinho. Fica pra você adicionar.

    // --- NI_Awaiting_Validation: implementação completa, aguardando registro ---
    'quickfill-ni-awaiting-ecw4': {
        type: 'all',
        substatus: ['NI_Awaiting_Validation'],
        'field-REASON_COMMENTS': "Aguardando validação de dados (ECW4 - 7 Dias)",
        'field-TASKS_SOLICITADAS': "• Implementação de Conversões Otimizadas (ECW4)",
        'field-CONTEXTO_CALL': "• Criamos a conversão no Google Ads.\n• Configuramos o disparo das tags via GTM.\n• Adicionamos a tag de UPD (User Provided Data).\n• Testamos juntos e validamos o bom funcionamento.",
        'field-MINHA_ACAO': "• Coloco o caso em status de Awaiting Validation para acompanhamento de 7 dias.",
        linkedTask: 'ads_enhanced_conversions'
    },
    'quickfill-ni-awaiting-ga4': {
        type: 'all',
        substatus: ['NI_Awaiting_Validation'],
        'field-REASON_COMMENTS': "Aguardando validação de dados (GA4 Event - 48h)",
        'field-TASKS_SOLICITADAS': "• Implementação de Eventos GA4",
        'field-CONTEXTO_CALL': "• Criamos o evento no GA4.\n• Configuramos o disparo das tags via GTM.\n• Testamos juntos e validamos o bom funcionamento.",
        'field-MINHA_ACAO': "• Coloco o caso em status de Awaiting Validation para acompanhamento de 48h.",
        linkedTask: 'ga4_event_tracking'
    },

    'quickfill-ni-followup-bau': {
        type: 'bau',
        substatus: ['NI_Awaiting_Inputs'],
        'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Follow-up BAU 2/6)",
        'field-SPEAKEASY_ID': "N/A",
        'field-ON_CALL': "N/A",
        'field-CONTEXTO_CALL': "• No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas não obtive resposta. Envio na sequência o email referente ao dia respectivo.",
        'field-TASKS_SOLICITADAS': "N/A",
        'field-IMPEDIMENTO_CLIENTE': "N/A",
        'field-MINHA_ACAO': "N/A",
        'field-GTM_GA4_VERIFICADO': 'N/A',
        'field-SCREENSHOTS': "• Tentativa 1 -\n• Tentativa 2 -"
    },
    'quickfill-ni-followup-lm': {
        type: 'lm',
        substatus: ['NI_Attempted_Contact'],
        'field-REASON_COMMENTS': "Tentativa de contato sem sucesso (Follow-up LM 2/6)",
        'field-SPEAKEASY_ID': "N/A",
        'field-ON_CALL': "N/A",
        'field-CONTEXTO_CALL': "• No dia {DIA} do 2/6 enviei e-mail de follow-up (caso LM, sem tentativas de ligação), mas não obtive resposta.",
        'field-TASKS_SOLICITADAS': "N/A",
        'field-IMPEDIMENTO_CLIENTE': "N/A",
        'field-MINHA_ACAO': "N/A",
        'field-GTM_GA4_VERIFICADO': 'N/A',
        'field-SCREENSHOTS': "• E-mail de follow-up enviado (LM) -"
    },
    'quickfill-ni-attempted-2day': {
        type: 'bau',
        substatus: ['NI_Attempted_Contact'],
        'field-REASON_COMMENTS': "Attempted Contact (Início 2 Day Rule)",
        'field-CONTEXTO_CALL': "• Fiz a primeira tentativa de ligação, sem sucesso.\n• Enviei uma message no chat para o AM.\n• Aguardei 5 minutos e fiz a segunda tentativa de ligação, novamente sem sucesso.\n• Aguardei mais 5 minutos e agora farei o acompanhamento 2 Day Rule.",
        'field-SCREENSHOTS': "• MSG AM -\n• Tentativa 1 -\n• Tentativa 2 -"
    },

    // ==============================================================
    // IN (Inactive) - não vai dar pra implementar, caso será encerrado.
    // ==============================================================

    // --- IN_Not_Reachable: sem contato/resposta do anunciante ---
    // Os 3 primeiros abaixo são bem parecidos entre si (mesma ideia: sem
    // resposta em nenhuma tentativa, caso inativado) - fica registrado como
    // possível redundância; mantidos separados por ora porque cada um narra
    // um fluxo ligeiramente diferente (NRP explícito / no-show em reunião
    // agendada / fim de acompanhamento 2/6).
    'quickfill-in-nrp-bau': {
        type: 'bau',
        substatus: ['IN_Not_Reachable'],
        'field-REASON_COMMENTS': "NRP (BAU - 3 tentativas)",
        'field-COMENTARIOS': "• Duas ligações seguidas, e e-mail \"Antes dos 10 minutos\" e uma terceira e ultima tentativa de ligação.\n• Não houve resposta às tentativas de ligação ou e-mail, por isso o caso será inativado.",
        'field-SCREENSHOTS': "• Tentativa 1 -\n• Tentativa 2 -\n• Tentativa 3 -",
        'field-GTM_GA4_VERIFICADO': "N/A"
    },
    'quickfill-in-no-show-bau': {
        type: 'bau',
        substatus: ['IN_Not_Reachable'],
        'field-REASON_COMMENTS': "Sem resposta ao 2 Day Rule.",
        'field-ON_CALL': "N/A",
        'field-COMENTARIOS': "• O caso foi gerado e entrei na chamada no horário agendado.\n• O anunciante não compareceu à reunião.\n• Segui o protocolo de espera (BAU): realizei duas tentativas de ligação, sem sucesso.\n• Nenhuma das ligações foi atendida (ex: Caixa Postal).\n• Caso inativado após 2 Day Rule.",
        'field-GTM_GA4_VERIFICADO': "N/A"
    },
    'quickfill-in-2-6-final': {
        type: 'all',
        substatus: ['IN_Not_Reachable'],
        'field-REASON_COMMENTS': "Finalização (2/6)",
        'field-SPEAKEASY_ID': "-",
        'field-ON_CALL': "-",
        'field-COMENTARIOS': "• Dia 9 finalização do 2/6, durante o período do acompanhamento não houve retorno do anunciante, então o caso será encerrado.",
        'field-SCREENSHOTS': "• N/A",
        'field-GTM_GA4_VERIFICADO': "N/A"
    },
    // Movido de DC ("quickfill-dc-lm-no-show") - o texto nunca teve nada a
    // ver com falha de autenticação (o único substatus real de DC no PDF);
    // era sempre "sem resposta às tentativas de contato", que é a definição
    // exata de IN_Not_Reachable. Só removi o enquadramento de "Discard".
    'quickfill-in-not-reachable-no-return': {
        type: 'all',
        substatus: ['IN_Not_Reachable'],
        'field-REASON_COMMENTS': "Inativação por ausência de retorno do anunciante",
        'field-COMENTARIOS': "O(a) anunciante não compareceu à consultoria. Fiz as tentativas de ligação, mas não obtive retorno.\n\nIrei solicitar a inativação do caso, levando em conta a ausência de contato."
    },

    // --- IN_Not_Ready: anunciante não está pronto pra implementação ---
    // Movido de DC ("quickfill-dc-lm-no-access") - falta de acesso pra
    // implementar bate com a definição exata de IN_Not_Ready do PDF ("sem
    // acesso ao site, desenvolvedor indisponível..."), não com DC.
    'quickfill-in-not-ready-lack-of-access': {
        type: 'all',
        substatus: ['IN_Not_Ready'],
        'field-REASON_COMMENTS': "Inativação por falta de acessos (Reagendamento solicitado)",
        'field-COMENTARIOS': "Não conseguimos implementar nada durante a consultoria, já que o(a) anunciante não tinha os acessos necessários.\n\nIrei abrir caso em BAU para o dia solicitado e pedir a inativação do mesmo, levando em conta a falta de acessos e a solicitação de reagendamento."
    },

    // --- IN_Infeasible: inviabilidade técnica (não é problema do Google) ---
    // [NOVO] Rascunho - substatus estava sem nenhum cenário. Revise o texto
    // entre colchetes antes de considerar pronto.
    'quickfill-in-infeasible': {
        type: 'all',
        substatus: ['IN_Infeasible'],
        'field-REASON_COMMENTS': "Inativação por inviabilidade técnica",
        'field-COMENTARIOS': "• Avaliamos a implementação solicitada e identificamos que não é possível realizá-la devido à complexidade técnica/estrutura do site (ex: [descrever a limitação encontrada]).\n• Não se trata de uma limitação do Google, e sim da estrutura atual do site/plataforma do anunciante.\n• Oriento o(a) anunciante sobre as opções disponíveis (ex: alteração da plataforma, apoio de um(a) desenvolvedor(a) especializado(a))."
    },

    // --- IN_Not_Interested: anunciante sem interesse em prosseguir ---
    // [NOVO] Rascunho - mesma observação acima.
    'quickfill-in-not-interested': {
        type: 'all',
        substatus: ['IN_Not_Interested'],
        'field-REASON_COMMENTS': "Inativação por falta de interesse do anunciante",
        'field-COMENTARIOS': "• O(a) anunciante informou que não tem interesse em prosseguir com a consultoria neste momento.\n• [Ou] O contato se limitou a perguntas gerais, sem intenção de realizar a implementação.\n• Não há mais ações pendentes da nossa parte; caso encerrado a pedido do(a) anunciante."
    },

    // --- IN_Out_of_Scope_Rerouted / Unable_to_Transfer / Email_to_Seller ---
    // Vazios - cenários de roteamento interno bem específicos, não tenho
    // contexto operacional (pra qual time, por qual canal) pra inventar algo
    // útil. Fica pra você adicionar.

    // --- IN_Troubleshooting_Transferred: troubleshooting não resolveu, caso transferido ---
    // [NOVO] Rascunho - mesma observação de Infeasible/Not_Interested acima.
    'quickfill-in-troubleshooting-transferred': {
        type: 'all',
        substatus: ['IN_Troubleshooting_Transferred'],
        'field-REASON_COMMENTS': "Inativação - Troubleshooting sem sucesso, caso transferido",
        'field-COMENTARIOS': "• Realizamos os passos de troubleshooting padrão para o problema relatado (ex: [listar testes/verificações feitas]).\n• Os passos não resolveram o problema.\n• Encaminho o caso para o time responsável ([nome do time]) para continuidade."
    },

    // O PDF define um substatus "IN - Other" pra cenários que não se
    // encaixam em nenhum outro, mas isso não existe hoje em
    // SUBSTATUS_TEMPLATES - decidido (2026-08-17) documentar o gap e
    // resolver na futura análise de UX, sem criar o substatus agora. Até
    // lá, este cenário fica sem lugar pra aparecer (substatus: []) em vez
    // de usar um catch-all impreciso.
    'quickfill-in-manual': {
        type: 'all',
        substatus: [],
        'field-REASON_COMMENTS': "Outro (Manual)",
        'field-GTM_GA4_VERIFICADO': "N/A"
    },

    // ==============================================================
    // AS (Assigned) - caso atribuído / precisa reagendar a consultoria.
    // ==============================================================

    // --- AS_Reschedule_1: reagendamento padrão ---
    'quickfill-as-no-show': {
        type: 'all',
        substatus: ['AS_Reschedule_1'],
        'field-MOTIVO_REAGENDAMENTO': '• Precisamos reagendar o caso, já que o anunciante não compareceu na meet, porém respondeu o e-mail pedindo o reagendamento'
    },
    'quickfill-as-insufficient-time': {
        type: 'all',
        substatus: ['AS_Reschedule_1'],
        'field-MOTIVO_REAGENDAMENTO': '• Precisamos reagendar o caso, já que o tempo foi insuficiente para terminar as Tasks\n• Implementamos [descrever o que foi feito]'
    },
    'quickfill-as-no-access': {
        type: 'all',
        substatus: ['AS_Reschedule_1'],
        'field-MOTIVO_REAGENDAMENTO': '• Precisamos reagendar o caso, já que o(a) anunciante não tinha acesso ao site, ao código ou ao CMS necessários para a instalação do Google Tag Manager'
    },

    // --- AS_Acceptable_Reschedule: fator maior (sem internet/luz, saúde) ---
    // [NOVO] Rascunho - substatus estava sem nenhum cenário. PDF dá exemplos
    // concretos o bastante pra eu me arriscar a escrever isso sozinho.
    'quickfill-as-force-majeure': {
        type: 'all',
        substatus: ['AS_Acceptable_Reschedule'],
        'field-MOTIVO_REAGENDAMENTO': '• Reagendamento por fator maior fora do controle do anunciante (ex: falta de internet/energia, motivo de saúde) - dentro dos critérios de reagendamento aceitável.\n• [Detalhar o fator específico relatado pelo anunciante]'
    },

    // ==============================================================
    // DC (Discard) - cenário atípico, encerramento imediato.
    // ==============================================================
    // O único substatus de DC no PDF é "Authentication Failed", que não
    // existe em SUBSTATUS_TEMPLATES hoje (gap documentado em
    // specs/workflow/case-notes-status-rules.md, resolução adiada pra
    // futura análise de UX). O cenário abaixo não bate com Authentication
    // Failed nem com nenhum substatus de IN - decidido (2026-08-17) colocar
    // em DC_Other mesmo assim.
    'quickfill-dc-lm-incomplete': {
        type: 'all',
        substatus: ['DC_Other'],
        'field-REASON_COMMENTS': "Nada foi implementado durante a consultoria (tempo insuficiente, limite de reagendamento excedido)",
        'field-COMENTARIOS': "Não conseguimos implementar nada durante a consultoria, pois não houve tempo o suficiente para terminar a task relacionada e o limite de reagendamentos já foi atingido.\n\nIrei abrir caso em BAU para o dia solicitado e pedir a inativação do mesmo."
    },
};

// ==================================================================
//        CENÁRIOS RÁPIDOS EM ESPANHOL (ver getScenarioFields)
// ==================================================================
// Espelho de scenarioSnippets acima, só com os campos de TEXTO. As chaves
// batem 1:1 com as de lá; um cenário sem entrada aqui cai no português
// (fallback do resolver), então adicionar um cenário novo em PT nunca
// quebra o ES — só fica sem tradução até alguém preencher aqui.
// Placeholders como {DIA} e os marcadores entre colchetes ([descrever...])
// são preservados: o resto do código depende deles.
const SCENARIO_ES = {
    // --- SO_Implementation_Only ---
    'quickfill-gtm-install': {
        'field-REASON_COMMENTS': "Instalación de GTM finalizada.",
        'field-TASKS_SOLICITADAS': "• Instalación de GTM",
        'field-PASSOS_EXECUTADOS': "• Creamos la cuenta dentro de GTM\n• Lo instalamos dentro del CMS/Hosting.\n• Creamos el Vinculador de Conversiones.",
        'field-RESULTADO': "• Validé la instalación."
    },
    'quickfill-whatsapp': {
        'field-REASON_COMMENTS': "Instalación del Ads Conversion Tracking para WhatsApp finalizada.",
        'field-TASKS_SOLICITADAS': "• Creación de conversión para WHATSAPP",
        'field-PASSOS_EXECUTADOS': "• Realizamos la creación de la conversión en Ads.\n• Creamos la etiqueta en GTM para los botones de WhatsApp.\n• Realizamos las pruebas y validamos el funcionamiento.",
        'field-RESULTADO': "• Tarea implementada con éxito. Cierro el caso sin seguimiento."
    },
    'quickfill-form': {
        'field-REASON_COMMENTS': "Instalación del Ads Conversion Tracking para Formulario finalizada.",
        'field-TASKS_SOLICITADAS': "• Creación de conversión para FORMULARIO (estándar, no optimizada).",
        'field-PASSOS_EXECUTADOS': "• Realizamos la creación de la conversión en Ads.\n• Creamos la etiqueta en GTM.\n• Realizamos las pruebas y validamos el funcionamiento.",
        'field-RESULTADO': "• Tarea implementada con éxito. Cierro el caso sin seguimiento."
    },
    'quickfill-ecw4-close': {
        'field-REASON_COMMENTS': "Finalización del seguimiento de EC.",
        'field-TASKS_SOLICITADAS': "• Seguimiento de la conversión optimizada (ECW4).",
        'field-PASSOS_EXECUTADOS': "• Después del período de seguimiento, verifiqué el panel de Ads.\n• La conversión se está registrando correctamente.",
        'field-RESULTADO': "• Valido el buen funcionamiento de la conversión optimizada.\n• Así, cierro el caso."
    },
    'quickfill-ga4-event-close': {
        'field-REASON_COMMENTS': "Finalización del seguimiento de GA4.",
        'field-TASKS_SOLICITADAS': "• Seguimiento de Eventos GA4 después de 48h.",
        'field-PASSOS_EXECUTADOS': "• Después del período de 48h de seguimiento, verifiqué el panel.\n• El evento se está registrando correctamente.",
        'field-RESULTADO': "• Valido el buen funcionamiento del rastreo de eventos.\n• Así, cierro el caso."
    },

    // --- NI_Awaiting_Inputs ---
    'quickfill-ni-inicio-manual': {
        'field-REASON_COMMENTS': "Esperando información por parte del anunciante (Inicio 2/6)"
    },
    'quickfill-ni-cms-access': {
        'field-REASON_COMMENTS': "Esperando información por parte del anunciante (Inicio 2/6 - Sin Acceso al CMS)",
        'field-TASKS_SOLICITADAS': "• Instalación de GTM\n• Configuración de Conversiones",
        'field-CONTEXTO_CALL': "• Noté que el/la anunciante no tenía GTM instalado.\n• Seguimos con la creación de la cuenta en GTM.\n• Sin embargo, la cuenta de acceso al panel del sitio (ej: WordPress) no tenía permiso para instalar plugins o editar el código.",
        'field-IMPEDIMENTO_CLIENTE': "• El/la anunciante necesita conseguir acceso de administrador al panel del sitio.\n• O\n• El/la anunciante necesita contactar al/a la desarrollador(a) para que instale GTM.",
        'field-MINHA_ACAO': "• Coloco el caso en 2/6.\n• Una vez que el/la anunciante tenga el acceso o se realice la instalación, abriré un caso en BAU para dar continuidad.",
        'field-SCREENSHOTS': "• Captura del panel del CMS mostrando la falta de permiso (opcional)."
    },
    'quickfill-ni-lack-of-access': {
        'field-REASON_COMMENTS': "Esperando información por parte del anunciante (Falta de accesos necesarios)",
        'field-CONTEXTO_CALL': "• Durante la call, identificamos que los accesos necesarios para continuar con la implementación no estaban disponibles.\n• Orienté al/a la anunciante sobre qué accesos son necesarios y cómo obtenerlos.",
        'field-IMPEDIMENTO_CLIENTE': "• El/la anunciante necesita proporcionar los accesos necesarios (ej: panel del sitio, plataforma de anuncios, o contacto con el/la desarrollador(a)) para que la implementación sea concluida.",
        'field-MINHA_ACAO': "• Coloco el caso en 2/6.\n• Una vez que el/la anunciante obtenga los accesos, abriré un caso en BAU para dar continuidad."
    },
    'quickfill-ni-followup-bau': {
        'field-REASON_COMMENTS': "Esperando información por parte del anunciante (Follow-up BAU 2/6)",
        'field-CONTEXTO_CALL': "• El día {DIA} del 2/6 hice dos intentos de contacto seguidos, pero no obtuve respuesta. Envío a continuación el correo correspondiente al día respectivo.",
        'field-SCREENSHOTS': "• Intento 1 -\n• Intento 2 -"
    },

    // --- NI_Awaiting_Validation ---
    'quickfill-ni-awaiting-ecw4': {
        'field-REASON_COMMENTS': "Esperando validación de datos (ECW4 - 7 Días)",
        'field-TASKS_SOLICITADAS': "• Implementación de Conversiones Optimizadas (ECW4)",
        'field-CONTEXTO_CALL': "• Creamos la conversión en Google Ads.\n• Configuramos el disparo de las etiquetas vía GTM.\n• Agregamos la etiqueta de UPD (User Provided Data).\n• Probamos juntos y validamos el buen funcionamiento.",
        'field-MINHA_ACAO': "• Coloco el caso en estado de Awaiting Validation para seguimiento de 7 días."
    },
    'quickfill-ni-awaiting-ga4': {
        'field-REASON_COMMENTS': "Esperando validación de datos (GA4 Event - 48h)",
        'field-TASKS_SOLICITADAS': "• Implementación de Eventos GA4",
        'field-CONTEXTO_CALL': "• Creamos el evento en GA4.\n• Configuramos el disparo de las etiquetas vía GTM.\n• Probamos juntos y validamos el buen funcionamiento.",
        'field-MINHA_ACAO': "• Coloco el caso en estado de Awaiting Validation para seguimiento de 48h."
    },

    // --- NI_Attempted_Contact ---
    'quickfill-ni-followup-lm': {
        'field-REASON_COMMENTS': "Intento de contacto sin éxito (Follow-up LM 2/6)",
        'field-CONTEXTO_CALL': "• El día {DIA} del 2/6 envié correo de follow-up (caso LM, sin intentos de llamada), pero no obtuve respuesta.",
        'field-SCREENSHOTS': "• Correo de follow-up enviado (LM) -"
    },
    'quickfill-ni-attempted-2day': {
        'field-REASON_COMMENTS': "Attempted Contact (Inicio 2 Day Rule)",
        'field-CONTEXTO_CALL': "• Hice el primer intento de llamada, sin éxito.\n• Envié un mensaje en el chat al AM.\n• Esperé 5 minutos e hice el segundo intento de llamada, nuevamente sin éxito.\n• Esperé 5 minutos más y ahora haré el seguimiento 2 Day Rule.",
        'field-SCREENSHOTS': "• MSG AM -\n• Intento 1 -\n• Intento 2 -"
    },

    // --- IN_Not_Reachable ---
    'quickfill-in-nrp-bau': {
        'field-REASON_COMMENTS': "NRP (BAU - 3 intentos)",
        'field-COMENTARIOS': "• Dos llamadas seguidas, y correo \"Antes de los 10 minutos\" y un tercer y último intento de llamada.\n• No hubo respuesta a los intentos de llamada o correo, por eso el caso será inactivado.",
        'field-SCREENSHOTS': "• Intento 1 -\n• Intento 2 -\n• Intento 3 -"
    },
    'quickfill-in-no-show-bau': {
        'field-REASON_COMMENTS': "Sin respuesta al 2 Day Rule.",
        'field-COMENTARIOS': "• El caso fue generado y entré a la llamada en el horario agendado.\n• El/la anunciante no asistió a la reunión.\n• Seguí el protocolo de espera (BAU): realicé dos intentos de llamada, sin éxito.\n• Ninguna de las llamadas fue atendida (ej: Buzón de voz).\n• Caso inactivado después del 2 Day Rule."
    },
    'quickfill-in-2-6-final': {
        'field-REASON_COMMENTS': "Finalización (2/6)",
        'field-COMENTARIOS': "• Día 9 finalización del 2/6, durante el período de seguimiento no hubo respuesta del/de la anunciante, entonces el caso será cerrado."
    },
    'quickfill-in-not-reachable-no-return': {
        'field-REASON_COMMENTS': "Inactivación por ausencia de respuesta del/de la anunciante",
        'field-COMENTARIOS': "El/la anunciante no asistió a la consultoría. Hice los intentos de llamada, pero no obtuve respuesta.\n\nSolicitaré la inactivación del caso, teniendo en cuenta la ausencia de contacto."
    },

    // --- IN_Not_Ready / Infeasible / Not_Interested / Troubleshooting ---
    'quickfill-in-not-ready-lack-of-access': {
        'field-REASON_COMMENTS': "Inactivación por falta de accesos (Reprogramación solicitada)",
        'field-COMENTARIOS': "No pudimos implementar nada durante la consultoría, ya que el/la anunciante no tenía los accesos necesarios.\n\nAbriré un caso en BAU para el día solicitado y pediré la inactivación del mismo, teniendo en cuenta la falta de accesos y la solicitud de reprogramación."
    },
    'quickfill-in-infeasible': {
        'field-REASON_COMMENTS': "Inactivación por inviabilidad técnica",
        'field-COMENTARIOS': "• Evaluamos la implementación solicitada e identificamos que no es posible realizarla debido a la complejidad técnica/estructura del sitio (ej: [describir la limitación encontrada]).\n• No se trata de una limitación de Google, sino de la estructura actual del sitio/plataforma del/de la anunciante.\n• Oriento al/a la anunciante sobre las opciones disponibles (ej: cambio de plataforma, apoyo de un(a) desarrollador(a) especializado(a))."
    },
    'quickfill-in-not-interested': {
        'field-REASON_COMMENTS': "Inactivación por falta de interés del/de la anunciante",
        'field-COMENTARIOS': "• El/la anunciante informó que no tiene interés en continuar con la consultoría en este momento.\n• [O] El contacto se limitó a preguntas generales, sin intención de realizar la implementación.\n• No hay más acciones pendientes de nuestra parte; caso cerrado a pedido del/de la anunciante."
    },
    'quickfill-in-troubleshooting-transferred': {
        'field-REASON_COMMENTS': "Inactivación - Troubleshooting sin éxito, caso transferido",
        'field-COMENTARIOS': "• Realizamos los pasos de troubleshooting estándar para el problema reportado (ej: [listar pruebas/verificaciones realizadas]).\n• Los pasos no resolvieron el problema.\n• Derivo el caso al equipo responsable ([nombre del equipo]) para su continuidad."
    },
    'quickfill-in-manual': {
        'field-REASON_COMMENTS': "Otro (Manual)"
    },

    // --- AS (reagendamento) ---
    'quickfill-as-no-show': {
        'field-MOTIVO_REAGENDAMENTO': '• Necesitamos reprogramar el caso, ya que el/la anunciante no asistió al meet, pero respondió el correo pidiendo la reprogramación'
    },
    'quickfill-as-insufficient-time': {
        'field-MOTIVO_REAGENDAMENTO': '• Necesitamos reprogramar el caso, ya que el tiempo fue insuficiente para terminar las Tareas\n• Implementamos [describir lo que se hizo]'
    },
    'quickfill-as-no-access': {
        'field-MOTIVO_REAGENDAMENTO': '• Necesitamos reprogramar el caso, ya que el/la anunciante no tenía acceso al sitio, al código o al CMS necesarios para la instalación de Google Tag Manager'
    },
    'quickfill-as-force-majeure': {
        'field-MOTIVO_REAGENDAMENTO': '• Reprogramación por fuerza mayor fuera del control del/de la anunciante (ej: falta de internet/energía, motivo de salud) - dentro de los criterios de reprogramación aceptable.\n• [Detallar el factor específico reportado por el/la anunciante]'
    },

    // --- DC ---
    'quickfill-dc-lm-incomplete': {
        'field-REASON_COMMENTS': "Nada fue implementado durante la consultoría (tiempo insuficiente, límite de reprogramación excedido)",
        'field-COMENTARIOS': "No pudimos implementar nada durante la consultoría, pues no hubo tiempo suficiente para terminar la tarea relacionada y el límite de reprogramaciones ya fue alcanzado.\n\nAbriré un caso en BAU para el día solicitado y pediré la inactivación del mismo."
    },
};
