# PROJECT BRIEF — Case Wizard (TechSol Operations Assistant)

> **Sobre este documento:** este arquivo é matéria-prima para outra IA (ou pessoa) gerar, a partir dele, documentação de usuário e uma apresentação de slides. Ele reúne o que já existe no repositório (README, docs/, specs/, código-fonte) e traduz tudo para linguagem acessível a não-programadores. Trechos marcados com **⚠️ PRECISA CONFIRMAÇÃO** são inferências ou rascunhos feitos a partir de evidência indireta do código — o dono do projeto deve revisar e ajustar antes de considerar esse conteúdo definitivo, principalmente ao gerar materiais que serão distribuídos para o time.

---

## 1. Resumo executivo

O **Case Wizard** (nome interno de produto: *TechSol Operations Assistant*) é uma camada de automação que roda **por cima do CRM corporativo** usado pelos agentes de suporte. Ele não substitui o CRM nem exige uma instalação tradicional: é ativado por um **bookmarklet** (um favorito de navegador especial) que injeta funcionalidades extras diretamente na tela do CRM — preenchimento automático de notas de caso, e-mails, roteiros de chamada, avisos da equipe e atalhos para ferramentas internas — sem que o agente precise sair da tela onde já está trabalhando.

O objetivo é reduzir trabalho manual repetitivo (digitar a mesma nota de caso todo dia, montar e-mail do zero, procurar links espalhados) e padronizar a comunicação entre agentes, times e clientes.

Hoje o projeto é usado por um grupo pequeno de agentes/desenvolvedor(es) próximos do time que o mantém. O objetivo de médio prazo é o **rollout para o time inteiro**.

---

## 2. O problema e por que o projeto existe

**⚠️ PRECISA CONFIRMAÇÃO** — o repositório não documenta explicitamente a dor original que motivou o projeto (não há um "problem statement" escrito em nenhum README, doc ou spec). O que segue é a inferência mais direta que dá para tirar do próprio produto — o dono do projeto deve validar, ajustar ou completar antes de repassar adiante:

- Agentes de suporte de CRM (aparentemente ligados a atendimento Google Ads/Analytics, a julgar pelos links e SOPs embutidos no módulo de links) precisam, para cada caso atendido, redigir **notas de caso padronizadas** (em dois formatos, BAU e LM, em português e espanhol), responder **e-mails com texto técnico consistente**, seguir **roteiros de chamada** com o cliente, e ainda navegar entre dezenas de **links internos** (SOPs, dashboards, formulários) espalhados por diferentes sistemas da empresa.
- Fazer tudo isso manualmente é lento, sujeito a erro de padronização (cada agente escreve a nota de um jeito) e depende de memória para lembrar onde fica cada link ou qual é o texto certo para cada situação.
- O Case Wizard existe para **automatizar o preenchimento repetitivo** (notas, e-mails, dados do cliente capturados da própria tela) e **centralizar o acesso** (links, avisos da equipe, disponibilidade de escalação) num único painel flutuante sempre visível, aumentando a velocidade de atendimento e a consistência da comunicação.

---

## 3. Quem usa

**⚠️ PRECISA CONFIRMAÇÃO** — nenhum arquivo do repositório declara o tamanho do grupo de usuários atual nem o plano de rollout. Isso precisa vir diretamente do dono do projeto. Pontos que valem a pena preencher antes de gerar a documentação final e os slides:

- Quantos agentes usam hoje, e são de qual time/fila especificamente?
- O que diferencia um usuário "beta" atual de um usuário do rollout maior (permissão de instalação, treinamento prévio, etc.)?
- Existe um cronograma ou marco para o rollout completo?
- O perfil configurável no módulo de Configurações (papel, segmento, idioma — ver `src/modules/configs/`) sugere que o produto já foi pensado para atender **múltiplos segmentos e idiomas** (pelo menos PT e ES aparecem nos templates de notas) — o que indica que o público-alvo do rollout provavelmente não é homogêneo.

---

## 4. O que é o Case Wizard — visão geral em linguagem simples

Pense no Case Wizard como um **"assistente flutuante"** que aparece em cima da tela do CRM, como uma pílula ou botão que o agente pode arrastar para qualquer canto da tela. Clicando nela, se abrem pequenas janelas (popups) com ferramentas específicas — sem nunca sair da página do caso que o agente está atendendo.

