const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
];
