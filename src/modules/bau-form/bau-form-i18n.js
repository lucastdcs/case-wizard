// src/modules/bau-form/bau-form-i18n.js
//
// Tradução do formulário BAU (abertura/descarte de caso). Diferente dos
// outros módulos, aqui o texto exibido e o valor enviado ao backend
// (Motivo_Abertura na planilha, usado por dashboards/relatórios do TL) são
// a MESMA string em português no bau-form-config.js original — por isso a
// tradução NÃO mexe em bau-form-config.js além de acrescentar `i18nKey`
// (só pra desambiguar os 2 campos "description"/"seId" duplicados entre
// steps). Os overrides abaixo trocam só o que aparece na tela; o `value`
// enviado ao backend continua sempre o texto em PT original, escolhido
// deliberadamente para não quebrar categorização existente.

import { getLanguage } from "../shared/i18n.js";

const FIELD_ES = {
    advName: { label: 'Nombre del Anunciante', placeholder: 'Nombre del Anunciante' },
    advEmail: { label: 'Email del Anunciante', placeholder: 'email@ejemplo.com', error: 'Formato de correo inválido' },
    cid: { label: 'CID', placeholder: '000-000-0000', tooltip: 'Usa el formato 000-000-0000 o 10 dígitos', error: 'Formato de CID incorrecto' },
    amName: { label: 'Account Manager (AM)', placeholder: 'Nombre del AM' },
    website: { label: 'Website', placeholder: 'https://www.ejemplo.com' },
    seId: { label: 'Speakeasy ID (SE ID)', placeholder: 'Speakeasy ID', buttonTitle: 'Buscar ID automáticamente' },
    seId_descarte: { label: 'Speakeasy ID (SE ID)', placeholder: 'Speakeasy ID' },
    reason: { label: 'Qué debe hacerse en BAU', placeholder: 'Describe las acciones esperadas...' },
    taskType: { label: 'Tareas para BAU (Selecciona 1 o más)', tooltip: 'Selecciona los tipos de implementación técnica' },
    nonImplementationReason: { label: 'Motivo de la No Implementación (Justificación BAU)' },
    description_justificativa: { label: 'Justificación / Descripción', placeholder: 'Describe detalladamente qué se necesita hacer...' },
    availability: { label: 'Disponibilidad (mínimo 1 opción)' },
    availability_1: { label: 'Opción 1 (Prioridad)' },
    availability_2: { label: 'Opción 2 (Opcional)' },
    availability_3: { label: 'Opción 3 (Opcional)' },
    suggestDiscard: { label: '¿El caso debe ser descartado por el TL?' },
    caseId: { label: 'Case ID', placeholder: 'Case ID' },
    language: { label: 'Idioma', placeholder: 'Idioma' },
    description_descarte: { label: 'Descripción', placeholder: 'Describe el motivo del descarte...' },
    discardReason: { label: 'Motivo del Descarte' },
};

// Textos exibidos nos <option> — chaveados pelo `value` original em PT
// (idêntico ao `text` no config). O `value` enviado ao backend nunca muda.
const OPTION_TEXT_ES = {
    "Selecione um motivo...": "Selecciona un motivo...",
    "Tempo da consultoria esgotado": "Tiempo de la consultoría agotado",
    "Solicitação de reagendamento pelo anunciante": "Solicitud de reprogramación por parte del anunciante",
    "Falta de acessos ou backup do site": "Falta de accesos o copia de seguridad del sitio",
    "Anunciante indisponível ou não preparado": "Anunciante no disponible o no preparado",
    "Implementação parcial (nem todas as tasks concluídas)": "Implementación parcial (no todas las tareas completadas)",
    "Solicitação de tarefas (tasks) adicionais": "Solicitud de tareas adicionales",
    "Necessidade de novas alterações (fase de acompanhamento)": "Necesidad de nuevos cambios (fase de seguimiento)",
    "Retorno de contato após prazo de 14 dias expirado": "Retorno de contacto después de vencido el plazo de 14 días",
    "Caso Filho gerado no atendimento": "Caso Hijo generado en la atención",
    "3ª Tentativa de contato sem sucesso": "3.º intento de contacto sin éxito",
    "Apenas o AM presente": "Solo el AM presente",
    "Estouro de tempo para conclusão": "Tiempo excedido para la conclusión",
    "Geração de caso BAU (Reagendamento)": "Generación de caso BAU (Reprogramación)",
    "Sim": "Sí",
    "Não": "No",
};

function fieldKey(fieldConfig) {
    return fieldConfig?.i18nKey || fieldConfig?.id || fieldConfig?.name;
}

// label/placeholder/tooltip/buttonTitle/error de um campo do FORM_CONFIG.
export function bft(fieldConfig, prop) {
    const fallback = fieldConfig?.[prop];
    if (getLanguage() !== 'es') return fallback;
    return FIELD_ES[fieldKey(fieldConfig)]?.[prop] ?? fallback;
}

// Texto exibido de uma <option>/checkbox — o `value` do parâmetro NUNCA é
// alterado por quem chama isso, só o que aparece pro agente na tela.
export function bfOptionText(text) {
    if (getLanguage() !== 'es') return text;
    return OPTION_TEXT_ES[text] ?? text;
}
