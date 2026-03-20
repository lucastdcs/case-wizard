// src/modules/call-script/call-script-data.js

export const csaChecklistData = {
    "PT BAU": {
        inicio: [
            "Apresentação (Nome e Time)",
            "Aviso de Gravação e Política de Privacidade",
            "Confirmação de CID e Email",
            "(Opcional) Validar autenticação da conta via link",
            "Confirmação da Task e do AM",
            "Informar tempo da ligação (30-45 min)",
            "Pedir para fechar conteúdo sensível (antes de compartilhar)",
            "Validar Backup e Acessos Admin"
        ],
        meio: [
            "Ofertar Implementação via Tag Support (Acesso Temporário)",
            "Enviar e orientar aceite do email 'Consentimento e autorização...'",
            "Confirmar recebimento do acesso",
            "Iniciar Configuração (Aviso de silêncio ~10min)",
            "[Caso Recuse] Seguir com Compartilhamento de Tela"
        ],
        fim: [
            "Resumo da chamada (o que foi feito e como funciona)",
            "Oferecer ajuda adicional / Abrir para dúvidas",
            "Pedir para fechar compartilhamento de tela",
            "Próximos passos (Acompanhamento por XX dias)",
            "Pedir consentimento para teste de QA",
            "Alinhar escopo (Técnico vs. Gerente de Contas)",
            "Pesquisa de Satisfação (e confirmar email para envio)",
            "Despedida"
        ]
    },
    "PT LT": {
        inicio: [
            "Olá [...], eu sou o [...], e faço parte da Equipe de Soluções Técnicas do Google. Tudo bem?",
            "Nossa ligação poderá ser gravada para fins de treinamento, qualidade e melhorias dos serviços do Google, de acordo com a nossa Política de Privacidade.",
            "Por questão de segurança preciso que você me informe o seu email e CID (ou número) da conta do Ads, por favor",
            "Confirmação da Task e do AM",
            "A consultoria tem uma duração média de 30 a 45 minutos.",
            "Peço para que compartilhe a tela usando a opção “Tela Inteira”",
            "Por favor, feche todo e qualquer conteúdo confidencial e sensível (conversas, dados pessoais importantes, etc).",
            "Possui o backup do seu site e todos os acessos às ferramentas do Google?"
        ],
        meio: [
            "Ofertar Implementação via Tag Support (Acesso Temporário)",
            "Enviar e orientar aceite do email 'Consentimento e autorização...'",
            "Confirmar recebimento do acesso",
            "Iniciar Configuração (Aviso de silêncio ~10min)",
            "[Caso Recuse] Seguir com Compartilhamento de Tela"
        ],
        fim: [
            "Resumo da chamada (o que foi feito e como funciona)",
            "Oferecer ajuda adicional / Abrir para dúvidas",
            "Pedir para fechar compartilhamento de tela",
            "Próximos passos (Acompanhamento por XX dias)",
            "Durante esse tempo, nossa equipe de qualidade poderá realizar um teste de conversão para validar a implementação. Você concorda com esse teste para garantirmos a efetividade da implementação?",
            "Alinhar escopo (Técnico vs. Gerente de Contas)",
            "Pesquisa de Satisfação (e confirmar email para envio)",
            "Despedida"
        ]
    },
    "ES BAU": {
        inicio: ["Introducción (Nombre y Equipo).", "La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra política de privacidad.", "Informar sitio web registrado en el caso.", "Confirmación: Solicitar al Anunciante que confirme los 10 dígitos del CID y el email del anunciante.", "Confirmaciones: Tarea, AM", "Informar el tiempo que va a durar la reunión.", "Confirmación: Copia de seguridad y acceso de ADM", "Cerrar contenido sensible antes de compartir la pantalla.", ],
        fim: ["Resumen de la llamada.", "Ayuda adicional.", "Cerrar la pantalla compartida.", "Próximos pasos (¿Cuánto tiempo seguirá el caso?)", "Encuesta de Satisfacción.", "Estaré monitoreando su caso durante XX días para asegurarme de que todo esté funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podría realizar una prueba de conversión para validar la implementación. ¿Estás de acuerdo con esta prueba para garantizar la efectividad de la implementación? Perfecto, ¡gracias!", ]
    },
    "ES LT": {
        inicio: ["Presentación (Nombre y equipo).", "Informar al cliente sobre la llamada grabada.", "Tiempo de duración de la llamada.", "Solicitar al anunciante que confirme lo siguiente: \n A) 10 dígitos de la cuenta \n B) Correo electrónico \n C) Número de teléfono y \n D) Nombre del sitio web.", "Autenticar la cuenta del anunciante en el cases, si corresponde.", "Términos y condiciones.", "Informar las Task solicitadas y AM.", "Cerrar contenido sensible.", "Confirmación de copia de seguridad y acceso de administrador a las herramientas.", "Resumen de llamada."],
        fim: ["Ofrecer ayuda adicional.", "Dejar de compartir la pantalla.", "Pasos siguientes (Si se le hará seguimiento al caso).", "Encuesta de Satisfacción.", "Informar al cliente que el equipo de QA realizará pruebas en los siguientes días."]
    },
    "EN BAU": {
        inicio: ["Example 1", "Example 2"],
        fim: ["Example 3", "Example 4"]
    }
};