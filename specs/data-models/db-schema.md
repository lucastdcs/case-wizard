# 🗄️ DB SCHEMA (Google Sheets)

## Planilha Alvo
- **Nome/Constante:** `SHEET_BAU_FORM`
- **Total de Colunas:** 18 colunas. A função do Apps Script deve garantir o preenchimento/atualização exata deste índice (0 a 17).

## Mapeamento de Índices (Array Google Sheets)
| Índice | Nome da Coluna (Header) | Chave do Payload Esperada | Notas |
| :--- | :--- | :--- | :--- |
| `0` | ID_Escalacao | `id` (Gerado no Backend) | Prefixo `bau_ + timestamp` |
| `1` | Data_Envio | `date` | ISO String (`new Date().toISOString()`) |
| `2` | Agente_Email | `user` / `userEmail` | Capturado via `getAgentEmail()` |
| `3` | Status | `status` | Ver `bau-lifecycle.md` para constantes permitidas |
| `4` | Case_ID | `caseId` | |
| `5` | CID | `cid` | |
| `6` | Speakeasy_ID | `seId` | |
| `7` | Adv_Nome | `advName` | |
| `8` | Adv_Email | `advEmail` | Prioriza input editado, fallback pro scraping |
| `9` | Adv_Site | `website` | **CRÍTICO:** Unificar chave (não usar `site`) |
| `10` | Fuso_Horario | `timezone` | |
| `11` | Idioma | `language` | Deve vir de `profile.defaultLanguage` |
| `12` | AM_Nome | `amName` | |
| `13` | Sales_Program | `salesProgram` | |
| `14` | Motivo_Abertura | `reason` | Campo principal de categorização |
| `15` | Task_BAU | `taskType` | Pode ser lista separada por vírgula |
| `16` | Justificativa/Descrição | `description` ou `nonImplementationReason` | O Back-end deve mesclar estes dois campos se ambos existirem. |
| `17` | Disponibilidade_Adv | `availability` | Formatado com pipe (`\|`) |

## Regra de Atualização (Update)
- NUNCA reescrever dados de uma coluna com `""` se o valor recebido for `undefined`. 
- No Apps Script, a validação deve ser sempre: `p.chave !== undefined ? p.chave : valorAntigoDaPlanilha`.

---

# Aba `User_Prefs` (Preferências do Agente)

- **Nome/Constante:** `SHEET_USER_PREFS` (`"User_Prefs"`)
- **Cardinalidade:** **uma linha por agente**. Diferente de `Database_Snippets`,
  que é uma lista de itens, aqui o registro inteiro é substituído a cada
  escrita — o cliente sempre envia o estado completo das preferências dele.

| Índice | Nome da Coluna (Header) | Chave do Payload | Notas |
| :--- | :--- | :--- | :--- |
| `0` | User_Email | `user` | Chave da linha. Sempre gravado em minúsculas e sem espaços — `ANA@ ` e `ana@` são a mesma pessoa. |
| `1` | Prefs_JSON | `prefs` | Blob JSON do objeto de preferências (ver abaixo). |
| `2` | LastUpdated | (gerado no backend) | ISO String |

## Formato do blob `Prefs_JSON`

```json
{
  "shortcuts": [
    {
      "id": "sc_abc123",
      "kind": "note",
      "label": "Fim do 2 Day Rule",
      "alias": "2day",
      "order": 0,
      "payload": {
        "caseType": "bau",
        "status": "IN",
        "subStatus": "IN_Not_Reachable",
        "scenarios": [{ "id": "quickfill-in-no-show-bau", "substatus": "IN_Not_Reachable" }]
      }
    }
  ],
  "shortcutsSortByUsage": true
}
```

### Regras do blob
- **Só referências, nunca texto de nota.** O atalho guarda o **id** do cenário;
  o texto vem do catálogo na hora de aplicar. Isso mantém o blob pequeno (o
  transporte é JSONP/GET) e faz o atalho herdar as correções publicadas na
  Central de Conteúdo.
