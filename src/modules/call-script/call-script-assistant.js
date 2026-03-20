// src/modules/call-script/call-script-assistant.js

import {
  styleSelect,
  stylePopup,
  styleCredit,
  typeBtnStyle,
  getRandomGoogleStyle,
  styleResizeHandle,
  makeResizable,
  showToast // Importando showToast para feedback de cópia
} from "../shared/utils.js";
import { SoundManager } from "../shared/sound-manager.js";

import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { getPageData } from "../shared/page-data.js"; 

import { csaChecklistData } from "./call-script-data.js";

export function initCallScriptAssistant() {
  const CURRENT_VERSION = "v3.0.0";

  const COLORS = {
      bgApp: "#F5F5F7",
      bgSurface: "#FFFFFF",
      borderSubtle: "rgba(0, 0, 0, 0.07)",
      primary: "#007AFF",
      primaryBg: "rgba(0, 122, 255, 0.1)",
      textPrimary: "#1D1D1F",
      textSecondary: "#6E6E73",
      shadowCard: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
      success: "#34A853"
  };

  // --- ESTILOS INJETADOS (Animações Locais) ---
  const localStyleId = 'csa-local-styles';
  if (!document.getElementById(localStyleId)) {
      const s = document.createElement('style');
      s.id = localStyleId;
      s.innerHTML = `
        @keyframes csa-pulse-green {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .csa-live-dot {
            width: 8px; height: 8px; 
            background: #10B981; border-radius: 50%;
            animation: csa-pulse-green 2s infinite;
        }
        .csa-data-pill {
            background: #F8F9FA; border: 1px solid transparent;
            border-radius: 10px; padding: 8px 12px;
            cursor: pointer; position: relative; overflow: hidden;
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .csa-data-pill:hover {
            background: #FFFFFF; border-color: #DADCE0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            transform: translateY(-1px);
        }
        .csa-data-pill:active { transform: scale(0.98); }
        
        .csa-data-pill.copied {
            background: #E6F4EA !important;
            border-color: #34A853 !important;
        }
        .csa-copy-hint {
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #1E8E3E; font-weight: 700; text-transform: uppercase;
            opacity: 0; transition: opacity 0.2s; pointer-events: none;
        }
        .csa-data-pill.copied .csa-copy-hint { opacity: 1; }
        .csa-data-pill.copied .csa-data-value { opacity: 0.3; }

        /* Segmented Control (Tabs) */
        .csa-segmented-control {
            display: flex;
            background: #E3E3E8;
            padding: 2px;
            border-radius: 10px;
            gap: 2px;
            position: relative;
            margin-bottom: 16px;
        }
        .csa-segmented-control button {
            flex: 1;
            border: none;
            background: transparent;
            padding: 8px 4px;
            font-size: 12px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #6E6E73;
            position: relative;
            z-index: 2;
        }
        .csa-segmented-control button.active {
            color: #1D1D1F;
        }
        .csa-segmented-indicator {
            position: absolute;
            top: 2px;
            left: 2px;
            bottom: 2px;
            background: #FFFFFF;
            border-radius: 8px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* Strikethrough Animation */
        .csa-item-text {
            position: relative;
            display: inline-block;
            transition: color 0.3s ease;
        }
        .csa-item-text.completed {
            color: #6E6E73;
        }
        .csa-item-text::after {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 0;
            height: 1.5px;
            background: #6E6E73;
            transition: width 0.3s ease;
        }
        .csa-item-text.completed::after {
            width: 100%;
        }

        /* Shimmer Progress Bar */
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .csa-progress-fill {
            background: linear-gradient(90deg, #007AFF, #00C6FF, #007AFF);
            background-size: 200% 100%;
            animation: shimmer 2s infinite linear;
        }
      `;
      document.head.appendChild(s);
  }

  const styles = {
    // Barra de Progresso
    progressBarContainer: { height: "6px", background: COLORS.borderSubtle, width: "100%", position: "relative", overflow: "hidden" },
    progressBarFill: { height: "100%", width: "0%", transition: "width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)", borderRadius: "0 3px 3px 0" },

    contentArea: { padding: "16px", overflowY: "auto", flexGrow: "1", background: COLORS.bgApp, scrollBehavior: "smooth" },

    // Cards do Script
    card: { background: COLORS.bgSurface, border: `1px solid ${COLORS.borderSubtle}`, borderRadius: "12px", padding: "16px", marginBottom: "16px", transition: "transform 0.2s ease, box-shadow 0.2s ease", boxShadow: COLORS.shadowCard },
    cardTitle: { fontSize: "11px", fontWeight: "700", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", userSelect: "none" },

    itemRow: { display: "flex", alignItems: "flex-start", padding: "10px 8px", cursor: "pointer", borderRadius: "10px", transition: "all 0.2s ease", color: COLORS.textPrimary, fontSize: "14px", lineHeight: "1.5", marginBottom: "2px" },
    itemCompleted: { background: "rgba(0, 0, 0, 0.02)" },

    checkbox: { minWidth: "20px", height: "20px", borderRadius: "50%", border: `2px solid ${COLORS.borderSubtle}`, marginRight: "12px", marginTop: "1px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)", background: "#fff" },
    
    // Footer
    footer: { padding: "12px 16px", borderTop: "1px solid #F1F3F4", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" },
    resetBtn: { background: "transparent", border: "none", color: "#d93025", fontSize: "12px", fontWeight: "600", cursor: "pointer", padding: "6px 12px", borderRadius: "20px", transition: "background 0.2s ease", display: "flex", alignItems: "center", gap: "4px" },

    // Context Banner (HD Style)
    contextBanner: {
        padding: "20px 20px 16px 20px",
        background: "#FFFFFF",
        borderBottom: "1px solid #F1F3F4",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
        position: "relative",
        zIndex: "5"
    }
  };

  const csaCompletedTasks = {};
  let csaCurrentLang = "PT";
  let csaCurrentType = "BAU";
  let csaVisible = false;

  const csaPopup = document.createElement("div");
  csaPopup.id = "call-script-popup";
  csaPopup.classList.add("cw-module-window");

  Object.assign(csaPopup.style, stylePopup, {
    right: "auto", left: "50%", width: "420px", height: "700px",
    display: "flex", flexDirection: "column", transform: "translateX(-50%) scale(0.05)",
  });

  const animRefs = { popup: csaPopup, googleLine: null };

  // --- LOGICA DE MONITORAMENTO ---
  let monitorInterval = null;

  function updateContextData() {
      if (!csaVisible) return;

      getPageData().then(data => {
          const elName = csaPopup.querySelector('#cw-ctx-name');
          const elCid = csaPopup.querySelector('#cw-ctx-cid');
          const elEmail = csaPopup.querySelector('#cw-ctx-email');
          // const elCaseId = csaPopup.querySelector('#cw-ctx-message');

          
          if(elName) elName.textContent = data.advertiserName || "Cliente Desconhecido";
          
          
          if(elCid) {
              const cidTxt = data.cid || "---";
              if (elCid.textContent !== cidTxt) elCid.textContent = cidTxt;
          }
          
          if(elEmail) {
              const emailTxt = data.clientEmail || "Não encontrado";
              if (elEmail.textContent !== emailTxt) {
                  elEmail.textContent = emailTxt;
                  elEmail.title = emailTxt;
              }
          }

      });
  }

  function populateMessageArea() {
    getPageData().then(data => {
      const today = new Date().toLocaleDateString('pt-BR');
      const area = csaPopup.querySelector('#cw-am-message-area');
      const container = csaPopup.querySelector('#cw-am-review-container');

      let message = `Olá. Bom dia!\n\n` +
                    `Estou com um caso do seu cliente (${data.advertiserName || "Cliente"}) em andamento hoje (${today}). Fiz a primeira tentativa de contato agora há pouco, mas não tive sucesso.\n\n` +
                    `Farei uma nova tentativa em alguns minutos. Caso ele não atenda novamente, seguirei com o e-mail padrão de reagendamento/no-show e te mantenho no radar.\n\n` +
                    `Dados do caso para seu controle:\n\n` +
                    `Cliente: ${data.advertiserName || "---"}\n` +
                    `CID: ${data.cid || "---"}\n` +
                    `Case ID: ${data.caseId || "---"}\n` +
                    `E-mail: ${data.clientEmail || "---"}`;

      if (area) area.value = message;
      if (container) {
          container.style.display = 'block';
          container.style.maxHeight = '300px';
          container.style.opacity = '1';
          container.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  }

  function toggleVisibility() {
    csaVisible = !csaVisible;
    toggleGenieAnimation(csaVisible, csaPopup, 'cw-btn-script');
    
    if (csaVisible) {
        updateContextData(); 
        if (!monitorInterval) monitorInterval = setInterval(updateContextData, 2000); 
    } else {
        if (monitorInterval) { clearInterval(monitorInterval); monitorInterval = null; }
    }
  }

  const csaHeader = createStandardHeader(
    csaPopup, "Call Script", CURRENT_VERSION, "Guia interativo para condução de chamadas.",
    animRefs, () => { toggleVisibility(); }
  );
  csaPopup.appendChild(csaHeader);

  // === BANNER DE CONTEXTO (ESTILO GOOGLE CARDS) ===
  const contextBanner = document.createElement("div");
  Object.assign(contextBanner.style, styles.contextBanner);
  
  contextBanner.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
              <div class="csa-live-dot" title="Monitoramento Ativo"></div>
              <span id="cw-ctx-name" style="font-family:'Google Sans'; font-size:16px; font-weight:500; color:#202124;">Carregando...</span>
          </div>
          <div style="font-size:10px; font-weight:700; color:#1A73E8; background:#E8F0FE; padding:2px 8px; border-radius:4px; text-transform:uppercase;">Live</div>
      </div>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div style="font-size:9px; font-weight:700; color:#5F6368; text-transform:uppercase; margin-bottom:2px; letter-spacing:0.5px;">CID (Conta)</div>
              <div id="cw-ctx-cid" class="csa-data-value" style="font-family:'Roboto Mono', monospace; font-size:13px; font-weight:500; color:#1A73E8;">---</div>
              <div class="csa-copy-hint">Copiado!</div>
          </div>
          
          <div class="csa-data-pill" id="cw-pill-email">
              <div style="font-size:9px; font-weight:700; color:#5F6368; text-transform:uppercase; margin-bottom:2px; letter-spacing:0.5px;">Email de Contato</div>
              <div id="cw-ctx-email" class="csa-data-value" style="font-family:'Roboto', sans-serif; font-size:13px; color:#3C4043; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">---</div>
              <div class="csa-copy-hint">Copiado!</div>
          </div>
      </div>
  `;

  // --- MENSAGEM AM (Moved to a more discrete area) ---
  const amSection = document.createElement("div");
  amSection.style.cssText = "margin-top: 24px; border-top: 1px dashed #DADCE0; padding-top: 16px;";
  amSection.innerHTML = `
      <button id="cw-pill-message" style="width: 100%; background: transparent; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.2s;">
          <div style="background: #F1F3F4; border-radius: 6px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div style="text-align: left;">
              <div style="font-size:11px; font-weight:700; color:#5F6368;">Mensagem AM</div>
              <div style="font-size:10px; color:#9AA0A6;">Gerar aviso de insucesso de contato</div>
          </div>
      </button>

      <div id="cw-am-review-container" style="display: none; transition: all 0.3s ease; opacity: 0; max-height: 0; overflow: hidden; margin-top: 12px;">
          <textarea id="cw-am-message-area" style="width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px; font-family: 'Roboto', sans-serif; font-size: 13px; color: #3C4043; outline: none; resize: none; box-sizing: border-box; background: #F8F9FA; line-height: 1.4;"></textarea>
          <button id="cw-am-copy-final" style="width: 100%; margin-top: 8px; padding: 10px; background: #007AFF; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;">
              Copiar Mensagem Final
          </button>
      </div>
  `;

  const messageBtn = amSection.querySelector('#cw-pill-message');
  const finalCopyBtn = amSection.querySelector('#cw-am-copy-final');
  const messageArea = amSection.querySelector('#cw-am-message-area');

  messageBtn.onmouseenter = () => { messageBtn.style.background = "#F8F9FA"; messageBtn.style.borderColor = "#007AFF"; };
  messageBtn.onmouseleave = () => { messageBtn.style.background = "transparent"; messageBtn.style.borderColor = "#DADCE0"; };

  messageBtn.addEventListener('click', () => {
    populateMessageArea();
  });

  finalCopyBtn.addEventListener('click', () => {
      if (messageArea.value) {
          navigator.clipboard.writeText(messageArea.value);
          showToast("Mensagem copiada!");
          SoundManager.playSuccess();

          finalCopyBtn.style.background = "#34A853";
          finalCopyBtn.textContent = "Copiado!";
          setTimeout(() => {
              finalCopyBtn.style.background = "#1A73E8";
              finalCopyBtn.textContent = "Copiar Mensagem Final";
          }, 2000);
      }
  });
  
  // Lógica de Cópia (Click to Copy)
  const setupCopy = (id, textId) => {
      const pill = contextBanner.querySelector(id);
      const textEl = contextBanner.querySelector(textId);
      
      pill.onclick = () => {
          const text = textEl.textContent;
          if (!text || text.includes("---") || text.includes("Não encontrado")) return;
          
          navigator.clipboard.writeText(text);
          SoundManager.playSuccess();
          
          pill.classList.add("copied");
          setTimeout(() => pill.classList.remove("copied"), 1500);
      };
  };
  
  // Configura depois de inserir no DOM (no final da função)
  csaPopup.appendChild(contextBanner);

  // 2. PROGRESS BAR
  const progressContainer = document.createElement("div");
  Object.assign(progressContainer.style, styles.progressBarContainer);
  const progressFill = document.createElement("div");
  progressFill.className = "csa-progress-fill";
  Object.assign(progressFill.style, styles.progressBarFill);
  progressContainer.appendChild(progressFill);
  csaPopup.appendChild(progressContainer);

  // 3. CONTEÚDO
  const csaContent = document.createElement("div");
  csaContent.id = "csa-content";
  Object.assign(csaContent.style, styles.contentArea);
  csaPopup.appendChild(csaContent);

  // 4. FOOTER
  const footer = document.createElement("div");
  Object.assign(footer.style, styles.footer);
  const credit = document.createElement("span");
  credit.textContent = "by lucaste@";
  Object.assign(credit.style, { fontSize: "10px", color: "#bdc1c6" });
  
  const resetBtn = document.createElement("button");
  resetBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script`;
  Object.assign(resetBtn.style, styles.resetBtn);
  resetBtn.onmouseenter = () => resetBtn.style.background = "#fce8e6";
  resetBtn.onmouseleave = () => resetBtn.style.background = "transparent";
  resetBtn.onclick = () => {
    resetBtn.style.transform = "scale(0.9)";
    setTimeout(() => resetBtn.style.transform = "scale(1)", 150);
    for (let key in csaCompletedTasks) delete csaCompletedTasks[key];
    csaBuildChecklist();
  };

  footer.appendChild(credit);
  footer.appendChild(resetBtn);
  csaPopup.appendChild(footer);

  // 5. CONTROLES (MODERN TABS)
  const csaControlsDiv = document.createElement("div");
  Object.assign(csaControlsDiv.style, { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" });

  // Type Selector (BAU/LT)
  const typeControl = document.createElement("div");
  typeControl.className = "csa-segmented-control";
  typeControl.innerHTML = `
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `;

  // Language Selector (PT/ES/EN)
  const langControl = document.createElement("div");
  langControl.className = "csa-segmented-control";
  langControl.innerHTML = `
      <div class="csa-segmented-indicator" id="lang-indicator" style="width: calc(33.33% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-lang="PT">PT</button>
      <button data-lang="ES">ES</button>
      <button data-lang="EN">EN</button>
  `;

  csaControlsDiv.appendChild(typeControl);
  csaControlsDiv.appendChild(langControl);
  csaContent.appendChild(csaControlsDiv);

  // Type Interaction
  const typeButtons = typeControl.querySelectorAll('button');
  const typeIndicator = typeControl.querySelector('#type-indicator');
  typeButtons.forEach((btn, idx) => {
      btn.onclick = () => {
          typeButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          typeIndicator.style.transform = `translateX(${idx * (typeControl.offsetWidth / 2 - 2)}px)`;
          csaCurrentType = btn.dataset.type;
          SoundManager.playClick();
          csaBuildChecklist();
      };
  });

  // Lang Interaction
  const langButtons = langControl.querySelectorAll('button');
  const langIndicator = langControl.querySelector('#lang-indicator');
  langButtons.forEach((btn, idx) => {
      btn.onclick = () => {
          langButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          langIndicator.style.transform = `translateX(${idx * (langControl.offsetWidth / 3 - 1)}px)`;
          csaCurrentLang = btn.dataset.lang;
          SoundManager.playClick();
          csaBuildChecklist();
      };
  });

  const csaChecklistArea = document.createElement("div");
  csaChecklistArea.id = "csa-checklist-area";
  csaContent.appendChild(csaChecklistArea);
  csaContent.appendChild(amSection);

  const resizeHandle = document.createElement('div');
  Object.assign(resizeHandle.style, styleResizeHandle);
  resizeHandle.className = "no-drag"; resizeHandle.title = "Redimensionar";
  csaPopup.appendChild(resizeHandle);
  makeResizable(csaPopup, resizeHandle);

  document.body.appendChild(csaPopup);

  // --- ATIVAÇÃO DOS CLICKS DE CÓPIA ---
  setupCopy('#cw-pill-cid', '#cw-ctx-cid');
  setupCopy('#cw-pill-email', '#cw-ctx-email');

  function formatScriptText(text) { return text; }

  function csaBuildChecklist() {
    csaChecklistArea.innerHTML = "";
    const combinedKey = `${csaCurrentLang} ${csaCurrentType}`;
    const data = csaChecklistData[combinedKey];

    if (!data) {
      csaChecklistArea.innerHTML = `<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">☕</div><div>Script não configurado.</div></div>`;
      progressFill.style.width = "0%";
      return;
    }

    const activeColor = COLORS.primary;
    let totalItems = 0; let completedItems = 0;
    ["inicio", "meio", "fim"].forEach(k => { if (data[k]) totalItems += data[k].length; });

    ["inicio", "meio", "fim"].forEach((groupKey, groupIndex) => {
      const items = data[groupKey];
      if (!items || items.length === 0) return;

      const card = document.createElement("div");
      Object.assign(card.style, styles.card);

      const cardTitle = document.createElement("div");
      Object.assign(cardTitle.style, styles.cardTitle);

      let titleText = "";
      if (groupKey === "inicio") {
          if (csaCurrentLang.includes("ES")) titleText = "Apertura";
          else if (csaCurrentLang.includes("EN")) titleText = "Opening";
          else titleText = "Abertura";
      } else if (groupKey === "meio") {
          if (csaCurrentLang.includes("ES")) titleText = "Implementación";
          else if (csaCurrentLang.includes("EN")) titleText = "Implementation";
          else titleText = "Implementação (Tag Support)";
      } else if (groupKey === "fim") {
          if (csaCurrentLang.includes("ES")) titleText = "Cierre";
          else if (csaCurrentLang.includes("EN")) titleText = "Closing";
          else titleText = "Fechamento";
      }

      cardTitle.textContent = titleText;
      const counter = document.createElement("span");
      counter.style.fontSize = "11px"; counter.style.opacity = "0.7"; counter.style.fontWeight = "500"; counter.style.background = "#f1f3f4"; counter.style.padding = "2px 8px"; counter.style.borderRadius = "10px";
      cardTitle.appendChild(counter);
      card.appendChild(cardTitle);

      let groupDoneCount = 0;

      items.forEach((itemText, index) => {
        const key = `${combinedKey}-${groupKey}-${index}`;
        const isDone = !!csaCompletedTasks[key];
        if (isDone) { completedItems++; groupDoneCount++; }

        const row = document.createElement("div");
        Object.assign(row.style, styles.itemRow);

        const chk = document.createElement("div");
        Object.assign(chk.style, styles.checkbox);

        const textSpan = document.createElement("span");
        textSpan.className = "csa-item-text" + (isDone ? " completed" : "");
        textSpan.innerHTML = formatScriptText(itemText);
        textSpan.style.flex = "1";

        if (isDone) {
          Object.assign(row.style, styles.itemCompleted);
          chk.style.background = activeColor; chk.style.borderColor = activeColor; chk.style.transform = "scale(1)";
          chk.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        } else {
          chk.style.background = "transparent"; chk.style.borderColor = COLORS.borderSubtle; chk.style.transform = "scale(1)";
          chk.innerHTML = "";
        }

        row.onclick = () => {
          const newState = !csaCompletedTasks[key];
          csaCompletedTasks[key] = newState;
          SoundManager.playClick();

          if (newState) {
            chk.style.transform = "scale(1.15)"; setTimeout(() => chk.style.transform = "scale(1)", 150);
            Object.assign(row.style, styles.itemCompleted);
            textSpan.classList.add("completed");
            chk.style.background = activeColor; chk.style.borderColor = activeColor;
            chk.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
          } else {
            row.style.background = "transparent";
            textSpan.classList.remove("completed");
            chk.style.background = "transparent"; chk.style.borderColor = COLORS.borderSubtle; chk.innerHTML = "";
          }
          updateProgressAndCounters(combinedKey, data);
        };

        row.onmouseenter = () => { if (!csaCompletedTasks[key]) { row.style.background = "rgba(0, 0, 0, 0.03)"; chk.style.borderColor = activeColor; } };
        row.onmouseleave = () => { if (!csaCompletedTasks[key]) { row.style.background = "transparent"; chk.style.borderColor = COLORS.borderSubtle; } };

        row.appendChild(chk); row.appendChild(textSpan);
        card.appendChild(row);
      });

      if (groupDoneCount === items.length && items.length > 0) {
        counter.style.color = "#1e8e3e"; counter.style.background = "#e6f4ea";
        card.style.boxShadow = "inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)";
      }
      counter.textContent = `${groupDoneCount}/${items.length}`;
      csaChecklistArea.appendChild(card);
    });
    updateProgressUI(totalItems, completedItems);
  }

  function updateProgressAndCounters(combinedKey, data) {
    let total = 0; let completed = 0;
    ["inicio", "meio", "fim"].forEach(groupKey => {
      const items = data[groupKey] || [];
      total += items.length;
      items.forEach((_, idx) => { if (csaCompletedTasks[`${combinedKey}-${groupKey}-${idx}`]) completed++; });
    });
    updateProgressUI(total, completed);
    setTimeout(() => csaBuildChecklist(), 200);
  }

  function updateProgressUI(total, completed) {
    const pct = total === 0 ? 0 : (completed / total) * 100;
    progressFill.style.width = `${pct}%`;
    if (pct === 100) {
        progressFill.style.background = COLORS.success;
        progressFill.classList.remove("csa-progress-fill"); // Stop shimmer when 100%
    } else {
        progressFill.classList.add("csa-progress-fill");
    }
  }

  csaBuildChecklist();
  return toggleVisibility;
}