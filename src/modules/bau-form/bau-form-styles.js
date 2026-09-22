import { Z } from "../shared/z-layers.js";

export const COLORS = {
  blue: "#1A73E8",
  red: "#D93025",
  yellow: "#F9AB00",
  green: "#1E8E3E",
  blueLight: "#E8F0FE",
  redLight: "#FCE8E6",
  yellowLight: "#FEF7E0",
  greenLight: "#E6F4EA",
  textPrimary: "#202124",
  textSecondary: "#5F6368",
  border: "#DADCE0",
  surface: "rgba(255, 255, 255, 0.8)",
  white: "#FFFFFF"
};

export const RADIUS = {
  small: "8px",
  medium: "12px",
  large: "16px",
  pill: "100px"
};

export const SHADOW = {
  deep: "0 12px 40px rgba(0,0,0,0.12)",
  subtle: "0 4px 12px rgba(0,0,0,0.05)"
};

export const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
export const TRANSITION = `all 0.3s ${EASE}`;

export const injectStyles = () => {
  if (document.getElementById('bau-form-global-styles')) return;

  const style = document.createElement('style');
  style.id = 'bau-form-global-styles';
  style.textContent = `
    /* --- 1. POSICIONAMENTO E ANCORAGEM --- */
    .bau-popup {
      /* 650px era o mais estreito dos módulos principais (o Email Assistant é
         850x650, a Personal Library 620x680) e este é o que carrega mais dado
         por tela: a vista de detalhes tinha 600px de conteúdo abaixo da dobra.
         Altura fixa junto com a largura porque, sem ela, a janela pulava de
         466px (escolha do fluxo) para 810px (formulário) a cada passo. */
      width: 900px;
      height: 720px;
      max-width: 95vw;
      max-height: 90vh;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: ${Z.MODULE_RESTING};
      
      background: #FFFFFF; 
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      border: 1px solid #DADCE0;
      
      transform-origin: center center;
      animation: cw-genie-effect-in 0.4s ${EASE};
      color: #202124;
    }

    .bau-view-container {
      flex: 1;
      position: relative;
      min-height: 400px;
      /* 'scroll' literal punha um segundo contexto de rolagem por cima do
         .bau-dashboard-content / .bau-details-content, que já rolam sozinhos:
         rolar um não movia o outro, e a janela de detalhes deslizava para fora
         do próprio quadro. Quem rola aqui é o painel de dentro. */
      overflow: hidden;
    }

    .bau-view {
      display: none;
      flex-direction: column;
      height: 100%;
      animation: bauFadeIn 0.3s ease;
      position: relative;
      box-sizing: border-box;
      overflow: hidden; /* Garante que o conteúdo não vaze */
      /* Era 'margin-top: 18px', que somado a 'height: 100%' fazia a view
         ultrapassar o container em exatos 18px — invisível enquanto o
         container rolava, e 18px decepados agora que ele não rola.
         Como padding, o respiro é o mesmo e cabe dentro (box-sizing acima). */
      padding-top: 18px;
    }
    .bau-view.active { display: flex; }
    @keyframes bauFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* --- 3. ESTILOS GERAIS E CLASSES ADICIONAIS --- */
    .bau-dashboard-content {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
      /* Nao rola: no mestre-detalhe quem rola sao os DOIS paineis, cada um no
         seu eixo. Uma rolagem so para os dois obrigaria a descer a lista para
         ler o fim do detalhe. */
      overflow: hidden;
      padding: 24px;
      box-sizing: border-box;

      scrollbar-width: thin;
      scrollbar-color: #DADCE0 transparent;
    }
    .bau-dashboard-content::-webkit-scrollbar {
      width: 6px;
    }
    .bau-dashboard-content::-webkit-scrollbar-track {
      background: transparent;
    }
    .bau-dashboard-content::-webkit-scrollbar-thumb {
      background-color: #DADCE0;
      border-radius: 4px;
      border: 2px solid #FFFFFF;
    }

    /* --- ACCORDION PARA CASOS ANTIGOS --- */
    .bau-accordion-container { 
        list-style: none;
        margin-top: 12px; 
    }
    .bau-accordion-toggle {
        width: 100%;
        background: transparent;
        border: none;
        border-radius: 12px;
        padding: 12px 20px;
        font-size: 13px;
        font-weight: 400;
        color: #5F6368;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: background-color 0.2s ease, color 0.2s ease;
        margin-bottom: 24px;
    }
    .bau-accordion-toggle:hover { background-color: #F1F3F4; color: #202124; }
    .bau-accordion-toggle svg {
        transition: transform 0.3s ease;
    }
    .bau-accordion-toggle.expanded svg {
        transform: rotate(180deg);
    }
    .bau-accordion-content {
        padding: 12px 0 0 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    /* --- DEMAIS ESTILOS --- */

    .bau-dashboard-metrics {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 24px;
      padding: 0 4px;
    }

    .bau-metrics-refresh-btn {
      background: transparent;
      border: none;
      color: #5F6368;
      border-radius: 12px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 400;
      transition: background-color 0.2s ease, color 0.2s ease;
      height: 40px;
    }
    .bau-metrics-refresh-btn:hover { background: #F1F3F4; color: #202124; }
    .bau-metrics-refresh-btn:focus-visible { outline: 2px solid ${COLORS.blue}; outline-offset: 2px; }
    .bau-metrics-refresh-btn svg { width: 18px; height: 18px; }
    .bau-metrics-refresh-btn.spinning svg { animation: rotate 1s linear infinite; }

    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    /* Sem borda E sem caixa. A hierarquia que a pesquisa recomenda comeca por
       ESPACO EM BRANCO — so depois tom, so depois elevacao, e borda apenas se
       os tres falharem. Para tres numeros com rotulo, o espaco e o degrau
       tipografico (22 contra 12) ja bastam: tres caixas tonais identicas em
       fila sao o mesmo tell de "grade de cards" que a borda era.
       O separador vertical fino fica so entre elas, nao em volta. */
    .bau-metric-card {
      flex: 1;
      background: transparent;
      border: none;
      padding: 4px 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
      position: relative;
    }
    .bau-metric-card + .bau-metric-card { padding-left: 24px; box-shadow: inset 1px 0 0 #E8EAED; }
    .bau-metric-value {
      font-size: 22px;
      font-weight: 400;
      color: #202124;
      font-variant-numeric: tabular-nums;
      line-height: 1.2;
    }
    /* Sem uppercase e sem letter-spacing: o spec ja proibia, e e a assinatura
       visual de dashboard antigo. Degrau tipografico real faz o trabalho
       (22 contra 12), nao a caixa alta. */
    .bau-metric-label {
      font-size: 12px;
      font-weight: 400;
      color: #5F6368;
    }

    .bau-case-list { list-style: none; padding: 0; margin: 0; }

    .bau-case-list li {
      margin-bottom: 12px;
      position: relative;
      overflow: hidden;
    }

    /* Tom neutro, nao tingido por status. O que pesava era a SEGUNDA camada de
       cor: o ponto do selo ja diz o estado, e lavar o card inteiro na mesma cor
       repetia a informacao. Mas branco puro sobre fundo branco apaga o card
       como unidade — o degrau de ~3% e o minimo para ele existir sem moldura. */
    .bau-case-card {
      background: #F8F9FA;
      border: none;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: default;
      position: relative;
      overflow: hidden;
    }

    .bau-case-card:hover {
      /* Sem transform no próprio card: hit-box parado evita o flicker
         hover-liga/desliga perto da borda superior quando ele "sobe". A
         elevação vem só da sombra crescendo. */
      box-shadow: 0 1px 6px rgba(60,64,67,0.10);
      background: #F1F3F4;
      background: #F1F3F4;
    }

    /* Aura Status Overrides */

    .bau-case-main { display: flex; align-items: flex-start; gap: 12px; }
    .bau-case-icon { color: #5F6368; margin-top: 2px; }
    .bau-case-info { display: flex; flex-direction: column; gap: 4px; }
    .bau-case-header { display: flex; align-items: baseline; gap: 8px; }
    /* 500, nao 600. Peso alto em corpo pequeno e o que faz uma tela parecer
       painel administrativo de 2012; a hierarquia aqui vem do tamanho e da cor. */
    .bau-case-title { margin: 0; font-size: 15px; font-weight: 500; color: #202124; }
    .bau-case-date { font-size: 11px; color: #5F6368; }
    .bau-case-details { margin: 0; font-size: 12px; color: #5F6368; max-width: 400px;}

    /* O design-system PROIBE "pilula em maiusculas com status decorativo": o
       estado se diz em TEXTO NORMAL, com um ponto na cor semantica. A pilula de
       peso 700 era o item que mais datava a tela — e era violacao do proprio
       spec, nao so gosto. O ponto carrega a cor; o texto fica legivel. */
    .bau-case-status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 400;
      color: #5F6368;
      background: none;
      padding: 0;
      white-space: nowrap;
    }
    .bau-case-status-badge::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 100px;
      background: currentColor;
      flex-shrink: 0;
    }
    .bau-case-status-badge.status-yellow::before { background: #F9AB00; }
    .bau-case-status-badge.status-green::before { background: #1E8E3E; }
    .bau-case-status-badge.status-red::before { background: #D93025; }
    .bau-case-status-badge.status-gray::before { background: #9AA0A6; }
    /* Descarte pendente. Laranja, e nao o amarelo da criacao pendente: os dois
       esperam o TL, mas pedem o OPOSTO um do outro (abrir x fechar um caso), e
       compartilhar cor apagava a distincao justamente na lista onde os dois
       aparecem lado a lado. Nao e o vermelho do descarte JA feito: aqui ainda
       nao ha desfecho. */
    .bau-case-status-badge.status-orange::before { background: #E65100; }

    .bau-case-edit-btn {
      background: rgba(255,255,255,0.7);
      border: none;
      color: #5F6368;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 400;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      white-space: nowrap;
    }

    .bau-case-edit-btn:hover {
      background: rgba(26, 115, 232, 0.08);
      color: #1A73E8;
      border-color: #1A73E8;
    }

    .bau-case-edit-btn svg {
      width: 14px;
      height: 14px;
    }

    .bau-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
      color: #5F6368;
      height: 100%;
    }
    .bau-empty-state svg { margin-bottom: 16px; opacity: 0.5; }
    .bau-empty-title { font-size: 16px; font-weight: 500; color: #202124; margin: 0 0 4px 0; }

    .bau-success-view {
        display: none;
    }

    .bau-success-view.active {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      text-align: center;
      height: 100%;
      background: #FFFFFF;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
    }

    .bau-success-content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        width: 100%;
    }

    .bau-success-view.active .bau-success-content::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 320px;
        height: 320px;
        transform: translate(-50%, -50%) scale(0.8);
        background: radial-gradient(circle, rgba(30, 142, 62, 0.25) 0%, rgba(26, 115, 232, 0.15) 45%, transparent 75%);
        filter: blur(45px);
        z-index: -1;
        opacity: 0;
        animation: bauAuraCombined 5s ${EASE} 0.2s infinite;
    }

    @keyframes bauAuraCombined {
      0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
      20% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
      100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
    }

    @keyframes bau-success-pop {
      0% { transform: scale(0.4); opacity: 0; }
      75% { transform: scale(1.08); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes bauCheckDraw {
        from { stroke-dashoffset: 35; }
        to { stroke-dashoffset: 0; }
    }

    @keyframes bauSlideUpFade {
        from { transform: translateY(15px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @keyframes bauBtnShimmer {
        0% { transform: translateX(-150%) skewX(-15deg); }
        35%, 100% { transform: translateX(250%) skewX(-15deg); }
    }

    .bau-success-view.active .bau-success-icon {
        width: 88px;
        height: 88px;
        background: rgba(30, 142, 62, 0.12);
        backdrop-filter: blur(16px);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        color: ${COLORS.green};
        animation: bau-success-pop 0.7s var(--cw-ease-spring) forwards;
        box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.6), 0 12px 32px rgba(30, 142, 62, 0.2);
        border: 0.5px solid rgba(255, 255, 255, 0.25);
    }

    .bau-success-view.active .bau-success-icon svg {
        width: 44px;
        height: 44px;
    }

    .bau-success-view.active .bau-check-path {
        stroke-dasharray: 35;
        stroke-dashoffset: 35;
        animation: bauCheckDraw 0.55s ${EASE} 0.75s forwards;
    }

    .bau-success-view.active .bau-success-title {
        font-size: 24px;
        font-weight: 500;
        color: #202124;
        margin: 0 0 8px 0;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${EASE} 0.85s forwards;
    }

    .bau-success-view.active .bau-success-subtitle {
        font-size: 15px;
        color: #5F6368;
        margin-bottom: 36px;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${EASE} 0.95s forwards;
    }

    .bau-success-view.active #bau-success-back-btn {
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${EASE} 1.05s forwards;
        position: relative;
        overflow: hidden;
    }

    .bau-success-view.active #bau-success-back-btn::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transform: translateX(-150%) skewX(-15deg);
        animation: bauBtnShimmer 2.5s ease-in-out 1.8s forwards;
    }
    
    /* STICKY FAB */
    .bau-dashboard-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1a73e8;
      color: #ffffff;
      border: none;
      border-radius: 100px;
      padding: 14px 24px;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(26,115,232,0.4);
      transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10;
    }
    .bau-dashboard-fab:hover {
      background: #1557b0;
      box-shadow: 0 8px 24px rgba(26,115,232,0.5);
    }

    .bau-view-header { margin-bottom: 20px; padding: 0 24px; }
    .bau-content {
      overflow-y: auto;
      flex: 1;
      padding: 0 24px;
      box-sizing: border-box;
    }
    .bau-back-btn { background: transparent; border: none; color: #5F6368; font-size: 14px; display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 4px 0; }
    .bau-back-btn:hover { color: #202124; }

    .bau-progress-indicator { display: flex; justify-content: space-between; margin-bottom: 24px; position: relative; }
    .bau-progress-indicator::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: #DADCE0; z-index: 1; transform: translateY(-50%); }
    .bau-progress-step { width: 28px; height: 28px; border-radius: 50%; background: #F1F3F4; border: none; color: #5F6368; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; position: relative; z-index: 2; transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease; }
    .bau-progress-step.active { border-color: #1A73E8; background: #1A73E8; color: #FFFFFF; }
    .bau-progress-step.completed { border-color: #1E8E3E; background: #1E8E3E; color: #FFFFFF; }

    .bau-step {
      display: none;
      padding-bottom: 80px;
    }

    /* --- BRANCHING (STEP 0) --- */
    .bau-branching-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 10px 0;
    }

    .bau-branching-card {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      border: none;
      border-radius: 16px;
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      transition: transform 0.4s var(--cw-ease-spring), border-color 0.4s var(--cw-ease-spring), box-shadow 0.4s var(--cw-ease-spring), background-color 0.4s var(--cw-ease-spring);
      position: relative;
      overflow: hidden;
    }

    .bau-branching-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(135deg, rgba(26, 115, 232, 0.05) 0%, rgba(161, 75, 255, 0.05) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .bau-branching-card:hover {
      /* Era o pior caso do arquivo: -8px + scale no próprio card, maior
         chance de flicker de hit-box de todo o app. A elevação continua
         nítida só com sombra+borda; o "movimento" fica com o ícone filho
         (:hover .bau-branching-icon, abaixo). */
      border-color: #1A73E8;
      box-shadow: 0 12px 32px rgba(26, 115, 232, 0.15);
      background: rgba(255, 255, 255, 0.9);
    }

    .bau-branching-card:hover::before {
      opacity: 1;
    }

    .bau-branching-icon {
      width: 56px;
      height: 56px;
      background: #F8F9FA;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      color: #1A73E8;
      transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    }

    .bau-branching-card:hover .bau-branching-icon {
      background: #1A73E8;
      color: #FFFFFF;
      transform: rotate(5deg);
    }

    .bau-branching-title {
      font-size: 16px;
      font-weight: 500;
      color: #202124;
      margin-bottom: 8px;
    }

    .bau-branching-subtitle {
      font-size: 12px;
      color: #5F6368;
      line-height: 1.5;
    }
    .bau-step.active {
      display: block;
      animation: bauFadeIn 0.3s;
    }

    /* FORM INPUTS - GEMINI SYSTEM */
    .bau-card { background: #F8F9FA; border: none; border-radius: 12px; padding: 20px; margin-bottom: 20px; }

    .bau-highlight-panel {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      padding: 20px;
      background: linear-gradient(135deg, #F8F9FA 0%, #F1F3F4 100%);
      backdrop-filter: blur(12px);
      border-radius: 12px;
      border: none;
      margin-bottom: 24px;
      position: relative;
      overflow: hidden;
    }

    .bau-highlight-panel::before {
        content: '';
        position: absolute;
        top: -50%; left: -50%; width: 200%; height: 200%;
        background: radial-gradient(circle, rgba(26, 115, 232, 0.1) 0%, transparent 70%);
        animation: geminiPulse 8s infinite alternate;
    }

    .bau-highlight-panel.discard-theme::before {
        background: radial-gradient(circle, rgba(217, 48, 37, 0.12) 0%, transparent 70%);
    }

    @keyframes geminiPulse {
        0% { transform: translate(-10%, -10%) scale(1); }
        100% { transform: translate(10%, 10%) scale(1.1); }
    }

    .bau-highlight-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 1;
      padding: 8px 12px;
      border-radius: 10px;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: default;
    }

    .bau-highlight-item:hover {
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    .bau-highlight-label { font-size: 12px; color: #5F6368; }
    .bau-highlight-value { font-size: 15px; font-weight: 400; color: #202124; }

    /* Recaptura do contexto. Posicionado por cima da grade (o painel já é
       position: relative) para não ocupar uma célula e desalinhar os vitais. */
    .bau-rescan-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: rgba(255,255,255,0.75);
      color: #5F6368;
      cursor: pointer;
      transition: color 0.2s ease, background-color 0.2s ease;
    }
    .bau-rescan-btn svg { width: 16px; height: 16px; }
    .bau-rescan-btn:hover { color: ${COLORS.blue}; background: #FFFFFF; }
    .bau-rescan-btn:focus-visible { outline: 2px solid ${COLORS.blue}; outline-offset: 2px; }
    .bau-rescan-btn.spinning { cursor: default; color: ${COLORS.blue}; }
    .bau-rescan-btn.spinning svg { animation: rotate 1s linear infinite; }

    .bau-label { display: block; font-size: 13px; font-weight: 500; color: #202124; margin-top: 20px; margin-bottom: 8px; }
    
    /* Campo sobre tom, sem moldura cinza: mesma ordem de separacao do resto da
       tela. A borda aparece so no foco, onde ela TEM funcao. */
    .bau-input, .bau-select, .bau-textarea {
      width: 100%;
      background: #F1F3F4;
      border: none;
      border-radius: 8px;
      padding: 12px 16px;
      color: #202124;
      font-size: 14px;
      font-family: inherit;
      transition: background-color 0.2s ease, box-shadow 0.2s ease;
      box-sizing: border-box;
    }

    .bau-input:focus, .bau-select:focus, .bau-textarea:focus {
      background: #FFFFFF;
      outline: none;
      box-shadow: inset 0 0 0 2px ${COLORS.blue};
    }

    /* --- CAMPO COM BOTAO ACOPLADO (busca do SE ID) ------------------------
       Estas tres regras existiam e EU as apaguei junto com o bloco do painel
       sobreposto, no commit do mestre-detalhe: a heuristica que achava o fim
       daquele bloco passou do ponto e levou o que vinha depois. O resultado e
       o que o Lucas viu — botao cru do navegador, fora do campo, "como se o
       CSS nao o atingisse". Voltam no registro novo, sem moldura. */
    .bau-input-group {
      display: flex;
      align-items: stretch;
      gap: 4px;
      width: 100%;
    }
    .bau-input-group > .bau-input { flex: 1; min-width: 0; }

    .bau-mini-btn-input {
      flex-shrink: 0;
      width: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      background: #F1F3F4;
      border: none;
      border-radius: 8px;
      color: #5F6368;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    .bau-mini-btn-input svg { width: 18px; height: 18px; }
    .bau-mini-btn-input:focus-visible { outline: 2px solid ${COLORS.blue}; outline-offset: 2px; }

    .bau-tasks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 16px;
      margin-top: 12px;
    }
    .bau-task-item {
      background: #F8F9FA;
      border: none;
      border-radius: 8px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    }
    .bau-task-item:hover { background: #F1F3F4; border-color: #5F6368; }
    .bau-task-item.active { background: rgba(26, 115, 232, 0.1); border-color: #1A73E8; color: #1A73E8; }
    .bau-task-item input { display: none; }
    .bau-task-item span { font-size: 12px; font-weight: 500; line-height: 1.2; }

    .bau-availability-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
    .bau-field-hint { font-size: 11px; color: #5F6368; }

    /* Data e hora lado a lado. A hora é um <select> de 24h, não um
       datetime-local: o formato daquele vem do locale do navegador e não há
       como forçar 24h por CSS ou atributo (ADR-0010). */
    .bau-slot-row { display: grid; grid-template-columns: 1fr 120px; gap: 8px; }

    @media (max-width: 480px) {
      .bau-slot-row { grid-template-columns: 1fr; }
    }

    .bau-timezone-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #E8EAED;
    }

    .bau-timezone-echo {
      font-size: 12px;
      color: #5F6368;
      line-height: 1.5;
      margin-top: 8px;
    }

    .bau-timezone-echo strong { color: #202124; }

    .bau-availability-disclaimer {
      margin-top: 16px;
      padding: 12px 16px;
      background: #FFF8E1;
      border: 1px solid #FFE082;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bau-disclaimer-text {
      font-size: 12px;
      color: #795548;
      line-height: 1.5;
    }

    .bau-timezone-link {
      background: #FFFFFF;
      border: none;
      color: #1A73E8;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      align-self: flex-start;
    }

    .bau-timezone-link:hover {
      background: #F1F3F4;
      border-color: #1A73E8;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .bau-timezone-link svg {
      width: 14px;
      height: 14px;
    }

    /* BADGES */
    .bau-context-badges-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }
    .bau-context-badge {
      background: #F8F9FA;
      border: none;
      border-radius: 6px;
      padding: 4px 10px;
      display: flex;
      gap: 6px;
      font-size: 11px;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: default;
    }

    .bau-context-badge:hover {
      transform: scale(1.08);
      background: rgba(26, 115, 232, 0.05);
      border-color: #1A73E8;
      backdrop-filter: blur(4px);
      box-shadow: 0 2px 8px rgba(26,115,232,0.1);
    }
    .bau-badge-label { color: #5F6368; }
    .bau-badge-value { color: #202124; font-weight: 500; }

    /* CONFIRMATION STEP 4 */
    .bau-confirmation-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }
    .bau-confirm-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 10px 14px;
      background: #F8F9FA;
      border-radius: 10px;
      border: none;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      position: relative;
    }
    .bau-confirm-row:hover {
      background: #F1F3F4;
      border-color: #1A73E8;
    }
    .bau-confirm-row.full-width {
      grid-column: 1 / -1;
    }
    .bau-confirm-label {
      font-size: 10px;
      color: #1A73E8;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 500;
      margin-bottom: 2px;
    }
    .bau-confirm-value-input {
      font-family: inherit;
      font-size: 13px;
      color: #202124;
      line-height: 1.5;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 4px;
      padding: 4px 8px;
      margin-left: -8px;
      width: calc(100% + 16px);
      outline: none;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      cursor: text;
      box-sizing: border-box;
    }
    .bau-confirm-row:hover .bau-confirm-value-input {
      background: #FFFFFF;
      border-color: #DADCE0;
    }
    .bau-confirm-value-input:focus {
      background: #FFFFFF;
      border-color: #1A73E8;
      box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
    }
    .bau-confirm-textarea {
      resize: vertical;
      min-height: 40px;
    }
    .bau-confirm-divider {
      grid-column: 1 / -1;
      height: 1px;
      background: linear-gradient(90deg, transparent, #DADCE0, transparent);
      margin: 12px 0;
    }

    .bau-footer { 
        position: absolute; 
        bottom: 0; 
        left: 0; 
        right: 0; 
        background: rgba(255,255,255,0.8);
        backdrop-filter: blur(10px);
        display: flex; 
        justify-content: flex-end; 
        gap: 12px; 
        padding: 16px 24px;
        border-top: 1px solid #DADCE0;
        z-index: 100;
    }

    .bau-btn-primary, .bau-btn-submit {
      background: #1a73e8;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .bau-btn-submit { width: 100%; justify-content: center; box-shadow: 0 4px 12px rgba(26,115,232,0.3); }
    .bau-btn-primary:hover, .bau-btn-submit:hover { background: #1557b0; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(26,115,232,0.4); }

    .bau-btn-secondary {
      background: transparent;
      border: none;
      color: #5F6368;
      border-radius: 8px;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }
    .bau-btn-secondary:hover { background: #F1F3F4; color: #202124; border-color: #5F6368; }

    .bau-shimmer {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent);
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

    .bau-skeleton-card { height: 80px; background: #F1F3F4; border-radius: 12px; position: relative; overflow: hidden; margin-bottom: 12px; }
    .bau-skeleton-metric { height: 60px; background: #F1F3F4; border-radius: 12px; flex: 1; position: relative; overflow: hidden; }

    .bau-error-text { color: #D93025 !important; }
    .bau-data-error-hint { font-size: 10px; color: #D93025; margin-top: 4px; font-weight: 500; }
    .bau-pulse-attention { animation: pulseGlow 2s infinite; }
    @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(217, 48, 37, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(217, 48, 37, 0); } 100% { box-shadow: 0 0 0 0 rgba(217, 48, 37, 0); } }

    /* --- MESTRE-DETALHE ---------------------------------------------------
       Lista e detalhe lado a lado. Substitui o painel sobreposto: nao ha mais
       nada absoluto por cima de nada, entao offset, z-index e rolagem dupla
       deixam de ser possiveis. */
    /* O detalhe e um TOGGLE: sem caso escolhido a coluna nao existe, e a lista
       ocupa a largura toda. Um painel vazio permanente e area morta — pior, le
       como parte quebrada da tela.
       A abertura anima a COLUNA (grid-template-columns e o gap), que e
       propriedade espacial: por isso pode ter uma sobra minima no fim. A
       opacidade do conteudo acompanha SEM sobra, porque e efeito — overshoot em
       opacidade vira piscada. Ver a analise de elastico no PLAN. */
    .bau-md {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 0fr;
      gap: 0;
      transition: grid-template-columns 260ms cubic-bezier(.34, 1.12, .64, 1),
                  gap 260ms cubic-bezier(.34, 1.12, .64, 1);
    }
    .bau-md.is-open {
      grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
      gap: 16px;
    }

    .bau-md-list,
    .bau-md-detail {
      min-width: 0;
      min-height: 0;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #DADCE0 transparent;
    }
    .bau-md-list::-webkit-scrollbar,
    .bau-md-detail::-webkit-scrollbar { width: 6px; }
    .bau-md-list::-webkit-scrollbar-thumb,
    .bau-md-detail::-webkit-scrollbar-thumb { background-color: #DADCE0; border-radius: 4px; }

    /* O FAB flutua sobre AS DUAS colunas (esta ancorado no canto da janela, nao
       da lista). Este respiro e o que garante que o ultimo card, o acordeao e a
       ultima linha do detalhe alcancem o fim da rolagem sem ficar embaixo dele. */
    .bau-md-list,
    .bau-md-detail { padding-bottom: 88px; }

    /* Empilhar so vale na coluna ESTREITA (~380px) do detalhe aberto: em linha
       unica ali o titulo sobrava com 145px e quebrava em tres linhas. Com o
       detalhe fechado a lista tem 850px e o layout em linha e o certo — senao
       as acoes ficam isoladas no canto direito, com um vao no meio. */
    .bau-md.is-open .bau-md-list .bau-case-card { flex-direction: column; align-items: stretch; gap: 12px; }
    .bau-md.is-open .bau-md-list .bau-case-header { flex-wrap: wrap; gap: 4px 8px; }
    .bau-md.is-open .bau-md-list .bau-case-title { flex: 1 1 100%; }
    /* Fora do mestre (largura cheia) segue empilhado a direita, como era. */
    .bau-case-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
    .bau-md.is-open .bau-md-list .bau-case-actions { flex-direction: row; align-items: center; justify-content: flex-end; }

    /* Zona de leitura: recuada (tonal, sem sombra), como manda o design-system
       para "material de referencia, o que a pessoa le". A sombra fica para o
       que a pessoa leva embora — um elevado por tela, que aqui e o FAB. */
    .bau-md-detail {
      min-width: 0;
      background: #F8F9FA;
      border: none;
      border-radius: 12px;
      padding: 0;
      opacity: 0;
      /* Fechado o painel tem largura zero: sem isto o conteudo vazaria para
         fora da coluna enquanto ela encolhe. */
      overflow: hidden;
      transition: opacity 180ms ease, padding 260ms cubic-bezier(.34, 1.12, .64, 1);
    }
    .bau-md.is-open .bau-md-detail {
      opacity: 1;
      padding: 16px;
      overflow-y: auto;
      /* O conteudo entra deslizando 12px da direita — espacial, curto, uma vez
         por selecao. O atraso deixa a coluna abrir primeiro: o olho segue a
         moldura e so entao le o conteudo. */
      animation: bauDetailIn 260ms cubic-bezier(.34, 1.12, .64, 1) 60ms both;
    }
    @keyframes bauDetailIn {
      from { transform: translateX(12px); }
      to   { transform: translateX(0); }
    }

    .bau-md-head { margin-bottom: 16px; }
    .bau-md-title {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 500;
      color: #202124;
      line-height: 1.3;
    }
    .bau-md-head-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .bau-md-date {
      font-size: 12px;
      color: #5F6368;
      font-variant-numeric: tabular-nums;
    }

    /* Um contentor por unidade de informacao: o briefing e UMA caixa, nao uma
       caixa por campo. Hierarquia por tipografia e hairline, como o spec pede. */
    .bau-md-briefing,
    .bau-md-data { display: flex; flex-direction: column; }
    .bau-md-briefing { margin-bottom: 16px; }

    .bau-md-line {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 0 8px;
      padding: 8px 0;
      border-bottom: 1px solid #E8EAED;
      align-items: start;
    }
    /* Separador nao fica pendurado: o ultimo item nao leva hairline. */
    .bau-md-line.is-last { border-bottom: none; }

    /* Degrau tipografico real (12 contra 15), nao dois pixels de diferenca. */
    .bau-md-label {
      grid-column: 1 / -1;
      font-size: 12px;
      color: #5F6368;
      margin-bottom: 2px;
    }
    .bau-md-value {
      grid-column: 1;
      font-size: 15px;
      color: #202124;
      word-break: break-word;
      line-height: 1.45;
    }
    .bau-md-value.is-mono { font-variant-numeric: tabular-nums; }

    /* O botao de copiar significa UMA coisa: "isto vai para o outro sistema".
       So existe na zona de dados, e so aparece no hover/foco da linha. */
    .bau-md-copy {
      grid-column: 2;
      grid-row: 2;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: #5F6368;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s ease, color 0.2s ease, background-color 0.2s ease;
    }
    .bau-md-copy svg { width: 16px; height: 16px; }
    .bau-md-line:hover .bau-md-copy,
    .bau-md-copy:focus-visible { opacity: 1; }
    .bau-md-copy:hover { background: #E8F0FE; color: ${COLORS.blue}; }
    .bau-md-copy:focus-visible { outline: 2px solid ${COLORS.blue}; outline-offset: 2px; }
    .bau-md-copy.is-done { opacity: 1; color: ${COLORS.green}; }

    /* Card selecionado na lista: sem isso o agente perde de vista qual caso o
       painel da direita esta mostrando assim que a lista rola. */
    /* Acento numa aresta, nao moldura em volta: diz "e este" sem desenhar mais
       uma caixa. */
    .bau-case-card.is-selected {
      background: #E8F0FE;
      box-shadow: inset 3px 0 0 ${COLORS.blue};
    }

    /* Abaixo de 900px a janela encolhe (max-width: 95vw) e duas colunas viram
       duas colunas espremidas. Empilha: o detalhe vai para baixo da lista. */
    @media (max-width: 900px) {
      .bau-md { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) 0fr;
                transition: grid-template-rows 260ms cubic-bezier(.34, 1.12, .64, 1), gap 260ms ease; }
      .bau-md.is-open { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) minmax(0, 1fr); }
    }

    /* --- LOADING OVERLAY --- */
    .bau-form-loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      animation: bauFadeIn 0.3s ease;
    }

    .bau-form-loading-overlay.active {
      display: flex;
    }

    .bau-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(26, 115, 232, 0.1);
      border-top-color: #1A73E8;
      border-radius: 50%;
      animation: rotate 0.8s linear infinite;
      margin-bottom: 12px;
    }

    .bau-loading-text {
      font-size: 14px;
      font-weight: 500;
      color: #1A73E8;
      letter-spacing: 0.3px;
    }

    .bau-mini-btn-input:hover { background: #E8F0FE; color: ${COLORS.blue}; }

    @media (prefers-reduced-motion: reduce) {
      /* A abertura do detalhe continua acontecendo, mas sem a sobra da curva e
         sem o deslize: sumir/aparecer num quadro tambem desorienta. */
      .bau-md { transition-timing-function: linear; }
      .bau-md.is-open .bau-md-detail { animation: none; }

      /* Auras/pulsos puramente decorativos - infinitos, sem função de status.
         Spinners (.bau-spinner, .bau-metrics-refresh-btn.spinning svg) e o
         .bau-shimmer de skeleton ficam de fora: carregam estado de "carregando"
         real, mesmo padrão adotado no cwLibSpin da Biblioteca Pessoal. */
      .bau-success-view.active .bau-success-content::before,
      .bau-highlight-panel::before,
      .bau-pulse-attention {
        animation: none !important;
      }

      /* Sequência de sucesso (ao submeter um caso) simplificada pra fade puro -
         mesmo tratamento dado à splash screen em utils.js. */
      .bau-success-view.active .bau-success-icon,
      .bau-success-view.active .bau-success-title,
      .bau-success-view.active .bau-success-subtitle,
      .bau-success-view.active #bau-success-back-btn {
        animation-name: bauFadeIn !important;
        transform: none !important;
      }
      .bau-success-view.active #bau-success-back-btn::after {
        animation: none !important;
      }

      .bau-case-card:hover,
      .bau-dashboard-fab:hover,
      .bau-branching-card:hover,
      .bau-branching-card:hover .bau-branching-icon,
      .bau-highlight-item:hover,
      .bau-btn-primary:hover, .bau-btn-submit:hover,
      .bau-details-close-btn:hover,
      .bau-details-close-btn:active,
      .bau-copy-btn:active {
        transform: none !important;
      }
    }
  `;
  document.head.appendChild(style);
};
