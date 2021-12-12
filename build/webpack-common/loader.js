const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  jslint: {
    enforce: 'pre',
    test: /\.(js|ts|tsx)$/,
    exclude: [/node_modules/, /^@kids\/download/],
    loader: 'eslint-loader',
    options: {
      quiet: true,
      emitError: true,
      failOnError: true,
    },
  },
  js: {
    test: /\.(tsx|ts|js)$/,
    exclude: [/^node_modules/, /^@kids\/download/],
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
  },
  css: {
    test: /\.(css|scss|sass)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: false,
        },
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 2,
          modules: {
            localIdentName: '[local]_[hash:base64:4]',
          },
        },
      },
      'postcss-loader',
      'sass-loader',
    ],
  },
  image: {
    test: /\.(eot|svg|ttf|woff|woff2|svga|png|jpg|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 5120,
          name: 'images/[name]-[hash:base64:5].[ext]?[hash:base64:4]',
        },
      },
    ],
  },
};
