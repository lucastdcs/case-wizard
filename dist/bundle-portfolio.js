(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/modules/notes/core/notes-state.js
  var notes_state_exports = {};
  __export(notes_state_exports, {
    NotesState: () => NotesState,
    notesState: () => notesState
  });
  var NotesState, notesState;
  var init_notes_state = __esm({
    "src/modules/notes/core/notes-state.js"() {
      NotesState = class {
        constructor() {
          this.reset();
        }
        reset() {
          this.currentCaseType = "bau";
          this.currentLang = "pt";
          this.isPortugalCase = false;
          this.consent = false;
          this.tagSupportUsed = false;
          this.forcedScreenshots = /* @__PURE__ */ new Set();
          this.visible = false;
          this.isSplitView = false;
          this.currentStatus = "";
          this.currentSubStatus = "";
          this.formData = {};
          this.activeTasks = [];
          this.screenshotsData = {};
          this.tagSupportState = null;
          this.isDirty = false;
          this.excludedFields = /* @__PURE__ */ new Set();
          this.activeFields = [];
          const savedFavorites = typeof localStorage !== "undefined" ? localStorage.getItem("cw-notes-favorites") : null;
          this.favorites = new Set(JSON.parse(savedFavorites || "[]"));
          this.screenshotMode = "implementation";
          this.notify();
        }
        setCaseType(type) {
          if (this.currentCaseType === type) return;
          this.currentCaseType = type;
          this.isDirty = true;
          this.notify();
        }
        setLanguage(lang) {
          if (this.currentLang === lang) return;
          this.currentLang = lang;
          this.notify();
        }
        setPortugalCase(val) {
          if (this.isPortugalCase === val) return;
          this.isPortugalCase = val;
          this.isDirty = true;
          this.notify();
        }
        setConsent(val) {
          if (this.consent === val) return;
          this.consent = val;
          this.isDirty = true;
          this.notify();
        }
        setTagSupportUsed(val) {
          this.tagSupportUsed = val;
          if (!val) this.forcedScreenshots.clear();
          this.isDirty = true;
          this.notify();
        }
        setActiveFields(fields) {
          this.activeFields = [...fields];
          this.isDirty = true;
          this.notify();
        }
        removeField(fieldKey) {
          this.activeFields = this.activeFields.filter((key) => key !== fieldKey);
          this.isDirty = true;
          this.notify();
        }
        addFieldAt(fieldKey, index) {
          if (!this.activeFields.includes(fieldKey)) {
            this.activeFields.splice(index, 0, fieldKey);
            this.isDirty = true;
            this.notify();
          }
        }
        setForcedScreenshots(screenshotsArray) {
          this.forcedScreenshots = new Set(screenshotsArray);
          this.isDirty = true;
          this.notify();
        }
        toggleForcedScreenshot(taskKey, val) {
          if (val) this.forcedScreenshots.add(taskKey);
          else this.forcedScreenshots.delete(taskKey);
          this.isDirty = true;
          this.notify();
        }
        setExcludedFields(fieldsArray) {
          this.excludedFields = new Set(fieldsArray);
          this.isDirty = true;
          this.notify();
        }
        toggleFieldExclusion(fieldId, isExcluded) {
          if (isExcluded) this.excludedFields.add(fieldId);
          else this.excludedFields.delete(fieldId);
          this.isDirty = true;
          this.notify();
        }
        setStatus(status) {
          if (this.currentStatus === status) return;
          this.currentStatus = status;
          this.isDirty = true;
          this.notify();
        }
        setSubStatus(subStatus) {
          if (this.currentSubStatus === subStatus) return;
          this.currentSubStatus = subStatus;
          this.isDirty = true;
          this.notify();
        }
        setScreenshotMode(mode) {
          this.screenshotMode = mode;
          this.notify();
        }
        setActiveTasks(tasks) {
          this.activeTasks = tasks;
          this.isDirty = true;
          this.notify();
        }
        toggleFavorite(id) {
          if (this.favorites.has(id)) this.favorites.delete(id);
          else this.favorites.add(id);
          if (typeof localStorage !== "undefined") {
            localStorage.setItem("cw-notes-favorites", JSON.stringify([...this.favorites]));
          }
          this.notify();
        }
        updateField(id, value) {
          if (this.formData[id] === value) return;
          this.formData[id] = value;
          this.isDirty = true;
          this.notify();
        }
        listeners = [];
        subscribe(fn) {
          this.listeners.push(fn);
          return () => this.listeners = this.listeners.filter((l) => l !== fn);
        }
        notify() {
          this.listeners.forEach((fn) => fn(this));
        }
      };
      notesState = new NotesState();
    }
  });

  // src/modules/shared/page-data.js
  var cachedAgentName = "";
  var cachedAgentEmail = "";
  var esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function captureNameWithMagic() {
    if (cachedAgentName && cachedAgentEmail) return cachedAgentName;
    try {
      const btn = document.querySelector("profile-icon material-button") || document.querySelector('a[aria-label*="Account"]');
      if (!btn) return "Agente";
      btn.click();
      await esperar(150);
      let name = "Consultor";
      const elName = document.querySelector("profile-details .name");
      if (elName) {
        const fullName = elName.textContent.trim();
        name = fullName.split(" ")[0];
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      } else {
        const img = document.querySelector("profile-details img");
        if (img && img.src.includes("/photos/")) {
          const ldap = img.src.match(/\/photos\/([^\?]+)/)[1];
          name = ldap.charAt(0).toUpperCase() + ldap.slice(1);
        }
      }
      const elEmail = document.querySelector("profile-details .email");
      if (elEmail) {
        cachedAgentEmail = elEmail.textContent.trim();
        console.log("TechSol: Identidade confirmada ->", cachedAgentEmail);
      }
      btn.click();
      document.body.click();
      cachedAgentName = name;
      return name;
    } catch (e) {
      console.warn("Sherlock falhou:", e);
      return "Consultor";
    }
  }
  function getAgentName() {
    return cachedAgentName || "Consultor";
  }
  function getAgentEmail() {
    return cachedAgentEmail || null;
  }
  function getSmartGreeting(name) {
    const now = /* @__PURE__ */ new Date();
    const h = now.getHours();
    const d = now.getDay();
    let prefix = "Ol\xE1";
    let iconSVG = "";
    if (h >= 5 && h < 12) {
      prefix = "Bom dia";
      iconSVG = `<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>`;
    } else if (h >= 12 && h < 18) {
      prefix = "Boa tarde";
      iconSVG = `<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>`;
    } else {
      prefix = "Boa noite";
      iconSVG = `<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
    let phrases = [];
    if (h >= 0 && h < 5) {
      phrases = ["Guerreiro da madrugada.", "O mundo dorme, voc\xEA avan\xE7a.", "Foco total."];
    } else if (h < 12) {
      if (d === 1) phrases = ["Vamos definir o tom da semana.", "Nova semana, novas conquistas."];
      else if (d === 5) phrases = ["O \xFAltimo g\xE1s antes do descanso.", "Vamos fechar com chave de ouro."];
      else phrases = ["Que seu dia seja produtivo.", "Foco e caf\xE9 para hoje."];
    } else if (h < 18) {
      phrases = ["Mantenha o ritmo.", "Tarde produtiva pela frente.", "Seguimos avan\xE7ando."];
    } else {
      phrases = ["Encerrando o dia com produtividade.", "Excelente dedica\xE7\xE3o."];
    }
    if (d === 0 || d === 6) phrases = ["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.", "Trabalho excepcional."];
    const randomSuffix = phrases[Math.floor(Math.random() * phrases.length)];
    return {
      prefix: `${prefix},`,
      name,
      suffix: randomSuffix,
      icon: iconSVG,
      isFriday: d === 5
    };
  }
  async function captureClientEmail() {
    try {
      const xpath = "//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]";
      const labelNode = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (!labelNode) return null;
      const container = labelNode.parentElement;
      const unmaskBtn = container.querySelector(".unmask-button") || container.querySelector('[aria-label="Click to view"]');
      if (unmaskBtn) {
        unmaskBtn.click();
        await esperar(500);
      }
      const candidates = Array.from(container.querySelectorAll("a, span, div, pii-value"));
      const emailElement = candidates.find((el) => {
        const text = el.innerText.trim();
        return text.includes("@") && !text.includes("Is this:") && text.toLowerCase() !== "email";
      });
      if (emailElement) {
        return emailElement.innerText.trim();
      }
      return null;
    } catch (e) {
      console.warn("Erro ao capturar email do cliente:", e);
      return null;
    }
  }
  function captureInternalEmail() {
    try {
      const inputWrapper = document.querySelector('material-input[debug-id="account-id-input"]');
      if (inputWrapper) {
        const inputElement = inputWrapper.querySelector("input");
        if (inputElement) {
          const val = inputElement.value.trim();
          if (val) {
            return val.includes("@") ? val : `${val}@google.com`;
          }
        }
      }
    } catch (e) {
      console.warn("Erro ao capturar email interno:", e);
    }
    return null;
  }
  function captureCID() {
    try {
      const labels = Array.from(document.querySelectorAll(".data-pair-label, .form-label"));
      const cidLabel = labels.find((el) => el.textContent.includes("Google Ads External Customer ID") || el.textContent.includes("Customer ID"));
      if (cidLabel) {
        const parent = cidLabel.closest("home-data-item") || cidLabel.parentElement;
        if (parent) {
          const content = parent.querySelector(".data-pair-content");
          if (content) {
            return content.textContent.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
          }
        }
      }
      const bodyText = document.body.innerText;
      const cidMatch = bodyText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);
      if (cidMatch) {
        return cidMatch[0].replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      }
    } catch (e) {
      console.warn("Erro ao capturar CID:", e);
    }
    return "N/A";
  }
  function captureAMName() {
    try {
      const labels = Array.from(document.querySelectorAll(".data-pair-label, .form-label"));
      const amLabel = labels.find(
        (el) => el.textContent.includes("Account Manager") || el.textContent.includes("AM Name") || el.textContent.includes("Sales Rep")
      );
      if (amLabel) {
        const parent = amLabel.closest(".data-pair") || amLabel.parentElement;
        const content = parent.querySelector(".data-pair-content") || parent.nextElementSibling;
        if (content) return content.textContent.trim();
      }
    } catch (e) {
      console.warn("Erro ao capturar AM:", e);
    }
    return null;
  }
  function captureTimezone() {
    try {
      const labels = Array.from(document.querySelectorAll(".data-pair-label, .form-label"));
      const tzLabel = labels.find(
        (el) => el.textContent.includes("Time zone") || el.textContent.includes("Timezone") || el.textContent.includes("Customer Time Zone")
      );
      if (tzLabel) {
        const parent = tzLabel.closest(".data-pair") || tzLabel.parentElement;
        const content = parent.querySelector(".data-pair-content") || parent.nextElementSibling;
        if (content) return content.textContent.trim();
      }
    } catch (e) {
      console.warn("Erro ao capturar Timezone:", e);
    }
    return null;
  }
  async function getCaseId() {
    let id = "---";
    try {
      let caseUrl = window.location.href;
      id = caseUrl.split("/").pop();
    } catch (e) {
      console.warn("Falha URL:", e);
    }
    return id;
  }
  function captureSalesProgram() {
    try {
      const labels = Array.from(document.querySelectorAll(".data-pair-label, .form-label"));
      const programLabel = labels.find(
        (el) => el.textContent.toLowerCase().includes("sales program") || el.textContent.toLowerCase().trim() === "program" || el.textContent.toLowerCase().includes("programa")
      );
      if (programLabel) {
        const parent = programLabel.closest(".data-pair") || programLabel.parentElement;
        const valueNode = parent.querySelector('sanitized-content ng-template[debug-id="html-value"]') || parent.querySelector("sanitized-content");
        if (valueNode) {
          return valueNode.textContent.trim();
        }
        const content = parent.querySelector(".data-pair-content") || parent.nextElementSibling;
        if (content) return content.textContent.trim();
      }
    } catch (e) {
      console.warn("Erro ao capturar Sales Program:", e);
    }
    return "";
  }
  function captureLanguage() {
    try {
      const labels = Array.from(document.querySelectorAll(".data-pair-label, .form-label"));
      const langLabel = labels.find(
        (el) => el.textContent.includes("Language") || el.textContent.includes("Idioma")
      );
      if (langLabel) {
        const parent = langLabel.closest(".data-pair") || langLabel.parentElement;
        const content = parent.querySelector(".data-pair-content") || parent.nextElementSibling;
        if (content) return content.textContent.trim();
      }
    } catch (e) {
      console.warn("Erro ao capturar Idioma:", e);
    }
    return "N/A";
  }
  function captureSpeakeasyID() {
    try {
      const labels = Array.from(document.querySelectorAll(".data-pair-label, .form-label"));
      const seLabel = labels.find(
        (el) => el.textContent.includes("Speakeasy ID") || el.textContent.includes("SE ID")
      );
      if (seLabel) {
        const parent = seLabel.closest(".data-pair") || seLabel.parentElement;
        const content = parent.querySelector(".data-pair-content") || parent.nextElementSibling;
        if (content) return content.textContent.trim();
      }
    } catch (e) {
      console.warn("Erro ao capturar SE ID:", e);
    }
    return "N/A";
  }
  async function getPageData() {
    let advertiserName = "Cliente";
    let websiteUrl = "";
    try {
      const nameXpath = "//div[contains(text(), 'Given name')]";
      const nameNode = document.evaluate(nameXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (nameNode && nameNode.nextElementSibling) {
        const rawName = nameNode.nextElementSibling.innerText.trim();
        if (rawName) advertiserName = rawName;
      }
    } catch (e) {
      console.warn("Falha Nome:", e);
    }
    try {
      const urlXpath = "//div[contains(text(), 'Website')]";
      const urlNode = document.evaluate(urlXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (urlNode && urlNode.nextElementSibling) {
        const rawUrl = urlNode.nextElementSibling.innerText.trim();
        if (rawUrl) websiteUrl = rawUrl;
      }
    } catch (e) {
      console.warn("Falha URL:", e);
    }
    const clientEmail = await captureClientEmail();
    const internalEmail = captureInternalEmail();
    const cid = captureCID();
    const amName = captureAMName();
    const timezone = captureTimezone();
    const caseId = await getCaseId();
    const salesProgram = captureSalesProgram();
    const language = captureLanguage();
    const seId = captureSpeakeasyID();
    return {
      // Core fields (Original names)
      advertiserName,
      websiteUrl,
      clientEmail,
      internalEmail,
      cid,
      amName,
      timezone,
      agentName: getAgentName(),
      agentEmail: getAgentEmail(),
      caseId,
      // Aliases for BAU Form compatibility
      advName: advertiserName,
      site: websiteUrl,
      email: clientEmail,
      salesProgram,
      language,
      seId
    };
  }

  // src/modules/shared/sound-manager.js
  var audioCtx = null;
  var noiseBufferCache = null;
  var MASTER_GAIN = 0.3;
  var muted = localStorage.getItem("cw_sounds_muted") === "true";
  function getContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }
  function getNoiseBuffer(ctx) {
    if (noiseBufferCache) return noiseBufferCache;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noiseBufferCache = buffer;
    return buffer;
  }
  var SoundManager = {
    setMuted: (isMuted) => {
      muted = isMuted;
      localStorage.setItem("cw_sounds_muted", isMuted);
    },
    isMuted: () => muted,
    // 1. CLICK (Micro-interação)
    // Ref: Teclado da Apple ou Trackpad tátil.
    // Não é um "bipe", é um estalo seco de alta frequência.
    playClick: () => {
      if (muted) return;
      const ctx = getContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const source = ctx.createBufferSource();
      source.buffer = getNoiseBuffer(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 4e3;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(MASTER_GAIN * 0.8, t);
      gain.gain.exponentialRampToValueAtTime(1e-3, t + 0.015);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start(t);
      source.stop(t + 0.02);
    },
    // 2. HOVER (Feedback de Foco)
    // Ref: Nintendo Switch UI / Linear App.
    // Quase inaudível. Apenas um "sopro" minúsculo.
    playHover: () => {
      if (muted) return;
      const ctx = getContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, t);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(MASTER_GAIN * 0.1, t + 5e-3);
      gain.gain.linearRampToValueAtTime(0, t + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.03);
    },
    // 3. SUCCESS (Confirmação Elegante)
    // Ref: Pagamento Apple Pay.
    // Um acorde "Glassy" mas com ataque suave. Não é festa, é confirmação.
    playSuccess: () => {
      if (muted) return;
      const ctx = getContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const freqs = [1046.5, 1567.9];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = f;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(MASTER_GAIN * 0.6, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(1e-3, t + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.7);
      });
    },
    // 4. SWOOSH / GENIE (Transição de UI)
    // Ref: iOS abrindo pasta.
    // Som de ar, não de laser.
    playGenieOpen: () => {
      if (muted) return;
      const ctx = getContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const source = ctx.createBufferSource();
      source.buffer = getNoiseBuffer(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(100, t);
      filter.frequency.exponentialRampToValueAtTime(800, t + 0.2);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(MASTER_GAIN * 0.5, t + 0.05);
      gain.gain.linearRampToValueAtTime(0, t + 0.25);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start(t);
      source.stop(t + 0.3);
    },
    // 5. ERROR (Resistência Física)
    // Ref: macOS "Funk" sound (mas mais sutil).
    // Um "tump" grave. Não diz "ERRO!", diz "Não dá pra passar aqui".
    playError: () => {
      if (muted) return;
      const ctx = getContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(120, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.1);
      gain.gain.setValueAtTime(MASTER_GAIN, t);
      gain.gain.exponentialRampToValueAtTime(1e-3, t + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    },
    playStartup: () => {
      if (muted) return;
      const ctx = getContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const dumDelay = 0.12;
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      const snapFilter = ctx.createBiquadFilter();
      snapOsc.type = "square";
      snapOsc.frequency.setValueAtTime(400, t);
      snapOsc.frequency.exponentialRampToValueAtTime(50, t + 0.1);
      snapFilter.type = "lowpass";
      snapFilter.frequency.setValueAtTime(800, t);
      snapFilter.frequency.exponentialRampToValueAtTime(100, t + 0.1);
      snapGain.gain.setValueAtTime(MASTER_GAIN * 4, t);
      snapGain.gain.exponentialRampToValueAtTime(1e-3, t + 0.1);
      snapOsc.connect(snapFilter);
      snapFilter.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start(t);
      snapOsc.stop(t + 0.12);
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kickOsc.type = "sine";
      kickOsc.frequency.setValueAtTime(150, t);
      kickOsc.frequency.exponentialRampToValueAtTime(50, t + 0.15);
      kickGain.gain.setValueAtTime(MASTER_GAIN * 1.5, t);
      kickGain.gain.exponentialRampToValueAtTime(1e-3, t + 0.15);
      kickOsc.connect(kickGain);
      kickGain.connect(ctx.destination);
      kickOsc.start(t);
      kickOsc.stop(t + 0.15);
      const freqs = [55, 55.4, 110.5];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.type = "sawtooth";
        osc.frequency.value = f;
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(30, t);
        filter.frequency.linearRampToValueAtTime(900, t + dumDelay + 0.2);
        filter.frequency.exponentialRampToValueAtTime(40, t + 3);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(MASTER_GAIN * 0.6, t + dumDelay + 0.1);
        gain.gain.exponentialRampToValueAtTime(1e-3, t + 3.5);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 3.6);
      });
    },
    playNotification: () => {
      if (muted) return;
      const ctx = getContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const tones = [
        { freq: 880, dur: 1.2, vol: 0.6 },
        // A5 (Corpo do som)
        { freq: 1760, dur: 0.6, vol: 0.3 }
        // A6 (Brilho/Harmônico)
      ];
      tones.forEach((tone) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(tone.freq, t);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(MASTER_GAIN * tone.vol, t + 4e-3);
        gain.gain.exponentialRampToValueAtTime(1e-3, t + tone.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + tone.dur + 0.1);
      });
    },
    // Manter compatibilidade com chamadas antigas
    playSwoosh: () => {
      SoundManager.playGenieOpen();
    },
    playReset: () => {
      SoundManager.playError();
    },
    initGlobalListeners: () => {
      if (window._cwSoundListenersActive) return;
      window._cwSoundListenersActive = true;
      let lastPlayTime = 0;
      const COOLDOWN = 50;
      document.addEventListener("mouseover", (e) => {
        if (!audioCtx) return;
        const target = e.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');
        if (!target) return;
        if (target.contains(e.relatedTarget)) return;
        const now = Date.now();
        if (now - lastPlayTime < COOLDOWN) return;
        SoundManager.playHover();
        lastPlayTime = now;
      }, { passive: true });
    }
  };

  // src/modules/shared/utils.js
  var highestZIndex = 1e4;
  function initGlobalStylesAndFont() {
    if (document.getElementById("google-font-roboto") && document.getElementById("techsol-global-styles")) {
      return;
    }
    const link = document.createElement("link");
    link.id = "google-font-roboto";
    link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "techsol-global-styles";
    style.textContent = `
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
    `;
    document.head.appendChild(style);
  }
  function showToast(message, opts = {}) {
    const toast = document.createElement("div");
    const bg = opts.error ? "rgba(217, 48, 37, 0.90)" : "rgba(32, 33, 36, 0.85)";
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "32px",
      left: "50%",
      transform: "translateX(-50%) scale(0.9)",
      // Começa menor (Pop effect)
      background: bg,
      backdropFilter: "blur(12px)",
      // O toque Apple
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "50px",
      // Pílula completa
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      fontFamily: "'Google Sans', 'Roboto'",
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "20px",
      zIndex: "9999999",
      opacity: "0",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      // Efeito Mola
      pointerEvents: "none"
    });
    toast.textContent = message;
    document.body.appendChild(toast);
    if (opts.error) {
      SoundManager.playError();
    } else {
      SoundManager.playSuccess();
    }
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) scale(1)";
    });
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) scale(0.9) translateY(10px)";
      setTimeout(() => toast.remove(), 400);
    }, opts.duration || 4e3);
  }
  function makeDraggable(element, handle = null) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const dragHandle = handle || element;
    dragHandle.style.cursor = "grab";
    dragHandle.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(e.target.tagName) || e.target.closest(".no-drag")) return;
      e = e || window.event;
      dragHandle.style.cursor = "grabbing";
      element.style.transition = "none";
      const rect = element.getBoundingClientRect();
      element.style.transform = "none";
      element.style.left = rect.left + "px";
      element.style.top = rect.top + "px";
      element.style.margin = "0";
      element.style.bottom = "auto";
      element.style.right = "auto";
      highestZIndex++;
      element.style.zIndex = highestZIndex;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.setAttribute("data-dragging", "true");
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      let nextTop = element.offsetTop - pos2;
      let nextLeft = element.offsetLeft - pos1;
      const padding = 16;
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const elW = element.offsetWidth;
      const elH = element.offsetHeight;
      if (nextLeft < padding) nextLeft = padding;
      else if (nextLeft + elW > winW - padding) nextLeft = winW - elW - padding;
      if (nextTop < padding) nextTop = padding;
      else if (nextTop + elH > winH - padding) nextTop = winH - elH - padding;
      element.style.top = nextTop + "px";
      element.style.left = nextLeft + "px";
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      dragHandle.style.cursor = "grab";
      setTimeout(() => {
        element.style.transition = "all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease";
        element.setAttribute("data-dragging", "false");
        element.setAttribute("data-moved", "true");
      }, 50);
    }
  }
  var stylePopup = {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "400px",
    maxHeight: "85vh",
    zIndex: "99999",
    overflow: "hidden",
    // O SEGREDO APPLE (Glassmorphism + Sombra em Camadas)
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    // Quase sólido, mas permite luz passar (se tiver backdrop-filter)
    backdropFilter: "blur(20px)",
    // O efeito "vidro jateado" do macOS
    webkitBackdropFilter: "blur(20px)",
    borderRadius: "16px",
    // Curva suave (Squircle)
    // A SOMBRA (Depth Stack)
    // 1. 0 0 1px: Uma linha de contorno quase invisível para definição
    // 2. 0 8px 24px: A sombra de elevação principal (suave)
    // 3. 0 20px 60px: A sombra de ambiente (muito difusa, dá a sensação de flutuar alto)
    boxShadow: `
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,
    border: "1px solid rgba(255, 255, 255, 0.6)",
    // Borda interna de luz
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Google Sans', Roboto, sans-serif",
    fontSize: "14px",
    color: "#3c4043",
    // Garante animações de gpu aceleradas
    willChange: "transform, opacity, width, height",
    transformOrigin: "top right"
    // Para o efeito Genie sair do lugar certo
  };
  var styleLabel = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#3c4043",
    marginBottom: "8px",
    marginTop: "16px"
  };
  var styleSelect = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #dadce0",
    backgroundColor: "#f8f9fa",
    // Fundo Input Google
    fontSize: "14px",
    color: "#3c4043",
    boxSizing: "border-box",
    appearance: "none",
    // Seta SVG mais fina e moderna
    backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    backgroundSize: "16px",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    fontFamily: "'Google Sans', 'Roboto'",
    cursor: "pointer"
  };
  var styleCredit = {
    fontSize: "11px",
    color: "#9aa0a6",
    textAlign: "center",
    padding: "12px 16px",
    borderTop: "1px solid rgba(0,0,0,0.05)",
    marginTop: "16px"
  };
  var esperar2 = (ms) => new Promise((r) => setTimeout(r, ms));
  async function humanTypeWriter(element, text) {
    if (!element) return;
    element.style.opacity = "1";
    element.innerHTML = '<span class="cursor">|</span>';
    const cursor = element.querySelector(".cursor");
    await esperar2(200);
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      const span = document.createElement("span");
      span.textContent = char;
      if (cursor && cursor.parentNode === element) cursor.before(span);
      else element.appendChild(span);
      let speed = Math.floor(Math.random() * 60) + 30;
      if (i === 0) speed = 150;
      if (i > text.length - 3) speed = 30;
      await esperar2(speed);
    }
    await esperar2(600);
    if (cursor) cursor.style.display = "none";
  }
  async function playStartupAnimation() {
    if (document.getElementById("techsol-splash-screen")) return;
    if (!document.getElementById("google-splash-style")) {
      const style = document.createElement("style");
      style.id = "google-splash-style";
      style.innerHTML = `
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
        `;
      document.head.appendChild(style);
    }
    const splash = document.createElement("div");
    splash.className = "splash-container";
    splash.innerHTML = `
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
    `;
    document.body.appendChild(splash);
    requestAnimationFrame(() => splash.style.opacity = "1");
    try {
      await esperar2(200);
      const rawName = await captureNameWithMagic();
      const data = getSmartGreeting(rawName);
      const wIcon = splash.querySelector("#w-icon");
      const el1 = splash.querySelector("#p1");
      const el2 = splash.querySelector("#p2");
      const el3 = splash.querySelector("#p3");
      const elSextou = splash.querySelector("#p-sextou");
      if (wIcon) wIcon.innerHTML = data.icon;
      if (el1) el1.textContent = data.prefix;
      if (el3) el3.textContent = data.suffix;
      await esperar2(300);
      const svg = wIcon ? wIcon.querySelector("svg") : null;
      if (svg) {
        svg.style.opacity = "1";
        svg.style.transform = "scale(1)";
      }
      await esperar2(400);
      if (el1) el1.style.opacity = "1";
      SoundManager.playStartup();
      if (el2) await humanTypeWriter(el2, data.name);
      if (el3) {
        el3.style.opacity = "1";
        el3.style.transform = "translateY(0)";
      }
      if (data.isFriday && elSextou) {
        await esperar2(400);
        elSextou.style.display = "block";
        void elSextou.offsetWidth;
        const badge = elSextou.querySelector(".sextou-badge");
        if (badge) {
          badge.style.opacity = "1";
          badge.style.transform = "scale(1)";
        }
      }
      await esperar2(1500);
    } catch (e) {
      console.warn("Splash error, skipping...", e);
    } finally {
      splash.classList.add("splash-exit");
      await esperar2(900);
      if (splash.parentNode) splash.parentNode.removeChild(splash);
    }
  }
  function constrainToViewport(element) {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const padding = 24;
    const maxLeft = winW - rect.width - padding;
    const maxTop = winH - rect.height - padding;
    let currentLeft = parseFloat(element.style.left) || rect.left;
    let currentTop = parseFloat(element.style.top) || rect.top;
    let newLeft = Math.max(padding, Math.min(currentLeft, maxLeft));
    let newTop = Math.max(padding, Math.min(currentTop, maxTop));
    if (newLeft !== currentLeft || newTop !== currentTop) {
      const originalTransition = element.style.transition;
      element.style.transition = "left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)";
      element.style.left = `${newLeft}px`;
      element.style.top = `${newTop}px`;
      setTimeout(() => {
        element.style.transition = originalTransition;
      }, 300);
    }
  }
  var styleResizeHandle = {
    position: "absolute",
    bottom: "1px",
    // Levanta um pixel para não cortar
    right: "1px",
    width: "20px",
    height: "20px",
    cursor: "nwse-resize",
    zIndex: "100000",
    // Z-Index nuclear para garantir que apareça sobre tudo
    opacity: "0.6",
    // Mais visível por padrão
    transition: "opacity 0.2s",
    // Ícone SVG mais escuro (%235f6368) e mais grosso (stroke-width 2.5)
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom right"
  };
  function makeResizable(element, handle) {
    handle.onmousedown = initResize;
    function initResize(e) {
      e.stopPropagation();
      e.preventDefault();
      const originalTransition = element.style.transition;
      element.style.transition = "none";
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = parseFloat(getComputedStyle(element, null).getPropertyValue("width").replace("px", ""));
      const startHeight = parseFloat(getComputedStyle(element, null).getPropertyValue("height").replace("px", ""));
      let currentX = startX;
      let currentY = startY;
      let ticking = false;
      function onMouseMove(e2) {
        currentX = e2.clientX;
        currentY = e2.clientY;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateDimension();
            ticking = false;
          });
          ticking = true;
        }
      }
      function updateDimension() {
        const newWidth = startWidth + (currentX - startX);
        const newHeight = startHeight + (currentY - startY);
        if (newWidth > 360) {
          element.style.width = newWidth + "px";
        }
        if (newHeight > 300) {
          element.style.height = newHeight + "px";
        }
      }
      function stopResize() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopResize);
        setTimeout(() => {
          element.style.transition = originalTransition;
        }, 50);
      }
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", stopResize);
    }
    handle.onmouseenter = () => handle.style.opacity = "1";
    handle.onmouseleave = () => handle.style.opacity = "0.6";
  }
  function parseEmojiCodes(text) {
    if (!text) return "";
    const emojiMap = {
      // --- CUSTOMIZADOS DA EMPRESA (Novos Adicionados) ---
      ":bufo-alarma:": "\u{1F438}\u{1F6A8}",
      // Sapo + Sirene
      ":frog-hype-1:": "\u{1F438}\u{1F973}",
      // Sapo + Festa
      ":coffee-intensifies:": "\u2615\u26A1",
      // Café + Raio (Energia)
      ":frog-eat:": "\u{1F438}\u2615",
      // Sapo bebendo
      // --- Padrões Universais ---
      ":alert-01:": "\u26A0\uFE0F",
      ":alert-circle-i-notice:": "\u2139\uFE0F",
      ":wind-face-animated:": "\u{1F32C}\uFE0F",
      ":smile:": "\u{1F642}",
      ":warning:": "\u26A0\uFE0F",
      ":check:": "\u2705",
      ":white_check_mark:": "\u2705",
      ":x:": "\u274C",
      ":rocket:": "\u{1F680}",
      ":tada:": "\u{1F389}",
      ":party_popper:": "\u{1F389}",
      ":thumbsup:": "\u{1F44D}",
      ":+1:": "\u{1F44D}",
      ":purple_heart:": "\u{1F49C}",
      ":heart:": "\u2764\uFE0F",
      ":fire:": "\u{1F525}",
      ":sunny:": "\u{1F31E}",
      ":star:": "\u2B50",
      ":coffee:": "\u2615"
    };
    return text.replace(/:([a-zA-Z0-9-_+]+):/g, (match) => {
      if (emojiMap[match]) {
        return emojiMap[match];
      }
      return "";
    });
  }
  function createBaseOverlay() {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2147483647,
      opacity: 0,
      transition: "opacity 0.3s ease"
    });
    return overlay;
  }
  function createBaseDialog() {
    const dialog = document.createElement("div");
    Object.assign(dialog.style, {
      background: "rgba(255, 255, 255, 0.95)",
      padding: "24px",
      borderRadius: "20px",
      boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
      width: "340px",
      textAlign: "center",
      transform: "scale(0.85)",
      transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      fontFamily: "'Google Sans', Roboto, sans-serif",
      border: "1px solid rgba(255,255,255,0.4)"
    });
    return dialog;
  }
  function confirmDialog(message, opts = {}) {
    return new Promise((resolve) => {
      const overlay = createBaseOverlay();
      const dialog = createBaseDialog();
      const confirmColor = opts.danger ? "#FF3B30" : "#007AFF";
      const confirmText = opts.confirmText || (opts.danger ? "Excluir" : "Confirmar");
      dialog.innerHTML = `
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${message}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${confirmColor}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${confirmText}</button>
            </div>
        `;
      overlay.appendChild(dialog);
      document.body.appendChild(overlay);
      requestAnimationFrame(() => {
        overlay.style.opacity = 1;
        dialog.style.transform = "scale(1)";
      });
      const close = (result) => {
        overlay.style.opacity = 0;
        dialog.style.transform = "scale(0.9)";
        setTimeout(() => {
          overlay.remove();
          resolve(result);
        }, 300);
      };
      const cancelBtn = dialog.querySelector("#cw-conf-cancel");
      const okBtn = dialog.querySelector("#cw-conf-ok");
      [cancelBtn, okBtn].forEach((b) => b.onmouseenter = () => SoundManager.playHover());
      cancelBtn.onclick = () => {
        SoundManager.playClick();
        close(false);
      };
      okBtn.onclick = () => {
        SoundManager.playClick();
        close(true);
      };
    });
  }
  function promptDialog(message, defaultValue = "") {
    return new Promise((resolve) => {
      const overlay = createBaseOverlay();
      const dialog = createBaseDialog();
      dialog.innerHTML = `
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${message}</div>
            <input type="text" id="cw-prompt-input" value="${defaultValue}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `;
      overlay.appendChild(dialog);
      document.body.appendChild(overlay);
      const input = dialog.querySelector("#cw-prompt-input");
      requestAnimationFrame(() => {
        overlay.style.opacity = 1;
        dialog.style.transform = "scale(1)";
        setTimeout(() => input.focus(), 100);
      });
      const close = (val) => {
        overlay.style.opacity = 0;
        dialog.style.transform = "scale(0.9)";
        setTimeout(() => {
          overlay.remove();
          resolve(val);
        }, 300);
      };
      const cancelBtn = dialog.querySelector("#cw-prompt-cancel");
      const okBtn = dialog.querySelector("#cw-prompt-ok");
      [cancelBtn, okBtn].forEach((b) => b.onmouseenter = () => SoundManager.playHover());
      cancelBtn.onclick = () => {
        SoundManager.playClick();
        close(null);
      };
      okBtn.onclick = () => {
        SoundManager.playClick();
        close(input.value);
      };
      input.onkeydown = (e) => {
        if (e.key === "Enter") {
          okBtn.click();
        }
        if (e.key === "Escape") {
          cancelBtn.click();
        }
      };
    });
  }

  // src/modules/notes/notes-assistant.js
  init_notes_state();

  // src/modules/shared/header-factory.js
  var HEADER_STYLE = {
    height: "56px",
    padding: "0 20px",
    backgroundColor: "rgba(28, 28, 32, 0.85)",
    backdropFilter: "blur(12px)",
    webkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#E8EAED",
    fontFamily: "'Google Sans', Roboto, sans-serif",
    fontWeight: "500",
    letterSpacing: "0.5px",
    cursor: "grab",
    position: "relative",
    borderRadius: "16px 16px 0 0",
    flexShrink: "0",
    userSelect: "none",
    boxSizing: "border-box"
  };
  var BTN_STYLE = {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: "pointer",
    color: "#9AA0A6",
    transition: "all 0.2s ease"
  };
  function createStandardHeader(popupElement, titleText, versionText, helpDescription, animRefs, onCloseCallback) {
    const header = document.createElement("div");
    Object.assign(header.style, HEADER_STYLE);
    makeDraggable(popupElement, header);
    const gradientLine = document.createElement("div");
    Object.assign(gradientLine.style, {
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      height: "2px",
      background: "linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",
      backgroundSize: "300% auto",
      zIndex: "10",
      opacity: "0.8"
    });
    if (!document.getElementById("cw-header-anim")) {
      const style = document.createElement("style");
      style.id = "cw-header-anim";
      style.innerHTML = `
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `;
      document.head.appendChild(style);
    }
    gradientLine.style.animation = "cw-header-flow 6s linear infinite";
    header.appendChild(gradientLine);
    if (animRefs) {
      animRefs.googleLine = gradientLine;
    }
    const leftDiv = document.createElement("div");
    Object.assign(leftDiv.style, { display: "flex", alignItems: "center", gap: "12px" });
    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "20px", height: "20px", pointerEvents: "none" });
    const title = document.createElement("span");
    title.textContent = titleText;
    leftDiv.appendChild(logo);
    leftDiv.appendChild(title);
    const rightDiv = document.createElement("div");
    Object.assign(rightDiv.style, { display: "flex", alignItems: "center", gap: "4px" });
    const helpIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    const closeIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    const helpBtn = document.createElement("div");
    helpBtn.innerHTML = helpIcon;
    Object.assign(helpBtn.style, BTN_STYLE);
    helpBtn.title = "Sobre & Feedback";
    helpBtn.classList.add("no-drag");
    helpBtn.onmouseenter = () => {
      helpBtn.style.background = "rgba(255,255,255,0.1)";
      helpBtn.style.color = "#FFF";
    };
    helpBtn.onmouseleave = () => {
      if (helpBtn.style.color !== "rgb(138, 180, 248)") {
        helpBtn.style.background = "transparent";
        helpBtn.style.color = "#9AA0A6";
      }
    };
    const closeBtn = document.createElement("div");
    closeBtn.innerHTML = closeIcon;
    Object.assign(closeBtn.style, BTN_STYLE);
    closeBtn.title = "Fechar";
    closeBtn.classList.add("no-drag");
    closeBtn.onmouseenter = () => {
      closeBtn.style.background = "rgba(242, 139, 130, 0.2)";
      closeBtn.style.color = "#F28B82";
    };
    closeBtn.onmouseleave = () => {
      closeBtn.style.background = "transparent";
      closeBtn.style.color = "#9AA0A6";
    };
    closeBtn.onmousedown = (e) => e.stopPropagation();
    helpBtn.onmousedown = (e) => e.stopPropagation();
    closeBtn.onclick = onCloseCallback;
    const overlay = createHelpOverlay(popupElement, titleText, versionText, helpDescription);
    helpBtn.onclick = (e) => {
      e.stopPropagation();
      const isVisible = overlay.style.opacity === "1";
      if (isVisible) {
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
        helpBtn.style.color = "#9AA0A6";
        helpBtn.style.background = "transparent";
      } else {
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "auto";
        helpBtn.style.color = "#8AB4F8";
        helpBtn.style.background = "rgba(138, 180, 248, 0.1)";
      }
    };
    rightDiv.appendChild(helpBtn);
    rightDiv.appendChild(closeBtn);
    header.appendChild(leftDiv);
    header.appendChild(rightDiv);
    return header;
  }
  function createHelpOverlay(parentPopup, title, version, description) {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "absolute",
      top: "56px",
      left: "0",
      width: "100%",
      height: "calc(100% - 56px)",
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      // Quase sólido para leitura
      backdropFilter: "blur(8px)",
      zIndex: "50",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "24px",
      boxSizing: "border-box",
      opacity: "0",
      transition: "opacity 0.2s ease",
      pointerEvents: "none",
      borderRadius: "0 0 16px 16px"
    });
    overlay.innerHTML = `
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${title}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Vers\xE3o ${version}</div>

        <div style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${description}
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
    `;
    setTimeout(() => {
      const link = overlay.querySelector("#cw-feedback-link");
      if (link) {
        link.onmouseenter = () => {
          link.style.backgroundColor = "#E8F0FE";
          link.style.transform = "scale(1.02)";
        };
        link.onmouseleave = () => {
          link.style.backgroundColor = "#F8F9FA";
          link.style.transform = "scale(1)";
        };
      }
      const btn = overlay.querySelector("#close-help-internal");
      if (btn) {
        btn.onmouseover = () => btn.style.backgroundColor = "#f8f9fa";
        btn.onmouseout = () => btn.style.backgroundColor = "white";
        btn.onclick = () => {
          overlay.style.opacity = "0";
          overlay.style.pointerEvents = "none";
        };
      }
    }, 0);
    parentPopup.appendChild(overlay);
    return overlay;
  }

  // src/modules/notes/notes-styles.js
  var COLORS = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853",
    primary: "#1a73e8",
    // Azul Interativo Google
    primaryBg: "#e8f0fe",
    // Fundo Azul Claro
    text: "#202124",
    // Preto Google
    textSub: "#5f6368",
    // Cinza Texto
    border: "#dadce0",
    // Borda Padrão
    bgInput: "#f8f9fa",
    // Fundo Input (Cinza Gelo)
    surface: "#ffffff",
    // Branco Puro
    success: "#34A853",
    warning: "#FBBC05",
    error: "#EA4335"
  };
  var RADIUS = {
    small: "8px",
    medium: "12px",
    large: "20px",
    pill: "100px"
  };
  var SHADOW = {
    subtle: "0 1px 3px rgba(0,0,0,0.08)",
    card: "0 4px 12px rgba(0,0,0,0.05)",
    elevated: "0 12px 24px rgba(0,0,0,0.08)",
    apple: "0 20px 40px rgba(0,0,0,0.12)"
  };
  var EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";
  var styleInput = {
    width: "100%",
    padding: "14px 16px",
    // Aumentado para mais respiro
    borderRadius: RADIUS.medium,
    border: `1.5px solid ${COLORS.border}`,
    // Borda levemente mais definida
    backgroundColor: COLORS.bgInput,
    fontSize: "14px",
    color: COLORS.text,
    marginBottom: "16px",
    boxSizing: "border-box",
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    transition: `all 0.3s ${EASE}`,
    outline: "none"
  };
  var styleTextarea = {
    ...styleInput,
    minHeight: "120px",
    // Aumentado
    resize: "vertical",
    lineHeight: "1.6"
  };
  var styleH3 = {
    fontSize: "12px",
    fontWeight: "700",
    color: COLORS.textSub,
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 0 16px 0"
  };
  var styleLabel2 = {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: "10px",
    marginTop: "20px"
  };
  var styleWarningText = {
    fontSize: "12px",
    color: COLORS.warning,
    // Usando amarelo Google
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "500"
  };
  var styleCheckboxInput = {
    width: "18px",
    height: "18px",
    marginRight: "12px",
    cursor: "pointer",
    accentColor: COLORS.primary
  };
  var styleCheckboxLabel = {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    fontSize: "14px",
    fontWeight: "500",
    color: COLORS.text,
    cursor: "pointer",
    padding: "16px 20px",
    // Bem mais espaçoso
    backgroundColor: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: RADIUS.large,
    // Bem arredondado
    transition: `all 0.4s ${EASE}`,
    userSelect: "none",
    boxShadow: SHADOW.subtle
  };
  var styleButtonBase = {
    padding: "14px 28px",
    color: "#fff",
    backgroundColor: COLORS.primary,
    border: "none",
    borderRadius: RADIUS.pill,
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 14px 0 rgba(26,115,232,0.39)",
    transition: `all 0.25s ${EASE}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    outline: "none"
  };
  var styleOptionalBtn = {
    width: "100%",
    padding: "12px",
    background: "#FFFFFF",
    border: `1.5px dashed ${COLORS.primary}`,
    color: COLORS.primary,
    borderRadius: RADIUS.medium,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    marginBottom: "16px",
    transition: `all 0.25s ${EASE}`
  };
  var styleLinkButton = {
    background: "transparent",
    border: `1px solid ${COLORS.border}`,
    borderRadius: RADIUS.pill,
    color: COLORS.textSub,
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    margin: "20px auto",
    transition: `all 0.25s ${EASE}`
  };

  // src/modules/notes/ui/notes-popup.js
  function createNotesPopup(version, onToggleVisibility) {
    const popup = document.createElement("div");
    popup.id = "notes-assistant-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, {
      right: "100px",
      width: "520px",
      // Increased width
      height: "740px",
      // Increased height
      display: "flex",
      flexDirection: "column",
      transition: `width 0.4s ${EASE}, height 0.4s ${EASE}, transform 0.4s ${EASE}, opacity 0.3s ease`,
      borderRadius: RADIUS.large,
      boxShadow: SHADOW.apple,
      border: `1px solid rgba(255, 255, 255, 0.7)`
    });
    const animRefs = { popup, googleLine: null };
    const header = createStandardHeader(popup, "Case Notes", version, "Gera notas padronizadas com excel\xEAncia visual.", animRefs, onToggleVisibility);
    popup.appendChild(header);
    const content = document.createElement("div");
    content.className = "cw-popup-content";
    Object.assign(content.style, {
      padding: "24px",
      // Increased padding
      overflowY: "auto",
      flexGrow: "1",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      // Increased gap
      background: COLORS.surface
    });
    popup.appendChild(content);
    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    Object.assign(credit.style, styleCredit, {
      padding: "16px 24px",
      borderTop: `1px solid ${COLORS.bgInput}`,
      color: COLORS.textSub,
      fontSize: "11px",
      marginTop: "auto",
      fontWeight: "500",
      letterSpacing: "0.5px"
    });
    popup.appendChild(credit);
    const resizeHandle = document.createElement("div");
    Object.assign(resizeHandle.style, styleResizeHandle);
    resizeHandle.className = "no-drag";
    popup.appendChild(resizeHandle);
    makeResizable(popup, resizeHandle);
    injectStyles();
    return { popup, content, header, animRefs, credit };
  }
  function injectStyles() {
    if (document.getElementById("cw-notes-refactor-styles")) return;
    const style = document.createElement("style");
    style.id = "cw-notes-refactor-styles";
    style.innerHTML = `
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${RADIUS.medium} !important;
            border: 1.5px solid ${COLORS.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: all 0.2s ${EASE} !important;
            box-sizing: border-box !important;
            background: ${COLORS.bgInput} !important;
            color: ${COLORS.text} !important;
            outline: none !important;
            box-shadow: ${SHADOW.subtle} !important;
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
            transition: border-color 0.2s ${EASE}, background-color 0.2s ${EASE}, box-shadow 0.2s ${EASE} !important;
        }

        .cw-input:hover, .cw-textarea:hover, #notes-assistant-popup .cw-select:hover {
            border-color: #bdc1c6 !important;
            background-color: #f1f3f4 !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }

        .cw-input:focus, .cw-textarea:focus, #notes-assistant-popup .cw-select:focus {
            border-color: ${COLORS.primary} !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15), 0 2px 8px rgba(0,0,0,0.05) !important;
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${COLORS.textSub};
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
            background: ${COLORS.bgInput};
        }

        .cw-btn-primary {
            background: ${COLORS.primary};
            color: #fff;
            border: none;
            border-radius: ${RADIUS.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${EASE};
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
            color: ${COLORS.textSub};
            border: 1px solid ${COLORS.border};
            border-radius: ${RADIUS.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${EASE};
        }
        .cw-btn-secondary:hover {
            background: ${COLORS.bgInput};
            border-color: #bdc1c6;
            color: ${COLORS.text};
        }
    `;
    document.head.appendChild(style);
  }

  // src/modules/notes/data/notes-data.js
  var translations = {
    "pt": {
      "idioma": "Idioma:",
      "fluxo": "Fluxo:",
      "status_principal": "Status Principal:",
      "select_status": "Selecione",
      "substatus": "Substatus:",
      "select_substatus": "Selecione o Status",
      "cenarios_comuns": "Cen\xE1rios Comuns",
      "selecione_tasks": "Selecione as Tasks",
      "preencha_detalhes": "Preencha os Detalhes",
      "copiar": "Copiar",
      "preencher": "Preencher",
      "limpar": "Limpar",
      "preencher_email_automaticamente": "Preencher email automaticamente?",
      "gostaria_de_adicionar_uma_task": "Gostaria de adicionar uma task",
      "rascunhos_salvos": "Rascunhos Salvos",
      "nenhum_rascunho": "Nenhum rascunho guardado",
      "guardar": "Guardar",
      "acesso_rapido": "Acesso R\xE1pido",
      "buscar_catalogo": "Buscar no cat\xE1logo...",
      "selecione_tarefas": "Selecione tarefas para ver os campos.",
      "utilizou_tag_support": "Utilizou o Tag Support para criar/verificar?",
      "motivo_ts": "Qual foi o Motivo?",
      "lembre_preencher_form": "Lembre-se de preencher o Form!",
      "copiado_sucesso": "Texto copiado com sucesso",
      "inserido_copiado": "Texto inserido e copiado!",
      "campo_nao_encontrado": "Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",
      "ts_disclaimer": "N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",
      "incluir_mesmo_assim": "Incluir mesmo assim",
      "ajuda_scenarios": "Como usar os Cen\xE1rios?",
      "ajuda_scenarios_desc": "Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",
      "ts_output_disclaimer": "Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",
      "caso_portugal": "Caso de Portugal?",
      "consentiu_gravacao": "\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",
      "sim": "Sim",
      "nao": "N\xE3o",
      "pronto_comecar": "Pronto para come\xE7ar?",
      "selecione_status_ajuda": "Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",
      // Labels dos campos (Com Emojis conforme solicitado)
      "speakeasy_id": "\u{1F194} Speakeasy ID:",
      "on_call": "\u{1F4DE} On Call signaled on time?",
      "tasks_solicitadas": "\u{1F3AF} Task(s) solicitada(s):",
      "passos_executados": "\u{1F463} Seguimos com os passos:",
      "resultado": "\u{1F3C6} Resultado:",
      "duvidas": "\u2753 D\xFAvidas do anunciante:",
      "problemas": "\u26A0\uFE0F Problema inicial:",
      "resolucoes": "\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",
      "gtm_ga4_verificado": "\u{1F6E1}\uFE0F GTM/GA4 Verificado:",
      "tasks_implementadas_call": "\u{1F6E0}\uFE0F Tasks implementadas na call:",
      "proximos_passos": "\u{1F680} Pr\xF3ximos passos (Acompanhamento):",
      "consideracoes": "\u{1F4A1} Considera\xE7\xF5es adicionais:",
      "contexto_call": "\u{1F4AC} Contexto/O que foi feito:",
      "impedimento_cliente": "\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",
      "minha_acao": "\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",
      "dia": "\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",
      "screenshots": "\u{1F4F8} Screenshots:",
      "comentarios": "\u{1F4AC} OnCall Comments:",
      "motivo_reagendamento": "\u{1F4AC} OnCall Comments:",
      "data_reagendamento": "\u{1F4C5} Data do reagendamento:",
      "multiple_cids": "\u{1F4C2} Multiple CIDs:",
      "reason_comments": "\u{1F4CC} Reason/Comments:",
      "tags_implemented": "\u{1F6E0}\uFE0F Tag Implemented:",
      "screenshots_list": "\u{1F4F8} Screenshots:",
      "label_substatus": "\u{1F4CB} Substatus:"
    },
    "es": {
      "idioma": "Idioma:",
      "fluxo": "Flujo:",
      "status_principal": "Estado Principal:",
      "select_status": "Seleccione",
      "substatus": "Subestado:",
      "select_substatus": "Seleccione el Estado",
      "cenarios_comuns": "Escenarios Comunes",
      "selecione_tasks": "Seleccionar Tareas",
      "preencha_detalhes": "Rellene los Detalles",
      "copiar": "Copiar",
      "preencher": "Rellenar",
      "limpar": "Limpiar",
      "preencher_email_automaticamente": "\xBFRellenar correo autom\xE1ticamente?",
      "gostaria_de_adicionar_uma_task": "Me gustar\xEDa agregar una tarea",
      "rascunhos_salvos": "Borradores Guardados",
      "nenhum_rascunho": "No hay borradores guardados",
      "guardar": "Guardar",
      "acesso_rapido": "Acceso R\xE1pido",
      "buscar_catalogo": "Buscar en el cat\xE1logo...",
      "selecione_tarefas": "Seleccione tareas para ver los campos.",
      "utilizou_tag_support": "\xBFUtiliz\xF3 Tag Support para crear/verificar?",
      "motivo_ts": "\xBFCu\xE1l fue el motivo?",
      "lembre_preencher_form": "\xA1Recuerde completar el Formulario!",
      "copiado_sucesso": "Texto copiado con \xE9xito",
      "inserido_copiado": "\xA1Texto insertado y copiado!",
      "campo_nao_encontrado": "Campo no encontrado. El texto ya ha sido copiado.",
      "ts_disclaimer": "No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",
      "incluir_mesmo_assim": "Incluir de todos modos",
      "ajuda_scenarios": "\xBFC\xF3mo usar los Escenarios?",
      "ajuda_scenarios_desc": "Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",
      "ts_output_disclaimer": "Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",
      "caso_portugal": "\xBFCaso de Portugal?",
      "consentiu_gravacao": "\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",
      "sim": "S\xED",
      "nao": "No",
      "pronto_comecar": "\xBFListo para empezar?",
      "selecione_status_ajuda": "Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",
      // Labels dos campos
      "speakeasy_id": "\u{1F194} Speakeasy ID:",
      "on_call": "\u{1F4DE} On Call signaled on time?",
      "tasks_solicitadas": "\u{1F3AF} Tarea(s) solicitada(s):",
      "passos_executados": "\u{1F463} Pasos ejecutados:",
      "resultado": "\u{1F3C6} Resultado:",
      "duvidas": "\u2753 Dudas del anunciante:",
      "problemas": "\u26A0\uFE0F Problema inicial:",
      "resolucoes": "\u2705 Resoluciones/Explicaciones:",
      "gtm_ga4_verificado": "\u{1F6E1}\uFE0F GTM/GA4 Verificado:",
      "tasks_implementadas_call": "\u{1F6E0}\uFE0F Tareas implementadas en la call:",
      "proximos_passos": "\u{1F680} Pr\xF3ximos pasos:",
      "consideracoes": "\u{1F4A1} Consideraciones adicionales:",
      "contexto_call": "\u{1F4AC} Contexto/Qu\xE9 se hizo:",
      "impedimento_cliente": "\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",
      "minha_acao": "\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",
      "dia": "\u{1F4C5} D\xEDa de Follow-up (si aplica):",
      "screenshots": "\u{1F4F8} Screenshots:",
      "comentarios": "\u{1F4AC} OnCall Comments:",
      "motivo_reagendamento": "\u{1F4AC} OnCall Comments:",
      "data_reagendamento": "\u{1F4C5} Fecha de reprogramaci\xF3n:",
      "multiple_cids": "\u{1F4C2} Multiple CIDs:",
      "reason_comments": "\u{1F4CC} Reason/Comments:",
      "tags_implemented": "\u{1F6E0}\uFE0F Tag Implemented:",
      "screenshots_list": "\u{1F4F8} Screenshots:",
      "label_substatus": "\u{1F4CB} Substatus:"
    }
  };
  var TASKS_DB = {
    "gtm_installation": {
      name: "GTM Installation",
      popular: true,
      screenshots: { implementation: ["GTM Instalado", "Vinculador de convers\xF5es"], education: [] }
    },
    "ads_conversion_tracking": {
      name: "Ads Conversion Tracking",
      popular: true,
      screenshots: {
        implementation: ["Tag criada", "Teste GTM", "Teste Ads", "Vers\xE3o Publicada", "Status Ads"],
        education: ["Screenshot for TAG assistant of tag working:", "Screenshot of conversion tracking status in Google Ads:"]
      }
    },
    "ads_enhanced_conversions": {
      name: "Ads Enhanced Conversions (ECW4)",
      popular: true,
      screenshots: {
        implementation: ["Termos aceitos no Ads", "Tag implementada", "Teste GTM", "Teste Ads", "Vers\xE3o Publicada", "Painel do Ads (ap\xF3s 7 dias)"],
        education: ["Termos aceitos no Ads", "Tag implementada", "Teste GTM", "Teste Ads", "Vers\xE3o Publicada", "Painel do Ads (ap\xF3s 7 dias)"]
      }
    },
    "ga4_event_tracking": {
      name: "Analytics Event Tracking (GA4)",
      popular: true,
      screenshots: {
        implementation: ["Tag do evento GA4 implementado no GTM", "Teste GTM (tagassistant.google.com)", "Teste GA4 (DebugView - tagassistant.google.com)", "Vers\xE3o publicada no GTM", "(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4", "Evento marcado como principal no GA4", "GA4 e Google Ads vinculados corretamente", "Evento principal GA4 importado no Google Ads (como secund\xE1rio)", "M\xE9tricas app & web ativadas no Google Ads", "(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],
        education: ["Tag do evento GA4 implementado no GTM", "Teste GTM (tagassistant.google.com)", "Teste GA4 (DebugView - tagassistant.google.com)", "Vers\xE3o publicada no GTM", "(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4", "Evento marcado como principal no GA4", "GA4 e Google Ads vinculados corretamente", "Evento principal GA4 importado no Google Ads (como secund\xE1rio)", "M\xE9tricas app & web ativadas no Google Ads", "(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]
      }
    },
    "upd_for_ga4": {
      name: "UPD for GA4 (User-Provided Data)",
      popular: true,
      screenshots: {
        implementation: ["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)", '"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)', "Confirma\xE7\xE3o de coleta de dados (UI)", "Tag do evento GA4 otimizado (UPD) implementado no GTM", "Teste GTM (tagassistant - par\xE2metro 'em' sem erro)", "Teste GA4 (DebugView - tagassistant)", "Vers\xE3o publicada no GTM", "(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],
        education: ["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)", '"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)', "Confirma\xE7\xE3o de coleta de dados (UI)", "Tag do evento GA4 otimizado (UPD) implementado no GTM", "Teste GTM (tagassistant - par\xE2metro 'em' sem erro)", "Teste GA4 (DebugView - tagassistant)", "Vers\xE3o publicada no GTM", "(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]
      }
    },
    "ads_website_call_conversion": {
      name: "Google Ads Website Call Conversion",
      screenshots: {
        implementation: [
          "Tag implementado no GTM",
          "Vers\xE3o publicada no GTM",
          "Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo",
          "Teste usando o #google-wcc-debug",
          "Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"
        ],
        education: []
      }
    },
    "ads_remarketing": {
      name: "Ads Remarketing",
      screenshots: {
        implementation: [
          "Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)",
          "Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads",
          "Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."
        ],
        education: [
          "Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)",
          "Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads",
          "Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."
        ]
      }
    },
    "ads_dynamic_remarketing": {
      name: "Ads Dynamic Remarketing",
      screenshots: {
        implementation: [
          "Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.",
          "Business vertical chosen in Google Ads.",
          "Dynamic Remarketing enabled on Merchant center for retail.",
          "Implementation of Dynamic Remarketing Tags on the website/GTM.",
          "Validating Dynamic Remarketing Tags using Tag Assistant.",
          "Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.",
          "Dynamic Remarketing audiences populating on Google Ads"
        ],
        education: [
          "Validating Dynamic Remarketing Tags using Tag Assistant.",
          "Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.",
          "Dynamic Remarketing audiences populating on Google Ads"
        ]
      }
    },
    "ga4_setup": {
      name: "Analytics Set Up (GA4)",
      screenshots: {
        implementation: [
          "Implementation of GA4 tag on the Website/GTM",
          "Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.",
          "GA4 and Google Ads Linked.",
          "GA4 web metrics enabled"
        ],
        education: [
          "Implementation of GA4 tag on the Website/GTM",
          "Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.",
          "GA4 and Google Ads Linked.",
          "GA4 web metrics enabled"
        ]
      }
    },
    "ga4_standard_remarketing": {
      name: "GA4 Standard Remarketing",
      screenshots: {
        implementation: [
          "Google signals in GA4 enabled.",
          "User data acknowledgement in GA4 checked.",
          "GA4 linked to the correct Google Ads Account",
          "Custom Audience(if requested) set up.",
          "GA4 audience lists imported to Google Ads populating data"
        ],
        education: [
          "Google signals in GA4 enabled.",
          "User data acknowledgement in GA4 checked.",
          "GA4 linked to the correct Google Ads Account",
          "Custom Audience(if requested) set up.",
          "GA4 audience lists imported to Google Ads populating data"
        ]
      }
    },
    "ga4_ecommerce_tracking": {
      name: "Analytics eCommerce Tracking (GA4)",
      screenshots: {
        implementation: [
          "eCommerce Tag set up using gTag or GTM.",
          "Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.",
          "Monetization reports in GA4 recording purchases.",
          "Purchase conversion imported to the right Google Ads account.",
          "Ensuring GA4 web metrics are enabled."
        ],
        education: [
          "eCommerce Tag set up using gTag or GTM.",
          "Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.",
          "Monetization reports in GA4 recording purchases.",
          "Purchase conversion imported to the right Google Ads account.",
          "Ensuring GA4 web metrics are enabled."
        ]
      }
    },
    "ga4_cross_domain_tracking": {
      name: "Analytics Cross-domain Tracking (GA4)",
      screenshots: {
        implementation: [
          "Tag Assistant to reflect all the domains are tagged with the same GA4.",
          "Domains added for cross-domain configuration in GA4 UI.",
          "Adding domains into Unwanted Referrals.",
          "Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.",
          "Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."
        ],
        education: [
          "Tag Assistant to reflect all the domains are tagged with the same GA4.",
          "Domains added for cross-domain configuration in GA4 UI.",
          "Adding domains into Unwanted Referrals.",
          "Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.",
          "Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."
        ]
      }
    },
    "fix_sitewide_tagging": {
      name: "FIX SITEWIDE TAGGING (OGT & CT)",
      screenshots: {
        implementation: [
          "1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas",
          "2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",
          '3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',
          "4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?",
          "5. O gclid foi passado para a p\xE1gina de convers\xE3o?"
        ],
        education: [
          "1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas",
          "2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",
          '3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',
          "4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?",
          "5. O gclid foi passado para a p\xE1gina de convers\xE3o?"
        ]
      }
    }
  };
  var SUBSTATUS_TEMPLATES = {
    // --- AS (Assigned) ---
    "AS_Reschedule_1": {
      status: "AS",
      name: "AS - Reschedule 1",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "MOTIVO_REAGENDAMENTO", "DATA_REAGENDAMENTO", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"],
      fieldPrefixes: {
        "REASON_COMMENTS": "Caso Reagendado."
      }
    },
    "AS_Acceptable_Reschedule": {
      status: "AS",
      name: "AS - Acceptable Reschedule",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "MOTIVO_REAGENDAMENTO", "DATA_REAGENDAMENTO", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"],
      fieldPrefixes: {
        "REASON_COMMENTS": "Reagendamento aceit\xE1vel."
      }
    },
    // --- NI (Need Info) ---
    "NI_Awaiting_Inputs": {
      status: "NI",
      name: "NI - Awaiting Inputs",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "CONTEXTO_CALL", "TASKS_SOLICITADAS", "IMPEDIMENTO_CLIENTE", "MINHA_ACAO", "CONSIDERACOES", "DIA", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"]
    },
    "NI_In_Consult": {
      status: "NI",
      name: "NI - In Consult",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "CONTEXTO_CALL", "TASKS_SOLICITADAS", "IMPEDIMENTO_CLIENTE", "MINHA_ACAO", "CONSIDERACOES", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"]
    },
    "NI_Awaiting_Validation": {
      status: "NI",
      name: "NI - Awaiting Validation",
      requiresTasks: true,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "TASKS_SOLICITADAS", "TASKS_IMPLEMENTADAS_CALL", "PASSOS_EXECUTADOS", "PROXIMOS_PASSOS", "CONSIDERACOES", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"],
      fieldPrefixes: {
        "REASON_COMMENTS": "Aguardando Valida\xE7\xF5es no Google Ads."
      }
    },
    "NI_Attempted_Contact": {
      status: "NI",
      name: "NI - Attempted Contact",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "CONTEXTO_CALL", "TASKS_SOLICITADAS", "IMPEDIMENTO_CLIENTE", "MINHA_ACAO", "CONSIDERACOES", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"]
    },
    // --- IN (Inactive) ---
    "IN_Infeasible": {
      status: "IN",
      name: "IN - Infeasible",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "COMENTARIOS", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"]
    },
    "IN_Not_Reachable": {
      status: "IN",
      name: "IN - Not Reachable",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "COMENTARIOS", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"]
    },
    "IN_Not_Interested": {
      status: "IN",
      name: "IN - Not Interested",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "COMENTARIOS", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"]
    },
    "IN_Not_Ready": {
      status: "IN",
      name: "IN - Not Ready",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "COMENTARIOS", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"]
    },
    "IN_Out_of_Scope_Rerouted": {
      status: "IN",
      name: "IN - Out of Scope - Rerouted to Internal Team",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "COMENTARIOS", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"]
    },
    "IN_Out_of_Scope_Unable_to_Transfer": {
      status: "IN",
      name: "IN - Out of Scope - Unable to Transfer",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "COMENTARIOS", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"]
    },
    "IN_Out_of_Scope_Email_to_Seller": {
      status: "IN",
      name: "IN - Out of Scope - Email to Seller",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "COMENTARIOS", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"]
    },
    "IN_Troubleshooting_Transferred": {
      status: "IN",
      name: "IN - Troubleshooting [Transferred]",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "COMENTARIOS", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"]
    },
    // --- SO (Solution Offered) ---
    "SO_Implementation_Only": {
      status: "SO",
      name: "SO - Implementation Only",
      requiresTasks: true,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "TASKS_SOLICITADAS", "TASKS_IMPLEMENTADAS_CALL", "PASSOS_EXECUTADOS", "RESULTADO", "PROXIMOS_PASSOS", "CONSIDERACOES", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"],
      fieldPrefixes: {
        "REASON_COMMENTS": "Task implementada com sucesso."
      }
    },
    "SO_Education_Only": {
      status: "SO",
      name: "SO - Education Only",
      requiresTasks: true,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "DUVIDAS", "RESOLUCOES", "PROXIMOS_PASSOS", "CONSIDERACOES", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"],
      fieldPrefixes: {
        "REASON_COMMENTS": "Consultoria utilizada para tirar d\xFAvidas do anunciante."
      }
    },
    "SO_Troubleshooting_Only": {
      status: "SO",
      name: "SO - Troubleshooting Only",
      requiresTasks: true,
      templateFields: ["SPEAKEASY_ID", "ON_CALL", "label_substatus", "REASON_COMMENTS", "PROBLEMAS", "RESOLUCOES", "PROXIMOS_PASSOS", "CONSIDERACOES", "GTM_GA4_VERIFICADO", "TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "MULTIPLE_CIDS"],
      fieldPrefixes: {
        "REASON_COMMENTS": "Consultoria utilizada para testar e solucinar problemas da convers\xE3o."
      }
    },
    "DC_Other": {
      status: "DC",
      name: "DC - Other",
      requiresTasks: false,
      templateFields: ["SPEAKEASY_ID", "label_substatus", "REASON_COMMENTS", "COMENTARIOS"],
      customFooter: "Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"
    }
  };
  var SUBSTATUS_SHORTCODES = {
    // AS
    "AS_Reschedule_1": "ts as resched1",
    "AS_Acceptable_Reschedule": "ts as reschedok",
    // NI
    "NI_Awaiting_Inputs": "ts ni ai",
    "NI_In_Consult": "ts ni ic",
    "NI_Awaiting_Validation": "ts ni av",
    "NI_Attempted_Contact": "ts ni ac",
    // IN
    "IN_Infeasible": "ts in inf",
    "IN_Not_Reachable": "ts in nrch",
    "IN_Not_Interested": "ts in ni",
    "IN_Not_Ready": "ts in nrdy",
    "IN_Out_of_Scope_Rerouted": "ts in oost",
    "IN_Out_of_Scope_Unable_to_Transfer": "ts in oosu",
    "IN_Out_of_Scope_Email_to_Seller": "ts in oos seller",
    "IN_Troubleshooting_Transferred": null,
    // SO
    "SO_Implementation_Only": "ts so verif",
    "SO_Verified_No_Recent_Conversion": "ts so verif nrc",
    "SO_Unverified": "ts so unv",
    "SO_Education_Only": "ts so Edu",
    "SO_Troubleshooting_Only": "ts so trbl",
    "DC_Other": null
  };
  var textareaListFields = [
    "TASKS_SOLICITADAS",
    "PASSOS_EXECUTADOS",
    "RESULTADO",
    "DUVIDAS",
    "PROBLEMAS",
    "RESOLUCOES",
    "TASKS_IMPLEMENTADAS_CALL",
    "PROXIMOS_PASSOS",
    "CONTEXTO_CALL",
    "IMPEDIMENTO_CLIENTE",
    "MINHA_ACAO",
    "SCREENSHOTS",
    "MOTIVO_REAGENDAMENTO"
  ];
  var textareaParagraphFields = ["CONSIDERACOES", "COMENTARIOS"];
  var scenarioSnippets = {
    // --- Cenários de NI (Exclusivos) ---
    "quickfill-ni-inicio-manual": {
      type: "all",
      "field-REASON_COMMENTS": "Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"
    },
    "quickfill-ni-cms-access": {
      type: "all",
      "field-REASON_COMMENTS": "Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)",
      "field-TASKS_SOLICITADAS": "\u2022 Instala\xE7\xE3o do GTM\n\u2022 Configura\xE7\xE3o de Convers\xF5es",
      "field-CONTEXTO_CALL": "\u2022 Percebi que o(a) anunciante n\xE3o tinha GTM Instalado.\n\u2022 Seguimos com a cria\xE7\xE3o de conta no GTM.\n\u2022 Entretanto, a conta de acesso ao painel do site (ex: WordPress) n\xE3o tinha permiss\xE3o para instalar plugins ou editar o c\xF3digo.",
      "field-IMPEDIMENTO_CLIENTE": "\u2022 Anunciante precisa conseguir acesso de administrador ao painel do site.\n\u2022 OU\n\u2022 Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.",
      "field-MINHA_ACAO": "\u2022 Coloco o caso em 2/6.\n\u2022 Assim que o anunciante tiver o acesso ou a instala\xE7\xE3o for feita, abrirei um caso em BAU para dar continuidade.",
      "field-SCREENSHOTS": "\u2022 Print do painel do CMS mostrando a falta de permiss\xE3o (opcional)."
    },
    // --- NOVOS CENÁRIOS NI (AWAITING VALIDATION) ---
    "quickfill-ni-awaiting-ecw4": {
      type: "all",
      "field-REASON_COMMENTS": "Aguardando valida\xE7\xE3o de dados (ECW4 - 7 Dias)",
      "field-TASKS_SOLICITADAS": "\u2022 Implementa\xE7\xE3o de Convers\xF5es Otimizadas (ECW4)",
      "field-CONTEXTO_CALL": "\u2022 Criamos a convers\xE3o no Google Ads.\n\u2022 Configuramos o disparo das tags via GTM.\n\u2022 Adicionamos a tag de UPD (User Provided Data).\n\u2022 Testamos juntos e validamos o bom funcionamento.",
      "field-MINHA_ACAO": "\u2022 Coloco o caso em status de Awaiting Validation para acompanhamento de 7 dias.",
      linkedTask: "ads_enhanced_conversions"
    },
    "quickfill-ni-awaiting-ga4": {
      type: "all",
      "field-REASON_COMMENTS": "Aguardando valida\xE7\xE3o de dados (GA4 Event - 48h)",
      "field-TASKS_SOLICITADAS": "\u2022 Implementa\xE7\xE3o de Eventos GA4",
      "field-CONTEXTO_CALL": "\u2022 Criamos o evento no GA4.\n\u2022 Configuramos o disparo das tags via GTM.\n\u2022 Testamos juntos e validamos o bom funcionamento.",
      "field-MINHA_ACAO": "\u2022 Coloco o caso em status de Awaiting Validation para acompanhamento de 48h.",
      linkedTask: "ga4_event_tracking"
    },
    // -----------------------------------------------
    "quickfill-ni-followup-bau": {
      type: "bau",
      "field-REASON_COMMENTS": "Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up BAU 2/6)",
      "field-SPEAKEASY_ID": "N/A",
      "field-ON_CALL": "N/A",
      "field-CONTEXTO_CALL": "\u2022 No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas n\xE3o obtive resposta. Envio na sequ\xEAncia o email referente ao dia respectivo.",
      "field-TASKS_SOLICITADAS": "N/A",
      "field-IMPEDIMENTO_CLIENTE": "N/A",
      "field-MINHA_ACAO": "N/A",
      "field-GTM_GA4_VERIFICADO": "N/A",
      "field-SCREENSHOTS": "\u2022 Tentativa 1 -\n\u2022 Tentativa 2 -"
    },
    "quickfill-ni-followup-lm": {
      type: "lm",
      "field-REASON_COMMENTS": "Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up LM 2/6)",
      "field-SPEAKEASY_ID": "N/A",
      "field-ON_CALL": "N/A",
      "field-CONTEXTO_CALL": "\u2022 No dia {DIA} do 2/6 enviei e-mail de follow-up (caso LM, sem tentativas de liga\xE7\xE3o), mas n\xE3o obtive resposta.",
      "field-TASKS_SOLICITADAS": "N/A",
      "field-IMPEDIMENTO_CLIENTE": "N/A",
      "field-MINHA_ACAO": "N/A",
      "field-GTM_GA4_VERIFICADO": "N/A",
      "field-SCREENSHOTS": "\u2022 E-mail de follow-up enviado (LM) -"
    },
    // --- Cenários de SO (Combináveis) ---
    "quickfill-gtm-install": {
      type: "all",
      "field-REASON_COMMENTS": "Instala\xE7\xE3o do GTM finalizada.",
      "field-TASKS_SOLICITADAS": "\u2022 Instala\xE7\xE3o do GTM",
      "field-PASSOS_EXECUTADOS": "\u2022 Criamos a conta dentro do GTM\n\u2022 Instalamos dentro do CMS/Hospedagem.\n\u2022 Criamos o Vinculador de Convers\xF5es.",
      "field-RESULTADO": "\u2022 Validei a instala\xE7\xE3o.",
      linkedTask: "gtm_installation"
    },
    "quickfill-whatsapp": {
      type: "all",
      "field-REASON_COMMENTS": "Instala\xE7\xE3o do Ads Conversion tracking para Whatsapp finalizada.",
      "field-TASKS_SOLICITADAS": "\u2022 Cria\xE7\xE3o de convers\xE3o para WHATSAPP",
      "field-PASSOS_EXECUTADOS": "\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.\n\u2022 Criamos a Tag no GTM para os bot\xF5es de WhatsApp.\n\u2022 Realizamos os testes e validamos o funcionamento.",
      "field-RESULTADO": "\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",
      linkedTask: "ads_conversion_tracking"
    },
    "quickfill-form": {
      type: "all",
      "field-REASON_COMMENTS": "Instala\xE7\xE3o do Ads Conversion tracking para Form finalizada.",
      "field-TASKS_SOLICITADAS": "\u2022 Cria\xE7\xE3o de convers\xE3o para FORMUL\xC1RIO (padr\xE3o, n\xE3o-otimizada).",
      "field-PASSOS_EXECUTADOS": "\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.\n\u2022 Criamos a Tag no GTM.\n\u2022 Realizamos os testes e validamos o funcionamento.",
      "field-RESULTADO": "\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",
      linkedTask: "ads_conversion_tracking"
    },
    "quickfill-ecw4-close": {
      type: "all",
      "field-REASON_COMMENTS": "Finaliza\xE7\xE3o do acompanhamento de EC.",
      "field-TASKS_SOLICITADAS": "\u2022 Acompanhamento da convers\xE3o otimizada (ECW4).",
      "field-PASSOS_EXECUTADOS": "\u2022 Ap\xF3s o per\xEDodo de acompanhamento, verifiquei o painel do Ads.\n\u2022 A convers\xE3o est\xE1 sendo registrada corretamente.",
      "field-RESULTADO": "\u2022 Valido o bom funcionamento da convers\xE3o otimizada.\n\u2022 Assim, fecho o caso.",
      linkedTask: "ads_enhanced_conversions"
    },
    "quickfill-ga4-event-close": {
      type: "all",
      "field-REASON_COMMENTS": "Finaliza\xE7\xE3o do Acompanhamento de GA4.",
      "field-TASKS_SOLICITADAS": "\u2022 Acompanhamento de Eventos GA4 ap\xF3s 48h.",
      "field-PASSOS_EXECUTADOS": "\u2022 Ap\xF3s o per\xEDodo de 48h de acompanhamento, verifiquei o painel.\n\u2022 O evento est\xE1 sendo registrado corretamente.",
      "field-RESULTADO": "\u2022 Valido o bom funcionamento do rastreamento de eventos.\n\u2022 Assim, fecho o caso.",
      linkedTask: "ga4_event_tracking"
    },
    // --- Cenários de AS (Combináveis) ---
    "quickfill-as-no-show": {
      type: "all",
      "field-MOTIVO_REAGENDAMENTO": "\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o compareceu na meet, por\xE9m respondeu o e-mail pedindo o reagendamento"
    },
    "quickfill-as-insufficient-time": {
      type: "all",
      "field-MOTIVO_REAGENDAMENTO": "\u2022 Precisamos reagendar o caso, j\xE1 que o tempo foi insuficiente para terminar as Tasks\n\u2022 Implementamos [descrever o que foi feito]"
    },
    "quickfill-as-no-access": {
      type: "all",
      "field-MOTIVO_REAGENDAMENTO": "\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o tinha os acessos necess\xE1rios para podermos implementar as tasks"
    },
    // --- Cenários de IN (Exclusivos - Rádio) ---
    "quickfill-in-nrp-bau": {
      type: "bau",
      "field-REASON_COMMENTS": "NRP (BAU - 3 tentativas)",
      "field-COMENTARIOS": '\u2022 Duas liga\xE7\xF5es seguidas, e e-mail "Antes dos 10 minutos" e uma terceira e ultima tentativa de liga\xE7\xE3o.\n\u2022 N\xE3o houve resposta \xE0s tentativas de liga\xE7\xE3o ou e-mail, por isso o caso ser\xE1 inativado.',
      "field-SCREENSHOTS": "\u2022 Tentativa 1 -\n\u2022 Tentativa 2 -\n\u2022 Tentativa 3 -",
      "field-GTM_GA4_VERIFICADO": "N/A"
    },
    "quickfill-in-no-show-bau": {
      type: "bau",
      "field-REASON_COMMENTS": "Sem resposta ao 2 Day Rule.",
      "field-ON_CALL": "N/A",
      "field-COMENTARIOS": "\u2022 O caso foi gerado e entrei na chamada no hor\xE1rio agendado.\n\u2022 O anunciante n\xE3o compareceu \xE0 reuni\xE3o.\n\u2022 Segui o protocolo de espera (BAU): realizei duas tentativas de liga\xE7\xE3o, sem sucesso.\n\u2022 Nenhuma das liga\xE7\xF5es foi atendida (ex: Caixa Postal).\n\u2022 Caso inativado ap\xF3s 2 Day Rule.",
      "field-SCREENSHOTS": "\u2022 Tentativa 1 - \n\u2022 Tentativa 2  - \n\u2022 Tentativa 3 - ",
      "field-GTM_GA4_VERIFICADO": "N/A"
    },
    "quickfill-in-2-6-final": {
      type: "all",
      "field-REASON_COMMENTS": "Finaliza\xE7\xE3o (2/6)",
      "field-SPEAKEASY_ID": "-",
      "field-ON_CALL": "-",
      "field-COMENTARIOS": "\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.",
      "field-SCREENSHOTS": "\u2022 N/A",
      "field-GTM_GA4_VERIFICADO": "N/A"
    },
    "quickfill-in-manual": {
      type: "all",
      "field-REASON_COMMENTS": "Outro (Manual)",
      "field-GTM_GA4_VERIFICADO": "N/A"
    },
    "quickfill-ni-attempted-2day": {
      type: "bau",
      "field-REASON_COMMENTS": "Attempted Contact (In\xEDcio 2 Day Rule)",
      "field-CONTEXTO_CALL": "\u2022 Fiz a primeira tentativa de liga\xE7\xE3o, sem sucesso.\n\u2022 Enviei uma message no chat para o AM.\n\u2022 Aguardei 5 minutos e fiz a segunda tentativa de liga\xE7\xE3o, novamente sem sucesso.\n\u2022 Aguardei mais 5 minutos e agora farei o acompanhamento 2 Day Rule.",
      "field-SCREENSHOTS": "\u2022 MSG AM -\n\u2022 Tentativa 1 -\n\u2022 Tentativa 2 -"
    },
    // --- Cenários de IN (Exclusivos - Rádio) ---
    "quickfill-dc-lm-no-access": {
      type: "all",
      "field-REASON_COMMENTS": "Discard - Falta de acessos (Reagendamento solicitado)",
      "field-COMENTARIOS": "N\xE3o conseguimos implementar nada durante a consultoria, j\xE1 que o adv n\xE3o tinha os acessos.\n\nIrei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo."
    },
    "quickfill-dc-lm-incomplete": {
      type: "all",
      "field-REASON_COMMENTS": "Discard - Nada foi implementado durante a consultoria",
      "field-COMENTARIOS": "N\xE3o conseguimos implementar nada durante a consultoria, pois n\xE3o houve tempo o suficiente para terminar a task relacionada.\n\nIrei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo."
    },
    "quickfill-dc-lm-no-show": {
      type: "all",
      "field-REASON_COMMENTS": "Discard - Sem contato com o Adv",
      "field-COMENTARIOS": "O adv n\xE3o compareceu na consultoria. Fiz as tentativas de liga\xE7\xE3o, mas n\xE3o obtive retorno.\n\nIrei solicitar descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo."
    }
  };

  // src/modules/notes/automation/case-log-scraper.js
  var esperar3 = (ms) => new Promise((r) => setTimeout(r, ms));
  function simularClique(el) {
    if (!el) return;
    ["mousedown", "mouseup", "click"].forEach(
      (evt) => el.dispatchEvent(new MouseEvent(evt, { bubbles: true, cancelable: true, view: window }))
    );
  }
  var styleId = "cw-automation-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
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
    `;
    document.head.appendChild(style);
  }
  function toggleLoadingOverlay(show) {
    let overlay = document.getElementById("cw-loading-overlay");
    if (show) {
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "cw-loading-overlay";
        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.style.opacity = "1");
      } else {
        overlay.style.opacity = "1";
      }
    } else {
      if (overlay) {
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 300);
      }
    }
  }
  async function fetchAndInsertSpeakeasyId(targetInputId) {
    console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");
    const inputWidget = document.getElementById(targetInputId);
    let originalPlaceholder = "";
    toggleLoadingOverlay(true);
    if (inputWidget) {
      originalPlaceholder = inputWidget.placeholder;
      inputWidget.placeholder = "Buscando ID...";
      inputWidget.value = "";
      inputWidget.classList.add("cw-scanning-active");
    }
    try {
      const btnCaseLog = document.querySelector('material-button[debug-id="dock-item-case-log"]');
      if (btnCaseLog && !btnCaseLog.classList.contains("selected")) {
        simularClique(btnCaseLog);
        await esperar3(1200);
      }
      const btnFiltro = document.querySelector("search-filter dropdown-button .button");
      if (btnFiltro) {
        const texto = btnFiltro.innerText || "";
        if (!texto.includes("All")) {
          simularClique(btnFiltro);
          await esperar3(600);
          const checkAll = document.querySelector('material-checkbox[debug-id="check-all-box"]');
          if (checkAll && checkAll.getAttribute("aria-checked") !== "true") {
            simularClique(checkAll);
            await esperar3(300);
          }
          const btnApply = document.querySelector('material-button[debug-id="apply-filter"]');
          if (btnApply) {
            simularClique(btnApply);
            await esperar3(1500);
          }
        }
      }
      const scrollContainer = document.querySelector(".scroll-container") || document.querySelector(".case-log-container");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
        await esperar3(500);
      }
      const headers = Array.from(document.querySelectorAll(".message-header"));
      for (let i = headers.length - 1; i >= 0; i--) {
        const header = headers[i];
        const icon = header.querySelector("i.material-icons-extended");
        const isPhoneIcon = icon && icon.innerText.trim() === "phone_in_talk";
        const textContent = header.innerText || "";
        const isCallText = textContent.includes("Agent joined") || textContent.includes("outbound-call") || textContent.includes("Speakeasy");
        if (isPhoneIcon || isCallText) {
          const isExpanded = header.getAttribute("aria-expanded") === "true";
          if (!isExpanded) {
            console.log("\u{1F4C2} Expandindo mensagem de chamada...", header);
            if (inputWidget) inputWidget.placeholder = "Lendo mensagem...";
            simularClique(header);
            await esperar3(1e3);
          }
          break;
        }
      }
      const seletor = ".preview, .speakeasy-agent-activity, .message-body, .content-container";
      const elementos = Array.from(document.querySelectorAll(seletor));
      const regexID = /Speakeasy.*?(P\d{15,25})/i;
      let idEncontrado = null;
      for (let i = elementos.length - 1; i >= 0; i--) {
        const el = elementos[i];
        if (el.offsetParent === null) continue;
        const match = (el.innerText || "").match(regexID);
        if (match && match[1]) {
          idEncontrado = match[1];
          break;
        }
      }
      if (inputWidget) {
        if (idEncontrado) {
          try {
            await navigator.clipboard.writeText(idEncontrado);
          } catch (e) {
          }
          inputWidget.value = idEncontrado;
          inputWidget.dispatchEvent(new Event("input", { bubbles: true }));
          inputWidget.dispatchEvent(new Event("change", { bubbles: true }));
          SoundManager.playSuccess();
          showToast(`ID Localizado: ${idEncontrado}`);
          inputWidget.style.transition = "background-color 0.3s";
          inputWidget.style.backgroundColor = "rgba(15, 157, 88, 0.1)";
          setTimeout(() => inputWidget.style.backgroundColor = "", 1e3);
        } else {
          SoundManager.playError();
          showToast("Nenhum ID encontrado.", { error: true });
          inputWidget.placeholder = "N\xE3o encontrado";
          inputWidget.style.transition = "background-color 0.3s";
          inputWidget.style.backgroundColor = "rgba(234, 67, 53, 0.1)";
          setTimeout(() => inputWidget.style.backgroundColor = "", 1e3);
        }
      }
    } catch (error) {
      console.error("Erro na automa\xE7\xE3o:", error);
      showToast("Erro ao processar.", { error: true });
    } finally {
      if (inputWidget) {
        inputWidget.classList.remove("cw-scanning-active");
        if (!inputWidget.value) inputWidget.placeholder = originalPlaceholder;
      }
      toggleLoadingOverlay(false);
    }
  }

  // src/modules/notes/components/bullet-editor.js
  function enableAutoBullet(textarea) {
    if (textarea.dataset.bulletEnabled === "true") return;
    textarea.dataset.bulletEnabled = "true";
    if (textarea.value.trim() === "" || textarea.value.trim() === "\u2022") textarea.value = "\u2022 ";
    textarea.addEventListener("keydown", function(e) {
      const start = this.selectionStart;
      const end = this.selectionEnd;
      const value = this.value;
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const currentLine = value.substring(lineStart, start);
      if (e.key === "Enter") {
        e.preventDefault();
        const indent = currentLine.match(/^(\s*•\s*)/)?.[0] || "\u2022 ";
        if (currentLine.trim() === "\u2022") {
          this.value = value.substring(0, lineStart) + "\n" + value.substring(end);
          this.selectionStart = this.selectionEnd = lineStart + 1;
          return;
        }
        const insertText = "\n" + indent;
        this.value = value.substring(0, start) + insertText + value.substring(end);
        this.selectionStart = this.selectionEnd = start + insertText.length;
      } else if (e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) {
          if (currentLine.startsWith("  ")) {
            this.value = value.substring(0, lineStart) + currentLine.substring(2) + value.substring(start);
            this.selectionStart = this.selectionEnd = start - 2;
          }
        } else {
          const insertText = "  ";
          this.value = value.substring(0, lineStart) + insertText + currentLine + value.substring(start);
          this.selectionStart = this.selectionEnd = start + 2;
        }
      } else if (e.key === "Backspace") {
        if (start === end && start > 0) {
          const textBefore = value.substring(0, start);
          if (textBefore.endsWith("\u2022 ")) {
            e.preventDefault();
            this.value = textBefore.substring(0, start - 2) + value.substring(end);
            this.selectionStart = this.selectionEnd = start - 2;
          } else if (textBefore.endsWith("  ") && currentLine.trim().startsWith("\u2022")) {
            e.preventDefault();
            this.value = textBefore.substring(0, start - 2) + value.substring(end);
            this.selectionStart = this.selectionEnd = start - 2;
          }
        }
      }
    });
  }

  // src/modules/notes/core/form-builder.js
  function buildDynamicForm(subStatusKey, container, state) {
    container.innerHTML = "";
    const templateData = SUBSTATUS_TEMPLATES[subStatusKey];
    if (!templateData) return;
    state.activeFields.forEach((fieldName) => {
      if (["TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "CONSENTIU_GRAVACAO", "CASO_PORTUGAL", "label_substatus"].includes(fieldName)) return;
      const fieldId = `field-${fieldName}`;
      const label = document.createElement("label");
      const t = (key) => translations[state.currentLang]?.[key] || translations["pt"]?.[key] || key;
      label.textContent = t(fieldName.toLowerCase()) !== fieldName.toLowerCase() ? t(fieldName.toLowerCase()) : fieldName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) + ":";
      Object.assign(label.style, { display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px", fontWeight: "700", color: COLORS.textSub, marginBottom: "8px", marginTop: "24px", textTransform: "uppercase", letterSpacing: "0.5px" });
      const labelText = document.createElement("span");
      labelText.textContent = label.textContent;
      label.innerHTML = "";
      label.appendChild(labelText);
      if (fieldName === "SPEAKEASY_ID") {
        const btnSearch = document.createElement("button");
        btnSearch.innerHTML = `\u2728 Auto Busca`;
        btnSearch.style.cssText = `font-size: 11px; font-weight: 700; color: ${COLORS.primary}; background-color: ${COLORS.primaryBg}; border: none; border-radius: ${RADIUS.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${EASE};`;
        btnSearch.onmouseenter = () => btnSearch.style.backgroundColor = "#d2e3fc";
        btnSearch.onmouseleave = () => btnSearch.style.backgroundColor = COLORS.primaryBg;
        btnSearch.onclick = (e) => {
          e.preventDefault();
          fetchAndInsertSpeakeasyId(fieldId);
        };
        label.appendChild(btnSearch);
      }
      const btnDelete = document.createElement("button");
      btnDelete.innerHTML = "\u2715";
      btnDelete.style.cssText = `font-size: 14px; background: ${COLORS.bgInput}; border: none; color: ${COLORS.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${EASE};`;
      btnDelete.onmouseenter = () => {
        btnDelete.style.background = COLORS.error;
        btnDelete.style.color = COLORS.surface;
      };
      btnDelete.onmouseleave = () => {
        btnDelete.style.background = COLORS.bgInput;
        btnDelete.style.color = COLORS.textSub;
      };
      btnDelete.onclick = async (e) => {
        e.preventDefault();
        const confirmed = await confirmDialog(`Tem certeza que deseja remover o campo "${labelText.textContent.replace(":", "")}"?`);
        if (confirmed) {
          state.removeField(fieldName);
          buildDynamicForm(subStatusKey, container, state);
        }
      };
      label.appendChild(btnDelete);
      let field;
      if (textareaListFields.includes(fieldName)) {
        field = document.createElement("textarea");
        field.classList.add("bullet-textarea", "cw-textarea");
        field.placeholder = "Utilize marcadores para detalhar...";
        enableAutoBullet(field);
      } else if (textareaParagraphFields.includes(fieldName)) {
        field = document.createElement("textarea");
        field.classList.add("cw-textarea");
        field.placeholder = "Descreva as considera\xE7\xF5es...";
      } else {
        field = document.createElement("input");
        field.type = "text";
        field.classList.add("cw-input");
      }
      field.id = fieldId;
      field.value = state.formData[fieldId] || "";
      field.addEventListener("input", (e) => state.updateField(fieldId, e.target.value));
      container.appendChild(label);
      container.appendChild(field);
    });
    if (state.activeFields.includes("CONSENTIU_GRAVACAO")) {
      const t = (key) => translations[state.currentLang]?.[key] || translations["pt"]?.[key] || key;
      const consentLabel = document.createElement("label");
      consentLabel.textContent = t("consentiu_gravacao");
      Object.assign(consentLabel.style, { display: "block", fontSize: "13px", fontWeight: "700", color: COLORS.textSub, marginBottom: "8px", marginTop: "24px", textTransform: "uppercase", letterSpacing: "0.5px" });
      const consentSelect = document.createElement("select");
      consentSelect.className = "cw-select";
      consentSelect.innerHTML = `
            <option value="false">${t("nao")}</option>
            <option value="true">${t("sim")}</option>
        `;
      consentSelect.value = state.consent ? "true" : "false";
      consentSelect.onchange = () => state.setConsent(consentSelect.value === "true");
      container.appendChild(consentLabel);
      container.appendChild(consentSelect);
    }
  }

  // src/modules/notes/core/output-generator.js
  function generateOutputHtml(state, stepTasks, tagSupport) {
    const selectedSubStatusKey = state.currentSubStatus;
    if (!selectedSubStatusKey) return null;
    const templateDef = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
    const langDict = translations[state.currentLang] || translations["pt"];
    const t = (key) => langDict[key] || translations["pt"]?.[key] || key;
    const ulStyle = 'style="margin-bottom: 12px; padding-left: 30px;"';
    let htmlOutput = "";
    state.activeFields.forEach((fieldKey) => {
      let label = t(fieldKey.toLowerCase());
      let finalValue = "N/A";
      if (fieldKey === "label_substatus") {
        label = t("label_substatus");
        finalValue = templateDef.name;
      } else if (fieldKey === "TAGS_IMPLEMENTED") {
        label = t("tags_implemented");
        const tagNames = [];
        const checkedBoxes = stepTasks.getCheckedElements();
        checkedBoxes.forEach((cb) => {
          const taskKey = cb.value;
          const task = TASKS_DB[taskKey];
          const count = cb.count || 1;
          const isTsTarget = taskKey === "ads_conversion_tracking" || taskKey === "ads_enhanced_conversions";
          const useTsDisclaimer = state.tagSupportUsed && isTsTarget && !state.forcedScreenshots.has(taskKey);
          if (useTsDisclaimer) {
            tagNames.push(`${task.name} - ${t("ts_output_disclaimer")}`);
          } else {
            tagNames.push(count > 1 ? `${task.name} (x${count})` : task.name);
          }
        });
        finalValue = tagNames.join(", ") || "N/A";
      } else if (fieldKey === "SCREENSHOTS_LIST") {
        label = t("screenshots_list");
        let screenshotsText = "";
        const screenshotsContainer = stepTasks.screenshotsElement;
        if (screenshotsContainer) {
          const nameInputs = Array.from(screenshotsContainer.querySelectorAll('input[id^="name-"]'));
          nameInputs.forEach((nameInput) => {
            const customName = nameInput.value;
            const card = nameInput.closest(".cw-screen-card");
            if (card) {
              const printInputs = card.querySelectorAll('input[id^="screen-"]');
              let hasPrints = false;
              let itemsHtml = "";
              printInputs.forEach((printInput) => {
                const group = printInput.closest(".cw-input-group");
                const labelText = group?.querySelector(".cw-input-label")?.textContent || "Evid\xEAncia";
                const val = printInput.value.trim();
                if (val) {
                  itemsHtml += `<li>${labelText} - ${val}</li>`;
                  hasPrints = true;
                }
              });
              if (hasPrints) {
                screenshotsText += `<div style="margin-bottom: 8px;"><b>${customName}</b><ul ${ulStyle}>${itemsHtml}</ul></div>`;
              }
            }
          });
        }
        finalValue = screenshotsText || "N/A";
      } else if (fieldKey === "CASO_PORTUGAL") {
        label = t("caso_portugal");
        finalValue = t("sim");
      } else if (fieldKey === "CONSENTIU_GRAVACAO") {
        label = t("consentiu_gravacao");
        finalValue = state.consent ? t("sim") : t("nao");
      } else {
        const fieldId = `field-${fieldKey}`;
        const userInput = state.formData[fieldId];
        let prefix = "";
        if (templateDef.fieldPrefixes && templateDef.fieldPrefixes[fieldKey]) {
          prefix = templateDef.fieldPrefixes[fieldKey] + " ";
        }
        if (userInput && userInput.trim() !== "" && userInput.trim() !== "\u2022") {
          let value = userInput.trim();
          if (textareaListFields.includes(fieldKey)) {
            const lines = value.split("\n").map((l) => l.trim()).filter((l) => l !== "" && l !== "\u2022").map((l) => l.startsWith("\u2022 ") ? l.substring(2) : l).map((l) => `<li>${l}</li>`).join("");
            finalValue = lines ? `${prefix}<ul ${ulStyle}>${lines}</ul>` : "N/A";
          } else if (textareaParagraphFields.includes(fieldKey)) {
            finalValue = prefix + value.split("\n").filter((l) => l.trim() !== "").map((l) => `<p style="margin: 0 0 8px 0;">${l}</p>`).join("");
          } else {
            finalValue = prefix + value;
          }
        } else if (prefix) {
          finalValue = prefix.trim();
        }
      }
      htmlOutput += `<b>${label}</b><br>${finalValue}<br><br>`;
    });
    if (templateDef.customFooter) {
      htmlOutput += `${templateDef.customFooter}<br><br>`;
    }
    if (tagSupport?.getOutput) {
      const tsOutput = tagSupport.getOutput();
      if (tsOutput) htmlOutput += `${tsOutput}<br><br>`;
    }
    htmlOutput += `<i>Nota criada atrav\xE9s do Cases Wizard.</i>`;
    return htmlOutput.replace(/(<br>\s*){3,}/g, "<br><br>").trim();
  }

  // src/modules/notes/components/step-scenarios.js
  function createScenariosComponent(onSelectCallback) {
    const container = document.createElement("div");
    container.className = "cw-step-scenarios";
    const DEFAULT_PREVIEW_TEXT = "Passe o mouse sobre um cen\xE1rio para visualizar o texto...";
    const grid = document.createElement("div");
    Object.assign(grid.style, {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "12px"
    });
    const previewBox = document.createElement("div");
    Object.assign(previewBox.style, {
      padding: "12px",
      background: "#f8f9fa",
      border: "1px dashed #dadce0",
      borderRadius: "8px",
      fontSize: "12px",
      color: "#5f6368",
      lineHeight: "1.5",
      minHeight: "44px",
      display: "flex",
      alignItems: "center",
      fontStyle: "italic",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      overflow: "hidden"
    });
    const previewText = document.createElement("span");
    previewText.style.transition = "opacity 0.2s ease, transform 0.2s ease";
    previewText.textContent = DEFAULT_PREVIEW_TEXT;
    previewBox.appendChild(previewText);
    const selectedIds = /* @__PURE__ */ new Set();
    let hoverTimeout = null;
    container.render = (subStatusKey, caseType) => {
      selectedIds.clear();
      const filtered = Object.entries(scenarioSnippets).filter(([id, data]) => {
        const matchesType = !data.type || data.type === "all" || data.type === caseType;
        let matchesSubStatus = false;
        if (subStatusKey.startsWith("NI_")) {
          matchesSubStatus = id.includes("-ni-") || id.includes("attempted");
        } else if (subStatusKey.startsWith("SO_")) {
          matchesSubStatus = id.includes("gtm") || id.includes("whatsapp") || id.includes("form") || id.includes("ecw4") || id.includes("ga4") || id.includes("-so-");
        } else if (subStatusKey.startsWith("AS_")) {
          matchesSubStatus = id.includes("-as-");
        } else if (subStatusKey.startsWith("IN_")) {
          matchesSubStatus = id.includes("-in-");
        } else if (subStatusKey.startsWith("DC_")) {
          matchesSubStatus = id.includes("-dc-");
        }
        return matchesType && matchesSubStatus;
      });
      grid.innerHTML = "";
      filtered.forEach(([id, data]) => {
        const chip = document.createElement("div");
        const label = id.replace("quickfill-", "").replace(/-/g, " ");
        chip.textContent = label;
        chip.dataset.id = id;
        Object.assign(chip.style, {
          padding: "6px 12px",
          borderRadius: "16px",
          border: "1px solid #dadce0",
          background: "#ffffff",
          fontSize: "13px",
          color: "#3c4043",
          cursor: "pointer",
          userSelect: "none",
          transition: "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"
        });
        const textPreviewContent = data["field-REASON_COMMENTS"] || data["field-CONTEXTO_CALL"] || id;
        chip.onmouseenter = () => {
          if (hoverTimeout) clearTimeout(hoverTimeout);
          if (!selectedIds.has(id)) {
            chip.style.background = "#f1f3f4";
          }
          previewText.style.opacity = "0";
          previewText.style.transform = "translateY(5px)";
          hoverTimeout = setTimeout(() => {
            previewText.textContent = textPreviewContent.substring(0, 120) + (textPreviewContent.length > 120 ? "..." : "");
            previewText.style.opacity = "1";
            previewText.style.transform = "translateY(0)";
          }, 50);
        };
        chip.onmouseleave = () => {
          if (hoverTimeout) clearTimeout(hoverTimeout);
          if (!selectedIds.has(id)) {
            chip.style.background = "#ffffff";
          }
          hoverTimeout = setTimeout(() => {
            if (selectedIds.size === 0) {
              previewText.style.opacity = "0";
              setTimeout(() => {
                previewText.textContent = DEFAULT_PREVIEW_TEXT;
                previewText.style.opacity = "1";
              }, 50);
            }
          }, 100);
        };
        chip.onclick = () => {
          SoundManager.playClick();
          const isSelecting = !selectedIds.has(id);
          if (isSelecting) {
            selectedIds.add(id);
            chip.style.background = "#e8f0fe";
            chip.style.borderColor = "#1a73e8";
            chip.style.color = "#1967d2";
          } else {
            selectedIds.delete(id);
            chip.style.background = "#ffffff";
            chip.style.borderColor = "#dadce0";
            chip.style.color = "#3c4043";
          }
          onSelectCallback(id, isSelecting);
        };
        grid.appendChild(chip);
      });
      if (filtered.length === 0) {
        container.style.display = "none";
      } else {
        container.style.display = "block";
      }
    };
    container.appendChild(grid);
    container.appendChild(previewBox);
    return container;
  }

  // src/modules/notes/components/step-tasks.js
  var DS = {
    bg: COLORS.bgInput,
    white: COLORS.surface,
    border: COLORS.border,
    textMain: COLORS.text,
    textSub: COLORS.textSub,
    blue: COLORS.blue,
    blueLight: COLORS.primaryBg,
    // Cores Oficiais das Ferramentas
    brands: {
      ads: {
        id: "ads",
        label: "Google Ads",
        color: COLORS.blue,
        bg: COLORS.primaryBg,
        icon: "ads"
      },
      ga4: {
        id: "ga4",
        label: "Google Analytics 4",
        color: COLORS.yellow,
        bg: "#FEF7E0",
        icon: "ga4"
      },
      gtm: {
        id: "gtm",
        label: "Tag Manager",
        color: COLORS.primary,
        bg: COLORS.primaryBg,
        icon: "gtm"
      },
      gmc: {
        id: "gmc",
        label: "Merchant Center",
        color: COLORS.green,
        bg: "#E6F4EA",
        icon: "gmc"
      },
      default: {
        id: "gen",
        label: "Geral",
        color: "#5F6368",
        bg: "#F3F4F6",
        icon: "default"
      }
    },
    shadowCard: "0 1px 2px rgba(0,0,0,0.05)",
    shadowFloat: "0 -4px 20px rgba(0,0,0,0.08)",
    font: "'Google Sans', -apple-system, Roboto, sans-serif"
  };
  var ICONS = {
    // Google Ads (Triângulo Novo)
    ads: `<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>`,
    // GA4 (Gráfico Laranja)
    ga4: `<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>`,
    // GTM (Tag Azul)
    gtm: `<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>`,
    // Merchant (Shopping Bag)
    gmc: `<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>`,
    // Default
    default: `<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`
  };
  function createStepTasksComponent(onUpdateCallback, t, notesState2) {
    const selection = {};
    let currentMode = "implementation";
    if (notesState2) {
      notesState2.subscribe(() => {
        updateUI();
        renderScreenshots();
      });
    }
    function getBrand(name) {
      const n = name.toLowerCase();
      if (n.includes("ads") || n.includes("conversion") || n.includes("remarketing"))
        return DS.brands.ads;
      if (n.includes("ga4") || n.includes("analytics")) return DS.brands.ga4;
      if (n.includes("gtm") || n.includes("tag manager") || n.includes("container"))
        return DS.brands.gtm;
      if (n.includes("merchant") || n.includes("shopping") || n.includes("feed"))
        return DS.brands.gmc;
      return DS.brands.default;
    }
    const heroTasks = Object.entries(TASKS_DB).filter(([_, t2]) => t2.popular);
    const groupedTasks = {};
    Object.entries(TASKS_DB).forEach(([key, task]) => {
      if (task.popular) return;
      const brand = getBrand(task.name);
      if (!groupedTasks[brand.label])
        groupedTasks[brand.label] = { brand, tasks: [] };
      groupedTasks[brand.label].tasks.push({ key, ...task });
    });
    const styleId2 = "cw-zen-tasks";
    if (!document.getElementById(styleId2)) {
      const style = document.createElement("style");
      style.id = styleId2;
      style.innerHTML = `
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${DS.font}; background: ${DS.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${DS.border};
            }

            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${DS.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${DS.white};
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
                font-size: 12px; font-weight: 500; color: ${DS.textMain}; line-height: 1.2;
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
                color: ${DS.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${DS.border}; border-radius: 10px; background: ${DS.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${DS.blue}; box-shadow: 0 0 0 3px ${DS.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${DS.border}; border-radius: 10px; background: ${DS.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${DS.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${DS.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${DS.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${DS.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${DS.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }

            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px;
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${DS.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${DS.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${DS.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${DS.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${DS.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${DS.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${DS.textMain}; }

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
                font-family: ${DS.font}; font-size: 15px; font-weight: 600; color: ${DS.textMain};
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
                border-color: ${DS.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${DS.textSub}; opacity: 0;
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
                font-size: 11px; color: ${DS.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${DS.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${DS.textSub};
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
        `;
      document.head.appendChild(style);
    }
    const container = document.createElement("div");
    container.className = "cw-zen-container";
    const screenshotsContainer = document.createElement("div");
    Object.assign(screenshotsContainer.style, { display: "none" });
    const screenList = document.createElement("div");
    screenList.className = "cw-screens-container";
    screenshotsContainer.appendChild(screenList);
    container.innerHTML = `
        <div class="cw-zen-content">
            <div class="cw-hero-section">
                <div class="cw-section-subtitle js-hero-title" style="font-size:11px; font-weight:700; color:#6B7280; text-transform:uppercase; letter-spacing:0.8px;">${t("acesso_rapido")}</div>
                <div class="cw-hero-grid"></div>
                <div class="cw-helper-text">Atalhos para as implementa\xE7\xF5es mais frequentes.<br>Use a busca abaixo para o cat\xE1logo completo.</div>
            </div>

            <div class="cw-list-section">
                <div class="cw-search-wrapper">
                    <input class="cw-search-input" placeholder="${t("buscar_catalogo")}">
                </div>
                <div class="cw-acc-container"></div>
                <div class="cw-results-container" style="display:none"></div>
            </div>
        </div>

        <div class="cw-status-bar">
            <div class="cw-status-text">0 a\xE7\xF5es definidas</div>
            <div class="cw-footer-icons"></div>
        </div>
    `;
    const heroGrid = container.querySelector(".cw-hero-grid");
    const accContainer = container.querySelector(".cw-acc-container");
    const resultsContainer = container.querySelector(".cw-results-container");
    const searchInput = container.querySelector(".cw-search-input");
    const statusBar = container.querySelector(".cw-status-bar");
    const statusText = container.querySelector(".cw-status-text");
    const footerIcons = container.querySelector(".cw-footer-icons");
    heroTasks.forEach(([key, task]) => {
      const brand = getBrand(task.name);
      const card = document.createElement("div");
      card.className = "cw-hero-card";
      card.id = `hero-${key}`;
      card.style.setProperty("--hero-color", brand.color);
      card.innerHTML = `
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${ICONS[brand.icon]}</div>
                <div class="cw-hero-label">${task.name}</div>
            </div>

            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `;
      card.onclick = (e) => {
        if (e.target.closest(".cw-step-btn")) return;
        const current = selection[key] ? selection[key].count : 0;
        updateTask(key, current > 0 ? -current : 1, task);
      };
      card.querySelector(".minus").onclick = () => updateTask(key, -1, task);
      card.querySelector(".plus").onclick = () => updateTask(key, 1, task);
      card.dataset.color = brand.color;
      heroGrid.appendChild(card);
    });
    function createListItem(key, task) {
      const brand = getBrand(task.name);
      const row = document.createElement("div");
      row.className = "cw-task-item";
      row.dataset.id = key;
      row.innerHTML = `
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${brand.bg}; color:${brand.color}">
                    ${ICONS[brand.icon] || ICONS.default}
                </div>
                <div class="cw-task-label">${task.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `;
      row.onclick = (e) => {
        if (e.target.closest(".cw-step-btn")) return;
        const current = selection[key] ? selection[key].count : 0;
        updateTask(key, current > 0 ? -current : 1, task);
      };
      row.querySelector(".minus").onclick = () => updateTask(key, -1, task);
      row.querySelector(".plus").onclick = () => updateTask(key, 1, task);
      return row;
    }
    Object.entries(groupedTasks).forEach(([catName, data]) => {
      const group = document.createElement("div");
      group.className = "cw-acc-group";
      const header = document.createElement("div");
      header.className = "cw-acc-header";
      header.innerHTML = `
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${data.brand.color}"></div>
                ${catName}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `;
      header.onclick = () => {
        accContainer.querySelectorAll(".cw-acc-group.open").forEach((g) => {
          if (g !== group) g.classList.remove("open");
        });
        group.classList.toggle("open");
      };
      const body = document.createElement("div");
      body.className = "cw-acc-body";
      data.tasks.forEach((item) => {
        const row = createListItem(item.key, item);
        body.appendChild(row);
      });
      group.appendChild(header);
      group.appendChild(body);
      accContainer.appendChild(group);
    });
    function updateTask(key, delta, taskData) {
      if (!selection[key])
        selection[key] = {
          count: 0,
          data: taskData,
          brand: getBrand(taskData.name)
        };
      selection[key].count += delta;
      if (selection[key].count <= 0) delete selection[key];
      updateUI();
      renderScreenshots();
      if (onUpdateCallback) onUpdateCallback();
    }
    function updateUI() {
      const tsUsed = notesState2.tagSupportUsed;
      heroTasks.forEach(([key]) => {
        const card = heroGrid.querySelector(`#hero-${key}`);
        if (!card) return;
        const sel = selection[key];
        if (sel) {
          card.classList.add("active");
          card.querySelector(".cw-step-val").textContent = sel.count;
          card.querySelector(".cw-step-val").style.color = card.dataset.color;
          const isTsTarget = key === "ads_conversion_tracking" || key === "ads_enhanced_conversions";
          if (tsUsed && isTsTarget && !notesState2.forcedScreenshots.has(key)) {
            card.classList.add("ts-success");
          } else {
            card.classList.remove("ts-success");
          }
        } else {
          card.classList.remove("active");
          card.classList.remove("ts-success");
        }
      });
      const allItems = container.querySelectorAll(".cw-task-item");
      allItems.forEach((row) => {
        const key = row.dataset.id;
        const sel = selection[key];
        if (sel) {
          row.classList.add("selected");
          row.querySelector(".cw-step-val").textContent = sel.count;
          const isTsTarget = key === "ads_conversion_tracking" || key === "ads_enhanced_conversions";
          if (tsUsed && isTsTarget && !notesState2.forcedScreenshots.has(key)) {
            row.classList.add("ts-success");
          } else {
            row.classList.remove("ts-success");
          }
        } else {
          row.classList.remove("selected");
          row.classList.remove("ts-success");
        }
      });
      const keys = Object.keys(selection);
      let totalCount = 0;
      const iconStack = [];
      keys.forEach((k) => {
        const item = selection[k];
        totalCount += item.count;
        for (let i = 0; i < item.count; i++) {
          if (iconStack.length < 6) iconStack.push(item.brand);
        }
      });
      if (totalCount > 0) {
        statusBar.classList.add("visible");
        const txtTask = totalCount > 1 ? "A\xE7\xF5es" : "A\xE7\xE3o";
        const txtDef = totalCount > 1 ? "definidas" : "definida";
        statusText.textContent = `${totalCount} ${txtTask} ${txtDef}`;
        footerIcons.innerHTML = "";
        iconStack.forEach((brand) => {
          const mini = document.createElement("div");
          mini.className = "cw-mini-icon";
          mini.innerHTML = ICONS[brand.icon] || ICONS.default;
          const svg = mini.querySelector("svg");
          if (svg) {
            svg.style.width = "14px";
            svg.style.height = "14px";
          }
          footerIcons.appendChild(mini);
        });
      } else {
        statusBar.classList.remove("visible");
      }
    }
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      if (term.length > 0) {
        accContainer.style.display = "none";
        resultsContainer.style.display = "block";
        resultsContainer.innerHTML = "";
        let found = false;
        Object.entries(TASKS_DB).forEach(([key, task]) => {
          if (task.name.toLowerCase().includes(term)) {
            found = true;
            const item = createListItem(key, task);
            if (selection[key]) {
              item.classList.add("selected");
              item.querySelector(".cw-step-val").textContent = selection[key].count;
            }
            resultsContainer.appendChild(item);
          }
        });
        if (!found)
          resultsContainer.innerHTML = '<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>';
      } else {
        accContainer.style.display = "block";
        resultsContainer.style.display = "none";
      }
    });
    function renderScreenshots() {
      screenList.innerHTML = "";
      const keys = Object.keys(selection);
      let hasAny = false;
      if (keys.length === 0) {
        screenList.innerHTML = `<div class="cw-empty-state">${t("selecione_tarefas")}</div>`;
        screenshotsContainer.style.display = "none";
        return;
      }
      const tsUsed = notesState2.tagSupportUsed;
      const disclaimer = document.createElement("div");
      disclaimer.className = "cw-info-banner";
      disclaimer.innerHTML = `
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `;
      screenList.appendChild(disclaimer);
      keys.forEach((key) => {
        const task = selection[key].data;
        const taskCount = selection[key].count;
        const brand = selection[key].brand;
        const isTsTarget = key === "ads_conversion_tracking" || key === "ads_enhanced_conversions";
        const useTsLogic = tsUsed && isTsTarget && !notesState2.forcedScreenshots.has(key);
        const mode = notesState2.screenshotMode || "implementation";
        const screenshotLabels = task.screenshots?.[mode] || [];
        if (screenshotLabels.length > 0 || useTsLogic) {
          hasAny = true;
          for (let i = 1; i <= taskCount; i++) {
            const card = document.createElement("div");
            card.className = "cw-screen-card";
            if (useTsLogic) card.classList.add("ts-success");
            card.style.setProperty("--brand-color", brand.color);
            card.style.setProperty("--brand-bg", brand.bg);
            card.style.setProperty("--brand-shadow", brand.color + "40");
            const header = document.createElement("div");
            header.className = "cw-card-header";
            const iconBox = document.createElement("div");
            iconBox.className = "cw-card-icon";
            iconBox.innerHTML = ICONS[brand.icon] || ICONS.default;
            const titleWrap = document.createElement("div");
            titleWrap.style.cssText = "flex:1; display:flex; align-items:center; gap:8px;";
            const nameInput = document.createElement("input");
            nameInput.className = "cw-card-title-input";
            nameInput.id = `name-${key}-${i}`;
            nameInput.value = `${task.name}${taskCount > 1 ? " #" + i : ""}`;
            nameInput.title = "Clique para renomear esta task";
            const editHint = document.createElement("span");
            editHint.className = "cw-edit-hint";
            editHint.innerHTML = "\u270E Renomear";
            titleWrap.appendChild(nameInput);
            titleWrap.appendChild(editHint);
            header.appendChild(iconBox);
            header.appendChild(titleWrap);
            card.appendChild(header);
            if (useTsLogic) {
              const tsBox = document.createElement("div");
              tsBox.className = "cw-ts-disclaimer-box";
              tsBox.innerHTML = `
                <span>${t("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${t("incluir_mesmo_assim")}</button>
            `;
              tsBox.querySelector("button").onclick = () => {
                notesState2.toggleForcedScreenshot(key, true);
              };
              card.appendChild(tsBox);
            } else {
              screenshotLabels.forEach((title, idx) => {
                const group = document.createElement("div");
                group.className = "cw-input-group";
                const label = document.createElement("label");
                label.className = "cw-input-label";
                label.textContent = title;
                const pInput = document.createElement("input");
                pInput.className = "cw-input-field";
                pInput.id = `screen-${key}-${i}-${idx}`;
                pInput.placeholder = "Cole o link aqui...";
                pInput.setAttribute("autocomplete", "off");
                pInput.addEventListener("input", () => {
                  if (pInput.value.trim().length > 5) pInput.classList.add("filled");
                  else pInput.classList.remove("filled");
                });
                const check = document.createElement("div");
                check.className = "cw-input-check";
                check.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                group.appendChild(label);
                group.appendChild(pInput);
                group.appendChild(check);
                card.appendChild(group);
              });
            }
            screenList.appendChild(card);
          }
        }
      });
      screenshotsContainer.style.display = hasAny ? "block" : "none";
    }
    return {
      selectionElement: container,
      screenshotsElement: screenshotsContainer,
      updateSubStatus: () => renderScreenshots(),
      // Helper para ler o estado atual (Usado no Save)
      getCheckedElements: () => {
        return Object.keys(selection).map((key) => ({
          value: key,
          count: selection[key].count
        }));
      },
      // [CORREÇÃO] Novo método para definir quantidade direta (Usado no Restore)
      setTaskCount: (key, count) => {
        if (selection[key]) delete selection[key];
        if (count > 0 && TASKS_DB[key]) {
          updateTask(key, count, TASKS_DB[key]);
        }
      },
      toggleTask: (key, forceState = true) => {
        const current = selection[key];
        if (forceState && !current) {
          updateTask(key, 1, TASKS_DB[key]);
        } else if (!forceState && current) {
          updateTask(key, -current.count, TASKS_DB[key]);
        }
      },
      setLanguage: (newT) => {
        t = newT;
        const hTitle = container.querySelector(".js-hero-title");
        if (hTitle) hTitle.textContent = t("acesso_rapido");
        const sInput = container.querySelector(".cw-search-input");
        if (sInput) sInput.placeholder = t("buscar_catalogo");
        renderScreenshots();
      },
      reset: () => {
        for (const key in selection) delete selection[key];
        searchInput.value = "";
        accContainer.style.display = "block";
        resultsContainer.style.display = "none";
        updateUI();
        renderScreenshots();
      }
    };
  }

  // src/modules/notes/tag-support.js
  var styleContainer = {
    marginTop: "24px",
    marginBottom: "16px",
    padding: "20px",
    background: "#fff9e6",
    borderRadius: "20px",
    border: "1.5px solid #fbbc0540",
    display: "none",
    boxShadow: "0 4px 12px rgba(251, 188, 5, 0.05)"
  };
  var styleWarning = { fontSize: "12px", color: "#b06000", marginTop: "8px", lineHeight: "1.4" };
  var styleInputLocal = { width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1.5px solid #dadce0", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box", background: "#fff" };
  var styleRadioGroup = { display: "flex", gap: "20px", marginBottom: "12px" };
  function createTagSupportModule(t) {
    const container = document.createElement("div");
    container.id = "tag-support-container";
    Object.assign(container.style, styleContainer);
    const mainLabel = document.createElement("label");
    mainLabel.className = "js-ts-main-label";
    mainLabel.textContent = t("utilizou_tag_support");
    Object.assign(mainLabel.style, styleLabel, { marginTop: "0" });
    const radioContainer = document.createElement("div");
    Object.assign(radioContainer.style, styleRadioGroup);
    const rSim = document.createElement("input");
    rSim.type = "radio";
    rSim.name = "ts_usage_mod";
    rSim.value = "Sim";
    Object.assign(rSim.style, styleCheckboxInput);
    const lSim = document.createElement("label");
    lSim.textContent = "Sim";
    const divSim = document.createElement("div");
    Object.assign(divSim.style, { display: "flex", alignItems: "center" });
    divSim.appendChild(rSim);
    divSim.appendChild(lSim);
    const rNao = document.createElement("input");
    rNao.type = "radio";
    rNao.name = "ts_usage_mod";
    rNao.value = "N\xE3o";
    rNao.checked = true;
    Object.assign(rNao.style, styleCheckboxInput);
    const lNao = document.createElement("label");
    lNao.textContent = "N\xE3o";
    const divNao = document.createElement("div");
    Object.assign(divNao.style, { display: "flex", alignItems: "center" });
    divNao.appendChild(rNao);
    divNao.appendChild(lNao);
    radioContainer.appendChild(divSim);
    radioContainer.appendChild(divNao);
    const reasonDiv = document.createElement("div");
    reasonDiv.style.display = "block";
    const reasonLabel = document.createElement("label");
    reasonLabel.className = "js-ts-reason-label";
    reasonLabel.textContent = t("motivo_ts");
    Object.assign(reasonLabel.style, styleLabel, { fontSize: "12px" });
    const reasonInput = document.createElement("input");
    reasonInput.type = "text";
    Object.assign(reasonInput.style, styleInputLocal);
    const warningText = document.createElement("div");
    warningText.className = "js-ts-warning";
    warningText.innerHTML = `\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`;
    Object.assign(warningText.style, styleWarning);
    reasonDiv.appendChild(reasonLabel);
    reasonDiv.appendChild(reasonInput);
    reasonDiv.appendChild(warningText);
    container.appendChild(mainLabel);
    container.appendChild(radioContainer);
    container.appendChild(reasonDiv);
    rSim.onchange = () => {
      reasonDiv.style.display = "none";
      Promise.resolve().then(() => (init_notes_state(), notes_state_exports)).then((m) => m.notesState.setTagSupportUsed(true));
    };
    rNao.onchange = () => {
      reasonDiv.style.display = "block";
      Promise.resolve().then(() => (init_notes_state(), notes_state_exports)).then((m) => m.notesState.setTagSupportUsed(false));
    };
    function updateVisibility(subStatus, selectedTasksArray) {
      container.style.display = "none";
      if (!subStatus) return;
      if (!selectedTasksArray || selectedTasksArray.length === 0) return;
      const hasTargetTasks = selectedTasksArray.some(
        (t2) => t2 === "ads_conversion_tracking" || t2 === "ads_enhanced_conversions"
      );
      if (hasTargetTasks) {
        container.style.display = "block";
      } else {
        reset();
        Promise.resolve().then(() => (init_notes_state(), notes_state_exports)).then((m) => m.notesState.setTagSupportUsed(false));
      }
    }
    function getOutput() {
      if (container.style.display === "none") return "";
      let text = `<br><b>Utilizou Tag Support?</b> ${rSim.checked ? "\u2705 Sim" : "\u274C N\xE3o"}`;
      if (rNao.checked && reasonInput.value.trim() !== "") {
        text += `<br><b>Motivo:</b> ${reasonInput.value}`;
      }
      text += `<br>`;
      return text;
    }
    function setLanguage(newT) {
      t = newT;
      mainLabel.textContent = t("utilizou_tag_support");
      reasonLabel.textContent = t("motivo_ts");
      warningText.innerHTML = `\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`;
    }
    function reset() {
      container.style.display = "none";
      rNao.checked = true;
      rSim.checked = false;
      reasonDiv.style.display = "block";
      reasonInput.value = "";
    }
    return {
      element: container,
      // O elemento HTML para dar append
      updateVisibility,
      getOutput,
      setLanguage,
      reset
    };
  }

  // src/modules/notes/drafts/draft-service.js
  var STORAGE_KEY = "cw_notes_parking_lot";
  var EMERGENCY_KEY = "cw_notes_emergency_save";
  var MAX_DRAFTS = 5;
  var DraftService = {
    // --- MÉTODOS DE RASCUNHO (Existentes) ---
    getAll: () => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      } catch (e) {
        return [];
      }
    },
    save: (data) => {
      const drafts = DraftService.getAll();
      const newDraft = {
        id: Date.now().toString(),
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        ...data
      };
      drafts.unshift(newDraft);
      if (drafts.length > MAX_DRAFTS) drafts.pop();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
      return newDraft;
    },
    delete: (id) => {
      let drafts = DraftService.getAll();
      drafts = drafts.filter((d) => d.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
      return drafts;
    },
    getCount: () => {
      return DraftService.getAll().length;
    },
    // --- NOVO: MÉTODOS DE EMERGÊNCIA (AIRBAG) ---
    saveEmergency: (data) => {
      const payload = {
        timestamp: Date.now(),
        data
      };
      localStorage.setItem(EMERGENCY_KEY, JSON.stringify(payload));
    },
    getEmergency: () => {
      try {
        const raw = localStorage.getItem(EMERGENCY_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.timestamp > 12 * 60 * 60 * 1e3) {
          localStorage.removeItem(EMERGENCY_KEY);
          return null;
        }
        if (!parsed.data || !parsed.data.subStatus) {
          return null;
        }
        return parsed.data;
      } catch (e) {
        return null;
      }
    },
    clearEmergency: () => {
      localStorage.removeItem(EMERGENCY_KEY);
    }
  };

  // src/modules/shared/data-service.js
  var API_URL = "https://script.google.com/a/macros/google.com/s/AKfycbw2oPrfcDrXoKWT25hCAetnJ132SKFasTbywfwCVNT-qjwnO6Ip-yRp0w89eyyceziaDQ/exec";
  var CACHE_KEY_BROADCAST = "cw_data_broadcast";
  var CACHE_KEY_TIPS = "cw_data_tips";
  var FALLBACK_TIPS = ["Processando...", "Mantenha o foco!", "Aguarde..."];
  function jsonpFetch(operation, params = {}) {
    return new Promise((resolve, reject) => {
      const callbackName = "cw_cb_" + Math.round(1e5 * Math.random());
      const script = document.createElement("script");
      window[callbackName] = (data) => {
        if (document.body.contains(script)) document.body.removeChild(script);
        delete window[callbackName];
        resolve(data);
      };
      const queryString = Object.keys(params).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])).join("&");
      const finalUrl = `${API_URL}?op=${operation}&callback=${callbackName}&t=${Date.now()}&${queryString}`;
      script.src = finalUrl;
      script.onerror = () => {
        if (document.body.contains(script)) document.body.removeChild(script);
        delete window[callbackName];
        reject(new Error("JSONP Error (Check Corp Login)"));
      };
      document.body.appendChild(script);
    });
  }
  async function _performOp(op, params) {
    try {
      console.log(`\u{1F4E4} Executando ${op}...`, params);
      const response = await jsonpFetch(op, params);
      if (response && response.status === "success") {
        console.log("\u2705 Sucesso:", op);
        return response;
      }
      console.warn("\u26A0\uFE0F Falha:", response);
      throw new Error(response.message || `Opera\xE7\xE3o ${op} falhou.`);
    } catch (e) {
      console.error(`\u274C Erro na opera\xE7\xE3o ${op}:`, e);
      throw e;
    }
  }
  var DataService = {
    fetchTips: async () => {
      try {
        const data = await jsonpFetch("tips");
        if (data?.tips) localStorage.setItem(CACHE_KEY_TIPS, JSON.stringify(data.tips));
      } catch (err) {
        console.warn("Tips offline", err);
      }
    },
    fetchData: async () => {
      try {
        const data = await jsonpFetch("broadcast");
        if (data?.broadcast) {
          localStorage.setItem(CACHE_KEY_BROADCAST, JSON.stringify(data.broadcast));
          return data;
        }
      } catch (err) {
        console.warn("Broadcast offline", err);
      }
      return { broadcast: JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]") };
    },
    getCachedBroadcasts: () => JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]"),
    getRandomTip: () => {
      let tips = FALLBACK_TIPS;
      const cached = localStorage.getItem(CACHE_KEY_TIPS);
      if (cached) try {
        tips = JSON.parse(cached);
      } catch (e) {
      }
      return tips[Math.floor(Math.random() * tips.length)];
    },
    // 3. ENVIAR (CREATE)
    sendBroadcast: async (payload) => {
      const fullPayload = {
        ...payload,
        date: (/* @__PURE__ */ new Date()).toISOString(),
        id: Date.now().toString()
      };
      return await _performOp("new_broadcast", fullPayload);
    },
    // 4. ATUALIZAR (UPDATE)
    updateBroadcast: async (id, payload) => {
      const fullPayload = { id, ...payload };
      return await _performOp("update_broadcast", fullPayload);
    },
    // 5. DELETAR (DELETE)
    deleteBroadcast: async (id) => {
      return await _performOp("delete_broadcast", { id });
    },
    // --- ANALYTICS VIA JSONP (A Correção) ---
    logEvent: (category, action, label = "", value = null) => {
      try {
        let user = "anon";
        try {
          const email = getAgentEmail();
          if (email) user = email.split("@")[0].toLowerCase();
        } catch (e) {
        }
        const payload = {
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          user,
          version: "v5.1",
          category,
          action,
          label,
          value: value || ""
        };
        jsonpFetch("log", payload).catch((e) => {
        });
      } catch (err) {
        console.warn("Analytics error", err);
      }
    },
    logUsage: () => {
    },
    // Ler todos (GET)
    getUserSnippets: async (userEmail) => {
      try {
        return await jsonpFetch("get_user_snippets", { user: userEmail });
      } catch (e) {
        console.warn("Erro ao buscar snippets:", e);
        return null;
      }
    },
    // Salvar/Editar (CREATE/UPDATE)
    saveSnippet: async (snippet, userEmail) => {
      const payload = {
        ...snippet,
        user: userEmail
      };
      return await _performOp("save_snippet", payload);
    },
    // Deletar (DELETE)
    deleteSnippet: async (id, userEmail) => {
      return await _performOp("delete_snippet", { id, user: userEmail });
    }
  };
  var sendBAUEscalation = async (payload, userEmail) => {
    const fullPayload = {
      ...payload,
      user: userEmail,
      date: (/* @__PURE__ */ new Date()).toISOString()
    };
    await _performOp("create_bau_escalation", fullPayload);
    return true;
  };

  // src/modules/shared/config.js
  var ADMINS = ["lucaste", "ricardogi"];

  // src/modules/shared/command-center.js
  var COLORS2 = {
    glassBg: "rgba(61, 61, 61, 0.77)",
    glassBorder: "rgba(255, 255, 255, 0.15)",
    glassActive: "rgba(79, 79, 79, 0.89)",
    glassHighlight: "rgba(255, 255, 255, 0.08)",
    iconIdle: "#c2c5c8ff",
    iconActive: "#FFFFFF",
    // Cores de Marca
    blue: "#8AB4F8",
    red: "#F28B82",
    purple: "#C58AF9",
    green: "#81C995",
    orange: "#F9AB00",
    teal: "#00BFA5",
    pink: "#F48FB1",
    // [NOVO] Cor para a Biblioteca
    gray: "#9AA0A6"
    // [NOVO] Cor para Configurações
  };
  var esperar4 = (ms) => new Promise((r) => setTimeout(r, ms));
  function updateNotesBadge(hasDrafts) {
    const btn = document.getElementById("cw-btn-notes");
    if (!btn) return;
    let badge = btn.querySelector(".cw-dot-dirty");
    if (hasDrafts) {
      if (!badge) {
        badge = document.createElement("div");
        badge.className = "cw-dot-dirty";
        btn.appendChild(badge);
      }
    } else {
      if (badge) badge.remove();
    }
  }
  function initCommandCenter(actions) {
    const styleId2 = "cw-command-center-style";
    if (!document.getElementById(styleId2)) {
      const style = document.createElement("style");
      style.id = styleId2;
      style.innerHTML = `
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

                background: ${COLORS2.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${COLORS2.glassBorder}; border-radius: 50px;
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
                cursor: pointer; position: relative; color: ${COLORS2.iconIdle};
                flex-shrink: 0;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn:hover {
                background: ${COLORS2.glassHighlight};
                color: ${COLORS2.iconActive};
                transform: scale(1.18) translateY(-2px) !important;
            }

            .cw-btn.notes.active { color: ${COLORS2.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${COLORS2.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${COLORS2.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${COLORS2.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${COLORS2.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${COLORS2.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${COLORS2.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${COLORS2.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${COLORS2.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${COLORS2.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${COLORS2.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${COLORS2.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${COLORS2.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${COLORS2.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${COLORS2.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${COLORS2.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${COLORS2.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${COLORS2.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${COLORS2.blue}; width: 16px; opacity: 1; }

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
            .cw-center-dots span:nth-child(1) { background-color: ${COLORS2.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${COLORS2.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${COLORS2.green}; }

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

            .cw-center-success { display: none; color: ${COLORS2.green}; margin-bottom: 10px; }
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
        `;
      document.head.appendChild(style);
    }
    const ICONS2 = {
      check: `<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
      notes: `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
      email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
      script: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
      links: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,
      broadcast: `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
      main: `<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
      timezone: `<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`,
      library: `<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>`,
      // [NOVO]
      configs: `<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
      bauform: `<svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`
    };
    const pill = document.createElement("div");
    pill.className = "cw-pill side-right collapsed";
    pill.innerHTML = `
        <div class="cw-main-logo">${ICONS2.main}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${ICONS2.notes}</button>
        <button class="cw-btn bauform" id="cw-btn-bauform" data-label="BAU Form">${ICONS2.bauform}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Email Assistant">${ICONS2.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${ICONS2.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${ICONS2.links}</button>
        <button class="cw-btn library" id="cw-btn-library" data-label="My Library">${ICONS2.library}</button>
        <button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${ICONS2.timezone}</button>
        <button class="cw-btn configs" id="cw-btn-configs" data-label="Configura\xE7\xF5es">${ICONS2.configs}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${ICONS2.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${ICONS2.check}</div>
        </div>
    `;
    const overlay = document.createElement("div");
    overlay.className = "cw-focus-backdrop";
    document.body.appendChild(overlay);
    document.body.appendChild(pill);
    const toggleModule = (btnClass, actionFn) => {
      SoundManager.playClick();
      const btn = pill.querySelector(`.${btnClass}`);
      btn.classList.toggle("active");
      actionFn();
    };
    pill.querySelector(".notes").onclick = (e) => {
      e.stopPropagation();
      toggleModule("notes", actions.toggleNotes);
    };
    pill.querySelector(".bauform").onclick = (e) => {
      e.stopPropagation();
      toggleModule("bauform", actions.toggleBAUForm);
    };
    pill.querySelector(".email").onclick = (e) => {
      e.stopPropagation();
      toggleModule("email", actions.toggleEmail);
    };
    pill.querySelector(".script").onclick = (e) => {
      e.stopPropagation();
      toggleModule("script", actions.toggleScript);
    };
    pill.querySelector(".links").onclick = (e) => {
      e.stopPropagation();
      toggleModule("links", actions.toggleLinks);
    };
    pill.querySelector(".library").onclick = (e) => {
      e.stopPropagation();
      toggleModule("library", actions.toggleLibrary);
    };
    pill.querySelector(".timezone").onclick = (e) => {
      e.stopPropagation();
      toggleModule("timezone", actions.toggleTimezone);
    };
    pill.querySelector(".configs").onclick = (e) => {
      e.stopPropagation();
      toggleModule("configs", actions.toggleConfigs);
    };
    pill.querySelector(".broadcast").onclick = (e) => {
      e.stopPropagation();
      toggleModule("broadcast", () => {
        const badge = e.currentTarget.querySelector(".cw-badge");
        if (badge) badge.remove();
        if (actions.broadcastControl) actions.broadcastControl.toggle();
      });
    };
    pill.querySelectorAll(".cw-btn").forEach((btn) => {
      btn.addEventListener("mouseenter", () => SoundManager.playHover());
    });
    if (actions.broadcastControl && actions.broadcastControl.hasUnread) {
      const badge = document.createElement("div");
      badge.className = "cw-badge";
      pill.querySelector(".broadcast").appendChild(badge);
    }
    let closeTimer = null;
    pill.onmouseleave = () => {
      const isAnyActive = pill.querySelector(".cw-btn.active");
      if (isAnyActive || pill.classList.contains("processing-center")) return;
      closeTimer = setTimeout(() => {
        pill.classList.add("collapsed");
      }, 3e3);
    };
    pill.onmouseenter = () => {
      if (closeTimer) clearTimeout(closeTimer);
    };
    (async function startAnimation() {
      const checkAdmin = () => {
        const email = getAgentEmail();
        if (email) {
          const user = email.split("@")[0].toLowerCase();
          if (ADMINS.includes(user)) {
            const badge = pill.querySelector("#cw-admin-tag");
            if (badge) badge.classList.add("visible");
          }
        } else {
          setTimeout(checkAdmin, 2e3);
        }
      };
      checkAdmin();
      await esperar4(2800);
      pill.classList.add("docked");
      await esperar4(300);
      const items = pill.querySelectorAll(".cw-btn");
      pill.querySelectorAll(".cw-sep").forEach((s) => s.classList.add("visible"));
      for (let i = 0; i < items.length; i++) {
        items[i].classList.add("popped");
        await esperar4(90);
      }
      await esperar4(200);
      pill.classList.add("system-check");
    })();
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    const DRAG_THRESHOLD = 3;
    pill.onmousedown = (e) => {
      if (e.target.closest("button")) return;
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
      const rect = pill.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
    function onMouseMove(e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!isDragging && Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
        isDragging = true;
        pill.classList.add("dragging");
        pill.style.transition = "none";
        if (closeTimer) clearTimeout(closeTimer);
      }
      if (isDragging) {
        pill.style.left = `${initialLeft + dx}px`;
        pill.style.top = `${initialTop + dy}px`;
        pill.style.right = "auto";
        pill.style.bottom = "auto";
        pill.style.transform = "none";
      }
    }
    function onMouseUp(e) {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      if (isDragging) {
        isDragging = false;
        pill.classList.remove("dragging");
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rect = pill.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        let targetLeft;
        if (centerX < screenW / 2) {
          targetLeft = 24;
          pill.classList.remove("side-right");
          pill.classList.add("side-left");
        } else {
          targetLeft = screenW - rect.width - 24;
          pill.classList.remove("side-left");
          pill.classList.add("side-right");
        }
        let targetTop = Math.max(24, Math.min(rect.top, screenH - rect.height - 24));
        setTimeout(() => {
          pill.style.setProperty("transition", "left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)", "important");
          pill.style.left = `${targetLeft}px`;
          pill.style.top = `${targetTop}px`;
          pill.style.bottom = "auto";
          pill.style.transform = "";
        }, 10);
        setTimeout(() => {
          pill.style.transition = "";
          pill.style.removeProperty("transition");
        }, 700);
      } else {
        const isAnyActive = pill.querySelector(".cw-btn.active");
        const isBtnClick = e.target.closest("button");
        if (pill.classList.contains("collapsed")) {
          const rect = pill.getBoundingClientRect();
          const screenH = window.innerHeight;
          const isBottomHalf = rect.top > screenH / 2;
          pill.style.setProperty("transition", "none", "important");
          if (isBottomHalf) {
            const currentBottom = screenH - rect.bottom;
            pill.style.top = "auto";
            pill.style.bottom = `${currentBottom}px`;
          } else {
            pill.style.bottom = "auto";
            pill.style.top = `${rect.top}px`;
          }
          void pill.offsetWidth;
          pill.style.removeProperty("transition");
          pill.classList.remove("collapsed");
          SoundManager.playGenieOpen();
        } else {
          if (!isAnyActive && !isBtnClick) {
            pill.classList.add("collapsed");
            SoundManager.playGenieOpen();
          }
        }
        if (isBtnClick) {
          isBtnClick.style.transform = "scale(0.9)";
          setTimeout(() => isBtnClick.style.transform = "", 150);
        }
      }
    }
  }
  function triggerProcessingAnimation() {
    const pill = document.querySelector(".cw-pill");
    const overlay = document.querySelector(".cw-focus-backdrop");
    if (!pill) return () => {
    };
    pill.classList.remove("collapsed");
    window._CW_ABORT_PROCESS = false;
    const stage = document.createElement("div");
    stage.className = "cw-center-stage";
    stage.innerHTML = `
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${DataService.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;
    const abortBtn = document.createElement("div");
    abortBtn.className = "cw-abort-btn";
    abortBtn.textContent = "Cancelar";
    abortBtn.onclick = (e) => {
      e.stopPropagation();
      window._CW_ABORT_PROCESS = true;
      showToast("Cancelado!", { duration: 3e3 });
      stage.remove();
      pill.classList.remove("processing-center");
      pill.classList.remove("success");
      pill.classList.add("collapsed");
      if (overlay) overlay.classList.remove("active");
    };
    stage.appendChild(abortBtn);
    pill.appendChild(stage);
    const startTime = Date.now();
    pill.classList.add("processing-center");
    if (overlay) overlay.classList.add("active");
    return function finish() {
      if (window._CW_ABORT_PROCESS || !pill.contains(stage)) return;
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 2e3 - elapsed);
      setTimeout(() => {
        if (window._CW_ABORT_PROCESS || !pill.contains(stage)) return;
        const dots = stage.querySelector(".cw-center-dots");
        const text = stage.querySelector(".cw-center-text");
        const success = stage.querySelector(".cw-center-success");
        const abort = stage.querySelector(".cw-abort-btn");
        if (dots) dots.style.display = "none";
        if (text) text.style.display = "none";
        if (abort) abort.style.display = "none";
        if (success) success.classList.add("show");
        pill.classList.add("success");
        setTimeout(() => {
          pill.classList.remove("processing-center");
          setTimeout(() => {
            stage.remove();
            pill.classList.remove("success");
            pill.classList.add("collapsed");
            if (overlay) overlay.classList.remove("active");
          }, 400);
        }, 1e3);
      }, remaining);
    };
  }

  // src/modules/notes/drafts/draft-ui.js
  function createDraftsManager(callbacks) {
    const { onSaveCurrent, onLoadDraft, t } = callbacks;
    const parkButton = document.createElement("button");
    parkButton.className = "js-btn-park";
    parkButton.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${t("guardar")}</span>
    `;
    parkButton.style.cssText = `
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${RADIUS.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${COLORS.surface};
        color: ${COLORS.textSub};
        border: 1px solid ${COLORS.border};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ${EASE};
        box-shadow: ${SHADOW.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `;
    parkButton.onmouseenter = () => {
      parkButton.style.backgroundColor = "#F8F9FA";
      parkButton.style.borderColor = "#202124";
      parkButton.style.color = "#202124";
      parkButton.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      parkButton.style.transform = "translateY(-1px)";
    };
    parkButton.onmouseleave = () => {
      parkButton.style.backgroundColor = "#FFFFFF";
      parkButton.style.borderColor = "#DADCE0";
      parkButton.style.color = "#5F6368";
      parkButton.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)";
      parkButton.style.transform = "translateY(0)";
    };
    parkButton.onmousedown = () => parkButton.style.transform = "scale(0.96)";
    parkButton.onmouseup = () => parkButton.style.transform = "scale(1) translateY(-1px)";
    parkButton.onclick = async () => {
      const confirmed = await confirmDialog("Deseja guardar o rascunho atual e limpar os campos?");
      if (confirmed) {
        try {
          const stateData = await onSaveCurrent();
          if (stateData) {
            DraftService.save(stateData);
            renderDrawerList();
            updateBadge();
            SoundManager.playSuccess();
            showToast("Rascunho salvo com sucesso!");
          } else {
            showToast("Erro: N\xE3o foi poss\xEDvel ler os dados.", { error: true });
          }
        } catch (e) {
          console.error("Erro ao salvar rascunho:", e);
          showToast("Erro ao salvar.", { error: true });
        }
      }
    };
    const historyBtnWrapper = document.createElement("div");
    historyBtnWrapper.title = "Meus Rascunhos";
    historyBtnWrapper.style.cssText = "position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;";
    historyBtnWrapper.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>`;
    const badge = document.createElement("div");
    badge.style.cssText = "position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;";
    historyBtnWrapper.appendChild(badge);
    historyBtnWrapper.onmouseenter = () => historyBtnWrapper.style.background = "rgba(0,0,0,0.05)";
    historyBtnWrapper.onmouseleave = () => historyBtnWrapper.style.background = "transparent";
    historyBtnWrapper.onclick = (e) => {
      e.stopPropagation();
      toggleDrawer();
    };
    function updateBadge() {
      const count = DraftService.getCount();
      updateNotesBadge(count > 0);
      if (count > 0) {
        badge.style.display = "block";
        badge.textContent = count;
        badge.animate([
          { transform: "scale(1)" },
          { transform: "scale(1.5)" },
          { transform: "scale(1)" }
        ], { duration: 200 });
      } else {
        badge.style.display = "none";
      }
    }
    const drawer = document.createElement("div");
    drawer.style.cssText = `
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${COLORS.surface}; z-index: 100;
        border-radius: ${RADIUS.large} ${RADIUS.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${EASE};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;
    const drawerHeader = document.createElement("div");
    drawerHeader.style.cssText = "padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;";
    drawerHeader.innerHTML = `<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${t("rascunhos_salvos")}</span>`;
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    closeBtn.style.cssText = "background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;";
    closeBtn.onmouseenter = () => closeBtn.style.background = "#F1F3F4";
    closeBtn.onmouseleave = () => closeBtn.style.background = "transparent";
    closeBtn.onclick = () => toggleDrawer(false);
    drawerHeader.appendChild(closeBtn);
    const drawerList = document.createElement("div");
    drawerList.style.cssText = "flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;";
    drawer.appendChild(drawerHeader);
    drawer.appendChild(drawerList);
    function toggleDrawer(forceState) {
      const isOpen = drawer.style.transform === "translateY(0%)";
      const shouldOpen = forceState !== void 0 ? forceState : !isOpen;
      if (shouldOpen) {
        renderDrawerList();
        drawer.style.transform = "translateY(0%)";
      } else {
        drawer.style.transform = "translateY(110%)";
      }
    }
    function renderDrawerList() {
      const drafts = DraftService.getAll();
      drawerList.innerHTML = "";
      if (drafts.length === 0) {
        drawerList.innerHTML = `
                <div style="text-align:center; padding:80px 20px; color:${COLORS.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${t("nenhum_rascunho")}</div>
                </div>`;
        return;
      }
      drafts.forEach((draft) => {
        const card = document.createElement("div");
        card.style.cssText = `
                background: ${COLORS.surface}; padding: 20px; border-radius: ${RADIUS.large};
                border: 1.5px solid ${COLORS.bgInput}; box-shadow: ${SHADOW.subtle};
                position: relative; transition: all 0.3s ${EASE};
            `;
        const date = new Date(draft.timestamp);
        const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        let tagsHtml = "";
        if (draft.summaryTags && draft.summaryTags.length > 0) {
          const tagsStr = draft.summaryTags.slice(0, 3).join(", ") + (draft.summaryTags.length > 3 ? "..." : "");
          tagsHtml = `<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${tagsStr}</div>`;
        }
        card.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${draft.clientName || "Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${timeStr}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${draft.cid || "---"}</span>
                    <span style="display:block; color:${draft.status === "NI" ? "#E37400" : "#1E8E3E"}">\u25CF ${draft.subStatus || draft.status || "Sem Status"}</span>
                    ${tagsHtml}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;
        const btnResume = card.querySelector(".cw-resume-btn");
        btnResume.onclick = async () => {
          const confirmed = await confirmDialog("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.");
          if (confirmed) {
            onLoadDraft(draft);
            DraftService.delete(draft.id);
            renderDrawerList();
            updateBadge();
            toggleDrawer(false);
            SoundManager.playSwoosh();
            showToast("Rascunho carregado.");
          }
        };
        const btnDel = card.querySelector(".cw-del-btn");
        btnDel.onclick = async () => {
          const confirmed = await confirmDialog("Excluir este rascunho?", { danger: true });
          if (confirmed) {
            DraftService.delete(draft.id);
            renderDrawerList();
            updateBadge();
          }
        };
        drawerList.appendChild(card);
      });
    }
    updateBadge();
    return {
      parkButton,
      historyBtnWrapper,
      drawer
    };
  }

  // src/modules/notes/notes-bridge.js
  var esperar5 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  function simularCliqueReal(elemento) {
    if (!elemento) return;
    const opts = { bubbles: true, cancelable: true, view: window };
    ["mouseover", "mousedown", "mouseup", "click"].forEach(
      (evt) => elemento.dispatchEvent(new MouseEvent(evt, opts))
    );
  }
  function copyHtmlToClipboard(html) {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.innerHTML = html;
    document.body.appendChild(container);
    const range = document.createRange();
    range.selectNodeContents(container);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand("copy");
    } catch (err) {
      showToast("Falha ao copiar", { error: true });
    }
    selection.removeAllRanges();
    document.body.removeChild(container);
  }
  function triggerInputEvents(element) {
    const events = ["input", "change", "keydown", "keyup"];
    events.forEach((eventType) => {
      const event = new Event(eventType, { bubbles: true, cancelable: true });
      element.dispatchEvent(event);
    });
  }
  function getAllEditors() {
    return Array.from(document.querySelectorAll('div[contenteditable="true"]'));
  }
  async function ensureNoteCardIsOpen() {
    console.log("Iniciando processo de Nova Nota...");
    const editoresAntes = getAllEditors();
    const qtdAntes = editoresAntes.length;
    const icones = Array.from(document.querySelectorAll("i.material-icons-extended"));
    const iconeNota = icones.find((el) => el.innerText.trim() === "description");
    if (iconeNota) {
      const btnAlvo = iconeNota.closest("material-fab") || iconeNota.closest("material-button");
      if (btnAlvo) {
        if (btnAlvo.style) {
          btnAlvo.style.display = "block";
          btnAlvo.style.visibility = "visible";
        }
        simularCliqueReal(btnAlvo);
      } else {
        simularCliqueReal(iconeNota);
      }
    } else {
      const speedDial = document.querySelector("material-fab-speed-dial");
      if (speedDial) {
        const trigger = speedDial.querySelector(".trigger");
        if (trigger) {
          trigger.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
          simularCliqueReal(trigger);
        } else {
          speedDial.click();
        }
        await esperar5(800);
        const iconesAgora = Array.from(document.querySelectorAll("i.material-icons-extended"));
        const btnAgora = iconesAgora.find((el) => el.innerText.trim() === "description");
        if (btnAgora) simularCliqueReal(btnAgora);
      }
    }
    let novoEditor = null;
    let tentativas = 0;
    while (!novoEditor && tentativas < 20) {
      await esperar5(300);
      const editoresAgora = getAllEditors();
      if (editoresAgora.length > qtdAntes) {
        novoEditor = editoresAgora.find((e) => !editoresAntes.includes(e));
        if (!novoEditor) novoEditor = editoresAgora[editoresAgora.length - 1];
      } else if (tentativas > 10) {
        const visible = editoresAgora.filter((e) => e.offsetParent !== null);
        if (visible.length > 0) novoEditor = visible[visible.length - 1];
      }
      tentativas++;
    }
    return novoEditor;
  }

  // src/modules/notes/components/split-transfer.js
  function createSplitTransferComponent(onBack) {
    const container = document.createElement("div");
    container.style.cssText = "display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";
    const scrollArea = document.createElement("div");
    scrollArea.style.cssText = "flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";
    const headerShadow = document.createElement("div");
    headerShadow.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;";
    container.appendChild(headerShadow);
    container.appendChild(scrollArea);
    scrollArea.addEventListener("scroll", () => {
      headerShadow.style.boxShadow = scrollArea.scrollTop > 10 ? "0 4px 12px rgba(0,0,0,0.05)" : "none";
    });
    const styles = {
      section: `margin-bottom: 24px; animation: fadeIn 0.3s ease;`,
      sectionTitle: `font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;`,
      label: `display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;`,
      inputWrapper: `margin-bottom: 14px; position: relative;`,
      input: `width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;`,
      inputError: `border-color: #D93025; background: #FFF4F4;`,
      textarea: `min-height: 80px; resize: vertical; line-height: 1.5;`,
      // Segmented Control (Radios)
      radioGroup: `display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;`,
      radioLabel: `flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;`,
      radioActive: `background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);`,
      // Banner
      banner: `background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;`,
      // Hidden Field Transition
      hiddenField: `display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;`,
      visibleField: `display: block; opacity: 1; transform: translateY(0);`
    };
    const fields = {};
    function createField({ id, label, type = "text", placeholder = "", required = false, parent = scrollArea }) {
      const wrapper = document.createElement("div");
      wrapper.style.cssText = styles.inputWrapper;
      const lbl = document.createElement("label");
      lbl.style.cssText = styles.label;
      lbl.innerHTML = `${label} ${required ? '<span style="color:#D93025">*</span>' : ""}`;
      let input;
      if (type === "textarea") {
        input = document.createElement("textarea");
        input.style.cssText = styles.input + styles.textarea;
      } else {
        input = document.createElement("input");
        input.type = type;
        input.style.cssText = styles.input;
      }
      input.id = id;
      input.placeholder = placeholder;
      input.addEventListener("focus", () => {
        input.style.borderColor = "#1a73e8";
        input.style.boxShadow = "0 0 0 2px rgba(26,115,232,0.15)";
      });
      input.addEventListener("blur", () => {
        input.style.borderColor = "#DADCE0";
        input.style.boxShadow = "none";
        if (required && input.value.trim() !== "") {
          input.style.backgroundColor = "#FFF";
        }
      });
      fields[id] = { input, wrapper, required };
      wrapper.appendChild(lbl);
      wrapper.appendChild(input);
      parent.appendChild(wrapper);
      return wrapper;
    }
    function createRadio({ id, label, options = ["Yes", "No"], defaultValue = "No", onChange = null }) {
      const wrapper = document.createElement("div");
      wrapper.style.cssText = styles.inputWrapper;
      const lbl = document.createElement("label");
      lbl.style.cssText = styles.label;
      lbl.textContent = label;
      wrapper.appendChild(lbl);
      const group = document.createElement("div");
      group.style.cssText = styles.radioGroup;
      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.id = id;
      hiddenInput.value = defaultValue;
      wrapper.appendChild(hiddenInput);
      options.forEach((opt) => {
        const btn = document.createElement("div");
        btn.textContent = opt;
        btn.style.cssText = styles.radioLabel;
        const isActive = opt === defaultValue;
        if (isActive) btn.style.cssText += styles.radioActive;
        btn.onclick = () => {
          Array.from(group.children).forEach((c) => c.style.cssText = styles.radioLabel);
          btn.style.cssText += styles.radioActive;
          hiddenInput.value = opt;
          if (onChange) onChange(opt);
        };
        group.appendChild(btn);
      });
      fields[id] = { input: hiddenInput, wrapper, required: false };
      wrapper.appendChild(group);
      scrollArea.appendChild(wrapper);
      return wrapper;
    }
    const banner = document.createElement("div");
    banner.style.cssText = styles.banner;
    banner.innerHTML = `
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `;
    scrollArea.appendChild(banner);
    const magicContainer = document.createElement("div");
    magicContainer.style.marginBottom = "24px";
    const btnMagic = document.createElement("button");
    btnMagic.innerHTML = `\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina`;
    btnMagic.style.cssText = "width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;";
    btnMagic.onmouseover = () => btnMagic.style.background = "#E1EFFF";
    btnMagic.onmouseout = () => btnMagic.style.background = "#F0F7FF";
    magicContainer.appendChild(btnMagic);
    scrollArea.appendChild(magicContainer);
    const techSection = document.createElement("div");
    techSection.style.cssText = styles.section;
    techSection.innerHTML = `<div style="${styles.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`;
    scrollArea.appendChild(techSection);
    createField({ id: "cid", label: "Ads CID", placeholder: "000-000-0000", required: true, parent: techSection });
    createField({ id: "ga4", label: "GA4 Property ID", parent: techSection });
    createField({ id: "gtm", label: "GTM Container ID", parent: techSection });
    const emailWrapper = document.createElement("div");
    emailWrapper.style.cssText = styles.hiddenField;
    techSection.appendChild(emailWrapper);
    createRadio({
      id: "hasAccess",
      label: "Advertiser has access to GA4/GTM?",
      defaultValue: "No",
      onChange: (val) => {
        if (val === "Yes") {
          emailWrapper.style.cssText = styles.visibleField + "margin-bottom:14px;";
        } else {
          emailWrapper.style.cssText = styles.hiddenField;
          fields["accessEmail"].input.value = "";
        }
      }
    });
    createField({ id: "accessEmail", label: "User Access Email", parent: emailWrapper });
    createRadio({ id: "ghosting", label: "Ghosting Available?", defaultValue: "No" });
    const contactSection = document.createElement("div");
    contactSection.style.cssText = styles.section;
    contactSection.innerHTML = `<div style="${styles.sectionTitle}">\u{1F4DE} Contato & Problema</div>`;
    scrollArea.appendChild(contactSection);
    createField({ id: "name", label: "Advertiser Name", required: true, parent: contactSection });
    createField({ id: "url", label: "Website URL", parent: contactSection });
    createField({ id: "phone", label: "Phone Number", parent: contactSection });
    createField({ id: "email", label: "Contact Email", parent: contactSection });
    createField({ id: "callback", label: "Preferred Callback Time (Timezone)", parent: contactSection });
    createField({ id: "desc", label: "Detailed Issue Description", type: "textarea", placeholder: "Descreva o erro, passos para reproduzir...", required: true, parent: contactSection });
    createField({ id: "checks", label: "Troubleshooting Performed", type: "textarea", placeholder: "O que voc\xEA j\xE1 testou?", parent: contactSection });
    createField({ id: "screens", label: "Screenshots (Links)", type: "textarea", parent: contactSection });
    const copySection = document.createElement("div");
    copySection.style.cssText = styles.section;
    copySection.innerHTML = `<div style="${styles.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`;
    scrollArea.appendChild(copySection);
    createField({ id: "cc_adv", label: "Advertiser Contact", parent: copySection });
    createField({ id: "cc_am", label: "Account Manager", parent: copySection });
    const footer = document.createElement("div");
    footer.style.cssText = "padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";
    const btnBack = document.createElement("button");
    btnBack.innerHTML = "Voltar";
    btnBack.style.cssText = "border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;";
    btnBack.onclick = onBack;
    const btnGenerate = document.createElement("button");
    btnGenerate.textContent = "Gerar Nota";
    btnGenerate.style.cssText = "padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;";
    footer.appendChild(btnBack);
    footer.appendChild(btnGenerate);
    container.appendChild(footer);
    btnMagic.onclick = async () => {
      const oldText = btnMagic.innerHTML;
      btnMagic.innerHTML = "\u23F3 Buscando dados...";
      try {
        const data = await getPageData();
        let filledCount = 0;
        const safeFill = (id, val) => {
          const f = fields[id];
          if (val && f && f.input.value === "") {
            f.input.value = val;
            f.input.style.backgroundColor = "#E6F4EA";
            f.input.style.borderColor = "#34A853";
            setTimeout(() => {
              f.input.style.backgroundColor = "#FFF";
              f.input.style.borderColor = "#DADCE0";
            }, 1e3);
            filledCount++;
          }
        };
        safeFill("name", data.advertiserName);
        safeFill("url", data.websiteUrl);
        if (data.clientEmail) {
          safeFill("email", data.clientEmail);
          safeFill("cc_adv", data.clientEmail);
        }
        const bodyText = document.body.innerText;
        const cidMatch = bodyText.match(/\d{3}-\d{3}-\d{4}/);
        if (cidMatch) safeFill("cid", cidMatch[0]);
        if (filledCount > 0) {
          showToast(`${filledCount} campos preenchidos!`);
        } else {
          showToast("Nenhum dado novo encontrado.");
        }
      } catch (e) {
        console.error(e);
        showToast("Erro ao ler p\xE1gina.");
      } finally {
        btnMagic.innerHTML = oldText;
      }
    };
    const validate = () => {
      let isValid = true;
      let firstError = null;
      Object.values(fields).forEach((field) => {
        if (field.required && !field.input.value.trim()) {
          isValid = false;
          field.input.style.cssText += styles.inputError;
          field.wrapper.animate([
            { transform: "translateX(0)" },
            { transform: "translateX(-5px)" },
            { transform: "translateX(5px)" },
            { transform: "translateX(0)" }
          ], { duration: 300 });
          if (!firstError) firstError = field.input;
        }
      });
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return isValid;
    };
    btnGenerate.onclick = async () => {
      if (!validate()) {
        showToast("Preencha os campos obrigat\xF3rios.", { isError: true });
        return;
      }
      const getVal = (id) => fields[id].input.value || "N/A";
      const hasAccess = getVal("hasAccess");
      const accessEmail = hasAccess === "Yes" ? getVal("accessEmail") : "N/A";
      const template = `Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${getVal("cid")}
<b>GA4 ID:</b> ${getVal("ga4")}
<b>GTM ID:</b> ${getVal("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${hasAccess === "Yes" ? "Y" : "N"}
<b>If Yes, user access email:</b> ${accessEmail}
<b>Ghosting Access Available (Y/N):</b> ${getVal("ghosting") === "Yes" ? "Y" : "N"}
<b>Name of advertiser:</b> ${getVal("name")}
<b>Website:</b> ${getVal("url")}
<b>Phone Number:</b> ${getVal("phone")}
<b>Preferred Callback:</b> ${getVal("callback")}
<b>Email Address:</b> ${getVal("email")}

<b>Detailed Issue Description:</b>
${getVal("desc")}

<b>Uncropped screenshots:</b>
${getVal("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${getVal("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${getVal("cc_adv")}
<b>Account Manager:</b> ${getVal("cc_am")}
`;
      const htmlToInsert = template.replace(/\n/g, "<br>");
      copyHtmlToClipboard(htmlToInsert);
      const editor = await ensureNoteCardIsOpen();
      if (editor) {
        if (editor.innerText.trim() === "") editor.innerHTML = "";
        document.execCommand("insertHTML", false, htmlToInsert);
        triggerInputEvents(editor);
        showToast("Nota gerada e inserida!");
      } else {
        showToast("Copiado! Abra uma nota para colar.");
      }
    };
    return container;
  }

  // src/modules/email-assistant/email-automation-service.js
  var esperar6 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  function log(msg, type = "info") {
    const styles = {
      info: "background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",
      warn: "background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",
      error: "background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",
      success: "background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"
    };
    console.log(`%c[EMAIL-BOT] ${msg}`, styles[type] || styles.info);
  }
  function simularCliqueReal2(elemento) {
    if (!elemento) return;
    const opts = { bubbles: true, cancelable: true, view: window };
    ["mouseover", "mousedown", "mouseup", "click"].forEach(
      (evt) => elemento.dispatchEvent(new MouseEvent(evt, opts))
    );
  }
  function createFloatingWarning(targetElement, message) {
    if (!targetElement) return;
    const existingId = `cw-warning-${targetElement.id || Math.random().toString(36).substr(2, 9)}`;
    const old = document.getElementById(existingId);
    if (old) old.remove();
    const rect = targetElement.getBoundingClientRect();
    const popup = document.createElement("div");
    popup.id = existingId;
    popup.style.cssText = `
        position: fixed;
        top: ${rect.bottom + 8}px;
        left: ${rect.left}px;
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
    `;
    popup.innerHTML = `
        <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:#F9AB00; font-size:16px; margin-top:1px;">\u26A0\uFE0F</span>
            <span style="line-height:1.4;">${message}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px;
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;
    const closeBtn = popup.querySelector(".cw-close-btn");
    closeBtn.onclick = () => {
      popup.style.opacity = "0";
      popup.style.transform = "translateY(-5px)";
      setTimeout(() => popup.remove(), 300);
    };
    document.body.appendChild(popup);
    requestAnimationFrame(() => {
      popup.style.opacity = "1";
      popup.style.transform = "translateY(0)";
    });
    setTimeout(() => {
      if (document.body.contains(popup)) closeBtn.click();
    }, 25e3);
  }
  async function fillField(inputElement, value) {
    if (!inputElement || !value) return;
    inputElement.focus();
    inputElement.value = "";
    inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    await esperar6(50);
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(inputElement, value);
    inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    inputElement.dispatchEvent(new Event("change", { bubbles: true }));
    await esperar6(100);
    inputElement.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true }));
    inputElement.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter", bubbles: true }));
  }
  function getVisibleEditor() {
    const todos = Array.from(document.querySelectorAll('[id="email-body-content-top-content"]'));
    const editor = todos.find((el) => {
      const isVisible = el.offsetParent !== null;
      const isReadOnly = el.closest("case-message-view") !== null;
      const isEditable = el.closest(".editor") !== null || el.closest("write-card") !== null;
      return isVisible && !isReadOnly && isEditable;
    });
    if (editor) log("Editor visualmente detectado.", "success");
    return editor;
  }
  async function openAndClearEmail() {
    log("\u{1F680} FASE 1: Tentando abrir a janela de email...");
    let emailAberto = false;
    const todosIcones = Array.from(document.querySelectorAll("i.material-icons-extended"));
    const iconeEmail = todosIcones.find((el) => el.innerText.trim() === "email");
    if (iconeEmail && iconeEmail.offsetParent !== null) {
      log("Bot\xE3o de email direto encontrado.");
      const botaoAlvo = iconeEmail.closest("material-button") || iconeEmail.closest("material-fab") || iconeEmail;
      simularCliqueReal2(botaoAlvo);
      emailAberto = true;
    } else {
      log("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...", "warn");
      const speedDial = document.querySelector("material-fab-speed-dial");
      if (speedDial) {
        const triggerBtn = speedDial.querySelector(".trigger");
        if (triggerBtn) {
          simularCliqueReal2(triggerBtn);
          await esperar6(800);
          const iconesNovos = Array.from(document.querySelectorAll("i.material-icons-extended"));
          const emailBtnNovo = iconesNovos.find((el) => el.innerText.trim() === "email");
          if (emailBtnNovo) {
            simularCliqueReal2(emailBtnNovo);
            emailAberto = true;
          }
        }
      }
    }
    if (!emailAberto) {
      showToast("Erro: Bot\xE3o de email n\xE3o encontrado.", { error: true });
      return false;
    }
    log("\u{1F680} FASE 2: Verificando rascunhos...");
    let draftButton = null;
    let attempts = 0;
    const MAX_ATTEMPTS = 20;
    while (attempts < MAX_ATTEMPTS) {
      await esperar6(250);
      const candidates = document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');
      draftButton = Array.from(candidates).find((el) => el.offsetParent !== null);
      if (draftButton) {
        log(`\u26A0\uFE0F Rascunho detectado!`, "warn");
        break;
      }
      attempts++;
    }
    if (draftButton) {
      log("\u{1F5D1}\uFE0F Descartando...");
      simularCliqueReal2(draftButton);
      draftButton.click();
      let confirmBtn = null;
      let confirmAttempts = 0;
      while (confirmAttempts < 15) {
        await esperar6(300);
        const confirms = document.querySelectorAll('material-button[debug-id="confirm-button"]');
        confirmBtn = Array.from(confirms).find((el) => el.offsetParent !== null);
        if (confirmBtn) break;
        confirmAttempts++;
      }
      if (confirmBtn) {
        simularCliqueReal2(confirmBtn);
        showToast("Limpando rascunho antigo...", { duration: 2e3 });
        await esperar6(2500);
      }
    }
    log("\u{1F680} FASE 3: Buscando editor final...");
    let tentativasEditor = 0;
    let editorVisivel = null;
    while (tentativasEditor < 20) {
      editorVisivel = getVisibleEditor();
      if (editorVisivel) break;
      await esperar6(250);
      tentativasEditor++;
    }
    if (!editorVisivel) {
      showToast("Erro: Editor n\xE3o carregou.", { error: true });
      return false;
    }
    const containerTopo = editorVisivel.closest('[id="email-body-content-top"]');
    const wrapperGeral = editorVisivel.closest(".email-body-content") || document.body;
    const editorPai = wrapperGeral.querySelector('div[contenteditable="true"][aria-label="Email body"]');
    if (containerTopo) {
      if (editorPai) {
        const ancestral = editorPai.closest('[aria-hidden="true"]');
        if (ancestral) ancestral.removeAttribute("aria-hidden");
        editorPai.focus();
        simularCliqueReal2(editorPai);
      }
      await esperar6(300);
      containerTopo.innerHTML = `
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;
      const novoElementoSagrado = containerTopo.querySelector("#cases-body-field");
      if (novoElementoSagrado) {
        const range = document.createRange();
        range.selectNodeContents(novoElementoSagrado);
        range.collapse(true);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
      return true;
    }
    return false;
  }
  async function runEmailAutomation(cannedResponseText) {
    if (!cannedResponseText) return;
    const emailPronto = await openAndClearEmail();
    if (!emailPronto) return;
    const pageData = await getPageData();
    log("\u{1F4E7} Processando destinat\xE1rios para CR...", "info");
    const expandBtn = document.querySelector('material-icon[aria-label="Show CC and BCC fields"]') || document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');
    if (expandBtn) {
      expandBtn.click();
      await esperar6(600);
    }
    if (pageData.clientEmail && pageData.clientEmail !== "N/A" && pageData.clientEmail !== "N/A (Bloqueado)") {
      const toInput = document.querySelector('input[aria-label="Enter To email address"]');
      if (toInput) {
        await fillField(toInput, pageData.clientEmail);
        createFloatingWarning(toInput, "<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente.");
      }
    }
    if (pageData.internalEmail) {
      const bccInput = document.querySelector('input[aria-label="Enter Bcc email address"]');
      if (bccInput) {
        await fillField(bccInput, pageData.internalEmail);
        const warningMsg = `<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.`;
        createFloatingWarning(bccInput, warningMsg);
      }
    }
    await esperar6(500);
    const btnCanned = document.querySelector('material-button[debug-id="canned_response_button"]');
    if (btnCanned) {
      simularCliqueReal2(btnCanned);
      await esperar6(1e3);
      const searchInput = document.querySelector("material-auto-suggest-input input");
      if (searchInput) {
        simularCliqueReal2(searchInput);
        document.execCommand("insertText", false, cannedResponseText);
        searchInput.dispatchEvent(new Event("input", { bubbles: true }));
        log("\u23F3 Buscando resultado da Canned Response...", "info");
        let primeiraOpcao = null;
        let tempoDecorrido = 0;
        const TEMPO_MAXIMO = 15e3;
        const INTERVALO = 500;
        while (tempoDecorrido < TEMPO_MAXIMO) {
          primeiraOpcao = document.querySelector("material-select-dropdown-item");
          if (primeiraOpcao) break;
          await esperar6(INTERVALO);
          tempoDecorrido += INTERVALO;
        }
        if (primeiraOpcao) {
          simularCliqueReal2(primeiraOpcao);
          await esperar6(1500);
          const editorVisivel = getVisibleEditor();
          if (editorVisivel) {
            const spans = Array.from(editorVisivel.querySelectorAll("span.field"));
            const ecw4Spans = spans.filter((s) => s.innerText.includes("{Requested Task Type}"));
            if (ecw4Spans.length > 0) {
              const rows = ecw4Spans.map((s) => s.closest("tr")).filter((tr) => tr !== null);
              const uniqueRows = [...new Set(rows)];
              if (uniqueRows.length > 0) {
                const firstRow = uniqueRows[0];
                const targetCell = firstRow.querySelector('td[width="100%"]');
                if (targetCell) {
                  targetCell.innerHTML = '<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>';
                }
                for (let i = 1; i < uniqueRows.length; i++) {
                  uniqueRows[i].remove();
                }
              }
            }
            let html = editorVisivel.innerHTML;
            if (pageData.advertiserName && html.includes("{%ADVERTISER_NAME%}")) {
              html = html.replace(/{%ADVERTISER_NAME%}/g, pageData.advertiserName);
            }
            if (html.includes("{%^79285%}")) {
              html = html.replace(/{%\^79285%}/g, pageData.websiteUrl || "seu site");
            }
            editorVisivel.innerHTML = html;
          }
          showToast("Canned Response aplicada!");
        } else {
          log(`\u274C Timeout: Resultado '${cannedResponseText}' n\xE3o apareceu ap\xF3s 15s.`, "error");
          showToast(`Timeout: Template '${cannedResponseText}' n\xE3o carregou.`, { error: true });
        }
      }
    } else {
      showToast("Bot\xE3o Canned Response n\xE3o encontrado.", { error: true });
    }
  }
  async function runQuickEmail(template) {
    log(`\u{1F680} Iniciando Quick Email: ${template.name}`);
    const emailPronto = await openAndClearEmail();
    if (!emailPronto) return;
    const pageData = await getPageData();
    const agentName = getAgentName();
    await esperar6(600);
    const expandBtn = document.querySelector('material-icon[aria-label="Show CC and BCC fields"]') || document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');
    if (expandBtn) {
      expandBtn.click();
      await esperar6(600);
    }
    if (pageData.clientEmail && pageData.clientEmail !== "N/A" && pageData.clientEmail !== "N/A (Bloqueado)") {
      const toInput = document.querySelector('input[aria-label="Enter To email address"]');
      if (toInput) {
        await fillField(toInput, pageData.clientEmail);
        createFloatingWarning(toInput, "<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente.");
      }
    }
    if (pageData.internalEmail) {
      const bccInput = document.querySelector('input[aria-label="Enter Bcc email address"]');
      if (bccInput) {
        await fillField(bccInput, pageData.internalEmail);
        const warningMsg = `<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.`;
        createFloatingWarning(bccInput, warningMsg);
      }
    }
    const subjectInput = document.querySelector('input[aria-label="Subject"]');
    if (subjectInput && template.subject) {
      subjectInput.focus();
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      nativeInputValueSetter.call(subjectInput, template.subject);
      subjectInput.dispatchEvent(new Event("input", { bubbles: true }));
      await esperar6(300);
    }
    const editorVisivel = getVisibleEditor();
    if (editorVisivel) {
      const wrapperGeral = editorVisivel.closest(".email-body-content") || document.body;
      const editorPai = wrapperGeral.querySelector('div[contenteditable="true"][aria-label="Email body"]');
      if (editorPai) {
        editorPai.focus();
        simularCliqueReal2(editorPai);
      }
      const date = /* @__PURE__ */ new Date();
      date.setDate(date.getDate() + 3);
      const day = date.getDay();
      if (day === 6) date.setDate(date.getDate() + 2);
      else if (day === 0) date.setDate(date.getDate() + 1);
      const dataFormatada = date.toLocaleDateString("pt-BR");
      let finalBody = template.body;
      finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || "Cliente");
      finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || "seu site");
      finalBody = finalBody.replace(/\[URL\]/g, pageData.websiteUrl || "seu site");
      finalBody = finalBody.replace(/\[Seu Nome\]/g, agentName);
      finalBody = finalBody.replace(/\[MM\/DD\/YYYY\]/g, dataFormatada);
      document.execCommand("insertHTML", false, finalBody);
      if (editorPai) {
        editorPai.dispatchEvent(new Event("input", { bubbles: true }));
        editorPai.dispatchEvent(new Event("change", { bubbles: true }));
      }
      showToast("Email preenchido com sucesso!", { duration: 2e3 });
      log("\u2705 Processo finalizado com sucesso.", "success");
    } else {
      showToast("Erro ao focar no editor.", { error: true });
    }
  }

  // src/modules/shared/animations.js
  if (!document.getElementById("cw-module-styles")) {
    const style = document.createElement("style");
    style.id = "cw-module-styles";
    style.innerHTML = `
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
    `;
    document.head.appendChild(style);
  }
  function toggleGenieAnimation(show, popup, buttonId) {
    const btn = document.getElementById(buttonId);
    if (!popup) return;
    const isCustomPosition = popup.getAttribute("data-moved") === "true";
    let btnCenter = { x: 0, y: 0 };
    if (btn) {
      const btnRect = btn.getBoundingClientRect();
      btnCenter.x = btnRect.left + btnRect.width / 2;
      btnCenter.y = btnRect.top + btnRect.height / 2;
    }
    let destX, destY;
    if (!isCustomPosition) {
      destX = window.innerWidth / 2;
      destY = window.innerHeight / 2;
    } else {
      const rect = popup.getBoundingClientRect();
      destX = rect.left + rect.width / 2;
      destY = rect.top + rect.height / 2;
      if (destX === 0 && destY === 0) {
        destX = window.innerWidth / 2;
        destY = window.innerHeight / 2;
      }
    }
    const deltaX = btnCenter.x - destX;
    const deltaY = btnCenter.y - destY;
    if (show) {
      SoundManager.playGenieOpen();
      popup.style.transition = "none";
      popup.style.opacity = "0";
      popup.style.pointerEvents = "auto";
      if (!isCustomPosition) {
        popup.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.05)`;
      } else {
        popup.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.05)`;
      }
      void popup.offsetWidth;
      requestAnimationFrame(() => {
        popup.classList.add("open");
        if (btn) btn.classList.add("active");
        popup.style.transition = "opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)";
        popup.style.opacity = "1";
        if (!isCustomPosition) {
          popup.style.transform = "translate(-50%, -50%) scale(1)";
        } else {
          popup.style.transform = "translate(0, 0) scale(1)";
        }
      });
      if (typeof setupIdleListener === "function") setupIdleListener(popup, buttonId);
    } else {
      SoundManager.playSwoosh();
      popup.style.transition = "opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)";
      popup.style.pointerEvents = "none";
      requestAnimationFrame(() => {
        popup.style.opacity = "0";
        if (!isCustomPosition) {
          popup.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.1)`;
        } else {
          popup.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1)`;
        }
      });
      setTimeout(() => {
        popup.classList.remove("open");
        if (btn) btn.classList.remove("active");
        popup.style.transition = "";
        popup.style.transform = "";
      }, 300);
      if (typeof removeIdleListener === "function") removeIdleListener(popup);
    }
  }
  function setupIdleListener(popup, buttonId) {
    removeIdleListener(popup);
    const handler = (e) => {
      if (!popup.classList.contains("open")) return;
      const clickInModule = popup.contains(e.target);
      const pill = document.querySelector(".cw-pill");
      const clickInPill = pill && pill.contains(e.target);
      if (clickInModule) {
        popup.classList.remove("idle");
        popup.style.zIndex = "2147483648";
      } else if (clickInPill) {
      } else {
        popup.classList.add("idle");
        popup.style.zIndex = "2147483646";
      }
    };
    popup._idleHandler = handler;
    document.addEventListener("mousedown", handler);
  }
  function removeIdleListener(popup) {
    if (popup._idleHandler) {
      document.removeEventListener("mousedown", popup._idleHandler);
      popup._idleHandler = null;
    }
  }

  // src/modules/notes/notes-assistant.js
  function initCaseNotesAssistant() {
    const CURRENT_VERSION = "v4.0.0";
    const { popup, content, header, animRefs, credit } = createNotesPopup(CURRENT_VERSION, toggleVisibility);
    const tagSupport = createTagSupportModule(t);
    const stepTasks = createStepTasksComponent(() => {
      updateTagSupport();
      notesState.setActiveTasks(stepTasks.getCheckedElements());
    }, t, notesState);
    const scenariosContainer = document.createElement("div");
    scenariosContainer.style.display = "none";
    const scenarioSelector = createScenariosComponent((scenarioId, isSelected) => {
      applyScenario(scenarioId, isSelected);
    });
    scenariosContainer.appendChild(scenarioSelector);
    const draftsManager = createDraftsManager({
      onSaveCurrent: async () => {
        const state = await collectFullState();
        resetModule();
        return state;
      },
      onLoadDraft: (draft) => {
        restoreFullState(draft);
      },
      t: (key) => t(key)
    });
    const langTypeSection = createLangTypeSection();
    const statusSection = createStatusSection();
    const dynamicFormContainer = document.createElement("div");
    const emptyStateContainer = createEmptyState();
    const actionsSection = createActionsSection(draftsManager, t);
    content.appendChild(langTypeSection);
    content.appendChild(statusSection);
    content.appendChild(emptyStateContainer);
    content.appendChild(scenariosContainer);
    content.appendChild(dynamicFormContainer);
    stepTasks.selectionElement.style.display = "none";
    stepTasks.screenshotsElement.style.display = "none";
    const manualTaskBtn = document.createElement("button");
    manualTaskBtn.id = "manual-task-toggle";
    manualTaskBtn.textContent = t("gostaria_de_adicionar_uma_task") || "Gostaria de adicionar uma task";
    manualTaskBtn.style.cssText = `display: none; width: 100%; padding: 14px; border: 2px dashed ${COLORS.primary}; background: ${COLORS.surface}; color: ${COLORS.primary}; border-radius: ${RADIUS.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${EASE}; text-transform: uppercase; letter-spacing: 0.5px;`;
    manualTaskBtn.onmouseenter = () => {
      manualTaskBtn.style.background = COLORS.primaryBg;
    };
    manualTaskBtn.onmouseleave = () => {
      manualTaskBtn.style.background = COLORS.surface;
    };
    manualTaskBtn.onclick = () => {
      stepTasks.selectionElement.style.display = "block";
      stepTasks.screenshotsElement.style.display = "block";
      manualTaskBtn.style.display = "none";
    };
    content.appendChild(manualTaskBtn);
    content.appendChild(stepTasks.selectionElement);
    content.appendChild(tagSupport.element);
    content.appendChild(stepTasks.screenshotsElement);
    content.appendChild(actionsSection);
    const splitContent = document.createElement("div");
    splitContent.style.display = "none";
    splitContent.style.flexGrow = "1";
    splitContent.style.minHeight = "0";
    splitContent.style.overflow = "hidden";
    const splitComponent = createSplitTransferComponent(() => toggleSplitView());
    splitComponent.style.height = "100%";
    splitContent.appendChild(splitComponent);
    popup.insertBefore(splitContent, credit);
    const headerActions = header.lastElementChild;
    if (headerActions) {
      headerActions.insertBefore(draftsManager.historyBtnWrapper, headerActions.firstChild);
      headerActions.insertBefore(createSplitToggleButton(), headerActions.firstChild);
    }
    popup.appendChild(draftsManager.drawer);
    let autosaveTimeout = null;
    notesState.subscribe((state) => {
      updateUIFromState(state);
      refreshGlobalBadge();
      if (state.isDirty) {
        if (autosaveTimeout) clearTimeout(autosaveTimeout);
        autosaveTimeout = setTimeout(async () => {
          const fullState = await collectFullState(true);
          if (fullState.subStatus) {
            DraftService.saveEmergency(fullState);
          } else {
            DraftService.clearEmergency();
          }
          state.isDirty = false;
        }, 2e3);
      } else {
        if (autosaveTimeout) {
          clearTimeout(autosaveTimeout);
          autosaveTimeout = null;
        }
      }
    });
    function refreshGlobalBadge() {
      const hasDrafts = DraftService.getCount() > 0;
      const isWriting = !!notesState.currentSubStatus;
      updateNotesBadge(hasDrafts || isWriting);
    }
    function toggleVisibility() {
      notesState.visible = !notesState.visible;
      toggleGenieAnimation(notesState.visible, popup, "cw-btn-notes");
    }
    function toggleSplitView() {
      notesState.isSplitView = !notesState.isSplitView;
      if (notesState.isSplitView) {
        content.style.display = "none";
        splitContent.style.display = "flex";
        splitContent.style.flexDirection = "column";
        if (animRefs.googleLine) animRefs.googleLine.style.background = "linear-gradient(to right, #8e24aa, #7b1fa2)";
      } else {
        content.style.display = "flex";
        splitContent.style.display = "none";
        if (animRefs.googleLine) animRefs.googleLine.style.background = "linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)";
      }
    }
    function createLangTypeSection() {
      const div = document.createElement("div");
      div.innerHTML = `
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-idioma" style="font-size: 10px; margin-bottom: 6px;">${t("idioma")}</div>
                    <div class="cw-segmented-control" id="lang-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-lang="pt" class="active" style="z-index:2">PT</button>
                        <button data-lang="es" style="z-index:2">ES</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${t("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${t("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${t("nao")}</button>
                        <button data-val="true" style="z-index:2">${t("sim")}</button>
                    </div>
                </div>
            </div>
        `;
      if (!document.getElementById("cw-segmented-styles")) {
        const style = document.createElement("style");
        style.id = "cw-segmented-styles";
        style.innerHTML = `
                .cw-segmented-control {
                    display: flex;
                    background: ${COLORS.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${COLORS.border};
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
                    transition: all 0.3s ${EASE};
                    color: ${COLORS.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${COLORS.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${COLORS.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `;
        document.head.appendChild(style);
      }
      const updateIndicator = (selectorId, index) => {
        const selector = div.querySelector(`#${selectorId}`);
        const indicator = selector.querySelector(".cw-segmented-indicator");
        if (indicator) {
          indicator.style.transform = `translateX(${index * 100}%) translateX(${index * 2}px)`;
        }
      };
      div.querySelectorAll("#lang-selector button").forEach((btn, idx) => {
        btn.onclick = () => {
          notesState.setLanguage(btn.dataset.lang);
          div.querySelectorAll("#lang-selector button").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          updateIndicator("lang-selector", idx);
          SoundManager.playHover();
          if (notesState.currentSubStatus) {
            onSubStatusChange(notesState.currentSubStatus);
          }
        };
      });
      div.querySelectorAll("#type-selector button").forEach((btn, idx) => {
        btn.onclick = () => {
          notesState.setCaseType(btn.dataset.type);
          div.querySelectorAll("#type-selector button").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          updateIndicator("type-selector", idx);
          SoundManager.playHover();
          if (notesState.currentSubStatus) {
            onSubStatusChange(notesState.currentSubStatus);
          }
        };
      });
      div.querySelectorAll("#portugal-selector button").forEach((btn, idx) => {
        btn.onclick = () => {
          notesState.setPortugalCase(btn.dataset.val === "true");
          div.querySelectorAll("#portugal-selector button").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          updateIndicator("portugal-selector", idx);
          SoundManager.playHover();
          if (notesState.currentSubStatus) {
            onSubStatusChange(notesState.currentSubStatus);
          }
        };
      });
      return div;
    }
    function createStatusSection() {
      const div = document.createElement("div");
      div.className = "cw-status-section";
      div.style.cssText = "display: flex; flex-direction: column; gap: 8px;";
      div.innerHTML = `
            <div class="cw-section-title js-label-status" style="margin-top: 8px;">${t("status_principal")}</div>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${t("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <div class="cw-section-title js-label-substatus" style="margin-top: 8px;">${t("substatus")}</div>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${t("select_substatus")}</option>
            </select>
        `;
      const mainSelect = div.querySelector("#main-status-select");
      const subSelect = div.querySelector("#sub-status-select");
      mainSelect.onchange = () => {
        notesState.setStatus(mainSelect.value);
        updateSubStatusOptions(mainSelect.value, subSelect);
        notesState.setSubStatus("");
        onSubStatusChange("");
      };
      subSelect.onchange = () => {
        notesState.setSubStatus(subSelect.value);
        onSubStatusChange(subSelect.value);
      };
      return div;
    }
    function updateSubStatusOptions(status, subSelect) {
      subSelect.innerHTML = `<option value="">${t("select_substatus")}</option>`;
      if (!status) {
        subSelect.disabled = true;
        return;
      }
      for (const key in SUBSTATUS_TEMPLATES) {
        if (SUBSTATUS_TEMPLATES[key].status === status) {
          const opt = document.createElement("option");
          opt.value = key;
          opt.textContent = SUBSTATUS_TEMPLATES[key].name;
          subSelect.appendChild(opt);
        }
      }
      subSelect.disabled = false;
    }
    function onSubStatusChange(subStatusKey) {
      if (scenarioSelector.render) {
        scenarioSelector.render(subStatusKey, notesState.currentCaseType);
      }
      if (!subStatusKey) {
        scenariosContainer.style.display = "none";
        dynamicFormContainer.style.display = "none";
        document.getElementById("manual-task-toggle").style.display = "none";
        stepTasks.selectionElement.style.display = "none";
        stepTasks.screenshotsElement.style.display = "none";
        emptyStateContainer.style.display = "flex";
        emptyStateContainer.style.opacity = "1";
        actionsSection.style.display = "none";
        return;
      }
      emptyStateContainer.style.opacity = "0";
      setTimeout(() => {
        if (notesState.currentSubStatus) emptyStateContainer.style.display = "none";
      }, 400);
      actionsSection.style.display = "grid";
      const templateData = SUBSTATUS_TEMPLATES[subStatusKey];
      if (templateData && templateData.templateFields) {
        notesState.setActiveFields(templateData.templateFields);
      }
      adjustActiveFieldsForContext();
      buildDynamicForm(subStatusKey, dynamicFormContainer, notesState);
      dynamicFormContainer.style.display = "block";
      scenariosContainer.style.display = "block";
      const isSo = subStatusKey.startsWith("SO_");
      const isAv = subStatusKey === "NI_Awaiting_Validation";
      const manualTaskBtn2 = document.getElementById("manual-task-toggle");
      if (isSo || isAv) {
        stepTasks.selectionElement.style.display = "block";
        manualTaskBtn2.style.display = "none";
      } else {
        stepTasks.selectionElement.style.display = "none";
        stepTasks.screenshotsElement.style.display = "none";
        manualTaskBtn2.style.display = "block";
      }
      const mode = subStatusKey === "SO_Education_Only" ? "education" : "implementation";
      notesState.setScreenshotMode(mode);
      if (notesState.currentCaseType === "lm") {
        notesState.toggleFieldExclusion("field-ON_CALL", true);
      } else {
        notesState.toggleFieldExclusion("field-ON_CALL", false);
      }
      stepTasks.updateSubStatus(subStatusKey);
      updateTagSupport();
      const emailToggle = document.getElementById("email-automation-toggle-row");
      if (emailToggle) {
        emailToggle.style.display = SUBSTATUS_SHORTCODES[subStatusKey] ? "flex" : "none";
      }
    }
    function updateTagSupport() {
      const checked = stepTasks.getCheckedElements().map((c) => c.value);
      tagSupport.updateVisibility(notesState.currentSubStatus, checked);
    }
    function applyScenario(scenarioId, isSelected) {
      const data = scenarioSnippets[scenarioId];
      if (!data) return;
      for (const key in data) {
        if (key === "linkedTask") {
          stepTasks.toggleTask(data.linkedTask, isSelected);
        } else if (key === "activeTasks") {
          data.activeTasks.forEach((t2) => {
            if (isSelected) {
              stepTasks.setTaskCount(t2.value, t2.count);
            } else {
              stepTasks.setTaskCount(t2.value, 0);
            }
          });
        } else if (key.startsWith("field-")) {
          const fieldId = key;
          const value = data[key];
          const el = document.getElementById(fieldId);
          if (el) {
            const isListField = textareaListFields.includes(fieldId.replace("field-", ""));
            if (isSelected) {
              if (isListField) {
                const currentVal = el.value.trim();
                if (!currentVal.includes(value.trim())) {
                  el.value = currentVal ? currentVal + "\n" + value.trim() : value.trim();
                }
              } else {
                el.value = value;
              }
            } else {
              if (isListField) {
                const currentVal = el.value.trim();
                const snippetVal = value.trim();
                if (currentVal.includes(snippetVal)) {
                  el.value = currentVal.replace(snippetVal, "").trim().replace(/\n{3,}/g, "\n\n");
                }
              } else {
                if (el.value.trim() === value.trim()) {
                  el.value = "";
                }
              }
            }
            notesState.updateField(fieldId, el.value);
            el.dispatchEvent(new Event("input"));
          }
        }
      }
    }
    function createActionsSection(draftsManager2, t2) {
      const div = document.createElement("div");
      div.className = "cw-actions-section";
      div.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${COLORS.bgInput};
            border-radius: 12px;
            border: 1px solid ${COLORS.border};
        `;
      if (!document.getElementById("cw-actions-hover-styles")) {
        const style = document.createElement("style");
        style.id = "cw-actions-hover-styles";
        style.innerHTML = `
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
                    border-color: ${COLORS.primary} !important;
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
                    color: ${COLORS.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `;
        document.head.appendChild(style);
      }
      const emailRow = document.createElement("div");
      emailRow.id = "email-automation-toggle-row";
      emailRow.style.cssText = "grid-column: span 2; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;";
      emailRow.innerHTML = `
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${COLORS.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${COLORS.primary};">
                <span class="js-label-email-toggle">${t2("preencher_email_automaticamente")}</span>
            </label>
        `;
      const parkBtn = draftsManager2.parkButton;
      parkBtn.classList.add("js-btn-park");
      parkBtn.style.cssText = `width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;`;
      const btnReset = document.createElement("button");
      btnReset.className = "cw-btn-secondary js-btn-reset";
      btnReset.textContent = t2("limpar");
      btnReset.style.cssText = `width: 100%; height: 34px; background: ${COLORS.surface}; color: ${COLORS.textSub}; border: 1px solid ${COLORS.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`;
      btnReset.onclick = () => resetModule();
      const btnCopy = document.createElement("button");
      btnCopy.className = "cw-btn-secondary js-btn-copy";
      btnCopy.textContent = t2("copiar");
      btnCopy.style.cssText = `width: 100%; height: 34px; background: ${COLORS.surface}; color: ${COLORS.primary}; border: 1px solid ${COLORS.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`;
      btnCopy.onclick = () => handleCopy();
      const btnGenerate = document.createElement("button");
      btnGenerate.className = "cw-btn-primary js-btn-generate";
      btnGenerate.textContent = t2("preencher");
      btnGenerate.style.cssText = `width: 100%; height: 38px; background: ${COLORS.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: span 2; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`;
      btnGenerate.onclick = () => handleGenerate();
      div.appendChild(emailRow);
      div.appendChild(parkBtn);
      div.appendChild(btnReset);
      div.appendChild(btnCopy);
      div.appendChild(btnGenerate);
      return div;
    }
    async function handleCopy() {
      if (!notesState.currentSubStatus) {
        showToast(t("select_substatus"), { error: true });
        return;
      }
      const html = generateOutputHtml(notesState, stepTasks, tagSupport);
      if (html) {
        copyHtmlToClipboard(html);
        showToast(t("copiado_sucesso"));
        SoundManager.playClick();
      } else {
        showToast(t("select_substatus"), { error: true });
      }
    }
    async function handleGenerate() {
      if (!notesState.currentSubStatus) {
        showToast(t("select_substatus"), { error: true });
        return;
      }
      const html = generateOutputHtml(notesState, stepTasks, tagSupport);
      copyHtmlToClipboard(html);
      toggleVisibility();
      const finishLoading = triggerProcessingAnimation();
      const field = await ensureNoteCardIsOpen();
      if (field) {
        field.focus();
        document.execCommand("insertHTML", false, html);
        triggerInputEvents(field);
        const emailCheckbox = document.getElementById("email-automation-checkbox");
        const emailEnabled = emailCheckbox ? emailCheckbox.checked : true;
        if (emailEnabled && notesState.currentSubStatus && SUBSTATUS_SHORTCODES[notesState.currentSubStatus]) {
          await runEmailAutomation(SUBSTATUS_SHORTCODES[notesState.currentSubStatus]);
        }
        showToast(t("inserido_copiado"));
        SoundManager.playSuccess();
        resetModule();
      }
      finishLoading();
    }
    function adjustActiveFieldsForContext() {
      if (!notesState.currentSubStatus) return;
      if (notesState.currentCaseType === "lm") {
        notesState.removeField("ON_CALL");
      } else {
        const templateData = SUBSTATUS_TEMPLATES[notesState.currentSubStatus];
        if (templateData && templateData.templateFields.includes("ON_CALL")) {
          notesState.addFieldAt("ON_CALL", 1);
        }
      }
      if (notesState.isPortugalCase) {
        notesState.addFieldAt("CASO_PORTUGAL", 1);
        notesState.addFieldAt("CONSENTIU_GRAVACAO", 2);
      } else {
        notesState.removeField("CASO_PORTUGAL");
        notesState.removeField("CONSENTIU_GRAVACAO");
      }
    }
    function resetModule() {
      notesState.reset();
      stepTasks.reset();
      tagSupport.reset();
      refreshGlobalBadge();
      DraftService.clearEmergency();
      content.querySelectorAll("select").forEach((s) => s.value = "");
      content.querySelector("#sub-status-select").disabled = true;
      const emailRow = document.getElementById("email-automation-toggle-row");
      if (emailRow) emailRow.style.display = "none";
      dynamicFormContainer.innerHTML = "";
      scenariosContainer.style.display = "none";
      emptyStateContainer.style.display = "flex";
      emptyStateContainer.style.opacity = "1";
      actionsSection.style.display = "none";
      if (document.getElementById("manual-task-toggle")) {
        document.getElementById("manual-task-toggle").style.display = "none";
      }
      stepTasks.selectionElement.style.display = "none";
      stepTasks.screenshotsElement.style.display = "none";
    }
    async function collectFullState(isEmergency = false) {
      const formData = {};
      dynamicFormContainer.querySelectorAll("input, textarea, select").forEach((el) => {
        if (el.id.startsWith("field-") || el.id === "consent-select") {
          formData[el.id] = el.value;
        }
      });
      let clientName = "Cliente";
      let cid = "---";
      if (!isEmergency) {
        try {
          const pageData = await getPageData();
          clientName = pageData.advertiserName;
          cid = pageData.cid;
        } catch (e) {
          console.warn("Erro ao coletar pageData:", e);
        }
      }
      const activeTasks = stepTasks.getCheckedElements().map((c) => ({
        key: c.value,
        count: c.count
      }));
      const summaryTags = activeTasks.map((t2) => {
        const taskInfo = TASKS_DB[t2.key];
        return taskInfo ? taskInfo.name : t2.key;
      });
      return {
        currentCaseType: notesState.currentCaseType,
        currentLang: notesState.currentLang,
        isPortugalCase: notesState.isPortugalCase,
        consent: notesState.consent,
        tagSupportUsed: notesState.tagSupportUsed,
        forcedScreenshots: [...notesState.forcedScreenshots],
        excludedFields: [...notesState.excludedFields],
        activeFields: notesState.activeFields,
        status: notesState.currentStatus,
        subStatus: notesState.currentSubStatus,
        formData,
        activeTasks,
        summaryTags,
        clientName,
        cid,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    async function restoreFullState(draft) {
      notesState.setLanguage(draft.currentLang || "pt");
      notesState.setCaseType(draft.currentCaseType || "bau");
      notesState.setPortugalCase(draft.isPortugalCase || false);
      notesState.setConsent(draft.consent || false);
      notesState.setExcludedFields(draft.excludedFields || []);
      if (draft.activeFields) {
        notesState.setActiveFields(draft.activeFields);
      }
      const langBtn = content.querySelector(`#lang-selector button[data-lang="${notesState.currentLang}"]`);
      if (langBtn) langBtn.classList.add("active");
      content.querySelectorAll("#lang-selector button").forEach((b) => {
        if (b !== langBtn) b.classList.remove("active");
      });
      const typeBtn = content.querySelector(`#type-selector button[data-type="${notesState.currentCaseType}"]`);
      if (typeBtn) typeBtn.classList.add("active");
      content.querySelectorAll("#type-selector button").forEach((b) => {
        if (b !== typeBtn) b.classList.remove("active");
      });
      const portBtn = content.querySelector(`#portugal-selector button[data-val="${notesState.isPortugalCase}"]`);
      if (portBtn) portBtn.classList.add("active");
      content.querySelectorAll("#portugal-selector button").forEach((b) => {
        if (b !== portBtn) b.classList.remove("active");
      });
      if (draft.status) {
        const mainSelect = content.querySelector("#main-status-select");
        mainSelect.value = draft.status;
        notesState.setStatus(draft.status);
        const subSelect = content.querySelector("#sub-status-select");
        updateSubStatusOptions(draft.status, subSelect);
        await wait(50);
        if (draft.subStatus) {
          subSelect.value = draft.subStatus;
          notesState.setSubStatus(draft.subStatus);
          onSubStatusChange(draft.subStatus);
          await wait(100);
          if (draft.tagSupportUsed !== void 0) {
            notesState.setTagSupportUsed(draft.tagSupportUsed);
            const tsSim = tagSupport.element.querySelector('input[value="Sim"]');
            const tsNao = tagSupport.element.querySelector('input[value="N\xE3o"]');
            if (draft.tagSupportUsed && tsSim) tsSim.checked = true;
            else if (tsNao) tsNao.checked = true;
            tagSupport.element.querySelector("div:last-child").style.display = draft.tagSupportUsed ? "none" : "block";
          }
          if (draft.forcedScreenshots) {
            notesState.setForcedScreenshots(draft.forcedScreenshots);
          }
          for (const id in draft.formData) {
            const el = document.getElementById(id);
            if (el) {
              el.value = draft.formData[id];
              notesState.updateField(id, el.value);
            }
          }
          if (draft.activeTasks) {
            draft.activeTasks.forEach((t2) => stepTasks.setTaskCount(t2.key, t2.count));
            notesState.setActiveTasks(stepTasks.getCheckedElements());
          }
        }
      }
      notesState.isDirty = false;
    }
    function t(key) {
      return translations[notesState.currentLang]?.[key] || translations["pt"]?.[key] || key;
    }
    function createSplitToggleButton() {
      const btn = document.createElement("div");
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>`;
      btn.style.cssText = "width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;";
      btn.onclick = (e) => {
        e.stopPropagation();
        toggleSplitView();
      };
      btn.title = "Alternar para Split & Transfer";
      return btn;
    }
    function createEmptyState() {
      const div = document.createElement("div");
      div.id = "notes-empty-state";
      div.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${EASE};
        `;
      div.innerHTML = `
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
                <div style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${COLORS.text}; margin-bottom: 4px;">
                    ${t("pronto_comecar") || "Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${COLORS.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${t("selecione_status_ajuda") || "Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `;
      return div;
    }
    function updateUIFromState(state) {
      const lIdioma = content.querySelector(".js-label-idioma");
      if (lIdioma) lIdioma.textContent = t("idioma");
      const lFluxo = content.querySelector(".js-label-fluxo");
      if (lFluxo) lFluxo.textContent = t("fluxo");
      const lPortugal = content.querySelector(".js-label-portugal");
      if (lPortugal) lPortugal.textContent = t("caso_portugal");
      const lStatus = content.querySelector(".js-label-status");
      if (lStatus) lStatus.textContent = t("status_principal");
      const lSubstatus = content.querySelector(".js-label-substatus");
      if (lSubstatus) lSubstatus.textContent = t("substatus");
      const btnCopy = content.querySelector(".js-btn-copy");
      if (btnCopy) btnCopy.textContent = t("copiar");
      const btnGenerate = content.querySelector(".js-btn-generate");
      if (btnGenerate) btnGenerate.textContent = t("preencher");
      const btnReset = content.querySelector(".js-btn-reset");
      if (btnReset) btnReset.textContent = t("limpar");
      const manualBtn = document.getElementById("manual-task-toggle");
      if (manualBtn) manualBtn.textContent = t("gostaria_de_adicionar_uma_task") || "Gostaria de adicionar uma task";
      const parkBtn = content.querySelector(".js-btn-park span");
      if (parkBtn) parkBtn.textContent = t("guardar");
      const drawerTitle = popup.querySelector(".js-drawer-title");
      if (drawerTitle) drawerTitle.textContent = t("rascunhos_salvos");
      const lEmail = content.querySelector(".js-label-email-toggle");
      if (lEmail) lEmail.textContent = t("preencher_email_automaticamente");
      if (tagSupport && tagSupport.setLanguage) tagSupport.setLanguage(t);
      if (stepTasks && stepTasks.setLanguage) stepTasks.setLanguage(t);
    }
    emptyStateContainer.style.display = "flex";
    actionsSection.style.display = "none";
    notesState.setLanguage("pt");
    notesState.setCaseType("bau");
    refreshGlobalBadge();
    setTimeout(async () => {
      const emergencyData = DraftService.getEmergency();
      if (emergencyData) {
        const confirmed = await confirmDialog("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?");
        if (confirmed) {
          restoreFullState(emergencyData);
          showToast("Sess\xE3o restaurada!");
        } else {
          DraftService.clearEmergency();
        }
      }
    }, 3e3);
    document.body.appendChild(popup);
    return toggleVisibility;
  }

  // src/modules/email-assistant/email-data.js
  var EMAIL_TEMPLATES = [
    {
      "id": "attempt_10min",
      "name": "Tentativa de Contato (Antes dos 10min)",
      "category": "Tentativas & Agendamento",
      "subject": "Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",
      "placeholders": [
        { "key": "[Seu Nome]", "label": "Seu Nome", "type": "text", "auto": "agentName" },
        { "key": "[INSERIR URL]", "label": "URL do Site", "type": "text" },
        { "key": "[LINK DO MEET]", "label": "Link da Reuni\xE3o", "type": "text" }
      ],
      "template": "<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"
    },
    {
      "id": "reschedule",
      "name": "Proposta de Reagendamento",
      "category": "Tentativas & Agendamento",
      "subject": "Reagendamento de Consultoria",
      "placeholders": [
        { "key": "[DATA 1]", "label": "Data 1", "type": "text" },
        { "key": "[HORA 1]", "label": "Hora 1", "type": "text" },
        { "key": "[DATA 2]", "label": "Data 2", "type": "text" },
        { "key": "[HORA 2]", "label": "Hora 2", "type": "text" },
        { "key": "[DATA 3]", "label": "Data 3", "type": "text" },
        { "key": "[HORA 3]", "label": "Hora 3", "type": "text" },
        { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
      ],
      "template": "<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"
    },
    {
      "id": "max_reschedules",
      "name": "Limite de Reagendamentos Excedido",
      "category": "Tentativas & Agendamento",
      "subject": "Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",
      "placeholders": [
        { "key": "[Nome do Cliente]", "label": "Nome do Cliente", "type": "text" },
        { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
      ],
      "template": '<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'
    },
    {
      "id": "2_6_day3",
      "name": "Dia 3 (Acompanhamento)",
      "category": "Follow Up",
      "subject": "Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",
      "placeholders": [
        { "key": "[Nome do Cliente]", "label": "Nome do Cliente", "type": "text" },
        { "key": "[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]", "label": "A\xE7\xE3o Pendente", "type": "text" },
        { "key": "[MM/DD/YYYY]", "label": "Data do Pr\xF3ximo Contato", "type": "date" },
        { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
      ],
      "template": "<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"
    },
    {
      "id": "2_6_day6",
      "name": "Dia 6 (Acompanhamento Final)",
      "category": "Follow Up",
      "subject": "Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",
      "placeholders": [
        { "key": "[Nome do Cliente]", "label": "Nome do Cliente", "type": "text" },
        { "key": "[URL]", "label": "URL do Site", "type": "text" },
        { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
      ],
      "template": "<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"
    },
    {
      "id": "2_6_completed_reschedule",
      "name": "A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",
      "category": "Follow Up",
      "subject": "Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",
      "placeholders": [
        { "key": "[Disponibilidade em BAU]", "label": "Pr\xF3xima Disponibilidade", "type": "text" },
        { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
      ],
      "template": "<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"
    },
    {
      "id": "nrp_standard",
      "name": "NRP - Padr\xE3o (3\xAA Tentativa)",
      "category": "NRP / Encerramento",
      "subject": "Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",
      "placeholders": [
        { "key": "[Nome do Cliente]", "label": "Nome do Cliente", "type": "text" },
        { "key": "[Task pedida pelo AM]", "label": "Task Solicitada", "type": "text" },
        { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
      ],
      "template": '<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'
    },
    {
      "id": "nrp_dfa",
      "name": "NRP - DFA",
      "category": "NRP / Encerramento",
      "subject": "Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",
      "placeholders": [
        { "key": "[Nome do Cliente]", "label": "Nome do Cliente", "type": "text" },
        { "key": "[Seu Nome]", "label": "Assinatura", "type": "text", "auto": "agentName" }
      ],
      "template": '<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'
    }
  ];

  // src/modules/email-assistant/email-data-service.js
  var EmailDataService = {
    _templates: null,
    async getTemplates() {
      if (this._templates) return this._templates;
      this._templates = EMAIL_TEMPLATES;
      return this._templates;
    }
  };

  // src/modules/personal-library/snippet-service.js
  var STORAGE_KEY2 = "cw_personal_library_v1";
  var isMutating = false;
  var SnippetService = {
    // --- 1. LEITURA (CACHE-FIRST) ---
    getSnippets: (type = "all") => {
      const localData = SnippetService._loadFromLocal();
      const userEmail = getAgentEmail();
      if (userEmail && userEmail.includes("@") && !isMutating) {
        SnippetService._syncWithServer(userEmail);
      }
      if (type === "all") return localData;
      return localData.filter((s) => s.type === type);
    },
    // --- 2. ESCRITA (OTIMISTA) ---
    save: async (snippet) => {
      const userEmail = getAgentEmail();
      if (!userEmail) {
        showToast("Erro: Usu\xE1rio n\xE3o identificado.", { error: true });
        return false;
      }
      isMutating = true;
      const localData = SnippetService._loadFromLocal();
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const newSnippet = {
        id: snippet.id || "local_" + Date.now(),
        // ID temporário se for novo
        type: snippet.type || "general",
        title: snippet.title || "Sem t\xEDtulo",
        content: snippet.content || "",
        subject: snippet.subject || "",
        isCode: snippet.isCode || false,
        isRich: snippet.isRich || false,
        updated: now
      };
      const updatedList = localData.filter((s) => s.id !== newSnippet.id);
      updatedList.unshift(newSnippet);
      SnippetService._saveToLocal(updatedList);
      DataService.saveSnippet(newSnippet, userEmail).then((success) => {
        if (success) {
          console.log("\u2601\uFE0F Snippet salvo na nuvem!");
        } else {
          console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.");
        }
        setTimeout(() => {
          isMutating = false;
        }, 2e3);
      });
      return newSnippet;
    },
    delete: async (id) => {
      const userEmail = getAgentEmail();
      isMutating = true;
      const localData = SnippetService._loadFromLocal();
      const updatedList = localData.filter((s) => s.id !== id);
      SnippetService._saveToLocal(updatedList);
      if (userEmail) {
        DataService.deleteSnippet(id, userEmail).then(() => {
          setTimeout(() => {
            isMutating = false;
          }, 2e3);
        });
      } else {
        isMutating = false;
      }
      return true;
    },
    // --- 3. CORE DE SINCRONIA ---
    _syncWithServer: async (userEmail) => {
      if (window._cw_library_syncing) return;
      window._cw_library_syncing = true;
      setTimeout(() => {
        window._cw_library_syncing = false;
      }, 3e4);
      console.log("\u{1F504} Sincronizando biblioteca...");
      const response = await DataService.getUserSnippets(userEmail);
      if (response && response.status === "success" && Array.isArray(response.snippets)) {
        const serverData = response.snippets;
        const localData = SnippetService._loadFromLocal();
        const serverJSON = JSON.stringify(serverData);
        const localJSON = JSON.stringify(localData);
        if (serverJSON !== localJSON) {
          console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache.");
          SnippetService._saveToLocal(serverData);
        }
      }
    },
    // --- HELPERS LOCALSTORAGE ---
    _loadFromLocal: () => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY2) || "[]");
      } catch (e) {
        return [];
      }
    },
    _saveToLocal: (data) => {
      localStorage.setItem(STORAGE_KEY2, JSON.stringify(data));
    }
  };

  // src/modules/email-assistant/email-assistant.js
  function initEmailAssistant() {
    const CURRENT_VERSION = "v6.0.0";
    let visible = false;
    let templates = [];
    let selectedTemplate = null;
    let searchTerm = "";
    let activeCategory = "Todos";
    let expandedCategories = /* @__PURE__ */ new Set();
    const COLORS4 = {
      bgApp: "#F5F5F7",
      bgSurface: "#FFFFFF",
      borderSubtle: "rgba(0, 0, 0, 0.07)",
      primary: "#007AFF",
      primaryBg: "rgba(0, 122, 255, 0.1)",
      textPrimary: "#1D1D1F",
      textSecondary: "#6E6E73",
      shadowCard: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"
    };
    const popup = document.createElement("div");
    popup.id = "email-assistant-popup";
    popup.classList.add("cw-module-window");
    const scrollStyles = document.createElement("style");
    scrollStyles.textContent = `
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
    `;
    document.head.appendChild(scrollStyles);
    Object.assign(popup.style, stylePopup, {
      width: "850px",
      height: "650px",
      display: "none",
      flexDirection: "column",
      fontFamily: `'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif`,
      borderRadius: "12px",
      overflow: "hidden"
    });
    const header = createStandardHeader(
      popup,
      "Email Assistant",
      CURRENT_VERSION,
      "Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",
      { popup },
      () => toggleVisibility()
    );
    const mainContent = document.createElement("div");
    Object.assign(mainContent.style, {
      display: "flex",
      flex: "1",
      overflow: "hidden",
      backgroundColor: COLORS4.bgApp
    });
    const leftPanel = document.createElement("div");
    Object.assign(leftPanel.style, {
      width: "320px",
      backgroundColor: "#EFEFF0",
      borderRight: `1px solid ${COLORS4.borderSubtle}`,
      display: "flex",
      flexDirection: "column",
      flexShrink: "0"
    });
    const searchContainer = document.createElement("div");
    Object.assign(searchContainer.style, {
      padding: "16px",
      borderBottom: `1px solid ${COLORS4.borderSubtle}`,
      position: "relative"
    });
    const searchInput = document.createElement("input");
    searchInput.placeholder = "Buscar templates...";
    Object.assign(searchInput.style, {
      width: "100%",
      padding: "10px 14px 10px 36px",
      borderRadius: "10px",
      border: "1.5px solid transparent",
      backgroundColor: "#E3E3E8",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
      color: COLORS4.textPrimary,
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "12px center",
      transition: "all 0.2s ease-in-out"
    });
    searchInput.onfocus = () => {
      searchInput.style.backgroundColor = "#FFFFFF";
      searchInput.style.borderColor = COLORS4.primary;
      searchInput.style.boxShadow = "0 0 0 4px rgba(0, 122, 255, 0.1)";
      searchInput.style.transform = "scale(1.02)";
    };
    searchInput.onblur = () => {
      searchInput.style.backgroundColor = "#E3E3E8";
      searchInput.style.borderColor = "transparent";
      searchInput.style.boxShadow = "none";
      searchInput.style.transform = "scale(1)";
    };
    const templateList = document.createElement("div");
    templateList.id = "email-template-list";
    Object.assign(templateList.style, {
      flex: "1",
      overflowY: "auto",
      padding: "8px",
      scrollBehavior: "smooth"
    });
    const clearSearch = document.createElement("div");
    clearSearch.innerHTML = "\u2715";
    Object.assign(clearSearch.style, {
      position: "absolute",
      right: "26px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "10px",
      color: "#fff",
      cursor: "pointer",
      display: "none",
      backgroundColor: "#C7C7CC",
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      textAlign: "center",
      lineHeight: "16px",
      fontWeight: "bold"
    });
    clearSearch.onclick = () => {
      searchInput.value = "";
      searchTerm = "";
      clearSearch.style.display = "none";
      renderTemplateList();
      searchInput.focus();
    };
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(clearSearch);
    leftPanel.appendChild(searchContainer);
    leftPanel.appendChild(templateList);
    const rightPanel = document.createElement("div");
    Object.assign(rightPanel.style, {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      backgroundColor: COLORS4.bgApp,
      transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"
    });
    const fieldsSection = document.createElement("div");
    Object.assign(fieldsSection.style, {
      padding: "20px",
      borderBottom: `1px solid ${COLORS4.borderSubtle}`,
      backgroundColor: COLORS4.bgSurface,
      maxHeight: "250px",
      overflowY: "auto",
      display: "none"
    });
    const previewSection = document.createElement("div");
    Object.assign(previewSection.style, {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      backgroundColor: COLORS4.bgApp,
      overflow: "hidden"
    });
    const previewHeader = document.createElement("div");
    Object.assign(previewHeader.style, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px"
    });
    const previewTitle = document.createElement("span");
    previewTitle.textContent = "Preview do E-mail";
    Object.assign(previewTitle.style, {
      fontSize: "12px",
      fontWeight: "600",
      color: COLORS4.textSecondary,
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    });
    const previewActions = document.createElement("div");
    Object.assign(previewActions.style, {
      display: "flex",
      gap: "8px"
    });
    const createButton = (text, primary = false) => {
      const btn = document.createElement("button");
      btn.textContent = text;
      Object.assign(btn.style, {
        padding: "8px 14px",
        borderRadius: "10px",
        border: primary ? "none" : `1.5px solid ${COLORS4.primary}`,
        background: primary ? COLORS4.primary : "transparent",
        color: primary ? "#fff" : COLORS4.primary,
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        boxShadow: primary ? "0 4px 12px rgba(0, 122, 255, 0.3)" : "none"
      });
      btn.onmouseenter = () => {
        if (primary) {
          btn.style.backgroundColor = "#0062CC";
          btn.style.transform = "translateY(-1px)";
          btn.style.boxShadow = "0 6px 16px rgba(0, 122, 255, 0.4)";
        } else {
          btn.style.backgroundColor = "rgba(0, 122, 255, 0.05)";
        }
      };
      btn.onmouseleave = () => {
        if (primary) {
          btn.style.backgroundColor = COLORS4.primary;
          btn.style.transform = "translateY(0)";
          btn.style.boxShadow = "0 4px 12px rgba(0, 122, 255, 0.3)";
        } else {
          btn.style.backgroundColor = "transparent";
          btn.style.transform = "translateY(0)";
        }
      };
      btn.onmousedown = () => btn.style.transform = "scale(0.94)";
      btn.onmouseup = () => btn.style.transform = "scale(1)";
      return btn;
    };
    const btnCopy = createButton("Copiar HTML");
    const btnFill = createButton("Preencher no CRM", true);
    const btnSmartCR = createButton("Smart CR");
    btnSmartCR.style.borderColor = "#E67E22";
    btnSmartCR.style.color = "#E67E22";
    btnSmartCR.style.display = "none";
    previewActions.appendChild(btnSmartCR);
    previewActions.appendChild(btnCopy);
    previewActions.appendChild(btnFill);
    previewHeader.appendChild(previewTitle);
    previewHeader.appendChild(previewActions);
    const previewContent = document.createElement("div");
    previewContent.contentEditable = "true";
    Object.assign(previewContent.style, {
      flex: "1",
      backgroundColor: COLORS4.bgSurface,
      border: `1px solid ${COLORS4.borderSubtle}`,
      borderRadius: "8px",
      padding: "20px",
      fontSize: "15px",
      lineHeight: "1.6",
      color: COLORS4.textPrimary,
      overflowY: "auto",
      outline: "none",
      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)"
    });
    previewSection.appendChild(previewHeader);
    previewSection.appendChild(previewContent);
    updatePreview();
    rightPanel.appendChild(fieldsSection);
    rightPanel.appendChild(previewSection);
    mainContent.appendChild(leftPanel);
    mainContent.appendChild(rightPanel);
    popup.appendChild(header);
    popup.appendChild(mainContent);
    const resizeHandle = document.createElement("div");
    Object.assign(resizeHandle.style, styleResizeHandle);
    popup.appendChild(resizeHandle);
    makeResizable(popup, resizeHandle);
    document.body.appendChild(popup);
    function toggleVisibility() {
      visible = !visible;
      if (visible) {
        popup.style.display = "flex";
        constrainToViewport(popup);
        if (templates.length === 0) loadTemplates();
      } else {
        popup.style.display = "none";
      }
      toggleGenieAnimation(visible, popup, "cw-btn-email");
    }
    async function loadTemplates() {
      templateList.innerHTML = '<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>';
      templates = await EmailDataService.getTemplates();
      renderTemplateList();
    }
    function renderTemplateList() {
      templateList.innerHTML = "";
      const filteredTemplates = templates.filter(
        (t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const smartCRs = Object.entries(SUBSTATUS_SHORTCODES).filter(([key, code]) => code && (key.toLowerCase().includes(searchTerm.toLowerCase()) || code.toLowerCase().includes(searchTerm.toLowerCase()))).map(([key, code]) => ({ id: key, name: key.replace(/_/g, " "), category: "\u26A1 Smart CRs", code, isSmartCR: true }));
      const snippets = SnippetService.getSnippets("email").filter((s) => s.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.subject && s.subject.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => {
        const placeholders = [];
        const matches = s.content.match(/\[([^\]]+)\]/g);
        if (matches) {
          [...new Set(matches)].forEach((m) => {
            placeholders.push({ key: m, label: m.replace("[", "").replace("]", ""), type: m.toLowerCase().includes("data") ? "date" : "text", auto: m.toLowerCase().includes("nome") && m.toLowerCase().includes("seu") ? "agentName" : null });
          });
        }
        return { id: s.id || `snippet-${Math.random()}`, name: s.title, category: "\u{1F464} Pessoal", subject: s.subject || "Sem Assunto", template: s.content, placeholders };
      });
      const allItems = [...filteredTemplates, ...smartCRs, ...snippets];
      if (allItems.length === 0) {
        templateList.innerHTML = `
                <div style="padding: 40px 20px; text-align: center; color: ${COLORS4.textSecondary}; opacity: 0.6;">
                    <div style="font-size: 32px; margin-bottom: 12px;">\u{1F50D}</div>
                    <div style="font-size: 14px; font-weight: 500;">Nenhum resultado para "${searchTerm}"</div>
                </div>`;
        return;
      }
      const categories = [...new Set(allItems.map((t) => t.category))].sort((a, b) => a.localeCompare(b));
      categories.forEach((cat) => {
        const isExpanded = expandedCategories.has(cat) || searchTerm.length > 0;
        const categoryItems = allItems.filter((t) => t.category === cat);
        const catHeader = document.createElement("div");
        Object.assign(catHeader.style, {
          padding: "12px 16px 12px 24px",
          fontSize: "11px",
          fontWeight: "700",
          color: COLORS4.textSecondary,
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          position: "sticky",
          top: "-8px",
          backgroundColor: "rgba(239, 239, 240, 0.9)",
          zIndex: "10",
          backdropFilter: "blur(20px)",
          margin: "0 -8px 8px -8px",
          borderBottom: `0.5px solid ${COLORS4.borderSubtle}`,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          userSelect: "none",
          transition: "background-color 0.2s ease"
        });
        catHeader.onmouseenter = () => catHeader.style.backgroundColor = "rgba(230, 230, 232, 0.9)";
        catHeader.onmouseleave = () => catHeader.style.backgroundColor = "rgba(239, 239, 240, 0.9)";
        const headerText = document.createElement("span");
        headerText.textContent = cat;
        catHeader.appendChild(headerText);
        const badge = document.createElement("span");
        badge.textContent = categoryItems.length;
        Object.assign(badge.style, {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          padding: "2px 8px",
          borderRadius: "10px",
          fontSize: "10px",
          color: COLORS4.textSecondary
        });
        const arrow = document.createElement("span");
        arrow.innerHTML = isExpanded ? "\u{10012A}" : "\u{10012B}";
        arrow.innerHTML = isExpanded ? "\u25BE" : "\u25B8";
        arrow.style.marginLeft = "8px";
        arrow.style.transition = "transform 0.3s ease";
        const rightSide = document.createElement("div");
        rightSide.style.display = "flex";
        rightSide.style.alignItems = "center";
        rightSide.appendChild(badge);
        rightSide.appendChild(arrow);
        catHeader.appendChild(rightSide);
        catHeader.onclick = () => {
          if (expandedCategories.has(cat)) {
            expandedCategories.delete(cat);
          } else {
            expandedCategories.add(cat);
          }
          renderTemplateList();
        };
        templateList.appendChild(catHeader);
        if (!isExpanded) return;
        categoryItems.forEach((template) => {
          const isSelected = selectedTemplate && selectedTemplate.id === template.id;
          const item = document.createElement("div");
          Object.assign(item.style, {
            padding: "12px 14px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
            borderRadius: "10px",
            color: COLORS4.textPrimary,
            margin: "4px 6px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: isSelected ? COLORS4.primary : COLORS4.bgSurface,
            boxShadow: isSelected ? "0 4px 12px rgba(0, 122, 255, 0.3)" : "0 1px 2px rgba(0,0,0,0.05)",
            border: isSelected ? "none" : `1px solid ${COLORS4.borderSubtle}`,
            position: "relative",
            overflow: "hidden"
          });
          if (isSelected) {
            const indicator = document.createElement("div");
            Object.assign(indicator.style, {
              position: "absolute",
              left: "0",
              top: "0",
              bottom: "0",
              width: "4px",
              backgroundColor: "#fff",
              borderRadius: "0 4px 4px 0"
            });
            item.appendChild(indicator);
          }
          const icon = document.createElement("span");
          icon.innerHTML = template.isSmartCR ? "\u26A1" : template.category === "\u{1F464} Pessoal" ? "\u{1F464}" : "\u{1F4C4}";
          icon.style.fontSize = "12px";
          icon.style.opacity = "0.7";
          icon.style.flexShrink = "0";
          item.appendChild(icon);
          const text = document.createElement("span");
          text.textContent = template.name;
          text.style.overflow = "hidden";
          text.style.textOverflow = "ellipsis";
          text.style.whiteSpace = "nowrap";
          text.style.flex = "1";
          item.appendChild(text);
          if (isSelected) {
            item.style.color = "#fff";
            item.style.fontWeight = "600";
            icon.style.opacity = "1";
          }
          item.onmouseenter = () => {
            if (!isSelected) {
              item.style.backgroundColor = "#f8f8f9";
              item.style.transform = "translateY(-1px) scale(1.01)";
              item.style.boxShadow = "0 4px 8px rgba(0,0,0,0.08)";
              item.style.borderColor = "rgba(0, 122, 255, 0.2)";
            }
          };
          item.onmouseleave = () => {
            if (!isSelected) {
              item.style.backgroundColor = COLORS4.bgSurface;
              item.style.transform = "translateY(0) scale(1)";
              item.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)";
              item.style.borderColor = COLORS4.borderSubtle;
            }
          };
          item.onmousedown = () => {
            item.style.transform = isSelected ? "scale(0.97)" : "scale(0.98)";
          };
          item.onmouseup = () => {
            item.style.transform = isSelected ? "scale(1)" : "translateY(-1px) scale(1.01)";
          };
          item.onclick = () => {
            selectTemplate(template);
          };
          templateList.appendChild(item);
        });
      });
    }
    let selectionTimeout = null;
    async function selectTemplate(template) {
      if (selectedTemplate?.id === template.id) return;
      selectedTemplate = template;
      if (selectionTimeout) clearTimeout(selectionTimeout);
      rightPanel.style.opacity = "0";
      rightPanel.style.transform = "translateY(5px)";
      selectionTimeout = setTimeout(() => {
        btnSmartCR.style.display = template.isSmartCR ? "block" : "none";
        btnFill.style.display = template.isSmartCR ? "none" : "block";
        btnCopy.style.display = template.isSmartCR ? "none" : "block";
        renderTemplateList();
        renderFields();
        updatePreview();
        rightPanel.style.opacity = "1";
        rightPanel.style.transform = "translateY(0)";
        selectionTimeout = null;
      }, 150);
    }
    function renderFields() {
      fieldsSection.innerHTML = "";
      if (!selectedTemplate || selectedTemplate.isSmartCR) {
        if (selectedTemplate?.isSmartCR) {
          fieldsSection.style.display = "block";
          fieldsSection.innerHTML = `<div style="padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`;
        } else {
          fieldsSection.style.display = "none";
        }
        return;
      }
      const hasPlaceholders = selectedTemplate.placeholders && selectedTemplate.placeholders.length > 0;
      fieldsSection.style.display = hasPlaceholders ? "block" : "none";
      if (!hasPlaceholders) return;
      const grid = document.createElement("div");
      Object.assign(grid.style, {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px"
      });
      (selectedTemplate.placeholders || []).forEach((ph) => {
        const container = document.createElement("div");
        const label = document.createElement("label");
        label.textContent = ph.label;
        Object.assign(label.style, {
          display: "block",
          fontSize: "11px",
          fontWeight: "700",
          color: COLORS4.textSecondary,
          marginBottom: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        });
        const input = document.createElement("input");
        input.type = ph.type || "text";
        input.dataset.key = ph.key;
        Object.assign(input.style, {
          width: "100%",
          padding: "10px 12px",
          borderRadius: "8px",
          border: `1.5px solid ${COLORS4.borderSubtle}`,
          backgroundColor: "#FBFBFD",
          fontSize: "14px",
          boxSizing: "border-box",
          transition: "all 0.2s ease",
          outline: "none"
        });
        input.onfocus = () => {
          input.style.borderColor = COLORS4.primary;
          input.style.backgroundColor = "#FFFFFF";
          input.style.boxShadow = "0 0 0 4px rgba(0, 122, 255, 0.1)";
        };
        input.onblur = () => {
          input.style.borderColor = COLORS4.borderSubtle;
          input.style.backgroundColor = "#FBFBFD";
          input.style.boxShadow = "none";
        };
        if (ph.auto === "agentName") {
          input.value = getAgentName().split(" ")[0];
        }
        input.addEventListener("input", updatePreview);
        container.appendChild(label);
        container.appendChild(input);
        grid.appendChild(container);
      });
      fieldsSection.appendChild(grid);
    }
    function updatePreview() {
      if (!selectedTemplate) {
        previewContent.innerHTML = `
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
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${COLORS4.textPrimary}; margin-bottom: 8px;">
                        Pronto para come\xE7ar?
                    </div>
                    <div style="font-size: 14px; color: ${COLORS4.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.
                    </div>
                </div>`;
        return;
      }
      if (selectedTemplate.isSmartCR) {
        previewContent.innerHTML = `<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${selectedTemplate.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;
        return;
      }
      let html = selectedTemplate.template;
      const inputs = fieldsSection.querySelectorAll("input");
      (inputs || []).forEach((input) => {
        const key = input.dataset.key;
        let val = input.value;
        if (input.type === "date" && val) {
          const [year, month, day] = val.split("-");
          val = `${month}/${day}/${year}`;
        }
        val = val || `<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${key}</span>`;
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        html = html.replace(new RegExp(escapedKey, "g"), val);
      });
      previewContent.innerHTML = html;
    }
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value;
      clearSearch.style.display = searchTerm ? "block" : "none";
      renderTemplateList();
    });
    btnCopy.onclick = () => {
      const html = previewContent.innerHTML;
      const blob = new Blob([html], { type: "text/html" });
      const text = previewContent.innerText;
      const data = [new ClipboardItem({ "text/html": blob, "text/plain": new Blob([text], { type: "text/plain" }) })];
      navigator.clipboard.write(data).then(() => showToast("E-mail copiado com sucesso!"), () => showToast("Erro ao copiar e-mail", { error: true }));
    };
    btnFill.onclick = async () => {
      if (!selectedTemplate) return;
      const finishLoading = triggerProcessingAnimation();
      const filledTemplate = { ...selectedTemplate, body: previewContent.innerHTML };
      try {
        await runQuickEmail(filledTemplate);
        toggleVisibility();
      } catch (error) {
        showToast("Erro ao preencher e-mail", { error: true });
      } finally {
        finishLoading();
      }
    };
    btnSmartCR.onclick = async () => {
      if (!selectedTemplate || !selectedTemplate.isSmartCR) return;
      const finishLoading = triggerProcessingAnimation();
      try {
        await runEmailAutomation(selectedTemplate.code);
        toggleVisibility();
      } catch (error) {
        showToast("Erro ao aplicar Smart CR", { error: true });
      } finally {
        finishLoading();
      }
    };
    return toggleVisibility;
  }

  // src/modules/call-script/call-script-data.js
  var csaChecklistData = {
    "PT BAU": {
      inicio: [
        "Apresenta\xE7\xE3o (Nome e Time)",
        "Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade",
        "Confirma\xE7\xE3o de CID e Email",
        "(Opcional) Validar autentica\xE7\xE3o da conta via link",
        "Confirma\xE7\xE3o da Task e do AM",
        "Informar tempo da liga\xE7\xE3o (30-45 min)",
        "Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)",
        "Validar Backup e Acessos Admin"
      ],
      meio: [
        "Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)",
        "Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'",
        "Confirmar recebimento do acesso",
        "Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)",
        "[Caso Recuse] Seguir com Compartilhamento de Tela"
      ],
      fim: [
        "Resumo da chamada (o que foi feito e como funciona)",
        "Oferecer ajuda adicional / Abrir para d\xFAvidas",
        "Pedir para fechar compartilhamento de tela",
        "Pr\xF3ximos passos (Acompanhamento por XX dias)",
        "Pedir consentimento para teste de QA",
        "Alinhar escopo (T\xE9cnico vs. Gerente de Contas)",
        "Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)",
        "Despedida"
      ]
    },
    "PT LT": {
      inicio: [
        "Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?",
        "Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.",
        "Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor",
        "Confirma\xE7\xE3o da Task e do AM",
        "A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.",
        "Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D",
        "Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).",
        "Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"
      ],
      meio: [
        "Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)",
        "Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'",
        "Confirmar recebimento do acesso",
        "Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)",
        "[Caso Recuse] Seguir com Compartilhamento de Tela"
      ],
      fim: [
        "Resumo da chamada (o que foi feito e como funciona)",
        "Oferecer ajuda adicional / Abrir para d\xFAvidas",
        "Pedir para fechar compartilhamento de tela",
        "Pr\xF3ximos passos (Acompanhamento por XX dias)",
        "Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?",
        "Alinhar escopo (T\xE9cnico vs. Gerente de Contas)",
        "Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)",
        "Despedida"
      ]
    },
    "ES BAU": {
      inicio: ["Introducci\xF3n (Nombre y Equipo).", "La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.", "Informar sitio web registrado en el caso.", "Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.", "Confirmaciones: Tarea, AM", "Informar el tiempo que va a durar la reuni\xF3n.", "Confirmaci\xF3n: Copia de seguridad y acceso de ADM", "Cerrar contenido sensible antes de compartir la pantalla."],
      fim: ["Resumen de la llamada.", "Ayuda adicional.", "Cerrar la pantalla compartida.", "Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)", "Encuesta de Satisfacci\xF3n.", "Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]
    },
    "ES LT": {
      inicio: ["Presentaci\xF3n (Nombre y equipo).", "Informar al cliente sobre la llamada grabada.", "Tiempo de duraci\xF3n de la llamada.", "Solicitar al anunciante que confirme lo siguiente: \n A) 10 d\xEDgitos de la cuenta \n B) Correo electr\xF3nico \n C) N\xFAmero de tel\xE9fono y \n D) Nombre del sitio web.", "autenticar la cuenta del anunciante en el cases, si corresponde.", "T\xE9rminos y condiciones.", "Informar las Task solicitadas y AM.", "Cerrar contenido sensible.", "Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.", "Resumen de llamada."],
      fim: ["Ofrecer ayuda adicional.", "Dejar de compartir la pantalla.", "Pasos siguientes (Si se le har\xE1 seguimiento al caso).", "Encuesta de Satisfacci\xF3n.", "Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]
    },
    "EN BAU": {
      inicio: ["Example 1", "Example 2"],
      fim: ["Example 3", "Example 4"]
    }
  };

  // src/modules/call-script/call-script-assistant.js
  function initCallScriptAssistant() {
    const CURRENT_VERSION = "v3.0.0";
    const COLORS4 = {
      bgApp: "#F5F5F7",
      bgSurface: "#FFFFFF",
      borderSubtle: "rgba(0, 0, 0, 0.07)",
      primary: "#007AFF",
      primaryBg: "rgba(0, 122, 255, 0.1)",
      textPrimary: "#1D1D1F",
      textSecondary: "#6E6E73",
      shadowCard: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
      success: "#34A853"
    };
    const localStyleId = "csa-local-styles";
    if (!document.getElementById(localStyleId)) {
      const s = document.createElement("style");
      s.id = localStyleId;
      s.innerHTML = `
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
      `;
      document.head.appendChild(s);
    }
    const styles = {
      // Barra de Progresso
      progressBarContainer: { height: "6px", background: COLORS4.borderSubtle, width: "100%", position: "relative", overflow: "hidden" },
      progressBarFill: { height: "100%", width: "0%", transition: "width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)", borderRadius: "0 3px 3px 0" },
      contentArea: { padding: "16px", overflowY: "auto", flexGrow: "1", background: COLORS4.bgApp, scrollBehavior: "smooth" },
      // Cards do Script
      card: { background: COLORS4.bgSurface, border: `1px solid ${COLORS4.borderSubtle}`, borderRadius: "12px", padding: "16px", marginBottom: "16px", transition: "transform 0.2s ease, box-shadow 0.2s ease", boxShadow: COLORS4.shadowCard },
      cardTitle: { fontSize: "11px", fontWeight: "700", color: COLORS4.textSecondary, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", userSelect: "none" },
      itemRow: { display: "flex", alignItems: "flex-start", padding: "10px 8px", cursor: "pointer", borderRadius: "10px", transition: "all 0.2s ease", color: COLORS4.textPrimary, fontSize: "14px", lineHeight: "1.5", marginBottom: "2px" },
      itemCompleted: { background: "rgba(0, 0, 0, 0.02)" },
      checkbox: { minWidth: "20px", height: "20px", borderRadius: "50%", border: `2px solid ${COLORS4.borderSubtle}`, marginRight: "12px", marginTop: "1px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)", background: "#fff" },
      // Footer
      footer: { padding: "12px 16px", borderTop: "1px solid #F1F3F4", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" },
      resetBtn: { background: "transparent", border: "none", color: "#d93025", fontSize: "12px", fontWeight: "600", cursor: "pointer", padding: "6px 12px", borderRadius: "20px", transition: "background 0.2s ease", display: "flex", alignItems: "center", gap: "4px" },
      // Context Banner (HD Style)
      contextBanner: {
        padding: "20px 20px 16px 20px",
        background: "#FFFFFF",
        borderBottom: "1px solid #F1F3F4",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
        position: "relative",
        zIndex: "5"
      }
    };
    const csaCompletedTasks = {};
    let csaCurrentLang = "PT";
    let csaCurrentType = "BAU";
    let csaVisible = false;
    const csaPopup = document.createElement("div");
    csaPopup.id = "call-script-popup";
    csaPopup.classList.add("cw-module-window");
    Object.assign(csaPopup.style, stylePopup, {
      right: "auto",
      left: "50%",
      width: "420px",
      height: "700px",
      display: "flex",
      flexDirection: "column",
      transform: "translateX(-50%) scale(0.05)"
    });
    const animRefs = { popup: csaPopup, googleLine: null };
    let monitorInterval = null;
    function updateContextData() {
      if (!csaVisible) return;
      getPageData().then((data) => {
        const elName = csaPopup.querySelector("#cw-ctx-name");
        const elCid = csaPopup.querySelector("#cw-ctx-cid");
        const elEmail = csaPopup.querySelector("#cw-ctx-email");
        if (elName) elName.textContent = data.advertiserName || "Cliente Desconhecido";
        if (elCid) {
          const cidTxt = data.cid || "---";
          if (elCid.textContent !== cidTxt) elCid.textContent = cidTxt;
        }
        if (elEmail) {
          const emailTxt = data.clientEmail || "N\xE3o encontrado";
          if (elEmail.textContent !== emailTxt) {
            elEmail.textContent = emailTxt;
            elEmail.title = emailTxt;
          }
        }
      });
    }
    function populateMessageArea() {
      getPageData().then((data) => {
        const today = (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR");
        const area = csaPopup.querySelector("#cw-am-message-area");
        const container = csaPopup.querySelector("#cw-am-review-container");
        let message = `Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${data.advertiserName || "Cliente"}) em andamento hoje (${today}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${data.advertiserName || "---"}
CID: ${data.cid || "---"}
Case ID: ${data.caseId || "---"}
E-mail: ${data.clientEmail || "---"}`;
        if (area) area.value = message;
        if (container) {
          container.style.display = "block";
          container.style.maxHeight = "300px";
          container.style.opacity = "1";
          container.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      });
    }
    function toggleVisibility() {
      csaVisible = !csaVisible;
      toggleGenieAnimation(csaVisible, csaPopup, "cw-btn-script");
      if (csaVisible) {
        updateContextData();
        if (!monitorInterval) monitorInterval = setInterval(updateContextData, 2e3);
      } else {
        if (monitorInterval) {
          clearInterval(monitorInterval);
          monitorInterval = null;
        }
      }
    }
    const csaHeader = createStandardHeader(
      csaPopup,
      "Call Script",
      CURRENT_VERSION,
      "Guia interativo para condu\xE7\xE3o de chamadas.",
      animRefs,
      () => {
        toggleVisibility();
      }
    );
    csaPopup.appendChild(csaHeader);
    const contextBanner = document.createElement("div");
    Object.assign(contextBanner.style, styles.contextBanner);
    contextBanner.innerHTML = `
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
  `;
    const optionsBtn = contextBanner.querySelector("#csa-toggle-options");
    const optionsContent = contextBanner.querySelector("#csa-options-content");
    const optionsArrow = contextBanner.querySelector("#csa-options-arrow");
    let optionsExpanded = false;
    optionsBtn.onclick = () => {
      optionsExpanded = !optionsExpanded;
      optionsArrow.style.transform = optionsExpanded ? "rotate(180deg)" : "rotate(0deg)";
      optionsContent.style.maxHeight = optionsExpanded ? "400px" : "0";
      optionsContent.style.opacity = optionsExpanded ? "1" : "0";
      optionsContent.style.marginTop = optionsExpanded ? "8px" : "0";
      SoundManager.playClick();
    };
    const messageBtn = contextBanner.querySelector("#cw-pill-message");
    const finalCopyBtn = contextBanner.querySelector("#cw-am-copy-final");
    const messageArea = contextBanner.querySelector("#cw-am-message-area");
    messageBtn.onmouseenter = () => {
      messageBtn.style.borderColor = "#007AFF";
      messageBtn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
    };
    messageBtn.onmouseleave = () => {
      messageBtn.style.borderColor = "#DADCE0";
      messageBtn.style.boxShadow = "0 1px 2px rgba(0,0,0,0.02)";
    };
    messageBtn.addEventListener("click", () => {
      populateMessageArea();
    });
    finalCopyBtn.addEventListener("click", () => {
      if (messageArea.value) {
        navigator.clipboard.writeText(messageArea.value);
        showToast("Mensagem copiada!");
        SoundManager.playSuccess();
        finalCopyBtn.style.background = "#34A853";
        finalCopyBtn.textContent = "Copiado!";
        setTimeout(() => {
          finalCopyBtn.style.background = "#1A73E8";
          finalCopyBtn.textContent = "Copiar Mensagem Final";
        }, 2e3);
      }
    });
    const setupCopy = (id, textId) => {
      const pill = contextBanner.querySelector(id);
      const textEl = contextBanner.querySelector(textId);
      pill.onclick = () => {
        const text = textEl.textContent;
        if (!text || text.includes("---") || text.includes("N\xE3o encontrado")) return;
        navigator.clipboard.writeText(text);
        SoundManager.playSuccess();
        pill.classList.add("copied");
        setTimeout(() => pill.classList.remove("copied"), 1500);
      };
    };
    csaPopup.appendChild(contextBanner);
    const progressContainer = document.createElement("div");
    Object.assign(progressContainer.style, styles.progressBarContainer);
    const progressFill = document.createElement("div");
    progressFill.className = "csa-progress-fill";
    Object.assign(progressFill.style, styles.progressBarFill);
    progressContainer.appendChild(progressFill);
    csaPopup.appendChild(progressContainer);
    const csaContent = document.createElement("div");
    csaContent.id = "csa-content";
    Object.assign(csaContent.style, styles.contentArea);
    csaPopup.appendChild(csaContent);
    const footer = document.createElement("div");
    Object.assign(footer.style, styles.footer);
    const credit = document.createElement("span");
    credit.textContent = "by lucaste@";
    Object.assign(credit.style, { fontSize: "10px", color: "#bdc1c6" });
    const resetBtn = document.createElement("button");
    resetBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script`;
    Object.assign(resetBtn.style, styles.resetBtn);
    resetBtn.onmouseenter = () => resetBtn.style.background = "#fce8e6";
    resetBtn.onmouseleave = () => resetBtn.style.background = "transparent";
    resetBtn.onclick = () => {
      resetBtn.style.transform = "scale(0.9)";
      setTimeout(() => resetBtn.style.transform = "scale(1)", 150);
      for (let key in csaCompletedTasks) delete csaCompletedTasks[key];
      csaBuildChecklist();
    };
    footer.appendChild(credit);
    footer.appendChild(resetBtn);
    csaPopup.appendChild(footer);
    const csaControlsDiv = document.createElement("div");
    Object.assign(csaControlsDiv.style, { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" });
    const typeControl = document.createElement("div");
    typeControl.className = "csa-segmented-control";
    typeControl.innerHTML = `
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `;
    const langControl = document.createElement("div");
    langControl.className = "csa-segmented-control";
    langControl.innerHTML = `
      <div class="csa-segmented-indicator" id="lang-indicator" style="width: calc(33.33% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-lang="PT">PT</button>
      <button data-lang="ES">ES</button>
      <button data-lang="EN">EN</button>
  `;
    csaControlsDiv.appendChild(typeControl);
    csaControlsDiv.appendChild(langControl);
    csaContent.appendChild(csaControlsDiv);
    const typeButtons = typeControl.querySelectorAll("button");
    const typeIndicator = typeControl.querySelector("#type-indicator");
    typeButtons.forEach((btn, idx) => {
      btn.onclick = () => {
        typeButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        typeIndicator.style.transform = `translateX(${idx * (typeControl.offsetWidth / 2 - 2)}px)`;
        csaCurrentType = btn.dataset.type;
        SoundManager.playClick();
        csaBuildChecklist();
      };
    });
    const langButtons = langControl.querySelectorAll("button");
    const langIndicator = langControl.querySelector("#lang-indicator");
    langButtons.forEach((btn, idx) => {
      btn.onclick = () => {
        langButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        langIndicator.style.transform = `translateX(${idx * (langControl.offsetWidth / 3 - 1)}px)`;
        csaCurrentLang = btn.dataset.lang;
        SoundManager.playClick();
        csaBuildChecklist();
      };
    });
    const csaChecklistArea = document.createElement("div");
    csaChecklistArea.id = "csa-checklist-area";
    csaContent.appendChild(csaChecklistArea);
    const resizeHandle = document.createElement("div");
    Object.assign(resizeHandle.style, styleResizeHandle);
    resizeHandle.className = "no-drag";
    resizeHandle.title = "Redimensionar";
    csaPopup.appendChild(resizeHandle);
    makeResizable(csaPopup, resizeHandle);
    document.body.appendChild(csaPopup);
    setupCopy("#cw-pill-cid", "#cw-ctx-cid");
    setupCopy("#cw-pill-email", "#cw-ctx-email");
    function formatScriptText(text) {
      return text;
    }
    function csaBuildChecklist() {
      csaChecklistArea.innerHTML = "";
      const combinedKey = `${csaCurrentLang} ${csaCurrentType}`;
      const data = csaChecklistData[combinedKey];
      if (!data) {
        csaChecklistArea.innerHTML = `<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>`;
        progressFill.style.width = "0%";
        return;
      }
      const activeColor = COLORS4.primary;
      let totalItems = 0;
      let completedItems = 0;
      ["inicio", "meio", "fim"].forEach((k) => {
        if (data[k]) totalItems += data[k].length;
      });
      ["inicio", "meio", "fim"].forEach((groupKey, groupIndex) => {
        const items = data[groupKey];
        if (!items || items.length === 0) return;
        const card = document.createElement("div");
        Object.assign(card.style, styles.card);
        const cardTitle = document.createElement("div");
        Object.assign(cardTitle.style, styles.cardTitle);
        let titleText = "";
        if (groupKey === "inicio") {
          if (csaCurrentLang.includes("ES")) titleText = "Apertura";
          else if (csaCurrentLang.includes("EN")) titleText = "Opening";
          else titleText = "Abertura";
        } else if (groupKey === "meio") {
          if (csaCurrentLang.includes("ES")) titleText = "Implementaci\xF3n";
          else if (csaCurrentLang.includes("EN")) titleText = "Implementation";
          else titleText = "Implementa\xE7\xE3o (Tag Support)";
        } else if (groupKey === "fim") {
          if (csaCurrentLang.includes("ES")) titleText = "Cierre";
          else if (csaCurrentLang.includes("EN")) titleText = "Closing";
          else titleText = "Fechamento";
        }
        cardTitle.textContent = titleText;
        const counter = document.createElement("span");
        counter.style.fontSize = "11px";
        counter.style.opacity = "0.7";
        counter.style.fontWeight = "500";
        counter.style.background = "#f1f3f4";
        counter.style.padding = "2px 8px";
        counter.style.borderRadius = "10px";
        cardTitle.appendChild(counter);
        card.appendChild(cardTitle);
        let groupDoneCount = 0;
        items.forEach((itemText, index) => {
          const key = `${combinedKey}-${groupKey}-${index}`;
          const isDone = !!csaCompletedTasks[key];
          if (isDone) {
            completedItems++;
            groupDoneCount++;
          }
          const row = document.createElement("div");
          Object.assign(row.style, styles.itemRow);
          const chk = document.createElement("div");
          Object.assign(chk.style, styles.checkbox);
          const textSpan = document.createElement("span");
          textSpan.className = "csa-item-text" + (isDone ? " completed" : "");
          textSpan.innerHTML = formatScriptText(itemText);
          textSpan.style.flex = "1";
          if (isDone) {
            Object.assign(row.style, styles.itemCompleted);
            chk.style.background = activeColor;
            chk.style.borderColor = activeColor;
            chk.style.transform = "scale(1)";
            chk.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
          } else {
            chk.style.background = "transparent";
            chk.style.borderColor = COLORS4.borderSubtle;
            chk.style.transform = "scale(1)";
            chk.innerHTML = "";
          }
          row.onclick = () => {
            const newState = !csaCompletedTasks[key];
            csaCompletedTasks[key] = newState;
            SoundManager.playClick();
            if (newState) {
              chk.style.transform = "scale(1.15)";
              setTimeout(() => chk.style.transform = "scale(1)", 150);
              Object.assign(row.style, styles.itemCompleted);
              textSpan.classList.add("completed");
              chk.style.background = activeColor;
              chk.style.borderColor = activeColor;
              chk.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            } else {
              row.style.background = "transparent";
              textSpan.classList.remove("completed");
              chk.style.background = "transparent";
              chk.style.borderColor = COLORS4.borderSubtle;
              chk.innerHTML = "";
            }
            updateProgressAndCounters(combinedKey, data);
          };
          row.onmouseenter = () => {
            if (!csaCompletedTasks[key]) {
              row.style.background = "rgba(0, 0, 0, 0.03)";
              chk.style.borderColor = activeColor;
            }
          };
          row.onmouseleave = () => {
            if (!csaCompletedTasks[key]) {
              row.style.background = "transparent";
              chk.style.borderColor = COLORS4.borderSubtle;
            }
          };
          row.appendChild(chk);
          row.appendChild(textSpan);
          card.appendChild(row);
        });
        if (groupDoneCount === items.length && items.length > 0) {
          counter.style.color = "#1e8e3e";
          counter.style.background = "#e6f4ea";
          card.style.boxShadow = "inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)";
        }
        counter.textContent = `${groupDoneCount}/${items.length}`;
        csaChecklistArea.appendChild(card);
      });
      updateProgressUI(totalItems, completedItems);
    }
    function updateProgressAndCounters(combinedKey, data) {
      let total = 0;
      let completed = 0;
      ["inicio", "meio", "fim"].forEach((groupKey) => {
        const items = data[groupKey] || [];
        total += items.length;
        items.forEach((_, idx) => {
          if (csaCompletedTasks[`${combinedKey}-${groupKey}-${idx}`]) completed++;
        });
      });
      updateProgressUI(total, completed);
      setTimeout(() => csaBuildChecklist(), 200);
    }
    function updateProgressUI(total, completed) {
      const pct = total === 0 ? 0 : completed / total * 100;
      progressFill.style.width = `${pct}%`;
      if (pct === 100) {
        progressFill.style.background = COLORS4.success;
        progressFill.classList.remove("csa-progress-fill");
      } else {
        progressFill.style.background = "";
        progressFill.classList.add("csa-progress-fill");
      }
    }
    csaBuildChecklist();
    return toggleVisibility;
  }

  // src/modules/lm-report/lm-repot-assistant.js
  var LINKS_DB = {
    tasks: {
      label: "Tarefas",
      links: [
        { name: "Web Clock Punch", url: "https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT", desc: "Ponto Eletr\xF4nico" },
        { name: "Web\xE3o Help Deluxe", url: "http://go/webao-help-deluxe", desc: "Ferramenta de ajuda" },
        { name: "Moma Home", url: "https://moma.corp.google.com/", desc: "Intranet Google" },
        { name: "Plx DataSites", url: "https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/", desc: "Relat\xF3rio Follow-ups" },
        { name: "Escala & Ader\xEAncia", url: "https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid", desc: "Dashboard WFM" },
        { name: "Performance Indiv.", url: "https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce", desc: "Tech Solutions SAO" },
        { name: "Solicitar Grava\xE7\xE3o", url: "https://support.google.com/policies/contact/sar", desc: "Form Grava\xE7\xE3o" },
        { name: "Escala\xE7\xE3o Sellers", url: "https://forms.gle/HWMhML56eE4CPZCs5", desc: "Form Escala\xE7\xE3o" },
        { name: "[SOP] Split", url: "https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o", desc: "Instru\xE7\xF5es Split" }
      ]
    },
    ads: {
      label: "Ads",
      links: [
        { name: "SPA (Tag Support)", url: "https://tagsupport.corp.google.com/create-session", desc: "Single Page App" },
        { name: "[SOP] Conv. Tracking", url: "https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit", desc: "Procedimento Padr\xE3o" },
        { name: "Win Criteria: Code", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit", desc: "Valida\xE7\xE3o C\xF3digo" },
        { name: "[SOP] Call Conv.", url: "https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit", desc: "Convers\xE3o Chamada" },
        { name: "Win Criteria: WCC", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15", desc: "Valida\xE7\xE3o WCC" },
        { name: "[SOP] Enhanced Conv.", url: "https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit", desc: "ECW4" },
        { name: "Ads EC Dashboard", url: "https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69", desc: "Monitoramento EC" },
        { name: "[SOP] Troubleshooting", url: "https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit", desc: "Resolu\xE7\xE3o problemas" },
        { name: "[SOP] Remarketing", url: "https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit", desc: "Implementa\xE7\xE3o RMKT" },
        { name: "[SOP] Lead Scoring", url: "https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit", desc: "Pontua\xE7\xE3o Leads" },
        { name: "[SOP] GTM Install", url: "https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit", desc: "Instala\xE7\xE3o Container" }
      ]
    },
    analytics: {
      label: "GA4",
      links: [
        { name: "[SOP] GA4 Setup", url: "https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit", desc: "Instala\xE7\xE3o Config." },
        { name: "Win Criteria: GA4", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51", desc: "Valida\xE7\xE3o GA4" },
        { name: "GA4 E-commerce", url: "https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br", desc: "Guia Dev" },
        { name: "[SOP] Troubleshoot GA4", url: "https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit", desc: "Resolu\xE7\xE3o Problemas" },
        { name: "[SOP] Cross Domain", url: "https://support.google.com/ads-help/answer/12282402", desc: "Dom\xEDnio Cruzado" },
        { name: "Eventos Recomendados", url: "https://developers.google.com/analytics/devguides/collection/ga4/reference/events", desc: "Lista Oficial" },
        { name: "UTM Builder", url: "https://ga-dev-tools.google/ga4/campaign-url-builder/", desc: "Criador URLs" }
      ]
    },
    shopping: {
      label: "Shop",
      links: [
        { name: "[SOP] Onboarding MC", url: "https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit", desc: "Setup Inicial" },
        { name: "[SOP] Feed Opt", url: "https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit", desc: "Otimiza\xE7\xE3o Feed" },
        { name: "ShopTroubleshooting", url: "http://go/shoptroubleshooting", desc: "Ferramenta Interna" },
        { name: "[SOP] Product Reviews", url: "https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit", desc: "Avalia\xE7\xF5es" },
        { name: "[SOP] Offline Feed", url: "https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit", desc: "Feeds Offline" },
        { name: "Especifica\xE7\xE3o Dados", url: "https://support.google.com/merchants/answer/7052112", desc: "Help Center" }
      ]
    },
    tech: {
      label: "Tech",
      links: [
        { name: "Solu\xE7\xF5es por CMS", url: "https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0", desc: "Guias CMS" },
        { name: "Iframes & Cross-Origin", url: "https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0", desc: "Solu\xE7\xF5es Iframes" },
        { name: "Ads ICS Ghost", url: "http://go/pqp", desc: "Ghost Ads" },
        { name: "Analytics ICS Ghost", url: "http://go/analytics-ics", desc: "Ghost Analytics" },
        { name: "GTM ICS Ghost", url: "http://go/tagmanager-ics", desc: "Ghost GTM" },
        { name: "Gearloose", url: "http://go/gearloose", desc: "Ferramenta" },
        { name: "MC ICS Ghost", url: "https://mcn-ics.corp.google.com/mc/overview", desc: "Ghost MC" },
        { name: "JSFiddle", url: "https://jsfiddle.net/", desc: "Playground JS" },
        { name: "RegExr", url: "https://regexr.com/", desc: "Testador Regex" },
        { name: "Doc. CSP", url: "https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.", desc: "Doc. CSP" },
        { name: "Consent Mode Install", url: "https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced", desc: "Guia CoMo" },
        { name: "Consent Mode Debug", url: "https://developers.google.com/tag-platform/security/guides/consent-debugging", desc: "Debug CoMo" }
      ]
    },
    hr: {
      label: "RH",
      links: [
        { name: "Be.Cognizant", url: "https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx", desc: "Portal Colaborador" },
        { name: "OneCognizant", url: "https://onecognizant.cognizant.com/Home", desc: "Apps e Sistemas" },
        { name: "ADP eXpert", url: "https://expert.cloud.brasil.adp.com/expert2/v4/", desc: "Folha Pagamento" }
      ]
    },
    lm: {
      label: "Forms",
      links: [
        { name: "Ocorr\xEAncias e Pausas", url: "https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform", desc: "Reportar problemas" },
        { name: "Chamadas >50min", url: "https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform", desc: "Registro chamadas" },
        { name: "Relat\xF3rio de Bugs", url: "https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform", desc: "Erros de sistema" },
        { name: "Suporte LM", url: "https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec", desc: "BAU/Descarte/Monitoria" }
      ]
    },
    qa: {
      label: "QA",
      links: [
        { name: "Elogios", url: "https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform", desc: "Feedback positivo" },
        { name: "Casos Complexos", url: "https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw", desc: "Casos dif\xEDceis" }
      ]
    },
    suporte: {
      label: "Ajuda",
      links: [
        { name: "Fale Conosco Ads", url: "https://support.google.com/google-ads/gethelp", desc: "Chat/Email Ads" },
        { name: "Fale Conosco Merchant", url: "https://support.google.com/merchants/gethelp", desc: "Chat/Email Shopping" },
        { name: "Fale Conosco GMB", url: "https://support.google.com/business/gethelp", desc: "Perfil da Empresa" },
        { name: "Suporte API", url: "https://support.google.com/googleapi", desc: "Console API" },
        { name: "Telefones Suporte", url: "https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers", desc: "Lista de n\xFAmeros" },
        { name: "Skill Shop", url: "https://skillshop.withgoogle.com/intl/pt-BR_ALL/", desc: "Cursos" }
      ]
    }
  };
  var CATEGORY_ICONS = {
    tasks: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    lm: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
    qa: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`,
    suporte: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`,
    ads: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    analytics: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`,
    shopping: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
    tech: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
    hr: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    history: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>`
  };
  var CAT_THEMES = {
    tasks: { color: "#0097A7", bg: "#E0F7FA" },
    // Cyan
    ads: { color: "#1967D2", bg: "#E8F0FE" },
    // Google Blue
    analytics: { color: "#E37400", bg: "#FEF7E0" },
    // Orange
    shopping: { color: "#188038", bg: "#E6F4EA" },
    // Green
    tech: { color: "#9334E6", bg: "#F3E8FD" },
    // Purple
    hr: { color: "#C5221F", bg: "#FCE8E6" },
    // Red
    lm: { color: "#5F6368", bg: "#F1F3F4" },
    // Slate
    qa: { color: "#F09D00", bg: "#FFF3E0" },
    // Amber
    suporte: { color: "#0B57D0", bg: "#D3E3FD" },
    // Light Blue
    history: { color: "#5F6368", bg: "#FFFFFF" }
    // Default
  };
  var HISTORY_KEY = "cw_link_history_v4";
  function addToHistory(linkObj, catKey) {
    try {
      let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      history = history.filter((h) => h.url !== linkObj.url);
      history.unshift({ ...linkObj, _originalCat: catKey });
      history = history.slice(0, 3);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn("Erro ao salvar hist\xF3rico", e);
    }
  }
  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }
  function initFeedbackAssistant() {
    const CURRENT_VERSION = "v4.6";
    let searchTerm = "";
    let visible = false;
    let activeCategoryKey = null;
    let isHistoryOpen = false;
    const COLORS4 = {
      bgApp: "#F8F9FA",
      bgSidebar: "#FFFFFF",
      // Sidebar branca fica mais limpa com ícones coloridos
      bgSurface: "#FFFFFF",
      textPrimary: "#202124",
      textSecondary: "#5F6368",
      borderSubtle: "rgba(0,0,0,0.06)"
    };
    const popup = document.createElement("div");
    popup.id = "links-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, {
      right: "100px",
      width: "600px",
      height: "650px",
      background: COLORS4.bgApp,
      overflow: "hidden"
    });
    const animRefs = { popup, googleLine: null };
    const header = createStandardHeader(
      popup,
      "Central de Links",
      CURRENT_VERSION,
      "Navegue pelas categorias ou use a busca.",
      animRefs,
      () => toggleVisibility()
    );
    popup.appendChild(header);
    const mainLayout = document.createElement("div");
    mainLayout.style.cssText = "display: flex; height: calc(100% - 56px); width: 100%; position: relative;";
    popup.appendChild(mainLayout);
    const sidebar = document.createElement("div");
    sidebar.style.cssText = `
      width: 80px; flex-shrink: 0; background: ${COLORS4.bgSidebar};
      border-right: 1px solid ${COLORS4.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `;
    mainLayout.appendChild(sidebar);
    const contentWrapper = document.createElement("div");
    contentWrapper.style.cssText = "flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;";
    mainLayout.appendChild(contentWrapper);
    const searchBar = document.createElement("div");
    searchBar.style.cssText = "padding: 16px 24px; flex-shrink: 0; background: transparent;";
    const searchInputWrapper = document.createElement("div");
    searchInputWrapper.style.cssText = `
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;
    const searchIcon = document.createElement("div");
    searchIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
    searchIcon.style.cssText = "margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Buscar ferramenta ou SOP...";
    searchInput.style.cssText = `
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${COLORS4.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `;
    searchInput.onfocus = () => {
      searchInputWrapper.style.boxShadow = "0 4px 12px rgba(26,115,232,0.15)";
      searchInputWrapper.style.border = "1px solid #1a73e8";
    };
    searchInput.onblur = () => {
      searchInputWrapper.style.boxShadow = "0 2px 6px rgba(0,0,0,0.04)";
      searchInputWrapper.style.border = "1px solid transparent";
    };
    searchInputWrapper.appendChild(searchIcon);
    searchInputWrapper.appendChild(searchInput);
    searchBar.appendChild(searchInputWrapper);
    contentWrapper.appendChild(searchBar);
    const scrollContent = document.createElement("div");
    scrollContent.style.cssText = "flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;";
    contentWrapper.appendChild(scrollContent);
    let historyOverlay = null;
    function createHistoryOverlay() {
      if (historyOverlay) return;
      historyOverlay = document.createElement("div");
      historyOverlay.style.cssText = `
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;
      const hHead = document.createElement("div");
      hHead.style.cssText = "padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;";
      hHead.innerHTML = `<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>`;
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      closeBtn.style.cssText = "background: none; border: none; cursor: pointer; color: #5f6368;";
      closeBtn.onclick = () => {
        hideHistoryOverlay();
        isHistoryOpen = false;
        updateSidebarVisuals();
      };
      hHead.appendChild(closeBtn);
      historyOverlay.appendChild(hHead);
      const hList = document.createElement("div");
      hList.id = "cw-history-list";
      hList.style.cssText = "flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;";
      historyOverlay.appendChild(hList);
      contentWrapper.appendChild(historyOverlay);
    }
    function showHistoryOverlay() {
      if (!historyOverlay) createHistoryOverlay();
      const list = historyOverlay.querySelector("#cw-history-list");
      list.innerHTML = "";
      const history = getHistory();
      if (history.length === 0) {
        list.innerHTML = `<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>`;
      } else {
        history.forEach((link) => {
          const card = createLinkCard(link, CATEGORY_ICONS[link._originalCat], true, link._originalCat);
          list.appendChild(card);
        });
      }
      requestAnimationFrame(() => historyOverlay.style.transform = "translateY(0)");
    }
    function hideHistoryOverlay() {
      if (historyOverlay) historyOverlay.style.transform = "translateY(100%)";
    }
    function renderSidebar() {
      sidebar.innerHTML = "";
      const histBtn = createNavBtn("history", "Recentes", CATEGORY_ICONS.history);
      histBtn.id = "cw-sidebar-btn-history";
      histBtn.onclick = () => {
        SoundManager.playClick();
        isHistoryOpen = !isHistoryOpen;
        if (isHistoryOpen) {
          showHistoryOverlay();
        } else {
          hideHistoryOverlay();
        }
        updateSidebarVisuals();
      };
      sidebar.appendChild(histBtn);
      const div = document.createElement("div");
      div.style.cssText = "width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;";
      sidebar.appendChild(div);
      Object.keys(LINKS_DB).forEach((key) => {
        const cat = LINKS_DB[key];
        const btn = createNavBtn(key, cat.label, CATEGORY_ICONS[key]);
        btn.id = `cw-sidebar-btn-${key}`;
        btn.onclick = () => {
          SoundManager.playClick();
          if (isHistoryOpen) {
            isHistoryOpen = false;
            hideHistoryOverlay();
          }
          scrollToSection(key);
        };
        sidebar.appendChild(btn);
      });
    }
    function createNavBtn(key, label, iconSvg) {
      const btn = document.createElement("div");
      btn.style.cssText = `
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${COLORS4.textSecondary};
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `;
      btn.title = label;
      btn.dataset.key = key;
      const iconDiv = document.createElement("div");
      iconDiv.style.cssText = "width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;";
      iconDiv.innerHTML = iconSvg || CATEGORY_ICONS.tasks;
      const labelDiv = document.createElement("div");
      labelDiv.style.cssText = "font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;";
      labelDiv.textContent = label;
      btn.appendChild(iconDiv);
      btn.appendChild(labelDiv);
      btn.onmouseenter = () => {
        if (activeCategoryKey !== key && !(key === "history" && isHistoryOpen)) {
          btn.style.background = "#F1F3F4";
          iconDiv.style.transform = "scale(1.1)";
        }
      };
      btn.onmouseleave = () => {
        if (activeCategoryKey !== key && !(key === "history" && isHistoryOpen)) {
          btn.style.background = "transparent";
          iconDiv.style.transform = "scale(1)";
        }
      };
      return btn;
    }
    function scrollToSection(key) {
      const target = document.getElementById(`cat-anchor-${key}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        activeCategoryKey = key;
        updateSidebarVisuals();
      }
    }
    function updateSidebarVisuals() {
      Object.keys(LINKS_DB).forEach((key) => {
        const btn = sidebar.querySelector(`#cw-sidebar-btn-${key}`);
        if (!btn) return;
        if (activeCategoryKey === key && !isHistoryOpen) {
          const theme = CAT_THEMES[key];
          btn.style.background = theme.bg;
          btn.style.color = theme.color;
          btn.querySelector("div:first-child").style.transform = "scale(1.1)";
        } else {
          btn.style.background = "transparent";
          btn.style.color = COLORS4.textSecondary;
          btn.querySelector("div:first-child").style.transform = "scale(1)";
        }
      });
      const histBtn = sidebar.querySelector(`#cw-sidebar-btn-history`);
      if (histBtn) {
        if (isHistoryOpen) {
          histBtn.style.background = "#3C4043";
          histBtn.style.color = "#FFFFFF";
        } else {
          histBtn.style.background = "transparent";
          histBtn.style.color = COLORS4.textSecondary;
        }
      }
    }
    function renderContent() {
      scrollContent.innerHTML = "";
      if (searchTerm.trim() !== "") {
        let results = [];
        Object.entries(LINKS_DB).forEach(([key, cat]) => {
          const filtered = cat.links.filter(
            (l) => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.desc.toLowerCase().includes(searchTerm.toLowerCase())
          );
          results.push(...filtered.map((l) => ({ ...l, _cat: key })));
        });
        if (results.length === 0) {
          scrollContent.innerHTML = `<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>`;
          return;
        }
        const searchHeader = document.createElement("div");
        searchHeader.innerHTML = "Resultados da busca";
        searchHeader.style.cssText = "font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;";
        scrollContent.appendChild(searchHeader);
        results.forEach((link) => {
          const card = createLinkCard(link, CATEGORY_ICONS[link._cat], false, link._cat);
          scrollContent.appendChild(card);
        });
        return;
      }
      Object.entries(LINKS_DB).forEach(([key, cat]) => {
        const theme = CAT_THEMES[key];
        const catSection = document.createElement("div");
        const catHeader = document.createElement("div");
        catHeader.id = `cat-anchor-${key}`;
        catHeader.style.cssText = `
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${theme.color};
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `;
        catHeader.innerHTML = `
            <div style="width:8px; height:8px; border-radius:50%; background:${theme.color};"></div>
            ${cat.label}
          `;
        catSection.appendChild(catHeader);
        const grid = document.createElement("div");
        grid.style.cssText = "display: grid; grid-template-columns: 1fr; gap: 8px;";
        cat.links.forEach((link) => {
          const card = createLinkCard(link, CATEGORY_ICONS[key], false, key);
          grid.appendChild(card);
        });
        catSection.appendChild(grid);
        scrollContent.appendChild(catSection);
      });
      const spacer = document.createElement("div");
      spacer.style.height = "80px";
      scrollContent.appendChild(spacer);
    }
    function createLinkCard(link, iconSvg, isHistory, catKey) {
      const card = document.createElement("div");
      const theme = CAT_THEMES[catKey] || CAT_THEMES.history;
      card.style.cssText = `
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px;
          background: #FFFFFF;
          border: 1px solid transparent;
          border-radius: 16px;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;
      const iconBox = document.createElement("div");
      iconBox.style.cssText = `
          width: 40px; height: 40px; border-radius: 12px;
          background: ${theme.bg}; color: ${theme.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `;
      iconBox.innerHTML = iconSvg || CATEGORY_ICONS.tasks;
      const svg = iconBox.querySelector("svg");
      if (svg) {
        svg.style.width = "22px";
        svg.style.height = "22px";
      }
      const meta = document.createElement("div");
      meta.style.cssText = "flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";
      const title = document.createElement("div");
      title.style.cssText = `font-size: 14px; font-weight: 600; color: ${COLORS4.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
      title.textContent = link.name;
      const desc = document.createElement("div");
      desc.style.cssText = `font-size: 12px; color: ${COLORS4.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
      desc.textContent = link.desc;
      meta.appendChild(title);
      meta.appendChild(desc);
      const copyBtn = document.createElement("div");
      copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      copyBtn.style.cssText = `
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `;
      copyBtn.title = "Copiar URL";
      card.onmouseenter = () => {
        card.style.transform = "translateY(-2px)";
        card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
        card.style.borderColor = "rgba(0,0,0,0.05)";
        card.style.borderLeft = `4px solid ${theme.color}`;
        copyBtn.style.opacity = "1";
        copyBtn.style.background = "#F1F3F4";
      };
      card.onmouseleave = () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
        card.style.border = "1px solid transparent";
        copyBtn.style.opacity = "0";
        copyBtn.style.background = "transparent";
      };
      card.onclick = () => {
        if (!isHistory && catKey) addToHistory(link, catKey);
        window.open(link.url, "_blank");
      };
      copyBtn.onclick = (e) => {
        e.stopPropagation();
        SoundManager.playClick();
        navigator.clipboard.writeText(link.url);
        if (!isHistory && catKey) addToHistory(link, catKey);
        showToast("Link copiado!");
      };
      card.appendChild(iconBox);
      card.appendChild(meta);
      card.appendChild(copyBtn);
      return card;
    }
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value;
      renderContent();
    });
    function toggleVisibility() {
      visible = !visible;
      toggleGenieAnimation(visible, popup, "cw-btn-links");
    }
    document.body.appendChild(popup);
    renderSidebar();
    renderContent();
    return toggleVisibility;
  }

  // src/modules/broadcast/broadcast-data.js
  var BROADCAST_MESSAGES = [];
  function setBroadcastMessages(newData) {
    BROADCAST_MESSAGES = newData;
  }

  // src/modules/broadcast/broadcast-assistant.js
  var POLL_TIME_MS = 60 * 1e3;
  window._cwIsAdmin = false;
  window._cwCurrentUser = null;
  function initBroadcastAssistant() {
    const CURRENT_VERSION = "v4.9";
    let visible = false;
    let pollInterval = null;
    let currentEditingId = null;
    function formatFriendlyDate(dateInput) {
      if (!dateInput) return "";
      try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return String(dateInput);
        return date.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }).replace(",", " \xE0s");
      } catch (e) {
        return String(dateInput);
      }
    }
    if (!document.getElementById("cw-broadcast-hd-css")) {
      const s = document.createElement("style");
      s.id = "cw-broadcast-hd-css";
      s.innerHTML = `
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
      `;
      document.head.appendChild(s);
    }
    const styles = {
      feedContainer: { padding: "20px 24px 80px 24px", overflowY: "auto", flexGrow: "1", background: "#F8F9FA", display: "flex", flexDirection: "column", gap: "20px" },
      // CARD (Fundo Branco Puro + Contraste)
      card: {
        background: "#FFFFFF",
        // Fundo Branco
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.12)",
        // Borda um pouco mais visível
        boxShadow: "0 4px 12px rgba(60,64,67,0.08)",
        // Sombra para destacar do fundo cinza
        overflow: "hidden",
        transition: "all 0.3s ease",
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        flexShrink: "0"
      },
      cardHistory: {
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.05)",
        // Borda quase invisível
        boxShadow: "none",
        // Sem sombra (flat)
        opacity: "0.6",
        // Transparencia para indicar inativo
        filter: "grayscale(0.8)",
        // Cinza para reforçar histórico
        marginBottom: "16px",
        flexShrink: "0",
        width: "100%",
        boxSizing: "border-box",
        position: "relative"
      },
      cardHeader: { padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F1F3F4" },
      typeTag: { display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.6px", padding: "4px 8px", borderRadius: "6px" },
      dateTag: { fontSize: "11px", color: "#5f6368", fontWeight: "500" },
      cardContent: { padding: "16px 20px 20px 20px" },
      msgTitle: { fontSize: "16px", fontWeight: "700", color: "#202124", marginBottom: "8px", lineHeight: "1.4" },
      msgBody: { fontSize: "14px", color: "#3c4043", lineHeight: "1.6", whiteSpace: "pre-wrap", wordBreak: "break-word" },
      msgMeta: { fontSize: "11px", color: "#9aa0a6", marginTop: "12px", display: "flex", alignItems: "center", gap: "6px" },
      dismissBtn: { width: "28px", height: "28px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", background: "#fff", color: "#5f6368", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", marginLeft: "12px" },
      bauContainer: { margin: "16px 24px 0 24px", padding: "16px", background: "#F3E8FD", border: "1px solid #D8B4FE", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 4px 12px rgba(147, 51, 234, 0.1)" },
      bauHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2px" },
      bauLabel: { fontSize: "11px", fontWeight: "800", color: "#7E22CE", textTransform: "uppercase", letterSpacing: "0.8px" },
      liveIndicator: { display: "flex", alignItems: "center", gap: "8px" },
      pulseDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#9333EA", boxShadow: "0 0 0 0 rgba(147, 51, 234, 0.7)", animation: "cw-pulse 2s infinite" },
      bauSlotRow: { display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", background: "rgba(255,255,255,0.5)", borderRadius: "8px", marginBottom: "4px" },
      bauFlag: { fontSize: "18px", lineHeight: "1" },
      bauDate: { fontSize: "16px", fontWeight: "700", color: "#581C87", letterSpacing: "-0.5px" },
      emptyState: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 0", color: "#BDC1C6", gap: "16px", textAlign: "center" },
      historyDivider: { display: "flex", alignItems: "center", justifyContent: "center", margin: "20px 0", cursor: "pointer", color: "#1a73e8", fontSize: "13px", fontWeight: "500", gap: "8px", padding: "8px 16px", borderRadius: "20px", background: "#E8F0FE" },
      historyContainer: { display: "none", flexDirection: "column", gap: "16px", opacity: "0.8" }
    };
    const TYPE_CONFIG = {
      critical: { color: "#991B1B", bg: "#FEF2F2", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>` },
      info: { color: "#1E40AF", bg: "#EFF6FF", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>` },
      success: { color: "#166534", bg: "#F0FDF4", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>` }
    };
    function objectToCss(obj) {
      if (!obj) return "";
      return Object.entries(obj).map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}:${v}`).join(";");
    }
    function parseMessageText(rawText) {
      if (!rawText || typeof rawText !== "string") return "";
      let html = rawText;
      html = html.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>');
      html = html.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
      html = html.replace(/_(.*?)_/g, "<i>$1</i>");
      html = html.replace(/\n/g, "<br>");
      html = parseEmojiCodes(html);
      return html;
    }
    const popup = document.createElement("div");
    popup.id = "broadcast-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, {
      right: "auto",
      left: "50%",
      width: "420px",
      height: "680px",
      display: "flex",
      flexDirection: "column",
      transform: "translateX(-50%) scale(0.05)",
      backgroundColor: "#FAFAFA",
      overflow: "hidden"
    });
    const animRefs = { popup, googleLine: null };
    function toggleVisibility() {
      visible = !visible;
      toggleGenieAnimation(visible, popup, "cw-btn-broadcast");
      if (visible) {
        const btn = document.getElementById("cw-btn-broadcast");
        if (btn) btn.classList.remove("has-new");
        checkForUpdates();
      }
    }
    const header = createStandardHeader(
      popup,
      "Central de Avisos",
      CURRENT_VERSION,
      "Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",
      animRefs,
      () => toggleVisibility()
    );
    const actionContainer = header.querySelector(".cw-header-actions") || header.lastElementChild;
    let editorOverlay = null;
    function tryInjectAdminButton() {
      let email = null;
      try {
        email = getAgentEmail();
      } catch (e) {
        console.warn("TechSol: Auth Pending");
      }
      if (email) {
        const currentUser = email.split("@")[0].toLowerCase();
        const isAdmin = ADMINS.includes(currentUser);
        window._cwIsAdmin = isAdmin;
        window._cwCurrentUser = currentUser;
        if (isAdmin && actionContainer && !actionContainer.querySelector("#cw-admin-btn")) {
          const addBtn = document.createElement("div");
          addBtn.id = "cw-admin-btn";
          addBtn.className = "cw-btn-interactive";
          addBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
          Object.assign(addBtn.style, {
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1a73e8",
            background: "rgba(26, 115, 232, 0.1)",
            marginRight: "8px"
          });
          addBtn.title = "Novo Aviso";
          addBtn.onclick = (e) => {
            e.stopPropagation();
            openEditor();
          };
          actionContainer.insertBefore(addBtn, actionContainer.firstChild);
          if (!editorOverlay) createEditorOverlay();
          renderFeed();
        }
      } else {
        if (!window._cwAdminRetries) window._cwAdminRetries = 0;
        if (window._cwAdminRetries < 5) {
          window._cwAdminRetries++;
          setTimeout(tryInjectAdminButton, 2e3);
        }
      }
    }
    if (actionContainer) {
      const markAll = document.createElement("button");
      markAll.textContent = "Limpar";
      markAll.className = "cw-btn-interactive";
      Object.assign(markAll.style, { fontSize: "12px", color: "#1a73e8", background: "transparent", border: "none", padding: "8px", fontWeight: "600" });
      markAll.onclick = (e) => {
        e.stopPropagation();
        SoundManager.playSuccess();
        const allIds = BROADCAST_MESSAGES.map((m) => m.id);
        localStorage.setItem("cw_read_broadcasts", JSON.stringify(allIds));
        renderFeed();
        updateBadge();
      };
      actionContainer.insertBefore(markAll, actionContainer.firstChild);
    }
    popup.appendChild(header);
    const statusEl = document.createElement("div");
    statusEl.id = "cw-update-status";
    statusEl.style.cssText = "padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;";
    popup.appendChild(statusEl);
    function createEditorOverlay() {
      editorOverlay = document.createElement("div");
      editorOverlay.className = "cw-editor-overlay";
      editorOverlay.innerHTML = `
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
      `;
      editorOverlay.querySelectorAll('input[name="cw-bc-type"]').forEach((radio) => {
        radio.addEventListener("change", () => {
          editorOverlay.querySelectorAll(".cw-radio-option").forEach((opt) => opt.classList.remove("checked"));
          radio.parentElement.classList.add("checked");
        });
      });
      setTimeout(() => {
        const def = editorOverlay.querySelector(".cw-radio-option.info");
        if (def) def.classList.add("checked");
      }, 100);
      const btnCancel = editorOverlay.querySelector("#cw-bc-cancel");
      const btnCloseX = editorOverlay.querySelector("#cw-bc-close-x");
      const btnSend = editorOverlay.querySelector("#cw-bc-send");
      btnCancel.onclick = closeEditor;
      btnCloseX.onclick = closeEditor;
      btnSend.onclick = handleSend;
      popup.appendChild(editorOverlay);
    }
    function openEditor(editData = null) {
      if (!editorOverlay) return;
      const titleLabel = editorOverlay.querySelector("#cw-editor-title-label");
      const inputTitle = editorOverlay.querySelector("#cw-bc-title");
      const inputText = editorOverlay.querySelector("#cw-bc-text");
      const btnSend = editorOverlay.querySelector("#cw-bc-send");
      if (editData) {
        currentEditingId = editData.id;
        titleLabel.textContent = "Editar Aviso";
        inputTitle.value = editData.title || "";
        inputText.value = editData.text || "";
        btnSend.textContent = "Salvar Altera\xE7\xF5es";
        const type = editData.type || "info";
        const radio = editorOverlay.querySelector(`input[name="cw-bc-type"][value="${type}"]`);
        if (radio) radio.click();
      } else {
        currentEditingId = null;
        titleLabel.textContent = "Novo Aviso";
        inputTitle.value = "";
        inputText.value = "";
        btnSend.textContent = "Publicar";
        const infoRadio = editorOverlay.querySelector(`input[name="cw-bc-type"][value="info"]`);
        if (infoRadio) infoRadio.click();
      }
      editorOverlay.classList.add("active");
      setTimeout(() => inputTitle.focus(), 300);
    }
    function closeEditor() {
      if (editorOverlay) editorOverlay.classList.remove("active");
      currentEditingId = null;
    }
    async function handleSend() {
      const btnSend = editorOverlay.querySelector("#cw-bc-send");
      const inputTitle = editorOverlay.querySelector("#cw-bc-title");
      const inputText = editorOverlay.querySelector("#cw-bc-text");
      const typeInput = editorOverlay.querySelector('input[name="cw-bc-type"]:checked');
      const type = typeInput ? typeInput.value : "info";
      if (!inputTitle.value.trim() || !inputText.value.trim()) {
        showToast("Preencha todos os campos!", { error: true });
        return;
      }
      btnSend.textContent = "Salvando...";
      btnSend.style.opacity = "0.7";
      let success = false;
      if (currentEditingId) {
        success = await DataService.updateBroadcast(currentEditingId, {
          title: inputTitle.value,
          text: inputText.value,
          type
        });
      } else {
        success = await DataService.sendBroadcast({
          title: inputTitle.value,
          text: inputText.value,
          type,
          author: window._cwCurrentUser || "admin"
        });
      }
      if (success) {
        showToast(currentEditingId ? "Atualizado!" : "Publicado!");
        SoundManager.playSuccess();
        closeEditor();
        setTimeout(() => checkForUpdates(), 1500);
      } else {
        showToast("Erro ao salvar. Verifique a conex\xE3o.", { error: true });
        btnSend.textContent = currentEditingId ? "Salvar Altera\xE7\xF5es" : "Publicar";
        btnSend.style.opacity = "1";
      }
    }
    async function handleDelete(id) {
      const confirmed = await confirmDialog("Confirma a exclus\xE3o deste aviso?", { danger: true });
      if (confirmed) {
        const success = await DataService.deleteBroadcast(id);
        if (success) {
          showToast("Aviso removido.");
          SoundManager.playClick();
          const oldMsg = BROADCAST_MESSAGES.findIndex((m) => m.id === id);
          if (oldMsg > -1) BROADCAST_MESSAGES.splice(oldMsg, 1);
          renderFeed();
          setTimeout(() => checkForUpdates(), 1500);
        } else {
          showToast("Erro ao excluir.", { error: true });
        }
      }
    }
    const feed = document.createElement("div");
    feed.className = "cw-nice-scroll";
    Object.assign(feed.style, styles.feedContainer);
    popup.appendChild(feed);
    async function checkForUpdates() {
      if (visible) {
        statusEl.style.display = "block";
        statusEl.innerHTML = "\u{1F504} Sincronizando...";
      }
      try {
        const data = await DataService.fetchData();
        if (data && data.broadcast) {
          setBroadcastMessages(data.broadcast);
          updateBadge();
          if (visible) {
            renderFeed();
            statusEl.innerHTML = `<span style="color:#137333">\u2713 Atualizado</span>`;
            setTimeout(() => {
              statusEl.style.display = "none";
            }, 1500);
          }
        }
      } catch (error) {
        if (visible) statusEl.innerHTML = "\u26A0\uFE0F Offline";
      }
    }
    function updateBadge() {
      const btn = document.getElementById("cw-btn-broadcast");
      if (!btn) return;
      const readMessages2 = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      const hasUnread2 = BROADCAST_MESSAGES.some((m) => !readMessages2.includes(m.id));
      if (hasUnread2) {
        btn.classList.add("has-new");
        if (!btn.querySelector(".cw-badge")) {
          const badge = document.createElement("div");
          badge.className = "cw-badge";
          Object.assign(badge.style, {
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "8px",
            height: "8px",
            backgroundColor: "#d93025",
            borderRadius: "50%",
            border: "1px solid #fff",
            zIndex: "10"
          });
          btn.appendChild(badge);
        }
      } else {
        btn.classList.remove("has-new");
        const badge = btn.querySelector(".cw-badge");
        if (badge) badge.remove();
      }
    }
    function renderFeed() {
      feed.innerHTML = "";
      const oldBau = popup.querySelector("#cw-bau-widget");
      if (oldBau) oldBau.remove();
      const readMessages2 = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      let allMessages = [...BROADCAST_MESSAGES].sort((a, b) => {
        const dateA = new Date(a.date).getTime() || 0;
        const dateB = new Date(b.date).getTime() || 0;
        return dateB - dateA;
      });
      const bauIndex = allMessages.findIndex((m) => m.title && m.title.toLowerCase().includes("disponibilidade bau"));
      if (bauIndex !== -1) {
        const bauMessage = allMessages[bauIndex];
        allMessages.splice(bauIndex, 1);
        const bauWidget = document.createElement("div");
        bauWidget.id = "cw-bau-widget";
        Object.assign(bauWidget.style, styles.bauContainer);
        const extractedSlots = [];
        const lines = (bauMessage.text || "").split("\n");
        const dateRegex = /\d{1,2}\/\d{1,2}/;
        let currentContextFlag = "\u{1F4C5}";
        lines.forEach((line) => {
          if (/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(line)) {
            currentContextFlag = "\u{1F1E7}\u{1F1F7}";
          } else if (/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(line)) {
            currentContextFlag = "\u{1F1EA}\u{1F1F8}";
          }
          const dateMatch = line.match(dateRegex);
          if (dateMatch) {
            const date = dateMatch[0];
            let lineFlag = currentContextFlag;
            if (/🇧🇷|🇵🇹|PT|BR/i.test(line)) lineFlag = "\u{1F1E7}\u{1F1F7}";
            else if (/🇪🇸|🇲🇽|ES|LATAM/i.test(line)) lineFlag = "\u{1F1EA}\u{1F1F8}";
            const exists = extractedSlots.some((s) => s.flag === lineFlag && s.date === date);
            if (!exists) extractedSlots.push({ flag: lineFlag, date });
          }
        });
        if (extractedSlots.length === 0) {
          const anyDates = (bauMessage.text || "").match(/\d{1,2}\/\d{1,2}/g);
          if (anyDates) [...new Set(anyDates)].forEach((d) => extractedSlots.push({ flag: "\u{1F4C5}", date: d }));
        }
        let contentHTML = "";
        let buttonsHTML = `<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>`;
        if (window._cwIsAdmin) {
          buttonsHTML = `
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${buttonsHTML}
              `;
        }
        if (extractedSlots.length > 0) {
          const slotsHTML = extractedSlots.map((slot) => `
                  <div style="${objectToCss(styles.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${objectToCss(styles.bauFlag)}">${slot.flag}</span>
                      <span style="${objectToCss(styles.bauDate)}">${slot.date}</span>
                  </div>
              `).join("");
          contentHTML = `
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${slotsHTML}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${buttonsHTML}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${parseMessageText(bauMessage.text)}</div>
              `;
        } else {
          contentHTML = `
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${parseMessageText(bauMessage.text)}</div>
                    ${window._cwIsAdmin ? `<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>` : ""}
                </div>
              `;
        }
        bauWidget.innerHTML = `
              <div style="${objectToCss(styles.bauHeader)}; margin-bottom:8px;">
                  <div style="${objectToCss(styles.liveIndicator)}">
                      <div style="${objectToCss(styles.pulseDot)}"></div>
                      <span style="${objectToCss(styles.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${formatFriendlyDate(bauMessage.date)}</div>
              </div>
              ${contentHTML}
          `;
        statusEl.after(bauWidget);
        const toggleBtn = bauWidget.querySelector("#cw-bau-toggle-btn");
        const fullText = bauWidget.querySelector("#cw-bau-full");
        if (toggleBtn && fullText) {
          toggleBtn.onclick = () => {
            const isHidden = fullText.style.display === "none";
            fullText.style.display = isHidden ? "block" : "none";
            toggleBtn.textContent = isHidden ? "Ocultar" : "Detalhes";
          };
        }
        if (window._cwIsAdmin) {
          const editBtn = bauWidget.querySelector(".cw-bau-edit");
          if (editBtn) editBtn.onclick = () => openEditor(bauMessage);
        }
      }
      const sortedMessages = allMessages.sort((a, b) => {
        const aRead = readMessages2.includes(a.id);
        const bRead = readMessages2.includes(b.id);
        return aRead === bRead ? 0 : aRead ? 1 : -1;
      });
      if (sortedMessages.length === 0 && !bauIndex) {
        const empty = document.createElement("div");
        Object.assign(empty.style, styles.emptyState);
        empty.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `;
        feed.appendChild(empty);
      }
      const unreadMsgs = sortedMessages.filter((m) => !readMessages2.includes(m.id));
      const readMsgs = sortedMessages.filter((m) => readMessages2.includes(m.id));
      unreadMsgs.forEach((msg) => feed.appendChild(createCard(msg, false)));
      if (readMsgs.length > 0) {
        const divider = document.createElement("div");
        Object.assign(divider.style, styles.historyDivider);
        divider.innerHTML = `<span>Hist\xF3rico (${readMsgs.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        const historyContainer = document.createElement("div");
        Object.assign(historyContainer.style, styles.historyContainer);
        readMsgs.forEach((msg) => historyContainer.appendChild(createCard(msg, true)));
        let isHistoryOpen = false;
        divider.onclick = () => {
          SoundManager.playClick();
          isHistoryOpen = !isHistoryOpen;
          historyContainer.style.display = isHistoryOpen ? "flex" : "none";
          divider.querySelector("svg").style.transform = isHistoryOpen ? "rotate(180deg)" : "rotate(0deg)";
        };
        feed.appendChild(divider);
        feed.appendChild(historyContainer);
      }
    }
    function createCard(msg, isHistory) {
      const card = document.createElement("div");
      Object.assign(card.style, isHistory ? styles.cardHistory : styles.card);
      const theme = TYPE_CONFIG[msg.type] || TYPE_CONFIG.info;
      const cardHead = document.createElement("div");
      Object.assign(cardHead.style, styles.cardHeader);
      const typeLabel = document.createElement("div");
      Object.assign(typeLabel.style, styles.typeTag, { color: theme.color, background: theme.bg });
      typeLabel.innerHTML = `${theme.icon} <span>${msg.type}</span>`;
      const dateLabel = document.createElement("span");
      Object.assign(dateLabel.style, styles.dateTag);
      dateLabel.textContent = formatFriendlyDate(msg.date);
      cardHead.appendChild(typeLabel);
      if (!isHistory) {
        const dismissBtn = document.createElement("button");
        dismissBtn.className = "cw-btn-interactive";
        Object.assign(dismissBtn.style, styles.dismissBtn);
        dismissBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        dismissBtn.onmouseenter = () => {
          dismissBtn.style.color = "#1e8e3e";
          dismissBtn.style.background = "#e6f4ea";
          dismissBtn.style.borderColor = "#1e8e3e";
        };
        dismissBtn.onmouseleave = () => {
          dismissBtn.style.color = "#5f6368";
          dismissBtn.style.background = "#fff";
          dismissBtn.style.borderColor = "rgba(0,0,0,0.1)";
        };
        dismissBtn.onclick = (e) => {
          e.stopPropagation();
          SoundManager.playClick();
          card.style.transform = "translateX(20px)";
          card.style.opacity = "0";
          setTimeout(() => {
            const currentRead = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
            currentRead.push(msg.id);
            localStorage.setItem("cw_read_broadcasts", JSON.stringify(currentRead));
            renderFeed();
            updateBadge();
          }, 200);
        };
        cardHead.appendChild(dismissBtn);
      } else {
        cardHead.appendChild(dateLabel);
      }
      const bodyContainer = document.createElement("div");
      Object.assign(bodyContainer.style, styles.cardContent);
      const title = document.createElement("div");
      Object.assign(title.style, styles.msgTitle);
      title.textContent = msg.title;
      const text = document.createElement("div");
      Object.assign(text.style, styles.msgBody);
      text.innerHTML = parseMessageText(msg.text);
      const meta = document.createElement("div");
      Object.assign(meta.style, styles.msgMeta);
      meta.innerHTML = `Publicado por <b>${msg.author || "Sistema"}</b>`;
      if (!isHistory) meta.innerHTML += ` \u2022 ${formatFriendlyDate(msg.date)}`;
      bodyContainer.appendChild(title);
      bodyContainer.appendChild(text);
      bodyContainer.appendChild(meta);
      card.appendChild(cardHead);
      card.appendChild(bodyContainer);
      if (window._cwIsAdmin) {
        const cardActions = document.createElement("div");
        cardActions.className = "cw-card-actions";
        const btnEdit = document.createElement("button");
        btnEdit.className = "cw-action-btn edit";
        btnEdit.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar`;
        btnEdit.onclick = () => openEditor(msg);
        const btnDel = document.createElement("button");
        btnDel.className = "cw-action-btn delete";
        btnDel.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir`;
        btnDel.onclick = () => handleDelete(msg.id);
        cardActions.appendChild(btnEdit);
        cardActions.appendChild(btnDel);
        card.appendChild(cardActions);
      }
      return card;
    }
    const cachedData = DataService.getCachedBroadcasts();
    if (cachedData.length > 0) {
      setBroadcastMessages(cachedData);
      renderFeed();
    }
    setTimeout(tryInjectAdminButton, 500);
    checkForUpdates();
    if (!pollInterval) pollInterval = setInterval(checkForUpdates, POLL_TIME_MS);
    const resizeHandle = document.createElement("div");
    Object.assign(resizeHandle.style, styleResizeHandle);
    resizeHandle.className = "no-drag";
    popup.appendChild(resizeHandle);
    makeResizable(popup, resizeHandle);
    document.body.appendChild(popup);
    const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
    const hasUnread = BROADCAST_MESSAGES.some((m) => !readMessages.includes(m.id));
    return { toggle: toggleVisibility, hasUnread };
  }

  // src/modules/onboarding/onboarding-wizard.js
  function initOnboarding() {
    if (localStorage.getItem("cw_onboarding_seen_v1")) {
      return;
    }
    const SLIDES = [
      {
        icon: "\u{1F680}",
        title: "Bem-vindo ao TechSol Suite",
        text: "Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."
      },
      {
        icon: "\u{1F4DD}",
        title: "Notas Autom\xE1ticas",
        text: "Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."
      },
      {
        icon: "\u26A1",
        title: "Quick Email & Scripts",
        text: "Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."
      },
      {
        icon: "\u{1F4E2}",
        title: "Fique Informado",
        text: "O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."
      },
      {
        icon: "\u2705",
        title: "Tudo Pronto!",
        text: "Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",
        isLast: true
      }
    ];
    let currentSlide = 0;
    const styles = {
      overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: "2147483647",
        // Acima de tudo
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: "0",
        transition: "opacity 0.3s ease"
      },
      card: {
        width: "380px",
        background: "#fff",
        borderRadius: "24px",
        padding: "32px",
        textAlign: "center",
        position: "relative",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        fontFamily: "'Google Sans', Roboto, sans-serif",
        transform: "translateY(20px)",
        transition: "all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"
      },
      icon: { fontSize: "48px", marginBottom: "20px", display: "block" },
      title: { fontSize: "22px", fontWeight: "700", color: "#202124", marginBottom: "12px" },
      text: { fontSize: "15px", color: "#5f6368", lineHeight: "1.6", marginBottom: "32px" },
      dotsContainer: { display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px" },
      dot: { width: "8px", height: "8px", borderRadius: "50%", background: "#dadce0", transition: "all 0.3s" },
      dotActive: { background: "#1a73e8", width: "24px", borderRadius: "4px" },
      btnContainer: { display: "flex", justifyContent: "space-between", alignItems: "center" },
      btn: {
        padding: "10px 24px",
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600",
        transition: "background 0.2s"
      },
      btnSkip: { background: "transparent", color: "#5f6368" },
      btnNext: { background: "#1a73e8", color: "#fff", boxShadow: "0 4px 12px rgba(26,115,232,0.3)" }
    };
    const overlay = document.createElement("div");
    Object.assign(overlay.style, styles.overlay);
    const card = document.createElement("div");
    Object.assign(card.style, styles.card);
    const iconEl = document.createElement("div");
    Object.assign(iconEl.style, styles.icon);
    const titleEl = document.createElement("div");
    Object.assign(titleEl.style, styles.title);
    const textEl = document.createElement("div");
    Object.assign(textEl.style, styles.text);
    const dotsEl = document.createElement("div");
    Object.assign(dotsEl.style, styles.dotsContainer);
    const actionsEl = document.createElement("div");
    Object.assign(actionsEl.style, styles.btnContainer);
    const btnSkip = document.createElement("button");
    btnSkip.textContent = "Pular";
    Object.assign(btnSkip.style, styles.btn, styles.btnSkip);
    btnSkip.onmouseover = () => btnSkip.style.color = "#202124";
    btnSkip.onmouseout = () => btnSkip.style.color = "#5f6368";
    const btnNext = document.createElement("button");
    btnNext.textContent = "Pr\xF3ximo";
    Object.assign(btnNext.style, styles.btn, styles.btnNext);
    btnNext.onmouseover = () => btnNext.style.transform = "scale(1.05)";
    btnNext.onmouseout = () => btnNext.style.transform = "scale(1)";
    actionsEl.appendChild(btnSkip);
    actionsEl.appendChild(btnNext);
    card.appendChild(iconEl);
    card.appendChild(titleEl);
    card.appendChild(textEl);
    card.appendChild(dotsEl);
    card.appendChild(actionsEl);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    function renderSlide(index) {
      const slide = SLIDES[index];
      iconEl.textContent = slide.icon;
      titleEl.textContent = slide.title;
      textEl.textContent = slide.text;
      dotsEl.innerHTML = "";
      SLIDES.forEach((_, i) => {
        const d = document.createElement("div");
        Object.assign(d.style, styles.dot);
        if (i === index) Object.assign(d.style, styles.dotActive);
        dotsEl.appendChild(d);
      });
      if (slide.isLast) {
        btnSkip.style.display = "none";
        btnNext.textContent = "Come\xE7ar \u{1F680}";
        btnNext.style.width = "100%";
      } else {
        btnSkip.style.display = "block";
        btnNext.textContent = "Pr\xF3ximo";
        btnNext.style.width = "auto";
      }
    }
    function closeWizard() {
      localStorage.setItem("cw_onboarding_seen_v1", "true");
      overlay.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => overlay.remove(), 400);
      SoundManager.playSuccess();
      showToast("Tudo pronto! Use o menu flutuante.");
    }
    btnNext.onclick = () => {
      SoundManager.playClick();
      if (currentSlide < SLIDES.length - 1) {
        currentSlide++;
        renderSlide(currentSlide);
      } else {
        closeWizard();
      }
    };
    btnSkip.onclick = async () => {
      const confirmed = await confirmDialog("Pular o tutorial?");
      if (confirmed) closeWizard();
    };
    renderSlide(0);
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
  }

  // src/modules/changelog/changelog-data.js
  var RELEASE_NOTES = {
    version: "v5.1",
    title: "Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",
    slides: [
      {
        icon: "\u{1F17F}\uFE0F",
        title: "Estacionamento de Casos",
        text: "Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."
      },
      {
        icon: "\u{1F6DF}",
        title: "Sistema 'Airbag'",
        text: "Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."
      },
      {
        icon: "\u{1F7E0}",
        title: "Indicador de Progresso",
        text: "Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."
      },
      {
        icon: "\u{1F50D}",
        title: "Time Zone Pro",
        text: "O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."
      },
      {
        icon: "\u{1F916}",
        title: "Leitura de BAU Aprimorada",
        text: "O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."
      },
      {
        icon: "\u{1F3A8}",
        title: "Refinamento Visual",
        text: "Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."
      }
    ]
  };

  // src/modules/changelog/changelog-wizard.js
  function checkAndShowChangelog(currentAppVersion) {
    const lastSeenVersion = localStorage.getItem("cw_last_version");
    if (!lastSeenVersion) {
      localStorage.setItem("cw_last_version", currentAppVersion);
      return;
    }
    if (lastSeenVersion !== currentAppVersion) {
      initChangelogModal(currentAppVersion);
    }
  }
  function initChangelogModal(version) {
    const SLIDES = RELEASE_NOTES.slides;
    let currentSlide = 0;
    const styles = {
      overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(5px)",
        zIndex: "2147483647",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: "0",
        transition: "opacity 0.3s ease"
      },
      card: {
        width: "400px",
        background: "#fff",
        borderRadius: "24px",
        padding: "32px",
        textAlign: "center",
        position: "relative",
        boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        fontFamily: "'Google Sans', Roboto, sans-serif",
        transform: "translateY(30px)",
        transition: "all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"
      },
      badge: {
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "12px",
        background: "#E8F0FE",
        color: "#1967D2",
        fontSize: "11px",
        fontWeight: "700",
        textTransform: "uppercase",
        marginBottom: "16px",
        letterSpacing: "0.5px"
      },
      icon: { fontSize: "42px", marginBottom: "16px", display: "block" },
      title: { fontSize: "20px", fontWeight: "700", color: "#202124", marginBottom: "8px" },
      text: { fontSize: "14px", color: "#5f6368", lineHeight: "1.5", marginBottom: "32px", minHeight: "42px" },
      dotsContainer: { display: "flex", justifyContent: "center", gap: "6px", marginBottom: "24px" },
      dot: { width: "6px", height: "6px", borderRadius: "50%", background: "#dadce0", transition: "all 0.3s" },
      dotActive: { background: "#1a73e8", width: "18px", borderRadius: "4px" },
      btn: {
        width: "100%",
        padding: "12px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600",
        transition: "all 0.2s",
        background: "#1a73e8",
        color: "#fff",
        boxShadow: "0 4px 12px rgba(26,115,232,0.3)"
      }
    };
    const overlay = document.createElement("div");
    Object.assign(overlay.style, styles.overlay);
    const card = document.createElement("div");
    Object.assign(card.style, styles.card);
    const badge = document.createElement("div");
    Object.assign(badge.style, styles.badge);
    badge.textContent = `Atualiza\xE7\xE3o ${version}`;
    const iconEl = document.createElement("div");
    Object.assign(iconEl.style, styles.icon);
    const titleEl = document.createElement("div");
    Object.assign(titleEl.style, styles.title);
    const textEl = document.createElement("div");
    Object.assign(textEl.style, styles.text);
    const dotsEl = document.createElement("div");
    Object.assign(dotsEl.style, styles.dotsContainer);
    const btnNext = document.createElement("button");
    Object.assign(btnNext.style, styles.btn);
    btnNext.onmouseover = () => btnNext.style.transform = "scale(1.02)";
    btnNext.onmouseout = () => btnNext.style.transform = "scale(1)";
    card.appendChild(badge);
    card.appendChild(iconEl);
    card.appendChild(titleEl);
    card.appendChild(textEl);
    card.appendChild(dotsEl);
    card.appendChild(btnNext);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    function renderSlide(index) {
      const slide = SLIDES[index];
      iconEl.textContent = slide.icon;
      titleEl.textContent = slide.title;
      textEl.textContent = slide.text;
      dotsEl.innerHTML = "";
      SLIDES.forEach((_, i) => {
        const d = document.createElement("div");
        Object.assign(d.style, styles.dot);
        if (i === index) Object.assign(d.style, styles.dotActive);
        dotsEl.appendChild(d);
      });
      if (index === SLIDES.length - 1) {
        btnNext.textContent = "Entendi, vamos l\xE1! \u{1F44D}";
      } else {
        btnNext.textContent = "Pr\xF3ximo";
      }
    }
    function close() {
      localStorage.setItem("cw_last_version", version);
      overlay.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      setTimeout(() => overlay.remove(), 400);
      SoundManager.playSuccess();
      showToast(`TechSol atualizado para ${version}!`);
    }
    btnNext.onclick = () => {
      SoundManager.playClick();
      if (currentSlide < SLIDES.length - 1) {
        currentSlide++;
        renderSlide(currentSlide);
      } else {
        close();
      }
    };
    renderSlide(0);
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
  }

  // src/modules/timezone/timezone-assistant.js
  var PINNED_STORAGE_KEY = "cw_timezone_pinned";
  var HUBS = [
    // --- EUROPA ---
    { id: "pt", name: "Portugal", flag: "\u{1F1F5}\u{1F1F9}", zone: "Europe/Lisbon", label: "Lisboa", region: "eu" },
    { id: "es", name: "Espanha", flag: "\u{1F1EA}\u{1F1F8}", zone: "Europe/Madrid", label: "Madrid", region: "eu" },
    // --- AMÉRICA DO SUL ---
    { id: "ar", name: "Argentina", flag: "\u{1F1E6}\u{1F1F7}", zone: "America/Argentina/Buenos_Aires", label: "Buenos Aires", region: "sa" },
    { id: "bo", name: "Bol\xEDvia", flag: "\u{1F1E7}\u{1F1F4}", zone: "America/La_Paz", label: "La Paz", region: "sa" },
    { id: "cl", name: "Chile", flag: "\u{1F1E8}\u{1F1F1}", zone: "America/Santiago", label: "Santiago", region: "sa" },
    { id: "co", name: "Col\xF4mbia", flag: "\u{1F1E8}\u{1F1F4}", zone: "America/Bogota", label: "Bogot\xE1", region: "sa" },
    { id: "ec", name: "Equador", flag: "\u{1F1EA}\u{1F1E8}", zone: "America/Guayaquil", label: "Guayaquil", region: "sa" },
    { id: "py", name: "Paraguai", flag: "\u{1F1F5}\u{1F1FE}", zone: "America/Asuncion", label: "Assun\xE7\xE3o", region: "sa" },
    { id: "pe", name: "Peru", flag: "\u{1F1F5}\u{1F1EA}", zone: "America/Lima", label: "Lima", region: "sa" },
    { id: "uy", name: "Uruguai", flag: "\u{1F1FA}\u{1F1FE}", zone: "America/Montevideo", label: "Montevid\xE9u", region: "sa" },
    { id: "ve", name: "Venezuela", flag: "\u{1F1FB}\u{1F1EA}", zone: "America/Caracas", label: "Caracas", region: "sa" },
    // --- AMÉRICA DO NORTE & CENTRAL ---
    { id: "mx", name: "M\xE9xico", flag: "\u{1F1F2}\u{1F1FD}", zone: "America/Mexico_City", label: "CDMX", region: "na" },
    { id: "cr", name: "Costa Rica", flag: "\u{1F1E8}\u{1F1F7}", zone: "America/Costa_Rica", label: "San Jos\xE9", region: "na" },
    { id: "sv", name: "El Salvador", flag: "\u{1F1F8}\u{1F1FB}", zone: "America/El_Salvador", label: "San Salvador", region: "na" },
    { id: "gt", name: "Guatemala", flag: "\u{1F1EC}\u{1F1F9}", zone: "America/Guatemala", label: "C. da Guatemala", region: "na" },
    { id: "hn", name: "Honduras", flag: "\u{1F1ED}\u{1F1F3}", zone: "America/Tegucigalpa", label: "Tegucigalpa", region: "na" },
    { id: "ni", name: "Nicar\xE1gua", flag: "\u{1F1F3}\u{1F1EE}", zone: "America/Managua", label: "Man\xE1gua", region: "na" },
    { id: "pa", name: "Panam\xE1", flag: "\u{1F1F5}\u{1F1E6}", zone: "America/Panama", label: "C. do Panam\xE1", region: "na" },
    { id: "do", name: "Rep. Dominicana", flag: "\u{1F1E9}\u{1F1F4}", zone: "America/Santo_Domingo", label: "Santo Domingo", region: "na" },
    { id: "pr", name: "Porto Rico", flag: "\u{1F1F5}\u{1F1F7}", zone: "America/Puerto_Rico", label: "San Juan", region: "na" }
  ];
  var FILTERS = [
    { id: "all", label: "Todos" },
    { id: "sa", label: "Am\xE9rica do Sul" },
    { id: "na", label: "Norte & Central" },
    { id: "eu", label: "Europa" }
  ];
  function initTimezoneAssistant() {
    const CURRENT_VERSION = "v2.2 Pro";
    let visible = false;
    let updateInterval = null;
    let selectedHubId = "mx";
    let pinnedHubs = JSON.parse(localStorage.getItem(PINNED_STORAGE_KEY) || "[]");
    let searchTerm = "";
    let activeFilter = "all";
    let plannerDate = /* @__PURE__ */ new Date();
    plannerDate.setHours(14, 0, 0, 0);
    const COLORS4 = {
      bg: "#F8F9FA",
      surface: "#FFFFFF",
      primary: "#1A73E8",
      primaryBg: "#E8F0FE",
      text: "#202124",
      textSub: "#5F6368",
      border: "#DADCE0",
      success: "#1E8E3E",
      successBg: "#E6F4EA",
      warning: "#E37400",
      warningBg: "#FEF7E0",
      error: "#D93025",
      errorBg: "#FCE8E6"
    };
    const styles = {
      container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: COLORS4.bg,
        fontFamily: "'Google Sans', Roboto, sans-serif"
      },
      // Tabs
      tabHeader: {
        display: "flex",
        background: COLORS4.surface,
        borderBottom: `1px solid ${COLORS4.border}`,
        padding: "8px 16px 0 16px"
      },
      tabBtn: {
        flex: 1,
        padding: "12px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: "500",
        color: COLORS4.textSub,
        borderBottom: "3px solid transparent",
        transition: "all 0.2s ease",
        userSelect: "none"
      },
      tabActive: {
        color: COLORS4.primary,
        borderBottomColor: COLORS4.primary,
        fontWeight: "600"
      },
      // Toolbar (Search + Chips)
      toolbar: {
        padding: "12px 16px 8px 16px",
        background: COLORS4.bg,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        borderBottom: "1px solid rgba(0,0,0,0.03)"
      },
      // Search Input Estilo iOS/Google
      searchInputWrapper: {
        position: "relative",
        width: "100%"
      },
      searchInput: {
        width: "100%",
        boxSizing: "border-box",
        padding: "10px 12px 10px 38px",
        borderRadius: "10px",
        border: "1px solid transparent",
        background: "#FFFFFF",
        fontSize: "14px",
        color: COLORS4.text,
        outline: "none",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        transition: "all 0.2s",
        fontFamily: "'Google Sans', Roboto, sans-serif"
      },
      searchIcon: {
        position: "absolute",
        left: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "16px",
        height: "16px",
        color: "#9AA0A6",
        pointerEvents: "none"
      },
      // Chips
      chipsRow: {
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        paddingBottom: "4px",
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      },
      chip: {
        whiteSpace: "nowrap",
        padding: "6px 12px",
        borderRadius: "16px",
        fontSize: "12px",
        fontWeight: "500",
        cursor: "pointer",
        border: `1px solid ${COLORS4.border}`,
        background: COLORS4.surface,
        color: COLORS4.textSub,
        transition: "all 0.2s"
      },
      chipActive: {
        background: COLORS4.primaryBg,
        color: COLORS4.primary,
        borderColor: COLORS4.primaryBg,
        fontWeight: "600"
      },
      // Live View (Lista)
      listContainer: {
        padding: "16px 16px 40px 16px",
        // Padding bottom extra para o último card
        overflowY: "auto",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        scrollbarWidth: "none"
      },
      hubCard: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        background: COLORS4.surface,
        borderRadius: "16px",
        border: `1px solid transparent`,
        boxShadow: "0 2px 6px rgba(60,64,67,0.05)",
        transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",
        cursor: "pointer",
        position: "relative"
      },
      hubCardPinned: {
        borderLeft: `4px solid ${COLORS4.primary}`,
        paddingLeft: "16px"
      },
      // Planner
      plannerWrapper: {
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        flex: 1,
        overflowY: "auto"
      },
      timeComparisonRow: { display: "flex", gap: "16px", alignItems: "stretch" },
      timeCard: {
        flex: 1,
        padding: "20px",
        borderRadius: "20px",
        background: COLORS4.surface,
        border: `1px solid ${COLORS4.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 12px rgba(60,64,67,0.05)"
      },
      timelineContainer: { position: "relative", height: "60px", marginTop: "16px", userSelect: "none" },
      timelineTrack: { position: "absolute", top: "26px", left: "0", right: "0", height: "6px", borderRadius: "3px", background: "#E0E0E0", overflow: "hidden" },
      dayZone: { position: "absolute", top: "0", bottom: "0", left: "37.5%", width: "37.5%", background: "rgba(52, 168, 83, 0.3)", pointerEvents: "none" },
      hdInput: { fontSize: "28px", fontWeight: "700", color: COLORS4.text, border: "none", background: "transparent", width: "100%", textAlign: "center", outline: "none", fontFamily: "'Google Sans', sans-serif", cursor: "text" },
      statusBadge: { padding: "8px 16px", borderRadius: "50px", fontSize: "13px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "16px", alignSelf: "center", transition: "background-color 0.3s" }
    };
    const popup = document.createElement("div");
    popup.id = "timezone-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, {
      right: "100px",
      width: "450px",
      height: "720px",
      overflow: "hidden",
      borderRadius: "24px"
    });
    const animRefs = { popup };
    const header = createStandardHeader(
      popup,
      "Time Zone Traveler",
      CURRENT_VERSION,
      "Monitoramento global e planejamento de chamadas.",
      animRefs,
      () => toggleVisibility()
    );
    popup.appendChild(header);
    const container = document.createElement("div");
    Object.assign(container.style, styles.container);
    popup.appendChild(container);
    const tabContainer = document.createElement("div");
    Object.assign(tabContainer.style, styles.tabHeader);
    const btnLive = document.createElement("div");
    btnLive.textContent = "Monitoramento";
    Object.assign(btnLive.style, styles.tabBtn, styles.tabActive);
    const btnPlan = document.createElement("div");
    btnPlan.textContent = "Planejador";
    Object.assign(btnPlan.style, styles.tabBtn);
    tabContainer.appendChild(btnLive);
    tabContainer.appendChild(btnPlan);
    container.appendChild(tabContainer);
    const toolbar = document.createElement("div");
    Object.assign(toolbar.style, styles.toolbar);
    const searchWrapper = document.createElement("div");
    Object.assign(searchWrapper.style, styles.searchInputWrapper);
    const icon = document.createElement("div");
    icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
    Object.assign(icon.style, styles.searchIcon);
    const input = document.createElement("input");
    input.placeholder = "Buscar cidade ou pa\xEDs...";
    Object.assign(input.style, styles.searchInput);
    input.onfocus = () => {
      input.style.boxShadow = "0 2px 8px rgba(26,115,232,0.15)";
      input.style.borderColor = "rgba(26,115,232,0.3)";
    };
    input.onblur = () => {
      input.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
      input.style.borderColor = "transparent";
    };
    input.oninput = (e) => {
      searchTerm = e.target.value.toLowerCase();
      renderLive();
    };
    searchWrapper.appendChild(icon);
    searchWrapper.appendChild(input);
    toolbar.appendChild(searchWrapper);
    const chipsRow = document.createElement("div");
    Object.assign(chipsRow.style, styles.chipsRow);
    FILTERS.forEach((f) => {
      const chip = document.createElement("div");
      chip.textContent = f.label;
      chip.id = `tz-filter-${f.id}`;
      Object.assign(chip.style, styles.chip);
      if (f.id === activeFilter) Object.assign(chip.style, styles.chipActive);
      chip.onclick = () => {
        SoundManager.playClick();
        activeFilter = f.id;
        Array.from(chipsRow.children).forEach((c) => {
          Object.assign(c.style, styles.chip);
        });
        Object.assign(chip.style, styles.chipActive);
        renderLive();
      };
      chipsRow.appendChild(chip);
    });
    toolbar.appendChild(chipsRow);
    container.appendChild(toolbar);
    const viewLive = document.createElement("div");
    Object.assign(viewLive.style, styles.listContainer);
    const styleTag = document.createElement("style");
    styleTag.textContent = `#timezone-popup ::-webkit-scrollbar { display: none; }`;
    container.appendChild(styleTag);
    const viewPlan = document.createElement("div");
    Object.assign(viewPlan.style, styles.plannerWrapper, { display: "none" });
    container.appendChild(viewLive);
    container.appendChild(viewPlan);
    btnLive.onclick = () => switchTab("live");
    btnPlan.onclick = () => switchTab("plan");
    function switchTab(tab) {
      SoundManager.playClick();
      if (tab === "live") {
        Object.assign(btnLive.style, styles.tabActive);
        Object.assign(btnPlan.style, styles.tabBtn);
        btnPlan.style.borderBottomColor = "transparent";
        viewLive.style.display = "flex";
        toolbar.style.display = "flex";
        viewPlan.style.display = "none";
        startClock();
      } else {
        Object.assign(btnPlan.style, styles.tabActive);
        Object.assign(btnLive.style, styles.tabBtn);
        btnLive.style.borderBottomColor = "transparent";
        viewPlan.style.display = "flex";
        viewLive.style.display = "none";
        toolbar.style.display = "none";
        stopClock();
        renderPlanner();
      }
    }
    function getBusinessStatus(hours) {
      if (hours >= 9 && hours < 17) return { color: COLORS4.success, bg: COLORS4.successBg, label: "Aberto", icon: "\u{1F7E2}" };
      if (hours >= 8 && hours < 9) return { color: COLORS4.warning, bg: COLORS4.warningBg, label: "Abrindo", icon: "\u{1F7E1}" };
      if (hours >= 17 && hours < 19) return { color: COLORS4.warning, bg: COLORS4.warningBg, label: "Fechando", icon: "\u{1F7E1}" };
      return { color: COLORS4.textSub, bg: "#F1F3F4", label: "Fechado", icon: "\u{1F534}" };
    }
    function togglePin(hubId) {
      if (pinnedHubs.includes(hubId)) {
        pinnedHubs = pinnedHubs.filter((id) => id !== hubId);
      } else {
        pinnedHubs.push(hubId);
      }
      localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(pinnedHubs));
      renderLive();
      SoundManager.playClick();
    }
    function renderLive() {
      viewLive.innerHTML = "";
      const now = /* @__PURE__ */ new Date();
      let filteredHubs = HUBS.filter((h) => {
        const matchesSearch = h.name.toLowerCase().includes(searchTerm) || h.label.toLowerCase().includes(searchTerm);
        const matchesRegion = activeFilter === "all" || h.region === activeFilter;
        return matchesSearch && matchesRegion;
      });
      filteredHubs.sort((a, b) => {
        const aPinned = pinnedHubs.includes(a.id);
        const bPinned = pinnedHubs.includes(b.id);
        if (aPinned && !bPinned) return -1;
        if (!aPinned && bPinned) return 1;
        return a.name.localeCompare(b.name);
      });
      if (filteredHubs.length === 0) {
        viewLive.innerHTML = `
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;
        return;
      }
      filteredHubs.forEach((hub) => {
        const isPinned = pinnedHubs.includes(hub.id);
        const timeString = now.toLocaleTimeString("pt-BR", { timeZone: hub.zone, hour: "2-digit", minute: "2-digit" });
        const hour = parseInt(timeString.split(":")[0]);
        const status = getBusinessStatus(hour);
        const isNight = hour < 6 || hour > 18;
        const card = document.createElement("div");
        Object.assign(card.style, styles.hubCard);
        if (isPinned) Object.assign(card.style, styles.hubCardPinned);
        const pinIcon = isPinned ? "\u2605" : "\u2606";
        const pinColor = isPinned ? "#F9AB00" : "#DADCE0";
        card.innerHTML = `
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${pinColor}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${pinIcon}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${hub.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${COLORS4.text}; letter-spacing:-0.2px;">${hub.name}</div>
                        <div style="font-size:12px; color:${COLORS4.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${isNight ? "\u{1F319}" : "\u2600\uFE0F"} ${hub.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${COLORS4.text}; font-family:'Google Sans', sans-serif;">${timeString}</div>
                    <div style="font-size:11px; font-weight:600; color:${status.color}; background:${status.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${status.label}
                    </div>
                </div>
            `;
        card.onmouseenter = () => {
          card.style.transform = "translateY(-2px)";
          card.style.boxShadow = "0 6px 12px rgba(60,64,67,0.1)";
        };
        card.onmouseleave = () => {
          card.style.transform = "translateY(0)";
          card.style.boxShadow = "0 2px 6px rgba(60,64,67,0.05)";
        };
        const btnPin = card.querySelector(".cw-pin-btn");
        btnPin.onmouseenter = () => {
          btnPin.style.backgroundColor = "#F1F3F4";
        };
        btnPin.onmouseleave = () => {
          btnPin.style.backgroundColor = "transparent";
        };
        btnPin.onclick = (e) => {
          e.stopPropagation();
          togglePin(hub.id);
        };
        card.onclick = () => {
          selectedHubId = hub.id;
          switchTab("plan");
        };
        viewLive.appendChild(card);
      });
      const spacer = document.createElement("div");
      spacer.style.height = "20px";
      spacer.style.width = "100%";
      viewLive.appendChild(spacer);
    }
    function renderPlanner() {
      viewPlan.innerHTML = "";
      const selectContainer = document.createElement("div");
      const selectLabel = document.createElement("label");
      selectLabel.textContent = "Onde est\xE1 o cliente?";
      selectLabel.style.cssText = "display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";
      const select = document.createElement("select");
      Object.assign(select.style, styleSelect);
      select.style.padding = "14px";
      const sortedForSelect = [...HUBS].sort((a, b) => a.name.localeCompare(b.name));
      sortedForSelect.forEach((hub) => {
        const opt = document.createElement("option");
        opt.value = hub.id;
        opt.textContent = `${hub.flag} ${hub.name} (${hub.zone})`;
        if (hub.id === selectedHubId) opt.selected = true;
        select.appendChild(opt);
      });
      select.onchange = (e) => {
        selectedHubId = e.target.value;
        updatePlannerUI();
        SoundManager.playClick();
      };
      selectContainer.appendChild(selectLabel);
      selectContainer.appendChild(select);
      viewPlan.appendChild(selectContainer);
      const clockRow = document.createElement("div");
      Object.assign(clockRow.style, styles.timeComparisonRow);
      const myCard = document.createElement("div");
      Object.assign(myCard.style, styles.timeCard);
      myCard.style.backgroundColor = "#F8FAFF";
      myCard.style.borderColor = "#E8F0FE";
      myCard.innerHTML = `
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;
      const clientCard = document.createElement("div");
      Object.assign(clientCard.style, styles.timeCard);
      clientCard.style.backgroundColor = "#FFF8E1";
      clientCard.style.borderColor = "#FEF7E0";
      clientCard.innerHTML = `
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `;
      clockRow.appendChild(myCard);
      clockRow.appendChild(clientCard);
      viewPlan.appendChild(clockRow);
      const statusBadge = document.createElement("div");
      statusBadge.id = "cw-planner-status";
      Object.assign(statusBadge.style, styles.statusBadge);
      viewPlan.appendChild(statusBadge);
      const timelineWrapper = document.createElement("div");
      Object.assign(timelineWrapper.style, { padding: "0 4px", marginTop: "12px" });
      const rangeLabel = document.createElement("div");
      rangeLabel.textContent = "Arraste para simular o hor\xE1rio:";
      rangeLabel.style.cssText = "font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";
      const sliderContainer = document.createElement("div");
      Object.assign(sliderContainer.style, styles.timelineContainer);
      const track = document.createElement("div");
      Object.assign(track.style, styles.timelineTrack);
      const dayZone = document.createElement("div");
      Object.assign(dayZone.style, styles.dayZone);
      track.appendChild(dayZone);
      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = "0";
      slider.max = "1439";
      slider.step = "15";
      slider.style.cssText = "position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";
      const markers = document.createElement("div");
      markers.style.cssText = "position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;";
      markers.innerHTML = `<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>`;
      sliderContainer.appendChild(track);
      sliderContainer.appendChild(slider);
      sliderContainer.appendChild(markers);
      timelineWrapper.appendChild(rangeLabel);
      timelineWrapper.appendChild(sliderContainer);
      viewPlan.appendChild(timelineWrapper);
      const timeInputBR = myCard.querySelector("#cw-time-input-br");
      const clientDisplay = clientCard.querySelector("#cw-time-display-client");
      const clientLabel = clientCard.querySelector("#cw-client-label");
      function updatePlannerUI() {
        const hub = HUBS.find((h) => h.id === selectedHubId);
        clientLabel.textContent = `${hub.flag} ${hub.label} (${hub.zone})`;
        const hours = plannerDate.getHours();
        const minutes = plannerDate.getMinutes();
        const timeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        timeInputBR.value = timeStr;
        slider.value = hours * 60 + minutes;
        const clientTimeString = plannerDate.toLocaleTimeString("pt-BR", {
          timeZone: hub.zone,
          hour: "2-digit",
          minute: "2-digit"
        });
        clientDisplay.textContent = clientTimeString;
        const clientHour = parseInt(clientTimeString.split(":")[0]);
        if (clientHour >= 9 && clientHour < 17) {
          statusBadge.style.background = COLORS4.successBg;
          statusBadge.style.color = COLORS4.success;
          statusBadge.innerHTML = `<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal`;
        } else if (clientHour >= 8 && clientHour < 9 || clientHour >= 17 && clientHour < 19) {
          statusBadge.style.background = COLORS4.warningBg;
          statusBadge.style.color = COLORS4.warning;
          statusBadge.innerHTML = `<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)`;
        } else {
          statusBadge.style.background = COLORS4.errorBg;
          statusBadge.style.color = COLORS4.error;
          statusBadge.innerHTML = `<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio`;
        }
      }
      slider.oninput = (e) => {
        const totalMins = parseInt(e.target.value);
        plannerDate.setHours(Math.floor(totalMins / 60));
        plannerDate.setMinutes(totalMins % 60);
        updatePlannerUI();
      };
      timeInputBR.oninput = (e) => {
        const [h, m] = e.target.value.split(":");
        if (h && m) {
          plannerDate.setHours(parseInt(h));
          plannerDate.setMinutes(parseInt(m));
          updatePlannerUI();
        }
      };
      updatePlannerUI();
    }
    function startClock() {
      renderLive();
      if (!updateInterval) updateInterval = setInterval(renderLive, 6e4);
    }
    function stopClock() {
      if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
      }
    }
    function toggleVisibility() {
      visible = !visible;
      toggleGenieAnimation(visible, popup, "cw-btn-timezone");
      if (visible) {
        switchTab("live");
      } else {
        stopClock();
      }
    }
    document.body.appendChild(popup);
    return toggleVisibility;
  }

  // src/modules/personal-library/personal-library-assistant.js
  function initPersonalLibrary() {
    const CURRENT_VERSION = "v1.1";
    let visible = false;
    let currentTab = "general";
    let editorOverlay = null;
    let currentEditingId = null;
    if (!document.getElementById("cw-lib-styles")) {
      const style = document.createElement("style");
      style.id = "cw-lib-styles";
      style.innerHTML = `
            .cw-lib-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .cw-lib-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; border-color: rgba(0, 122, 255, 0.3) !important; }
            .cw-tactile { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.92) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #5F6368; }
            .cw-toolbar-btn:hover { background: #F1F3F4; color: #007AFF; border-color: #DADCE0; }
            .cw-toolbar-btn.active { background: #E8F0FE; color: #007AFF; border-color: #007AFF; }
        `;
      document.head.appendChild(style);
    }
    const COLORS4 = {
      bg: "#F0F2F5",
      surface: "#FFFFFF",
      primary: "#007AFF",
      primaryBg: "rgba(0, 122, 255, 0.1)",
      text: "#1C1C1E",
      textSub: "#8E8E93",
      border: "rgba(0, 0, 0, 0.08)",
      danger: "#FF3B30"
    };
    const styles = {
      container: { display: "flex", flexDirection: "column", height: "100%", background: COLORS4.bg, fontFamily: "'Google Sans', Roboto, sans-serif" },
      // Tabs
      tabHeader: { display: "flex", padding: "12px 16px 0 16px", background: COLORS4.surface, borderBottom: `1px solid ${COLORS4.border}` },
      tabBtn: {
        flex: 1,
        padding: "12px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: "500",
        color: COLORS4.textSub,
        borderBottom: "3px solid transparent",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        userSelect: "none"
      },
      tabActive: { color: COLORS4.primary, borderBottomColor: COLORS4.primary, fontWeight: "600" },
      // List
      listContainer: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" },
      emptyState: { padding: "40px 20px", textAlign: "center", color: "#BDC1C6", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
      // Card
      card: {
        background: COLORS4.surface,
        borderRadius: "16px",
        padding: "16px",
        border: `1px solid ${COLORS4.border}`,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
        cursor: "default",
        position: "relative",
        overflow: "hidden"
      },
      cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" },
      cardTitle: { fontSize: "14px", fontWeight: "600", color: COLORS4.text },
      cardPreview: { fontSize: "12px", color: COLORS4.textSub, lineHeight: "1.5", display: "-webkit-box", webkitLineClamp: "3", webkitBoxOrient: "vertical", overflow: "hidden" },
      // Actions
      cardActions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "8px",
        marginTop: "12px",
        paddingTop: "12px",
        borderTop: `1px dashed ${COLORS4.border}`
      },
      actionBtn: {
        padding: "6px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
        border: "none",
        background: "transparent",
        transition: "background 0.2s"
      },
      // Floating Action Button (FAB)
      fab: {
        position: "absolute",
        bottom: "24px",
        right: "24px",
        width: "56px",
        height: "56px",
        borderRadius: "16px",
        background: COLORS4.primary,
        color: "#FFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(26, 115, 232, 0.4)",
        cursor: "pointer",
        transition: "transform 0.2s",
        zIndex: 10
      },
      // Editor Overlay
      editorOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(25px) saturate(180%)",
        webkitBackdropFilter: "blur(25px) saturate(180%)",
        zIndex: 20,
        transform: "translateY(100%)",
        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        display: "flex",
        flexDirection: "column"
      },
      editorHeader: {
        padding: "16px 24px",
        background: COLORS4.surface,
        borderBottom: `1px solid ${COLORS4.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      },
      editorBody: { flex: 1, padding: "24px", overflowY: "auto" },
      // Inputs
      inputGroup: { marginBottom: "20px" },
      label: { display: "block", fontSize: "12px", fontWeight: "700", color: COLORS4.textSub, marginBottom: "8px", textTransform: "uppercase" },
      input: {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: `1px solid ${COLORS4.border}`,
        fontSize: "14px",
        fontFamily: "inherit",
        outline: "none",
        background: COLORS4.surface,
        boxSizing: "border-box"
      }
    };
    const popup = document.createElement("div");
    popup.id = "library-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, {
      right: "auto",
      left: "50%",
      width: "400px",
      height: "600px",
      transform: "translateX(-50%) scale(0.05)",
      overflow: "hidden"
    });
    const animRefs = { popup };
    const header = createStandardHeader(
      popup,
      "Minha Biblioteca",
      CURRENT_VERSION,
      "Gerencie seus snippets, textos e templates.",
      animRefs,
      () => toggleVisibility()
    );
    popup.appendChild(header);
    const container = document.createElement("div");
    Object.assign(container.style, styles.container);
    popup.appendChild(container);
    const tabHeader = document.createElement("div");
    Object.assign(tabHeader.style, styles.tabHeader);
    const tabs = [
      { id: "general", label: "Geral", icon: "\u{1F4CB}" },
      { id: "note", label: "Notas", icon: "\u{1F4DD}" },
      { id: "email", label: "Emails", icon: "\u{1F4E7}" }
    ];
    tabs.forEach((t) => {
      const btn = document.createElement("div");
      btn.innerHTML = `${t.icon} ${t.label}`;
      btn.id = `lib-tab-${t.id}`;
      Object.assign(btn.style, styles.tabBtn);
      if (t.id === currentTab) Object.assign(btn.style, styles.tabActive);
      btn.onmouseenter = () => SoundManager.playHover();
      btn.onclick = () => switchTab(t.id);
      tabHeader.appendChild(btn);
    });
    container.appendChild(tabHeader);
    const listContainer = document.createElement("div");
    Object.assign(listContainer.style, styles.listContainer);
    container.appendChild(listContainer);
    const fab = document.createElement("div");
    fab.className = "cw-fab cw-tactile";
    Object.assign(fab.style, styles.fab);
    fab.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
    fab.onmouseenter = () => fab.style.transform = "scale(1.1)";
    fab.onmouseleave = () => fab.style.transform = "scale(1)";
    fab.onclick = () => openEditor();
    container.appendChild(fab);
    editorOverlay = document.createElement("div");
    Object.assign(editorOverlay.style, styles.editorOverlay);
    const edHead = document.createElement("div");
    Object.assign(edHead.style, styles.editorHeader);
    edHead.innerHTML = `<span style="font-weight:700; font-size:16px;">Novo Item</span>`;
    const closeEd = document.createElement("button");
    closeEd.innerHTML = "Cancelar";
    closeEd.style.cssText = "background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;";
    closeEd.onclick = closeEditor;
    edHead.appendChild(closeEd);
    editorOverlay.appendChild(edHead);
    const edBody = document.createElement("div");
    Object.assign(edBody.style, styles.editorBody);
    editorOverlay.appendChild(edBody);
    const edFooter = document.createElement("div");
    edFooter.style.cssText = "padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Salvar";
    saveBtn.style.cssText = "padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);";
    saveBtn.onclick = handleSave;
    edFooter.appendChild(saveBtn);
    editorOverlay.appendChild(edFooter);
    container.appendChild(editorOverlay);
    const resizeHandle = document.createElement("div");
    Object.assign(resizeHandle.style, styleResizeHandle);
    resizeHandle.className = "no-drag";
    popup.appendChild(resizeHandle);
    makeResizable(popup, resizeHandle);
    document.body.appendChild(popup);
    function switchTab(id) {
      SoundManager.playClick();
      currentTab = id;
      tabs.forEach((t) => {
        const btn = document.getElementById(`lib-tab-${t.id}`);
        if (t.id === id) {
          Object.assign(btn.style, styles.tabActive);
        } else {
          Object.assign(btn.style, styles.tabBtn);
        }
      });
      renderList();
    }
    function renderList() {
      listContainer.innerHTML = "";
      const items = SnippetService.getSnippets(currentTab);
      if (items.length === 0) {
        listContainer.innerHTML = `
                <div style="${objectToCss(styles.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;
        return;
      }
      items.forEach((item) => {
        const card = document.createElement("div");
        card.className = "cw-lib-card";
        Object.assign(card.style, styles.card);
        if (item.isCode) {
          card.style.borderLeft = `4px solid ${COLORS4.primary}`;
          card.style.background = "rgba(0, 122, 255, 0.02)";
        }
        let previewContent = item.content;
        if (item.isRich) {
          const temp = document.createElement("div");
          temp.innerHTML = item.content;
          const hasImages = temp.querySelector("img");
          previewContent = temp.innerText.substring(0, 150) + (temp.innerText.length > 150 ? "..." : "");
          if (hasImages) previewContent = "\u{1F5BC}\uFE0F [Cont\xE9m Imagens] " + previewContent;
        }
        card.innerHTML = `
                <div style="${objectToCss(styles.cardHeader)}">
                    <div style="${objectToCss(styles.cardTitle)}">${item.title}</div>
                    <div style="display:flex; gap:4px;">
                        ${item.isCode ? '<span style="font-size:10px; background:#F1F3F4; color:#5F6368; padding:2px 6px; border-radius:4px; font-family:monospace;">CODE</span>' : ""}
                        ${currentTab === "email" ? '<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>' : ""}
                    </div>
                </div>
                <div style="${objectToCss(styles.cardPreview)}; ${item.isCode ? "font-family:'Roboto Mono', monospace; font-size:11px;" : ""}">${previewContent}</div>
                <div style="${objectToCss(styles.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${objectToCss(styles.actionBtn)}; color:#007AFF; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${objectToCss(styles.actionBtn)}; color:#8E8E93; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${objectToCss(styles.actionBtn)}; color:#FF3B30; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                    </button>
                </div>
            `;
        card.onmouseenter = () => {
          SoundManager.playHover();
        };
        card.querySelector(".cw-act-copy").onclick = (e) => {
          e.stopPropagation();
          SoundManager.playClick();
          if (item.isRich) {
            const blob = new Blob([item.content], { type: "text/html" });
            const plainText = document.createElement("div");
            plainText.style.whiteSpace = "pre-wrap";
            plainText.innerHTML = item.content;
            const blobText = new Blob([plainText.innerText], { type: "text/plain" });
            const data = [new ClipboardItem({ "text/html": blob, "text/plain": blobText })];
            navigator.clipboard.write(data);
          } else {
            navigator.clipboard.writeText(item.content);
          }
          showToast("Copiado!");
        };
        card.querySelector(".cw-act-edit").onclick = (e) => {
          e.stopPropagation();
          SoundManager.playClick();
          openEditor(item);
        };
        card.querySelector(".cw-act-del").onclick = async (e) => {
          e.stopPropagation();
          SoundManager.playClick();
          const confirmed = await confirmDialog("Excluir este item?");
          if (confirmed) {
            SnippetService.delete(item.id);
            renderList();
            showToast("Item exclu\xEDdo.");
          }
        };
        listContainer.appendChild(card);
      });
    }
    function openEditor(item = null) {
      currentEditingId = item ? item.id : null;
      edBody.innerHTML = "";
      edBody.appendChild(createInputBlock("title", "T\xEDtulo / Nome", item ? item.title : ""));
      if (currentTab === "email") {
        edBody.appendChild(createInputBlock("subject", "Assunto do Email", item ? item.subject : ""));
      }
      let contentLabel = "Conte\xFAdo";
      if (currentTab === "email") contentLabel = "Corpo do Email (HTML)";
      if (currentTab === "note") contentLabel = "Texto da Nota (Reason)";
      edBody.appendChild(createInputBlock("content", contentLabel, item ? item.content : "", {
        isRich: true,
        isCode: item ? item.isCode : false
      }));
      edHead.querySelector("span").textContent = item ? "Editar Item" : "Novo Item";
      editorOverlay.style.transform = "translateY(0)";
      setTimeout(() => {
        const firstInput = edBody.querySelector("input");
        if (firstInput) firstInput.focus();
      }, 300);
    }
    function closeEditor() {
      editorOverlay.style.transform = "translateY(100%)";
      setTimeout(() => currentEditingId = null, 300);
    }
    async function handleSave() {
      const titleInput = edBody.querySelector("#cw-inp-title");
      const contentInput = edBody.querySelector("#cw-inp-content");
      const title = titleInput.value.trim();
      const content = contentInput.contentEditable === "true" ? contentInput.innerHTML : contentInput.value.trim();
      const isCode = contentInput.getAttribute("data-is-code") === "true";
      if (!title || (!content || content === "<br>")) {
        showToast("Preencha t\xEDtulo e conte\xFAdo.", { error: true });
        return;
      }
      const payload = {
        id: currentEditingId,
        // Se null, cria novo
        type: currentTab,
        title,
        content,
        isCode,
        isRich: contentInput.contentEditable === "true"
      };
      if (currentTab === "email") {
        const subject = edBody.querySelector("#cw-inp-subject").value.trim();
        if (!subject) {
          showToast("Assunto \xE9 obrigat\xF3rio para emails.", { error: true });
          return;
        }
        payload.subject = subject;
      }
      saveBtn.textContent = "Salvando...";
      await SnippetService.save(payload);
      saveBtn.textContent = "Salvar";
      closeEditor();
      renderList();
      showToast("Salvo com sucesso!");
      SoundManager.playSuccess();
    }
    function createInputBlock(id, labelText, value, options = {}) {
      const div = document.createElement("div");
      Object.assign(div.style, styles.inputGroup);
      const label = document.createElement("label");
      label.textContent = labelText;
      Object.assign(label.style, styles.label);
      let input;
      if (options.isRich) {
        const toolbar = document.createElement("div");
        toolbar.style.cssText = "display:flex; gap:6px; margin-bottom:12px; background:rgba(241, 243, 244, 0.8); padding:6px; border-radius:12px; border:1px solid #DADCE0; backdrop-filter: blur(10px);";
        toolbar.innerHTML = `
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
            `;
        input = document.createElement("div");
        input.contentEditable = "true";
        Object.assign(input.style, styles.input, {
          minHeight: "180px",
          maxHeight: "350px",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          lineHeight: "1.6",
          outline: "none"
        });
        input.innerHTML = value || "";
        if (options.isCode) {
          input.style.fontFamily = "'Roboto Mono', monospace";
          input.style.backgroundColor = "#F8F9FA";
          input.setAttribute("data-is-code", "true");
        }
        toolbar.querySelectorAll(".cw-toolbar-btn").forEach((btn) => {
          btn.onmouseenter = () => SoundManager.playHover();
          btn.onmousedown = () => SoundManager.playClick();
        });
        toolbar.querySelector(".cw-tb-bold").onclick = () => {
          document.execCommand("bold");
          input.focus();
        };
        toolbar.querySelector(".cw-tb-italic").onclick = () => {
          document.execCommand("italic");
          input.focus();
        };
        toolbar.querySelector(".cw-tb-code").onclick = (e) => {
          const isCode = input.getAttribute("data-is-code") === "true";
          const newState = !isCode;
          input.setAttribute("data-is-code", newState);
          input.style.fontFamily = newState ? "'Roboto Mono', monospace" : "inherit";
          input.style.backgroundColor = newState ? "rgba(0, 122, 255, 0.03)" : COLORS4.surface;
          if (newState) {
            e.currentTarget.classList.add("active");
          } else {
            e.currentTarget.classList.remove("active");
          }
          input.focus();
        };
        toolbar.querySelector(".cw-tb-img").onclick = async () => {
          const url = await promptDialog("Cole a URL da imagem:");
          if (url) {
            document.execCommand("insertImage", false, url);
            const imgs = input.querySelectorAll("img");
            imgs.forEach((img) => {
              img.style.maxWidth = "100%";
              img.style.borderRadius = "8px";
            });
          }
        };
        input.onpaste = (e) => {
          const items = (e.clipboardData || e.originalEvent.clipboardData).items;
          for (const item of items) {
            if (item.kind === "file" && item.type.startsWith("image/")) {
              e.preventDefault();
              const blob = item.getAsFile();
              const reader = new FileReader();
              reader.onload = (event) => {
                const img = `<img src="${event.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;
                document.execCommand("insertHTML", false, img);
              };
              reader.readAsDataURL(blob);
            }
          }
        };
        div.appendChild(label);
        div.appendChild(toolbar);
      } else {
        input = document.createElement("input");
        input.type = "text";
        Object.assign(input.style, styles.input);
        input.value = value || "";
        div.appendChild(label);
      }
      input.id = `cw-inp-${id}`;
      input.onfocus = () => {
        input.style.borderColor = COLORS4.primary;
        input.style.boxShadow = `0 0 0 2px ${COLORS4.primaryBg}`;
      };
      input.onblur = () => {
        input.style.borderColor = COLORS4.border;
        input.style.boxShadow = "none";
      };
      div.appendChild(input);
      return div;
    }
    function objectToCss(obj) {
      return Object.entries(obj).map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}:${v}`).join(";");
    }
    function toggleVisibility() {
      visible = !visible;
      toggleGenieAnimation(visible, popup, "cw-btn-library");
      if (visible) renderList();
    }
    return toggleVisibility;
  }

  // src/modules/configs/configs-assistant.js
  function initConfigsAssistant() {
    const CURRENT_VERSION = "v1.0";
    let visible = false;
    const COLORS4 = {
      bg: "#F8F9FA",
      surface: "#FFFFFF",
      primary: "#1A73E8",
      text: "#202124",
      textSub: "#5F6368",
      border: "#DADCE0"
    };
    const styleId2 = "cw-configs-styles";
    if (!document.getElementById(styleId2)) {
      const style = document.createElement("style");
      style.id = styleId2;
      style.innerHTML = `
            .cw-configs-container {
                display: flex; flex-direction: column; height: 100%;
                background: ${COLORS4.bg}; font-family: 'Google Sans', Roboto, sans-serif;
                padding: 20px; gap: 24px; overflow-y: auto;
            }
            .cw-configs-section { display: flex; flex-direction: column; gap: 12px; }
            .cw-configs-section-title {
                font-size: 12px; font-weight: 700; color: ${COLORS4.textSub};
                text-transform: uppercase; letter-spacing: 0.8px;
            }
            .cw-configs-card {
                background: ${COLORS4.surface}; border-radius: 12px; padding: 16px;
                border: 1px solid ${COLORS4.border}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                display: flex; flex-direction: column; gap: 16px;
            }
            .cw-configs-row { display: flex; align-items: center; justify-content: space-between; }
            .cw-configs-label { font-size: 14px; font-weight: 500; color: ${COLORS4.text}; }
            .cw-configs-desc { font-size: 12px; color: ${COLORS4.textSub}; margin-top: 2px; }
            .cw-configs-btn {
                padding: 10px; border-radius: 8px; border: 1px solid ${COLORS4.border};
                background: white; cursor: pointer; font-weight: 500; font-family: inherit;
                transition: all 0.2s;
            }
            .cw-configs-btn:hover { background: #f1f3f4; border-color: #bdc1c6; }
        `;
      document.head.appendChild(style);
    }
    const popup = document.createElement("div");
    popup.id = "configs-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, {
      right: "100px",
      width: "400px",
      height: "600px",
      overflow: "hidden",
      borderRadius: "24px"
    });
    const animRefs = { popup };
    const header = createStandardHeader(
      popup,
      "Configura\xE7\xF5es",
      CURRENT_VERSION,
      "Personalize sua experi\xEAncia e prefer\xEAncias.",
      animRefs,
      () => toggleVisibility()
    );
    popup.appendChild(header);
    const container = document.createElement("div");
    container.className = "cw-configs-container";
    popup.appendChild(container);
    const soundSection = document.createElement("div");
    soundSection.className = "cw-configs-section";
    soundSection.innerHTML = `
        <div class="cw-configs-section-title">Prefer\xEAncias de Som</div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label">Efeitos Sonoros</div>
                    <div class="cw-configs-desc">Ativar ou desativar sons de interface.</div>
                </div>
                <input type="checkbox" id="cw-config-sound-toggle" ${SoundManager.isMuted() ? "" : "checked"} style="cursor:pointer; width:20px; height:20px;">
            </div>
        </div>
    `;
    const soundToggle = soundSection.querySelector("#cw-config-sound-toggle");
    soundToggle.onchange = (e) => {
      SoundManager.setMuted(!e.target.checked);
      if (e.target.checked) SoundManager.playClick();
    };
    container.appendChild(soundSection);
    const supportSection = document.createElement("div");
    supportSection.className = "cw-configs-section";
    supportSection.innerHTML = `
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugest\xF5es</a>
            </div>
        </div>
    `;
    container.appendChild(supportSection);
    function toggleVisibility() {
      visible = !visible;
      toggleGenieAnimation(visible, popup, "cw-btn-configs");
      if (visible) {
        SoundManager.playClick();
      }
    }
    document.body.appendChild(popup);
    return toggleVisibility;
  }

  // src/modules/bau-form/bau-form-styles.js
  var COLORS3 = {
    blue: "#1A73E8",
    red: "#D93025",
    yellow: "#F9AB00",
    green: "#1E8E3E",
    blueLight: "#E8F0FE",
    redLight: "#FCE8E6",
    yellowLight: "#FEF7E0",
    greenLight: "#E6F4EA",
    textPrimary: "#202124",
    textSecondary: "#5F6368",
    border: "#DADCE0",
    surface: "rgba(255, 255, 255, 0.8)",
    // Glassmorphism base
    white: "#FFFFFF"
  };
  var RADIUS2 = {
    small: "8px",
    medium: "12px",
    large: "16px",
    pill: "100px"
  };
  var SHADOW2 = {
    deep: "0 12px 40px rgba(0,0,0,0.12)",
    subtle: "0 4px 12px rgba(0,0,0,0.05)"
  };
  var EASE2 = "cubic-bezier(0.4, 0, 0.2, 1)";
  var TRANSITION = `all 0.2s ${EASE2}`;
  var injectStyles2 = () => {
    if (document.getElementById("bau-form-global-styles")) return;
    const style = document.createElement("style");
    style.id = "bau-form-global-styles";
    style.innerHTML = `
    .bau-popup {
      display: flex !important;
      flex-direction: column !important;
      width: 480px !important;
      max-height: 85vh !important;
      background: ${COLORS3.surface} !important;
      backdrop-filter: blur(10px) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      border-radius: ${RADIUS2.large} !important;
      box-shadow: ${SHADOW2.deep} !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      overflow: hidden !important;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10000;
      font-family: 'Google Sans', Roboto, sans-serif;
    }

    .bau-content {
      padding: 24px;
      overflow-y: auto;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .bau-card {
      background: ${COLORS3.white};
      border-radius: ${RADIUS2.medium};
      padding: 16px;
      box-shadow: ${SHADOW2.subtle};
      border: 1px solid ${COLORS3.border};
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
    }

    .bau-header-banner {
      background: ${COLORS3.yellowLight};
      color: #E37400;
      padding: 10px 16px;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      margin: -16px -16px 16px -16px;
      border-bottom: 1px solid #FEF1D1;
    }

    .bau-title {
      font-size: 18px;
      font-weight: 700;
      margin: 0;
      color: ${COLORS3.textPrimary};
    }

    .bau-subtitle {
      font-size: 13px;
      color: ${COLORS3.textSecondary};
      margin: 4px 0 12px 0;
    }

    .bau-accordion-btn {
      background: #F8F9FA;
      border: 1px solid ${COLORS3.border};
      border-radius: ${RADIUS2.small};
      color: ${COLORS3.textSecondary};
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: ${TRANSITION};
      width: fit-content;
    }
    .bau-accordion-btn:hover { background: ${COLORS3.blueLight}; color: ${COLORS3.blue}; border-color: ${COLORS3.blue}; }

    .bau-fallback-card {
      background: #FFF4F2;
      border: 1px solid #FAD2CF;
    }

    .bau-label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      color: ${COLORS3.textSecondary};
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 8px;
    }

    .bau-input, .bau-select, .bau-textarea {
      width: 100%;
      padding: 12px 14px;
      border-radius: ${RADIUS2.medium};
      border: 1.5px solid ${COLORS3.border};
      background: ${COLORS3.white};
      font-size: 14px;
      color: ${COLORS3.textPrimary};
      transition: ${TRANSITION};
      box-sizing: border-box;
      outline: none;
    }
    .bau-input:focus, .bau-select:focus, .bau-textarea:focus {
      border-color: ${COLORS3.blue};
      box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.15);
      background: ${COLORS3.white};
    }

    .bau-chips-container {
      display: flex;
      gap: 10px;
      margin-bottom: 4px;
      flex-wrap: wrap;
    }

    .bau-chip {
      padding: 8px 18px;
      border-radius: ${RADIUS2.pill};
      border: 1.5px solid ${COLORS3.border};
      background: ${COLORS3.white};
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: ${TRANSITION};
      display: flex;
      align-items: center;
      gap: 8px;
      user-select: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    .bau-chip:hover {
      transform: translateY(-1.5px);
      background: ${COLORS3.blueLight};
      border-color: ${COLORS3.blue};
      box-shadow: 0 4px 8px rgba(26, 115, 232, 0.1);
    }
    .bau-chip:active { transform: scale(0.96); }
    .bau-chip.active {
      background: ${COLORS3.blueLight};
      border-color: ${COLORS3.blue};
      color: ${COLORS3.blue};
      box-shadow: inset 0 1px 2px rgba(26, 115, 232, 0.1);
    }

    .bau-footer {
      padding: 20px 24px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      border-top: 1px solid ${COLORS3.border};
      margin-top: auto;
      display: flex;
      justify-content: center;
    }

    .bau-btn-submit {
      width: 100%;
      padding: 16px;
      border-radius: ${RADIUS2.pill};
      background: ${COLORS3.blue};
      color: white;
      border: none;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: ${TRANSITION};
      box-shadow: 0 4px 14px rgba(26, 115, 232, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      letter-spacing: 0.3px;
    }
    .bau-btn-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(26, 115, 232, 0.5);
      background: #1765CC;
    }
    .bau-btn-submit:active { transform: scale(0.97); }

    .bau-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 4px;
    }
  `;
    document.head.appendChild(style);
  };

  // src/modules/bau-form/bau-form-assistant.js
  function initBAUForm() {
    injectStyles2();
    let isVisible = false;
    let currentContextData = {};
    const popup = document.createElement("div");
    popup.id = "bau-form-popup";
    popup.className = "bau-popup cw-module-window";
    popup.style.display = "none";
    const animRefs = { googleLine: null };
    const header = createStandardHeader(
      popup,
      "BAU Form",
      "v1.0.0",
      "Solicite a abertura de casos BAU rapidamente.",
      animRefs,
      () => toggleVisibility()
    );
    popup.appendChild(header);
    const content = document.createElement("div");
    content.className = "bau-content";
    popup.appendChild(content);
    const form = document.createElement("form");
    content.appendChild(form);
    const contextCard = document.createElement("div");
    contextCard.className = "bau-card";
    const banner = document.createElement("div");
    banner.className = "bau-header-banner";
    banner.innerHTML = `<span>\u26A0\uFE0F</span> Verifique os dados capturados do CRM`;
    contextCard.appendChild(banner);
    const contextBody = document.createElement("div");
    contextBody.innerHTML = `
        <h2 class="bau-title" id="bau-adv-name">Carregando...</h2>
        <p class="bau-subtitle" id="bau-adv-details">CID: - \u2022 AM: -</p>
        <button type="button" id="bau-toggle-data" class="bau-accordion-btn">Ver todos os dados capturados \u25BC</button>
        <div id="bau-hidden-data" style="display: none; margin-top: 12px; font-size: 12px; color: #5F6368; line-height: 1.6; border-top: 1px dashed #DADCE0; padding-top: 12px;"></div>
    `;
    contextCard.appendChild(contextBody);
    form.appendChild(contextCard);
    const fallbackCard = document.createElement("div");
    fallbackCard.className = "bau-card bau-fallback-card";
    fallbackCard.innerHTML = `
        <div style="color: #D93025; font-weight: 700; font-size: 13px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
            <span>\u26A0\uFE0F</span> Preencha os itens n\xE3o encontrados:
        </div>
        <div class="bau-grid-2">
            <div>
                <label class="bau-label">Fuso Hor\xE1rio</label>
                <input type="text" name="timezone" class="bau-input" placeholder="Ex: America/Sao_Paulo">
            </div>
            <div>
                <label class="bau-label">Site</label>
                <input type="text" name="site" class="bau-input" placeholder="www.exemplo.com">
            </div>
        </div>
    `;
    form.appendChild(fallbackCard);
    const actionCard = document.createElement("div");
    actionCard.className = "bau-card";
    const chipsLabel = document.createElement("label");
    chipsLabel.className = "bau-label";
    chipsLabel.textContent = "A\xE7\xF5es R\xE1pidas (Preenche Motivo e Task)";
    actionCard.appendChild(chipsLabel);
    const chipsContainer = document.createElement("div");
    chipsContainer.className = "bau-chips-container";
    const chipData = [
      { id: "gtm", text: "\u{1F680} Instala\xE7\xE3o GTM", reason: "Nova Implementa\xE7\xE3o", task: "Setup GTM" },
      { id: "ecw4", text: "\u{1F6D2} ECW4 Purchase", reason: "Nova Implementa\xE7\xE3o", task: "Google Ads Conversion" },
      { id: "consent", text: "\u{1F6E1}\uFE0F Consent Mode", reason: "Corre\xE7\xE3o de Tag", task: "GA4 Events" }
    ];
    chipData.forEach((data) => {
      const chip = document.createElement("div");
      chip.className = "bau-chip";
      chip.textContent = data.text;
      chip.dataset.id = data.id;
      chip.onclick = () => {
        chipsContainer.querySelectorAll(".bau-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        SoundManager.playClick();
        const reasonSelect = form.querySelector('select[name="reason"]');
        const taskSelect = form.querySelector('select[name="taskType"]');
        if (reasonSelect) reasonSelect.value = data.reason;
        if (taskSelect) taskSelect.value = data.task;
      };
      chipsContainer.appendChild(chip);
    });
    actionCard.appendChild(chipsContainer);
    const dropdownRow = document.createElement("div");
    dropdownRow.className = "bau-grid-2";
    dropdownRow.style.marginTop = "16px";
    dropdownRow.innerHTML = `
        <div>
            <label class="bau-label">Motivo da Abertura</label>
            <select name="reason" required class="bau-select">
                <option value="">Selecione...</option>
                <option value="Nova Implementa\xE7\xE3o">Nova Implementa\xE7\xE3o</option>
                <option value="Corre\xE7\xE3o de Tag">Corre\xE7\xE3o de Tag</option>
                <option value="Upgrade / Migra\xE7\xE3o">Upgrade / Migra\xE7\xE3o</option>
                <option value="Troubleshooting">Troubleshooting</option>
            </select>
        </div>
        <div>
            <label class="bau-label">Task para BAU</label>
            <select name="taskType" required class="bau-select">
                <option value="">Selecione...</option>
                <option value="Setup GTM">Setup GTM</option>
                <option value="Google Ads Conversion">Google Ads Conversion</option>
                <option value="GA4 Events">GA4 Events</option>
                <option value="Outros">Outros</option>
            </select>
        </div>
    `;
    actionCard.appendChild(dropdownRow);
    const textLabel = document.createElement("label");
    textLabel.className = "bau-label";
    textLabel.textContent = "Justificativa / Descri\xE7\xE3o";
    textLabel.style.marginTop = "16px";
    actionCard.appendChild(textLabel);
    const textarea = document.createElement("textarea");
    textarea.name = "description";
    textarea.required = true;
    textarea.className = "bau-textarea";
    textarea.placeholder = "Descreva detalhadamente o que precisa ser feito...";
    textarea.style.minHeight = "100px";
    actionCard.appendChild(textarea);
    const dateLabel = document.createElement("label");
    dateLabel.className = "bau-label";
    dateLabel.textContent = "Disponibilidade do Anunciante";
    dateLabel.style.marginTop = "16px";
    actionCard.appendChild(dateLabel);
    const dateInput = document.createElement("input");
    dateInput.type = "datetime-local";
    dateInput.name = "availability";
    dateInput.required = true;
    dateInput.className = "bau-input";
    actionCard.appendChild(dateInput);
    form.appendChild(actionCard);
    const footer = document.createElement("div");
    footer.className = "bau-footer";
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "bau-btn-submit";
    submitBtn.innerHTML = `<span>\u26A1</span> Enviar para o TL abrir o Caso`;
    footer.appendChild(submitBtn);
    form.appendChild(footer);
    document.body.appendChild(popup);
    const toggleBtn = document.getElementById("bau-toggle-data");
    const hiddenData = document.getElementById("bau-hidden-data");
    if (toggleBtn && hiddenData) {
      toggleBtn.onclick = () => {
        const isHidden = hiddenData.style.display === "none";
        hiddenData.style.display = isHidden ? "block" : "none";
        toggleBtn.textContent = isHidden ? "Ocultar dados \u25B2" : "Ver todos os dados capturados \u25BC";
        SoundManager.playClick();
      };
    }
    async function populateContextData() {
      currentContextData = await getPageData() || {};
      const pd = currentContextData;
      if (pd) {
        document.getElementById("bau-adv-name").textContent = pd.advName || "Anunciante Desconhecido";
        document.getElementById("bau-adv-details").textContent = `CID: ${pd.cid || "N/A"} \u2022 AM: ${pd.amName || "N/A"}`;
        const hiddenData2 = document.getElementById("bau-hidden-data");
        if (hiddenData2) {
          hiddenData2.innerHTML = `
                    <b>Email:</b> ${pd.email || "N/A"}<br>
                    <b>Idioma:</b> ${pd.language || "N/A"}<br>
                    <b>Programa:</b> ${pd.salesProgram || "N/A"}<br>
                    <b>Speakeasy ID:</b> ${pd.seId || "N/A"}
                `;
        }
        const inputTimezone = form.querySelector('input[name="timezone"]');
        const inputSite = form.querySelector('input[name="site"]');
        const hasTimezone = !!pd.timezone;
        const hasSite = !!pd.site;
        if (pd.timezone) inputTimezone.value = pd.timezone;
        if (pd.site) inputSite.value = pd.site;
        if (hasTimezone && hasSite) {
          fallbackCard.style.display = "none";
          banner.style.background = COLORS3.greenLight;
          banner.style.color = COLORS3.green;
          banner.style.borderBottomColor = COLORS3.green;
          banner.innerHTML = `<span>\u2705</span> Dados capturados com sucesso!`;
        } else {
          fallbackCard.style.display = "block";
          banner.style.background = COLORS3.yellowLight;
          banner.style.color = "#E37400";
          banner.style.borderBottomColor = "#FEF1D1";
          banner.innerHTML = `<span>\u26A0\uFE0F</span> Dados ausentes. Verifique o fallback abaixo.`;
        }
      }
    }
    form.onsubmit = async (e) => {
      e.preventDefault();
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Carregando...";
      const formData = new FormData(form);
      const escalationData = Object.fromEntries(formData.entries());
      const contextData = currentContextData;
      const payload = {
        caseId: contextData.caseId || "",
        cid: contextData.cid || "",
        seId: contextData.seId || "",
        advName: contextData.advName || "",
        email: contextData.email || "",
        language: contextData.language || "",
        amName: contextData.amName || "",
        salesProgram: contextData.salesProgram || "",
        // Mistura os dados raspados com o que o agente preencheu manualmente no fallback
        site: escalationData.site || contextData.site || "",
        timezone: escalationData.timezone || contextData.timezone || "",
        // Dados estritamente do formulário
        reason: escalationData.reason,
        taskType: escalationData.taskType,
        description: escalationData.description,
        availability: escalationData.availability
      };
      try {
        await sendBAUEscalation(payload, contextData.agentEmail || "anon");
        SoundManager.playSuccess();
        showToast("Escalonamento enviado com sucesso!", "success");
        form.reset();
        chipsContainer.querySelectorAll(".bau-chip.active").forEach((c) => c.classList.remove("active"));
        toggleVisibility();
      } catch (error) {
        console.error("Erro BAU:", error);
        showToast("Falha ao enviar: " + (error.message || "Erro desconhecido"), "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    };
    async function toggleVisibility() {
      isVisible = !isVisible;
      if (isVisible) {
        popup.style.display = "flex";
        await populateContextData();
      }
      toggleGenieAnimation(isVisible, popup, "cw-btn-bauform");
    }
    return toggleVisibility;
  }

  // src/app.js
  function initApp() {
    if (window.techSolInitialized) {
      playStartupAnimation();
      return;
    }
    window.techSolInitialized = true;
    const APP_VERSION = "v5.2";
    console.log(`\u{1F680} TechSol Suite Initializing (${APP_VERSION})...`);
    try {
      initGlobalStylesAndFont();
      try {
        SoundManager.initGlobalListeners();
        SoundManager.playStartup();
      } catch (audioErr) {
        console.warn("\xC1udio bloqueado:", audioErr);
      }
      DataService.fetchTips();
      playStartupAnimation();
      const toggleNotes = initCaseNotesAssistant();
      const toggleEmail = initEmailAssistant();
      const toggleScript = initCallScriptAssistant();
      const toggleLinks = initFeedbackAssistant();
      const toggleTimezone = initTimezoneAssistant();
      const toggleLibrary = initPersonalLibrary();
      const toggleConfigs = initConfigsAssistant();
      const toggleBAUForm = initBAUForm();
      const broadcastControl = initBroadcastAssistant();
      initCommandCenter({
        toggleNotes,
        toggleEmail,
        toggleScript,
        toggleLinks,
        toggleTimezone,
        toggleLibrary,
        // [NOVO] Passa o controle para a pílula
        toggleConfigs,
        toggleBAUForm,
        broadcastControl
      });
      setTimeout(() => {
        DataService.logEvent("App", "Start", "Session Start");
        initOnboarding();
        setTimeout(() => {
          checkAndShowChangelog(APP_VERSION);
        }, 500);
      }, 2500);
    } catch (error) {
      console.error("Erro fatal na inicializa\xE7\xE3o:", error);
      showToast("Erro cr\xEDtico ao iniciar o Case Wizard.", { error: true });
    }
  }
  initApp();
})();
