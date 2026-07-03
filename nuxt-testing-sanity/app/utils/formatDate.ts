export function formatDate(value: string | Date) {
  return new Date(value).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}