Ele não é uma extensão de navegador instalada permanentemente: é ativado sob demanda, colando um link especial (bookmarklet) na barra de favoritos e clicando nele sempre que o agente for começar a trabalhar. Uma vez clicado, ele "gruda" na página atual até ela ser fechada ou recarregada.

---

## 5. Funcionalidades principais (o que o usuário ganha na prática)

### 📝 Notas de caso automáticas (Case Notes)
O agente escolhe o Status e o Sub-status do atendimento numa lista visual, marca as tarefas/cenários que se aplicam, e o sistema **monta sozinho o texto final da nota**, já no formato e no idioma certos (BAU/LM, PT/ES), pronto para colar no CRM. Se o agente for interrompido no meio do preenchimento, pode **"estacionar"** o caso com um clique e retomar depois de onde parou — e há um sistema de **auto-save de emergência a cada 5 segundos**, então quedas de internet ou fechamento acidental de aba não fazem o trabalho se perder.

### 📧 E-mails automáticos (Email Assistant + Quick Email)
Templates de e-mail prontos, com detecção inteligente de rascunhos "sujos" deixados pelo próprio CRM (o sistema identifica e limpa rascunhos fantasmas antes de montar um novo e-mail do zero). Existe também um módulo separado de **respostas rápidas** ("Quick Email"), com atalhos ligados diretamente ao sub-status escolhido nas notas — o agente não precisa procurar o template certo, ele já aparece sugerido.

### 📞 Roteiro de chamada guiado (Call Script Assistant)
Um checklist interativo, com barra de progresso, que guia o agente durante a ligação com o cliente (disponível em PT/ES/EN, para os fluxos BAU e LT), capturando ao vivo dados como e-mail e ID do cliente direto da tela.

### 🌎 Fusos horários (Timezone Assistant)
Mostra o horário local de cada país atendido e ajuda a montar um horário de reunião que funcione tanto para o agente quanto para o cliente — sem precisar calcular fuso na mão.

### 🅿️ Escalação BAU (BAU Central)
Um assistente guiado para abrir ou descartar um caso BAU (fluxo interno de escalação), com um painel próprio onde o agente acompanha o status dos casos que ele mesmo escalou (aprovado, rejeitado, aguardando revisão do time líder). O time líder, por sua vez, tem um painel próprio (TL Dashboard) que lista os pedidos pendentes numa fila por ordem de chegada, para aprovar ou recusar.

### 🔗 Central de links internos
Um diretório organizado por categoria (Tarefas, Ads, Analytics, entre outras) com atalhos diretos para dashboards, SOPs (procedimentos padrão), formulários de escalação e ferramentas internas da empresa — em vez de o agente ter que guardar ou procurar cada link manualmente.

### 📚 Minha Biblioteca
Um espaço pessoal para o agente salvar seus próprios modelos de nota, e-mail ou texto, sincronizado automaticamente entre dispositivos.

### 📢 Avisos da equipe (Broadcast)
Um mural de avisos importantes (ex: disponibilidade de escalação BAU, comunicados do time) que aparece direto na tela do agente, sem precisar abrir planilhas ou canais externos. O sistema lembra quais avisos o agente já leu.

### ✨ Assistente de IA ("Magic Wand")
**⚠️ Funcionalidade existe no código mas não está documentada em nenhum README/doc atual — vale confirmar se está ativa/liberada para uso geral.** Um ícone de varinha mágica aparece ao lado de qualquer campo de texto onde o agente estiver digitando, oferecendo ações como "profissionalizar o texto", "resumir para o log do caso", "traduzir para inglês" e "expandir/detalhar", usando IA generativa (Google Gemini). Requer que o próprio agente configure uma chave de API pessoal na primeira vez que for usar.

### 👋 Onboarding para novos usuários
Na primeira vez que o Case Wizard é ativado num navegador, aparece um tutorial em slides explicando as funcionalidades principais — pensado exatamente para o momento de apresentar a ferramenta a alguém que nunca usou. É um ponto de partida natural para reaproveitar no rollout maior.

### 🆕 Novidades da versão (Changelog in-app)
Sempre que uma nova versão é lançada, aparece automaticamente uma tela de "o que mudou", em formato de slides, explicando as novidades ao usuário sem que ele precise procurar em lugar nenhum.

### ⚙️ Configurações e perfil
O agente define seu papel, segmento e idioma de atendimento, ajusta preferências de som e tem acesso a um link direto para reportar bugs ou sugerir melhorias.

