(()=>{var ho=Object.defineProperty;var yo=(t,e)=>()=>(t&&(e=t(t=0)),e);var vo=(t,e)=>{for(var o in e)ho(t,o,{get:e[o],enumerable:!0})};var Xe={};vo(Xe,{NotesState:()=>Ye,notesState:()=>B});var Ye,B,ze=yo(()=>{Ye=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.excludedFields=new Set,this.activeFields=[];let e=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(e||"[]")),this.screenshotMode="implementation"}setCaseType(e){this.currentCaseType=e,this.isDirty=!0,this.notify()}setLanguage(e){this.currentLang=e,this.notify()}setPortugalCase(e){this.isPortugalCase=e,this.isDirty=!0,this.notify()}setConsent(e){this.consent=e,this.isDirty=!0,this.notify()}setTagSupportUsed(e){this.tagSupportUsed=e,e||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(e){this.activeFields=[...e],this.isDirty=!0,this.notify()}removeField(e){this.activeFields=this.activeFields.filter(o=>o!==e),this.isDirty=!0,this.notify()}addFieldAt(e,o){this.activeFields.includes(e)||(this.activeFields.splice(o,0,e),this.isDirty=!0,this.notify())}setForcedScreenshots(e){this.forcedScreenshots=new Set(e),this.isDirty=!0,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.isDirty=!0,this.notify()}setExcludedFields(e){this.excludedFields=new Set(e),this.isDirty=!0,this.notify()}toggleFieldExclusion(e,o){o?this.excludedFields.add(e):this.excludedFields.delete(e),this.isDirty=!0,this.notify()}setStatus(e){this.currentStatus=e,this.isDirty=!0,this.notify()}setSubStatus(e){this.currentSubStatus=e,this.isDirty=!0,this.notify()}setScreenshotMode(e){this.screenshotMode=e,this.notify()}setActiveTasks(e){this.activeTasks=e,this.isDirty=!0,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]=o,this.isDirty=!0,this.notify()}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},B=new Ye});var Ve="",Ue="",St=t=>new Promise(e=>setTimeout(e,t));async function Ct(){if(Ve&&Ue)return Ve;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await St(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let a=document.querySelector("profile-details img");if(a&&a.src.includes("/photos/")){let s=a.src.match(/\/photos\/([^\?]+)/)[1];e=s.charAt(0).toUpperCase()+s.slice(1)}}let n=document.querySelector("profile-details .email");return n&&(Ue=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Ue)),t.click(),document.body.click(),Ve=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function rt(){return Ve||"Consultor"}function he(){return Ue||null}function At(t){let e=new Date,o=e.getHours(),n=e.getDay(),a="Ol\xE1",s="";o>=5&&o<12?(a="Bom dia",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(a="Boa tarde",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(a="Boa noite",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let i=[];o>=0&&o<5?i=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?n===1?i=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?i=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:i=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?i=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:i=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(i=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=i[Math.floor(Math.random()*i.length)];return{prefix:`${a},`,name:t,suffix:r,icon:s,isFriday:n===5}}async function wo(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,n=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');n&&(n.click(),await St(500));let s=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(i=>{let r=i.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return s?s.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function So(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function Co(){try{let e=Array.from(document.querySelectorAll(".data-pair-label")).find(a=>a.textContent.includes("Google Ads External Customer ID")||a.textContent.includes("Customer ID"));if(e){let a=e.closest("home-data-item")||e.parentElement;if(a){let s=a.querySelector(".data-pair-content");if(s)return s.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let n=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(n)return n[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"---"}async function Ao(){let t="---";try{t=window.location.href.split("/").pop()}catch(e){console.warn("Falha URL:",e)}return t}async function Te(){let t="Cliente",e="[INSERIR URL]";try{let r=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(r&&r.nextElementSibling){let g=r.nextElementSibling.innerText.trim();g&&(t=g)}}catch(i){console.warn("Falha Nome:",i)}try{let r=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(r&&r.nextElementSibling){let g=r.nextElementSibling.innerText.trim();g&&(e=g)}}catch(i){console.warn("Falha URL:",i)}let o=await wo(),n=So(),a=Co(),s=await Ao();return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:n,cid:a,agentName:rt(),caseId:s}}var Fe=null,lt=null,Se=.3;var Ce=localStorage.getItem("cw_sounds_muted")==="true";function ke(){if(!Fe){let t=window.AudioContext||window.webkitAudioContext;t&&(Fe=new t)}return Fe&&Fe.state==="suspended"&&Fe.resume(),Fe}function Et(t){if(lt)return lt;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),n=o.getChannelData(0);for(let a=0;a<e;a++)n[a]=Math.random()*2-1;return lt=o,o}var j={setMuted:t=>{Ce=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>Ce,playClick:()=>{if(Ce)return;let t=ke();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Et(t);let n=t.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let a=t.createGain();a.gain.setValueAtTime(Se*.8,e),a.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(n),n.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(Ce)return;let t=ke();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(Se*.1,e+.005),n.gain.linearRampToValueAtTime(0,e+.02),o.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(Ce)return;let t=ke();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((n,a)=>{let s=t.createOscillator(),i=t.createGain();s.type="sine",s.frequency.value=n,i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Se*.6,e+.05),i.gain.exponentialRampToValueAtTime(.001,e+.6),s.connect(i),i.connect(t.destination),s.start(e),s.stop(e+.7)})},playGenieOpen:()=>{if(Ce)return;let t=ke();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Et(t);let n=t.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,e),n.frequency.exponentialRampToValueAtTime(800,e+.2);let a=t.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Se*.5,e+.05),a.gain.linearRampToValueAtTime(0,e+.25),o.connect(n),n.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(Ce)return;let t=ke();if(!t)return;let e=t.currentTime,o=t.createOscillator(),n=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),n.gain.setValueAtTime(Se,e),n.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(Ce)return;let t=ke();if(!t)return;let e=t.currentTime,o=.12,n=t.createOscillator(),a=t.createGain(),s=t.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,e),n.frequency.exponentialRampToValueAtTime(50,e+.1),s.type="lowpass",s.frequency.setValueAtTime(800,e),s.frequency.exponentialRampToValueAtTime(100,e+.1),a.gain.setValueAtTime(Se*4,e),a.gain.exponentialRampToValueAtTime(.001,e+.1),n.connect(s),s.connect(a),a.connect(t.destination),n.start(e),n.stop(e+.12);let i=t.createOscillator(),r=t.createGain();i.type="sine",i.frequency.setValueAtTime(150,e),i.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(Se*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),i.connect(r),r.connect(t.destination),i.start(e),i.stop(e+.15),[55,55.4,110.5].forEach(l=>{let c=t.createOscillator(),p=t.createGain(),T=t.createBiquadFilter();c.type="sawtooth",c.frequency.value=l,T.type="lowpass",T.frequency.setValueAtTime(30,e),T.frequency.linearRampToValueAtTime(900,e+o+.2),T.frequency.exponentialRampToValueAtTime(40,e+3),p.gain.setValueAtTime(0,e),p.gain.linearRampToValueAtTime(Se*.6,e+o+.1),p.gain.exponentialRampToValueAtTime(.001,e+3.5),c.connect(T),T.connect(p),p.connect(t.destination),c.start(e),c.stop(e+3.6)})},playNotification:()=>{if(Ce)return;let t=ke();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let a=t.createOscillator(),s=t.createGain();a.type="sine",a.frequency.setValueAtTime(n.freq,e),s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(Se*n.vol,e+.004),s.gain.exponentialRampToValueAtTime(.001,e+n.dur),a.connect(s),s.connect(t.destination),a.start(e),a.stop(e+n.dur+.1)})},playSwoosh:()=>{j.playGenieOpen()},playReset:()=>{j.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!Fe)return;let n=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(o.relatedTarget))return;let a=Date.now();a-t<e||(j.playHover(),t=a)},{passive:!0})}};var Tt=1e4;function Ft(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function J(t,e={}){let o=document.createElement("div"),n=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?j.playError():j.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function Ot(t,e=null){let o=0,n=0,a=0,s=0,i=e||t;i.style.cursor="grab",i.onmousedown=r;function r(c){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(c.target.tagName)||c.target.closest(".no-drag"))return;c=c||window.event,i.style.cursor="grabbing",t.style.transition="none";let p=t.getBoundingClientRect();t.style.transform="none",t.style.left=p.left+"px",t.style.top=p.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",Tt++,t.style.zIndex=Tt,a=c.clientX,s=c.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=l,document.onmousemove=g}function g(c){c=c||window.event,c.preventDefault(),o=a-c.clientX,n=s-c.clientY,a=c.clientX,s=c.clientY;let p=t.offsetTop-n,T=t.offsetLeft-o,x=16,f=window.innerWidth,m=window.innerHeight,v=t.offsetWidth,A=t.offsetHeight;T<x?T=x:T+v>f-x&&(T=f-v-x),p<x?p=x:p+A>m-x&&(p=m-A-x),t.style.top=p+"px",t.style.left=T+"px"}function l(){document.onmouseup=null,document.onmousemove=null,i.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var ce={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var dt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},We={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var _t={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Re={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var ct=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],kt=-1;function It(){let t=Math.floor(Math.random()*ct.length);return t===kt&&(t=(t+1)%ct.length),kt=t,ct[t]}var Ae=t=>new Promise(e=>setTimeout(e,t));async function Eo(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await Ae(200);for(let n=0;n<e.length;n++){let a=e.charAt(n),s=document.createElement("span");s.textContent=a,o&&o.parentNode===t?o.before(s):t.appendChild(s);let i=Math.floor(Math.random()*60)+30;n===0&&(i=150),n>e.length-3&&(i=30),await Ae(i)}await Ae(600),o&&(o.style.display="none")}async function pt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Ae(200);let e=await Ct(),o=At(e),n=t.querySelector("#w-icon"),a=t.querySelector("#p1"),s=t.querySelector("#p2"),i=t.querySelector("#p3"),r=t.querySelector("#p-sextou");n&&(n.innerHTML=o.icon),a&&(a.textContent=o.prefix),i&&(i.textContent=o.suffix),await Ae(300);let g=n?n.querySelector("svg"):null;if(g&&(g.style.opacity="1",g.style.transform="scale(1)"),await Ae(400),a&&(a.style.opacity="1"),j.playStartup(),s&&await Eo(s,o.name),i&&(i.style.opacity="1",i.style.transform="translateY(0)"),o.isFriday&&r){await Ae(400),r.style.display="block",r.offsetWidth;let l=r.querySelector(".sextou-badge");l&&(l.style.opacity="1",l.style.transform="scale(1)")}await Ae(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Ae(900),t.parentNode&&t.parentNode.removeChild(t)}}function Lt(t){if(!t)return;let e=t.getBoundingClientRect(),o=window.innerWidth,n=window.innerHeight,a=24,s=o-e.width-a,i=n-e.height-a,r=parseFloat(t.style.left)||e.left,g=parseFloat(t.style.top)||e.top,l=Math.max(a,Math.min(r,s)),c=Math.max(a,Math.min(g,i));if(l!==r||c!==g){let p=t.style.transition;t.style.transition="left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",t.style.left=`${l}px`,t.style.top=`${c}px`,setTimeout(()=>{t.style.transition=p},300)}}var ye={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function ve(t,e){e.onmousedown=o;function o(n){n.stopPropagation(),n.preventDefault();let a=t.style.transition;t.style.transition="none";let s=n.clientX,i=n.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),g=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),l=s,c=i,p=!1;function T(m){l=m.clientX,c=m.clientY,p||(window.requestAnimationFrame(()=>{x(),p=!1}),p=!0)}function x(){let m=r+(l-s),v=g+(c-i);m>360&&(t.style.width=m+"px"),v>300&&(t.style.height=v+"px")}function f(){document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",f),setTimeout(()=>{t.style.transition=a},50)}document.addEventListener("mousemove",T),document.addEventListener("mouseup",f)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function qt(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function Mt(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function Dt(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function ue(t,e={}){return new Promise(o=>{let n=Mt(),a=Dt(),s=e.danger?"#FF3B30":"#007AFF",i=e.confirmText||(e.danger?"Excluir":"Confirmar");a.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${s}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${i}</button>
            </div>
        `,n.appendChild(a),document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity=1,a.style.transform="scale(1)"});let r=c=>{n.style.opacity=0,a.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(c)},300)},g=a.querySelector("#cw-conf-cancel"),l=a.querySelector("#cw-conf-ok");[g,l].forEach(c=>c.onmouseenter=()=>j.playHover()),g.onclick=()=>{j.playClick(),r(!1)},l.onclick=()=>{j.playClick(),r(!0)}})}function Nt(t,e=""){return new Promise(o=>{let n=Mt(),a=Dt();a.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,n.appendChild(a),document.body.appendChild(n);let s=a.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{n.style.opacity=1,a.style.transform="scale(1)",setTimeout(()=>s.focus(),100)});let i=l=>{n.style.opacity=0,a.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(l)},300)},r=a.querySelector("#cw-prompt-cancel"),g=a.querySelector("#cw-prompt-ok");[r,g].forEach(l=>l.onmouseenter=()=>j.playHover()),r.onclick=()=>{j.playClick(),i(null)},g.onclick=()=>{j.playClick(),i(s.value)},s.onkeydown=l=>{l.key==="Enter"&&g.click(),l.key==="Escape"&&r.click()}})}ze();var To={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Rt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function de(t,e,o,n,a,s){let i=document.createElement("div");Object.assign(i.style,To),Ot(t,i);let r=document.createElement("div");if(Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let A=document.createElement("style");A.id="cw-header-anim",A.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(A)}r.style.animation="cw-header-flow 6s linear infinite",i.appendChild(r),a&&(a.googleLine=r);let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center",gap:"12px"});let l=document.createElement("img");l.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(l.style,{width:"20px",height:"20px",pointerEvents:"none"});let c=document.createElement("span");c.textContent=e,g.appendChild(l),g.appendChild(c);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"4px"});let T='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',x='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',f=document.createElement("div");f.innerHTML=T,Object.assign(f.style,Rt),f.title="Sobre & Feedback",f.classList.add("no-drag"),f.onmouseenter=()=>{f.style.background="rgba(255,255,255,0.1)",f.style.color="#FFF"},f.onmouseleave=()=>{f.style.color!=="rgb(138, 180, 248)"&&(f.style.background="transparent",f.style.color="#9AA0A6")};let m=document.createElement("div");m.innerHTML=x,Object.assign(m.style,Rt),m.title="Fechar",m.classList.add("no-drag"),m.onmouseenter=()=>{m.style.background="rgba(242, 139, 130, 0.2)",m.style.color="#F28B82"},m.onmouseleave=()=>{m.style.background="transparent",m.style.color="#9AA0A6"},m.onmousedown=A=>A.stopPropagation(),f.onmousedown=A=>A.stopPropagation(),m.onclick=s;let v=ko(t,e,o,n);return f.onclick=A=>{A.stopPropagation(),v.style.opacity==="1"?(v.style.opacity="0",v.style.pointerEvents="none",f.style.color="#9AA0A6",f.style.background="transparent"):(v.style.opacity="1",v.style.pointerEvents="auto",f.style.color="#8AB4F8",f.style.background="rgba(138, 180, 248, 0.1)")},p.appendChild(f),p.appendChild(m),i.appendChild(g),i.appendChild(p),i}function ko(t,e,o,n){let a=document.createElement("div");return Object.assign(a.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),a.innerHTML=`
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
    `,setTimeout(()=>{let s=a.querySelector("#cw-feedback-link");s&&(s.onmouseenter=()=>{s.style.backgroundColor="#E8F0FE",s.style.transform="scale(1.02)"},s.onmouseleave=()=>{s.style.backgroundColor="#F8F9FA",s.style.transform="scale(1)"});let i=a.querySelector("#close-help-internal");i&&(i.onmouseover=()=>i.style.backgroundColor="#f8f9fa",i.onmouseout=()=>i.style.backgroundColor="white",i.onclick=()=>{a.style.opacity="0",a.style.pointerEvents="none"})},0),t.appendChild(a),a}var q={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},re={small:"8px",medium:"12px",large:"20px",pill:"100px"},Oe={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},ae="cubic-bezier(0.34, 1.56, 0.64, 1)",Fo={width:"100%",padding:"14px 16px",borderRadius:re.medium,border:`1.5px solid ${q.border}`,backgroundColor:q.bgInput,fontSize:"14px",color:q.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${ae}`,outline:"none"},Xo={...Fo,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},Jo={fontSize:"12px",fontWeight:"700",color:q.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},Ko={display:"block",fontSize:"14px",fontWeight:"600",color:q.text,marginBottom:"10px",marginTop:"20px"},Zo={fontSize:"12px",color:q.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},ut={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:q.primary},Qo={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:q.text,cursor:"pointer",padding:"16px 20px",backgroundColor:q.surface,border:`1px solid ${q.border}`,borderRadius:re.large,transition:`all 0.4s ${ae}`,userSelect:"none",boxShadow:Oe.subtle},en={padding:"14px 28px",color:"#fff",backgroundColor:q.primary,border:"none",borderRadius:re.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${ae}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},tn={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${q.primary}`,color:q.primary,borderRadius:re.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${ae}`},on={background:"transparent",border:`1px solid ${q.border}`,borderRadius:re.pill,color:q.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${ae}`};function zt(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,ce,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${ae}, height 0.4s ${ae}, transform 0.4s ${ae}, opacity 0.3s ease`,borderRadius:re.large,boxShadow:Oe.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let n={popup:o,googleLine:null},a=de(o,"Case Notes",t,"Gera notas padronizadas com excel\xEAncia visual.",n,e);o.appendChild(a);let s=document.createElement("div");s.className="cw-popup-content",Object.assign(s.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:q.surface}),o.appendChild(s);let i=document.createElement("div");i.textContent="created by lucaste@",Object.assign(i.style,_t,{padding:"16px 24px",borderTop:`1px solid ${q.bgInput}`,color:q.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(i);let r=document.createElement("div");return Object.assign(r.style,ye),r.className="no-drag",o.appendChild(r),ve(o,r),Oo(),{popup:o,content:s,header:a,animRefs:n,credit:i}}function Oo(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${re.medium} !important;
            border: 1.5px solid ${q.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: all 0.2s ${ae} !important;
            box-sizing: border-box !important;
            background: ${q.bgInput} !important;
            color: ${q.text} !important;
            outline: none !important;
            box-shadow: ${Oe.subtle} !important;
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
            transition: border-color 0.2s ${ae}, background-color 0.2s ${ae}, box-shadow 0.2s ${ae} !important;
        }

        .cw-input:hover, .cw-textarea:hover, #notes-assistant-popup .cw-select:hover {
            border-color: #bdc1c6 !important;
            background-color: #f1f3f4 !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }

        .cw-input:focus, .cw-textarea:focus, #notes-assistant-popup .cw-select:focus {
            border-color: ${q.primary} !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15), 0 2px 8px rgba(0,0,0,0.05) !important;
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${q.textSub};
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
            background: ${q.bgInput};
        }

        .cw-btn-primary {
            background: ${q.primary};
            color: #fff;
            border: none;
            border-radius: ${re.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${ae};
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
            color: ${q.textSub};
            border: 1px solid ${q.border};
            border-radius: ${re.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${ae};
        }
        .cw-btn-secondary:hover {
            background: ${q.bgInput};
            border-color: #bdc1c6;
            color: ${q.text};
        }
    `,document.head.appendChild(t)}var be={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} Seguimos com os passos:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Pasos ejecutados:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:"}},xe={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},we={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},qe={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Me=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Je=["CONSIDERACOES","COMENTARIOS"],Ke={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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

Irei solicitar descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var De=t=>new Promise(e=>setTimeout(e,t));function Be(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var Bt="cw-automation-styles";if(!document.getElementById(Bt)){let t=document.createElement("style");t.id=Bt,t.innerHTML=`
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
    `,document.head.appendChild(t)}function Pt(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function Ht(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),o="";Pt(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(Be(n),await De(1200));let a=document.querySelector("search-filter dropdown-button .button");if(a&&!(a.innerText||"").includes("All")){Be(a),await De(600);let T=document.querySelector('material-checkbox[debug-id="check-all-box"]');T&&T.getAttribute("aria-checked")!=="true"&&(Be(T),await De(300));let x=document.querySelector('material-button[debug-id="apply-filter"]');x&&(Be(x),await De(1500))}let s=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");s&&(s.scrollTop=s.scrollHeight,await De(500));let i=Array.from(document.querySelectorAll(".message-header"));for(let p=i.length-1;p>=0;p--){let T=i[p],x=T.querySelector("i.material-icons-extended"),f=x&&x.innerText.trim()==="phone_in_talk",m=T.innerText||"",v=m.includes("Agent joined")||m.includes("outbound-call")||m.includes("Speakeasy");if(f||v){T.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",T),e&&(e.placeholder="Lendo mensagem..."),Be(T),await De(1e3));break}}let g=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),l=/Speakeasy.*?(P\d{15,25})/i,c=null;for(let p=g.length-1;p>=0;p--){let T=g[p];if(T.offsetParent===null)continue;let x=(T.innerText||"").match(l);if(x&&x[1]){c=x[1];break}}if(e)if(c){try{await navigator.clipboard.writeText(c)}catch{}e.value=c,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),j.playSuccess(),J(`ID Localizado: ${c}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else j.playError(),J("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),J("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),Pt(!1)}}function jt(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,n=this.selectionEnd,a=this.value,s=a.lastIndexOf(`
`,o-1)+1,i=a.substring(s,o);if(e.key==="Enter"){e.preventDefault();let r=i.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(i.trim()==="\u2022"){this.value=a.substring(0,s)+`
`+a.substring(n),this.selectionStart=this.selectionEnd=s+1;return}let g=`
`+r;this.value=a.substring(0,o)+g+a.substring(n),this.selectionStart=this.selectionEnd=o+g.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?i.startsWith("  ")&&(this.value=a.substring(0,s)+i.substring(2)+a.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=a.substring(0,s)+"  "+i+a.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===n&&o>0){let r=a.substring(0,o);r.endsWith("\u2022 ")?(e.preventDefault(),this.value=r.substring(0,o-2)+a.substring(n),this.selectionStart=this.selectionEnd=o-2):r.endsWith("  ")&&i.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=r.substring(0,o-2)+a.substring(n),this.selectionStart=this.selectionEnd=o-2)}}))}function mt(t,e,o){if(e.innerHTML="",!!we[t]&&(o.activeFields.forEach(a=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(a))return;let s=`field-${a}`,i=document.createElement("label"),r=p=>be[o.currentLang]?.[p]||be.pt?.[p]||p;i.textContent=r(a.toLowerCase())!==a.toLowerCase()?r(a.toLowerCase()):a.replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase())+":",Object.assign(i.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:q.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let g=document.createElement("span");if(g.textContent=i.textContent,i.innerHTML="",i.appendChild(g),a==="SPEAKEASY_ID"){let p=document.createElement("button");p.innerHTML="\u2728 Auto Busca",p.style.cssText=`font-size: 11px; font-weight: 700; color: ${q.primary}; background-color: ${q.primaryBg}; border: none; border-radius: ${re.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${ae};`,p.onmouseenter=()=>p.style.backgroundColor="#d2e3fc",p.onmouseleave=()=>p.style.backgroundColor=q.primaryBg,p.onclick=T=>{T.preventDefault(),Ht(s)},i.appendChild(p)}let l=document.createElement("button");l.innerHTML="\u2715",l.style.cssText=`font-size: 14px; background: ${q.bgInput}; border: none; color: ${q.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${ae};`,l.onmouseenter=()=>{l.style.background=q.error,l.style.color=q.surface},l.onmouseleave=()=>{l.style.background=q.bgInput,l.style.color=q.textSub},l.onclick=async p=>{p.preventDefault(),await ue(`Tem certeza que deseja remover o campo "${g.textContent.replace(":","")}"?`)&&(o.removeField(a),mt(t,e,o))},i.appendChild(l);let c;Me.includes(a)?(c=document.createElement("textarea"),c.classList.add("bullet-textarea","cw-textarea"),c.placeholder="Utilize marcadores para detalhar...",jt(c)):Je.includes(a)?(c=document.createElement("textarea"),c.classList.add("cw-textarea"),c.placeholder="Descreva as considera\xE7\xF5es..."):(c=document.createElement("input"),c.type="text",c.classList.add("cw-input")),c.id=s,c.value=o.formData[s]||"",c.addEventListener("input",p=>o.updateField(s,p.target.value)),e.appendChild(i),e.appendChild(c)}),o.activeFields.includes("CONSENTIU_GRAVACAO"))){let a=r=>be[o.currentLang]?.[r]||be.pt?.[r]||r,s=document.createElement("label");s.textContent=a("consentiu_gravacao"),Object.assign(s.style,{display:"block",fontSize:"13px",fontWeight:"700",color:q.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let i=document.createElement("select");i.className="cw-select",i.innerHTML=`
            <option value="false">${a("nao")}</option>
            <option value="true">${a("sim")}</option>
        `,i.value=o.consent?"true":"false",i.onchange=()=>o.setConsent(i.value==="true"),e.appendChild(s),e.appendChild(i)}}function gt(t,e,o){let n=t.currentSubStatus;if(!n)return null;let a=we[n],s=be[t.currentLang]||be.pt,i=l=>s[l]||be.pt?.[l]||l,r='style="margin-bottom: 12px; padding-left: 30px;"',g="";if(t.activeFields.forEach(l=>{let c=i(l.toLowerCase()),p="N/A";if(l==="label_substatus")c=i("label_substatus"),p=a.name;else if(l==="TAGS_IMPLEMENTED"){c=i("tags_implemented");let T=[];e.getCheckedElements().forEach(f=>{let m=f.value,v=xe[m],A=f.count||1,H=m==="ads_conversion_tracking"||m==="ads_enhanced_conversions";t.tagSupportUsed&&H&&!t.forcedScreenshots.has(m)?T.push(`${v.name} - ${i("ts_output_disclaimer")}`):T.push(A>1?`${v.name} (x${A})`:v.name)}),p=T.join(", ")||"N/A"}else if(l==="SCREENSHOTS_LIST"){c=i("screenshots_list");let T="",x=e.screenshotsElement;x&&Array.from(x.querySelectorAll('input[id^="name-"]')).forEach(m=>{let v=m.value,A=m.closest(".cw-screen-card");if(A){let H=A.querySelectorAll('input[id^="screen-"]'),N=!1,P="";H.forEach(X=>{let O=X.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",F=X.value.trim();F&&(P+=`<li>${O} - ${F}</li>`,N=!0)}),N&&(T+=`<div style="margin-bottom: 8px;"><b>${v}</b><ul ${r}>${P}</ul></div>`)}}),p=T||"N/A"}else if(l==="CASO_PORTUGAL")c=i("caso_portugal"),p=i("sim");else if(l==="CONSENTIU_GRAVACAO")c=i("consentiu_gravacao"),p=t.consent?i("sim"):i("nao");else{let T=`field-${l}`,x=t.formData[T],f="";if(a.fieldPrefixes&&a.fieldPrefixes[l]&&(f=a.fieldPrefixes[l]+" "),x&&x.trim()!==""&&x.trim()!=="\u2022"){let m=x.trim();if(Me.includes(l)){let v=m.split(`
`).map(A=>A.trim()).filter(A=>A!==""&&A!=="\u2022").map(A=>A.startsWith("\u2022 ")?A.substring(2):A).map(A=>`<li>${A}</li>`).join("");p=v?`${f}<ul ${r}>${v}</ul>`:"N/A"}else Je.includes(l)?p=f+m.split(`
`).filter(v=>v.trim()!=="").map(v=>`<p style="margin: 0 0 8px 0;">${v}</p>`).join(""):p=f+m}else f&&(p=f.trim())}g+=`<b>${c}</b><br>${p}<br><br>`}),a.customFooter&&(g+=`${a.customFooter}<br><br>`),o?.getOutput){let l=o.getOutput();l&&(g+=`${l}<br><br>`)}return g+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",g.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}function $t(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o="Passe o mouse sobre um cen\xE1rio para visualizar o texto...",n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let a=document.createElement("div");Object.assign(a.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let s=document.createElement("span");s.style.transition="opacity 0.2s ease, transform 0.2s ease",s.textContent=o,a.appendChild(s);let i=new Set,r=null;return e.render=(g,l)=>{i.clear();let c=Object.entries(Ke).filter(([p,T])=>{let x=!T.type||T.type==="all"||T.type===l,f=!1;return g.startsWith("NI_")?f=p.includes("-ni-")||p.includes("attempted"):g.startsWith("SO_")?f=p.includes("gtm")||p.includes("whatsapp")||p.includes("form")||p.includes("ecw4")||p.includes("ga4")||p.includes("-so-"):g.startsWith("AS_")?f=p.includes("-as-"):g.startsWith("IN_")?f=p.includes("-in-"):g.startsWith("DC_")&&(f=p.includes("-dc-")),x&&f});n.innerHTML="",c.forEach(([p,T])=>{let x=document.createElement("div"),f=p.replace("quickfill-","").replace(/-/g," ");x.textContent=f,x.dataset.id=p,Object.assign(x.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let m=T["field-REASON_COMMENTS"]||T["field-CONTEXTO_CALL"]||p;x.onmouseenter=()=>{r&&clearTimeout(r),i.has(p)||(x.style.background="#f1f3f4"),s.style.opacity="0",s.style.transform="translateY(5px)",r=setTimeout(()=>{s.textContent=m.substring(0,120)+(m.length>120?"...":""),s.style.opacity="1",s.style.transform="translateY(0)"},50)},x.onmouseleave=()=>{r&&clearTimeout(r),i.has(p)||(x.style.background="#ffffff"),r=setTimeout(()=>{i.size===0&&(s.style.opacity="0",setTimeout(()=>{s.textContent=o,s.style.opacity="1"},50))},100)},x.onclick=()=>{j.playClick();let v=!i.has(p);v?(i.add(p),x.style.background="#e8f0fe",x.style.borderColor="#1a73e8",x.style.color="#1967d2"):(i.delete(p),x.style.background="#ffffff",x.style.borderColor="#dadce0",x.style.color="#3c4043"),t(p,v)},n.appendChild(x)}),c.length===0?e.style.display="none":e.style.display="block"},e.appendChild(n),e.appendChild(a),e}var ee={bg:q.bgInput,white:q.surface,border:q.border,textMain:q.text,textSub:q.textSub,blue:q.blue,blueLight:q.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:q.blue,bg:q.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:q.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:q.primary,bg:q.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:q.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},_e={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Gt(t,e,o){let n={},a="implementation";o&&o.subscribe(()=>{X(),V()});function s(O){let F=O.toLowerCase();return F.includes("ads")||F.includes("conversion")||F.includes("remarketing")?ee.brands.ads:F.includes("ga4")||F.includes("analytics")?ee.brands.ga4:F.includes("gtm")||F.includes("tag manager")||F.includes("container")?ee.brands.gtm:F.includes("merchant")||F.includes("shopping")||F.includes("feed")?ee.brands.gmc:ee.brands.default}let i=Object.entries(xe).filter(([O,F])=>F.popular),r={};Object.entries(xe).forEach(([O,F])=>{if(F.popular)return;let R=s(F.name);r[R.label]||(r[R.label]={brand:R,tasks:[]}),r[R.label].tasks.push({key:O,...F})});let g="cw-zen-tasks";if(!document.getElementById(g)){let O=document.createElement("style");O.id=g,O.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${ee.font}; background: ${ee.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${ee.border};
            }

            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${ee.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${ee.white};
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
                font-size: 12px; font-weight: 500; color: ${ee.textMain}; line-height: 1.2;
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
                color: ${ee.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${ee.border}; border-radius: 10px; background: ${ee.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${ee.blue}; box-shadow: 0 0 0 3px ${ee.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${ee.border}; border-radius: 10px; background: ${ee.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${ee.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${ee.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${ee.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${ee.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${ee.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }

            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px;
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${ee.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${ee.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${ee.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${ee.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${ee.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${ee.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${ee.textMain}; }

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
                font-family: ${ee.font}; font-size: 15px; font-weight: 600; color: ${ee.textMain};
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
                border-color: ${ee.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${ee.textSub}; opacity: 0;
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
                font-size: 11px; color: ${ee.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${ee.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${ee.textSub};
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
        `,document.head.appendChild(O)}let l=document.createElement("div");l.className="cw-zen-container";let c=document.createElement("div");Object.assign(c.style,{display:"none"});let p=document.createElement("div");p.className="cw-screens-container",c.appendChild(p),l.innerHTML=`
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
    `;let T=l.querySelector(".cw-hero-grid"),x=l.querySelector(".cw-acc-container"),f=l.querySelector(".cw-results-container"),m=l.querySelector(".cw-search-input"),v=l.querySelector(".cw-status-bar"),A=l.querySelector(".cw-status-text"),H=l.querySelector(".cw-footer-icons");i.forEach(([O,F])=>{let R=s(F.name),G=document.createElement("div");G.className="cw-hero-card",G.id=`hero-${O}`,G.style.setProperty("--hero-color",R.color),G.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${_e[R.icon]}</div>
                <div class="cw-hero-label">${F.name}</div>
            </div>

            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,G.onclick=L=>{if(L.target.closest(".cw-step-btn"))return;let k=n[O]?n[O].count:0;P(O,k>0?-k:1,F)},G.querySelector(".minus").onclick=()=>P(O,-1,F),G.querySelector(".plus").onclick=()=>P(O,1,F),G.dataset.color=R.color,T.appendChild(G)});function N(O,F){let R=s(F.name),G=document.createElement("div");return G.className="cw-task-item",G.dataset.id=O,G.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${R.bg}; color:${R.color}">
                    ${_e[R.icon]||_e.default}
                </div>
                <div class="cw-task-label">${F.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,G.onclick=L=>{if(L.target.closest(".cw-step-btn"))return;let k=n[O]?n[O].count:0;P(O,k>0?-k:1,F)},G.querySelector(".minus").onclick=()=>P(O,-1,F),G.querySelector(".plus").onclick=()=>P(O,1,F),G}Object.entries(r).forEach(([O,F])=>{let R=document.createElement("div");R.className="cw-acc-group";let G=document.createElement("div");G.className="cw-acc-header",G.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${F.brand.color}"></div>
                ${O}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,G.onclick=()=>{x.querySelectorAll(".cw-acc-group.open").forEach(k=>{k!==R&&k.classList.remove("open")}),R.classList.toggle("open")};let L=document.createElement("div");L.className="cw-acc-body",F.tasks.forEach(k=>{let S=N(k.key,k);L.appendChild(S)}),R.appendChild(G),R.appendChild(L),x.appendChild(R)});function P(O,F,R){n[O]||(n[O]={count:0,data:R,brand:s(R.name)}),n[O].count+=F,n[O].count<=0&&delete n[O],X(),V(),t&&t()}function X(){let O=o.tagSupportUsed;i.forEach(([k])=>{let S=T.querySelector(`#hero-${k}`);if(!S)return;let I=n[k];I?(S.classList.add("active"),S.querySelector(".cw-step-val").textContent=I.count,S.querySelector(".cw-step-val").style.color=S.dataset.color,O&&(k==="ads_conversion_tracking"||k==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(k)?S.classList.add("ts-success"):S.classList.remove("ts-success")):(S.classList.remove("active"),S.classList.remove("ts-success"))}),l.querySelectorAll(".cw-task-item").forEach(k=>{let S=k.dataset.id,I=n[S];I?(k.classList.add("selected"),k.querySelector(".cw-step-val").textContent=I.count,O&&(S==="ads_conversion_tracking"||S==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(S)?k.classList.add("ts-success"):k.classList.remove("ts-success")):(k.classList.remove("selected"),k.classList.remove("ts-success"))});let R=Object.keys(n),G=0,L=[];if(R.forEach(k=>{let S=n[k];G+=S.count;for(let I=0;I<S.count;I++)L.length<6&&L.push(S.brand)}),G>0){v.classList.add("visible");let k=G>1?"A\xE7\xF5es":"A\xE7\xE3o",S=G>1?"definidas":"definida";A.textContent=`${G} ${k} ${S}`,H.innerHTML="",L.forEach(I=>{let d=document.createElement("div");d.className="cw-mini-icon",d.innerHTML=_e[I.icon]||_e.default;let y=d.querySelector("svg");y&&(y.style.width="14px",y.style.height="14px"),H.appendChild(d)})}else v.classList.remove("visible")}m.addEventListener("input",O=>{let F=O.target.value.toLowerCase();if(F.length>0){x.style.display="none",f.style.display="block",f.innerHTML="";let R=!1;Object.entries(xe).forEach(([G,L])=>{if(L.name.toLowerCase().includes(F)){R=!0;let k=N(G,L);n[G]&&(k.classList.add("selected"),k.querySelector(".cw-step-val").textContent=n[G].count),f.appendChild(k)}}),R||(f.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else x.style.display="block",f.style.display="none"});function V(){p.innerHTML="";let O=Object.keys(n),F=!1;if(O.length===0){p.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,c.style.display="none";return}let R=o.tagSupportUsed,G=document.createElement("div");G.className="cw-info-banner",G.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,p.appendChild(G),O.forEach(L=>{let k=n[L].data,S=n[L].count,I=n[L].brand,y=R&&(L==="ads_conversion_tracking"||L==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(L),w=o.screenshotMode||"implementation",C=k.screenshots?.[w]||[];if(C.length>0||y){F=!0;for(let b=1;b<=S;b++){let E=document.createElement("div");E.className="cw-screen-card",y&&E.classList.add("ts-success"),E.style.setProperty("--brand-color",I.color),E.style.setProperty("--brand-bg",I.bg),E.style.setProperty("--brand-shadow",I.color+"40");let M=document.createElement("div");M.className="cw-card-header";let h=document.createElement("div");h.className="cw-card-icon",h.innerHTML=_e[I.icon]||_e.default;let _=document.createElement("div");_.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let Y=document.createElement("input");Y.className="cw-card-title-input",Y.id=`name-${L}-${b}`,Y.value=`${k.name}${S>1?" #"+b:""}`,Y.title="Clique para renomear esta task";let oe=document.createElement("span");if(oe.className="cw-edit-hint",oe.innerHTML="\u270E Renomear",_.appendChild(Y),_.appendChild(oe),M.appendChild(h),M.appendChild(_),E.appendChild(M),y){let u=document.createElement("div");u.className="cw-ts-disclaimer-box",u.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,u.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(L,!0)},E.appendChild(u)}else C.forEach((u,z)=>{let D=document.createElement("div");D.className="cw-input-group";let W=document.createElement("label");W.className="cw-input-label",W.textContent=u;let $=document.createElement("input");$.className="cw-input-field",$.id=`screen-${L}-${b}-${z}`,$.placeholder="Cole o link aqui...",$.setAttribute("autocomplete","off"),$.addEventListener("input",()=>{$.value.trim().length>5?$.classList.add("filled"):$.classList.remove("filled")});let Z=document.createElement("div");Z.className="cw-input-check",Z.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',D.appendChild(W),D.appendChild($),D.appendChild(Z),E.appendChild(D)});p.appendChild(E)}}}),c.style.display=F?"block":"none"}return{selectionElement:l,screenshotsElement:c,updateSubStatus:()=>V(),getCheckedElements:()=>Object.keys(n).map(O=>({value:O,count:n[O].count})),setTaskCount:(O,F)=>{n[O]&&delete n[O],F>0&&xe[O]&&P(O,F,xe[O])},toggleTask:(O,F=!0)=>{let R=n[O];F&&!R?P(O,1,xe[O]):!F&&R&&P(O,-R.count,xe[O])},setLanguage:O=>{e=O;let F=l.querySelector(".js-hero-title");F&&(F.textContent=e("acesso_rapido"));let R=l.querySelector(".cw-search-input");R&&(R.placeholder=e("buscar_catalogo")),V()},reset:()=>{for(let O in n)delete n[O];m.value="",x.style.display="block",f.style.display="none",X(),V()}}}var _o={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},Io={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},Lo={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},qo={display:"flex",gap:"20px",marginBottom:"12px"};function Vt(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,_o);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,dt,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,qo);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="Sim",Object.assign(a.style,ut);let s=document.createElement("label");s.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(a),i.appendChild(s);let r=document.createElement("input");r.type="radio",r.name="ts_usage_mod",r.value="N\xE3o",r.checked=!0,Object.assign(r.style,ut);let g=document.createElement("label");g.textContent="N\xE3o";let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center"}),l.appendChild(r),l.appendChild(g),n.appendChild(i),n.appendChild(l);let c=document.createElement("div");c.style.display="block";let p=document.createElement("label");p.className="js-ts-reason-label",p.textContent=t("motivo_ts"),Object.assign(p.style,dt,{fontSize:"12px"});let T=document.createElement("input");T.type="text",Object.assign(T.style,Lo);let x=document.createElement("div");x.className="js-ts-warning",x.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(x.style,Io),c.appendChild(p),c.appendChild(T),c.appendChild(x),e.appendChild(o),e.appendChild(n),e.appendChild(c),a.onchange=()=>{c.style.display="none",Promise.resolve().then(()=>(ze(),Xe)).then(H=>H.notesState.setTagSupportUsed(!0))},r.onchange=()=>{c.style.display="block",Promise.resolve().then(()=>(ze(),Xe)).then(H=>H.notesState.setTagSupportUsed(!1))};function f(H,N){if(e.style.display="none",!H||!N||N.length===0)return;N.some(X=>X==="ads_conversion_tracking"||X==="ads_enhanced_conversions")?e.style.display="block":(A(),Promise.resolve().then(()=>(ze(),Xe)).then(X=>X.notesState.setTagSupportUsed(!1)))}function m(){if(e.style.display==="none")return"";let H=`<br><b>Utilizou Tag Support?</b> ${a.checked?"\u2705 Sim":"\u274C N\xE3o"}`;return r.checked&&T.value.trim()!==""&&(H+=`<br><b>Motivo:</b> ${T.value}`),H+="<br>",H}function v(H){t=H,o.textContent=t("utilizou_tag_support"),p.textContent=t("motivo_ts"),x.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function A(){e.style.display="none",r.checked=!0,a.checked=!1,c.style.display="block",T.value=""}return{element:e,updateVisibility:f,getOutput:m,setLanguage:v,reset:A}}var ft="cw_notes_parking_lot",Ze="cw_notes_emergency_save";var me={getAll:()=>{try{return JSON.parse(localStorage.getItem(ft)||"[]")}catch{return[]}},save:t=>{let e=me.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(ft,JSON.stringify(e)),o},delete:t=>{let e=me.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(ft,JSON.stringify(e)),e},getCount:()=>me.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(Ze,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(Ze);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(Ze),null):e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(Ze)}};var Mo="https://script.google.com/a/macros/google.com/s/AKfycbzjrhTCoLg0SZq3TB5oD2uyWw3t6-wbjHHPXOKurgwxZcKDFcHV2eVZZa7bLPRLFRa8hg/exec",bt="cw_data_broadcast",Ut="cw_data_tips",Do=["Processando...","Mantenha o foco!","Aguarde..."];function Pe(t,e={}){return new Promise((o,n)=>{let a="cw_cb_"+Math.round(1e5*Math.random()),s=document.createElement("script");window[a]=g=>{document.body.contains(s)&&document.body.removeChild(s),delete window[a],o(g)};let i=Object.keys(e).map(g=>encodeURIComponent(g)+"="+encodeURIComponent(e[g])).join("&"),r=`${Mo}?op=${t}&callback=${a}&t=${Date.now()}&${i}`;s.src=r,s.onerror=()=>{document.body.contains(s)&&document.body.removeChild(s),delete window[a],n(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(s)})}var se={fetchTips:async()=>{try{let t=await Pe("tips");t?.tips&&localStorage.setItem(Ut,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await Pe("broadcast");if(t?.broadcast)return localStorage.setItem(bt,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(bt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(bt)||"[]"),getRandomTip:()=>{let t=Do,e=localStorage.getItem(Ut);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await se._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await se._performOp("update_broadcast",o)},deleteBroadcast:async t=>await se._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`\u{1F4E4} Executando ${t}...`,e);let o=await Pe(t,e);return o&&o.status==="success"?(console.log("\u2705 Sucesso:",t),!0):(console.warn("\u26A0\uFE0F Falha:",o),!1)}catch(o){return console.error("\u274C Erro JSONP:",o),!1}},logEvent:(t,e,o="",n=null)=>{try{let a="anon";try{let i=he();i&&(a=i.split("@")[0].toLowerCase())}catch{}let s={timestamp:new Date().toISOString(),user:a,version:"v5.1",category:t,action:e,label:o,value:n||""};Pe("log",s).catch(i=>{})}catch(a){console.warn("Analytics error",a)}},logUsage:()=>{},getUserSnippets:async t=>{try{return await Pe("get_user_snippets",{user:t})}catch(e){return console.warn("Erro ao buscar snippets:",e),null}},saveSnippet:async(t,e)=>{let o={...t,user:e};return await se._performOp("save_snippet",o)},deleteSnippet:async(t,e)=>await se._performOp("delete_snippet",{id:t,user:e})};var Qe=["lucaste","ricardogi"];var ne={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},et=t=>new Promise(e=>setTimeout(e,t));function tt(t){let e=document.getElementById("cw-btn-notes");if(!e)return;let o=e.querySelector(".cw-dot-dirty");t?o||(o=document.createElement("div"),o.className="cw-dot-dirty",e.appendChild(o)):o&&o.remove()}function Wt(t){let e="cw-command-center-style";if(!document.getElementById(e)){let m=document.createElement("style");m.id=e,m.innerHTML=`
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

                background: ${ne.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${ne.glassBorder}; border-radius: 50px;
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
                cursor: pointer; position: relative; color: ${ne.iconIdle};
                flex-shrink: 0;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn:hover {
                background: ${ne.glassHighlight};
                color: ${ne.iconActive};
                transform: scale(1.18) translateY(-2px) !important;
            }

            .cw-btn.notes.active { color: ${ne.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${ne.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${ne.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${ne.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${ne.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${ne.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${ne.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${ne.gray} !important; background: rgba(154, 160, 166, 0.15); }

            .cw-btn.notes:hover { color: ${ne.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${ne.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${ne.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${ne.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${ne.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${ne.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${ne.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${ne.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${ne.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${ne.blue}; width: 16px; opacity: 1; }

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
            .cw-center-dots span:nth-child(1) { background-color: ${ne.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${ne.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${ne.green}; }

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

            .cw-center-success { display: none; color: ${ne.green}; margin-bottom: 10px; }
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
        `,document.head.appendChild(m)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>'},n=document.createElement("div");n.className="cw-pill side-right collapsed",n.innerHTML=`
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
    `;let a=document.createElement("div");a.className="cw-focus-backdrop",document.body.appendChild(a),document.body.appendChild(n);let s=(m,v)=>{j.playClick(),n.querySelector(`.${m}`).classList.toggle("active"),v()};if(n.querySelector(".notes").onclick=m=>{m.stopPropagation(),s("notes",t.toggleNotes)},n.querySelector(".email").onclick=m=>{m.stopPropagation(),s("email",t.toggleEmail)},n.querySelector(".script").onclick=m=>{m.stopPropagation(),s("script",t.toggleScript)},n.querySelector(".links").onclick=m=>{m.stopPropagation(),s("links",t.toggleLinks)},n.querySelector(".library").onclick=m=>{m.stopPropagation(),s("library",t.toggleLibrary)},n.querySelector(".timezone").onclick=m=>{m.stopPropagation(),s("timezone",t.toggleTimezone)},n.querySelector(".configs").onclick=m=>{m.stopPropagation(),s("configs",t.toggleConfigs)},n.querySelector(".broadcast").onclick=m=>{m.stopPropagation(),s("broadcast",()=>{let v=m.currentTarget.querySelector(".cw-badge");v&&v.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},n.querySelectorAll(".cw-btn").forEach(m=>{m.addEventListener("mouseenter",()=>j.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let m=document.createElement("div");m.className="cw-badge",n.querySelector(".broadcast").appendChild(m)}let i=null;n.onmouseleave=()=>{n.querySelector(".cw-btn.active")||n.classList.contains("processing-center")||(i=setTimeout(()=>{n.classList.add("collapsed")},3e3))},n.onmouseenter=()=>{i&&clearTimeout(i)},(async function(){let v=()=>{let H=he();if(H){let N=H.split("@")[0].toLowerCase();if(Qe.includes(N)){let P=n.querySelector("#cw-admin-tag");P&&P.classList.add("visible")}}else setTimeout(v,2e3)};v(),await et(2800),n.classList.add("docked"),await et(300);let A=n.querySelectorAll(".cw-btn");n.querySelectorAll(".cw-sep").forEach(H=>H.classList.add("visible"));for(let H=0;H<A.length;H++)A[H].classList.add("popped"),await et(90);await et(200),n.classList.add("system-check")})();let r=!1,g,l,c,p,T=3;n.onmousedown=m=>{if(m.target.closest("button"))return;m.preventDefault(),g=m.clientX,l=m.clientY;let v=n.getBoundingClientRect();c=v.left,p=v.top,document.addEventListener("mousemove",x),document.addEventListener("mouseup",f)};function x(m){let v=m.clientX-g,A=m.clientY-l;!r&&Math.sqrt(v*v+A*A)>T&&(r=!0,n.classList.add("dragging"),n.style.transition="none",i&&clearTimeout(i)),r&&(n.style.left=`${c+v}px`,n.style.top=`${p+A}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function f(m){if(document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",f),r){r=!1,n.classList.remove("dragging");let v=window.innerWidth,A=window.innerHeight,H=n.getBoundingClientRect(),N=H.left+H.width/2,P;N<v/2?(P=24,n.classList.remove("side-right"),n.classList.add("side-left")):(P=v-H.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let X=Math.max(24,Math.min(H.top,A-H.height-24));setTimeout(()=>{n.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),n.style.left=`${P}px`,n.style.top=`${X}px`,n.style.bottom="auto",n.style.transform=""},10),setTimeout(()=>{n.style.transition="",n.style.removeProperty("transition")},700)}else{let v=n.querySelector(".cw-btn.active"),A=m.target.closest("button");if(n.classList.contains("collapsed")){let H=n.getBoundingClientRect(),N=window.innerHeight,P=H.top>N/2;if(n.style.setProperty("transition","none","important"),P){let X=N-H.bottom;n.style.top="auto",n.style.bottom=`${X}px`}else n.style.bottom="auto",n.style.top=`${H.top}px`;n.offsetWidth,n.style.removeProperty("transition"),n.classList.remove("collapsed"),j.playGenieOpen()}else!v&&!A&&(n.classList.add("collapsed"),j.playGenieOpen());A&&(A.style.transform="scale(0.9)",setTimeout(()=>A.style.transform="",150))}}}function He(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${se.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=s=>{s.stopPropagation(),window._CW_ABORT_PROCESS=!0,J("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(n),t.appendChild(o);let a=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let i=Date.now()-a,r=Math.max(0,2e3-i);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let g=o.querySelector(".cw-center-dots"),l=o.querySelector(".cw-center-text"),c=o.querySelector(".cw-center-success"),p=o.querySelector(".cw-abort-btn");g&&(g.style.display="none"),l&&(l.style.display="none"),p&&(p.style.display="none"),c&&c.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},r)}}function Yt(t){let{onSaveCurrent:e,onLoadDraft:o,t:n}=t,a=document.createElement("button");a.className="js-btn-park",a.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${n("guardar")}</span>
    `,a.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${re.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${q.surface};
        color: ${q.textSub};
        border: 1px solid ${q.border};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ${ae};
        box-shadow: ${Oe.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,a.onmouseenter=()=>{a.style.backgroundColor="#F8F9FA",a.style.borderColor="#202124",a.style.color="#202124",a.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",a.style.transform="translateY(-1px)"},a.onmouseleave=()=>{a.style.backgroundColor="#FFFFFF",a.style.borderColor="#DADCE0",a.style.color="#5F6368",a.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",a.style.transform="translateY(0)"},a.onmousedown=()=>a.style.transform="scale(0.96)",a.onmouseup=()=>a.style.transform="scale(1) translateY(-1px)",a.onclick=async()=>{if(await ue("Deseja guardar o rascunho atual e limpar os campos?"))try{let m=await e();m?(me.save(m),x(),r(),j.playSuccess(),J("Rascunho salvo com sucesso!")):J("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(m){console.error("Erro ao salvar rascunho:",m),J("Erro ao salvar.",{error:!0})}};let s=document.createElement("div");s.title="Meus Rascunhos",s.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",s.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let i=document.createElement("div");i.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",s.appendChild(i),s.onmouseenter=()=>s.style.background="rgba(0,0,0,0.05)",s.onmouseleave=()=>s.style.background="transparent",s.onclick=f=>{f.stopPropagation(),T()};function r(){let f=me.getCount();tt(f>0),f>0?(i.style.display="block",i.textContent=f,i.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):i.style.display="none"}let g=document.createElement("div");g.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${q.surface}; z-index: 100;
        border-radius: ${re.large} ${re.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${ae};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let l=document.createElement("div");l.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",l.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${n("rascunhos_salvos")}</span>`;let c=document.createElement("button");c.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',c.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",c.onmouseenter=()=>c.style.background="#F1F3F4",c.onmouseleave=()=>c.style.background="transparent",c.onclick=()=>T(!1),l.appendChild(c);let p=document.createElement("div");p.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",g.appendChild(l),g.appendChild(p);function T(f){let m=g.style.transform==="translateY(0%)";(f!==void 0?f:!m)?(x(),g.style.transform="translateY(0%)"):g.style.transform="translateY(110%)"}function x(){let f=me.getAll();if(p.innerHTML="",f.length===0){p.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${q.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${n("nenhum_rascunho")}</div>
                </div>`;return}f.forEach(m=>{let v=document.createElement("div");v.style.cssText=`
                background: ${q.surface}; padding: 20px; border-radius: ${re.large};
                border: 1.5px solid ${q.bgInput}; box-shadow: ${Oe.subtle};
                position: relative; transition: all 0.3s ${ae};
            `;let H=new Date(m.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),N="";m.summaryTags&&m.summaryTags.length>0&&(N=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${m.summaryTags.slice(0,3).join(", ")+(m.summaryTags.length>3?"...":"")}</div>`),v.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${m.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${H}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${m.cid||"---"}</span>
                    <span style="display:block; color:${m.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${m.subStatus||m.status||"Sem Status"}</span>
                    ${N}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let P=v.querySelector(".cw-resume-btn");P.onclick=async()=>{await ue("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(m),me.delete(m.id),x(),r(),T(!1),j.playSwoosh(),J("Rascunho carregado."))};let X=v.querySelector(".cw-del-btn");X.onclick=async()=>{await ue("Excluir este rascunho?",{danger:!0})&&(me.delete(m.id),x(),r())},p.appendChild(v)})}return r(),{parkButton:a,historyBtnWrapper:s,drawer:g}}var Xt=t=>new Promise(e=>setTimeout(e,t));function ot(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function je(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let n=window.getSelection();n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")}catch{J("Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(e)}function nt(t){["input","change","keydown","keyup"].forEach(o=>{let n=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(n)})}function Jt(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function at(){console.log("Iniciando processo de Nova Nota...");let t=Jt(),e=t.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(i=>i.innerText.trim()==="description");if(n){let i=n.closest("material-fab")||n.closest("material-button");i?(i.style&&(i.style.display="block",i.style.visibility="visible"),ot(i)):ot(n)}else{let i=document.querySelector("material-fab-speed-dial");if(i){let r=i.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),ot(r)):i.click(),await Xt(800);let l=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="description");l&&ot(l)}}let a=null,s=0;for(;!a&&s<20;){await Xt(300);let i=Jt();if(i.length>e)a=i.find(r=>!t.includes(r)),a||(a=i[i.length-1]);else if(s>10){let r=i.filter(g=>g.offsetParent!==null);r.length>0&&(a=r[r.length-1])}s++}return a}function Kt(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let n=document.createElement("div");n.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(n),e.appendChild(o),o.addEventListener("scroll",()=>{n.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let a={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},s={};function i({id:N,label:P,type:X="text",placeholder:V="",required:O=!1,parent:F=o}){let R=document.createElement("div");R.style.cssText=a.inputWrapper;let G=document.createElement("label");G.style.cssText=a.label,G.innerHTML=`${P} ${O?'<span style="color:#D93025">*</span>':""}`;let L;return X==="textarea"?(L=document.createElement("textarea"),L.style.cssText=a.input+a.textarea):(L=document.createElement("input"),L.type=X,L.style.cssText=a.input),L.id=N,L.placeholder=V,L.addEventListener("focus",()=>{L.style.borderColor="#1a73e8",L.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),L.addEventListener("blur",()=>{L.style.borderColor="#DADCE0",L.style.boxShadow="none",O&&L.value.trim()!==""&&(L.style.backgroundColor="#FFF")}),s[N]={input:L,wrapper:R,required:O},R.appendChild(G),R.appendChild(L),F.appendChild(R),R}function r({id:N,label:P,options:X=["Yes","No"],defaultValue:V="No",onChange:O=null}){let F=document.createElement("div");F.style.cssText=a.inputWrapper;let R=document.createElement("label");R.style.cssText=a.label,R.textContent=P,F.appendChild(R);let G=document.createElement("div");G.style.cssText=a.radioGroup;let L=document.createElement("input");return L.type="hidden",L.id=N,L.value=V,F.appendChild(L),X.forEach(k=>{let S=document.createElement("div");S.textContent=k,S.style.cssText=a.radioLabel,k===V&&(S.style.cssText+=a.radioActive),S.onclick=()=>{Array.from(G.children).forEach(d=>d.style.cssText=a.radioLabel),S.style.cssText+=a.radioActive,L.value=k,O&&O(k)},G.appendChild(S)}),s[N]={input:L,wrapper:F,required:!1},F.appendChild(G),o.appendChild(F),F}let g=document.createElement("div");g.style.cssText=a.banner,g.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(g);let l=document.createElement("div");l.style.marginBottom="24px";let c=document.createElement("button");c.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",c.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",c.onmouseover=()=>c.style.background="#E1EFFF",c.onmouseout=()=>c.style.background="#F0F7FF",l.appendChild(c),o.appendChild(l);let p=document.createElement("div");p.style.cssText=a.section,p.innerHTML=`<div style="${a.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(p),i({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:p}),i({id:"ga4",label:"GA4 Property ID",parent:p}),i({id:"gtm",label:"GTM Container ID",parent:p});let T=document.createElement("div");T.style.cssText=a.hiddenField,p.appendChild(T),r({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:N=>{N==="Yes"?T.style.cssText=a.visibleField+"margin-bottom:14px;":(T.style.cssText=a.hiddenField,s.accessEmail.input.value="")}}),i({id:"accessEmail",label:"User Access Email",parent:T}),r({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let x=document.createElement("div");x.style.cssText=a.section,x.innerHTML=`<div style="${a.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(x),i({id:"name",label:"Advertiser Name",required:!0,parent:x}),i({id:"url",label:"Website URL",parent:x}),i({id:"phone",label:"Phone Number",parent:x}),i({id:"email",label:"Contact Email",parent:x}),i({id:"callback",label:"Preferred Callback Time (Timezone)",parent:x}),i({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:x}),i({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:x}),i({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:x});let f=document.createElement("div");f.style.cssText=a.section,f.innerHTML=`<div style="${a.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(f),i({id:"cc_adv",label:"Advertiser Contact",parent:f}),i({id:"cc_am",label:"Account Manager",parent:f});let m=document.createElement("div");m.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let v=document.createElement("button");v.innerHTML="Voltar",v.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",v.onclick=t;let A=document.createElement("button");A.textContent="Gerar Nota",A.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",m.appendChild(v),m.appendChild(A),e.appendChild(m),c.onclick=async()=>{let N=c.innerHTML;c.innerHTML="\u23F3 Buscando dados...";try{let P=await Te(),X=0,V=(R,G)=>{let L=s[R];G&&L&&L.input.value===""&&(L.input.value=G,L.input.style.backgroundColor="#E6F4EA",L.input.style.borderColor="#34A853",setTimeout(()=>{L.input.style.backgroundColor="#FFF",L.input.style.borderColor="#DADCE0"},1e3),X++)};V("name",P.advertiserName),V("url",P.websiteUrl),P.clientEmail&&(V("email",P.clientEmail),V("cc_adv",P.clientEmail));let F=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);F&&V("cid",F[0]),X>0?J(`${X} campos preenchidos!`):J("Nenhum dado novo encontrado.")}catch(P){console.error(P),J("Erro ao ler p\xE1gina.")}finally{c.innerHTML=N}};let H=()=>{let N=!0,P=null;return Object.values(s).forEach(X=>{X.required&&!X.input.value.trim()&&(N=!1,X.input.style.cssText+=a.inputError,X.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),P||(P=X.input))}),P&&P.scrollIntoView({behavior:"smooth",block:"center"}),N};return A.onclick=async()=>{if(!H()){J("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let N=R=>s[R].input.value||"N/A",P=N("hasAccess"),X=P==="Yes"?N("accessEmail"):"N/A",O=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${N("cid")}
<b>GA4 ID:</b> ${N("ga4")}
<b>GTM ID:</b> ${N("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${P==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${X}
<b>Ghosting Access Available (Y/N):</b> ${N("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${N("name")}
<b>Website:</b> ${N("url")}
<b>Phone Number:</b> ${N("phone")}
<b>Preferred Callback:</b> ${N("callback")}
<b>Email Address:</b> ${N("email")}

<b>Detailed Issue Description:</b>
${N("desc")}

<b>Uncropped screenshots:</b>
${N("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${N("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${N("cc_adv")}
<b>Account Manager:</b> ${N("cc_am")}
`.replace(/\n/g,"<br>");je(O);let F=await at();F?(F.innerText.trim()===""&&(F.innerHTML=""),document.execCommand("insertHTML",!1,O),nt(F),J("Nota gerada e inserida!")):J("Copiado! Abra uma nota para colar.")},e}async function Zt(t){console.log("Executando runQuickEmail com o template:",t)}async function it(t){console.log("Executando runEmailAutomation com o c\xF3digo:",t)}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function pe(t,e,o){let n=document.getElementById(o);if(!e)return;let a=e.getAttribute("data-moved")==="true",s={x:0,y:0};if(n){let c=n.getBoundingClientRect();s.x=c.left+c.width/2,s.y=c.top+c.height/2}let i,r;if(!a)i=window.innerWidth/2,r=window.innerHeight/2;else{let c=e.getBoundingClientRect();i=c.left+c.width/2,r=c.top+c.height/2,i===0&&r===0&&(i=window.innerWidth/2,r=window.innerHeight/2)}let g=s.x-i,l=s.y-r;t?(j.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",a?e.style.transform=`translate(${g}px, ${l}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${g}px), calc(-50% + ${l}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),n&&n.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",a?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof Qt=="function"&&Qt(e,o)):(j.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",a?e.style.transform=`translate(${g}px, ${l}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${g}px), calc(-50% + ${l}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),n&&n.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof xt=="function"&&xt(e))}function Qt(t,e){xt(t);let o=n=>{if(!t.classList.contains("open"))return;let a=t.contains(n.target),s=document.querySelector(".cw-pill"),i=s&&s.contains(n.target);a?(t.classList.remove("idle"),t.style.zIndex="2147483648"):i||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function xt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function eo(){let t="v4.0.0",{popup:e,content:o,header:n,animRefs:a,credit:s}=zt(t,V),i=Vt(h),r=Gt(()=>{k(),B.setActiveTasks(r.getCheckedElements())},h,B),g=document.createElement("div");g.style.display="none";let l=$t((u,z)=>{S(u,z)});g.appendChild(l);let c=Yt({onSaveCurrent:async()=>{let u=await b();return C(),u},onLoadDraft:u=>{M(u)},t:u=>h(u)}),p=F(),T=R(),x=document.createElement("div"),f=Y(),m=I(c,h);o.appendChild(p),o.appendChild(T),o.appendChild(f),o.appendChild(g),o.appendChild(x),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none";let v=document.createElement("button");v.id="manual-task-toggle",v.textContent=h("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",v.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${q.primary}; background: ${q.surface}; color: ${q.primary}; border-radius: ${re.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${ae}; text-transform: uppercase; letter-spacing: 0.5px;`,v.onmouseenter=()=>{v.style.background=q.primaryBg},v.onmouseleave=()=>{v.style.background=q.surface},v.onclick=()=>{r.selectionElement.style.display="block",r.screenshotsElement.style.display="block",v.style.display="none"},o.appendChild(v),o.appendChild(r.selectionElement),o.appendChild(i.element),o.appendChild(r.screenshotsElement),o.appendChild(m);let A=document.createElement("div");A.style.display="none",A.style.flexGrow="1",A.style.minHeight="0",A.style.overflow="hidden";let H=Kt(()=>O());H.style.height="100%",A.appendChild(H),e.insertBefore(A,s);let N=n.lastElementChild;N&&(N.insertBefore(c.historyBtnWrapper,N.firstChild),N.insertBefore(_(),N.firstChild)),e.appendChild(c.drawer);let P=null;B.subscribe(u=>{oe(u),X(),u.isDirty&&(P&&clearTimeout(P),P=setTimeout(async()=>{let z=await b(!0);me.saveEmergency(z),u.isDirty=!1},2e3))});function X(){let u=me.getCount()>0,z=!!B.currentSubStatus;tt(u||z)}function V(){B.visible=!B.visible,pe(B.visible,e,"cw-btn-notes")}function O(){B.isSplitView=!B.isSplitView,B.isSplitView?(o.style.display="none",A.style.display="flex",A.style.flexDirection="column",a.googleLine&&(a.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",A.style.display="none",a.googleLine&&(a.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function F(){let u=document.createElement("div");if(u.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-idioma" style="font-size: 10px; margin-bottom: 6px;">${h("idioma")}</div>
                    <div class="cw-segmented-control" id="lang-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-lang="pt" class="active" style="z-index:2">PT</button>
                        <button data-lang="es" style="z-index:2">ES</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${h("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${h("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${h("nao")}</button>
                        <button data-val="true" style="z-index:2">${h("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let D=document.createElement("style");D.id="cw-segmented-styles",D.innerHTML=`
                .cw-segmented-control {
                    display: flex;
                    background: ${q.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${q.border};
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
                    transition: all 0.3s ${ae};
                    color: ${q.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${q.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${q.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `,document.head.appendChild(D)}let z=(D,W)=>{let Z=u.querySelector(`#${D}`).querySelector(".cw-segmented-indicator");Z&&(Z.style.transform=`translateX(${W*100}%) translateX(${W*2}px)`)};return u.querySelectorAll("#lang-selector button").forEach((D,W)=>{D.onclick=()=>{B.setLanguage(D.dataset.lang),u.querySelectorAll("#lang-selector button").forEach($=>$.classList.remove("active")),D.classList.add("active"),z("lang-selector",W),j.playHover(),B.currentSubStatus&&L(B.currentSubStatus)}}),u.querySelectorAll("#type-selector button").forEach((D,W)=>{D.onclick=()=>{B.setCaseType(D.dataset.type),u.querySelectorAll("#type-selector button").forEach($=>$.classList.remove("active")),D.classList.add("active"),z("type-selector",W),j.playHover(),B.currentSubStatus&&L(B.currentSubStatus)}}),u.querySelectorAll("#portugal-selector button").forEach((D,W)=>{D.onclick=()=>{B.setPortugalCase(D.dataset.val==="true"),u.querySelectorAll("#portugal-selector button").forEach($=>$.classList.remove("active")),D.classList.add("active"),z("portugal-selector",W),j.playHover(),B.currentSubStatus&&L(B.currentSubStatus)}}),u}function R(){let u=document.createElement("div");u.className="cw-status-section",u.style.cssText="display: flex; flex-direction: column; gap: 8px;",u.innerHTML=`
            <div class="cw-section-title js-label-status" style="margin-top: 8px;">${h("status_principal")}</div>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${h("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <div class="cw-section-title js-label-substatus" style="margin-top: 8px;">${h("substatus")}</div>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${h("select_substatus")}</option>
            </select>
        `;let z=u.querySelector("#main-status-select"),D=u.querySelector("#sub-status-select");return z.onchange=()=>{B.setStatus(z.value),G(z.value,D),B.setSubStatus(""),L("")},D.onchange=()=>{B.setSubStatus(D.value),L(D.value)},u}function G(u,z){if(z.innerHTML=`<option value="">${h("select_substatus")}</option>`,!u){z.disabled=!0;return}for(let D in we)if(we[D].status===u){let W=document.createElement("option");W.value=D,W.textContent=we[D].name,z.appendChild(W)}z.disabled=!1}function L(u){if(l.render&&l.render(u,B.currentCaseType),!u){g.style.display="none",x.style.display="none",document.getElementById("manual-task-toggle").style.display="none",r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",f.style.display="flex",f.style.opacity="1",m.style.display="none";return}f.style.opacity="0",setTimeout(()=>{B.currentSubStatus&&(f.style.display="none")},400),m.style.display="grid";let z=we[u];z&&z.templateFields&&B.setActiveFields(z.templateFields),w(),mt(u,x,B),x.style.display="block",g.style.display="block";let D=u.startsWith("SO_"),W=u==="NI_Awaiting_Validation",$=document.getElementById("manual-task-toggle");D||W?(r.selectionElement.style.display="block",$.style.display="none"):(r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",$.style.display="block");let Z=u==="SO_Education_Only"?"education":"implementation";B.setScreenshotMode(Z),B.currentCaseType==="lm"?B.toggleFieldExclusion("field-ON_CALL",!0):B.toggleFieldExclusion("field-ON_CALL",!1),r.updateSubStatus(u),k();let U=document.getElementById("email-automation-toggle-row");U&&(U.style.display=qe[u]?"flex":"none")}function k(){let u=r.getCheckedElements().map(z=>z.value);i.updateVisibility(B.currentSubStatus,u)}function S(u,z){let D=Ke[u];if(D){for(let W in D)if(W==="linkedTask")r.toggleTask(D.linkedTask,z);else if(W==="activeTasks")D.activeTasks.forEach($=>{z?r.setTaskCount($.value,$.count):r.setTaskCount($.value,0)});else if(W.startsWith("field-")){let $=W,Z=D[W],U=document.getElementById($);if(U){let te=Me.includes($.replace("field-",""));if(z)if(te){let ie=U.value.trim();ie.includes(Z.trim())||(U.value=ie?ie+`
`+Z.trim():Z.trim())}else U.value=Z;else if(te){let ie=U.value.trim(),le=Z.trim();ie.includes(le)&&(U.value=ie.replace(le,"").trim().replace(/\n{3,}/g,`

`))}else U.value.trim()===Z.trim()&&(U.value="");B.updateField($,U.value),U.dispatchEvent(new Event("input"))}}}}function I(u,z){let D=document.createElement("div");if(D.className="cw-actions-section",D.style.cssText=`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${q.bgInput};
            border-radius: 12px;
            border: 1px solid ${q.border};
        `,!document.getElementById("cw-actions-hover-styles")){let ie=document.createElement("style");ie.id="cw-actions-hover-styles",ie.innerHTML=`
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
                    border-color: ${q.primary} !important;
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
                    color: ${q.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `,document.head.appendChild(ie)}let W=document.createElement("div");W.id="email-automation-toggle-row",W.style.cssText="grid-column: span 2; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",W.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${q.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${q.primary};">
                <span class="js-label-email-toggle">${z("preencher_email_automaticamente")}</span>
            </label>
        `;let $=u.parkButton;$.classList.add("js-btn-park"),$.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let Z=document.createElement("button");Z.className="cw-btn-secondary js-btn-reset",Z.textContent=z("limpar"),Z.style.cssText=`width: 100%; height: 34px; background: ${q.surface}; color: ${q.textSub}; border: 1px solid ${q.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,Z.onclick=()=>C();let U=document.createElement("button");U.className="cw-btn-secondary js-btn-copy",U.textContent=z("copiar"),U.style.cssText=`width: 100%; height: 34px; background: ${q.surface}; color: ${q.primary}; border: 1px solid ${q.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,U.onclick=()=>d();let te=document.createElement("button");return te.className="cw-btn-primary js-btn-generate",te.textContent=z("preencher"),te.style.cssText=`width: 100%; height: 38px; background: ${q.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: span 2; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,te.onclick=()=>y(),D.appendChild(W),D.appendChild($),D.appendChild(Z),D.appendChild(U),D.appendChild(te),D}async function d(){if(!B.currentSubStatus){J(h("select_substatus"),{error:!0});return}let u=gt(B,r,i);u?(je(u),J(h("copiado_sucesso")),j.playClick()):J(h("select_substatus"),{error:!0})}async function y(){if(!B.currentSubStatus){J(h("select_substatus"),{error:!0});return}let u=gt(B,r,i);je(u),V();let z=He(),D=await at();if(D){D.focus(),document.execCommand("insertHTML",!1,u),nt(D);let W=document.getElementById("email-automation-checkbox");(!W||W.checked)&&B.currentSubStatus&&qe[B.currentSubStatus]&&await it(qe[B.currentSubStatus]),J(h("inserido_copiado")),j.playSuccess(),C()}z()}function w(){if(B.currentSubStatus){if(B.currentCaseType==="lm")B.removeField("ON_CALL");else{let u=we[B.currentSubStatus];u&&u.templateFields.includes("ON_CALL")&&B.addFieldAt("ON_CALL",1)}B.isPortugalCase?(B.addFieldAt("CASO_PORTUGAL",1),B.addFieldAt("CONSENTIU_GRAVACAO",2)):(B.removeField("CASO_PORTUGAL"),B.removeField("CONSENTIU_GRAVACAO"))}}function C(){B.reset(),r.reset(),i.reset(),X(),o.querySelectorAll("select").forEach(z=>z.value=""),o.querySelector("#sub-status-select").disabled=!0;let u=document.getElementById("email-automation-toggle-row");u&&(u.style.display="none"),x.innerHTML="",g.style.display="none",f.style.display="flex",f.style.opacity="1",m.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none"}async function b(u=!1){let z={};x.querySelectorAll("input, textarea, select").forEach(U=>{(U.id.startsWith("field-")||U.id==="consent-select")&&(z[U.id]=U.value)});let D="Cliente",W="---";if(!u)try{let U=await Te();D=U.advertiserName,W=U.cid}catch(U){console.warn("Erro ao coletar pageData:",U)}let $=r.getCheckedElements().map(U=>({key:U.value,count:U.count})),Z=$.map(U=>{let te=xe[U.key];return te?te.name:U.key});return{currentCaseType:B.currentCaseType,currentLang:B.currentLang,isPortugalCase:B.isPortugalCase,consent:B.consent,tagSupportUsed:B.tagSupportUsed,forcedScreenshots:[...B.forcedScreenshots],excludedFields:[...B.excludedFields],activeFields:B.activeFields,status:B.currentStatus,subStatus:B.currentSubStatus,formData:z,activeTasks:$,summaryTags:Z,clientName:D,cid:W,timestamp:new Date().toISOString()}}let E=u=>new Promise(z=>setTimeout(z,u));async function M(u){B.setLanguage(u.currentLang||"pt"),B.setCaseType(u.currentCaseType||"bau"),B.setPortugalCase(u.isPortugalCase||!1),B.setConsent(u.consent||!1),B.setExcludedFields(u.excludedFields||[]),u.activeFields&&B.setActiveFields(u.activeFields);let z=o.querySelector(`#lang-selector button[data-lang="${B.currentLang}"]`);z&&z.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach($=>{$!==z&&$.classList.remove("active")});let D=o.querySelector(`#type-selector button[data-type="${B.currentCaseType}"]`);D&&D.classList.add("active"),o.querySelectorAll("#type-selector button").forEach($=>{$!==D&&$.classList.remove("active")});let W=o.querySelector(`#portugal-selector button[data-val="${B.isPortugalCase}"]`);if(W&&W.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach($=>{$!==W&&$.classList.remove("active")}),u.status){let $=o.querySelector("#main-status-select");$.value=u.status,B.setStatus(u.status);let Z=o.querySelector("#sub-status-select");if(G(u.status,Z),await E(50),u.subStatus){if(Z.value=u.subStatus,B.setSubStatus(u.subStatus),L(u.subStatus),await E(100),u.tagSupportUsed!==void 0){B.setTagSupportUsed(u.tagSupportUsed);let U=i.element.querySelector('input[value="Sim"]'),te=i.element.querySelector('input[value="N\xE3o"]');u.tagSupportUsed&&U?U.checked=!0:te&&(te.checked=!0),i.element.querySelector("div:last-child").style.display=u.tagSupportUsed?"none":"block"}u.forcedScreenshots&&B.setForcedScreenshots(u.forcedScreenshots);for(let U in u.formData){let te=document.getElementById(U);te&&(te.value=u.formData[U],B.updateField(U,te.value))}u.activeTasks&&(u.activeTasks.forEach(U=>r.setTaskCount(U.key,U.count)),B.setActiveTasks(r.getCheckedElements()))}}B.isDirty=!1}function h(u){return be[B.currentLang]?.[u]||be.pt?.[u]||u}function _(){let u=document.createElement("div");return u.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',u.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",u.onclick=z=>{z.stopPropagation(),O()},u.title="Alternar para Split & Transfer",u}function Y(){let u=document.createElement("div");return u.id="notes-empty-state",u.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${ae};
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
                <div style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${q.text}; margin-bottom: 4px;">
                    ${h("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${q.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${h("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,u}function oe(u){let z=o.querySelector(".js-label-idioma");z&&(z.textContent=h("idioma"));let D=o.querySelector(".js-label-fluxo");D&&(D.textContent=h("fluxo"));let W=o.querySelector(".js-label-portugal");W&&(W.textContent=h("caso_portugal"));let $=o.querySelector(".js-label-status");$&&($.textContent=h("status_principal"));let Z=o.querySelector(".js-label-substatus");Z&&(Z.textContent=h("substatus"));let U=o.querySelector(".js-btn-copy");U&&(U.textContent=h("copiar"));let te=o.querySelector(".js-btn-generate");te&&(te.textContent=h("preencher"));let ie=o.querySelector(".js-btn-reset");ie&&(ie.textContent=h("limpar"));let le=document.getElementById("manual-task-toggle");le&&(le.textContent=h("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let Q=o.querySelector(".js-btn-park span");Q&&(Q.textContent=h("guardar"));let K=e.querySelector(".js-drawer-title");K&&(K.textContent=h("rascunhos_salvos"));let fe=o.querySelector(".js-label-email-toggle");fe&&(fe.textContent=h("preencher_email_automaticamente")),i&&i.setLanguage&&i.setLanguage(h),r&&r.setLanguage&&r.setLanguage(h)}return f.style.display="flex",m.style.display="none",B.setLanguage("pt"),B.setCaseType("bau"),X(),setTimeout(async()=>{let u=me.getEmergency();u&&(await ue("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?(M(u),J("Sess\xE3o restaurada!")):me.clearEmergency())},3e3),document.body.appendChild(e),V}var to={_templates:null,async getTemplates(){if(this._templates)return this._templates;try{let t=await fetch(this._getJsonUrl());if(!t.ok)throw new Error("Falha ao carregar templates de e-mail");return this._templates=await t.json(),this._templates}catch(t){return console.error("EmailDataService Error:",t),[]}},_getJsonUrl(){try{return chrome.runtime.getURL("src/modules/email-assistant/email-templates.json")}catch{return"src/modules/email-assistant/email-templates.json"}}};var oo="cw_personal_library_v1",Ne=!1,ge={getSnippets:(t="all")=>{let e=ge._loadFromLocal(),o=he();return o&&o.includes("@")&&!Ne&&ge._syncWithServer(o),t==="all"?e:e.filter(n=>n.type===t)},save:async t=>{let e=he();if(!e)return J("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;Ne=!0;let o=ge._loadFromLocal(),n=new Date().toISOString(),a={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:n},s=o.filter(i=>i.id!==a.id);return s.unshift(a),ge._saveToLocal(s),se.saveSnippet(a,e).then(i=>{i?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais."),setTimeout(()=>{Ne=!1},2e3)}),a},delete:async t=>{let e=he();Ne=!0;let n=ge._loadFromLocal().filter(a=>a.id!==t);return ge._saveToLocal(n),e?se.deleteSnippet(t,e).then(()=>{setTimeout(()=>{Ne=!1},2e3)}):Ne=!1,!0},_syncWithServer:async t=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let e=await se.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,n=ge._loadFromLocal(),a=JSON.stringify(o),s=JSON.stringify(n);a!==s&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),ge._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(oo)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem(oo,JSON.stringify(t))}};function no(){let t="v5.0.0",e=!1,o=[],n=null,a="",s="Todos",i={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",primary:"#1A73E8",primaryBg:"#E8F0FE",textPrimary:"#202124",textSecondary:"#5F6368",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)"},r=document.createElement("div");r.id="email-assistant-popup",r.classList.add("cw-module-window"),Object.assign(r.style,ce,{width:"850px",height:"650px",display:"none",flexDirection:"column"});let g=de(r,"Email Assistant",t,"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",{popup:r},()=>R()),l=document.createElement("div");Object.assign(l.style,{display:"flex",flex:"1",overflow:"hidden",backgroundColor:i.bgApp});let c=document.createElement("div");Object.assign(c.style,{width:"300px",borderRight:`1px solid ${i.borderSubtle}`,display:"flex",flexDirection:"column",flexShrink:"0"});let p=document.createElement("div");Object.assign(p.style,{padding:"16px",borderBottom:`1px solid ${i.borderSubtle}`});let T=document.createElement("input");T.placeholder="Buscar templates...",Object.assign(T.style,{width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:`1px solid ${i.borderSubtle}`,fontSize:"14px",outline:"none",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%235F6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"});let x=document.createElement("div");Object.assign(x.style,{flex:"1",overflowY:"auto",padding:"8px 0"}),p.appendChild(T),c.appendChild(p),c.appendChild(x);let f=document.createElement("div");Object.assign(f.style,{flex:"1",display:"flex",flexDirection:"column",overflow:"hidden"});let m=document.createElement("div");Object.assign(m.style,{padding:"20px",borderBottom:`1px solid ${i.borderSubtle}`,backgroundColor:"#fff",maxHeight:"250px",overflowY:"auto"});let v=document.createElement("div");Object.assign(v.style,{flex:"1",display:"flex",flexDirection:"column",padding:"20px",backgroundColor:i.bgApp,overflow:"hidden"});let A=document.createElement("div");Object.assign(A.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"});let H=document.createElement("span");H.textContent="Preview do E-mail",Object.assign(H.style,{fontSize:"12px",fontWeight:"700",color:i.textSecondary,textTransform:"uppercase",letterSpacing:"0.5px"});let N=document.createElement("div");Object.assign(N.style,{display:"flex",gap:"8px"});let P=document.createElement("button");P.textContent="Copiar HTML",Object.assign(P.style,{padding:"6px 12px",borderRadius:"6px",border:`1px solid ${i.primary}`,background:"transparent",color:i.primary,fontSize:"12px",fontWeight:"600",cursor:"pointer"});let X=document.createElement("button");X.textContent="Preencher no CRM",Object.assign(X.style,{padding:"6px 12px",borderRadius:"6px",border:"none",background:i.primary,color:"#fff",fontSize:"12px",fontWeight:"600",cursor:"pointer"});let V=document.createElement("button");V.textContent="Smart CR",Object.assign(V.style,{padding:"6px 12px",borderRadius:"6px",border:"1px solid #EA8600",background:"transparent",color:"#EA8600",fontSize:"12px",fontWeight:"600",cursor:"pointer",display:"none"}),N.appendChild(V),N.appendChild(P),N.appendChild(X),A.appendChild(H),A.appendChild(N);let O=document.createElement("div");O.contentEditable="true",Object.assign(O.style,{flex:"1",backgroundColor:"#fff",border:`1px solid ${i.borderSubtle}`,borderRadius:"8px",padding:"20px",fontSize:"14px",lineHeight:"1.6",color:i.textPrimary,overflowY:"auto",outline:"none",boxShadow:"inset 0 1px 3px rgba(0,0,0,0.05)"}),v.appendChild(A),v.appendChild(O),f.appendChild(m),f.appendChild(v),l.appendChild(c),l.appendChild(f),r.appendChild(g),r.appendChild(l);let F=document.createElement("div");Object.assign(F.style,ye),r.appendChild(F),ve(r,F),document.body.appendChild(r);function R(){e=!e,e?(r.style.display="flex",Lt(r),o.length===0&&G()):r.style.display="none",pe(e,r,"cw-btn-email")}async function G(){x.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',o=await to.getTemplates(),L()}function L(){x.innerHTML="";let d=o.filter(E=>E.name.toLowerCase().includes(a.toLowerCase())||E.category.toLowerCase().includes(a.toLowerCase()));if(d.length===0){x.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Nenhum template encontrado</div>';return}let y=Object.entries(qe).filter(([E,M])=>M&&(E.toLowerCase().includes(a.toLowerCase())||M.toLowerCase().includes(a.toLowerCase()))).map(([E,M])=>({id:E,name:E.replace(/_/g," "),category:"\u26A1 Smart CRs",code:M,isSmartCR:!0})),w=ge.getSnippets("email").filter(E=>E.title.toLowerCase().includes(a.toLowerCase())||E.subject&&E.subject.toLowerCase().includes(a.toLowerCase())).map(E=>{let M=[],h=E.content.match(/\[([^\]]+)\]/g);return h&&[...new Set(h)].forEach(_=>{M.push({key:_,label:_.replace("[","").replace("]",""),type:_.toLowerCase().includes("data")?"date":"text",auto:_.toLowerCase().includes("nome")&&_.toLowerCase().includes("seu")?"agentName":null})}),{id:E.id||`snippet-${Math.random()}`,name:E.title,category:"\u{1F464} Pessoal",subject:E.subject||"Sem Assunto",template:E.content,placeholders:M}}),C=[...d,...y,...w];[...new Set(C.map(E=>E.category))].forEach(E=>{let M=document.createElement("div");M.textContent=E,Object.assign(M.style,{padding:"12px 16px 4px 16px",fontSize:"11px",fontWeight:"700",color:i.textSecondary,textTransform:"uppercase",letterSpacing:"1px"}),x.appendChild(M),C.filter(h=>h.category===E).forEach(h=>{let _=document.createElement("div");_.textContent=h.name,Object.assign(_.style,{padding:"10px 16px",fontSize:"14px",cursor:"pointer",transition:"background 0.2s"}),n&&n.id===h.id&&(_.style.backgroundColor=i.primaryBg,_.style.color=i.primary,_.style.fontWeight="600"),_.onmouseenter=()=>{(!n||n.id!==h.id)&&(_.style.backgroundColor="#f1f3f4")},_.onmouseleave=()=>{(!n||n.id!==h.id)&&(_.style.backgroundColor="transparent")},_.onclick=()=>k(h),x.appendChild(_)})})}async function k(d){n=d,d.isSmartCR?(V.style.display="block",X.style.display="none"):(V.style.display="none",X.style.display="block"),L(),S(),I()}function S(){if(m.innerHTML="",!n||n.isSmartCR){n?.isSmartCR&&(m.innerHTML='<div style="padding: 10px; font-size: 13px; color: #5f6368; background: #FEF7E0; border-radius: 8px;">Este \xE9 um Smart CR. Clique em "Smart CR" para aplicar o atalho no CRM.</div>');return}let d=document.createElement("div");Object.assign(d.style,{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}),n.placeholders.forEach(y=>{let w=document.createElement("div"),C=document.createElement("label");C.textContent=y.label,Object.assign(C.style,{display:"block",fontSize:"11px",fontWeight:"700",color:i.textSecondary,marginBottom:"4px",textTransform:"uppercase"});let b=document.createElement("input");if(b.type=y.type||"text",b.dataset.key=y.key,Object.assign(b.style,{width:"100%",padding:"8px 10px",borderRadius:"6px",border:`1px solid ${i.borderSubtle}`,fontSize:"13px",boxSizing:"border-box"}),y.auto==="agentName"){let E=rt();b.value=E.split(" ")[0]}b.addEventListener("input",I),w.appendChild(C),w.appendChild(b),d.appendChild(w)}),m.appendChild(d)}function I(){if(!n){O.innerHTML='<div style="height: 100%; display: flex; align-items: center; justify-content: center; color: #9aa0a6;">Selecione um template para ver o preview</div>';return}if(n.isSmartCR){O.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${n.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let d=n.template;m.querySelectorAll("input").forEach(w=>{let C=w.dataset.key,b=w.value;if(w.type==="date"&&b){let[M,h,_]=b.split("-");b=`${h}/${_}/${M}`}b=b||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${C}</span>`;let E=C.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");d=d.replace(new RegExp(E,"g"),b)}),O.innerHTML=d}return T.addEventListener("input",d=>{a=d.target.value,L()}),P.onclick=()=>{let d=O.innerHTML,y=new Blob([d],{type:"text/html"}),w=O.innerText,C=[new ClipboardItem({"text/html":y,"text/plain":new Blob([w],{type:"text/plain"})})];navigator.clipboard.write(C).then(()=>{J("E-mail copiado com sucesso!")}).catch(b=>{console.error("Erro ao copiar:",b),J("Erro ao copiar e-mail",{error:!0})})},X.onclick=async()=>{if(!n)return;let d=He(),y={...n,body:O.innerHTML};try{await Zt(y),R()}catch(w){console.error("Fill error:",w),J("Erro ao preencher e-mail",{error:!0})}finally{d()}},V.onclick=async()=>{if(!n||!n.isSmartCR)return;let d=He();try{await it(n.code),R()}catch(y){console.error("Smart CR error:",y),J("Erro ao aplicar Smart CR",{error:!0})}finally{d()}},R}var ao={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente:
 A) 10 d\xEDgitos de la conta
 B) Correo electr\xF3nico
 C) N\xFAmero de tel\xE9fono y
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function io(){let t="v2.6 (Context HD)",e="csa-local-styles";if(!document.getElementById(e)){let b=document.createElement("style");b.id=e,b.innerHTML=`
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
      `,document.head.appendChild(b)}let o={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#FFFFFF",scrollBehavior:"smooth"},card:{background:"#FFFFFF",border:"1px solid #E5E7EB",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"12px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"8px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.1s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.6",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"18px",height:"18px",borderRadius:"6px",border:"2px solid #DADCE0",marginRight:"12px",marginTop:"2px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},a="PT",s="BAU",i=!1,r=document.createElement("div");r.id="call-script-popup",r.classList.add("cw-module-window"),Object.assign(r.style,ce,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let g={popup:r,googleLine:null},l=null;function c(){i&&Te().then(b=>{let E=r.querySelector("#cw-ctx-name"),M=r.querySelector("#cw-ctx-cid"),h=r.querySelector("#cw-ctx-email");if(E&&(E.textContent=b.advertiserName||"Cliente Desconhecido"),M){let _=b.cid||"---";M.textContent!==_&&(M.textContent=_)}if(h){let _=b.clientEmail||"N\xE3o encontrado";h.textContent!==_&&(h.textContent=_,h.title=_)}})}function p(){Te().then(b=>{let E=new Date().toLocaleDateString("pt-BR"),M=`Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${b.advertiserName||"Cliente"}) em andamento hoje (${E}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${b.advertiserName||"---"}
CID: ${b.cid||"---"}
Case ID: ${b.caseId||"---"}
E-mail: ${b.clientEmail||"---"}`;navigator.clipboard.writeText(M),J("Mensagem copiada para o AM!")})}function T(){i=!i,pe(i,r,"cw-btn-script"),i?(c(),l||(l=setInterval(c,2e3))):l&&(clearInterval(l),l=null)}let x=de(r,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",g,()=>{T()});r.appendChild(x);let f=document.createElement("div");Object.assign(f.style,o.contextBanner),f.innerHTML=`
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
  `,f.querySelector("#cw-pill-message").addEventListener("click",()=>{p()});let v=(b,E)=>{let M=f.querySelector(b),h=f.querySelector(E);M.onclick=()=>{let _=h.textContent;!_||_.includes("---")||_.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(_),j.playSuccess(),M.classList.add("copied"),setTimeout(()=>M.classList.remove("copied"),1500))}};r.appendChild(f);let A=document.createElement("div");Object.assign(A.style,o.progressBarContainer);let H=document.createElement("div");Object.assign(H.style,o.progressBarFill),A.appendChild(H),r.appendChild(A);let N=document.createElement("div");N.id="csa-content",Object.assign(N.style,o.contentArea),r.appendChild(N);let P=document.createElement("div");Object.assign(P.style,o.footer);let X=document.createElement("span");X.textContent="by lucaste@",Object.assign(X.style,{fontSize:"10px",color:"#bdc1c6"});let V=document.createElement("button");V.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(V.style,o.resetBtn),V.onmouseenter=()=>V.style.background="#fce8e6",V.onmouseleave=()=>V.style.background="transparent",V.onclick=()=>{V.style.transform="scale(0.9)",setTimeout(()=>V.style.transform="scale(1)",150);for(let b in n)delete n[b];d()},P.appendChild(X),P.appendChild(V),r.appendChild(P);let O=document.createElement("div");Object.assign(O.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let F=document.createElement("div");Object.assign(F.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let R=document.createElement("div");R.textContent="BAU";let G=document.createElement("div");G.textContent="LT",Object.assign(R.style,Re),Object.assign(G.style,Re),F.appendChild(R),F.appendChild(G);let L=document.createElement("select");Object.assign(L.style,We,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),L.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',L.value=a,O.appendChild(F),O.appendChild(L),N.appendChild(O);let k=document.createElement("div");k.id="csa-checklist-area",N.appendChild(k);let S=document.createElement("div");Object.assign(S.style,ye),S.className="no-drag",S.title="Redimensionar",r.appendChild(S),ve(r,S),document.body.appendChild(r),v("#cw-pill-cid","#cw-ctx-cid"),v("#cw-pill-email","#cw-ctx-email");function I(b){return b}function d(){k.innerHTML="";let b=`${a} ${s}`,E=ao[b];if(!E){k.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',H.style.width="0%";return}let M=E.color||"#1a73e8",h=0,_=0;["inicio","meio","fim"].forEach(Y=>{E[Y]&&(h+=E[Y].length)}),["inicio","meio","fim"].forEach((Y,oe)=>{let u=E[Y];if(!u||u.length===0)return;let z=document.createElement("div");Object.assign(z.style,o.card);let D=document.createElement("div");Object.assign(D.style,o.cardTitle);let W="";Y==="inicio"?a.includes("ES")?W="Apertura":a.includes("EN")?W="Opening":W="Abertura":Y==="meio"?a.includes("ES")?W="Implementaci\xF3n":a.includes("EN")?W="Implementation":W="Implementa\xE7\xE3o (Tag Support)":Y==="fim"&&(a.includes("ES")?W="Cierre":a.includes("EN")?W="Closing":W="Fechamento"),D.textContent=W;let $=document.createElement("span");$.style.fontSize="11px",$.style.opacity="0.7",$.style.fontWeight="500",$.style.background="#f1f3f4",$.style.padding="2px 8px",$.style.borderRadius="10px",D.appendChild($),z.appendChild(D);let Z=0;u.forEach((U,te)=>{let ie=`${b}-${Y}-${te}`,le=!!n[ie];le&&(_++,Z++);let Q=document.createElement("div");Object.assign(Q.style,o.itemRow);let K=document.createElement("div");Object.assign(K.style,o.checkbox);let fe=document.createElement("span");fe.innerHTML=U,fe.style.flex="1",le?(Object.assign(Q.style,o.itemCompleted),K.style.background=M,K.style.borderColor=M,K.style.transform="scale(1)",K.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(Q.style.textDecoration="none",Q.style.opacity="1",K.style.background="transparent",K.style.borderColor="#dadce0",K.style.transform="scale(1)",K.innerHTML=""),Q.onclick=()=>{let Ge=!n[ie];n[ie]=Ge,j.playClick(),Ge?(K.style.transform="scale(1.2)",setTimeout(()=>K.style.transform="scale(1)",150),Object.assign(Q.style,o.itemCompleted),K.style.background=M,K.style.borderColor=M,K.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(Q.style.textDecoration="none",Q.style.opacity="1",K.style.background="transparent",K.style.borderColor="#dadce0",K.innerHTML=""),y(b,E)},Q.onmouseenter=()=>{n[ie]||(Q.style.background="#f1f3f4",K.style.borderColor=M)},Q.onmouseleave=()=>{n[ie]||(Q.style.background="transparent",K.style.borderColor="#dadce0")},Q.appendChild(K),Q.appendChild(fe),z.appendChild(Q)}),Z===u.length&&u.length>0&&($.style.color="#1e8e3e",$.style.background="#e6f4ea",z.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),$.textContent=`${Z}/${u.length}`,k.appendChild(z)}),w(h,_)}function y(b,E){let M=0,h=0;["inicio","meio","fim"].forEach(_=>{let Y=E[_]||[];M+=Y.length,Y.forEach((oe,u)=>{n[`${b}-${_}-${u}`]&&h++})}),w(M,h),setTimeout(()=>d(),200)}function w(b,E){let M=b===0?0:E/b*100;H.style.width=`${M}%`,H.style.background=M===100?"#34A853":"linear-gradient(90deg, #4285F4, #34A853)"}function C(b){s=b;let E=It();Object.assign(R.style,Re),Object.assign(G.style,Re),Object.assign(b==="BAU"?R.style:G.style,E),d()}return R.onclick=()=>C("BAU"),G.onclick=()=>C("LT"),L.addEventListener("change",b=>{a=b.target.value,d()}),C(s),T}var $e={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Ie={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},st={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},ht="cw_link_history_v4";function so(t,e){try{let o=JSON.parse(localStorage.getItem(ht)||"[]");o=o.filter(n=>n.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(ht,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function No(){try{return JSON.parse(localStorage.getItem(ht)||"[]")}catch{return[]}}function ro(){let t="v4.6",e="",o=!1,n=null,a=!1,s={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},i=document.createElement("div");i.id="links-popup",i.classList.add("cw-module-window"),Object.assign(i.style,ce,{right:"100px",width:"600px",height:"650px",background:s.bgApp,overflow:"hidden"});let g=de(i,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:i,googleLine:null},()=>L());i.appendChild(g);let l=document.createElement("div");l.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",i.appendChild(l);let c=document.createElement("div");c.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${s.bgSidebar};
      border-right: 1px solid ${s.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,l.appendChild(c);let p=document.createElement("div");p.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",l.appendChild(p);let T=document.createElement("div");T.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let x=document.createElement("div");x.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let f=document.createElement("div");f.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',f.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let m=document.createElement("input");m.type="text",m.placeholder="Buscar ferramenta ou SOP...",m.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${s.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,m.onfocus=()=>{x.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",x.style.border="1px solid #1a73e8"},m.onblur=()=>{x.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",x.style.border="1px solid transparent"},x.appendChild(f),x.appendChild(m),T.appendChild(x),p.appendChild(T);let v=document.createElement("div");v.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",p.appendChild(v);let A=null;function H(){if(A)return;A=document.createElement("div"),A.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let k=document.createElement("div");k.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",k.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let S=document.createElement("button");S.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',S.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",S.onclick=()=>{P(),a=!1,F()},k.appendChild(S),A.appendChild(k);let I=document.createElement("div");I.id="cw-history-list",I.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",A.appendChild(I),p.appendChild(A)}function N(){A||H();let k=A.querySelector("#cw-history-list");k.innerHTML="";let S=No();S.length===0?k.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':S.forEach(I=>{let d=G(I,Ie[I._originalCat],!0,I._originalCat);k.appendChild(d)}),requestAnimationFrame(()=>A.style.transform="translateY(0)")}function P(){A&&(A.style.transform="translateY(100%)")}function X(){c.innerHTML="";let k=V("history","Recentes",Ie.history);k.id="cw-sidebar-btn-history",k.onclick=()=>{j.playClick(),a=!a,a?N():P(),F()},c.appendChild(k);let S=document.createElement("div");S.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",c.appendChild(S),Object.keys($e).forEach(I=>{let d=$e[I],y=V(I,d.label,Ie[I]);y.id=`cw-sidebar-btn-${I}`,y.onclick=()=>{j.playClick(),a&&(a=!1,P()),O(I)},c.appendChild(y)})}function V(k,S,I){let d=document.createElement("div");d.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${s.textSecondary};
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,d.title=S,d.dataset.key=k;let y=document.createElement("div");y.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",y.innerHTML=I||Ie.tasks;let w=document.createElement("div");return w.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",w.textContent=S,d.appendChild(y),d.appendChild(w),d.onmouseenter=()=>{n!==k&&!(k==="history"&&a)&&(d.style.background="#F1F3F4",y.style.transform="scale(1.1)")},d.onmouseleave=()=>{n!==k&&!(k==="history"&&a)&&(d.style.background="transparent",y.style.transform="scale(1)")},d}function O(k){let S=document.getElementById(`cat-anchor-${k}`);S&&(S.scrollIntoView({behavior:"smooth",block:"start"}),n=k,F())}function F(){Object.keys($e).forEach(S=>{let I=c.querySelector(`#cw-sidebar-btn-${S}`);if(I)if(n===S&&!a){let d=st[S];I.style.background=d.bg,I.style.color=d.color,I.querySelector("div:first-child").style.transform="scale(1.1)"}else I.style.background="transparent",I.style.color=s.textSecondary,I.querySelector("div:first-child").style.transform="scale(1)"});let k=c.querySelector("#cw-sidebar-btn-history");k&&(a?(k.style.background="#3C4043",k.style.color="#FFFFFF"):(k.style.background="transparent",k.style.color=s.textSecondary))}function R(){if(v.innerHTML="",e.trim()!==""){let S=[];if(Object.entries($e).forEach(([d,y])=>{let w=y.links.filter(C=>C.name.toLowerCase().includes(e.toLowerCase())||C.desc.toLowerCase().includes(e.toLowerCase()));S.push(...w.map(C=>({...C,_cat:d})))}),S.length===0){v.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let I=document.createElement("div");I.innerHTML="Resultados da busca",I.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",v.appendChild(I),S.forEach(d=>{let y=G(d,Ie[d._cat],!1,d._cat);v.appendChild(y)});return}Object.entries($e).forEach(([S,I])=>{let d=st[S],y=document.createElement("div"),w=document.createElement("div");w.id=`cat-anchor-${S}`,w.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${d.color};
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,w.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${d.color};"></div>
            ${I.label}
          `,y.appendChild(w);let C=document.createElement("div");C.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",I.links.forEach(b=>{let E=G(b,Ie[S],!1,S);C.appendChild(E)}),y.appendChild(C),v.appendChild(y)});let k=document.createElement("div");k.style.height="80px",v.appendChild(k)}function G(k,S,I,d){let y=document.createElement("div"),w=st[d]||st.history;y.style.cssText=`
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
          background: ${w.bg}; color: ${w.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,C.innerHTML=S||Ie.tasks;let b=C.querySelector("svg");b&&(b.style.width="22px",b.style.height="22px");let E=document.createElement("div");E.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let M=document.createElement("div");M.style.cssText=`font-size: 14px; font-weight: 600; color: ${s.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,M.textContent=k.name;let h=document.createElement("div");h.style.cssText=`font-size: 12px; color: ${s.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,h.textContent=k.desc,E.appendChild(M),E.appendChild(h);let _=document.createElement("div");return _.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',_.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,_.title="Copiar URL",y.onmouseenter=()=>{y.style.transform="translateY(-2px)",y.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",y.style.borderColor="rgba(0,0,0,0.05)",y.style.borderLeft=`4px solid ${w.color}`,_.style.opacity="1",_.style.background="#F1F3F4"},y.onmouseleave=()=>{y.style.transform="translateY(0)",y.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",y.style.border="1px solid transparent",_.style.opacity="0",_.style.background="transparent"},y.onclick=()=>{!I&&d&&so(k,d),window.open(k.url,"_blank")},_.onclick=Y=>{Y.stopPropagation(),j.playClick(),navigator.clipboard.writeText(k.url),!I&&d&&so(k,d),J("Link copiado!")},y.appendChild(C),y.appendChild(E),y.appendChild(_),y}m.addEventListener("input",k=>{e=k.target.value,R()});function L(){o=!o,pe(o,i,"cw-btn-links")}return document.body.appendChild(i),X(),R(),L}var Ee=[];function yt(t){Ee=t}var Ro=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function lo(){let t="v4.9",e=!1,o=null,n=null;function a(d){if(!d)return"";try{let y=new Date(d);return isNaN(y.getTime())?String(d):y.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(d)}}if(!document.getElementById("cw-broadcast-hd-css")){let d=document.createElement("style");d.id="cw-broadcast-hd-css",d.innerHTML=`
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
      `,document.head.appendChild(d)}let s={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},i={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(d){return d?Object.entries(d).map(([y,w])=>`${y.replace(/[A-Z]/g,C=>"-"+C.toLowerCase())}:${w}`).join(";"):""}function g(d){if(!d||typeof d!="string")return"";let y=d;return y=y.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),y=y.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),y=y.replace(/_(.*?)_/g,"<i>$1</i>"),y=y.replace(/\n/g,"<br>"),y=qt(y),y}let l=document.createElement("div");l.id="broadcast-popup",l.classList.add("cw-module-window"),Object.assign(l.style,ce,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let c={popup:l,googleLine:null};function p(){if(e=!e,pe(e,l,"cw-btn-broadcast"),e){let d=document.getElementById("cw-btn-broadcast");d&&d.classList.remove("has-new"),O()}}let T=de(l,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",c,()=>p()),x=T.querySelector(".cw-header-actions")||T.lastElementChild,f=null;function m(){let d=null;try{d=he()}catch{console.warn("TechSol: Auth Pending")}if(d){let y=d.split("@")[0].toLowerCase(),w=Qe.includes(y);if(window._cwIsAdmin=w,window._cwCurrentUser=y,w&&x&&!x.querySelector("#cw-admin-btn")){let C=document.createElement("div");C.id="cw-admin-btn",C.className="cw-btn-interactive",C.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(C.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),C.title="Novo Aviso",C.onclick=b=>{b.stopPropagation(),H()},x.insertBefore(C,x.firstChild),f||A(),R()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(m,2e3))}if(x){let d=document.createElement("button");d.textContent="Limpar",d.className="cw-btn-interactive",Object.assign(d.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),d.onclick=y=>{y.stopPropagation(),j.playSuccess();let w=Ee.map(C=>C.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(w)),R(),F()},x.insertBefore(d,x.firstChild)}l.appendChild(T);let v=document.createElement("div");v.id="cw-update-status",v.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",l.appendChild(v);function A(){f=document.createElement("div"),f.className="cw-editor-overlay",f.innerHTML=`
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
      `,f.querySelectorAll('input[name="cw-bc-type"]').forEach(C=>{C.addEventListener("change",()=>{f.querySelectorAll(".cw-radio-option").forEach(b=>b.classList.remove("checked")),C.parentElement.classList.add("checked")})}),setTimeout(()=>{let C=f.querySelector(".cw-radio-option.info");C&&C.classList.add("checked")},100);let d=f.querySelector("#cw-bc-cancel"),y=f.querySelector("#cw-bc-close-x"),w=f.querySelector("#cw-bc-send");d.onclick=N,y.onclick=N,w.onclick=P,l.appendChild(f)}function H(d=null){if(!f)return;let y=f.querySelector("#cw-editor-title-label"),w=f.querySelector("#cw-bc-title"),C=f.querySelector("#cw-bc-text"),b=f.querySelector("#cw-bc-send");if(d){n=d.id,y.textContent="Editar Aviso",w.value=d.title||"",C.value=d.text||"",b.textContent="Salvar Altera\xE7\xF5es";let E=d.type||"info",M=f.querySelector(`input[name="cw-bc-type"][value="${E}"]`);M&&M.click()}else{n=null,y.textContent="Novo Aviso",w.value="",C.value="",b.textContent="Publicar";let E=f.querySelector('input[name="cw-bc-type"][value="info"]');E&&E.click()}f.classList.add("active"),setTimeout(()=>w.focus(),300)}function N(){f&&f.classList.remove("active"),n=null}async function P(){let d=f.querySelector("#cw-bc-send"),y=f.querySelector("#cw-bc-title"),w=f.querySelector("#cw-bc-text"),C=f.querySelector('input[name="cw-bc-type"]:checked'),b=C?C.value:"info";if(!y.value.trim()||!w.value.trim()){J("Preencha todos os campos!",{error:!0});return}d.textContent="Salvando...",d.style.opacity="0.7";let E=!1;n?E=await se.updateBroadcast(n,{title:y.value,text:w.value,type:b}):E=await se.sendBroadcast({title:y.value,text:w.value,type:b,author:window._cwCurrentUser||"admin"}),E?(J(n?"Atualizado!":"Publicado!"),j.playSuccess(),N(),setTimeout(()=>O(),1500)):(J("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),d.textContent=n?"Salvar Altera\xE7\xF5es":"Publicar",d.style.opacity="1")}async function X(d){if(await ue("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await se.deleteBroadcast(d)){J("Aviso removido."),j.playClick();let C=Ee.findIndex(b=>b.id===d);C>-1&&Ee.splice(C,1),R(),setTimeout(()=>O(),1500)}else J("Erro ao excluir.",{error:!0})}let V=document.createElement("div");V.className="cw-nice-scroll",Object.assign(V.style,s.feedContainer),l.appendChild(V);async function O(){e&&(v.style.display="block",v.innerHTML="\u{1F504} Sincronizando...");try{let d=await se.fetchData();d&&d.broadcast&&(yt(d.broadcast),F(),e&&(R(),v.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{v.style.display="none"},1500)))}catch{e&&(v.innerHTML="\u26A0\uFE0F Offline")}}function F(){let d=document.getElementById("cw-btn-broadcast");if(!d)return;let y=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Ee.some(C=>!y.includes(C.id))){if(d.classList.add("has-new"),!d.querySelector(".cw-badge")){let C=document.createElement("div");C.className="cw-badge",Object.assign(C.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),d.appendChild(C)}}else{d.classList.remove("has-new");let C=d.querySelector(".cw-badge");C&&C.remove()}}function R(){V.innerHTML="";let d=l.querySelector("#cw-bau-widget");d&&d.remove();let y=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),w=[...Ee].sort((h,_)=>{let Y=new Date(h.date).getTime()||0;return(new Date(_.date).getTime()||0)-Y}),C=w.findIndex(h=>h.title&&h.title.toLowerCase().includes("disponibilidade bau"));if(C!==-1){let h=w[C];w.splice(C,1);let _=document.createElement("div");_.id="cw-bau-widget",Object.assign(_.style,s.bauContainer);let Y=[],oe=(h.text||"").split(`
`),u=/\d{1,2}\/\d{1,2}/,z="\u{1F4C5}";if(oe.forEach(U=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(U)?z="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(U)&&(z="\u{1F1EA}\u{1F1F8}");let te=U.match(u);if(te){let ie=te[0],le=z;/🇧🇷|🇵🇹|PT|BR/i.test(U)?le="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(U)&&(le="\u{1F1EA}\u{1F1F8}"),Y.some(K=>K.flag===le&&K.date===ie)||Y.push({flag:le,date:ie})}}),Y.length===0){let U=(h.text||"").match(/\d{1,2}\/\d{1,2}/g);U&&[...new Set(U)].forEach(te=>Y.push({flag:"\u{1F4C5}",date:te}))}let D="",W='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(W=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${W}
              `),Y.length>0?D=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${Y.map(te=>`
                  <div style="${r(s.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(s.bauFlag)}">${te.flag}</span>
                      <span style="${r(s.bauDate)}">${te.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${W}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${g(h.text)}</div>
              `:D=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${g(h.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,_.innerHTML=`
              <div style="${r(s.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(s.liveIndicator)}">
                      <div style="${r(s.pulseDot)}"></div>
                      <span style="${r(s.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${a(h.date)}</div>
              </div>
              ${D}
          `,v.after(_);let $=_.querySelector("#cw-bau-toggle-btn"),Z=_.querySelector("#cw-bau-full");if($&&Z&&($.onclick=()=>{let U=Z.style.display==="none";Z.style.display=U?"block":"none",$.textContent=U?"Ocultar":"Detalhes"}),window._cwIsAdmin){let U=_.querySelector(".cw-bau-edit");U&&(U.onclick=()=>H(h))}}let b=w.sort((h,_)=>{let Y=y.includes(h.id),oe=y.includes(_.id);return Y===oe?0:Y?1:-1});if(b.length===0&&!C){let h=document.createElement("div");Object.assign(h.style,s.emptyState),h.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,V.appendChild(h)}let E=b.filter(h=>!y.includes(h.id)),M=b.filter(h=>y.includes(h.id));if(E.forEach(h=>V.appendChild(G(h,!1))),M.length>0){let h=document.createElement("div");Object.assign(h.style,s.historyDivider),h.innerHTML=`<span>Hist\xF3rico (${M.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let _=document.createElement("div");Object.assign(_.style,s.historyContainer),M.forEach(oe=>_.appendChild(G(oe,!0)));let Y=!1;h.onclick=()=>{j.playClick(),Y=!Y,_.style.display=Y?"flex":"none",h.querySelector("svg").style.transform=Y?"rotate(180deg)":"rotate(0deg)"},V.appendChild(h),V.appendChild(_)}}function G(d,y){let w=document.createElement("div");Object.assign(w.style,y?s.cardHistory:s.card);let C=i[d.type]||i.info,b=document.createElement("div");Object.assign(b.style,s.cardHeader);let E=document.createElement("div");Object.assign(E.style,s.typeTag,{color:C.color,background:C.bg}),E.innerHTML=`${C.icon} <span>${d.type}</span>`;let M=document.createElement("span");if(Object.assign(M.style,s.dateTag),M.textContent=a(d.date),b.appendChild(E),y)b.appendChild(M);else{let u=document.createElement("button");u.className="cw-btn-interactive",Object.assign(u.style,s.dismissBtn),u.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',u.onmouseenter=()=>{u.style.color="#1e8e3e",u.style.background="#e6f4ea",u.style.borderColor="#1e8e3e"},u.onmouseleave=()=>{u.style.color="#5f6368",u.style.background="#fff",u.style.borderColor="rgba(0,0,0,0.1)"},u.onclick=z=>{z.stopPropagation(),j.playClick(),w.style.transform="translateX(20px)",w.style.opacity="0",setTimeout(()=>{let D=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");D.push(d.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(D)),R(),F()},200)},b.appendChild(u)}let h=document.createElement("div");Object.assign(h.style,s.cardContent);let _=document.createElement("div");Object.assign(_.style,s.msgTitle),_.textContent=d.title;let Y=document.createElement("div");Object.assign(Y.style,s.msgBody),Y.innerHTML=g(d.text);let oe=document.createElement("div");if(Object.assign(oe.style,s.msgMeta),oe.innerHTML=`Publicado por <b>${d.author||"Sistema"}</b>`,y||(oe.innerHTML+=` \u2022 ${a(d.date)}`),h.appendChild(_),h.appendChild(Y),h.appendChild(oe),w.appendChild(b),w.appendChild(h),window._cwIsAdmin){let u=document.createElement("div");u.className="cw-card-actions";let z=document.createElement("button");z.className="cw-action-btn edit",z.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',z.onclick=()=>H(d);let D=document.createElement("button");D.className="cw-action-btn delete",D.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',D.onclick=()=>X(d.id),u.appendChild(z),u.appendChild(D),w.appendChild(u)}return w}let L=se.getCachedBroadcasts();L.length>0&&(yt(L),R()),setTimeout(m,500),O(),o||(o=setInterval(O,Ro));let k=document.createElement("div");Object.assign(k.style,ye),k.className="no-drag",l.appendChild(k),ve(l,k),document.body.appendChild(l);let S=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),I=Ee.some(d=>!S.includes(d.id));return{toggle:p,hasUnread:I}}function co(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,o.overlay);let a=document.createElement("div");Object.assign(a.style,o.card);let s=document.createElement("div");Object.assign(s.style,o.icon);let i=document.createElement("div");Object.assign(i.style,o.title);let r=document.createElement("div");Object.assign(r.style,o.text);let g=document.createElement("div");Object.assign(g.style,o.dotsContainer);let l=document.createElement("div");Object.assign(l.style,o.btnContainer);let c=document.createElement("button");c.textContent="Pular",Object.assign(c.style,o.btn,o.btnSkip),c.onmouseover=()=>c.style.color="#202124",c.onmouseout=()=>c.style.color="#5f6368";let p=document.createElement("button");p.textContent="Pr\xF3ximo",Object.assign(p.style,o.btn,o.btnNext),p.onmouseover=()=>p.style.transform="scale(1.05)",p.onmouseout=()=>p.style.transform="scale(1)",l.appendChild(c),l.appendChild(p),a.appendChild(s),a.appendChild(i),a.appendChild(r),a.appendChild(g),a.appendChild(l),n.appendChild(a),document.body.appendChild(n);function T(f){let m=t[f];s.textContent=m.icon,i.textContent=m.title,r.textContent=m.text,g.innerHTML="",t.forEach((v,A)=>{let H=document.createElement("div");Object.assign(H.style,o.dot),A===f&&Object.assign(H.style,o.dotActive),g.appendChild(H)}),m.isLast?(c.style.display="none",p.textContent="Come\xE7ar \u{1F680}",p.style.width="100%"):(c.style.display="block",p.textContent="Pr\xF3ximo",p.style.width="auto")}function x(){localStorage.setItem("cw_onboarding_seen_v1","true"),n.style.opacity="0",a.style.transform="translateY(20px)",setTimeout(()=>n.remove(),400),j.playSuccess(),J("Tudo pronto! Use o menu flutuante.")}p.onclick=()=>{j.playClick(),e<t.length-1?(e++,T(e)):x()},c.onclick=async()=>{await ue("Pular o tutorial?")&&x()},T(0),requestAnimationFrame(()=>{n.style.opacity="1",a.style.transform="translateY(0)"})}var po={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function uo(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&zo(t)}function zo(t){let e=po.slides,o=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,n.overlay);let s=document.createElement("div");Object.assign(s.style,n.card);let i=document.createElement("div");Object.assign(i.style,n.badge),i.textContent=`Atualiza\xE7\xE3o ${t}`;let r=document.createElement("div");Object.assign(r.style,n.icon);let g=document.createElement("div");Object.assign(g.style,n.title);let l=document.createElement("div");Object.assign(l.style,n.text);let c=document.createElement("div");Object.assign(c.style,n.dotsContainer);let p=document.createElement("button");Object.assign(p.style,n.btn),p.onmouseover=()=>p.style.transform="scale(1.02)",p.onmouseout=()=>p.style.transform="scale(1)",s.appendChild(i),s.appendChild(r),s.appendChild(g),s.appendChild(l),s.appendChild(c),s.appendChild(p),a.appendChild(s),document.body.appendChild(a);function T(f){let m=e[f];r.textContent=m.icon,g.textContent=m.title,l.textContent=m.text,c.innerHTML="",e.forEach((v,A)=>{let H=document.createElement("div");Object.assign(H.style,n.dot),A===f&&Object.assign(H.style,n.dotActive),c.appendChild(H)}),f===e.length-1?p.textContent="Entendi, vamos l\xE1! \u{1F44D}":p.textContent="Pr\xF3ximo"}function x(){localStorage.setItem("cw_last_version",t),a.style.opacity="0",s.style.transform="translateY(30px)",setTimeout(()=>a.remove(),400),j.playSuccess(),J(`TechSol atualizado para ${t}!`)}p.onclick=()=>{j.playClick(),o<e.length-1?(o++,T(o)):x()},T(0),requestAnimationFrame(()=>{a.style.opacity="1",s.style.transform="translateY(0)"})}var mo="cw_timezone_pinned",vt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],Bo=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function go(){let t="v2.2 Pro",e=!1,o=null,n="mx",a=JSON.parse(localStorage.getItem(mo)||"[]"),s="",i="all",r=new Date;r.setHours(14,0,0,0);let g={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},l={container:{display:"flex",flexDirection:"column",height:"100%",background:g.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:g.surface,borderBottom:`1px solid ${g.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:g.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:g.primary,borderBottomColor:g.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:g.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:g.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${g.border}`,background:g.surface,color:g.textSub,transition:"all 0.2s"},chipActive:{background:g.primaryBg,color:g.primary,borderColor:g.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:g.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${g.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:g.surface,border:`1px solid ${g.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:g.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},c=document.createElement("div");c.id="timezone-popup",c.classList.add("cw-module-window"),Object.assign(c.style,ce,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let T=de(c,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:c},()=>y());c.appendChild(T);let x=document.createElement("div");Object.assign(x.style,l.container),c.appendChild(x);let f=document.createElement("div");Object.assign(f.style,l.tabHeader);let m=document.createElement("div");m.textContent="Monitoramento",Object.assign(m.style,l.tabBtn,l.tabActive);let v=document.createElement("div");v.textContent="Planejador",Object.assign(v.style,l.tabBtn),f.appendChild(m),f.appendChild(v),x.appendChild(f);let A=document.createElement("div");Object.assign(A.style,l.toolbar);let H=document.createElement("div");Object.assign(H.style,l.searchInputWrapper);let N=document.createElement("div");N.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(N.style,l.searchIcon);let P=document.createElement("input");P.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(P.style,l.searchInput),P.onfocus=()=>{P.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",P.style.borderColor="rgba(26,115,232,0.3)"},P.onblur=()=>{P.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",P.style.borderColor="transparent"},P.oninput=w=>{s=w.target.value.toLowerCase(),k()},H.appendChild(N),H.appendChild(P),A.appendChild(H);let X=document.createElement("div");Object.assign(X.style,l.chipsRow),Bo.forEach(w=>{let C=document.createElement("div");C.textContent=w.label,C.id=`tz-filter-${w.id}`,Object.assign(C.style,l.chip),w.id===i&&Object.assign(C.style,l.chipActive),C.onclick=()=>{j.playClick(),i=w.id,Array.from(X.children).forEach(b=>{Object.assign(b.style,l.chip)}),Object.assign(C.style,l.chipActive),k()},X.appendChild(C)}),A.appendChild(X),x.appendChild(A);let V=document.createElement("div");Object.assign(V.style,l.listContainer);let O=document.createElement("style");O.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",x.appendChild(O);let F=document.createElement("div");Object.assign(F.style,l.plannerWrapper,{display:"none"}),x.appendChild(V),x.appendChild(F),m.onclick=()=>R("live"),v.onclick=()=>R("plan");function R(w){j.playClick(),w==="live"?(Object.assign(m.style,l.tabActive),Object.assign(v.style,l.tabBtn),v.style.borderBottomColor="transparent",V.style.display="flex",A.style.display="flex",F.style.display="none",I()):(Object.assign(v.style,l.tabActive),Object.assign(m.style,l.tabBtn),m.style.borderBottomColor="transparent",F.style.display="flex",V.style.display="none",A.style.display="none",d(),S())}function G(w){return w>=9&&w<17?{color:g.success,bg:g.successBg,label:"Aberto",icon:"\u{1F7E2}"}:w>=8&&w<9?{color:g.warning,bg:g.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:w>=17&&w<19?{color:g.warning,bg:g.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:g.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function L(w){a.includes(w)?a=a.filter(C=>C!==w):a.push(w),localStorage.setItem(mo,JSON.stringify(a)),k(),j.playClick()}function k(){V.innerHTML="";let w=new Date,C=vt.filter(E=>{let M=E.name.toLowerCase().includes(s)||E.label.toLowerCase().includes(s),h=i==="all"||E.region===i;return M&&h});if(C.sort((E,M)=>{let h=a.includes(E.id),_=a.includes(M.id);return h&&!_?-1:!h&&_?1:E.name.localeCompare(M.name)}),C.length===0){V.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}C.forEach(E=>{let M=a.includes(E.id),h=w.toLocaleTimeString("pt-BR",{timeZone:E.zone,hour:"2-digit",minute:"2-digit"}),_=parseInt(h.split(":")[0]),Y=G(_),oe=_<6||_>18,u=document.createElement("div");Object.assign(u.style,l.hubCard),M&&Object.assign(u.style,l.hubCardPinned);let z=M?"\u2605":"\u2606",D=M?"#F9AB00":"#DADCE0";u.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${D}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${z}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${E.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${g.text}; letter-spacing:-0.2px;">${E.name}</div>
                        <div style="font-size:12px; color:${g.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${oe?"\u{1F319}":"\u2600\uFE0F"} ${E.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${g.text}; font-family:'Google Sans', sans-serif;">${h}</div>
                    <div style="font-size:11px; font-weight:600; color:${Y.color}; background:${Y.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${Y.label}
                    </div>
                </div>
            `,u.onmouseenter=()=>{u.style.transform="translateY(-2px)",u.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},u.onmouseleave=()=>{u.style.transform="translateY(0)",u.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let W=u.querySelector(".cw-pin-btn");W.onmouseenter=()=>{W.style.backgroundColor="#F1F3F4"},W.onmouseleave=()=>{W.style.backgroundColor="transparent"},W.onclick=$=>{$.stopPropagation(),L(E.id)},u.onclick=()=>{n=E.id,R("plan")},V.appendChild(u)});let b=document.createElement("div");b.style.height="20px",b.style.width="100%",V.appendChild(b)}function S(){F.innerHTML="";let w=document.createElement("div"),C=document.createElement("label");C.textContent="Onde est\xE1 o cliente?",C.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let b=document.createElement("select");Object.assign(b.style,We),b.style.padding="14px",[...vt].sort((Q,K)=>Q.name.localeCompare(K.name)).forEach(Q=>{let K=document.createElement("option");K.value=Q.id,K.textContent=`${Q.flag} ${Q.name} (${Q.zone})`,Q.id===n&&(K.selected=!0),b.appendChild(K)}),b.onchange=Q=>{n=Q.target.value,le(),j.playClick()},w.appendChild(C),w.appendChild(b),F.appendChild(w);let M=document.createElement("div");Object.assign(M.style,l.timeComparisonRow);let h=document.createElement("div");Object.assign(h.style,l.timeCard),h.style.backgroundColor="#F8FAFF",h.style.borderColor="#E8F0FE",h.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let _=document.createElement("div");Object.assign(_.style,l.timeCard),_.style.backgroundColor="#FFF8E1",_.style.borderColor="#FEF7E0",_.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,M.appendChild(h),M.appendChild(_),F.appendChild(M);let Y=document.createElement("div");Y.id="cw-planner-status",Object.assign(Y.style,l.statusBadge),F.appendChild(Y);let oe=document.createElement("div");Object.assign(oe.style,{padding:"0 4px",marginTop:"12px"});let u=document.createElement("div");u.textContent="Arraste para simular o hor\xE1rio:",u.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let z=document.createElement("div");Object.assign(z.style,l.timelineContainer);let D=document.createElement("div");Object.assign(D.style,l.timelineTrack);let W=document.createElement("div");Object.assign(W.style,l.dayZone),D.appendChild(W);let $=document.createElement("input");$.type="range",$.min="0",$.max="1439",$.step="15",$.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let Z=document.createElement("div");Z.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",Z.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",z.appendChild(D),z.appendChild($),z.appendChild(Z),oe.appendChild(u),oe.appendChild(z),F.appendChild(oe);let U=h.querySelector("#cw-time-input-br"),te=_.querySelector("#cw-time-display-client"),ie=_.querySelector("#cw-client-label");function le(){let Q=vt.find(xo=>xo.id===n);ie.textContent=`${Q.flag} ${Q.label} (${Q.zone})`;let K=r.getHours(),fe=r.getMinutes(),Ge=`${String(K).padStart(2,"0")}:${String(fe).padStart(2,"0")}`;U.value=Ge,$.value=K*60+fe;let wt=r.toLocaleTimeString("pt-BR",{timeZone:Q.zone,hour:"2-digit",minute:"2-digit"});te.textContent=wt;let Le=parseInt(wt.split(":")[0]);Le>=9&&Le<17?(Y.style.background=g.successBg,Y.style.color=g.success,Y.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):Le>=8&&Le<9||Le>=17&&Le<19?(Y.style.background=g.warningBg,Y.style.color=g.warning,Y.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(Y.style.background=g.errorBg,Y.style.color=g.error,Y.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}$.oninput=Q=>{let K=parseInt(Q.target.value);r.setHours(Math.floor(K/60)),r.setMinutes(K%60),le()},U.oninput=Q=>{let[K,fe]=Q.target.value.split(":");K&&fe&&(r.setHours(parseInt(K)),r.setMinutes(parseInt(fe)),le())},le()}function I(){k(),o||(o=setInterval(k,6e4))}function d(){o&&(clearInterval(o),o=null)}function y(){e=!e,pe(e,c,"cw-btn-timezone"),e?R("live"):d()}return document.body.appendChild(c),y}function fo(){let t="v1.1",e=!1,o="general",n=null,a=null;if(!document.getElementById("cw-lib-styles")){let S=document.createElement("style");S.id="cw-lib-styles",S.innerHTML=`
            .cw-lib-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .cw-lib-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; border-color: rgba(0, 122, 255, 0.3) !important; }
            .cw-tactile { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.92) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #5F6368; }
            .cw-toolbar-btn:hover { background: #F1F3F4; color: #007AFF; border-color: #DADCE0; }
            .cw-toolbar-btn.active { background: #E8F0FE; color: #007AFF; border-color: #007AFF; }
        `,document.head.appendChild(S)}let s={bg:"#F0F2F5",surface:"#FFFFFF",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",text:"#1C1C1E",textSub:"#8E8E93",border:"rgba(0, 0, 0, 0.08)",danger:"#FF3B30"},i={container:{display:"flex",flexDirection:"column",height:"100%",background:s.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"12px 16px 0 16px",background:s.surface,borderBottom:`1px solid ${s.border}`},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:s.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",userSelect:"none"},tabActive:{color:s.primary,borderBottomColor:s.primary,fontWeight:"600"},listContainer:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"},emptyState:{padding:"40px 20px",textAlign:"center",color:"#BDC1C6",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},card:{background:s.surface,borderRadius:"16px",padding:"16px",border:`1px solid ${s.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative",overflow:"hidden"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},cardTitle:{fontSize:"14px",fontWeight:"600",color:s.text},cardPreview:{fontSize:"12px",color:s.textSub,lineHeight:"1.5",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"12px",paddingTop:"12px",borderTop:`1px dashed ${s.border}`},actionBtn:{padding:"6px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",cursor:"pointer",border:"none",background:"transparent",transition:"background 0.2s"},fab:{position:"absolute",bottom:"24px",right:"24px",width:"56px",height:"56px",borderRadius:"16px",background:s.primary,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"transform 0.2s",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.85)",backdropFilter:"blur(25px) saturate(180%)",webkitBackdropFilter:"blur(25px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"16px 24px",background:s.surface,borderBottom:`1px solid ${s.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"24px",overflowY:"auto"},inputGroup:{marginBottom:"20px"},label:{display:"block",fontSize:"12px",fontWeight:"700",color:s.textSub,marginBottom:"8px",textTransform:"uppercase"},input:{width:"100%",padding:"12px",borderRadius:"8px",border:`1px solid ${s.border}`,fontSize:"14px",fontFamily:"inherit",outline:"none",background:s.surface,boxSizing:"border-box"}},r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,ce,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let l=de(r,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:r},()=>k());r.appendChild(l);let c=document.createElement("div");Object.assign(c.style,i.container),r.appendChild(c);let p=document.createElement("div");Object.assign(p.style,i.tabHeader);let T=[{id:"general",label:"Geral",icon:"\u{1F4CB}"},{id:"note",label:"Notas",icon:"\u{1F4DD}"},{id:"email",label:"Emails",icon:"\u{1F4E7}"}];T.forEach(S=>{let I=document.createElement("div");I.innerHTML=`${S.icon} ${S.label}`,I.id=`lib-tab-${S.id}`,Object.assign(I.style,i.tabBtn),S.id===o&&Object.assign(I.style,i.tabActive),I.onmouseenter=()=>j.playHover(),I.onclick=()=>X(S.id),p.appendChild(I)}),c.appendChild(p);let x=document.createElement("div");Object.assign(x.style,i.listContainer),c.appendChild(x);let f=document.createElement("div");f.className="cw-fab cw-tactile",Object.assign(f.style,i.fab),f.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',f.onmouseenter=()=>f.style.transform="scale(1.1)",f.onmouseleave=()=>f.style.transform="scale(1)",f.onclick=()=>O(),c.appendChild(f),n=document.createElement("div"),Object.assign(n.style,i.editorOverlay);let m=document.createElement("div");Object.assign(m.style,i.editorHeader),m.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let v=document.createElement("button");v.innerHTML="Cancelar",v.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",v.onclick=F,m.appendChild(v),n.appendChild(m);let A=document.createElement("div");Object.assign(A.style,i.editorBody),n.appendChild(A);let H=document.createElement("div");H.style.cssText="padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";let N=document.createElement("button");N.textContent="Salvar",N.style.cssText="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);",N.onclick=R,H.appendChild(N),n.appendChild(H),c.appendChild(n);let P=document.createElement("div");Object.assign(P.style,ye),P.className="no-drag",r.appendChild(P),ve(r,P),document.body.appendChild(r);function X(S){j.playClick(),o=S,T.forEach(I=>{let d=document.getElementById(`lib-tab-${I.id}`);I.id===S?Object.assign(d.style,i.tabActive):Object.assign(d.style,i.tabBtn)}),V()}function V(){x.innerHTML="";let S=ge.getSnippets(o);if(S.length===0){x.innerHTML=`
                <div style="${L(i.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;return}S.forEach(I=>{let d=document.createElement("div");d.className="cw-lib-card",Object.assign(d.style,i.card),I.isCode&&(d.style.borderLeft=`4px solid ${s.primary}`,d.style.background="rgba(0, 122, 255, 0.02)");let y=I.content;if(I.isRich){let w=document.createElement("div");w.innerHTML=I.content;let C=w.querySelector("img");y=w.innerText.substring(0,150)+(w.innerText.length>150?"...":""),C&&(y="\u{1F5BC}\uFE0F [Cont\xE9m Imagens] "+y)}d.innerHTML=`
                <div style="${L(i.cardHeader)}">
                    <div style="${L(i.cardTitle)}">${I.title}</div>
                    <div style="display:flex; gap:4px;">
                        ${I.isCode?'<span style="font-size:10px; background:#F1F3F4; color:#5F6368; padding:2px 6px; border-radius:4px; font-family:monospace;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>':""}
                    </div>
                </div>
                <div style="${L(i.cardPreview)}; ${I.isCode?"font-family:'Roboto Mono', monospace; font-size:11px;":""}">${y}</div>
                <div style="${L(i.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${L(i.actionBtn)}; color:#007AFF; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${L(i.actionBtn)}; color:#8E8E93; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${L(i.actionBtn)}; color:#FF3B30; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                    </button>
                </div>
            `,d.onmouseenter=()=>{j.playHover()},d.querySelector(".cw-act-copy").onclick=w=>{if(w.stopPropagation(),j.playClick(),I.isRich){let C=new Blob([I.content],{type:"text/html"}),b=document.createElement("div");b.style.whiteSpace="pre-wrap",b.innerHTML=I.content;let E=new Blob([b.innerText],{type:"text/plain"}),M=[new ClipboardItem({"text/html":C,"text/plain":E})];navigator.clipboard.write(M)}else navigator.clipboard.writeText(I.content);J("Copiado!")},d.querySelector(".cw-act-edit").onclick=w=>{w.stopPropagation(),j.playClick(),O(I)},d.querySelector(".cw-act-del").onclick=async w=>{w.stopPropagation(),j.playClick(),await ue("Excluir este item?")&&(ge.delete(I.id),V(),J("Item exclu\xEDdo."))},x.appendChild(d)})}function O(S=null){a=S?S.id:null,A.innerHTML="",A.appendChild(G("title","T\xEDtulo / Nome",S?S.title:"")),o==="email"&&A.appendChild(G("subject","Assunto do Email",S?S.subject:""));let I="Conte\xFAdo";o==="email"&&(I="Corpo do Email (HTML)"),o==="note"&&(I="Texto da Nota (Reason)"),A.appendChild(G("content",I,S?S.content:"",{isRich:!0,isCode:S?S.isCode:!1})),m.querySelector("span").textContent=S?"Editar Item":"Novo Item",n.style.transform="translateY(0)",setTimeout(()=>{let d=A.querySelector("input");d&&d.focus()},300)}function F(){n.style.transform="translateY(100%)",setTimeout(()=>a=null,300)}async function R(){let S=A.querySelector("#cw-inp-title"),I=A.querySelector("#cw-inp-content"),d=S.value.trim(),y=I.contentEditable==="true"?I.innerHTML:I.value.trim(),w=I.getAttribute("data-is-code")==="true";if(!d||!y||y==="<br>"){J("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let C={id:a,type:o,title:d,content:y,isCode:w,isRich:I.contentEditable==="true"};if(o==="email"){let b=A.querySelector("#cw-inp-subject").value.trim();if(!b){J("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}C.subject=b}N.textContent="Salvando...",await ge.save(C),N.textContent="Salvar",F(),V(),J("Salvo com sucesso!"),j.playSuccess()}function G(S,I,d,y={}){let w=document.createElement("div");Object.assign(w.style,i.inputGroup);let C=document.createElement("label");C.textContent=I,Object.assign(C.style,i.label);let b;if(y.isRich){let E=document.createElement("div");E.style.cssText="display:flex; gap:6px; margin-bottom:12px; background:rgba(241, 243, 244, 0.8); padding:6px; border-radius:12px; border:1px solid #DADCE0; backdrop-filter: blur(10px);",E.innerHTML=`
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
            `,b=document.createElement("div"),b.contentEditable="true",Object.assign(b.style,i.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),b.innerHTML=d||"",y.isCode&&(b.style.fontFamily="'Roboto Mono', monospace",b.style.backgroundColor="#F8F9FA",b.setAttribute("data-is-code","true")),E.querySelectorAll(".cw-toolbar-btn").forEach(M=>{M.onmouseenter=()=>j.playHover(),M.onmousedown=()=>j.playClick()}),E.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),b.focus()},E.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),b.focus()},E.querySelector(".cw-tb-code").onclick=M=>{let _=!(b.getAttribute("data-is-code")==="true");b.setAttribute("data-is-code",_),b.style.fontFamily=_?"'Roboto Mono', monospace":"inherit",b.style.backgroundColor=_?"rgba(0, 122, 255, 0.03)":s.surface,_?M.currentTarget.classList.add("active"):M.currentTarget.classList.remove("active"),b.focus()},E.querySelector(".cw-tb-img").onclick=async()=>{let M=await Nt("Cole a URL da imagem:");M&&(document.execCommand("insertImage",!1,M),b.querySelectorAll("img").forEach(_=>{_.style.maxWidth="100%",_.style.borderRadius="8px"}))},b.onpaste=M=>{let h=(M.clipboardData||M.originalEvent.clipboardData).items;for(let _ of h)if(_.kind==="file"&&_.type.startsWith("image/")){M.preventDefault();let Y=_.getAsFile(),oe=new FileReader;oe.onload=u=>{let z=`<img src="${u.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,z)},oe.readAsDataURL(Y)}},w.appendChild(C),w.appendChild(E)}else b=document.createElement("input"),b.type="text",Object.assign(b.style,i.input),b.value=d||"",w.appendChild(C);return b.id=`cw-inp-${S}`,b.onfocus=()=>{b.style.borderColor=s.primary,b.style.boxShadow=`0 0 0 2px ${s.primaryBg}`},b.onblur=()=>{b.style.borderColor=s.border,b.style.boxShadow="none"},w.appendChild(b),w}function L(S){return Object.entries(S).map(([I,d])=>`${I.replace(/[A-Z]/g,y=>"-"+y.toLowerCase())}:${d}`).join(";")}function k(){e=!e,pe(e,r,"cw-btn-library"),e&&V()}return k}function bo(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},n="cw-configs-styles";if(!document.getElementById(n)){let T=document.createElement("style");T.id=n,T.innerHTML=`
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
        `,document.head.appendChild(T)}let a=document.createElement("div");a.id="configs-popup",a.classList.add("cw-module-window"),Object.assign(a.style,ce,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let i=de(a,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:a},()=>p());a.appendChild(i);let r=document.createElement("div");r.className="cw-configs-container",a.appendChild(r);let g=document.createElement("div");g.className="cw-configs-section",g.innerHTML=`
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
    `;let l=g.querySelector("#cw-config-sound-toggle");l.onchange=T=>{j.setMuted(!T.target.checked),T.target.checked&&j.playClick()},r.appendChild(g);let c=document.createElement("div");c.className="cw-configs-section",c.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugest\xF5es</a>
            </div>
        </div>
    `,r.appendChild(c);function p(){e=!e,pe(e,a,"cw-btn-configs"),e&&j.playClick()}return document.body.appendChild(a),p}function Po(){if(window.techSolInitialized){pt();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{Ft();try{j.initGlobalListeners(),j.playStartup()}catch(l){console.warn("\xC1udio bloqueado:",l)}se.fetchTips(),pt();let e=eo(),o=no(),n=io(),a=ro(),s=go(),i=fo(),r=bo(),g=lo();Wt({toggleNotes:e,toggleEmail:o,toggleScript:n,toggleLinks:a,toggleTimezone:s,toggleLibrary:i,toggleConfigs:r,broadcastControl:g}),setTimeout(()=>{se.logEvent("App","Start","Session Start"),co(),setTimeout(()=>{uo(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),J("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Po();})();
