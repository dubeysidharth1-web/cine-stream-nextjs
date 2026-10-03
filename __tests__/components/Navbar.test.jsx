import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

// Mock next/navigation module
const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("Navbar Component with Next.js Router Mocking", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("renders navbar brand title and main navigation links", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: /cine-stream home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Popular" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Favorites" })).toBeInTheDocument();
  });

  it("marks Popular link as active when pathname is '/'", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Navbar />);

    const popularLink = screen.getByRole("link", { name: "Popular" });
    const favoritesLink = screen.getByRole("link", { name: "Favorites" });

    expect(popularLink).toHaveClass("active");
    expect(popularLink).toHaveAttribute("aria-current", "page");

    expect(favoritesLink).not.toHaveClass("active");
    expect(favoritesLink).not.toHaveAttribute("aria-current");
  });

  it("marks Favorites link as active when pathname is '/favorites'", () => {
    mockUsePathname.mockReturnValue("/favorites");

    render(<Navbar />);

    const popularLink = screen.getByRole("link", { name: "Popular" });
    const favoritesLink = screen.getByRole("link", { name: "Favorites" });

    expect(favoritesLink).toHaveClass("active");
    expect(favoritesLink).toHaveAttribute("aria-current", "page");

    expect(popularLink).not.toHaveClass("active");
  });

  it("renders optional search slot when passed as prop", () => {
    render(<Navbar searchSlot={<div data-testid="search-slot-mock">Search Slot</div>} />);

    expect(screen.getByTestId("search-slot-mock")).toBeInTheDocument();
  });
});
