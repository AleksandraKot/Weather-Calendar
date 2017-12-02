const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ["whatwg-fetch", "./js/app.jsx", "./scss/style.scss"],
    output: {
      path: path.resolve("dist"),
      filename: "out.js"
    },
    watch: true,
    module: {
      loaders: [{
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ["es2015", 'stage-2', "react"]
          }
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })

        },
        {
          test: /\.(png|jpg|gif)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'file-loader',
            options: {}
          }]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('./css/style.css')
    ],
    devtool: 'source-map'
  };
