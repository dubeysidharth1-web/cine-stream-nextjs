import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorMessage from "@/components/ErrorMessage";

describe("ErrorMessage Component", () => {
  it("renders with default title and error message", () => {
    render(<ErrorMessage />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("Unable to load movie data at this time. Please verify your connection or API key.")
    ).toBeInTheDocument();
  });

  it("renders custom title and message when provided", () => {
    render(
      <ErrorMessage
        title="Network Error"
        message="Failed to connect to the server."
      />
    );

    expect(screen.getByText("Network Error")).toBeInTheDocument();
    expect(screen.getByText("Failed to connect to the server.")).toBeInTheDocument();
  });

  it("renders retry button when onRetry handler is provided and handles click", async () => {
    const handleRetry = jest.fn();
    const user = userEvent.setup();

    render(<ErrorMessage onRetry={handleRetry} />);

    const retryBtn = screen.getByRole("button", { name: /try again/i });
    expect(retryBtn).toBeInTheDocument();

    await user.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it("does not render retry button when onRetry is omitted", () => {
    render(<ErrorMessage />);
    expect(screen.queryByRole("button", { name: /try again/i })).not.toBeInTheDocument();
  });
});
