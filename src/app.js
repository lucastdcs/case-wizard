// src/app.js
// 1. Importação dos Módulos

import { initCaseNotesAssistant } from './modules/notes/notes-assistant.js';
import { initEmailAssistant } from './modules/email-assistant/email-assistant.js';
import { initCallScriptAssistant } from './modules/call-script/call-script-assistant.js';
import { initLinksAssistant } from './modules/links/links-assistant.js';
import { initBroadcastAssistant } from './modules/broadcast/broadcast-assistant.js'; 
import { initOnboarding } from './modules/onboarding/onboarding-wizard.js';
import { checkAndShowChangelog } from './modules/changelog/changelog-wizard.js';
import { initTimezoneAssistant } from './modules/timezone/timezone-assistant.js';
import { initPersonalLibrary } from './modules/personal-library/personal-library-assistant.js'; // [NOVO]
import { initConfigsAssistant } from './modules/configs/configs-assistant.js';
import { initBAUForm } from './modules/bau-form/bau-form-assistant.js';

// Importação do Serviço de Dados
import { DataService, fetchUserProfile } from './modules/shared/data-service.js';
import { getAgentEmail, setUserProfile } from './modules/shared/page-data.js';
import { applyProfileLanguage } from './modules/shared/i18n.js';
import { UserPrefsService } from './modules/shared/user-prefs-service.js';

// 2. Importação do Núcleo Compartilhado
import { initCommandCenter } from './modules/shared/command-center.js';
import { initCommandPalette } from './modules/shared/command-palette.js';
import { initGlobalStylesAndFont, playStartupAnimation, showToast } from './modules/shared/utils.js';

// --- Gerenciador de Som ---
import { SoundManager } from './modules/shared/sound-manager.js';

function initApp() {
    // Se já iniciou, só toca a animação de novo e sai (evita duplicidade)
    if (window.techSolInitialized) {
        playStartupAnimation();
        return;
    }
    window.techSolInitialized = true;

    const APP_VERSION = "v6.1.0"; 

    console.log(`🚀 TechSol Suite Initializing (${APP_VERSION})...`);

    try {
        // A. Injeta estilos globais
        initGlobalStylesAndFont();

        // --- Inicialização Sonora ---
        // O som de boot ("TA-DUM") já é disparado dentro de playStartupAnimation(),
        // sincronizado com o momento em que o "Bom dia" aparece na splash. Chamá-lo
        // aqui também fazia o som tocar duas vezes se sobrepondo (cauda de 3.6s).
        try {
            SoundManager.initGlobalListeners();
        } catch (audioErr) {
            console.warn("Áudio bloqueado:", audioErr);
        }
        
        // B. Busca o conteúdo gerenciável — os sete módulos numa execução só.
        //
        // Antes cada módulo pedia o seu quando era aberto, e o boot já disparava
        // três (dicas, avisos, disponibilidade). Numa virada de turno isso são
        // centenas de execuções simultâneas do Apps Script; em lote é uma por
        // agente. Cada módulo segue chamando fetchContentModule() como antes —
        // ele agora encontra o conteúdo já em cache e não vai à rede de novo.
        //
        // Sem await: o conteúdo tem fallback embutido e cache local, então o
        // boot não espera a rede para desenhar a tela.
        DataService.fetchContentModules([
            'tips', 'broadcast', 'bau_availability',
            'links', 'call_script', 'email_template', 'note_template'
        ]);

        // C. Animação de Entrada (Aqui o 'Sherlock' começa a buscar o nome)
        // playStartupAnimation() já é async e só resolve depois que a splash
        // sai do DOM de vez - guardamos essa promise pra passar adiante em vez
        // de deixar a pílula (abaixo) adivinhar seu próprio tempo de boot.
        const splashDone = playStartupAnimation();

        // D. Inicializa os Módulos
        const toggleNotes = initCaseNotesAssistant();
        const toggleEmail = initEmailAssistant();
        const toggleScript = initCallScriptAssistant();
        const toggleLinks = initLinksAssistant();
        const toggleTimezone = initTimezoneAssistant();
        const toggleLibrary = initPersonalLibrary(); // [NOVO] Inicializa a Biblioteca
        const toggleConfigs = initConfigsAssistant();
        const toggleBAUForm = initBAUForm();
        
        const broadcastControl = initBroadcastAssistant();

        const moduleActions = {
            toggleNotes,
            toggleEmail,
            toggleScript,
            toggleLinks,
            toggleTimezone,
            toggleLibrary, // [NOVO] Passa o controle para a pílula
            toggleConfigs,
            toggleBAUForm,
            broadcastControl
        };

        // E. Inicializa a Barra de Comando
        // A pílula só "dockeia" depois que a splash de fato terminou (ver
        // splashDone acima) - antes ela tinha um tempo fixo próprio que quase
        // nunca batia com a duração real da splash (variável, depende do
        // tamanho do nome digitado no typewriter).
        initCommandCenter(moduleActions, splashDone);

        // E.1. Command Palette (Ctrl/Cmd+K) - mesma lista de módulos, só um
        // jeito mais rápido de chegar neles sem tirar a mão do teclado.
        initCommandPalette(moduleActions);

        // F. Logs e Modais (COM DELAY TÁTICO)
        // Esperamos 2.5s para garantir que a animação capturou o e-mail do agente
        setTimeout(() => {
            
            // 1. Agora sim, logamos o Start (já teremos o LDAP em cache)
            DataService.logEvent("App", "Start", "Session Start");

            // 1.1. Aplica o idioma vindo da planilha People (se a pessoa
            // nunca trocou manualmente em Configurações neste navegador) ANTES
            // de mostrar Onboarding/Changelog - senão quem usa o Case Wizard
            // pela primeira vez veria o tutorial em PT por um instante mesmo
            // sendo hispanofalante, já que o perfil ainda não teria chegado.
            const agentEmail = getAgentEmail();

            // Preferências do agente (hoje: os atalhos do Ctrl+K). Não bloqueia
            // nada: a tela já abre com o cache local e se atualiza quando a
            // planilha responder - o Ctrl+K relê a lista a cada abertura.
            UserPrefsService.sync();

            const languagePromise = agentEmail
                ? fetchUserProfile(agentEmail.split('@')[0])
                    .then(profile => {
                        if (!profile) return;
                        // Idioma da INTERFACE (a pessoa pode trocar em
                        // Configurações) e segmento que ela ATENDE saem do mesmo
                        // perfil, mas são coisas diferentes e vão para lugares
                        // diferentes. O segmento é o que decide qual
                        // disponibilidade BAU e quais avisos segmentados ela vê.
                        applyProfileLanguage(profile);
                        setUserProfile(profile);
                    })
                    .catch(e => console.warn("Não foi possível resolver o idioma do perfil:", e))
                : Promise.resolve();

            languagePromise.finally(() => {
                // 2. Verifica Tutoriais / Changelog
                initOnboarding();

                setTimeout(() => {
                    checkAndShowChangelog(APP_VERSION);
                }, 500);
            });

        }, 2500);

    } catch (error) {
        console.error("Erro fatal na inicialização:", error);
        SoundManager.playError();
        showToast("Erro crítico ao iniciar o Case Wizard.", { error: true });
    }
}

initApp();