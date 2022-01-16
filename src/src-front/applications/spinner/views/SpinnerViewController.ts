/* eslint-disable max-classes-per-file */
import * as LocalStorage from 'local-storage';
import { inject } from 'react-ioc';

import type { ITextFieldChangeEventProps } from '../../../../elements/TextField';
import { EmailProxy } from '../../../../helpers/proxy/EmailProxy';
import { PrintProxy } from '../../../../helpers/proxy/PrintProxy';
import type { ITimer } from '../../../../helpers/Timer';
import { Timer } from '../../../../helpers/Timer';
import { UrlHelper } from '../../../helpers/UrlHelper';
import type { PathSourceFileModel } from '../../../models/PathSourceFileModel';
import type { PathSourceFilesModel } from '../../../models/PathSourceFilesModel';
import { LocalStorageConsts } from '../../../const/LocalStorageConsts';
import { SpinnerViewStore, StatusEnum, ProcessFileEnum } from './SpinnerViewStore';
import { LanguageSettingsLocalStorage } from "../../../models/LanguageSettingsLocalStorage";
import { SpinnerSettingsLocalStorage } from './SpinnerSettingsLocalStorage';
import { LanguageEnum } from '../../../../src-front/models/LanguageEnum';
import { UrlConsts } from '../../../../src-front/const/UrlConsts';
import { SpinnerSettingsFromServerModel, SpinnerSettingsFromServerViewModel } from './SpinnerSettingsFromServerViewModel';
import { MapperHelper } from '../../../../helpers/MapperHelper';
import { CameraProxy, CameraNotFound } from '../../../../helpers/proxy/CameraProxy';
import { CameraSettingEnum, CameraMode, CameraSubMode, GoProVersion, CameraModeGoPro8 } from '../../../../src-front/models/CameraStateModel';
import { TimerHelper } from '../../../../helpers/TimerHelper';
import { ErrorHelper } from '../../../../helpers/ErrorHelper';
import { ErrorTypeEnum } from '../../../../helpers/ErrorTypeEnum';
import { DownloadLastFileType, GetFilesFolderType } from '../../../../src-front/models/DownloadLastFileType';
import { KioskViewFilesViewModel } from '../../../../src-front/applications/kiosk/views/KioskViewFileViewModel';
import { KioskViewFileViewModel } from '../../../../src-front/applications/kiosk/views/KioskViewFileViewModel';
import { EventLogger } from '../../../../helpers/EventLogger';
import { SpinnerSettingsFrontViewModel, SpinnerSettingsFrontItemViewModel } from '../frontSettings/SpinnerSettingsFrontModel';
import { SpinnerLocalization } from '../../../../src-front/localization/SpinnerLocalization';
import { SettingsProxy } from '../../../../helpers/proxy/SettingsProxy';

declare const fetch: Function;

/** */
export class SpinnerViewController {
	/** */
	@inject
	private readonly store!: SpinnerViewStore;
	
	@inject
	private eventLogger!: EventLogger;

	/** */
	private readonly cameraClient = new CameraProxy();
	/** */
	private readonly settingsProxy = new SettingsProxy();

	// /** */
	// private readonly clientPrint = new PrintProxy();

	// /** */
	// private readonly clientEmail = new EmailProxy();

	private timerApplicationSettings?: ITimer;
	private timerCameraSettings?: ITimer;
	private timerGoProFiles?: ITimer;

	private delayMillisecondsAfterCommand = 1000;

	/** */
	public init = async (): Promise<void> => {
		this.store.loaded = false;
		const localSettings = LocalStorage.get<SpinnerSettingsLocalStorage | undefined>(LocalStorageConsts.localSettings);
		this.store.localSettings.recordVideoDuration = localSettings?.recordVideoDuration ?? '3.0';
		// this.store.groupBy = localSettings?.groupBy;
		// this.store.currentItemSize = localSettings?.size;
		// this.store.sortOrder = localSettings?.sortOrder;
		// this.store.iconSize = localSettings?.iconSize;

		const languageSettings = LocalStorage.get<LanguageSettingsLocalStorage | undefined>(LocalStorageConsts.languageSettings);
		this.store.language = languageSettings?.language;

		await this.loadApplicationSettings();
		this.timerApplicationSettings = new Timer(30000, this.loadApplicationSettings);
		//this.timerApplicationSettings.execute();

		await this.loadCameraSettings();
		this.timerCameraSettings = new Timer(30000, this.loadCameraSettings);
		this.timerCameraSettings.execute();

		await this.loadFiles();
		this.timerGoProFiles = new Timer(15000, this.loadFiles);
		this.timerGoProFiles.execute();

		await this.convertVideoFiles();
		this.timerGoProFiles = new Timer(500000, this.convertVideoFiles);
		this.timerGoProFiles.execute();

		this.store.loaded = true;
	};

