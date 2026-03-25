(()=>{var vt="",wt="",ro=e=>new Promise(t=>setTimeout(t,e));async function lo(){if(vt&&wt)return vt;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await ro(150);let t="Consultor",n=document.querySelector("profile-details .name");if(n)t=n.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let i=document.querySelector("profile-details img");if(i&&i.src.includes("/photos/")){let s=i.src.match(/\/photos\/([^\?]+)/)[1];t=s.charAt(0).toUpperCase()+s.slice(1)}}let o=document.querySelector("profile-details .email");return o&&(wt=o.textContent.trim(),console.log("TechSol: Identidade confirmada ->",wt)),e.click(),document.body.click(),vt=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function Bt(){return vt||"Consultor"}function Ct(){return wt||null}function co(e){let t=new Date,n=t.getHours(),o=t.getDay(),i="Ol\xE1",s="";n>=5&&n<12?(i="Bom dia",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(i="Boa tarde",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(i="Boa noite",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=a[Math.floor(Math.random()*a.length)];return{prefix:`${i},`,name:e,suffix:r,icon:s,isFriday:o===5}}async function Jo(){try{let t=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!t)return null;let n=t.parentElement,o=n.querySelector(".unmask-button")||n.querySelector('[aria-label="Click to view"]');o&&(o.click(),await ro(500));let s=Array.from(n.querySelectorAll("a, span, div, pii-value")).find(a=>{let r=a.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return s?s.innerText.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function Qo(){try{let e=document.querySelector('material-input[debug-id="account-id-input"]');if(e){let t=e.querySelector("input");if(t){let n=t.value.trim();if(n)return n.includes("@")?n:`${n}@google.com`}}}catch(e){console.warn("Erro ao capturar email interno:",e)}return null}function Zo(){try{let t=Array.from(document.querySelectorAll(".data-pair-label")).find(i=>i.textContent.includes("Google Ads External Customer ID")||i.textContent.includes("Customer ID"));if(t){let i=t.closest("home-data-item")||t.parentElement;if(i){let s=i.querySelector(".data-pair-content");if(s)return s.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let o=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(o)return o[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"---"}async function Ge(){let e="Cliente",t="[INSERIR URL]";try{let a=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let r=a.nextElementSibling.innerText.trim();r&&(e=r)}}catch(s){console.warn("Falha Nome:",s)}try{let a=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let r=a.nextElementSibling.innerText.trim();r&&(t=r)}}catch(s){console.warn("Falha URL:",s)}let n=await Jo(),o=Qo(),i=Zo();return{advertiserName:e,websiteUrl:t,clientEmail:n,internalEmail:o,cid:i,agentName:Bt()}}var Qe=null,Gt=null,Pe=.3;function Je(){if(!Qe){let e=window.AudioContext||window.webkitAudioContext;e&&(Qe=new e)}return Qe&&Qe.state==="suspended"&&Qe.resume(),Qe}function po(e){if(Gt)return Gt;let t=e.sampleRate*2,n=e.createBuffer(1,t,e.sampleRate),o=n.getChannelData(0);for(let i=0;i<t;i++)o[i]=Math.random()*2-1;return Gt=n,n}var J={playClick:()=>{let e=Je();if(!e)return;let t=e.currentTime,n=e.createBufferSource();n.buffer=po(e);let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let i=e.createGain();i.gain.setValueAtTime(Pe*.8,t),i.gain.exponentialRampToValueAtTime(.001,t+.015),n.connect(o),o.connect(i),i.connect(e.destination),n.start(t),n.stop(t+.02)},playHover:()=>{let e=Je();if(!e)return;let t=e.currentTime,n=e.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,t);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(Pe*.1,t+.005),o.gain.linearRampToValueAtTime(0,t+.02),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.03)},playSuccess:()=>{let e=Je();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((o,i)=>{let s=e.createOscillator(),a=e.createGain();s.type="sine",s.frequency.value=o,a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(Pe*.6,t+.05),a.gain.exponentialRampToValueAtTime(.001,t+.6),s.connect(a),a.connect(e.destination),s.start(t),s.stop(t+.7)})},playGenieOpen:()=>{let e=Je();if(!e)return;let t=e.currentTime,n=e.createBufferSource();n.buffer=po(e);let o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,t),o.frequency.exponentialRampToValueAtTime(800,t+.2);let i=e.createGain();i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(Pe*.5,t+.05),i.gain.linearRampToValueAtTime(0,t+.25),n.connect(o),o.connect(i),i.connect(e.destination),n.start(t),n.stop(t+.3)},playError:()=>{let e=Je();if(!e)return;let t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.type="triangle",n.frequency.setValueAtTime(120,t),n.frequency.exponentialRampToValueAtTime(80,t+.1),o.gain.setValueAtTime(Pe,t),o.gain.exponentialRampToValueAtTime(.001,t+.15),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.2)},playStartup:()=>{let e=Je();if(!e)return;let t=e.currentTime,n=.12,o=e.createOscillator(),i=e.createGain(),s=e.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,t),o.frequency.exponentialRampToValueAtTime(50,t+.1),s.type="lowpass",s.frequency.setValueAtTime(800,t),s.frequency.exponentialRampToValueAtTime(100,t+.1),i.gain.setValueAtTime(Pe*4,t),i.gain.exponentialRampToValueAtTime(.001,t+.1),o.connect(s),s.connect(i),i.connect(e.destination),o.start(t),o.stop(t+.12);let a=e.createOscillator(),r=e.createGain();a.type="sine",a.frequency.setValueAtTime(150,t),a.frequency.exponentialRampToValueAtTime(50,t+.15),r.gain.setValueAtTime(Pe*1.5,t),r.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(r),r.connect(e.destination),a.start(t),a.stop(t+.15),[55,55.4,110.5].forEach(l=>{let p=e.createOscillator(),g=e.createGain(),b=e.createBiquadFilter();p.type="sawtooth",p.frequency.value=l,b.type="lowpass",b.frequency.setValueAtTime(30,t),b.frequency.linearRampToValueAtTime(900,t+n+.2),b.frequency.exponentialRampToValueAtTime(40,t+3),g.gain.setValueAtTime(0,t),g.gain.linearRampToValueAtTime(Pe*.6,t+n+.1),g.gain.exponentialRampToValueAtTime(.001,t+3.5),p.connect(b),b.connect(g),g.connect(e.destination),p.start(t),p.stop(t+3.6)})},playNotification:()=>{let e=Je();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let i=e.createOscillator(),s=e.createGain();i.type="sine",i.frequency.setValueAtTime(o.freq,t),s.gain.setValueAtTime(0,t),s.gain.linearRampToValueAtTime(Pe*o.vol,t+.004),s.gain.exponentialRampToValueAtTime(.001,t+o.dur),i.connect(s),s.connect(e.destination),i.start(t),i.stop(t+o.dur+.1)})},playSwoosh:()=>{J.playGenieOpen()},playReset:()=>{J.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",n=>{if(!Qe)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let i=Date.now();i-e<t||(J.playHover(),e=i)},{passive:!0})}};var uo=1e4;function go(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function Y(e,t={}){let n=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=e,document.body.appendChild(n),t.error?J.playError():J.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},t.duration||4e3)}function bo(e,t=null){let n=0,o=0,i=0,s=0,a=t||e;a.style.cursor="grab",a.onmousedown=r;function r(p){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(p.target.tagName)||p.target.closest(".no-drag"))return;p=p||window.event,a.style.cursor="grabbing",e.style.transition="none";let g=e.getBoundingClientRect();e.style.transform="none",e.style.left=g.left+"px",e.style.top=g.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",uo++,e.style.zIndex=uo,i=p.clientX,s=p.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=l,document.onmousemove=c}function c(p){p=p||window.event,p.preventDefault(),n=i-p.clientX,o=s-p.clientY,i=p.clientX,s=p.clientY;let g=e.offsetTop-o,b=e.offsetLeft-n,h=16,x=window.innerWidth,f=window.innerHeight,A=e.offsetWidth,S=e.offsetHeight;b<h?b=h:b+A>x-h&&(b=x-A-h),g<h?g=h:g+S>f-h&&(g=f-S-h),e.style.top=g+"px",e.style.left=b+"px"}function l(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var qe={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var jt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},At={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var fo={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Te={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var Pt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],mo=-1;function dt(){let e=Math.floor(Math.random()*Pt.length);return e===mo&&(e=(e+1)%Pt.length),mo=e,Pt[e]}var je=e=>new Promise(t=>setTimeout(t,e));async function en(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let n=e.querySelector(".cursor");await je(200);for(let o=0;o<t.length;o++){let i=t.charAt(o),s=document.createElement("span");s.textContent=i,n&&n.parentNode===e?n.before(s):e.appendChild(s);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>t.length-3&&(a=30),await je(a)}await je(600),n&&(n.style.display="none")}async function Ht(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
        `,document.head.appendChild(t)}let e=document.createElement("div");e.className="splash-container",e.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await je(200);let t=await lo(),n=co(t),o=e.querySelector("#w-icon"),i=e.querySelector("#p1"),s=e.querySelector("#p2"),a=e.querySelector("#p3"),r=e.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),i&&(i.textContent=n.prefix),a&&(a.textContent=n.suffix),await je(300);let c=o?o.querySelector("svg"):null;if(c&&(c.style.opacity="1",c.style.transform="scale(1)"),await je(400),i&&(i.style.opacity="1"),J.playStartup(),s&&await en(s,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&r){await je(400),r.style.display="block",r.offsetWidth;let l=r.querySelector(".sextou-badge");l&&(l.style.opacity="1",l.style.transform="scale(1)")}await je(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await je(900),e.parentNode&&e.parentNode.removeChild(e)}}var at={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function it(e,t){t.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let i=e.style.transition;e.style.transition="none";let s=o.clientX,a=o.clientY,r=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),c=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),l=s,p=a,g=!1;function b(f){l=f.clientX,p=f.clientY,g||(window.requestAnimationFrame(()=>{h(),g=!1}),g=!0)}function h(){let f=r+(l-s),A=c+(p-a);f>360&&(e.style.width=f+"px"),A>300&&(e.style.height=A+"px")}function x(){document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",x),setTimeout(()=>{e.style.transition=i},50)}document.addEventListener("mousemove",b),document.addEventListener("mouseup",x)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function ho(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,n=>t[n]?t[n]:"")}var st=e=>new Promise(t=>setTimeout(t,e));function pt(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}var xo="cw-automation-styles";if(!document.getElementById(xo)){let e=document.createElement("style");e.id=xo,e.innerHTML=`
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
    `,document.head.appendChild(e)}function yo(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function vo(e){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let t=document.getElementById(e),n="";yo(!0),t&&(n=t.placeholder,t.placeholder="Buscando ID...",t.value="",t.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(pt(o),await st(1200));let i=document.querySelector("search-filter dropdown-button .button");if(i&&!(i.innerText||"").includes("All")){pt(i),await st(600);let b=document.querySelector('material-checkbox[debug-id="check-all-box"]');b&&b.getAttribute("aria-checked")!=="true"&&(pt(b),await st(300));let h=document.querySelector('material-button[debug-id="apply-filter"]');h&&(pt(h),await st(1500))}let s=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");s&&(s.scrollTop=s.scrollHeight,await st(500));let a=Array.from(document.querySelectorAll(".message-header"));for(let g=a.length-1;g>=0;g--){let b=a[g],h=b.querySelector("i.material-icons-extended"),x=h&&h.innerText.trim()==="phone_in_talk",f=b.innerText||"",A=f.includes("Agent joined")||f.includes("outbound-call")||f.includes("Speakeasy");if(x||A){b.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",b),t&&(t.placeholder="Lendo mensagem..."),pt(b),await st(1e3));break}}let c=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),l=/Speakeasy.*?(P\d{15,25})/i,p=null;for(let g=c.length-1;g>=0;g--){let b=c[g];if(b.offsetParent===null)continue;let h=(b.innerText||"").match(l);if(h&&h[1]){p=h[1];break}}if(t)if(p){try{await navigator.clipboard.writeText(p)}catch{}t.value=p,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),J.playSuccess(),Y(`ID Localizado: ${p}`),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else J.playError(),Y("Nenhum ID encontrado.",{error:!0}),t.placeholder="N\xE3o encontrado",t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),Y("Erro ao processar.",{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=n)),yo(!1)}}var He={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Fe={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},ut={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Ze={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},mt=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],$t=["CONSIDERACOES","COMENTARIOS"],De={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Implementamos [descrever o que foi feito]`},"quickfill-as-no-access":{type:"all","field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o tinha os acessos necess\xE1rios para podermos implementar as tasks"},"quickfill-in-nrp-bau":{type:"bau","field-REASON_COMMENTS":"NRP (BAU - 3 tentativas)","field-COMENTARIOS":`\u2022 Duas liga\xE7\xF5es seguidas, e-mail "Antes dos 10 minutos" e uma terceira e ultima tentativa de liga\xE7\xE3o.
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
\u2022 Tentativa 2 -`}};var ve=e=>new Promise(t=>setTimeout(t,e));function Oe(e,t="info"){let n={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,n[t]||n.info)}function ze(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function St(e,t){if(!e)return;let n=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(n);o&&o.remove();let i=e.getBoundingClientRect(),s=document.createElement("div");s.id=n,s.style.cssText=`
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
    `,s.innerHTML=`
        <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:#F9AB00; font-size:16px; margin-top:1px;">\u26A0\uFE0F</span>
            <span style="line-height:1.4;">${t}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let a=s.querySelector(".cw-close-btn");a.onclick=()=>{s.style.opacity="0",s.style.transform="translateY(-5px)",setTimeout(()=>s.remove(),300)},document.body.appendChild(s),requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(s)&&a.click()},25e3)}async function Et(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await ve(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await ve(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Vt(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(n=>{let o=n.offsetParent!==null,i=n.closest("case-message-view")!==null,s=n.closest(".editor")!==null||n.closest("write-card")!==null;return o&&!i&&s});return t&&Oe("Editor visualmente detectado.","success"),t}async function wo(){Oe("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(g=>g.innerText.trim()==="email");if(n&&n.offsetParent!==null){Oe("Bot\xE3o de email direto encontrado.");let g=n.closest("material-button")||n.closest("material-fab")||n;ze(g),e=!0}else{Oe("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let g=document.querySelector("material-fab-speed-dial");if(g){let b=g.querySelector(".trigger");if(b){ze(b),await ve(800);let x=Array.from(document.querySelectorAll("i.material-icons-extended")).find(f=>f.innerText.trim()==="email");x&&(ze(x),e=!0)}}}if(!e)return Y("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;Oe("\u{1F680} FASE 2: Verificando rascunhos...");let o=null,i=0,s=20;for(;i<s;){await ve(250);let g=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(o=Array.from(g).find(b=>b.offsetParent!==null),o){Oe("\u26A0\uFE0F Rascunho detectado!","warn");break}i++}if(o){Oe("\u{1F5D1}\uFE0F Descartando..."),ze(o),o.click();let g=null,b=0;for(;b<15;){await ve(300);let h=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(g=Array.from(h).find(x=>x.offsetParent!==null),g)break;b++}g&&(ze(g),Y("Limpando rascunho antigo...",{duration:2e3}),await ve(2500))}Oe("\u{1F680} FASE 3: Buscando editor final...");let a=0,r=null;for(;a<20&&(r=Vt(),!r);)await ve(250),a++;if(!r)return Y("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let c=r.closest('[id="email-body-content-top"]'),p=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(c){if(p){let b=p.closest('[aria-hidden="true"]');b&&b.removeAttribute("aria-hidden"),p.focus(),ze(p)}await ve(300),c.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let g=c.querySelector("#cases-body-field");if(g){let b=document.createRange();b.selectNodeContents(g),b.collapse(!0);let h=window.getSelection();h.removeAllRanges(),h.addRange(b)}return!0}return!1}async function Tt(e){if(!e||!await wo())return;let n=await Ge();Oe("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await ve(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await Et(s,n.clientEmail),St(s,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await Et(s,n.internalEmail),St(s,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await ve(500);let i=document.querySelector('material-button[debug-id="canned_response_button"]');if(i){ze(i),await ve(1e3);let s=document.querySelector("material-auto-suggest-input input");if(s){ze(s),document.execCommand("insertText",!1,e),s.dispatchEvent(new Event("input",{bubbles:!0})),Oe("\u23F3 Buscando resultado da Canned Response...","info");let a=null,r=0,c=15e3,l=500;for(;r<c&&(a=document.querySelector("material-select-dropdown-item"),!a);)await ve(l),r+=l;if(a){ze(a),await ve(1500);let p=Vt();if(p){let b=Array.from(p.querySelectorAll("span.field")).filter(x=>x.innerText.includes("{Requested Task Type}"));if(b.length>0){let x=b.map(A=>A.closest("tr")).filter(A=>A!==null),f=[...new Set(x)];if(f.length>0){let S=f[0].querySelector('td[width="100%"]');S&&(S.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let j=1;j<f.length;j++)f[j].remove()}}let h=p.innerHTML;n.advertiserName&&h.includes("{%ADVERTISER_NAME%}")&&(h=h.replace(/{%ADVERTISER_NAME%}/g,n.advertiserName)),h.includes("{%^79285%}")&&(h=h.replace(/{%\^79285%}/g,n.websiteUrl||"seu site")),p.innerHTML=h}Y("Canned Response aplicada!")}else Oe(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),Y(`Timeout: Template '${e}' n\xE3o carregou.`,{error:!0})}}else Y("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function Co(e){if(Oe(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await wo())return;let n=await Ge(),o=Bt();await ve(600);let i=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(i&&(i.click(),await ve(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await Et(r,n.clientEmail),St(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await Et(r,n.internalEmail),St(r,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let s=document.querySelector('input[aria-label="Subject"]');s&&e.subject&&(s.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(s,e.subject),s.dispatchEvent(new Event("input",{bubbles:!0})),await ve(300));let a=Vt();if(a){let c=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');c&&(c.focus(),ze(c));let l=new Date;l.setDate(l.getDate()+3);let p=l.getDay();p===6?l.setDate(l.getDate()+2):p===0&&l.setDate(l.getDate()+1);let g=l.toLocaleDateString("pt-BR"),b=e.body;b=b.replace(/\[Nome do Cliente\]/g,n.advertiserName||"Cliente"),b=b.replace(/\[INSERIR URL\]/g,n.websiteUrl||"seu site"),b=b.replace(/\[URL\]/g,n.websiteUrl||"seu site"),b=b.replace(/\[Seu Nome\]/g,o),b=b.replace(/\[MM\/DD\/YYYY\]/g,g),document.execCommand("insertHTML",!1,b),c&&(c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))),Y("Email preenchido com sucesso!",{duration:2e3}),Oe("\u2705 Processo finalizado com sucesso.","success")}else Y("Erro ao focar no editor.",{error:!0})}var tn={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Ao={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Le(e,t,n,o,i,s){let a=document.createElement("div");Object.assign(a.style,tn),bo(e,a);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(r),i&&(i.googleLine=r);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"12px"});let l=document.createElement("img");l.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(l.style,{width:"20px",height:"20px",pointerEvents:"none"});let p=document.createElement("span");p.textContent=t,c.appendChild(l),c.appendChild(p);let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center",gap:"4px"});let b='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',x=document.createElement("div");x.innerHTML=b,Object.assign(x.style,Ao),x.title="Sobre & Feedback",x.classList.add("no-drag"),x.onmouseenter=()=>{x.style.background="rgba(255,255,255,0.1)",x.style.color="#FFF"},x.onmouseleave=()=>{x.style.color!=="rgb(138, 180, 248)"&&(x.style.background="transparent",x.style.color="#9AA0A6")};let f=document.createElement("div");f.innerHTML=h,Object.assign(f.style,Ao),f.title="Fechar",f.classList.add("no-drag"),f.onmouseenter=()=>{f.style.background="rgba(242, 139, 130, 0.2)",f.style.color="#F28B82"},f.onmouseleave=()=>{f.style.background="transparent",f.style.color="#9AA0A6"},f.onmousedown=S=>S.stopPropagation(),x.onmousedown=S=>S.stopPropagation(),f.onclick=s;let A=on(e,t,n,o);return x.onclick=S=>{S.stopPropagation(),A.style.opacity==="1"?(A.style.opacity="0",A.style.pointerEvents="none",x.style.color="#9AA0A6",x.style.background="transparent"):(A.style.opacity="1",A.style.pointerEvents="auto",x.style.color="#8AB4F8",x.style.background="rgba(138, 180, 248, 0.1)")},g.appendChild(x),g.appendChild(f),a.appendChild(c),a.appendChild(g),a}function on(e,t,n,o){let i=document.createElement("div");return Object.assign(i.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),i.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Vers\xE3o ${n}</div>
        
        <div style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${o}
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
    `,setTimeout(()=>{let s=i.querySelector("#cw-feedback-link");s&&(s.onmouseenter=()=>{s.style.backgroundColor="#E8F0FE",s.style.transform="scale(1.02)"},s.onmouseleave=()=>{s.style.backgroundColor="#F8F9FA",s.style.transform="scale(1)"});let a=i.querySelector("#close-help-internal");a&&(a.onmouseover=()=>a.style.backgroundColor="#f8f9fa",a.onmouseout=()=>a.style.backgroundColor="white",a.onclick=()=>{i.style.opacity="0",i.style.pointerEvents="none"})},0),e.appendChild(i),i}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}function Me(e,t,n){let o=document.getElementById(n);if(!t)return;let i=t.getAttribute("data-moved")==="true",s={x:0,y:0};if(o){let p=o.getBoundingClientRect();s.x=p.left+p.width/2,s.y=p.top+p.height/2}let a,r;if(!i)a=window.innerWidth/2,r=window.innerHeight/2;else{let p=t.getBoundingClientRect();a=p.left+p.width/2,r=p.top+p.height/2,a===0&&r===0&&(a=window.innerWidth/2,r=window.innerHeight/2)}let c=s.x-a,l=s.y-r;e?(J.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",i?t.style.transform=`translate(${c}px, ${l}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${l}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),o&&o.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",i?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof So=="function"&&So(t,n)):(J.playSwoosh(),t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",i?t.style.transform=`translate(${c}px, ${l}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${l}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),o&&o.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof Ut=="function"&&Ut(t))}function So(e,t){Ut(e);let n=o=>{if(!e.classList.contains("open"))return;let i=e.contains(o.target),s=document.querySelector(".cw-pill"),a=s&&s.contains(o.target);i?(e.classList.remove("idle"),e.style.zIndex="2147483648"):a||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=n,document.addEventListener("mousedown",n)}function Ut(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var nn="https://script.google.com/a/macros/google.com/s/AKfycbxFxh1cVk6r0t_JTA2TBfHBLJe_mOBQFsidwL1jwsUDcBtQYk3afu25SN-FR3vafJChHw/exec",Wt="cw_data_broadcast",Eo="cw_data_tips",an=["Processando...","Mantenha o foco!","Aguarde..."];function kt(e,t={}){return new Promise((n,o)=>{let i="cw_cb_"+Math.round(1e5*Math.random()),s=document.createElement("script");window[i]=c=>{document.body.contains(s)&&document.body.removeChild(s),delete window[i],n(c)};let a=Object.keys(t).map(c=>encodeURIComponent(c)+"="+encodeURIComponent(t[c])).join("&"),r=`${nn}?op=${e}&callback=${i}&t=${Date.now()}&${a}`;s.src=r,s.onerror=()=>{document.body.contains(s)&&document.body.removeChild(s),delete window[i],o(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(s)})}var ke={fetchTips:async()=>{try{let e=await kt("tips");e?.tips&&localStorage.setItem(Eo,JSON.stringify(e.tips))}catch(e){console.warn("Tips offline",e)}},fetchData:async()=>{try{let e=await kt("broadcast");if(e?.broadcast)return localStorage.setItem(Wt,JSON.stringify(e.broadcast)),e}catch(e){console.warn("Broadcast offline",e)}return{broadcast:JSON.parse(localStorage.getItem(Wt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Wt)||"[]"),getRandomTip:()=>{let e=an,t=localStorage.getItem(Eo);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},sendBroadcast:async e=>{let t={...e,date:new Date().toISOString(),id:Date.now().toString()};return await ke._performOp("new_broadcast",t)},updateBroadcast:async(e,t)=>{let n={id:e,...t};return await ke._performOp("update_broadcast",n)},deleteBroadcast:async e=>await ke._performOp("delete_broadcast",{id:e}),_performOp:async(e,t)=>{try{console.log(`\u{1F4E4} Executando ${e}...`,t);let n=await kt(e,t);return n&&n.status==="success"?(console.log("\u2705 Sucesso:",e),!0):(console.warn("\u26A0\uFE0F Falha:",n),!1)}catch(n){return console.error("\u274C Erro JSONP:",n),!1}},logEvent:(e,t,n="",o=null)=>{try{let i="anon";try{let a=Ct();a&&(i=a.split("@")[0].toLowerCase())}catch{}let s={timestamp:new Date().toISOString(),user:i,version:"v5.1",category:e,action:t,label:n,value:o||""};kt("log",s).catch(a=>{})}catch(i){console.warn("Analytics error",i)}},logUsage:()=>{}};var me={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5"},Ot=e=>new Promise(t=>setTimeout(t,e));function To(e){let t="cw-command-center-style";if(!document.getElementById(t)){let f=document.createElement("style");f.id=t,f.innerHTML=`
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
                
                background: ${me.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${me.glassBorder}; border-radius: 50px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 2147483647;
                
                opacity: 0; 
                min-width: 50px; 
                
                overflow: visible;

                /* ABRIR: A p\xEDlula expande (0.5s) */
                transition: 
                    width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s, 
                    height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                    padding 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                    gap 0.5s ease 0s,
                    border-radius 0.5s ease 0s,
                    opacity 0.3s ease 0s,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s;
            }
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            /* --- ESTADO COLAPSADO (FECHANDO) --- */
            .cw-pill.collapsed {
                width: 50px !important; 
                height: 50px !important;
                padding: 0 !important;
                gap: 0 !important;
                border-radius: 50% !important;
                cursor: pointer;
                
                overflow: hidden !important; 

                /* FECHAR: Delay de 0.3s */
                transition: 
                    width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s,
                    height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s,
                    padding 0.5s ease 0.3s,
                    gap 0.5s ease 0.3s,
                    border-radius 0.5s ease 0.3s,
                    opacity 0.3s ease 0s,
                    transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s !important;
            }
            
            /* --- LOGO DA BOLINHA --- */
            .cw-main-logo {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                pointer-events: none; 
                opacity: 0;
                transform: rotate(-180deg) scale(0.5);
                color: #fff;
                transition: opacity 0.05s linear 0s, transform 0.2s ease 0s;
            }
            .cw-main-logo svg { fill: #fff; width: 24px; height: 24px; transition: fill 0.3s; }
            
            .cw-pill.collapsed .cw-main-logo { 
                opacity: 1; 
                transform: rotate(0) scale(1);
                transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s;
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
                opacity: 1; transform: scale(1); visibility: visible;
                transition: opacity 0.4s ease 0.3s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s, visibility 0s linear 0.3s;
            }
            .cw-pill.collapsed > *:not(.cw-main-logo) {
                opacity: 0; pointer-events: none; visibility: hidden;
                transform: scale(1.3); filter: blur(5px);
                transition: opacity 0.2s ease 0s, transform 0.2s ease 0s, filter 0.2s ease 0s, visibility 0s linear 0.2s; 
            }

            /* --- CASCATAS --- */
            .cw-pill.collapsed > *:nth-last-child(n) { transition-delay: 0s; }
            .cw-pill:not(.collapsed) > *:nth-child(1) { transition-delay: 0.30s; }
            .cw-pill:not(.collapsed) > *:nth-child(2) { transition-delay: 0.34s; }
            .cw-pill:not(.collapsed) > *:nth-child(3) { transition-delay: 0.38s; }
            .cw-pill:not(.collapsed) > *:nth-child(4) { transition-delay: 0.42s; }
            .cw-pill:not(.collapsed) > *:nth-child(5) { transition-delay: 0.46s; }
            .cw-pill:not(.collapsed) > *:nth-child(6) { transition-delay: 0.50s; }
            .cw-pill:not(.collapsed) > *:nth-child(7) { transition-delay: 0.54s; }
            .cw-pill:not(.collapsed) > *:nth-child(8) { transition-delay: 0.58s; }
            .cw-pill:not(.collapsed) > *:nth-child(9) { transition-delay: 0.62s; }

            /* --- ESTILOS DOS BOT\xD5ES --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${me.iconIdle};
                flex-shrink: 0;
            }
            .cw-btn:hover { background: ${me.glassHighlight}; color: ${me.iconActive}; transform: scale(1.1) !important; }

            .cw-btn.notes.active { color: ${me.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${me.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${me.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${me.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.broadcast.active { color: ${me.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${me.teal} !important; background: rgba(0, 191, 165, 0.15); }

            .cw-btn.notes:hover { color: ${me.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${me.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${me.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${me.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
            .cw-btn.broadcast:hover { color: ${me.orange}; filter: drop-shadow(0 0 5px rgba(249, 171, 0, 0.5)); }
            .cw-btn.timezone:hover { color: ${me.teal}; filter: drop-shadow(0 0 5px rgba(0, 191, 165, 0.5)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${me.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${me.blue}; width: 16px; opacity: 1; }

            /* ============================================================
               NOVO ESTILO DO PROCESSING CENTER (Revisado & Corrigido)
               ============================================================ */
            .cw-pill.processing-center {
                top: 50% !important; left: 50% !important;
                transform: translate(-50%, -50%) !important;
                /* Largura um pouco maior para acomodar texto melhor */
                width: 340px !important; 
                /* Altura autom\xE1tica com m\xEDnimo, para n\xE3o cortar conte\xFAdo */
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
                gap: 20px; /* Espa\xE7o uniforme entre elementos */
                width: 100%; opacity: 0; 
                animation: fadeIn 0.4s ease forwards 0.1s; 
                position: relative; 
            }
            
            .cw-center-dots { display: flex; gap: 8px; margin-bottom: 4px; }
            .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
            .cw-center-dots span:nth-child(1) { background-color: ${me.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${me.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${me.green}; }
            
            .cw-center-text { 
                font-family: 'Google Sans', Roboto, sans-serif;
                font-size: 15px; /* Fonte maior */
                color: #E8EAED; /* Branco suave */
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

            /* ... estilos existentes do .cw-badge ... */
            
            /* INDICADOR DE TRABALHO EM PROGRESSO (DIRTY STATE) */
            .cw-dot-dirty {
                position: absolute; top: 8px; right: 8px;
                width: 6px; height: 6px;
                background-color: #F9AB00; /* Laranja Google */
                border-radius: 50%;
                border: 1px solid #3c4043; /* Contraste com fundo escuro */
                pointer-events: none;
                z-index: 11;
                animation: popIn 0.3s;
            }
            
            .cw-center-success { display: none; color: ${me.green}; margin-bottom: 10px; }
            .cw-center-success svg { width: 48px; height: 48px; }
            .cw-center-success.show { display: block; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            
            /* Bot\xE3o Cancelar Corrigido (Dentro do fluxo) */
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
        `,document.head.appendChild(f)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>'},o=document.createElement("div");o.className="cw-pill side-right collapsed",o.innerHTML=`
        <div class="cw-main-logo">${n.main}</div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${n.notes}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Quick Email">${n.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${n.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${n.links}</button>

<button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${n.timezone}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${n.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${n.check}</div>
        </div>
    `;let i=document.createElement("div");i.className="cw-focus-backdrop",document.body.appendChild(i),document.body.appendChild(o);let s=(f,A)=>{let S=o.querySelector(`.${f}`);o.querySelectorAll(".cw-btn").forEach(j=>{j!==S&&j.classList.remove("active")}),S.classList.toggle("active"),A()};if(o.querySelector(".notes").onclick=f=>{f.stopPropagation(),s("notes",e.toggleNotes)},o.querySelector(".email").onclick=f=>{f.stopPropagation(),s("email",e.toggleEmail)},o.querySelector(".script").onclick=f=>{f.stopPropagation(),s("script",e.toggleScript)},o.querySelector(".links").onclick=f=>{f.stopPropagation(),s("links",e.toggleLinks)},o.querySelector(".timezone").onclick=f=>{f.stopPropagation(),s("timezone",e.toggleTimezone)},o.querySelector(".broadcast").onclick=f=>{f.stopPropagation(),s("broadcast",()=>{let A=f.currentTarget.querySelector(".cw-badge");A&&A.remove(),e.broadcastControl&&e.broadcastControl.toggle()})},e.broadcastControl&&e.broadcastControl.hasUnread){let f=document.createElement("div");f.className="cw-badge",o.querySelector(".broadcast").appendChild(f)}let a=null;o.onmouseleave=()=>{o.querySelector(".cw-btn.active")||o.classList.contains("processing-center")||(a=setTimeout(()=>{o.classList.add("collapsed")},3e3))},o.onmouseenter=()=>{a&&clearTimeout(a)},(async function(){await Ot(2800),o.classList.add("docked"),await Ot(300);let A=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(S=>S.classList.add("visible"));for(let S=0;S<A.length;S++)A[S].classList.add("popped"),await Ot(90);await Ot(200),o.classList.add("system-check")})();let r=!1,c,l,p,g,b=3;o.onmousedown=f=>{if(f.target.closest("button"))return;f.preventDefault(),c=f.clientX,l=f.clientY;let A=o.getBoundingClientRect();p=A.left,g=A.top,document.addEventListener("mousemove",h),document.addEventListener("mouseup",x)};function h(f){let A=f.clientX-c,S=f.clientY-l;!r&&Math.sqrt(A*A+S*S)>b&&(r=!0,o.style.transition="none",a&&clearTimeout(a)),r&&(o.style.left=`${p+A}px`,o.style.top=`${g+S}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function x(f){if(document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",x),r){r=!1;let A=window.innerWidth,S=window.innerHeight,j=o.getBoundingClientRect(),H=j.left+j.width/2,z;H<A/2?(z=24,o.classList.remove("side-right"),o.classList.add("side-left")):(z=A-j.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let v=Math.max(24,Math.min(j.top,S-j.height-24));setTimeout(()=>{o.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),o.style.left=`${z}px`,o.style.top=`${v}px`,o.style.bottom="auto",o.style.transform=""},10),setTimeout(()=>{o.style.transition="",o.style.removeProperty("transition")},700)}else{let A=o.querySelector(".cw-btn.active"),S=f.target.closest("button");if(o.classList.contains("collapsed")){let j=o.getBoundingClientRect(),H=window.innerHeight,z=j.top>H/2;if(o.style.setProperty("transition","none","important"),z){let v=H-j.bottom;o.style.top="auto",o.style.bottom=`${v}px`}else o.style.bottom="auto",o.style.top=`${j.top}px`;o.offsetWidth,o.style.removeProperty("transition"),o.classList.remove("collapsed")}else!A&&!S&&o.classList.add("collapsed");S&&(S.style.transform="scale(0.9)",setTimeout(()=>S.style.transform="",150))}}}function It(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");if(!e)return()=>{};e.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${ke.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let o=document.createElement("div");o.className="cw-abort-btn",o.textContent="Cancelar",o.onclick=s=>{s.stopPropagation(),window._CW_ABORT_PROCESS=!0,Y("Cancelado!",{duration:3e3}),n.remove(),e.classList.remove("processing-center"),e.classList.remove("success"),e.classList.add("collapsed"),t&&t.classList.remove("active")},n.appendChild(o),e.appendChild(n);let i=Date.now();return e.classList.add("processing-center"),t&&t.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!e.contains(n))return;let a=Date.now()-i,r=Math.max(0,2e3-a);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!e.contains(n))return;let c=n.querySelector(".cw-center-dots"),l=n.querySelector(".cw-center-text"),p=n.querySelector(".cw-center-success"),g=n.querySelector(".cw-abort-btn");c&&(c.style.display="none"),l&&(l.style.display="none"),g&&(g.style.display="none"),p&&p.classList.add("show"),e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing-center"),setTimeout(()=>{n.remove(),e.classList.remove("success"),e.classList.add("collapsed"),t&&t.classList.remove("active")},400)},1e3)},r)}}function ko(e){let t=document.createElement("div");t.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let i=null;Object.entries(De).forEach(([a,r])=>{let c=document.createElement("div");c.textContent=a,Object.assign(c.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),c.onmouseenter=()=>{i!==r&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${r.substring(0,120)}${r.length>120?"...":""}"`),i!==r&&(c.style.background="#f1f3f4")},c.onmouseleave=()=>{i!==r&&(i||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),c.style.background="#ffffff")},c.onclick=()=>{J.playClick(),i===r?(i=null,s(),e("")):(i=r,s(),c.style.transform="scale(0.95)",setTimeout(()=>c.style.transform="scale(1)",150),e(r))},n.appendChild(c)});function s(){Array.from(n.children).forEach(a=>{De[a.textContent]===i?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return t.appendChild(n),t.appendChild(o),t}var Oo=e=>new Promise(t=>setTimeout(t,e));function qt(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function gt(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let n=document.createRange();n.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{Y("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function Ft(e){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function Io(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Lt(){console.log("Iniciando processo de Nova Nota...");let e=Io(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),qt(a)):qt(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let r=a.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),qt(r)):a.click(),await Oo(800);let l=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="description");l&&qt(l)}}let i=null,s=0;for(;!i&&s<20;){await Oo(300);let a=Io();if(a.length>t)i=a.find(r=>!e.includes(r)),i||(i=a[a.length-1]);else if(s>10){let r=a.filter(c=>c.offsetParent!==null);r.length>0&&(i=r[r.length-1])}s++}return i}var ie={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},Be="cubic-bezier(0.25, 0.8, 0.25, 1)",sn={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${ie.border}`,backgroundColor:ie.bgInput,fontSize:"14px",color:ie.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${Be}, box-shadow 0.2s ${Be}, background-color 0.2s`,outline:"none"},$n={...sn,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Vn={fontSize:"13px",fontWeight:"700",color:ie.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Un={display:"block",fontSize:"13px",fontWeight:"600",color:ie.text,marginBottom:"8px",marginTop:"16px"},Wn={fontSize:"12px",color:ie.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},Yn={fontSize:"12px",color:ie.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},Xn={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:ie.text,cursor:"pointer",padding:"12px 14px",backgroundColor:ie.surface,border:`1px solid ${ie.border}`,borderRadius:"12px",transition:`all 0.2s ${Be}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Yt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:ie.primary},Kn={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:ie.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${Be}, box-shadow 0.2s ${Be}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},Jn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${ie.primary}`,color:ie.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${Be}`},Qn={background:"transparent",border:`1px solid ${ie.border}`,borderRadius:"20px",color:ie.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${Be}`,fontFamily:"'Google Sans', 'Roboto'"};var Zn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:ie.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},ea={fontSize:"13px",fontWeight:"700",color:ie.primary,minWidth:"20px",textAlign:"center"},ta={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${ie.border}`,backgroundColor:ie.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${Be}, box-shadow 0.2s ${Be}`},oa={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${ie.bgInput}`},na={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${ie.border}`,backgroundColor:ie.surface,color:ie.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${Be}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},aa={backgroundColor:ie.primaryBg,color:ie.primary,borderColor:ie.primary,fontWeight:"600"},ia={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:ie.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},sa={borderTop:`1px solid ${ie.bgInput}`,paddingTop:"20px",marginTop:"16px"};var ra={maxHeight:"240px",overflowY:"auto",border:`1px solid ${ie.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:ie.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},la={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${ie.bgInput}`,cursor:"pointer",fontSize:"13px",color:ie.text,transition:"background 0.1s",userSelect:"none"};var rn={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},ln={fontSize:"12px",color:"#e37400",marginTop:"4px"},cn={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},dn={display:"flex",gap:"15px",marginBottom:"10px"};function qo(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,rn);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,jt,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,dn);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,Yt);let i=document.createElement("label");i.textContent="Sim";let s=document.createElement("div");Object.assign(s.style,{display:"flex",alignItems:"center"}),s.appendChild(o),s.appendChild(i);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,Yt);let r=document.createElement("label");r.textContent="N\xE3o";let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center"}),c.appendChild(a),c.appendChild(r),n.appendChild(s),n.appendChild(c);let l=document.createElement("div");l.style.display="block";let p=document.createElement("label");p.textContent="Qual foi o Motivo?",Object.assign(p.style,jt,{fontSize:"12px"});let g=document.createElement("input");g.type="text",Object.assign(g.style,cn);let b=document.createElement("div");b.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(b.style,ln),l.appendChild(p),l.appendChild(g),l.appendChild(b),e.appendChild(t),e.appendChild(n),e.appendChild(l),o.onchange=()=>{l.style.display="none"},a.onchange=()=>{l.style.display="block"};function h(A,S){if(e.style.display="none",!A||A.includes("Education")||!S||S.length===0)return;let j=S.some(E=>E.includes("enhanced")||E==="ec_google_ads"),H=S.some(E=>(E.includes("conversion")||E.includes("ads"))&&!E.includes("enhanced")),z=S.some(E=>E.includes("ga4")||E.includes("analytics")||E.includes("ua")),v=S.some(E=>E.includes("merchant")||E.includes("gmc")||E.includes("shopping"));(j||H&&!z&&!v)&&(e.style.display="block")}function x(){if(e.style.display==="none")return"";let A=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&g.value.trim()!==""&&(A+=`<br><b>Motivo:</b> ${g.value}`),A+="<br>",A}function f(){e.style.display="none",a.checked=!0,o.checked=!1,l.style.display="block",g.value=""}return{element:e,updateVisibility:h,getOutput:x,reset:f}}var te={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},et={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Fo(e){let t={},n="implementation";function o(v){let C=v.toLowerCase();return C.includes("ads")||C.includes("conversion")||C.includes("remarketing")?te.brands.ads:C.includes("ga4")||C.includes("analytics")?te.brands.ga4:C.includes("gtm")||C.includes("tag manager")||C.includes("container")?te.brands.gtm:C.includes("merchant")||C.includes("shopping")||C.includes("feed")?te.brands.gmc:te.brands.default}let i=Object.entries(Fe).filter(([v,C])=>C.popular),s={};Object.entries(Fe).forEach(([v,C])=>{if(C.popular)return;let E=o(C.name);s[E.label]||(s[E.label]={brand:E,tasks:[]}),s[E.label].tasks.push({key:v,...C})});let a="cw-zen-tasks";if(!document.getElementById(a)){let v=document.createElement("style");v.id=a,v.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${te.font}; background: ${te.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${te.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${te.white}; 
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
                font-size: 12px; font-weight: 500; color: ${te.textMain}; line-height: 1.2; 
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
                color: ${te.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${te.border}; border-radius: 10px; background: ${te.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${te.blue}; box-shadow: 0 0 0 3px ${te.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${te.border}; border-radius: 10px; background: ${te.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${te.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${te.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${te.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${te.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${te.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${te.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${te.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${te.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${te.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${te.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${te.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${te.textMain}; }
            
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
                font-family: ${te.font}; font-size: 15px; font-weight: 600; color: ${te.textMain};
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
                border-color: ${te.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${te.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${te.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${te.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${te.textSub};
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
        `,document.head.appendChild(v)}let r=document.createElement("div");r.className="cw-zen-container";let c=document.createElement("div");Object.assign(c.style,{display:"none"});let l=document.createElement("div");l.className="cw-screens-container",c.appendChild(l),r.innerHTML=`
        <div class="cw-zen-content">
            <div class="cw-hero-section">
                <div class="cw-section-subtitle" style="font-size:11px; font-weight:700; color:#6B7280; text-transform:uppercase; letter-spacing:0.8px;">Acesso R\xE1pido</div>
                <div class="cw-hero-grid"></div>
                <div class="cw-helper-text">Atalhos para as implementa\xE7\xF5es mais frequentes.<br>Use a busca abaixo para o cat\xE1logo completo.</div>
            </div>

            <div class="cw-list-section">
                <div class="cw-search-wrapper">
                    <input class="cw-search-input" placeholder="Buscar no cat\xE1logo...">
                </div>
                <div class="cw-acc-container"></div>
                <div class="cw-results-container" style="display:none"></div>
            </div>
        </div>

        <div class="cw-status-bar">
            <div class="cw-status-text">0 a\xE7\xF5es definidas</div>
            <div class="cw-footer-icons"></div>
        </div>
    `;let p=r.querySelector(".cw-hero-grid"),g=r.querySelector(".cw-acc-container"),b=r.querySelector(".cw-results-container"),h=r.querySelector(".cw-search-input"),x=r.querySelector(".cw-status-bar"),f=r.querySelector(".cw-status-text"),A=r.querySelector(".cw-footer-icons");i.forEach(([v,C])=>{let E=o(C.name),T=document.createElement("div");T.className="cw-hero-card",T.id=`hero-${v}`,T.style.setProperty("--hero-color",E.color),T.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${et[E.icon]}</div>
                <div class="cw-hero-label">${C.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,T.onclick=O=>{if(O.target.closest(".cw-step-btn"))return;let M=t[v]?t[v].count:0;j(v,M>0?-M:1,C)},T.querySelector(".minus").onclick=()=>j(v,-1,C),T.querySelector(".plus").onclick=()=>j(v,1,C),T.dataset.color=E.color,p.appendChild(T)});function S(v,C){let E=o(C.name),T=document.createElement("div");return T.className="cw-task-item",T.dataset.id=v,T.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${E.bg}; color:${E.color}">
                    ${et[E.icon]||et.default}
                </div>
                <div class="cw-task-label">${C.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,T.onclick=O=>{if(O.target.closest(".cw-step-btn"))return;let M=t[v]?t[v].count:0;j(v,M>0?-M:1,C)},T.querySelector(".minus").onclick=()=>j(v,-1,C),T.querySelector(".plus").onclick=()=>j(v,1,C),T}Object.entries(s).forEach(([v,C])=>{let E=document.createElement("div");E.className="cw-acc-group";let T=document.createElement("div");T.className="cw-acc-header",T.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${C.brand.color}"></div>
                ${v}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,T.onclick=()=>{g.querySelectorAll(".cw-acc-group.open").forEach(M=>{M!==E&&M.classList.remove("open")}),E.classList.toggle("open")};let O=document.createElement("div");O.className="cw-acc-body",C.tasks.forEach(M=>{let N=S(M.key,M);O.appendChild(N)}),E.appendChild(T),E.appendChild(O),g.appendChild(E)});function j(v,C,E){t[v]||(t[v]={count:0,data:E,brand:o(E.name)}),t[v].count+=C,t[v].count<=0&&delete t[v],H(),z(),e&&e()}function H(){i.forEach(([O])=>{let M=p.querySelector(`#hero-${O}`);if(!M)return;let N=t[O];N?(M.classList.add("active"),M.querySelector(".cw-step-val").textContent=N.count,M.querySelector(".cw-step-val").style.color=M.dataset.color):M.classList.remove("active")}),r.querySelectorAll(".cw-task-item").forEach(O=>{let M=O.dataset.id,N=t[M];N?(O.classList.add("selected"),O.querySelector(".cw-step-val").textContent=N.count):O.classList.remove("selected")});let C=Object.keys(t),E=0,T=[];if(C.forEach(O=>{let M=t[O];E+=M.count;for(let N=0;N<M.count;N++)T.length<6&&T.push(M.brand)}),E>0){x.classList.add("visible");let O=E>1?"A\xE7\xF5es":"A\xE7\xE3o",M=E>1?"definidas":"definida";f.textContent=`${E} ${O} ${M}`,A.innerHTML="",T.forEach(N=>{let _=document.createElement("div");_.className="cw-mini-icon",_.innerHTML=et[N.icon]||et.default;let R=_.querySelector("svg");R&&(R.style.width="14px",R.style.height="14px"),A.appendChild(_)})}else x.classList.remove("visible")}h.addEventListener("input",v=>{let C=v.target.value.toLowerCase();if(C.length>0){g.style.display="none",b.style.display="block",b.innerHTML="";let E=!1;Object.entries(Fe).forEach(([T,O])=>{if(O.name.toLowerCase().includes(C)){E=!0;let M=S(T,O);t[T]&&(M.classList.add("selected"),M.querySelector(".cw-step-val").textContent=t[T].count),b.appendChild(M)}}),E||(b.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else g.style.display="block",b.style.display="none"});function z(){l.innerHTML="";let v=Object.keys(t),C=!1,E=document.getElementById("sub-status"),T="implementation";if(E&&E.value.toLowerCase().includes("education")&&(T="education"),v.length===0){l.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(v.length===0){l.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let O=document.createElement("div");O.className="cw-info-banner",O.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,l.appendChild(O),v.forEach(M=>{let N=t[M].data,_=t[M].count,R=t[M].brand,W=N.screenshots?N.screenshots[T]||[]:["Link da Evid\xEAncia"];if(W.length>0){C=!0;for(let u=1;u<=_;u++){let w=document.createElement("div");w.className="cw-screen-card",w.style.setProperty("--brand-color",R.color),w.style.setProperty("--brand-bg",R.bg),w.style.setProperty("--brand-shadow",R.color+"40");let d=document.createElement("div");d.className="cw-card-header";let y=document.createElement("div");y.className="cw-card-icon",y.innerHTML=et[R.icon]||et.default;let B=document.createElement("div");B.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let q=document.createElement("input");q.className="cw-card-title-input",q.id=`name-${M}-${u}`,q.value=`${N.name}${_>1?" #"+u:""}`,q.title="Clique para renomear esta task";let P=document.createElement("span");P.className="cw-edit-hint",P.innerHTML="\u270E Renomear",B.appendChild(q),B.appendChild(P),d.appendChild(y),d.appendChild(B),w.appendChild(d),W.forEach((k,L)=>{let D=document.createElement("div");D.className="cw-input-group";let U=document.createElement("label");U.className="cw-input-label",U.textContent=k.replace(/📷|:|•/g,"").trim();let I=document.createElement("input");I.className="cw-input-field",I.id=`screen-${M}-${u}-${L}`,I.placeholder="Cole o link aqui...",I.setAttribute("autocomplete","off"),I.addEventListener("input",()=>{I.value.trim().length>5?I.classList.add("filled"):I.classList.remove("filled")});let $=document.createElement("div");$.className="cw-input-check",$.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',D.appendChild(U),D.appendChild(I),D.appendChild($),w.appendChild(D)}),l.appendChild(w)}}}),c.style.display=C?"block":"none"}return{selectionElement:r,screenshotsElement:c,updateSubStatus:()=>z(),getCheckedElements:()=>Object.keys(t).map(v=>({value:v,closest:()=>({querySelector:()=>({textContent:t[v].count})})})),setTaskCount:(v,C)=>{t[v]&&delete t[v],C>0&&Fe[v]&&j(v,C,Fe[v])},toggleTask:(v,C=!0)=>{let E=t[v];C&&!E?j(v,1,Fe[v]):!C&&E&&j(v,-E.count,Fe[v])},setMode:v=>{n=v,z()},reset:()=>{for(let v in t)delete t[v];h.value="",g.style.display="block",b.style.display="none",H(),z()}}}function Lo(e){let t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let n=document.createElement("div");n.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let o=document.createElement("div");o.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",t.appendChild(o),t.appendChild(n),n.addEventListener("scroll",()=>{o.style.boxShadow=n.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let i={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},s={};function a({id:H,label:z,type:v="text",placeholder:C="",required:E=!1,parent:T=n}){let O=document.createElement("div");O.style.cssText=i.inputWrapper;let M=document.createElement("label");M.style.cssText=i.label,M.innerHTML=`${z} ${E?'<span style="color:#D93025">*</span>':""}`;let N;return v==="textarea"?(N=document.createElement("textarea"),N.style.cssText=i.input+i.textarea):(N=document.createElement("input"),N.type=v,N.style.cssText=i.input),N.id=H,N.placeholder=C,N.addEventListener("focus",()=>{N.style.borderColor="#1a73e8",N.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),N.addEventListener("blur",()=>{N.style.borderColor="#DADCE0",N.style.boxShadow="none",E&&N.value.trim()!==""&&(N.style.backgroundColor="#FFF")}),s[H]={input:N,wrapper:O,required:E},O.appendChild(M),O.appendChild(N),T.appendChild(O),O}function r({id:H,label:z,options:v=["Yes","No"],defaultValue:C="No",onChange:E=null}){let T=document.createElement("div");T.style.cssText=i.inputWrapper;let O=document.createElement("label");O.style.cssText=i.label,O.textContent=z,T.appendChild(O);let M=document.createElement("div");M.style.cssText=i.radioGroup;let N=document.createElement("input");return N.type="hidden",N.id=H,N.value=C,T.appendChild(N),v.forEach(_=>{let R=document.createElement("div");R.textContent=_,R.style.cssText=i.radioLabel,_===C&&(R.style.cssText+=i.radioActive),R.onclick=()=>{Array.from(M.children).forEach(u=>u.style.cssText=i.radioLabel),R.style.cssText+=i.radioActive,N.value=_,E&&E(_)},M.appendChild(R)}),s[H]={input:N,wrapper:T,required:!1},T.appendChild(M),n.appendChild(T),T}let c=document.createElement("div");c.style.cssText=i.banner,c.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,n.appendChild(c);let l=document.createElement("div");l.style.marginBottom="24px";let p=document.createElement("button");p.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",p.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",p.onmouseover=()=>p.style.background="#E1EFFF",p.onmouseout=()=>p.style.background="#F0F7FF",l.appendChild(p),n.appendChild(l);let g=document.createElement("div");g.style.cssText=i.section,g.innerHTML=`<div style="${i.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,n.appendChild(g),a({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:g}),a({id:"ga4",label:"GA4 Property ID",parent:g}),a({id:"gtm",label:"GTM Container ID",parent:g});let b=document.createElement("div");b.style.cssText=i.hiddenField,g.appendChild(b),r({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:H=>{H==="Yes"?b.style.cssText=i.visibleField+"margin-bottom:14px;":(b.style.cssText=i.hiddenField,s.accessEmail.input.value="")}}),a({id:"accessEmail",label:"User Access Email",parent:b}),r({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let h=document.createElement("div");h.style.cssText=i.section,h.innerHTML=`<div style="${i.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,n.appendChild(h),a({id:"name",label:"Advertiser Name",required:!0,parent:h}),a({id:"url",label:"Website URL",parent:h}),a({id:"phone",label:"Phone Number",parent:h}),a({id:"email",label:"Contact Email",parent:h}),a({id:"callback",label:"Preferred Callback Time (Timezone)",parent:h}),a({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:h}),a({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:h}),a({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:h});let x=document.createElement("div");x.style.cssText=i.section,x.innerHTML=`<div style="${i.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,n.appendChild(x),a({id:"cc_adv",label:"Advertiser Contact",parent:x}),a({id:"cc_am",label:"Account Manager",parent:x});let f=document.createElement("div");f.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let A=document.createElement("button");A.innerHTML="Voltar",A.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",A.onclick=e;let S=document.createElement("button");S.textContent="Gerar Nota",S.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",f.appendChild(A),f.appendChild(S),t.appendChild(f),p.onclick=async()=>{let H=p.innerHTML;p.innerHTML="\u23F3 Buscando dados...";try{let z=await Ge(),v=0,C=(O,M)=>{let N=s[O];M&&N&&N.input.value===""&&(N.input.value=M,N.input.style.backgroundColor="#E6F4EA",N.input.style.borderColor="#34A853",setTimeout(()=>{N.input.style.backgroundColor="#FFF",N.input.style.borderColor="#DADCE0"},1e3),v++)};C("name",z.advertiserName),C("url",z.websiteUrl),z.clientEmail&&(C("email",z.clientEmail),C("cc_adv",z.clientEmail));let T=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);T&&C("cid",T[0]),v>0?Y(`${v} campos preenchidos!`):Y("Nenhum dado novo encontrado.")}catch(z){console.error(z),Y("Erro ao ler p\xE1gina.")}finally{p.innerHTML=H}};let j=()=>{let H=!0,z=null;return Object.values(s).forEach(v=>{v.required&&!v.input.value.trim()&&(H=!1,v.input.style.cssText+=i.inputError,v.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),z||(z=v.input))}),z&&z.scrollIntoView({behavior:"smooth",block:"center"}),H};return S.onclick=async()=>{if(!j()){Y("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let H=O=>s[O].input.value||"N/A",z=H("hasAccess"),v=z==="Yes"?H("accessEmail"):"N/A",E=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${H("cid")}
<b>GA4 ID:</b> ${H("ga4")}
<b>GTM ID:</b> ${H("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${z==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${v}
<b>Ghosting Access Available (Y/N):</b> ${H("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${H("name")}
<b>Website:</b> ${H("url")}
<b>Phone Number:</b> ${H("phone")}
<b>Preferred Callback:</b> ${H("callback")}
<b>Email Address:</b> ${H("email")}

<b>Detailed Issue Description:</b>
${H("desc")}

<b>Uncropped screenshots:</b>
${H("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${H("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${H("cc_adv")}
<b>Account Manager:</b> ${H("cc_am")}
`.replace(/\n/g,"<br>");gt(E);let T=await Lt();T?(T.innerText.trim()===""&&(T.innerHTML=""),document.execCommand("insertHTML",!1,E),Ft(T),Y("Nota gerada e inserida!")):Y("Copiado! Abra uma nota para colar.")},t}var Xt="cw_notes_parking_lot",Mt="cw_notes_emergency_save";var $e={getAll:()=>{try{return JSON.parse(localStorage.getItem(Xt)||"[]")}catch{return[]}},save:e=>{let t=$e.getAll(),n={id:Date.now().toString(),timestamp:new Date().toISOString(),...e};return t.unshift(n),t.length>5&&t.pop(),localStorage.setItem(Xt,JSON.stringify(t)),n},delete:e=>{let t=$e.getAll();return t=t.filter(n=>n.id!==e),localStorage.setItem(Xt,JSON.stringify(t)),t},getCount:()=>$e.getAll().length,saveEmergency:e=>{let t={timestamp:Date.now(),data:e};localStorage.setItem(Mt,JSON.stringify(t))},getEmergency:()=>{try{let e=localStorage.getItem(Mt);if(!e)return null;let t=JSON.parse(e);return Date.now()-t.timestamp>432e5?(localStorage.removeItem(Mt),null):t.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(Mt)}};function Mo(e){let{onSaveCurrent:t,onLoadDraft:n}=e,o=document.createElement("button");o.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        Guardar
    `,o.style.cssText=`
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
    `,o.onmouseenter=()=>{o.style.backgroundColor="#F8F9FA",o.style.borderColor="#202124",o.style.color="#202124",o.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",o.style.transform="translateY(-1px)"},o.onmouseleave=()=>{o.style.backgroundColor="#FFFFFF",o.style.borderColor="#DADCE0",o.style.color="#5F6368",o.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",o.style.transform="translateY(0)"},o.onmousedown=()=>o.style.transform="scale(0.96)",o.onmouseup=()=>o.style.transform="scale(1) translateY(-1px)",o.onclick=async()=>{if(confirm("Deseja guardar o rascunho atual e limpar os campos?"))try{let h=await t();h?($e.save(h),b(),a(),J.playSuccess(),Y("Rascunho salvo com sucesso!")):Y("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(h){console.error("Erro ao salvar rascunho:",h),Y("Erro ao salvar.",{error:!0})}};let i=document.createElement("div");i.title="Meus Rascunhos",i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let s=document.createElement("div");s.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(s),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=h=>{h.stopPropagation(),g()};function a(){let h=$e.getCount();h>0?(s.style.display="block",s.textContent=h,s.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):s.style.display="none"}let r=document.createElement("div");r.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: #FFFFFF; z-index: 100;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -10px 40px rgba(0,0,0,0.15);
        transform: translateY(110%); transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        display: flex; flex-direction: column; overflow: hidden;
    `;let c=document.createElement("div");c.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",c.innerHTML='<span style="font-size:16px; font-weight:700; color:#202124;">Rascunhos Salvos</span>';let l=document.createElement("button");l.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',l.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",l.onmouseenter=()=>l.style.background="#F1F3F4",l.onmouseleave=()=>l.style.background="transparent",l.onclick=()=>g(!1),c.appendChild(l);let p=document.createElement("div");p.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",r.appendChild(c),r.appendChild(p);function g(h){let x=r.style.transform==="translateY(0%)";(h!==void 0?h:!x)?(b(),r.style.transform="translateY(0%)"):r.style.transform="translateY(110%)"}function b(){let h=$e.getAll();if(p.innerHTML="",h.length===0){p.innerHTML=`
                <div style="text-align:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum rascunho guardado</div>
                    <div style="font-size:12px; margin-top:4px;">Use o bot\xE3o "Guardar" para estacionar um caso aqui.</div>
                </div>`;return}h.forEach(x=>{let f=document.createElement("div");f.style.cssText=`
                background: #FFF; padding: 16px; border-radius: 12px;
                border: 1px solid #E0E0E0; box-shadow: 0 1px 3px rgba(0,0,0,0.02);
                position: relative; transition: all 0.2s;
            `;let S=new Date(x.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),j="";x.summaryTags&&x.summaryTags.length>0&&(j=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${x.summaryTags.slice(0,3).join(", ")+(x.summaryTags.length>3?"...":"")}</div>`),f.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${x.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${S}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${x.cid||"---"}</span>
                    <span style="display:block; color:${x.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${x.subStatus||x.status||"Sem Status"}</span>
                    ${j}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let H=f.querySelector(".cw-resume-btn");H.onclick=()=>{confirm("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(n(x),$e.delete(x.id),b(),a(),g(!1),J.playSwoosh(),Y("Rascunho carregado."))};let z=f.querySelector(".cw-del-btn");z.onclick=()=>{confirm("Excluir este rascunho?")&&($e.delete(x.id),b(),a())},p.appendChild(f)})}return a(),{parkButton:o,historyBtnWrapper:i,drawer:r}}function No(){let e="v3.8.0",t="bau",n="pt",o=!1,i=!1,s=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},r=qo(),c=Fo(()=>{let G=c.getCheckedElements().map(F=>F.value);d&&d.value&&r.updateVisibility(d.value,G)}),l=document.createElement("div");l.id="autofill-popup",l.classList.add("cw-module-window"),Object.assign(l.style,qe,{right:"100px",width:"450px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let p={popup:l,googleLine:null},g=Le(l,"Case Notes",e,"Gera notas padronizadas.",p,()=>zt());l.appendChild(g);let b=document.createElement("div");Object.assign(b.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),l.appendChild(b);let h=document.createElement("div");Object.assign(h.style,{flexGrow:"1",display:"none",overflow:"auto"});let x=Lo(()=>f());h.appendChild(x),l.appendChild(h);function f(m){s=!s,s?(b.style.display="none",h.style.display="flex",p.googleLine&&(p.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)"),m&&(m.style.color="#C58AF9",m.style.background="rgba(197, 138, 249, 0.15)")):(b.style.display="block",h.style.display="none",p.googleLine&&(p.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"),m&&(m.style.color="#9AA0A6",m.style.background="transparent"))}let A=document.createElement("div");A.textContent="created by lucaste@",Object.assign(A.style,fo),l.appendChild(A);let S=document.createElement("div");S.id="step-lang-type";let j=document.createElement("label");Object.assign(j.style,a.label),S.appendChild(j);let H=document.createElement("div");Object.assign(H.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let z=document.createElement("div");z.textContent="Portugu\xEAs",z.classList.add("no-drag"),Object.assign(z.style,Te);let v=document.createElement("div");v.textContent="Espa\xF1ol",v.classList.add("no-drag"),Object.assign(v.style,Te),z.onclick=()=>ht("pt"),v.onclick=()=>ht("es"),H.appendChild(z),H.appendChild(v),S.appendChild(H),b.appendChild(S);let C=document.createElement("div");C.id="step-0-case-type";let E=document.createElement("label");Object.assign(E.style,a.label),C.appendChild(E);let T=document.createElement("div");Object.assign(T.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let O=document.createElement("div");O.textContent="BAU",O.classList.add("no-drag"),Object.assign(O.style,Te);let M=document.createElement("div");M.textContent="LM",M.classList.add("no-drag"),Object.assign(M.style,Te),O.onclick=()=>ft("bau"),M.onclick=()=>ft("lm"),T.appendChild(O),T.appendChild(M),C.appendChild(T),b.appendChild(C);let N=document.createElement("div");N.id="step-1-selection";let _=document.createElement("label");_.className="cw-input-label",_.textContent="Status Principal";let R=document.createElement("select");R.id="main-status",R.className="cw-select",R.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let W=document.createElement("div");W.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let u=document.createElement("label");u.className="cw-input-label",u.textContent="Sub-status",u.style.marginBottom="0";let w=document.createElement("a");w.href="https://seu-link-do-guia-aqui.com",w.target="_blank",w.className="cw-info-link",w.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(w.style,a.helpLink),W.appendChild(u),W.appendChild(w);let d=document.createElement("select");d.id="sub-status",d.className="cw-select",d.disabled=!0,d.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',N.appendChild(_),N.appendChild(R),N.appendChild(W),N.appendChild(d),b.appendChild(N);let y=document.createElement("div");y.id="step-1-1-portugal",Object.assign(y.style,a.stepBlock,{display:"none"});let B=document.createElement("label");Object.assign(B.style,a.label),y.appendChild(B);let q=document.createElement("div");Object.assign(q.style,a.radioContainer);let P=document.createElement("div");Object.assign(P.style,{display:"flex",alignItems:"center"});let k=document.createElement("input");k.type="radio",k.name="portugal-group",k.value="sim",Object.assign(k.style,a.checkboxInput);let L=document.createElement("label");L.htmlFor="portugal-sim",Object.assign(L.style,{cursor:"pointer"}),P.appendChild(k),P.appendChild(L);let D=document.createElement("div");Object.assign(D.style,{display:"flex",alignItems:"center"});let U=document.createElement("input");U.type="radio",U.name="portugal-group",U.value="nao",U.checked=!0,Object.assign(U.style,a.checkboxInput);let I=document.createElement("label");I.htmlFor="portugal-nao",Object.assign(I.style,{cursor:"pointer"}),D.appendChild(U),D.appendChild(I),q.appendChild(P),q.appendChild(D),y.appendChild(q),b.appendChild(y);function $(m){o=m,m?Q.style.display="block":Q.style.display="none"}k.onchange=()=>$(!0),U.onchange=()=>$(!1);let Q=document.createElement("div");Q.id="step-1-2-consent",Object.assign(Q.style,a.stepBlock,{display:"none"});let be=document.createElement("label");Object.assign(be.style,a.label),Q.appendChild(be);let ge=document.createElement("div");Object.assign(ge.style,a.radioContainer);let Ee=document.createElement("div");Object.assign(Ee.style,{display:"flex",alignItems:"center"});let se=document.createElement("input");se.type="radio",se.name="consent-group",se.value="Sim",se.checked=!0,Object.assign(se.style,a.checkboxInput);let ye=document.createElement("label");ye.htmlFor="consent-sim",Object.assign(ye.style,{cursor:"pointer"}),Ee.appendChild(se),Ee.appendChild(ye);let pe=document.createElement("div");Object.assign(pe.style,{display:"flex",alignItems:"center"});let ee=document.createElement("input");ee.type="radio",ee.name="consent-group",ee.value="N\xE3o",Object.assign(ee.style,a.checkboxInput);let de=document.createElement("label");de.htmlFor="consent-nao",Object.assign(de.style,{cursor:"pointer"}),pe.appendChild(ee),pe.appendChild(de),ge.appendChild(Ee),ge.appendChild(pe),Q.appendChild(ge),b.appendChild(Q);let ce=document.createElement("div");ce.id="step-1-5-snippets",Object.assign(ce.style,a.stepBlock,{display:"none"});let Re=document.createElement("h3");Object.assign(Re.style,a.h3),Re.textContent="Cen\xE1rios Comuns";let Ie=ko(m=>{let G=document.querySelector("textarea");G&&(G.value=m,G.dispatchEvent(new Event("input")),G.style.transition="background-color 0.2s",G.style.backgroundColor="#e8f0fe",setTimeout(()=>G.style.backgroundColor="#fff",300))});Ie.id="snippet-container",ce.appendChild(Re),ce.appendChild(Ie),b.appendChild(ce);let we=document.createElement("div");we.id="step-3-form",Object.assign(we.style,a.stepBlock,{display:"none"});let _e=document.createElement("h3");Object.assign(_e.style,a.h3),we.appendChild(_e);let Ne=document.createElement("div");Ne.id="dynamic-form-fields-container",we.appendChild(Ne);let Ce=document.createElement("button");Ce.textContent="+ Gostaria de selecionar uma task?",Object.assign(Ce.style,a.optionalBtn),Ce.onmouseover=()=>Ce.style.background="#e8f0fe",Ce.onmouseout=()=>Ce.style.background="white",Ce.onclick=()=>{Ce.style.display="none",We.style.display="block",c.selectionElement.style.display="block"};let We=document.createElement("h3");Object.assign(We.style,a.h3,{marginTop:"20px"});let Zt=c.selectionElement;Object.assign(Zt.style,{marginBottom:"20px"}),we.appendChild(Ce),we.appendChild(We),we.appendChild(Zt),we.appendChild(r.element),we.appendChild(c.screenshotsElement),b.appendChild(we);let Ye=document.createElement("div");Ye.id="step-4-email",Object.assign(Ye.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Xe=document.createElement("label");Xe.style.display="flex",Xe.style.alignItems="center",Xe.style.cursor="pointer",Xe.style.fontSize="14px";let Ke=document.createElement("input");Ke.type="checkbox",Ke.checked=!0,Object.assign(Ke.style,a.checkboxInput),Xe.appendChild(Ke),Xe.appendChild(document.createTextNode("Preencher email automaticamente?")),Ye.appendChild(Xe),b.appendChild(Ye);let Ve=document.createElement("div");Object.assign(Ve.style,{display:"none",gap:"8px",padding:"0"}),b.appendChild(Ve);let rt=document.createElement("button");Object.assign(rt.style,a.buttonBase,{backgroundColor:"#5f6368"}),rt.textContent="Copiar";let lt=document.createElement("button");Object.assign(lt.style,a.buttonBase,{backgroundColor:"#1a73e8"}),lt.textContent="Preencher",Ve.appendChild(rt),Ve.appendChild(lt);async function eo(){let m=await Ge(),G={};Ne.querySelectorAll("input, textarea").forEach(X=>G[X.id]=X.value);let V=c.getCheckedElements().map(X=>({key:X.value,count:parseInt(X.closest(".cw-task-item").querySelector(".cw-step-val")?.textContent||1)})),le={};c.screenshotsElement.querySelectorAll("input").forEach(X=>{X.value.trim()!==""&&(le[X.id]=X.value)});let Ae=document.getElementById("tag-support-container"),he=null;if(Ae){let X=Ae.querySelector('input[type="radio"]:checked'),ne=Ae.querySelector('input[type="text"]');he={choice:X?X.value:"N\xE3o",reason:ne?ne.value:""}}return{clientName:m.advertiserName,cid:m.cid,status:R.value,subStatus:d.value,caseType:t,lang:n,formData:G,activeTasks:V,screenshotsData:le,tagSupportState:he,summaryTags:V.map(X=>Fe[X.key]?Fe[X.key].name:X.key)}}function to(m){m.lang&&ht(m.lang),m.caseType&&ft(m.caseType),m.status&&(R.value=m.status,R.dispatchEvent(new Event("change"))),setTimeout(()=>{m.subStatus&&(d.value=m.subStatus,d.dispatchEvent(new Event("change"))),setTimeout(()=>{if(m.formData&&Object.entries(m.formData).forEach(([G,F])=>{let V=document.getElementById(G);V&&(V.value=F)}),c.reset(),m.activeTasks&&Array.isArray(m.activeTasks)&&m.activeTasks.forEach(G=>{c.setTaskCount(G.key,G.count)}),m.screenshotsData&&Object.entries(m.screenshotsData).forEach(([G,F])=>{let V=document.getElementById(G);V&&(V.value=F,V.dispatchEvent(new Event("input")))}),m.tagSupportState){let G=document.getElementById("tag-support-container");if(G){let F=G.querySelector(`input[value="${m.tagSupportState.choice}"]`);if(F&&(F.checked=!0,F.dispatchEvent(new Event("change"))),m.tagSupportState.choice==="N\xE3o"&&m.tagSupportState.reason){let V=G.querySelector('input[type="text"]');V&&(V.value=m.tagSupportState.reason)}}}},150)},50)}let Rt=Mo({onSaveCurrent:async()=>{let m=await eo();return xt(1.5),R.value="",m},onLoadDraft:m=>{to(m)}}),nt=g.lastElementChild;if(nt&&nt.insertBefore(Rt.historyBtnWrapper,nt.firstChild),nt){let m=document.createElement("div");m.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',Object.assign(m.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease",marginLeft:"4px"}),m.title="Alternar para Split & Transfer",m.onmouseenter=()=>{m.style.background="rgba(255,255,255,0.1)",m.style.color="#FFF"},m.onmouseleave=()=>{s||(m.style.background="transparent",m.style.color="#9AA0A6")},m.onclick=G=>{G.stopPropagation(),f(m)},nt.insertBefore(m,nt.firstChild)}Ve.insertBefore(Rt.parkButton,Ve.firstChild),l.appendChild(Rt.drawer);let ct=document.createElement("div");Object.assign(ct.style,at),ct.className="no-drag",ct.title="Redimensionar",l.appendChild(ct),it(l,ct),document.body.appendChild(l);function ft(m){t=m;let G=dt();Object.assign(O.style,Te),Object.assign(M.style,Te),m==="bau"?(Object.assign(O.style,G),w.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(M.style,G),w.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),d.value&&d.dispatchEvent(new Event("change"))}function ae(m){try{if(He&&He[n]&&He[n][m])return He[n][m];if(He&&He.pt&&He.pt[m])return He.pt[m]}catch{}return m}function Uo(){j.textContent=ae("idioma"),E.textContent=ae("fluxo"),_.textContent=ae("status_principal"),u.textContent=ae("substatus"),Re.textContent=ae("cenarios_comuns"),We.textContent=ae("selecione_tasks"),_e.textContent=ae("preencha_detalhes"),rt.textContent=ae("copiar"),lt.textContent=ae("preencher"),R.querySelector('option[value=""]')&&(R.querySelector('option[value=""]').textContent=ae("select_status")),d.querySelector('option[value=""]')&&(d.querySelector('option[value=""]').textContent=ae("select_substatus")),B.textContent=ae("caso_portugal"),L.textContent=ae("sim"),I.textContent=ae("nao"),be.textContent=ae("consentiu_gravacao"),ye.textContent=ae("sim"),de.textContent=ae("nao"),Ne.querySelectorAll("label").forEach(m=>{let G=m.nextElementSibling.id.replace("field-",""),F=ae(G.toLowerCase());F!==G.toLowerCase()?m.textContent=F:m.textContent=G.replace(/_/g," ").replace(/\b\w/g,V=>V.toUpperCase())+":"}),Ce.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function ht(m){n=m;let G=dt();Object.assign(z.style,Te),Object.assign(v.style,Te),m==="pt"?(Object.assign(z.style,G),y.style.display="block",$(o)):(Object.assign(v.style,G),y.style.display="none",Q.style.display="none"),Uo(),d.value&&d.dispatchEvent(new Event("change"))}function _t(m){(m.value.trim()===""||m.value.trim()==="\u2022")&&(m.value="\u2022 "),m.onkeydown=function(G){if(G.key==="Enter"){G.preventDefault();let F=this.selectionStart,V=this.selectionEnd,le=this.value,xe=le.lastIndexOf(`
`,F-1)+1,Ae=le.substring(xe,F),he=Ae.trim()==="\u2022"||Ae.trim()===""?`
`:`
\u2022 `;this.value=le.substring(0,F)+he+le.substring(V),this.selectionStart=this.selectionEnd=F+he.length}else if(G.key==="Backspace"){let F=this.selectionStart;if(F===this.selectionEnd&&F>0){let V=this.value.substring(0,F);V.endsWith(`
\u2022 `)?(G.preventDefault(),this.value=V.substring(0,F-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=F-3):V==="\u2022 "&&(G.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function Dt(){let m=typeof Ie<"u"?Ie:document.getElementById("snippet-container");if(!m)return;let G=m.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),F={},V=new Set;G.forEach(X=>{let ne=X.id,Z=De[ne];if(Z)for(let K in Z)K==="linkedTask"?V.add(Z.linkedTask):K!=="type"&&(F[K]||(F[K]=[]),F[K].includes(Z[K])||F[K].push(Z[K]))});let le=new Set;Object.values(De).forEach(X=>{Object.keys(X).forEach(ne=>{ne!=="linkedTask"&&ne!=="type"&&le.add(ne)})}),le.forEach(X=>{let ne=document.getElementById(X);if(ne){let Z=F[X]||[],K="";mt.includes(X.replace("field-",""))?(K=Z.map(re=>re.startsWith("\u2022 ")?re:"\u2022 "+re).join(`
`),K===""?K="\u2022 ":K.endsWith(`
\u2022 `)||(K+=`
\u2022 `)):K=Z.join(`

`),K.trim()!=="\u2022"&&K.trim()!==""?ne.value=K:mt.includes(X.replace("field-",""))?ne.value="\u2022 ":ne.value="",ne.tagName==="TEXTAREA"&&typeof _t=="function"&&_t(ne)}});let xe=new Set,Ae=new Set;m.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(X=>{let ne=De[X.id];ne&&ne.linkedTask&&(X.checked?xe.add(ne.linkedTask):Ae.add(ne.linkedTask))}),Ae.forEach(X=>{xe.has(X)||c.toggleTask(X,!1)}),xe.forEach(X=>{c.toggleTask(X,!0)})}R.onchange=()=>{let m=R.value;if(xt(1.5),d.innerHTML=`<option value="">${ae("select_substatus")}</option>`,!m){d.disabled=!0;return}for(let G in ut){let F=ut[G];if(F.status===m){let V=document.createElement("option");V.value=G,V.textContent=F.name,d.appendChild(V)}}d.disabled=!1},d.onchange=()=>{let m=d.value;if(xt(1.5),!m)return;c.updateSubStatus(m);let G=ut[m];Ie.innerHTML="";let F=(Z,K,re)=>{let fe=document.createElement("label");Object.assign(fe.style,a.checkboxLabel),fe.onmouseover=()=>fe.style.backgroundColor="#e8eaed",fe.onmouseout=()=>fe.style.backgroundColor="#f8f9fa";let ue=document.createElement("input");return ue.type=K,ue.id=Z.id,Object.assign(ue.style,a.checkboxInput),fe.appendChild(ue),fe.appendChild(document.createTextNode(` ${Z.text}`)),re.appendChild(fe),ue},V=[],le="radio";if(m==="NI_Awaiting_Inputs")V=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(m.startsWith("SO_"))le="checkbox",V=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"},{id:"quickfill-ga4-event-close",text:"Fechamento GA4 (P\xF3s 2 dias)"}];else if(m.startsWith("AS_")){le="checkbox";let Z=document.createElement("label");Z.textContent=ae("cenarios_comuns"),Object.assign(Z.style,a.label),Ie.appendChild(Z),V=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else m.startsWith("IN_")?V=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:m.startsWith("DC_")?(le="radio",V=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]):m==="NI_Attempted_Contact"?(le="radio",V=[{id:"quickfill-ni-attempted-2day",text:"2 Day Rule (2 Liga\xE7\xF5es + Chat AM)"}]):m==="NI_Awaiting_Validation"&&(le="checkbox",V=[{id:"quickfill-ni-awaiting-ecw4",text:"ECW4 (Acompanhar)"},{id:"quickfill-ni-awaiting-ga4",text:"GA4 Event Tracking (Acompanhar)"}]);let xe=V.filter(Z=>{let K=De[Z.id];return!K.type||K.type==="all"||K.type===t});xe.forEach((Z,K)=>{let re=F(Z,le,Ie);le==="radio"&&(re.name="scenario-radio-group",K===0&&(re.checked=!0))}),xe.length>0&&(ce.style.display="block"),G.requiresTasks?(Ce.style.display="none",We.style.display="block",c.selectionElement.style.display="block"):(Ce.style.display="block",We.style.display="none",c.selectionElement.style.display="none"),Ne.innerHTML="";let Ae=G.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(Ae)].forEach(Z=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(Z))return;let K=Z.slice(1,-1),re=document.createElement("label"),fe=ae(K.toLowerCase());if(re.textContent=fe!==K.toLowerCase()?fe:K.replace(/_/g," ").replace(/\b\w/g,oe=>oe.toUpperCase())+":",Object.assign(re.style,a.label),K==="SPEAKEASY_ID"){let oe=document.createElement("button");oe.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',oe.style.cssText=`
              font-family: 'Google Sans', Roboto, sans-serif;
              font-size: 11px;
              font-weight: 500;
              color: #0b57d0; /* Azul Google Material 3 */
              background-color: #d3e3fd; /* Fundo Azul Claro Tonal */
              border: none;
              border-radius: 100px; /* Fully rounded pill */
              padding: 5px 12px;
              margin-left: 10px;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              transition: all 0.2s ease;
              outline: none;
              vertical-align: middle;
              letter-spacing: 0.3px;
          `,oe.title="Localizar Speakeasy ID no hist\xF3rico",oe.onmouseover=()=>{oe.style.backgroundColor="#c2e7ff",oe.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},oe.onmouseout=()=>{oe.style.backgroundColor="#d3e3fd",oe.style.boxShadow="none"},oe.onmousedown=()=>{oe.style.backgroundColor="#a8c7fa",oe.style.transform="scale(0.96)"},oe.onmouseup=()=>oe.style.transform="scale(1)",oe.onclick=Se=>{Se.preventDefault(),vo(`field-${K}`)},re.appendChild(oe)}let ue;mt.includes(K)?(ue=document.createElement("textarea"),Object.assign(ue.style,a.textarea),ue.classList.add("bullet-textarea"),_t(ue)):$t.includes(K)?(ue=document.createElement("textarea"),Object.assign(ue.style,a.textarea)):(ue=document.createElement("input"),ue.type="text",Object.assign(ue.style,a.input),K==="REASON_COMMENTS"&&(m.startsWith("NI_")||m.startsWith("IN_"))&&(Object.assign(re.style,{display:"none"}),Object.assign(ue.style,{display:"none"}))),K==="ON_CALL"&&t==="lm"&&(Object.assign(re.style,{display:"none"}),Object.assign(ue.style,{display:"none"}),ue.value="N/A"),ue.id=`field-${K}`,Ne.appendChild(re),Ne.appendChild(ue)});let X=Ie.querySelectorAll('input[type="checkbox"], input[type="radio"]');X.length>0&&(X.forEach(Z=>{Z.removeEventListener("change",Dt),Z.addEventListener("change",Dt)}),Dt()),we.style.display="block",Ze[m]?Ye.style.display="block":Ye.style.display="none",Ve.style.display="flex";let ne=c.getCheckedElements().map(Z=>Z.value);r.updateVisibility(m,ne)},Ce.onclick=()=>{Ce.style.display="none",We.style.display="block",c.selectionElement.style.display="block"};function oo(){let m=d.value;if(!m)return null;let F=ut[m].template.replace(/\n/g,"<br>"),V='style="margin-bottom: 12px; padding-left: 30px;"',le=[],xe="",Ae=c.getCheckedElements();Ae.length>0&&Ae.forEach(ne=>{let Z=ne.value,K=Fe[Z],re=ne.closest().querySelector(".stepper-count"),fe=re?parseInt(re.textContent):1;fe>1?le.push(`${K.name} (x${fe})`):le.push(K.name)});let he=c.screenshotsElement;if(he){let ne=Array.from(he.querySelectorAll('input[id^="name-"]'));ne.length>0&&ne.forEach(Z=>{let K=Z.value,re=Z.closest(".cw-screen-card");if(re){let fe=re.querySelectorAll('input[id^="screen-"]'),ue=!1,oe="";fe.forEach(Se=>{let ao=Se.closest(".cw-input-group"),io=ao?ao.querySelector(".cw-input-label"):null,Xo=io?io.textContent:"Evid\xEAncia",so=Se.value.trim(),Ko=so?` ${so}`:"";oe+=`<li>${Xo} -${Ko}</li>`,ue=!0}),ue&&(xe+=`<b>${K}</b>`,xe+=`<ul ${V}>${oe}</ul>`)}})}if(F.includes("{TAGS_IMPLEMENTED}")?F=F.replace(/{TAGS_IMPLEMENTED}/g,le.join(", ")||"N/A"):le.length>0&&(F+=`<br><b>Tags:</b> ${le.join(", ")}<br>`),F.includes("{SCREENSHOTS_LIST}")?F=F.replace(/{SCREENSHOTS_LIST}/g,xe?`${xe}`:"N/A"):xe!==""&&(F+=`<br>${xe}`),n==="pt"&&o){let ne=se.checked?ae("sim"):ae("nao");F=F.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${ae("consentiu_gravacao")}</b> ${ne}<br><br>`),F=F.replace(/{CASO_PORTUGAL}/g,`<br><b>${ae("caso_portugal")}</b> ${ae("sim")}<br>`)}else n==="pt"&&!o?(F=F.replace(/{CASO_PORTUGAL}/g,`<br><b>${ae("caso_portugal")}</b> ${ae("nao")}<br>`),F=F.replace(/{CONSENTIU_GRAVACAO}/g,"")):(F=F.replace(/{CASO_PORTUGAL}/g,""),F=F.replace(/{CONSENTIU_GRAVACAO}/g,""));return Ne.querySelectorAll("input, textarea").forEach(ne=>{let Z=ne.id.replace("field-",""),K=new RegExp(`{${Z}}`,"g"),re=ne.value;if(Z==="REASON_COMMENTS"&&(m.startsWith("NI_")||m.startsWith("IN_"))){let oe=Ie.querySelector('input[type="radio"]:checked');oe&&De[oe.id]&&(re=De[oe.id]["field-REASON_COMMENTS"])}if(mt.includes(Z)&&re.trim()!==""){let oe=re.split(`
`).map(Se=>Se.trim()).filter(Se=>Se!==""&&Se!=="\u2022").map(Se=>Se.startsWith("\u2022 ")?Se.substring(2):Se).map(Se=>`<li>${Se}</li>`).join("");re=oe?`<ul ${V}>${oe}</ul>`:""}else $t.includes(Z)?re=re.split(`
`).filter(oe=>oe.trim()!=="").map(oe=>`<p style="margin: 0 0 8px 0;">${oe}</p>`).join(""):ne.tagName==="TEXTAREA"&&(re=re.replace(/\n/g,"<br>"));let fe=re.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(fe===""||fe==="\u2022"||fe.toLowerCase()==="n/a"){let oe=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${Z}\\}(?:<br>\\s*)?`,"gi");oe.test(F)?F=F.replace(oe,""):F=F.replace(K,"")}else F=F.replace(K,re.replace(/\$/g,"$$$$"))}),F=F.replace(/{([A-Z0-9_]+)}/g,""),F=F.replace(/(<br>){3,}/g,"<br><br>"),typeof r<"u"&&r.getOutput&&(F+=r.getOutput()),F}rt.onclick=()=>{let m=oo();m?(gt(m),Y(ae("copiado_sucesso"))):Y(ae("selecione_substatus"),{error:!0})},lt.onclick=async()=>{let m=d.value,G=oo();if(!G){Y(ae("selecione_substatus"),{error:!0});return}gt(G),zt();let F=It(),V=await Lt();if(V)try{if(V.focus(),V.innerHTML.trim()==="<p><br></p>"||V.innerHTML.trim()==="<br>"||V.innerText.trim()===""){let he=document.createRange();he.selectNodeContents(V);let X=window.getSelection();X.removeAllRanges(),X.addRange(he),document.execCommand("delete",!1,null)}else if(!V.innerHTML.endsWith("<br><br>")){let he=document.createRange();he.selectNodeContents(V),he.collapse(!1);let X=window.getSelection();X.removeAllRanges(),X.addRange(he),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,G),Ft(V),setTimeout(()=>{Y(ae("inserido_copiado"))},600);let xe=typeof Ke<"u"&&Ke?Ke.checked:!0;if(m&&Ze[m]&&xe){let he=Ze[m];await Tt(he),await new Promise(X=>setTimeout(X,500))}F(),xt(1.5),R.value="",d.innerHTML=`<option value="">${ae("select_substatus")}</option>`,d.disabled=!0}catch(le){console.error(le),Y("Erro ao inserir.",{error:!0}),F()}};function xt(m=1.5){m<=1.5&&(ce.style.display="none",Ie.innerHTML=""),m<=2&&(c.reset(),Ce.style.display="none"),m<=3&&(we.style.display="none",Ne.innerHTML="",r.reset(),Ve.style.display="none",Ye.style.display="none")}let Wo=null,yt="";function no(m){let G=document.getElementById("cw-btn-notes");if(!G)return;let F=G.querySelector(".cw-dot-dirty");if(m){if(!F){let V=document.createElement("div");V.className="cw-dot-dirty",G.appendChild(V)}}else F&&F.remove()}async function Yo(){let m=await eo(),G=m.activeTasks.length>0;if(!G){let F=Object.keys(m.formData);for(let V of F){let le=m.formData[V];if(le&&le.trim().length>3&&le!=="\u2022 "){G=!0;break}}}if(no(G),G){let F=JSON.stringify(m);F!==yt&&(DraftService.saveEmergency(m),yt=F)}else yt!==""&&(DraftService.clearEmergency(),yt="")}Wo=setInterval(Yo,5e3),setTimeout(()=>{let m=DraftService.getEmergency();if(m){let G=document.createElement("button");G.innerHTML="\u26A0\uFE0F Recuperar trabalho n\xE3o salvo",G.style.cssText="width:100%; background:#FFF3E0; color:#B06000; border:none; padding:8px; font-size:12px; cursor:pointer; font-weight:600; border-bottom:1px solid #FFE0B2;",G.onclick=()=>{to(m),G.remove(),Y("Trabalho recuperado!"),SoundManager.playSuccess()},b.insertBefore(G,b.firstChild),no(!0)}},1e3);function zt(){if(i=!i,i){let m=l.querySelector(".cw-expand-btn");m&&typeof m.resetState=="function"&&m.resetState()}Me(i,l,"cw-btn-notes")}return ft("bau"),ht("pt"),zt}var tt={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function Ro(){let e="v4.2.0 CR-Hybrid",t="CANNED_RESPONSES",n=Object.keys(tt)[0],o="",i="list",s=!1,a={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:a.bgApp},c={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},l={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},p={padding:"20px 24px 12px 24px",flexShrink:"0",background:a.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${a.borderSubtle}`},g={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:a.textPrimary,boxSizing:"border-box",outline:"none",transition:a.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},b={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},h={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:a.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:a.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},x={background:a.primaryBg,color:a.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},f={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},A={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:a.bgSurface,border:"1px solid transparent",boxShadow:a.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},S=document.createElement("div");S.id="quick-email-popup",S.classList.add("cw-module-window"),Object.assign(S.style,qe,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let j={popup:S,googleLine:null,focusElement:null};function H(){s=!s,Me(s,S,"cw-btn-email"),s||setTimeout(()=>w(),300)}let z=Le(S,"Quick Email",e,"Templates & Automa\xE7\xF5es",j,()=>H()),v=document.createElement("div");Object.assign(v.style,r);let C=document.createElement("div");Object.assign(C.style,c);let E=document.createElement("div");Object.assign(E.style,l);let T=document.createElement("div");Object.assign(T.style,p);let O=document.createElement("input");O.placeholder="Pesquisar templates...",Object.assign(O.style,g),O.onfocus=()=>{O.style.borderColor=a.primary,O.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",O.style.background="#fff"},O.onblur=()=>{O.style.borderColor="transparent",O.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",O.style.background="#fff"},j.focusElement=O;let M=document.createElement("div");Object.assign(M.style,b);let N=document.createElement("div");Object.assign(N.style,f),T.appendChild(O),T.appendChild(M),E.appendChild(T),E.appendChild(N);let _=document.createElement("div");Object.assign(_.style,l);let R=document.createElement("div");Object.assign(R.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),_.appendChild(R),C.appendChild(E),C.appendChild(_),v.appendChild(C),S.appendChild(z),S.appendChild(v),document.body.appendChild(S);async function W(q,P){try{s&&H();let k=It();await new Promise(L=>setTimeout(L,800)),P==="email"?await Co(q):P==="cr"&&await Tt(q),k()}catch(k){console.error("\u274C Erro:",k);let L=document.querySelector(".cw-focus-backdrop");L&&L.classList.remove("active")}}function u(q){i="detail",C.style.transform="translateX(-50%)";let P='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',k='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';R.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${P}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${q.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${q.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${q.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${k} Usar Template
                </button>
            </div>
        `;let L=R.querySelector("#csa-back-btn");L.onmouseenter=()=>L.style.background="#f1f3f4",L.onmouseleave=()=>L.style.background="none",L.onclick=w;let D=R.querySelector("#csa-insert-btn");D.onmouseenter=()=>{D.style.transform="translateY(-1px)",D.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},D.onmouseleave=()=>{D.style.transform="translateY(0)",D.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},D.onclick=()=>{D.style.transform="scale(0.96)",W(q,"email"),setTimeout(()=>{D.style.transform="scale(1)",w()},300)}}function w(){i="list",C.style.transform="translateX(0)"}function d(q,P,k=null){let L=document.createElement("button"),D=k?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${k}</span>`:"";return L.innerHTML=`${D}${q}`,Object.assign(L.style,h),n===P&&o===""?Object.assign(L.style,x):(L.onmouseenter=()=>{L.style.background="#F1F3F4",L.style.borderColor="#DADCE0"},L.onmouseleave=()=>{L.style.background="#FFFFFF",L.style.borderColor="#DADCE0"}),L.onclick=()=>{n=P,o="",O.value="",y(),B()},L}function y(){M.innerHTML="",M.appendChild(d("Smart CRs",t,"\u26A1")),Object.keys(tt).forEach(q=>{M.appendChild(d(tt[q].title,q))})}function B(){N.innerHTML="";let q=[];if(o.trim()!==""){let U=o.toLowerCase();Object.values(tt).forEach(I=>{I.emails.forEach($=>{($.name.toLowerCase().includes(U)||$.subject.toLowerCase().includes(U))&&q.push({type:"email",data:$})})}),Object.entries(Ze).forEach(([I,$])=>{if(!$)return;(I.replace(/_/g," ").toLowerCase().includes(U)||$.toLowerCase().includes(U))&&q.push({type:"cr",key:I,code:$})})}else n===t?Object.entries(Ze).forEach(([U,I])=>{I&&q.push({type:"cr",key:U,code:I})}):tt[n]&&tt[n].emails.forEach(U=>{q.push({type:"email",data:U})});if(q.length===0){N.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let k='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',L='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',D='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';q.forEach(U=>{let I=document.createElement("div");if(Object.assign(I.style,A),U.type==="email"){let $=U.data,Q=$.subject.length>45?$.subject.substring(0,45)+"...":$.subject;I.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${k}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${$.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${Q}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${D}</div>
                `,I.onclick=()=>u($)}else{let $=U.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");I.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${L}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${$}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${U.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,I.onclick=()=>{I.style.transform="scale(0.98)",I.style.background="#FEF7E0",setTimeout(()=>{I.style.transform="scale(1)",I.style.background="#fff",W(U.code,"cr")},150)}}I.onmouseenter=()=>{I.style.transform="translateY(-2px)",I.style.boxShadow=a.shadowHover,U.type==="cr"?I.style.borderLeft="3px solid #Fbbc04":I.style.borderLeft="3px solid #1a73e8"},I.onmouseleave=()=>{I.style.transform="translateY(0)",I.style.boxShadow=a.shadowCard,I.style.borderLeft="1px solid transparent"},N.appendChild(I)})}return O.addEventListener("input",q=>{o=q.target.value,o!==""?Array.from(M.children).forEach(P=>{Object.assign(P.style,h),P.style.opacity="0.6"}):y(),B()}),y(),B(),H}var _o={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function Do(){let e="v2.6 (Context HD)",t="csa-local-styles";if(!document.getElementById(t)){let d=document.createElement("style");d.id=t,d.innerHTML=`
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
      `,document.head.appendChild(d)}let n={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#FFFFFF",scrollBehavior:"smooth"},card:{background:"#FFFFFF",border:"1px solid #E5E7EB",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"12px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"8px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.1s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.6",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"18px",height:"18px",borderRadius:"6px",border:"2px solid #DADCE0",marginRight:"12px",marginTop:"2px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},o={},i="PT",s="BAU",a=!1,r=document.createElement("div");r.id="call-script-popup",r.classList.add("cw-module-window"),Object.assign(r.style,qe,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let c={popup:r,googleLine:null},l=null;function p(){a&&Ge().then(d=>{let y=r.querySelector("#cw-ctx-name"),B=r.querySelector("#cw-ctx-cid"),q=r.querySelector("#cw-ctx-email");if(y&&(y.textContent=d.advertiserName||"Cliente Desconhecido"),B){let P=d.cid||"---";B.textContent!==P&&(B.textContent=P)}if(q){let P=d.clientEmail||"N\xE3o encontrado";q.textContent!==P&&(q.textContent=P,q.title=P)}})}function g(){a=!a,Me(a,r,"cw-btn-script"),a?(p(),l||(l=setInterval(p,2e3))):l&&(clearInterval(l),l=null)}let b=Le(r,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",c,()=>{g()});r.appendChild(b);let h=document.createElement("div");Object.assign(h.style,n.contextBanner),h.innerHTML=`
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
  `;let x=(d,y)=>{let B=h.querySelector(d),q=h.querySelector(y);B.onclick=()=>{let P=q.textContent;!P||P.includes("---")||P.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(P),J.playSuccess(),B.classList.add("copied"),setTimeout(()=>B.classList.remove("copied"),1500))}};r.appendChild(h);let f=document.createElement("div");Object.assign(f.style,n.progressBarContainer);let A=document.createElement("div");Object.assign(A.style,n.progressBarFill),f.appendChild(A),r.appendChild(f);let S=document.createElement("div");S.id="csa-content",Object.assign(S.style,n.contentArea),r.appendChild(S);let j=document.createElement("div");Object.assign(j.style,n.footer);let H=document.createElement("span");H.textContent="by lucaste@",Object.assign(H.style,{fontSize:"10px",color:"#bdc1c6"});let z=document.createElement("button");z.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(z.style,n.resetBtn),z.onmouseenter=()=>z.style.background="#fce8e6",z.onmouseleave=()=>z.style.background="transparent",z.onclick=()=>{z.style.transform="scale(0.9)",setTimeout(()=>z.style.transform="scale(1)",150);for(let d in o)delete o[d];R()},j.appendChild(H),j.appendChild(z),r.appendChild(j);let v=document.createElement("div");Object.assign(v.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let C=document.createElement("div");Object.assign(C.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let E=document.createElement("div");E.textContent="BAU";let T=document.createElement("div");T.textContent="LT",Object.assign(E.style,Te),Object.assign(T.style,Te),C.appendChild(E),C.appendChild(T);let O=document.createElement("select");Object.assign(O.style,At,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),O.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',O.value=i,v.appendChild(C),v.appendChild(O),S.appendChild(v);let M=document.createElement("div");M.id="csa-checklist-area",S.appendChild(M);let N=document.createElement("div");Object.assign(N.style,at),N.className="no-drag",N.title="Redimensionar",r.appendChild(N),it(r,N),document.body.appendChild(r),x("#cw-pill-cid","#cw-ctx-cid"),x("#cw-pill-email","#cw-ctx-email");function _(d){return d}function R(){M.innerHTML="";let d=`${i} ${s}`,y=_o[d];if(!y){M.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',A.style.width="0%";return}let B=y.color||"#1a73e8",q=0,P=0;["inicio","meio","fim"].forEach(k=>{y[k]&&(q+=y[k].length)}),["inicio","meio","fim"].forEach((k,L)=>{let D=y[k];if(!D||D.length===0)return;let U=document.createElement("div");Object.assign(U.style,n.card);let I=document.createElement("div");Object.assign(I.style,n.cardTitle);let $="";k==="inicio"?i.includes("ES")?$="Apertura":i.includes("EN")?$="Opening":$="Abertura":k==="meio"?i.includes("ES")?$="Implementaci\xF3n":i.includes("EN")?$="Implementation":$="Implementa\xE7\xE3o (Tag Support)":k==="fim"&&(i.includes("ES")?$="Cierre":i.includes("EN")?$="Closing":$="Fechamento"),I.textContent=$;let Q=document.createElement("span");Q.style.fontSize="11px",Q.style.opacity="0.7",Q.style.fontWeight="500",Q.style.background="#f1f3f4",Q.style.padding="2px 8px",Q.style.borderRadius="10px",I.appendChild(Q),U.appendChild(I);let be=0;D.forEach((ge,Ee)=>{let se=`${d}-${k}-${Ee}`,ye=!!o[se];ye&&(P++,be++);let pe=document.createElement("div");Object.assign(pe.style,n.itemRow);let ee=document.createElement("div");Object.assign(ee.style,n.checkbox);let de=document.createElement("span");de.innerHTML=ge,de.style.flex="1",ye?(Object.assign(pe.style,n.itemCompleted),ee.style.background=B,ee.style.borderColor=B,ee.style.transform="scale(1)",ee.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(pe.style.textDecoration="none",pe.style.opacity="1",ee.style.background="transparent",ee.style.borderColor="#dadce0",ee.style.transform="scale(1)",ee.innerHTML=""),pe.onclick=()=>{let ce=!o[se];o[se]=ce,J.playClick(),ce?(ee.style.transform="scale(1.2)",setTimeout(()=>ee.style.transform="scale(1)",150),Object.assign(pe.style,n.itemCompleted),ee.style.background=B,ee.style.borderColor=B,ee.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(pe.style.textDecoration="none",pe.style.opacity="1",ee.style.background="transparent",ee.style.borderColor="#dadce0",ee.innerHTML=""),W(d,y)},pe.onmouseenter=()=>{o[se]||(pe.style.background="#f1f3f4",ee.style.borderColor=B)},pe.onmouseleave=()=>{o[se]||(pe.style.background="transparent",ee.style.borderColor="#dadce0")},pe.appendChild(ee),pe.appendChild(de),U.appendChild(pe)}),be===D.length&&D.length>0&&(Q.style.color="#1e8e3e",Q.style.background="#e6f4ea",U.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),Q.textContent=`${be}/${D.length}`,M.appendChild(U)}),u(q,P)}function W(d,y){let B=0,q=0;["inicio","meio","fim"].forEach(P=>{let k=y[P]||[];B+=k.length,k.forEach((L,D)=>{o[`${d}-${P}-${D}`]&&q++})}),u(B,q),setTimeout(()=>R(),200)}function u(d,y){let B=d===0?0:y/d*100;A.style.width=`${B}%`,A.style.background=B===100?"#34A853":"linear-gradient(90deg, #4285F4, #34A853)"}function w(d){s=d;let y=dt();Object.assign(E.style,Te),Object.assign(T.style,Te),Object.assign(d==="BAU"?E.style:T.style,y),R()}return E.onclick=()=>w("BAU"),T.onclick=()=>w("LT"),O.addEventListener("change",d=>{i=d.target.value,R()}),w(s),g}var bt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},ot={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},Nt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},Kt="cw_link_history_v4";function zo(e,t){try{let n=JSON.parse(localStorage.getItem(Kt)||"[]");n=n.filter(o=>o.url!==e.url),n.unshift({...e,_originalCat:t}),n=n.slice(0,3),localStorage.setItem(Kt,JSON.stringify(n))}catch(n){console.warn("Erro ao salvar hist\xF3rico",n)}}function pn(){try{return JSON.parse(localStorage.getItem(Kt)||"[]")}catch{return[]}}function Bo(){let e="v4.6",t="",n=!1,o=null,i=!1,s={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},a=document.createElement("div");a.id="links-popup",a.classList.add("cw-module-window"),Object.assign(a.style,qe,{right:"100px",width:"600px",height:"650px",background:s.bgApp,overflow:"hidden"});let c=Le(a,"Central de Links",e,"Navegue pelas categorias ou use a busca.",{popup:a,googleLine:null},()=>N());a.appendChild(c);let l=document.createElement("div");l.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",a.appendChild(l);let p=document.createElement("div");p.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${s.bgSidebar};
      border-right: 1px solid ${s.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,l.appendChild(p);let g=document.createElement("div");g.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",l.appendChild(g);let b=document.createElement("div");b.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let h=document.createElement("div");h.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let x=document.createElement("div");x.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',x.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let f=document.createElement("input");f.type="text",f.placeholder="Buscar ferramenta ou SOP...",f.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${s.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,f.onfocus=()=>{h.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",h.style.border="1px solid #1a73e8"},f.onblur=()=>{h.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",h.style.border="1px solid transparent"},h.appendChild(x),h.appendChild(f),b.appendChild(h),g.appendChild(b);let A=document.createElement("div");A.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",g.appendChild(A);let S=null;function j(){if(S)return;S=document.createElement("div"),S.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let _=document.createElement("div");_.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",_.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let R=document.createElement("button");R.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',R.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",R.onclick=()=>{z(),i=!1,T()},_.appendChild(R),S.appendChild(_);let W=document.createElement("div");W.id="cw-history-list",W.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",S.appendChild(W),g.appendChild(S)}function H(){S||j();let _=S.querySelector("#cw-history-list");_.innerHTML="";let R=pn();R.length===0?_.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':R.forEach(W=>{let u=M(W,ot[W._originalCat],!0,W._originalCat);_.appendChild(u)}),requestAnimationFrame(()=>S.style.transform="translateY(0)")}function z(){S&&(S.style.transform="translateY(100%)")}function v(){p.innerHTML="";let _=C("history","Recentes",ot.history);_.id="cw-sidebar-btn-history",_.onclick=()=>{J.playClick(),i=!i,i?H():z(),T()},p.appendChild(_);let R=document.createElement("div");R.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",p.appendChild(R),Object.keys(bt).forEach(W=>{let u=bt[W],w=C(W,u.label,ot[W]);w.id=`cw-sidebar-btn-${W}`,w.onclick=()=>{J.playClick(),i&&(i=!1,z()),E(W)},p.appendChild(w)})}function C(_,R,W){let u=document.createElement("div");u.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${s.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,u.title=R,u.dataset.key=_;let w=document.createElement("div");w.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",w.innerHTML=W||ot.tasks;let d=document.createElement("div");return d.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",d.textContent=R,u.appendChild(w),u.appendChild(d),u.onmouseenter=()=>{o!==_&&!(_==="history"&&i)&&(u.style.background="#F1F3F4",w.style.transform="scale(1.1)")},u.onmouseleave=()=>{o!==_&&!(_==="history"&&i)&&(u.style.background="transparent",w.style.transform="scale(1)")},u}function E(_){let R=document.getElementById(`cat-anchor-${_}`);R&&(R.scrollIntoView({behavior:"smooth",block:"start"}),o=_,T())}function T(){Object.keys(bt).forEach(R=>{let W=p.querySelector(`#cw-sidebar-btn-${R}`);if(W)if(o===R&&!i){let u=Nt[R];W.style.background=u.bg,W.style.color=u.color,W.querySelector("div:first-child").style.transform="scale(1.1)"}else W.style.background="transparent",W.style.color=s.textSecondary,W.querySelector("div:first-child").style.transform="scale(1)"});let _=p.querySelector("#cw-sidebar-btn-history");_&&(i?(_.style.background="#3C4043",_.style.color="#FFFFFF"):(_.style.background="transparent",_.style.color=s.textSecondary))}function O(){if(A.innerHTML="",t.trim()!==""){let R=[];if(Object.entries(bt).forEach(([u,w])=>{let d=w.links.filter(y=>y.name.toLowerCase().includes(t.toLowerCase())||y.desc.toLowerCase().includes(t.toLowerCase()));R.push(...d.map(y=>({...y,_cat:u})))}),R.length===0){A.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let W=document.createElement("div");W.innerHTML="Resultados da busca",W.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",A.appendChild(W),R.forEach(u=>{let w=M(u,ot[u._cat],!1,u._cat);A.appendChild(w)});return}Object.entries(bt).forEach(([R,W])=>{let u=Nt[R],w=document.createElement("div"),d=document.createElement("div");d.id=`cat-anchor-${R}`,d.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${u.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,d.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${u.color};"></div>
            ${W.label}
          `,w.appendChild(d);let y=document.createElement("div");y.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",W.links.forEach(B=>{let q=M(B,ot[R],!1,R);y.appendChild(q)}),w.appendChild(y),A.appendChild(w)});let _=document.createElement("div");_.style.height="80px",A.appendChild(_)}function M(_,R,W,u){let w=document.createElement("div"),d=Nt[u]||Nt.history;w.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let y=document.createElement("div");y.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${d.bg}; color: ${d.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,y.innerHTML=R||ot.tasks;let B=y.querySelector("svg");B&&(B.style.width="22px",B.style.height="22px");let q=document.createElement("div");q.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let P=document.createElement("div");P.style.cssText=`font-size: 14px; font-weight: 600; color: ${s.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,P.textContent=_.name;let k=document.createElement("div");k.style.cssText=`font-size: 12px; color: ${s.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,k.textContent=_.desc,q.appendChild(P),q.appendChild(k);let L=document.createElement("div");return L.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',L.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,L.title="Copiar URL",w.onmouseenter=()=>{w.style.transform="translateY(-2px)",w.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",w.style.borderColor="rgba(0,0,0,0.05)",w.style.borderLeft=`4px solid ${d.color}`,L.style.opacity="1",L.style.background="#F1F3F4"},w.onmouseleave=()=>{w.style.transform="translateY(0)",w.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",w.style.border="1px solid transparent",L.style.opacity="0",L.style.background="transparent"},w.onclick=()=>{!W&&u&&zo(_,u),window.open(_.url,"_blank")},L.onclick=D=>{D.stopPropagation(),J.playClick(),navigator.clipboard.writeText(_.url),!W&&u&&zo(_,u),Y("Link copiado!")},w.appendChild(y),w.appendChild(q),w.appendChild(L),w}f.addEventListener("input",_=>{t=_.target.value,O()});function N(){n=!n,Me(n,a,"cw-btn-links")}return document.body.appendChild(a),v(),O(),N}var Ue=[];function Jt(e){Ue=e}var un=["lucaste","ricardogi"],mn=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function Go(){let e="v4.9",t=!1,n=null,o=null;function i(u){if(!u)return"";try{let w=new Date(u);return isNaN(w.getTime())?String(u):w.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(u)}}if(!document.getElementById("cw-broadcast-hd-css")){let u=document.createElement("style");u.id="cw-broadcast-hd-css",u.innerHTML=`
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
      `,document.head.appendChild(u)}let s={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},a={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(u){return u?Object.entries(u).map(([w,d])=>`${w.replace(/[A-Z]/g,y=>"-"+y.toLowerCase())}:${d}`).join(";"):""}function c(u){if(!u||typeof u!="string")return"";let w=u;return w=w.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),w=w.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),w=w.replace(/_(.*?)_/g,"<i>$1</i>"),w=w.replace(/\n/g,"<br>"),w=ho(w),w}let l=document.createElement("div");l.id="broadcast-popup",l.classList.add("cw-module-window"),Object.assign(l.style,qe,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let p={popup:l,googleLine:null};function g(){if(t=!t,Me(t,l,"cw-btn-broadcast"),t){let u=document.getElementById("cw-btn-broadcast");u&&u.classList.remove("has-new"),E()}}let b=Le(l,"Central de Avisos",e,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",p,()=>g()),h=b.querySelector(".cw-header-actions")||b.lastElementChild,x=null;function f(){let u=null;try{u=Ct()}catch{console.warn("TechSol: Auth Pending")}if(u){let w=u.split("@")[0].toLowerCase(),d=un.includes(w);if(window._cwIsAdmin=d,window._cwCurrentUser=w,d&&h&&!h.querySelector("#cw-admin-btn")){let y=document.createElement("div");y.id="cw-admin-btn",y.className="cw-btn-interactive",y.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(y.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),y.title="Novo Aviso",y.onclick=B=>{B.stopPropagation(),j()},h.insertBefore(y,h.firstChild),x||S(),O()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(f,2e3))}if(h){let u=document.createElement("button");u.textContent="Limpar",u.className="cw-btn-interactive",Object.assign(u.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),u.onclick=w=>{w.stopPropagation(),J.playSuccess();let d=Ue.map(y=>y.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(d)),O(),T()},h.insertBefore(u,h.firstChild)}l.appendChild(b);let A=document.createElement("div");A.id="cw-update-status",A.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",l.appendChild(A);function S(){x=document.createElement("div"),x.className="cw-editor-overlay",x.innerHTML=`
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
      `,x.querySelectorAll('input[name="cw-bc-type"]').forEach(y=>{y.addEventListener("change",()=>{x.querySelectorAll(".cw-radio-option").forEach(B=>B.classList.remove("checked")),y.parentElement.classList.add("checked")})}),setTimeout(()=>{let y=x.querySelector(".cw-radio-option.info");y&&y.classList.add("checked")},100);let u=x.querySelector("#cw-bc-cancel"),w=x.querySelector("#cw-bc-close-x"),d=x.querySelector("#cw-bc-send");u.onclick=H,w.onclick=H,d.onclick=z,l.appendChild(x)}function j(u=null){if(!x)return;let w=x.querySelector("#cw-editor-title-label"),d=x.querySelector("#cw-bc-title"),y=x.querySelector("#cw-bc-text"),B=x.querySelector("#cw-bc-send");if(u){o=u.id,w.textContent="Editar Aviso",d.value=u.title||"",y.value=u.text||"",B.textContent="Salvar Altera\xE7\xF5es";let q=u.type||"info",P=x.querySelector(`input[name="cw-bc-type"][value="${q}"]`);P&&P.click()}else{o=null,w.textContent="Novo Aviso",d.value="",y.value="",B.textContent="Publicar";let q=x.querySelector('input[name="cw-bc-type"][value="info"]');q&&q.click()}x.classList.add("active"),setTimeout(()=>d.focus(),300)}function H(){x&&x.classList.remove("active"),o=null}async function z(){let u=x.querySelector("#cw-bc-send"),w=x.querySelector("#cw-bc-title"),d=x.querySelector("#cw-bc-text"),y=x.querySelector('input[name="cw-bc-type"]:checked'),B=y?y.value:"info";if(!w.value.trim()||!d.value.trim()){Y("Preencha todos os campos!",{error:!0});return}u.textContent="Salvando...",u.style.opacity="0.7";let q=!1;o?q=await ke.updateBroadcast(o,{title:w.value,text:d.value,type:B}):q=await ke.sendBroadcast({title:w.value,text:d.value,type:B,author:window._cwCurrentUser||"admin"}),q?(Y(o?"Atualizado!":"Publicado!"),J.playSuccess(),H(),setTimeout(()=>E(),1500)):(Y("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),u.textContent=o?"Salvar Altera\xE7\xF5es":"Publicar",u.style.opacity="1")}async function v(u){if(confirm("Confirma a exclus\xE3o deste aviso?"))if(await ke.deleteBroadcast(u)){Y("Aviso removido."),J.playClick();let d=Ue.findIndex(y=>y.id===u);d>-1&&Ue.splice(d,1),O(),setTimeout(()=>E(),1500)}else Y("Erro ao excluir.",{error:!0})}let C=document.createElement("div");C.className="cw-nice-scroll",Object.assign(C.style,s.feedContainer),l.appendChild(C);async function E(){t&&(A.style.display="block",A.innerHTML="\u{1F504} Sincronizando...");try{let u=await ke.fetchData();u&&u.broadcast&&(Jt(u.broadcast),T(),t&&(O(),A.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{A.style.display="none"},1500)))}catch{t&&(A.innerHTML="\u26A0\uFE0F Offline")}}function T(){let u=document.getElementById("cw-btn-broadcast");if(!u)return;let w=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Ue.some(y=>!w.includes(y.id))){if(u.classList.add("has-new"),!u.querySelector(".cw-badge")){let y=document.createElement("div");y.className="cw-badge",Object.assign(y.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),u.appendChild(y)}}else{u.classList.remove("has-new");let y=u.querySelector(".cw-badge");y&&y.remove()}}function O(){C.innerHTML="";let u=l.querySelector("#cw-bau-widget");u&&u.remove();let w=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),d=[...Ue].sort((k,L)=>{let D=new Date(k.date).getTime()||0;return(new Date(L.date).getTime()||0)-D}),y=d.findIndex(k=>k.title&&k.title.toLowerCase().includes("disponibilidade bau"));if(y!==-1){let k=d[y];d.splice(y,1);let L=document.createElement("div");L.id="cw-bau-widget",Object.assign(L.style,s.bauContainer);let D=[],U=(k.text||"").split(`
`),I=/\d{1,2}\/\d{1,2}/,$="\u{1F4C5}";if(U.forEach(se=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(se)?$="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(se)&&($="\u{1F1EA}\u{1F1F8}");let ye=se.match(I);if(ye){let pe=ye[0],ee=$;/🇧🇷|🇵🇹|PT|BR/i.test(se)?ee="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(se)&&(ee="\u{1F1EA}\u{1F1F8}"),D.some(ce=>ce.flag===ee&&ce.date===pe)||D.push({flag:ee,date:pe})}}),D.length===0){let se=(k.text||"").match(/\d{1,2}\/\d{1,2}/g);se&&[...new Set(se)].forEach(ye=>D.push({flag:"\u{1F4C5}",date:ye}))}let Q="",be='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(be=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${be}
              `),D.length>0?Q=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${D.map(ye=>`
                  <div style="${r(s.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(s.bauFlag)}">${ye.flag}</span>
                      <span style="${r(s.bauDate)}">${ye.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${be}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${c(k.text)}</div>
              `:Q=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${c(k.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,L.innerHTML=`
              <div style="${r(s.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(s.liveIndicator)}">
                      <div style="${r(s.pulseDot)}"></div>
                      <span style="${r(s.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${i(k.date)}</div>
              </div>
              ${Q}
          `,A.after(L);let ge=L.querySelector("#cw-bau-toggle-btn"),Ee=L.querySelector("#cw-bau-full");if(ge&&Ee&&(ge.onclick=()=>{let se=Ee.style.display==="none";Ee.style.display=se?"block":"none",ge.textContent=se?"Ocultar":"Detalhes"}),window._cwIsAdmin){let se=L.querySelector(".cw-bau-edit");se&&(se.onclick=()=>j(k))}}let B=d.sort((k,L)=>{let D=w.includes(k.id),U=w.includes(L.id);return D===U?0:D?1:-1});if(B.length===0&&!y){let k=document.createElement("div");Object.assign(k.style,s.emptyState),k.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,C.appendChild(k)}let q=B.filter(k=>!w.includes(k.id)),P=B.filter(k=>w.includes(k.id));if(q.forEach(k=>C.appendChild(M(k,!1))),P.length>0){let k=document.createElement("div");Object.assign(k.style,s.historyDivider),k.innerHTML=`<span>Hist\xF3rico (${P.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let L=document.createElement("div");Object.assign(L.style,s.historyContainer),P.forEach(U=>L.appendChild(M(U,!0)));let D=!1;k.onclick=()=>{J.playClick(),D=!D,L.style.display=D?"flex":"none",k.querySelector("svg").style.transform=D?"rotate(180deg)":"rotate(0deg)"},C.appendChild(k),C.appendChild(L)}}function M(u,w){let d=document.createElement("div");Object.assign(d.style,w?s.cardHistory:s.card);let y=a[u.type]||a.info,B=document.createElement("div");Object.assign(B.style,s.cardHeader);let q=document.createElement("div");Object.assign(q.style,s.typeTag,{color:y.color,background:y.bg}),q.innerHTML=`${y.icon} <span>${u.type}</span>`;let P=document.createElement("span");if(Object.assign(P.style,s.dateTag),P.textContent=i(u.date),B.appendChild(q),w)B.appendChild(P);else{let I=document.createElement("button");I.className="cw-btn-interactive",Object.assign(I.style,s.dismissBtn),I.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',I.onmouseenter=()=>{I.style.color="#1e8e3e",I.style.background="#e6f4ea",I.style.borderColor="#1e8e3e"},I.onmouseleave=()=>{I.style.color="#5f6368",I.style.background="#fff",I.style.borderColor="rgba(0,0,0,0.1)"},I.onclick=$=>{$.stopPropagation(),J.playClick(),d.style.transform="translateX(20px)",d.style.opacity="0",setTimeout(()=>{let Q=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");Q.push(u.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(Q)),O(),T()},200)},B.appendChild(I)}let k=document.createElement("div");Object.assign(k.style,s.cardContent);let L=document.createElement("div");Object.assign(L.style,s.msgTitle),L.textContent=u.title;let D=document.createElement("div");Object.assign(D.style,s.msgBody),D.innerHTML=c(u.text);let U=document.createElement("div");if(Object.assign(U.style,s.msgMeta),U.innerHTML=`Publicado por <b>${u.author||"Sistema"}</b>`,w||(U.innerHTML+=` \u2022 ${i(u.date)}`),k.appendChild(L),k.appendChild(D),k.appendChild(U),d.appendChild(B),d.appendChild(k),window._cwIsAdmin){let I=document.createElement("div");I.className="cw-card-actions";let $=document.createElement("button");$.className="cw-action-btn edit",$.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',$.onclick=()=>j(u);let Q=document.createElement("button");Q.className="cw-action-btn delete",Q.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',Q.onclick=()=>v(u.id),I.appendChild($),I.appendChild(Q),d.appendChild(I)}return d}let N=ke.getCachedBroadcasts();N.length>0&&(Jt(N),O()),setTimeout(f,500),E(),n||(n=setInterval(E,mn));let _=document.createElement("div");Object.assign(_.style,at),_.className="no-drag",l.appendChild(_),it(l,_),document.body.appendChild(l);let R=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),W=Ue.some(u=>!R.includes(u.id));return{toggle:g,hasUnread:W}}function Po(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let e=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],t=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},o=document.createElement("div");Object.assign(o.style,n.overlay);let i=document.createElement("div");Object.assign(i.style,n.card);let s=document.createElement("div");Object.assign(s.style,n.icon);let a=document.createElement("div");Object.assign(a.style,n.title);let r=document.createElement("div");Object.assign(r.style,n.text);let c=document.createElement("div");Object.assign(c.style,n.dotsContainer);let l=document.createElement("div");Object.assign(l.style,n.btnContainer);let p=document.createElement("button");p.textContent="Pular",Object.assign(p.style,n.btn,n.btnSkip),p.onmouseover=()=>p.style.color="#202124",p.onmouseout=()=>p.style.color="#5f6368";let g=document.createElement("button");g.textContent="Pr\xF3ximo",Object.assign(g.style,n.btn,n.btnNext),g.onmouseover=()=>g.style.transform="scale(1.05)",g.onmouseout=()=>g.style.transform="scale(1)",l.appendChild(p),l.appendChild(g),i.appendChild(s),i.appendChild(a),i.appendChild(r),i.appendChild(c),i.appendChild(l),o.appendChild(i),document.body.appendChild(o);function b(x){let f=e[x];s.textContent=f.icon,a.textContent=f.title,r.textContent=f.text,c.innerHTML="",e.forEach((A,S)=>{let j=document.createElement("div");Object.assign(j.style,n.dot),S===x&&Object.assign(j.style,n.dotActive),c.appendChild(j)}),f.isLast?(p.style.display="none",g.textContent="Come\xE7ar \u{1F680}",g.style.width="100%"):(p.style.display="block",g.textContent="Pr\xF3ximo",g.style.width="auto")}function h(){localStorage.setItem("cw_onboarding_seen_v1","true"),o.style.opacity="0",i.style.transform="translateY(20px)",setTimeout(()=>o.remove(),400),J.playSuccess(),Y("Tudo pronto! Use o menu flutuante.")}g.onclick=()=>{J.playClick(),t<e.length-1?(t++,b(t)):h()},p.onclick=()=>{confirm("Pular o tutorial?")&&h()},b(0),requestAnimationFrame(()=>{o.style.opacity="1",i.style.transform="translateY(0)"})}var jo={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function Ho(e){let t=localStorage.getItem("cw_last_version");if(!t){localStorage.setItem("cw_last_version",e);return}t!==e&&gn(e)}function gn(e){let t=jo.slides,n=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},i=document.createElement("div");Object.assign(i.style,o.overlay);let s=document.createElement("div");Object.assign(s.style,o.card);let a=document.createElement("div");Object.assign(a.style,o.badge),a.textContent=`Atualiza\xE7\xE3o ${e}`;let r=document.createElement("div");Object.assign(r.style,o.icon);let c=document.createElement("div");Object.assign(c.style,o.title);let l=document.createElement("div");Object.assign(l.style,o.text);let p=document.createElement("div");Object.assign(p.style,o.dotsContainer);let g=document.createElement("button");Object.assign(g.style,o.btn),g.onmouseover=()=>g.style.transform="scale(1.02)",g.onmouseout=()=>g.style.transform="scale(1)",s.appendChild(a),s.appendChild(r),s.appendChild(c),s.appendChild(l),s.appendChild(p),s.appendChild(g),i.appendChild(s),document.body.appendChild(i);function b(x){let f=t[x];r.textContent=f.icon,c.textContent=f.title,l.textContent=f.text,p.innerHTML="",t.forEach((A,S)=>{let j=document.createElement("div");Object.assign(j.style,o.dot),S===x&&Object.assign(j.style,o.dotActive),p.appendChild(j)}),x===t.length-1?g.textContent="Entendi, vamos l\xE1! \u{1F44D}":g.textContent="Pr\xF3ximo"}function h(){localStorage.setItem("cw_last_version",e),i.style.opacity="0",s.style.transform="translateY(30px)",setTimeout(()=>i.remove(),400),J.playSuccess(),Y(`TechSol atualizado para ${e}!`)}g.onclick=()=>{J.playClick(),n<t.length-1?(n++,b(n)):h()},b(0),requestAnimationFrame(()=>{i.style.opacity="1",s.style.transform="translateY(0)"})}var $o="cw_timezone_pinned",Qt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],bn=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function Vo(){let e="v2.2 Pro",t=!1,n=null,o="mx",i=JSON.parse(localStorage.getItem($o)||"[]"),s="",a="all",r=new Date;r.setHours(14,0,0,0);let c={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},l={container:{display:"flex",flexDirection:"column",height:"100%",background:c.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:c.surface,borderBottom:`1px solid ${c.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:c.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:c.primary,borderBottomColor:c.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:c.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:c.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${c.border}`,background:c.surface,color:c.textSub,transition:"all 0.2s"},chipActive:{background:c.primaryBg,color:c.primary,borderColor:c.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:c.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${c.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:c.surface,border:`1px solid ${c.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:c.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},p=document.createElement("div");p.id="timezone-popup",p.classList.add("cw-module-window"),Object.assign(p.style,qe,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let b=Le(p,"Time Zone Traveler",e,"Monitoramento global e planejamento de chamadas.",{popup:p},()=>w());p.appendChild(b);let h=document.createElement("div");Object.assign(h.style,l.container),p.appendChild(h);let x=document.createElement("div");Object.assign(x.style,l.tabHeader);let f=document.createElement("div");f.textContent="Monitoramento",Object.assign(f.style,l.tabBtn,l.tabActive);let A=document.createElement("div");A.textContent="Planejador",Object.assign(A.style,l.tabBtn),x.appendChild(f),x.appendChild(A),h.appendChild(x);let S=document.createElement("div");Object.assign(S.style,l.toolbar);let j=document.createElement("div");Object.assign(j.style,l.searchInputWrapper);let H=document.createElement("div");H.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(H.style,l.searchIcon);let z=document.createElement("input");z.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(z.style,l.searchInput),z.onfocus=()=>{z.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",z.style.borderColor="rgba(26,115,232,0.3)"},z.onblur=()=>{z.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",z.style.borderColor="transparent"},z.oninput=d=>{s=d.target.value.toLowerCase(),_()},j.appendChild(H),j.appendChild(z),S.appendChild(j);let v=document.createElement("div");Object.assign(v.style,l.chipsRow),bn.forEach(d=>{let y=document.createElement("div");y.textContent=d.label,y.id=`tz-filter-${d.id}`,Object.assign(y.style,l.chip),d.id===a&&Object.assign(y.style,l.chipActive),y.onclick=()=>{J.playClick(),a=d.id,Array.from(v.children).forEach(B=>{Object.assign(B.style,l.chip)}),Object.assign(y.style,l.chipActive),_()},v.appendChild(y)}),S.appendChild(v),h.appendChild(S);let C=document.createElement("div");Object.assign(C.style,l.listContainer);let E=document.createElement("style");E.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",h.appendChild(E);let T=document.createElement("div");Object.assign(T.style,l.plannerWrapper,{display:"none"}),h.appendChild(C),h.appendChild(T),f.onclick=()=>O("live"),A.onclick=()=>O("plan");function O(d){J.playClick(),d==="live"?(Object.assign(f.style,l.tabActive),Object.assign(A.style,l.tabBtn),A.style.borderBottomColor="transparent",C.style.display="flex",S.style.display="flex",T.style.display="none",W()):(Object.assign(A.style,l.tabActive),Object.assign(f.style,l.tabBtn),f.style.borderBottomColor="transparent",T.style.display="flex",C.style.display="none",S.style.display="none",u(),R())}function M(d){return d>=9&&d<17?{color:c.success,bg:c.successBg,label:"Aberto",icon:"\u{1F7E2}"}:d>=8&&d<9?{color:c.warning,bg:c.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:d>=17&&d<19?{color:c.warning,bg:c.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:c.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function N(d){i.includes(d)?i=i.filter(y=>y!==d):i.push(d),localStorage.setItem($o,JSON.stringify(i)),_(),J.playClick()}function _(){C.innerHTML="";let d=new Date,y=Qt.filter(q=>{let P=q.name.toLowerCase().includes(s)||q.label.toLowerCase().includes(s),k=a==="all"||q.region===a;return P&&k});if(y.sort((q,P)=>{let k=i.includes(q.id),L=i.includes(P.id);return k&&!L?-1:!k&&L?1:q.name.localeCompare(P.name)}),y.length===0){C.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}y.forEach(q=>{let P=i.includes(q.id),k=d.toLocaleTimeString("pt-BR",{timeZone:q.zone,hour:"2-digit",minute:"2-digit"}),L=parseInt(k.split(":")[0]),D=M(L),U=L<6||L>18,I=document.createElement("div");Object.assign(I.style,l.hubCard),P&&Object.assign(I.style,l.hubCardPinned);let $=P?"\u2605":"\u2606",Q=P?"#F9AB00":"#DADCE0";I.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${Q}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${$}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${q.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${c.text}; letter-spacing:-0.2px;">${q.name}</div>
                        <div style="font-size:12px; color:${c.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${U?"\u{1F319}":"\u2600\uFE0F"} ${q.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${c.text}; font-family:'Google Sans', sans-serif;">${k}</div>
                    <div style="font-size:11px; font-weight:600; color:${D.color}; background:${D.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${D.label}
                    </div>
                </div>
            `,I.onmouseenter=()=>{I.style.transform="translateY(-2px)",I.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},I.onmouseleave=()=>{I.style.transform="translateY(0)",I.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let be=I.querySelector(".cw-pin-btn");be.onmouseenter=()=>{be.style.backgroundColor="#F1F3F4"},be.onmouseleave=()=>{be.style.backgroundColor="transparent"},be.onclick=ge=>{ge.stopPropagation(),N(q.id)},I.onclick=()=>{o=q.id,O("plan")},C.appendChild(I)});let B=document.createElement("div");B.style.height="20px",B.style.width="100%",C.appendChild(B)}function R(){T.innerHTML="";let d=document.createElement("div"),y=document.createElement("label");y.textContent="Onde est\xE1 o cliente?",y.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let B=document.createElement("select");Object.assign(B.style,At),B.style.padding="14px",[...Qt].sort((de,ce)=>de.name.localeCompare(ce.name)).forEach(de=>{let ce=document.createElement("option");ce.value=de.id,ce.textContent=`${de.flag} ${de.name} (${de.zone})`,de.id===o&&(ce.selected=!0),B.appendChild(ce)}),B.onchange=de=>{o=de.target.value,ee(),J.playClick()},d.appendChild(y),d.appendChild(B),T.appendChild(d);let P=document.createElement("div");Object.assign(P.style,l.timeComparisonRow);let k=document.createElement("div");Object.assign(k.style,l.timeCard),k.style.backgroundColor="#F8FAFF",k.style.borderColor="#E8F0FE",k.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let L=document.createElement("div");Object.assign(L.style,l.timeCard),L.style.backgroundColor="#FFF8E1",L.style.borderColor="#FEF7E0",L.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,P.appendChild(k),P.appendChild(L),T.appendChild(P);let D=document.createElement("div");D.id="cw-planner-status",Object.assign(D.style,l.statusBadge),T.appendChild(D);let U=document.createElement("div");Object.assign(U.style,{padding:"0 4px",marginTop:"12px"});let I=document.createElement("div");I.textContent="Arraste para simular o hor\xE1rio:",I.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let $=document.createElement("div");Object.assign($.style,l.timelineContainer);let Q=document.createElement("div");Object.assign(Q.style,l.timelineTrack);let be=document.createElement("div");Object.assign(be.style,l.dayZone),Q.appendChild(be);let ge=document.createElement("input");ge.type="range",ge.min="0",ge.max="1439",ge.step="15",ge.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let Ee=document.createElement("div");Ee.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",Ee.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",$.appendChild(Q),$.appendChild(ge),$.appendChild(Ee),U.appendChild(I),U.appendChild($),T.appendChild(U);let se=k.querySelector("#cw-time-input-br"),ye=L.querySelector("#cw-time-display-client"),pe=L.querySelector("#cw-client-label");function ee(){let de=Qt.find(Ne=>Ne.id===o);pe.textContent=`${de.flag} ${de.label} (${de.zone})`;let ce=r.getHours(),Re=r.getMinutes(),Ie=`${String(ce).padStart(2,"0")}:${String(Re).padStart(2,"0")}`;se.value=Ie,ge.value=ce*60+Re;let we=r.toLocaleTimeString("pt-BR",{timeZone:de.zone,hour:"2-digit",minute:"2-digit"});ye.textContent=we;let _e=parseInt(we.split(":")[0]);_e>=9&&_e<17?(D.style.background=c.successBg,D.style.color=c.success,D.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):_e>=8&&_e<9||_e>=17&&_e<19?(D.style.background=c.warningBg,D.style.color=c.warning,D.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(D.style.background=c.errorBg,D.style.color=c.error,D.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}ge.oninput=de=>{let ce=parseInt(de.target.value);r.setHours(Math.floor(ce/60)),r.setMinutes(ce%60),ee()},se.oninput=de=>{let[ce,Re]=de.target.value.split(":");ce&&Re&&(r.setHours(parseInt(ce)),r.setMinutes(parseInt(Re)),ee())},ee()}function W(){_(),n||(n=setInterval(_,6e4))}function u(){n&&(clearInterval(n),n=null)}function w(){t=!t,Me(t,p,"cw-btn-timezone"),t?O("live"):u()}return document.body.appendChild(p),w}function fn(){if(window.techSolInitialized){Ht();return}window.techSolInitialized=!0;let e="v5.1";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{go();try{J.initGlobalListeners(),J.playStartup()}catch(r){console.warn("\xC1udio bloqueado:",r)}ke.fetchTips(),Ht();let t=No(),n=Ro(),o=Do(),i=Bo(),s=Vo(),a=Go();To({toggleNotes:t,toggleEmail:n,toggleScript:o,toggleLinks:i,toggleTimezone:s,broadcastControl:a}),setTimeout(()=>{ke.logEvent("App","Start","Session Start"),Po(),setTimeout(()=>{Ho(e)},500)},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),Y("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}fn();})();
