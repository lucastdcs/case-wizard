// src/modules/shared/streak-tracker.js
//
// Contador de "casos hoje" - puramente local (localStorage), zera sozinho
// virando o dia. Só guarda um número, não guarda nenhum dado de caso. A UI
// (badge da pílula) fica em command-center.js; isso aqui é só a contagem.

const KEY = 'cw_case_streak_v1';
const MILESTONES = [5, 10, 15, 20, 25, 30, 40, 50];

function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function getCaseStreakToday() {
    try {
        const data = JSON.parse(localStorage.getItem(KEY) || '{}');
        return data.date === todayKey() ? (data.count || 0) : 0;
    } catch (e) {
        return 0;
    }
}

export function incrementCaseStreak() {
    const count = getCaseStreakToday() + 1;
    try {
        localStorage.setItem(KEY, JSON.stringify({ date: todayKey(), count }));
    } catch (e) { /* localStorage indisponível - segue sem persistir */ }
    return { count, isMilestone: MILESTONES.includes(count) };
}
