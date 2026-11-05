<!-- generated-by: groundrules v1.10.0 -->
# 0022 — Nota em tabela: catálogo de blocos na Central, estrutura no código

**Date**: 2026-11-05
**Status**: Accepted — decisões do Lucas de 2026-11-05; item 1 revisto pelo [ADR-0024](0024-nota-em-tabela-modulo-novo-ao-lado-do-antigo.md) (módulo novo ao lado do antigo); implementação em andamento (ver `PLAN.md`)

## Context

Outro projeto do time mudou o padrão das notas de caso. O padrão novo tem três templates, um por
segmento do cliente (ALL TASKS, ECL SBS-E e ECL MMS), e cada um é uma ou mais **tabelas** com
estrutura própria (chave-valor, uma linha por CID, grupos com `rowspan`).

Hoje o Case Notes imprime `<b>rótulo</b><br>valor` e, quando o campo fica vazio, escreve `N/A` em
silêncio (`output-generator.js`); só o `REASON_COMMENTS` é validado antes de gerar. O texto do padrão é
de overhead e de SME, e muda mais depressa que o bundle: é o mesmo problema que o ADR-0012 resolveu
para o catálogo de tasks. Os overheads querem controle sobre o que a nota tem.

## Decision

1. A nota passa a ser **tabela HTML**. ~~No lugar do formato atual, para todos~~ **Revisto (ADR-0024):** a tabela é
   um **módulo novo**, ao lado do Case Notes atual, que continua vivo e intocado.
2. O padrão vira **dado da Central**: o módulo `note_blocks` (o corpo das tabelas: seções e linhas) e
   o módulo `note_layouts` (os segmentos: quais blocos, em que ordem, com que título e sugestão).
   Passam pela fila de aprovação, com versão e rollback, como o resto do catálogo (ADR-0012 e
   ADR-0013).
3. A **estrutura** (tipos de seção e de linha, grade, HTML) fica no **código**, e o servidor valida o
   que a Central publica. O overhead controla *o quê*, não *como se desenha*.
4. O segmento é o **Sales Program**, **escolhido pelo agente**; as Configurações guardam o segmento em
   que o Case Notes abre. Não há coluna nova na People.
5. Toda linha obrigatória fecha com valor ou **`NA` explícito**; Copiar e Inserir ficam bloqueados
   enquanto houver pendência.
6. Os campos do formato anterior (On Call, GTM/GA4, Tag Support, evidências de contato, Caso da
   Europa) continuam, numa tabela **Additional Details** no fim da nota, cada linha com a própria
   condição.

O contrato completo (linhas, regras, HTML) está em `specs/workflow/case-note-table.md`.

## Alternatives considered

- **HTML livre editado na Central**: rejeitado. Não dá para validar, e um bundle antigo quebra diante
  de marcação que não conhece (learning de 2026-10-23).
- **Tudo em código**: rejeitado. É o ADR-0012 de novo: o padrão muda e quem o conhece não faz deploy.
- **Um módulo só**: rejeitado. Três blocos se repetem entre SBS-E e MMS; separar o corpo
  (compartilhado) da colocação (por segmento) faz uma correção valer nos dois.
- **Segmento por coluna na People**: rejeitado. A `Segment` dela é idioma (`pt|es|en`); o segmento do
  cliente é o Sales Program do caso, que o agente escolhe.
- **Campos antigos como linhas dentro da última tabela do padrão**: rejeitado por ora. A grade varia
  (3 a 6 colunas) e uma tabela do padrão alterada quebra quem a lê por script; a tabela própria é
  aditiva. Trocar é mudança no renderizador, não na regra.
- **Tradução posicional dos rótulos**: rejeitado. A linha se identifica por `id` estável e imutável
  (ADR-0012, regra 2).

## Consequences

### Positive
- O padrão muda sem deploy, por quem o conhece, com histórico e rollback.
- `NA` deixa de ser silencioso e nota incompleta não sai.
- A lacuna de tradução fica visível na Central (`PT 0/16`).

### Negative / Tradeoffs
- Mais digitação: o ALL TASKS completo tem até 35 linhas, contra uns 10 campos hoje. O
  auto-preenchimento e o "marcar o restante como NA" reduzem, mas não eliminam.
- Cerca de 100 traduções (51 rótulos × PT e ES) a revisar por falante nativo.
- O catálogo embutido (fallback) precisa espelhar a semente: o mesmo custo que tasks e links já pagam.
- O renderizador existe no app (módulo ES) e na Central (HTML do Apps Script): um teste precisa
  provar que as duas saídas são idênticas.
- O estilo do CW na tabela **não foi provado no CRM real** (`colgroup`, `border-radius`, `overflow`):
  validar colando o protótipo antes do release.

### Neutral
- Sub-status `PI - …`, o mapa Sales Program → segmento e o alinhamento de `SUBSTATUS_TEMPLATES` ao
  arquivo Status oficial ficam para depois.

## Notes

- Spec: `specs/workflow/case-note-table.md`. Alvo visual: `docs/media/case-notes-table/`.
  Plano de execução: `PLAN.md`.
- Aprendizados que valem aqui: `docs/LEARNINGS.md` ("Dado que um bundle antigo não sabe desenhar",
  "Semear não é sincronizar", "Texto tem dono").
