(()=>{var Ao=Object.defineProperty;var Eo=(t,e)=>()=>(t&&(e=t(t=0)),e);var To=(t,e)=>{for(var o in e)Ao(t,o,{get:e[o],enumerable:!0})};var et={};To(et,{NotesState:()=>Qe,notesState:()=>P});var Qe,P,Ve=Eo(()=>{Qe=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.excludedFields=new Set,this.activeFields=[];let e=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(e||"[]")),this.screenshotMode="implementation"}setCaseType(e){this.currentCaseType=e,this.isDirty=!0,this.notify()}setLanguage(e){this.currentLang=e,this.notify()}setPortugalCase(e){this.isPortugalCase=e,this.isDirty=!0,this.notify()}setConsent(e){this.consent=e,this.isDirty=!0,this.notify()}setTagSupportUsed(e){this.tagSupportUsed=e,e||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(e){this.activeFields=[...e],this.isDirty=!0,this.notify()}removeField(e){this.activeFields=this.activeFields.filter(o=>o!==e),this.isDirty=!0,this.notify()}addFieldAt(e,o){this.activeFields.includes(e)||(this.activeFields.splice(o,0,e),this.isDirty=!0,this.notify())}setForcedScreenshots(e){this.forcedScreenshots=new Set(e),this.isDirty=!0,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.isDirty=!0,this.notify()}setExcludedFields(e){this.excludedFields=new Set(e),this.isDirty=!0,this.notify()}toggleFieldExclusion(e,o){o?this.excludedFields.add(e):this.excludedFields.delete(e),this.isDirty=!0,this.notify()}setStatus(e){this.currentStatus=e,this.isDirty=!0,this.notify()}setSubStatus(e){this.currentSubStatus=e,this.isDirty=!0,this.notify()}setScreenshotMode(e){this.screenshotMode=e,this.notify()}setActiveTasks(e){this.activeTasks=e,this.isDirty=!0,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]=o,this.isDirty=!0,this.notify()}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},P=new Qe});var Je="",Ze="",Ft=t=>new Promise(e=>setTimeout(e,t));async function Ot(){if(Je&&Ze)return Je;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Ft(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let a=document.querySelector("profile-details img");if(a&&a.src.includes("/photos/")){let i=a.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let n=document.querySelector("profile-details .email");return n&&(Ze=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Ze)),t.click(),document.body.click(),Je=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function $e(){return Je||"Consultor"}function Se(){return Ze||null}function It(t){let e=new Date,o=e.getHours(),n=e.getDay(),a="Ol\xE1",i="";o>=5&&o<12?(a="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(a="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(a="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let s=[];o>=0&&o<5?s=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?n===1?s=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?s=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:s=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?s=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:s=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(s=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=s[Math.floor(Math.random()*s.length)];return{prefix:`${a},`,name:t,suffix:r,icon:i,isFriday:n===5}}async function ko(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,n=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');n&&(n.click(),await Ft(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(s=>{let r=s.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Fo(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function Oo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label")).find(a=>a.textContent.includes("Google Ads External Customer ID")||a.textContent.includes("Customer ID"));if(e){let a=e.closest("home-data-item")||e.parentElement;if(a){let i=a.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let n=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(n)return n[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"---"}async function Io(){let t="---";try{t=window.location.href.split("/").pop()}catch(e){console.warn("Falha URL:",e)}return t}async function Ce(){let t="Cliente",e="[INSERIR URL]";try{let r=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(r&&r.nextElementSibling){let l=r.nextElementSibling.innerText.trim();l&&(t=l)}}catch(s){console.warn("Falha Nome:",s)}try{let r=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(r&&r.nextElementSibling){let l=r.nextElementSibling.innerText.trim();l&&(e=l)}}catch(s){console.warn("Falha URL:",s)}let o=await ko(),n=Fo(),a=Oo(),i=await Io();return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:n,cid:a,agentName:$e(),caseId:i}}var Me=null,gt=null,Fe=.3;var Oe=localStorage.getItem("cw_sounds_muted")==="true";function _e(){if(!Me){let t=window.AudioContext||window.webkitAudioContext;t&&(Me=new t)}return Me&&Me.state==="suspended"&&Me.resume(),Me}function Lt(t){if(gt)return gt;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),n=o.getChannelData(0);for(let a=0;a<e;a++)n[a]=Math.random()*2-1;return gt=o,o}var G={setMuted:t=>{Oe=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>Oe,playClick:()=>{if(Oe)return;let t=_e();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Lt(t);let n=t.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let a=t.createGain();a.gain.setValueAtTime(Fe*.8,e),a.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(n),n.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(Oe)return;let t=_e();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(Fe*.1,e+.005),n.gain.linearRampToValueAtTime(0,e+.02),o.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(Oe)return;let t=_e();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((n,a)=>{let i=t.createOscillator(),s=t.createGain();i.type="sine",i.frequency.value=n,s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(Fe*.6,e+.05),s.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(s),s.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{if(Oe)return;let t=_e();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Lt(t);let n=t.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,e),n.frequency.exponentialRampToValueAtTime(800,e+.2);let a=t.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Fe*.5,e+.05),a.gain.linearRampToValueAtTime(0,e+.25),o.connect(n),n.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(Oe)return;let t=_e();if(!t)return;let e=t.currentTime,o=t.createOscillator(),n=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),n.gain.setValueAtTime(Fe,e),n.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(Oe)return;let t=_e();if(!t)return;let e=t.currentTime,o=.12,n=t.createOscillator(),a=t.createGain(),i=t.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,e),n.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),a.gain.setValueAtTime(Fe*4,e),a.gain.exponentialRampToValueAtTime(.001,e+.1),n.connect(i),i.connect(a),a.connect(t.destination),n.start(e),n.stop(e+.12);let s=t.createOscillator(),r=t.createGain();s.type="sine",s.frequency.setValueAtTime(150,e),s.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(Fe*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),s.connect(r),r.connect(t.destination),s.start(e),s.stop(e+.15),[55,55.4,110.5].forEach(p=>{let d=t.createOscillator(),u=t.createGain(),x=t.createBiquadFilter();d.type="sawtooth",d.frequency.value=p,x.type="lowpass",x.frequency.setValueAtTime(30,e),x.frequency.linearRampToValueAtTime(900,e+o+.2),x.frequency.exponentialRampToValueAtTime(40,e+3),u.gain.setValueAtTime(0,e),u.gain.linearRampToValueAtTime(Fe*.6,e+o+.1),u.gain.exponentialRampToValueAtTime(.001,e+3.5),d.connect(x),x.connect(u),u.connect(t.destination),d.start(e),d.stop(e+3.6)})},playNotification:()=>{if(Oe)return;let t=_e();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let a=t.createOscillator(),i=t.createGain();a.type="sine",a.frequency.setValueAtTime(n.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Fe*n.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+n.dur),a.connect(i),i.connect(t.destination),a.start(e),a.stop(e+n.dur+.1)})},playSwoosh:()=>{G.playGenieOpen()},playReset:()=>{G.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!Me)return;let n=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(o.relatedTarget))return;let a=Date.now();a-t<e||(G.playHover(),t=a)},{passive:!0})}};var qt=1e4;function _t(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function K(t,e={}){let o=document.createElement("div"),n=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?G.playError():G.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function Mt(t,e=null){let o=0,n=0,a=0,i=0,s=e||t;s.style.cursor="grab",s.onmousedown=r;function r(d){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(d.target.tagName)||d.target.closest(".no-drag"))return;d=d||window.event,s.style.cursor="grabbing",t.style.transition="none";let u=t.getBoundingClientRect();t.style.transform="none",t.style.left=u.left+"px",t.style.top=u.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",qt++,t.style.zIndex=qt,a=d.clientX,i=d.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=p,document.onmousemove=l}function l(d){d=d||window.event,d.preventDefault(),o=a-d.clientX,n=i-d.clientY,a=d.clientX,i=d.clientY;let u=t.offsetTop-n,x=t.offsetLeft-o,b=16,g=window.innerWidth,m=window.innerHeight,y=t.offsetWidth,v=t.offsetHeight;x<b?x=b:x+y>g-b&&(x=g-y-b),u<b?u=b:u+v>m-b&&(u=m-v-b),t.style.top=u+"px",t.style.left=x+"px"}function p(){document.onmouseup=null,document.onmousemove=null,s.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var pe={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var ft={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Dt={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Nt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Ie=t=>new Promise(e=>setTimeout(e,t));async function Lo(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await Ie(200);for(let n=0;n<e.length;n++){let a=e.charAt(n),i=document.createElement("span");i.textContent=a,o&&o.parentNode===t?o.before(i):t.appendChild(i);let s=Math.floor(Math.random()*60)+30;n===0&&(s=150),n>e.length-3&&(s=30),await Ie(s)}await Ie(600),o&&(o.style.display="none")}async function bt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Ie(200);let e=await Ot(),o=It(e),n=t.querySelector("#w-icon"),a=t.querySelector("#p1"),i=t.querySelector("#p2"),s=t.querySelector("#p3"),r=t.querySelector("#p-sextou");n&&(n.innerHTML=o.icon),a&&(a.textContent=o.prefix),s&&(s.textContent=o.suffix),await Ie(300);let l=n?n.querySelector("svg"):null;if(l&&(l.style.opacity="1",l.style.transform="scale(1)"),await Ie(400),a&&(a.style.opacity="1"),G.playStartup(),i&&await Lo(i,o.name),s&&(s.style.opacity="1",s.style.transform="translateY(0)"),o.isFriday&&r){await Ie(400),r.style.display="block",r.offsetWidth;let p=r.querySelector(".sextou-badge");p&&(p.style.opacity="1",p.style.transform="scale(1)")}await Ie(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Ie(900),t.parentNode&&t.parentNode.removeChild(t)}}function Rt(t){if(!t)return;let e=t.getBoundingClientRect(),o=window.innerWidth,n=window.innerHeight,a=24,i=o-e.width-a,s=n-e.height-a,r=parseFloat(t.style.left)||e.left,l=parseFloat(t.style.top)||e.top,p=Math.max(a,Math.min(r,i)),d=Math.max(a,Math.min(l,s));if(p!==r||d!==l){let u=t.style.transition;t.style.transition="left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",t.style.left=`${p}px`,t.style.top=`${d}px`,setTimeout(()=>{t.style.transition=u},300)}}var Ae={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Ee(t,e){e.onmousedown=o;function o(n){n.stopPropagation(),n.preventDefault();let a=t.style.transition;t.style.transition="none";let i=n.clientX,s=n.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),l=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),p=i,d=s,u=!1;function x(m){p=m.clientX,d=m.clientY,u||(window.requestAnimationFrame(()=>{b(),u=!1}),u=!0)}function b(){let m=r+(p-i),y=l+(d-s);m>360&&(t.style.width=m+"px"),y>300&&(t.style.height=y+"px")}function g(){document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",g),setTimeout(()=>{t.style.transition=a},50)}document.addEventListener("mousemove",x),document.addEventListener("mouseup",g)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function zt(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function Bt(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function Pt(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function fe(t,e={}){return new Promise(o=>{let n=Bt(),a=Pt(),i=e.danger?"#FF3B30":"#007AFF",s=e.confirmText||(e.danger?"Excluir":"Confirmar");a.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${s}</button>
            </div>
        `,n.appendChild(a),document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity=1,a.style.transform="scale(1)"});let r=d=>{n.style.opacity=0,a.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(d)},300)},l=a.querySelector("#cw-conf-cancel"),p=a.querySelector("#cw-conf-ok");[l,p].forEach(d=>d.onmouseenter=()=>G.playHover()),l.onclick=()=>{G.playClick(),r(!1)},p.onclick=()=>{G.playClick(),r(!0)}})}function Ht(t,e=""){return new Promise(o=>{let n=Bt(),a=Pt();a.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,n.appendChild(a),document.body.appendChild(n);let i=a.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{n.style.opacity=1,a.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let s=p=>{n.style.opacity=0,a.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(p)},300)},r=a.querySelector("#cw-prompt-cancel"),l=a.querySelector("#cw-prompt-ok");[r,l].forEach(p=>p.onmouseenter=()=>G.playHover()),r.onclick=()=>{G.playClick(),s(null)},l.onclick=()=>{G.playClick(),s(i.value)},i.onkeydown=p=>{p.key==="Enter"&&l.click(),p.key==="Escape"&&r.click()}})}Ve();var qo={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Gt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function ue(t,e,o,n,a,i){let s=document.createElement("div");Object.assign(s.style,qo),Mt(t,s);let r=document.createElement("div");if(Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let v=document.createElement("style");v.id="cw-header-anim",v.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(v)}r.style.animation="cw-header-flow 6s linear infinite",s.appendChild(r),a&&(a.googleLine=r);let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center",gap:"12px"});let p=document.createElement("img");p.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(p.style,{width:"20px",height:"20px",pointerEvents:"none"});let d=document.createElement("span");d.textContent=e,l.appendChild(p),l.appendChild(d);let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center",gap:"4px"});let x='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',b='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',g=document.createElement("div");g.innerHTML=x,Object.assign(g.style,Gt),g.title="Sobre & Feedback",g.classList.add("no-drag"),g.onmouseenter=()=>{g.style.background="rgba(255,255,255,0.1)",g.style.color="#FFF"},g.onmouseleave=()=>{g.style.color!=="rgb(138, 180, 248)"&&(g.style.background="transparent",g.style.color="#9AA0A6")};let m=document.createElement("div");m.innerHTML=b,Object.assign(m.style,Gt),m.title="Fechar",m.classList.add("no-drag"),m.onmouseenter=()=>{m.style.background="rgba(242, 139, 130, 0.2)",m.style.color="#F28B82"},m.onmouseleave=()=>{m.style.background="transparent",m.style.color="#9AA0A6"},m.onmousedown=v=>v.stopPropagation(),g.onmousedown=v=>v.stopPropagation(),m.onclick=i;let y=_o(t,e,o,n);return g.onclick=v=>{v.stopPropagation(),y.style.opacity==="1"?(y.style.opacity="0",y.style.pointerEvents="none",g.style.color="#9AA0A6",g.style.background="transparent"):(y.style.opacity="1",y.style.pointerEvents="auto",g.style.color="#8AB4F8",g.style.background="rgba(138, 180, 248, 0.1)")},u.appendChild(g),u.appendChild(m),s.appendChild(l),s.appendChild(u),s}function _o(t,e,o,n){let a=document.createElement("div");return Object.assign(a.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),a.innerHTML=`
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
    `,setTimeout(()=>{let i=a.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let s=a.querySelector("#close-help-internal");s&&(s.onmouseover=()=>s.style.backgroundColor="#f8f9fa",s.onmouseout=()=>s.style.backgroundColor="white",s.onclick=()=>{a.style.opacity="0",a.style.pointerEvents="none"})},0),t.appendChild(a),a}var D={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},de={small:"8px",medium:"12px",large:"20px",pill:"100px"},De={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},se="cubic-bezier(0.34, 1.56, 0.64, 1)",Mo={width:"100%",padding:"14px 16px",borderRadius:de.medium,border:`1.5px solid ${D.border}`,backgroundColor:D.bgInput,fontSize:"14px",color:D.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${se}`,outline:"none"},tn={...Mo,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},on={fontSize:"12px",fontWeight:"700",color:D.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},nn={display:"block",fontSize:"14px",fontWeight:"600",color:D.text,marginBottom:"10px",marginTop:"20px"},an={fontSize:"12px",color:D.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},xt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:D.primary},sn={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:D.text,cursor:"pointer",padding:"16px 20px",backgroundColor:D.surface,border:`1px solid ${D.border}`,borderRadius:de.large,transition:`all 0.4s ${se}`,userSelect:"none",boxShadow:De.subtle},rn={padding:"14px 28px",color:"#fff",backgroundColor:D.primary,border:"none",borderRadius:de.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${se}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},ln={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${D.primary}`,color:D.primary,borderRadius:de.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${se}`},cn={background:"transparent",border:`1px solid ${D.border}`,borderRadius:de.pill,color:D.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${se}`};function jt(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,pe,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${se}, height 0.4s ${se}, transform 0.4s ${se}, opacity 0.3s ease`,borderRadius:de.large,boxShadow:De.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let n={popup:o,googleLine:null},a=ue(o,"Case Notes",t,"Gera notas padronizadas com excel\xEAncia visual.",n,e);o.appendChild(a);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:D.surface}),o.appendChild(i);let s=document.createElement("div");s.textContent="created by lucaste@",Object.assign(s.style,Nt,{padding:"16px 24px",borderTop:`1px solid ${D.bgInput}`,color:D.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(s);let r=document.createElement("div");return Object.assign(r.style,Ae),r.className="no-drag",o.appendChild(r),Ee(o,r),Do(),{popup:o,content:i,header:a,animRefs:n,credit:s}}function Do(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${de.medium} !important;
            border: 1.5px solid ${D.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: all 0.2s ${se} !important;
            box-sizing: border-box !important;
            background: ${D.bgInput} !important;
            color: ${D.text} !important;
            outline: none !important;
            box-shadow: ${De.subtle} !important;
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
            border-radius: ${de.pill};
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
            border-radius: ${de.pill};
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
    `,document.head.appendChild(t)}var ve={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} Seguimos com os passos:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Pasos ejecutados:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:"}},we={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Te={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Pe={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},He=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],tt=["CONSIDERACOES","COMENTARIOS"],ot={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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

Irei solicitar descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var Ge=t=>new Promise(e=>setTimeout(e,t));function Ue(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var $t="cw-automation-styles";if(!document.getElementById($t)){let t=document.createElement("style");t.id=$t,t.innerHTML=`
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
    `,document.head.appendChild(t)}function Vt(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function Ut(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),o="";Vt(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(Ue(n),await Ge(1200));let a=document.querySelector("search-filter dropdown-button .button");if(a&&!(a.innerText||"").includes("All")){Ue(a),await Ge(600);let x=document.querySelector('material-checkbox[debug-id="check-all-box"]');x&&x.getAttribute("aria-checked")!=="true"&&(Ue(x),await Ge(300));let b=document.querySelector('material-button[debug-id="apply-filter"]');b&&(Ue(b),await Ge(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await Ge(500));let s=Array.from(document.querySelectorAll(".message-header"));for(let u=s.length-1;u>=0;u--){let x=s[u],b=x.querySelector("i.material-icons-extended"),g=b&&b.innerText.trim()==="phone_in_talk",m=x.innerText||"",y=m.includes("Agent joined")||m.includes("outbound-call")||m.includes("Speakeasy");if(g||y){x.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",x),e&&(e.placeholder="Lendo mensagem..."),Ue(x),await Ge(1e3));break}}let l=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),p=/Speakeasy.*?(P\d{15,25})/i,d=null;for(let u=l.length-1;u>=0;u--){let x=l[u];if(x.offsetParent===null)continue;let b=(x.innerText||"").match(p);if(b&&b[1]){d=b[1];break}}if(e)if(d){try{await navigator.clipboard.writeText(d)}catch{}e.value=d,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),G.playSuccess(),K(`ID Localizado: ${d}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else G.playError(),K("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),K("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),Vt(!1)}}function Wt(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,n=this.selectionEnd,a=this.value,i=a.lastIndexOf(`
`,o-1)+1,s=a.substring(i,o);if(e.key==="Enter"){e.preventDefault();let r=s.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(s.trim()==="\u2022"){this.value=a.substring(0,i)+`
`+a.substring(n),this.selectionStart=this.selectionEnd=i+1;return}let l=`
`+r;this.value=a.substring(0,o)+l+a.substring(n),this.selectionStart=this.selectionEnd=o+l.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?s.startsWith("  ")&&(this.value=a.substring(0,i)+s.substring(2)+a.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=a.substring(0,i)+"  "+s+a.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===n&&o>0){let r=a.substring(0,o);r.endsWith("\u2022 ")?(e.preventDefault(),this.value=r.substring(0,o-2)+a.substring(n),this.selectionStart=this.selectionEnd=o-2):r.endsWith("  ")&&s.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=r.substring(0,o-2)+a.substring(n),this.selectionStart=this.selectionEnd=o-2)}}))}function ht(t,e,o){if(e.innerHTML="",!!Te[t]&&(o.activeFields.forEach(a=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(a))return;let i=`field-${a}`,s=document.createElement("label"),r=u=>ve[o.currentLang]?.[u]||ve.pt?.[u]||u;s.textContent=r(a.toLowerCase())!==a.toLowerCase()?r(a.toLowerCase()):a.replace(/_/g," ").replace(/\b\w/g,u=>u.toUpperCase())+":",Object.assign(s.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:D.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let l=document.createElement("span");if(l.textContent=s.textContent,s.innerHTML="",s.appendChild(l),a==="SPEAKEASY_ID"){let u=document.createElement("button");u.innerHTML="\u2728 Auto Busca",u.style.cssText=`font-size: 11px; font-weight: 700; color: ${D.primary}; background-color: ${D.primaryBg}; border: none; border-radius: ${de.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${se};`,u.onmouseenter=()=>u.style.backgroundColor="#d2e3fc",u.onmouseleave=()=>u.style.backgroundColor=D.primaryBg,u.onclick=x=>{x.preventDefault(),Ut(i)},s.appendChild(u)}let p=document.createElement("button");p.innerHTML="\u2715",p.style.cssText=`font-size: 14px; background: ${D.bgInput}; border: none; color: ${D.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${se};`,p.onmouseenter=()=>{p.style.background=D.error,p.style.color=D.surface},p.onmouseleave=()=>{p.style.background=D.bgInput,p.style.color=D.textSub},p.onclick=async u=>{u.preventDefault(),await fe(`Tem certeza que deseja remover o campo "${l.textContent.replace(":","")}"?`)&&(o.removeField(a),ht(t,e,o))},s.appendChild(p);let d;He.includes(a)?(d=document.createElement("textarea"),d.classList.add("bullet-textarea","cw-textarea"),d.placeholder="Utilize marcadores para detalhar...",Wt(d)):tt.includes(a)?(d=document.createElement("textarea"),d.classList.add("cw-textarea"),d.placeholder="Descreva as considera\xE7\xF5es..."):(d=document.createElement("input"),d.type="text",d.classList.add("cw-input")),d.id=i,d.value=o.formData[i]||"",d.addEventListener("input",u=>o.updateField(i,u.target.value)),e.appendChild(s),e.appendChild(d)}),o.activeFields.includes("CONSENTIU_GRAVACAO"))){let a=r=>ve[o.currentLang]?.[r]||ve.pt?.[r]||r,i=document.createElement("label");i.textContent=a("consentiu_gravacao"),Object.assign(i.style,{display:"block",fontSize:"13px",fontWeight:"700",color:D.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let s=document.createElement("select");s.className="cw-select",s.innerHTML=`
            <option value="false">${a("nao")}</option>
            <option value="true">${a("sim")}</option>
        `,s.value=o.consent?"true":"false",s.onchange=()=>o.setConsent(s.value==="true"),e.appendChild(i),e.appendChild(s)}}function yt(t,e,o){let n=t.currentSubStatus;if(!n)return null;let a=Te[n],i=ve[t.currentLang]||ve.pt,s=p=>i[p]||ve.pt?.[p]||p,r='style="margin-bottom: 12px; padding-left: 30px;"',l="";if(t.activeFields.forEach(p=>{let d=s(p.toLowerCase()),u="N/A";if(p==="label_substatus")d=s("label_substatus"),u=a.name;else if(p==="TAGS_IMPLEMENTED"){d=s("tags_implemented");let x=[];e.getCheckedElements().forEach(g=>{let m=g.value,y=we[m],v=g.count||1,N=m==="ads_conversion_tracking"||m==="ads_enhanced_conversions";t.tagSupportUsed&&N&&!t.forcedScreenshots.has(m)?x.push(`${y.name} - ${s("ts_output_disclaimer")}`):x.push(v>1?`${y.name} (x${v})`:y.name)}),u=x.join(", ")||"N/A"}else if(p==="SCREENSHOTS_LIST"){d=s("screenshots_list");let x="",b=e.screenshotsElement;b&&Array.from(b.querySelectorAll('input[id^="name-"]')).forEach(m=>{let y=m.value,v=m.closest(".cw-screen-card");if(v){let N=v.querySelectorAll('input[id^="screen-"]'),B=!1,$="";N.forEach(J=>{let I=J.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",T=J.value.trim();T&&($+=`<li>${I} - ${T}</li>`,B=!0)}),B&&(x+=`<div style="margin-bottom: 8px;"><b>${y}</b><ul ${r}>${$}</ul></div>`)}}),u=x||"N/A"}else if(p==="CASO_PORTUGAL")d=s("caso_portugal"),u=s("sim");else if(p==="CONSENTIU_GRAVACAO")d=s("consentiu_gravacao"),u=t.consent?s("sim"):s("nao");else{let x=`field-${p}`,b=t.formData[x],g="";if(a.fieldPrefixes&&a.fieldPrefixes[p]&&(g=a.fieldPrefixes[p]+" "),b&&b.trim()!==""&&b.trim()!=="\u2022"){let m=b.trim();if(He.includes(p)){let y=m.split(`
`).map(v=>v.trim()).filter(v=>v!==""&&v!=="\u2022").map(v=>v.startsWith("\u2022 ")?v.substring(2):v).map(v=>`<li>${v}</li>`).join("");u=y?`${g}<ul ${r}>${y}</ul>`:"N/A"}else tt.includes(p)?u=g+m.split(`
`).filter(y=>y.trim()!=="").map(y=>`<p style="margin: 0 0 8px 0;">${y}</p>`).join(""):u=g+m}else g&&(u=g.trim())}l+=`<b>${d}</b><br>${u}<br><br>`}),a.customFooter&&(l+=`${a.customFooter}<br><br>`),o?.getOutput){let p=o.getOutput();p&&(l+=`${p}<br><br>`)}return l+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",l.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}function Yt(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o="Passe o mouse sobre um cen\xE1rio para visualizar o texto...",n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let a=document.createElement("div");Object.assign(a.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.2s ease, transform 0.2s ease",i.textContent=o,a.appendChild(i);let s=new Set,r=null;return e.render=(l,p)=>{s.clear();let d=Object.entries(ot).filter(([u,x])=>{let b=!x.type||x.type==="all"||x.type===p,g=!1;return l.startsWith("NI_")?g=u.includes("-ni-")||u.includes("attempted"):l.startsWith("SO_")?g=u.includes("gtm")||u.includes("whatsapp")||u.includes("form")||u.includes("ecw4")||u.includes("ga4")||u.includes("-so-"):l.startsWith("AS_")?g=u.includes("-as-"):l.startsWith("IN_")?g=u.includes("-in-"):l.startsWith("DC_")&&(g=u.includes("-dc-")),b&&g});n.innerHTML="",d.forEach(([u,x])=>{let b=document.createElement("div"),g=u.replace("quickfill-","").replace(/-/g," ");b.textContent=g,b.dataset.id=u,Object.assign(b.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let m=x["field-REASON_COMMENTS"]||x["field-CONTEXTO_CALL"]||u;b.onmouseenter=()=>{r&&clearTimeout(r),s.has(u)||(b.style.background="#f1f3f4"),i.style.opacity="0",i.style.transform="translateY(5px)",r=setTimeout(()=>{i.textContent=m.substring(0,120)+(m.length>120?"...":""),i.style.opacity="1",i.style.transform="translateY(0)"},50)},b.onmouseleave=()=>{r&&clearTimeout(r),s.has(u)||(b.style.background="#ffffff"),r=setTimeout(()=>{s.size===0&&(i.style.opacity="0",setTimeout(()=>{i.textContent=o,i.style.opacity="1"},50))},100)},b.onclick=()=>{G.playClick();let y=!s.has(u);y?(s.add(u),b.style.background="#e8f0fe",b.style.borderColor="#1a73e8",b.style.color="#1967d2"):(s.delete(u),b.style.background="#ffffff",b.style.borderColor="#dadce0",b.style.color="#3c4043"),t(u,y)},n.appendChild(b)}),d.length===0?e.style.display="none":e.style.display="block"},e.appendChild(n),e.appendChild(a),e}var oe={bg:D.bgInput,white:D.surface,border:D.border,textMain:D.text,textSub:D.textSub,blue:D.blue,blueLight:D.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:D.blue,bg:D.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:D.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:D.primary,bg:D.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:D.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ne={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Xt(t,e,o){let n={},a="implementation";o&&o.subscribe(()=>{J(),X()});function i(I){let T=I.toLowerCase();return T.includes("ads")||T.includes("conversion")||T.includes("remarketing")?oe.brands.ads:T.includes("ga4")||T.includes("analytics")?oe.brands.ga4:T.includes("gtm")||T.includes("tag manager")||T.includes("container")?oe.brands.gtm:T.includes("merchant")||T.includes("shopping")||T.includes("feed")?oe.brands.gmc:oe.brands.default}let s=Object.entries(we).filter(([I,T])=>T.popular),r={};Object.entries(we).forEach(([I,T])=>{if(T.popular)return;let V=i(T.name);r[V.label]||(r[V.label]={brand:V,tasks:[]}),r[V.label].tasks.push({key:I,...T})});let l="cw-zen-tasks";if(!document.getElementById(l)){let I=document.createElement("style");I.id=l,I.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${oe.font}; background: ${oe.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${oe.border};
            }

            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${oe.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${oe.white};
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
                font-size: 12px; font-weight: 500; color: ${oe.textMain}; line-height: 1.2;
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
                color: ${oe.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${oe.border}; border-radius: 10px; background: ${oe.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${oe.blue}; box-shadow: 0 0 0 3px ${oe.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${oe.border}; border-radius: 10px; background: ${oe.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${oe.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${oe.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${oe.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${oe.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${oe.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }

            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px;
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${oe.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${oe.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${oe.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${oe.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${oe.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${oe.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${oe.textMain}; }

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
                font-family: ${oe.font}; font-size: 15px; font-weight: 600; color: ${oe.textMain};
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
                border-color: ${oe.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${oe.textSub}; opacity: 0;
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
                font-size: 11px; color: ${oe.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${oe.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${oe.textSub};
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
        `,document.head.appendChild(I)}let p=document.createElement("div");p.className="cw-zen-container";let d=document.createElement("div");Object.assign(d.style,{display:"none"});let u=document.createElement("div");u.className="cw-screens-container",d.appendChild(u),p.innerHTML=`
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
    `;let x=p.querySelector(".cw-hero-grid"),b=p.querySelector(".cw-acc-container"),g=p.querySelector(".cw-results-container"),m=p.querySelector(".cw-search-input"),y=p.querySelector(".cw-status-bar"),v=p.querySelector(".cw-status-text"),N=p.querySelector(".cw-footer-icons");s.forEach(([I,T])=>{let V=i(T.name),z=document.createElement("div");z.className="cw-hero-card",z.id=`hero-${I}`,z.style.setProperty("--hero-color",V.color),z.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Ne[V.icon]}</div>
                <div class="cw-hero-label">${T.name}</div>
            </div>

            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,z.onclick=q=>{if(q.target.closest(".cw-step-btn"))return;let A=n[I]?n[I].count:0;$(I,A>0?-A:1,T)},z.querySelector(".minus").onclick=()=>$(I,-1,T),z.querySelector(".plus").onclick=()=>$(I,1,T),z.dataset.color=V.color,x.appendChild(z)});function B(I,T){let V=i(T.name),z=document.createElement("div");return z.className="cw-task-item",z.dataset.id=I,z.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${V.bg}; color:${V.color}">
                    ${Ne[V.icon]||Ne.default}
                </div>
                <div class="cw-task-label">${T.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,z.onclick=q=>{if(q.target.closest(".cw-step-btn"))return;let A=n[I]?n[I].count:0;$(I,A>0?-A:1,T)},z.querySelector(".minus").onclick=()=>$(I,-1,T),z.querySelector(".plus").onclick=()=>$(I,1,T),z}Object.entries(r).forEach(([I,T])=>{let V=document.createElement("div");V.className="cw-acc-group";let z=document.createElement("div");z.className="cw-acc-header",z.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${T.brand.color}"></div>
                ${I}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,z.onclick=()=>{b.querySelectorAll(".cw-acc-group.open").forEach(A=>{A!==V&&A.classList.remove("open")}),V.classList.toggle("open")};let q=document.createElement("div");q.className="cw-acc-body",T.tasks.forEach(A=>{let S=B(A.key,A);q.appendChild(S)}),V.appendChild(z),V.appendChild(q),b.appendChild(V)});function $(I,T,V){n[I]||(n[I]={count:0,data:V,brand:i(V.name)}),n[I].count+=T,n[I].count<=0&&delete n[I],J(),X(),t&&t()}function J(){let I=o.tagSupportUsed;s.forEach(([A])=>{let S=x.querySelector(`#hero-${A}`);if(!S)return;let F=n[A];F?(S.classList.add("active"),S.querySelector(".cw-step-val").textContent=F.count,S.querySelector(".cw-step-val").style.color=S.dataset.color,I&&(A==="ads_conversion_tracking"||A==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(A)?S.classList.add("ts-success"):S.classList.remove("ts-success")):(S.classList.remove("active"),S.classList.remove("ts-success"))}),p.querySelectorAll(".cw-task-item").forEach(A=>{let S=A.dataset.id,F=n[S];F?(A.classList.add("selected"),A.querySelector(".cw-step-val").textContent=F.count,I&&(S==="ads_conversion_tracking"||S==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(S)?A.classList.add("ts-success"):A.classList.remove("ts-success")):(A.classList.remove("selected"),A.classList.remove("ts-success"))});let V=Object.keys(n),z=0,q=[];if(V.forEach(A=>{let S=n[A];z+=S.count;for(let F=0;F<S.count;F++)q.length<6&&q.push(S.brand)}),z>0){y.classList.add("visible");let A=z>1?"A\xE7\xF5es":"A\xE7\xE3o",S=z>1?"definidas":"definida";v.textContent=`${z} ${A} ${S}`,N.innerHTML="",q.forEach(F=>{let f=document.createElement("div");f.className="cw-mini-icon",f.innerHTML=Ne[F.icon]||Ne.default;let C=f.querySelector("svg");C&&(C.style.width="14px",C.style.height="14px"),N.appendChild(f)})}else y.classList.remove("visible")}m.addEventListener("input",I=>{let T=I.target.value.toLowerCase();if(T.length>0){b.style.display="none",g.style.display="block",g.innerHTML="";let V=!1;Object.entries(we).forEach(([z,q])=>{if(q.name.toLowerCase().includes(T)){V=!0;let A=B(z,q);n[z]&&(A.classList.add("selected"),A.querySelector(".cw-step-val").textContent=n[z].count),g.appendChild(A)}}),V||(g.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else b.style.display="block",g.style.display="none"});function X(){u.innerHTML="";let I=Object.keys(n),T=!1;if(I.length===0){u.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,d.style.display="none";return}let V=o.tagSupportUsed,z=document.createElement("div");z.className="cw-info-banner",z.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,u.appendChild(z),I.forEach(q=>{let A=n[q].data,S=n[q].count,F=n[q].brand,C=V&&(q==="ads_conversion_tracking"||q==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(q),O=o.screenshotMode||"implementation",E=A.screenshots?.[O]||[];if(E.length>0||C){T=!0;for(let _=1;_<=S;_++){let R=document.createElement("div");R.className="cw-screen-card",C&&R.classList.add("ts-success"),R.style.setProperty("--brand-color",F.color),R.style.setProperty("--brand-bg",F.bg),R.style.setProperty("--brand-shadow",F.color+"40");let U=document.createElement("div");U.className="cw-card-header";let h=document.createElement("div");h.className="cw-card-icon",h.innerHTML=Ne[F.icon]||Ne.default;let H=document.createElement("div");H.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let L=document.createElement("input");L.className="cw-card-title-input",L.id=`name-${q}-${_}`,L.value=`${A.name}${S>1?" #"+_:""}`,L.title="Clique para renomear esta task";let M=document.createElement("span");if(M.className="cw-edit-hint",M.innerHTML="\u270E Renomear",H.appendChild(L),H.appendChild(M),U.appendChild(h),U.appendChild(H),R.appendChild(U),C){let c=document.createElement("div");c.className="cw-ts-disclaimer-box",c.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,c.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(q,!0)},R.appendChild(c)}else E.forEach((c,k)=>{let w=document.createElement("div");w.className="cw-input-group";let W=document.createElement("label");W.className="cw-input-label",W.textContent=c;let Y=document.createElement("input");Y.className="cw-input-field",Y.id=`screen-${q}-${_}-${k}`,Y.placeholder="Cole o link aqui...",Y.setAttribute("autocomplete","off"),Y.addEventListener("input",()=>{Y.value.trim().length>5?Y.classList.add("filled"):Y.classList.remove("filled")});let Z=document.createElement("div");Z.className="cw-input-check",Z.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',w.appendChild(W),w.appendChild(Y),w.appendChild(Z),R.appendChild(w)});u.appendChild(R)}}}),d.style.display=T?"block":"none"}return{selectionElement:p,screenshotsElement:d,updateSubStatus:()=>X(),getCheckedElements:()=>Object.keys(n).map(I=>({value:I,count:n[I].count})),setTaskCount:(I,T)=>{n[I]&&delete n[I],T>0&&we[I]&&$(I,T,we[I])},toggleTask:(I,T=!0)=>{let V=n[I];T&&!V?$(I,1,we[I]):!T&&V&&$(I,-V.count,we[I])},setLanguage:I=>{e=I;let T=p.querySelector(".js-hero-title");T&&(T.textContent=e("acesso_rapido"));let V=p.querySelector(".cw-search-input");V&&(V.placeholder=e("buscar_catalogo")),X()},reset:()=>{for(let I in n)delete n[I];m.value="",b.style.display="block",g.style.display="none",J(),X()}}}var No={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},Ro={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},zo={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},Bo={display:"flex",gap:"20px",marginBottom:"12px"};function Kt(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,No);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,ft,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,Bo);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="Sim",Object.assign(a.style,xt);let i=document.createElement("label");i.textContent="Sim";let s=document.createElement("div");Object.assign(s.style,{display:"flex",alignItems:"center"}),s.appendChild(a),s.appendChild(i);let r=document.createElement("input");r.type="radio",r.name="ts_usage_mod",r.value="N\xE3o",r.checked=!0,Object.assign(r.style,xt);let l=document.createElement("label");l.textContent="N\xE3o";let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center"}),p.appendChild(r),p.appendChild(l),n.appendChild(s),n.appendChild(p);let d=document.createElement("div");d.style.display="block";let u=document.createElement("label");u.className="js-ts-reason-label",u.textContent=t("motivo_ts"),Object.assign(u.style,ft,{fontSize:"12px"});let x=document.createElement("input");x.type="text",Object.assign(x.style,zo);let b=document.createElement("div");b.className="js-ts-warning",b.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(b.style,Ro),d.appendChild(u),d.appendChild(x),d.appendChild(b),e.appendChild(o),e.appendChild(n),e.appendChild(d),a.onchange=()=>{d.style.display="none",Promise.resolve().then(()=>(Ve(),et)).then(N=>N.notesState.setTagSupportUsed(!0))},r.onchange=()=>{d.style.display="block",Promise.resolve().then(()=>(Ve(),et)).then(N=>N.notesState.setTagSupportUsed(!1))};function g(N,B){if(e.style.display="none",!N||!B||B.length===0)return;B.some(J=>J==="ads_conversion_tracking"||J==="ads_enhanced_conversions")?e.style.display="block":(v(),Promise.resolve().then(()=>(Ve(),et)).then(J=>J.notesState.setTagSupportUsed(!1)))}function m(){if(e.style.display==="none")return"";let N=`<br><b>Utilizou Tag Support?</b> ${a.checked?"\u2705 Sim":"\u274C N\xE3o"}`;return r.checked&&x.value.trim()!==""&&(N+=`<br><b>Motivo:</b> ${x.value}`),N+="<br>",N}function y(N){t=N,o.textContent=t("utilizou_tag_support"),u.textContent=t("motivo_ts"),b.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function v(){e.style.display="none",r.checked=!0,a.checked=!1,d.style.display="block",x.value=""}return{element:e,updateVisibility:g,getOutput:m,setLanguage:y,reset:v}}var vt="cw_notes_parking_lot",nt="cw_notes_emergency_save";var be={getAll:()=>{try{return JSON.parse(localStorage.getItem(vt)||"[]")}catch{return[]}},save:t=>{let e=be.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(vt,JSON.stringify(e)),o},delete:t=>{let e=be.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(vt,JSON.stringify(e)),e},getCount:()=>be.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(nt,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(nt);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(nt),null):e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(nt)}};var Po="https://script.google.com/a/macros/google.com/s/AKfycbzjrhTCoLg0SZq3TB5oD2uyWw3t6-wbjHHPXOKurgwxZcKDFcHV2eVZZa7bLPRLFRa8hg/exec",wt="cw_data_broadcast",Jt="cw_data_tips",Ho=["Processando...","Mantenha o foco!","Aguarde..."];function We(t,e={}){return new Promise((o,n)=>{let a="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[a]=l=>{document.body.contains(i)&&document.body.removeChild(i),delete window[a],o(l)};let s=Object.keys(e).map(l=>encodeURIComponent(l)+"="+encodeURIComponent(e[l])).join("&"),r=`${Po}?op=${t}&callback=${a}&t=${Date.now()}&${s}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[a],n(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var le={fetchTips:async()=>{try{let t=await We("tips");t?.tips&&localStorage.setItem(Jt,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await We("broadcast");if(t?.broadcast)return localStorage.setItem(wt,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(wt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(wt)||"[]"),getRandomTip:()=>{let t=Ho,e=localStorage.getItem(Jt);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await le._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await le._performOp("update_broadcast",o)},deleteBroadcast:async t=>await le._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`\u{1F4E4} Executando ${t}...`,e);let o=await We(t,e);return o&&o.status==="success"?(console.log("\u2705 Sucesso:",t),!0):(console.warn("\u26A0\uFE0F Falha:",o),!1)}catch(o){return console.error("\u274C Erro JSONP:",o),!1}},logEvent:(t,e,o="",n=null)=>{try{let a="anon";try{let s=Se();s&&(a=s.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:a,version:"v5.1",category:t,action:e,label:o,value:n||""};We("log",i).catch(s=>{})}catch(a){console.warn("Analytics error",a)}},logUsage:()=>{},getUserSnippets:async t=>{try{return await We("get_user_snippets",{user:t})}catch(e){return console.warn("Erro ao buscar snippets:",e),null}},saveSnippet:async(t,e)=>{let o={...t,user:e};return await le._performOp("save_snippet",o)},deleteSnippet:async(t,e)=>await le._performOp("delete_snippet",{id:t,user:e})};var at=["lucaste","ricardogi"];var ie={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},it=t=>new Promise(e=>setTimeout(e,t));function st(t){let e=document.getElementById("cw-btn-notes");if(!e)return;let o=e.querySelector(".cw-dot-dirty");t?o||(o=document.createElement("div"),o.className="cw-dot-dirty",e.appendChild(o)):o&&o.remove()}function Zt(t){let e="cw-command-center-style";if(!document.getElementById(e)){let m=document.createElement("style");m.id=e,m.innerHTML=`
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
    `;let a=document.createElement("div");a.className="cw-focus-backdrop",document.body.appendChild(a),document.body.appendChild(n);let i=(m,y)=>{G.playClick(),n.querySelector(`.${m}`).classList.toggle("active"),y()};if(n.querySelector(".notes").onclick=m=>{m.stopPropagation(),i("notes",t.toggleNotes)},n.querySelector(".email").onclick=m=>{m.stopPropagation(),i("email",t.toggleEmail)},n.querySelector(".script").onclick=m=>{m.stopPropagation(),i("script",t.toggleScript)},n.querySelector(".links").onclick=m=>{m.stopPropagation(),i("links",t.toggleLinks)},n.querySelector(".library").onclick=m=>{m.stopPropagation(),i("library",t.toggleLibrary)},n.querySelector(".timezone").onclick=m=>{m.stopPropagation(),i("timezone",t.toggleTimezone)},n.querySelector(".configs").onclick=m=>{m.stopPropagation(),i("configs",t.toggleConfigs)},n.querySelector(".broadcast").onclick=m=>{m.stopPropagation(),i("broadcast",()=>{let y=m.currentTarget.querySelector(".cw-badge");y&&y.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},n.querySelectorAll(".cw-btn").forEach(m=>{m.addEventListener("mouseenter",()=>G.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let m=document.createElement("div");m.className="cw-badge",n.querySelector(".broadcast").appendChild(m)}let s=null;n.onmouseleave=()=>{n.querySelector(".cw-btn.active")||n.classList.contains("processing-center")||(s=setTimeout(()=>{n.classList.add("collapsed")},3e3))},n.onmouseenter=()=>{s&&clearTimeout(s)},(async function(){let y=()=>{let N=Se();if(N){let B=N.split("@")[0].toLowerCase();if(at.includes(B)){let $=n.querySelector("#cw-admin-tag");$&&$.classList.add("visible")}}else setTimeout(y,2e3)};y(),await it(2800),n.classList.add("docked"),await it(300);let v=n.querySelectorAll(".cw-btn");n.querySelectorAll(".cw-sep").forEach(N=>N.classList.add("visible"));for(let N=0;N<v.length;N++)v[N].classList.add("popped"),await it(90);await it(200),n.classList.add("system-check")})();let r=!1,l,p,d,u,x=3;n.onmousedown=m=>{if(m.target.closest("button"))return;m.preventDefault(),l=m.clientX,p=m.clientY;let y=n.getBoundingClientRect();d=y.left,u=y.top,document.addEventListener("mousemove",b),document.addEventListener("mouseup",g)};function b(m){let y=m.clientX-l,v=m.clientY-p;!r&&Math.sqrt(y*y+v*v)>x&&(r=!0,n.classList.add("dragging"),n.style.transition="none",s&&clearTimeout(s)),r&&(n.style.left=`${d+y}px`,n.style.top=`${u+v}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function g(m){if(document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",g),r){r=!1,n.classList.remove("dragging");let y=window.innerWidth,v=window.innerHeight,N=n.getBoundingClientRect(),B=N.left+N.width/2,$;B<y/2?($=24,n.classList.remove("side-right"),n.classList.add("side-left")):($=y-N.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let J=Math.max(24,Math.min(N.top,v-N.height-24));setTimeout(()=>{n.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),n.style.left=`${$}px`,n.style.top=`${J}px`,n.style.bottom="auto",n.style.transform=""},10),setTimeout(()=>{n.style.transition="",n.style.removeProperty("transition")},700)}else{let y=n.querySelector(".cw-btn.active"),v=m.target.closest("button");if(n.classList.contains("collapsed")){let N=n.getBoundingClientRect(),B=window.innerHeight,$=N.top>B/2;if(n.style.setProperty("transition","none","important"),$){let J=B-N.bottom;n.style.top="auto",n.style.bottom=`${J}px`}else n.style.bottom="auto",n.style.top=`${N.top}px`;n.offsetWidth,n.style.removeProperty("transition"),n.classList.remove("collapsed"),G.playGenieOpen()}else!y&&!v&&(n.classList.add("collapsed"),G.playGenieOpen());v&&(v.style.transform="scale(0.9)",setTimeout(()=>v.style.transform="",150))}}}function Ye(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${le.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,K("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(n),t.appendChild(o);let a=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let s=Date.now()-a,r=Math.max(0,2e3-s);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let l=o.querySelector(".cw-center-dots"),p=o.querySelector(".cw-center-text"),d=o.querySelector(".cw-center-success"),u=o.querySelector(".cw-abort-btn");l&&(l.style.display="none"),p&&(p.style.display="none"),u&&(u.style.display="none"),d&&d.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},r)}}function Qt(t){let{onSaveCurrent:e,onLoadDraft:o,t:n}=t,a=document.createElement("button");a.className="js-btn-park",a.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${n("guardar")}</span>
    `,a.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${de.pill};
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
        box-shadow: ${De.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,a.onmouseenter=()=>{a.style.backgroundColor="#F8F9FA",a.style.borderColor="#202124",a.style.color="#202124",a.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",a.style.transform="translateY(-1px)"},a.onmouseleave=()=>{a.style.backgroundColor="#FFFFFF",a.style.borderColor="#DADCE0",a.style.color="#5F6368",a.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",a.style.transform="translateY(0)"},a.onmousedown=()=>a.style.transform="scale(0.96)",a.onmouseup=()=>a.style.transform="scale(1) translateY(-1px)",a.onclick=async()=>{if(await fe("Deseja guardar o rascunho atual e limpar os campos?"))try{let m=await e();m?(be.save(m),b(),r(),G.playSuccess(),K("Rascunho salvo com sucesso!")):K("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(m){console.error("Erro ao salvar rascunho:",m),K("Erro ao salvar.",{error:!0})}};let i=document.createElement("div");i.title="Meus Rascunhos",i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let s=document.createElement("div");s.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(s),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=g=>{g.stopPropagation(),x()};function r(){let g=be.getCount();st(g>0),g>0?(s.style.display="block",s.textContent=g,s.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):s.style.display="none"}let l=document.createElement("div");l.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${D.surface}; z-index: 100;
        border-radius: ${de.large} ${de.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${se};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let p=document.createElement("div");p.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",p.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${n("rascunhos_salvos")}</span>`;let d=document.createElement("button");d.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',d.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",d.onmouseenter=()=>d.style.background="#F1F3F4",d.onmouseleave=()=>d.style.background="transparent",d.onclick=()=>x(!1),p.appendChild(d);let u=document.createElement("div");u.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",l.appendChild(p),l.appendChild(u);function x(g){let m=l.style.transform==="translateY(0%)";(g!==void 0?g:!m)?(b(),l.style.transform="translateY(0%)"):l.style.transform="translateY(110%)"}function b(){let g=be.getAll();if(u.innerHTML="",g.length===0){u.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${D.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${n("nenhum_rascunho")}</div>
                </div>`;return}g.forEach(m=>{let y=document.createElement("div");y.style.cssText=`
                background: ${D.surface}; padding: 20px; border-radius: ${de.large};
                border: 1.5px solid ${D.bgInput}; box-shadow: ${De.subtle};
                position: relative; transition: all 0.3s ${se};
            `;let N=new Date(m.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),B="";m.summaryTags&&m.summaryTags.length>0&&(B=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${m.summaryTags.slice(0,3).join(", ")+(m.summaryTags.length>3?"...":"")}</div>`),y.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${m.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${N}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${m.cid||"---"}</span>
                    <span style="display:block; color:${m.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${m.subStatus||m.status||"Sem Status"}</span>
                    ${B}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let $=y.querySelector(".cw-resume-btn");$.onclick=async()=>{await fe("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(m),be.delete(m.id),b(),r(),x(!1),G.playSwoosh(),K("Rascunho carregado."))};let J=y.querySelector(".cw-del-btn");J.onclick=async()=>{await fe("Excluir este rascunho?",{danger:!0})&&(be.delete(m.id),b(),r())},u.appendChild(y)})}return r(),{parkButton:a,historyBtnWrapper:i,drawer:l}}var eo=t=>new Promise(e=>setTimeout(e,t));function rt(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function Xe(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let n=window.getSelection();n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")}catch{K("Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(e)}function lt(t){["input","change","keydown","keyup"].forEach(o=>{let n=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(n)})}function to(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function ct(){console.log("Iniciando processo de Nova Nota...");let t=to(),e=t.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(s=>s.innerText.trim()==="description");if(n){let s=n.closest("material-fab")||n.closest("material-button");s?(s.style&&(s.style.display="block",s.style.visibility="visible"),rt(s)):rt(n)}else{let s=document.querySelector("material-fab-speed-dial");if(s){let r=s.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),rt(r)):s.click(),await eo(800);let p=Array.from(document.querySelectorAll("i.material-icons-extended")).find(d=>d.innerText.trim()==="description");p&&rt(p)}}let a=null,i=0;for(;!a&&i<20;){await eo(300);let s=to();if(s.length>e)a=s.find(r=>!t.includes(r)),a||(a=s[s.length-1]);else if(i>10){let r=s.filter(l=>l.offsetParent!==null);r.length>0&&(a=r[r.length-1])}i++}return a}function oo(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let n=document.createElement("div");n.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(n),e.appendChild(o),o.addEventListener("scroll",()=>{n.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let a={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function s({id:B,label:$,type:J="text",placeholder:X="",required:I=!1,parent:T=o}){let V=document.createElement("div");V.style.cssText=a.inputWrapper;let z=document.createElement("label");z.style.cssText=a.label,z.innerHTML=`${$} ${I?'<span style="color:#D93025">*</span>':""}`;let q;return J==="textarea"?(q=document.createElement("textarea"),q.style.cssText=a.input+a.textarea):(q=document.createElement("input"),q.type=J,q.style.cssText=a.input),q.id=B,q.placeholder=X,q.addEventListener("focus",()=>{q.style.borderColor="#1a73e8",q.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),q.addEventListener("blur",()=>{q.style.borderColor="#DADCE0",q.style.boxShadow="none",I&&q.value.trim()!==""&&(q.style.backgroundColor="#FFF")}),i[B]={input:q,wrapper:V,required:I},V.appendChild(z),V.appendChild(q),T.appendChild(V),V}function r({id:B,label:$,options:J=["Yes","No"],defaultValue:X="No",onChange:I=null}){let T=document.createElement("div");T.style.cssText=a.inputWrapper;let V=document.createElement("label");V.style.cssText=a.label,V.textContent=$,T.appendChild(V);let z=document.createElement("div");z.style.cssText=a.radioGroup;let q=document.createElement("input");return q.type="hidden",q.id=B,q.value=X,T.appendChild(q),J.forEach(A=>{let S=document.createElement("div");S.textContent=A,S.style.cssText=a.radioLabel,A===X&&(S.style.cssText+=a.radioActive),S.onclick=()=>{Array.from(z.children).forEach(f=>f.style.cssText=a.radioLabel),S.style.cssText+=a.radioActive,q.value=A,I&&I(A)},z.appendChild(S)}),i[B]={input:q,wrapper:T,required:!1},T.appendChild(z),o.appendChild(T),T}let l=document.createElement("div");l.style.cssText=a.banner,l.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(l);let p=document.createElement("div");p.style.marginBottom="24px";let d=document.createElement("button");d.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",d.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",d.onmouseover=()=>d.style.background="#E1EFFF",d.onmouseout=()=>d.style.background="#F0F7FF",p.appendChild(d),o.appendChild(p);let u=document.createElement("div");u.style.cssText=a.section,u.innerHTML=`<div style="${a.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(u),s({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:u}),s({id:"ga4",label:"GA4 Property ID",parent:u}),s({id:"gtm",label:"GTM Container ID",parent:u});let x=document.createElement("div");x.style.cssText=a.hiddenField,u.appendChild(x),r({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:B=>{B==="Yes"?x.style.cssText=a.visibleField+"margin-bottom:14px;":(x.style.cssText=a.hiddenField,i.accessEmail.input.value="")}}),s({id:"accessEmail",label:"User Access Email",parent:x}),r({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let b=document.createElement("div");b.style.cssText=a.section,b.innerHTML=`<div style="${a.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(b),s({id:"name",label:"Advertiser Name",required:!0,parent:b}),s({id:"url",label:"Website URL",parent:b}),s({id:"phone",label:"Phone Number",parent:b}),s({id:"email",label:"Contact Email",parent:b}),s({id:"callback",label:"Preferred Callback Time (Timezone)",parent:b}),s({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:b}),s({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:b}),s({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:b});let g=document.createElement("div");g.style.cssText=a.section,g.innerHTML=`<div style="${a.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(g),s({id:"cc_adv",label:"Advertiser Contact",parent:g}),s({id:"cc_am",label:"Account Manager",parent:g});let m=document.createElement("div");m.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let y=document.createElement("button");y.innerHTML="Voltar",y.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",y.onclick=t;let v=document.createElement("button");v.textContent="Gerar Nota",v.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",m.appendChild(y),m.appendChild(v),e.appendChild(m),d.onclick=async()=>{let B=d.innerHTML;d.innerHTML="\u23F3 Buscando dados...";try{let $=await Ce(),J=0,X=(V,z)=>{let q=i[V];z&&q&&q.input.value===""&&(q.input.value=z,q.input.style.backgroundColor="#E6F4EA",q.input.style.borderColor="#34A853",setTimeout(()=>{q.input.style.backgroundColor="#FFF",q.input.style.borderColor="#DADCE0"},1e3),J++)};X("name",$.advertiserName),X("url",$.websiteUrl),$.clientEmail&&(X("email",$.clientEmail),X("cc_adv",$.clientEmail));let T=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);T&&X("cid",T[0]),J>0?K(`${J} campos preenchidos!`):K("Nenhum dado novo encontrado.")}catch($){console.error($),K("Erro ao ler p\xE1gina.")}finally{d.innerHTML=B}};let N=()=>{let B=!0,$=null;return Object.values(i).forEach(J=>{J.required&&!J.input.value.trim()&&(B=!1,J.input.style.cssText+=a.inputError,J.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),$||($=J.input))}),$&&$.scrollIntoView({behavior:"smooth",block:"center"}),B};return v.onclick=async()=>{if(!N()){K("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let B=V=>i[V].input.value||"N/A",$=B("hasAccess"),J=$==="Yes"?B("accessEmail"):"N/A",I=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${B("cid")}
<b>GA4 ID:</b> ${B("ga4")}
<b>GTM ID:</b> ${B("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${$==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${J}
<b>Ghosting Access Available (Y/N):</b> ${B("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${B("name")}
<b>Website:</b> ${B("url")}
<b>Phone Number:</b> ${B("phone")}
<b>Preferred Callback:</b> ${B("callback")}
<b>Email Address:</b> ${B("email")}

<b>Detailed Issue Description:</b>
${B("desc")}

<b>Uncropped screenshots:</b>
${B("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${B("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${B("cc_adv")}
<b>Account Manager:</b> ${B("cc_am")}
`.replace(/\n/g,"<br>");Xe(I);let T=await ct();T?(T.innerText.trim()===""&&(T.innerHTML=""),document.execCommand("insertHTML",!1,I),lt(T),K("Nota gerada e inserida!")):K("Copiado! Abra uma nota para colar.")},e}var me=t=>new Promise(e=>setTimeout(e,t));function ye(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function ke(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function dt(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,n=document.getElementById(o);n&&n.remove();let a=t.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
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
    `;let s=i.querySelector(".cw-close-btn");s.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&s.click()},25e3)}async function pt(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await me(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await me(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function St(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let n=o.offsetParent!==null,a=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return n&&!a&&i});return e&&ye("Editor visualmente detectado.","success"),e}async function no(){ye("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="email");if(o&&o.offsetParent!==null){ye("Bot\xE3o de email direto encontrado.");let u=o.closest("material-button")||o.closest("material-fab")||o;ke(u),t=!0}else{ye("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let u=document.querySelector("material-fab-speed-dial");if(u){let x=u.querySelector(".trigger");if(x){ke(x),await me(800);let g=Array.from(document.querySelectorAll("i.material-icons-extended")).find(m=>m.innerText.trim()==="email");g&&(ke(g),t=!0)}}}if(!t)return K("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ye("\u{1F680} FASE 2: Verificando rascunhos...");let n=null,a=0,i=20;for(;a<i;){await me(250);let u=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(n=Array.from(u).find(x=>x.offsetParent!==null),n){ye("\u26A0\uFE0F Rascunho detectado!","warn");break}a++}if(n){ye("\u{1F5D1}\uFE0F Descartando..."),ke(n),n.click();let u=null,x=0;for(;x<15;){await me(300);let b=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(u=Array.from(b).find(g=>g.offsetParent!==null),u)break;x++}u&&(ke(u),K("Limpando rascunho antigo...",{duration:2e3}),await me(2500))}ye("\u{1F680} FASE 3: Buscando editor final...");let s=0,r=null;for(;s<20&&(r=St(),!r);)await me(250),s++;if(!r)return K("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let l=r.closest('[id="email-body-content-top"]'),d=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(l){if(d){let x=d.closest('[aria-hidden="true"]');x&&x.removeAttribute("aria-hidden"),d.focus(),ke(d)}await me(300),l.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let u=l.querySelector("#cases-body-field");if(u){let x=document.createRange();x.selectNodeContents(u),x.collapse(!0);let b=window.getSelection();b.removeAllRanges(),b.addRange(x)}return!0}return!1}async function ut(t){if(!t||!await no())return;let o=await Ce();ye("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await me(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await pt(i,o.clientEmail),dt(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await pt(i,o.internalEmail),dt(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await me(500);let a=document.querySelector('material-button[debug-id="canned_response_button"]');if(a){ke(a),await me(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){ke(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),ye("\u23F3 Buscando resultado da Canned Response...","info");let s=null,r=0,l=15e3,p=500;for(;r<l&&(s=document.querySelector("material-select-dropdown-item"),!s);)await me(p),r+=p;if(s){ke(s),await me(1500);let d=St();if(d){let x=Array.from(d.querySelectorAll("span.field")).filter(g=>g.innerText.includes("{Requested Task Type}"));if(x.length>0){let g=x.map(y=>y.closest("tr")).filter(y=>y!==null),m=[...new Set(g)];if(m.length>0){let v=m[0].querySelector('td[width="100%"]');v&&(v.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let N=1;N<m.length;N++)m[N].remove()}}let b=d.innerHTML;o.advertiserName&&b.includes("{%ADVERTISER_NAME%}")&&(b=b.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),b.includes("{%^79285%}")&&(b=b.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),d.innerHTML=b}K("Canned Response aplicada!")}else ye(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),K(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else K("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function ao(t){if(ye(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await no())return;let o=await Ce(),n=$e();await me(600);let a=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(a&&(a.click(),await me(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await pt(r,o.clientEmail),dt(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await pt(r,o.internalEmail),dt(r,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await me(300));let s=St();if(s){let l=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');l&&(l.focus(),ke(l));let p=new Date;p.setDate(p.getDate()+3);let d=p.getDay();d===6?p.setDate(p.getDate()+2):d===0&&p.setDate(p.getDate()+1);let u=p.toLocaleDateString("pt-BR"),x=t.body;x=x.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),x=x.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),x=x.replace(/\[URL\]/g,o.websiteUrl||"seu site"),x=x.replace(/\[Seu Nome\]/g,n),x=x.replace(/\[MM\/DD\/YYYY\]/g,u),document.execCommand("insertHTML",!1,x),l&&(l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),K("Email preenchido com sucesso!",{duration:2e3}),ye("\u2705 Processo finalizado com sucesso.","success")}else K("Erro ao focar no editor.",{error:!0})}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function ge(t,e,o){let n=document.getElementById(o);if(!e)return;let a=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(n){let d=n.getBoundingClientRect();i.x=d.left+d.width/2,i.y=d.top+d.height/2}let s,r;if(!a)s=window.innerWidth/2,r=window.innerHeight/2;else{let d=e.getBoundingClientRect();s=d.left+d.width/2,r=d.top+d.height/2,s===0&&r===0&&(s=window.innerWidth/2,r=window.innerHeight/2)}let l=i.x-s,p=i.y-r;t?(G.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",a?e.style.transform=`translate(${l}px, ${p}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${l}px), calc(-50% + ${p}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),n&&n.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",a?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof io=="function"&&io(e,o)):(G.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",a?e.style.transform=`translate(${l}px, ${p}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${l}px), calc(-50% + ${p}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),n&&n.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof Ct=="function"&&Ct(e))}function io(t,e){Ct(t);let o=n=>{if(!t.classList.contains("open"))return;let a=t.contains(n.target),i=document.querySelector(".cw-pill"),s=i&&i.contains(n.target);a?(t.classList.remove("idle"),t.style.zIndex="2147483648"):s||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function Ct(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function so(){let t="v4.0.0",{popup:e,content:o,header:n,animRefs:a,credit:i}=jt(t,X),s=Kt(h),r=Xt(()=>{A(),P.setActiveTasks(r.getCheckedElements())},h,P),l=document.createElement("div");l.style.display="none";let p=Yt((c,k)=>{S(c,k)});l.appendChild(p);let d=Qt({onSaveCurrent:async()=>{let c=await _();return E(),c},onLoadDraft:c=>{U(c)},t:c=>h(c)}),u=T(),x=V(),b=document.createElement("div"),g=L(),m=F(d,h);o.appendChild(u),o.appendChild(x),o.appendChild(g),o.appendChild(l),o.appendChild(b),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none";let y=document.createElement("button");y.id="manual-task-toggle",y.textContent=h("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",y.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${D.primary}; background: ${D.surface}; color: ${D.primary}; border-radius: ${de.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${se}; text-transform: uppercase; letter-spacing: 0.5px;`,y.onmouseenter=()=>{y.style.background=D.primaryBg},y.onmouseleave=()=>{y.style.background=D.surface},y.onclick=()=>{r.selectionElement.style.display="block",r.screenshotsElement.style.display="block",y.style.display="none"},o.appendChild(y),o.appendChild(r.selectionElement),o.appendChild(s.element),o.appendChild(r.screenshotsElement),o.appendChild(m);let v=document.createElement("div");v.style.display="none",v.style.flexGrow="1",v.style.minHeight="0",v.style.overflow="hidden";let N=oo(()=>I());N.style.height="100%",v.appendChild(N),e.insertBefore(v,i);let B=n.lastElementChild;B&&(B.insertBefore(d.historyBtnWrapper,B.firstChild),B.insertBefore(H(),B.firstChild)),e.appendChild(d.drawer);let $=null;P.subscribe(c=>{M(c),J(),c.isDirty&&($&&clearTimeout($),$=setTimeout(async()=>{let k=await _(!0);be.saveEmergency(k),c.isDirty=!1},2e3))});function J(){let c=be.getCount()>0,k=!!P.currentSubStatus;st(c||k)}function X(){P.visible=!P.visible,ge(P.visible,e,"cw-btn-notes")}function I(){P.isSplitView=!P.isSplitView,P.isSplitView?(o.style.display="none",v.style.display="flex",v.style.flexDirection="column",a.googleLine&&(a.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",v.style.display="none",a.googleLine&&(a.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function T(){let c=document.createElement("div");if(c.innerHTML=`
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
        `,!document.getElementById("cw-segmented-styles")){let w=document.createElement("style");w.id="cw-segmented-styles",w.innerHTML=`
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
            `,document.head.appendChild(w)}let k=(w,W)=>{let Z=c.querySelector(`#${w}`).querySelector(".cw-segmented-indicator");Z&&(Z.style.transform=`translateX(${W*100}%) translateX(${W*2}px)`)};return c.querySelectorAll("#lang-selector button").forEach((w,W)=>{w.onclick=()=>{P.setLanguage(w.dataset.lang),c.querySelectorAll("#lang-selector button").forEach(Y=>Y.classList.remove("active")),w.classList.add("active"),k("lang-selector",W),G.playHover(),P.currentSubStatus&&q(P.currentSubStatus)}}),c.querySelectorAll("#type-selector button").forEach((w,W)=>{w.onclick=()=>{P.setCaseType(w.dataset.type),c.querySelectorAll("#type-selector button").forEach(Y=>Y.classList.remove("active")),w.classList.add("active"),k("type-selector",W),G.playHover(),P.currentSubStatus&&q(P.currentSubStatus)}}),c.querySelectorAll("#portugal-selector button").forEach((w,W)=>{w.onclick=()=>{P.setPortugalCase(w.dataset.val==="true"),c.querySelectorAll("#portugal-selector button").forEach(Y=>Y.classList.remove("active")),w.classList.add("active"),k("portugal-selector",W),G.playHover(),P.currentSubStatus&&q(P.currentSubStatus)}}),c}function V(){let c=document.createElement("div");c.className="cw-status-section",c.style.cssText="display: flex; flex-direction: column; gap: 8px;",c.innerHTML=`
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
        `;let k=c.querySelector("#main-status-select"),w=c.querySelector("#sub-status-select");return k.onchange=()=>{P.setStatus(k.value),z(k.value,w),P.setSubStatus(""),q("")},w.onchange=()=>{P.setSubStatus(w.value),q(w.value)},c}function z(c,k){if(k.innerHTML=`<option value="">${h("select_substatus")}</option>`,!c){k.disabled=!0;return}for(let w in Te)if(Te[w].status===c){let W=document.createElement("option");W.value=w,W.textContent=Te[w].name,k.appendChild(W)}k.disabled=!1}function q(c){if(p.render&&p.render(c,P.currentCaseType),!c){l.style.display="none",b.style.display="none",document.getElementById("manual-task-toggle").style.display="none",r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",g.style.display="flex",g.style.opacity="1",m.style.display="none";return}g.style.opacity="0",setTimeout(()=>{P.currentSubStatus&&(g.style.display="none")},400),m.style.display="grid";let k=Te[c];k&&k.templateFields&&P.setActiveFields(k.templateFields),O(),ht(c,b,P),b.style.display="block",l.style.display="block";let w=c.startsWith("SO_"),W=c==="NI_Awaiting_Validation",Y=document.getElementById("manual-task-toggle");w||W?(r.selectionElement.style.display="block",Y.style.display="none"):(r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",Y.style.display="block");let Z=c==="SO_Education_Only"?"education":"implementation";P.setScreenshotMode(Z),P.currentCaseType==="lm"?P.toggleFieldExclusion("field-ON_CALL",!0):P.toggleFieldExclusion("field-ON_CALL",!1),r.updateSubStatus(c),A();let j=document.getElementById("email-automation-toggle-row");j&&(j.style.display=Pe[c]?"flex":"none")}function A(){let c=r.getCheckedElements().map(k=>k.value);s.updateVisibility(P.currentSubStatus,c)}function S(c,k){let w=ot[c];if(w){for(let W in w)if(W==="linkedTask")r.toggleTask(w.linkedTask,k);else if(W==="activeTasks")w.activeTasks.forEach(Y=>{k?r.setTaskCount(Y.value,Y.count):r.setTaskCount(Y.value,0)});else if(W.startsWith("field-")){let Y=W,Z=w[W],j=document.getElementById(Y);if(j){let ee=He.includes(Y.replace("field-",""));if(k)if(ee){let te=j.value.trim();te.includes(Z.trim())||(j.value=te?te+`
`+Z.trim():Z.trim())}else j.value=Z;else if(ee){let te=j.value.trim(),Q=Z.trim();te.includes(Q)&&(j.value=te.replace(Q,"").trim().replace(/\n{3,}/g,`

`))}else j.value.trim()===Z.trim()&&(j.value="");P.updateField(Y,j.value),j.dispatchEvent(new Event("input"))}}}}function F(c,k){let w=document.createElement("div");if(w.className="cw-actions-section",w.style.cssText=`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${D.bgInput};
            border-radius: 12px;
            border: 1px solid ${D.border};
        `,!document.getElementById("cw-actions-hover-styles")){let te=document.createElement("style");te.id="cw-actions-hover-styles",te.innerHTML=`
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
            `,document.head.appendChild(te)}let W=document.createElement("div");W.id="email-automation-toggle-row",W.style.cssText="grid-column: span 2; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",W.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${D.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${D.primary};">
                <span class="js-label-email-toggle">${k("preencher_email_automaticamente")}</span>
            </label>
        `;let Y=c.parkButton;Y.classList.add("js-btn-park"),Y.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let Z=document.createElement("button");Z.className="cw-btn-secondary js-btn-reset",Z.textContent=k("limpar"),Z.style.cssText=`width: 100%; height: 34px; background: ${D.surface}; color: ${D.textSub}; border: 1px solid ${D.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,Z.onclick=()=>E();let j=document.createElement("button");j.className="cw-btn-secondary js-btn-copy",j.textContent=k("copiar"),j.style.cssText=`width: 100%; height: 34px; background: ${D.surface}; color: ${D.primary}; border: 1px solid ${D.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,j.onclick=()=>f();let ee=document.createElement("button");return ee.className="cw-btn-primary js-btn-generate",ee.textContent=k("preencher"),ee.style.cssText=`width: 100%; height: 38px; background: ${D.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: span 2; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,ee.onclick=()=>C(),w.appendChild(W),w.appendChild(Y),w.appendChild(Z),w.appendChild(j),w.appendChild(ee),w}async function f(){if(!P.currentSubStatus){K(h("select_substatus"),{error:!0});return}let c=yt(P,r,s);c?(Xe(c),K(h("copiado_sucesso")),G.playClick()):K(h("select_substatus"),{error:!0})}async function C(){if(!P.currentSubStatus){K(h("select_substatus"),{error:!0});return}let c=yt(P,r,s);Xe(c),X();let k=Ye(),w=await ct();if(w){w.focus(),document.execCommand("insertHTML",!1,c),lt(w);let W=document.getElementById("email-automation-checkbox");(!W||W.checked)&&P.currentSubStatus&&Pe[P.currentSubStatus]&&await ut(Pe[P.currentSubStatus]),K(h("inserido_copiado")),G.playSuccess(),E()}k()}function O(){if(P.currentSubStatus){if(P.currentCaseType==="lm")P.removeField("ON_CALL");else{let c=Te[P.currentSubStatus];c&&c.templateFields.includes("ON_CALL")&&P.addFieldAt("ON_CALL",1)}P.isPortugalCase?(P.addFieldAt("CASO_PORTUGAL",1),P.addFieldAt("CONSENTIU_GRAVACAO",2)):(P.removeField("CASO_PORTUGAL"),P.removeField("CONSENTIU_GRAVACAO"))}}function E(){P.reset(),r.reset(),s.reset(),J(),o.querySelectorAll("select").forEach(k=>k.value=""),o.querySelector("#sub-status-select").disabled=!0;let c=document.getElementById("email-automation-toggle-row");c&&(c.style.display="none"),b.innerHTML="",l.style.display="none",g.style.display="flex",g.style.opacity="1",m.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none"}async function _(c=!1){let k={};b.querySelectorAll("input, textarea, select").forEach(j=>{(j.id.startsWith("field-")||j.id==="consent-select")&&(k[j.id]=j.value)});let w="Cliente",W="---";if(!c)try{let j=await Ce();w=j.advertiserName,W=j.cid}catch(j){console.warn("Erro ao coletar pageData:",j)}let Y=r.getCheckedElements().map(j=>({key:j.value,count:j.count})),Z=Y.map(j=>{let ee=we[j.key];return ee?ee.name:j.key});return{currentCaseType:P.currentCaseType,currentLang:P.currentLang,isPortugalCase:P.isPortugalCase,consent:P.consent,tagSupportUsed:P.tagSupportUsed,forcedScreenshots:[...P.forcedScreenshots],excludedFields:[...P.excludedFields],activeFields:P.activeFields,status:P.currentStatus,subStatus:P.currentSubStatus,formData:k,activeTasks:Y,summaryTags:Z,clientName:w,cid:W,timestamp:new Date().toISOString()}}let R=c=>new Promise(k=>setTimeout(k,c));async function U(c){P.setLanguage(c.currentLang||"pt"),P.setCaseType(c.currentCaseType||"bau"),P.setPortugalCase(c.isPortugalCase||!1),P.setConsent(c.consent||!1),P.setExcludedFields(c.excludedFields||[]),c.activeFields&&P.setActiveFields(c.activeFields);let k=o.querySelector(`#lang-selector button[data-lang="${P.currentLang}"]`);k&&k.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach(Y=>{Y!==k&&Y.classList.remove("active")});let w=o.querySelector(`#type-selector button[data-type="${P.currentCaseType}"]`);w&&w.classList.add("active"),o.querySelectorAll("#type-selector button").forEach(Y=>{Y!==w&&Y.classList.remove("active")});let W=o.querySelector(`#portugal-selector button[data-val="${P.isPortugalCase}"]`);if(W&&W.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach(Y=>{Y!==W&&Y.classList.remove("active")}),c.status){let Y=o.querySelector("#main-status-select");Y.value=c.status,P.setStatus(c.status);let Z=o.querySelector("#sub-status-select");if(z(c.status,Z),await R(50),c.subStatus){if(Z.value=c.subStatus,P.setSubStatus(c.subStatus),q(c.subStatus),await R(100),c.tagSupportUsed!==void 0){P.setTagSupportUsed(c.tagSupportUsed);let j=s.element.querySelector('input[value="Sim"]'),ee=s.element.querySelector('input[value="N\xE3o"]');c.tagSupportUsed&&j?j.checked=!0:ee&&(ee.checked=!0),s.element.querySelector("div:last-child").style.display=c.tagSupportUsed?"none":"block"}c.forcedScreenshots&&P.setForcedScreenshots(c.forcedScreenshots);for(let j in c.formData){let ee=document.getElementById(j);ee&&(ee.value=c.formData[j],P.updateField(j,ee.value))}c.activeTasks&&(c.activeTasks.forEach(j=>r.setTaskCount(j.key,j.count)),P.setActiveTasks(r.getCheckedElements()))}}P.isDirty=!1}function h(c){return ve[P.currentLang]?.[c]||ve.pt?.[c]||c}function H(){let c=document.createElement("div");return c.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',c.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",c.onclick=k=>{k.stopPropagation(),I()},c.title="Alternar para Split & Transfer",c}function L(){let c=document.createElement("div");return c.id="notes-empty-state",c.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${se};
        `,c.innerHTML=`
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
                    ${h("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${D.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${h("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,c}function M(c){let k=o.querySelector(".js-label-idioma");k&&(k.textContent=h("idioma"));let w=o.querySelector(".js-label-fluxo");w&&(w.textContent=h("fluxo"));let W=o.querySelector(".js-label-portugal");W&&(W.textContent=h("caso_portugal"));let Y=o.querySelector(".js-label-status");Y&&(Y.textContent=h("status_principal"));let Z=o.querySelector(".js-label-substatus");Z&&(Z.textContent=h("substatus"));let j=o.querySelector(".js-btn-copy");j&&(j.textContent=h("copiar"));let ee=o.querySelector(".js-btn-generate");ee&&(ee.textContent=h("preencher"));let te=o.querySelector(".js-btn-reset");te&&(te.textContent=h("limpar"));let Q=document.getElementById("manual-task-toggle");Q&&(Q.textContent=h("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let ne=o.querySelector(".js-btn-park span");ne&&(ne.textContent=h("guardar"));let ae=e.querySelector(".js-drawer-title");ae&&(ae.textContent=h("rascunhos_salvos"));let he=o.querySelector(".js-label-email-toggle");he&&(he.textContent=h("preencher_email_automaticamente")),s&&s.setLanguage&&s.setLanguage(h),r&&r.setLanguage&&r.setLanguage(h)}return g.style.display="flex",m.style.display="none",P.setLanguage("pt"),P.setCaseType("bau"),J(),setTimeout(async()=>{let c=be.getEmergency();c&&(await fe("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?(U(c),K("Sess\xE3o restaurada!")):be.clearEmergency())},3e3),document.body.appendChild(e),X}var ro=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}];var lo={_templates:null,async getTemplates(){return this._templates?this._templates:(this._templates=ro,this._templates)}};var co="cw_personal_library_v1",je=!1,xe={getSnippets:(t="all")=>{let e=xe._loadFromLocal(),o=Se();return o&&o.includes("@")&&!je&&xe._syncWithServer(o),t==="all"?e:e.filter(n=>n.type===t)},save:async t=>{let e=Se();if(!e)return K("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;je=!0;let o=xe._loadFromLocal(),n=new Date().toISOString(),a={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:n},i=o.filter(s=>s.id!==a.id);return i.unshift(a),xe._saveToLocal(i),le.saveSnippet(a,e).then(s=>{s?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais."),setTimeout(()=>{je=!1},2e3)}),a},delete:async t=>{let e=Se();je=!0;let n=xe._loadFromLocal().filter(a=>a.id!==t);return xe._saveToLocal(n),e?le.deleteSnippet(t,e).then(()=>{setTimeout(()=>{je=!1},2e3)}):je=!1,!0},_syncWithServer:async t=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let e=await le.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,n=xe._loadFromLocal(),a=JSON.stringify(o),i=JSON.stringify(n);a!==i&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),xe._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(co)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem(co,JSON.stringify(t))}};function po(){let t="v6.0.0",e=!1,o=[],n=null,a="",i="Todos",s=new Set,r={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"},l=document.createElement("div");l.id="email-assistant-popup",l.classList.add("cw-module-window");let p=document.createElement("style");p.textContent=`
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
    `,document.head.appendChild(p),Object.assign(l.style,pe,{width:"850px",height:"650px",display:"none",flexDirection:"column",fontFamily:"'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",borderRadius:"12px",overflow:"hidden"});let d=ue(l,"Email Assistant",t,"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",{popup:l},()=>S()),u=document.createElement("div");Object.assign(u.style,{display:"flex",flex:"1",overflow:"hidden",backgroundColor:r.bgApp});let x=document.createElement("div");Object.assign(x.style,{width:"320px",backgroundColor:"#EFEFF0",borderRight:`1px solid ${r.borderSubtle}`,display:"flex",flexDirection:"column",flexShrink:"0"});let b=document.createElement("div");Object.assign(b.style,{padding:"16px",borderBottom:`1px solid ${r.borderSubtle}`,position:"relative"});let g=document.createElement("input");g.placeholder="Buscar templates...",Object.assign(g.style,{width:"100%",padding:"10px 14px 10px 36px",borderRadius:"10px",border:"1.5px solid transparent",backgroundColor:"#E3E3E8",fontSize:"15px",outline:"none",boxSizing:"border-box",color:r.textPrimary,backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",transition:"all 0.2s ease-in-out"}),g.onfocus=()=>{g.style.backgroundColor="#FFFFFF",g.style.borderColor=r.primary,g.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)",g.style.transform="scale(1.02)"},g.onblur=()=>{g.style.backgroundColor="#E3E3E8",g.style.borderColor="transparent",g.style.boxShadow="none",g.style.transform="scale(1)"};let m=document.createElement("div");m.id="email-template-list",Object.assign(m.style,{flex:"1",overflowY:"auto",padding:"8px",scrollBehavior:"smooth"});let y=document.createElement("div");y.innerHTML="\u2715",Object.assign(y.style,{position:"absolute",right:"26px",top:"50%",transform:"translateY(-50%)",fontSize:"10px",color:"#fff",cursor:"pointer",display:"none",backgroundColor:"#C7C7CC",width:"16px",height:"16px",borderRadius:"50%",textAlign:"center",lineHeight:"16px",fontWeight:"bold"}),y.onclick=()=>{g.value="",a="",y.style.display="none",f(),g.focus()},b.appendChild(g),b.appendChild(y),x.appendChild(b),x.appendChild(m);let v=document.createElement("div");Object.assign(v.style,{flex:"1",display:"flex",flexDirection:"column",overflow:"hidden",backgroundColor:r.bgApp,transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"});let N=document.createElement("div");Object.assign(N.style,{padding:"20px",borderBottom:`1px solid ${r.borderSubtle}`,backgroundColor:r.bgSurface,maxHeight:"250px",overflowY:"auto",display:"none"});let B=document.createElement("div");Object.assign(B.style,{flex:"1",display:"flex",flexDirection:"column",padding:"20px",backgroundColor:r.bgApp,overflow:"hidden"});let $=document.createElement("div");Object.assign($.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"});let J=document.createElement("span");J.textContent="Preview do E-mail",Object.assign(J.style,{fontSize:"12px",fontWeight:"600",color:r.textSecondary,textTransform:"uppercase",letterSpacing:"0.5px"});let X=document.createElement("div");Object.assign(X.style,{display:"flex",gap:"8px"});let I=(R,U=!1)=>{let h=document.createElement("button");return h.textContent=R,Object.assign(h.style,{padding:"8px 14px",borderRadius:"10px",border:U?"none":`1.5px solid ${r.primary}`,background:U?r.primary:"transparent",color:U?"#fff":r.primary,fontSize:"13px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 1, 0.5, 1)",boxShadow:U?"0 4px 12px rgba(0, 122, 255, 0.3)":"none"}),h.onmouseenter=()=>{U?(h.style.backgroundColor="#0062CC",h.style.transform="translateY(-1px)",h.style.boxShadow="0 6px 16px rgba(0, 122, 255, 0.4)"):h.style.backgroundColor="rgba(0, 122, 255, 0.05)"},h.onmouseleave=()=>{U?(h.style.backgroundColor=r.primary,h.style.transform="translateY(0)",h.style.boxShadow="0 4px 12px rgba(0, 122, 255, 0.3)"):(h.style.backgroundColor="transparent",h.style.transform="translateY(0)")},h.onmousedown=()=>h.style.transform="scale(0.94)",h.onmouseup=()=>h.style.transform="scale(1)",h},T=I("Copiar HTML"),V=I("Preencher no CRM",!0),z=I("Smart CR");z.style.borderColor="#E67E22",z.style.color="#E67E22",z.style.display="none",X.appendChild(z),X.appendChild(T),X.appendChild(V),$.appendChild(J),$.appendChild(X);let q=document.createElement("div");q.contentEditable="true",Object.assign(q.style,{flex:"1",backgroundColor:r.bgSurface,border:`1px solid ${r.borderSubtle}`,borderRadius:"8px",padding:"20px",fontSize:"15px",lineHeight:"1.6",color:r.textPrimary,overflowY:"auto",outline:"none",boxShadow:"inset 0 1px 2px rgba(0,0,0,0.02)"}),B.appendChild($),B.appendChild(q),_(),v.appendChild(N),v.appendChild(B),u.appendChild(x),u.appendChild(v),l.appendChild(d),l.appendChild(u);let A=document.createElement("div");Object.assign(A.style,Ae),l.appendChild(A),Ee(l,A),document.body.appendChild(l);function S(){e=!e,e?(l.style.display="flex",Rt(l),o.length===0&&F()):l.style.display="none",ge(e,l,"cw-btn-email")}async function F(){m.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',o=await lo.getTemplates(),f()}function f(){m.innerHTML="";let R=o.filter(M=>M.name.toLowerCase().includes(a.toLowerCase())||M.category.toLowerCase().includes(a.toLowerCase())),U=Object.entries(Pe).filter(([M,c])=>c&&(M.toLowerCase().includes(a.toLowerCase())||c.toLowerCase().includes(a.toLowerCase()))).map(([M,c])=>({id:M,name:M.replace(/_/g," "),category:"\u26A1 Smart CRs",code:c,isSmartCR:!0})),h=xe.getSnippets("email").filter(M=>M.title.toLowerCase().includes(a.toLowerCase())||M.subject&&M.subject.toLowerCase().includes(a.toLowerCase())).map(M=>{let c=[],k=M.content.match(/\[([^\]]+)\]/g);return k&&[...new Set(k)].forEach(w=>{c.push({key:w,label:w.replace("[","").replace("]",""),type:w.toLowerCase().includes("data")?"date":"text",auto:w.toLowerCase().includes("nome")&&w.toLowerCase().includes("seu")?"agentName":null})}),{id:M.id||`snippet-${Math.random()}`,name:M.title,category:"\u{1F464} Pessoal",subject:M.subject||"Sem Assunto",template:M.content,placeholders:c}}),H=[...R,...U,...h];if(H.length===0){m.innerHTML=`
                <div style="padding: 40px 20px; text-align: center; color: ${r.textSecondary}; opacity: 0.6;">
                    <div style="font-size: 32px; margin-bottom: 12px;">\u{1F50D}</div>
                    <div style="font-size: 14px; font-weight: 500;">Nenhum resultado para "${a}"</div>
                </div>`;return}[...new Set(H.map(M=>M.category))].sort((M,c)=>M.localeCompare(c)).forEach(M=>{let c=s.has(M)||a.length>0,k=H.filter(ee=>ee.category===M),w=document.createElement("div");Object.assign(w.style,{padding:"12px 16px 12px 24px",fontSize:"11px",fontWeight:"700",color:r.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",position:"sticky",top:"-8px",backgroundColor:"rgba(239, 239, 240, 0.9)",zIndex:"10",backdropFilter:"blur(20px)",margin:"0 -8px 8px -8px",borderBottom:`0.5px solid ${r.borderSubtle}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none",transition:"background-color 0.2s ease"}),w.onmouseenter=()=>w.style.backgroundColor="rgba(230, 230, 232, 0.9)",w.onmouseleave=()=>w.style.backgroundColor="rgba(239, 239, 240, 0.9)";let W=document.createElement("span");W.textContent=M,w.appendChild(W);let Y=document.createElement("span");Y.textContent=k.length,Object.assign(Y.style,{backgroundColor:"rgba(0, 0, 0, 0.05)",padding:"2px 8px",borderRadius:"10px",fontSize:"10px",color:r.textSecondary});let Z=document.createElement("span");Z.innerHTML=c?"\u{10012A}":"\u{10012B}",Z.innerHTML=c?"\u25BE":"\u25B8",Z.style.marginLeft="8px",Z.style.transition="transform 0.3s ease";let j=document.createElement("div");j.style.display="flex",j.style.alignItems="center",j.appendChild(Y),j.appendChild(Z),w.appendChild(j),w.onclick=()=>{s.has(M)?s.delete(M):s.add(M),f()},m.appendChild(w),c&&k.forEach(ee=>{let te=n&&n.id===ee.id,Q=document.createElement("div");if(Object.assign(Q.style,{padding:"12px 14px",fontSize:"14px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",borderRadius:"10px",color:r.textPrimary,margin:"4px 6px",display:"flex",alignItems:"center",gap:"12px",backgroundColor:te?r.primary:r.bgSurface,boxShadow:te?"0 4px 12px rgba(0, 122, 255, 0.3)":"0 1px 2px rgba(0,0,0,0.05)",border:te?"none":`1px solid ${r.borderSubtle}`,position:"relative",overflow:"hidden"}),te){let he=document.createElement("div");Object.assign(he.style,{position:"absolute",left:"0",top:"0",bottom:"0",width:"4px",backgroundColor:"#fff",borderRadius:"0 4px 4px 0"}),Q.appendChild(he)}let ne=document.createElement("span");ne.innerHTML=ee.isSmartCR?"\u26A1":ee.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",ne.style.fontSize="12px",ne.style.opacity="0.7",ne.style.flexShrink="0",Q.appendChild(ne);let ae=document.createElement("span");ae.textContent=ee.name,ae.style.overflow="hidden",ae.style.textOverflow="ellipsis",ae.style.whiteSpace="nowrap",ae.style.flex="1",Q.appendChild(ae),te&&(Q.style.color="#fff",Q.style.fontWeight="600",ne.style.opacity="1"),Q.onmouseenter=()=>{te||(Q.style.backgroundColor="#f8f8f9",Q.style.transform="translateY(-1px) scale(1.01)",Q.style.boxShadow="0 4px 8px rgba(0,0,0,0.08)",Q.style.borderColor="rgba(0, 122, 255, 0.2)")},Q.onmouseleave=()=>{te||(Q.style.backgroundColor=r.bgSurface,Q.style.transform="translateY(0) scale(1)",Q.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",Q.style.borderColor=r.borderSubtle)},Q.onmousedown=()=>{Q.style.transform=te?"scale(0.97)":"scale(0.98)"},Q.onmouseup=()=>{Q.style.transform=te?"scale(1)":"translateY(-1px) scale(1.01)"},Q.onclick=()=>{O(ee)},m.appendChild(Q)})})}let C=null;async function O(R){n?.id!==R.id&&(n=R,C&&clearTimeout(C),v.style.opacity="0",v.style.transform="translateY(5px)",C=setTimeout(()=>{z.style.display=R.isSmartCR?"block":"none",V.style.display=R.isSmartCR?"none":"block",T.style.display=R.isSmartCR?"none":"block",f(),E(),_(),v.style.opacity="1",v.style.transform="translateY(0)",C=null},150))}function E(){if(N.innerHTML="",!n||n.isSmartCR){n?.isSmartCR?(N.style.display="block",N.innerHTML=`<div style="padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):N.style.display="none";return}let R=n.placeholders&&n.placeholders.length>0;if(N.style.display=R?"block":"none",!R)return;let U=document.createElement("div");Object.assign(U.style,{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}),(n.placeholders||[]).forEach(h=>{let H=document.createElement("div"),L=document.createElement("label");L.textContent=h.label,Object.assign(L.style,{display:"block",fontSize:"11px",fontWeight:"700",color:r.textSecondary,marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.5px"});let M=document.createElement("input");M.type=h.type||"text",M.dataset.key=h.key,Object.assign(M.style,{width:"100%",padding:"10px 12px",borderRadius:"8px",border:`1.5px solid ${r.borderSubtle}`,backgroundColor:"#FBFBFD",fontSize:"14px",boxSizing:"border-box",transition:"all 0.2s ease",outline:"none"}),M.onfocus=()=>{M.style.borderColor=r.primary,M.style.backgroundColor="#FFFFFF",M.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)"},M.onblur=()=>{M.style.borderColor=r.borderSubtle,M.style.backgroundColor="#FBFBFD",M.style.boxShadow="none"},h.auto==="agentName"&&(M.value=$e().split(" ")[0]),M.addEventListener("input",_),H.appendChild(L),H.appendChild(M),U.appendChild(H)}),N.appendChild(U)}function _(){if(!n){q.innerHTML=`
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
                </div>`;return}if(n.isSmartCR){q.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${n.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let R=n.template;(N.querySelectorAll("input")||[]).forEach(h=>{let H=h.dataset.key,L=h.value;if(h.type==="date"&&L){let[c,k,w]=L.split("-");L=`${k}/${w}/${c}`}L=L||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${H}</span>`;let M=H.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");R=R.replace(new RegExp(M,"g"),L)}),q.innerHTML=R}return g.addEventListener("input",R=>{a=R.target.value,y.style.display=a?"block":"none",f()}),T.onclick=()=>{let R=q.innerHTML,U=new Blob([R],{type:"text/html"}),h=q.innerText,H=[new ClipboardItem({"text/html":U,"text/plain":new Blob([h],{type:"text/plain"})})];navigator.clipboard.write(H).then(()=>K("E-mail copiado com sucesso!"),()=>K("Erro ao copiar e-mail",{error:!0}))},V.onclick=async()=>{if(!n)return;let R=Ye(),U={...n,body:q.innerHTML};try{await ao(U),S()}catch{K("Erro ao preencher e-mail",{error:!0})}finally{R()}},z.onclick=async()=>{if(!n||!n.isSmartCR)return;let R=Ye();try{await ut(n.code),S()}catch{K("Erro ao aplicar Smart CR",{error:!0})}finally{R()}},S}var uo={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y qualidade de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acesso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo seguinte:
 A) 10 d\xEDgitos de la conta
 B) Correo electr\xF3nico
 C) N\xFAmero de tel\xE9fono y
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante em el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acesso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function mo(){let t="v3.0.0",e={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",success:"#34A853"},o="csa-local-styles";if(!document.getElementById(o)){let L=document.createElement("style");L.id=o,L.innerHTML=`
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
        .csa-data-pill.copied .csa-data-value { opacity: 0.3; }

        /* Segmented Control (Tabs) */
        .csa-segmented-control {
            display: flex;
            background: #E3E3E8;
            padding: 2px;
            border-radius: 10px;
            gap: 2px;
            position: relative;
            margin-bottom: 16px;
        }
        .csa-segmented-control button {
            flex: 1;
            border: none;
            background: transparent;
            padding: 8px 4px;
            font-size: 12px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #6E6E73;
            position: relative;
            z-index: 2;
        }
        .csa-segmented-control button.active {
            color: #1D1D1F;
        }
        .csa-segmented-indicator {
            position: absolute;
            top: 2px;
            left: 2px;
            bottom: 2px;
            background: #FFFFFF;
            border-radius: 8px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* Strikethrough Animation */
        .csa-item-text {
            position: relative;
            display: inline-block;
            transition: color 0.3s ease;
        }
        .csa-item-text.completed {
            color: #6E6E73;
        }
        .csa-item-text::after {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 0;
            height: 1.5px;
            background: #6E6E73;
            transition: width 0.3s ease;
        }
        .csa-item-text.completed::after {
            width: 100%;
        }

        /* Shimmer Progress Bar */
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .csa-progress-fill {
            background: linear-gradient(90deg, #007AFF, #00C6FF, #007AFF);
            background-size: 200% 100%;
            animation: shimmer 2s infinite linear;
        }
      `,document.head.appendChild(L)}let n={progressBarContainer:{height:"6px",background:e.borderSubtle,width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 3px 3px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:e.bgApp,scrollBehavior:"smooth"},card:{background:e.bgSurface,border:`1px solid ${e.borderSubtle}`,borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:e.shadowCard},cardTitle:{fontSize:"11px",fontWeight:"700",color:e.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"10px",transition:"all 0.2s ease",color:e.textPrimary,fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{background:"rgba(0, 0, 0, 0.02)"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"50%",border:`2px solid ${e.borderSubtle}`,marginRight:"12px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},a={},i="PT",s="BAU",r=!1,l=document.createElement("div");l.id="call-script-popup",l.classList.add("cw-module-window"),Object.assign(l.style,pe,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let p={popup:l,googleLine:null},d=null;function u(){r&&Ce().then(L=>{let M=l.querySelector("#cw-ctx-name"),c=l.querySelector("#cw-ctx-cid"),k=l.querySelector("#cw-ctx-email");if(M&&(M.textContent=L.advertiserName||"Cliente Desconhecido"),c){let w=L.cid||"---";c.textContent!==w&&(c.textContent=w)}if(k){let w=L.clientEmail||"N\xE3o encontrado";k.textContent!==w&&(k.textContent=w,k.title=w)}})}function x(){Ce().then(L=>{let M=new Date().toLocaleDateString("pt-BR"),c=l.querySelector("#cw-am-message-area"),k=l.querySelector("#cw-am-review-container"),w=`Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${L.advertiserName||"Cliente"}) em andamento hoje (${M}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${L.advertiserName||"---"}
CID: ${L.cid||"---"}
Case ID: ${L.caseId||"---"}
E-mail: ${L.clientEmail||"---"}`;c&&(c.value=w),k&&(k.style.display="block",k.style.maxHeight="300px",k.style.opacity="1",k.scrollIntoView({behavior:"smooth",block:"end"}))})}function b(){r=!r,ge(r,l,"cw-btn-script"),r?(u(),d||(d=setInterval(u,2e3))):d&&(clearInterval(d),d=null)}let g=ue(l,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",p,()=>{b()});l.appendChild(g);let m=document.createElement("div");Object.assign(m.style,n.contextBanner),m.innerHTML=`
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
  `;let y=document.createElement("div");y.style.cssText="margin-top: 24px; border-top: 1px dashed #DADCE0; padding-top: 16px;",y.innerHTML=`
      <button id="cw-pill-message" style="width: 100%; background: transparent; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.2s;">
          <div style="background: #F1F3F4; border-radius: 6px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div style="text-align: left;">
              <div style="font-size:11px; font-weight:700; color:#5F6368;">Mensagem AM</div>
              <div style="font-size:10px; color:#9AA0A6;">Gerar aviso de insucesso de contato</div>
          </div>
      </button>

      <div id="cw-am-review-container" style="display: none; transition: all 0.3s ease; opacity: 0; max-height: 0; overflow: hidden; margin-top: 12px;">
          <textarea id="cw-am-message-area" style="width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px; font-family: 'Roboto', sans-serif; font-size: 13px; color: #3C4043; outline: none; resize: none; box-sizing: border-box; background: #F8F9FA; line-height: 1.4;"></textarea>
          <button id="cw-am-copy-final" style="width: 100%; margin-top: 8px; padding: 10px; background: #007AFF; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;">
              Copiar Mensagem Final
          </button>
      </div>
  `;let v=y.querySelector("#cw-pill-message"),N=y.querySelector("#cw-am-copy-final"),B=y.querySelector("#cw-am-message-area");v.onmouseenter=()=>{v.style.background="#F8F9FA",v.style.borderColor="#007AFF"},v.onmouseleave=()=>{v.style.background="transparent",v.style.borderColor="#DADCE0"},v.addEventListener("click",()=>{x()}),N.addEventListener("click",()=>{B.value&&(navigator.clipboard.writeText(B.value),K("Mensagem copiada!"),G.playSuccess(),N.style.background="#34A853",N.textContent="Copiado!",setTimeout(()=>{N.style.background="#1A73E8",N.textContent="Copiar Mensagem Final"},2e3))});let $=(L,M)=>{let c=m.querySelector(L),k=m.querySelector(M);c.onclick=()=>{let w=k.textContent;!w||w.includes("---")||w.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(w),G.playSuccess(),c.classList.add("copied"),setTimeout(()=>c.classList.remove("copied"),1500))}};l.appendChild(m);let J=document.createElement("div");Object.assign(J.style,n.progressBarContainer);let X=document.createElement("div");X.className="csa-progress-fill",Object.assign(X.style,n.progressBarFill),J.appendChild(X),l.appendChild(J);let I=document.createElement("div");I.id="csa-content",Object.assign(I.style,n.contentArea),l.appendChild(I);let T=document.createElement("div");Object.assign(T.style,n.footer);let V=document.createElement("span");V.textContent="by lucaste@",Object.assign(V.style,{fontSize:"10px",color:"#bdc1c6"});let z=document.createElement("button");z.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(z.style,n.resetBtn),z.onmouseenter=()=>z.style.background="#fce8e6",z.onmouseleave=()=>z.style.background="transparent",z.onclick=()=>{z.style.transform="scale(0.9)",setTimeout(()=>z.style.transform="scale(1)",150);for(let L in a)delete a[L];U()},T.appendChild(V),T.appendChild(z),l.appendChild(T);let q=document.createElement("div");Object.assign(q.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"16px"});let A=document.createElement("div");A.className="csa-segmented-control",A.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `;let S=document.createElement("div");S.className="csa-segmented-control",S.innerHTML=`
      <div class="csa-segmented-indicator" id="lang-indicator" style="width: calc(33.33% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-lang="PT">PT</button>
      <button data-lang="ES">ES</button>
      <button data-lang="EN">EN</button>
  `,q.appendChild(A),q.appendChild(S),I.appendChild(q);let F=A.querySelectorAll("button"),f=A.querySelector("#type-indicator");F.forEach((L,M)=>{L.onclick=()=>{F.forEach(c=>c.classList.remove("active")),L.classList.add("active"),f.style.transform=`translateX(${M*(A.offsetWidth/2-2)}px)`,s=L.dataset.type,G.playClick(),U()}});let C=S.querySelectorAll("button"),O=S.querySelector("#lang-indicator");C.forEach((L,M)=>{L.onclick=()=>{C.forEach(c=>c.classList.remove("active")),L.classList.add("active"),O.style.transform=`translateX(${M*(S.offsetWidth/3-1)}px)`,i=L.dataset.lang,G.playClick(),U()}});let E=document.createElement("div");E.id="csa-checklist-area",I.appendChild(E),I.appendChild(y);let _=document.createElement("div");Object.assign(_.style,Ae),_.className="no-drag",_.title="Redimensionar",l.appendChild(_),Ee(l,_),document.body.appendChild(l),$("#cw-pill-cid","#cw-ctx-cid"),$("#cw-pill-email","#cw-ctx-email");function R(L){return L}function U(){E.innerHTML="";let L=`${i} ${s}`,M=uo[L];if(!M){E.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',X.style.width="0%";return}let c=e.primary,k=0,w=0;["inicio","meio","fim"].forEach(W=>{M[W]&&(k+=M[W].length)}),["inicio","meio","fim"].forEach((W,Y)=>{let Z=M[W];if(!Z||Z.length===0)return;let j=document.createElement("div");Object.assign(j.style,n.card);let ee=document.createElement("div");Object.assign(ee.style,n.cardTitle);let te="";W==="inicio"?i.includes("ES")?te="Apertura":i.includes("EN")?te="Opening":te="Abertura":W==="meio"?i.includes("ES")?te="Implementaci\xF3n":i.includes("EN")?te="Implementation":te="Implementa\xE7\xE3o (Tag Support)":W==="fim"&&(i.includes("ES")?te="Cierre":i.includes("EN")?te="Closing":te="Fechamento"),ee.textContent=te;let Q=document.createElement("span");Q.style.fontSize="11px",Q.style.opacity="0.7",Q.style.fontWeight="500",Q.style.background="#f1f3f4",Q.style.padding="2px 8px",Q.style.borderRadius="10px",ee.appendChild(Q),j.appendChild(ee);let ne=0;Z.forEach((ae,he)=>{let qe=`${L}-${W}-${he}`,ze=!!a[qe];ze&&(w++,ne++);let ce=document.createElement("div");Object.assign(ce.style,n.itemRow);let re=document.createElement("div");Object.assign(re.style,n.checkbox);let Be=document.createElement("span");Be.className="csa-item-text"+(ze?" completed":""),Be.innerHTML=ae,Be.style.flex="1",ze?(Object.assign(ce.style,n.itemCompleted),re.style.background=c,re.style.borderColor=c,re.style.transform="scale(1)",re.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(re.style.background="transparent",re.style.borderColor=e.borderSubtle,re.style.transform="scale(1)",re.innerHTML=""),ce.onclick=()=>{let kt=!a[qe];a[qe]=kt,G.playClick(),kt?(re.style.transform="scale(1.15)",setTimeout(()=>re.style.transform="scale(1)",150),Object.assign(ce.style,n.itemCompleted),Be.classList.add("completed"),re.style.background=c,re.style.borderColor=c,re.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ce.style.background="transparent",Be.classList.remove("completed"),re.style.background="transparent",re.style.borderColor=e.borderSubtle,re.innerHTML=""),h(L,M)},ce.onmouseenter=()=>{a[qe]||(ce.style.background="rgba(0, 0, 0, 0.03)",re.style.borderColor=c)},ce.onmouseleave=()=>{a[qe]||(ce.style.background="transparent",re.style.borderColor=e.borderSubtle)},ce.appendChild(re),ce.appendChild(Be),j.appendChild(ce)}),ne===Z.length&&Z.length>0&&(Q.style.color="#1e8e3e",Q.style.background="#e6f4ea",j.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),Q.textContent=`${ne}/${Z.length}`,E.appendChild(j)}),H(k,w)}function h(L,M){let c=0,k=0;["inicio","meio","fim"].forEach(w=>{let W=M[w]||[];c+=W.length,W.forEach((Y,Z)=>{a[`${L}-${w}-${Z}`]&&k++})}),H(c,k),setTimeout(()=>U(),200)}function H(L,M){let c=L===0?0:M/L*100;X.style.width=`${c}%`,c===100?(X.style.background=e.success,X.classList.remove("csa-progress-fill")):X.classList.add("csa-progress-fill")}return U(),b}var Ke={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Re={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},mt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},At="cw_link_history_v4";function go(t,e){try{let o=JSON.parse(localStorage.getItem(At)||"[]");o=o.filter(n=>n.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(At,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function Go(){try{return JSON.parse(localStorage.getItem(At)||"[]")}catch{return[]}}function fo(){let t="v4.6",e="",o=!1,n=null,a=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},s=document.createElement("div");s.id="links-popup",s.classList.add("cw-module-window"),Object.assign(s.style,pe,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let l=ue(s,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:s,googleLine:null},()=>q());s.appendChild(l);let p=document.createElement("div");p.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",s.appendChild(p);let d=document.createElement("div");d.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,p.appendChild(d);let u=document.createElement("div");u.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",p.appendChild(u);let x=document.createElement("div");x.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let b=document.createElement("div");b.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let g=document.createElement("div");g.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',g.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let m=document.createElement("input");m.type="text",m.placeholder="Buscar ferramenta ou SOP...",m.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,m.onfocus=()=>{b.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",b.style.border="1px solid #1a73e8"},m.onblur=()=>{b.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",b.style.border="1px solid transparent"},b.appendChild(g),b.appendChild(m),x.appendChild(b),u.appendChild(x);let y=document.createElement("div");y.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",u.appendChild(y);let v=null;function N(){if(v)return;v=document.createElement("div"),v.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let A=document.createElement("div");A.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",A.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let S=document.createElement("button");S.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',S.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",S.onclick=()=>{$(),a=!1,T()},A.appendChild(S),v.appendChild(A);let F=document.createElement("div");F.id="cw-history-list",F.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",v.appendChild(F),u.appendChild(v)}function B(){v||N();let A=v.querySelector("#cw-history-list");A.innerHTML="";let S=Go();S.length===0?A.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':S.forEach(F=>{let f=z(F,Re[F._originalCat],!0,F._originalCat);A.appendChild(f)}),requestAnimationFrame(()=>v.style.transform="translateY(0)")}function $(){v&&(v.style.transform="translateY(100%)")}function J(){d.innerHTML="";let A=X("history","Recentes",Re.history);A.id="cw-sidebar-btn-history",A.onclick=()=>{G.playClick(),a=!a,a?B():$(),T()},d.appendChild(A);let S=document.createElement("div");S.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",d.appendChild(S),Object.keys(Ke).forEach(F=>{let f=Ke[F],C=X(F,f.label,Re[F]);C.id=`cw-sidebar-btn-${F}`,C.onclick=()=>{G.playClick(),a&&(a=!1,$()),I(F)},d.appendChild(C)})}function X(A,S,F){let f=document.createElement("div");f.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary};
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,f.title=S,f.dataset.key=A;let C=document.createElement("div");C.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",C.innerHTML=F||Re.tasks;let O=document.createElement("div");return O.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",O.textContent=S,f.appendChild(C),f.appendChild(O),f.onmouseenter=()=>{n!==A&&!(A==="history"&&a)&&(f.style.background="#F1F3F4",C.style.transform="scale(1.1)")},f.onmouseleave=()=>{n!==A&&!(A==="history"&&a)&&(f.style.background="transparent",C.style.transform="scale(1)")},f}function I(A){let S=document.getElementById(`cat-anchor-${A}`);S&&(S.scrollIntoView({behavior:"smooth",block:"start"}),n=A,T())}function T(){Object.keys(Ke).forEach(S=>{let F=d.querySelector(`#cw-sidebar-btn-${S}`);if(F)if(n===S&&!a){let f=mt[S];F.style.background=f.bg,F.style.color=f.color,F.querySelector("div:first-child").style.transform="scale(1.1)"}else F.style.background="transparent",F.style.color=i.textSecondary,F.querySelector("div:first-child").style.transform="scale(1)"});let A=d.querySelector("#cw-sidebar-btn-history");A&&(a?(A.style.background="#3C4043",A.style.color="#FFFFFF"):(A.style.background="transparent",A.style.color=i.textSecondary))}function V(){if(y.innerHTML="",e.trim()!==""){let S=[];if(Object.entries(Ke).forEach(([f,C])=>{let O=C.links.filter(E=>E.name.toLowerCase().includes(e.toLowerCase())||E.desc.toLowerCase().includes(e.toLowerCase()));S.push(...O.map(E=>({...E,_cat:f})))}),S.length===0){y.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let F=document.createElement("div");F.innerHTML="Resultados da busca",F.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",y.appendChild(F),S.forEach(f=>{let C=z(f,Re[f._cat],!1,f._cat);y.appendChild(C)});return}Object.entries(Ke).forEach(([S,F])=>{let f=mt[S],C=document.createElement("div"),O=document.createElement("div");O.id=`cat-anchor-${S}`,O.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${f.color};
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,O.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${f.color};"></div>
            ${F.label}
          `,C.appendChild(O);let E=document.createElement("div");E.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",F.links.forEach(_=>{let R=z(_,Re[S],!1,S);E.appendChild(R)}),C.appendChild(E),y.appendChild(C)});let A=document.createElement("div");A.style.height="80px",y.appendChild(A)}function z(A,S,F,f){let C=document.createElement("div"),O=mt[f]||mt.history;C.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px;
          background: #FFFFFF;
          border: 1px solid transparent;
          border-radius: 16px;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let E=document.createElement("div");E.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${O.bg}; color: ${O.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,E.innerHTML=S||Re.tasks;let _=E.querySelector("svg");_&&(_.style.width="22px",_.style.height="22px");let R=document.createElement("div");R.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let U=document.createElement("div");U.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,U.textContent=A.name;let h=document.createElement("div");h.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,h.textContent=A.desc,R.appendChild(U),R.appendChild(h);let H=document.createElement("div");return H.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',H.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,H.title="Copiar URL",C.onmouseenter=()=>{C.style.transform="translateY(-2px)",C.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",C.style.borderColor="rgba(0,0,0,0.05)",C.style.borderLeft=`4px solid ${O.color}`,H.style.opacity="1",H.style.background="#F1F3F4"},C.onmouseleave=()=>{C.style.transform="translateY(0)",C.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",C.style.border="1px solid transparent",H.style.opacity="0",H.style.background="transparent"},C.onclick=()=>{!F&&f&&go(A,f),window.open(A.url,"_blank")},H.onclick=L=>{L.stopPropagation(),G.playClick(),navigator.clipboard.writeText(A.url),!F&&f&&go(A,f),K("Link copiado!")},C.appendChild(E),C.appendChild(R),C.appendChild(H),C}m.addEventListener("input",A=>{e=A.target.value,V()});function q(){o=!o,ge(o,s,"cw-btn-links")}return document.body.appendChild(s),J(),V(),q}var Le=[];function Et(t){Le=t}var jo=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function bo(){let t="v4.9",e=!1,o=null,n=null;function a(f){if(!f)return"";try{let C=new Date(f);return isNaN(C.getTime())?String(f):C.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(f)}}if(!document.getElementById("cw-broadcast-hd-css")){let f=document.createElement("style");f.id="cw-broadcast-hd-css",f.innerHTML=`
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
      `,document.head.appendChild(f)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},s={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(f){return f?Object.entries(f).map(([C,O])=>`${C.replace(/[A-Z]/g,E=>"-"+E.toLowerCase())}:${O}`).join(";"):""}function l(f){if(!f||typeof f!="string")return"";let C=f;return C=C.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),C=C.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),C=C.replace(/_(.*?)_/g,"<i>$1</i>"),C=C.replace(/\n/g,"<br>"),C=zt(C),C}let p=document.createElement("div");p.id="broadcast-popup",p.classList.add("cw-module-window"),Object.assign(p.style,pe,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let d={popup:p,googleLine:null};function u(){if(e=!e,ge(e,p,"cw-btn-broadcast"),e){let f=document.getElementById("cw-btn-broadcast");f&&f.classList.remove("has-new"),I()}}let x=ue(p,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",d,()=>u()),b=x.querySelector(".cw-header-actions")||x.lastElementChild,g=null;function m(){let f=null;try{f=Se()}catch{console.warn("TechSol: Auth Pending")}if(f){let C=f.split("@")[0].toLowerCase(),O=at.includes(C);if(window._cwIsAdmin=O,window._cwCurrentUser=C,O&&b&&!b.querySelector("#cw-admin-btn")){let E=document.createElement("div");E.id="cw-admin-btn",E.className="cw-btn-interactive",E.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(E.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),E.title="Novo Aviso",E.onclick=_=>{_.stopPropagation(),N()},b.insertBefore(E,b.firstChild),g||v(),V()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(m,2e3))}if(b){let f=document.createElement("button");f.textContent="Limpar",f.className="cw-btn-interactive",Object.assign(f.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),f.onclick=C=>{C.stopPropagation(),G.playSuccess();let O=Le.map(E=>E.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(O)),V(),T()},b.insertBefore(f,b.firstChild)}p.appendChild(x);let y=document.createElement("div");y.id="cw-update-status",y.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",p.appendChild(y);function v(){g=document.createElement("div"),g.className="cw-editor-overlay",g.innerHTML=`
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
      `,g.querySelectorAll('input[name="cw-bc-type"]').forEach(E=>{E.addEventListener("change",()=>{g.querySelectorAll(".cw-radio-option").forEach(_=>_.classList.remove("checked")),E.parentElement.classList.add("checked")})}),setTimeout(()=>{let E=g.querySelector(".cw-radio-option.info");E&&E.classList.add("checked")},100);let f=g.querySelector("#cw-bc-cancel"),C=g.querySelector("#cw-bc-close-x"),O=g.querySelector("#cw-bc-send");f.onclick=B,C.onclick=B,O.onclick=$,p.appendChild(g)}function N(f=null){if(!g)return;let C=g.querySelector("#cw-editor-title-label"),O=g.querySelector("#cw-bc-title"),E=g.querySelector("#cw-bc-text"),_=g.querySelector("#cw-bc-send");if(f){n=f.id,C.textContent="Editar Aviso",O.value=f.title||"",E.value=f.text||"",_.textContent="Salvar Altera\xE7\xF5es";let R=f.type||"info",U=g.querySelector(`input[name="cw-bc-type"][value="${R}"]`);U&&U.click()}else{n=null,C.textContent="Novo Aviso",O.value="",E.value="",_.textContent="Publicar";let R=g.querySelector('input[name="cw-bc-type"][value="info"]');R&&R.click()}g.classList.add("active"),setTimeout(()=>O.focus(),300)}function B(){g&&g.classList.remove("active"),n=null}async function $(){let f=g.querySelector("#cw-bc-send"),C=g.querySelector("#cw-bc-title"),O=g.querySelector("#cw-bc-text"),E=g.querySelector('input[name="cw-bc-type"]:checked'),_=E?E.value:"info";if(!C.value.trim()||!O.value.trim()){K("Preencha todos os campos!",{error:!0});return}f.textContent="Salvando...",f.style.opacity="0.7";let R=!1;n?R=await le.updateBroadcast(n,{title:C.value,text:O.value,type:_}):R=await le.sendBroadcast({title:C.value,text:O.value,type:_,author:window._cwCurrentUser||"admin"}),R?(K(n?"Atualizado!":"Publicado!"),G.playSuccess(),B(),setTimeout(()=>I(),1500)):(K("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),f.textContent=n?"Salvar Altera\xE7\xF5es":"Publicar",f.style.opacity="1")}async function J(f){if(await fe("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await le.deleteBroadcast(f)){K("Aviso removido."),G.playClick();let E=Le.findIndex(_=>_.id===f);E>-1&&Le.splice(E,1),V(),setTimeout(()=>I(),1500)}else K("Erro ao excluir.",{error:!0})}let X=document.createElement("div");X.className="cw-nice-scroll",Object.assign(X.style,i.feedContainer),p.appendChild(X);async function I(){e&&(y.style.display="block",y.innerHTML="\u{1F504} Sincronizando...");try{let f=await le.fetchData();f&&f.broadcast&&(Et(f.broadcast),T(),e&&(V(),y.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{y.style.display="none"},1500)))}catch{e&&(y.innerHTML="\u26A0\uFE0F Offline")}}function T(){let f=document.getElementById("cw-btn-broadcast");if(!f)return;let C=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Le.some(E=>!C.includes(E.id))){if(f.classList.add("has-new"),!f.querySelector(".cw-badge")){let E=document.createElement("div");E.className="cw-badge",Object.assign(E.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),f.appendChild(E)}}else{f.classList.remove("has-new");let E=f.querySelector(".cw-badge");E&&E.remove()}}function V(){X.innerHTML="";let f=p.querySelector("#cw-bau-widget");f&&f.remove();let C=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),O=[...Le].sort((h,H)=>{let L=new Date(h.date).getTime()||0;return(new Date(H.date).getTime()||0)-L}),E=O.findIndex(h=>h.title&&h.title.toLowerCase().includes("disponibilidade bau"));if(E!==-1){let h=O[E];O.splice(E,1);let H=document.createElement("div");H.id="cw-bau-widget",Object.assign(H.style,i.bauContainer);let L=[],M=(h.text||"").split(`
`),c=/\d{1,2}\/\d{1,2}/,k="\u{1F4C5}";if(M.forEach(j=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(j)?k="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(j)&&(k="\u{1F1EA}\u{1F1F8}");let ee=j.match(c);if(ee){let te=ee[0],Q=k;/🇧🇷|🇵🇹|PT|BR/i.test(j)?Q="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(j)&&(Q="\u{1F1EA}\u{1F1F8}"),L.some(ae=>ae.flag===Q&&ae.date===te)||L.push({flag:Q,date:te})}}),L.length===0){let j=(h.text||"").match(/\d{1,2}\/\d{1,2}/g);j&&[...new Set(j)].forEach(ee=>L.push({flag:"\u{1F4C5}",date:ee}))}let w="",W='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(W=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${W}
              `),L.length>0?w=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${L.map(ee=>`
                  <div style="${r(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(i.bauFlag)}">${ee.flag}</span>
                      <span style="${r(i.bauDate)}">${ee.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${W}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${l(h.text)}</div>
              `:w=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${l(h.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,H.innerHTML=`
              <div style="${r(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(i.liveIndicator)}">
                      <div style="${r(i.pulseDot)}"></div>
                      <span style="${r(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${a(h.date)}</div>
              </div>
              ${w}
          `,y.after(H);let Y=H.querySelector("#cw-bau-toggle-btn"),Z=H.querySelector("#cw-bau-full");if(Y&&Z&&(Y.onclick=()=>{let j=Z.style.display==="none";Z.style.display=j?"block":"none",Y.textContent=j?"Ocultar":"Detalhes"}),window._cwIsAdmin){let j=H.querySelector(".cw-bau-edit");j&&(j.onclick=()=>N(h))}}let _=O.sort((h,H)=>{let L=C.includes(h.id),M=C.includes(H.id);return L===M?0:L?1:-1});if(_.length===0&&!E){let h=document.createElement("div");Object.assign(h.style,i.emptyState),h.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,X.appendChild(h)}let R=_.filter(h=>!C.includes(h.id)),U=_.filter(h=>C.includes(h.id));if(R.forEach(h=>X.appendChild(z(h,!1))),U.length>0){let h=document.createElement("div");Object.assign(h.style,i.historyDivider),h.innerHTML=`<span>Hist\xF3rico (${U.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let H=document.createElement("div");Object.assign(H.style,i.historyContainer),U.forEach(M=>H.appendChild(z(M,!0)));let L=!1;h.onclick=()=>{G.playClick(),L=!L,H.style.display=L?"flex":"none",h.querySelector("svg").style.transform=L?"rotate(180deg)":"rotate(0deg)"},X.appendChild(h),X.appendChild(H)}}function z(f,C){let O=document.createElement("div");Object.assign(O.style,C?i.cardHistory:i.card);let E=s[f.type]||s.info,_=document.createElement("div");Object.assign(_.style,i.cardHeader);let R=document.createElement("div");Object.assign(R.style,i.typeTag,{color:E.color,background:E.bg}),R.innerHTML=`${E.icon} <span>${f.type}</span>`;let U=document.createElement("span");if(Object.assign(U.style,i.dateTag),U.textContent=a(f.date),_.appendChild(R),C)_.appendChild(U);else{let c=document.createElement("button");c.className="cw-btn-interactive",Object.assign(c.style,i.dismissBtn),c.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',c.onmouseenter=()=>{c.style.color="#1e8e3e",c.style.background="#e6f4ea",c.style.borderColor="#1e8e3e"},c.onmouseleave=()=>{c.style.color="#5f6368",c.style.background="#fff",c.style.borderColor="rgba(0,0,0,0.1)"},c.onclick=k=>{k.stopPropagation(),G.playClick(),O.style.transform="translateX(20px)",O.style.opacity="0",setTimeout(()=>{let w=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");w.push(f.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(w)),V(),T()},200)},_.appendChild(c)}let h=document.createElement("div");Object.assign(h.style,i.cardContent);let H=document.createElement("div");Object.assign(H.style,i.msgTitle),H.textContent=f.title;let L=document.createElement("div");Object.assign(L.style,i.msgBody),L.innerHTML=l(f.text);let M=document.createElement("div");if(Object.assign(M.style,i.msgMeta),M.innerHTML=`Publicado por <b>${f.author||"Sistema"}</b>`,C||(M.innerHTML+=` \u2022 ${a(f.date)}`),h.appendChild(H),h.appendChild(L),h.appendChild(M),O.appendChild(_),O.appendChild(h),window._cwIsAdmin){let c=document.createElement("div");c.className="cw-card-actions";let k=document.createElement("button");k.className="cw-action-btn edit",k.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',k.onclick=()=>N(f);let w=document.createElement("button");w.className="cw-action-btn delete",w.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',w.onclick=()=>J(f.id),c.appendChild(k),c.appendChild(w),O.appendChild(c)}return O}let q=le.getCachedBroadcasts();q.length>0&&(Et(q),V()),setTimeout(m,500),I(),o||(o=setInterval(I,jo));let A=document.createElement("div");Object.assign(A.style,Ae),A.className="no-drag",p.appendChild(A),Ee(p,A),document.body.appendChild(p);let S=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),F=Le.some(f=>!S.includes(f.id));return{toggle:u,hasUnread:F}}function xo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,o.overlay);let a=document.createElement("div");Object.assign(a.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let s=document.createElement("div");Object.assign(s.style,o.title);let r=document.createElement("div");Object.assign(r.style,o.text);let l=document.createElement("div");Object.assign(l.style,o.dotsContainer);let p=document.createElement("div");Object.assign(p.style,o.btnContainer);let d=document.createElement("button");d.textContent="Pular",Object.assign(d.style,o.btn,o.btnSkip),d.onmouseover=()=>d.style.color="#202124",d.onmouseout=()=>d.style.color="#5f6368";let u=document.createElement("button");u.textContent="Pr\xF3ximo",Object.assign(u.style,o.btn,o.btnNext),u.onmouseover=()=>u.style.transform="scale(1.05)",u.onmouseout=()=>u.style.transform="scale(1)",p.appendChild(d),p.appendChild(u),a.appendChild(i),a.appendChild(s),a.appendChild(r),a.appendChild(l),a.appendChild(p),n.appendChild(a),document.body.appendChild(n);function x(g){let m=t[g];i.textContent=m.icon,s.textContent=m.title,r.textContent=m.text,l.innerHTML="",t.forEach((y,v)=>{let N=document.createElement("div");Object.assign(N.style,o.dot),v===g&&Object.assign(N.style,o.dotActive),l.appendChild(N)}),m.isLast?(d.style.display="none",u.textContent="Come\xE7ar \u{1F680}",u.style.width="100%"):(d.style.display="block",u.textContent="Pr\xF3ximo",u.style.width="auto")}function b(){localStorage.setItem("cw_onboarding_seen_v1","true"),n.style.opacity="0",a.style.transform="translateY(20px)",setTimeout(()=>n.remove(),400),G.playSuccess(),K("Tudo pronto! Use o menu flutuante.")}u.onclick=()=>{G.playClick(),e<t.length-1?(e++,x(e)):b()},d.onclick=async()=>{await fe("Pular o tutorial?")&&b()},x(0),requestAnimationFrame(()=>{n.style.opacity="1",a.style.transform="translateY(0)"})}var ho={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function yo(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&$o(t)}function $o(t){let e=ho.slides,o=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,n.overlay);let i=document.createElement("div");Object.assign(i.style,n.card);let s=document.createElement("div");Object.assign(s.style,n.badge),s.textContent=`Atualiza\xE7\xE3o ${t}`;let r=document.createElement("div");Object.assign(r.style,n.icon);let l=document.createElement("div");Object.assign(l.style,n.title);let p=document.createElement("div");Object.assign(p.style,n.text);let d=document.createElement("div");Object.assign(d.style,n.dotsContainer);let u=document.createElement("button");Object.assign(u.style,n.btn),u.onmouseover=()=>u.style.transform="scale(1.02)",u.onmouseout=()=>u.style.transform="scale(1)",i.appendChild(s),i.appendChild(r),i.appendChild(l),i.appendChild(p),i.appendChild(d),i.appendChild(u),a.appendChild(i),document.body.appendChild(a);function x(g){let m=e[g];r.textContent=m.icon,l.textContent=m.title,p.textContent=m.text,d.innerHTML="",e.forEach((y,v)=>{let N=document.createElement("div");Object.assign(N.style,n.dot),v===g&&Object.assign(N.style,n.dotActive),d.appendChild(N)}),g===e.length-1?u.textContent="Entendi, vamos l\xE1! \u{1F44D}":u.textContent="Pr\xF3ximo"}function b(){localStorage.setItem("cw_last_version",t),a.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>a.remove(),400),G.playSuccess(),K(`TechSol atualizado para ${t}!`)}u.onclick=()=>{G.playClick(),o<e.length-1?(o++,x(o)):b()},x(0),requestAnimationFrame(()=>{a.style.opacity="1",i.style.transform="translateY(0)"})}var vo="cw_timezone_pinned",Tt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],Vo=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function wo(){let t="v2.2 Pro",e=!1,o=null,n="mx",a=JSON.parse(localStorage.getItem(vo)||"[]"),i="",s="all",r=new Date;r.setHours(14,0,0,0);let l={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},p={container:{display:"flex",flexDirection:"column",height:"100%",background:l.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:l.surface,borderBottom:`1px solid ${l.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:l.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:l.primary,borderBottomColor:l.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:l.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:l.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${l.border}`,background:l.surface,color:l.textSub,transition:"all 0.2s"},chipActive:{background:l.primaryBg,color:l.primary,borderColor:l.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:l.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${l.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:l.surface,border:`1px solid ${l.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:l.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},d=document.createElement("div");d.id="timezone-popup",d.classList.add("cw-module-window"),Object.assign(d.style,pe,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let x=ue(d,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:d},()=>C());d.appendChild(x);let b=document.createElement("div");Object.assign(b.style,p.container),d.appendChild(b);let g=document.createElement("div");Object.assign(g.style,p.tabHeader);let m=document.createElement("div");m.textContent="Monitoramento",Object.assign(m.style,p.tabBtn,p.tabActive);let y=document.createElement("div");y.textContent="Planejador",Object.assign(y.style,p.tabBtn),g.appendChild(m),g.appendChild(y),b.appendChild(g);let v=document.createElement("div");Object.assign(v.style,p.toolbar);let N=document.createElement("div");Object.assign(N.style,p.searchInputWrapper);let B=document.createElement("div");B.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(B.style,p.searchIcon);let $=document.createElement("input");$.placeholder="Buscar cidade ou pa\xEDs...",Object.assign($.style,p.searchInput),$.onfocus=()=>{$.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",$.style.borderColor="rgba(26,115,232,0.3)"},$.onblur=()=>{$.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",$.style.borderColor="transparent"},$.oninput=O=>{i=O.target.value.toLowerCase(),A()},N.appendChild(B),N.appendChild($),v.appendChild(N);let J=document.createElement("div");Object.assign(J.style,p.chipsRow),Vo.forEach(O=>{let E=document.createElement("div");E.textContent=O.label,E.id=`tz-filter-${O.id}`,Object.assign(E.style,p.chip),O.id===s&&Object.assign(E.style,p.chipActive),E.onclick=()=>{G.playClick(),s=O.id,Array.from(J.children).forEach(_=>{Object.assign(_.style,p.chip)}),Object.assign(E.style,p.chipActive),A()},J.appendChild(E)}),v.appendChild(J),b.appendChild(v);let X=document.createElement("div");Object.assign(X.style,p.listContainer);let I=document.createElement("style");I.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",b.appendChild(I);let T=document.createElement("div");Object.assign(T.style,p.plannerWrapper,{display:"none"}),b.appendChild(X),b.appendChild(T),m.onclick=()=>V("live"),y.onclick=()=>V("plan");function V(O){G.playClick(),O==="live"?(Object.assign(m.style,p.tabActive),Object.assign(y.style,p.tabBtn),y.style.borderBottomColor="transparent",X.style.display="flex",v.style.display="flex",T.style.display="none",F()):(Object.assign(y.style,p.tabActive),Object.assign(m.style,p.tabBtn),m.style.borderBottomColor="transparent",T.style.display="flex",X.style.display="none",v.style.display="none",f(),S())}function z(O){return O>=9&&O<17?{color:l.success,bg:l.successBg,label:"Aberto",icon:"\u{1F7E2}"}:O>=8&&O<9?{color:l.warning,bg:l.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:O>=17&&O<19?{color:l.warning,bg:l.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:l.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function q(O){a.includes(O)?a=a.filter(E=>E!==O):a.push(O),localStorage.setItem(vo,JSON.stringify(a)),A(),G.playClick()}function A(){X.innerHTML="";let O=new Date,E=Tt.filter(R=>{let U=R.name.toLowerCase().includes(i)||R.label.toLowerCase().includes(i),h=s==="all"||R.region===s;return U&&h});if(E.sort((R,U)=>{let h=a.includes(R.id),H=a.includes(U.id);return h&&!H?-1:!h&&H?1:R.name.localeCompare(U.name)}),E.length===0){X.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}E.forEach(R=>{let U=a.includes(R.id),h=O.toLocaleTimeString("pt-BR",{timeZone:R.zone,hour:"2-digit",minute:"2-digit"}),H=parseInt(h.split(":")[0]),L=z(H),M=H<6||H>18,c=document.createElement("div");Object.assign(c.style,p.hubCard),U&&Object.assign(c.style,p.hubCardPinned);let k=U?"\u2605":"\u2606",w=U?"#F9AB00":"#DADCE0";c.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${w}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${k}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${R.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${l.text}; letter-spacing:-0.2px;">${R.name}</div>
                        <div style="font-size:12px; color:${l.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${M?"\u{1F319}":"\u2600\uFE0F"} ${R.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${l.text}; font-family:'Google Sans', sans-serif;">${h}</div>
                    <div style="font-size:11px; font-weight:600; color:${L.color}; background:${L.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${L.label}
                    </div>
                </div>
            `,c.onmouseenter=()=>{c.style.transform="translateY(-2px)",c.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},c.onmouseleave=()=>{c.style.transform="translateY(0)",c.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let W=c.querySelector(".cw-pin-btn");W.onmouseenter=()=>{W.style.backgroundColor="#F1F3F4"},W.onmouseleave=()=>{W.style.backgroundColor="transparent"},W.onclick=Y=>{Y.stopPropagation(),q(R.id)},c.onclick=()=>{n=R.id,V("plan")},X.appendChild(c)});let _=document.createElement("div");_.style.height="20px",_.style.width="100%",X.appendChild(_)}function S(){T.innerHTML="";let O=document.createElement("div"),E=document.createElement("label");E.textContent="Onde est\xE1 o cliente?",E.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let _=document.createElement("select");Object.assign(_.style,Dt),_.style.padding="14px",[...Tt].sort((ne,ae)=>ne.name.localeCompare(ae.name)).forEach(ne=>{let ae=document.createElement("option");ae.value=ne.id,ae.textContent=`${ne.flag} ${ne.name} (${ne.zone})`,ne.id===n&&(ae.selected=!0),_.appendChild(ae)}),_.onchange=ne=>{n=ne.target.value,Q(),G.playClick()},O.appendChild(E),O.appendChild(_),T.appendChild(O);let U=document.createElement("div");Object.assign(U.style,p.timeComparisonRow);let h=document.createElement("div");Object.assign(h.style,p.timeCard),h.style.backgroundColor="#F8FAFF",h.style.borderColor="#E8F0FE",h.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let H=document.createElement("div");Object.assign(H.style,p.timeCard),H.style.backgroundColor="#FFF8E1",H.style.borderColor="#FEF7E0",H.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,U.appendChild(h),U.appendChild(H),T.appendChild(U);let L=document.createElement("div");L.id="cw-planner-status",Object.assign(L.style,p.statusBadge),T.appendChild(L);let M=document.createElement("div");Object.assign(M.style,{padding:"0 4px",marginTop:"12px"});let c=document.createElement("div");c.textContent="Arraste para simular o hor\xE1rio:",c.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let k=document.createElement("div");Object.assign(k.style,p.timelineContainer);let w=document.createElement("div");Object.assign(w.style,p.timelineTrack);let W=document.createElement("div");Object.assign(W.style,p.dayZone),w.appendChild(W);let Y=document.createElement("input");Y.type="range",Y.min="0",Y.max="1439",Y.step="15",Y.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let Z=document.createElement("div");Z.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",Z.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",k.appendChild(w),k.appendChild(Y),k.appendChild(Z),M.appendChild(c),M.appendChild(k),T.appendChild(M);let j=h.querySelector("#cw-time-input-br"),ee=H.querySelector("#cw-time-display-client"),te=H.querySelector("#cw-client-label");function Q(){let ne=Tt.find(re=>re.id===n);te.textContent=`${ne.flag} ${ne.label} (${ne.zone})`;let ae=r.getHours(),he=r.getMinutes(),qe=`${String(ae).padStart(2,"0")}:${String(he).padStart(2,"0")}`;j.value=qe,Y.value=ae*60+he;let ze=r.toLocaleTimeString("pt-BR",{timeZone:ne.zone,hour:"2-digit",minute:"2-digit"});ee.textContent=ze;let ce=parseInt(ze.split(":")[0]);ce>=9&&ce<17?(L.style.background=l.successBg,L.style.color=l.success,L.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):ce>=8&&ce<9||ce>=17&&ce<19?(L.style.background=l.warningBg,L.style.color=l.warning,L.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(L.style.background=l.errorBg,L.style.color=l.error,L.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}Y.oninput=ne=>{let ae=parseInt(ne.target.value);r.setHours(Math.floor(ae/60)),r.setMinutes(ae%60),Q()},j.oninput=ne=>{let[ae,he]=ne.target.value.split(":");ae&&he&&(r.setHours(parseInt(ae)),r.setMinutes(parseInt(he)),Q())},Q()}function F(){A(),o||(o=setInterval(A,6e4))}function f(){o&&(clearInterval(o),o=null)}function C(){e=!e,ge(e,d,"cw-btn-timezone"),e?V("live"):f()}return document.body.appendChild(d),C}function So(){let t="v1.1",e=!1,o="general",n=null,a=null;if(!document.getElementById("cw-lib-styles")){let S=document.createElement("style");S.id="cw-lib-styles",S.innerHTML=`
            .cw-lib-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .cw-lib-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; border-color: rgba(0, 122, 255, 0.3) !important; }
            .cw-tactile { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.92) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #5F6368; }
            .cw-toolbar-btn:hover { background: #F1F3F4; color: #007AFF; border-color: #DADCE0; }
            .cw-toolbar-btn.active { background: #E8F0FE; color: #007AFF; border-color: #007AFF; }
        `,document.head.appendChild(S)}let i={bg:"#F0F2F5",surface:"#FFFFFF",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",text:"#1C1C1E",textSub:"#8E8E93",border:"rgba(0, 0, 0, 0.08)",danger:"#FF3B30"},s={container:{display:"flex",flexDirection:"column",height:"100%",background:i.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"12px 16px 0 16px",background:i.surface,borderBottom:`1px solid ${i.border}`},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:i.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",userSelect:"none"},tabActive:{color:i.primary,borderBottomColor:i.primary,fontWeight:"600"},listContainer:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"},emptyState:{padding:"40px 20px",textAlign:"center",color:"#BDC1C6",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},card:{background:i.surface,borderRadius:"16px",padding:"16px",border:`1px solid ${i.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative",overflow:"hidden"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},cardTitle:{fontSize:"14px",fontWeight:"600",color:i.text},cardPreview:{fontSize:"12px",color:i.textSub,lineHeight:"1.5",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"12px",paddingTop:"12px",borderTop:`1px dashed ${i.border}`},actionBtn:{padding:"6px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",cursor:"pointer",border:"none",background:"transparent",transition:"background 0.2s"},fab:{position:"absolute",bottom:"24px",right:"24px",width:"56px",height:"56px",borderRadius:"16px",background:i.primary,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"transform 0.2s",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.85)",backdropFilter:"blur(25px) saturate(180%)",webkitBackdropFilter:"blur(25px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"16px 24px",background:i.surface,borderBottom:`1px solid ${i.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"24px",overflowY:"auto"},inputGroup:{marginBottom:"20px"},label:{display:"block",fontSize:"12px",fontWeight:"700",color:i.textSub,marginBottom:"8px",textTransform:"uppercase"},input:{width:"100%",padding:"12px",borderRadius:"8px",border:`1px solid ${i.border}`,fontSize:"14px",fontFamily:"inherit",outline:"none",background:i.surface,boxSizing:"border-box"}},r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,pe,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let p=ue(r,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:r},()=>A());r.appendChild(p);let d=document.createElement("div");Object.assign(d.style,s.container),r.appendChild(d);let u=document.createElement("div");Object.assign(u.style,s.tabHeader);let x=[{id:"general",label:"Geral",icon:"\u{1F4CB}"},{id:"note",label:"Notas",icon:"\u{1F4DD}"},{id:"email",label:"Emails",icon:"\u{1F4E7}"}];x.forEach(S=>{let F=document.createElement("div");F.innerHTML=`${S.icon} ${S.label}`,F.id=`lib-tab-${S.id}`,Object.assign(F.style,s.tabBtn),S.id===o&&Object.assign(F.style,s.tabActive),F.onmouseenter=()=>G.playHover(),F.onclick=()=>J(S.id),u.appendChild(F)}),d.appendChild(u);let b=document.createElement("div");Object.assign(b.style,s.listContainer),d.appendChild(b);let g=document.createElement("div");g.className="cw-fab cw-tactile",Object.assign(g.style,s.fab),g.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',g.onmouseenter=()=>g.style.transform="scale(1.1)",g.onmouseleave=()=>g.style.transform="scale(1)",g.onclick=()=>I(),d.appendChild(g),n=document.createElement("div"),Object.assign(n.style,s.editorOverlay);let m=document.createElement("div");Object.assign(m.style,s.editorHeader),m.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let y=document.createElement("button");y.innerHTML="Cancelar",y.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",y.onclick=T,m.appendChild(y),n.appendChild(m);let v=document.createElement("div");Object.assign(v.style,s.editorBody),n.appendChild(v);let N=document.createElement("div");N.style.cssText="padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";let B=document.createElement("button");B.textContent="Salvar",B.style.cssText="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);",B.onclick=V,N.appendChild(B),n.appendChild(N),d.appendChild(n);let $=document.createElement("div");Object.assign($.style,Ae),$.className="no-drag",r.appendChild($),Ee(r,$),document.body.appendChild(r);function J(S){G.playClick(),o=S,x.forEach(F=>{let f=document.getElementById(`lib-tab-${F.id}`);F.id===S?Object.assign(f.style,s.tabActive):Object.assign(f.style,s.tabBtn)}),X()}function X(){b.innerHTML="";let S=xe.getSnippets(o);if(S.length===0){b.innerHTML=`
                <div style="${q(s.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;return}S.forEach(F=>{let f=document.createElement("div");f.className="cw-lib-card",Object.assign(f.style,s.card),F.isCode&&(f.style.borderLeft=`4px solid ${i.primary}`,f.style.background="rgba(0, 122, 255, 0.02)");let C=F.content;if(F.isRich){let O=document.createElement("div");O.innerHTML=F.content;let E=O.querySelector("img");C=O.innerText.substring(0,150)+(O.innerText.length>150?"...":""),E&&(C="\u{1F5BC}\uFE0F [Cont\xE9m Imagens] "+C)}f.innerHTML=`
                <div style="${q(s.cardHeader)}">
                    <div style="${q(s.cardTitle)}">${F.title}</div>
                    <div style="display:flex; gap:4px;">
                        ${F.isCode?'<span style="font-size:10px; background:#F1F3F4; color:#5F6368; padding:2px 6px; border-radius:4px; font-family:monospace;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>':""}
                    </div>
                </div>
                <div style="${q(s.cardPreview)}; ${F.isCode?"font-family:'Roboto Mono', monospace; font-size:11px;":""}">${C}</div>
                <div style="${q(s.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${q(s.actionBtn)}; color:#007AFF; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${q(s.actionBtn)}; color:#8E8E93; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${q(s.actionBtn)}; color:#FF3B30; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                    </button>
                </div>
            `,f.onmouseenter=()=>{G.playHover()},f.querySelector(".cw-act-copy").onclick=O=>{if(O.stopPropagation(),G.playClick(),F.isRich){let E=new Blob([F.content],{type:"text/html"}),_=document.createElement("div");_.style.whiteSpace="pre-wrap",_.innerHTML=F.content;let R=new Blob([_.innerText],{type:"text/plain"}),U=[new ClipboardItem({"text/html":E,"text/plain":R})];navigator.clipboard.write(U)}else navigator.clipboard.writeText(F.content);K("Copiado!")},f.querySelector(".cw-act-edit").onclick=O=>{O.stopPropagation(),G.playClick(),I(F)},f.querySelector(".cw-act-del").onclick=async O=>{O.stopPropagation(),G.playClick(),await fe("Excluir este item?")&&(xe.delete(F.id),X(),K("Item exclu\xEDdo."))},b.appendChild(f)})}function I(S=null){a=S?S.id:null,v.innerHTML="",v.appendChild(z("title","T\xEDtulo / Nome",S?S.title:"")),o==="email"&&v.appendChild(z("subject","Assunto do Email",S?S.subject:""));let F="Conte\xFAdo";o==="email"&&(F="Corpo do Email (HTML)"),o==="note"&&(F="Texto da Nota (Reason)"),v.appendChild(z("content",F,S?S.content:"",{isRich:!0,isCode:S?S.isCode:!1})),m.querySelector("span").textContent=S?"Editar Item":"Novo Item",n.style.transform="translateY(0)",setTimeout(()=>{let f=v.querySelector("input");f&&f.focus()},300)}function T(){n.style.transform="translateY(100%)",setTimeout(()=>a=null,300)}async function V(){let S=v.querySelector("#cw-inp-title"),F=v.querySelector("#cw-inp-content"),f=S.value.trim(),C=F.contentEditable==="true"?F.innerHTML:F.value.trim(),O=F.getAttribute("data-is-code")==="true";if(!f||!C||C==="<br>"){K("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let E={id:a,type:o,title:f,content:C,isCode:O,isRich:F.contentEditable==="true"};if(o==="email"){let _=v.querySelector("#cw-inp-subject").value.trim();if(!_){K("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}E.subject=_}B.textContent="Salvando...",await xe.save(E),B.textContent="Salvar",T(),X(),K("Salvo com sucesso!"),G.playSuccess()}function z(S,F,f,C={}){let O=document.createElement("div");Object.assign(O.style,s.inputGroup);let E=document.createElement("label");E.textContent=F,Object.assign(E.style,s.label);let _;if(C.isRich){let R=document.createElement("div");R.style.cssText="display:flex; gap:6px; margin-bottom:12px; background:rgba(241, 243, 244, 0.8); padding:6px; border-radius:12px; border:1px solid #DADCE0; backdrop-filter: blur(10px);",R.innerHTML=`
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
            `,_=document.createElement("div"),_.contentEditable="true",Object.assign(_.style,s.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),_.innerHTML=f||"",C.isCode&&(_.style.fontFamily="'Roboto Mono', monospace",_.style.backgroundColor="#F8F9FA",_.setAttribute("data-is-code","true")),R.querySelectorAll(".cw-toolbar-btn").forEach(U=>{U.onmouseenter=()=>G.playHover(),U.onmousedown=()=>G.playClick()}),R.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),_.focus()},R.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),_.focus()},R.querySelector(".cw-tb-code").onclick=U=>{let H=!(_.getAttribute("data-is-code")==="true");_.setAttribute("data-is-code",H),_.style.fontFamily=H?"'Roboto Mono', monospace":"inherit",_.style.backgroundColor=H?"rgba(0, 122, 255, 0.03)":i.surface,H?U.currentTarget.classList.add("active"):U.currentTarget.classList.remove("active"),_.focus()},R.querySelector(".cw-tb-img").onclick=async()=>{let U=await Ht("Cole a URL da imagem:");U&&(document.execCommand("insertImage",!1,U),_.querySelectorAll("img").forEach(H=>{H.style.maxWidth="100%",H.style.borderRadius="8px"}))},_.onpaste=U=>{let h=(U.clipboardData||U.originalEvent.clipboardData).items;for(let H of h)if(H.kind==="file"&&H.type.startsWith("image/")){U.preventDefault();let L=H.getAsFile(),M=new FileReader;M.onload=c=>{let k=`<img src="${c.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,k)},M.readAsDataURL(L)}},O.appendChild(E),O.appendChild(R)}else _=document.createElement("input"),_.type="text",Object.assign(_.style,s.input),_.value=f||"",O.appendChild(E);return _.id=`cw-inp-${S}`,_.onfocus=()=>{_.style.borderColor=i.primary,_.style.boxShadow=`0 0 0 2px ${i.primaryBg}`},_.onblur=()=>{_.style.borderColor=i.border,_.style.boxShadow="none"},O.appendChild(_),O}function q(S){return Object.entries(S).map(([F,f])=>`${F.replace(/[A-Z]/g,C=>"-"+C.toLowerCase())}:${f}`).join(";")}function A(){e=!e,ge(e,r,"cw-btn-library"),e&&X()}return A}function Co(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},n="cw-configs-styles";if(!document.getElementById(n)){let x=document.createElement("style");x.id=n,x.innerHTML=`
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
        `,document.head.appendChild(x)}let a=document.createElement("div");a.id="configs-popup",a.classList.add("cw-module-window"),Object.assign(a.style,pe,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let s=ue(a,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:a},()=>u());a.appendChild(s);let r=document.createElement("div");r.className="cw-configs-container",a.appendChild(r);let l=document.createElement("div");l.className="cw-configs-section",l.innerHTML=`
        <div class="cw-configs-section-title">Prefer\xEAncias de Som</div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label">Efeitos Sonoros</div>
                    <div class="cw-configs-desc">Ativar ou desativar sons de interface.</div>
                </div>
                <input type="checkbox" id="cw-config-sound-toggle" ${G.isMuted()?"":"checked"} style="cursor:pointer; width:20px; height:20px;">
            </div>
        </div>
    `;let p=l.querySelector("#cw-config-sound-toggle");p.onchange=x=>{G.setMuted(!x.target.checked),x.target.checked&&G.playClick()},r.appendChild(l);let d=document.createElement("div");d.className="cw-configs-section",d.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugest\xF5es</a>
            </div>
        </div>
    `,r.appendChild(d);function u(){e=!e,ge(e,a,"cw-btn-configs"),e&&G.playClick()}return document.body.appendChild(a),u}function Uo(){if(window.techSolInitialized){bt();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{_t();try{G.initGlobalListeners(),G.playStartup()}catch(p){console.warn("\xC1udio bloqueado:",p)}le.fetchTips(),bt();let e=so(),o=po(),n=mo(),a=fo(),i=wo(),s=So(),r=Co(),l=bo();Zt({toggleNotes:e,toggleEmail:o,toggleScript:n,toggleLinks:a,toggleTimezone:i,toggleLibrary:s,toggleConfigs:r,broadcastControl:l}),setTimeout(()=>{le.logEvent("App","Start","Session Start"),xo(),setTimeout(()=>{yo(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),K("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Uo();})();
