import { observable } from 'mobx';

import { IdGenerator } from '../../../../helpers/IdGenerator';

export enum MultiplierEnum {
	fast10Times = -9,
	fast9Times = -8,
	fast8Times = -7,
	fast7Times = -6,
	fast6Times = -5,
	fast5Times = -4,
	fast4Times = -3,
	fast3Times = -2,
	fast2Times = -1,
	normal = 0,
	slow2Times = 1,
	slow3Times = 2,
	slow4Times = 3,
	slow5Times = 4,
	slow6Times = 5,
	slow7Times = 6,
	slow8Times = 7,
	slow9Times = 8,
	slow10Times = 9,
}
/** Модель настроек приложения */
export class SpinnerSettingsFrontItemModel { //extends BaseApplicationFrontItemSettingsModel {
	/** */
	public title?: string;
	/** */
	public guid?: string;
	/** */
	public pingPong?: boolean;
	/** */
	public multipliers?: MultiplierEnum[];
	/** */
	public selectedIntroGuid?: string;
	/** */
	public selectedOutroGuid?: string;
	/** */
	public selectedAudioGuid?: string;
	/** */
	public overlays?: SpinnerSettingsFrontOverlayItemModel[];
	/** */
	public zooms?: SpinnerSettingsFrontZoomItemModel[];
}
/** Модель настроек приложения */
export class SpinnerSettingsFrontModel {
	/** */
	public autoMode?: boolean;
	/** */
	public processGoProVideo?: boolean;
	/** */
	public processVideo?: boolean;
	/** */
	public goProDuration?: number;
	/** */
	public selectedPresetGuid?: string;
	/** */
	public presets?: SpinnerSettingsFrontItemModel[];
}
export class SpinnerSettingsFrontOverlayItemModel {
	// public title?: string;
	public guid?: string;
	public disable?: boolean;
	public beforeSlow?: boolean;
	public afterSlow?: boolean;
	public afterPingPong?: boolean;
	public forPhoto?: boolean;
}
export class SpinnerSettingsFrontZoomItemModel {
	// public title?: string;
	public guid?: string;
	public disable?: boolean;
	public beforeSlow?: boolean;
	public afterSlow?: boolean;
	public afterPingPong?: boolean;
	public forPhoto?: boolean;
}


/** Модель настроек приложения */
export class SpinnerSettingsFrontViewModel extends SpinnerSettingsFrontModel {
	/** */
	@observable
	public autoMode?: boolean = false;
	/** */
	@observable
	public processGoProVideo?: boolean = false;
	/** */
	@observable
	public processVideo?: boolean = false;
	/** */
	public processVideoAutoMode?: boolean = false;
	/** */
	@observable
	public goProDuration?: number = 3;
	/** */
	@observable
	public selectedPresetGuid?: string = '';
	/** */
	@observable
	public presets?: SpinnerSettingsFrontItemViewModel[] = [];
}
/** Модель настроек приложения */
export class SpinnerSettingsFrontItemViewModel extends SpinnerSettingsFrontItemModel { //extends BaseApplicationFrontItemSettingsModel {
	/** */
	@observable
	public title?: string = '';
	/** */
	@observable
	public guid?: string = IdGenerator.getNewGenericId();
	/** */
	@observable
	public pingPong?: boolean = false;
	/** */
	@observable
	public multipliers?: MultiplierEnum[] = [];
	/** */
	@observable
	public selectedIntroGuid?: string = '';
	/** */
	@observable
	public selectedOutroGuid?: string = '';
	/** */
	@observable
	public selectedAudioGuid?: string = '';
	/** */
	@observable
	public overlays?: SpinnerSettingsFrontOverlayItemModel[] = [];
	/** */
	@observable
	public zooms?: SpinnerSettingsFrontZoomItemModel[] = [];
}
export class SpinnerSettingsFrontOverlayItemViewModel extends SpinnerSettingsFrontOverlayItemModel {
	// public title?: string = '';
	public guid?: string = '';
	@observable
	public disable?: boolean = false;
	@observable
	public beforeSlow?: boolean = false;
	@observable
	public afterSlow?: boolean = false;
	@observable
	public afterPingPong?: boolean = false;
	@observable
	public forPhoto?: boolean = false;
}
export class SpinnerSettingsFrontZoomItemViewModel extends SpinnerSettingsFrontZoomItemModel {
	// public title?: string = '';
	public guid?: string = '';
	@observable
	public disable?: boolean = false;
	@observable
	public beforeSlow?: boolean = false;
	@observable
	public afterSlow?: boolean = false;
	@observable
	public afterPingPong?: boolean = false;
	@observable
	public forPhoto?: boolean = false;
}