/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import bodyParser from 'body-parser';
import cors from 'cors';
import { app, BrowserWindow, ipcMain, PrinterInfo } from 'electron';
import express from 'express';


import { ApplicationSettingsController } from './application/ApplicationSettingsController';
import { createWindow } from './ApplicationWindow';
import { ElectronCommands } from './ElectronCommands';
import { EmailHelper } from './helpers/EmailHelper';
import { FilesHelper } from './helpers/FilesHelper';
import { PrintHelper } from './helpers/PrintHelper';
import { EmailSendingModel } from './settings/EmailSendingModel';
import { EmailSettingsModel } from './settings/EmailSettingsModel';
import { PrintSendingItemModel } from './settings/PrintSendingItemModel';
import { PrinterModel, PrintSettingsModel } from './settings/PrintSettingsModel';
import { UrlHelper } from './src-front/helpers/UrlHelper';
import { DesignSettingsModel } from './src-front/models/FilesModel';

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
let mainWindow: BrowserWindow | undefined;

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
app.on('ready', () => {
	mainWindow = createWindow(app);
});

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
		mainWindow = createWindow(app);
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
		await EmailHelper.sendMail(email);
	} catch (error) {
		console.error(error);
	}
});


const expressApp = express();
const router = express.Router();
expressApp.use(cors());
expressApp.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
// expressApp.use(express.static('public'));
// expressApp.use(express.static('main_window'));
expressApp.use(express.static(path.join(__dirname, 'front')));

const settingsСontroller = new ApplicationSettingsController();
/**
 *
 */
const getSettings = (app?: Electron.App) => settingsСontroller.loadDefaultSettings(app);

router.get('/settings', (req, res) => {
	const settings = getSettings(app);
	const designSettings = settings.designSettings ?? {} as DesignSettingsModel;
	res.type('application/json');
	res.send(designSettings);
});

router.get('/files', (req, res) => {
	const settings = getSettings(app);
	const { pathSources } = settings;
	const files = FilesHelper.getFiles(pathSources);
	res.type('application/json');
	res.send(files);
});
router.get('/file', (req, res) => {
	const settings = getSettings(app);
	const { pathSources } = settings;
	const filename = req.query.name as string;
	// console.log(filename);
	const allow = pathSources?.some((pathSource: string) => filename.startsWith(pathSource));
	if (allow) {
		res.sendFile(filename);
	} else {
		res.send();
	}
});

router.post('/sendMail', async (req, res) => {
	const settings = getSettings(app);
	const { emailSettings: email } = settings;
	const sendTo = req.body.email as string;
	const sendFiles = req.body.files as string[];
	const request = new EmailSendingModel();
	request.login = email.login;
	request.password = email.password;
	request.server = email.server;
	request.subject = email.subject;
	request.content = email.content;
	request.to = sendTo;
	request.attachments = sendFiles;
	try {
		await EmailHelper.sendMail(request);
	} catch (error) {
		console.error(error);
	}
	res.send();
});
router.post('/sendMailTest', async (req, res) => {
	const email = req.body.email as EmailSettingsModel;
	const request = new EmailSendingModel();
	request.login = email.login;
	request.password = email.password;
	request.server = email.server;
	request.subject = email.subject;
	request.content = email.content;
	request.to = email.login;
	try {
		await EmailHelper.sendMail(request);
	} catch (error) {
		console.error(error);
	}
	res.send();
});

router.get('/printers', async (req, res) => {
	try {
		const printers = mainWindow?.webContents.getPrinters() ?? [];
		const printersName = printers.map((printer: PrinterInfo) => ({
			displayName: printer.displayName,
			name: printer.name,
			isDefault: printer.isDefault
		} as PrinterModel));
		res.send(printersName);
	} catch (error) {
		console.error(error);
	}
	// res.send();
});
router.post('/printData', async (req, res) => {
	const settings = getSettings(app);
	const { printSettings } = settings;
	const printData = req.body.printModel as PrintSendingItemModel[];
	// const printers = mainWindow?.webContents.getPrinters() ?? [];
	// const printerSystemName = printers.find((printer: PrinterInfo) => printer.displayName === printerName);

	for (const item of printData.filter((itemData: PrintSendingItemModel) => itemData.data)) {
		try {
			await PrintHelper.printData(item, printSettings);
		} catch (error) {
			// console.error('2');
			// console.error(error);
		}
	}
	res.send();
});
router.post('/printTest', async (req, res) => {
	// const printModel = req.body.printModel as PrintSendingModel;
	const printSettings = req.body.printModel as PrintSettingsModel;
	// const printers = mainWindow?.webContents.getPrinters() ?? [];
	// const printerSystemName = printers.find((printer: PrinterInfo) => printer.displayName === printModel.printer);

	// const items = printModel.items ?? [];
	// for (const item of items.filter((itemData: PrintSendingItemModel) => itemData.data)) {
	try {
		await PrintHelper.printData(undefined, printSettings);
	} catch (error) {
		console.error(error);
	}
	// }
	res.send();
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

const applicationController = new ApplicationSettingsController();
const settings = applicationController.loadDefaultSettings(app);
const port = settings.serverSettings?.port ?? 8001;
// UrlHelper.setport(port);
try {
	http.createServer(expressApp).listen(port);
} catch (error) {
	console.error(error);
}
