import { observable } from 'mobx';

export enum GoProVersion {
	GoPro7 = 'GoPro7',
	GoPro8 = 'GoPro8',
}

export enum CameraSettingEnum {
	Mode = 'Mode',
	SubMode = 'SubMode',
	PowerOff = 'PowerOff',
	VideoResolution = 'VideoResolution',
	VideoIsoLimit = 'VideoIsoLimit',
	VideoEvComp = 'VideoEvComp',
	VideoProTune = 'VideoProTune',
	VideoFrameRate = 'VideoFrameRate',
	PhotoResolution = 'PhotoResolution',
	PhotoIsoLimit = 'PhotoIsoLimit',
	PhotoEvComp = 'PhotoEvComp',
	PhotoProTune = 'PhotoProTune',
	TimeLapseResolution = 'TimeLapseResolution',
	TimeLapseIsoLimit = 'TimeLapseIsoLimit',
	TimeLapseEvComp = 'TimeLapseEvComp',
	TimeLapseProTune = 'TimeLapseProTune',
	// GoPro8
	ModeGoPro8 = 'ModeGoPro8',
	VideoEvCompGoPro8 = 'VideoEvCompGoPro8',
	VideoProTuneGoPro8 = 'VideoProTuneGoPro8',
	PhotoEvCompGoPro8 = 'PhotoEvCompGoPro8',
	PhotoProTuneGoPro8 = 'PhotoProTuneGoPro8',
}
export enum VideoResolution {
	Resolution4K = 1,
	Resolution4KSV = 2,
	Resolution27K = 4,
	Resolution27KSV = 5,
	Resolution27K43 = 6,
	Resolution1440 = 7,
	Resolution1080SV = 8,
	Resolution1080 = 9,
	Resolution960 = 10,
	Resolution720SV = 11,
	Resolution720 = 12,
	ResolutionWVGA = 13,
	Resolution4K43 = 18,
	Resolution5K = 24,
}
export enum PhotoResolution {
	Resolution12MPWide = 0,
	Resolution7MPWide = 1,
	Resolution7MPMedium = 2,
	Resolution5MPWide = 3,
}
export enum VideoIsoLimit {
	Iso6400 = 0,
	Iso1600 = 1,
	Iso400 = 2,
	Iso3200 = 3,
	Iso800 = 4,
	Iso200 = 7,
	Iso100 = 8,
}
export enum PhotoIsoLimit {
	Iso800 = 0,
	Iso400 = 1,
	Iso200 = 2,
	Iso100 = 3,
	Iso1600 = 4,
	Iso3200 = 5,
}
export enum EvComp {
	EvMinus2 = 8,
	EvMinus1_5 = 7,
	EvMinus1 = 6,
	EvMinus0_5 = 5,
	Ev0 = 4,
	EvPlus0_5 = 3,
	EvPlus1 = 2,
	EvPlus1_5 = 1,
	EvPlus2 = 0,
}

export enum FrameRate {
	Fps240 = 0,
	Fps120 = 1,
	Fps100 = 2,
	Fps90 = 3,
	Fps80 = 4,
	Fps60 = 5,
	Fps50 = 6,
	Fps48 = 7,
	Fps30 = 8,
	Fps25 = 9,
	Fps24 = 10,
	Fps15 = 11,
	Fps12_5 = 12,
	Fps200 = 13,
}

export enum ProTune {
	On = 1,
	Off = 0,
}

export enum BatteryLevel {
	Charging = 4,
	Full = 3,
	Halfway = 2,
	Low = 2,
	Empty = 0
}
export enum CameraMode {
	Video = 0,
	Photo = 1,
	MultiShot = 2
}
export enum CameraSubMode {
	SubMode0 = 0,
	SubMode1 = 1,
	SubMode2 = 2,
	SubMode3 = 3,
	SubMode4 = 4
}
export enum CameraModeGoPro8 {
	Video = 12,
	Looping = 15,
	Photo = 17,
	NightPhoto = 18,
	BurstPhoto = 19,
	TimeLapseVideo = 13,
	TimeLapsePhoto = 20,
	NightLapsePhoto = 21,
	TimeWarpVideo = 24,
	LiveBurst = 25,
	NightLapseVideo = 26,
	SloMo = 27
}

