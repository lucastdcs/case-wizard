// src/modules/broadcast/broadcast-assistant.js

import {
  stylePopup,
  styleResizeHandle,
  makeResizable,
  showToast,
  parseEmojiCodes,
  confirmDialog
} from "../shared/utils.js";
import { SoundManager } from "../shared/sound-manager.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { BROADCAST_MESSAGES, setBroadcastMessages } from "./broadcast-data.js"; 
import { DataService } from "../shared/data-service.js";
import { getAgentEmail } from "../shared/page-data.js"; 
import { ADMINS } from "../shared/config.js";

// --- CONFIGURAÇÃO ---
const POLL_TIME_MS = 60 * 1000; 

// Inicializa estado global
window._cwIsAdmin = false;
window._cwCurrentUser = null;

export function initBroadcastAssistant() {
  const CURRENT_VERSION = "v4.9";
  let visible = false;
  let pollInterval = null;
  let currentEditingId = null;

  // --- HELPERS ---
  function formatFriendlyDate(dateInput) {
      if (!dateInput) return "";
      try {
          const date = new Date(dateInput);
          if (isNaN(date.getTime())) return String(dateInput); 
          return date.toLocaleString('pt-BR', {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
          }).replace(',', ' às'); 
      } catch (e) { return String(dateInput); }
  }

  // --- ESTILOS CSS INJETADOS ---
  if (!document.getElementById('cw-broadcast-hd-css')) {
      const s = document.createElement("style");
      s.id = 'cw-broadcast-hd-css';
      s.innerHTML = `
        @keyframes cw-pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(147, 51, 234, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0); }
        }
        
        .cw-btn-interactive {
            transition: transform 0.1s ease, background 0.2s ease;
            cursor: pointer; user-select: none;
        }
        .cw-btn-interactive:active { transform: scale(0.96); }

        /* Overlay do Editor */
        .cw-editor-overlay {
            position: absolute; inset: 0; 
            background: rgba(255, 255, 255, 0.98); 
            z-index: 200; display: flex; flex-direction: column;
            transform: translateY(100%); 
            transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        }
        .cw-editor-overlay.active { transform: translateY(0); }

        /* Inputs HD */
        .cw-hd-input {
            width: 100%; padding: 12px 14px;
            border: 1px solid #DADCE0; border-radius: 12px;
            font-size: 14px; color: #202124; background: #FFF;
            transition: border 0.2s, box-shadow 0.2s;
            box-sizing: border-box; outline: none; font-family: 'Google Sans', Roboto, sans-serif;
        }
        .cw-hd-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.1); }
        .cw-hd-input::placeholder { color: #9AA0A6; }

        .cw-radio-group { display: flex; gap: 12px; }
        .cw-radio-option {
            flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
            padding: 12px; border-radius: 12px; border: 1px solid #E0E0E0;
            font-size: 13px; font-weight: 600; cursor: pointer;
            transition: all 0.2s; position: relative; color: #5F6368;
        }
        .cw-radio-option:hover { background: #F8F9FA; }
        .cw-radio-option input { position: absolute; opacity: 0; }
        
        .cw-radio-option.info.checked { background: #E8F0FE; color: #1967D2; border-color: #1967D2; }
        .cw-radio-option.critical.checked { background: #FEE2E2; color: #B91C1C; border-color: #EF4444; }
        .cw-radio-option.success.checked { background: #DCFCE7; color: #15803D; border-color: #22C55E; }
        
        .cw-card-actions {
            display: flex; justify-content: flex-end; gap: 12px;
            padding: 12px 20px; background: #F8F9FA;
            border-top: 1px solid #F1F3F4;
        }
        .cw-action-btn {
            display: flex; align-items: center; gap: 6px;
            padding: 6px 12px; border-radius: 8px;
            font-size: 12px; font-weight: 600; cursor: pointer;
            border: 1px solid transparent; background: transparent;
            transition: all 0.2s;
        }
        .cw-action-btn.edit { color: #1967D2; }
        .cw-action-btn.edit:hover { background: #E8F0FE; }
        .cw-action-btn.delete { color: #D93025; }
        .cw-action-btn.delete:hover { background: #FCE8E6; }
      `;
      document.head.appendChild(s);
  }

  // --- ESTILOS JS ---
  const styles = {
      feedContainer: { padding: "20px 24px 80px 24px", overflowY: "auto", flexGrow: "1", background: "#F8F9FA", display: "flex", flexDirection: "column", gap: "20px" },
      
      // CARD (Fundo Branco Puro + Contraste)
      card: { 
          background: "#FFFFFF", // Fundo Branco
          borderRadius: "16px", 
          border: "1px solid rgba(0,0,0,0.12)", // Borda um pouco mais visível
          boxShadow: "0 4px 12px rgba(60,64,67,0.08)", // Sombra para destacar do fundo cinza
          overflow: "hidden", transition: "all 0.3s ease", position: "relative", width: "100%", boxSizing: "border-box", flexShrink: "0" 
      },
      cardHistory: { 
          background: "#FFFFFF", 
          borderRadius: "16px", 
          border: "1px solid rgba(0,0,0,0.05)", // Borda quase invisível
          boxShadow: "none", // Sem sombra (flat)
          opacity: "0.6", // Transparencia para indicar inativo
          filter: "grayscale(0.8)", // Cinza para reforçar histórico
          marginBottom: "16px", 
          flexShrink: "0", 
          width: "100%", 
          boxSizing: "border-box",
          position: "relative"
      },
      
      cardHeader: { padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F1F3F4" },
      typeTag: { display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.6px", padding: "4px 8px", borderRadius: "6px" },
      dateTag: { fontSize: "11px", color: "#5f6368", fontWeight: "500" },
      cardContent: { padding: "16px 20px 20px 20px" },
      msgTitle: { fontSize: "16px", fontWeight: "700", color: "#202124", marginBottom: "8px", lineHeight: "1.4" },
      msgBody: { fontSize: "14px", color: "#3c4043", lineHeight: "1.6", whiteSpace: "pre-wrap", wordBreak: "break-word" },
      msgMeta: { fontSize: "11px", color: "#9aa0a6", marginTop: "12px", display: "flex", alignItems: "center", gap: "6px" },
      
      dismissBtn: { width: "28px", height: "28px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", background: "#fff", color: "#5f6368", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", marginLeft: "12px" },

      bauContainer: { margin: "16px 24px 0 24px", padding: "16px", background: "#F3E8FD", border: "1px solid #D8B4FE", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 4px 12px rgba(147, 51, 234, 0.1)" },
      bauHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", gap:"2px" },
      bauLabel: { fontSize: "11px", fontWeight: "800", color: "#7E22CE", textTransform: "uppercase", letterSpacing: "0.8px" },
      liveIndicator: { display: "flex", alignItems: "center", gap: "8px" },
      pulseDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#9333EA", boxShadow: "0 0 0 0 rgba(147, 51, 234, 0.7)", animation: "cw-pulse 2s infinite" },
      bauSlotRow: { display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", background: "rgba(255,255,255,0.5)", borderRadius: "8px", marginBottom: "4px" },
      bauFlag: { fontSize: "18px", lineHeight: "1" },
      bauDate: { fontSize: "16px", fontWeight: "700", color: "#581C87", letterSpacing: "-0.5px" },
      
      emptyState: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 0", color: "#BDC1C6", gap: "16px", textAlign: "center" },
      historyDivider: { display: "flex", alignItems: "center", justifyContent: "center", margin: "20px 0", cursor: "pointer", color: "#1a73e8", fontSize: "13px", fontWeight: "500", gap: "8px", padding: "8px 16px", borderRadius: "20px", background: "#E8F0FE" },
      historyContainer: { display: "none", flexDirection: "column", gap: "16px", opacity: "0.8" }
  };

  const TYPE_CONFIG = {
      critical: { color: "#991B1B", bg: "#FEF2F2", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>` },
      info: { color: "#1E40AF", bg: "#EFF6FF", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>` },
      success: { color: "#166534", bg: "#F0FDF4", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>` }
  };

  // --- PARSERS & UTILS ---
  function objectToCss(obj) {
      if (!obj) return ""; 
      return Object.entries(obj).map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}:${v}`).join(';');
  }

  function parseMessageText(rawText) {
      if (!rawText || typeof rawText !== 'string') return ""; 
      let html = rawText;
      html = html.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>');
      html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      html = html.replace(/_(.*?)_/g, '<i>$1</i>');
      html = html.replace(/\n/g, '<br>');
      html = parseEmojiCodes(html);
      return html;
  }

  // --- UI SETUP ---
  const popup = document.createElement("div");
  popup.id = "broadcast-popup";
  popup.classList.add("cw-module-window");
  // Fundo do módulo: #FAFAFA
  Object.assign(popup.style, stylePopup, {
    right: "auto", left: "50%", width: "420px", height: "680px", 
    display: "flex", flexDirection: "column", transform: "translateX(-50%) scale(0.05)", 
    backgroundColor: '#FAFAFA', overflow: "hidden"
  });
  
  const animRefs = { popup, googleLine: null };

  function toggleVisibility() {
    visible = !visible;
    toggleGenieAnimation(visible, popup, "cw-btn-broadcast");
    if (visible) {
      const btn = document.getElementById("cw-btn-broadcast");
      if (btn) btn.classList.remove("has-new");
      checkForUpdates(); 
    }
  }

  const header = createStandardHeader(
    popup, "Central de Avisos", CURRENT_VERSION, "Comunicação oficial da operação.",
    animRefs, () => toggleVisibility()
  );
  
  const actionContainer = header.querySelector('.cw-header-actions') || header.lastElementChild;
  let editorOverlay = null; 

  function tryInjectAdminButton() {
      let email = null;
      try { email = getAgentEmail(); } catch(e) { console.warn("TechSol: Auth Pending"); }

      if (email) {
          const currentUser = email.split('@')[0].toLowerCase();
          const isAdmin = ADMINS.includes(currentUser);
          
          window._cwIsAdmin = isAdmin; 
          window._cwCurrentUser = currentUser;

          if (isAdmin && actionContainer && !actionContainer.querySelector('#cw-admin-btn')) {
              const addBtn = document.createElement("div");
              addBtn.id = 'cw-admin-btn';
              addBtn.className = "cw-btn-interactive";
              addBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
              Object.assign(addBtn.style, {
                  width: "32px", height: "32px", borderRadius: "50%", 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#1a73e8", background: "rgba(26, 115, 232, 0.1)",
                  marginRight: "8px"
              });
              addBtn.title = "Novo Aviso";
              addBtn.onclick = (e) => { e.stopPropagation(); openEditor(); };
              actionContainer.insertBefore(addBtn, actionContainer.firstChild);
              
              if(!editorOverlay) createEditorOverlay();
              renderFeed();
          }
      } else {
          if (!window._cwAdminRetries) window._cwAdminRetries = 0;
          if (window._cwAdminRetries < 5) {
              window._cwAdminRetries++;
              setTimeout(tryInjectAdminButton, 2000);
          }
      }
  }

  // Botão Limpar
  if(actionContainer) {
      const markAll = document.createElement("button");
      markAll.textContent = "Limpar";
      markAll.className = "cw-btn-interactive";
      Object.assign(markAll.style, { fontSize: "12px", color: "#1a73e8", background: "transparent", border: "none", padding: "8px", fontWeight: "600" });
      markAll.onclick = (e) => {
          e.stopPropagation();
          SoundManager.playSuccess();
          const allIds = BROADCAST_MESSAGES.map(m => m.id);
          localStorage.setItem("cw_read_broadcasts", JSON.stringify(allIds));
          renderFeed(); 
          updateBadge(); 
      };
      actionContainer.insertBefore(markAll, actionContainer.firstChild);
  }

  popup.appendChild(header);

  // --- ELEMENTO DE STATUS (FIXO NO TOPO) ---
  // Criamos aqui para garantir a ordem: Header -> Status -> BAU -> Feed
  const statusEl = document.createElement('div');
  statusEl.id = 'cw-update-status';
  // Fundo #FAFAFA para mesclar com o módulo
  statusEl.style.cssText = "padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;";
  popup.appendChild(statusEl);

  // --- EDITOR OVERLAY ---
  function createEditorOverlay() {
      editorOverlay = document.createElement("div");
      editorOverlay.className = "cw-editor-overlay";
      
      editorOverlay.innerHTML = `
        <div style="flex:1; overflow-y:auto; padding: 24px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
                <span id="cw-editor-title-label" style="font-size: 20px; font-weight: 700; color: #202124;">Novo Aviso</span>
                <button id="cw-bc-close-x" class="cw-btn-interactive" style="background:none; border:none; color:#5f6368; padding:8px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
            
            <div style="margin-bottom:20px;">
                <label style="font-size:12px; font-weight:700; color:#5f6368; margin-bottom:8px; display:block;">TIPO DO COMUNICADO</label>
                <div class="cw-radio-group">
                    <div class="cw-radio-option info" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="info" checked> ℹ️ Info
                    </div>
                    <div class="cw-radio-option critical" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="critical"> 🚨 Alerta
                    </div>
                    <div class="cw-radio-option success" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="success"> ✅ Sucesso
                    </div>
                </div>
            </div>

            <div style="margin-bottom:20px;">
                 <label style="font-size:12px; font-weight:700; color:#5f6368; margin-bottom:8px; display:block;">TÍTULO</label>
                 <input id="cw-bc-title" class="cw-hd-input" placeholder="Resumo do assunto">
            </div>

            <div style="margin-bottom:20px;">
                 <label style="font-size:12px; font-weight:700; color:#5f6368; margin-bottom:8px; display:block;">MENSAGEM</label>
                 <textarea id="cw-bc-text" class="cw-hd-input" placeholder="Escreva os detalhes aqui... Suporta HTML e Emojis :)" style="height:160px; resize:none; line-height:1.6;"></textarea>
            </div>
        </div>

        <div style="padding: 16px 24px; border-top: 1px solid #F1F3F4; background: #fff; display: flex; justify-content: flex-end; gap: 12px;">
            <button id="cw-bc-cancel" class="cw-btn-interactive" style="padding:10px 20px; background:white; border:1px solid #dadce0; color:#5f6368; border-radius:24px; font-weight:600; font-size:13px;">Cancelar</button>
            <button id="cw-bc-send" class="cw-btn-interactive" style="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:24px; font-weight:600; box-shadow:0 4px 12px rgba(26,115,232,0.3); font-size:13px;">Publicar</button>
        </div>
      `;

      editorOverlay.querySelectorAll('input[name="cw-bc-type"]').forEach(radio => {
          radio.addEventListener('change', () => {
              editorOverlay.querySelectorAll('.cw-radio-option').forEach(opt => opt.classList.remove('checked'));
              radio.parentElement.classList.add('checked');
          });
      });
      setTimeout(() => { 
          const def = editorOverlay.querySelector('.cw-radio-option.info');
          if(def) def.classList.add('checked');
      }, 100);

      const btnCancel = editorOverlay.querySelector('#cw-bc-cancel');
      const btnCloseX = editorOverlay.querySelector('#cw-bc-close-x');
      const btnSend = editorOverlay.querySelector('#cw-bc-send');
      
      btnCancel.onclick = closeEditor;
      btnCloseX.onclick = closeEditor;
      btnSend.onclick = handleSend;

      popup.appendChild(editorOverlay);
  }

  function openEditor(editData = null) {
      if(!editorOverlay) return;
      
      const titleLabel = editorOverlay.querySelector('#cw-editor-title-label');
      const inputTitle = editorOverlay.querySelector('#cw-bc-title');
      const inputText = editorOverlay.querySelector('#cw-bc-text');
      const btnSend = editorOverlay.querySelector('#cw-bc-send');
      
      if (editData) {
          currentEditingId = editData.id;
          titleLabel.textContent = "Editar Aviso";
          inputTitle.value = editData.title || "";
          inputText.value = editData.text || "";
          btnSend.textContent = "Salvar Alterações";
          
          const type = editData.type || 'info';
          const radio = editorOverlay.querySelector(`input[name="cw-bc-type"][value="${type}"]`);
          if(radio) radio.click();
      } else {
          currentEditingId = null;
          titleLabel.textContent = "Novo Aviso";
          inputTitle.value = "";
          inputText.value = "";
          btnSend.textContent = "Publicar";
          const infoRadio = editorOverlay.querySelector(`input[name="cw-bc-type"][value="info"]`);
          if(infoRadio) infoRadio.click();
      }

      editorOverlay.classList.add('active');
      setTimeout(() => inputTitle.focus(), 300);
  }

  function closeEditor() {
      if(editorOverlay) editorOverlay.classList.remove('active');
      currentEditingId = null;
  }

  async function handleSend() {
      const btnSend = editorOverlay.querySelector('#cw-bc-send');
      const inputTitle = editorOverlay.querySelector('#cw-bc-title');
      const inputText = editorOverlay.querySelector('#cw-bc-text');
      const typeInput = editorOverlay.querySelector('input[name="cw-bc-type"]:checked');
      const type = typeInput ? typeInput.value : 'info';

      if(!inputTitle.value.trim() || !inputText.value.trim()) {
          showToast("Preencha todos os campos!", { error: true });
          return;
      }

      btnSend.textContent = "Salvando...";
      btnSend.style.opacity = "0.7";

      let success = false;

      if (currentEditingId) {
          success = await DataService.updateBroadcast(currentEditingId, {
              title: inputTitle.value,
              text: inputText.value,
              type: type
          });
      } else {
          success = await DataService.sendBroadcast({
              title: inputTitle.value,
              text: inputText.value,
              type: type,
              author: window._cwCurrentUser || 'admin'
          });
      }

      if (success) {
          showToast(currentEditingId ? "Atualizado!" : "Publicado!");
          SoundManager.playSuccess();
          closeEditor();
          setTimeout(() => checkForUpdates(), 1500);
      } else {
          showToast("Erro ao salvar. Verifique a conexão.", { error: true });
          btnSend.textContent = currentEditingId ? "Salvar Alterações" : "Publicar";
          btnSend.style.opacity = "1";
      }
  }

  async function handleDelete(id) {
      const confirmed = await confirmDialog("Confirma a exclusão deste aviso?", { danger: true });
      if(confirmed) {
          const success = await DataService.deleteBroadcast(id);
          if(success) {
              showToast("Aviso removido.");
              SoundManager.playClick();
              const oldMsg = BROADCAST_MESSAGES.findIndex(m => m.id === id);
              if(oldMsg > -1) BROADCAST_MESSAGES.splice(oldMsg, 1);
              renderFeed(); 
              setTimeout(() => checkForUpdates(), 1500);
          } else {
              showToast("Erro ao excluir.", { error: true });
          }
      }
  }

  const feed = document.createElement("div");
  feed.className = "cw-nice-scroll";
  Object.assign(feed.style, styles.feedContainer);
  popup.appendChild(feed);

  async function checkForUpdates() {
      if (visible) {
          statusEl.style.display = 'block';
          statusEl.innerHTML = '🔄 Sincronizando...';
      }

      try {
          const data = await DataService.fetchData();
          if (data && data.broadcast) {
              setBroadcastMessages(data.broadcast);
              updateBadge();
              if (visible) {
                  renderFeed(); 
                  statusEl.innerHTML = `<span style="color:#137333">✓ Atualizado</span>`;
                  setTimeout(() => { statusEl.style.display = 'none'; }, 1500);
              }
          }
      } catch (error) {
          if (visible) statusEl.innerHTML = '⚠️ Offline';
      }
  }

  function updateBadge() {
      const btn = document.getElementById("cw-btn-broadcast");
      if (!btn) return;
      const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      const hasUnread = BROADCAST_MESSAGES.some(m => !readMessages.includes(m.id));
      if (hasUnread) {
          btn.classList.add("has-new");
          if (!btn.querySelector('.cw-badge')) {
              const badge = document.createElement('div');
              badge.className = 'cw-badge';
              Object.assign(badge.style, {
                  position: "absolute", top: "8px", right: "8px",
                  width: "8px", height: "8px", backgroundColor: "#d93025",
                  borderRadius: "50%", border: "1px solid #fff", zIndex: "10"
              });
              btn.appendChild(badge);
          }
      } else {
          btn.classList.remove("has-new");
          const badge = btn.querySelector('.cw-badge');
          if (badge) badge.remove();
      }
  }

  function renderFeed() {
      feed.innerHTML = "";
      const oldBau = popup.querySelector('#cw-bau-widget');
      if (oldBau) oldBau.remove();

      const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      let allMessages = [...BROADCAST_MESSAGES].sort((a, b) => {
          const dateA = new Date(a.date).getTime() || 0;
          const dateB = new Date(b.date).getTime() || 0;
          return dateB - dateA;
      });

      // 1. WIDGET BAU
      const bauIndex = allMessages.findIndex(m => m.title && m.title.toLowerCase().includes("disponibilidade bau"));
      
      if (bauIndex !== -1) {
          const bauMessage = allMessages[bauIndex];
          allMessages.splice(bauIndex, 1);

          const bauWidget = document.createElement("div");
          bauWidget.id = "cw-bau-widget";
          Object.assign(bauWidget.style, styles.bauContainer);

          const extractedSlots = [];
          const lines = (bauMessage.text || "").split('\n');
          const dateRegex = /\d{1,2}\/\d{1,2}/;
          
          // Variável de "Memória" (Estado atual)
          let currentContextFlag = "📅"; 

          lines.forEach(line => {
             // 1. Tenta detectar o contexto (Região/País) na linha, mesmo sem data
             // Roda antes de checar a data para atualizar o "cabeçalho" atual
             if (/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(line)) {
                 currentContextFlag = "🇧🇷";
             } else if (/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(line)) {
                 currentContextFlag = "🇪🇸";
             }

             // 2. Procura a data
             const dateMatch = line.match(dateRegex);
             
             if (dateMatch) {
                 const date = dateMatch[0];
                 
                 // Se na PRÓPRIA linha da data tiver uma bandeira específica, ela vence.
                 // Se não, usa a bandeira que estava na memória (do cabeçalho anterior).
                 let lineFlag = currentContextFlag;
                 
                 // (Opcional) Reforço: Se a linha atual tiver explicitamente outra flag, atualiza
                 if (/🇧🇷|🇵🇹|PT|BR/i.test(line)) lineFlag = "🇧🇷";
                 else if (/🇪🇸|🇲🇽|ES|LATAM/i.test(line)) lineFlag = "🇪🇸";

                 const exists = extractedSlots.some(s => s.flag === lineFlag && s.date === date);
                 if (!exists) extractedSlots.push({ flag: lineFlag, date });
             }
          });

          if (extractedSlots.length === 0) {
             const anyDates = (bauMessage.text || "").match(/\d{1,2}\/\d{1,2}/g);
             if (anyDates) [...new Set(anyDates)].forEach(d => extractedSlots.push({ flag: "📅", date: d }));
          }

          let contentHTML = "";
          // Botões no rodapé do BAU
          let buttonsHTML = `<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>`;

          if (window._cwIsAdmin) {
              buttonsHTML = `
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${buttonsHTML}
              `;
          }
          
          if (extractedSlots.length > 0) {
              const slotsHTML = extractedSlots.map(slot => `
                  <div style="${objectToCss(styles.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${objectToCss(styles.bauFlag)}">${slot.flag}</span>
                      <span style="${objectToCss(styles.bauDate)}">${slot.date}</span>
                  </div>
              `).join('');

              contentHTML = `
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${slotsHTML}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${buttonsHTML}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${parseMessageText(bauMessage.text)}</div>
              `;
          } else {
              contentHTML = `
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${parseMessageText(bauMessage.text)}</div>
                    ${window._cwIsAdmin ? `<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">✏️</button></div>` : ''}
                </div>
              `;
          }

          bauWidget.innerHTML = `
              <div style="${objectToCss(styles.bauHeader)}; margin-bottom:8px;">
                  <div style="${objectToCss(styles.liveIndicator)}">
                      <div style="${objectToCss(styles.pulseDot)}"></div>
                      <span style="${objectToCss(styles.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${formatFriendlyDate(bauMessage.date)}</div>
              </div>
              ${contentHTML}
          `;

          // BAU is inserted after STATUS (cw-update-status)
          statusEl.after(bauWidget);

          const toggleBtn = bauWidget.querySelector('#cw-bau-toggle-btn');
          const fullText = bauWidget.querySelector('#cw-bau-full');
          if (toggleBtn && fullText) {
              toggleBtn.onclick = () => {
                  const isHidden = fullText.style.display === "none";
                  fullText.style.display = isHidden ? "block" : "none";
                  toggleBtn.textContent = isHidden ? "Ocultar" : "Detalhes";
              };
          }
          if(window._cwIsAdmin) {
              const editBtn = bauWidget.querySelector('.cw-bau-edit');
              if(editBtn) editBtn.onclick = () => openEditor(bauMessage);
          }
      }

      // 2. LISTA
      const sortedMessages = allMessages.sort((a, b) => {
          const aRead = readMessages.includes(a.id);
          const bRead = readMessages.includes(b.id);
          return aRead === bRead ? 0 : aRead ? 1 : -1;
      });

      if (sortedMessages.length === 0 && !bauIndex) {
           const empty = document.createElement("div");
           Object.assign(empty.style, styles.emptyState);
           empty.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `;
           feed.appendChild(empty);
      }
      
      const unreadMsgs = sortedMessages.filter(m => !readMessages.includes(m.id));
      const readMsgs = sortedMessages.filter(m => readMessages.includes(m.id));

      unreadMsgs.forEach(msg => feed.appendChild(createCard(msg, false)));

      if (readMsgs.length > 0) {
          const divider = document.createElement("div");
          Object.assign(divider.style, styles.historyDivider);
          divider.innerHTML = `<span>Histórico (${readMsgs.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
          
          const historyContainer = document.createElement("div");
          Object.assign(historyContainer.style, styles.historyContainer);
          readMsgs.forEach(msg => historyContainer.appendChild(createCard(msg, true)));

          let isHistoryOpen = false;
          divider.onclick = () => {
              SoundManager.playClick();
              isHistoryOpen = !isHistoryOpen;
              historyContainer.style.display = isHistoryOpen ? "flex" : "none";
              divider.querySelector('svg').style.transform = isHistoryOpen ? "rotate(180deg)" : "rotate(0deg)";
          };
          feed.appendChild(divider);
          feed.appendChild(historyContainer);
      }
  }

  function createCard(msg, isHistory) {
    const card = document.createElement("div");
    Object.assign(card.style, isHistory ? styles.cardHistory : styles.card);
    const theme = TYPE_CONFIG[msg.type] || TYPE_CONFIG.info;

    // Header
    const cardHead = document.createElement("div");
    Object.assign(cardHead.style, styles.cardHeader);
    
    const typeLabel = document.createElement("div");
    Object.assign(typeLabel.style, styles.typeTag, { color: theme.color, background: theme.bg });
    typeLabel.innerHTML = `${theme.icon} <span>${msg.type}</span>`;
    
    const dateLabel = document.createElement("span");
    Object.assign(dateLabel.style, styles.dateTag);
    dateLabel.textContent = formatFriendlyDate(msg.date);

    cardHead.appendChild(typeLabel);
    
    // Dismiss
    if (!isHistory) {
        const dismissBtn = document.createElement("button");
        dismissBtn.className = "cw-btn-interactive";
        Object.assign(dismissBtn.style, styles.dismissBtn);
        dismissBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        dismissBtn.onmouseenter = () => { dismissBtn.style.color = "#1e8e3e"; dismissBtn.style.background = "#e6f4ea"; dismissBtn.style.borderColor = "#1e8e3e"; };
        dismissBtn.onmouseleave = () => { dismissBtn.style.color = "#5f6368"; dismissBtn.style.background = "#fff"; dismissBtn.style.borderColor = "rgba(0,0,0,0.1)"; };
        dismissBtn.onclick = (e) => {
            e.stopPropagation();
            SoundManager.playClick();
            card.style.transform = "translateX(20px)";
            card.style.opacity = "0";
            setTimeout(() => {
                const currentRead = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
                currentRead.push(msg.id);
                localStorage.setItem("cw_read_broadcasts", JSON.stringify(currentRead));
                renderFeed(); 
                updateBadge(); 
            }, 200);
        };
        cardHead.appendChild(dismissBtn);
    } else {
        cardHead.appendChild(dateLabel);
    }
    
    // Content
    const bodyContainer = document.createElement("div");
    Object.assign(bodyContainer.style, styles.cardContent);
    
    const title = document.createElement("div");
    Object.assign(title.style, styles.msgTitle);
    title.textContent = msg.title;
    
    const text = document.createElement("div");
    Object.assign(text.style, styles.msgBody);
    text.innerHTML = parseMessageText(msg.text);
    
    const meta = document.createElement("div");
    Object.assign(meta.style, styles.msgMeta);
    meta.innerHTML = `Publicado por <b>${msg.author || 'Sistema'}</b>`;
    if(!isHistory) meta.innerHTML += ` • ${formatFriendlyDate(msg.date)}`;

    bodyContainer.appendChild(title);
    bodyContainer.appendChild(text);
    bodyContainer.appendChild(meta);

    card.appendChild(cardHead);
    card.appendChild(bodyContainer);

    // --- CRUD FOOTER (Admin) ---
    if (window._cwIsAdmin) {
        const cardActions = document.createElement("div");
        cardActions.className = "cw-card-actions";
        
        const btnEdit = document.createElement("button");
        btnEdit.className = "cw-action-btn edit";
        btnEdit.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar`;
        btnEdit.onclick = () => openEditor(msg);

        const btnDel = document.createElement("button");
        btnDel.className = "cw-action-btn delete";
        btnDel.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir`;
        btnDel.onclick = () => handleDelete(msg.id);

        cardActions.appendChild(btnEdit);
        cardActions.appendChild(btnDel);
        card.appendChild(cardActions);
    }

    return card;
  }

  // --- STARTUP ---
  const cachedData = DataService.getCachedBroadcasts();
  if (cachedData.length > 0) {
      setBroadcastMessages(cachedData);
      renderFeed();
  }
  
  setTimeout(tryInjectAdminButton, 500);
  checkForUpdates();
  if (!pollInterval) pollInterval = setInterval(checkForUpdates, POLL_TIME_MS);

  const resizeHandle = document.createElement("div");
  Object.assign(resizeHandle.style, styleResizeHandle);
  resizeHandle.className = "no-drag";
  popup.appendChild(resizeHandle);
  makeResizable(popup, resizeHandle);
  document.body.appendChild(popup);

  const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
  const hasUnread = BROADCAST_MESSAGES.some((m) => !readMessages.includes(m.id));

  return { toggle: toggleVisibility, hasUnread };
}