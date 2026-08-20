// src/modules/shared/z-layers.js
//
// Escala única de empilhamento do app.
//
// Antes cada módulo escolhia o próprio número (9999, 10000, 99999, 999999,
// 1000000, 2147483648...) e o resultado aparecia na tela: a janela de módulo
// nascia em 99999, abaixo do painel lateral do Gmail, e só subia pra frente
// depois do primeiro clique dentro dela (o listener de foco em animations.js).
// Quem abria o Case Notes via a metade direita do painel coberta pelo add-on.
// Arrastar a janela era pior ainda: o contador de "trazer pra frente" começava
// em 10000, ou seja, arrastar EMPURRAVA a janela pra trás.
//
// 2147483647 é o teto real: é o maior int de 32 bits com sinal, e o navegador
// grampeia qualquer valor acima disso. Era o caso do 2147483648 que
// animations.js usava pra "focar" a janela - na prática ele empatava com a
// pílula em vez de ficar acima dela, e a janela focada acabava cobrindo o
// próprio lançador.
//
// Os dois últimos degraus já existem hardcoded em command-center.js
// (.cw-focus-backdrop e .cw-pill / .cw-processing-card) e em utils.js
// (.splash-container, .cw-dialog-overlay); estão listados aqui pra que a ordem
// completa fique legível num lugar só.
export const Z = {
    // Janela de módulo em repouso ou em segundo plano (.idle).
    MODULE_RESTING: 2147483640,
    // Janela de módulo que acabou de receber clique - sobe acima das irmãs.
    MODULE_FOCUSED: 2147483641,
    // Blur que a automação joga sobre a PÁGINA (CRM/Gmail) pra destacar o
    // campo que ela vai preencher. Fica acima das janelas de módulo.
    PAGE_SPOTLIGHT_OVERLAY: 2147483642,
    // O campo destacado, acima do próprio blur.
    PAGE_SPOTLIGHT_TARGET: 2147483643,
    // Toasts e avisos ancorados na página: acima de tudo que é conteúdo.
    TOAST: 2147483644,
    // Escurecimento de foco do card de processamento (command-center.js).
    FOCUS_BACKDROP: 2147483646,
    // Pílula, paleta Ctrl+K, splash, diálogos modais e o card de processamento.
    TOP: 2147483647,
};
