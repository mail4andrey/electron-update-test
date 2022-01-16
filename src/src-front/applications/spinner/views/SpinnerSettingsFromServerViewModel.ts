import { observable } from 'mobx';
import { DesignSettingsModel } from '../../../../src-front/models/DesignSettingsModel';
import { SpinnerSettingsFrontViewModel, SpinnerSettingsFrontModel } from '../frontSettings/SpinnerSettingsFrontModel';
export interface ITitleValueModel {
	title?: string;

	value?: string;
}

export class SpinnerSettingsFromServerModel {
	/** */
	public designSettings?: DesignSettingsModel;
	
	public pathSource?: string = '';

	public pathDestination?: string = '';

	public introOutroItems?: ITitleValueModel[] = [];

	public audioItems?: ITitleValueModel[] = [];

	public overlayItems?: ITitleValueModel[] = [];

	public zoomItems?: ITitleValueModel[] = [];

	public goProVideoPath?: string = '';

	public removeFromGoPro?: boolean = false;

	public frontSettings?: SpinnerSettingsFrontModel;
}

export class SpinnerSettingsFromServerViewModel extends SpinnerSettingsFromServerModel  {
	@observable
	/** */
	public designSettings?: DesignSettingsModel;
	
	@observable
	public pathSource?: string = '';

	@observable
	public pathDestination?: string = '';

	@observable
	public introOutroItems?: ITitleValueModel[] = [];

	@observable
	public audioItems?: ITitleValueModel[] = [];

	@observable
	public overlayItems?: ITitleValueModel[] = [];

	@observable
	public zoomItems?: ITitleValueModel[] = [];

	@observable
	public goProVideoPath?: string = '';

	// @observable
	public removeFromGoPro?: boolean = false;

	@observable
	public frontSettings?: SpinnerSettingsFrontViewModel = new SpinnerSettingsFrontViewModel();
}