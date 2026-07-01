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