### 🎨 Experiência (sons e visual)
Feedback sonoro para ações (sucesso, erro, notificação) e um som de abertura ao iniciar a ferramenta; toda a interface foi desenhada para se parecer nativamente com os componentes visuais do Google (Material Design), para não destoar do CRM.

---

## 6. Fluxo de uso ponta a ponta (dia a dia do agente)

**⚠️ Narrativa reconstruída a partir do código e das specs de negócio (`specs/workflow/bau-lifecycle.md`, `docs/CORE_MODULES.md`) — vale uma checagem rápida do dono do projeto para confirmar que reflete o uso real.**

1. **Início do turno:** o agente abre o CRM normalmente e clica no bookmarklet (favorito) do Case Wizard salvo no navegador. Uma pílula flutuante aparece na tela — se for a primeira vez, um tutorial em slides se abre explicando as funções principais.
2. **Abertura de um caso:** o agente abre o caso do cliente no CRM como sempre faria. O Case Wizard, rodando por cima, já está pronto para capturar dados da tela (nome do cliente, e-mail, URL) automaticamente quando necessário.
3. **Durante o atendimento:** conforme o agente avança (ex: numa ligação), pode abrir o roteiro de chamada guiado, consultar o fuso horário do cliente para agendar um retorno, ou usar a varinha de IA para ajustar um texto que está digitando.
4. **Ao finalizar o caso:** o agente abre a janela de notas, seleciona o status/sub-status e as tarefas realizadas; o texto da nota é montado automaticamente e inserido no editor do CRM. Se precisar enviar um e-mail, escolhe um template (ou uma resposta rápida already ligada ao sub-status) e o Case Wizard insere o texto pronto, já limpando qualquer rascunho velho.
5. **Caso precise de escalação (BAU):** o agente abre o assistente de BAU Central, preenche o formulário guiado de abertura (ou descarte) do caso, e a solicitação entra na fila de aprovação do time líder — que vê e aprova pelo TL Dashboard, respeitando ordem de chegada.
6. **Ao longo do dia:** avisos da equipe aparecem automaticamente na tela (ex: disponibilidade de horários de escalação); o agente pode consultar a central de links sempre que precisar de um SOP ou dashboard interno, sem sair do CRM.
7. **Interrupções:** se o agente for interrompido no meio do preenchimento de uma nota, pode "estacionar" o trabalho com um clique e retomar mais tarde exatamente de onde parou — inclusive se a aba fechar sem querer, graças ao auto-save de emergência.

---

## 7. Arquitetura resumida (em linguagem acessível)

O Case Wizard **não é instalado como um programa ou extensão** — ele é ativado por um **bookmarklet**: um link especial salvo como favorito do navegador que, ao ser clicado, injeta um pequeno programa dentro da página do CRM que já está aberta. É como colar uma camada extra por cima da tela existente, sem alterar o CRM em si.

Ele é formado por três partes:

1. **A "camada visual" (front-end):** o código que roda no navegador do agente, desenha a pílula flutuante, os popups e captura informações da tela (como nome do cliente). Esse código fica hospedado publicamente (GitHub Pages) e é baixado toda vez que o agente clica no bookmarklet — por isso, atualizações chegam automaticamente a todo mundo sem precisar reinstalar nada.
2. **O "servidor" (Google Apps Script):** como o projeto não tem um servidor tradicional, ele usa o Google Apps Script — uma ferramenta do Google que permite rodar código como se fosse uma API — para receber pedidos do front-end (por exemplo, "salvar essa escalação BAU" ou "buscar os avisos mais recentes").
3. **O "banco de dados" (Google Sheets):** todas as informações — casos BAU, avisos, perfis de usuário, templates salvos — são guardadas numa planilha do Google Sheets, que funciona como um banco de dados simplificado. Cada linha da planilha é um registro (ex: uma escalação de caso), e cada coluna um campo (ex: status, data de envio, e-mail do cliente).

Só usuários autenticados com conta do mesmo domínio da empresa conseguem usar a parte de "servidor" — não é uma ferramenta pública na internet.

Existe também uma versão "de desenvolvimento" separada da versão "de produção" (estável): novidades são testadas primeiro numa e só depois promovidas para todo mundo usar, para reduzir risco de quebrar o fluxo de trabalho dos agentes.

---

## 8. Limitações conhecidas e cuidados

