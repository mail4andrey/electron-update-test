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
import { EventLogger } from '../../helpers/EventLogger';
import { ProcessFileEnum } from '../../src-front/applications/spinner/views/SpinnerViewStore';
import FfmpegHelper from '../../helpers/FfmpegHelper';
import { IdGenerator } from '../../helpers/IdGenerator';
import { SpinnerSettingsFrontModel } from '../../src-front/applications/spinner/frontSettings/SpinnerSettingsFrontModel';
import { MapperHelper } from '../../helpers/MapperHelper';

/**
 *
 */
export class Spinner {

	private static eventLogger = new EventLogger();
	private static settingsApplication?: SpinnerSettingsModel;

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


		this.eventLogger = new EventLogger();
		const expressApp = express();
		const router = express.Router();
		expressApp.use(cors());
		expressApp.use(bodyParser.json({ limit: '10mb' }));
		expressApp.use(express.static(path.join(__dirname, 'front')));

		const settingsController = new ApplicationSettingsController();
		/**  */
		const getSettings = (app?: Electron.App): SpinnerSettingsModel => {
			if (!this.settingsApplication) {
				this.eventLogger.info('load config');
				this.settingsApplication = settingsController.loadDefaultSettings<SpinnerSettingsModel>(app);
				if (this.settingsApplication.frontSettings) {
					this.settingsApplication.frontSettings.processVideo = false;
				}
			}

			return this.settingsApplication;
		}

		const setSettings = (settings?: SpinnerSettingsModel, app?: Electron.App) => {
			this.eventLogger.info('save config');
			settingsController.saveDefaultSettings(settings, app);
			this.settingsApplication = undefined;
		}

		const goProClient = new GoProBackendProxy();
		
