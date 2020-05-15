const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, 'lib'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'lib/favicon.ico'), to: path.resolve(__dirname, 'dist'), }]),
        new MiniCssExtractWebpackPlugin({
            filename: 'bundle.[hash].css'
        }),
    ],
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'lib'),
            '@core': path.resolve(__dirname, 'lib/core'),
        }
    },
    module: {
        rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                 MiniCssExtractWebpackPlugin.loader,
                'css-loader',
                'sass-loader'
              ],
            },
          ],
    }
}