	/** Сохраняем в local storage */
	public saveSettingsToLocalStorage(): void {
		const data = {
			recordVideoDuration: this.store.localSettings.recordVideoDuration,
		} as SpinnerSettingsLocalStorage;
		LocalStorage.set(LocalStorageConsts.localSettings, data);
	}

	/** */
	public dispose = async (): Promise<void> => {
		this.timerApplicationSettings?.stop();
		this.timerCameraSettings?.stop();
		this.timerGoProFiles?.stop();
	};

	/** */
	public pairing = async (): Promise<void> => {
		await this.cameraClient.pairing();
	};

	/** */
	public takePhoto = async (): Promise<void> => {
		try {
			await this.loadCameraSettings();
			if (this.store.cameraSettings.cameraVersion === GoProVersion.GoPro7
				&& (this.store.cameraSettings.currentMode !== CameraMode.Photo
				|| this.store.cameraSettings.currentSubMode !== CameraSubMode.SubMode1)) {
				await this.setCameraSetting(CameraSettingEnum.SubMode, CameraMode.Photo + '_' + CameraSubMode.SubMode1);
				await TimerHelper.delay(this.delayMillisecondsAfterCommand);
			}
	
			if (this.store.cameraSettings.cameraVersion === GoProVersion.GoPro8
				&& this.store.cameraSettings.currentModeGoPro8 !== CameraModeGoPro8.Photo
				&& this.store.cameraSettings.currentModeGoPro8 !== CameraModeGoPro8.BurstPhoto
				&& this.store.cameraSettings.currentModeGoPro8 !== CameraModeGoPro8.LiveBurst
				&& this.store.cameraSettings.currentModeGoPro8 !== CameraModeGoPro8.NightPhoto) {
				await this.setCameraSetting(CameraSettingEnum.Mode, CameraMode.Photo.toString());
				await TimerHelper.delay(this.delayMillisecondsAfterCommand);
			}


			this.store.status = StatusEnum.TakePhoto;
			await this.cameraClient.takePhoto();
			this.store.status = StatusEnum.GetLastFile;
			const filename = await this.cameraClient.getLastFile(DownloadLastFileType.Photo);
			this.store.statusFilename = filename;
			this.store.status = StatusEnum.DownloadFromCamera;
			await this.cameraClient.downloadFile(DownloadLastFileType.Photo, filename);
			if (this.store.settings?.removeFromGoPro) {
				this.store.status = StatusEnum.DeleteFile;
				await this.cameraClient.deleteFile(filename);
			}
			this.store.status = StatusEnum.FileCreated;
			await this.loadFiles();
			// this.store.statusFilename = undefined;
		} catch (error) {
			this.store.statusFilename = undefined;
			this.store.status = undefined;
			const errorType = ErrorHelper.getErrorType(error);
			const message = errorType + ': ' + JSON.stringify(error);
			this.eventLogger.error(message);
		}
	};

	/** */
	public recordVideo = async (): Promise<void> => {
		try {
			this.store.status = StatusEnum.RecordVideo;
			const duration = Number(this.store.localSettings.recordVideoDuration) * 1000;
			if (duration > 0) {
				await this.loadCameraSettings();
				if (this.store.cameraSettings.cameraVersion === GoProVersion.GoPro7
					&& (this.store.cameraSettings.currentMode !== CameraMode.Video
					|| this.store.cameraSettings.currentSubMode !== CameraSubMode.SubMode0)) {
				await this.setCameraSetting(CameraSettingEnum.SubMode, CameraMode.Video + '_' + CameraSubMode.SubMode0);
					await TimerHelper.delay(this.delayMillisecondsAfterCommand);
				}
				if (this.store.cameraSettings.cameraVersion === GoProVersion.GoPro8
					&& this.store.cameraSettings.currentModeGoPro8 !== CameraModeGoPro8.Video
					&& this.store.cameraSettings.currentModeGoPro8 !== CameraModeGoPro8.SloMo
					&& this.store.cameraSettings.currentModeGoPro8 !== CameraModeGoPro8.Looping) {
					await this.setCameraSetting(CameraSettingEnum.Mode, CameraMode.Video.toString());
					await TimerHelper.delay(this.delayMillisecondsAfterCommand);
				}
		
				await this.cameraClient.recordVideo(duration);
				this.store.status = StatusEnum.GetLastFile;
				const filename = await this.cameraClient.getLastFile(DownloadLastFileType.Video);
				this.store.statusFilename = filename;
				this.store.status = StatusEnum.DownloadFromCamera;
				await this.cameraClient.downloadFile(DownloadLastFileType.Video, filename);
				if (this.store.settings?.removeFromGoPro) {
					this.store.status = StatusEnum.DeleteFile;
					await this.cameraClient.deleteFile(filename);
				}
				this.store.status = StatusEnum.FileCreated;
				await this.loadFiles();
			}
		} catch (error) {
			this.store.statusFilename = undefined;
			this.store.status = undefined;
			const errorType = ErrorHelper.getErrorType(error);
			const message = errorType + ': ' + JSON.stringify(error);
			this.eventLogger.error(message);
		}
	};

