# 📋 CASE NOTES - REGRAS DE STATUS, SUBSTATUS E SNIPPETS

Fonte: diretrizes passadas pelo time (documento "Diretrizes e Regras p/
Claude V2"). Define quando cada status/substatus deve ser usado no Case
Notes e, dentro dele, quais cenários rápidos (snippets) fazem sentido. Use
isso como referência ao criar, mover ou revisar qualquer snippet em
`src/modules/notes/data/notes-data.js` (`scenarioSnippets`).

## Onde isso é aplicado no código

- Os substatus e seus campos de formulário vivem em `SUBSTATUS_TEMPLATES`
  (`notes-data.js`).
- Cada cenário rápido em `scenarioSnippets` declara `substatus: [...]` -
  um array com a(s) chave(s) de `SUBSTATUS_TEMPLATES` em que ele deve
  aparecer. `step-scenarios.js` filtra por esse campo (mais o `type`:
  `'all' | 'bau' | 'lm'`, que é o fluxo do caso, eixo independente do
  status/substatus).
- Um snippet só aparece na tela quando `subStatusKey` bate com uma das
  entradas do seu `substatus` **e** o `type` bate com o fluxo atual do caso.

## SO (Solution Offered)

Só para cenários que mencionam fechamento/encerramento do caso.

| Substatus | Quando usar |
|---|---|
| `SO_Implementation_Only` | Implementação de uma task, criação de algo. |
| `SO_Education_Only` | Testes feitos, dúvidas tiradas - sem implementação ou criação de nada. |
| `SO_Troubleshooting_Only` | Testes + alterações + fechamento do caso. |

## NI (Need Info)

Para todos os casos em que estamos aguardando algo para seguir ou fechar.

| Substatus | Quando usar |
|---|---|
| `NI_Awaiting_Validation` | Implementação completa, aguardando registro de impressões/conversões. |
| `NI_Awaiting_Inputs` | Não é possível concluir a implementação por pendência do lado do anunciante (ex: telefone inválido, falta de acessos). |
| `NI_Attempted_Contact` | Tentativa de contato com o anunciante sem sucesso (ex: não atende, cai na caixa postal). |
| `NI_In_Consult` | Aguardando retorno do Consult ou revisão de Feed (Shopping) para avançar com a consultoria. |

## IN (Inactive / Solution Offered Inactive)

Usado quando não é possível realizar a implementação e o caso será
encerrado.

| Substatus | Quando usar |
|---|---|
| `IN_Not_Interested` | Anunciante não tem interesse em prosseguir, ou só faz perguntas gerais sem implementar nada. |
| `IN_Not_Reachable` | Não é possível contatar o anunciante (número incorreto ou sem resposta na última tentativa). |
| `IN_Not_Ready` | Anunciante não está pronto pra implementação (ex: sem acesso ao site, dev indisponível, site em reestruturação). |
| `IN_Out_of_Scope_Rerouted` | Solicitação do cliente está fora do escopo do time. |
| `IN_Infeasible` | Não é possível implementar por complexidade técnica/estrutura do site (**não** por limitação do Google). |
| `IN_Troubleshooting_Transferred` | Passos de troubleshooting não resolvem o problema; caso direcionado a outro time. |
| *(sem substatus correspondente hoje)* | **Instructions Shared** - instruções de implementação foram passadas, mas o anunciante declara falta de interesse em concluir naquele momento. |
| *(sem substatus correspondente hoje)* | **Reschedule Limit Exceed** - anunciante pede reagendamento após já ter excedido o limite permitido, sem ter iniciado a implementação. |
| *(sem substatus correspondente hoje)* | **Other** - cenário que não se encaixa em nenhum outro substatus de IN. |

## AS (Assigned)

Sempre que um caso é atribuído ou precisa reagendar a consultoria -
implementação ainda precisa de mais algum passo.

| Substatus | Quando usar |
|---|---|
| `AS_Reschedule_1` | Anunciante/AM solicita reagendamento, ou excedeu o tempo da consultoria e precisa agendar nova data. |
| `AS_Acceptable_Reschedule` | Reagendamento além do permitido por fator maior (sem internet/luz, saúde) ou quando a implementação vai precisar de correções com o cliente em nova data. |

## DC (Discard)

Cenários atípicos onde o encerramento imediato é necessário.

| Substatus | Quando usar |
|---|---|
| *(sem substatus correspondente hoje - código só tem `DC_Other`, que não é isto)* | **Authentication Failed** - falha em todas as tentativas de autenticação da conta com o anunciante; caso precisa ser encerrado. |

## Gaps conhecidos entre este documento e `SUBSTATUS_TEMPLATES`

Levantado durante a reorganização de snippets (ver histórico de
`notes-data.js`) - ainda não resolvido, fica registrado aqui pra não se
perder:

- `IN_Other`, `IN_Instructions_Shared` e `IN_Reschedule_Limit_Exceed` são
  substatus válidos de IN nesta tabela, mas não existem em
  `SUBSTATUS_TEMPLATES` (não têm formulário próprio hoje).
- `DC_Other` existe em `SUBSTATUS_TEMPLATES`, mas não corresponde a nada
  descrito aqui para DC (o único substatus real de DC é `Authentication
  Failed`, que não está implementado).
- `IN_Out_of_Scope_Unable_to_Transfer` e `IN_Out_of_Scope_Email_to_Seller`
  existem em `SUBSTATUS_TEMPLATES` mas não aparecem neste documento (só
  `Out of Scope (Rerouted)` é mencionado) - possivelmente variações internas
  do mesmo substatus que nunca foram documentadas formalmente.

Resolver isso significa mudar `SUBSTATUS_TEMPLATES` (e portanto o
formulário que o agente vê) - decisão intencionalmente adiada para a futura
análise de UX do módulo de Case Notes.
