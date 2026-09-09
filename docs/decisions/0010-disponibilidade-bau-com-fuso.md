# 0010 — Disponibilidade do BAU gravada com deslocamento de fuso

**Date**: 2026-09-08
**Status**: Accepted

## Context

A disponibilidade do anunciante (índice 17 do `BAU_form_data`) é gravada hoje
como a string crua de um `<input type="datetime-local">`:

```
2026-09-10T14:30 | 2026-09-11T09:00
```

**Essa string não carrega fuso nenhum.** O disclaimer do passo 3 manda o agente
digitar o horário **local do cliente**, mas nada no dado registra qual fuso é
esse. O TL Dashboard então faz `new Date(raw)` — que interpreta uma string sem
fuso como horário local do navegador de quem está lendo — e formata em
`America/Sao_Paulo`:

```js
// gas-backend/TLDashboard.html, formatAvailability()
const d = new Date(raw);
new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', ... }).format(d)
```

O número sobrevive por acidente: como o TL também está em BRT, a ida e volta é a
identidade e a tela mostra exatamente o que foi digitado. Mas ninguém — nem o
TL, nem o BAU que pega o caso depois, nem o e-mail — sabe se "14:30" é 14:30 em
Nova York, em Lisboa ou em São Paulo. É esta a causa real do "o timezone vai
errado" que os TLs relataram: o campo `Timezone` da planilha é do anunciante, e
o horário do agendamento nunca esteve amarrado a ele.

Dois fatos técnicos delimitam a solução:

1. **`<input type="datetime-local">` não tem como exibir 24h por vontade da
   página.** O formato vem do locale do navegador/SO. Um Chrome em `en-US`
   mostra AM/PM e não há atributo HTML ou CSS que mude isso. `type="time"` tem o
   mesmo problema. Ou seja, o pedido de "24h para evitar erro" **exige trocar o
   controle nativo**, não configurá-lo.
2. **O fuso precisa ser escolhido junto com o horário**, não corrigido depois na
   prévia: corrigir o rótulo do fuso depois não move o horário que já foi
   digitado sob outra premissa.

## Decision

Gravar cada janela de disponibilidade como **ISO 8601 com deslocamento
resolvido**, mantendo o separador de pipe entre as opções:

```
2026-09-10T14:30-04:00 | 2026-09-11T09:00-04:00
```

O horário continua sendo o **local do cliente** — o que muda é que agora ele diz
qual fuso é esse. O deslocamento é calculado no cliente, para a data escolhida,
a partir da zona IANA selecionada (então horário de verão entra na conta pela
data do agendamento, não pela data de hoje).

O controle passa a ser **data + hora em `<select>` de 24h + fuso**, com o fuso
pré-selecionado a partir do `Customer time zone` já raspado do CRM.

## Alternatives considered

- **Forçar 24h no `datetime-local`**: não existe. Ver Context.
- **Gravar o fuso em coluna à parte, mantendo o horário ingênuo**: o dado só
  fica correto se as duas colunas forem lidas juntas, sempre, por todo consumidor
  (dashboard, e-mail, edição, qualquer relatório futuro). É um convite a que
  alguém leia só uma. E não resolve o `new Date()` do dashboard, que continuaria
  errado por padrão.
- **Gravar texto legível (`"14:30 (America/New_York)"`)**: quebra o `new Date()`
  de todo consumidor e transforma um dado em prosa, que passa a exigir parser.
- **Gravar em UTC**: correto e sem ambiguidade, mas perde a informação de qual
  era o horário local do cliente — que é exatamente o que o BAU precisa ler para
  ligar para ele. Reconstruir exigiria a coluna de fuso, caindo na alternativa
  anterior.
- **Só acrescentar os fusos dos EUA ao módulo Time Zone**: atende o pedido ao pé
  da letra e não muda nada no erro que os TLs sentem, porque o horário
  continuaria sem fuso.

## Consequences

### Positive
- O dado passa a ser autossuficiente: `new Date()` devolve o instante certo em
  qualquer consumidor, sem contexto externo.
- O TL pode ver as duas leituras — horário do cliente e o equivalente em BRT —
  porque agora existe informação para converter.
- O `<select>` de 24h elimina a classe de erro que originou o pedido: não há
  AM/PM para trocar, e não há dígito para digitar errado.
- Retrocompatível na **leitura**: `new Date("2026-09-10T14:30")` continua
  funcionando para as linhas antigas. Nada precisa ser migrado.

### Negative / Tradeoffs
- Linhas antigas e novas convivem com semânticas diferentes na mesma coluna. Uma
  sem fuso é lida como horário local de quem lê; uma com fuso é absoluta. Não há
  como distinguir "14:30 sem fuso" de um dado correto — só o tempo resolve isso,
  conforme os casos antigos saem pelo backup.
- O deslocamento é congelado no momento do envio. Se a base de fusos mudar entre
  o envio e o atendimento (mudança de regra de horário de verão num país), o
  agendamento fica com o deslocamento antigo. É o comportamento certo para um
  compromisso já combinado com o cliente, mas vale saber que é uma escolha.
- Perde-se o seletor nativo do sistema operacional, que alguns agentes já
  conhecem. O ganho de não errar AM/PM foi julgado maior.

### Neutral
- A grade de horários do `<select>` (hoje 07:00–21:00, de 30 em 30) é uma
  decisão de produto, não de arquitetura — mudar o passo ou a faixa não mexe no
  formato gravado.

## Notes

- Issue: #394
- Contrato: `specs/data-models/api-payloads.md` e `db-schema.md`, índice 17
- Consumidores a manter em dia: `formatAvailability()` no `TLDashboard.html`,
  `EmailEngine.js`, e a reconstrução dos campos em `handleEditCase()`
