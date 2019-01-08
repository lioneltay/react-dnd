const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const relativeToRoot = relativePath =>
  path.resolve(__dirname, "./", relativePath)

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
  mode: "development",

  entry: {
    main: ["@babel/polyfill", relativeToRoot("./src/index.tsx")],
  },

  output: {
    filename: "[name].[hash].js",
    path: relativeToRoot("./dist"),
    publicPath: "/",
  },

  resolve: {
    extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
    modules: [path.resolve(__dirname, relativeToRoot("./src")), "node_modules"],
    alias: {
      react: path.resolve("../node_modules/react"),
      // "react-dom": path.resolve("../node_modules/react-dom"),
      // "prop-types": path.resolve("node_modules/prop-types"),
      // dnd: path.resolve("../src/index"),
      dnd: path.resolve("../lib"),
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

  devtool: "inline-source-map",

  devServer: {
    hot: false,
    port: 3000,
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
}
