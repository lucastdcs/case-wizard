// ARQUIVO GERADO - não edite à mão.
// Origem: npm run seed:tasks (lê o TASKS_DB de
// src/modules/notes/data/notes-data.js)
//
// Semeia o módulo "task_screenshots" da Central de Conteúdo com o catálogo de
// tasks e os screenshots do Win Criteria que o agente já usa hoje. É migração de
// conteúdo que já está em produção, não mudança nova - por isso publica direto,
// sem passar pela fila.
//
// COMO RODAR: no editor do Apps Script, escolha "seedTasksNow" no seletor de
// função e clique em Executar. Roda uma vez só; chamadas seguintes são
// ignoradas se o módulo já tiver itens no ar.

const CONTENT_SEED_TASKS = {
  "module": "task_screenshots",
  "items": [
    {
      "key": "gtm_installation",
      "lang": "ALL",
      "label": "GTM Installation",
      "value": "{\"name\":\"GTM Installation\",\"popular\":true,\"screenshots\":{\"implementation\":[\"GTM Instalado\",\"Vinculador de conversões\"],\"education\":[]},\"screenshots_es\":{\"implementation\":[\"GTM Instalado\",\"Vinculador de conversiones\"]}}",
      "sortOrder": 0
    },
    {
      "key": "ads_conversion_tracking",
      "lang": "ALL",
      "label": "Ads Conversion Tracking",
      "value": "{\"name\":\"Ads Conversion Tracking\",\"popular\":true,\"screenshots\":{\"implementation\":[\"Tag criada\",\"Teste GTM\",\"Teste Ads\",\"Versão Publicada\",\"Status Ads\"],\"education\":[\"Screenshot for TAG assistant of tag working:\",\"Screenshot of conversion tracking status in Google Ads:\"]},\"screenshots_es\":{\"implementation\":[\"Etiqueta creada\",\"Prueba GTM\",\"Prueba Ads\",\"Versión Publicada\",\"Estado Ads\"]}}",
      "sortOrder": 1
    },
    {
      "key": "ads_enhanced_conversions",
      "lang": "ALL",
      "label": "Ads Enhanced Conversions (ECW4)",
      "value": "{\"name\":\"Ads Enhanced Conversions (ECW4)\",\"popular\":true,\"screenshots\":{\"implementation\":[\"Termos aceitos no Ads\",\"Tag implementada\",\"Teste GTM\",\"Teste Ads\",\"Versão Publicada\",\"Painel do Ads (após 7 dias)\"],\"education\":[\"Termos aceitos no Ads\",\"Tag implementada\",\"Teste GTM\",\"Teste Ads\",\"Versão Publicada\",\"Painel do Ads (após 7 dias)\"]},\"screenshots_es\":{\"implementation\":[\"Términos aceptados en Ads\",\"Etiqueta implementada\",\"Prueba GTM\",\"Prueba Ads\",\"Versión Publicada\",\"Panel de Ads (después de 7 días)\"],\"education\":[\"Términos aceptados en Ads\",\"Etiqueta implementada\",\"Prueba GTM\",\"Prueba Ads\",\"Versión Publicada\",\"Panel de Ads (después de 7 días)\"]}}",
      "sortOrder": 2
    },
    {
      "key": "ga4_event_tracking",
      "lang": "ALL",
      "label": "Analytics Event Tracking (GA4)",
      "value": "{\"name\":\"Analytics Event Tracking (GA4)\",\"popular\":true,\"screenshots\":{\"implementation\":[\"Tag do evento GA4 implementado no GTM\",\"Teste GTM (tagassistant.google.com)\",\"Teste GA4 (DebugView - tagassistant.google.com)\",\"Versão publicada no GTM\",\"(Se houver parâmetros) Dimensões customizadas criadas no GA4\",\"Evento marcado como principal no GA4\",\"GA4 e Google Ads vinculados corretamente\",\"Evento principal GA4 importado no Google Ads (como secundário)\",\"Métricas app & web ativadas no Google Ads\",\"(Opcional) Teste no Relatório do Tempo Real (GA4)\"],\"education\":[\"Tag do evento GA4 implementado no GTM\",\"Teste GTM (tagassistant.google.com)\",\"Teste GA4 (DebugView - tagassistant.google.com)\",\"Versão publicada no GTM\",\"(Se houver parâmetros) Dimensões customizadas criadas no GA4\",\"Evento marcado como principal no GA4\",\"GA4 e Google Ads vinculados corretamente\",\"Evento principal GA4 importado no Google Ads (como secundário)\",\"Métricas app & web ativadas no Google Ads\",\"(Opcional) Teste no Relatório do Tempo Real (GA4)\"]},\"screenshots_es\":{\"implementation\":[\"Etiqueta del evento GA4 implementada en GTM\",\"Prueba GTM (tagassistant.google.com)\",\"Prueba GA4 (DebugView - tagassistant.google.com)\",\"Versión publicada en GTM\",\"(Si hay parámetros) Dimensiones personalizadas creadas en GA4\",\"Evento marcado como principal en GA4\",\"GA4 y Google Ads vinculados correctamente\",\"Evento principal de GA4 importado en Google Ads (como secundario)\",\"Métricas app y web activadas en Google Ads\",\"(Opcional) Prueba en el Informe de Tiempo Real (GA4)\"],\"education\":[\"Etiqueta del evento GA4 implementada en GTM\",\"Prueba GTM (tagassistant.google.com)\",\"Prueba GA4 (DebugView - tagassistant.google.com)\",\"Versión publicada en GTM\",\"(Si hay parámetros) Dimensiones personalizadas creadas en GA4\",\"Evento marcado como principal en GA4\",\"GA4 y Google Ads vinculados correctamente\",\"Evento principal de GA4 importado en Google Ads (como secundario)\",\"Métricas app y web activadas en Google Ads\",\"(Opcional) Prueba en el Informe de Tiempo Real (GA4)\"]}}",
      "sortOrder": 3
    },
    {
      "key": "upd_for_ga4",
      "lang": "ALL",
      "label": "UPD for GA4 (User-Provided Data)",
      "value": "{\"name\":\"UPD for GA4 (User-Provided Data)\",\"popular\":true,\"screenshots\":{\"implementation\":[\"Validação: Conta GA4 (somente fluxo web, não é setor de saúde)\",\"\\\"Coleta de dados fornecidos pelo usuário\\\" habilitado no GA4 (Admin > Coleta de Dados)\",\"Confirmação de coleta de dados (UI)\",\"Tag do evento GA4 otimizado (UPD) implementado no GTM\",\"Teste GTM (tagassistant - parâmetro 'em' sem erro)\",\"Teste GA4 (DebugView - tagassistant)\",\"Versão publicada no GTM\",\"(Treinamento) Evento principal importado no Google Ads como secundário\"],\"education\":[\"Validação: Conta GA4 (somente fluxo web, não é setor de saúde)\",\"\\\"Coleta de dados fornecidos pelo usuário\\\" habilitado no GA4 (Admin > Coleta de Dados)\",\"Confirmação de coleta de dados (UI)\",\"Tag do evento GA4 otimizado (UPD) implementado no GTM\",\"Teste GTM (tagassistant - parâmetro 'em' sem erro)\",\"Teste GA4 (DebugView - tagassistant)\",\"Versão publicada no GTM\",\"(Treinamento) Evento principal importado no Google Ads como secundário\"]},\"screenshots_es\":{\"implementation\":[\"Validación: Cuenta GA4 (solo flujo web, no es sector salud)\",\"\\\"Recopilación de datos proporcionados por el usuario\\\" habilitada en GA4 (Administrador > Recopilación de Datos)\",\"Confirmación de recopilación de datos (UI)\",\"Etiqueta del evento GA4 optimizado (UPD) implementada en GTM\",\"Prueba GTM (tagassistant - parámetro 'em' sin error)\",\"Prueba GA4 (DebugView - tagassistant)\",\"Versión publicada en GTM\",\"(Capacitación) Evento principal importado en Google Ads como secundario\"],\"education\":[\"Validación: Cuenta GA4 (solo flujo web, no es sector salud)\",\"\\\"Recopilación de datos proporcionados por el usuario\\\" habilitada en GA4 (Administrador > Recopilación de Datos)\",\"Confirmación de recopilación de datos (UI)\",\"Etiqueta del evento GA4 optimizado (UPD) implementada en GTM\",\"Prueba GTM (tagassistant - parámetro 'em' sin error)\",\"Prueba GA4 (DebugView - tagassistant)\",\"Versión publicada en GTM\",\"(Capacitación) Evento principal importado en Google Ads como secundario\"]}}",
      "sortOrder": 4
    },
    {
      "key": "ads_website_call_conversion",
      "lang": "ALL",
      "label": "Google Ads Website Call Conversion",
      "value": "{\"name\":\"Google Ads Website Call Conversion\",\"popular\":false,\"screenshots\":{\"implementation\":[\"Tag implementado no GTM\",\"Versão publicada no GTM\",\"Teste do disparo da etiqueta de configuração no tag assistant em mais de uma página, mostrando ID e rótulo\",\"Teste usando o #google-wcc-debug\",\"Mudança do status da conversão no Google Ads [Aguardar alguns minutos]\"],\"education\":[]},\"screenshots_es\":{\"implementation\":[\"Etiqueta implementada en GTM\",\"Versión publicada en GTM\",\"Prueba del disparo de la etiqueta de configuración en tag assistant en más de una página, mostrando ID y etiqueta\",\"Prueba usando #google-wcc-debug\",\"Cambio del estado de la conversión en Google Ads [Esperar algunos minutos]\"]}}",
      "sortOrder": 5
    },
    {
      "key": "ads_remarketing",
      "lang": "ALL",
      "label": "Ads Remarketing",
      "value": "{\"name\":\"Ads Remarketing\",\"popular\":false,\"screenshots\":{\"implementation\":[\"Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)\",\"Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads\",\"Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data.\"],\"education\":[\"Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)\",\"Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads\",\"Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data.\"]}}",
      "sortOrder": 6
    },
    {
      "key": "ads_dynamic_remarketing",
      "lang": "ALL",
      "label": "Ads Dynamic Remarketing",
      "value": "{\"name\":\"Ads Dynamic Remarketing\",\"popular\":false,\"screenshots\":{\"implementation\":[\"Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.\",\"Business vertical chosen in Google Ads.\",\"Dynamic Remarketing enabled on Merchant center for retail.\",\"Implementation of Dynamic Remarketing Tags on the website/GTM.\",\"Validating Dynamic Remarketing Tags using Tag Assistant.\",\"Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.\",\"Dynamic Remarketing audiences populating on Google Ads\"],\"education\":[\"Validating Dynamic Remarketing Tags using Tag Assistant.\",\"Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.\",\"Dynamic Remarketing audiences populating on Google Ads\"]}}",
      "sortOrder": 7
    },
    {
      "key": "ga4_setup",
      "lang": "ALL",
      "label": "Analytics Set Up (GA4)",
      "value": "{\"name\":\"Analytics Set Up (GA4)\",\"popular\":false,\"screenshots\":{\"implementation\":[\"Implementation of GA4 tag on the Website/GTM\",\"Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.\",\"GA4 and Google Ads Linked.\",\"GA4 web metrics enabled\"],\"education\":[\"Implementation of GA4 tag on the Website/GTM\",\"Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.\",\"GA4 and Google Ads Linked.\",\"GA4 web metrics enabled\"]}}",
      "sortOrder": 8
    },
    {
      "key": "ga4_standard_remarketing",
      "lang": "ALL",
      "label": "GA4 Standard Remarketing",
      "value": "{\"name\":\"GA4 Standard Remarketing\",\"popular\":false,\"screenshots\":{\"implementation\":[\"Google signals in GA4 enabled.\",\"User data acknowledgement in GA4 checked.\",\"GA4 linked to the correct Google Ads Account\",\"Custom Audience(if requested) set up.\",\"GA4 audience lists imported to Google Ads populating data\"],\"education\":[\"Google signals in GA4 enabled.\",\"User data acknowledgement in GA4 checked.\",\"GA4 linked to the correct Google Ads Account\",\"Custom Audience(if requested) set up.\",\"GA4 audience lists imported to Google Ads populating data\"]}}",
      "sortOrder": 9
    },
    {
      "key": "ga4_ecommerce_tracking",
      "lang": "ALL",
      "label": "Analytics eCommerce Tracking (GA4)",
      "value": "{\"name\":\"Analytics eCommerce Tracking (GA4)\",\"popular\":false,\"screenshots\":{\"implementation\":[\"eCommerce Tag set up using gTag or GTM.\",\"Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.\",\"Monetization reports in GA4 recording purchases.\",\"Purchase conversion imported to the right Google Ads account.\",\"Ensuring GA4 web metrics are enabled.\"],\"education\":[\"eCommerce Tag set up using gTag or GTM.\",\"Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.\",\"Monetization reports in GA4 recording purchases.\",\"Purchase conversion imported to the right Google Ads account.\",\"Ensuring GA4 web metrics are enabled.\"]}}",
      "sortOrder": 10
    },
    {
      "key": "ga4_cross_domain_tracking",
      "lang": "ALL",
      "label": "Analytics Cross-domain Tracking (GA4)",
      "value": "{\"name\":\"Analytics Cross-domain Tracking (GA4)\",\"popular\":false,\"screenshots\":{\"implementation\":[\"Tag Assistant to reflect all the domains are tagged with the same GA4.\",\"Domains added for cross-domain configuration in GA4 UI.\",\"Adding domains into Unwanted Referrals.\",\"Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.\",\"Validating the _ga cookie values are same on both the domains from the application tab in the developer tools.\"],\"education\":[\"Tag Assistant to reflect all the domains are tagged with the same GA4.\",\"Domains added for cross-domain configuration in GA4 UI.\",\"Adding domains into Unwanted Referrals.\",\"Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.\",\"Validating the _ga cookie values are same on both the domains from the application tab in the developer tools.\"]}}",
      "sortOrder": 11
    },
    {
      "key": "fix_sitewide_tagging",
      "lang": "ALL",
      "label": "FIX SITEWIDE TAGGING (OGT & CT)",
      "value": "{\"name\":\"FIX SITEWIDE TAGGING (OGT & CT)\",\"popular\":false,\"screenshots\":{\"implementation\":[\"1. OGT (gTag/GTM com tag de vinculador de conversão) adicionado em todas as páginas\",\"2. A codificação automática (auto tagging) está habilitada no Google Ads (Admin > Config. da Conta)\",\"3. [Se for GTM] O vinculador de conversão está presente e o acionador definido para disparar em \\\"Todas as Páginas\\\".\",\"4. O gclid está sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?\",\"5. O gclid foi passado para a página de conversão?\"],\"education\":[\"1. OGT (gTag/GTM com tag de vinculador de conversão) adicionado em todas as páginas\",\"2. A codificação automática (auto tagging) está habilitada no Google Ads (Admin > Config. da Conta)\",\"3. [Se for GTM] O vinculador de conversão está presente e o acionador definido para disparar em \\\"Todas as Páginas\\\".\",\"4. O gclid está sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?\",\"5. O gclid foi passado para a página de conversão?\"]},\"screenshots_es\":{\"implementation\":[\"1. OGT (gTag/GTM con etiqueta de vinculador de conversión) añadido en todas las páginas\",\"2. El etiquetado automático (auto tagging) está habilitado en Google Ads (Administrador > Config. de la Cuenta)\",\"3. [Si es GTM] El vinculador de conversión está presente y el activador definido para dispararse en \\\"Todas las Páginas\\\".\",\"4. ¿El gclid se mantiene sin redirecciones y se almacena en la cookie _gcl_aw en la landing page?\",\"5. ¿El gclid fue pasado a la página de conversión?\"],\"education\":[\"1. OGT (gTag/GTM con etiqueta de vinculador de conversión) añadido en todas las páginas\",\"2. El etiquetado automático (auto tagging) está habilitado en Google Ads (Administrador > Config. de la Cuenta)\",\"3. [Si es GTM] El vinculador de conversión está presente y el activador definido para dispararse en \\\"Todas las Páginas\\\".\",\"4. ¿El gclid se mantiene sin redirecciones y se almacena en la cookie _gcl_aw en la landing page?\",\"5. ¿El gclid fue pasado a la página de conversión?\"]}}",
      "sortOrder": 12
    }
  ]
};

function seedTasksNow() {
  const result = seedContentModule(CONTENT_SEED_TASKS);
  Logger.log(result);
  return result;
}
