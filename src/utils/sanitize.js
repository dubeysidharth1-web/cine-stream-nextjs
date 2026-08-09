/**
 * Sanitizes user search input by trimming whitespace and stripping HTML tags.
 * @param {string} input
 * @returns {string} Sanitized text
 */
export function sanitizeQuery(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>?/gm, '')
    .trim();
}
