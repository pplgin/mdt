const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConf = require('./webpack.config.base.js');
const { PORT } = process.env;

module.exports = merge(baseConf, {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  output: {
    filename: '[name].js',
    pathinfo: true,
    hotUpdateChunkFilename: '[id].[fullhash].hot-update.js',
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    publicPath: `/`,
    port: PORT,
    index: 'index.html',
    historyApiFallback: {
      index: `/index.html`,
    },
    host: '0.0.0.0',
    proxy: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      /* 代理在这 */
      '/kids/api': {
        target: 'https://app-gateway-test.zmlearn.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
