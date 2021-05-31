const { smart } = require('webpack-merge');
const commonConfig = require('./webpack.main.common.js');

module.exports = env => {
	console.log('entry env: ', env);
	return smart(commonConfig, {
		/** Точка входа приложения */
		/** Точка входа приложения */
		// entry: {
		// 	main: ['./src/' + process.env.APPLICATION + '/main.ts']
		// },
		// entry: './src/kioskMain.ts'
		entry: './src/main.ts'
		// entry: './src/' + process.env.APPLICATION + 'Main.ts'
	});
};