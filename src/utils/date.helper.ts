import { DateTime } from 'luxon';

function formatDate(date: Date): string {
  const formatted = DateTime.fromISO(date.toISOString()).toFormat('MMMM dd, yyyy');
  return formatted;
}

export { formatDate };
