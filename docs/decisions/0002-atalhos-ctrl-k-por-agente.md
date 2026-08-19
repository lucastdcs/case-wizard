# 0002 — Atalhos do Ctrl+K por agente e preferências de usuário na nuvem

**Date**: 2026-08-19
**Status**: Accepted

## Context

O Ctrl+K (`command-palette.js`) lista os 9 módulos e, desde a Fase de Quick
Launch, dois **atalhos de nota**: combinações status + substatus + cenário que
abrem o Case Notes já preenchido. Esses dois atalhos são iguais para todo mundo
e nascem de um campo `quickLaunch` embutido em dois cenários de
`notes-data.js` — o agente não escolhe quais são os seus.

Três restrições moldaram a decisão:

1. **O `quickLaunch` embutido não sobrevive à Central de Conteúdo.**
   `applyNoteTemplateContent()` (note-templates-service.js) apaga
   `scenarioSnippets` inteiro e o repovoa com os modelos publicados, cujos ids
   são derivados (`cw-<substatus>-<slug>`) e cujo payload só carrega
   `type`, `substatus` e os campos de texto. No instante em que o módulo
   `note_template` for publicado, os dois atalhos de hoje **desaparecem do
   Ctrl+K sem erro nenhum** — a busca `filter(([, d]) => d.quickLaunch)`
   simplesmente devolve zero. Ou seja: o mecanismo atual já estava condenado,
   independentemente desta feature.

2. **Preferência de agente não podia morar só no navegador.** O produto é um
   bookmarklet injetado no CRM: o agente troca de máquina e de perfil do Chrome
   com frequência. `localStorage` sozinho perde a configuração exatamente quando
   ela mais custa (primeiro dia numa máquina nova). Já existia o precedente certo
   — a Biblioteca Pessoal (`snippet-service.js`), com leitura cache-first e
   escrita otimista contra o Apps Script.

3. **O transporte é JSONP (GET).** Tudo que for salvo viaja na query string, o
   que impõe um teto prático de tamanho ao que pode ser guardado.

## Decision

Os atalhos do Ctrl+K passam a ser **dados do agente**, não do catálogo de
cenários: vivem numa entidade própria (`shortcut-service.js`), referenciam os
cenários por id **com resolução tolerante**, e são persistidos numa aba nova
`User_Prefs` — uma linha por agente, um blob JSON de preferências — através de
um serviço genérico (`user-prefs-service.js`) e de duas ops novas do Apps
Script (`get_user_prefs` / `save_user_prefs`).

O campo `quickLaunch` de `notes-data.js` é removido; os dois atalhos que ele
definia viram a **semeadura padrão** de quem ainda não configurou nenhum — agora
editáveis e apagáveis como qualquer outro.

## Alternatives considered

- **Manter o `quickLaunch` e só torná-lo editável**: rejeitado porque a
  estrutura morre junto com a publicação dos modelos de nota (restrição 1) e
  porque um preset *é uma propriedade do cenário* nesse desenho — o que impede
  dois atalhos sobre o mesmo cenário, e impede um atalho **sem** cenário
  (abrir só no status/substatus certo), que é um dos casos pedidos.
- **Guardar os atalhos na aba `Database_Snippets` com `type: 'quicklaunch'`**:
  seria zero mudança de backend (as ops já existem, com checagem de dono), mas
  mistura duas entidades sem relação numa aba só, e qualquer tela que leia
  snippets sem filtrar por `type` passaria a mostrar atalhos como se fossem
  respostas salvas. A aba própria custou ~60 linhas de Apps Script e deixa a
  porta aberta para som, idioma e ordem da pílula migrarem para o mesmo lugar.
- **Guardar o texto da nota dentro do atalho** (em vez de referenciar o
  cenário): tornaria o atalho imune a mudanças de id, mas congelaria o conteúdo
  — o agente deixaria de receber as correções publicadas na Central, que é
  justamente o que aquela máquina existe para entregar. Referenciar e resolver
  na hora mantém o atalho vivo.

## Consequences

### Positive
- Os atalhos deixam de depender do formato interno do catálogo de cenários e
  passam a sobreviver à publicação dos modelos na Central.
- Um atalho pode combinar **vários** cenários ou nenhum, e dois atalhos podem
  apontar para o mesmo cenário com nomes diferentes.
- Existe, pela primeira vez, um lugar canônico para preferência de agente
  (`User_Prefs`), reaproveitável por som/idioma/ordem sem novo backend.
- O atalho é criado capturando a tela do Case Notes que o agente já montou, sem
  reimplementar o cascade status → substatus → cenários numa segunda tela.

### Negative / Tradeoffs
- O blob de preferências trafega por JSONP (GET). Por isso o atalho guarda
  **referências** (ids, rótulo, alias), nunca o texto dos campos: com 8 atalhos
  o blob fica na casa de 1 KB, longe do limite prático de URL.
- Um atalho pode ficar órfão se o cenário que ele referencia for removido da
  Central. Mitigado com resolução tolerante (id exato → slug dentro do mesmo
  substatus) e, quando nem assim resolve, o atalho aparece **marcado como
  quebrado** em Configurações em vez de sumir ou falhar em silêncio.
- Mais uma aba na planilha para manter e fazer backup.

### Neutral
- A contagem de uso (usada para ordenar por frequência) fica **só no
  navegador**: é um sinal de conveniência, não um dado do agente, e sincronizá-la
  significaria uma escrita na nuvem a cada Ctrl+K.

## Notes

- Substitui o mecanismo introduzido em `feat(notes): quick-launch note presets
  via Ctrl+K`.
- Contrato das ops novas: `specs/data-models/api-payloads.md`.
  Esquema da aba: `specs/data-models/db-schema.md`.
