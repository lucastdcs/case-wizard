<!-- generated-by: groundrules v1.10.0 -->
# 0010 — O AM do BCC vem do case log, não do assignee nem da lista de contatos

**Date**: 2026-09-09
**Status**: Accepted

## Context

Os e-mails enviados pelo assistente vão com BCC para o AM da conta, e o campo
`AM_Name` é gravado na planilha BAU. As duas coisas são o **mesmo endereço** —
mas o código tratava como duas capturas independentes, e nenhuma das duas
funcionava:

- `captureInternalEmail()` lia `material-input[debug-id="account-id-input"]` e
  colava `@google.com` no valor. Esse input é o campo de **busca de cliente**
  do cabeçalho ("Enter an email address", ao lado de "Enter a customer name"),
  não a identidade de ninguém. Podia produzir `cliente@gmail.com@google.com` e
  mandar BCC para um endereço inexistente, sem erro visível.
- `captureAMName()` procurava rótulos "Account Manager", "AM Name" e
  "Sales Rep". **Nenhum dos três existe no DOM** — sempre devolvia `null`, e o
  BAU caía no fallback `amName = internalEmail`, propagando o mesmo defeito.

A tentação óbvia era usar `[debug-id="assignee"]`, que é limpo e estável. Mas
o assignee é o **dono do caso**, e a regra da operação é que o BCC é o **AM**,
que é outra pessoa. Na captura real: assignee `marco.dias@`, AM
`bianca.alves@`.

A outra fonte candidata, `<internal-user-info>`, traz 55 contatos na tela —
todos com o mesmo papel ("Non-Technical Sales / Upsell Agent"). Escolher "o
primeiro" seria gravar o AM errado na planilha com alta frequência.

## Decision

Uma única função (`resolveAM()`, em `src/modules/shared/am-resolver.js`)
resolve o AM a partir do **case log**, e alimenta tanto o campo AM quanto o
BCC. Ela coleta os `@google.com` das mensagens do log e descarta os robôs
(`ads-support@`, `noreply@`) e o assignee; com um candidato, é ele; com vários,
desempata pelo **submitter do Contact Us Form**; sem nenhum, cai no primeiro
`<internal-user-info>`; e se ainda assim não resolver, devolve `null`.

Ordem de esforço: primeiro só o que já está **visível** (sem clique), e apenas
se isso falhar é que expande as mensagens de e-mail do log.

## Alternatives considered

- **Usar `[debug-id="assignee"]`**: rejeitado — é o dono do caso, não o AM.
  Seria trocar um valor errado por outro, com aparência de correção.
- **Primeiro `<internal-user-info>`**: rejeitado como fonte principal — 55
  candidatos indistinguíveis pelo DOM. Mantido só como último fallback.
- **Sempre expandir todas as mensagens do log**: rejeitado — mexe na tela da
  pessoa e soma segundos a toda captura, para um dado que na captura real já
  estava visível sem expandir nada.

## Consequences

### Positive
- BCC e `AM_Name` passam a sair da mesma fonte, sem como divergirem.
- Acaba o risco de BCC para um endereço construído a partir do e-mail do
  cliente.
- A distinção AM ≠ assignee fica registrada num teste
  (`npm run test:scraping`), então uma regressão que iguale os dois falha.

### Negative / Tradeoffs
- A heurística depende de o caso ter e-mail de confirmação ou Contact Us Form
  no log. Casos sem isso caem no fallback fraco ou em `null`.
- `null` significa campo vazio para a pessoa preencher. É proposital: chutar o
  AM errado escreve na planilha e envia e-mail para quem não devia.

### Neutral
- `captureInternalEmail()` deixou de existir; `internalEmail` continua no
  `pageData` (os consumidores não mudaram), agora alimentado por `resolveAM()`.

## Notes

- Evidência na captura real: `.address-list.to` do e-mail de confirmação traz
  `ads-support@google.com` → cliente + `bianca.alves@google.com`; e o mesmo
  endereço aparece como submitter do Contact Us Form. Filtrando robô e
  assignee, sobrou exatamente um candidato.
- Fixtures e gabarito: `specs/fixtures/README.md`.
