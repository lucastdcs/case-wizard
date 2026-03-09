// src/modules/notes/core/notes-state.js
export class NotesState {
    constructor() { this.reset(); }
    reset() {
        this.currentCaseType = "bau"; this.currentLang = "pt"; this.isPortugalCase = false;
        this.consent = false; this.tagSupportUsed = false; this.forcedScreenshots = new Set();
        this.visible = false; this.isSplitView = false; this.currentStatus = "";
        this.currentSubStatus = ""; this.formData = {}; this.activeTasks = [];
        this.screenshotsData = {}; this.tagSupportState = null; this.isDirty = false;
        this.excludedFields = new Set();
        this.favorites = new Set(JSON.parse(localStorage.getItem('cw-notes-favorites') || '[]'));
        this.screenshotMode = "implementation";
    }
    setCaseType(type) { this.currentCaseType = type; this.notify(); }
    setLanguage(lang) { this.currentLang = lang; this.notify(); }
    setPortugalCase(val) { this.isPortugalCase = val; this.notify(); }
    setConsent(val) { this.consent = val; this.notify(); }
    setTagSupportUsed(val) {
        this.tagSupportUsed = val;
        if (!val) this.forcedScreenshots.clear();
        this.notify();
    }
    toggleForcedScreenshot(taskKey, val) {
        if (val) this.forcedScreenshots.add(taskKey);
        else this.forcedScreenshots.delete(taskKey);
        this.notify();
    }
    toggleFieldExclusion(fieldId, isExcluded) {
        if (isExcluded) this.excludedFields.add(fieldId);
        else this.excludedFields.delete(fieldId);
        this.notify();
    }
    setStatus(status) { this.currentStatus = status; this.notify(); }
    setSubStatus(subStatus) { this.currentSubStatus = subStatus; this.notify(); }
    setScreenshotMode(mode) { this.screenshotMode = mode; this.notify(); }
    toggleFavorite(id) {
        if (this.favorites.has(id)) this.favorites.delete(id);
        else this.favorites.add(id);
        localStorage.setItem('cw-notes-favorites', JSON.stringify([...this.favorites]));
        this.notify();
    }
    updateField(id, value) { this.formData[id] = value; this.isDirty = true; this.notify(); }
    listeners = [];
    subscribe(fn) { this.listeners.push(fn); return () => this.listeners = this.listeners.filter(l => l !== fn); }
    notify() { this.listeners.forEach(fn => fn(this)); }
}
export const notesState = new NotesState();
