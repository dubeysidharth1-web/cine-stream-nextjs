import { sanitizeQuery } from "@/utils/sanitize";

describe("sanitizeQuery Utility", () => {
  it("trims whitespace from start and end of search query", () => {
    expect(sanitizeQuery("  Batman  ")).toBe("Batman");
  });

  it("strips unsafe HTML characters (<, >, {, }) from string", () => {
    expect(sanitizeQuery("<script>alert('xss')</script>")).toBe("scriptalert('xss')/script");
    expect(sanitizeQuery("{test}")).toBe("test");
  });

  it("returns empty string for non-string inputs", () => {
    expect(sanitizeQuery(null)).toBe("");
    expect(sanitizeQuery(undefined)).toBe("");
    expect(sanitizeQuery(123)).toBe("");
  });
});
