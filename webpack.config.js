const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const path = require('path');

const publicPath = path.join(__dirname, 'public');
const templateHtml = path.join(__dirname, 'templates/index.html');
const clientPath = path.join(__dirname, 'client');

const clientFiles = glob.sync('./client/*.js');

const entries = clientFiles.reduce((acc, entry)=> {
  const fileName = path.basename(entry, '.js')
  
  acc.bundles[fileName] = [entry];
  
  const htmlPage = new HtmlWebpackPlugin({
    inject: true,
    chunks: [fileName],
    template: templateHtml,
    filename: `${publicPath}/${fileName}.html`,
  })
  
  acc.html.push(htmlPage)
  return acc;
}, {
  bundles: {},
  html: []
});

module.exports = {
  entry: entries.bundles,
  output: {
    filename: '[name].bundle.js',
    path: publicPath
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {loader: 'babel-loader'}
    }]
  },
  plugins: [].concat(entries.html)
}