- **Teto de 8000 bytes** (`USER_PREFS_MAX_BYTES`), recusado na escrita. Com o
  teto de 8 atalhos o blob real fica na casa de 1 KB.
- **Validação é na escrita, não na leitura.** `save_user_prefs` recusa JSON
  inválido, array ou primitivo. Uma linha corrompida na leitura devolve `{}` e
  registra no `Logger` — o agente nunca fica trancado fora das preferências.
- **`kind` existe para crescer**: hoje só `"note"`. Um atalho de e-mail ou de
  link entra como outro `kind` sem migrar o dado de ninguém.
- A **contagem de uso** dos atalhos NÃO vive aqui: é local
  (`cw_shortcut_usage_v1` no `localStorage`), porque sincronizá-la significaria
  uma escrita na nuvem a cada Ctrl+K.

Ver `docs/decisions/0002-atalhos-ctrl-k-por-agente.md`.

---

# Aba `People` (Diretório de autorização)

- **Nome/Constante:** `SHEET_PEOPLE` (`"People"`)
- **Cardinalidade:** **uma linha por pessoa**, chaveada pelo LDAP.
- **Papel no sistema:** é a fonte de autorização, não um cadastro informativo.
  `getUserProfileByLdap()` a lê para derivar **quem abre o TL Dashboard** e **em
  que idioma o app abre**. Tratar como conteúdo comum é o erro a evitar.

| Índice | Nome da Coluna (Header) | Chave do Payload | Notas |
| :--- | :--- | :--- | :--- |
| `0` | LDAP | `ldap` | Chave da linha. Só o usuário, sem `@`, minúsculo, sem espaço — validado por `PEOPLE_LDAP_RE`. |
| `1` | Role | `role` | Cargo exibido (texto livre). Não tem efeito de permissão. |
| `2` | Role_Category | `roleCategory` | **Decide a permissão.** Ver regra de `isOverhead` abaixo. |
| `3` | Segment | `segment` | O "fluxo" da pessoa. **Decide o idioma.** Ver regra abaixo. |

A leitura é **por índice** (`data[i][0..3]`), no `Código.gs` e no `PeopleAPI.gs`.
O cabeçalho existe para quem abre a planilha; não reordene as colunas.

## As duas regras derivadas

Ambas moram no `Código.gs` e são as **únicas** implementações — a tela da Central
mostra o resultado delas antes de salvar, e não pode ter uma segunda cópia:

```js
// Permissão (Overhead) — por lista de EXCLUSÃO
isOverheadRoleCategory(cat) // !(cat contém 'agent' || cat contém 'apprentice')

// Idioma padrão, derivado do segmento
defaultLanguageForSegment(seg) // 'es' → ES · 'en' → EN · qualquer outro → PT-BR
```

> ⚠️ A regra de permissão é **permissiva por construção**: uma categoria nova que
> não contenha "agent" nem "apprentice" (`Intern`, `Contractor`…) ganha acesso de
> liderança sozinha, sem mudança de código. A aba "Pessoas" da Central anuncia
> isso no editor justamente para o erro não passar batido.

## Fallback restritivo

LDAP não encontrado, ou aba ausente, devolve `role: "Unknown"`,
`roleCategory: "Agent"`, `segment: "PT"`, `defaultLanguage: "PT-BR"`,
`isOverhead: false`. **Desconhecido é agente sem privilégio** — é por isso que
dar baixa apagando a linha é seguro.

## Regras de escrita (módulo `people` da Central de Conteúdo)

- **Nenhuma escrita pelo `doGet`/JSONP.** A identidade lá é o parâmetro `user`,
  forjável. Tudo passa por `google.script.run` — ver `api-payloads.md`.
- **Só as quatro colunas do contrato são escritas.** Coluna extra que alguém
  tenha acrescentado na planilha à mão é preservada, pela mesma regra de
  "nunca reescrever o que não veio no payload" do `BAU_form_data`.
- **Nunca zerar a liderança.** Uma alteração que leve a contagem de `isOverhead`
  de ≥1 para 0 é recusada, na proposta **e** de novo na aprovação. Uma aba que
  já estava sem liderança (planilha nova) não é bloqueada — a trava é sobre a
  queda, não sobre a existência.
