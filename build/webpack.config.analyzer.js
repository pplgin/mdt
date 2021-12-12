const merge = require('webpack-merge')
const baseConf = require('./webpack.config.prod.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseConf, {
	devtool: 'source-map',
	mode: 'development',
	plugins: [
		 new BundleAnalyzerPlugin()
	]
})
