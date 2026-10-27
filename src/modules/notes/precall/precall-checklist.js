// src/modules/notes/precall/precall-checklist.js
//
// Pre-call Checklist: formulário curto cujo resultado é o bloco "Pre-call
// checklist" da nota do caso. Vive na pasta do Case Notes porque reaproveita a
// mesma saída (abrir o card de nota no CRM, inserir, copiar), mas tem janela e
// estado próprios: o checklist acontece ANTES do desfecho, e o Case Notes só
// gera nota depois de escolhido um substatus.
//
// O que a raspagem do CRM consegue preencher chega preenchido e marcado como
// automático. Nada capturado sobrescreve o que o agente já digitou.

import { stylePopup, showToast } from '../../shared/utils.js';
import { createStandardHeader } from '../../shared/header-factory.js';
import { toggleGenieAnimation, isModuleOpen } from '../../shared/animations.js';
import { SoundManager } from '../../shared/sound-manager.js';
import { lockBodyScroll, unlockBodyScroll, markPendingField } from '../../shared/dom-utils.js';
import { createTranslator, onLanguageChange } from '../../shared/i18n.js';
import {
    ensureOriginalLanguage, captureClientEmail, captureClientPhone, captureCID, getCaseId,
} from '../../shared/page-data.js';
import { lerCampo, lerCampoTodos } from '../../shared/crm-labels.js';
import { copyHtmlToClipboard, ensureNoteCardIsOpen, triggerInputEvents } from '../notes-bridge.js';
import { TASKS_DB } from '../data/notes-data.js';
import { COLORS } from '../notes-styles.js';
import {
    PRECALL_FIELDS, AUTO_FIELD_IDS, EXCEPTION_REASONS, NEXT_STEPS,
    YES, NO, NONE_PROVIDED,
    missingFields, buildPrecallHtml, normalizeCapture,
} from './precall-data.js';
import { PRECALL_I18N } from './precall-i18n.js';

const CURRENT_VERSION = 'v1.0.0';
const MODULE_NAME = 'Pre-call Checklist';
const PILL_BUTTON_ID = 'cw-btn-precall';
const FILL_STAGGER_MS = 110;
const DONE_FLASH_MS = 1500;

const YES_NO = [{ value: YES, key: 'yes' }, { value: NO, key: 'no' }];

const CHECK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
}

const prefersReducedMotion = () =>
    !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

// Só o que o checklist usa, em vez de getPageData(): aquele também resolve o AM
// (case log, às vezes com clique) e o perfil, e nada disso entra aqui.
async function captureCaseData() {
    await ensureOriginalLanguage();
    // Em paralelo: os dois clicam no próprio unmask e esperam o Angular
    // renderizar (scraping-rules.md); em série seriam 1s a cada abertura.
    const [email, phone] = await Promise.all([captureClientEmail(), captureClientPhone()]);
    return {
        caseId: await getCaseId(),
        tasks: lerCampoTodos('appointmentTasks'),
        website: lerCampo('website'),
        cid: captureCID(),
        email,
        phone,
    };
}

