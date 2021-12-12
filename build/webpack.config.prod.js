const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const baseConf = require('./webpack.config.base');
const { uuid } = require('./webpack-common/utils');

const { name: dllName } = require(path.resolve(__dirname, '../dist/lib/dll-manifest.json'));
const cd = require('../cd.json');
const BUILD_PUBLICPATH = cd['cdn-path'] ? cd['cdn-path'] : '/';

module.exports = merge(baseConf, {
  devtool: 'source-map',
  mode: 'production',
  output: {
    publicPath: BUILD_PUBLICPATH,
  },
  optimization: {
    emitOnErrors: true,
    moduleIds: 'named',
    splitChunks: {
      name(module) {
        return uuid('vendor-chunk');
      },
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'vendors',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({}),
    ],
  },
  performance: {
    hints: 'warning',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      templateParameters: {
        dll: `${BUILD_PUBLICPATH}lib/${dllName}.js`,
      },
    }),
    new WebpackManifestPlugin({
      fileName: 'chunk-manifest.json',
      filter: (file) => {
        const isChunk = file.isChunk;
        const withoutMap = !file.name.includes('.map');
        const withoutApp = !file.name.includes('app.');
        return isChunk && withoutMap && withoutApp;
      },
    }),
  ],
});
