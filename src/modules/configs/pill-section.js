// src/modules/configs/pill-section.js
//
// Seção "Pílula e Gaveta" de Configurações: onde o agente escolhe quais módulos
// ficam fixados na pílula flutuante (e em que ordem) e quais ficam guardados na
// gaveta, atrás do botão de grade. O modelo e a persistência vivem em
// shared/pill-layout.js; aqui é só a tela.
//
// A pílula reage na hora (PillLayoutService avisa antes de esperar a nuvem), e
// como ela fica aberta enquanto Configurações está aberto - um módulo ativo a
// impede de recolher -, o agente vê o resultado do arrasto acontecendo.

import { SoundManager } from "../shared/sound-manager.js";
import { confirmDialog, showToast } from "../shared/utils.js";
import { PillLayoutService, MAX_PINNED, moduleLabel } from "../shared/pill-layout.js";
import { moduleIcon } from "../shared/command-center.js";

const GRIP = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>`;
// Setas para a lista de destino: para a gaveta (baixo) e para a pílula (cima).
const TO_DRAWER = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>`;
const TO_PILL = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>`;

function injectStyles(COLORS) {
    if (document.getElementById("cw-pill-section-styles")) return;
    const style = document.createElement("style");
    style.id = "cw-pill-section-styles";
    style.innerHTML = `
        .cw-pl-group + .cw-pl-group { margin-top: 4px; }
        .cw-pl-head {
            display: flex; align-items: center; justify-content: space-between;
            font-size: 11px; font-weight: 700; color: ${COLORS.textSub};
            text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
        }
        .cw-pl-count { font-weight: 600; letter-spacing: 0; }
        .cw-pl-count.full { color: ${COLORS.warnText}; }
        /* Altura mínima: arrastar para uma lista vazia precisa de onde soltar. */
        .cw-pl-list { display: flex; flex-direction: column; gap: 6px; min-height: 44px; border-radius: 10px; }
        .cw-pl-list.drop-target { outline: 2px dashed ${COLORS.primary}; outline-offset: 2px; }
        .cw-pl-empty {
            font-size: 12px; color: ${COLORS.textSub}; text-align: center;
            padding: 12px; border: 1px dashed ${COLORS.border}; border-radius: 10px;
        }
        .cw-pl-item {
            display: flex; align-items: center; gap: 10px; padding: 8px 10px;
            border: 1px solid ${COLORS.border}; border-radius: 10px; background: #fff;
            transition: border-color 0.2s var(--cw-ease-standard),
                        box-shadow 0.2s var(--cw-ease-standard),
                        opacity 0.2s var(--cw-ease-standard);
        }
        .cw-pl-item:hover { border-color: #bdc1c6; }
        .cw-pl-item.dragging { opacity: 0.4; }
        .cw-pl-item.drop-target { border-color: ${COLORS.primary}; box-shadow: 0 0 0 2px rgba(26,115,232,0.15); }
        .cw-pl-grip {
            color: #9aa0a6; cursor: grab; display: flex; background: none; border: none;
            padding: 2px; border-radius: 4px; flex-shrink: 0;
        }
        .cw-pl-grip:active { cursor: grabbing; }
        .cw-pl-icon {
            width: 28px; height: 28px; border-radius: 8px; background: #F1F3F4; color: #5F6368;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .cw-pl-icon svg { width: 18px; height: 18px; fill: currentColor; }
        .cw-pl-label {
            flex: 1; min-width: 0; font-size: 13px; font-weight: 600; color: ${COLORS.text};
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cw-pl-move {
            width: 28px; height: 28px; flex-shrink: 0; border-radius: 8px; border: none;
            background: transparent; color: ${COLORS.textSub}; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: background 0.15s var(--cw-ease-standard), color 0.15s var(--cw-ease-standard);
        }
        .cw-pl-move:hover:not(:disabled) { background: #f1f3f4; color: ${COLORS.text}; }
        .cw-pl-move:disabled { opacity: 0.35; cursor: not-allowed; }
        .cw-pl-reset {
            margin-top: 4px; width: 100%; padding: 10px; border-radius: 10px;
            border: 1px dashed ${COLORS.border}; background: transparent; cursor: pointer;
            font-family: inherit; font-weight: 600; font-size: 12px; color: ${COLORS.textSub};
            transition: all 0.2s var(--cw-ease-standard);
        }
        .cw-pl-reset:hover { border-color: ${COLORS.primary}; color: ${COLORS.primary}; }
        .cw-pl-grip:focus-visible, .cw-pl-move:focus-visible, .cw-pl-reset:focus-visible {
            outline: 2px solid ${COLORS.primary}; outline-offset: 1px;
        }
        @media (prefers-reduced-motion: reduce) {
            .cw-pl-item, .cw-pl-move, .cw-pl-reset { transition: none !important; }
        }
    `;
    document.head.appendChild(style);
}

// t: tradutor de configs-assistant.js. COLORS: mesma paleta da tela.
export function createPillSection(t, COLORS) {
    injectStyles(COLORS);

    const section = document.createElement("div");
    section.className = "cw-configs-section";
    section.innerHTML = `
        <div class="cw-configs-section-title js-pl-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-desc js-pl-desc" style="margin-top:0;"></div>
            <div class="cw-pl-group">
                <div class="cw-pl-head"><span class="js-pl-pinned-title"></span><span class="cw-pl-count js-pl-count"></span></div>
                <div class="cw-pl-list js-pl-list-pinned" data-list="pinned"></div>
            </div>
            <div class="cw-pl-group">
                <div class="cw-pl-head"><span class="js-pl-drawer-title"></span></div>
                <div class="cw-pl-list js-pl-list-drawer" data-list="drawer"></div>
            </div>
            <button type="button" class="cw-pl-reset js-pl-reset"></button>
        </div>
    `;

    const lists = {
        pinned: section.querySelector(".js-pl-list-pinned"),
        drawer: section.querySelector(".js-pl-list-drawer"),
    };
    const fill = (text) => text.replace("{max}", MAX_PINNED);

    // Síncrono de propósito: o serviço decide e repinta na hora, e só a nuvem é
    // assíncrona. Som, toast e foco acompanham o gesto, e não o JSONP - esperar
    // a nuvem aqui fazia o teclado perder o lugar por segundos.
    function move(id, list, index) {
        const result = PillLayoutService.move(id, list, index);
        if (!result.ok) {
            if (result.reason === "full") {
                SoundManager.playError();
                showToast(fill(t("plFull")), { error: true });
            }
            return false;
        }
        SoundManager.playClick();
        return true;
    }

    // Reencontra o punho pelo ID, não pela posição: com a lista reordenada o
    // índice antigo aponta para outro item e o foco do teclado se perderia.
    function refocusGrip(id) {
        const grip = section.querySelector(`.cw-pl-item[data-id="${id}"] .cw-pl-grip`);
        if (grip) grip.focus();
    }

    function wireItem(item, id, list, index, total, full) {
        const grip = item.querySelector(".cw-pl-grip");
        const btn = item.querySelector(".cw-pl-move");

        btn.onclick = () => move(id, list === "pinned" ? "drawer" : "pinned", Infinity);

        grip.onkeydown = (e) => {
            const delta = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0;
            if (!delta) return;
            e.preventDefault();
            const dest = index + delta;
            if (dest < 0 || dest >= total) return;
            if (move(id, list, dest)) refocusGrip(id);
        };

        // O item fica sempre `draggable` e o arrasto é CANCELADO quando não
        // começou no punho (mesma razão da lista de atalhos: alternar o atributo
        // deixava o item arrastável pelo corpo todo se o mouse fosse solto fora).
        item.draggable = true;
        let fromGrip = false;
        grip.onmousedown = () => { fromGrip = true; };
        item.onmouseup = () => { fromGrip = false; };

        item.ondragstart = (e) => {
            if (!fromGrip) { e.preventDefault(); return; }
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", id);
            item.classList.add("dragging");
        };
        item.ondragend = () => {
            item.classList.remove("dragging");
            fromGrip = false;
            section.querySelectorAll(".drop-target").forEach((el) => el.classList.remove("drop-target"));
        };
        item.ondragover = (e) => {
            e.preventDefault();
            e.stopPropagation(); // senão a lista também acende
            item.classList.add("drop-target");
        };
        item.ondragleave = () => item.classList.remove("drop-target");
        item.ondrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            item.classList.remove("drop-target");
            const dragged = e.dataTransfer.getData("text/plain");
            if (!dragged || dragged === id) return;
            move(dragged, list, index);
        };
    }

    // Soltar na área vazia da lista manda o módulo para o fim dela.
    Object.entries(lists).forEach(([name, el]) => {
        el.ondragover = (e) => { e.preventDefault(); el.classList.add("drop-target"); };
        el.ondragleave = (e) => { if (!el.contains(e.relatedTarget)) el.classList.remove("drop-target"); };
        el.ondrop = (e) => {
            e.preventDefault();
            el.classList.remove("drop-target");
            const dragged = e.dataTransfer.getData("text/plain");
            if (dragged) move(dragged, name, Infinity);
        };
    });

    function render() {
        const layout = PillLayoutService.get();
        const full = layout.pinned.length >= MAX_PINNED;

        Object.entries(lists).forEach(([name, el]) => {
            el.replaceChildren();
            const ids = layout[name];

            if (!ids.length) {
                // Só os fixados podem esvaziar: com o teto menor que o catálogo,
                // a gaveta nunca fica sem módulo (test:pill-layout trava isso).
                if (name === "pinned") {
                    const empty = document.createElement("div");
                    empty.className = "cw-pl-empty";
                    empty.textContent = t("plPinnedEmpty");
                    el.appendChild(empty);
                }
                return;
            }

            ids.forEach((id, index) => {
                const item = document.createElement("div");
                item.className = "cw-pl-item";
                item.dataset.id = id;

                const toPill = name === "drawer";
                const blocked = toPill && full;
                const moveLabel = blocked ? fill(t("plFull")) : t(toPill ? "plMoveToPill" : "plMoveToDrawer");
                item.innerHTML = `
                    <button type="button" class="cw-pl-grip" aria-label="${t("plReorder")}">${GRIP}</button>
                    <span class="cw-pl-icon">${moduleIcon(id)}</span>
                    <span class="cw-pl-label"></span>
                    <button type="button" class="cw-pl-move" ${blocked ? "disabled" : ""}>${toPill ? TO_PILL : TO_DRAWER}</button>
                `;
                const label = item.querySelector(".cw-pl-label");
                label.textContent = moduleLabel(id);
                const btn = item.querySelector(".cw-pl-move");
                btn.title = moveLabel;
                btn.setAttribute("aria-label", `${moduleLabel(id)}: ${moveLabel}`);

                wireItem(item, id, name, index, ids.length, full);
                el.appendChild(item);
            });
        });

        const count = section.querySelector(".js-pl-count");
        count.textContent = `${layout.pinned.length}/${MAX_PINNED}`;
        count.classList.toggle("full", full);
    }

    section.querySelector(".js-pl-reset").onclick = async () => {
        const ok = await confirmDialog(t("plResetConfirm"));
        if (!ok) return;
        PillLayoutService.reset();
        SoundManager.playClick();
    };

    // A tela acompanha o serviço, e não só os próprios gestos: a sincronia com a
    // nuvem (ou outro caminho) pode mudar o layout com a tela montada.
    PillLayoutService.onChange(render);

    function applyTexts() {
        section.querySelector(".js-pl-title").textContent = t("plSectionTitle");
        section.querySelector(".js-pl-desc").textContent = fill(t("plDesc"));
        section.querySelector(".js-pl-pinned-title").textContent = t("plPinnedTitle");
        section.querySelector(".js-pl-drawer-title").textContent = t("plDrawerTitle");
        section.querySelector(".js-pl-reset").textContent = t("plReset");
        render();
    }
    applyTexts();

    section.applyTexts = applyTexts;
    section.refresh = render;
    return section;
}
