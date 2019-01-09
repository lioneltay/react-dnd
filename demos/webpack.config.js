const path = require("path")
const webpack = require("webpack")
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
    ],
  },

  devtool: "inline-source-map",

  devServer: {
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