	/** */
	public setCameraSetting = async (setting: CameraSettingEnum, value: string): Promise<void> => {
		await this.cameraClient.setSetting(setting, value);
		await TimerHelper.delay(500);
		await this.loadCameraSettings();
		// this.store.cameraSettings.videoSettingsIsoLimit = newSettings.videoSettingsIsoLimit;
	};

	/** */
	public saveFrontSettings = async (setting?: SpinnerSettingsFrontViewModel): Promise<void> => {
		await this.settingsProxy.saveFrontSettings(setting);
	};

	// /** zz */
	// public readonly onChangeEmail = (event: ITextFieldChangeEventProps): void => {
	// 	this.store.email = event.target.value;
	// };

	// /** */
	// public readonly onSelectItem = (_event: React.ChangeEvent<HTMLInputElement>, value: SpinnerViewItemEventProps): void => {
	// 	const selectedFile = this.store.groupsFiles
	// 		.flatMap((file: SpinnerViewFilesViewModel) => file.files)
	// 		.find((file: SpinnerViewFileViewModel) => file.fullpath === value.id);
	// 	// const selectedFile = pathSource?.files.find((file: SpinnerViewFileViewModel) => file.filename === value.id);
	// 	if (selectedFile) {
	// 		selectedFile.isSelected = value.checked ?? false;
	// 	}
	// };

	// /** */
	// public readonly onSendByEmail = async (email: string, files: SpinnerViewFileViewModel[]): Promise<void> => {
	// 	const sendFiles = files.map((file: SpinnerViewFileViewModel) => file.fullpath!);
	// 	// this.store.sending = true;
	// 	try {
	// 		await this.clientEmail.sendMail(email, sendFiles);
	// 	} catch (error) {
	// 	}
	// 	// this.store.sending = false;
	// };

	// /** */
	// public readonly sendFilesToPrint = async (filesImageBase64Data: PrintSendingItemModel[]): Promise<void> => {
	// 	try {
	// 		await this.clientPrint.print(filesImageBase64Data);
	// 	} catch (error) {
	// 	}
	// };

	// /** */
	// public readonly onItemSizeChange = (_event: React.MouseEvent<Element, MouseEvent>, value: VideoItemSizeEnum): void => {
	// 	this.store.currentItemSize = value;
	// 	this.saveSettingsToLocalStorage();
	// };

	// /** */
	// public readonly onGroupByChange = (_event: React.MouseEvent<Element, MouseEvent>, value: GroupByEnum): void => {
	// 	this.store.groupBy = value;
	// 	this.saveSettingsToLocalStorage();
	// };

	// /** */
	// public readonly onSortOrderChange = (_event: React.MouseEvent<Element, MouseEvent>, value: SortOrderEnum): void => {
	// 	this.store.sortOrder = value;
	// 	this.saveSettingsToLocalStorage();
	// };

	/** */
	public readonly onLanguageChange = (_event: React.MouseEvent<Element, MouseEvent>, value: LanguageEnum): void => {
		this.store.language = value;
		// this.saveSettingsToLocalStorage();
		const data = {
			language: this.store.language,
		} as LanguageSettingsLocalStorage;
		LocalStorage.set(LocalStorageConsts.languageSettings, data);
	};

