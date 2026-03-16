const inputs_structure = {

    SPEAKEASY_ID: {
        type: "text",
        icon:"🆔",
        content: "" //will be filled later when the output is ready
    },
    REASON_COMMENTS: {
        type: "text",
        icon: "📌",
        content: ""
    },
    COMENTARIOS: {
        type: "text",
        icon: "💬",
        content: ""
    }
}

const templates_structure = {
    'SO_Implementation_Only': {
        status: 'SO', 
        name: 'SO - Implementation Only',
        requiresTasks: true,
        template: [inputs_structure.SPEAKEASY_ID, inputs_structure.REASON_COMMENTS, inputs_structure.COMENTARIOS]
        },
}

function output(substatus){
    let text = "";

    if(substatus == 'SO_Implementation_Only'){
        console.log("entrou")
        let output_text = 'teste'
        let text = output_text

        return text
    }

    return text
}

output(templates_structure.SO_Implementation_Only.name)