export function initPrecallChecklist() {
    const t = createTranslator(PRECALL_I18N);
    injectStyles();

    // --- Janela -----------------------------------------------------------
    const popup = el('div');
    popup.id = 'cw-precall-popup';
    popup.classList.add('cw-module-window');
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-label', MODULE_NAME);
    Object.assign(popup.style, stylePopup, {
        width: '520px', height: '800px', display: 'flex', flexDirection: 'column', borderRadius: '24px',
    });

    const header = createStandardHeader(
        popup, MODULE_NAME, CURRENT_VERSION, t('headerDesc'), { popup }, () => toggleVisibility()
    );
    popup.appendChild(header);

    const body = el('div', 'cw-pc-body');
    popup.appendChild(body);

    const outputNote = el('p', 'cw-pc-note');
    const status = el('div', 'cw-pc-status');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    body.append(outputNote, status);

    // --- Campos -----------------------------------------------------------
    const controls = {}; // id -> <input>/<select>/<textarea>
    const rows = {};     // id -> { row, label, badgeText }
    const autoFilled = new Set();

    function buildField(id, kind, { auto = false, numeric = false } = {}) {
        const row = el('div', 'cw-pc-field');
        const head = el('div', 'cw-pc-label-row');
        const label = el('label', 'cw-pc-label');
        label.htmlFor = `cw-pc-${id}`;
        head.appendChild(label);

        let badgeText = null;
        if (auto) {
            const badge = el('span', 'cw-pc-auto');
            badge.innerHTML = CHECK_ICON;
            badgeText = el('span');
            badge.appendChild(badgeText);
            head.appendChild(badge);
        }

        const control = el(kind === 'select' ? 'select' : kind === 'textarea' ? 'textarea' : 'input', 'cw-pc-control');
        control.id = `cw-pc-${id}`;
        if (kind === 'text') {
            control.type = 'text';
            control.placeholder = NONE_PROVIDED;
            control.autocomplete = 'off';
            control.spellcheck = false;
        }
        if (kind === 'textarea') {
            control.rows = 2;
            control.placeholder = NONE_PROVIDED;
            control.spellcheck = false;
        }
        if (numeric) control.classList.add('cw-pc-num');
        control.addEventListener('animationend', () => control.classList.remove('cw-pc-fill'));

        // Editou: deixou de ser dado capturado, então a marca sai.
        control.addEventListener('input', () => {
            if (autoFilled.delete(id)) row.classList.remove('is-auto');
        });
        if (kind === 'select') {
            control.addEventListener('change', () => control.classList.toggle('is-placeholder', !control.value));
        }

        row.append(head, control);
        controls[id] = control;
        rows[id] = { row, label, badgeText, badge: badgeText?.parentElement };
        return row;
    }

    // Exceção do SOP: "Completed: No" + motivo, e o resto do formulário some.
    const completedRow = buildField('completed', 'select');
    const reasonRow = buildField('exceptionReason', 'select');
    const fieldRows = {};
    PRECALL_FIELDS.forEach((def) => {
        fieldRows[def.id] = buildField(def.id, def.kind === 'yesno' ? 'select' : def.kind, {
            auto: def.auto,
            numeric: ['contactNumber', 'adsCid', 'ga4Id'].includes(def.id),
        });
    });

    // A ordem da TELA agrupa por tipo para o agente rolar menos; a ordem da
    // NOTA é a de PRECALL_FIELDS e não muda com isto.
    const grid = (columns, ids) => {
        const box = el('div', `cw-pc-grid cols-${columns}`);
        ids.forEach((id) => box.appendChild(fieldRows[id]));
        return box;
    };
    const fields = el('div', 'cw-pc-stack');
    fields.append(
        grid(3, PRECALL_FIELDS.filter((f) => f.kind === 'yesno').map((f) => f.id)),
        fieldRows.tasks,
        grid(2, ['contactNumber', 'email']),
        grid(2, ['websiteUrl', 'websiteCms']),
        grid(2, ['adsCid', 'ga4Id']),
        fieldRows.specialInstructions,
        fieldRows.nextSteps,
    );
    body.append(completedRow, reasonRow, fields);

    function syncExceptionMode() {
        const isException = controls.completed.value === NO;
        reasonRow.hidden = !isException;
        fields.hidden = isException;
    }
    controls.completed.addEventListener('change', syncExceptionMode);

    // --- Rodapé -----------------------------------------------------------
    const footer = el('div', 'cw-pc-footer');
    const clearBtn = el('button', 'cw-pc-btn is-text');
    const copyBtn = el('button', 'cw-pc-btn is-outline');
    const insertBtn = el('button', 'cw-pc-btn is-filled');
    [clearBtn, copyBtn, insertBtn].forEach((b) => { b.type = 'button'; });

    const copyIcon = el('span', 'cw-pc-btn-icon');
    copyIcon.innerHTML = CHECK_ICON;
    const copyLabel = el('span');
    copyBtn.append(copyIcon, copyLabel);

    footer.append(clearBtn, copyBtn, insertBtn);
    popup.appendChild(footer);

    // --- Textos -----------------------------------------------------------
    // Reaplicado a cada troca de idioma. Os `value` das opções nunca mudam: o
    // que sai na nota é o valor canônico em inglês, não o texto da tela.
    function renderOptions(select, options, { withPlaceholder }) {
        const current = select.value;
        select.textContent = '';
        if (withPlaceholder) {
            const placeholder = el('option', null, t('select'));
            placeholder.value = '';
            placeholder.disabled = true;
            select.appendChild(placeholder);
        }
        options.forEach(({ value, key }) => {
            const option = el('option', null, t(key));
            option.value = value;
            select.appendChild(option);
        });
        select.value = current || (withPlaceholder ? '' : options[0].value);
        select.classList.toggle('is-placeholder', !select.value);
    }

    let lastStatus = null;
    let copyDone = false;

    function applyTexts() {
        outputNote.textContent = t('outputNote');

        rows.completed.label.textContent = t('completed');
        renderOptions(controls.completed, YES_NO, { withPlaceholder: false });
        rows.exceptionReason.label.textContent = t('exceptionReason');
        renderOptions(controls.exceptionReason, EXCEPTION_REASONS, { withPlaceholder: true });

        PRECALL_FIELDS.forEach((def) => {
            rows[def.id].label.textContent = t(def.id);
            if (rows[def.id].badgeText) {
                rows[def.id].badgeText.textContent = t('autoBadge');
                rows[def.id].badge.title = t('autoBadgeTitle');
            }
            if (def.kind === 'yesno') renderOptions(controls[def.id], YES_NO, { withPlaceholder: true });
            if (def.kind === 'select') renderOptions(controls[def.id], NEXT_STEPS, { withPlaceholder: true });
        });

        clearBtn.textContent = t('clear');
        copyLabel.textContent = t(copyDone ? 'copied' : 'copy');
        insertBtn.textContent = t('insert');

        if (lastStatus) setStatus(lastStatus.kind, lastStatus.key, lastStatus.n);
        const helpDesc = popup.querySelector('.cw-help-description');
        if (helpDesc) helpDesc.textContent = t('headerDesc');
    }

    function setStatus(kind, key, n) {
        lastStatus = { kind, key, n };
        status.className = `cw-pc-status ${kind ? `is-${kind}` : ''}`;
        status.textContent = t(key).replace('{n}', n);
    }

    // --- Captura automática ------------------------------------------------
    let runId = 0;
    let lastCaseKey = null;
    let capturing = false;
    let inserting = false;

    // Copiar e inserir ficam parados enquanto a captura roda: sair com o
    // formulário a meio caminho de preencher geraria "None provided" em campos
    // que estavam prestes a chegar.
    function syncActions() {
        copyBtn.disabled = insertBtn.disabled = capturing || inserting;
    }

    function resetForm() {
        Object.values(controls).forEach((c) => { c.value = ''; });
        controls.completed.value = YES;
        controls.completed.classList.remove('is-placeholder');
        Object.values(rows).forEach(({ row }) => row.classList.remove('is-auto'));
        autoFilled.clear();
        applyTexts();
        syncExceptionMode();
    }

    // Preenche só o que está vazio e em sequência curta: os campos "aparecem"
    // preenchidos, o que diz ao agente que não precisa digitá-los sem uma
    // linha de explicação a mais na tela.
    function applyAutoValues(found, run) {
        const targets = AUTO_FIELD_IDS.filter((id) => found[id] && !controls[id].value.trim());
        const calm = prefersReducedMotion();
        targets.forEach((id, index) => {
            window.setTimeout(() => {
                // Outra captura começou (ou o caso mudou) antes desta terminar:
                // o valor desta já é de um caso que não está mais na tela.
                if (run !== runId) return;
                const control = controls[id];
                if (control.value.trim()) return; // o agente digitou enquanto isso
                control.value = found[id];
                autoFilled.add(id);
                rows[id].row.classList.add('is-auto');
                if (!calm) {
                    control.classList.remove('cw-pc-fill');
                    void control.offsetWidth;
                    control.classList.add('cw-pc-fill');
                }
            }, calm ? 0 : index * FILL_STAGGER_MS);
        });
        return new Set([...autoFilled, ...targets]).size;
    }

    async function captureAndFill() {
        const run = ++runId;

        // Qual caso está na tela, antes de qualquer espera: o id e o CID não
        // dependem do unmask nem da tradução, e o formulário do caso anterior
        // não pode ficar visível (e editável) enquanto a captura lenta roda.
        const caseKey = `${await getCaseId()}|${captureCID()}`;
        if (run !== runId) return;
        if (caseKey !== lastCaseKey) {
            resetForm();
            lastCaseKey = caseKey;
        }

        setStatus('busy', 'capturing');
        capturing = true;
        syncActions();
        try {
            const raw = await captureCaseData();
            if (run !== runId) return; // reaberto no meio da captura
            const total = applyAutoValues(normalizeCapture(raw, (slug) => TASKS_DB[slug]?.name), run);
            if (total === 0) setStatus('', 'captureNone');
            else setStatus('auto', total === 1 ? 'capturedOne' : 'capturedN', total);
        } catch (e) {
            // Falha de raspagem nunca trava o formulário (scraping-rules.md).
            console.warn('Pre-call: não foi possível ler a tela do caso:', e);
            if (run === runId) setStatus('', 'captureFailed');
        } finally {
            // Só a captura mais recente libera os botões: uma anterior que
            // termina tarde não pode soltar o que a atual ainda segura.
            if (run === runId) {
                capturing = false;
                syncActions();
            }
        }
    }

    // --- Saída ---------------------------------------------------------------
    function getValues() {
        const values = { completed: controls.completed.value, exceptionReason: controls.exceptionReason.value };
        PRECALL_FIELDS.forEach((def) => { values[def.id] = controls[def.id].value; });
        return values;
    }

    // Devolve o HTML da nota, ou null depois de apontar o que falta.
    function buildOrWarn() {
        const values = getValues();
        const [firstMissing] = missingFields(values);
        if (firstMissing) {
            SoundManager.playError();
            showToast(t('needAnswer').replace('{field}', t(firstMissing)), { error: true });
            markPendingField(controls[firstMissing]);
            return null;
        }
        return buildPrecallHtml(values);
    }

    function confirmCopyOnButton() {
        copyDone = true;
        copyBtn.classList.add('is-done');
        copyLabel.textContent = t('copied');
        window.setTimeout(() => {
            copyDone = false;
            copyBtn.classList.remove('is-done');
            copyLabel.textContent = t('copy');
        }, DONE_FLASH_MS);
    }

    function handleCopy() {
        const html = buildOrWarn();
        if (!html) return;
        copyHtmlToClipboard(html);
        confirmCopyOnButton();
        SoundManager.playSuccess();
        if (navigator.vibrate) navigator.vibrate(10);
        showToast(t('toastCopied'));
    }

    async function handleInsert() {
        const html = buildOrWarn();
        if (!html) return;

        inserting = true;
        syncActions();
        copyHtmlToClipboard(html); // rede de segurança: se a inserção falhar, o texto já está copiado
        toggleVisibility();

        const field = await ensureNoteCardIsOpen();
        if (field) {
            field.focus();
            document.execCommand('insertHTML', false, html);
            triggerInputEvents(field);
            showToast(t('toastInserted'));
            SoundManager.playSuccess();
            if (navigator.vibrate) navigator.vibrate(10);
        } else {
            SoundManager.playError();
            showToast(t('insertFailed'), { error: true });
            toggleVisibility();
        }
        inserting = false;
        syncActions();
    }

    clearBtn.addEventListener('click', () => {
        SoundManager.playClick();
        resetForm();
        captureAndFill();
    });
    copyBtn.addEventListener('click', handleCopy);
    insertBtn.addEventListener('click', handleInsert);

    // --- Abrir e fechar -------------------------------------------------------
    function toggleVisibility() {
        const show = !isModuleOpen(popup);
        toggleGenieAnimation(show, popup, PILL_BUTTON_ID);
        if (show) {
            lockBodyScroll();
            captureAndFill();
        } else {
            unlockBodyScroll();
        }
    }

    resetForm();
    onLanguageChange(applyTexts);
    document.body.appendChild(popup);
    return toggleVisibility;
}

