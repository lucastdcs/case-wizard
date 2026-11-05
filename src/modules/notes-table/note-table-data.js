// src/modules/notes-table/note-table-data.js
//
// Catálogo EMBUTIDO da nota em tabela: os blocos (corpo das tabelas) e os
// segmentos (quais blocos, em que ordem, com que título). É o fallback do agente
// quando a Central não serviu nada, e a origem da semente dos módulos
// `note_blocks` e `note_layouts` (npm run seed:note-layouts).
//
// Copiado do CATALOG de docs/media/case-notes-table/preview.html; o contrato é
// specs/workflow/case-note-table.md (§4), que vence o protótipo. O texto do padrão
// é o `label.en`; `pt`/`es` vazios caem no EN (spec §1). As dicas (`hint`) são
// texto de TELA, por isso têm o PT da tela e caem no PT.
//
// O `id` de uma linha é estável e imutável: rascunhos, condições e traduções
// apontam para ele. Renomear um id aqui é perder o que o agente digitou.

export const NOTE_TABLE_CATALOG = {
    blocks: {
        general: {
            name: 'General details', cols: 4, widths: [16, 16, 46, 22],
            sections: [
                {
                    kind: 'kv', title: 'General Details (Mandatory)',
                    rows: [
                        { id: 'date', label: { en: 'Date:', pt: '', es: '' }, type: 'date', required: true, na: false, visible: true, auto: 'today', hint: { pt: 'Data da call, da tentativa de contato ou do follow-up (YYYY-MM-DD).', es: '', en: '' } },
                        { id: 'speakeasy', label: { en: 'Speakeasy ID:', pt: '', es: '' }, type: 'speakeasy', required: true, na: true, visible: true, hint: { pt: 'ID exato da sessão do SpeakEasy. Várias ligações: separe por vírgula. NA para atendimento offline ou só por e-mail.', es: '', en: '' } },
                        { id: 'substatus', label: { en: 'Sub-status:', pt: '', es: '' }, type: 'derived', required: true, na: false, visible: true, auto: 'substatus', hint: { pt: 'Vem do campo Sub-status no topo.', es: '', en: '' } },
                        { id: 'next_followup', label: { en: 'Next Follow-Up Date:', pt: '', es: '' }, type: 'date', required: true, na: true, visible: true, auto: 'followup', hint: { pt: 'Data do próximo follow-up, ou NA.', es: '', en: '' } },
                        { id: 'task_types', label: { en: 'Task types:', pt: '', es: '' }, type: 'derived', required: true, na: true, visible: true, auto: 'tasks', hint: { pt: 'Vêm das tasks marcadas. NA só se nenhuma task esteve envolvida.', es: '', en: '' } },
                        { id: 'impl_tags', label: { en: 'Implemented tags:', pt: '', es: '' }, type: 'text', required: true, na: true, visible: true, hint: { pt: 'Nome exato das conversion actions criadas, verificadas ou corrigidas, separados por vírgula (ex.: Phone_call, lead_form). NA se não se aplica.', es: '', en: '' } },
                        { id: 'cid', label: { en: 'CID:', pt: '', es: '' }, type: 'cid', required: true, na: true, visible: true, auto: 'cid', hint: { pt: 'CID de 10 dígitos (XXX-XXX-XXXX) confirmado com o anunciante. Vários: separe por vírgula.', es: '', en: '' } },
                        { id: 'consent', label: { en: 'Checked and obtained recording consent from the customer before proceeding with the call?', pt: '', es: '' }, type: 'yesno', required: true, na: true, visible: true, auto: 'consent', hint: { pt: 'Fora da Europa o padrão é Yes (a alternativa fica em "Alterar"). No caso da Europa o agente marca. NA para NI - Attempted Contact e IN - Not Reachable.', es: '', en: '' } },
                        { id: 'call_summary', label: { en: 'Call Summary:', pt: '', es: '' }, type: 'long', required: true, na: false, visible: true, hint: { pt: 'Resumo curto do que aconteceu na call ou no e-mail.', es: '', en: '' } },
                        { id: 'substatus_reason', label: { en: 'Sub-status Reason:', pt: '', es: '' }, type: 'long', required: true, na: false, visible: true, hint: { pt: 'Justificativa exata do sub-status escolhido.', es: '', en: '' } },
                        { id: 'additional_info', label: { en: 'Additional information:', pt: '', es: '' }, type: 'long', required: false, na: true, visible: true, hint: { pt: 'Opcional. Vazio sai como NA.', es: '', en: '' } },
                    ],
                },
                {
                    kind: 'kv', title: 'Screenshots (Mandatory)',
                    rows: [
                        { id: 'website', label: { en: 'Website URL worked upon:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Print do Tag Assistant mostrando o site conectado. NA só se nenhuma task esteve envolvida.', es: '', en: '' } },
                        { id: 'qplus', label: { en: 'Q+ entry:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Link do print do Q+ preenchido ao fechar ou transferir o caso.', es: '', en: '' } },
                        { id: 'gvc', label: { en: 'GVC Chat:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Print do chat do Meet se houve links ou instruções. Senão, NA.', es: '', en: '' } },
                        { id: 'gam', label: { en: 'GAM:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Print do ping ao Seller/GAM logo após a call, com resultado, status e próximos passos.', es: '', en: '' } },
                        { id: 'extra_general', label: { en: 'Additional Screenshots:', pt: '', es: '' }, type: 'link', required: false, na: true, visible: true, hint: { pt: 'Opcional. Qualquer print extra exigido pelo cenário.', es: '', en: '' } },
                    ],
                },
            ],
        },
        before: {
            name: 'Before implementation', cols: 4, widths: [22, 28, 28, 22],
            sections: [
                {
                    kind: 'group', title: 'Screenshots (Mandatory)', group: 'Before implementation:',
                    rows: [
                        { id: 'b_status', label: { en: 'Google Ads Conversion Status:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Status de rastreamento Unverified, Needs attention ou Tag inactive, com CID, nome da conversão e horário visíveis.', es: '', en: '' } },
                        { id: 'b_dup', label: { en: 'Duplicate Tags / Repeat Rate:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Tabela de conversões com repeat rate elevado (> 1,3 ou > 2,0) antes de remover tags duplicadas.', es: '', en: '' } },
                        { id: 'b_bid', label: { en: 'Bidding Optimization:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Configuração mostrando a otimização de ação inicial (Secondary ou Primary).', es: '', en: '' } },
                        { id: 'b_diag', label: { en: 'Tag Diagnostics:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, onlyFor: ['ecw'], hint: { pt: 'Só ECW. Print do alerta antes da correção.', es: '', en: '' } },
                        { id: 'b_qual', label: { en: 'EC Qualdash:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'go/ec-qual-dash com Coverage Rate baixo (< 0,7) antes de remover tags duplicadas.', es: '', en: '' } },
                    ],
                },
            ],
        },
        impl: {
            name: 'Implementation', cols: 4, widths: [22, 28, 28, 22],
            sections: [
                {
                    kind: 'group', title: 'Screenshots (Mandatory)', group: 'Implementation:',
                    rows: [
                        { id: 'i_status', label: { en: 'Google Ads Conversion Status:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Resumo de conversões mostrando a transição do status, com CID e nome da conversão iguais.', es: '', en: '' } },
                        { id: 'i_settings', label: { en: 'Google Ads Conversion Settings:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Categoria, otimização, contagem, valor, atribuição e Tag Setup (Conversion ID e Label).', es: '', en: '' } },
                        { id: 'i_gtm', label: { en: 'GTM / Website Backend:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Tag de conversão + Conversion Linker + gatilho no GTM, ou gtag.js manual.', es: '', en: '' } },
                        { id: 'i_fired', label: { en: 'Tag Assistant Tag Fired:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Tags disparadas com Conversion ID, Label e Value/Currency dinâmicos.', es: '', en: '' } },
                        { id: 'i_ec', label: { en: 'Google Ads EC Settings:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, onlyFor: ['ecw'], hint: { pt: 'Só ECW. Enhanced conversions ligado e método escolhido.', es: '', en: '' } },
                        { id: 'i_terms', label: { en: 'Customer Data Terms Accepted:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Termos de dados do cliente aceitos no Google Ads.', es: '', en: '' } },
                        { id: 'i_em', label: { en: 'Error-Free em Parameter OR ecsid PII Stitching:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, onlyFor: ['ecw'], hint: { pt: 'Só ECW. Parâmetro em com hash SHA-256 válido (nunca em.e0), ou 2 prints com ecsid igual.', es: '', en: '' } },
                        { id: 'i_hit', label: { en: '“Hit Sent” in Tag Assistant OR Network Header 200 OK:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Hit para googleadservices.com com o Label certo e 200 OK.', es: '', en: '' } },
                        { id: 'i_extra', label: { en: 'Additional Screenshots:', pt: '', es: '' }, type: 'link', required: false, na: true, visible: true, hint: { pt: 'Opcional.', es: '', en: '' } },
                    ],
                },
            ],
        },
        after: {
            name: 'After implementation', cols: 4, widths: [22, 28, 28, 22],
            sections: [
                {
                    kind: 'group', title: 'Screenshots (Mandatory)', group: 'After implementation:',
                    rows: [
                        { id: 'a_status', label: { en: 'Google Ads Conversion Status:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Resumo de conversões na janela de validação de 2 a 3 dias.', es: '', en: '' } },
                        { id: 'a_diag', label: { en: 'Tag Diagnostics / EC Qualdash:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, onlyFor: ['ecw'], hint: { pt: 'Só ECW. Tag Diagnostics do dia 7 em "Recording enhanced conversions" e/ou EC Qualdash.', es: '', en: '' } },
                        { id: 'a_dup', label: { en: 'Duplicate Tags / Repeat Rate:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Repeat rate normalizado (~1,0) após 2 dias (ACT) ou 7 dias (ECW).', es: '', en: '' } },
                        { id: 'a_bid', label: { en: 'Bidding Optimization:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Otimização de ação atualizada depois da mudança.', es: '', en: '' } },
                        { id: 'a_extra', label: { en: 'Additional Screenshots:', pt: '', es: '' }, type: 'link', required: false, na: true, visible: true, hint: { pt: 'Opcional.', es: '', en: '' } },
                    ],
                },
            ],
        },
        consult: {
            name: 'Consult routing path', cols: 4, widths: [22, 26, 30, 22],
            sections: [
                {
                    kind: 'group', title: 'Screenshots (Mandatory)', group: 'Consult Routing Path & SME Approval:',
                    rows: [
                        { id: 'c_path', label: { en: 'Consult Routing Path:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Print confirmando o roteamento para a fila certa de M&A.', es: '', en: '' } },
                        { id: 'c_sme', label: { en: 'SME Approval:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Print ou nota registrada com a aprovação do SME para Split & Transfer ou Discard.', es: '', en: '' } },
                    ],
                },
            ],
        },
        audit: {
            name: 'Readiness Audit', cols: 6, widths: [12, 15, 11, 15, 25, 22],
            sections: [
                {
                    kind: 'cid', title: 'CID-Level Details',
                    columns: [
                        { id: 'tbw', label: { en: 'To Be Worked?', pt: '', es: '' }, type: 'tbw', required: true },
                        { id: 'cid', label: { en: 'CID', pt: '', es: '' }, type: 'cid', required: true },
                        { id: 'mcc', label: { en: 'Under MCC?', pt: '', es: '' }, type: 'yn', required: true },
                        { id: 'outcome', label: { en: 'Audit Outcome', pt: '', es: '' }, type: 'text', required: true },
                        { id: 'alink', label: { en: 'Audit Link', pt: '', es: '' }, type: 'link', required: true },
                        { id: 'sme', label: { en: 'SME sign-off', pt: '', es: '' }, type: 'smeyes', required: true },
                    ],
                },
                {
                    kind: 'kv', title: 'General Details (Mandatory)',
                    rows: [
                        { id: 'substatus', label: { en: 'Current case Sub-Status:', pt: '', es: '' }, type: 'derived', required: true, na: false, visible: true, auto: 'substatus', hint: { pt: 'Vem do campo Sub-status no topo.', es: '', en: '' } },
                        { id: 'next_followup', label: { en: 'Next Follow up Date:', pt: '', es: '' }, type: 'date', required: true, na: true, visible: true, auto: 'followup', hint: { pt: 'Data do próximo follow-up, ou NA.', es: '', en: '' } },
                        { id: 'case_comments', label: { en: 'Case Comments:', pt: '', es: '' }, type: 'long', required: true, na: false, visible: true, hint: { pt: 'O que aconteceu no caso, com todos os detalhes e próximos passos.', es: '', en: '' } },
                        { id: 'audit_ss', label: { en: 'Audit Screenshots:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Link do print da auditoria.', es: '', en: '' } },
                        { id: 'gam', label: { en: 'GAM Ping, if any:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Print do ping ao GAM, se houve.', es: '', en: '' } },
                    ],
                },
            ],
        },
        impl_call: {
            name: 'Implementation Call', cols: 4, widths: [18, 22, 36, 24],
            sections: [
                {
                    kind: 'cid', title: 'CID-Level Details',
                    columns: [
                        { id: 'tbw', label: { en: 'To Be Worked?', pt: '', es: '' }, type: 'tbw', required: true },
                        { id: 'cid', label: { en: 'CID', pt: '', es: '' }, type: 'cid', required: true },
                        { id: 'tag', label: { en: 'Tag implemented?', pt: '', es: '' }, type: 'text', required: true },
                        { id: 'caseid', label: { en: 'Case ID mapping', pt: '', es: '' }, type: 'text', required: true },
                    ],
                },
                {
                    kind: 'kv', title: 'General Details (Mandatory)',
                    rows: [
                        { id: 'substatus', label: { en: 'Current case Sub-status:', pt: '', es: '' }, type: 'derived', required: true, na: false, visible: true, auto: 'substatus', hint: { pt: 'Vem do campo Sub-status no topo.', es: '', en: '' } },
                        { id: 'substatus_reason', label: { en: 'Sub-status Reason:', pt: '', es: '' }, type: 'long', required: true, na: false, visible: true, hint: { pt: 'Breve explicação do uso desse sub-status.', es: '', en: '' } },
                        { id: 'next_followup', label: { en: 'Next Follow up Date:', pt: '', es: '' }, type: 'date', required: true, na: true, visible: true, auto: 'followup', hint: { pt: 'Data do próximo follow-up, ou NA.', es: '', en: '' } },
                        { id: 'speakeasy', label: { en: 'Speakeasy ID:', pt: '', es: '' }, type: 'speakeasy', required: true, na: true, visible: true, hint: { pt: 'ID exato da sessão do SpeakEasy.', es: '', en: '' } },
                        { id: 'oncall_comments', label: { en: 'On Call Comments:', pt: '', es: '' }, type: 'long', required: true, na: false, visible: true, hint: { pt: 'O que aconteceu na call, com todos os detalhes e próximos passos.', es: '', en: '' } },
                        { id: 'consent', label: { en: 'Checked and obtained recording consent from the customer before proceeding with the call?', pt: '', es: '' }, type: 'yesno', required: true, na: true, visible: true, auto: 'consent', hint: { pt: 'Fora da Europa o padrão é Yes (a alternativa fica em "Alterar"). No caso da Europa o agente marca. NA para NI - Attempted Contact e IN - Not Reachable.', es: '', en: '' } },
                    ],
                },
                {
                    kind: 'kv', title: 'Screenshots (Mandatory)',
                    rows: [
                        { id: 'oncall_ss', label: { en: 'On Call Screenshot:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Print mostrando o On Call e a data e hora do computador.', es: '', en: '' } },
                        { id: 'access_ss', label: { en: 'Account verification access level:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Print do Google Ads, GTM e/ou GA4 mostrando o nível de acesso do anunciante.', es: '', en: '' } },
                        { id: 'gam', label: { en: 'GAM Ping, if any:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Print do ping ao GAM, se houve.', es: '', en: '' } },
                        { id: 'extra_all', label: { en: 'All Additional Screenshots:', pt: '', es: '' }, type: 'link', required: false, na: true, visible: true, hint: { pt: 'Opcional. Todo print necessário ao andamento do caso.', es: '', en: '' } },
                    ],
                },
            ],
        },
        interim: {
            name: 'Interim check-ins', cols: 3, widths: [30, 48, 22],
            sections: [
                {
                    kind: 'kv', title: 'General Details (Mandatory)',
                    rows: [
                        { id: 'substatus', label: { en: 'Current case Sub-Status:', pt: '', es: '' }, type: 'derived', required: true, na: false, visible: true, auto: 'substatus', hint: { pt: 'Vem do campo Sub-status no topo.', es: '', en: '' } },
                        { id: 'next_followup', label: { en: 'Next Follow up Date:', pt: '', es: '' }, type: 'date', required: true, na: true, visible: true, auto: 'followup', hint: { pt: 'Data do próximo follow-up, ou NA.', es: '', en: '' } },
                        { id: 'case_comments', label: { en: 'Case Comments:', pt: '', es: '' }, type: 'long', required: true, na: false, visible: true, hint: { pt: 'O que aconteceu no caso, com todos os detalhes e próximos passos.', es: '', en: '' } },
                        { id: 'gam', label: { en: 'GAM Ping, if any:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Print do ping ao GAM, se houve.', es: '', en: '' } },
                        { id: 'extra_all', label: { en: 'All Additional Screenshots:', pt: '', es: '' }, type: 'link', required: false, na: true, visible: true, hint: { pt: 'Opcional.', es: '', en: '' } },
                    ],
                },
            ],
        },
        triage: {
            name: 'Initial Triage', cols: 3, widths: [30, 48, 22],
            sections: [
                {
                    kind: 'kv', title: 'General Details (Mandatory)',
                    rows: [
                        { id: 'substatus', label: { en: 'Current case Sub-Status:', pt: '', es: '' }, type: 'derived', required: true, na: false, visible: true, auto: 'substatus', hint: { pt: 'Vem do campo Sub-status no topo.', es: '', en: '' } },
                        { id: 'next_followup', label: { en: 'Next Follow up Date:', pt: '', es: '' }, type: 'date', required: true, na: true, visible: true, auto: 'followup', hint: { pt: 'Data do próximo follow-up, ou NA.', es: '', en: '' } },
                        { id: 'case_comments', label: { en: 'Case Comments:', pt: '', es: '' }, type: 'long', required: true, na: false, visible: true, hint: { pt: 'O que aconteceu no caso, com todos os detalhes e próximos passos.', es: '', en: '' } },
                        { id: 'gam', label: { en: 'GAM Ping, if any:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Print do ping ao GAM, se houve.', es: '', en: '' } },
                    ],
                },
            ],
        },
        eligibility: {
            name: 'Eligibility Verification', cols: 5, widths: [16, 17, 20, 25, 22],
            sections: [
                {
                    kind: 'cid', title: 'CID-Level Details',
                    columns: [
                        { id: 'tbw', label: { en: 'To Be Worked?', pt: '', es: '' }, type: 'tbw', required: true },
                        { id: 'cid', label: { en: 'CID', pt: '', es: '' }, type: 'cid', required: true },
                        { id: 'mcc', label: { en: 'Under MCC?', pt: '', es: '' }, type: 'yn', required: true },
                        { id: 'elig', label: { en: 'Eligibility Status', pt: '', es: '' }, type: 'text', required: true },
                        { id: 'galactic', label: { en: 'Galactic Screenshots', pt: '', es: '' }, type: 'link', required: true },
                    ],
                },
                {
                    kind: 'kv', title: 'General Details (Mandatory)',
                    rows: [
                        { id: 'substatus', label: { en: 'Current case Sub-Status:', pt: '', es: '' }, type: 'derived', required: true, na: false, visible: true, auto: 'substatus', hint: { pt: 'Vem do campo Sub-status no topo.', es: '', en: '' } },
                        { id: 'next_followup', label: { en: 'Next Follow up Date:', pt: '', es: '' }, type: 'date', required: true, na: true, visible: true, auto: 'followup', hint: { pt: 'Data do próximo follow-up, ou NA.', es: '', en: '' } },
                        { id: 'case_comments', label: { en: 'Case Comments:', pt: '', es: '' }, type: 'long', required: true, na: false, visible: true, hint: { pt: 'O que aconteceu no caso, com todos os detalhes e próximos passos.', es: '', en: '' } },
                        { id: 'gam', label: { en: 'GAM Ping, if any:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, hint: { pt: 'Print do ping ao GAM, se houve.', es: '', en: '' } },
                    ],
                },
            ],
        },
        extras: {
            name: 'Additional details', cols: 3, widths: [32, 46, 22],
            sections: [
                {
                    kind: 'kv', title: 'Additional Details',
                    rows: [
                        { id: 'europe_case', label: { en: 'Europe case?', pt: '', es: '' }, type: 'derived', required: true, na: false, visible: true, auto: 'europe', when: { europe: true }, hint: { pt: 'Marcado em "Caso da Europa", no topo.', es: '', en: '' } },
                        { id: 'oncall', label: { en: 'On Call signaled on time?', pt: '', es: '' }, type: 'text', required: false, na: true, visible: true, when: { flow: 'bau' }, hint: { pt: 'Como aparece na tela do caso. Não existe no fluxo LM.', es: '', en: '' } },
                        { id: 'gtm_ga4', label: { en: 'GTM/GA4 verified:', pt: '', es: '' }, type: 'text', required: false, na: true, visible: true, optIn: true, requiredWhen: { substatusAny: ['SO - Implementation Only', 'SO - Educational Only', 'SO - Troubleshooting Only', 'NI - Awaiting Validation'] }, hint: { pt: 'Obrigatório quando houve implementação ou validação; opcional nos demais.', es: '', en: '' } },
                        { id: 'ts_used', label: { en: 'Used Tag Support?', pt: '', es: '' }, type: 'yesno', required: true, na: false, visible: true, default: 'No', when: { tasksAny: ['ads_conversion_tracking', 'ads_enhanced_conversions'] }, hint: { pt: 'Só para ACT e ECW. Com Yes, a task leva o aviso do Win Criteria. Lembre-se de preencher o Form.', es: '', en: '' } },
                        { id: 'ts_reason', label: { en: 'Reason:', pt: '', es: '' }, type: 'text', required: false, na: true, visible: true, when: { tasksAny: ['ads_conversion_tracking', 'ads_enhanced_conversions'], rowIs: { id: 'ts_used', v: 'No' } }, hint: { pt: 'Por que o Tag Support não foi usado.', es: '', en: '' } },
                        { id: 'call_attempt', label: { en: 'Call attempt:', pt: '', es: '' }, type: 'link', required: true, na: true, visible: true, when: { substatusAny: ['IN - Not Reachable'] }, hint: { pt: 'Link da evidência da tentativa de ligação.', es: '', en: '' } },
                        { id: 'ev_call1', label: { en: 'Contact evidence: Call 1', pt: '', es: '' }, type: 'link', required: false, na: true, visible: true, when: { substatusAny: ['NI - Attempted Contact'] }, hint: { pt: 'Evidência da primeira ligação.', es: '', en: '' } },
                        { id: 'ev_call2', label: { en: 'Contact evidence: Call 2', pt: '', es: '' }, type: 'link', required: false, na: true, visible: true, when: { substatusAny: ['NI - Attempted Contact'] }, hint: { pt: 'Evidência da segunda ligação.', es: '', en: '' } },
                        { id: 'ev_msg', label: { en: 'Contact evidence: Message to the AM', pt: '', es: '' }, type: 'link', required: false, na: true, visible: true, when: { substatusAny: ['NI - Attempted Contact'] }, hint: { pt: 'Evidência da mensagem ao AM.', es: '', en: '' } },
                    ],
                },
            ],
        },
    },
    segments: [
        {
            key: 'all', name: 'ALL TASKS', select: 'multi', showTitle: false, always: ['general'],
            blocks: [
                { b: 'general', title: 'General details', when: 'Sempre. Vale para toda call, tentativa de contato ou fechamento no mesmo dia.' },
                { b: 'before', title: 'Before implementation', when: 'Só ACT e ECW. Depois de appointments e fechamentos no mesmo dia.', suggest: { tasksAny: ['ads_conversion_tracking', 'ads_enhanced_conversions'] } },
                { b: 'impl', title: 'Implementation', when: 'Só ACT e ECW. Depois de appointments e fechamentos no mesmo dia.', suggest: { tasksAny: ['ads_conversion_tracking', 'ads_enhanced_conversions'] } },
                { b: 'after', title: 'After implementation', when: 'Só ACT e ECW. Em follow-ups ou ao fechar depois da janela (não é o dia do appointment).', suggest: { tasksAny: ['ads_conversion_tracking', 'ads_enhanced_conversions'] } },
                { b: 'consult', title: 'Consult routing path', when: 'Ao consultar ou transferir o caso para M&A.', suggest: { substatusAny: ['IN - Troubleshooting [Transferred]', 'IN - Out of Scope - Rerouted'] } },
            ],
        },
        {
            key: 'sbse', name: 'ECL SBS-E', select: 'single', showTitle: true,
            blocks: [
                { b: 'audit', title: 'Phase 1: Readiness Audit', when: 'Depois da auditoria concluída E revisada/aprovada pelo SME.' },
                { b: 'impl_call', title: 'Phase 2: Implementation Call', when: 'Depois da call de implementação.' },
                { b: 'interim', title: 'Interim Check-Ins or Pre-Impl. Closure: Seller/Advertiser Engagement & Updates', when: 'Ao fechar o caso no pre-call ou ao fazer follow-up com seller/anunciante.' },
            ],
        },
        {
            key: 'mms', name: 'ECL MMS', select: 'single', showTitle: true,
            blocks: [
                { b: 'triage', title: 'Phase 0: Initial Triage', when: 'Depois do e-mail FR (CR 0A) enviado, mas com os CIDs ainda por confirmar.' },
                { b: 'eligibility', title: 'Phase 1: Eligibility Verification', when: 'FR enviado e elegibilidade dos CIDs confirmados checada no Galactic.' },
                { b: 'audit', title: 'Phase 2: Readiness Audit & Scheduling', when: 'Depois da auditoria concluída E revisada/aprovada pelo SME.' },
                { b: 'impl_call', title: 'Phase 3: Pre-Implementation Call', when: 'Depois da call de pre-implementação (3-way) ou ao fechar depois dela.' },
                { b: 'interim', title: 'Interim Check-Ins or Pre-Impl. Closure: Seller/Advertiser Engagement & Updates', when: 'Ao fechar na pré-implementação ou ao fazer follow-up com seller/anunciante.' },
            ],
        },
    ],
};
