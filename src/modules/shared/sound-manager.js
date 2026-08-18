// src/modules/shared/sound-manager.js

let audioCtx = null;
let noiseBufferCache = null;

// Configurações de "Mixagem de Escritório"
// Volume muito baixo para ser percebido apenas pelo subconsciente
const MASTER_GAIN = 0.3; 
const STARTUP_SOUND = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTYXdmZ29vZCBjbGljawBUTkMyAAAAIQAAA1MvdW5kZWZpbmVkIC0gU21hbGwgQnV0dG9uIENsaWNrAP/7kGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAADwAAAAoAAAAzAazFxsfIyMnKysvLzM3Nzs/P0NHT1NbW19jZ2tvc3d7e3+Dh4uPk5ebm6Onp6uzt7u/w8fLz9PT19vf3+Pj5+vv7/Pz9/f7+/v///wAAADxMYW1lMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+5JkAAALOAAVAAAAAAjqACgAAAAAxtYwAAAAACNoAKAAAAABqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uSZCAACzoAFQAAAAAI6gAoAAAAAMbWMAAAAAAjaACgAAAAAaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+5JkTAALOgAVAAAAAAjqACgAAAAAxtYwAAAAACNoAKAAAAABqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7kmRgAAs6ABUAAAAACOoAKAAAAADG1jAAAAAAI2gAoAAAAAGqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";

let muted = localStorage.getItem('cw_sounds_muted') === 'true';

function getContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// Cria um buffer de ruído estático (base para sons de textura)
function getNoiseBuffer(ctx) {
    if (noiseBufferCache) return noiseBufferCache;
    const bufferSize = ctx.sampleRate * 2.0;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        // White Noise simples e puro
        data[i] = Math.random() * 2 - 1;
    }
    noiseBufferCache = buffer;
    return buffer;
}

