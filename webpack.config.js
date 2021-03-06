/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
	mode,
	entry: {
		app: path.join(__dirname, 'src', 'index.tsx'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.svg$/,
				use: [
					'@svgr/webpack',
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]?[hash]',
						},
					},
				],
			},
			{
				test: /\.png$/,
				loader: 'file-loader',
				options: {
					name: 'images/[name].[ext]?[hash]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			templateParameters: {
				env: process.env.NODE_ENV === 'production' ? '' : '[DEV]',
			},
			minify:
				process.env.NODE_ENV === 'production'
					? {
						collapseWhitespace: true,
						removeComments: true,
					}
					: false,
		}),
		new CleanWebpackPlugin(),
		new BundleAnalyzerPlugin({
			openAnalyzer: false,
			analyzerMode: 'static',
			reportFilename: '../analyzer/report.html',
		}),
	],
};
