import type { FilterKey } from '../types';

export function toFilterKey(acres: number): FilterKey {
  if (acres >= 100000) return 'Mega (100k+ ac)';
  if (acres >= 10000) return 'Large (10k-99k ac)';
  if (acres >= 1000) return 'Medium (1k-9,999 ac)';
  if (acres >= 100) return 'Small (100-999 ac)';
  return 'Minor (<100 ac)';
}

export function startOfWeekISO(d: Date): string {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = date.getUTCDay() || 7;
  if (day !== 1) date.setUTCDate(date.getUTCDate() - (day - 1));
  return date.toISOString().slice(0, 10);
}

export function parseAlarmDate(dateStr: string): Date {
  return new Date(dateStr);
}
