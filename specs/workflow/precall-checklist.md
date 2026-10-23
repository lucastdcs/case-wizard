# ✅ PRE-CALL CHECKLIST (bloco da nota e regras do formulário)

Fonte: SOP de pre-call. O formulário (`src/modules/notes/precall/`) gera o bloco
"Pre-call checklist" que entra na case note antes da ligação. Decisão em
`docs/decisions/0018-precall-checklist-no-case-notes.md`.

## O texto da nota é contrato

A conformidade do SOP é medida procurando esse bloco nas case notes, e a razão de
exceções (`Completed: No`) também. Por isso o texto **não segue o idioma da
interface nem o do atendimento**: sai sempre em inglês, exatamente como abaixo.
Mudar um rótulo, a ordem ou um valor muda a métrica sem erro em lugar nenhum.

`npm run test:precall` trava o bloco inteiro; ele só deve mudar junto com este
arquivo.

### Checklist feito

```
Pre-call checklist
Duplicate Case: No
360 Suite: No
sGTM: Yes
API: No
Seller to be CCed: Yes
Task(s) [copy&paste]: Ads Conversion Tracking, GA4 Setup
Contact number: +55 11 90000-0000
Email: cliente@example.com
Website URL: https://www.example.com/
Website CMS: Custom
Ads CID: 123-456-7890
GA4 Measurement ID: None provided
Special instructions: None provided
Next steps: OOS
```

- A primeira linha (título) vai em negrito; o resto é `Rótulo: valor`, uma linha
  por campo, na ordem acima.
- O rótulo `Task(s) [copy&paste]` é literal, com os colchetes.
- Campo de texto vazio sai como `None provided` — nunca em branco nem `N/A`.
- Valor de várias linhas (tasks, instruções especiais) mantém as quebras.
- O texto digitado pelo agente entra como **texto**, escapado: `<` e `&` não
  viram marcação no editor de notas.

### Exceção (sem checklist)

Live Meet, ou caso que chegou com menos de 1h para a ligação, não faz o
checklist e registra o motivo:

```
Pre-call checklist
Completed: No → Live Meet case
```

O motivo é um de `Live Meet case` ou `Case arrived <1h before the call`. Os
demais campos não saem na nota, mesmo que estejam preenchidos.

> **A confirmar com quem audita:** o formato exato da linha de exceção
> (`Completed: No → motivo`) segue o texto do SOP; se a auditoria casar por outro
> texto, é a constante `EXCEPTION_LABEL` e a linha em `buildPrecallLines()`.

## Valores aceitos

| Campo | Valores |
|---|---|
| Duplicate Case, 360 Suite, sGTM, API, Seller to be CCed | `Yes` / `No` |
| Next steps | `Proceed` / `OOS` / `Infeasible` |
| Motivo da exceção | `Live Meet case` / `Case arrived <1h before the call` |
| Demais campos | texto livre |

Os valores gravados são sempre estes, em inglês. A tela os traduz no rótulo da
opção, mas o `value` é o canônico (mesma regra do `_MASTER_RULEBOOK.md` §4).

## O que o formulário exige

- As cinco perguntas Yes/No e o Next steps começam **sem resposta** e precisam de
  uma antes de gerar a nota. "Não respondeu" não é `No`: um checklist que assume
  a resposta não checa nada.
- Texto livre não é obrigatório (vira `None provided`).
- Com `Completed: No`, só o motivo é obrigatório.

## Captura automática

Ao abrir a janela, o formulário lê a tela do caso (mesmas regras de
`scraping-rules.md`) e preenche o que achar:

| Campo | Fonte |
|---|---|
| Task(s) [copy&paste] | `Appointment tasks`, todas, separadas por vírgula e sem repetição. O CRM entrega slugs (`ads_conversion_tracking`): viram o nome do catálogo de tasks (`Ads Conversion Tracking`); slug fora do catálogo vira texto legível (`Ads Conversion Tracking Troubleshooting`); frase da tela traduzida passa como veio |
| Contact number | `Phone number` (PII mascarada: clica no unmask e espera) |
| Email | `Contact email` (só o endereço; texto vizinho é descartado) |
| Website URL | `Website` |
| Ads CID | `Google Ads External Customer ID` |

Regras:

- **Nada capturado sobrescreve o que o agente já digitou.**
- O que foi capturado leva a marca **Auto** (com a dica "Preenchido
  automaticamente"), entra com uma animação curta, e a barra de status diz
  quantos vieram. Editar o campo tira a marca. Com `prefers-reduced-motion` os
  campos aparecem sem animação.
- **Outro caso na tela zera o formulário** (comparado por Case ID + CID), antes de
  a captura lenta terminar. Reabrir no mesmo caso preserva o que foi digitado.
- Copiar e Inserir ficam parados enquanto a captura roda.
- Valor ausente (`null`, vazio, `N/A`) não é dado capturado: o campo fica vazio e
  a nota diz `None provided`. Falha de raspagem nunca trava o formulário.

## Saída

- **Inserir na nota:** copia o bloco, abre o card de nota do CRM e insere (mesmo
  caminho do Case Notes). Se o card não abrir, o texto já está copiado e a tela
  avisa.
- **Copiar:** copia o bloco e confirma no próprio botão.
- Nenhum dado do checklist é gravado na planilha nem no backend.
