module.exports = [
	// Add support for native node modules
	{
		test: /\.node$/,
		use: 'node-loader',
	},
	{
		test: /\.(m?js|node)$/,
		parser: { amd: false },
		use: {
			loader: '@marshallofsound/webpack-asset-relocator-loader',
			options: {
				outputAssetBase: 'native_modules',
			},
		},
	},
	{
		// test: /\.(ts|tsx)?$/,
		test: /\.tsx?$/,
		exclude: /(node_modules|\.webpack)/,
		use: {
			loader: 'ts-loader',
			options: {
				transpileOnly: true
			}
		}
	},
	// {
	// 	test: /\.js$/,
	// 	exclude: /node_modules/,
	// 	use: [
	// 	  { loader: "babel-loader"}
	// 	]
	// }
	// {
	// 	test: /\.ico$/,
	// 	loader: 'file-loader',
	// 	options: {
	// 		name: '[name].[ext]',
	// 		outputPath: '/'
	// 	}
	// }
	// {
	// 	test: /\.(ts|tsx)?$/,
	// 	include: /src/,
	// 	use: 'awesome-typescript-loader?silent=true'
	// }
];
