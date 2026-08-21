## O que muda

<!-- Uma ou duas frases. O "porquê" vale mais que o "o quê" — o diff já mostra o quê. -->

Resolve #

## Por que assim

<!-- A decisão por trás da mudança, e o que você considerou e descartou.
     Este é o campo que o seu eu de daqui a seis meses vai querer ler. -->

## Como verificar

<!-- O comando que prova, ou o passo manual. Se rodou testes, cole o resultado. -->

- [ ] `npm run build` passa
- [ ] Testes relevantes passam (`npm run test:*` / `smoke:*`)
- [ ] Testado com o bookmarklet de **dev** contra o CRM real, se mexeu em módulo

## Checklist

- [ ] Se mexi em `gas-backend/`: o contrato em `specs/data-models/api-payloads.md` continua válido
- [ ] Se mexi numa regra de negócio: a spec correspondente em `specs/` foi atualizada junto
- [ ] Se é uma decisão que alguém vai questionar depois: virou um ADR em `docs/decisions/`
- [ ] Se muda algo perceptível: entrou em `CHANGELOG.md`, sob `[Unreleased]`
- [ ] Se bumpei versão: `package.json`, `APP_VERSION` e `RELEASE_NOTES.version` no mesmo commit

<!-- PRs vão para `refactor-structure`, nunca direto para `main`.
     O merge para a main é o portão de produção — ver RELEASE.md. -->
