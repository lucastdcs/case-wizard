(()=>{var wo=Object.defineProperty;var So=(t,e)=>()=>(t&&(e=t(t=0)),e);var Co=(t,e)=>{for(var o in e)wo(t,o,{get:e[o],enumerable:!0})};var Ke={};Co(Ke,{NotesState:()=>Xe,notesState:()=>W});var Xe,W,Pe=So(()=>{Xe=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.excludedFields=new Set,this.favorites=new Set(JSON.parse(localStorage.getItem("cw-notes-favorites")||"[]")),this.screenshotMode="implementation"}setCaseType(e){this.currentCaseType=e,this.isDirty=!0,this.notify()}setLanguage(e){this.currentLang=e,this.notify()}setPortugalCase(e){this.isPortugalCase=e,this.isDirty=!0,this.notify()}setConsent(e){this.consent=e,this.isDirty=!0,this.notify()}setTagSupportUsed(e){this.tagSupportUsed=e,e||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setForcedScreenshots(e){this.forcedScreenshots=new Set(e),this.isDirty=!0,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.isDirty=!0,this.notify()}setExcludedFields(e){this.excludedFields=new Set(e),this.isDirty=!0,this.notify()}toggleFieldExclusion(e,o){o?this.excludedFields.add(e):this.excludedFields.delete(e),this.isDirty=!0,this.notify()}setStatus(e){this.currentStatus=e,this.isDirty=!0,this.notify()}setSubStatus(e){this.currentSubStatus=e,this.isDirty=!0,this.notify()}setScreenshotMode(e){this.screenshotMode=e,this.notify()}setActiveTasks(e){this.activeTasks=e,this.isDirty=!0,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]=o,this.isDirty=!0,this.notify()}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},W=new Xe});var Ue="",We="",Et=t=>new Promise(e=>setTimeout(e,t));async function Tt(){if(Ue&&We)return Ue;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Et(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let a=document.querySelector("profile-details img");if(a&&a.src.includes("/photos/")){let i=a.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let n=document.querySelector("profile-details .email");return n&&(We=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",We)),t.click(),document.body.click(),Ue=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function dt(){return Ue||"Consultor"}function Ee(){return We||null}function kt(t){let e=new Date,o=e.getHours(),n=e.getDay(),a="Ol\xE1",i="";o>=5&&o<12?(a="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(a="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(a="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let s=[];o>=0&&o<5?s=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?n===1?s=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?s=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:s=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?s=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:s=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(s=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=s[Math.floor(Math.random()*s.length)];return{prefix:`${a},`,name:t,suffix:r,icon:i,isFriday:n===5}}async function Ao(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,n=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');n&&(n.click(),await Et(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(s=>{let r=s.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Eo(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function To(){try{let e=Array.from(document.querySelectorAll(".data-pair-label")).find(a=>a.textContent.includes("Google Ads External Customer ID")||a.textContent.includes("Customer ID"));if(e){let a=e.closest("home-data-item")||e.parentElement;if(a){let i=a.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let n=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(n)return n[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"---"}async function ve(){let t="Cliente",e="[INSERIR URL]";try{let s=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(s&&s.nextElementSibling){let r=s.nextElementSibling.innerText.trim();r&&(t=r)}}catch(i){console.warn("Falha Nome:",i)}try{let s=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(s&&s.nextElementSibling){let r=s.nextElementSibling.innerText.trim();r&&(e=r)}}catch(i){console.warn("Falha URL:",i)}let o=await Ao(),n=Eo(),a=To();return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:n,cid:a,agentName:dt()}}var Fe=null,pt=null,we=.3;var Se=localStorage.getItem("cw_sounds_muted")==="true";function Ie(){if(!Fe){let t=window.AudioContext||window.webkitAudioContext;t&&(Fe=new t)}return Fe&&Fe.state==="suspended"&&Fe.resume(),Fe}function Ot(t){if(pt)return pt;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),n=o.getChannelData(0);for(let a=0;a<e;a++)n[a]=Math.random()*2-1;return pt=o,o}var $={setMuted:t=>{Se=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>Se,playClick:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Ot(t);let n=t.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let a=t.createGain();a.gain.setValueAtTime(we*.8,e),a.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(n),n.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(we*.1,e+.005),n.gain.linearRampToValueAtTime(0,e+.02),o.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((n,a)=>{let i=t.createOscillator(),s=t.createGain();i.type="sine",i.frequency.value=n,s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(we*.6,e+.05),s.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(s),s.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Ot(t);let n=t.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,e),n.frequency.exponentialRampToValueAtTime(800,e+.2);let a=t.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(we*.5,e+.05),a.gain.linearRampToValueAtTime(0,e+.25),o.connect(n),n.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime,o=t.createOscillator(),n=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),n.gain.setValueAtTime(we,e),n.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime,o=.12,n=t.createOscillator(),a=t.createGain(),i=t.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,e),n.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),a.gain.setValueAtTime(we*4,e),a.gain.exponentialRampToValueAtTime(.001,e+.1),n.connect(i),i.connect(a),a.connect(t.destination),n.start(e),n.stop(e+.12);let s=t.createOscillator(),r=t.createGain();s.type="sine",s.frequency.setValueAtTime(150,e),s.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(we*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),s.connect(r),r.connect(t.destination),s.start(e),s.stop(e+.15),[55,55.4,110.5].forEach(p=>{let l=t.createOscillator(),b=t.createGain(),h=t.createBiquadFilter();l.type="sawtooth",l.frequency.value=p,h.type="lowpass",h.frequency.setValueAtTime(30,e),h.frequency.linearRampToValueAtTime(900,e+o+.2),h.frequency.exponentialRampToValueAtTime(40,e+3),b.gain.setValueAtTime(0,e),b.gain.linearRampToValueAtTime(we*.6,e+o+.1),b.gain.exponentialRampToValueAtTime(.001,e+3.5),l.connect(h),h.connect(b),b.connect(t.destination),l.start(e),l.stop(e+3.6)})},playNotification:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let a=t.createOscillator(),i=t.createGain();a.type="sine",a.frequency.setValueAtTime(n.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(we*n.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+n.dur),a.connect(i),i.connect(t.destination),a.start(e),a.stop(e+n.dur+.1)})},playSwoosh:()=>{$.playGenieOpen()},playReset:()=>{$.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!Fe)return;let n=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(o.relatedTarget))return;let a=Date.now();a-t<e||($.playHover(),t=a)},{passive:!0})}};var It=1e4;function qt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
        :root {
            --cw-primary: #1a73e8;
            --cw-primary-hover: #1557b0;
            --cw-surface: #ffffff;
            --cw-surface-glass: rgba(255, 255, 255, 0.95);
            --cw-border: #dadce0;
            --cw-text: #202124;
            --cw-text-sub: #5f6368;
            --cw-ease-elastic: cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* Rollbar e Ajustes Globais */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.4); }
        
        /* FONTE GOOGLE OFICIAL & RENDERING APPLE */
        body, button, input, select, textarea, .cw-pill, .cw-module, .cw-btn::after {
            font-family: 'Google Sans', 'Roboto', sans-serif !important;
            -webkit-font-smoothing: antialiased;
        }

        /* FOCUS STATES (Anel Google) */
        input:focus, textarea:focus, select:focus {
            outline: none !important;
            border-color: var(--cw-primary) !important;
            box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2) !important;
        }

        /* FEEDBACK T\xC1TIL GLOBAL (Clique F\xEDsico) */
        button:active, .cw-clickable:active { 
            transform: scale(0.96) translateY(1px); 
            transition: transform 0.1s var(--cw-ease-elastic);
        }

        textarea.bullet-textarea { padding-left: 10px; }
        
        /* Classes utilit\xE1rias do Script Assistant (Refinadas) */
        .csa-group-container { border-left: 3px solid transparent; padding-left: 8px; transition: all 0.3s ease-out; }
        .csa-group-title { transition: color 0.3s ease-out; }
        .csa-group-container.csa-group-completed { border-left: 3px solid #34a853; }
        .csa-group-container.csa-group-completed .csa-group-title { color: #34a853; }
        
        .csa-li { 
            margin: 6px 0 !important; 
            padding: 10px 12px; border-radius: 8px; 
            border: 1px solid transparent;
            transition: all 0.2s var(--cw-ease-elastic); 
            font-size: 14px; cursor: pointer; user-select: none;
            background-color: #f8f9fa; color: var(--cw-text); line-height: 1.4;
            text-decoration: none; transform: scale(1);
        }
        .csa-li:hover { 
            background-color: #e8f0fe; 
            color: var(--cw-primary);
            transform: translateX(4px); 
        }
        .csa-li.csa-completed { 
            text-decoration: line-through; 
            color: var(--cw-text-sub); 
            opacity: 0.7;
            background: transparent;
            border: 1px dashed var(--cw-border);
        }

        /* Classe base para todos os selects do projeto */
    .cw-select {
        /* 1. Resetando o estilo nativo (O segredo) */
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        
        /* 2. Dimens\xF5es e Fonte */
        width: 100%;
        padding: 10px 36px 10px 12px; /* Espa\xE7o extra na direita para a seta */
        font-family: 'Google Sans', Roboto, Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.5;
        color: #3C4043; /* Google Grey 800 */
        
        /* 3. A Caixa (Material Design) */
        background-color: #FFFFFF;
        border: 1px solid #DADCE0; /* Borda suave */
        border-radius: 6px; /* Canto levemente arredondado */
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        
        /* 4. A Seta Customizada (SVG via Data URI) */
        /* Isso desenha um chevron cinza escuro, igual ao do Gmail */
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235F6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: right 8px center;
        background-size: 18px;
    }

    /* Hover: Escurece levemente a borda e o fundo */
    .cw-select:hover {
        border-color: #202124;
        background-color: #F8F9FA;
    }

    /* Focus: O anel azul caracter\xEDstico do Google */
    .cw-select:focus {
        border-color: #1A73E8;
        box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
        outline: none;
        background-color: #FFFFFF;
    }

    /* Disabled: Visual apagado */
    .cw-select:disabled {
        background-color: #F1F3F4;
        color: #9AA0A6;
        cursor: not-allowed;
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239AA0A6%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
    }
    
    /* Label flutuante (Opcional, se voc\xEA usar labels acima dos selects) */
    .cw-input-label {
        display: block;
        font-size: 12px;
        font-weight: 700;
        color: #5F6368;
        margin-bottom: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
        /* Container do Dropdown Customizado */
.cw-dropdown-container {
    position: relative;
    width: 100%;
    font-family: 'Google Sans', Roboto, sans-serif;
}

/* O Bot\xE3o (A caixa fechada) */
.cw-dropdown-trigger {
    background: #fff;
    border: 1px solid #DADCE0;
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 14px;
    color: #3C4043;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
}
.cw-dropdown-trigger:hover { background: #F8F9FA; border-color: #202124; }
.cw-dropdown-trigger.active { 
    border-color: #1A73E8; 
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2); 
}
.cw-dropdown-trigger.disabled { 
    background: #F1F3F4; color: #9AA0A6; pointer-events: none; 
}

/* A Seta */
.cw-dropdown-arrow {
    width: 18px; height: 18px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235F6368' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 0.2s;
}
.cw-dropdown-trigger.active .cw-dropdown-arrow { transform: rotate(180deg); }

/* A Lista (O menu aberto) */
.cw-dropdown-menu {
    position: absolute;
    top: 100%; left: 0; width: 100%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(32,33,36,0.28);
    margin-top: 4px;
    padding: 6px 0;
    z-index: 9999;
    display: none;
    max-height: 250px;
    overflow-y: auto;
    opacity: 0; transform: translateY(-10px);
    transition: opacity 0.2s, transform 0.2s;
}
.cw-dropdown-menu.open { 
    display: block; 
    opacity: 1; transform: translateY(0); 
}

/* As Op\xE7\xF5es */
.cw-dropdown-option {
    padding: 10px 16px;
    font-size: 14px;
    color: #3C4043;
    cursor: pointer;
    transition: background 0.1s;
}
.cw-dropdown-option:hover { background-color: #F1F3F4; }
.cw-dropdown-option.selected { 
    color: #1A73E8; 
    background-color: #E8F0FE; 
    font-weight: 500;
}
    `,document.head.appendChild(e)}function Y(t,e={}){let o=document.createElement("div"),n=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?$.playError():$.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function Lt(t,e=null){let o=0,n=0,a=0,i=0,s=e||t;s.style.cursor="grab",s.onmousedown=r;function r(l){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(l.target.tagName)||l.target.closest(".no-drag"))return;l=l||window.event,s.style.cursor="grabbing",t.style.transition="none";let b=t.getBoundingClientRect();t.style.transform="none",t.style.left=b.left+"px",t.style.top=b.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",It++,t.style.zIndex=It,a=l.clientX,i=l.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=p,document.onmousemove=c}function c(l){l=l||window.event,l.preventDefault(),o=a-l.clientX,n=i-l.clientY,a=l.clientX,i=l.clientY;let b=t.offsetTop-n,h=t.offsetLeft-o,g=16,m=window.innerWidth,d=window.innerHeight,S=t.offsetWidth,w=t.offsetHeight;h<g?h=g:h+S>m-g&&(h=m-S-g),b<g?b=g:b+w>d-g&&(b=d-w-g),t.style.top=b+"px",t.style.left=h+"px"}function p(){document.onmouseup=null,document.onmousemove=null,s.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var le={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var mt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Ye={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var _t={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Ge={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var ut=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],Ft=-1;function Mt(){let t=Math.floor(Math.random()*ut.length);return t===Ft&&(t=(t+1)%ut.length),Ft=t,ut[t]}var Ce=t=>new Promise(e=>setTimeout(e,t));async function ko(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await Ce(200);for(let n=0;n<e.length;n++){let a=e.charAt(n),i=document.createElement("span");i.textContent=a,o&&o.parentNode===t?o.before(i):t.appendChild(i);let s=Math.floor(Math.random()*60)+30;n===0&&(s=150),n>e.length-3&&(s=30),await Ce(s)}await Ce(600),o&&(o.style.display="none")}async function gt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: 2147483647; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1); }
            .splash-exit { animation: focus-out 0.9s cubic-bezier(0.4, 0.0, 0.2, 1) forwards; }
            @keyframes focus-out { 0% { opacity: 1; transform: scale(1); filter: blur(0); } 100% { opacity: 0; transform: scale(1.15); filter: blur(15px); } }
            
            .sentence-wrapper { display: flex; flex-wrap: wrap; justify-content: center; align-items: baseline; gap: 10px; max-width: 80%; position: relative; }
            .text-part { font-size: 32px; color: #E8EAED; opacity: 0; transition: opacity 0.8s ease; }
            .text-name { font-size: 32px; font-weight: 700; background: linear-gradient(90deg, #8AB4F8, #C58AF9, #F28B82); -webkit-background-clip: text; -webkit-text-fill-color: transparent; opacity: 0; }
            .text-footer { font-size: 20px; color: #9AA0A6; font-weight: 400; width: 100%; text-align: center; margin-top: 12px; opacity: 0; transform: translateY(10px); transition: all 1s cubic-bezier(0.0, 0.0, 0.2, 1); }
            
            .sextou-badge { display: inline-flex; align-items: center; gap: 6px; margin-top: 16px; padding: 6px 16px; border-radius: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #F28B82; font-size: 14px; font-weight: 500; opacity: 0; transform: scale(0.8); transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1); }
            .cursor { color: #8AB4F8; -webkit-text-fill-color: #8AB4F8; font-weight: 100; margin-left: 1px; animation: blink 1s infinite; }
            
            .brand-logo { position: absolute; top: 40px; font-size: 20px; font-weight: 500; color: #5f6368; letter-spacing: 1px; text-transform: uppercase; opacity: 0; animation: fade-in-down 0.8s ease forwards; }
            .weather-icon { width: 42px; height: 42px; margin-bottom: 24px; opacity: 0; transform: scale(0.8); transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
            .credit-pro { position: absolute; bottom: 30px; font-size: 11px; color: #5f6368; letter-spacing: 0.5px; opacity: 0; animation: fade-in-simple 1.5s ease 1s forwards; }
            .credit-pro span { color: #8AB4F8; font-weight: 500; opacity: 0.9; }
            
            .loader-line { position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853); transform: scaleX(0); transform-origin: left; animation: load-line 4s linear forwards; }
            
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            @keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes load-line { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
            @keyframes fade-in-simple { to { opacity: 1; } }
        `,document.head.appendChild(e)}let t=document.createElement("div");t.className="splash-container",t.innerHTML=`
        <div class="brand-logo">Case Wizard</div>
        <div id="w-icon"></div>
        <div class="sentence-wrapper">
            <div id="p1" class="text-part"></div>
            <div id="p2" class="text-name"></div>
            <div id="p3" class="text-footer"></div>
            <div id="p-sextou" style="width: 100%; text-align: center; display: none;">
                <div class="sextou-badge">\u{1F389} Sextou!</div>
            </div>
        </div>
        <div class="credit-pro">created by <span>@lucaste</span></div>
        <div class="loader-line"></div>
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Ce(200);let e=await Tt(),o=kt(e),n=t.querySelector("#w-icon"),a=t.querySelector("#p1"),i=t.querySelector("#p2"),s=t.querySelector("#p3"),r=t.querySelector("#p-sextou");n&&(n.innerHTML=o.icon),a&&(a.textContent=o.prefix),s&&(s.textContent=o.suffix),await Ce(300);let c=n?n.querySelector("svg"):null;if(c&&(c.style.opacity="1",c.style.transform="scale(1)"),await Ce(400),a&&(a.style.opacity="1"),$.playStartup(),i&&await ko(i,o.name),s&&(s.style.opacity="1",s.style.transform="translateY(0)"),o.isFriday&&r){await Ce(400),r.style.display="block",r.offsetWidth;let p=r.querySelector(".sextou-badge");p&&(p.style.opacity="1",p.style.transform="scale(1)")}await Ce(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Ce(900),t.parentNode&&t.parentNode.removeChild(t)}}var Te={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function ke(t,e){e.onmousedown=o;function o(n){n.stopPropagation(),n.preventDefault();let a=t.style.transition;t.style.transition="none";let i=n.clientX,s=n.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),c=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),p=i,l=s,b=!1;function h(d){p=d.clientX,l=d.clientY,b||(window.requestAnimationFrame(()=>{g(),b=!1}),b=!0)}function g(){let d=r+(p-i),S=c+(l-s);d>360&&(t.style.width=d+"px"),S>300&&(t.style.height=S+"px")}function m(){document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",m),setTimeout(()=>{t.style.transition=a},50)}document.addEventListener("mousemove",h),document.addEventListener("mouseup",m)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function Dt(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function Nt(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function Rt(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function he(t,e={}){return new Promise(o=>{let n=Nt(),a=Rt(),i=e.danger?"#FF3B30":"#007AFF",s=e.confirmText||(e.danger?"Excluir":"Confirmar");a.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${s}</button>
            </div>
        `,n.appendChild(a),document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity=1,a.style.transform="scale(1)"});let r=l=>{n.style.opacity=0,a.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(l)},300)},c=a.querySelector("#cw-conf-cancel"),p=a.querySelector("#cw-conf-ok");[c,p].forEach(l=>l.onmouseenter=()=>$.playHover()),c.onclick=()=>{$.playClick(),r(!1)},p.onclick=()=>{$.playClick(),r(!0)}})}function zt(t,e=""){return new Promise(o=>{let n=Nt(),a=Rt();a.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,n.appendChild(a),document.body.appendChild(n);let i=a.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{n.style.opacity=1,a.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let s=p=>{n.style.opacity=0,a.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(p)},300)},r=a.querySelector("#cw-prompt-cancel"),c=a.querySelector("#cw-prompt-ok");[r,c].forEach(p=>p.onmouseenter=()=>$.playHover()),r.onclick=()=>{$.playClick(),s(null)},c.onclick=()=>{$.playClick(),s(i.value)},i.onkeydown=p=>{p.key==="Enter"&&c.click(),p.key==="Escape"&&r.click()}})}Pe();var Oo={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Bt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function ce(t,e,o,n,a,i){let s=document.createElement("div");Object.assign(s.style,Oo),Lt(t,s);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),s.appendChild(r),a&&(a.googleLine=r);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"12px"});let p=document.createElement("img");p.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(p.style,{width:"20px",height:"20px",pointerEvents:"none"});let l=document.createElement("span");l.textContent=e,c.appendChild(p),c.appendChild(l);let b=document.createElement("div");Object.assign(b.style,{display:"flex",alignItems:"center",gap:"4px"});let h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',g='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',m=document.createElement("div");m.innerHTML=h,Object.assign(m.style,Bt),m.title="Sobre & Feedback",m.classList.add("no-drag"),m.onmouseenter=()=>{m.style.background="rgba(255,255,255,0.1)",m.style.color="#FFF"},m.onmouseleave=()=>{m.style.color!=="rgb(138, 180, 248)"&&(m.style.background="transparent",m.style.color="#9AA0A6")};let d=document.createElement("div");d.innerHTML=g,Object.assign(d.style,Bt),d.title="Fechar",d.classList.add("no-drag"),d.onmouseenter=()=>{d.style.background="rgba(242, 139, 130, 0.2)",d.style.color="#F28B82"},d.onmouseleave=()=>{d.style.background="transparent",d.style.color="#9AA0A6"},d.onmousedown=w=>w.stopPropagation(),m.onmousedown=w=>w.stopPropagation(),d.onclick=i;let S=Io(t,e,o,n);return m.onclick=w=>{w.stopPropagation(),S.style.opacity==="1"?(S.style.opacity="0",S.style.pointerEvents="none",m.style.color="#9AA0A6",m.style.background="transparent"):(S.style.opacity="1",S.style.pointerEvents="auto",m.style.color="#8AB4F8",m.style.background="rgba(138, 180, 248, 0.1)")},b.appendChild(m),b.appendChild(d),s.appendChild(c),s.appendChild(b),s}function Io(t,e,o,n){let a=document.createElement("div");return Object.assign(a.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),a.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${e}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Vers\xE3o ${o}</div>
        
        <div style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${n}
        </div>

        <div style="margin-bottom: 32px;">
            <a href="https://forms.gle/vkvMzSEiuEHpTnKu6" target="_blank" id="cw-feedback-link" style="
                display: inline-flex; align-items: center; gap: 8px;
                padding: 10px 20px;
                background-color: #F8F9FA;
                border: 1px dashed #1a73e8;
                border-radius: 20px;
                color: #1a73e8;
                font-size: 13px;
                font-weight: 500;
                text-decoration: none;
                transition: all 0.2s ease;
            ">
                <span>\u{1F4AC}</span> Reportar Bug ou Sugest\xE3o
            </a>
        </div>

        <div style="font-size: 12px; color: #9aa0a6;">
            created by <span style="color: #1a73e8; font-weight: 500;">@lucaste</span>
        </div>
        
        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #5f6368; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            Voltar
        </button>
    `,setTimeout(()=>{let i=a.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let s=a.querySelector("#close-help-internal");s&&(s.onmouseover=()=>s.style.backgroundColor="#f8f9fa",s.onmouseout=()=>s.style.backgroundColor="white",s.onclick=()=>{a.style.opacity="0",a.style.pointerEvents="none"})},0),t.appendChild(a),a}var D={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},ie={small:"8px",medium:"12px",large:"20px",pill:"100px"},Ne={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},ne="cubic-bezier(0.25, 1, 0.3, 1)",Fo={width:"100%",padding:"14px 16px",borderRadius:ie.medium,border:`1.5px solid ${D.border}`,backgroundColor:D.bgInput,fontSize:"14px",color:D.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.25s ${ne}`,outline:"none"},Zo={...Fo,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},Qo={fontSize:"12px",fontWeight:"700",color:D.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},en={display:"block",fontSize:"14px",fontWeight:"600",color:D.text,marginBottom:"10px",marginTop:"20px"},tn={fontSize:"12px",color:D.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},bt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:D.primary},on={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:D.text,cursor:"pointer",padding:"16px 20px",backgroundColor:D.surface,border:`1px solid ${D.border}`,borderRadius:ie.large,transition:`all 0.3s ${ne}`,userSelect:"none",boxShadow:Ne.subtle},nn={padding:"14px 28px",color:"#fff",backgroundColor:D.primary,border:"none",borderRadius:ie.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.2s ${ne}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},an={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${D.primary}`,color:D.primary,borderRadius:ie.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.2s ${ne}`},sn={background:"transparent",border:`1px solid ${D.border}`,borderRadius:ie.pill,color:D.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.2s ${ne}`};function Gt(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,le,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${ne}, height 0.4s ${ne}, transform 0.4s ${ne}, opacity 0.3s ease`,borderRadius:ie.large,boxShadow:Ne.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let n={popup:o,googleLine:null},a=ce(o,"Case Notes",t,"Gera notas padronizadas com excel\xEAncia visual.",n,e);o.appendChild(a);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:D.surface}),o.appendChild(i);let s=document.createElement("div");s.textContent="created by lucaste@",Object.assign(s.style,_t,{padding:"16px 24px",borderTop:`1px solid ${D.bgInput}`,color:D.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(s);let r=document.createElement("div");return Object.assign(r.style,Te),r.className="no-drag",o.appendChild(r),ke(o,r),qo(),{popup:o,content:i,header:a,animRefs:n,credit:s}}function qo(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100%;
            padding: 12px 16px;
            border-radius: ${ie.medium};
            border: 1px solid ${D.border};
            font-size: 14px;
            font-family: 'Google Sans', Roboto, sans-serif;
            transition: all 0.2s ${ne};
            box-sizing: border-box;
            background: ${D.bgInput};
            color: ${D.text};
            outline: none;
        }

        .cw-select {
            appearance: none;
            -webkit-appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
            background-repeat: no-repeat;
            background-position: right 16px center;
            background-size: 18px;
            padding-right: 44px !important;
            cursor: pointer;
        }

        .cw-input:hover, .cw-textarea:hover, .cw-select:hover {
            border-color: #bdc1c6;
            background: #f1f3f4;
        }

        .cw-input:focus, .cw-textarea:focus, .cw-select:focus {
            border-color: ${D.primary};
            background: #fff;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15);
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${D.textSub};
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 8px 0 12px 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .cw-section-title::after {
            content: "";
            flex: 1;
            height: 1px;
            background: ${D.bgInput};
        }

        .cw-btn-primary {
            background: ${D.primary};
            color: #fff;
            border: none;
            border-radius: ${ie.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${ne};
            box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        .cw-btn-primary:hover {
            background: #1765cc;
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(26, 115, 232, 0.4);
        }
        .cw-btn-primary:active { transform: translateY(0); }

        .cw-btn-secondary {
            background: #fff;
            color: ${D.textSub};
            border: 1px solid ${D.border};
            border-radius: ${ie.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${ne};
        }
        .cw-btn-secondary:hover {
            background: ${D.bgInput};
            border-color: #bdc1c6;
            color: ${D.text};
        }
    `,document.head.appendChild(t)}var ge={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria (com um link para https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:",reason_comments:"Reason/Comments:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:",reason_comments:"Reason/Comments:"}},xe={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Ae={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},qe={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Re=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Je=["CONSIDERACOES","COMENTARIOS"],Ze={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
\u2022 Configura\xE7\xE3o de Convers\xF5es`,"field-CONTEXTO_CALL":`\u2022 Percebi que o(a) anunciante n\xE3o tinha GTM Instalado.
\u2022 Seguimos com a cria\xE7\xE3o de conta no GTM.
\u2022 Entretanto, a conta de acesso ao painel do site (ex: WordPress) n\xE3o tinha permiss\xE3o para instalar plugins ou editar o c\xF3digo.`,"field-IMPEDIMENTO_CLIENTE":`\u2022 Anunciante precisa conseguir acesso de administrador ao painel do site.
\u2022 OU
\u2022 Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.`,"field-MINHA_ACAO":`\u2022 Coloco o caso em 2/6.
\u2022 Assim que o anunciante tiver o acesso ou a instala\xE7\xE3o for feita, abrirei um caso em BAU para dar continuidade.`,"field-SCREENSHOTS":"\u2022 Print do painel do CMS mostrando a falta de permiss\xE3o (opcional)."},"quickfill-ni-awaiting-ecw4":{type:"all","field-REASON_COMMENTS":"Aguardando valida\xE7\xE3o de dados (ECW4 - 7 Dias)","field-TASKS_SOLICITADAS":"\u2022 Implementa\xE7\xE3o de Convers\xF5es Otimizadas (ECW4)","field-CONTEXTO_CALL":`\u2022 Criamos a convers\xE3o no Google Ads.
\u2022 Configuramos o disparo das tags via GTM.
\u2022 Adicionamos a tag de UPD (User Provided Data).
\u2022 Testamos juntos e validamos o bom funcionamento.`,"field-MINHA_ACAO":"\u2022 Coloco o caso em status de Awaiting Validation para acompanhamento de 7 dias.",linkedTask:"ads_enhanced_conversions"},"quickfill-ni-awaiting-ga4":{type:"all","field-REASON_COMMENTS":"Aguardando valida\xE7\xE3o de dados (GA4 Event - 48h)","field-TASKS_SOLICITADAS":"\u2022 Implementa\xE7\xE3o de Eventos GA4","field-CONTEXTO_CALL":`\u2022 Criamos o evento no GA4.
\u2022 Configuramos o disparo das tags via GTM.
\u2022 Testamos juntos e validamos o bom funcionamento.`,"field-MINHA_ACAO":"\u2022 Coloco o caso em status de Awaiting Validation para acompanhamento de 48h.",linkedTask:"ga4_event_tracking"},"quickfill-ni-followup-bau":{type:"bau","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up BAU 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas n\xE3o obtive resposta. Envio na sequ\xEAncia o email referente ao dia respectivo.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`},"quickfill-ni-followup-lm":{type:"lm","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up LM 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 enviei e-mail de follow-up (caso LM, sem tentativas de liga\xE7\xE3o), mas n\xE3o obtive resposta.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":"\u2022 E-mail de follow-up enviado (LM) -"},"quickfill-gtm-install":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
\u2022 Instalamos dentro do CMS/Hospedagem.
\u2022 Criamos o Vinculador de Convers\xF5es.`,"field-RESULTADO":"\u2022 Validei a instala\xE7\xE3o.",linkedTask:"gtm_installation"},"quickfill-whatsapp":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para WHATSAPP","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM usando acionadores de clique (ex: Click URL / Click Text) para os bot\xF5es de WhatsApp.
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-form":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para FORMUL\xC1RIO (padr\xE3o, n\xE3o-otimizada).","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM usando o acionador de envio de formul\xE1rio (Form Submission) ou visualiza\xE7\xE3o de p\xE1gina de agradecimento (Thank You Page).
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-ecw4-close":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento da convers\xE3o otimizada (ECW4) ap\xF3s 7 dias.","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de 7 dias de acompanhamento, verifiquei o painel do Ads.
\u2022 A convers\xE3o est\xE1 sendo registrada corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento da convers\xE3o otimizada.
\u2022 Assim, fecho o caso.`,linkedTask:"ads_enhanced_conversions"},"quickfill-ga4-event-close":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento de Eventos GA4 ap\xF3s 48h.","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de 48h de acompanhamento, verifiquei o painel.
\u2022 O evento est\xE1 sendo registrado corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento do rastreamento de eventos.
\u2022 Assim, fecho o caso.`,linkedTask:"ga4_event_tracking"},"quickfill-as-no-show":{type:"all","field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o compareceu na meet, por\xE9m respondeu o e-mail pedindo o reagendamento"},"quickfill-as-insufficient-time":{type:"all","field-MOTIVO_REAGENDAMENTO":`\u2022 Precisamos reagendar o caso, j\xE1 que o tempo foi insuficiente para terminar as Tasks
\u2022 Implementamos [descrever o que foi feito]`},"quickfill-as-no-access":{type:"all","field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o tinha os acessos necess\xE1rios para podermos implementar as tasks"},"quickfill-in-nrp-bau":{type:"bau","field-REASON_COMMENTS":"NRP (BAU - 3 tentativas)","field-COMENTARIOS":`\u2022 Duas liga\xE7\xF5es seguidas, e e-mail "Antes dos 10 minutos" e uma terceira e ultima tentativa de liga\xE7\xE3o.
\u2022 N\xE3o houve resposta \xE0s tentativas de liga\xE7\xE3o ou e-mail, por isso o caso ser\xE1 inativado.`,"field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -
\u2022 Tentativa 3 -`,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-nrp-lm":{type:"lm","field-REASON_COMMENTS":"NRP (LM - Sem tentativas)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-COMENTARIOS":`\u2022 Tentativa de contato via e-mail (sem chamada) para o caso LM, sem resposta.
\u2022 Caso inativado.`,"field-SCREENSHOTS":"\u2022 Caso LM, sem tentativas de liga\xE7\xE3o.","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-no-show-bau":{type:"bau","field-REASON_COMMENTS":"Sem resposta ao 2 Day Rule.","field-ON_CALL":"N/A","field-COMENTARIOS":`\u2022 O caso foi gerado e entrei na chamada no hor\xE1rio agendado.
\u2022 O anunciante n\xE3o compareceu \xE0 reuni\xE3o.
\u2022 Segui o protocolo de espera (BAU): realizei duas tentativas de liga\xE7\xE3o, sem sucesso.
\u2022 Nenhuma das liga\xE7\xF5es foi atendida (ex: Caixa Postal).
\u2022 Caso inativado ap\xF3s 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 Tentativa 1 - 
\u2022 Tentativa 2  - 
\u2022 Tentativa 3 - `,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-manual":{type:"all","field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-dc-lm-no-access":{type:"lm","field-REASON_COMMENTS":"Discard - Falta de acessos (Reagendamento solicitado)","field-COMENTARIOS":`N\xE3o conseguimos implementar nada durante a consultoria, j\xE1 que o adv n\xE3o tinha os acessos.

Irei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`},"quickfill-ni-attempted-2day":{type:"bau","field-REASON_COMMENTS":"Attempted Contact (In\xEDcio 2 Day Rule)","field-CONTEXTO_CALL":`\u2022 Fiz a primeira tentativa de liga\xE7\xE3o, sem sucesso.
\u2022 Enviei uma mensagem no chat para o AM.
\u2022 Aguardei 5 minutos e fiz a segunda tentativa de liga\xE7\xE3o, novamente sem sucesso.
\u2022 Aguardei mais 5 minutos e agora farei o acompanhamento 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 MSG AM -
\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`}};var ze=t=>new Promise(e=>setTimeout(e,t));function je(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var Pt="cw-automation-styles";if(!document.getElementById(Pt)){let t=document.createElement("style");t.id=Pt,t.innerHTML=`
        /* Anima\xE7\xE3o da Borda Google */
        @keyframes google-border-spin {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .cw-scanning-active {
            /* Borda gradiente animada */
            border: 2px solid transparent !important;
            border-radius: 8px !important;
            background-image: linear-gradient(#fff, #fff), 
                              linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            background-size: 200% 200%;
            animation: google-border-spin 1.5s linear infinite;
            box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3) !important;
            
            /* Traz para frente do Overlay */
            position: relative;
            z-index: 1000000 !important; 
            pointer-events: none;
        }

        /* Overlay Limpo (Sem texto, s\xF3 Blur) */
        #cw-loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(255, 255, 255, 0.4); /* Branco Transl\xFAcido */
            backdrop-filter: blur(5px);           /* O Desfoque Apple Glass */
            -webkit-backdrop-filter: blur(5px);
            z-index: 999999;                      /* Fica atr\xE1s do Input (1000000) */
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: all;                  /* Bloqueia cliques na p\xE1gina */
        }
    `,document.head.appendChild(t)}function jt(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function $t(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),o="";jt(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(je(n),await ze(1200));let a=document.querySelector("search-filter dropdown-button .button");if(a&&!(a.innerText||"").includes("All")){je(a),await ze(600);let h=document.querySelector('material-checkbox[debug-id="check-all-box"]');h&&h.getAttribute("aria-checked")!=="true"&&(je(h),await ze(300));let g=document.querySelector('material-button[debug-id="apply-filter"]');g&&(je(g),await ze(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await ze(500));let s=Array.from(document.querySelectorAll(".message-header"));for(let b=s.length-1;b>=0;b--){let h=s[b],g=h.querySelector("i.material-icons-extended"),m=g&&g.innerText.trim()==="phone_in_talk",d=h.innerText||"",S=d.includes("Agent joined")||d.includes("outbound-call")||d.includes("Speakeasy");if(m||S){h.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",h),e&&(e.placeholder="Lendo mensagem..."),je(h),await ze(1e3));break}}let c=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),p=/Speakeasy.*?(P\d{15,25})/i,l=null;for(let b=c.length-1;b>=0;b--){let h=c[b];if(h.offsetParent===null)continue;let g=(h.innerText||"").match(p);if(g&&g[1]){l=g[1];break}}if(e)if(l){try{await navigator.clipboard.writeText(l)}catch{}e.value=l,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),$.playSuccess(),Y(`ID Localizado: ${l}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else $.playError(),Y("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),Y("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),jt(!1)}}function Ht(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,n=this.selectionEnd,a=this.value,i=a.lastIndexOf(`
`,o-1)+1,s=a.substring(i,o);if(e.key==="Enter"){e.preventDefault();let r=s.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(s.trim()==="\u2022"){this.value=a.substring(0,i)+`
`+a.substring(n),this.selectionStart=this.selectionEnd=i+1;return}let c=`
`+r;this.value=a.substring(0,o)+c+a.substring(n),this.selectionStart=this.selectionEnd=o+c.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?s.startsWith("  ")&&(this.value=a.substring(0,i)+s.substring(2)+a.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=a.substring(0,i)+"  "+s+a.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===n&&o>0){let r=a.substring(0,o);r.endsWith("\u2022 ")?(e.preventDefault(),this.value=r.substring(0,o-2)+a.substring(n),this.selectionStart=this.selectionEnd=o-2):r.endsWith("  ")&&s.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=r.substring(0,o-2)+a.substring(n),this.selectionStart=this.selectionEnd=o-2)}}))}function Qe(t,e,o){e.innerHTML="";let n=Ae[t];if(!n)return;let a=n.template.match(/{([A-Z0-9_]+)}/g)||[],i=[...new Set(a)],s=!1;if(i.forEach(r=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(r))return;let c=r.slice(1,-1),p=`field-${c}`;if(o.excludedFields.has(p))return;let l=document.createElement("label"),b=d=>ge[o.currentLang]?.[d]||ge.pt?.[d]||d;l.textContent=b(c.toLowerCase())!==c.toLowerCase()?b(c.toLowerCase()):c.replace(/_/g," ").replace(/\b\w/g,d=>d.toUpperCase())+":",Object.assign(l.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:D.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let h=document.createElement("span");if(h.textContent=l.textContent,l.innerHTML="",l.appendChild(h),c==="SPEAKEASY_ID"){let d=document.createElement("button");d.innerHTML="\u2728 Auto Busca",d.style.cssText=`font-size: 11px; font-weight: 700; color: ${D.primary}; background-color: ${D.primaryBg}; border: none; border-radius: ${ie.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${ne};`,d.onmouseenter=()=>d.style.backgroundColor="#d2e3fc",d.onmouseleave=()=>d.style.backgroundColor=D.primaryBg,d.onclick=S=>{S.preventDefault(),$t(p)},l.appendChild(d)}let g=document.createElement("button");g.innerHTML="\u2715",g.style.cssText=`font-size: 14px; background: ${D.bgInput}; border: none; color: ${D.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${ne};`,g.onmouseenter=()=>{g.style.background=D.error,g.style.color=D.surface},g.onmouseleave=()=>{g.style.background=D.bgInput,g.style.color=D.textSub},g.onclick=d=>{d.preventDefault(),o.toggleFieldExclusion(p,!0),Qe(t,e,o)},l.appendChild(g);let m;Re.includes(c)?(m=document.createElement("textarea"),m.classList.add("bullet-textarea","cw-textarea"),m.placeholder="Utilize marcadores para detalhar...",Ht(m)):Je.includes(c)?(m=document.createElement("textarea"),m.classList.add("cw-textarea"),m.placeholder="Descreva as considera\xE7\xF5es..."):(m=document.createElement("input"),m.type="text",m.classList.add("cw-input")),c==="ON_CALL"&&o.currentCaseType==="lm"&&(l.style.display="none",m.style.display="none",m.value="N/A"),m.id=p,m.value=o.formData[p]||"",m.addEventListener("input",d=>o.updateField(p,d.target.value)),e.appendChild(l),e.appendChild(m)}),o.isPortugalCase){let r=l=>ge[o.currentLang]?.[l]||ge.pt?.[l]||l,c=document.createElement("label");c.textContent=r("consentiu_gravacao"),Object.assign(c.style,{display:"block",fontSize:"13px",fontWeight:"700",color:D.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let p=document.createElement("select");p.className="cw-select",p.innerHTML=`
            <option value="false">${r("nao")}</option>
            <option value="true">${r("sim")}</option>
        `,p.value=o.consent?"true":"false",p.onchange=()=>o.setConsent(p.value==="true"),e.appendChild(c),e.appendChild(p)}}function ft(t,e,o){let n=t.currentSubStatus;if(!n)return null;let i=Ae[n].template.replace(/\n/g,"<br>"),s='style="margin-bottom: 12px; padding-left: 30px;"',r=[],c="",p=e.getCheckedElements();p.length>0&&p.forEach(h=>{let g=h.value,m=xe[g],d=h.count||1,S=g==="ads_conversion_tracking"||g==="ads_enhanced_conversions";if(t.tagSupportUsed&&S&&!t.forcedScreenshots.has(g)){let R=z=>ge[t.currentLang]?.[z]||ge.pt?.[z]||z;r.push(`${m.name} - ${R("ts_output_disclaimer")}`)}else r.push(d>1?`${m.name} (x${d})`:m.name)});let l=e.screenshotsElement;if(l){let h=Array.from(l.querySelectorAll('input[id^="name-"]'));h.length>0&&h.forEach(g=>{let m=g.value,d=g.closest(".cw-screen-card");if(d){let S=d.querySelectorAll('input[id^="screen-"]'),w=!1,R="";S.forEach(z=>{let X=z.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",U=z.value.trim();R+=`<li>${X} -${U?" "+U:""}</li>`,w=!0}),w&&(c+=`<b>${m}</b><ul ${s}>${R}</ul>`)}})}i.includes("{TAGS_IMPLEMENTED}")?i=i.replace(/{TAGS_IMPLEMENTED}/g,r.join(", ")||"N/A"):r.length>0&&(i+=`<br><b>Tags:</b> ${r.join(", ")}<br>`),i.includes("{SCREENSHOTS_LIST}")?i=i.replace(/{SCREENSHOTS_LIST}/g,c||"N/A"):c!==""&&(i+=`<br>${c}`);let b=h=>ge[t.currentLang]?.[h]||ge.pt?.[h]||h;if(t.isPortugalCase){let h=t.consent?b("sim"):b("nao");i=i.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${b("consentiu_gravacao")}</b> ${h}<br><br>`).replace(/{CASO_PORTUGAL}/g,`<br><b>${b("caso_portugal")}</b> ${b("sim")}<br>`)}else i=i.replace(/{CASO_PORTUGAL}/g,"").replace(/{CONSENTIU_GRAVACAO}/g,"");for(let h in t.formData){if(t.excludedFields.has(h)){let w=h.replace("field-",""),R=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${w}\\}(?:<br>\\s*)?`,"gi");i=i.replace(R,"").replace(new RegExp(`{${w}}`,"g"),"");continue}let g=h.replace("field-",""),m=new RegExp(`{${g}}`,"g"),d=t.formData[h];if(Re.includes(g)&&d.trim()!==""){let w=d.split(`
`).map(R=>R.trim()).filter(R=>R!==""&&R!=="\u2022").map(R=>R.startsWith("\u2022 ")?R.substring(2):R).map(R=>`<li>${R}</li>`).join("");d=w?`<ul ${s}>${w}</ul>`:""}else Je.includes(g)&&(d=d.split(`
`).filter(w=>w.trim()!=="").map(w=>`<p style="margin: 0 0 8px 0;">${w}</p>`).join(""));let S=d.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(S===""||S==="\u2022"||S.toLowerCase()==="n/a"){let w=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${g}\\}(?:<br>\\s*)?`,"gi");i=i.replace(w,"").replace(m,"")}else i=i.replace(m,d.replace(/\$/g,"$$$$"))}return i=i.replace(/{([A-Z0-9_]+)}/g,"").replace(/(<br>){3,}/g,"<br><br>"),o?.getOutput&&(i+=o.getOutput()),i}function Vt(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o=document.createElement("div");Object.assign(o.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),n.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let a=null;return e.render=(i,s)=>{a=null;let r=Object.entries(Ze).filter(([c,p])=>{let l=!p.type||p.type==="all"||p.type===s,b=!1;return i.startsWith("NI_")?b=c.includes("-ni-")||c.includes("attempted"):i.startsWith("SO_")?b=c.includes("gtm")||c.includes("whatsapp")||c.includes("form")||c.includes("ecw4")||c.includes("ga4")||c.includes("-so-"):i.startsWith("AS_")?b=c.includes("-as-"):i.startsWith("IN_")?b=c.includes("-in-"):i.startsWith("DC_")&&(b=c.includes("-dc-")),l&&b});o.innerHTML="",r.forEach(([c,p])=>{let l=document.createElement("div"),b=c.replace("quickfill-","").replace(/-/g," ");l.textContent=b,l.dataset.id=c,Object.assign(l.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let h=p["field-REASON_COMMENTS"]||p["field-CONTEXTO_CALL"]||c;l.onmouseenter=()=>{a!==c&&(n.textContent=h.substring(0,100)+(h.length>100?"...":""),l.style.background="#f1f3f4")},l.onmouseleave=()=>{a!==c&&(l.style.background="#ffffff",a||(n.textContent="Passe o mouse para ver os detalhes"))},l.onclick=()=>{$.playClick();let g=a!==c;a=g?c:null,Array.from(o.children).forEach(m=>{let d=m.dataset.id===a;m.style.background=d?"#e8f0fe":"#ffffff",m.style.borderColor=d?"#1a73e8":"#dadce0",m.style.color=d?"#1967d2":"#3c4043"}),t(c,g)},o.appendChild(l)}),r.length===0?e.style.display="none":e.style.display="block"},e.appendChild(o),e.appendChild(n),e}var Z={bg:D.bgInput,white:D.surface,border:D.border,textMain:D.text,textSub:D.textSub,blue:D.blue,blueLight:D.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:D.blue,bg:D.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:D.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:D.primary,bg:D.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:D.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Le={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Ut(t,e,o){let n={},a="implementation";o&&o.subscribe(()=>{X(),U()});function i(q){let O=q.toLowerCase();return O.includes("ads")||O.includes("conversion")||O.includes("remarketing")?Z.brands.ads:O.includes("ga4")||O.includes("analytics")?Z.brands.ga4:O.includes("gtm")||O.includes("tag manager")||O.includes("container")?Z.brands.gtm:O.includes("merchant")||O.includes("shopping")||O.includes("feed")?Z.brands.gmc:Z.brands.default}let s=Object.entries(xe).filter(([q,O])=>O.popular),r={};Object.entries(xe).forEach(([q,O])=>{if(O.popular)return;let L=i(O.name);r[L.label]||(r[L.label]={brand:L,tasks:[]}),r[L.label].tasks.push({key:q,...O})});let c="cw-zen-tasks";if(!document.getElementById(c)){let q=document.createElement("style");q.id=c,q.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${Z.font}; background: ${Z.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${Z.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${Z.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${Z.white}; 
                border: 1.5px solid #f1f3f4;
                border-radius: 20px;
                padding: 16px;
                cursor: pointer; 
                position: relative; 
                height: 90px;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                transition: all 0.4s cubic-bezier(0.25, 1, 0.3, 1);
                box-shadow: 0 2px 6px rgba(0,0,0,0.02);
                overflow: hidden;
            }
            
            /* Corre\xE7\xE3o do Grid \xCDmpar */
            .cw-hero-card:last-child:nth-child(odd) { grid-column: span 2; }

            /* Intera\xE7\xE3o */
            .cw-hero-card:hover { border-color: var(--hero-color); box-shadow: 0 8px 20px rgba(0,0,0,0.06); transform: translateY(-3px); }
            .cw-hero-card:active { transform: scale(0.96) translateY(0); }

            /* HERO ACTIVE STATE (Borda Colorida Apenas) */
            .cw-hero-card.active {
                background: #FFFFFF;
                border-color: var(--hero-color);
                box-shadow: 0 0 0 1px var(--hero-color), 0 10px 20px rgba(0,0,0,0.04);
            }

            .cw-hero-card.ts-success {
                background: #F0FDF4 !important;
                border-color: #22C55E !important;
                box-shadow: 0 0 0 1px #22C55E, 0 4px 12px rgba(34, 197, 94, 0.1) !important;
            }
            .cw-hero-card.ts-success .cw-hero-label { color: #166534 !important; }

            /* CONTAINER DE CONTE\xDADO (Para anima\xE7\xE3o de deslize) */
            .cw-hero-main {
                display: flex; align-items: center; gap: 10px;
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                width: 100%; justify-content: center;
            }
            /* Quando ativo, sobe um pouquinho para caber o stepper */
            .cw-hero-card.active .cw-hero-main { transform: translateY(-12px); }

            /* \xCDCONE (Sempre Neutro) */
            .cw-hero-icon { 
                width: 32px; height: 32px; border-radius: 8px; 
                background: #F3F4F6; /* Cinza Apple Neutro */
                display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                transition: background 0.2s;
            }
            /* \xCDcone SVG sempre vis\xEDvel */
            .cw-hero-icon svg { width: 20px; height: 20px; }
            
            /* No active, o \xEDcone pode ficar branco puro para destacar o logo */
            .cw-hero-card.active .cw-hero-icon { background: #FFFFFF; border: 1px solid #F3F4F6; }

            /* TEXTO */
            .cw-hero-label { 
                font-size: 12px; font-weight: 500; color: ${Z.textMain}; line-height: 1.2; 
                text-align: left;
            }
            .cw-hero-card.active .cw-hero-label { font-weight: 600; color: var(--hero-color); }

            /* STEPPER (Surge de baixo) */
            .cw-hero-stepper {
                position: absolute; bottom: 8px; left: 0; right: 0;
                display: flex; align-items: center; justify-content: center; gap: 12px;
                opacity: 0; transform: translateY(10px);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
            }
            .cw-hero-card.active .cw-hero-stepper { opacity: 1; transform: translateY(0); pointer-events: auto; }
            
            /* Bot\xF5es do Stepper */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 50%; background: #F3F4F6;
                color: ${Z.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${Z.border}; border-radius: 10px; background: ${Z.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${Z.blue}; box-shadow: 0 0 0 3px ${Z.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${Z.border}; border-radius: 10px; background: ${Z.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${Z.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${Z.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${Z.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${Z.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${Z.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${Z.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${Z.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${Z.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${Z.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${Z.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${Z.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${Z.textMain}; }
            
            .cw-footer-icons { display: flex; flex-direction: row-reverse; padding-left: 8px; }
            .cw-mini-icon { 
                width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;
                color: white; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 1px 2px rgba(0,0,0,0.15); position: relative; margin-left: -8px;
            }
            .cw-mini-icon svg { width: 12px; height: 12px; fill: currentColor; }

            @keyframes cwSlideDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

/* --- SCREENSHOTS: FINE & ELEGANT (Step 3) --- */
            
            .cw-screens-container {
                display: flex; flex-direction: column; gap: 12px;
                padding: 4px 4px 40px 4px; /* Respiro para n\xE3o cortar sombras */
            }

            /* CART\xC3O (Base F\xEDsica) */
            .cw-screen-card {
                background: #FFFFFF;
                border-radius: 24px;
                border: 1.5px solid #f1f3f4;
                border-left: 8px solid var(--brand-color);
                
                padding: 24px;
                position: relative;
                transition: all 0.4s cubic-bezier(0.25, 1, 0.3, 1);
                box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                margin-bottom: 16px;
            }

            .cw-screen-card:hover {
                box-shadow: 0 12px 30px rgba(0,0,0,0.06);
                border-color: #e5e7eb;
            }

            .cw-screen-card.ts-success {
                background: #F0FDF4;
                border-color: #BBF7D0;
                border-left-color: #22C55E;
            }

            .cw-ts-disclaimer-box {
                padding: 12px;
                background: #DCFCE7;
                border-radius: 8px;
                font-size: 12px;
                color: #166534;
                margin-top: 8px;
                line-height: 1.4;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .cw-btn-ts-force {
                align-self: flex-start;
                padding: 4px 10px;
                background: #fff;
                border: 1px solid #22C55E;
                color: #166534;
                border-radius: 6px;
                cursor: pointer;
                font-size: 11px;
                font-weight: 600;
            }
            .cw-btn-ts-force:hover { background: #f0fdf4; }

            /* Intera\xE7\xE3o de Foco no Cart\xE3o */
            .cw-screen-card:focus-within {
                border-color: #E5E7EB; 
                border-left-width: 6px; /* A faixa engorda levemente */
                background: #FFFFFF;
                /* Sombra difusa estilo Apple ao focar */
                box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
                transform: translateX(2px); /* Micro-movimento lateral */
            }

            /* HEADER DO CART\xC3O */
            .cw-card-header {
                display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
                /* Sem borda inferior para visual mais limpo/moderno */
            }
            
            /* \xCDCONE (Puro, sem fundo) */
            .cw-card-icon {
                width: 24px; height: 24px; flex-shrink: 0;
                display: flex; align-items: center; justify-content: center;
            }
            .cw-card-icon svg { width: 100%; height: 100%; }

            /* T\xCDTULO EDIT\xC1VEL */
            .cw-card-title-input {
                font-family: ${Z.font}; font-size: 15px; font-weight: 600; color: ${Z.textMain};
                border: 1px solid transparent; 
                border-radius: 6px;
                background: transparent; 
                width: 100%; outline: none;
                padding: 4px 8px; margin-left: -8px; /* Alinhamento \xF3ptico */
                transition: all 0.2s ease;
                cursor: text;
            }

            /* Hover no header revela que \xE9 edit\xE1vel */
            .cw-card-header:hover .cw-card-title-input {
                background: #F1F3F4;
                border-color: transparent;
            }
            
            /* Foco no t\xEDtulo: Azul Google Padr\xE3o para indicar edi\xE7\xE3o de texto */
            .cw-card-title-input:focus {
                background: #FFFFFF;
                border-color: ${Z.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${Z.textSub}; opacity: 0; 
                transform: translateX(-10px); transition: all 0.2s ease;
                pointer-events: none; white-space: nowrap;
            }
            .cw-card-header:hover .cw-edit-hint { opacity: 1; transform: translateX(0); }

            /* INFO BANNER (Win Criteria) */
            .cw-info-banner {
                margin: 0 4px 16px 4px;
                padding: 10px 14px;
                background: #F8F9FA;
                border: 1px dashed #DADCE0;
                border-radius: 8px;
                font-size: 11px; color: ${Z.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${Z.brands.ads.color}; text-decoration: none; font-weight: 600; }
            .cw-info-link:hover { text-decoration: underline; }

            /* FOOTER ICONS (Limpo & Original) */
            .cw-mini-icon { 
                width: 26px; height: 26px; border-radius: 50%; 
                background: #FFFFFF; border: 1px solid #E0E0E0;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                margin-left: -8px; position: relative; z-index: 1;
            }
            .cw-mini-icon svg { width: 14px; height: 14px; } 

            /* INPUTS (Campos de Link) */
            .cw-input-group { margin-bottom: 16px; position: relative; }
            .cw-input-group:last-child { margin-bottom: 0; }

            .cw-input-label {
                display: block; font-size: 11px; font-weight: 700; color: ${Z.textSub};
                margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.8px;
            }

            .cw-input-field {
                width: 100%; box-sizing: border-box;
                padding: 12px 14px;
                border-radius: 12px;
                border: 1.5px solid #f1f3f4;
                background: #f8f9fa;
                font-size: 14px; color: #374151;
                transition: all 0.25s cubic-bezier(0.25, 1, 0.3, 1); outline: none;
            }

            /* Foco no Input: Usa a cor da marca */
            .cw-input-field:focus {
                background: #FFFFFF;
                border-color: var(--brand-color); /* Din\xE2mico! */
                box-shadow: 0 0 0 2px var(--brand-bg); /* Anel de foco din\xE2mico */
            }
            
            /* Sucesso (Dopamina) */
            .cw-input-field.filled {
                background-color: #F0FDF4;
                border-color: #DCFCE7;
                color: #166534;
                padding-right: 36px;
            }

            /* Check Icon Animado */
            .cw-input-check {
                position: absolute; right: 10px; bottom: 10px; 
                color: #16A34A; width: 16px; height: 16px;
                opacity: 0; transform: scale(0.5); 
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
            }
            .cw-input-field.filled + .cw-input-check { opacity: 1; transform: scale(1); }
        `,document.head.appendChild(q)}let p=document.createElement("div");p.className="cw-zen-container";let l=document.createElement("div");Object.assign(l.style,{display:"none"});let b=document.createElement("div");b.className="cw-screens-container",l.appendChild(b),p.innerHTML=`
        <div class="cw-zen-content">
            <div class="cw-hero-section">
                <div class="cw-section-subtitle js-hero-title" style="font-size:11px; font-weight:700; color:#6B7280; text-transform:uppercase; letter-spacing:0.8px;">${e("acesso_rapido")}</div>
                <div class="cw-hero-grid"></div>
                <div class="cw-helper-text">Atalhos para as implementa\xE7\xF5es mais frequentes.<br>Use a busca abaixo para o cat\xE1logo completo.</div>
            </div>

            <div class="cw-list-section">
                <div class="cw-search-wrapper">
                    <input class="cw-search-input" placeholder="${e("buscar_catalogo")}">
                </div>
                <div class="cw-acc-container"></div>
                <div class="cw-results-container" style="display:none"></div>
            </div>
        </div>

        <div class="cw-status-bar">
            <div class="cw-status-text">0 a\xE7\xF5es definidas</div>
            <div class="cw-footer-icons"></div>
        </div>
    `;let h=p.querySelector(".cw-hero-grid"),g=p.querySelector(".cw-acc-container"),m=p.querySelector(".cw-results-container"),d=p.querySelector(".cw-search-input"),S=p.querySelector(".cw-status-bar"),w=p.querySelector(".cw-status-text"),R=p.querySelector(".cw-footer-icons");s.forEach(([q,O])=>{let L=i(O.name),G=document.createElement("div");G.className="cw-hero-card",G.id=`hero-${q}`,G.style.setProperty("--hero-color",L.color),G.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Le[L.icon]}</div>
                <div class="cw-hero-label">${O.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,G.onclick=M=>{if(M.target.closest(".cw-step-btn"))return;let I=n[q]?n[q].count:0;j(q,I>0?-I:1,O)},G.querySelector(".minus").onclick=()=>j(q,-1,O),G.querySelector(".plus").onclick=()=>j(q,1,O),G.dataset.color=L.color,h.appendChild(G)});function z(q,O){let L=i(O.name),G=document.createElement("div");return G.className="cw-task-item",G.dataset.id=q,G.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${L.bg}; color:${L.color}">
                    ${Le[L.icon]||Le.default}
                </div>
                <div class="cw-task-label">${O.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,G.onclick=M=>{if(M.target.closest(".cw-step-btn"))return;let I=n[q]?n[q].count:0;j(q,I>0?-I:1,O)},G.querySelector(".minus").onclick=()=>j(q,-1,O),G.querySelector(".plus").onclick=()=>j(q,1,O),G}Object.entries(r).forEach(([q,O])=>{let L=document.createElement("div");L.className="cw-acc-group";let G=document.createElement("div");G.className="cw-acc-header",G.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${O.brand.color}"></div>
                ${q}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,G.onclick=()=>{g.querySelectorAll(".cw-acc-group.open").forEach(I=>{I!==L&&I.classList.remove("open")}),L.classList.toggle("open")};let M=document.createElement("div");M.className="cw-acc-body",O.tasks.forEach(I=>{let A=z(I.key,I);M.appendChild(A)}),L.appendChild(G),L.appendChild(M),g.appendChild(L)});function j(q,O,L){n[q]||(n[q]={count:0,data:L,brand:i(L.name)}),n[q].count+=O,n[q].count<=0&&delete n[q],X(),U(),t&&t()}function X(){let q=o.tagSupportUsed;s.forEach(([I])=>{let A=h.querySelector(`#hero-${I}`);if(!A)return;let F=n[I];F?(A.classList.add("active"),A.querySelector(".cw-step-val").textContent=F.count,A.querySelector(".cw-step-val").style.color=A.dataset.color,q&&(I==="ads_conversion_tracking"||I==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(I)?A.classList.add("ts-success"):A.classList.remove("ts-success")):(A.classList.remove("active"),A.classList.remove("ts-success"))}),p.querySelectorAll(".cw-task-item").forEach(I=>{let A=I.dataset.id,F=n[A];F?(I.classList.add("selected"),I.querySelector(".cw-step-val").textContent=F.count,q&&(A==="ads_conversion_tracking"||A==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(A)?I.classList.add("ts-success"):I.classList.remove("ts-success")):(I.classList.remove("selected"),I.classList.remove("ts-success"))});let L=Object.keys(n),G=0,M=[];if(L.forEach(I=>{let A=n[I];G+=A.count;for(let F=0;F<A.count;F++)M.length<6&&M.push(A.brand)}),G>0){S.classList.add("visible");let I=G>1?"A\xE7\xF5es":"A\xE7\xE3o",A=G>1?"definidas":"definida";w.textContent=`${G} ${I} ${A}`,R.innerHTML="",M.forEach(F=>{let f=document.createElement("div");f.className="cw-mini-icon",f.innerHTML=Le[F.icon]||Le.default;let E=f.querySelector("svg");E&&(E.style.width="14px",E.style.height="14px"),R.appendChild(f)})}else S.classList.remove("visible")}d.addEventListener("input",q=>{let O=q.target.value.toLowerCase();if(O.length>0){g.style.display="none",m.style.display="block",m.innerHTML="";let L=!1;Object.entries(xe).forEach(([G,M])=>{if(M.name.toLowerCase().includes(O)){L=!0;let I=z(G,M);n[G]&&(I.classList.add("selected"),I.querySelector(".cw-step-val").textContent=n[G].count),m.appendChild(I)}}),L||(m.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else g.style.display="block",m.style.display="none"});function U(){b.innerHTML="";let q=Object.keys(n),O=!1;if(q.length===0){b.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,l.style.display="none";return}let L=o.tagSupportUsed,G=document.createElement("div");G.className="cw-info-banner",G.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,b.appendChild(G),q.forEach(M=>{let I=n[M].data,A=n[M].count,F=n[M].brand,E=L&&(M==="ads_conversion_tracking"||M==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(M),v=o.screenshotMode||"implementation",C=I.screenshots?.[v]||[];if(C.length>0||E){O=!0;for(let k=1;k<=A;k++){let x=document.createElement("div");x.className="cw-screen-card",E&&x.classList.add("ts-success"),x.style.setProperty("--brand-color",F.color),x.style.setProperty("--brand-bg",F.bg),x.style.setProperty("--brand-shadow",F.color+"40");let B=document.createElement("div");B.className="cw-card-header";let N=document.createElement("div");N.className="cw-card-icon",N.innerHTML=Le[F.icon]||Le.default;let _=document.createElement("div");_.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let u=document.createElement("input");u.className="cw-card-title-input",u.id=`name-${M}-${k}`,u.value=`${I.name}${A>1?" #"+k:""}`,u.title="Clique para renomear esta task";let T=document.createElement("span");if(T.className="cw-edit-hint",T.innerHTML="\u270E Renomear",_.appendChild(u),_.appendChild(T),B.appendChild(N),B.appendChild(_),x.appendChild(B),E){let y=document.createElement("div");y.className="cw-ts-disclaimer-box",y.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,y.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(M,!0)},x.appendChild(y)}else C.forEach((y,P)=>{let V=document.createElement("div");V.className="cw-input-group";let K=document.createElement("label");K.className="cw-input-label",K.textContent=y;let H=document.createElement("input");H.className="cw-input-field",H.id=`screen-${M}-${k}-${P}`,H.placeholder="Cole o link aqui...",H.setAttribute("autocomplete","off"),H.addEventListener("input",()=>{H.value.trim().length>5?H.classList.add("filled"):H.classList.remove("filled")});let J=document.createElement("div");J.className="cw-input-check",J.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',V.appendChild(K),V.appendChild(H),V.appendChild(J),x.appendChild(V)});b.appendChild(x)}}}),l.style.display=O?"block":"none"}return{selectionElement:p,screenshotsElement:l,updateSubStatus:()=>U(),getCheckedElements:()=>Object.keys(n).map(q=>({value:q,count:n[q].count})),setTaskCount:(q,O)=>{n[q]&&delete n[q],O>0&&xe[q]&&j(q,O,xe[q])},toggleTask:(q,O=!0)=>{let L=n[q];O&&!L?j(q,1,xe[q]):!O&&L&&j(q,-L.count,xe[q])},setLanguage:q=>{e=q;let O=p.querySelector(".js-hero-title");O&&(O.textContent=e("acesso_rapido"));let L=p.querySelector(".cw-search-input");L&&(L.placeholder=e("buscar_catalogo")),U()},reset:()=>{for(let q in n)delete n[q];d.value="",g.style.display="block",m.style.display="none",X(),U()}}}var Lo={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},_o={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},Mo={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},Do={display:"flex",gap:"20px",marginBottom:"12px"};function Wt(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,Lo);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,mt,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,Do);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="Sim",Object.assign(a.style,bt);let i=document.createElement("label");i.textContent="Sim";let s=document.createElement("div");Object.assign(s.style,{display:"flex",alignItems:"center"}),s.appendChild(a),s.appendChild(i);let r=document.createElement("input");r.type="radio",r.name="ts_usage_mod",r.value="N\xE3o",r.checked=!0,Object.assign(r.style,bt);let c=document.createElement("label");c.textContent="N\xE3o";let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center"}),p.appendChild(r),p.appendChild(c),n.appendChild(s),n.appendChild(p);let l=document.createElement("div");l.style.display="block";let b=document.createElement("label");b.className="js-ts-reason-label",b.textContent=t("motivo_ts"),Object.assign(b.style,mt,{fontSize:"12px"});let h=document.createElement("input");h.type="text",Object.assign(h.style,Mo);let g=document.createElement("div");g.className="js-ts-warning",g.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(g.style,_o),l.appendChild(b),l.appendChild(h),l.appendChild(g),e.appendChild(o),e.appendChild(n),e.appendChild(l),a.onchange=()=>{l.style.display="none",Promise.resolve().then(()=>(Pe(),Ke)).then(R=>R.notesState.setTagSupportUsed(!0))},r.onchange=()=>{l.style.display="block",Promise.resolve().then(()=>(Pe(),Ke)).then(R=>R.notesState.setTagSupportUsed(!1))};function m(R,z){if(e.style.display="none",!R||!z||z.length===0)return;z.some(X=>X==="ads_conversion_tracking"||X==="ads_enhanced_conversions")?e.style.display="block":(w(),Promise.resolve().then(()=>(Pe(),Ke)).then(X=>X.notesState.setTagSupportUsed(!1)))}function d(){if(e.style.display==="none")return"";let R=`<br><b>Utilizou Tag Support?</b> ${a.checked?"Sim":"N\xE3o"}`;return r.checked&&h.value.trim()!==""&&(R+=`<br><b>Motivo:</b> ${h.value}`),R+="<br>",R}function S(R){t=R,o.textContent=t("utilizou_tag_support"),b.textContent=t("motivo_ts"),g.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function w(){e.style.display="none",r.checked=!0,a.checked=!1,l.style.display="block",h.value=""}return{element:e,updateVisibility:m,getOutput:d,setLanguage:S,reset:w}}var ht="cw_notes_parking_lot",et="cw_notes_emergency_save";var be={getAll:()=>{try{return JSON.parse(localStorage.getItem(ht)||"[]")}catch{return[]}},save:t=>{let e=be.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(ht,JSON.stringify(e)),o},delete:t=>{let e=be.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(ht,JSON.stringify(e)),e},getCount:()=>be.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(et,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(et);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(et),null):e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(et)}};function Yt(t){let{onSaveCurrent:e,onLoadDraft:o,t:n}=t,a=document.createElement("button");a.className="js-btn-park",a.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${n("guardar")}</span>
    `,a.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${ie.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${D.surface};
        color: ${D.textSub};
        border: 1px solid ${D.border};
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ${ne};
        box-shadow: ${Ne.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,a.onmouseenter=()=>{a.style.backgroundColor="#F8F9FA",a.style.borderColor="#202124",a.style.color="#202124",a.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",a.style.transform="translateY(-1px)"},a.onmouseleave=()=>{a.style.backgroundColor="#FFFFFF",a.style.borderColor="#DADCE0",a.style.color="#5F6368",a.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",a.style.transform="translateY(0)"},a.onmousedown=()=>a.style.transform="scale(0.96)",a.onmouseup=()=>a.style.transform="scale(1) translateY(-1px)",a.onclick=async()=>{if(await he("Deseja guardar o rascunho atual e limpar os campos?"))try{let d=await e();d?(be.save(d),g(),r(),$.playSuccess(),Y("Rascunho salvo com sucesso!")):Y("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(d){console.error("Erro ao salvar rascunho:",d),Y("Erro ao salvar.",{error:!0})}};let i=document.createElement("div");i.title="Meus Rascunhos",i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let s=document.createElement("div");s.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(s),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=m=>{m.stopPropagation(),h()};function r(){let m=be.getCount();m>0?(s.style.display="block",s.textContent=m,s.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):s.style.display="none"}let c=document.createElement("div");c.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${D.surface}; z-index: 100;
        border-radius: ${ie.large} ${ie.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${ne};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let p=document.createElement("div");p.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",p.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${n("rascunhos_salvos")}</span>`;let l=document.createElement("button");l.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',l.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",l.onmouseenter=()=>l.style.background="#F1F3F4",l.onmouseleave=()=>l.style.background="transparent",l.onclick=()=>h(!1),p.appendChild(l);let b=document.createElement("div");b.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",c.appendChild(p),c.appendChild(b);function h(m){let d=c.style.transform==="translateY(0%)";(m!==void 0?m:!d)?(g(),c.style.transform="translateY(0%)"):c.style.transform="translateY(110%)"}function g(){let m=be.getAll();if(b.innerHTML="",m.length===0){b.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${D.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${n("nenhum_rascunho")}</div>
                </div>`;return}m.forEach(d=>{let S=document.createElement("div");S.style.cssText=`
                background: ${D.surface}; padding: 20px; border-radius: ${ie.large};
                border: 1.5px solid ${D.bgInput}; box-shadow: ${Ne.subtle};
                position: relative; transition: all 0.3s ${ne};
            `;let R=new Date(d.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),z="";d.summaryTags&&d.summaryTags.length>0&&(z=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${d.summaryTags.slice(0,3).join(", ")+(d.summaryTags.length>3?"...":"")}</div>`),S.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${d.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${R}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${d.cid||"---"}</span>
                    <span style="display:block; color:${d.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${d.subStatus||d.status||"Sem Status"}</span>
                    ${z}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let j=S.querySelector(".cw-resume-btn");j.onclick=async()=>{await he("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(d),be.delete(d.id),g(),r(),h(!1),$.playSwoosh(),Y("Rascunho carregado."))};let X=S.querySelector(".cw-del-btn");X.onclick=async()=>{await he("Excluir este rascunho?",{danger:!0})&&(be.delete(d.id),g(),r())},b.appendChild(S)})}return r(),{parkButton:a,historyBtnWrapper:i,drawer:c}}var Xt=t=>new Promise(e=>setTimeout(e,t));function tt(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function $e(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let n=window.getSelection();n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")}catch{Y("Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(e)}function ot(t){["input","change","keydown","keyup"].forEach(o=>{let n=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(n)})}function Kt(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function nt(){console.log("Iniciando processo de Nova Nota...");let t=Kt(),e=t.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(s=>s.innerText.trim()==="description");if(n){let s=n.closest("material-fab")||n.closest("material-button");s?(s.style&&(s.style.display="block",s.style.visibility="visible"),tt(s)):tt(n)}else{let s=document.querySelector("material-fab-speed-dial");if(s){let r=s.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),tt(r)):s.click(),await Xt(800);let p=Array.from(document.querySelectorAll("i.material-icons-extended")).find(l=>l.innerText.trim()==="description");p&&tt(p)}}let a=null,i=0;for(;!a&&i<20;){await Xt(300);let s=Kt();if(s.length>e)a=s.find(r=>!t.includes(r)),a||(a=s[s.length-1]);else if(i>10){let r=s.filter(c=>c.offsetParent!==null);r.length>0&&(a=r[r.length-1])}i++}return a}function Jt(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let n=document.createElement("div");n.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(n),e.appendChild(o),o.addEventListener("scroll",()=>{n.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let a={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function s({id:z,label:j,type:X="text",placeholder:U="",required:q=!1,parent:O=o}){let L=document.createElement("div");L.style.cssText=a.inputWrapper;let G=document.createElement("label");G.style.cssText=a.label,G.innerHTML=`${j} ${q?'<span style="color:#D93025">*</span>':""}`;let M;return X==="textarea"?(M=document.createElement("textarea"),M.style.cssText=a.input+a.textarea):(M=document.createElement("input"),M.type=X,M.style.cssText=a.input),M.id=z,M.placeholder=U,M.addEventListener("focus",()=>{M.style.borderColor="#1a73e8",M.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),M.addEventListener("blur",()=>{M.style.borderColor="#DADCE0",M.style.boxShadow="none",q&&M.value.trim()!==""&&(M.style.backgroundColor="#FFF")}),i[z]={input:M,wrapper:L,required:q},L.appendChild(G),L.appendChild(M),O.appendChild(L),L}function r({id:z,label:j,options:X=["Yes","No"],defaultValue:U="No",onChange:q=null}){let O=document.createElement("div");O.style.cssText=a.inputWrapper;let L=document.createElement("label");L.style.cssText=a.label,L.textContent=j,O.appendChild(L);let G=document.createElement("div");G.style.cssText=a.radioGroup;let M=document.createElement("input");return M.type="hidden",M.id=z,M.value=U,O.appendChild(M),X.forEach(I=>{let A=document.createElement("div");A.textContent=I,A.style.cssText=a.radioLabel,I===U&&(A.style.cssText+=a.radioActive),A.onclick=()=>{Array.from(G.children).forEach(f=>f.style.cssText=a.radioLabel),A.style.cssText+=a.radioActive,M.value=I,q&&q(I)},G.appendChild(A)}),i[z]={input:M,wrapper:O,required:!1},O.appendChild(G),o.appendChild(O),O}let c=document.createElement("div");c.style.cssText=a.banner,c.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(c);let p=document.createElement("div");p.style.marginBottom="24px";let l=document.createElement("button");l.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",l.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",l.onmouseover=()=>l.style.background="#E1EFFF",l.onmouseout=()=>l.style.background="#F0F7FF",p.appendChild(l),o.appendChild(p);let b=document.createElement("div");b.style.cssText=a.section,b.innerHTML=`<div style="${a.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(b),s({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:b}),s({id:"ga4",label:"GA4 Property ID",parent:b}),s({id:"gtm",label:"GTM Container ID",parent:b});let h=document.createElement("div");h.style.cssText=a.hiddenField,b.appendChild(h),r({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:z=>{z==="Yes"?h.style.cssText=a.visibleField+"margin-bottom:14px;":(h.style.cssText=a.hiddenField,i.accessEmail.input.value="")}}),s({id:"accessEmail",label:"User Access Email",parent:h}),r({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let g=document.createElement("div");g.style.cssText=a.section,g.innerHTML=`<div style="${a.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(g),s({id:"name",label:"Advertiser Name",required:!0,parent:g}),s({id:"url",label:"Website URL",parent:g}),s({id:"phone",label:"Phone Number",parent:g}),s({id:"email",label:"Contact Email",parent:g}),s({id:"callback",label:"Preferred Callback Time (Timezone)",parent:g}),s({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:g}),s({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:g}),s({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:g});let m=document.createElement("div");m.style.cssText=a.section,m.innerHTML=`<div style="${a.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(m),s({id:"cc_adv",label:"Advertiser Contact",parent:m}),s({id:"cc_am",label:"Account Manager",parent:m});let d=document.createElement("div");d.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let S=document.createElement("button");S.innerHTML="Voltar",S.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",S.onclick=t;let w=document.createElement("button");w.textContent="Gerar Nota",w.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",d.appendChild(S),d.appendChild(w),e.appendChild(d),l.onclick=async()=>{let z=l.innerHTML;l.innerHTML="\u23F3 Buscando dados...";try{let j=await ve(),X=0,U=(L,G)=>{let M=i[L];G&&M&&M.input.value===""&&(M.input.value=G,M.input.style.backgroundColor="#E6F4EA",M.input.style.borderColor="#34A853",setTimeout(()=>{M.input.style.backgroundColor="#FFF",M.input.style.borderColor="#DADCE0"},1e3),X++)};U("name",j.advertiserName),U("url",j.websiteUrl),j.clientEmail&&(U("email",j.clientEmail),U("cc_adv",j.clientEmail));let O=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);O&&U("cid",O[0]),X>0?Y(`${X} campos preenchidos!`):Y("Nenhum dado novo encontrado.")}catch(j){console.error(j),Y("Erro ao ler p\xE1gina.")}finally{l.innerHTML=z}};let R=()=>{let z=!0,j=null;return Object.values(i).forEach(X=>{X.required&&!X.input.value.trim()&&(z=!1,X.input.style.cssText+=a.inputError,X.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),j||(j=X.input))}),j&&j.scrollIntoView({behavior:"smooth",block:"center"}),z};return w.onclick=async()=>{if(!R()){Y("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let z=L=>i[L].input.value||"N/A",j=z("hasAccess"),X=j==="Yes"?z("accessEmail"):"N/A",q=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${z("cid")}
<b>GA4 ID:</b> ${z("ga4")}
<b>GTM ID:</b> ${z("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${j==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${X}
<b>Ghosting Access Available (Y/N):</b> ${z("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${z("name")}
<b>Website:</b> ${z("url")}
<b>Phone Number:</b> ${z("phone")}
<b>Preferred Callback:</b> ${z("callback")}
<b>Email Address:</b> ${z("email")}

<b>Detailed Issue Description:</b>
${z("desc")}

<b>Uncropped screenshots:</b>
${z("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${z("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${z("cc_adv")}
<b>Account Manager:</b> ${z("cc_am")}
`.replace(/\n/g,"<br>");$e(q);let O=await nt();O?(O.innerText.trim()===""&&(O.innerHTML=""),document.execCommand("insertHTML",!1,q),ot(O),Y("Nota gerada e inserida!")):Y("Copiado! Abra uma nota para colar.")},e}var de=t=>new Promise(e=>setTimeout(e,t));function fe(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function ye(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function at(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,n=document.getElementById(o);n&&n.remove();let a=t.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
        position: fixed;
        top: ${a.bottom+8}px;
        left: ${a.left}px;
        min-width: 300px;
        max-width: 400px;
        background: #ffffff;
        border-left: 4px solid #F9AB00;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        padding: 12px 16px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
        z-index: 999999;
        font-family: 'Google Sans', Roboto, sans-serif;
        font-size: 13px;
        color: #202124;
        opacity: 0;
        transform: translateY(-5px);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        pointer-events: auto;
    `,i.innerHTML=`
        <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:#F9AB00; font-size:16px; margin-top:1px;">\u26A0\uFE0F</span>
            <span style="line-height:1.4;">${e}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let s=i.querySelector(".cw-close-btn");s.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&s.click()},25e3)}async function it(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await de(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await de(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function xt(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let n=o.offsetParent!==null,a=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return n&&!a&&i});return e&&fe("Editor visualmente detectado.","success"),e}async function Zt(){fe("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(b=>b.innerText.trim()==="email");if(o&&o.offsetParent!==null){fe("Bot\xE3o de email direto encontrado.");let b=o.closest("material-button")||o.closest("material-fab")||o;ye(b),t=!0}else{fe("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let b=document.querySelector("material-fab-speed-dial");if(b){let h=b.querySelector(".trigger");if(h){ye(h),await de(800);let m=Array.from(document.querySelectorAll("i.material-icons-extended")).find(d=>d.innerText.trim()==="email");m&&(ye(m),t=!0)}}}if(!t)return Y("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;fe("\u{1F680} FASE 2: Verificando rascunhos...");let n=null,a=0,i=20;for(;a<i;){await de(250);let b=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(n=Array.from(b).find(h=>h.offsetParent!==null),n){fe("\u26A0\uFE0F Rascunho detectado!","warn");break}a++}if(n){fe("\u{1F5D1}\uFE0F Descartando..."),ye(n),n.click();let b=null,h=0;for(;h<15;){await de(300);let g=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(b=Array.from(g).find(m=>m.offsetParent!==null),b)break;h++}b&&(ye(b),Y("Limpando rascunho antigo...",{duration:2e3}),await de(2500))}fe("\u{1F680} FASE 3: Buscando editor final...");let s=0,r=null;for(;s<20&&(r=xt(),!r);)await de(250),s++;if(!r)return Y("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let c=r.closest('[id="email-body-content-top"]'),l=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(c){if(l){let h=l.closest('[aria-hidden="true"]');h&&h.removeAttribute("aria-hidden"),l.focus(),ye(l)}await de(300),c.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let b=c.querySelector("#cases-body-field");if(b){let h=document.createRange();h.selectNodeContents(b),h.collapse(!0);let g=window.getSelection();g.removeAllRanges(),g.addRange(h)}return!0}return!1}async function st(t){if(!t||!await Zt())return;let o=await ve();fe("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await de(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await it(i,o.clientEmail),at(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await it(i,o.internalEmail),at(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await de(500);let a=document.querySelector('material-button[debug-id="canned_response_button"]');if(a){ye(a),await de(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){ye(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),fe("\u23F3 Buscando resultado da Canned Response...","info");let s=null,r=0,c=15e3,p=500;for(;r<c&&(s=document.querySelector("material-select-dropdown-item"),!s);)await de(p),r+=p;if(s){ye(s),await de(1500);let l=xt();if(l){let h=Array.from(l.querySelectorAll("span.field")).filter(m=>m.innerText.includes("{Requested Task Type}"));if(h.length>0){let m=h.map(S=>S.closest("tr")).filter(S=>S!==null),d=[...new Set(m)];if(d.length>0){let w=d[0].querySelector('td[width="100%"]');w&&(w.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let R=1;R<d.length;R++)d[R].remove()}}let g=l.innerHTML;o.advertiserName&&g.includes("{%ADVERTISER_NAME%}")&&(g=g.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),g.includes("{%^79285%}")&&(g=g.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),l.innerHTML=g}Y("Canned Response aplicada!")}else fe(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),Y(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else Y("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function Qt(t){if(fe(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await Zt())return;let o=await ve(),n=dt();await de(600);let a=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(a&&(a.click(),await de(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await it(r,o.clientEmail),at(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await it(r,o.internalEmail),at(r,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await de(300));let s=xt();if(s){let c=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');c&&(c.focus(),ye(c));let p=new Date;p.setDate(p.getDate()+3);let l=p.getDay();l===6?p.setDate(p.getDate()+2):l===0&&p.setDate(p.getDate()+1);let b=p.toLocaleDateString("pt-BR"),h=t.body;h=h.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),h=h.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),h=h.replace(/\[URL\]/g,o.websiteUrl||"seu site"),h=h.replace(/\[Seu Nome\]/g,n),h=h.replace(/\[MM\/DD\/YYYY\]/g,b),document.execCommand("insertHTML",!1,h),c&&(c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))),Y("Email preenchido com sucesso!",{duration:2e3}),fe("\u2705 Processo finalizado com sucesso.","success")}else Y("Erro ao focar no editor.",{error:!0})}var No="https://script.google.com/a/macros/google.com/s/AKfycbwUfiKDvybLzt18mWoQJvkXqsRGQYqZ4JXzF8bLHMsxtYzlFPehz-ehoWs6215Wj6uFLA/exec",yt="cw_data_broadcast",eo="cw_data_tips",Ro=["Processando...","Mantenha o foco!","Aguarde..."];function He(t,e={}){return new Promise((o,n)=>{let a="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[a]=c=>{document.body.contains(i)&&document.body.removeChild(i),delete window[a],o(c)};let s=Object.keys(e).map(c=>encodeURIComponent(c)+"="+encodeURIComponent(e[c])).join("&"),r=`${No}?op=${t}&callback=${a}&t=${Date.now()}&${s}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[a],n(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var re={fetchTips:async()=>{try{let t=await He("tips");t?.tips&&localStorage.setItem(eo,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await He("broadcast");if(t?.broadcast)return localStorage.setItem(yt,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(yt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(yt)||"[]"),getRandomTip:()=>{let t=Ro,e=localStorage.getItem(eo);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await re._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await re._performOp("update_broadcast",o)},deleteBroadcast:async t=>await re._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`\u{1F4E4} Executando ${t}...`,e);let o=await He(t,e);return o&&o.status==="success"?(console.log("\u2705 Sucesso:",t),!0):(console.warn("\u26A0\uFE0F Falha:",o),!1)}catch(o){return console.error("\u274C Erro JSONP:",o),!1}},logEvent:(t,e,o="",n=null)=>{try{let a="anon";try{let s=Ee();s&&(a=s.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:a,version:"v5.1",category:t,action:e,label:o,value:n||""};He("log",i).catch(s=>{})}catch(a){console.warn("Analytics error",a)}},logUsage:()=>{},getUserSnippets:async t=>{try{return await He("get_user_snippets",{user:t})}catch(e){return console.warn("Erro ao buscar snippets:",e),null}},saveSnippet:async(t,e)=>{let o={...t,user:e};return await re._performOp("save_snippet",o)},deleteSnippet:async(t,e)=>await re._performOp("delete_snippet",{id:t,user:e})};var te={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},rt=t=>new Promise(e=>setTimeout(e,t));function to(t){let e="cw-command-center-style";if(!document.getElementById(e)){let d=document.createElement("style");d.id=e,d.innerHTML=`
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            .cw-focus-backdrop {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
                z-index: 2147483646; opacity: 0; pointer-events: none;
                transition: opacity 0.4s ease;
            }
            .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

            /* --- PILL PRINCIPAL --- */
            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 16px 8px;
                
                background: ${te.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${te.glassBorder}; border-radius: 50px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 2147483647;
                
                opacity: 0; 
                width: 56px;
                max-height: 480px;
                
                overflow: visible;

                /* ABRIR: A p\xEDlula expande PRIMEIRO */
                transition: 
                    width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    max-height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                    padding 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    opacity 0.3s ease,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            /* --- ESTADO COLAPSADO (FECHANDO) --- */
            .cw-pill.collapsed {
                width: 50px !important; 
                max-height: 50px !important;
                padding: 0 !important;
                gap: 0 !important;
                border-radius: 50% !important;
                cursor: pointer;
                
                overflow: hidden !important; 

                /* FECHAR: A p\xEDlula colapsa DEPOIS dos \xEDcones (delay 0.3s) */
                transition: 
                    width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s,
                    max-height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s,
                    padding 0.5s ease 0.3s,
                    border-radius 0.5s ease 0.3s,
                    opacity 0.3s ease 0s,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s !important;
            }
            
            /* --- LOGO DA BOLINHA --- */
            .cw-main-logo {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                pointer-events: none; 
                opacity: 0;
                transform: rotate(-180deg) scale(0.5);
                color: #fff;
                transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
            }
            .cw-main-logo svg { fill: #fff; width: 24px; height: 24px; transition: fill 0.3s; }
            
            .cw-pill:not(.collapsed) .cw-main-logo {
                transform: rotate(360deg) scale(0);
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .cw-pill.collapsed .cw-main-logo { 
                opacity: 1; 
                transform: rotate(0) scale(1);
                /* Aparece depois que a p\xEDlula colapsou */
                transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s;
            }
            .cw-pill.collapsed:hover .cw-main-logo {
                background-image: linear-gradient(135deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%);
                -webkit-mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E") center/24px no-repeat;
                mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E") center/24px no-repeat;
                transform: scale(1.15) rotate(0deg);
                transition-delay: 0s;
            }
            .cw-pill.collapsed:hover .cw-main-logo svg { fill: transparent; }

            /* --- CONTE\xDADO INTERNO --- */
            .cw-pill > *:not(.cw-main-logo) {
                opacity: 1; transform: scale(1) translateY(0); visibility: visible;
                /* Aparece depois que a p\xEDlula expandiu */
                transition:
                    opacity 0.3s ease 0.4s,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s,
                    visibility 0s linear 0.4s,
                    filter 0.3s ease 0.4s;
            }
            .cw-pill.collapsed > *:not(.cw-main-logo) {
                opacity: 0; pointer-events: none; visibility: hidden;
                transform: scale(0.5); filter: blur(8px);
                /* Desaparece imediatamente */
                transition:
                    opacity 0.2s ease 0s,
                    transform 0.2s ease 0s,
                    filter 0.2s ease 0s,
                    visibility 0s linear 0.2s;
            }

            /* --- CASCATAS DE ENTRADA --- */
            .cw-pill:not(.collapsed) > *:nth-child(2) { transition-delay: 0.40s; } /* Grip */
            .cw-pill:not(.collapsed) > *:nth-child(3) { transition-delay: 0.43s; } /* Notes */
            .cw-pill:not(.collapsed) > *:nth-child(4) { transition-delay: 0.46s; } /* Email */
            .cw-pill:not(.collapsed) > *:nth-child(5) { transition-delay: 0.49s; } /* Script */
            .cw-pill:not(.collapsed) > *:nth-child(6) { transition-delay: 0.52s; } /* Links */
            .cw-pill:not(.collapsed) > *:nth-child(7) { transition-delay: 0.55s; } /* Library */
            .cw-pill:not(.collapsed) > *:nth-child(8) { transition-delay: 0.58s; } /* Timezone */
            .cw-pill:not(.collapsed) > *:nth-child(9) { transition-delay: 0.61s; } /* Configs */
            .cw-pill:not(.collapsed) > *:nth-child(10) { transition-delay: 0.64s; } /* Sep */
            .cw-pill:not(.collapsed) > *:nth-child(11) { transition-delay: 0.67s; } /* Broadcast */

            /* --- ESTILOS DOS BOT\xD5ES --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${te.iconIdle};
                flex-shrink: 0;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn:hover {
                background: ${te.glassHighlight};
                color: ${te.iconActive};
                transform: scale(1.18) translateY(-2px) !important;
            }

            .cw-btn.notes.active { color: ${te.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${te.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${te.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${te.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${te.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${te.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${te.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${te.gray} !important; background: rgba(154, 160, 166, 0.15); }

            .cw-btn.notes:hover { color: ${te.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${te.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${te.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${te.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${te.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${te.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${te.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${te.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

            .cw-btn::before {
                content: ''; position: absolute; bottom: 2px; left: 50%; width: 4px; height: 4px; border-radius: 50%;
                background-color: currentColor; box-shadow: 0 0 6px currentColor;
                transform: translateX(-50%) scale(0); opacity: 0; visibility: hidden;
                transition: transform 0.3s, opacity 0.2s; pointer-events: none;
            }
            .cw-btn.active::before { transform: translateX(-50%) scale(1); opacity: 1; visibility: visible; }
            
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

            .cw-btn::after { 
                content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); 
                padding: 6px 12px; border-radius: 6px; background: #202124; color: #fff; 
                font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; 
                opacity: 0; visibility: hidden; pointer-events: none; 
                transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.3); white-space: nowrap; 
                border: 1px solid rgba(255,255,255,0.15); z-index: 2147483648; 
            }
            .cw-btn:hover::after { opacity: 1; visibility: visible; transform: translateY(-50%) scale(1); }
            .cw-pill.side-right .cw-btn::after { right: 55px; transform-origin: right center; }
            .cw-pill.side-left .cw-btn::after { left: 55px; transform-origin: left center; }

            .cw-badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #d93025; border-radius: 50%; border: 1px solid #fff; pointer-events: none; box-shadow: 0 1px 2px rgba(0,0,0,0.2); z-index: 10; animation: popIn 0.3s; }
            @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

            .cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.2); margin: 4px 0; }
            .cw-sep.visible { opacity: 1; }
            .cw-pill.collapsed .cw-sep { opacity: 0; transition: opacity 0.1s ease 0s; }

            .cw-grip { width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; cursor: grab; margin-bottom: 2px; }
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${te.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${te.blue}; width: 16px; opacity: 1; }

            .cw-pill.dragging {
                box-shadow:
                    0 8px 32px rgba(0,0,0,0.3),
                    0 0 20px rgba(138, 180, 248, 0.4);
                filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
                transform: scale(1.02) !important;
                transition: box-shadow 0.2s ease, filter 0.2s ease, transform 0.2s ease !important;
            }

            /* ============================================================
               PROCESSING CENTER
               ============================================================ */
            .cw-pill.processing-center {
                top: 50% !important; left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 340px !important; 
                height: auto !important; 
                min-height: 160px !important; 
                border-radius: 24px !important; 
                background: #202124 !important; 
                padding: 32px 24px !important; 
                box-shadow: 0 24px 64px rgba(0,0,0,0.6) !important; 
                display: flex !important; flex-direction: column !important; 
                justify-content: center !important; align-items: center !important;
                gap: 0 !important;
                z-index: 2147483647 !important;
            }
            .cw-pill.processing-center.collapsed { background: #202124 !important; overflow: visible !important; }
            .cw-pill.processing-center .cw-main-logo { display: none !important; }
            .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
            
            .cw-center-stage { 
                display: flex; flex-direction: column; align-items: center; 
                gap: 20px;
                width: 100%; opacity: 0; 
                animation: fadeIn 0.4s ease forwards 0.1s; 
                position: relative; 
            }
            
            .cw-center-dots { display: flex; gap: 8px; margin-bottom: 4px; }
            .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
            .cw-center-dots span:nth-child(1) { background-color: ${te.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${te.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${te.green}; }
            
            .cw-center-text { 
                font-family: 'Google Sans', Roboto, sans-serif;
                font-size: 15px;
                color: #E8EAED;
                text-align: center; 
                max-width: 100%; 
                font-weight: 500; 
                line-height: 1.5; 
                letter-spacing: 0.2px;
                opacity: 0; 
                transform: translateY(10px); 
                animation: textSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
                animation-delay: 0.2s; 
            }

            .cw-dot-dirty {
                position: absolute; top: 8px; right: 8px;
                width: 6px; height: 6px;
                background-color: #F9AB00;
                border-radius: 50%;
                border: 1px solid #3c4043;
                pointer-events: none;
                z-index: 11;
                animation: popIn 0.3s;
            }
            
            .cw-center-success { display: none; color: ${te.green}; margin-bottom: 10px; }
            .cw-center-success svg { width: 48px; height: 48px; }
            .cw-center-success.show { display: block; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            
            .cw-abort-btn { 
                position: relative; 
                bottom: auto; margin-top: 8px; 
                font-size: 12px; color: #9AA0A6; 
                cursor: pointer; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700; 
                padding: 8px 16px; border-radius: 20px; 
                background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                transition: all 0.2s ease; user-select: none; 
                display: flex; align-items: center; gap: 6px;
            }
            .cw-abort-btn:hover { 
                color: #F28B82; background: rgba(242, 139, 130, 0.1); border-color: rgba(242, 139, 130, 0.3);
                transform: translateY(-1px);
            }
            .cw-abort-btn:active { transform: scale(0.95); }

            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes googleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
            @keyframes textSlideUp { to { opacity: 1; transform: translateY(0); } }
        `,document.head.appendChild(d)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>'},n=document.createElement("div");n.className="cw-pill side-right collapsed",n.innerHTML=`
        <div class="cw-main-logo">${o.main}</div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${o.notes}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Quick Email">${o.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${o.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${o.links}</button>
        <button class="cw-btn library" id="cw-btn-library" data-label="My Library">${o.library}</button>
        <button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${o.timezone}</button>
        <button class="cw-btn configs" id="cw-btn-configs" data-label="Configura\xE7\xF5es">${o.configs}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${o.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${o.check}</div>
        </div>
    `;let a=document.createElement("div");a.className="cw-focus-backdrop",document.body.appendChild(a),document.body.appendChild(n);let i=(d,S)=>{$.playClick(),n.querySelector(`.${d}`).classList.toggle("active"),S()};if(n.querySelector(".notes").onclick=d=>{d.stopPropagation(),i("notes",t.toggleNotes)},n.querySelector(".email").onclick=d=>{d.stopPropagation(),i("email",t.toggleEmail)},n.querySelector(".script").onclick=d=>{d.stopPropagation(),i("script",t.toggleScript)},n.querySelector(".links").onclick=d=>{d.stopPropagation(),i("links",t.toggleLinks)},n.querySelector(".library").onclick=d=>{d.stopPropagation(),i("library",t.toggleLibrary)},n.querySelector(".timezone").onclick=d=>{d.stopPropagation(),i("timezone",t.toggleTimezone)},n.querySelector(".configs").onclick=d=>{d.stopPropagation(),i("configs",t.toggleConfigs)},n.querySelector(".broadcast").onclick=d=>{d.stopPropagation(),i("broadcast",()=>{let S=d.currentTarget.querySelector(".cw-badge");S&&S.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},n.querySelectorAll(".cw-btn").forEach(d=>{d.addEventListener("mouseenter",()=>$.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let d=document.createElement("div");d.className="cw-badge",n.querySelector(".broadcast").appendChild(d)}let s=null;n.onmouseleave=()=>{n.querySelector(".cw-btn.active")||n.classList.contains("processing-center")||(s=setTimeout(()=>{n.classList.add("collapsed")},3e3))},n.onmouseenter=()=>{s&&clearTimeout(s)},(async function(){await rt(2800),n.classList.add("docked"),await rt(300);let S=n.querySelectorAll(".cw-btn");n.querySelectorAll(".cw-sep").forEach(w=>w.classList.add("visible"));for(let w=0;w<S.length;w++)S[w].classList.add("popped"),await rt(90);await rt(200),n.classList.add("system-check")})();let r=!1,c,p,l,b,h=3;n.onmousedown=d=>{if(d.target.closest("button"))return;d.preventDefault(),c=d.clientX,p=d.clientY;let S=n.getBoundingClientRect();l=S.left,b=S.top,document.addEventListener("mousemove",g),document.addEventListener("mouseup",m)};function g(d){let S=d.clientX-c,w=d.clientY-p;!r&&Math.sqrt(S*S+w*w)>h&&(r=!0,n.classList.add("dragging"),n.style.transition="none",s&&clearTimeout(s)),r&&(n.style.left=`${l+S}px`,n.style.top=`${b+w}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function m(d){if(document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",m),r){r=!1,n.classList.remove("dragging");let S=window.innerWidth,w=window.innerHeight,R=n.getBoundingClientRect(),z=R.left+R.width/2,j;z<S/2?(j=24,n.classList.remove("side-right"),n.classList.add("side-left")):(j=S-R.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let X=Math.max(24,Math.min(R.top,w-R.height-24));setTimeout(()=>{n.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),n.style.left=`${j}px`,n.style.top=`${X}px`,n.style.bottom="auto",n.style.transform=""},10),setTimeout(()=>{n.style.transition="",n.style.removeProperty("transition")},700)}else{let S=n.querySelector(".cw-btn.active"),w=d.target.closest("button");if(n.classList.contains("collapsed")){let R=n.getBoundingClientRect(),z=window.innerHeight,j=R.top>z/2;if(n.style.setProperty("transition","none","important"),j){let X=z-R.bottom;n.style.top="auto",n.style.bottom=`${X}px`}else n.style.bottom="auto",n.style.top=`${R.top}px`;n.offsetWidth,n.style.removeProperty("transition"),n.classList.remove("collapsed"),$.playGenieOpen()}else!S&&!w&&(n.classList.add("collapsed"),$.playGenieOpen());w&&(w.style.transform="scale(0.9)",setTimeout(()=>w.style.transform="",150))}}}function lt(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${re.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,Y("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(n),t.appendChild(o);let a=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let s=Date.now()-a,r=Math.max(0,2e3-s);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let c=o.querySelector(".cw-center-dots"),p=o.querySelector(".cw-center-text"),l=o.querySelector(".cw-center-success"),b=o.querySelector(".cw-abort-btn");c&&(c.style.display="none"),p&&(p.style.display="none"),b&&(b.style.display="none"),l&&l.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},r)}}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
        /* M\xD3DULO BASE */
        .cw-module-window {
            /* Anima\xE7\xE3o Apple Spring (Ida e Volta) */
            transition: 
                opacity 0.3s ease,
                transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), 
                filter 0.3s ease,
                box-shadow 0.3s ease;
            
            opacity: 0; 
            pointer-events: none;
            transform: scale(0.05); /* Come\xE7a dentro do bot\xE3o */
            
            /* Visual Ceramic Light */
            background: #F8F9FA;
            backdrop-filter: blur(12px);
            box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.18);
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-radius: 16px;
            overflow: hidden;
            
            /* Fonte Base */
            font-family: 'Google Sans', Roboto, sans-serif;
        }

        /* ESTADO ABERTO (Ativo) */
        .cw-module-window.open {
            opacity: 1; 
            transform: scale(1); 
            pointer-events: auto;
            filter: brightness(1);
            /* Sombra alta */
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }

        /* ESTADO IDLE (Segundo Plano) */
        .cw-module-window.idle {
            /* FIX DO DESLOCAMENTO: */
            /* Scale muito sutil (0.99) para n\xE3o "puxar" para o lado */
            transform: scale(0.99); 
            
            /* O efeito vem daqui: */
            opacity: 0.9;
            filter: brightness(0.96) saturate(0.5);
            border-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1); /* Sombra cai (encostou na mesa) */
            
            cursor: pointer; /* Indica clic\xE1vel */
        }
    `,document.head.appendChild(t)}function pe(t,e,o){let n=document.getElementById(o);if(!e)return;let a=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(n){let l=n.getBoundingClientRect();i.x=l.left+l.width/2,i.y=l.top+l.height/2}let s,r;if(!a)s=window.innerWidth/2,r=window.innerHeight/2;else{let l=e.getBoundingClientRect();s=l.left+l.width/2,r=l.top+l.height/2,s===0&&r===0&&(s=window.innerWidth/2,r=window.innerHeight/2)}let c=i.x-s,p=i.y-r;t?($.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",a?e.style.transform=`translate(${c}px, ${p}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${p}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),n&&n.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",a?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof oo=="function"&&oo(e,o)):($.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",a?e.style.transform=`translate(${c}px, ${p}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${p}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),n&&n.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof vt=="function"&&vt(e))}function oo(t,e){vt(t);let o=n=>{if(!t.classList.contains("open"))return;let a=t.contains(n.target),i=document.querySelector(".cw-pill"),s=i&&i.contains(n.target);a?(t.classList.remove("idle"),t.style.zIndex="2147483648"):s||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function vt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function no(){let t="v4.0.0",{popup:e,content:o,header:n,animRefs:a,credit:i}=Gt(t,X),s=Wt(x),r=Ut(()=>{M(),W.setActiveTasks(r.getCheckedElements())},x,W),c=document.createElement("div");c.style.display="none";let p=Vt((u,T)=>{I(u,T)});c.appendChild(p);let l=Yt({onSaveCurrent:async()=>{let u=await v();return E(),u},onLoadDraft:u=>{k(u)},t:u=>x(u)}),b=q(),h=O(),g=document.createElement("div"),m=N(),d=A(l,x);o.appendChild(b),o.appendChild(h),o.appendChild(m),o.appendChild(c),o.appendChild(g),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none";let S=document.createElement("button");S.id="manual-task-toggle",S.textContent=x("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",S.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${D.primary}; background: ${D.surface}; color: ${D.primary}; border-radius: ${ie.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${ne}; text-transform: uppercase; letter-spacing: 0.5px;`,S.onmouseenter=()=>{S.style.background=D.primaryBg},S.onmouseleave=()=>{S.style.background=D.surface},S.onclick=()=>{r.selectionElement.style.display="block",r.screenshotsElement.style.display="block",S.style.display="none"},o.appendChild(S),o.appendChild(r.selectionElement),o.appendChild(s.element),o.appendChild(r.screenshotsElement),o.appendChild(d);let w=document.createElement("div");w.style.display="none",w.style.flexGrow="1",w.style.minHeight="0",w.style.overflow="hidden";let R=Jt(()=>U());R.style.height="100%",w.appendChild(R),e.insertBefore(w,i);let z=n.lastElementChild;z&&(z.insertBefore(l.historyBtnWrapper,z.firstChild),z.insertBefore(B(),z.firstChild)),e.appendChild(l.drawer);let j=null;W.subscribe(u=>{_(u),u.isDirty&&(j&&clearTimeout(j),j=setTimeout(async()=>{let T=await v(!0);be.saveEmergency(T),u.isDirty=!1},2e3))});function X(){W.visible=!W.visible,pe(W.visible,e,"cw-btn-notes")}function U(){W.isSplitView=!W.isSplitView,W.isSplitView?(o.style.display="none",w.style.display="flex",w.style.flexDirection="column",a.googleLine&&(a.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",w.style.display="none",a.googleLine&&(a.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function q(){let u=document.createElement("div");if(u.innerHTML=`
            <div style="display: flex; gap: 16px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-idioma">${x("idioma")}</div>
                    <div class="cw-segmented-control" id="lang-selector">
                        <button data-lang="pt" class="active">PT</button>
                        <button data-lang="es">ES</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo">${x("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <button data-type="bau" class="active">BAU</button>
                        <button data-type="lm">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal">${x("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <button data-val="false" class="active">${x("nao")}</button>
                        <button data-val="true">${x("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let T=document.createElement("style");T.id="cw-segmented-styles",T.innerHTML=`
                .cw-segmented-control { display: flex; background: ${D.bgInput}; padding: 4px; border-radius: 100px; gap: 4px; border: 1px solid ${D.border}; }
                .cw-segmented-control button { flex: 1; border: none; background: transparent; padding: 8px 12px; font-size: 12px; font-weight: 700; border-radius: 100px; cursor: pointer; transition: all 0.3s ${ne}; color: ${D.textSub}; }
                .cw-segmented-control button.active { background: ${D.primary}; color: #fff; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.3); }
                .cw-segmented-control button:hover:not(.active) { background: #e8eaed; color: ${D.text}; }
            `,document.head.appendChild(T)}return u.querySelectorAll("#lang-selector button").forEach(T=>{T.onclick=()=>{W.setLanguage(T.dataset.lang),u.querySelectorAll("#lang-selector button").forEach(y=>y.classList.remove("active")),T.classList.add("active")}}),u.querySelectorAll("#type-selector button").forEach(T=>{T.onclick=()=>{W.setCaseType(T.dataset.type),u.querySelectorAll("#type-selector button").forEach(y=>y.classList.remove("active")),T.classList.add("active")}}),u.querySelectorAll("#portugal-selector button").forEach(T=>{T.onclick=()=>{W.setPortugalCase(T.dataset.val==="true"),u.querySelectorAll("#portugal-selector button").forEach(y=>y.classList.remove("active")),T.classList.add("active"),W.currentSubStatus&&Qe(W.currentSubStatus,g,W)}}),u}function O(){let u=document.createElement("div");u.className="cw-status-section",u.style.cssText="display: flex; flex-direction: column; gap: 8px;",u.innerHTML=`
            <div class="cw-section-title js-label-status" style="margin-top: 8px;">${x("status_principal")}</div>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${x("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <div class="cw-section-title js-label-substatus" style="margin-top: 8px;">${x("substatus")}</div>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${x("select_substatus")}</option>
            </select>
        `;let T=u.querySelector("#main-status-select"),y=u.querySelector("#sub-status-select");return T.onchange=()=>{W.setStatus(T.value),L(T.value,y),W.setSubStatus(""),G("")},y.onchange=()=>{W.setSubStatus(y.value),G(y.value)},u}function L(u,T){if(T.innerHTML=`<option value="">${x("select_substatus")}</option>`,!u){T.disabled=!0;return}for(let y in Ae)if(Ae[y].status===u){let P=document.createElement("option");P.value=y,P.textContent=Ae[y].name,T.appendChild(P)}T.disabled=!1}function G(u){if(p.render&&p.render(u,W.currentCaseType),!u){c.style.display="none",g.style.display="none",document.getElementById("manual-task-toggle").style.display="none",r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",m.style.display="flex",m.style.opacity="1",d.style.display="none";return}m.style.opacity="0",setTimeout(()=>{W.currentSubStatus&&(m.style.display="none")},400),d.style.display="grid",Qe(u,g,W),g.style.display="block",c.style.display="block";let T=Ae[u],y=u.startsWith("SO_"),P=u==="NI_Awaiting_Validation",V=document.getElementById("manual-task-toggle");y||P?(r.selectionElement.style.display="block",V.style.display="none"):(r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",V.style.display="block");let K=u==="SO_Education_Only"?"education":"implementation";W.setScreenshotMode(K),W.currentCaseType==="lm"?W.toggleFieldExclusion("field-ON_CALL",!0):W.toggleFieldExclusion("field-ON_CALL",!1),r.updateSubStatus(u),M();let H=document.getElementById("email-automation-toggle-row");H&&(H.style.display=qe[u]?"flex":"none")}function M(){let u=r.getCheckedElements().map(T=>T.value);s.updateVisibility(W.currentSubStatus,u)}function I(u,T){let y=Ze[u];if(y&&T){for(let P in y)if(P==="linkedTask")r.toggleTask(y.linkedTask,!0);else if(P==="activeTasks")y.activeTasks.forEach(V=>r.setTaskCount(V.value,V.count));else if(P.startsWith("field-")){let V=P,K=y[P];W.updateField(V,K);let H=document.getElementById(V);if(H){if(Re.includes(V.replace("field-",""))){let J=H.value.trim();J&&!J.includes(K.trim())?H.value=J+(J.endsWith(`
`)?"":`
`)+K:H.value=K}else H.value=K;H.dispatchEvent(new Event("input"))}}}}function A(u,T){let y=document.createElement("div");y.className="cw-actions-section",y.style.cssText=`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 16px;
            margin-top: 24px;
            background: ${D.bgInput};
            border-radius: 16px;
            border: 1px solid ${D.border};
        `;let P=document.createElement("div");P.id="email-automation-toggle-row",P.style.cssText="grid-column: span 2; display: none; align-items: center; justify-content: center; padding-bottom: 8px; border-bottom: 1px solid #eee; margin-bottom: 8px;",P.innerHTML=`
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 12px; font-weight: 600; color: ${D.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 14px; height: 14px; accent-color: ${D.primary};">
                <span class="js-label-email-toggle">${T("preencher_email_automaticamente")}</span>
            </label>
        `;let V=u.parkButton;V.style.cssText=`width: 100%; margin: 0; border-radius: ${ie.medium}; height: 40px; font-weight: 600; font-size: 13px;`;let K=document.createElement("button");K.className="cw-btn-secondary js-btn-reset",K.textContent=T("limpar"),K.style.cssText=`width: 100%; height: 40px; background: ${D.surface}; color: ${D.textSub}; border: 1px solid ${D.border}; border-radius: ${ie.medium}; font-weight: 600; cursor: pointer; transition: all 0.2s ${ne}; font-size: 13px;`,K.onclick=()=>E();let H=document.createElement("button");H.className="cw-btn-secondary js-btn-copy",H.textContent=T("copiar"),H.style.cssText=`width: 100%; height: 40px; background: ${D.surface}; color: ${D.primary}; border: 1px solid ${D.primary}; border-radius: ${ie.medium}; font-weight: 600; cursor: pointer; transition: all 0.2s ${ne}; font-size: 13px;`,H.onclick=()=>F();let J=document.createElement("button");return J.className="cw-btn-primary js-btn-generate",J.textContent=T("preencher"),J.style.cssText=`width: 100%; height: 44px; background: ${D.primary}; color: #fff; border: none; border-radius: ${ie.medium}; font-weight: 600; cursor: pointer; transition: all 0.2s ${ne}; grid-column: span 2; font-size: 14px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 4px;`,J.onclick=()=>f(),y.appendChild(P),y.appendChild(V),y.appendChild(K),y.appendChild(H),y.appendChild(J),y}async function F(){if(!W.currentSubStatus){Y(x("select_substatus"),{error:!0});return}let u=ft(W,r,s);u?($e(u),Y(x("copiado_sucesso")),$.playClick()):Y(x("select_substatus"),{error:!0})}async function f(){if(!W.currentSubStatus){Y(x("select_substatus"),{error:!0});return}let u=ft(W,r,s);$e(u),X();let T=lt(),y=await nt();if(y){y.focus(),document.execCommand("insertHTML",!1,u),ot(y);let P=document.getElementById("email-automation-checkbox");(!P||P.checked)&&W.currentSubStatus&&qe[W.currentSubStatus]&&await st(qe[W.currentSubStatus]),Y(x("inserido_copiado")),$.playSuccess(),E()}T()}function E(){W.reset(),r.reset(),s.reset(),o.querySelectorAll("select").forEach(T=>T.value=""),o.querySelector("#sub-status-select").disabled=!0;let u=document.getElementById("email-automation-toggle-row");u&&(u.style.display="none"),g.innerHTML="",c.style.display="none",m.style.display="flex",m.style.opacity="1",d.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none"}async function v(u=!1){let T={};g.querySelectorAll("input, textarea, select").forEach(H=>{(H.id.startsWith("field-")||H.id==="consent-select")&&(T[H.id]=H.value)});let y="Cliente",P="---";if(!u)try{let H=await ve();y=H.advertiserName,P=H.cid}catch(H){console.warn("Erro ao coletar pageData:",H)}let V=r.getCheckedElements().map(H=>({key:H.value,count:H.count})),K=V.map(H=>{let J=xe[H.key];return J?J.name:H.key});return{currentCaseType:W.currentCaseType,currentLang:W.currentLang,isPortugalCase:W.isPortugalCase,consent:W.consent,tagSupportUsed:W.tagSupportUsed,forcedScreenshots:[...W.forcedScreenshots],excludedFields:[...W.excludedFields],status:W.currentStatus,subStatus:W.currentSubStatus,formData:T,activeTasks:V,summaryTags:K,clientName:y,cid:P,timestamp:new Date().toISOString()}}let C=u=>new Promise(T=>setTimeout(T,u));async function k(u){W.setLanguage(u.currentLang||"pt"),W.setCaseType(u.currentCaseType||"bau"),W.setPortugalCase(u.isPortugalCase||!1),W.setConsent(u.consent||!1),W.setExcludedFields(u.excludedFields||[]);let T=o.querySelector(`#lang-selector button[data-lang="${W.currentLang}"]`);T&&T.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach(V=>{V!==T&&V.classList.remove("active")});let y=o.querySelector(`#type-selector button[data-type="${W.currentCaseType}"]`);y&&y.classList.add("active"),o.querySelectorAll("#type-selector button").forEach(V=>{V!==y&&V.classList.remove("active")});let P=o.querySelector(`#portugal-selector button[data-val="${W.isPortugalCase}"]`);if(P&&P.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach(V=>{V!==P&&V.classList.remove("active")}),u.status){let V=o.querySelector("#main-status-select");V.value=u.status,W.setStatus(u.status);let K=o.querySelector("#sub-status-select");if(L(u.status,K),await C(50),u.subStatus){if(K.value=u.subStatus,W.setSubStatus(u.subStatus),G(u.subStatus),await C(100),u.tagSupportUsed!==void 0){W.setTagSupportUsed(u.tagSupportUsed);let H=s.element.querySelector('input[value="Sim"]'),J=s.element.querySelector('input[value="N\xE3o"]');u.tagSupportUsed&&H?H.checked=!0:J&&(J.checked=!0),s.element.querySelector("div:last-child").style.display=u.tagSupportUsed?"none":"block"}u.forcedScreenshots&&W.setForcedScreenshots(u.forcedScreenshots);for(let H in u.formData){let J=document.getElementById(H);J&&(J.value=u.formData[H],W.updateField(H,J.value))}u.activeTasks&&(u.activeTasks.forEach(H=>r.setTaskCount(H.key,H.count)),W.setActiveTasks(r.getCheckedElements()))}}W.isDirty=!1}function x(u){return ge[W.currentLang]?.[u]||ge.pt?.[u]||u}function B(){let u=document.createElement("div");return u.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',u.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",u.onclick=T=>{T.stopPropagation(),U()},u.title="Alternar para Split & Transfer",u}function N(){let u=document.createElement("div");return u.id="notes-empty-state",u.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${ne};
        `,u.innerHTML=`
            <div style="width: 140px; height: 140px; margin-bottom: 8px;">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="50" fill="#f8f9fa"/>
                    <rect x="35" y="25" width="50" height="70" rx="8" fill="white" stroke="#e8eaed" stroke-width="2"/>
                    <rect x="45" y="40" width="30" height="4" rx="2" fill="#4285F4" opacity="0.6"/>
                    <rect x="45" y="52" width="30" height="4" rx="2" fill="#EA4335" opacity="0.6"/>
                    <rect x="45" y="64" width="20" height="4" rx="2" fill="#FBBC05" opacity="0.6"/>
                    <circle cx="85" cy="85" r="18" fill="#34A853"/>
                    <path d="M85 77V93M77 85H93" stroke="white" stroke-width="4" stroke-linecap="round"/>
                </svg>
            </div>
            <div style="text-align: center;">
                <div style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${D.text}; margin-bottom: 4px;">
                    ${x("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${D.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${x("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,u}function _(u){let T=o.querySelector(".js-label-idioma");T&&(T.textContent=x("idioma"));let y=o.querySelector(".js-label-fluxo");y&&(y.textContent=x("fluxo"));let P=o.querySelector(".js-label-portugal");P&&(P.textContent=x("caso_portugal"));let V=o.querySelector(".js-label-status");V&&(V.textContent=x("status_principal"));let K=o.querySelector(".js-label-substatus");K&&(K.textContent=x("substatus"));let H=o.querySelector(".js-btn-copy");H&&(H.textContent=x("copiar"));let J=o.querySelector(".js-btn-generate");J&&(J.textContent=x("preencher"));let ee=o.querySelector(".js-btn-reset");ee&&(ee.textContent=x("limpar"));let ue=document.getElementById("manual-task-toggle");ue&&(ue.textContent=x("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let ae=o.querySelector(".js-btn-park span");ae&&(ae.textContent=x("guardar"));let Q=e.querySelector(".js-drawer-title");Q&&(Q.textContent=x("rascunhos_salvos"));let oe=o.querySelector(".js-label-email-toggle");oe&&(oe.textContent=x("preencher_email_automaticamente")),s&&s.setLanguage&&s.setLanguage(x),r&&r.setLanguage&&r.setLanguage(x)}return m.style.display="flex",d.style.display="none",W.setLanguage("pt"),W.setCaseType("bau"),setTimeout(async()=>{let u=be.getEmergency();u&&(await he("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?(k(u),Y("Sess\xE3o restaurada!")):be.clearEmergency())},1e3),document.body.appendChild(e),X}var _e={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
                    <p>Ol\xE1,</p>
                    <br>
                    <p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p>
                    <br>
                    <p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p>
                    <p><strong>Ads Conversion Tracking</strong></p>
                    <br>
                    <p>Em seu site: <strong>[INSERIR URL]</strong></p>
                    <p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p>
                    <br>
                    <p>Atenciosamente,</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>
                `},{id:"reschedule",name:"Proposta de Reagendamento",subject:"Reagendamento de Consultoria",body:`
                    <p>Ol\xE1, tudo bem?</p>
                    <br>
                    <p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p>
                    <ul>
                        <li><strong>[DATA 1] \xE0s [HORA]</strong></li>
                        <li><strong>[DATA 2] \xE0s [HORA]</strong></li>
                        <li><strong>[DATA 3] \xE0s [HORA]</strong></li>
                    </ul>
                    <br>
                    <p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p>
                    <p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p>
                    <br>
                    <p>Atenciosamente,</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>
                `},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",body:`
                    <p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p>
                    <br>
                    <p>Espero que este e-mail o encontre bem.</p>
                    <p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p>
                    <br>
                    <p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p>
                    <br>
                    <p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p>
                    <br>
                    <p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p>
                    <br>
                    <p>Atenciosamente,</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>
                `}]},PROCESS_2_6:{title:"Processo 2/6",emails:[{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",body:`
                    <p>Ol\xE1, <strong>[Nome do Cliente]</strong></p>
                    <br>
                    <p>Espero que voc\xEA esteja bem!</p>
                    <p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p>
                    <br>
                    <p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p>
                    <p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p>
                    <br>
                    <p>Fico \xE0 disposi\xE7\xE3o.</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>
                `},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",body:`
                    <p>Ol\xE1, <strong>[Nome do Cliente]</strong></p>
                    <br>
                    <p>Espero que voc\xEA esteja bem!</p>
                    <p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p>
                    <br>
                    <p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p>
                    <ul>
                        <li>Ajuda a rastrear convers\xF5es em tempo real</li>
                        <li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li>
                        <li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li>
                        <li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li>
                    </ul>
                    <br>
                    <p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p>
                    <p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p>
                    <br>
                    <p>Fico \xE0 disposi\xE7\xE3o.</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>
                `},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",body:`
                    <p>Ol\xE1, tudo bem?</p>
                    <br>
                    <p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p>
                    <br>
                    <p>Para isso, pe\xE7o, por favor, que me envie algumas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p>
                    <p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p>
                    <br>
                    <p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p>
                    <p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p>
                    <br>
                    <p>Atenciosamente,</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>
                `}]},NRP_CLOSING:{title:"NRP / Encerramento",emails:[{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",body:`
                    <p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p>
                    <br>
                    <p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p>
                    <p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p>
                    <p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p>
                    <br>
                    <p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p>
                    
                    <p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p>
                    <ul>
                        <li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li>
                        <li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li>
                        <li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li>
                    </ul>

                    <p><strong>Em rela\xE7\xE3o ao Shopping</strong></p>
                    <ul>
                        <li><a href="https://www.google.com/retail/">Google for Retail</a></li>
                        <li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li>
                        <li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li>
                        <li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li>
                        <li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li>
                    </ul>
                    <br>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>
                `},{id:"nrp_dfa",name:"NRP - DFA",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",body:`
                    <p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p>
                    <br>
                    <p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p>
                    <p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p>
                    <p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p>
                    <br>
                    <p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p>
                    
                    <p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p>
                    <ul>
                        <li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li>
                        <li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li>
                        <li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li>
                    </ul>

                    <p><strong>Em rela\xE7\xE3o ao Shopping</strong></p>
                    <ul>
                        <li><a href="https://www.google.com/retail/">Google for Retail</a></li>
                        <li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li>
                        <li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li>
                        <li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li>
                        <li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li>
                    </ul>
                    <br>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>
                `}]}};var ao="cw_personal_library_v1",me={getSnippets:(t="all")=>{let e=me._loadFromLocal(),o=Ee();return o&&o.includes("@")&&me._syncWithServer(o),t==="all"?e:e.filter(n=>n.type===t)},save:async t=>{let e=Ee();if(!e)return Y("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;let o=me._loadFromLocal(),n=new Date().toISOString(),a={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:n},i=o.filter(s=>s.id!==a.id);return i.unshift(a),me._saveToLocal(i),re.saveSnippet(a,e).then(s=>{s?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}),a},delete:async t=>{let e=Ee(),n=me._loadFromLocal().filter(a=>a.id!==t);return me._saveToLocal(n),e&&re.deleteSnippet(t,e),!0},_syncWithServer:async t=>{console.log("\u{1F504} Sincronizando biblioteca...");let e=await re.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,n=me._loadFromLocal(),a=JSON.stringify(o),i=JSON.stringify(n);a!==i&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),me._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(ao)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem(ao,JSON.stringify(t))}};function io(){let t="v4.2.0 CR-Hybrid",e="CANNED_RESPONSES",o=Object.keys(_e)[0],n="",a="list",i=!1,s={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:s.bgApp},c={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},p={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},l={padding:"20px 24px 12px 24px",flexShrink:"0",background:s.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${s.borderSubtle}`},b={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:s.textPrimary,boxSizing:"border-box",outline:"none",transition:s.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},h={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},g={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:s.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:s.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},m={background:s.primaryBg,color:s.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},d={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},S={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:s.bgSurface,border:"1px solid transparent",boxShadow:s.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},w=document.createElement("div");w.id="quick-email-popup",w.classList.add("cw-module-window"),Object.assign(w.style,le,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let R={popup:w,googleLine:null,focusElement:null};function z(){i=!i,pe(i,w,"cw-btn-email"),i||setTimeout(()=>E(),300)}let j=ce(w,"Quick Email",t,"Templates & Automa\xE7\xF5es",R,()=>z()),X=document.createElement("div");Object.assign(X.style,r);let U=document.createElement("div");Object.assign(U.style,c);let q=document.createElement("div");Object.assign(q.style,p);let O=document.createElement("div");Object.assign(O.style,l);let L=document.createElement("input");L.placeholder="Pesquisar templates...",Object.assign(L.style,b),L.onfocus=()=>{L.style.borderColor=s.primary,L.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",L.style.background="#fff"},L.onblur=()=>{L.style.borderColor="transparent",L.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",L.style.background="#fff"},R.focusElement=L;let G=document.createElement("div");Object.assign(G.style,h);let M=document.createElement("div");Object.assign(M.style,d),O.appendChild(L),O.appendChild(G),q.appendChild(O),q.appendChild(M);let I=document.createElement("div");Object.assign(I.style,p);let A=document.createElement("div");Object.assign(A.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),I.appendChild(A),U.appendChild(q),U.appendChild(I),X.appendChild(U),w.appendChild(j),w.appendChild(X),document.body.appendChild(w);async function F(x,B){try{i&&z();let N=lt();await new Promise(_=>setTimeout(_,800)),B==="email"?await Qt(x):B==="cr"&&await st(x),N()}catch(N){console.error("\u274C Erro:",N);let _=document.querySelector(".cw-focus-backdrop");_&&_.classList.remove("active")}}function f(x){a="detail",U.style.transform="translateX(-50%)";let B='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',N='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';A.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${B}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${x.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${x.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${x.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${N} Usar Template
                </button>
            </div>
        `;let _=A.querySelector("#csa-back-btn");_.onmouseenter=()=>_.style.background="#f1f3f4",_.onmouseleave=()=>_.style.background="none",_.onclick=E;let u=A.querySelector("#csa-insert-btn");u.onmouseenter=()=>{u.style.transform="translateY(-1px)",u.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},u.onmouseleave=()=>{u.style.transform="translateY(0)",u.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},u.onclick=()=>{u.style.transform="scale(0.96)",F(x,"email"),setTimeout(()=>{u.style.transform="scale(1)",E()},300)}}function E(){a="list",U.style.transform="translateX(0)"}function v(x,B,N=null){let _=document.createElement("button"),u=N?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${N}</span>`:"";return _.innerHTML=`${u}${x}`,Object.assign(_.style,g),o===B&&n===""?Object.assign(_.style,m):(_.onmouseenter=()=>{_.style.background="#F1F3F4",_.style.borderColor="#DADCE0"},_.onmouseleave=()=>{_.style.background="#FFFFFF",_.style.borderColor="#DADCE0"}),_.onclick=()=>{o=B,n="",L.value="",C(),k()},_}function C(){G.innerHTML="",G.appendChild(v("Smart CRs",e,"\u26A1")),G.appendChild(v("Pessoal","PERSONAL_LIBRARY","\u{1F464}")),Object.keys(_e).forEach(x=>{G.appendChild(v(_e[x].title,x))})}function k(){M.innerHTML="";let x=[];if(n.trim()!==""){let T=n.toLowerCase();Object.values(_e).forEach(y=>{y.emails.forEach(P=>{(P.name.toLowerCase().includes(T)||P.subject.toLowerCase().includes(T))&&x.push({type:"email",data:P})})}),me.getSnippets("email").forEach(y=>{(y.title.toLowerCase().includes(T)||y.subject&&y.subject.toLowerCase().includes(T))&&x.push({type:"email",data:{name:y.title,subject:y.subject||"Sem Assunto",body:y.content}})}),Object.entries(qe).forEach(([y,P])=>{if(!P)return;(y.replace(/_/g," ").toLowerCase().includes(T)||P.toLowerCase().includes(T))&&x.push({type:"cr",key:y,code:P})})}else o===e?Object.entries(qe).forEach(([T,y])=>{y&&x.push({type:"cr",key:T,code:y})}):o==="PERSONAL_LIBRARY"?me.getSnippets("email").forEach(T=>{x.push({type:"email",data:{name:T.title,subject:T.subject||"Sem Assunto",body:T.content}})}):_e[o]&&_e[o].emails.forEach(T=>{x.push({type:"email",data:T})});if(x.length===0){M.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let N='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',_='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',u='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';x.forEach(T=>{let y=document.createElement("div");if(Object.assign(y.style,S),T.type==="email"){let P=T.data,V=P.subject.length>45?P.subject.substring(0,45)+"...":P.subject;y.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${N}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${P.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${V}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${u}</div>
                `,y.onclick=()=>f(P)}else{let P=T.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");y.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${_}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${P}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${T.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,y.onclick=()=>{y.style.transform="scale(0.98)",y.style.background="#FEF7E0",setTimeout(()=>{y.style.transform="scale(1)",y.style.background="#fff",F(T.code,"cr")},150)}}y.onmouseenter=()=>{y.style.transform="translateY(-2px)",y.style.boxShadow=s.shadowHover,T.type==="cr"?y.style.borderLeft="3px solid #Fbbc04":y.style.borderLeft="3px solid #1a73e8"},y.onmouseleave=()=>{y.style.transform="translateY(0)",y.style.boxShadow=s.shadowCard,y.style.borderLeft="1px solid transparent"},M.appendChild(y)})}return L.addEventListener("input",x=>{n=x.target.value,n!==""?Array.from(G.children).forEach(B=>{Object.assign(B.style,g),B.style.opacity="0.6"}):C(),k()}),C(),k(),z}var so={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function ro(){let t="v2.6 (Context HD)",e="csa-local-styles";if(!document.getElementById(e)){let v=document.createElement("style");v.id=e,v.innerHTML=`
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
      `,document.head.appendChild(v)}let o={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#FFFFFF",scrollBehavior:"smooth"},card:{background:"#FFFFFF",border:"1px solid #E5E7EB",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"12px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"8px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.1s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.6",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"18px",height:"18px",borderRadius:"6px",border:"2px solid #DADCE0",marginRight:"12px",marginTop:"2px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},a="PT",i="BAU",s=!1,r=document.createElement("div");r.id="call-script-popup",r.classList.add("cw-module-window"),Object.assign(r.style,le,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let c={popup:r,googleLine:null},p=null;function l(){s&&ve().then(v=>{let C=r.querySelector("#cw-ctx-name"),k=r.querySelector("#cw-ctx-cid"),x=r.querySelector("#cw-ctx-email");if(C&&(C.textContent=v.advertiserName||"Cliente Desconhecido"),k){let B=v.cid||"---";k.textContent!==B&&(k.textContent=B)}if(x){let B=v.clientEmail||"N\xE3o encontrado";x.textContent!==B&&(x.textContent=B,x.title=B)}})}function b(){s=!s,pe(s,r,"cw-btn-script"),s?(l(),p||(p=setInterval(l,2e3))):p&&(clearInterval(p),p=null)}let h=ce(r,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",c,()=>{b()});r.appendChild(h);let g=document.createElement("div");Object.assign(g.style,o.contextBanner),g.innerHTML=`
      <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
              <div class="csa-live-dot" title="Monitoramento Ativo"></div>
              <span id="cw-ctx-name" style="font-family:'Google Sans'; font-size:16px; font-weight:500; color:#202124;">Carregando...</span>
          </div>
          <div style="font-size:10px; font-weight:700; color:#1A73E8; background:#E8F0FE; padding:2px 8px; border-radius:4px; text-transform:uppercase;">Live</div>
      </div>
      
      <div style="display:grid; grid-template-columns: 1fr 1.5fr; gap: 10px;">
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
  `;let m=(v,C)=>{let k=g.querySelector(v),x=g.querySelector(C);k.onclick=()=>{let B=x.textContent;!B||B.includes("---")||B.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(B),$.playSuccess(),k.classList.add("copied"),setTimeout(()=>k.classList.remove("copied"),1500))}};r.appendChild(g);let d=document.createElement("div");Object.assign(d.style,o.progressBarContainer);let S=document.createElement("div");Object.assign(S.style,o.progressBarFill),d.appendChild(S),r.appendChild(d);let w=document.createElement("div");w.id="csa-content",Object.assign(w.style,o.contentArea),r.appendChild(w);let R=document.createElement("div");Object.assign(R.style,o.footer);let z=document.createElement("span");z.textContent="by lucaste@",Object.assign(z.style,{fontSize:"10px",color:"#bdc1c6"});let j=document.createElement("button");j.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(j.style,o.resetBtn),j.onmouseenter=()=>j.style.background="#fce8e6",j.onmouseleave=()=>j.style.background="transparent",j.onclick=()=>{j.style.transform="scale(0.9)",setTimeout(()=>j.style.transform="scale(1)",150);for(let v in n)delete n[v];A()},R.appendChild(z),R.appendChild(j),r.appendChild(R);let X=document.createElement("div");Object.assign(X.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let U=document.createElement("div");Object.assign(U.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let q=document.createElement("div");q.textContent="BAU";let O=document.createElement("div");O.textContent="LT",Object.assign(q.style,Ge),Object.assign(O.style,Ge),U.appendChild(q),U.appendChild(O);let L=document.createElement("select");Object.assign(L.style,Ye,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),L.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',L.value=a,X.appendChild(U),X.appendChild(L),w.appendChild(X);let G=document.createElement("div");G.id="csa-checklist-area",w.appendChild(G);let M=document.createElement("div");Object.assign(M.style,Te),M.className="no-drag",M.title="Redimensionar",r.appendChild(M),ke(r,M),document.body.appendChild(r),m("#cw-pill-cid","#cw-ctx-cid"),m("#cw-pill-email","#cw-ctx-email");function I(v){return v}function A(){G.innerHTML="";let v=`${a} ${i}`,C=so[v];if(!C){G.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',S.style.width="0%";return}let k=C.color||"#1a73e8",x=0,B=0;["inicio","meio","fim"].forEach(N=>{C[N]&&(x+=C[N].length)}),["inicio","meio","fim"].forEach((N,_)=>{let u=C[N];if(!u||u.length===0)return;let T=document.createElement("div");Object.assign(T.style,o.card);let y=document.createElement("div");Object.assign(y.style,o.cardTitle);let P="";N==="inicio"?a.includes("ES")?P="Apertura":a.includes("EN")?P="Opening":P="Abertura":N==="meio"?a.includes("ES")?P="Implementaci\xF3n":a.includes("EN")?P="Implementation":P="Implementa\xE7\xE3o (Tag Support)":N==="fim"&&(a.includes("ES")?P="Cierre":a.includes("EN")?P="Closing":P="Fechamento"),y.textContent=P;let V=document.createElement("span");V.style.fontSize="11px",V.style.opacity="0.7",V.style.fontWeight="500",V.style.background="#f1f3f4",V.style.padding="2px 8px",V.style.borderRadius="10px",y.appendChild(V),T.appendChild(y);let K=0;u.forEach((H,J)=>{let ee=`${v}-${N}-${J}`,ue=!!n[ee];ue&&(B++,K++);let ae=document.createElement("div");Object.assign(ae.style,o.itemRow);let Q=document.createElement("div");Object.assign(Q.style,o.checkbox);let oe=document.createElement("span");oe.innerHTML=H,oe.style.flex="1",ue?(Object.assign(ae.style,o.itemCompleted),Q.style.background=k,Q.style.borderColor=k,Q.style.transform="scale(1)",Q.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ae.style.textDecoration="none",ae.style.opacity="1",Q.style.background="transparent",Q.style.borderColor="#dadce0",Q.style.transform="scale(1)",Q.innerHTML=""),ae.onclick=()=>{let se=!n[ee];n[ee]=se,$.playClick(),se?(Q.style.transform="scale(1.2)",setTimeout(()=>Q.style.transform="scale(1)",150),Object.assign(ae.style,o.itemCompleted),Q.style.background=k,Q.style.borderColor=k,Q.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ae.style.textDecoration="none",ae.style.opacity="1",Q.style.background="transparent",Q.style.borderColor="#dadce0",Q.innerHTML=""),F(v,C)},ae.onmouseenter=()=>{n[ee]||(ae.style.background="#f1f3f4",Q.style.borderColor=k)},ae.onmouseleave=()=>{n[ee]||(ae.style.background="transparent",Q.style.borderColor="#dadce0")},ae.appendChild(Q),ae.appendChild(oe),T.appendChild(ae)}),K===u.length&&u.length>0&&(V.style.color="#1e8e3e",V.style.background="#e6f4ea",T.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),V.textContent=`${K}/${u.length}`,G.appendChild(T)}),f(x,B)}function F(v,C){let k=0,x=0;["inicio","meio","fim"].forEach(B=>{let N=C[B]||[];k+=N.length,N.forEach((_,u)=>{n[`${v}-${B}-${u}`]&&x++})}),f(k,x),setTimeout(()=>A(),200)}function f(v,C){let k=v===0?0:C/v*100;S.style.width=`${k}%`,S.style.background=k===100?"#34A853":"linear-gradient(90deg, #4285F4, #34A853)"}function E(v){i=v;let C=Mt();Object.assign(q.style,Ge),Object.assign(O.style,Ge),Object.assign(v==="BAU"?q.style:O.style,C),A()}return q.onclick=()=>E("BAU"),O.onclick=()=>E("LT"),L.addEventListener("change",v=>{a=v.target.value,A()}),E(i),b}var Ve={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Me={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},ct={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},wt="cw_link_history_v4";function lo(t,e){try{let o=JSON.parse(localStorage.getItem(wt)||"[]");o=o.filter(n=>n.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(wt,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function zo(){try{return JSON.parse(localStorage.getItem(wt)||"[]")}catch{return[]}}function co(){let t="v4.6",e="",o=!1,n=null,a=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},s=document.createElement("div");s.id="links-popup",s.classList.add("cw-module-window"),Object.assign(s.style,le,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let c=ce(s,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:s,googleLine:null},()=>M());s.appendChild(c);let p=document.createElement("div");p.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",s.appendChild(p);let l=document.createElement("div");l.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,p.appendChild(l);let b=document.createElement("div");b.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",p.appendChild(b);let h=document.createElement("div");h.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let g=document.createElement("div");g.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let m=document.createElement("div");m.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',m.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let d=document.createElement("input");d.type="text",d.placeholder="Buscar ferramenta ou SOP...",d.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,d.onfocus=()=>{g.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",g.style.border="1px solid #1a73e8"},d.onblur=()=>{g.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",g.style.border="1px solid transparent"},g.appendChild(m),g.appendChild(d),h.appendChild(g),b.appendChild(h);let S=document.createElement("div");S.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",b.appendChild(S);let w=null;function R(){if(w)return;w=document.createElement("div"),w.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let I=document.createElement("div");I.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",I.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let A=document.createElement("button");A.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',A.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",A.onclick=()=>{j(),a=!1,O()},I.appendChild(A),w.appendChild(I);let F=document.createElement("div");F.id="cw-history-list",F.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",w.appendChild(F),b.appendChild(w)}function z(){w||R();let I=w.querySelector("#cw-history-list");I.innerHTML="";let A=zo();A.length===0?I.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':A.forEach(F=>{let f=G(F,Me[F._originalCat],!0,F._originalCat);I.appendChild(f)}),requestAnimationFrame(()=>w.style.transform="translateY(0)")}function j(){w&&(w.style.transform="translateY(100%)")}function X(){l.innerHTML="";let I=U("history","Recentes",Me.history);I.id="cw-sidebar-btn-history",I.onclick=()=>{$.playClick(),a=!a,a?z():j(),O()},l.appendChild(I);let A=document.createElement("div");A.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",l.appendChild(A),Object.keys(Ve).forEach(F=>{let f=Ve[F],E=U(F,f.label,Me[F]);E.id=`cw-sidebar-btn-${F}`,E.onclick=()=>{$.playClick(),a&&(a=!1,j()),q(F)},l.appendChild(E)})}function U(I,A,F){let f=document.createElement("div");f.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,f.title=A,f.dataset.key=I;let E=document.createElement("div");E.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",E.innerHTML=F||Me.tasks;let v=document.createElement("div");return v.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",v.textContent=A,f.appendChild(E),f.appendChild(v),f.onmouseenter=()=>{n!==I&&!(I==="history"&&a)&&(f.style.background="#F1F3F4",E.style.transform="scale(1.1)")},f.onmouseleave=()=>{n!==I&&!(I==="history"&&a)&&(f.style.background="transparent",E.style.transform="scale(1)")},f}function q(I){let A=document.getElementById(`cat-anchor-${I}`);A&&(A.scrollIntoView({behavior:"smooth",block:"start"}),n=I,O())}function O(){Object.keys(Ve).forEach(A=>{let F=l.querySelector(`#cw-sidebar-btn-${A}`);if(F)if(n===A&&!a){let f=ct[A];F.style.background=f.bg,F.style.color=f.color,F.querySelector("div:first-child").style.transform="scale(1.1)"}else F.style.background="transparent",F.style.color=i.textSecondary,F.querySelector("div:first-child").style.transform="scale(1)"});let I=l.querySelector("#cw-sidebar-btn-history");I&&(a?(I.style.background="#3C4043",I.style.color="#FFFFFF"):(I.style.background="transparent",I.style.color=i.textSecondary))}function L(){if(S.innerHTML="",e.trim()!==""){let A=[];if(Object.entries(Ve).forEach(([f,E])=>{let v=E.links.filter(C=>C.name.toLowerCase().includes(e.toLowerCase())||C.desc.toLowerCase().includes(e.toLowerCase()));A.push(...v.map(C=>({...C,_cat:f})))}),A.length===0){S.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let F=document.createElement("div");F.innerHTML="Resultados da busca",F.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",S.appendChild(F),A.forEach(f=>{let E=G(f,Me[f._cat],!1,f._cat);S.appendChild(E)});return}Object.entries(Ve).forEach(([A,F])=>{let f=ct[A],E=document.createElement("div"),v=document.createElement("div");v.id=`cat-anchor-${A}`,v.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${f.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,v.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${f.color};"></div>
            ${F.label}
          `,E.appendChild(v);let C=document.createElement("div");C.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",F.links.forEach(k=>{let x=G(k,Me[A],!1,A);C.appendChild(x)}),E.appendChild(C),S.appendChild(E)});let I=document.createElement("div");I.style.height="80px",S.appendChild(I)}function G(I,A,F,f){let E=document.createElement("div"),v=ct[f]||ct.history;E.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let C=document.createElement("div");C.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${v.bg}; color: ${v.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,C.innerHTML=A||Me.tasks;let k=C.querySelector("svg");k&&(k.style.width="22px",k.style.height="22px");let x=document.createElement("div");x.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let B=document.createElement("div");B.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,B.textContent=I.name;let N=document.createElement("div");N.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,N.textContent=I.desc,x.appendChild(B),x.appendChild(N);let _=document.createElement("div");return _.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',_.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,_.title="Copiar URL",E.onmouseenter=()=>{E.style.transform="translateY(-2px)",E.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",E.style.borderColor="rgba(0,0,0,0.05)",E.style.borderLeft=`4px solid ${v.color}`,_.style.opacity="1",_.style.background="#F1F3F4"},E.onmouseleave=()=>{E.style.transform="translateY(0)",E.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",E.style.border="1px solid transparent",_.style.opacity="0",_.style.background="transparent"},E.onclick=()=>{!F&&f&&lo(I,f),window.open(I.url,"_blank")},_.onclick=u=>{u.stopPropagation(),$.playClick(),navigator.clipboard.writeText(I.url),!F&&f&&lo(I,f),Y("Link copiado!")},E.appendChild(C),E.appendChild(x),E.appendChild(_),E}d.addEventListener("input",I=>{e=I.target.value,L()});function M(){o=!o,pe(o,s,"cw-btn-links")}return document.body.appendChild(s),X(),L(),M}var Oe=[];function St(t){Oe=t}var Bo=["lucaste","ricardogi"],Go=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function po(){let t="v4.9",e=!1,o=null,n=null;function a(f){if(!f)return"";try{let E=new Date(f);return isNaN(E.getTime())?String(f):E.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(f)}}if(!document.getElementById("cw-broadcast-hd-css")){let f=document.createElement("style");f.id="cw-broadcast-hd-css",f.innerHTML=`
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
      `,document.head.appendChild(f)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},s={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(f){return f?Object.entries(f).map(([E,v])=>`${E.replace(/[A-Z]/g,C=>"-"+C.toLowerCase())}:${v}`).join(";"):""}function c(f){if(!f||typeof f!="string")return"";let E=f;return E=E.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),E=E.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),E=E.replace(/_(.*?)_/g,"<i>$1</i>"),E=E.replace(/\n/g,"<br>"),E=Dt(E),E}let p=document.createElement("div");p.id="broadcast-popup",p.classList.add("cw-module-window"),Object.assign(p.style,le,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let l={popup:p,googleLine:null};function b(){if(e=!e,pe(e,p,"cw-btn-broadcast"),e){let f=document.getElementById("cw-btn-broadcast");f&&f.classList.remove("has-new"),q()}}let h=ce(p,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",l,()=>b()),g=h.querySelector(".cw-header-actions")||h.lastElementChild,m=null;function d(){let f=null;try{f=Ee()}catch{console.warn("TechSol: Auth Pending")}if(f){let E=f.split("@")[0].toLowerCase(),v=Bo.includes(E);if(window._cwIsAdmin=v,window._cwCurrentUser=E,v&&g&&!g.querySelector("#cw-admin-btn")){let C=document.createElement("div");C.id="cw-admin-btn",C.className="cw-btn-interactive",C.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(C.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),C.title="Novo Aviso",C.onclick=k=>{k.stopPropagation(),R()},g.insertBefore(C,g.firstChild),m||w(),L()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(d,2e3))}if(g){let f=document.createElement("button");f.textContent="Limpar",f.className="cw-btn-interactive",Object.assign(f.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),f.onclick=E=>{E.stopPropagation(),$.playSuccess();let v=Oe.map(C=>C.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(v)),L(),O()},g.insertBefore(f,g.firstChild)}p.appendChild(h);let S=document.createElement("div");S.id="cw-update-status",S.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",p.appendChild(S);function w(){m=document.createElement("div"),m.className="cw-editor-overlay",m.innerHTML=`
        <div style="flex:1; overflow-y:auto; padding: 24px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
                <span id="cw-editor-title-label" style="font-size: 20px; font-weight: 700; color: #202124;">Novo Aviso</span>
                <button id="cw-bc-close-x" class="cw-btn-interactive" style="background:none; border:none; color:#5f6368; padding:8px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
            
            <div style="margin-bottom:20px;">
                <label style="font-size:12px; font-weight:700; color:#5f6368; margin-bottom:8px; display:block;">TIPO DO COMUNICADO</label>
                <div class="cw-radio-group">
                    <div class="cw-radio-option info" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="info" checked> \u2139\uFE0F Info
                    </div>
                    <div class="cw-radio-option critical" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="critical"> \u{1F6A8} Alerta
                    </div>
                    <div class="cw-radio-option success" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="success"> \u2705 Sucesso
                    </div>
                </div>
            </div>

            <div style="margin-bottom:20px;">
                 <label style="font-size:12px; font-weight:700; color:#5f6368; margin-bottom:8px; display:block;">T\xCDTULO</label>
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
      `,m.querySelectorAll('input[name="cw-bc-type"]').forEach(C=>{C.addEventListener("change",()=>{m.querySelectorAll(".cw-radio-option").forEach(k=>k.classList.remove("checked")),C.parentElement.classList.add("checked")})}),setTimeout(()=>{let C=m.querySelector(".cw-radio-option.info");C&&C.classList.add("checked")},100);let f=m.querySelector("#cw-bc-cancel"),E=m.querySelector("#cw-bc-close-x"),v=m.querySelector("#cw-bc-send");f.onclick=z,E.onclick=z,v.onclick=j,p.appendChild(m)}function R(f=null){if(!m)return;let E=m.querySelector("#cw-editor-title-label"),v=m.querySelector("#cw-bc-title"),C=m.querySelector("#cw-bc-text"),k=m.querySelector("#cw-bc-send");if(f){n=f.id,E.textContent="Editar Aviso",v.value=f.title||"",C.value=f.text||"",k.textContent="Salvar Altera\xE7\xF5es";let x=f.type||"info",B=m.querySelector(`input[name="cw-bc-type"][value="${x}"]`);B&&B.click()}else{n=null,E.textContent="Novo Aviso",v.value="",C.value="",k.textContent="Publicar";let x=m.querySelector('input[name="cw-bc-type"][value="info"]');x&&x.click()}m.classList.add("active"),setTimeout(()=>v.focus(),300)}function z(){m&&m.classList.remove("active"),n=null}async function j(){let f=m.querySelector("#cw-bc-send"),E=m.querySelector("#cw-bc-title"),v=m.querySelector("#cw-bc-text"),C=m.querySelector('input[name="cw-bc-type"]:checked'),k=C?C.value:"info";if(!E.value.trim()||!v.value.trim()){Y("Preencha todos os campos!",{error:!0});return}f.textContent="Salvando...",f.style.opacity="0.7";let x=!1;n?x=await re.updateBroadcast(n,{title:E.value,text:v.value,type:k}):x=await re.sendBroadcast({title:E.value,text:v.value,type:k,author:window._cwCurrentUser||"admin"}),x?(Y(n?"Atualizado!":"Publicado!"),$.playSuccess(),z(),setTimeout(()=>q(),1500)):(Y("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),f.textContent=n?"Salvar Altera\xE7\xF5es":"Publicar",f.style.opacity="1")}async function X(f){if(await he("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await re.deleteBroadcast(f)){Y("Aviso removido."),$.playClick();let C=Oe.findIndex(k=>k.id===f);C>-1&&Oe.splice(C,1),L(),setTimeout(()=>q(),1500)}else Y("Erro ao excluir.",{error:!0})}let U=document.createElement("div");U.className="cw-nice-scroll",Object.assign(U.style,i.feedContainer),p.appendChild(U);async function q(){e&&(S.style.display="block",S.innerHTML="\u{1F504} Sincronizando...");try{let f=await re.fetchData();f&&f.broadcast&&(St(f.broadcast),O(),e&&(L(),S.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{S.style.display="none"},1500)))}catch{e&&(S.innerHTML="\u26A0\uFE0F Offline")}}function O(){let f=document.getElementById("cw-btn-broadcast");if(!f)return;let E=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Oe.some(C=>!E.includes(C.id))){if(f.classList.add("has-new"),!f.querySelector(".cw-badge")){let C=document.createElement("div");C.className="cw-badge",Object.assign(C.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),f.appendChild(C)}}else{f.classList.remove("has-new");let C=f.querySelector(".cw-badge");C&&C.remove()}}function L(){U.innerHTML="";let f=p.querySelector("#cw-bau-widget");f&&f.remove();let E=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),v=[...Oe].sort((N,_)=>{let u=new Date(N.date).getTime()||0;return(new Date(_.date).getTime()||0)-u}),C=v.findIndex(N=>N.title&&N.title.toLowerCase().includes("disponibilidade bau"));if(C!==-1){let N=v[C];v.splice(C,1);let _=document.createElement("div");_.id="cw-bau-widget",Object.assign(_.style,i.bauContainer);let u=[],T=(N.text||"").split(`
`),y=/\d{1,2}\/\d{1,2}/,P="\u{1F4C5}";if(T.forEach(ee=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(ee)?P="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(ee)&&(P="\u{1F1EA}\u{1F1F8}");let ue=ee.match(y);if(ue){let ae=ue[0],Q=P;/🇧🇷|🇵🇹|PT|BR/i.test(ee)?Q="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(ee)&&(Q="\u{1F1EA}\u{1F1F8}"),u.some(se=>se.flag===Q&&se.date===ae)||u.push({flag:Q,date:ae})}}),u.length===0){let ee=(N.text||"").match(/\d{1,2}\/\d{1,2}/g);ee&&[...new Set(ee)].forEach(ue=>u.push({flag:"\u{1F4C5}",date:ue}))}let V="",K='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(K=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${K}
              `),u.length>0?V=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${u.map(ue=>`
                  <div style="${r(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(i.bauFlag)}">${ue.flag}</span>
                      <span style="${r(i.bauDate)}">${ue.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${K}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${c(N.text)}</div>
              `:V=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${c(N.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,_.innerHTML=`
              <div style="${r(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(i.liveIndicator)}">
                      <div style="${r(i.pulseDot)}"></div>
                      <span style="${r(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${a(N.date)}</div>
              </div>
              ${V}
          `,S.after(_);let H=_.querySelector("#cw-bau-toggle-btn"),J=_.querySelector("#cw-bau-full");if(H&&J&&(H.onclick=()=>{let ee=J.style.display==="none";J.style.display=ee?"block":"none",H.textContent=ee?"Ocultar":"Detalhes"}),window._cwIsAdmin){let ee=_.querySelector(".cw-bau-edit");ee&&(ee.onclick=()=>R(N))}}let k=v.sort((N,_)=>{let u=E.includes(N.id),T=E.includes(_.id);return u===T?0:u?1:-1});if(k.length===0&&!C){let N=document.createElement("div");Object.assign(N.style,i.emptyState),N.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,U.appendChild(N)}let x=k.filter(N=>!E.includes(N.id)),B=k.filter(N=>E.includes(N.id));if(x.forEach(N=>U.appendChild(G(N,!1))),B.length>0){let N=document.createElement("div");Object.assign(N.style,i.historyDivider),N.innerHTML=`<span>Hist\xF3rico (${B.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let _=document.createElement("div");Object.assign(_.style,i.historyContainer),B.forEach(T=>_.appendChild(G(T,!0)));let u=!1;N.onclick=()=>{$.playClick(),u=!u,_.style.display=u?"flex":"none",N.querySelector("svg").style.transform=u?"rotate(180deg)":"rotate(0deg)"},U.appendChild(N),U.appendChild(_)}}function G(f,E){let v=document.createElement("div");Object.assign(v.style,E?i.cardHistory:i.card);let C=s[f.type]||s.info,k=document.createElement("div");Object.assign(k.style,i.cardHeader);let x=document.createElement("div");Object.assign(x.style,i.typeTag,{color:C.color,background:C.bg}),x.innerHTML=`${C.icon} <span>${f.type}</span>`;let B=document.createElement("span");if(Object.assign(B.style,i.dateTag),B.textContent=a(f.date),k.appendChild(x),E)k.appendChild(B);else{let y=document.createElement("button");y.className="cw-btn-interactive",Object.assign(y.style,i.dismissBtn),y.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',y.onmouseenter=()=>{y.style.color="#1e8e3e",y.style.background="#e6f4ea",y.style.borderColor="#1e8e3e"},y.onmouseleave=()=>{y.style.color="#5f6368",y.style.background="#fff",y.style.borderColor="rgba(0,0,0,0.1)"},y.onclick=P=>{P.stopPropagation(),$.playClick(),v.style.transform="translateX(20px)",v.style.opacity="0",setTimeout(()=>{let V=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");V.push(f.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(V)),L(),O()},200)},k.appendChild(y)}let N=document.createElement("div");Object.assign(N.style,i.cardContent);let _=document.createElement("div");Object.assign(_.style,i.msgTitle),_.textContent=f.title;let u=document.createElement("div");Object.assign(u.style,i.msgBody),u.innerHTML=c(f.text);let T=document.createElement("div");if(Object.assign(T.style,i.msgMeta),T.innerHTML=`Publicado por <b>${f.author||"Sistema"}</b>`,E||(T.innerHTML+=` \u2022 ${a(f.date)}`),N.appendChild(_),N.appendChild(u),N.appendChild(T),v.appendChild(k),v.appendChild(N),window._cwIsAdmin){let y=document.createElement("div");y.className="cw-card-actions";let P=document.createElement("button");P.className="cw-action-btn edit",P.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',P.onclick=()=>R(f);let V=document.createElement("button");V.className="cw-action-btn delete",V.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',V.onclick=()=>X(f.id),y.appendChild(P),y.appendChild(V),v.appendChild(y)}return v}let M=re.getCachedBroadcasts();M.length>0&&(St(M),L()),setTimeout(d,500),q(),o||(o=setInterval(q,Go));let I=document.createElement("div");Object.assign(I.style,Te),I.className="no-drag",p.appendChild(I),ke(p,I),document.body.appendChild(p);let A=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),F=Oe.some(f=>!A.includes(f.id));return{toggle:b,hasUnread:F}}function uo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,o.overlay);let a=document.createElement("div");Object.assign(a.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let s=document.createElement("div");Object.assign(s.style,o.title);let r=document.createElement("div");Object.assign(r.style,o.text);let c=document.createElement("div");Object.assign(c.style,o.dotsContainer);let p=document.createElement("div");Object.assign(p.style,o.btnContainer);let l=document.createElement("button");l.textContent="Pular",Object.assign(l.style,o.btn,o.btnSkip),l.onmouseover=()=>l.style.color="#202124",l.onmouseout=()=>l.style.color="#5f6368";let b=document.createElement("button");b.textContent="Pr\xF3ximo",Object.assign(b.style,o.btn,o.btnNext),b.onmouseover=()=>b.style.transform="scale(1.05)",b.onmouseout=()=>b.style.transform="scale(1)",p.appendChild(l),p.appendChild(b),a.appendChild(i),a.appendChild(s),a.appendChild(r),a.appendChild(c),a.appendChild(p),n.appendChild(a),document.body.appendChild(n);function h(m){let d=t[m];i.textContent=d.icon,s.textContent=d.title,r.textContent=d.text,c.innerHTML="",t.forEach((S,w)=>{let R=document.createElement("div");Object.assign(R.style,o.dot),w===m&&Object.assign(R.style,o.dotActive),c.appendChild(R)}),d.isLast?(l.style.display="none",b.textContent="Come\xE7ar \u{1F680}",b.style.width="100%"):(l.style.display="block",b.textContent="Pr\xF3ximo",b.style.width="auto")}function g(){localStorage.setItem("cw_onboarding_seen_v1","true"),n.style.opacity="0",a.style.transform="translateY(20px)",setTimeout(()=>n.remove(),400),$.playSuccess(),Y("Tudo pronto! Use o menu flutuante.")}b.onclick=()=>{$.playClick(),e<t.length-1?(e++,h(e)):g()},l.onclick=async()=>{await he("Pular o tutorial?")&&g()},h(0),requestAnimationFrame(()=>{n.style.opacity="1",a.style.transform="translateY(0)"})}var mo={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function go(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&Po(t)}function Po(t){let e=mo.slides,o=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,n.overlay);let i=document.createElement("div");Object.assign(i.style,n.card);let s=document.createElement("div");Object.assign(s.style,n.badge),s.textContent=`Atualiza\xE7\xE3o ${t}`;let r=document.createElement("div");Object.assign(r.style,n.icon);let c=document.createElement("div");Object.assign(c.style,n.title);let p=document.createElement("div");Object.assign(p.style,n.text);let l=document.createElement("div");Object.assign(l.style,n.dotsContainer);let b=document.createElement("button");Object.assign(b.style,n.btn),b.onmouseover=()=>b.style.transform="scale(1.02)",b.onmouseout=()=>b.style.transform="scale(1)",i.appendChild(s),i.appendChild(r),i.appendChild(c),i.appendChild(p),i.appendChild(l),i.appendChild(b),a.appendChild(i),document.body.appendChild(a);function h(m){let d=e[m];r.textContent=d.icon,c.textContent=d.title,p.textContent=d.text,l.innerHTML="",e.forEach((S,w)=>{let R=document.createElement("div");Object.assign(R.style,n.dot),w===m&&Object.assign(R.style,n.dotActive),l.appendChild(R)}),m===e.length-1?b.textContent="Entendi, vamos l\xE1! \u{1F44D}":b.textContent="Pr\xF3ximo"}function g(){localStorage.setItem("cw_last_version",t),a.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>a.remove(),400),$.playSuccess(),Y(`TechSol atualizado para ${t}!`)}b.onclick=()=>{$.playClick(),o<e.length-1?(o++,h(o)):g()},h(0),requestAnimationFrame(()=>{a.style.opacity="1",i.style.transform="translateY(0)"})}var bo="cw_timezone_pinned",Ct=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],jo=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function fo(){let t="v2.2 Pro",e=!1,o=null,n="mx",a=JSON.parse(localStorage.getItem(bo)||"[]"),i="",s="all",r=new Date;r.setHours(14,0,0,0);let c={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},p={container:{display:"flex",flexDirection:"column",height:"100%",background:c.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:c.surface,borderBottom:`1px solid ${c.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:c.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:c.primary,borderBottomColor:c.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:c.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:c.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${c.border}`,background:c.surface,color:c.textSub,transition:"all 0.2s"},chipActive:{background:c.primaryBg,color:c.primary,borderColor:c.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:c.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${c.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:c.surface,border:`1px solid ${c.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:c.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},l=document.createElement("div");l.id="timezone-popup",l.classList.add("cw-module-window"),Object.assign(l.style,le,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let h=ce(l,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:l},()=>E());l.appendChild(h);let g=document.createElement("div");Object.assign(g.style,p.container),l.appendChild(g);let m=document.createElement("div");Object.assign(m.style,p.tabHeader);let d=document.createElement("div");d.textContent="Monitoramento",Object.assign(d.style,p.tabBtn,p.tabActive);let S=document.createElement("div");S.textContent="Planejador",Object.assign(S.style,p.tabBtn),m.appendChild(d),m.appendChild(S),g.appendChild(m);let w=document.createElement("div");Object.assign(w.style,p.toolbar);let R=document.createElement("div");Object.assign(R.style,p.searchInputWrapper);let z=document.createElement("div");z.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(z.style,p.searchIcon);let j=document.createElement("input");j.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(j.style,p.searchInput),j.onfocus=()=>{j.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",j.style.borderColor="rgba(26,115,232,0.3)"},j.onblur=()=>{j.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",j.style.borderColor="transparent"},j.oninput=v=>{i=v.target.value.toLowerCase(),I()},R.appendChild(z),R.appendChild(j),w.appendChild(R);let X=document.createElement("div");Object.assign(X.style,p.chipsRow),jo.forEach(v=>{let C=document.createElement("div");C.textContent=v.label,C.id=`tz-filter-${v.id}`,Object.assign(C.style,p.chip),v.id===s&&Object.assign(C.style,p.chipActive),C.onclick=()=>{$.playClick(),s=v.id,Array.from(X.children).forEach(k=>{Object.assign(k.style,p.chip)}),Object.assign(C.style,p.chipActive),I()},X.appendChild(C)}),w.appendChild(X),g.appendChild(w);let U=document.createElement("div");Object.assign(U.style,p.listContainer);let q=document.createElement("style");q.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",g.appendChild(q);let O=document.createElement("div");Object.assign(O.style,p.plannerWrapper,{display:"none"}),g.appendChild(U),g.appendChild(O),d.onclick=()=>L("live"),S.onclick=()=>L("plan");function L(v){$.playClick(),v==="live"?(Object.assign(d.style,p.tabActive),Object.assign(S.style,p.tabBtn),S.style.borderBottomColor="transparent",U.style.display="flex",w.style.display="flex",O.style.display="none",F()):(Object.assign(S.style,p.tabActive),Object.assign(d.style,p.tabBtn),d.style.borderBottomColor="transparent",O.style.display="flex",U.style.display="none",w.style.display="none",f(),A())}function G(v){return v>=9&&v<17?{color:c.success,bg:c.successBg,label:"Aberto",icon:"\u{1F7E2}"}:v>=8&&v<9?{color:c.warning,bg:c.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:v>=17&&v<19?{color:c.warning,bg:c.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:c.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function M(v){a.includes(v)?a=a.filter(C=>C!==v):a.push(v),localStorage.setItem(bo,JSON.stringify(a)),I(),$.playClick()}function I(){U.innerHTML="";let v=new Date,C=Ct.filter(x=>{let B=x.name.toLowerCase().includes(i)||x.label.toLowerCase().includes(i),N=s==="all"||x.region===s;return B&&N});if(C.sort((x,B)=>{let N=a.includes(x.id),_=a.includes(B.id);return N&&!_?-1:!N&&_?1:x.name.localeCompare(B.name)}),C.length===0){U.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}C.forEach(x=>{let B=a.includes(x.id),N=v.toLocaleTimeString("pt-BR",{timeZone:x.zone,hour:"2-digit",minute:"2-digit"}),_=parseInt(N.split(":")[0]),u=G(_),T=_<6||_>18,y=document.createElement("div");Object.assign(y.style,p.hubCard),B&&Object.assign(y.style,p.hubCardPinned);let P=B?"\u2605":"\u2606",V=B?"#F9AB00":"#DADCE0";y.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${V}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${P}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${x.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${c.text}; letter-spacing:-0.2px;">${x.name}</div>
                        <div style="font-size:12px; color:${c.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${T?"\u{1F319}":"\u2600\uFE0F"} ${x.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${c.text}; font-family:'Google Sans', sans-serif;">${N}</div>
                    <div style="font-size:11px; font-weight:600; color:${u.color}; background:${u.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${u.label}
                    </div>
                </div>
            `,y.onmouseenter=()=>{y.style.transform="translateY(-2px)",y.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},y.onmouseleave=()=>{y.style.transform="translateY(0)",y.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let K=y.querySelector(".cw-pin-btn");K.onmouseenter=()=>{K.style.backgroundColor="#F1F3F4"},K.onmouseleave=()=>{K.style.backgroundColor="transparent"},K.onclick=H=>{H.stopPropagation(),M(x.id)},y.onclick=()=>{n=x.id,L("plan")},U.appendChild(y)});let k=document.createElement("div");k.style.height="20px",k.style.width="100%",U.appendChild(k)}function A(){O.innerHTML="";let v=document.createElement("div"),C=document.createElement("label");C.textContent="Onde est\xE1 o cliente?",C.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let k=document.createElement("select");Object.assign(k.style,Ye),k.style.padding="14px",[...Ct].sort((oe,se)=>oe.name.localeCompare(se.name)).forEach(oe=>{let se=document.createElement("option");se.value=oe.id,se.textContent=`${oe.flag} ${oe.name} (${oe.zone})`,oe.id===n&&(se.selected=!0),k.appendChild(se)}),k.onchange=oe=>{n=oe.target.value,Q(),$.playClick()},v.appendChild(C),v.appendChild(k),O.appendChild(v);let B=document.createElement("div");Object.assign(B.style,p.timeComparisonRow);let N=document.createElement("div");Object.assign(N.style,p.timeCard),N.style.backgroundColor="#F8FAFF",N.style.borderColor="#E8F0FE",N.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let _=document.createElement("div");Object.assign(_.style,p.timeCard),_.style.backgroundColor="#FFF8E1",_.style.borderColor="#FEF7E0",_.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,B.appendChild(N),B.appendChild(_),O.appendChild(B);let u=document.createElement("div");u.id="cw-planner-status",Object.assign(u.style,p.statusBadge),O.appendChild(u);let T=document.createElement("div");Object.assign(T.style,{padding:"0 4px",marginTop:"12px"});let y=document.createElement("div");y.textContent="Arraste para simular o hor\xE1rio:",y.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let P=document.createElement("div");Object.assign(P.style,p.timelineContainer);let V=document.createElement("div");Object.assign(V.style,p.timelineTrack);let K=document.createElement("div");Object.assign(K.style,p.dayZone),V.appendChild(K);let H=document.createElement("input");H.type="range",H.min="0",H.max="1439",H.step="15",H.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let J=document.createElement("div");J.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",J.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",P.appendChild(V),P.appendChild(H),P.appendChild(J),T.appendChild(y),T.appendChild(P),O.appendChild(T);let ee=N.querySelector("#cw-time-input-br"),ue=_.querySelector("#cw-time-display-client"),ae=_.querySelector("#cw-client-label");function Q(){let oe=Ct.find(vo=>vo.id===n);ae.textContent=`${oe.flag} ${oe.label} (${oe.zone})`;let se=r.getHours(),Be=r.getMinutes(),yo=`${String(se).padStart(2,"0")}:${String(Be).padStart(2,"0")}`;ee.value=yo,H.value=se*60+Be;let At=r.toLocaleTimeString("pt-BR",{timeZone:oe.zone,hour:"2-digit",minute:"2-digit"});ue.textContent=At;let De=parseInt(At.split(":")[0]);De>=9&&De<17?(u.style.background=c.successBg,u.style.color=c.success,u.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):De>=8&&De<9||De>=17&&De<19?(u.style.background=c.warningBg,u.style.color=c.warning,u.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(u.style.background=c.errorBg,u.style.color=c.error,u.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}H.oninput=oe=>{let se=parseInt(oe.target.value);r.setHours(Math.floor(se/60)),r.setMinutes(se%60),Q()},ee.oninput=oe=>{let[se,Be]=oe.target.value.split(":");se&&Be&&(r.setHours(parseInt(se)),r.setMinutes(parseInt(Be)),Q())},Q()}function F(){I(),o||(o=setInterval(I,6e4))}function f(){o&&(clearInterval(o),o=null)}function E(){e=!e,pe(e,l,"cw-btn-timezone"),e?L("live"):f()}return document.body.appendChild(l),E}function ho(){let t="v1.1",e=!1,o="general",n=null,a=null;if(!document.getElementById("cw-lib-styles")){let A=document.createElement("style");A.id="cw-lib-styles",A.innerHTML=`
            .cw-lib-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .cw-lib-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; border-color: rgba(0, 122, 255, 0.3) !important; }
            .cw-tactile { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.92) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #5F6368; }
            .cw-toolbar-btn:hover { background: #F1F3F4; color: #007AFF; border-color: #DADCE0; }
            .cw-toolbar-btn.active { background: #E8F0FE; color: #007AFF; border-color: #007AFF; }
        `,document.head.appendChild(A)}let i={bg:"#F0F2F5",surface:"#FFFFFF",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",text:"#1C1C1E",textSub:"#8E8E93",border:"rgba(0, 0, 0, 0.08)",danger:"#FF3B30"},s={container:{display:"flex",flexDirection:"column",height:"100%",background:i.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"12px 16px 0 16px",background:i.surface,borderBottom:`1px solid ${i.border}`},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:i.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",userSelect:"none"},tabActive:{color:i.primary,borderBottomColor:i.primary,fontWeight:"600"},listContainer:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"},emptyState:{padding:"40px 20px",textAlign:"center",color:"#BDC1C6",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},card:{background:i.surface,borderRadius:"16px",padding:"16px",border:`1px solid ${i.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative",overflow:"hidden"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},cardTitle:{fontSize:"14px",fontWeight:"600",color:i.text},cardPreview:{fontSize:"12px",color:i.textSub,lineHeight:"1.5",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"12px",paddingTop:"12px",borderTop:`1px dashed ${i.border}`},actionBtn:{padding:"6px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",cursor:"pointer",border:"none",background:"transparent",transition:"background 0.2s"},fab:{position:"absolute",bottom:"24px",right:"24px",width:"56px",height:"56px",borderRadius:"16px",background:i.primary,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"transform 0.2s",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.85)",backdropFilter:"blur(25px) saturate(180%)",webkitBackdropFilter:"blur(25px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"16px 24px",background:i.surface,borderBottom:`1px solid ${i.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"24px",overflowY:"auto"},inputGroup:{marginBottom:"20px"},label:{display:"block",fontSize:"12px",fontWeight:"700",color:i.textSub,marginBottom:"8px",textTransform:"uppercase"},input:{width:"100%",padding:"12px",borderRadius:"8px",border:`1px solid ${i.border}`,fontSize:"14px",fontFamily:"inherit",outline:"none",background:i.surface,boxSizing:"border-box"}},r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,le,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let p=ce(r,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:r},()=>I());r.appendChild(p);let l=document.createElement("div");Object.assign(l.style,s.container),r.appendChild(l);let b=document.createElement("div");Object.assign(b.style,s.tabHeader);let h=[{id:"general",label:"Geral",icon:"\u{1F4CB}"},{id:"note",label:"Notas",icon:"\u{1F4DD}"},{id:"email",label:"Emails",icon:"\u{1F4E7}"}];h.forEach(A=>{let F=document.createElement("div");F.innerHTML=`${A.icon} ${A.label}`,F.id=`lib-tab-${A.id}`,Object.assign(F.style,s.tabBtn),A.id===o&&Object.assign(F.style,s.tabActive),F.onmouseenter=()=>$.playHover(),F.onclick=()=>X(A.id),b.appendChild(F)}),l.appendChild(b);let g=document.createElement("div");Object.assign(g.style,s.listContainer),l.appendChild(g);let m=document.createElement("div");m.className="cw-fab cw-tactile",Object.assign(m.style,s.fab),m.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',m.onmouseenter=()=>m.style.transform="scale(1.1)",m.onmouseleave=()=>m.style.transform="scale(1)",m.onclick=()=>q(),l.appendChild(m),n=document.createElement("div"),Object.assign(n.style,s.editorOverlay);let d=document.createElement("div");Object.assign(d.style,s.editorHeader),d.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let S=document.createElement("button");S.innerHTML="Cancelar",S.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",S.onclick=O,d.appendChild(S),n.appendChild(d);let w=document.createElement("div");Object.assign(w.style,s.editorBody),n.appendChild(w);let R=document.createElement("div");R.style.cssText="padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";let z=document.createElement("button");z.textContent="Salvar",z.style.cssText="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);",z.onclick=L,R.appendChild(z),n.appendChild(R),l.appendChild(n);let j=document.createElement("div");Object.assign(j.style,Te),j.className="no-drag",r.appendChild(j),ke(r,j),document.body.appendChild(r);function X(A){$.playClick(),o=A,h.forEach(F=>{let f=document.getElementById(`lib-tab-${F.id}`);F.id===A?Object.assign(f.style,s.tabActive):Object.assign(f.style,s.tabBtn)}),U()}function U(){g.innerHTML="";let A=me.getSnippets(o);if(A.length===0){g.innerHTML=`
                <div style="${M(s.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;return}A.forEach(F=>{let f=document.createElement("div");f.className="cw-lib-card",Object.assign(f.style,s.card),F.isCode&&(f.style.borderLeft=`4px solid ${i.primary}`,f.style.background="rgba(0, 122, 255, 0.02)");let E=F.content;if(F.isRich){let v=document.createElement("div");v.innerHTML=F.content;let C=v.querySelector("img");E=v.innerText.substring(0,150)+(v.innerText.length>150?"...":""),C&&(E="\u{1F5BC}\uFE0F [Cont\xE9m Imagens] "+E)}f.innerHTML=`
                <div style="${M(s.cardHeader)}">
                    <div style="${M(s.cardTitle)}">${F.title}</div>
                    <div style="display:flex; gap:4px;">
                        ${F.isCode?'<span style="font-size:10px; background:#F1F3F4; color:#5F6368; padding:2px 6px; border-radius:4px; font-family:monospace;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>':""}
                    </div>
                </div>
                <div style="${M(s.cardPreview)}; ${F.isCode?"font-family:'Roboto Mono', monospace; font-size:11px;":""}">${E}</div>
                <div style="${M(s.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${M(s.actionBtn)}; color:#007AFF; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${M(s.actionBtn)}; color:#8E8E93; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${M(s.actionBtn)}; color:#FF3B30; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                    </button>
                </div>
            `,f.onmouseenter=()=>{$.playHover()},f.querySelector(".cw-act-copy").onclick=v=>{if(v.stopPropagation(),$.playClick(),F.isRich){let C=new Blob([F.content],{type:"text/html"}),k=document.createElement("div");k.style.whiteSpace="pre-wrap",k.innerHTML=F.content;let x=new Blob([k.innerText],{type:"text/plain"}),B=[new ClipboardItem({"text/html":C,"text/plain":x})];navigator.clipboard.write(B)}else navigator.clipboard.writeText(F.content);Y("Copiado!")},f.querySelector(".cw-act-edit").onclick=v=>{v.stopPropagation(),$.playClick(),q(F)},f.querySelector(".cw-act-del").onclick=async v=>{v.stopPropagation(),$.playClick(),await he("Excluir este item?")&&(me.delete(F.id),U(),Y("Item exclu\xEDdo."))},g.appendChild(f)})}function q(A=null){a=A?A.id:null,w.innerHTML="",w.appendChild(G("title","T\xEDtulo / Nome",A?A.title:"")),o==="email"&&w.appendChild(G("subject","Assunto do Email",A?A.subject:""));let F="Conte\xFAdo";o==="email"&&(F="Corpo do Email (HTML)"),o==="note"&&(F="Texto da Nota (Reason)"),w.appendChild(G("content",F,A?A.content:"",{isRich:!0,isCode:A?A.isCode:!1})),d.querySelector("span").textContent=A?"Editar Item":"Novo Item",n.style.transform="translateY(0)",setTimeout(()=>{let f=w.querySelector("input");f&&f.focus()},300)}function O(){n.style.transform="translateY(100%)",setTimeout(()=>a=null,300)}async function L(){let A=w.querySelector("#cw-inp-title"),F=w.querySelector("#cw-inp-content"),f=A.value.trim(),E=F.contentEditable==="true"?F.innerHTML:F.value.trim(),v=F.getAttribute("data-is-code")==="true";if(!f||!E||E==="<br>"){Y("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let C={id:a,type:o,title:f,content:E,isCode:v,isRich:F.contentEditable==="true"};if(o==="email"){let k=w.querySelector("#cw-inp-subject").value.trim();if(!k){Y("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}C.subject=k}z.textContent="Salvando...",await me.save(C),z.textContent="Salvar",O(),U(),Y("Salvo com sucesso!"),$.playSuccess()}function G(A,F,f,E={}){let v=document.createElement("div");Object.assign(v.style,s.inputGroup);let C=document.createElement("label");C.textContent=F,Object.assign(C.style,s.label);let k;if(E.isRich){let x=document.createElement("div");x.style.cssText="display:flex; gap:6px; margin-bottom:12px; background:rgba(241, 243, 244, 0.8); padding:6px; border-radius:12px; border:1px solid #DADCE0; backdrop-filter: blur(10px);",x.innerHTML=`
                <button type="button" class="cw-toolbar-btn cw-tb-bold cw-tactile" title="Negrito">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-italic cw-tactile" title="It\xE1lico">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-code cw-tactile" title="Formato C\xF3digo">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-img cw-tactile" title="Inserir Imagem">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </button>
            `,k=document.createElement("div"),k.contentEditable="true",Object.assign(k.style,s.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),k.innerHTML=f||"",E.isCode&&(k.style.fontFamily="'Roboto Mono', monospace",k.style.backgroundColor="#F8F9FA",k.setAttribute("data-is-code","true")),x.querySelectorAll(".cw-toolbar-btn").forEach(B=>{B.onmouseenter=()=>$.playHover(),B.onmousedown=()=>$.playClick()}),x.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),k.focus()},x.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),k.focus()},x.querySelector(".cw-tb-code").onclick=B=>{let _=!(k.getAttribute("data-is-code")==="true");k.setAttribute("data-is-code",_),k.style.fontFamily=_?"'Roboto Mono', monospace":"inherit",k.style.backgroundColor=_?"rgba(0, 122, 255, 0.03)":i.surface,_?B.currentTarget.classList.add("active"):B.currentTarget.classList.remove("active"),k.focus()},x.querySelector(".cw-tb-img").onclick=async()=>{let B=await zt("Cole a URL da imagem:");B&&(document.execCommand("insertImage",!1,B),k.querySelectorAll("img").forEach(_=>{_.style.maxWidth="100%",_.style.borderRadius="8px"}))},k.onpaste=B=>{let N=(B.clipboardData||B.originalEvent.clipboardData).items;for(let _ of N)if(_.kind==="file"&&_.type.startsWith("image/")){B.preventDefault();let u=_.getAsFile(),T=new FileReader;T.onload=y=>{let P=`<img src="${y.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,P)},T.readAsDataURL(u)}},v.appendChild(C),v.appendChild(x)}else k=document.createElement("input"),k.type="text",Object.assign(k.style,s.input),k.value=f||"",v.appendChild(C);return k.id=`cw-inp-${A}`,k.onfocus=()=>{k.style.borderColor=i.primary,k.style.boxShadow=`0 0 0 2px ${i.primaryBg}`},k.onblur=()=>{k.style.borderColor=i.border,k.style.boxShadow="none"},v.appendChild(k),v}function M(A){return Object.entries(A).map(([F,f])=>`${F.replace(/[A-Z]/g,E=>"-"+E.toLowerCase())}:${f}`).join(";")}function I(){e=!e,pe(e,r,"cw-btn-library"),e&&U()}return I}function xo(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},n="cw-configs-styles";if(!document.getElementById(n)){let g=document.createElement("style");g.id=n,g.innerHTML=`
            .cw-configs-container {
                display: flex; flex-direction: column; height: 100%;
                background: ${o.bg}; font-family: 'Google Sans', Roboto, sans-serif;
                padding: 20px; gap: 24px; overflow-y: auto;
            }
            .cw-configs-section { display: flex; flex-direction: column; gap: 12px; }
            .cw-configs-section-title {
                font-size: 12px; font-weight: 700; color: ${o.textSub};
                text-transform: uppercase; letter-spacing: 0.8px;
            }
            .cw-configs-card {
                background: ${o.surface}; border-radius: 12px; padding: 16px;
                border: 1px solid ${o.border}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                display: flex; flex-direction: column; gap: 16px;
            }
            .cw-configs-row { display: flex; align-items: center; justify-content: space-between; }
            .cw-configs-label { font-size: 14px; font-weight: 500; color: ${o.text}; }
            .cw-configs-desc { font-size: 12px; color: ${o.textSub}; margin-top: 2px; }
            .cw-configs-btn {
                padding: 10px; border-radius: 8px; border: 1px solid ${o.border};
                background: white; cursor: pointer; font-weight: 500; font-family: inherit;
                transition: all 0.2s;
            }
            .cw-configs-btn:hover { background: #f1f3f4; border-color: #bdc1c6; }
        `,document.head.appendChild(g)}let a=document.createElement("div");a.id="configs-popup",a.classList.add("cw-module-window"),Object.assign(a.style,le,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let s=ce(a,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:a},()=>h());a.appendChild(s);let r=document.createElement("div");r.className="cw-configs-container",a.appendChild(r);let c=document.createElement("div");c.className="cw-configs-section",c.innerHTML=`
        <div class="cw-configs-section-title">Prefer\xEAncias de Som</div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label">Efeitos Sonoros</div>
                    <div class="cw-configs-desc">Ativar ou desativar sons de interface.</div>
                </div>
                <input type="checkbox" id="cw-config-sound-toggle" ${$.isMuted()?"":"checked"} style="cursor:pointer; width:20px; height:20px;">
            </div>
        </div>
    `;let p=c.querySelector("#cw-config-sound-toggle");p.onchange=g=>{$.setMuted(!g.target.checked),g.target.checked&&$.playClick()},r.appendChild(c);let l=document.createElement("div");l.className="cw-configs-section",l.innerHTML=`
        <div class="cw-configs-section-title">Apar\xEAncia</div>
        <div class="cw-configs-card">
            <div style="color:${o.textSub}; font-size:13px; text-align:center; padding:10px;">
                Em breve: Suporte a modo escuro e esquemas de cores.
            </div>
        </div>
    `,r.appendChild(l);let b=document.createElement("div");b.className="cw-configs-section",b.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <button class="cw-configs-btn">Reportar Bug</button>
                <button class="cw-configs-btn">Sugerir Recurso</button>
            </div>
        </div>
    `,r.appendChild(b);function h(){e=!e,pe(e,a,"cw-btn-configs"),e&&$.playClick()}return document.body.appendChild(a),h}function $o(){if(window.techSolInitialized){gt();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{qt();try{$.initGlobalListeners(),$.playStartup()}catch(p){console.warn("\xC1udio bloqueado:",p)}re.fetchTips(),gt();let e=no(),o=io(),n=ro(),a=co(),i=fo(),s=ho(),r=xo(),c=po();to({toggleNotes:e,toggleEmail:o,toggleScript:n,toggleLinks:a,toggleTimezone:i,toggleLibrary:s,toggleConfigs:r,broadcastControl:c}),setTimeout(()=>{re.logEvent("App","Start","Session Start"),uo(),setTimeout(()=>{go(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),Y("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}$o();})();
