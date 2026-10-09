import React from "react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../styles/globals.css";
import { FavoritesProvider } from "../context/FavoritesContext";

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      Dark: "dark",
      Light: "light",
    },
    defaultTheme: "Dark",
    attributeName: "data-theme",
  }),
  (Story) => (
    <FavoritesProvider>
      <div style={{ padding: "1rem", minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <Story />
      </div>
    </FavoritesProvider>
  ),
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  nextjs: {
    appDirectory: true,
  },
  backgrounds: {
    default: "dark",
    values: [
      { name: "dark", value: "#0f172a" },
      { name: "light", value: "#f8fafc" },
    ],
  },
};
