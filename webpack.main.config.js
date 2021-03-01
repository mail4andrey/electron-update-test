const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	entry: './src/main.ts',
	/** Точка входа приложения */
	// entry: {
	// 	main: ['core-js', 'react-hot-loader/patch', './src/boot.tsx']
	// },
	// entry: {
	// 	main: ['core-js', 'react-hot-loader/patch', './src/boot.tsx']
	// },
	// Put your normal webpack config below here
	module: {
		rules: require('./webpack.rules'),
	},
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
		modules: ['./src', 'node_modules'],
	},
	context: path.resolve(__dirname),

	plugins: [
	  new CopyPlugin({
		patterns: [
			{ from: "dist-front", to: "front" },
			// { from: "src/front/", to: "dest" },
			// { from: "src/front", to: "dest" }
		],
	  }),
	],
};