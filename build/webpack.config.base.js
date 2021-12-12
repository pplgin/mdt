/* eslint-disable import/no-dynamic-require */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const alias = require('./webpack-common/alias');
const loaders = require('./webpack-common/loader');
require('dotenv').config();
const cd = require('../cd.json');
const BUILD_PUBLICPATH = cd['cdn-path'] ? cd['cdn-path'] : '/';

const { BUILD_OUTPUT_DIR = path.resolve('dist'), NODE_ENV = 'development', BUILD_TYPE, APPID } = process.env;

const __isDEV = NODE_ENV === 'development';
// dll map required!
const dllMap = require(`${BUILD_OUTPUT_DIR}/lib/dll-manifest.json`);

module.exports = {
  entry: {
    app: './src/App.tsx',
  },
  output: {
    filename: '[name].[contenthash].js',
    hashDigestLength: 8,
    path: BUILD_OUTPUT_DIR,
    publicPath: __isDEV ? '/' : BUILD_PUBLICPATH,
    library: 'reactApp',
    libraryTarget: 'window',
  },
  target: 'electron-renderer',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'], // 可以省略的后缀名
    modules: [path.resolve('src'), path.resolve('common'), path.resolve('node_modules')],
    alias,
  },
  externals: {
    '@zm-avs/zm-tablet': 'commonjs2 @zm-avs/zm-tablet',
    '@zm-avs/zm-avssdk': 'commonjs2 @zm-avs/zm-avssdk',
    'adm-zip': 'commonjs2 adm-zip',
    global: 'global',
  },
  module: {
    rules: [loaders.jslint, loaders.js, loaders.css, loaders.image],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.BUILD_TYPE': JSON.stringify(BUILD_TYPE),
      'process.env.APPID': JSON.stringify(APPID),
    }),
    new webpack.DllReferencePlugin({
      name: 'lib_dll',
      manifest: dllMap,
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`!${BUILD_OUTPUT_DIR}/lib`],
    }),
    // css 处理
    new MiniCssExtractPlugin({
      filename: __isDEV ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: __isDEV ? '[id].css' : '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      templateParameters: {
        dll: (__isDEV ? '/' : `${BUILD_PUBLICPATH}`) + `lib/${dllMap.name}.js`,
      },
    }),
  ],
};
