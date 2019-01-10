const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')

const relativeToRoot = relativePath =>
  path.resolve(__dirname, "../", relativePath)

const babel_loader = {
  loader: "babel-loader",
  options: {
    cacheDirectory: true,
  },
}

const ts_loader = {
  loader: "ts-loader",
  options: { transpileOnly: true },
}

module.exports = {
  entry: {
    main: ["@babel/polyfill", relativeToRoot("./src/index.tsx")],
  },

  resolve: {
    extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
    modules: [path.resolve(__dirname, relativeToRoot("./src")), "node_modules"],
    alias: {
      react: relativeToRoot("../node_modules/react"),
      dnd: relativeToRoot("../lib"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [babel_loader, ts_loader],
      },
      {
        test: /.worker.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "worker-loader",
            options: {
              name: "[name].js",
            },
          },
          babel_loader,
          ts_loader,
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
}
