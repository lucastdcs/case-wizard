import { TASKS_DB } from "../data/notes-data.js";
import { screenshotRules } from "../data/screenshot-rules.js";

// --- 1. DESIGN SYSTEM & CONFIG ---
const DS = {
  bg: "#F9FAFB", 
  white: "#FFFFFF",
  border: "#E5E7EB",
  textMain: "#111827",
  textSub: "#6B7280",
  blue: "#007AFF", 
  blueLight: "#EBF5FF",
  // Cores Oficiais das Ferramentas
  brands: {
    ads: {
      id: "ads",
      label: "Google Ads",
      color: "#1967D2",
      bg: "#E8F0FE",
      icon: "ads",
    },
    ga4: {
      id: "ga4",
      label: "Google Analytics 4",
      color: "#E37400",
      bg: "#FEF7E0",
      icon: "ga4",
    },
    gtm: {
      id: "gtm",
      label: "Tag Manager",
      color: "#00A1F1",
      bg: "#E2F4FD",
      icon: "gtm",
    },
    gmc: {
      id: "gmc",
      label: "Merchant Center",
      color: "#0F9D58",
      bg: "#E6F4EA",
      icon: "gmc",
    },
    default: {
      id: "gen",
      label: "Geral",
      color: "#5F6368",
      bg: "#F3F4F6",
      icon: "default",
    },
  },
  shadowCard: "0 1px 2px rgba(0,0,0,0.05)",
  shadowFloat: "0 -4px 20px rgba(0,0,0,0.08)",
  font: "'Google Sans', -apple-system, Roboto, sans-serif",
};

