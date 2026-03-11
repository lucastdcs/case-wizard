(()=>{var So=Object.defineProperty;var Co=(t,e)=>()=>(t&&(e=t(t=0)),e);var Ao=(t,e)=>{for(var o in e)So(t,o,{get:e[o],enumerable:!0})};var Ke={};Ao(Ke,{NotesState:()=>Xe,notesState:()=>U});var Xe,U,Pe=Co(()=>{Xe=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.excludedFields=new Set,this.favorites=new Set(JSON.parse(localStorage.getItem("cw-notes-favorites")||"[]")),this.screenshotMode="implementation"}setCaseType(e){this.currentCaseType=e,this.isDirty=!0,this.notify()}setLanguage(e){this.currentLang=e,this.notify()}setPortugalCase(e){this.isPortugalCase=e,this.isDirty=!0,this.notify()}setConsent(e){this.consent=e,this.isDirty=!0,this.notify()}setTagSupportUsed(e){this.tagSupportUsed=e,e||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setForcedScreenshots(e){this.forcedScreenshots=new Set(e),this.isDirty=!0,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.isDirty=!0,this.notify()}setExcludedFields(e){this.excludedFields=new Set(e),this.isDirty=!0,this.notify()}toggleFieldExclusion(e,o){o?this.excludedFields.add(e):this.excludedFields.delete(e),this.isDirty=!0,this.notify()}setStatus(e){this.currentStatus=e,this.isDirty=!0,this.notify()}setSubStatus(e){this.currentSubStatus=e,this.isDirty=!0,this.notify()}setScreenshotMode(e){this.screenshotMode=e,this.notify()}setActiveTasks(e){this.activeTasks=e,this.isDirty=!0,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]=o,this.isDirty=!0,this.notify()}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},U=new Xe});var Ue="",We="",Tt=t=>new Promise(e=>setTimeout(e,t));async function kt(){if(Ue&&We)return Ue;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Tt(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let i=document.querySelector("profile-details img");if(i&&i.src.includes("/photos/")){let a=i.src.match(/\/photos\/([^\?]+)/)[1];e=a.charAt(0).toUpperCase()+a.slice(1)}}let n=document.querySelector("profile-details .email");return n&&(We=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",We)),t.click(),document.body.click(),Ue=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function pt(){return Ue||"Consultor"}function Ee(){return We||null}function Ot(t){let e=new Date,o=e.getHours(),n=e.getDay(),i="Ol\xE1",a="";o>=5&&o<12?(i="Bom dia",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(i="Boa tarde",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(i="Boa noite",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let s=[];o>=0&&o<5?s=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?n===1?s=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?s=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:s=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?s=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:s=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(s=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=s[Math.floor(Math.random()*s.length)];return{prefix:`${i},`,name:t,suffix:r,icon:a,isFriday:n===5}}async function Eo(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,n=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');n&&(n.click(),await Tt(500));let a=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(s=>{let r=s.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return a?a.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function To(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function ko(){try{let e=Array.from(document.querySelectorAll(".data-pair-label")).find(i=>i.textContent.includes("Google Ads External Customer ID")||i.textContent.includes("Customer ID"));if(e){let i=e.closest("home-data-item")||e.parentElement;if(i){let a=i.querySelector(".data-pair-content");if(a)return a.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let n=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(n)return n[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"---"}async function ve(){let t="Cliente",e="[INSERIR URL]";try{let s=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(s&&s.nextElementSibling){let r=s.nextElementSibling.innerText.trim();r&&(t=r)}}catch(a){console.warn("Falha Nome:",a)}try{let s=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(s&&s.nextElementSibling){let r=s.nextElementSibling.innerText.trim();r&&(e=r)}}catch(a){console.warn("Falha URL:",a)}let o=await Eo(),n=To(),i=ko();return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:n,cid:i,agentName:pt()}}var Fe=null,ut=null,we=.3;var Se=localStorage.getItem("cw_sounds_muted")==="true";function Ie(){if(!Fe){let t=window.AudioContext||window.webkitAudioContext;t&&(Fe=new t)}return Fe&&Fe.state==="suspended"&&Fe.resume(),Fe}function It(t){if(ut)return ut;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),n=o.getChannelData(0);for(let i=0;i<e;i++)n[i]=Math.random()*2-1;return ut=o,o}var j={setMuted:t=>{Se=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>Se,playClick:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=It(t);let n=t.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let i=t.createGain();i.gain.setValueAtTime(we*.8,e),i.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(n),n.connect(i),i.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(we*.1,e+.005),n.gain.linearRampToValueAtTime(0,e+.02),o.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((n,i)=>{let a=t.createOscillator(),s=t.createGain();a.type="sine",a.frequency.value=n,s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(we*.6,e+.05),s.gain.exponentialRampToValueAtTime(.001,e+.6),a.connect(s),s.connect(t.destination),a.start(e),a.stop(e+.7)})},playGenieOpen:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=It(t);let n=t.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,e),n.frequency.exponentialRampToValueAtTime(800,e+.2);let i=t.createGain();i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(we*.5,e+.05),i.gain.linearRampToValueAtTime(0,e+.25),o.connect(n),n.connect(i),i.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime,o=t.createOscillator(),n=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),n.gain.setValueAtTime(we,e),n.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime,o=.12,n=t.createOscillator(),i=t.createGain(),a=t.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,e),n.frequency.exponentialRampToValueAtTime(50,e+.1),a.type="lowpass",a.frequency.setValueAtTime(800,e),a.frequency.exponentialRampToValueAtTime(100,e+.1),i.gain.setValueAtTime(we*4,e),i.gain.exponentialRampToValueAtTime(.001,e+.1),n.connect(a),a.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.12);let s=t.createOscillator(),r=t.createGain();s.type="sine",s.frequency.setValueAtTime(150,e),s.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(we*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),s.connect(r),r.connect(t.destination),s.start(e),s.stop(e+.15),[55,55.4,110.5].forEach(d=>{let c=t.createOscillator(),g=t.createGain(),x=t.createBiquadFilter();c.type="sawtooth",c.frequency.value=d,x.type="lowpass",x.frequency.setValueAtTime(30,e),x.frequency.linearRampToValueAtTime(900,e+o+.2),x.frequency.exponentialRampToValueAtTime(40,e+3),g.gain.setValueAtTime(0,e),g.gain.linearRampToValueAtTime(we*.6,e+o+.1),g.gain.exponentialRampToValueAtTime(.001,e+3.5),c.connect(x),x.connect(g),g.connect(t.destination),c.start(e),c.stop(e+3.6)})},playNotification:()=>{if(Se)return;let t=Ie();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.setValueAtTime(n.freq,e),a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(we*n.vol,e+.004),a.gain.exponentialRampToValueAtTime(.001,e+n.dur),i.connect(a),a.connect(t.destination),i.start(e),i.stop(e+n.dur+.1)})},playSwoosh:()=>{j.playGenieOpen()},playReset:()=>{j.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!Fe)return;let n=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(o.relatedTarget))return;let i=Date.now();i-t<e||(j.playHover(),t=i)},{passive:!0})}};var Ft=1e4;function Lt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function Y(t,e={}){let o=document.createElement("div"),n=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?j.playError():j.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function _t(t,e=null){let o=0,n=0,i=0,a=0,s=e||t;s.style.cursor="grab",s.onmousedown=r;function r(c){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(c.target.tagName)||c.target.closest(".no-drag"))return;c=c||window.event,s.style.cursor="grabbing",t.style.transition="none";let g=t.getBoundingClientRect();t.style.transform="none",t.style.left=g.left+"px",t.style.top=g.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",Ft++,t.style.zIndex=Ft,i=c.clientX,a=c.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=d,document.onmousemove=p}function p(c){c=c||window.event,c.preventDefault(),o=i-c.clientX,n=a-c.clientY,i=c.clientX,a=c.clientY;let g=t.offsetTop-n,x=t.offsetLeft-o,u=16,m=window.innerWidth,l=window.innerHeight,v=t.offsetWidth,E=t.offsetHeight;x<u?x=u:x+v>m-u&&(x=m-v-u),g<u?g=u:g+E>l-u&&(g=l-E-u),t.style.top=g+"px",t.style.left=x+"px"}function d(){document.onmouseup=null,document.onmousemove=null,s.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var le={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var gt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Ye={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Mt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Ge={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var mt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],qt=-1;function Dt(){let t=Math.floor(Math.random()*mt.length);return t===qt&&(t=(t+1)%mt.length),qt=t,mt[t]}var Ce=t=>new Promise(e=>setTimeout(e,t));async function Oo(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await Ce(200);for(let n=0;n<e.length;n++){let i=e.charAt(n),a=document.createElement("span");a.textContent=i,o&&o.parentNode===t?o.before(a):t.appendChild(a);let s=Math.floor(Math.random()*60)+30;n===0&&(s=150),n>e.length-3&&(s=30),await Ce(s)}await Ce(600),o&&(o.style.display="none")}async function bt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Ce(200);let e=await kt(),o=Ot(e),n=t.querySelector("#w-icon"),i=t.querySelector("#p1"),a=t.querySelector("#p2"),s=t.querySelector("#p3"),r=t.querySelector("#p-sextou");n&&(n.innerHTML=o.icon),i&&(i.textContent=o.prefix),s&&(s.textContent=o.suffix),await Ce(300);let p=n?n.querySelector("svg"):null;if(p&&(p.style.opacity="1",p.style.transform="scale(1)"),await Ce(400),i&&(i.style.opacity="1"),j.playStartup(),a&&await Oo(a,o.name),s&&(s.style.opacity="1",s.style.transform="translateY(0)"),o.isFriday&&r){await Ce(400),r.style.display="block",r.offsetWidth;let d=r.querySelector(".sextou-badge");d&&(d.style.opacity="1",d.style.transform="scale(1)")}await Ce(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Ce(900),t.parentNode&&t.parentNode.removeChild(t)}}var Te={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function ke(t,e){e.onmousedown=o;function o(n){n.stopPropagation(),n.preventDefault();let i=t.style.transition;t.style.transition="none";let a=n.clientX,s=n.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),p=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),d=a,c=s,g=!1;function x(l){d=l.clientX,c=l.clientY,g||(window.requestAnimationFrame(()=>{u(),g=!1}),g=!0)}function u(){let l=r+(d-a),v=p+(c-s);l>360&&(t.style.width=l+"px"),v>300&&(t.style.height=v+"px")}function m(){document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",m),setTimeout(()=>{t.style.transition=i},50)}document.addEventListener("mousemove",x),document.addEventListener("mouseup",m)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function Nt(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function Rt(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function zt(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function he(t,e={}){return new Promise(o=>{let n=Rt(),i=zt(),a=e.danger?"#FF3B30":"#007AFF",s=e.confirmText||(e.danger?"Excluir":"Confirmar");i.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${a}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${s}</button>
            </div>
        `,n.appendChild(i),document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity=1,i.style.transform="scale(1)"});let r=c=>{n.style.opacity=0,i.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(c)},300)},p=i.querySelector("#cw-conf-cancel"),d=i.querySelector("#cw-conf-ok");[p,d].forEach(c=>c.onmouseenter=()=>j.playHover()),p.onclick=()=>{j.playClick(),r(!1)},d.onclick=()=>{j.playClick(),r(!0)}})}function Bt(t,e=""){return new Promise(o=>{let n=Rt(),i=zt();i.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,n.appendChild(i),document.body.appendChild(n);let a=i.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{n.style.opacity=1,i.style.transform="scale(1)",setTimeout(()=>a.focus(),100)});let s=d=>{n.style.opacity=0,i.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(d)},300)},r=i.querySelector("#cw-prompt-cancel"),p=i.querySelector("#cw-prompt-ok");[r,p].forEach(d=>d.onmouseenter=()=>j.playHover()),r.onclick=()=>{j.playClick(),s(null)},p.onclick=()=>{j.playClick(),s(a.value)},a.onkeydown=d=>{d.key==="Enter"&&p.click(),d.key==="Escape"&&r.click()}})}Pe();var Io={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Gt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function ce(t,e,o,n,i,a){let s=document.createElement("div");Object.assign(s.style,Io),_t(t,s);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),s.appendChild(r),i&&(i.googleLine=r);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"12px"});let d=document.createElement("img");d.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(d.style,{width:"20px",height:"20px",pointerEvents:"none"});let c=document.createElement("span");c.textContent=e,p.appendChild(d),p.appendChild(c);let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center",gap:"4px"});let x='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',u='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',m=document.createElement("div");m.innerHTML=x,Object.assign(m.style,Gt),m.title="Sobre & Feedback",m.classList.add("no-drag"),m.onmouseenter=()=>{m.style.background="rgba(255,255,255,0.1)",m.style.color="#FFF"},m.onmouseleave=()=>{m.style.color!=="rgb(138, 180, 248)"&&(m.style.background="transparent",m.style.color="#9AA0A6")};let l=document.createElement("div");l.innerHTML=u,Object.assign(l.style,Gt),l.title="Fechar",l.classList.add("no-drag"),l.onmouseenter=()=>{l.style.background="rgba(242, 139, 130, 0.2)",l.style.color="#F28B82"},l.onmouseleave=()=>{l.style.background="transparent",l.style.color="#9AA0A6"},l.onmousedown=E=>E.stopPropagation(),m.onmousedown=E=>E.stopPropagation(),l.onclick=a;let v=Fo(t,e,o,n);return m.onclick=E=>{E.stopPropagation(),v.style.opacity==="1"?(v.style.opacity="0",v.style.pointerEvents="none",m.style.color="#9AA0A6",m.style.background="transparent"):(v.style.opacity="1",v.style.pointerEvents="auto",m.style.color="#8AB4F8",m.style.background="rgba(138, 180, 248, 0.1)")},g.appendChild(m),g.appendChild(l),s.appendChild(p),s.appendChild(g),s}function Fo(t,e,o,n){let i=document.createElement("div");return Object.assign(i.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),i.innerHTML=`
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
    `,setTimeout(()=>{let a=i.querySelector("#cw-feedback-link");a&&(a.onmouseenter=()=>{a.style.backgroundColor="#E8F0FE",a.style.transform="scale(1.02)"},a.onmouseleave=()=>{a.style.backgroundColor="#F8F9FA",a.style.transform="scale(1)"});let s=i.querySelector("#close-help-internal");s&&(s.onmouseover=()=>s.style.backgroundColor="#f8f9fa",s.onmouseout=()=>s.style.backgroundColor="white",s.onclick=()=>{i.style.opacity="0",i.style.pointerEvents="none"})},0),t.appendChild(i),i}var R={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},se={small:"8px",medium:"12px",large:"20px",pill:"100px"},Ne={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},ne="cubic-bezier(0.25, 1, 0.3, 1)",qo={width:"100%",padding:"14px 16px",borderRadius:se.medium,border:`1.5px solid ${R.border}`,backgroundColor:R.bgInput,fontSize:"14px",color:R.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.25s ${ne}`,outline:"none"},Qo={...qo,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},en={fontSize:"12px",fontWeight:"700",color:R.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},tn={display:"block",fontSize:"14px",fontWeight:"600",color:R.text,marginBottom:"10px",marginTop:"20px"},on={fontSize:"12px",color:R.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},ft={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:R.primary},nn={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:R.text,cursor:"pointer",padding:"16px 20px",backgroundColor:R.surface,border:`1px solid ${R.border}`,borderRadius:se.large,transition:`all 0.3s ${ne}`,userSelect:"none",boxShadow:Ne.subtle},an={padding:"14px 28px",color:"#fff",backgroundColor:R.primary,border:"none",borderRadius:se.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.2s ${ne}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},sn={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${R.primary}`,color:R.primary,borderRadius:se.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.2s ${ne}`},rn={background:"transparent",border:`1px solid ${R.border}`,borderRadius:se.pill,color:R.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.2s ${ne}`};function Pt(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,le,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${ne}, height 0.4s ${ne}, transform 0.4s ${ne}, opacity 0.3s ease`,borderRadius:se.large,boxShadow:Ne.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let n={popup:o,googleLine:null},i=ce(o,"Case Notes",t,"Gera notas padronizadas com excel\xEAncia visual.",n,e);o.appendChild(i);let a=document.createElement("div");a.className="cw-popup-content",Object.assign(a.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:R.surface}),o.appendChild(a);let s=document.createElement("div");s.textContent="created by lucaste@",Object.assign(s.style,Mt,{padding:"16px 24px",borderTop:`1px solid ${R.bgInput}`,color:R.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(s);let r=document.createElement("div");return Object.assign(r.style,Te),r.className="no-drag",o.appendChild(r),ke(o,r),Lo(),{popup:o,content:a,header:i,animRefs:n,credit:s}}function Lo(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100%;
            padding: 12px 16px;
            border-radius: ${se.medium};
            border: 1px solid ${R.border};
            font-size: 14px;
            font-family: 'Google Sans', Roboto, sans-serif;
            transition: all 0.2s ${ne};
            box-sizing: border-box;
            background: ${R.bgInput};
            color: ${R.text};
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
            border-color: ${R.primary};
            background: #fff;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15);
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${R.textSub};
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
            background: ${R.bgInput};
        }

        .cw-btn-primary {
            background: ${R.primary};
            color: #fff;
            border: none;
            border-radius: ${se.pill};
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
            color: ${R.textSub};
            border: 1px solid ${R.border};
            border-radius: ${se.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${ne};
        }
        .cw-btn-secondary:hover {
            background: ${R.bgInput};
            border-color: #bdc1c6;
            color: ${R.text};
        }
    `,document.head.appendChild(t)}var be={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria (com um link para https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call (Call Started) signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} Seguimos com os passos:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4DD} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call (Call Started) signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Seguimos con los pasos:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos (Seguimiento):",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4DD} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:"}},xe={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Ae={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},qe={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Re=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Je=["CONSIDERACOES","COMENTARIOS"],Ze={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 2 -`}};var ze=t=>new Promise(e=>setTimeout(e,t));function je(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var jt="cw-automation-styles";if(!document.getElementById(jt)){let t=document.createElement("style");t.id=jt,t.innerHTML=`
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
    `,document.head.appendChild(t)}function $t(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function Ht(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),o="";$t(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(je(n),await ze(1200));let i=document.querySelector("search-filter dropdown-button .button");if(i&&!(i.innerText||"").includes("All")){je(i),await ze(600);let x=document.querySelector('material-checkbox[debug-id="check-all-box"]');x&&x.getAttribute("aria-checked")!=="true"&&(je(x),await ze(300));let u=document.querySelector('material-button[debug-id="apply-filter"]');u&&(je(u),await ze(1500))}let a=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");a&&(a.scrollTop=a.scrollHeight,await ze(500));let s=Array.from(document.querySelectorAll(".message-header"));for(let g=s.length-1;g>=0;g--){let x=s[g],u=x.querySelector("i.material-icons-extended"),m=u&&u.innerText.trim()==="phone_in_talk",l=x.innerText||"",v=l.includes("Agent joined")||l.includes("outbound-call")||l.includes("Speakeasy");if(m||v){x.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",x),e&&(e.placeholder="Lendo mensagem..."),je(x),await ze(1e3));break}}let p=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),d=/Speakeasy.*?(P\d{15,25})/i,c=null;for(let g=p.length-1;g>=0;g--){let x=p[g];if(x.offsetParent===null)continue;let u=(x.innerText||"").match(d);if(u&&u[1]){c=u[1];break}}if(e)if(c){try{await navigator.clipboard.writeText(c)}catch{}e.value=c,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),j.playSuccess(),Y(`ID Localizado: ${c}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else j.playError(),Y("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),Y("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),$t(!1)}}function Vt(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,n=this.selectionEnd,i=this.value,a=i.lastIndexOf(`
`,o-1)+1,s=i.substring(a,o);if(e.key==="Enter"){e.preventDefault();let r=s.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(s.trim()==="\u2022"){this.value=i.substring(0,a)+`
`+i.substring(n),this.selectionStart=this.selectionEnd=a+1;return}let p=`
`+r;this.value=i.substring(0,o)+p+i.substring(n),this.selectionStart=this.selectionEnd=o+p.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?s.startsWith("  ")&&(this.value=i.substring(0,a)+s.substring(2)+i.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=i.substring(0,a)+"  "+s+i.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===n&&o>0){let r=i.substring(0,o);r.endsWith("\u2022 ")?(e.preventDefault(),this.value=r.substring(0,o-2)+i.substring(n),this.selectionStart=this.selectionEnd=o-2):r.endsWith("  ")&&s.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=r.substring(0,o-2)+i.substring(n),this.selectionStart=this.selectionEnd=o-2)}}))}function Qe(t,e,o){e.innerHTML="";let n=Ae[t];if(!n)return;let i=n.template.match(/{([A-Z0-9_]+)}/g)||[],a=[...new Set(i)],s=!1;if(a.forEach(r=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(r))return;let p=r.slice(1,-1),d=`field-${p}`;if(o.excludedFields.has(d))return;let c=document.createElement("label"),g=l=>be[o.currentLang]?.[l]||be.pt?.[l]||l;c.textContent=g(p.toLowerCase())!==p.toLowerCase()?g(p.toLowerCase()):p.replace(/_/g," ").replace(/\b\w/g,l=>l.toUpperCase())+":",Object.assign(c.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:R.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let x=document.createElement("span");if(x.textContent=c.textContent,c.innerHTML="",c.appendChild(x),p==="SPEAKEASY_ID"){let l=document.createElement("button");l.innerHTML="\u2728 Auto Busca",l.style.cssText=`font-size: 11px; font-weight: 700; color: ${R.primary}; background-color: ${R.primaryBg}; border: none; border-radius: ${se.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${ne};`,l.onmouseenter=()=>l.style.backgroundColor="#d2e3fc",l.onmouseleave=()=>l.style.backgroundColor=R.primaryBg,l.onclick=v=>{v.preventDefault(),Ht(d)},c.appendChild(l)}let u=document.createElement("button");u.innerHTML="\u2715",u.style.cssText=`font-size: 14px; background: ${R.bgInput}; border: none; color: ${R.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${ne};`,u.onmouseenter=()=>{u.style.background=R.error,u.style.color=R.surface},u.onmouseleave=()=>{u.style.background=R.bgInput,u.style.color=R.textSub},u.onclick=l=>{l.preventDefault(),o.toggleFieldExclusion(d,!0),Qe(t,e,o)},c.appendChild(u);let m;Re.includes(p)?(m=document.createElement("textarea"),m.classList.add("bullet-textarea","cw-textarea"),m.placeholder="Utilize marcadores para detalhar...",Vt(m)):Je.includes(p)?(m=document.createElement("textarea"),m.classList.add("cw-textarea"),m.placeholder="Descreva as considera\xE7\xF5es..."):(m=document.createElement("input"),m.type="text",m.classList.add("cw-input")),p==="ON_CALL"&&o.currentCaseType==="lm"&&(c.style.display="none",m.style.display="none",m.value="N/A"),m.id=d,m.value=o.formData[d]||"",m.addEventListener("input",l=>o.updateField(d,l.target.value)),e.appendChild(c),e.appendChild(m)}),o.isPortugalCase){let r=c=>be[o.currentLang]?.[c]||be.pt?.[c]||c,p=document.createElement("label");p.textContent=r("consentiu_gravacao"),Object.assign(p.style,{display:"block",fontSize:"13px",fontWeight:"700",color:R.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let d=document.createElement("select");d.className="cw-select",d.innerHTML=`
            <option value="false">${r("nao")}</option>
            <option value="true">${r("sim")}</option>
        `,d.value=o.consent?"true":"false",d.onchange=()=>o.setConsent(d.value==="true"),e.appendChild(p),e.appendChild(d)}}function ht(t,e,o){let n=t.currentSubStatus;if(!n)return null;let a=Ae[n].template.replace(/\n/g,"<br>"),s='style="margin-bottom: 12px; padding-left: 30px;"',r=[],p="",d=e.getCheckedElements();d.length>0&&d.forEach(x=>{let u=x.value,m=xe[u],l=x.count||1,v=u==="ads_conversion_tracking"||u==="ads_enhanced_conversions";if(t.tagSupportUsed&&v&&!t.forcedScreenshots.has(u)){let B=L=>be[t.currentLang]?.[L]||be.pt?.[L]||L;r.push(`${m.name} - ${B("ts_output_disclaimer")}`)}else r.push(l>1?`${m.name} (x${l})`:m.name)});let c=e.screenshotsElement;if(c){let x=Array.from(c.querySelectorAll('input[id^="name-"]'));x.length>0&&x.forEach(u=>{let m=u.value,l=u.closest(".cw-screen-card");if(l){let v=l.querySelectorAll('input[id^="screen-"]'),E=!1,B="";v.forEach(L=>{let X=L.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",V=L.value.trim();V&&(B+=`<li>${X} - ${V}</li>`,E=!0)}),E&&(p+=`<div style="margin-bottom: 8px;"><b>${m}</b><ul ${s}>${B}</ul></div>`)}})}a.includes("{TAGS_IMPLEMENTED}")?a=a.replace(/{TAGS_IMPLEMENTED}/g,r.join(", ")||"N/A"):r.length>0&&(a+=`<br><b>Tags:</b> ${r.join(", ")}<br>`),a.includes("{SCREENSHOTS_LIST}")?a=a.replace(/{SCREENSHOTS_LIST}/g,p||"N/A"):p!==""&&(a+=`<br>${p}`);let g=x=>be[t.currentLang]?.[x]||be.pt?.[x]||x;if(t.isPortugalCase){let x=t.consent?g("sim"):g("nao");a=a.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>\u23FA\uFE0F ${g("consentiu_gravacao")}</b> ${x}<br><br>`).replace(/{CASO_PORTUGAL}/g,`<br><b>\u{1F1F5}\u{1F1F9} ${g("caso_portugal")}</b> ${g("sim")}<br>`)}else a=a.replace(/{CASO_PORTUGAL}/g,"").replace(/{CONSENTIU_GRAVACAO}/g,"");for(let x in t.formData){let u=x.replace("field-",""),m=new RegExp(`{${u}}`,"g"),l=(t.formData[x]||"").trim(),v=t.excludedFields.has(x),E=!l||l.toLowerCase()==="n/a"||l==="."||l==="-"||l==="\u2022";if(v||E){let B=new RegExp(`(?:<br>\\s*)?(?:<p[^>]*>)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*(?:<br>\\s*)?{${u}}(?:<\\/p>)?(?:<br>\\s*)?`,"gi");a=a.replace(B,"").replace(m,"");continue}if(Re.includes(u)){let B=l.split(`
`).map(L=>L.trim()).filter(L=>L!==""&&L!=="\u2022").map(L=>L.startsWith("\u2022 ")?L.substring(2):L).map(L=>`<li>${L}</li>`).join("");if(l=B?`<ul ${s}>${B}</ul>`:"",!B){let L=new RegExp(`(?:<br>\\s*)?(?:<p[^>]*>)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*(?:<br>\\s*)?{${u}}(?:<\\/p>)?(?:<br>\\s*)?`,"gi");a=a.replace(L,"").replace(m,"");continue}}else Je.includes(u)&&(l=l.split(`
`).filter(B=>B.trim()!=="").map(B=>`<p style="margin: 0 0 8px 0;">${B}</p>`).join(""));a=a.replace(m,l.replace(/\$/g,"$$$$"))}if(a=a.replace(/{([A-Z0-9_]+)}/g,"").replace(/(<br>\s*){3,}/g,"<br><br>").trim(),o?.getOutput){let x=o.getOutput();x&&(a+=`<br><br>${x}`)}return a}function Ut(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o="Passe o mouse sobre um cen\xE1rio para visualizar o texto...",n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let i=document.createElement("div");Object.assign(i.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let a=document.createElement("span");a.style.transition="opacity 0.2s ease, transform 0.2s ease",a.textContent=o,i.appendChild(a);let s=new Set,r=null;return e.render=(p,d)=>{s.clear();let c=Object.entries(Ze).filter(([g,x])=>{let u=!x.type||x.type==="all"||x.type===d,m=!1;return p.startsWith("NI_")?m=g.includes("-ni-")||g.includes("attempted"):p.startsWith("SO_")?m=g.includes("gtm")||g.includes("whatsapp")||g.includes("form")||g.includes("ecw4")||g.includes("ga4")||g.includes("-so-"):p.startsWith("AS_")?m=g.includes("-as-"):p.startsWith("IN_")?m=g.includes("-in-"):p.startsWith("DC_")&&(m=g.includes("-dc-")),u&&m});n.innerHTML="",c.forEach(([g,x])=>{let u=document.createElement("div"),m=g.replace("quickfill-","").replace(/-/g," ");u.textContent=m,u.dataset.id=g,Object.assign(u.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let l=x["field-REASON_COMMENTS"]||x["field-CONTEXTO_CALL"]||g;u.onmouseenter=()=>{r&&clearTimeout(r),s.has(g)||(u.style.background="#f1f3f4"),a.style.opacity="0",a.style.transform="translateY(5px)",r=setTimeout(()=>{a.textContent=l.substring(0,120)+(l.length>120?"...":""),a.style.opacity="1",a.style.transform="translateY(0)"},50)},u.onmouseleave=()=>{r&&clearTimeout(r),s.has(g)||(u.style.background="#ffffff"),r=setTimeout(()=>{s.size===0&&(a.style.opacity="0",setTimeout(()=>{a.textContent=o,a.style.opacity="1"},50))},100)},u.onclick=()=>{j.playClick();let v=!s.has(g);v?(s.add(g),u.style.background="#e8f0fe",u.style.borderColor="#1a73e8",u.style.color="#1967d2"):(s.delete(g),u.style.background="#ffffff",u.style.borderColor="#dadce0",u.style.color="#3c4043"),t(g,v)},n.appendChild(u)}),c.length===0?e.style.display="none":e.style.display="block"},e.appendChild(n),e.appendChild(i),e}var Q={bg:R.bgInput,white:R.surface,border:R.border,textMain:R.text,textSub:R.textSub,blue:R.blue,blueLight:R.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:R.blue,bg:R.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:R.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:R.primary,bg:R.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:R.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Le={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Wt(t,e,o){let n={},i="implementation";o&&o.subscribe(()=>{X(),V()});function a(q){let k=q.toLowerCase();return k.includes("ads")||k.includes("conversion")||k.includes("remarketing")?Q.brands.ads:k.includes("ga4")||k.includes("analytics")?Q.brands.ga4:k.includes("gtm")||k.includes("tag manager")||k.includes("container")?Q.brands.gtm:k.includes("merchant")||k.includes("shopping")||k.includes("feed")?Q.brands.gmc:Q.brands.default}let s=Object.entries(xe).filter(([q,k])=>k.popular),r={};Object.entries(xe).forEach(([q,k])=>{if(k.popular)return;let M=a(k.name);r[M.label]||(r[M.label]={brand:M,tasks:[]}),r[M.label].tasks.push({key:q,...k})});let p="cw-zen-tasks";if(!document.getElementById(p)){let q=document.createElement("style");q.id=p,q.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${Q.font}; background: ${Q.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${Q.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${Q.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${Q.white}; 
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
                font-size: 12px; font-weight: 500; color: ${Q.textMain}; line-height: 1.2; 
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
                color: ${Q.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${Q.border}; border-radius: 10px; background: ${Q.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${Q.blue}; box-shadow: 0 0 0 3px ${Q.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${Q.border}; border-radius: 10px; background: ${Q.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${Q.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${Q.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${Q.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${Q.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${Q.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${Q.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${Q.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${Q.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${Q.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${Q.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${Q.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${Q.textMain}; }
            
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
                font-family: ${Q.font}; font-size: 15px; font-weight: 600; color: ${Q.textMain};
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
                border-color: ${Q.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${Q.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${Q.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${Q.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${Q.textSub};
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
        `,document.head.appendChild(q)}let d=document.createElement("div");d.className="cw-zen-container";let c=document.createElement("div");Object.assign(c.style,{display:"none"});let g=document.createElement("div");g.className="cw-screens-container",c.appendChild(g),d.innerHTML=`
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
    `;let x=d.querySelector(".cw-hero-grid"),u=d.querySelector(".cw-acc-container"),m=d.querySelector(".cw-results-container"),l=d.querySelector(".cw-search-input"),v=d.querySelector(".cw-status-bar"),E=d.querySelector(".cw-status-text"),B=d.querySelector(".cw-footer-icons");s.forEach(([q,k])=>{let M=a(k.name),P=document.createElement("div");P.className="cw-hero-card",P.id=`hero-${q}`,P.style.setProperty("--hero-color",M.color),P.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Le[M.icon]}</div>
                <div class="cw-hero-label">${k.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,P.onclick=N=>{if(N.target.closest(".cw-step-btn"))return;let O=n[q]?n[q].count:0;G(q,O>0?-O:1,k)},P.querySelector(".minus").onclick=()=>G(q,-1,k),P.querySelector(".plus").onclick=()=>G(q,1,k),P.dataset.color=M.color,x.appendChild(P)});function L(q,k){let M=a(k.name),P=document.createElement("div");return P.className="cw-task-item",P.dataset.id=q,P.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${M.bg}; color:${M.color}">
                    ${Le[M.icon]||Le.default}
                </div>
                <div class="cw-task-label">${k.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,P.onclick=N=>{if(N.target.closest(".cw-step-btn"))return;let O=n[q]?n[q].count:0;G(q,O>0?-O:1,k)},P.querySelector(".minus").onclick=()=>G(q,-1,k),P.querySelector(".plus").onclick=()=>G(q,1,k),P}Object.entries(r).forEach(([q,k])=>{let M=document.createElement("div");M.className="cw-acc-group";let P=document.createElement("div");P.className="cw-acc-header",P.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${k.brand.color}"></div>
                ${q}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,P.onclick=()=>{u.querySelectorAll(".cw-acc-group.open").forEach(O=>{O!==M&&O.classList.remove("open")}),M.classList.toggle("open")};let N=document.createElement("div");N.className="cw-acc-body",k.tasks.forEach(O=>{let S=L(O.key,O);N.appendChild(S)}),M.appendChild(P),M.appendChild(N),u.appendChild(M)});function G(q,k,M){n[q]||(n[q]={count:0,data:M,brand:a(M.name)}),n[q].count+=k,n[q].count<=0&&delete n[q],X(),V(),t&&t()}function X(){let q=o.tagSupportUsed;s.forEach(([O])=>{let S=x.querySelector(`#hero-${O}`);if(!S)return;let I=n[O];I?(S.classList.add("active"),S.querySelector(".cw-step-val").textContent=I.count,S.querySelector(".cw-step-val").style.color=S.dataset.color,q&&(O==="ads_conversion_tracking"||O==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(O)?S.classList.add("ts-success"):S.classList.remove("ts-success")):(S.classList.remove("active"),S.classList.remove("ts-success"))}),d.querySelectorAll(".cw-task-item").forEach(O=>{let S=O.dataset.id,I=n[S];I?(O.classList.add("selected"),O.querySelector(".cw-step-val").textContent=I.count,q&&(S==="ads_conversion_tracking"||S==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(S)?O.classList.add("ts-success"):O.classList.remove("ts-success")):(O.classList.remove("selected"),O.classList.remove("ts-success"))});let M=Object.keys(n),P=0,N=[];if(M.forEach(O=>{let S=n[O];P+=S.count;for(let I=0;I<S.count;I++)N.length<6&&N.push(S.brand)}),P>0){v.classList.add("visible");let O=P>1?"A\xE7\xF5es":"A\xE7\xE3o",S=P>1?"definidas":"definida";E.textContent=`${P} ${O} ${S}`,B.innerHTML="",N.forEach(I=>{let f=document.createElement("div");f.className="cw-mini-icon",f.innerHTML=Le[I.icon]||Le.default;let A=f.querySelector("svg");A&&(A.style.width="14px",A.style.height="14px"),B.appendChild(f)})}else v.classList.remove("visible")}l.addEventListener("input",q=>{let k=q.target.value.toLowerCase();if(k.length>0){u.style.display="none",m.style.display="block",m.innerHTML="";let M=!1;Object.entries(xe).forEach(([P,N])=>{if(N.name.toLowerCase().includes(k)){M=!0;let O=L(P,N);n[P]&&(O.classList.add("selected"),O.querySelector(".cw-step-val").textContent=n[P].count),m.appendChild(O)}}),M||(m.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else u.style.display="block",m.style.display="none"});function V(){g.innerHTML="";let q=Object.keys(n),k=!1;if(q.length===0){g.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,c.style.display="none";return}let M=o.tagSupportUsed,P=document.createElement("div");P.className="cw-info-banner",P.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,g.appendChild(P),q.forEach(N=>{let O=n[N].data,S=n[N].count,I=n[N].brand,A=M&&(N==="ads_conversion_tracking"||N==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(N),y=o.screenshotMode||"implementation",w=O.screenshots?.[y]||[];if(w.length>0||A){k=!0;for(let T=1;T<=S;T++){let F=document.createElement("div");F.className="cw-screen-card",A&&F.classList.add("ts-success"),F.style.setProperty("--brand-color",I.color),F.style.setProperty("--brand-bg",I.bg),F.style.setProperty("--brand-shadow",I.color+"40");let C=document.createElement("div");C.className="cw-card-header";let z=document.createElement("div");z.className="cw-card-icon",z.innerHTML=Le[I.icon]||Le.default;let D=document.createElement("div");D.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let $=document.createElement("input");$.className="cw-card-title-input",$.id=`name-${N}-${T}`,$.value=`${O.name}${S>1?" #"+T:""}`,$.title="Clique para renomear esta task";let b=document.createElement("span");if(b.className="cw-edit-hint",b.innerHTML="\u270E Renomear",D.appendChild($),D.appendChild(b),C.appendChild(z),C.appendChild(D),F.appendChild(C),A){let h=document.createElement("div");h.className="cw-ts-disclaimer-box",h.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,h.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(N,!0)},F.appendChild(h)}else w.forEach((h,_)=>{let H=document.createElement("div");H.className="cw-input-group";let K=document.createElement("label");K.className="cw-input-label",K.textContent=h;let J=document.createElement("input");J.className="cw-input-field",J.id=`screen-${N}-${T}-${_}`,J.placeholder="Cole o link aqui...",J.setAttribute("autocomplete","off"),J.addEventListener("input",()=>{J.value.trim().length>5?J.classList.add("filled"):J.classList.remove("filled")});let W=document.createElement("div");W.className="cw-input-check",W.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',H.appendChild(K),H.appendChild(J),H.appendChild(W),F.appendChild(H)});g.appendChild(F)}}}),c.style.display=k?"block":"none"}return{selectionElement:d,screenshotsElement:c,updateSubStatus:()=>V(),getCheckedElements:()=>Object.keys(n).map(q=>({value:q,count:n[q].count})),setTaskCount:(q,k)=>{n[q]&&delete n[q],k>0&&xe[q]&&G(q,k,xe[q])},toggleTask:(q,k=!0)=>{let M=n[q];k&&!M?G(q,1,xe[q]):!k&&M&&G(q,-M.count,xe[q])},setLanguage:q=>{e=q;let k=d.querySelector(".js-hero-title");k&&(k.textContent=e("acesso_rapido"));let M=d.querySelector(".cw-search-input");M&&(M.placeholder=e("buscar_catalogo")),V()},reset:()=>{for(let q in n)delete n[q];l.value="",u.style.display="block",m.style.display="none",X(),V()}}}var _o={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},Mo={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},Do={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},No={display:"flex",gap:"20px",marginBottom:"12px"};function Yt(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,_o);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,gt,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,No);let i=document.createElement("input");i.type="radio",i.name="ts_usage_mod",i.value="Sim",Object.assign(i.style,ft);let a=document.createElement("label");a.textContent="Sim";let s=document.createElement("div");Object.assign(s.style,{display:"flex",alignItems:"center"}),s.appendChild(i),s.appendChild(a);let r=document.createElement("input");r.type="radio",r.name="ts_usage_mod",r.value="N\xE3o",r.checked=!0,Object.assign(r.style,ft);let p=document.createElement("label");p.textContent="N\xE3o";let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center"}),d.appendChild(r),d.appendChild(p),n.appendChild(s),n.appendChild(d);let c=document.createElement("div");c.style.display="block";let g=document.createElement("label");g.className="js-ts-reason-label",g.textContent=t("motivo_ts"),Object.assign(g.style,gt,{fontSize:"12px"});let x=document.createElement("input");x.type="text",Object.assign(x.style,Do);let u=document.createElement("div");u.className="js-ts-warning",u.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(u.style,Mo),c.appendChild(g),c.appendChild(x),c.appendChild(u),e.appendChild(o),e.appendChild(n),e.appendChild(c),i.onchange=()=>{c.style.display="none",Promise.resolve().then(()=>(Pe(),Ke)).then(B=>B.notesState.setTagSupportUsed(!0))},r.onchange=()=>{c.style.display="block",Promise.resolve().then(()=>(Pe(),Ke)).then(B=>B.notesState.setTagSupportUsed(!1))};function m(B,L){if(e.style.display="none",!B||!L||L.length===0)return;L.some(X=>X==="ads_conversion_tracking"||X==="ads_enhanced_conversions")?e.style.display="block":(E(),Promise.resolve().then(()=>(Pe(),Ke)).then(X=>X.notesState.setTagSupportUsed(!1)))}function l(){if(e.style.display==="none")return"";let B=`<br><b>Utilizou Tag Support?</b> ${i.checked?"Sim":"N\xE3o"}`;return r.checked&&x.value.trim()!==""&&(B+=`<br><b>Motivo:</b> ${x.value}`),B+="<br>",B}function v(B){t=B,o.textContent=t("utilizou_tag_support"),g.textContent=t("motivo_ts"),u.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function E(){e.style.display="none",r.checked=!0,i.checked=!1,c.style.display="block",x.value=""}return{element:e,updateVisibility:m,getOutput:l,setLanguage:v,reset:E}}var xt="cw_notes_parking_lot",et="cw_notes_emergency_save";var ge={getAll:()=>{try{return JSON.parse(localStorage.getItem(xt)||"[]")}catch{return[]}},save:t=>{let e=ge.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(xt,JSON.stringify(e)),o},delete:t=>{let e=ge.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(xt,JSON.stringify(e)),e},getCount:()=>ge.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(et,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(et);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(et),null):e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(et)}};var Ro="https://script.google.com/a/macros/google.com/s/AKfycbwUfiKDvybLzt18mWoQJvkXqsRGQYqZ4JXzF8bLHMsxtYzlFPehz-ehoWs6215Wj6uFLA/exec",yt="cw_data_broadcast",Xt="cw_data_tips",zo=["Processando...","Mantenha o foco!","Aguarde..."];function $e(t,e={}){return new Promise((o,n)=>{let i="cw_cb_"+Math.round(1e5*Math.random()),a=document.createElement("script");window[i]=p=>{document.body.contains(a)&&document.body.removeChild(a),delete window[i],o(p)};let s=Object.keys(e).map(p=>encodeURIComponent(p)+"="+encodeURIComponent(e[p])).join("&"),r=`${Ro}?op=${t}&callback=${i}&t=${Date.now()}&${s}`;a.src=r,a.onerror=()=>{document.body.contains(a)&&document.body.removeChild(a),delete window[i],n(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(a)})}var re={fetchTips:async()=>{try{let t=await $e("tips");t?.tips&&localStorage.setItem(Xt,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await $e("broadcast");if(t?.broadcast)return localStorage.setItem(yt,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(yt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(yt)||"[]"),getRandomTip:()=>{let t=zo,e=localStorage.getItem(Xt);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await re._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await re._performOp("update_broadcast",o)},deleteBroadcast:async t=>await re._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`\u{1F4E4} Executando ${t}...`,e);let o=await $e(t,e);return o&&o.status==="success"?(console.log("\u2705 Sucesso:",t),!0):(console.warn("\u26A0\uFE0F Falha:",o),!1)}catch(o){return console.error("\u274C Erro JSONP:",o),!1}},logEvent:(t,e,o="",n=null)=>{try{let i="anon";try{let s=Ee();s&&(i=s.split("@")[0].toLowerCase())}catch{}let a={timestamp:new Date().toISOString(),user:i,version:"v5.1",category:t,action:e,label:o,value:n||""};$e("log",a).catch(s=>{})}catch(i){console.warn("Analytics error",i)}},logUsage:()=>{},getUserSnippets:async t=>{try{return await $e("get_user_snippets",{user:t})}catch(e){return console.warn("Erro ao buscar snippets:",e),null}},saveSnippet:async(t,e)=>{let o={...t,user:e};return await re._performOp("save_snippet",o)},deleteSnippet:async(t,e)=>await re._performOp("delete_snippet",{id:t,user:e})};var te={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},tt=t=>new Promise(e=>setTimeout(e,t));function ot(t){let e=document.getElementById("cw-btn-notes");if(!e)return;let o=e.querySelector(".cw-dot-dirty");t?o||(o=document.createElement("div"),o.className="cw-dot-dirty",e.appendChild(o)):o&&o.remove()}function Kt(t){let e="cw-command-center-style";if(!document.getElementById(e)){let l=document.createElement("style");l.id=e,l.innerHTML=`
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
        `,document.head.appendChild(l)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>'},n=document.createElement("div");n.className="cw-pill side-right collapsed",n.innerHTML=`
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
    `;let i=document.createElement("div");i.className="cw-focus-backdrop",document.body.appendChild(i),document.body.appendChild(n);let a=(l,v)=>{j.playClick(),n.querySelector(`.${l}`).classList.toggle("active"),v()};if(n.querySelector(".notes").onclick=l=>{l.stopPropagation(),a("notes",t.toggleNotes)},n.querySelector(".email").onclick=l=>{l.stopPropagation(),a("email",t.toggleEmail)},n.querySelector(".script").onclick=l=>{l.stopPropagation(),a("script",t.toggleScript)},n.querySelector(".links").onclick=l=>{l.stopPropagation(),a("links",t.toggleLinks)},n.querySelector(".library").onclick=l=>{l.stopPropagation(),a("library",t.toggleLibrary)},n.querySelector(".timezone").onclick=l=>{l.stopPropagation(),a("timezone",t.toggleTimezone)},n.querySelector(".configs").onclick=l=>{l.stopPropagation(),a("configs",t.toggleConfigs)},n.querySelector(".broadcast").onclick=l=>{l.stopPropagation(),a("broadcast",()=>{let v=l.currentTarget.querySelector(".cw-badge");v&&v.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},n.querySelectorAll(".cw-btn").forEach(l=>{l.addEventListener("mouseenter",()=>j.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let l=document.createElement("div");l.className="cw-badge",n.querySelector(".broadcast").appendChild(l)}let s=null;n.onmouseleave=()=>{n.querySelector(".cw-btn.active")||n.classList.contains("processing-center")||(s=setTimeout(()=>{n.classList.add("collapsed")},3e3))},n.onmouseenter=()=>{s&&clearTimeout(s)},(async function(){await tt(2800),n.classList.add("docked"),await tt(300);let v=n.querySelectorAll(".cw-btn");n.querySelectorAll(".cw-sep").forEach(E=>E.classList.add("visible"));for(let E=0;E<v.length;E++)v[E].classList.add("popped"),await tt(90);await tt(200),n.classList.add("system-check")})();let r=!1,p,d,c,g,x=3;n.onmousedown=l=>{if(l.target.closest("button"))return;l.preventDefault(),p=l.clientX,d=l.clientY;let v=n.getBoundingClientRect();c=v.left,g=v.top,document.addEventListener("mousemove",u),document.addEventListener("mouseup",m)};function u(l){let v=l.clientX-p,E=l.clientY-d;!r&&Math.sqrt(v*v+E*E)>x&&(r=!0,n.classList.add("dragging"),n.style.transition="none",s&&clearTimeout(s)),r&&(n.style.left=`${c+v}px`,n.style.top=`${g+E}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function m(l){if(document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",m),r){r=!1,n.classList.remove("dragging");let v=window.innerWidth,E=window.innerHeight,B=n.getBoundingClientRect(),L=B.left+B.width/2,G;L<v/2?(G=24,n.classList.remove("side-right"),n.classList.add("side-left")):(G=v-B.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let X=Math.max(24,Math.min(B.top,E-B.height-24));setTimeout(()=>{n.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),n.style.left=`${G}px`,n.style.top=`${X}px`,n.style.bottom="auto",n.style.transform=""},10),setTimeout(()=>{n.style.transition="",n.style.removeProperty("transition")},700)}else{let v=n.querySelector(".cw-btn.active"),E=l.target.closest("button");if(n.classList.contains("collapsed")){let B=n.getBoundingClientRect(),L=window.innerHeight,G=B.top>L/2;if(n.style.setProperty("transition","none","important"),G){let X=L-B.bottom;n.style.top="auto",n.style.bottom=`${X}px`}else n.style.bottom="auto",n.style.top=`${B.top}px`;n.offsetWidth,n.style.removeProperty("transition"),n.classList.remove("collapsed"),j.playGenieOpen()}else!v&&!E&&(n.classList.add("collapsed"),j.playGenieOpen());E&&(E.style.transform="scale(0.9)",setTimeout(()=>E.style.transform="",150))}}}function nt(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${re.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=a=>{a.stopPropagation(),window._CW_ABORT_PROCESS=!0,Y("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(n),t.appendChild(o);let i=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let s=Date.now()-i,r=Math.max(0,2e3-s);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let p=o.querySelector(".cw-center-dots"),d=o.querySelector(".cw-center-text"),c=o.querySelector(".cw-center-success"),g=o.querySelector(".cw-abort-btn");p&&(p.style.display="none"),d&&(d.style.display="none"),g&&(g.style.display="none"),c&&c.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},r)}}function Jt(t){let{onSaveCurrent:e,onLoadDraft:o,t:n}=t,i=document.createElement("button");i.className="js-btn-park",i.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${n("guardar")}</span>
    `,i.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${se.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${R.surface};
        color: ${R.textSub};
        border: 1px solid ${R.border};
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ${ne};
        box-shadow: ${Ne.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,i.onmouseenter=()=>{i.style.backgroundColor="#F8F9FA",i.style.borderColor="#202124",i.style.color="#202124",i.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",i.style.transform="translateY(-1px)"},i.onmouseleave=()=>{i.style.backgroundColor="#FFFFFF",i.style.borderColor="#DADCE0",i.style.color="#5F6368",i.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",i.style.transform="translateY(0)"},i.onmousedown=()=>i.style.transform="scale(0.96)",i.onmouseup=()=>i.style.transform="scale(1) translateY(-1px)",i.onclick=async()=>{if(await he("Deseja guardar o rascunho atual e limpar os campos?"))try{let l=await e();l?(ge.save(l),u(),r(),j.playSuccess(),Y("Rascunho salvo com sucesso!")):Y("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(l){console.error("Erro ao salvar rascunho:",l),Y("Erro ao salvar.",{error:!0})}};let a=document.createElement("div");a.title="Meus Rascunhos",a.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",a.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let s=document.createElement("div");s.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",a.appendChild(s),a.onmouseenter=()=>a.style.background="rgba(0,0,0,0.05)",a.onmouseleave=()=>a.style.background="transparent",a.onclick=m=>{m.stopPropagation(),x()};function r(){let m=ge.getCount();ot(m>0),m>0?(s.style.display="block",s.textContent=m,s.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):s.style.display="none"}let p=document.createElement("div");p.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${R.surface}; z-index: 100;
        border-radius: ${se.large} ${se.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${ne};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let d=document.createElement("div");d.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",d.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${n("rascunhos_salvos")}</span>`;let c=document.createElement("button");c.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',c.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",c.onmouseenter=()=>c.style.background="#F1F3F4",c.onmouseleave=()=>c.style.background="transparent",c.onclick=()=>x(!1),d.appendChild(c);let g=document.createElement("div");g.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",p.appendChild(d),p.appendChild(g);function x(m){let l=p.style.transform==="translateY(0%)";(m!==void 0?m:!l)?(u(),p.style.transform="translateY(0%)"):p.style.transform="translateY(110%)"}function u(){let m=ge.getAll();if(g.innerHTML="",m.length===0){g.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${R.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${n("nenhum_rascunho")}</div>
                </div>`;return}m.forEach(l=>{let v=document.createElement("div");v.style.cssText=`
                background: ${R.surface}; padding: 20px; border-radius: ${se.large};
                border: 1.5px solid ${R.bgInput}; box-shadow: ${Ne.subtle};
                position: relative; transition: all 0.3s ${ne};
            `;let B=new Date(l.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),L="";l.summaryTags&&l.summaryTags.length>0&&(L=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${l.summaryTags.slice(0,3).join(", ")+(l.summaryTags.length>3?"...":"")}</div>`),v.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${l.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${B}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${l.cid||"---"}</span>
                    <span style="display:block; color:${l.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${l.subStatus||l.status||"Sem Status"}</span>
                    ${L}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let G=v.querySelector(".cw-resume-btn");G.onclick=async()=>{await he("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(l),ge.delete(l.id),u(),r(),x(!1),j.playSwoosh(),Y("Rascunho carregado."))};let X=v.querySelector(".cw-del-btn");X.onclick=async()=>{await he("Excluir este rascunho?",{danger:!0})&&(ge.delete(l.id),u(),r())},g.appendChild(v)})}return r(),{parkButton:i,historyBtnWrapper:a,drawer:p}}var Zt=t=>new Promise(e=>setTimeout(e,t));function at(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function He(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let n=window.getSelection();n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")}catch{Y("Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(e)}function it(t){["input","change","keydown","keyup"].forEach(o=>{let n=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(n)})}function Qt(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function st(){console.log("Iniciando processo de Nova Nota...");let t=Qt(),e=t.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(s=>s.innerText.trim()==="description");if(n){let s=n.closest("material-fab")||n.closest("material-button");s?(s.style&&(s.style.display="block",s.style.visibility="visible"),at(s)):at(n)}else{let s=document.querySelector("material-fab-speed-dial");if(s){let r=s.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),at(r)):s.click(),await Zt(800);let d=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="description");d&&at(d)}}let i=null,a=0;for(;!i&&a<20;){await Zt(300);let s=Qt();if(s.length>e)i=s.find(r=>!t.includes(r)),i||(i=s[s.length-1]);else if(a>10){let r=s.filter(p=>p.offsetParent!==null);r.length>0&&(i=r[r.length-1])}a++}return i}function eo(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let n=document.createElement("div");n.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(n),e.appendChild(o),o.addEventListener("scroll",()=>{n.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let i={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},a={};function s({id:L,label:G,type:X="text",placeholder:V="",required:q=!1,parent:k=o}){let M=document.createElement("div");M.style.cssText=i.inputWrapper;let P=document.createElement("label");P.style.cssText=i.label,P.innerHTML=`${G} ${q?'<span style="color:#D93025">*</span>':""}`;let N;return X==="textarea"?(N=document.createElement("textarea"),N.style.cssText=i.input+i.textarea):(N=document.createElement("input"),N.type=X,N.style.cssText=i.input),N.id=L,N.placeholder=V,N.addEventListener("focus",()=>{N.style.borderColor="#1a73e8",N.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),N.addEventListener("blur",()=>{N.style.borderColor="#DADCE0",N.style.boxShadow="none",q&&N.value.trim()!==""&&(N.style.backgroundColor="#FFF")}),a[L]={input:N,wrapper:M,required:q},M.appendChild(P),M.appendChild(N),k.appendChild(M),M}function r({id:L,label:G,options:X=["Yes","No"],defaultValue:V="No",onChange:q=null}){let k=document.createElement("div");k.style.cssText=i.inputWrapper;let M=document.createElement("label");M.style.cssText=i.label,M.textContent=G,k.appendChild(M);let P=document.createElement("div");P.style.cssText=i.radioGroup;let N=document.createElement("input");return N.type="hidden",N.id=L,N.value=V,k.appendChild(N),X.forEach(O=>{let S=document.createElement("div");S.textContent=O,S.style.cssText=i.radioLabel,O===V&&(S.style.cssText+=i.radioActive),S.onclick=()=>{Array.from(P.children).forEach(f=>f.style.cssText=i.radioLabel),S.style.cssText+=i.radioActive,N.value=O,q&&q(O)},P.appendChild(S)}),a[L]={input:N,wrapper:k,required:!1},k.appendChild(P),o.appendChild(k),k}let p=document.createElement("div");p.style.cssText=i.banner,p.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(p);let d=document.createElement("div");d.style.marginBottom="24px";let c=document.createElement("button");c.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",c.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",c.onmouseover=()=>c.style.background="#E1EFFF",c.onmouseout=()=>c.style.background="#F0F7FF",d.appendChild(c),o.appendChild(d);let g=document.createElement("div");g.style.cssText=i.section,g.innerHTML=`<div style="${i.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(g),s({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:g}),s({id:"ga4",label:"GA4 Property ID",parent:g}),s({id:"gtm",label:"GTM Container ID",parent:g});let x=document.createElement("div");x.style.cssText=i.hiddenField,g.appendChild(x),r({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:L=>{L==="Yes"?x.style.cssText=i.visibleField+"margin-bottom:14px;":(x.style.cssText=i.hiddenField,a.accessEmail.input.value="")}}),s({id:"accessEmail",label:"User Access Email",parent:x}),r({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let u=document.createElement("div");u.style.cssText=i.section,u.innerHTML=`<div style="${i.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(u),s({id:"name",label:"Advertiser Name",required:!0,parent:u}),s({id:"url",label:"Website URL",parent:u}),s({id:"phone",label:"Phone Number",parent:u}),s({id:"email",label:"Contact Email",parent:u}),s({id:"callback",label:"Preferred Callback Time (Timezone)",parent:u}),s({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:u}),s({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:u}),s({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:u});let m=document.createElement("div");m.style.cssText=i.section,m.innerHTML=`<div style="${i.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(m),s({id:"cc_adv",label:"Advertiser Contact",parent:m}),s({id:"cc_am",label:"Account Manager",parent:m});let l=document.createElement("div");l.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let v=document.createElement("button");v.innerHTML="Voltar",v.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",v.onclick=t;let E=document.createElement("button");E.textContent="Gerar Nota",E.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",l.appendChild(v),l.appendChild(E),e.appendChild(l),c.onclick=async()=>{let L=c.innerHTML;c.innerHTML="\u23F3 Buscando dados...";try{let G=await ve(),X=0,V=(M,P)=>{let N=a[M];P&&N&&N.input.value===""&&(N.input.value=P,N.input.style.backgroundColor="#E6F4EA",N.input.style.borderColor="#34A853",setTimeout(()=>{N.input.style.backgroundColor="#FFF",N.input.style.borderColor="#DADCE0"},1e3),X++)};V("name",G.advertiserName),V("url",G.websiteUrl),G.clientEmail&&(V("email",G.clientEmail),V("cc_adv",G.clientEmail));let k=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);k&&V("cid",k[0]),X>0?Y(`${X} campos preenchidos!`):Y("Nenhum dado novo encontrado.")}catch(G){console.error(G),Y("Erro ao ler p\xE1gina.")}finally{c.innerHTML=L}};let B=()=>{let L=!0,G=null;return Object.values(a).forEach(X=>{X.required&&!X.input.value.trim()&&(L=!1,X.input.style.cssText+=i.inputError,X.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),G||(G=X.input))}),G&&G.scrollIntoView({behavior:"smooth",block:"center"}),L};return E.onclick=async()=>{if(!B()){Y("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let L=M=>a[M].input.value||"N/A",G=L("hasAccess"),X=G==="Yes"?L("accessEmail"):"N/A",q=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${L("cid")}
<b>GA4 ID:</b> ${L("ga4")}
<b>GTM ID:</b> ${L("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${G==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${X}
<b>Ghosting Access Available (Y/N):</b> ${L("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${L("name")}
<b>Website:</b> ${L("url")}
<b>Phone Number:</b> ${L("phone")}
<b>Preferred Callback:</b> ${L("callback")}
<b>Email Address:</b> ${L("email")}

<b>Detailed Issue Description:</b>
${L("desc")}

<b>Uncropped screenshots:</b>
${L("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${L("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${L("cc_adv")}
<b>Account Manager:</b> ${L("cc_am")}
`.replace(/\n/g,"<br>");He(q);let k=await st();k?(k.innerText.trim()===""&&(k.innerHTML=""),document.execCommand("insertHTML",!1,q),it(k),Y("Nota gerada e inserida!")):Y("Copiado! Abra uma nota para colar.")},e}var de=t=>new Promise(e=>setTimeout(e,t));function fe(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function ye(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function rt(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,n=document.getElementById(o);n&&n.remove();let i=t.getBoundingClientRect(),a=document.createElement("div");a.id=o,a.style.cssText=`
        position: fixed;
        top: ${i.bottom+8}px;
        left: ${i.left}px;
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
    `,a.innerHTML=`
        <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:#F9AB00; font-size:16px; margin-top:1px;">\u26A0\uFE0F</span>
            <span style="line-height:1.4;">${e}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let s=a.querySelector(".cw-close-btn");s.onclick=()=>{a.style.opacity="0",a.style.transform="translateY(-5px)",setTimeout(()=>a.remove(),300)},document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(a)&&s.click()},25e3)}async function lt(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await de(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await de(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function vt(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let n=o.offsetParent!==null,i=o.closest("case-message-view")!==null,a=o.closest(".editor")!==null||o.closest("write-card")!==null;return n&&!i&&a});return e&&fe("Editor visualmente detectado.","success"),e}async function to(){fe("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(g=>g.innerText.trim()==="email");if(o&&o.offsetParent!==null){fe("Bot\xE3o de email direto encontrado.");let g=o.closest("material-button")||o.closest("material-fab")||o;ye(g),t=!0}else{fe("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let g=document.querySelector("material-fab-speed-dial");if(g){let x=g.querySelector(".trigger");if(x){ye(x),await de(800);let m=Array.from(document.querySelectorAll("i.material-icons-extended")).find(l=>l.innerText.trim()==="email");m&&(ye(m),t=!0)}}}if(!t)return Y("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;fe("\u{1F680} FASE 2: Verificando rascunhos...");let n=null,i=0,a=20;for(;i<a;){await de(250);let g=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(n=Array.from(g).find(x=>x.offsetParent!==null),n){fe("\u26A0\uFE0F Rascunho detectado!","warn");break}i++}if(n){fe("\u{1F5D1}\uFE0F Descartando..."),ye(n),n.click();let g=null,x=0;for(;x<15;){await de(300);let u=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(g=Array.from(u).find(m=>m.offsetParent!==null),g)break;x++}g&&(ye(g),Y("Limpando rascunho antigo...",{duration:2e3}),await de(2500))}fe("\u{1F680} FASE 3: Buscando editor final...");let s=0,r=null;for(;s<20&&(r=vt(),!r);)await de(250),s++;if(!r)return Y("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let p=r.closest('[id="email-body-content-top"]'),c=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(p){if(c){let x=c.closest('[aria-hidden="true"]');x&&x.removeAttribute("aria-hidden"),c.focus(),ye(c)}await de(300),p.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let g=p.querySelector("#cases-body-field");if(g){let x=document.createRange();x.selectNodeContents(g),x.collapse(!0);let u=window.getSelection();u.removeAllRanges(),u.addRange(x)}return!0}return!1}async function ct(t){if(!t||!await to())return;let o=await ve();fe("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await de(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let a=document.querySelector('input[aria-label="Enter To email address"]');a&&(await lt(a,o.clientEmail),rt(a,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let a=document.querySelector('input[aria-label="Enter Bcc email address"]');a&&(await lt(a,o.internalEmail),rt(a,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await de(500);let i=document.querySelector('material-button[debug-id="canned_response_button"]');if(i){ye(i),await de(1e3);let a=document.querySelector("material-auto-suggest-input input");if(a){ye(a),document.execCommand("insertText",!1,t),a.dispatchEvent(new Event("input",{bubbles:!0})),fe("\u23F3 Buscando resultado da Canned Response...","info");let s=null,r=0,p=15e3,d=500;for(;r<p&&(s=document.querySelector("material-select-dropdown-item"),!s);)await de(d),r+=d;if(s){ye(s),await de(1500);let c=vt();if(c){let x=Array.from(c.querySelectorAll("span.field")).filter(m=>m.innerText.includes("{Requested Task Type}"));if(x.length>0){let m=x.map(v=>v.closest("tr")).filter(v=>v!==null),l=[...new Set(m)];if(l.length>0){let E=l[0].querySelector('td[width="100%"]');E&&(E.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let B=1;B<l.length;B++)l[B].remove()}}let u=c.innerHTML;o.advertiserName&&u.includes("{%ADVERTISER_NAME%}")&&(u=u.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),u.includes("{%^79285%}")&&(u=u.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),c.innerHTML=u}Y("Canned Response aplicada!")}else fe(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),Y(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else Y("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function oo(t){if(fe(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await to())return;let o=await ve(),n=pt();await de(600);let i=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(i&&(i.click(),await de(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await lt(r,o.clientEmail),rt(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await lt(r,o.internalEmail),rt(r,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let a=document.querySelector('input[aria-label="Subject"]');a&&t.subject&&(a.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(a,t.subject),a.dispatchEvent(new Event("input",{bubbles:!0})),await de(300));let s=vt();if(s){let p=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');p&&(p.focus(),ye(p));let d=new Date;d.setDate(d.getDate()+3);let c=d.getDay();c===6?d.setDate(d.getDate()+2):c===0&&d.setDate(d.getDate()+1);let g=d.toLocaleDateString("pt-BR"),x=t.body;x=x.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),x=x.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),x=x.replace(/\[URL\]/g,o.websiteUrl||"seu site"),x=x.replace(/\[Seu Nome\]/g,n),x=x.replace(/\[MM\/DD\/YYYY\]/g,g),document.execCommand("insertHTML",!1,x),p&&(p.dispatchEvent(new Event("input",{bubbles:!0})),p.dispatchEvent(new Event("change",{bubbles:!0}))),Y("Email preenchido com sucesso!",{duration:2e3}),fe("\u2705 Processo finalizado com sucesso.","success")}else Y("Erro ao focar no editor.",{error:!0})}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function pe(t,e,o){let n=document.getElementById(o);if(!e)return;let i=e.getAttribute("data-moved")==="true",a={x:0,y:0};if(n){let c=n.getBoundingClientRect();a.x=c.left+c.width/2,a.y=c.top+c.height/2}let s,r;if(!i)s=window.innerWidth/2,r=window.innerHeight/2;else{let c=e.getBoundingClientRect();s=c.left+c.width/2,r=c.top+c.height/2,s===0&&r===0&&(s=window.innerWidth/2,r=window.innerHeight/2)}let p=a.x-s,d=a.y-r;t?(j.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",i?e.style.transform=`translate(${p}px, ${d}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${d}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),n&&n.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",i?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof no=="function"&&no(e,o)):(j.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",i?e.style.transform=`translate(${p}px, ${d}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${d}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),n&&n.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof wt=="function"&&wt(e))}function no(t,e){wt(t);let o=n=>{if(!t.classList.contains("open"))return;let i=t.contains(n.target),a=document.querySelector(".cw-pill"),s=a&&a.contains(n.target);i?(t.classList.remove("idle"),t.style.zIndex="2147483648"):s||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function wt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function ao(){let t="v4.0.0",{popup:e,content:o,header:n,animRefs:i,credit:a}=Pt(t,V),s=Yt(C),r=Wt(()=>{O(),U.setActiveTasks(r.getCheckedElements())},C,U),p=document.createElement("div");p.style.display="none";let d=Ut((b,h)=>{S(b,h)});p.appendChild(d);let c=Jt({onSaveCurrent:async()=>{let b=await w();return y(),b},onLoadDraft:b=>{F(b)},t:b=>C(b)}),g=k(),x=M(),u=document.createElement("div"),m=D(),l=I(c,C);o.appendChild(g),o.appendChild(x),o.appendChild(m),o.appendChild(p),o.appendChild(u),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none";let v=document.createElement("button");v.id="manual-task-toggle",v.textContent=C("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",v.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${R.primary}; background: ${R.surface}; color: ${R.primary}; border-radius: ${se.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${ne}; text-transform: uppercase; letter-spacing: 0.5px;`,v.onmouseenter=()=>{v.style.background=R.primaryBg},v.onmouseleave=()=>{v.style.background=R.surface},v.onclick=()=>{r.selectionElement.style.display="block",r.screenshotsElement.style.display="block",v.style.display="none"},o.appendChild(v),o.appendChild(r.selectionElement),o.appendChild(s.element),o.appendChild(r.screenshotsElement),o.appendChild(l);let E=document.createElement("div");E.style.display="none",E.style.flexGrow="1",E.style.minHeight="0",E.style.overflow="hidden";let B=eo(()=>q());B.style.height="100%",E.appendChild(B),e.insertBefore(E,a);let L=n.lastElementChild;L&&(L.insertBefore(c.historyBtnWrapper,L.firstChild),L.insertBefore(z(),L.firstChild)),e.appendChild(c.drawer);let G=null;U.subscribe(b=>{$(b),X(),b.isDirty&&(G&&clearTimeout(G),G=setTimeout(async()=>{let h=await w(!0);ge.saveEmergency(h),b.isDirty=!1},2e3))});function X(){let b=ge.getCount()>0,h=!!U.currentSubStatus;ot(b||h)}function V(){U.visible=!U.visible,pe(U.visible,e,"cw-btn-notes")}function q(){U.isSplitView=!U.isSplitView,U.isSplitView?(o.style.display="none",E.style.display="flex",E.style.flexDirection="column",i.googleLine&&(i.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",E.style.display="none",i.googleLine&&(i.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function k(){let b=document.createElement("div");if(b.innerHTML=`
            <div style="display: flex; gap: 16px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-idioma">${C("idioma")}</div>
                    <div class="cw-segmented-control" id="lang-selector">
                        <button data-lang="pt" class="active">PT</button>
                        <button data-lang="es">ES</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo">${C("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <button data-type="bau" class="active">BAU</button>
                        <button data-type="lm">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal">${C("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <button data-val="false" class="active">${C("nao")}</button>
                        <button data-val="true">${C("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let h=document.createElement("style");h.id="cw-segmented-styles",h.innerHTML=`
                .cw-segmented-control { display: flex; background: ${R.bgInput}; padding: 4px; border-radius: 100px; gap: 4px; border: 1px solid ${R.border}; }
                .cw-segmented-control button { flex: 1; border: none; background: transparent; padding: 8px 12px; font-size: 12px; font-weight: 700; border-radius: 100px; cursor: pointer; transition: all 0.3s ${ne}; color: ${R.textSub}; }
                .cw-segmented-control button.active { background: ${R.primary}; color: #fff; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.3); }
                .cw-segmented-control button:hover:not(.active) { background: #e8eaed; color: ${R.text}; }
            `,document.head.appendChild(h)}return b.querySelectorAll("#lang-selector button").forEach(h=>{h.onclick=()=>{U.setLanguage(h.dataset.lang),b.querySelectorAll("#lang-selector button").forEach(_=>_.classList.remove("active")),h.classList.add("active")}}),b.querySelectorAll("#type-selector button").forEach(h=>{h.onclick=()=>{U.setCaseType(h.dataset.type),b.querySelectorAll("#type-selector button").forEach(_=>_.classList.remove("active")),h.classList.add("active")}}),b.querySelectorAll("#portugal-selector button").forEach(h=>{h.onclick=()=>{U.setPortugalCase(h.dataset.val==="true"),b.querySelectorAll("#portugal-selector button").forEach(_=>_.classList.remove("active")),h.classList.add("active"),U.currentSubStatus&&Qe(U.currentSubStatus,u,U)}}),b}function M(){let b=document.createElement("div");b.className="cw-status-section",b.style.cssText="display: flex; flex-direction: column; gap: 8px;",b.innerHTML=`
            <div class="cw-section-title js-label-status" style="margin-top: 8px;">${C("status_principal")}</div>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${C("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <div class="cw-section-title js-label-substatus" style="margin-top: 8px;">${C("substatus")}</div>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${C("select_substatus")}</option>
            </select>
        `;let h=b.querySelector("#main-status-select"),_=b.querySelector("#sub-status-select");return h.onchange=()=>{U.setStatus(h.value),P(h.value,_),U.setSubStatus(""),N("")},_.onchange=()=>{U.setSubStatus(_.value),N(_.value)},b}function P(b,h){if(h.innerHTML=`<option value="">${C("select_substatus")}</option>`,!b){h.disabled=!0;return}for(let _ in Ae)if(Ae[_].status===b){let H=document.createElement("option");H.value=_,H.textContent=Ae[_].name,h.appendChild(H)}h.disabled=!1}function N(b){if(d.render&&d.render(b,U.currentCaseType),!b){p.style.display="none",u.style.display="none",document.getElementById("manual-task-toggle").style.display="none",r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",m.style.display="flex",m.style.opacity="1",l.style.display="none";return}m.style.opacity="0",setTimeout(()=>{U.currentSubStatus&&(m.style.display="none")},400),l.style.display="grid",Qe(b,u,U),u.style.display="block",p.style.display="block";let h=Ae[b],_=b.startsWith("SO_"),H=b==="NI_Awaiting_Validation",K=document.getElementById("manual-task-toggle");_||H?(r.selectionElement.style.display="block",K.style.display="none"):(r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",K.style.display="block");let J=b==="SO_Education_Only"?"education":"implementation";U.setScreenshotMode(J),U.currentCaseType==="lm"?U.toggleFieldExclusion("field-ON_CALL",!0):U.toggleFieldExclusion("field-ON_CALL",!1),r.updateSubStatus(b),O();let W=document.getElementById("email-automation-toggle-row");W&&(W.style.display=qe[b]?"flex":"none")}function O(){let b=r.getCheckedElements().map(h=>h.value);s.updateVisibility(U.currentSubStatus,b)}function S(b,h){let _=Ze[b];if(_&&h){for(let H in _)if(H==="linkedTask")r.toggleTask(_.linkedTask,!0);else if(H==="activeTasks")_.activeTasks.forEach(K=>r.setTaskCount(K.value,K.count));else if(H.startsWith("field-")){let K=H,J=_[H];U.updateField(K,J);let W=document.getElementById(K);if(W){if(Re.includes(K.replace("field-",""))){let Z=W.value.trim();Z&&!Z.includes(J.trim())?W.value=Z+(Z.endsWith(`
`)?"":`
`)+J:W.value=J}else W.value=J;W.dispatchEvent(new Event("input"))}}}}function I(b,h){let _=document.createElement("div");_.className="cw-actions-section",_.style.cssText=`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 16px;
            margin-top: 24px;
            background: ${R.bgInput};
            border-radius: 16px;
            border: 1px solid ${R.border};
        `;let H=document.createElement("div");H.id="email-automation-toggle-row",H.style.cssText="grid-column: span 2; display: none; align-items: center; justify-content: center; padding-bottom: 8px; border-bottom: 1px solid #eee; margin-bottom: 8px;",H.innerHTML=`
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 12px; font-weight: 600; color: ${R.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 14px; height: 14px; accent-color: ${R.primary};">
                <span class="js-label-email-toggle">${h("preencher_email_automaticamente")}</span>
            </label>
        `;let K=b.parkButton;K.style.cssText=`width: 100%; margin: 0; border-radius: ${se.medium}; height: 40px; font-weight: 600; font-size: 13px;`;let J=document.createElement("button");J.className="cw-btn-secondary js-btn-reset",J.textContent=h("limpar"),J.style.cssText=`width: 100%; height: 40px; background: ${R.surface}; color: ${R.textSub}; border: 1px solid ${R.border}; border-radius: ${se.medium}; font-weight: 600; cursor: pointer; transition: all 0.2s ${ne}; font-size: 13px;`,J.onclick=()=>y();let W=document.createElement("button");W.className="cw-btn-secondary js-btn-copy",W.textContent=h("copiar"),W.style.cssText=`width: 100%; height: 40px; background: ${R.surface}; color: ${R.primary}; border: 1px solid ${R.primary}; border-radius: ${se.medium}; font-weight: 600; cursor: pointer; transition: all 0.2s ${ne}; font-size: 13px;`,W.onclick=()=>f();let Z=document.createElement("button");return Z.className="cw-btn-primary js-btn-generate",Z.textContent=h("preencher"),Z.style.cssText=`width: 100%; height: 44px; background: ${R.primary}; color: #fff; border: none; border-radius: ${se.medium}; font-weight: 600; cursor: pointer; transition: all 0.2s ${ne}; grid-column: span 2; font-size: 14px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 4px;`,Z.onclick=()=>A(),_.appendChild(H),_.appendChild(K),_.appendChild(J),_.appendChild(W),_.appendChild(Z),_}async function f(){if(!U.currentSubStatus){Y(C("select_substatus"),{error:!0});return}let b=ht(U,r,s);b?(He(b),Y(C("copiado_sucesso")),j.playClick()):Y(C("select_substatus"),{error:!0})}async function A(){if(!U.currentSubStatus){Y(C("select_substatus"),{error:!0});return}let b=ht(U,r,s);He(b),V();let h=nt(),_=await st();if(_){_.focus(),document.execCommand("insertHTML",!1,b),it(_);let H=document.getElementById("email-automation-checkbox");(!H||H.checked)&&U.currentSubStatus&&qe[U.currentSubStatus]&&await ct(qe[U.currentSubStatus]),Y(C("inserido_copiado")),j.playSuccess(),y()}h()}function y(){U.reset(),r.reset(),s.reset(),X(),o.querySelectorAll("select").forEach(h=>h.value=""),o.querySelector("#sub-status-select").disabled=!0;let b=document.getElementById("email-automation-toggle-row");b&&(b.style.display="none"),u.innerHTML="",p.style.display="none",m.style.display="flex",m.style.opacity="1",l.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none"}async function w(b=!1){let h={};u.querySelectorAll("input, textarea, select").forEach(W=>{(W.id.startsWith("field-")||W.id==="consent-select")&&(h[W.id]=W.value)});let _="Cliente",H="---";if(!b)try{let W=await ve();_=W.advertiserName,H=W.cid}catch(W){console.warn("Erro ao coletar pageData:",W)}let K=r.getCheckedElements().map(W=>({key:W.value,count:W.count})),J=K.map(W=>{let Z=xe[W.key];return Z?Z.name:W.key});return{currentCaseType:U.currentCaseType,currentLang:U.currentLang,isPortugalCase:U.isPortugalCase,consent:U.consent,tagSupportUsed:U.tagSupportUsed,forcedScreenshots:[...U.forcedScreenshots],excludedFields:[...U.excludedFields],status:U.currentStatus,subStatus:U.currentSubStatus,formData:h,activeTasks:K,summaryTags:J,clientName:_,cid:H,timestamp:new Date().toISOString()}}let T=b=>new Promise(h=>setTimeout(h,b));async function F(b){U.setLanguage(b.currentLang||"pt"),U.setCaseType(b.currentCaseType||"bau"),U.setPortugalCase(b.isPortugalCase||!1),U.setConsent(b.consent||!1),U.setExcludedFields(b.excludedFields||[]);let h=o.querySelector(`#lang-selector button[data-lang="${U.currentLang}"]`);h&&h.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach(K=>{K!==h&&K.classList.remove("active")});let _=o.querySelector(`#type-selector button[data-type="${U.currentCaseType}"]`);_&&_.classList.add("active"),o.querySelectorAll("#type-selector button").forEach(K=>{K!==_&&K.classList.remove("active")});let H=o.querySelector(`#portugal-selector button[data-val="${U.isPortugalCase}"]`);if(H&&H.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach(K=>{K!==H&&K.classList.remove("active")}),b.status){let K=o.querySelector("#main-status-select");K.value=b.status,U.setStatus(b.status);let J=o.querySelector("#sub-status-select");if(P(b.status,J),await T(50),b.subStatus){if(J.value=b.subStatus,U.setSubStatus(b.subStatus),N(b.subStatus),await T(100),b.tagSupportUsed!==void 0){U.setTagSupportUsed(b.tagSupportUsed);let W=s.element.querySelector('input[value="Sim"]'),Z=s.element.querySelector('input[value="N\xE3o"]');b.tagSupportUsed&&W?W.checked=!0:Z&&(Z.checked=!0),s.element.querySelector("div:last-child").style.display=b.tagSupportUsed?"none":"block"}b.forcedScreenshots&&U.setForcedScreenshots(b.forcedScreenshots);for(let W in b.formData){let Z=document.getElementById(W);Z&&(Z.value=b.formData[W],U.updateField(W,Z.value))}b.activeTasks&&(b.activeTasks.forEach(W=>r.setTaskCount(W.key,W.count)),U.setActiveTasks(r.getCheckedElements()))}}U.isDirty=!1}function C(b){return be[U.currentLang]?.[b]||be.pt?.[b]||b}function z(){let b=document.createElement("div");return b.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',b.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",b.onclick=h=>{h.stopPropagation(),q()},b.title="Alternar para Split & Transfer",b}function D(){let b=document.createElement("div");return b.id="notes-empty-state",b.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${ne};
        `,b.innerHTML=`
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
                <div style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${R.text}; margin-bottom: 4px;">
                    ${C("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${R.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${C("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,b}function $(b){let h=o.querySelector(".js-label-idioma");h&&(h.textContent=C("idioma"));let _=o.querySelector(".js-label-fluxo");_&&(_.textContent=C("fluxo"));let H=o.querySelector(".js-label-portugal");H&&(H.textContent=C("caso_portugal"));let K=o.querySelector(".js-label-status");K&&(K.textContent=C("status_principal"));let J=o.querySelector(".js-label-substatus");J&&(J.textContent=C("substatus"));let W=o.querySelector(".js-btn-copy");W&&(W.textContent=C("copiar"));let Z=o.querySelector(".js-btn-generate");Z&&(Z.textContent=C("preencher"));let ue=o.querySelector(".js-btn-reset");ue&&(ue.textContent=C("limpar"));let ie=document.getElementById("manual-task-toggle");ie&&(ie.textContent=C("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let ee=o.querySelector(".js-btn-park span");ee&&(ee.textContent=C("guardar"));let oe=e.querySelector(".js-drawer-title");oe&&(oe.textContent=C("rascunhos_salvos"));let ae=o.querySelector(".js-label-email-toggle");ae&&(ae.textContent=C("preencher_email_automaticamente")),s&&s.setLanguage&&s.setLanguage(C),r&&r.setLanguage&&r.setLanguage(C)}return m.style.display="flex",l.style.display="none",U.setLanguage("pt"),U.setCaseType("bau"),X(),setTimeout(async()=>{let b=ge.getEmergency();b&&(await he("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?(F(b),Y("Sess\xE3o restaurada!")):ge.clearEmergency())},1e3),document.body.appendChild(e),V}var _e={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};var io="cw_personal_library_v1",me={getSnippets:(t="all")=>{let e=me._loadFromLocal(),o=Ee();return o&&o.includes("@")&&me._syncWithServer(o),t==="all"?e:e.filter(n=>n.type===t)},save:async t=>{let e=Ee();if(!e)return Y("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;let o=me._loadFromLocal(),n=new Date().toISOString(),i={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:n},a=o.filter(s=>s.id!==i.id);return a.unshift(i),me._saveToLocal(a),re.saveSnippet(i,e).then(s=>{s?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}),i},delete:async t=>{let e=Ee(),n=me._loadFromLocal().filter(i=>i.id!==t);return me._saveToLocal(n),e&&re.deleteSnippet(t,e),!0},_syncWithServer:async t=>{console.log("\u{1F504} Sincronizando biblioteca...");let e=await re.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,n=me._loadFromLocal(),i=JSON.stringify(o),a=JSON.stringify(n);i!==a&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),me._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(io)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem(io,JSON.stringify(t))}};function so(){let t="v4.2.0 CR-Hybrid",e="CANNED_RESPONSES",o=Object.keys(_e)[0],n="",i="list",a=!1,s={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:s.bgApp},p={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},d={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},c={padding:"20px 24px 12px 24px",flexShrink:"0",background:s.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${s.borderSubtle}`},g={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:s.textPrimary,boxSizing:"border-box",outline:"none",transition:s.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},x={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},u={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:s.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:s.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},m={background:s.primaryBg,color:s.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},l={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},v={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:s.bgSurface,border:"1px solid transparent",boxShadow:s.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},E=document.createElement("div");E.id="quick-email-popup",E.classList.add("cw-module-window"),Object.assign(E.style,le,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let B={popup:E,googleLine:null,focusElement:null};function L(){a=!a,pe(a,E,"cw-btn-email"),a||setTimeout(()=>A(),300)}let G=ce(E,"Quick Email",t,"Templates & Automa\xE7\xF5es",B,()=>L()),X=document.createElement("div");Object.assign(X.style,r);let V=document.createElement("div");Object.assign(V.style,p);let q=document.createElement("div");Object.assign(q.style,d);let k=document.createElement("div");Object.assign(k.style,c);let M=document.createElement("input");M.placeholder="Pesquisar templates...",Object.assign(M.style,g),M.onfocus=()=>{M.style.borderColor=s.primary,M.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",M.style.background="#fff"},M.onblur=()=>{M.style.borderColor="transparent",M.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",M.style.background="#fff"},B.focusElement=M;let P=document.createElement("div");Object.assign(P.style,x);let N=document.createElement("div");Object.assign(N.style,l),k.appendChild(M),k.appendChild(P),q.appendChild(k),q.appendChild(N);let O=document.createElement("div");Object.assign(O.style,d);let S=document.createElement("div");Object.assign(S.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),O.appendChild(S),V.appendChild(q),V.appendChild(O),X.appendChild(V),E.appendChild(G),E.appendChild(X),document.body.appendChild(E);async function I(F,C){try{a&&L();let z=nt();await new Promise(D=>setTimeout(D,800)),C==="email"?await oo(F):C==="cr"&&await ct(F),z()}catch(z){console.error("\u274C Erro:",z);let D=document.querySelector(".cw-focus-backdrop");D&&D.classList.remove("active")}}function f(F){i="detail",V.style.transform="translateX(-50%)";let C='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',z='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';S.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${C}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${F.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${F.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${F.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${z} Usar Template
                </button>
            </div>
        `;let D=S.querySelector("#csa-back-btn");D.onmouseenter=()=>D.style.background="#f1f3f4",D.onmouseleave=()=>D.style.background="none",D.onclick=A;let $=S.querySelector("#csa-insert-btn");$.onmouseenter=()=>{$.style.transform="translateY(-1px)",$.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},$.onmouseleave=()=>{$.style.transform="translateY(0)",$.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},$.onclick=()=>{$.style.transform="scale(0.96)",I(F,"email"),setTimeout(()=>{$.style.transform="scale(1)",A()},300)}}function A(){i="list",V.style.transform="translateX(0)"}function y(F,C,z=null){let D=document.createElement("button"),$=z?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${z}</span>`:"";return D.innerHTML=`${$}${F}`,Object.assign(D.style,u),o===C&&n===""?Object.assign(D.style,m):(D.onmouseenter=()=>{D.style.background="#F1F3F4",D.style.borderColor="#DADCE0"},D.onmouseleave=()=>{D.style.background="#FFFFFF",D.style.borderColor="#DADCE0"}),D.onclick=()=>{o=C,n="",M.value="",w(),T()},D}function w(){P.innerHTML="",P.appendChild(y("Smart CRs",e,"\u26A1")),P.appendChild(y("Pessoal","PERSONAL_LIBRARY","\u{1F464}")),Object.keys(_e).forEach(F=>{P.appendChild(y(_e[F].title,F))})}function T(){N.innerHTML="";let F=[];if(n.trim()!==""){let b=n.toLowerCase();Object.values(_e).forEach(h=>{h.emails.forEach(_=>{(_.name.toLowerCase().includes(b)||_.subject.toLowerCase().includes(b))&&F.push({type:"email",data:_})})}),me.getSnippets("email").forEach(h=>{(h.title.toLowerCase().includes(b)||h.subject&&h.subject.toLowerCase().includes(b))&&F.push({type:"email",data:{name:h.title,subject:h.subject||"Sem Assunto",body:h.content}})}),Object.entries(qe).forEach(([h,_])=>{if(!_)return;(h.replace(/_/g," ").toLowerCase().includes(b)||_.toLowerCase().includes(b))&&F.push({type:"cr",key:h,code:_})})}else o===e?Object.entries(qe).forEach(([b,h])=>{h&&F.push({type:"cr",key:b,code:h})}):o==="PERSONAL_LIBRARY"?me.getSnippets("email").forEach(b=>{F.push({type:"email",data:{name:b.title,subject:b.subject||"Sem Assunto",body:b.content}})}):_e[o]&&_e[o].emails.forEach(b=>{F.push({type:"email",data:b})});if(F.length===0){N.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let z='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',D='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',$='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';F.forEach(b=>{let h=document.createElement("div");if(Object.assign(h.style,v),b.type==="email"){let _=b.data,H=_.subject.length>45?_.subject.substring(0,45)+"...":_.subject;h.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${z}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${_.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${H}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${$}</div>
                `,h.onclick=()=>f(_)}else{let _=b.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");h.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${D}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${_}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${b.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,h.onclick=()=>{h.style.transform="scale(0.98)",h.style.background="#FEF7E0",setTimeout(()=>{h.style.transform="scale(1)",h.style.background="#fff",I(b.code,"cr")},150)}}h.onmouseenter=()=>{h.style.transform="translateY(-2px)",h.style.boxShadow=s.shadowHover,b.type==="cr"?h.style.borderLeft="3px solid #Fbbc04":h.style.borderLeft="3px solid #1a73e8"},h.onmouseleave=()=>{h.style.transform="translateY(0)",h.style.boxShadow=s.shadowCard,h.style.borderLeft="1px solid transparent"},N.appendChild(h)})}return M.addEventListener("input",F=>{n=F.target.value,n!==""?Array.from(P.children).forEach(C=>{Object.assign(C.style,u),C.style.opacity="0.6"}):w(),T()}),w(),T(),L}var ro={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function lo(){let t="v2.6 (Context HD)",e="csa-local-styles";if(!document.getElementById(e)){let y=document.createElement("style");y.id=e,y.innerHTML=`
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
      `,document.head.appendChild(y)}let o={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#FFFFFF",scrollBehavior:"smooth"},card:{background:"#FFFFFF",border:"1px solid #E5E7EB",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"12px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"8px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.1s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.6",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"18px",height:"18px",borderRadius:"6px",border:"2px solid #DADCE0",marginRight:"12px",marginTop:"2px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},i="PT",a="BAU",s=!1,r=document.createElement("div");r.id="call-script-popup",r.classList.add("cw-module-window"),Object.assign(r.style,le,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let p={popup:r,googleLine:null},d=null;function c(){s&&ve().then(y=>{let w=r.querySelector("#cw-ctx-name"),T=r.querySelector("#cw-ctx-cid"),F=r.querySelector("#cw-ctx-email");if(w&&(w.textContent=y.advertiserName||"Cliente Desconhecido"),T){let C=y.cid||"---";T.textContent!==C&&(T.textContent=C)}if(F){let C=y.clientEmail||"N\xE3o encontrado";F.textContent!==C&&(F.textContent=C,F.title=C)}})}function g(){s=!s,pe(s,r,"cw-btn-script"),s?(c(),d||(d=setInterval(c,2e3))):d&&(clearInterval(d),d=null)}let x=ce(r,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",p,()=>{g()});r.appendChild(x);let u=document.createElement("div");Object.assign(u.style,o.contextBanner),u.innerHTML=`
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
  `;let m=(y,w)=>{let T=u.querySelector(y),F=u.querySelector(w);T.onclick=()=>{let C=F.textContent;!C||C.includes("---")||C.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(C),j.playSuccess(),T.classList.add("copied"),setTimeout(()=>T.classList.remove("copied"),1500))}};r.appendChild(u);let l=document.createElement("div");Object.assign(l.style,o.progressBarContainer);let v=document.createElement("div");Object.assign(v.style,o.progressBarFill),l.appendChild(v),r.appendChild(l);let E=document.createElement("div");E.id="csa-content",Object.assign(E.style,o.contentArea),r.appendChild(E);let B=document.createElement("div");Object.assign(B.style,o.footer);let L=document.createElement("span");L.textContent="by lucaste@",Object.assign(L.style,{fontSize:"10px",color:"#bdc1c6"});let G=document.createElement("button");G.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(G.style,o.resetBtn),G.onmouseenter=()=>G.style.background="#fce8e6",G.onmouseleave=()=>G.style.background="transparent",G.onclick=()=>{G.style.transform="scale(0.9)",setTimeout(()=>G.style.transform="scale(1)",150);for(let y in n)delete n[y];S()},B.appendChild(L),B.appendChild(G),r.appendChild(B);let X=document.createElement("div");Object.assign(X.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let V=document.createElement("div");Object.assign(V.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let q=document.createElement("div");q.textContent="BAU";let k=document.createElement("div");k.textContent="LT",Object.assign(q.style,Ge),Object.assign(k.style,Ge),V.appendChild(q),V.appendChild(k);let M=document.createElement("select");Object.assign(M.style,Ye,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),M.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',M.value=i,X.appendChild(V),X.appendChild(M),E.appendChild(X);let P=document.createElement("div");P.id="csa-checklist-area",E.appendChild(P);let N=document.createElement("div");Object.assign(N.style,Te),N.className="no-drag",N.title="Redimensionar",r.appendChild(N),ke(r,N),document.body.appendChild(r),m("#cw-pill-cid","#cw-ctx-cid"),m("#cw-pill-email","#cw-ctx-email");function O(y){return y}function S(){P.innerHTML="";let y=`${i} ${a}`,w=ro[y];if(!w){P.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',v.style.width="0%";return}let T=w.color||"#1a73e8",F=0,C=0;["inicio","meio","fim"].forEach(z=>{w[z]&&(F+=w[z].length)}),["inicio","meio","fim"].forEach((z,D)=>{let $=w[z];if(!$||$.length===0)return;let b=document.createElement("div");Object.assign(b.style,o.card);let h=document.createElement("div");Object.assign(h.style,o.cardTitle);let _="";z==="inicio"?i.includes("ES")?_="Apertura":i.includes("EN")?_="Opening":_="Abertura":z==="meio"?i.includes("ES")?_="Implementaci\xF3n":i.includes("EN")?_="Implementation":_="Implementa\xE7\xE3o (Tag Support)":z==="fim"&&(i.includes("ES")?_="Cierre":i.includes("EN")?_="Closing":_="Fechamento"),h.textContent=_;let H=document.createElement("span");H.style.fontSize="11px",H.style.opacity="0.7",H.style.fontWeight="500",H.style.background="#f1f3f4",H.style.padding="2px 8px",H.style.borderRadius="10px",h.appendChild(H),b.appendChild(h);let K=0;$.forEach((J,W)=>{let Z=`${y}-${z}-${W}`,ue=!!n[Z];ue&&(C++,K++);let ie=document.createElement("div");Object.assign(ie.style,o.itemRow);let ee=document.createElement("div");Object.assign(ee.style,o.checkbox);let oe=document.createElement("span");oe.innerHTML=J,oe.style.flex="1",ue?(Object.assign(ie.style,o.itemCompleted),ee.style.background=T,ee.style.borderColor=T,ee.style.transform="scale(1)",ee.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ie.style.textDecoration="none",ie.style.opacity="1",ee.style.background="transparent",ee.style.borderColor="#dadce0",ee.style.transform="scale(1)",ee.innerHTML=""),ie.onclick=()=>{let ae=!n[Z];n[Z]=ae,j.playClick(),ae?(ee.style.transform="scale(1.2)",setTimeout(()=>ee.style.transform="scale(1)",150),Object.assign(ie.style,o.itemCompleted),ee.style.background=T,ee.style.borderColor=T,ee.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ie.style.textDecoration="none",ie.style.opacity="1",ee.style.background="transparent",ee.style.borderColor="#dadce0",ee.innerHTML=""),I(y,w)},ie.onmouseenter=()=>{n[Z]||(ie.style.background="#f1f3f4",ee.style.borderColor=T)},ie.onmouseleave=()=>{n[Z]||(ie.style.background="transparent",ee.style.borderColor="#dadce0")},ie.appendChild(ee),ie.appendChild(oe),b.appendChild(ie)}),K===$.length&&$.length>0&&(H.style.color="#1e8e3e",H.style.background="#e6f4ea",b.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),H.textContent=`${K}/${$.length}`,P.appendChild(b)}),f(F,C)}function I(y,w){let T=0,F=0;["inicio","meio","fim"].forEach(C=>{let z=w[C]||[];T+=z.length,z.forEach((D,$)=>{n[`${y}-${C}-${$}`]&&F++})}),f(T,F),setTimeout(()=>S(),200)}function f(y,w){let T=y===0?0:w/y*100;v.style.width=`${T}%`,v.style.background=T===100?"#34A853":"linear-gradient(90deg, #4285F4, #34A853)"}function A(y){a=y;let w=Dt();Object.assign(q.style,Ge),Object.assign(k.style,Ge),Object.assign(y==="BAU"?q.style:k.style,w),S()}return q.onclick=()=>A("BAU"),k.onclick=()=>A("LT"),M.addEventListener("change",y=>{i=y.target.value,S()}),A(a),g}var Ve={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Me={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},dt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},St="cw_link_history_v4";function co(t,e){try{let o=JSON.parse(localStorage.getItem(St)||"[]");o=o.filter(n=>n.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(St,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function Bo(){try{return JSON.parse(localStorage.getItem(St)||"[]")}catch{return[]}}function po(){let t="v4.6",e="",o=!1,n=null,i=!1,a={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},s=document.createElement("div");s.id="links-popup",s.classList.add("cw-module-window"),Object.assign(s.style,le,{right:"100px",width:"600px",height:"650px",background:a.bgApp,overflow:"hidden"});let p=ce(s,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:s,googleLine:null},()=>N());s.appendChild(p);let d=document.createElement("div");d.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",s.appendChild(d);let c=document.createElement("div");c.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${a.bgSidebar};
      border-right: 1px solid ${a.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,d.appendChild(c);let g=document.createElement("div");g.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",d.appendChild(g);let x=document.createElement("div");x.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let u=document.createElement("div");u.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let m=document.createElement("div");m.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',m.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let l=document.createElement("input");l.type="text",l.placeholder="Buscar ferramenta ou SOP...",l.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${a.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,l.onfocus=()=>{u.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",u.style.border="1px solid #1a73e8"},l.onblur=()=>{u.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",u.style.border="1px solid transparent"},u.appendChild(m),u.appendChild(l),x.appendChild(u),g.appendChild(x);let v=document.createElement("div");v.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",g.appendChild(v);let E=null;function B(){if(E)return;E=document.createElement("div"),E.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let O=document.createElement("div");O.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",O.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let S=document.createElement("button");S.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',S.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",S.onclick=()=>{G(),i=!1,k()},O.appendChild(S),E.appendChild(O);let I=document.createElement("div");I.id="cw-history-list",I.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",E.appendChild(I),g.appendChild(E)}function L(){E||B();let O=E.querySelector("#cw-history-list");O.innerHTML="";let S=Bo();S.length===0?O.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':S.forEach(I=>{let f=P(I,Me[I._originalCat],!0,I._originalCat);O.appendChild(f)}),requestAnimationFrame(()=>E.style.transform="translateY(0)")}function G(){E&&(E.style.transform="translateY(100%)")}function X(){c.innerHTML="";let O=V("history","Recentes",Me.history);O.id="cw-sidebar-btn-history",O.onclick=()=>{j.playClick(),i=!i,i?L():G(),k()},c.appendChild(O);let S=document.createElement("div");S.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",c.appendChild(S),Object.keys(Ve).forEach(I=>{let f=Ve[I],A=V(I,f.label,Me[I]);A.id=`cw-sidebar-btn-${I}`,A.onclick=()=>{j.playClick(),i&&(i=!1,G()),q(I)},c.appendChild(A)})}function V(O,S,I){let f=document.createElement("div");f.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${a.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,f.title=S,f.dataset.key=O;let A=document.createElement("div");A.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",A.innerHTML=I||Me.tasks;let y=document.createElement("div");return y.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",y.textContent=S,f.appendChild(A),f.appendChild(y),f.onmouseenter=()=>{n!==O&&!(O==="history"&&i)&&(f.style.background="#F1F3F4",A.style.transform="scale(1.1)")},f.onmouseleave=()=>{n!==O&&!(O==="history"&&i)&&(f.style.background="transparent",A.style.transform="scale(1)")},f}function q(O){let S=document.getElementById(`cat-anchor-${O}`);S&&(S.scrollIntoView({behavior:"smooth",block:"start"}),n=O,k())}function k(){Object.keys(Ve).forEach(S=>{let I=c.querySelector(`#cw-sidebar-btn-${S}`);if(I)if(n===S&&!i){let f=dt[S];I.style.background=f.bg,I.style.color=f.color,I.querySelector("div:first-child").style.transform="scale(1.1)"}else I.style.background="transparent",I.style.color=a.textSecondary,I.querySelector("div:first-child").style.transform="scale(1)"});let O=c.querySelector("#cw-sidebar-btn-history");O&&(i?(O.style.background="#3C4043",O.style.color="#FFFFFF"):(O.style.background="transparent",O.style.color=a.textSecondary))}function M(){if(v.innerHTML="",e.trim()!==""){let S=[];if(Object.entries(Ve).forEach(([f,A])=>{let y=A.links.filter(w=>w.name.toLowerCase().includes(e.toLowerCase())||w.desc.toLowerCase().includes(e.toLowerCase()));S.push(...y.map(w=>({...w,_cat:f})))}),S.length===0){v.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let I=document.createElement("div");I.innerHTML="Resultados da busca",I.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",v.appendChild(I),S.forEach(f=>{let A=P(f,Me[f._cat],!1,f._cat);v.appendChild(A)});return}Object.entries(Ve).forEach(([S,I])=>{let f=dt[S],A=document.createElement("div"),y=document.createElement("div");y.id=`cat-anchor-${S}`,y.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${f.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,y.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${f.color};"></div>
            ${I.label}
          `,A.appendChild(y);let w=document.createElement("div");w.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",I.links.forEach(T=>{let F=P(T,Me[S],!1,S);w.appendChild(F)}),A.appendChild(w),v.appendChild(A)});let O=document.createElement("div");O.style.height="80px",v.appendChild(O)}function P(O,S,I,f){let A=document.createElement("div"),y=dt[f]||dt.history;A.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let w=document.createElement("div");w.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${y.bg}; color: ${y.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,w.innerHTML=S||Me.tasks;let T=w.querySelector("svg");T&&(T.style.width="22px",T.style.height="22px");let F=document.createElement("div");F.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let C=document.createElement("div");C.style.cssText=`font-size: 14px; font-weight: 600; color: ${a.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,C.textContent=O.name;let z=document.createElement("div");z.style.cssText=`font-size: 12px; color: ${a.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,z.textContent=O.desc,F.appendChild(C),F.appendChild(z);let D=document.createElement("div");return D.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',D.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,D.title="Copiar URL",A.onmouseenter=()=>{A.style.transform="translateY(-2px)",A.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",A.style.borderColor="rgba(0,0,0,0.05)",A.style.borderLeft=`4px solid ${y.color}`,D.style.opacity="1",D.style.background="#F1F3F4"},A.onmouseleave=()=>{A.style.transform="translateY(0)",A.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",A.style.border="1px solid transparent",D.style.opacity="0",D.style.background="transparent"},A.onclick=()=>{!I&&f&&co(O,f),window.open(O.url,"_blank")},D.onclick=$=>{$.stopPropagation(),j.playClick(),navigator.clipboard.writeText(O.url),!I&&f&&co(O,f),Y("Link copiado!")},A.appendChild(w),A.appendChild(F),A.appendChild(D),A}l.addEventListener("input",O=>{e=O.target.value,M()});function N(){o=!o,pe(o,s,"cw-btn-links")}return document.body.appendChild(s),X(),M(),N}var Oe=[];function Ct(t){Oe=t}var Go=["lucaste","ricardogi"],Po=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function uo(){let t="v4.9",e=!1,o=null,n=null;function i(f){if(!f)return"";try{let A=new Date(f);return isNaN(A.getTime())?String(f):A.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(f)}}if(!document.getElementById("cw-broadcast-hd-css")){let f=document.createElement("style");f.id="cw-broadcast-hd-css",f.innerHTML=`
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
      `,document.head.appendChild(f)}let a={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},s={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(f){return f?Object.entries(f).map(([A,y])=>`${A.replace(/[A-Z]/g,w=>"-"+w.toLowerCase())}:${y}`).join(";"):""}function p(f){if(!f||typeof f!="string")return"";let A=f;return A=A.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),A=A.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),A=A.replace(/_(.*?)_/g,"<i>$1</i>"),A=A.replace(/\n/g,"<br>"),A=Nt(A),A}let d=document.createElement("div");d.id="broadcast-popup",d.classList.add("cw-module-window"),Object.assign(d.style,le,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let c={popup:d,googleLine:null};function g(){if(e=!e,pe(e,d,"cw-btn-broadcast"),e){let f=document.getElementById("cw-btn-broadcast");f&&f.classList.remove("has-new"),q()}}let x=ce(d,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",c,()=>g()),u=x.querySelector(".cw-header-actions")||x.lastElementChild,m=null;function l(){let f=null;try{f=Ee()}catch{console.warn("TechSol: Auth Pending")}if(f){let A=f.split("@")[0].toLowerCase(),y=Go.includes(A);if(window._cwIsAdmin=y,window._cwCurrentUser=A,y&&u&&!u.querySelector("#cw-admin-btn")){let w=document.createElement("div");w.id="cw-admin-btn",w.className="cw-btn-interactive",w.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(w.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),w.title="Novo Aviso",w.onclick=T=>{T.stopPropagation(),B()},u.insertBefore(w,u.firstChild),m||E(),M()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(l,2e3))}if(u){let f=document.createElement("button");f.textContent="Limpar",f.className="cw-btn-interactive",Object.assign(f.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),f.onclick=A=>{A.stopPropagation(),j.playSuccess();let y=Oe.map(w=>w.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(y)),M(),k()},u.insertBefore(f,u.firstChild)}d.appendChild(x);let v=document.createElement("div");v.id="cw-update-status",v.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",d.appendChild(v);function E(){m=document.createElement("div"),m.className="cw-editor-overlay",m.innerHTML=`
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
      `,m.querySelectorAll('input[name="cw-bc-type"]').forEach(w=>{w.addEventListener("change",()=>{m.querySelectorAll(".cw-radio-option").forEach(T=>T.classList.remove("checked")),w.parentElement.classList.add("checked")})}),setTimeout(()=>{let w=m.querySelector(".cw-radio-option.info");w&&w.classList.add("checked")},100);let f=m.querySelector("#cw-bc-cancel"),A=m.querySelector("#cw-bc-close-x"),y=m.querySelector("#cw-bc-send");f.onclick=L,A.onclick=L,y.onclick=G,d.appendChild(m)}function B(f=null){if(!m)return;let A=m.querySelector("#cw-editor-title-label"),y=m.querySelector("#cw-bc-title"),w=m.querySelector("#cw-bc-text"),T=m.querySelector("#cw-bc-send");if(f){n=f.id,A.textContent="Editar Aviso",y.value=f.title||"",w.value=f.text||"",T.textContent="Salvar Altera\xE7\xF5es";let F=f.type||"info",C=m.querySelector(`input[name="cw-bc-type"][value="${F}"]`);C&&C.click()}else{n=null,A.textContent="Novo Aviso",y.value="",w.value="",T.textContent="Publicar";let F=m.querySelector('input[name="cw-bc-type"][value="info"]');F&&F.click()}m.classList.add("active"),setTimeout(()=>y.focus(),300)}function L(){m&&m.classList.remove("active"),n=null}async function G(){let f=m.querySelector("#cw-bc-send"),A=m.querySelector("#cw-bc-title"),y=m.querySelector("#cw-bc-text"),w=m.querySelector('input[name="cw-bc-type"]:checked'),T=w?w.value:"info";if(!A.value.trim()||!y.value.trim()){Y("Preencha todos os campos!",{error:!0});return}f.textContent="Salvando...",f.style.opacity="0.7";let F=!1;n?F=await re.updateBroadcast(n,{title:A.value,text:y.value,type:T}):F=await re.sendBroadcast({title:A.value,text:y.value,type:T,author:window._cwCurrentUser||"admin"}),F?(Y(n?"Atualizado!":"Publicado!"),j.playSuccess(),L(),setTimeout(()=>q(),1500)):(Y("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),f.textContent=n?"Salvar Altera\xE7\xF5es":"Publicar",f.style.opacity="1")}async function X(f){if(await he("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await re.deleteBroadcast(f)){Y("Aviso removido."),j.playClick();let w=Oe.findIndex(T=>T.id===f);w>-1&&Oe.splice(w,1),M(),setTimeout(()=>q(),1500)}else Y("Erro ao excluir.",{error:!0})}let V=document.createElement("div");V.className="cw-nice-scroll",Object.assign(V.style,a.feedContainer),d.appendChild(V);async function q(){e&&(v.style.display="block",v.innerHTML="\u{1F504} Sincronizando...");try{let f=await re.fetchData();f&&f.broadcast&&(Ct(f.broadcast),k(),e&&(M(),v.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{v.style.display="none"},1500)))}catch{e&&(v.innerHTML="\u26A0\uFE0F Offline")}}function k(){let f=document.getElementById("cw-btn-broadcast");if(!f)return;let A=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Oe.some(w=>!A.includes(w.id))){if(f.classList.add("has-new"),!f.querySelector(".cw-badge")){let w=document.createElement("div");w.className="cw-badge",Object.assign(w.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),f.appendChild(w)}}else{f.classList.remove("has-new");let w=f.querySelector(".cw-badge");w&&w.remove()}}function M(){V.innerHTML="";let f=d.querySelector("#cw-bau-widget");f&&f.remove();let A=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),y=[...Oe].sort((z,D)=>{let $=new Date(z.date).getTime()||0;return(new Date(D.date).getTime()||0)-$}),w=y.findIndex(z=>z.title&&z.title.toLowerCase().includes("disponibilidade bau"));if(w!==-1){let z=y[w];y.splice(w,1);let D=document.createElement("div");D.id="cw-bau-widget",Object.assign(D.style,a.bauContainer);let $=[],b=(z.text||"").split(`
`),h=/\d{1,2}\/\d{1,2}/,_="\u{1F4C5}";if(b.forEach(Z=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(Z)?_="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(Z)&&(_="\u{1F1EA}\u{1F1F8}");let ue=Z.match(h);if(ue){let ie=ue[0],ee=_;/🇧🇷|🇵🇹|PT|BR/i.test(Z)?ee="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(Z)&&(ee="\u{1F1EA}\u{1F1F8}"),$.some(ae=>ae.flag===ee&&ae.date===ie)||$.push({flag:ee,date:ie})}}),$.length===0){let Z=(z.text||"").match(/\d{1,2}\/\d{1,2}/g);Z&&[...new Set(Z)].forEach(ue=>$.push({flag:"\u{1F4C5}",date:ue}))}let H="",K='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(K=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${K}
              `),$.length>0?H=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${$.map(ue=>`
                  <div style="${r(a.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(a.bauFlag)}">${ue.flag}</span>
                      <span style="${r(a.bauDate)}">${ue.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${K}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${p(z.text)}</div>
              `:H=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${p(z.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,D.innerHTML=`
              <div style="${r(a.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(a.liveIndicator)}">
                      <div style="${r(a.pulseDot)}"></div>
                      <span style="${r(a.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${i(z.date)}</div>
              </div>
              ${H}
          `,v.after(D);let J=D.querySelector("#cw-bau-toggle-btn"),W=D.querySelector("#cw-bau-full");if(J&&W&&(J.onclick=()=>{let Z=W.style.display==="none";W.style.display=Z?"block":"none",J.textContent=Z?"Ocultar":"Detalhes"}),window._cwIsAdmin){let Z=D.querySelector(".cw-bau-edit");Z&&(Z.onclick=()=>B(z))}}let T=y.sort((z,D)=>{let $=A.includes(z.id),b=A.includes(D.id);return $===b?0:$?1:-1});if(T.length===0&&!w){let z=document.createElement("div");Object.assign(z.style,a.emptyState),z.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,V.appendChild(z)}let F=T.filter(z=>!A.includes(z.id)),C=T.filter(z=>A.includes(z.id));if(F.forEach(z=>V.appendChild(P(z,!1))),C.length>0){let z=document.createElement("div");Object.assign(z.style,a.historyDivider),z.innerHTML=`<span>Hist\xF3rico (${C.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let D=document.createElement("div");Object.assign(D.style,a.historyContainer),C.forEach(b=>D.appendChild(P(b,!0)));let $=!1;z.onclick=()=>{j.playClick(),$=!$,D.style.display=$?"flex":"none",z.querySelector("svg").style.transform=$?"rotate(180deg)":"rotate(0deg)"},V.appendChild(z),V.appendChild(D)}}function P(f,A){let y=document.createElement("div");Object.assign(y.style,A?a.cardHistory:a.card);let w=s[f.type]||s.info,T=document.createElement("div");Object.assign(T.style,a.cardHeader);let F=document.createElement("div");Object.assign(F.style,a.typeTag,{color:w.color,background:w.bg}),F.innerHTML=`${w.icon} <span>${f.type}</span>`;let C=document.createElement("span");if(Object.assign(C.style,a.dateTag),C.textContent=i(f.date),T.appendChild(F),A)T.appendChild(C);else{let h=document.createElement("button");h.className="cw-btn-interactive",Object.assign(h.style,a.dismissBtn),h.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',h.onmouseenter=()=>{h.style.color="#1e8e3e",h.style.background="#e6f4ea",h.style.borderColor="#1e8e3e"},h.onmouseleave=()=>{h.style.color="#5f6368",h.style.background="#fff",h.style.borderColor="rgba(0,0,0,0.1)"},h.onclick=_=>{_.stopPropagation(),j.playClick(),y.style.transform="translateX(20px)",y.style.opacity="0",setTimeout(()=>{let H=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");H.push(f.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(H)),M(),k()},200)},T.appendChild(h)}let z=document.createElement("div");Object.assign(z.style,a.cardContent);let D=document.createElement("div");Object.assign(D.style,a.msgTitle),D.textContent=f.title;let $=document.createElement("div");Object.assign($.style,a.msgBody),$.innerHTML=p(f.text);let b=document.createElement("div");if(Object.assign(b.style,a.msgMeta),b.innerHTML=`Publicado por <b>${f.author||"Sistema"}</b>`,A||(b.innerHTML+=` \u2022 ${i(f.date)}`),z.appendChild(D),z.appendChild($),z.appendChild(b),y.appendChild(T),y.appendChild(z),window._cwIsAdmin){let h=document.createElement("div");h.className="cw-card-actions";let _=document.createElement("button");_.className="cw-action-btn edit",_.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',_.onclick=()=>B(f);let H=document.createElement("button");H.className="cw-action-btn delete",H.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',H.onclick=()=>X(f.id),h.appendChild(_),h.appendChild(H),y.appendChild(h)}return y}let N=re.getCachedBroadcasts();N.length>0&&(Ct(N),M()),setTimeout(l,500),q(),o||(o=setInterval(q,Po));let O=document.createElement("div");Object.assign(O.style,Te),O.className="no-drag",d.appendChild(O),ke(d,O),document.body.appendChild(d);let S=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),I=Oe.some(f=>!S.includes(f.id));return{toggle:g,hasUnread:I}}function mo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,o.overlay);let i=document.createElement("div");Object.assign(i.style,o.card);let a=document.createElement("div");Object.assign(a.style,o.icon);let s=document.createElement("div");Object.assign(s.style,o.title);let r=document.createElement("div");Object.assign(r.style,o.text);let p=document.createElement("div");Object.assign(p.style,o.dotsContainer);let d=document.createElement("div");Object.assign(d.style,o.btnContainer);let c=document.createElement("button");c.textContent="Pular",Object.assign(c.style,o.btn,o.btnSkip),c.onmouseover=()=>c.style.color="#202124",c.onmouseout=()=>c.style.color="#5f6368";let g=document.createElement("button");g.textContent="Pr\xF3ximo",Object.assign(g.style,o.btn,o.btnNext),g.onmouseover=()=>g.style.transform="scale(1.05)",g.onmouseout=()=>g.style.transform="scale(1)",d.appendChild(c),d.appendChild(g),i.appendChild(a),i.appendChild(s),i.appendChild(r),i.appendChild(p),i.appendChild(d),n.appendChild(i),document.body.appendChild(n);function x(m){let l=t[m];a.textContent=l.icon,s.textContent=l.title,r.textContent=l.text,p.innerHTML="",t.forEach((v,E)=>{let B=document.createElement("div");Object.assign(B.style,o.dot),E===m&&Object.assign(B.style,o.dotActive),p.appendChild(B)}),l.isLast?(c.style.display="none",g.textContent="Come\xE7ar \u{1F680}",g.style.width="100%"):(c.style.display="block",g.textContent="Pr\xF3ximo",g.style.width="auto")}function u(){localStorage.setItem("cw_onboarding_seen_v1","true"),n.style.opacity="0",i.style.transform="translateY(20px)",setTimeout(()=>n.remove(),400),j.playSuccess(),Y("Tudo pronto! Use o menu flutuante.")}g.onclick=()=>{j.playClick(),e<t.length-1?(e++,x(e)):u()},c.onclick=async()=>{await he("Pular o tutorial?")&&u()},x(0),requestAnimationFrame(()=>{n.style.opacity="1",i.style.transform="translateY(0)"})}var go={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function bo(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&jo(t)}function jo(t){let e=go.slides,o=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},i=document.createElement("div");Object.assign(i.style,n.overlay);let a=document.createElement("div");Object.assign(a.style,n.card);let s=document.createElement("div");Object.assign(s.style,n.badge),s.textContent=`Atualiza\xE7\xE3o ${t}`;let r=document.createElement("div");Object.assign(r.style,n.icon);let p=document.createElement("div");Object.assign(p.style,n.title);let d=document.createElement("div");Object.assign(d.style,n.text);let c=document.createElement("div");Object.assign(c.style,n.dotsContainer);let g=document.createElement("button");Object.assign(g.style,n.btn),g.onmouseover=()=>g.style.transform="scale(1.02)",g.onmouseout=()=>g.style.transform="scale(1)",a.appendChild(s),a.appendChild(r),a.appendChild(p),a.appendChild(d),a.appendChild(c),a.appendChild(g),i.appendChild(a),document.body.appendChild(i);function x(m){let l=e[m];r.textContent=l.icon,p.textContent=l.title,d.textContent=l.text,c.innerHTML="",e.forEach((v,E)=>{let B=document.createElement("div");Object.assign(B.style,n.dot),E===m&&Object.assign(B.style,n.dotActive),c.appendChild(B)}),m===e.length-1?g.textContent="Entendi, vamos l\xE1! \u{1F44D}":g.textContent="Pr\xF3ximo"}function u(){localStorage.setItem("cw_last_version",t),i.style.opacity="0",a.style.transform="translateY(30px)",setTimeout(()=>i.remove(),400),j.playSuccess(),Y(`TechSol atualizado para ${t}!`)}g.onclick=()=>{j.playClick(),o<e.length-1?(o++,x(o)):u()},x(0),requestAnimationFrame(()=>{i.style.opacity="1",a.style.transform="translateY(0)"})}var fo="cw_timezone_pinned",At=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],$o=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function ho(){let t="v2.2 Pro",e=!1,o=null,n="mx",i=JSON.parse(localStorage.getItem(fo)||"[]"),a="",s="all",r=new Date;r.setHours(14,0,0,0);let p={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},d={container:{display:"flex",flexDirection:"column",height:"100%",background:p.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:p.surface,borderBottom:`1px solid ${p.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:p.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:p.primary,borderBottomColor:p.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:p.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:p.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${p.border}`,background:p.surface,color:p.textSub,transition:"all 0.2s"},chipActive:{background:p.primaryBg,color:p.primary,borderColor:p.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:p.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${p.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:p.surface,border:`1px solid ${p.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:p.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},c=document.createElement("div");c.id="timezone-popup",c.classList.add("cw-module-window"),Object.assign(c.style,le,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let x=ce(c,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:c},()=>A());c.appendChild(x);let u=document.createElement("div");Object.assign(u.style,d.container),c.appendChild(u);let m=document.createElement("div");Object.assign(m.style,d.tabHeader);let l=document.createElement("div");l.textContent="Monitoramento",Object.assign(l.style,d.tabBtn,d.tabActive);let v=document.createElement("div");v.textContent="Planejador",Object.assign(v.style,d.tabBtn),m.appendChild(l),m.appendChild(v),u.appendChild(m);let E=document.createElement("div");Object.assign(E.style,d.toolbar);let B=document.createElement("div");Object.assign(B.style,d.searchInputWrapper);let L=document.createElement("div");L.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(L.style,d.searchIcon);let G=document.createElement("input");G.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(G.style,d.searchInput),G.onfocus=()=>{G.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",G.style.borderColor="rgba(26,115,232,0.3)"},G.onblur=()=>{G.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",G.style.borderColor="transparent"},G.oninput=y=>{a=y.target.value.toLowerCase(),O()},B.appendChild(L),B.appendChild(G),E.appendChild(B);let X=document.createElement("div");Object.assign(X.style,d.chipsRow),$o.forEach(y=>{let w=document.createElement("div");w.textContent=y.label,w.id=`tz-filter-${y.id}`,Object.assign(w.style,d.chip),y.id===s&&Object.assign(w.style,d.chipActive),w.onclick=()=>{j.playClick(),s=y.id,Array.from(X.children).forEach(T=>{Object.assign(T.style,d.chip)}),Object.assign(w.style,d.chipActive),O()},X.appendChild(w)}),E.appendChild(X),u.appendChild(E);let V=document.createElement("div");Object.assign(V.style,d.listContainer);let q=document.createElement("style");q.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",u.appendChild(q);let k=document.createElement("div");Object.assign(k.style,d.plannerWrapper,{display:"none"}),u.appendChild(V),u.appendChild(k),l.onclick=()=>M("live"),v.onclick=()=>M("plan");function M(y){j.playClick(),y==="live"?(Object.assign(l.style,d.tabActive),Object.assign(v.style,d.tabBtn),v.style.borderBottomColor="transparent",V.style.display="flex",E.style.display="flex",k.style.display="none",I()):(Object.assign(v.style,d.tabActive),Object.assign(l.style,d.tabBtn),l.style.borderBottomColor="transparent",k.style.display="flex",V.style.display="none",E.style.display="none",f(),S())}function P(y){return y>=9&&y<17?{color:p.success,bg:p.successBg,label:"Aberto",icon:"\u{1F7E2}"}:y>=8&&y<9?{color:p.warning,bg:p.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:y>=17&&y<19?{color:p.warning,bg:p.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:p.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function N(y){i.includes(y)?i=i.filter(w=>w!==y):i.push(y),localStorage.setItem(fo,JSON.stringify(i)),O(),j.playClick()}function O(){V.innerHTML="";let y=new Date,w=At.filter(F=>{let C=F.name.toLowerCase().includes(a)||F.label.toLowerCase().includes(a),z=s==="all"||F.region===s;return C&&z});if(w.sort((F,C)=>{let z=i.includes(F.id),D=i.includes(C.id);return z&&!D?-1:!z&&D?1:F.name.localeCompare(C.name)}),w.length===0){V.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}w.forEach(F=>{let C=i.includes(F.id),z=y.toLocaleTimeString("pt-BR",{timeZone:F.zone,hour:"2-digit",minute:"2-digit"}),D=parseInt(z.split(":")[0]),$=P(D),b=D<6||D>18,h=document.createElement("div");Object.assign(h.style,d.hubCard),C&&Object.assign(h.style,d.hubCardPinned);let _=C?"\u2605":"\u2606",H=C?"#F9AB00":"#DADCE0";h.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${H}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${_}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${F.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${p.text}; letter-spacing:-0.2px;">${F.name}</div>
                        <div style="font-size:12px; color:${p.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${b?"\u{1F319}":"\u2600\uFE0F"} ${F.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${p.text}; font-family:'Google Sans', sans-serif;">${z}</div>
                    <div style="font-size:11px; font-weight:600; color:${$.color}; background:${$.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${$.label}
                    </div>
                </div>
            `,h.onmouseenter=()=>{h.style.transform="translateY(-2px)",h.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},h.onmouseleave=()=>{h.style.transform="translateY(0)",h.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let K=h.querySelector(".cw-pin-btn");K.onmouseenter=()=>{K.style.backgroundColor="#F1F3F4"},K.onmouseleave=()=>{K.style.backgroundColor="transparent"},K.onclick=J=>{J.stopPropagation(),N(F.id)},h.onclick=()=>{n=F.id,M("plan")},V.appendChild(h)});let T=document.createElement("div");T.style.height="20px",T.style.width="100%",V.appendChild(T)}function S(){k.innerHTML="";let y=document.createElement("div"),w=document.createElement("label");w.textContent="Onde est\xE1 o cliente?",w.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let T=document.createElement("select");Object.assign(T.style,Ye),T.style.padding="14px",[...At].sort((oe,ae)=>oe.name.localeCompare(ae.name)).forEach(oe=>{let ae=document.createElement("option");ae.value=oe.id,ae.textContent=`${oe.flag} ${oe.name} (${oe.zone})`,oe.id===n&&(ae.selected=!0),T.appendChild(ae)}),T.onchange=oe=>{n=oe.target.value,ee(),j.playClick()},y.appendChild(w),y.appendChild(T),k.appendChild(y);let C=document.createElement("div");Object.assign(C.style,d.timeComparisonRow);let z=document.createElement("div");Object.assign(z.style,d.timeCard),z.style.backgroundColor="#F8FAFF",z.style.borderColor="#E8F0FE",z.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let D=document.createElement("div");Object.assign(D.style,d.timeCard),D.style.backgroundColor="#FFF8E1",D.style.borderColor="#FEF7E0",D.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,C.appendChild(z),C.appendChild(D),k.appendChild(C);let $=document.createElement("div");$.id="cw-planner-status",Object.assign($.style,d.statusBadge),k.appendChild($);let b=document.createElement("div");Object.assign(b.style,{padding:"0 4px",marginTop:"12px"});let h=document.createElement("div");h.textContent="Arraste para simular o hor\xE1rio:",h.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let _=document.createElement("div");Object.assign(_.style,d.timelineContainer);let H=document.createElement("div");Object.assign(H.style,d.timelineTrack);let K=document.createElement("div");Object.assign(K.style,d.dayZone),H.appendChild(K);let J=document.createElement("input");J.type="range",J.min="0",J.max="1439",J.step="15",J.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let W=document.createElement("div");W.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",W.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",_.appendChild(H),_.appendChild(J),_.appendChild(W),b.appendChild(h),b.appendChild(_),k.appendChild(b);let Z=z.querySelector("#cw-time-input-br"),ue=D.querySelector("#cw-time-display-client"),ie=D.querySelector("#cw-client-label");function ee(){let oe=At.find(wo=>wo.id===n);ie.textContent=`${oe.flag} ${oe.label} (${oe.zone})`;let ae=r.getHours(),Be=r.getMinutes(),vo=`${String(ae).padStart(2,"0")}:${String(Be).padStart(2,"0")}`;Z.value=vo,J.value=ae*60+Be;let Et=r.toLocaleTimeString("pt-BR",{timeZone:oe.zone,hour:"2-digit",minute:"2-digit"});ue.textContent=Et;let De=parseInt(Et.split(":")[0]);De>=9&&De<17?($.style.background=p.successBg,$.style.color=p.success,$.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):De>=8&&De<9||De>=17&&De<19?($.style.background=p.warningBg,$.style.color=p.warning,$.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):($.style.background=p.errorBg,$.style.color=p.error,$.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}J.oninput=oe=>{let ae=parseInt(oe.target.value);r.setHours(Math.floor(ae/60)),r.setMinutes(ae%60),ee()},Z.oninput=oe=>{let[ae,Be]=oe.target.value.split(":");ae&&Be&&(r.setHours(parseInt(ae)),r.setMinutes(parseInt(Be)),ee())},ee()}function I(){O(),o||(o=setInterval(O,6e4))}function f(){o&&(clearInterval(o),o=null)}function A(){e=!e,pe(e,c,"cw-btn-timezone"),e?M("live"):f()}return document.body.appendChild(c),A}function xo(){let t="v1.1",e=!1,o="general",n=null,i=null;if(!document.getElementById("cw-lib-styles")){let S=document.createElement("style");S.id="cw-lib-styles",S.innerHTML=`
            .cw-lib-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .cw-lib-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; border-color: rgba(0, 122, 255, 0.3) !important; }
            .cw-tactile { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.92) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #5F6368; }
            .cw-toolbar-btn:hover { background: #F1F3F4; color: #007AFF; border-color: #DADCE0; }
            .cw-toolbar-btn.active { background: #E8F0FE; color: #007AFF; border-color: #007AFF; }
        `,document.head.appendChild(S)}let a={bg:"#F0F2F5",surface:"#FFFFFF",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",text:"#1C1C1E",textSub:"#8E8E93",border:"rgba(0, 0, 0, 0.08)",danger:"#FF3B30"},s={container:{display:"flex",flexDirection:"column",height:"100%",background:a.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"12px 16px 0 16px",background:a.surface,borderBottom:`1px solid ${a.border}`},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:a.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",userSelect:"none"},tabActive:{color:a.primary,borderBottomColor:a.primary,fontWeight:"600"},listContainer:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"},emptyState:{padding:"40px 20px",textAlign:"center",color:"#BDC1C6",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},card:{background:a.surface,borderRadius:"16px",padding:"16px",border:`1px solid ${a.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative",overflow:"hidden"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},cardTitle:{fontSize:"14px",fontWeight:"600",color:a.text},cardPreview:{fontSize:"12px",color:a.textSub,lineHeight:"1.5",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"12px",paddingTop:"12px",borderTop:`1px dashed ${a.border}`},actionBtn:{padding:"6px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",cursor:"pointer",border:"none",background:"transparent",transition:"background 0.2s"},fab:{position:"absolute",bottom:"24px",right:"24px",width:"56px",height:"56px",borderRadius:"16px",background:a.primary,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"transform 0.2s",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.85)",backdropFilter:"blur(25px) saturate(180%)",webkitBackdropFilter:"blur(25px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"16px 24px",background:a.surface,borderBottom:`1px solid ${a.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"24px",overflowY:"auto"},inputGroup:{marginBottom:"20px"},label:{display:"block",fontSize:"12px",fontWeight:"700",color:a.textSub,marginBottom:"8px",textTransform:"uppercase"},input:{width:"100%",padding:"12px",borderRadius:"8px",border:`1px solid ${a.border}`,fontSize:"14px",fontFamily:"inherit",outline:"none",background:a.surface,boxSizing:"border-box"}},r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,le,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let d=ce(r,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:r},()=>O());r.appendChild(d);let c=document.createElement("div");Object.assign(c.style,s.container),r.appendChild(c);let g=document.createElement("div");Object.assign(g.style,s.tabHeader);let x=[{id:"general",label:"Geral",icon:"\u{1F4CB}"},{id:"note",label:"Notas",icon:"\u{1F4DD}"},{id:"email",label:"Emails",icon:"\u{1F4E7}"}];x.forEach(S=>{let I=document.createElement("div");I.innerHTML=`${S.icon} ${S.label}`,I.id=`lib-tab-${S.id}`,Object.assign(I.style,s.tabBtn),S.id===o&&Object.assign(I.style,s.tabActive),I.onmouseenter=()=>j.playHover(),I.onclick=()=>X(S.id),g.appendChild(I)}),c.appendChild(g);let u=document.createElement("div");Object.assign(u.style,s.listContainer),c.appendChild(u);let m=document.createElement("div");m.className="cw-fab cw-tactile",Object.assign(m.style,s.fab),m.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',m.onmouseenter=()=>m.style.transform="scale(1.1)",m.onmouseleave=()=>m.style.transform="scale(1)",m.onclick=()=>q(),c.appendChild(m),n=document.createElement("div"),Object.assign(n.style,s.editorOverlay);let l=document.createElement("div");Object.assign(l.style,s.editorHeader),l.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let v=document.createElement("button");v.innerHTML="Cancelar",v.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",v.onclick=k,l.appendChild(v),n.appendChild(l);let E=document.createElement("div");Object.assign(E.style,s.editorBody),n.appendChild(E);let B=document.createElement("div");B.style.cssText="padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";let L=document.createElement("button");L.textContent="Salvar",L.style.cssText="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);",L.onclick=M,B.appendChild(L),n.appendChild(B),c.appendChild(n);let G=document.createElement("div");Object.assign(G.style,Te),G.className="no-drag",r.appendChild(G),ke(r,G),document.body.appendChild(r);function X(S){j.playClick(),o=S,x.forEach(I=>{let f=document.getElementById(`lib-tab-${I.id}`);I.id===S?Object.assign(f.style,s.tabActive):Object.assign(f.style,s.tabBtn)}),V()}function V(){u.innerHTML="";let S=me.getSnippets(o);if(S.length===0){u.innerHTML=`
                <div style="${N(s.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;return}S.forEach(I=>{let f=document.createElement("div");f.className="cw-lib-card",Object.assign(f.style,s.card),I.isCode&&(f.style.borderLeft=`4px solid ${a.primary}`,f.style.background="rgba(0, 122, 255, 0.02)");let A=I.content;if(I.isRich){let y=document.createElement("div");y.innerHTML=I.content;let w=y.querySelector("img");A=y.innerText.substring(0,150)+(y.innerText.length>150?"...":""),w&&(A="\u{1F5BC}\uFE0F [Cont\xE9m Imagens] "+A)}f.innerHTML=`
                <div style="${N(s.cardHeader)}">
                    <div style="${N(s.cardTitle)}">${I.title}</div>
                    <div style="display:flex; gap:4px;">
                        ${I.isCode?'<span style="font-size:10px; background:#F1F3F4; color:#5F6368; padding:2px 6px; border-radius:4px; font-family:monospace;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>':""}
                    </div>
                </div>
                <div style="${N(s.cardPreview)}; ${I.isCode?"font-family:'Roboto Mono', monospace; font-size:11px;":""}">${A}</div>
                <div style="${N(s.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${N(s.actionBtn)}; color:#007AFF; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${N(s.actionBtn)}; color:#8E8E93; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${N(s.actionBtn)}; color:#FF3B30; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                    </button>
                </div>
            `,f.onmouseenter=()=>{j.playHover()},f.querySelector(".cw-act-copy").onclick=y=>{if(y.stopPropagation(),j.playClick(),I.isRich){let w=new Blob([I.content],{type:"text/html"}),T=document.createElement("div");T.style.whiteSpace="pre-wrap",T.innerHTML=I.content;let F=new Blob([T.innerText],{type:"text/plain"}),C=[new ClipboardItem({"text/html":w,"text/plain":F})];navigator.clipboard.write(C)}else navigator.clipboard.writeText(I.content);Y("Copiado!")},f.querySelector(".cw-act-edit").onclick=y=>{y.stopPropagation(),j.playClick(),q(I)},f.querySelector(".cw-act-del").onclick=async y=>{y.stopPropagation(),j.playClick(),await he("Excluir este item?")&&(me.delete(I.id),V(),Y("Item exclu\xEDdo."))},u.appendChild(f)})}function q(S=null){i=S?S.id:null,E.innerHTML="",E.appendChild(P("title","T\xEDtulo / Nome",S?S.title:"")),o==="email"&&E.appendChild(P("subject","Assunto do Email",S?S.subject:""));let I="Conte\xFAdo";o==="email"&&(I="Corpo do Email (HTML)"),o==="note"&&(I="Texto da Nota (Reason)"),E.appendChild(P("content",I,S?S.content:"",{isRich:!0,isCode:S?S.isCode:!1})),l.querySelector("span").textContent=S?"Editar Item":"Novo Item",n.style.transform="translateY(0)",setTimeout(()=>{let f=E.querySelector("input");f&&f.focus()},300)}function k(){n.style.transform="translateY(100%)",setTimeout(()=>i=null,300)}async function M(){let S=E.querySelector("#cw-inp-title"),I=E.querySelector("#cw-inp-content"),f=S.value.trim(),A=I.contentEditable==="true"?I.innerHTML:I.value.trim(),y=I.getAttribute("data-is-code")==="true";if(!f||!A||A==="<br>"){Y("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let w={id:i,type:o,title:f,content:A,isCode:y,isRich:I.contentEditable==="true"};if(o==="email"){let T=E.querySelector("#cw-inp-subject").value.trim();if(!T){Y("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}w.subject=T}L.textContent="Salvando...",await me.save(w),L.textContent="Salvar",k(),V(),Y("Salvo com sucesso!"),j.playSuccess()}function P(S,I,f,A={}){let y=document.createElement("div");Object.assign(y.style,s.inputGroup);let w=document.createElement("label");w.textContent=I,Object.assign(w.style,s.label);let T;if(A.isRich){let F=document.createElement("div");F.style.cssText="display:flex; gap:6px; margin-bottom:12px; background:rgba(241, 243, 244, 0.8); padding:6px; border-radius:12px; border:1px solid #DADCE0; backdrop-filter: blur(10px);",F.innerHTML=`
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
            `,T=document.createElement("div"),T.contentEditable="true",Object.assign(T.style,s.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),T.innerHTML=f||"",A.isCode&&(T.style.fontFamily="'Roboto Mono', monospace",T.style.backgroundColor="#F8F9FA",T.setAttribute("data-is-code","true")),F.querySelectorAll(".cw-toolbar-btn").forEach(C=>{C.onmouseenter=()=>j.playHover(),C.onmousedown=()=>j.playClick()}),F.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),T.focus()},F.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),T.focus()},F.querySelector(".cw-tb-code").onclick=C=>{let D=!(T.getAttribute("data-is-code")==="true");T.setAttribute("data-is-code",D),T.style.fontFamily=D?"'Roboto Mono', monospace":"inherit",T.style.backgroundColor=D?"rgba(0, 122, 255, 0.03)":a.surface,D?C.currentTarget.classList.add("active"):C.currentTarget.classList.remove("active"),T.focus()},F.querySelector(".cw-tb-img").onclick=async()=>{let C=await Bt("Cole a URL da imagem:");C&&(document.execCommand("insertImage",!1,C),T.querySelectorAll("img").forEach(D=>{D.style.maxWidth="100%",D.style.borderRadius="8px"}))},T.onpaste=C=>{let z=(C.clipboardData||C.originalEvent.clipboardData).items;for(let D of z)if(D.kind==="file"&&D.type.startsWith("image/")){C.preventDefault();let $=D.getAsFile(),b=new FileReader;b.onload=h=>{let _=`<img src="${h.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,_)},b.readAsDataURL($)}},y.appendChild(w),y.appendChild(F)}else T=document.createElement("input"),T.type="text",Object.assign(T.style,s.input),T.value=f||"",y.appendChild(w);return T.id=`cw-inp-${S}`,T.onfocus=()=>{T.style.borderColor=a.primary,T.style.boxShadow=`0 0 0 2px ${a.primaryBg}`},T.onblur=()=>{T.style.borderColor=a.border,T.style.boxShadow="none"},y.appendChild(T),y}function N(S){return Object.entries(S).map(([I,f])=>`${I.replace(/[A-Z]/g,A=>"-"+A.toLowerCase())}:${f}`).join(";")}function O(){e=!e,pe(e,r,"cw-btn-library"),e&&V()}return O}function yo(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},n="cw-configs-styles";if(!document.getElementById(n)){let u=document.createElement("style");u.id=n,u.innerHTML=`
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
        `,document.head.appendChild(u)}let i=document.createElement("div");i.id="configs-popup",i.classList.add("cw-module-window"),Object.assign(i.style,le,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let s=ce(i,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:i},()=>x());i.appendChild(s);let r=document.createElement("div");r.className="cw-configs-container",i.appendChild(r);let p=document.createElement("div");p.className="cw-configs-section",p.innerHTML=`
        <div class="cw-configs-section-title">Prefer\xEAncias de Som</div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label">Efeitos Sonoros</div>
                    <div class="cw-configs-desc">Ativar ou desativar sons de interface.</div>
                </div>
                <input type="checkbox" id="cw-config-sound-toggle" ${j.isMuted()?"":"checked"} style="cursor:pointer; width:20px; height:20px;">
            </div>
        </div>
    `;let d=p.querySelector("#cw-config-sound-toggle");d.onchange=u=>{j.setMuted(!u.target.checked),u.target.checked&&j.playClick()},r.appendChild(p);let c=document.createElement("div");c.className="cw-configs-section",c.innerHTML=`
        <div class="cw-configs-section-title">Apar\xEAncia</div>
        <div class="cw-configs-card">
            <div style="color:${o.textSub}; font-size:13px; text-align:center; padding:10px;">
                Em breve: Suporte a modo escuro e esquemas de cores.
            </div>
        </div>
    `,r.appendChild(c);let g=document.createElement("div");g.className="cw-configs-section",g.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <button class="cw-configs-btn">Reportar Bug</button>
                <button class="cw-configs-btn">Sugerir Recurso</button>
            </div>
        </div>
    `,r.appendChild(g);function x(){e=!e,pe(e,i,"cw-btn-configs"),e&&j.playClick()}return document.body.appendChild(i),x}function Ho(){if(window.techSolInitialized){bt();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{Lt();try{j.initGlobalListeners(),j.playStartup()}catch(d){console.warn("\xC1udio bloqueado:",d)}re.fetchTips(),bt();let e=ao(),o=so(),n=lo(),i=po(),a=ho(),s=xo(),r=yo(),p=uo();Kt({toggleNotes:e,toggleEmail:o,toggleScript:n,toggleLinks:i,toggleTimezone:a,toggleLibrary:s,toggleConfigs:r,broadcastControl:p}),setTimeout(()=>{re.logEvent("App","Start","Session Start"),mo(),setTimeout(()=>{bo(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),Y("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Ho();})();
