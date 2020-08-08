import { app, BrowserWindow, ipcMain } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// import { autoUpdater } from 'electron-updater';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { autoUpdater } = require('electron-updater');
require('update-electron-app')({
	// repo: 'github-user/repo',
	updateInterval: '1 hour',
	// logger: require('electron-log')
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit();
}
let mainWindow: BrowserWindow;

/**
 *
 */
const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		height: 600,
		width: 800,
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	// mainWindow.once('ready-to-show', () => {
	//   autoUpdater.checkForUpdatesAndNotify();
	// });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// autoUpdater.on('update-available', () => {
//   mainWindow.webContents.send('update_available');
// });
// autoUpdater.on('update-downloaded', () => {
//   mainWindow.webContents.send('update_downloaded');
// });

ipcMain.on('app_version', event => {
	event.sender.send('app_version', { version: app.getVersion() });
});

// ipcMain.on('restart_app', () => {
//   autoUpdater.quitAndInstall();
// });
