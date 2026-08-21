#!/usr/bin/env bash
#
# Promove UMA implantação do Apps Script para a versão que está no HEAD do
# projeto (ou seja, o que o `clasp push -f` do passo anterior acabou de
# enviar). Chamado por .github/workflows/deploy.yml, uma vez por ambiente.
#
# Existe como script, e não inline no YAML, porque os dois ambientes rodam
# exatamente o mesmo corpo - só mudam o ID e o rótulo. Duplicar isso no
# workflow é como uma das metades acaba ficando para trás na próxima vez que
# alguém mexer aqui.
#
# Espera duas variáveis de ambiente:
#   DEPLOYMENT_ID  o ID da implantação a promover
#   AMBIENTE       rótulo humano ("produção" / "desenvolvimento"), só para o log
#
# Precisa ser rodado a partir da raiz do repositório.

set -euo pipefail

: "${DEPLOYMENT_ID:?DEPLOYMENT_ID não definido}"
: "${AMBIENTE:?AMBIENTE não definido}"

# Guarda contra o placeholder: enquanto a implantação de desenvolvimento não
# tiver sido criada de verdade, é melhor o deploy falhar aqui, alto e claro,
# do que o `clasp deploy` receber um ID inválido e o erro se perder no meio
# do log.
case "$DEPLOYMENT_ID" in
    __*__)
        echo "ERRO: DEPLOYMENT_ID de '$AMBIENTE' ainda é o placeholder ($DEPLOYMENT_ID)." >&2
        echo "Crie a implantação e substitua o ID no deploy.yml E no mapa" >&2
        echo "DEPLOYMENTS de src/modules/shared/data-service.js." >&2
        exit 1
        ;;
esac

cd gas-backend

TIMESTAMP="$(date -u +'%Y-%m-%d %H:%M UTC')"
SHORT_SHA="${GITHUB_SHA:0:7}"
DESCRIPTION="Deploy automático ($AMBIENTE) - $TIMESTAMP - commit $SHORT_SHA"

DEPLOY_OUTPUT="$(clasp deploy -i "$DEPLOYMENT_ID" -d "$DESCRIPTION")"
echo "$DEPLOY_OUTPUT"

# Sem GITHUB_STEP_SUMMARY (rodando fora do Actions) o resumo é ignorado.
if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then
    {
        echo "## 🚀 Implantação de $AMBIENTE atualizada"
        echo ""
        echo "- **Quando:** $TIMESTAMP"
        echo "- **Commit:** \`$SHORT_SHA\` (${GITHUB_SHA:-?})"
        echo "- **Deployment ID:** \`$DEPLOYMENT_ID\`"
        echo ""
        echo '```'
        echo "$DEPLOY_OUTPUT"
        echo '```'
    } >> "$GITHUB_STEP_SUMMARY"
fi
