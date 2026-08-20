// src/modules/configs/shortcuts-section.js
//
// Seção "Meus Atalhos" de Configurações: onde o agente gerencia os comandos que
// o Ctrl+K oferece a ele. Vive num arquivo próprio porque é a única parte de
// Configurações com estado e edição - o resto da tela são três toggles.
//
// A criação do zero aqui usa a MESMA fonte que o Case Notes
// (SUBSTATUS_TEMPLATES + getScenariosFor), justamente pra não existir uma
// segunda verdade sobre "quais cenários valem neste substatus".

import { SoundManager } from "../shared/sound-manager.js";
import { confirmDialog, showToast } from "../shared/utils.js";
import { ShortcutService, MAX_SHORTCUTS, shortcutIssues, newShortcutId } from "../shared/shortcut-service.js";
import {
    SUBSTATUS_TEMPLATES,
    getScenariosFor,
    scenarioLabel,
} from "../notes/data/notes-data.js";

const BOLT = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`;
const GRIP = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>`;
const PENCIL = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`;
const TRASH = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;

function injectStyles(COLORS) {
    if (document.getElementById("cw-shortcuts-styles")) return;
    const style = document.createElement("style");
    style.id = "cw-shortcuts-styles";
    style.innerHTML = `
        .cw-sc-item {
            display: flex; align-items: center; gap: 10px; padding: 10px 12px;
            border: 1px solid ${COLORS.border}; border-radius: 10px; background: #fff;
            transition: border-color 0.2s var(--cw-ease-standard),
                        box-shadow 0.2s var(--cw-ease-standard),
                        opacity 0.2s var(--cw-ease-standard);
        }
        .cw-sc-item + .cw-sc-item { margin-top: 8px; }
        .cw-sc-item:hover { border-color: #bdc1c6; }
        .cw-sc-item.dragging { opacity: 0.4; }
        .cw-sc-item.drop-target { border-color: ${COLORS.primary}; box-shadow: 0 0 0 2px rgba(26,115,232,0.15); }
        .cw-sc-item.broken { border-color: ${COLORS.warnBorder}; background: ${COLORS.warnBg}; }
        .cw-sc-grip {
            color: #9aa0a6; cursor: grab; display: flex; background: none; border: none;
            padding: 2px; border-radius: 4px;
        }
        .cw-sc-grip:active { cursor: grabbing; }
        .cw-sc-grip:focus-visible { outline: 2px solid ${COLORS.primary}; outline-offset: 1px; }
        .cw-sc-bolt {
            width: 26px; height: 26px; border-radius: 8px; background: #FEF7E0; color: #F9A825;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .cw-sc-text { flex: 1; min-width: 0; }
        .cw-sc-label {
            font-size: 13px; font-weight: 600; color: ${COLORS.text};
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cw-sc-meta {
            font-size: 11px; color: ${COLORS.textSub}; margin-top: 2px;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cw-sc-warn { color: ${COLORS.warnText}; font-weight: 600; }
        .cw-sc-iconbtn {
            width: 28px; height: 28px; border-radius: 8px; border: none; background: transparent;
            color: ${COLORS.textSub}; cursor: pointer; display: flex; align-items: center;
            justify-content: center; transition: background 0.15s var(--cw-ease-standard), color 0.15s var(--cw-ease-standard);
        }
        .cw-sc-iconbtn:hover { background: #f1f3f4; color: ${COLORS.text}; }
        .cw-sc-iconbtn.danger:hover { background: #fce8e6; color: #d93025; }
        .cw-sc-empty {
            font-size: 12px; color: ${COLORS.textSub}; text-align: center;
            padding: 18px 12px; border: 1px dashed ${COLORS.border}; border-radius: 10px;
        }
        .cw-sc-add {
            margin-top: 10px; width: 100%; padding: 10px; border-radius: 10px;
            border: 1px dashed ${COLORS.border}; background: transparent; cursor: pointer;
            font-family: inherit; font-weight: 600; font-size: 12px; color: ${COLORS.textSub};
            transition: all 0.2s var(--cw-ease-standard);
        }
        .cw-sc-add:hover:not(:disabled) { border-color: ${COLORS.primary}; color: ${COLORS.primary}; }
        .cw-sc-add:disabled { opacity: 0.5; cursor: not-allowed; }
        .cw-sc-field { display: flex; flex-direction: column; gap: 6px; }
        .cw-sc-field label { font-size: 11px; font-weight: 700; color: ${COLORS.textSub}; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-sc-field input, .cw-sc-field select {
            padding: 9px 10px; border-radius: 8px; border: 1px solid ${COLORS.border};
            font-family: inherit; font-size: 13px; color: ${COLORS.text}; background: #fff; outline: none;
        }
        .cw-sc-field input:focus, .cw-sc-field select:focus { border-color: ${COLORS.primary}; }
        .cw-sc-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        /* Mesma forma dos chips de cenário do Case Notes (step-scenarios.js):
           é o mesmo objeto aparecendo em duas telas. */
        .cw-sc-chip {
            padding: 6px 12px; border-radius: 16px; border: 1px solid #dadce0;
            background: #ffffff; font-size: 13px; color: #3c4043; cursor: pointer;
            font-family: inherit; transition: all 0.2s var(--cw-ease-elastic);
        }
        .cw-sc-chip:hover:not(.on) { background: #f1f3f4; }
        .cw-sc-chip.on { background: #e8f0fe; border-color: #1a73e8; color: #1967d2; font-weight: 600; }
        .cw-sc-editor-actions { display: flex; gap: 8px; }
        .cw-sc-editor-actions button {
            flex: 1; padding: 10px; border-radius: 10px; font-family: inherit;
            font-weight: 600; font-size: 13px; cursor: pointer;
        }
        .cw-sc-cancel { border: 1px solid ${COLORS.border}; background: #fff; color: ${COLORS.textSub}; }
        .cw-sc-save { border: none; background: ${COLORS.primary}; color: #fff; }
        .cw-sc-save:disabled { opacity: 0.6; cursor: progress; }

        /* Foco de teclado visível em TODO controle da seção - antes só o punho
           de arrastar tinha, e quem navega por Tab ficava sem saber onde está. */
        .cw-sc-iconbtn:focus-visible,
        .cw-sc-chip:focus-visible,
        .cw-sc-add:focus-visible,
        .cw-sc-editor-actions button:focus-visible,
        .cw-sc-field input:focus-visible,
        .cw-sc-field select:focus-visible {
            outline: 2px solid ${COLORS.primary};
            outline-offset: 1px;
        }

        /* Mesma cortesia que o resto do app já faz (configs-assistant.js,
           animations.js, step-scenarios.js): quem pediu menos movimento não
           deve receber transição nenhuma daqui. */
        @media (prefers-reduced-motion: reduce) {
            .cw-sc-item, .cw-sc-iconbtn, .cw-sc-add, .cw-sc-chip {
                transition: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// t: tradutor de configs-assistant.js. COLORS: mesma paleta da tela.
export function createShortcutsSection(t, COLORS) {
    injectStyles(COLORS);

    const section = document.createElement("div");
    section.className = "cw-configs-section";
    section.innerHTML = `
        <div class="cw-configs-section-title js-sc-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-sc-sort-label"></div>
                    <div class="cw-configs-desc js-sc-sort-desc"></div>
                </div>
                <label class="cw-toggle-switch">
                    <input type="checkbox" class="js-sc-sort-toggle">
                    <span class="cw-toggle-track"></span>
                </label>
            </div>
            <div class="js-sc-body"></div>
        </div>
    `;

    const body = section.querySelector(".js-sc-body");
    const sortToggle = section.querySelector(".js-sc-sort-toggle");

    sortToggle.onchange = async (e) => {
        SoundManager.playClick();
        await ShortcutService.setSortedByUsage(e.target.checked);
        renderList();
    };

    // ----------------------------------------------------------------
    //  LISTA
    // ----------------------------------------------------------------
    function meta(shortcut) {
        const tpl = SUBSTATUS_TEMPLATES[shortcut.payload.subStatus];
        const nomeSub = tpl ? tpl.name : shortcut.payload.subStatus;
        const qtd = (shortcut.payload.scenarios || []).length;
        const partes = [
            shortcut.payload.caseType.toUpperCase(),
            nomeSub,
            qtd === 1 ? t("scOneScenario") : t("scNScenarios").replace("{n}", qtd),
        ];
        if (shortcut.alias) partes.push(`"${shortcut.alias}"`);
        return partes.join(" · ");
    }

    // O nome e o apelido são texto do agente: entram por textContent, nunca por
    // innerHTML. Antes o apelido era interpolado num template de innerHTML - um
    // "<" quebrava a linha e uma tag executava.
    function preencherMeta(el, shortcut, quebrado) {
        el.textContent = "";
        if (quebrado) {
            const aviso = document.createElement("span");
            aviso.className = "cw-sc-warn";
            aviso.textContent = t("scBroken");
            el.appendChild(aviso);
            el.appendChild(document.createTextNode(" · "));
        }
        el.appendChild(document.createTextNode(meta(shortcut)));
    }

    function renderList() {
        body.innerHTML = "";
        sortToggle.checked = ShortcutService.isSortedByUsage();

        // Mostra a MESMA ordem que o Ctrl+K vai mostrar. Listar sempre a ordem
        // manual fazia a tela de gerenciamento contradizer o palette justamente
        // no modo padrão (ordenado por uso).
        const porUso = ShortcutService.isSortedByUsage();
        const lista = porUso ? ShortcutService.list() : ShortcutService.listRaw();
        const podeArrastar = !porUso;

        if (!lista.length) {
            const vazio = document.createElement("div");
            vazio.className = "cw-sc-empty";
            vazio.textContent = t("scEmpty");
            body.appendChild(vazio);
        }

        lista.forEach((shortcut, idx) => {
            const quebrados = shortcutIssues(shortcut);
            const item = document.createElement("div");
            item.className = "cw-sc-item" + (quebrados.length ? " broken" : "");
            item.dataset.id = shortcut.id;
            item.dataset.index = String(idx);

            item.innerHTML = `
                ${podeArrastar ? `<button type="button" class="cw-sc-grip" aria-label="${t('scReorder')}">${GRIP}</button>` : ""}
                <span class="cw-sc-bolt">${BOLT}</span>
                <span class="cw-sc-text">
                    <span class="cw-sc-label"></span>
                    <span class="cw-sc-meta"></span>
                </span>
                <button type="button" class="cw-sc-iconbtn js-sc-edit" aria-label="${t('scEdit')}">${PENCIL}</button>
                <button type="button" class="cw-sc-iconbtn danger js-sc-del" aria-label="${t('scDelete')}">${TRASH}</button>
            `;
            const labelEl = item.querySelector(".cw-sc-label");
            labelEl.textContent = shortcut.label;
            labelEl.title = shortcut.label; // nome longo é truncado com ellipsis
            preencherMeta(item.querySelector(".cw-sc-meta"), shortcut, quebrados.length > 0);

            item.querySelector(".js-sc-edit").onclick = () => renderEditor(shortcut);
            item.querySelector(".js-sc-del").onclick = () => remover(shortcut);

            if (podeArrastar) wireDrag(item, idx, lista.length);
            body.appendChild(item);
        });

        const add = document.createElement("button");
        add.type = "button";
        add.className = "cw-sc-add";
        add.textContent = t("scAdd");
        add.disabled = lista.length >= MAX_SHORTCUTS;
        if (add.disabled) add.textContent = t("scLimit").replace("{max}", MAX_SHORTCUTS);
        add.onclick = () => renderEditor(null);
        body.appendChild(add);
    }

    async function remover(shortcut) {
        const ok = await confirmDialog(t("scDeleteConfirm").replace("{name}", shortcut.label), { danger: true });
        if (!ok) return;
        await ShortcutService.remove(shortcut.id);
        SoundManager.playClick();
        renderList();
    }

    // Arrastar para reordenar. O punho também aceita teclado (setas): arrastar
    // é a única forma óbvia com mouse, mas não pode ser a única forma possível.
    function wireDrag(item, idx, total) {
        const grip = item.querySelector(".cw-sc-grip");

        // O item fica sempre `draggable` e o arrasto é CANCELADO quando não
        // começou no punho. Alternar o atributo no mousedown/mouseup do punho
        // deixava o item arrastável pelo corpo inteiro sempre que o mouse era
        // solto fora dele.
        item.draggable = true;
        let veioDoPunho = false;
        grip.onmousedown = () => { veioDoPunho = true; };
        item.onmouseup = () => { veioDoPunho = false; };

        grip.onkeydown = async (e) => {
            const delta = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0;
            if (!delta) return;
            e.preventDefault();

            const destino = idx + delta;
            if (destino < 0 || destino >= total) return; // já está na ponta

            await ShortcutService.reorder(item.dataset.id, destino);
            SoundManager.playClick();
            renderList();

            // Reencontra o punho pelo ID, não pela posição: com a lista
            // reordenada, procurar pelo índice antigo devolvia null e o foco
            // do teclado se perdia.
            const alvo = body.querySelector(`.cw-sc-item[data-id="${item.dataset.id}"] .cw-sc-grip`);
            if (alvo) alvo.focus();
        };

        item.ondragstart = (e) => {
            if (!veioDoPunho) {
                e.preventDefault();
                return;
            }
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", item.dataset.id);
            item.classList.add("dragging");
        };
        item.ondragend = () => {
            item.classList.remove("dragging");
            veioDoPunho = false;
            body.querySelectorAll(".drop-target").forEach((el) => el.classList.remove("drop-target"));
        };
        item.ondragover = (e) => {
            e.preventDefault();
            item.classList.add("drop-target");
        };
        item.ondragleave = () => item.classList.remove("drop-target");
        item.ondrop = async (e) => {
            e.preventDefault();
            item.classList.remove("drop-target");
            const id = e.dataTransfer.getData("text/plain");
            if (!id || id === item.dataset.id) return;
            await ShortcutService.reorder(id, Number(item.dataset.index));
            SoundManager.playClick();
            renderList();
        };
    }

    // ----------------------------------------------------------------
    //  EDITOR
    // ----------------------------------------------------------------
    function statusList() {
        const vistos = [];
        for (const key in SUBSTATUS_TEMPLATES) {
            const st = SUBSTATUS_TEMPLATES[key].status;
            if (st && !vistos.includes(st)) vistos.push(st);
        }
        return vistos;
    }

    function renderEditor(shortcut) {
        const editando = !!shortcut;
        const estado = editando
            ? JSON.parse(JSON.stringify(shortcut))
            : {
                // Id já aqui, não no primeiro save: assim dois cliques no botão
                // atualizam o mesmo atalho em vez de criar dois iguais.
                id: newShortcutId(),
                kind: "note",
                label: "",
                alias: "",
                payload: { caseType: "bau", status: "", subStatus: "", scenarios: [] },
            };

        body.innerHTML = "";
        const form = document.createElement("div");
        form.style.cssText = "display: flex; flex-direction: column; gap: 14px;";
        form.innerHTML = `
            <div class="cw-sc-field">
                <label for="cw-sc-name">${t("scName")}</label>
                <input id="cw-sc-name" type="text" maxlength="60" placeholder="${t("scNamePlaceholder")}">
            </div>
            <div class="cw-sc-field">
                <label for="cw-sc-alias">${t("scAlias")}</label>
                <input id="cw-sc-alias" type="text" maxlength="40" placeholder="${t("scAliasPlaceholder")}">
                <div class="cw-configs-desc">${t("scAliasDesc")}</div>
            </div>
            <div class="cw-sc-field">
                <label for="cw-sc-type">${t("scFlow")}</label>
                <select id="cw-sc-type">
                    <option value="bau">BAU</option>
                    <option value="lm">LM</option>
                </select>
            </div>
            <div class="cw-sc-field">
                <label for="cw-sc-status">${t("scStatus")}</label>
                <select id="cw-sc-status"></select>
            </div>
            <div class="cw-sc-field">
                <label for="cw-sc-sub">${t("scSubStatus")}</label>
                <select id="cw-sc-sub"></select>
            </div>
            <div class="cw-sc-field">
                <label>${t("scScenarios")}</label>
                <div class="cw-sc-chips js-sc-scenarios"></div>
                <div class="cw-configs-desc">${t("scScenariosDesc")}</div>
            </div>
            <div class="cw-sc-editor-actions">
                <button type="button" class="cw-sc-cancel">${t("scCancel")}</button>
                <button type="button" class="cw-sc-save">${t("scSave")}</button>
            </div>
        `;
        body.appendChild(form);

        const nome = form.querySelector("#cw-sc-name");
        const alias = form.querySelector("#cw-sc-alias");
        const tipo = form.querySelector("#cw-sc-type");
        const status = form.querySelector("#cw-sc-status");
        const sub = form.querySelector("#cw-sc-sub");
        const chips = form.querySelector(".js-sc-scenarios");

        nome.value = estado.label;
        alias.value = estado.alias;
        tipo.value = estado.payload.caseType;

        status.innerHTML = `<option value="">—</option>` +
            statusList().map((s) => `<option value="${s}">${s}</option>`).join("");
        status.value = estado.payload.status;

        function renderSubOptions() {
            const atual = status.value;
            sub.innerHTML = `<option value="">—</option>`;
            for (const key in SUBSTATUS_TEMPLATES) {
                if (SUBSTATUS_TEMPLATES[key].status !== atual) continue;
                const opt = document.createElement("option");
                opt.value = key;
                opt.textContent = SUBSTATUS_TEMPLATES[key].name;
                sub.appendChild(opt);
            }
            sub.disabled = !atual;
        }

        function renderScenarioChips() {
            chips.innerHTML = "";
            if (!sub.value) {
                chips.innerHTML = `<div class="cw-configs-desc">${t("scPickSubStatus")}</div>`;
                return;
            }
            const disponiveis = getScenariosFor(sub.value, tipo.value);
            if (!disponiveis.length) {
                chips.innerHTML = `<div class="cw-configs-desc">${t("scNoScenarios")}</div>`;
                return;
            }
            disponiveis.forEach(([id]) => {
                const chip = document.createElement("button");
                chip.type = "button";
                chip.className = "cw-sc-chip";
                chip.textContent = scenarioLabel(id, sub.value);
                const marcado = () => estado.payload.scenarios.some((r) => r.id === id);
                chip.classList.toggle("on", marcado());
                chip.onclick = () => {
                    if (marcado()) {
                        estado.payload.scenarios = estado.payload.scenarios.filter((r) => r.id !== id);
                    } else {
                        estado.payload.scenarios.push({ id, substatus: sub.value });
                    }
                    chip.classList.toggle("on", marcado());
                    SoundManager.playClick();
                };
                chips.appendChild(chip);
            });
        }

        renderSubOptions();
        sub.value = estado.payload.subStatus;
        renderScenarioChips();

        status.onchange = () => {
            // Trocar de status invalida substatus e cenários: manter os antigos
            // criaria justamente o atalho impossível que este editor evita.
            estado.payload.scenarios = [];
            renderSubOptions();
            sub.value = "";
            renderScenarioChips();
        };
        sub.onchange = () => {
            estado.payload.scenarios = [];
            renderScenarioChips();
        };
        tipo.onchange = () => {
            estado.payload.scenarios = [];
            renderScenarioChips();
        };

        form.querySelector(".cw-sc-cancel").onclick = () => {
            SoundManager.playClick();
            renderList();
        };

        const btnSalvar = form.querySelector(".cw-sc-save");
        btnSalvar.onclick = async () => {
            if (!sub.value) {
                SoundManager.playError();
                showToast(t("scPickSubStatus"), { error: true });
                return;
            }

            // A escrita passa por JSONP e pode levar até os 15s do watchdog. Sem
            // desabilitar, o botão aceita cliques repetidos e o agente fica sem
            // saber se algo está acontecendo (dom-standards.md: toda chamada à
            // API precisa de estado visual de loading).
            const textoOriginal = btnSalvar.textContent;
            btnSalvar.disabled = true;
            btnSalvar.textContent = t("scSaving");

            const rotulo = nome.value.trim() || SUBSTATUS_TEMPLATES[sub.value].name;
            const resultado = await ShortcutService.save({
                ...estado,
                label: rotulo,
                alias: alias.value.trim(),
                payload: {
                    ...estado.payload,
                    caseType: tipo.value,
                    status: status.value || String(sub.value).split("_")[0],
                    subStatus: sub.value,
                },
            });

            if (!resultado.ok) {
                btnSalvar.disabled = false;
                btnSalvar.textContent = textoOriginal;
                SoundManager.playError();
                showToast(t("scLimit").replace("{max}", MAX_SHORTCUTS), { error: true });
                return;
            }
            SoundManager.playSuccess();
            showToast(resultado.synced ? t("scSaved") : t("scSavedLocal"));
            renderList(); // troca o editor pela lista: o botão sai do DOM junto
        };
    }

    section.refresh = renderList;
    section.applyTexts = () => {
        section.querySelector(".js-sc-title").textContent = t("scSectionTitle");
        section.querySelector(".js-sc-sort-label").textContent = t("scSortLabel");
        section.querySelector(".js-sc-sort-desc").textContent = t("scSortDesc");
        renderList();
    };

    renderList();
    return section;
}
