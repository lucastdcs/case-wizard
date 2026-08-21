// src/modules/notes/components/bullet-editor.js
export function enableAutoBullet(textarea) {
    if (textarea.dataset.bulletEnabled === "true") return; textarea.dataset.bulletEnabled = "true";
    if (textarea.value.trim() === "" || textarea.value.trim() === "•") textarea.value = "• ";
    textarea.addEventListener('keydown', function (e) {
        const start = this.selectionStart; const end = this.selectionEnd; const value = this.value; const lineStart = value.lastIndexOf("\n", start - 1) + 1; const currentLine = value.substring(lineStart, start);
        if (e.key === "Enter") {
            e.preventDefault(); const indent = currentLine.match(/^(\s*•\s*)/)?.[0] || "• ";
            if (currentLine.trim() === "•") { this.value = value.substring(0, lineStart) + "\n" + value.substring(end); this.selectionStart = this.selectionEnd = lineStart + 1; return; }
            const insertText = "\n" + indent; this.value = value.substring(0, start) + insertText + value.substring(end); this.selectionStart = this.selectionEnd = start + insertText.length;
        } else if (e.key === "Tab") {
            e.preventDefault(); if (e.shiftKey) { if (currentLine.startsWith("  ")) { this.value = value.substring(0, lineStart) + currentLine.substring(2) + value.substring(start); this.selectionStart = this.selectionEnd = start - 2; } }
            else { const insertText = "  "; this.value = value.substring(0, lineStart) + insertText + currentLine + value.substring(start); this.selectionStart = this.selectionEnd = start + 2; }
        } else if (e.key === "Backspace") {
            if (start === end && start > 0) {
                const textBefore = value.substring(0, start);
                if (textBefore.endsWith("• ")) { e.preventDefault(); this.value = textBefore.substring(0, start - 2) + value.substring(end); this.selectionStart = this.selectionEnd = start - 2; }
                else if (textBefore.endsWith("  ") && currentLine.trim().startsWith("•")) { e.preventDefault(); this.value = textBefore.substring(0, start - 2) + value.substring(end); this.selectionStart = this.selectionEnd = start - 2; }
            }
        }
    })
}