const ICONS = {
  // Google Ads (Triângulo Novo)
  ads: `<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>`,

  // GA4 (Gráfico Laranja)
  ga4: `<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>`,

  // GTM (Tag Azul)
  gtm: `<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>`,

  // Merchant (Shopping Bag)
  gmc: `<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>`,

  // Default
  default: `<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
};

export function createStepTasksComponent(onUpdateCallback, t) {
  const selection = {}; 
  let currentMode = "implementation";

  function getBrand(name) {
    const n = name.toLowerCase();
    if (
      n.includes("ads") ||
      n.includes("conversion") ||
      n.includes("remarketing")
    )
      return DS.brands.ads;
    if (n.includes("ga4") || n.includes("analytics")) return DS.brands.ga4;
    if (
      n.includes("gtm") ||
      n.includes("tag manager") ||
      n.includes("container")
    )
      return DS.brands.gtm;
    if (n.includes("merchant") || n.includes("shopping") || n.includes("feed"))
      return DS.brands.gmc;
    return DS.brands.default;
  }

  // 1. Populares (Hero)
  const heroTasks = Object.entries(TASKS_DB).filter(([_, t]) => t.popular);

  // 2. Agrupamento por Categoria (Accordion)
  const groupedTasks = {};
  Object.entries(TASKS_DB).forEach(([key, task]) => {
    if (task.popular) return; 
    const brand = getBrand(task.name);
    if (!groupedTasks[brand.label])
      groupedTasks[brand.label] = { brand, tasks: [] };
    groupedTasks[brand.label].tasks.push({ key, ...task });
  });


  const styleId = "cw-zen-tasks";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${DS.font}; background: ${DS.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${DS.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${DS.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${DS.white}; 
                border: 1px solid #E5E7EB; 
                border-radius: 16px; 
                padding: 12px;
                cursor: pointer; 
                position: relative; 
                height: 80px; /* Altura fixa confortável */
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                overflow: hidden;
            }
            
            /* Correção do Grid Ímpar */
            .cw-hero-card:last-child:nth-child(odd) { grid-column: span 2; }

            /* Interação */
            .cw-hero-card:hover { border-color: #D1D5DB; box-shadow: 0 4px 8px rgba(0,0,0,0.03); }
            .cw-hero-card:active { transform: scale(0.98); }

            /* HERO ACTIVE STATE (Borda Colorida Apenas) */
            .cw-hero-card.active {
                background: #FFFFFF; /* Fundo continua branco */
                border-color: var(--hero-color); /* Cor da borda dinâmica */
                box-shadow: 0 0 0 1px var(--hero-color), 0 4px 12px rgba(0,0,0,0.05);
            }

            /* CONTAINER DE CONTEÚDO (Para animação de deslize) */
            .cw-hero-main {
                display: flex; align-items: center; gap: 10px;
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                width: 100%; justify-content: center;
            }
            /* Quando ativo, sobe um pouquinho para caber o stepper */
            .cw-hero-card.active .cw-hero-main { transform: translateY(-12px); }

            /* ÍCONE (Sempre Neutro) */
            .cw-hero-icon { 
                width: 32px; height: 32px; border-radius: 8px; 
                background: #F3F4F6; /* Cinza Apple Neutro */
                display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                transition: background 0.2s;
            }
            /* Ícone SVG sempre visível */
            .cw-hero-icon svg { width: 20px; height: 20px; }
            
            /* No active, o ícone pode ficar branco puro para destacar o logo */
            .cw-hero-card.active .cw-hero-icon { background: #FFFFFF; border: 1px solid #F3F4F6; }

            /* TEXTO */
            .cw-hero-label { 
                font-size: 12px; font-weight: 500; color: ${DS.textMain}; line-height: 1.2; 
                text-align: left;
            }
            .cw-hero-card.active .cw-hero-label { font-weight: 600; color: var(--hero-color); }

            /* STEPPER (Surge de baixo) */
            .cw-hero-stepper {
                position: absolute; bottom: 8px; left: 0; right: 0;
                display: flex; align-items: center; justify-content: center; gap: 12px;
                opacity: 0; transform: translateY(10px);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
            }
            .cw-hero-card.active .cw-hero-stepper { opacity: 1; transform: translateY(0); pointer-events: auto; }
            
            /* Botões do Stepper */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 50%; background: #F3F4F6;
                color: ${DS.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${DS.border}; border-radius: 10px; background: ${DS.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${DS.blue}; box-shadow: 0 0 0 3px ${DS.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${DS.border}; border-radius: 10px; background: ${DS.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${DS.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${DS.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${DS.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${DS.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${DS.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${DS.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${DS.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${DS.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${DS.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${DS.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${DS.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${DS.textMain}; }
            
            .cw-footer-icons { display: flex; flex-direction: row-reverse; padding-left: 8px; }
            .cw-mini-icon { 
                width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;
                color: white; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 1px 2px rgba(0,0,0,0.15); position: relative; margin-left: -8px;
            }
            .cw-mini-icon svg { width: 12px; height: 12px; fill: currentColor; }

            @keyframes cwSlideDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

/* --- SCREENSHOTS: FINE & ELEGANT (Step 3) --- */
            
            .cw-screens-container {
                display: flex; flex-direction: column; gap: 12px;
                padding: 4px 4px 40px 4px; /* Respiro para não cortar sombras */
            }

            /* CARTÃO (Base Física) */
            .cw-screen-card {
                background: #FFFFFF;
                border-radius: 12px;
                /* Borda base sutil */
                border: 1px solid #E5E7EB; 
                /* Faixa de identidade na esquerda (Cor injetada via JS) */
                border-left: 4px solid var(--brand-color);
                
                padding: 16px 20px;
                position: relative;
                transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                
                /* Sombra quase invisível, apenas para separar do fundo */
                box-shadow: 0 1px 2px rgba(0,0,0,0.02);
            }

            /* Interação de Foco no Cartão */
            .cw-screen-card:focus-within {
                border-color: #E5E7EB; 
                border-left-width: 6px; /* A faixa engorda levemente */
                background: #FFFFFF;
                /* Sombra difusa estilo Apple ao focar */
                box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
                transform: translateX(2px); /* Micro-movimento lateral */
            }

            /* HEADER DO CARTÃO */
            .cw-card-header {
                display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
                /* Sem borda inferior para visual mais limpo/moderno */
            }
            
            /* ÍCONE (Puro, sem fundo) */
            .cw-card-icon {
                width: 24px; height: 24px; flex-shrink: 0;
                display: flex; align-items: center; justify-content: center;
            }
            .cw-card-icon svg { width: 100%; height: 100%; }

            /* TÍTULO EDITÁVEL */
            .cw-card-title-input {
                font-family: ${DS.font}; font-size: 15px; font-weight: 600; color: ${DS.textMain};
                border: 1px solid transparent; 
                border-radius: 6px;
                background: transparent; 
                width: 100%; outline: none;
                padding: 4px 8px; margin-left: -8px; /* Alinhamento óptico */
                transition: all 0.2s ease;
                cursor: text;
            }

            /* Hover no header revela que é editável */
            .cw-card-header:hover .cw-card-title-input {
                background: #F1F3F4;
                border-color: transparent;
            }
            
            /* Foco no título: Azul Google Padrão para indicar edição de texto */
            .cw-card-title-input:focus {
                background: #FFFFFF;
                border-color: ${DS.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "✎ Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${DS.textSub}; opacity: 0; 
                transform: translateX(-10px); transition: all 0.2s ease;
                pointer-events: none; white-space: nowrap;
            }
            .cw-card-header:hover .cw-edit-hint { opacity: 1; transform: translateX(0); }

            /* INFO BANNER (Win Criteria) */
            .cw-info-banner {
                margin: 0 4px 16px 4px;
                padding: 10px 14px;
                background: #F8F9FA;
                border: 1px dashed #DADCE0;
                border-radius: 8px;
                font-size: 11px; color: ${DS.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${DS.brands.ads.color}; text-decoration: none; font-weight: 600; }
            .cw-info-link:hover { text-decoration: underline; }

            /* FOOTER ICONS (Limpo & Original) */
            .cw-mini-icon { 
                width: 26px; height: 26px; border-radius: 50%; 
                background: #FFFFFF; border: 1px solid #E0E0E0;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                margin-left: -8px; position: relative; z-index: 1;
            }
            .cw-mini-icon svg { width: 14px; height: 14px; } 

            /* INPUTS (Campos de Link) */
            .cw-input-group { margin-bottom: 12px; position: relative; }
            .cw-input-group:last-child { margin-bottom: 0; }

            .cw-input-label {
                display: block; font-size: 10px; font-weight: 700; color: ${DS.textSub};
                margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;
            }

            .cw-input-field {
                width: 100%; box-sizing: border-box;
                padding: 10px 12px;
                border-radius: 8px;
                border: 1px solid #E5E7EB; /* Borda leve */
                background: #F9FAFB; /* Fundo levemente cinza */
                font-size: 13px; color: #374151;
                transition: all 0.2s ease; outline: none;
            }

            /* Foco no Input: Usa a cor da marca */
            .cw-input-field:focus {
                background: #FFFFFF;
                border-color: var(--brand-color); /* Dinâmico! */
                box-shadow: 0 0 0 2px var(--brand-bg); /* Anel de foco dinâmico */
            }
            
            /* Sucesso (Dopamina) */
            .cw-input-field.filled {
                background-color: #F0FDF4;
                border-color: #DCFCE7;
                color: #166534;
                padding-right: 36px;
            }

            /* Check Icon Animado */
            .cw-input-check {
                position: absolute; right: 10px; bottom: 10px; 
                color: #16A34A; width: 16px; height: 16px;
                opacity: 0; transform: scale(0.5); 
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
            }
            .cw-input-field.filled + .cw-input-check { opacity: 1; transform: scale(1); }
        `;
    document.head.appendChild(style);
  }


  const container = document.createElement("div");
  container.className = "cw-zen-container";


  const screenshotsContainer = document.createElement("div");
  Object.assign(screenshotsContainer.style, { display: "none" });

  const screenList = document.createElement("div");
  screenList.className = "cw-screens-container"; 

  screenshotsContainer.appendChild(screenList);

  container.innerHTML = `
        <div class="cw-zen-content">
            <div class="cw-hero-section">
                <div class="cw-section-subtitle js-hero-title" style="font-size:11px; font-weight:700; color:#6B7280; text-transform:uppercase; letter-spacing:0.8px;">${t('acesso_rapido')}</div>
                <div class="cw-hero-grid"></div>
                <div class="cw-helper-text">Atalhos para as implementações mais frequentes.<br>Use a busca abaixo para o catálogo completo.</div>
            </div>

            <div class="cw-list-section">
                <div class="cw-search-wrapper">
                    <input class="cw-search-input" placeholder="${t('buscar_catalogo')}">
                </div>
                <div class="cw-acc-container"></div>
                <div class="cw-results-container" style="display:none"></div>
            </div>
        </div>

        <div class="cw-status-bar">
            <div class="cw-status-text">0 ações definidas</div>
            <div class="cw-footer-icons"></div>
        </div>
    `;

  const heroGrid = container.querySelector(".cw-hero-grid");
  const accContainer = container.querySelector(".cw-acc-container");
  const resultsContainer = container.querySelector(".cw-results-container");
  const searchInput = container.querySelector(".cw-search-input");
  const statusBar = container.querySelector(".cw-status-bar");
  const statusText = container.querySelector(".cw-status-text");
  const footerIcons = container.querySelector(".cw-footer-icons");

  // 1. Heroes
  heroTasks.forEach(([key, task]) => {
    const brand = getBrand(task.name);
    const card = document.createElement("div");
    card.className = "cw-hero-card";
    card.id = `hero-${key}`;

    card.style.setProperty("--hero-color", brand.color);

    card.innerHTML = `
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${ICONS[brand.icon]}</div>
                <div class="cw-hero-label">${task.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">−</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `;

    card.onclick = (e) => {
      if (e.target.closest(".cw-step-btn")) return;
      const current = selection[key] ? selection[key].count : 0;
      updateTask(key, current > 0 ? -current : 1, task);
    };
    card.querySelector(".minus").onclick = () => updateTask(key, -1, task);
    card.querySelector(".plus").onclick = () => updateTask(key, 1, task);

    card.dataset.color = brand.color;

    heroGrid.appendChild(card);
  });


  function createListItem(key, task) {
    const brand = getBrand(task.name);
    const row = document.createElement("div");
    row.className = "cw-task-item";
    row.dataset.id = key;

    row.innerHTML = `
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${
                  brand.bg
                }; color:${brand.color}">
                    ${ICONS[brand.icon] || ICONS.default}
                </div>
                <div class="cw-task-label">${task.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">−</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `;

    row.onclick = (e) => {
      if (e.target.closest(".cw-step-btn")) return;
      const current = selection[key] ? selection[key].count : 0;
      updateTask(key, current > 0 ? -current : 1, task);
    };
    row.querySelector(".minus").onclick = () => updateTask(key, -1, task);
    row.querySelector(".plus").onclick = () => updateTask(key, 1, task);

    return row;
  }


  Object.entries(groupedTasks).forEach(([catName, data]) => {
    const group = document.createElement("div");
    group.className = "cw-acc-group";

    const header = document.createElement("div");
    header.className = "cw-acc-header";
    header.innerHTML = `
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${data.brand.color}"></div>
                ${catName}
            </div>
            <div class="cw-acc-icon">▼</div>
        `;
    header.onclick = () => {
      accContainer.querySelectorAll(".cw-acc-group.open").forEach((g) => {
        if (g !== group) g.classList.remove("open");
      });
      group.classList.toggle("open");
    };

    const body = document.createElement("div");
    body.className = "cw-acc-body";

    data.tasks.forEach((item) => {
      const row = createListItem(item.key, item);
      body.appendChild(row);
    });

    group.appendChild(header);
    group.appendChild(body);
    accContainer.appendChild(group);
  });


  function updateTask(key, delta, taskData) {
    if (!selection[key])
      selection[key] = {
        count: 0,
        data: taskData,
        brand: getBrand(taskData.name),
      };
    selection[key].count += delta;
    if (selection[key].count <= 0) delete selection[key];

    updateUI();
    renderScreenshots();
    if (onUpdateCallback) onUpdateCallback();
  }

  function updateUI() {

    heroTasks.forEach(([key]) => {
      const card = heroGrid.querySelector(`#hero-${key}`);
      if (!card) return;
      const sel = selection[key];

      if (sel) {
        card.classList.add("active");

        card.querySelector(".cw-step-val").textContent = sel.count;

        card.querySelector(".cw-step-val").style.color = card.dataset.color;
      } else {
        card.classList.remove("active");
      }
    });


    const allItems = container.querySelectorAll(".cw-task-item");
    allItems.forEach((row) => {
      const key = row.dataset.id;
      const sel = selection[key];
      if (sel) {
        row.classList.add("selected");
        row.querySelector(".cw-step-val").textContent = sel.count;
      } else {
        row.classList.remove("selected");
      }
    });


    const keys = Object.keys(selection);
    let totalCount = 0;
    const iconStack = [];

    keys.forEach((k) => {
      const item = selection[k];
      totalCount += item.count;
      for (let i = 0; i < item.count; i++) {
        if (iconStack.length < 6) iconStack.push(item.brand);
      }
    });

    if (totalCount > 0) {
      statusBar.classList.add("visible");
      const txtTask = totalCount > 1 ? "Ações" : "Ação";
      const txtDef = totalCount > 1 ? "definidas" : "definida";
      statusText.textContent = `${totalCount} ${txtTask} ${txtDef}`;

      footerIcons.innerHTML = "";
      iconStack.forEach((brand) => {
        const mini = document.createElement("div");
        mini.className = "cw-mini-icon";

        mini.innerHTML = ICONS[brand.icon] || ICONS.default;

        const svg = mini.querySelector("svg");
        if (svg) {
          svg.style.width = "14px";
          svg.style.height = "14px";
        }

        footerIcons.appendChild(mini);
      });
    } else {
      statusBar.classList.remove("visible");
    }
  }


  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    if (term.length > 0) {
      accContainer.style.display = "none";
      resultsContainer.style.display = "block";
      resultsContainer.innerHTML = "";

      let found = false;
      Object.entries(TASKS_DB).forEach(([key, task]) => {
        if (task.name.toLowerCase().includes(term)) {
          found = true;
          const item = createListItem(key, task);
          if (selection[key]) {
            item.classList.add("selected");
            item.querySelector(".cw-step-val").textContent =
              selection[key].count;
          }
          resultsContainer.appendChild(item);
        }
      });
      if (!found)
        resultsContainer.innerHTML =
          '<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>';
    } else {
      accContainer.style.display = "block";
      resultsContainer.style.display = "none";
    }
  });


  function renderScreenshots() {
    screenList.innerHTML = "";
    const keys = Object.keys(selection);
    let hasAny = false;

    const subStatus = document.getElementById("sub-status-select")?.value || "";
    const hasTagSupport = !!document.getElementById("tag-support-container"); // Simple check

    if (keys.length === 0) {
      screenList.innerHTML = `<div class="cw-empty-state">${t('selecione_tarefas')}</div>`;
      screenshotsContainer.style.display = "none";
      return;
    }

    const disclaimer = document.createElement("div");
    disclaimer.className = "cw-info-banner";
    disclaimer.innerHTML = `
            <span style="font-size:14px">ℹ️</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e políticas de Tag Support.
            </span>
        `;
    screenList.appendChild(disclaimer);

    keys.forEach((key) => {
      const task = selection[key].data;
      const taskCount = selection[key].count;
      const brand = selection[key].brand;

      const screenshotLabels = task.screenshots?.[currentMode] || [];

      if (screenshotLabels.length > 0) {
        hasAny = true;

        for (let i = 1; i <= taskCount; i++) {
          const card = document.createElement("div");
          card.className = "cw-screen-card";
          card.style.setProperty("--brand-color", brand.color);
          card.style.setProperty("--brand-bg", brand.bg);
          card.style.setProperty("--brand-shadow", brand.color + "40");

          // HEADER
          const header = document.createElement("div");
          header.className = "cw-card-header";

          const iconBox = document.createElement("div");
          iconBox.className = "cw-card-icon";
          iconBox.innerHTML = ICONS[brand.icon] || ICONS.default;

          // Container do Input + Hint
          const titleWrap = document.createElement("div");
          titleWrap.style.cssText =
            "flex:1; display:flex; align-items:center; gap:8px;";

          const nameInput = document.createElement("input");
          nameInput.className = "cw-card-title-input";
          nameInput.id = `name-${key}-${i}`;
          nameInput.value = `${task.name}${taskCount > 1 ? " #" + i : ""}`;
          nameInput.title = "Clique para renomear esta task";

          const editHint = document.createElement("span");
          editHint.className = "cw-edit-hint";
          editHint.innerHTML = "✎ Renomear";

          titleWrap.appendChild(nameInput);
          titleWrap.appendChild(editHint);

          header.appendChild(iconBox);
          header.appendChild(titleWrap);
          card.appendChild(header);

          screenshotLabels.forEach((title, idx) => {
            const group = document.createElement("div");
            group.className = "cw-input-group";

            const label = document.createElement("label");
            label.className = "cw-input-label";
            label.textContent = title;

            const pInput = document.createElement("input");
            pInput.className = "cw-input-field";
            pInput.id = `screen-${key}-${i}-${idx}`;
            pInput.placeholder = "Cole o link aqui...";
            pInput.setAttribute("autocomplete", "off");

            pInput.addEventListener("input", () => {
              if (pInput.value.trim().length > 5) pInput.classList.add("filled");
              else pInput.classList.remove("filled");
            });

            const check = document.createElement("div");
            check.className = "cw-input-check";
            check.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

            group.appendChild(label);
            group.appendChild(pInput);
            group.appendChild(check);
            card.appendChild(group);
          });

          screenList.appendChild(card);
        }
      }
    });

    screenshotsContainer.style.display = hasAny ? "block" : "none";
  }

  return {
    selectionElement: container,
    screenshotsElement: screenshotsContainer,
    updateSubStatus: () => renderScreenshots(),
    
    // Helper para ler o estado atual (Usado no Save)
    getCheckedElements: () => {
      return Object.keys(selection).map((key) => ({
        value: key,
        count: selection[key].count
      }));
    },

    // [CORREÇÃO] Novo método para definir quantidade direta (Usado no Restore)
    setTaskCount: (key, count) => {
        // Se já existe, reseta para zero antes de setar o novo
        if (selection[key]) delete selection[key];
        // Adiciona a quantidade correta de uma vez
        if (count > 0 && TASKS_DB[key]) {
            updateTask(key, count, TASKS_DB[key]);
        }
    },

    toggleTask: (key, forceState = true) => {
      const current = selection[key];
      if (forceState && !current) {
        updateTask(key, 1, TASKS_DB[key]);
      } else if (!forceState && current) {
        updateTask(key, -current.count, TASKS_DB[key]);
      }
    },
    
    setMode: (mode) => {
        currentMode = mode;
        renderScreenshots(); 
    },

    setLanguage: (newT) => {
        t = newT;
        const hTitle = container.querySelector('.js-hero-title');
        if (hTitle) hTitle.textContent = t('acesso_rapido');
        const sInput = container.querySelector('.cw-search-input');
        if (sInput) sInput.placeholder = t('buscar_catalogo');
        renderScreenshots();
    },
    
    reset: () => {
      for (const key in selection) delete selection[key];
      searchInput.value = "";
      accContainer.style.display = "block";
      resultsContainer.style.display = "none";
      updateUI();
      renderScreenshots(); 
    },
  };
}
