const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const prepareFileName = (extention, isProd = isProduction) =>
  isProd ? `bundle.[hash].${extention}` : `bundle.${extention}`;

const jsLoaders = () => {
  const prodLoaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ];
  return isProduction ? prodLoaders : [...prodLoaders, 'eslint-loader'];
};
module.exports = {
  context: path.resolve(__dirname, 'lib'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: prepareFileName('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: !isProduction && 'source-map',
  devServer: {
    port: 3001,
    hot: !isProduction,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'lib/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
    new MiniCssExtractWebpackPlugin({
      filename: prepareFileName('css'),
    }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'lib'),
      '@core': path.resolve(__dirname, 'lib/core'),
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractWebpackPlugin.loader,
            options: {hmr: !isProduction, reloadAll: true},
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: jsLoaders(),
      },
    ],
  },
};
