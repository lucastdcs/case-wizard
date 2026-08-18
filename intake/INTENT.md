<!-- generated-by: groundrules v1.10.0 -->
# Intake / Intent — Case Wizard

Raw upstream content (paste, email excerpt, call transcript, PO doc, etc.) describing the project intent.

This file is the **raw source**. The structured synthesis (goal, users, constraints, non-goals, acceptance) lives in `docs/VISION.md`.

Captured verbatim (original Portuguese) from `README.md` (overview + features) and `specs/_MASTER_RULEBOOK.md` (project philosophy + stack restrictions) at adoption time (2026-08-18).

---

## From README.md — Overview

> 🚀 TechSol Operations Assistant
>
> **Suite de produtividade e automação para o CRM corporativo.**
> *Desenvolvido para aumentar a eficiência dos agentes e padronizar a comunicação.*
>
> Este projeto é uma **camada de aplicação (Overlay)** injetada via JavaScript Bookmarklet. Ele roda "on top" do CRM nativo, manipulando o DOM para adicionar funcionalidades avançadas como automação de e-mails, sistema de broadcast, sons de feedback e melhorias de UX (Material Design).

## From README.md — Funcionalidades Principais

> ### 📝 Case Notes
> - Gera notas de caso padronizadas (BAU/LM, PT/ES) a partir de Status → Sub-status → template.
> - Seletor visual de tasks, cenários rápidos, suporte a tags de implementação e captura automática de Speakeasy ID.
> - Sistema de rascunhos "estacionados" com autosave de emergência.
>
> ### 📧 Email Assistant
> - **Detecção de Rascunho:** Algoritmo de *polling* que identifica, descarta e limpa rascunhos "fantasmas" antes de inserir um novo template.
> - **Templates dinâmicos:** biblioteca de templates com placeholders + atalhos "Smart CR" ligados aos sub-status do Case Notes.
>
> ### 📞 Call Script Assistant
> - Checklist interativo de roteiro de chamada (PT/ES/EN × BAU/LT), com barra de progresso e captura ao vivo de CID/e-mail do cliente.
>
> ### 🌎 Timezone Assistant
> - Monitoramento de horário local por país atendido e planejador de horário de reunião com o cliente.
>
> ### 🅿️ BAU Central
> - Wizard de escalação de caso para BAU (abertura ou descarte), dashboard de acompanhamento dos próprios casos e fluxo de edição.
>
> ### 📚 Minha Biblioteca
> - Snippets pessoais (notas, e-mails, textos gerais) com sincronia entre dispositivos via Google Sheets.
>
> ### ⚙️ Configurações
> - Perfil do agente (papel, segmento, idioma), preferências de som e link de feedback/reporte de bug.
>
> ### 📢 Broadcast System
> - Sistema de avisos globais consumindo dados do backend.
> - Persistência de leitura via `localStorage`.
> - Suporte a emojis customizados (parser interno de shortcodes).
>
> ### 🎨 UX & Sound Design
> - **Sound UX:** Feedback auditivo para ações (Sucesso, Erro, Notificação) e Startup Sound estilo "Netflix/Cinema".
> - **Google Material Look:** Componentes visuais (Dropdowns, Inputs) recriados para se misturar nativamente à interface do Google.

## From README.md — Notas Importantes

> - **Bloqueios de Rede:** O script depende de acesso ao domínio `github.io`. Se a rede corporativa bloquear, o script não carregará.
> - **Persistência:** As preferências de usuário (posição do widget, mute de som) são salvas no `localStorage` do navegador. Limpar o cache do navegador resetará essas configurações.
>
> **Status do Projeto:** 🟢 Estável (v5.2)
> **Mantenedor:** Lucas Teixeira / Time TechSol

## From specs/_MASTER_RULEBOOK.md — Filosofia do Projeto

> - **Fonte da Verdade:** Esta pasta `/specs` é a lei absoluta do projeto. Se o código legado divergir de qualquer regra descrita nestes arquivos, a regra prevalece e o código deve ser refatorado para se adequar.
> - **KISS (Keep It Simple, Stupid):** O código deve ser simples, legível e direto.

## From specs/_MASTER_RULEBOOK.md — Tech Stack e Restrições

> - **Front-end:** HTML, CSS e Vanilla JavaScript.
> - **Back-end:** Google Apps Script (GAS) operando com o Google Sheets como banco de dados.
> - **Comunicação:** JSONP (`jsonpFetch`) devido a restrições de CORS/ambiente.
> - **PROIBIDO:** O uso de frameworks externos (React, Angular, Vue) ou bibliotecas (jQuery, Axios), a menos que explicitamente autorizado.
