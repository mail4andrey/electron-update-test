/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import cors from 'cors';
import { app, BrowserWindow, ipcMain } from 'electron';
import express from 'express';


import { ApplicationSettingsController } from './application/ApplicationSettingsController';
import { ApplicationSettingsStore } from './application/ApplicationSettingsStore';
import { createWindow } from './ApplicationWindow';
import { ElectronCommands } from './ElectronCommands';
import { MailService } from './helpers/EmailHelper';
import { FilesHelper } from './helpers/FilesHelper';
import { EmailSecndingModel as EmailSendingModel } from './settings/EmailSendingModel';

// import fs from 'fs';
import http from 'http';
import path from 'path';

// import { createWindow } from './windows';
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
// let mainWindow: BrowserWindow;

// /** ss */
// function createWindow(): BrowserWindow {
// 	return createWindow();
// }

/**
 *
 */
// const createWindow0 = () => {
// 	// Create the browser window.
// 	mainWindow = new BrowserWindow({
// 		height: 600,
// 		width: 800,
// 	});

// 	// and load the index.html of the app.
// 	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

// 	// Open the DevTools.
// 	mainWindow.webContents.openDevTools();

// 	// mainWindow.once('ready-to-show', () => {
// 	//   autoUpdater.checkForUpdatesAndNotify();
// 	// });
// };

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


/** ddd */
ipcMain.handle(ElectronCommands.sendEmail, async (_event: Event, email: EmailSendingModel): Promise<void> => {
	try {
		console.log(email);
		await MailService.sendMail(email);
	} catch (error) {
		console.error(error);
	}
});


const expressApp = express();
const router = express.Router();
expressApp.use(cors());
// expressApp.use(express.static('public'));
// expressApp.use(express.static('main_window'));
expressApp.use(express.static(path.join(__dirname, 'front')));

router.get('/files', (req, res) => {
	const settings = ApplicationSettingsController.loadDefaultSettings(app);
	const { pathSources } = settings;
	console.log(ApplicationSettingsStore.settings);
	console.log(settings);
	const files = FilesHelper.getFiles(pathSources);
	res.type('application/json');
	res.send(files);
});
router.get('/file', (req, res) => {
	// console.log(req);
	const filename = req.query.name as string;
	// const filename = req.params.name;
	console.log(filename);
	// if (fs.existsSync(filename)) {
	res.sendFile(filename);
	// }
});
router.get('/hc', (req, res) => {
	res.send(`Ok ${new Date()}`);
});
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'front', 'front.html'));
});
// router.get('/front.js', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'front', 'front.js'));
// });
// router.get('/favicon.ico', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'front', 'favicon.ico'));
// });

expressApp.use('/', router);

http.createServer(expressApp).listen(8001);
