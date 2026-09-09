// src/modules/shared/crm-labels.js
//
// Resolve campos da tela de caso pelo RÓTULO, tolerando o tradutor do CRM.
//
// O tradutor traduz rótulo e valor: "Given name" vira "Nome dado",
// "Customer time zone" vira "Fuso horário do cliente". A raspagem antiga
// casava `textContent.includes('Given name')`, então a tela traduzida —
// que é a de boa parte da operação — devolvia vazio em quase tudo.
//
// `ensureOriginalLanguage()` continua sendo a primeira defesa: reverter a
// tradução é sempre melhor, porque só assim os VALORES voltam ao original
// ("ciente" volta a ser "cognizant"). Este módulo é a segunda: se o clique
// de reverter falhar, o campo ainda é encontrado.
//
// Duas escolhas de implementação que valem explicação:
//
// 1. A comparação é por IGUALDADE do rótulo normalizado, não por `includes`.
//    A tela tem "Sales program" (o programa do caso, no formulário) e
//    "Program" (o tier de suporte, no cabeçalho) — dois campos diferentes.
//    Com `includes`, qual dos dois vencia dependia da ordem do DOM, que
//    muda conforme a aba aberta.
//
// 2. A leitura usa `textContent`, não `innerText`. Parte dos dados vive
//    atrás do "More" (`.below-fold`), num container marcado `hidden`:
//    `innerText` devolve vazio ali, `textContent` não.

// Normaliza para comparar: sem acento, sem caixa, sem espaço sobrando.
export function normalizarRotulo(texto) {
    return String(texto || '')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}

// Rótulos observados nas capturas reais do CRM (original e traduzido).
// As variantes em espanhol cobrem a operação ES; uma variante que não
// exista na tela simplesmente não casa, então sobra é barato — o que custa
// caro é faltar.
const ROTULOS = {
    serviceHorizontal: ['service horizontal', 'servico horizontal'],
    serviceOffering: ['service offering', 'oferta de servicos', 'oferta de servicios'],
    specialization: ['specialization', 'especializacao', 'especializacion'],
    routingChannel: ['routing communication channel', 'canal de comunicacao de roteamento', 'canal de comunicacion de enrutamiento'],
    businessLanguage: ['business language', 'linguagem comercial', 'idioma comercial'],
    vendorPartner: ['vendor partner', 'parceiro fornecedor', 'socio proveedor'],
    appointmentTasks: ['appointment tasks', 'tarefas de agendamento', 'tareas de la cita'],
    salesProgram: ['sales program', 'programa de vendas', 'programa de ventas'],
    // "Customer time zone" no Contact Us form; "Time zone" em outras telas
    // (e no mock-crm.html). O match é por igualdade, então as duas formas
    // precisam estar listadas — não há como uma "conter" a outra.
    customerTimezone: [
        'customer time zone', 'time zone', 'timezone',
        'fuso horario do cliente', 'fuso horario',
        'zona horaria del cliente', 'zona horaria',
    ],
    externalCustomerId: [
        'google ads external customer id',
        'id de cliente externo do google ads',
        'id de cliente externo de google ads',
    ],
    additionalInfo: ['additional info', 'informacoes adicionais', 'informacion adicional'],
    givenName: ['given name', 'nome dado', 'nombre'],
    familyName: ['family name', 'nome de familia', 'apellido'],
    contactEmail: ['contact email', 'e-mail de contato', 'correo electronico de contacto'],
    loginEmail: ['login email', 'e-mail de login', 'correo electronico de acceso'],
    phoneNumber: ['phone number', 'numero de telefone', 'numero de telefono'],
    appointmentTime: ['appointment time', 'horario da consulta', 'hora de la cita'],
    neoOrg: ['neo org'],
    neoProduct: ['neo product', 'produto neo', 'producto neo'],
    website: ['website', 'site', 'sitio web'],
    // Cabeçalho do caso (home-data-item) — o tradutor não mexe nesta área,
    // mas passam pelo mesmo resolvedor para a leitura ser uma só.
    program: ['program', 'programa'],
    adsBusinessSector: ['ads business sector'],
    interactionType: ['interaction type'],
    salesRegion: ['sales region'],
};

const SELETOR_ROTULO = '.form-label, .data-pair-label';

// Devolve o elemento de rótulo do campo, ou null.
export function acharRotulo(campo, raiz = document) {
    const variantes = ROTULOS[campo];
    if (!variantes) return null;
    const alvos = new Set(variantes);
    return Array.from(raiz.querySelectorAll(SELETOR_ROTULO))
        .find((el) => alvos.has(normalizarRotulo(el.textContent))) || null;
}

// Lê o valor de um nó respeitando VISIBILIDADE quando ela existe.
//
// As duas leituras são necessárias, e por motivos opostos:
//   - `innerText` ignora o que está com display:none. É o que faz a PII
//     mascarada funcionar: enquanto o campo está escondido, o container tem
//     tanto o rótulo do botão ("Phone") quanto o valor real oculto, e
//     `textContent` devolveria os dois grudados.
//   - `textContent` alcança o que está dentro de um container `hidden` (os
//     dados atrás do "More", em `.below-fold`) e o conteúdo de `<ng-template>`,
//     que nunca é renderizado e por isso não tem `innerText`.
//
// Ordem: o visível manda; vazio cai para o texto bruto.
function lerValor(el) {
    return el?.innerText?.trim() || el?.textContent?.trim() || '';
}

// Todos os valores do campo. `Appointment tasks` é multivalorado (um caso
// real trouxe seis tarefas), por isso a leitura básica devolve lista.
export function lerCampoTodos(campo, raiz = document) {
    const rotulo = acharRotulo(campo, raiz);
    if (!rotulo) return [];

    // Formulário Contact Us: <cuf-form-field> com N <ng-template debug-id="html-value">
    const cuf = rotulo.closest('cuf-form-field');
    if (cuf) {
        const valores = Array.from(cuf.querySelectorAll('[debug-id="html-value"]'))
            .map(lerValor)
            .filter(Boolean);
        if (valores.length) return valores;
    }

    // Cabeçalho do caso: <home-data-item> com .data-pair-content
    // Cabeçalho do caso (<home-data-item> com .data-pair-content) e o formato
    // mais simples que aparece em outras telas: o valor num <sanitized-content>
    // dentro do container do rótulo, ou no irmão seguinte.
    const item = rotulo.closest('home-data-item');
    const conteudo = item?.querySelector('.data-pair-content')
        || rotulo.parentElement?.querySelector('.data-pair-content')
        || rotulo.parentElement?.querySelector('sanitized-content')
        || rotulo.nextElementSibling;
    const valor = lerValor(conteudo);
    return valor ? [valor] : [];
}

// Primeiro valor do campo, ou null.
export function lerCampo(campo, raiz = document) {
    return lerCampoTodos(campo, raiz)[0] || null;
}
