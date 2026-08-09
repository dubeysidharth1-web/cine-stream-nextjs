/**
 * Extracts release year from YYYY-MM-DD date string safely.
 * @param {string} dateString
 * @returns {string} Year or 'N/A'
 */
export function getReleaseYear(dateString) {
  if (!dateString) return 'N/A';
  const year = dateString.split('-')[0];
  return year && year.length === 4 ? year : 'N/A';
}

/**
 * Formats YYYY-MM-DD into a localized date string (e.g., Nov 12, 2023)
 * @param {string} dateString
 * @returns {string} Formatted date
 */
export function formatFullDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}
