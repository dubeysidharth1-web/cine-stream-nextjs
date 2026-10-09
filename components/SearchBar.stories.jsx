import React from "react";
import SearchBar from "./SearchBar";

export default {
  title: "Components/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text inside the search input element.",
    },
    onSearch: {
      action: "searched",
      description: "Callback invoked after query debounce and sanitization.",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "500px", margin: "1rem 0" }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    placeholder: "Search movies by title...",
  },
};

export const CustomPlaceholder = {
  args: {
    placeholder: "Filter by genre, director or title...",
  },
};

export const ShortPlaceholder = {
  args: {
    placeholder: "Search...",
  },
};
