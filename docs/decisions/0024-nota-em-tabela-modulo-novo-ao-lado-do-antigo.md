<!-- generated-by: groundrules v1.10.0 -->
# 0024 — Nota em tabela como módulo novo, ao lado do Case Notes atual

**Date**: 2026-11-05
**Status**: Accepted — decisão do Lucas de 2026-11-05 (revê o item 1 do ADR-0022)

## Context

O ADR-0022 trocava o formato da nota **para todos**: a tabela entrava no lugar de
`<b>rótulo</b><br>valor`, e o código antigo (`form-builder.js`, `output-generator.js`) seria apagado.
O Lucas pediu o contrário: **manter uma versão do módulo antigo de Case Notes viva e apenas
acrescentar o módulo novo de notas.**

O que o ADR-0022 já registrava como não provado reforça o pedido: o estilo da tabela não foi colado
no CRM real, e ~100 rótulos em PT e ES esperam revisão de falante nativo. Hoje todo agente usa o módulo
antigo; um release que o troque junto com o padrão novo não tem volta barata.

## Decision

1. O módulo novo vive em **`src/modules/notes-table/`**, com id `notetable`, **registrado ao lado de
   `notes`** (`app.js`, `pill-layout.js`, `command-center.js`, palette). Ninguém é migrado: o agente
   escolhe o módulo (pílula ou Ctrl+K). O novo **não vem fixado** por padrão (ADR-0023).
2. O módulo antigo **não muda de comportamento nem perde código**: `form-builder.js`,
   `output-generator.js`, `NotesState`, `SUBSTATUS_TEMPLATES`, os módulos `note_template` e
   `task_screenshots`, atalhos e rascunhos continuam como estão. **Nada é apagado nesta entrega.**
3. O novo tem **estado, rascunhos e preferências próprios** (chave de armazenamento separada). Ele não
   lê rascunho do formato antigo: os rascunhos antigos seguem no módulo antigo.
4. **Reuso por import, sem copiar e sem editar** o arquivo de origem: `components/step-tasks.js` (seleção
   de tasks e prints por task), `data/tasks-service.js`, a captura de `page-data.js`, `notes-bridge.js`,
   `components/split-transfer.js`, `getScenariosFor`. Se um arquivo compartilhado precisar mudar, a mudança
   é **aditiva** (export ou parâmetro novo com default que preserva o comportamento) e os testes do módulo
   antigo provam que nada mudou.
5. Na Central, `note_blocks` e `note_layouts` são módulos **novos**; o antigo segue com `note_template`.
6. **Quando o novo vira o padrão e o antigo se aposenta é outra decisão**, fora desta entrega.

O restante do ADR-0022 (catálogo na Central, estrutura no código, `NA` explícito, Additional Details)
continua valendo para o módulo novo.

## Alternatives considered

- **Substituir no lugar** (ADR-0022 original): rejeitado pelo Lucas.
- **Uma bandeira dentro do mesmo módulo** (formato antigo ou tabela): rejeitado. `NotesState` é um singleton
  e `form-builder.js` monta o formulário por template; dois formatos de saída no mesmo gerador aumentam a
  chance de regressão justamente no módulo que todos usam.
- **Copiar o módulo antigo para a pasta nova**: rejeitado. Duplicaria captura, tasks e Split & Transfer, e uma
  correção teria de entrar duas vezes.

## Consequences

### Positive
- Risco zero para quem usa o módulo antigo; o rollback do novo é desregistrá-lo.
- O módulo novo pode ser validado no CRM real com poucos agentes antes de virar o padrão.

### Negative / Tradeoffs
- Dois caminhos de código ao mesmo tempo: uma regra que valha para os dois (tasks, Tag Support, captura)
  precisa ser lembrada nos dois até a aposentadoria.
- O agente vê dois módulos de nota até a decisão final; o nome do novo precisa deixar claro qual é qual.
- Os testes do módulo antigo viram **trava de regressão** desta entrega: rodam antes (linha de base) e depois.

### Neutral
- ADR-0022 segue Accepted; só o item 1 ("para todos", "no lugar do formato atual") foi revisto aqui.

## Notes

- Spec: `specs/workflow/case-note-table.md`. Plano de execução: `PLAN.md`.
