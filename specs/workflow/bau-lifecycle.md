# ⚙️ BAU LIFECYCLE (Regras de Negócio)

## Ciclo de Vida do Caso (Status)
O Back-end e o TL Dashboard devem rotear e exibir as informações estritamente baseadas nas seguintes flags de status:
1. `PENDING_TL_CREATION`: Aguardando aprovação para criar caso BAU. (Aba 1 do TL Dashboard)
2. `PENDING_TL_DISCARD`: Aguardando aprovação para descarte. (Aba 2 do TL Dashboard - deve ter design simplificado)
3. `CREATED`: Aprovado e criado.
4. `DISCARDED`: Descarte aprovado.
5. `REJECTED`: Ação rejeitada pelo TL.
6. `CANCELED_BY_AGENT`: Agente desistiu/excluiu o caso antes da avaliação.

## Aprovação de Abertura (Caso Filho)
- **O ID do caso gerado é obrigatório.** Ao aprovar um pedido de abertura
  (`PENDING_TL_CREATION` → `CREATED`), o TL informa o ID do caso BAU que ele
  acabou de criar no CRM. Sem ele a aprovação é **recusada** — no modal e de novo
  no servidor, porque a tela nunca é a fronteira.
- A exigência vale **só** para `APPROVED_CREATION`. As outras três decisões
  (`REJECTED_CREATION`, `CONFIRMED_DISCARD`, `KEPT_ACTIVE`) não geram caso novo e
  não pedem ID nenhum.
- O ID viaja para o e-mail `AGENT_BAU_CREATED`: antes, o agente era avisado de
  que o caso tinha sido criado e **não recebia o número**.

## Justificativa da Recusa

- **Dizer não exige dizer por quê.** Ao **rejeitar uma abertura**
  (`REJECTED_CREATION`) ou **negar um descarte** (`KEPT_ACTIVE`), a liderança
  escreve uma justificativa. Sem ela a decisão é **recusada** — no modal e de novo
  no servidor, porque a tela nunca é a fronteira.
- **Só nas duas negativas.** `APPROVED_CREATION` e `CONFIRMED_DISCARD` aceitam o
  pedido do agente e não pedem nada.
- **Cuidado com o `Status`:** ele não diz qual das quatro decisões foi tomada.
  `DISCARDED` tanto confirma um descarte quanto rejeita uma criação, e `CREATED`
  tanto aprova uma criação quanto nega um descarte. Quem decide se a justificativa
  é exigida é sempre `Processed_Action` (`decisionRequiresJustification`), nunca
  o `Status` — vale para o servidor e para a tela.
- A justificativa vai para o **e-mail do agente** (`AGENT_CREATION_REJECTED` e
  `AGENT_DISCARD_DENIED`) e fica visível no histórico junto com a decisão.

## Histórico (aba 3 do TL Dashboard)

- `getWeeklyHistory` devolve o **registro completo** (o mesmo `mapBAURow_` da
  fila) mais os campos de resolução — `action`, `processedBy`, `processedAt`,
  `Child_Case_ID` e `TL_Justification`.
- Clicar num caso resolvido abre a **mesma vista de detalhes** da fila, com uma
  zona "Decisão" no topo e **sem** o rodapé de aprovar/rejeitar.
- O selo do desfecho sai de `action`, não de `status`, pela ambiguidade descrita
  acima.

## TL Dashboard (Gestão)
- **Ordenação (FIFO):** As filas devem ser sempre ordenadas do mais antigo para o mais recente com base na coluna `Data_Envio`. O TL aprova primeiro quem está esperando há mais tempo.
- **Separação de Abas:** NUNCA misture casos de Abertura com casos de Descarte na mesma visualização.

## Resumo para o caso BAU (TL Dashboard)

- O **último** bloco da vista de detalhes é o resumo do caso em texto humano — o
  que o TL cola dentro do caso BAU que acabou de abrir no CRM. A vista é
  organizada em três zonas (ADR-0015): cabeçalho, briefing (leitura) e dados
  (copiáveis). *O que deve ser feito*, *motivo*, *justificativa* e *agendamento*
  vivem no briefing e **não** têm botão de copiar; o resumo é o que carrega essa
  informação para o outro sistema.
- **Nome e sobrenome do anunciante são campos separados** nos dados, e sobrenome
  ausente é exibido e copiado como `N/A` — campo vazio não diz se o dado falta ou
  se a pessoa não tem sobrenome.
- **Headline fixa:** `Caso LM para BAU`, igual nos três idiomas. É o marcador
  pelo qual a operação identifica o caso, não uma frase para ler.
- **Conteúdo, por subtração:** entra o que o caso filho não sabe sozinho — caso
  de origem (LM), quem abriu e quando, o que aconteceu (motivo da não
  implementação + justificativa do agente), o que deve ser feito, as tasks e o
  AM. Fica de fora o que já está no caso por ser da mesma conta do anunciante
  (nome, CID, site, sales program) e a **PII** (e-mail e telefone), que não
  circula colada num texto.
- **Nada é pedido a mais ao agente:** o texto é concatenado do que o formulário
  já coleta.
- **Idioma:** o do *atendimento* (`Idioma`, coluna 11), **não** o da tela do TL.
  Quem lê o texto do outro lado é o agente de BAU que vai falar com o anunciante.
- **Só no fluxo de criação.** Um pedido de descarte não ganha resumo: não há caso
  BAU para abrir, e a headline seria mentira num texto que pede para fechar.

## Retenção e arquivamento

- `runWeeklyBackup()` **copia** os casos resolvidos (`CREATED`, `DISCARDED`) para
  `Archive_BAU` e **não remove nada** da planilha de casos — é ela que alimenta o
  histórico do TL e guarda o `Child_Case_ID`. Ver ADR-0014.
- A idempotência vem dos IDs já presentes no arquivo, não de marca na origem.
- Não existe reset nem janela de retenção. Se a planilha um dia pesar, o caminho
  é limitar a leitura (janela de linhas ou cache), **não** voltar a deletar.

## Segurança na Edição
- **Disclaimer Obrigatório:** O fluxo de Edição só pode iniciar após o agente confirmar via Modal/Dialog a mensagem: *"Atenção: Para editar as informações, você deve estar com a página deste Caso específico aberta. Caso contrário, os dados capturados estarão incorretos."*