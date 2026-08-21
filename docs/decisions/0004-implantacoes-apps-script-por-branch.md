# 0004 — Uma implantação do Apps Script por branch, promovida pelo CI

**Date**: 2026-08-21
**Status**: Accepted

## Context

O backend do Case Wizard é um único projeto Apps Script. `clasp push` atualiza o
**HEAD** desse projeto — o que se vê no editor —, mas as URLs `/exec` e `/dev`
continuam presas à versão que foi **promovida** por último. Promover é um passo
separado, e é ele que muda o que os agentes de fato usam.

Até aqui existia **uma implantação só**, e o CI a republicava a cada push em
`refactor-structure`. Como o frontend inteiro apontava para esse mesmo ID, um push
numa branch de desenvolvimento republicava o backend de produção. Não havia
ambiente de desenvolvimento de verdade: havia produção, e pessoas empurrando código
para dentro dela.

Do lado do frontend, o `RELEASE.md` registrava que a promoção de produção era
manual "de propósito". Na prática esse portão não protegia nada: o frontend já ia
sozinho para o GitHub Pages a cada push na `main`, enquanto o backend esperava
alguém lembrar de promovê-lo à mão. O efeito real era os dois lados divergirem em
silêncio — foi exatamente o que aconteceu no release da v6.0, em que o frontend
novo subiu para produção conversando com uma implantação de março.

Os dois jobs do workflow (`build-and-deploy-frontend` e `deploy-backend-gas`)
também rodavam em paralelo, sem ordem garantida entre si.

## Decision

Cada branch passa a ter a **sua própria implantação** do Apps Script, e o CI
promove **apenas** a implantação da branch que recebeu o push:

| Branch | Implantação promovida |
|---|---|
| `refactor-structure` | desenvolvimento |
| `main` | produção |

**O merge para a `main` é o portão de produção** — não há passo manual depois
dele. Enquanto o merge não acontece, nada feito na branch de desenvolvimento
altera a produção.

A implantação que já estava em uso real vira a de **produção** (ela é a que está
em dia), e uma implantação **nova** é criada para desenvolvimento.

O job do frontend declara `needs: deploy-backend-gas`: o backend é promovido
**antes** de o frontend ser publicado.

## Alternatives considered

- **Manter a promoção de produção manual**: rejeitado. Era o estado anterior, e foi
  o que produziu o skew da v6.0. Um portão que depende de alguém lembrar não é um
  portão; e o portão de verdade — decidir o que vai para produção — já é o merge.
- **Eleger como produção a implantação que a `main` referenciava**: foi a primeira
  tentativa deste split, e estava errada. Aquele ID não era promovido desde março:
  adotá-lo como produção teria feito produção *regredir* para código antigo.
- **Dois projetos Apps Script separados** (um por ambiente), em vez de duas
  implantações do mesmo projeto: seria o isolamento mais forte — planilhas,
  propriedades e gatilhos separados. Rejeitado por ora pelo custo: exige duplicar o
  `scriptId`, as credenciais e o Sheet de dados, e migrar o conteúdo. Duas
  implantações resolvem o problema imediato (pushes de dev mexendo em produção) sem
  isso. Fica registrado como o caminho natural caso um dia seja preciso isolar
  *dados*, e não só versão de código.
- **Publicar o frontend antes do backend, ou em paralelo**: rejeitado. Frontend novo
  sobre backend antigo chama operações que não existem, e o agente vê só o watchdog
  do JSONP estourando em 15s. Backend novo sob frontend antigo é inofensivo.

## Consequences

### Positive
- Pushes em `refactor-structure` deixam de mexer no backend que os agentes usam.
- Produção só se move quando alguém faz merge — e quando isso acontece, ela se move
  inteira, frontend e backend, sem depender de memória humana.
- A ordem backend-antes-de-frontend fecha a janela de erro entre os dois.
- O estado de cada ambiente fica visível no Job Summary do Actions (data, commit e
  ID da implantação), sem precisar abrir o editor do Apps Script.

### Negative / Tradeoffs
- Some o passo em que uma pessoa podia inspecionar o backend antes de promovê-lo.
  Quem quiser esse portão de volta precisa exercê-lo **antes** do merge, na branch
  de desenvolvimento — que é onde o código já está rodando de verdade.
- Se o job do backend falhar, o frontend **não** é publicado. É deliberado, mas
  significa que uma falha de credencial (`CLASPRC_JSON` expirado) agora bloqueia o
  deploy inteiro, e não só metade dele.
- Dois IDs para manter em sincronia entre `data-service.js` e `deploy.yml`. O
  `scripts/promote-deployment.sh` protege contra o caso do placeholder, mas não
  contra os dois arquivos apontarem para implantações diferentes e válidas.

### Neutral
- O `scriptId` (`gas-backend/.clasp.json`) continua único: é o mesmo projeto Apps
  Script, com a mesma planilha por trás. O que se separa é a *versão publicada*,
  não os dados.
- Rollback não muda: continua sendo promover uma versão anterior na implantação
  afetada (`clasp deploy -i <id> -V <n>` ou pelo editor).

## Notes

A implantação de desenvolvimento foi criada em 2026-08-21 e o ID já está nos dois
lugares que precisam concordar:

- `DEPLOYMENTS.development` em `src/modules/shared/data-service.js`
- o `DEPLOYMENT_ID` do step "Promover implantação de desenvolvimento" em
  `.github/workflows/deploy.yml`

Ao rotacionar qualquer uma das duas implantações no futuro, os dois arquivos mudam
juntos. O `scripts/promote-deployment.sh` recusa rodar com um ID de placeholder
(`__ALGO__`), mas **não** detecta os dois arquivos apontando para implantações
diferentes e válidas — esse é o erro que ainda passa silencioso, e a razão de os
dois pontos estarem listados aqui.
