(()=>{var xa=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",no="AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg",va=xa?`https://script.google.com/a/macros/google.com/s/${no}/dev`:`https://script.google.com/a/macros/google.com/s/${no}/exec`,Lt="cw_data_broadcast",io="cw_data_tips",ya=["Processando...","Mantenha o foco!","Aguarde..."];function qe(e,t={}){return new Promise((o,n)=>{let a="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script"),r=setTimeout(()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[a],n(new Error("Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)"))},15e3);window[a]=u=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[a],o(u)};let s=Object.keys(t).map(u=>encodeURIComponent(u)+"="+encodeURIComponent(t[u])).join("&"),c=`${va}?op=${e}&callback=${a}&t=${Date.now()}&${s}`;i.src=c,i.onerror=()=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[a],n(new Error("Erro de conex\xE3o JSONP."))},document.body.appendChild(i)})}var me={fetchTips:async()=>{try{let e=await qe("tips");e?.tips&&localStorage.setItem(io,JSON.stringify(e.tips))}catch(e){console.warn("Tips offline",e)}},fetchData:async()=>{try{let e=await qe("broadcast");if(e?.broadcast)return localStorage.setItem(Lt,JSON.stringify(e.broadcast)),e}catch(e){console.warn("Broadcast offline",e)}return{broadcast:JSON.parse(localStorage.getItem(Lt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Lt)||"[]"),getRandomTip:()=>{let e=ya,t=localStorage.getItem(io);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},sendBroadcast:async e=>{let t={...e,date:new Date().toISOString(),id:Date.now().toString()};return await me._performOp("new_broadcast",t)},updateBroadcast:async(e,t)=>{let o={id:e,...t};return await me._performOp("update_broadcast",o)},deleteBroadcast:async e=>await me._performOp("delete_broadcast",{id:e}),_performOp:async(e,t)=>{try{console.log(`Executando ${e}...`,t);let o=await qe(e,t);return o&&o.status==="success"?(console.log("Sucesso:",e),!0):(console.warn("Falha:",o),!1)}catch(o){return console.error("Erro JSONP:",o),!1}},logEvent:(e,t,o="",n=null)=>{try{let a="anon";try{let r=ye();r&&(a=r.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:a,version:"v5.1",category:e,action:t,label:o,value:n||""};qe("log",i).catch(r=>{})}catch(a){console.warn("Analytics error",a)}},logUsage:()=>{},sendBAUEscalation:async(e,t)=>{let o={...e,user:t,date:new Date().toISOString()};try{console.log("Executando create_bau...",o);let n=await qe("create_bau",o);if(n&&n.status==="success")return console.log("Sucesso: create_bau"),n;throw new Error(n?.error||n?.message||"Falha na opera\xE7\xE3o BAU")}catch(n){throw console.error("Erro JSONP (BAU):",n),n}},readAgentBAU:async()=>{let e=ye();if(!e)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",e);let t=await qe("read_agent_bau",{user:e});if(t&&t.status==="success"&&Array.isArray(t.cases))return t.cases;if(t&&t.status==="error")throw new Error(t.message||"Erro retornado pela API de leitura");return[]}catch(t){throw console.error("Erro ao buscar casos BAU:",t),t}},updateBAUStatus:async(e,t,o={})=>{let n=ye();try{console.log(`Atualizando status BAU ${e} para ${t}...`);let a=await qe("update_bau_status",{id:e,status:t,user:n,...o});return a&&a.status==="success"}catch(a){return console.error("Erro ao atualizar status BAU:",a),!1}},updateBAUEscalation:async(e,t)=>{let o=ye(),n={...t,id:e,user:o,date_edited:new Date().toISOString()};try{console.log(`Executando update_bau para ${e}...`,n);let a=await qe("update_bau",n);if(a&&a.status==="success")return console.log("Sucesso: update_bau"),a;throw new Error(a?.error||a?.message||"Falha na atualiza\xE7\xE3o BAU")}catch(a){throw console.error("Erro JSONP (Update BAU):",a),a}},fetchUserProfile:async e=>{try{console.log(`Buscando perfil para: ${e}`);let t=await qe("get_user_profile",{ldap:e});return console.log("Resposta bruta do servidor:",t),t&&t.status==="success"&&t.profile?t.profile:null}catch(t){return console.error("Erro ao buscar perfil:",t),null}},getUserSnippets:async e=>{try{return console.log("Buscando snippets para:",e),await qe("get_user_snippets",{user:e})}catch(t){return console.error("Erro ao carregar snippets:",t),{status:"error",snippets:[]}}},saveSnippet:async(e,t)=>{let o={id:e.id,type:e.type,title:e.title,content:e.content,subject:e.subject||"",isCode:e.isCode,isRich:e.isRich,user:t};try{console.log("Salvando snippet na nuvem:",o);let n=await qe("save_snippet",o);return n&&n.status==="success"}catch(n){return console.error("Erro ao salvar snippet:",n),!1}},deleteSnippet:async(e,t)=>{try{console.log(`Deletando snippet ${e}...`);let o=await qe("delete_snippet",{id:e,user:t});return o&&o.status==="success"}catch(o){return console.error("Erro ao deletar snippet:",o),!1}}},ro=me.sendBAUEscalation,so=me.readAgentBAU,fn=me.updateBAUStatus,co=me.updateBAUEscalation,pt=me.fetchUserProfile,hn=me.getUserSnippets,xn=me.saveSnippet,vn=me.deleteSnippet;var ie=e=>new Promise(t=>setTimeout(t,e));function Ae(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>e.dispatchEvent(new MouseEvent(o,t)))}function Je(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}function Ue(e,t,o){return Math.max(t,Math.min(e,o))}var ut=0;function ge(){ut++,document.body.style.overflow="hidden"}function be(){ut=Math.max(0,ut-1),ut===0&&(document.body.style.overflow="")}var lo=!1;function wa(){if(lo||document.getElementById("cw-filled-check-styles"))return;let e=document.createElement("style");e.id="cw-filled-check-styles",e.textContent=`
        .cw-dopamine-field.filled {
            background-color: #F0FDF4 !important;
            border-color: #86EFAC !important;
            color: #166534;
            padding-right: 36px !important;
        }
        .cw-dopamine-check {
            position: absolute; right: 10px; top: 50%; transform: translateY(-50%) scale(0.5);
            color: #16A34A; width: 16px; height: 16px;
            opacity: 0; pointer-events: none;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .cw-dopamine-check.show { opacity: 1; transform: translateY(-50%) scale(1); }
        @media (prefers-reduced-motion: reduce) {
            .cw-dopamine-check { transition: opacity 0.15s ease !important; }
        }
    `,document.head.appendChild(e),lo=!0}var po=!1;function Sa(){if(po||document.getElementById("cw-empty-state-styles"))return;let e=document.createElement("style");e.id="cw-empty-state-styles",e.textContent=`
        .cw-empty-illustrated { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 32px 20px; }
        .cw-empty-illustrated-badge { border-radius: 50%; background: #F8F9FA; display: flex; align-items: center; justify-content: center; color: #9AA0A6; flex-shrink: 0; }
        .cw-empty-illustrated-badge svg { width: 44%; height: 44%; }
        .cw-empty-illustrated-title { font-family: 'Google Sans', Roboto, sans-serif; font-size: 15px; font-weight: 600; color: #202124; }
        .cw-empty-illustrated-subtitle { font-size: 12px; color: #5F6368; line-height: 1.5; max-width: 240px; }
    `,document.head.appendChild(e),po=!0}function tt({icon:e,title:t,subtitle:o="",size:n=88}){Sa();let a=document.createElement("div");return a.className="cw-empty-illustrated",a.innerHTML=`
        <div class="cw-empty-illustrated-badge" style="width:${n}px;height:${n}px;">${e}</div>
        <div class="cw-empty-illustrated-title">${t}</div>
        ${o?`<div class="cw-empty-illustrated-subtitle">${o}</div>`:""}
    `,a}function mt(e,t){e.addEventListener("keydown",o=>{if(o.key!=="ArrowDown"&&o.key!=="ArrowUp")return;let n=document.activeElement;if(!n||!n.matches(t))return;let a=Array.from(e.querySelectorAll(t)).filter(s=>s.offsetParent!==null),i=a.indexOf(n);if(i===-1)return;o.preventDefault();let r=o.key==="ArrowDown"?Math.min(i+1,a.length-1):Math.max(i-1,0);a[r].focus()})}var uo=!1;function Ea(){if(uo||document.getElementById("cw-pending-field-styles"))return;let e=document.createElement("style");e.id="cw-pending-field-styles",e.textContent=`
        @keyframes cwPendingPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(251, 188, 5, 0.45); }
            50% { box-shadow: 0 0 0 6px rgba(251, 188, 5, 0); }
        }
        .cw-quicklaunch-pending {
            border-color: #FBBC05 !important;
            animation: cwPendingPulse 1.1s ease-out 2;
        }
        @media (prefers-reduced-motion: reduce) {
            .cw-quicklaunch-pending { animation: none !important; }
        }
    `,document.head.appendChild(e),uo=!0}function mo(e,{duration:t=2400}={}){e&&(Ea(),e.classList.add("cw-quicklaunch-pending"),e.scrollIntoView({behavior:"smooth",block:"center"}),e.focus({preventScroll:!0}),setTimeout(()=>e.classList.remove("cw-quicklaunch-pending"),t))}function gt(e,{minLength:t=2}={}){wa();let o=e.parentElement;o&&getComputedStyle(o).position==="static"&&(o.style.position="relative"),e.classList.add("cw-dopamine-field");let n=document.createElement("span");n.className="cw-dopamine-check",n.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',e.insertAdjacentElement("afterend",n);let a=()=>{let i=e.value.trim().length>=t;e.classList.toggle("filled",i),n.classList.toggle("show",i)};e.addEventListener("input",a),a()}var bt="",ot="",qt=null;async function Nt(){try{let e=document.querySelector('material-button[debug-id="toggle-translation-button"]');if(e){let t=e.textContent.toLowerCase();(t.includes("show original")||t.includes("mostrar original"))&&(console.log("TechSol: Tradu\xE7\xE3o detectada. Revertendo para o idioma original..."),e.click(),await ie(400))}}catch(e){console.warn("TechSol: Erro ao tentar reverter tradu\xE7\xE3o:",e)}}async function at(){if(bt&&ot)return bt;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await ie(150);let t="Consultor",o=document.querySelector("profile-details .name");if(o)t=o.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let a=document.querySelector("profile-details img");if(a&&a.src.includes("/photos/")){let i=a.src.match(/\/photos\/([^\?]+)/)[1];t=i.charAt(0).toUpperCase()+i.slice(1)}}let n=document.querySelector("profile-details .email");return n&&(ot=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",ot)),e.click(),document.body.click(),bt=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function nt(){return bt||"Consultor"}function ye(){return ot||null}function go(e){let t=new Date,o=t.getHours(),n=t.getDay(),a="Ol\xE1",i="";o>=5&&o<12?(a="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(a="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(a="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let r=[];o>=0&&o<5?r=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?n===1?r=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?r=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:r=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?r=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:r=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(r=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let s=r[Math.floor(Math.random()*r.length)];return{prefix:`${a},`,name:e,suffix:s,icon:i,isFriday:n===5}}async function ka(){try{let t=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!t)return null;let o=t.parentElement,n=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');n&&(n.click(),await ie(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(r=>{let s=r.innerText.trim();return s.includes("@")&&!s.includes("Is this:")&&s.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function Aa(){try{let e=document.querySelector('material-input[debug-id="account-id-input"]');if(e){let t=e.querySelector("input");if(t){let o=t.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(e){console.warn("Erro ao capturar email interno:",e)}return null}function Ca(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.includes("Google Ads External Customer ID")||a.textContent.includes("Customer ID"));if(t){let a=t.closest("home-data-item")||t.parentElement;if(a){let i=a.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let n=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(n)return n[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"N/A"}function Ta(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Account Manager")||o.textContent.includes("AM Name")||o.textContent.includes("Sales Rep"));if(t){let o=t.closest(".data-pair")||t.parentElement,n=o.querySelector(".data-pair-content")||o.nextElementSibling;if(n)return n.textContent.trim()}}catch(e){console.warn("Erro ao capturar AM:",e)}return null}function Fa(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("customer time zone")||o.textContent.toLowerCase().includes("time zone")||o.textContent.toLowerCase().includes("timezone"));if(t){let o=t.parentElement;if(o){let n=o.querySelector("sanitized-content");if(n&&n.textContent.trim())return n.textContent.trim();let a=o.querySelector(".data-pair-content")||t.nextElementSibling;if(a&&a.textContent.trim()){let i=a.textContent.trim();if(i&&i!=="---"&&i!=="N/A")return i}}}}catch(e){console.warn("Erro ao capturar Timezone:",e)}return null}async function Ia(){let e="---";try{e=window.location.href.split("/").pop()}catch(t){console.warn("Falha URL:",t)}return e}function La(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("sales program")||o.textContent.toLowerCase().trim()==="program"||o.textContent.toLowerCase().includes("programa"));if(t){let o=t.closest(".data-pair")||t.parentElement,n=o.querySelector('sanitized-content ng-template[debug-id="html-value"]')||o.querySelector("sanitized-content");if(n)return n.textContent.trim();let a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(e){console.warn("Erro ao capturar Sales Program:",e)}return""}function qa(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Language")||o.textContent.includes("Idioma"));if(t){let o=t.closest(".data-pair")||t.parentElement,n=o.querySelector(".data-pair-content")||o.nextElementSibling;if(n)return n.textContent.trim()}}catch(e){console.warn("Erro ao capturar Idioma:",e)}return"N/A"}function Na(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.includes("Speakeasy ID")||a.textContent.includes("SE ID"));if(t){let a=t.closest(".data-pair")||t.parentElement,i=a.querySelector(".data-pair-content")||a.nextElementSibling;if(i&&i.textContent.trim())return i.textContent.trim()}let o=/Speakeasy.*?(P\d{15,25})/i,n=Array.from(document.querySelectorAll("textarea, .preview, .message-body, .notes-content"));for(let a=n.length-1;a>=0;a--){let r=(n[a].value||n[a].innerText||"").match(o);if(r&&r[1])return r[1]}}catch(e){console.warn("Erro ao capturar SE ID:",e)}return"N/A"}async function Ne(){await Nt(),ot||await at();let e="Cliente",t="";try{let E=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(E&&E.nextElementSibling){let w=E.nextElementSibling.innerText.trim();w&&(e=w)}}catch(f){console.warn("Falha Nome:",f)}try{let E=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(E&&E.nextElementSibling){let w=E.nextElementSibling.innerText.trim();w&&(t=w)}}catch(f){console.warn("Falha URL:",f)}let o=await ka(),n=Aa(),a=Ca(),i=Ta(),r=Fa(),s=await Ia(),c=La(),u=qa(),d=Na(),h=ye();if(h&&!qt){let f=h.split("@")[0];try{qt=await pt(f)}catch(E){console.warn("Falha ao carregar perfil do usu\xE1rio:",E)}}return{advertiserName:e,websiteUrl:t,clientEmail:o,internalEmail:n,cid:a,amName:i,timezone:r,agentName:nt(),agentEmail:ye(),caseId:s,userProfile:qt,advName:e,site:t,website:t,email:o,salesProgram:c,language:u,seId:d}}var Ve=null,Ot=null,it=null,Mt=0,_e=.3;var Oe=localStorage.getItem("cw_sounds_muted")==="true";function Be(){if(!Ve){let e=window.AudioContext||window.webkitAudioContext;e&&(Ve=new e)}return Ve&&Ve.state==="suspended"&&Ve.resume(),Ve}function bo(e){if(Ot)return Ot;let t=e.sampleRate*2,o=e.createBuffer(1,t,e.sampleRate),n=o.getChannelData(0);for(let a=0;a<t;a++)n[a]=Math.random()*2-1;return Ot=o,o}var k={setMuted:e=>{Oe=e,localStorage.setItem("cw_sounds_muted",e)},isMuted:()=>Oe,playClick:()=>{if(Oe)return;let e=Be();if(!e)return;let t=e.currentTime,o=e.createBufferSource();o.buffer=bo(e);let n=e.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let a=e.createGain();a.gain.setValueAtTime(_e*.8,t),a.gain.exponentialRampToValueAtTime(.001,t+.015),o.connect(n),n.connect(a),a.connect(e.destination),o.start(t),o.stop(t+.02)},playHover:()=>{if(Oe)return;let e=Be();if(!e)return;let t=e.currentTime,o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,t);let n=e.createGain();n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(_e*.1,t+.005),n.gain.linearRampToValueAtTime(0,t+.02),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.03)},playSuccess:()=>{if(Oe)return;let e=Be();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((n,a)=>{let i=e.createOscillator(),r=e.createGain();i.type="sine",i.frequency.value=n,r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(_e*.6,t+.05),r.gain.exponentialRampToValueAtTime(.001,t+.6),i.connect(r),r.connect(e.destination),i.start(t),i.stop(t+.7)})},playGenieOpen:()=>{if(Oe)return;let e=Be();if(!e)return;let t=e.currentTime,o=e.createBufferSource();o.buffer=bo(e);let n=e.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,t),n.frequency.exponentialRampToValueAtTime(800,t+.2);let a=e.createGain();a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(_e*.5,t+.05),a.gain.linearRampToValueAtTime(0,t+.25),o.connect(n),n.connect(a),a.connect(e.destination),o.start(t),o.stop(t+.3)},playError:()=>{if(Oe)return;let e=Be();if(!e)return;let t=e.currentTime,o=e.createOscillator(),n=e.createGain();o.type="triangle",o.frequency.setValueAtTime(120,t),o.frequency.exponentialRampToValueAtTime(80,t+.1),n.gain.setValueAtTime(_e,t),n.gain.exponentialRampToValueAtTime(.001,t+.15),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.2)},playStartup:()=>{if(Oe)return;let e=Be();if(!e)return;let t=e.currentTime,o=.12,n=e.createOscillator(),a=e.createGain(),i=e.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,t),n.frequency.exponentialRampToValueAtTime(50,t+.1),i.type="lowpass",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(100,t+.1),a.gain.setValueAtTime(_e*4,t),a.gain.exponentialRampToValueAtTime(.001,t+.1),n.connect(i),i.connect(a),a.connect(e.destination),n.start(t),n.stop(t+.12);let r=e.createOscillator(),s=e.createGain();r.type="sine",r.frequency.setValueAtTime(150,t),r.frequency.exponentialRampToValueAtTime(50,t+.15),s.gain.setValueAtTime(_e*1.5,t),s.gain.exponentialRampToValueAtTime(.001,t+.15),r.connect(s),s.connect(e.destination),r.start(t),r.stop(t+.15),[55,55.4,110.5].forEach(u=>{let d=e.createOscillator(),h=e.createGain(),f=e.createBiquadFilter();d.type="sawtooth",d.frequency.value=u,f.type="lowpass",f.frequency.setValueAtTime(30,t),f.frequency.linearRampToValueAtTime(900,t+o+.2),f.frequency.exponentialRampToValueAtTime(40,t+3),h.gain.setValueAtTime(0,t),h.gain.linearRampToValueAtTime(_e*.6,t+o+.1),h.gain.exponentialRampToValueAtTime(.001,t+3.5),d.connect(f),f.connect(h),h.connect(e.destination),d.start(t),d.stop(t+3.6)})},playNotification:()=>{if(Oe)return;let e=Be();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let a=e.createOscillator(),i=e.createGain();a.type="sine",a.frequency.setValueAtTime(n.freq,t),i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(_e*n.vol,t+.004),i.gain.exponentialRampToValueAtTime(.001,t+n.dur),a.connect(i),i.connect(e.destination),a.start(t),a.stop(t+n.dur+.1)})},playReady:()=>{if(Oe)return;let e=Be();if(!e)return;let t=e.currentTime;[{freq:587.33,at:0,dur:.2,vol:.26},{freq:880,at:.09,dur:.3,vol:.3},{freq:1760,at:.09,dur:.26,vol:.08}].forEach(n=>{let a=e.createOscillator(),i=e.createGain();a.type="sine",a.frequency.value=n.freq;let r=t+n.at;i.gain.setValueAtTime(0,r),i.gain.linearRampToValueAtTime(_e*n.vol,r+.02),i.gain.exponentialRampToValueAtTime(.001,r+n.dur),a.connect(i),i.connect(e.destination),a.start(r),a.stop(r+n.dur+.05)})},startThinking:()=>{if(Oe)return;let e=Be();if(!e||it)return;let t=[523.25,659.25,783.99];Mt=0;let o=()=>{if(Oe)return;let n=e.currentTime,a=e.createOscillator(),i=e.createGain();a.type="sine",a.frequency.setValueAtTime(t[Mt%t.length],n),i.gain.setValueAtTime(0,n),i.gain.linearRampToValueAtTime(_e*.15,n+.02),i.gain.exponentialRampToValueAtTime(.001,n+.22),a.connect(i),i.connect(e.destination),a.start(n),a.stop(n+.25),Mt++};o(),it=setInterval(o,370)},stopThinking:()=>{it&&(clearInterval(it),it=null)},playSwoosh:()=>{k.playGenieOpen()},playReset:()=>{k.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",o=>{if(!Ve)return;let n=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(o.relatedTarget))return;let a=Date.now();a-e<t||(k.playHover(),e=a)},{passive:!0})}};var fo=1e4;function xo(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
        :root {
            --cw-primary: #1a73e8;
            --cw-primary-hover: #1557b0;
            --cw-surface: #ffffff;
            --cw-surface-glass: rgba(255, 255, 255, 0.95);
            --cw-border: #dadce0;
            --cw-text: #202124;
            --cw-text-sub: #5f6368;
            --cw-ease-elastic: cubic-bezier(0.25, 0.8, 0.25, 1);

            /* --- TOKENS DE MOVIMENTO --- */
            /* 4 curvas can\xF4nicas, escolhidas a partir das que j\xE1 dominavam o
               projeto (por contagem de uso) - n\xE3o curvas novas. O resto do
               c\xF3digo tinha ~15 variantes cubic-bezier distintas, v\xE1rias delas
               diferindo por 1 d\xEDgito sem nenhuma escolha deliberada por tr\xE1s
               (ex: 0.2,0.8,0.2,1 vs 0.25,0.8,0.25,1, usadas quase o mesmo
               n\xFAmero de vezes em arquivos que nunca se falaram). Todo c\xF3digo
               novo deveria escolher entre essas 4 em vez de inventar mais uma. */
            --cw-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);      /* Material padr\xE3o - j\xE1 a curva mais usada do projeto */
            --cw-ease-decelerate: cubic-bezier(0.19, 1, 0.22, 1);  /* Entrada - a curva do genie abrindo */
            --cw-ease-accelerate: cubic-bezier(0.5, 0, 1, 1);      /* Sa\xEDda - a curva do genie fechando */
            --cw-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Bounce/overshoot - j\xE1 \xE9 o EASE de notes-styles.js */
        }

        /* RESET DE BOX MODEL (Escopado s\xF3 ao app, nunca ao CRM host) */
        /* Sem isso, qualquer elemento com width + padding "estoura" o container,
           porque o padding some do c\xE1lculo em vez de ser inclu\xEDdo na largura. */
        .cw-pill, .cw-pill *,
        .cw-module-window, .cw-module-window * {
            box-sizing: border-box;
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

/* Sistema de di\xE1logo (alertDialog/confirmDialog/promptDialog): \xE9 o ponto de
   maior consequ\xEAncia do app - toda a\xE7\xE3o destrutiva passa por aqui, v\xE1rias
   vezes por turno - e n\xE3o tinha nenhuma prote\xE7\xE3o de reduced-motion, ao
   contr\xE1rio da p\xEDlula (a mais bem coberta do projeto). O overlay usa a
   classe .cw-dialog-overlay (createBaseOverlay em utils.js); a caixa do
   di\xE1logo \xE9 sempre o filho direto dela. */
@media (prefers-reduced-motion: reduce) {
    .cw-dialog-overlay { transition: opacity 0.15s ease !important; }
    .cw-dialog-overlay > div { transition: opacity 0.15s ease !important; transform: none !important; }
}
    `,document.head.appendChild(t)}function Y(e,t={}){let o=document.createElement("div"),n=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s var(--cw-ease-spring)",pointerEvents:"none"}),o.textContent=e,document.body.appendChild(o),t.error?k.playError():k.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},t.duration||4e3)}function vo(e,t=null){let o=0,n=0,a=0,i=0,r=t||e;r.style.cursor="grab",r.onmousedown=s;function s(d){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(d.target.tagName)||d.target.closest(".no-drag"))return;d=d||window.event,r.style.cursor="grabbing",e.style.transition="none";let h=e.getBoundingClientRect();e.style.transform="none",e.style.left=h.left+"px",e.style.top=h.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",fo++,e.style.zIndex=fo,a=d.clientX,i=d.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=u,document.onmousemove=c}function c(d){d=d||window.event,d.preventDefault(),o=a-d.clientX,n=i-d.clientY,a=d.clientX,i=d.clientY;let h=e.offsetTop-n,f=e.offsetLeft-o,E=16,w=window.innerWidth,v=window.innerHeight,x=e.offsetWidth,z=e.offsetHeight;f=Ue(f,E,w-x-E),h=Ue(h,E,v-z-E),e.style.top=h+"px",e.style.left=f+"px"}function u(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s var(--cw-ease-decelerate), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var Ce={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var _t={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},yo={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var wo={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var ho=!1;function Oa(){if(ho||document.getElementById("techsol-google-styles"))return;let e=document.createElement("style");e.id="techsol-google-styles",e.innerHTML=`
        @keyframes google-pulse-ring {
            0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.7); }
            25% { box-shadow: 0 0 0 10px rgba(234, 67, 53, 0); }
            50% { box-shadow: 0 0 0 20px rgba(251, 188, 5, 0); }
            100% { box-shadow: 0 0 0 30px rgba(52, 168, 83, 0); }
        }
        .google-animate-click { animation: google-pulse-ring 0.6s var(--cw-ease-spring); }
        .google-active-state { position: relative !important; overflow: visible !important; }
        .google-active-state::before {
            content: ''; position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px; border-radius: 50%;
            background: conic-gradient(from 0deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4); z-index: -1; opacity: 0.25; filter: blur(3px);
        }
    `,document.head.appendChild(e),ho=!0}function So(e){Oa(),e.classList.remove("google-animate-click"),e.offsetWidth,e.classList.add("google-animate-click"),setTimeout(()=>{e.classList.remove("google-animate-click")},600)}async function Ma(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let o=e.querySelector(".cursor");await ie(200);for(let n=0;n<t.length;n++){let a=t.charAt(n),i=document.createElement("span");i.textContent=a,o&&o.parentNode===e?o.before(i):e.appendChild(i);let r=Math.floor(Math.random()*60)+30;n===0&&(r=150),n>t.length-3&&(r=30),await ie(r)}await ie(600),o&&(o.style.display="none")}async function Dt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
            /* Google Sans j\xE1 vem via <link> logo acima em initGlobalStylesAndFont(),
               chamada antes da splash - esse @import era uma 3a requisi\xE7\xE3o redundante
               pra fonte (a 1a \xE9 o <link>, a 2a era o do command-center.js). */
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: 2147483647; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1); }
            .splash-exit { animation: focus-out 0.9s cubic-bezier(0.4, 0.0, 0.2, 1) forwards; }
            @keyframes focus-out { 0% { opacity: 1; transform: scale(1); filter: blur(0); } 100% { opacity: 0; transform: scale(1.15); filter: blur(15px); } }

            .sentence-wrapper { display: flex; flex-wrap: wrap; justify-content: center; align-items: baseline; gap: 10px; max-width: 80%; position: relative; }
            .text-part { font-size: 32px; color: #E8EAED; opacity: 0; transition: opacity 0.8s ease; }
            .text-name { font-size: 32px; font-weight: 700; background: linear-gradient(90deg, #8AB4F8, #C58AF9, #F28B82); -webkit-background-clip: text; -webkit-text-fill-color: transparent; opacity: 0; }
            .text-footer { font-size: 20px; color: #9AA0A6; font-weight: 400; width: 100%; text-align: center; margin-top: 12px; opacity: 0; transform: translateY(10px); transition: all 1s cubic-bezier(0.0, 0.0, 0.2, 1); }

            .sextou-badge { display: inline-flex; align-items: center; gap: 6px; margin-top: 16px; padding: 6px 16px; border-radius: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #F28B82; font-size: 14px; font-weight: 500; opacity: 0; transform: scale(0.8); transition: all 1s var(--cw-ease-spring); }
            .cursor { color: #8AB4F8; -webkit-text-fill-color: #8AB4F8; font-weight: 100; margin-left: 1px; animation: blink 1s infinite; }

            .brand-logo { position: absolute; top: 40px; font-size: 20px; font-weight: 500; color: #5f6368; letter-spacing: 1px; text-transform: uppercase; opacity: 0; animation: fade-in-down 0.8s ease forwards; }
            .weather-icon { width: 42px; height: 42px; margin-bottom: 24px; opacity: 0; transform: scale(0.8); transition: all 0.6s var(--cw-ease-spring); }
            .credit-pro { position: absolute; bottom: 30px; font-size: 11px; color: #5f6368; letter-spacing: 0.5px; opacity: 0; animation: fade-in-simple 1.5s ease 1s forwards; }
            .credit-pro span { color: #8AB4F8; font-weight: 500; opacity: 0.9; }

            .loader-line { position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853); transform: scaleX(0); transform-origin: left; animation: load-line 4s linear forwards; }

            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            @keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes load-line { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
            @keyframes fade-in-simple { to { opacity: 1; } }

            /* A primeira tela que qualquer agente v\xEA, todo santo dia - e n\xE3o
               tinha nenhuma prote\xE7\xE3o de reduced-motion, apesar de combinar
               blur(15px) + scale(1.15) na sa\xEDda (o efeito de "zoom" mais
               forte do app inteiro) e um cursor piscando em loop infinito. */
            @media (prefers-reduced-motion: reduce) {
                .splash-container { transition: opacity 0.2s ease !important; }
                .splash-exit { animation: fade-out-simple 0.2s ease forwards !important; }
                @keyframes fade-out-simple { to { opacity: 0; } }
                .text-footer { transition: opacity 0.3s ease !important; transform: none !important; }
                .sextou-badge, .weather-icon { transition: opacity 0.2s ease !important; transform: none !important; }
                .cursor { animation: none !important; opacity: 1 !important; }
            }
        `,document.head.appendChild(t)}let e=document.createElement("div");e.id="techsol-splash-screen",e.className="splash-container",e.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await ie(200);let t=await at(),o=go(t),n=e.querySelector("#w-icon"),a=e.querySelector("#p1"),i=e.querySelector("#p2"),r=e.querySelector("#p3"),s=e.querySelector("#p-sextou");n&&(n.innerHTML=o.icon),a&&(a.textContent=o.prefix),r&&(r.textContent=o.suffix),await ie(300);let c=n?n.querySelector("svg"):null;if(c&&(c.style.opacity="1",c.style.transform="scale(1)"),await ie(400),a&&(a.style.opacity="1"),k.playStartup(),i&&await Ma(i,o.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),o.isFriday&&s){await ie(400),s.style.display="block",s.offsetWidth;let u=s.querySelector(".sextou-badge");u&&(u.style.opacity="1",u.style.transform="scale(1)")}await ie(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await ie(900),e.parentNode&&e.parentNode.removeChild(e)}}function Eo(e){if(!e)return;let t=e.getBoundingClientRect(),o=window.innerWidth,n=window.innerHeight,a=24,i=o-t.width-a,r=n-t.height-a,s=parseFloat(e.style.left)||t.left,c=parseFloat(e.style.top)||t.top,u=Ue(s,a,i),d=Ue(c,a,r);if(u!==s||d!==c){let h=e.style.transition;e.style.transition="left 0.3s var(--cw-ease-elastic), top 0.3s var(--cw-ease-elastic)",e.style.left=`${u}px`,e.style.top=`${d}px`,setTimeout(()=>{e.style.transition=h},300)}}var ze={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Re(e,t){t.onmousedown=o;function o(n){n.stopPropagation(),n.preventDefault();let a=e.style.transition;e.style.transition="none";let i=n.clientX,r=n.clientY,s=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),c=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),u=i,d=r,h=!1;function f(v){u=v.clientX,d=v.clientY,h||(window.requestAnimationFrame(()=>{E(),h=!1}),h=!0)}function E(){let v=s+(u-i),x=c+(d-r);v>360&&(e.style.width=v+"px"),x>300&&(e.style.height=x+"px")}function w(){document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",w),setTimeout(()=>{e.style.transition=a},50)}document.addEventListener("mousemove",f),document.addEventListener("mouseup",w)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function ft(e){if(!e||e==="N/A"||e==="undefined")return"Data indispon\xEDvel";if(String(e).includes(" | "))return e.split(" | ").map(t=>ft(t.trim())).filter(t=>t!=="Data indispon\xEDvel").join(" | ");try{let t=new Date(e);if(isNaN(t.getTime()))return"Data indispon\xEDvel";let o=t.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}),n=t.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});return`${o} \xE0s ${n}`}catch{return"Data indispon\xEDvel"}}function ko(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,o=>t[o]?t[o]:"")}function Ao(){let e=document.createElement("div");return e.className="cw-dialog-overlay",Object.assign(e.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),e}function Co(){let e=document.createElement("div");return Object.assign(e.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s var(--cw-ease-spring)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),e}function ve(e,t={}){return new Promise(o=>{let n=Ao(),a=Co(),i=t.danger?"#FF3B30":"#007AFF",r=t.confirmText||(t.danger?"Excluir":"Confirmar");a.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${e}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${r}</button>
            </div>
        `,n.appendChild(a),document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity=1,a.style.transform="scale(1)"});let s=d=>{n.style.opacity=0,a.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(d)},300)},c=a.querySelector("#cw-conf-cancel"),u=a.querySelector("#cw-conf-ok");[c,u].forEach(d=>d.onmouseenter=()=>k.playHover()),c.onclick=()=>{k.playClick(),s(!1)},u.onclick=()=>{k.playClick(),s(!0)}})}function To(e,t=""){return new Promise(o=>{let n=Ao(),a=Co();a.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${e}</div>
            <input type="text" id="cw-prompt-input" value="${t}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,n.appendChild(a),document.body.appendChild(n);let i=a.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{n.style.opacity=1,a.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let r=u=>{n.style.opacity=0,a.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(u)},300)},s=a.querySelector("#cw-prompt-cancel"),c=a.querySelector("#cw-prompt-ok");[s,c].forEach(u=>u.onmouseenter=()=>k.playHover()),s.onclick=()=>{k.playClick(),r(null)},c.onclick=()=>{k.playClick(),r(i.value)},i.onkeydown=u=>{u.key==="Enter"&&c.click(),u.key==="Escape"&&s.click()}})}var zt=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.activeFields=[];let t=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(t||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(t){this.currentCaseType!==t&&(this.currentCaseType=t,this.isDirty=!0,this.notify())}setLanguage(t){this.currentLang!==t&&(this.currentLang=t,this.notify())}setPortugalCase(t){this.isPortugalCase!==t&&(this.isPortugalCase=t,this.isDirty=!0,this.notify())}setConsent(t){this.consent!==t&&(this.consent=t,this.isDirty=!0,this.notify())}setTagSupportUsed(t){this.tagSupportUsed=t,t||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(t){this.activeFields=[...t],this.isDirty=!0,this.notify()}removeField(t){this.activeFields=this.activeFields.filter(o=>o!==t),this.isDirty=!0,this.notify()}addFieldAt(t,o){this.activeFields.includes(t)||(this.activeFields.splice(o,0,t),this.isDirty=!0,this.notify())}setForcedScreenshots(t){this.forcedScreenshots=new Set(t),this.isDirty=!0,this.notify()}toggleForcedScreenshot(t,o){o?this.forcedScreenshots.add(t):this.forcedScreenshots.delete(t),this.isDirty=!0,this.notify()}setStatus(t){this.currentStatus!==t&&(this.currentStatus=t,this.isDirty=!0,this.notify())}setSubStatus(t){this.currentSubStatus!==t&&(this.currentSubStatus=t,this.isDirty=!0,this.notify())}setScreenshotMode(t){this.screenshotMode=t,this.notify()}setActiveTasks(t){this.activeTasks=t,this.isDirty=!0,this.notify()}toggleFavorite(t){this.favorites.has(t)?this.favorites.delete(t):this.favorites.add(t),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(t,o){this.formData[t]!==o&&(this.formData[t]=o,this.isDirty=!0,this.notify())}listeners=[];subscribe(t){return this.listeners.push(t),()=>this.listeners=this.listeners.filter(o=>o!==t)}notify(){this.listeners.forEach(t=>t(this))}},V=new zt;var _a={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Fo={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function we(e,t,o,n,a,i){let r=document.createElement("div");Object.assign(r.style,_a),vo(e,r);let s=document.createElement("div");if(Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let B=document.createElement("style");B.id="cw-header-anim",B.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(B)}window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||(s.style.animation="cw-header-flow 6s linear infinite"),r.appendChild(s),a&&(a.googleLine=s);let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center",gap:"12px"});let d=document.createElement("div");d.innerHTML='<svg viewBox="0 0 48 48" width="20" height="20"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>',Object.assign(d.style,{width:"20px",height:"20px",pointerEvents:"none",flexShrink:"0",display:"flex"});let h=document.createElement("span");h.textContent=t,u.appendChild(d),u.appendChild(h);let f=document.createElement("div");Object.assign(f.style,{display:"flex",alignItems:"center",gap:"4px"});let E='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',w='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',v=document.createElement("div");v.innerHTML=E,Object.assign(v.style,Fo),v.title="Sobre & Feedback",v.classList.add("no-drag"),v.onmouseenter=()=>{v.style.background="rgba(255,255,255,0.1)",v.style.color="#FFF"},v.onmouseleave=()=>{v.style.color!=="rgb(138, 180, 248)"&&(v.style.background="transparent",v.style.color="#9AA0A6")};let x=document.createElement("div");x.innerHTML=w,Object.assign(x.style,Fo),x.title="Fechar",x.classList.add("no-drag","cw-header-close"),x.onmouseenter=()=>{x.style.background="rgba(242, 139, 130, 0.2)",x.style.color="#F28B82"},x.onmouseleave=()=>{x.style.background="transparent",x.style.color="#9AA0A6"},x.onmousedown=B=>B.stopPropagation(),v.onmousedown=B=>B.stopPropagation(),x.onclick=i;let z=Da(e,t,o,n);return v.onclick=B=>{B.stopPropagation(),z.style.opacity==="1"?(z.style.opacity="0",z.style.pointerEvents="none",v.style.color="#9AA0A6",v.style.background="transparent"):(z.style.opacity="1",z.style.pointerEvents="auto",v.style.color="#8AB4F8",v.style.background="rgba(138, 180, 248, 0.1)")},f.appendChild(v),f.appendChild(x),r.appendChild(u),r.appendChild(f),r}function Da(e,t,o,n){let a=document.createElement("div");return Object.assign(a.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),a.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
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
    `,setTimeout(()=>{let i=a.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let r=a.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{a.style.opacity="0",a.style.pointerEvents="none"})},0),e.appendChild(a),a}var P={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},xe={small:"8px",medium:"12px",large:"20px",pill:"100px"},$e={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},ce="cubic-bezier(0.34, 1.56, 0.64, 1)",za={width:"100%",padding:"14px 16px",borderRadius:xe.medium,border:`1.5px solid ${P.border}`,backgroundColor:P.bgInput,fontSize:"14px",color:P.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${ce}`,outline:"none"},On={...za,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},Mn={fontSize:"12px",fontWeight:"700",color:P.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},_n={display:"block",fontSize:"14px",fontWeight:"600",color:P.text,marginBottom:"10px",marginTop:"20px"},Dn={fontSize:"12px",color:P.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},Rt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:P.primary},zn={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:P.text,cursor:"pointer",padding:"16px 20px",backgroundColor:P.surface,border:`1px solid ${P.border}`,borderRadius:xe.large,transition:`all 0.4s ${ce}`,userSelect:"none",boxShadow:$e.subtle},Rn={padding:"14px 28px",color:"#fff",backgroundColor:P.primary,border:"none",borderRadius:xe.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${ce}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},Bn={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${P.primary}`,color:P.primary,borderRadius:xe.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${ce}`},$n={background:"transparent",border:`1px solid ${P.border}`,borderRadius:xe.pill,color:P.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${ce}`};function Io(e,t){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,Ce,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${ce}, height 0.4s ${ce}, transform 0.4s ${ce}, opacity 0.3s ease`,borderRadius:xe.large,boxShadow:$e.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let n={popup:o,googleLine:null},a=we(o,"Case Notes",e,"Gera notas padronizadas com excel\xEAncia visual.",n,t);o.appendChild(a);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:P.surface}),o.appendChild(i);let r=document.createElement("div");r.textContent="created by lucaste@",Object.assign(r.style,wo,{padding:"16px 24px",borderTop:`1px solid ${P.bgInput}`,color:P.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(r);let s=document.createElement("div");return Object.assign(s.style,ze),s.className="no-drag",o.appendChild(s),Re(o,s),Ra(),{popup:o,content:i,header:a,animRefs:n,credit:r}}function Ra(){if(document.getElementById("cw-notes-refactor-styles"))return;let e=document.createElement("style");e.id="cw-notes-refactor-styles",e.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${xe.medium} !important;
            border: 1.5px solid ${P.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: border-color 0.2s ${ce}, background-color 0.2s ${ce}, box-shadow 0.2s ${ce} !important;
            box-sizing: border-box !important;
            background: ${P.bgInput} !important;
            color: ${P.text} !important;
            outline: none !important;
            box-shadow: ${$e.subtle} !important;
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
            transition: border-color 0.2s ${ce}, background-color 0.2s ${ce}, box-shadow 0.2s ${ce} !important;
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
            border-radius: ${xe.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${ce}, transform 0.2s ${ce}, box-shadow 0.2s ${ce};
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
            border-radius: ${xe.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${ce}, border-color 0.2s ${ce}, color 0.2s ${ce};
        }
        .cw-btn-secondary:hover {
            background: ${P.bgInput};
            border-color: #bdc1c6;
            color: ${P.text};
        }

        @media (prefers-reduced-motion: reduce) {
            .cw-btn-primary, .cw-btn-secondary, .cw-input, .cw-textarea, .cw-select {
                transition: opacity 0.15s ease, background-color 0.15s ease, border-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}var Fe={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} O que foi feito:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evid\xEAncias de Contato",ligacao_1:"Liga\xE7\xE3o 1",ligacao_2:"Liga\xE7\xE3o 2",mensagem_am:"Mensagem para AM",tentativa_ligacao:"\u{1F4DE} Tentativa de liga\xE7\xE3o:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Qu\xE9 se hizo:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evidencias de Contacto",ligacao_1:"Llamada 1",ligacao_2:"Llamada 2",mensagem_am:"Mensaje para AM",tentativa_ligacao:"\u{1F4DE} Intento de llamada:"}},Me={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Ba=["GTM_GA4_VERIFICADO","MULTIPLE_CIDS"],$a=["REASON_COMMENTS"];function rt(e){let t=[...$a];return e?.requiresTasks&&t.push("GTM_GA4_VERIFICADO"),t}function ht(e){let t=[...Ba,...e?.extraOptionalFields||[]],o=rt(e);return t.filter(n=>!o.includes(n))}var De={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","TENTATIVA_LIGACAO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS","CONSIDERACOES"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Ze={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Qe=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],xt=["CONSIDERACOES","COMENTARIOS"],Ye={"quickfill-gtm-install":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Instala\xE7\xE3o do GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
\u2022 Instalamos dentro do CMS/Hospedagem.
\u2022 Criamos o Vinculador de Convers\xF5es.`,"field-RESULTADO":"\u2022 Validei a instala\xE7\xE3o.",linkedTask:"gtm_installation"},"quickfill-whatsapp":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Instala\xE7\xE3o do Ads Conversion tracking para Whatsapp finalizada.","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para WHATSAPP","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM para os bot\xF5es de WhatsApp.
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-form":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Instala\xE7\xE3o do Ads Conversion tracking para Form finalizada.","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para FORMUL\xC1RIO (padr\xE3o, n\xE3o-otimizada).","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM.
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-ecw4-close":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Finaliza\xE7\xE3o do acompanhamento de EC.","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento da convers\xE3o otimizada (ECW4).","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de acompanhamento, verifiquei o painel do Ads.
\u2022 A convers\xE3o est\xE1 sendo registrada corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento da convers\xE3o otimizada.
\u2022 Assim, fecho o caso.`,linkedTask:"ads_enhanced_conversions"},"quickfill-ga4-event-close":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Finaliza\xE7\xE3o do Acompanhamento de GA4.","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento de Eventos GA4 ap\xF3s 48h.","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de 48h de acompanhamento, verifiquei o painel.
\u2022 O evento est\xE1 sendo registrado corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento do rastreamento de eventos.
\u2022 Assim, fecho o caso.`,linkedTask:"ga4_event_tracking"},"quickfill-ni-inicio-manual":{type:"all",substatus:["NI_Awaiting_Inputs"],"field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all",substatus:["NI_Awaiting_Inputs"],"field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
\u2022 Configura\xE7\xE3o de Convers\xF5es`,"field-CONTEXTO_CALL":`\u2022 Percebi que o(a) anunciante n\xE3o tinha GTM Instalado.
\u2022 Seguimos com a cria\xE7\xE3o de conta no GTM.
\u2022 Entretanto, a conta de acesso ao painel do site (ex: WordPress) n\xE3o tinha permiss\xE3o para instalar plugins ou editar o c\xF3digo.`,"field-IMPEDIMENTO_CLIENTE":`\u2022 Anunciante precisa conseguir acesso de administrador ao painel do site.
\u2022 OU
\u2022 Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.`,"field-MINHA_ACAO":`\u2022 Coloco o caso em 2/6.
\u2022 Assim que o anunciante tiver o acesso ou a instala\xE7\xE3o for feita, abrirei um caso em BAU para dar continuidade.`,"field-SCREENSHOTS":"\u2022 Print do painel do CMS mostrando a falta de permiss\xE3o (opcional)."},"quickfill-ni-lack-of-access":{type:"all",substatus:["NI_Awaiting_Inputs"],"field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Falta de acessos necess\xE1rios)","field-CONTEXTO_CALL":`\u2022 Durante a call, identificamos que os acessos necess\xE1rios para prosseguir com a implementa\xE7\xE3o n\xE3o estavam dispon\xEDveis.
\u2022 Orientei o(a) anunciante sobre quais acessos s\xE3o necess\xE1rios e como obt\xEA-los.`,"field-IMPEDIMENTO_CLIENTE":"\u2022 Anunciante precisa providenciar os acessos necess\xE1rios (ex: painel do site, plataforma de an\xFAncios, ou contato com o(a) desenvolvedor(a)) para que a implementa\xE7\xE3o seja conclu\xEDda.","field-MINHA_ACAO":`\u2022 Coloco o caso em 2/6.
\u2022 Assim que o anunciante obtiver os acessos, abrirei um caso em BAU para dar continuidade.`},"quickfill-ni-awaiting-ecw4":{type:"all",substatus:["NI_Awaiting_Validation"],"field-REASON_COMMENTS":"Aguardando valida\xE7\xE3o de dados (ECW4 - 7 Dias)","field-TASKS_SOLICITADAS":"\u2022 Implementa\xE7\xE3o de Convers\xF5es Otimizadas (ECW4)","field-CONTEXTO_CALL":`\u2022 Criamos a convers\xE3o no Google Ads.
\u2022 Configuramos o disparo das tags via GTM.
\u2022 Adicionamos a tag de UPD (User Provided Data).
\u2022 Testamos juntos e validamos o bom funcionamento.`,"field-MINHA_ACAO":"\u2022 Coloco o caso em status de Awaiting Validation para acompanhamento de 7 dias.",linkedTask:"ads_enhanced_conversions"},"quickfill-ni-awaiting-ga4":{type:"all",substatus:["NI_Awaiting_Validation"],"field-REASON_COMMENTS":"Aguardando valida\xE7\xE3o de dados (GA4 Event - 48h)","field-TASKS_SOLICITADAS":"\u2022 Implementa\xE7\xE3o de Eventos GA4","field-CONTEXTO_CALL":`\u2022 Criamos o evento no GA4.
\u2022 Configuramos o disparo das tags via GTM.
\u2022 Testamos juntos e validamos o bom funcionamento.`,"field-MINHA_ACAO":"\u2022 Coloco o caso em status de Awaiting Validation para acompanhamento de 48h.",linkedTask:"ga4_event_tracking"},"quickfill-ni-followup-bau":{type:"bau",substatus:["NI_Awaiting_Inputs"],"field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up BAU 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas n\xE3o obtive resposta. Envio na sequ\xEAncia o email referente ao dia respectivo.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`},"quickfill-ni-followup-lm":{type:"lm",substatus:["NI_Attempted_Contact"],"field-REASON_COMMENTS":"Tentativa de contato sem sucesso (Follow-up LM 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 enviei e-mail de follow-up (caso LM, sem tentativas de liga\xE7\xE3o), mas n\xE3o obtive resposta.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":"\u2022 E-mail de follow-up enviado (LM) -"},"quickfill-ni-attempted-2day":{type:"bau",substatus:["NI_Attempted_Contact"],quickLaunch:{status:"NI",subStatus:"NI_Attempted_Contact",label:"NI Attempted \u2014 In\xEDcio 2 Day Rule",keywords:"2 day ligacao attempted contact inicio",focusIds:["field-SPEAKEASY_ID","evidence-l1","evidence-l2","evidence-msg"]},"field-REASON_COMMENTS":"Attempted Contact (In\xEDcio 2 Day Rule)","field-CONTEXTO_CALL":`\u2022 Fiz a primeira tentativa de liga\xE7\xE3o, sem sucesso.
\u2022 Enviei uma message no chat para o AM.
\u2022 Aguardei 5 minutos e fiz a segunda tentativa de liga\xE7\xE3o, novamente sem sucesso.
\u2022 Aguardei mais 5 minutos e agora farei o acompanhamento 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 MSG AM -
\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`},"quickfill-in-nrp-bau":{type:"bau",substatus:["IN_Not_Reachable"],"field-REASON_COMMENTS":"NRP (BAU - 3 tentativas)","field-COMENTARIOS":`\u2022 Duas liga\xE7\xF5es seguidas, e e-mail "Antes dos 10 minutos" e uma terceira e ultima tentativa de liga\xE7\xE3o.
\u2022 N\xE3o houve resposta \xE0s tentativas de liga\xE7\xE3o ou e-mail, por isso o caso ser\xE1 inativado.`,"field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -
\u2022 Tentativa 3 -`,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-no-show-bau":{type:"bau",substatus:["IN_Not_Reachable"],quickLaunch:{status:"IN",subStatus:"IN_Not_Reachable",label:"IN Not Reachable \u2014 Finaliza\xE7\xE3o 2 Day Rule",keywords:"2 day finalizacao nao atendeu ligacoes reachable",focusIds:["field-SPEAKEASY_ID"]},"field-REASON_COMMENTS":"Sem resposta ao 2 Day Rule.","field-ON_CALL":"N/A","field-COMENTARIOS":`\u2022 O caso foi gerado e entrei na chamada no hor\xE1rio agendado.
\u2022 O anunciante n\xE3o compareceu \xE0 reuni\xE3o.
\u2022 Segui o protocolo de espera (BAU): realizei duas tentativas de liga\xE7\xE3o, sem sucesso.
\u2022 Nenhuma das liga\xE7\xF5es foi atendida (ex: Caixa Postal).
\u2022 Caso inativado ap\xF3s 2 Day Rule.`,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all",substatus:["IN_Not_Reachable"],"field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-not-reachable-no-return":{type:"all",substatus:["IN_Not_Reachable"],"field-REASON_COMMENTS":"Inativa\xE7\xE3o por aus\xEAncia de retorno do anunciante","field-COMENTARIOS":`O(a) anunciante n\xE3o compareceu \xE0 consultoria. Fiz as tentativas de liga\xE7\xE3o, mas n\xE3o obtive retorno.

Irei solicitar a inativa\xE7\xE3o do caso, levando em conta a aus\xEAncia de contato.`},"quickfill-in-not-ready-lack-of-access":{type:"all",substatus:["IN_Not_Ready"],"field-REASON_COMMENTS":"Inativa\xE7\xE3o por falta de acessos (Reagendamento solicitado)","field-COMENTARIOS":`N\xE3o conseguimos implementar nada durante a consultoria, j\xE1 que o(a) anunciante n\xE3o tinha os acessos necess\xE1rios.

Irei abrir caso em BAU para o dia solicitado e pedir a inativa\xE7\xE3o do mesmo, levando em conta a falta de acessos e a solicita\xE7\xE3o de reagendamento.`},"quickfill-in-infeasible":{type:"all",substatus:["IN_Infeasible"],"field-REASON_COMMENTS":"Inativa\xE7\xE3o por inviabilidade t\xE9cnica","field-COMENTARIOS":`\u2022 Avaliamos a implementa\xE7\xE3o solicitada e identificamos que n\xE3o \xE9 poss\xEDvel realiz\xE1-la devido \xE0 complexidade t\xE9cnica/estrutura do site (ex: [descrever a limita\xE7\xE3o encontrada]).
\u2022 N\xE3o se trata de uma limita\xE7\xE3o do Google, e sim da estrutura atual do site/plataforma do anunciante.
\u2022 Oriento o(a) anunciante sobre as op\xE7\xF5es dispon\xEDveis (ex: altera\xE7\xE3o da plataforma, apoio de um(a) desenvolvedor(a) especializado(a)).`},"quickfill-in-not-interested":{type:"all",substatus:["IN_Not_Interested"],"field-REASON_COMMENTS":"Inativa\xE7\xE3o por falta de interesse do anunciante","field-COMENTARIOS":`\u2022 O(a) anunciante informou que n\xE3o tem interesse em prosseguir com a consultoria neste momento.
\u2022 [Ou] O contato se limitou a perguntas gerais, sem inten\xE7\xE3o de realizar a implementa\xE7\xE3o.
\u2022 N\xE3o h\xE1 mais a\xE7\xF5es pendentes da nossa parte; caso encerrado a pedido do(a) anunciante.`},"quickfill-in-troubleshooting-transferred":{type:"all",substatus:["IN_Troubleshooting_Transferred"],"field-REASON_COMMENTS":"Inativa\xE7\xE3o - Troubleshooting sem sucesso, caso transferido","field-COMENTARIOS":`\u2022 Realizamos os passos de troubleshooting padr\xE3o para o problema relatado (ex: [listar testes/verifica\xE7\xF5es feitas]).
\u2022 Os passos n\xE3o resolveram o problema.
\u2022 Encaminho o caso para o time respons\xE1vel ([nome do time]) para continuidade.`},"quickfill-in-manual":{type:"all",substatus:[],"field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-as-no-show":{type:"all",substatus:["AS_Reschedule_1"],"field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o compareceu na meet, por\xE9m respondeu o e-mail pedindo o reagendamento"},"quickfill-as-insufficient-time":{type:"all",substatus:["AS_Reschedule_1"],"field-MOTIVO_REAGENDAMENTO":`\u2022 Precisamos reagendar o caso, j\xE1 que o tempo foi insuficiente para terminar as Tasks
\u2022 Implementamos [descrever o que foi feito]`},"quickfill-as-no-access":{type:"all",substatus:["AS_Reschedule_1"],"field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o(a) anunciante n\xE3o tinha acesso ao site, ao c\xF3digo ou ao CMS necess\xE1rios para a instala\xE7\xE3o do Google Tag Manager"},"quickfill-as-force-majeure":{type:"all",substatus:["AS_Acceptable_Reschedule"],"field-MOTIVO_REAGENDAMENTO":`\u2022 Reagendamento por fator maior fora do controle do anunciante (ex: falta de internet/energia, motivo de sa\xFAde) - dentro dos crit\xE9rios de reagendamento aceit\xE1vel.
\u2022 [Detalhar o fator espec\xEDfico relatado pelo anunciante]`},"quickfill-dc-lm-incomplete":{type:"all",substatus:["DC_Other"],"field-REASON_COMMENTS":"Nada foi implementado durante a consultoria (tempo insuficiente, limite de reagendamento excedido)","field-COMENTARIOS":`N\xE3o conseguimos implementar nada durante a consultoria, pois n\xE3o houve tempo o suficiente para terminar a task relacionada e o limite de reagendamentos j\xE1 foi atingido.

Irei abrir caso em BAU para o dia solicitado e pedir a inativa\xE7\xE3o do mesmo.`}};var Lo="cw-automation-styles";if(!document.getElementById(Lo)){let e=document.createElement("style");e.id=Lo,e.innerHTML=`
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
    `,document.head.appendChild(e)}function qo(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function vt(e){await Nt();let t=document.getElementById(e),o="";qo(!0),t&&(o=t.placeholder,t.placeholder="Buscando ID...",t.value="",t.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(Je(n),await ie(1200));let a=document.querySelector("search-filter dropdown-button .button");if(a&&!(a.innerText||"").includes("All")){Je(a),await ie(600);let f=document.querySelector('material-checkbox[debug-id="check-all-box"]');f&&f.getAttribute("aria-checked")!=="true"&&(Je(f),await ie(300));let E=document.querySelector('material-button[debug-id="apply-filter"]');E&&(Je(E),await ie(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await ie(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let h=r.length-1;h>=0;h--){let f=r[h],E=f.querySelector("i.material-icons-extended"),w=E&&E.innerText.trim()==="phone_in_talk",v=f.innerText||"",x=v.includes("Agent joined")||v.includes("outbound-call")||v.includes("Speakeasy");if(w||x){f.getAttribute("aria-expanded")==="true"||(t&&(t.placeholder="Lendo mensagem..."),Je(f),await ie(1e3));break}}let c=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),u=/Speakeasy.*?(P\d{15,25})/i,d=null;for(let h=c.length-1;h>=0;h--){let f=c[h];if(f.offsetParent===null)continue;let E=(f.innerText||"").match(u);if(E&&E[1]){d=E[1];break}}if(t)if(d){try{await navigator.clipboard.writeText(d)}catch{}t.tagName==="INPUT"||t.tagName==="TEXTAREA"?t.value=d:t.textContent=d,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),k.playSuccess(),Y(`ID Localizado: ${d}`),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else k.playError(),Y("Nenhum ID encontrado.",{error:!0}),t.placeholder="N\xE3o encontrado",t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),k.playError(),Y("Erro ao processar.",{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=o)),qo(!1)}}function No(e){e.dataset.bulletEnabled!=="true"&&(e.dataset.bulletEnabled="true",(e.value.trim()===""||e.value.trim()==="\u2022")&&(e.value="\u2022 "),e.addEventListener("keydown",function(t){let o=this.selectionStart,n=this.selectionEnd,a=this.value,i=a.lastIndexOf(`
`,o-1)+1,r=a.substring(i,o);if(t.key==="Enter"){t.preventDefault();let s=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=a.substring(0,i)+`
`+a.substring(n),this.selectionStart=this.selectionEnd=i+1;return}let c=`
`+s;this.value=a.substring(0,o)+c+a.substring(n),this.selectionStart=this.selectionEnd=o+c.length}else if(t.key==="Tab")t.preventDefault(),t.shiftKey?r.startsWith("  ")&&(this.value=a.substring(0,i)+r.substring(2)+a.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=a.substring(0,i)+"  "+r+a.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(t.key==="Backspace"&&o===n&&o>0){let s=a.substring(0,o);s.endsWith("\u2022 ")?(t.preventDefault(),this.value=s.substring(0,o-2)+a.substring(n),this.selectionStart=this.selectionEnd=o-2):s.endsWith("  ")&&r.trim().startsWith("\u2022")&&(t.preventDefault(),this.value=s.substring(0,o-2)+a.substring(n),this.selectionStart=this.selectionEnd=o-2)}}))}function yt(e,t,o){t.innerHTML="";let n=De[e];if(!n)return;let a=rt(n);if(o.activeFields.forEach(s=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(s))return;let c=`field-${s}`,u=document.createElement("label"),d=w=>Fe[o.currentLang]?.[w]||Fe.pt?.[w]||w;u.textContent=d(s.toLowerCase())!==s.toLowerCase()?d(s.toLowerCase()):s.replace(/_/g," ").replace(/\b\w/g,w=>w.toUpperCase())+":",Object.assign(u.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:P.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let h=a.includes(s),f=document.createElement("span");if(f.textContent=u.textContent,h){let w=document.createElement("span");w.textContent=" *",w.style.color=P.error,f.appendChild(w)}if(u.innerHTML="",u.appendChild(f),s==="SPEAKEASY_ID"){let w=document.createElement("button");w.innerHTML="\u2728 Auto Busca",w.style.cssText=`font-size: 11px; font-weight: 700; color: ${P.primary}; background-color: ${P.primaryBg}; border: none; border-radius: ${xe.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${ce};`,w.onmouseenter=()=>w.style.backgroundColor="#d2e3fc",w.onmouseleave=()=>w.style.backgroundColor=P.primaryBg,w.onclick=v=>{v.preventDefault(),k.playClick(),vt(c)},u.appendChild(w)}if(!h){let w=document.createElement("button");w.innerHTML="\u2715",w.style.cssText=`font-size: 14px; background: ${P.bgInput}; border: none; color: ${P.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${ce};`,w.onmouseenter=()=>{w.style.background=P.error,w.style.color=P.surface},w.onmouseleave=()=>{w.style.background=P.bgInput,w.style.color=P.textSub},w.onclick=async v=>{v.preventDefault(),k.playClick();let x=f.textContent.replace(/:\s*$/,"").trim();await ve(`Remover o campo "${x}"?`,{danger:!0,confirmText:"Remover"})&&(o.removeField(s),yt(e,t,o))},u.appendChild(w)}let E;Qe.includes(s)?(E=document.createElement("textarea"),E.classList.add("bullet-textarea","cw-textarea"),E.placeholder="Utilize marcadores para detalhar...",No(E)):xt.includes(s)?(E=document.createElement("textarea"),E.classList.add("cw-textarea"),E.placeholder="Descreva as considera\xE7\xF5es..."):(E=document.createElement("input"),E.type="text",E.classList.add("cw-input")),E.id=c,E.value=o.formData[c]||"",E.addEventListener("input",w=>o.updateField(c,w.target.value)),t.appendChild(u),t.appendChild(E)}),o.activeFields.includes("CONSENTIU_GRAVACAO")){let s=d=>Fe[o.currentLang]?.[d]||Fe.pt?.[d]||d,c=document.createElement("label");c.textContent=s("consentiu_gravacao"),Object.assign(c.style,{display:"block",fontSize:"13px",fontWeight:"700",color:P.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let u=document.createElement("select");u.className="cw-select",u.innerHTML=`
            <option value="false">${s("nao")}</option>
            <option value="true">${s("sim")}</option>
        `,u.value=o.consent?"true":"false",u.onchange=()=>o.setConsent(u.value==="true"),t.appendChild(c),t.appendChild(u)}let i=ht(n),r=(n.templateFields||[]).filter(s=>i.includes(s)&&!o.activeFields.includes(s));if(r.length>0){let s=u=>Fe[o.currentLang]?.[u]||Fe.pt?.[u]||u,c=document.createElement("div");Object.assign(c.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"24px"}),r.forEach(u=>{let d=s(u.toLowerCase())!==u.toLowerCase()?s(u.toLowerCase()):u.replace(/_/g," ").replace(/\b\w/g,f=>f.toUpperCase())+":",h=document.createElement("button");h.type="button",h.textContent=`+ ${d.replace(/:$/,"")}`,h.style.cssText=`font-size: 12px; font-weight: 600; color: ${P.primary}; background-color: ${P.primaryBg}; border: none; border-radius: ${xe.pill}; padding: 6px 14px; cursor: pointer; transition: all 0.2s ${ce};`,h.onmouseenter=()=>h.style.backgroundColor="#d2e3fc",h.onmouseleave=()=>h.style.backgroundColor=P.primaryBg,h.onclick=f=>{f.preventDefault(),k.playClick(),o.addFieldAt(u,o.activeFields.length),yt(e,t,o)},c.appendChild(h)}),t.appendChild(c)}}function Bt(e,t,o,n=null){let a=e.currentSubStatus;if(!a)return null;let i=De[a],r=Fe[e.currentLang]||Fe.pt,s=d=>r[d]||Fe.pt?.[d]||d,c='style="margin-bottom: 12px; padding-left: 30px;"',u="";if(e.activeFields.forEach(d=>{let h=s(d.toLowerCase()),f="N/A";if(d==="label_substatus")h=s("label_substatus"),f=i.name;else if(d==="TAGS_IMPLEMENTED"){h=s("tags_implemented");let E=[];t.getCheckedElements().forEach(v=>{let x=v.value,z=Me[x],B=v.count||1,C=x==="ads_conversion_tracking"||x==="ads_enhanced_conversions";e.tagSupportUsed&&C&&!e.forcedScreenshots.has(x)?E.push(`${z.name} - ${s("ts_output_disclaimer")}`):E.push(B>1?`${z.name} (x${B})`:z.name)}),f=E.join(", ")||"N/A"}else if(d==="SCREENSHOTS_LIST"){h=s("screenshots_list");let E="",w=t.screenshotsElement;w&&Array.from(w.querySelectorAll('input[id^="name-"]')).forEach(x=>{let z=x.value,B=x.closest(".cw-screen-card");if(B){let C=B.querySelectorAll('input[id^="screen-"]'),N=!1,$="";C.forEach(W=>{let q=W.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",_=W.value.trim();_&&($+=`<li>${q} - ${_}</li>`,N=!0)}),N&&(E+=`<div style="margin-bottom: 8px;"><b>${z}</b><ul ${c}>${$}</ul></div>`)}}),f=E||"N/A"}else if(d==="CASO_PORTUGAL")h=s("caso_portugal"),f=s("sim");else if(d==="CONSENTIU_GRAVACAO")h=s("consentiu_gravacao"),f=e.consent?s("sim"):s("nao");else{let E=`field-${d}`,w=e.formData[E],v="";if(i.fieldPrefixes&&i.fieldPrefixes[d]&&(v=i.fieldPrefixes[d]+" "),w&&w.trim()!==""&&w.trim()!=="\u2022"){let x=w.trim();if(Qe.includes(d)){let z=x.split(`
`).map(B=>B.trim()).filter(B=>B!==""&&B!=="\u2022").map(B=>B.startsWith("\u2022 ")?B.substring(2):B).map(B=>`<li>${B}</li>`).join("");f=z?`${v}<ul ${c}>${z}</ul>`:"N/A"}else xt.includes(d)?f=v+x.split(`
`).filter(z=>z.trim()!=="").map(z=>`<p style="margin: 0 0 8px 0;">${z}</p>`).join(""):f=v+x}else v&&(f=v.trim())}u+=`<b>${h}</b><br>${f}<br><br>`}),n){let d="";n.l1&&(d+=`<li>${s("ligacao_1")}: ${n.l1}</li>`),n.l2&&(d+=`<li>${s("ligacao_2")}: ${n.l2}</li>`),n.msg&&(d+=`<li>${s("mensagem_am")}: ${n.msg}</li>`),d&&(u+=`<b>${s("evidencias_contato")}</b><br><ul ${c}>${d}</ul><br>`)}if(i.customFooter&&(u+=`${i.customFooter}<br><br>`),o?.getOutput){let d=o.getOutput();d&&(u+=`${d}<br><br>`)}return u+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",u.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}function Oo(e){let t=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=document.createElement("div");o.className="cw-step-scenarios";let n="Passe o mouse sobre um cen\xE1rio para visualizar o texto...",a=document.createElement("div");Object.assign(a.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let i=document.createElement("div");Object.assign(i.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let r=document.createElement("span");r.style.transition="opacity 0.05s ease, transform 0.05s ease",r.textContent=n,i.appendChild(r);let s=new Set,c=null;return o.render=(u,d)=>{s.clear();let h=Object.entries(Ye).filter(([f,E])=>{let w=!E.type||E.type==="all"||E.type===d,v=Array.isArray(E.substatus)&&E.substatus.includes(u);return w&&v});a.innerHTML="",h.forEach(([f,E])=>{let w=document.createElement("div"),v=f.replace("quickfill-","").replace(/-/g," ");w.textContent=v,w.dataset.id=f,w.dataset.sound="hover",Object.assign(w.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let x=E["field-REASON_COMMENTS"]||E["field-CONTEXTO_CALL"]||f;w.onmouseenter=()=>{c&&clearTimeout(c),s.has(f)||(w.style.background="#f1f3f4"),r.style.opacity="0",t||(r.style.transform="translateY(5px)"),c=setTimeout(()=>{r.textContent=x.substring(0,120)+(x.length>120?"...":""),r.style.opacity="1",t||(r.style.transform="translateY(0)")},50)},w.onmouseleave=()=>{c&&clearTimeout(c),s.has(f)||(w.style.background="#ffffff"),c=setTimeout(()=>{s.size===0&&(r.style.opacity="0",setTimeout(()=>{r.textContent=n,r.style.opacity="1"},50))},100)},w.onclick=()=>{k.playClick();let z=!s.has(f);z?(s.add(f),w.style.background="#e8f0fe",w.style.borderColor="#1a73e8",w.style.color="#1967d2"):(s.delete(f),w.style.background="#ffffff",w.style.borderColor="#dadce0",w.style.color="#3c4043"),e(f,z)},a.appendChild(w)}),h.length===0?o.style.display="none":o.style.display="block"},o.appendChild(a),o.appendChild(i),o}function Pa(e){return e==="ads_conversion_tracking"||e==="ads_enhanced_conversions"}function $t(e,t){return t.tagSupportUsed&&Pa(e)&&!t.forcedScreenshots.has(e)}var se={bg:P.bgInput,white:P.surface,border:P.border,textMain:P.text,textSub:P.textSub,blue:P.blue,blueLight:P.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:P.blue,bg:P.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:P.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:P.primary,bg:P.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:P.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},We={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Mo(e,t,o){let n={};o&&o.subscribe(()=>{$(),W()});function a(I){let q=I.toLowerCase();return q.includes("ads")||q.includes("conversion")||q.includes("remarketing")?se.brands.ads:q.includes("ga4")||q.includes("analytics")?se.brands.ga4:q.includes("gtm")||q.includes("tag manager")||q.includes("container")?se.brands.gtm:q.includes("merchant")||q.includes("shopping")||q.includes("feed")?se.brands.gmc:se.brands.default}let i=Object.entries(Me).filter(([I,q])=>q.popular),r={};Object.entries(Me).forEach(([I,q])=>{if(q.popular)return;let _=a(q.name);r[_.label]||(r[_.label]={brand:_,tasks:[]}),r[_.label].tasks.push({key:I,...q})});let s="cw-zen-tasks";if(!document.getElementById(s)){let I=document.createElement("style");I.id=s,I.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${se.font}; background: ${se.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${se.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${se.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${se.white}; 
                border: 1.5px solid #f1f3f4;
                border-radius: 20px;
                padding: 16px;
                cursor: pointer; 
                position: relative; 
                height: 90px;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                transition: all 0.4s var(--cw-ease-decelerate);
                box-shadow: 0 2px 6px rgba(0,0,0,0.02);
                overflow: hidden;
            }
            
            /* Corre\xE7\xE3o do Grid \xCDmpar */
            .cw-hero-card:last-child:nth-child(odd) { grid-column: span 2; }

            /* Intera\xE7\xE3o */
            .cw-hero-card:hover { border-color: var(--hero-color); box-shadow: 0 8px 20px rgba(0,0,0,0.06); transform: translateY(-3px); }
            .cw-hero-card:active { transform: scale(0.96) translateY(0); }
            .cw-hero-card:focus-visible { outline: 2px solid var(--hero-color); outline-offset: 2px; }

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
                font-size: 12px; font-weight: 500; color: ${se.textMain}; line-height: 1.2; 
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
            
            /* Bot\xF5es do Stepper (Hero: circular) */
            .cw-step-btn-hero {
                width: 24px; height: 24px; border-radius: 50%; background: #F3F4F6;
                color: ${se.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn-hero:hover { background: #E5E7EB; color: var(--hero-color); }            /* Some SR (Screen Reader) s\xF3 - o placeholder do campo de busca j\xE1
               \xE9 a dica visual; isso d\xE1 o mesmo texto pra quem usa leitor de
               tela, sem duplicar nada na tela pra quem enxerga. */
            .cw-sr-only {
                position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
                overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
            }

            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${se.border}; border-radius: 10px; background: ${se.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${se.blue}; box-shadow: 0 0 0 3px ${se.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${se.border}; border-radius: 10px; background: ${se.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${se.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${se.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${se.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${se.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item:focus-visible, .cw-acc-header:focus-visible { outline: 2px solid ${se.blue}; outline-offset: -2px; }
            .cw-task-item.selected { background: ${se.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${se.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${se.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS (Lista: quadrado) */
            .cw-step-btn-list {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${se.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn-list:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${se.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${se.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                visibility: hidden;
                box-shadow: ${se.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            /* .cw-zen-container usa overflow:visible (pros cards do hero n\xE3o
               cortarem sombra/hover), ent\xE3o sem visibility a barra "escondida"
               via transform continua sendo pintada logo abaixo do card,
               encostando/sobrepondo o que vem depois no layout. */
            .cw-status-bar.visible { transform: translateY(0); visibility: visible; }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${se.textMain}; }
            
            .cw-footer-icons { display: flex; flex-direction: row-reverse; padding-left: 8px; }
            .cw-mini-icon-status {
                width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;
                color: white; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 1px 2px rgba(0,0,0,0.15); position: relative; margin-left: -8px;
            }
            .cw-mini-icon-status svg { width: 12px; height: 12px; fill: currentColor; }

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
                transition: all 0.4s var(--cw-ease-decelerate);
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
                font-family: ${se.font}; font-size: 15px; font-weight: 600; color: ${se.textMain};
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
                border-color: ${se.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${se.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${se.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${se.brands.ads.color}; text-decoration: none; font-weight: 600; }
            .cw-info-link:hover { text-decoration: underline; }

            /* FOOTER ICONS (Limpo & Original) */
            .cw-mini-icon-screenshot {
                width: 26px; height: 26px; border-radius: 50%;
                background: #FFFFFF; border: 1px solid #E0E0E0;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                margin-left: -8px; position: relative; z-index: 1;
            }
            .cw-mini-icon-screenshot svg { width: 14px; height: 14px; }

            /* INPUTS (Campos de Link) */
            .cw-input-group { margin-bottom: 16px; position: relative; }
            .cw-input-group:last-child { margin-bottom: 0; }

            .cw-input-label {
                display: block; font-size: 11px; font-weight: 700; color: ${se.textSub};
                margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.8px;
            }

            .cw-input-field {
                width: 100%; box-sizing: border-box;
                padding: 12px 14px;
                border-radius: 12px;
                border: 1.5px solid #f1f3f4;
                background: #f8f9fa;
                font-size: 14px; color: #374151;
                transition: all 0.25s var(--cw-ease-decelerate); outline: none;
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
                transition: all 0.3s var(--cw-ease-spring);
                pointer-events: none;
            }
            .cw-input-field.filled + .cw-input-check { opacity: 1; transform: scale(1); }

            /* Esta \xE9 a etapa mais repetida do app inteiro (escolher a task do
               caso) e n\xE3o tinha nenhuma prote\xE7\xE3o de reduced-motion, apesar
               dos hero cards, do accordion e do "check verde" animarem
               transform em praticamente toda intera\xE7\xE3o. */
            @media (prefers-reduced-motion: reduce) {
                .cw-hero-card, .cw-hero-card:hover, .cw-hero-main, .cw-hero-stepper,
                .cw-task-item, .cw-acc-icon, .cw-status-bar, .cw-input-check {
                    transition: opacity 0.15s ease !important;
                    transform: none !important;
                }
                .cw-acc-group.open .cw-acc-body { animation: none !important; }
            }
        `,document.head.appendChild(I)}let c=document.createElement("div");c.className="cw-zen-container";let u=document.createElement("div");Object.assign(u.style,{display:"none"});let d=document.createElement("div");d.className="cw-screens-container",u.appendChild(d),c.innerHTML=`
        <div class="cw-zen-content">
            <div class="cw-hero-section">
                <div class="cw-section-subtitle js-hero-title" style="font-size:11px; font-weight:700; color:#6B7280; text-transform:uppercase; letter-spacing:0.8px;">${t("acesso_rapido")}</div>
                <div class="cw-hero-grid"></div>
                <div class="cw-helper-text">Atalhos para as implementa\xE7\xF5es mais frequentes.<br>Use a busca abaixo para o cat\xE1logo completo.</div>
            </div>

            <div class="cw-list-section">
                <div class="cw-search-wrapper">
                    <label class="cw-sr-only" for="cw-task-search-input">${t("buscar_catalogo")}</label>
                    <input id="cw-task-search-input" class="cw-search-input" placeholder="${t("buscar_catalogo")}">
                </div>
                <div class="cw-acc-container"></div>
                <div class="cw-results-container" style="display:none"></div>
            </div>
        </div>

        <div class="cw-status-bar">
            <div class="cw-status-text">0 a\xE7\xF5es definidas</div>
            <div class="cw-footer-icons"></div>
        </div>
    `;let h=c.querySelector(".cw-hero-grid"),f=c.querySelector(".cw-acc-container"),E=c.querySelector(".cw-results-container"),w=c.querySelector(".cw-search-input");mt(c,".cw-acc-header, .cw-task-item");let v=c.querySelector(".cw-status-bar"),x=c.querySelector(".cw-status-text"),z=c.querySelector(".cw-footer-icons");function B(I,q){return _=>{if(_.target.closest(".cw-step-btn-hero, .cw-step-btn-list"))return;let H=n[I]?n[I].count:0;N(I,H>0?-H:1,q)}}i.forEach(([I,q])=>{let _=a(q.name),H=document.createElement("div");H.className="cw-hero-card",H.id=`hero-${I}`,H.style.setProperty("--hero-color",_.color),H.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${We[_.icon]}</div>
                <div class="cw-hero-label">${q.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn-hero minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-hero plus">+</div>
            </div>
        `,H.onclick=B(I,q),H.querySelector(".minus").onclick=()=>N(I,-1,q),H.querySelector(".plus").onclick=()=>N(I,1,q),H.tabIndex=0,H.setAttribute("role","button"),H.setAttribute("aria-pressed","false"),H.addEventListener("keydown",j=>{(j.key==="Enter"||j.key===" ")&&(j.preventDefault(),H.click())}),H.dataset.color=_.color,h.appendChild(H)});function C(I,q){let _=a(q.name),H=document.createElement("div");return H.className="cw-task-item",H.dataset.id=I,H.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${_.bg}; color:${_.color}">
                    ${We[_.icon]||We.default}
                </div>
                <div class="cw-task-label">${q.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn-list minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-list plus">+</div>
            </div>
        `,H.onclick=B(I,q),H.querySelector(".minus").onclick=()=>N(I,-1,q),H.querySelector(".plus").onclick=()=>N(I,1,q),H.tabIndex=0,H.setAttribute("role","button"),H.setAttribute("aria-pressed","false"),H.setAttribute("aria-label",q.name),H.addEventListener("keydown",j=>{(j.key==="Enter"||j.key===" ")&&(j.preventDefault(),H.click())}),H}Object.entries(r).forEach(([I,q])=>{let _=document.createElement("div");_.className="cw-acc-group";let H=document.createElement("div");H.className="cw-acc-header",H.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${q.brand.color}"></div>
                ${I}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,H.tabIndex=0,H.setAttribute("role","button"),H.setAttribute("aria-expanded","false"),H.onclick=()=>{f.querySelectorAll(".cw-acc-group.open").forEach(D=>{D!==_&&(D.classList.remove("open"),D.querySelector(".cw-acc-header")?.setAttribute("aria-expanded","false"))});let L=_.classList.toggle("open");H.setAttribute("aria-expanded",String(L))},H.addEventListener("keydown",L=>{(L.key==="Enter"||L.key===" ")&&(L.preventDefault(),H.click())});let j=document.createElement("div");j.className="cw-acc-body",q.tasks.forEach(L=>{let D=C(L.key,L);j.appendChild(D)}),_.appendChild(H),_.appendChild(j),f.appendChild(_)});function N(I,q,_){n[I]||(n[I]={count:0,data:_,brand:a(_.name)}),n[I].count+=q,n[I].count<=0&&delete n[I],$(),W(),e&&e()}function $(){i.forEach(([j])=>{let L=h.querySelector(`#hero-${j}`);if(!L)return;let D=n[j];D?(L.classList.add("active"),L.setAttribute("aria-pressed","true"),L.querySelector(".cw-step-val").textContent=D.count,L.querySelector(".cw-step-val").style.color=L.dataset.color,L.classList.toggle("ts-success",$t(j,o))):(L.classList.remove("active"),L.setAttribute("aria-pressed","false"),L.classList.remove("ts-success"))}),c.querySelectorAll(".cw-task-item").forEach(j=>{let L=j.dataset.id,D=n[L];D?(j.classList.add("selected"),j.setAttribute("aria-pressed","true"),j.querySelector(".cw-step-val").textContent=D.count,j.classList.toggle("ts-success",$t(L,o))):(j.classList.remove("selected"),j.setAttribute("aria-pressed","false"),j.classList.remove("ts-success"))});let q=Object.keys(n),_=0,H=[];if(q.forEach(j=>{let L=n[j];_+=L.count;for(let D=0;D<L.count;D++)H.length<6&&H.push(L.brand)}),_>0){v.classList.add("visible");let j=_>1?"A\xE7\xF5es":"A\xE7\xE3o",L=_>1?"definidas":"definida";x.textContent=`${_} ${j} ${L}`,z.innerHTML="",H.forEach(D=>{let ee=document.createElement("div");ee.className="cw-mini-icon-status",ee.innerHTML=We[D.icon]||We.default;let te=ee.querySelector("svg");te&&(te.style.width="14px",te.style.height="14px"),z.appendChild(ee)})}else v.classList.remove("visible"),x.textContent="",z.innerHTML=""}w.addEventListener("input",I=>{let q=I.target.value.toLowerCase();if(q.length>0){f.style.display="none",E.style.display="block",E.innerHTML="";let _=!1;Object.entries(Me).forEach(([H,j])=>{if(j.name.toLowerCase().includes(q)){_=!0;let L=C(H,j);n[H]&&(L.classList.add("selected"),L.setAttribute("aria-pressed","true"),L.querySelector(".cw-step-val").textContent=n[H].count),E.appendChild(L)}}),_||(E.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else f.style.display="block",E.style.display="none"});function W(){let I={};d.querySelectorAll(".cw-input-field").forEach(j=>{I[j.id]=j.value}),d.innerHTML="";let q=Object.keys(n),_=!1;if(q.length===0){d.appendChild(tt({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>',title:t("selecione_tarefas")})),u.style.display="none";return}let H=document.createElement("div");H.className="cw-info-banner",H.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,d.appendChild(H),q.forEach(j=>{let L=n[j].data,D=n[j].count,ee=n[j].brand,te=$t(j,o),ae=o.screenshotMode||"implementation",Z=L.screenshots?.[ae]||[];if(Z.length>0||te){_=!0;for(let K=1;K<=D;K++){let U=document.createElement("div");U.className="cw-screen-card",te&&U.classList.add("ts-success"),U.style.setProperty("--brand-color",ee.color),U.style.setProperty("--brand-bg",ee.bg),U.style.setProperty("--brand-shadow",ee.color+"40");let oe=document.createElement("div");oe.className="cw-card-header";let X=document.createElement("div");X.className="cw-card-icon",X.innerHTML=We[ee.icon]||We.default;let J=document.createElement("div");J.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let F=document.createElement("input");F.className="cw-card-title-input",F.id=`name-${j}-${K}`,F.value=`${L.name}${D>1?" #"+K:""}`,F.title="Clique para renomear esta task";let l=document.createElement("span");if(l.className="cw-edit-hint",l.innerHTML="\u270E Renomear",J.appendChild(F),J.appendChild(l),oe.appendChild(X),oe.appendChild(J),U.appendChild(oe),te){let b=document.createElement("div");b.className="cw-ts-disclaimer-box",b.innerHTML=`
                <span>${t("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${t("incluir_mesmo_assim")}</button>
            `,b.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(j,!0)},U.appendChild(b)}else Z.forEach((b,p)=>{let S=document.createElement("div");S.className="cw-input-group";let m=document.createElement("label");m.className="cw-input-label",m.textContent=b;let A=document.createElement("input");A.className="cw-input-field",A.id=`screen-${j}-${K}-${p}`,A.placeholder="Cole o link aqui...",A.setAttribute("autocomplete","off"),I[A.id]&&(A.value=I[A.id],A.value.trim().length>5&&A.classList.add("filled")),A.addEventListener("input",()=>{A.value.trim().length>5?A.classList.add("filled"):A.classList.remove("filled")});let y=document.createElement("div");y.className="cw-input-check",y.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',S.appendChild(m),S.appendChild(A),S.appendChild(y),U.appendChild(S)});d.appendChild(U)}}}),u.style.display=_?"block":"none"}return{selectionElement:c,screenshotsElement:u,updateSubStatus:()=>W(),getCheckedElements:()=>Object.keys(n).map(I=>({value:I,count:n[I].count})),setTaskCount:(I,q)=>{n[I]&&delete n[I],q>0&&Me[I]&&N(I,q,Me[I])},toggleTask:(I,q=!0)=>{let _=n[I];q&&!_?N(I,1,Me[I]):!q&&_&&N(I,-_.count,Me[I])},setLanguage:I=>{t=I;let q=c.querySelector(".js-hero-title");q&&(q.textContent=t("acesso_rapido"));let _=c.querySelector(".cw-search-input");_&&(_.placeholder=t("buscar_catalogo")),W()},reset:()=>{for(let I in n)delete n[I];w.value="",f.style.display="block",E.style.display="none",$(),W()}}}var Ha={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},Ga={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},ja={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},Ua={display:"flex",gap:"20px",marginBottom:"12px"};function _o(e){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,Ha);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=e("utilizou_tag_support"),Object.assign(o.style,_t,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,Ua);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="Sim",Object.assign(a.style,Rt);let i=document.createElement("label");i.textContent="Sim";let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(a),r.appendChild(i);let s=document.createElement("input");s.type="radio",s.name="ts_usage_mod",s.value="N\xE3o",s.checked=!0,Object.assign(s.style,Rt);let c=document.createElement("label");c.textContent="N\xE3o";let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center"}),u.appendChild(s),u.appendChild(c),n.appendChild(r),n.appendChild(u);let d=document.createElement("div");d.style.display="block";let h=document.createElement("label");h.className="js-ts-reason-label",h.textContent=e("motivo_ts"),Object.assign(h.style,_t,{fontSize:"12px"});let f=document.createElement("input");f.type="text",Object.assign(f.style,ja);let E=document.createElement("div");E.className="js-ts-warning",E.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(E.style,Ga),d.appendChild(h),d.appendChild(f),d.appendChild(E),t.appendChild(o),t.appendChild(n),t.appendChild(d),a.onchange=()=>{k.playClick(),d.style.display="none",V.setTagSupportUsed(!0)},s.onchange=()=>{k.playClick(),d.style.display="block",V.setTagSupportUsed(!1)};function w(B,C){if(t.style.display="none",!B||!C||C.length===0)return;C.some($=>$==="ads_conversion_tracking"||$==="ads_enhanced_conversions")?t.style.display="block":(z(),V.setTagSupportUsed(!1))}function v(){if(t.style.display==="none")return"";let B=`<br><b>Utilizou Tag Support?</b> ${a.checked?"\u2705 Sim":"\u274C N\xE3o"}`;return s.checked&&f.value.trim()!==""&&(B+=`<br><b>Motivo:</b> ${f.value}`),B+="<br>",B}function x(B){e=B,o.textContent=e("utilizou_tag_support"),h.textContent=e("motivo_ts"),E.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function z(){t.style.display="none",s.checked=!0,a.checked=!1,d.style.display="block",f.value=""}return{element:t,updateVisibility:w,getOutput:v,setLanguage:x,reset:z}}var Pt="cw_notes_parking_lot",wt="cw_notes_emergency_save";var Te={getAll:()=>{try{return JSON.parse(localStorage.getItem(Pt)||"[]")}catch{return[]}},save:e=>{let t=Te.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...e};return t.unshift(o),t.length>5&&t.pop(),localStorage.setItem(Pt,JSON.stringify(t)),o},delete:e=>{let t=Te.getAll();return t=t.filter(o=>o.id!==e),localStorage.setItem(Pt,JSON.stringify(t)),t},getCount:()=>Te.getAll().length,saveEmergency:e=>{let t={timestamp:Date.now(),data:e};localStorage.setItem(wt,JSON.stringify(t))},getEmergency:()=>{try{let e=localStorage.getItem(wt);if(!e)return null;let t=JSON.parse(e);return Date.now()-t.timestamp>432e5?(localStorage.removeItem(wt),null):!t.data||!t.data.subStatus?null:t.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(wt)}};var St=["lucaste","ricardogi"];var Do="cw_case_streak_v1",Va=[5,10,15,20,25,30,40,50];function zo(){let e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}function Ht(){try{let e=JSON.parse(localStorage.getItem(Do)||"{}");return e.date===zo()&&e.count||0}catch{return 0}}function Ro(){let e=Ht()+1;try{localStorage.setItem(Do,JSON.stringify({date:zo(),count:e}))}catch{}return{count:e,isMilestone:Va.includes(e)}}var pe={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"};function Et(e){let t=document.getElementById("cw-btn-notes");if(!t)return;let o=t.querySelector(".cw-dot-dirty");e?o||(o=document.createElement("div"),o.className="cw-dot-dirty",t.appendChild(o)):o&&o.remove()}function Bo(){let e=document.getElementById("cw-streak-badge"),t=document.getElementById("cw-streak-count");if(!e||!t)return;let o=Ht();t.textContent=o,e.classList.toggle("visible",o>0);let n=document.querySelector(".cw-pill");n&&(n.classList.toggle("has-streak",o>0),n.classList.toggle("streak-tier-2",o>=5&&o<15),n.classList.toggle("streak-tier-3",o>=15&&o<30),n.classList.toggle("streak-tier-4",o>=30))}function $o(){let{count:e,isMilestone:t}=Ro();if(Bo(),t){let o=document.querySelector(".cw-pill");k.playSuccess(),o&&So(o),Y(`\u{1F525} ${e} casos hoje!`)}}function Po(e,t){let o="cw-command-center-style";if(!document.getElementById(o)){let C=document.createElement("style");C.id=o,C.innerHTML=`
            /* Google Sans (400/500/700) j\xE1 vem via <link> em initGlobalStylesAndFont()
               (utils.js), que roda antes de qualquer m\xF3dulo inicializar - esse @import
               era uma segunda requisi\xE7\xE3o redundante e bloqueava o parse do CSSOM. */

            .cw-focus-backdrop {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
                z-index: 2147483646; opacity: 0; pointer-events: none;
                transition: opacity 0.3s ease;
            }
            .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

            /* --- PILL PRINCIPAL --- */
            .cw-pill {
                position: fixed; bottom: 10%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 14px;
                padding: 18px 8px;
                
                background: ${pe.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${pe.glassBorder}; border-radius: 50px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 2147483647;
                
                opacity: 0;
                width: 56px;
                height: auto;
                /* \xDAnico elemento persistente do app que anima quase o tempo
                   todo (hover em 9 bot\xF5es, abrir/fechar, drag) - \xFAnico caso
                   onde will-change est\xE1tico (em vez de ligar/desligar por
                   intera\xE7\xE3o) compensa, j\xE1 que \xE9 sempre 1 elemento s\xF3. */
                will-change: transform, opacity, width, height;

                overflow: visible;

                /* ABRIR: A p\xEDlula expande PRIMEIRO. Curva de entrada
                   (--cw-ease-decelerate) - mesma usada pelo genie dos m\xF3dulos,
                   pra parar de ser a \xFAnica transi\xE7\xE3o do app na curva
                   "standard" sem dire\xE7\xE3o. (max-height saiu da lista: o estado
                   aberto nunca define um valor num\xE9rico pra ela, ent\xE3o ia de
                   /para "none" - n\xE3o interpol\xE1vel, a transi\xE7\xE3o n\xE3o fazia nada.
                   "height" entra no lugar dela, mas s\xF3 funciona porque \xE9
                   primado via JS com um valor em px medido de verdade
                   (openPill(), abaixo) - "auto" tamb\xE9m n\xE3o \xE9 interpol\xE1vel, e
                   height \xE9 a dimens\xE3o que mais muda ao abrir.) */
                transition:
                    width 0.3s var(--cw-ease-decelerate),
                    height 0.3s var(--cw-ease-decelerate),
                    padding 0.3s var(--cw-ease-decelerate),
                    opacity 0.2s ease,
                    transform 0.3s var(--cw-ease-decelerate);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill { transition: opacity 0.2s ease !important; transform: none !important; }
            }

            /* --- SURGIMENTO (primeiro boot) --- */
            /* Antes era s\xF3 um fade de opacity (praticamente impercept\xEDvel).
               Agora a p\xEDlula chega com peso: sobe, d\xE1 um leve overshoot
               (--cw-ease-spring) e assenta - acompanhado de SoundManager.playReady(). */
            @keyframes cw-pill-arrive {
                from { opacity: 0; transform: translateY(28px) scale(0.4); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            .cw-pill.arriving {
                animation: cw-pill-arrive 0.6s var(--cw-ease-spring) forwards;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.arriving { animation: fadeIn 0.3s ease forwards; }
            }

            /* --- ESTADO COLAPSADO (FECHANDO) --- */
            .cw-pill.collapsed {
                width: 50px !important;
                height: 50px !important;
                padding: 0 !important;
                gap: 0 !important;
                border-radius: 50% !important;
                cursor: pointer;

                overflow: hidden !important;

                /* FECHAR: A p\xEDlula s\xF3 come\xE7a a colapsar depois que a cascata
                   de sa\xEDda dos \xEDcones termina (delay 0.38s - o \xFAltimo \xEDcone,
                   o Grip, j\xE1 come\xE7ou a sumir em 0.20s e leva mais 0.2s pra
                   terminar; ver CASCATA DE SA\xCDDA abaixo). Antes era um delay
                   fixo de 0.15s, pensado pra quando todo o conte\xFAdo sumia de
                   uma vez s\xF3 - com a cascata isso deixava a c\xE1psula
                   encolhendo por baixo de \xEDcones que ainda estavam saindo.
                   O logo (ver .cw-pill.collapsed .cw-main-logo abaixo) usa o
                   mesmo delay, pra aparecer no instante exato em que a
                   c\xE1psula come\xE7a a encolher.
                   width/padding/border-radius/transform usam
                   --cw-ease-accelerate, espelhando --cw-ease-decelerate da
                   abertura acima - cursos pequenos (poucos px), ent\xE3o a
                   "chegada r\xE1pida" do accelerate n\xE3o incomoda.
                   "height" \xE9 a exce\xE7\xE3o: em vez de max-height (n\xE3o
                   interpol\xE1vel de/para "none", s\xF3 pulava pro valor final -
                   por isso tinha sa\xEDdo da lista de transi\xE7\xE3o), agora \xE9
                   primada via JS com um valor em px real (collapsePill()).
                   E usa --cw-ease-elastic, n\xE3o --cw-ease-accelerate: o curso
                   \xE9 grande (pode passar de 500px), e uma curva que "acelera
                   at\xE9 o fim" nesse tamanho de percurso l\xEA como a p\xEDlula
                   caindo com for\xE7a no c\xEDrculo final - exatamente a
                   brutalidade que devia sumir. --cw-ease-elastic desacelera
                   suavemente at\xE9 o alvo, sem overshoot (que, na mesma
                   dist\xE2ncia, faria a p\xEDlula encolher quase at\xE9 sumir antes
                   de voltar). */
                transition:
                    width 0.3s var(--cw-ease-accelerate) 0.38s,
                    height 0.3s var(--cw-ease-elastic) 0.38s,
                    padding 0.3s var(--cw-ease-accelerate) 0.38s,
                    border-radius 0.3s var(--cw-ease-accelerate) 0.38s,
                    opacity 0.2s ease 0s,
                    transform 0.3s var(--cw-ease-accelerate) 0.38s !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.collapsed { transition: opacity 0.2s ease !important; }
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
            /* Duas camadas de SVG empilhadas (base branca + spark com
               gradiente j\xE1 embutido no pr\xF3prio <linearGradient>) que fazem
               cross-fade de opacidade no hover - troca real e anim\xE1vel, em
               vez do mask/background-image de antes: essas duas propriedades
               n\xE3o s\xE3o interpol\xE1veis em CSS, ent\xE3o a cor "estalava" no meio
               de um scale que era o \xFAnico peda\xE7o realmente animando. */
            .cw-main-logo svg { position: absolute; inset: 0; margin: auto; width: 24px; height: 24px; pointer-events: none; }
            .cw-main-logo .cw-logo-base { fill: #fff; opacity: 1; transition: opacity 0.25s var(--cw-ease-standard); }
            .cw-main-logo .cw-logo-spark { opacity: 0; transition: opacity 0.25s var(--cw-ease-standard); }
            @media (prefers-reduced-motion: reduce) {
                .cw-main-logo .cw-logo-base, .cw-main-logo .cw-logo-spark { transition: opacity 0.15s ease !important; }
            }

            .cw-pill:not(.collapsed) .cw-main-logo {
                transform: rotate(360deg) scale(0);
                opacity: 0;
                transition: opacity 0.2s var(--cw-ease-accelerate), transform 0.2s var(--cw-ease-accelerate);
            }
            .cw-pill.collapsed .cw-main-logo {
                opacity: 1;
                transform: rotate(0) scale(1);
                /* Aparece no mesmo instante em que a c\xE1psula come\xE7a a
                   encolher (delay 0.38s, ver .cw-pill.collapsed acima - s\xF3
                   depois que a cascata de sa\xEDda dos \xEDcones termina). */
                transition: opacity 0.3s var(--cw-ease-decelerate) 0.38s, transform 0.3s var(--cw-ease-decelerate) 0.38s;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill:not(.collapsed) .cw-main-logo,
                .cw-pill.collapsed .cw-main-logo { transition: opacity 0.15s ease !important; transform: none !important; }
            }
            .cw-pill.collapsed:hover .cw-main-logo {
                transform: scale(1.15) rotate(0deg);
                transition-delay: 0s;
            }
            .cw-pill.collapsed:hover .cw-main-logo .cw-logo-base { opacity: 0; }
            .cw-pill.collapsed:hover .cw-main-logo .cw-logo-spark { opacity: 1; }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.collapsed:hover .cw-main-logo { transform: none !important; }
            }

            /* Halo quente atr\xE1s do raio quando h\xE1 streak do dia, s\xF3 na
               bolinha fechada (j\xE1 que o badge com o n\xFAmero n\xE3o aparece mais
               a\xED - ver .cw-streak-badge). Intensifica junto dos mesmos
               patamares do toast de marco (5/15/30, ver MILESTONES). */
            .cw-pill.collapsed.has-streak .cw-main-logo { filter: drop-shadow(0 0 6px rgba(253, 214, 99, 0.5)); transition: filter 0.3s ease; }
            .cw-pill.collapsed.streak-tier-2 .cw-main-logo { filter: drop-shadow(0 0 6px rgba(251, 188, 5, 0.55)); }
            .cw-pill.collapsed.streak-tier-3 .cw-main-logo { filter: drop-shadow(0 0 7px rgba(249, 171, 0, 0.6)); }
            .cw-pill.collapsed.streak-tier-4 .cw-main-logo { filter: drop-shadow(0 0 8px rgba(234, 67, 53, 0.65)); }

            /* --- CONTE\xDADO INTERNO --- */
            .cw-pill > *:not(.cw-main-logo) {
                opacity: 1; transform: scale(1) translateY(0); visibility: visible;
                /* Aparece depois que a p\xEDlula expandiu (delay 0.15s), com um
                   leve "pop" el\xE1stico (--cw-ease-spring) em vez de um scale
                   linear seco - d\xE1 a coreografia que faltava na abertura. */
                transition:
                    opacity 0.25s ease 0.15s,
                    transform 0.3s var(--cw-ease-spring) 0.15s,
                    visibility 0s linear 0.15s,
                    filter 0.15s ease 0.15s;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill > *:not(.cw-main-logo) { transition: opacity 0.2s ease 0.1s !important; transform: none !important; }
            }

            .cw-pill.collapsed > *:not(.cw-main-logo) {
                opacity: 0; pointer-events: none; visibility: hidden;
                transform: scale(0.5); filter: blur(8px);
                /* Dura\xE7\xE3o base (0s de delay aqui) - cada \xEDcone ganha seu
                   pr\xF3prio delay individual logo abaixo, na cascata de sa\xEDda,
                   ent\xE3o esse "0s" s\xF3 vale pra quem n\xE3o tiver um delay mais
                   espec\xEDfico. Dura\xE7\xE3o subiu de 0.15s pra 0.2s (respiro maior
                   por \xEDcone, n\xE3o s\xF3 um corte seco). */
                transition:
                    opacity 0.2s var(--cw-ease-accelerate) 0s,
                    transform 0.2s var(--cw-ease-accelerate) 0s,
                    filter 0.2s ease 0s,
                    visibility 0s linear 0s;
            }

            /* --- CASCATAS DE ENTRADA ---
               \xCDndices recalculados pro DOM atual (admin-tag e streak-badge
               entraram no meio do markup depois que isso foi escrito
               originalmente, empurrando todo mundo 2 posi\xE7\xF5es - a lista
               antiga estava aplicando o delay do "Grip" no .cw-main-logo, o
               do "Notes" no admin-tag, etc. Efeito colateral: o logo ganhava
               um delay de abertura de 0.15s que n\xE3o devia existir (ver
               .cw-pill:not(.collapsed) .cw-main-logo acima, que quer delay
               0). admin-tag/streak-badge saem da lista de prop\xF3sito: cada
               um j\xE1 tem sua pr\xF3pria transi\xE7\xE3o dedicada. */
            .cw-pill:not(.collapsed) > *:nth-child(5) { transition-delay: 0.15s; } /* Grip */
            .cw-pill:not(.collapsed) > *:nth-child(6) { transition-delay: 0.17s; } /* Notes */
            .cw-pill:not(.collapsed) > *:nth-child(7) { transition-delay: 0.19s; } /* BAU Form */
            .cw-pill:not(.collapsed) > *:nth-child(8) { transition-delay: 0.21s; } /* Email */
            .cw-pill:not(.collapsed) > *:nth-child(9) { transition-delay: 0.23s; } /* Script */
            .cw-pill:not(.collapsed) > *:nth-child(10) { transition-delay: 0.25s; } /* Links */
            .cw-pill:not(.collapsed) > *:nth-child(11) { transition-delay: 0.27s; } /* Library */
            .cw-pill:not(.collapsed) > *:nth-child(12) { transition-delay: 0.29s; } /* Timezone */
            .cw-pill:not(.collapsed) > *:nth-child(13) { transition-delay: 0.31s; } /* Configs */
            .cw-pill:not(.collapsed) > *:nth-child(14) { transition-delay: 0.33s; } /* Sep */
            .cw-pill:not(.collapsed) > *:nth-child(15) { transition-delay: 0.35s; } /* Broadcast */

            /* --- CASCATA DE SA\xCDDA ---
               Antes todo o conte\xFAdo sumia de uma vez s\xF3 (delay 0s pra todo
               mundo) - os 9 bot\xF5es se sobrepunham num \xFAnico flash em vez de
               cada um ter seu pr\xF3prio momento. Agora sai em cascata reversa
               (o \xFAltimo a aparecer na abertura \xE9 o primeiro a sumir no
               fechamento - o mesmo "unwind" de um z\xEDper fechando de baixo
               pra cima), com folga suficiente entre cada um pra dar tempo de
               respirar antes da c\xE1psula (que s\xF3 come\xE7a a encolher depois -
               ver .cw-pill.collapsed acima) entrar em cena. */
            .cw-pill.collapsed > *:nth-child(15) { transition-delay: 0s; }    /* Broadcast */
            .cw-pill.collapsed > *:nth-child(14) { transition-delay: 0.02s; } /* Sep */
            .cw-pill.collapsed > *:nth-child(13) { transition-delay: 0.04s; } /* Configs */
            .cw-pill.collapsed > *:nth-child(12) { transition-delay: 0.06s; } /* Timezone */
            .cw-pill.collapsed > *:nth-child(11) { transition-delay: 0.08s; } /* Library */
            .cw-pill.collapsed > *:nth-child(10) { transition-delay: 0.10s; } /* Links */
            .cw-pill.collapsed > *:nth-child(9)  { transition-delay: 0.12s; } /* Script */
            .cw-pill.collapsed > *:nth-child(8)  { transition-delay: 0.14s; } /* Email */
            .cw-pill.collapsed > *:nth-child(7)  { transition-delay: 0.16s; } /* BAU Form */
            .cw-pill.collapsed > *:nth-child(6)  { transition-delay: 0.18s; } /* Notes */
            .cw-pill.collapsed > *:nth-child(5)  { transition-delay: 0.20s; } /* Grip */

            /* --- ESTILOS DOS BOT\xD5ES --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${pe.iconIdle};
                flex-shrink: 0;
                transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn { transition: background 0.2s ease, color 0.2s ease !important; }
            }
            .cw-btn:hover {
                background: ${pe.glassHighlight};
                color: ${pe.iconActive};
                /* S\xF3 scale (cresce do centro), sem translateY: bot\xF5es redondos
                   colados lado a lado numa fileira \xFAnica - um lift vertical
                   \xE9 o caso cl\xE1ssico de flicker quando o mouse passa raspando
                   a borda entre dois \xEDcones adjacentes. */
                transform: scale(1.18) !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn:hover { transform: none !important; }
            }

            .cw-btn.notes.active { color: ${pe.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${pe.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${pe.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${pe.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${pe.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${pe.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${pe.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${pe.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${pe.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${pe.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${pe.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${pe.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${pe.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${pe.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${pe.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${pe.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${pe.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

            .cw-btn::before {
                content: ''; position: absolute; bottom: 2px; left: 50%; width: 4px; height: 4px; border-radius: 50%;
                background-color: currentColor; box-shadow: 0 0 6px currentColor;
                transform: translateX(-50%) scale(0); opacity: 0; visibility: hidden;
                transition: transform 0.2s, opacity 0.2s; pointer-events: none;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn::before { transition: opacity 0.2s ease !important; transform: translateX(-50%) !important; }
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
            @media (prefers-reduced-motion: reduce) {
                .cw-btn::after { transition: opacity 0.2s ease !important; }
                .cw-btn:hover::after { transform: translateY(-50%) !important; }
            }
            .cw-pill.side-right .cw-btn::after { right: 55px; transform-origin: right center; }
            .cw-pill.side-left .cw-btn::after { left: 55px; transform-origin: left center; }

            .cw-badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #d93025; border-radius: 50%; border: 1px solid #fff; pointer-events: none; box-shadow: 0 1px 2px rgba(0,0,0,0.2); z-index: 10; animation: popIn 0.3s; }
            @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

            .cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.2); margin: 4px 0; }
            .cw-sep.visible { opacity: 1; }
            .cw-pill.collapsed .cw-sep { opacity: 0; transition: opacity 0.1s ease 0s; }

            .cw-grip { width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; cursor: grab; margin-bottom: 2px; }
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${pe.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            @media (prefers-reduced-motion: reduce) {
                .cw-grip:hover .cw-grip-bar { transform: none !important; }
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${pe.blue}; width: 16px; opacity: 1; }

            .cw-pill.dragging {
                box-shadow:
                    0 8px 32px rgba(0,0,0,0.3),
                    0 0 20px rgba(138, 180, 248, 0.4);
                filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
                transform: scale(1.02) !important;
                transition: box-shadow 0.2s ease, filter 0.2s ease, transform 0.2s ease !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.dragging { transform: none !important; }
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
                /* Liquid Glass, igual ao resto da pill (COLORS.glassBg + blur) -
                   antes era um preenchimento opaco (#202124) sem backdrop-filter,
                   uma "laje preta" destoando do resto do sistema visual. */
                background: rgba(32, 33, 36, 0.82) !important;
                backdrop-filter: blur(24px) saturate(160%) !important;
                -webkit-backdrop-filter: blur(24px) saturate(160%) !important;
                border: 1px solid ${pe.glassBorder} !important;
                padding: 32px 24px !important;
                box-shadow: 0 24px 64px rgba(0,0,0,0.45) !important;
                display: flex !important; flex-direction: column !important;
                justify-content: center !important; align-items: center !important;
                gap: 0 !important;
                z-index: 2147483647 !important;
            }
            .cw-pill.processing-center.collapsed { background: rgba(32, 33, 36, 0.82) !important; overflow: visible !important; }
            .cw-pill.processing-center .cw-main-logo { display: none !important; }
            .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }

            .cw-center-stage {
                display: flex; flex-direction: column; align-items: center;
                gap: 20px;
                width: 100%; opacity: 0;
                animation: fadeIn 0.3s ease forwards 0.1s;
                position: relative;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-center-stage { animation: fadeIn 0.3s ease forwards; }
            }

            .cw-center-dots { display: flex; gap: 10px; margin-bottom: 4px; }
            /* Coreografia pr\xF3pria (era um "googleBounce" gen\xE9rico, ease-in-out puro):
               usa a curva spring j\xE1 can\xF4nica do audit de motion (--cw-ease-spring)
               pra um overshoot vivo, e soma um scale pulse ao bounce vertical. */
            .cw-center-dots span {
                width: 8px; height: 8px; border-radius: 50%;
                animation: cw-dot-dance 1.1s var(--cw-ease-spring) infinite both;
                will-change: transform;
            }
            .cw-center-dots span:nth-child(1) { background-color: ${pe.blue}; animation-delay: -0.22s; }
            .cw-center-dots span:nth-child(2) { background-color: ${pe.red}; animation-delay: -0.11s; }
            .cw-center-dots span:nth-child(3) { background-color: ${pe.green}; }
            @media (prefers-reduced-motion: reduce) {
                /* Antes n\xE3o tinha fallback nenhum - as bolinhas ficavam
                   quicando pra sempre mesmo com reduced-motion ativado. */
                .cw-center-dots span { animation: cw-dot-fade 1.6s ease-in-out infinite; }
            }
            
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
                animation: textSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                animation-delay: 0.1s;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-center-text { animation: fadeIn 0.3s ease forwards; transform: none !important; }
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
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                z-index: 20;
                white-space: nowrap;
            }
            .cw-pill:not(.collapsed) .cw-admin-badge.visible {
                transform: translateX(-50%) scale(1);
            }

            /* --- RITMO DO TURNO (contador de casos hoje) --- */
            /* S\xF3 aparece com a p\xEDlula ABERTA - \xE9 um indicador de contexto (tem
               espa\xE7o pro n\xFAmero, n\xE3o corta em overflow:hidden), n\xE3o uma
               notifica\xE7\xE3o que precise brigar pela aten\xE7\xE3o na bolinha fechada.
               Segue a regra geral de "esconder no collapsed" (seletor l\xE1 em
               cima) como qualquer outro conte\xFAdo interno; o que sobra aqui \xE9
               s\xF3 o gate extra de "s\xF3 se tiver streak" pro estado aberto -
               mesmo formato de .cw-admin-badge.visible logo acima, que j\xE1
               resolve esse specificity certo. */
            .cw-streak-badge {
                position: absolute; top: -6px; right: -6px;
                background: #202124; color: #FDD663;
                font-size: 10px; font-weight: 800;
                padding: 3px 7px; border-radius: 100px;
                display: flex; align-items: center; gap: 3px;
                border: 1px solid rgba(255,255,255,0.15);
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                pointer-events: none; z-index: 25;
                transition: opacity 0.2s ease, transform 0.2s var(--cw-ease-spring), color 0.3s ease;
            }
            .cw-pill:not(.collapsed) .cw-streak-badge:not(.visible) { opacity: 0; transform: scale(0.5); }
            .cw-pill:not(.collapsed) .cw-streak-badge.visible { opacity: 1; transform: scale(1); }
            @media (prefers-reduced-motion: reduce) {
                .cw-streak-badge { transition: opacity 0.15s ease !important; transform: none !important; }
            }
            /* Temperatura da chama sobe com o count - mesmos patamares do
               MILESTONES (5/15/30) que j\xE1 disparam o toast de marco. */
            .cw-pill.streak-tier-2 #cw-streak-count { color: #FBBC05; }
            .cw-pill.streak-tier-3 #cw-streak-count { color: #F9AB00; }
            .cw-pill.streak-tier-4 #cw-streak-count { color: #EA4335; }

            .cw-center-success { display: none; color: ${pe.green}; margin-bottom: 10px; }
            .cw-center-success svg { width: 48px; height: 48px; }
            .cw-center-success.show { display: block; animation: popIn 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            @media (prefers-reduced-motion: reduce) {
                .cw-center-success.show { animation: fadeIn 0.3s ease forwards; }
            }
            
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
            @keyframes cw-dot-dance { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.2); } }
            @keyframes cw-dot-fade { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
            @keyframes textSlideUp { to { opacity: 1; transform: translateY(0); } }
        `,document.head.appendChild(C)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg class="cw-logo-base" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',mainSpark:'<svg class="cw-logo-spark" viewBox="0 0 24 24"><defs><linearGradient id="cw-spark-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4285F4"/><stop offset="33%" stop-color="#EA4335"/><stop offset="66%" stop-color="#FBBC05"/><stop offset="100%" stop-color="#34A853"/></linearGradient></defs><path fill="url(#cw-spark-grad)" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},a=document.createElement("div");a.id="cw-floating-trigger",a.className="cw-pill side-right collapsed",a.innerHTML=`
        <div id="cw-command-center" style="display:none;"></div>
        <div class="cw-main-logo" title="Busca r\xE1pida: Ctrl/Cmd+K">${n.main}${n.mainSpark}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>
        <div id="cw-streak-badge" class="cw-streak-badge" title="Casos conclu\xEDdos hoje">\u{1F525} <span id="cw-streak-count">0</span></div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${n.notes}</button>
        <button class="cw-btn bauform" id="cw-btn-bauform" data-label="BAU Form">${n.bauform}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Email Assistant">${n.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${n.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${n.links}</button>
        <button class="cw-btn library" id="cw-btn-library" data-label="My Library">${n.library}</button>
        <button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${n.timezone}</button>
        <button class="cw-btn configs" id="cw-btn-configs" data-label="Configura\xE7\xF5es">${n.configs}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${n.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${n.check}</div>
        </div>
    `;let i=document.createElement("div");i.className="cw-focus-backdrop",document.body.appendChild(i),document.body.appendChild(a),Bo();let r=(C,N)=>{k.playClick(),a.querySelector(`.${C}`).classList.toggle("active"),N()};if(a.querySelector(".notes").onclick=C=>{C.stopPropagation(),r("notes",e.toggleNotes)},a.querySelector(".bauform").onclick=C=>{C.stopPropagation(),r("bauform",e.toggleBAUForm)},a.querySelector(".email").onclick=C=>{C.stopPropagation(),r("email",e.toggleEmail)},a.querySelector(".script").onclick=C=>{C.stopPropagation(),r("script",e.toggleScript)},a.querySelector(".links").onclick=C=>{C.stopPropagation(),r("links",e.toggleLinks)},a.querySelector(".library").onclick=C=>{C.stopPropagation(),r("library",e.toggleLibrary)},a.querySelector(".timezone").onclick=C=>{C.stopPropagation(),r("timezone",e.toggleTimezone)},a.querySelector(".configs").onclick=C=>{C.stopPropagation(),r("configs",e.toggleConfigs)},a.querySelector(".broadcast").onclick=C=>{C.stopPropagation(),r("broadcast",()=>{let N=C.currentTarget.querySelector(".cw-badge");N&&N.remove(),e.broadcastControl&&e.broadcastControl.toggle()})},a.querySelectorAll(".cw-btn").forEach(C=>{C.addEventListener("mouseenter",()=>k.playHover())}),e.broadcastControl&&e.broadcastControl.hasUnread){let C=document.createElement("div");C.className="cw-badge",a.querySelector(".broadcast").appendChild(C)}let s=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function c(){if(s()){a.classList.remove("collapsed"),k.playGenieOpen();return}let C=a.getBoundingClientRect(),N=window.innerHeight,$=C.top>N/2,W=C.height;a.style.setProperty("transition","none","important"),a.classList.remove("collapsed");let I=a.scrollHeight;if(a.classList.add("collapsed"),a.style.height=`${W}px`,$){let q=N-C.bottom;a.style.top="auto",a.style.bottom=`${q}px`}else a.style.bottom="auto",a.style.top=`${C.top}px`;a.style.overflow="hidden",a.offsetWidth,a.style.removeProperty("transition"),a.classList.remove("collapsed"),a.style.height=`${I}px`,k.playGenieOpen(),setTimeout(()=>{a.style.height="",a.style.overflow=""},350)}function u(C=!0){if(a.classList.contains("collapsed"))return;if(s()){a.classList.add("collapsed"),C&&k.playSwoosh();return}let N=a.getBoundingClientRect().height;a.style.setProperty("transition","none","important"),a.style.height=`${N}px`,a.offsetWidth,a.style.removeProperty("transition"),a.classList.add("collapsed"),a.style.height="50px",C&&k.playSwoosh(),setTimeout(()=>{a.style.height=""},700)}let d=null;a.onmouseleave=()=>{a.classList.contains("processing-center")||(d=setTimeout(()=>{a.querySelector(".cw-btn.active")||u()},3e3))},a.onmouseenter=()=>{d&&clearTimeout(d)},(async function(){let N=()=>{let $=ye();if($){let W=$.split("@")[0].toLowerCase();if(St.includes(W)){let I=a.querySelector("#cw-admin-tag");I&&I.classList.add("visible")}}else setTimeout(N,2e3)};if(N(),t&&typeof t.then=="function"){try{await t}catch{}await ie(150)}else await ie(2800);a.classList.add("arriving"),k.playReady(),a.querySelectorAll(".cw-sep").forEach($=>$.classList.add("visible"))})();let h=!1,f,E,w,v,x=3;a.onmousedown=C=>{if(C.target.closest("button"))return;C.preventDefault(),f=C.clientX,E=C.clientY;let N=a.getBoundingClientRect();w=N.left,v=N.top,document.addEventListener("mousemove",z),document.addEventListener("mouseup",B)};function z(C){let N=C.clientX-f,$=C.clientY-E;!h&&Math.sqrt(N*N+$*$)>x&&(h=!0,a.classList.add("dragging"),a.style.transition="none",d&&clearTimeout(d)),h&&(a.style.left=`${w+N}px`,a.style.top=`${v+$}px`,a.style.right="auto",a.style.bottom="auto",a.style.transform="none")}function B(C){if(document.removeEventListener("mousemove",z),document.removeEventListener("mouseup",B),h){h=!1,a.classList.remove("dragging");let N=window.innerWidth,$=window.innerHeight,W=a.getBoundingClientRect(),I=W.left+W.width/2,q;I<N/2?(q=24,a.classList.remove("side-right"),a.classList.add("side-left")):(q=N-W.width-24,a.classList.remove("side-left"),a.classList.add("side-right"));let _=Ue(W.top,24,$-W.height-24);setTimeout(()=>{a.style.setProperty("transition","left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)","important"),a.style.left=`${q}px`,a.style.top=`${_}px`,a.style.bottom="auto",a.style.transform=""},10),setTimeout(()=>{a.style.transition="",a.style.removeProperty("transition")},700)}else{let N=a.querySelector(".cw-btn.active"),$=C.target.closest("button");a.classList.contains("collapsed")?c():!N&&!$&&u(),$&&($.style.transform="scale(0.9)",setTimeout(()=>$.style.transform="",150))}}}function st(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");if(!e)return()=>{};e.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${me.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,k.stopThinking(),Y("Cancelado!",{duration:3e3}),o.remove(),e.classList.remove("processing-center"),e.classList.remove("success"),e.classList.add("collapsed"),t&&t.classList.remove("active")},o.appendChild(n),e.appendChild(o);let a=Date.now();return e.classList.add("processing-center"),t&&t.classList.add("active"),k.startThinking(),function(){if(window._CW_ABORT_PROCESS||!e.contains(o))return;let r=Date.now()-a,s=Math.max(0,2e3-r);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!e.contains(o))return;k.stopThinking();let c=o.querySelector(".cw-center-dots"),u=o.querySelector(".cw-center-text"),d=o.querySelector(".cw-center-success"),h=o.querySelector(".cw-abort-btn");c&&(c.style.display="none"),u&&(u.style.display="none"),h&&(h.style.display="none"),d&&d.classList.add("show"),e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing-center"),setTimeout(()=>{o.remove(),e.classList.remove("success"),e.classList.add("collapsed"),t&&t.classList.remove("active")},400)},1e3)},s)}}function Ho(e){let{onSaveCurrent:t,onLoadDraft:o,t:n}=e,a=document.createElement("button");a.className="js-btn-park",a.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${n("guardar")}</span>
    `,a.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${xe.pill};
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
        transition: background-color 0.2s ${ce}, border-color 0.2s ${ce}, color 0.2s ${ce}, box-shadow 0.2s ${ce}, transform 0.1s ${ce};
        box-shadow: ${$e.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,a.onmouseenter=()=>{a.style.backgroundColor="#F8F9FA",a.style.borderColor="#202124",a.style.color="#202124",a.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)"},a.onmouseleave=()=>{a.style.backgroundColor="#FFFFFF",a.style.borderColor="#DADCE0",a.style.color="#5F6368",a.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)"},a.onmousedown=()=>a.style.transform="scale(0.96)",a.onmouseup=()=>a.style.transform="scale(1)",a.onclick=async()=>{if(await ve("Deseja guardar o rascunho atual e limpar os campos?"))try{let x=await t();x?(Te.save(x),w(),c(),k.playSuccess(),Y("Rascunho salvo com sucesso!")):(k.playError(),Y("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0}))}catch(x){console.error("Erro ao salvar rascunho:",x),k.playError(),Y("Erro ao salvar.",{error:!0})}};let i=document.createElement("div");i.title="Meus Rascunhos",i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#9AA0A6"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=i.querySelector("svg"),s=document.createElement("div");s.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(s),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=v=>{v.stopPropagation(),E()};function c(){let v=Te.getCount();Et(v>0),r.style.color=v>0?P.primary:"#9AA0A6",v>0?(s.style.display="block",s.textContent=v,window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||s.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):s.style.display="none"}let u=document.createElement("div");u.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${P.surface}; z-index: 100;
        border-radius: ${xe.large} ${xe.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${ce};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let d=document.createElement("div");d.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",d.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${n("rascunhos_salvos")}</span>`;let h=document.createElement("button");h.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',h.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",h.onmouseenter=()=>h.style.background="#F1F3F4",h.onmouseleave=()=>h.style.background="transparent",h.onclick=()=>E(!1),d.appendChild(h);let f=document.createElement("div");f.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",u.appendChild(d),u.appendChild(f);function E(v){let x=u.style.transform==="translateY(0%)";(v!==void 0?v:!x)?(w(),u.style.transform="translateY(0%)"):u.style.transform="translateY(110%)"}function w(){let v=Te.getAll();if(f.innerHTML="",v.length===0){f.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${P.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${n("nenhum_rascunho")}</div>
                </div>`;return}v.forEach(x=>{let z=document.createElement("div");z.style.cssText=`
                background: ${P.surface}; padding: 20px; border-radius: ${xe.large};
                border: 1.5px solid ${P.bgInput}; box-shadow: ${$e.subtle};
                position: relative;
            `;let C=new Date(x.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),N="";x.summaryTags&&x.summaryTags.length>0&&(N=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${x.summaryTags.slice(0,3).join(", ")+(x.summaryTags.length>3?"...":"")}</div>`),z.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${x.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${C}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${x.cid||"---"}</span>
                    <span style="display:block; color:${x.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${x.subStatus||x.status||"Sem Status"}</span>
                    ${N}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3);">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let $=z.querySelector(".cw-resume-btn");$.onclick=async()=>{await ve("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(x),Te.delete(x.id),w(),c(),E(!1),k.playSwoosh(),Y("Rascunho carregado."))};let W=z.querySelector(".cw-del-btn");W.onclick=async()=>{await ve("Excluir este rascunho?",{danger:!0})&&(Te.delete(x.id),w(),c())},f.appendChild(z)})}return c(),{parkButton:a,historyBtnWrapper:i,drawer:u}}function ct(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let o=document.createRange();o.selectNodeContents(t);let n=window.getSelection();n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")}catch{k.playError(),Y("Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(t)}function kt(e){["input","change","keydown","keyup"].forEach(o=>{let n=new Event(o,{bubbles:!0,cancelable:!0});e.dispatchEvent(n)})}function Go(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function At(){let e=Go(),t=e.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(n){let r=n.closest("material-fab")||n.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),Ae(r)):Ae(n)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let s=r.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Ae(s)):r.click(),await ie(800);let u=Array.from(document.querySelectorAll("i.material-icons-extended")).find(d=>d.innerText.trim()==="description");u&&Ae(u)}}let a=null,i=0;for(;!a&&i<20;){await ie(300);let r=Go();if(r.length>t)a=r.find(s=>!e.includes(s)),a||(a=r[r.length-1]);else if(i>10){let s=r.filter(c=>c.offsetParent!==null);s.length>0&&(a=s[s.length-1])}i++}return a}function jo(e){let t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let n=document.createElement("div");n.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",t.appendChild(n),t.appendChild(o),o.addEventListener("scroll",()=>{n.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let a={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function r({id:N,label:$,type:W="text",placeholder:I="",required:q=!1,autocomplete:_="",parent:H=o}){let j=document.createElement("div");j.style.cssText=a.inputWrapper;let L=document.createElement("label");L.setAttribute("for",N),L.style.cssText=a.label,L.innerHTML=`${$} ${q?'<span style="color:#D93025">*</span>':""}`;let D;return W==="textarea"?(D=document.createElement("textarea"),D.style.cssText=a.input+a.textarea):(D=document.createElement("input"),D.type=W,D.style.cssText=a.input),D.id=N,D.placeholder=I,_&&D.setAttribute("autocomplete",_),D.addEventListener("focus",()=>{D.style.borderColor="#1a73e8",D.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),D.addEventListener("blur",()=>{D.style.borderColor="#DADCE0",D.style.boxShadow="none",q&&D.value.trim()!==""&&(D.style.backgroundColor="#FFF")}),i[N]={input:D,wrapper:j,required:q},j.appendChild(L),j.appendChild(D),W!=="textarea"&&gt(D),H.appendChild(j),j}function s({id:N,label:$,options:W=["Yes","No"],defaultValue:I="No",onChange:q=null}){let _=document.createElement("div");_.style.cssText=a.inputWrapper;let H=document.createElement("label");H.style.cssText=a.label,H.textContent=$,_.appendChild(H);let j=document.createElement("div");j.style.cssText=a.radioGroup;let L=document.createElement("input");return L.type="hidden",L.id=N,L.value=I,_.appendChild(L),W.forEach(D=>{let ee=document.createElement("div");ee.textContent=D,ee.style.cssText=a.radioLabel,D===I&&(ee.style.cssText+=a.radioActive),ee.onclick=()=>{Array.from(j.children).forEach(ae=>ae.style.cssText=a.radioLabel),ee.style.cssText+=a.radioActive,L.value=D,q&&q(D)},j.appendChild(ee)}),i[N]={input:L,wrapper:_,required:!1},_.appendChild(j),o.appendChild(_),_}let c=document.createElement("div");c.style.cssText=a.banner,c.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(c);let u=document.createElement("div");u.style.marginBottom="24px";let d=document.createElement("button");d.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",d.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",d.onmouseover=()=>d.style.background="#E1EFFF",d.onmouseout=()=>d.style.background="#F0F7FF",u.appendChild(d),o.appendChild(u);let h=document.createElement("div");h.style.cssText=a.section,h.innerHTML=`<div style="${a.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(h),r({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:h}),r({id:"ga4",label:"GA4 Property ID",parent:h}),r({id:"gtm",label:"GTM Container ID",parent:h});let f=document.createElement("div");f.style.cssText=a.hiddenField,h.appendChild(f),s({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:N=>{N==="Yes"?f.style.cssText=a.visibleField+"margin-bottom:14px;":(f.style.cssText=a.hiddenField,i.accessEmail.input.value="")}}),r({id:"accessEmail",label:"User Access Email",parent:f}),s({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let E=document.createElement("div");E.style.cssText=a.section,E.innerHTML=`<div style="${a.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(E),r({id:"name",label:"Advertiser Name",required:!0,autocomplete:"name",parent:E}),r({id:"url",label:"Website URL",type:"url",autocomplete:"url",parent:E}),r({id:"phone",label:"Phone Number",type:"tel",autocomplete:"tel",parent:E}),r({id:"email",label:"Contact Email",type:"email",autocomplete:"email",parent:E}),r({id:"callback",label:"Preferred Callback Time (Timezone)",parent:E}),r({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:E}),r({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:E}),r({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:E});let w=document.createElement("div");w.style.cssText=a.section,w.innerHTML=`<div style="${a.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(w),r({id:"cc_adv",label:"Advertiser Contact",parent:w}),r({id:"cc_am",label:"Account Manager",parent:w});let v=document.createElement("div");v.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let x=document.createElement("button");x.innerHTML="Voltar",x.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",x.onclick=e;let z=document.createElement("button");z.textContent="Gerar Nota",z.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",v.appendChild(x),v.appendChild(z),t.appendChild(v),d.onclick=async()=>{let N=d.innerHTML;d.innerHTML="\u23F3 Buscando dados...";try{let $=await Ne(),W=0,I=(H,j)=>{let L=i[H];j&&L&&L.input.value===""&&(L.input.value=j,L.input.style.backgroundColor="#E6F4EA",L.input.style.borderColor="#34A853",setTimeout(()=>{L.input.style.backgroundColor="#FFF",L.input.style.borderColor="#DADCE0"},1e3),W++)};I("name",$.advertiserName),I("url",$.websiteUrl),$.clientEmail&&(I("email",$.clientEmail),I("cc_adv",$.clientEmail));let _=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);_&&I("cid",_[0]),W>0?Y(`${W} campos preenchidos!`):Y("Nenhum dado novo encontrado.")}catch($){console.error($),Y("Erro ao ler p\xE1gina.")}finally{d.innerHTML=N}};let B=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,C=()=>{let N=!0,$=null,W=B();return Object.values(i).forEach(I=>{I.required&&!I.input.value.trim()&&(N=!1,I.input.style.cssText+=a.inputError,W||I.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),$||($=I.input))}),$&&$.scrollIntoView({behavior:W?"auto":"smooth",block:"center"}),N};return z.onclick=async()=>{if(!C()){k.playError(),Y("Preencha os campos obrigat\xF3rios.",{error:!0});return}let N=H=>i[H].input.value||"N/A",$=N("hasAccess"),W=$==="Yes"?N("accessEmail"):"N/A",q=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${N("cid")}
<b>GA4 ID:</b> ${N("ga4")}
<b>GTM ID:</b> ${N("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${$==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${W}
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
`.replace(/\n/g,"<br>");ct(q);let _=await At();_?(_.innerText.trim()===""&&(_.innerHTML=""),document.execCommand("insertHTML",!1,q),kt(_),k.playSuccess(),Y("Nota gerada e inserida!")):Y("Copiado! Abra uma nota para colar.")},t}function Le(e,t="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,o[t]||o.info)}function Ct(e,t){if(!e)return;let o=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,n=document.getElementById(o);n&&n.remove();let a=e.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
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
            <span style="line-height:1.4;">${t}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let r=i.querySelector(".cw-close-btn");r.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&r.click()},25e3)}async function Tt(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await ie(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await ie(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Gt(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let n=o.offsetParent!==null,a=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return n&&!a&&i});return t&&Le("Editor visualmente detectado.","success"),t}async function Uo(){Le("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(h=>h.innerText.trim()==="email");if(o&&o.offsetParent!==null){Le("Bot\xE3o de email direto encontrado.");let h=o.closest("material-button")||o.closest("material-fab")||o;Ae(h),e=!0}else{Le("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let h=document.querySelector("material-fab-speed-dial");if(h){let f=h.querySelector(".trigger");if(f){Ae(f),await ie(800);let w=Array.from(document.querySelectorAll("i.material-icons-extended")).find(v=>v.innerText.trim()==="email");w&&(Ae(w),e=!0)}}}if(!e)return k.playError(),Y("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;Le("\u{1F680} FASE 2: Verificando rascunhos...");let n=null,a=0,i=20;for(;a<i;){await ie(250);let h=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(n=Array.from(h).find(f=>f.offsetParent!==null),n){Le("\u26A0\uFE0F Rascunho detectado!","warn");break}a++}if(n){Le("\u{1F5D1}\uFE0F Descartando..."),Ae(n),n.click();let h=null,f=0;for(;f<15;){await ie(300);let E=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(h=Array.from(E).find(w=>w.offsetParent!==null),h)break;f++}h&&(Ae(h),Y("Limpando rascunho antigo...",{duration:2e3}),await ie(2500))}Le("\u{1F680} FASE 3: Buscando editor final...");let r=0,s=null;for(;r<20&&(s=Gt(),!s);)await ie(250),r++;if(!s)return k.playError(),Y("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let c=s.closest('[id="email-body-content-top"]'),d=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(c){if(d){let f=d.closest('[aria-hidden="true"]');f&&f.removeAttribute("aria-hidden"),d.focus(),Ae(d)}await ie(300),c.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let h=c.querySelector("#cases-body-field");if(h){let f=document.createRange();f.selectNodeContents(h),f.collapse(!0);let E=window.getSelection();E.removeAllRanges(),E.addRange(f)}return!0}return!1}async function Ft(e){if(!e||!await Uo())return;let o=await Ne();Le("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await ie(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await Tt(i,o.clientEmail),Ct(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await Tt(i,o.internalEmail),Ct(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await ie(500);let a=document.querySelector('material-button[debug-id="canned_response_button"]');if(a){Ae(a),await ie(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Ae(i),document.execCommand("insertText",!1,e),i.dispatchEvent(new Event("input",{bubbles:!0})),Le("\u23F3 Buscando resultado da Canned Response...","info");let r=null,s=0,c=15e3,u=500;for(;s<c&&(r=document.querySelector("material-select-dropdown-item"),!r);)await ie(u),s+=u;if(r){Ae(r),await ie(1500);let d=Gt();if(d){let f=Array.from(d.querySelectorAll("span.field")).filter(w=>w.innerText.includes("{Requested Task Type}"));if(f.length>0){let w=f.map(x=>x.closest("tr")).filter(x=>x!==null),v=[...new Set(w)];if(v.length>0){let z=v[0].querySelector('td[width="100%"]');z&&(z.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let B=1;B<v.length;B++)v[B].remove()}}let E=d.innerHTML;o.advertiserName&&E.includes("{%ADVERTISER_NAME%}")&&(E=E.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),E.includes("{%^79285%}")&&(E=E.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),d.innerHTML=E}Y("Canned Response aplicada!")}else Le(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),k.playError(),Y(`Timeout: Template '${e}' n\xE3o carregou.`,{error:!0})}}else k.playError(),Y("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function Vo(e){if(Le(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await Uo())return;let o=await Ne(),n=nt();await ie(600);let a=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(a&&(a.click(),await ie(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await Tt(s,o.clientEmail),Ct(s,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await Tt(s,o.internalEmail),Ct(s,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&e.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,e.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await ie(300));let r=Gt();if(r){let c=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');c&&(c.focus(),Ae(c));let u=new Date;u.setDate(u.getDate()+3);let d=u.getDay();d===6?u.setDate(u.getDate()+2):d===0&&u.setDate(u.getDate()+1);let h=u.toLocaleDateString("pt-BR"),f=e.body;f=f.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),f=f.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),f=f.replace(/\[URL\]/g,o.websiteUrl||"seu site"),f=f.replace(/\[Seu Nome\]/g,n),f=f.replace(/\[MM\/DD\/YYYY\]/g,h),document.execCommand("insertHTML",!1,f),c&&(c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))),Y("Email preenchido com sucesso!",{duration:2e3}),Le("\u2705 Processo finalizado com sucesso.","success")}else k.playError(),Y("Erro ao focar no editor.",{error:!0})}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
        /* M\xD3DULO BASE */
        .cw-module-window {
            /* Anima\xE7\xE3o Apple Spring (Ida e Volta) */
            transition: 
                opacity 0.3s ease,
                transform 0.45s var(--cw-ease-decelerate),
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
    `,document.head.appendChild(e)}window._cwEscapeListenerActive||(window._cwEscapeListenerActive=!0,document.addEventListener("keydown",e=>{if(e.key!=="Escape"||document.querySelector(".cw-dialog-overlay"))return;let t=document.querySelector(".cw-module-window.open");if(!t)return;let o=t.querySelector(".cw-header-close");o&&o.click()}));function Se(e,t,o){let n=document.getElementById(o);if(!t)return;let a=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,i=t.getAttribute("data-moved")==="true",r={x:0,y:0};if(n){let h=n.getBoundingClientRect();r.x=h.left+h.width/2,r.y=h.top+h.height/2}let s,c;if(!i)s=window.innerWidth/2,c=window.innerHeight/2;else{let h=t.getBoundingClientRect();s=h.left+h.width/2,c=h.top+h.height/2,s===0&&c===0&&(s=window.innerWidth/2,c=window.innerHeight/2)}let u=r.x-s,d=r.y-c;e?(k.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",t.style.willChange="transform, opacity",setTimeout(()=>{t.style.willChange="auto"},550),i?t.style.transform=`translate(${u}px, ${d}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${u}px), calc(-50% + ${d}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),n&&n.classList.add("active"),t.style.transition=a?"opacity 0.15s ease":"opacity 0.4s ease-out, transform 0.5s var(--cw-ease-decelerate)",t.style.opacity="1",i?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof Yo=="function"&&Yo(t,o)):(k.playSwoosh(),t.style.transition=a?"opacity 0.15s ease":"opacity 0.25s ease, transform 0.3s var(--cw-ease-accelerate)",t.style.pointerEvents="none",t.style.willChange="transform, opacity",requestAnimationFrame(()=>{t.style.opacity="0",i?t.style.transform=`translate(${u}px, ${d}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${u}px), calc(-50% + ${d}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),n&&n.classList.remove("active"),t.style.transition="",t.style.transform="",t.style.willChange="auto"},300),typeof jt=="function"&&jt(t))}function Yo(e,t){jt(e);let o=n=>{if(!e.classList.contains("open"))return;let a=e.contains(n.target),i=document.querySelector(".cw-pill"),r=i&&i.contains(n.target);a?(e.classList.remove("idle"),e.style.zIndex="2147483648"):r||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=o,document.addEventListener("mousedown",o)}function jt(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}function Wo(){let e="v4.0.0",{popup:t,content:o,header:n,animRefs:a,credit:i}=Io(e,H),r=_o(m),s=Mo(()=>{Z(),V.setActiveTasks(s.getCheckedElements())},m,V),c=document.createElement("div");c.style.display="none";let u=Oo((g,T)=>{K(g,T)});c.appendChild(u);let d=document.createElement("div");d.id="evidence-container",Object.assign(d.style,{display:"none",marginTop:"16px",padding:"16px",background:P.bgInput,border:`1px solid ${P.border}`,borderRadius:xe.medium,boxShadow:$e.subtle});let h=document.createElement("div");h.className="cw-section-title",h.textContent=m("evidencias_contato"),d.appendChild(h);let f={},E=(g,T)=>{let O=document.createElement("div");O.style.marginBottom="12px";let G=document.createElement("label");G.textContent=T,G.setAttribute("for",g),G.style.cssText=`display: block; font-size: 11px; font-weight: 700; color: ${P.textSub}; margin-bottom: 6px; text-transform: uppercase;`;let R=document.createElement("input");return R.type="text",R.id=g,R.className="cw-input",R.placeholder="https://screenshot.googleplex.com/...",R.style.marginBottom="0",O.appendChild(G),O.appendChild(R),gt(R,{minLength:8}),f[g]=R,O};d.appendChild(E("evidence-l1",m("ligacao_1"))),d.appendChild(E("evidence-l2",m("ligacao_2"))),d.appendChild(E("evidence-msg",m("mensagem_am")));let w=Ho({onSaveCurrent:async()=>{let g=await l();return F(),g},onLoadDraft:g=>{p(g)},t:g=>m(g)}),v=L(),x=D(),z=document.createElement("div"),B=y(),C=U(w,m);o.appendChild(v),o.appendChild(x),o.appendChild(B),o.appendChild(c),o.appendChild(z),o.appendChild(d),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none";let N=document.createElement("button");N.id="manual-task-toggle",N.textContent=m("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",N.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${P.primary}; background: ${P.surface}; color: ${P.primary}; border-radius: ${xe.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${ce}; text-transform: uppercase; letter-spacing: 0.5px;`,N.onmouseenter=()=>{N.style.background=P.primaryBg},N.onmouseleave=()=>{N.style.background=P.surface},N.onclick=()=>{s.selectionElement.style.display="block",s.screenshotsElement.style.display="block",N.style.display="none"},o.appendChild(N),o.appendChild(s.selectionElement),o.appendChild(r.element),o.appendChild(s.screenshotsElement),o.appendChild(C);let $=document.createElement("div");$.style.display="none",$.style.flexGrow="1",$.style.minHeight="0",$.style.overflow="hidden";let W=jo(()=>j());W.style.height="100%",$.appendChild(W),t.insertBefore($,i);let I=n.lastElementChild;I&&(I.insertBefore(w.historyBtnWrapper,I.firstChild),I.insertBefore(A(),I.firstChild)),t.appendChild(w.drawer);let q=null;V.subscribe(g=>{M(g),_(),g.isDirty?(q&&clearTimeout(q),q=setTimeout(async()=>{let T=await l(!0);T.subStatus?Te.saveEmergency(T):Te.clearEmergency(),g.isDirty=!1},2e3)):q&&(clearTimeout(q),q=null)});function _(){let g=Te.getCount()>0,T=!!V.currentSubStatus;Et(g||T)}function H(){V.visible=!V.visible,V.visible?ge():be(),Se(V.visible,t,"cw-btn-notes")}function j(){V.isSplitView=!V.isSplitView,V.isSplitView?(o.style.display="none",$.style.display="flex",$.style.flexDirection="column",a.googleLine&&(a.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",$.style.display="none",a.googleLine&&(a.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function L(){let g=document.createElement("div");if(g.innerHTML=`
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
                    transition: all 0.3s ${ce};
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
            `,document.head.appendChild(O)}let T=(O,G)=>{let ne=g.querySelector(`#${O}`).querySelector(".cw-segmented-indicator");ne&&(ne.style.transform=`translateX(${G*100}%) translateX(${G*2}px)`)};return g.querySelectorAll("#lang-selector button").forEach((O,G)=>{O.onclick=()=>{V.setLanguage(O.dataset.lang),g.querySelectorAll("#lang-selector button").forEach(R=>R.classList.remove("active")),O.classList.add("active"),T("lang-selector",G),k.playClick(),V.currentSubStatus&&ae(V.currentSubStatus)}}),g.querySelectorAll("#type-selector button").forEach((O,G)=>{O.onclick=()=>{V.setCaseType(O.dataset.type),g.querySelectorAll("#type-selector button").forEach(R=>R.classList.remove("active")),O.classList.add("active"),T("type-selector",G),k.playClick(),V.currentSubStatus&&ae(V.currentSubStatus)}}),g.querySelectorAll("#portugal-selector button").forEach((O,G)=>{O.onclick=()=>{V.setPortugalCase(O.dataset.val==="true"),g.querySelectorAll("#portugal-selector button").forEach(R=>R.classList.remove("active")),O.classList.add("active"),T("portugal-selector",G),k.playClick(),V.currentSubStatus&&ae(V.currentSubStatus)}}),g}function D(){let g=document.createElement("div");g.className="cw-status-section",g.style.cssText="display: flex; flex-direction: column; gap: 8px;",g.innerHTML=`
            <label class="cw-section-title js-label-status" for="main-status-select" style="margin-top: 8px;">${m("status_principal")}</label>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${m("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <label class="cw-section-title js-label-substatus" for="sub-status-select" style="margin-top: 8px;">${m("substatus")}</label>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${m("select_substatus")}</option>
            </select>
        `;let T=g.querySelector("#main-status-select"),O=g.querySelector("#sub-status-select");return T.onchange=()=>{V.setStatus(T.value),te(T.value,O),V.setSubStatus(""),ae("")},O.onchange=()=>{V.setSubStatus(O.value),ae(O.value)},g}function ee(){return d.style.display==="none"?null:{l1:f["evidence-l1"]?.value.trim()||"",l2:f["evidence-l2"]?.value.trim()||"",msg:f["evidence-msg"]?.value.trim()||""}}function te(g,T){if(T.innerHTML=`<option value="">${m("select_substatus")}</option>`,!g){T.disabled=!0;return}let O=g==="IN"?(()=>{let G=document.createElement("optgroup");return G.label="Fora de Escopo",G})():null;for(let G in De)if(De[G].status===g){let R=document.createElement("option");R.value=G,R.textContent=De[G].name,O&&G.startsWith("IN_Out_of_Scope")?O.appendChild(R):T.appendChild(R)}O&&O.children.length>0&&T.appendChild(O),T.disabled=!1}function ae(g){let T=De[g],O=g==="NI_Attempted_Contact"||T&&T.name&&T.name.toLowerCase().includes("attempted contact");if(u.render&&u.render(g,V.currentCaseType),!g){d.style.display="none",f["evidence-l1"]&&(f["evidence-l1"].value=""),f["evidence-l2"]&&(f["evidence-l2"].value=""),f["evidence-msg"]&&(f["evidence-msg"].value=""),c.style.display="none",z.style.display="none";let ue=document.getElementById("manual-task-toggle");ue&&(ue.style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",B.style.display="flex",B.style.opacity="1",C.style.display="none";return}if(O?d.style.display="block":(d.style.display="none",f["evidence-l1"]&&(f["evidence-l1"].value=""),f["evidence-l2"]&&(f["evidence-l2"].value=""),f["evidence-msg"]&&(f["evidence-msg"].value="")),B.style.opacity="0",setTimeout(()=>{V.currentSubStatus&&(B.style.display="none")},400),C.style.display="grid",T&&T.templateFields){let ue=ht(T);V.setActiveFields(T.templateFields.filter(he=>!ue.includes(he)))}J(),yt(g,z,V),z.style.display="block",c.style.display="block";let G=g.startsWith("SO_"),R=g==="NI_Awaiting_Validation",ne=document.getElementById("manual-task-toggle");G||R?(s.selectionElement.style.display="block",ne.style.display="none"):(s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",ne.style.display="block");let Q=g==="SO_Education_Only"?"education":"implementation";V.setScreenshotMode(Q),s.updateSubStatus(g),Z();let de=document.getElementById("email-automation-toggle-row");de&&(de.style.display=Ze[g]?"flex":"none")}function Z(){let g=s.getCheckedElements().map(T=>T.value);r.updateVisibility(V.currentSubStatus,g)}function K(g,T){let O=Ye[g];if(O){for(let G in O)if(G==="linkedTask")s.toggleTask(O.linkedTask,T);else if(G==="activeTasks")O.activeTasks.forEach(R=>{T?s.setTaskCount(R.value,R.count):s.setTaskCount(R.value,0)});else if(G.startsWith("field-")){let R=G,ne=O[G],Q=document.getElementById(R);if(Q){let de=Qe.includes(R.replace("field-",""));if(T)if(de){let ue=Q.value.trim();ue.includes(ne.trim())||(Q.value=ue?ue+`
`+ne.trim():ne.trim())}else Q.value=ne;else if(de){let ue=Q.value.trim(),he=ne.trim();ue.includes(he)&&(Q.value=ue.replace(he,"").trim().replace(/\n{3,}/g,`

`))}else Q.value.trim()===ne.trim()&&(Q.value="");V.updateField(R,Q.value),Q.dispatchEvent(new Event("input"))}}}}function U(g,T){let O=document.createElement("div");if(O.className="cw-actions-section",O.style.cssText=`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${P.bgInput};
            border-radius: 12px;
            border: 1px solid ${P.border};
        `,!document.getElementById("cw-actions-hover-styles")){let ue=document.createElement("style");ue.id="cw-actions-hover-styles",ue.innerHTML=`
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
            `,document.head.appendChild(ue)}let G=document.createElement("div");G.id="email-automation-toggle-row",G.style.cssText="grid-column: 1 / -1; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",G.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${P.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${P.primary};">
                <span class="js-label-email-toggle">${T("preencher_email_automaticamente")}</span>
            </label>
        `;let R=g.parkButton;R.classList.add("js-btn-park"),R.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let ne=document.createElement("button");ne.className="cw-btn-secondary js-btn-reset",ne.textContent=T("limpar"),ne.style.cssText=`width: 100%; height: 34px; background: ${P.surface}; color: ${P.textSub}; border: 1px solid ${P.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,ne.onclick=()=>F();let Q=document.createElement("button");Q.className="cw-btn-secondary js-btn-copy",Q.textContent=T("copiar"),Q.style.cssText=`width: 100%; height: 34px; background: ${P.surface}; color: ${P.primary}; border: 1px solid ${P.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,Q.onclick=()=>oe();let de=document.createElement("button");return de.className="cw-btn-primary js-btn-generate",de.textContent=T("preencher"),de.style.cssText=`width: 100%; height: 38px; background: ${P.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: 1 / -1; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,de.onclick=()=>X(),O.appendChild(G),O.appendChild(R),O.appendChild(ne),O.appendChild(Q),O.appendChild(de),O}async function oe(){if(!V.currentSubStatus){k.playError(),Y(m("select_substatus"),{error:!0});return}let g=Bt(V,s,r,ee());g?(ct(g),Y(m("copiado_sucesso")),k.playClick()):(k.playError(),Y(m("select_substatus"),{error:!0}))}async function X(){if(!V.currentSubStatus){k.playError(),Y(m("select_substatus"),{error:!0});return}let g=De[V.currentSubStatus],T=rt(g).filter(ne=>{if(!V.activeFields.includes(ne))return!1;let Q=V.formData[`field-${ne}`];return!Q||!Q.trim()});if(T.length>0){k.playError(),Y(`Preencha o campo obrigat\xF3rio antes de gerar: ${m(T[0].toLowerCase())}`,{error:!0});return}if(g?.requiresTasks&&s.getCheckedElements().length===0){k.playError(),Y("Selecione ao menos uma tarefa antes de gerar a nota.",{error:!0});return}let O=Bt(V,s,r,ee());ct(O),H();let G=st(),R=await At();if(R){R.focus(),document.execCommand("insertHTML",!1,O),kt(R);let ne=document.getElementById("email-automation-checkbox");(!ne||ne.checked)&&V.currentSubStatus&&Ze[V.currentSubStatus]&&await Ft(Ze[V.currentSubStatus]),Y(m("inserido_copiado")),k.playSuccess(),$o(),F()}else k.playError(),Y("N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente.",{error:!0}),H();G()}function J(){if(V.currentSubStatus){if(V.currentCaseType==="lm")V.removeField("ON_CALL");else{let g=De[V.currentSubStatus];g&&g.templateFields.includes("ON_CALL")&&V.addFieldAt("ON_CALL",1)}V.isPortugalCase?(V.addFieldAt("CASO_PORTUGAL",1),V.addFieldAt("CONSENTIU_GRAVACAO",2)):(V.removeField("CASO_PORTUGAL"),V.removeField("CONSENTIU_GRAVACAO"))}}function F(){V.reset(),s.reset(),r.reset(),_(),Te.clearEmergency(),o.querySelectorAll("select").forEach(T=>T.value=""),o.querySelector("#sub-status-select").disabled=!0;let g=document.getElementById("email-automation-toggle-row");g&&(g.style.display="none"),z.innerHTML="",c.style.display="none",B.style.display="flex",B.style.opacity="1",C.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",d.style.display="none",f["evidence-l1"]&&(f["evidence-l1"].value=""),f["evidence-l2"]&&(f["evidence-l2"].value=""),f["evidence-msg"]&&(f["evidence-msg"].value="")}async function l(g=!1){let T={};z.querySelectorAll("input, textarea, select").forEach(Q=>{(Q.id.startsWith("field-")||Q.id==="consent-select")&&(T[Q.id]=Q.value)});let O="Cliente",G="---";if(!g)try{let Q=await Ne();O=Q.advertiserName,G=Q.cid}catch(Q){console.warn("Erro ao coletar pageData:",Q)}let R=s.getCheckedElements().map(Q=>({key:Q.value,count:Q.count})),ne=R.map(Q=>{let de=Me[Q.key];return de?de.name:Q.key});return{currentCaseType:V.currentCaseType,currentLang:V.currentLang,isPortugalCase:V.isPortugalCase,consent:V.consent,tagSupportUsed:V.tagSupportUsed,forcedScreenshots:[...V.forcedScreenshots],activeFields:V.activeFields,status:V.currentStatus,subStatus:V.currentSubStatus,formData:T,activeTasks:R,summaryTags:ne,clientName:O,cid:G,timestamp:new Date().toISOString()}}let b=g=>new Promise(T=>setTimeout(T,g));async function p(g){V.setLanguage(g.currentLang||"pt"),V.setCaseType(g.currentCaseType||"bau"),V.setPortugalCase(g.isPortugalCase||!1),V.setConsent(g.consent||!1),g.activeFields&&V.setActiveFields(g.activeFields);let T=o.querySelector(`#lang-selector button[data-lang="${V.currentLang}"]`);T&&T.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach(R=>{R!==T&&R.classList.remove("active")});let O=o.querySelector(`#type-selector button[data-type="${V.currentCaseType}"]`);O&&O.classList.add("active"),o.querySelectorAll("#type-selector button").forEach(R=>{R!==O&&R.classList.remove("active")});let G=o.querySelector(`#portugal-selector button[data-val="${V.isPortugalCase}"]`);if(G&&G.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach(R=>{R!==G&&R.classList.remove("active")}),g.status){let R=o.querySelector("#main-status-select");R.value=g.status,V.setStatus(g.status);let ne=o.querySelector("#sub-status-select");if(te(g.status,ne),await b(50),g.subStatus){if(ne.value=g.subStatus,V.setSubStatus(g.subStatus),ae(g.subStatus),await b(100),g.tagSupportUsed!==void 0){V.setTagSupportUsed(g.tagSupportUsed);let Q=r.element.querySelector('input[value="Sim"]'),de=r.element.querySelector('input[value="N\xE3o"]');g.tagSupportUsed&&Q?Q.checked=!0:de&&(de.checked=!0),r.element.querySelector("div:last-child").style.display=g.tagSupportUsed?"none":"block"}g.forcedScreenshots&&V.setForcedScreenshots(g.forcedScreenshots);for(let Q in g.formData){let de=document.getElementById(Q);de&&(de.value=g.formData[Q],V.updateField(Q,de.value))}g.activeTasks&&(g.activeTasks.forEach(Q=>s.setTaskCount(Q.key,Q.count)),V.setActiveTasks(s.getCheckedElements()))}}V.isDirty=!1}async function S(g){let T=Ye[g],O=T&&T.quickLaunch;if(!O||V.isDirty&&!await ve("Isso vai substituir o rascunho atual da nota. Deseja continuar?"))return;let G=V.visible;G||H(),F(),G||await b(550);let R=o.querySelector("#main-status-select"),ne=o.querySelector("#sub-status-select");R.value=O.status,V.setStatus(O.status),te(O.status,ne),await b(60),ne.value=O.subStatus,V.setSubStatus(O.subStatus),ae(O.subStatus),await b(160);let Q=c.querySelector(`[data-id="${g}"]`);Q&&Q.click(),await b(120),k.playSuccess();let de=(O.focusIds||[]).find(ue=>{let he=document.getElementById(ue);return he&&!he.value.trim()});de&&mo(document.getElementById(de))}function m(g){return Fe[V.currentLang]?.[g]||Fe.pt?.[g]||g}function A(){let g=document.createElement("div");return g.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',g.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",g.onclick=T=>{T.stopPropagation(),j()},g.title="Alternar para Split & Transfer",g}function y(){let g=document.createElement("div");return g.id="notes-empty-state",g.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${ce};
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
        `,g}function M(g){let T=o.querySelector(".js-label-idioma");T&&(T.textContent=m("idioma"));let O=o.querySelector(".js-label-fluxo");O&&(O.textContent=m("fluxo"));let G=o.querySelector(".js-label-portugal");G&&(G.textContent=m("caso_portugal"));let R=o.querySelector(".js-label-status");R&&(R.textContent=m("status_principal"));let ne=o.querySelector(".js-label-substatus");ne&&(ne.textContent=m("substatus"));let Q=o.querySelector(".js-btn-copy");Q&&(Q.textContent=m("copiar"));let de=o.querySelector(".js-btn-generate");de&&(de.textContent=m("preencher"));let ue=o.querySelector(".js-btn-reset");ue&&(ue.textContent=m("limpar"));let he=document.getElementById("manual-task-toggle");he&&(he.textContent=m("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let dt=o.querySelector(".js-btn-park span");dt&&(dt.textContent=m("guardar")),h.textContent=m("evidencias_contato");let Qt=d.querySelector('label[for="evidence-l1"]');Qt&&(Qt.textContent=m("ligacao_1"));let eo=d.querySelector('label[for="evidence-l2"]');eo&&(eo.textContent=m("ligacao_2"));let to=d.querySelector('label[for="evidence-msg"]');to&&(to.textContent=m("mensagem_am"));let oo=t.querySelector(".js-drawer-title");oo&&(oo.textContent=m("rascunhos_salvos"));let ao=o.querySelector(".js-label-email-toggle");ao&&(ao.textContent=m("preencher_email_automaticamente")),r&&r.setLanguage&&r.setLanguage(m),s&&s.setLanguage&&s.setLanguage(m)}return B.style.display="flex",C.style.display="none",V.setLanguage("pt"),V.setCaseType("bau"),_(),setTimeout(async()=>{let g=Te.getEmergency();g&&(await ve("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?(p(g),Y("Sess\xE3o restaurada!")):Te.clearEmergency())},3e3),document.body.appendChild(t),H.openWithPreset=S,H}var Xo=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule2",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email nas pr\xF3ximas 48 horas o caso ser\xE1 encerrado.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}];var Ko={_templates:null,async getTemplates(){return this._templates?this._templates:(this._templates=Xo,this._templates)}};var Jo="cw_personal_library_v1",et=!1,Ee={getSnippets:(e="all")=>{let t=Ee._loadFromLocal(),o=ye();return o&&o.includes("@")&&!et&&Ee._syncWithServer(o),e==="all"?t:t.filter(n=>n.type===e)},save:async e=>{let t=ye();if(!t)return k.playError(),Y("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;et=!0;let o=Ee._loadFromLocal(),n=new Date().toISOString(),a={id:e.id||"local_"+Date.now(),type:e.type||"general",title:e.title||"Sem t\xEDtulo",content:e.content||"",subject:e.subject||"",isCode:e.isCode||!1,isRich:e.isRich||!1,updated:n,_pendingSync:!0},i=o.filter(c=>c.id!==a.id);i.unshift(a),Ee._saveToLocal(i);let r=!1;try{r=await me.saveSnippet(a,t),r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}catch(c){console.error("Erro na nuvem:",c)}finally{setTimeout(()=>{et=!1},2e3)}a._pendingSync=!r;let s=Ee._loadFromLocal().filter(c=>c.id!==a.id);return s.unshift(a),Ee._saveToLocal(s),{...a,synced:r}},delete:async e=>{let t=ye();et=!0;let n=Ee._loadFromLocal().filter(a=>a.id!==e);return Ee._saveToLocal(n),t?me.deleteSnippet(e,t).then(()=>{setTimeout(()=>{et=!1},2e3)}):et=!1,!0},_syncWithServer:async e=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let t=await me.getUserSnippets(e);if(t&&t.status==="success"&&Array.isArray(t.snippets)){let o=t.snippets,n=Ee._loadFromLocal(),i=[...n.filter(c=>c._pendingSync),...o],r=JSON.stringify(i),s=JSON.stringify(n);r!==s&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),Ee._saveToLocal(i))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(Jo)||"[]")}catch{return[]}},_saveToLocal:e=>{localStorage.setItem(Jo,JSON.stringify(e))}};var le={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",warning:"#E67E22",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"};function Ya(){if(document.getElementById("cw-email-styles"))return;let e=document.createElement("style");e.id="cw-email-styles",e.textContent=`
        #email-template-list::-webkit-scrollbar { width: 4px; }
        #email-template-list::-webkit-scrollbar-track { background: transparent; }
        #email-template-list::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 10px; }
        #email-template-list::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.2); }

        @keyframes cw-floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .cw-animate-float { animation: cw-floating 3s ease-in-out infinite; }

        .cw-email-popup {
            width: 850px; height: 650px;
            font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
            border-radius: 12px; overflow: hidden;
        }
        .cw-email-main { display: flex; flex: 1; overflow: hidden; background-color: ${le.bgApp}; }

        /* --- PAINEL ESQUERDO --- */
        .cw-email-left-panel { width: 320px; background-color: #EFEFF0; border-right: 1px solid ${le.borderSubtle}; display: flex; flex-direction: column; flex-shrink: 0; }
        .cw-email-search-container { padding: 16px; border-bottom: 1px solid ${le.borderSubtle}; position: relative; }
        .cw-email-search-input {
            width: 100%; box-sizing: border-box; padding: 10px 14px 10px 36px;
            border-radius: 10px; border: 1.5px solid transparent; background-color: #E3E3E8;
            font-size: 15px; outline: none; color: ${le.textPrimary};
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
            background-repeat: no-repeat; background-position: 12px center;
            transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
        }
        .cw-email-search-input:focus {
            background-color: #FFFFFF; border-color: ${le.primary};
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); transform: scale(1.02);
        }
        .cw-email-clear-btn {
            position: absolute; right: 26px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #fff; cursor: pointer; display: none;
            background-color: #C7C7CC; width: 16px; height: 16px; border-radius: 50%;
            text-align: center; line-height: 16px; font-weight: bold;
        }

        #email-template-list { flex: 1; overflow-y: auto; padding: 8px; scroll-behavior: smooth; }

        .cw-email-list-empty { padding: 40px 20px; text-align: center; color: ${le.textSecondary}; opacity: 0.6; }
        .cw-email-list-empty-icon { font-size: 32px; margin-bottom: 12px; }
        .cw-email-list-empty-text { font-size: 14px; font-weight: 500; }

        .cw-email-cat-header {
            padding: 12px 16px 12px 24px; font-size: 11px; font-weight: 700; color: ${le.textSecondary};
            text-transform: uppercase; letter-spacing: 0.8px; position: sticky; top: -8px;
            background-color: rgba(239, 239, 240, 0.9); z-index: 10; backdrop-filter: blur(20px);
            margin: 0 -8px 8px -8px; border-bottom: 0.5px solid ${le.borderSubtle};
            cursor: pointer; display: flex; align-items: center; justify-content: space-between;
            user-select: none; transition: background-color 0.2s ease;
        }
        .cw-email-cat-header:hover { background-color: rgba(230, 230, 232, 0.9); }
        .cw-email-cat-header:focus-visible, .cw-email-list-item:focus-visible { outline: 2px solid ${le.primary}; outline-offset: -2px; }
        .cw-email-cat-right { display: flex; align-items: center; }
        .cw-email-cat-badge { background-color: rgba(0, 0, 0, 0.05); padding: 2px 8px; border-radius: 10px; font-size: 10px; color: ${le.textSecondary}; }
        .cw-email-cat-arrow { margin-left: 8px; transition: transform 0.3s ease; }

        .cw-email-list-item {
            padding: 12px 14px; font-size: 14px; cursor: pointer;
            transition: background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s cubic-bezier(0.25, 1, 0.5, 1); border-radius: 10px;
            color: ${le.textPrimary}; margin: 4px 6px; display: flex; align-items: center; gap: 12px;
            background-color: ${le.bgSurface}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            border: 1px solid ${le.borderSubtle}; position: relative; overflow: hidden;
        }
        .cw-email-list-item:hover:not(.selected) {
            /* Sem transform aqui: itens empilhados verticalmente e bem juntos
               s\xE3o o caso cl\xE1ssico de flicker de hover quando o pr\xF3prio item
               se desloca. Sombra/borda j\xE1 comunicam o hover sem mover nada. */
            background-color: #f8f8f9;
            box-shadow: 0 4px 8px rgba(0,0,0,0.08); border-color: rgba(0, 122, 255, 0.2);
        }
        .cw-email-list-item:active:not(.selected) { transform: scale(0.98); }
        .cw-email-list-item.selected {
            background-color: ${le.primary}; box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
            border: none; color: #fff; font-weight: 600;
        }
        .cw-email-list-item.selected:active { transform: scale(0.97); }
        .cw-email-list-indicator { position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background-color: #fff; border-radius: 0 4px 4px 0; }
        .cw-email-list-icon { font-size: 12px; opacity: 0.7; flex-shrink: 0; }
        .cw-email-list-item.selected .cw-email-list-icon { opacity: 1; }
        .cw-email-list-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }

        /* --- PAINEL DIREITO --- */
        /* 0.15s bate com o setTimeout de selectTemplate() (linha ~476) - o
           swap de conte\xFAdo acontece exatamente quando o fade-out termina,
           n\xE3o no meio dele. */
        .cw-email-right-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: ${le.bgApp}; transition: opacity 0.15s ease, transform 0.15s ease; }
        .cw-email-fields-section { padding: 20px; border-bottom: 1px solid ${le.borderSubtle}; background-color: ${le.bgSurface}; max-height: 250px; overflow-y: auto; display: none; }
        .cw-email-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cw-email-field-label { display: block; font-size: 11px; font-weight: 700; color: ${le.textSecondary}; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-field-input {
            width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
            border: 1.5px solid ${le.borderSubtle}; background-color: #FBFBFD; font-size: 14px;
            transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; outline: none;
        }
        .cw-email-field-input:focus { border-color: ${le.primary}; background-color: #FFFFFF; box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); }

        .cw-email-smartcr-hint {
            padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA;
            border-radius: 8px; display: flex; align-items: center; gap: 8px;
        }
        .cw-email-smartcr-hint-icon { font-size: 18px; }

        .cw-email-preview-section { flex: 1; display: flex; flex-direction: column; padding: 20px; background-color: ${le.bgApp}; overflow: hidden; }
        .cw-email-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cw-email-preview-title { font-size: 12px; font-weight: 600; color: ${le.textSecondary}; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-preview-actions { display: flex; gap: 8px; }
        .cw-email-preview-content {
            flex: 1; background-color: ${le.bgSurface}; border: 1px solid ${le.borderSubtle};
            border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: ${le.textPrimary};
            overflow-y: auto; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
        }

        /* --- BOT\xD5ES DE A\xC7\xC3O --- */
        .cw-email-btn {
            padding: 8px 14px; border-radius: 10px; border: 1.5px solid ${le.primary};
            background: transparent; color: ${le.primary}; font-size: 13px; font-weight: 600;
            cursor: pointer; transition: background-color 0.2s cubic-bezier(0.25, 1, 0.5, 1), transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .cw-email-btn:hover { background-color: rgba(0, 122, 255, 0.05); }
        .cw-email-btn:active { transform: scale(0.94); }
        .cw-email-btn.primary {
            border: none; background: ${le.primary}; color: #fff;
            box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }
        .cw-email-btn.primary:hover { background-color: #0062CC; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4); }
        .cw-email-btn.warning { border-color: ${le.warning}; color: ${le.warning}; display: none; }
        .cw-email-btn.warning:hover { background-color: rgba(230, 126, 34, 0.08); }

        @media (prefers-reduced-motion: reduce) {
            .cw-animate-float { animation: none !important; }
            .cw-email-search-input, .cw-email-list-item, .cw-email-btn, .cw-email-right-panel {
                transition: opacity 0.15s ease, background-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function Wa(e,t){return e.filter(o=>o.name.toLowerCase().includes(t.toLowerCase())||o.category.toLowerCase().includes(t.toLowerCase()))}function Xa(e){return Object.entries(Ze).filter(([t,o])=>o&&(t.toLowerCase().includes(e.toLowerCase())||o.toLowerCase().includes(e.toLowerCase()))).map(([t,o])=>({id:t,name:t.replace(/_/g," "),category:"\u26A1 Smart CRs",code:o,isSmartCR:!0}))}function Ka(e){return Ee.getSnippets("email").filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.subject&&t.subject.toLowerCase().includes(e.toLowerCase())).map(t=>{let o=[],n=t.content.match(/\[([^\]]+)\]/g);return n&&[...new Set(n)].forEach(a=>{o.push({key:a,label:a.replace("[","").replace("]",""),type:a.toLowerCase().includes("data")?"date":"text",auto:a.toLowerCase().includes("nome")&&a.toLowerCase().includes("seu")?"agentName":null})}),{id:t.id||`snippet-${Math.random()}`,name:t.title,category:"\u{1F464} Pessoal",subject:t.subject||"Sem Assunto",template:t.content,placeholders:o}})}function Ja(e,t){return[...Wa(e,t),...Xa(t),...Ka(t)]}function Zo(){let e="v6.0.0",t=!1,o=[],n=null,a="",i=new Set;Ya();let r=document.createElement("div");r.id="email-assistant-popup",r.classList.add("cw-module-window","cw-email-popup"),Object.assign(r.style,Ce,{width:"850px",height:"650px"}),r.style.display="none",r.style.flexDirection="column";let s=we(r,"Email Assistant",e,"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",{popup:r},()=>H()),c=document.createElement("div");c.className="cw-email-main";let u=document.createElement("div");u.className="cw-email-left-panel";let d=document.createElement("div");d.className="cw-email-search-container";let h=document.createElement("input");h.className="cw-email-search-input",h.placeholder="Buscar templates...";let f=document.createElement("div");f.id="email-template-list",mt(f,".cw-email-cat-header, .cw-email-list-item");let E=document.createElement("div");E.className="cw-email-clear-btn",E.innerHTML="\u2715",E.onclick=()=>{h.value="",a="",E.style.display="none",ee(),h.focus()},d.appendChild(h),d.appendChild(E),u.appendChild(d),u.appendChild(f);let w=document.createElement("div");w.className="cw-email-right-panel";let v=document.createElement("div");v.className="cw-email-fields-section";let x=document.createElement("div");x.className="cw-email-preview-section";let z=document.createElement("div");z.className="cw-email-preview-header";let B=document.createElement("span");B.textContent="Preview do E-mail",B.className="cw-email-preview-title";let C=document.createElement("div");C.className="cw-email-preview-actions";let N=(U,oe=!1)=>{let X=document.createElement("button");return X.textContent=U,X.className="cw-email-btn"+(oe?" primary":""),X},$=N("Copiar HTML"),W=N("Preencher no CRM",!0),I=N("Smart CR");I.classList.add("warning"),C.appendChild(I),C.appendChild($),C.appendChild(W),z.appendChild(B),z.appendChild(C);let q=document.createElement("div");q.contentEditable="true",q.className="cw-email-preview-content",x.appendChild(z),x.appendChild(q),K(),w.appendChild(v),w.appendChild(x),c.appendChild(u),c.appendChild(w),r.appendChild(s),r.appendChild(c);let _=document.createElement("div");Object.assign(_.style,ze),r.appendChild(_),Re(r,_),document.body.appendChild(r);function H(){t=!t,t?(ge(),r.style.display="flex",Eo(r),o.length===0&&j()):(be(),r.style.display="none"),Se(t,r,"cw-btn-email")}async function j(){f.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',o=await Ko.getTemplates(),ee()}function L(U,oe,X){let J=document.createElement("div");J.className="cw-email-cat-header",J.tabIndex=0,J.setAttribute("role","button"),J.setAttribute("aria-expanded",String(X));let F=document.createElement("span");F.textContent=U,J.appendChild(F);let l=document.createElement("span");l.className="cw-email-cat-badge",l.textContent=oe;let b=document.createElement("span");b.className="cw-email-cat-arrow",b.textContent=X?"\u25BE":"\u25B8";let p=document.createElement("div");return p.className="cw-email-cat-right",p.appendChild(l),p.appendChild(b),J.appendChild(p),J.onclick=()=>{i.has(U)?i.delete(U):i.add(U),ee()},J.addEventListener("keydown",S=>{(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),J.click())}),J}function D(U){let oe=n&&n.id===U.id,X=document.createElement("div");if(X.className="cw-email-list-item"+(oe?" selected":""),X.tabIndex=0,X.setAttribute("role","button"),X.setAttribute("aria-pressed",String(!!oe)),oe){let l=document.createElement("div");l.className="cw-email-list-indicator",X.appendChild(l)}let J=document.createElement("span");J.className="cw-email-list-icon",J.innerHTML=U.isSmartCR?"\u26A1":U.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",X.appendChild(J);let F=document.createElement("span");return F.className="cw-email-list-text",F.textContent=U.name,X.appendChild(F),X.onclick=()=>ae(U),X.addEventListener("keydown",l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),X.click())}),X}function ee(){f.innerHTML="";let U=Ja(o,a);if(U.length===0){f.innerHTML=`
                <div class="cw-email-list-empty">
                    <div class="cw-email-list-empty-icon">\u{1F50D}</div>
                    <div class="cw-email-list-empty-text">Nenhum resultado para "${a}"</div>
                </div>`;return}[...new Set(U.map(X=>X.category))].sort((X,J)=>X.localeCompare(J)).forEach(X=>{let J=i.has(X)||a.length>0,F=U.filter(l=>l.category===X);f.appendChild(L(X,F.length,J)),J&&F.forEach(l=>{f.appendChild(D(l))})})}let te=null;async function ae(U){n?.id!==U.id&&(n=U,te&&clearTimeout(te),w.style.opacity="0",w.style.transform="translateY(5px)",te=setTimeout(()=>{I.style.display=U.isSmartCR?"block":"none",W.style.display=U.isSmartCR?"none":"block",$.style.display=U.isSmartCR?"none":"block",ee(),Z(),K(),w.style.opacity="1",w.style.transform="translateY(0)",te=null},150))}function Z(){if(v.innerHTML="",!n||n.isSmartCR){n?.isSmartCR?(v.style.display="block",v.innerHTML=`<div class="cw-email-smartcr-hint">
                    <span class="cw-email-smartcr-hint-icon">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):v.style.display="none";return}let U=n.placeholders&&n.placeholders.length>0;if(v.style.display=U?"block":"none",!U)return;let oe=document.createElement("div");oe.className="cw-email-fields-grid",(n.placeholders||[]).forEach(X=>{let J=document.createElement("div"),F=document.createElement("label");F.className="cw-email-field-label",F.textContent=X.label;let l=document.createElement("input");l.className="cw-email-field-input",l.type=X.type||"text",l.dataset.key=X.key,X.auto==="agentName"&&(l.value=nt().split(" ")[0]),l.addEventListener("input",K),J.appendChild(F),J.appendChild(l),oe.appendChild(J)}),v.appendChild(oe)}function K(){if(!n){q.innerHTML=`
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center;">
                    <div class="cw-animate-float" style="width: 140px; height: 140px; margin-bottom: 24px;">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="55" fill="#f8f9fa"/>
                            <!-- Envelope Base -->
                            <path d="M30 40C30 37.7909 31.7909 36 34 36H86C88.2091 36 90 37.7909 90 40V80C90 82.2091 88.2091 84 86 84H34C31.7909 84 30 82.2091 30 80V40Z" fill="white" stroke="#e8eaed" stroke-width="2"/>
                            <!-- Detalhes decorativos (paleta Apple do m\xF3dulo, n\xE3o mais as cores oficiais do Google) -->
                            <path d="M30 40L60 60L90 40" stroke="${le.primary}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M30 80L50 65" stroke="#FF3B30" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <path d="M90 80L70 65" stroke="#FF9500" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <!-- Small Floating icons -->
                            <circle cx="95" cy="30" r="8" fill="#34C759"/>
                            <path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <rect x="20" y="70" width="12" height="12" rx="3" fill="${le.primary}" opacity="0.8"/>
                        </svg>
                    </div>
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${le.textPrimary}; margin-bottom: 8px;">
                        Pronto para come\xE7ar?
                    </div>
                    <div style="font-size: 14px; color: ${le.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.
                    </div>
                </div>`;return}if(n.isSmartCR){q.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${n.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let U=n.template;(v.querySelectorAll("input")||[]).forEach(X=>{let J=X.dataset.key,F=X.value;if(X.type==="date"&&F){let[b,p,S]=F.split("-");F=`${p}/${S}/${b}`}F=F||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${J}</span>`;let l=J.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");U=U.replace(new RegExp(l,"g"),F)}),q.innerHTML=U}return h.addEventListener("input",U=>{a=U.target.value,E.style.display=a?"block":"none",ee()}),$.onclick=()=>{let U=q.innerHTML,oe=new Blob([U],{type:"text/html"}),X=q.innerText,J=[new ClipboardItem({"text/html":oe,"text/plain":new Blob([X],{type:"text/plain"})})];navigator.clipboard.write(J).then(()=>Y("E-mail copiado com sucesso!"),()=>{k.playError(),Y("Erro ao copiar e-mail",{error:!0})})},W.onclick=async()=>{if(!n)return;let U=st(),oe={...n,body:q.innerHTML};try{await Vo(oe),H()}catch{k.playError(),Y("Erro ao preencher e-mail",{error:!0})}finally{U()}},I.onclick=async()=>{if(!n||!n.isSmartCR)return;let U=st();try{await Ft(n.code),H()}catch{k.playError(),Y("Erro ao aplicar Smart CR",{error:!0})}finally{U()}},H}var Qo=["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],Ut={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:Qo,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:Qo,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]}};var re={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",danger:"#D93025",dangerBg:"#FCE8E6",success:"#34A853",successBg:"#E6F4EA"},Za={inicio:{PT:"Abertura",ES:"Apertura"},meio:{PT:"Implementa\xE7\xE3o (Tag Support)",ES:"Implementaci\xF3n"},fim:{PT:"Fechamento",ES:"Cierre"}};function Qa(){if(document.getElementById("csa-styles-v2"))return;let e=document.createElement("style");e.id="csa-styles-v2",e.textContent=`
        #call-script-popup { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        /* --- BANNER DE CONTEXTO --- */
        .csa-context-banner {
            padding: 20px 20px 16px 20px;
            background: ${re.bgSurface};
            border-bottom: 1px solid #F1F3F4;
            display: flex; flex-direction: column; gap: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            position: relative; z-index: 5;
        }
        .csa-ctx-top { display: flex; justify-content: space-between; align-items: center; }
        .csa-ctx-name-wrap { display: flex; align-items: center; gap: 10px; }
        .csa-ctx-name { font-size: 16px; font-weight: 500; color: ${re.textPrimary}; }
        .csa-live-badge {
            font-size: 10px; font-weight: 700; color: ${re.primary}; background: ${re.primaryBg};
            padding: 2px 8px; border-radius: 4px; text-transform: uppercase;
        }
        .csa-live-dot {
            width: 8px; height: 8px; background: #10B981; border-radius: 50%;
            animation: csaPulseGreen 2s infinite;
        }
        @keyframes csaPulseGreen {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .csa-ctx-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .csa-data-pill {
            background: #F8F9FA; border: 1px solid transparent; border-radius: 10px; padding: 8px 12px;
            cursor: pointer; position: relative; overflow: hidden;
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .csa-data-pill:hover { background: ${re.bgSurface}; border-color: #DADCE0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transform: translateY(-1px); }
        .csa-data-pill:active { transform: scale(0.98); }
        .csa-data-pill.copied { background: ${re.successBg} !important; border-color: ${re.success} !important; }
        .csa-pill-label { font-size: 9px; font-weight: 700; color: ${re.textSecondary}; text-transform: uppercase; margin-bottom: 2px; letter-spacing: 0.5px; }
        .csa-data-value { font-size: 13px; color: ${re.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .csa-data-value.mono { font-family: 'SF Mono', 'Roboto Mono', monospace; font-weight: 500; color: ${re.primary}; }
        .csa-copy-hint {
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #1E8E3E; font-weight: 700; text-transform: uppercase;
            opacity: 0; transition: opacity 0.2s; pointer-events: none;
        }
        .csa-data-pill.copied .csa-copy-hint { opacity: 1; }
        .csa-data-pill.copied .csa-data-value { opacity: 0.3; }

        /* --- MENSAGEM AM (op\xE7\xF5es extras) --- */
        .csa-more-options { margin-top: 8px; }
        .csa-toggle-options-btn {
            width: 100%; background: transparent; border: none; padding: 4px 0;
            display: flex; align-items: center; justify-content: center; cursor: pointer;
            color: #9AA0A6; transition: color 0.2s;
        }
        .csa-options-arrow { transition: transform 0.3s ease; }
        .csa-options-arrow.expanded { transform: rotate(180deg); }
        .csa-options-content {
            max-height: 0; overflow: hidden; opacity: 0; padding: 0 4px;
            transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease, margin-top 0.4s ease;
        }
        .csa-options-content.expanded { max-height: 400px; opacity: 1; margin-top: 8px; }

        .csa-am-card { padding: 12px; background: #F8F9FA; border: 1px solid #DADCE0; border-radius: 12px; margin-bottom: 8px; }
        .csa-am-btn {
            width: 100%; background: ${re.bgSurface}; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px;
            display: flex; align-items: center; gap: 12px; cursor: pointer; box-sizing: border-box;
            transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        .csa-am-btn:hover { border-color: ${re.primary}; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .csa-am-icon { background: ${re.primaryBg}; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .csa-am-btn-text { text-align: left; }
        .csa-am-btn-title { font-size: 11px; font-weight: 700; color: #3C4043; }
        .csa-am-btn-sub { font-size: 10px; color: ${re.textSecondary}; }

        .csa-am-review-container { display: none; max-height: 0; opacity: 0; overflow: hidden; margin-top: 0; transition: all 0.3s ease; }
        .csa-am-review-container.visible { display: block; max-height: 300px; opacity: 1; margin-top: 12px; }
        .csa-am-message-area {
            width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px;
            font-family: inherit; font-size: 13px; color: #3C4043; outline: none; resize: none;
            box-sizing: border-box; background: ${re.bgSurface}; line-height: 1.4;
        }
        .csa-am-copy-final {
            width: 100%; margin-top: 8px; padding: 10px; background: ${re.primary}; color: white; border: none;
            border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;
        }
        .csa-am-copy-final.copied-flash { background: ${re.success}; }

        /* --- BARRA DE PROGRESSO --- */
        .csa-progress-container { height: 6px; background: ${re.borderSubtle}; width: 100%; position: relative; overflow: hidden; }
        .csa-progress-fill {
            height: 100%; width: 0%; border-radius: 0 3px 3px 0;
            transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            background: linear-gradient(90deg, ${re.primary}, #00C6FF, ${re.primary});
            background-size: 200% 100%;
            animation: csaShimmer 2s infinite linear;
        }
        .csa-progress-fill.complete { background: ${re.success}; animation: none; }
        @keyframes csaShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        /* --- SEGMENTED CONTROL (Tipo / Idioma) --- */
        .csa-content-area { padding: 16px; overflow-y: auto; flex-grow: 1; background: ${re.bgApp}; scroll-behavior: smooth; }
        .csa-controls { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .csa-segmented-control { display: flex; background: #E3E3E8; padding: 2px; border-radius: 10px; gap: 2px; position: relative; margin-bottom: 16px; }
        .csa-segmented-control button {
            flex: 1; border: none; background: transparent; padding: 8px 4px; font-size: 12px; font-weight: 600;
            border-radius: 8px; cursor: pointer; transition: color 0.3s ease; color: ${re.textSecondary};
            position: relative; z-index: 2;
        }
        .csa-segmented-control button.active { color: ${re.textPrimary}; }
        .csa-segmented-indicator {
            position: absolute; top: 2px; left: 2px; bottom: 2px; background: ${re.bgSurface};
            border-radius: 8px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* --- CARDS DO CHECKLIST --- */
        .csa-card { background: ${re.bgSurface}; border: 1px solid ${re.borderSubtle}; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02); }
        .csa-card.done { box-shadow: inset 4px 0 0 ${re.success}, 0 1px 3px rgba(0,0,0,0.05); }
        .csa-card-title { font-size: 11px; font-weight: 700; color: ${re.textSecondary}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; user-select: none; }
        .csa-card-counter { font-size: 11px; opacity: 0.7; font-weight: 500; background: #f1f3f4; padding: 2px 8px; border-radius: 10px; }
        .csa-card-counter.done { opacity: 1; color: #1e8e3e; background: ${re.successBg}; }

        .csa-item-row { display: flex; align-items: flex-start; padding: 10px 8px; cursor: pointer; border-radius: 10px; transition: background 0.2s ease; color: ${re.textPrimary}; font-size: 14px; line-height: 1.5; margin-bottom: 2px; }
        .csa-item-row:not(.completed):hover { background: rgba(0, 0, 0, 0.03); }
        .csa-item-row:not(.completed):hover .csa-checkbox { border-color: ${re.primary}; }
        .csa-item-row.completed { background: rgba(0, 0, 0, 0.02); }

        .csa-checkbox {
            min-width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${re.borderSubtle};
            margin-right: 12px; margin-top: 1px; display: flex; align-items: center; justify-content: center;
            transition: border-color 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.15s ease;
            background: #fff;
        }
        .csa-checkbox.checked { background: ${re.primary}; border-color: ${re.primary}; }
        .csa-checkbox.pulse { transform: scale(1.15); }

        .csa-item-text { position: relative; display: inline-block; flex: 1; transition: color 0.3s ease; }
        .csa-item-text.completed { color: ${re.textSecondary}; }
        .csa-item-text::after { content: ''; position: absolute; left: 0; top: 50%; width: 0; height: 1.5px; background: ${re.textSecondary}; transition: width 0.3s ease; }
        .csa-item-text.completed::after { width: 100%; }

        .csa-empty-state { padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .csa-empty-state-icon { font-size: 24px; }

        /* --- FOOTER --- */
        .csa-footer { padding: 12px 16px; border-top: 1px solid #F1F3F4; background: ${re.bgSurface}; display: flex; justify-content: space-between; align-items: center; }
        .csa-credit { font-size: 10px; color: #bdc1c6; }
        .csa-reset-btn {
            background: transparent; border: none; color: ${re.danger}; font-size: 12px; font-weight: 600;
            cursor: pointer; padding: 6px 12px; border-radius: 20px; transition: background 0.2s ease, transform 0.15s ease;
            display: flex; align-items: center; gap: 4px;
        }
        .csa-reset-btn:hover { background: ${re.dangerBg}; }
        .csa-reset-btn:active { transform: scale(0.9); }

        /* Duas anima\xE7\xF5es infinite (dot "ao vivo" e shimmer da barra de
           progresso) rodando o tempo inteiro que o script fica aberto,
           sem nenhuma prote\xE7\xE3o de reduced-motion. */
        @media (prefers-reduced-motion: reduce) {
            .csa-live-dot { animation: none !important; }
            .csa-progress-fill { animation: none !important; }
            .csa-checkbox, .csa-checkbox.pulse, .cw-step-btn-hero,
            .csa-data-pill, .csa-segmented-indicator {
                transition: opacity 0.15s ease, background-color 0.15s ease, border-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function ea(){let e="v3.1.0";Qa();let t={},o="PT",n="BAU",a=!1,i=document.createElement("div");i.id="call-script-popup",i.classList.add("cw-module-window"),Object.assign(i.style,Ce,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:i,googleLine:null},s=null;function c(){a&&Ne().then(p=>{let S=i.querySelector("#cw-ctx-name"),m=i.querySelector("#cw-ctx-cid"),A=i.querySelector("#cw-ctx-email");if(S&&(S.textContent=p.advertiserName||"Cliente Desconhecido"),m){let y=p.cid||"---";m.textContent!==y&&(m.textContent=y)}if(A){let y=p.clientEmail||"N\xE3o encontrado";A.textContent!==y&&(A.textContent=y,A.title=y)}})}function u(){Ne().then(p=>{let S=new Date().toLocaleDateString("pt-BR"),m=i.querySelector("#cw-am-message-area"),A=i.querySelector("#cw-am-review-container"),y=`Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${p.advertiserName||"Cliente"}) em andamento hoje (${S}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${p.advertiserName||"---"}
CID: ${p.cid||"---"}
Case ID: ${p.caseId||"---"}
E-mail: ${p.clientEmail||"---"}`;m&&(m.value=y),A&&(A.classList.add("visible"),A.scrollIntoView({behavior:"smooth",block:"end"}))})}function d(){a=!a,Se(a,i,"cw-btn-script"),a?(ge(),c(),s||(s=setInterval(c,2e3))):(be(),s&&(clearInterval(s),s=null))}let h=we(i,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",r,()=>{d()});i.appendChild(h);let f=document.createElement("div");f.className="csa-context-banner",f.innerHTML=`
      <div class="csa-ctx-top">
          <div class="csa-ctx-name-wrap">
              <div class="csa-live-dot" title="Monitoramento Ativo"></div>
              <span id="cw-ctx-name" class="csa-ctx-name">Carregando...</span>
          </div>
          <div class="csa-live-badge">Live</div>
      </div>

      <div class="csa-ctx-grid">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div class="csa-pill-label">CID (Conta)</div>
              <div id="cw-ctx-cid" class="csa-data-value mono">---</div>
              <div class="csa-copy-hint">Copiado!</div>
          </div>

          <div class="csa-data-pill" id="cw-pill-email">
              <div class="csa-pill-label">Email de Contato</div>
              <div id="cw-ctx-email" class="csa-data-value">---</div>
              <div class="csa-copy-hint">Copiado!</div>
          </div>
      </div>

      <div class="csa-more-options">
          <button id="csa-toggle-options" class="csa-toggle-options-btn">
              <svg id="csa-options-arrow" class="csa-options-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>

          <div id="csa-options-content" class="csa-options-content">
              <div class="csa-am-card">
                  <button id="cw-pill-message" class="csa-am-btn">
                      <div class="csa-am-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${re.primary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div class="csa-am-btn-text">
                          <div class="csa-am-btn-title">Mensagem AM</div>
                          <div class="csa-am-btn-sub">Gerar aviso de insucesso</div>
                      </div>
                  </button>

                  <div id="cw-am-review-container" class="csa-am-review-container">
                      <textarea id="cw-am-message-area" class="csa-am-message-area"></textarea>
                      <button id="cw-am-copy-final" class="csa-am-copy-final">Copiar Mensagem Final</button>
                  </div>
              </div>
          </div>
      </div>
  `;let E=f.querySelector("#csa-toggle-options"),w=f.querySelector("#csa-options-content"),v=f.querySelector("#csa-options-arrow"),x=!1;E.onclick=()=>{x=!x,v.classList.toggle("expanded",x),w.classList.toggle("expanded",x),k.playClick()};let z=f.querySelector("#cw-pill-message"),B=f.querySelector("#cw-am-copy-final"),C=f.querySelector("#cw-am-message-area");z.addEventListener("click",()=>{u()}),B.addEventListener("click",()=>{C.value&&(navigator.clipboard.writeText(C.value),Y("Mensagem copiada!"),k.playSuccess(),B.classList.add("copied-flash"),B.textContent="Copiado!",setTimeout(()=>{B.classList.remove("copied-flash"),B.textContent="Copiar Mensagem Final"},2e3))});let N=(p,S)=>{let m=f.querySelector(p),A=f.querySelector(S);m.onclick=()=>{let y=A.textContent;!y||y.includes("---")||y.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(y),k.playSuccess(),m.classList.add("copied"),setTimeout(()=>m.classList.remove("copied"),1500))}};i.appendChild(f);let $=document.createElement("div");$.className="csa-progress-container";let W=document.createElement("div");W.className="csa-progress-fill",$.appendChild(W),i.appendChild($);let I=document.createElement("div");I.id="csa-content",I.className="csa-content-area",i.appendChild(I);let q=document.createElement("div");q.className="csa-footer";let _=document.createElement("span");_.className="csa-credit",_.textContent="by lucaste@";let H=document.createElement("button");H.className="csa-reset-btn",H.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',H.onclick=async()=>{if(await ve("Resetar todo o progresso do script? Essa a\xE7\xE3o n\xE3o pode ser desfeita.",{danger:!0,confirmText:"Resetar"})){for(let S in t)delete t[S];F()}},q.appendChild(_),q.appendChild(H),i.appendChild(q);let j=document.createElement("div");j.className="csa-controls";let L=document.createElement("div");L.className="csa-segmented-control",L.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `;let D=document.createElement("div");D.className="csa-segmented-control",D.innerHTML=`
      <div class="csa-segmented-indicator" id="lang-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-lang="PT">PT</button>
      <button data-lang="ES">ES</button>
  `,j.appendChild(L),j.appendChild(D),I.appendChild(j);let ee=L.querySelectorAll("button"),te=L.querySelector("#type-indicator");ee.forEach((p,S)=>{p.onclick=()=>{ee.forEach(m=>m.classList.remove("active")),p.classList.add("active"),te.style.transform=`translateX(${S*(L.offsetWidth/2-2)}px)`,n=p.dataset.type,k.playClick(),F()}});let ae=D.querySelectorAll("button"),Z=D.querySelector("#lang-indicator");ae.forEach((p,S)=>{p.onclick=()=>{ae.forEach(m=>m.classList.remove("active")),p.classList.add("active"),Z.style.transform=`translateX(${S*(D.offsetWidth/2-2)}px)`,o=p.dataset.lang,k.playClick(),F()}});let K=document.createElement("div");K.id="csa-checklist-area",I.appendChild(K);let U=document.createElement("div");Object.assign(U.style,ze),U.className="no-drag",U.title="Redimensionar",i.appendChild(U),Re(i,U),document.body.appendChild(i),N("#cw-pill-cid","#cw-ctx-cid"),N("#cw-pill-email","#cw-ctx-email");function oe(p){return p.replace(/\n/g,"<br>")}function X(p,S,m,A){let y=`${p}-${S}-${A}`,M=!!t[y],g=document.createElement("div");g.className="csa-item-row"+(M?" completed":"");let T=document.createElement("div");T.className="csa-checkbox"+(M?" checked":""),T.innerHTML=M?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"";let O=document.createElement("span");return O.className="csa-item-text"+(M?" completed":""),O.innerHTML=oe(m),g.onclick=()=>{let G=!t[y];t[y]=G,k.playClick(),g.classList.toggle("completed",G),O.classList.toggle("completed",G),T.classList.toggle("checked",G),T.innerHTML=G?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"",G&&(T.classList.add("pulse"),setTimeout(()=>T.classList.remove("pulse"),150)),l(p,Ut[p])},g.appendChild(T),g.appendChild(O),{row:g,isDone:M}}function J(p,S,m){let A=document.createElement("div");A.className="csa-card";let y=document.createElement("div");y.className="csa-card-title",y.textContent=Za[S][o]||"";let M=document.createElement("span");M.className="csa-card-counter",y.appendChild(M),A.appendChild(y);let g=0;m.forEach((O,G)=>{let{row:R,isDone:ne}=X(p,S,O,G);ne&&g++,A.appendChild(R)});let T=g===m.length&&m.length>0;return A.classList.toggle("done",T),M.classList.toggle("done",T),M.textContent=`${g}/${m.length}`,A}function F(){K.innerHTML="";let p=`${o} ${n}`,S=Ut[p];if(!S){K.innerHTML='<div class="csa-empty-state"><div class="csa-empty-state-icon">\u2615</div><div>Script n\xE3o configurado.</div></div>',W.style.width="0%";return}let m=0,A=0;["inicio","meio","fim"].forEach(y=>{S[y]&&(m+=S[y].length)}),["inicio","meio","fim"].forEach(y=>{let M=S[y];!M||M.length===0||(M.forEach((g,T)=>{let O=`${p}-${y}-${T}`;t[O]&&A++}),K.appendChild(J(p,y,M)))}),b(m,A)}function l(p,S){let m=0,A=0;["inicio","meio","fim"].forEach(y=>{let M=S[y]||[];m+=M.length,M.forEach((g,T)=>{t[`${p}-${y}-${T}`]&&A++})}),b(m,A),setTimeout(()=>F(),200)}function b(p,S){let m=p===0?0:S/p*100;W.style.width=`${m}%`,W.classList.toggle("complete",m===100)}return F(),d}var lt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Pe={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},He={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},It={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}};function en(){if(document.getElementById("cw-links-styles"))return;let e=document.createElement("style");e.id="cw-links-styles",e.textContent=`
        .cw-links-layout { display: flex; height: calc(100% - 56px); width: 100%; position: relative; }

        /* --- SIDEBAR --- */
        .cw-links-sidebar {
            width: 80px; flex-shrink: 0; background: ${He.bgSidebar};
            border-right: 1px solid ${He.borderSubtle};
            display: flex; flex-direction: column; align-items: center;
            padding: 16px 0; overflow-y: auto; gap: 8px;
            scrollbar-width: none; z-index: 2;
        }
        .cw-links-nav-btn {
            width: 56px; height: 56px; border-radius: 16px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            cursor: pointer; color: ${He.textSecondary};
            transition: background 0.2s var(--cw-ease-standard), color 0.2s ease;
            position: relative; background: transparent;
        }
        .cw-links-nav-btn:hover:not(.active) { background: #F1F3F4; }
        .cw-links-nav-btn:hover:not(.active) .cw-links-nav-icon { transform: scale(1.1); }
        .cw-links-nav-btn.active { background: var(--cat-bg); color: var(--cat-color); }
        .cw-links-nav-btn.active .cw-links-nav-icon { transform: scale(1.1); }
        .cw-links-nav-btn.history-open { background: #3C4043; color: #FFFFFF; }
        .cw-links-nav-icon { width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s; }
        .cw-links-nav-label { font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px; }
        .cw-links-nav-sep { width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0; }

        /* --- CONTE\xDADO --- */
        .cw-links-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: ${He.bgApp}; position: relative; z-index: 1; }

        .cw-links-search-bar { padding: 16px 24px; flex-shrink: 0; }
        .cw-links-search-wrap {
            position: relative; width: 100%; height: 44px;
            border-radius: 12px; border: 1px solid transparent;
            background: #FFFFFF; transition: all 0.2s;
            display: flex; align-items: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04); box-sizing: border-box;
        }
        .cw-links-search-wrap:focus-within { box-shadow: 0 4px 12px rgba(26,115,232,0.15); border-color: #1a73e8; }
        .cw-links-search-icon { margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
        .cw-links-search-input {
            flex: 1; height: 100%; border: none; background: transparent;
            padding: 0 12px; font-size: 14px; color: ${He.textPrimary};
            outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
        }

        .cw-links-scroll { flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth; }
        .cw-links-search-results-label { font-size: 12px; font-weight: 700; color: #5f6368; margin: 20px 0 10px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-links-empty { text-align: center; padding: 60px; color: #999; font-size: 13px; }

        .cw-links-cat-header {
            display: flex; align-items: center; gap: 8px;
            font-size: 13px; font-weight: 800; color: var(--cat-color);
            text-transform: uppercase; letter-spacing: 0.5px;
            margin: 32px 0 12px 0; padding-top: 10px;
        }
        .cw-links-cat-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--cat-color); }
        .cw-links-cat-grid { display: grid; grid-template-columns: 1fr; gap: 8px; }
        .cw-links-spacer { height: 80px; }

        /* --- CARD --- */
        .cw-links-card {
            display: flex; align-items: center; gap: 16px;
            padding: 12px 16px;
            background: #FFFFFF;
            border: 1px solid transparent;
            border-left: 4px solid transparent;
            border-radius: 16px;
            cursor: pointer;
            text-decoration: none; color: inherit;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            transition: transform 0.2s var(--cw-ease-elastic), box-shadow 0.2s var(--cw-ease-elastic), border-color 0.2s ease;
            position: relative; overflow: hidden; box-sizing: border-box;
        }
        .cw-links-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
            border-color: rgba(0,0,0,0.05);
            border-left-color: var(--cat-color);
        }
        .cw-links-card:hover .cw-links-copy-btn { opacity: 1; background: #F1F3F4; }
        .cw-links-card:focus-visible { outline: 2px solid var(--cat-color); outline-offset: 2px; }

        .cw-links-icon-box {
            width: 40px; height: 40px; border-radius: 12px;
            background: var(--cat-bg); color: var(--cat-color);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .cw-links-icon-box svg { width: 22px; height: 22px; }

        .cw-links-card-meta { flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
        .cw-links-card-title { font-size: 14px; font-weight: 600; color: ${He.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-card-desc { font-size: 12px; color: ${He.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .cw-links-copy-btn {
            width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center;
            color: #9AA0A6; transition: all 0.2s; opacity: 0; cursor: pointer; flex-shrink: 0;
        }

        /* --- OVERLAY DE HIST\xD3RICO --- */
        .cw-links-history-overlay {
            position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
            background: rgba(255,255,255,0.98); z-index: 20;
            display: flex; flex-direction: column;
            transform: translateY(100%); transition: transform 0.3s var(--cw-ease-elastic);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        }
        .cw-links-history-head { padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4; }
        .cw-links-history-title { font-size: 16px; font-weight: 700; color: #202124; }
        .cw-links-history-close { background: none; border: none; cursor: pointer; color: #5f6368; padding: 4px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; }
        .cw-links-history-close:hover { background: #F1F3F4; }
        .cw-links-history-list { flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA; }
        .cw-links-history-empty { text-align: center; color: #999; margin-top: 60px; font-size: 13px; }

        @media (prefers-reduced-motion: reduce) {
            .cw-links-card, .cw-links-nav-btn, .cw-links-nav-icon, .cw-links-history-overlay {
                transition: opacity 0.15s ease, background 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}var Vt="cw_link_history_v4",tn=10;function ta(e,t){try{let o=JSON.parse(localStorage.getItem(Vt)||"[]");o=o.filter(n=>n.url!==e.url),o.unshift({...e,_originalCat:t}),o=o.slice(0,tn),localStorage.setItem(Vt,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function on(){try{return JSON.parse(localStorage.getItem(Vt)||"[]")}catch{return[]}}function oa(){let e="v4.6",t="",o=!1,n=null,a=!1;en();let i=document.createElement("div");i.id="links-popup",i.classList.add("cw-module-window"),Object.assign(i.style,Ce,{right:"100px",width:"600px",height:"650px",background:He.bgApp,overflow:"hidden"});let s=we(i,"Central de Links",e,"Navegue pelas categorias ou use a busca.",{popup:i,googleLine:null},()=>j());i.appendChild(s);let c=document.createElement("div");c.className="cw-links-layout",i.appendChild(c);let u=document.createElement("div");u.className="cw-links-sidebar",c.appendChild(u);let d=document.createElement("div");d.className="cw-links-content",c.appendChild(d);let h=document.createElement("div");h.className="cw-links-search-bar";let f=document.createElement("div");f.className="cw-links-search-wrap";let E=document.createElement("div");E.className="cw-links-search-icon",E.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let w=document.createElement("input");w.className="cw-links-search-input",w.type="text",w.placeholder="Buscar ferramenta ou SOP...",f.appendChild(E),f.appendChild(w),h.appendChild(f),d.appendChild(h);let v=document.createElement("div");v.className="cw-links-scroll",d.appendChild(v);let x=null;function z(){if(x)return;x=document.createElement("div"),x.className="cw-links-history-overlay";let L=document.createElement("div");L.className="cw-links-history-head",L.innerHTML='<span class="cw-links-history-title">\u{1F552} Recentes</span>';let D=document.createElement("button");D.className="cw-links-history-close",D.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',D.onclick=()=>B(),L.appendChild(D),x.appendChild(L);let ee=document.createElement("div");ee.id="cw-history-list",ee.className="cw-links-history-list",x.appendChild(ee),d.appendChild(x)}function B(){a&&(a=!1,N(),q())}function C(){x||z();let L=x.querySelector("#cw-history-list");L.innerHTML="";let D=on();D.length===0?L.appendChild(tt({icon:Pe.history,title:"Nada por aqui ainda",subtitle:"Os links que voc\xEA abrir aparecem aqui pra acesso r\xE1pido depois."})):D.forEach(ee=>{let te=H(ee,Pe[ee._originalCat],!0,ee._originalCat);L.appendChild(te)}),requestAnimationFrame(()=>x.style.transform="translateY(0)")}function N(){x&&(x.style.transform="translateY(100%)")}document.addEventListener("mousedown",L=>{!a||!x||!x.contains(L.target)&&!u.contains(L.target)&&B()}),document.addEventListener("keydown",L=>{L.key==="Escape"&&a&&B()});function $(){u.innerHTML="";let L=W("history","Recentes",Pe.history);L.id="cw-sidebar-btn-history",L.onclick=()=>{k.playClick(),a=!a,a?C():N(),q()},u.appendChild(L);let D=document.createElement("div");D.className="cw-links-nav-sep",u.appendChild(D),Object.keys(lt).forEach(ee=>{let te=lt[ee],ae=W(ee,te.label,Pe[ee]);ae.id=`cw-sidebar-btn-${ee}`,ae.onclick=()=>{k.playClick(),a&&B(),I(ee)},u.appendChild(ae)})}function W(L,D,ee){let te=document.createElement("div");te.className="cw-links-nav-btn",te.title=D,te.dataset.key=L;let ae=It[L];ae&&(te.style.setProperty("--cat-color",ae.color),te.style.setProperty("--cat-bg",ae.bg));let Z=document.createElement("div");Z.className="cw-links-nav-icon",Z.innerHTML=ee||Pe.tasks;let K=document.createElement("div");return K.className="cw-links-nav-label",K.textContent=D,te.appendChild(Z),te.appendChild(K),te}function I(L){let D=document.getElementById(`cat-anchor-${L}`);D&&(D.scrollIntoView({behavior:"smooth",block:"start"}),n=L,q())}function q(){Object.keys(lt).forEach(D=>{let ee=u.querySelector(`#cw-sidebar-btn-${D}`);ee&&ee.classList.toggle("active",n===D&&!a)});let L=u.querySelector("#cw-sidebar-btn-history");L&&L.classList.toggle("history-open",a)}function _(){if(v.innerHTML="",t.trim()!==""){let D=[];if(Object.entries(lt).forEach(([te,ae])=>{let Z=ae.links.filter(K=>K.name.toLowerCase().includes(t.toLowerCase())||K.desc.toLowerCase().includes(t.toLowerCase()));D.push(...Z.map(K=>({...K,_cat:te})))}),D.length===0){v.appendChild(tt({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',title:"Nada encontrado",subtitle:`Nenhum link bate com "${t.trim()}".`}));return}let ee=document.createElement("div");ee.className="cw-links-search-results-label",ee.textContent="Resultados da busca",v.appendChild(ee),D.forEach(te=>{let ae=H(te,Pe[te._cat],!1,te._cat);v.appendChild(ae)});return}Object.entries(lt).forEach(([D,ee])=>{let te=It[D],ae=document.createElement("div"),Z=document.createElement("div");Z.id=`cat-anchor-${D}`,Z.className="cw-links-cat-header",Z.style.setProperty("--cat-color",te.color),Z.innerHTML=`<div class="cw-links-cat-dot"></div>${ee.label}`,ae.appendChild(Z);let K=document.createElement("div");K.className="cw-links-cat-grid",ee.links.forEach(U=>{let oe=H(U,Pe[D],!1,D);K.appendChild(oe)}),ae.appendChild(K),v.appendChild(ae)});let L=document.createElement("div");L.className="cw-links-spacer",v.appendChild(L)}function H(L,D,ee,te){let ae=document.createElement("a");ae.className="cw-links-card",ae.href=L.url,ae.target="_blank",ae.rel="noopener noreferrer";let Z=It[te]||It.history;ae.style.setProperty("--cat-color",Z.color),ae.style.setProperty("--cat-bg",Z.bg);let K=document.createElement("div");K.className="cw-links-icon-box",K.innerHTML=D||Pe.tasks;let U=document.createElement("div");U.className="cw-links-card-meta";let oe=document.createElement("div");oe.className="cw-links-card-title",oe.textContent=L.name;let X=document.createElement("div");X.className="cw-links-card-desc",X.textContent=L.desc,U.appendChild(oe),U.appendChild(X);let J=document.createElement("div");return J.className="cw-links-copy-btn",J.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',J.title="Copiar URL",ae.onclick=()=>{!ee&&te&&ta(L,te)},J.onclick=F=>{F.preventDefault(),F.stopPropagation(),navigator.clipboard.writeText(L.url).then(()=>{k.playClick(),!ee&&te&&ta(L,te),Y("Link copiado!")}).catch(()=>{k.playError(),Y("N\xE3o foi poss\xEDvel copiar o link.",{error:!0})})},ae.appendChild(K),ae.appendChild(U),ae.appendChild(J),ae}w.addEventListener("input",L=>{t=L.target.value,_()});function j(){o=!o,o?ge():be(),Se(o,i,"cw-btn-links")}return document.body.appendChild(i),$(),_(),j}var Ge=[];function Yt(e){Ge=e}var an=60*1e3,Wt={critical:{icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function nn(){if(document.getElementById("cw-broadcast-styles"))return;let e=document.createElement("style");e.id="cw-broadcast-styles",e.textContent=`
        @keyframes cw-bc-pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(147, 51, 234, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0); }
        }

        .cw-btn-interactive { transition: transform 0.1s ease, background 0.2s ease; cursor: pointer; user-select: none; }
        .cw-btn-interactive:active { transform: scale(0.96); }

        /* --- BUSCA --- */
        /* padding vertical sim\xE9trico (12px em cima E embaixo) \xE9 o que importa
           aqui: os \xEDcones s\xE3o posicionados com top:50% relativo \xE0 caixa do
           wrap, que inclui o padding. Com padding-top/bottom diferentes
           (era 12px/0), os 50% do wrap n\xE3o batiam com o centro vertical
           real do input \u2014 os \xEDcones ficavam "flutuando" alguns pixels acima. */
        .cw-bc-search-wrap { position: relative; padding: 12px 24px; flex-shrink: 0; background: #FAFAFA; }
        .cw-bc-search-icon { position: absolute; left: 36px; top: 50%; transform: translateY(-50%); color: #80868b; pointer-events: none; display: flex; }
        .cw-bc-search-input {
            width: 100%; box-sizing: border-box; height: 36px; padding: 0 34px 0 34px;
            border-radius: 10px; border: 1px solid #DADCE0; background: #fff;
            font-size: 13px; font-family: 'Google Sans', Roboto, sans-serif; color: #202124; outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cw-bc-search-input::placeholder { color: #9aa0a6; }
        .cw-bc-search-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.14); }
        .cw-bc-search-clear {
            position: absolute; right: 30px; top: 50%; transform: translateY(-50%);
            width: 20px; height: 20px; border-radius: 50%; display: none;
            align-items: center; justify-content: center; color: #80868b; cursor: pointer;
        }
        .cw-bc-search-clear:hover { background: rgba(0,0,0,0.06); }
        .cw-bc-search-clear.visible { display: flex; }

        /* --- FEED --- */
        .cw-bc-feed { padding: 20px 24px 80px 24px; overflow-y: auto; flex-grow: 1; background: #F8F9FA; display: flex; flex-direction: column; gap: 20px; }

        .cw-bc-card {
            background: #FFFFFF; border-radius: 16px; border: 1px solid rgba(0,0,0,0.12);
            box-shadow: 0 4px 12px rgba(60,64,67,0.08);
            overflow: hidden; transition: opacity 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease; position: relative; width: 100%; box-sizing: border-box; flex-shrink: 0;
        }
        .cw-bc-card.history {
            border: 1px solid rgba(0,0,0,0.05); box-shadow: none; opacity: 0.6; filter: grayscale(0.8);
            margin-bottom: 16px;
        }

        .cw-bc-card-head { padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4; }
        .cw-bc-type-tag { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding: 4px 8px; border-radius: 6px; }
        .cw-bc-type-tag.critical { color: #991B1B; background: #FEF2F2; }
        .cw-bc-type-tag.info { color: #1E40AF; background: #EFF6FF; }
        .cw-bc-type-tag.success { color: #166534; background: #F0FDF4; }
        .cw-bc-date-tag { font-size: 11px; color: #5f6368; font-weight: 500; }
        .cw-bc-card-content { padding: 16px 20px 20px 20px; }
        .cw-bc-msg-title { font-size: 16px; font-weight: 700; color: #202124; margin-bottom: 8px; line-height: 1.4; }
        .cw-bc-msg-body { font-size: 14px; color: #3c4043; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
        /* Global (n\xE3o escopado a .cw-bc-msg-body): parseMessageText() \xE9 usada
           tanto nos cards normais quanto no texto do widget BAU. */
        .cw-bc-link { color: #1967d2; text-decoration: none; font-weight: 500; }
        .cw-bc-msg-meta { font-size: 11px; color: #9aa0a6; margin-top: 12px; display: flex; align-items: center; gap: 6px; }

        .cw-bc-dismiss-btn {
            width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.1);
            background: #fff; color: #5f6368; cursor: pointer; display: flex; align-items: center; justify-content: center;
            transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease; margin-left: 12px;
        }
        .cw-bc-dismiss-btn:hover { color: #1e8e3e; background: #e6f4ea; border-color: #1e8e3e; }

        .cw-card-actions { display: flex; justify-content: flex-end; gap: 12px; padding: 12px 20px; background: #F8F9FA; border-top: 1px solid #F1F3F4; }
        .cw-action-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1px solid transparent; background: transparent; transition: background-color 0.2s; }
        .cw-action-btn.edit { color: #1967D2; }
        .cw-action-btn.edit:hover { background: #E8F0FE; }
        .cw-action-btn.delete { color: #D93025; }
        .cw-action-btn.delete:hover { background: #FCE8E6; }

        .cw-bc-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 0; color: #BDC1C6; gap: 16px; text-align: center; }
        .cw-bc-history-divider { display: flex; align-items: center; justify-content: center; margin: 20px 0; cursor: pointer; color: #1a73e8; font-size: 13px; font-weight: 500; gap: 8px; padding: 8px 16px; border-radius: 20px; background: #E8F0FE; }
        .cw-bc-history-container { display: none; flex-direction: column; gap: 16px; opacity: 0.8; }

        /* --- WIDGET BAU (destaque proposital, paleta roxa pr\xF3pria) ---
           Papel secund\xE1rio por padr\xE3o: s\xF3 a faixa de resumo (cw-bc-bau-header)
           fica sempre vis\xEDvel, compacta. O conte\xFAdo completo (mesmo layout de
           sempre \u2014 slots, bot\xF5es, texto integral) s\xF3 aparece expandido, com
           1 clique na faixa. Quem usa BAU com frequ\xEAncia (LM) expande e o
           app lembra disso enquanto o popup ficar aberto; pra todo mundo
           que s\xF3 passa o olho nos avisos gerais, ele ocupa bem menos espa\xE7o. */
        .cw-bc-bau { margin: 16px 24px 0 24px; padding: 12px 16px; background: #F3E8FD; border: 1px solid #D8B4FE; border-radius: 16px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 4px 12px rgba(147, 51, 234, 0.1); transition: padding 0.25s ease; }
        .cw-bc-bau.expanded { padding: 16px; }
        .cw-bc-bau-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: pointer; }
        .cw-bc-bau.expanded .cw-bc-bau-header { margin-bottom: -4px; }
        .cw-bc-bau-timestamp { font-size: 10px; opacity: 0.7; color: #7E22CE; flex-shrink: 0; }
        .cw-bc-live-indicator { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .cw-bc-pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #9333EA; box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7); animation: cw-bc-pulse 2s infinite; flex-shrink: 0; }
        .cw-bc-bau-label { font-size: 11px; font-weight: 800; color: #7E22CE; text-transform: uppercase; letter-spacing: 0.8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-bc-bau-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .cw-bc-bau-hint { font-size: 11px; font-weight: 600; color: #6D28D9; white-space: nowrap; }
        .cw-bc-bau.expanded .cw-bc-bau-hint { display: none; }
        .cw-bc-bau-chevron { color: #7E22CE; transition: transform 0.25s ease; flex-shrink: 0; }
        .cw-bc-bau.expanded .cw-bc-bau-chevron { transform: rotate(180deg); }
        .cw-bc-bau-detail { display: none; flex-direction: column; gap: 12px; }
        .cw-bc-bau.expanded .cw-bc-bau-detail { display: flex; }
        .cw-bc-bau-slots { display: flex; justify-content: space-between; align-items: center; }
        .cw-bc-bau-slots-row { flex: 1; display: flex; gap: 8px; }
        .cw-bc-bau-slot { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: rgba(255,255,255,0.5); border-radius: 8px; flex: 1; justify-content: center; }
        .cw-bc-bau-flag { font-size: 18px; line-height: 1; }
        .cw-bc-bau-date { font-size: 16px; font-weight: 700; color: #581C87; letter-spacing: -0.5px; }
        .cw-bc-bau-actions { display: flex; gap: 8px; margin-left: 12px; align-items: center; }
        .cw-bc-bau-toggle-btn { background: rgba(255,255,255,0.7); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 12px; padding: 8px 12px; color: #6D28D9; font-size: 12px; font-weight: 600; }
        .cw-bc-bau-edit-btn { border: 1px solid rgba(139, 92, 246, 0.2); background: rgba(255,255,255,0.5); border-radius: 12px; padding: 8px; color: #6D28D9; display: flex; align-items: center; justify-content: center; }
        .cw-bc-bau-edit-btn.compact { border: none; border-radius: 6px; padding: 6px; }
        .cw-bc-bau-full { display: none; margin-top: 12px; padding-top: 12px; border-top: 1px dashed rgba(139, 92, 246, 0.3); font-size: 13px; line-height: 1.5; color: #581C87; }
        .cw-bc-bau-plain { display: flex; justify-content: space-between; align-items: flex-start; }
        .cw-bc-bau-plain-text { font-size: 13px; color: #581C87; line-height: 1.5; flex: 1; }

        /* --- EDITOR --- */
        .cw-editor-overlay {
            position: absolute; inset: 0; background: rgba(255, 255, 255, 0.98);
            z-index: 200; display: flex; flex-direction: column;
            transform: translateY(100%); transition: transform 0.35s var(--cw-ease-elastic);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        }
        .cw-editor-overlay.active { transform: translateY(0); }
        .cw-bc-editor-body { flex: 1; overflow-y: auto; padding: 24px; }
        .cw-bc-editor-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .cw-bc-editor-title { font-size: 20px; font-weight: 700; color: #202124; }
        .cw-bc-editor-field { margin-bottom: 20px; }
        .cw-bc-field-label { font-size: 12px; font-weight: 700; color: #5f6368; margin-bottom: 8px; display: block; }
        .cw-bc-editor-foot { padding: 16px 24px; border-top: 1px solid #F1F3F4; background: #fff; display: flex; justify-content: flex-end; gap: 12px; }

        .cw-hd-input {
            width: 100%; padding: 12px 14px; border: 1px solid #DADCE0; border-radius: 12px;
            font-size: 14px; color: #202124; background: #FFF;
            transition: border 0.2s, box-shadow 0.2s; box-sizing: border-box; outline: none; font-family: 'Google Sans', Roboto, sans-serif;
        }
        .cw-hd-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.1); }
        .cw-hd-input::placeholder { color: #9AA0A6; }

        .cw-radio-group { display: flex; gap: 12px; }
        .cw-radio-option {
            flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
            padding: 12px; border-radius: 12px; border: 1px solid #E0E0E0;
            font-size: 13px; font-weight: 600; cursor: pointer; transition: background-color 0.2s, color 0.2s, border-color 0.2s; position: relative; color: #5F6368;
        }
        .cw-radio-option:hover { background: #F8F9FA; }
        .cw-radio-option input { position: absolute; opacity: 0; }
        .cw-radio-option.info.checked { background: #E8F0FE; color: #1967D2; border-color: #1967D2; }
        .cw-radio-option.critical.checked { background: #FEE2E2; color: #B91C1C; border-color: #EF4444; }
        .cw-radio-option.success.checked { background: #DCFCE7; color: #15803D; border-color: #22C55E; }

        .cw-bc-btn-secondary { padding: 10px 20px; background: white; border: 1px solid #dadce0; color: #5f6368; border-radius: 24px; font-weight: 600; font-size: 13px; }
        .cw-bc-btn-primary { padding: 10px 24px; background: #1a73e8; color: white; border: none; border-radius: 24px; font-weight: 600; box-shadow: 0 4px 12px rgba(26,115,232,0.3); font-size: 13px; }
        .cw-bc-editor-close { background: none; border: none; color: #5f6368; padding: 8px; }

        @media (prefers-reduced-motion: reduce) {
            .cw-bc-pulse-dot { animation: none !important; }
            .cw-bc-card, .cw-bc-bau, .cw-bc-bau-chevron, .cw-editor-overlay {
                transition: opacity 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function Xt(e){if(!e)return"";try{let t=new Date(e);return isNaN(t.getTime())?String(e):t.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(e)}}function Kt(e){if(!e||typeof e!="string")return"";let t=e;return t=t.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" class="cw-bc-link">$1</a>'),t=t.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),t=t.replace(/_(.*?)_/g,"<i>$1</i>"),t=t.replace(/\n/g,"<br>"),t=ko(t),t}function rn(e){let t=[],o=(e||"").split(`
`),n=/\d{1,2}\/\d{1,2}/,a="\u{1F4C5}";if(o.forEach(i=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(i)?a="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(i)&&(a="\u{1F1EA}\u{1F1F8}");let r=i.match(n);if(r){let s=r[0],c=a;/🇧🇷|🇵🇹|PT|BR/i.test(i)?c="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(i)&&(c="\u{1F1EA}\u{1F1F8}"),t.some(d=>d.flag===c&&d.date===s)||t.push({flag:c,date:s})}}),t.length===0){let i=(e||"").match(/\d{1,2}\/\d{1,2}/g);i&&[...new Set(i)].forEach(r=>t.push({flag:"\u{1F4C5}",date:r}))}return t}function aa(){let e="v4.9",t=!1,o=null,n=null,a="",i=!1,r=!1,s=null,c=0,u=null;nn();let d=document.createElement("div");d.id="broadcast-popup",d.classList.add("cw-module-window"),Object.assign(d.style,Ce,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let h={popup:d,googleLine:null};function f(){if(t=!t,Se(t,d,"cw-btn-broadcast"),t){ge();let F=document.getElementById("cw-btn-broadcast");F&&F.classList.remove("has-new"),L()}else be()}let E=we(d,"Central de Avisos",e,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",h,()=>f()),w=E.querySelector(".cw-header-actions")||E.lastElementChild,v=null;function x(){let F=null;try{F=ye()}catch{console.warn("TechSol: Auth Pending")}if(F){if(s=F.split("@")[0].toLowerCase(),r=St.includes(s),r&&w&&!w.querySelector("#cw-admin-btn")){let l=document.createElement("div");l.id="cw-admin-btn",l.className="cw-btn-interactive",l.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(l.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),l.title="Novo Aviso",l.onclick=b=>{b.stopPropagation(),I()},w.insertBefore(l,w.firstChild),v||W(),Z()}}else c<5&&(c++,setTimeout(x,2e3))}if(w){let F=document.createElement("button");F.textContent="Limpar",F.className="cw-btn-interactive",Object.assign(F.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),F.onclick=l=>{l.stopPropagation(),k.playSuccess();let b=Ge.map(p=>p.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(b)),Z(),D()},w.insertBefore(F,w.firstChild)}d.appendChild(E);let z=document.createElement("div");z.className="cw-bc-search-wrap";let B=document.createElement("div");B.className="cw-bc-search-icon",B.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let C=document.createElement("input");C.className="cw-bc-search-input no-drag",C.type="text",C.placeholder="Buscar avisos...";let N=document.createElement("div");N.className="cw-bc-search-clear cw-btn-interactive",N.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',z.append(B,C,N),d.appendChild(z),C.addEventListener("input",F=>{a=F.target.value,N.classList.toggle("visible",a.length>0),Z()}),N.onclick=()=>{C.value="",a="",N.classList.remove("visible"),Z(),C.focus()};let $=document.createElement("div");$.id="cw-update-status",$.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",d.appendChild($);function W(){v=document.createElement("div"),v.className="cw-editor-overlay",v.innerHTML=`
        <div class="cw-bc-editor-body">
            <div class="cw-bc-editor-head">
                <span id="cw-editor-title-label" class="cw-bc-editor-title">Novo Aviso</span>
                <button id="cw-bc-close-x" class="cw-btn-interactive cw-bc-editor-close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>

            <div class="cw-bc-editor-field">
                <label class="cw-bc-field-label">TIPO DO COMUNICADO</label>
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

            <div class="cw-bc-editor-field">
                 <label class="cw-bc-field-label">T\xCDTULO</label>
                 <input id="cw-bc-title" class="cw-hd-input" placeholder="Resumo do assunto">
            </div>

            <div class="cw-bc-editor-field">
                 <label class="cw-bc-field-label">MENSAGEM</label>
                 <textarea id="cw-bc-text" class="cw-hd-input" placeholder="Escreva os detalhes aqui... Suporta HTML e Emojis :)" style="height:160px; resize:none; line-height:1.6;"></textarea>
            </div>
        </div>

        <div class="cw-bc-editor-foot">
            <button id="cw-bc-cancel" class="cw-btn-interactive cw-bc-btn-secondary">Cancelar</button>
            <button id="cw-bc-send" class="cw-btn-interactive cw-bc-btn-primary">Publicar</button>
        </div>
      `,v.querySelectorAll('input[name="cw-bc-type"]').forEach(p=>{p.addEventListener("change",()=>{v.querySelectorAll(".cw-radio-option").forEach(S=>S.classList.remove("checked")),p.parentElement.classList.add("checked")})}),setTimeout(()=>{let p=v.querySelector(".cw-radio-option.info");p&&p.classList.add("checked")},100);let F=v.querySelector("#cw-bc-cancel"),l=v.querySelector("#cw-bc-close-x"),b=v.querySelector("#cw-bc-send");F.onclick=q,l.onclick=q,b.onclick=_,d.appendChild(v)}function I(F=null){if(!v)return;let l=v.querySelector("#cw-editor-title-label"),b=v.querySelector("#cw-bc-title"),p=v.querySelector("#cw-bc-text"),S=v.querySelector("#cw-bc-send");if(F){n=F.id,l.textContent="Editar Aviso",b.value=F.title||"",p.value=F.text||"",S.textContent="Salvar Altera\xE7\xF5es";let m=F.type||"info",A=v.querySelector(`input[name="cw-bc-type"][value="${m}"]`);A&&A.click()}else{n=null,l.textContent="Novo Aviso",b.value="",p.value="",S.textContent="Publicar";let m=v.querySelector('input[name="cw-bc-type"][value="info"]');m&&m.click()}v.classList.add("active"),setTimeout(()=>b.focus(),300)}function q(){v&&v.classList.remove("active"),n=null}async function _(){let F=v.querySelector("#cw-bc-send"),l=v.querySelector("#cw-bc-title"),b=v.querySelector("#cw-bc-text"),p=v.querySelector('input[name="cw-bc-type"]:checked'),S=p?p.value:"info";if(!l.value.trim()||!b.value.trim()){k.playError(),Y("Preencha todos os campos!",{error:!0});return}F.textContent="Salvando...",F.style.opacity="0.7";let m=!1;n?m=await me.updateBroadcast(n,{title:l.value,text:b.value,type:S}):m=await me.sendBroadcast({title:l.value,text:b.value,type:S,author:s||"admin"}),m?(Y(n?"Atualizado!":"Publicado!"),k.playSuccess(),q(),setTimeout(()=>L(),1500)):(k.playError(),Y("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),F.textContent=n?"Salvar Altera\xE7\xF5es":"Publicar",F.style.opacity="1")}async function H(F){if(await ve("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await me.deleteBroadcast(F)){Y("Aviso removido."),k.playClick();let p=Ge.findIndex(S=>S.id===F);p>-1&&Ge.splice(p,1),Z(),setTimeout(()=>L(),1500)}else k.playError(),Y("Erro ao excluir.",{error:!0})}let j=document.createElement("div");j.className="cw-nice-scroll cw-bc-feed",d.appendChild(j);async function L(){t&&($.style.display="block",$.innerHTML="\u{1F504} Sincronizando...");try{let F=await me.fetchData();if(F&&F.broadcast){if(u&&!t){let l=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");F.broadcast.some(p=>!u.has(p.id)&&!l.includes(p.id))&&k.playNotification()}u=new Set(F.broadcast.map(l=>l.id)),Yt(F.broadcast),D(),t&&(Z(),$.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{$.style.display="none"},1500))}}catch{t&&($.innerHTML="\u26A0\uFE0F Offline")}}function D(){let F=document.getElementById("cw-btn-broadcast");if(!F)return;let l=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Ge.some(p=>!l.includes(p.id))){if(F.classList.add("has-new"),!F.querySelector(".cw-badge")){let p=document.createElement("div");p.className="cw-badge",Object.assign(p.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),F.appendChild(p)}}else{F.classList.remove("has-new");let p=F.querySelector(".cw-badge");p&&p.remove()}}function ee(F,l){return l?`${F.title||""} ${F.text||""}`.toLowerCase().includes(l):!0}function te(F){let l=d.querySelector("#cw-bau-widget");l&&l.remove();let b=document.createElement("div");b.id="cw-bau-widget",b.className="cw-bc-bau";let p=rn(F.text),S="",m='<button id="cw-bau-toggle-btn" class="cw-btn-interactive cw-bc-bau-toggle-btn">Detalhes</button>';r&&(m=`
            <button class="cw-bau-edit cw-btn-interactive cw-bc-bau-edit-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            ${m}
          `),p.length>0?S=`
              <div class="cw-bc-bau-slots">
                  <div class="cw-bc-bau-slots-row">${p.map(G=>`
              <div class="cw-bc-bau-slot">
                  <span class="cw-bc-bau-flag">${G.flag}</span>
                  <span class="cw-bc-bau-date">${G.date}</span>
              </div>
          `).join("")}</div>
                  <div class="cw-bc-bau-actions">${m}</div>
              </div>
              <div id="cw-bau-full" class="cw-bc-bau-full">${Kt(F.text)}</div>
          `:S=`
            <div class="cw-bc-bau-plain">
                <div class="cw-bc-bau-plain-text">${Kt(F.text)}</div>
                ${r?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive cw-bc-bau-edit-btn compact">\u270F\uFE0F</button></div>':""}
            </div>
          `;let A=[...new Set(p.map(O=>O.flag))].join(""),y=p.length>0?`${A} \xB7 ${p.length} ${p.length>1?"datas":"data"}`:"Ver detalhes";b.className="cw-bc-bau"+(i?" expanded":""),b.innerHTML=`
          <div class="cw-bc-bau-header cw-btn-interactive">
              <div class="cw-bc-live-indicator">
                  <div class="cw-bc-pulse-dot"></div>
                  <span class="cw-bc-bau-label">Disponibilidade BAU</span>
              </div>
              <div class="cw-bc-bau-right">
                  <span class="cw-bc-bau-hint">${y}</span>
                  <span class="cw-bc-bau-timestamp">${Xt(F.date)}</span>
                  <svg class="cw-bc-bau-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
          </div>
          <div class="cw-bc-bau-detail">${S}</div>
      `,$.after(b);let M=b.querySelector(".cw-bc-bau-header");M.onclick=()=>{i=!i,b.classList.toggle("expanded",i),k.playClick()};let g=b.querySelector("#cw-bau-toggle-btn"),T=b.querySelector("#cw-bau-full");if(g&&T&&(g.onclick=O=>{O.stopPropagation();let G=T.style.display==="none"||!T.style.display;T.style.display=G?"block":"none",g.textContent=G?"Ocultar":"Detalhes"}),r){let O=b.querySelector(".cw-bau-edit");O&&(O.onclick=G=>{G.stopPropagation(),I(F)})}}function ae(F,l,b){let p=F.sort((y,M)=>{let g=l.includes(y.id),T=l.includes(M.id);return g===T?0:g?1:-1}),S=a.trim().length>0;if(p.length===0&&!b){let y=document.createElement("div");y.className="cw-bc-empty",y.innerHTML=S?'<div style="font-weight:500;">Nada encontrado.</div>':`
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                <div style="font-weight:500;">Tudo lido!</div>
               `,j.appendChild(y);return}let m=p.filter(y=>!l.includes(y.id)),A=p.filter(y=>l.includes(y.id));if(m.forEach(y=>j.appendChild(K(y,!1))),A.length>0){let y=document.createElement("div");y.className="cw-bc-history-divider",y.innerHTML=`<span>Hist\xF3rico (${A.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let M=document.createElement("div");M.className="cw-bc-history-container",A.forEach(T=>M.appendChild(K(T,!0)));let g=!1;y.onclick=()=>{k.playClick(),g=!g,M.style.display=g?"flex":"none",y.querySelector("svg").style.transform=g?"rotate(180deg)":"rotate(0deg)"},j.appendChild(y),j.appendChild(M)}}function Z(){j.innerHTML="";let F=d.querySelector("#cw-bau-widget");F&&F.remove();let l=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),b=[...Ge].sort((y,M)=>{let g=new Date(y.date).getTime()||0;return(new Date(M.date).getTime()||0)-g}),p=b.findIndex(y=>y.title&&y.title.toLowerCase().includes("disponibilidade bau")),S=!1;if(p!==-1){let y=b[p];b.splice(p,1),te(y),S=!0}let m=a.trim().toLowerCase(),A=b.filter(y=>ee(y,m));ae(A,l,S)}function K(F,l){let b=document.createElement("div");b.className="cw-bc-card"+(l?" history":"");let p=Wt[F.type]||Wt.info,S=document.createElement("div");S.className="cw-bc-card-head";let m=document.createElement("div");m.className="cw-bc-type-tag "+(Wt[F.type]?F.type:"info"),m.innerHTML=`${p.icon} <span>${F.type}</span>`;let A=document.createElement("span");if(A.className="cw-bc-date-tag",A.textContent=Xt(F.date),S.appendChild(m),l)S.appendChild(A);else{let O=document.createElement("button");O.className="cw-btn-interactive cw-bc-dismiss-btn",O.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',O.onclick=G=>{G.stopPropagation(),k.playClick(),b.style.transform="translateX(20px)",b.style.opacity="0",setTimeout(()=>{let R=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");R.push(F.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(R)),Z(),D()},300)},S.appendChild(O)}let y=document.createElement("div");y.className="cw-bc-card-content";let M=document.createElement("div");M.className="cw-bc-msg-title",M.textContent=F.title;let g=document.createElement("div");g.className="cw-bc-msg-body",g.innerHTML=Kt(F.text);let T=document.createElement("div");if(T.className="cw-bc-msg-meta",T.innerHTML=`Publicado por <b>${F.author||"Sistema"}</b>`,l||(T.innerHTML+=` \u2022 ${Xt(F.date)}`),y.appendChild(M),y.appendChild(g),y.appendChild(T),b.appendChild(S),b.appendChild(y),r){let O=document.createElement("div");O.className="cw-card-actions";let G=document.createElement("button");G.className="cw-action-btn edit",G.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',G.onclick=()=>I(F);let R=document.createElement("button");R.className="cw-action-btn delete",R.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',R.onclick=()=>H(F.id),O.appendChild(G),O.appendChild(R),b.appendChild(O)}return b}let U=me.getCachedBroadcasts();U.length>0&&(Yt(U),Z()),setTimeout(x,500),L(),o||(o=setInterval(L,an));let oe=document.createElement("div");Object.assign(oe.style,ze),oe.className="no-drag",d.appendChild(oe),Re(d,oe),document.body.appendChild(d);let X=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),J=Ge.some(F=>!X.includes(F.id));return{toggle:f,hasUnread:J}}function na(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let e=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],t=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,o.overlay),n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","cw-onboarding-title");let a=document.createElement("div");Object.assign(a.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let r=document.createElement("div");r.id="cw-onboarding-title",Object.assign(r.style,o.title);let s=document.createElement("div");Object.assign(s.style,o.text);let c=document.createElement("div");Object.assign(c.style,o.dotsContainer);let u=document.createElement("div");Object.assign(u.style,o.btnContainer);let d=document.createElement("button");d.textContent="Pular",Object.assign(d.style,o.btn,o.btnSkip),d.onmouseover=()=>d.style.color="#202124",d.onmouseout=()=>d.style.color="#5f6368";let h=document.createElement("button");h.textContent="Pr\xF3ximo",Object.assign(h.style,o.btn,o.btnNext),h.onmouseover=()=>h.style.transform="scale(1.05)",h.onmouseout=()=>h.style.transform="scale(1)",u.appendChild(d),u.appendChild(h),a.appendChild(i),a.appendChild(r),a.appendChild(s),a.appendChild(c),a.appendChild(u),n.appendChild(a),document.body.appendChild(n),ge();function f(v){let x=e[v];i.textContent=x.icon,r.textContent=x.title,s.textContent=x.text,c.innerHTML="",e.forEach((z,B)=>{let C=document.createElement("div");Object.assign(C.style,o.dot),B===v&&Object.assign(C.style,o.dotActive),c.appendChild(C)}),x.isLast?(d.style.display="none",h.textContent="Come\xE7ar \u{1F680}",h.style.width="100%"):(d.style.display="block",h.textContent="Pr\xF3ximo",h.style.width="auto")}function E(){localStorage.setItem("cw_onboarding_seen_v1","true"),n.style.opacity="0",a.style.transform="translateY(20px)",setTimeout(()=>n.remove(),400),k.playSuccess(),Y("Tudo pronto! Use o menu flutuante."),document.removeEventListener("keydown",w),be()}h.onclick=()=>{k.playClick(),t<e.length-1?(t++,f(t)):E()},d.onclick=async()=>{await ve("Pular o tutorial?")&&E()};function w(v){v.key==="Enter"?(v.preventDefault(),h.click()):v.key==="Escape"&&(v.preventDefault(),d.click())}document.addEventListener("keydown",w),f(0),requestAnimationFrame(()=>{n.style.opacity="1",a.style.transform="translateY(0)"}),setTimeout(()=>h.focus(),450)}var ia={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function ra(e){let t=localStorage.getItem("cw_last_version");if(!t){localStorage.setItem("cw_last_version",e);return}t!==e&&sn(e)}function sn(e){let t=ia.slides,o=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,n.overlay),a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-labelledby","cw-changelog-title");let i=document.createElement("div");Object.assign(i.style,n.card);let r=document.createElement("div");Object.assign(r.style,n.badge),r.textContent=`Atualiza\xE7\xE3o ${e}`;let s=document.createElement("div");Object.assign(s.style,n.icon);let c=document.createElement("div");c.id="cw-changelog-title",Object.assign(c.style,n.title);let u=document.createElement("div");Object.assign(u.style,n.text);let d=document.createElement("div");Object.assign(d.style,n.dotsContainer);let h=document.createElement("button");Object.assign(h.style,n.btn),h.onmouseover=()=>h.style.transform="scale(1.02)",h.onmouseout=()=>h.style.transform="scale(1)",i.appendChild(r),i.appendChild(s),i.appendChild(c),i.appendChild(u),i.appendChild(d),i.appendChild(h),a.appendChild(i),document.body.appendChild(a),ge();function f(v){let x=t[v];s.textContent=x.icon,c.textContent=x.title,u.textContent=x.text,d.innerHTML="",t.forEach((z,B)=>{let C=document.createElement("div");Object.assign(C.style,n.dot),B===v&&Object.assign(C.style,n.dotActive),d.appendChild(C)}),v===t.length-1?h.textContent="Entendi, vamos l\xE1! \u{1F44D}":h.textContent="Pr\xF3ximo"}function E(){localStorage.setItem("cw_last_version",e),a.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>a.remove(),400),k.playSuccess(),Y(`TechSol atualizado para ${e}!`),document.removeEventListener("keydown",w),be()}h.onclick=()=>{k.playClick(),o<t.length-1?(o++,f(o)):E()};function w(v){v.key==="Enter"?(v.preventDefault(),h.click()):v.key==="Escape"&&(v.preventDefault(),E())}document.addEventListener("keydown",w),f(0),requestAnimationFrame(()=>{a.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>h.focus(),450)}var sa="cw_timezone_pinned",Jt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],cn=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function ln(){if(document.getElementById("cw-timezone-interactive-styles"))return;let e=document.createElement("style");e.id="cw-timezone-interactive-styles",e.textContent=`
        .tz-tab-btn:focus-visible,
        .tz-chip:focus-visible,
        .tz-hub-card:focus-visible,
        .tz-pin-btn:focus-visible {
            outline: 2px solid #1A73E8;
            outline-offset: 2px;
        }
        .tz-chip:hover { border-color: #1A73E8; }
        .tz-hub-card {
            transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease;
        }
        .tz-hub-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(60,64,67,0.1);
        }
        .tz-pin-btn { transition: background-color 0.2s ease; }
        .tz-pin-btn:hover { background-color: #F1F3F4; }
        @media (prefers-reduced-motion: reduce) {
            .tz-hub-card { transition: box-shadow 0.2s ease !important; }
            .tz-hub-card:hover { transform: none !important; }
        }
    `,document.head.appendChild(e)}function ca(){ln();let e="v2.2 Pro",t=!1,o=null,n="mx",a=JSON.parse(localStorage.getItem(sa)||"[]"),i="",r="all",s=new Date;s.setHours(14,0,0,0);let c={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},u={container:{display:"flex",flexDirection:"column",height:"100%",background:c.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:c.surface,borderBottom:`1px solid ${c.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:c.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:c.primary,borderBottomColor:c.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:c.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:c.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${c.border}`,background:c.surface,color:c.textSub,transition:"all 0.2s"},chipActive:{background:c.primaryBg,color:c.primary,borderColor:c.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:c.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${c.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:c.surface,border:`1px solid ${c.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:c.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},d=document.createElement("div");d.id="timezone-popup",d.classList.add("cw-module-window"),Object.assign(d.style,Ce,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let f=we(d,"Time Zone Traveler",e,"Monitoramento global e planejamento de chamadas.",{popup:d},()=>ae());d.appendChild(f);let E=document.createElement("div");Object.assign(E.style,u.container),d.appendChild(E);let w=document.createElement("div");Object.assign(w.style,u.tabHeader);let v=document.createElement("div");v.textContent="Monitoramento",v.className="tz-tab-btn",v.tabIndex=0,v.setAttribute("role","tab"),Object.assign(v.style,u.tabBtn,u.tabActive);let x=document.createElement("div");x.textContent="Planejador",x.className="tz-tab-btn",x.tabIndex=0,x.setAttribute("role","tab"),Object.assign(x.style,u.tabBtn),[v,x].forEach(Z=>{Z.addEventListener("keydown",K=>{(K.key==="Enter"||K.key===" ")&&(K.preventDefault(),Z.click())})}),w.appendChild(v),w.appendChild(x),E.appendChild(w);let z=document.createElement("div");Object.assign(z.style,u.toolbar);let B=document.createElement("div");Object.assign(B.style,u.searchInputWrapper);let C=document.createElement("div");C.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(C.style,u.searchIcon);let N=document.createElement("input");N.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(N.style,u.searchInput),N.onfocus=()=>{N.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",N.style.borderColor="rgba(26,115,232,0.3)"},N.onblur=()=>{N.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",N.style.borderColor="transparent"},N.oninput=Z=>{i=Z.target.value.toLowerCase(),L()},B.appendChild(C),B.appendChild(N),z.appendChild(B);let $=document.createElement("div");Object.assign($.style,u.chipsRow),cn.forEach(Z=>{let K=document.createElement("div");K.textContent=Z.label,K.id=`tz-filter-${Z.id}`,K.className="tz-chip",K.tabIndex=0,K.setAttribute("role","button"),Object.assign(K.style,u.chip),Z.id===r&&Object.assign(K.style,u.chipActive),K.onclick=()=>{k.playClick(),r=Z.id,Array.from($.children).forEach(U=>{Object.assign(U.style,u.chip)}),Object.assign(K.style,u.chipActive),L()},K.addEventListener("keydown",U=>{(U.key==="Enter"||U.key===" ")&&(U.preventDefault(),K.click())}),$.appendChild(K)}),z.appendChild($),E.appendChild(z);let W=document.createElement("div");Object.assign(W.style,u.listContainer);let I=document.createElement("style");I.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",E.appendChild(I);let q=document.createElement("div");Object.assign(q.style,u.plannerWrapper,{display:"none"}),E.appendChild(W),E.appendChild(q),v.onclick=()=>_("live"),x.onclick=()=>_("plan");function _(Z){k.playClick(),Z==="live"?(Object.assign(v.style,u.tabActive),Object.assign(x.style,u.tabBtn),x.style.borderBottomColor="transparent",v.setAttribute("aria-selected","true"),x.setAttribute("aria-selected","false"),W.style.display="flex",z.style.display="flex",q.style.display="none",ee()):(Object.assign(x.style,u.tabActive),Object.assign(v.style,u.tabBtn),v.style.borderBottomColor="transparent",q.style.display="flex",W.style.display="none",z.style.display="none",te(),D())}function H(Z){return Z>=9&&Z<17?{color:c.success,bg:c.successBg,label:"Aberto",icon:"\u{1F7E2}"}:Z>=8&&Z<9?{color:c.warning,bg:c.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:Z>=17&&Z<19?{color:c.warning,bg:c.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:c.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function j(Z){a.includes(Z)?a=a.filter(K=>K!==Z):a.push(Z),localStorage.setItem(sa,JSON.stringify(a)),L(),k.playClick()}function L(){W.innerHTML="";let Z=new Date,K=Jt.filter(oe=>{let X=oe.name.toLowerCase().includes(i)||oe.label.toLowerCase().includes(i),J=r==="all"||oe.region===r;return X&&J});if(K.sort((oe,X)=>{let J=a.includes(oe.id),F=a.includes(X.id);return J&&!F?-1:!J&&F?1:oe.name.localeCompare(X.name)}),K.length===0){W.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}K.forEach(oe=>{let X=a.includes(oe.id),J=Z.toLocaleTimeString("pt-BR",{timeZone:oe.zone,hour:"2-digit",minute:"2-digit"}),F=parseInt(J.split(":")[0]),l=H(F),b=F<6||F>18,p=document.createElement("div");p.className="tz-hub-card",p.tabIndex=0,p.setAttribute("role","button"),p.setAttribute("aria-label",`${oe.name}, ${J}`),Object.assign(p.style,u.hubCard),X&&Object.assign(p.style,u.hubCardPinned);let S=X?"\u2605":"\u2606",m=X?"#F9AB00":"#DADCE0";p.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn tz-pin-btn" tabindex="0" role="button" aria-label="${X?"Desafixar":"Fixar"} ${oe.name}" style="cursor:pointer; font-size:22px; color:${m}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%;">${S}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${oe.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${c.text}; letter-spacing:-0.2px;">${oe.name}</div>
                        <div style="font-size:12px; color:${c.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${b?"\u{1F319}":"\u2600\uFE0F"} ${oe.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${c.text}; font-family:'Google Sans', sans-serif;">${J}</div>
                    <div style="font-size:11px; font-weight:600; color:${l.color}; background:${l.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${l.label}
                    </div>
                </div>
            `;let A=p.querySelector(".cw-pin-btn");A.onclick=y=>{y.stopPropagation(),j(oe.id)},A.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),y.stopPropagation(),j(oe.id))}),p.onclick=()=>{n=oe.id,_("plan")},p.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&y.target===p&&(y.preventDefault(),p.click())}),W.appendChild(p)});let U=document.createElement("div");U.style.height="20px",U.style.width="100%",W.appendChild(U)}function D(){q.innerHTML="";let Z=document.createElement("div"),K=document.createElement("label");K.textContent="Onde est\xE1 o cliente?",K.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let U=document.createElement("select");Object.assign(U.style,yo),U.style.padding="14px",[...Jt].sort((R,ne)=>R.name.localeCompare(ne.name)).forEach(R=>{let ne=document.createElement("option");ne.value=R.id,ne.textContent=`${R.flag} ${R.name} (${R.zone})`,R.id===n&&(ne.selected=!0),U.appendChild(ne)}),U.onchange=R=>{n=R.target.value,G(),k.playClick()},Z.appendChild(K),Z.appendChild(U),q.appendChild(Z);let X=document.createElement("div");Object.assign(X.style,u.timeComparisonRow);let J=document.createElement("div");Object.assign(J.style,u.timeCard),J.style.backgroundColor="#F8FAFF",J.style.borderColor="#E8F0FE",J.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let F=document.createElement("div");Object.assign(F.style,u.timeCard),F.style.backgroundColor="#FFF8E1",F.style.borderColor="#FEF7E0",F.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,X.appendChild(J),X.appendChild(F),q.appendChild(X);let l=document.createElement("div");l.id="cw-planner-status",Object.assign(l.style,u.statusBadge),q.appendChild(l);let b=document.createElement("div");Object.assign(b.style,{padding:"0 4px",marginTop:"12px"});let p=document.createElement("div");p.textContent="Arraste para simular o hor\xE1rio:",p.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let S=document.createElement("div");Object.assign(S.style,u.timelineContainer);let m=document.createElement("div");Object.assign(m.style,u.timelineTrack);let A=document.createElement("div");Object.assign(A.style,u.dayZone),m.appendChild(A);let y=document.createElement("input");y.type="range",y.min="0",y.max="1439",y.step="15",y.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let M=document.createElement("div");M.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",M.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",S.appendChild(m),S.appendChild(y),S.appendChild(M),b.appendChild(p),b.appendChild(S),q.appendChild(b);let g=J.querySelector("#cw-time-input-br"),T=F.querySelector("#cw-time-display-client"),O=F.querySelector("#cw-client-label");function G(){let R=Jt.find(dt=>dt.id===n);O.textContent=`${R.flag} ${R.label} (${R.zone})`;let ne=s.getHours(),Q=s.getMinutes(),de=`${String(ne).padStart(2,"0")}:${String(Q).padStart(2,"0")}`;g.value=de,y.value=ne*60+Q;let ue=s.toLocaleTimeString("pt-BR",{timeZone:R.zone,hour:"2-digit",minute:"2-digit"});T.textContent=ue;let he=parseInt(ue.split(":")[0]);he>=9&&he<17?(l.style.background=c.successBg,l.style.color=c.success,l.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):he>=8&&he<9||he>=17&&he<19?(l.style.background=c.warningBg,l.style.color=c.warning,l.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(l.style.background=c.errorBg,l.style.color=c.error,l.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}y.oninput=R=>{let ne=parseInt(R.target.value);s.setHours(Math.floor(ne/60)),s.setMinutes(ne%60),G()},g.oninput=R=>{let[ne,Q]=R.target.value.split(":");ne&&Q&&(s.setHours(parseInt(ne)),s.setMinutes(parseInt(Q)),G())},G()}function ee(){L(),o||(o=setInterval(L,6e4))}function te(){o&&(clearInterval(o),o=null)}function ae(){t=!t,Se(t,d,"cw-btn-timezone"),t?(ge(),_("live")):(be(),te())}return document.body.appendChild(d),ae}var ke={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',clear:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',copy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',more:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="12" cy="19" r="1.8"></circle></svg>',edit:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',bold:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',empty:'<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>'},la=[{id:"general",label:"Geral",icon:ke.tabs.general},{id:"note",label:"Notas",icon:ke.tabs.note},{id:"email",label:"Emails",icon:ke.tabs.email}],Zt="cw_lib_recent_v1",da=4;function dn(e){try{let t=JSON.parse(localStorage.getItem(Zt)||"[]");t=t.filter(o=>o!==e),t.unshift(e),t=t.slice(0,da*3),localStorage.setItem(Zt,JSON.stringify(t))}catch(t){console.warn("Erro ao salvar uso recente",t)}}function pn(e){try{let t=JSON.parse(localStorage.getItem(Zt)||"[]");if(t.length===0)return[];let o=new Map(Ee.getSnippets(e).map(n=>[n.id,n]));return t.map(n=>o.get(n)).filter(Boolean).slice(0,da)}catch{return[]}}function un(){if(document.getElementById("cw-lib-styles-v2"))return;let e=document.createElement("style");e.id="cw-lib-styles-v2",e.textContent=`
        #library-popup {
            width: 620px !important;
            max-width: 95vw !important;
            height: 680px !important;
            max-height: 90vh !important;
        }

        .cw-lib-container {
            display: flex; flex-direction: column; height: 100%;
            background: linear-gradient(180deg, #FAFBFC 0%, #F1F3F9 100%);
            font-family: 'Google Sans', Roboto, sans-serif;
            position: relative; overflow: hidden;
        }

        /* --- TOOLBAR: BUSCA + ABAS SEGMENTADAS --- */
        .cw-lib-toolbar { padding: 16px 20px 12px 20px; display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; }

        .cw-lib-search-wrap { position: relative; }
        .cw-lib-search-icon {
            position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
            color: #80868b; pointer-events: none; display: flex;
        }
        .cw-lib-search {
            width: 100%; box-sizing: border-box; height: 40px;
            padding: 0 38px 0 40px; border-radius: 12px; border: 1px solid transparent;
            background: rgba(255,255,255,0.75); backdrop-filter: blur(8px);
            font-size: 13.5px; font-family: inherit; color: #202124; outline: none;
            box-shadow: 0 1px 2px rgba(0,0,0,0.04);
            transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .cw-lib-search::placeholder { color: #9aa0a6; }
        .cw-lib-search:focus { background: #fff; border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.14); }
        .cw-lib-search-clear {
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
            width: 22px; height: 22px; border-radius: 50%; display: none;
            align-items: center; justify-content: center; color: #80868b; cursor: pointer;
            transition: background 0.15s ease;
        }
        .cw-lib-search-clear:hover { background: rgba(0,0,0,0.06); }
        .cw-lib-search-clear.visible { display: flex; }

        .cw-lib-tabs {
            display: flex; gap: 4px; padding: 4px;
            background: rgba(0,0,0,0.045); border-radius: 100px;
        }
        .cw-lib-tab {
            flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
            padding: 8px 10px; border-radius: 100px; cursor: pointer; user-select: none;
            font-size: 12.5px; font-weight: 500; color: #5f6368;
            transition: background-color 0.25s var(--cw-ease-standard), color 0.25s var(--cw-ease-standard), box-shadow 0.25s var(--cw-ease-standard);
        }
        .cw-lib-tab svg { flex-shrink: 0; }
        .cw-lib-tab:hover { color: #202124; }
        .cw-lib-tab.active { background: #fff; color: #1a73e8; font-weight: 600; box-shadow: 0 1px 4px rgba(0,0,0,0.12); }

        /* --- GRID DE CARDS --- */
        .cw-lib-grid {
            flex: 1; overflow-y: auto; padding: 4px 20px 96px 20px;
            display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 14px;
            align-content: start;
        }

        .cw-lib-card {
            background: rgba(255,255,255,0.68); backdrop-filter: blur(14px);
            border: 1px solid rgba(255,255,255,0.5);
            border-radius: 18px; padding: 16px 16px 12px 16px;
            position: relative; isolation: isolate;
            box-shadow: 0 1px 3px rgba(60,64,67,0.08);
            transition: box-shadow 0.35s var(--cw-ease-elastic), border-color 0.35s ease;
            display: flex; flex-direction: column;
        }
        /* isolation:isolate d\xE1 a cada card seu pr\xF3prio contexto de empilhamento,
           ent\xE3o um z-index alto s\xF3 no .cw-lib-menu n\xE3o basta pra ele ficar
           acima do card da linha seguinte (que vem depois no DOM e por isso
           pinta por cima por padr\xE3o) \u2014 precisa levantar o card inteiro. */
        .cw-lib-card.menu-open { z-index: 5; }
        .cw-lib-card::before {
            content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
            background: linear-gradient(135deg, rgba(138,180,248,0.16), rgba(197,138,249,0.16), rgba(242,139,130,0.16));
            background-size: 300% 300%; opacity: 0; transition: opacity 0.4s ease;
        }
        /* Sem transform no pr\xF3prio card - hit-box parado evita flicker de
           hover perto da borda. Eleva\xE7\xE3o s\xF3 por sombra/borda. */
        .cw-lib-card:hover { box-shadow: 0 10px 24px rgba(60,64,67,0.14); border-color: rgba(255,255,255,0.9); }
        .cw-lib-card:hover::before { opacity: 1; animation: cwLibAura 8s ease infinite; }
        .cw-lib-card.is-code { border-left: 3px solid #1a73e8; }
        @keyframes cwLibAura { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        .cw-lib-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
        .cw-lib-card-title { font-size: 14px; font-weight: 600; color: #202124; letter-spacing: -0.01em; line-height: 1.35; }
        .cw-lib-card-badges { display: flex; gap: 4px; flex-shrink: 0; }
        .cw-lib-badge { font-size: 9.5px; font-weight: 700; letter-spacing: 0.3px; padding: 2px 6px; border-radius: 5px; white-space: nowrap; }
        .cw-lib-badge.code { background: rgba(26,115,232,0.1); color: #1a73e8; font-family: 'Roboto Mono', monospace; }
        .cw-lib-badge.template { background: rgba(0,0,0,0.05); color: #5f6368; }

        .cw-lib-media-tag {
            display: inline-flex; align-items: center; gap: 4px;
            background: rgba(26,115,232,0.1); color: #1a73e8;
            padding: 2px 8px; border-radius: 8px; font-size: 10.5px; font-weight: 600;
            margin-bottom: 6px; width: fit-content;
        }

        .cw-lib-card-preview {
            font-size: 12.5px; color: #5f6368; line-height: 1.55; flex: 1;
            display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;
            word-break: break-word;
        }
        .cw-lib-card-preview.code { font-family: 'Roboto Mono', monospace; font-size: 11.5px; background: rgba(0,0,0,0.03); padding: 8px 10px; border-radius: 8px; }

        .cw-lib-card-foot { display: flex; align-items: center; justify-content: flex-end; gap: 2px; margin-top: 10px; }
        .cw-lib-icon-btn {
            width: 30px; height: 30px; border-radius: 50%; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; cursor: pointer; color: #5f6368;
            transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
            position: relative;
        }
        .cw-lib-icon-btn:hover { background: rgba(26,115,232,0.1); color: #1a73e8; }
        .cw-lib-icon-btn:active { transform: scale(0.92); }
        .cw-lib-icon-btn.danger:hover { background: rgba(217,48,37,0.1); color: #d93025; }

        /* --- MENU DE OVERFLOW (Editar / Excluir) --- */
        .cw-lib-menu {
            position: absolute; top: calc(100% + 4px); right: 0; z-index: 30;
            background: rgba(255,255,255,0.96); backdrop-filter: blur(16px);
            border: 1px solid rgba(0,0,0,0.06); border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.16); padding: 6px; min-width: 140px;
            opacity: 0; transform: translateY(-4px) scale(0.96); pointer-events: none;
            transition: opacity 0.15s ease, transform 0.15s ease; transform-origin: top right;
        }
        .cw-lib-menu.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .cw-lib-menu-item {
            display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px;
            font-size: 13px; font-weight: 500; color: #3c4043; cursor: pointer; transition: background 0.12s ease;
        }
        .cw-lib-menu-item:hover { background: rgba(0,0,0,0.05); }
        .cw-lib-menu-item.danger { color: #d93025; }
        .cw-lib-menu-item.danger:hover { background: rgba(217,48,37,0.08); }

        /* --- ESTADO VAZIO --- */
        .cw-lib-empty {
            grid-column: 1 / -1; padding: 56px 24px; text-align: center;
            display: flex; flex-direction: column; align-items: center; gap: 12px; color: #80868b;
        }
        .cw-lib-empty-title { font-weight: 600; font-size: 15px; color: #3c4043; }
        .cw-lib-empty-sub { font-size: 13px; max-width: 260px; line-height: 1.5; }

        /* --- USADOS RECENTEMENTE --- */
        .cw-lib-recent-section { grid-column: 1 / -1; margin-bottom: 4px; }
        .cw-lib-recent-title {
            font-size: 11px; font-weight: 700; color: #80868b; text-transform: uppercase;
            letter-spacing: 0.6px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
        }
        .cw-lib-recent-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .cw-lib-recent-chip {
            display: flex; align-items: center; gap: 6px; padding: 7px 14px;
            background: rgba(26,115,232,0.08); border: 1px solid rgba(26,115,232,0.18);
            border-radius: 100px; font-size: 12.5px; font-weight: 600; color: #1a73e8;
            cursor: pointer; max-width: 220px; transition: background-color 0.15s ease, transform 0.15s ease;
        }
        .cw-lib-recent-chip span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cw-lib-recent-chip:hover { background: rgba(26,115,232,0.14); }
        .cw-lib-recent-chip:focus-visible { outline: 2px solid #1a73e8; outline-offset: 2px; }

        /* --- FAB --- */
        .cw-lib-fab {
            position: absolute; bottom: 24px; right: 24px; z-index: 15;
            width: 56px; height: 56px; border-radius: 18px;
            background: linear-gradient(135deg, #1a73e8, #0059c1); color: #fff;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 6px 20px rgba(26,115,232,0.42); cursor: pointer;
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
        }
        .cw-lib-fab:hover { transform: scale(1.08) rotate(90deg); box-shadow: 0 10px 28px rgba(26,115,232,0.5); }
        .cw-lib-fab:active { transform: scale(0.94) rotate(90deg); }

        /* --- SHEET DO EDITOR (Apple glass, transl\xFAcido de verdade) --- */
        .cw-lib-sheet {
            position: absolute; inset: 0; z-index: 25;
            background: rgba(250,251,252,0.6); backdrop-filter: blur(36px) saturate(180%); -webkit-backdrop-filter: blur(36px) saturate(180%);
            transform: translateY(100%); transition: transform 0.5s var(--cw-ease-decelerate);
            display: flex; flex-direction: column;
        }
        .cw-lib-sheet.open { transform: translateY(0); }
        .cw-lib-sheet-handle { display: flex; justify-content: center; padding: 10px 0 4px 0; flex-shrink: 0; }
        .cw-lib-sheet-handle::after { content: ''; width: 36px; height: 4px; border-radius: 3px; background: rgba(0,0,0,0.15); }
        .cw-lib-sheet-head {
            padding: 8px 20px 16px 20px; display: flex; align-items: center; gap: 12px; flex-shrink: 0;
            border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .cw-lib-sheet-back {
            width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
            color: #5f6368; cursor: pointer; transition: background 0.15s ease; flex-shrink: 0;
        }
        .cw-lib-sheet-back:hover { background: rgba(0,0,0,0.06); }
        .cw-lib-sheet-title { font-weight: 700; font-size: 16px; color: #202124; flex: 1; }
        .cw-lib-sheet-body { flex: 1; overflow-y: auto; padding: 20px; }
        .cw-lib-sheet-foot { padding: 16px 20px; border-top: 1px solid rgba(0,0,0,0.06); display: flex; justify-content: flex-end; }

        .cw-lib-field { margin-bottom: 20px; }
        .cw-lib-label { display: block; font-size: 12px; font-weight: 700; color: #5f6368; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.4px; }
        .cw-lib-input {
            width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 12px;
            border: 1px solid rgba(0,0,0,0.1); font-size: 14px; font-family: inherit; outline: none;
            background: #fff; transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cw-lib-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.14); }

        .cw-lib-toolbar-mini { display: flex; gap: 4px; margin-bottom: 12px; background: rgba(255,255,255,0.6); padding: 6px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.06); width: fit-content; }
        .cw-lib-tb-btn {
            width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; cursor: pointer; color: #474747;
            transition: background-color 0.15s ease, color 0.15s ease;
        }
        .cw-lib-tb-btn:hover { background: rgba(0,0,0,0.05); color: #1a73e8; }
        .cw-lib-tb-btn.active { background: rgba(26,115,232,0.12); color: #1a73e8; }

        .cw-lib-editable {
            min-height: 180px; max-height: 340px; overflow-y: auto; white-space: pre-wrap;
            line-height: 1.65; outline: none;
        }

        .cw-lib-save-btn {
            padding: 11px 28px; border-radius: 100px; border: none; cursor: pointer;
            background: linear-gradient(135deg, #1a73e8, #0059c1); color: #fff; font-weight: 600; font-size: 14px;
            box-shadow: 0 4px 14px rgba(26,115,232,0.35); transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
        }
        .cw-lib-save-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(26,115,232,0.44); }
        .cw-lib-save-btn:active { transform: scale(0.97); }
        .cw-lib-save-btn:disabled { opacity: 0.6; cursor: default; transform: none; }

        .cw-lib-loading {
            position: absolute; inset: 0; z-index: 40; background: rgba(255,255,255,0.7); backdrop-filter: blur(6px);
            display: none; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
        }
        .cw-lib-loading.active { display: flex; }
        .cw-lib-spinner { width: 34px; height: 34px; border: 3px solid rgba(26,115,232,0.15); border-top-color: #1a73e8; border-radius: 50%; animation: cwLibSpin 0.8s linear infinite; }
        @keyframes cwLibSpin { to { transform: rotate(360deg); } }
        .cw-lib-loading-text { font-size: 13px; font-weight: 600; color: #1a73e8; }

        .cw-tactile { transition: transform 0.15s ease; }
        .cw-tactile:active { transform: scale(0.94); }

        /* O spinner de carregamento fica de fora de prop\xF3sito - \xE9
           informativo (comunica "ainda trabalhando"), n\xE3o decorativo.
           O resto (aura infinita no hover, cards, FAB, painel deslizando)
           \xE9 puro movimento e n\xE3o tinha nenhuma prote\xE7\xE3o. */
        @media (prefers-reduced-motion: reduce) {
            .cw-lib-card::before { animation: none !important; }
            .cw-lib-card, .cw-lib-recent-chip, .cw-lib-fab, .cw-lib-save-btn,
            .cw-lib-menu, .cw-lib-sheet {
                transition: opacity 0.15s ease, background-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function pa(){let e="v2.0",t=!1,o="general",n="",a=null,i=null;un();let r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,Ce,{right:"auto",left:"50%",width:"620px",height:"680px",maxHeight:"90vh",transform:"translateX(-50%) scale(0.05)"});let c=we(r,"Minha Biblioteca",e,"Gerencie seus snippets, textos e templates.",{popup:r},()=>l());r.appendChild(c);let u=document.createElement("div");u.className="cw-lib-container",r.appendChild(u);let d=document.createElement("div");d.className="cw-lib-toolbar";let h=document.createElement("div");h.className="cw-lib-search-wrap";let f=document.createElement("div");f.className="cw-lib-search-icon",f.innerHTML=ke.search;let E=document.createElement("input");E.className="cw-lib-search no-drag",E.placeholder="Buscar por t\xEDtulo ou conte\xFAdo...",E.type="text";let w=document.createElement("div");w.className="cw-lib-search-clear cw-tactile",w.innerHTML=ke.clear,h.append(f,E,w);let v=document.createElement("div");v.className="cw-lib-tabs",la.forEach(b=>{let p=document.createElement("div");p.className="cw-lib-tab"+(b.id===o?" active":""),p.id=`lib-tab-${b.id}`,p.innerHTML=`${b.icon}<span>${b.label}</span>`,p.onmouseenter=()=>k.playHover(),p.onclick=()=>L(b.id),v.appendChild(p)}),d.append(h,v),u.appendChild(d);let x=document.createElement("div");x.className="cw-lib-grid",u.appendChild(x);let z=document.createElement("div");z.className="cw-lib-fab cw-tactile",z.title="Novo item",z.innerHTML=ke.add,z.onclick=()=>U(),u.appendChild(z);let B=document.createElement("div");B.className="cw-lib-sheet";let C=document.createElement("div");C.className="cw-lib-sheet-handle";let N=document.createElement("div");N.className="cw-lib-sheet-head";let $=document.createElement("div");$.className="cw-lib-sheet-back no-drag",$.innerHTML=ke.back,$.title="Cancelar",$.onclick=oe;let W=document.createElement("span");W.className="cw-lib-sheet-title",W.textContent="Novo Item",N.append($,W);let I=document.createElement("div");I.className="cw-lib-sheet-body";let q=document.createElement("div");q.className="cw-lib-sheet-foot";let _=document.createElement("button");_.className="cw-lib-save-btn no-drag",_.textContent="Salvar",_.onclick=X,q.appendChild(_);let H=document.createElement("div");H.className="cw-lib-loading",H.innerHTML='<div class="cw-lib-spinner"></div><div class="cw-lib-loading-text">Salvando...</div>',B.append(C,N,I,q,H),u.appendChild(B);let j=document.createElement("div");Object.assign(j.style,ze),j.className="no-drag",r.appendChild(j),Re(r,j),document.body.appendChild(r),document.addEventListener("mousedown",b=>{i&&!i.contains(b.target)&&D()});function L(b){k.playClick(),o=b,la.forEach(p=>{document.getElementById(`lib-tab-${p.id}`).classList.toggle("active",p.id===b)}),ae()}function D(){if(i){let b=i.querySelector(".cw-lib-menu");b&&b.classList.remove("open"),i.classList.remove("menu-open"),i=null}}function ee(b,p){return p?`${b.title} ${b.content}`.toLowerCase().includes(p):!0}function te(b){let p=document.createElement("div");p.className="cw-lib-recent-section",p.innerHTML='<div class="cw-lib-recent-title">\u{1F552} Usados recentemente</div>';let S=document.createElement("div");return S.className="cw-lib-recent-row",b.forEach(m=>{let A=document.createElement("div");A.className="cw-lib-recent-chip",A.tabIndex=0,A.setAttribute("role","button"),A.title=m.title,A.innerHTML=`<span>${F(m.title)}</span>`,A.onclick=()=>{k.playClick(),K(m)},A.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),A.click())}),S.appendChild(A)}),p.appendChild(S),p}function ae(){D(),x.innerHTML="";let b=n.trim().toLowerCase(),p=Ee.getSnippets(o).filter(S=>ee(S,b));if(!b){let S=pn(o);S.length>0&&x.appendChild(te(S))}if(p.length===0){let S=document.createElement("div");S.className="cw-lib-empty";let m=b.length>0;S.innerHTML=`
                <div style="opacity:0.5;">${ke.empty}</div>
                <div class="cw-lib-empty-title">${m?"Nada encontrado":"Nada aqui ainda"}</div>
                <div class="cw-lib-empty-sub">${m?`Nenhum item bate com "${n.trim()}" nesta aba.`:"Clique no + para come\xE7ar sua cole\xE7\xE3o."}</div>
            `,x.appendChild(S);return}p.forEach(S=>x.appendChild(Z(S)))}function Z(b){let p=document.createElement("div");p.className="cw-lib-card"+(b.isCode?" is-code":"");let S=b.content,m="";if(b.isRich){let g=document.createElement("div");g.innerHTML=b.content;let T=!!g.querySelector("img");S=g.innerText.substring(0,200),T&&(m=`<span class="cw-lib-media-tag">${ke.media} M\xEDdia</span>`)}let A=[b.isCode?'<span class="cw-lib-badge code">CODE</span>':"",o==="email"?'<span class="cw-lib-badge template">TEMPLATE</span>':""].join("");p.innerHTML=`
            <div class="cw-lib-card-head">
                <div class="cw-lib-card-title">${F(b.title)}</div>
                <div class="cw-lib-card-badges">${A}</div>
            </div>
            ${m}
            <div class="cw-lib-card-preview${b.isCode?" code":""}">${F(S)}</div>
            <div class="cw-lib-card-foot">
                <div class="cw-lib-icon-btn cw-act-copy cw-tactile" title="Copiar">${ke.copy}</div>
                <div class="cw-lib-icon-btn cw-act-more cw-tactile" title="Mais a\xE7\xF5es">${ke.more}</div>
                <div class="cw-lib-menu">
                    <div class="cw-lib-menu-item cw-act-edit">${ke.edit} Editar</div>
                    <div class="cw-lib-menu-item danger cw-act-del">${ke.delete} Excluir</div>
                </div>
            </div>
        `,p.querySelector(".cw-act-copy").onclick=g=>{g.stopPropagation(),k.playClick(),K(b)};let y=p.querySelector(".cw-act-more"),M=p.querySelector(".cw-lib-menu");return y.onclick=g=>{g.stopPropagation(),k.playClick();let T=M.classList.contains("open");D(),T||(M.classList.add("open"),p.classList.add("menu-open"),i=p)},p.querySelector(".cw-act-edit").onclick=g=>{g.stopPropagation(),k.playClick(),D(),U(b)},p.querySelector(".cw-act-del").onclick=async g=>{g.stopPropagation(),k.playClick(),D(),await ve(`Excluir "${b.title}"?`)&&(Ee.delete(b.id),ae(),Y("Item exclu\xEDdo."))},p}function K(b){if(b.isRich){let p=new Blob([b.content],{type:"text/html"}),S=document.createElement("div");S.innerHTML=b.content;let m=new Blob([S.innerText],{type:"text/plain"});navigator.clipboard.write([new ClipboardItem({"text/html":p,"text/plain":m})])}else navigator.clipboard.writeText(b.content);dn(b.id),Y("Copiado!")}function U(b=null){a=b?b.id:null,I.innerHTML="",I.appendChild(J("title","T\xEDtulo / Nome",b?b.title:"")),o==="email"&&I.appendChild(J("subject","Assunto do Email",b?b.subject:""));let p="Conte\xFAdo";o==="email"&&(p="Corpo do Email (HTML)"),o==="note"&&(p="Texto da Nota"),I.appendChild(J("content",p,b?b.content:"",{isRich:!0,isCode:b?b.isCode:!1})),W.textContent=b?"Editar Item":"Novo Item",_.textContent=b?"Salvar Altera\xE7\xF5es":"Salvar",B.classList.add("open"),setTimeout(()=>{let S=I.querySelector("input");S&&S.focus()},500)}function oe(){k.playSwoosh(),B.classList.remove("open"),setTimeout(()=>{a=null},500)}async function X(){H.classList.add("active"),_.disabled=!0;try{let b=I.querySelector("#cw-lib-inp-title"),p=I.querySelector("#cw-lib-inp-content"),S=b.value.trim(),m=p.contentEditable==="true"?p.innerHTML:p.value.trim(),A=p.getAttribute("data-is-code")==="true";if(!S||!m||m==="<br>"){k.playError(),Y("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let y={id:a,type:o,title:S,content:m,isCode:A,isRich:p.contentEditable==="true"};if(o==="email"){let g=I.querySelector("#cw-lib-inp-subject").value.trim();if(!g){k.playError(),Y("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}y.subject=g}let M=await Ee.save(y);if(M===!1){k.playError(),Y("N\xE3o foi poss\xEDvel salvar: usu\xE1rio n\xE3o identificado. Recarregue a p\xE1gina e tente de novo.",{error:!0});return}ae(),oe(),M.synced===!1?(k.playError(),Y("Salvo localmente \u2014 sem conex\xE3o com a nuvem no momento.",{error:!0})):(Y("Salvo e sincronizado!"),k.playSuccess())}catch(b){console.error("Erro ao salvar item da biblioteca:",b),k.playError(),Y("Erro ao salvar item.",{error:!0})}finally{H.classList.remove("active"),_.disabled=!1}}function J(b,p,S,m={}){let A=document.createElement("div");A.className="cw-lib-field";let y=document.createElement("label");y.className="cw-lib-label",y.textContent=p,A.appendChild(y);let M;if(m.isRich){let g=document.createElement("div");g.className="cw-lib-toolbar-mini",g.innerHTML=`
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-bold" title="Negrito">${ke.bold}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-italic" title="It\xE1lico">${ke.italic}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-code" title="Formato c\xF3digo">${ke.code}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-img" title="Inserir imagem">${ke.image}</button>
            `,M=document.createElement("div"),M.className="cw-lib-input cw-lib-editable",M.contentEditable="true",M.innerHTML=S||"",m.isCode&&(M.style.fontFamily="'Roboto Mono', monospace",M.style.background="#F8F9FA",M.setAttribute("data-is-code","true"),g.querySelector(".cw-tb-code").classList.add("active")),g.querySelectorAll(".cw-lib-tb-btn").forEach(T=>{T.onmouseenter=()=>k.playHover(),T.onmousedown=()=>k.playClick()}),g.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),M.focus()},g.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),M.focus()},g.querySelector(".cw-tb-code").onclick=T=>{let G=!(M.getAttribute("data-is-code")==="true");M.setAttribute("data-is-code",String(G)),M.style.fontFamily=G?"'Roboto Mono', monospace":"inherit",M.style.background=G?"#F8F9FA":"#fff",T.currentTarget.classList.toggle("active",G),M.focus()},g.querySelector(".cw-tb-img").onclick=async()=>{let T=await To("Cole a URL da imagem:");T&&(document.execCommand("insertImage",!1,T),M.querySelectorAll("img").forEach(O=>{O.style.maxWidth="100%",O.style.borderRadius="8px"}))},M.onpaste=T=>{let O=(T.clipboardData||T.originalEvent.clipboardData).items;for(let G of O)if(G.kind==="file"&&G.type.startsWith("image/")){T.preventDefault();let R=new FileReader;R.onload=ne=>{document.execCommand("insertHTML",!1,`<img src="${ne.target.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;">`)},R.readAsDataURL(G.getAsFile())}},A.appendChild(g)}else M=document.createElement("input"),M.className="cw-lib-input",M.type="text",M.value=S||"";return M.id=`cw-lib-inp-${b}`,A.appendChild(M),A}function F(b){let p=document.createElement("div");return p.textContent=b||"",p.innerHTML}E.addEventListener("input",b=>{n=b.target.value,w.classList.toggle("visible",n.length>0),ae()}),w.onclick=()=>{E.value="",n="",w.classList.remove("visible"),ae(),E.focus()};function l(){t=!t,Se(t,r,"cw-btn-library"),t?(ge(),ae()):(be(),D())}return l}function ua(){let e="v1.0",t=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},n="cw-configs-styles";if(!document.getElementById(n)){let w=document.createElement("style");w.id=n,w.innerHTML=`
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

            /* --- PROFILE CARD PREMIUM --- */
            .cw-profile-card {
                background: ${o.surface}; border-radius: 12px; padding: 20px;
                border: 1px solid ${o.border}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                display: flex; align-items: center; gap: 20px; margin-bottom: 8px;
            }
            .cw-profile-avatar {
                width: 80px; height: 80px; border-radius: 50%; object-fit: cover;
                border: 2px solid #e8f0fe; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .cw-profile-info { display: flex; flex-direction: column; gap: 4px; flex: 1; }
            .cw-profile-ldap {
                font-size: 18px; font-weight: 700; color: ${o.text}; margin: 0;
                font-family: 'Google Sans', sans-serif;
            }
            .cw-profile-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
            .cw-profile-badge {
                padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600;
                background: #f1f3f4; color: #5f6368; border: 1px solid #dadce0;
                text-transform: uppercase; letter-spacing: 0.3px;
            }
            .cw-profile-badge.overhead {
                background: #e8f0fe; color: #1a73e8; border-color: #d2e3fc;
            }

            /* --- SKELETON LOADING --- */
            .cw-skeleton {
                background: #eee;
                background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
                border-radius: 5px;
                background-size: 200% 100%;
                animation: 1.5s shine linear infinite;
            }
            .cw-skeleton-avatar { width: 80px; height: 80px; border-radius: 50%; }
            .cw-skeleton-text { height: 14px; width: 120px; margin-bottom: 8px; }
            .cw-skeleton-title { height: 22px; width: 100px; margin-bottom: 12px; }
            .cw-skeleton-badge { width: 60px; height: 22px; border-radius: 6px; }

            @keyframes shine {
                to { background-position-x: -200%; }
            }

            /* --- TOGGLE SWITCH --- */
            /* O checkbox nativo continua no DOM (checked/foco/teclado de gra\xE7a),
               s\xF3 o visual \xE9 trocado - \xFAnico controle de OS "cru" que sobrava
               no popup inteiro, destoando do resto do design system. */
            .cw-toggle-switch { position: relative; display: inline-block; width: 40px; height: 22px; flex-shrink: 0; }
            .cw-toggle-switch input {
                position: absolute; inset: 0; width: 100%; height: 100%; margin: 0;
                opacity: 0; cursor: pointer; z-index: 1;
            }
            .cw-toggle-track {
                position: absolute; inset: 0; background: ${o.border};
                border-radius: 100px; transition: background-color 0.2s ease; pointer-events: none;
            }
            .cw-toggle-track::before {
                content: ''; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px;
                background: #fff; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .cw-toggle-switch input:checked + .cw-toggle-track { background: ${o.primary}; }
            .cw-toggle-switch input:checked + .cw-toggle-track::before { transform: translateX(18px); }
            .cw-toggle-switch input:focus-visible + .cw-toggle-track { outline: 2px solid ${o.primary}; outline-offset: 2px; }
            @media (prefers-reduced-motion: reduce) {
                .cw-toggle-track, .cw-toggle-track::before { transition: none !important; }
            }
        `,document.head.appendChild(w)}let a=document.createElement("div");a.id="configs-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Ce,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r=we(a,"Configura\xE7\xF5es",e,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:a},()=>E());a.appendChild(r);let s=document.createElement("div");s.className="cw-configs-container",a.appendChild(s);let c=document.createElement("div");c.className="cw-profile-card",c.id="cw-user-profile-section",c.style.display="none",s.appendChild(c);async function u(){c.style.display="flex",c.innerHTML=`
            <div class="cw-skeleton cw-skeleton-avatar"></div>
            <div class="cw-profile-info">
                <div class="cw-skeleton cw-skeleton-title"></div>
                <div class="cw-profile-badges">
                    <div class="cw-skeleton cw-skeleton-badge"></div>
                    <div class="cw-skeleton cw-skeleton-badge"></div>
                    <div class="cw-skeleton cw-skeleton-badge"></div>
                </div>
                <div class="cw-skeleton cw-skeleton-text" style="margin-top: 8px;"></div>
            </div>
        `,(async()=>{try{ye()||await at();let w=ye(),v=w?w.split("@")[0]:"user",x=await pt(v);if(!x){c.innerHTML=`
                <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                    ${v.charAt(0).toUpperCase()}
                </div>
                <div class="cw-profile-info">
                    <h2 class="cw-profile-ldap">@${v}</h2>
                    <div class="cw-profile-badges">
                        <span class="cw-profile-badge">Consultor</span>
                    </div>
                    <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                        Perfil n\xE3o localizado na base de dados.
                    </div>
                </div>
            `;return}c.innerHTML=`
        <img src="https://moma-teams-photos.corp.google.com/photos/${v}?sz=600&type=PLUS"
             class="cw-profile-avatar" alt="User Photo"
             onerror="this.style.display='none'">
        <div class="cw-profile-info">
            <h2 class="cw-profile-ldap">@${x.ldap}</h2>
            <div class="cw-profile-badges">
                <span class="cw-profile-badge">${x.roleCategory||"N/A"}</span>
                <span class="cw-profile-badge">${x.segment||"N/A"}</span>
                <span class="cw-profile-badge">${x.defaultLanguage||"N/A"}</span>
                ${x.isOverhead?'<span class="cw-profile-badge overhead">Gest\xE3o / Overhead</span>':""}
            </div>
            <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                ${x.role||""}
            </div>
        </div>
    `}catch(w){console.warn("Erro ao renderizar perfil:",w),c.style.display="none"}})()}u();let d=document.createElement("div");d.className="cw-configs-section",d.innerHTML=`
        <div class="cw-configs-section-title">Prefer\xEAncias de Som</div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label">Efeitos Sonoros</div>
                    <div class="cw-configs-desc">Ativar ou desativar sons de interface.</div>
                </div>
                <label class="cw-toggle-switch">
                    <input type="checkbox" id="cw-config-sound-toggle" ${k.isMuted()?"":"checked"}>
                    <span class="cw-toggle-track"></span>
                </label>
            </div>
        </div>
    `;let h=d.querySelector("#cw-config-sound-toggle");h.onchange=w=>{k.setMuted(!w.target.checked),w.target.checked&&k.playClick()},s.appendChild(d);let f=document.createElement("div");f.className="cw-configs-section",f.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugest\xF5es</a>
            </div>
        </div>
    `,s.appendChild(f);function E(){t=!t,Se(t,a,"cw-btn-configs"),t?(ge(),k.playClick()):be()}return document.body.appendChild(a),E}var je={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"};var Xe="cubic-bezier(0.4, 0, 0.2, 1)",ec=`all 0.3s ${Xe}`,ma=()=>{if(document.getElementById("bau-form-global-styles"))return;let e=document.createElement("style");e.id="bau-form-global-styles",e.textContent=`
    /* --- 1. POSICIONAMENTO E ANCORAGEM --- */
    .bau-popup {
      width: 650px;
      max-width: 95vw;
      max-height: 90vh;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      
      background: #FFFFFF; 
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      border: 1px solid #DADCE0;
      
      transform-origin: center center;
      animation: cw-genie-effect-in 0.4s ${Xe};
      color: #202124;
    }

    .bau-view-container {
      flex: 1;
      position: relative;
      min-height: 400px;
      overflow: scroll;
    }

    .bau-view {
      display: none;
      flex-direction: column;
      height: 100%;
      animation: bauFadeIn 0.3s ease;
      position: relative;
      box-sizing: border-box;
      overflow: hidden; /* Garante que o conte\xFAdo n\xE3o vaze */
      margin-top: 18px;
    }
    .bau-view.active { display: flex; }
    @keyframes bauFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* --- 3. ESTILOS GERAIS E CLASSES ADICIONAIS --- */
    .bau-dashboard-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      padding-bottom: 120px;
      scroll-behavior: smooth;
      height: 100%;
      box-sizing: border-box;

      scrollbar-width: thin;
      scrollbar-color: #DADCE0 transparent;
    }
    .bau-dashboard-content::-webkit-scrollbar {
      width: 6px;
    }
    .bau-dashboard-content::-webkit-scrollbar-track {
      background: transparent;
    }
    .bau-dashboard-content::-webkit-scrollbar-thumb {
      background-color: #DADCE0;
      border-radius: 4px;
      border: 2px solid #FFFFFF;
    }

    /* --- ACCORDION PARA CASOS ANTIGOS --- */
    .bau-accordion-container { 
        list-style: none;
        margin-top: 12px; 
    }
    .bau-accordion-toggle {
        width: 100%;
        background: #F8F9FA;
        border: 1px solid #DADCE0;
        border-radius: 12px;
        padding: 12px 20px;
        font-size: 13px;
        font-weight: 600;
        color: #5F6368;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: background-color 0.2s ease, color 0.2s ease;
        margin-bottom: 24px;
    }
    .bau-accordion-toggle:hover { background-color: #F1F3F4; color: #202124; }
    .bau-accordion-toggle svg {
        transition: transform 0.3s ease;
    }
    .bau-accordion-toggle.expanded svg {
        transform: rotate(180deg);
    }
    .bau-accordion-content {
        padding: 12px 0 0 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    /* --- DEMAIS ESTILOS --- */

    .bau-dashboard-metrics {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
    }

    .bau-metrics-refresh-btn {
      background: #F8F9FA;
      border: 1px solid #DADCE0;
      color: #5F6368;
      border-radius: 12px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      height: 60px; /* Alinha com os cards de m\xE9tricas */
    }
    .bau-metrics-refresh-btn:hover {
      background: #F1F3F4;
      color: #202124;
      border-color: #5F6368;
    }
    .bau-metrics-refresh-btn svg { width: 18px; height: 18px; }
    .bau-metrics-refresh-btn.spinning svg { animation: rotate 1s linear infinite; }

    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    .bau-metric-card {
      flex: 1;
      background: #F8F9FA;
      border: 1px solid #DADCE0;
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      position: relative;
      overflow: hidden;
    }
    .bau-metric-value {
      font-size: 20px;
      font-weight: 700;
      color: #1A73E8;
    }
    .bau-metric-label {
      font-size: 11px;
      font-weight: 600;
      color: #5F6368;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .bau-case-list { list-style: none; padding: 0; margin: 0; }

    .bau-case-list li {
      margin-bottom: 12px;
      position: relative;
      overflow: hidden;
    }

    .bau-case-card {
      background: #F8F9FA;
      border: 1px solid #DADCE0;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: default;
      position: relative;
      overflow: hidden;
    }

    .bau-case-card:hover {
      /* Sem transform no pr\xF3prio card: hit-box parado evita o flicker
         hover-liga/desliga perto da borda superior quando ele "sobe". A
         eleva\xE7\xE3o vem s\xF3 da sombra crescendo. */
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      border-color: rgba(26, 115, 232, 0.4);
      background: #F1F3F4;
    }

    /* Aura Status Overrides */
    .bau-case-card.status-yellow-aura { background: linear-gradient(135deg, rgba(249, 171, 0, 0.1) 0%, rgba(249, 171, 0, 0.05) 100%); border-color: rgba(249, 171, 0, 0.2); }
    .bau-case-card.status-green-aura { background: linear-gradient(135deg, rgba(30, 142, 62, 0.1) 0%, rgba(30, 142, 62, 0.05) 100%); border-color: rgba(30, 142, 62, 0.2); }
    .bau-case-card.status-red-aura { background: linear-gradient(135deg, rgba(217, 48, 37, 0.1) 0%, rgba(217, 48, 37, 0.05) 100%); border-color: rgba(217, 48, 37, 0.2); }

    .bau-case-main { display: flex; align-items: flex-start; gap: 12px; }
    .bau-case-icon { color: #5F6368; margin-top: 2px; }
    .bau-case-info { display: flex; flex-direction: column; gap: 4px; }
    .bau-case-header { display: flex; align-items: baseline; gap: 8px; }
    .bau-case-title { margin: 0; font-size: 15px; font-weight: 600; color: #202124; }
    .bau-case-date { font-size: 11px; color: #5F6368; }
    .bau-case-details { margin: 0; font-size: 12px; color: #5F6368; max-width: 400px;}

    .bau-case-status-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 100px;
      white-space: nowrap;
    }
    .bau-case-status-badge.status-yellow { background: rgba(249, 171, 0, 0.2); color: #F9AB00; }
    .bau-case-status-badge.status-green { background: rgba(30, 142, 62, 0.2); color: #1E8E3E; }
    .bau-case-status-badge.status-red { background: rgba(217, 48, 37, 0.2); color: #D93025; }
    .bau-case-status-badge.status-gray { background: rgba(128, 134, 139, 0.2); color: #5F6368; }

    .bau-case-edit-btn {
      background: transparent;
      border: 1px solid #DADCE0;
      color: #5F6368;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      white-space: nowrap;
    }

    .bau-case-edit-btn:hover {
      background: rgba(26, 115, 232, 0.08);
      color: #1A73E8;
      border-color: #1A73E8;
    }

    .bau-case-edit-btn svg {
      width: 14px;
      height: 14px;
    }

    .bau-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
      color: #5F6368;
      height: 100%;
    }
    .bau-empty-state svg { margin-bottom: 16px; opacity: 0.5; }
    .bau-empty-title { font-size: 16px; font-weight: 600; color: #202124; margin: 0 0 4px 0; }

    .bau-success-view {
        display: none;
    }

    .bau-success-view.active {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      text-align: center;
      height: 100%;
      background: #FFFFFF;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
    }

    .bau-success-content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        width: 100%;
    }

    .bau-success-view.active .bau-success-content::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 320px;
        height: 320px;
        transform: translate(-50%, -50%) scale(0.8);
        background: radial-gradient(circle, rgba(30, 142, 62, 0.25) 0%, rgba(26, 115, 232, 0.15) 45%, transparent 75%);
        filter: blur(45px);
        z-index: -1;
        opacity: 0;
        animation: bauAuraCombined 5s ${Xe} 0.2s infinite;
    }

    @keyframes bauAuraCombined {
      0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
      20% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
      100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
    }

    @keyframes bau-success-pop {
      0% { transform: scale(0.4); opacity: 0; }
      75% { transform: scale(1.08); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes bauCheckDraw {
        from { stroke-dashoffset: 35; }
        to { stroke-dashoffset: 0; }
    }

    @keyframes bauSlideUpFade {
        from { transform: translateY(15px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @keyframes bauBtnShimmer {
        0% { transform: translateX(-150%) skewX(-15deg); }
        35%, 100% { transform: translateX(250%) skewX(-15deg); }
    }

    .bau-success-view.active .bau-success-icon {
        width: 88px;
        height: 88px;
        background: rgba(30, 142, 62, 0.12);
        backdrop-filter: blur(16px);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        color: ${je.green};
        animation: bau-success-pop 0.7s var(--cw-ease-spring) forwards;
        box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.6), 0 12px 32px rgba(30, 142, 62, 0.2);
        border: 0.5px solid rgba(255, 255, 255, 0.25);
    }

    .bau-success-view.active .bau-success-icon svg {
        width: 44px;
        height: 44px;
    }

    .bau-success-view.active .bau-check-path {
        stroke-dasharray: 35;
        stroke-dashoffset: 35;
        animation: bauCheckDraw 0.55s ${Xe} 0.75s forwards;
    }

    .bau-success-view.active .bau-success-title {
        font-size: 24px;
        font-weight: 700;
        color: #202124;
        margin: 0 0 8px 0;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Xe} 0.85s forwards;
    }

    .bau-success-view.active .bau-success-subtitle {
        font-size: 15px;
        color: #5F6368;
        margin-bottom: 36px;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Xe} 0.95s forwards;
    }

    .bau-success-view.active #bau-success-back-btn {
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Xe} 1.05s forwards;
        position: relative;
        overflow: hidden;
    }

    .bau-success-view.active #bau-success-back-btn::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transform: translateX(-150%) skewX(-15deg);
        animation: bauBtnShimmer 2.5s ease-in-out 1.8s forwards;
    }
    
    /* STICKY FAB */
    .bau-dashboard-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1a73e8;
      color: #ffffff;
      border: none;
      border-radius: 100px;
      padding: 14px 24px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(26,115,232,0.4);
      transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10;
    }
    .bau-dashboard-fab:hover {
      background: #1557b0;
      box-shadow: 0 8px 24px rgba(26,115,232,0.5);
    }

    .bau-view-header { margin-bottom: 20px; padding: 0 24px; }
    .bau-content {
      overflow-y: auto;
      flex: 1;
      padding: 0 24px;
      box-sizing: border-box;
    }
    .bau-back-btn { background: transparent; border: none; color: #5F6368; font-size: 14px; display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 4px 0; }
    .bau-back-btn:hover { color: #202124; }

    .bau-progress-indicator { display: flex; justify-content: space-between; margin-bottom: 24px; position: relative; }
    .bau-progress-indicator::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: #DADCE0; z-index: 1; transform: translateY(-50%); }
    .bau-progress-step { width: 28px; height: 28px; border-radius: 50%; background: #FFFFFF; border: 2px solid #DADCE0; color: #5F6368; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; position: relative; z-index: 2; transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease; }
    .bau-progress-step.active { border-color: #1A73E8; background: #1A73E8; color: #FFFFFF; }
    .bau-progress-step.completed { border-color: #1E8E3E; background: #1E8E3E; color: #FFFFFF; }

    .bau-step {
      display: none;
      padding-bottom: 80px;
    }

    /* --- BRANCHING (STEP 0) --- */
    .bau-branching-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 10px 0;
    }

    .bau-branching-card {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(218, 220, 224, 0.5);
      border-radius: 16px;
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      transition: transform 0.4s var(--cw-ease-spring), border-color 0.4s var(--cw-ease-spring), box-shadow 0.4s var(--cw-ease-spring), background-color 0.4s var(--cw-ease-spring);
      position: relative;
      overflow: hidden;
    }

    .bau-branching-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(135deg, rgba(26, 115, 232, 0.05) 0%, rgba(161, 75, 255, 0.05) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .bau-branching-card:hover {
      /* Era o pior caso do arquivo: -8px + scale no pr\xF3prio card, maior
         chance de flicker de hit-box de todo o app. A eleva\xE7\xE3o continua
         n\xEDtida s\xF3 com sombra+borda; o "movimento" fica com o \xEDcone filho
         (:hover .bau-branching-icon, abaixo). */
      border-color: #1A73E8;
      box-shadow: 0 12px 32px rgba(26, 115, 232, 0.15);
      background: rgba(255, 255, 255, 0.9);
    }

    .bau-branching-card:hover::before {
      opacity: 1;
    }

    .bau-branching-icon {
      width: 56px;
      height: 56px;
      background: #F8F9FA;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      color: #1A73E8;
      transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    }

    .bau-branching-card:hover .bau-branching-icon {
      background: #1A73E8;
      color: #FFFFFF;
      transform: rotate(5deg);
    }

    .bau-branching-title {
      font-size: 16px;
      font-weight: 700;
      color: #202124;
      margin-bottom: 8px;
    }

    .bau-branching-subtitle {
      font-size: 12px;
      color: #5F6368;
      line-height: 1.5;
    }
    .bau-step.active {
      display: block;
      animation: bauFadeIn 0.3s;
    }

    /* FORM INPUTS - GEMINI SYSTEM */
    .bau-card { background: #F8F9FA; border: 1px solid #DADCE0; border-radius: 12px; padding: 20px; margin-bottom: 20px; }

    .bau-highlight-panel {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      padding: 20px;
      background: linear-gradient(135deg, #F8F9FA 0%, #F1F3F4 100%);
      backdrop-filter: blur(12px);
      border-radius: 12px;
      border: 1px solid #DADCE0;
      margin-bottom: 24px;
      position: relative;
      overflow: hidden;
    }

    .bau-highlight-panel::before {
        content: '';
        position: absolute;
        top: -50%; left: -50%; width: 200%; height: 200%;
        background: radial-gradient(circle, rgba(26, 115, 232, 0.1) 0%, transparent 70%);
        animation: geminiPulse 8s infinite alternate;
    }

    .bau-highlight-panel.discard-theme::before {
        background: radial-gradient(circle, rgba(217, 48, 37, 0.12) 0%, transparent 70%);
    }

    @keyframes geminiPulse {
        0% { transform: translate(-10%, -10%) scale(1); }
        100% { transform: translate(10%, 10%) scale(1.1); }
    }

    .bau-highlight-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 1;
      padding: 8px 12px;
      border-radius: 10px;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: default;
    }

    .bau-highlight-item:hover {
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    .bau-highlight-label { font-size: 11px; color: #5F6368; text-transform: uppercase; letter-spacing: 0.5px; }
    .bau-highlight-value { font-size: 14px; font-weight: 500; color: #202124; }

    .bau-label { display: block; font-size: 13px; font-weight: 600; color: #202124; margin-top: 20px; margin-bottom: 8px; }
    
    .bau-input, .bau-select, .bau-textarea {
      width: 100%;
      background: #FFFFFF;
      border: 1px solid #DADCE0;
      border-radius: 8px;
      padding: 12px 16px;
      color: #202124;
      font-size: 14px;
      transition: border-color 0.2s ease, background-color 0.2s ease;
      box-sizing: border-box;
    }

    .bau-input:focus, .bau-select:focus, .bau-textarea:focus {
      border-color: #1A73E8;
      background: #FFFFFF;
      outline: none;
      box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
    }

    .bau-tasks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 16px;
      margin-top: 12px;
    }
    .bau-task-item {
      background: #F8F9FA;
      border: 1px solid #DADCE0;
      border-radius: 8px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    }
    .bau-task-item:hover { background: #F1F3F4; border-color: #5F6368; }
    .bau-task-item.active { background: rgba(26, 115, 232, 0.1); border-color: #1A73E8; color: #1A73E8; }
    .bau-task-item input { display: none; }
    .bau-task-item span { font-size: 12px; font-weight: 500; line-height: 1.2; }

    .bau-availability-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
    .bau-field-hint { font-size: 11px; color: #5F6368; }

    .bau-availability-disclaimer {
      margin-top: 16px;
      padding: 12px 16px;
      background: #FFF8E1;
      border: 1px solid #FFE082;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bau-disclaimer-text {
      font-size: 12px;
      color: #795548;
      line-height: 1.5;
    }

    .bau-timezone-link {
      background: #FFFFFF;
      border: 1px solid #DADCE0;
      color: #1A73E8;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      align-self: flex-start;
    }

    .bau-timezone-link:hover {
      background: #F1F3F4;
      border-color: #1A73E8;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .bau-timezone-link svg {
      width: 14px;
      height: 14px;
    }

    /* BADGES */
    .bau-context-badges-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }
    .bau-context-badge {
      background: #F8F9FA;
      border: 1px solid #DADCE0;
      border-radius: 6px;
      padding: 4px 10px;
      display: flex;
      gap: 6px;
      font-size: 11px;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: default;
    }

    .bau-context-badge:hover {
      transform: scale(1.08);
      background: rgba(26, 115, 232, 0.05);
      border-color: #1A73E8;
      backdrop-filter: blur(4px);
      box-shadow: 0 2px 8px rgba(26,115,232,0.1);
    }
    .bau-badge-label { color: #5F6368; }
    .bau-badge-value { color: #202124; font-weight: 500; }

    /* CONFIRMATION STEP 4 */
    .bau-confirmation-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }
    .bau-confirm-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 10px 14px;
      background: #F8F9FA;
      border-radius: 10px;
      border: 1px solid #DADCE0;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      position: relative;
    }
    .bau-confirm-row:hover {
      background: #F1F3F4;
      border-color: #1A73E8;
    }
    .bau-confirm-row.full-width {
      grid-column: 1 / -1;
    }
    .bau-confirm-label {
      font-size: 10px;
      color: #1A73E8;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 700;
      margin-bottom: 2px;
    }
    .bau-confirm-value-input {
      font-family: inherit;
      font-size: 13px;
      color: #202124;
      line-height: 1.5;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 4px;
      padding: 4px 8px;
      margin-left: -8px;
      width: calc(100% + 16px);
      outline: none;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      cursor: text;
      box-sizing: border-box;
    }
    .bau-confirm-row:hover .bau-confirm-value-input {
      background: #FFFFFF;
      border-color: #DADCE0;
    }
    .bau-confirm-value-input:focus {
      background: #FFFFFF;
      border-color: #1A73E8;
      box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
    }
    .bau-confirm-textarea {
      resize: vertical;
      min-height: 40px;
    }
    .bau-confirm-divider {
      grid-column: 1 / -1;
      height: 1px;
      background: linear-gradient(90deg, transparent, #DADCE0, transparent);
      margin: 12px 0;
    }

    .bau-footer { 
        position: absolute; 
        bottom: 0; 
        left: 0; 
        right: 0; 
        background: rgba(255,255,255,0.8);
        backdrop-filter: blur(10px);
        display: flex; 
        justify-content: flex-end; 
        gap: 12px; 
        padding: 16px 24px;
        border-top: 1px solid #DADCE0;
        z-index: 100;
    }

    .bau-btn-primary, .bau-btn-submit {
      background: #1a73e8;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .bau-btn-submit { width: 100%; justify-content: center; box-shadow: 0 4px 12px rgba(26,115,232,0.3); }
    .bau-btn-primary:hover, .bau-btn-submit:hover { background: #1557b0; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(26,115,232,0.4); }

    .bau-btn-secondary {
      background: transparent;
      border: 1px solid #DADCE0;
      color: #5F6368;
      border-radius: 8px;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }
    .bau-btn-secondary:hover { background: #F1F3F4; color: #202124; border-color: #5F6368; }

    .bau-shimmer {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent);
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

    .bau-skeleton-card { height: 80px; background: #F1F3F4; border-radius: 12px; position: relative; overflow: hidden; margin-bottom: 12px; }
    .bau-skeleton-metric { height: 60px; background: #F1F3F4; border-radius: 12px; flex: 1; position: relative; overflow: hidden; }

    .bau-error-text { color: #D93025 !important; }
    .bau-data-error-hint { font-size: 10px; color: #D93025; margin-top: 4px; font-weight: 500; }
    .bau-pulse-attention { animation: pulseGlow 2s infinite; }
    @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(217, 48, 37, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(217, 48, 37, 0); } 100% { box-shadow: 0 0 0 0 rgba(217, 48, 37, 0); } }

    /* --- BAU DETAILS INTERNAL VIEW (Standard Regular Material) --- */
    .bau-details-view {
        position: absolute;
        top: 56px;
        left: 0;
        width: 100%;
        height: calc(100% - 56px);
        background: #F8F9FA;
        z-index: 200;
        display: none;
        flex-direction: column;
        pointer-events: none;
        opacity: 0;
        transform: scale(0.95) translateY(10px);
        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                    transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        border-radius: 0 0 16px 16px;
        overflow: hidden;
    }

    .bau-details-view.active {
        display: flex;
        opacity: 1;
        pointer-events: auto;
        transform: scale(1) translateY(0);
    }

    .bau-details-header {
        padding: 16px 24px;
        background: #FFFFFF;
        border-bottom: 1px solid #DADCE0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
    }

    .bau-details-title {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #202124;
    }

    .bau-details-close-btn {
        background: #F1F3F4;
        border: 1px solid #DADCE0;
        color: #5F6368;
        cursor: pointer;
        padding: 6px 16px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 500;
        transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }
    .bau-details-close-btn:hover { background: #E8EAED; color: #202124; transform: scale(1.02); }
    .bau-details-close-btn:active { transform: scale(0.95); transition: transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1); }

    .bau-details-content {
        padding: 24px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
        scrollbar-width: thin;
    }

    .bau-details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .bau-details-card {
        background: #FFFFFF;
        border: 1px solid #DADCE0;
        border-radius: 12px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        transition: transform 0.2s ease;
        /* min-width:0 \xE9 necess\xE1rio pra c\xE9lula de grid poder encolher abaixo
           do conte\xFAdo \u2014 sem isso, um texto sem quebra (URL, ID de rastreio)
           for\xE7a a coluna a ficar larga, estoura o grid, e o pai com
           overflow:hidden corta/sobrep\xF5e em vez de rolar. Casos j\xE1
           resolvidos tendem a ter os campos mais preenchidos, por isso o
           problema aparecia mais neles. */
        min-width: 0;
    }

    .bau-details-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
        position: relative;
    }
    .bau-details-card.full-width { grid-column: 1 / -1; }

    .bau-details-label {
        font-size: 11px;
        font-weight: 700;
        color: #5F6368;
        text-transform: uppercase;
        letter-spacing: 0.8px;
    }

    .bau-details-value {
        font-size: 14px;
        font-weight: 500;
        color: #202124;
        line-height: 1.5;
        overflow-wrap: break-word;
        word-break: break-word;
    }

    .bau-copy-btn {
        position: absolute;
        top: 0;
        right: 0;
        background: transparent;
        border: none;
        color: #1A73E8;
        cursor: pointer;
        padding: 4px;
        opacity: 0;
        transition: opacity 0.2s ease, background-color 0.2s ease;
        border-radius: 6px;
    }
    .bau-details-row:hover .bau-copy-btn { opacity: 1; background: #E8F0FE; }
    .bau-copy-btn:active { transform: scale(0.85); transition: transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1); }

    .bau-details-divider {
        grid-column: 1 / -1;
        height: 1px;
        background: #DADCE0;
        margin: 8px 0;
    }

    .bau-input-group {
      display: flex;
    }

    .bau-input-group > .bau-input {
      border-radius: 8px 0 0 8px;
    }

    .bau-mini-btn-input {
      background: #F8F9FA;
      border: 1px solid #DADCE0;
      color: #5F6368;
      border-radius: 0 8px 8px 0;
      padding: 12px 16px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      margin-left: -1px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* --- LOADING OVERLAY --- */
    .bau-form-loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      animation: bauFadeIn 0.3s ease;
    }

    .bau-form-loading-overlay.active {
      display: flex;
    }

    .bau-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(26, 115, 232, 0.1);
      border-top-color: #1A73E8;
      border-radius: 50%;
      animation: rotate 0.8s linear infinite;
      margin-bottom: 12px;
    }

    .bau-loading-text {
      font-size: 14px;
      font-weight: 600;
      color: #1A73E8;
      letter-spacing: 0.3px;
    }

    .bau-mini-btn-input:hover {
      background: #F1F3F4;
      color: #202124;
      border-color: #5F6368;
      z-index: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      /* Auras/pulsos puramente decorativos - infinitos, sem fun\xE7\xE3o de status.
         Spinners (.bau-spinner, .bau-metrics-refresh-btn.spinning svg) e o
         .bau-shimmer de skeleton ficam de fora: carregam estado de "carregando"
         real, mesmo padr\xE3o adotado no cwLibSpin da Biblioteca Pessoal. */
      .bau-success-view.active .bau-success-content::before,
      .bau-highlight-panel::before,
      .bau-pulse-attention {
        animation: none !important;
      }

      /* Sequ\xEAncia de sucesso (ao submeter um caso) simplificada pra fade puro -
         mesmo tratamento dado \xE0 splash screen em utils.js. */
      .bau-success-view.active .bau-success-icon,
      .bau-success-view.active .bau-success-title,
      .bau-success-view.active .bau-success-subtitle,
      .bau-success-view.active #bau-success-back-btn {
        animation-name: bauFadeIn !important;
        transform: none !important;
      }
      .bau-success-view.active #bau-success-back-btn::after {
        animation: none !important;
      }

      .bau-case-card:hover,
      .bau-dashboard-fab:hover,
      .bau-branching-card:hover,
      .bau-branching-card:hover .bau-branching-icon,
      .bau-highlight-item:hover,
      .bau-btn-primary:hover, .bau-btn-submit:hover,
      .bau-details-close-btn:hover,
      .bau-details-close-btn:active,
      .bau-copy-btn:active {
        transform: none !important;
      }
    }
  `,document.head.appendChild(e)};var Ke={steps:[{id:0,title:"Selecione o tipo de atendimento",isBranching:!0},{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"Nome do AM",required:!0,isSmart:!0},{id:"website",name:"website",label:"Website",type:"text",placeholder:"https://www.exemplo.com",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica",options:["Ads Conversion Tracking","Ads Dynamic Remarketing","Ads Enhanced Conversions","Ads Website Call Conversion","Ads Remarketing","Analytics Cross Domain Tracking","Analytics E-Commerce Tracking","Analytics Enhanced E-Commerce Tracking","Analytics Event Tracking","Analytics Health Check","Analytics Remarketing","Analytics Setup","Fix GA4 implementation","Consent Mode","Fix Sitewide Tagging (OGT & CT)","Google Tag Manager Installation","Customer Match"]}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0},{id:5,title:"Solicitar Descarte",fields:[{id:"caseId",name:"caseId",label:"Case ID",type:"text",placeholder:"Case ID",required:!0,isSmart:!0},{id:"language",name:"language",label:"Idioma",type:"text",placeholder:"Idioma",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text",placeholder:"Speakeasy ID",required:!0,isSmart:!0},{id:"description",name:"description",label:"Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva o motivo do descarte...",required:!0},{id:"discardReason",name:"reason",label:"Motivo do Descarte",type:"select",required:!0,groups:[{label:"Live Appointments",options:[{value:"Caso Filho gerado no atendimento",text:"Caso Filho gerado no atendimento"},{value:"3\xAA Tentativa de contato sem sucesso",text:"3\xAA Tentativa de contato sem sucesso"}]},{label:"Live Meet",options:[{value:"Apenas o AM presente",text:"Apenas o AM presente"},{value:"Estouro de tempo para conclus\xE3o",text:"Estouro de tempo para conclus\xE3o"},{value:"Gera\xE7\xE3o de caso BAU (Reagendamento)",text:"Gera\xE7\xE3o de caso BAU (Reagendamento)"}]}]}]}]};var fe={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'};function ga(e){switch(e){case"PENDING_TL_CREATION":return{text:"Aguardando TL",class:"status-yellow",aura:"status-yellow-aura"};case"CREATED":return{text:"Aprovado / Criado",class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:"Descartado pelo TL",class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:"Cancelado",class:"status-gray",aura:""};default:return{text:e||"Pendente",class:"status-gray",aura:""}}}function ba(e){let t=document.createElement("div");if(t.className="bau-dynamic-input",t.id=`wrapper-${e.id}`,e.label){let n=document.createElement("label");n.className="bau-label",n.textContent=e.label,e.tooltip&&n.setAttribute("data-tooltip",e.tooltip),t.appendChild(n)}let o;switch(e.type){case"textarea":o=document.createElement("textarea"),o.style.minHeight="80px",t.appendChild(o);break;case"select":o=document.createElement("select"),e.groups?e.groups.forEach(r=>{let s=document.createElement("optgroup");s.label=r.label,r.options.forEach(c=>{let u=document.createElement("option");u.value=c.value,u.textContent=c.text,s.appendChild(u)}),o.appendChild(s)}):e.options&&e.options.forEach(r=>{let s=document.createElement("option");s.value=r.value,s.textContent=r.text,o.appendChild(s)}),t.appendChild(o);break;case"checkbox-grid":return o=document.createElement("div"),o.className="bau-tasks-grid",e.options.forEach(r=>{let s=document.createElement("label");s.className="bau-task-item",s.innerHTML=`<input type="checkbox" name="${e.name}" value="${r}"><span>${r}</span>`,s.addEventListener("click",c=>{c.preventDefault();let u=s.querySelector("input");u.checked=!u.checked,s.classList.toggle("active",u.checked),k.playClick()}),o.appendChild(s)}),t.appendChild(o),t;case"datetime-group":o=document.createElement("div"),o.className="bau-availability-container",e.fields.forEach(r=>{let s=document.createElement("div");s.className="bau-availability-field",s.innerHTML=`
                    <span class="bau-field-hint">${r.label}</span>
                    <input type="datetime-local" name="${r.name}" class="bau-input" ${r.required?"required":""}>
                `,o.appendChild(s)});let n=document.createElement("div");return n.className="bau-availability-disclaimer",n.innerHTML=`
                <div class="bau-disclaimer-text">
                    <strong>Aten\xE7\xE3o:</strong> Para clientes fora do fuso hor\xE1rio do Brasil, o hor\xE1rio inserido deve corresponder sempre ao hor\xE1rio local do cliente, e n\xE3o ao do agente.
                </div>
                <button type="button" class="bau-timezone-link" id="bau-open-timezone">
                    ${fe.refresh}
                    Consultar Time Zone
                </button>
            `,n.querySelector("#bau-open-timezone").onclick=()=>{let r=document.getElementById("cw-btn-timezone");r?(r.click(),k.playClick()):(k.playError(),Y("M\xF3dulo Time Zone n\xE3o encontrado.",{error:!0}))},t.appendChild(o),t.appendChild(n),t;case"text-with-button":let a=document.createElement("div");a.className="bau-input-group",o=document.createElement("input"),o.type="text";let i=document.createElement("button");i.type="button",i.id=e.button.id,i.className="bau-mini-btn-input",i.title=e.button.title,i.innerHTML=fe[e.button.icon]||"",a.appendChild(o),a.appendChild(i),t.appendChild(a);break;default:o=document.createElement("input"),o.type="text",t.appendChild(o)}return o&&e.type!=="checkbox-grid"&&e.type!=="datetime-group"&&(o.id=`bau-form-${e.id}`,o.name=e.name,o.className=e.type==="select"?"bau-select":e.type==="textarea"?"bau-textarea":"bau-input",e.placeholder&&(o.placeholder=e.placeholder),e.required&&(o.required=!0)),t}function fa(){ma();let e=!1,t="dashboard",o=null,n=0,a="BAU",i=!1,r=null,s=Ke.steps.length,c=document.createElement("div");c.id="bau-form-popup",c.className="bau-popup cw-module-window",c.style.display="none";let u=we(c,"BAU Central","v2.2.0","Dashboard de Casos BAU",{},()=>F());c.appendChild(u);let d=document.createElement("div");d.className="bau-view-container",c.appendChild(d);let h=document.createElement("div");h.id="bau-view-details",h.className="bau-details-view",d.appendChild(h);let f=document.createElement("div");f.id="bau-view-dashboard",f.className="bau-view active",f.innerHTML=`
        <div class="bau-dashboard-content">
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <ul class="bau-case-list" id="bau-case-list-container"></ul>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${fe.add}
            Novo Caso BAU
        </button>
    `,d.appendChild(f);let E=document.createElement("div");E.id="bau-view-form",E.className="bau-view";let w=document.createElement("div");w.className="bau-view-header",w.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${fe.back}
        Voltar ao Dashboard
      </button>
    `,E.appendChild(w);let v=document.createElement("div");v.className="bau-content",E.appendChild(v);let x=document.createElement("div");x.className="bau-form-loading-overlay",x.innerHTML=`
        <div class="bau-spinner"></div>
        <div class="bau-loading-text">Configurando Edi\xE7\xE3o...</div>
    `,v.appendChild(x);let z=l=>{x.classList.toggle("active",l)},B=document.createElement("div");B.className="bau-progress-indicator",v.appendChild(B);let C=document.createElement("form");C.id="bau-escalation-form",C.noValidate=!0,v.appendChild(C),Ke.steps.forEach(l=>{let b=document.createElement("div");if(b.className="bau-step"+(l.id===n?" active":""),b.id=`bau-step-${l.id}`,l.isBranching)b.innerHTML=`
                <div class="bau-branching-container">
                    <div class="bau-branching-card" id="bau-opt-full">
                        <div class="bau-branching-icon">${fe.add}</div>
                        <h3 class="bau-branching-title">Abrir caso para BAU</h3>
                        <p class="bau-branching-subtitle">Fluxo completo para implementa\xE7\xF5es t\xE9cnicas e suporte especializado.</p>
                    </div>
                    <div class="bau-branching-card" id="bau-opt-discard">
                        <div class="bau-branching-icon">${fe.empty}</div>
                        <h3 class="bau-branching-title">Solicitar Descarte</h3>
                        <p class="bau-branching-subtitle">Fluxo simplificado para casos que n\xE3o requerem implementa\xE7\xE3o.</p>
                    </div>
                </div>
            `,b.querySelector("#bau-opt-full").onclick=()=>{a="BAU",n=1,C.querySelectorAll(".bau-highlight-panel").forEach(p=>p.classList.remove("discard-theme")),te(),k.playClick()},b.querySelector("#bau-opt-discard").onclick=()=>{a="DISCARD",n=5,C.querySelectorAll(".bau-highlight-panel").forEach(p=>p.classList.add("discard-theme")),te(),k.playClick()};else if(l.isConfirmation)b.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">Confirme os dados antes de enviar</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let p=document.createElement("div");if(p.className="bau-card",l.id===1||l.id===5){p.innerHTML=`
                    <div class="bau-vital-highlights bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div class="bau-all-data"></div>
                `;let S=p.querySelector(".bau-dynamic-inputs-container");l.fields.forEach(A=>{S.appendChild(ba(A))});let m=p.querySelector("#wrapper-cid");if(m){let A=document.createElement("div");A.id="bau-cid-error",A.className="bau-cid-error-hint",A.style.display="none",A.textContent="Formato de CID incorreto",m.appendChild(A)}}else l.fields.forEach(S=>{p.appendChild(ba(S))});b.appendChild(p)}C.appendChild(b)});let N=document.createElement("div");N.className="bau-footer";let $=document.createElement("button");$.type="button",$.id="bau-step-back-btn",$.className="bau-btn-secondary",$.textContent="Voltar";let W=document.createElement("button");W.type="button",W.id="bau-step-next-btn",W.className="bau-btn-primary",W.textContent="Pr\xF3ximo";let I=document.createElement("button");I.type="submit",I.className="bau-btn-submit",I.innerHTML=`${fe.send} Enviar para o TL`,I.style.display="none",N.appendChild($),N.appendChild(W),N.appendChild(I),C.appendChild(N),d.appendChild(E);let q=document.createElement("div");q.id="bau-view-success",q.className="bau-view bau-success-view",q.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${je.green};">${fe.check}</div>
            <h2 class="bau-success-title">Caso enviado com sucesso!</h2>
            <p class="bau-success-subtitle">Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.</p>
            <button class="bau-btn-primary" id="bau-success-back-btn">Voltar ao Dashboard</button>
        </div>
    `,d.appendChild(q),document.body.appendChild(c);function _(l){t=l,c.querySelectorAll(".bau-view").forEach(A=>A.classList.remove("active"));let b=c.querySelector(`#bau-view-${l}`);b&&b.classList.add("active");let p=u.querySelector(".cw-module-header-title")||u.querySelector("h2"),S=u.querySelector(".cw-module-header-subtitle")||u.querySelector("p");p&&(l==="form"?p.textContent=i?`Editando Caso #${r}`:"Novo Caso BAU":p.textContent="BAU Central"),S&&(S.textContent=l==="form"?"Preencha os detalhes abaixo":"Dashboard de Casos BAU");let m=C.querySelector(".bau-btn-submit");m&&(m.innerHTML=i?`${fe.send} Salvar Altera\xE7\xF5es`:`${fe.send} Enviar para o TL`)}function H(){let l=c.querySelector("#bau-case-list-container"),b=c.querySelector("#bau-dashboard-metrics");b&&(b.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),l&&(l.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function j(){let l=c.querySelector("#bau-case-list-container"),b=c.querySelector("#bau-dashboard-metrics");if(!(!l||!b)){H();try{let p=await so();if(!Array.isArray(p))throw new Error("API response is not a valid array");ee(p)}catch(p){console.error("Critical Error loading BAU cases:",p),b&&(b.innerHTML=""),l.innerHTML=`
                <div class="bau-empty-state bau-error-state">
                    <div style="color: ${je.red}; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">Ops! Algo deu errado</h3>
                    <p class="bau-empty-subtitle">N\xE3o conseguimos carregar seus casos BAU no momento.</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        Tentar Novamente
                    </button>
                </div>
            `,c.querySelector("#bau-retry-btn")?.addEventListener("click",()=>j()),k.playError(),Y("Erro ao carregar Dashboard. Verifique sua conex\xE3o.",{error:!0})}}}function L(l){if(!l)return;let b=ga(l.status),p=(m,A)=>{navigator.clipboard.writeText(m).then(()=>{Y("Copiado para a \xE1rea de transfer\xEAncia!"),k.playClick();let y=A.style.color;A.style.color="#1E8E3E",setTimeout(()=>{A.style.color=y},800)})};h.innerHTML=`
            <div class="bau-details-header">
                <h2 class="bau-details-title">Detalhes do Caso</h2>
                <button class="bau-details-close-btn">
                    ${fe.back}
                    Voltar
                </button>
            </div>
            <div class="bau-details-content">
                <div class="bau-details-grid">
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Anunciante</span>
                            <span class="bau-details-value">${l.advName||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${fe.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Status</span>
                            <span class="bau-case-status-badge ${b.class}">${b.text}</span>
                        </div>
                    </div>
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">CID</span>
                            <span class="bau-details-value">${l.cid||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${fe.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Case ID</span>
                            <span class="bau-details-value">${l.caseId||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${fe.wand}</button>
                        </div>
                    </div>

                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Speakeasy ID</span>
                            <span class="bau-details-value">${l.seId||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${fe.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Email do Anunciante</span>
                            <span class="bau-details-value">${l.advEmail||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${fe.wand}</button>
                        </div>
                    </div>
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Site</span>
                            <span class="bau-details-value">${l.site||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${fe.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Timezone</span>
                            <span class="bau-details-value">${l.timezone||"---"}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Idioma</span>
                            <span class="bau-details-value">${l.language||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">AM Respons\xE1vel</span>
                            <span class="bau-details-value">${l.amName||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Programa de Vendas</span>
                            <span class="bau-details-value">${l.salesProgram||"---"}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Motivo BAU</span>
                            <span class="bau-details-value">${l.reason||"N\xE3o informado"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Tasks solicitadas</span>
                            <span class="bau-details-value">${l.task||l.taskType||"Nenhuma"}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Justificativa</span>
                            <span class="bau-details-value">${l.nonImplementationReason||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Descri\xE7\xE3o detalhada</span>
                            <span class="bau-details-value">${l.description||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Disponibilidade</span>
                            <span class="bau-details-value">${ft(l.availability)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;let S=h.querySelector(".bau-details-close-btn");S.onclick=()=>{h.classList.remove("active"),k.playSwoosh(),setTimeout(()=>{h.style.display="none"},600)},h.querySelectorAll(".bau-copy-btn").forEach(m=>{m.onclick=A=>{let y=A.target.closest(".bau-details-row").querySelector(".bau-details-value").textContent;p(y,m)}}),h.style.display="flex",requestAnimationFrame(()=>{h.classList.add("active"),k.playClick()})}function D(l){if(!l)return"";let b=ga(l?.status),p=ft(l?.date),S="",m="";if(l?.status==="PENDING_TL_CREATION"&&l?.availability_1){let T=new Date(l.availability_1),O=new Date;(T<=O||T-O<36e5*2)&&(S='<span class="bau-sla-badge">Urgente</span>',m="bau-pulse-attention")}let A=l?.reason&&l.reason.trim()?l.reason:"Nenhum contexto adicional fornecido pelo agente.",M=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(l?.cid||""),g=!l?.caseId||l.caseId==="N/A"||!M;return g&&l?.status==="PENDING_TL_CREATION"&&(m="bau-pulse-attention"),`
            <li class="bau-case-card ${b.aura} ${m}" data-case-id="${l?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${fe.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${l?.advName||"Nome indefinido"}</h3>
                            ${S}
                            <span class="bau-case-date">${p}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="Customer ID do Anunciante">Case: ${l?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="CID do Anunciante (Formato: 000-000-0000)" class="${M?"":"bau-error-text"}">CID: ${l?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="O que deve ser feito em BAU">Motivo: ${A}</span>
                        </p>
                        ${g?`<div class="bau-data-error-hint">${!l?.caseId||l?.caseId==="N/A"?"Dados Incompletos":"CID Inv\xE1lido"} - Contate o Suporte</div>`:""}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <span class="bau-case-status-badge ${b.class}">${b.text}</span>
                    ${l?.status&&l.status.includes("PENDING")?`
                        <button class="bau-case-edit-btn" data-id="${l.id}" title="Editar Solicita\xE7\xE3o">
                            ${fe.edit}
                            Editar
                        </button>
                    `:""}
                </div>
            </li>
        `}function ee(l){let b=c.querySelector("#bau-case-list-container"),p=c.querySelector("#bau-dashboard-metrics");if(!b||!p)return;let S=Array.isArray(l)?l.filter(Boolean):[];if(S.length===0){p.innerHTML=`
                <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard">
                    ${fe.refresh}
                    Atualizar
                </button>
            `,b.innerHTML=`
                <div class="bau-empty-state">
                    ${fe.empty}
                    <h3 class="bau-empty-title">Nenhum caso recente</h3>
                    <p class="bau-empty-subtitle">Seus casos BAU aparecer\xE3o aqui</p>
                </div>
            `,c.querySelector("#bau-refresh-dashboard")?.addEventListener("click",()=>j());return}let m=S.filter(T=>T.status==="PENDING_TL_CREATION").length,A=S.filter(T=>T.status==="CREATED").length;p.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${m}</span>
                <span class="bau-metric-label">Aguardando TL</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${A}</span>
                <span class="bau-metric-label">Criados / Aprovados</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="Atualizar Dashboard">
                ${fe.refresh}
            </button>
        `;let y=p.querySelector("#bau-refresh-dashboard");y?.addEventListener("click",async()=>{y.classList.contains("spinning")||(y.classList.add("spinning"),k.playClick(),await j(),setTimeout(()=>y.classList.remove("spinning"),1e3))}),b.innerHTML="";let M=S.slice(0,5),g=S.slice(5);if(M.forEach(T=>{let O=D(T),G=document.createElement("div");G.innerHTML=O;let R=G.firstElementChild;R.addEventListener("click",Q=>{Q.target.closest(".bau-case-edit-btn")||L(T)});let ne=R.querySelector(".bau-case-edit-btn");ne&&(ne.onclick=Q=>{Q.stopPropagation(),X(T)}),b.appendChild(R)}),g.length>0){let T=document.createElement("li");T.className="bau-accordion-container";let O=document.createElement("button");O.className="bau-accordion-toggle",O.innerHTML=`${fe.expand} <span>Mostrar ${g.length} casos mais antigos</span>`;let G=document.createElement("ul");G.className="bau-case-list bau-accordion-content",G.style.display="none",g.forEach(R=>{let ne=D(R),Q=document.createElement("div");Q.innerHTML=ne;let de=Q.firstElementChild;de.addEventListener("click",he=>{he.target.closest(".bau-case-edit-btn")||L(R)});let ue=de.querySelector(".bau-case-edit-btn");ue&&(ue.onclick=he=>{he.stopPropagation(),X(R)}),G.appendChild(de)}),O.addEventListener("click",()=>{let R=G.style.display==="none";G.style.display=R?"block":"none",O.classList.toggle("expanded",R),O.querySelector("span").textContent=R?"Esconder casos mais antigos":`Mostrar ${g.length} casos mais antigos`,k.playClick()}),T.appendChild(O),T.appendChild(G),b.appendChild(T)}}function te(){let l=a==="BAU"?[1,2,3,4]:[5,4];C.querySelectorAll(".bau-step").forEach(S=>{let m=parseInt(S.id.replace("bau-step-","")),A=m===n,y=l.includes(m)||m===0;S.classList.toggle("active",A),S.style.display=A?"block":"none",S.querySelectorAll("input, select, textarea").forEach(M=>{M.disabled=!y})});let b=n===0;if(B.style.display=b?"none":"flex",!b){B.innerHTML="";let S=a==="BAU"?[1,2,3,4]:[5,4];S.forEach((m,A)=>{let y=document.createElement("div"),M=m===n,g=S.indexOf(n),T=A<g;y.className=`bau-progress-step ${M?"active":T?"completed":""}`,y.textContent=A+1,B.appendChild(y)})}let p=n===4;$.style.display=n>0?"inline-block":"none",W.style.display=!b&&!p?"inline-block":"none",I.style.display=p?"flex":"none",p&&oe()}function ae(l){let b=Ke.steps.find(p=>p.id===l);if(!b||!b.fields||b.isConfirmation)return!0;for(let p of b.fields){let S=C.querySelector(`#bau-step-${l} #wrapper-${p.id}`);if(!(S&&S.style.display==="none")&&p.validation){let m=C.querySelector(`#bau-step-${l} [name="${p.name}"]`);if(m&&m.offsetParent!==null&&m.value.trim())if(new RegExp(p.validation.regex).test(m.value.trim())){m.classList.remove("invalid-cid");let y=C.querySelector("#bau-cid-error");y&&(y.style.display="none")}else{console.warn(`Validation failed for field "${p.name}" in step ${l}: Regex mismatch.`),k.playError(),Y(`Erro: ${p.validation.error}`,{error:!0}),m.classList.add("invalid-cid");let y=C.querySelector("#bau-cid-error");return y&&(y.style.display="flex"),!1}}}return!0}function Z(l){if(!C.querySelector(`#bau-step-${l}`))return!1;let p=Ke.steps.find(m=>m.id===l);if(!p||!p.fields||p.isConfirmation)return!0;let S=!0;for(let m of p.fields){let A=C.querySelector(`#bau-step-${l} #wrapper-${m.id}`);if(!(A&&A.style.display==="none")&&m.required){let y=!0,M="";if(m.type==="checkbox-grid")C.querySelector(`#bau-step-${l} input[name="${m.name}"]:checked`)||(M="No option selected in checkbox-grid",k.playError(),Y(`Erro: Selecione pelo menos uma op\xE7\xE3o para "${m.label}".`,{error:!0}),y=!1);else if(m.type==="datetime-group"){let g=C.querySelector(`#bau-step-${l} input[name="${m.fields[0].name}"]`);if(!g||g.offsetParent===null)continue;g.value.trim()||(M="Datetime group first field is empty",k.playError(),Y(`Erro: O campo "${m.fields[0].label}" \xE9 obrigat\xF3rio.`,{error:!0}),y=!1)}else{let g=C.querySelector(`#bau-step-${l} [name="${m.name}"]`);if(!g||g.offsetParent===null)continue;g.value.trim()||(M="Field is empty",k.playError(),Y(`Erro: O campo '${m.label}' \xE9 obrigat\xF3rio.`,{error:!0}),y=!1)}if(!y){console.warn(`Validation failed for required field "${m.name}" in step ${l}: ${M}`),S=!1;break}}}return S}W.addEventListener("click",()=>{if(ae(n)&&Z(n)){a==="BAU"?n++:n===5?n=4:n++,te();let l=c.querySelector(".bau-content");l&&(l.scrollTop=0),k.playClick()}}),$.addEventListener("click",()=>{n>0&&(a==="BAU"?n--:n===4?n=5:n===5?n=0:n--,te(),k.playClick())});async function K(){let l=await Ne()||{};(!l.amName||l.amName==="N/A")&&(l.amName=l.internalEmail||"N/A"),o=l,C.querySelectorAll(".bau-vital-highlights").forEach(S=>{let m=[{label:"Anunciante",value:l.advName},{label:"CID",value:l.cid},{label:"Website",value:l.website||l.site},{label:"Case ID",value:l.caseId}];S.innerHTML=m.map(A=>{let y=A.value&&A.value!=="N/A"&&A.value!=="undefined"&&A.value!=="null"?A.value:"N\xE3o capturado";return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${A.label}</span>
                        <span class="bau-highlight-value">${y}</span>
                    </div>
                `}).join("")}),Ke.steps.forEach(S=>{S.fields&&S.fields.forEach(m=>{if(m.isSmart){let A=l[m.id];m.id==="language"&&l.userProfile?.defaultLanguage&&(A=l.userProfile.defaultLanguage);let y=C.querySelector(`#bau-step-${S.id} [name="${m.name}"]`),M=C.querySelector(`#bau-step-${S.id} #wrapper-${m.id}`);if(y&&(y.value=A&&A!=="N/A"?A:"",m.id==="language"&&A&&A!=="N/A"&&(y.readOnly=!0,y.style.background="#F1F3F4",y.style.cursor="not-allowed")),M){let g=A&&A!==""&&A!=="N/A"&&A!=="undefined"&&A!=="null";m.id==="language"?M.style.display="block":M.style.display=g?"none":"block"}}})}),C.querySelectorAll(".bau-all-data").forEach(S=>{let m=[{label:"Anunciante",value:l.advName},{label:"CID",value:l.cid},{label:"AM",value:l.amName},{label:"SE ID",value:l.seId},{label:"Site",value:l.website||l.site},{label:"Email",value:l.email},{label:"Timezone",value:l.timezone},{label:"Case ID",value:l.caseId},{label:"Programa",value:l.salesProgram},{label:"Idioma",value:l.language}];S.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${m.filter(A=>A.value&&A.value!=="N/A"&&A.value!=="---"&&A.value!=="undefined"&&A.value!=="null").map(A=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${A.label}:</span>
                                <span class="bau-badge-value">${A.value}</span>
                            </div>
                        `).join("")}
                </div>
            `})}c.querySelector("#bau-top-se-search")?.addEventListener("click",l=>{l.preventDefault(),vt("bau-form-seId")});let U=c.querySelector("#bau-form-cid");U&&U.addEventListener("input",()=>ae(1));function oe(){let l=new FormData(C),b=Object.fromEntries(l.entries()),p=c.querySelector("#bau-confirmation-details");if(p){if(a==="BAU"){let S=l.getAll("taskType"),m=S.length>0?S.join(", "):"Nenhuma";p.innerHTML=`
                ${i?`<div class="bau-highlight-panel" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${je.yellow}; background: rgba(255, 186, 0, 0.05); border-radius: 8px; font-weight: 500;">Voc\xEA est\xE1 editando o caso #<span style="color: ${je.yellow}">${r}</span></div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Anunciante</span>
                        <input class="bau-confirm-value-input" data-field="advName" data-step="1" value="${b.advName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">CID</span>
                        <input class="bau-confirm-value-input" data-field="cid" data-step="1" value="${b.cid||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">AM</span>
                        <input class="bau-confirm-value-input" data-field="amName" data-step="1" value="${b.amName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Website</span>
                        <input class="bau-confirm-value-input" data-field="website" data-step="1" value="${b.website||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="1" value="${b.seId||""}" placeholder="N\xE3o informado">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">O que deve ser feito</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="reason" data-step="2" placeholder="---">${b.reason||""}</textarea>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Tasks</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="Para editar as tasks, volte ao Passo 2">${m}</span>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Justificativa BAU</span>
                        <select class="bau-confirm-value-input" data-field="nonImplementationReason" data-step="3">
                            <option value="Tempo da consultoria esgotado" ${b.nonImplementationReason==="Tempo da consultoria esgotado"?"selected":""}>Tempo da consultoria esgotado</option>
                            <option value="Solicita\xE7\xE3o de reagendamento pelo anunciante" ${b.nonImplementationReason==="Solicita\xE7\xE3o de reagendamento pelo anunciante"?"selected":""}>Solicita\xE7\xE3o de reagendamento pelo anunciante</option>
                            <option value="Falta de acessos ou backup do site" ${b.nonImplementationReason==="Falta de acessos ou backup do site"?"selected":""}>Falta de acessos ou backup do site</option>
                            <option value="Anunciante indispon\xEDvel ou n\xE3o preparado" ${b.nonImplementationReason==="Anunciante indispon\xEDvel ou n\xE3o preparado"?"selected":""}>Anunciante indispon\xEDvel ou n\xE3o preparado</option>
                            <option value="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)" ${b.nonImplementationReason==="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"?"selected":""}>Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)</option>
                            <option value="Solicita\xE7\xE3o de tarefas (tasks) adicionais" ${b.nonImplementationReason==="Solicita\xE7\xE3o de tarefas (tasks) adicionais"?"selected":""}>Solicita\xE7\xE3o de tarefas (tasks) adicionais</option>
                            <option value="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)" ${b.nonImplementationReason==="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"?"selected":""}>Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)</option>
                            <option value="Retorno de contato ap\xF3s prazo de 14 dias expirado" ${b.nonImplementationReason==="Retorno de contato ap\xF3s prazo de 14 dias expirado"?"selected":""}>Retorno de contato ap\xF3s prazo de 14 dias expirado</option>
                        </select>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Descri\xE7\xE3o</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="3" placeholder="---">${b.description||""}</textarea>
                    </div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Disponibilidade (Prioridade)</span>
                        <input type="datetime-local" class="bau-confirm-value-input" data-field="availability_1" data-step="3" value="${b.availability_1||""}">
                    </div>
                </div>
            `}else p.innerHTML=`
                ${i?`<div class="bau-highlight-panel discard-theme" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${je.red}; background: rgba(217, 48, 37, 0.05); border-radius: 8px; font-weight: 500;">Voc\xEA est\xE1 editando o descarte do caso #<span style="color: ${je.red}">${r}</span></div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Case ID</span>
                        <input class="bau-confirm-value-input" data-field="caseId" data-step="5" value="${b.caseId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Idioma</span>
                        <input class="bau-confirm-value-input" data-field="language" data-step="5" value="${b.language||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="5" value="${b.seId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Motivo do Descarte</span>
                        <input class="bau-confirm-value-input" data-field="reason" data-step="5" value="${b.reason||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Descri\xE7\xE3o do Descarte</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="5" placeholder="---">${b.description||""}</textarea>
                    </div>
                </div>
            `;p.querySelectorAll(".bau-confirm-value-input").forEach(S=>{S.addEventListener("input",m=>{let A=m.target.dataset.field,y=m.target.dataset.step;if(!A||!y)return;let M=C.querySelector(`#bau-step-${y} [name="${A}"]`);M&&(M.value=m.target.value,A==="cid"&&ae(1))})})}}async function X(l){if(!await ve("Aten\xE7\xE3o: Para editar as informa\xE7\xF5es, voc\xEA deve estar com a p\xE1gina deste Caso espec\xEDfico aberta no sistema. Caso contr\xE1rio, os dados capturados estar\xE3o incorretos.",{confirmText:"Estou na p\xE1gina correta"}))return;z(!0),J(),i=!0,r=l.id,a=l.status==="PENDING_TL_DISCARD"||l.reason&&!l.task?"DISCARD":"BAU",_("form"),await K(),o={...o,advName:l.advName||o.advName,cid:l.cid||o.cid,caseId:l.caseId||o.caseId,seId:l.seId||o.seId,site:l.site||l.website||o.site||o.website,email:l.advEmail||o.email,timezone:l.timezone||o.timezone,language:l.language||o.language,amName:l.amName||o.amName,salesProgram:l.salesProgram||o.salesProgram};let p=l.availability?l.availability.split("|").map(S=>S.trim()):[];C.querySelectorAll("input, select, textarea").forEach(S=>{let m=S.name,y={advEmail:"advEmail",website:"site",site:"site"}[m]||m;if(m==="taskType"){let M=(l.task||l.taskType||"").split(",").map(g=>g.trim());S.type==="checkbox"&&(S.checked=M.includes(S.value),S.closest(".bau-task-item")?.classList.toggle("active",S.checked))}else if(m.startsWith("availability_")){let M=parseInt(m.split("_")[1])-1,g=p[M];if(g&&S.type==="datetime-local")try{let T=new Date(g);if(!isNaN(T.getTime())){let O=new Date(T.getTime()-T.getTimezoneOffset()*6e4).toISOString().slice(0,16);S.value=O}}catch{}}else l[y]!==void 0?S.value=l[y]:m==="reason"?S.value=l.reason:m==="description"?S.value=l.description:m==="nonImplementationReason"&&(S.value=l.nonImplementationReason||"")}),n=a==="BAU"?1:5,te(),k.playClick(),setTimeout(()=>z(!1),500)}C.onsubmit=async l=>{l.preventDefault();let b=a==="BAU"?[1,2,3]:[5];for(let M of b)if(!Ke.steps.find(T=>T.id===M)?.isConfirmation&&(!ae(M)||!Z(M))){console.warn(`Form submission blocked by validation failure in step ${M}`),n=M,te();return}let p=c.querySelector(".bau-btn-submit");p.disabled=!0,p.innerHTML="Enviando...";let S=new FormData(C),m=Object.fromEntries(S.entries()),A=o||{},y={...A,...m,requestType:a};if(m.advEmail?y.advEmail=m.advEmail:A.email&&(y.advEmail=A.email),m.website?y.website=m.website:A.website?y.website=A.website:A.site&&(y.website=A.site),a==="BAU"){let M=S.getAll("taskType"),g=[m.availability_1,m.availability_2,m.availability_3].filter(T=>T&&T.trim()!=="").join(" | ");y.taskType=M.join(", "),y.availability=g,i?(m.nonImplementationReason?y.nonImplementationReason=m.nonImplementationReason:delete y.nonImplementationReason,m.description?y.description=m.description:delete y.description):(y.nonImplementationReason=m.nonImplementationReason||"",y.description=m.description||"",y.nonImplementationReason||console.warn("Aviso: Campo 'Justificativa' (nonImplementationReason) est\xE1 saindo vazio."),y.description||console.warn("Aviso: Campo 'Descri\xE7\xE3o detalhada' (description) est\xE1 saindo vazio."))}else y.reason=m.reason,i?(m.description?y.description=m.description:delete y.description,delete y.taskType,delete y.availability,delete y.nonImplementationReason):(y.taskType="",y.availability="",y.nonImplementationReason="",y.description=m.description||"");try{let M=null;i?await co(r,y):M=await ro(y,A.agentEmail||"anon"),k.playSuccess();let g=c.querySelector(".bau-success-title");g&&(i?g.textContent="Caso atualizado com sucesso!":g.textContent=a==="DISCARD"?"Caso enviado para descarte com sucesso!":"Caso enviado com sucesso!"),_("success"),!i&&M&&M.emailSent===!1&&(k.playError(),Y("Caso criado, mas n\xE3o conseguimos confirmar por email.",{error:!0}))}catch(M){k.playError(),Y("Erro: "+(M.message||"Erro desconhecido"),{error:!0}),console.error("Payload que tentou enviar:",y)}finally{p.disabled=!1,p.innerHTML=`${fe.send} Enviar para o TL`}};function J(){C.reset(),n=0,a="BAU",i=!1,r=null,te(),C.querySelectorAll(".bau-task-item.active").forEach(b=>b.classList.remove("active"));let l=C.querySelector('[name="language"]');l&&(l.readOnly=!1,l.style.background="",l.style.cursor="")}c.querySelector("#bau-new-case-btn").addEventListener("click",()=>{J(),_("form"),K()}),c.querySelector("#bau-form-back-btn").addEventListener("click",()=>_("dashboard")),c.querySelector("#bau-success-back-btn").addEventListener("click",()=>_("dashboard"));async function F(){e=!e,c.style.display=e?"flex":"none",e?(ge(),_("dashboard"),j()):be(),Se(e,c,"cw-btn-bauform")}return te(),F}var Ie={notes:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',library:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',timezone:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',configs:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>',broadcast:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',enter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>',arrowDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',arrowUp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>',bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>'};function mn(){if(document.getElementById("cw-palette-styles"))return;let e=document.createElement("style");e.id="cw-palette-styles",e.textContent=`
        .cw-palette-overlay {
            position: fixed; inset: 0;
            background: rgba(32,33,36,0.4);
            backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
            z-index: 2147483647;
            display: flex; align-items: flex-start; justify-content: center;
            padding-top: 14vh;
            opacity: 0; pointer-events: none;
            transition: opacity 0.2s ease;
        }
        .cw-palette-overlay.active { opacity: 1; pointer-events: auto; }

        .cw-palette {
            width: 560px; max-width: 90vw;
            background: rgba(255,255,255,0.98);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.5);
            overflow: hidden;
            transform: scale(0.96) translateY(-8px);
            transition: transform 0.25s var(--cw-ease-decelerate);
            font-family: 'Google Sans', Roboto, sans-serif;
        }
        .cw-palette-overlay.active .cw-palette { transform: scale(1) translateY(0); }
        @media (prefers-reduced-motion: reduce) {
            .cw-palette-overlay, .cw-palette { transition: opacity 0.15s ease !important; transform: none !important; }
        }

        .cw-palette-search { display: flex; align-items: center; gap: 12px; padding: 18px 20px; border-bottom: 1px solid #F1F3F4; }
        .cw-palette-search-icon { color: #9AA0A6; display: flex; flex-shrink: 0; }
        .cw-palette-search-icon svg { width: 20px; height: 20px; }
        .cw-palette-input { flex: 1; border: none; outline: none; background: transparent; font-size: 16px; color: #202124; font-family: inherit; }
        .cw-palette-input::placeholder { color: #9AA0A6; }

        .cw-palette-list { max-height: 340px; overflow-y: auto; padding: 8px; }
        .cw-palette-item { display: flex; align-items: center; gap: 14px; padding: 10px 12px; border-radius: 12px; cursor: pointer; transition: background 0.1s ease; }
        .cw-palette-item.selected { background: #E8F0FE; }
        .cw-palette-item-icon { width: 32px; height: 32px; border-radius: 9px; background: #F1F3F4; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #5F6368; transition: background-color 0.1s ease, color 0.1s ease; }
        .cw-palette-item-icon svg { width: 18px; height: 18px; }
        .cw-palette-item.selected .cw-palette-item-icon { background: #FFFFFF; color: #1A73E8; }
        .cw-palette-item-icon--preset { background: #FEF7E0; color: #F9A825; }
        .cw-palette-item.selected .cw-palette-item-icon--preset { background: #FFFFFF; color: #F9A825; }
        .cw-palette-item-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .cw-palette-item-label { font-size: 14px; font-weight: 600; color: #202124; }
        .cw-palette-item-hint { font-size: 12px; color: #5F6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-palette-empty { padding: 32px; text-align: center; color: #9AA0A6; font-size: 13px; }

        .cw-palette-footer { display: flex; gap: 16px; padding: 10px 20px; border-top: 1px solid #F1F3F4; background: #FAFAFA; font-size: 11px; color: #9AA0A6; font-weight: 600; }
        .cw-palette-footer span { display: flex; align-items: center; gap: 4px; }
        .cw-palette-footer svg { width: 12px; height: 12px; }
    `,document.head.appendChild(e)}function ha(e){mn();function t(x){return x.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}let o=typeof e.toggleNotes=="function"&&typeof e.toggleNotes.openWithPreset=="function"?Object.entries(Ye).filter(([,x])=>x.quickLaunch).map(([x,z])=>({id:`note-preset-${x}`,label:z.quickLaunch.label,hint:"Atalho de nota \xB7 abre pr\xE9-preenchida",keywords:`nota atalho preset ${z.quickLaunch.keywords||""}`,icon:Ie.bolt,isPreset:!0,run:()=>e.toggleNotes.openWithPreset(x)})):[],n=[{id:"notes",label:"Case Notes",hint:"Montar a nota t\xE9cnica do caso",keywords:"notas nota caso anotacoes",icon:Ie.notes,run:e.toggleNotes},{id:"bauform",label:"BAU Form",hint:"Solicita\xE7\xE3o de cria\xE7\xE3o/descarte BAU",keywords:"bau formulario solicitacao criacao descarte",icon:Ie.bauform,run:e.toggleBAUForm},{id:"email",label:"Email Assistant",hint:"Templates inteligentes de e-mail",keywords:"email e-mail correio template",icon:Ie.email,run:e.toggleEmail},{id:"script",label:"Call Script",hint:"Guia interativo de chamada",keywords:"script roteiro chamada ligacao",icon:Ie.script,run:e.toggleScript},{id:"links",label:"Central de Links",hint:"Ferramentas, SOPs e atalhos",keywords:"links atalhos ferramentas sop sops",icon:Ie.links,run:e.toggleLinks},{id:"library",label:"Minha Biblioteca",hint:"Snippets e respostas salvas",keywords:"biblioteca snippets respostas salvas",icon:Ie.library,run:e.toggleLibrary},{id:"timezone",label:"Fusos Hor\xE1rios",hint:"Monitoramento e planejador de chamada",keywords:"fuso horario timezone",icon:Ie.timezone,run:e.toggleTimezone},{id:"broadcast",label:"Avisos",hint:"Comunicados e disponibilidade BAU",keywords:"avisos broadcast comunicados disponibilidade",icon:Ie.broadcast,run:()=>e.broadcastControl&&e.broadcastControl.toggle()},{id:"configs",label:"Configura\xE7\xF5es",hint:"Perfil, som e prefer\xEAncias",keywords:"configuracoes config preferencias perfil som",icon:Ie.configs,run:e.toggleConfigs},...o].filter(x=>typeof x.run=="function").map(x=>({...x,_haystack:t(`${x.label} ${x.hint} ${x.keywords}`)})),a=!1,i=0,r=n,s=document.createElement("div");s.className="cw-palette-overlay",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","Busca r\xE1pida");let c=document.createElement("div");c.className="cw-palette",c.innerHTML=`
        <div class="cw-palette-search">
            <span class="cw-palette-search-icon">${Ie.search}</span>
            <input type="text" class="cw-palette-input" placeholder="Buscar um m\xF3dulo..." autocomplete="off" spellcheck="false">
        </div>
        <div class="cw-palette-list"></div>
        <div class="cw-palette-footer">
            <span>${Ie.arrowDown}${Ie.arrowUp} navegar</span>
            <span>${Ie.enter} selecionar</span>
            <span>esc fechar</span>
        </div>
    `,s.appendChild(c),s.onmousedown=x=>{x.target===s&&w()};let u=c.querySelector(".cw-palette-input"),d=c.querySelector(".cw-palette-list");function h(){if(d.innerHTML="",r.length===0){d.innerHTML='<div class="cw-palette-empty">Nada encontrado.</div>';return}r.forEach((z,B)=>{let C=document.createElement("div");C.className="cw-palette-item"+(B===i?" selected":""),C.innerHTML=`
                <span class="cw-palette-item-icon${z.isPreset?" cw-palette-item-icon--preset":""}">${z.icon}</span>
                <span class="cw-palette-item-text">
                    <span class="cw-palette-item-label">${z.label}</span>
                    <span class="cw-palette-item-hint">${z.hint}</span>
                </span>
            `,C.onmouseenter=()=>{i=B,h()},C.onclick=()=>f(B),d.appendChild(C)});let x=d.children[i];x&&x.scrollIntoView({block:"nearest"})}function f(x){let z=r[x];z&&(k.playClick(),w(),z.run())}function E(){a||(a=!0,r=n,i=0,u.value="",h(),ge(),document.body.appendChild(s),k.playGenieOpen(),requestAnimationFrame(()=>{s.classList.add("active"),u.focus()}))}function w(){a&&(a=!1,be(),s.classList.remove("active"),setTimeout(()=>s.remove(),200))}function v(){a?w():E()}return u.addEventListener("input",()=>{let x=t(u.value.trim());r=x?n.filter(z=>z._haystack.includes(x)):n,i=0,h()}),u.addEventListener("keydown",x=>{x.key==="ArrowDown"?(x.preventDefault(),i=Math.min(i+1,r.length-1),h()):x.key==="ArrowUp"?(x.preventDefault(),i=Math.max(i-1,0),h()):x.key==="Enter"?(x.preventDefault(),f(i)):x.key==="Escape"&&(x.preventDefault(),w())}),document.addEventListener("keydown",x=>{(x.metaKey||x.ctrlKey)&&x.key.toLowerCase()==="k"&&(x.preventDefault(),v())}),{open:E,close:w,toggle:v}}function gn(){if(window.techSolInitialized){Dt();return}window.techSolInitialized=!0;let e="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{xo();try{k.initGlobalListeners()}catch(f){console.warn("\xC1udio bloqueado:",f)}me.fetchTips();let t=Dt(),o=Wo(),n=Zo(),a=ea(),i=oa(),r=ca(),s=pa(),c=ua(),u=fa(),d=aa(),h={toggleNotes:o,toggleEmail:n,toggleScript:a,toggleLinks:i,toggleTimezone:r,toggleLibrary:s,toggleConfigs:c,toggleBAUForm:u,broadcastControl:d};Po(h,t),ha(h),setTimeout(()=>{me.logEvent("App","Start","Session Start"),na(),setTimeout(()=>{ra(e)},500)},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),k.playError(),Y("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}gn();})();
