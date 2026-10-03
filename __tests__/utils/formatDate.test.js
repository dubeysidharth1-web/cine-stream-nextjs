import { formatDate, getReleaseYear } from "@/utils/formatDate";

describe("formatDate Utility", () => {
  it("formats ISO date string into MMM D, YYYY format", () => {
    expect(formatDate("1999-10-15")).toContain("1999");
    expect(formatDate("1999-10-15")).toContain("Oct");
  });

  it("returns N/A for null, undefined, or empty string inputs", () => {
    expect(formatDate(null)).toBe("N/A");
    expect(formatDate(undefined)).toBe("N/A");
    expect(formatDate("")).toBe("N/A");
  });

  it("returns N/A for invalid date strings", () => {
    expect(formatDate("invalid-date-string")).toBe("N/A");
  });
});

describe("getReleaseYear Utility", () => {
  it("extracts four-digit year from ISO date string", () => {
    expect(getReleaseYear("1999-10-15")).toBe("1999");
    expect(getReleaseYear("2024-05-01")).toBe("2024");
  });

  it("returns N/A for invalid, empty, or missing date strings", () => {
    expect(getReleaseYear(null)).toBe("N/A");
    expect(getReleaseYear("not-a-date")).toBe("N/A");
  });
});
