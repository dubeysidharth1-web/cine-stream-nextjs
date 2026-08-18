/**
 * Formats an ISO date string (YYYY-MM-DD) into a user-friendly format (e.g. "MMM D, YYYY").
 * Returns "N/A" if input is invalid or missing.
 *
 * @param {string} dateString
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  if (!dateString) return "N/A";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * Extracts the release year from an ISO date string.
 *
 * @param {string} dateString
 * @returns {string} Year string or "N/A"
 */
export function getReleaseYear(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return date.getFullYear().toString();
}
