// src/modules/notes/core/notes-state.js
export class NotesState {
    constructor() {
        // Visibilidade NÃO é estado de formulário, então mora aqui e não no
        // reset(): "Limpar" e estacionar um rascunho chamam resetModule() com
        // o módulo aberto, e zerar `visible` ali dessincronizava a flag da
        // janela real - o clique seguinte no X invertia pro lado errado e
        // REABRIA o módulo. Ver isModuleOpen() em shared/animations.js.
        this.visible = false;
        this.reset();
    }
    reset() {
        this.currentCaseType = "bau"; this.currentLang = "pt"; this.isPortugalCase = false;
        this.consent = false; this.tagSupportUsed = false; this.forcedScreenshots = new Set();
        this.isSplitView = false; this.currentStatus = "";
        this.currentSubStatus = ""; this.formData = {}; this.activeTasks = [];
        this.screenshotsData = {}; this.tagSupportState = null; this.isDirty = false;
        this.activeFields = [];
        const savedFavorites = typeof localStorage !== 'undefined' ? localStorage.getItem('cw-notes-favorites') : null;
        this.favorites = new Set(JSON.parse(savedFavorites || '[]'));
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
        this.activeFields = this.activeFields.filter(key => key !== fieldKey);
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
    setScreenshotMode(mode) { this.screenshotMode = mode; this.notify(); }
    setActiveTasks(tasks) { this.activeTasks = tasks; this.isDirty = true; this.notify(); }
    toggleFavorite(id) {
        if (this.favorites.has(id)) this.favorites.delete(id);
        else this.favorites.add(id);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('cw-notes-favorites', JSON.stringify([...this.favorites]));
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
    subscribe(fn) { this.listeners.push(fn); return () => this.listeners = this.listeners.filter(l => l !== fn); }
    notify() { this.listeners.forEach(fn => fn(this)); }
}
export const notesState = new NotesState();
