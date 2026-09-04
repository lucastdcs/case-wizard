# 🔄 API PAYLOADS (Contrato Front-Back)

## Regra de Ouro (Payload Mismatch)
O front-end DEVE enviar as chaves com a nomenclatura exata listada no `db-schema.md`. Não envie `site` se o backend espera `website`. Não envie `detalhes` se o backend espera `description`.

## Construção do Payload (Criação)
O objeto `fullPayload` deve conter:
- `requestType`: "BAU" ou "DISCARD"
- As chaves mapeadas no `db-schema.md`.
- Campos irrelevantes no fluxo de Descarte (ex: `availability`, `taskType`) devem ser forçados para `""` (string vazia).

## Preferências do agente (`get_user_prefs` / `save_user_prefs`)

Contrato das duas ops que servem as preferências por pessoa (hoje: os atalhos do
Ctrl+K). Esquema da aba em `db-schema.md`.

| Op | Params | Resposta |
| :--- | :--- | :--- |
| `get_user_prefs` | `user` (e-mail, obrigatório) | `{ status: 'success', prefs: {...} }` — `{}` para quem nunca salvou nada |
| `save_user_prefs` | `user`, `prefs` (JSON **serializado**) | `{ status: 'success', action: 'create' \| 'update' }` |

### Regras
- `prefs` viaja como **string JSON**, não como objeto: o transporte é JSONP
  (GET), tudo vira query string.
- **Substituição total, não merge.** O cliente sempre manda o estado completo; o
  backend troca a linha inteira da pessoa. Não existe atualização parcial de
  chave.
- **Falha de rede devolve `null`, não `{}`.** `DataService.getUserPrefs()`
  distingue "esta pessoa não tem preferência" de "não deu pra perguntar" — sem
  isso, uma queda de rede zeraria o cache local do agente.
- Sem `user`, ambas as ops falham. Sem e-mail capturado, o cliente opera só com
  o cache local e avisa que salvou apenas no navegador.

## Construção do Payload (Edição)
- **Bloqueio de Data Wiping:** Ao editar, o `bau-form.js` **NÃO DEVE** injetar fallbacks de string vazia (`|| ""`) para campos que o usuário não interagiu ou que não existem na tela atual.
- Se o campo não foi modificado ou não faz parte do fluxo, não o envie no payload ou envie estritamente como `undefined`. Isso permite que o Back-end saiba que deve manter o dado original da planilha.

## Diretório de pessoas (módulo `people` da Central)

Estas ops **não existem no roteador JSONP** e não devem ser adicionadas a ele:
são chamadas por `google.script.run` a partir do `ContentDashboard.html`, onde a
identidade é `Session.getActiveUser()`. Esquema da aba em `db-schema.md`;
o porquê em `docs/decisions/0006-aba-people-editavel-na-central.md`.

| Função | Params | Quem pode | Resposta |
| :--- | :--- | :--- | :--- |
| `listPeople()` | — | ADMIN, TL | Lista de pessoas com `isOverhead`/`defaultLanguage` derivados e a proposta pendente de cada uma (`pending`), mais as admissões propostas ainda fora da aba (`isIncoming: true`) |
| `savePeopleChange(p)` | `{ ldap, role, roleCategory, segment }` | ADMIN, TL | `{ applied, isNew, ldap, draftId? }` — `applied: true` só para quem tem `selfApprove` (ADMIN) |
| `requestPeopleRemoval(ldap, reason)` | LDAP + motivo **obrigatório** | ADMIN, TL | `{ applied, ldap }` |
| `approveContentDraft(draftId, note)` | — | **só ADMIN**, quando o módulo é `people` | `{ action, outcome, ldap }` — `outcome`: `created` \| `updated` \| `removed` |

### Regras
- **Uma chamada, dois desfechos.** `savePeopleChange` aplica na hora para o
  ADMIN e enfileira para o TL. Não existe "salvar" e depois "enviar": trocar o
  segmento de alguém não pode custar três cliques a quem já pode aprovar.
- **`applied` é o que a tela deve comunicar**, não o papel de quem chamou. É ele
  que decide entre "aplicado na planilha" e "enviado para aprovação".
- **A validação roda duas vezes** — na proposta e de novo na aprovação. Uma
  proposta espera na fila, e a aba pode ter mudado nesse meio-tempo.
- **`people` nunca é servido por `handleContentPublicRead`** (está em
  `CONTENT_PRIVATE_MODULES`), nem mesmo se um dia tiver linha em `Content_Items`.

---

## Auditoria e atividade (aba `Content_Log`)

Também por `google.script.run`, nunca pelo roteador JSONP. Esquema da aba,
retenção e regras de filtro em `db-schema.md`.

| Função | Params | Quem pode | Resposta |
| :--- | :--- | :--- | :--- |
| `listContentActivity(limite)` | `limite` opcional (padrão 20, teto 60) | qualquer papel ativo | Lista, **da mais recente para a mais antiga**, de `{ id, at, actor, action, module, key, itemId, label, detail }` |
| `backfillContentLog(aplicar)` | `aplicar === true` escreve; qualquer outra coisa simula | **só quem tem `manageAccess`** | `{ lidas, candidatas, jaImportadas, novas, aplicado }` |

### Regras
- **O filtro de visibilidade é do servidor.** `listContentActivity` já remove o
  que quem pergunta não pode ver — `access_change` para quem não gerencia
  acesso, e o módulo `people` para quem não propõe nele. A tela não tem lista de
  exceções para aplicar: se a linha chegou, é porque pode ser mostrada.
  Filtrar no cliente deixaria o dado viajar até o navegador de quem não devia.
- **A janela é limitada às últimas 200 linhas da aba.** A barra responde "o que
  aconteceu agora", e o custo dela não pode crescer com o histórico. Quem não
  pode ver nada do que caiu nessa janela recebe lista vazia — é o comportamento
  certo para "recente", e o motivo de a janela ser bem maior que o teto.
- **`at` é sempre ISO 8601 em texto**, mesmo para as linhas trazidas da aba
  `Logs`, onde a data era um `Date` da planilha.
- **`backfillContentLog` simula por padrão e nunca apaga a origem.** É
  idempotente pelo `Log_ID` derivado da linha de origem, e reordena a aba pela
  data depois de escrever — as linhas trazidas são as mais antigas e entram no
  fim.
