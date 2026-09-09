# Fixtures de raspagem do CRM

Capturas da tela de caso do CRM usadas por `npm run test:scraping`
(`scripts/test-scraping.mjs`).

## Os dois arquivos

| Arquivo | O que é |
|---|---|
| `crm-case-translated.html` | Captura **real** de uma tela de caso com o tradutor do CRM **ligado**. |
| `crm-case-original.html` | A mesma tela no **idioma original**. |

Ambos representam o mesmo caso, então os campos que não dependem de idioma
(e-mail, CID, case ID, site, AM) têm de dar o mesmo valor nos dois — e é isso
que o teste cobra.

## Por que a variante traduzida importa

O tradutor do CRM traduz **rótulos e valores**:

| Original | Traduzido |
|---|---|
| `Given name` | `Nome dado` |
| `Contact email` | `E-mail de contato` |
| `Customer time zone` | `Fuso horário do cliente` |
| `cognizant` | `ciente` |
| `umm_scaled` | `escala umm` |
| `Brazil/East` | `Brasil/Leste` |

Como a raspagem casa rótulo por texto, a tela traduzida quebrava 7 das 10
capturas — e um teste que rodasse só na variante em inglês não veria nada
disso.

`ensureOriginalLanguage()` reverte a tradução antes de raspar e continua sendo
a primeira defesa. Num fixture estático o clique não re-renderiza nada, e é
justamente esse o cenário que a variante traduzida testa: **se a reversão
falhar, a captura ainda se vira?**

## Proveniência

- `crm-case-translated.html` é a captura real, com a PII substituída.
- `crm-case-original.html` foi derivado dela aplicando o mapeamento
  português → original **observado numa captura real do mesmo formulário sem
  tradução** (um caso irmão). O mapeamento não sai do dicionário do código:
  é uma tabela congelada no fixture, para que editar o dicionário de
  `label-resolver.js` não mude o gabarito e o teste não vire circular.

## PII

Toda a PII foi substituída por dados fictícios, preservando a **forma** e as
**identidades relativas** — que é do que a raspagem depende:

| Real | No fixture |
|---|---|
| e-mail do cliente | `cliente.teste@example.com` (mascarado: `cli****te@example.com`) |
| telefone | `+55 011999990000` |
| nome do anunciante | `Ana Teste` / `Exemplo` |
| site | `exemplo-entregas.com` |
| CID | `1234567890` |
| case IDs | `7-1111000011111`, `2-2222000022222`, `9-3333000033333` |
| AM | `bianca.alves@google.com` / `Bianca Alves` |
| dono do caso (assignee) | `marco.dias@` |
| demais 54 contatos | `contatoNN@google.com` |

`ads-support@google.com` foi **mantido**: é endereço de robô, não é PII, e a
heurística do AM depende de conseguir descartá-lo.

A distinção entre AM e assignee é preservada de propósito: é ela que sustenta
a regra de negócio de que **o BCC é o AM, nunca o dono do caso**.

## Como atualizar

Quando o CRM mudar o DOM, recapture o `<body>` de uma tela de caso, aplique a
mesma substituição de PII da tabela acima e regenere as duas variantes. Rode
`npm run test:scraping` para ver o que quebrou.
