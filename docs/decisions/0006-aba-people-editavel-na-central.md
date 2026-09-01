# 0006 — Aba People editável pela Central, com aprovação exclusiva do ADMIN

**Date**: 2026-09-01
**Status**: Accepted

## Context

A aba **People** da planilha é o diretório de autorização do produto:
`getUserProfileByLdap()` (Código.gs) a lê para decidir se alguém é liderança
(`isOverhead`, que abre o TL Dashboard) e em que idioma o app abre
(`defaultLanguage`, derivado do segmento). Até aqui ela só era editável
abrindo a planilha na mão.

Isso cobrava caro na operação: agente que entra, sai, troca de fluxo ou de
idioma só é atendido por quem tem acesso de edição ao Sheets, e a mudança é uma
célula digitada — sem validação, sem rastro e sem revisão. Um LDAP com espaço
sobrando, por exemplo, faz a pessoa nunca casar com o próprio perfil e cair no
fallback restritivo, **sem erro nenhum na tela**.

Três restrições moldaram a decisão:

1. **Escrita em People não pode passar pelo roteador JSONP.** No `doGet` a
   identidade é o parâmetro `user`, que qualquer um forja. Foi exatamente por
   isso que as rotas de escrita de avisos saíram de lá (ver `Código.gs`, seção
   5). Aplicado a People, o estrago é maior que publicar um aviso indevido: é
   se promover a liderança com uma URL.
2. **Já existia a máquina certa.** A Central de Conteúdo tem papéis, fila de
   propostas, não-autoaprovação, versionamento, notificação e log — tudo sobre
   `google.script.run`, onde quem chama é `Session.getActiveUser()`.
3. **Aprovação de gente não é aprovação de conteúdo.** Conteúdo errado se
   corrige republicando; papel errado abre o TL Dashboard para quem não devia, e
   quem aprova pode ser o próprio beneficiado. TL aprova conteúdo hoje — não
   pode aprovar promoção.

## Decision

A aba People vira o módulo **`people`** da Central de Conteúdo: uma aba
"Pessoas" onde **ADMIN e TL** editam, reaproveitando a fila e o log já
existentes, com duas exceções próprias do módulo — **só o ADMIN aprova**
(`CONTENT_ADMIN_ONLY_APPROVAL_MODULES`) e **quem não propõe também não lê**
(`CONTENT_RESTRICTED_READ_MODULES`).

A aprovação **não escreve em `Content_Items`**: `approveContentDraft()` desvia
para `applyApprovedPeopleDraft_()` (PeopleAPI.gs), que aplica na aba People —
a fonte que o app de fato lê. O ADMIN, que já tem `selfApprove`, aplica na
mesma chamada em que salva; qualquer outro papel entra na fila.

## Alternatives considered

- **Um módulo de conteúdo comum, com as pessoas virando linhas de
  `Content_Items`**: rejeitado. Criaria uma segunda fonte de verdade sobre quem
  é quem, e `getUserProfileByLdap()` teria de aprender a ler duas abas — ou a
  aba People viraria uma cópia derivada, que dessincroniza no primeiro erro.
  Pior: `handleContentPublicRead()` serve `Content_Items` por URL pública, e o
  diretório passaria a ser legível sem identidade nenhuma.
- **Uma fila própria (`People_Changes`), separada da Central**: rejeitado. O
  ADMIN passaria a ter dois lugares para revisar pendências, e submit/reject/
  notificação/trava/log seriam reimplementados — código novo, sem os testes que
  o caminho atual já tem.
- **Editar pela pílula do Command Center (o bookmarklet)**: rejeitado. A pílula
  só fala JSONP, onde a identidade é forjável. Uma tela de leitura ali seria
  possível, mas a escrita teria de abrir a Central de qualquer jeito.
- **TL aprovando também, como faz em conteúdo**: rejeitado. Dois TLs se
  promovem mutuamente sem nenhum passo fora do par.

## Consequences

### Positive
- Entrada, saída, troca de fluxo e troca de idioma passam a ser feitas por
  quem toca a operação, com validação (LDAP normalizado e conferido, campos
  obrigatórios) e rastro (fila + aba Logs).
- A tela mostra o que a regra **vai derivar** antes de salvar — o idioma que o
  app abrirá e se aquela categoria dá acesso de liderança. A regra permissiva do
  `isOverhead` (por lista de exclusão) deixa de ser invisível.
- Trava contra o pé-na-porta: nenhuma alteração pode zerar a liderança da
  operação, e ela é revalidada **na aprovação**, não só na proposta.
- O diretório nunca sai pela leitura pública: `people` está em
  `CONTENT_PRIVATE_MODULES` e o teste prova pela URL do web app.

### Negative / Tradeoffs
- `approveContentDraft()` ganhou um desvio por módulo. É uma exceção explícita
  no caminho mais crítico do ContentAPI — comentada, e coberta por teste.
- ContentAPI passa a depender do PeopleAPI (mesmo escopo global do Apps
  Script). Quem carregar um sem o outro num harness quebra: os testes carregam
  os três arquivos, como o Apps Script faz.
- Baixa apaga a linha. O histórico fica na fila e no log, não na aba.

### Neutral
- QA e WFM não veem a aba: seus papéis listam módulos explicitamente e `people`
  não está neles.
- Não há edição de LDAP. Trocar o LDAP de alguém é dar baixa e admitir de novo —
  ele é a identidade da linha.

## Notes

- Backend: `gas-backend/PeopleAPI.js`; ganchos em `gas-backend/ContentAPI.js`.
- Tela: aba "Pessoas" em `gas-backend/ContentDashboard.html`.
- Esquema e contrato: `specs/data-models/db-schema.md` e
  `specs/data-models/api-payloads.md`.
- Testes: `npm run test:people` (regra) e `npm run smoke:people` (a tela real no
  Chromium, com `google.script.run` ligado ao backend de verdade).
