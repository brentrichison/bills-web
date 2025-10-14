import type { BillType } from '@/models/types';

export function dueThisWeek(items: BillType[], now = new Date()) {
  const start = startOfISOWeek(now);
  const days = Array.from({ length: 7 }, (_, i) =>
    atMidnight(addDays(start, i))
  );

  const matches: BillType[] = [];

  for (const it of items) {
    const occ = it.occurrence;

    if (typeof occ.month === 'number') {
      const dom = occ.month + 1;
      if (days.some((d) => d.getDate() === dom)) {
        matches.push(it);
        continue;
      }
    }

    if (
      typeof occ.day === 'number' &&
      typeof occ.week === 'number' &&
      occ.week > 0
    ) {
      const targetPyWeekday = (occ.day - 1 + 7) % 7;
      const hit = days.find((d) => d.getDay() === (targetPyWeekday + 1) % 7);

      if (hit) {
        const wk = isoWeekNumber(hit);
        if (occ.week === 1 || wk % occ.week === 0) matches.push(it);
      }
    }
  }

  const count = matches.length;
  const total = matches.reduce((s, it) => s + Number(it.amount || 0), 0);
  return { count, total, items: matches };
}

function atMidnight(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function startOfISOWeek(d: Date) {
  const x = atMidnight(d);
  const day = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - day);
  return x;
}

function isoWeekNumber(d: Date) {
  const x = atMidnight(d);
  const day = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() + 3 - day);
  const firstThu = new Date(x.getFullYear(), 0, 4);
  const firstDay = (firstThu.getDay() + 6) % 7;
  firstThu.setDate(firstThu.getDate() + 3 - firstDay);
  const diff = x.getTime() - firstThu.getTime();
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}
