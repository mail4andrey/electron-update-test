/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import bodyParser from 'body-parser';
import cors from 'cors';
import { app, BrowserWindow, ipcMain } from 'electron';
import express from 'express';
import os from 'os';

import type { SpinnerSettingsModel } from './settings/SpinnerSettingsModel';

import http from 'http';
import path from 'path';


import { ApplicationSettingsController } from '../../application/ApplicationSettingsController';
import { ElectronCommands } from '../../ElectronCommands';
import { EmailHelper } from '../../helpers/EmailHelper';
import { UrlConsts } from '../../src-front/const/UrlConsts';
import type { DesignSettingsModel } from '../../src-front/models/DesignSettingsModel';
import type { BaseApplicationSettingsModel } from '../base/settings/BaseApplicationSettingsModel';
import { createWindow } from '../createWindow';
import type { EmailSendingModel } from '../kiosk/settings/EmailSendingModel';
import { setupUpdates } from '../update';
import { UrlHelper } from '../../src-front/helpers/UrlHelper';
import { SpinnerSettingsFromServerModel, ITitleValueModel } from '../../src-front/applications/spinner/views/SpinnerSettingsFromServerViewModel';
import { GoProBackendProxy } from '../../helpers/proxy/GoProBackendProxy';
import { Timer } from '../../helpers/Timer';
import { CameraStateModel, CameraSettingEnum } from '../../src-front/models/CameraStateModel';
import { ErrorHelper } from '../../helpers/ErrorHelper';
import { ErrorTypeEnum } from '../../helpers/ErrorTypeEnum';
import { HttpCodes } from '../../helpers/HttpCodes';
import { DownloadLastFileType, GetFilesFolderType } from '../../src-front/models/DownloadLastFileType';
import { FileHelper } from '../../src-front/helpers/FileHelper';
import { FilesHelper } from '../../helpers/FilesHelper';

/**
 *
 */
export class Spinner {
	// /**
	//  *
	//  */
	// private static getGoProStatus = async (): Promise<void> => {
	// 	;
	// }

