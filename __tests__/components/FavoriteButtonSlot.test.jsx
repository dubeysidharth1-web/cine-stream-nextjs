import React from "react";
import { screen } from "@testing-library/react";
import FavoriteButtonSlot from "@/components/FavoriteButtonSlot";
import { renderWithProviders, mockMovie } from "../helpers/test-helpers";

describe("FavoriteButtonSlot Component", () => {
  it("renders FavoriteButton wrapped inside FavoriteButtonSlot", () => {
    renderWithProviders(<FavoriteButtonSlot movie={mockMovie} />);

    const button = screen.getByRole("button", { name: "Add Fight Club to favorites" });
    expect(button).toBeInTheDocument();
  });
});
