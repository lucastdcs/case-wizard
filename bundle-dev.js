(()=>{var Do=Object.defineProperty;var Ro=(t,e)=>()=>(t&&(e=t(t=0)),e);var zo=(t,e)=>{for(var o in e)Do(t,o,{get:e[o],enumerable:!0})};var it={};zo(it,{NotesState:()=>nt,notesState:()=>W});var nt,W,Xe=Ro(()=>{nt=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.excludedFields=new Set,this.activeFields=[];let e=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(e||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(e){this.currentCaseType!==e&&(this.currentCaseType=e,this.isDirty=!0,this.notify())}setLanguage(e){this.currentLang!==e&&(this.currentLang=e,this.notify())}setPortugalCase(e){this.isPortugalCase!==e&&(this.isPortugalCase=e,this.isDirty=!0,this.notify())}setConsent(e){this.consent!==e&&(this.consent=e,this.isDirty=!0,this.notify())}setTagSupportUsed(e){this.tagSupportUsed=e,e||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(e){this.activeFields=[...e],this.isDirty=!0,this.notify()}removeField(e){this.activeFields=this.activeFields.filter(o=>o!==e),this.isDirty=!0,this.notify()}addFieldAt(e,o){this.activeFields.includes(e)||(this.activeFields.splice(o,0,e),this.isDirty=!0,this.notify())}setForcedScreenshots(e){this.forcedScreenshots=new Set(e),this.isDirty=!0,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.isDirty=!0,this.notify()}setExcludedFields(e){this.excludedFields=new Set(e),this.isDirty=!0,this.notify()}toggleFieldExclusion(e,o){o?this.excludedFields.add(e):this.excludedFields.delete(e),this.isDirty=!0,this.notify()}setStatus(e){this.currentStatus!==e&&(this.currentStatus=e,this.isDirty=!0,this.notify())}setSubStatus(e){this.currentSubStatus!==e&&(this.currentSubStatus=e,this.isDirty=!0,this.notify())}setScreenshotMode(e){this.screenshotMode=e,this.notify()}setActiveTasks(e){this.activeTasks=e,this.isDirty=!0,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]!==o&&(this.formData[e]=o,this.isDirty=!0,this.notify())}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},W=new nt});var ot="",at="",Rt=t=>new Promise(e=>setTimeout(e,t));async function zt(){if(ot&&at)return ot;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Rt(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let n=document.querySelector("profile-details img");if(n&&n.src.includes("/photos/")){let i=n.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let a=document.querySelector("profile-details .email");return a&&(at=a.textContent.trim(),console.log("TechSol: Identidade confirmada ->",at)),t.click(),document.body.click(),ot=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function Ye(){return ot||"Consultor"}function Ee(){return at||null}function Bt(t){let e=new Date,o=e.getHours(),a=e.getDay(),n="Ol\xE1",i="";o>=5&&o<12?(n="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(n="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(n="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let r=[];o>=0&&o<5?r=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?a===1?r=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:a===5?r=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:r=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?r=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:r=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(a===0||a===6)&&(r=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let s=r[Math.floor(Math.random()*r.length)];return{prefix:`${n},`,name:t,suffix:s,icon:i,isFriday:a===5}}async function Bo(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,a=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');a&&(a.click(),await Rt(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(r=>{let s=r.innerText.trim();return s.includes("@")&&!s.includes("Is this:")&&s.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Po(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function $o(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Google Ads External Customer ID")||n.textContent.includes("Customer ID"));if(e){let n=e.closest("home-data-item")||e.parentElement;if(n){let i=n.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let a=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(a)return a[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"N/A"}function Ho(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Account Manager")||o.textContent.includes("AM Name")||o.textContent.includes("Sales Rep"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar AM:",t)}return null}function Go(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("customer time zone")||o.textContent.toLowerCase().includes("time zone")||o.textContent.toLowerCase().includes("timezone"));if(e){let o=e.parentElement;if(o){let a=o.querySelector("sanitized-content");if(a&&a.textContent.trim())return a.textContent.trim();let n=o.querySelector(".data-pair-content")||e.nextElementSibling;if(n&&n.textContent.trim()){let i=n.textContent.trim();if(i&&i!=="---"&&i!=="N/A")return i}}}}catch(t){console.warn("Erro ao capturar Timezone:",t)}return null}async function jo(){let t="---";try{t=window.location.href.split("/").pop()}catch(e){console.warn("Falha URL:",e)}return t}function Uo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("sales program")||o.textContent.toLowerCase().trim()==="program"||o.textContent.toLowerCase().includes("programa"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector('sanitized-content ng-template[debug-id="html-value"]')||o.querySelector("sanitized-content");if(a)return a.textContent.trim();let n=o.querySelector(".data-pair-content")||o.nextElementSibling;if(n)return n.textContent.trim()}}catch(t){console.warn("Erro ao capturar Sales Program:",t)}return""}function Vo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Language")||o.textContent.includes("Idioma"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar Idioma:",t)}return"N/A"}function Wo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Speakeasy ID")||o.textContent.includes("SE ID"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar SE ID:",t)}return"N/A"}async function we(){let t="Cliente",e="";try{let h=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(h&&h.nextElementSibling){let b=h.nextElementSibling.innerText.trim();b&&(t=b)}}catch(d){console.warn("Falha Nome:",d)}try{let h=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(h&&h.nextElementSibling){let b=h.nextElementSibling.innerText.trim();b&&(e=b)}}catch(d){console.warn("Falha URL:",d)}let o=await Bo(),a=Po(),n=$o(),i=Ho(),r=Go(),s=await jo(),p=Uo(),l=Vo(),c=Wo();return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:a,cid:n,amName:i,timezone:r,agentName:Ye(),agentEmail:Ee(),caseId:s,advName:t,site:e,email:o,salesProgram:p,language:l,seId:c}}var De=null,St=null,Oe=.3;var Ie=localStorage.getItem("cw_sounds_muted")==="true";function Ne(){if(!De){let t=window.AudioContext||window.webkitAudioContext;t&&(De=new t)}return De&&De.state==="suspended"&&De.resume(),De}function Pt(t){if(St)return St;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),a=o.getChannelData(0);for(let n=0;n<e;n++)a[n]=Math.random()*2-1;return St=o,o}var H={setMuted:t=>{Ie=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>Ie,playClick:()=>{if(Ie)return;let t=Ne();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Pt(t);let a=t.createBiquadFilter();a.type="highpass",a.frequency.value=4e3;let n=t.createGain();n.gain.setValueAtTime(Oe*.8,e),n.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(Ie)return;let t=Ne();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let a=t.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Oe*.1,e+.005),a.gain.linearRampToValueAtTime(0,e+.02),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(Ie)return;let t=Ne();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((a,n)=>{let i=t.createOscillator(),r=t.createGain();i.type="sine",i.frequency.value=a,r.gain.setValueAtTime(0,e),r.gain.linearRampToValueAtTime(Oe*.6,e+.05),r.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(r),r.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{if(Ie)return;let t=Ne();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Pt(t);let a=t.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(100,e),a.frequency.exponentialRampToValueAtTime(800,e+.2);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(Oe*.5,e+.05),n.gain.linearRampToValueAtTime(0,e+.25),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(Ie)return;let t=Ne();if(!t)return;let e=t.currentTime,o=t.createOscillator(),a=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),a.gain.setValueAtTime(Oe,e),a.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(Ie)return;let t=Ne();if(!t)return;let e=t.currentTime,o=.12,a=t.createOscillator(),n=t.createGain(),i=t.createBiquadFilter();a.type="square",a.frequency.setValueAtTime(400,e),a.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),n.gain.setValueAtTime(Oe*4,e),n.gain.exponentialRampToValueAtTime(.001,e+.1),a.connect(i),i.connect(n),n.connect(t.destination),a.start(e),a.stop(e+.12);let r=t.createOscillator(),s=t.createGain();r.type="sine",r.frequency.setValueAtTime(150,e),r.frequency.exponentialRampToValueAtTime(50,e+.15),s.gain.setValueAtTime(Oe*1.5,e),s.gain.exponentialRampToValueAtTime(.001,e+.15),r.connect(s),s.connect(t.destination),r.start(e),r.stop(e+.15),[55,55.4,110.5].forEach(l=>{let c=t.createOscillator(),d=t.createGain(),h=t.createBiquadFilter();c.type="sawtooth",c.frequency.value=l,h.type="lowpass",h.frequency.setValueAtTime(30,e),h.frequency.linearRampToValueAtTime(900,e+o+.2),h.frequency.exponentialRampToValueAtTime(40,e+3),d.gain.setValueAtTime(0,e),d.gain.linearRampToValueAtTime(Oe*.6,e+o+.1),d.gain.exponentialRampToValueAtTime(.001,e+3.5),c.connect(h),h.connect(d),d.connect(t.destination),c.start(e),c.stop(e+3.6)})},playNotification:()=>{if(Ie)return;let t=Ne();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(a=>{let n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(a.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Oe*a.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+a.dur),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+a.dur+.1)})},playSwoosh:()=>{H.playGenieOpen()},playReset:()=>{H.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!De)return;let a=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!a||a.contains(o.relatedTarget))return;let n=Date.now();n-t<e||(H.playHover(),t=n)},{passive:!0})}};var $t=1e4;function Ht(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function Y(t,e={}){let o=document.createElement("div"),a=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:a,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?H.playError():H.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function Gt(t,e=null){let o=0,a=0,n=0,i=0,r=e||t;r.style.cursor="grab",r.onmousedown=s;function s(c){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(c.target.tagName)||c.target.closest(".no-drag"))return;c=c||window.event,r.style.cursor="grabbing",t.style.transition="none";let d=t.getBoundingClientRect();t.style.transform="none",t.style.left=d.left+"px",t.style.top=d.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",$t++,t.style.zIndex=$t,n=c.clientX,i=c.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=l,document.onmousemove=p}function p(c){c=c||window.event,c.preventDefault(),o=n-c.clientX,a=i-c.clientY,n=c.clientX,i=c.clientY;let d=t.offsetTop-a,h=t.offsetLeft-o,b=16,f=window.innerWidth,u=window.innerHeight,w=t.offsetWidth,E=t.offsetHeight;h<b?h=b:h+w>f-b&&(h=f-w-b),d<b?d=b:d+E>u-b&&(d=u-E-b),t.style.top=d+"px",t.style.left=h+"px"}function l(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var me={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Ct={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},jt={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Ut={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Le=t=>new Promise(e=>setTimeout(e,t));async function Yo(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await Le(200);for(let a=0;a<e.length;a++){let n=e.charAt(a),i=document.createElement("span");i.textContent=n,o&&o.parentNode===t?o.before(i):t.appendChild(i);let r=Math.floor(Math.random()*60)+30;a===0&&(r=150),a>e.length-3&&(r=30),await Le(r)}await Le(600),o&&(o.style.display="none")}async function Et(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Le(200);let e=await zt(),o=Bt(e),a=t.querySelector("#w-icon"),n=t.querySelector("#p1"),i=t.querySelector("#p2"),r=t.querySelector("#p3"),s=t.querySelector("#p-sextou");a&&(a.innerHTML=o.icon),n&&(n.textContent=o.prefix),r&&(r.textContent=o.suffix),await Le(300);let p=a?a.querySelector("svg"):null;if(p&&(p.style.opacity="1",p.style.transform="scale(1)"),await Le(400),n&&(n.style.opacity="1"),H.playStartup(),i&&await Yo(i,o.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),o.isFriday&&s){await Le(400),s.style.display="block",s.offsetWidth;let l=s.querySelector(".sextou-badge");l&&(l.style.opacity="1",l.style.transform="scale(1)")}await Le(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Le(900),t.parentNode&&t.parentNode.removeChild(t)}}function Vt(t){if(!t)return;let e=t.getBoundingClientRect(),o=window.innerWidth,a=window.innerHeight,n=24,i=o-e.width-n,r=a-e.height-n,s=parseFloat(t.style.left)||e.left,p=parseFloat(t.style.top)||e.top,l=Math.max(n,Math.min(s,i)),c=Math.max(n,Math.min(p,r));if(l!==s||c!==p){let d=t.style.transition;t.style.transition="left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",t.style.left=`${l}px`,t.style.top=`${c}px`,setTimeout(()=>{t.style.transition=d},300)}}var Ae={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Te(t,e){e.onmousedown=o;function o(a){a.stopPropagation(),a.preventDefault();let n=t.style.transition;t.style.transition="none";let i=a.clientX,r=a.clientY,s=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),p=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),l=i,c=r,d=!1;function h(u){l=u.clientX,c=u.clientY,d||(window.requestAnimationFrame(()=>{b(),d=!1}),d=!0)}function b(){let u=s+(l-i),w=p+(c-r);u>360&&(t.style.width=u+"px"),w>300&&(t.style.height=w+"px")}function f(){document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",f),setTimeout(()=>{t.style.transition=n},50)}document.addEventListener("mousemove",h),document.addEventListener("mouseup",f)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function Wt(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function Yt(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function Xt(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function xe(t,e={}){return new Promise(o=>{let a=Yt(),n=Xt(),i=e.danger?"#FF3B30":"#007AFF",r=e.confirmText||(e.danger?"Excluir":"Confirmar");n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${r}</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)"});let s=c=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(c)},300)},p=n.querySelector("#cw-conf-cancel"),l=n.querySelector("#cw-conf-ok");[p,l].forEach(c=>c.onmouseenter=()=>H.playHover()),p.onclick=()=>{H.playClick(),s(!1)},l.onclick=()=>{H.playClick(),s(!0)}})}function Kt(t,e=""){return new Promise(o=>{let a=Yt(),n=Xt();n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a);let i=n.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let r=l=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(l)},300)},s=n.querySelector("#cw-prompt-cancel"),p=n.querySelector("#cw-prompt-ok");[s,p].forEach(l=>l.onmouseenter=()=>H.playHover()),s.onclick=()=>{H.playClick(),r(null)},p.onclick=()=>{H.playClick(),r(i.value)},i.onkeydown=l=>{l.key==="Enter"&&p.click(),l.key==="Escape"&&s.click()}})}Xe();var Xo={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Jt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function pe(t,e,o,a,n,i){let r=document.createElement("div");Object.assign(r.style,Xo),Gt(t,r);let s=document.createElement("div");if(Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let E=document.createElement("style");E.id="cw-header-anim",E.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(E)}s.style.animation="cw-header-flow 6s linear infinite",r.appendChild(s),n&&(n.googleLine=s);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"12px"});let l=document.createElement("img");l.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(l.style,{width:"20px",height:"20px",pointerEvents:"none"});let c=document.createElement("span");c.textContent=e,p.appendChild(l),p.appendChild(c);let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center",gap:"4px"});let h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',b='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',f=document.createElement("div");f.innerHTML=h,Object.assign(f.style,Jt),f.title="Sobre & Feedback",f.classList.add("no-drag"),f.onmouseenter=()=>{f.style.background="rgba(255,255,255,0.1)",f.style.color="#FFF"},f.onmouseleave=()=>{f.style.color!=="rgb(138, 180, 248)"&&(f.style.background="transparent",f.style.color="#9AA0A6")};let u=document.createElement("div");u.innerHTML=b,Object.assign(u.style,Jt),u.title="Fechar",u.classList.add("no-drag"),u.onmouseenter=()=>{u.style.background="rgba(242, 139, 130, 0.2)",u.style.color="#F28B82"},u.onmouseleave=()=>{u.style.background="transparent",u.style.color="#9AA0A6"},u.onmousedown=E=>E.stopPropagation(),f.onmousedown=E=>E.stopPropagation(),u.onclick=i;let w=Ko(t,e,o,a);return f.onclick=E=>{E.stopPropagation(),w.style.opacity==="1"?(w.style.opacity="0",w.style.pointerEvents="none",f.style.color="#9AA0A6",f.style.background="transparent"):(w.style.opacity="1",w.style.pointerEvents="auto",f.style.color="#8AB4F8",f.style.background="rgba(138, 180, 248, 0.1)")},d.appendChild(f),d.appendChild(u),r.appendChild(p),r.appendChild(d),r}function Ko(t,e,o,a){let n=document.createElement("div");return Object.assign(n.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),n.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${e}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Vers\xE3o ${o}</div>
        
        <div style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${a}
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
    `,setTimeout(()=>{let i=n.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let r=n.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{n.style.opacity="0",n.style.pointerEvents="none"})},0),t.appendChild(n),n}var P={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},de={small:"8px",medium:"12px",large:"20px",pill:"100px"},Re={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},re="cubic-bezier(0.34, 1.56, 0.64, 1)",Jo={width:"100%",padding:"14px 16px",borderRadius:de.medium,border:`1.5px solid ${P.border}`,backgroundColor:P.bgInput,fontSize:"14px",color:P.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${re}`,outline:"none"},va={...Jo,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},wa={fontSize:"12px",fontWeight:"700",color:P.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},Sa={display:"block",fontSize:"14px",fontWeight:"600",color:P.text,marginBottom:"10px",marginTop:"20px"},Ca={fontSize:"12px",color:P.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},At={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:P.primary},Ea={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:P.text,cursor:"pointer",padding:"16px 20px",backgroundColor:P.surface,border:`1px solid ${P.border}`,borderRadius:de.large,transition:`all 0.4s ${re}`,userSelect:"none",boxShadow:Re.subtle},Aa={padding:"14px 28px",color:"#fff",backgroundColor:P.primary,border:"none",borderRadius:de.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${re}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},Ta={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${P.primary}`,color:P.primary,borderRadius:de.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${re}`},ka={background:"transparent",border:`1px solid ${P.border}`,borderRadius:de.pill,color:P.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${re}`};function Zt(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,me,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${re}, height 0.4s ${re}, transform 0.4s ${re}, opacity 0.3s ease`,borderRadius:de.large,boxShadow:Re.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let a={popup:o,googleLine:null},n=pe(o,"Case Notes",t,"Gera notas padronizadas com excel\xEAncia visual.",a,e);o.appendChild(n);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:P.surface}),o.appendChild(i);let r=document.createElement("div");r.textContent="created by lucaste@",Object.assign(r.style,Ut,{padding:"16px 24px",borderTop:`1px solid ${P.bgInput}`,color:P.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(r);let s=document.createElement("div");return Object.assign(s.style,Ae),s.className="no-drag",o.appendChild(s),Te(o,s),Zo(),{popup:o,content:i,header:n,animRefs:a,credit:r}}function Zo(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${de.medium} !important;
            border: 1.5px solid ${P.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: all 0.2s ${re} !important;
            box-sizing: border-box !important;
            background: ${P.bgInput} !important;
            color: ${P.text} !important;
            outline: none !important;
            box-shadow: ${Re.subtle} !important;
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
            transition: border-color 0.2s ${re}, background-color 0.2s ${re}, box-shadow 0.2s ${re} !important;
        }

        .cw-input:hover, .cw-textarea:hover, #notes-assistant-popup .cw-select:hover {
            border-color: #bdc1c6 !important;
            background-color: #f1f3f4 !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }

        .cw-input:focus, .cw-textarea:focus, #notes-assistant-popup .cw-select:focus {
            border-color: ${P.primary} !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15), 0 2px 8px rgba(0,0,0,0.05) !important;
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${P.textSub};
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
            background: ${P.bgInput};
        }

        .cw-btn-primary {
            background: ${P.primary};
            color: #fff;
            border: none;
            border-radius: ${de.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${re};
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
            color: ${P.textSub};
            border: 1px solid ${P.border};
            border-radius: ${de.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${re};
        }
        .cw-btn-secondary:hover {
            background: ${P.bgInput};
            border-color: #bdc1c6;
            color: ${P.text};
        }
    `,document.head.appendChild(t)}var Se={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} Seguimos com os passos:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Pasos ejecutados:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:"}},Ce={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},ke={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},He={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Ge=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],rt=["CONSIDERACOES","COMENTARIOS"],st={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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

Irei solicitar descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var je=t=>new Promise(e=>setTimeout(e,t));function Ke(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var Qt="cw-automation-styles";if(!document.getElementById(Qt)){let t=document.createElement("style");t.id=Qt,t.innerHTML=`
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
    `,document.head.appendChild(t)}function eo(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function lt(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),o="";eo(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let a=document.querySelector('material-button[debug-id="dock-item-case-log"]');a&&!a.classList.contains("selected")&&(Ke(a),await je(1200));let n=document.querySelector("search-filter dropdown-button .button");if(n&&!(n.innerText||"").includes("All")){Ke(n),await je(600);let h=document.querySelector('material-checkbox[debug-id="check-all-box"]');h&&h.getAttribute("aria-checked")!=="true"&&(Ke(h),await je(300));let b=document.querySelector('material-button[debug-id="apply-filter"]');b&&(Ke(b),await je(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await je(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let d=r.length-1;d>=0;d--){let h=r[d],b=h.querySelector("i.material-icons-extended"),f=b&&b.innerText.trim()==="phone_in_talk",u=h.innerText||"",w=u.includes("Agent joined")||u.includes("outbound-call")||u.includes("Speakeasy");if(f||w){h.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",h),e&&(e.placeholder="Lendo mensagem..."),Ke(h),await je(1e3));break}}let p=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),l=/Speakeasy.*?(P\d{15,25})/i,c=null;for(let d=p.length-1;d>=0;d--){let h=p[d];if(h.offsetParent===null)continue;let b=(h.innerText||"").match(l);if(b&&b[1]){c=b[1];break}}if(e)if(c){try{await navigator.clipboard.writeText(c)}catch{}e.tagName==="INPUT"||e.tagName==="TEXTAREA"?e.value=c:e.textContent=c,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),H.playSuccess(),Y(`ID Localizado: ${c}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else H.playError(),Y("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(a){console.error("Erro na automa\xE7\xE3o:",a),Y("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),eo(!1)}}function to(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,a=this.selectionEnd,n=this.value,i=n.lastIndexOf(`
`,o-1)+1,r=n.substring(i,o);if(e.key==="Enter"){e.preventDefault();let s=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=n.substring(0,i)+`
`+n.substring(a),this.selectionStart=this.selectionEnd=i+1;return}let p=`
`+s;this.value=n.substring(0,o)+p+n.substring(a),this.selectionStart=this.selectionEnd=o+p.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?r.startsWith("  ")&&(this.value=n.substring(0,i)+r.substring(2)+n.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=n.substring(0,i)+"  "+r+n.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===a&&o>0){let s=n.substring(0,o);s.endsWith("\u2022 ")?(e.preventDefault(),this.value=s.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2):s.endsWith("  ")&&r.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=s.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2)}}))}function Tt(t,e,o){if(e.innerHTML="",!!ke[t]&&(o.activeFields.forEach(n=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(n))return;let i=`field-${n}`,r=document.createElement("label"),s=d=>Se[o.currentLang]?.[d]||Se.pt?.[d]||d;r.textContent=s(n.toLowerCase())!==n.toLowerCase()?s(n.toLowerCase()):n.replace(/_/g," ").replace(/\b\w/g,d=>d.toUpperCase())+":",Object.assign(r.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:P.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let p=document.createElement("span");if(p.textContent=r.textContent,r.innerHTML="",r.appendChild(p),n==="SPEAKEASY_ID"){let d=document.createElement("button");d.innerHTML="\u2728 Auto Busca",d.style.cssText=`font-size: 11px; font-weight: 700; color: ${P.primary}; background-color: ${P.primaryBg}; border: none; border-radius: ${de.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${re};`,d.onmouseenter=()=>d.style.backgroundColor="#d2e3fc",d.onmouseleave=()=>d.style.backgroundColor=P.primaryBg,d.onclick=h=>{h.preventDefault(),lt(i)},r.appendChild(d)}let l=document.createElement("button");l.innerHTML="\u2715",l.style.cssText=`font-size: 14px; background: ${P.bgInput}; border: none; color: ${P.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${re};`,l.onmouseenter=()=>{l.style.background=P.error,l.style.color=P.surface},l.onmouseleave=()=>{l.style.background=P.bgInput,l.style.color=P.textSub},l.onclick=async d=>{d.preventDefault(),await xe(`Tem certeza que deseja remover o campo "${p.textContent.replace(":","")}"?`)&&(o.removeField(n),Tt(t,e,o))},r.appendChild(l);let c;Ge.includes(n)?(c=document.createElement("textarea"),c.classList.add("bullet-textarea","cw-textarea"),c.placeholder="Utilize marcadores para detalhar...",to(c)):rt.includes(n)?(c=document.createElement("textarea"),c.classList.add("cw-textarea"),c.placeholder="Descreva as considera\xE7\xF5es..."):(c=document.createElement("input"),c.type="text",c.classList.add("cw-input")),c.id=i,c.value=o.formData[i]||"",c.addEventListener("input",d=>o.updateField(i,d.target.value)),e.appendChild(r),e.appendChild(c)}),o.activeFields.includes("CONSENTIU_GRAVACAO"))){let n=s=>Se[o.currentLang]?.[s]||Se.pt?.[s]||s,i=document.createElement("label");i.textContent=n("consentiu_gravacao"),Object.assign(i.style,{display:"block",fontSize:"13px",fontWeight:"700",color:P.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let r=document.createElement("select");r.className="cw-select",r.innerHTML=`
            <option value="false">${n("nao")}</option>
            <option value="true">${n("sim")}</option>
        `,r.value=o.consent?"true":"false",r.onchange=()=>o.setConsent(r.value==="true"),e.appendChild(i),e.appendChild(r)}}function kt(t,e,o){let a=t.currentSubStatus;if(!a)return null;let n=ke[a],i=Se[t.currentLang]||Se.pt,r=l=>i[l]||Se.pt?.[l]||l,s='style="margin-bottom: 12px; padding-left: 30px;"',p="";if(t.activeFields.forEach(l=>{let c=r(l.toLowerCase()),d="N/A";if(l==="label_substatus")c=r("label_substatus"),d=n.name;else if(l==="TAGS_IMPLEMENTED"){c=r("tags_implemented");let h=[];e.getCheckedElements().forEach(f=>{let u=f.value,w=Ce[u],E=f.count||1,U=u==="ads_conversion_tracking"||u==="ads_enhanced_conversions";t.tagSupportUsed&&U&&!t.forcedScreenshots.has(u)?h.push(`${w.name} - ${r("ts_output_disclaimer")}`):h.push(E>1?`${w.name} (x${E})`:w.name)}),d=h.join(", ")||"N/A"}else if(l==="SCREENSHOTS_LIST"){c=r("screenshots_list");let h="",b=e.screenshotsElement;b&&Array.from(b.querySelectorAll('input[id^="name-"]')).forEach(u=>{let w=u.value,E=u.closest(".cw-screen-card");if(E){let U=E.querySelectorAll('input[id^="screen-"]'),M=!1,R="";U.forEach(K=>{let q=K.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",I=K.value.trim();I&&(R+=`<li>${q} - ${I}</li>`,M=!0)}),M&&(h+=`<div style="margin-bottom: 8px;"><b>${w}</b><ul ${s}>${R}</ul></div>`)}}),d=h||"N/A"}else if(l==="CASO_PORTUGAL")c=r("caso_portugal"),d=r("sim");else if(l==="CONSENTIU_GRAVACAO")c=r("consentiu_gravacao"),d=t.consent?r("sim"):r("nao");else{let h=`field-${l}`,b=t.formData[h],f="";if(n.fieldPrefixes&&n.fieldPrefixes[l]&&(f=n.fieldPrefixes[l]+" "),b&&b.trim()!==""&&b.trim()!=="\u2022"){let u=b.trim();if(Ge.includes(l)){let w=u.split(`
`).map(E=>E.trim()).filter(E=>E!==""&&E!=="\u2022").map(E=>E.startsWith("\u2022 ")?E.substring(2):E).map(E=>`<li>${E}</li>`).join("");d=w?`${f}<ul ${s}>${w}</ul>`:"N/A"}else rt.includes(l)?d=f+u.split(`
`).filter(w=>w.trim()!=="").map(w=>`<p style="margin: 0 0 8px 0;">${w}</p>`).join(""):d=f+u}else f&&(d=f.trim())}p+=`<b>${c}</b><br>${d}<br><br>`}),n.customFooter&&(p+=`${n.customFooter}<br><br>`),o?.getOutput){let l=o.getOutput();l&&(p+=`${l}<br><br>`)}return p+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",p.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}function oo(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o="Passe o mouse sobre um cen\xE1rio para visualizar o texto...",a=document.createElement("div");Object.assign(a.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.2s ease, transform 0.2s ease",i.textContent=o,n.appendChild(i);let r=new Set,s=null;return e.render=(p,l)=>{r.clear();let c=Object.entries(st).filter(([d,h])=>{let b=!h.type||h.type==="all"||h.type===l,f=!1;return p.startsWith("NI_")?f=d.includes("-ni-")||d.includes("attempted"):p.startsWith("SO_")?f=d.includes("gtm")||d.includes("whatsapp")||d.includes("form")||d.includes("ecw4")||d.includes("ga4")||d.includes("-so-"):p.startsWith("AS_")?f=d.includes("-as-"):p.startsWith("IN_")?f=d.includes("-in-"):p.startsWith("DC_")&&(f=d.includes("-dc-")),b&&f});a.innerHTML="",c.forEach(([d,h])=>{let b=document.createElement("div"),f=d.replace("quickfill-","").replace(/-/g," ");b.textContent=f,b.dataset.id=d,Object.assign(b.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let u=h["field-REASON_COMMENTS"]||h["field-CONTEXTO_CALL"]||d;b.onmouseenter=()=>{s&&clearTimeout(s),r.has(d)||(b.style.background="#f1f3f4"),i.style.opacity="0",i.style.transform="translateY(5px)",s=setTimeout(()=>{i.textContent=u.substring(0,120)+(u.length>120?"...":""),i.style.opacity="1",i.style.transform="translateY(0)"},50)},b.onmouseleave=()=>{s&&clearTimeout(s),r.has(d)||(b.style.background="#ffffff"),s=setTimeout(()=>{r.size===0&&(i.style.opacity="0",setTimeout(()=>{i.textContent=o,i.style.opacity="1"},50))},100)},b.onclick=()=>{H.playClick();let w=!r.has(d);w?(r.add(d),b.style.background="#e8f0fe",b.style.borderColor="#1a73e8",b.style.color="#1967d2"):(r.delete(d),b.style.background="#ffffff",b.style.borderColor="#dadce0",b.style.color="#3c4043"),t(d,w)},a.appendChild(b)}),c.length===0?e.style.display="none":e.style.display="block"},e.appendChild(a),e.appendChild(n),e}var ee={bg:P.bgInput,white:P.surface,border:P.border,textMain:P.text,textSub:P.textSub,blue:P.blue,blueLight:P.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:P.blue,bg:P.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:P.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:P.primary,bg:P.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:P.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},ze={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function ao(t,e,o){let a={},n="implementation";o&&o.subscribe(()=>{K(),J()});function i(q){let I=q.toLowerCase();return I.includes("ads")||I.includes("conversion")||I.includes("remarketing")?ee.brands.ads:I.includes("ga4")||I.includes("analytics")?ee.brands.ga4:I.includes("gtm")||I.includes("tag manager")||I.includes("container")?ee.brands.gtm:I.includes("merchant")||I.includes("shopping")||I.includes("feed")?ee.brands.gmc:ee.brands.default}let r=Object.entries(Ce).filter(([q,I])=>I.popular),s={};Object.entries(Ce).forEach(([q,I])=>{if(I.popular)return;let z=i(I.name);s[z.label]||(s[z.label]={brand:z,tasks:[]}),s[z.label].tasks.push({key:q,...I})});let p="cw-zen-tasks";if(!document.getElementById(p)){let q=document.createElement("style");q.id=p,q.innerHTML=`
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
        `,document.head.appendChild(q)}let l=document.createElement("div");l.className="cw-zen-container";let c=document.createElement("div");Object.assign(c.style,{display:"none"});let d=document.createElement("div");d.className="cw-screens-container",c.appendChild(d),l.innerHTML=`
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
    `;let h=l.querySelector(".cw-hero-grid"),b=l.querySelector(".cw-acc-container"),f=l.querySelector(".cw-results-container"),u=l.querySelector(".cw-search-input"),w=l.querySelector(".cw-status-bar"),E=l.querySelector(".cw-status-text"),U=l.querySelector(".cw-footer-icons");r.forEach(([q,I])=>{let z=i(I.name),V=document.createElement("div");V.className="cw-hero-card",V.id=`hero-${q}`,V.style.setProperty("--hero-color",z.color),V.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${ze[z.icon]}</div>
                <div class="cw-hero-label">${I.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,V.onclick=_=>{if(_.target.closest(".cw-step-btn"))return;let A=a[q]?a[q].count:0;R(q,A>0?-A:1,I)},V.querySelector(".minus").onclick=()=>R(q,-1,I),V.querySelector(".plus").onclick=()=>R(q,1,I),V.dataset.color=z.color,h.appendChild(V)});function M(q,I){let z=i(I.name),V=document.createElement("div");return V.className="cw-task-item",V.dataset.id=q,V.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${z.bg}; color:${z.color}">
                    ${ze[z.icon]||ze.default}
                </div>
                <div class="cw-task-label">${I.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,V.onclick=_=>{if(_.target.closest(".cw-step-btn"))return;let A=a[q]?a[q].count:0;R(q,A>0?-A:1,I)},V.querySelector(".minus").onclick=()=>R(q,-1,I),V.querySelector(".plus").onclick=()=>R(q,1,I),V}Object.entries(s).forEach(([q,I])=>{let z=document.createElement("div");z.className="cw-acc-group";let V=document.createElement("div");V.className="cw-acc-header",V.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${I.brand.color}"></div>
                ${q}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,V.onclick=()=>{b.querySelectorAll(".cw-acc-group.open").forEach(A=>{A!==z&&A.classList.remove("open")}),z.classList.toggle("open")};let _=document.createElement("div");_.className="cw-acc-body",I.tasks.forEach(A=>{let S=M(A.key,A);_.appendChild(S)}),z.appendChild(V),z.appendChild(_),b.appendChild(z)});function R(q,I,z){a[q]||(a[q]={count:0,data:z,brand:i(z.name)}),a[q].count+=I,a[q].count<=0&&delete a[q],K(),J(),t&&t()}function K(){let q=o.tagSupportUsed;r.forEach(([A])=>{let S=h.querySelector(`#hero-${A}`);if(!S)return;let L=a[A];L?(S.classList.add("active"),S.querySelector(".cw-step-val").textContent=L.count,S.querySelector(".cw-step-val").style.color=S.dataset.color,q&&(A==="ads_conversion_tracking"||A==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(A)?S.classList.add("ts-success"):S.classList.remove("ts-success")):(S.classList.remove("active"),S.classList.remove("ts-success"))}),l.querySelectorAll(".cw-task-item").forEach(A=>{let S=A.dataset.id,L=a[S];L?(A.classList.add("selected"),A.querySelector(".cw-step-val").textContent=L.count,q&&(S==="ads_conversion_tracking"||S==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(S)?A.classList.add("ts-success"):A.classList.remove("ts-success")):(A.classList.remove("selected"),A.classList.remove("ts-success"))});let z=Object.keys(a),V=0,_=[];if(z.forEach(A=>{let S=a[A];V+=S.count;for(let L=0;L<S.count;L++)_.length<6&&_.push(S.brand)}),V>0){w.classList.add("visible");let A=V>1?"A\xE7\xF5es":"A\xE7\xE3o",S=V>1?"definidas":"definida";E.textContent=`${V} ${A} ${S}`,U.innerHTML="",_.forEach(L=>{let x=document.createElement("div");x.className="cw-mini-icon",x.innerHTML=ze[L.icon]||ze.default;let T=x.querySelector("svg");T&&(T.style.width="14px",T.style.height="14px"),U.appendChild(x)})}else w.classList.remove("visible")}u.addEventListener("input",q=>{let I=q.target.value.toLowerCase();if(I.length>0){b.style.display="none",f.style.display="block",f.innerHTML="";let z=!1;Object.entries(Ce).forEach(([V,_])=>{if(_.name.toLowerCase().includes(I)){z=!0;let A=M(V,_);a[V]&&(A.classList.add("selected"),A.querySelector(".cw-step-val").textContent=a[V].count),f.appendChild(A)}}),z||(f.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else b.style.display="block",f.style.display="none"});function J(){d.innerHTML="";let q=Object.keys(a),I=!1;if(q.length===0){d.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,c.style.display="none";return}let z=o.tagSupportUsed,V=document.createElement("div");V.className="cw-info-banner",V.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,d.appendChild(V),q.forEach(_=>{let A=a[_].data,S=a[_].count,L=a[_].brand,T=z&&(_==="ads_conversion_tracking"||_==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(_),C=o.screenshotMode||"implementation",F=A.screenshots?.[C]||[];if(F.length>0||T){I=!0;for(let y=1;y<=S;y++){let k=document.createElement("div");k.className="cw-screen-card",T&&k.classList.add("ts-success"),k.style.setProperty("--brand-color",L.color),k.style.setProperty("--brand-bg",L.bg),k.style.setProperty("--brand-shadow",L.color+"40");let $=document.createElement("div");$.className="cw-card-header";let m=document.createElement("div");m.className="cw-card-icon",m.innerHTML=ze[L.icon]||ze.default;let N=document.createElement("div");N.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let G=document.createElement("input");G.className="cw-card-title-input",G.id=`name-${_}-${y}`,G.value=`${A.name}${S>1?" #"+y:""}`,G.title="Clique para renomear esta task";let Z=document.createElement("span");if(Z.className="cw-edit-hint",Z.innerHTML="\u270E Renomear",N.appendChild(G),N.appendChild(Z),$.appendChild(m),$.appendChild(N),k.appendChild($),T){let g=document.createElement("div");g.className="cw-ts-disclaimer-box",g.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,g.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(_,!0)},k.appendChild(g)}else F.forEach((g,v)=>{let O=document.createElement("div");O.className="cw-input-group";let B=document.createElement("label");B.className="cw-input-label",B.textContent=g;let D=document.createElement("input");D.className="cw-input-field",D.id=`screen-${_}-${y}-${v}`,D.placeholder="Cole o link aqui...",D.setAttribute("autocomplete","off"),D.addEventListener("input",()=>{D.value.trim().length>5?D.classList.add("filled"):D.classList.remove("filled")});let X=document.createElement("div");X.className="cw-input-check",X.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',O.appendChild(B),O.appendChild(D),O.appendChild(X),k.appendChild(O)});d.appendChild(k)}}}),c.style.display=I?"block":"none"}return{selectionElement:l,screenshotsElement:c,updateSubStatus:()=>J(),getCheckedElements:()=>Object.keys(a).map(q=>({value:q,count:a[q].count})),setTaskCount:(q,I)=>{a[q]&&delete a[q],I>0&&Ce[q]&&R(q,I,Ce[q])},toggleTask:(q,I=!0)=>{let z=a[q];I&&!z?R(q,1,Ce[q]):!I&&z&&R(q,-z.count,Ce[q])},setLanguage:q=>{e=q;let I=l.querySelector(".js-hero-title");I&&(I.textContent=e("acesso_rapido"));let z=l.querySelector(".cw-search-input");z&&(z.placeholder=e("buscar_catalogo")),J()},reset:()=>{for(let q in a)delete a[q];u.value="",b.style.display="block",f.style.display="none",K(),J()}}}var Qo={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},ea={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},ta={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},oa={display:"flex",gap:"20px",marginBottom:"12px"};function no(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,Qo);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,Ct,{marginTop:"0"});let a=document.createElement("div");Object.assign(a.style,oa);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,At);let i=document.createElement("label");i.textContent="Sim";let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(n),r.appendChild(i);let s=document.createElement("input");s.type="radio",s.name="ts_usage_mod",s.value="N\xE3o",s.checked=!0,Object.assign(s.style,At);let p=document.createElement("label");p.textContent="N\xE3o";let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center"}),l.appendChild(s),l.appendChild(p),a.appendChild(r),a.appendChild(l);let c=document.createElement("div");c.style.display="block";let d=document.createElement("label");d.className="js-ts-reason-label",d.textContent=t("motivo_ts"),Object.assign(d.style,Ct,{fontSize:"12px"});let h=document.createElement("input");h.type="text",Object.assign(h.style,ta);let b=document.createElement("div");b.className="js-ts-warning",b.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(b.style,ea),c.appendChild(d),c.appendChild(h),c.appendChild(b),e.appendChild(o),e.appendChild(a),e.appendChild(c),n.onchange=()=>{c.style.display="none",Promise.resolve().then(()=>(Xe(),it)).then(U=>U.notesState.setTagSupportUsed(!0))},s.onchange=()=>{c.style.display="block",Promise.resolve().then(()=>(Xe(),it)).then(U=>U.notesState.setTagSupportUsed(!1))};function f(U,M){if(e.style.display="none",!U||!M||M.length===0)return;M.some(K=>K==="ads_conversion_tracking"||K==="ads_enhanced_conversions")?e.style.display="block":(E(),Promise.resolve().then(()=>(Xe(),it)).then(K=>K.notesState.setTagSupportUsed(!1)))}function u(){if(e.style.display==="none")return"";let U=`<br><b>Utilizou Tag Support?</b> ${n.checked?"\u2705 Sim":"\u274C N\xE3o"}`;return s.checked&&h.value.trim()!==""&&(U+=`<br><b>Motivo:</b> ${h.value}`),U+="<br>",U}function w(U){t=U,o.textContent=t("utilizou_tag_support"),d.textContent=t("motivo_ts"),b.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function E(){e.style.display="none",s.checked=!0,n.checked=!1,c.style.display="block",h.value=""}return{element:e,updateVisibility:f,getOutput:u,setLanguage:w,reset:E}}var Ft="cw_notes_parking_lot",ct="cw_notes_emergency_save";var ge={getAll:()=>{try{return JSON.parse(localStorage.getItem(Ft)||"[]")}catch{return[]}},save:t=>{let e=ge.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(Ft,JSON.stringify(e)),o},delete:t=>{let e=ge.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(Ft,JSON.stringify(e)),e},getCount:()=>ge.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(ct,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(ct);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(ct),null):!e.data||!e.data.subStatus?null:e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(ct)}};var aa="https://script.google.com/a/macros/google.com/s/AKfycbyz2baawbO3gqSCFwlriDZRUUaW44CpjAbQT_0pRgCU2HVcNx0h9e_4pZn4UtdMAFN4zQ/exec",Ot="cw_data_broadcast",io="cw_data_tips",na=["Processando...","Mantenha o foco!","Aguarde..."];function Je(t,e={}){return new Promise((o,a)=>{let n="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[n]=p=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(p)};let r=Object.keys(e).map(p=>encodeURIComponent(p)+"="+encodeURIComponent(e[p])).join("&"),s=`${aa}?op=${t}&callback=${n}&t=${Date.now()}&${r}`;i.src=s,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}async function Ue(t,e){try{console.log(`\u{1F4E4} Executando ${t}...`,e);let o=await Je(t,e);if(o&&o.status==="success")return console.log("\u2705 Sucesso:",t),o;throw console.warn("\u26A0\uFE0F Falha:",o),new Error(o.message||`Opera\xE7\xE3o ${t} falhou.`)}catch(o){throw console.error(`\u274C Erro na opera\xE7\xE3o ${t}:`,o),o}}var be={fetchTips:async()=>{try{let t=await Je("tips");t?.tips&&localStorage.setItem(io,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await Je("broadcast");if(t?.broadcast)return localStorage.setItem(Ot,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(Ot)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Ot)||"[]"),getRandomTip:()=>{let t=na,e=localStorage.getItem(io);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await Ue("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await Ue("update_broadcast",o)},deleteBroadcast:async t=>await Ue("delete_broadcast",{id:t}),logEvent:(t,e,o="",a=null)=>{try{let n="anon";try{let r=Ee();r&&(n=r.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:n,version:"v5.1",category:t,action:e,label:o,value:a||""};Je("log",i).catch(r=>{})}catch(n){console.warn("Analytics error",n)}},logUsage:()=>{},getUserSnippets:async t=>{try{return await Je("get_user_snippets",{user:t})}catch(e){return console.warn("Erro ao buscar snippets:",e),null}},saveSnippet:async(t,e)=>{let o={...t,user:e};return await Ue("save_snippet",o)},deleteSnippet:async(t,e)=>await Ue("delete_snippet",{id:t,user:e})},ro=async(t,e)=>{let o={...t,user:e,date:new Date().toISOString()};return await Ue("create_bau_escalation",o),!0};var dt=["lucaste","ricardogi"];var ae={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},pt=t=>new Promise(e=>setTimeout(e,t));function ut(t){let e=document.getElementById("cw-btn-notes");if(!e)return;let o=e.querySelector(".cw-dot-dirty");t?o||(o=document.createElement("div"),o.className="cw-dot-dirty",e.appendChild(o)):o&&o.remove()}function so(t){let e="cw-command-center-style";if(!document.getElementById(e)){let u=document.createElement("style");u.id=e,u.innerHTML=`
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
                display: flex; flex-direction: column; align-items: center; gap: 14px;
                padding: 18px 8px;
                
                background: ${ae.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${ae.glassBorder}; border-radius: 50px;
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
                cursor: pointer; position: relative; color: ${ae.iconIdle};
                flex-shrink: 0;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn:hover {
                background: ${ae.glassHighlight};
                color: ${ae.iconActive};
                transform: scale(1.18) translateY(-2px) !important;
            }

            .cw-btn.notes.active { color: ${ae.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${ae.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${ae.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${ae.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${ae.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${ae.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${ae.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${ae.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${ae.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${ae.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${ae.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${ae.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${ae.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${ae.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${ae.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${ae.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${ae.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${ae.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${ae.blue}; width: 16px; opacity: 1; }

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
            .cw-center-dots span:nth-child(1) { background-color: ${ae.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${ae.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${ae.green}; }
            
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
            
            .cw-center-success { display: none; color: ${ae.green}; margin-bottom: 10px; }
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
        `,document.head.appendChild(u)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},a=document.createElement("div");a.className="cw-pill side-right collapsed",a.innerHTML=`
        <div class="cw-main-logo">${o.main}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${o.notes}</button>
        <button class="cw-btn bauform" id="cw-btn-bauform" data-label="BAU Form">${o.bauform}</button>
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
    `;let n=document.createElement("div");n.className="cw-focus-backdrop",document.body.appendChild(n),document.body.appendChild(a);let i=(u,w)=>{H.playClick(),a.querySelector(`.${u}`).classList.toggle("active"),w()};if(a.querySelector(".notes").onclick=u=>{u.stopPropagation(),i("notes",t.toggleNotes)},a.querySelector(".bauform").onclick=u=>{u.stopPropagation(),i("bauform",t.toggleBAUForm)},a.querySelector(".email").onclick=u=>{u.stopPropagation(),i("email",t.toggleEmail)},a.querySelector(".script").onclick=u=>{u.stopPropagation(),i("script",t.toggleScript)},a.querySelector(".links").onclick=u=>{u.stopPropagation(),i("links",t.toggleLinks)},a.querySelector(".library").onclick=u=>{u.stopPropagation(),i("library",t.toggleLibrary)},a.querySelector(".timezone").onclick=u=>{u.stopPropagation(),i("timezone",t.toggleTimezone)},a.querySelector(".configs").onclick=u=>{u.stopPropagation(),i("configs",t.toggleConfigs)},a.querySelector(".broadcast").onclick=u=>{u.stopPropagation(),i("broadcast",()=>{let w=u.currentTarget.querySelector(".cw-badge");w&&w.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},a.querySelectorAll(".cw-btn").forEach(u=>{u.addEventListener("mouseenter",()=>H.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let u=document.createElement("div");u.className="cw-badge",a.querySelector(".broadcast").appendChild(u)}let r=null;a.onmouseleave=()=>{a.querySelector(".cw-btn.active")||a.classList.contains("processing-center")||(r=setTimeout(()=>{a.classList.add("collapsed")},3e3))},a.onmouseenter=()=>{r&&clearTimeout(r)},(async function(){let w=()=>{let U=Ee();if(U){let M=U.split("@")[0].toLowerCase();if(dt.includes(M)){let R=a.querySelector("#cw-admin-tag");R&&R.classList.add("visible")}}else setTimeout(w,2e3)};w(),await pt(2800),a.classList.add("docked"),await pt(300);let E=a.querySelectorAll(".cw-btn");a.querySelectorAll(".cw-sep").forEach(U=>U.classList.add("visible"));for(let U=0;U<E.length;U++)E[U].classList.add("popped"),await pt(90);await pt(200),a.classList.add("system-check")})();let s=!1,p,l,c,d,h=3;a.onmousedown=u=>{if(u.target.closest("button"))return;u.preventDefault(),p=u.clientX,l=u.clientY;let w=a.getBoundingClientRect();c=w.left,d=w.top,document.addEventListener("mousemove",b),document.addEventListener("mouseup",f)};function b(u){let w=u.clientX-p,E=u.clientY-l;!s&&Math.sqrt(w*w+E*E)>h&&(s=!0,a.classList.add("dragging"),a.style.transition="none",r&&clearTimeout(r)),s&&(a.style.left=`${c+w}px`,a.style.top=`${d+E}px`,a.style.right="auto",a.style.bottom="auto",a.style.transform="none")}function f(u){if(document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",f),s){s=!1,a.classList.remove("dragging");let w=window.innerWidth,E=window.innerHeight,U=a.getBoundingClientRect(),M=U.left+U.width/2,R;M<w/2?(R=24,a.classList.remove("side-right"),a.classList.add("side-left")):(R=w-U.width-24,a.classList.remove("side-left"),a.classList.add("side-right"));let K=Math.max(24,Math.min(U.top,E-U.height-24));setTimeout(()=>{a.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),a.style.left=`${R}px`,a.style.top=`${K}px`,a.style.bottom="auto",a.style.transform=""},10),setTimeout(()=>{a.style.transition="",a.style.removeProperty("transition")},700)}else{let w=a.querySelector(".cw-btn.active"),E=u.target.closest("button");if(a.classList.contains("collapsed")){let U=a.getBoundingClientRect(),M=window.innerHeight,R=U.top>M/2;if(a.style.setProperty("transition","none","important"),R){let K=M-U.bottom;a.style.top="auto",a.style.bottom=`${K}px`}else a.style.bottom="auto",a.style.top=`${U.top}px`;a.offsetWidth,a.style.removeProperty("transition"),a.classList.remove("collapsed"),H.playGenieOpen()}else!w&&!E&&(a.classList.add("collapsed"),H.playGenieOpen());E&&(E.style.transform="scale(0.9)",setTimeout(()=>E.style.transform="",150))}}}function Ze(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${be.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let a=document.createElement("div");a.className="cw-abort-btn",a.textContent="Cancelar",a.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,Y("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(a),t.appendChild(o);let n=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let r=Date.now()-n,s=Math.max(0,2e3-r);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let p=o.querySelector(".cw-center-dots"),l=o.querySelector(".cw-center-text"),c=o.querySelector(".cw-center-success"),d=o.querySelector(".cw-abort-btn");p&&(p.style.display="none"),l&&(l.style.display="none"),d&&(d.style.display="none"),c&&c.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},s)}}function lo(t){let{onSaveCurrent:e,onLoadDraft:o,t:a}=t,n=document.createElement("button");n.className="js-btn-park",n.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${a("guardar")}</span>
    `,n.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${de.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${P.surface};
        color: ${P.textSub};
        border: 1px solid ${P.border};
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ${re};
        box-shadow: ${Re.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",n.style.transform="translateY(-1px)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",n.style.transform="translateY(0)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1) translateY(-1px)",n.onclick=async()=>{if(await xe("Deseja guardar o rascunho atual e limpar os campos?"))try{let u=await e();u?(ge.save(u),b(),s(),H.playSuccess(),Y("Rascunho salvo com sucesso!")):Y("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(u){console.error("Erro ao salvar rascunho:",u),Y("Erro ao salvar.",{error:!0})}};let i=document.createElement("div");i.title="Meus Rascunhos",i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=document.createElement("div");r.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(r),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=f=>{f.stopPropagation(),h()};function s(){let f=ge.getCount();ut(f>0),f>0?(r.style.display="block",r.textContent=f,r.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):r.style.display="none"}let p=document.createElement("div");p.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${P.surface}; z-index: 100;
        border-radius: ${de.large} ${de.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${re};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let l=document.createElement("div");l.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",l.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${a("rascunhos_salvos")}</span>`;let c=document.createElement("button");c.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',c.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",c.onmouseenter=()=>c.style.background="#F1F3F4",c.onmouseleave=()=>c.style.background="transparent",c.onclick=()=>h(!1),l.appendChild(c);let d=document.createElement("div");d.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",p.appendChild(l),p.appendChild(d);function h(f){let u=p.style.transform==="translateY(0%)";(f!==void 0?f:!u)?(b(),p.style.transform="translateY(0%)"):p.style.transform="translateY(110%)"}function b(){let f=ge.getAll();if(d.innerHTML="",f.length===0){d.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${P.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${a("nenhum_rascunho")}</div>
                </div>`;return}f.forEach(u=>{let w=document.createElement("div");w.style.cssText=`
                background: ${P.surface}; padding: 20px; border-radius: ${de.large};
                border: 1.5px solid ${P.bgInput}; box-shadow: ${Re.subtle};
                position: relative; transition: all 0.3s ${re};
            `;let U=new Date(u.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),M="";u.summaryTags&&u.summaryTags.length>0&&(M=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${u.summaryTags.slice(0,3).join(", ")+(u.summaryTags.length>3?"...":"")}</div>`),w.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${u.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${U}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${u.cid||"---"}</span>
                    <span style="display:block; color:${u.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${u.subStatus||u.status||"Sem Status"}</span>
                    ${M}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let R=w.querySelector(".cw-resume-btn");R.onclick=async()=>{await xe("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(u),ge.delete(u.id),b(),s(),h(!1),H.playSwoosh(),Y("Rascunho carregado."))};let K=w.querySelector(".cw-del-btn");K.onclick=async()=>{await xe("Excluir este rascunho?",{danger:!0})&&(ge.delete(u.id),b(),s())},d.appendChild(w)})}return s(),{parkButton:n,historyBtnWrapper:i,drawer:p}}var co=t=>new Promise(e=>setTimeout(e,t));function mt(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function Qe(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let a=window.getSelection();a.removeAllRanges(),a.addRange(o);try{document.execCommand("copy")}catch{Y("Falha ao copiar",{error:!0})}a.removeAllRanges(),document.body.removeChild(e)}function gt(t){["input","change","keydown","keyup"].forEach(o=>{let a=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(a)})}function po(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function ft(){console.log("Iniciando processo de Nova Nota...");let t=po(),e=t.length,a=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(a){let r=a.closest("material-fab")||a.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),mt(r)):mt(a)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let s=r.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),mt(s)):r.click(),await co(800);let l=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="description");l&&mt(l)}}let n=null,i=0;for(;!n&&i<20;){await co(300);let r=po();if(r.length>e)n=r.find(s=>!t.includes(s)),n||(n=r[r.length-1]);else if(i>10){let s=r.filter(p=>p.offsetParent!==null);s.length>0&&(n=s[s.length-1])}i++}return n}function uo(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let a=document.createElement("div");a.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(a),e.appendChild(o),o.addEventListener("scroll",()=>{a.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let n={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function r({id:M,label:R,type:K="text",placeholder:J="",required:q=!1,parent:I=o}){let z=document.createElement("div");z.style.cssText=n.inputWrapper;let V=document.createElement("label");V.style.cssText=n.label,V.innerHTML=`${R} ${q?'<span style="color:#D93025">*</span>':""}`;let _;return K==="textarea"?(_=document.createElement("textarea"),_.style.cssText=n.input+n.textarea):(_=document.createElement("input"),_.type=K,_.style.cssText=n.input),_.id=M,_.placeholder=J,_.addEventListener("focus",()=>{_.style.borderColor="#1a73e8",_.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),_.addEventListener("blur",()=>{_.style.borderColor="#DADCE0",_.style.boxShadow="none",q&&_.value.trim()!==""&&(_.style.backgroundColor="#FFF")}),i[M]={input:_,wrapper:z,required:q},z.appendChild(V),z.appendChild(_),I.appendChild(z),z}function s({id:M,label:R,options:K=["Yes","No"],defaultValue:J="No",onChange:q=null}){let I=document.createElement("div");I.style.cssText=n.inputWrapper;let z=document.createElement("label");z.style.cssText=n.label,z.textContent=R,I.appendChild(z);let V=document.createElement("div");V.style.cssText=n.radioGroup;let _=document.createElement("input");return _.type="hidden",_.id=M,_.value=J,I.appendChild(_),K.forEach(A=>{let S=document.createElement("div");S.textContent=A,S.style.cssText=n.radioLabel,A===J&&(S.style.cssText+=n.radioActive),S.onclick=()=>{Array.from(V.children).forEach(x=>x.style.cssText=n.radioLabel),S.style.cssText+=n.radioActive,_.value=A,q&&q(A)},V.appendChild(S)}),i[M]={input:_,wrapper:I,required:!1},I.appendChild(V),o.appendChild(I),I}let p=document.createElement("div");p.style.cssText=n.banner,p.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(p);let l=document.createElement("div");l.style.marginBottom="24px";let c=document.createElement("button");c.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",c.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",c.onmouseover=()=>c.style.background="#E1EFFF",c.onmouseout=()=>c.style.background="#F0F7FF",l.appendChild(c),o.appendChild(l);let d=document.createElement("div");d.style.cssText=n.section,d.innerHTML=`<div style="${n.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(d),r({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:d}),r({id:"ga4",label:"GA4 Property ID",parent:d}),r({id:"gtm",label:"GTM Container ID",parent:d});let h=document.createElement("div");h.style.cssText=n.hiddenField,d.appendChild(h),s({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:M=>{M==="Yes"?h.style.cssText=n.visibleField+"margin-bottom:14px;":(h.style.cssText=n.hiddenField,i.accessEmail.input.value="")}}),r({id:"accessEmail",label:"User Access Email",parent:h}),s({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let b=document.createElement("div");b.style.cssText=n.section,b.innerHTML=`<div style="${n.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(b),r({id:"name",label:"Advertiser Name",required:!0,parent:b}),r({id:"url",label:"Website URL",parent:b}),r({id:"phone",label:"Phone Number",parent:b}),r({id:"email",label:"Contact Email",parent:b}),r({id:"callback",label:"Preferred Callback Time (Timezone)",parent:b}),r({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:b}),r({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:b}),r({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:b});let f=document.createElement("div");f.style.cssText=n.section,f.innerHTML=`<div style="${n.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(f),r({id:"cc_adv",label:"Advertiser Contact",parent:f}),r({id:"cc_am",label:"Account Manager",parent:f});let u=document.createElement("div");u.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let w=document.createElement("button");w.innerHTML="Voltar",w.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",w.onclick=t;let E=document.createElement("button");E.textContent="Gerar Nota",E.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",u.appendChild(w),u.appendChild(E),e.appendChild(u),c.onclick=async()=>{let M=c.innerHTML;c.innerHTML="\u23F3 Buscando dados...";try{let R=await we(),K=0,J=(z,V)=>{let _=i[z];V&&_&&_.input.value===""&&(_.input.value=V,_.input.style.backgroundColor="#E6F4EA",_.input.style.borderColor="#34A853",setTimeout(()=>{_.input.style.backgroundColor="#FFF",_.input.style.borderColor="#DADCE0"},1e3),K++)};J("name",R.advertiserName),J("url",R.websiteUrl),R.clientEmail&&(J("email",R.clientEmail),J("cc_adv",R.clientEmail));let I=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);I&&J("cid",I[0]),K>0?Y(`${K} campos preenchidos!`):Y("Nenhum dado novo encontrado.")}catch(R){console.error(R),Y("Erro ao ler p\xE1gina.")}finally{c.innerHTML=M}};let U=()=>{let M=!0,R=null;return Object.values(i).forEach(K=>{K.required&&!K.input.value.trim()&&(M=!1,K.input.style.cssText+=n.inputError,K.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),R||(R=K.input))}),R&&R.scrollIntoView({behavior:"smooth",block:"center"}),M};return E.onclick=async()=>{if(!U()){Y("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let M=z=>i[z].input.value||"N/A",R=M("hasAccess"),K=R==="Yes"?M("accessEmail"):"N/A",q=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${M("cid")}
<b>GA4 ID:</b> ${M("ga4")}
<b>GTM ID:</b> ${M("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${R==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${K}
<b>Ghosting Access Available (Y/N):</b> ${M("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${M("name")}
<b>Website:</b> ${M("url")}
<b>Phone Number:</b> ${M("phone")}
<b>Preferred Callback:</b> ${M("callback")}
<b>Email Address:</b> ${M("email")}

<b>Detailed Issue Description:</b>
${M("desc")}

<b>Uncropped screenshots:</b>
${M("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${M("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${M("cc_adv")}
<b>Account Manager:</b> ${M("cc_am")}
`.replace(/\n/g,"<br>");Qe(q);let I=await ft();I?(I.innerText.trim()===""&&(I.innerHTML=""),document.execCommand("insertHTML",!1,q),gt(I),Y("Nota gerada e inserida!")):Y("Copiado! Abra uma nota para colar.")},e}var fe=t=>new Promise(e=>setTimeout(e,t));function ye(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function Fe(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function bt(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,a=document.getElementById(o);a&&a.remove();let n=t.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
        position: fixed;
        top: ${n.bottom+8}px;
        left: ${n.left}px;
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
    `;let r=i.querySelector(".cw-close-btn");r.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&r.click()},25e3)}async function xt(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await fe(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await fe(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function It(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let a=o.offsetParent!==null,n=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return a&&!n&&i});return e&&ye("Editor visualmente detectado.","success"),e}async function mo(){ye("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(d=>d.innerText.trim()==="email");if(o&&o.offsetParent!==null){ye("Bot\xE3o de email direto encontrado.");let d=o.closest("material-button")||o.closest("material-fab")||o;Fe(d),t=!0}else{ye("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let d=document.querySelector("material-fab-speed-dial");if(d){let h=d.querySelector(".trigger");if(h){Fe(h),await fe(800);let f=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="email");f&&(Fe(f),t=!0)}}}if(!t)return Y("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ye("\u{1F680} FASE 2: Verificando rascunhos...");let a=null,n=0,i=20;for(;n<i;){await fe(250);let d=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(a=Array.from(d).find(h=>h.offsetParent!==null),a){ye("\u26A0\uFE0F Rascunho detectado!","warn");break}n++}if(a){ye("\u{1F5D1}\uFE0F Descartando..."),Fe(a),a.click();let d=null,h=0;for(;h<15;){await fe(300);let b=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(d=Array.from(b).find(f=>f.offsetParent!==null),d)break;h++}d&&(Fe(d),Y("Limpando rascunho antigo...",{duration:2e3}),await fe(2500))}ye("\u{1F680} FASE 3: Buscando editor final...");let r=0,s=null;for(;r<20&&(s=It(),!s);)await fe(250),r++;if(!s)return Y("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let p=s.closest('[id="email-body-content-top"]'),c=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(p){if(c){let h=c.closest('[aria-hidden="true"]');h&&h.removeAttribute("aria-hidden"),c.focus(),Fe(c)}await fe(300),p.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let d=p.querySelector("#cases-body-field");if(d){let h=document.createRange();h.selectNodeContents(d),h.collapse(!0);let b=window.getSelection();b.removeAllRanges(),b.addRange(h)}return!0}return!1}async function ht(t){if(!t||!await mo())return;let o=await we();ye("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let a=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(a&&(a.click(),await fe(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await xt(i,o.clientEmail),bt(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await xt(i,o.internalEmail),bt(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await fe(500);let n=document.querySelector('material-button[debug-id="canned_response_button"]');if(n){Fe(n),await fe(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Fe(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),ye("\u23F3 Buscando resultado da Canned Response...","info");let r=null,s=0,p=15e3,l=500;for(;s<p&&(r=document.querySelector("material-select-dropdown-item"),!r);)await fe(l),s+=l;if(r){Fe(r),await fe(1500);let c=It();if(c){let h=Array.from(c.querySelectorAll("span.field")).filter(f=>f.innerText.includes("{Requested Task Type}"));if(h.length>0){let f=h.map(w=>w.closest("tr")).filter(w=>w!==null),u=[...new Set(f)];if(u.length>0){let E=u[0].querySelector('td[width="100%"]');E&&(E.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let U=1;U<u.length;U++)u[U].remove()}}let b=c.innerHTML;o.advertiserName&&b.includes("{%ADVERTISER_NAME%}")&&(b=b.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),b.includes("{%^79285%}")&&(b=b.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),c.innerHTML=b}Y("Canned Response aplicada!")}else ye(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),Y(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else Y("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function go(t){if(ye(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await mo())return;let o=await we(),a=Ye();await fe(600);let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await fe(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await xt(s,o.clientEmail),bt(s,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await xt(s,o.internalEmail),bt(s,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await fe(300));let r=It();if(r){let p=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');p&&(p.focus(),Fe(p));let l=new Date;l.setDate(l.getDate()+3);let c=l.getDay();c===6?l.setDate(l.getDate()+2):c===0&&l.setDate(l.getDate()+1);let d=l.toLocaleDateString("pt-BR"),h=t.body;h=h.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),h=h.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),h=h.replace(/\[URL\]/g,o.websiteUrl||"seu site"),h=h.replace(/\[Seu Nome\]/g,a),h=h.replace(/\[MM\/DD\/YYYY\]/g,d),document.execCommand("insertHTML",!1,h),p&&(p.dispatchEvent(new Event("input",{bubbles:!0})),p.dispatchEvent(new Event("change",{bubbles:!0}))),Y("Email preenchido com sucesso!",{duration:2e3}),ye("\u2705 Processo finalizado com sucesso.","success")}else Y("Erro ao focar no editor.",{error:!0})}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function ue(t,e,o){let a=document.getElementById(o);if(!e)return;let n=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(a){let c=a.getBoundingClientRect();i.x=c.left+c.width/2,i.y=c.top+c.height/2}let r,s;if(!n)r=window.innerWidth/2,s=window.innerHeight/2;else{let c=e.getBoundingClientRect();r=c.left+c.width/2,s=c.top+c.height/2,r===0&&s===0&&(r=window.innerWidth/2,s=window.innerHeight/2)}let p=i.x-r,l=i.y-s;t?(H.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",n?e.style.transform=`translate(${p}px, ${l}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${l}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),a&&a.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",n?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof fo=="function"&&fo(e,o)):(H.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",n?e.style.transform=`translate(${p}px, ${l}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${l}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),a&&a.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof Lt=="function"&&Lt(e))}function fo(t,e){Lt(t);let o=a=>{if(!t.classList.contains("open"))return;let n=t.contains(a.target),i=document.querySelector(".cw-pill"),r=i&&i.contains(a.target);n?(t.classList.remove("idle"),t.style.zIndex="2147483648"):r||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function Lt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function bo(){let t="v4.0.0",{popup:e,content:o,header:a,animRefs:n,credit:i}=Zt(t,J),r=no(m),s=ao(()=>{A(),W.setActiveTasks(s.getCheckedElements())},m,W),p=document.createElement("div");p.style.display="none";let l=oo((g,v)=>{S(g,v)});p.appendChild(l);let c=lo({onSaveCurrent:async()=>{let g=await y();return F(),g},onLoadDraft:g=>{$(g)},t:g=>m(g)}),d=I(),h=z(),b=document.createElement("div"),f=G(),u=L(c,m);o.appendChild(d),o.appendChild(h),o.appendChild(f),o.appendChild(p),o.appendChild(b),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none";let w=document.createElement("button");w.id="manual-task-toggle",w.textContent=m("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",w.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${P.primary}; background: ${P.surface}; color: ${P.primary}; border-radius: ${de.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${re}; text-transform: uppercase; letter-spacing: 0.5px;`,w.onmouseenter=()=>{w.style.background=P.primaryBg},w.onmouseleave=()=>{w.style.background=P.surface},w.onclick=()=>{s.selectionElement.style.display="block",s.screenshotsElement.style.display="block",w.style.display="none"},o.appendChild(w),o.appendChild(s.selectionElement),o.appendChild(r.element),o.appendChild(s.screenshotsElement),o.appendChild(u);let E=document.createElement("div");E.style.display="none",E.style.flexGrow="1",E.style.minHeight="0",E.style.overflow="hidden";let U=uo(()=>q());U.style.height="100%",E.appendChild(U),e.insertBefore(E,i);let M=a.lastElementChild;M&&(M.insertBefore(c.historyBtnWrapper,M.firstChild),M.insertBefore(N(),M.firstChild)),e.appendChild(c.drawer);let R=null;W.subscribe(g=>{Z(g),K(),g.isDirty?(R&&clearTimeout(R),R=setTimeout(async()=>{let v=await y(!0);v.subStatus?ge.saveEmergency(v):ge.clearEmergency(),g.isDirty=!1},2e3)):R&&(clearTimeout(R),R=null)});function K(){let g=ge.getCount()>0,v=!!W.currentSubStatus;ut(g||v)}function J(){W.visible=!W.visible,ue(W.visible,e,"cw-btn-notes")}function q(){W.isSplitView=!W.isSplitView,W.isSplitView?(o.style.display="none",E.style.display="flex",E.style.flexDirection="column",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",E.style.display="none",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function I(){let g=document.createElement("div");if(g.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-idioma" style="font-size: 10px; margin-bottom: 6px;">${m("idioma")}</div>
                    <div class="cw-segmented-control" id="lang-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-lang="pt" class="active" style="z-index:2">PT</button>
                        <button data-lang="es" style="z-index:2">ES</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${m("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${m("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${m("nao")}</button>
                        <button data-val="true" style="z-index:2">${m("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let O=document.createElement("style");O.id="cw-segmented-styles",O.innerHTML=`
                .cw-segmented-control {
                    display: flex;
                    background: ${P.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${P.border};
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
                    transition: all 0.3s ${re};
                    color: ${P.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${P.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${P.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `,document.head.appendChild(O)}let v=(O,B)=>{let X=g.querySelector(`#${O}`).querySelector(".cw-segmented-indicator");X&&(X.style.transform=`translateX(${B*100}%) translateX(${B*2}px)`)};return g.querySelectorAll("#lang-selector button").forEach((O,B)=>{O.onclick=()=>{W.setLanguage(O.dataset.lang),g.querySelectorAll("#lang-selector button").forEach(D=>D.classList.remove("active")),O.classList.add("active"),v("lang-selector",B),H.playHover(),W.currentSubStatus&&_(W.currentSubStatus)}}),g.querySelectorAll("#type-selector button").forEach((O,B)=>{O.onclick=()=>{W.setCaseType(O.dataset.type),g.querySelectorAll("#type-selector button").forEach(D=>D.classList.remove("active")),O.classList.add("active"),v("type-selector",B),H.playHover(),W.currentSubStatus&&_(W.currentSubStatus)}}),g.querySelectorAll("#portugal-selector button").forEach((O,B)=>{O.onclick=()=>{W.setPortugalCase(O.dataset.val==="true"),g.querySelectorAll("#portugal-selector button").forEach(D=>D.classList.remove("active")),O.classList.add("active"),v("portugal-selector",B),H.playHover(),W.currentSubStatus&&_(W.currentSubStatus)}}),g}function z(){let g=document.createElement("div");g.className="cw-status-section",g.style.cssText="display: flex; flex-direction: column; gap: 8px;",g.innerHTML=`
            <div class="cw-section-title js-label-status" style="margin-top: 8px;">${m("status_principal")}</div>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${m("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <div class="cw-section-title js-label-substatus" style="margin-top: 8px;">${m("substatus")}</div>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${m("select_substatus")}</option>
            </select>
        `;let v=g.querySelector("#main-status-select"),O=g.querySelector("#sub-status-select");return v.onchange=()=>{W.setStatus(v.value),V(v.value,O),W.setSubStatus(""),_("")},O.onchange=()=>{W.setSubStatus(O.value),_(O.value)},g}function V(g,v){if(v.innerHTML=`<option value="">${m("select_substatus")}</option>`,!g){v.disabled=!0;return}for(let O in ke)if(ke[O].status===g){let B=document.createElement("option");B.value=O,B.textContent=ke[O].name,v.appendChild(B)}v.disabled=!1}function _(g){if(l.render&&l.render(g,W.currentCaseType),!g){p.style.display="none",b.style.display="none",document.getElementById("manual-task-toggle").style.display="none",s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",f.style.display="flex",f.style.opacity="1",u.style.display="none";return}f.style.opacity="0",setTimeout(()=>{W.currentSubStatus&&(f.style.display="none")},400),u.style.display="grid";let v=ke[g];v&&v.templateFields&&W.setActiveFields(v.templateFields),C(),Tt(g,b,W),b.style.display="block",p.style.display="block";let O=g.startsWith("SO_"),B=g==="NI_Awaiting_Validation",D=document.getElementById("manual-task-toggle");O||B?(s.selectionElement.style.display="block",D.style.display="none"):(s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",D.style.display="block");let X=g==="SO_Education_Only"?"education":"implementation";W.setScreenshotMode(X),W.currentCaseType==="lm"?W.toggleFieldExclusion("field-ON_CALL",!0):W.toggleFieldExclusion("field-ON_CALL",!1),s.updateSubStatus(g),A();let j=document.getElementById("email-automation-toggle-row");j&&(j.style.display=He[g]?"flex":"none")}function A(){let g=s.getCheckedElements().map(v=>v.value);r.updateVisibility(W.currentSubStatus,g)}function S(g,v){let O=st[g];if(O){for(let B in O)if(B==="linkedTask")s.toggleTask(O.linkedTask,v);else if(B==="activeTasks")O.activeTasks.forEach(D=>{v?s.setTaskCount(D.value,D.count):s.setTaskCount(D.value,0)});else if(B.startsWith("field-")){let D=B,X=O[B],j=document.getElementById(D);if(j){let Q=Ge.includes(D.replace("field-",""));if(v)if(Q){let ne=j.value.trim();ne.includes(X.trim())||(j.value=ne?ne+`
`+X.trim():X.trim())}else j.value=X;else if(Q){let ne=j.value.trim(),se=X.trim();ne.includes(se)&&(j.value=ne.replace(se,"").trim().replace(/\n{3,}/g,`

`))}else j.value.trim()===X.trim()&&(j.value="");W.updateField(D,j.value),j.dispatchEvent(new Event("input"))}}}}function L(g,v){let O=document.createElement("div");if(O.className="cw-actions-section",O.style.cssText=`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${P.bgInput};
            border-radius: 12px;
            border: 1px solid ${P.border};
        `,!document.getElementById("cw-actions-hover-styles")){let ne=document.createElement("style");ne.id="cw-actions-hover-styles",ne.innerHTML=`
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
                    border-color: ${P.primary} !important;
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
                    color: ${P.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `,document.head.appendChild(ne)}let B=document.createElement("div");B.id="email-automation-toggle-row",B.style.cssText="grid-column: span 2; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",B.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${P.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${P.primary};">
                <span class="js-label-email-toggle">${v("preencher_email_automaticamente")}</span>
            </label>
        `;let D=g.parkButton;D.classList.add("js-btn-park"),D.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let X=document.createElement("button");X.className="cw-btn-secondary js-btn-reset",X.textContent=v("limpar"),X.style.cssText=`width: 100%; height: 34px; background: ${P.surface}; color: ${P.textSub}; border: 1px solid ${P.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,X.onclick=()=>F();let j=document.createElement("button");j.className="cw-btn-secondary js-btn-copy",j.textContent=v("copiar"),j.style.cssText=`width: 100%; height: 34px; background: ${P.surface}; color: ${P.primary}; border: 1px solid ${P.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,j.onclick=()=>x();let Q=document.createElement("button");return Q.className="cw-btn-primary js-btn-generate",Q.textContent=v("preencher"),Q.style.cssText=`width: 100%; height: 38px; background: ${P.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: span 2; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,Q.onclick=()=>T(),O.appendChild(B),O.appendChild(D),O.appendChild(X),O.appendChild(j),O.appendChild(Q),O}async function x(){if(!W.currentSubStatus){Y(m("select_substatus"),{error:!0});return}let g=kt(W,s,r);g?(Qe(g),Y(m("copiado_sucesso")),H.playClick()):Y(m("select_substatus"),{error:!0})}async function T(){if(!W.currentSubStatus){Y(m("select_substatus"),{error:!0});return}let g=kt(W,s,r);Qe(g),J();let v=Ze(),O=await ft();if(O){O.focus(),document.execCommand("insertHTML",!1,g),gt(O);let B=document.getElementById("email-automation-checkbox");(!B||B.checked)&&W.currentSubStatus&&He[W.currentSubStatus]&&await ht(He[W.currentSubStatus]),Y(m("inserido_copiado")),H.playSuccess(),F()}v()}function C(){if(W.currentSubStatus){if(W.currentCaseType==="lm")W.removeField("ON_CALL");else{let g=ke[W.currentSubStatus];g&&g.templateFields.includes("ON_CALL")&&W.addFieldAt("ON_CALL",1)}W.isPortugalCase?(W.addFieldAt("CASO_PORTUGAL",1),W.addFieldAt("CONSENTIU_GRAVACAO",2)):(W.removeField("CASO_PORTUGAL"),W.removeField("CONSENTIU_GRAVACAO"))}}function F(){W.reset(),s.reset(),r.reset(),K(),ge.clearEmergency(),o.querySelectorAll("select").forEach(v=>v.value=""),o.querySelector("#sub-status-select").disabled=!0;let g=document.getElementById("email-automation-toggle-row");g&&(g.style.display="none"),b.innerHTML="",p.style.display="none",f.style.display="flex",f.style.opacity="1",u.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none"}async function y(g=!1){let v={};b.querySelectorAll("input, textarea, select").forEach(j=>{(j.id.startsWith("field-")||j.id==="consent-select")&&(v[j.id]=j.value)});let O="Cliente",B="---";if(!g)try{let j=await we();O=j.advertiserName,B=j.cid}catch(j){console.warn("Erro ao coletar pageData:",j)}let D=s.getCheckedElements().map(j=>({key:j.value,count:j.count})),X=D.map(j=>{let Q=Ce[j.key];return Q?Q.name:j.key});return{currentCaseType:W.currentCaseType,currentLang:W.currentLang,isPortugalCase:W.isPortugalCase,consent:W.consent,tagSupportUsed:W.tagSupportUsed,forcedScreenshots:[...W.forcedScreenshots],excludedFields:[...W.excludedFields],activeFields:W.activeFields,status:W.currentStatus,subStatus:W.currentSubStatus,formData:v,activeTasks:D,summaryTags:X,clientName:O,cid:B,timestamp:new Date().toISOString()}}let k=g=>new Promise(v=>setTimeout(v,g));async function $(g){W.setLanguage(g.currentLang||"pt"),W.setCaseType(g.currentCaseType||"bau"),W.setPortugalCase(g.isPortugalCase||!1),W.setConsent(g.consent||!1),W.setExcludedFields(g.excludedFields||[]),g.activeFields&&W.setActiveFields(g.activeFields);let v=o.querySelector(`#lang-selector button[data-lang="${W.currentLang}"]`);v&&v.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach(D=>{D!==v&&D.classList.remove("active")});let O=o.querySelector(`#type-selector button[data-type="${W.currentCaseType}"]`);O&&O.classList.add("active"),o.querySelectorAll("#type-selector button").forEach(D=>{D!==O&&D.classList.remove("active")});let B=o.querySelector(`#portugal-selector button[data-val="${W.isPortugalCase}"]`);if(B&&B.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach(D=>{D!==B&&D.classList.remove("active")}),g.status){let D=o.querySelector("#main-status-select");D.value=g.status,W.setStatus(g.status);let X=o.querySelector("#sub-status-select");if(V(g.status,X),await k(50),g.subStatus){if(X.value=g.subStatus,W.setSubStatus(g.subStatus),_(g.subStatus),await k(100),g.tagSupportUsed!==void 0){W.setTagSupportUsed(g.tagSupportUsed);let j=r.element.querySelector('input[value="Sim"]'),Q=r.element.querySelector('input[value="N\xE3o"]');g.tagSupportUsed&&j?j.checked=!0:Q&&(Q.checked=!0),r.element.querySelector("div:last-child").style.display=g.tagSupportUsed?"none":"block"}g.forcedScreenshots&&W.setForcedScreenshots(g.forcedScreenshots);for(let j in g.formData){let Q=document.getElementById(j);Q&&(Q.value=g.formData[j],W.updateField(j,Q.value))}g.activeTasks&&(g.activeTasks.forEach(j=>s.setTaskCount(j.key,j.count)),W.setActiveTasks(s.getCheckedElements()))}}W.isDirty=!1}function m(g){return Se[W.currentLang]?.[g]||Se.pt?.[g]||g}function N(){let g=document.createElement("div");return g.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',g.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",g.onclick=v=>{v.stopPropagation(),q()},g.title="Alternar para Split & Transfer",g}function G(){let g=document.createElement("div");return g.id="notes-empty-state",g.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${re};
        `,g.innerHTML=`
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
                <div style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${P.text}; margin-bottom: 4px;">
                    ${m("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${P.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${m("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,g}function Z(g){let v=o.querySelector(".js-label-idioma");v&&(v.textContent=m("idioma"));let O=o.querySelector(".js-label-fluxo");O&&(O.textContent=m("fluxo"));let B=o.querySelector(".js-label-portugal");B&&(B.textContent=m("caso_portugal"));let D=o.querySelector(".js-label-status");D&&(D.textContent=m("status_principal"));let X=o.querySelector(".js-label-substatus");X&&(X.textContent=m("substatus"));let j=o.querySelector(".js-btn-copy");j&&(j.textContent=m("copiar"));let Q=o.querySelector(".js-btn-generate");Q&&(Q.textContent=m("preencher"));let ne=o.querySelector(".js-btn-reset");ne&&(ne.textContent=m("limpar"));let se=document.getElementById("manual-task-toggle");se&&(se.textContent=m("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let ie=o.querySelector(".js-btn-park span");ie&&(ie.textContent=m("guardar"));let oe=e.querySelector(".js-drawer-title");oe&&(oe.textContent=m("rascunhos_salvos"));let ce=o.querySelector(".js-label-email-toggle");ce&&(ce.textContent=m("preencher_email_automaticamente")),r&&r.setLanguage&&r.setLanguage(m),s&&s.setLanguage&&s.setLanguage(m)}return f.style.display="flex",u.style.display="none",W.setLanguage("pt"),W.setCaseType("bau"),K(),setTimeout(async()=>{let g=ge.getEmergency();g&&(await xe("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?($(g),Y("Sess\xE3o restaurada!")):ge.clearEmergency())},3e3),document.body.appendChild(e),J}var xo=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}];var ho={_templates:null,async getTemplates(){return this._templates?this._templates:(this._templates=xo,this._templates)}};var yo="cw_personal_library_v1",Ve=!1,he={getSnippets:(t="all")=>{let e=he._loadFromLocal(),o=Ee();return o&&o.includes("@")&&!Ve&&he._syncWithServer(o),t==="all"?e:e.filter(a=>a.type===t)},save:async t=>{let e=Ee();if(!e)return Y("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;Ve=!0;let o=he._loadFromLocal(),a=new Date().toISOString(),n={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:a},i=o.filter(r=>r.id!==n.id);return i.unshift(n),he._saveToLocal(i),be.saveSnippet(n,e).then(r=>{r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais."),setTimeout(()=>{Ve=!1},2e3)}),n},delete:async t=>{let e=Ee();Ve=!0;let a=he._loadFromLocal().filter(n=>n.id!==t);return he._saveToLocal(a),e?be.deleteSnippet(t,e).then(()=>{setTimeout(()=>{Ve=!1},2e3)}):Ve=!1,!0},_syncWithServer:async t=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let e=await be.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,a=he._loadFromLocal(),n=JSON.stringify(o),i=JSON.stringify(a);n!==i&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),he._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(yo)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem(yo,JSON.stringify(t))}};var vo=!1;function ia(){if(vo)return;let t=`
        :root {
            --cw-color-bg-app: #F5F5F7;
            --cw-color-bg-surface: #FFFFFF;
            --cw-color-border-subtle: rgba(0, 0, 0, 0.07);
            --cw-color-primary: #007AFF;
            --cw-color-primary-bg: rgba(0, 122, 255, 0.1);
            --cw-color-text-primary: #1D1D1F;
            --cw-color-text-secondary: #6E6E73;
            --cw-shadow-card: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
            --cw-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .cw-email-popup {
            width: 850px;
            height: 650px;
            display: flex;
            flex-direction: column;
            font-family: var(--cw-font-family);
            border-radius: 12px;
            overflow: hidden;
            background-color: var(--cw-color-bg-app);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2), 0 15px 15px rgba(0,0,0,0.1);
        }
        .cw-email-main { display: flex; flex: 1; overflow: hidden; }
        .cw-email-left-panel { width: 320px; background-color: #EFEFF0; border-right: 1px solid var(--cw-color-border-subtle); display: flex; flex-direction: column; flex-shrink: 0; }
        .cw-email-search-container { padding: 16px; border-bottom: 1px solid var(--cw-color-border-subtle); position: relative; }
        .cw-email-search-input {
            width: 100%; padding: 10px 14px 10px 36px; border-radius: 10px; border: 1.5px solid transparent; background-color: #E3E3E8;
            font-size: 15px; outline: none; box-sizing: border-box; color: var(--cw-color-text-primary);
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
            background-repeat: no-repeat; background-position: 12px center; transition: all 0.2s ease-in-out;
        }
        .cw-email-search-input:focus { background-color: #FFFFFF; border-color: var(--cw-color-primary); box-shadow: 0 0 0 4px var(--cw-color-primary-bg); transform: scale(1.02); }
        .cw-email-search-clear {
            position: absolute; right: 26px; top: 50%; transform: translateY(-50%); font-size: 10px; color: #fff; cursor: pointer; display: none;
            background-color: #C7C7CC; width: 16px; height: 16px; border-radius: 50%; text-align: center; line-height: 16px; font-weight: bold;
        }
        #email-template-list { flex: 1; overflow-y: auto; padding: 8px; scroll-behavior: smooth; }
        #email-template-list::-webkit-scrollbar { width: 4px; }
        #email-template-list::-webkit-scrollbar-track { background: transparent; }
        #email-template-list::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 10px; }
        #email-template-list::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.2); }

        .cw-email-right-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: var(--cw-color-bg-app); transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1); }
        .cw-email-fields-section { padding: 20px; border-bottom: 1px solid var(--cw-color-border-subtle); background-color: var(--cw-color-bg-surface); max-height: 250px; overflow-y: auto; display: none; }
        .cw-email-preview-section { flex: 1; display: flex; flex-direction: column; padding: 20px; overflow: hidden; }
        .cw-email-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cw-email-preview-title { font-size: 12px; font-weight: 600; color: var(--cw-color-text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-preview-actions { display: flex; gap: 8px; }

        .cw-btn { padding: 8px 14px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1); border: none; }
        .cw-btn-primary { background: var(--cw-color-primary); color: #fff; box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3); }
        .cw-btn-primary:hover { background-color: #0062CC; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4); }
        .cw-btn-secondary { background: transparent; color: var(--cw-color-primary); border: 1.5px solid var(--cw-color-primary); }
        .cw-btn-secondary:hover { background-color: var(--cw-color-primary-bg); }
        .cw-btn-smart-cr { border-color: #E67E22; color: #E67E22; display: none; }
        .cw-btn-smart-cr:hover { background-color: rgba(230, 126, 34, 0.1); }

        .cw-email-preview-content { flex: 1; background-color: var(--cw-color-bg-surface); border: 1px solid var(--cw-color-border-subtle); border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: var(--cw-color-text-primary); overflow-y: auto; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02); }
        
        .cw-email-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cw-email-field-label { display: block; font-size: 11px; font-weight: 700; color: var(--cw-color-text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-field-input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid var(--cw-color-border-subtle); background-color: #FBFBFD; font-size: 14px; box-sizing: border-box; transition: all 0.2s ease; outline: none; }
        .cw-email-field-input:focus { border-color: var(--cw-color-primary); background-color: #FFFFFF; box-shadow: 0 0 0 4px var(--cw-color-primary-bg); }

        .cw-email-category-header {
            padding: 12px 16px 12px 24px; font-size: 11px; font-weight: 700; color: var(--cw-color-text-secondary); text-transform: uppercase;
            letter-spacing: 0.8px; position: sticky; top: -8px; background-color: rgba(239, 239, 240, 0.9); z-index: 10;
            backdrop-filter: blur(20px); margin: 0 -8px 8px -8px; border-bottom: 0.5px solid var(--cw-color-border-subtle);
            cursor: pointer; display: flex; align-items: center; justify-content: space-between; user-select: none; transition: background-color 0.2s ease;
        }
        .cw-email-category-header:hover { background-color: rgba(230, 230, 232, 0.9); }
        .cw-email-category-badge { background-color: rgba(0, 0, 0, 0.05); padding: 2px 8px; border-radius: 10px; font-size: 10px; color: var(--cw-color-text-secondary); }

        .cw-email-template-item {
            padding: 12px 14px; font-size: 14px; cursor: pointer; transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            border-radius: 10px; color: var(--cw-color-text-primary); margin: 4px 6px; display: flex; align-items: center; gap: 12px;
            background-color: var(--cw-color-bg-surface); box-shadow: var(--cw-shadow-card); border: 1px solid var(--cw-color-border-subtle);
            position: relative; overflow: hidden;
        }
        .cw-email-template-item:hover { background-color: #f8f8f9; transform: translateY(-1px) scale(1.01); box-shadow: 0 4px 8px rgba(0,0,0,0.08); border-color: rgba(0, 122, 255, 0.2); }
        .cw-email-template-item.selected { background-color: var(--cw-color-primary); color: #fff; font-weight: 600; box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3); border: none; }
        .cw-email-template-item-icon { font-size: 12px; opacity: 0.7; flex-shrink: 0; }
        .cw-email-template-item.selected .cw-email-template-item-icon { opacity: 1; }
        .cw-email-template-item-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }

        @keyframes cw-floating { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        .cw-animate-float { animation: cw-floating 3s ease-in-out infinite; }
    `,e=document.createElement("style");e.textContent=t,document.head.appendChild(e),vo=!0}function wo(){ia();let t="v6.1.1",e=!1,o=[],a=null,n="",i=new Set,r=document.createElement("div");r.id="email-assistant-popup",r.className="cw-module-window cw-email-popup",Object.assign(r.style,me,{display:"none"});let s=pe(r,"Email Assistant",t,"UI Refatorada com CSS-in-JS Injetado e Classes.",{popup:r},()=>V()),p=document.createElement("div");p.className="cw-email-main";let l=document.createElement("div");l.className="cw-email-left-panel";let c=document.createElement("div");c.className="cw-email-search-container";let d=document.createElement("input");d.placeholder="Buscar templates...",d.className="cw-email-search-input";let h=document.createElement("div");h.innerHTML="\u2715",h.className="cw-email-search-clear",h.onclick=()=>{d.value="",n="",h.style.display="none",A(),d.focus()},c.appendChild(d),c.appendChild(h);let b=document.createElement("div");b.id="email-template-list",l.appendChild(c),l.appendChild(b);let f=document.createElement("div");f.className="cw-email-right-panel";let u=document.createElement("div");u.className="cw-email-fields-section";let w=document.createElement("div");w.className="cw-email-preview-section";let E=document.createElement("div");E.className="cw-email-preview-header";let U=document.createElement("span");U.textContent="Preview do E-mail",U.className="cw-email-preview-title";let M=document.createElement("div");M.className="cw-email-preview-actions";let R=(C,F="secondary",y="")=>{let k=document.createElement("button");return k.textContent=C,k.className=`cw-btn cw-btn-${F} ${y}`,k},K=R("Copiar HTML","secondary"),J=R("Preencher no CRM","primary"),q=R("Smart CR","secondary","cw-btn-smart-cr");M.appendChild(q),M.appendChild(K),M.appendChild(J),E.appendChild(U),E.appendChild(M);let I=document.createElement("div");I.contentEditable="true",I.className="cw-email-preview-content",w.appendChild(E),w.appendChild(I),f.appendChild(u),f.appendChild(w),p.appendChild(l),p.appendChild(f),r.appendChild(s),r.appendChild(p);let z=document.createElement("div");Object.assign(z.style,Ae),r.appendChild(z),Te(r,z),document.body.appendChild(r),T();function V(){e=!e,e?(r.style.display="flex",Vt(r),o.length===0&&_()):r.style.display="none",ue(e,r,"cw-btn-email")}async function _(){b.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',o=await ho.getTemplates(),A()}function A(){b.innerHTML="";let C=o.filter(m=>m.name.toLowerCase().includes(n.toLowerCase())||m.category.toLowerCase().includes(n.toLowerCase())),F=Object.entries(He).filter(([m,N])=>N&&(m.toLowerCase().includes(n.toLowerCase())||N.toLowerCase().includes(n.toLowerCase()))).map(([m,N])=>({id:m,name:m.replace(/_/g," "),category:"\u26A1 Smart CRs",code:N,isSmartCR:!0})),y=he.getSnippets("email").filter(m=>m.title.toLowerCase().includes(n.toLowerCase())||m.subject&&m.subject.toLowerCase().includes(n.toLowerCase())).map(m=>{let N=[],G=m.content.match(/\[([^\]]+)\]/g);return G&&[...new Set(G)].forEach(Z=>{N.push({key:Z,label:Z.replace("[","").replace("]",""),type:Z.toLowerCase().includes("data")?"date":"text",auto:Z.toLowerCase().includes("nome")&&Z.toLowerCase().includes("seu")?"agentName":null})}),{id:m.id||`snippet-${Math.random()}`,name:m.title,category:"\u{1F464} Pessoal",subject:m.subject||"Sem Assunto",template:m.content,placeholders:N}}),k=[...C,...F,...y];if(k.length===0){b.innerHTML=`
                <div style="padding: 40px 20px; text-align: center; color: var(--cw-color-text-secondary); opacity: 0.6;">
                    <div style="font-size: 32px; margin-bottom: 12px;">\u{1F50D}</div>
                    <div style="font-size: 14px; font-weight: 500;">Nenhum resultado para "${n}"</div>
                </div>`;return}[...new Set(k.map(m=>m.category))].sort((m,N)=>m.localeCompare(N)).forEach(m=>{let N=i.has(m)||n.length>0,G=k.filter(D=>D.category===m),Z=document.createElement("div");Z.className="cw-email-category-header";let g=document.createElement("span");g.textContent=m;let v=document.createElement("div");v.style.display="flex",v.style.alignItems="center";let O=document.createElement("span");O.textContent=G.length,O.className="cw-email-category-badge";let B=document.createElement("span");B.innerHTML=N?"\u25BE":"\u25B8",B.style.marginLeft="8px",B.style.transition="transform 0.3s ease",v.appendChild(O),v.appendChild(B),Z.appendChild(g),Z.appendChild(v),Z.onclick=()=>{i.has(m)?i.delete(m):i.add(m),A()},b.appendChild(Z),N&&G.forEach(D=>{let X=document.createElement("div");X.className="cw-email-template-item",a&&a.id===D.id&&X.classList.add("selected");let j=document.createElement("span");j.className="cw-email-template-item-icon",j.innerHTML=D.isSmartCR?"\u26A1":D.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}";let Q=document.createElement("span");Q.className="cw-email-template-item-text",Q.textContent=D.name,X.appendChild(j),X.appendChild(Q),X.onclick=()=>L(D),b.appendChild(X)})})}let S=null;function L(C){a?.id!==C.id&&(a=C,S&&clearTimeout(S),f.style.opacity="0",f.style.transform="translateY(5px)",S=setTimeout(()=>{q.style.display=C.isSmartCR?"block":"none",J.style.display=C.isSmartCR?"none":"block",K.style.display=C.isSmartCR?"none":"block",A(),x(),T(),f.style.opacity="1",f.style.transform="translateY(0)",S=null},150))}function x(){if(u.innerHTML="",!a||a.isSmartCR){a?.isSmartCR?(u.style.display="block",u.innerHTML=`<div style="padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):u.style.display="none";return}let C=a.placeholders&&a.placeholders.length>0;if(u.style.display=C?"block":"none",!C)return;let F=document.createElement("div");F.className="cw-email-fields-grid",(a.placeholders||[]).forEach(y=>{let k=document.createElement("div"),$=document.createElement("label");$.textContent=y.label,$.className="cw-email-field-label";let m=document.createElement("input");m.type=y.type||"text",m.dataset.key=y.key,m.className="cw-email-field-input",y.auto==="agentName"&&(m.value=Ye().split(" ")[0]),m.addEventListener("input",T),k.appendChild($),k.appendChild(m),F.appendChild(k)}),u.appendChild(F)}function T(){if(!a){I.innerHTML=`
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--cw-color-text-secondary);">
                    <div class="cw-animate-float" style="width: 140px; height: 140px; margin-bottom: 24px;">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="55" fill="#f8f9fa"/><path d="M30 40C30 37.7909 31.7909 36 34 36H86C88.2091 36 90 37.7909 90 40V80C90 82.2091 88.2091 84 86 84H34C31.7909 84 30 82.2091 30 80V40Z" fill="white" stroke="#e8eaed" stroke-width="2"/><path d="M30 40L60 60L90 40" stroke="#4285F4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 80L50 65" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/><path d="M90 80L70 65" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/><circle cx="95" cy="30" r="8" fill="#34A853"/><path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/><rect x="20" y="70" width="12" height="12" rx="3" fill="#4285F4" opacity="0.8"/></svg>
                    </div>
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: var(--cw-color-text-primary); margin-bottom: 8px;">Pronto para come\xE7ar?</div>
                    <div style="font-size: 14px; line-height: 1.6; max-width: 280px; margin: 0 auto;">Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.</div>
                </div>`;return}if(a.isSmartCR){I.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${a.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let C=a.template;(u.querySelectorAll("input")||[]).forEach(y=>{let k=y.dataset.key,$=y.value;if(y.type==="date"&&$){let[N,G,Z]=$.split("-");$=`${G}/${Z}/${N}`}$=$||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${k}</span>`;let m=k.replace(/[.*+?^${}()|[\\\]]/g,"\\$&");C=C.replace(new RegExp(m,"g"),$)}),I.innerHTML=C}return d.addEventListener("input",C=>{n=C.target.value,h.style.display=n?"block":"none",A()}),K.onclick=()=>{let C=I.innerHTML,F=new Blob([C],{type:"text/html"}),y=I.innerText,k=[new ClipboardItem({"text/html":F,"text/plain":new Blob([y],{type:"text/plain"})})];navigator.clipboard.write(k).then(()=>Y("E-mail copiado com sucesso!"),()=>Y("Erro ao copiar e-mail",{error:!0}))},J.onclick=async()=>{if(!a)return;let C=Ze(),F={...a,body:I.innerHTML};try{await go(F),V()}catch{Y("Erro ao preencher e-mail",{error:!0})}finally{C()}},q.onclick=async()=>{if(!a||!a.isSmartCR)return;let C=Ze();try{await ht(a.code),V()}catch{Y("Erro ao aplicar Smart CR",{error:!0})}finally{C()}},V}var So={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]},"EN BAU":{inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function Co(){let t="v3.0.0",e={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",success:"#34A853"},o="csa-local-styles";if(!document.getElementById(o)){let v=document.createElement("style");v.id=o,v.innerHTML=`
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
      `,document.head.appendChild(v)}let a={progressBarContainer:{height:"6px",background:e.borderSubtle,width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 3px 3px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:e.bgApp,scrollBehavior:"smooth"},card:{background:e.bgSurface,border:`1px solid ${e.borderSubtle}`,borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:e.shadowCard},cardTitle:{fontSize:"11px",fontWeight:"700",color:e.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"10px",transition:"all 0.2s ease",color:e.textPrimary,fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{background:"rgba(0, 0, 0, 0.02)"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"50%",border:`2px solid ${e.borderSubtle}`,marginRight:"12px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},i="PT",r="BAU",s=!1,p=document.createElement("div");p.id="call-script-popup",p.classList.add("cw-module-window"),Object.assign(p.style,me,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let l={popup:p,googleLine:null},c=null;function d(){s&&we().then(v=>{let O=p.querySelector("#cw-ctx-name"),B=p.querySelector("#cw-ctx-cid"),D=p.querySelector("#cw-ctx-email");if(O&&(O.textContent=v.advertiserName||"Cliente Desconhecido"),B){let X=v.cid||"---";B.textContent!==X&&(B.textContent=X)}if(D){let X=v.clientEmail||"N\xE3o encontrado";D.textContent!==X&&(D.textContent=X,D.title=X)}})}function h(){we().then(v=>{let O=new Date().toLocaleDateString("pt-BR"),B=p.querySelector("#cw-am-message-area"),D=p.querySelector("#cw-am-review-container"),X=`Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${v.advertiserName||"Cliente"}) em andamento hoje (${O}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${v.advertiserName||"---"}
CID: ${v.cid||"---"}
Case ID: ${v.caseId||"---"}
E-mail: ${v.clientEmail||"---"}`;B&&(B.value=X),D&&(D.style.display="block",D.style.maxHeight="300px",D.style.opacity="1",D.scrollIntoView({behavior:"smooth",block:"end"}))})}function b(){s=!s,ue(s,p,"cw-btn-script"),s?(d(),c||(c=setInterval(d,2e3))):c&&(clearInterval(c),c=null)}let f=pe(p,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",l,()=>{b()});p.appendChild(f);let u=document.createElement("div");Object.assign(u.style,a.contextBanner),u.innerHTML=`
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

      <div id="csa-more-options" style="margin-top: 8px;">
          <button id="csa-toggle-options" style="width: 100%; background: transparent; border: none; padding: 4px 0; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #9AA0A6; transition: color 0.2s;">
              <svg id="csa-options-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.3s ease;"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>

          <div id="csa-options-content" style="max-height: 0; overflow: hidden; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); opacity: 0; padding: 0 4px;">
              <div style="padding: 12px; background: #F8F9FA; border: 1px solid #DADCE0; border-radius: 12px; margin-bottom: 8px;">
                  <button id="cw-pill-message" style="width: 100%; background: #FFFFFF; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                      <div style="background: #E8F0FE; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div style="text-align: left;">
                          <div style="font-size:11px; font-weight:700; color:#3C4043;">Mensagem AM</div>
                          <div style="font-size:10px; color:#5F6368;">Gerar aviso de insucesso</div>
                      </div>
                  </button>

                  <div id="cw-am-review-container" style="display: none; transition: all 0.3s ease; opacity: 0; max-height: 0; overflow: hidden; margin-top: 12px;">
                      <textarea id="cw-am-message-area" style="width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px; font-family: 'Roboto', sans-serif; font-size: 13px; color: #3C4043; outline: none; resize: none; box-sizing: border-box; background: #FFFFFF; line-height: 1.4;"></textarea>
                      <button id="cw-am-copy-final" style="width: 100%; margin-top: 8px; padding: 10px; background: #007AFF; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;">
                          Copiar Mensagem Final
                      </button>
                  </div>
              </div>
          </div>
      </div>
  `;let w=u.querySelector("#csa-toggle-options"),E=u.querySelector("#csa-options-content"),U=u.querySelector("#csa-options-arrow"),M=!1;w.onclick=()=>{M=!M,U.style.transform=M?"rotate(180deg)":"rotate(0deg)",E.style.maxHeight=M?"400px":"0",E.style.opacity=M?"1":"0",E.style.marginTop=M?"8px":"0",H.playClick()};let R=u.querySelector("#cw-pill-message"),K=u.querySelector("#cw-am-copy-final"),J=u.querySelector("#cw-am-message-area");R.onmouseenter=()=>{R.style.borderColor="#007AFF",R.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},R.onmouseleave=()=>{R.style.borderColor="#DADCE0",R.style.boxShadow="0 1px 2px rgba(0,0,0,0.02)"},R.addEventListener("click",()=>{h()}),K.addEventListener("click",()=>{J.value&&(navigator.clipboard.writeText(J.value),Y("Mensagem copiada!"),H.playSuccess(),K.style.background="#34A853",K.textContent="Copiado!",setTimeout(()=>{K.style.background="#1A73E8",K.textContent="Copiar Mensagem Final"},2e3))});let q=(v,O)=>{let B=u.querySelector(v),D=u.querySelector(O);B.onclick=()=>{let X=D.textContent;!X||X.includes("---")||X.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(X),H.playSuccess(),B.classList.add("copied"),setTimeout(()=>B.classList.remove("copied"),1500))}};p.appendChild(u);let I=document.createElement("div");Object.assign(I.style,a.progressBarContainer);let z=document.createElement("div");z.className="csa-progress-fill",Object.assign(z.style,a.progressBarFill),I.appendChild(z),p.appendChild(I);let V=document.createElement("div");V.id="csa-content",Object.assign(V.style,a.contentArea),p.appendChild(V);let _=document.createElement("div");Object.assign(_.style,a.footer);let A=document.createElement("span");A.textContent="by lucaste@",Object.assign(A.style,{fontSize:"10px",color:"#bdc1c6"});let S=document.createElement("button");S.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(S.style,a.resetBtn),S.onmouseenter=()=>S.style.background="#fce8e6",S.onmouseleave=()=>S.style.background="transparent",S.onclick=()=>{S.style.transform="scale(0.9)",setTimeout(()=>S.style.transform="scale(1)",150);for(let v in n)delete n[v];G()},_.appendChild(A),_.appendChild(S),p.appendChild(_);let L=document.createElement("div");Object.assign(L.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"16px"});let x=document.createElement("div");x.className="csa-segmented-control",x.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `;let T=document.createElement("div");T.className="csa-segmented-control",T.innerHTML=`
      <div class="csa-segmented-indicator" id="lang-indicator" style="width: calc(33.33% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-lang="PT">PT</button>
      <button data-lang="ES">ES</button>
      <button data-lang="EN">EN</button>
  `,L.appendChild(x),L.appendChild(T),V.appendChild(L);let C=x.querySelectorAll("button"),F=x.querySelector("#type-indicator");C.forEach((v,O)=>{v.onclick=()=>{C.forEach(B=>B.classList.remove("active")),v.classList.add("active"),F.style.transform=`translateX(${O*(x.offsetWidth/2-2)}px)`,r=v.dataset.type,H.playClick(),G()}});let y=T.querySelectorAll("button"),k=T.querySelector("#lang-indicator");y.forEach((v,O)=>{v.onclick=()=>{y.forEach(B=>B.classList.remove("active")),v.classList.add("active"),k.style.transform=`translateX(${O*(T.offsetWidth/3-1)}px)`,i=v.dataset.lang,H.playClick(),G()}});let $=document.createElement("div");$.id="csa-checklist-area",V.appendChild($);let m=document.createElement("div");Object.assign(m.style,Ae),m.className="no-drag",m.title="Redimensionar",p.appendChild(m),Te(p,m),document.body.appendChild(p),q("#cw-pill-cid","#cw-ctx-cid"),q("#cw-pill-email","#cw-ctx-email");function N(v){return v}function G(){$.innerHTML="";let v=`${i} ${r}`,O=So[v];if(!O){$.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',z.style.width="0%";return}let B=e.primary,D=0,X=0;["inicio","meio","fim"].forEach(j=>{O[j]&&(D+=O[j].length)}),["inicio","meio","fim"].forEach((j,Q)=>{let ne=O[j];if(!ne||ne.length===0)return;let se=document.createElement("div");Object.assign(se.style,a.card);let ie=document.createElement("div");Object.assign(ie.style,a.cardTitle);let oe="";j==="inicio"?i.includes("ES")?oe="Apertura":i.includes("EN")?oe="Opening":oe="Abertura":j==="meio"?i.includes("ES")?oe="Implementaci\xF3n":i.includes("EN")?oe="Implementation":oe="Implementa\xE7\xE3o (Tag Support)":j==="fim"&&(i.includes("ES")?oe="Cierre":i.includes("EN")?oe="Closing":oe="Fechamento"),ie.textContent=oe;let ce=document.createElement("span");ce.style.fontSize="11px",ce.style.opacity="0.7",ce.style.fontWeight="500",ce.style.background="#f1f3f4",ce.style.padding="2px 8px",ce.style.borderRadius="10px",ie.appendChild(ce),se.appendChild(ie);let We=0;ne.forEach((tt,qe)=>{let Me=`${v}-${j}-${qe}`,wt=!!n[Me];wt&&(X++,We++);let ve=document.createElement("div");Object.assign(ve.style,a.itemRow);let le=document.createElement("div");Object.assign(le.style,a.checkbox);let $e=document.createElement("span");$e.className="csa-item-text"+(wt?" completed":""),$e.innerHTML=tt,$e.style.flex="1",wt?(Object.assign(ve.style,a.itemCompleted),le.style.background=B,le.style.borderColor=B,le.style.transform="scale(1)",le.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(le.style.background="transparent",le.style.borderColor=e.borderSubtle,le.style.transform="scale(1)",le.innerHTML=""),ve.onclick=()=>{let Dt=!n[Me];n[Me]=Dt,H.playClick(),Dt?(le.style.transform="scale(1.15)",setTimeout(()=>le.style.transform="scale(1)",150),Object.assign(ve.style,a.itemCompleted),$e.classList.add("completed"),le.style.background=B,le.style.borderColor=B,le.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ve.style.background="transparent",$e.classList.remove("completed"),le.style.background="transparent",le.style.borderColor=e.borderSubtle,le.innerHTML=""),Z(v,O)},ve.onmouseenter=()=>{n[Me]||(ve.style.background="rgba(0, 0, 0, 0.03)",le.style.borderColor=B)},ve.onmouseleave=()=>{n[Me]||(ve.style.background="transparent",le.style.borderColor=e.borderSubtle)},ve.appendChild(le),ve.appendChild($e),se.appendChild(ve)}),We===ne.length&&ne.length>0&&(ce.style.color="#1e8e3e",ce.style.background="#e6f4ea",se.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),ce.textContent=`${We}/${ne.length}`,$.appendChild(se)}),g(D,X)}function Z(v,O){let B=0,D=0;["inicio","meio","fim"].forEach(X=>{let j=O[X]||[];B+=j.length,j.forEach((Q,ne)=>{n[`${v}-${X}-${ne}`]&&D++})}),g(B,D),setTimeout(()=>G(),200)}function g(v,O){let B=v===0?0:O/v*100;z.style.width=`${B}%`,B===100?(z.style.background=e.success,z.classList.remove("csa-progress-fill")):(z.style.background="",z.classList.add("csa-progress-fill"))}return G(),b}var et={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Be={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},yt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},qt="cw_link_history_v4";function Eo(t,e){try{let o=JSON.parse(localStorage.getItem(qt)||"[]");o=o.filter(a=>a.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(qt,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function ra(){try{return JSON.parse(localStorage.getItem(qt)||"[]")}catch{return[]}}function Ao(){let t="v4.6",e="",o=!1,a=null,n=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},r=document.createElement("div");r.id="links-popup",r.classList.add("cw-module-window"),Object.assign(r.style,me,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let p=pe(r,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:r,googleLine:null},()=>_());r.appendChild(p);let l=document.createElement("div");l.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",r.appendChild(l);let c=document.createElement("div");c.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,l.appendChild(c);let d=document.createElement("div");d.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",l.appendChild(d);let h=document.createElement("div");h.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let b=document.createElement("div");b.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let f=document.createElement("div");f.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',f.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let u=document.createElement("input");u.type="text",u.placeholder="Buscar ferramenta ou SOP...",u.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,u.onfocus=()=>{b.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",b.style.border="1px solid #1a73e8"},u.onblur=()=>{b.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",b.style.border="1px solid transparent"},b.appendChild(f),b.appendChild(u),h.appendChild(b),d.appendChild(h);let w=document.createElement("div");w.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",d.appendChild(w);let E=null;function U(){if(E)return;E=document.createElement("div"),E.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let A=document.createElement("div");A.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",A.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let S=document.createElement("button");S.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',S.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",S.onclick=()=>{R(),n=!1,I()},A.appendChild(S),E.appendChild(A);let L=document.createElement("div");L.id="cw-history-list",L.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",E.appendChild(L),d.appendChild(E)}function M(){E||U();let A=E.querySelector("#cw-history-list");A.innerHTML="";let S=ra();S.length===0?A.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':S.forEach(L=>{let x=V(L,Be[L._originalCat],!0,L._originalCat);A.appendChild(x)}),requestAnimationFrame(()=>E.style.transform="translateY(0)")}function R(){E&&(E.style.transform="translateY(100%)")}function K(){c.innerHTML="";let A=J("history","Recentes",Be.history);A.id="cw-sidebar-btn-history",A.onclick=()=>{H.playClick(),n=!n,n?M():R(),I()},c.appendChild(A);let S=document.createElement("div");S.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",c.appendChild(S),Object.keys(et).forEach(L=>{let x=et[L],T=J(L,x.label,Be[L]);T.id=`cw-sidebar-btn-${L}`,T.onclick=()=>{H.playClick(),n&&(n=!1,R()),q(L)},c.appendChild(T)})}function J(A,S,L){let x=document.createElement("div");x.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,x.title=S,x.dataset.key=A;let T=document.createElement("div");T.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",T.innerHTML=L||Be.tasks;let C=document.createElement("div");return C.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",C.textContent=S,x.appendChild(T),x.appendChild(C),x.onmouseenter=()=>{a!==A&&!(A==="history"&&n)&&(x.style.background="#F1F3F4",T.style.transform="scale(1.1)")},x.onmouseleave=()=>{a!==A&&!(A==="history"&&n)&&(x.style.background="transparent",T.style.transform="scale(1)")},x}function q(A){let S=document.getElementById(`cat-anchor-${A}`);S&&(S.scrollIntoView({behavior:"smooth",block:"start"}),a=A,I())}function I(){Object.keys(et).forEach(S=>{let L=c.querySelector(`#cw-sidebar-btn-${S}`);if(L)if(a===S&&!n){let x=yt[S];L.style.background=x.bg,L.style.color=x.color,L.querySelector("div:first-child").style.transform="scale(1.1)"}else L.style.background="transparent",L.style.color=i.textSecondary,L.querySelector("div:first-child").style.transform="scale(1)"});let A=c.querySelector("#cw-sidebar-btn-history");A&&(n?(A.style.background="#3C4043",A.style.color="#FFFFFF"):(A.style.background="transparent",A.style.color=i.textSecondary))}function z(){if(w.innerHTML="",e.trim()!==""){let S=[];if(Object.entries(et).forEach(([x,T])=>{let C=T.links.filter(F=>F.name.toLowerCase().includes(e.toLowerCase())||F.desc.toLowerCase().includes(e.toLowerCase()));S.push(...C.map(F=>({...F,_cat:x})))}),S.length===0){w.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let L=document.createElement("div");L.innerHTML="Resultados da busca",L.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",w.appendChild(L),S.forEach(x=>{let T=V(x,Be[x._cat],!1,x._cat);w.appendChild(T)});return}Object.entries(et).forEach(([S,L])=>{let x=yt[S],T=document.createElement("div"),C=document.createElement("div");C.id=`cat-anchor-${S}`,C.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${x.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,C.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${x.color};"></div>
            ${L.label}
          `,T.appendChild(C);let F=document.createElement("div");F.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",L.links.forEach(y=>{let k=V(y,Be[S],!1,S);F.appendChild(k)}),T.appendChild(F),w.appendChild(T)});let A=document.createElement("div");A.style.height="80px",w.appendChild(A)}function V(A,S,L,x){let T=document.createElement("div"),C=yt[x]||yt.history;T.style.cssText=`
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
          background: ${C.bg}; color: ${C.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,F.innerHTML=S||Be.tasks;let y=F.querySelector("svg");y&&(y.style.width="22px",y.style.height="22px");let k=document.createElement("div");k.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let $=document.createElement("div");$.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,$.textContent=A.name;let m=document.createElement("div");m.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,m.textContent=A.desc,k.appendChild($),k.appendChild(m);let N=document.createElement("div");return N.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',N.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,N.title="Copiar URL",T.onmouseenter=()=>{T.style.transform="translateY(-2px)",T.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",T.style.borderColor="rgba(0,0,0,0.05)",T.style.borderLeft=`4px solid ${C.color}`,N.style.opacity="1",N.style.background="#F1F3F4"},T.onmouseleave=()=>{T.style.transform="translateY(0)",T.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",T.style.border="1px solid transparent",N.style.opacity="0",N.style.background="transparent"},T.onclick=()=>{!L&&x&&Eo(A,x),window.open(A.url,"_blank")},N.onclick=G=>{G.stopPropagation(),H.playClick(),navigator.clipboard.writeText(A.url),!L&&x&&Eo(A,x),Y("Link copiado!")},T.appendChild(F),T.appendChild(k),T.appendChild(N),T}u.addEventListener("input",A=>{e=A.target.value,z()});function _(){o=!o,ue(o,r,"cw-btn-links")}return document.body.appendChild(r),K(),z(),_}var _e=[];function _t(t){_e=t}var sa=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function To(){let t="v4.9",e=!1,o=null,a=null;function n(x){if(!x)return"";try{let T=new Date(x);return isNaN(T.getTime())?String(x):T.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(x)}}if(!document.getElementById("cw-broadcast-hd-css")){let x=document.createElement("style");x.id="cw-broadcast-hd-css",x.innerHTML=`
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
      `,document.head.appendChild(x)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},r={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function s(x){return x?Object.entries(x).map(([T,C])=>`${T.replace(/[A-Z]/g,F=>"-"+F.toLowerCase())}:${C}`).join(";"):""}function p(x){if(!x||typeof x!="string")return"";let T=x;return T=T.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),T=T.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),T=T.replace(/_(.*?)_/g,"<i>$1</i>"),T=T.replace(/\n/g,"<br>"),T=Wt(T),T}let l=document.createElement("div");l.id="broadcast-popup",l.classList.add("cw-module-window"),Object.assign(l.style,me,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let c={popup:l,googleLine:null};function d(){if(e=!e,ue(e,l,"cw-btn-broadcast"),e){let x=document.getElementById("cw-btn-broadcast");x&&x.classList.remove("has-new"),q()}}let h=pe(l,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",c,()=>d()),b=h.querySelector(".cw-header-actions")||h.lastElementChild,f=null;function u(){let x=null;try{x=Ee()}catch{console.warn("TechSol: Auth Pending")}if(x){let T=x.split("@")[0].toLowerCase(),C=dt.includes(T);if(window._cwIsAdmin=C,window._cwCurrentUser=T,C&&b&&!b.querySelector("#cw-admin-btn")){let F=document.createElement("div");F.id="cw-admin-btn",F.className="cw-btn-interactive",F.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(F.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),F.title="Novo Aviso",F.onclick=y=>{y.stopPropagation(),U()},b.insertBefore(F,b.firstChild),f||E(),z()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(u,2e3))}if(b){let x=document.createElement("button");x.textContent="Limpar",x.className="cw-btn-interactive",Object.assign(x.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),x.onclick=T=>{T.stopPropagation(),H.playSuccess();let C=_e.map(F=>F.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(C)),z(),I()},b.insertBefore(x,b.firstChild)}l.appendChild(h);let w=document.createElement("div");w.id="cw-update-status",w.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",l.appendChild(w);function E(){f=document.createElement("div"),f.className="cw-editor-overlay",f.innerHTML=`
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
      `,f.querySelectorAll('input[name="cw-bc-type"]').forEach(F=>{F.addEventListener("change",()=>{f.querySelectorAll(".cw-radio-option").forEach(y=>y.classList.remove("checked")),F.parentElement.classList.add("checked")})}),setTimeout(()=>{let F=f.querySelector(".cw-radio-option.info");F&&F.classList.add("checked")},100);let x=f.querySelector("#cw-bc-cancel"),T=f.querySelector("#cw-bc-close-x"),C=f.querySelector("#cw-bc-send");x.onclick=M,T.onclick=M,C.onclick=R,l.appendChild(f)}function U(x=null){if(!f)return;let T=f.querySelector("#cw-editor-title-label"),C=f.querySelector("#cw-bc-title"),F=f.querySelector("#cw-bc-text"),y=f.querySelector("#cw-bc-send");if(x){a=x.id,T.textContent="Editar Aviso",C.value=x.title||"",F.value=x.text||"",y.textContent="Salvar Altera\xE7\xF5es";let k=x.type||"info",$=f.querySelector(`input[name="cw-bc-type"][value="${k}"]`);$&&$.click()}else{a=null,T.textContent="Novo Aviso",C.value="",F.value="",y.textContent="Publicar";let k=f.querySelector('input[name="cw-bc-type"][value="info"]');k&&k.click()}f.classList.add("active"),setTimeout(()=>C.focus(),300)}function M(){f&&f.classList.remove("active"),a=null}async function R(){let x=f.querySelector("#cw-bc-send"),T=f.querySelector("#cw-bc-title"),C=f.querySelector("#cw-bc-text"),F=f.querySelector('input[name="cw-bc-type"]:checked'),y=F?F.value:"info";if(!T.value.trim()||!C.value.trim()){Y("Preencha todos os campos!",{error:!0});return}x.textContent="Salvando...",x.style.opacity="0.7";let k=!1;a?k=await be.updateBroadcast(a,{title:T.value,text:C.value,type:y}):k=await be.sendBroadcast({title:T.value,text:C.value,type:y,author:window._cwCurrentUser||"admin"}),k?(Y(a?"Atualizado!":"Publicado!"),H.playSuccess(),M(),setTimeout(()=>q(),1500)):(Y("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),x.textContent=a?"Salvar Altera\xE7\xF5es":"Publicar",x.style.opacity="1")}async function K(x){if(await xe("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await be.deleteBroadcast(x)){Y("Aviso removido."),H.playClick();let F=_e.findIndex(y=>y.id===x);F>-1&&_e.splice(F,1),z(),setTimeout(()=>q(),1500)}else Y("Erro ao excluir.",{error:!0})}let J=document.createElement("div");J.className="cw-nice-scroll",Object.assign(J.style,i.feedContainer),l.appendChild(J);async function q(){e&&(w.style.display="block",w.innerHTML="\u{1F504} Sincronizando...");try{let x=await be.fetchData();x&&x.broadcast&&(_t(x.broadcast),I(),e&&(z(),w.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{w.style.display="none"},1500)))}catch{e&&(w.innerHTML="\u26A0\uFE0F Offline")}}function I(){let x=document.getElementById("cw-btn-broadcast");if(!x)return;let T=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(_e.some(F=>!T.includes(F.id))){if(x.classList.add("has-new"),!x.querySelector(".cw-badge")){let F=document.createElement("div");F.className="cw-badge",Object.assign(F.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),x.appendChild(F)}}else{x.classList.remove("has-new");let F=x.querySelector(".cw-badge");F&&F.remove()}}function z(){J.innerHTML="";let x=l.querySelector("#cw-bau-widget");x&&x.remove();let T=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),C=[..._e].sort((m,N)=>{let G=new Date(m.date).getTime()||0;return(new Date(N.date).getTime()||0)-G}),F=C.findIndex(m=>m.title&&m.title.toLowerCase().includes("disponibilidade bau"));if(F!==-1){let m=C[F];C.splice(F,1);let N=document.createElement("div");N.id="cw-bau-widget",Object.assign(N.style,i.bauContainer);let G=[],Z=(m.text||"").split(`
`),g=/\d{1,2}\/\d{1,2}/,v="\u{1F4C5}";if(Z.forEach(j=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(j)?v="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(j)&&(v="\u{1F1EA}\u{1F1F8}");let Q=j.match(g);if(Q){let ne=Q[0],se=v;/🇧🇷|🇵🇹|PT|BR/i.test(j)?se="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(j)&&(se="\u{1F1EA}\u{1F1F8}"),G.some(oe=>oe.flag===se&&oe.date===ne)||G.push({flag:se,date:ne})}}),G.length===0){let j=(m.text||"").match(/\d{1,2}\/\d{1,2}/g);j&&[...new Set(j)].forEach(Q=>G.push({flag:"\u{1F4C5}",date:Q}))}let O="",B='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(B=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${B}
              `),G.length>0?O=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${G.map(Q=>`
                  <div style="${s(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${s(i.bauFlag)}">${Q.flag}</span>
                      <span style="${s(i.bauDate)}">${Q.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${B}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${p(m.text)}</div>
              `:O=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${p(m.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,N.innerHTML=`
              <div style="${s(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${s(i.liveIndicator)}">
                      <div style="${s(i.pulseDot)}"></div>
                      <span style="${s(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${n(m.date)}</div>
              </div>
              ${O}
          `,w.after(N);let D=N.querySelector("#cw-bau-toggle-btn"),X=N.querySelector("#cw-bau-full");if(D&&X&&(D.onclick=()=>{let j=X.style.display==="none";X.style.display=j?"block":"none",D.textContent=j?"Ocultar":"Detalhes"}),window._cwIsAdmin){let j=N.querySelector(".cw-bau-edit");j&&(j.onclick=()=>U(m))}}let y=C.sort((m,N)=>{let G=T.includes(m.id),Z=T.includes(N.id);return G===Z?0:G?1:-1});if(y.length===0&&!F){let m=document.createElement("div");Object.assign(m.style,i.emptyState),m.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,J.appendChild(m)}let k=y.filter(m=>!T.includes(m.id)),$=y.filter(m=>T.includes(m.id));if(k.forEach(m=>J.appendChild(V(m,!1))),$.length>0){let m=document.createElement("div");Object.assign(m.style,i.historyDivider),m.innerHTML=`<span>Hist\xF3rico (${$.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let N=document.createElement("div");Object.assign(N.style,i.historyContainer),$.forEach(Z=>N.appendChild(V(Z,!0)));let G=!1;m.onclick=()=>{H.playClick(),G=!G,N.style.display=G?"flex":"none",m.querySelector("svg").style.transform=G?"rotate(180deg)":"rotate(0deg)"},J.appendChild(m),J.appendChild(N)}}function V(x,T){let C=document.createElement("div");Object.assign(C.style,T?i.cardHistory:i.card);let F=r[x.type]||r.info,y=document.createElement("div");Object.assign(y.style,i.cardHeader);let k=document.createElement("div");Object.assign(k.style,i.typeTag,{color:F.color,background:F.bg}),k.innerHTML=`${F.icon} <span>${x.type}</span>`;let $=document.createElement("span");if(Object.assign($.style,i.dateTag),$.textContent=n(x.date),y.appendChild(k),T)y.appendChild($);else{let g=document.createElement("button");g.className="cw-btn-interactive",Object.assign(g.style,i.dismissBtn),g.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',g.onmouseenter=()=>{g.style.color="#1e8e3e",g.style.background="#e6f4ea",g.style.borderColor="#1e8e3e"},g.onmouseleave=()=>{g.style.color="#5f6368",g.style.background="#fff",g.style.borderColor="rgba(0,0,0,0.1)"},g.onclick=v=>{v.stopPropagation(),H.playClick(),C.style.transform="translateX(20px)",C.style.opacity="0",setTimeout(()=>{let O=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");O.push(x.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(O)),z(),I()},200)},y.appendChild(g)}let m=document.createElement("div");Object.assign(m.style,i.cardContent);let N=document.createElement("div");Object.assign(N.style,i.msgTitle),N.textContent=x.title;let G=document.createElement("div");Object.assign(G.style,i.msgBody),G.innerHTML=p(x.text);let Z=document.createElement("div");if(Object.assign(Z.style,i.msgMeta),Z.innerHTML=`Publicado por <b>${x.author||"Sistema"}</b>`,T||(Z.innerHTML+=` \u2022 ${n(x.date)}`),m.appendChild(N),m.appendChild(G),m.appendChild(Z),C.appendChild(y),C.appendChild(m),window._cwIsAdmin){let g=document.createElement("div");g.className="cw-card-actions";let v=document.createElement("button");v.className="cw-action-btn edit",v.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',v.onclick=()=>U(x);let O=document.createElement("button");O.className="cw-action-btn delete",O.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',O.onclick=()=>K(x.id),g.appendChild(v),g.appendChild(O),C.appendChild(g)}return C}let _=be.getCachedBroadcasts();_.length>0&&(_t(_),z()),setTimeout(u,500),q(),o||(o=setInterval(q,sa));let A=document.createElement("div");Object.assign(A.style,Ae),A.className="no-drag",l.appendChild(A),Te(l,A),document.body.appendChild(l);let S=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),L=_e.some(x=>!S.includes(x.id));return{toggle:d,hasUnread:L}}function ko(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,o.overlay);let n=document.createElement("div");Object.assign(n.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let r=document.createElement("div");Object.assign(r.style,o.title);let s=document.createElement("div");Object.assign(s.style,o.text);let p=document.createElement("div");Object.assign(p.style,o.dotsContainer);let l=document.createElement("div");Object.assign(l.style,o.btnContainer);let c=document.createElement("button");c.textContent="Pular",Object.assign(c.style,o.btn,o.btnSkip),c.onmouseover=()=>c.style.color="#202124",c.onmouseout=()=>c.style.color="#5f6368";let d=document.createElement("button");d.textContent="Pr\xF3ximo",Object.assign(d.style,o.btn,o.btnNext),d.onmouseover=()=>d.style.transform="scale(1.05)",d.onmouseout=()=>d.style.transform="scale(1)",l.appendChild(c),l.appendChild(d),n.appendChild(i),n.appendChild(r),n.appendChild(s),n.appendChild(p),n.appendChild(l),a.appendChild(n),document.body.appendChild(a);function h(f){let u=t[f];i.textContent=u.icon,r.textContent=u.title,s.textContent=u.text,p.innerHTML="",t.forEach((w,E)=>{let U=document.createElement("div");Object.assign(U.style,o.dot),E===f&&Object.assign(U.style,o.dotActive),p.appendChild(U)}),u.isLast?(c.style.display="none",d.textContent="Come\xE7ar \u{1F680}",d.style.width="100%"):(c.style.display="block",d.textContent="Pr\xF3ximo",d.style.width="auto")}function b(){localStorage.setItem("cw_onboarding_seen_v1","true"),a.style.opacity="0",n.style.transform="translateY(20px)",setTimeout(()=>a.remove(),400),H.playSuccess(),Y("Tudo pronto! Use o menu flutuante.")}d.onclick=()=>{H.playClick(),e<t.length-1?(e++,h(e)):b()},c.onclick=async()=>{await xe("Pular o tutorial?")&&b()},h(0),requestAnimationFrame(()=>{a.style.opacity="1",n.style.transform="translateY(0)"})}var Fo={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function Oo(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&la(t)}function la(t){let e=Fo.slides,o=0,a={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,a.overlay);let i=document.createElement("div");Object.assign(i.style,a.card);let r=document.createElement("div");Object.assign(r.style,a.badge),r.textContent=`Atualiza\xE7\xE3o ${t}`;let s=document.createElement("div");Object.assign(s.style,a.icon);let p=document.createElement("div");Object.assign(p.style,a.title);let l=document.createElement("div");Object.assign(l.style,a.text);let c=document.createElement("div");Object.assign(c.style,a.dotsContainer);let d=document.createElement("button");Object.assign(d.style,a.btn),d.onmouseover=()=>d.style.transform="scale(1.02)",d.onmouseout=()=>d.style.transform="scale(1)",i.appendChild(r),i.appendChild(s),i.appendChild(p),i.appendChild(l),i.appendChild(c),i.appendChild(d),n.appendChild(i),document.body.appendChild(n);function h(f){let u=e[f];s.textContent=u.icon,p.textContent=u.title,l.textContent=u.text,c.innerHTML="",e.forEach((w,E)=>{let U=document.createElement("div");Object.assign(U.style,a.dot),E===f&&Object.assign(U.style,a.dotActive),c.appendChild(U)}),f===e.length-1?d.textContent="Entendi, vamos l\xE1! \u{1F44D}":d.textContent="Pr\xF3ximo"}function b(){localStorage.setItem("cw_last_version",t),n.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>n.remove(),400),H.playSuccess(),Y(`TechSol atualizado para ${t}!`)}d.onclick=()=>{H.playClick(),o<e.length-1?(o++,h(o)):b()},h(0),requestAnimationFrame(()=>{n.style.opacity="1",i.style.transform="translateY(0)"})}var Io="cw_timezone_pinned",Mt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],ca=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function Lo(){let t="v2.2 Pro",e=!1,o=null,a="mx",n=JSON.parse(localStorage.getItem(Io)||"[]"),i="",r="all",s=new Date;s.setHours(14,0,0,0);let p={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},l={container:{display:"flex",flexDirection:"column",height:"100%",background:p.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:p.surface,borderBottom:`1px solid ${p.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:p.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:p.primary,borderBottomColor:p.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:p.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:p.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${p.border}`,background:p.surface,color:p.textSub,transition:"all 0.2s"},chipActive:{background:p.primaryBg,color:p.primary,borderColor:p.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:p.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${p.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:p.surface,border:`1px solid ${p.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:p.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},c=document.createElement("div");c.id="timezone-popup",c.classList.add("cw-module-window"),Object.assign(c.style,me,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let h=pe(c,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:c},()=>T());c.appendChild(h);let b=document.createElement("div");Object.assign(b.style,l.container),c.appendChild(b);let f=document.createElement("div");Object.assign(f.style,l.tabHeader);let u=document.createElement("div");u.textContent="Monitoramento",Object.assign(u.style,l.tabBtn,l.tabActive);let w=document.createElement("div");w.textContent="Planejador",Object.assign(w.style,l.tabBtn),f.appendChild(u),f.appendChild(w),b.appendChild(f);let E=document.createElement("div");Object.assign(E.style,l.toolbar);let U=document.createElement("div");Object.assign(U.style,l.searchInputWrapper);let M=document.createElement("div");M.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(M.style,l.searchIcon);let R=document.createElement("input");R.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(R.style,l.searchInput),R.onfocus=()=>{R.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",R.style.borderColor="rgba(26,115,232,0.3)"},R.onblur=()=>{R.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",R.style.borderColor="transparent"},R.oninput=C=>{i=C.target.value.toLowerCase(),A()},U.appendChild(M),U.appendChild(R),E.appendChild(U);let K=document.createElement("div");Object.assign(K.style,l.chipsRow),ca.forEach(C=>{let F=document.createElement("div");F.textContent=C.label,F.id=`tz-filter-${C.id}`,Object.assign(F.style,l.chip),C.id===r&&Object.assign(F.style,l.chipActive),F.onclick=()=>{H.playClick(),r=C.id,Array.from(K.children).forEach(y=>{Object.assign(y.style,l.chip)}),Object.assign(F.style,l.chipActive),A()},K.appendChild(F)}),E.appendChild(K),b.appendChild(E);let J=document.createElement("div");Object.assign(J.style,l.listContainer);let q=document.createElement("style");q.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",b.appendChild(q);let I=document.createElement("div");Object.assign(I.style,l.plannerWrapper,{display:"none"}),b.appendChild(J),b.appendChild(I),u.onclick=()=>z("live"),w.onclick=()=>z("plan");function z(C){H.playClick(),C==="live"?(Object.assign(u.style,l.tabActive),Object.assign(w.style,l.tabBtn),w.style.borderBottomColor="transparent",J.style.display="flex",E.style.display="flex",I.style.display="none",L()):(Object.assign(w.style,l.tabActive),Object.assign(u.style,l.tabBtn),u.style.borderBottomColor="transparent",I.style.display="flex",J.style.display="none",E.style.display="none",x(),S())}function V(C){return C>=9&&C<17?{color:p.success,bg:p.successBg,label:"Aberto",icon:"\u{1F7E2}"}:C>=8&&C<9?{color:p.warning,bg:p.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:C>=17&&C<19?{color:p.warning,bg:p.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:p.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function _(C){n.includes(C)?n=n.filter(F=>F!==C):n.push(C),localStorage.setItem(Io,JSON.stringify(n)),A(),H.playClick()}function A(){J.innerHTML="";let C=new Date,F=Mt.filter(k=>{let $=k.name.toLowerCase().includes(i)||k.label.toLowerCase().includes(i),m=r==="all"||k.region===r;return $&&m});if(F.sort((k,$)=>{let m=n.includes(k.id),N=n.includes($.id);return m&&!N?-1:!m&&N?1:k.name.localeCompare($.name)}),F.length===0){J.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}F.forEach(k=>{let $=n.includes(k.id),m=C.toLocaleTimeString("pt-BR",{timeZone:k.zone,hour:"2-digit",minute:"2-digit"}),N=parseInt(m.split(":")[0]),G=V(N),Z=N<6||N>18,g=document.createElement("div");Object.assign(g.style,l.hubCard),$&&Object.assign(g.style,l.hubCardPinned);let v=$?"\u2605":"\u2606",O=$?"#F9AB00":"#DADCE0";g.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${O}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${v}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${k.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${p.text}; letter-spacing:-0.2px;">${k.name}</div>
                        <div style="font-size:12px; color:${p.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${Z?"\u{1F319}":"\u2600\uFE0F"} ${k.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${p.text}; font-family:'Google Sans', sans-serif;">${m}</div>
                    <div style="font-size:11px; font-weight:600; color:${G.color}; background:${G.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${G.label}
                    </div>
                </div>
            `,g.onmouseenter=()=>{g.style.transform="translateY(-2px)",g.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},g.onmouseleave=()=>{g.style.transform="translateY(0)",g.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let B=g.querySelector(".cw-pin-btn");B.onmouseenter=()=>{B.style.backgroundColor="#F1F3F4"},B.onmouseleave=()=>{B.style.backgroundColor="transparent"},B.onclick=D=>{D.stopPropagation(),_(k.id)},g.onclick=()=>{a=k.id,z("plan")},J.appendChild(g)});let y=document.createElement("div");y.style.height="20px",y.style.width="100%",J.appendChild(y)}function S(){I.innerHTML="";let C=document.createElement("div"),F=document.createElement("label");F.textContent="Onde est\xE1 o cliente?",F.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let y=document.createElement("select");Object.assign(y.style,jt),y.style.padding="14px",[...Mt].sort((ie,oe)=>ie.name.localeCompare(oe.name)).forEach(ie=>{let oe=document.createElement("option");oe.value=ie.id,oe.textContent=`${ie.flag} ${ie.name} (${ie.zone})`,ie.id===a&&(oe.selected=!0),y.appendChild(oe)}),y.onchange=ie=>{a=ie.target.value,se(),H.playClick()},C.appendChild(F),C.appendChild(y),I.appendChild(C);let $=document.createElement("div");Object.assign($.style,l.timeComparisonRow);let m=document.createElement("div");Object.assign(m.style,l.timeCard),m.style.backgroundColor="#F8FAFF",m.style.borderColor="#E8F0FE",m.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let N=document.createElement("div");Object.assign(N.style,l.timeCard),N.style.backgroundColor="#FFF8E1",N.style.borderColor="#FEF7E0",N.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,$.appendChild(m),$.appendChild(N),I.appendChild($);let G=document.createElement("div");G.id="cw-planner-status",Object.assign(G.style,l.statusBadge),I.appendChild(G);let Z=document.createElement("div");Object.assign(Z.style,{padding:"0 4px",marginTop:"12px"});let g=document.createElement("div");g.textContent="Arraste para simular o hor\xE1rio:",g.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let v=document.createElement("div");Object.assign(v.style,l.timelineContainer);let O=document.createElement("div");Object.assign(O.style,l.timelineTrack);let B=document.createElement("div");Object.assign(B.style,l.dayZone),O.appendChild(B);let D=document.createElement("input");D.type="range",D.min="0",D.max="1439",D.step="15",D.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let X=document.createElement("div");X.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",X.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",v.appendChild(O),v.appendChild(D),v.appendChild(X),Z.appendChild(g),Z.appendChild(v),I.appendChild(Z);let j=m.querySelector("#cw-time-input-br"),Q=N.querySelector("#cw-time-display-client"),ne=N.querySelector("#cw-client-label");function se(){let ie=Mt.find(Me=>Me.id===a);ne.textContent=`${ie.flag} ${ie.label} (${ie.zone})`;let oe=s.getHours(),ce=s.getMinutes(),We=`${String(oe).padStart(2,"0")}:${String(ce).padStart(2,"0")}`;j.value=We,D.value=oe*60+ce;let tt=s.toLocaleTimeString("pt-BR",{timeZone:ie.zone,hour:"2-digit",minute:"2-digit"});Q.textContent=tt;let qe=parseInt(tt.split(":")[0]);qe>=9&&qe<17?(G.style.background=p.successBg,G.style.color=p.success,G.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):qe>=8&&qe<9||qe>=17&&qe<19?(G.style.background=p.warningBg,G.style.color=p.warning,G.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(G.style.background=p.errorBg,G.style.color=p.error,G.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}D.oninput=ie=>{let oe=parseInt(ie.target.value);s.setHours(Math.floor(oe/60)),s.setMinutes(oe%60),se()},j.oninput=ie=>{let[oe,ce]=ie.target.value.split(":");oe&&ce&&(s.setHours(parseInt(oe)),s.setMinutes(parseInt(ce)),se())},se()}function L(){A(),o||(o=setInterval(A,6e4))}function x(){o&&(clearInterval(o),o=null)}function T(){e=!e,ue(e,c,"cw-btn-timezone"),e?z("live"):x()}return document.body.appendChild(c),T}function qo(){let t="v1.1",e=!1,o="general",a=null,n=null;if(!document.getElementById("cw-lib-styles")){let S=document.createElement("style");S.id="cw-lib-styles",S.innerHTML=`
            .cw-lib-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .cw-lib-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; border-color: rgba(0, 122, 255, 0.3) !important; }
            .cw-tactile { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.92) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #5F6368; }
            .cw-toolbar-btn:hover { background: #F1F3F4; color: #007AFF; border-color: #DADCE0; }
            .cw-toolbar-btn.active { background: #E8F0FE; color: #007AFF; border-color: #007AFF; }
        `,document.head.appendChild(S)}let i={bg:"#F0F2F5",surface:"#FFFFFF",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",text:"#1C1C1E",textSub:"#8E8E93",border:"rgba(0, 0, 0, 0.08)",danger:"#FF3B30"},r={container:{display:"flex",flexDirection:"column",height:"100%",background:i.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"12px 16px 0 16px",background:i.surface,borderBottom:`1px solid ${i.border}`},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:i.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",userSelect:"none"},tabActive:{color:i.primary,borderBottomColor:i.primary,fontWeight:"600"},listContainer:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"},emptyState:{padding:"40px 20px",textAlign:"center",color:"#BDC1C6",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},card:{background:i.surface,borderRadius:"16px",padding:"16px",border:`1px solid ${i.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative",overflow:"hidden"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},cardTitle:{fontSize:"14px",fontWeight:"600",color:i.text},cardPreview:{fontSize:"12px",color:i.textSub,lineHeight:"1.5",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"12px",paddingTop:"12px",borderTop:`1px dashed ${i.border}`},actionBtn:{padding:"6px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",cursor:"pointer",border:"none",background:"transparent",transition:"background 0.2s"},fab:{position:"absolute",bottom:"24px",right:"24px",width:"56px",height:"56px",borderRadius:"16px",background:i.primary,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"transform 0.2s",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.85)",backdropFilter:"blur(25px) saturate(180%)",webkitBackdropFilter:"blur(25px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"16px 24px",background:i.surface,borderBottom:`1px solid ${i.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"24px",overflowY:"auto"},inputGroup:{marginBottom:"20px"},label:{display:"block",fontSize:"12px",fontWeight:"700",color:i.textSub,marginBottom:"8px",textTransform:"uppercase"},input:{width:"100%",padding:"12px",borderRadius:"8px",border:`1px solid ${i.border}`,fontSize:"14px",fontFamily:"inherit",outline:"none",background:i.surface,boxSizing:"border-box"}},s=document.createElement("div");s.id="library-popup",s.classList.add("cw-module-window"),Object.assign(s.style,me,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let l=pe(s,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:s},()=>A());s.appendChild(l);let c=document.createElement("div");Object.assign(c.style,r.container),s.appendChild(c);let d=document.createElement("div");Object.assign(d.style,r.tabHeader);let h=[{id:"general",label:"Geral",icon:"\u{1F4CB}"},{id:"note",label:"Notas",icon:"\u{1F4DD}"},{id:"email",label:"Emails",icon:"\u{1F4E7}"}];h.forEach(S=>{let L=document.createElement("div");L.innerHTML=`${S.icon} ${S.label}`,L.id=`lib-tab-${S.id}`,Object.assign(L.style,r.tabBtn),S.id===o&&Object.assign(L.style,r.tabActive),L.onmouseenter=()=>H.playHover(),L.onclick=()=>K(S.id),d.appendChild(L)}),c.appendChild(d);let b=document.createElement("div");Object.assign(b.style,r.listContainer),c.appendChild(b);let f=document.createElement("div");f.className="cw-fab cw-tactile",Object.assign(f.style,r.fab),f.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',f.onmouseenter=()=>f.style.transform="scale(1.1)",f.onmouseleave=()=>f.style.transform="scale(1)",f.onclick=()=>q(),c.appendChild(f),a=document.createElement("div"),Object.assign(a.style,r.editorOverlay);let u=document.createElement("div");Object.assign(u.style,r.editorHeader),u.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let w=document.createElement("button");w.innerHTML="Cancelar",w.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",w.onclick=I,u.appendChild(w),a.appendChild(u);let E=document.createElement("div");Object.assign(E.style,r.editorBody),a.appendChild(E);let U=document.createElement("div");U.style.cssText="padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";let M=document.createElement("button");M.textContent="Salvar",M.style.cssText="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);",M.onclick=z,U.appendChild(M),a.appendChild(U),c.appendChild(a);let R=document.createElement("div");Object.assign(R.style,Ae),R.className="no-drag",s.appendChild(R),Te(s,R),document.body.appendChild(s);function K(S){H.playClick(),o=S,h.forEach(L=>{let x=document.getElementById(`lib-tab-${L.id}`);L.id===S?Object.assign(x.style,r.tabActive):Object.assign(x.style,r.tabBtn)}),J()}function J(){b.innerHTML="";let S=he.getSnippets(o);if(S.length===0){b.innerHTML=`
                <div style="${_(r.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;return}S.forEach(L=>{let x=document.createElement("div");x.className="cw-lib-card",Object.assign(x.style,r.card),L.isCode&&(x.style.borderLeft=`4px solid ${i.primary}`,x.style.background="rgba(0, 122, 255, 0.02)");let T=L.content;if(L.isRich){let C=document.createElement("div");C.innerHTML=L.content;let F=C.querySelector("img");T=C.innerText.substring(0,150)+(C.innerText.length>150?"...":""),F&&(T="\u{1F5BC}\uFE0F [Cont\xE9m Imagens] "+T)}x.innerHTML=`
                <div style="${_(r.cardHeader)}">
                    <div style="${_(r.cardTitle)}">${L.title}</div>
                    <div style="display:flex; gap:4px;">
                        ${L.isCode?'<span style="font-size:10px; background:#F1F3F4; color:#5F6368; padding:2px 6px; border-radius:4px; font-family:monospace;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>':""}
                    </div>
                </div>
                <div style="${_(r.cardPreview)}; ${L.isCode?"font-family:'Roboto Mono', monospace; font-size:11px;":""}">${T}</div>
                <div style="${_(r.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${_(r.actionBtn)}; color:#007AFF; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${_(r.actionBtn)}; color:#8E8E93; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${_(r.actionBtn)}; color:#FF3B30; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                    </button>
                </div>
            `,x.onmouseenter=()=>{H.playHover()},x.querySelector(".cw-act-copy").onclick=C=>{if(C.stopPropagation(),H.playClick(),L.isRich){let F=new Blob([L.content],{type:"text/html"}),y=document.createElement("div");y.style.whiteSpace="pre-wrap",y.innerHTML=L.content;let k=new Blob([y.innerText],{type:"text/plain"}),$=[new ClipboardItem({"text/html":F,"text/plain":k})];navigator.clipboard.write($)}else navigator.clipboard.writeText(L.content);Y("Copiado!")},x.querySelector(".cw-act-edit").onclick=C=>{C.stopPropagation(),H.playClick(),q(L)},x.querySelector(".cw-act-del").onclick=async C=>{C.stopPropagation(),H.playClick(),await xe("Excluir este item?")&&(he.delete(L.id),J(),Y("Item exclu\xEDdo."))},b.appendChild(x)})}function q(S=null){n=S?S.id:null,E.innerHTML="",E.appendChild(V("title","T\xEDtulo / Nome",S?S.title:"")),o==="email"&&E.appendChild(V("subject","Assunto do Email",S?S.subject:""));let L="Conte\xFAdo";o==="email"&&(L="Corpo do Email (HTML)"),o==="note"&&(L="Texto da Nota (Reason)"),E.appendChild(V("content",L,S?S.content:"",{isRich:!0,isCode:S?S.isCode:!1})),u.querySelector("span").textContent=S?"Editar Item":"Novo Item",a.style.transform="translateY(0)",setTimeout(()=>{let x=E.querySelector("input");x&&x.focus()},300)}function I(){a.style.transform="translateY(100%)",setTimeout(()=>n=null,300)}async function z(){let S=E.querySelector("#cw-inp-title"),L=E.querySelector("#cw-inp-content"),x=S.value.trim(),T=L.contentEditable==="true"?L.innerHTML:L.value.trim(),C=L.getAttribute("data-is-code")==="true";if(!x||!T||T==="<br>"){Y("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let F={id:n,type:o,title:x,content:T,isCode:C,isRich:L.contentEditable==="true"};if(o==="email"){let y=E.querySelector("#cw-inp-subject").value.trim();if(!y){Y("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}F.subject=y}M.textContent="Salvando...",await he.save(F),M.textContent="Salvar",I(),J(),Y("Salvo com sucesso!"),H.playSuccess()}function V(S,L,x,T={}){let C=document.createElement("div");Object.assign(C.style,r.inputGroup);let F=document.createElement("label");F.textContent=L,Object.assign(F.style,r.label);let y;if(T.isRich){let k=document.createElement("div");k.style.cssText="display:flex; gap:6px; margin-bottom:12px; background:rgba(241, 243, 244, 0.8); padding:6px; border-radius:12px; border:1px solid #DADCE0; backdrop-filter: blur(10px);",k.innerHTML=`
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
            `,y=document.createElement("div"),y.contentEditable="true",Object.assign(y.style,r.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),y.innerHTML=x||"",T.isCode&&(y.style.fontFamily="'Roboto Mono', monospace",y.style.backgroundColor="#F8F9FA",y.setAttribute("data-is-code","true")),k.querySelectorAll(".cw-toolbar-btn").forEach($=>{$.onmouseenter=()=>H.playHover(),$.onmousedown=()=>H.playClick()}),k.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),y.focus()},k.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),y.focus()},k.querySelector(".cw-tb-code").onclick=$=>{let N=!(y.getAttribute("data-is-code")==="true");y.setAttribute("data-is-code",N),y.style.fontFamily=N?"'Roboto Mono', monospace":"inherit",y.style.backgroundColor=N?"rgba(0, 122, 255, 0.03)":i.surface,N?$.currentTarget.classList.add("active"):$.currentTarget.classList.remove("active"),y.focus()},k.querySelector(".cw-tb-img").onclick=async()=>{let $=await Kt("Cole a URL da imagem:");$&&(document.execCommand("insertImage",!1,$),y.querySelectorAll("img").forEach(N=>{N.style.maxWidth="100%",N.style.borderRadius="8px"}))},y.onpaste=$=>{let m=($.clipboardData||$.originalEvent.clipboardData).items;for(let N of m)if(N.kind==="file"&&N.type.startsWith("image/")){$.preventDefault();let G=N.getAsFile(),Z=new FileReader;Z.onload=g=>{let v=`<img src="${g.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,v)},Z.readAsDataURL(G)}},C.appendChild(F),C.appendChild(k)}else y=document.createElement("input"),y.type="text",Object.assign(y.style,r.input),y.value=x||"",C.appendChild(F);return y.id=`cw-inp-${S}`,y.onfocus=()=>{y.style.borderColor=i.primary,y.style.boxShadow=`0 0 0 2px ${i.primaryBg}`},y.onblur=()=>{y.style.borderColor=i.border,y.style.boxShadow="none"},C.appendChild(y),C}function _(S){return Object.entries(S).map(([L,x])=>`${L.replace(/[A-Z]/g,T=>"-"+T.toLowerCase())}:${x}`).join(";")}function A(){e=!e,ue(e,s,"cw-btn-library"),e&&J()}return A}function _o(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},a="cw-configs-styles";if(!document.getElementById(a)){let h=document.createElement("style");h.id=a,h.innerHTML=`
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
        `,document.head.appendChild(h)}let n=document.createElement("div");n.id="configs-popup",n.classList.add("cw-module-window"),Object.assign(n.style,me,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r=pe(n,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:n},()=>d());n.appendChild(r);let s=document.createElement("div");s.className="cw-configs-container",n.appendChild(s);let p=document.createElement("div");p.className="cw-configs-section",p.innerHTML=`
        <div class="cw-configs-section-title">Prefer\xEAncias de Som</div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label">Efeitos Sonoros</div>
                    <div class="cw-configs-desc">Ativar ou desativar sons de interface.</div>
                </div>
                <input type="checkbox" id="cw-config-sound-toggle" ${H.isMuted()?"":"checked"} style="cursor:pointer; width:20px; height:20px;">
            </div>
        </div>
    `;let l=p.querySelector("#cw-config-sound-toggle");l.onchange=h=>{H.setMuted(!h.target.checked),h.target.checked&&H.playClick()},s.appendChild(p);let c=document.createElement("div");c.className="cw-configs-section",c.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugest\xF5es</a>
            </div>
        </div>
    `,s.appendChild(c);function d(){e=!e,ue(e,n,"cw-btn-configs"),e&&H.playClick()}return document.body.appendChild(n),d}var te={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"},Pe={small:"8px",medium:"12px",large:"16px",pill:"100px"},da={deep:"0 12px 40px rgba(0,0,0,0.12)",subtle:"0 4px 12px rgba(0,0,0,0.05)"},Nt="cubic-bezier(0.4, 0, 0.2, 1)",vt=`all 0.3s ${Nt}`,Mo=()=>{if(document.getElementById("bau-form-global-styles"))return;let t=document.createElement("style");t.id="bau-form-global-styles",t.innerHTML=`
    /* --- KEYFRAMES PARA ANIMA\xC7\xC3O --- */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes gemini-gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    /* --- BASE & UTILITIES --- */
    .input-error {
      border-color: ${te.red} !important;
      box-shadow: 0 0 0 3px rgba(217, 48, 37, 0.15) !important;
    }

    .bau-popup {
      display: flex !important; flex-direction: column !important;
      width: 520px !important; max-height: 85vh !important;
      background: ${te.surface} !important;
      backdrop-filter: blur(12px) !important; -webkit-backdrop-filter: blur(12px) !important;
      border-radius: ${Pe.large} !important; box-shadow: ${da.deep} !important;
      border: 1px solid rgba(255, 255, 255, 0.4) !important;
      overflow: hidden !important; position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%); z-index: 10000;
      font-family: 'Google Sans', Roboto, sans-serif;
    }

    /* --- PROGRESS INDICATOR --- */
    .bau-progress-indicator { /* ... sem altera\xE7\xF5es ... */
      display: flex; justify-content: space-around; padding: 20px 32px;
      border-bottom: 1px solid ${te.border};
      background: rgba(248, 249, 250, 0.7);
    }
    .bau-progress-step {
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: 50%;
      background-color: #F1F3F4; color: ${te.textSecondary};
      font-weight: 700; font-size: 14px; border: 2px solid #F1F3F4;
      transition: ${vt}; position: relative;
    }
    .bau-progress-step.active { background-color: ${te.blueLight}; color: ${te.blue}; border-color: ${te.blue}; transform: scale(1.1); }
    .bau-progress-step.completed { background-color: ${te.greenLight}; color: ${te.green}; border-color: ${te.green}; }
    
    /* --- CONTENT & STEPS --- */
    .bau-content { padding: 32px; overflow-y: auto; flex-grow: 1; }
    .bau-step { display: none; animation: fadeIn 0.5s ${Nt}; opacity: 0; }
    .bau-step.active { display: block; opacity: 1; }

    .bau-card {
      background: ${te.white}; border-radius: ${Pe.medium};
      padding: 24px; border: 1px solid ${te.border};
      margin-bottom: 24px;
    }

    /* --- CARD DE CONTEXTO (NOVO ESTILO GEMINI) --- */
    .bau-context-card {
        color: #fff;
        border: none;
        background: linear-gradient(135deg, #0d47a1, #1976d2, #1565c0, #1a237e);
        background-size: 400% 400%;
        animation: gemini-gradient 10s ease infinite;
        box-shadow: 0 10px 30px rgba(13, 71, 161, 0.2);
    }
    .bau-context-card .bau-title {
        color: #fff !important;
        font-weight: 800 !important;
        font-size: 20px !important;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    .bau-context-card .bau-subtitle, .bau-context-card b {
        color: #fff !important;
        font-weight: 700 !important;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }
     .bau-context-card #bau-all-data {
        color: #E0F5F5 !important;
        border-top-color: rgba(255, 255, 255, 0.3) !important;
        padding-top: 20px !important;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .bau-inline-field {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 6px 10px;
        border-radius: 8px;
        transition: background 0.2s ease;
        cursor: pointer;
    }
    .bau-inline-field:hover {
        background: rgba(255, 255, 255, 0.15);
    }
    .bau-inline-field b {
        min-width: 100px;
        font-size: 12px;
        opacity: 0.9;
    }
    .bau-inline-input {
        background: transparent;
        border: none;
        border-bottom: 1.5px dashed rgba(255, 255, 255, 0.4);
        color: #fff;
        font-size: 13px;
        font-weight: 600;
        padding: 4px 0;
        width: 100%;
        outline: none;
        transition: border-bottom-color 0.2s;
    }
    .bau-inline-input:focus {
        border-bottom-style: solid;
        border-bottom-color: #fff;
    }
    .bau-inline-input::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
    .bau-context-card .bau-header-banner {
        color: #fff; 
        background: transparent !important;
        border-bottom: none !important;
        margin-bottom: 8px;
        padding: 0;
        font-weight: 700;
    }

    /* --- CARD DE FALLBACK (ESTILO SUAVIZADO) --- */
    .bau-fallback-card {
        background-color: ${te.yellowLight};
        border: 1.5px dashed #FBC02D; /* Borda tracejada para diferenciar */
        padding: 16px;
    }
    .bau-fallback-header {
        color: #BF360C; /* Tom de laranja mais escuro para o texto */
        font-weight: 700;
        font-size: 14px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    /* --- FORM ELEMENTS --- */
    .bau-label {
      display: block;
      font-size: 13px;
      font-weight: 700;
      color: ${te.textSecondary};
      margin-bottom: 8px;
      margin-top: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .bau-input, .bau-select, .bau-textarea {
      width: 100%;
      padding: 12px 16px;
      border-radius: ${Pe.medium};
      border: 1.5px solid ${te.border};
      background-color: #F8F9FA;
      font-size: 14px;
      color: ${te.textPrimary};
      transition: ${vt};
      box-sizing: border-box;
      outline: none;
      font-family: inherit;
    }
    .bau-input:focus, .bau-select:focus, .bau-textarea:focus {
      border-color: ${te.blue};
      background-color: #fff;
      box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.1);
    }
    .bau-select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235F6368' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 16px;
      padding-right: 40px;
      cursor: pointer;
    }
    .bau-chips-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }
    .bau-chip {
      padding: 8px 16px;
      border-radius: ${Pe.pill};
      background-color: ${te.blueLight};
      color: ${te.blue};
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: ${vt};
      border: 1px solid transparent;
    }
    .bau-chip:hover {
      background-color: #d2e3fc;
    }
    .bau-chip.active {
      background-color: ${te.blue};
      color: #fff;
    }

    /* --- SE\xC7\xC3O DE TASKS (MULTI-SELECT) --- */
    .bau-tasks-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-top: 12px;
    }
    .bau-task-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        background: #F8F9FA;
        border: 1px solid ${te.border};
        border-radius: ${Pe.medium};
        cursor: pointer;
        transition: all 0.2s ${Nt};
    }
    .bau-task-item:hover {
        background: #fff;
        border-color: ${te.blue};
    }
    .bau-task-item.active {
        background: ${te.blueLight};
        border-color: ${te.blue};
        color: ${te.blue};
    }
    .bau-task-item input {
        display: none;
    }
    .bau-task-item span {
        font-size: 13px;
        font-weight: 600;
    }

    /* --- CONFIRMATION SCREEN --- */
    .bau-confirm-row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #f0f0f0;
        font-size: 14px;
    }
    .bau-confirm-label {
        color: ${te.textSecondary};
        font-weight: 600;
    }
    .bau-confirm-value {
        color: ${te.textPrimary};
        font-weight: 700;
        text-align: right;
        max-width: 60%;
    }

    /* --- SE\xC7\xC3O DE DISPONIBILIDADE (NOVO LAYOUT) --- */
    .bau-availability-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 4px;
    }
    .bau-availability-hint {
        margin-top: 16px;
        padding: 12px;
        font-size: 12px;
        font-weight: 500;
        color: ${te.textSecondary};
        background-color: #F8F9FA;
        border-radius: ${Pe.medium};
        line-height: 1.6;
    }

    /* --- FOOTER & NAVIGATION BUTTONS --- */
    .bau-footer {
      display: flex;
      justify-content: flex-end;
      padding: 24px 32px;
      gap: 12px;
      border-top: 1px solid ${te.border};
      background: #F8F9FA;
    }
    .bau-btn-primary, .bau-btn-secondary, .bau-btn-submit {
      padding: 12px 24px;
      border-radius: ${Pe.pill};
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: ${vt};
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      outline: none;
    }
    .bau-btn-primary {
      background-color: ${te.blue};
      color: #fff;
      box-shadow: 0 4px 12px rgba(26, 115, 232, 0.2);
    }
    .bau-btn-primary:hover {
      background-color: #1765cc;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(26, 115, 232, 0.3);
    }
    .bau-btn-primary:active {
      transform: translateY(0);
    }
    .bau-btn-secondary {
      background-color: transparent;
      color: ${te.textSecondary};
      border: 1px solid ${te.border};
    }
    .bau-btn-secondary:hover {
      background-color: #E8EAED;
      color: ${te.textPrimary};
    }
    .bau-btn-submit {
      background-color: ${te.green};
      color: #fff;
      box-shadow: 0 4px 12px rgba(30, 142, 62, 0.2);
    }
    .bau-btn-submit:hover {
      background-color: #1a7d36;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(30, 142, 62, 0.3);
    }
    .bau-btn-submit:active {
      transform: translateY(0);
    }

    /* --- GRIDS --- */
    .bau-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  `,document.head.appendChild(t)};function No(){Mo();let t=!1,e=null,o=1,a=4,n=document.createElement("div");n.id="bau-form-popup",n.className="bau-popup cw-module-window",n.style.display="none";let r=pe(n,"BAU Form","v1.2.0","Solicite a abertura de casos BAU em um fluxo guiado.",{googleLine:null},()=>F());n.appendChild(r);let s=document.createElement("div");s.className="bau-progress-indicator",n.appendChild(s);let p=document.createElement("div");p.className="bau-content",n.appendChild(p);let l=document.createElement("form");p.appendChild(l);let c=document.createElement("div");c.className="bau-step active",c.id="bau-step-1";let d=document.createElement("div");d.className="bau-card bau-context-card";let h=document.createElement("div");h.className="bau-header-banner",d.appendChild(h);let b=document.createElement("div");b.innerHTML=`
        <div class="bau-inline-field" title="Clique para editar" style="margin-bottom: 4px;">
            <input type="text" id="bau-adv-name-input" name="advName" class="bau-title bau-inline-input" style="border-bottom: none; font-size: 20px;" placeholder="Nome do Anunciante">
        </div>
        <div style="display: flex; align-items: center; gap: 8px; margin-left: 10px; opacity: 0.9;">
            <div class="bau-inline-field" title="Clique para editar" style="padding: 2px 6px;">
                 <span style="color: #fff; font-size: 13px; font-weight: 700;">CID:</span>
                 <input type="text" id="bau-cid-input" name="cid" class="bau-inline-input" style="width: 120px; font-size: 13px; border-bottom-color: rgba(255,255,255,0.3);" placeholder="CID">
            </div>
            <span style="color: #fff; opacity: 0.5;">\u2022</span>
            <div class="bau-inline-field" title="Clique para editar" style="padding: 2px 6px;">
                 <span style="color: #fff; font-size: 13px; font-weight: 700;">AM:</span>
                 <input type="text" id="bau-am-name-input" name="amName" class="bau-inline-input" style="width: 150px; font-size: 13px; border-bottom-color: rgba(255,255,255,0.3);" placeholder="Account Manager">
            </div>
        </div>
        <div id="bau-all-data"></div>
    `,d.appendChild(b),c.appendChild(d),l.appendChild(c);let f=document.createElement("div");f.className="bau-step",f.id="bau-step-2";let u=document.createElement("div");u.className="bau-card",u.innerHTML=`
        <label class="bau-label">Motivo da Abertura</label>
        <select name="reason" required class="bau-select">
            <option value="">Selecione...</option>
            <option value="Nova Implementa\xE7\xE3o">Nova Implementa\xE7\xE3o</option>
            <option value="Corre\xE7\xE3o de Tag">Corre\xE7\xE3o de Tag</option>
            <option value="Upgrade / Migra\xE7\xE3o">Upgrade / Migra\xE7\xE3o</option>
            <option value="Troubleshooting">Troubleshooting</option>
        </select>

        <label class="bau-label" style="margin-top: 24px;">Tasks para BAU (Selecione 1 ou mais)</label>
        <div class="bau-tasks-grid" id="bau-tasks-container">
            ${["Setup GTM","Google Ads Conversion","GA4 Events","Enhanced Conversions","Offline Conversions","Consent Mode","Troubleshooting","Outros"].map(y=>`
                <label class="bau-task-item">
                    <input type="checkbox" name="taskType" value="${y}">
                    <span>${y}</span>
                </label>
            `).join("")}
        </div>
    `,u.querySelectorAll(".bau-task-item").forEach(y=>{let k=y.querySelector("input");y.onclick=$=>{$.target!==k&&(k.checked=!k.checked),y.classList.toggle("active",k.checked),H.playClick()}}),f.appendChild(u),l.appendChild(f);let w=document.createElement("div");w.className="bau-step",w.id="bau-step-3";let E=document.createElement("div");E.className="bau-card";let U=document.createElement("label");U.className="bau-label",U.textContent="Justificativa / Descri\xE7\xE3o",E.appendChild(U);let M=document.createElement("textarea");M.name="description",M.required=!0,M.className="bau-textarea",M.placeholder="Descreva detalhadamente o que precisa ser feito...",M.style.minHeight="120px",E.appendChild(M);let R=document.createElement("label");R.className="bau-label",R.textContent="Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",R.style.marginTop="20px",E.appendChild(R);let K=document.createElement("div");K.className="bau-availability-container";for(let y=1;y<=3;y++){let k=document.createElement("input");k.type="datetime-local",k.name=`availability_${y}`,k.required=y===1,k.className="bau-input",K.appendChild(k)}E.appendChild(K);let J=document.createElement("div");J.className="bau-availability-hint",E.appendChild(J),w.appendChild(E),l.appendChild(w);let q=document.createElement("div");q.className="bau-step",q.id="bau-step-4";let I=document.createElement("div");I.className="bau-card",I.innerHTML=`
        <h3 style="margin-top: 0; color: ${te.blue}; font-size: 16px; margin-bottom: 20px;">Confirme os dados antes de enviar</h3>
        <div id="bau-confirmation-details"></div>
    `,q.appendChild(I),l.appendChild(q);let z=document.createElement("div");z.className="bau-footer";let V=document.createElement("button");V.type="button",V.className="bau-btn-secondary",V.textContent="Voltar",z.appendChild(V);let _=document.createElement("button");_.type="button",_.className="bau-btn-primary",_.textContent="Pr\xF3ximo",z.appendChild(_);let A=document.createElement("button");A.type="submit",A.className="bau-btn-submit",A.innerHTML="<span>\u{1F4DD}</span> Enviar para o TL",A.style.display="none",z.appendChild(A),n.appendChild(z),document.body.appendChild(n);function S(){l.querySelectorAll(".bau-step").forEach((y,k)=>{y.classList.toggle("active",k+1===o)}),s.innerHTML="";for(let y=1;y<=a;y++){let k=document.createElement("div");k.className=`bau-progress-step ${y===o?"active":y<o?"completed":""}`,k.textContent=y,s.appendChild(k)}V.style.display=o>1?"inline-block":"none",_.style.display=o<a?"inline-block":"none",A.style.display=o===a?"inline-block":"none",o===4&&L()}function L(){let y=new FormData(l),k=Object.fromEntries(y.entries()),$=y.getAll("taskType"),m=[k.availability_1,k.availability_2,k.availability_3].filter(G=>G&&G.trim()!=="").map(G=>G.replace("T"," ")).join(" | "),N=document.getElementById("bau-confirmation-details");N.innerHTML=`
            <div class="bau-confirm-row"><span class="bau-confirm-label">Anunciante:</span><span class="bau-confirm-value">${k.advName}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">CID:</span><span class="bau-confirm-value">${k.cid}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">AM:</span><span class="bau-confirm-value">${k.amName}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Email:</span><span class="bau-confirm-value">${k.email||"N/A"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Programa:</span><span class="bau-confirm-value">${k.salesProgram||"N/A"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Speakeasy ID:</span><span class="bau-confirm-value">${k.seId||"N/A"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Motivo:</span><span class="bau-confirm-value">${k.reason}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Tasks:</span><span class="bau-confirm-value">${$.join(", ")}</span></div>
            <div class="bau-confirm-row" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                <span class="bau-confirm-label">Descri\xE7\xE3o:</span>
                <div style="font-size: 13px; color: ${te.textPrimary}; background: #f8f9fa; padding: 12px; border-radius: 8px; width: 100%; box-sizing: border-box; white-space: pre-wrap;">${k.description}</div>
            </div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Disponibilidade:</span><span class="bau-confirm-value">${m||"N/A"}</span></div>
        `}function x(y){if(y===2){let $=l.querySelector('select[name="reason"]').value,m=Array.from(l.querySelectorAll('input[name="taskType"]:checked'));return $?m.length===0?(Y("Erro: Selecione pelo menos uma Task.","error"),!1):!0:(Y("Erro: O Motivo da Abertura \xE9 obrigat\xF3rio.","error"),!1)}let k=l.querySelectorAll(`#bau-step-${y} [required]`);for(let $ of k)if(!$.value.trim()){let m="",N=$.closest("div").querySelector(".bau-label");if(N)m=N.textContent;else{let G=$.closest(".bau-inline-field")?.querySelector("span");m=G?G.textContent:$.placeholder||$.name}return Y(`Erro: O campo '${m.replace(":","")}' \xE9 obrigat\xF3rio.`,"error"),$.classList.add("input-error"),setTimeout(()=>$.classList.remove("input-error"),3e3),!1}return!0}_.onclick=()=>{x(o)&&(o++,S(),H.playClick())},V.onclick=()=>{o>1&&(o--,S(),H.playClick())};async function T(){let y=await we()||{};e=y,C(y)}function C(y){if(!y)return;l.querySelector('[name="advName"]').value=y.advName||"",l.querySelector('[name="cid"]').value=y.cid||"",l.querySelector('[name="amName"]').value=y.amName||"";let k=document.getElementById("bau-all-data");k&&(k.innerHTML="",[{label:"Email",name:"email",value:y.email},{label:"Idioma",name:"language",value:y.language},{label:"Programa",name:"salesProgram",value:y.salesProgram},{label:"Speakeasy ID",name:"seId",value:y.seId,isSpeakeasy:!0},{label:"Timezone",name:"timezone",value:y.timezone}].forEach(G=>{let Z=document.createElement("div");Z.className="bau-inline-field",Z.title="Clique para editar";let g=document.createElement("b");g.textContent=`${G.label}:`,Z.appendChild(g);let v=document.createElement("input");if(v.type="text",v.name=G.name,v.className="bau-inline-input",v.value=G.value||"",v.placeholder=`Preencher ${G.label}...`,G.isSpeakeasy&&(v.id="bau-context-se-id-input"),(!G.value||G.value==="N/A"||G.value==="---")&&(v.value=""),Z.appendChild(v),G.isSpeakeasy){let O=document.createElement("button");O.type="button",O.innerHTML="\u2728 Auto Busca",O.style.cssText="font-size: 10px; font-weight: 700; color: #fff; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); border-radius: 100px; padding: 2px 10px; cursor: pointer; transition: all 0.2s; margin-left: 4px; flex-shrink: 0;",O.onmouseenter=()=>O.style.background="rgba(255,255,255,0.3)",O.onmouseleave=()=>O.style.background="rgba(255,255,255,0.2)",O.onclick=async B=>{B.stopPropagation(),B.preventDefault(),await lt("bau-context-se-id-input"),e.seId=v.value},Z.appendChild(O)}Z.onclick=()=>v.focus(),k.appendChild(Z)})),J.innerHTML=`\u2139\uFE0F Lembrete: Os hor\xE1rios s\xE3o baseados no seu fuso hor\xE1rio atual (${y.timezone||"n\xE3o detectado"}). Fornecer mais de uma op\xE7\xE3o aumenta a chance de agendamento r\xE1pido.`,[{key:"advName",label:"Nome do Anunciante"},{key:"cid",label:"Customer ID (CID)"},{key:"amName",label:"Account Manager"}].filter(N=>!y[N.key]||y[N.key]==="N/A"||y[N.key].trim()==="---").length>0?h.innerHTML="<span>\u26A0\uFE0F</span> Alguns dados n\xE3o foram encontrados. Por favor, complete os campos edit\xE1veis acima.":h.innerHTML="<span>\u2705</span> Dados do CRM carregados. Voc\xEA pode editar qualquer campo clicando nele."}l.onsubmit=async y=>{if(y.preventDefault(),!x(a))return;let k=A.innerHTML;A.disabled=!0,A.innerHTML="Enviando...";let $=new FormData(l),m=Object.fromEntries($.entries()),N=$.getAll("taskType"),G={caseId:e.caseId||"",cid:m.cid||e.cid||"",seId:m.seId||e.seId||"",advName:m.advName||e.advName||"",email:m.email||e.email||"",language:m.language||e.language||"",amName:m.amName||e.amName||"",salesProgram:m.salesProgram||e.salesProgram||"",site:m.site||e.site||"",timezone:m.timezone||e.timezone||"",reason:m.reason,taskType:N.join(", "),description:m.description,availability:`${m.availability_1||""} | ${m.availability_2||""} | ${m.availability_3||""}`.trim()};try{await ro(G,e.agentEmail||"anon"),H.playSuccess(),Y("Escalonamento enviado com sucesso!","success"),l.reset(),o=1,S(),F()}catch(Z){console.error("Erro BAU:",Z),Y("Falha ao enviar: "+(Z.message||"Erro desconhecido"),"error")}finally{A.disabled=!1,A.innerHTML=k}};async function F(){t=!t,n.style.display=t?"flex":"none",t&&(o=1,S(),await T()),ue(t,n,"cw-btn-bauform")}return S(),F}function pa(){if(window.techSolInitialized){Et();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{Ht();try{H.initGlobalListeners(),H.playStartup()}catch(c){console.warn("\xC1udio bloqueado:",c)}be.fetchTips(),Et();let e=bo(),o=wo(),a=Co(),n=Ao(),i=Lo(),r=qo(),s=_o(),p=No(),l=To();so({toggleNotes:e,toggleEmail:o,toggleScript:a,toggleLinks:n,toggleTimezone:i,toggleLibrary:r,toggleConfigs:s,toggleBAUForm:p,broadcastControl:l}),setTimeout(()=>{be.logEvent("App","Start","Session Start"),ko(),setTimeout(()=>{Oo(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),Y("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}pa();})();
