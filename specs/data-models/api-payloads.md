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

---

## Papéis da Central (aba `Content_Roles`)

Por `google.script.run`. Esquema da aba e as quatro regras em `db-schema.md`;
o porquê em `docs/decisions/0009-rbac-editavel-da-central.md`.

| Função | Params | Quem pode | Resposta |
| :--- | :--- | :--- | :--- |
| `listContentRoleNames()` | — | `manageAccess` | `["ADMIN", "QA", …]` — só os nomes, para o seletor da aba Acessos |
| `listContentRoles()` | — | `manageRoles` | `{ roles: [{ role, permissions, people, escalation }], modules, moduleActions, globalPerms, actionsByModule, approvalRequiresGlobal, fallback }` |
| `previewContentSession(role)` | — | `manageRoles` | A mesma forma de `getContentSession()`, mais `preview: true`, `realRole` e `beyond` |
| `saveContentRole(role, permissions, options)` | `options`: `{ active?, confirmEscalation?, confirmSelf? }` | `manageRoles` | `{ status: 'success', role, changes, reloadSession }` **ou** `{ status: 'confirm', reason, message, changes, modules? }` |

### Regras
- **`confirm` não é erro.** É o servidor pedindo uma declaração e **não tendo
  escrito nada**. Dois motivos: `escalation` (a alteração introduz publicar sem
  revisão) e `self` (o papel alterado é o de quem está alterando, e passa a
  valer no ato). Reenviar com o `confirm*` correspondente grava.
- **`changes` é o diff, não o estado final.** "Agora tem 14 permissões" não é
  uma frase sobre a qual alguém decida; `links.approve: não → sim` é. É o
  mesmo texto que vai para a auditoria.
- **`reloadSession: true`** significa que quem salvou mexeu no próprio papel: a
  tela precisa refazer `getContentSession()`, porque o que ela tem em memória
  já não vale.
- **`fallback: true`** em `listContentRoles()` significa que a aba não pôde ser
  lida e a matriz mostrada é o preset do código. A tela precisa dizer isso —
  editar em cima de um fallback é editar no escuro.
- **A prévia nunca concede.** `previewContentSession()` devolve a matriz do
  papel escolhido **intersectada com a de quem pergunta**. Prévia que amplia é
  escalação com outro nome: o servidor continua julgando pela identidade real,
  então uma tela otimista ofereceria botões que falham — ou, pior, botões que
  funcionam enquanto a pessoa acredita estar "só olhando". `beyond` lista o que
  o papel tem e quem pergunta não, para a tela poder dizer o que não mostrou;
  prévia calada sobre a própria omissão faz concluir que o papel não pode algo
  que ele pode.
- **A prévia é de leitura, e isso é decisão da tela.** O servidor não tem como
  saber que um clique veio "de dentro de uma prévia" — a identidade é a mesma.
  Por isso a Central esconde toda ação de escrita enquanto a faixa está na tela.
- **Conceder acesso não exige editar papéis.** `listContentRoleNames()` existe
  separado por isso: preencher um `<select>` não pode obrigar a dar a permissão
  maior para fazer a tarefa menor.
- **`actionsByModule` manda na tela.** A matriz desenha as casas a partir dele,
  em vez de repetir a regra de regime (catálogo tem `propose`/`approve`,
  operação tem `publish`).

### O que `getContentSession()` passou a devolver

Além do que já devolvia (`ldap`, `role`, `hasAccess`, `canApprove`,
`canManageAccess`, `canSelfApprove`, `proposableModules`, `modules`, `langs`):

| Campo | Significa |
| :--- | :--- |
| `canManageRoles` | abre a aba de papéis |
| `canViewAudit` | vê a auditoria completa, e as linhas de mudança de acesso na barra de atividade |
| `readableModules` | módulos com `view` — o que a pessoa consegue abrir |
| `permissions` | a matriz inteira do papel, para a tela explicar **por que** um botão não está lá |
| `moduleActions` / `globalPerms` | os eixos da matriz |

`canApprove` continua existindo e agora significa **"aprova alguma coisa"** — a
fila filtra item a item com `canReview`.

---

## Janela de exibição de um aviso (`broadcast`)

O valor de um aviso aceita duas pontas opcionais, no mesmo JSON do tipo, título
e texto:

```json
{ "type": "info", "title": "…", "text": "…",
  "startsAt": "2026-09-08T08:00", "endsAt": "2026-09-08T18:00" }
```

| Campo | Formato | Ausente significa |
| :--- | :--- | :--- |
| `startsAt` | `AAAA-MM-DDTHH:MM` | já vale |
| `endsAt` | `AAAA-MM-DDTHH:MM` | não expira |

### Regras
- **Um relógio só, e ele é o da planilha** (`America/Sao_Paulo`). A janela é
  avaliada no servidor, nunca no navegador de quem lê: a operação atende PT e
  ES em fusos diferentes, e se cada navegador decidisse, *"vai ao ar às 8h"*
  seria um horário diferente para cada agente — e quem publicou não teria como
  saber qual. A tela declara o fuso em vez de escondê-lo.
- **A comparação é de TEXTO**, não de `Date`. As duas pontas estão em
  `AAAA-MM-DDTHH:MM`, onde a ordem alfabética é a cronológica. Isso evita
  `new Date('2026-09-05T08:00')`, cujo fuso de interpretação muda conforme o
  ambiente.
