(()=>{var vo=Object.defineProperty;var wo=(t,e)=>()=>(t&&(e=t(t=0)),e);var So=(t,e)=>{for(var o in e)vo(t,o,{get:e[o],enumerable:!0})};var Ye={};So(Ye,{NotesState:()=>We,notesState:()=>U});var We,U,Be=wo(()=>{We=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.excludedFields=new Set,this.favorites=new Set(JSON.parse(localStorage.getItem("cw-notes-favorites")||"[]")),this.screenshotMode="implementation"}setCaseType(e){this.currentCaseType=e,this.notify()}setLanguage(e){this.currentLang=e,this.notify()}setPortugalCase(e){this.isPortugalCase=e,this.notify()}setConsent(e){this.consent=e,this.notify()}setTagSupportUsed(e){this.tagSupportUsed=e,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.notify()}toggleFieldExclusion(e,o){o?this.excludedFields.add(e):this.excludedFields.delete(e),this.notify()}setStatus(e){this.currentStatus=e,this.notify()}setSubStatus(e){this.currentSubStatus=e,this.notify()}setScreenshotMode(e){this.screenshotMode=e,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]=o,this.isDirty=!0,this.notify()}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},U=new We});var $e="",Ve="",St=t=>new Promise(e=>setTimeout(e,t));async function Ct(){if($e&&Ve)return $e;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await St(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let i=document.querySelector("profile-details img");if(i&&i.src.includes("/photos/")){let a=i.src.match(/\/photos\/([^\?]+)/)[1];e=a.charAt(0).toUpperCase()+a.slice(1)}}let n=document.querySelector("profile-details .email");return n&&(Ve=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Ve)),t.click(),document.body.click(),$e=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function st(){return $e||"Consultor"}function Ae(){return Ve||null}function At(t){let e=new Date,o=e.getHours(),n=e.getDay(),i="Ol\xE1",a="";o>=5&&o<12?(i="Bom dia",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(i="Boa tarde",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(i="Boa noite",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let r=[];o>=0&&o<5?r=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?n===1?r=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?r=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:r=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?r=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:r=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(r=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let s=r[Math.floor(Math.random()*r.length)];return{prefix:`${i},`,name:t,suffix:s,icon:a,isFriday:n===5}}async function Co(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,n=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');n&&(n.click(),await St(500));let a=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(r=>{let s=r.innerText.trim();return s.includes("@")&&!s.includes("Is this:")&&s.toLowerCase()!=="email"});return a?a.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Ao(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function Eo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label")).find(i=>i.textContent.includes("Google Ads External Customer ID")||i.textContent.includes("Customer ID"));if(e){let i=e.closest("home-data-item")||e.parentElement;if(i){let a=i.querySelector(".data-pair-content");if(a)return a.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let n=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(n)return n[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"---"}async function he(){let t="Cliente",e="[INSERIR URL]";try{let r=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(r&&r.nextElementSibling){let s=r.nextElementSibling.innerText.trim();s&&(t=s)}}catch(a){console.warn("Falha Nome:",a)}try{let r=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(r&&r.nextElementSibling){let s=r.nextElementSibling.innerText.trim();s&&(e=s)}}catch(a){console.warn("Falha URL:",a)}let o=await Co(),n=Ao(),i=Eo();return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:n,cid:i,agentName:st()}}var Fe=null,lt=null,ye=.3;var ve=localStorage.getItem("cw_sounds_muted")==="true";function Oe(){if(!Fe){let t=window.AudioContext||window.webkitAudioContext;t&&(Fe=new t)}return Fe&&Fe.state==="suspended"&&Fe.resume(),Fe}function Et(t){if(lt)return lt;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),n=o.getChannelData(0);for(let i=0;i<e;i++)n[i]=Math.random()*2-1;return lt=o,o}var P={setMuted:t=>{ve=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>ve,playClick:()=>{if(ve)return;let t=Oe();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Et(t);let n=t.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let i=t.createGain();i.gain.setValueAtTime(ye*.8,e),i.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(n),n.connect(i),i.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(ve)return;let t=Oe();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(ye*.1,e+.005),n.gain.linearRampToValueAtTime(0,e+.02),o.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(ve)return;let t=Oe();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((n,i)=>{let a=t.createOscillator(),r=t.createGain();a.type="sine",a.frequency.value=n,r.gain.setValueAtTime(0,e),r.gain.linearRampToValueAtTime(ye*.6,e+.05),r.gain.exponentialRampToValueAtTime(.001,e+.6),a.connect(r),r.connect(t.destination),a.start(e),a.stop(e+.7)})},playGenieOpen:()=>{if(ve)return;let t=Oe();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Et(t);let n=t.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,e),n.frequency.exponentialRampToValueAtTime(800,e+.2);let i=t.createGain();i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(ye*.5,e+.05),i.gain.linearRampToValueAtTime(0,e+.25),o.connect(n),n.connect(i),i.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(ve)return;let t=Oe();if(!t)return;let e=t.currentTime,o=t.createOscillator(),n=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),n.gain.setValueAtTime(ye,e),n.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(ve)return;let t=Oe();if(!t)return;let e=t.currentTime,o=.12,n=t.createOscillator(),i=t.createGain(),a=t.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,e),n.frequency.exponentialRampToValueAtTime(50,e+.1),a.type="lowpass",a.frequency.setValueAtTime(800,e),a.frequency.exponentialRampToValueAtTime(100,e+.1),i.gain.setValueAtTime(ye*4,e),i.gain.exponentialRampToValueAtTime(.001,e+.1),n.connect(a),a.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.12);let r=t.createOscillator(),s=t.createGain();r.type="sine",r.frequency.setValueAtTime(150,e),r.frequency.exponentialRampToValueAtTime(50,e+.15),s.gain.setValueAtTime(ye*1.5,e),s.gain.exponentialRampToValueAtTime(.001,e+.15),r.connect(s),s.connect(t.destination),r.start(e),r.stop(e+.15),[55,55.4,110.5].forEach(l=>{let c=t.createOscillator(),h=t.createGain(),u=t.createBiquadFilter();c.type="sawtooth",c.frequency.value=l,u.type="lowpass",u.frequency.setValueAtTime(30,e),u.frequency.linearRampToValueAtTime(900,e+o+.2),u.frequency.exponentialRampToValueAtTime(40,e+3),h.gain.setValueAtTime(0,e),h.gain.linearRampToValueAtTime(ye*.6,e+o+.1),h.gain.exponentialRampToValueAtTime(.001,e+3.5),c.connect(u),u.connect(h),h.connect(t.destination),c.start(e),c.stop(e+3.6)})},playNotification:()=>{if(ve)return;let t=Oe();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.setValueAtTime(n.freq,e),a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(ye*n.vol,e+.004),a.gain.exponentialRampToValueAtTime(.001,e+n.dur),i.connect(a),a.connect(t.destination),i.start(e),i.stop(e+n.dur+.1)})},playSwoosh:()=>{P.playGenieOpen()},playReset:()=>{P.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!Fe)return;let n=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(o.relatedTarget))return;let i=Date.now();i-t<e||(P.playHover(),t=i)},{passive:!0})}};var Tt=1e4;function Ot(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function H(t,e={}){let o=document.createElement("div"),n=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?P.playError():P.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function Ft(t,e=null){let o=0,n=0,i=0,a=0,r=e||t;r.style.cursor="grab",r.onmousedown=s;function s(c){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(c.target.tagName)||c.target.closest(".no-drag"))return;c=c||window.event,r.style.cursor="grabbing",t.style.transition="none";let h=t.getBoundingClientRect();t.style.transform="none",t.style.left=h.left+"px",t.style.top=h.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",Tt++,t.style.zIndex=Tt,i=c.clientX,a=c.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=l,document.onmousemove=p}function p(c){c=c||window.event,c.preventDefault(),o=i-c.clientX,n=a-c.clientY,i=c.clientX,a=c.clientY;let h=t.offsetTop-n,u=t.offsetLeft-o,m=16,g=window.innerWidth,d=window.innerHeight,S=t.offsetWidth,E=t.offsetHeight;u<m?u=m:u+S>g-m&&(u=g-S-m),h<m?h=m:h+E>d-m&&(h=d-E-m),t.style.top=h+"px",t.style.left=u+"px"}function l(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var se={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var dt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Ue={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var It={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var ze={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var ct=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],kt=-1;function qt(){let t=Math.floor(Math.random()*ct.length);return t===kt&&(t=(t+1)%ct.length),kt=t,ct[t]}var we=t=>new Promise(e=>setTimeout(e,t));async function To(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await we(200);for(let n=0;n<e.length;n++){let i=e.charAt(n),a=document.createElement("span");a.textContent=i,o&&o.parentNode===t?o.before(a):t.appendChild(a);let r=Math.floor(Math.random()*60)+30;n===0&&(r=150),n>e.length-3&&(r=30),await we(r)}await we(600),o&&(o.style.display="none")}async function pt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await we(200);let e=await Ct(),o=At(e),n=t.querySelector("#w-icon"),i=t.querySelector("#p1"),a=t.querySelector("#p2"),r=t.querySelector("#p3"),s=t.querySelector("#p-sextou");n&&(n.innerHTML=o.icon),i&&(i.textContent=o.prefix),r&&(r.textContent=o.suffix),await we(300);let p=n?n.querySelector("svg"):null;if(p&&(p.style.opacity="1",p.style.transform="scale(1)"),await we(400),i&&(i.style.opacity="1"),P.playStartup(),a&&await To(a,o.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),o.isFriday&&s){await we(400),s.style.display="block",s.offsetWidth;let l=s.querySelector(".sextou-badge");l&&(l.style.opacity="1",l.style.transform="scale(1)")}await we(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await we(900),t.parentNode&&t.parentNode.removeChild(t)}}var Ee={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Te(t,e){e.onmousedown=o;function o(n){n.stopPropagation(),n.preventDefault();let i=t.style.transition;t.style.transition="none";let a=n.clientX,r=n.clientY,s=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),p=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),l=a,c=r,h=!1;function u(d){l=d.clientX,c=d.clientY,h||(window.requestAnimationFrame(()=>{m(),h=!1}),h=!0)}function m(){let d=s+(l-a),S=p+(c-r);d>360&&(t.style.width=d+"px"),S>300&&(t.style.height=S+"px")}function g(){document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",g),setTimeout(()=>{t.style.transition=i},50)}document.addEventListener("mousemove",u),document.addEventListener("mouseup",g)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function Lt(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function _t(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function Mt(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function ge(t,e={}){return new Promise(o=>{let n=_t(),i=Mt(),a=e.danger?"#FF3B30":"#007AFF",r=e.confirmText||(e.danger?"Excluir":"Confirmar");i.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${a}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${r}</button>
            </div>
        `,n.appendChild(i),document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity=1,i.style.transform="scale(1)"});let s=c=>{n.style.opacity=0,i.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(c)},300)},p=i.querySelector("#cw-conf-cancel"),l=i.querySelector("#cw-conf-ok");[p,l].forEach(c=>c.onmouseenter=()=>P.playHover()),p.onclick=()=>{P.playClick(),s(!1)},l.onclick=()=>{P.playClick(),s(!0)}})}function Nt(t,e=""){return new Promise(o=>{let n=_t(),i=Mt();i.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,n.appendChild(i),document.body.appendChild(n);let a=i.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{n.style.opacity=1,i.style.transform="scale(1)",setTimeout(()=>a.focus(),100)});let r=l=>{n.style.opacity=0,i.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(l)},300)},s=i.querySelector("#cw-prompt-cancel"),p=i.querySelector("#cw-prompt-ok");[s,p].forEach(l=>l.onmouseenter=()=>P.playHover()),s.onclick=()=>{P.playClick(),r(null)},p.onclick=()=>{P.playClick(),r(a.value)},a.onkeydown=l=>{l.key==="Enter"&&p.click(),l.key==="Escape"&&s.click()}})}Be();var ko={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Dt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function le(t,e,o,n,i,a){let r=document.createElement("div");Object.assign(r.style,ko),Ft(t,r);let s=document.createElement("div");Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),r.appendChild(s),i&&(i.googleLine=s);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"12px"});let l=document.createElement("img");l.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(l.style,{width:"20px",height:"20px",pointerEvents:"none"});let c=document.createElement("span");c.textContent=e,p.appendChild(l),p.appendChild(c);let h=document.createElement("div");Object.assign(h.style,{display:"flex",alignItems:"center",gap:"4px"});let u='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',m='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',g=document.createElement("div");g.innerHTML=u,Object.assign(g.style,Dt),g.title="Sobre & Feedback",g.classList.add("no-drag"),g.onmouseenter=()=>{g.style.background="rgba(255,255,255,0.1)",g.style.color="#FFF"},g.onmouseleave=()=>{g.style.color!=="rgb(138, 180, 248)"&&(g.style.background="transparent",g.style.color="#9AA0A6")};let d=document.createElement("div");d.innerHTML=m,Object.assign(d.style,Dt),d.title="Fechar",d.classList.add("no-drag"),d.onmouseenter=()=>{d.style.background="rgba(242, 139, 130, 0.2)",d.style.color="#F28B82"},d.onmouseleave=()=>{d.style.background="transparent",d.style.color="#9AA0A6"},d.onmousedown=E=>E.stopPropagation(),g.onmousedown=E=>E.stopPropagation(),d.onclick=a;let S=Oo(t,e,o,n);return g.onclick=E=>{E.stopPropagation(),S.style.opacity==="1"?(S.style.opacity="0",S.style.pointerEvents="none",g.style.color="#9AA0A6",g.style.background="transparent"):(S.style.opacity="1",S.style.pointerEvents="auto",g.style.color="#8AB4F8",g.style.background="rgba(138, 180, 248, 0.1)")},h.appendChild(g),h.appendChild(d),r.appendChild(p),r.appendChild(h),r}function Oo(t,e,o,n){let i=document.createElement("div");return Object.assign(i.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),i.innerHTML=`
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
    `,setTimeout(()=>{let a=i.querySelector("#cw-feedback-link");a&&(a.onmouseenter=()=>{a.style.backgroundColor="#E8F0FE",a.style.transform="scale(1.02)"},a.onmouseleave=()=>{a.style.backgroundColor="#F8F9FA",a.style.transform="scale(1)"});let r=i.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{i.style.opacity="0",i.style.pointerEvents="none"})},0),t.appendChild(i),i}function Rt(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,se,{right:"100px",width:"480px",height:"700px",display:"flex",flexDirection:"column",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let n={popup:o,googleLine:null},i=le(o,"Case Notes",t,"Gera notas padronizadas.",n,e);o.appendChild(i);let a=document.createElement("div");a.className="cw-popup-content",Object.assign(a.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"16px"}),o.appendChild(a);let r=document.createElement("div");r.textContent="created by lucaste@",Object.assign(r.style,It),r.style.marginTop="auto",o.appendChild(r);let s=document.createElement("div");return Object.assign(s.style,Ee),s.className="no-drag",o.appendChild(s),Te(o,s),Fo(),{popup:o,content:a,header:i,animRefs:n,credit:r}}function Fo(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 6px; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; }
        .cw-input, .cw-textarea, .cw-select { width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid #dadce0; font-size: 14px; font-family: 'Google Sans', Roboto, sans-serif; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-sizing: border-box; background: #fff; }
        .cw-select { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px; padding-right: 40px !important; }
        .cw-input:focus, .cw-textarea:focus, .cw-select:focus { border-color: #1a73e8; outline: none; box-shadow: 0 0 0 2px rgba(26,115,232,0.1); }
        .cw-textarea { min-height: 80px; resize: vertical; }
        .cw-section-title { font-size: 12px; font-weight: 700; color: #5f6368; text-transform: uppercase; letter-spacing: 0.8px; margin: 16px 0 8px 0; }
        .cw-scenario-module { border: 1px solid #eee; border-radius: 12px; padding: 12px; background: #f8f9fa; }
        .cw-scenario-tabs { display: flex; gap: 4px; margin-bottom: 12px; background: #eee; padding: 4px; border-radius: 8px; }
        .cw-tab { flex: 1; text-align: center; padding: 6px; font-size: 12px; font-weight: 600; cursor: pointer; border-radius: 6px; color: #5f6368; transition: all 0.2s; }
        .cw-tab.active { background: #fff; color: #1a73e8; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .cw-scenario-list { display: flex; flex-wrap: wrap; gap: 6px; max-height: 150px; overflow-y: auto; margin-bottom: 12px; }
        .cw-scenario-chip { padding: 4px 10px; border-radius: 100px; background: #fff; border: 1px solid #dadce0; font-size: 12px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .cw-scenario-chip:hover { border-color: #1a73e8; background: #e8f0fe; }
        .cw-scenario-preview { font-size: 11px; color: #80868b; font-style: italic; min-height: 2em; line-height: 1.4; border-top: 1px dashed #dadce0; paddingTop: 8px; }
        .cw-btn-primary { background: #1a73e8; color: #fff; border: none; border-radius: 8px; padding: 10px 20px; font-weight: 500; cursor: pointer; transition: background 0.2s; }
        .cw-btn-primary:hover { background: #1765cc; }
        .cw-btn-secondary { background: #5f6368; color: #fff; border: none; border-radius: 8px; padding: 10px 20px; font-weight: 500; cursor: pointer; transition: background 0.2s; }
        .cw-btn-secondary:hover { background: #4f5257; }
    `,document.head.appendChild(t)}var ce={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria (com um link para https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:",reason_comments:"Reason/Comments:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:",reason_comments:"Reason/Comments:"}},be={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Se={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Me={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Ne=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Xe=["CONSIDERACOES","COMENTARIOS"],zt={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 2 -`}};var De=t=>new Promise(e=>setTimeout(e,t));function Ge(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var Bt="cw-automation-styles";if(!document.getElementById(Bt)){let t=document.createElement("style");t.id=Bt,t.innerHTML=`
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
    `,document.head.appendChild(t)}function Gt(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function Pt(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),o="";Gt(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(Ge(n),await De(1200));let i=document.querySelector("search-filter dropdown-button .button");if(i&&!(i.innerText||"").includes("All")){Ge(i),await De(600);let u=document.querySelector('material-checkbox[debug-id="check-all-box"]');u&&u.getAttribute("aria-checked")!=="true"&&(Ge(u),await De(300));let m=document.querySelector('material-button[debug-id="apply-filter"]');m&&(Ge(m),await De(1500))}let a=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");a&&(a.scrollTop=a.scrollHeight,await De(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let h=r.length-1;h>=0;h--){let u=r[h],m=u.querySelector("i.material-icons-extended"),g=m&&m.innerText.trim()==="phone_in_talk",d=u.innerText||"",S=d.includes("Agent joined")||d.includes("outbound-call")||d.includes("Speakeasy");if(g||S){u.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",u),e&&(e.placeholder="Lendo mensagem..."),Ge(u),await De(1e3));break}}let p=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),l=/Speakeasy.*?(P\d{15,25})/i,c=null;for(let h=p.length-1;h>=0;h--){let u=p[h];if(u.offsetParent===null)continue;let m=(u.innerText||"").match(l);if(m&&m[1]){c=m[1];break}}if(e)if(c){try{await navigator.clipboard.writeText(c)}catch{}e.value=c,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),P.playSuccess(),H(`ID Localizado: ${c}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else P.playError(),H("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),H("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),Gt(!1)}}function jt(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,n=this.selectionEnd,i=this.value,a=i.lastIndexOf(`
`,o-1)+1,r=i.substring(a,o);if(e.key==="Enter"){e.preventDefault();let s=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=i.substring(0,a)+`
`+i.substring(n),this.selectionStart=this.selectionEnd=a+1;return}let p=`
`+s;this.value=i.substring(0,o)+p+i.substring(n),this.selectionStart=this.selectionEnd=o+p.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?r.startsWith("  ")&&(this.value=i.substring(0,a)+r.substring(2)+i.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=i.substring(0,a)+"  "+r+i.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===n&&o>0){let s=i.substring(0,o);s.endsWith("\u2022 ")?(e.preventDefault(),this.value=s.substring(0,o-2)+i.substring(n),this.selectionStart=this.selectionEnd=o-2):s.endsWith("  ")&&r.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=s.substring(0,o-2)+i.substring(n),this.selectionStart=this.selectionEnd=o-2)}}))}function Ke(t,e,o){e.innerHTML="";let n=Se[t];if(!n)return;let i=n.template.match(/{([A-Z0-9_]+)}/g)||[],a=[...new Set(i)],r=!1;if(a.forEach(s=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(s))return;let p=s.slice(1,-1),l=`field-${p}`;if(o.excludedFields.has(l))return;let c=document.createElement("label"),h=g=>ce[o.currentLang]?.[g]||ce.pt?.[g]||g;c.textContent=h(p.toLowerCase())!==p.toLowerCase()?h(p.toLowerCase()):p.replace(/_/g," ").replace(/\b\w/g,g=>g.toUpperCase())+":",Object.assign(c.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"});let u=document.createElement("span");if(u.textContent=c.textContent,c.innerHTML="",c.appendChild(u),p==="SPEAKEASY_ID"){let g=document.createElement("button");g.innerHTML="\u2728 Auto Busca",g.style.cssText="font-size: 11px; font-weight: 500; color: #0b57d0; background-color: #d3e3fd; border: none; border-radius: 100px; padding: 5px 12px; margin-left: 10px; cursor: pointer;",g.onclick=d=>{d.preventDefault(),Pt(l)},c.appendChild(g)}if(r){let g=document.createElement("button");g.innerHTML="\u2715",g.style.cssText="font-size: 12px; background: none; border: none; color: #5f6368; cursor: pointer; padding: 4px; margin-left: auto;",g.onclick=d=>{d.preventDefault(),o.toggleFieldExclusion(l,!0),Ke(t,e,o)},c.appendChild(g)}p==="REASON_COMMENTS"&&(r=!0);let m;Ne.includes(p)?(m=document.createElement("textarea"),m.classList.add("bullet-textarea","cw-textarea"),jt(m)):Xe.includes(p)?(m=document.createElement("textarea"),m.classList.add("cw-textarea")):(m=document.createElement("input"),m.type="text",m.classList.add("cw-input")),p==="ON_CALL"&&o.currentCaseType==="lm"&&(c.style.display="none",m.style.display="none",m.value="N/A"),m.id=l,m.value=o.formData[l]||"",m.addEventListener("input",g=>o.updateField(l,g.target.value)),e.appendChild(c),e.appendChild(m)}),o.isPortugalCase){let s=c=>ce[o.currentLang]?.[c]||ce.pt?.[c]||c,p=document.createElement("label");p.textContent=s("consentiu_gravacao"),Object.assign(p.style,{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"});let l=document.createElement("select");l.className="cw-select",l.innerHTML=`
            <option value="false">${s("nao")}</option>
            <option value="true">${s("sim")}</option>
        `,l.value=o.consent?"true":"false",l.onchange=()=>o.setConsent(l.value==="true"),e.appendChild(p),e.appendChild(l)}}function ut(t,e,o){let n=t.currentSubStatus;if(!n)return null;let a=Se[n].template.replace(/\n/g,"<br>"),r='style="margin-bottom: 12px; padding-left: 30px;"',s=[],p="",l=e.getCheckedElements();l.length>0&&l.forEach(u=>{let m=u.value,g=be[m],d=u.count||1,S=m==="ads_conversion_tracking"||m==="ads_enhanced_conversions";if(t.tagSupportUsed&&S&&!t.forcedScreenshots.has(m)){let N=z=>ce[t.currentLang]?.[z]||ce.pt?.[z]||z;s.push(`${g.name} - ${N("ts_output_disclaimer")}`)}else s.push(d>1?`${g.name} (x${d})`:g.name)});let c=e.screenshotsElement;if(c){let u=Array.from(c.querySelectorAll('input[id^="name-"]'));u.length>0&&u.forEach(m=>{let g=m.value,d=m.closest(".cw-screen-card");if(d){let S=d.querySelectorAll('input[id^="screen-"]'),E=!1,N="";S.forEach(z=>{let V=z.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",j=z.value.trim();N+=`<li>${V} -${j?" "+j:""}</li>`,E=!0}),E&&(p+=`<b>${g}</b><ul ${r}>${N}</ul>`)}})}a.includes("{TAGS_IMPLEMENTED}")?a=a.replace(/{TAGS_IMPLEMENTED}/g,s.join(", ")||"N/A"):s.length>0&&(a+=`<br><b>Tags:</b> ${s.join(", ")}<br>`),a.includes("{SCREENSHOTS_LIST}")?a=a.replace(/{SCREENSHOTS_LIST}/g,p||"N/A"):p!==""&&(a+=`<br>${p}`);let h=u=>ce[t.currentLang]?.[u]||ce.pt?.[u]||u;if(t.isPortugalCase){let u=t.consent?h("sim"):h("nao");a=a.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${h("consentiu_gravacao")}</b> ${u}<br><br>`).replace(/{CASO_PORTUGAL}/g,`<br><b>${h("caso_portugal")}</b> ${h("sim")}<br>`)}else a=a.replace(/{CASO_PORTUGAL}/g,"").replace(/{CONSENTIU_GRAVACAO}/g,"");for(let u in t.formData){if(t.excludedFields.has(u)){let E=u.replace("field-",""),N=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${E}\\}(?:<br>\\s*)?`,"gi");a=a.replace(N,"").replace(new RegExp(`{${E}}`,"g"),"");continue}let m=u.replace("field-",""),g=new RegExp(`{${m}}`,"g"),d=t.formData[u];if(Ne.includes(m)&&d.trim()!==""){let E=d.split(`
`).map(N=>N.trim()).filter(N=>N!==""&&N!=="\u2022").map(N=>N.startsWith("\u2022 ")?N.substring(2):N).map(N=>`<li>${N}</li>`).join("");d=E?`<ul ${r}>${E}</ul>`:""}else Xe.includes(m)&&(d=d.split(`
`).filter(E=>E.trim()!=="").map(E=>`<p style="margin: 0 0 8px 0;">${E}</p>`).join(""));let S=d.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(S===""||S==="\u2022"||S.toLowerCase()==="n/a"){let E=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${m}\\}(?:<br>\\s*)?`,"gi");a=a.replace(E,"").replace(g,"")}else a=a.replace(g,d.replace(/\$/g,"$$$$"))}return a=a.replace(/{([A-Z0-9_]+)}/g,"").replace(/(<br>){3,}/g,"<br><br>"),o?.getOutput&&(a+=o.getOutput()),a}var Io="https://script.google.com/a/macros/google.com/s/AKfycbwUfiKDvybLzt18mWoQJvkXqsRGQYqZ4JXzF8bLHMsxtYzlFPehz-ehoWs6215Wj6uFLA/exec",mt="cw_data_broadcast",Ht="cw_data_tips",qo=["Processando...","Mantenha o foco!","Aguarde..."];function Pe(t,e={}){return new Promise((o,n)=>{let i="cw_cb_"+Math.round(1e5*Math.random()),a=document.createElement("script");window[i]=p=>{document.body.contains(a)&&document.body.removeChild(a),delete window[i],o(p)};let r=Object.keys(e).map(p=>encodeURIComponent(p)+"="+encodeURIComponent(e[p])).join("&"),s=`${Io}?op=${t}&callback=${i}&t=${Date.now()}&${r}`;a.src=s,a.onerror=()=>{document.body.contains(a)&&document.body.removeChild(a),delete window[i],n(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(a)})}var oe={fetchTips:async()=>{try{let t=await Pe("tips");t?.tips&&localStorage.setItem(Ht,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await Pe("broadcast");if(t?.broadcast)return localStorage.setItem(mt,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(mt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(mt)||"[]"),getRandomTip:()=>{let t=qo,e=localStorage.getItem(Ht);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await oe._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await oe._performOp("update_broadcast",o)},deleteBroadcast:async t=>await oe._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`\u{1F4E4} Executando ${t}...`,e);let o=await Pe(t,e);return o&&o.status==="success"?(console.log("\u2705 Sucesso:",t),!0):(console.warn("\u26A0\uFE0F Falha:",o),!1)}catch(o){return console.error("\u274C Erro JSONP:",o),!1}},logEvent:(t,e,o="",n=null)=>{try{let i="anon";try{let r=Ae();r&&(i=r.split("@")[0].toLowerCase())}catch{}let a={timestamp:new Date().toISOString(),user:i,version:"v5.1",category:t,action:e,label:o,value:n||""};Pe("log",a).catch(r=>{})}catch(i){console.warn("Analytics error",i)}},logUsage:()=>{},getUserSnippets:async t=>{try{return await Pe("get_user_snippets",{user:t})}catch(e){return console.warn("Erro ao buscar snippets:",e),null}},saveSnippet:async(t,e)=>{let o={...t,user:e};return await oe._performOp("save_snippet",o)},deleteSnippet:async(t,e)=>await oe._performOp("delete_snippet",{id:t,user:e})};var $t="cw_personal_library_v1",ie={getSnippets:(t="all")=>{let e=ie._loadFromLocal(),o=Ae();return o&&o.includes("@")&&ie._syncWithServer(o),t==="all"?e:e.filter(n=>n.type===t)},save:async t=>{let e=Ae();if(!e)return H("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;let o=ie._loadFromLocal(),n=new Date().toISOString(),i={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:n},a=o.filter(r=>r.id!==i.id);return a.unshift(i),ie._saveToLocal(a),oe.saveSnippet(i,e).then(r=>{r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}),i},delete:async t=>{let e=Ae(),n=ie._loadFromLocal().filter(i=>i.id!==t);return ie._saveToLocal(n),e&&oe.deleteSnippet(t,e),!0},_syncWithServer:async t=>{console.log("\u{1F504} Sincronizando biblioteca...");let e=await oe.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,n=ie._loadFromLocal(),i=JSON.stringify(o),a=JSON.stringify(n);i!==a&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),ie._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem($t)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem($t,JSON.stringify(t))}};var Lo={COMMUNITY_LDAP:"community-scenarios@google.com"},Vt={getPersonalScenarios:()=>ie.getSnippets("scenario"),saveScenario:async t=>ie.save({...t,type:"scenario"}),deleteScenario:async t=>ie.delete(t),getSharedScenarios:async(t=Lo.COMMUNITY_LDAP)=>{try{let e=await oe.getUserSnippets(t);if(e?.status==="success")return e.snippets||[]}catch{}return[]},getDefaultScenarios:()=>zt};function Ut(t,e){let o=document.createElement("div");o.className="cw-scenario-module";let n=new Set,i=`
        .cw-scenario-module {
            background: rgba(255, 255, 255, 0.7) !important;
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            border-radius: 16px !important;
            padding: 16px !important;
            box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.1);
        }
        .cw-scenario-tabs {
            background: rgba(120, 120, 128, 0.12) !important;
            padding: 2px !important;
            border-radius: 10px !important;
            margin-bottom: 16px !important;
        }
        .cw-tab {
            flex: 1;
            border-radius: 8px !important;
            padding: 8px 0 !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            color: #5f6368 !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
            cursor: pointer;
            text-align: center;
        }
        .cw-tab.active {
            background: #ffffff !important;
            color: #1a73e8 !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1) !important;
        }
        .cw-scenario-chip.selected {
            background: #e8f0fe !important;
            border-color: #1a73e8 !important;
            color: #1a73e8 !important;
            box-shadow: 0 2px 4px rgba(26, 115, 232, 0.2) !important;
        }
        .cw-scenario-chip {
            background: #ffffff !important;
            border: 1px solid #e5e5ea !important;
            border-radius: 12px !important;
            padding: 6px 12px !important;
            font-size: 13px !important;
            color: #1c1c1e !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .cw-scenario-chip:hover {
            background: #f2f2f7 !important;
            transform: translateY(-1px);
        }
        .cw-scenario-search input {
            width: 100%;
            padding: 8px 12px;
            border-radius: 10px;
            border: none;
            background: rgba(120, 120, 128, 0.1);
            font-size: 13px;
            margin-bottom: 12px;
            outline: none;
        }
    `;if(!document.getElementById("cw-scenario-refined-styles")){let p=document.createElement("style");p.id="cw-scenario-refined-styles",p.innerText=i,document.head.appendChild(p)}let a="",r=()=>{let p=l=>ce[e.currentLang]?.[l]||ce.pt?.[l]||l;if(o.innerHTML=`
            <div class="cw-scenario-header">
                <div style="display:flex; align-items:center; gap:8px;">
                    <div class="cw-section-title" style="margin-top:0">${p("cenarios_comuns")}</div>
                    <button class="cw-btn-help-scenarios" title="${p("ajuda_scenarios")}">?</button>
                </div>
                <div class="cw-scenario-search">
                    <input type="text" placeholder="Buscar cen\xE1rios..." value="${a}">
                </div>
            </div>
            <div class="cw-scenario-list"></div>
            <div class="cw-scenario-preview">Passe o mouse para ver os detalhes</div>
        `,o.querySelector(".cw-scenario-search input").oninput=l=>{a=l.target.value.toLowerCase(),s()},o.querySelector(".cw-btn-help-scenarios").onclick=l=>{l.preventDefault(),alert(p("ajuda_scenarios_desc"))},!document.getElementById("cw-help-btn-style")){let l=document.createElement("style");l.id="cw-help-btn-style",l.innerHTML=`
                .cw-btn-help-scenarios {
                    width: 20px; height: 20px; border-radius: 50%; border: 1px solid #dadce0;
                    background: #f8f9fa; color: #5f6368; font-size: 12px; cursor: pointer;
                    display: flex; align-items: center; justify-content: center; font-weight: bold;
                }
                .cw-btn-help-scenarios:hover { background: #eee; }
            `,document.head.appendChild(l)}s()},s=async()=>{let p=o.querySelector(".cw-scenario-list");p.innerHTML="<div class='cw-loading'>Carregando...</div>";let l=Vt.getDefaultScenarios(),c=e.currentSubStatus,h=Object.entries(l).filter(([u])=>c.startsWith("NI_")?u.includes("-ni-")||u.includes("attempted"):c.startsWith("SO_")?u.includes("gtm")||u.includes("whatsapp")||u.includes("form")||u.includes("ecw4")||u.includes("ga4"):c.startsWith("AS_")?u.includes("-as-"):c.startsWith("IN_")?u.includes("-in-"):c.startsWith("DC_")?u.includes("-dc-"):!0).map(([u,m])=>({id:u,title:u.replace("quickfill-","").replace(/-/g," "),content:m}));if(h=h.filter(u=>{let m=u.title?.toLowerCase().includes(a)||typeof u.content=="string"&&u.content.toLowerCase().includes(a),g=!u.content.type||u.content.type==="all"||u.content.type===e.currentCaseType,d=!0;return c.startsWith("NI_")?d=u.id.includes("-ni-")||u.id.includes("attempted"):c.startsWith("SO_")?d=u.id.includes("gtm")||u.id.includes("whatsapp")||u.id.includes("form")||u.id.includes("ecw4")||u.id.includes("ga4")||u.id.includes("-so-"):c.startsWith("AS_")?d=u.id.includes("-as-"):c.startsWith("IN_")?d=u.id.includes("-in-"):c.startsWith("DC_")&&(d=u.id.includes("-dc-")),m&&g&&d}),h.sort((u,m)=>{let g=e.favorites.has(u.id)?1:0;return(e.favorites.has(m.id)?1:0)-g}),p.innerHTML="",h.length===0){p.innerHTML="<div class='cw-empty'>Nenhum cen\xE1rio encontrado.</div>";return}h.forEach(u=>{let m=document.createElement("div");m.style.position="relative",m.style.display="inline-block";let g=document.createElement("div");g.className="cw-scenario-chip",n.has(u.id)&&g.classList.add("selected"),g.textContent=u.title||u.id;let d=document.createElement("span");d.textContent=e.favorites.has(u.id)?"\u2605":"\u2606",d.style.cssText=`
                position: absolute; top: -5px; right: -5px; background: #fff;
                border-radius: 50%; width: 16px; height: 16px; display: flex;
                align-items: center; justify-content: center; font-size: 10px;
                cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1); color: #fbbc04;
                z-index: 2;
            `,d.onclick=S=>{S.stopPropagation(),e.toggleFavorite(u.id),s()},g.onmouseenter=()=>{let S=o.querySelector(".cw-scenario-preview");S.textContent=typeof u.content=="object"?u.content["field-REASON_COMMENTS"]||"Cen\xE1rio de preenchimento m\xFAltiplo":u.content.substring(0,100)},g.onclick=()=>{P.playClick(),n.has(u.id)?(n.delete(u.id),g.classList.remove("selected")):(n.add(u.id),g.classList.add("selected")),t(u,n.has(u.id))},m.appendChild(g),m.appendChild(d),p.appendChild(m)})};return r(),o}var Y={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ie={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Wt(t,e,o){let n={},i="implementation";o&&o.subscribe(()=>{V(),j()});function a(_){let F=_.toLowerCase();return F.includes("ads")||F.includes("conversion")||F.includes("remarketing")?Y.brands.ads:F.includes("ga4")||F.includes("analytics")?Y.brands.ga4:F.includes("gtm")||F.includes("tag manager")||F.includes("container")?Y.brands.gtm:F.includes("merchant")||F.includes("shopping")||F.includes("feed")?Y.brands.gmc:Y.brands.default}let r=Object.entries(be).filter(([_,F])=>F.popular),s={};Object.entries(be).forEach(([_,F])=>{if(F.popular)return;let M=a(F.name);s[M.label]||(s[M.label]={brand:M,tasks:[]}),s[M.label].tasks.push({key:_,...F})});let p="cw-zen-tasks";if(!document.getElementById(p)){let _=document.createElement("style");_.id=p,_.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${Y.font}; background: ${Y.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${Y.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${Y.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${Y.white}; 
                border: 1px solid #E5E7EB; 
                border-radius: 16px; 
                padding: 12px;
                cursor: pointer; 
                position: relative; 
                height: 80px; /* Altura fixa confort\xE1vel */
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                overflow: hidden;
            }
            
            /* Corre\xE7\xE3o do Grid \xCDmpar */
            .cw-hero-card:last-child:nth-child(odd) { grid-column: span 2; }

            /* Intera\xE7\xE3o */
            .cw-hero-card:hover { border-color: #D1D5DB; box-shadow: 0 4px 8px rgba(0,0,0,0.03); }
            .cw-hero-card:active { transform: scale(0.98); }

            /* HERO ACTIVE STATE (Borda Colorida Apenas) */
            .cw-hero-card.active {
                background: #FFFFFF; /* Fundo continua branco */
                border-color: var(--hero-color); /* Cor da borda din\xE2mica */
                box-shadow: 0 0 0 1px var(--hero-color), 0 4px 12px rgba(0,0,0,0.05);
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
                font-size: 12px; font-weight: 500; color: ${Y.textMain}; line-height: 1.2; 
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
                color: ${Y.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${Y.border}; border-radius: 10px; background: ${Y.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${Y.blue}; box-shadow: 0 0 0 3px ${Y.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${Y.border}; border-radius: 10px; background: ${Y.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${Y.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${Y.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${Y.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${Y.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${Y.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${Y.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${Y.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${Y.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${Y.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${Y.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${Y.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${Y.textMain}; }
            
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
                border-radius: 12px;
                /* Borda base sutil */
                border: 1px solid #E5E7EB; 
                /* Faixa de identidade na esquerda (Cor injetada via JS) */
                border-left: 4px solid var(--brand-color);
                
                padding: 16px 20px;
                position: relative;
                transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                
                /* Sombra quase invis\xEDvel, apenas para separar do fundo */
                box-shadow: 0 1px 2px rgba(0,0,0,0.02);
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
                font-family: ${Y.font}; font-size: 15px; font-weight: 600; color: ${Y.textMain};
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
                border-color: ${Y.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${Y.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${Y.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${Y.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
            .cw-input-group { margin-bottom: 12px; position: relative; }
            .cw-input-group:last-child { margin-bottom: 0; }

            .cw-input-label {
                display: block; font-size: 10px; font-weight: 700; color: ${Y.textSub};
                margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;
            }

            .cw-input-field {
                width: 100%; box-sizing: border-box;
                padding: 10px 12px;
                border-radius: 8px;
                border: 1px solid #E5E7EB; /* Borda leve */
                background: #F9FAFB; /* Fundo levemente cinza */
                font-size: 13px; color: #374151;
                transition: all 0.2s ease; outline: none;
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
        `,document.head.appendChild(_)}let l=document.createElement("div");l.className="cw-zen-container";let c=document.createElement("div");Object.assign(c.style,{display:"none"});let h=document.createElement("div");h.className="cw-screens-container",c.appendChild(h),l.innerHTML=`
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
    `;let u=l.querySelector(".cw-hero-grid"),m=l.querySelector(".cw-acc-container"),g=l.querySelector(".cw-results-container"),d=l.querySelector(".cw-search-input"),S=l.querySelector(".cw-status-bar"),E=l.querySelector(".cw-status-text"),N=l.querySelector(".cw-footer-icons");r.forEach(([_,F])=>{let M=a(F.name),G=document.createElement("div");G.className="cw-hero-card",G.id=`hero-${_}`,G.style.setProperty("--hero-color",M.color),G.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Ie[M.icon]}</div>
                <div class="cw-hero-label">${F.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,G.onclick=D=>{if(D.target.closest(".cw-step-btn"))return;let I=n[_]?n[_].count:0;B(_,I>0?-I:1,F)},G.querySelector(".minus").onclick=()=>B(_,-1,F),G.querySelector(".plus").onclick=()=>B(_,1,F),G.dataset.color=M.color,u.appendChild(G)});function z(_,F){let M=a(F.name),G=document.createElement("div");return G.className="cw-task-item",G.dataset.id=_,G.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${M.bg}; color:${M.color}">
                    ${Ie[M.icon]||Ie.default}
                </div>
                <div class="cw-task-label">${F.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,G.onclick=D=>{if(D.target.closest(".cw-step-btn"))return;let I=n[_]?n[_].count:0;B(_,I>0?-I:1,F)},G.querySelector(".minus").onclick=()=>B(_,-1,F),G.querySelector(".plus").onclick=()=>B(_,1,F),G}Object.entries(s).forEach(([_,F])=>{let M=document.createElement("div");M.className="cw-acc-group";let G=document.createElement("div");G.className="cw-acc-header",G.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${F.brand.color}"></div>
                ${_}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,G.onclick=()=>{m.querySelectorAll(".cw-acc-group.open").forEach(I=>{I!==M&&I.classList.remove("open")}),M.classList.toggle("open")};let D=document.createElement("div");D.className="cw-acc-body",F.tasks.forEach(I=>{let C=z(I.key,I);D.appendChild(C)}),M.appendChild(G),M.appendChild(D),m.appendChild(M)});function B(_,F,M){n[_]||(n[_]={count:0,data:M,brand:a(M.name)}),n[_].count+=F,n[_].count<=0&&delete n[_],V(),j(),t&&t()}function V(){let _=o.tagSupportUsed;r.forEach(([I])=>{let C=u.querySelector(`#hero-${I}`);if(!C)return;let q=n[I];q?(C.classList.add("active"),C.querySelector(".cw-step-val").textContent=q.count,C.querySelector(".cw-step-val").style.color=C.dataset.color,_&&(I==="ads_conversion_tracking"||I==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(I)?C.classList.add("ts-success"):C.classList.remove("ts-success")):(C.classList.remove("active"),C.classList.remove("ts-success"))}),l.querySelectorAll(".cw-task-item").forEach(I=>{let C=I.dataset.id,q=n[C];q?(I.classList.add("selected"),I.querySelector(".cw-step-val").textContent=q.count,_&&(C==="ads_conversion_tracking"||C==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(C)?I.classList.add("ts-success"):I.classList.remove("ts-success")):(I.classList.remove("selected"),I.classList.remove("ts-success"))});let M=Object.keys(n),G=0,D=[];if(M.forEach(I=>{let C=n[I];G+=C.count;for(let q=0;q<C.count;q++)D.length<6&&D.push(C.brand)}),G>0){S.classList.add("visible");let I=G>1?"A\xE7\xF5es":"A\xE7\xE3o",C=G>1?"definidas":"definida";E.textContent=`${G} ${I} ${C}`,N.innerHTML="",D.forEach(q=>{let f=document.createElement("div");f.className="cw-mini-icon",f.innerHTML=Ie[q.icon]||Ie.default;let A=f.querySelector("svg");A&&(A.style.width="14px",A.style.height="14px"),N.appendChild(f)})}else S.classList.remove("visible")}d.addEventListener("input",_=>{let F=_.target.value.toLowerCase();if(F.length>0){m.style.display="none",g.style.display="block",g.innerHTML="";let M=!1;Object.entries(be).forEach(([G,D])=>{if(D.name.toLowerCase().includes(F)){M=!0;let I=z(G,D);n[G]&&(I.classList.add("selected"),I.querySelector(".cw-step-val").textContent=n[G].count),g.appendChild(I)}}),M||(g.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else m.style.display="block",g.style.display="none"});function j(){h.innerHTML="";let _=Object.keys(n),F=!1;if(_.length===0){h.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,c.style.display="none";return}let M=o.tagSupportUsed,G=document.createElement("div");G.className="cw-info-banner",G.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,h.appendChild(G),_.forEach(D=>{let I=n[D].data,C=n[D].count,q=n[D].brand,A=M&&(D==="ads_conversion_tracking"||D==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(D),w=o.screenshotMode||"implementation",x=I.screenshots?.[w]||[];if(x.length>0||A){F=!0;for(let T=1;T<=C;T++){let L=document.createElement("div");L.className="cw-screen-card",A&&L.classList.add("ts-success"),L.style.setProperty("--brand-color",q.color),L.style.setProperty("--brand-bg",q.bg),L.style.setProperty("--brand-shadow",q.color+"40");let b=document.createElement("div");b.className="cw-card-header";let y=document.createElement("div");y.className="cw-card-icon",y.innerHTML=Ie[q.icon]||Ie.default;let v=document.createElement("div");v.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let O=document.createElement("input");O.className="cw-card-title-input",O.id=`name-${D}-${T}`,O.value=`${I.name}${C>1?" #"+T:""}`,O.title="Clique para renomear esta task";let R=document.createElement("span");if(R.className="cw-edit-hint",R.innerHTML="\u270E Renomear",v.appendChild(O),v.appendChild(R),b.appendChild(y),b.appendChild(v),L.appendChild(b),A){let k=document.createElement("div");k.className="cw-ts-disclaimer-box",k.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,k.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(D,!0)},L.appendChild(k)}else x.forEach((k,$)=>{let W=document.createElement("div");W.className="cw-input-group";let ee=document.createElement("label");ee.className="cw-input-label",ee.textContent=k;let J=document.createElement("input");J.className="cw-input-field",J.id=`screen-${D}-${T}-${$}`,J.placeholder="Cole o link aqui...",J.setAttribute("autocomplete","off"),J.addEventListener("input",()=>{J.value.trim().length>5?J.classList.add("filled"):J.classList.remove("filled")});let re=document.createElement("div");re.className="cw-input-check",re.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',W.appendChild(ee),W.appendChild(J),W.appendChild(re),L.appendChild(W)});h.appendChild(L)}}}),c.style.display=F?"block":"none"}return{selectionElement:l,screenshotsElement:c,updateSubStatus:()=>j(),getCheckedElements:()=>Object.keys(n).map(_=>({value:_,count:n[_].count})),setTaskCount:(_,F)=>{n[_]&&delete n[_],F>0&&be[_]&&B(_,F,be[_])},toggleTask:(_,F=!0)=>{let M=n[_];F&&!M?B(_,1,be[_]):!F&&M&&B(_,-M.count,be[_])},setLanguage:_=>{e=_;let F=l.querySelector(".js-hero-title");F&&(F.textContent=e("acesso_rapido"));let M=l.querySelector(".cw-search-input");M&&(M.placeholder=e("buscar_catalogo")),j()},reset:()=>{for(let _ in n)delete n[_];d.value="",m.style.display="block",g.style.display="none",V(),j()}}}var X={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},fe="cubic-bezier(0.25, 0.8, 0.25, 1)",_o={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${X.border}`,backgroundColor:X.bgInput,fontSize:"14px",color:X.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${fe}, box-shadow 0.2s ${fe}, background-color 0.2s`,outline:"none"},Dn={..._o,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Rn={fontSize:"13px",fontWeight:"700",color:X.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},zn={display:"block",fontSize:"13px",fontWeight:"600",color:X.text,marginBottom:"8px",marginTop:"16px"},Bn={fontSize:"12px",color:X.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},Gn={fontSize:"12px",color:X.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},Pn={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:X.text,cursor:"pointer",padding:"12px 14px",backgroundColor:X.surface,border:`1px solid ${X.border}`,borderRadius:"12px",transition:`all 0.2s ${fe}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},gt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:X.primary},jn={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:X.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${fe}, box-shadow 0.2s ${fe}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},Hn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${X.primary}`,color:X.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${fe}`},$n={background:"transparent",border:`1px solid ${X.border}`,borderRadius:"20px",color:X.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${fe}`,fontFamily:"'Google Sans', 'Roboto'"};var Vn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:X.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},Un={fontSize:"13px",fontWeight:"700",color:X.primary,minWidth:"20px",textAlign:"center"},Wn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${X.border}`,backgroundColor:X.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${fe}, box-shadow 0.2s ${fe}`},Yn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${X.bgInput}`},Xn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${X.border}`,backgroundColor:X.surface,color:X.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${fe}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Kn={backgroundColor:X.primaryBg,color:X.primary,borderColor:X.primary,fontWeight:"600"},Jn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:X.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},Qn={borderTop:`1px solid ${X.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Zn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${X.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:X.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},ea={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${X.bgInput}`,cursor:"pointer",fontSize:"13px",color:X.text,transition:"background 0.1s",userSelect:"none"};var Mo={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},No={fontSize:"12px",color:"#e37400",marginTop:"4px"},Do={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Ro={display:"flex",gap:"15px",marginBottom:"10px"};function Yt(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,Mo);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,dt,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,Ro);let i=document.createElement("input");i.type="radio",i.name="ts_usage_mod",i.value="Sim",Object.assign(i.style,gt);let a=document.createElement("label");a.textContent="Sim";let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(i),r.appendChild(a);let s=document.createElement("input");s.type="radio",s.name="ts_usage_mod",s.value="N\xE3o",s.checked=!0,Object.assign(s.style,gt);let p=document.createElement("label");p.textContent="N\xE3o";let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center"}),l.appendChild(s),l.appendChild(p),n.appendChild(r),n.appendChild(l);let c=document.createElement("div");c.style.display="block";let h=document.createElement("label");h.className="js-ts-reason-label",h.textContent=t("motivo_ts"),Object.assign(h.style,dt,{fontSize:"12px"});let u=document.createElement("input");u.type="text",Object.assign(u.style,Do);let m=document.createElement("div");m.className="js-ts-warning",m.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(m.style,No),c.appendChild(h),c.appendChild(u),c.appendChild(m),e.appendChild(o),e.appendChild(n),e.appendChild(c),i.onchange=()=>{c.style.display="none",Promise.resolve().then(()=>(Be(),Ye)).then(N=>N.notesState.setTagSupportUsed(!0))},s.onchange=()=>{c.style.display="block",Promise.resolve().then(()=>(Be(),Ye)).then(N=>N.notesState.setTagSupportUsed(!1))};function g(N,z){if(e.style.display="none",!N||!z||z.length===0)return;z.some(V=>V==="ads_conversion_tracking"||V==="ads_enhanced_conversions")?e.style.display="block":(E(),Promise.resolve().then(()=>(Be(),Ye)).then(V=>V.notesState.setTagSupportUsed(!1)))}function d(){if(e.style.display==="none")return"";let N=`<br><b>Utilizou Tag Support?</b> ${i.checked?"Sim":"N\xE3o"}`;return s.checked&&u.value.trim()!==""&&(N+=`<br><b>Motivo:</b> ${u.value}`),N+="<br>",N}function S(N){t=N,o.textContent=t("utilizou_tag_support"),h.textContent=t("motivo_ts"),m.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`}function E(){e.style.display="none",s.checked=!0,i.checked=!1,c.style.display="block",u.value=""}return{element:e,updateVisibility:g,getOutput:d,setLanguage:S,reset:E}}var bt="cw_notes_parking_lot",Je="cw_notes_emergency_save";var Ce={getAll:()=>{try{return JSON.parse(localStorage.getItem(bt)||"[]")}catch{return[]}},save:t=>{let e=Ce.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(bt,JSON.stringify(e)),o},delete:t=>{let e=Ce.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(bt,JSON.stringify(e)),e},getCount:()=>Ce.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(Je,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(Je);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(Je),null):e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(Je)}};function Xt(t){let{onSaveCurrent:e,onLoadDraft:o,t:n}=t,i=document.createElement("button");i.className="js-btn-park",i.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${n("guardar")}</span>
    `,i.style.cssText=`
        flex: 1 1 0;           /* Ocupa o mesmo espa\xE7o (33%) */
        padding: 10px 0;       /* Mesma altura */
        margin-top: 16px;      /* Mesmo espa\xE7amento superior */
        border-radius: 8px;    /* Mesma curva */
        font-size: 14px;       /* Mesma fonte */
        font-weight: 500;      /* Mesmo peso */
        
        /* Estilo Visual (Secund\xE1rio/Branco) */
        background: #FFFFFF; 
        color: #5F6368; 
        border: 1px solid #DADCE0; 
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center; /* Centralizado */
        gap: 8px;
        transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    `,i.onmouseenter=()=>{i.style.backgroundColor="#F8F9FA",i.style.borderColor="#202124",i.style.color="#202124",i.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",i.style.transform="translateY(-1px)"},i.onmouseleave=()=>{i.style.backgroundColor="#FFFFFF",i.style.borderColor="#DADCE0",i.style.color="#5F6368",i.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",i.style.transform="translateY(0)"},i.onmousedown=()=>i.style.transform="scale(0.96)",i.onmouseup=()=>i.style.transform="scale(1) translateY(-1px)",i.onclick=async()=>{if(await ge("Deseja guardar o rascunho atual e limpar os campos?"))try{let d=await e();d?(Ce.save(d),m(),s(),P.playSuccess(),H("Rascunho salvo com sucesso!")):H("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(d){console.error("Erro ao salvar rascunho:",d),H("Erro ao salvar.",{error:!0})}};let a=document.createElement("div");a.title="Meus Rascunhos",a.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",a.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=document.createElement("div");r.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",a.appendChild(r),a.onmouseenter=()=>a.style.background="rgba(0,0,0,0.05)",a.onmouseleave=()=>a.style.background="transparent",a.onclick=g=>{g.stopPropagation(),u()};function s(){let g=Ce.getCount();g>0?(r.style.display="block",r.textContent=g,r.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):r.style.display="none"}let p=document.createElement("div");p.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: #FFFFFF; z-index: 100;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -10px 40px rgba(0,0,0,0.15);
        transform: translateY(110%); transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        display: flex; flex-direction: column; overflow: hidden;
    `;let l=document.createElement("div");l.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",l.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${n("rascunhos_salvos")}</span>`;let c=document.createElement("button");c.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',c.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",c.onmouseenter=()=>c.style.background="#F1F3F4",c.onmouseleave=()=>c.style.background="transparent",c.onclick=()=>u(!1),l.appendChild(c);let h=document.createElement("div");h.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",p.appendChild(l),p.appendChild(h);function u(g){let d=p.style.transform==="translateY(0%)";(g!==void 0?g:!d)?(m(),p.style.transform="translateY(0%)"):p.style.transform="translateY(110%)"}function m(){let g=Ce.getAll();if(h.innerHTML="",g.length===0){h.innerHTML=`
                <div style="text-align:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:500;">${n("nenhum_rascunho")}</div>
                </div>`;return}g.forEach(d=>{let S=document.createElement("div");S.style.cssText=`
                background: #FFF; padding: 16px; border-radius: 12px;
                border: 1px solid #E0E0E0; box-shadow: 0 1px 3px rgba(0,0,0,0.02);
                position: relative; transition: all 0.2s;
            `;let N=new Date(d.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),z="";d.summaryTags&&d.summaryTags.length>0&&(z=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${d.summaryTags.slice(0,3).join(", ")+(d.summaryTags.length>3?"...":"")}</div>`),S.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${d.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${N}</div>
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
            `;let B=S.querySelector(".cw-resume-btn");B.onclick=async()=>{await ge("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(d),Ce.delete(d.id),m(),s(),u(!1),P.playSwoosh(),H("Rascunho carregado."))};let V=S.querySelector(".cw-del-btn");V.onclick=async()=>{await ge("Excluir este rascunho?",{danger:!0})&&(Ce.delete(d.id),m(),s())},h.appendChild(S)})}return s(),{parkButton:i,historyBtnWrapper:a,drawer:p}}var Kt=t=>new Promise(e=>setTimeout(e,t));function Qe(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function je(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let n=window.getSelection();n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")}catch{H("Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(e)}function Ze(t){["input","change","keydown","keyup"].forEach(o=>{let n=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(n)})}function Jt(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function et(){console.log("Iniciando processo de Nova Nota...");let t=Jt(),e=t.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(n){let r=n.closest("material-fab")||n.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),Qe(r)):Qe(n)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let s=r.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Qe(s)):r.click(),await Kt(800);let l=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="description");l&&Qe(l)}}let i=null,a=0;for(;!i&&a<20;){await Kt(300);let r=Jt();if(r.length>e)i=r.find(s=>!t.includes(s)),i||(i=r[r.length-1]);else if(a>10){let s=r.filter(p=>p.offsetParent!==null);s.length>0&&(i=s[s.length-1])}a++}return i}function Qt(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let n=document.createElement("div");n.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(n),e.appendChild(o),o.addEventListener("scroll",()=>{n.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let i={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},a={};function r({id:z,label:B,type:V="text",placeholder:j="",required:_=!1,parent:F=o}){let M=document.createElement("div");M.style.cssText=i.inputWrapper;let G=document.createElement("label");G.style.cssText=i.label,G.innerHTML=`${B} ${_?'<span style="color:#D93025">*</span>':""}`;let D;return V==="textarea"?(D=document.createElement("textarea"),D.style.cssText=i.input+i.textarea):(D=document.createElement("input"),D.type=V,D.style.cssText=i.input),D.id=z,D.placeholder=j,D.addEventListener("focus",()=>{D.style.borderColor="#1a73e8",D.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),D.addEventListener("blur",()=>{D.style.borderColor="#DADCE0",D.style.boxShadow="none",_&&D.value.trim()!==""&&(D.style.backgroundColor="#FFF")}),a[z]={input:D,wrapper:M,required:_},M.appendChild(G),M.appendChild(D),F.appendChild(M),M}function s({id:z,label:B,options:V=["Yes","No"],defaultValue:j="No",onChange:_=null}){let F=document.createElement("div");F.style.cssText=i.inputWrapper;let M=document.createElement("label");M.style.cssText=i.label,M.textContent=B,F.appendChild(M);let G=document.createElement("div");G.style.cssText=i.radioGroup;let D=document.createElement("input");return D.type="hidden",D.id=z,D.value=j,F.appendChild(D),V.forEach(I=>{let C=document.createElement("div");C.textContent=I,C.style.cssText=i.radioLabel,I===j&&(C.style.cssText+=i.radioActive),C.onclick=()=>{Array.from(G.children).forEach(f=>f.style.cssText=i.radioLabel),C.style.cssText+=i.radioActive,D.value=I,_&&_(I)},G.appendChild(C)}),a[z]={input:D,wrapper:F,required:!1},F.appendChild(G),o.appendChild(F),F}let p=document.createElement("div");p.style.cssText=i.banner,p.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(p);let l=document.createElement("div");l.style.marginBottom="24px";let c=document.createElement("button");c.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",c.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",c.onmouseover=()=>c.style.background="#E1EFFF",c.onmouseout=()=>c.style.background="#F0F7FF",l.appendChild(c),o.appendChild(l);let h=document.createElement("div");h.style.cssText=i.section,h.innerHTML=`<div style="${i.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(h),r({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:h}),r({id:"ga4",label:"GA4 Property ID",parent:h}),r({id:"gtm",label:"GTM Container ID",parent:h});let u=document.createElement("div");u.style.cssText=i.hiddenField,h.appendChild(u),s({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:z=>{z==="Yes"?u.style.cssText=i.visibleField+"margin-bottom:14px;":(u.style.cssText=i.hiddenField,a.accessEmail.input.value="")}}),r({id:"accessEmail",label:"User Access Email",parent:u}),s({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let m=document.createElement("div");m.style.cssText=i.section,m.innerHTML=`<div style="${i.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(m),r({id:"name",label:"Advertiser Name",required:!0,parent:m}),r({id:"url",label:"Website URL",parent:m}),r({id:"phone",label:"Phone Number",parent:m}),r({id:"email",label:"Contact Email",parent:m}),r({id:"callback",label:"Preferred Callback Time (Timezone)",parent:m}),r({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:m}),r({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:m}),r({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:m});let g=document.createElement("div");g.style.cssText=i.section,g.innerHTML=`<div style="${i.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(g),r({id:"cc_adv",label:"Advertiser Contact",parent:g}),r({id:"cc_am",label:"Account Manager",parent:g});let d=document.createElement("div");d.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let S=document.createElement("button");S.innerHTML="Voltar",S.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",S.onclick=t;let E=document.createElement("button");E.textContent="Gerar Nota",E.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",d.appendChild(S),d.appendChild(E),e.appendChild(d),c.onclick=async()=>{let z=c.innerHTML;c.innerHTML="\u23F3 Buscando dados...";try{let B=await he(),V=0,j=(M,G)=>{let D=a[M];G&&D&&D.input.value===""&&(D.input.value=G,D.input.style.backgroundColor="#E6F4EA",D.input.style.borderColor="#34A853",setTimeout(()=>{D.input.style.backgroundColor="#FFF",D.input.style.borderColor="#DADCE0"},1e3),V++)};j("name",B.advertiserName),j("url",B.websiteUrl),B.clientEmail&&(j("email",B.clientEmail),j("cc_adv",B.clientEmail));let F=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);F&&j("cid",F[0]),V>0?H(`${V} campos preenchidos!`):H("Nenhum dado novo encontrado.")}catch(B){console.error(B),H("Erro ao ler p\xE1gina.")}finally{c.innerHTML=z}};let N=()=>{let z=!0,B=null;return Object.values(a).forEach(V=>{V.required&&!V.input.value.trim()&&(z=!1,V.input.style.cssText+=i.inputError,V.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),B||(B=V.input))}),B&&B.scrollIntoView({behavior:"smooth",block:"center"}),z};return E.onclick=async()=>{if(!N()){H("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let z=M=>a[M].input.value||"N/A",B=z("hasAccess"),V=B==="Yes"?z("accessEmail"):"N/A",_=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${z("cid")}
<b>GA4 ID:</b> ${z("ga4")}
<b>GTM ID:</b> ${z("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${B==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${V}
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
`.replace(/\n/g,"<br>");je(_);let F=await et();F?(F.innerText.trim()===""&&(F.innerHTML=""),document.execCommand("insertHTML",!1,_),Ze(F),H("Nota gerada e inserida!")):H("Copiado! Abra uma nota para colar.")},e}var de=t=>new Promise(e=>setTimeout(e,t));function ue(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function xe(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function tt(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,n=document.getElementById(o);n&&n.remove();let i=t.getBoundingClientRect(),a=document.createElement("div");a.id=o,a.style.cssText=`
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
    `;let r=a.querySelector(".cw-close-btn");r.onclick=()=>{a.style.opacity="0",a.style.transform="translateY(-5px)",setTimeout(()=>a.remove(),300)},document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(a)&&r.click()},25e3)}async function ot(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await de(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await de(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function ft(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let n=o.offsetParent!==null,i=o.closest("case-message-view")!==null,a=o.closest(".editor")!==null||o.closest("write-card")!==null;return n&&!i&&a});return e&&ue("Editor visualmente detectado.","success"),e}async function Zt(){ue("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(h=>h.innerText.trim()==="email");if(o&&o.offsetParent!==null){ue("Bot\xE3o de email direto encontrado.");let h=o.closest("material-button")||o.closest("material-fab")||o;xe(h),t=!0}else{ue("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let h=document.querySelector("material-fab-speed-dial");if(h){let u=h.querySelector(".trigger");if(u){xe(u),await de(800);let g=Array.from(document.querySelectorAll("i.material-icons-extended")).find(d=>d.innerText.trim()==="email");g&&(xe(g),t=!0)}}}if(!t)return H("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ue("\u{1F680} FASE 2: Verificando rascunhos...");let n=null,i=0,a=20;for(;i<a;){await de(250);let h=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(n=Array.from(h).find(u=>u.offsetParent!==null),n){ue("\u26A0\uFE0F Rascunho detectado!","warn");break}i++}if(n){ue("\u{1F5D1}\uFE0F Descartando..."),xe(n),n.click();let h=null,u=0;for(;u<15;){await de(300);let m=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(h=Array.from(m).find(g=>g.offsetParent!==null),h)break;u++}h&&(xe(h),H("Limpando rascunho antigo...",{duration:2e3}),await de(2500))}ue("\u{1F680} FASE 3: Buscando editor final...");let r=0,s=null;for(;r<20&&(s=ft(),!s);)await de(250),r++;if(!s)return H("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let p=s.closest('[id="email-body-content-top"]'),c=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(p){if(c){let u=c.closest('[aria-hidden="true"]');u&&u.removeAttribute("aria-hidden"),c.focus(),xe(c)}await de(300),p.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let h=p.querySelector("#cases-body-field");if(h){let u=document.createRange();u.selectNodeContents(h),u.collapse(!0);let m=window.getSelection();m.removeAllRanges(),m.addRange(u)}return!0}return!1}async function nt(t){if(!t||!await Zt())return;let o=await he();ue("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await de(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let a=document.querySelector('input[aria-label="Enter To email address"]');a&&(await ot(a,o.clientEmail),tt(a,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let a=document.querySelector('input[aria-label="Enter Bcc email address"]');a&&(await ot(a,o.internalEmail),tt(a,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await de(500);let i=document.querySelector('material-button[debug-id="canned_response_button"]');if(i){xe(i),await de(1e3);let a=document.querySelector("material-auto-suggest-input input");if(a){xe(a),document.execCommand("insertText",!1,t),a.dispatchEvent(new Event("input",{bubbles:!0})),ue("\u23F3 Buscando resultado da Canned Response...","info");let r=null,s=0,p=15e3,l=500;for(;s<p&&(r=document.querySelector("material-select-dropdown-item"),!r);)await de(l),s+=l;if(r){xe(r),await de(1500);let c=ft();if(c){let u=Array.from(c.querySelectorAll("span.field")).filter(g=>g.innerText.includes("{Requested Task Type}"));if(u.length>0){let g=u.map(S=>S.closest("tr")).filter(S=>S!==null),d=[...new Set(g)];if(d.length>0){let E=d[0].querySelector('td[width="100%"]');E&&(E.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let N=1;N<d.length;N++)d[N].remove()}}let m=c.innerHTML;o.advertiserName&&m.includes("{%ADVERTISER_NAME%}")&&(m=m.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),m.includes("{%^79285%}")&&(m=m.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),c.innerHTML=m}H("Canned Response aplicada!")}else ue(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),H(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else H("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function eo(t){if(ue(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await Zt())return;let o=await he(),n=st();await de(600);let i=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(i&&(i.click(),await de(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await ot(s,o.clientEmail),tt(s,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await ot(s,o.internalEmail),tt(s,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let a=document.querySelector('input[aria-label="Subject"]');a&&t.subject&&(a.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(a,t.subject),a.dispatchEvent(new Event("input",{bubbles:!0})),await de(300));let r=ft();if(r){let p=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');p&&(p.focus(),xe(p));let l=new Date;l.setDate(l.getDate()+3);let c=l.getDay();c===6?l.setDate(l.getDate()+2):c===0&&l.setDate(l.getDate()+1);let h=l.toLocaleDateString("pt-BR"),u=t.body;u=u.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),u=u.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),u=u.replace(/\[URL\]/g,o.websiteUrl||"seu site"),u=u.replace(/\[Seu Nome\]/g,n),u=u.replace(/\[MM\/DD\/YYYY\]/g,h),document.execCommand("insertHTML",!1,u),p&&(p.dispatchEvent(new Event("input",{bubbles:!0})),p.dispatchEvent(new Event("change",{bubbles:!0}))),H("Email preenchido com sucesso!",{duration:2e3}),ue("\u2705 Processo finalizado com sucesso.","success")}else H("Erro ao focar no editor.",{error:!0})}var Z={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},at=t=>new Promise(e=>setTimeout(e,t));function to(t){let e="cw-command-center-style";if(!document.getElementById(e)){let d=document.createElement("style");d.id=e,d.innerHTML=`
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
                
                background: ${Z.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${Z.glassBorder}; border-radius: 50px;
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
                cursor: pointer; position: relative; color: ${Z.iconIdle};
                flex-shrink: 0;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn:hover {
                background: ${Z.glassHighlight};
                color: ${Z.iconActive};
                transform: scale(1.18) translateY(-2px) !important;
            }

            .cw-btn.notes.active { color: ${Z.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${Z.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${Z.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${Z.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${Z.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${Z.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${Z.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${Z.gray} !important; background: rgba(154, 160, 166, 0.15); }

            .cw-btn.notes:hover { color: ${Z.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${Z.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${Z.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${Z.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${Z.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${Z.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${Z.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${Z.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${Z.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${Z.blue}; width: 16px; opacity: 1; }

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
            .cw-center-dots span:nth-child(1) { background-color: ${Z.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${Z.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${Z.green}; }
            
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
            
            .cw-center-success { display: none; color: ${Z.green}; margin-bottom: 10px; }
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
    `;let i=document.createElement("div");i.className="cw-focus-backdrop",document.body.appendChild(i),document.body.appendChild(n);let a=(d,S)=>{P.playClick(),n.querySelector(`.${d}`).classList.toggle("active"),S()};if(n.querySelector(".notes").onclick=d=>{d.stopPropagation(),a("notes",t.toggleNotes)},n.querySelector(".email").onclick=d=>{d.stopPropagation(),a("email",t.toggleEmail)},n.querySelector(".script").onclick=d=>{d.stopPropagation(),a("script",t.toggleScript)},n.querySelector(".links").onclick=d=>{d.stopPropagation(),a("links",t.toggleLinks)},n.querySelector(".library").onclick=d=>{d.stopPropagation(),a("library",t.toggleLibrary)},n.querySelector(".timezone").onclick=d=>{d.stopPropagation(),a("timezone",t.toggleTimezone)},n.querySelector(".configs").onclick=d=>{d.stopPropagation(),a("configs",t.toggleConfigs)},n.querySelector(".broadcast").onclick=d=>{d.stopPropagation(),a("broadcast",()=>{let S=d.currentTarget.querySelector(".cw-badge");S&&S.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},n.querySelectorAll(".cw-btn").forEach(d=>{d.addEventListener("mouseenter",()=>P.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let d=document.createElement("div");d.className="cw-badge",n.querySelector(".broadcast").appendChild(d)}let r=null;n.onmouseleave=()=>{n.querySelector(".cw-btn.active")||n.classList.contains("processing-center")||(r=setTimeout(()=>{n.classList.add("collapsed")},3e3))},n.onmouseenter=()=>{r&&clearTimeout(r)},(async function(){await at(2800),n.classList.add("docked"),await at(300);let S=n.querySelectorAll(".cw-btn");n.querySelectorAll(".cw-sep").forEach(E=>E.classList.add("visible"));for(let E=0;E<S.length;E++)S[E].classList.add("popped"),await at(90);await at(200),n.classList.add("system-check")})();let s=!1,p,l,c,h,u=3;n.onmousedown=d=>{if(d.target.closest("button"))return;d.preventDefault(),p=d.clientX,l=d.clientY;let S=n.getBoundingClientRect();c=S.left,h=S.top,document.addEventListener("mousemove",m),document.addEventListener("mouseup",g)};function m(d){let S=d.clientX-p,E=d.clientY-l;!s&&Math.sqrt(S*S+E*E)>u&&(s=!0,n.classList.add("dragging"),n.style.transition="none",r&&clearTimeout(r)),s&&(n.style.left=`${c+S}px`,n.style.top=`${h+E}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function g(d){if(document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",g),s){s=!1,n.classList.remove("dragging");let S=window.innerWidth,E=window.innerHeight,N=n.getBoundingClientRect(),z=N.left+N.width/2,B;z<S/2?(B=24,n.classList.remove("side-right"),n.classList.add("side-left")):(B=S-N.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let V=Math.max(24,Math.min(N.top,E-N.height-24));setTimeout(()=>{n.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),n.style.left=`${B}px`,n.style.top=`${V}px`,n.style.bottom="auto",n.style.transform=""},10),setTimeout(()=>{n.style.transition="",n.style.removeProperty("transition")},700)}else{let S=n.querySelector(".cw-btn.active"),E=d.target.closest("button");if(n.classList.contains("collapsed")){let N=n.getBoundingClientRect(),z=window.innerHeight,B=N.top>z/2;if(n.style.setProperty("transition","none","important"),B){let V=z-N.bottom;n.style.top="auto",n.style.bottom=`${V}px`}else n.style.bottom="auto",n.style.top=`${N.top}px`;n.offsetWidth,n.style.removeProperty("transition"),n.classList.remove("collapsed"),P.playGenieOpen()}else!S&&!E&&(n.classList.add("collapsed"),P.playGenieOpen());E&&(E.style.transform="scale(0.9)",setTimeout(()=>E.style.transform="",150))}}}function it(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${oe.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=a=>{a.stopPropagation(),window._CW_ABORT_PROCESS=!0,H("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(n),t.appendChild(o);let i=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let r=Date.now()-i,s=Math.max(0,2e3-r);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let p=o.querySelector(".cw-center-dots"),l=o.querySelector(".cw-center-text"),c=o.querySelector(".cw-center-success"),h=o.querySelector(".cw-abort-btn");p&&(p.style.display="none"),l&&(l.style.display="none"),h&&(h.style.display="none"),c&&c.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},s)}}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function pe(t,e,o){let n=document.getElementById(o);if(!e)return;let i=e.getAttribute("data-moved")==="true",a={x:0,y:0};if(n){let c=n.getBoundingClientRect();a.x=c.left+c.width/2,a.y=c.top+c.height/2}let r,s;if(!i)r=window.innerWidth/2,s=window.innerHeight/2;else{let c=e.getBoundingClientRect();r=c.left+c.width/2,s=c.top+c.height/2,r===0&&s===0&&(r=window.innerWidth/2,s=window.innerHeight/2)}let p=a.x-r,l=a.y-s;t?(P.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",i?e.style.transform=`translate(${p}px, ${l}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${l}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),n&&n.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",i?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof oo=="function"&&oo(e,o)):(P.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",i?e.style.transform=`translate(${p}px, ${l}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${l}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),n&&n.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof xt=="function"&&xt(e))}function oo(t,e){xt(t);let o=n=>{if(!t.classList.contains("open"))return;let i=t.contains(n.target),a=document.querySelector(".cw-pill"),r=a&&a.contains(n.target);i?(t.classList.remove("idle"),t.style.zIndex="2147483648"):r||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function xt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function no(){let t="v4.0.0",{popup:e,content:o,header:n,animRefs:i,credit:a}=Rt(t,z),r=Yt(x),s=Wt(()=>{M(),U.activeTasks=s.getCheckedElements()},x,U),p=document.createElement("div");p.style.display="none";let l=Ut((b,y)=>{G(b,y)},U);p.appendChild(l);let c=Xt({onSaveCurrent:async()=>{let b=await f();return q(),b},onLoadDraft:b=>{w(b)},t:b=>x(b)}),h=V(),u=j(),m=document.createElement("div"),g=D(c);o.appendChild(h),o.appendChild(u),o.appendChild(p),o.appendChild(m),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none";let d=document.createElement("button");d.id="manual-task-toggle",d.textContent=x("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",d.style.cssText="display: none; width: 100%; padding: 10px; border: 1px solid #dadce0; background: #f8f9fa; color: #1a73e8; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 500; margin-top: 8px;",d.onclick=()=>{s.selectionElement.style.display="block",s.screenshotsElement.style.display="block",d.style.display="none"},o.appendChild(d),o.appendChild(s.selectionElement),o.appendChild(r.element),o.appendChild(s.screenshotsElement),o.appendChild(g);let S=document.createElement("div");S.style.display="none",S.style.flexGrow="1",S.style.minHeight="0",S.style.overflow="hidden";let E=Qt(()=>B());E.style.height="100%",S.appendChild(E),e.insertBefore(S,a);let N=n.lastElementChild;N&&(N.insertBefore(c.historyBtnWrapper,N.firstChild),N.insertBefore(T(),N.firstChild)),e.appendChild(c.drawer),U.subscribe(b=>{L(b)});function z(){U.visible=!U.visible,pe(U.visible,e,"cw-btn-notes")}function B(){U.isSplitView=!U.isSplitView,U.isSplitView?(o.style.display="none",S.style.display="flex",S.style.flexDirection="column",i.googleLine&&(i.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",S.style.display="none",i.googleLine&&(i.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function V(){let b=document.createElement("div");if(b.innerHTML=`
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
        `,!document.getElementById("cw-segmented-styles")){let y=document.createElement("style");y.id="cw-segmented-styles",y.innerHTML=`
                .cw-segmented-control { display: flex; background: #f1f3f4; padding: 4px; border-radius: 12px; gap: 4px; }
                .cw-segmented-control button { flex: 1; border: none; background: transparent; padding: 8px; font-size: 13px; font-weight: 500; border-radius: 8px; cursor: pointer; transition: all 0.2s; color: #5f6368; }
                .cw-segmented-control button.active { background: #fff; color: #1a73e8; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            `,document.head.appendChild(y)}return b.querySelectorAll("#lang-selector button").forEach(y=>{y.onclick=()=>{U.setLanguage(y.dataset.lang),b.querySelectorAll("#lang-selector button").forEach(v=>v.classList.remove("active")),y.classList.add("active")}}),b.querySelectorAll("#type-selector button").forEach(y=>{y.onclick=()=>{U.setCaseType(y.dataset.type),b.querySelectorAll("#type-selector button").forEach(v=>v.classList.remove("active")),y.classList.add("active")}}),b.querySelectorAll("#portugal-selector button").forEach(y=>{y.onclick=()=>{U.setPortugalCase(y.dataset.val==="true"),b.querySelectorAll("#portugal-selector button").forEach(v=>v.classList.remove("active")),y.classList.add("active"),U.currentSubStatus&&Ke(U.currentSubStatus,m,U)}}),b}function j(){let b=document.createElement("div");b.className="cw-status-section",b.style.cssText="display: flex; flex-direction: column; gap: 8px;",b.innerHTML=`
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
        `;let y=b.querySelector("#main-status-select"),v=b.querySelector("#sub-status-select");return y.onchange=()=>{U.setStatus(y.value),_(y.value,v),U.setSubStatus(""),F("")},v.onchange=()=>{U.setSubStatus(v.value),F(v.value)},b}function _(b,y){if(y.innerHTML=`<option value="">${x("select_substatus")}</option>`,!b){y.disabled=!0;return}for(let v in Se)if(Se[v].status===b){let O=document.createElement("option");O.value=v,O.textContent=Se[v].name,y.appendChild(O)}y.disabled=!1}function F(b){if(!b){p.style.display="none",m.style.display="none",document.getElementById("manual-task-toggle").style.display="none",s.selectionElement.style.display="none",s.screenshotsElement.style.display="none";return}Ke(b,m,U),m.style.display="block",p.style.display="block";let y=Se[b],v=b.startsWith("SO_"),O=b==="NI_Awaiting_Validation",R=document.getElementById("manual-task-toggle");v||O?(s.selectionElement.style.display="block",R.style.display="none"):(s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",R.style.display="block");let k=b==="SO_Education_Only"?"education":"implementation";U.setScreenshotMode(k),U.currentCaseType==="lm"?U.toggleFieldExclusion("field-ON_CALL",!0):U.toggleFieldExclusion("field-ON_CALL",!1),s.updateSubStatus(b),M()}function M(){let b=s.getCheckedElements().map(y=>y.value);r.updateVisibility(U.currentSubStatus,b)}function G(b,y){let v=b.content;if(typeof v=="object"){for(let O in v)if(O==="linkedTask")s.toggleTask(v.linkedTask,y);else if(O==="activeTasks")y&&v.activeTasks.forEach(R=>s.setTaskCount(R.value,R.count));else if(O.startsWith("field-")&&y){U.updateField(O,v[O]);let R=document.getElementById(O);if(R){if(Ne.includes(O.replace("field-",""))){let k=R.value.trim();k&&!k.includes(v[O].trim())?R.value=k+`
`+v[O]:R.value=v[O]}else R.value=v[O];R.dispatchEvent(new Event("input"))}}}else{let O=m.querySelector("textarea");if(O){if(y){let R=O.value.trim();R&&!R.includes(v.trim())?O.value=R+`
`+v:O.value=v}O.dispatchEvent(new Event("input"))}}}function D(b){let y=document.createElement("div");y.className="cw-actions-section",y.style.cssText=`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            padding: 16px;
            margin-top: 16px;
            background: #f8f9fa;
            border-radius: 16px;
            border: 1px solid #e5e7eb;
        `;let v=b.parkButton;v.style.cssText="width: 100%; margin: 0; border-radius: 10px; grid-column: span 2;";let O=document.createElement("button");O.className="cw-btn-secondary js-btn-reset",O.textContent=x("limpar"),O.style.cssText="width: 100%; height: 44px; background: #fff; color: #5f6368; border: 1px solid #dadce0; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s;",O.onclick=()=>q();let R=document.createElement("button");R.className="cw-btn-secondary js-btn-copy",R.textContent=x("copiar"),R.style.cssText="width: 100%; height: 44px; background: #fff; color: #1a73e8; border: 1px solid #1a73e8; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s;",R.onclick=()=>I();let k=document.createElement("button");return k.className="cw-btn-primary js-btn-generate",k.textContent=x("preencher"),k.style.cssText="width: 100%; height: 44px; background: #1a73e8; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s; grid-column: span 2; font-size: 15px; box-shadow: 0 4px 12px rgba(26, 115, 232, 0.2);",k.onclick=()=>C(),y.appendChild(v),y.appendChild(O),y.appendChild(R),y.appendChild(k),y}async function I(){if(!U.currentSubStatus){H(x("select_substatus"),{error:!0});return}let b=ut(U,s,r);b?(je(b),H(x("copiado_sucesso")),P.playClick()):H(x("select_substatus"),{error:!0})}async function C(){if(!U.currentSubStatus){H(x("select_substatus"),{error:!0});return}let b=ut(U,s,r);je(b),z();let y=it(),v=await et();v&&(v.focus(),document.execCommand("insertHTML",!1,b),Ze(v),U.currentSubStatus&&Me[U.currentSubStatus]&&await nt(Me[U.currentSubStatus]),H(x("inserido_copiado")),P.playSuccess(),q()),y()}function q(){U.reset(),s.reset(),r.reset(),o.querySelectorAll("select").forEach(b=>b.value=""),o.querySelector("#sub-status-select").disabled=!0,m.innerHTML="",p.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none"}async function f(){let b={};m.querySelectorAll("input, textarea").forEach(v=>b[v.id]=v.value);let y=await he();return{currentCaseType:U.currentCaseType,currentLang:U.currentLang,status:U.currentStatus,subStatus:U.currentSubStatus,formData:b,activeTasks:s.getCheckedElements().map(v=>({key:v.value,count:v.count})),clientName:y.advertiserName,cid:y.cid,timestamp:new Date().toISOString()}}let A=b=>new Promise(y=>setTimeout(y,b));async function w(b){U.setLanguage(b.currentLang),U.setCaseType(b.currentCaseType);let y=o.querySelector(`#lang-selector button[data-lang="${b.currentLang}"]`);y&&y.click();let v=o.querySelector(`#type-selector button[data-type="${b.currentCaseType}"]`);if(v&&v.click(),b.status){let O=o.querySelector("#main-status-select");if(O.value=b.status,O.dispatchEvent(new Event("change")),await A(50),b.subStatus){let R=o.querySelector("#sub-status-select");R.value=b.subStatus,R.dispatchEvent(new Event("change")),await A(100);for(let k in b.formData){let $=document.getElementById(k);$&&($.value=b.formData[k],$.dispatchEvent(new Event("input")))}b.activeTasks&&b.activeTasks.forEach(k=>s.setTaskCount(k.key,k.count))}}}function x(b){return ce[U.currentLang]?.[b]||ce.pt?.[b]||b}function T(){let b=document.createElement("div");return b.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',b.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",b.onclick=y=>{y.stopPropagation(),B()},b.title="Alternar para Split & Transfer",b}function L(b){let y=o.querySelector(".js-label-idioma");y&&(y.textContent=x("idioma"));let v=o.querySelector(".js-label-fluxo");v&&(v.textContent=x("fluxo"));let O=o.querySelector(".js-label-portugal");O&&(O.textContent=x("caso_portugal"));let R=o.querySelector(".js-label-status");R&&(R.textContent=x("status_principal"));let k=o.querySelector(".js-label-substatus");k&&(k.textContent=x("substatus"));let $=o.querySelector(".js-btn-copy");$&&($.textContent=x("copiar"));let W=o.querySelector(".js-btn-generate");W&&(W.textContent=x("preencher"));let ee=o.querySelector(".js-btn-reset");ee&&(ee.textContent=x("limpar"));let J=document.getElementById("manual-task-toggle");J&&(J.textContent=x("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let re=o.querySelector(".js-btn-park span");re&&(re.textContent=x("guardar"));let Q=e.querySelector(".js-drawer-title");Q&&(Q.textContent=x("rascunhos_salvos")),r&&r.setLanguage&&r.setLanguage(x),s&&s.setLanguage&&s.setLanguage(x)}return U.setLanguage("pt"),U.setCaseType("bau"),document.body.appendChild(e),z}var qe={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function ao(){let t="v4.2.0 CR-Hybrid",e="CANNED_RESPONSES",o=Object.keys(qe)[0],n="",i="list",a=!1,r={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},s={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:r.bgApp},p={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},l={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},c={padding:"20px 24px 12px 24px",flexShrink:"0",background:r.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${r.borderSubtle}`},h={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:r.textPrimary,boxSizing:"border-box",outline:"none",transition:r.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},u={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},m={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:r.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:r.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},g={background:r.primaryBg,color:r.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},d={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},S={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:r.bgSurface,border:"1px solid transparent",boxShadow:r.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},E=document.createElement("div");E.id="quick-email-popup",E.classList.add("cw-module-window"),Object.assign(E.style,se,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let N={popup:E,googleLine:null,focusElement:null};function z(){a=!a,pe(a,E,"cw-btn-email"),a||setTimeout(()=>A(),300)}let B=le(E,"Quick Email",t,"Templates & Automa\xE7\xF5es",N,()=>z()),V=document.createElement("div");Object.assign(V.style,s);let j=document.createElement("div");Object.assign(j.style,p);let _=document.createElement("div");Object.assign(_.style,l);let F=document.createElement("div");Object.assign(F.style,c);let M=document.createElement("input");M.placeholder="Pesquisar templates...",Object.assign(M.style,h),M.onfocus=()=>{M.style.borderColor=r.primary,M.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",M.style.background="#fff"},M.onblur=()=>{M.style.borderColor="transparent",M.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",M.style.background="#fff"},N.focusElement=M;let G=document.createElement("div");Object.assign(G.style,u);let D=document.createElement("div");Object.assign(D.style,d),F.appendChild(M),F.appendChild(G),_.appendChild(F),_.appendChild(D);let I=document.createElement("div");Object.assign(I.style,l);let C=document.createElement("div");Object.assign(C.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),I.appendChild(C),j.appendChild(_),j.appendChild(I),V.appendChild(j),E.appendChild(B),E.appendChild(V),document.body.appendChild(E);async function q(L,b){try{a&&z();let y=it();await new Promise(v=>setTimeout(v,800)),b==="email"?await eo(L):b==="cr"&&await nt(L),y()}catch(y){console.error("\u274C Erro:",y);let v=document.querySelector(".cw-focus-backdrop");v&&v.classList.remove("active")}}function f(L){i="detail",j.style.transform="translateX(-50%)";let b='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',y='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';C.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${b}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${L.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${L.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${L.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${y} Usar Template
                </button>
            </div>
        `;let v=C.querySelector("#csa-back-btn");v.onmouseenter=()=>v.style.background="#f1f3f4",v.onmouseleave=()=>v.style.background="none",v.onclick=A;let O=C.querySelector("#csa-insert-btn");O.onmouseenter=()=>{O.style.transform="translateY(-1px)",O.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},O.onmouseleave=()=>{O.style.transform="translateY(0)",O.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},O.onclick=()=>{O.style.transform="scale(0.96)",q(L,"email"),setTimeout(()=>{O.style.transform="scale(1)",A()},300)}}function A(){i="list",j.style.transform="translateX(0)"}function w(L,b,y=null){let v=document.createElement("button"),O=y?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${y}</span>`:"";return v.innerHTML=`${O}${L}`,Object.assign(v.style,m),o===b&&n===""?Object.assign(v.style,g):(v.onmouseenter=()=>{v.style.background="#F1F3F4",v.style.borderColor="#DADCE0"},v.onmouseleave=()=>{v.style.background="#FFFFFF",v.style.borderColor="#DADCE0"}),v.onclick=()=>{o=b,n="",M.value="",x(),T()},v}function x(){G.innerHTML="",G.appendChild(w("Smart CRs",e,"\u26A1")),G.appendChild(w("Pessoal","PERSONAL_LIBRARY","\u{1F464}")),Object.keys(qe).forEach(L=>{G.appendChild(w(qe[L].title,L))})}function T(){D.innerHTML="";let L=[];if(n.trim()!==""){let R=n.toLowerCase();Object.values(qe).forEach(k=>{k.emails.forEach($=>{($.name.toLowerCase().includes(R)||$.subject.toLowerCase().includes(R))&&L.push({type:"email",data:$})})}),ie.getSnippets("email").forEach(k=>{(k.title.toLowerCase().includes(R)||k.subject&&k.subject.toLowerCase().includes(R))&&L.push({type:"email",data:{name:k.title,subject:k.subject||"Sem Assunto",body:k.content}})}),Object.entries(Me).forEach(([k,$])=>{if(!$)return;(k.replace(/_/g," ").toLowerCase().includes(R)||$.toLowerCase().includes(R))&&L.push({type:"cr",key:k,code:$})})}else o===e?Object.entries(Me).forEach(([R,k])=>{k&&L.push({type:"cr",key:R,code:k})}):o==="PERSONAL_LIBRARY"?ie.getSnippets("email").forEach(R=>{L.push({type:"email",data:{name:R.title,subject:R.subject||"Sem Assunto",body:R.content}})}):qe[o]&&qe[o].emails.forEach(R=>{L.push({type:"email",data:R})});if(L.length===0){D.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let y='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',v='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',O='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';L.forEach(R=>{let k=document.createElement("div");if(Object.assign(k.style,S),R.type==="email"){let $=R.data,W=$.subject.length>45?$.subject.substring(0,45)+"...":$.subject;k.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${y}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${$.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${W}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${O}</div>
                `,k.onclick=()=>f($)}else{let $=R.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");k.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${v}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${$}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${R.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,k.onclick=()=>{k.style.transform="scale(0.98)",k.style.background="#FEF7E0",setTimeout(()=>{k.style.transform="scale(1)",k.style.background="#fff",q(R.code,"cr")},150)}}k.onmouseenter=()=>{k.style.transform="translateY(-2px)",k.style.boxShadow=r.shadowHover,R.type==="cr"?k.style.borderLeft="3px solid #Fbbc04":k.style.borderLeft="3px solid #1a73e8"},k.onmouseleave=()=>{k.style.transform="translateY(0)",k.style.boxShadow=r.shadowCard,k.style.borderLeft="1px solid transparent"},D.appendChild(k)})}return M.addEventListener("input",L=>{n=L.target.value,n!==""?Array.from(G.children).forEach(b=>{Object.assign(b.style,m),b.style.opacity="0.6"}):x(),T()}),x(),T(),z}var io={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function ro(){let t="v2.6 (Context HD)",e="csa-local-styles";if(!document.getElementById(e)){let w=document.createElement("style");w.id=e,w.innerHTML=`
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
      `,document.head.appendChild(w)}let o={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#FFFFFF",scrollBehavior:"smooth"},card:{background:"#FFFFFF",border:"1px solid #E5E7EB",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"12px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"8px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.1s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.6",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"18px",height:"18px",borderRadius:"6px",border:"2px solid #DADCE0",marginRight:"12px",marginTop:"2px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},i="PT",a="BAU",r=!1,s=document.createElement("div");s.id="call-script-popup",s.classList.add("cw-module-window"),Object.assign(s.style,se,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let p={popup:s,googleLine:null},l=null;function c(){r&&he().then(w=>{let x=s.querySelector("#cw-ctx-name"),T=s.querySelector("#cw-ctx-cid"),L=s.querySelector("#cw-ctx-email");if(x&&(x.textContent=w.advertiserName||"Cliente Desconhecido"),T){let b=w.cid||"---";T.textContent!==b&&(T.textContent=b)}if(L){let b=w.clientEmail||"N\xE3o encontrado";L.textContent!==b&&(L.textContent=b,L.title=b)}})}function h(){r=!r,pe(r,s,"cw-btn-script"),r?(c(),l||(l=setInterval(c,2e3))):l&&(clearInterval(l),l=null)}let u=le(s,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",p,()=>{h()});s.appendChild(u);let m=document.createElement("div");Object.assign(m.style,o.contextBanner),m.innerHTML=`
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
  `;let g=(w,x)=>{let T=m.querySelector(w),L=m.querySelector(x);T.onclick=()=>{let b=L.textContent;!b||b.includes("---")||b.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(b),P.playSuccess(),T.classList.add("copied"),setTimeout(()=>T.classList.remove("copied"),1500))}};s.appendChild(m);let d=document.createElement("div");Object.assign(d.style,o.progressBarContainer);let S=document.createElement("div");Object.assign(S.style,o.progressBarFill),d.appendChild(S),s.appendChild(d);let E=document.createElement("div");E.id="csa-content",Object.assign(E.style,o.contentArea),s.appendChild(E);let N=document.createElement("div");Object.assign(N.style,o.footer);let z=document.createElement("span");z.textContent="by lucaste@",Object.assign(z.style,{fontSize:"10px",color:"#bdc1c6"});let B=document.createElement("button");B.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(B.style,o.resetBtn),B.onmouseenter=()=>B.style.background="#fce8e6",B.onmouseleave=()=>B.style.background="transparent",B.onclick=()=>{B.style.transform="scale(0.9)",setTimeout(()=>B.style.transform="scale(1)",150);for(let w in n)delete n[w];C()},N.appendChild(z),N.appendChild(B),s.appendChild(N);let V=document.createElement("div");Object.assign(V.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let j=document.createElement("div");Object.assign(j.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let _=document.createElement("div");_.textContent="BAU";let F=document.createElement("div");F.textContent="LT",Object.assign(_.style,ze),Object.assign(F.style,ze),j.appendChild(_),j.appendChild(F);let M=document.createElement("select");Object.assign(M.style,Ue,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),M.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',M.value=i,V.appendChild(j),V.appendChild(M),E.appendChild(V);let G=document.createElement("div");G.id="csa-checklist-area",E.appendChild(G);let D=document.createElement("div");Object.assign(D.style,Ee),D.className="no-drag",D.title="Redimensionar",s.appendChild(D),Te(s,D),document.body.appendChild(s),g("#cw-pill-cid","#cw-ctx-cid"),g("#cw-pill-email","#cw-ctx-email");function I(w){return w}function C(){G.innerHTML="";let w=`${i} ${a}`,x=io[w];if(!x){G.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',S.style.width="0%";return}let T=x.color||"#1a73e8",L=0,b=0;["inicio","meio","fim"].forEach(y=>{x[y]&&(L+=x[y].length)}),["inicio","meio","fim"].forEach((y,v)=>{let O=x[y];if(!O||O.length===0)return;let R=document.createElement("div");Object.assign(R.style,o.card);let k=document.createElement("div");Object.assign(k.style,o.cardTitle);let $="";y==="inicio"?i.includes("ES")?$="Apertura":i.includes("EN")?$="Opening":$="Abertura":y==="meio"?i.includes("ES")?$="Implementaci\xF3n":i.includes("EN")?$="Implementation":$="Implementa\xE7\xE3o (Tag Support)":y==="fim"&&(i.includes("ES")?$="Cierre":i.includes("EN")?$="Closing":$="Fechamento"),k.textContent=$;let W=document.createElement("span");W.style.fontSize="11px",W.style.opacity="0.7",W.style.fontWeight="500",W.style.background="#f1f3f4",W.style.padding="2px 8px",W.style.borderRadius="10px",k.appendChild(W),R.appendChild(k);let ee=0;O.forEach((J,re)=>{let Q=`${w}-${y}-${re}`,me=!!n[Q];me&&(b++,ee++);let ae=document.createElement("div");Object.assign(ae.style,o.itemRow);let K=document.createElement("div");Object.assign(K.style,o.checkbox);let te=document.createElement("span");te.innerHTML=J,te.style.flex="1",me?(Object.assign(ae.style,o.itemCompleted),K.style.background=T,K.style.borderColor=T,K.style.transform="scale(1)",K.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ae.style.textDecoration="none",ae.style.opacity="1",K.style.background="transparent",K.style.borderColor="#dadce0",K.style.transform="scale(1)",K.innerHTML=""),ae.onclick=()=>{let ne=!n[Q];n[Q]=ne,P.playClick(),ne?(K.style.transform="scale(1.2)",setTimeout(()=>K.style.transform="scale(1)",150),Object.assign(ae.style,o.itemCompleted),K.style.background=T,K.style.borderColor=T,K.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ae.style.textDecoration="none",ae.style.opacity="1",K.style.background="transparent",K.style.borderColor="#dadce0",K.innerHTML=""),q(w,x)},ae.onmouseenter=()=>{n[Q]||(ae.style.background="#f1f3f4",K.style.borderColor=T)},ae.onmouseleave=()=>{n[Q]||(ae.style.background="transparent",K.style.borderColor="#dadce0")},ae.appendChild(K),ae.appendChild(te),R.appendChild(ae)}),ee===O.length&&O.length>0&&(W.style.color="#1e8e3e",W.style.background="#e6f4ea",R.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),W.textContent=`${ee}/${O.length}`,G.appendChild(R)}),f(L,b)}function q(w,x){let T=0,L=0;["inicio","meio","fim"].forEach(b=>{let y=x[b]||[];T+=y.length,y.forEach((v,O)=>{n[`${w}-${b}-${O}`]&&L++})}),f(T,L),setTimeout(()=>C(),200)}function f(w,x){let T=w===0?0:x/w*100;S.style.width=`${T}%`,S.style.background=T===100?"#34A853":"linear-gradient(90deg, #4285F4, #34A853)"}function A(w){a=w;let x=qt();Object.assign(_.style,ze),Object.assign(F.style,ze),Object.assign(w==="BAU"?_.style:F.style,x),C()}return _.onclick=()=>A("BAU"),F.onclick=()=>A("LT"),M.addEventListener("change",w=>{i=w.target.value,C()}),A(a),h}var He={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Le={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},rt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},ht="cw_link_history_v4";function so(t,e){try{let o=JSON.parse(localStorage.getItem(ht)||"[]");o=o.filter(n=>n.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(ht,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function zo(){try{return JSON.parse(localStorage.getItem(ht)||"[]")}catch{return[]}}function lo(){let t="v4.6",e="",o=!1,n=null,i=!1,a={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},r=document.createElement("div");r.id="links-popup",r.classList.add("cw-module-window"),Object.assign(r.style,se,{right:"100px",width:"600px",height:"650px",background:a.bgApp,overflow:"hidden"});let p=le(r,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:r,googleLine:null},()=>D());r.appendChild(p);let l=document.createElement("div");l.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",r.appendChild(l);let c=document.createElement("div");c.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${a.bgSidebar};
      border-right: 1px solid ${a.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,l.appendChild(c);let h=document.createElement("div");h.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",l.appendChild(h);let u=document.createElement("div");u.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let m=document.createElement("div");m.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let g=document.createElement("div");g.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',g.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let d=document.createElement("input");d.type="text",d.placeholder="Buscar ferramenta ou SOP...",d.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${a.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,d.onfocus=()=>{m.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",m.style.border="1px solid #1a73e8"},d.onblur=()=>{m.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",m.style.border="1px solid transparent"},m.appendChild(g),m.appendChild(d),u.appendChild(m),h.appendChild(u);let S=document.createElement("div");S.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",h.appendChild(S);let E=null;function N(){if(E)return;E=document.createElement("div"),E.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let I=document.createElement("div");I.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",I.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let C=document.createElement("button");C.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',C.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",C.onclick=()=>{B(),i=!1,F()},I.appendChild(C),E.appendChild(I);let q=document.createElement("div");q.id="cw-history-list",q.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",E.appendChild(q),h.appendChild(E)}function z(){E||N();let I=E.querySelector("#cw-history-list");I.innerHTML="";let C=zo();C.length===0?I.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':C.forEach(q=>{let f=G(q,Le[q._originalCat],!0,q._originalCat);I.appendChild(f)}),requestAnimationFrame(()=>E.style.transform="translateY(0)")}function B(){E&&(E.style.transform="translateY(100%)")}function V(){c.innerHTML="";let I=j("history","Recentes",Le.history);I.id="cw-sidebar-btn-history",I.onclick=()=>{P.playClick(),i=!i,i?z():B(),F()},c.appendChild(I);let C=document.createElement("div");C.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",c.appendChild(C),Object.keys(He).forEach(q=>{let f=He[q],A=j(q,f.label,Le[q]);A.id=`cw-sidebar-btn-${q}`,A.onclick=()=>{P.playClick(),i&&(i=!1,B()),_(q)},c.appendChild(A)})}function j(I,C,q){let f=document.createElement("div");f.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${a.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,f.title=C,f.dataset.key=I;let A=document.createElement("div");A.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",A.innerHTML=q||Le.tasks;let w=document.createElement("div");return w.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",w.textContent=C,f.appendChild(A),f.appendChild(w),f.onmouseenter=()=>{n!==I&&!(I==="history"&&i)&&(f.style.background="#F1F3F4",A.style.transform="scale(1.1)")},f.onmouseleave=()=>{n!==I&&!(I==="history"&&i)&&(f.style.background="transparent",A.style.transform="scale(1)")},f}function _(I){let C=document.getElementById(`cat-anchor-${I}`);C&&(C.scrollIntoView({behavior:"smooth",block:"start"}),n=I,F())}function F(){Object.keys(He).forEach(C=>{let q=c.querySelector(`#cw-sidebar-btn-${C}`);if(q)if(n===C&&!i){let f=rt[C];q.style.background=f.bg,q.style.color=f.color,q.querySelector("div:first-child").style.transform="scale(1.1)"}else q.style.background="transparent",q.style.color=a.textSecondary,q.querySelector("div:first-child").style.transform="scale(1)"});let I=c.querySelector("#cw-sidebar-btn-history");I&&(i?(I.style.background="#3C4043",I.style.color="#FFFFFF"):(I.style.background="transparent",I.style.color=a.textSecondary))}function M(){if(S.innerHTML="",e.trim()!==""){let C=[];if(Object.entries(He).forEach(([f,A])=>{let w=A.links.filter(x=>x.name.toLowerCase().includes(e.toLowerCase())||x.desc.toLowerCase().includes(e.toLowerCase()));C.push(...w.map(x=>({...x,_cat:f})))}),C.length===0){S.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let q=document.createElement("div");q.innerHTML="Resultados da busca",q.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",S.appendChild(q),C.forEach(f=>{let A=G(f,Le[f._cat],!1,f._cat);S.appendChild(A)});return}Object.entries(He).forEach(([C,q])=>{let f=rt[C],A=document.createElement("div"),w=document.createElement("div");w.id=`cat-anchor-${C}`,w.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${f.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,w.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${f.color};"></div>
            ${q.label}
          `,A.appendChild(w);let x=document.createElement("div");x.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",q.links.forEach(T=>{let L=G(T,Le[C],!1,C);x.appendChild(L)}),A.appendChild(x),S.appendChild(A)});let I=document.createElement("div");I.style.height="80px",S.appendChild(I)}function G(I,C,q,f){let A=document.createElement("div"),w=rt[f]||rt.history;A.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let x=document.createElement("div");x.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${w.bg}; color: ${w.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,x.innerHTML=C||Le.tasks;let T=x.querySelector("svg");T&&(T.style.width="22px",T.style.height="22px");let L=document.createElement("div");L.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let b=document.createElement("div");b.style.cssText=`font-size: 14px; font-weight: 600; color: ${a.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,b.textContent=I.name;let y=document.createElement("div");y.style.cssText=`font-size: 12px; color: ${a.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,y.textContent=I.desc,L.appendChild(b),L.appendChild(y);let v=document.createElement("div");return v.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',v.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,v.title="Copiar URL",A.onmouseenter=()=>{A.style.transform="translateY(-2px)",A.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",A.style.borderColor="rgba(0,0,0,0.05)",A.style.borderLeft=`4px solid ${w.color}`,v.style.opacity="1",v.style.background="#F1F3F4"},A.onmouseleave=()=>{A.style.transform="translateY(0)",A.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",A.style.border="1px solid transparent",v.style.opacity="0",v.style.background="transparent"},A.onclick=()=>{!q&&f&&so(I,f),window.open(I.url,"_blank")},v.onclick=O=>{O.stopPropagation(),P.playClick(),navigator.clipboard.writeText(I.url),!q&&f&&so(I,f),H("Link copiado!")},A.appendChild(x),A.appendChild(L),A.appendChild(v),A}d.addEventListener("input",I=>{e=I.target.value,M()});function D(){o=!o,pe(o,r,"cw-btn-links")}return document.body.appendChild(r),V(),M(),D}var ke=[];function yt(t){ke=t}var Bo=["lucaste","ricardogi"],Go=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function co(){let t="v4.9",e=!1,o=null,n=null;function i(f){if(!f)return"";try{let A=new Date(f);return isNaN(A.getTime())?String(f):A.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(f)}}if(!document.getElementById("cw-broadcast-hd-css")){let f=document.createElement("style");f.id="cw-broadcast-hd-css",f.innerHTML=`
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
      `,document.head.appendChild(f)}let a={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},r={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function s(f){return f?Object.entries(f).map(([A,w])=>`${A.replace(/[A-Z]/g,x=>"-"+x.toLowerCase())}:${w}`).join(";"):""}function p(f){if(!f||typeof f!="string")return"";let A=f;return A=A.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),A=A.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),A=A.replace(/_(.*?)_/g,"<i>$1</i>"),A=A.replace(/\n/g,"<br>"),A=Lt(A),A}let l=document.createElement("div");l.id="broadcast-popup",l.classList.add("cw-module-window"),Object.assign(l.style,se,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let c={popup:l,googleLine:null};function h(){if(e=!e,pe(e,l,"cw-btn-broadcast"),e){let f=document.getElementById("cw-btn-broadcast");f&&f.classList.remove("has-new"),_()}}let u=le(l,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",c,()=>h()),m=u.querySelector(".cw-header-actions")||u.lastElementChild,g=null;function d(){let f=null;try{f=Ae()}catch{console.warn("TechSol: Auth Pending")}if(f){let A=f.split("@")[0].toLowerCase(),w=Bo.includes(A);if(window._cwIsAdmin=w,window._cwCurrentUser=A,w&&m&&!m.querySelector("#cw-admin-btn")){let x=document.createElement("div");x.id="cw-admin-btn",x.className="cw-btn-interactive",x.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(x.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),x.title="Novo Aviso",x.onclick=T=>{T.stopPropagation(),N()},m.insertBefore(x,m.firstChild),g||E(),M()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(d,2e3))}if(m){let f=document.createElement("button");f.textContent="Limpar",f.className="cw-btn-interactive",Object.assign(f.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),f.onclick=A=>{A.stopPropagation(),P.playSuccess();let w=ke.map(x=>x.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(w)),M(),F()},m.insertBefore(f,m.firstChild)}l.appendChild(u);let S=document.createElement("div");S.id="cw-update-status",S.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",l.appendChild(S);function E(){g=document.createElement("div"),g.className="cw-editor-overlay",g.innerHTML=`
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
      `,g.querySelectorAll('input[name="cw-bc-type"]').forEach(x=>{x.addEventListener("change",()=>{g.querySelectorAll(".cw-radio-option").forEach(T=>T.classList.remove("checked")),x.parentElement.classList.add("checked")})}),setTimeout(()=>{let x=g.querySelector(".cw-radio-option.info");x&&x.classList.add("checked")},100);let f=g.querySelector("#cw-bc-cancel"),A=g.querySelector("#cw-bc-close-x"),w=g.querySelector("#cw-bc-send");f.onclick=z,A.onclick=z,w.onclick=B,l.appendChild(g)}function N(f=null){if(!g)return;let A=g.querySelector("#cw-editor-title-label"),w=g.querySelector("#cw-bc-title"),x=g.querySelector("#cw-bc-text"),T=g.querySelector("#cw-bc-send");if(f){n=f.id,A.textContent="Editar Aviso",w.value=f.title||"",x.value=f.text||"",T.textContent="Salvar Altera\xE7\xF5es";let L=f.type||"info",b=g.querySelector(`input[name="cw-bc-type"][value="${L}"]`);b&&b.click()}else{n=null,A.textContent="Novo Aviso",w.value="",x.value="",T.textContent="Publicar";let L=g.querySelector('input[name="cw-bc-type"][value="info"]');L&&L.click()}g.classList.add("active"),setTimeout(()=>w.focus(),300)}function z(){g&&g.classList.remove("active"),n=null}async function B(){let f=g.querySelector("#cw-bc-send"),A=g.querySelector("#cw-bc-title"),w=g.querySelector("#cw-bc-text"),x=g.querySelector('input[name="cw-bc-type"]:checked'),T=x?x.value:"info";if(!A.value.trim()||!w.value.trim()){H("Preencha todos os campos!",{error:!0});return}f.textContent="Salvando...",f.style.opacity="0.7";let L=!1;n?L=await oe.updateBroadcast(n,{title:A.value,text:w.value,type:T}):L=await oe.sendBroadcast({title:A.value,text:w.value,type:T,author:window._cwCurrentUser||"admin"}),L?(H(n?"Atualizado!":"Publicado!"),P.playSuccess(),z(),setTimeout(()=>_(),1500)):(H("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),f.textContent=n?"Salvar Altera\xE7\xF5es":"Publicar",f.style.opacity="1")}async function V(f){if(await ge("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await oe.deleteBroadcast(f)){H("Aviso removido."),P.playClick();let x=ke.findIndex(T=>T.id===f);x>-1&&ke.splice(x,1),M(),setTimeout(()=>_(),1500)}else H("Erro ao excluir.",{error:!0})}let j=document.createElement("div");j.className="cw-nice-scroll",Object.assign(j.style,a.feedContainer),l.appendChild(j);async function _(){e&&(S.style.display="block",S.innerHTML="\u{1F504} Sincronizando...");try{let f=await oe.fetchData();f&&f.broadcast&&(yt(f.broadcast),F(),e&&(M(),S.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{S.style.display="none"},1500)))}catch{e&&(S.innerHTML="\u26A0\uFE0F Offline")}}function F(){let f=document.getElementById("cw-btn-broadcast");if(!f)return;let A=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(ke.some(x=>!A.includes(x.id))){if(f.classList.add("has-new"),!f.querySelector(".cw-badge")){let x=document.createElement("div");x.className="cw-badge",Object.assign(x.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),f.appendChild(x)}}else{f.classList.remove("has-new");let x=f.querySelector(".cw-badge");x&&x.remove()}}function M(){j.innerHTML="";let f=l.querySelector("#cw-bau-widget");f&&f.remove();let A=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),w=[...ke].sort((y,v)=>{let O=new Date(y.date).getTime()||0;return(new Date(v.date).getTime()||0)-O}),x=w.findIndex(y=>y.title&&y.title.toLowerCase().includes("disponibilidade bau"));if(x!==-1){let y=w[x];w.splice(x,1);let v=document.createElement("div");v.id="cw-bau-widget",Object.assign(v.style,a.bauContainer);let O=[],R=(y.text||"").split(`
`),k=/\d{1,2}\/\d{1,2}/,$="\u{1F4C5}";if(R.forEach(Q=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(Q)?$="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(Q)&&($="\u{1F1EA}\u{1F1F8}");let me=Q.match(k);if(me){let ae=me[0],K=$;/🇧🇷|🇵🇹|PT|BR/i.test(Q)?K="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(Q)&&(K="\u{1F1EA}\u{1F1F8}"),O.some(ne=>ne.flag===K&&ne.date===ae)||O.push({flag:K,date:ae})}}),O.length===0){let Q=(y.text||"").match(/\d{1,2}\/\d{1,2}/g);Q&&[...new Set(Q)].forEach(me=>O.push({flag:"\u{1F4C5}",date:me}))}let W="",ee='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(ee=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${ee}
              `),O.length>0?W=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${O.map(me=>`
                  <div style="${s(a.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${s(a.bauFlag)}">${me.flag}</span>
                      <span style="${s(a.bauDate)}">${me.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${ee}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${p(y.text)}</div>
              `:W=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${p(y.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,v.innerHTML=`
              <div style="${s(a.bauHeader)}; margin-bottom:8px;">
                  <div style="${s(a.liveIndicator)}">
                      <div style="${s(a.pulseDot)}"></div>
                      <span style="${s(a.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${i(y.date)}</div>
              </div>
              ${W}
          `,S.after(v);let J=v.querySelector("#cw-bau-toggle-btn"),re=v.querySelector("#cw-bau-full");if(J&&re&&(J.onclick=()=>{let Q=re.style.display==="none";re.style.display=Q?"block":"none",J.textContent=Q?"Ocultar":"Detalhes"}),window._cwIsAdmin){let Q=v.querySelector(".cw-bau-edit");Q&&(Q.onclick=()=>N(y))}}let T=w.sort((y,v)=>{let O=A.includes(y.id),R=A.includes(v.id);return O===R?0:O?1:-1});if(T.length===0&&!x){let y=document.createElement("div");Object.assign(y.style,a.emptyState),y.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,j.appendChild(y)}let L=T.filter(y=>!A.includes(y.id)),b=T.filter(y=>A.includes(y.id));if(L.forEach(y=>j.appendChild(G(y,!1))),b.length>0){let y=document.createElement("div");Object.assign(y.style,a.historyDivider),y.innerHTML=`<span>Hist\xF3rico (${b.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let v=document.createElement("div");Object.assign(v.style,a.historyContainer),b.forEach(R=>v.appendChild(G(R,!0)));let O=!1;y.onclick=()=>{P.playClick(),O=!O,v.style.display=O?"flex":"none",y.querySelector("svg").style.transform=O?"rotate(180deg)":"rotate(0deg)"},j.appendChild(y),j.appendChild(v)}}function G(f,A){let w=document.createElement("div");Object.assign(w.style,A?a.cardHistory:a.card);let x=r[f.type]||r.info,T=document.createElement("div");Object.assign(T.style,a.cardHeader);let L=document.createElement("div");Object.assign(L.style,a.typeTag,{color:x.color,background:x.bg}),L.innerHTML=`${x.icon} <span>${f.type}</span>`;let b=document.createElement("span");if(Object.assign(b.style,a.dateTag),b.textContent=i(f.date),T.appendChild(L),A)T.appendChild(b);else{let k=document.createElement("button");k.className="cw-btn-interactive",Object.assign(k.style,a.dismissBtn),k.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',k.onmouseenter=()=>{k.style.color="#1e8e3e",k.style.background="#e6f4ea",k.style.borderColor="#1e8e3e"},k.onmouseleave=()=>{k.style.color="#5f6368",k.style.background="#fff",k.style.borderColor="rgba(0,0,0,0.1)"},k.onclick=$=>{$.stopPropagation(),P.playClick(),w.style.transform="translateX(20px)",w.style.opacity="0",setTimeout(()=>{let W=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");W.push(f.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(W)),M(),F()},200)},T.appendChild(k)}let y=document.createElement("div");Object.assign(y.style,a.cardContent);let v=document.createElement("div");Object.assign(v.style,a.msgTitle),v.textContent=f.title;let O=document.createElement("div");Object.assign(O.style,a.msgBody),O.innerHTML=p(f.text);let R=document.createElement("div");if(Object.assign(R.style,a.msgMeta),R.innerHTML=`Publicado por <b>${f.author||"Sistema"}</b>`,A||(R.innerHTML+=` \u2022 ${i(f.date)}`),y.appendChild(v),y.appendChild(O),y.appendChild(R),w.appendChild(T),w.appendChild(y),window._cwIsAdmin){let k=document.createElement("div");k.className="cw-card-actions";let $=document.createElement("button");$.className="cw-action-btn edit",$.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',$.onclick=()=>N(f);let W=document.createElement("button");W.className="cw-action-btn delete",W.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',W.onclick=()=>V(f.id),k.appendChild($),k.appendChild(W),w.appendChild(k)}return w}let D=oe.getCachedBroadcasts();D.length>0&&(yt(D),M()),setTimeout(d,500),_(),o||(o=setInterval(_,Go));let I=document.createElement("div");Object.assign(I.style,Ee),I.className="no-drag",l.appendChild(I),Te(l,I),document.body.appendChild(l);let C=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),q=ke.some(f=>!C.includes(f.id));return{toggle:h,hasUnread:q}}function po(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,o.overlay);let i=document.createElement("div");Object.assign(i.style,o.card);let a=document.createElement("div");Object.assign(a.style,o.icon);let r=document.createElement("div");Object.assign(r.style,o.title);let s=document.createElement("div");Object.assign(s.style,o.text);let p=document.createElement("div");Object.assign(p.style,o.dotsContainer);let l=document.createElement("div");Object.assign(l.style,o.btnContainer);let c=document.createElement("button");c.textContent="Pular",Object.assign(c.style,o.btn,o.btnSkip),c.onmouseover=()=>c.style.color="#202124",c.onmouseout=()=>c.style.color="#5f6368";let h=document.createElement("button");h.textContent="Pr\xF3ximo",Object.assign(h.style,o.btn,o.btnNext),h.onmouseover=()=>h.style.transform="scale(1.05)",h.onmouseout=()=>h.style.transform="scale(1)",l.appendChild(c),l.appendChild(h),i.appendChild(a),i.appendChild(r),i.appendChild(s),i.appendChild(p),i.appendChild(l),n.appendChild(i),document.body.appendChild(n);function u(g){let d=t[g];a.textContent=d.icon,r.textContent=d.title,s.textContent=d.text,p.innerHTML="",t.forEach((S,E)=>{let N=document.createElement("div");Object.assign(N.style,o.dot),E===g&&Object.assign(N.style,o.dotActive),p.appendChild(N)}),d.isLast?(c.style.display="none",h.textContent="Come\xE7ar \u{1F680}",h.style.width="100%"):(c.style.display="block",h.textContent="Pr\xF3ximo",h.style.width="auto")}function m(){localStorage.setItem("cw_onboarding_seen_v1","true"),n.style.opacity="0",i.style.transform="translateY(20px)",setTimeout(()=>n.remove(),400),P.playSuccess(),H("Tudo pronto! Use o menu flutuante.")}h.onclick=()=>{P.playClick(),e<t.length-1?(e++,u(e)):m()},c.onclick=async()=>{await ge("Pular o tutorial?")&&m()},u(0),requestAnimationFrame(()=>{n.style.opacity="1",i.style.transform="translateY(0)"})}var uo={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function mo(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&Po(t)}function Po(t){let e=uo.slides,o=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},i=document.createElement("div");Object.assign(i.style,n.overlay);let a=document.createElement("div");Object.assign(a.style,n.card);let r=document.createElement("div");Object.assign(r.style,n.badge),r.textContent=`Atualiza\xE7\xE3o ${t}`;let s=document.createElement("div");Object.assign(s.style,n.icon);let p=document.createElement("div");Object.assign(p.style,n.title);let l=document.createElement("div");Object.assign(l.style,n.text);let c=document.createElement("div");Object.assign(c.style,n.dotsContainer);let h=document.createElement("button");Object.assign(h.style,n.btn),h.onmouseover=()=>h.style.transform="scale(1.02)",h.onmouseout=()=>h.style.transform="scale(1)",a.appendChild(r),a.appendChild(s),a.appendChild(p),a.appendChild(l),a.appendChild(c),a.appendChild(h),i.appendChild(a),document.body.appendChild(i);function u(g){let d=e[g];s.textContent=d.icon,p.textContent=d.title,l.textContent=d.text,c.innerHTML="",e.forEach((S,E)=>{let N=document.createElement("div");Object.assign(N.style,n.dot),E===g&&Object.assign(N.style,n.dotActive),c.appendChild(N)}),g===e.length-1?h.textContent="Entendi, vamos l\xE1! \u{1F44D}":h.textContent="Pr\xF3ximo"}function m(){localStorage.setItem("cw_last_version",t),i.style.opacity="0",a.style.transform="translateY(30px)",setTimeout(()=>i.remove(),400),P.playSuccess(),H(`TechSol atualizado para ${t}!`)}h.onclick=()=>{P.playClick(),o<e.length-1?(o++,u(o)):m()},u(0),requestAnimationFrame(()=>{i.style.opacity="1",a.style.transform="translateY(0)"})}var go="cw_timezone_pinned",vt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],jo=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function bo(){let t="v2.2 Pro",e=!1,o=null,n="mx",i=JSON.parse(localStorage.getItem(go)||"[]"),a="",r="all",s=new Date;s.setHours(14,0,0,0);let p={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},l={container:{display:"flex",flexDirection:"column",height:"100%",background:p.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:p.surface,borderBottom:`1px solid ${p.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:p.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:p.primary,borderBottomColor:p.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:p.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:p.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${p.border}`,background:p.surface,color:p.textSub,transition:"all 0.2s"},chipActive:{background:p.primaryBg,color:p.primary,borderColor:p.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:p.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${p.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:p.surface,border:`1px solid ${p.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:p.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},c=document.createElement("div");c.id="timezone-popup",c.classList.add("cw-module-window"),Object.assign(c.style,se,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let u=le(c,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:c},()=>A());c.appendChild(u);let m=document.createElement("div");Object.assign(m.style,l.container),c.appendChild(m);let g=document.createElement("div");Object.assign(g.style,l.tabHeader);let d=document.createElement("div");d.textContent="Monitoramento",Object.assign(d.style,l.tabBtn,l.tabActive);let S=document.createElement("div");S.textContent="Planejador",Object.assign(S.style,l.tabBtn),g.appendChild(d),g.appendChild(S),m.appendChild(g);let E=document.createElement("div");Object.assign(E.style,l.toolbar);let N=document.createElement("div");Object.assign(N.style,l.searchInputWrapper);let z=document.createElement("div");z.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(z.style,l.searchIcon);let B=document.createElement("input");B.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(B.style,l.searchInput),B.onfocus=()=>{B.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",B.style.borderColor="rgba(26,115,232,0.3)"},B.onblur=()=>{B.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",B.style.borderColor="transparent"},B.oninput=w=>{a=w.target.value.toLowerCase(),I()},N.appendChild(z),N.appendChild(B),E.appendChild(N);let V=document.createElement("div");Object.assign(V.style,l.chipsRow),jo.forEach(w=>{let x=document.createElement("div");x.textContent=w.label,x.id=`tz-filter-${w.id}`,Object.assign(x.style,l.chip),w.id===r&&Object.assign(x.style,l.chipActive),x.onclick=()=>{P.playClick(),r=w.id,Array.from(V.children).forEach(T=>{Object.assign(T.style,l.chip)}),Object.assign(x.style,l.chipActive),I()},V.appendChild(x)}),E.appendChild(V),m.appendChild(E);let j=document.createElement("div");Object.assign(j.style,l.listContainer);let _=document.createElement("style");_.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",m.appendChild(_);let F=document.createElement("div");Object.assign(F.style,l.plannerWrapper,{display:"none"}),m.appendChild(j),m.appendChild(F),d.onclick=()=>M("live"),S.onclick=()=>M("plan");function M(w){P.playClick(),w==="live"?(Object.assign(d.style,l.tabActive),Object.assign(S.style,l.tabBtn),S.style.borderBottomColor="transparent",j.style.display="flex",E.style.display="flex",F.style.display="none",q()):(Object.assign(S.style,l.tabActive),Object.assign(d.style,l.tabBtn),d.style.borderBottomColor="transparent",F.style.display="flex",j.style.display="none",E.style.display="none",f(),C())}function G(w){return w>=9&&w<17?{color:p.success,bg:p.successBg,label:"Aberto",icon:"\u{1F7E2}"}:w>=8&&w<9?{color:p.warning,bg:p.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:w>=17&&w<19?{color:p.warning,bg:p.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:p.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function D(w){i.includes(w)?i=i.filter(x=>x!==w):i.push(w),localStorage.setItem(go,JSON.stringify(i)),I(),P.playClick()}function I(){j.innerHTML="";let w=new Date,x=vt.filter(L=>{let b=L.name.toLowerCase().includes(a)||L.label.toLowerCase().includes(a),y=r==="all"||L.region===r;return b&&y});if(x.sort((L,b)=>{let y=i.includes(L.id),v=i.includes(b.id);return y&&!v?-1:!y&&v?1:L.name.localeCompare(b.name)}),x.length===0){j.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}x.forEach(L=>{let b=i.includes(L.id),y=w.toLocaleTimeString("pt-BR",{timeZone:L.zone,hour:"2-digit",minute:"2-digit"}),v=parseInt(y.split(":")[0]),O=G(v),R=v<6||v>18,k=document.createElement("div");Object.assign(k.style,l.hubCard),b&&Object.assign(k.style,l.hubCardPinned);let $=b?"\u2605":"\u2606",W=b?"#F9AB00":"#DADCE0";k.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${W}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${$}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${L.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${p.text}; letter-spacing:-0.2px;">${L.name}</div>
                        <div style="font-size:12px; color:${p.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${R?"\u{1F319}":"\u2600\uFE0F"} ${L.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${p.text}; font-family:'Google Sans', sans-serif;">${y}</div>
                    <div style="font-size:11px; font-weight:600; color:${O.color}; background:${O.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${O.label}
                    </div>
                </div>
            `,k.onmouseenter=()=>{k.style.transform="translateY(-2px)",k.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},k.onmouseleave=()=>{k.style.transform="translateY(0)",k.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let ee=k.querySelector(".cw-pin-btn");ee.onmouseenter=()=>{ee.style.backgroundColor="#F1F3F4"},ee.onmouseleave=()=>{ee.style.backgroundColor="transparent"},ee.onclick=J=>{J.stopPropagation(),D(L.id)},k.onclick=()=>{n=L.id,M("plan")},j.appendChild(k)});let T=document.createElement("div");T.style.height="20px",T.style.width="100%",j.appendChild(T)}function C(){F.innerHTML="";let w=document.createElement("div"),x=document.createElement("label");x.textContent="Onde est\xE1 o cliente?",x.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let T=document.createElement("select");Object.assign(T.style,Ue),T.style.padding="14px",[...vt].sort((te,ne)=>te.name.localeCompare(ne.name)).forEach(te=>{let ne=document.createElement("option");ne.value=te.id,ne.textContent=`${te.flag} ${te.name} (${te.zone})`,te.id===n&&(ne.selected=!0),T.appendChild(ne)}),T.onchange=te=>{n=te.target.value,K(),P.playClick()},w.appendChild(x),w.appendChild(T),F.appendChild(w);let b=document.createElement("div");Object.assign(b.style,l.timeComparisonRow);let y=document.createElement("div");Object.assign(y.style,l.timeCard),y.style.backgroundColor="#F8FAFF",y.style.borderColor="#E8F0FE",y.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let v=document.createElement("div");Object.assign(v.style,l.timeCard),v.style.backgroundColor="#FFF8E1",v.style.borderColor="#FEF7E0",v.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,b.appendChild(y),b.appendChild(v),F.appendChild(b);let O=document.createElement("div");O.id="cw-planner-status",Object.assign(O.style,l.statusBadge),F.appendChild(O);let R=document.createElement("div");Object.assign(R.style,{padding:"0 4px",marginTop:"12px"});let k=document.createElement("div");k.textContent="Arraste para simular o hor\xE1rio:",k.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let $=document.createElement("div");Object.assign($.style,l.timelineContainer);let W=document.createElement("div");Object.assign(W.style,l.timelineTrack);let ee=document.createElement("div");Object.assign(ee.style,l.dayZone),W.appendChild(ee);let J=document.createElement("input");J.type="range",J.min="0",J.max="1439",J.step="15",J.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let re=document.createElement("div");re.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",re.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",$.appendChild(W),$.appendChild(J),$.appendChild(re),R.appendChild(k),R.appendChild($),F.appendChild(R);let Q=y.querySelector("#cw-time-input-br"),me=v.querySelector("#cw-time-display-client"),ae=v.querySelector("#cw-client-label");function K(){let te=vt.find(yo=>yo.id===n);ae.textContent=`${te.flag} ${te.label} (${te.zone})`;let ne=s.getHours(),Re=s.getMinutes(),ho=`${String(ne).padStart(2,"0")}:${String(Re).padStart(2,"0")}`;Q.value=ho,J.value=ne*60+Re;let wt=s.toLocaleTimeString("pt-BR",{timeZone:te.zone,hour:"2-digit",minute:"2-digit"});me.textContent=wt;let _e=parseInt(wt.split(":")[0]);_e>=9&&_e<17?(O.style.background=p.successBg,O.style.color=p.success,O.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):_e>=8&&_e<9||_e>=17&&_e<19?(O.style.background=p.warningBg,O.style.color=p.warning,O.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(O.style.background=p.errorBg,O.style.color=p.error,O.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}J.oninput=te=>{let ne=parseInt(te.target.value);s.setHours(Math.floor(ne/60)),s.setMinutes(ne%60),K()},Q.oninput=te=>{let[ne,Re]=te.target.value.split(":");ne&&Re&&(s.setHours(parseInt(ne)),s.setMinutes(parseInt(Re)),K())},K()}function q(){I(),o||(o=setInterval(I,6e4))}function f(){o&&(clearInterval(o),o=null)}function A(){e=!e,pe(e,c,"cw-btn-timezone"),e?M("live"):f()}return document.body.appendChild(c),A}function fo(){let t="v1.1",e=!1,o="general",n=null,i=null;if(!document.getElementById("cw-lib-styles")){let C=document.createElement("style");C.id="cw-lib-styles",C.innerHTML=`
            .cw-lib-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .cw-lib-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; border-color: rgba(0, 122, 255, 0.3) !important; }
            .cw-tactile { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.92) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #5F6368; }
            .cw-toolbar-btn:hover { background: #F1F3F4; color: #007AFF; border-color: #DADCE0; }
            .cw-toolbar-btn.active { background: #E8F0FE; color: #007AFF; border-color: #007AFF; }
        `,document.head.appendChild(C)}let a={bg:"#F0F2F5",surface:"#FFFFFF",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",text:"#1C1C1E",textSub:"#8E8E93",border:"rgba(0, 0, 0, 0.08)",danger:"#FF3B30"},r={container:{display:"flex",flexDirection:"column",height:"100%",background:a.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"12px 16px 0 16px",background:a.surface,borderBottom:`1px solid ${a.border}`},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:a.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",userSelect:"none"},tabActive:{color:a.primary,borderBottomColor:a.primary,fontWeight:"600"},listContainer:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"},emptyState:{padding:"40px 20px",textAlign:"center",color:"#BDC1C6",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},card:{background:a.surface,borderRadius:"16px",padding:"16px",border:`1px solid ${a.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative",overflow:"hidden"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},cardTitle:{fontSize:"14px",fontWeight:"600",color:a.text},cardPreview:{fontSize:"12px",color:a.textSub,lineHeight:"1.5",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"12px",paddingTop:"12px",borderTop:`1px dashed ${a.border}`},actionBtn:{padding:"6px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",cursor:"pointer",border:"none",background:"transparent",transition:"background 0.2s"},fab:{position:"absolute",bottom:"24px",right:"24px",width:"56px",height:"56px",borderRadius:"16px",background:a.primary,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"transform 0.2s",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.85)",backdropFilter:"blur(25px) saturate(180%)",webkitBackdropFilter:"blur(25px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"16px 24px",background:a.surface,borderBottom:`1px solid ${a.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"24px",overflowY:"auto"},inputGroup:{marginBottom:"20px"},label:{display:"block",fontSize:"12px",fontWeight:"700",color:a.textSub,marginBottom:"8px",textTransform:"uppercase"},input:{width:"100%",padding:"12px",borderRadius:"8px",border:`1px solid ${a.border}`,fontSize:"14px",fontFamily:"inherit",outline:"none",background:a.surface,boxSizing:"border-box"}},s=document.createElement("div");s.id="library-popup",s.classList.add("cw-module-window"),Object.assign(s.style,se,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let l=le(s,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:s},()=>I());s.appendChild(l);let c=document.createElement("div");Object.assign(c.style,r.container),s.appendChild(c);let h=document.createElement("div");Object.assign(h.style,r.tabHeader);let u=[{id:"general",label:"Geral",icon:"\u{1F4CB}"},{id:"note",label:"Notas",icon:"\u{1F4DD}"},{id:"email",label:"Emails",icon:"\u{1F4E7}"}];u.forEach(C=>{let q=document.createElement("div");q.innerHTML=`${C.icon} ${C.label}`,q.id=`lib-tab-${C.id}`,Object.assign(q.style,r.tabBtn),C.id===o&&Object.assign(q.style,r.tabActive),q.onmouseenter=()=>P.playHover(),q.onclick=()=>V(C.id),h.appendChild(q)}),c.appendChild(h);let m=document.createElement("div");Object.assign(m.style,r.listContainer),c.appendChild(m);let g=document.createElement("div");g.className="cw-fab cw-tactile",Object.assign(g.style,r.fab),g.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',g.onmouseenter=()=>g.style.transform="scale(1.1)",g.onmouseleave=()=>g.style.transform="scale(1)",g.onclick=()=>_(),c.appendChild(g),n=document.createElement("div"),Object.assign(n.style,r.editorOverlay);let d=document.createElement("div");Object.assign(d.style,r.editorHeader),d.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let S=document.createElement("button");S.innerHTML="Cancelar",S.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",S.onclick=F,d.appendChild(S),n.appendChild(d);let E=document.createElement("div");Object.assign(E.style,r.editorBody),n.appendChild(E);let N=document.createElement("div");N.style.cssText="padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";let z=document.createElement("button");z.textContent="Salvar",z.style.cssText="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);",z.onclick=M,N.appendChild(z),n.appendChild(N),c.appendChild(n);let B=document.createElement("div");Object.assign(B.style,Ee),B.className="no-drag",s.appendChild(B),Te(s,B),document.body.appendChild(s);function V(C){P.playClick(),o=C,u.forEach(q=>{let f=document.getElementById(`lib-tab-${q.id}`);q.id===C?Object.assign(f.style,r.tabActive):Object.assign(f.style,r.tabBtn)}),j()}function j(){m.innerHTML="";let C=ie.getSnippets(o);if(C.length===0){m.innerHTML=`
                <div style="${D(r.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;return}C.forEach(q=>{let f=document.createElement("div");f.className="cw-lib-card",Object.assign(f.style,r.card),q.isCode&&(f.style.borderLeft=`4px solid ${a.primary}`,f.style.background="rgba(0, 122, 255, 0.02)");let A=q.content;if(q.isRich){let w=document.createElement("div");w.innerHTML=q.content;let x=w.querySelector("img");A=w.innerText.substring(0,150)+(w.innerText.length>150?"...":""),x&&(A="\u{1F5BC}\uFE0F [Cont\xE9m Imagens] "+A)}f.innerHTML=`
                <div style="${D(r.cardHeader)}">
                    <div style="${D(r.cardTitle)}">${q.title}</div>
                    <div style="display:flex; gap:4px;">
                        ${q.isCode?'<span style="font-size:10px; background:#F1F3F4; color:#5F6368; padding:2px 6px; border-radius:4px; font-family:monospace;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>':""}
                    </div>
                </div>
                <div style="${D(r.cardPreview)}; ${q.isCode?"font-family:'Roboto Mono', monospace; font-size:11px;":""}">${A}</div>
                <div style="${D(r.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${D(r.actionBtn)}; color:#007AFF; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${D(r.actionBtn)}; color:#8E8E93; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${D(r.actionBtn)}; color:#FF3B30; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                    </button>
                </div>
            `,f.onmouseenter=()=>{P.playHover()},f.querySelector(".cw-act-copy").onclick=w=>{if(w.stopPropagation(),P.playClick(),q.isRich){let x=new Blob([q.content],{type:"text/html"}),T=document.createElement("div");T.style.whiteSpace="pre-wrap",T.innerHTML=q.content;let L=new Blob([T.innerText],{type:"text/plain"}),b=[new ClipboardItem({"text/html":x,"text/plain":L})];navigator.clipboard.write(b)}else navigator.clipboard.writeText(q.content);H("Copiado!")},f.querySelector(".cw-act-edit").onclick=w=>{w.stopPropagation(),P.playClick(),_(q)},f.querySelector(".cw-act-del").onclick=async w=>{w.stopPropagation(),P.playClick(),await ge("Excluir este item?")&&(ie.delete(q.id),j(),H("Item exclu\xEDdo."))},m.appendChild(f)})}function _(C=null){i=C?C.id:null,E.innerHTML="",E.appendChild(G("title","T\xEDtulo / Nome",C?C.title:"")),o==="email"&&E.appendChild(G("subject","Assunto do Email",C?C.subject:""));let q="Conte\xFAdo";o==="email"&&(q="Corpo do Email (HTML)"),o==="note"&&(q="Texto da Nota (Reason)"),E.appendChild(G("content",q,C?C.content:"",{isRich:!0,isCode:C?C.isCode:!1})),d.querySelector("span").textContent=C?"Editar Item":"Novo Item",n.style.transform="translateY(0)",setTimeout(()=>{let f=E.querySelector("input");f&&f.focus()},300)}function F(){n.style.transform="translateY(100%)",setTimeout(()=>i=null,300)}async function M(){let C=E.querySelector("#cw-inp-title"),q=E.querySelector("#cw-inp-content"),f=C.value.trim(),A=q.contentEditable==="true"?q.innerHTML:q.value.trim(),w=q.getAttribute("data-is-code")==="true";if(!f||!A||A==="<br>"){H("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let x={id:i,type:o,title:f,content:A,isCode:w,isRich:q.contentEditable==="true"};if(o==="email"){let T=E.querySelector("#cw-inp-subject").value.trim();if(!T){H("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}x.subject=T}z.textContent="Salvando...",await ie.save(x),z.textContent="Salvar",F(),j(),H("Salvo com sucesso!"),P.playSuccess()}function G(C,q,f,A={}){let w=document.createElement("div");Object.assign(w.style,r.inputGroup);let x=document.createElement("label");x.textContent=q,Object.assign(x.style,r.label);let T;if(A.isRich){let L=document.createElement("div");L.style.cssText="display:flex; gap:6px; margin-bottom:12px; background:rgba(241, 243, 244, 0.8); padding:6px; border-radius:12px; border:1px solid #DADCE0; backdrop-filter: blur(10px);",L.innerHTML=`
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
            `,T=document.createElement("div"),T.contentEditable="true",Object.assign(T.style,r.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),T.innerHTML=f||"",A.isCode&&(T.style.fontFamily="'Roboto Mono', monospace",T.style.backgroundColor="#F8F9FA",T.setAttribute("data-is-code","true")),L.querySelectorAll(".cw-toolbar-btn").forEach(b=>{b.onmouseenter=()=>P.playHover(),b.onmousedown=()=>P.playClick()}),L.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),T.focus()},L.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),T.focus()},L.querySelector(".cw-tb-code").onclick=b=>{let v=!(T.getAttribute("data-is-code")==="true");T.setAttribute("data-is-code",v),T.style.fontFamily=v?"'Roboto Mono', monospace":"inherit",T.style.backgroundColor=v?"rgba(0, 122, 255, 0.03)":a.surface,v?b.currentTarget.classList.add("active"):b.currentTarget.classList.remove("active"),T.focus()},L.querySelector(".cw-tb-img").onclick=async()=>{let b=await Nt("Cole a URL da imagem:");b&&(document.execCommand("insertImage",!1,b),T.querySelectorAll("img").forEach(v=>{v.style.maxWidth="100%",v.style.borderRadius="8px"}))},T.onpaste=b=>{let y=(b.clipboardData||b.originalEvent.clipboardData).items;for(let v of y)if(v.kind==="file"&&v.type.startsWith("image/")){b.preventDefault();let O=v.getAsFile(),R=new FileReader;R.onload=k=>{let $=`<img src="${k.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,$)},R.readAsDataURL(O)}},w.appendChild(x),w.appendChild(L)}else T=document.createElement("input"),T.type="text",Object.assign(T.style,r.input),T.value=f||"",w.appendChild(x);return T.id=`cw-inp-${C}`,T.onfocus=()=>{T.style.borderColor=a.primary,T.style.boxShadow=`0 0 0 2px ${a.primaryBg}`},T.onblur=()=>{T.style.borderColor=a.border,T.style.boxShadow="none"},w.appendChild(T),w}function D(C){return Object.entries(C).map(([q,f])=>`${q.replace(/[A-Z]/g,A=>"-"+A.toLowerCase())}:${f}`).join(";")}function I(){e=!e,pe(e,s,"cw-btn-library"),e&&j()}return I}function xo(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},n="cw-configs-styles";if(!document.getElementById(n)){let m=document.createElement("style");m.id=n,m.innerHTML=`
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
        `,document.head.appendChild(m)}let i=document.createElement("div");i.id="configs-popup",i.classList.add("cw-module-window"),Object.assign(i.style,se,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r=le(i,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:i},()=>u());i.appendChild(r);let s=document.createElement("div");s.className="cw-configs-container",i.appendChild(s);let p=document.createElement("div");p.className="cw-configs-section",p.innerHTML=`
        <div class="cw-configs-section-title">Prefer\xEAncias de Som</div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label">Efeitos Sonoros</div>
                    <div class="cw-configs-desc">Ativar ou desativar sons de interface.</div>
                </div>
                <input type="checkbox" id="cw-config-sound-toggle" ${P.isMuted()?"":"checked"} style="cursor:pointer; width:20px; height:20px;">
            </div>
        </div>
    `;let l=p.querySelector("#cw-config-sound-toggle");l.onchange=m=>{P.setMuted(!m.target.checked),m.target.checked&&P.playClick()},s.appendChild(p);let c=document.createElement("div");c.className="cw-configs-section",c.innerHTML=`
        <div class="cw-configs-section-title">Apar\xEAncia</div>
        <div class="cw-configs-card">
            <div style="color:${o.textSub}; font-size:13px; text-align:center; padding:10px;">
                Em breve: Suporte a modo escuro e esquemas de cores.
            </div>
        </div>
    `,s.appendChild(c);let h=document.createElement("div");h.className="cw-configs-section",h.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <button class="cw-configs-btn">Reportar Bug</button>
                <button class="cw-configs-btn">Sugerir Recurso</button>
            </div>
        </div>
    `,s.appendChild(h);function u(){e=!e,pe(e,i,"cw-btn-configs"),e&&P.playClick()}return document.body.appendChild(i),u}function Ho(){if(window.techSolInitialized){pt();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{Ot();try{P.initGlobalListeners(),P.playStartup()}catch(l){console.warn("\xC1udio bloqueado:",l)}oe.fetchTips(),pt();let e=no(),o=ao(),n=ro(),i=lo(),a=bo(),r=fo(),s=xo(),p=co();to({toggleNotes:e,toggleEmail:o,toggleScript:n,toggleLinks:i,toggleTimezone:a,toggleLibrary:r,toggleConfigs:s,broadcastControl:p}),setTimeout(()=>{oe.logEvent("App","Start","Session Start"),po(),setTimeout(()=>{mo(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),H("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Ho();})();
