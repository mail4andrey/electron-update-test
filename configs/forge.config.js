module.exports = {
// module.exports = env => {
	// console.log('forge env: ', env);
	// return {
		"packagerConfig": {
			"icon": "icon.ico"
		},
		"makers": [
			{
				"name": "@electron-forge/maker-squirrel",
				"config": {
					"name": "selfiebox-" + process.env.APPLICATION
				},
				"platforms": [
					"win32"
				]
			},
			{
				"name": "@electron-forge/maker-zip",
				"platforms": [
					"darwin",
					"win32"
				]
			},
			{
				"name": "@electron-forge/maker-deb",
				"config": {},
				"platforms": [
					"linux"
				]
			},
			{
				"name": "@electron-forge/maker-rpm",
				"config": {},
				"platforms": [
					"linux"
				]
			}
		],
		"plugins": [
			[
				"@electron-forge/plugin-webpack",
				{
					"mainConfig": "./webpack.main.config.js",
					// "mainConfig": "./webpack.main." + process.env.APPLICATION + ".js",
					"renderer": {
						"config": "./webpack.renderer.config.js",
						"entryPoints": [
							{
								"html": "./src/index.html",
								"js": "./src/renderer-" + process.env.APPLICATION + ".ts",
								"js0": "./src/renderer.ts",
								"js1": "./src/applications/" + process.env.APPLICATION + "/renderer.tsx",
								"name": "main_window"
							}
						]
					}
				}
			]
			// [
			// 	'@electron-forge/plugin-electronegativity',
			// 	{
			// 		isSarif: true
			// 	}
			// ]
		]
	// };
};