const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const {
	CleanWebpackPlugin
} = require("clean-webpack-plugin")

module.exports = {
	entry: {
		"popup/popup": path.resolve(__dirname, "./src/popup/popup.js"),
		"options/options": path.resolve(__dirname, "./src/options/options.js")
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist/')
	},
	externals: {
		"vue": "Vue"
	},
	module: {
		rules: [{
				test: /\.vue$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
		new htmlWebpackPlugin({
			filename: 'popup/popup.html',
			template: './src/popup/popup.html',
			inject: true,
			hash: true,
			chunks: ['popup/popup'],
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		}),
		new htmlWebpackPlugin({
			filename: 'options/options.html',
			template: './src/options/options.html',
			inject: true,
			hash: true,
			chunks: ['options/options'],
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		}),
		new CopyWebpackPlugin([{
			from: './src/manifest.json',
			to: 'manifest.json'
		},{
			from: './src/icon',
			to: 'icon'
		}])
	]
}