export const SoundManager = {

    setMuted: (isMuted) => {
        muted = isMuted;
        localStorage.setItem('cw_sounds_muted', isMuted);
    },

    isMuted: () => muted,
    
    // 1. CLICK (Micro-interação)
    // Ref: Teclado da Apple ou Trackpad tátil. 
    // Não é um "bipe", é um estalo seco de alta frequência.
    playClick: () => {
        if (muted) return;
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        // Ruído filtrado (Highpass) cria som de "plástico/metal"
        const source = ctx.createBufferSource();
        source.buffer = getNoiseBuffer(ctx);

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 4000; // Só o "crocante" do som

        const gain = ctx.createGain();
        // Envelope ultra curto (5ms)
        gain.gain.setValueAtTime(MASTER_GAIN * 0.8, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        source.start(t);
        source.stop(t + 0.02);
    },

    // 2. HOVER (Feedback de Foco)
    // Ref: Nintendo Switch UI / Linear App.
    // Quase inaudível. Apenas um "sopro" minúsculo.
    playHover: () => {
        if (muted) return;
        // Se quiser usar, adicione no mouseenter. 
        // É tão sutil que não irrita.
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, t);
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(MASTER_GAIN * 0.1, t + 0.005); // Muito baixo
        gain.gain.linearRampToValueAtTime(0, t + 0.02);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.03);
    },

    // 3. SUCCESS (Confirmação Elegante)
    // Ref: Pagamento Apple Pay.
    // Um acorde "Glassy" mas com ataque suave. Não é festa, é confirmação.
    playSuccess: () => {
        if (muted) return;
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        // Duas frequências harmônicas (C e G) para estabilidade
        const freqs = [1046.5, 1567.9]; 

        freqs.forEach((f, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine'; 
            osc.frequency.value = f;

            // Envelope "Sino Suave"
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(MASTER_GAIN * 0.6, t + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6); // Cauda longa e limpa

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.7);
        });
    },

    // 4. SWOOSH / GENIE (Transição de UI)
    // Ref: iOS abrindo pasta.
    // Som de ar, não de laser.
    playGenieOpen: () => {
        if (muted) return;
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        const source = ctx.createBufferSource();
        source.buffer = getNoiseBuffer(ctx);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        // O filtro abre rapidamente, simulando movimento de ar
        filter.frequency.setValueAtTime(100, t);
        filter.frequency.exponentialRampToValueAtTime(800, t + 0.2);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(MASTER_GAIN * 0.5, t + 0.05);
        gain.gain.linearRampToValueAtTime(0, t + 0.25);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        source.start(t);
        source.stop(t + 0.3);
    },

    // 5. ERROR (Resistência Física)
    // Ref: macOS "Funk" sound (mas mais sutil).
    // Um "tump" grave. Não diz "ERRO!", diz "Não dá pra passar aqui".
    playError: () => {
        if (muted) return;
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Triângulo filtrado soa como madeira/borracha
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, t); // Grave
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.1); // Pitch down leve

        gain.gain.setValueAtTime(MASTER_GAIN, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15); // Muito curto

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
    },
    

  playStartup: () => {
        if (muted) return;
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        // DEFINIÇÃO DO TEMPO (O Segredo do Ritmo)
        // O "TA" acontece em t=0
        // O "DUM" começa sutilmente em t=0.05 mas explode em t=0.15
        const dumDelay = 0.12; 












        // === EVENTO 1: O "TA" (O Impacto Seco) ===
        // Precisa ser agudo no início para cortar a mixagem
        
        // 1.1 O Estalo (Knock)
        const snapOsc = ctx.createOscillator();
        const snapGain = ctx.createGain();
        const snapFilter = ctx.createBiquadFilter();

        snapOsc.type = 'square'; // Quadrada = Som oco/madeira
        // Começa bem agudo (400Hz) e cai instantaneamente. Isso dá o "T" do "Ta"
        snapOsc.frequency.setValueAtTime(400, t); 
        snapOsc.frequency.exponentialRampToValueAtTime(50, t + 0.1); 

        snapFilter.type = 'lowpass';
        snapFilter.frequency.setValueAtTime(800, t); 
        snapFilter.frequency.exponentialRampToValueAtTime(100, t + 0.1); // Filtra o final

        snapGain.gain.setValueAtTime(MASTER_GAIN * 4.0, t); // Volume alto!
        snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1); // Muito curto (100ms)

        snapOsc.connect(snapFilter);
        snapFilter.connect(snapGain);
        snapGain.connect(ctx.destination);
        snapOsc.start(t); snapOsc.stop(t + 0.12);

        // 1.2 O Peso do TA (Kick)
        // Um suporte grave para o estalo não ficar magro
        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();

        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(150, t);
        kickOsc.frequency.exponentialRampToValueAtTime(50, t + 0.15);
        
        kickGain.gain.setValueAtTime(MASTER_GAIN * 1.5, t);
        kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        
        kickOsc.connect(kickGain);
        kickGain.connect(ctx.destination);
        kickOsc.start(t); kickOsc.stop(t + 0.15);


        // === EVENTO 2: O "DUM" (O Bloom Cinematográfico) ===
        // Só começa DEPOIS que o TA bateu (usando a variável dumDelay)



        const freqs = [55, 55.4, 110.5]; // Lá A1 + Oitava (Chorus effect)

        freqs.forEach((f) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sawtooth'; // Rico em harmônicos
            osc.frequency.value = f;

            // FILTRO DE ABERTURA (O "Wahhh")
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(30, t); // Começa fechado
            // Abre o filtro EXATAMENTE após o delay
            filter.frequency.linearRampToValueAtTime(900, t + dumDelay + 0.2); 
            // Fecha devagar
            filter.frequency.exponentialRampToValueAtTime(40, t + 3.0); 

            // VOLUME (Fade In)
            gain.gain.setValueAtTime(0, t);
            // O volume sobe só depois do delay, criando a separação
            gain.gain.linearRampToValueAtTime(MASTER_GAIN * 0.6, t + dumDelay + 0.1); 
            gain.gain.exponentialRampToValueAtTime(0.001, t + 3.5);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            // Note que o oscilador começa mudo em t, mas só aparece em t + dumDelay
            osc.start(t); 
            osc.stop(t + 3.6);
        });
    },
    playNotification: () => {
        if (muted) return;
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        // Usamos duas ondas senoidais (Sine) para criar um acorde harmônico simples (Oitava)
        // Isso dá a sensação de "brilho" do vidro.
        const tones = [
            { freq: 880,  dur: 1.2, vol: 0.6 }, // A5 (Corpo do som)
            { freq: 1760, dur: 0.6, vol: 0.3 }  // A6 (Brilho/Harmônico)
        ];

        tones.forEach(tone => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(tone.freq, t);

            // Envelope "Sino": Ataque instantâneo e cauda longa
            gain.gain.setValueAtTime(0, t);
            // Ataque muito rápido (4ms) para simular o impacto físico
            gain.gain.linearRampToValueAtTime(MASTER_GAIN * tone.vol, t + 0.004); 
            // Decaimento exponencial longo (o som "ressoa")
            gain.gain.exponentialRampToValueAtTime(0.001, t + tone.dur);

            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(t);
            osc.stop(t + tone.dur + 0.1);
        });
    },

    // 6. READY (Surgimento da Pill)
    // Ref: chime de "power on" de hardware premium - curto, ascendente,
    // confirma que algo chegou sem soar como notificação nem como sucesso.
    // Toca uma única vez, no instante em que a pílula surge na tela, pra dar
    // peso sonoro a um evento que antes era puramente visual (e discreto
    // demais pra ser percebido).
    playReady: () => {
        if (muted) return;
        const ctx = getContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        // Duas notas ascendentes (Ré -> Lá, quinta justa) com um shimmer
        // (oitava acima) na segunda nota - lê como "pronto", não como alerta.
        const notes = [
            { freq: 587.33, at: 0,    dur: 0.22, vol: 0.5 },  // D5
            { freq: 880.00, at: 0.09, dur: 0.32, vol: 0.55 }, // A5
            { freq: 1760.0, at: 0.09, dur: 0.28, vol: 0.18 }, // A6 (shimmer)
        ];

        notes.forEach((n) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.value = n.freq;

            const start = t + n.at;
            gain.gain.setValueAtTime(0, start);
            gain.gain.linearRampToValueAtTime(MASTER_GAIN * n.vol, start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, start + n.dur);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(start);
            osc.stop(start + n.dur + 0.05);
        });
    },

    // Manter compatibilidade com chamadas antigas
    playSwoosh: () => { /* Alias para Genie */ SoundManager.playGenieOpen(); },
    playReset: () => { /* Alias para Error sutil */ SoundManager.playError(); },

    initGlobalListeners: () => {
        // Evita adicionar o listener duas vezes se rodar o bookmarklet de novo
        if (window._cwSoundListenersActive) return;
        window._cwSoundListenersActive = true;

        let lastPlayTime = 0;
        const COOLDOWN = 50; // ms (Evita efeito "metralhadora" se passar o mouse rápido demais)

        document.addEventListener('mouseover', (e) => {
            // 1. Otimização: Se o SoundManager estiver silenciado ou sem contexto, ignora
            if (!audioCtx) return;

            // 2. Identifica se o elemento (ou o pai dele) é interativo
            // Adicione aqui as classes ou tags que devem fazer barulho
            const target = e.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');

            // Se não for nada interativo, sai
            if (!target) return;

            // 3. BLOQUEIO DE BOLHA (Importante!)
            // O evento mouseover dispara quando você entra num botão, 
            // mas TAMBÉM dispara quando você sai de um ícone DENTRO do botão para o próprio botão.
            // Essa linha diz: "Se o mouse veio de dentro desse mesmo botão, ignora."
            if (target.contains(e.relatedTarget)) return;

            // 4. Cooldown (Debounce)
            const now = Date.now();
            if (now - lastPlayTime < COOLDOWN) return;

            // 5. Toca o som
            SoundManager.playHover();
            lastPlayTime = now;
        }, { passive: true }); // passive: true melhora performance da rolagem
    }
};