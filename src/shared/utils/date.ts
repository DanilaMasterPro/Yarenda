/**
 * Minimal date-range shape compatible with react-day-picker's DateRange.
 * Defined locally so the module stays framework-agnostic (web + mobile).
 */
export interface DateRange {
  from?: Date;
  to?: Date;
}

/**
 * Returns today's date with time set to midnight (00:00:00.000).
 */
export function getToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Counts the number of days in a date range (inclusive).
 * Returns 0 if no start date, 1 if only start date is selected.
 */
export function countDays(dateRange: DateRange | undefined): number {
  if (!dateRange?.from) return 0;
  if (!dateRange.to) return 1;
  const diff = dateRange.to.getTime() - dateRange.from.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Returns a date N years from a given base date.
 */
export function addYears(date: Date, years: number): Date {
  return new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
}
