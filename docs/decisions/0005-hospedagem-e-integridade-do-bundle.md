# 0005 — Hospedagem e integridade do bundle

**Date**: 2026-08-24
**Status**: Proposed

> Este documento existe para responder, por escrito e antes de ser perguntado,
> como se justifica que uma ferramenta interna carregue seu código de um GitHub
> público e o injete numa página autenticada do CRM. Ver #332 e a discussão #347.
>
> **Leitura em camadas.** O resumo executivo abaixo basta para uma conversa de
> liderança. As seções seguintes são o corpo técnico, para uma revisão de
> segurança. Se o documento for levado a uma revisão formal, traduzir — o resto
> do repositório mistura PT e EN, mas uma revisão de segurança se lê em inglês.

---

## Resumo executivo

O Case Wizard é um overlay JavaScript injetado no CRM por um bookmarklet. O
código é servido de `lucastdcs.github.io/case-wizard/bundle.js` — repositório
**público**, em **conta pessoal**. Quem controlar aquele repositório controla o
que roda dentro da sessão autenticada de todo agente.

A pergunta certa não é "o repositório é público?". Público descreve quem pode
**ler**; o risco que importa é quem pode **escrever**, e em quanto tempo essa
escrita chega ao navegador do agente. São dois problemas distintos:

- **Integridade** (quem escreve): hoje sem controle. `main` não tem proteção
  nenhuma, e um push vira produção em minutos, sem revisão. Este é o problema
  grave, e é o mais barato de resolver.
- **Confidencialidade** (quem lê): real, mas menor do que parece — e concentrada
  onde ninguém tinha olhado. Não são os IDs de implantação: é o esquema de dados,
  o DOM do CRM interno e os nomes de sistemas internos publicados em `specs/`.

**O que se decide aqui:** manter a hospedagem estática, endurecer a cadeia de
escrita, e adotar como direção a verificação de integridade do bundle por hash
servido do Apps Script autenticado — a validar por um teste, descrito ao final.
Duas decisões seguem deliberadamente **em aberto**: tornar o repositório privado,
e a existência de hospedagem interna. Por isso o status é *Proposed*.

---

## Context

### A cadeia de confiança

Para o sistema ser seguro, tudo isto precisa ser verdade ao mesmo tempo:

1. a conta pessoal `lucastdcs` não está comprometida;
2. nada indevido entra em `main`;
3. o GitHub Actions constrói exatamente o que está em `main`;
4. o GitHub Pages serve exatamente o que o Actions construiu;
5. o navegador do agente carrega exatamente isso.

**Nenhum dos cinco elos é verificado hoje.** O bookmarklet não faz SRI, não fixa
versão, e o cache-buster (`?t=`) garante que ele sempre pega o que estiver lá.

### Quem pode escrever (verificado em 2026-08-24)

- **Colaborador único**: `lucastdcs`, admin. Não há acesso lateral a modelar.
- **`main` sem proteção alguma** — sem branch protection, sem ruleset
  (`GET /rulesets` devolve `[]`). Um push direto vira código na sessão de todo
  agente, sem revisão e sem rollback definido. → #350
- **A CI carrega uma credencial que escreve o backend.** `CLASPRC_JSON` é um
  token OAuth de longa duração, gravado em arquivo e copiado para
  `~/.clasprc.json`. O job `deploy-backend-gas` roda em `main` **e** em
  `refactor-structure`, dando `clasp push -f`. → #351
- **Toda action de `deploy.yml` está em tag mutável** (`actions/checkout@v3`,
  `actions/setup-node@v3`, `peaceiris/actions-gh-pages@v3`), e o workflow não
  declara `permissions:`. Quem controlar qualquer uma dessas tags executa código
  no job que contém o `CLASPRC_JSON`. Note que `release.yml` **já** faz o certo:
  usa `@v4` e declara `permissions:`. O padrão existe no repositório; `deploy.yml`
  ficou para trás. → #351
- **Dependências de build sem pin**: `npm install esbuild` (que ignora o
  `package-lock.json`) e `npm install -g @google/clasp`. O compilador do bundle é
  baixado solto a cada build. → #352