/** Модель настроек приложения */
export class CameraStateModel {
	/** */
	public cameraOnline?: boolean;
	public cameraVersion?: GoProVersion;
	/** */
	public battery?: boolean;
	public batteryLevel?: BatteryLevel;
	public currentMode?: CameraMode;
	public currentSubMode?: CameraSubMode;
	public currentModeGoPro8?: CameraModeGoPro8;
	public videoSettingsResolution?: VideoResolution;
	public videoSettingsFrameRate?: FrameRate;
	public videoSettingsFovVideo?: number;
	public videoSettingsProTune?: ProTune;
	public videoSettingsProTuneGoPro8?: ProTune;
	public videoSettingsIsoMode?: number;
	public videoSettingsIsoLimit?: VideoIsoLimit;
	public videoSettingsEvComp?: EvComp;
	public videoSettingsEvCompGoPro8?: EvComp;
	public photoSettingsProTune?: ProTune;
	public photoSettingsProTuneGoPro8?: ProTune;
	public photoSettingsIsoMode?: number;
	public photoSettingsIsoLimit?: PhotoIsoLimit;
	public photoSettingsEvComp?: EvComp;
	public photoSettingsEvCompGoPro8?: EvComp;
	public timeLapseSettingsResolution?: number;
	public timeLapseSettingsFovVideo?: number;
	public timeLapseSettingsProTune?: ProTune;
	public timeLapseSettingsIsoMode?: number;
	public timeLapseSettingsIsoLimit?: PhotoIsoLimit;
	public timeLapseSettingsEvComp?: EvComp;
}

/** Модель настроек приложения */
export class CameraStateViewModel extends CameraStateModel {
	@observable
	public cameraOnline?: boolean;
	@observable
	public cameraVersion?: GoProVersion;
	/** */
	@observable
	public battery?: boolean;
	@observable
	public batteryLevel?: BatteryLevel;
	@observable
	public currentMode?: CameraMode;
	@observable
	public currentSubMode?: CameraSubMode;
	@observable
	public currentModeGoPro8?: CameraModeGoPro8;
	@observable
	public videoSettingsResolution?: VideoResolution;
	@observable
	public videoSettingsFrameRate?: FrameRate;
	@observable
	public videoSettingsFovVideo?: number;
	@observable
	public videoSettingsProTune?: ProTune;
	@observable
	public videoSettingsProTuneGoPro8?: ProTune;
	@observable
	public videoSettingsIsoMode?: number;
	@observable
	public videoSettingsIsoLimit?: VideoIsoLimit;
	@observable
	public videoSettingsEvComp?: EvComp;
	@observable
	public videoSettingsEvCompGoPro8?: EvComp;
	@observable
	public photoSettingsProTune?: ProTune;
	@observable
	public photoSettingsProTuneGoPro8?: ProTune;
	@observable
	public photoSettingsIsoMode?: number;
	@observable
	public photoSettingsIsoLimit?: PhotoIsoLimit;
	@observable
	public photoSettingsEvComp?: EvComp;
	@observable
	public photoSettingsEvCompGoPro8?: EvComp;
	@observable
	public timeLapseSettingsResolution?: number;
	@observable
	public timeLapseSettingsFovVideo?: number;
	@observable
	public timeLapseSettingsProTune?: ProTune;
	@observable
	public timeLapseSettingsIsoMode?: number;
	@observable
	public timeLapseSettingsIsoLimit?: PhotoIsoLimit;
	@observable
	public timeLapseSettingsEvComp?: EvComp;
}

export interface GoProMediaList {
	id?: string;
	media?: GoProDirectory[];
}

export interface GoProDirectory {
	/** Directory */
	d: string;
	fs?: GoProFile[];
}

export interface GoProFile {
	/** Filename */
	n: string;
	/** Created date (unix timestamp) */
	cre?: string;
	/** Modified date (unix timestamp) */
	mod?: string;
	/** ??? For video */
	glrv?: string;
	/** ??? For video */
	ls?: string;
	/** Size in bites */
	s?: string;
}