- **Depende da estrutura visual do CRM:** o Case Wizard "lê" a tela do CRM procurando botões e campos específicos. Se a empresa dona do CRM mudar o layout ou os nomes dos elementos na tela, alguma funcionalidade pode parar de funcionar até o Case Wizard ser atualizado. Quando isso acontece, o sistema é projetado para **falhar em silêncio** (não travar) e deixar o agente preencher aquele campo manualmente.
- **Bloqueio de rede corporativa:** o Case Wizard precisa baixar seu código de um domínio externo (`github.io`). Se a rede da empresa bloquear esse domínio, a ferramenta simplesmente não carrega.
- **Exige conta do domínio da empresa:** as funcionalidades que dependem do "servidor" (BAU, avisos, perfil, biblioteca pessoal) só funcionam para quem está autenticado com uma conta Google Workspace da própria empresa.
- **Preferências não são permanentes:** posição do widget na tela e preferências de som ficam salvas no navegador (`localStorage`). Se o agente limpar o cache/dados de navegação, essas preferências (não os dados de trabalho) são perdidas.
- **Tradução automática do navegador quebra a leitura de dados:** se o navegador estiver traduzindo a página automaticamente, o Case Wizard pode falhar ao capturar informações do caso — por isso ele força a exibição do "idioma original" da página antes de tentar ler qualquer dado.
- **Assistente de IA depende de chave própria:** o recurso de IA (Magic Wand) só funciona se o agente configurar sua própria chave de API do Google Gemini — não vem pronto por padrão, e não passa pelo servidor da empresa (a chamada é direta do navegador do agente para a Google).
- **⚠️ PRECISA CONFIRMAÇÃO — permissões de instalação:** não há, no repositório, nenhuma menção a requisitos de permissão de TI para salvar um bookmarklet (política de navegador corporativo, gerenciamento de extensões, etc.). Se isso for uma barreira real para o rollout, precisa ser levantado com o time de TI antes de expandir para o time inteiro.

---

## 9. Estado atual e o que falta para rollout maior

- **Status declarado no README:** "Estável — v5.2", mantido por Lucas Teixeira / Time TechSol.
- **Nota de inconsistência interna:** a tela de "novidades" (changelog in-app) mostrada aos usuários está registrada até a v5.1, uma versão atrás do que o README declara como atual — vale sincronizar antes de divulgar amplamente, para que novos usuários vejam o histórico de novidades completo.
- Funcionalidades como o Assistente de IA e a Central de Links existem e funcionam no código, mas **não aparecem em nenhuma documentação pública do projeto** (README ou docs/) — o que sugere que podem estar em estágio mais experimental/não oficialmente anunciado, mesmo já estando ativas para quem usa a ferramenta hoje.
- **⚠️ PRECISA CONFIRMAÇÃO — o que falta para o rollout maior:** o repositório não contém nenhum plano ou checklist de rollout (não há um roadmap, board de tarefas ou seção "próximos passos" em nenhum doc). Perguntas que o dono do projeto precisa responder para completar esta seção:
  - Existe algum teste de carga ou validação de que a planilha (Google Sheets) aguenta o volume de todo o time como "banco de dados"?
  - O onboarding em slides e o material de suporte atual são suficientes para um usuário novo sem ajuda de alguém do time, ou ainda depende de explicação pessoal?
  - Existe um processo definido de suporte/bug report para quando o time inteiro começar a usar (hoje há um link de feedback no módulo de Configurações, mas não está claro se há um processo por trás dele)?
  - O uso da chave de API pessoal do Gemini é aceitável em escala (custo, segurança) ou precisa virar uma chave central antes do rollout?

---

## 10. Glossário rápido (para quem não é dev)

- **Bookmarklet:** um favorito de navegador especial que, em vez de abrir um site, executa um pequeno programa na página que já está aberta.
- **CRM:** o sistema onde os agentes atendem os casos dos clientes — é a "casa" onde o Case Wizard é injetado.
- **Google Apps Script:** ferramenta do Google usada aqui como um "servidor" simplificado, que recebe pedidos do Case Wizard e lê/escreve dados na planilha.
- **Google Sheets como banco de dados:** em vez de um banco de dados tradicional, o projeto usa uma planilha do Google como local de armazenamento — cada aba/linha guarda um tipo de informação (casos BAU, avisos, perfis).
- **Front-end / camada visual:** a parte do Case Wizard que o agente vê e usa na tela.
- **BAU:** fluxo interno de escalação de casos que precisam de tratamento especial (abertura ou descarte), aprovado por um time líder.
- **TL Dashboard:** painel usado pelo time líder para aprovar ou recusar as escalações BAU pendentes.
