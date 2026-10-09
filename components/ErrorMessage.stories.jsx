import React from "react";
import ErrorMessage from "./ErrorMessage";

export default {
  title: "Components/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    message: { control: "text" },
    onRetry: { action: "retried" },
  },
};

export const Default = {
  args: {
    title: "Something went wrong",
    message: "Unable to load movie data at this time. Please verify your connection or API key.",
  },
};

export const WithRetry = {
  args: {
    title: "Network Timeout",
    message: "Failed to connect to TMDB service. Click below to retry.",
    onRetry: () => console.log("Retrying fetch..."),
  },
};
