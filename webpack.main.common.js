const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
// module.exports = env => {
// 	console.log('main env: ', env);
// 	return {
		/** Точка входа приложения */
		// entry: './src/main.ts',
		entry: './src/applications/' + process.env.APPLICATION + '/main.ts',
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
			})
		],
	// };
};