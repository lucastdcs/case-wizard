# 0021 — Lembrete de qualidade no boot: cartão não modal, depois dos modais

**Date**: 2026-10-30
**Status**: Accepted

## Context

O pedido: em todo boot, lembrar o agente de seguir as diretrizes de QA e o SOP do
segmento do caso, e de que o Case Wizard só ajuda a preencher — a qualidade do
tratamento é do agente. Três restrições vieram junto: **não pode atrapalhar o uso
do CRM** enquanto está na tela, **tem de seguir o design do projeto**, e um **som
leve** é bem-vindo.

O boot já disputa a tela: splash, e (no primeiro uso ou em versão nova) o tour do
Onboarding ou o modal do Changelog, ambos abertos 2,5s depois, quando o idioma do
perfil resolve. O idioma do perfil **não é persistido** (`applyProfileLanguage`
chama `setLanguage(..., { persist: false })`), então um agente ES só tem a
interface em espanhol depois da resposta da planilha `People`.

## Decision

1. **Componente próprio, não `showToast()`**: `src/modules/disclaimer/qa-disclaimer.js`.
   O toast some em 4s sem como pausar, não tem botão e toca `playSuccess`, o som de
   confirmação — um lembrete não confirma nada, e 4s não bastam para duas frases
   numa segunda língua.
2. **Cartão não modal, canto inferior esquerdo**: vidro claro, ícone, título, texto
   e "Entendi". Sem fundo escurecido, sem trava de rolagem, sem roubar o foco, sem
   tratar o Esc (que é do CRM). Fica no lado oposto da pílula (que mora na borda
   direita). Some sozinho em 12s; mouse ou foco dentro dele seguram o relógio
   (WCAG 2.2.1), e ao soltar nunca volta com menos de 4s.
3. **Só depois de splash, tour e changelog**, via `Promise.allSettled` em `app.js`
   (+1,2s de respiro para o chime da pílula e o toast de fechamento). Para isso
   `initOnboarding()` e `checkAndShowChangelog()` passaram a devolver uma promessa
   que resolve no fechamento. Por consequência o aviso também espera o idioma do
   perfil — é o que garante que o ES não o veja em português.
4. **Idioma da interface** (`getLanguage`), não o do atendimento: o texto fica na
   tela, não vai para o caso (ADR-0016).
5. **Som próprio**, `SoundManager.playNotice()`: duas notas descendentes e baixas
   (Sol→Mi). Não reaproveita `playNotification`, que o Broadcast já toca no boot
   quando há aviso novo. Respeita o mudo de Configurações.
6. **Sem opt-out de aviso.** Só o som tem chave (o mudo global). O lembrete não é
   configurável por design.

## Alternatives considered

- **`showToast()` com `duration` maior**: reaproveita tudo, mas continua sem botão,
  sem pausa e com o som de sucesso; e o centro-inferior é onde os toasts de
  fechamento dos modais caem.
- **Modal que exige confirmação**: garante a leitura, mas é exatamente o que o
  pedido proíbe — bloqueia o CRM a cada boot e vira clique automático em uma semana.
- **Faixa fixa no topo**: sobrepõe o cabeçalho do CRM e não some.
- **Mostrar no boot sem esperar os modais**: no primeiro uso o relógio de 12s correria
  por baixo do tour, e quem mais precisa do lembrete — o agente novo — não o leria.

## Consequences

- O aviso aparece **uma vez por boot**, não a cada clique no bookmarklet: o
  segundo clique na mesma aba só repete a splash (`window.techSolInitialized`).
- Com o backend lento ou bloqueado o aviso chega tarde (o JSONP do perfil tem
  timeout de 15s) e em português. Aceito: é preferível a mostrá-lo no idioma errado.
- Repetição decai: o mesmo texto em todo boot treina o olho a ignorá-lo. O desenho
  mitiga (curto, sem bloquear, sem exigir clique), mas não elimina; se a auditoria
  de QA mostrar que o lembrete não está surtindo efeito, o próximo passo é variar ou
  ancorar o aviso no momento de gerar a nota, não aumentá-lo.
- O ES e o EN são traduções do texto em PT feitas sem revisão de falante nativo
  (item que o `PLAN.md` já cobra para o resto do espanhol).
