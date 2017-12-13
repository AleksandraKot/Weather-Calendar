const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ["whatwg-fetch", "./js/app.jsx", "./scss/main.scss"],
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
            use: ['css-loader?resolve-url-loader', 'sass-loader']
          })

        },
        {
          test: /\.(png|jpg|gif)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }]
        },
        { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
      ]
    },
    plugins: [
      new ExtractTextPlugin('./css/main.css')
    ],
    devtool: 'source-map'
  };
