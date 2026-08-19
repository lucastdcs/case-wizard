<!-- generated-by: groundrules v1.10.0 -->
# Changelog

All notable changes to this project are documented in this file.

Format inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Project adopted into groundrules on 2026-08-18
- **Suporte a espanhol (PT/ES) em todo o produto.** O idioma da interface é
  herdado do perfil da pessoa na planilha People (`profile.defaultLanguage`) e
  pode ser trocado manualmente em Configurações (persistido por navegador).
  Cobre: toda a interface (Notes, Email Assistant, Call Script, BAU Central,
  Central de Avisos, Central de Links, Minha Biblioteca, Time Zone, Onboarding,
  Changelog, pílula flutuante e Ctrl/Cmd+K) e todo o conteúdo (27 cenários de
  nota, rótulos de screenshot, 8 templates de e-mail, 60 descrições de link).
  No Apps Script, os 5 e-mails automáticos e o TL Dashboard saem no idioma de
  quem recebe/acessa. Ver `docs/decisions/0001-i18n-pt-es.md`.

### Changed
- O seletor PT/ES próprio do Notes e o do Call Script foram removidos: os dois
  módulos agora seguem o idioma único da sessão, trocado em Configurações.

### Fixed
- Botões "Não/Sim" do seletor "Caso de Portugal?" (Notes) não retraduziam ao
  trocar de idioma.
- Botão padrão de confirmação destrutiva (`confirmDialog`) ficava em português
  mesmo com a interface em espanhol.

### Deprecated

### Removed

### Fixed

### Security

<!--
## [0.1.0] - YYYY-MM-DD

### Added
- ...
-->
