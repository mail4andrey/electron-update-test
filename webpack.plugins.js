const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
// require('dotenv').config();

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  /** Копируем файлы в папку сборки */
	// new CopyWebpackPlugin({
	// 	patterns: [
	// 		{ from: "source", to: "dest" },
	// 		{ from: "other", to: "public" },
	// 	],
	// 	options: {
	// 		concurrency: 100,
	// 	},
	// }),
  new CopyWebpackPlugin({
	patterns: [
	{
		from: path.resolve(__dirname, 'src', 'content'),
		to: path.resolve(__dirname, '.webpack/renderer/main_window', 'content')
	}
	]}),
	// /** Определяем переменные, которые будут использоваться в код приложения */
	// new webpack.DefinePlugin({
	// 	'process.env': {
	// 		APPLICATION: process.env.APPLICATION,
	// 		DEFAULTPORT: process.env.DEFAULTPORT,
	// 	}
	// }),
	// new webpack.EnvironmentPlugin({
	// 	// NODE_ENV: 'production',
	// 	FLUENTFFMPEG_COV: '',
	// }),
    new webpack.DefinePlugin({
        'process.env.FLUENTFFMPEG_COV': false
    }),
	new webpack.EnvironmentPlugin({
		FLUENTFFMPEG_COV: false,
	})
];
