# Business Rules

Este arquivo estava vazio (só o título). As regras de negócio do projeto hoje vivem em [`specs/`](../specs/_MASTER_RULEBOOK.md), que é a fonte da verdade ativa e mantida em sincronia com o código:

* [`specs/_MASTER_RULEBOOK.md`](../specs/_MASTER_RULEBOOK.md) — filosofia do projeto, stack permitida, padrões de nomenclatura.
* [`specs/workflow/bau-lifecycle.md`](../specs/workflow/bau-lifecycle.md) — ciclo de vida e regras de status do fluxo BAU.
* [`specs/workflow/scraping-rules.md`](../specs/workflow/scraping-rules.md) — regras de extração de dados do CRM.
* [`specs/data-models/db-schema.md`](../specs/data-models/db-schema.md) e [`api-payloads.md`](../specs/data-models/api-payloads.md) — contrato de dados entre front-end e backend.
* [`specs/ui-ux/design-system.md`](../specs/ui-ux/design-system.md) e [`dom-standards.md`](../specs/ui-ux/dom-standards.md) — regras visuais e de interação obrigatórias.

Se este arquivo voltar a ser necessário como um resumo de negócio separado (não técnico), vale escrevê-lo a partir do conteúdo de `specs/` em vez de do zero, para não divergir.
