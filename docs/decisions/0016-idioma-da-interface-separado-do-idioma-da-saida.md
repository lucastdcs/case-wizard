# 0016 — Idioma da interface separado do idioma do atendimento

**Date**: 2026-10-13
**Status**: Accepted

## Context

A entrada do inglês (ADR-0001 já previa `EN` em `CONTENT_LANGS`, em
`profile.defaultLanguage` e na coluna `Idioma`, mas sem dicionário) expôs um
acoplamento que até aqui era inofensivo.

O ADR-0001 adotou **um idioma de sessão único** e, na sequência, o seletor
PT/ES próprio do Case Notes foi removido: o idioma da nota passou a seguir o
idioma global da interface. Com dois idiomas isso quase nunca divergia — um
agente do segmento PT opera em português e atende em português, e os raros
casos fora da regra já eram tratados por outro caminho (o `select` de "Idioma
da Atenção" do BAU Form, que existe justamente porque "existe caso que foge da
regra").

Com três idiomas a coincidência quebra, e quebra na direção pior. O inglês é o
primeiro idioma que alguém escolhe **por preferência de ferramenta** e não por
segmento: um agente PT ou ES confortável em inglês tem motivo para pôr o Case
Wizard em inglês. Com o acoplamento anterior, esse clique em Configurações
passaria a gravar case notes em inglês e a disparar e-mails em inglês para
anunciantes que falam português ou espanhol.

O defeito seria **silencioso e plausível** — o mesmo formato que `docs/LEARNINGS.md`
já registra duas vezes ("o sintoma de uma lista de negócio duplicada é ela ser
plausível"). Nada quebra, nada fica vermelho: a nota é gerada, o e-mail sai, a
planilha grava. Só está no idioma errado, e quem descobre é o anunciante.

## Decision

`src/modules/shared/i18n.js` passa a resolver **dois** idiomas independentes,
com a mesma ordem de precedência (override manual no navegador →
`profile.defaultLanguage` → `pt`) e chaves de `localStorage` separadas:

- **Interface** (`getLanguage`): menus, botões, toasts, diálogos. É conforto de
  quem opera a ferramenta.
- **Atendimento** (`getOutputLanguage`): o case note, o corpo do e-mail, o
  roteiro da chamada. É o idioma de quem é atendido.

`applyProfileLanguage()` alimenta os dois com o segmento do perfil, então o
caso comum não muda: quem não tocar em nada continua vendo e escrevendo no
idioma do seu segmento. A divergência é sempre uma escolha explícita, feita nas
duas linhas do card de idioma em Configurações.

A fronteira entre os dois não é o arquivo, é o **destino do texto**. Vários
módulos leem o mesmo dicionário pelos dois knobs: em `form-builder.js` o rótulo
do campo segue o atendimento (ele é, literalmente, o texto impresso na nota, e
o agente precisa ver na tela o que vai gravar) enquanto o botão de auto-busca e
o diálogo de remover campo seguem a interface.

## Alternatives considered

- **Manter o acoplamento e aceitar o risco**: rejeitado. O custo é assimétrico —
  um toast no idioma errado é ruído, uma nota no idioma errado fica gravada no
  caso e um e-mail no idioma errado chega ao anunciante.
- **Travar a saída no segmento do perfil, sem seletor**: rejeitado pelo mesmo
  motivo que o BAU Form já tem o seu `select` — existe caso que foge da regra, e
  o Case Notes perderia a capacidade que tinha antes do ADR-0001.
- **Um seletor por nota, sem valor global persistido**: rejeitado por atrito. O
  idioma do atendimento muda raramente (é o segmento da pessoa), então pedir a
  escolha a cada nota cobraria todo dia por um caso que acontece pouco.
- **Deduzir o idioma da saída do idioma do anunciante raspado do CRM**:
  rejeitado por ora. O campo existe (`language`, raspado e coberto por
  `test:scraping`) e seria o default mais correto, mas a raspagem falha em tela
  traduzida com frequência suficiente para que um default errado e automático
  seja pior que um default certo e manual. Fica registrado como evolução
  possível.

## Consequences

### Positive
- Um agente pode operar a ferramenta em inglês sem contaminar o caso do
  anunciante — que é o que torna o inglês adotável como preferência pessoal.
- O Case Notes recupera, por outro caminho, a capacidade que o seletor PT/ES
  removido pelo ADR-0001 dava.
- `smoke:i18n` trava a separação nos dois sentidos, no navegador real.

### Negative / Tradeoffs
- Dois knobs são mais superfície de configuração do que um, e a diferença entre
  eles só fica óbvia lendo as descrições em Configurações.
- Módulos com texto misto precisam de **dois** tradutores, e decidir a qual
  pertence cada chave é julgamento, não regra mecânica. `smoke:i18n` cobre os
  casos conhecidos; chave nova em módulo misto exige a pergunta "este texto sai
  no caso ou fica na tela?".

### Neutral
- Os valores gravados no backend continuam em PT, como o ADR-0001 decidiu: a
  tradução nunca alcança `Motivo_Abertura`, `Task_BAU` nem o motivo do descarte.
- Rascunhos continuam não restaurando o idioma gravado no payload — ele segue o
  valor global corrente. Permanece como estava; vale revisitar se aparecer
  relato de nota retomada no idioma errado.

## Notes

- Supersede parcialmente o ADR-0001 (seção "Decision", "um idioma de sessão
  único"). O resto do ADR-0001 — separação entre interface e conteúdo, mapas
  paralelos por id, dicionário replicado no Apps Script — continua valendo.
- Cobertura: `npm run test:i18n` (paridade dos dicionários) e
  `npm run smoke:i18n` (qual knob cada lugar lê, no navegador).
