// scripts/credit-footer.mjs
//
// O rodapé real dos dashboards do Apps Script, para os smokes de navegador.
//
// Os smokes leem o HTML do disco e trocam as tags de template por vazio. Foi
// assim que o rodapé (`<?!= CW_CREDIT ?>`) ficou sem teste nenhum: ele nunca
// chegava a ser renderizado. Esta função avalia o MESMO Código.js que o Apps
// Script roda e devolve o que `buildCreditHtml()` imprimiria, para o smoke ver
// o que o TL e a Central vão ver.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

/** `raiz` é a raiz do repositório. Devolve `{ html, docsUrl }`. */
export function rodapeDosDashboards(raiz) {
    const ctx = {};
    vm.createContext(ctx);
    // Só declarações são avaliadas; nada do corpo do doGet roda aqui.
    vm.runInContext(
        readFileSync(resolve(raiz, 'gas-backend/Código.js'), 'utf8') +
        '\n;globalThis.__rodape = { html: buildCreditHtml(), docsUrl: CW_DOCS_URL };',
        ctx);
    return ctx.__rodape;
}

/**
 * Lê, na página aberta, o link da documentação do rodapé. `null` se não houver.
 * `livre` é o que importa para o agente: o centro do link não pode estar sob
 * outro elemento, senão o link existe, aparece e não recebe o clique.
 */
export function lerLinkDeDocs(page) {
    return page.evaluate(() => {
        const a = Array.from(document.querySelectorAll('#cw-credit a'))
            .find((l) => l.href.includes('/presentation/d/'));
        if (!a) return null;
        const r = a.getBoundingClientRect();
        const noCentro = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return {
            href: a.href,
            alvo: a.target,
            texto: a.textContent.trim(),
            visivel: r.width > 0 && r.height > 0,
            livre: noCentro === a || a.contains(noCentro),
            dentroDaJanela: r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight,
        };
    });
}
