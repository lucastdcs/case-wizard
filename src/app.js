// src/app.js

// 1. Importação dos Módulos
import { initCaseNotesAssistant } from './modules/notes/notes-assistant.js';
import { initEmailAssistant } from './modules/email-assistant/email-assistant.js';
import { initCallScriptAssistant } from './modules/call-script/call-script-assistant.js';
import { initFeedbackAssistant } from './modules/lm-report/lm-repot-assistant.js'; 
import { initBroadcastAssistant } from './modules/broadcast/broadcast-assistant.js'; 
import { initOnboarding } from './modules/onboarding/onboarding-wizard.js';
import { checkAndShowChangelog } from './modules/changelog/changelog-wizard.js';
import { initTimezoneAssistant } from './modules/timezone/timezone-assistant.js';
import { initPersonalLibrary } from './modules/personal-library/personal-library-assistant.js'; // [NOVO]
import { initConfigsAssistant } from './modules/configs/configs-assistant.js';

// Importação do Serviço de Dados
import { DataService } from './modules/shared/data-service.js';

// 2. Importação do Núcleo Compartilhado
import { initCommandCenter } from './modules/shared/command-center.js';
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

    const APP_VERSION = "v5.2"; 

    console.log(`🚀 TechSol Suite Initializing (${APP_VERSION})...`);

    try {
        // A. Injeta estilos globais
        initGlobalStylesAndFont();

        // --- Inicialização Sonora ---
        try {
            SoundManager.initGlobalListeners(); 
            SoundManager.playStartup(); 
        } catch (audioErr) {
            console.warn("Áudio bloqueado:", audioErr);
        }
        
        // B. Busca as Dicas
        DataService.fetchTips();

        // C. Animação de Entrada (Aqui o 'Sherlock' começa a buscar o nome)
        playStartupAnimation();

        // D. Inicializa os Módulos
        const toggleNotes = initCaseNotesAssistant();
        const toggleEmail = initEmailAssistant();
        const toggleScript = initCallScriptAssistant();
        const toggleLinks = initFeedbackAssistant();
        const toggleTimezone = initTimezoneAssistant();
        const toggleLibrary = initPersonalLibrary(); // [NOVO] Inicializa a Biblioteca
        const toggleConfigs = initConfigsAssistant();
        
        const broadcastControl = initBroadcastAssistant(); 

        // E. Inicializa a Barra de Comando
        initCommandCenter({
            toggleNotes,
            toggleEmail,
            toggleScript,
            toggleLinks,
            toggleTimezone,
            toggleLibrary, // [NOVO] Passa o controle para a pílula
            toggleConfigs,
            broadcastControl
        });

        // F. Logs e Modais (COM DELAY TÁTICO)
        // Esperamos 2.5s para garantir que a animação capturou o e-mail do agente
        setTimeout(() => {
            
            // 1. Agora sim, logamos o Start (já teremos o LDAP em cache)
            DataService.logEvent("App", "Start", "Session Start");
            
            // 2. Verifica Tutoriais / Changelog
            initOnboarding(); 
            
            setTimeout(() => {
                checkAndShowChangelog(APP_VERSION);
            }, 500);
            
        }, 2500);

    } catch (error) {
        console.error("Erro fatal na inicialização:", error);
        showToast("Erro crítico ao iniciar o Case Wizard.", { error: true });
    }
}

initApp();