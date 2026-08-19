// ARQUIVO GERADO - não edite à mão.
// Origem: npm run seed:note-fields (lê src/modules/notes/data/notes-data.js)
//
// Catálogo de campos da nota técnica, usado pela Central de Conteúdo para
// popular o seletor "Campo da nota" na aba Case Notes. Não é conteúdo: é a
// lista de destinos válidos para um trecho.
//
// Vem do notes-data.js de propósito. Manter uma cópia digitada à mão aqui
// criaria uma segunda fonte de verdade, que divergiria em silêncio na primeira
// vez que alguém adicionasse um campo à nota. Adicionou campo lá? Rode
// `npm run seed:note-fields` e publique - nada além disso.

const CONTENT_NOTE_FIELDS = {
  "fields": [
    {
      "key": "TASKS_SOLICITADAS",
      "labelPt": "🎯 Task(s) solicitada(s)",
      "labelEs": "🎯 Tarea(s) solicitada(s)",
      "kind": "lista"
    },
    {
      "key": "PASSOS_EXECUTADOS",
      "labelPt": "👣 O que foi feito",
      "labelEs": "👣 Qué se hizo",
      "kind": "lista"
    },
    {
      "key": "RESULTADO",
      "labelPt": "🏆 Resultado",
      "labelEs": "🏆 Resultado",
      "kind": "lista"
    },
    {
      "key": "DUVIDAS",
      "labelPt": "❓ Dúvidas do anunciante",
      "labelEs": "❓ Dudas del anunciante",
      "kind": "lista"
    },
    {
      "key": "PROBLEMAS",
      "labelPt": "⚠️ Problema inicial",
      "labelEs": "⚠️ Problema inicial",
      "kind": "lista"
    },
    {
      "key": "RESOLUCOES",
      "labelPt": "✅ Resoluções/Explicações",
      "labelEs": "✅ Resoluciones/Explicaciones",
      "kind": "lista"
    },
    {
      "key": "TASKS_IMPLEMENTADAS_CALL",
      "labelPt": "🛠️ Tasks implementadas na call",
      "labelEs": "🛠️ Tareas implementadas en la call",
      "kind": "lista"
    },
    {
      "key": "PROXIMOS_PASSOS",
      "labelPt": "🚀 Próximos passos (Acompanhamento)",
      "labelEs": "🚀 Próximos pasos",
      "kind": "lista"
    },
    {
      "key": "CONTEXTO_CALL",
      "labelPt": "💬 Contexto/O que foi feito",
      "labelEs": "💬 Contexto/Qué se hizo",
      "kind": "lista"
    },
    {
      "key": "IMPEDIMENTO_CLIENTE",
      "labelPt": "🚧 Impedimento / Próximo passo (Anunciante)",
      "labelEs": "🚧 Impedimento / Próximo paso (Anunciante)",
      "kind": "lista"
    },
    {
      "key": "MINHA_ACAO",
      "labelPt": "👨‍💻 Minha Ação",
      "labelEs": "👨‍💻 Mi Acción",
      "kind": "lista"
    },
    {
      "key": "SCREENSHOTS",
      "labelPt": "📸 Screenshots",
      "labelEs": "📸 Screenshots",
      "kind": "lista"
    },
    {
      "key": "MOTIVO_REAGENDAMENTO",
      "labelPt": "💬 OnCall Comments",
      "labelEs": "💬 OnCall Comments",
      "kind": "lista"
    },
    {
      "key": "CONSIDERACOES",
      "labelPt": "💡 Considerações adicionais",
      "labelEs": "💡 Consideraciones adicionales",
      "kind": "paragrafo"
    },
    {
      "key": "COMENTARIOS",
      "labelPt": "💬 OnCall Comments",
      "labelEs": "💬 OnCall Comments",
      "kind": "paragrafo"
    },
    {
      "key": "REASON_COMMENTS",
      "labelPt": "📌 Reason/Comments",
      "labelEs": "📌 Reason/Comments",
      "kind": "texto"
    }
  ],
  "substatus": [
    "AS_Acceptable_Reschedule",
    "AS_Reschedule_1",
    "DC_Other",
    "IN_Infeasible",
    "IN_Not_Interested",
    "IN_Not_Reachable",
    "IN_Not_Ready",
    "IN_Out_of_Scope_Email_to_Seller",
    "IN_Out_of_Scope_Rerouted",
    "IN_Out_of_Scope_Unable_to_Transfer",
    "IN_Troubleshooting_Transferred",
    "NI_Attempted_Contact",
    "NI_Awaiting_Inputs",
    "NI_Awaiting_Validation",
    "NI_In_Consult",
    "SO_Education_Only",
    "SO_Implementation_Only",
    "SO_Troubleshooting_Only"
  ]
};

function getNoteFieldCatalog() {
  // Sem gate de papel: é metadado de formulário, não conteúdo. Mesmo assim só
  // é chamado de dentro da Central, que já exige acesso para abrir.
  return CONTENT_NOTE_FIELDS;
}
