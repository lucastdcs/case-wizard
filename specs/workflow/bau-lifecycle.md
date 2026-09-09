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

## TL Dashboard (Gestão)
- **Ordenação (FIFO):** As filas devem ser sempre ordenadas do mais antigo para o mais recente com base na coluna `Data_Envio`. O TL aprova primeiro quem está esperando há mais tempo.
- **Separação de Abas:** NUNCA misture casos de Abertura com casos de Descarte na mesma visualização.

## Segurança na Edição
- **Disclaimer Obrigatório:** O fluxo de Edição só pode iniciar após o agente confirmar via Modal/Dialog a mensagem: *"Atenção: Para editar as informações, você deve estar com a página deste Caso específico aberta. Caso contrário, os dados capturados estarão incorretos."*