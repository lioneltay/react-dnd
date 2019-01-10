const path = require("path")
const webpack = require("webpack")

const relativeToRoot = relativePath =>
  path.resolve(__dirname, "../", relativePath)

const common_config = require("./webpack.config.common")

module.exports = {
  ...common_config,
  mode: "production",

  output: {
    filename: "[name].[hash].js",
    path: relativeToRoot("../docs"),
    publicPath: "/react-dnd/",
  },

  plugins: [
    ...common_config.plugins,
    new webpack.EnvironmentPlugin({
      APP_MODE: "production",
    }),
  ],
}
