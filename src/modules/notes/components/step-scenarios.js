// src/modules/notes/components/step-scenarios.js

import { scenarioSnippets } from "../data/notes-data.js";
import { SoundManager } from "../../shared/sound-manager.js";

export function createScenariosComponent(onSelectCallback) {

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
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    fontStyle: "italic",
    transition: "all 0.2s ease"
  });
  previewBox.innerHTML = "<span>Passe o mouse sobre um cenário para visualizar o texto...</span>";

  // Estado interno
  let activeValue = null;

  // Refined render version
  container.render = (subStatusKey, caseType) => {
      activeValue = null;
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

          const textPreview = data['field-REASON_COMMENTS'] || data['field-CONTEXTO_CALL'] || id;

          chip.onmouseenter = () => {
              if (activeValue !== id) {
                  previewBox.textContent = textPreview.substring(0, 100) + (textPreview.length > 100 ? '...' : '');
                  chip.style.background = "#f1f3f4";
              }
          };
          chip.onmouseleave = () => {
              if (activeValue !== id) {
                  chip.style.background = "#ffffff";
                  if (!activeValue) previewBox.textContent = "Passe o mouse para ver os detalhes";
              }
          };
          chip.onclick = () => {
              SoundManager.playClick();
              const isSelecting = activeValue !== id;
              activeValue = isSelecting ? id : null;

              Array.from(grid.children).forEach(c => {
                  const isThis = c.dataset.id === activeValue;
                  c.style.background = isThis ? "#e8f0fe" : "#ffffff";
                  c.style.borderColor = isThis ? "#1a73e8" : "#dadce0";
                  c.style.color = isThis ? "#1967d2" : "#3c4043";
              });

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
