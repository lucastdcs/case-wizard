// src/modules/notes/components/step-scenarios.js

import { scenarioSnippets } from "../data/notes-data.js";
import { SoundManager } from "../../shared/sound-manager.js";

export function createScenariosComponent(onSelectCallback) {
  // Hover/preview aqui é todo via estilo inline em JS, sem classe CSS pra
  // pendurar um @media - checa direto, igual foi feito na animação do genie.
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const container = document.createElement("div");
  container.className = "cw-step-scenarios";

  const DEFAULT_PREVIEW_TEXT = "Passe o mouse sobre um cenário para visualizar o texto...";

  // 1. Área de Chips (Grid)
  const grid = document.createElement("div");
  Object.assign(grid.style, {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "12px"
  });

  // 2. Área de Preview (Onde o texto aparece ao passar o mouse)
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
  // 0.05s bate com o setTimeout de 50ms do hover (abaixo) - o texto troca
  // exatamente quando o fade-out termina, não no meio dele.
  previewText.style.transition = "opacity 0.05s ease, transform 0.05s ease";
  previewText.textContent = DEFAULT_PREVIEW_TEXT;
  previewBox.appendChild(previewText);

  // Estado interno
  const selectedIds = new Set();
  let hoverTimeout = null;

  // Refined render version
  container.render = (subStatusKey, caseType) => {
      selectedIds.clear();
      const filtered = Object.entries(scenarioSnippets).filter(([id, data]) => {
          const matchesType = !data.type || data.type === 'all' || data.type === caseType;
          let matchesSubStatus = false;
          if (subStatusKey.startsWith('NI_')) {
              matchesSubStatus = id.includes('-ni-') || id.includes('attempted');
          } else if (subStatusKey.startsWith('SO_')) {
              matchesSubStatus = id.includes('gtm') || id.includes('whatsapp') || id.includes('form') || id.includes('ecw4') || id.includes('ga4') || id.includes('-so-');
          } else if (subStatusKey.startsWith('AS_')) {
              matchesSubStatus = id.includes('-as-');
          } else if (subStatusKey.startsWith('IN_')) {
              matchesSubStatus = id.includes('-in-');
          } else if (subStatusKey.startsWith('DC_')) {
              matchesSubStatus = id.includes('-dc-');
          }
          return matchesType && matchesSubStatus;
      });

      grid.innerHTML = "";
      filtered.forEach(([id, data]) => {
          const chip = document.createElement("div");
          const label = id.replace('quickfill-', '').replace(/-/g, ' ');
          chip.textContent = label;
          chip.dataset.id = id;
          chip.dataset.sound = "hover";

          Object.assign(chip.style, {
            padding: "6px 12px",
            borderRadius: "16px",
            border: "1px solid #dadce0",
            background: "#ffffff",
            fontSize: "13px",
            color: "#3c4043",
            cursor: "pointer",
            userSelect: "none",
            transition: "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
          });

          const textPreviewContent = data['field-REASON_COMMENTS'] || data['field-CONTEXTO_CALL'] || id;

          chip.onmouseenter = () => {
              if (hoverTimeout) clearTimeout(hoverTimeout);

              if (!selectedIds.has(id)) {
                  chip.style.background = "#f1f3f4";
              }

              previewText.style.opacity = "0";
              if (!reduceMotion) previewText.style.transform = "translateY(5px)";

              hoverTimeout = setTimeout(() => {
                  previewText.textContent = textPreviewContent.substring(0, 120) + (textPreviewContent.length > 120 ? '...' : '');
                  previewText.style.opacity = "1";
                  if (!reduceMotion) previewText.style.transform = "translateY(0)";
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