	/**
	 *
	 */
	public static run(): void {

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
		const getSettings = (app?: Electron.App) => settingsСontroller.loadDefaultSettings<SpinnerSettingsModel>(app);

		const goProClient = new GoProBackendProxy();
		// const timer = new Timer(10000, getGoProStatus);
		// timer.execute();
		router.get(`/${UrlConsts.settingsUrl}`, (req, res) => {
			try {
				const settings = getSettings(app);
				const result = new SpinnerSettingsFromServerModel();
				result.designSettings = settings.designSettings;
				result.pathDestination = settings.pathSources?.pathDestination;
				result.pathSource = settings.pathSources?.pathSource;
				result.goProVideoPath = settings.goProSettings?.goProVideoPath;
				result.removeFromGoPro = settings.goProSettings?.removeFromGoPro;
				if (settings.introOutroSettings?.enable) {
					result.introOutroItems = settings.introOutroSettings?.items?.map(item => {return { value: item.guid, title: item.name} as ITitleValueModel; });
				}

				if (settings.audioSettings?.enable) {
					result.audioItems = settings.audioSettings?.items?.map(item => {return { value: item.guid, title: item.name} as ITitleValueModel; });
				}
				
				if (settings.zoomSettings?.enable) {
					result.zoomItems = settings.zoomSettings?.items?.map(item => {return { value: item.guid, title: item.name} as ITitleValueModel; });
				}
				
				if (settings.overlaySettings?.enable) {
					result.overlayItems = settings.overlaySettings?.items?.map(item => {return { value: item.guid, title: item.name} as ITitleValueModel; });
				}
				// const designSettings = settings.designSettings ?? {} as DesignSettingsModel;
				res.type('application/json');
				res.send(result);
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.get('/' + UrlConsts.camera.getStatus, async (req, res) => {
			try {
				const result = await goProClient.getStatus();
				res.type('application/json');
				res.send(result);
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});


		router.post('/' + UrlConsts.camera.setSetting, async (req, res) => {
			try {
				const setting = req.body.setting as CameraSettingEnum;
				const value = req.body.value as string;
				await goProClient.setSetting(setting, value);
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});


		router.post('/' + UrlConsts.camera.pairing, async (req, res) => {
			try {
				const pcName = os.hostname()
				await goProClient.pairing(pcName);
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.post('/' + UrlConsts.camera.takePhoto, async (req, res) => {
			try {
				await goProClient.takePhoto();
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.post('/' + UrlConsts.camera.recordVideo, async (req, res) => {
			try {
				const duration = req.body.duration as number;
				await goProClient.recordVideo(duration);
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});
		// app.get('/user/:uid/photos/:file', function(req, res){
		// 	var uid = req.params.uid
		// 	  , file = req.params.file;
		router.get('/' + UrlConsts.camera.getLastFile + '/:fileType', async (req, res) => {
			try {
				console.log(req.params);
				const fileType = req.params.fileType as DownloadLastFileType;
				// console.log('fileType: ' + fileType);
				// const fileType = req.body.fileType as DownloadLastFileType;
				const filename = await goProClient.getLastFile(fileType);
				const response = {filename};
				res.send(response);
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});
		router.get('/' + UrlConsts.camera.downloadFile + '/:fileType/:directory/:filename', async (req, res) => {
			try {
				console.log(req.params);
				const fileType = req.params.fileType as DownloadLastFileType;
				const directory = req.params.directory;
				const filename = req.params.filename;
				const file = await goProClient.downloadFile(directory, filename);
				const settings = getSettings(app);
				const downloadPath = fileType === DownloadLastFileType.Video
					? settings.goProSettings?.goProVideoPath
					: settings.goProSettings?.goProPhotoPath;
				if (file && downloadPath) {
					FileHelper.writeFile(file, downloadPath, filename);
					console.log(file?.size);
				}
				
				// save file to gopro path
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});
		router.delete('/' + UrlConsts.camera.deleteFile, async (req, res) => {
			try {
				// const directory = req.body.directory;
				console.log(req.body);
				const filename = req.body.filename;
				await goProClient.deleteFile(filename);
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.get('/' + UrlConsts.camera.getFiles + '/:fileType', (req, res) => {
			try {
				const fileType = req.params.fileType as GetFilesFolderType;
				const settings = getSettings(app);
				let sourcePaths: string[] = [];
				switch (fileType) {
					case GetFilesFolderType.GoProPaths:
						sourcePaths = [
							settings.goProSettings?.goProVideoPath ?? '',
							settings.goProSettings?.goProPhotoPath ?? '',
							settings.goProSettings?.goProPhotoOverlayedPath ?? '',
						];
						break;

					// case GetFilesFolderType.GoProPhotoOverlayed:
					// 	sourcePath = settings.goProSettings?.goProPhotoOverlayedPath ?? '';
					// 	break;

					default:
						break;
				}
				// const sourcePath = settings.goProSettings?.goProVideoPath ?? '';
				// const pathDestination = settings.pathSources?.pathDestination ?? '';
				const files = FilesHelper.getFiles(sourcePaths);
				res.type('application/json');
				res.send(files);
			} catch (error) {
				console.error(error);
			}
		});
		router.get('/' + UrlConsts.getFile, (req, res) => {
			try {
				const settings = getSettings(app);
				const goProVideoPath = settings.goProSettings?.goProVideoPath ?? '';
				const goProPhotoPath = settings.goProSettings?.goProPhotoPath ?? '';
				const goProPhotoOverlayedPath = settings.goProSettings?.goProPhotoOverlayedPath ?? '';
				const pathDestination = settings.pathSources?.pathDestination ?? '';
				const pathSource = settings.pathSources?.pathSource ?? '';
				// const { pathSources } = settings;
				const filename = req.query.name as string;
				// console.log(filename);
				const allow = filename.startsWith(pathSource)
					|| filename.startsWith(goProVideoPath)
					|| filename.startsWith(goProPhotoPath)
					|| filename.startsWith(goProPhotoOverlayedPath)
					|| filename.startsWith(pathDestination);
				// const allow = pathSources?.some((pathSource: string) => filename.startsWith(pathSource));
				if (allow) {
					res.sendFile(filename);
				} else {
					res.send();
				}
			} catch (error) {
				console.error(error);
			}
		});

		router.get('/data', (req, res) => {
			try {
				// const settings = getSettings(app);
				// const { pathSources } = settings;
				// const files = FilesHelper.getFiles(pathSources);
				// res.type('application/json');
				// res.send(files);
			} catch (error) {
				Spinner.parseError(error, res);
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
		const settingsDefault = applicationController.loadDefaultSettings<BaseApplicationSettingsModel>(app);
		const port = settingsDefault.serverSettings?.port ?? Number(process.env.DEFAULTPORT);
		UrlHelper.setport(port);
		try {
			http.createServer(expressApp).listen(port);
		} catch (error) {
			console.error(error);
		}

	}

	private static parseError(error: any, res: any) {
		const errorType = ErrorHelper.getErrorType(error);
		if (errorType === ErrorTypeEnum.RequestTimeout) {
			res.status(HttpCodes.RequestTimeout).send('Request timeout to camera');
			console.error('Request timeout to camera');
		}
		else {
			console.error(error);
		}
	}
}


