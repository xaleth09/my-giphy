const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const concat = (...paths) => path.resolve(__dirname, ...paths)

module.exports = ({ mode } = { mode: 'production' }) => {
	console.log(`mode is: ${mode}`)

	return {
		mode,
		entry: concat('src', 'index.js'),
		output: {
			publicPath: '/',
			path: concat('www'),
			filename: 'bundled.js'
		},
		module: {
			rules: [
				{
					test: /\.jpe?g|png$/,
					exclude: /node_modules/,
					loader: ['url-loader', 'file-loader']
				},
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				}
			]
		},
		resolve: {
			extensions: ['.js'],
			modules: [concat('src'), 'node_modules']
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './www/index.html'
			}),
			new webpack.DefinePlugin({
				'DEVTOOLS': 'window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()'
			}),
			new webpack.HotModuleReplacementPlugin()
		],
		devServer: {
			historyApiFallback: true,
			stats: {
				assets: false,
				chunks: false,
				modules: false,
				children: false
			},
			contentBase: concat('www'),
			watchContentBase: true,
			watchOptions: {
				ignored: /node_modules/
			},
			hot: true,
			open: true,
			port: 8080,
			host: 'localhost'
		}
	}
}