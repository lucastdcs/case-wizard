# Contribuindo com o Case Wizard

Este arquivo é um **roteador**, não um manual. As regras moram nos documentos
abaixo e são mantidas lá — se algo aqui divergir deles, eles é que valem.

## Antes de escrever código

| Você quer... | Leia |
|---|---|
| entender como a coisa funciona | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) |
| saber a regra de negócio ou o contrato de dados | [`specs/_MASTER_RULEBOOK.md`](specs/_MASTER_RULEBOOK.md) e o resto de `specs/` |
| achar o arquivo certo | [`CLAUDE.md`](CLAUDE.md) → *Key files and folders* |
| saber por que uma decisão foi tomada | [`docs/decisions/`](docs/decisions/) |
| publicar uma versão | [`RELEASE.md`](RELEASE.md) |

**A `specs/` é a lei.** Se o código diverge de uma spec, o padrão é corrigir o
código — não a spec. Mudar a spec é uma decisão consciente, e vira um ADR.

## O ciclo

1. Branch a partir de `refactor-structure`.
2. Commits em [Conventional Commits](https://www.conventionalcommits.org/)
   (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`), pequenos e atômicos.
3. `npm run build` e os `npm run test:*` / `smoke:*` relevantes.
4. Teste de verdade: carregue o **bookmarklet de dev** contra o CRM real e
   exercite o módulo que você mexeu. Não há suíte que cubra a raspagem do DOM.
5. PR para **`refactor-structure`**. Nunca direto para a `main` — o merge para a
   `main` é o portão de produção.

## O que costuma ser esquecido

- **Mexeu em `gas-backend/`?** Confira se o contrato em
  `specs/data-models/api-payloads.md` continua valendo. Mais de um módulo do
  frontend depende dele.
- **Mudou algo perceptível?** Entra no `CHANGELOG.md`, sob `[Unreleased]`.
- **Bumpou versão?** `package.json`, `APP_VERSION` (`src/app.js`) e
  `RELEASE_NOTES.version` (`src/modules/changelog/changelog-data.js`) mudam
  **no mesmo commit**. Se divergirem, o modal de novidades some e um teste fica
  vermelho.
- **Novo passo de build?** Ele precisa passar `--define:__CW_BUILD_ENV__`.
  Sem a flag, o bundle cai no fallback `"development"` em silêncio — e um
  bundle de produção falando com o backend de dev é difícil de perceber.

## Abrindo uma issue

Use os templates de [bug](.github/ISSUE_TEMPLATE/bug.yml) ou
[melhoria](.github/ISSUE_TEMPLATE/melhoria.yml). Se você já investigou, aponte
`arquivo:linha` — é o que separa uma issue que alguém consegue pegar de uma que
vai precisar ser re-investigada do zero.

Issue sem investigação também é bem-vinda. É melhor um sintoma registrado do
que um sintoma esquecido.
