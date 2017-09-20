const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const DEBUG = !(process.env.NODE_ENV === 'production');
const env = {
	NODE_ENV: process.env.NODE_ENV,
	API_BASE_URL: process.env.API_BASE_URL,
};

const config = {
	devtool: DEBUG ? 'eval' : false,
	devServer: {
		publicPath: 'http://localhost:3002/static/',
		historyApiFallback: true,
		hot: true,
		inline: true,
		contentBase: './app',
		port: 3002,
		compress: true,
		stats: {
			colors: true,
			hash: true,
			timings: true,
			chunks: false,
		},
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
		},
	},
	node: {
		global: true,
		console: true,
		fs: 'empty',
	},
	entry: {
		app: [
			'./app/app',
			'./app/assets/styles/main.scss',
		],
		vendor: [
			'react',
			'react-router',
			'react-redux',
			'redux',
			'react-dom',
			'immutable',
			'superagent',
			'react-helmet',
			'redux-logger',
			'humps',
			'react-body-classname',
			'babel-polyfill',
			'redux-thunk',
		],
	},
	resolve: {
		modules: [
			path.join(__dirname, 'app'),
			'node_modules',
		],
		// extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
	},
	output: {
		path: path.join(__dirname, 'dist/', 'public'),
		filename: '[name].js',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(env.NODE_ENV),
				API_BASE_URL: JSON.stringify(env.API_BASE_URL),
			},
		}),
		new ExtractTextPlugin('main.css'),
		// new BundleAnalyzerPlugin({
		// 	// Can be `server`, `static` or `disabled`.
		// 	// In `server` mode analyzer will start HTTP server to show bundle report.
		// 	// In `static` mode single HTML file with bundle report will be generated.
		// 	// In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting
		// 	// `generateStatsFile` to `true`.
		// 	analyzerMode: 'server',
		// 	// Port that will be used by in `server` mode to start HTTP server.
		// 	analyzerPort: 8888,
		// 	// Path to bundle report file that will be generated in `static` mode.
		// 	// If relative path is provided, it will be relative to bundles output directory
		// 	reportFilename: 'report.html',
		// 	// Automatically open report in default browser
		// 	openAnalyzer: true,
		// 	// If `true`, Webpack Stats JSON file will be generated in bundles output directory
		// 	generateStatsFile: false,
		// 	// Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
		// 	// Relative to bundles output directory.
		// 	statsFilename: 'stats.json',
		// }),
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							ignore: "node_modules",
							sourceRoot: __dirname,
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
				}),
			},
			{
				test: /\.(woff|woff2)(.*)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							mimetype: 'application/font-woff',
						},
					},
				],
			},
			{
				test: /\.ttf(.*)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							mimetype: 'application/octet-stream',
						},
					},
				],
			},
			{
				test: /\.eot(.*)$/,
				use: [
					'file-loader',
				],
			},
			{
				test: /\.otf(.*)$/,
				use: [
					'file-loader',
				],
			},
			{
				test: /\.svg(.*)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							mimetype: 'image/svg+xml',
						},
					},
				],
			},
			{
				test: /\.(jpg|JPG|png|PNG)$/,
				use: [
					'file-loader',
				],
			},
		],
	},
};

if (DEBUG) {
	config.plugins = config.plugins.concat([
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js',
		}),
	]);
} else {
	config.plugins = config.plugins.concat([
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: '[name].js',
			// filename: '[name].[chunkhash].js',
		}),
		new webpack.optimize.UglifyJsPlugin({
			test: /\.(js|jsx)$/,
			sourceMap: true,
			comments: false,
			compress: {
				unused: true,
				drop_console: true,
				pure_funcs: ['console.log'],
			},
		}),
	]);
}

module.exports = config;