function injectStyles() {
    if (document.getElementById('cw-precall-styles')) return;
    const style = el('style');
    style.id = 'cw-precall-styles';
    style.textContent = `
        #cw-precall-popup { font-family: 'Google Sans', Roboto, sans-serif; color: ${COLORS.text}; }
        #cw-precall-popup [hidden] { display: none !important; }

        #cw-precall-popup .cw-pc-body {
            flex: 1 1 auto; min-height: 0; overflow-y: auto;
            padding: 16px 24px; background: ${COLORS.surface};
            display: flex; flex-direction: column; gap: 16px;
        }
        #cw-precall-popup .cw-pc-note { margin: 0; font-size: 12px; line-height: 16px; color: ${COLORS.textSub}; }

        #cw-precall-popup .cw-pc-status {
            display: flex; align-items: center; gap: 8px; min-height: 16px;
            font-size: 12px; line-height: 16px; color: ${COLORS.textSub};
        }
        #cw-precall-popup .cw-pc-status::before {
            content: ''; flex: 0 0 8px; width: 8px; height: 8px; border-radius: 50%;
            background: #9aa0a6; transition: background-color 0.2s ease;
        }
        #cw-precall-popup .cw-pc-status.is-auto::before,
        #cw-precall-popup .cw-pc-status.is-busy::before { background: ${COLORS.primary}; }
        #cw-precall-popup .cw-pc-status.is-busy::before { animation: cw-pc-pulse 1s ease-in-out infinite; }
        @keyframes cw-pc-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        #cw-precall-popup .cw-pc-stack { display: flex; flex-direction: column; gap: 16px; }
        #cw-precall-popup .cw-pc-grid { display: grid; gap: 16px; }
        #cw-precall-popup .cw-pc-grid.cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        #cw-precall-popup .cw-pc-grid.cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        #cw-precall-popup .cw-pc-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        #cw-precall-popup .cw-pc-label-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 16px; }
        #cw-precall-popup .cw-pc-label {
            min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
            font-size: 12px; line-height: 16px; font-weight: 500; color: ${COLORS.textSub};
        }

        #cw-precall-popup .cw-pc-auto {
            display: none; align-items: center; gap: 4px; white-space: nowrap;
            font-size: 11px; line-height: 16px; color: ${COLORS.primary};
        }
        #cw-precall-popup .cw-pc-auto svg { width: 12px; height: 12px; fill: currentColor; flex-shrink: 0; }
        #cw-precall-popup .cw-pc-field.is-auto .cw-pc-auto { display: inline-flex; }

        #cw-precall-popup .cw-pc-control {
            width: 100%; box-sizing: border-box; min-height: 40px; padding: 8px 12px;
            border: 1px solid transparent; border-radius: 8px;
            background-color: ${COLORS.bgInput}; color: ${COLORS.text};
            font: 400 14px/20px 'Google Sans', Roboto, sans-serif; outline: none;
            transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        #cw-precall-popup .cw-pc-control:hover { background-color: #f1f3f4; }
        #cw-precall-popup .cw-pc-control:focus-visible {
            background-color: #fff; border-color: ${COLORS.primary}; box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.15);
        }
        #cw-precall-popup .cw-pc-control::placeholder { color: #70757a; }
        #cw-precall-popup textarea.cw-pc-control { resize: vertical; min-height: 64px; }
        #cw-precall-popup .cw-pc-num { font-variant-numeric: tabular-nums; }
        #cw-precall-popup select.cw-pc-control {
            appearance: none; -webkit-appearance: none; cursor: pointer; padding-right: 36px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235f6368' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
            background-repeat: no-repeat; background-position: right 12px center; background-size: 16px;
        }
        #cw-precall-popup select.cw-pc-control.is-placeholder { color: #70757a; }

        /* Campo que acabou de ser preenchido pela captura: entra do fundo e o
           realce azul se dissolve. Só opacity/transform/cor, sem overshoot. */
        @keyframes cw-pc-fill {
            0%   { opacity: 0; transform: translateY(4px); background-color: ${COLORS.primaryBg}; }
            50%  { opacity: 1; transform: translateY(0); background-color: ${COLORS.primaryBg}; }
            100% { opacity: 1; transform: translateY(0); background-color: ${COLORS.bgInput}; }
        }
        #cw-precall-popup .cw-pc-control.cw-pc-fill { animation: cw-pc-fill 700ms cubic-bezier(0.2, 0, 0, 1) both; }

        #cw-precall-popup .cw-pc-footer {
            flex: 0 0 auto; display: flex; align-items: center; gap: 8px; padding: 16px 24px;
            background: ${COLORS.surface}; border-top: 1px solid rgba(0, 0, 0, 0.06);
        }
        #cw-precall-popup .cw-pc-btn {
            height: 40px; padding: 0 20px; border: 1px solid transparent; border-radius: 100px;
            display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;
            font: 500 14px/20px 'Google Sans', Roboto, sans-serif;
            transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }
        #cw-precall-popup .cw-pc-btn:focus-visible { outline: 2px solid ${COLORS.primary}; outline-offset: 2px; }
        #cw-precall-popup .cw-pc-btn:disabled { opacity: 0.5; cursor: default; }
        #cw-precall-popup .cw-pc-btn.is-text { margin-right: auto; padding: 0 12px; background: transparent; color: ${COLORS.textSub}; }
        #cw-precall-popup .cw-pc-btn.is-text:hover { background: ${COLORS.bgInput}; color: ${COLORS.text}; }
        #cw-precall-popup .cw-pc-btn.is-outline { background: #fff; color: ${COLORS.primary}; border-color: rgba(26, 115, 232, 0.4); }
        #cw-precall-popup .cw-pc-btn.is-outline:hover:not(:disabled) { background: ${COLORS.primaryBg}; }
        #cw-precall-popup .cw-pc-btn.is-filled { background: ${COLORS.primary}; color: #fff; box-shadow: 0 1px 2px rgba(26, 115, 232, 0.3); }
        #cw-precall-popup .cw-pc-btn.is-filled:hover:not(:disabled) { background: #1765cc; }
        #cw-precall-popup .cw-pc-btn.is-outline.is-done { background: #e6f4ea; color: #137333; border-color: rgba(19, 115, 51, 0.4); }
        #cw-precall-popup .cw-pc-btn-icon { display: none; }
        #cw-precall-popup .cw-pc-btn-icon svg { width: 16px; height: 16px; fill: currentColor; display: block; }
        #cw-precall-popup .cw-pc-btn.is-done .cw-pc-btn-icon { display: inline-flex; }

        @media (prefers-reduced-motion: reduce) {
            #cw-precall-popup .cw-pc-control.cw-pc-fill,
            #cw-precall-popup .cw-pc-status.is-busy::before { animation: none; }
        }
    `;
    document.head.appendChild(style);
}
