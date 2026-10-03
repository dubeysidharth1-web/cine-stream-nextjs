import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyState from "@/components/EmptyState";

describe("EmptyState Component", () => {
  it("renders default title and message", () => {
    render(<EmptyState />);

    expect(screen.getByText("No Movies Found")).toBeInTheDocument();
    expect(
      screen.getByText("We couldn't find any movies matching your request.")
    ).toBeInTheDocument();
  });

  it("renders custom title and message", () => {
    render(
      <EmptyState
        title="No Favorites Saved"
        message="Add movies to your favorites list to view them later."
      />
    );

    expect(screen.getByText("No Favorites Saved")).toBeInTheDocument();
    expect(
      screen.getByText("Add movies to your favorites list to view them later.")
    ).toBeInTheDocument();
  });

  it("renders action button with correct link when actionLabel and actionHref are provided", () => {
    render(
      <EmptyState
        actionLabel="Explore Movies"
        actionHref="/"
      />
    );

    const actionLink = screen.getByRole("link", { name: "Explore Movies" });
    expect(actionLink).toBeInTheDocument();
    expect(actionLink).toHaveAttribute("href", "/");
  });

  it("does not render action link if actionHref is missing", () => {
    render(<EmptyState actionLabel="Explore Movies" />);
    expect(screen.queryByRole("link", { name: "Explore Movies" })).not.toBeInTheDocument();
  });
});
