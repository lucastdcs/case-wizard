# 📖 MASTER RULEBOOK (Diretriz Principal)

## 1. Filosofia do Projeto
- **Fonte da Verdade:** Esta pasta `/specs` é a lei absoluta do projeto. Se o código legado divergir de qualquer regra descrita nestes arquivos, a regra prevalece e o código deve ser refatorado para se adequar.
- **KISS (Keep It Simple, Stupid):** O código deve ser simples, legível e direto.

## 2. Tech Stack e Restrições
- **Front-end:** HTML, CSS e Vanilla JavaScript. 
- **Back-end:** Google Apps Script (GAS) operando com o Google Sheets como banco de dados.
- **Comunicação:** JSONP (`jsonpFetch`) devido a restrições de CORS/ambiente.
- **PROIBIDO:** O uso de frameworks externos (React, Angular, Vue) ou bibliotecas (jQuery, Axios), a menos que explicitamente autorizado.

## 3. Padrões de Nomenclatura (Clean Code)
- **Funções JS:** Padrão `camelCase` (ex: `sendBAUEscalation`, `updateBauCase`).
- **Constantes (Globais/Status):** Padrão `UPPER_SNAKE_CASE` (ex: `PENDING_TL_CREATION`, `CACHE_KEY_TIPS`).
- **Classes CSS:** Padrão com hífens/kebab-case (ex: `.bau-highlight-panel`, `.discard-theme`).