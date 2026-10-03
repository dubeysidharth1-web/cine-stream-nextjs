import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/SearchBar";

describe("SearchBar Component Interaction", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders search input field with correct placeholder and accessibility attributes", () => {
    render(<SearchBar placeholder="Find movies..." />);

    const searchInput = screen.getByRole("searchbox", { name: /search movies/i });
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("placeholder", "Find movies...");
  });

  it("updates input value when user types into the input field", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SearchBar />);

    const searchInput = screen.getByRole("searchbox");
    await user.type(searchInput, "Batman");

    expect(searchInput).toHaveValue("Batman");
  });

  it("invokes onSearch callback with debounced sanitized query", async () => {
    const handleSearch = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<SearchBar onSearch={handleSearch} />);
    const searchInput = screen.getByRole("searchbox");

    await user.type(searchInput, "  Inception <script>  ");

    // Advance time past the 400ms debounce threshold inside act
    act(() => {
      jest.advanceTimersByTime(450);
    });

    // Expect sanitized output (strips unsafe characters and trims whitespace)
    expect(handleSearch).toHaveBeenLastCalledWith("Inception script");
  });

  it("triggers onSearch with empty string when user clears input", async () => {
    const handleSearch = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<SearchBar onSearch={handleSearch} />);
    const searchInput = screen.getByRole("searchbox");

    await user.type(searchInput, "Matrix");
    act(() => {
      jest.advanceTimersByTime(450);
    });

    await user.clear(searchInput);
    act(() => {
      jest.advanceTimersByTime(450);
    });

    expect(handleSearch).toHaveBeenLastCalledWith("");
  });
});
