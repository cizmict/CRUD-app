function formatDate(jsonDate) {
  const date = new Date(jsonDate);
  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();

  return `${d}.${m}.${y}.`;
}
