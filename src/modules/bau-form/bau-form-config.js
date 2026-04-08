
export const FORM_CONFIG = {
    steps: [
        {
            id: 0,
            title: 'Selecione o tipo de atendimento',
            isBranching: true
        },
        {
            id: 1,
            title: 'Contexto e Validação',
            fields: [
                {
                    id: 'advName',
                    name: 'advName',
                    label: 'Nome do Anunciante',
                    type: 'text',
                    placeholder: 'Nome do Anunciante',
                    required: true,
                    isSmart: true 
                },
                {
                    id: 'cid',
                    name: 'cid',
                    label: 'CID',
                    type: 'text',
                    placeholder: '000-000-0000',
                    required: true,
                    isSmart: true,
                    tooltip: 'Use o formato 000-000-0000 ou 10 dígitos',
                    validation: {
                        regex: '^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$',
                        error: 'Formato de CID incorreto'
                    }
                },
                {
                    id: 'amName',
                    name: 'amName',
                    label: 'Account Manager (AM)',
                    type: 'text',
                    placeholder: 'Nome do AM',
                    required: true,
                    isSmart: true
                },
                {
                    id: 'seId',
                    name: 'seId',
                    label: 'Speakeasy ID (SE ID)',
                    type: 'text-with-button',
                    placeholder: 'Speakeasy ID',
                    required: false,
                    isSmart: true,
                    button: {
                        id: 'bau-top-se-search',
                        icon: 'wand',
                        title: 'Buscar ID automaticamente'
                    }
                }
            ]
        },
        {
            id: 2,
            title: 'Tasks',
            fields: [
                {
                    id: 'reason',
                    name: 'reason',
                    label: 'O que deve ser feito em BAU',
                    type: 'textarea',
                    placeholder: 'Descreva as ações esperadas...',
                    required: true,
                    style: { minHeight: '80px' }
                },
                {
                    id: 'taskType',
                    name: 'taskType',
                    label: 'Tasks para BAU (Selecione 1 ou mais)',
                    type: 'checkbox-grid',
                    required: true,
                    tooltip: 'Selecione os tipos de implementação técnica',
                    options: [
                        'Ads Conversion Tracking', 'Ads Dynamic Remarketing', 'Ads Enhanced Conversions', 'Ads Website Call Conversion',
                        'Ads Remarketing', 'Analytics Cross Domain Tracking', 'Analytics E-Commerce Tracking', 'Analytics Enhanced E-Commerce Tracking',
                        'Analytics Event Tracking', 'Analytics Health Check', 'Analytics Remarketing', 'Analytics Setup',
                        'Fix GA4 implementation', 'Consent Mode', 'Fix Sitewide Tagging (OGT & CT)', 'Google Tag Manager Installation', 'Customer Match'
                    ]
                }
            ]
        },
        {
            id: 3,
            title: 'Justificativa e Agendamento',
            fields: [
                {
                    id: 'nonImplementationReason',
                    name: 'nonImplementationReason',
                    label: 'Motivo da Não Implementação (Justificativa BAU)',
                    type: 'select',
                    required: true,
                    options: [
                        { value: "", text: "Selecione um motivo..." },
                        { value: "Tempo da consultoria esgotado", text: "Tempo da consultoria esgotado" },
                        { value: "Solicitação de reagendamento pelo anunciante", text: "Solicitação de reagendamento pelo anunciante" },
                        { value: "Falta de acessos ou backup do site", text: "Falta de acessos ou backup do site" },
                        { value: "Anunciante indisponível ou não preparado", text: "Anunciante indisponível ou não preparado" },
                        { value: "Implementação parcial (nem todas as tasks concluídas)", text: "Implementação parcial (nem todas as tasks concluídas)" },
                        { value: "Solicitação de tarefas (tasks) adicionais", text: "Solicitação de tarefas (tasks) adicionais" },
                        { value: "Necessidade de novas alterações (fase de acompanhamento)", text: "Necessidade de novas alterações (fase de acompanhamento)" },
                        { value: "Retorno de contato após prazo de 14 dias expirado", text: "Retorno de contato após prazo de 14 dias expirado" }
                    ]
                },
                {
                    id: 'description',
                    name: 'description',
                    label: 'Justificativa / Descrição',
                    type: 'textarea',
                    placeholder: 'Descreva detalhadamente o que precisa ser feito...',
                    required: true
                },
                {
                    id: 'availability',
                    name: 'availability',
                    label: 'Disponibilidade (mínimo 1 opção)',
                    type: 'datetime-group',
                    required: true,
                    fields: [
                        { name: 'availability_1', label: 'Opção 1 (Prioridade)', required: true },
                        { name: 'availability_2', label: 'Opção 2 (Opcional)', required: false },
                        { name: 'availability_3', label: 'Opção 3 (Opcional)', required: false }
                    ]
                }
            ]
        },
        {
            id: 4,
            title: 'Confirmação',
            isConfirmation: true
        },
        {
            id: 5,
            title: 'Solicitar Descarte',
            fields: [
                {
                    id: 'caseId',
                    name: 'caseId',
                    label: 'Case ID',
                    type: 'text',
                    placeholder: 'Case ID',
                    required: true,
                    isSmart: true
                },
                {
                    id: 'language',
                    name: 'language',
                    label: 'Idioma',
                    type: 'text',
                    placeholder: 'Idioma',
                    required: true,
                    isSmart: true
                },
                {
                    id: 'seId',
                    name: 'seId',
                    label: 'Speakeasy ID (SE ID)',
                    type: 'text',
                    placeholder: 'Speakeasy ID',
                    required: true,
                    isSmart: true
                },
                {
                    id: 'description',
                    name: 'description',
                    label: 'Descrição',
                    type: 'textarea',
                    placeholder: 'Descreva o motivo do descarte...',
                    required: true
                },
                {
                    id: 'discardReason',
                    name: 'reason',
                    label: 'Motivo do Descarte',
                    type: 'select',
                    required: true,
                    groups: [
                        {
                            label: 'Live Appointments',
                            options: [
                                { value: "Caso Filho gerado no atendimento", text: "Caso Filho gerado no atendimento" },
                                { value: "3ª Tentativa de contato sem sucesso", text: "3ª Tentativa de contato sem sucesso" }
                            ]
                        },
                        {
                            label: 'Live Meet',
                            options: [
                                { value: "Apenas o AM presente", text: "Apenas o AM presente" },
                                { value: "Estouro de tempo para conclusão", text: "Estouro de tempo para conclusão" },
                                { value: "Geração de caso BAU (Reagendamento)", text: "Geração de caso BAU (Reagendamento)" }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
