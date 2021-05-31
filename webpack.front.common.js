const path = require('path');
const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** Общие настройки webpack */
module.exports = env => {
	console.log('front env: ', env);
	console.log('front APPLICATION: ', process.env.APPLICATION);
	/** адрес сервера, для rest api запросов */
	const serverUrl = env.server_url || 'http://127.0.0.1:8001';
	/** режим сборки - development / production */
	const buildMode = env.build_mode || 'production';
	/** путь, в котором лежат Sources в браузере */
	const publicPath = env.public_path || '';
	/** базовый адрес приложения */
	const basePath = publicPath + '/';

	return {
		/** Режим сборки - development / production */
		mode: buildMode,
		context: path.resolve(__dirname),
		stats: {
			modules: false
		},
		/** Точка входа приложения */
		entry: {
			main: ['core-js', './src/src-front/' + process.env.APPLICATION + '/boot.tsx']
		},
		/** Точка входа приложения */
		// entry: {
		// 	main: ['core-js', './src/src-front/boot.tsx']
		// 	// main: ['core-js', 'react-hot-loader/patch', './src/boot.tsx']
		// },
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			modules: ['./src/src-front','./src/elements', 'node_modules'],
			// alias: { 'react-dom': '@hot-loader/react-dom'  }
		},
		output: {
			path: path.resolve(__dirname, 'dist-front'),
			filename: 'front.js',
			publicPath: publicPath
			// publicPath: ''
		},
		node: {
			fs: 'empty'
		},
		module: {
			rules: [
				// {
				// 	test: /\.(js|jsx)$/,
				// 	loader: 'babel-loader',
				// 	query: {
				// 		presets: ['es2015']
				// 		// presets: ['es2015', 'stage-0', 'react']
				// 	},
				// 	include: [
				// 		path.resolve(__dirname, 'node_modules/@tinkoff-ui/cardLogo'),
				// 		path.resolve(__dirname, 'node_modules/@tinkoff-ui/icon')
				// 	]
				// },
				// {
				// 	test: /\.(ts|tsx)?$/,
				// 	// test: /\.ts$/,
				// 	include: [
				// 		path.resolve(__dirname, 'src-front'),
				// 		path.resolve(__dirname, 'src/elements'),
				// 	],
				// 	use: [{
				// 		loader: 'ts-loader',
				// 		options: {
				// 			configFile: "tsconfig.front.json"
				// 		}
				// 	}],
				// 	// exclude: /node_modules/,
				// },
				{
					test: /\.(ts|tsx)?$/,
					// include: /src/,
					include: [
						path.resolve(__dirname, 'src/src-front'),
						path.resolve(__dirname, 'src/elements'),
						path.resolve(__dirname, 'src/helpers'),
					],
					loader: 'awesome-typescript-loader',
					options: {
						configFileName: "tsconfig.front.json"
					}
				},
				{
					test: /\.(png|woff|woff2|eot|ttf|jpg|jpeg|gif)$/,
					use: 'url-loader?limit=25000&name=./images/[name].[hash:6].[ext]'
				},
				{
					test: /\.ico$/,
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '/'
					}
				},
				{
					/** Загружаем svg, как файлы в папку /svg */
					test: /\.svg$/,
					loader: 'file-loader',
					options: {
						name: '[name].[hash:6].[ext]',
						outputPath: '/svg'
					}
				},
				{
					/** Загружаем csv, как файлы в папку /csv */
					test: /\.csv$/,
					loader: 'file-loader',
					options: {
						name: '[name].[hash:6].[ext]',
						outputPath: '/csv'
					}
				},
				{
					test: /\.css$/,
					use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
				},
				// {
				// 	/** Собираем все css файлы */
				// 	test: /\.css$/,
				// 	use: [
				// 		MiniCssExtractPlugin.loader,
				// 		{
				// 			loader: 'css-loader',
				// 			options: {
				// 				sourceMap: true,
				// 				importLoaders: 2,
				// 				modules: {
				// 					localIdentName: '[name]__[local]___[hash:base64:5]'
				// 				}
				// 			}
				// 		}
				// 	],
				// 	include: [
				// 		path.resolve(__dirname, 'src/content'),
				// 		// path.resolve(__dirname, 'node_modules/@platform-ui/')
				// 	]
				// },
				// {
				// 	/** Собираем все scss файлы */
				// 	test: /\.scss$/,
				// 	use: [
				// 		MiniCssExtractPlugin.loader,
				// 		'css-loader',
				// 		'postcss-loader',
				// 		'sass-loader'
				// 	]
				// }
			]
		},
		/** Настройка для локального запуска фронта */
		devServer: {
			disableHostCheck: true,
			port: 8080,
			historyApiFallback: {
				index: 'front.html'
			}
		},
		// devServer: {
		// 	contentBase: path.join(__dirname, './dist-front/')
		// },
		plugins: [
			new HtmlWebpackPlugin({
				hash: true,
				template: './src/src-front/front.html',
				filename: 'front.html',
				basePath: basePath,
				favicon: './src/src-front/favicon.ico',
				// basePath: '/'
			}),
			new CheckerPlugin(),
			/** Копируем файлы в папку сборки */
			// new CopyWebpackPlugin([
			// 	{
			// 		from: '*.config'
			// 	}
			// ]),
			/** Собираем все стили в один файл */
			new MiniCssExtractPlugin({
				filename: 'site.css'
			}),
			/** Определяем переменные, которые будут использоваться в код приложения */
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(buildMode),
					WEBPACK_MODE: JSON.stringify(buildMode),
					SERVER_URL: JSON.stringify(serverUrl)
				}
			}),
			new webpack.ProvidePlugin({
				// 'window.jQuery': require.resolve('jquery'),
				// 'window.$': require.resolve('jquery')
			})
		]
	};
};
