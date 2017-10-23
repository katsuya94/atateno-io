const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    "index.js": path.resolve(__dirname, "src", "index.jsx"),
    "index.css": path.resolve(__dirname, "src", "index.scss")
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"],
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: path.resolve(__dirname, "src"),
        use: ["cache-loader", "babel-loader"]
      },
      {
        test: [/\.scss$/],
        include: path.resolve(__dirname, "src"),
        use: ExtractTextPlugin.extract({
          use: ["cache-loader", "css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png)$/,
        include: [
          path.resolve(__dirname, "node_modules", "dejavu-fonts-ttf"),
          path.resolve(__dirname, "node_modules", "font-awesome")
        ],
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]" }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("index.css"),
    new CopyWebpackPlugin([{ from: "assets/*.svg", flatten: true }])
  ]
};
