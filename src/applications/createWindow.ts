import type { App } from 'electron';
import { BrowserWindow, Menu, dialog } from 'electron';

import { ApplicationSettingsController } from '../application/ApplicationSettingsController';


declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

/**
 *
 */
export function createWindow(app: App): BrowserWindow {
	const application = app;
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		// icon: path.join(__dirname, 'front', 'favicon.ico'),
		// other
		// useContentSize: true,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
			nodeIntegration: true
			// sandbox: false,
			// webviewTag: false
			// webSecurity: false
		}
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	// Open the DevTools.
	if (process.env.NODE_ENV === 'development') {
		mainWindow.webContents.openDevTools();
	}

	// Emitted when the window is closed.
	// mainWindow.on('closed', () => {
	// 	// Dereference the window object, usually you would store windows
	// 	// in an array if your app supports multi windows, this is the time
	// 	// when you should delete the corresponding element.
	// 	// mainWindow = null;
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
										{ name: 'Kiosk configuration', extensions: [`${process.env.APPLICATION}.cfg`] },
										{ name: 'All Files', extensions: ['*'] }
									]
								});
								if (!result.canceled && result.filePaths.length > 0) {
									const settingsController = new ApplicationSettingsController();
									const settings = settingsController.loadSettings(result.filePaths[0]);
									settingsController.saveDefaultSettings(settings, application);
									mainWindow.reload();
								}
							}
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
										{ name: 'Kiosk configuration', extensions: [`${process.env.APPLICATION}.cfg`] },
										{ name: 'All Files', extensions: ['*'] }
									]
								});
								if (!result.canceled && result.filePath) {
									const settingsController = new ApplicationSettingsController();
									const settings = settingsController.loadDefaultSettings(application);
									settingsController.saveSettings(result.filePath, settings);
								}
							}
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
