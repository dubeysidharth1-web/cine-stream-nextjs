import React from "react";
import EmptyState from "./EmptyState";

export default {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    message: { control: "text" },
    actionLabel: { control: "text" },
    actionHref: { control: "text" },
  },
};

export const Default = {
  args: {
    title: "No Movies Found",
    message: "We couldn't find any movies matching your request.",
  },
};

export const WithAction = {
  args: {
    title: "No Favorites Yet",
    message: "You haven't saved any movies to your favorites list.",
    actionLabel: "Explore Popular Movies",
    actionHref: "/",
  },
};
