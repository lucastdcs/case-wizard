# 📖 MASTER RULEBOOK (Diretriz Principal)

## 1. Filosofia do Projeto
- **Fonte da Verdade:** Esta pasta `/specs` é a lei absoluta do projeto. Se o código legado divergir de qualquer regra descrita nestes arquivos, a regra prevalece e o código deve ser refatorado para se adequar.
- **KISS (Keep It Simple, Stupid):** O código deve ser simples, legível e direto.

## 2. Tech Stack e Restrições
- **Front-end:** HTML, CSS e Vanilla JavaScript. 
- **Back-end:** Google Apps Script (GAS) operando com o Google Sheets como banco de dados.
- **Comunicação:** JSONP (`jsonpFetch`) devido a restrições de CORS/ambiente.
- **PROIBIDO:** O uso de frameworks externos (React, Angular, Vue) ou bibliotecas (jQuery, Axios), a menos que explicitamente autorizado.

## 3. Padrões de Nomenclatura (Clean Code)
- **Funções JS:** Padrão `camelCase` (ex: `sendBAUEscalation`, `updateBauCase`).
- **Constantes (Globais/Status):** Padrão `UPPER_SNAKE_CASE` (ex: `PENDING_TL_CREATION`, `CACHE_KEY_TIPS`).
- **Classes CSS:** Padrão com hífens/kebab-case (ex: `.bau-highlight-panel`, `.discard-theme`).

## 4. Idiomas e Tradução

O produto atende em **PT-BR, ES e EN**. Duas regras valem acima de qualquer
conveniência:

- **Dois idiomas independentes, não um.** `getLanguage()` é o idioma da
  INTERFACE (quem opera a ferramenta) e `getOutputLanguage()` é o idioma do
  ATENDIMENTO (quem é atendido: o case note, o e-mail do anunciante, o roteiro
  da chamada). Ao escrever ou mover uma string, a pergunta é **"este texto sai
  no caso ou fica na tela?"** — ela decide o knob, não o arquivo em que a
  string mora. Ver `docs/decisions/0016-idioma-da-interface-separado-do-idioma-da-saida.md`.
- **Exceção: texto que o caso carrega mas que não é para o anunciante.** O bloco
  "Pre-call checklist" da nota sai sempre em inglês, nos três idiomas, porque a
  auditoria do SOP o procura por texto (ADR-0018). Só a tela do formulário segue
  `getLanguage()`. A única linha dessa nota que NÃO é em inglês é o rodapé
  `Gerado pelo Cases Wizard`, fixo em PT nos três idiomas
  (`specs/workflow/precall-checklist.md`); o rodapé da nota do Case Notes, ao
  contrário, segue o idioma do atendimento.
- **O valor gravado no backend nunca é traduzido.** `Motivo_Abertura`,
  `Task_BAU`, o motivo do descarte e os status/substatus seguem em PT (ou no
  original do CRM) nos três idiomas. Traduzi-los quebra a categorização dos
  relatórios do TL sem nenhum erro visível.

### Termos que NÃO se traduzem

- **Siglas de domínio:** BAU, AM, CID, SE ID, Speakeasy, Case ID, TL, LM, SME,
  GTM, sGTM, GA4, ECW4, UPD, NRP, OOS, CMS, Tag Support.
- **Rótulos que espelham a tela do CRM:** `On Call signaled on time?`,
  `OnCall Comments`, `Multiple CIDs`, `Reason/Comments`, `Tag Implemented`,
  `Substatus`, `Screenshots`. Já estão em inglês nos três idiomas de propósito.
- **Nomes de produto e de módulo:** Case Wizard, TechSol, Cognizant, Google,
  Case Notes, Email Assistant, BAU Central, My Library, Broadcast, Call Script.
- **Tokens de template de e-mail:** `[Nome do Cliente]`, `[INSERIR URL]`,
  `[MM/DD/YYYY]` e afins. São a chave que liga o corpo ao campo preenchido; o
  rótulo exibido traduz, a chave nunca.
- **Placeholders de cenário:** `{DIA}` e os marcadores entre colchetes
  (`[descrever a limitação]`), além de `N/A` e `-`, que são neutros.

### Como se acrescenta um idioma

Dicionário `{ pt, es, en }` por módulo, consumido por um `t()` local; conteúdo
operacional em **mapa paralelo chaveado por id** (`SCENARIO_EN`,
`EMAIL_TEMPLATES_EN`, `SCREENSHOT_LABEL_EN`, `LINK_DESC_EN`), deixando o PT
intocado. Registro em EN: **EN-US corporativo neutro**.

`npm run test:i18n` trava a paridade dos dicionários e `npm run smoke:i18n`
trava qual knob cada lugar lê. Chave nova sem as três línguas reprova. Todo
mapa `X_ES` precisa de um `X_EN` com as mesmas chaves e propriedades — um mapa só
de ES é o formato da época do PT/ES, e deixa o inglês caindo em português sem
erro (é o que o `test:i18n` também reprova).

**Texto de tela montado no boot passa por dois lugares**: o dicionário **e** o
handler de `onLanguageChange` do módulo. O perfil (que decide o idioma) chega
depois do boot, então o que o módulo desenha uma vez só fica no idioma errado se
ninguém o repintar. O `smoke:i18n` troca o idioma com o app aberto e lê o texto.

**Nomes de país e cidade** (`shared/timezones.js`) são texto de tela, não valor:
o catálogo é em PT, e `hubName(hub, lang)` / `hubLabel(hub, lang)` dão a exibição
por idioma. O que se grava continua sendo a zona IANA.
