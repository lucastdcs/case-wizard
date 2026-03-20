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

  // --- CORES (Alinhadas com o Email Assistant) ---
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

  // --- ESTILOS INJETADOS (Animações e UI Moderna) ---
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

        /* Estilos de Abas */
        .csa-tabs-container {
            display: flex;
            background: #E3E3E8;
            padding: 2px;
            border-radius: 10px;
            margin-bottom: 16px;
            position: relative;
        }
        .csa-tab {
            flex: 1;
            text-align: center;
            padding: 6px 12px;
            font-size: 13px;
            font-weight: 600;
            color: ${COLORS.textSecondary};
            cursor: pointer;
            z-index: 1;
            transition: color 0.2s ease;
            user-select: none;
        }
        .csa-tab.active {
            color: ${COLORS.textPrimary};
        }
        .csa-tab-slider {
            position: absolute;
            background: #FFFFFF;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            z-index: 0;
        }

        /* Checkbox e Strikethrough */
        .csa-checkbox {
            min-width: 20px;
            height: 20px;
            border-radius: 6px;
            border: 2px solid #DADCE0;
            margin-right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            background: #fff;
        }
        .csa-item-text {
            position: relative;
            transition: color 0.3s ease;
        }
        .csa-item-text::after {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 0;
            height: 1.5px;
            background: ${COLORS.textSecondary};
            transition: width 0.3s ease;
        }
        .csa-item-completed .csa-item-text {
            color: ${COLORS.textSecondary};
            opacity: 0.7;
        }
        .csa-item-completed .csa-item-text::after {
            width: 100%;
        }

        /* Textarea de Mensagem */
        .csa-message-area {
            width: 100%;
            height: 80px;
            padding: 10px;
            border-radius: 8px;
            border: 1.5px solid ${COLORS.borderSubtle};
            background: #FBFBFD;
            font-family: inherit;
            font-size: 13px;
            line-height: 1.4;
            color: ${COLORS.textPrimary};
            resize: none;
            outline: none;
            transition: all 0.2s ease;
        }
        .csa-message-area:focus {
            border-color: ${COLORS.primary};
            background: #FFFFFF;
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }
      `;
      document.head.appendChild(s);
  }

  const styles = {
    // Barra de Progresso
    progressBarContainer: { height: "6px", background: "#E3E3E8", width: "100%", position: "relative", overflow: "hidden" },
    progressBarFill: { height: "100%", background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.success})`, width: "0%", transition: "width 0.5s cubic-bezier(0.25, 1, 0.5, 1)", borderRadius: "0 3px 3px 0" },

    contentArea: { padding: "16px", overflowY: "auto", flexGrow: "1", background: COLORS.bgApp, scrollBehavior: "smooth" },

    // Cards do Script
    card: { background: COLORS.bgSurface, border: `1px solid ${COLORS.borderSubtle}`, borderRadius: "12px", padding: "16px", marginBottom: "16px", transition: "transform 0.2s ease, box-shadow 0.2s ease", boxShadow: COLORS.shadowCard },
    cardTitle: { fontSize: "11px", fontWeight: "700", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", userSelect: "none" },

    itemRow: { display: "flex", alignItems: "flex-start", padding: "10px 8px", cursor: "pointer", borderRadius: "10px", transition: "background-color 0.2s ease", color: COLORS.textPrimary, fontSize: "14px", lineHeight: "1.5", marginBottom: "4px" },
    
    // Footer
    footer: { padding: "12px 16px", borderTop: `1px solid ${COLORS.borderSubtle}`, background: COLORS.bgSurface, display: "flex", justifyContent: "space-between", alignItems: "center" },
    resetBtn: { background: "transparent", border: "none", color: "#d93025", fontSize: "12px", fontWeight: "600", cursor: "pointer", padding: "6px 12px", borderRadius: "20px", transition: "background 0.2s ease", display: "flex", alignItems: "center", gap: "4px" },

    // Context Banner
    contextBanner: {
        padding: "20px",
        background: COLORS.bgSurface,
        borderBottom: `1px solid ${COLORS.borderSubtle}`,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
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
    right: "auto", left: "50%", width: "450px", height: "720px",
    display: "flex", flexDirection: "column", transform: "translateX(-50%) scale(0.05)",
    borderRadius: "12px", overflow: "hidden", backgroundColor: COLORS.bgApp
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

          updateMessageTextarea(data);
      });
  }

  function updateMessageTextarea(data) {
      const textarea = csaPopup.querySelector('#cw-msg-textarea');
      if (!textarea) return;

      // Só atualiza se o usuário não tiver alterado manualmente
      if (textarea.dataset.userEdited === "true") return;

      const today = new Date().toLocaleDateString('pt-BR');
      const message = `Olá. Bom dia!\n\n` +
                    `Estou com um caso do seu cliente (${data.advertiserName || "Cliente"}) em andamento hoje (${today}). Fiz a primeira tentativa de contato agora há pouco, mas não tive sucesso.\n\n` +
                    `Farei uma nova tentativa em alguns minutos. Caso ele não atenda novamente, seguirei com o e-mail padrão de reagendamento/no-show e te mantenho no radar.\n\n` +
                    `Dados do caso para seu controle:\n\n` +
                    `Cliente: ${data.advertiserName || "---"}\n` +
                    `CID: ${data.cid || "---"}\n` +
                    `Case ID: ${data.caseId || "---"}\n` +
                    `E-mail: ${data.clientEmail || "---"}`;

      textarea.value = message;
  }

  function toggleVisibility() {
    csaVisible = !csaVisible;
    toggleGenieAnimation(csaVisible, csaPopup, 'cw-btn-script');
    
    if (csaVisible) {
        updateContextData(); 
        if (!monitorInterval) monitorInterval = setInterval(updateContextData, 5000);
    } else {
        if (monitorInterval) { clearInterval(monitorInterval); monitorInterval = null; }
    }
  }

  const csaHeader = createStandardHeader(
    csaPopup, "Call Script", CURRENT_VERSION, "Guia interativo para condução de chamadas.",
    animRefs, () => { toggleVisibility(); }
  );
  csaPopup.appendChild(csaHeader);

  // === BANNER DE CONTEXTO ===
  const contextBanner = document.createElement("div");
  Object.assign(contextBanner.style, styles.contextBanner);
  
  contextBanner.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
              <div class="csa-live-dot" title="Monitoramento Ativo"></div>
              <span id="cw-ctx-name" style="font-family:'Google Sans'; font-size:16px; font-weight:600; color:${COLORS.textPrimary};">Carregando...</span>
          </div>
          <div style="font-size:10px; font-weight:700; color:${COLORS.primary}; background:${COLORS.primaryBg}; padding:2px 8px; border-radius:4px; text-transform:uppercase;">Live</div>
      </div>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div style="font-size:9px; font-weight:700; color:${COLORS.textSecondary}; text-transform:uppercase; margin-bottom:2px; letter-spacing:0.5px;">CID (Conta)</div>
              <div id="cw-ctx-cid" class="csa-data-value" style="font-family:'Roboto Mono', monospace; font-size:13px; font-weight:500; color:${COLORS.primary};">---</div>
              <div class="csa-copy-hint">Copiado!</div>
          </div>
          
          <div class="csa-data-pill" id="cw-pill-email">
              <div style="font-size:9px; font-weight:700; color:${COLORS.textSecondary}; text-transform:uppercase; margin-bottom:2px; letter-spacing:0.5px;">Email de Contato</div>
              <div id="cw-ctx-email" class="csa-data-value" style="font-family:'Roboto', sans-serif; font-size:13px; color:${COLORS.textPrimary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">---</div>
              <div class="csa-copy-hint">Copiado!</div>
          </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 4px; padding: 14px; background: #F8F9FA; border: 1px solid ${COLORS.borderSubtle}; border-radius: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="font-size:10px; font-weight:800; color:${COLORS.primary}; text-transform:uppercase; letter-spacing:0.5px; display:flex; align-items:center; gap:6px;">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                 Mensagem AM
              </div>
              <button id="cw-copy-msg-btn" style="background: ${COLORS.primary}; color: white; border: none; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s;">Copiar</button>
          </div>
          <textarea id="cw-msg-textarea" class="csa-message-area" placeholder="Carregando mensagem..."></textarea>
      </div>
  `;

  const textarea = contextBanner.querySelector('#cw-msg-textarea');
  textarea.addEventListener('input', () => {
      textarea.dataset.userEdited = "true";
  });

  const copyMsgBtn = contextBanner.querySelector('#cw-copy-msg-btn');
  copyMsgBtn.onclick = () => {
      navigator.clipboard.writeText(textarea.value);
      SoundManager.playSuccess();
      showToast("Mensagem copiada!");
      copyMsgBtn.textContent = "Copiado!";
      copyMsgBtn.style.background = COLORS.success;
      setTimeout(() => {
          copyMsgBtn.textContent = "Copiar";
          copyMsgBtn.style.background = COLORS.primary;
      }, 2000);
  };

  // Lógica de Cópia Pills
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
    if (confirm("Deseja resetar todo o progresso do script?")) {
        for (let key in csaCompletedTasks) delete csaCompletedTasks[key];
        csaBuildChecklist();
    }
  };

  footer.appendChild(credit);
  footer.appendChild(resetBtn);
  csaPopup.appendChild(footer);

  // --- CONTROLES DE ABAS ---
  function createTabs(options, defaultValue, onChange) {
      const container = document.createElement("div");
      container.className = "csa-tabs-container";

      const slider = document.createElement("div");
      slider.className = "csa-tab-slider";
      container.appendChild(slider);

      const tabEls = options.map((opt, idx) => {
          const tab = document.createElement("div");
          tab.className = "csa-tab";
          if (opt.value === defaultValue) tab.classList.add("active");
          tab.textContent = opt.label;
          tab.onclick = () => {
              tabEls.forEach(t => t.classList.remove("active"));
              tab.classList.add("active");
              updateSlider(idx);
              onChange(opt.value);
          };
          container.appendChild(tab);
          return tab;
      });

      function updateSlider(index) {
          const width = 100 / options.length;
          slider.style.width = `calc(${width}% - 4px)`;
          slider.style.left = `calc(${index * width}% + 2px)`;
          slider.style.top = "2px";
          slider.style.bottom = "2px";
      }

      // Delay para garantir que o DOM renderizou
      setTimeout(() => {
          const initialIndex = options.findIndex(o => o.value === defaultValue);
          updateSlider(initialIndex);
      }, 0);

      return container;
  }

  const langTabs = createTabs([
      { label: "Português", value: "PT" },
      { label: "Español", value: "ES" },
      { label: "English", value: "EN" }
  ], csaCurrentLang, (val) => {
      csaCurrentLang = val;
      csaBuildChecklist();
  });

  const typeTabs = createTabs([
      { label: "BAU (Standard)", value: "BAU" },
      { label: "LT (Long Tail)", value: "LT" }
  ], csaCurrentType, (val) => {
      csaCurrentType = val;
      csaBuildChecklist();
  });

  csaContent.appendChild(langTabs);
  csaContent.appendChild(typeTabs);

  const csaChecklistArea = document.createElement("div");
  csaChecklistArea.id = "csa-checklist-area";
  csaContent.appendChild(csaChecklistArea);

  const resizeHandle = document.createElement('div');
  Object.assign(resizeHandle.style, styleResizeHandle);
  resizeHandle.className = "no-drag"; resizeHandle.title = "Redimensionar";
  csaPopup.appendChild(resizeHandle);
  makeResizable(csaPopup, resizeHandle);

  document.body.appendChild(csaPopup);

  setupCopy('#cw-pill-cid', '#cw-ctx-cid');
  setupCopy('#cw-pill-email', '#cw-ctx-email');

  function csaBuildChecklist() {
    csaChecklistArea.innerHTML = "";
    const combinedKey = `${csaCurrentLang} ${csaCurrentType}`;
    const data = csaChecklistData[combinedKey] || csaChecklistData[`${csaCurrentLang} BAU`];

    if (!data) {
      csaChecklistArea.innerHTML = `<div style="padding: 30px; text-align: center; color: ${COLORS.textSecondary}; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">🔍</div><div>Script não disponível para esta seleção.</div></div>`;
      updateProgressUI(0, 0);
      return;
    }

    let totalItems = 0; let completedItems = 0;
    ["inicio", "meio", "fim"].forEach(k => { if (data[k]) totalItems += data[k].length; });

    ["inicio", "meio", "fim"].forEach((groupKey) => {
      const items = data[groupKey];
      if (!items || items.length === 0) return;

      const card = document.createElement("div");
      Object.assign(card.style, styles.card);

      const cardTitle = document.createElement("div");
      Object.assign(cardTitle.style, styles.cardTitle);

      let titleText = "";
      if (groupKey === "inicio") {
          titleText = csaCurrentLang === "ES" ? "Apertura" : (csaCurrentLang === "EN" ? "Opening" : "Abertura");
      } else if (groupKey === "meio") {
          titleText = csaCurrentLang === "ES" ? "Implementación" : (csaCurrentLang === "EN" ? "Implementation" : "Implementação");
      } else if (groupKey === "fim") {
          titleText = csaCurrentLang === "ES" ? "Cierre" : (csaCurrentLang === "EN" ? "Closing" : "Fechamento");
      }

      cardTitle.textContent = titleText;
      const counter = document.createElement("span");
      Object.assign(counter.style, { fontSize: "10px", background: "#f1f3f4", padding: "2px 8px", borderRadius: "10px", color: COLORS.textSecondary });
      cardTitle.appendChild(counter);
      card.appendChild(cardTitle);

      let groupDoneCount = 0;

      items.forEach((itemText, index) => {
        const key = `${combinedKey}-${groupKey}-${index}`;
        const isDone = !!csaCompletedTasks[key];
        if (isDone) { completedItems++; groupDoneCount++; }

        const row = document.createElement("div");
        Object.assign(row.style, styles.itemRow);
        if (isDone) row.classList.add("csa-item-completed");

        const chk = document.createElement("div");
        chk.className = "csa-checkbox";

        const textSpan = document.createElement("span");
        textSpan.className = "csa-item-text";
        textSpan.textContent = itemText;

        if (isDone) {
          chk.style.background = COLORS.primary; chk.style.borderColor = COLORS.primary;
          chk.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        }

        row.onclick = () => {
          const newState = !csaCompletedTasks[key];
          csaCompletedTasks[key] = newState;
          SoundManager.playClick();

          if (newState) {
            row.classList.add("csa-item-completed");
            chk.style.background = COLORS.primary; chk.style.borderColor = COLORS.primary;
            chk.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            chk.style.transform = "scale(1.1)"; setTimeout(() => chk.style.transform = "scale(1)", 150);
          } else {
            row.classList.remove("csa-item-completed");
            chk.style.background = "transparent"; chk.style.borderColor = "#dadce0"; chk.innerHTML = "";
          }
          updateProgressAndCounters(combinedKey, data);
        };

        row.onmouseenter = () => { if (!csaCompletedTasks[key]) { row.style.background = "rgba(0, 122, 255, 0.05)"; chk.style.borderColor = COLORS.primary; } };
        row.onmouseleave = () => { if (!csaCompletedTasks[key]) { row.style.background = "transparent"; chk.style.borderColor = "#dadce0"; } };

        row.appendChild(chk); row.appendChild(textSpan);
        card.appendChild(row);
      });

      if (groupDoneCount === items.length && items.length > 0) {
        counter.style.color = COLORS.success; counter.style.background = "rgba(52, 168, 83, 0.1)";
        card.style.borderLeft = `4px solid ${COLORS.success}`;
      }
      counter.textContent = `${groupDoneCount}/${items.length}`;
      csaChecklistArea.appendChild(card);
    });
    updateProgressUI(totalItems, completedItems);
  }

  let renderTimeout = null;
  function updateProgressAndCounters(combinedKey, data) {
    let total = 0; let completed = 0;
    ["inicio", "meio", "fim"].forEach(groupKey => {
      const items = data[groupKey] || [];
      total += items.length;
      items.forEach((_, idx) => { if (csaCompletedTasks[`${combinedKey}-${groupKey}-${idx}`]) completed++; });
    });
    updateProgressUI(total, completed);
    // Debounce re-render to avoid flickering
    if (renderTimeout) clearTimeout(renderTimeout);
    renderTimeout = setTimeout(() => csaBuildChecklist(), 400);
  }

  function updateProgressUI(total, completed) {
    const pct = total === 0 ? 0 : (completed / total) * 100;
    progressFill.style.width = `${pct}%`;
    if (pct === 100) {
        progressFill.style.background = COLORS.success;
        SoundManager.playSuccess();
    } else {
        progressFill.style.background = `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.success})`;
    }
  }

  csaBuildChecklist();
  return toggleVisibility;
}