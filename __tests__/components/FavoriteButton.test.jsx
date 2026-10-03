import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteButton from "@/components/FavoriteButton";
import { renderWithProviders, mockMovie } from "../helpers/test-helpers";

describe("FavoriteButton Component Interaction", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders with initial un-favorited state and correct aria-label", () => {
    renderWithProviders(<FavoriteButton movie={mockMovie} />);

    const button = screen.getByRole("button", { name: "Add Fight Club to favorites" });
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass("is-favorite");
  });

  it("toggles favorite status on user click", async () => {
    const user = userEvent.setup();
    renderWithProviders(<FavoriteButton movie={mockMovie} />);

    const button = screen.getByRole("button", { name: "Add Fight Club to favorites" });

    // Click to add to favorites
    await user.click(button);

    const activeBtn = screen.getByRole("button", { name: "Remove Fight Club from favorites" });
    expect(activeBtn).toBeInTheDocument();
    expect(activeBtn).toHaveClass("is-favorite");

    // Click again to remove from favorites
    await user.click(activeBtn);

    const unactiveBtn = screen.getByRole("button", { name: "Add Fight Club to favorites" });
    expect(unactiveBtn).toBeInTheDocument();
    expect(unactiveBtn).not.toHaveClass("is-favorite");
  });

  it("does not crash or toggle when movie prop is null", async () => {
    const user = userEvent.setup();
    renderWithProviders(<FavoriteButton movie={null} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(button).not.toHaveClass("is-favorite");
  });
});
