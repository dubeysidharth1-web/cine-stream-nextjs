/**
 * Sanitizes search query string by stripping unsafe characters and whitespace.
 *
 * @param {string} query
 * @returns {string} Sanitized query string
 */
export function sanitizeQuery(query) {
  if (typeof query !== "string") return "";
  return query.replace(/[<>{}]/g, "").trim();
}
