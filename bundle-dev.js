(()=>{var To=Object.defineProperty;var ko=(t,e)=>()=>(t&&(e=t(t=0)),e);var Fo=(t,e)=>{for(var o in e)To(t,o,{get:e[o],enumerable:!0})};var Qe={};Fo(Qe,{NotesState:()=>Ze,notesState:()=>P});var Ze,P,He=ko(()=>{Ze=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.excludedFields=new Set,this.activeFields=[];let e=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(e||"[]")),this.screenshotMode="implementation"}setCaseType(e){this.currentCaseType=e,this.isDirty=!0,this.notify()}setLanguage(e){this.currentLang=e,this.notify()}setPortugalCase(e){this.isPortugalCase=e,this.isDirty=!0,this.notify()}setConsent(e){this.consent=e,this.isDirty=!0,this.notify()}setTagSupportUsed(e){this.tagSupportUsed=e,e||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(e){this.activeFields=[...e],this.isDirty=!0,this.notify()}removeField(e){this.activeFields=this.activeFields.filter(o=>o!==e),this.isDirty=!0,this.notify()}addFieldAt(e,o){this.activeFields.includes(e)||(this.activeFields.splice(o,0,e),this.isDirty=!0,this.notify())}setForcedScreenshots(e){this.forcedScreenshots=new Set(e),this.isDirty=!0,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.isDirty=!0,this.notify()}setExcludedFields(e){this.excludedFields=new Set(e),this.isDirty=!0,this.notify()}toggleFieldExclusion(e,o){o?this.excludedFields.add(e):this.excludedFields.delete(e),this.isDirty=!0,this.notify()}setStatus(e){this.currentStatus=e,this.isDirty=!0,this.notify()}setSubStatus(e){this.currentSubStatus=e,this.isDirty=!0,this.notify()}setScreenshotMode(e){this.screenshotMode=e,this.notify()}setActiveTasks(e){this.activeTasks=e,this.isDirty=!0,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]=o,this.isDirty=!0,this.notify()}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},P=new Ze});var Xe="",Ke="",Ft=t=>new Promise(e=>setTimeout(e,t));async function Ot(){if(Xe&&Ke)return Xe;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Ft(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let a=document.querySelector("profile-details img");if(a&&a.src.includes("/photos/")){let s=a.src.match(/\/photos\/([^\?]+)/)[1];e=s.charAt(0).toUpperCase()+s.slice(1)}}let n=document.querySelector("profile-details .email");return n&&(Ke=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Ke)),t.click(),document.body.click(),Xe=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function Pe(){return Xe||"Consultor"}function ve(){return Ke||null}function It(t){let e=new Date,o=e.getHours(),n=e.getDay(),a="Ol\xE1",s="";o>=5&&o<12?(a="Bom dia",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(a="Boa tarde",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(a="Boa noite",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let i=[];o>=0&&o<5?i=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?n===1?i=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?i=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:i=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?i=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:i=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(i=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=i[Math.floor(Math.random()*i.length)];return{prefix:`${a},`,name:t,suffix:r,icon:s,isFriday:n===5}}async function Oo(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,n=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');n&&(n.click(),await Ft(500));let s=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(i=>{let r=i.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return s?s.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Io(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function _o(){try{let e=Array.from(document.querySelectorAll(".data-pair-label")).find(a=>a.textContent.includes("Google Ads External Customer ID")||a.textContent.includes("Customer ID"));if(e){let a=e.closest("home-data-item")||e.parentElement;if(a){let s=a.querySelector(".data-pair-content");if(s)return s.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let n=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(n)return n[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"---"}async function Lo(){let t="---";try{t=window.location.href.split("/").pop()}catch(e){console.warn("Falha URL:",e)}return t}async function we(){let t="Cliente",e="[INSERIR URL]";try{let r=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(r&&r.nextElementSibling){let p=r.nextElementSibling.innerText.trim();p&&(t=p)}}catch(i){console.warn("Falha Nome:",i)}try{let r=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(r&&r.nextElementSibling){let p=r.nextElementSibling.innerText.trim();p&&(e=p)}}catch(i){console.warn("Falha URL:",i)}let o=await Oo(),n=Io(),a=_o(),s=await Lo();return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:n,cid:a,agentName:Pe(),caseId:s}}var _e=null,mt=null,Te=.3;var ke=localStorage.getItem("cw_sounds_muted")==="true";function Ie(){if(!_e){let t=window.AudioContext||window.webkitAudioContext;t&&(_e=new t)}return _e&&_e.state==="suspended"&&_e.resume(),_e}function _t(t){if(mt)return mt;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),n=o.getChannelData(0);for(let a=0;a<e;a++)n[a]=Math.random()*2-1;return mt=o,o}var $={setMuted:t=>{ke=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>ke,playClick:()=>{if(ke)return;let t=Ie();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=_t(t);let n=t.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let a=t.createGain();a.gain.setValueAtTime(Te*.8,e),a.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(n),n.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(ke)return;let t=Ie();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(Te*.1,e+.005),n.gain.linearRampToValueAtTime(0,e+.02),o.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(ke)return;let t=Ie();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((n,a)=>{let s=t.createOscillator(),i=t.createGain();s.type="sine",s.frequency.value=n,i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Te*.6,e+.05),i.gain.exponentialRampToValueAtTime(.001,e+.6),s.connect(i),i.connect(t.destination),s.start(e),s.stop(e+.7)})},playGenieOpen:()=>{if(ke)return;let t=Ie();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=_t(t);let n=t.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,e),n.frequency.exponentialRampToValueAtTime(800,e+.2);let a=t.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Te*.5,e+.05),a.gain.linearRampToValueAtTime(0,e+.25),o.connect(n),n.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(ke)return;let t=Ie();if(!t)return;let e=t.currentTime,o=t.createOscillator(),n=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),n.gain.setValueAtTime(Te,e),n.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(ke)return;let t=Ie();if(!t)return;let e=t.currentTime,o=.12,n=t.createOscillator(),a=t.createGain(),s=t.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,e),n.frequency.exponentialRampToValueAtTime(50,e+.1),s.type="lowpass",s.frequency.setValueAtTime(800,e),s.frequency.exponentialRampToValueAtTime(100,e+.1),a.gain.setValueAtTime(Te*4,e),a.gain.exponentialRampToValueAtTime(.001,e+.1),n.connect(s),s.connect(a),a.connect(t.destination),n.start(e),n.stop(e+.12);let i=t.createOscillator(),r=t.createGain();i.type="sine",i.frequency.setValueAtTime(150,e),i.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(Te*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),i.connect(r),r.connect(t.destination),i.start(e),i.stop(e+.15),[55,55.4,110.5].forEach(l=>{let d=t.createOscillator(),c=t.createGain(),h=t.createBiquadFilter();d.type="sawtooth",d.frequency.value=l,h.type="lowpass",h.frequency.setValueAtTime(30,e),h.frequency.linearRampToValueAtTime(900,e+o+.2),h.frequency.exponentialRampToValueAtTime(40,e+3),c.gain.setValueAtTime(0,e),c.gain.linearRampToValueAtTime(Te*.6,e+o+.1),c.gain.exponentialRampToValueAtTime(.001,e+3.5),d.connect(h),h.connect(c),c.connect(t.destination),d.start(e),d.stop(e+3.6)})},playNotification:()=>{if(ke)return;let t=Ie();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let a=t.createOscillator(),s=t.createGain();a.type="sine",a.frequency.setValueAtTime(n.freq,e),s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(Te*n.vol,e+.004),s.gain.exponentialRampToValueAtTime(.001,e+n.dur),a.connect(s),s.connect(t.destination),a.start(e),a.stop(e+n.dur+.1)})},playSwoosh:()=>{$.playGenieOpen()},playReset:()=>{$.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!_e)return;let n=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(o.relatedTarget))return;let a=Date.now();a-t<e||($.playHover(),t=a)},{passive:!0})}};var Lt=1e4;function Mt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function K(t,e={}){let o=document.createElement("div"),n=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?$.playError():$.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function Dt(t,e=null){let o=0,n=0,a=0,s=0,i=e||t;i.style.cursor="grab",i.onmousedown=r;function r(d){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(d.target.tagName)||d.target.closest(".no-drag"))return;d=d||window.event,i.style.cursor="grabbing",t.style.transition="none";let c=t.getBoundingClientRect();t.style.transform="none",t.style.left=c.left+"px",t.style.top=c.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",Lt++,t.style.zIndex=Lt,a=d.clientX,s=d.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=l,document.onmousemove=p}function p(d){d=d||window.event,d.preventDefault(),o=a-d.clientX,n=s-d.clientY,a=d.clientX,s=d.clientY;let c=t.offsetTop-n,h=t.offsetLeft-o,b=16,m=window.innerWidth,g=window.innerHeight,y=t.offsetWidth,w=t.offsetHeight;h<b?h=b:h+y>m-b&&(h=m-y-b),c<b?c=b:c+w>g-b&&(c=g-w-b),t.style.top=c+"px",t.style.left=h+"px"}function l(){document.onmouseup=null,document.onmousemove=null,i.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var ce={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var ft={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Je={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Nt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var je={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var gt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],qt=-1;function Rt(){let t=Math.floor(Math.random()*gt.length);return t===qt&&(t=(t+1)%gt.length),qt=t,gt[t]}var Fe=t=>new Promise(e=>setTimeout(e,t));async function qo(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await Fe(200);for(let n=0;n<e.length;n++){let a=e.charAt(n),s=document.createElement("span");s.textContent=a,o&&o.parentNode===t?o.before(s):t.appendChild(s);let i=Math.floor(Math.random()*60)+30;n===0&&(i=150),n>e.length-3&&(i=30),await Fe(i)}await Fe(600),o&&(o.style.display="none")}async function bt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Fe(200);let e=await Ot(),o=It(e),n=t.querySelector("#w-icon"),a=t.querySelector("#p1"),s=t.querySelector("#p2"),i=t.querySelector("#p3"),r=t.querySelector("#p-sextou");n&&(n.innerHTML=o.icon),a&&(a.textContent=o.prefix),i&&(i.textContent=o.suffix),await Fe(300);let p=n?n.querySelector("svg"):null;if(p&&(p.style.opacity="1",p.style.transform="scale(1)"),await Fe(400),a&&(a.style.opacity="1"),$.playStartup(),s&&await qo(s,o.name),i&&(i.style.opacity="1",i.style.transform="translateY(0)"),o.isFriday&&r){await Fe(400),r.style.display="block",r.offsetWidth;let l=r.querySelector(".sextou-badge");l&&(l.style.opacity="1",l.style.transform="scale(1)")}await Fe(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Fe(900),t.parentNode&&t.parentNode.removeChild(t)}}function zt(t){if(!t)return;let e=t.getBoundingClientRect(),o=window.innerWidth,n=window.innerHeight,a=24,s=o-e.width-a,i=n-e.height-a,r=parseFloat(t.style.left)||e.left,p=parseFloat(t.style.top)||e.top,l=Math.max(a,Math.min(r,s)),d=Math.max(a,Math.min(p,i));if(l!==r||d!==p){let c=t.style.transition;t.style.transition="left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",t.style.left=`${l}px`,t.style.top=`${d}px`,setTimeout(()=>{t.style.transition=c},300)}}var Se={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Ce(t,e){e.onmousedown=o;function o(n){n.stopPropagation(),n.preventDefault();let a=t.style.transition;t.style.transition="none";let s=n.clientX,i=n.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),p=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),l=s,d=i,c=!1;function h(g){l=g.clientX,d=g.clientY,c||(window.requestAnimationFrame(()=>{b(),c=!1}),c=!0)}function b(){let g=r+(l-s),y=p+(d-i);g>360&&(t.style.width=g+"px"),y>300&&(t.style.height=y+"px")}function m(){document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",m),setTimeout(()=>{t.style.transition=a},50)}document.addEventListener("mousemove",h),document.addEventListener("mouseup",m)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function Bt(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function Pt(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function jt(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function ge(t,e={}){return new Promise(o=>{let n=Pt(),a=jt(),s=e.danger?"#FF3B30":"#007AFF",i=e.confirmText||(e.danger?"Excluir":"Confirmar");a.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${s}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${i}</button>
            </div>
        `,n.appendChild(a),document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity=1,a.style.transform="scale(1)"});let r=d=>{n.style.opacity=0,a.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(d)},300)},p=a.querySelector("#cw-conf-cancel"),l=a.querySelector("#cw-conf-ok");[p,l].forEach(d=>d.onmouseenter=()=>$.playHover()),p.onclick=()=>{$.playClick(),r(!1)},l.onclick=()=>{$.playClick(),r(!0)}})}function Ht(t,e=""){return new Promise(o=>{let n=Pt(),a=jt();a.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,n.appendChild(a),document.body.appendChild(n);let s=a.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{n.style.opacity=1,a.style.transform="scale(1)",setTimeout(()=>s.focus(),100)});let i=l=>{n.style.opacity=0,a.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(l)},300)},r=a.querySelector("#cw-prompt-cancel"),p=a.querySelector("#cw-prompt-ok");[r,p].forEach(l=>l.onmouseenter=()=>$.playHover()),r.onclick=()=>{$.playClick(),i(null)},p.onclick=()=>{$.playClick(),i(s.value)},s.onkeydown=l=>{l.key==="Enter"&&p.click(),l.key==="Escape"&&r.click()}})}He();var Mo={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Gt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function de(t,e,o,n,a,s){let i=document.createElement("div");Object.assign(i.style,Mo),Dt(t,i);let r=document.createElement("div");if(Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let w=document.createElement("style");w.id="cw-header-anim",w.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(w)}r.style.animation="cw-header-flow 6s linear infinite",i.appendChild(r),a&&(a.googleLine=r);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"12px"});let l=document.createElement("img");l.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(l.style,{width:"20px",height:"20px",pointerEvents:"none"});let d=document.createElement("span");d.textContent=e,p.appendChild(l),p.appendChild(d);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"4px"});let h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',b='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',m=document.createElement("div");m.innerHTML=h,Object.assign(m.style,Gt),m.title="Sobre & Feedback",m.classList.add("no-drag"),m.onmouseenter=()=>{m.style.background="rgba(255,255,255,0.1)",m.style.color="#FFF"},m.onmouseleave=()=>{m.style.color!=="rgb(138, 180, 248)"&&(m.style.background="transparent",m.style.color="#9AA0A6")};let g=document.createElement("div");g.innerHTML=b,Object.assign(g.style,Gt),g.title="Fechar",g.classList.add("no-drag"),g.onmouseenter=()=>{g.style.background="rgba(242, 139, 130, 0.2)",g.style.color="#F28B82"},g.onmouseleave=()=>{g.style.background="transparent",g.style.color="#9AA0A6"},g.onmousedown=w=>w.stopPropagation(),m.onmousedown=w=>w.stopPropagation(),g.onclick=s;let y=Do(t,e,o,n);return m.onclick=w=>{w.stopPropagation(),y.style.opacity==="1"?(y.style.opacity="0",y.style.pointerEvents="none",m.style.color="#9AA0A6",m.style.background="transparent"):(y.style.opacity="1",y.style.pointerEvents="auto",m.style.color="#8AB4F8",m.style.background="rgba(138, 180, 248, 0.1)")},c.appendChild(m),c.appendChild(g),i.appendChild(p),i.appendChild(c),i}function Do(t,e,o,n){let a=document.createElement("div");return Object.assign(a.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),a.innerHTML=`
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
    `,setTimeout(()=>{let s=a.querySelector("#cw-feedback-link");s&&(s.onmouseenter=()=>{s.style.backgroundColor="#E8F0FE",s.style.transform="scale(1.02)"},s.onmouseleave=()=>{s.style.backgroundColor="#F8F9FA",s.style.transform="scale(1)"});let i=a.querySelector("#close-help-internal");i&&(i.onmouseover=()=>i.style.backgroundColor="#f8f9fa",i.onmouseout=()=>i.style.backgroundColor="white",i.onclick=()=>{a.style.opacity="0",a.style.pointerEvents="none"})},0),t.appendChild(a),a}var D={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},le={small:"8px",medium:"12px",large:"20px",pill:"100px"},Le={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},se="cubic-bezier(0.34, 1.56, 0.64, 1)",No={width:"100%",padding:"14px 16px",borderRadius:le.medium,border:`1.5px solid ${D.border}`,backgroundColor:D.bgInput,fontSize:"14px",color:D.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${se}`,outline:"none"},nn={...No,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},an={fontSize:"12px",fontWeight:"700",color:D.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},sn={display:"block",fontSize:"14px",fontWeight:"600",color:D.text,marginBottom:"10px",marginTop:"20px"},rn={fontSize:"12px",color:D.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},xt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:D.primary},ln={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:D.text,cursor:"pointer",padding:"16px 20px",backgroundColor:D.surface,border:`1px solid ${D.border}`,borderRadius:le.large,transition:`all 0.4s ${se}`,userSelect:"none",boxShadow:Le.subtle},cn={padding:"14px 28px",color:"#fff",backgroundColor:D.primary,border:"none",borderRadius:le.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${se}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},dn={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${D.primary}`,color:D.primary,borderRadius:le.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${se}`},pn={background:"transparent",border:`1px solid ${D.border}`,borderRadius:le.pill,color:D.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${se}`};function $t(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,ce,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${se}, height 0.4s ${se}, transform 0.4s ${se}, opacity 0.3s ease`,borderRadius:le.large,boxShadow:Le.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let n={popup:o,googleLine:null},a=de(o,"Case Notes",t,"Gera notas padronizadas com excel\xEAncia visual.",n,e);o.appendChild(a);let s=document.createElement("div");s.className="cw-popup-content",Object.assign(s.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:D.surface}),o.appendChild(s);let i=document.createElement("div");i.textContent="created by lucaste@",Object.assign(i.style,Nt,{padding:"16px 24px",borderTop:`1px solid ${D.bgInput}`,color:D.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(i);let r=document.createElement("div");return Object.assign(r.style,Se),r.className="no-drag",o.appendChild(r),Ce(o,r),Ro(),{popup:o,content:s,header:a,animRefs:n,credit:i}}function Ro(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${le.medium} !important;
            border: 1.5px solid ${D.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: all 0.2s ${se} !important;
            box-sizing: border-box !important;
            background: ${D.bgInput} !important;
            color: ${D.text} !important;
            outline: none !important;
            box-shadow: ${Le.subtle} !important;
        }

        #notes-assistant-popup .cw-select {
            appearance: none !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E") !important;
            background-repeat: no-repeat !important;
            background-position: right 14px center !important;
            background-size: 16px !important;
            padding-right: 40px !important;
            cursor: pointer !important;
            font-weight: 500 !important;
            line-height: 1.5 !important;
            /* Ensure background and border transitions are smooth while icon stays static */
            transition: border-color 0.2s ${se}, background-color 0.2s ${se}, box-shadow 0.2s ${se} !important;
        }

        .cw-input:hover, .cw-textarea:hover, #notes-assistant-popup .cw-select:hover {
            border-color: #bdc1c6 !important;
            background-color: #f1f3f4 !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }

        .cw-input:focus, .cw-textarea:focus, #notes-assistant-popup .cw-select:focus {
            border-color: ${D.primary} !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15), 0 2px 8px rgba(0,0,0,0.05) !important;
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
            border-radius: ${le.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${se};
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
            border-radius: ${le.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${se};
        }
        .cw-btn-secondary:hover {
            background: ${D.bgInput};
            border-color: #bdc1c6;
            color: ${D.text};
        }
    `,document.head.appendChild(t)}var he={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} Seguimos com os passos:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Pasos ejecutados:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:"}},ye={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Ae={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Ne={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Re=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],et=["CONSIDERACOES","COMENTARIOS"],tt={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 2 -`},"quickfill-ni-followup-lm":{type:"lm","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up LM 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 enviei e-mail de follow-up (caso LM, sem tentativas de liga\xE7\xE3o), mas n\xE3o obtive resposta.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":"\u2022 E-mail de follow-up enviado (LM) -"},"quickfill-gtm-install":{type:"all","field-REASON_COMMENTS":"Instala\xE7\xE3o do GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
\u2022 Instalamos dentro do CMS/Hospedagem.
\u2022 Criamos o Vinculador de Convers\xF5es.`,"field-RESULTADO":"\u2022 Validei a instala\xE7\xE3o.",linkedTask:"gtm_installation"},"quickfill-whatsapp":{type:"all","field-REASON_COMMENTS":"Instala\xE7\xE3o do Ads Conversion tracking para Whatsapp finalizada.","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para WHATSAPP","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM para os bot\xF5es de WhatsApp.
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-form":{type:"all","field-REASON_COMMENTS":"Instala\xE7\xE3o do Ads Conversion tracking para Form finalizada.","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para FORMUL\xC1RIO (padr\xE3o, n\xE3o-otimizada).","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM.
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-ecw4-close":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o do acompanhamento de EC.","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento da convers\xE3o otimizada (ECW4).","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de acompanhamento, verifiquei o painel do Ads.
\u2022 A convers\xE3o est\xE1 sendo registrada corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento da convers\xE3o otimizada.
\u2022 Assim, fecho o caso.`,linkedTask:"ads_enhanced_conversions"},"quickfill-ga4-event-close":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o do Acompanhamento de GA4.","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento de Eventos GA4 ap\xF3s 48h.","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de 48h de acompanhamento, verifiquei o painel.
\u2022 O evento est\xE1 sendo registrado corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento do rastreamento de eventos.
\u2022 Assim, fecho o caso.`,linkedTask:"ga4_event_tracking"},"quickfill-as-no-show":{type:"all","field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o compareceu na meet, por\xE9m respondeu o e-mail pedindo o reagendamento"},"quickfill-as-insufficient-time":{type:"all","field-MOTIVO_REAGENDAMENTO":`\u2022 Precisamos reagendar o caso, j\xE1 que o tempo foi insuficiente para terminar as Tasks
\u2022 Implementamos [descrever o que foi feito]`},"quickfill-as-no-access":{type:"all","field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o tinha os acessos necess\xE1rios para podermos implementar as tasks"},"quickfill-in-nrp-bau":{type:"bau","field-REASON_COMMENTS":"NRP (BAU - 3 tentativas)","field-COMENTARIOS":`\u2022 Duas liga\xE7\xF5es seguidas, e e-mail "Antes dos 10 minutos" e uma terceira e ultima tentativa de liga\xE7\xE3o.
\u2022 N\xE3o houve resposta \xE0s tentativas de liga\xE7\xE3o ou e-mail, por isso o caso ser\xE1 inativado.`,"field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -
\u2022 Tentativa 3 -`,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-no-show-bau":{type:"bau","field-REASON_COMMENTS":"Sem resposta ao 2 Day Rule.","field-ON_CALL":"N/A","field-COMENTARIOS":`\u2022 O caso foi gerado e entrei na chamada no hor\xE1rio agendado.
\u2022 O anunciante n\xE3o compareceu \xE0 reuni\xE3o.
\u2022 Segui o protocolo de espera (BAU): realizei duas tentativas de liga\xE7\xE3o, sem sucesso.
\u2022 Nenhuma das liga\xE7\xF5es foi atendida (ex: Caixa Postal).
\u2022 Caso inativado ap\xF3s 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 Tentativa 1 - 
\u2022 Tentativa 2  - 
\u2022 Tentativa 3 - `,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-manual":{type:"all","field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-ni-attempted-2day":{type:"bau","field-REASON_COMMENTS":"Attempted Contact (In\xEDcio 2 Day Rule)","field-CONTEXTO_CALL":`\u2022 Fiz a primeira tentativa de liga\xE7\xE3o, sem sucesso.
\u2022 Enviei uma message no chat para o AM.
\u2022 Aguardei 5 minutos e fiz a segunda tentativa de liga\xE7\xE3o, novamente sem sucesso.
\u2022 Aguardei mais 5 minutos e agora farei o acompanhamento 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 MSG AM -
\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`},"quickfill-dc-lm-no-access":{type:"all","field-REASON_COMMENTS":"Discard - Falta de acessos (Reagendamento solicitado)","field-COMENTARIOS":`N\xE3o conseguimos implementar nada durante a consultoria, j\xE1 que o adv n\xE3o tinha os acessos.

Irei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`},"quickfill-dc-lm-incomplete":{type:"all","field-REASON_COMMENTS":"Discard - Nada foi implementado durante a consultoria","field-COMENTARIOS":`N\xE3o conseguimos implementar nada durante a consultoria, pois n\xE3o houve tempo o suficiente para terminar a task relacionada.

Irei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`},"quickfill-dc-lm-no-show":{type:"all","field-REASON_COMMENTS":"Discard - Sem contato com o Adv","field-COMENTARIOS":`O adv n\xE3o compareceu na consultoria. Fiz as tentativas de liga\xE7\xE3o, mas n\xE3o obtive retorno.

Irei solicitar descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var ze=t=>new Promise(e=>setTimeout(e,t));function Ge(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var Vt="cw-automation-styles";if(!document.getElementById(Vt)){let t=document.createElement("style");t.id=Vt,t.innerHTML=`
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
    `,document.head.appendChild(t)}function Ut(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function Wt(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),o="";Ut(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(Ge(n),await ze(1200));let a=document.querySelector("search-filter dropdown-button .button");if(a&&!(a.innerText||"").includes("All")){Ge(a),await ze(600);let h=document.querySelector('material-checkbox[debug-id="check-all-box"]');h&&h.getAttribute("aria-checked")!=="true"&&(Ge(h),await ze(300));let b=document.querySelector('material-button[debug-id="apply-filter"]');b&&(Ge(b),await ze(1500))}let s=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");s&&(s.scrollTop=s.scrollHeight,await ze(500));let i=Array.from(document.querySelectorAll(".message-header"));for(let c=i.length-1;c>=0;c--){let h=i[c],b=h.querySelector("i.material-icons-extended"),m=b&&b.innerText.trim()==="phone_in_talk",g=h.innerText||"",y=g.includes("Agent joined")||g.includes("outbound-call")||g.includes("Speakeasy");if(m||y){h.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",h),e&&(e.placeholder="Lendo mensagem..."),Ge(h),await ze(1e3));break}}let p=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),l=/Speakeasy.*?(P\d{15,25})/i,d=null;for(let c=p.length-1;c>=0;c--){let h=p[c];if(h.offsetParent===null)continue;let b=(h.innerText||"").match(l);if(b&&b[1]){d=b[1];break}}if(e)if(d){try{await navigator.clipboard.writeText(d)}catch{}e.value=d,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),$.playSuccess(),K(`ID Localizado: ${d}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else $.playError(),K("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),K("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),Ut(!1)}}function Yt(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,n=this.selectionEnd,a=this.value,s=a.lastIndexOf(`
`,o-1)+1,i=a.substring(s,o);if(e.key==="Enter"){e.preventDefault();let r=i.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(i.trim()==="\u2022"){this.value=a.substring(0,s)+`
`+a.substring(n),this.selectionStart=this.selectionEnd=s+1;return}let p=`
`+r;this.value=a.substring(0,o)+p+a.substring(n),this.selectionStart=this.selectionEnd=o+p.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?i.startsWith("  ")&&(this.value=a.substring(0,s)+i.substring(2)+a.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=a.substring(0,s)+"  "+i+a.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===n&&o>0){let r=a.substring(0,o);r.endsWith("\u2022 ")?(e.preventDefault(),this.value=r.substring(0,o-2)+a.substring(n),this.selectionStart=this.selectionEnd=o-2):r.endsWith("  ")&&i.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=r.substring(0,o-2)+a.substring(n),this.selectionStart=this.selectionEnd=o-2)}}))}function ht(t,e,o){if(e.innerHTML="",!!Ae[t]&&(o.activeFields.forEach(a=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(a))return;let s=`field-${a}`,i=document.createElement("label"),r=c=>he[o.currentLang]?.[c]||he.pt?.[c]||c;i.textContent=r(a.toLowerCase())!==a.toLowerCase()?r(a.toLowerCase()):a.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase())+":",Object.assign(i.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:D.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let p=document.createElement("span");if(p.textContent=i.textContent,i.innerHTML="",i.appendChild(p),a==="SPEAKEASY_ID"){let c=document.createElement("button");c.innerHTML="\u2728 Auto Busca",c.style.cssText=`font-size: 11px; font-weight: 700; color: ${D.primary}; background-color: ${D.primaryBg}; border: none; border-radius: ${le.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${se};`,c.onmouseenter=()=>c.style.backgroundColor="#d2e3fc",c.onmouseleave=()=>c.style.backgroundColor=D.primaryBg,c.onclick=h=>{h.preventDefault(),Wt(s)},i.appendChild(c)}let l=document.createElement("button");l.innerHTML="\u2715",l.style.cssText=`font-size: 14px; background: ${D.bgInput}; border: none; color: ${D.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${se};`,l.onmouseenter=()=>{l.style.background=D.error,l.style.color=D.surface},l.onmouseleave=()=>{l.style.background=D.bgInput,l.style.color=D.textSub},l.onclick=async c=>{c.preventDefault(),await ge(`Tem certeza que deseja remover o campo "${p.textContent.replace(":","")}"?`)&&(o.removeField(a),ht(t,e,o))},i.appendChild(l);let d;Re.includes(a)?(d=document.createElement("textarea"),d.classList.add("bullet-textarea","cw-textarea"),d.placeholder="Utilize marcadores para detalhar...",Yt(d)):et.includes(a)?(d=document.createElement("textarea"),d.classList.add("cw-textarea"),d.placeholder="Descreva as considera\xE7\xF5es..."):(d=document.createElement("input"),d.type="text",d.classList.add("cw-input")),d.id=s,d.value=o.formData[s]||"",d.addEventListener("input",c=>o.updateField(s,c.target.value)),e.appendChild(i),e.appendChild(d)}),o.activeFields.includes("CONSENTIU_GRAVACAO"))){let a=r=>he[o.currentLang]?.[r]||he.pt?.[r]||r,s=document.createElement("label");s.textContent=a("consentiu_gravacao"),Object.assign(s.style,{display:"block",fontSize:"13px",fontWeight:"700",color:D.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let i=document.createElement("select");i.className="cw-select",i.innerHTML=`
            <option value="false">${a("nao")}</option>
            <option value="true">${a("sim")}</option>
        `,i.value=o.consent?"true":"false",i.onchange=()=>o.setConsent(i.value==="true"),e.appendChild(s),e.appendChild(i)}}function yt(t,e,o){let n=t.currentSubStatus;if(!n)return null;let a=Ae[n],s=he[t.currentLang]||he.pt,i=l=>s[l]||he.pt?.[l]||l,r='style="margin-bottom: 12px; padding-left: 30px;"',p="";if(t.activeFields.forEach(l=>{let d=i(l.toLowerCase()),c="N/A";if(l==="label_substatus")d=i("label_substatus"),c=a.name;else if(l==="TAGS_IMPLEMENTED"){d=i("tags_implemented");let h=[];e.getCheckedElements().forEach(m=>{let g=m.value,y=ye[g],w=m.count||1,R=g==="ads_conversion_tracking"||g==="ads_enhanced_conversions";t.tagSupportUsed&&R&&!t.forcedScreenshots.has(g)?h.push(`${y.name} - ${i("ts_output_disclaimer")}`):h.push(w>1?`${y.name} (x${w})`:y.name)}),c=h.join(", ")||"N/A"}else if(l==="SCREENSHOTS_LIST"){d=i("screenshots_list");let h="",b=e.screenshotsElement;b&&Array.from(b.querySelectorAll('input[id^="name-"]')).forEach(g=>{let y=g.value,w=g.closest(".cw-screen-card");if(w){let R=w.querySelectorAll('input[id^="screen-"]'),z=!1,j="";R.forEach(J=>{let L=J.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",k=J.value.trim();k&&(j+=`<li>${L} - ${k}</li>`,z=!0)}),z&&(h+=`<div style="margin-bottom: 8px;"><b>${y}</b><ul ${r}>${j}</ul></div>`)}}),c=h||"N/A"}else if(l==="CASO_PORTUGAL")d=i("caso_portugal"),c=i("sim");else if(l==="CONSENTIU_GRAVACAO")d=i("consentiu_gravacao"),c=t.consent?i("sim"):i("nao");else{let h=`field-${l}`,b=t.formData[h],m="";if(a.fieldPrefixes&&a.fieldPrefixes[l]&&(m=a.fieldPrefixes[l]+" "),b&&b.trim()!==""&&b.trim()!=="\u2022"){let g=b.trim();if(Re.includes(l)){let y=g.split(`
`).map(w=>w.trim()).filter(w=>w!==""&&w!=="\u2022").map(w=>w.startsWith("\u2022 ")?w.substring(2):w).map(w=>`<li>${w}</li>`).join("");c=y?`${m}<ul ${r}>${y}</ul>`:"N/A"}else et.includes(l)?c=m+g.split(`
`).filter(y=>y.trim()!=="").map(y=>`<p style="margin: 0 0 8px 0;">${y}</p>`).join(""):c=m+g}else m&&(c=m.trim())}p+=`<b>${d}</b><br>${c}<br><br>`}),a.customFooter&&(p+=`${a.customFooter}<br><br>`),o?.getOutput){let l=o.getOutput();l&&(p+=`${l}<br><br>`)}return p+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",p.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}function Xt(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o="Passe o mouse sobre um cen\xE1rio para visualizar o texto...",n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let a=document.createElement("div");Object.assign(a.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let s=document.createElement("span");s.style.transition="opacity 0.2s ease, transform 0.2s ease",s.textContent=o,a.appendChild(s);let i=new Set,r=null;return e.render=(p,l)=>{i.clear();let d=Object.entries(tt).filter(([c,h])=>{let b=!h.type||h.type==="all"||h.type===l,m=!1;return p.startsWith("NI_")?m=c.includes("-ni-")||c.includes("attempted"):p.startsWith("SO_")?m=c.includes("gtm")||c.includes("whatsapp")||c.includes("form")||c.includes("ecw4")||c.includes("ga4")||c.includes("-so-"):p.startsWith("AS_")?m=c.includes("-as-"):p.startsWith("IN_")?m=c.includes("-in-"):p.startsWith("DC_")&&(m=c.includes("-dc-")),b&&m});n.innerHTML="",d.forEach(([c,h])=>{let b=document.createElement("div"),m=c.replace("quickfill-","").replace(/-/g," ");b.textContent=m,b.dataset.id=c,Object.assign(b.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let g=h["field-REASON_COMMENTS"]||h["field-CONTEXTO_CALL"]||c;b.onmouseenter=()=>{r&&clearTimeout(r),i.has(c)||(b.style.background="#f1f3f4"),s.style.opacity="0",s.style.transform="translateY(5px)",r=setTimeout(()=>{s.textContent=g.substring(0,120)+(g.length>120?"...":""),s.style.opacity="1",s.style.transform="translateY(0)"},50)},b.onmouseleave=()=>{r&&clearTimeout(r),i.has(c)||(b.style.background="#ffffff"),r=setTimeout(()=>{i.size===0&&(s.style.opacity="0",setTimeout(()=>{s.textContent=o,s.style.opacity="1"},50))},100)},b.onclick=()=>{$.playClick();let y=!i.has(c);y?(i.add(c),b.style.background="#e8f0fe",b.style.borderColor="#1a73e8",b.style.color="#1967d2"):(i.delete(c),b.style.background="#ffffff",b.style.borderColor="#dadce0",b.style.color="#3c4043"),t(c,y)},n.appendChild(b)}),d.length===0?e.style.display="none":e.style.display="block"},e.appendChild(n),e.appendChild(a),e}var ne={bg:D.bgInput,white:D.surface,border:D.border,textMain:D.text,textSub:D.textSub,blue:D.blue,blueLight:D.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:D.blue,bg:D.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:D.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:D.primary,bg:D.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:D.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},qe={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Kt(t,e,o){let n={},a="implementation";o&&o.subscribe(()=>{J(),X()});function s(L){let k=L.toLowerCase();return k.includes("ads")||k.includes("conversion")||k.includes("remarketing")?ne.brands.ads:k.includes("ga4")||k.includes("analytics")?ne.brands.ga4:k.includes("gtm")||k.includes("tag manager")||k.includes("container")?ne.brands.gtm:k.includes("merchant")||k.includes("shopping")||k.includes("feed")?ne.brands.gmc:ne.brands.default}let i=Object.entries(ye).filter(([L,k])=>k.popular),r={};Object.entries(ye).forEach(([L,k])=>{if(k.popular)return;let B=s(k.name);r[B.label]||(r[B.label]={brand:B,tasks:[]}),r[B.label].tasks.push({key:L,...k})});let p="cw-zen-tasks";if(!document.getElementById(p)){let L=document.createElement("style");L.id=p,L.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${ne.font}; background: ${ne.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${ne.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${ne.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${ne.white}; 
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
                font-size: 12px; font-weight: 500; color: ${ne.textMain}; line-height: 1.2; 
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
                color: ${ne.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${ne.border}; border-radius: 10px; background: ${ne.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${ne.blue}; box-shadow: 0 0 0 3px ${ne.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${ne.border}; border-radius: 10px; background: ${ne.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${ne.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${ne.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${ne.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${ne.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${ne.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${ne.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${ne.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${ne.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${ne.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${ne.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${ne.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${ne.textMain}; }
            
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
                font-family: ${ne.font}; font-size: 15px; font-weight: 600; color: ${ne.textMain};
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
                border-color: ${ne.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${ne.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${ne.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${ne.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${ne.textSub};
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
        `,document.head.appendChild(L)}let l=document.createElement("div");l.className="cw-zen-container";let d=document.createElement("div");Object.assign(d.style,{display:"none"});let c=document.createElement("div");c.className="cw-screens-container",d.appendChild(c),l.innerHTML=`
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
    `;let h=l.querySelector(".cw-hero-grid"),b=l.querySelector(".cw-acc-container"),m=l.querySelector(".cw-results-container"),g=l.querySelector(".cw-search-input"),y=l.querySelector(".cw-status-bar"),w=l.querySelector(".cw-status-text"),R=l.querySelector(".cw-footer-icons");i.forEach(([L,k])=>{let B=s(k.name),G=document.createElement("div");G.className="cw-hero-card",G.id=`hero-${L}`,G.style.setProperty("--hero-color",B.color),G.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${qe[B.icon]}</div>
                <div class="cw-hero-label">${k.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,G.onclick=_=>{if(_.target.closest(".cw-step-btn"))return;let A=n[L]?n[L].count:0;j(L,A>0?-A:1,k)},G.querySelector(".minus").onclick=()=>j(L,-1,k),G.querySelector(".plus").onclick=()=>j(L,1,k),G.dataset.color=B.color,h.appendChild(G)});function z(L,k){let B=s(k.name),G=document.createElement("div");return G.className="cw-task-item",G.dataset.id=L,G.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${B.bg}; color:${B.color}">
                    ${qe[B.icon]||qe.default}
                </div>
                <div class="cw-task-label">${k.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,G.onclick=_=>{if(_.target.closest(".cw-step-btn"))return;let A=n[L]?n[L].count:0;j(L,A>0?-A:1,k)},G.querySelector(".minus").onclick=()=>j(L,-1,k),G.querySelector(".plus").onclick=()=>j(L,1,k),G}Object.entries(r).forEach(([L,k])=>{let B=document.createElement("div");B.className="cw-acc-group";let G=document.createElement("div");G.className="cw-acc-header",G.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${k.brand.color}"></div>
                ${L}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,G.onclick=()=>{b.querySelectorAll(".cw-acc-group.open").forEach(A=>{A!==B&&A.classList.remove("open")}),B.classList.toggle("open")};let _=document.createElement("div");_.className="cw-acc-body",k.tasks.forEach(A=>{let S=z(A.key,A);_.appendChild(S)}),B.appendChild(G),B.appendChild(_),b.appendChild(B)});function j(L,k,B){n[L]||(n[L]={count:0,data:B,brand:s(B.name)}),n[L].count+=k,n[L].count<=0&&delete n[L],J(),X(),t&&t()}function J(){let L=o.tagSupportUsed;i.forEach(([A])=>{let S=h.querySelector(`#hero-${A}`);if(!S)return;let I=n[A];I?(S.classList.add("active"),S.querySelector(".cw-step-val").textContent=I.count,S.querySelector(".cw-step-val").style.color=S.dataset.color,L&&(A==="ads_conversion_tracking"||A==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(A)?S.classList.add("ts-success"):S.classList.remove("ts-success")):(S.classList.remove("active"),S.classList.remove("ts-success"))}),l.querySelectorAll(".cw-task-item").forEach(A=>{let S=A.dataset.id,I=n[S];I?(A.classList.add("selected"),A.querySelector(".cw-step-val").textContent=I.count,L&&(S==="ads_conversion_tracking"||S==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(S)?A.classList.add("ts-success"):A.classList.remove("ts-success")):(A.classList.remove("selected"),A.classList.remove("ts-success"))});let B=Object.keys(n),G=0,_=[];if(B.forEach(A=>{let S=n[A];G+=S.count;for(let I=0;I<S.count;I++)_.length<6&&_.push(S.brand)}),G>0){y.classList.add("visible");let A=G>1?"A\xE7\xF5es":"A\xE7\xE3o",S=G>1?"definidas":"definida";w.textContent=`${G} ${A} ${S}`,R.innerHTML="",_.forEach(I=>{let f=document.createElement("div");f.className="cw-mini-icon",f.innerHTML=qe[I.icon]||qe.default;let C=f.querySelector("svg");C&&(C.style.width="14px",C.style.height="14px"),R.appendChild(f)})}else y.classList.remove("visible")}g.addEventListener("input",L=>{let k=L.target.value.toLowerCase();if(k.length>0){b.style.display="none",m.style.display="block",m.innerHTML="";let B=!1;Object.entries(ye).forEach(([G,_])=>{if(_.name.toLowerCase().includes(k)){B=!0;let A=z(G,_);n[G]&&(A.classList.add("selected"),A.querySelector(".cw-step-val").textContent=n[G].count),m.appendChild(A)}}),B||(m.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else b.style.display="block",m.style.display="none"});function X(){c.innerHTML="";let L=Object.keys(n),k=!1;if(L.length===0){c.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,d.style.display="none";return}let B=o.tagSupportUsed,G=document.createElement("div");G.className="cw-info-banner",G.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,c.appendChild(G),L.forEach(_=>{let A=n[_].data,S=n[_].count,I=n[_].brand,C=B&&(_==="ads_conversion_tracking"||_==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(_),O=o.screenshotMode||"implementation",F=A.screenshots?.[O]||[];if(F.length>0||C){k=!0;for(let v=1;v<=S;v++){let E=document.createElement("div");E.className="cw-screen-card",C&&E.classList.add("ts-success"),E.style.setProperty("--brand-color",I.color),E.style.setProperty("--brand-bg",I.bg),E.style.setProperty("--brand-shadow",I.color+"40");let M=document.createElement("div");M.className="cw-card-header";let x=document.createElement("div");x.className="cw-card-icon",x.innerHTML=qe[I.icon]||qe.default;let q=document.createElement("div");q.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let W=document.createElement("input");W.className="cw-card-title-input",W.id=`name-${_}-${v}`,W.value=`${A.name}${S>1?" #"+v:""}`,W.title="Clique para renomear esta task";let V=document.createElement("span");if(V.className="cw-edit-hint",V.innerHTML="\u270E Renomear",q.appendChild(W),q.appendChild(V),M.appendChild(x),M.appendChild(q),E.appendChild(M),C){let u=document.createElement("div");u.className="cw-ts-disclaimer-box",u.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,u.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(_,!0)},E.appendChild(u)}else F.forEach((u,N)=>{let T=document.createElement("div");T.className="cw-input-group";let Y=document.createElement("label");Y.className="cw-input-label",Y.textContent=u;let H=document.createElement("input");H.className="cw-input-field",H.id=`screen-${_}-${v}-${N}`,H.placeholder="Cole o link aqui...",H.setAttribute("autocomplete","off"),H.addEventListener("input",()=>{H.value.trim().length>5?H.classList.add("filled"):H.classList.remove("filled")});let Q=document.createElement("div");Q.className="cw-input-check",Q.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',T.appendChild(Y),T.appendChild(H),T.appendChild(Q),E.appendChild(T)});c.appendChild(E)}}}),d.style.display=k?"block":"none"}return{selectionElement:l,screenshotsElement:d,updateSubStatus:()=>X(),getCheckedElements:()=>Object.keys(n).map(L=>({value:L,count:n[L].count})),setTaskCount:(L,k)=>{n[L]&&delete n[L],k>0&&ye[L]&&j(L,k,ye[L])},toggleTask:(L,k=!0)=>{let B=n[L];k&&!B?j(L,1,ye[L]):!k&&B&&j(L,-B.count,ye[L])},setLanguage:L=>{e=L;let k=l.querySelector(".js-hero-title");k&&(k.textContent=e("acesso_rapido"));let B=l.querySelector(".cw-search-input");B&&(B.placeholder=e("buscar_catalogo")),X()},reset:()=>{for(let L in n)delete n[L];g.value="",b.style.display="block",m.style.display="none",J(),X()}}}var zo={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},Bo={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},Po={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},jo={display:"flex",gap:"20px",marginBottom:"12px"};function Jt(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,zo);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,ft,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,jo);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="Sim",Object.assign(a.style,xt);let s=document.createElement("label");s.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(a),i.appendChild(s);let r=document.createElement("input");r.type="radio",r.name="ts_usage_mod",r.value="N\xE3o",r.checked=!0,Object.assign(r.style,xt);let p=document.createElement("label");p.textContent="N\xE3o";let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center"}),l.appendChild(r),l.appendChild(p),n.appendChild(i),n.appendChild(l);let d=document.createElement("div");d.style.display="block";let c=document.createElement("label");c.className="js-ts-reason-label",c.textContent=t("motivo_ts"),Object.assign(c.style,ft,{fontSize:"12px"});let h=document.createElement("input");h.type="text",Object.assign(h.style,Po);let b=document.createElement("div");b.className="js-ts-warning",b.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(b.style,Bo),d.appendChild(c),d.appendChild(h),d.appendChild(b),e.appendChild(o),e.appendChild(n),e.appendChild(d),a.onchange=()=>{d.style.display="none",Promise.resolve().then(()=>(He(),Qe)).then(R=>R.notesState.setTagSupportUsed(!0))},r.onchange=()=>{d.style.display="block",Promise.resolve().then(()=>(He(),Qe)).then(R=>R.notesState.setTagSupportUsed(!1))};function m(R,z){if(e.style.display="none",!R||!z||z.length===0)return;z.some(J=>J==="ads_conversion_tracking"||J==="ads_enhanced_conversions")?e.style.display="block":(w(),Promise.resolve().then(()=>(He(),Qe)).then(J=>J.notesState.setTagSupportUsed(!1)))}function g(){if(e.style.display==="none")return"";let R=`<br><b>Utilizou Tag Support?</b> ${a.checked?"\u2705 Sim":"\u274C N\xE3o"}`;return r.checked&&h.value.trim()!==""&&(R+=`<br><b>Motivo:</b> ${h.value}`),R+="<br>",R}function y(R){t=R,o.textContent=t("utilizou_tag_support"),c.textContent=t("motivo_ts"),b.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function w(){e.style.display="none",r.checked=!0,a.checked=!1,d.style.display="block",h.value=""}return{element:e,updateVisibility:m,getOutput:g,setLanguage:y,reset:w}}var vt="cw_notes_parking_lot",ot="cw_notes_emergency_save";var fe={getAll:()=>{try{return JSON.parse(localStorage.getItem(vt)||"[]")}catch{return[]}},save:t=>{let e=fe.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(vt,JSON.stringify(e)),o},delete:t=>{let e=fe.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(vt,JSON.stringify(e)),e},getCount:()=>fe.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(ot,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(ot);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(ot),null):e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(ot)}};var Ho="https://script.google.com/a/macros/google.com/s/AKfycbzjrhTCoLg0SZq3TB5oD2uyWw3t6-wbjHHPXOKurgwxZcKDFcHV2eVZZa7bLPRLFRa8hg/exec",wt="cw_data_broadcast",Zt="cw_data_tips",Go=["Processando...","Mantenha o foco!","Aguarde..."];function $e(t,e={}){return new Promise((o,n)=>{let a="cw_cb_"+Math.round(1e5*Math.random()),s=document.createElement("script");window[a]=p=>{document.body.contains(s)&&document.body.removeChild(s),delete window[a],o(p)};let i=Object.keys(e).map(p=>encodeURIComponent(p)+"="+encodeURIComponent(e[p])).join("&"),r=`${Ho}?op=${t}&callback=${a}&t=${Date.now()}&${i}`;s.src=r,s.onerror=()=>{document.body.contains(s)&&document.body.removeChild(s),delete window[a],n(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(s)})}var re={fetchTips:async()=>{try{let t=await $e("tips");t?.tips&&localStorage.setItem(Zt,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await $e("broadcast");if(t?.broadcast)return localStorage.setItem(wt,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(wt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(wt)||"[]"),getRandomTip:()=>{let t=Go,e=localStorage.getItem(Zt);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await re._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await re._performOp("update_broadcast",o)},deleteBroadcast:async t=>await re._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`\u{1F4E4} Executando ${t}...`,e);let o=await $e(t,e);return o&&o.status==="success"?(console.log("\u2705 Sucesso:",t),!0):(console.warn("\u26A0\uFE0F Falha:",o),!1)}catch(o){return console.error("\u274C Erro JSONP:",o),!1}},logEvent:(t,e,o="",n=null)=>{try{let a="anon";try{let i=ve();i&&(a=i.split("@")[0].toLowerCase())}catch{}let s={timestamp:new Date().toISOString(),user:a,version:"v5.1",category:t,action:e,label:o,value:n||""};$e("log",s).catch(i=>{})}catch(a){console.warn("Analytics error",a)}},logUsage:()=>{},getUserSnippets:async t=>{try{return await $e("get_user_snippets",{user:t})}catch(e){return console.warn("Erro ao buscar snippets:",e),null}},saveSnippet:async(t,e)=>{let o={...t,user:e};return await re._performOp("save_snippet",o)},deleteSnippet:async(t,e)=>await re._performOp("delete_snippet",{id:t,user:e})};var nt=["lucaste","ricardogi"];var ie={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},at=t=>new Promise(e=>setTimeout(e,t));function it(t){let e=document.getElementById("cw-btn-notes");if(!e)return;let o=e.querySelector(".cw-dot-dirty");t?o||(o=document.createElement("div"),o.className="cw-dot-dirty",e.appendChild(o)):o&&o.remove()}function Qt(t){let e="cw-command-center-style";if(!document.getElementById(e)){let g=document.createElement("style");g.id=e,g.innerHTML=`
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
                
                background: ${ie.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${ie.glassBorder}; border-radius: 50px;
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
                cursor: pointer; position: relative; color: ${ie.iconIdle};
                flex-shrink: 0;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn:hover {
                background: ${ie.glassHighlight};
                color: ${ie.iconActive};
                transform: scale(1.18) translateY(-2px) !important;
            }

            .cw-btn.notes.active { color: ${ie.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${ie.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${ie.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${ie.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${ie.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${ie.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${ie.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${ie.gray} !important; background: rgba(154, 160, 166, 0.15); }

            .cw-btn.notes:hover { color: ${ie.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${ie.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${ie.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${ie.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${ie.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${ie.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${ie.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${ie.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${ie.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${ie.blue}; width: 16px; opacity: 1; }

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
            .cw-center-dots span:nth-child(1) { background-color: ${ie.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${ie.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${ie.green}; }
            
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

            .cw-admin-badge {
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%) scale(0);
                background: linear-gradient(135deg, #1a73e8, #4285f4);
                color: white;
                font-size: 8px;
                font-weight: 800;
                padding: 2px 6px;
                border-radius: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                border: 1px solid rgba(255,255,255,0.2);
                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
                z-index: 20;
                white-space: nowrap;
            }
            .cw-pill:not(.collapsed) .cw-admin-badge.visible {
                transform: translateX(-50%) scale(1);
            }
            
            .cw-center-success { display: none; color: ${ie.green}; margin-bottom: 10px; }
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
        `,document.head.appendChild(g)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>'},n=document.createElement("div");n.className="cw-pill side-right collapsed",n.innerHTML=`
        <div class="cw-main-logo">${o.main}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${o.notes}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Email Assistant">${o.email}</button>
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
    `;let a=document.createElement("div");a.className="cw-focus-backdrop",document.body.appendChild(a),document.body.appendChild(n);let s=(g,y)=>{$.playClick(),n.querySelector(`.${g}`).classList.toggle("active"),y()};if(n.querySelector(".notes").onclick=g=>{g.stopPropagation(),s("notes",t.toggleNotes)},n.querySelector(".email").onclick=g=>{g.stopPropagation(),s("email",t.toggleEmail)},n.querySelector(".script").onclick=g=>{g.stopPropagation(),s("script",t.toggleScript)},n.querySelector(".links").onclick=g=>{g.stopPropagation(),s("links",t.toggleLinks)},n.querySelector(".library").onclick=g=>{g.stopPropagation(),s("library",t.toggleLibrary)},n.querySelector(".timezone").onclick=g=>{g.stopPropagation(),s("timezone",t.toggleTimezone)},n.querySelector(".configs").onclick=g=>{g.stopPropagation(),s("configs",t.toggleConfigs)},n.querySelector(".broadcast").onclick=g=>{g.stopPropagation(),s("broadcast",()=>{let y=g.currentTarget.querySelector(".cw-badge");y&&y.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},n.querySelectorAll(".cw-btn").forEach(g=>{g.addEventListener("mouseenter",()=>$.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let g=document.createElement("div");g.className="cw-badge",n.querySelector(".broadcast").appendChild(g)}let i=null;n.onmouseleave=()=>{n.querySelector(".cw-btn.active")||n.classList.contains("processing-center")||(i=setTimeout(()=>{n.classList.add("collapsed")},3e3))},n.onmouseenter=()=>{i&&clearTimeout(i)},(async function(){let y=()=>{let R=ve();if(R){let z=R.split("@")[0].toLowerCase();if(nt.includes(z)){let j=n.querySelector("#cw-admin-tag");j&&j.classList.add("visible")}}else setTimeout(y,2e3)};y(),await at(2800),n.classList.add("docked"),await at(300);let w=n.querySelectorAll(".cw-btn");n.querySelectorAll(".cw-sep").forEach(R=>R.classList.add("visible"));for(let R=0;R<w.length;R++)w[R].classList.add("popped"),await at(90);await at(200),n.classList.add("system-check")})();let r=!1,p,l,d,c,h=3;n.onmousedown=g=>{if(g.target.closest("button"))return;g.preventDefault(),p=g.clientX,l=g.clientY;let y=n.getBoundingClientRect();d=y.left,c=y.top,document.addEventListener("mousemove",b),document.addEventListener("mouseup",m)};function b(g){let y=g.clientX-p,w=g.clientY-l;!r&&Math.sqrt(y*y+w*w)>h&&(r=!0,n.classList.add("dragging"),n.style.transition="none",i&&clearTimeout(i)),r&&(n.style.left=`${d+y}px`,n.style.top=`${c+w}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function m(g){if(document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",m),r){r=!1,n.classList.remove("dragging");let y=window.innerWidth,w=window.innerHeight,R=n.getBoundingClientRect(),z=R.left+R.width/2,j;z<y/2?(j=24,n.classList.remove("side-right"),n.classList.add("side-left")):(j=y-R.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let J=Math.max(24,Math.min(R.top,w-R.height-24));setTimeout(()=>{n.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),n.style.left=`${j}px`,n.style.top=`${J}px`,n.style.bottom="auto",n.style.transform=""},10),setTimeout(()=>{n.style.transition="",n.style.removeProperty("transition")},700)}else{let y=n.querySelector(".cw-btn.active"),w=g.target.closest("button");if(n.classList.contains("collapsed")){let R=n.getBoundingClientRect(),z=window.innerHeight,j=R.top>z/2;if(n.style.setProperty("transition","none","important"),j){let J=z-R.bottom;n.style.top="auto",n.style.bottom=`${J}px`}else n.style.bottom="auto",n.style.top=`${R.top}px`;n.offsetWidth,n.style.removeProperty("transition"),n.classList.remove("collapsed"),$.playGenieOpen()}else!y&&!w&&(n.classList.add("collapsed"),$.playGenieOpen());w&&(w.style.transform="scale(0.9)",setTimeout(()=>w.style.transform="",150))}}}function Ve(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${re.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=s=>{s.stopPropagation(),window._CW_ABORT_PROCESS=!0,K("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(n),t.appendChild(o);let a=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let i=Date.now()-a,r=Math.max(0,2e3-i);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let p=o.querySelector(".cw-center-dots"),l=o.querySelector(".cw-center-text"),d=o.querySelector(".cw-center-success"),c=o.querySelector(".cw-abort-btn");p&&(p.style.display="none"),l&&(l.style.display="none"),c&&(c.style.display="none"),d&&d.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},r)}}function eo(t){let{onSaveCurrent:e,onLoadDraft:o,t:n}=t,a=document.createElement("button");a.className="js-btn-park",a.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${n("guardar")}</span>
    `,a.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${le.pill};
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
        transition: all 0.2s ${se};
        box-shadow: ${Le.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,a.onmouseenter=()=>{a.style.backgroundColor="#F8F9FA",a.style.borderColor="#202124",a.style.color="#202124",a.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",a.style.transform="translateY(-1px)"},a.onmouseleave=()=>{a.style.backgroundColor="#FFFFFF",a.style.borderColor="#DADCE0",a.style.color="#5F6368",a.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",a.style.transform="translateY(0)"},a.onmousedown=()=>a.style.transform="scale(0.96)",a.onmouseup=()=>a.style.transform="scale(1) translateY(-1px)",a.onclick=async()=>{if(await ge("Deseja guardar o rascunho atual e limpar os campos?"))try{let g=await e();g?(fe.save(g),b(),r(),$.playSuccess(),K("Rascunho salvo com sucesso!")):K("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(g){console.error("Erro ao salvar rascunho:",g),K("Erro ao salvar.",{error:!0})}};let s=document.createElement("div");s.title="Meus Rascunhos",s.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",s.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let i=document.createElement("div");i.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",s.appendChild(i),s.onmouseenter=()=>s.style.background="rgba(0,0,0,0.05)",s.onmouseleave=()=>s.style.background="transparent",s.onclick=m=>{m.stopPropagation(),h()};function r(){let m=fe.getCount();it(m>0),m>0?(i.style.display="block",i.textContent=m,i.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):i.style.display="none"}let p=document.createElement("div");p.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${D.surface}; z-index: 100;
        border-radius: ${le.large} ${le.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${se};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let l=document.createElement("div");l.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",l.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${n("rascunhos_salvos")}</span>`;let d=document.createElement("button");d.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',d.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",d.onmouseenter=()=>d.style.background="#F1F3F4",d.onmouseleave=()=>d.style.background="transparent",d.onclick=()=>h(!1),l.appendChild(d);let c=document.createElement("div");c.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",p.appendChild(l),p.appendChild(c);function h(m){let g=p.style.transform==="translateY(0%)";(m!==void 0?m:!g)?(b(),p.style.transform="translateY(0%)"):p.style.transform="translateY(110%)"}function b(){let m=fe.getAll();if(c.innerHTML="",m.length===0){c.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${D.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${n("nenhum_rascunho")}</div>
                </div>`;return}m.forEach(g=>{let y=document.createElement("div");y.style.cssText=`
                background: ${D.surface}; padding: 20px; border-radius: ${le.large};
                border: 1.5px solid ${D.bgInput}; box-shadow: ${Le.subtle};
                position: relative; transition: all 0.3s ${se};
            `;let R=new Date(g.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),z="";g.summaryTags&&g.summaryTags.length>0&&(z=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${g.summaryTags.slice(0,3).join(", ")+(g.summaryTags.length>3?"...":"")}</div>`),y.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${g.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${R}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${g.cid||"---"}</span>
                    <span style="display:block; color:${g.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${g.subStatus||g.status||"Sem Status"}</span>
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
            `;let j=y.querySelector(".cw-resume-btn");j.onclick=async()=>{await ge("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(g),fe.delete(g.id),b(),r(),h(!1),$.playSwoosh(),K("Rascunho carregado."))};let J=y.querySelector(".cw-del-btn");J.onclick=async()=>{await ge("Excluir este rascunho?",{danger:!0})&&(fe.delete(g.id),b(),r())},c.appendChild(y)})}return r(),{parkButton:a,historyBtnWrapper:s,drawer:p}}var to=t=>new Promise(e=>setTimeout(e,t));function st(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function Ue(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let n=window.getSelection();n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")}catch{K("Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(e)}function rt(t){["input","change","keydown","keyup"].forEach(o=>{let n=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(n)})}function oo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function lt(){console.log("Iniciando processo de Nova Nota...");let t=oo(),e=t.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(i=>i.innerText.trim()==="description");if(n){let i=n.closest("material-fab")||n.closest("material-button");i?(i.style&&(i.style.display="block",i.style.visibility="visible"),st(i)):st(n)}else{let i=document.querySelector("material-fab-speed-dial");if(i){let r=i.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),st(r)):i.click(),await to(800);let l=Array.from(document.querySelectorAll("i.material-icons-extended")).find(d=>d.innerText.trim()==="description");l&&st(l)}}let a=null,s=0;for(;!a&&s<20;){await to(300);let i=oo();if(i.length>e)a=i.find(r=>!t.includes(r)),a||(a=i[i.length-1]);else if(s>10){let r=i.filter(p=>p.offsetParent!==null);r.length>0&&(a=r[r.length-1])}s++}return a}function no(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let n=document.createElement("div");n.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(n),e.appendChild(o),o.addEventListener("scroll",()=>{n.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let a={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},s={};function i({id:z,label:j,type:J="text",placeholder:X="",required:L=!1,parent:k=o}){let B=document.createElement("div");B.style.cssText=a.inputWrapper;let G=document.createElement("label");G.style.cssText=a.label,G.innerHTML=`${j} ${L?'<span style="color:#D93025">*</span>':""}`;let _;return J==="textarea"?(_=document.createElement("textarea"),_.style.cssText=a.input+a.textarea):(_=document.createElement("input"),_.type=J,_.style.cssText=a.input),_.id=z,_.placeholder=X,_.addEventListener("focus",()=>{_.style.borderColor="#1a73e8",_.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),_.addEventListener("blur",()=>{_.style.borderColor="#DADCE0",_.style.boxShadow="none",L&&_.value.trim()!==""&&(_.style.backgroundColor="#FFF")}),s[z]={input:_,wrapper:B,required:L},B.appendChild(G),B.appendChild(_),k.appendChild(B),B}function r({id:z,label:j,options:J=["Yes","No"],defaultValue:X="No",onChange:L=null}){let k=document.createElement("div");k.style.cssText=a.inputWrapper;let B=document.createElement("label");B.style.cssText=a.label,B.textContent=j,k.appendChild(B);let G=document.createElement("div");G.style.cssText=a.radioGroup;let _=document.createElement("input");return _.type="hidden",_.id=z,_.value=X,k.appendChild(_),J.forEach(A=>{let S=document.createElement("div");S.textContent=A,S.style.cssText=a.radioLabel,A===X&&(S.style.cssText+=a.radioActive),S.onclick=()=>{Array.from(G.children).forEach(f=>f.style.cssText=a.radioLabel),S.style.cssText+=a.radioActive,_.value=A,L&&L(A)},G.appendChild(S)}),s[z]={input:_,wrapper:k,required:!1},k.appendChild(G),o.appendChild(k),k}let p=document.createElement("div");p.style.cssText=a.banner,p.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(p);let l=document.createElement("div");l.style.marginBottom="24px";let d=document.createElement("button");d.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",d.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",d.onmouseover=()=>d.style.background="#E1EFFF",d.onmouseout=()=>d.style.background="#F0F7FF",l.appendChild(d),o.appendChild(l);let c=document.createElement("div");c.style.cssText=a.section,c.innerHTML=`<div style="${a.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(c),i({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:c}),i({id:"ga4",label:"GA4 Property ID",parent:c}),i({id:"gtm",label:"GTM Container ID",parent:c});let h=document.createElement("div");h.style.cssText=a.hiddenField,c.appendChild(h),r({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:z=>{z==="Yes"?h.style.cssText=a.visibleField+"margin-bottom:14px;":(h.style.cssText=a.hiddenField,s.accessEmail.input.value="")}}),i({id:"accessEmail",label:"User Access Email",parent:h}),r({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let b=document.createElement("div");b.style.cssText=a.section,b.innerHTML=`<div style="${a.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(b),i({id:"name",label:"Advertiser Name",required:!0,parent:b}),i({id:"url",label:"Website URL",parent:b}),i({id:"phone",label:"Phone Number",parent:b}),i({id:"email",label:"Contact Email",parent:b}),i({id:"callback",label:"Preferred Callback Time (Timezone)",parent:b}),i({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:b}),i({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:b}),i({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:b});let m=document.createElement("div");m.style.cssText=a.section,m.innerHTML=`<div style="${a.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(m),i({id:"cc_adv",label:"Advertiser Contact",parent:m}),i({id:"cc_am",label:"Account Manager",parent:m});let g=document.createElement("div");g.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let y=document.createElement("button");y.innerHTML="Voltar",y.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",y.onclick=t;let w=document.createElement("button");w.textContent="Gerar Nota",w.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",g.appendChild(y),g.appendChild(w),e.appendChild(g),d.onclick=async()=>{let z=d.innerHTML;d.innerHTML="\u23F3 Buscando dados...";try{let j=await we(),J=0,X=(B,G)=>{let _=s[B];G&&_&&_.input.value===""&&(_.input.value=G,_.input.style.backgroundColor="#E6F4EA",_.input.style.borderColor="#34A853",setTimeout(()=>{_.input.style.backgroundColor="#FFF",_.input.style.borderColor="#DADCE0"},1e3),J++)};X("name",j.advertiserName),X("url",j.websiteUrl),j.clientEmail&&(X("email",j.clientEmail),X("cc_adv",j.clientEmail));let k=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);k&&X("cid",k[0]),J>0?K(`${J} campos preenchidos!`):K("Nenhum dado novo encontrado.")}catch(j){console.error(j),K("Erro ao ler p\xE1gina.")}finally{d.innerHTML=z}};let R=()=>{let z=!0,j=null;return Object.values(s).forEach(J=>{J.required&&!J.input.value.trim()&&(z=!1,J.input.style.cssText+=a.inputError,J.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),j||(j=J.input))}),j&&j.scrollIntoView({behavior:"smooth",block:"center"}),z};return w.onclick=async()=>{if(!R()){K("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let z=B=>s[B].input.value||"N/A",j=z("hasAccess"),J=j==="Yes"?z("accessEmail"):"N/A",L=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${z("cid")}
<b>GA4 ID:</b> ${z("ga4")}
<b>GTM ID:</b> ${z("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${j==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${J}
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
`.replace(/\n/g,"<br>");Ue(L);let k=await lt();k?(k.innerText.trim()===""&&(k.innerHTML=""),document.execCommand("insertHTML",!1,L),rt(k),K("Nota gerada e inserida!")):K("Copiado! Abra uma nota para colar.")},e}var pe=t=>new Promise(e=>setTimeout(e,t));function xe(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function Ee(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function ct(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,n=document.getElementById(o);n&&n.remove();let a=t.getBoundingClientRect(),s=document.createElement("div");s.id=o,s.style.cssText=`
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
    `,s.innerHTML=`
        <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:#F9AB00; font-size:16px; margin-top:1px;">\u26A0\uFE0F</span>
            <span style="line-height:1.4;">${e}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let i=s.querySelector(".cw-close-btn");i.onclick=()=>{s.style.opacity="0",s.style.transform="translateY(-5px)",setTimeout(()=>s.remove(),300)},document.body.appendChild(s),requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(s)&&i.click()},25e3)}async function dt(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await pe(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await pe(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function St(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let n=o.offsetParent!==null,a=o.closest("case-message-view")!==null,s=o.closest(".editor")!==null||o.closest("write-card")!==null;return n&&!a&&s});return e&&xe("Editor visualmente detectado.","success"),e}async function ao(){xe("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="email");if(o&&o.offsetParent!==null){xe("Bot\xE3o de email direto encontrado.");let c=o.closest("material-button")||o.closest("material-fab")||o;Ee(c),t=!0}else{xe("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let c=document.querySelector("material-fab-speed-dial");if(c){let h=c.querySelector(".trigger");if(h){Ee(h),await pe(800);let m=Array.from(document.querySelectorAll("i.material-icons-extended")).find(g=>g.innerText.trim()==="email");m&&(Ee(m),t=!0)}}}if(!t)return K("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;xe("\u{1F680} FASE 2: Verificando rascunhos...");let n=null,a=0,s=20;for(;a<s;){await pe(250);let c=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(n=Array.from(c).find(h=>h.offsetParent!==null),n){xe("\u26A0\uFE0F Rascunho detectado!","warn");break}a++}if(n){xe("\u{1F5D1}\uFE0F Descartando..."),Ee(n),n.click();let c=null,h=0;for(;h<15;){await pe(300);let b=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(c=Array.from(b).find(m=>m.offsetParent!==null),c)break;h++}c&&(Ee(c),K("Limpando rascunho antigo...",{duration:2e3}),await pe(2500))}xe("\u{1F680} FASE 3: Buscando editor final...");let i=0,r=null;for(;i<20&&(r=St(),!r);)await pe(250),i++;if(!r)return K("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let p=r.closest('[id="email-body-content-top"]'),d=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(p){if(d){let h=d.closest('[aria-hidden="true"]');h&&h.removeAttribute("aria-hidden"),d.focus(),Ee(d)}await pe(300),p.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let c=p.querySelector("#cases-body-field");if(c){let h=document.createRange();h.selectNodeContents(c),h.collapse(!0);let b=window.getSelection();b.removeAllRanges(),b.addRange(h)}return!0}return!1}async function pt(t){if(!t||!await ao())return;let o=await we();xe("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await pe(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await dt(s,o.clientEmail),ct(s,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await dt(s,o.internalEmail),ct(s,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await pe(500);let a=document.querySelector('material-button[debug-id="canned_response_button"]');if(a){Ee(a),await pe(1e3);let s=document.querySelector("material-auto-suggest-input input");if(s){Ee(s),document.execCommand("insertText",!1,t),s.dispatchEvent(new Event("input",{bubbles:!0})),xe("\u23F3 Buscando resultado da Canned Response...","info");let i=null,r=0,p=15e3,l=500;for(;r<p&&(i=document.querySelector("material-select-dropdown-item"),!i);)await pe(l),r+=l;if(i){Ee(i),await pe(1500);let d=St();if(d){let h=Array.from(d.querySelectorAll("span.field")).filter(m=>m.innerText.includes("{Requested Task Type}"));if(h.length>0){let m=h.map(y=>y.closest("tr")).filter(y=>y!==null),g=[...new Set(m)];if(g.length>0){let w=g[0].querySelector('td[width="100%"]');w&&(w.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let R=1;R<g.length;R++)g[R].remove()}}let b=d.innerHTML;o.advertiserName&&b.includes("{%ADVERTISER_NAME%}")&&(b=b.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),b.includes("{%^79285%}")&&(b=b.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),d.innerHTML=b}K("Canned Response aplicada!")}else xe(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),K(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else K("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function io(t){if(xe(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await ao())return;let o=await we(),n=Pe();await pe(600);let a=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(a&&(a.click(),await pe(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await dt(r,o.clientEmail),ct(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await dt(r,o.internalEmail),ct(r,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let s=document.querySelector('input[aria-label="Subject"]');s&&t.subject&&(s.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(s,t.subject),s.dispatchEvent(new Event("input",{bubbles:!0})),await pe(300));let i=St();if(i){let p=(i.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');p&&(p.focus(),Ee(p));let l=new Date;l.setDate(l.getDate()+3);let d=l.getDay();d===6?l.setDate(l.getDate()+2):d===0&&l.setDate(l.getDate()+1);let c=l.toLocaleDateString("pt-BR"),h=t.body;h=h.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),h=h.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),h=h.replace(/\[URL\]/g,o.websiteUrl||"seu site"),h=h.replace(/\[Seu Nome\]/g,n),h=h.replace(/\[MM\/DD\/YYYY\]/g,c),document.execCommand("insertHTML",!1,h),p&&(p.dispatchEvent(new Event("input",{bubbles:!0})),p.dispatchEvent(new Event("change",{bubbles:!0}))),K("Email preenchido com sucesso!",{duration:2e3}),xe("\u2705 Processo finalizado com sucesso.","success")}else K("Erro ao focar no editor.",{error:!0})}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function ue(t,e,o){let n=document.getElementById(o);if(!e)return;let a=e.getAttribute("data-moved")==="true",s={x:0,y:0};if(n){let d=n.getBoundingClientRect();s.x=d.left+d.width/2,s.y=d.top+d.height/2}let i,r;if(!a)i=window.innerWidth/2,r=window.innerHeight/2;else{let d=e.getBoundingClientRect();i=d.left+d.width/2,r=d.top+d.height/2,i===0&&r===0&&(i=window.innerWidth/2,r=window.innerHeight/2)}let p=s.x-i,l=s.y-r;t?($.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",a?e.style.transform=`translate(${p}px, ${l}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${l}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),n&&n.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",a?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof so=="function"&&so(e,o)):($.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",a?e.style.transform=`translate(${p}px, ${l}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${l}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),n&&n.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof Ct=="function"&&Ct(e))}function so(t,e){Ct(t);let o=n=>{if(!t.classList.contains("open"))return;let a=t.contains(n.target),s=document.querySelector(".cw-pill"),i=s&&s.contains(n.target);a?(t.classList.remove("idle"),t.style.zIndex="2147483648"):i||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function Ct(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function ro(){let t="v4.0.0",{popup:e,content:o,header:n,animRefs:a,credit:s}=$t(t,X),i=Jt(x),r=Kt(()=>{A(),P.setActiveTasks(r.getCheckedElements())},x,P),p=document.createElement("div");p.style.display="none";let l=Xt((u,N)=>{S(u,N)});p.appendChild(l);let d=eo({onSaveCurrent:async()=>{let u=await v();return F(),u},onLoadDraft:u=>{M(u)},t:u=>x(u)}),c=k(),h=B(),b=document.createElement("div"),m=W(),g=I(d,x);o.appendChild(c),o.appendChild(h),o.appendChild(m),o.appendChild(p),o.appendChild(b),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none";let y=document.createElement("button");y.id="manual-task-toggle",y.textContent=x("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",y.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${D.primary}; background: ${D.surface}; color: ${D.primary}; border-radius: ${le.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${se}; text-transform: uppercase; letter-spacing: 0.5px;`,y.onmouseenter=()=>{y.style.background=D.primaryBg},y.onmouseleave=()=>{y.style.background=D.surface},y.onclick=()=>{r.selectionElement.style.display="block",r.screenshotsElement.style.display="block",y.style.display="none"},o.appendChild(y),o.appendChild(r.selectionElement),o.appendChild(i.element),o.appendChild(r.screenshotsElement),o.appendChild(g);let w=document.createElement("div");w.style.display="none",w.style.flexGrow="1",w.style.minHeight="0",w.style.overflow="hidden";let R=no(()=>L());R.style.height="100%",w.appendChild(R),e.insertBefore(w,s);let z=n.lastElementChild;z&&(z.insertBefore(d.historyBtnWrapper,z.firstChild),z.insertBefore(q(),z.firstChild)),e.appendChild(d.drawer);let j=null;P.subscribe(u=>{V(u),J(),u.isDirty&&(j&&clearTimeout(j),j=setTimeout(async()=>{let N=await v(!0);fe.saveEmergency(N),u.isDirty=!1},2e3))});function J(){let u=fe.getCount()>0,N=!!P.currentSubStatus;it(u||N)}function X(){P.visible=!P.visible,ue(P.visible,e,"cw-btn-notes")}function L(){P.isSplitView=!P.isSplitView,P.isSplitView?(o.style.display="none",w.style.display="flex",w.style.flexDirection="column",a.googleLine&&(a.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",w.style.display="none",a.googleLine&&(a.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function k(){let u=document.createElement("div");if(u.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-idioma" style="font-size: 10px; margin-bottom: 6px;">${x("idioma")}</div>
                    <div class="cw-segmented-control" id="lang-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-lang="pt" class="active" style="z-index:2">PT</button>
                        <button data-lang="es" style="z-index:2">ES</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${x("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${x("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${x("nao")}</button>
                        <button data-val="true" style="z-index:2">${x("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let T=document.createElement("style");T.id="cw-segmented-styles",T.innerHTML=`
                .cw-segmented-control {
                    display: flex;
                    background: ${D.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${D.border};
                    position: relative;
                    overflow: hidden;
                }
                .cw-segmented-control button {
                    flex: 1;
                    border: none;
                    background: transparent;
                    padding: 6px 4px;
                    font-size: 11px;
                    font-weight: 700;
                    border-radius: 100px;
                    cursor: pointer;
                    transition: all 0.3s ${se};
                    color: ${D.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${D.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${D.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `,document.head.appendChild(T)}let N=(T,Y)=>{let Q=u.querySelector(`#${T}`).querySelector(".cw-segmented-indicator");Q&&(Q.style.transform=`translateX(${Y*100}%) translateX(${Y*2}px)`)};return u.querySelectorAll("#lang-selector button").forEach((T,Y)=>{T.onclick=()=>{P.setLanguage(T.dataset.lang),u.querySelectorAll("#lang-selector button").forEach(H=>H.classList.remove("active")),T.classList.add("active"),N("lang-selector",Y),$.playHover(),P.currentSubStatus&&_(P.currentSubStatus)}}),u.querySelectorAll("#type-selector button").forEach((T,Y)=>{T.onclick=()=>{P.setCaseType(T.dataset.type),u.querySelectorAll("#type-selector button").forEach(H=>H.classList.remove("active")),T.classList.add("active"),N("type-selector",Y),$.playHover(),P.currentSubStatus&&_(P.currentSubStatus)}}),u.querySelectorAll("#portugal-selector button").forEach((T,Y)=>{T.onclick=()=>{P.setPortugalCase(T.dataset.val==="true"),u.querySelectorAll("#portugal-selector button").forEach(H=>H.classList.remove("active")),T.classList.add("active"),N("portugal-selector",Y),$.playHover(),P.currentSubStatus&&_(P.currentSubStatus)}}),u}function B(){let u=document.createElement("div");u.className="cw-status-section",u.style.cssText="display: flex; flex-direction: column; gap: 8px;",u.innerHTML=`
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
        `;let N=u.querySelector("#main-status-select"),T=u.querySelector("#sub-status-select");return N.onchange=()=>{P.setStatus(N.value),G(N.value,T),P.setSubStatus(""),_("")},T.onchange=()=>{P.setSubStatus(T.value),_(T.value)},u}function G(u,N){if(N.innerHTML=`<option value="">${x("select_substatus")}</option>`,!u){N.disabled=!0;return}for(let T in Ae)if(Ae[T].status===u){let Y=document.createElement("option");Y.value=T,Y.textContent=Ae[T].name,N.appendChild(Y)}N.disabled=!1}function _(u){if(l.render&&l.render(u,P.currentCaseType),!u){p.style.display="none",b.style.display="none",document.getElementById("manual-task-toggle").style.display="none",r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",m.style.display="flex",m.style.opacity="1",g.style.display="none";return}m.style.opacity="0",setTimeout(()=>{P.currentSubStatus&&(m.style.display="none")},400),g.style.display="grid";let N=Ae[u];N&&N.templateFields&&P.setActiveFields(N.templateFields),O(),ht(u,b,P),b.style.display="block",p.style.display="block";let T=u.startsWith("SO_"),Y=u==="NI_Awaiting_Validation",H=document.getElementById("manual-task-toggle");T||Y?(r.selectionElement.style.display="block",H.style.display="none"):(r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",H.style.display="block");let Q=u==="SO_Education_Only"?"education":"implementation";P.setScreenshotMode(Q),P.currentCaseType==="lm"?P.toggleFieldExclusion("field-ON_CALL",!0):P.toggleFieldExclusion("field-ON_CALL",!1),r.updateSubStatus(u),A();let U=document.getElementById("email-automation-toggle-row");U&&(U.style.display=Ne[u]?"flex":"none")}function A(){let u=r.getCheckedElements().map(N=>N.value);i.updateVisibility(P.currentSubStatus,u)}function S(u,N){let T=tt[u];if(T){for(let Y in T)if(Y==="linkedTask")r.toggleTask(T.linkedTask,N);else if(Y==="activeTasks")T.activeTasks.forEach(H=>{N?r.setTaskCount(H.value,H.count):r.setTaskCount(H.value,0)});else if(Y.startsWith("field-")){let H=Y,Q=T[Y],U=document.getElementById(H);if(U){let te=Re.includes(H.replace("field-",""));if(N)if(te){let ae=U.value.trim();ae.includes(Q.trim())||(U.value=ae?ae+`
`+Q.trim():Q.trim())}else U.value=Q;else if(te){let ae=U.value.trim(),oe=Q.trim();ae.includes(oe)&&(U.value=ae.replace(oe,"").trim().replace(/\n{3,}/g,`

`))}else U.value.trim()===Q.trim()&&(U.value="");P.updateField(H,U.value),U.dispatchEvent(new Event("input"))}}}}function I(u,N){let T=document.createElement("div");if(T.className="cw-actions-section",T.style.cssText=`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${D.bgInput};
            border-radius: 12px;
            border: 1px solid ${D.border};
        `,!document.getElementById("cw-actions-hover-styles")){let ae=document.createElement("style");ae.id="cw-actions-hover-styles",ae.innerHTML=`
                .cw-actions-section button {
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    position: relative;
                    overflow: hidden;
                }
                .cw-actions-section button:active {
                    transform: scale(0.98) !important;
                }
                .cw-actions-section .js-btn-generate:hover {
                    background: #1765cc !important;
                    box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3) !important;
                    transform: translateY(-1px);
                }
                .cw-actions-section .js-btn-copy:hover {
                    background: #f8f9fa !important;
                    border-color: ${D.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.1) !important;
                    transform: translateY(-1px);
                }
                .cw-actions-section .js-btn-reset:hover {
                    background: #fff5f5 !important;
                    border-color: #ff8787 !important;
                    color: #e03131 !important;
                    box-shadow: 0 2px 8px rgba(234, 67, 53, 0.1) !important;
                    transform: translateY(-1px);
                }
                .cw-actions-section .js-btn-park:hover {
                    background: #f0f7ff !important;
                    color: ${D.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `,document.head.appendChild(ae)}let Y=document.createElement("div");Y.id="email-automation-toggle-row",Y.style.cssText="grid-column: span 2; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",Y.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${D.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${D.primary};">
                <span class="js-label-email-toggle">${N("preencher_email_automaticamente")}</span>
            </label>
        `;let H=u.parkButton;H.classList.add("js-btn-park"),H.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let Q=document.createElement("button");Q.className="cw-btn-secondary js-btn-reset",Q.textContent=N("limpar"),Q.style.cssText=`width: 100%; height: 34px; background: ${D.surface}; color: ${D.textSub}; border: 1px solid ${D.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,Q.onclick=()=>F();let U=document.createElement("button");U.className="cw-btn-secondary js-btn-copy",U.textContent=N("copiar"),U.style.cssText=`width: 100%; height: 34px; background: ${D.surface}; color: ${D.primary}; border: 1px solid ${D.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,U.onclick=()=>f();let te=document.createElement("button");return te.className="cw-btn-primary js-btn-generate",te.textContent=N("preencher"),te.style.cssText=`width: 100%; height: 38px; background: ${D.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: span 2; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,te.onclick=()=>C(),T.appendChild(Y),T.appendChild(H),T.appendChild(Q),T.appendChild(U),T.appendChild(te),T}async function f(){if(!P.currentSubStatus){K(x("select_substatus"),{error:!0});return}let u=yt(P,r,i);u?(Ue(u),K(x("copiado_sucesso")),$.playClick()):K(x("select_substatus"),{error:!0})}async function C(){if(!P.currentSubStatus){K(x("select_substatus"),{error:!0});return}let u=yt(P,r,i);Ue(u),X();let N=Ve(),T=await lt();if(T){T.focus(),document.execCommand("insertHTML",!1,u),rt(T);let Y=document.getElementById("email-automation-checkbox");(!Y||Y.checked)&&P.currentSubStatus&&Ne[P.currentSubStatus]&&await pt(Ne[P.currentSubStatus]),K(x("inserido_copiado")),$.playSuccess(),F()}N()}function O(){if(P.currentSubStatus){if(P.currentCaseType==="lm")P.removeField("ON_CALL");else{let u=Ae[P.currentSubStatus];u&&u.templateFields.includes("ON_CALL")&&P.addFieldAt("ON_CALL",1)}P.isPortugalCase?(P.addFieldAt("CASO_PORTUGAL",1),P.addFieldAt("CONSENTIU_GRAVACAO",2)):(P.removeField("CASO_PORTUGAL"),P.removeField("CONSENTIU_GRAVACAO"))}}function F(){P.reset(),r.reset(),i.reset(),J(),o.querySelectorAll("select").forEach(N=>N.value=""),o.querySelector("#sub-status-select").disabled=!0;let u=document.getElementById("email-automation-toggle-row");u&&(u.style.display="none"),b.innerHTML="",p.style.display="none",m.style.display="flex",m.style.opacity="1",g.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none"}async function v(u=!1){let N={};b.querySelectorAll("input, textarea, select").forEach(U=>{(U.id.startsWith("field-")||U.id==="consent-select")&&(N[U.id]=U.value)});let T="Cliente",Y="---";if(!u)try{let U=await we();T=U.advertiserName,Y=U.cid}catch(U){console.warn("Erro ao coletar pageData:",U)}let H=r.getCheckedElements().map(U=>({key:U.value,count:U.count})),Q=H.map(U=>{let te=ye[U.key];return te?te.name:U.key});return{currentCaseType:P.currentCaseType,currentLang:P.currentLang,isPortugalCase:P.isPortugalCase,consent:P.consent,tagSupportUsed:P.tagSupportUsed,forcedScreenshots:[...P.forcedScreenshots],excludedFields:[...P.excludedFields],activeFields:P.activeFields,status:P.currentStatus,subStatus:P.currentSubStatus,formData:N,activeTasks:H,summaryTags:Q,clientName:T,cid:Y,timestamp:new Date().toISOString()}}let E=u=>new Promise(N=>setTimeout(N,u));async function M(u){P.setLanguage(u.currentLang||"pt"),P.setCaseType(u.currentCaseType||"bau"),P.setPortugalCase(u.isPortugalCase||!1),P.setConsent(u.consent||!1),P.setExcludedFields(u.excludedFields||[]),u.activeFields&&P.setActiveFields(u.activeFields);let N=o.querySelector(`#lang-selector button[data-lang="${P.currentLang}"]`);N&&N.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach(H=>{H!==N&&H.classList.remove("active")});let T=o.querySelector(`#type-selector button[data-type="${P.currentCaseType}"]`);T&&T.classList.add("active"),o.querySelectorAll("#type-selector button").forEach(H=>{H!==T&&H.classList.remove("active")});let Y=o.querySelector(`#portugal-selector button[data-val="${P.isPortugalCase}"]`);if(Y&&Y.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach(H=>{H!==Y&&H.classList.remove("active")}),u.status){let H=o.querySelector("#main-status-select");H.value=u.status,P.setStatus(u.status);let Q=o.querySelector("#sub-status-select");if(G(u.status,Q),await E(50),u.subStatus){if(Q.value=u.subStatus,P.setSubStatus(u.subStatus),_(u.subStatus),await E(100),u.tagSupportUsed!==void 0){P.setTagSupportUsed(u.tagSupportUsed);let U=i.element.querySelector('input[value="Sim"]'),te=i.element.querySelector('input[value="N\xE3o"]');u.tagSupportUsed&&U?U.checked=!0:te&&(te.checked=!0),i.element.querySelector("div:last-child").style.display=u.tagSupportUsed?"none":"block"}u.forcedScreenshots&&P.setForcedScreenshots(u.forcedScreenshots);for(let U in u.formData){let te=document.getElementById(U);te&&(te.value=u.formData[U],P.updateField(U,te.value))}u.activeTasks&&(u.activeTasks.forEach(U=>r.setTaskCount(U.key,U.count)),P.setActiveTasks(r.getCheckedElements()))}}P.isDirty=!1}function x(u){return he[P.currentLang]?.[u]||he.pt?.[u]||u}function q(){let u=document.createElement("div");return u.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',u.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",u.onclick=N=>{N.stopPropagation(),L()},u.title="Alternar para Split & Transfer",u}function W(){let u=document.createElement("div");return u.id="notes-empty-state",u.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${se};
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
        `,u}function V(u){let N=o.querySelector(".js-label-idioma");N&&(N.textContent=x("idioma"));let T=o.querySelector(".js-label-fluxo");T&&(T.textContent=x("fluxo"));let Y=o.querySelector(".js-label-portugal");Y&&(Y.textContent=x("caso_portugal"));let H=o.querySelector(".js-label-status");H&&(H.textContent=x("status_principal"));let Q=o.querySelector(".js-label-substatus");Q&&(Q.textContent=x("substatus"));let U=o.querySelector(".js-btn-copy");U&&(U.textContent=x("copiar"));let te=o.querySelector(".js-btn-generate");te&&(te.textContent=x("preencher"));let ae=o.querySelector(".js-btn-reset");ae&&(ae.textContent=x("limpar"));let oe=document.getElementById("manual-task-toggle");oe&&(oe.textContent=x("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let ee=o.querySelector(".js-btn-park span");ee&&(ee.textContent=x("guardar"));let Z=e.querySelector(".js-drawer-title");Z&&(Z.textContent=x("rascunhos_salvos"));let me=o.querySelector(".js-label-email-toggle");me&&(me.textContent=x("preencher_email_automaticamente")),i&&i.setLanguage&&i.setLanguage(x),r&&r.setLanguage&&r.setLanguage(x)}return m.style.display="flex",g.style.display="none",P.setLanguage("pt"),P.setCaseType("bau"),J(),setTimeout(async()=>{let u=fe.getEmergency();u&&(await ge("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?(M(u),K("Sess\xE3o restaurada!")):fe.clearEmergency())},3e3),document.body.appendChild(e),X}var lo=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}];var co={_templates:null,async getTemplates(){return this._templates?this._templates:(this._templates=lo,this._templates)}};var po="cw_personal_library_v1",Be=!1,be={getSnippets:(t="all")=>{let e=be._loadFromLocal(),o=ve();return o&&o.includes("@")&&!Be&&be._syncWithServer(o),t==="all"?e:e.filter(n=>n.type===t)},save:async t=>{let e=ve();if(!e)return K("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;Be=!0;let o=be._loadFromLocal(),n=new Date().toISOString(),a={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:n},s=o.filter(i=>i.id!==a.id);return s.unshift(a),be._saveToLocal(s),re.saveSnippet(a,e).then(i=>{i?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais."),setTimeout(()=>{Be=!1},2e3)}),a},delete:async t=>{let e=ve();Be=!0;let n=be._loadFromLocal().filter(a=>a.id!==t);return be._saveToLocal(n),e?re.deleteSnippet(t,e).then(()=>{setTimeout(()=>{Be=!1},2e3)}):Be=!1,!0},_syncWithServer:async t=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let e=await re.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,n=be._loadFromLocal(),a=JSON.stringify(o),s=JSON.stringify(n);a!==s&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),be._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(po)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem(po,JSON.stringify(t))}};function uo(){let t="v6.0.0",e=!1,o=[],n=null,a="",s="Todos",i=new Set,r={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"},p=document.createElement("div");p.id="email-assistant-popup",p.classList.add("cw-module-window");let l=document.createElement("style");l.textContent=`
        #email-template-list::-webkit-scrollbar {
            width: 4px;
        }
        #email-template-list::-webkit-scrollbar-track {
            background: transparent;
        }
        #email-template-list::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        #email-template-list::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.2);
        }
        @keyframes cw-floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .cw-animate-float {
            animation: cw-floating 3s ease-in-out infinite;
        }
    `,document.head.appendChild(l),Object.assign(p.style,ce,{width:"850px",height:"650px",display:"none",flexDirection:"column",fontFamily:"'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",borderRadius:"12px",overflow:"hidden"});let d=de(p,"Email Assistant",t,"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",{popup:p},()=>S()),c=document.createElement("div");Object.assign(c.style,{display:"flex",flex:"1",overflow:"hidden",backgroundColor:r.bgApp});let h=document.createElement("div");Object.assign(h.style,{width:"320px",backgroundColor:"#EFEFF0",borderRight:`1px solid ${r.borderSubtle}`,display:"flex",flexDirection:"column",flexShrink:"0"});let b=document.createElement("div");Object.assign(b.style,{padding:"16px",borderBottom:`1px solid ${r.borderSubtle}`,position:"relative"});let m=document.createElement("input");m.placeholder="Buscar templates...",Object.assign(m.style,{width:"100%",padding:"10px 14px 10px 36px",borderRadius:"10px",border:"1.5px solid transparent",backgroundColor:"#E3E3E8",fontSize:"15px",outline:"none",boxSizing:"border-box",color:r.textPrimary,backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",transition:"all 0.2s ease-in-out"}),m.onfocus=()=>{m.style.backgroundColor="#FFFFFF",m.style.borderColor=r.primary,m.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)",m.style.transform="scale(1.02)"},m.onblur=()=>{m.style.backgroundColor="#E3E3E8",m.style.borderColor="transparent",m.style.boxShadow="none",m.style.transform="scale(1)"};let g=document.createElement("div");g.id="email-template-list",Object.assign(g.style,{flex:"1",overflowY:"auto",padding:"8px",scrollBehavior:"smooth"});let y=document.createElement("div");y.innerHTML="\u2715",Object.assign(y.style,{position:"absolute",right:"26px",top:"50%",transform:"translateY(-50%)",fontSize:"10px",color:"#fff",cursor:"pointer",display:"none",backgroundColor:"#C7C7CC",width:"16px",height:"16px",borderRadius:"50%",textAlign:"center",lineHeight:"16px",fontWeight:"bold"}),y.onclick=()=>{m.value="",a="",y.style.display="none",f(),m.focus()},b.appendChild(m),b.appendChild(y),h.appendChild(b),h.appendChild(g);let w=document.createElement("div");Object.assign(w.style,{flex:"1",display:"flex",flexDirection:"column",overflow:"hidden",backgroundColor:r.bgApp,transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"});let R=document.createElement("div");Object.assign(R.style,{padding:"20px",borderBottom:`1px solid ${r.borderSubtle}`,backgroundColor:r.bgSurface,maxHeight:"250px",overflowY:"auto",display:"none"});let z=document.createElement("div");Object.assign(z.style,{flex:"1",display:"flex",flexDirection:"column",padding:"20px",backgroundColor:r.bgApp,overflow:"hidden"});let j=document.createElement("div");Object.assign(j.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"});let J=document.createElement("span");J.textContent="Preview do E-mail",Object.assign(J.style,{fontSize:"12px",fontWeight:"600",color:r.textSecondary,textTransform:"uppercase",letterSpacing:"0.5px"});let X=document.createElement("div");Object.assign(X.style,{display:"flex",gap:"8px"});let L=(E,M=!1)=>{let x=document.createElement("button");return x.textContent=E,Object.assign(x.style,{padding:"8px 14px",borderRadius:"10px",border:M?"none":`1.5px solid ${r.primary}`,background:M?r.primary:"transparent",color:M?"#fff":r.primary,fontSize:"13px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 1, 0.5, 1)",boxShadow:M?"0 4px 12px rgba(0, 122, 255, 0.3)":"none"}),x.onmouseenter=()=>{M?(x.style.backgroundColor="#0062CC",x.style.transform="translateY(-1px)",x.style.boxShadow="0 6px 16px rgba(0, 122, 255, 0.4)"):x.style.backgroundColor="rgba(0, 122, 255, 0.05)"},x.onmouseleave=()=>{M?(x.style.backgroundColor=r.primary,x.style.transform="translateY(0)",x.style.boxShadow="0 4px 12px rgba(0, 122, 255, 0.3)"):(x.style.backgroundColor="transparent",x.style.transform="translateY(0)")},x.onmousedown=()=>x.style.transform="scale(0.94)",x.onmouseup=()=>x.style.transform="scale(1)",x},k=L("Copiar HTML"),B=L("Preencher no CRM",!0),G=L("Smart CR");G.style.borderColor="#E67E22",G.style.color="#E67E22",G.style.display="none",X.appendChild(G),X.appendChild(k),X.appendChild(B),j.appendChild(J),j.appendChild(X);let _=document.createElement("div");_.contentEditable="true",Object.assign(_.style,{flex:"1",backgroundColor:r.bgSurface,border:`1px solid ${r.borderSubtle}`,borderRadius:"8px",padding:"20px",fontSize:"15px",lineHeight:"1.6",color:r.textPrimary,overflowY:"auto",outline:"none",boxShadow:"inset 0 1px 2px rgba(0,0,0,0.02)"}),z.appendChild(j),z.appendChild(_),v(),w.appendChild(R),w.appendChild(z),c.appendChild(h),c.appendChild(w),p.appendChild(d),p.appendChild(c);let A=document.createElement("div");Object.assign(A.style,Se),p.appendChild(A),Ce(p,A),document.body.appendChild(p);function S(){e=!e,e?(p.style.display="flex",zt(p),o.length===0&&I()):p.style.display="none",ue(e,p,"cw-btn-email")}async function I(){g.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',o=await co.getTemplates(),f()}function f(){g.innerHTML="";let E=o.filter(V=>V.name.toLowerCase().includes(a.toLowerCase())||V.category.toLowerCase().includes(a.toLowerCase())),M=Object.entries(Ne).filter(([V,u])=>u&&(V.toLowerCase().includes(a.toLowerCase())||u.toLowerCase().includes(a.toLowerCase()))).map(([V,u])=>({id:V,name:V.replace(/_/g," "),category:"\u26A1 Smart CRs",code:u,isSmartCR:!0})),x=be.getSnippets("email").filter(V=>V.title.toLowerCase().includes(a.toLowerCase())||V.subject&&V.subject.toLowerCase().includes(a.toLowerCase())).map(V=>{let u=[],N=V.content.match(/\[([^\]]+)\]/g);return N&&[...new Set(N)].forEach(T=>{u.push({key:T,label:T.replace("[","").replace("]",""),type:T.toLowerCase().includes("data")?"date":"text",auto:T.toLowerCase().includes("nome")&&T.toLowerCase().includes("seu")?"agentName":null})}),{id:V.id||`snippet-${Math.random()}`,name:V.title,category:"\u{1F464} Pessoal",subject:V.subject||"Sem Assunto",template:V.content,placeholders:u}}),q=[...E,...M,...x];if(q.length===0){g.innerHTML=`
                <div style="padding: 40px 20px; text-align: center; color: ${r.textSecondary}; opacity: 0.6;">
                    <div style="font-size: 32px; margin-bottom: 12px;">\u{1F50D}</div>
                    <div style="font-size: 14px; font-weight: 500;">Nenhum resultado para "${a}"</div>
                </div>`;return}[...new Set(q.map(V=>V.category))].sort((V,u)=>V.localeCompare(u)).forEach(V=>{let u=i.has(V)||a.length>0,N=q.filter(te=>te.category===V),T=document.createElement("div");Object.assign(T.style,{padding:"12px 16px 12px 24px",fontSize:"11px",fontWeight:"700",color:r.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",position:"sticky",top:"-8px",backgroundColor:"rgba(239, 239, 240, 0.9)",zIndex:"10",backdropFilter:"blur(20px)",margin:"0 -8px 8px -8px",borderBottom:`0.5px solid ${r.borderSubtle}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none",transition:"background-color 0.2s ease"}),T.onmouseenter=()=>T.style.backgroundColor="rgba(230, 230, 232, 0.9)",T.onmouseleave=()=>T.style.backgroundColor="rgba(239, 239, 240, 0.9)";let Y=document.createElement("span");Y.textContent=V,T.appendChild(Y);let H=document.createElement("span");H.textContent=N.length,Object.assign(H.style,{backgroundColor:"rgba(0, 0, 0, 0.05)",padding:"2px 8px",borderRadius:"10px",fontSize:"10px",color:r.textSecondary});let Q=document.createElement("span");Q.innerHTML=u?"\u{10012A}":"\u{10012B}",Q.innerHTML=u?"\u25BE":"\u25B8",Q.style.marginLeft="8px",Q.style.transition="transform 0.3s ease";let U=document.createElement("div");U.style.display="flex",U.style.alignItems="center",U.appendChild(H),U.appendChild(Q),T.appendChild(U),T.onclick=()=>{i.has(V)?i.delete(V):i.add(V),f()},g.appendChild(T),u&&N.forEach(te=>{let ae=n&&n.id===te.id,oe=document.createElement("div");if(Object.assign(oe.style,{padding:"12px 14px",fontSize:"14px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",borderRadius:"10px",color:r.textPrimary,margin:"4px 6px",display:"flex",alignItems:"center",gap:"12px",backgroundColor:ae?r.primary:r.bgSurface,boxShadow:ae?"0 4px 12px rgba(0, 122, 255, 0.3)":"0 1px 2px rgba(0,0,0,0.05)",border:ae?"none":`1px solid ${r.borderSubtle}`,position:"relative",overflow:"hidden"}),ae){let me=document.createElement("div");Object.assign(me.style,{position:"absolute",left:"0",top:"0",bottom:"0",width:"4px",backgroundColor:"#fff",borderRadius:"0 4px 4px 0"}),oe.appendChild(me)}let ee=document.createElement("span");ee.innerHTML=te.isSmartCR?"\u26A1":te.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",ee.style.fontSize="12px",ee.style.opacity="0.7",ee.style.flexShrink="0",oe.appendChild(ee);let Z=document.createElement("span");Z.textContent=te.name,Z.style.overflow="hidden",Z.style.textOverflow="ellipsis",Z.style.whiteSpace="nowrap",Z.style.flex="1",oe.appendChild(Z),ae&&(oe.style.color="#fff",oe.style.fontWeight="600",ee.style.opacity="1"),oe.onmouseenter=()=>{ae||(oe.style.backgroundColor="#f8f8f9",oe.style.transform="translateY(-1px) scale(1.01)",oe.style.boxShadow="0 4px 8px rgba(0,0,0,0.08)",oe.style.borderColor="rgba(0, 122, 255, 0.2)")},oe.onmouseleave=()=>{ae||(oe.style.backgroundColor=r.bgSurface,oe.style.transform="translateY(0) scale(1)",oe.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",oe.style.borderColor=r.borderSubtle)},oe.onmousedown=()=>{oe.style.transform=ae?"scale(0.97)":"scale(0.98)"},oe.onmouseup=()=>{oe.style.transform=ae?"scale(1)":"translateY(-1px) scale(1.01)"},oe.onclick=()=>{O(te)},g.appendChild(oe)})})}let C=null;async function O(E){n?.id!==E.id&&(n=E,C&&clearTimeout(C),w.style.opacity="0",w.style.transform="translateY(5px)",C=setTimeout(()=>{G.style.display=E.isSmartCR?"block":"none",B.style.display=E.isSmartCR?"none":"block",k.style.display=E.isSmartCR?"none":"block",f(),F(),v(),w.style.opacity="1",w.style.transform="translateY(0)",C=null},150))}function F(){if(R.innerHTML="",!n||n.isSmartCR){n?.isSmartCR?(R.style.display="block",R.innerHTML=`<div style="padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):R.style.display="none";return}let E=n.placeholders&&n.placeholders.length>0;if(R.style.display=E?"block":"none",!E)return;let M=document.createElement("div");Object.assign(M.style,{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}),(n.placeholders||[]).forEach(x=>{let q=document.createElement("div"),W=document.createElement("label");W.textContent=x.label,Object.assign(W.style,{display:"block",fontSize:"11px",fontWeight:"700",color:r.textSecondary,marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.5px"});let V=document.createElement("input");V.type=x.type||"text",V.dataset.key=x.key,Object.assign(V.style,{width:"100%",padding:"10px 12px",borderRadius:"8px",border:`1.5px solid ${r.borderSubtle}`,backgroundColor:"#FBFBFD",fontSize:"14px",boxSizing:"border-box",transition:"all 0.2s ease",outline:"none"}),V.onfocus=()=>{V.style.borderColor=r.primary,V.style.backgroundColor="#FFFFFF",V.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)"},V.onblur=()=>{V.style.borderColor=r.borderSubtle,V.style.backgroundColor="#FBFBFD",V.style.boxShadow="none"},x.auto==="agentName"&&(V.value=Pe().split(" ")[0]),V.addEventListener("input",v),q.appendChild(W),q.appendChild(V),M.appendChild(q)}),R.appendChild(M)}function v(){if(!n){_.innerHTML=`
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center;">
                    <div class="cw-animate-float" style="width: 140px; height: 140px; margin-bottom: 24px;">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="55" fill="#f8f9fa"/>
                            <!-- Envelope Base -->
                            <path d="M30 40C30 37.7909 31.7909 36 34 36H86C88.2091 36 90 37.7909 90 40V80C90 82.2091 88.2091 84 86 84H34C31.7909 84 30 82.2091 30 80V40Z" fill="white" stroke="#e8eaed" stroke-width="2"/>
                            <!-- Google Colors Stripes on the envelope flap -->
                            <path d="M30 40L60 60L90 40" stroke="#4285F4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M30 80L50 65" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <path d="M90 80L70 65" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <!-- Small Floating icons -->
                            <circle cx="95" cy="30" r="8" fill="#34A853"/>
                            <path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <rect x="20" y="70" width="12" height="12" rx="3" fill="#4285F4" opacity="0.8"/>
                        </svg>
                    </div>
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${r.textPrimary}; margin-bottom: 8px;">
                        Pronto para come\xE7ar?
                    </div>
                    <div style="font-size: 14px; color: ${r.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.
                    </div>
                </div>`;return}if(n.isSmartCR){_.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${n.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let E=n.template;(R.querySelectorAll("input")||[]).forEach(x=>{let q=x.dataset.key,W=x.value;if(x.type==="date"&&W){let[u,N,T]=W.split("-");W=`${N}/${T}/${u}`}W=W||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${q}</span>`;let V=q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");E=E.replace(new RegExp(V,"g"),W)}),_.innerHTML=E}return m.addEventListener("input",E=>{a=E.target.value,y.style.display=a?"block":"none",f()}),k.onclick=()=>{let E=_.innerHTML,M=new Blob([E],{type:"text/html"}),x=_.innerText,q=[new ClipboardItem({"text/html":M,"text/plain":new Blob([x],{type:"text/plain"})})];navigator.clipboard.write(q).then(()=>K("E-mail copiado com sucesso!"),()=>K("Erro ao copiar e-mail",{error:!0}))},B.onclick=async()=>{if(!n)return;let E=Ve(),M={...n,body:_.innerHTML};try{await io(M),S()}catch{K("Erro ao preencher e-mail",{error:!0})}finally{E()}},G.onclick=async()=>{if(!n||!n.isSmartCR)return;let E=Ve();try{await pt(n.code),S()}catch{K("Erro ao aplicar Smart CR",{error:!0})}finally{E()}},S}var mo={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function go(){let t="v2.6 (Context HD)",e="csa-local-styles";if(!document.getElementById(e)){let v=document.createElement("style");v.id=e,v.innerHTML=`
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
      `,document.head.appendChild(v)}let o={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#FFFFFF",scrollBehavior:"smooth"},card:{background:"#FFFFFF",border:"1px solid #E5E7EB",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"12px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"8px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.1s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.6",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"18px",height:"18px",borderRadius:"6px",border:"2px solid #DADCE0",marginRight:"12px",marginTop:"2px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},a="PT",s="BAU",i=!1,r=document.createElement("div");r.id="call-script-popup",r.classList.add("cw-module-window"),Object.assign(r.style,ce,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let p={popup:r,googleLine:null},l=null;function d(){i&&we().then(v=>{let E=r.querySelector("#cw-ctx-name"),M=r.querySelector("#cw-ctx-cid"),x=r.querySelector("#cw-ctx-email");if(E&&(E.textContent=v.advertiserName||"Cliente Desconhecido"),M){let q=v.cid||"---";M.textContent!==q&&(M.textContent=q)}if(x){let q=v.clientEmail||"N\xE3o encontrado";x.textContent!==q&&(x.textContent=q,x.title=q)}})}function c(){we().then(v=>{let E=new Date().toLocaleDateString("pt-BR"),M=`Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${v.advertiserName||"Cliente"}) em andamento hoje (${E}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${v.advertiserName||"---"}
CID: ${v.cid||"---"}
Case ID: ${v.caseId||"---"}
E-mail: ${v.clientEmail||"---"}`;navigator.clipboard.writeText(M),K("Mensagem copiada para o AM!")})}function h(){i=!i,ue(i,r,"cw-btn-script"),i?(d(),l||(l=setInterval(d,2e3))):l&&(clearInterval(l),l=null)}let b=de(r,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",p,()=>{h()});r.appendChild(b);let m=document.createElement("div");Object.assign(m.style,o.contextBanner),m.innerHTML=`
      <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
              <div class="csa-live-dot" title="Monitoramento Ativo"></div>
              <span id="cw-ctx-name" style="font-family:'Google Sans'; font-size:16px; font-weight:500; color:#202124;">Carregando...</span>
          </div>
          <div style="font-size:10px; font-weight:700; color:#1A73E8; background:#E8F0FE; padding:2px 8px; border-radius:4px; text-transform:uppercase;">Live</div>
      </div>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
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

      <button class="csa-data-pill" id="cw-pill-message" style="width: 100%; text-align: left; margin-top: 4px; background: #E8F0FE; border: 1px solid #1A73E8; padding: 10px 14px; display: flex; align-items: center; gap: 12px;">
          <div style="background: #1A73E8; border-radius: 8px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div style="flex-grow: 1;">
              <div style="font-size:10px; font-weight:800; color:#1A73E8; text-transform:uppercase; margin-bottom:1px; letter-spacing:0.5px;">Mensagem AM</div>
              <div id="cw-ctx-message" class="csa-data-value" style="font-family:'Google Sans', sans-serif; font-size:13px; font-weight:500; color:#3C4043;">1\xB0 Aviso Attempted Contact</div>
          </div>
          <div class="csa-copy-hint">Copiado!</div>
      </button>
  `,m.querySelector("#cw-pill-message").addEventListener("click",()=>{c()});let y=(v,E)=>{let M=m.querySelector(v),x=m.querySelector(E);M.onclick=()=>{let q=x.textContent;!q||q.includes("---")||q.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(q),$.playSuccess(),M.classList.add("copied"),setTimeout(()=>M.classList.remove("copied"),1500))}};r.appendChild(m);let w=document.createElement("div");Object.assign(w.style,o.progressBarContainer);let R=document.createElement("div");Object.assign(R.style,o.progressBarFill),w.appendChild(R),r.appendChild(w);let z=document.createElement("div");z.id="csa-content",Object.assign(z.style,o.contentArea),r.appendChild(z);let j=document.createElement("div");Object.assign(j.style,o.footer);let J=document.createElement("span");J.textContent="by lucaste@",Object.assign(J.style,{fontSize:"10px",color:"#bdc1c6"});let X=document.createElement("button");X.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(X.style,o.resetBtn),X.onmouseenter=()=>X.style.background="#fce8e6",X.onmouseleave=()=>X.style.background="transparent",X.onclick=()=>{X.style.transform="scale(0.9)",setTimeout(()=>X.style.transform="scale(1)",150);for(let v in n)delete n[v];f()},j.appendChild(J),j.appendChild(X),r.appendChild(j);let L=document.createElement("div");Object.assign(L.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let k=document.createElement("div");Object.assign(k.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let B=document.createElement("div");B.textContent="BAU";let G=document.createElement("div");G.textContent="LT",Object.assign(B.style,je),Object.assign(G.style,je),k.appendChild(B),k.appendChild(G);let _=document.createElement("select");Object.assign(_.style,Je,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),_.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',_.value=a,L.appendChild(k),L.appendChild(_),z.appendChild(L);let A=document.createElement("div");A.id="csa-checklist-area",z.appendChild(A);let S=document.createElement("div");Object.assign(S.style,Se),S.className="no-drag",S.title="Redimensionar",r.appendChild(S),Ce(r,S),document.body.appendChild(r),y("#cw-pill-cid","#cw-ctx-cid"),y("#cw-pill-email","#cw-ctx-email");function I(v){return v}function f(){A.innerHTML="";let v=`${a} ${s}`,E=mo[v];if(!E){A.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',R.style.width="0%";return}let M=E.color||"#1a73e8",x=0,q=0;["inicio","meio","fim"].forEach(W=>{E[W]&&(x+=E[W].length)}),["inicio","meio","fim"].forEach((W,V)=>{let u=E[W];if(!u||u.length===0)return;let N=document.createElement("div");Object.assign(N.style,o.card);let T=document.createElement("div");Object.assign(T.style,o.cardTitle);let Y="";W==="inicio"?a.includes("ES")?Y="Apertura":a.includes("EN")?Y="Opening":Y="Abertura":W==="meio"?a.includes("ES")?Y="Implementaci\xF3n":a.includes("EN")?Y="Implementation":Y="Implementa\xE7\xE3o (Tag Support)":W==="fim"&&(a.includes("ES")?Y="Cierre":a.includes("EN")?Y="Closing":Y="Fechamento"),T.textContent=Y;let H=document.createElement("span");H.style.fontSize="11px",H.style.opacity="0.7",H.style.fontWeight="500",H.style.background="#f1f3f4",H.style.padding="2px 8px",H.style.borderRadius="10px",T.appendChild(H),N.appendChild(T);let Q=0;u.forEach((U,te)=>{let ae=`${v}-${W}-${te}`,oe=!!n[ae];oe&&(q++,Q++);let ee=document.createElement("div");Object.assign(ee.style,o.itemRow);let Z=document.createElement("div");Object.assign(Z.style,o.checkbox);let me=document.createElement("span");me.innerHTML=U,me.style.flex="1",oe?(Object.assign(ee.style,o.itemCompleted),Z.style.background=M,Z.style.borderColor=M,Z.style.transform="scale(1)",Z.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ee.style.textDecoration="none",ee.style.opacity="1",Z.style.background="transparent",Z.style.borderColor="#dadce0",Z.style.transform="scale(1)",Z.innerHTML=""),ee.onclick=()=>{let Ye=!n[ae];n[ae]=Ye,$.playClick(),Ye?(Z.style.transform="scale(1.2)",setTimeout(()=>Z.style.transform="scale(1)",150),Object.assign(ee.style,o.itemCompleted),Z.style.background=M,Z.style.borderColor=M,Z.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ee.style.textDecoration="none",ee.style.opacity="1",Z.style.background="transparent",Z.style.borderColor="#dadce0",Z.innerHTML=""),C(v,E)},ee.onmouseenter=()=>{n[ae]||(ee.style.background="#f1f3f4",Z.style.borderColor=M)},ee.onmouseleave=()=>{n[ae]||(ee.style.background="transparent",Z.style.borderColor="#dadce0")},ee.appendChild(Z),ee.appendChild(me),N.appendChild(ee)}),Q===u.length&&u.length>0&&(H.style.color="#1e8e3e",H.style.background="#e6f4ea",N.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),H.textContent=`${Q}/${u.length}`,A.appendChild(N)}),O(x,q)}function C(v,E){let M=0,x=0;["inicio","meio","fim"].forEach(q=>{let W=E[q]||[];M+=W.length,W.forEach((V,u)=>{n[`${v}-${q}-${u}`]&&x++})}),O(M,x),setTimeout(()=>f(),200)}function O(v,E){let M=v===0?0:E/v*100;R.style.width=`${M}%`,R.style.background=M===100?"#34A853":"linear-gradient(90deg, #4285F4, #34A853)"}function F(v){s=v;let E=Rt();Object.assign(B.style,je),Object.assign(G.style,je),Object.assign(v==="BAU"?B.style:G.style,E),f()}return B.onclick=()=>F("BAU"),G.onclick=()=>F("LT"),_.addEventListener("change",v=>{a=v.target.value,f()}),F(s),h}var We={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Me={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},ut={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},At="cw_link_history_v4";function fo(t,e){try{let o=JSON.parse(localStorage.getItem(At)||"[]");o=o.filter(n=>n.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(At,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function $o(){try{return JSON.parse(localStorage.getItem(At)||"[]")}catch{return[]}}function bo(){let t="v4.6",e="",o=!1,n=null,a=!1,s={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},i=document.createElement("div");i.id="links-popup",i.classList.add("cw-module-window"),Object.assign(i.style,ce,{right:"100px",width:"600px",height:"650px",background:s.bgApp,overflow:"hidden"});let p=de(i,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:i,googleLine:null},()=>_());i.appendChild(p);let l=document.createElement("div");l.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",i.appendChild(l);let d=document.createElement("div");d.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${s.bgSidebar};
      border-right: 1px solid ${s.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,l.appendChild(d);let c=document.createElement("div");c.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",l.appendChild(c);let h=document.createElement("div");h.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let b=document.createElement("div");b.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let m=document.createElement("div");m.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',m.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let g=document.createElement("input");g.type="text",g.placeholder="Buscar ferramenta ou SOP...",g.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${s.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,g.onfocus=()=>{b.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",b.style.border="1px solid #1a73e8"},g.onblur=()=>{b.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",b.style.border="1px solid transparent"},b.appendChild(m),b.appendChild(g),h.appendChild(b),c.appendChild(h);let y=document.createElement("div");y.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",c.appendChild(y);let w=null;function R(){if(w)return;w=document.createElement("div"),w.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let A=document.createElement("div");A.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",A.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let S=document.createElement("button");S.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',S.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",S.onclick=()=>{j(),a=!1,k()},A.appendChild(S),w.appendChild(A);let I=document.createElement("div");I.id="cw-history-list",I.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",w.appendChild(I),c.appendChild(w)}function z(){w||R();let A=w.querySelector("#cw-history-list");A.innerHTML="";let S=$o();S.length===0?A.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':S.forEach(I=>{let f=G(I,Me[I._originalCat],!0,I._originalCat);A.appendChild(f)}),requestAnimationFrame(()=>w.style.transform="translateY(0)")}function j(){w&&(w.style.transform="translateY(100%)")}function J(){d.innerHTML="";let A=X("history","Recentes",Me.history);A.id="cw-sidebar-btn-history",A.onclick=()=>{$.playClick(),a=!a,a?z():j(),k()},d.appendChild(A);let S=document.createElement("div");S.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",d.appendChild(S),Object.keys(We).forEach(I=>{let f=We[I],C=X(I,f.label,Me[I]);C.id=`cw-sidebar-btn-${I}`,C.onclick=()=>{$.playClick(),a&&(a=!1,j()),L(I)},d.appendChild(C)})}function X(A,S,I){let f=document.createElement("div");f.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${s.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,f.title=S,f.dataset.key=A;let C=document.createElement("div");C.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",C.innerHTML=I||Me.tasks;let O=document.createElement("div");return O.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",O.textContent=S,f.appendChild(C),f.appendChild(O),f.onmouseenter=()=>{n!==A&&!(A==="history"&&a)&&(f.style.background="#F1F3F4",C.style.transform="scale(1.1)")},f.onmouseleave=()=>{n!==A&&!(A==="history"&&a)&&(f.style.background="transparent",C.style.transform="scale(1)")},f}function L(A){let S=document.getElementById(`cat-anchor-${A}`);S&&(S.scrollIntoView({behavior:"smooth",block:"start"}),n=A,k())}function k(){Object.keys(We).forEach(S=>{let I=d.querySelector(`#cw-sidebar-btn-${S}`);if(I)if(n===S&&!a){let f=ut[S];I.style.background=f.bg,I.style.color=f.color,I.querySelector("div:first-child").style.transform="scale(1.1)"}else I.style.background="transparent",I.style.color=s.textSecondary,I.querySelector("div:first-child").style.transform="scale(1)"});let A=d.querySelector("#cw-sidebar-btn-history");A&&(a?(A.style.background="#3C4043",A.style.color="#FFFFFF"):(A.style.background="transparent",A.style.color=s.textSecondary))}function B(){if(y.innerHTML="",e.trim()!==""){let S=[];if(Object.entries(We).forEach(([f,C])=>{let O=C.links.filter(F=>F.name.toLowerCase().includes(e.toLowerCase())||F.desc.toLowerCase().includes(e.toLowerCase()));S.push(...O.map(F=>({...F,_cat:f})))}),S.length===0){y.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let I=document.createElement("div");I.innerHTML="Resultados da busca",I.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",y.appendChild(I),S.forEach(f=>{let C=G(f,Me[f._cat],!1,f._cat);y.appendChild(C)});return}Object.entries(We).forEach(([S,I])=>{let f=ut[S],C=document.createElement("div"),O=document.createElement("div");O.id=`cat-anchor-${S}`,O.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${f.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,O.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${f.color};"></div>
            ${I.label}
          `,C.appendChild(O);let F=document.createElement("div");F.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",I.links.forEach(v=>{let E=G(v,Me[S],!1,S);F.appendChild(E)}),C.appendChild(F),y.appendChild(C)});let A=document.createElement("div");A.style.height="80px",y.appendChild(A)}function G(A,S,I,f){let C=document.createElement("div"),O=ut[f]||ut.history;C.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let F=document.createElement("div");F.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${O.bg}; color: ${O.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,F.innerHTML=S||Me.tasks;let v=F.querySelector("svg");v&&(v.style.width="22px",v.style.height="22px");let E=document.createElement("div");E.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let M=document.createElement("div");M.style.cssText=`font-size: 14px; font-weight: 600; color: ${s.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,M.textContent=A.name;let x=document.createElement("div");x.style.cssText=`font-size: 12px; color: ${s.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,x.textContent=A.desc,E.appendChild(M),E.appendChild(x);let q=document.createElement("div");return q.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',q.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,q.title="Copiar URL",C.onmouseenter=()=>{C.style.transform="translateY(-2px)",C.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",C.style.borderColor="rgba(0,0,0,0.05)",C.style.borderLeft=`4px solid ${O.color}`,q.style.opacity="1",q.style.background="#F1F3F4"},C.onmouseleave=()=>{C.style.transform="translateY(0)",C.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",C.style.border="1px solid transparent",q.style.opacity="0",q.style.background="transparent"},C.onclick=()=>{!I&&f&&fo(A,f),window.open(A.url,"_blank")},q.onclick=W=>{W.stopPropagation(),$.playClick(),navigator.clipboard.writeText(A.url),!I&&f&&fo(A,f),K("Link copiado!")},C.appendChild(F),C.appendChild(E),C.appendChild(q),C}g.addEventListener("input",A=>{e=A.target.value,B()});function _(){o=!o,ue(o,i,"cw-btn-links")}return document.body.appendChild(i),J(),B(),_}var Oe=[];function Et(t){Oe=t}var Vo=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function xo(){let t="v4.9",e=!1,o=null,n=null;function a(f){if(!f)return"";try{let C=new Date(f);return isNaN(C.getTime())?String(f):C.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(f)}}if(!document.getElementById("cw-broadcast-hd-css")){let f=document.createElement("style");f.id="cw-broadcast-hd-css",f.innerHTML=`
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
      `,document.head.appendChild(f)}let s={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},i={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(f){return f?Object.entries(f).map(([C,O])=>`${C.replace(/[A-Z]/g,F=>"-"+F.toLowerCase())}:${O}`).join(";"):""}function p(f){if(!f||typeof f!="string")return"";let C=f;return C=C.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),C=C.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),C=C.replace(/_(.*?)_/g,"<i>$1</i>"),C=C.replace(/\n/g,"<br>"),C=Bt(C),C}let l=document.createElement("div");l.id="broadcast-popup",l.classList.add("cw-module-window"),Object.assign(l.style,ce,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let d={popup:l,googleLine:null};function c(){if(e=!e,ue(e,l,"cw-btn-broadcast"),e){let f=document.getElementById("cw-btn-broadcast");f&&f.classList.remove("has-new"),L()}}let h=de(l,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",d,()=>c()),b=h.querySelector(".cw-header-actions")||h.lastElementChild,m=null;function g(){let f=null;try{f=ve()}catch{console.warn("TechSol: Auth Pending")}if(f){let C=f.split("@")[0].toLowerCase(),O=nt.includes(C);if(window._cwIsAdmin=O,window._cwCurrentUser=C,O&&b&&!b.querySelector("#cw-admin-btn")){let F=document.createElement("div");F.id="cw-admin-btn",F.className="cw-btn-interactive",F.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(F.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),F.title="Novo Aviso",F.onclick=v=>{v.stopPropagation(),R()},b.insertBefore(F,b.firstChild),m||w(),B()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(g,2e3))}if(b){let f=document.createElement("button");f.textContent="Limpar",f.className="cw-btn-interactive",Object.assign(f.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),f.onclick=C=>{C.stopPropagation(),$.playSuccess();let O=Oe.map(F=>F.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(O)),B(),k()},b.insertBefore(f,b.firstChild)}l.appendChild(h);let y=document.createElement("div");y.id="cw-update-status",y.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",l.appendChild(y);function w(){m=document.createElement("div"),m.className="cw-editor-overlay",m.innerHTML=`
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
      `,m.querySelectorAll('input[name="cw-bc-type"]').forEach(F=>{F.addEventListener("change",()=>{m.querySelectorAll(".cw-radio-option").forEach(v=>v.classList.remove("checked")),F.parentElement.classList.add("checked")})}),setTimeout(()=>{let F=m.querySelector(".cw-radio-option.info");F&&F.classList.add("checked")},100);let f=m.querySelector("#cw-bc-cancel"),C=m.querySelector("#cw-bc-close-x"),O=m.querySelector("#cw-bc-send");f.onclick=z,C.onclick=z,O.onclick=j,l.appendChild(m)}function R(f=null){if(!m)return;let C=m.querySelector("#cw-editor-title-label"),O=m.querySelector("#cw-bc-title"),F=m.querySelector("#cw-bc-text"),v=m.querySelector("#cw-bc-send");if(f){n=f.id,C.textContent="Editar Aviso",O.value=f.title||"",F.value=f.text||"",v.textContent="Salvar Altera\xE7\xF5es";let E=f.type||"info",M=m.querySelector(`input[name="cw-bc-type"][value="${E}"]`);M&&M.click()}else{n=null,C.textContent="Novo Aviso",O.value="",F.value="",v.textContent="Publicar";let E=m.querySelector('input[name="cw-bc-type"][value="info"]');E&&E.click()}m.classList.add("active"),setTimeout(()=>O.focus(),300)}function z(){m&&m.classList.remove("active"),n=null}async function j(){let f=m.querySelector("#cw-bc-send"),C=m.querySelector("#cw-bc-title"),O=m.querySelector("#cw-bc-text"),F=m.querySelector('input[name="cw-bc-type"]:checked'),v=F?F.value:"info";if(!C.value.trim()||!O.value.trim()){K("Preencha todos os campos!",{error:!0});return}f.textContent="Salvando...",f.style.opacity="0.7";let E=!1;n?E=await re.updateBroadcast(n,{title:C.value,text:O.value,type:v}):E=await re.sendBroadcast({title:C.value,text:O.value,type:v,author:window._cwCurrentUser||"admin"}),E?(K(n?"Atualizado!":"Publicado!"),$.playSuccess(),z(),setTimeout(()=>L(),1500)):(K("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),f.textContent=n?"Salvar Altera\xE7\xF5es":"Publicar",f.style.opacity="1")}async function J(f){if(await ge("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await re.deleteBroadcast(f)){K("Aviso removido."),$.playClick();let F=Oe.findIndex(v=>v.id===f);F>-1&&Oe.splice(F,1),B(),setTimeout(()=>L(),1500)}else K("Erro ao excluir.",{error:!0})}let X=document.createElement("div");X.className="cw-nice-scroll",Object.assign(X.style,s.feedContainer),l.appendChild(X);async function L(){e&&(y.style.display="block",y.innerHTML="\u{1F504} Sincronizando...");try{let f=await re.fetchData();f&&f.broadcast&&(Et(f.broadcast),k(),e&&(B(),y.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{y.style.display="none"},1500)))}catch{e&&(y.innerHTML="\u26A0\uFE0F Offline")}}function k(){let f=document.getElementById("cw-btn-broadcast");if(!f)return;let C=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Oe.some(F=>!C.includes(F.id))){if(f.classList.add("has-new"),!f.querySelector(".cw-badge")){let F=document.createElement("div");F.className="cw-badge",Object.assign(F.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),f.appendChild(F)}}else{f.classList.remove("has-new");let F=f.querySelector(".cw-badge");F&&F.remove()}}function B(){X.innerHTML="";let f=l.querySelector("#cw-bau-widget");f&&f.remove();let C=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),O=[...Oe].sort((x,q)=>{let W=new Date(x.date).getTime()||0;return(new Date(q.date).getTime()||0)-W}),F=O.findIndex(x=>x.title&&x.title.toLowerCase().includes("disponibilidade bau"));if(F!==-1){let x=O[F];O.splice(F,1);let q=document.createElement("div");q.id="cw-bau-widget",Object.assign(q.style,s.bauContainer);let W=[],V=(x.text||"").split(`
`),u=/\d{1,2}\/\d{1,2}/,N="\u{1F4C5}";if(V.forEach(U=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(U)?N="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(U)&&(N="\u{1F1EA}\u{1F1F8}");let te=U.match(u);if(te){let ae=te[0],oe=N;/🇧🇷|🇵🇹|PT|BR/i.test(U)?oe="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(U)&&(oe="\u{1F1EA}\u{1F1F8}"),W.some(Z=>Z.flag===oe&&Z.date===ae)||W.push({flag:oe,date:ae})}}),W.length===0){let U=(x.text||"").match(/\d{1,2}\/\d{1,2}/g);U&&[...new Set(U)].forEach(te=>W.push({flag:"\u{1F4C5}",date:te}))}let T="",Y='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(Y=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${Y}
              `),W.length>0?T=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${W.map(te=>`
                  <div style="${r(s.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(s.bauFlag)}">${te.flag}</span>
                      <span style="${r(s.bauDate)}">${te.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${Y}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${p(x.text)}</div>
              `:T=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${p(x.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,q.innerHTML=`
              <div style="${r(s.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(s.liveIndicator)}">
                      <div style="${r(s.pulseDot)}"></div>
                      <span style="${r(s.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${a(x.date)}</div>
              </div>
              ${T}
          `,y.after(q);let H=q.querySelector("#cw-bau-toggle-btn"),Q=q.querySelector("#cw-bau-full");if(H&&Q&&(H.onclick=()=>{let U=Q.style.display==="none";Q.style.display=U?"block":"none",H.textContent=U?"Ocultar":"Detalhes"}),window._cwIsAdmin){let U=q.querySelector(".cw-bau-edit");U&&(U.onclick=()=>R(x))}}let v=O.sort((x,q)=>{let W=C.includes(x.id),V=C.includes(q.id);return W===V?0:W?1:-1});if(v.length===0&&!F){let x=document.createElement("div");Object.assign(x.style,s.emptyState),x.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,X.appendChild(x)}let E=v.filter(x=>!C.includes(x.id)),M=v.filter(x=>C.includes(x.id));if(E.forEach(x=>X.appendChild(G(x,!1))),M.length>0){let x=document.createElement("div");Object.assign(x.style,s.historyDivider),x.innerHTML=`<span>Hist\xF3rico (${M.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let q=document.createElement("div");Object.assign(q.style,s.historyContainer),M.forEach(V=>q.appendChild(G(V,!0)));let W=!1;x.onclick=()=>{$.playClick(),W=!W,q.style.display=W?"flex":"none",x.querySelector("svg").style.transform=W?"rotate(180deg)":"rotate(0deg)"},X.appendChild(x),X.appendChild(q)}}function G(f,C){let O=document.createElement("div");Object.assign(O.style,C?s.cardHistory:s.card);let F=i[f.type]||i.info,v=document.createElement("div");Object.assign(v.style,s.cardHeader);let E=document.createElement("div");Object.assign(E.style,s.typeTag,{color:F.color,background:F.bg}),E.innerHTML=`${F.icon} <span>${f.type}</span>`;let M=document.createElement("span");if(Object.assign(M.style,s.dateTag),M.textContent=a(f.date),v.appendChild(E),C)v.appendChild(M);else{let u=document.createElement("button");u.className="cw-btn-interactive",Object.assign(u.style,s.dismissBtn),u.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',u.onmouseenter=()=>{u.style.color="#1e8e3e",u.style.background="#e6f4ea",u.style.borderColor="#1e8e3e"},u.onmouseleave=()=>{u.style.color="#5f6368",u.style.background="#fff",u.style.borderColor="rgba(0,0,0,0.1)"},u.onclick=N=>{N.stopPropagation(),$.playClick(),O.style.transform="translateX(20px)",O.style.opacity="0",setTimeout(()=>{let T=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");T.push(f.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(T)),B(),k()},200)},v.appendChild(u)}let x=document.createElement("div");Object.assign(x.style,s.cardContent);let q=document.createElement("div");Object.assign(q.style,s.msgTitle),q.textContent=f.title;let W=document.createElement("div");Object.assign(W.style,s.msgBody),W.innerHTML=p(f.text);let V=document.createElement("div");if(Object.assign(V.style,s.msgMeta),V.innerHTML=`Publicado por <b>${f.author||"Sistema"}</b>`,C||(V.innerHTML+=` \u2022 ${a(f.date)}`),x.appendChild(q),x.appendChild(W),x.appendChild(V),O.appendChild(v),O.appendChild(x),window._cwIsAdmin){let u=document.createElement("div");u.className="cw-card-actions";let N=document.createElement("button");N.className="cw-action-btn edit",N.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',N.onclick=()=>R(f);let T=document.createElement("button");T.className="cw-action-btn delete",T.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',T.onclick=()=>J(f.id),u.appendChild(N),u.appendChild(T),O.appendChild(u)}return O}let _=re.getCachedBroadcasts();_.length>0&&(Et(_),B()),setTimeout(g,500),L(),o||(o=setInterval(L,Vo));let A=document.createElement("div");Object.assign(A.style,Se),A.className="no-drag",l.appendChild(A),Ce(l,A),document.body.appendChild(l);let S=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),I=Oe.some(f=>!S.includes(f.id));return{toggle:c,hasUnread:I}}function ho(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,o.overlay);let a=document.createElement("div");Object.assign(a.style,o.card);let s=document.createElement("div");Object.assign(s.style,o.icon);let i=document.createElement("div");Object.assign(i.style,o.title);let r=document.createElement("div");Object.assign(r.style,o.text);let p=document.createElement("div");Object.assign(p.style,o.dotsContainer);let l=document.createElement("div");Object.assign(l.style,o.btnContainer);let d=document.createElement("button");d.textContent="Pular",Object.assign(d.style,o.btn,o.btnSkip),d.onmouseover=()=>d.style.color="#202124",d.onmouseout=()=>d.style.color="#5f6368";let c=document.createElement("button");c.textContent="Pr\xF3ximo",Object.assign(c.style,o.btn,o.btnNext),c.onmouseover=()=>c.style.transform="scale(1.05)",c.onmouseout=()=>c.style.transform="scale(1)",l.appendChild(d),l.appendChild(c),a.appendChild(s),a.appendChild(i),a.appendChild(r),a.appendChild(p),a.appendChild(l),n.appendChild(a),document.body.appendChild(n);function h(m){let g=t[m];s.textContent=g.icon,i.textContent=g.title,r.textContent=g.text,p.innerHTML="",t.forEach((y,w)=>{let R=document.createElement("div");Object.assign(R.style,o.dot),w===m&&Object.assign(R.style,o.dotActive),p.appendChild(R)}),g.isLast?(d.style.display="none",c.textContent="Come\xE7ar \u{1F680}",c.style.width="100%"):(d.style.display="block",c.textContent="Pr\xF3ximo",c.style.width="auto")}function b(){localStorage.setItem("cw_onboarding_seen_v1","true"),n.style.opacity="0",a.style.transform="translateY(20px)",setTimeout(()=>n.remove(),400),$.playSuccess(),K("Tudo pronto! Use o menu flutuante.")}c.onclick=()=>{$.playClick(),e<t.length-1?(e++,h(e)):b()},d.onclick=async()=>{await ge("Pular o tutorial?")&&b()},h(0),requestAnimationFrame(()=>{n.style.opacity="1",a.style.transform="translateY(0)"})}var yo={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function vo(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&Uo(t)}function Uo(t){let e=yo.slides,o=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,n.overlay);let s=document.createElement("div");Object.assign(s.style,n.card);let i=document.createElement("div");Object.assign(i.style,n.badge),i.textContent=`Atualiza\xE7\xE3o ${t}`;let r=document.createElement("div");Object.assign(r.style,n.icon);let p=document.createElement("div");Object.assign(p.style,n.title);let l=document.createElement("div");Object.assign(l.style,n.text);let d=document.createElement("div");Object.assign(d.style,n.dotsContainer);let c=document.createElement("button");Object.assign(c.style,n.btn),c.onmouseover=()=>c.style.transform="scale(1.02)",c.onmouseout=()=>c.style.transform="scale(1)",s.appendChild(i),s.appendChild(r),s.appendChild(p),s.appendChild(l),s.appendChild(d),s.appendChild(c),a.appendChild(s),document.body.appendChild(a);function h(m){let g=e[m];r.textContent=g.icon,p.textContent=g.title,l.textContent=g.text,d.innerHTML="",e.forEach((y,w)=>{let R=document.createElement("div");Object.assign(R.style,n.dot),w===m&&Object.assign(R.style,n.dotActive),d.appendChild(R)}),m===e.length-1?c.textContent="Entendi, vamos l\xE1! \u{1F44D}":c.textContent="Pr\xF3ximo"}function b(){localStorage.setItem("cw_last_version",t),a.style.opacity="0",s.style.transform="translateY(30px)",setTimeout(()=>a.remove(),400),$.playSuccess(),K(`TechSol atualizado para ${t}!`)}c.onclick=()=>{$.playClick(),o<e.length-1?(o++,h(o)):b()},h(0),requestAnimationFrame(()=>{a.style.opacity="1",s.style.transform="translateY(0)"})}var wo="cw_timezone_pinned",Tt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],Wo=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function So(){let t="v2.2 Pro",e=!1,o=null,n="mx",a=JSON.parse(localStorage.getItem(wo)||"[]"),s="",i="all",r=new Date;r.setHours(14,0,0,0);let p={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},l={container:{display:"flex",flexDirection:"column",height:"100%",background:p.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:p.surface,borderBottom:`1px solid ${p.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:p.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:p.primary,borderBottomColor:p.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:p.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:p.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${p.border}`,background:p.surface,color:p.textSub,transition:"all 0.2s"},chipActive:{background:p.primaryBg,color:p.primary,borderColor:p.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:p.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${p.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:p.surface,border:`1px solid ${p.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:p.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},d=document.createElement("div");d.id="timezone-popup",d.classList.add("cw-module-window"),Object.assign(d.style,ce,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let h=de(d,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:d},()=>C());d.appendChild(h);let b=document.createElement("div");Object.assign(b.style,l.container),d.appendChild(b);let m=document.createElement("div");Object.assign(m.style,l.tabHeader);let g=document.createElement("div");g.textContent="Monitoramento",Object.assign(g.style,l.tabBtn,l.tabActive);let y=document.createElement("div");y.textContent="Planejador",Object.assign(y.style,l.tabBtn),m.appendChild(g),m.appendChild(y),b.appendChild(m);let w=document.createElement("div");Object.assign(w.style,l.toolbar);let R=document.createElement("div");Object.assign(R.style,l.searchInputWrapper);let z=document.createElement("div");z.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(z.style,l.searchIcon);let j=document.createElement("input");j.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(j.style,l.searchInput),j.onfocus=()=>{j.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",j.style.borderColor="rgba(26,115,232,0.3)"},j.onblur=()=>{j.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",j.style.borderColor="transparent"},j.oninput=O=>{s=O.target.value.toLowerCase(),A()},R.appendChild(z),R.appendChild(j),w.appendChild(R);let J=document.createElement("div");Object.assign(J.style,l.chipsRow),Wo.forEach(O=>{let F=document.createElement("div");F.textContent=O.label,F.id=`tz-filter-${O.id}`,Object.assign(F.style,l.chip),O.id===i&&Object.assign(F.style,l.chipActive),F.onclick=()=>{$.playClick(),i=O.id,Array.from(J.children).forEach(v=>{Object.assign(v.style,l.chip)}),Object.assign(F.style,l.chipActive),A()},J.appendChild(F)}),w.appendChild(J),b.appendChild(w);let X=document.createElement("div");Object.assign(X.style,l.listContainer);let L=document.createElement("style");L.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",b.appendChild(L);let k=document.createElement("div");Object.assign(k.style,l.plannerWrapper,{display:"none"}),b.appendChild(X),b.appendChild(k),g.onclick=()=>B("live"),y.onclick=()=>B("plan");function B(O){$.playClick(),O==="live"?(Object.assign(g.style,l.tabActive),Object.assign(y.style,l.tabBtn),y.style.borderBottomColor="transparent",X.style.display="flex",w.style.display="flex",k.style.display="none",I()):(Object.assign(y.style,l.tabActive),Object.assign(g.style,l.tabBtn),g.style.borderBottomColor="transparent",k.style.display="flex",X.style.display="none",w.style.display="none",f(),S())}function G(O){return O>=9&&O<17?{color:p.success,bg:p.successBg,label:"Aberto",icon:"\u{1F7E2}"}:O>=8&&O<9?{color:p.warning,bg:p.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:O>=17&&O<19?{color:p.warning,bg:p.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:p.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function _(O){a.includes(O)?a=a.filter(F=>F!==O):a.push(O),localStorage.setItem(wo,JSON.stringify(a)),A(),$.playClick()}function A(){X.innerHTML="";let O=new Date,F=Tt.filter(E=>{let M=E.name.toLowerCase().includes(s)||E.label.toLowerCase().includes(s),x=i==="all"||E.region===i;return M&&x});if(F.sort((E,M)=>{let x=a.includes(E.id),q=a.includes(M.id);return x&&!q?-1:!x&&q?1:E.name.localeCompare(M.name)}),F.length===0){X.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}F.forEach(E=>{let M=a.includes(E.id),x=O.toLocaleTimeString("pt-BR",{timeZone:E.zone,hour:"2-digit",minute:"2-digit"}),q=parseInt(x.split(":")[0]),W=G(q),V=q<6||q>18,u=document.createElement("div");Object.assign(u.style,l.hubCard),M&&Object.assign(u.style,l.hubCardPinned);let N=M?"\u2605":"\u2606",T=M?"#F9AB00":"#DADCE0";u.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${T}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${N}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${E.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${p.text}; letter-spacing:-0.2px;">${E.name}</div>
                        <div style="font-size:12px; color:${p.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${V?"\u{1F319}":"\u2600\uFE0F"} ${E.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${p.text}; font-family:'Google Sans', sans-serif;">${x}</div>
                    <div style="font-size:11px; font-weight:600; color:${W.color}; background:${W.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${W.label}
                    </div>
                </div>
            `,u.onmouseenter=()=>{u.style.transform="translateY(-2px)",u.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},u.onmouseleave=()=>{u.style.transform="translateY(0)",u.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let Y=u.querySelector(".cw-pin-btn");Y.onmouseenter=()=>{Y.style.backgroundColor="#F1F3F4"},Y.onmouseleave=()=>{Y.style.backgroundColor="transparent"},Y.onclick=H=>{H.stopPropagation(),_(E.id)},u.onclick=()=>{n=E.id,B("plan")},X.appendChild(u)});let v=document.createElement("div");v.style.height="20px",v.style.width="100%",X.appendChild(v)}function S(){k.innerHTML="";let O=document.createElement("div"),F=document.createElement("label");F.textContent="Onde est\xE1 o cliente?",F.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let v=document.createElement("select");Object.assign(v.style,Je),v.style.padding="14px",[...Tt].sort((ee,Z)=>ee.name.localeCompare(Z.name)).forEach(ee=>{let Z=document.createElement("option");Z.value=ee.id,Z.textContent=`${ee.flag} ${ee.name} (${ee.zone})`,ee.id===n&&(Z.selected=!0),v.appendChild(Z)}),v.onchange=ee=>{n=ee.target.value,oe(),$.playClick()},O.appendChild(F),O.appendChild(v),k.appendChild(O);let M=document.createElement("div");Object.assign(M.style,l.timeComparisonRow);let x=document.createElement("div");Object.assign(x.style,l.timeCard),x.style.backgroundColor="#F8FAFF",x.style.borderColor="#E8F0FE",x.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let q=document.createElement("div");Object.assign(q.style,l.timeCard),q.style.backgroundColor="#FFF8E1",q.style.borderColor="#FEF7E0",q.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,M.appendChild(x),M.appendChild(q),k.appendChild(M);let W=document.createElement("div");W.id="cw-planner-status",Object.assign(W.style,l.statusBadge),k.appendChild(W);let V=document.createElement("div");Object.assign(V.style,{padding:"0 4px",marginTop:"12px"});let u=document.createElement("div");u.textContent="Arraste para simular o hor\xE1rio:",u.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let N=document.createElement("div");Object.assign(N.style,l.timelineContainer);let T=document.createElement("div");Object.assign(T.style,l.timelineTrack);let Y=document.createElement("div");Object.assign(Y.style,l.dayZone),T.appendChild(Y);let H=document.createElement("input");H.type="range",H.min="0",H.max="1439",H.step="15",H.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let Q=document.createElement("div");Q.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",Q.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",N.appendChild(T),N.appendChild(H),N.appendChild(Q),V.appendChild(u),V.appendChild(N),k.appendChild(V);let U=x.querySelector("#cw-time-input-br"),te=q.querySelector("#cw-time-display-client"),ae=q.querySelector("#cw-client-label");function oe(){let ee=Tt.find(Eo=>Eo.id===n);ae.textContent=`${ee.flag} ${ee.label} (${ee.zone})`;let Z=r.getHours(),me=r.getMinutes(),Ye=`${String(Z).padStart(2,"0")}:${String(me).padStart(2,"0")}`;U.value=Ye,H.value=Z*60+me;let kt=r.toLocaleTimeString("pt-BR",{timeZone:ee.zone,hour:"2-digit",minute:"2-digit"});te.textContent=kt;let De=parseInt(kt.split(":")[0]);De>=9&&De<17?(W.style.background=p.successBg,W.style.color=p.success,W.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):De>=8&&De<9||De>=17&&De<19?(W.style.background=p.warningBg,W.style.color=p.warning,W.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(W.style.background=p.errorBg,W.style.color=p.error,W.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}H.oninput=ee=>{let Z=parseInt(ee.target.value);r.setHours(Math.floor(Z/60)),r.setMinutes(Z%60),oe()},U.oninput=ee=>{let[Z,me]=ee.target.value.split(":");Z&&me&&(r.setHours(parseInt(Z)),r.setMinutes(parseInt(me)),oe())},oe()}function I(){A(),o||(o=setInterval(A,6e4))}function f(){o&&(clearInterval(o),o=null)}function C(){e=!e,ue(e,d,"cw-btn-timezone"),e?B("live"):f()}return document.body.appendChild(d),C}function Co(){let t="v1.1",e=!1,o="general",n=null,a=null;if(!document.getElementById("cw-lib-styles")){let S=document.createElement("style");S.id="cw-lib-styles",S.innerHTML=`
            .cw-lib-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .cw-lib-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; border-color: rgba(0, 122, 255, 0.3) !important; }
            .cw-tactile { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.92) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #5F6368; }
            .cw-toolbar-btn:hover { background: #F1F3F4; color: #007AFF; border-color: #DADCE0; }
            .cw-toolbar-btn.active { background: #E8F0FE; color: #007AFF; border-color: #007AFF; }
        `,document.head.appendChild(S)}let s={bg:"#F0F2F5",surface:"#FFFFFF",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",text:"#1C1C1E",textSub:"#8E8E93",border:"rgba(0, 0, 0, 0.08)",danger:"#FF3B30"},i={container:{display:"flex",flexDirection:"column",height:"100%",background:s.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"12px 16px 0 16px",background:s.surface,borderBottom:`1px solid ${s.border}`},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:s.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",userSelect:"none"},tabActive:{color:s.primary,borderBottomColor:s.primary,fontWeight:"600"},listContainer:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"},emptyState:{padding:"40px 20px",textAlign:"center",color:"#BDC1C6",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},card:{background:s.surface,borderRadius:"16px",padding:"16px",border:`1px solid ${s.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative",overflow:"hidden"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},cardTitle:{fontSize:"14px",fontWeight:"600",color:s.text},cardPreview:{fontSize:"12px",color:s.textSub,lineHeight:"1.5",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"12px",paddingTop:"12px",borderTop:`1px dashed ${s.border}`},actionBtn:{padding:"6px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",cursor:"pointer",border:"none",background:"transparent",transition:"background 0.2s"},fab:{position:"absolute",bottom:"24px",right:"24px",width:"56px",height:"56px",borderRadius:"16px",background:s.primary,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"transform 0.2s",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.85)",backdropFilter:"blur(25px) saturate(180%)",webkitBackdropFilter:"blur(25px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"16px 24px",background:s.surface,borderBottom:`1px solid ${s.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"24px",overflowY:"auto"},inputGroup:{marginBottom:"20px"},label:{display:"block",fontSize:"12px",fontWeight:"700",color:s.textSub,marginBottom:"8px",textTransform:"uppercase"},input:{width:"100%",padding:"12px",borderRadius:"8px",border:`1px solid ${s.border}`,fontSize:"14px",fontFamily:"inherit",outline:"none",background:s.surface,boxSizing:"border-box"}},r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,ce,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let l=de(r,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:r},()=>A());r.appendChild(l);let d=document.createElement("div");Object.assign(d.style,i.container),r.appendChild(d);let c=document.createElement("div");Object.assign(c.style,i.tabHeader);let h=[{id:"general",label:"Geral",icon:"\u{1F4CB}"},{id:"note",label:"Notas",icon:"\u{1F4DD}"},{id:"email",label:"Emails",icon:"\u{1F4E7}"}];h.forEach(S=>{let I=document.createElement("div");I.innerHTML=`${S.icon} ${S.label}`,I.id=`lib-tab-${S.id}`,Object.assign(I.style,i.tabBtn),S.id===o&&Object.assign(I.style,i.tabActive),I.onmouseenter=()=>$.playHover(),I.onclick=()=>J(S.id),c.appendChild(I)}),d.appendChild(c);let b=document.createElement("div");Object.assign(b.style,i.listContainer),d.appendChild(b);let m=document.createElement("div");m.className="cw-fab cw-tactile",Object.assign(m.style,i.fab),m.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',m.onmouseenter=()=>m.style.transform="scale(1.1)",m.onmouseleave=()=>m.style.transform="scale(1)",m.onclick=()=>L(),d.appendChild(m),n=document.createElement("div"),Object.assign(n.style,i.editorOverlay);let g=document.createElement("div");Object.assign(g.style,i.editorHeader),g.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let y=document.createElement("button");y.innerHTML="Cancelar",y.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",y.onclick=k,g.appendChild(y),n.appendChild(g);let w=document.createElement("div");Object.assign(w.style,i.editorBody),n.appendChild(w);let R=document.createElement("div");R.style.cssText="padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";let z=document.createElement("button");z.textContent="Salvar",z.style.cssText="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);",z.onclick=B,R.appendChild(z),n.appendChild(R),d.appendChild(n);let j=document.createElement("div");Object.assign(j.style,Se),j.className="no-drag",r.appendChild(j),Ce(r,j),document.body.appendChild(r);function J(S){$.playClick(),o=S,h.forEach(I=>{let f=document.getElementById(`lib-tab-${I.id}`);I.id===S?Object.assign(f.style,i.tabActive):Object.assign(f.style,i.tabBtn)}),X()}function X(){b.innerHTML="";let S=be.getSnippets(o);if(S.length===0){b.innerHTML=`
                <div style="${_(i.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;return}S.forEach(I=>{let f=document.createElement("div");f.className="cw-lib-card",Object.assign(f.style,i.card),I.isCode&&(f.style.borderLeft=`4px solid ${s.primary}`,f.style.background="rgba(0, 122, 255, 0.02)");let C=I.content;if(I.isRich){let O=document.createElement("div");O.innerHTML=I.content;let F=O.querySelector("img");C=O.innerText.substring(0,150)+(O.innerText.length>150?"...":""),F&&(C="\u{1F5BC}\uFE0F [Cont\xE9m Imagens] "+C)}f.innerHTML=`
                <div style="${_(i.cardHeader)}">
                    <div style="${_(i.cardTitle)}">${I.title}</div>
                    <div style="display:flex; gap:4px;">
                        ${I.isCode?'<span style="font-size:10px; background:#F1F3F4; color:#5F6368; padding:2px 6px; border-radius:4px; font-family:monospace;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>':""}
                    </div>
                </div>
                <div style="${_(i.cardPreview)}; ${I.isCode?"font-family:'Roboto Mono', monospace; font-size:11px;":""}">${C}</div>
                <div style="${_(i.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${_(i.actionBtn)}; color:#007AFF; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${_(i.actionBtn)}; color:#8E8E93; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${_(i.actionBtn)}; color:#FF3B30; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                    </button>
                </div>
            `,f.onmouseenter=()=>{$.playHover()},f.querySelector(".cw-act-copy").onclick=O=>{if(O.stopPropagation(),$.playClick(),I.isRich){let F=new Blob([I.content],{type:"text/html"}),v=document.createElement("div");v.style.whiteSpace="pre-wrap",v.innerHTML=I.content;let E=new Blob([v.innerText],{type:"text/plain"}),M=[new ClipboardItem({"text/html":F,"text/plain":E})];navigator.clipboard.write(M)}else navigator.clipboard.writeText(I.content);K("Copiado!")},f.querySelector(".cw-act-edit").onclick=O=>{O.stopPropagation(),$.playClick(),L(I)},f.querySelector(".cw-act-del").onclick=async O=>{O.stopPropagation(),$.playClick(),await ge("Excluir este item?")&&(be.delete(I.id),X(),K("Item exclu\xEDdo."))},b.appendChild(f)})}function L(S=null){a=S?S.id:null,w.innerHTML="",w.appendChild(G("title","T\xEDtulo / Nome",S?S.title:"")),o==="email"&&w.appendChild(G("subject","Assunto do Email",S?S.subject:""));let I="Conte\xFAdo";o==="email"&&(I="Corpo do Email (HTML)"),o==="note"&&(I="Texto da Nota (Reason)"),w.appendChild(G("content",I,S?S.content:"",{isRich:!0,isCode:S?S.isCode:!1})),g.querySelector("span").textContent=S?"Editar Item":"Novo Item",n.style.transform="translateY(0)",setTimeout(()=>{let f=w.querySelector("input");f&&f.focus()},300)}function k(){n.style.transform="translateY(100%)",setTimeout(()=>a=null,300)}async function B(){let S=w.querySelector("#cw-inp-title"),I=w.querySelector("#cw-inp-content"),f=S.value.trim(),C=I.contentEditable==="true"?I.innerHTML:I.value.trim(),O=I.getAttribute("data-is-code")==="true";if(!f||!C||C==="<br>"){K("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let F={id:a,type:o,title:f,content:C,isCode:O,isRich:I.contentEditable==="true"};if(o==="email"){let v=w.querySelector("#cw-inp-subject").value.trim();if(!v){K("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}F.subject=v}z.textContent="Salvando...",await be.save(F),z.textContent="Salvar",k(),X(),K("Salvo com sucesso!"),$.playSuccess()}function G(S,I,f,C={}){let O=document.createElement("div");Object.assign(O.style,i.inputGroup);let F=document.createElement("label");F.textContent=I,Object.assign(F.style,i.label);let v;if(C.isRich){let E=document.createElement("div");E.style.cssText="display:flex; gap:6px; margin-bottom:12px; background:rgba(241, 243, 244, 0.8); padding:6px; border-radius:12px; border:1px solid #DADCE0; backdrop-filter: blur(10px);",E.innerHTML=`
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
            `,v=document.createElement("div"),v.contentEditable="true",Object.assign(v.style,i.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),v.innerHTML=f||"",C.isCode&&(v.style.fontFamily="'Roboto Mono', monospace",v.style.backgroundColor="#F8F9FA",v.setAttribute("data-is-code","true")),E.querySelectorAll(".cw-toolbar-btn").forEach(M=>{M.onmouseenter=()=>$.playHover(),M.onmousedown=()=>$.playClick()}),E.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),v.focus()},E.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),v.focus()},E.querySelector(".cw-tb-code").onclick=M=>{let q=!(v.getAttribute("data-is-code")==="true");v.setAttribute("data-is-code",q),v.style.fontFamily=q?"'Roboto Mono', monospace":"inherit",v.style.backgroundColor=q?"rgba(0, 122, 255, 0.03)":s.surface,q?M.currentTarget.classList.add("active"):M.currentTarget.classList.remove("active"),v.focus()},E.querySelector(".cw-tb-img").onclick=async()=>{let M=await Ht("Cole a URL da imagem:");M&&(document.execCommand("insertImage",!1,M),v.querySelectorAll("img").forEach(q=>{q.style.maxWidth="100%",q.style.borderRadius="8px"}))},v.onpaste=M=>{let x=(M.clipboardData||M.originalEvent.clipboardData).items;for(let q of x)if(q.kind==="file"&&q.type.startsWith("image/")){M.preventDefault();let W=q.getAsFile(),V=new FileReader;V.onload=u=>{let N=`<img src="${u.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,N)},V.readAsDataURL(W)}},O.appendChild(F),O.appendChild(E)}else v=document.createElement("input"),v.type="text",Object.assign(v.style,i.input),v.value=f||"",O.appendChild(F);return v.id=`cw-inp-${S}`,v.onfocus=()=>{v.style.borderColor=s.primary,v.style.boxShadow=`0 0 0 2px ${s.primaryBg}`},v.onblur=()=>{v.style.borderColor=s.border,v.style.boxShadow="none"},O.appendChild(v),O}function _(S){return Object.entries(S).map(([I,f])=>`${I.replace(/[A-Z]/g,C=>"-"+C.toLowerCase())}:${f}`).join(";")}function A(){e=!e,ue(e,r,"cw-btn-library"),e&&X()}return A}function Ao(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},n="cw-configs-styles";if(!document.getElementById(n)){let h=document.createElement("style");h.id=n,h.innerHTML=`
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
        `,document.head.appendChild(h)}let a=document.createElement("div");a.id="configs-popup",a.classList.add("cw-module-window"),Object.assign(a.style,ce,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let i=de(a,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:a},()=>c());a.appendChild(i);let r=document.createElement("div");r.className="cw-configs-container",a.appendChild(r);let p=document.createElement("div");p.className="cw-configs-section",p.innerHTML=`
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
    `;let l=p.querySelector("#cw-config-sound-toggle");l.onchange=h=>{$.setMuted(!h.target.checked),h.target.checked&&$.playClick()},r.appendChild(p);let d=document.createElement("div");d.className="cw-configs-section",d.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugest\xF5es</a>
            </div>
        </div>
    `,r.appendChild(d);function c(){e=!e,ue(e,a,"cw-btn-configs"),e&&$.playClick()}return document.body.appendChild(a),c}function Yo(){if(window.techSolInitialized){bt();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{Mt();try{$.initGlobalListeners(),$.playStartup()}catch(l){console.warn("\xC1udio bloqueado:",l)}re.fetchTips(),bt();let e=ro(),o=uo(),n=go(),a=bo(),s=So(),i=Co(),r=Ao(),p=xo();Qt({toggleNotes:e,toggleEmail:o,toggleScript:n,toggleLinks:a,toggleTimezone:s,toggleLibrary:i,toggleConfigs:r,broadcastControl:p}),setTimeout(()=>{re.logEvent("App","Start","Session Start"),ho(),setTimeout(()=>{vo(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),K("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Yo();})();
