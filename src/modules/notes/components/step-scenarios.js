// src/modules/notes/components/step-scenarios.js

import { scenarioSnippets, getScenarioFields } from "../data/notes-data.js";
import { SoundManager } from "../../shared/sound-manager.js";
import { getLanguage } from "../../shared/i18n.js";

const PREVIEW_PLACEHOLDER = {
  pt: "Passe o mouse sobre um cenário para visualizar o texto...",
  es: "Pasa el mouse sobre un escenario para ver el texto...",
};
function defaultPreviewText() {
  return PREVIEW_PLACEHOLDER[getLanguage()] || PREVIEW_PLACEHOLDER.pt;
}

export function createScenariosComponent(onSelectCallback) {
  // Hover/preview aqui é todo via estilo inline em JS, sem classe CSS pra
  // pendurar um @media - checa direto, igual foi feito na animação do genie.
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const container = document.createElement("div");
  container.className = "cw-step-scenarios";

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
  previewText.textContent = defaultPreviewText();
  previewBox.appendChild(previewText);

  // Estado interno
  const selectedIds = new Set();
  let hoverTimeout = null;

  // Refined render version
  container.render = (subStatusKey, caseType) => {
      selectedIds.clear();
      // Filtro por substatus real (campo `substatus` de cada snippet em
      // notes-data.js), não mais por heurística de substring no ID (ex:
      // "-ni-", "attempted") que só sabia distinguir o STATUS (NI/SO/AS/IN/
      // DC), nunca o substatus - todo cenário de NI aparecia em qualquer um
      // dos 4 substatus de NI, sem diferenciação. Regras de quais cenários
      // pertencem a qual substatus: specs/workflow/case-notes-status-rules.md
      const filtered = Object.entries(scenarioSnippets).filter(([id, data]) => {
          const matchesType = !data.type || data.type === 'all' || data.type === caseType;
          const matchesSubStatus = Array.isArray(data.substatus) && data.substatus.includes(subStatusKey);
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

          const localized = getScenarioFields(data, getLanguage(), id);
          const textPreviewContent = localized['field-REASON_COMMENTS'] || localized['field-CONTEXTO_CALL'] || id;

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
                          previewText.textContent = defaultPreviewText();
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
