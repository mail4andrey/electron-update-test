module.exports = [
	{
	  test: /\.node$/,
	  use: 'node-loader',
	},
	// {
	//   test: /\.(m?js|node)$/,
	//   parser: { amd: false },
	//   use: {
	// 	loader: '@marshallofsound/webpack-asset-relocator-loader',
	// 	options: {
	// 	  outputAssetBase: 'native_modules',
	// 	},
	//   },
	// },
	{
	  test: /\.(m?js|node)$/,
	  parser: { amd: false },
	  use: {
		loader: "@timfish/webpack-asset-relocator-loader",
		options: {
		  outputAssetBase: "native_modules",
		},
	  },
	},
	// {
	// 	test: /\.(ts|tsx)?$/,
	// 	// test: /\.tsx?$/,
	// 	exclude: /(node_modules|.webpack)/,
	// 	loaders: [
	// 	{
	// 		loader: 'ts-loader',
	// 		options:
	// 		{
	// 			transpileOnly: true
	// 		}
	// 	}]
	// }
	// {
	// 	// For node binary relocations, include ".node" files as well here
	// 	test: /\.(m?js|node)$/,
	// 	// it is recommended for Node builds to turn off AMD support
	// 	parser: { amd: false },
	// 	use: {
	// 		loader: '@marshallofsound/webpack-asset-relocator-loader',
	// 		options: {
	// 			// optional, base folder for asset emission (eg assets/name.ext)
	// 			outputAssetBase: 'assets',
	// // 			outputAssetBase: 'native_modules',
	// 			// optional, a list of asset names already emitted or
	// 			// defined that should not be emitted
	// 			existingAssetNames: [],
	// 			wrapperCompatibility: false, // optional, default
	// 			// build for process.env.NODE_ENV = 'production'
	// 			production: true, // optional, default is undefined
	// 			cwd: process.cwd(), // optional, default
	// 			debugLog: false, // optional, default
	// 		}
	// 	}
	// },
	// Add support for native node modules
	// {
	// 	test: /\.node$/,
	// 	use: 'node-loader',
	// },
	// {
	// 	test: /\.(m?js|node)$/,
	// 	parser: { amd: false },
	// 	use: {
	// 		loader: '@marshallofsound/webpack-asset-relocator-loader',
	// 		options: {
	// 			outputAssetBase: 'native_modules',
	// 		},
	// 	},
	// },
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
