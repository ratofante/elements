const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
   mode: 'development',
   entry: {
      bundle: path.resolve(__dirname, 'src/js/index.js'),
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
   },
   devtool: 'source-map',
   devServer: {
      static: {
         directory: path.resolve(__dirname, 'dist')
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
   },
   module: {
      rules: [
         {
            type: "asset",
            test: /\.(png|svg|jpg|jpeg|gif)$/i
         },
         {
            test: /\.scss$/,
            use: [
               'style-loader',
               'css-loader',
               'sass-loader'
            ],
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            },
         },
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         title: 'Kid - Bootcamp',
         filename: 'index.html',
         template: 'src/template.html',
      }),
      new CopyPlugin({
         patterns: [
            { from: 'src/assets', to: 'assets' }
         ]
      })
   ]
}