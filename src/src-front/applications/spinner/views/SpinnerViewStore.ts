import { observable } from 'mobx';
import { LanguageEnum } from '../../../../src-front/models/LanguageEnum';
import { SpinnerSettingsFromServerViewModel } from './SpinnerSettingsFromServerViewModel';
import { SpinnerLocalSettingsViewModel } from './SpinnerLocalSettingsViewModel';
import { CameraStateViewModel } from '../../../../src-front/models/CameraStateModel';
import { KioskViewFilesViewModel } from '../../../../src-front/applications/kiosk/views/KioskViewFileViewModel';

export enum ProcessFileEnum {
	Zoom = 'Zoom',
	PingPong = 'PingPong',
	Audio = 'Audio',
}

export enum StatusEnum {
	// Pairing = 'Pairing',
	TakePhoto = 'TakePhoto',
	// TakePhotoDone = 'TakePhotoDone',
	RecordVideo = 'RecordVideo',
	// RecordVideoDone = 'RecordVideoDone',
	GetLastFile = 'GetLastFile',
	DownloadFromCamera = 'DownloadFromCamera',
	DeleteFile = 'DeleteFile',
	FileCreated = 'FileCreated',
}
/** */
export class SpinnerViewStore {
	@observable
	public loaded = false;

	@observable
	public language?: LanguageEnum;

	@observable
	public settings = new SpinnerSettingsFromServerViewModel();

	@observable
	public localSettings = new SpinnerLocalSettingsViewModel();

	@observable
	public cameraSettings = new CameraStateViewModel();

	@observable
	public cameraNotFound?: boolean;

	@observable
	public status?: StatusEnum;

	@observable
	public statusFilename?: string;

	@observable
	public goProGroupsFiles: KioskViewFilesViewModel[] = [];

	@observable
	public commonGroupsFiles: KioskViewFilesViewModel[] = [];

	// @observable
	// public goProPhotoOverlayedGroupsFiles: KioskViewFilesViewModel[] = [];

	// @observable
	// public goProVideoGroupsFiles: KioskViewFilesViewModel[] = [];
}
