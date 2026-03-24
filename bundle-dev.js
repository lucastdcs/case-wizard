(()=>{var No=Object.defineProperty;var Do=(t,e)=>()=>(t&&(e=t(t=0)),e);var Ro=(t,e)=>{for(var o in e)No(t,o,{get:e[o],enumerable:!0})};var rt={};Ro(rt,{NotesState:()=>it,notesState:()=>U});var it,U,Xe=Do(()=>{it=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.excludedFields=new Set,this.activeFields=[];let e=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(e||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(e){this.currentCaseType!==e&&(this.currentCaseType=e,this.isDirty=!0,this.notify())}setLanguage(e){this.currentLang!==e&&(this.currentLang=e,this.notify())}setPortugalCase(e){this.isPortugalCase!==e&&(this.isPortugalCase=e,this.isDirty=!0,this.notify())}setConsent(e){this.consent!==e&&(this.consent=e,this.isDirty=!0,this.notify())}setTagSupportUsed(e){this.tagSupportUsed=e,e||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(e){this.activeFields=[...e],this.isDirty=!0,this.notify()}removeField(e){this.activeFields=this.activeFields.filter(o=>o!==e),this.isDirty=!0,this.notify()}addFieldAt(e,o){this.activeFields.includes(e)||(this.activeFields.splice(o,0,e),this.isDirty=!0,this.notify())}setForcedScreenshots(e){this.forcedScreenshots=new Set(e),this.isDirty=!0,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.isDirty=!0,this.notify()}setExcludedFields(e){this.excludedFields=new Set(e),this.isDirty=!0,this.notify()}toggleFieldExclusion(e,o){o?this.excludedFields.add(e):this.excludedFields.delete(e),this.isDirty=!0,this.notify()}setStatus(e){this.currentStatus!==e&&(this.currentStatus=e,this.isDirty=!0,this.notify())}setSubStatus(e){this.currentSubStatus!==e&&(this.currentSubStatus=e,this.isDirty=!0,this.notify())}setScreenshotMode(e){this.screenshotMode=e,this.notify()}setActiveTasks(e){this.activeTasks=e,this.isDirty=!0,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]!==o&&(this.formData[e]=o,this.isDirty=!0,this.notify())}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},U=new it});var at="",nt="",Rt=t=>new Promise(e=>setTimeout(e,t));async function zt(){if(at&&nt)return at;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Rt(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let n=document.querySelector("profile-details img");if(n&&n.src.includes("/photos/")){let i=n.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let a=document.querySelector("profile-details .email");return a&&(nt=a.textContent.trim(),console.log("TechSol: Identidade confirmada ->",nt)),t.click(),document.body.click(),at=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function We(){return at||"Consultor"}function Ee(){return nt||null}function Bt(t){let e=new Date,o=e.getHours(),a=e.getDay(),n="Ol\xE1",i="";o>=5&&o<12?(n="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(n="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(n="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let r=[];o>=0&&o<5?r=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?a===1?r=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:a===5?r=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:r=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?r=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:r=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(a===0||a===6)&&(r=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let s=r[Math.floor(Math.random()*r.length)];return{prefix:`${n},`,name:t,suffix:s,icon:i,isFriday:a===5}}async function zo(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,a=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');a&&(a.click(),await Rt(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(r=>{let s=r.innerText.trim();return s.includes("@")&&!s.includes("Is this:")&&s.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Bo(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function Po(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Google Ads External Customer ID")||n.textContent.includes("Customer ID"));if(e){let n=e.closest("home-data-item")||e.parentElement;if(n){let i=n.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let a=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(a)return a[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"N/A"}function $o(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Account Manager")||o.textContent.includes("AM Name")||o.textContent.includes("Sales Rep"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar AM:",t)}return null}function Ho(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("customer time zone")||o.textContent.toLowerCase().includes("time zone")||o.textContent.toLowerCase().includes("timezone"));if(e){let o=e.parentElement;if(o){let a=o.querySelector("sanitized-content");if(a&&a.textContent.trim())return a.textContent.trim();let n=o.querySelector(".data-pair-content")||e.nextElementSibling;if(n&&n.textContent.trim()){let i=n.textContent.trim();if(i&&i!=="---"&&i!=="N/A")return i}}}}catch(t){console.warn("Erro ao capturar Timezone:",t)}return null}async function Go(){let t="---";try{t=window.location.href.split("/").pop()}catch(e){console.warn("Falha URL:",e)}return t}function jo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("sales program")||o.textContent.toLowerCase().trim()==="program"||o.textContent.toLowerCase().includes("programa"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector('sanitized-content ng-template[debug-id="html-value"]')||o.querySelector("sanitized-content");if(a)return a.textContent.trim();let n=o.querySelector(".data-pair-content")||o.nextElementSibling;if(n)return n.textContent.trim()}}catch(t){console.warn("Erro ao capturar Sales Program:",t)}return""}function Uo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Language")||o.textContent.includes("Idioma"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar Idioma:",t)}return"N/A"}function Vo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Speakeasy ID")||o.textContent.includes("SE ID"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar SE ID:",t)}return"N/A"}async function we(){let t="Cliente",e="";try{let x=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(x&&x.nextElementSibling){let f=x.nextElementSibling.innerText.trim();f&&(t=f)}}catch(p){console.warn("Falha Nome:",p)}try{let x=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(x&&x.nextElementSibling){let f=x.nextElementSibling.innerText.trim();f&&(e=f)}}catch(p){console.warn("Falha URL:",p)}let o=await zo(),a=Bo(),n=Po(),i=$o(),r=Ho(),s=await Go(),d=jo(),u=Uo(),l=Vo();return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:a,cid:n,amName:i,timezone:r,agentName:We(),agentEmail:Ee(),caseId:s,advName:t,site:e,email:o,salesProgram:d,language:u,seId:l}}var Re=null,Ct=null,Oe=.3;var Ie=localStorage.getItem("cw_sounds_muted")==="true";function De(){if(!Re){let t=window.AudioContext||window.webkitAudioContext;t&&(Re=new t)}return Re&&Re.state==="suspended"&&Re.resume(),Re}function Pt(t){if(Ct)return Ct;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),a=o.getChannelData(0);for(let n=0;n<e;n++)a[n]=Math.random()*2-1;return Ct=o,o}var G={setMuted:t=>{Ie=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>Ie,playClick:()=>{if(Ie)return;let t=De();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Pt(t);let a=t.createBiquadFilter();a.type="highpass",a.frequency.value=4e3;let n=t.createGain();n.gain.setValueAtTime(Oe*.8,e),n.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(Ie)return;let t=De();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let a=t.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Oe*.1,e+.005),a.gain.linearRampToValueAtTime(0,e+.02),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(Ie)return;let t=De();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((a,n)=>{let i=t.createOscillator(),r=t.createGain();i.type="sine",i.frequency.value=a,r.gain.setValueAtTime(0,e),r.gain.linearRampToValueAtTime(Oe*.6,e+.05),r.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(r),r.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{if(Ie)return;let t=De();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Pt(t);let a=t.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(100,e),a.frequency.exponentialRampToValueAtTime(800,e+.2);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(Oe*.5,e+.05),n.gain.linearRampToValueAtTime(0,e+.25),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(Ie)return;let t=De();if(!t)return;let e=t.currentTime,o=t.createOscillator(),a=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),a.gain.setValueAtTime(Oe,e),a.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(Ie)return;let t=De();if(!t)return;let e=t.currentTime,o=.12,a=t.createOscillator(),n=t.createGain(),i=t.createBiquadFilter();a.type="square",a.frequency.setValueAtTime(400,e),a.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),n.gain.setValueAtTime(Oe*4,e),n.gain.exponentialRampToValueAtTime(.001,e+.1),a.connect(i),i.connect(n),n.connect(t.destination),a.start(e),a.stop(e+.12);let r=t.createOscillator(),s=t.createGain();r.type="sine",r.frequency.setValueAtTime(150,e),r.frequency.exponentialRampToValueAtTime(50,e+.15),s.gain.setValueAtTime(Oe*1.5,e),s.gain.exponentialRampToValueAtTime(.001,e+.15),r.connect(s),s.connect(t.destination),r.start(e),r.stop(e+.15),[55,55.4,110.5].forEach(u=>{let l=t.createOscillator(),p=t.createGain(),x=t.createBiquadFilter();l.type="sawtooth",l.frequency.value=u,x.type="lowpass",x.frequency.setValueAtTime(30,e),x.frequency.linearRampToValueAtTime(900,e+o+.2),x.frequency.exponentialRampToValueAtTime(40,e+3),p.gain.setValueAtTime(0,e),p.gain.linearRampToValueAtTime(Oe*.6,e+o+.1),p.gain.exponentialRampToValueAtTime(.001,e+3.5),l.connect(x),x.connect(p),p.connect(t.destination),l.start(e),l.stop(e+3.6)})},playNotification:()=>{if(Ie)return;let t=De();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(a=>{let n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(a.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Oe*a.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+a.dur),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+a.dur+.1)})},playSwoosh:()=>{G.playGenieOpen()},playReset:()=>{G.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!Re)return;let a=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!a||a.contains(o.relatedTarget))return;let n=Date.now();n-t<e||(G.playHover(),t=n)},{passive:!0})}};var $t=1e4;function Ht(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function W(t,e={}){let o=document.createElement("div");e.error&&(o.className="toast-error");let a=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:a,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?G.playError():G.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function Gt(t,e=null){let o=0,a=0,n=0,i=0,r=e||t;r.style.cursor="grab",r.onmousedown=s;function s(l){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(l.target.tagName)||l.target.closest(".no-drag"))return;l=l||window.event,r.style.cursor="grabbing",t.style.transition="none";let p=t.getBoundingClientRect();t.style.transform="none",t.style.left=p.left+"px",t.style.top=p.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",$t++,t.style.zIndex=$t,n=l.clientX,i=l.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=u,document.onmousemove=d}function d(l){l=l||window.event,l.preventDefault(),o=n-l.clientX,a=i-l.clientY,n=l.clientX,i=l.clientY;let p=t.offsetTop-a,x=t.offsetLeft-o,f=16,g=window.innerWidth,m=window.innerHeight,w=t.offsetWidth,A=t.offsetHeight;x<f?x=f:x+w>g-f&&(x=g-w-f),p<f?p=f:p+A>m-f&&(p=m-A-f),t.style.top=p+"px",t.style.left=x+"px"}function u(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var me={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Et={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},jt={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Ut={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Le=t=>new Promise(e=>setTimeout(e,t));async function Yo(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await Le(200);for(let a=0;a<e.length;a++){let n=e.charAt(a),i=document.createElement("span");i.textContent=n,o&&o.parentNode===t?o.before(i):t.appendChild(i);let r=Math.floor(Math.random()*60)+30;a===0&&(r=150),a>e.length-3&&(r=30),await Le(r)}await Le(600),o&&(o.style.display="none")}async function At(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Le(200);let e=await zt(),o=Bt(e),a=t.querySelector("#w-icon"),n=t.querySelector("#p1"),i=t.querySelector("#p2"),r=t.querySelector("#p3"),s=t.querySelector("#p-sextou");a&&(a.innerHTML=o.icon),n&&(n.textContent=o.prefix),r&&(r.textContent=o.suffix),await Le(300);let d=a?a.querySelector("svg"):null;if(d&&(d.style.opacity="1",d.style.transform="scale(1)"),await Le(400),n&&(n.style.opacity="1"),G.playStartup(),i&&await Yo(i,o.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),o.isFriday&&s){await Le(400),s.style.display="block",s.offsetWidth;let u=s.querySelector(".sextou-badge");u&&(u.style.opacity="1",u.style.transform="scale(1)")}await Le(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Le(900),t.parentNode&&t.parentNode.removeChild(t)}}function Vt(t){if(!t)return;let e=t.getBoundingClientRect(),o=window.innerWidth,a=window.innerHeight,n=24,i=o-e.width-n,r=a-e.height-n,s=parseFloat(t.style.left)||e.left,d=parseFloat(t.style.top)||e.top,u=Math.max(n,Math.min(s,i)),l=Math.max(n,Math.min(d,r));if(u!==s||l!==d){let p=t.style.transition;t.style.transition="left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",t.style.left=`${u}px`,t.style.top=`${l}px`,setTimeout(()=>{t.style.transition=p},300)}}var Ae={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Te(t,e){e.onmousedown=o;function o(a){a.stopPropagation(),a.preventDefault();let n=t.style.transition;t.style.transition="none";let i=a.clientX,r=a.clientY,s=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),d=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),u=i,l=r,p=!1;function x(m){u=m.clientX,l=m.clientY,p||(window.requestAnimationFrame(()=>{f(),p=!1}),p=!0)}function f(){let m=s+(u-i),w=d+(l-r);m>360&&(t.style.width=m+"px"),w>300&&(t.style.height=w+"px")}function g(){document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",g),setTimeout(()=>{t.style.transition=n},50)}document.addEventListener("mousemove",x),document.addEventListener("mouseup",g)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function Yt(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function Wt(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function Xt(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function xe(t,e={}){return new Promise(o=>{let a=Wt(),n=Xt(),i=e.danger?"#FF3B30":"#007AFF",r=e.confirmText||(e.danger?"Excluir":"Confirmar");n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${r}</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)"});let s=l=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(l)},300)},d=n.querySelector("#cw-conf-cancel"),u=n.querySelector("#cw-conf-ok");[d,u].forEach(l=>l.onmouseenter=()=>G.playHover()),d.onclick=()=>{G.playClick(),s(!1)},u.onclick=()=>{G.playClick(),s(!0)}})}function Kt(t,e=""){return new Promise(o=>{let a=Wt(),n=Xt();n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a);let i=n.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let r=u=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(u)},300)},s=n.querySelector("#cw-prompt-cancel"),d=n.querySelector("#cw-prompt-ok");[s,d].forEach(u=>u.onmouseenter=()=>G.playHover()),s.onclick=()=>{G.playClick(),r(null)},d.onclick=()=>{G.playClick(),r(i.value)},i.onkeydown=u=>{u.key==="Enter"&&d.click(),u.key==="Escape"&&s.click()}})}Xe();var Wo={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Jt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function pe(t,e,o,a,n,i){let r=document.createElement("div");Object.assign(r.style,Wo),Gt(t,r);let s=document.createElement("div");if(Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let A=document.createElement("style");A.id="cw-header-anim",A.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(A)}s.style.animation="cw-header-flow 6s linear infinite",r.appendChild(s),n&&(n.googleLine=s);let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center",gap:"12px"});let u=document.createElement("img");u.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(u.style,{width:"20px",height:"20px",pointerEvents:"none"});let l=document.createElement("span");l.textContent=e,d.appendChild(u),d.appendChild(l);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"4px"});let x='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',g=document.createElement("div");g.innerHTML=x,Object.assign(g.style,Jt),g.title="Sobre & Feedback",g.classList.add("no-drag"),g.onmouseenter=()=>{g.style.background="rgba(255,255,255,0.1)",g.style.color="#FFF"},g.onmouseleave=()=>{g.style.color!=="rgb(138, 180, 248)"&&(g.style.background="transparent",g.style.color="#9AA0A6")};let m=document.createElement("div");m.innerHTML=f,Object.assign(m.style,Jt),m.title="Fechar",m.classList.add("no-drag","cw-header-close"),m.onmouseenter=()=>{m.style.background="rgba(242, 139, 130, 0.2)",m.style.color="#F28B82"},m.onmouseleave=()=>{m.style.background="transparent",m.style.color="#9AA0A6"},m.onmousedown=A=>A.stopPropagation(),g.onmousedown=A=>A.stopPropagation(),m.onclick=i;let w=Xo(t,e,o,a);return g.onclick=A=>{A.stopPropagation(),w.style.opacity==="1"?(w.style.opacity="0",w.style.pointerEvents="none",g.style.color="#9AA0A6",g.style.background="transparent"):(w.style.opacity="1",w.style.pointerEvents="auto",g.style.color="#8AB4F8",g.style.background="rgba(138, 180, 248, 0.1)")},p.appendChild(g),p.appendChild(m),r.appendChild(d),r.appendChild(p),r}function Xo(t,e,o,a){let n=document.createElement("div");return Object.assign(n.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),n.innerHTML=`
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
    `,setTimeout(()=>{let i=n.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let r=n.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{n.style.opacity="0",n.style.pointerEvents="none"})},0),t.appendChild(n),n}var B={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},de={small:"8px",medium:"12px",large:"20px",pill:"100px"},ze={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},le="cubic-bezier(0.34, 1.56, 0.64, 1)",Ko={width:"100%",padding:"14px 16px",borderRadius:de.medium,border:`1.5px solid ${B.border}`,backgroundColor:B.bgInput,fontSize:"14px",color:B.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${le}`,outline:"none"},ha={...Ko,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},ya={fontSize:"12px",fontWeight:"700",color:B.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},va={display:"block",fontSize:"14px",fontWeight:"600",color:B.text,marginBottom:"10px",marginTop:"20px"},wa={fontSize:"12px",color:B.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},Tt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:B.primary},Sa={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:B.text,cursor:"pointer",padding:"16px 20px",backgroundColor:B.surface,border:`1px solid ${B.border}`,borderRadius:de.large,transition:`all 0.4s ${le}`,userSelect:"none",boxShadow:ze.subtle},Ca={padding:"14px 28px",color:"#fff",backgroundColor:B.primary,border:"none",borderRadius:de.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${le}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},Ea={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${B.primary}`,color:B.primary,borderRadius:de.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${le}`},Aa={background:"transparent",border:`1px solid ${B.border}`,borderRadius:de.pill,color:B.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${le}`};function Zt(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,me,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${le}, height 0.4s ${le}, transform 0.4s ${le}, opacity 0.3s ease`,borderRadius:de.large,boxShadow:ze.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let a={popup:o,googleLine:null},n=pe(o,"Case Notes",t,"Gera notas padronizadas com excel\xEAncia visual.",a,e);o.appendChild(n);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:B.surface}),o.appendChild(i);let r=document.createElement("div");r.textContent="created by lucaste@",Object.assign(r.style,Ut,{padding:"16px 24px",borderTop:`1px solid ${B.bgInput}`,color:B.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(r);let s=document.createElement("div");return Object.assign(s.style,Ae),s.className="no-drag",o.appendChild(s),Te(o,s),Jo(),{popup:o,content:i,header:n,animRefs:a,credit:r}}function Jo(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${de.medium} !important;
            border: 1.5px solid ${B.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: all 0.2s ${le} !important;
            box-sizing: border-box !important;
            background: ${B.bgInput} !important;
            color: ${B.text} !important;
            outline: none !important;
            box-shadow: ${ze.subtle} !important;
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
            transition: border-color 0.2s ${le}, background-color 0.2s ${le}, box-shadow 0.2s ${le} !important;
        }

        .cw-input:hover, .cw-textarea:hover, #notes-assistant-popup .cw-select:hover {
            border-color: #bdc1c6 !important;
            background-color: #f1f3f4 !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }

        .cw-input:focus, .cw-textarea:focus, #notes-assistant-popup .cw-select:focus {
            border-color: ${B.primary} !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15), 0 2px 8px rgba(0,0,0,0.05) !important;
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${B.textSub};
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
            background: ${B.bgInput};
        }

        .cw-btn-primary {
            background: ${B.primary};
            color: #fff;
            border: none;
            border-radius: ${de.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${le};
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
            color: ${B.textSub};
            border: 1px solid ${B.border};
            border-radius: ${de.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${le};
        }
        .cw-btn-secondary:hover {
            background: ${B.bgInput};
            border-color: #bdc1c6;
            color: ${B.text};
        }
    `,document.head.appendChild(t)}var Se={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} Seguimos com os passos:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Pasos ejecutados:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:"}},Ce={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},ke={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},He={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Ge=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],st=["CONSIDERACOES","COMENTARIOS"],lt={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
    `,document.head.appendChild(t)}function eo(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function ct(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),o="";eo(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let a=document.querySelector('material-button[debug-id="dock-item-case-log"]');a&&!a.classList.contains("selected")&&(Ke(a),await je(1200));let n=document.querySelector("search-filter dropdown-button .button");if(n&&!(n.innerText||"").includes("All")){Ke(n),await je(600);let x=document.querySelector('material-checkbox[debug-id="check-all-box"]');x&&x.getAttribute("aria-checked")!=="true"&&(Ke(x),await je(300));let f=document.querySelector('material-button[debug-id="apply-filter"]');f&&(Ke(f),await je(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await je(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let p=r.length-1;p>=0;p--){let x=r[p],f=x.querySelector("i.material-icons-extended"),g=f&&f.innerText.trim()==="phone_in_talk",m=x.innerText||"",w=m.includes("Agent joined")||m.includes("outbound-call")||m.includes("Speakeasy");if(g||w){x.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",x),e&&(e.placeholder="Lendo mensagem..."),Ke(x),await je(1e3));break}}let d=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),u=/Speakeasy.*?(P\d{15,25})/i,l=null;for(let p=d.length-1;p>=0;p--){let x=d[p];if(x.offsetParent===null)continue;let f=(x.innerText||"").match(u);if(f&&f[1]){l=f[1];break}}if(e)if(l){try{await navigator.clipboard.writeText(l)}catch{}e.tagName==="INPUT"||e.tagName==="TEXTAREA"?e.value=l:e.textContent=l,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),G.playSuccess(),W(`ID Localizado: ${l}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else G.playError(),W("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(a){console.error("Erro na automa\xE7\xE3o:",a),W("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),eo(!1)}}function to(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,a=this.selectionEnd,n=this.value,i=n.lastIndexOf(`
`,o-1)+1,r=n.substring(i,o);if(e.key==="Enter"){e.preventDefault();let s=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=n.substring(0,i)+`
`+n.substring(a),this.selectionStart=this.selectionEnd=i+1;return}let d=`
`+s;this.value=n.substring(0,o)+d+n.substring(a),this.selectionStart=this.selectionEnd=o+d.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?r.startsWith("  ")&&(this.value=n.substring(0,i)+r.substring(2)+n.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=n.substring(0,i)+"  "+r+n.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===a&&o>0){let s=n.substring(0,o);s.endsWith("\u2022 ")?(e.preventDefault(),this.value=s.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2):s.endsWith("  ")&&r.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=s.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2)}}))}function kt(t,e,o){if(e.innerHTML="",!!ke[t]&&(o.activeFields.forEach(n=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(n))return;let i=`field-${n}`,r=document.createElement("label"),s=p=>Se[o.currentLang]?.[p]||Se.pt?.[p]||p;r.textContent=s(n.toLowerCase())!==n.toLowerCase()?s(n.toLowerCase()):n.replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase())+":",Object.assign(r.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:B.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let d=document.createElement("span");if(d.textContent=r.textContent,r.innerHTML="",r.appendChild(d),n==="SPEAKEASY_ID"){let p=document.createElement("button");p.innerHTML="\u2728 Auto Busca",p.style.cssText=`font-size: 11px; font-weight: 700; color: ${B.primary}; background-color: ${B.primaryBg}; border: none; border-radius: ${de.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${le};`,p.onmouseenter=()=>p.style.backgroundColor="#d2e3fc",p.onmouseleave=()=>p.style.backgroundColor=B.primaryBg,p.onclick=x=>{x.preventDefault(),ct(i)},r.appendChild(p)}let u=document.createElement("button");u.innerHTML="\u2715",u.style.cssText=`font-size: 14px; background: ${B.bgInput}; border: none; color: ${B.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${le};`,u.onmouseenter=()=>{u.style.background=B.error,u.style.color=B.surface},u.onmouseleave=()=>{u.style.background=B.bgInput,u.style.color=B.textSub},u.onclick=async p=>{p.preventDefault(),await xe(`Tem certeza que deseja remover o campo "${d.textContent.replace(":","")}"?`)&&(o.removeField(n),kt(t,e,o))},r.appendChild(u);let l;Ge.includes(n)?(l=document.createElement("textarea"),l.classList.add("bullet-textarea","cw-textarea"),l.placeholder="Utilize marcadores para detalhar...",to(l)):st.includes(n)?(l=document.createElement("textarea"),l.classList.add("cw-textarea"),l.placeholder="Descreva as considera\xE7\xF5es..."):(l=document.createElement("input"),l.type="text",l.classList.add("cw-input")),l.id=i,l.value=o.formData[i]||"",l.addEventListener("input",p=>o.updateField(i,p.target.value)),e.appendChild(r),e.appendChild(l)}),o.activeFields.includes("CONSENTIU_GRAVACAO"))){let n=s=>Se[o.currentLang]?.[s]||Se.pt?.[s]||s,i=document.createElement("label");i.textContent=n("consentiu_gravacao"),Object.assign(i.style,{display:"block",fontSize:"13px",fontWeight:"700",color:B.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let r=document.createElement("select");r.className="cw-select",r.innerHTML=`
            <option value="false">${n("nao")}</option>
            <option value="true">${n("sim")}</option>
        `,r.value=o.consent?"true":"false",r.onchange=()=>o.setConsent(r.value==="true"),e.appendChild(i),e.appendChild(r)}}function Ft(t,e,o){let a=t.currentSubStatus;if(!a)return null;let n=ke[a],i=Se[t.currentLang]||Se.pt,r=u=>i[u]||Se.pt?.[u]||u,s='style="margin-bottom: 12px; padding-left: 30px;"',d="";if(t.activeFields.forEach(u=>{let l=r(u.toLowerCase()),p="N/A";if(u==="label_substatus")l=r("label_substatus"),p=n.name;else if(u==="TAGS_IMPLEMENTED"){l=r("tags_implemented");let x=[];e.getCheckedElements().forEach(g=>{let m=g.value,w=Ce[m],A=g.count||1,N=m==="ads_conversion_tracking"||m==="ads_enhanced_conversions";t.tagSupportUsed&&N&&!t.forcedScreenshots.has(m)?x.push(`${w.name} - ${r("ts_output_disclaimer")}`):x.push(A>1?`${w.name} (x${A})`:w.name)}),p=x.join(", ")||"N/A"}else if(u==="SCREENSHOTS_LIST"){l=r("screenshots_list");let x="",f=e.screenshotsElement;f&&Array.from(f.querySelectorAll('input[id^="name-"]')).forEach(m=>{let w=m.value,A=m.closest(".cw-screen-card");if(A){let N=A.querySelectorAll('input[id^="screen-"]'),P=!1,R="";N.forEach(Z=>{let _=Z.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",F=Z.value.trim();F&&(R+=`<li>${_} - ${F}</li>`,P=!0)}),P&&(x+=`<div style="margin-bottom: 8px;"><b>${w}</b><ul ${s}>${R}</ul></div>`)}}),p=x||"N/A"}else if(u==="CASO_PORTUGAL")l=r("caso_portugal"),p=r("sim");else if(u==="CONSENTIU_GRAVACAO")l=r("consentiu_gravacao"),p=t.consent?r("sim"):r("nao");else{let x=`field-${u}`,f=t.formData[x],g="";if(n.fieldPrefixes&&n.fieldPrefixes[u]&&(g=n.fieldPrefixes[u]+" "),f&&f.trim()!==""&&f.trim()!=="\u2022"){let m=f.trim();if(Ge.includes(u)){let w=m.split(`
`).map(A=>A.trim()).filter(A=>A!==""&&A!=="\u2022").map(A=>A.startsWith("\u2022 ")?A.substring(2):A).map(A=>`<li>${A}</li>`).join("");p=w?`${g}<ul ${s}>${w}</ul>`:"N/A"}else st.includes(u)?p=g+m.split(`
`).filter(w=>w.trim()!=="").map(w=>`<p style="margin: 0 0 8px 0;">${w}</p>`).join(""):p=g+m}else g&&(p=g.trim())}d+=`<b>${l}</b><br>${p}<br><br>`}),n.customFooter&&(d+=`${n.customFooter}<br><br>`),o?.getOutput){let u=o.getOutput();u&&(d+=`${u}<br><br>`)}return d+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",d.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}function oo(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o="Passe o mouse sobre um cen\xE1rio para visualizar o texto...",a=document.createElement("div");Object.assign(a.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.2s ease, transform 0.2s ease",i.textContent=o,n.appendChild(i);let r=new Set,s=null;return e.render=(d,u)=>{r.clear();let l=Object.entries(lt).filter(([p,x])=>{let f=!x.type||x.type==="all"||x.type===u,g=!1;return d.startsWith("NI_")?g=p.includes("-ni-")||p.includes("attempted"):d.startsWith("SO_")?g=p.includes("gtm")||p.includes("whatsapp")||p.includes("form")||p.includes("ecw4")||p.includes("ga4")||p.includes("-so-"):d.startsWith("AS_")?g=p.includes("-as-"):d.startsWith("IN_")?g=p.includes("-in-"):d.startsWith("DC_")&&(g=p.includes("-dc-")),f&&g});a.innerHTML="",l.forEach(([p,x])=>{let f=document.createElement("div"),g=p.replace("quickfill-","").replace(/-/g," ");f.textContent=g,f.dataset.id=p,Object.assign(f.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let m=x["field-REASON_COMMENTS"]||x["field-CONTEXTO_CALL"]||p;f.onmouseenter=()=>{s&&clearTimeout(s),r.has(p)||(f.style.background="#f1f3f4"),i.style.opacity="0",i.style.transform="translateY(5px)",s=setTimeout(()=>{i.textContent=m.substring(0,120)+(m.length>120?"...":""),i.style.opacity="1",i.style.transform="translateY(0)"},50)},f.onmouseleave=()=>{s&&clearTimeout(s),r.has(p)||(f.style.background="#ffffff"),s=setTimeout(()=>{r.size===0&&(i.style.opacity="0",setTimeout(()=>{i.textContent=o,i.style.opacity="1"},50))},100)},f.onclick=()=>{G.playClick();let w=!r.has(p);w?(r.add(p),f.style.background="#e8f0fe",f.style.borderColor="#1a73e8",f.style.color="#1967d2"):(r.delete(p),f.style.background="#ffffff",f.style.borderColor="#dadce0",f.style.color="#3c4043"),t(p,w)},a.appendChild(f)}),l.length===0?e.style.display="none":e.style.display="block"},e.appendChild(a),e.appendChild(n),e}var ie={bg:B.bgInput,white:B.surface,border:B.border,textMain:B.text,textSub:B.textSub,blue:B.blue,blueLight:B.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:B.blue,bg:B.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:B.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:B.primary,bg:B.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:B.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Be={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function ao(t,e,o){let a={},n="implementation";o&&o.subscribe(()=>{Z(),J()});function i(_){let F=_.toLowerCase();return F.includes("ads")||F.includes("conversion")||F.includes("remarketing")?ie.brands.ads:F.includes("ga4")||F.includes("analytics")?ie.brands.ga4:F.includes("gtm")||F.includes("tag manager")||F.includes("container")?ie.brands.gtm:F.includes("merchant")||F.includes("shopping")||F.includes("feed")?ie.brands.gmc:ie.brands.default}let r=Object.entries(Ce).filter(([_,F])=>F.popular),s={};Object.entries(Ce).forEach(([_,F])=>{if(F.popular)return;let $=i(F.name);s[$.label]||(s[$.label]={brand:$,tasks:[]}),s[$.label].tasks.push({key:_,...F})});let d="cw-zen-tasks";if(!document.getElementById(d)){let _=document.createElement("style");_.id=d,_.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${ie.font}; background: ${ie.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${ie.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${ie.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${ie.white}; 
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
                font-size: 12px; font-weight: 500; color: ${ie.textMain}; line-height: 1.2; 
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
                color: ${ie.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${ie.border}; border-radius: 10px; background: ${ie.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${ie.blue}; box-shadow: 0 0 0 3px ${ie.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${ie.border}; border-radius: 10px; background: ${ie.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${ie.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${ie.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${ie.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${ie.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${ie.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${ie.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${ie.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${ie.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${ie.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${ie.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${ie.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${ie.textMain}; }
            
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
                font-family: ${ie.font}; font-size: 15px; font-weight: 600; color: ${ie.textMain};
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
                border-color: ${ie.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${ie.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${ie.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${ie.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${ie.textSub};
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
        `,document.head.appendChild(_)}let u=document.createElement("div");u.className="cw-zen-container";let l=document.createElement("div");Object.assign(l.style,{display:"none"});let p=document.createElement("div");p.className="cw-screens-container",l.appendChild(p),u.innerHTML=`
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
    `;let x=u.querySelector(".cw-hero-grid"),f=u.querySelector(".cw-acc-container"),g=u.querySelector(".cw-results-container"),m=u.querySelector(".cw-search-input"),w=u.querySelector(".cw-status-bar"),A=u.querySelector(".cw-status-text"),N=u.querySelector(".cw-footer-icons");r.forEach(([_,F])=>{let $=i(F.name),j=document.createElement("div");j.className="cw-hero-card",j.id=`hero-${_}`,j.style.setProperty("--hero-color",$.color),j.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Be[$.icon]}</div>
                <div class="cw-hero-label">${F.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,j.onclick=q=>{if(q.target.closest(".cw-step-btn"))return;let k=a[_]?a[_].count:0;R(_,k>0?-k:1,F)},j.querySelector(".minus").onclick=()=>R(_,-1,F),j.querySelector(".plus").onclick=()=>R(_,1,F),j.dataset.color=$.color,x.appendChild(j)});function P(_,F){let $=i(F.name),j=document.createElement("div");return j.className="cw-task-item",j.dataset.id=_,j.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${$.bg}; color:${$.color}">
                    ${Be[$.icon]||Be.default}
                </div>
                <div class="cw-task-label">${F.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,j.onclick=q=>{if(q.target.closest(".cw-step-btn"))return;let k=a[_]?a[_].count:0;R(_,k>0?-k:1,F)},j.querySelector(".minus").onclick=()=>R(_,-1,F),j.querySelector(".plus").onclick=()=>R(_,1,F),j}Object.entries(s).forEach(([_,F])=>{let $=document.createElement("div");$.className="cw-acc-group";let j=document.createElement("div");j.className="cw-acc-header",j.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${F.brand.color}"></div>
                ${_}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,j.onclick=()=>{f.querySelectorAll(".cw-acc-group.open").forEach(k=>{k!==$&&k.classList.remove("open")}),$.classList.toggle("open")};let q=document.createElement("div");q.className="cw-acc-body",F.tasks.forEach(k=>{let S=P(k.key,k);q.appendChild(S)}),$.appendChild(j),$.appendChild(q),f.appendChild($)});function R(_,F,$){a[_]||(a[_]={count:0,data:$,brand:i($.name)}),a[_].count+=F,a[_].count<=0&&delete a[_],Z(),J(),t&&t()}function Z(){let _=o.tagSupportUsed;r.forEach(([k])=>{let S=x.querySelector(`#hero-${k}`);if(!S)return;let O=a[k];O?(S.classList.add("active"),S.querySelector(".cw-step-val").textContent=O.count,S.querySelector(".cw-step-val").style.color=S.dataset.color,_&&(k==="ads_conversion_tracking"||k==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(k)?S.classList.add("ts-success"):S.classList.remove("ts-success")):(S.classList.remove("active"),S.classList.remove("ts-success"))}),u.querySelectorAll(".cw-task-item").forEach(k=>{let S=k.dataset.id,O=a[S];O?(k.classList.add("selected"),k.querySelector(".cw-step-val").textContent=O.count,_&&(S==="ads_conversion_tracking"||S==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(S)?k.classList.add("ts-success"):k.classList.remove("ts-success")):(k.classList.remove("selected"),k.classList.remove("ts-success"))});let $=Object.keys(a),j=0,q=[];if($.forEach(k=>{let S=a[k];j+=S.count;for(let O=0;O<S.count;O++)q.length<6&&q.push(S.brand)}),j>0){w.classList.add("visible");let k=j>1?"A\xE7\xF5es":"A\xE7\xE3o",S=j>1?"definidas":"definida";A.textContent=`${j} ${k} ${S}`,N.innerHTML="",q.forEach(O=>{let b=document.createElement("div");b.className="cw-mini-icon",b.innerHTML=Be[O.icon]||Be.default;let C=b.querySelector("svg");C&&(C.style.width="14px",C.style.height="14px"),N.appendChild(b)})}else w.classList.remove("visible")}m.addEventListener("input",_=>{let F=_.target.value.toLowerCase();if(F.length>0){f.style.display="none",g.style.display="block",g.innerHTML="";let $=!1;Object.entries(Ce).forEach(([j,q])=>{if(q.name.toLowerCase().includes(F)){$=!0;let k=P(j,q);a[j]&&(k.classList.add("selected"),k.querySelector(".cw-step-val").textContent=a[j].count),g.appendChild(k)}}),$||(g.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else f.style.display="block",g.style.display="none"});function J(){p.innerHTML="";let _=Object.keys(a),F=!1;if(_.length===0){p.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,l.style.display="none";return}let $=o.tagSupportUsed,j=document.createElement("div");j.className="cw-info-banner",j.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,p.appendChild(j),_.forEach(q=>{let k=a[q].data,S=a[q].count,O=a[q].brand,C=$&&(q==="ads_conversion_tracking"||q==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(q),T=o.screenshotMode||"implementation",I=k.screenshots?.[T]||[];if(I.length>0||C){F=!0;for(let D=1;D<=S;D++){let z=document.createElement("div");z.className="cw-screen-card",C&&z.classList.add("ts-success"),z.style.setProperty("--brand-color",O.color),z.style.setProperty("--brand-bg",O.bg),z.style.setProperty("--brand-shadow",O.color+"40");let Y=document.createElement("div");Y.className="cw-card-header";let y=document.createElement("div");y.className="cw-card-icon",y.innerHTML=Be[O.icon]||Be.default;let V=document.createElement("div");V.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let K=document.createElement("input");K.className="cw-card-title-input",K.id=`name-${q}-${D}`,K.value=`${k.name}${S>1?" #"+D:""}`,K.title="Clique para renomear esta task";let E=document.createElement("span");if(E.className="cw-edit-hint",E.innerHTML="\u270E Renomear",V.appendChild(K),V.appendChild(E),Y.appendChild(y),Y.appendChild(V),z.appendChild(Y),C){let c=document.createElement("div");c.className="cw-ts-disclaimer-box",c.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,c.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(q,!0)},z.appendChild(c)}else I.forEach((c,v)=>{let h=document.createElement("div");h.className="cw-input-group";let M=document.createElement("label");M.className="cw-input-label",M.textContent=c;let L=document.createElement("input");L.className="cw-input-field",L.id=`screen-${q}-${D}-${v}`,L.placeholder="Cole o link aqui...",L.setAttribute("autocomplete","off"),L.addEventListener("input",()=>{L.value.trim().length>5?L.classList.add("filled"):L.classList.remove("filled")});let X=document.createElement("div");X.className="cw-input-check",X.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',h.appendChild(M),h.appendChild(L),h.appendChild(X),z.appendChild(h)});p.appendChild(z)}}}),l.style.display=F?"block":"none"}return{selectionElement:u,screenshotsElement:l,updateSubStatus:()=>J(),getCheckedElements:()=>Object.keys(a).map(_=>({value:_,count:a[_].count})),setTaskCount:(_,F)=>{a[_]&&delete a[_],F>0&&Ce[_]&&R(_,F,Ce[_])},toggleTask:(_,F=!0)=>{let $=a[_];F&&!$?R(_,1,Ce[_]):!F&&$&&R(_,-$.count,Ce[_])},setLanguage:_=>{e=_;let F=u.querySelector(".js-hero-title");F&&(F.textContent=e("acesso_rapido"));let $=u.querySelector(".cw-search-input");$&&($.placeholder=e("buscar_catalogo")),J()},reset:()=>{for(let _ in a)delete a[_];m.value="",f.style.display="block",g.style.display="none",Z(),J()}}}var Zo={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},Qo={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},ea={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},ta={display:"flex",gap:"20px",marginBottom:"12px"};function no(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,Zo);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,Et,{marginTop:"0"});let a=document.createElement("div");Object.assign(a.style,ta);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,Tt);let i=document.createElement("label");i.textContent="Sim";let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(n),r.appendChild(i);let s=document.createElement("input");s.type="radio",s.name="ts_usage_mod",s.value="N\xE3o",s.checked=!0,Object.assign(s.style,Tt);let d=document.createElement("label");d.textContent="N\xE3o";let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center"}),u.appendChild(s),u.appendChild(d),a.appendChild(r),a.appendChild(u);let l=document.createElement("div");l.style.display="block";let p=document.createElement("label");p.className="js-ts-reason-label",p.textContent=t("motivo_ts"),Object.assign(p.style,Et,{fontSize:"12px"});let x=document.createElement("input");x.type="text",Object.assign(x.style,ea);let f=document.createElement("div");f.className="js-ts-warning",f.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(f.style,Qo),l.appendChild(p),l.appendChild(x),l.appendChild(f),e.appendChild(o),e.appendChild(a),e.appendChild(l),n.onchange=()=>{l.style.display="none",Promise.resolve().then(()=>(Xe(),rt)).then(N=>N.notesState.setTagSupportUsed(!0))},s.onchange=()=>{l.style.display="block",Promise.resolve().then(()=>(Xe(),rt)).then(N=>N.notesState.setTagSupportUsed(!1))};function g(N,P){if(e.style.display="none",!N||!P||P.length===0)return;P.some(Z=>Z==="ads_conversion_tracking"||Z==="ads_enhanced_conversions")?e.style.display="block":(A(),Promise.resolve().then(()=>(Xe(),rt)).then(Z=>Z.notesState.setTagSupportUsed(!1)))}function m(){if(e.style.display==="none")return"";let N=`<br><b>Utilizou Tag Support?</b> ${n.checked?"\u2705 Sim":"\u274C N\xE3o"}`;return s.checked&&x.value.trim()!==""&&(N+=`<br><b>Motivo:</b> ${x.value}`),N+="<br>",N}function w(N){t=N,o.textContent=t("utilizou_tag_support"),p.textContent=t("motivo_ts"),f.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function A(){e.style.display="none",s.checked=!0,n.checked=!1,l.style.display="block",x.value=""}return{element:e,updateVisibility:g,getOutput:m,setLanguage:w,reset:A}}var Ot="cw_notes_parking_lot",dt="cw_notes_emergency_save";var ge={getAll:()=>{try{return JSON.parse(localStorage.getItem(Ot)||"[]")}catch{return[]}},save:t=>{let e=ge.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(Ot,JSON.stringify(e)),o},delete:t=>{let e=ge.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(Ot,JSON.stringify(e)),e},getCount:()=>ge.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(dt,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(dt);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(dt),null):!e.data||!e.data.subStatus?null:e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(dt)}};var oa="https://script.google.com/a/macros/google.com/s/AKfycby8htUKUI8dTNYBzsP-sObooNJIUi0ZepxbOaky5vRBcbbiwsItWB1KCRaXXuSIrP0DYw/exec",It="cw_data_broadcast",io="cw_data_tips",aa=["Processando...","Mantenha o foco!","Aguarde..."];function Je(t,e={}){return new Promise((o,a)=>{let n="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[n]=d=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(d)};let r=Object.keys(e).map(d=>encodeURIComponent(d)+"="+encodeURIComponent(e[d])).join("&"),s=`${oa}?op=${t}&callback=${n}&t=${Date.now()}&${r}`;i.src=s,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}async function Ue(t,e){try{console.log(`\u{1F4E4} Executando ${t}...`,e);let o=await Je(t,e);if(o&&o.status==="success")return console.log("\u2705 Sucesso:",t),o;throw console.warn("\u26A0\uFE0F Falha:",o),new Error(o.message||`Opera\xE7\xE3o ${t} falhou.`)}catch(o){throw console.error(`\u274C Erro na opera\xE7\xE3o ${t}:`,o),o}}var fe={fetchTips:async()=>{try{let t=await Je("tips");t?.tips&&localStorage.setItem(io,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await Je("broadcast");if(t?.broadcast)return localStorage.setItem(It,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(It)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(It)||"[]"),getRandomTip:()=>{let t=aa,e=localStorage.getItem(io);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await Ue("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await Ue("update_broadcast",o)},deleteBroadcast:async t=>await Ue("delete_broadcast",{id:t}),logEvent:(t,e,o="",a=null)=>{try{let n="anon";try{let r=Ee();r&&(n=r.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:n,version:"v5.1",category:t,action:e,label:o,value:a||""};Je("log",i).catch(r=>{})}catch(n){console.warn("Analytics error",n)}},logUsage:()=>{},getUserSnippets:async t=>{try{return await Je("get_user_snippets",{user:t})}catch(e){return console.warn("Erro ao buscar snippets:",e),null}},saveSnippet:async(t,e)=>{let o={...t,user:e};return await Ue("save_snippet",o)},deleteSnippet:async(t,e)=>await Ue("delete_snippet",{id:t,user:e})},ro=(t,e)=>{let o={...t,user:e,date:new Date().toISOString()};return Ue("create_bau_escalation",o)};var pt=["lucaste","ricardogi"];var se={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},ut=t=>new Promise(e=>setTimeout(e,t));function mt(t){let e=document.getElementById("cw-btn-notes");if(!e)return;let o=e.querySelector(".cw-dot-dirty");t?o||(o=document.createElement("div"),o.className="cw-dot-dirty",e.appendChild(o)):o&&o.remove()}function so(t){let e="cw-command-center-style";if(!document.getElementById(e)){let m=document.createElement("style");m.id=e,m.innerHTML=`
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
                
                background: ${se.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${se.glassBorder}; border-radius: 50px;
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
                cursor: pointer; position: relative; color: ${se.iconIdle};
                flex-shrink: 0;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn:hover {
                background: ${se.glassHighlight};
                color: ${se.iconActive};
                transform: scale(1.18) translateY(-2px) !important;
            }

            .cw-btn.notes.active { color: ${se.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${se.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${se.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${se.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${se.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${se.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${se.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${se.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${se.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${se.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${se.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${se.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${se.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${se.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${se.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${se.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${se.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${se.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${se.blue}; width: 16px; opacity: 1; }

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
            .cw-center-dots span:nth-child(1) { background-color: ${se.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${se.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${se.green}; }
            
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
            
            .cw-center-success { display: none; color: ${se.green}; margin-bottom: 10px; }
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
        `,document.head.appendChild(m)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},a=document.createElement("div");a.id="cw-floating-trigger",a.className="cw-pill side-right collapsed",a.innerHTML=`
        <div id="cw-command-center" style="display:none;"></div>
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
    `;let n=document.createElement("div");n.className="cw-focus-backdrop",document.body.appendChild(n),document.body.appendChild(a);let i=(m,w)=>{G.playClick(),a.querySelector(`.${m}`).classList.toggle("active"),w()};if(a.querySelector(".notes").onclick=m=>{m.stopPropagation(),i("notes",t.toggleNotes)},a.querySelector(".bauform").onclick=m=>{m.stopPropagation(),i("bauform",t.toggleBAUForm)},a.querySelector(".email").onclick=m=>{m.stopPropagation(),i("email",t.toggleEmail)},a.querySelector(".script").onclick=m=>{m.stopPropagation(),i("script",t.toggleScript)},a.querySelector(".links").onclick=m=>{m.stopPropagation(),i("links",t.toggleLinks)},a.querySelector(".library").onclick=m=>{m.stopPropagation(),i("library",t.toggleLibrary)},a.querySelector(".timezone").onclick=m=>{m.stopPropagation(),i("timezone",t.toggleTimezone)},a.querySelector(".configs").onclick=m=>{m.stopPropagation(),i("configs",t.toggleConfigs)},a.querySelector(".broadcast").onclick=m=>{m.stopPropagation(),i("broadcast",()=>{let w=m.currentTarget.querySelector(".cw-badge");w&&w.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},a.querySelectorAll(".cw-btn").forEach(m=>{m.addEventListener("mouseenter",()=>G.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let m=document.createElement("div");m.className="cw-badge",a.querySelector(".broadcast").appendChild(m)}let r=null;a.onmouseleave=()=>{a.querySelector(".cw-btn.active")||a.classList.contains("processing-center")||(r=setTimeout(()=>{a.classList.add("collapsed")},3e3))},a.onmouseenter=()=>{r&&clearTimeout(r)},(async function(){let w=()=>{let N=Ee();if(N){let P=N.split("@")[0].toLowerCase();if(pt.includes(P)){let R=a.querySelector("#cw-admin-tag");R&&R.classList.add("visible")}}else setTimeout(w,2e3)};w(),await ut(2800),a.classList.add("docked"),await ut(300);let A=a.querySelectorAll(".cw-btn");a.querySelectorAll(".cw-sep").forEach(N=>N.classList.add("visible"));for(let N=0;N<A.length;N++)A[N].classList.add("popped"),await ut(90);await ut(200),a.classList.add("system-check")})();let s=!1,d,u,l,p,x=3;a.onmousedown=m=>{if(m.target.closest("button"))return;m.preventDefault(),d=m.clientX,u=m.clientY;let w=a.getBoundingClientRect();l=w.left,p=w.top,document.addEventListener("mousemove",f),document.addEventListener("mouseup",g)};function f(m){let w=m.clientX-d,A=m.clientY-u;!s&&Math.sqrt(w*w+A*A)>x&&(s=!0,a.classList.add("dragging"),a.style.transition="none",r&&clearTimeout(r)),s&&(a.style.left=`${l+w}px`,a.style.top=`${p+A}px`,a.style.right="auto",a.style.bottom="auto",a.style.transform="none")}function g(m){if(document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",g),s){s=!1,a.classList.remove("dragging");let w=window.innerWidth,A=window.innerHeight,N=a.getBoundingClientRect(),P=N.left+N.width/2,R;P<w/2?(R=24,a.classList.remove("side-right"),a.classList.add("side-left")):(R=w-N.width-24,a.classList.remove("side-left"),a.classList.add("side-right"));let Z=Math.max(24,Math.min(N.top,A-N.height-24));setTimeout(()=>{a.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),a.style.left=`${R}px`,a.style.top=`${Z}px`,a.style.bottom="auto",a.style.transform=""},10),setTimeout(()=>{a.style.transition="",a.style.removeProperty("transition")},700)}else{let w=a.querySelector(".cw-btn.active"),A=m.target.closest("button");if(a.classList.contains("collapsed")){let N=a.getBoundingClientRect(),P=window.innerHeight,R=N.top>P/2;if(a.style.setProperty("transition","none","important"),R){let Z=P-N.bottom;a.style.top="auto",a.style.bottom=`${Z}px`}else a.style.bottom="auto",a.style.top=`${N.top}px`;a.offsetWidth,a.style.removeProperty("transition"),a.classList.remove("collapsed"),G.playGenieOpen()}else!w&&!A&&(a.classList.add("collapsed"),G.playGenieOpen());A&&(A.style.transform="scale(0.9)",setTimeout(()=>A.style.transform="",150))}}}function Ze(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${fe.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let a=document.createElement("div");a.className="cw-abort-btn",a.textContent="Cancelar",a.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,W("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(a),t.appendChild(o);let n=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let r=Date.now()-n,s=Math.max(0,2e3-r);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let d=o.querySelector(".cw-center-dots"),u=o.querySelector(".cw-center-text"),l=o.querySelector(".cw-center-success"),p=o.querySelector(".cw-abort-btn");d&&(d.style.display="none"),u&&(u.style.display="none"),p&&(p.style.display="none"),l&&l.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},s)}}function lo(t){let{onSaveCurrent:e,onLoadDraft:o,t:a}=t,n=document.createElement("button");n.className="js-btn-park",n.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${a("guardar")}</span>
    `,n.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${de.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${B.surface};
        color: ${B.textSub};
        border: 1px solid ${B.border};
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ${le};
        box-shadow: ${ze.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",n.style.transform="translateY(-1px)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",n.style.transform="translateY(0)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1) translateY(-1px)",n.onclick=async()=>{if(await xe("Deseja guardar o rascunho atual e limpar os campos?"))try{let m=await e();m?(ge.save(m),f(),s(),G.playSuccess(),W("Rascunho salvo com sucesso!")):W("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(m){console.error("Erro ao salvar rascunho:",m),W("Erro ao salvar.",{error:!0})}};let i=document.createElement("div");i.title="Meus Rascunhos",i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=document.createElement("div");r.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(r),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=g=>{g.stopPropagation(),x()};function s(){let g=ge.getCount();mt(g>0),g>0?(r.style.display="block",r.textContent=g,r.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):r.style.display="none"}let d=document.createElement("div");d.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${B.surface}; z-index: 100;
        border-radius: ${de.large} ${de.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${le};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let u=document.createElement("div");u.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",u.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${a("rascunhos_salvos")}</span>`;let l=document.createElement("button");l.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',l.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",l.onmouseenter=()=>l.style.background="#F1F3F4",l.onmouseleave=()=>l.style.background="transparent",l.onclick=()=>x(!1),u.appendChild(l);let p=document.createElement("div");p.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",d.appendChild(u),d.appendChild(p);function x(g){let m=d.style.transform==="translateY(0%)";(g!==void 0?g:!m)?(f(),d.style.transform="translateY(0%)"):d.style.transform="translateY(110%)"}function f(){let g=ge.getAll();if(p.innerHTML="",g.length===0){p.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${B.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${a("nenhum_rascunho")}</div>
                </div>`;return}g.forEach(m=>{let w=document.createElement("div");w.style.cssText=`
                background: ${B.surface}; padding: 20px; border-radius: ${de.large};
                border: 1.5px solid ${B.bgInput}; box-shadow: ${ze.subtle};
                position: relative; transition: all 0.3s ${le};
            `;let N=new Date(m.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),P="";m.summaryTags&&m.summaryTags.length>0&&(P=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${m.summaryTags.slice(0,3).join(", ")+(m.summaryTags.length>3?"...":"")}</div>`),w.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${m.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${N}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${m.cid||"---"}</span>
                    <span style="display:block; color:${m.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${m.subStatus||m.status||"Sem Status"}</span>
                    ${P}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let R=w.querySelector(".cw-resume-btn");R.onclick=async()=>{await xe("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(m),ge.delete(m.id),f(),s(),x(!1),G.playSwoosh(),W("Rascunho carregado."))};let Z=w.querySelector(".cw-del-btn");Z.onclick=async()=>{await xe("Excluir este rascunho?",{danger:!0})&&(ge.delete(m.id),f(),s())},p.appendChild(w)})}return s(),{parkButton:n,historyBtnWrapper:i,drawer:d}}var co=t=>new Promise(e=>setTimeout(e,t));function gt(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function Qe(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let a=window.getSelection();a.removeAllRanges(),a.addRange(o);try{document.execCommand("copy")}catch{W("Falha ao copiar",{error:!0})}a.removeAllRanges(),document.body.removeChild(e)}function bt(t){["input","change","keydown","keyup"].forEach(o=>{let a=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(a)})}function po(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function ft(){console.log("Iniciando processo de Nova Nota...");let t=po(),e=t.length,a=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(a){let r=a.closest("material-fab")||a.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),gt(r)):gt(a)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let s=r.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),gt(s)):r.click(),await co(800);let u=Array.from(document.querySelectorAll("i.material-icons-extended")).find(l=>l.innerText.trim()==="description");u&&gt(u)}}let n=null,i=0;for(;!n&&i<20;){await co(300);let r=po();if(r.length>e)n=r.find(s=>!t.includes(s)),n||(n=r[r.length-1]);else if(i>10){let s=r.filter(d=>d.offsetParent!==null);s.length>0&&(n=s[s.length-1])}i++}return n}function uo(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let a=document.createElement("div");a.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(a),e.appendChild(o),o.addEventListener("scroll",()=>{a.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let n={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function r({id:P,label:R,type:Z="text",placeholder:J="",required:_=!1,parent:F=o}){let $=document.createElement("div");$.style.cssText=n.inputWrapper;let j=document.createElement("label");j.style.cssText=n.label,j.innerHTML=`${R} ${_?'<span style="color:#D93025">*</span>':""}`;let q;return Z==="textarea"?(q=document.createElement("textarea"),q.style.cssText=n.input+n.textarea):(q=document.createElement("input"),q.type=Z,q.style.cssText=n.input),q.id=P,q.placeholder=J,q.addEventListener("focus",()=>{q.style.borderColor="#1a73e8",q.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),q.addEventListener("blur",()=>{q.style.borderColor="#DADCE0",q.style.boxShadow="none",_&&q.value.trim()!==""&&(q.style.backgroundColor="#FFF")}),i[P]={input:q,wrapper:$,required:_},$.appendChild(j),$.appendChild(q),F.appendChild($),$}function s({id:P,label:R,options:Z=["Yes","No"],defaultValue:J="No",onChange:_=null}){let F=document.createElement("div");F.style.cssText=n.inputWrapper;let $=document.createElement("label");$.style.cssText=n.label,$.textContent=R,F.appendChild($);let j=document.createElement("div");j.style.cssText=n.radioGroup;let q=document.createElement("input");return q.type="hidden",q.id=P,q.value=J,F.appendChild(q),Z.forEach(k=>{let S=document.createElement("div");S.textContent=k,S.style.cssText=n.radioLabel,k===J&&(S.style.cssText+=n.radioActive),S.onclick=()=>{Array.from(j.children).forEach(b=>b.style.cssText=n.radioLabel),S.style.cssText+=n.radioActive,q.value=k,_&&_(k)},j.appendChild(S)}),i[P]={input:q,wrapper:F,required:!1},F.appendChild(j),o.appendChild(F),F}let d=document.createElement("div");d.style.cssText=n.banner,d.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(d);let u=document.createElement("div");u.style.marginBottom="24px";let l=document.createElement("button");l.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",l.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",l.onmouseover=()=>l.style.background="#E1EFFF",l.onmouseout=()=>l.style.background="#F0F7FF",u.appendChild(l),o.appendChild(u);let p=document.createElement("div");p.style.cssText=n.section,p.innerHTML=`<div style="${n.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(p),r({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:p}),r({id:"ga4",label:"GA4 Property ID",parent:p}),r({id:"gtm",label:"GTM Container ID",parent:p});let x=document.createElement("div");x.style.cssText=n.hiddenField,p.appendChild(x),s({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:P=>{P==="Yes"?x.style.cssText=n.visibleField+"margin-bottom:14px;":(x.style.cssText=n.hiddenField,i.accessEmail.input.value="")}}),r({id:"accessEmail",label:"User Access Email",parent:x}),s({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let f=document.createElement("div");f.style.cssText=n.section,f.innerHTML=`<div style="${n.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(f),r({id:"name",label:"Advertiser Name",required:!0,parent:f}),r({id:"url",label:"Website URL",parent:f}),r({id:"phone",label:"Phone Number",parent:f}),r({id:"email",label:"Contact Email",parent:f}),r({id:"callback",label:"Preferred Callback Time (Timezone)",parent:f}),r({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:f}),r({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:f}),r({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:f});let g=document.createElement("div");g.style.cssText=n.section,g.innerHTML=`<div style="${n.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(g),r({id:"cc_adv",label:"Advertiser Contact",parent:g}),r({id:"cc_am",label:"Account Manager",parent:g});let m=document.createElement("div");m.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let w=document.createElement("button");w.innerHTML="Voltar",w.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",w.onclick=t;let A=document.createElement("button");A.textContent="Gerar Nota",A.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",m.appendChild(w),m.appendChild(A),e.appendChild(m),l.onclick=async()=>{let P=l.innerHTML;l.innerHTML="\u23F3 Buscando dados...";try{let R=await we(),Z=0,J=($,j)=>{let q=i[$];j&&q&&q.input.value===""&&(q.input.value=j,q.input.style.backgroundColor="#E6F4EA",q.input.style.borderColor="#34A853",setTimeout(()=>{q.input.style.backgroundColor="#FFF",q.input.style.borderColor="#DADCE0"},1e3),Z++)};J("name",R.advertiserName),J("url",R.websiteUrl),R.clientEmail&&(J("email",R.clientEmail),J("cc_adv",R.clientEmail));let F=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);F&&J("cid",F[0]),Z>0?W(`${Z} campos preenchidos!`):W("Nenhum dado novo encontrado.")}catch(R){console.error(R),W("Erro ao ler p\xE1gina.")}finally{l.innerHTML=P}};let N=()=>{let P=!0,R=null;return Object.values(i).forEach(Z=>{Z.required&&!Z.input.value.trim()&&(P=!1,Z.input.style.cssText+=n.inputError,Z.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),R||(R=Z.input))}),R&&R.scrollIntoView({behavior:"smooth",block:"center"}),P};return A.onclick=async()=>{if(!N()){W("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let P=$=>i[$].input.value||"N/A",R=P("hasAccess"),Z=R==="Yes"?P("accessEmail"):"N/A",_=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${P("cid")}
<b>GA4 ID:</b> ${P("ga4")}
<b>GTM ID:</b> ${P("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${R==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${Z}
<b>Ghosting Access Available (Y/N):</b> ${P("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${P("name")}
<b>Website:</b> ${P("url")}
<b>Phone Number:</b> ${P("phone")}
<b>Preferred Callback:</b> ${P("callback")}
<b>Email Address:</b> ${P("email")}

<b>Detailed Issue Description:</b>
${P("desc")}

<b>Uncropped screenshots:</b>
${P("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${P("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${P("cc_adv")}
<b>Account Manager:</b> ${P("cc_am")}
`.replace(/\n/g,"<br>");Qe(_);let F=await ft();F?(F.innerText.trim()===""&&(F.innerHTML=""),document.execCommand("insertHTML",!1,_),bt(F),W("Nota gerada e inserida!")):W("Copiado! Abra uma nota para colar.")},e}var be=t=>new Promise(e=>setTimeout(e,t));function ye(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function Fe(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function xt(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,a=document.getElementById(o);a&&a.remove();let n=t.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
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
    `;let r=i.querySelector(".cw-close-btn");r.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&r.click()},25e3)}async function ht(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await be(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await be(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Lt(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let a=o.offsetParent!==null,n=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return a&&!n&&i});return e&&ye("Editor visualmente detectado.","success"),e}async function mo(){ye("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="email");if(o&&o.offsetParent!==null){ye("Bot\xE3o de email direto encontrado.");let p=o.closest("material-button")||o.closest("material-fab")||o;Fe(p),t=!0}else{ye("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let p=document.querySelector("material-fab-speed-dial");if(p){let x=p.querySelector(".trigger");if(x){Fe(x),await be(800);let g=Array.from(document.querySelectorAll("i.material-icons-extended")).find(m=>m.innerText.trim()==="email");g&&(Fe(g),t=!0)}}}if(!t)return W("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ye("\u{1F680} FASE 2: Verificando rascunhos...");let a=null,n=0,i=20;for(;n<i;){await be(250);let p=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(a=Array.from(p).find(x=>x.offsetParent!==null),a){ye("\u26A0\uFE0F Rascunho detectado!","warn");break}n++}if(a){ye("\u{1F5D1}\uFE0F Descartando..."),Fe(a),a.click();let p=null,x=0;for(;x<15;){await be(300);let f=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(p=Array.from(f).find(g=>g.offsetParent!==null),p)break;x++}p&&(Fe(p),W("Limpando rascunho antigo...",{duration:2e3}),await be(2500))}ye("\u{1F680} FASE 3: Buscando editor final...");let r=0,s=null;for(;r<20&&(s=Lt(),!s);)await be(250),r++;if(!s)return W("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let d=s.closest('[id="email-body-content-top"]'),l=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(d){if(l){let x=l.closest('[aria-hidden="true"]');x&&x.removeAttribute("aria-hidden"),l.focus(),Fe(l)}await be(300),d.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let p=d.querySelector("#cases-body-field");if(p){let x=document.createRange();x.selectNodeContents(p),x.collapse(!0);let f=window.getSelection();f.removeAllRanges(),f.addRange(x)}return!0}return!1}async function yt(t){if(!t||!await mo())return;let o=await we();ye("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let a=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(a&&(a.click(),await be(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await ht(i,o.clientEmail),xt(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await ht(i,o.internalEmail),xt(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await be(500);let n=document.querySelector('material-button[debug-id="canned_response_button"]');if(n){Fe(n),await be(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Fe(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),ye("\u23F3 Buscando resultado da Canned Response...","info");let r=null,s=0,d=15e3,u=500;for(;s<d&&(r=document.querySelector("material-select-dropdown-item"),!r);)await be(u),s+=u;if(r){Fe(r),await be(1500);let l=Lt();if(l){let x=Array.from(l.querySelectorAll("span.field")).filter(g=>g.innerText.includes("{Requested Task Type}"));if(x.length>0){let g=x.map(w=>w.closest("tr")).filter(w=>w!==null),m=[...new Set(g)];if(m.length>0){let A=m[0].querySelector('td[width="100%"]');A&&(A.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let N=1;N<m.length;N++)m[N].remove()}}let f=l.innerHTML;o.advertiserName&&f.includes("{%ADVERTISER_NAME%}")&&(f=f.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),f.includes("{%^79285%}")&&(f=f.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),l.innerHTML=f}W("Canned Response aplicada!")}else ye(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),W(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else W("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function go(t){if(ye(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await mo())return;let o=await we(),a=We();await be(600);let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await be(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await ht(s,o.clientEmail),xt(s,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await ht(s,o.internalEmail),xt(s,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await be(300));let r=Lt();if(r){let d=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');d&&(d.focus(),Fe(d));let u=new Date;u.setDate(u.getDate()+3);let l=u.getDay();l===6?u.setDate(u.getDate()+2):l===0&&u.setDate(u.getDate()+1);let p=u.toLocaleDateString("pt-BR"),x=t.body;x=x.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),x=x.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),x=x.replace(/\[URL\]/g,o.websiteUrl||"seu site"),x=x.replace(/\[Seu Nome\]/g,a),x=x.replace(/\[MM\/DD\/YYYY\]/g,p),document.execCommand("insertHTML",!1,x),d&&(d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0}))),W("Email preenchido com sucesso!",{duration:2e3}),ye("\u2705 Processo finalizado com sucesso.","success")}else W("Erro ao focar no editor.",{error:!0})}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function ue(t,e,o){let a=document.getElementById(o);if(!e)return;let n=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(a){let l=a.getBoundingClientRect();i.x=l.left+l.width/2,i.y=l.top+l.height/2}let r,s;if(!n)r=window.innerWidth/2,s=window.innerHeight/2;else{let l=e.getBoundingClientRect();r=l.left+l.width/2,s=l.top+l.height/2,r===0&&s===0&&(r=window.innerWidth/2,s=window.innerHeight/2)}let d=i.x-r,u=i.y-s;t?(G.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",n?e.style.transform=`translate(${d}px, ${u}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${d}px), calc(-50% + ${u}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),a&&a.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",n?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof bo=="function"&&bo(e,o)):(G.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",n?e.style.transform=`translate(${d}px, ${u}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${d}px), calc(-50% + ${u}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),a&&a.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof qt=="function"&&qt(e))}function bo(t,e){qt(t);let o=a=>{if(!t.classList.contains("open"))return;let n=t.contains(a.target),i=document.querySelector(".cw-pill"),r=i&&i.contains(a.target);n?(t.classList.remove("idle"),t.style.zIndex="2147483648"):r||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function qt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function fo(){let t="v4.0.0",{popup:e,content:o,header:a,animRefs:n,credit:i}=Zt(t,J),r=no(y),s=ao(()=>{k(),U.setActiveTasks(s.getCheckedElements())},y,U),d=document.createElement("div");d.style.display="none";let u=oo((c,v)=>{S(c,v)});d.appendChild(u);let l=lo({onSaveCurrent:async()=>{let c=await D();return I(),c},onLoadDraft:c=>{Y(c)},t:c=>y(c)}),p=F(),x=$(),f=document.createElement("div"),g=K(),m=O(l,y);o.appendChild(p),o.appendChild(x),o.appendChild(g),o.appendChild(d),o.appendChild(f),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none";let w=document.createElement("button");w.id="manual-task-toggle",w.textContent=y("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",w.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${B.primary}; background: ${B.surface}; color: ${B.primary}; border-radius: ${de.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${le}; text-transform: uppercase; letter-spacing: 0.5px;`,w.onmouseenter=()=>{w.style.background=B.primaryBg},w.onmouseleave=()=>{w.style.background=B.surface},w.onclick=()=>{s.selectionElement.style.display="block",s.screenshotsElement.style.display="block",w.style.display="none"},o.appendChild(w),o.appendChild(s.selectionElement),o.appendChild(r.element),o.appendChild(s.screenshotsElement),o.appendChild(m);let A=document.createElement("div");A.style.display="none",A.style.flexGrow="1",A.style.minHeight="0",A.style.overflow="hidden";let N=uo(()=>_());N.style.height="100%",A.appendChild(N),e.insertBefore(A,i);let P=a.lastElementChild;P&&(P.insertBefore(l.historyBtnWrapper,P.firstChild),P.insertBefore(V(),P.firstChild)),e.appendChild(l.drawer);let R=null;U.subscribe(c=>{E(c),Z(),c.isDirty?(R&&clearTimeout(R),R=setTimeout(async()=>{let v=await D(!0);v.subStatus?ge.saveEmergency(v):ge.clearEmergency(),c.isDirty=!1},2e3)):R&&(clearTimeout(R),R=null)});function Z(){let c=ge.getCount()>0,v=!!U.currentSubStatus;mt(c||v)}function J(){U.visible=!U.visible,ue(U.visible,e,"cw-btn-notes")}function _(){U.isSplitView=!U.isSplitView,U.isSplitView?(o.style.display="none",A.style.display="flex",A.style.flexDirection="column",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",A.style.display="none",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function F(){let c=document.createElement("div");if(c.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-idioma" style="font-size: 10px; margin-bottom: 6px;">${y("idioma")}</div>
                    <div class="cw-segmented-control" id="lang-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-lang="pt" class="active" style="z-index:2">PT</button>
                        <button data-lang="es" style="z-index:2">ES</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${y("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${y("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${y("nao")}</button>
                        <button data-val="true" style="z-index:2">${y("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let h=document.createElement("style");h.id="cw-segmented-styles",h.innerHTML=`
                .cw-segmented-control {
                    display: flex;
                    background: ${B.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${B.border};
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
                    transition: all 0.3s ${le};
                    color: ${B.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${B.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${B.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `,document.head.appendChild(h)}let v=(h,M)=>{let X=c.querySelector(`#${h}`).querySelector(".cw-segmented-indicator");X&&(X.style.transform=`translateX(${M*100}%) translateX(${M*2}px)`)};return c.querySelectorAll("#lang-selector button").forEach((h,M)=>{h.onclick=()=>{U.setLanguage(h.dataset.lang),c.querySelectorAll("#lang-selector button").forEach(L=>L.classList.remove("active")),h.classList.add("active"),v("lang-selector",M),G.playHover(),U.currentSubStatus&&q(U.currentSubStatus)}}),c.querySelectorAll("#type-selector button").forEach((h,M)=>{h.onclick=()=>{U.setCaseType(h.dataset.type),c.querySelectorAll("#type-selector button").forEach(L=>L.classList.remove("active")),h.classList.add("active"),v("type-selector",M),G.playHover(),U.currentSubStatus&&q(U.currentSubStatus)}}),c.querySelectorAll("#portugal-selector button").forEach((h,M)=>{h.onclick=()=>{U.setPortugalCase(h.dataset.val==="true"),c.querySelectorAll("#portugal-selector button").forEach(L=>L.classList.remove("active")),h.classList.add("active"),v("portugal-selector",M),G.playHover(),U.currentSubStatus&&q(U.currentSubStatus)}}),c}function $(){let c=document.createElement("div");c.className="cw-status-section",c.style.cssText="display: flex; flex-direction: column; gap: 8px;",c.innerHTML=`
            <div class="cw-section-title js-label-status" style="margin-top: 8px;">${y("status_principal")}</div>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${y("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <div class="cw-section-title js-label-substatus" style="margin-top: 8px;">${y("substatus")}</div>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${y("select_substatus")}</option>
            </select>
        `;let v=c.querySelector("#main-status-select"),h=c.querySelector("#sub-status-select");return v.onchange=()=>{U.setStatus(v.value),j(v.value,h),U.setSubStatus(""),q("")},h.onchange=()=>{U.setSubStatus(h.value),q(h.value)},c}function j(c,v){if(v.innerHTML=`<option value="">${y("select_substatus")}</option>`,!c){v.disabled=!0;return}for(let h in ke)if(ke[h].status===c){let M=document.createElement("option");M.value=h,M.textContent=ke[h].name,v.appendChild(M)}v.disabled=!1}function q(c){if(u.render&&u.render(c,U.currentCaseType),!c){d.style.display="none",f.style.display="none",document.getElementById("manual-task-toggle").style.display="none",s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",g.style.display="flex",g.style.opacity="1",m.style.display="none";return}g.style.opacity="0",setTimeout(()=>{U.currentSubStatus&&(g.style.display="none")},400),m.style.display="grid";let v=ke[c];v&&v.templateFields&&U.setActiveFields(v.templateFields),T(),kt(c,f,U),f.style.display="block",d.style.display="block";let h=c.startsWith("SO_"),M=c==="NI_Awaiting_Validation",L=document.getElementById("manual-task-toggle");h||M?(s.selectionElement.style.display="block",L.style.display="none"):(s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",L.style.display="block");let X=c==="SO_Education_Only"?"education":"implementation";U.setScreenshotMode(X),U.currentCaseType==="lm"?U.toggleFieldExclusion("field-ON_CALL",!0):U.toggleFieldExclusion("field-ON_CALL",!1),s.updateSubStatus(c),k();let H=document.getElementById("email-automation-toggle-row");H&&(H.style.display=He[c]?"flex":"none")}function k(){let c=s.getCheckedElements().map(v=>v.value);r.updateVisibility(U.currentSubStatus,c)}function S(c,v){let h=lt[c];if(h){for(let M in h)if(M==="linkedTask")s.toggleTask(h.linkedTask,v);else if(M==="activeTasks")h.activeTasks.forEach(L=>{v?s.setTaskCount(L.value,L.count):s.setTaskCount(L.value,0)});else if(M.startsWith("field-")){let L=M,X=h[M],H=document.getElementById(L);if(H){let ee=Ge.includes(L.replace("field-",""));if(v)if(ee){let ae=H.value.trim();ae.includes(X.trim())||(H.value=ae?ae+`
`+X.trim():X.trim())}else H.value=X;else if(ee){let ae=H.value.trim(),Q=X.trim();ae.includes(Q)&&(H.value=ae.replace(Q,"").trim().replace(/\n{3,}/g,`

`))}else H.value.trim()===X.trim()&&(H.value="");U.updateField(L,H.value),H.dispatchEvent(new Event("input"))}}}}function O(c,v){let h=document.createElement("div");if(h.className="cw-actions-section",h.style.cssText=`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${B.bgInput};
            border-radius: 12px;
            border: 1px solid ${B.border};
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
                    border-color: ${B.primary} !important;
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
                    color: ${B.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `,document.head.appendChild(ae)}let M=document.createElement("div");M.id="email-automation-toggle-row",M.style.cssText="grid-column: span 2; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",M.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${B.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${B.primary};">
                <span class="js-label-email-toggle">${v("preencher_email_automaticamente")}</span>
            </label>
        `;let L=c.parkButton;L.classList.add("js-btn-park"),L.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let X=document.createElement("button");X.className="cw-btn-secondary js-btn-reset",X.textContent=v("limpar"),X.style.cssText=`width: 100%; height: 34px; background: ${B.surface}; color: ${B.textSub}; border: 1px solid ${B.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,X.onclick=()=>I();let H=document.createElement("button");H.className="cw-btn-secondary js-btn-copy",H.textContent=v("copiar"),H.style.cssText=`width: 100%; height: 34px; background: ${B.surface}; color: ${B.primary}; border: 1px solid ${B.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,H.onclick=()=>b();let ee=document.createElement("button");return ee.className="cw-btn-primary js-btn-generate",ee.textContent=v("preencher"),ee.style.cssText=`width: 100%; height: 38px; background: ${B.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: span 2; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,ee.onclick=()=>C(),h.appendChild(M),h.appendChild(L),h.appendChild(X),h.appendChild(H),h.appendChild(ee),h}async function b(){if(!U.currentSubStatus){W(y("select_substatus"),{error:!0});return}let c=Ft(U,s,r);c?(Qe(c),W(y("copiado_sucesso")),G.playClick()):W(y("select_substatus"),{error:!0})}async function C(){if(!U.currentSubStatus){W(y("select_substatus"),{error:!0});return}let c=Ft(U,s,r);Qe(c),J();let v=Ze(),h=await ft();if(h){h.focus(),document.execCommand("insertHTML",!1,c),bt(h);let M=document.getElementById("email-automation-checkbox");(!M||M.checked)&&U.currentSubStatus&&He[U.currentSubStatus]&&await yt(He[U.currentSubStatus]),W(y("inserido_copiado")),G.playSuccess(),I()}v()}function T(){if(U.currentSubStatus){if(U.currentCaseType==="lm")U.removeField("ON_CALL");else{let c=ke[U.currentSubStatus];c&&c.templateFields.includes("ON_CALL")&&U.addFieldAt("ON_CALL",1)}U.isPortugalCase?(U.addFieldAt("CASO_PORTUGAL",1),U.addFieldAt("CONSENTIU_GRAVACAO",2)):(U.removeField("CASO_PORTUGAL"),U.removeField("CONSENTIU_GRAVACAO"))}}function I(){U.reset(),s.reset(),r.reset(),Z(),ge.clearEmergency(),o.querySelectorAll("select").forEach(v=>v.value=""),o.querySelector("#sub-status-select").disabled=!0;let c=document.getElementById("email-automation-toggle-row");c&&(c.style.display="none"),f.innerHTML="",d.style.display="none",g.style.display="flex",g.style.opacity="1",m.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none"}async function D(c=!1){let v={};f.querySelectorAll("input, textarea, select").forEach(H=>{(H.id.startsWith("field-")||H.id==="consent-select")&&(v[H.id]=H.value)});let h="Cliente",M="---";if(!c)try{let H=await we();h=H.advertiserName,M=H.cid}catch(H){console.warn("Erro ao coletar pageData:",H)}let L=s.getCheckedElements().map(H=>({key:H.value,count:H.count})),X=L.map(H=>{let ee=Ce[H.key];return ee?ee.name:H.key});return{currentCaseType:U.currentCaseType,currentLang:U.currentLang,isPortugalCase:U.isPortugalCase,consent:U.consent,tagSupportUsed:U.tagSupportUsed,forcedScreenshots:[...U.forcedScreenshots],excludedFields:[...U.excludedFields],activeFields:U.activeFields,status:U.currentStatus,subStatus:U.currentSubStatus,formData:v,activeTasks:L,summaryTags:X,clientName:h,cid:M,timestamp:new Date().toISOString()}}let z=c=>new Promise(v=>setTimeout(v,c));async function Y(c){U.setLanguage(c.currentLang||"pt"),U.setCaseType(c.currentCaseType||"bau"),U.setPortugalCase(c.isPortugalCase||!1),U.setConsent(c.consent||!1),U.setExcludedFields(c.excludedFields||[]),c.activeFields&&U.setActiveFields(c.activeFields);let v=o.querySelector(`#lang-selector button[data-lang="${U.currentLang}"]`);v&&v.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach(L=>{L!==v&&L.classList.remove("active")});let h=o.querySelector(`#type-selector button[data-type="${U.currentCaseType}"]`);h&&h.classList.add("active"),o.querySelectorAll("#type-selector button").forEach(L=>{L!==h&&L.classList.remove("active")});let M=o.querySelector(`#portugal-selector button[data-val="${U.isPortugalCase}"]`);if(M&&M.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach(L=>{L!==M&&L.classList.remove("active")}),c.status){let L=o.querySelector("#main-status-select");L.value=c.status,U.setStatus(c.status);let X=o.querySelector("#sub-status-select");if(j(c.status,X),await z(50),c.subStatus){if(X.value=c.subStatus,U.setSubStatus(c.subStatus),q(c.subStatus),await z(100),c.tagSupportUsed!==void 0){U.setTagSupportUsed(c.tagSupportUsed);let H=r.element.querySelector('input[value="Sim"]'),ee=r.element.querySelector('input[value="N\xE3o"]');c.tagSupportUsed&&H?H.checked=!0:ee&&(ee.checked=!0),r.element.querySelector("div:last-child").style.display=c.tagSupportUsed?"none":"block"}c.forcedScreenshots&&U.setForcedScreenshots(c.forcedScreenshots);for(let H in c.formData){let ee=document.getElementById(H);ee&&(ee.value=c.formData[H],U.updateField(H,ee.value))}c.activeTasks&&(c.activeTasks.forEach(H=>s.setTaskCount(H.key,H.count)),U.setActiveTasks(s.getCheckedElements()))}}U.isDirty=!1}function y(c){return Se[U.currentLang]?.[c]||Se.pt?.[c]||c}function V(){let c=document.createElement("div");return c.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',c.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",c.onclick=v=>{v.stopPropagation(),_()},c.title="Alternar para Split & Transfer",c}function K(){let c=document.createElement("div");return c.id="notes-empty-state",c.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${le};
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
                <div style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${B.text}; margin-bottom: 4px;">
                    ${y("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${B.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${y("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,c}function E(c){let v=o.querySelector(".js-label-idioma");v&&(v.textContent=y("idioma"));let h=o.querySelector(".js-label-fluxo");h&&(h.textContent=y("fluxo"));let M=o.querySelector(".js-label-portugal");M&&(M.textContent=y("caso_portugal"));let L=o.querySelector(".js-label-status");L&&(L.textContent=y("status_principal"));let X=o.querySelector(".js-label-substatus");X&&(X.textContent=y("substatus"));let H=o.querySelector(".js-btn-copy");H&&(H.textContent=y("copiar"));let ee=o.querySelector(".js-btn-generate");ee&&(ee.textContent=y("preencher"));let ae=o.querySelector(".js-btn-reset");ae&&(ae.textContent=y("limpar"));let Q=document.getElementById("manual-task-toggle");Q&&(Q.textContent=y("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let oe=o.querySelector(".js-btn-park span");oe&&(oe.textContent=y("guardar"));let te=e.querySelector(".js-drawer-title");te&&(te.textContent=y("rascunhos_salvos"));let re=o.querySelector(".js-label-email-toggle");re&&(re.textContent=y("preencher_email_automaticamente")),r&&r.setLanguage&&r.setLanguage(y),s&&s.setLanguage&&s.setLanguage(y)}return g.style.display="flex",m.style.display="none",U.setLanguage("pt"),U.setCaseType("bau"),Z(),setTimeout(async()=>{let c=ge.getEmergency();c&&(await xe("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?(Y(c),W("Sess\xE3o restaurada!")):ge.clearEmergency())},3e3),document.body.appendChild(e),J}var xo=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}];var ho={_templates:null,async getTemplates(){return this._templates?this._templates:(this._templates=xo,this._templates)}};var yo="cw_personal_library_v1",Ve=!1,he={getSnippets:(t="all")=>{let e=he._loadFromLocal(),o=Ee();return o&&o.includes("@")&&!Ve&&he._syncWithServer(o),t==="all"?e:e.filter(a=>a.type===t)},save:async t=>{let e=Ee();if(!e)return W("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;Ve=!0;let o=he._loadFromLocal(),a=new Date().toISOString(),n={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:a},i=o.filter(r=>r.id!==n.id);return i.unshift(n),he._saveToLocal(i),fe.saveSnippet(n,e).then(r=>{r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais."),setTimeout(()=>{Ve=!1},2e3)}),n},delete:async t=>{let e=Ee();Ve=!0;let a=he._loadFromLocal().filter(n=>n.id!==t);return he._saveToLocal(a),e?fe.deleteSnippet(t,e).then(()=>{setTimeout(()=>{Ve=!1},2e3)}):Ve=!1,!0},_syncWithServer:async t=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let e=await fe.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,a=he._loadFromLocal(),n=JSON.stringify(o),i=JSON.stringify(a);n!==i&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),he._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(yo)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem(yo,JSON.stringify(t))}};function vo(){let t="v6.0.0",e=!1,o=[],a=null,n="",i="Todos",r=new Set,s={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"},d=document.createElement("div");d.id="email-assistant-popup",d.classList.add("cw-module-window");let u=document.createElement("style");u.textContent=`
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
    `,document.head.appendChild(u),Object.assign(d.style,me,{width:"850px",height:"650px",display:"none",flexDirection:"column",fontFamily:"'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",borderRadius:"12px",overflow:"hidden"});let l=pe(d,"Email Assistant",t,"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",{popup:d},()=>S()),p=document.createElement("div");Object.assign(p.style,{display:"flex",flex:"1",overflow:"hidden",backgroundColor:s.bgApp});let x=document.createElement("div");Object.assign(x.style,{width:"320px",backgroundColor:"#EFEFF0",borderRight:`1px solid ${s.borderSubtle}`,display:"flex",flexDirection:"column",flexShrink:"0"});let f=document.createElement("div");Object.assign(f.style,{padding:"16px",borderBottom:`1px solid ${s.borderSubtle}`,position:"relative"});let g=document.createElement("input");g.placeholder="Buscar templates...",Object.assign(g.style,{width:"100%",padding:"10px 14px 10px 36px",borderRadius:"10px",border:"1.5px solid transparent",backgroundColor:"#E3E3E8",fontSize:"15px",outline:"none",boxSizing:"border-box",color:s.textPrimary,backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",transition:"all 0.2s ease-in-out"}),g.onfocus=()=>{g.style.backgroundColor="#FFFFFF",g.style.borderColor=s.primary,g.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)",g.style.transform="scale(1.02)"},g.onblur=()=>{g.style.backgroundColor="#E3E3E8",g.style.borderColor="transparent",g.style.boxShadow="none",g.style.transform="scale(1)"};let m=document.createElement("div");m.id="email-template-list",Object.assign(m.style,{flex:"1",overflowY:"auto",padding:"8px",scrollBehavior:"smooth"});let w=document.createElement("div");w.innerHTML="\u2715",Object.assign(w.style,{position:"absolute",right:"26px",top:"50%",transform:"translateY(-50%)",fontSize:"10px",color:"#fff",cursor:"pointer",display:"none",backgroundColor:"#C7C7CC",width:"16px",height:"16px",borderRadius:"50%",textAlign:"center",lineHeight:"16px",fontWeight:"bold"}),w.onclick=()=>{g.value="",n="",w.style.display="none",b(),g.focus()},f.appendChild(g),f.appendChild(w),x.appendChild(f),x.appendChild(m);let A=document.createElement("div");Object.assign(A.style,{flex:"1",display:"flex",flexDirection:"column",overflow:"hidden",backgroundColor:s.bgApp,transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"});let N=document.createElement("div");Object.assign(N.style,{padding:"20px",borderBottom:`1px solid ${s.borderSubtle}`,backgroundColor:s.bgSurface,maxHeight:"250px",overflowY:"auto",display:"none"});let P=document.createElement("div");Object.assign(P.style,{flex:"1",display:"flex",flexDirection:"column",padding:"20px",backgroundColor:s.bgApp,overflow:"hidden"});let R=document.createElement("div");Object.assign(R.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"});let Z=document.createElement("span");Z.textContent="Preview do E-mail",Object.assign(Z.style,{fontSize:"12px",fontWeight:"600",color:s.textSecondary,textTransform:"uppercase",letterSpacing:"0.5px"});let J=document.createElement("div");Object.assign(J.style,{display:"flex",gap:"8px"});let _=(z,Y=!1)=>{let y=document.createElement("button");return y.textContent=z,Object.assign(y.style,{padding:"8px 14px",borderRadius:"10px",border:Y?"none":`1.5px solid ${s.primary}`,background:Y?s.primary:"transparent",color:Y?"#fff":s.primary,fontSize:"13px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 1, 0.5, 1)",boxShadow:Y?"0 4px 12px rgba(0, 122, 255, 0.3)":"none"}),y.onmouseenter=()=>{Y?(y.style.backgroundColor="#0062CC",y.style.transform="translateY(-1px)",y.style.boxShadow="0 6px 16px rgba(0, 122, 255, 0.4)"):y.style.backgroundColor="rgba(0, 122, 255, 0.05)"},y.onmouseleave=()=>{Y?(y.style.backgroundColor=s.primary,y.style.transform="translateY(0)",y.style.boxShadow="0 4px 12px rgba(0, 122, 255, 0.3)"):(y.style.backgroundColor="transparent",y.style.transform="translateY(0)")},y.onmousedown=()=>y.style.transform="scale(0.94)",y.onmouseup=()=>y.style.transform="scale(1)",y},F=_("Copiar HTML"),$=_("Preencher no CRM",!0),j=_("Smart CR");j.style.borderColor="#E67E22",j.style.color="#E67E22",j.style.display="none",J.appendChild(j),J.appendChild(F),J.appendChild($),R.appendChild(Z),R.appendChild(J);let q=document.createElement("div");q.contentEditable="true",Object.assign(q.style,{flex:"1",backgroundColor:s.bgSurface,border:`1px solid ${s.borderSubtle}`,borderRadius:"8px",padding:"20px",fontSize:"15px",lineHeight:"1.6",color:s.textPrimary,overflowY:"auto",outline:"none",boxShadow:"inset 0 1px 2px rgba(0,0,0,0.02)"}),P.appendChild(R),P.appendChild(q),D(),A.appendChild(N),A.appendChild(P),p.appendChild(x),p.appendChild(A),d.appendChild(l),d.appendChild(p);let k=document.createElement("div");Object.assign(k.style,Ae),d.appendChild(k),Te(d,k),document.body.appendChild(d);function S(){e=!e,e?(d.style.display="flex",Vt(d),o.length===0&&O()):d.style.display="none",ue(e,d,"cw-btn-email")}async function O(){m.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',o=await ho.getTemplates(),b()}function b(){m.innerHTML="";let z=o.filter(E=>E.name.toLowerCase().includes(n.toLowerCase())||E.category.toLowerCase().includes(n.toLowerCase())),Y=Object.entries(He).filter(([E,c])=>c&&(E.toLowerCase().includes(n.toLowerCase())||c.toLowerCase().includes(n.toLowerCase()))).map(([E,c])=>({id:E,name:E.replace(/_/g," "),category:"\u26A1 Smart CRs",code:c,isSmartCR:!0})),y=he.getSnippets("email").filter(E=>E.title.toLowerCase().includes(n.toLowerCase())||E.subject&&E.subject.toLowerCase().includes(n.toLowerCase())).map(E=>{let c=[],v=E.content.match(/\[([^\]]+)\]/g);return v&&[...new Set(v)].forEach(h=>{c.push({key:h,label:h.replace("[","").replace("]",""),type:h.toLowerCase().includes("data")?"date":"text",auto:h.toLowerCase().includes("nome")&&h.toLowerCase().includes("seu")?"agentName":null})}),{id:E.id||`snippet-${Math.random()}`,name:E.title,category:"\u{1F464} Pessoal",subject:E.subject||"Sem Assunto",template:E.content,placeholders:c}}),V=[...z,...Y,...y];if(V.length===0){m.innerHTML=`
                <div style="padding: 40px 20px; text-align: center; color: ${s.textSecondary}; opacity: 0.6;">
                    <div style="font-size: 32px; margin-bottom: 12px;">\u{1F50D}</div>
                    <div style="font-size: 14px; font-weight: 500;">Nenhum resultado para "${n}"</div>
                </div>`;return}[...new Set(V.map(E=>E.category))].sort((E,c)=>E.localeCompare(c)).forEach(E=>{let c=r.has(E)||n.length>0,v=V.filter(ee=>ee.category===E),h=document.createElement("div");Object.assign(h.style,{padding:"12px 16px 12px 24px",fontSize:"11px",fontWeight:"700",color:s.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",position:"sticky",top:"-8px",backgroundColor:"rgba(239, 239, 240, 0.9)",zIndex:"10",backdropFilter:"blur(20px)",margin:"0 -8px 8px -8px",borderBottom:`0.5px solid ${s.borderSubtle}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none",transition:"background-color 0.2s ease"}),h.onmouseenter=()=>h.style.backgroundColor="rgba(230, 230, 232, 0.9)",h.onmouseleave=()=>h.style.backgroundColor="rgba(239, 239, 240, 0.9)";let M=document.createElement("span");M.textContent=E,h.appendChild(M);let L=document.createElement("span");L.textContent=v.length,Object.assign(L.style,{backgroundColor:"rgba(0, 0, 0, 0.05)",padding:"2px 8px",borderRadius:"10px",fontSize:"10px",color:s.textSecondary});let X=document.createElement("span");X.innerHTML=c?"\u{10012A}":"\u{10012B}",X.innerHTML=c?"\u25BE":"\u25B8",X.style.marginLeft="8px",X.style.transition="transform 0.3s ease";let H=document.createElement("div");H.style.display="flex",H.style.alignItems="center",H.appendChild(L),H.appendChild(X),h.appendChild(H),h.onclick=()=>{r.has(E)?r.delete(E):r.add(E),b()},m.appendChild(h),c&&v.forEach(ee=>{let ae=a&&a.id===ee.id,Q=document.createElement("div");if(Object.assign(Q.style,{padding:"12px 14px",fontSize:"14px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",borderRadius:"10px",color:s.textPrimary,margin:"4px 6px",display:"flex",alignItems:"center",gap:"12px",backgroundColor:ae?s.primary:s.bgSurface,boxShadow:ae?"0 4px 12px rgba(0, 122, 255, 0.3)":"0 1px 2px rgba(0,0,0,0.05)",border:ae?"none":`1px solid ${s.borderSubtle}`,position:"relative",overflow:"hidden"}),ae){let re=document.createElement("div");Object.assign(re.style,{position:"absolute",left:"0",top:"0",bottom:"0",width:"4px",backgroundColor:"#fff",borderRadius:"0 4px 4px 0"}),Q.appendChild(re)}let oe=document.createElement("span");oe.innerHTML=ee.isSmartCR?"\u26A1":ee.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",oe.style.fontSize="12px",oe.style.opacity="0.7",oe.style.flexShrink="0",Q.appendChild(oe);let te=document.createElement("span");te.textContent=ee.name,te.style.overflow="hidden",te.style.textOverflow="ellipsis",te.style.whiteSpace="nowrap",te.style.flex="1",Q.appendChild(te),ae&&(Q.style.color="#fff",Q.style.fontWeight="600",oe.style.opacity="1"),Q.onmouseenter=()=>{ae||(Q.style.backgroundColor="#f8f8f9",Q.style.transform="translateY(-1px) scale(1.01)",Q.style.boxShadow="0 4px 8px rgba(0,0,0,0.08)",Q.style.borderColor="rgba(0, 122, 255, 0.2)")},Q.onmouseleave=()=>{ae||(Q.style.backgroundColor=s.bgSurface,Q.style.transform="translateY(0) scale(1)",Q.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",Q.style.borderColor=s.borderSubtle)},Q.onmousedown=()=>{Q.style.transform=ae?"scale(0.97)":"scale(0.98)"},Q.onmouseup=()=>{Q.style.transform=ae?"scale(1)":"translateY(-1px) scale(1.01)"},Q.onclick=()=>{T(ee)},m.appendChild(Q)})})}let C=null;async function T(z){a?.id!==z.id&&(a=z,C&&clearTimeout(C),A.style.opacity="0",A.style.transform="translateY(5px)",C=setTimeout(()=>{j.style.display=z.isSmartCR?"block":"none",$.style.display=z.isSmartCR?"none":"block",F.style.display=z.isSmartCR?"none":"block",b(),I(),D(),A.style.opacity="1",A.style.transform="translateY(0)",C=null},150))}function I(){if(N.innerHTML="",!a||a.isSmartCR){a?.isSmartCR?(N.style.display="block",N.innerHTML=`<div style="padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):N.style.display="none";return}let z=a.placeholders&&a.placeholders.length>0;if(N.style.display=z?"block":"none",!z)return;let Y=document.createElement("div");Object.assign(Y.style,{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}),(a.placeholders||[]).forEach(y=>{let V=document.createElement("div"),K=document.createElement("label");K.textContent=y.label,Object.assign(K.style,{display:"block",fontSize:"11px",fontWeight:"700",color:s.textSecondary,marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.5px"});let E=document.createElement("input");E.type=y.type||"text",E.dataset.key=y.key,Object.assign(E.style,{width:"100%",padding:"10px 12px",borderRadius:"8px",border:`1.5px solid ${s.borderSubtle}`,backgroundColor:"#FBFBFD",fontSize:"14px",boxSizing:"border-box",transition:"all 0.2s ease",outline:"none"}),E.onfocus=()=>{E.style.borderColor=s.primary,E.style.backgroundColor="#FFFFFF",E.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)"},E.onblur=()=>{E.style.borderColor=s.borderSubtle,E.style.backgroundColor="#FBFBFD",E.style.boxShadow="none"},y.auto==="agentName"&&(E.value=We().split(" ")[0]),E.addEventListener("input",D),V.appendChild(K),V.appendChild(E),Y.appendChild(V)}),N.appendChild(Y)}function D(){if(!a){q.innerHTML=`
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
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${s.textPrimary}; margin-bottom: 8px;">
                        Pronto para come\xE7ar?
                    </div>
                    <div style="font-size: 14px; color: ${s.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.
                    </div>
                </div>`;return}if(a.isSmartCR){q.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${a.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let z=a.template;(N.querySelectorAll("input")||[]).forEach(y=>{let V=y.dataset.key,K=y.value;if(y.type==="date"&&K){let[c,v,h]=K.split("-");K=`${v}/${h}/${c}`}K=K||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${V}</span>`;let E=V.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");z=z.replace(new RegExp(E,"g"),K)}),q.innerHTML=z}return g.addEventListener("input",z=>{n=z.target.value,w.style.display=n?"block":"none",b()}),F.onclick=()=>{let z=q.innerHTML,Y=new Blob([z],{type:"text/html"}),y=q.innerText,V=[new ClipboardItem({"text/html":Y,"text/plain":new Blob([y],{type:"text/plain"})})];navigator.clipboard.write(V).then(()=>W("E-mail copiado com sucesso!"),()=>W("Erro ao copiar e-mail",{error:!0}))},$.onclick=async()=>{if(!a)return;let z=Ze(),Y={...a,body:q.innerHTML};try{await go(Y),S()}catch{W("Erro ao preencher e-mail",{error:!0})}finally{z()}},j.onclick=async()=>{if(!a||!a.isSmartCR)return;let z=Ze();try{await yt(a.code),S()}catch{W("Erro ao aplicar Smart CR",{error:!0})}finally{z()}},S}var wo={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]},"EN BAU":{inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function So(){let t="v3.0.0",e={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",success:"#34A853"},o="csa-local-styles";if(!document.getElementById(o)){let v=document.createElement("style");v.id=o,v.innerHTML=`
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
      `,document.head.appendChild(v)}let a={progressBarContainer:{height:"6px",background:e.borderSubtle,width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 3px 3px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:e.bgApp,scrollBehavior:"smooth"},card:{background:e.bgSurface,border:`1px solid ${e.borderSubtle}`,borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:e.shadowCard},cardTitle:{fontSize:"11px",fontWeight:"700",color:e.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"10px",transition:"all 0.2s ease",color:e.textPrimary,fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{background:"rgba(0, 0, 0, 0.02)"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"50%",border:`2px solid ${e.borderSubtle}`,marginRight:"12px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},i="PT",r="BAU",s=!1,d=document.createElement("div");d.id="call-script-popup",d.classList.add("cw-module-window"),Object.assign(d.style,me,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let u={popup:d,googleLine:null},l=null;function p(){s&&we().then(v=>{let h=d.querySelector("#cw-ctx-name"),M=d.querySelector("#cw-ctx-cid"),L=d.querySelector("#cw-ctx-email");if(h&&(h.textContent=v.advertiserName||"Cliente Desconhecido"),M){let X=v.cid||"---";M.textContent!==X&&(M.textContent=X)}if(L){let X=v.clientEmail||"N\xE3o encontrado";L.textContent!==X&&(L.textContent=X,L.title=X)}})}function x(){we().then(v=>{let h=new Date().toLocaleDateString("pt-BR"),M=d.querySelector("#cw-am-message-area"),L=d.querySelector("#cw-am-review-container"),X=`Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${v.advertiserName||"Cliente"}) em andamento hoje (${h}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${v.advertiserName||"---"}
CID: ${v.cid||"---"}
Case ID: ${v.caseId||"---"}
E-mail: ${v.clientEmail||"---"}`;M&&(M.value=X),L&&(L.style.display="block",L.style.maxHeight="300px",L.style.opacity="1",L.scrollIntoView({behavior:"smooth",block:"end"}))})}function f(){s=!s,ue(s,d,"cw-btn-script"),s?(p(),l||(l=setInterval(p,2e3))):l&&(clearInterval(l),l=null)}let g=pe(d,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",u,()=>{f()});d.appendChild(g);let m=document.createElement("div");Object.assign(m.style,a.contextBanner),m.innerHTML=`
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
  `;let w=m.querySelector("#csa-toggle-options"),A=m.querySelector("#csa-options-content"),N=m.querySelector("#csa-options-arrow"),P=!1;w.onclick=()=>{P=!P,N.style.transform=P?"rotate(180deg)":"rotate(0deg)",A.style.maxHeight=P?"400px":"0",A.style.opacity=P?"1":"0",A.style.marginTop=P?"8px":"0",G.playClick()};let R=m.querySelector("#cw-pill-message"),Z=m.querySelector("#cw-am-copy-final"),J=m.querySelector("#cw-am-message-area");R.onmouseenter=()=>{R.style.borderColor="#007AFF",R.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},R.onmouseleave=()=>{R.style.borderColor="#DADCE0",R.style.boxShadow="0 1px 2px rgba(0,0,0,0.02)"},R.addEventListener("click",()=>{x()}),Z.addEventListener("click",()=>{J.value&&(navigator.clipboard.writeText(J.value),W("Mensagem copiada!"),G.playSuccess(),Z.style.background="#34A853",Z.textContent="Copiado!",setTimeout(()=>{Z.style.background="#1A73E8",Z.textContent="Copiar Mensagem Final"},2e3))});let _=(v,h)=>{let M=m.querySelector(v),L=m.querySelector(h);M.onclick=()=>{let X=L.textContent;!X||X.includes("---")||X.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(X),G.playSuccess(),M.classList.add("copied"),setTimeout(()=>M.classList.remove("copied"),1500))}};d.appendChild(m);let F=document.createElement("div");Object.assign(F.style,a.progressBarContainer);let $=document.createElement("div");$.className="csa-progress-fill",Object.assign($.style,a.progressBarFill),F.appendChild($),d.appendChild(F);let j=document.createElement("div");j.id="csa-content",Object.assign(j.style,a.contentArea),d.appendChild(j);let q=document.createElement("div");Object.assign(q.style,a.footer);let k=document.createElement("span");k.textContent="by lucaste@",Object.assign(k.style,{fontSize:"10px",color:"#bdc1c6"});let S=document.createElement("button");S.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(S.style,a.resetBtn),S.onmouseenter=()=>S.style.background="#fce8e6",S.onmouseleave=()=>S.style.background="transparent",S.onclick=()=>{S.style.transform="scale(0.9)",setTimeout(()=>S.style.transform="scale(1)",150);for(let v in n)delete n[v];K()},q.appendChild(k),q.appendChild(S),d.appendChild(q);let O=document.createElement("div");Object.assign(O.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"16px"});let b=document.createElement("div");b.className="csa-segmented-control",b.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `;let C=document.createElement("div");C.className="csa-segmented-control",C.innerHTML=`
      <div class="csa-segmented-indicator" id="lang-indicator" style="width: calc(33.33% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-lang="PT">PT</button>
      <button data-lang="ES">ES</button>
      <button data-lang="EN">EN</button>
  `,O.appendChild(b),O.appendChild(C),j.appendChild(O);let T=b.querySelectorAll("button"),I=b.querySelector("#type-indicator");T.forEach((v,h)=>{v.onclick=()=>{T.forEach(M=>M.classList.remove("active")),v.classList.add("active"),I.style.transform=`translateX(${h*(b.offsetWidth/2-2)}px)`,r=v.dataset.type,G.playClick(),K()}});let D=C.querySelectorAll("button"),z=C.querySelector("#lang-indicator");D.forEach((v,h)=>{v.onclick=()=>{D.forEach(M=>M.classList.remove("active")),v.classList.add("active"),z.style.transform=`translateX(${h*(C.offsetWidth/3-1)}px)`,i=v.dataset.lang,G.playClick(),K()}});let Y=document.createElement("div");Y.id="csa-checklist-area",j.appendChild(Y);let y=document.createElement("div");Object.assign(y.style,Ae),y.className="no-drag",y.title="Redimensionar",d.appendChild(y),Te(d,y),document.body.appendChild(d),_("#cw-pill-cid","#cw-ctx-cid"),_("#cw-pill-email","#cw-ctx-email");function V(v){return v}function K(){Y.innerHTML="";let v=`${i} ${r}`,h=wo[v];if(!h){Y.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',$.style.width="0%";return}let M=e.primary,L=0,X=0;["inicio","meio","fim"].forEach(H=>{h[H]&&(L+=h[H].length)}),["inicio","meio","fim"].forEach((H,ee)=>{let ae=h[H];if(!ae||ae.length===0)return;let Q=document.createElement("div");Object.assign(Q.style,a.card);let oe=document.createElement("div");Object.assign(oe.style,a.cardTitle);let te="";H==="inicio"?i.includes("ES")?te="Apertura":i.includes("EN")?te="Opening":te="Abertura":H==="meio"?i.includes("ES")?te="Implementaci\xF3n":i.includes("EN")?te="Implementation":te="Implementa\xE7\xE3o (Tag Support)":H==="fim"&&(i.includes("ES")?te="Cierre":i.includes("EN")?te="Closing":te="Fechamento"),oe.textContent=te;let re=document.createElement("span");re.style.fontSize="11px",re.style.opacity="0.7",re.style.fontWeight="500",re.style.background="#f1f3f4",re.style.padding="2px 8px",re.style.borderRadius="10px",oe.appendChild(re),Q.appendChild(oe);let Ye=0;ae.forEach((ot,_e)=>{let Ne=`${v}-${H}-${_e}`,St=!!n[Ne];St&&(X++,Ye++);let ve=document.createElement("div");Object.assign(ve.style,a.itemRow);let ce=document.createElement("div");Object.assign(ce.style,a.checkbox);let $e=document.createElement("span");$e.className="csa-item-text"+(St?" completed":""),$e.innerHTML=ot,$e.style.flex="1",St?(Object.assign(ve.style,a.itemCompleted),ce.style.background=M,ce.style.borderColor=M,ce.style.transform="scale(1)",ce.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ce.style.background="transparent",ce.style.borderColor=e.borderSubtle,ce.style.transform="scale(1)",ce.innerHTML=""),ve.onclick=()=>{let Dt=!n[Ne];n[Ne]=Dt,G.playClick(),Dt?(ce.style.transform="scale(1.15)",setTimeout(()=>ce.style.transform="scale(1)",150),Object.assign(ve.style,a.itemCompleted),$e.classList.add("completed"),ce.style.background=M,ce.style.borderColor=M,ce.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ve.style.background="transparent",$e.classList.remove("completed"),ce.style.background="transparent",ce.style.borderColor=e.borderSubtle,ce.innerHTML=""),E(v,h)},ve.onmouseenter=()=>{n[Ne]||(ve.style.background="rgba(0, 0, 0, 0.03)",ce.style.borderColor=M)},ve.onmouseleave=()=>{n[Ne]||(ve.style.background="transparent",ce.style.borderColor=e.borderSubtle)},ve.appendChild(ce),ve.appendChild($e),Q.appendChild(ve)}),Ye===ae.length&&ae.length>0&&(re.style.color="#1e8e3e",re.style.background="#e6f4ea",Q.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),re.textContent=`${Ye}/${ae.length}`,Y.appendChild(Q)}),c(L,X)}function E(v,h){let M=0,L=0;["inicio","meio","fim"].forEach(X=>{let H=h[X]||[];M+=H.length,H.forEach((ee,ae)=>{n[`${v}-${X}-${ae}`]&&L++})}),c(M,L),setTimeout(()=>K(),200)}function c(v,h){let M=v===0?0:h/v*100;$.style.width=`${M}%`,M===100?($.style.background=e.success,$.classList.remove("csa-progress-fill")):($.style.background="",$.classList.add("csa-progress-fill"))}return K(),f}var et={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Pe={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},vt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},_t="cw_link_history_v4";function Co(t,e){try{let o=JSON.parse(localStorage.getItem(_t)||"[]");o=o.filter(a=>a.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(_t,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function na(){try{return JSON.parse(localStorage.getItem(_t)||"[]")}catch{return[]}}function Eo(){let t="v4.6",e="",o=!1,a=null,n=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},r=document.createElement("div");r.id="links-popup",r.classList.add("cw-module-window"),Object.assign(r.style,me,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let d=pe(r,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:r,googleLine:null},()=>q());r.appendChild(d);let u=document.createElement("div");u.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",r.appendChild(u);let l=document.createElement("div");l.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,u.appendChild(l);let p=document.createElement("div");p.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",u.appendChild(p);let x=document.createElement("div");x.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let f=document.createElement("div");f.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let g=document.createElement("div");g.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',g.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let m=document.createElement("input");m.type="text",m.placeholder="Buscar ferramenta ou SOP...",m.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,m.onfocus=()=>{f.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",f.style.border="1px solid #1a73e8"},m.onblur=()=>{f.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",f.style.border="1px solid transparent"},f.appendChild(g),f.appendChild(m),x.appendChild(f),p.appendChild(x);let w=document.createElement("div");w.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",p.appendChild(w);let A=null;function N(){if(A)return;A=document.createElement("div"),A.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let k=document.createElement("div");k.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",k.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let S=document.createElement("button");S.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',S.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",S.onclick=()=>{R(),n=!1,F()},k.appendChild(S),A.appendChild(k);let O=document.createElement("div");O.id="cw-history-list",O.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",A.appendChild(O),p.appendChild(A)}function P(){A||N();let k=A.querySelector("#cw-history-list");k.innerHTML="";let S=na();S.length===0?k.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':S.forEach(O=>{let b=j(O,Pe[O._originalCat],!0,O._originalCat);k.appendChild(b)}),requestAnimationFrame(()=>A.style.transform="translateY(0)")}function R(){A&&(A.style.transform="translateY(100%)")}function Z(){l.innerHTML="";let k=J("history","Recentes",Pe.history);k.id="cw-sidebar-btn-history",k.onclick=()=>{G.playClick(),n=!n,n?P():R(),F()},l.appendChild(k);let S=document.createElement("div");S.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",l.appendChild(S),Object.keys(et).forEach(O=>{let b=et[O],C=J(O,b.label,Pe[O]);C.id=`cw-sidebar-btn-${O}`,C.onclick=()=>{G.playClick(),n&&(n=!1,R()),_(O)},l.appendChild(C)})}function J(k,S,O){let b=document.createElement("div");b.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,b.title=S,b.dataset.key=k;let C=document.createElement("div");C.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",C.innerHTML=O||Pe.tasks;let T=document.createElement("div");return T.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",T.textContent=S,b.appendChild(C),b.appendChild(T),b.onmouseenter=()=>{a!==k&&!(k==="history"&&n)&&(b.style.background="#F1F3F4",C.style.transform="scale(1.1)")},b.onmouseleave=()=>{a!==k&&!(k==="history"&&n)&&(b.style.background="transparent",C.style.transform="scale(1)")},b}function _(k){let S=document.getElementById(`cat-anchor-${k}`);S&&(S.scrollIntoView({behavior:"smooth",block:"start"}),a=k,F())}function F(){Object.keys(et).forEach(S=>{let O=l.querySelector(`#cw-sidebar-btn-${S}`);if(O)if(a===S&&!n){let b=vt[S];O.style.background=b.bg,O.style.color=b.color,O.querySelector("div:first-child").style.transform="scale(1.1)"}else O.style.background="transparent",O.style.color=i.textSecondary,O.querySelector("div:first-child").style.transform="scale(1)"});let k=l.querySelector("#cw-sidebar-btn-history");k&&(n?(k.style.background="#3C4043",k.style.color="#FFFFFF"):(k.style.background="transparent",k.style.color=i.textSecondary))}function $(){if(w.innerHTML="",e.trim()!==""){let S=[];if(Object.entries(et).forEach(([b,C])=>{let T=C.links.filter(I=>I.name.toLowerCase().includes(e.toLowerCase())||I.desc.toLowerCase().includes(e.toLowerCase()));S.push(...T.map(I=>({...I,_cat:b})))}),S.length===0){w.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let O=document.createElement("div");O.innerHTML="Resultados da busca",O.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",w.appendChild(O),S.forEach(b=>{let C=j(b,Pe[b._cat],!1,b._cat);w.appendChild(C)});return}Object.entries(et).forEach(([S,O])=>{let b=vt[S],C=document.createElement("div"),T=document.createElement("div");T.id=`cat-anchor-${S}`,T.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${b.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,T.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${b.color};"></div>
            ${O.label}
          `,C.appendChild(T);let I=document.createElement("div");I.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",O.links.forEach(D=>{let z=j(D,Pe[S],!1,S);I.appendChild(z)}),C.appendChild(I),w.appendChild(C)});let k=document.createElement("div");k.style.height="80px",w.appendChild(k)}function j(k,S,O,b){let C=document.createElement("div"),T=vt[b]||vt.history;C.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let I=document.createElement("div");I.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${T.bg}; color: ${T.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,I.innerHTML=S||Pe.tasks;let D=I.querySelector("svg");D&&(D.style.width="22px",D.style.height="22px");let z=document.createElement("div");z.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let Y=document.createElement("div");Y.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,Y.textContent=k.name;let y=document.createElement("div");y.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,y.textContent=k.desc,z.appendChild(Y),z.appendChild(y);let V=document.createElement("div");return V.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',V.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,V.title="Copiar URL",C.onmouseenter=()=>{C.style.transform="translateY(-2px)",C.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",C.style.borderColor="rgba(0,0,0,0.05)",C.style.borderLeft=`4px solid ${T.color}`,V.style.opacity="1",V.style.background="#F1F3F4"},C.onmouseleave=()=>{C.style.transform="translateY(0)",C.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",C.style.border="1px solid transparent",V.style.opacity="0",V.style.background="transparent"},C.onclick=()=>{!O&&b&&Co(k,b),window.open(k.url,"_blank")},V.onclick=K=>{K.stopPropagation(),G.playClick(),navigator.clipboard.writeText(k.url),!O&&b&&Co(k,b),W("Link copiado!")},C.appendChild(I),C.appendChild(z),C.appendChild(V),C}m.addEventListener("input",k=>{e=k.target.value,$()});function q(){o=!o,ue(o,r,"cw-btn-links")}return document.body.appendChild(r),Z(),$(),q}var Me=[];function Mt(t){Me=t}var ia=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function Ao(){let t="v4.9",e=!1,o=null,a=null;function n(b){if(!b)return"";try{let C=new Date(b);return isNaN(C.getTime())?String(b):C.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(b)}}if(!document.getElementById("cw-broadcast-hd-css")){let b=document.createElement("style");b.id="cw-broadcast-hd-css",b.innerHTML=`
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
      `,document.head.appendChild(b)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},r={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function s(b){return b?Object.entries(b).map(([C,T])=>`${C.replace(/[A-Z]/g,I=>"-"+I.toLowerCase())}:${T}`).join(";"):""}function d(b){if(!b||typeof b!="string")return"";let C=b;return C=C.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),C=C.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),C=C.replace(/_(.*?)_/g,"<i>$1</i>"),C=C.replace(/\n/g,"<br>"),C=Yt(C),C}let u=document.createElement("div");u.id="broadcast-popup",u.classList.add("cw-module-window"),Object.assign(u.style,me,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let l={popup:u,googleLine:null};function p(){if(e=!e,ue(e,u,"cw-btn-broadcast"),e){let b=document.getElementById("cw-btn-broadcast");b&&b.classList.remove("has-new"),_()}}let x=pe(u,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",l,()=>p()),f=x.querySelector(".cw-header-actions")||x.lastElementChild,g=null;function m(){let b=null;try{b=Ee()}catch{console.warn("TechSol: Auth Pending")}if(b){let C=b.split("@")[0].toLowerCase(),T=pt.includes(C);if(window._cwIsAdmin=T,window._cwCurrentUser=C,T&&f&&!f.querySelector("#cw-admin-btn")){let I=document.createElement("div");I.id="cw-admin-btn",I.className="cw-btn-interactive",I.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(I.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),I.title="Novo Aviso",I.onclick=D=>{D.stopPropagation(),N()},f.insertBefore(I,f.firstChild),g||A(),$()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(m,2e3))}if(f){let b=document.createElement("button");b.textContent="Limpar",b.className="cw-btn-interactive",Object.assign(b.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),b.onclick=C=>{C.stopPropagation(),G.playSuccess();let T=Me.map(I=>I.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(T)),$(),F()},f.insertBefore(b,f.firstChild)}u.appendChild(x);let w=document.createElement("div");w.id="cw-update-status",w.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",u.appendChild(w);function A(){g=document.createElement("div"),g.className="cw-editor-overlay",g.innerHTML=`
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
      `,g.querySelectorAll('input[name="cw-bc-type"]').forEach(I=>{I.addEventListener("change",()=>{g.querySelectorAll(".cw-radio-option").forEach(D=>D.classList.remove("checked")),I.parentElement.classList.add("checked")})}),setTimeout(()=>{let I=g.querySelector(".cw-radio-option.info");I&&I.classList.add("checked")},100);let b=g.querySelector("#cw-bc-cancel"),C=g.querySelector("#cw-bc-close-x"),T=g.querySelector("#cw-bc-send");b.onclick=P,C.onclick=P,T.onclick=R,u.appendChild(g)}function N(b=null){if(!g)return;let C=g.querySelector("#cw-editor-title-label"),T=g.querySelector("#cw-bc-title"),I=g.querySelector("#cw-bc-text"),D=g.querySelector("#cw-bc-send");if(b){a=b.id,C.textContent="Editar Aviso",T.value=b.title||"",I.value=b.text||"",D.textContent="Salvar Altera\xE7\xF5es";let z=b.type||"info",Y=g.querySelector(`input[name="cw-bc-type"][value="${z}"]`);Y&&Y.click()}else{a=null,C.textContent="Novo Aviso",T.value="",I.value="",D.textContent="Publicar";let z=g.querySelector('input[name="cw-bc-type"][value="info"]');z&&z.click()}g.classList.add("active"),setTimeout(()=>T.focus(),300)}function P(){g&&g.classList.remove("active"),a=null}async function R(){let b=g.querySelector("#cw-bc-send"),C=g.querySelector("#cw-bc-title"),T=g.querySelector("#cw-bc-text"),I=g.querySelector('input[name="cw-bc-type"]:checked'),D=I?I.value:"info";if(!C.value.trim()||!T.value.trim()){W("Preencha todos os campos!",{error:!0});return}b.textContent="Salvando...",b.style.opacity="0.7";let z=!1;a?z=await fe.updateBroadcast(a,{title:C.value,text:T.value,type:D}):z=await fe.sendBroadcast({title:C.value,text:T.value,type:D,author:window._cwCurrentUser||"admin"}),z?(W(a?"Atualizado!":"Publicado!"),G.playSuccess(),P(),setTimeout(()=>_(),1500)):(W("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),b.textContent=a?"Salvar Altera\xE7\xF5es":"Publicar",b.style.opacity="1")}async function Z(b){if(await xe("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await fe.deleteBroadcast(b)){W("Aviso removido."),G.playClick();let I=Me.findIndex(D=>D.id===b);I>-1&&Me.splice(I,1),$(),setTimeout(()=>_(),1500)}else W("Erro ao excluir.",{error:!0})}let J=document.createElement("div");J.className="cw-nice-scroll",Object.assign(J.style,i.feedContainer),u.appendChild(J);async function _(){e&&(w.style.display="block",w.innerHTML="\u{1F504} Sincronizando...");try{let b=await fe.fetchData();b&&b.broadcast&&(Mt(b.broadcast),F(),e&&($(),w.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{w.style.display="none"},1500)))}catch{e&&(w.innerHTML="\u26A0\uFE0F Offline")}}function F(){let b=document.getElementById("cw-btn-broadcast");if(!b)return;let C=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Me.some(I=>!C.includes(I.id))){if(b.classList.add("has-new"),!b.querySelector(".cw-badge")){let I=document.createElement("div");I.className="cw-badge",Object.assign(I.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),b.appendChild(I)}}else{b.classList.remove("has-new");let I=b.querySelector(".cw-badge");I&&I.remove()}}function $(){J.innerHTML="";let b=u.querySelector("#cw-bau-widget");b&&b.remove();let C=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),T=[...Me].sort((y,V)=>{let K=new Date(y.date).getTime()||0;return(new Date(V.date).getTime()||0)-K}),I=T.findIndex(y=>y.title&&y.title.toLowerCase().includes("disponibilidade bau"));if(I!==-1){let y=T[I];T.splice(I,1);let V=document.createElement("div");V.id="cw-bau-widget",Object.assign(V.style,i.bauContainer);let K=[],E=(y.text||"").split(`
`),c=/\d{1,2}\/\d{1,2}/,v="\u{1F4C5}";if(E.forEach(H=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(H)?v="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(H)&&(v="\u{1F1EA}\u{1F1F8}");let ee=H.match(c);if(ee){let ae=ee[0],Q=v;/🇧🇷|🇵🇹|PT|BR/i.test(H)?Q="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(H)&&(Q="\u{1F1EA}\u{1F1F8}"),K.some(te=>te.flag===Q&&te.date===ae)||K.push({flag:Q,date:ae})}}),K.length===0){let H=(y.text||"").match(/\d{1,2}\/\d{1,2}/g);H&&[...new Set(H)].forEach(ee=>K.push({flag:"\u{1F4C5}",date:ee}))}let h="",M='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(M=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${M}
              `),K.length>0?h=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${K.map(ee=>`
                  <div style="${s(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${s(i.bauFlag)}">${ee.flag}</span>
                      <span style="${s(i.bauDate)}">${ee.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${M}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${d(y.text)}</div>
              `:h=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${d(y.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,V.innerHTML=`
              <div style="${s(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${s(i.liveIndicator)}">
                      <div style="${s(i.pulseDot)}"></div>
                      <span style="${s(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${n(y.date)}</div>
              </div>
              ${h}
          `,w.after(V);let L=V.querySelector("#cw-bau-toggle-btn"),X=V.querySelector("#cw-bau-full");if(L&&X&&(L.onclick=()=>{let H=X.style.display==="none";X.style.display=H?"block":"none",L.textContent=H?"Ocultar":"Detalhes"}),window._cwIsAdmin){let H=V.querySelector(".cw-bau-edit");H&&(H.onclick=()=>N(y))}}let D=T.sort((y,V)=>{let K=C.includes(y.id),E=C.includes(V.id);return K===E?0:K?1:-1});if(D.length===0&&!I){let y=document.createElement("div");Object.assign(y.style,i.emptyState),y.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,J.appendChild(y)}let z=D.filter(y=>!C.includes(y.id)),Y=D.filter(y=>C.includes(y.id));if(z.forEach(y=>J.appendChild(j(y,!1))),Y.length>0){let y=document.createElement("div");Object.assign(y.style,i.historyDivider),y.innerHTML=`<span>Hist\xF3rico (${Y.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let V=document.createElement("div");Object.assign(V.style,i.historyContainer),Y.forEach(E=>V.appendChild(j(E,!0)));let K=!1;y.onclick=()=>{G.playClick(),K=!K,V.style.display=K?"flex":"none",y.querySelector("svg").style.transform=K?"rotate(180deg)":"rotate(0deg)"},J.appendChild(y),J.appendChild(V)}}function j(b,C){let T=document.createElement("div");Object.assign(T.style,C?i.cardHistory:i.card);let I=r[b.type]||r.info,D=document.createElement("div");Object.assign(D.style,i.cardHeader);let z=document.createElement("div");Object.assign(z.style,i.typeTag,{color:I.color,background:I.bg}),z.innerHTML=`${I.icon} <span>${b.type}</span>`;let Y=document.createElement("span");if(Object.assign(Y.style,i.dateTag),Y.textContent=n(b.date),D.appendChild(z),C)D.appendChild(Y);else{let c=document.createElement("button");c.className="cw-btn-interactive",Object.assign(c.style,i.dismissBtn),c.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',c.onmouseenter=()=>{c.style.color="#1e8e3e",c.style.background="#e6f4ea",c.style.borderColor="#1e8e3e"},c.onmouseleave=()=>{c.style.color="#5f6368",c.style.background="#fff",c.style.borderColor="rgba(0,0,0,0.1)"},c.onclick=v=>{v.stopPropagation(),G.playClick(),T.style.transform="translateX(20px)",T.style.opacity="0",setTimeout(()=>{let h=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");h.push(b.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(h)),$(),F()},200)},D.appendChild(c)}let y=document.createElement("div");Object.assign(y.style,i.cardContent);let V=document.createElement("div");Object.assign(V.style,i.msgTitle),V.textContent=b.title;let K=document.createElement("div");Object.assign(K.style,i.msgBody),K.innerHTML=d(b.text);let E=document.createElement("div");if(Object.assign(E.style,i.msgMeta),E.innerHTML=`Publicado por <b>${b.author||"Sistema"}</b>`,C||(E.innerHTML+=` \u2022 ${n(b.date)}`),y.appendChild(V),y.appendChild(K),y.appendChild(E),T.appendChild(D),T.appendChild(y),window._cwIsAdmin){let c=document.createElement("div");c.className="cw-card-actions";let v=document.createElement("button");v.className="cw-action-btn edit",v.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',v.onclick=()=>N(b);let h=document.createElement("button");h.className="cw-action-btn delete",h.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',h.onclick=()=>Z(b.id),c.appendChild(v),c.appendChild(h),T.appendChild(c)}return T}let q=fe.getCachedBroadcasts();q.length>0&&(Mt(q),$()),setTimeout(m,500),_(),o||(o=setInterval(_,ia));let k=document.createElement("div");Object.assign(k.style,Ae),k.className="no-drag",u.appendChild(k),Te(u,k),document.body.appendChild(u);let S=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),O=Me.some(b=>!S.includes(b.id));return{toggle:p,hasUnread:O}}function To(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,o.overlay);let n=document.createElement("div");Object.assign(n.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let r=document.createElement("div");Object.assign(r.style,o.title);let s=document.createElement("div");Object.assign(s.style,o.text);let d=document.createElement("div");Object.assign(d.style,o.dotsContainer);let u=document.createElement("div");Object.assign(u.style,o.btnContainer);let l=document.createElement("button");l.textContent="Pular",Object.assign(l.style,o.btn,o.btnSkip),l.onmouseover=()=>l.style.color="#202124",l.onmouseout=()=>l.style.color="#5f6368";let p=document.createElement("button");p.textContent="Pr\xF3ximo",Object.assign(p.style,o.btn,o.btnNext),p.onmouseover=()=>p.style.transform="scale(1.05)",p.onmouseout=()=>p.style.transform="scale(1)",u.appendChild(l),u.appendChild(p),n.appendChild(i),n.appendChild(r),n.appendChild(s),n.appendChild(d),n.appendChild(u),a.appendChild(n),document.body.appendChild(a);function x(g){let m=t[g];i.textContent=m.icon,r.textContent=m.title,s.textContent=m.text,d.innerHTML="",t.forEach((w,A)=>{let N=document.createElement("div");Object.assign(N.style,o.dot),A===g&&Object.assign(N.style,o.dotActive),d.appendChild(N)}),m.isLast?(l.style.display="none",p.textContent="Come\xE7ar \u{1F680}",p.style.width="100%"):(l.style.display="block",p.textContent="Pr\xF3ximo",p.style.width="auto")}function f(){localStorage.setItem("cw_onboarding_seen_v1","true"),a.style.opacity="0",n.style.transform="translateY(20px)",setTimeout(()=>a.remove(),400),G.playSuccess(),W("Tudo pronto! Use o menu flutuante.")}p.onclick=()=>{G.playClick(),e<t.length-1?(e++,x(e)):f()},l.onclick=async()=>{await xe("Pular o tutorial?")&&f()},x(0),requestAnimationFrame(()=>{a.style.opacity="1",n.style.transform="translateY(0)"})}var ko={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function Fo(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&ra(t)}function ra(t){let e=ko.slides,o=0,a={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,a.overlay);let i=document.createElement("div");Object.assign(i.style,a.card);let r=document.createElement("div");Object.assign(r.style,a.badge),r.textContent=`Atualiza\xE7\xE3o ${t}`;let s=document.createElement("div");Object.assign(s.style,a.icon);let d=document.createElement("div");Object.assign(d.style,a.title);let u=document.createElement("div");Object.assign(u.style,a.text);let l=document.createElement("div");Object.assign(l.style,a.dotsContainer);let p=document.createElement("button");Object.assign(p.style,a.btn),p.onmouseover=()=>p.style.transform="scale(1.02)",p.onmouseout=()=>p.style.transform="scale(1)",i.appendChild(r),i.appendChild(s),i.appendChild(d),i.appendChild(u),i.appendChild(l),i.appendChild(p),n.appendChild(i),document.body.appendChild(n);function x(g){let m=e[g];s.textContent=m.icon,d.textContent=m.title,u.textContent=m.text,l.innerHTML="",e.forEach((w,A)=>{let N=document.createElement("div");Object.assign(N.style,a.dot),A===g&&Object.assign(N.style,a.dotActive),l.appendChild(N)}),g===e.length-1?p.textContent="Entendi, vamos l\xE1! \u{1F44D}":p.textContent="Pr\xF3ximo"}function f(){localStorage.setItem("cw_last_version",t),n.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>n.remove(),400),G.playSuccess(),W(`TechSol atualizado para ${t}!`)}p.onclick=()=>{G.playClick(),o<e.length-1?(o++,x(o)):f()},x(0),requestAnimationFrame(()=>{n.style.opacity="1",i.style.transform="translateY(0)"})}var Oo="cw_timezone_pinned",Nt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],sa=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function Io(){let t="v2.2 Pro",e=!1,o=null,a="mx",n=JSON.parse(localStorage.getItem(Oo)||"[]"),i="",r="all",s=new Date;s.setHours(14,0,0,0);let d={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},u={container:{display:"flex",flexDirection:"column",height:"100%",background:d.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:d.surface,borderBottom:`1px solid ${d.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:d.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:d.primary,borderBottomColor:d.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:d.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:d.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${d.border}`,background:d.surface,color:d.textSub,transition:"all 0.2s"},chipActive:{background:d.primaryBg,color:d.primary,borderColor:d.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:d.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${d.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:d.surface,border:`1px solid ${d.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:d.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},l=document.createElement("div");l.id="timezone-popup",l.classList.add("cw-module-window"),Object.assign(l.style,me,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let x=pe(l,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:l},()=>C());l.appendChild(x);let f=document.createElement("div");Object.assign(f.style,u.container),l.appendChild(f);let g=document.createElement("div");Object.assign(g.style,u.tabHeader);let m=document.createElement("div");m.textContent="Monitoramento",Object.assign(m.style,u.tabBtn,u.tabActive);let w=document.createElement("div");w.textContent="Planejador",Object.assign(w.style,u.tabBtn),g.appendChild(m),g.appendChild(w),f.appendChild(g);let A=document.createElement("div");Object.assign(A.style,u.toolbar);let N=document.createElement("div");Object.assign(N.style,u.searchInputWrapper);let P=document.createElement("div");P.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(P.style,u.searchIcon);let R=document.createElement("input");R.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(R.style,u.searchInput),R.onfocus=()=>{R.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",R.style.borderColor="rgba(26,115,232,0.3)"},R.onblur=()=>{R.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",R.style.borderColor="transparent"},R.oninput=T=>{i=T.target.value.toLowerCase(),k()},N.appendChild(P),N.appendChild(R),A.appendChild(N);let Z=document.createElement("div");Object.assign(Z.style,u.chipsRow),sa.forEach(T=>{let I=document.createElement("div");I.textContent=T.label,I.id=`tz-filter-${T.id}`,Object.assign(I.style,u.chip),T.id===r&&Object.assign(I.style,u.chipActive),I.onclick=()=>{G.playClick(),r=T.id,Array.from(Z.children).forEach(D=>{Object.assign(D.style,u.chip)}),Object.assign(I.style,u.chipActive),k()},Z.appendChild(I)}),A.appendChild(Z),f.appendChild(A);let J=document.createElement("div");Object.assign(J.style,u.listContainer);let _=document.createElement("style");_.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",f.appendChild(_);let F=document.createElement("div");Object.assign(F.style,u.plannerWrapper,{display:"none"}),f.appendChild(J),f.appendChild(F),m.onclick=()=>$("live"),w.onclick=()=>$("plan");function $(T){G.playClick(),T==="live"?(Object.assign(m.style,u.tabActive),Object.assign(w.style,u.tabBtn),w.style.borderBottomColor="transparent",J.style.display="flex",A.style.display="flex",F.style.display="none",O()):(Object.assign(w.style,u.tabActive),Object.assign(m.style,u.tabBtn),m.style.borderBottomColor="transparent",F.style.display="flex",J.style.display="none",A.style.display="none",b(),S())}function j(T){return T>=9&&T<17?{color:d.success,bg:d.successBg,label:"Aberto",icon:"\u{1F7E2}"}:T>=8&&T<9?{color:d.warning,bg:d.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:T>=17&&T<19?{color:d.warning,bg:d.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:d.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function q(T){n.includes(T)?n=n.filter(I=>I!==T):n.push(T),localStorage.setItem(Oo,JSON.stringify(n)),k(),G.playClick()}function k(){J.innerHTML="";let T=new Date,I=Nt.filter(z=>{let Y=z.name.toLowerCase().includes(i)||z.label.toLowerCase().includes(i),y=r==="all"||z.region===r;return Y&&y});if(I.sort((z,Y)=>{let y=n.includes(z.id),V=n.includes(Y.id);return y&&!V?-1:!y&&V?1:z.name.localeCompare(Y.name)}),I.length===0){J.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}I.forEach(z=>{let Y=n.includes(z.id),y=T.toLocaleTimeString("pt-BR",{timeZone:z.zone,hour:"2-digit",minute:"2-digit"}),V=parseInt(y.split(":")[0]),K=j(V),E=V<6||V>18,c=document.createElement("div");Object.assign(c.style,u.hubCard),Y&&Object.assign(c.style,u.hubCardPinned);let v=Y?"\u2605":"\u2606",h=Y?"#F9AB00":"#DADCE0";c.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${h}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${v}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${z.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${d.text}; letter-spacing:-0.2px;">${z.name}</div>
                        <div style="font-size:12px; color:${d.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${E?"\u{1F319}":"\u2600\uFE0F"} ${z.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${d.text}; font-family:'Google Sans', sans-serif;">${y}</div>
                    <div style="font-size:11px; font-weight:600; color:${K.color}; background:${K.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${K.label}
                    </div>
                </div>
            `,c.onmouseenter=()=>{c.style.transform="translateY(-2px)",c.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},c.onmouseleave=()=>{c.style.transform="translateY(0)",c.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let M=c.querySelector(".cw-pin-btn");M.onmouseenter=()=>{M.style.backgroundColor="#F1F3F4"},M.onmouseleave=()=>{M.style.backgroundColor="transparent"},M.onclick=L=>{L.stopPropagation(),q(z.id)},c.onclick=()=>{a=z.id,$("plan")},J.appendChild(c)});let D=document.createElement("div");D.style.height="20px",D.style.width="100%",J.appendChild(D)}function S(){F.innerHTML="";let T=document.createElement("div"),I=document.createElement("label");I.textContent="Onde est\xE1 o cliente?",I.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let D=document.createElement("select");Object.assign(D.style,jt),D.style.padding="14px",[...Nt].sort((oe,te)=>oe.name.localeCompare(te.name)).forEach(oe=>{let te=document.createElement("option");te.value=oe.id,te.textContent=`${oe.flag} ${oe.name} (${oe.zone})`,oe.id===a&&(te.selected=!0),D.appendChild(te)}),D.onchange=oe=>{a=oe.target.value,Q(),G.playClick()},T.appendChild(I),T.appendChild(D),F.appendChild(T);let Y=document.createElement("div");Object.assign(Y.style,u.timeComparisonRow);let y=document.createElement("div");Object.assign(y.style,u.timeCard),y.style.backgroundColor="#F8FAFF",y.style.borderColor="#E8F0FE",y.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let V=document.createElement("div");Object.assign(V.style,u.timeCard),V.style.backgroundColor="#FFF8E1",V.style.borderColor="#FEF7E0",V.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,Y.appendChild(y),Y.appendChild(V),F.appendChild(Y);let K=document.createElement("div");K.id="cw-planner-status",Object.assign(K.style,u.statusBadge),F.appendChild(K);let E=document.createElement("div");Object.assign(E.style,{padding:"0 4px",marginTop:"12px"});let c=document.createElement("div");c.textContent="Arraste para simular o hor\xE1rio:",c.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let v=document.createElement("div");Object.assign(v.style,u.timelineContainer);let h=document.createElement("div");Object.assign(h.style,u.timelineTrack);let M=document.createElement("div");Object.assign(M.style,u.dayZone),h.appendChild(M);let L=document.createElement("input");L.type="range",L.min="0",L.max="1439",L.step="15",L.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let X=document.createElement("div");X.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",X.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",v.appendChild(h),v.appendChild(L),v.appendChild(X),E.appendChild(c),E.appendChild(v),F.appendChild(E);let H=y.querySelector("#cw-time-input-br"),ee=V.querySelector("#cw-time-display-client"),ae=V.querySelector("#cw-client-label");function Q(){let oe=Nt.find(Ne=>Ne.id===a);ae.textContent=`${oe.flag} ${oe.label} (${oe.zone})`;let te=s.getHours(),re=s.getMinutes(),Ye=`${String(te).padStart(2,"0")}:${String(re).padStart(2,"0")}`;H.value=Ye,L.value=te*60+re;let ot=s.toLocaleTimeString("pt-BR",{timeZone:oe.zone,hour:"2-digit",minute:"2-digit"});ee.textContent=ot;let _e=parseInt(ot.split(":")[0]);_e>=9&&_e<17?(K.style.background=d.successBg,K.style.color=d.success,K.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):_e>=8&&_e<9||_e>=17&&_e<19?(K.style.background=d.warningBg,K.style.color=d.warning,K.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(K.style.background=d.errorBg,K.style.color=d.error,K.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}L.oninput=oe=>{let te=parseInt(oe.target.value);s.setHours(Math.floor(te/60)),s.setMinutes(te%60),Q()},H.oninput=oe=>{let[te,re]=oe.target.value.split(":");te&&re&&(s.setHours(parseInt(te)),s.setMinutes(parseInt(re)),Q())},Q()}function O(){k(),o||(o=setInterval(k,6e4))}function b(){o&&(clearInterval(o),o=null)}function C(){e=!e,ue(e,l,"cw-btn-timezone"),e?$("live"):b()}return document.body.appendChild(l),C}function Lo(){let t="v1.1",e=!1,o="general",a=null,n=null;if(!document.getElementById("cw-lib-styles")){let S=document.createElement("style");S.id="cw-lib-styles",S.innerHTML=`
            .cw-lib-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .cw-lib-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; border-color: rgba(0, 122, 255, 0.3) !important; }
            .cw-tactile { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.92) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #5F6368; }
            .cw-toolbar-btn:hover { background: #F1F3F4; color: #007AFF; border-color: #DADCE0; }
            .cw-toolbar-btn.active { background: #E8F0FE; color: #007AFF; border-color: #007AFF; }
        `,document.head.appendChild(S)}let i={bg:"#F0F2F5",surface:"#FFFFFF",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",text:"#1C1C1E",textSub:"#8E8E93",border:"rgba(0, 0, 0, 0.08)",danger:"#FF3B30"},r={container:{display:"flex",flexDirection:"column",height:"100%",background:i.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"12px 16px 0 16px",background:i.surface,borderBottom:`1px solid ${i.border}`},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:i.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",userSelect:"none"},tabActive:{color:i.primary,borderBottomColor:i.primary,fontWeight:"600"},listContainer:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"},emptyState:{padding:"40px 20px",textAlign:"center",color:"#BDC1C6",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},card:{background:i.surface,borderRadius:"16px",padding:"16px",border:`1px solid ${i.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative",overflow:"hidden"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},cardTitle:{fontSize:"14px",fontWeight:"600",color:i.text},cardPreview:{fontSize:"12px",color:i.textSub,lineHeight:"1.5",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"12px",paddingTop:"12px",borderTop:`1px dashed ${i.border}`},actionBtn:{padding:"6px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",cursor:"pointer",border:"none",background:"transparent",transition:"background 0.2s"},fab:{position:"absolute",bottom:"24px",right:"24px",width:"56px",height:"56px",borderRadius:"16px",background:i.primary,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"transform 0.2s",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.85)",backdropFilter:"blur(25px) saturate(180%)",webkitBackdropFilter:"blur(25px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"16px 24px",background:i.surface,borderBottom:`1px solid ${i.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"24px",overflowY:"auto"},inputGroup:{marginBottom:"20px"},label:{display:"block",fontSize:"12px",fontWeight:"700",color:i.textSub,marginBottom:"8px",textTransform:"uppercase"},input:{width:"100%",padding:"12px",borderRadius:"8px",border:`1px solid ${i.border}`,fontSize:"14px",fontFamily:"inherit",outline:"none",background:i.surface,boxSizing:"border-box"}},s=document.createElement("div");s.id="library-popup",s.classList.add("cw-module-window"),Object.assign(s.style,me,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let u=pe(s,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:s},()=>k());s.appendChild(u);let l=document.createElement("div");Object.assign(l.style,r.container),s.appendChild(l);let p=document.createElement("div");Object.assign(p.style,r.tabHeader);let x=[{id:"general",label:"Geral",icon:"\u{1F4CB}"},{id:"note",label:"Notas",icon:"\u{1F4DD}"},{id:"email",label:"Emails",icon:"\u{1F4E7}"}];x.forEach(S=>{let O=document.createElement("div");O.innerHTML=`${S.icon} ${S.label}`,O.id=`lib-tab-${S.id}`,Object.assign(O.style,r.tabBtn),S.id===o&&Object.assign(O.style,r.tabActive),O.onmouseenter=()=>G.playHover(),O.onclick=()=>Z(S.id),p.appendChild(O)}),l.appendChild(p);let f=document.createElement("div");Object.assign(f.style,r.listContainer),l.appendChild(f);let g=document.createElement("div");g.className="cw-fab cw-tactile",Object.assign(g.style,r.fab),g.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',g.onmouseenter=()=>g.style.transform="scale(1.1)",g.onmouseleave=()=>g.style.transform="scale(1)",g.onclick=()=>_(),l.appendChild(g),a=document.createElement("div"),Object.assign(a.style,r.editorOverlay);let m=document.createElement("div");Object.assign(m.style,r.editorHeader),m.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let w=document.createElement("button");w.innerHTML="Cancelar",w.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",w.onclick=F,m.appendChild(w),a.appendChild(m);let A=document.createElement("div");Object.assign(A.style,r.editorBody),a.appendChild(A);let N=document.createElement("div");N.style.cssText="padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";let P=document.createElement("button");P.textContent="Salvar",P.style.cssText="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);",P.onclick=$,N.appendChild(P),a.appendChild(N),l.appendChild(a);let R=document.createElement("div");Object.assign(R.style,Ae),R.className="no-drag",s.appendChild(R),Te(s,R),document.body.appendChild(s);function Z(S){G.playClick(),o=S,x.forEach(O=>{let b=document.getElementById(`lib-tab-${O.id}`);O.id===S?Object.assign(b.style,r.tabActive):Object.assign(b.style,r.tabBtn)}),J()}function J(){f.innerHTML="";let S=he.getSnippets(o);if(S.length===0){f.innerHTML=`
                <div style="${q(r.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;return}S.forEach(O=>{let b=document.createElement("div");b.className="cw-lib-card",Object.assign(b.style,r.card),O.isCode&&(b.style.borderLeft=`4px solid ${i.primary}`,b.style.background="rgba(0, 122, 255, 0.02)");let C=O.content;if(O.isRich){let T=document.createElement("div");T.innerHTML=O.content;let I=T.querySelector("img");C=T.innerText.substring(0,150)+(T.innerText.length>150?"...":""),I&&(C="\u{1F5BC}\uFE0F [Cont\xE9m Imagens] "+C)}b.innerHTML=`
                <div style="${q(r.cardHeader)}">
                    <div style="${q(r.cardTitle)}">${O.title}</div>
                    <div style="display:flex; gap:4px;">
                        ${O.isCode?'<span style="font-size:10px; background:#F1F3F4; color:#5F6368; padding:2px 6px; border-radius:4px; font-family:monospace;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>':""}
                    </div>
                </div>
                <div style="${q(r.cardPreview)}; ${O.isCode?"font-family:'Roboto Mono', monospace; font-size:11px;":""}">${C}</div>
                <div style="${q(r.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${q(r.actionBtn)}; color:#007AFF; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${q(r.actionBtn)}; color:#8E8E93; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${q(r.actionBtn)}; color:#FF3B30; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                    </button>
                </div>
            `,b.onmouseenter=()=>{G.playHover()},b.querySelector(".cw-act-copy").onclick=T=>{if(T.stopPropagation(),G.playClick(),O.isRich){let I=new Blob([O.content],{type:"text/html"}),D=document.createElement("div");D.style.whiteSpace="pre-wrap",D.innerHTML=O.content;let z=new Blob([D.innerText],{type:"text/plain"}),Y=[new ClipboardItem({"text/html":I,"text/plain":z})];navigator.clipboard.write(Y)}else navigator.clipboard.writeText(O.content);W("Copiado!")},b.querySelector(".cw-act-edit").onclick=T=>{T.stopPropagation(),G.playClick(),_(O)},b.querySelector(".cw-act-del").onclick=async T=>{T.stopPropagation(),G.playClick(),await xe("Excluir este item?")&&(he.delete(O.id),J(),W("Item exclu\xEDdo."))},f.appendChild(b)})}function _(S=null){n=S?S.id:null,A.innerHTML="",A.appendChild(j("title","T\xEDtulo / Nome",S?S.title:"")),o==="email"&&A.appendChild(j("subject","Assunto do Email",S?S.subject:""));let O="Conte\xFAdo";o==="email"&&(O="Corpo do Email (HTML)"),o==="note"&&(O="Texto da Nota (Reason)"),A.appendChild(j("content",O,S?S.content:"",{isRich:!0,isCode:S?S.isCode:!1})),m.querySelector("span").textContent=S?"Editar Item":"Novo Item",a.style.transform="translateY(0)",setTimeout(()=>{let b=A.querySelector("input");b&&b.focus()},300)}function F(){a.style.transform="translateY(100%)",setTimeout(()=>n=null,300)}async function $(){let S=A.querySelector("#cw-inp-title"),O=A.querySelector("#cw-inp-content"),b=S.value.trim(),C=O.contentEditable==="true"?O.innerHTML:O.value.trim(),T=O.getAttribute("data-is-code")==="true";if(!b||!C||C==="<br>"){W("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let I={id:n,type:o,title:b,content:C,isCode:T,isRich:O.contentEditable==="true"};if(o==="email"){let D=A.querySelector("#cw-inp-subject").value.trim();if(!D){W("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}I.subject=D}P.textContent="Salvando...",await he.save(I),P.textContent="Salvar",F(),J(),W("Salvo com sucesso!"),G.playSuccess()}function j(S,O,b,C={}){let T=document.createElement("div");Object.assign(T.style,r.inputGroup);let I=document.createElement("label");I.textContent=O,Object.assign(I.style,r.label);let D;if(C.isRich){let z=document.createElement("div");z.style.cssText="display:flex; gap:6px; margin-bottom:12px; background:rgba(241, 243, 244, 0.8); padding:6px; border-radius:12px; border:1px solid #DADCE0; backdrop-filter: blur(10px);",z.innerHTML=`
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
            `,D=document.createElement("div"),D.contentEditable="true",Object.assign(D.style,r.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),D.innerHTML=b||"",C.isCode&&(D.style.fontFamily="'Roboto Mono', monospace",D.style.backgroundColor="#F8F9FA",D.setAttribute("data-is-code","true")),z.querySelectorAll(".cw-toolbar-btn").forEach(Y=>{Y.onmouseenter=()=>G.playHover(),Y.onmousedown=()=>G.playClick()}),z.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),D.focus()},z.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),D.focus()},z.querySelector(".cw-tb-code").onclick=Y=>{let V=!(D.getAttribute("data-is-code")==="true");D.setAttribute("data-is-code",V),D.style.fontFamily=V?"'Roboto Mono', monospace":"inherit",D.style.backgroundColor=V?"rgba(0, 122, 255, 0.03)":i.surface,V?Y.currentTarget.classList.add("active"):Y.currentTarget.classList.remove("active"),D.focus()},z.querySelector(".cw-tb-img").onclick=async()=>{let Y=await Kt("Cole a URL da imagem:");Y&&(document.execCommand("insertImage",!1,Y),D.querySelectorAll("img").forEach(V=>{V.style.maxWidth="100%",V.style.borderRadius="8px"}))},D.onpaste=Y=>{let y=(Y.clipboardData||Y.originalEvent.clipboardData).items;for(let V of y)if(V.kind==="file"&&V.type.startsWith("image/")){Y.preventDefault();let K=V.getAsFile(),E=new FileReader;E.onload=c=>{let v=`<img src="${c.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,v)},E.readAsDataURL(K)}},T.appendChild(I),T.appendChild(z)}else D=document.createElement("input"),D.type="text",Object.assign(D.style,r.input),D.value=b||"",T.appendChild(I);return D.id=`cw-inp-${S}`,D.onfocus=()=>{D.style.borderColor=i.primary,D.style.boxShadow=`0 0 0 2px ${i.primaryBg}`},D.onblur=()=>{D.style.borderColor=i.border,D.style.boxShadow="none"},T.appendChild(D),T}function q(S){return Object.entries(S).map(([O,b])=>`${O.replace(/[A-Z]/g,C=>"-"+C.toLowerCase())}:${b}`).join(";")}function k(){e=!e,ue(e,s,"cw-btn-library"),e&&J()}return k}function qo(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},a="cw-configs-styles";if(!document.getElementById(a)){let x=document.createElement("style");x.id=a,x.innerHTML=`
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
        `,document.head.appendChild(x)}let n=document.createElement("div");n.id="configs-popup",n.classList.add("cw-module-window"),Object.assign(n.style,me,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r=pe(n,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:n},()=>p());n.appendChild(r);let s=document.createElement("div");s.className="cw-configs-container",n.appendChild(s);let d=document.createElement("div");d.className="cw-configs-section",d.innerHTML=`
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
    `;let u=d.querySelector("#cw-config-sound-toggle");u.onchange=x=>{G.setMuted(!x.target.checked),x.target.checked&&G.playClick()},s.appendChild(d);let l=document.createElement("div");l.className="cw-configs-section",l.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugest\xF5es</a>
            </div>
        </div>
    `,s.appendChild(l);function p(){e=!e,ue(e,n,"cw-btn-configs"),e&&G.playClick()}return document.body.appendChild(n),p}var ne={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"},qe={small:"8px",medium:"12px",large:"16px",pill:"100px"},la={deep:"0 12px 40px rgba(0,0,0,0.12)",subtle:"0 4px 12px rgba(0,0,0,0.05)"},tt="cubic-bezier(0.4, 0, 0.2, 1)",wt=`all 0.3s ${tt}`,_o=()=>{if(document.getElementById("bau-form-global-styles"))return;let t=document.createElement("style");t.id="bau-form-global-styles",t.innerHTML=`
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
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    /* --- BASE & UTILITIES --- */
    .input-error {
      border-color: ${ne.red} !important;
      box-shadow: 0 0 0 3px rgba(217, 48, 37, 0.15) !important;
    }

    .bau-popup {
      display: flex !important; flex-direction: column !important;
      width: 520px !important; max-height: 85vh !important;
      background: ${ne.surface} !important;
      backdrop-filter: blur(12px) !important; -webkit-backdrop-filter: blur(12px) !important;
      border-radius: ${qe.large} !important; box-shadow: ${la.deep} !important;
      border: 1px solid rgba(255, 255, 255, 0.4) !important;
      overflow: hidden !important; position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%); z-index: 10000;
      font-family: 'Google Sans', Roboto, sans-serif;
    }

    /* --- REFRESH BUTTON --- */
    .bau-refresh-btn {
        position: absolute;
        top: 18px;
        right: 90px;
        background: none;
        border: none;
        color: white;
        opacity: 0.6;
        cursor: pointer;
        transition: all 0.3s ${tt};
        padding: 6px;
        border-radius: 50%;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .bau-refresh-btn:hover {
        opacity: 1;
        background: rgba(255,255,255,0.15);
    }
    .bau-refresh-btn.rotating {
        animation: spin 0.5s linear;
    }
    .bau-refresh-btn svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
    }

    /* --- PROGRESS INDICATOR --- */
    .bau-progress-indicator {
      display: flex; justify-content: space-around; padding: 20px 32px;
      border-bottom: 1px solid ${ne.border};
      background: rgba(248, 249, 250, 0.7);
    }
    .bau-progress-step {
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: 50%;
      background-color: #F1F3F4; color: ${ne.textSecondary};
      font-weight: 700; font-size: 14px; border: 2px solid #F1F3F4;
      transition: ${wt}; position: relative;
    }
    .bau-progress-step.active { background-color: ${ne.blueLight}; color: ${ne.blue}; border-color: ${ne.blue}; transform: scale(1.1); }
    .bau-progress-step.completed { background-color: ${ne.greenLight}; color: ${ne.green}; border-color: ${ne.green}; }
    
    /* --- CONTENT & STEPS --- */
    .bau-content { padding: 32px; overflow-y: auto; flex-grow: 1; }
    .bau-step { display: none; animation: fadeIn 0.5s ${tt}; opacity: 0; }
    .bau-step.active { display: block; opacity: 1; }

    .bau-card {
      background: ${ne.white}; border-radius: ${qe.medium};
      padding: 24px; border: 1px solid ${ne.border};
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

    /* --- LANGUAGE TOGGLE --- */
    .bau-lang-toggle-wrapper { flex-grow: 1; }
    .bau-lang-toggle {
        display: flex;
        align-items: center;
        background-color: rgba(0,0,0,0.25);
        border-radius: ${qe.pill};
        padding: 4px;
        cursor: pointer;
        position: relative;
        width: 130px;
        height: 32px;
        transition: background-color 0.3s;
    }
    .bau-lang-toggle:hover { background-color: rgba(0,0,0,0.35); }
    .bau-lang-toggle span {
        flex: 1;
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        color: #fff;
        z-index: 1;
        transition: color 0.3s;
    }
    .bau-lang-toggle .glider {
        position: absolute;
        top: 4px;
        height: calc(100% - 8px);
        width: calc(50% - 4px);
        background-color: #fff;
        border-radius: ${qe.pill};
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        transition: transform 0.3s ${tt};
    }
    .bau-lang-toggle[data-lang="Espanhol"] .glider { transform: translateX(100%); }
    .bau-lang-toggle[data-lang="Portugu\xEAs"] .lang-pt { color: ${ne.textPrimary}; }
    .bau-lang-toggle[data-lang="Espanhol"] .lang-es { color: ${ne.textPrimary}; }

    
    /* --- CARD DE FALLBACK (ESTILO SUAVIZADO) --- */
    .bau-fallback-card {
        background-color: ${ne.yellowLight};
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
      color: ${ne.textSecondary};
      margin-bottom: 8px;
      margin-top: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .bau-input, .bau-select, .bau-textarea {
      width: 100%;
      padding: 12px 16px;
      border-radius: ${qe.medium};
      border: 1.5px solid ${ne.border};
      background-color: #F8F9FA;
      font-size: 14px;
      color: ${ne.textPrimary};
      transition: ${wt};
      box-sizing: border-box;
      outline: none;
      font-family: inherit;
    }
    .bau-input:focus, .bau-select:focus, .bau-textarea:focus {
      border-color: ${ne.blue};
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
      border-radius: ${qe.pill};
      background-color: ${ne.blueLight};
      color: ${ne.blue};
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: ${wt};
      border: 1px solid transparent;
    }
    .bau-chip:hover {
      background-color: #d2e3fc;
    }
    .bau-chip.active {
      background-color: ${ne.blue};
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
        border: 1px solid ${ne.border};
        border-radius: ${qe.medium};
        cursor: pointer;
        transition: all 0.2s ${tt};
    }
    .bau-task-item:hover {
        background: #fff;
        border-color: ${ne.blue};
    }
    .bau-task-item.active {
        background: ${ne.blueLight};
        border-color: ${ne.blue};
        color: ${ne.blue};
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
        color: ${ne.textSecondary};
        font-weight: 600;
    }
    .bau-confirm-value {
        color: ${ne.textPrimary};
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
        color: ${ne.textSecondary};
        background-color: #F8F9FA;
        border-radius: ${qe.medium};
        line-height: 1.6;
    }

    /* --- FOOTER & NAVIGATION BUTTONS --- */
    .bau-footer {
      display: flex;
      justify-content: flex-end;
      padding: 24px 32px;
      gap: 12px;
      border-top: 1px solid ${ne.border};
      background: #F8F9FA;
    }
    .bau-btn-primary, .bau-btn-secondary, .bau-btn-submit {
      padding: 12px 24px;
      border-radius: ${qe.pill};
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: ${wt};
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      outline: none;
    }
    .bau-btn-primary {
      background-color: ${ne.blue};
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
      color: ${ne.textSecondary};
      border: 1px solid ${ne.border};
    }
    .bau-btn-secondary:hover {
      background-color: #E8EAED;
      color: ${ne.textPrimary};
    }
    .bau-btn-submit {
      background-color: ${ne.green};
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

    .bau-mini-btn {
        font-size: 10px;
        font-weight: 700;
        color: #fff;
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.4);
        border-radius: 100px;
        padding: 2px 8px;
        cursor: pointer;
        transition: all 0.2s;
        flex-shrink: 0;
        outline: none;
    }
    .bau-mini-btn:hover {
        background: rgba(255,255,255,0.3);
        transform: scale(1.05);
    }

    /* --- GRIDS --- */
    .bau-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  `,document.head.appendChild(t)};function Mo(){_o();let t=!1,e=null,o=1,a=4,n=document.createElement("div");n.id="bau-form-popup",n.className="bau-popup cw-module-window",n.style.display="none";let r=pe(n,"BAU Form","v1.2.0","Solicite a abertura de casos BAU em um fluxo guiado.",{googleLine:null},()=>K());n.appendChild(r);let s=document.createElement("button");s.className="bau-refresh-btn",s.innerHTML='<svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></svg>',s.title="Recarregar dados do caso",r.appendChild(s);let d=document.createElement("div");d.className="bau-progress-indicator",n.appendChild(d);let u=document.createElement("div");u.className="bau-content",n.appendChild(u);let l=document.createElement("form");l.id="bau-escalation-form",u.appendChild(l);let p=document.createElement("input");p.type="hidden",p.name="language",l.appendChild(p);let x=document.createElement("div");x.className="bau-step active",x.id="bau-step-1";let f=document.createElement("div");f.className="bau-card bau-context-card";let g=document.createElement("div");g.innerHTML=`
        <div class="bau-inline-field" title="Clique para editar" style="margin-bottom: 4px;">
            <input type="text" id="bau-adv-name-input" name="advName" class="bau-title bau-inline-input" style="border-bottom: none; font-size: 20px;" placeholder="Nome do Anunciante" required>
        </div>
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; margin-left: 10px; opacity: 0.9;">
            <div class="bau-inline-field" title="Clique para editar" style="padding: 2px 6px;">
                 <span style="color: #fff; font-size: 13px; font-weight: 700;">CID:</span>
                 <input type="text" id="bau-cid-input" name="cid" class="bau-inline-input" style="width: 110px; font-size: 13px; border-bottom-color: rgba(255,255,255,0.3);" placeholder="CID" required>
            </div>
            <span style="color: #fff; opacity: 0.5;">\u2022</span>
            <div class="bau-inline-field" title="Clique para editar" style="padding: 2px 6px;">
                 <span style="color: #fff; font-size: 13px; font-weight: 700;">AM:</span>
                 <input type="text" id="bau-am-name-input" name="amName" class="bau-inline-input" style="width: 130px; font-size: 13px; border-bottom-color: rgba(255,255,255,0.3);" placeholder="Account Manager" required>
            </div>
            <span style="color: #fff; opacity: 0.5;">\u2022</span>
            <div class="bau-inline-field" style="padding: 2px 6px; position: relative;">
                 <span style="color: #fff; font-size: 13px; font-weight: 700;">SE ID:</span>
                 <input type="text" id="bau-context-se-id-input" name="seId" class="bau-inline-input" style="width: 160px; font-size: 13px; border-bottom-color: rgba(255,255,255,0.3);" placeholder="Speakeasy ID">
                 <button type="button" id="bau-top-se-search" class="bau-mini-btn" title="Buscar ID automaticamente" style="margin-left: 8px;">\u2728</button>
            </div>
        </div>
        <div id="bau-all-data"></div>
    `,f.appendChild(g),x.appendChild(f),l.appendChild(x);let m=document.createElement("div");m.className="bau-step",m.id="bau-step-2";let w=document.createElement("div");w.className="bau-card",w.innerHTML=`
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
            ${["Setup GTM","Google Ads Conversion","GA4 Events","Enhanced Conversions","Offline Conversions","Consent Mode","Troubleshooting","Outros"].map(E=>`
                <label class="bau-task-item">
                    <input type="checkbox" name="taskType" value="${E}">
                    <span>${E}</span>
                </label>
            `).join("")}
        </div>
    `,w.querySelectorAll(".bau-task-item").forEach(E=>{let c=E.querySelector("input");c.addEventListener("change",()=>{E.classList.toggle("active",c.checked),c.checked&&G.playClick()})}),m.appendChild(w),l.appendChild(m);let A=document.createElement("div");A.className="bau-step",A.id="bau-step-3";let N=document.createElement("div");N.className="bau-card";let P=document.createElement("label");P.className="bau-label",P.textContent="Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",N.appendChild(P);let R=document.createElement("select");R.name="nonImplementationReason",R.required=!0,R.className="bau-select";let Z=["Tempo da consultoria esgotado","Solicita\xE7\xE3o de reagendamento pelo anunciante","Falta de acessos ou backup do site","Anunciante indispon\xEDvel ou n\xE3o preparado","Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)","Solicita\xE7\xE3o de tarefas (tasks) adicionais","Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)","Retorno de contato ap\xF3s prazo de 14 dias expirado"],J='<option value="">Selecione um motivo...</option>';Z.forEach(E=>{J+=`<option value="${E}">${E}</option>`}),R.innerHTML=J,N.appendChild(R);let _=document.createElement("label");_.className="bau-label",_.textContent="Justificativa / Descri\xE7\xE3o",_.style.marginTop="20px",N.appendChild(_);let F=document.createElement("textarea");F.name="description",F.required=!0,F.className="bau-textarea",F.placeholder="Descreva detalhadamente o que precisa ser feito...",F.style.minHeight="120px",N.appendChild(F);let $=document.createElement("label");$.className="bau-label",$.textContent="Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",$.style.marginTop="20px",N.appendChild($);let j=document.createElement("div");j.className="bau-availability-container";for(let E=1;E<=3;E++){let c=document.createElement("input");c.type="datetime-local",c.name=`availability_${E}`,c.required=E===1,c.className="bau-input",j.appendChild(c)}N.appendChild(j);let q=document.createElement("div");q.className="bau-availability-hint",N.appendChild(q),A.appendChild(N),l.appendChild(A);let k=document.createElement("div");k.className="bau-step",k.id="bau-step-4";let S=document.createElement("div");S.className="bau-card",S.innerHTML=`
        <h3 style="margin-top: 0; color: ${ne.blue}; font-size: 16px; margin-bottom: 20px;">Confirme os dados antes de enviar</h3>
        <div id="bau-confirmation-details"></div>
    `,k.appendChild(S),l.appendChild(k);let O=document.createElement("div");O.className="bau-footer";let b=document.createElement("button");b.type="button",b.className="bau-btn-secondary",b.textContent="Voltar",O.appendChild(b);let C=document.createElement("button");C.type="button",C.className="bau-btn-primary",C.textContent="Pr\xF3ximo",O.appendChild(C);let T=document.createElement("button");T.type="submit",T.className="bau-btn-submit",T.setAttribute("form","bau-escalation-form"),T.innerHTML="<span>\u{1F4DD}</span> Enviar para o TL",T.style.display="none",O.appendChild(T),n.appendChild(O),document.body.appendChild(n);function I(){l.querySelectorAll(".bau-step").forEach((E,c)=>{E.classList.toggle("active",c+1===o)}),d.innerHTML="";for(let E=1;E<=a;E++){let c=document.createElement("div");c.className=`bau-progress-step ${E===o?"active":E<o?"completed":""}`,c.textContent=E,d.appendChild(c)}b.style.display=o>1?"inline-block":"none",C.style.display=o<a?"inline-block":"none",T.style.display=o===a?"inline-block":"none",o===4&&D()}function D(){let E=new FormData(l),c=Object.fromEntries(E.entries()),v=E.getAll("taskType"),h=[c.availability_1,c.availability_2,c.availability_3].filter(L=>L&&L.trim()!=="").map(L=>L.replace("T"," ")).join(" | "),M=document.getElementById("bau-confirmation-details");M.innerHTML=`
            <div class="bau-confirm-row"><span class="bau-confirm-label">Anunciante:</span><span class="bau-confirm-value">${c.advName}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">CID:</span><span class="bau-confirm-value">${c.cid}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">AM:</span><span class="bau-confirm-value">${c.amName}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Email:</span><span class="bau-confirm-value">${c.email||"N/A"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Programa:</span><span class="bau-confirm-value">${c.salesProgram||"N/A"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Speakeasy ID:</span><span class="bau-confirm-value">${c.seId||"N/A"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Idioma:</span><span class="bau-confirm-value">${c.language||"Portugu\xEAs"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Motivo da N\xE3o Implementa\xE7\xE3o:</span><span class="bau-confirm-value">${c.nonImplementationReason}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Motivo:</span><span class="bau-confirm-value">${c.reason}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Tasks:</span><span class="bau-confirm-value">${v.join(", ")}</span></div>
            <div class="bau-confirm-row" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                <span class="bau-confirm-label">Descri\xE7\xE3o:</span>
                <div style="font-size: 13px; color: ${ne.textPrimary}; background: #f8f9fa; padding: 12px; border-radius: 8px; width: 100%; box-sizing: border-box; white-space: pre-wrap;">${c.description}</div>
            </div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Disponibilidade:</span><span class="bau-confirm-value">${h||"N/A"}</span></div>
        `}function z(E){let c=document.getElementById(`bau-step-${E}`);if(!c)return!0;if(E===2){let h=l.querySelector('select[name="reason"]').value,M=Array.from(l.querySelectorAll('input[name="taskType"]:checked'));return h?M.length===0?(W("Erro: Selecione pelo menos uma Task.","error"),!1):!0:(W("Erro: O Motivo da Abertura \xE9 obrigat\xF3rio.","error"),!1)}let v=c.querySelectorAll("[required]");for(let h of v)if(!h.value.trim()){let M="",L=h.closest("div")?.querySelector(".bau-label");if(L)M=L.textContent;else{let X=h.closest(".bau-inline-field")?.querySelector("span");M=X?X.textContent:h.placeholder||h.name}return W(`Erro: O campo '${M.replace(":","")}' \xE9 obrigat\xF3rio.`,{error:!0}),h.classList.add("input-error"),setTimeout(()=>h.classList.remove("input-error"),3e3),!1}return!0}C.onclick=()=>{z(o)&&(o++,I(),G.playClick())},b.onclick=()=>{o>1&&(o--,I(),G.playClick())};async function Y(){s.classList.add("rotating"),W("Atualizando dados do CRM...","info");try{await y()}catch{W("Falha ao atualizar dados.","error")}finally{setTimeout(()=>{s.classList.remove("rotating")},500)}}s.onclick=Y;async function y(){let E=await we()||{};e=E,V(E)}function V(E){if(!E)return;l.querySelector('[name="advName"]').value=E.advName||"",l.querySelector('[name="cid"]').value=E.cid||"",l.querySelector('[name="amName"]').value=E.amName||"",l.querySelector('[name="seId"]').value=E.seId||"";let c=document.getElementById("bau-top-se-search");c&&(c.onclick=async L=>{L.stopPropagation(),L.preventDefault(),await ct("bau-context-se-id-input")});let v=document.getElementById("bau-all-data");if(v){v.innerHTML="";let L=[{label:"Email",name:"email",value:E.email,type:"text"},{label:"Programa",name:"salesProgram",value:E.salesProgram,type:"text"},{label:"Timezone",name:"timezone",value:E.timezone,type:"text"}],X=document.createElement("div");X.className="bau-inline-field",X.innerHTML="<b>Idioma:</b>";let H=document.createElement("div");H.className="bau-lang-toggle-wrapper";let ee=document.createElement("div");ee.className="bau-lang-toggle",ee.innerHTML=`
                <div class="glider"></div>
                <span class="lang-pt">Portugu\xEAs</span>
                <span class="lang-es">Espanhol</span>
            `;let ae=E.language&&E.language.toLowerCase().includes("espanhol")?"Espanhol":"Portugu\xEAs";ee.dataset.lang=ae,p.value=ae,ee.onclick=()=>{let Q=ee.dataset.lang==="Portugu\xEAs"?"Espanhol":"Portugu\xEAs";ee.dataset.lang=Q,p.value=Q,G.playClick(.8)},H.appendChild(ee),X.appendChild(H),v.appendChild(X),L.forEach(Q=>{let oe=document.createElement("div");oe.className="bau-inline-field",oe.title="Clique para editar";let te=document.createElement("b");te.textContent=`${Q.label}:`,oe.appendChild(te);let re=document.createElement("input");re.type="text",re.name=Q.name,re.className="bau-inline-input",re.value=Q.value||"",re.placeholder=`Preencher ${Q.label}...`,(!Q.value||Q.value==="N/A"||Q.value==="---")&&(re.value=""),oe.appendChild(re),oe.onclick=()=>re.focus(),v.appendChild(oe)})}q.innerHTML=`\u2139\uFE0F Lembrete: Os hor\xE1rios s\xE3o baseados no seu fuso hor\xE1rio atual (${E.timezone||"n\xE3o detectado"}). Fornecer mais de uma op\xE7\xE3o aumenta a chance de agendamento r\xE1pido.`,[{key:"advName",label:"Nome do Anunciante"},{key:"cid",label:"Customer ID (CID)"},{key:"amName",label:"Account Manager"}].filter(L=>!E[L.key]||E[L.key]==="N/A"||E[L.key].trim()==="---").length>0?W("\u26A0\uFE0F Alguns dados de CRM n\xE3o foram encontrados. Complete os campos edit\xE1veis.","warning"):W("\u2705 Dados do CRM carregados. Voc\xEA pode editar qualquer campo.","info")}l.onsubmit=async E=>{if(E.preventDefault(),!z(a))return;let c=T.innerHTML;T.disabled=!0,T.innerHTML="Enviando...";let v=new FormData(l),h=Object.fromEntries(v.entries()),M=v.getAll("taskType"),L={caseId:e.caseId||"",cid:h.cid||e.cid||"",seId:h.seId||e.seId||"",advName:h.advName||e.advName||"",email:h.email||e.email||"",language:h.language||e.language||"",amName:h.amName||e.amName||"",salesProgram:h.salesProgram||e.salesProgram||"",site:h.site||e.site||"",timezone:h.timezone||e.timezone||"",nonImplementationReason:h.nonImplementationReason,reason:h.reason,taskType:M.join(", "),description:h.description,availability:`${h.availability_1||""} | ${h.availability_2||""} | ${h.availability_3||""}`.trim()};try{await ro(L,e.agentEmail||"anon"),G.playSuccess(),W("Escalonamento enviado com sucesso!","success"),l.reset(),o=1,e=null,I(),K()}catch(X){console.error("Erro BAU:",X),W("Falha ao enviar: "+(X.message||"Erro desconhecido"),"error")}finally{T.disabled=!1,T.innerHTML=c}};async function K(){t=!t,n.style.display=t?"flex":"none",t&&(await Y(),o=1,I()),ue(t,n,"cw-btn-bauform")}return I(),K}function ca(){if(window.techSolInitialized){At();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{Ht();try{G.initGlobalListeners(),G.playStartup()}catch(l){console.warn("\xC1udio bloqueado:",l)}fe.fetchTips(),At();let e=fo(),o=vo(),a=So(),n=Eo(),i=Io(),r=Lo(),s=qo(),d=Mo(),u=Ao();so({toggleNotes:e,toggleEmail:o,toggleScript:a,toggleLinks:n,toggleTimezone:i,toggleLibrary:r,toggleConfigs:s,toggleBAUForm:d,broadcastControl:u}),setTimeout(()=>{fe.logEvent("App","Start","Session Start"),To(),setTimeout(()=>{Fo(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),W("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}ca();})();
