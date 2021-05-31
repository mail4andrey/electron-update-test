/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import bodyParser from 'body-parser';
import cors from 'cors';
import { app, BrowserWindow, ipcMain } from 'electron';
import express from 'express';


import http from 'http';
import path from 'path';


import { ApplicationSettingsController } from '../../application/ApplicationSettingsController';
import { createWindow } from '../../ApplicationWindow';
import { ElectronCommands } from '../../ElectronCommands';
import { EmailHelper } from '../../helpers/EmailHelper';
import { EmailSendingModel } from '../../settings/EmailSendingModel';
import { DesignSettingsModel } from '../../src-front/models/DesignSettingsModel';
import { setupUpdates } from '../../update';

setupUpdates();

if (require('electron-squirrel-startup')) {
	app.quit();
}
let mainWindow: BrowserWindow | undefined;

app.on('ready', () => {
	mainWindow = createWindow(app);
});

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

ipcMain.on('app_version', event => {
	event.sender.send('app_version', { version: app.getVersion() });
});


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
expressApp.use(express.static(path.join(__dirname, 'front')));

const settingsСontroller = new ApplicationSettingsController();
/**  */
const getSettings = (app?: Electron.App) => settingsСontroller.loadDefaultSettings(app);

router.get('/settings', (req, res) => {
	try {
		const settings = getSettings(app);
		const designSettings = settings.designSettings ?? {} as DesignSettingsModel;
		res.type('application/json');
		res.send(designSettings);
	} catch (error) {
		console.error(error);
	}
});

router.get('/hc', (req, res) => {
	try {
		res.send(`Ok ${new Date()}`);
	} catch (error) {
		console.error(error);
	}
});
router.get('/', (req, res) => {
	try {
		res.sendFile(path.join(__dirname, 'front', 'front.html'));
	} catch (error) {
		console.error(error);
	}
});

expressApp.use('/', router);

const applicationController = new ApplicationSettingsController();
const settingsDefault = applicationController.loadDefaultSettings(app);
const port = settingsDefault.serverSettings?.port ?? 8001;
try {
	http.createServer(expressApp).listen(port);
} catch (error) {
	console.error(error);
}
