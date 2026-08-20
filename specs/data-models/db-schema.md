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