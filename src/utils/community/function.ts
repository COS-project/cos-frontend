export function formatDateTime(isoString: string) {
  const date = new Date(isoString);

  const yy = String(date.getFullYear()).slice(2); // '2025' → '25'
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // 0-based month
  const dd = String(date.getDate()).padStart(2, '0');
  const HH = String(date.getHours()).padStart(2, '0');
  const mmTime = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${yy}.${mm}.${dd}`; // 예: 25.03.28
  const formattedTime = `${HH}:${mmTime}`; // 예: 09:26

  return { date: formattedDate, time: formattedTime };
}
