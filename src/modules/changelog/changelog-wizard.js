// src/modules/changelog/changelog-wizard.js

import { stylePopup, showToast } from "../shared/utils.js";
import { SoundManager } from "../shared/sound-manager.js";
import { lockBodyScroll, unlockBodyScroll } from "../shared/dom-utils.js";
import { RELEASE_NOTES } from "./changelog-data.js";

export function checkAndShowChangelog(currentAppVersion) {
    const lastSeenVersion = localStorage.getItem("cw_last_version");

    // 1. Lógica de Verificação
    // Se não tem versão salva (usuário novo), não mostra changelog (mostra tutorial).
    // Se a versão salva for diferente da atual, mostra o changelog.
    if (!lastSeenVersion) {
        // Primeira vez usando o app: Salva a versão atual e sai silenciosamente
        // (O Onboarding Wizard vai cuidar dele)
        localStorage.setItem("cw_last_version", currentAppVersion);
        return;
    }

    if (lastSeenVersion !== currentAppVersion) {
        // Versão mudou! Hora do show.
        initChangelogModal(currentAppVersion);
    }
}

function initChangelogModal(version) {
    const SLIDES = RELEASE_NOTES.slides;
    let currentSlide = 0;

    // --- ESTILOS (Reutilizando a base do Onboarding para consistência) ---
    const styles = {
        overlay: {
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(5px)",
            zIndex: "2147483647",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: "0", transition: "opacity 0.3s ease"
        },
        card: {
            width: "400px", background: "#fff", borderRadius: "24px",
            padding: "32px", textAlign: "center", position: "relative",
            boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
            fontFamily: "'Google Sans', Roboto, sans-serif",
            transform: "translateY(30px)", transition: "all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"
        },
        badge: {
            display: "inline-block", padding: "4px 12px", borderRadius: "12px",
            background: "#E8F0FE", color: "#1967D2", fontSize: "11px", fontWeight: "700",
            textTransform: "uppercase", marginBottom: "16px", letterSpacing: "0.5px"
        },
        icon: { fontSize: "42px", marginBottom: "16px", display: "block" },
        title: { fontSize: "20px", fontWeight: "700", color: "#202124", marginBottom: "8px" },
        text: { fontSize: "14px", color: "#5f6368", lineHeight: "1.5", marginBottom: "32px", minHeight: "42px" },
        
        dotsContainer: { display: "flex", justifyContent: "center", gap: "6px", marginBottom: "24px" },
        dot: { width: "6px", height: "6px", borderRadius: "50%", background: "#dadce0", transition: "all 0.3s" },
        dotActive: { background: "#1a73e8", width: "18px", borderRadius: "4px" },
        
        btn: {
            width: "100%", padding: "12px", borderRadius: "12px", border: "none", cursor: "pointer",
            fontSize: "14px", fontWeight: "600", transition: "all 0.2s",
            background: "#1a73e8", color: "#fff", boxShadow: "0 4px 12px rgba(26,115,232,0.3)"
        }
    };

    // --- DOM ---
    const overlay = document.createElement("div");
    Object.assign(overlay.style, styles.overlay);
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "cw-changelog-title");

    const card = document.createElement("div");
    Object.assign(card.style, styles.card);

    // Badge de Versão
    const badge = document.createElement("div");
    Object.assign(badge.style, styles.badge);
    badge.textContent = `Atualização ${version}`;

    const iconEl = document.createElement("div");
    Object.assign(iconEl.style, styles.icon);

    const titleEl = document.createElement("div");
    titleEl.id = "cw-changelog-title";
    Object.assign(titleEl.style, styles.title);

    const textEl = document.createElement("div");
    Object.assign(textEl.style, styles.text);

    const dotsEl = document.createElement("div");
    Object.assign(dotsEl.style, styles.dotsContainer);

    const btnNext = document.createElement("button");
    Object.assign(btnNext.style, styles.btn);
    btnNext.onmouseover = () => btnNext.style.transform = "scale(1.02)";
    btnNext.onmouseout = () => btnNext.style.transform = "scale(1)";

    // Montagem
    card.appendChild(badge);
    card.appendChild(iconEl);
    card.appendChild(titleEl);
    card.appendChild(textEl);
    card.appendChild(dotsEl);
    card.appendChild(btnNext);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    lockBodyScroll();

    // --- LOGICA ---
    function renderSlide(index) {
        const slide = SLIDES[index];
        
        iconEl.textContent = slide.icon;
        titleEl.textContent = slide.title;
        textEl.textContent = slide.text;

        // Dots
        dotsEl.innerHTML = "";
        SLIDES.forEach((_, i) => {
            const d = document.createElement("div");
            Object.assign(d.style, styles.dot);
            if (i === index) Object.assign(d.style, styles.dotActive);
            dotsEl.appendChild(d);
        });

        // Botão
        if (index === SLIDES.length - 1) {
            btnNext.textContent = "Entendi, vamos lá! 👍";
        } else {
            btnNext.textContent = "Próximo";
        }
    }

    function close() {
        // Atualiza a versão no cache para não mostrar mais
        localStorage.setItem("cw_last_version", version);

        overlay.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        setTimeout(() => overlay.remove(), 400);
        SoundManager.playSuccess();
        showToast(`TechSol atualizado para ${version}!`);
        document.removeEventListener("keydown", handleKeydown);
        unlockBodyScroll();
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

    // Enter avança slide a slide (ou fecha no último); Esc dispensa direto -
    // não há "pular" aqui, só o aviso do que mudou.
    function handleKeydown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            btnNext.click();
        } else if (e.key === "Escape") {
            e.preventDefault();
            close();
        }
    }
    document.addEventListener("keydown", handleKeydown);

    // Start
    renderSlide(0);
    requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        card.style.transform = "translateY(0)";
    });
    setTimeout(() => btnNext.focus(), 450);
}