import { BrowserWindow, Menu, dialog } from 'electron';

import { ApplicationSettingsController } from './application/ApplicationSettingsController';

import path from 'path';


declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// let mainWindow: BrowserWindow | null = null;

/**
 *
 */
// @provider(ApplicationSettingsStore)
export function createWindow(app: Electron.App): BrowserWindow {

	const application = app;
	//   if (mainWindow) return mainWindow;

	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		// icon: path.join(__dirname, 'front', 'favicon.ico'),
		// other
		// useContentSize: true,
		webPreferences: {

			// preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
			nodeIntegration: true,
			// sandbox: false,
			// webviewTag: false
			webSecurity: false
		}
	});

	//   mainWindow.loadFile("./dist/static/index.html");
	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	// Open the DevTools.
	if (process.env.NODE_ENV === 'development') {
		mainWindow.webContents.openDevTools();
	}

	// mainWindow.on('ready', () => {
	// 	alert('ready');
	// });

	// mainWindow.on('closed', () => {
	// 	alert('close');
	// 	mainWindow = null;
	// });

	const menu = Menu.buildFromTemplate([
		{
			label: 'File',
			submenu: [
				{
					label: 'Configuration',
					submenu: [
						{
							label: 'Open Configuration',
							accelerator: 'CmdOrCtrl+O',
							/**
							 *
							 */
							click: async (): Promise<void> => {
								const result = await dialog.showOpenDialog(mainWindow, {
									title: 'Open Configuration',
									// defaultPath : "my_filename",
									buttonLabel: 'Open',
									filters: [
										{ name: 'Kiosk configuration', extensions: ['kiosk.cfg'] },
										{ name: 'All Files', extensions: ['*'] }
									]
								});
								if (!result.canceled && result.filePaths.length > 0) {
									const settingsController = new ApplicationSettingsController();
									const settings = settingsController.loadSettings(result.filePaths[0]);
									settingsController.saveDefaultSettings(settings, application);
									mainWindow.reload();
								}
							},
						},
						{
							label: 'Save Configuration',
							accelerator: 'CmdOrCtrl+S',
							/**
							 *
							 */
							click: async (): Promise<void> => {
								const result = await dialog.showSaveDialog(mainWindow, {
									title: 'Save Configuration',
									// defaultPath : "my_filename",
									buttonLabel: 'Save',
									filters: [
										{ name: 'Kiosk configuration', extensions: ['kiosk.cfg'] },
										{ name: 'All Files', extensions: ['*'] }
									]
								});
								if (!result.canceled && result.filePath) {
									const settingsController = new ApplicationSettingsController();
									const settings = settingsController.loadDefaultSettings(application);
									settingsController.saveSettings(result.filePath, settings);
								}
							},
						}
					]
				},
				// { type: 'separator' },
				// {
				// 	label: 'Language',
				// 	submenu: [
				// 		{
				// 			label: 'English',
				// 			type: 'radio',
				// 			checked: true
				// 		},
				// 		{
				// 			label: 'Русский',
				// 			type: 'radio',
				// 			checked: false
				// 		},
				// 	]
				// },
				{ type: 'separator' },
				{
					label: 'Exit',
					role: 'close',
					// click() {
					//     app.quit()
					// },
					accelerator: 'Alt+F4'
				}
			]
		},
		{
			label: '?',
			submenu: [
				{
					label: 'Reload',
					role: 'reload',
					accelerator: 'F5'
				},
				{ label: 'Log view' },
				{ type: 'separator' },
				{
					label: 'About',
					// accelerator: 'CmdOrCtrl+Shift+C'
					role: 'about',
					accelerator: 'F2'
				}
			]
		}
	]);
	Menu.setApplicationMenu(menu);

	mainWindow.focus();
	return mainWindow;
}
