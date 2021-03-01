import { BrowserWindow, Menu, dialog } from 'electron';

import { ApplicationSettingsController } from './application/ApplicationSettingsController';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

let mainWindow: BrowserWindow | null = null;

/**
 *
 */
// @provider(ApplicationSettingsStore)
export function createWindow(): BrowserWindow {

	//   if (mainWindow) return mainWindow;

	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
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
	mainWindow.webContents.openDevTools();

	// mainWindow.on('ready', () => {
	// 	alert('ready');
	// 	ApplicationSettingsController.loadSettings();
	// });

	// mainWindow.on('closed', () => {
	// 	alert('close');
	// 	ApplicationSettingsController.saveSettings();
	// 	mainWindow = null;
	// });

	const menu = Menu.buildFromTemplate([
		{
			label: 'File',
			submenu: [
				{ label: 'Configuration' },
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
								{ name: 'cfg', extensions: ['cfg'] },
								{ name: 'All Files', extensions: ['*'] }
							]
						});
						if (!result.canceled && result.filePaths.length > 0) {
							ApplicationSettingsController.loadSettings(result.filePaths[0]);
							// ApplicationSettingsController.saveDefaultSettings();
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
								{ name: 'cfg', extensions: ['cfg'] },
								{ name: 'All Files', extensions: ['*'] }
							]
						});
						if (!result.canceled && result.filePath) {
							ApplicationSettingsController.saveSettings(result.filePath);
						}
					},
				},
				{ type: 'separator' },
				{
					label: 'Language',
					submenu: [
						{
							label: 'English',
							type: 'radio',
							checked: true
						},
						{
							label: 'Русский',
							type: 'radio',
							checked: false
						},
					]
				},
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

	return mainWindow;
}
