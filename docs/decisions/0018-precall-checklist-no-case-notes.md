# 0018 — Pre-call Checklist: sub-recurso do Case Notes, com a nota em inglês fixo

**Date**: 2026-10-23
**Status**: Accepted

## Context

O SOP de pre-call pede que o agente registre, antes da ligação, um checklist de
descoberta (caso duplicado, 360 Suite, sGTM, API, vendedor em cópia, tasks,
contatos, site, CID, GA4, próximos passos) no card de nota do caso. A medida de
sucesso é contar quantas case notes elegíveis têm esse bloco, e quantas registram
a exceção (`Completed: No`). Quem mede lê o **texto** das notas.

Duas perguntas estruturais:

1. É um módulo novo ou parte de um existente?
2. Em que idioma sai o bloco? O Case Notes grava no idioma do **atendimento**
   (ADR-0016), e o app é PT/ES/EN.

## Decision

1. **Sub-recurso do Case Notes**, em `src/modules/notes/precall/`, com janela e
   estado próprios, aberta pelo botão da pílula e pelo Ctrl+K. Reaproveita a saída
   do Notes (`ensureNoteCardIsOpen`, `copyHtmlToClipboard`) e as capturas de
   `page-data.js`. Não toca backend, planilha, Central nem RBAC: nada é gravado.
2. **O bloco da nota sai sempre em inglês**, com rótulos, ordem e valores fixos
   (`specs/workflow/precall-checklist.md`). A tela do formulário segue o idioma da
   interface (PT/ES/EN) como o resto do app.

## Alternatives considered

- **Etapa do fluxo do Case Notes**: o checklist acontece antes do desfecho, e
  `handleGenerate`/`handleCopy` só funcionam com um substatus escolhido. Encaixá-lo
  ali exigiria um "modo sem substatus" num arquivo de 1.300 linhas.
- **Módulo de topo independente**: custaria o mesmo registro (pílula, Ctrl+K,
  estilos, dicionário) sem ganho, porque os dados e a saída são os do Notes. O que
  restou de "módulo" foi só a janela.
- **Nota no idioma do atendimento** (como o Case Notes): quebraria a leitura de
  quem audita — o mesmo bloco apareceria em três idiomas e a contagem por texto
  perderia casos sem nenhum erro visível.

## Consequences

### Positive
- Entrega só de frontend (sem `clasp`, sem semear planilha).
- Um teste trava o texto inteiro; mudar a métrica por acidente passa a falhar.
- Campos que o CRM já mostra chegam preenchidos, e o formulário nunca mistura
  dados de dois casos.

### Negative / Tradeoffs
- Primeira exceção à regra dos dois idiomas (`_MASTER_RULEBOOK.md` §4): um texto
  que vai para o caso e **não** segue o idioma do atendimento. A regra foi
  atualizada para dizer isso.
- O conteúdo (campos, opções) mora no bundle, não na Central: mudar o checklist
  exige release. Aceito porque o texto é contrato com quem audita e não deve
  mudar por edição de tela.
- A linha de exceção (`Completed: No → motivo`) segue o texto do SOP e ainda
  precisa de confirmação de quem audita.

### Neutral
- Duas consequências de "nada é gravado": não há telemetria de uso na ferramenta
  (a medição é pelas notas), e não há rascunho do checklist entre sessões.

## Notes

- Spec: `specs/workflow/precall-checklist.md`.
- Testes: `npm run test:precall`, `npm run smoke:precall`.
