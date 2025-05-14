export function pad(n: number): string {
  return n.toString().padStart(2, '0');
}
export function dateToMySQL(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
/** Combina dateString (YYYY-MM-DD) y timeString (HH:mm) y devuelve un string en formato MySQL DATETIME */
export function buildDateTimeMySQL(dateString: string, timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date(dateString);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  return dateToMySQL(date);
}