#!/usr/bin/env bash
#
# Extrai de CHANGELOG.md a seção de UMA versão, para virar o corpo do GitHub
# Release. Chamado por .github/workflows/release.yml quando uma tag `v*` é
# empurrada.
#
# Espera uma variável de ambiente:
#   VERSAO   a versão sem o "v" (ex: "6.0.0"), normalmente ${GITHUB_REF_NAME#v}
#
# Escreve a seção no stdout. Precisa ser rodado a partir da raiz do repositório.
#
# O workflow chama isto como `bash scripts/extract-changelog.sh`, e não
# `./scripts/...`, pelo mesmo motivo documentado em promote-deployment.sh: o
# repositório costuma ser clonado num volume Windows montado, onde o bit de
# execução não persiste.
#
# Por que falhar em vez de seguir com o corpo vazio: um Release publicado sem
# notas é pior que um workflow vermelho. O vermelho avisa; o Release vazio fica
# lá parecendo intencional, e é exatamente o que acontece quando alguém cria a
# tag antes de fechar a seção no CHANGELOG. Esse é o erro que este script
# existe para pegar.

set -euo pipefail

if [[ -z "${VERSAO:-}" ]]; then
  echo "ERRO: a variável VERSAO não foi definida." >&2
  exit 1
fi

if [[ ! -f CHANGELOG.md ]]; then
  echo "ERRO: CHANGELOG.md não encontrado. Rode a partir da raiz do repositório." >&2
  exit 1
fi

# Pega tudo entre "## [VERSAO]" e o próximo cabeçalho "## [", sem incluir
# nenhum dos dois. O -v é o jeito seguro de passar a versão para o awk sem
# interpolar no meio do programa.
SECAO="$(awk -v alvo="## [${VERSAO}]" '
  index($0, alvo) == 1 { dentro = 1; next }
  dentro && /^## \[/   { exit }
  dentro               { print }
' CHANGELOG.md)"

# Remove linhas em branco do começo e do fim, e as subseções vazias que o
# template do Keep a Changelog deixa para trás ("### Added" sem nada embaixo).
SECAO="$(printf '%s\n' "$SECAO" | awk '
  /^### / { cabecalho = $0; tem_conteudo = 0; next }
  /^[[:space:]]*$/ { if (cabecalho != "" && !tem_conteudo) next }
  {
    if (cabecalho != "" && !tem_conteudo) { print ""; print cabecalho; tem_conteudo = 1 }
    print
  }
')"

SECAO="$(printf '%s\n' "$SECAO" | sed -e '/./,$!d' | tac | sed -e '/./,$!d' | tac)"

if [[ -z "${SECAO// /}" ]]; then
  echo "ERRO: não achei conteúdo para a versão ${VERSAO} em CHANGELOG.md." >&2
  echo "" >&2
  echo "Antes de criar a tag v${VERSAO}, mova o que está em '## [Unreleased]'" >&2
  echo "para uma seção '## [${VERSAO}] - AAAA-MM-DD'. Ver RELEASE.md." >&2
  echo "" >&2
  echo "Seções encontradas no CHANGELOG:" >&2
  grep -n '^## \[' CHANGELOG.md >&2 || true
  exit 1
fi

printf '%s\n' "$SECAO"