### Um agravante do modelo de execução

`appsscript.json` traz `executeAs: "USER_DEPLOYING"`. Isso é, em si, o **melhor
controle do projeto**: a planilha responde à autoridade do mantenedor, e nenhum
agente tem (nem precisa de) acesso direto ao Sheets. Mas significa que o script
roda com a autoridade do mantenedor no Drive — então quem empurrar código para o
projeto Apps Script, o que o `CLASPRC_JSON` da CI permite, **executa como ele**.
Isso coloca #351 acima do que a etiqueta de severidade sugere.

### Cenários de ameaça, por probabilidade

1. **Erro honesto** — um push apressado. Sem revisão nem rollback, propaga-se na
   mesma velocidade de um ataque. O mais provável dos três.
2. **Cadeia de suprimentos da CI** — uma action em tag mutável ou uma dependência
   sem pin. Não exige atacar a conta; exige atacar algo que o projeto consome.
3. **Conta comprometida** — hoje o controle é 2FA numa conta pessoal, sem segundo
   elo, porque não há proteção de branch.

Em qualquer um deles o alcance é total e silencioso: o código roda na sessão
autenticada do agente, e a política Trusted Types `default` (#306) já removeu a
barreira que conteria a injeção.

### O que está de fato exposto

**Sensível e endereçável** — ID da planilha de **backup** em `gas-backend/Backup.js`
(o arquivo histórico com PII de anunciante), `scriptId` em `.clasp.json`, os
deployment IDs (#353), `ADMINS` no cliente (#303), e o `.gitignore` que não
protege `.clasprc.json` nem `.env` (#354).

Sobre os deployment IDs, com honestidade: o web app roda com `access: "DOMAIN"`,
então expô-los **não abre nada para quem está fora**. Muda apenas para quem já
está no domínio — e a mitigação real ali não é esconder o ID, é #301.

**O que realmente custa ser público**, e que nenhuma issue cobria:

- `specs/data-models/db-schema.md` publica o esquema operacional completo, coluna
  a coluna, com os campos de PII do anunciante nomeados;
- `specs/workflow/scraping-rules.md` documenta o DOM real do CRM interno,
  incluindo seletores;
- nomes de sistemas e processos internos ao longo do repositório;
- identidade visual do Google aplicada na UI, em conta pessoal pública.

Nada disso sai rotacionando um ID. **Ou o repositório fica privado, ou esse
conteúdo é higienizado** — e essa é a alavanca concreta da decisão em aberto.

**O que só parece exposto**, e conta como higiene já praticada: as capturas em
`docs/media/` foram feitas contra o ambiente mock (`CorpCRM`, `Acme Corp`,
`customer@example.com`), não contra o CRM real; não há credencial no repositório
nem no histórico; `dist/` é ignorado; e o nome antigo do repositório é retido de
propósito, com um shim documentado, para impedir que alguém reivindique o
namespace e sequestre bookmarklets antigos.

---

## Decision

1. **Manter a hospedagem estática do bundle** (GitHub Pages/CDN). Rejeitar servir
   o bundle inteiro pelo Apps Script — ver os números em *Alternatives*.
2. **Endurecer a cadeia de escrita**, na ordem do plano de remediação abaixo.
3. **Adotar como direção a verificação de integridade por hash**: o loader obtém
   o SHA-256 esperado de um endpoint autenticado do Apps Script e só executa o
   bundle se ele conferir. Isso tira o GitHub da cadeia de *confiança* sem tirá-lo
   da cadeia de *entrega*. **A validar pelo teste descrito ao final** — não está
   decidido, está proposto.
4. **Deixar explicitamente em aberto**, com dono e prazo a definir: tornar o
   repositório privado; e descobrir se existe alternativa interna de hospedagem.

O status é *Proposed* porque 3 e 4 ainda não foram decididos. Um ADR que se
declara aceito sem a decisão tomada enfraquece o próprio documento.

### Plano de remediação, por risco real

Ordenado por risco, não por etiqueta de severidade.

| Bloco | O quê | Por quê primeiro |
|---|---|---|
| **0** | #354 (`.gitignore` + push protection), #350 (proteger `main`) | Configuração, horas de trabalho, fecha o cenário mais provável |
| **1** | #301 + #302 juntos, depois #303 | Explorável **hoje** por qualquer pessoa do domínio, sem comprometer nada |
| **2** | #351, #352 | Exige comprometer um terceiro, mas alcança frontend e backend juntos |
| **3** | #306 (narrativa + política nomeada), #307 (PII), #353 (IDs) | O que um revisor aponta ao ler o README |
| **4** | Repo privado; teste do item 3 da decisão; hospedagem interna | Decisões, não tarefas |

---

## Alternatives considered

- **Servir o bundle inteiro pelo Apps Script**: rejeitado pelos números, medidos
  em 2026-08-24. O TTFB do `script.google.com` é **0,49–0,90 s** (mediana ~0,58 s)
  contra **0,068–0,078 s** do GitHub Pages quente — e o valor do Apps Script é o
  *piso*, medido num 302 que não executa script algum. Pior: a resposta vem com
  `cache-control: no-cache, no-store, max-age=0, must-revalidate`, então **cada
  clique no bookmarklet rebaixaria os 668 KB inteiros**, sem cache de navegador
  nem de CDN, onde hoje a maioria dos carregamentos nem chega ao origin. O ganho
  de segurança é real, mas o preço recai sobre todo agente, o dia inteiro.
  Ver *Notes* para a análise de cota.
- **Tornar o repositório privado, esperando que isso resolva a hospedagem**:
  rejeitado por um equívoco técnico que vale registrar — **um site do GitHub Pages
  é público na internet mesmo quando o repositório é privado**; controle de acesso
  em Pages só existe no GitHub Enterprise Cloud. Fechar o repo resolve
  integralmente a exposição de `specs/` e da marca, e **não muda nada** na cadeia
  de integridade. São duas decisões separadas, e tratá-las como uma só é o erro
  que este documento existe para evitar. Segue em aberto pelo seu mérito próprio.
- **SRI direto no bookmarklet** (`script.integrity`): tecnicamente viável — o GH
  Pages já envia `access-control-allow-origin: *`, então `crossOrigin="anonymous"`
  funciona. Rejeitado na operação: o hash muda a cada deploy, e todo agente teria
  de reeditar seu favorito a cada release. É o controle certo com um custo de
  distribuição inviável.
- **Extensão de navegador empacotada e distribuída pela TI**: resolve hospedagem
  e Trusted Types de uma vez. Rejeitado por ora pelo custo político — exige um
  processo de aprovação que só se justifica se o projeto for adotado oficialmente.
  Fica registrado como o escalonamento natural nesse cenário.
- **Add-on do Google Workspace**: mesma direção, custo político ainda maior.
- **Hospedagem interna** (instância interna de GH, storage interno): **não
  investigado**. Ninguém sabe hoje se existe, e a resposta muda o cálculo inteiro.
  Registrado como pergunta em aberto em vez de especulação — ver #347.

---

## Consequences

### Positive

- A conversa deixa de ser "confie na minha conta" e passa a ser "estes são os
  controles, este é o risco residual, e este é o gatilho de reavaliação".
- Dois dos três cenários de ameaça ficam **fechados** pelos blocos 0 e 2, ambos
  compostos de configuração e mudanças localizadas.
- O bloco 1 remove a cadeia explorável hoje por qualquer pessoa do domínio.
- Se o item 3 se confirmar no teste, um bundle adulterado no GitHub simplesmente
  não executa — e a resposta à pergunta do #332 vira defensável sem mudar de
  hospedagem.

### Negative / Tradeoffs

- **A integridade do código continua dependendo de uma conta pessoal com 2FA.**
  Enquanto houver um só mantenedor, não há segundo par de olhos obrigatório: a
  proteção de `main` cria o registro e o ponto de parada, não uma segunda pessoa.
- O artefato servido segue **público e sem verificação** até o item 3 existir.
- A política Trusted Types segue necessária (#306) qualquer que seja a hospedagem
  — é um problema independente deste ADR.
- A verificação por hash adiciona uma execução do Apps Script por carregamento.
  É barata (resposta de ~64 bytes), mas consome um slot do pool de concorrência
  descrito em *Notes*.

### Neutral

- O repositório continua público até que a decisão do bloco 4 seja tomada.
- Nada aqui muda o modelo de dados nem o comportamento visível ao agente.

### Gatilhos de reavaliação

Este ADR deve ser revisitado se: o projeto for proposto para **adoção oficial**
pela operação; entrar um **segundo mantenedor**; ou o sistema passar a tratar
dados além do escopo atual.

---

## Notes

### O bundle via Apps Script aguenta a carga? (análise de cota)

Feita em 2026-08-24 contra os limites oficiais e com medição da linha de base.
A pergunta original: aguenta o volume, e ajuda criar implantações ou planilhas
separadas?

**O limite que morde não é volume — é concorrência.** Não há cota diária
documentada para requisições de web app (o teto de "6 h/dia" é de *gatilhos*). O
limite é de **30 execuções simultâneas por usuário**, com teto separado de 1.000
por script.

E o detalhe decisivo: com `executeAs: "USER_DEPLOYING"`, **toda a cota é atribuída
ao dono da implantação**. Os agentes não têm 30 slots cada — eles dividem um único
pool de 30, o do mantenedor. O `jsonpFetch` já consome esse pool hoje (12 pontos
de chamada no frontend, ~4 deles no início de sessão).

**A conta**, para 100 agentes (o número de #331) a ~8 aberturas/dia:

- Volume: ~800 execuções/dia ≈ 0,03/s diluído. Irrelevante.
- Pico de início de turno (100 agentes em 10 min): ~500 execuções em 600 s ≈
  0,83/s. Ocupação = taxa × duração; com 1 s por execução, 0,83 de 30 slots.
- **Onde quebra**: se a duração subir para 5 s — plausível com a planilha
  crescendo e `getDataRange().getValues()` lendo tudo — a mesma taxa ocupa 4,2
  slots, e um pico 3x mais concentrado satura os 30. O erro é
  `There are too many scripts running simultaneously for this Google user account`.

**Conclusão: a cota não quebra pelo tamanho do bundle, quebra pela duração das
execuções.**

Respondendo diretamente às duas perguntas:

- **Implantações diferentes não ajudam.** A cota é por *usuário efetivo*, não por
  implantação: várias implantações do mesmo script, mesmo dono, caem no mesmo pool
  de 30. Implantação é versão e URL, não fronteira de cota. Dividir exigiria outra
  **conta Google** dona de uma cópia do script — o que multiplica credenciais
  (piorando #351), duplica manutenção e obriga a compartilhar os dados.
- **Planilhas diferentes não ajudam a cota, mas atacam o gargalo real.** Servir o
  bundle nem toca em Sheets; a cota é de execução de script. O que dividir
  planilhas muda é **quanto tempo cada execução dura** (menos linhas lidas, menos
  contenção de `LockService`) — e como o limite é simultaneidade, execução mais
  curta libera o slot mais rápido. É a alavanca certa, pelo mecanismo oposto ao
  que a pergunta supunha. Liga com #333 e #334.

Outras saídas avaliadas: `executeAs: "USER_ACCESSING"` daria a cada agente seu
próprio pool (teto de 1.000 por script, ~33x mais capacidade), **mas** exigiria
acesso direto de cada agente à planilha — destruindo o melhor controle de
segurança do projeto. Registrado, não recomendado. E `CacheService` **não** serve
para o bundle: o teto é de **100 KB por chave**, com 1.000 itens no cache de
script compartilhado; 668 KB exigiriam 7+ chaves sujeitas a despejo em massa.

### Passo a passo do teste de integridade por hash

Este é o teste que valida (ou reprova) o item 3 da decisão. Rastreado em **#356**,
que repete este passo a passo junto com a pesquisa completa, para ser pego sem
depender deste documento. Deve rodar **inteiramente no ambiente de
desenvolvimento** — deployment de dev e bookmarklet de dev —, sem tocar em
produção.

**Hipótese a testar:** é possível verificar a integridade do bundle antes de
executá-lo, obtendo o hash esperado de uma fonte autenticada, sem regressão de
latência perceptível para o agente.

**Fase 0 — linha de base (antes de mudar nada).**
Medir, do navegador, na página do CRM, com o bookmarklet de dev: tempo entre o
clique e o overlay utilizável, em 10 repetições, com cache quente e frio.
Registrar mediana e pior caso. Sem esse número, o resto do teste não conclui nada.

**Fase 1 — publicar o hash junto com o bundle.**
No `deploy.yml`, após o `esbuild`, calcular `sha256` do `dist/bundle.js` e gravá-lo
num arquivo ao lado (`bundle.js.sha256`). Publicar os dois no `gh-pages`. Isto
sozinho já é útil: dá um registro verificável de qual artefato foi ao ar em cada
deploy (ver #352). Ainda **não** é segurança — o hash vem da mesma origem que o
bundle.

**Fase 2 — servir o hash pelo Apps Script.**
Adicionar ao roteador uma operação `get_bundle_hash` que devolve o SHA-256
esperado como texto (~64 bytes) via `ContentService`. O valor vem de
`PropertiesService`, escrito pelo CI no mesmo passo que publica o bundle.
Isto é o que torna a verificação real: o hash passa a vir de uma origem
autenticada (`access: "DOMAIN"`) e sob controle diferente do GitHub.

**Fase 3 — loader que verifica.**
Novo bookmarklet de dev que: (a) busca o hash no Apps Script; (b) busca o bundle
no CDN com `fetch` e `crossOrigin`; (c) calcula `crypto.subtle.digest('SHA-256', …)`;
(d) compara; (e) só então injeta o script. Em caso de divergência, **não executa** e
mostra um erro explícito ao agente — falha ruidosa, nunca silenciosa.

**Fase 4 — medir e comparar.**
Repetir a medição da Fase 0 com o loader novo. Medir separadamente: latência do
`get_bundle_hash`, tempo do `crypto.subtle.digest` sobre 668 KB, e o total até o
overlay utilizável.

**Fase 5 — testar a falha.**
Publicar deliberadamente um bundle cujo hash não bate e confirmar que o loader
recusa executar e avisa. Um controle que nunca foi visto falhando não é um
controle verificado.

**Critérios de aceite.** A proposta é aprovada se: o overhead mediano sobre a
Fase 0 ficar **abaixo de 300 ms**; a Fase 5 recusar o bundle adulterado; e o
`get_bundle_hash` não introduzir dependência do início de sessão em caminho já
saturado (ver a análise de cota acima).

**O que reprova a ideia.** Trusted Types bloquear o `fetch` ou o `crypto.subtle`
no contexto da página do CRM; o overhead passar de ~1 s; ou a operação extra
mostrar-se relevante no pool de concorrência sob carga real.

**Riscos conhecidos antes de começar.** O `crypto.subtle` exige contexto seguro
(a página do CRM é HTTPS, então deve estar disponível — confirmar). O `fetch` do
bundle passa a ser sujeito a CORS, onde o `<script src>` de hoje não é; o GH Pages
envia `access-control-allow-origin: *`, o que deve bastar, mas precisa ser
confirmado no ambiente real. E o CI passa a ter de escrever no
`PropertiesService`, o que amplia o que a credencial da CI alcança — avaliar junto
com #351.

### Referências

- Issues de segurança: #301, #302, #303, #306, #307 (auditoria original);
  #350, #351, #352, #353, #354 (descobertos neste estudo).
- Teste da proposta de integridade por hash: #356.
- Estudos relacionados: #331 (escala), #333 (Sheets como banco), #334
  (peso dos dashboards).
- Discussão: #347.
- [Quotas for Google Services](https://developers.google.com/apps-script/guides/services/quotas)
- [Web Apps — Apps Script](https://developers.google.com/apps-script/guides/web)
- ADR relacionado: `0004-implantacoes-apps-script-por-branch.md`.
