const path = require('path');
const webpack = require('webpack');
const OUTPUT_PATH = path.resolve('dist/lib');

module.exports = {
  devtool: 'source-map',
  entry: {
    dll: ['react', 'react-dom', 'react-redux', 'react-router-dom', 'redux', 'jumpstate'],
  },
  output: {
    path: OUTPUT_PATH,
    hashDigestLength: 8,
    filename: '[name]-[fullhash].js',
    library: 'lib_[name]',
    libraryTarget: 'var',
  },
  optimization: {
    moduleIds: 'deterministic',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(OUTPUT_PATH, '[name]-manifest.json'),
      name: '[name]-[hash]',
    }),
  ],
};
