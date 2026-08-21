// src/modules/notes/notes-bridge.js
import { showToast } from '../shared/utils.js';
import { esperar, simularCliqueReal } from '../shared/dom-utils.js';
import { SoundManager } from '../shared/sound-manager.js';
import { getLanguage } from '../shared/i18n.js';

export function copyHtmlToClipboard(html) {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.innerHTML = html;
    document.body.appendChild(container);
    const range = document.createRange();
    range.selectNodeContents(container);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try {
        document.execCommand('copy');
    } catch (err) {
        SoundManager.playError();
        showToast(getLanguage() === 'es' ? "Error al copiar" : "Falha ao copiar", { error: true });
    }
    selection.removeAllRanges();
    document.body.removeChild(container);
}

export function triggerInputEvents(element) {
    const events = ['input', 'change', 'keydown', 'keyup'];
    events.forEach(eventType => {
        const event = new Event(eventType, { bubbles: true, cancelable: true });
        element.dispatchEvent(event);
    });
}

// --- FUNÇÃO HELPER INTERNA ---
// Retorna uma lista de todos os editores atualmente na página
function getAllEditors() {
    return Array.from(document.querySelectorAll('div[contenteditable="true"]'));
}

// --- LÓGICA BLINDADA: ABRIR NOVA NOTA ---
export async function ensureNoteCardIsOpen() {
    // 1. SNAPSHOT: Guarda quem já estava na tela antes do clique
    const editoresAntes = getAllEditors();
    const qtdAntes = editoresAntes.length;
    
    // 2. BUSCA E CLICA NO BOTÃO
    const icones = Array.from(document.querySelectorAll('i.material-icons-extended'));
    const iconeNota = icones.find(el => el.innerText.trim() === 'description');

    if (iconeNota) {
        const btnAlvo = iconeNota.closest('material-fab') || iconeNota.closest('material-button');
        if (btnAlvo) {
            // Garante que o botão está clicável (tira o hidden do Angular)
            if (btnAlvo.style) {
                btnAlvo.style.display = 'block';
                btnAlvo.style.visibility = 'visible';
            }
            simularCliqueReal(btnAlvo);
        } else {
            simularCliqueReal(iconeNota);
        }
    } else {
        // Fallback: Menu (+)
        const speedDial = document.querySelector('material-fab-speed-dial');
        if (speedDial) {
            const trigger = speedDial.querySelector('.trigger');
            if(trigger) {
                trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                simularCliqueReal(trigger);
            } else {
                speedDial.click();
            }
            await esperar(800);
            const iconesAgora = Array.from(document.querySelectorAll('i.material-icons-extended'));
            const btnAgora = iconesAgora.find(el => el.innerText.trim() === 'description');
            if(btnAgora) simularCliqueReal(btnAgora);
        }
    }

    // 3. ESPERA ATIVA INTELIGENTE (Differential Check)
    // Espera até que apareça um editor NOVO (que não estava na lista 'editoresAntes')
    let novoEditor = null;
    let tentativas = 0;
    
    while (!novoEditor && tentativas < 20) {
        await esperar(300);
        
        const editoresAgora = getAllEditors();
        
        // Se a quantidade aumentou, achamos o novo!
        if (editoresAgora.length > qtdAntes) {
            // O novo editor é aquele que está em 'Agora' mas não estava em 'Antes'
            // Geralmente é o último, mas vamos filtrar para garantir
            novoEditor = editoresAgora.find(e => !editoresAntes.includes(e));
            
            // Fallback: Se por algum motivo a lógica de includes falhar, pega o último
            if (!novoEditor) novoEditor = editoresAgora[editoresAgora.length - 1];
        }
        // Se a quantidade for igual, talvez ele tenha reaberto um fechado?
        // Nesse caso, pegamos o último visível como fallback
        else if (tentativas > 10) {
             const visible = editoresAgora.filter(e => e.offsetParent !== null);
             if (visible.length > 0) novoEditor = visible[visible.length - 1];
        }
        
        tentativas++;
    }
    
    // Retorna explicitamente o novo editor encontrado
    return novoEditor;
}


export function createGoogleSelect(id, options, placeholder = "Selecione...") {
    // 1. O Select Nativo (Invisível, para manter a lógica funcionando)
    const nativeSelect = document.createElement('select');
    nativeSelect.id = id;
    nativeSelect.style.display = 'none'; // Esconde o feio

    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        if (opt.value === "") option.disabled = true;
        nativeSelect.appendChild(option);
    });

    // 2. A Estrutura Visual (O Bonito)
    const container = document.createElement('div');
    container.className = 'cw-dropdown-container';

    // Trigger (Botão)
    const trigger = document.createElement('div');
    trigger.className = 'cw-dropdown-trigger';
    trigger.innerHTML = `
        <span class="cw-current-val">${placeholder}</span>
        <div class="cw-dropdown-arrow"></div>
    `;

    // Menu (Lista)
    const menu = document.createElement('div');
    menu.className = 'cw-dropdown-menu';

    // Gera itens visuais
    options.forEach(opt => {
        if (opt.value === "") return; // Pula placeholder
        const item = document.createElement('div');
        item.className = 'cw-dropdown-option';
        item.textContent = opt.label;
        item.dataset.value = opt.value;
        
        // Clique na opção
        item.onclick = (e) => {
            e.stopPropagation();
            // 1. Atualiza visual
            trigger.querySelector('.cw-current-val').textContent = opt.label;
            menu.querySelectorAll('.cw-dropdown-option').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            
            // 2. Fecha menu
            closeMenu();

            // 3. Atualiza o select nativo e dispara evento para o resto do código saber
            nativeSelect.value = opt.value;
            nativeSelect.dispatchEvent(new Event('change'));
        };
        menu.appendChild(item);
    });

    // Lógica Abrir/Fechar
    function openMenu() {
        if (trigger.classList.contains('disabled')) return;
        menu.classList.add('open');
        trigger.classList.add('active');
        // Fecha ao clicar fora
        document.addEventListener('click', closeMenuOutside);
    }

    function closeMenu() {
        menu.classList.remove('open');
        trigger.classList.remove('active');
        document.removeEventListener('click', closeMenuOutside);
    }

    function closeMenuOutside(e) {
        if (!container.contains(e.target)) closeMenu();
    }

    trigger.onclick = () => {
        if (menu.classList.contains('open')) closeMenu();
        else openMenu();
    };

    // Montagem
    container.appendChild(trigger);
    container.appendChild(menu);
    container.appendChild(nativeSelect);

    // Método público para desabilitar visualmente
    container.setDisabled = (isDisabled) => {
        if (isDisabled) trigger.classList.add('disabled');
        else trigger.classList.remove('disabled');
        nativeSelect.disabled = isDisabled;
    };
    
    // Método público para resetar
    container.reset = () => {
        trigger.querySelector('.cw-current-val').textContent = placeholder;
        nativeSelect.value = "";
        menu.querySelectorAll('.cw-dropdown-option').forEach(el => el.classList.remove('selected'));
    };

    // Expose o select nativo para você adicionar listeners depois
    container.nativeSelect = nativeSelect;

    return container;
}