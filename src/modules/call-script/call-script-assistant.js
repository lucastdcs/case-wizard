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
  const CURRENT_VERSION = "v2.6 (Context HD)";

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
        .csa-data-pill.copied .csa-data-value { opacity: 0.3; } /* Diminui texto pra destacar o "Copiado" */
      `;
      document.head.appendChild(s);
  }

  const styles = {
    // Barra de Progresso
    progressBarContainer: { height: "4px", background: "#f1f3f4", width: "100%", position: "relative", overflow: "hidden" },
    progressBarFill: { height: "100%", background: "linear-gradient(90deg, #4285F4, #34A853)", width: "0%", transition: "width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)", borderRadius: "0 2px 2px 0" },

    contentArea: { padding: "16px", overflowY: "auto", flexGrow: "1", background: "#FFFFFF", scrollBehavior: "smooth" },

    // Cards do Script
    card: { background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "16px", marginBottom: "16px", transition: "transform 0.2s ease, box-shadow 0.2s ease", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" },
    cardTitle: { fontSize: "12px", fontWeight: "700", color: "#5f6368", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", userSelect: "none" },

    itemRow: { display: "flex", alignItems: "flex-start", padding: "8px 8px", cursor: "pointer", borderRadius: "8px", transition: "background-color 0.1s ease", color: "#202124", fontSize: "14px", lineHeight: "1.5", marginBottom: "2px" },
    itemCompleted: { opacity: "0.6", textDecoration: "line-through", color: "#5f6368" },

    checkbox: { minWidth: "18px", height: "18px", borderRadius: "6px", border: "2px solid #DADCE0", marginRight: "12px", marginTop: "2px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)", background: "#fff" },
    
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

  function copyMessage() {
    getPageData().then(data => {
      const today = new Date().toLocaleDateString('pt-BR');

      let message = `Olá. Bom dia!\n\n` +
                    `Estou com um caso do seu cliente (${data.advertiserName || "Cliente"}) em andamento hoje (${today}). Fiz a primeira tentativa de contato agora há pouco, mas não tive sucesso.\n\n` +
                    `Farei uma nova tentativa em alguns minutos. Caso ele não atenda novamente, seguirei com o e-mail padrão de reagendamento/no-show e te mantenho no radar.\n\n` +
                    `Dados do caso para seu controle:\n\n` +
                    `Cliente: ${data.advertiserName || "---"}\n` +
                    `CID: ${data.cid || "---"}\n` +
                    `Case ID: ${data.caseId || "---"}\n` +
                    `E-mail: ${data.clientEmail || "---"}`;

      navigator.clipboard.writeText(message);
      showToast("Mensagem copiada para o AM!");
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

      <button class="csa-data-pill" id="cw-pill-message" style="width: 100%; text-align: left; margin-top: 4px; background: #E8F0FE; border: 1px solid #1A73E8; padding: 10px 14px; display: flex; align-items: center; gap: 12px;">
          <div style="background: #1A73E8; border-radius: 8px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div style="flex-grow: 1;">
              <div style="font-size:10px; font-weight:800; color:#1A73E8; text-transform:uppercase; margin-bottom:1px; letter-spacing:0.5px;">Mensagem AM</div>
              <div id="cw-ctx-message" class="csa-data-value" style="font-family:'Google Sans', sans-serif; font-size:13px; font-weight:500; color:#3C4043;">1° Aviso Attempted Contact</div>
          </div>
          <div class="csa-copy-hint">Copiado!</div>
      </button>
  `;

  const messageBtn = contextBanner.querySelector('#cw-pill-message');

  messageBtn.addEventListener('click', () => {
    copyMessage()
  })
  
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

  // 5. CONTROLES (BAU/LT + IDIOMA)
  const csaControlsDiv = document.createElement("div");
  Object.assign(csaControlsDiv.style, { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "8px" });

  const csaTypeContainer = document.createElement("div");
  Object.assign(csaTypeContainer.style, { display: "flex", borderRadius: "8px", border: "1px solid #dadce0", overflow: "hidden", background: "#fff" });
  const csaTypeBAU = document.createElement("div"); csaTypeBAU.textContent = "BAU";
  const csaTypeLT = document.createElement("div"); csaTypeLT.textContent = "LT";
  Object.assign(csaTypeBAU.style, typeBtnStyle); Object.assign(csaTypeLT.style, typeBtnStyle);
  csaTypeContainer.appendChild(csaTypeBAU); csaTypeContainer.appendChild(csaTypeLT);

  const csaLangSelect = document.createElement("select");
  Object.assign(csaLangSelect.style, styleSelect, { marginBottom: "0", width: "auto", minWidth: "90px", paddingTop: "6px", paddingBottom: "6px", paddingRight: "30px", height: "32px", backgroundPosition: "right 8px center" });
  csaLangSelect.innerHTML = `<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>`;
  csaLangSelect.value = csaCurrentLang;

  csaControlsDiv.appendChild(csaTypeContainer);
  csaControlsDiv.appendChild(csaLangSelect);
  csaContent.appendChild(csaControlsDiv);

  const csaChecklistArea = document.createElement("div");
  csaChecklistArea.id = "csa-checklist-area";
  csaContent.appendChild(csaChecklistArea);

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

    const activeColor = data.color || "#1a73e8";
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
        textSpan.innerHTML = formatScriptText(itemText);
        textSpan.style.flex = "1";

        if (isDone) {
          Object.assign(row.style, styles.itemCompleted);
          chk.style.background = activeColor; chk.style.borderColor = activeColor; chk.style.transform = "scale(1)";
          chk.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        } else {
          row.style.textDecoration = "none"; row.style.opacity = "1";
          chk.style.background = "transparent"; chk.style.borderColor = "#dadce0"; chk.style.transform = "scale(1)";
          chk.innerHTML = "";
        }

        row.onclick = () => {
          const newState = !csaCompletedTasks[key];
          csaCompletedTasks[key] = newState;
          SoundManager.playClick();

          if (newState) {
            chk.style.transform = "scale(1.2)"; setTimeout(() => chk.style.transform = "scale(1)", 150);
            Object.assign(row.style, styles.itemCompleted);
            chk.style.background = activeColor; chk.style.borderColor = activeColor;
            chk.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
          } else {
            row.style.textDecoration = "none"; row.style.opacity = "1";
            chk.style.background = "transparent"; chk.style.borderColor = "#dadce0"; chk.innerHTML = "";
          }
          updateProgressAndCounters(combinedKey, data);
        };

        row.onmouseenter = () => { if (!csaCompletedTasks[key]) { row.style.background = "#f1f3f4"; chk.style.borderColor = activeColor; } };
        row.onmouseleave = () => { if (!csaCompletedTasks[key]) { row.style.background = "transparent"; chk.style.borderColor = "#dadce0"; } };

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
    progressFill.style.background = pct === 100 ? "#34A853" : "linear-gradient(90deg, #4285F4, #34A853)";
  }

  function setActiveType(type) {
    csaCurrentType = type;
    const newActiveStyle = getRandomGoogleStyle();
    Object.assign(csaTypeBAU.style, typeBtnStyle);
    Object.assign(csaTypeLT.style, typeBtnStyle);
    Object.assign(type === "BAU" ? csaTypeBAU.style : csaTypeLT.style, newActiveStyle);
    csaBuildChecklist();
  }

  csaTypeBAU.onclick = () => setActiveType("BAU");
  csaTypeLT.onclick = () => setActiveType("LT");
  csaLangSelect.addEventListener("change", (e) => { csaCurrentLang = e.target.value; csaBuildChecklist(); });

  setActiveType(csaCurrentType);
  return toggleVisibility;
}