		router.get(`/${UrlConsts.settingsApplicationUrl}`, (req, res) => {
			try {
				this.logReqquest(req);
				const settings = getSettings(app);
				res.type('application/json');
				res.send(settings);
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.post(`/${UrlConsts.settingsApplicationUrl}`, (req, res) => {
			try {
				this.logReqquest(req);
				const newSettings = req.body.setting as SpinnerSettingsModel;
				const settings = getSettings(app);
				MapperHelper.mapProperties(newSettings.audioSettings, settings.audioSettings);
				MapperHelper.mapProperties(newSettings.designSettings, settings.designSettings);
				MapperHelper.mapProperties(newSettings.goProSettings, settings.goProSettings);
				MapperHelper.mapProperties(newSettings.introOutroSettings, settings.introOutroSettings);
				MapperHelper.mapProperties(newSettings.overlaySettings, settings.overlaySettings);
				MapperHelper.mapProperties(newSettings.pathSources, settings.pathSources);
				MapperHelper.mapProperties(newSettings.serverSettings, settings.serverSettings);
				MapperHelper.mapProperties(newSettings.videoSettings, settings.videoSettings);
				MapperHelper.mapProperties(newSettings.zoomSettings, settings.zoomSettings);
				setSettings(settings, app);
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.get(`/${UrlConsts.settingsUrl}`, (req, res) => {
			try {
				this.logReqquest(req);
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

				result.frontSettings = settings.frontSettings;
				res.type('application/json');
				res.send(result);
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.post('/' + UrlConsts.saveFrontSettings, async (req, res) => {
			try {
				this.logReqquest(req);
				const frontSetting = req.body.setting as SpinnerSettingsFrontModel;
				const settings = getSettings(app);
				settings.frontSettings = frontSetting;
				setSettings(settings, app);
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.get('/' + UrlConsts.camera.getStatus, async (req, res) => {
			try {
				this.logReqquest(req);
				const result = await goProClient.getStatus();
				res.type('application/json');
				res.send(result);
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});


		router.post('/' + UrlConsts.camera.setSetting, async (req, res) => {
			try {
				this.logReqquest(req);
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
				this.logReqquest(req);
				const pcName = os.hostname()
				await goProClient.pairing(pcName);
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.post('/' + UrlConsts.camera.takePhoto, async (req, res) => {
			try {
				this.logReqquest(req);
				await goProClient.takePhoto();
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.post('/' + UrlConsts.camera.recordVideo, async (req, res) => {
			try {
				this.logReqquest(req);
				const duration = req.body.duration as number;
				await goProClient.recordVideo(duration);
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});
		router.get('/' + UrlConsts.camera.getLastFile + '/:fileType', async (req, res) => {
			try {
				this.logReqquest(req);
				const fileType = req.params.fileType as DownloadLastFileType;
				const filename = await goProClient.getLastFile(fileType);
				const response = {filename};
				res.send(response);
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});
		router.get('/' + UrlConsts.camera.downloadFile + '/:fileType/:directory/:filename', async (req, res) => {
			try {
				this.logReqquest(req);
				const fileType = req.params.fileType as DownloadLastFileType;
				const directory = req.params.directory;
				const filename = req.params.filename;
				const processVideo = req.query.processVideo;
				const file = await goProClient.downloadFile(directory, filename);
				const settings = getSettings(app);
				const downloadPath = fileType === DownloadLastFileType.Video
					? settings.goProSettings?.goProVideoPath
					: settings.goProSettings?.goProPhotoPath;
				if (file && downloadPath) {
					FileHelper.writeFile(file, downloadPath, filename);
					console.log(file?.size);
				}
				if (file
					&& fileType === DownloadLastFileType.Video
					&& processVideo
					&& settings.pathSources?.pathSource) {
					const processPath = settings.pathSources.pathSource;
					FileHelper.writeFile(file,  processPath, filename);
				}
				
				// save file to gopro path
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});
		router.delete('/' + UrlConsts.camera.deleteFile, async (req, res) => {
			try {
				this.logReqquest(req);
				const filename = req.body.filename;
				await goProClient.deleteFile(filename);
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.get('/' + UrlConsts.camera.getFiles + '/:fileType', (req, res) => {
			try {
				this.logReqquest(req);
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
					case GetFilesFolderType.Common:
						sourcePaths = [
							settings.pathSources?.pathDestination ?? '',
							settings.pathSources?.pathSource ?? '',
						];
						break;

					default:
						break;
				}
				const files = FilesHelper.getFiles(sourcePaths);
				res.type('application/json');
				res.send(files);
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});
		router.get('/' + UrlConsts.getFile, (req, res) => {
			try {
				this.logReqquest(req);
				const settings = getSettings(app);
				const goProVideoPath = settings.goProSettings?.goProVideoPath ?? '';
				const goProPhotoPath = settings.goProSettings?.goProPhotoPath ?? '';
				const goProPhotoOverlayedPath = settings.goProSettings?.goProPhotoOverlayedPath ?? '';
				const pathDestination = settings.pathSources?.pathDestination ?? '';
				const pathSource = settings.pathSources?.pathSource ?? '';
				const filename = req.query.name as string;
				const allow = filename.startsWith(pathSource)
					|| filename.startsWith(goProVideoPath)
					|| filename.startsWith(goProPhotoPath)
					|| filename.startsWith(goProPhotoOverlayedPath)
					|| filename.startsWith(pathDestination);
				if (allow) {
					res.sendFile(filename);
				} else {
					res.send();
				}
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.post('/' + UrlConsts.process.processVideo, async (req, res) => {
			const settings = getSettings(app);
			if (settings.frontSettings) {
				settings.frontSettings.processVideo = true;
			}

			try {
				const traceId = IdGenerator.getNewGenericId();
				this.logReqquest(req);

				await FfmpegHelper.processvideos(settings.pathSources?.pathSource, settings, traceId, false);
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
			if (settings.frontSettings) {
				settings.frontSettings.processVideo = false;
			}
		});

		router.post('/' + UrlConsts.process.processTestVideo, async (req, res) => {
			const settings = getSettings(app);
			if (settings.frontSettings) {
				settings.frontSettings.processVideo = true;
			}
			try {
				const traceId = IdGenerator.getNewGenericId();
				this.logReqquest(req);
				const file = settings.pathSources?.pathTestSource;
				await FfmpegHelper.processvideo(file, settings, traceId, true);
				res.send();
			} catch (error) {
				Spinner.parseError(error, res);
			}
			if (settings.frontSettings) {
				settings.frontSettings.processVideo = false;
			}
		});

		router.get('/data', (req, res) => {
			try {
				this.logReqquest(req);
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		router.get('/hc', (req, res) => {
			try {
				this.logReqquest(req);
				res.send(`Ok ${new Date()}`);
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});
		router.get('/', (req, res) => {
			try {
				this.logReqquest(req);
				res.sendFile(path.join(__dirname, 'front', 'front.html'));
			} catch (error) {
				Spinner.parseError(error, res);
			}
		});

		expressApp.use('/', router);

		const settingsDefault = getSettings(app);
		const port = settingsDefault.serverSettings?.port ?? Number(process.env.DEFAULTPORT);
		UrlHelper.setport(port);
		try {
			http.createServer(expressApp).listen(port);
		} catch (error) {
			Spinner.parseError(error);
		}

	}

	/** */
	private static logReqquest(req: any) {
		var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
		this.eventLogger.info('backend ' + ip + ' ' + req.method + ' ' + req.originalUrl + ' ' + JSON.stringify(req.params) + ' ' + JSON.stringify(req.body));
	}

	/** */
	private static parseError(error: any, res?: any) {
		const errorType = ErrorHelper.getErrorType(error);
		if (res && errorType === ErrorTypeEnum.RequestTimeout) {
			res.status(HttpCodes.RequestTimeout).send('Request timeout to camera');
			this.eventLogger.error('Request timeout to camera');
		}
		else {
			this.eventLogger.error(error);
		}
	}
}


