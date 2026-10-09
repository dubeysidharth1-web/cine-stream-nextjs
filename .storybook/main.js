import path from "path";
import webpack from "webpack";

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: [
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  core: {
    builder: "@storybook/builder-webpack5",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push({
      apply(compiler) {
        if (compiler.webpack) {
          if (compiler.webpack.DefinePlugin) {
            new compiler.webpack.DefinePlugin({
              "process.env.__NEXT_IMAGE_OPTS": JSON.stringify({
                deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
                imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
                path: "/_next/image",
                loader: "default",
                dangerouslyAllowSVG: false,
                unoptimized: false,
                domains: ["image.tmdb.org"],
                remotePatterns: [
                  {
                    protocol: "https",
                    hostname: "image.tmdb.org",
                    port: "",
                    pathname: "/t/p/**",
                    search: "",
                  },
                ],
              }),
            }).apply(compiler);
          }

          if (compiler.webpack.NormalModuleReplacementPlugin) {
            new compiler.webpack.NormalModuleReplacementPlugin(
              /^stream$/,
              require.resolve("stream-browserify")
            ).apply(compiler);

            new compiler.webpack.NormalModuleReplacementPlugin(
              /^(fs|zlib|crypto|net|tls)$/,
              path.resolve(__dirname, "./gzip-size-stub.js")
            ).apply(compiler);
          }
        }
      },
    });

    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.unshift({
      test: /\.(js|jsx)$/,
      include: (filepath) => typeof filepath === "string" && !filepath.includes("node_modules"),
      use: {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
          ],
        },
      },
    });

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "../"),
      "next/navigation": path.resolve(__dirname, "./next-navigation-stub.js"),
      "node:module": "module",
      "node:path": "path",
      "node:url": "url",
      "node:fs": path.resolve(__dirname, "./gzip-size-stub.js"),
      "node:util": "util",
      "node:buffer": "buffer",
      "node:stream": "stream-browserify",
    };
    return config;
  },
};

export default config;