	public testVideo = async (): Promise<void> => {
		const url = UrlHelper.getUrl(UrlConsts.process.processTestVideo);
		const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json'
			},
		});
		if (response.ok) {
			this.eventLogger.success('Test file converted');
		} else {
			this.eventLogger.error(`Ошибка HTTP: ${response.status}`);
		}
	}

	public processVideo = async (): Promise<void> => {
		const url = UrlHelper.getUrl(UrlConsts.process.processVideo);
		const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json'
			},
		});
		if (response.ok) {
			this.eventLogger.success('Test file converted');
		} else {
			this.eventLogger.error(`Ошибка HTTP: ${response.status}`);
		}
	}

	// /** */
	// public readonly onSizeChange = (_event: React.MouseEvent<Element, MouseEvent>, value: DesignSizeEnum): void => {
	// 	this.store.iconSize = value;
	// 	this.saveSettingsToLocalStorage();
	// };

	/** Сохраняем в local storage */
	// private saveSettingsToLocalStorage(): void {
	// 	const data = {
	// 		// sizgroupBye: this.store.groupBy,
	// 		// size: this.store.currentItemSize,
	// 		// sortOrder: this.store.sortOrder,
	// 		// language: this.store.language,
	// 		// groupBy: this.store.groupBy,
	// 		// iconSize: this.store.iconSize
	// 	} as SpinnerSettingsLocalStorage;
	// 	LocalStorage.set(LocalStorageConsts.localSettings, data);
	// }

	/** */
	private readonly loadApplicationSettings = async (): Promise<void> => {
		const url = UrlHelper.getUrl(UrlConsts.settingsUrl);
		const response = await fetch(url);
		if (response.ok) {
			const settings = await response.json() as SpinnerSettingsFromServerModel;
			MapperHelper.mapValues(settings, this.store.settings);
			if (!this.store.settings) {
				this.store.settings = new SpinnerSettingsFromServerViewModel();
			}
			if (!this.store.settings?.frontSettings) {
				this.store.settings.frontSettings = new SpinnerSettingsFrontViewModel();
			}
			if (!this.store.settings?.frontSettings?.presets) {
				this.store.settings.frontSettings.presets = [];
			}
			if (!this.store.settings?.frontSettings?.presets?.length) {
				const preset = new SpinnerSettingsFrontItemViewModel();
				preset.title = SpinnerLocalization.frontSettings.newPreset(1, this.store.language);
				this.store.settings.frontSettings.presets.push(preset);
			}
			if (!this.store.settings.frontSettings.selectedPresetGuid) {
				this.store.settings.frontSettings.selectedPresetGuid = this.store.settings.frontSettings.presets[0].guid;
			}
			// this.updatePathSources(serverFiles, this.store.groupsFiles);
		} else {
			this.eventLogger.error(`Ошибка HTTP: ${response.status}`);
		}
	};
	/** */
	private readonly loadCameraSettings = async (): Promise<void> => {
		try {
			const newSettings = await this.cameraClient.getStatus();
			MapperHelper.mapValues(newSettings, this.store.cameraSettings);
			// this.store.cameraNotFound = false;

			await this.cameraClient.pairing();
			this.store.cameraNotFound = false;
		} catch (error) {
			const errorType = ErrorHelper.getErrorType(error);
			if (errorType === ErrorTypeEnum.RequestTimeout
				|| errorType === ErrorTypeEnum.AbortError) {
				this.store.cameraNotFound = true;
			}

			const message = errorType + ': ' + JSON.stringify(error);
			this.eventLogger.error(message);
		}
		// const url = UrlHelper.getUrl(UrlConsts.settingsUrl);
		// const response = await fetch(url);
		// if (response.ok) {
		// 	const settings = await response.json() as SpinnerSettingsFromServerModel;
		// 	MapperHelper.mapValues(settings, this.store.settings);
		// 	// this.updatePathSources(serverFiles, this.store.groupsFiles);
		// } else {
		// 	console.error(`Ошибка HTTP: ${response.status}`);
		// }
	};

	// /** */
	// private updatePathSources(serverItems: PathSourceFilesModel[], viewItems: SpinnerViewFilesViewModel[]): void {
	// 	for (const existItem of viewItems) {
	// 		const existServerFile = serverItems.findIndex((file: PathSourceFilesModel) => file.dirname === existItem.dirname);
	// 		if (existServerFile < 0) {
	// 			const existFileIndex = viewItems.findIndex((file: SpinnerViewFilesViewModel) => file.dirname === existItem.dirname);
	// 			viewItems.splice(existFileIndex, 1);
	// 		}
	// 	}
	// 	for (const serverItem of serverItems) {
	// 		const existItem = viewItems.find((file: SpinnerViewFilesViewModel) => file.dirname === serverItem.dirname);
	// 		if (!existItem) {
	// 			const newItem = new SpinnerViewFilesViewModel();
	// 			newItem.dirname = serverItem.dirname;
	// 			viewItems.push(newItem);
	// 			this.updatePathSource(serverItem.files ?? [], newItem.files);
	// 		} else {
	// 			this.updatePathSource(serverItem.files ?? [], existItem.files);
	// 		}
	// 	}
	// }

	// /** */
	// private updatePathSource(serverFiles: PathSourceFileModel[], viewFiles: SpinnerViewFileViewModel[]): void {
	// 	for (const existFile of viewFiles) {
	// 		const existServerFile = serverFiles.findIndex((file: PathSourceFileModel) => file.fullpath === existFile.fullpath);
	// 		if (existServerFile < 0) {
	// 			const existFileIndex = viewFiles.findIndex((file: SpinnerViewFileViewModel) => file.fullpath === existFile.fullpath);
	// 			viewFiles.splice(existFileIndex, 1);
	// 		}
	// 	}
	// 	for (const serverFile of serverFiles) {
	// 		const existFile = viewFiles.find((file: SpinnerViewFileViewModel) => file.fullpath === serverFile.fullpath);
	// 		if (!existFile) {
	// 			const newFile = new SpinnerViewFileViewModel();
	// 			newFile.dirname = serverFile.dirname;
	// 			newFile.extension = serverFile.extension;
	// 			newFile.filename = serverFile.filename;
	// 			newFile.fullpath = serverFile.fullpath;
	// 			newFile.fileSize = serverFile.fileSize;
	// 			viewFiles.push(newFile);
	// 		}
	// 	}
	// }

	/** */
	private readonly loadFiles = async (): Promise<void> => {
		await this.loadGoProPaths();
		await this.loadCommonPaths();
		// await this.loadGoProPhotosOverlayed();
		// await this.loadGoProVideos();
	};

	/** */
	private readonly loadGoProPaths = async (): Promise<void> => {
		const url = UrlHelper.getUrl(UrlConsts.camera.getFiles + '/' + GetFilesFolderType.GoProPaths);
		const response = await fetch(url);
		if (response.ok) {
			// console.dir(response);
			const serverFiles = await response.json() as PathSourceFilesModel[];
			this.updatePathSources(serverFiles, this.store.goProGroupsFiles);
		} else {
			this.eventLogger.error(`Ошибка HTTP: ${response.status}`);
		}
	};

	/** */
	private readonly loadCommonPaths = async (): Promise<void> => {
		const url = UrlHelper.getUrl(UrlConsts.camera.getFiles + '/' + GetFilesFolderType.Common);
		const response = await fetch(url);
		if (response.ok) {
			// console.dir(response);
			const serverFiles = await response.json() as PathSourceFilesModel[];
			this.updatePathSources(serverFiles, this.store.commonGroupsFiles);
		} else {
			this.eventLogger.error(`Ошибка HTTP: ${response.status}`);
		}
	};

	/** */
	private updatePathSources(serverItems: PathSourceFilesModel[], viewItems: KioskViewFilesViewModel[]): void {
		for (const existItem of viewItems) {
			const existServerFile = serverItems.findIndex((file: PathSourceFilesModel) => file.dirname === existItem.dirname);
			if (existServerFile < 0) {
				const existFileIndex = viewItems.findIndex((file: KioskViewFilesViewModel) => file.dirname === existItem.dirname);
				viewItems.splice(existFileIndex, 1);
			}
		}
		for (const serverItem of serverItems) {
			const existItem = viewItems.find((file: KioskViewFilesViewModel) => file.dirname === serverItem.dirname);
			if (!existItem) {
				const newItem = new KioskViewFilesViewModel();
				newItem.dirname = serverItem.dirname;
				viewItems.push(newItem);
				this.updatePathSource(serverItem.files ?? [], newItem.files);
			} else {
				this.updatePathSource(serverItem.files ?? [], existItem.files);
			}
		}
	}

	/** */
	private updatePathSource(serverFiles: PathSourceFileModel[], viewFiles: KioskViewFileViewModel[]): void {
		for (const existFile of viewFiles) {
			const existServerFile = serverFiles.findIndex((file: PathSourceFileModel) => file.fullpath === existFile.fullpath);
			if (existServerFile < 0) {
				const existFileIndex = viewFiles.findIndex((file: KioskViewFileViewModel) => file.fullpath === existFile.fullpath);
				viewFiles.splice(existFileIndex, 1);
			}
		}
		for (const serverFile of serverFiles) {
			const existFile = viewFiles.find((file: KioskViewFileViewModel) => file.fullpath === serverFile.fullpath);
			if (!existFile) {
				const newFile = new KioskViewFileViewModel();
				newFile.dirname = serverFile.dirname;
				newFile.extension = serverFile.extension;
				newFile.filename = serverFile.filename;
				newFile.fullpath = serverFile.fullpath;
				newFile.fileSize = serverFile.fileSize;
				viewFiles.push(newFile);
			}
		}
	}

	/** */
	private readonly convertVideoFiles = async (): Promise<void> => {
		return;
	};
}