- **Uma proposta pendente por pessoa.** A segunda é recusada, para que uma
  aprovação não sobrescreva em silêncio a decisão da outra.
- **Baixa apaga a linha.** O histórico fica em `Content_Drafts` (com o motivo) e
  na aba `Content_Log`, não na aba People.

---

# Aba `Content_Log` (Auditoria da Central de Conteúdo)

- **Nome/Constante:** `SHEET_CONTENT_LOG` (`"Content_Log"`)
- **Cardinalidade:** **uma linha por ação**, só anexada — nada aqui é editado
  nem apagado pela aplicação.
- **Papel no sistema:** responde *quem fez o quê, quando* na Central. Alimenta a
  barra "Atividade recente" da tela e, no futuro, a aba de auditoria.

| Índice | Nome da Coluna (Header) | Notas |
| :--- | :--- | :--- |
| `0` | Log_ID | `log_<uuid>`. Linhas trazidas da aba `Logs` usam `log_bf_<linha de origem>` — é o que torna o backfill idempotente. |
| `1` | Timestamp | ISO 8601 em **texto**. Ordem alfabética = ordem cronológica, e é assim que a aba é reordenada. |
| `2` | Actor | LDAP de quem agiu, vindo de `Session.getActiveUser()` — nunca de parâmetro do cliente. |
| `3` | Action | `approve`, `reject`, `rollback`, `publish_direct`, `access_change`, `people_updated`… |
| `4` | Module | Módulo da Central. **Vazio** quando o alvo não é conteúdo (`access_change` aponta para uma pessoa). |
| `5` | Key | Chave do item. Vazio em ações de módulo inteiro (`seed`). |
| `6` | Item_ID | Linha de `Content_Items` que a ação produziu, quando produziu alguma. |
| `7` | Label | Rótulo legível do alvo — o que a barra lateral mostra em negrito. |
| `8` | Detail | Texto de gente: a justificativa da rejeição, a versão publicada, a marca de autoaprovação. |

## Por que módulo e chave têm colunas próprias

O formato anterior era uma linha na aba `Logs` genérica, com `módulo/chave` e um
sufixo `" (autoaprovação ADMIN)"` concatenados num campo `Label` só. Dava para
**ler**, não para **filtrar** — e a barra lateral precisa saber de que módulo é
cada linha para esconder de um QA o que ele não vê na aba Pessoas. Com tudo em
texto livre, a alternativa seria adivinhar por prefixo, e adivinhar errado ali
vaza o diretório de autorização.

O sufixo de autoaprovação, pela mesma razão, virou **detalhe**: colado na chave,
ele fazia a mesma chave contar como duas.

## Quem lê, e com que filtro

`listContentActivity(limite)` devolve as ações mais recentes **já filtradas pelo
papel de quem pergunta** — o filtro é do servidor, para que a linha proibida nem
viaje até o navegador:

- ações sobre pessoas (`access_change`) só para quem gerencia acesso;
- linhas do módulo `people` só para quem propõe nesse módulo
  (`CONTENT_RESTRICTED_READ_MODULES`).

A varredura é limitada às **últimas 200 linhas** da aba: a barra responde "o que
aconteceu agora", e o custo dela não pode crescer com o histórico.

## Retenção e backfill

- Retenção de **24 meses**, com arquivamento por limiar de linhas — ver
  `docs/decisions/0008-cache-e-retencao-do-conteudo.md`.
- `backfillContentLog()` traz o histórico que ficou na aba `Logs`
  (`Category = 'ContentCentral'`). **Simula por padrão**; só `backfillContentLog(true)`
  escreve. **Copia, não move**: a aba `Logs` fica intacta. Depois de escrever,
  reordena a aba pela data — as linhas trazidas são as mais antigas e entram no
  fim, e sem reordenar a barra lateral mostraria 2024 como "agora".
- Só quem tem `manageAccess` roda o backfill.