- **O filtro roda DEPOIS do cache**, em `readPublicModuleItems_()`. Dentro do
  cache, um aviso agendado para as 10h ficaria de fora da entrada gravada às
  9h58 e só apareceria quando o TTL expirasse — a janela passaria a ter a
  precisão do cache em vez da sua própria. O cache guarda *o que está
  publicado*; a janela decide *o que vale agora*.
- **A Central não filtra.** `listContentItems('broadcast')` devolve tudo que
  está publicado, e a tela marca cada linha com o estado (`agendado para…`,
  `sai em…`, `saiu do ar em…`). Um aviso agendado que não aparecesse na lista
  seria um aviso que ninguém consegue mais editar.
- **Janela invertida é recusada**, na tela e no servidor. Um aviso que nunca
  aparece não é "um aviso que ninguém viu": é um aviso que a pessoa acredita ter
  publicado.
- **Expirar não arquiva.** O item continua `live` na planilha, fora da janela.
  É o que permite estender a validade editando, em vez de republicar.

---

## Auditoria completa (aba restrita)

| Função | Params | Quem pode | Resposta |
| :--- | :--- | :--- | :--- |
| `listContentAudit(filtro)` | `{ text?, actor?, action?, module?, from?, to?, limit?, cursor? }` | `viewAudit` | `{ rows, nextCursor, scanned, done }` |
| `exportContentAudit(filtro)` | o mesmo filtro | `viewAudit` | `{ sheet, rows, truncated, url }` |

### Regras
- **Duas portas para duas perguntas.** `listContentActivity()` responde *"o que
  está acontecendo"* — janela fixa, sem filtro, para a barra lateral.
  `listContentAudit()` responde *"o que aconteceu"* — filtro, período e
  paginação. Fundir as duas faria a barra pagar o preço da auditoria.
- **`cursor` é o número da LINHA da planilha** onde a varredura parou, não um
  "pule N resultados". É o que mantém o custo de cada página igual: pular
  resultados obrigaria a refiltrar tudo que já foi mostrado.
- **A ordem por linha É a ordem cronológica**, e isso não é sorte: `Content_Log`
  só é anexada, e o backfill reordena o que traz. Ordenar 15 mil linhas por
  consulta para chegar ao mesmo resultado seria pagar duas vezes.
- **`done` é sobre a ABA ter acabado, não sobre a página ter enchido.** Cada
  chamada varre no máximo `CONTENT_AUDIT_SCAN_MAX` linhas (o Apps Script tem 6
  minutos e a aba guarda 24 meses); uma página curta por causa do teto ainda tem
  continuação, e esconder "carregar mais" ali faria parecer que acabou.
- **`to` inclui o dia inteiro.** O carimbo é ISO e o filtro é data: sem o
  cuidado com o fim do dia, uma linha das 10h do dia final ficaria de fora do
  próprio dia pedido.
- **A exportação vai para uma ABA da própria planilha**, não para um arquivo. A
  Central roda dentro de um iframe do Apps Script, onde download iniciado pela
  página é bloqueado com frequência e sem aviso; uma aba é o formato que esta
  operação já sabe abrir, filtrar e baixar, e não pede permissão nenhuma nova.
- **A exportação sobrescreve sempre a mesma aba** (`Content_Audit_Export`), e
  limpa antes de escrever. Uma aba por exportação encheria a planilha de lixo;
  não limpar faria uma exportação menor herdar as linhas da anterior — dois
  filtros misturados, que é o pior desfecho possível para uma auditoria.
- **Exportar é auditado.** A própria exportação vira uma linha em `Content_Log`.

---

## Cobrança de pendência parada (gatilho de tempo)

| Função | Params | Quem pode | Resposta |
| :--- | :--- | :--- | :--- |
| `notifyStaleContentApprovals()` | — (para caber num gatilho) | o gatilho | `{ status, stale, notified }` |
| `listStaleContentApprovals()` | — | `approve` em algum módulo | `{ days, stale, recipients: [{ ldap, items }] }` |

### Regras
- **Um e-mail por aprovador, com o que ELE pode resolver.** Mandar a fila
  inteira para todo mundo é como a cobrança vira ruído: um QA que recebe
  pendência de e-mail que ele não revisa aprende a apagar o e-mail sem ler.
- **Quem propôs não é cobrado pela própria proposta**, a menos que possa
  aprovar a si mesmo. Lembrete de algo que a pessoa não consegue resolver é
  só barulho.
- **O link vem do MAPA de implantações** (`buildProductionPageUrl`), nunca de
  `ScriptApp.getService().getUrl()`. Num gatilho de tempo o serviço pode
  devolver a URL de outra implantação do projeto, e a pessoa cairia no ambiente
  errado. Um gatilho é do **projeto**, não da implantação: ele roda uma vez, e o
  destino certo é sempre produção.
- **Nunca lança.** Um gatilho que estoura some do radar exatamente como a
  pendência que ele existe para lembrar; o que der errado vira linha em
  `Content_Log` (`stale_digest_failed`).
- **Dias corridos, não úteis.** Contar dias úteis exigiria um calendário de
  feriados que o projeto não tem, e errar para MAIS avisos é o lado barato do
  erro.
- **O gatilho é criado à mão**, uma vez, pelo editor do Apps Script — mesma nota
  que o `Backup.js` já carrega. Antes de ligar, `listStaleContentApprovals()`
  mostra quem seria cobrado e por quantos itens.
