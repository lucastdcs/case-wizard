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