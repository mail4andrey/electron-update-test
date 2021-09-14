import { observable } from 'mobx';

export enum ApplicationSourceModeEnum {
	directory = 'directory',
	camera = 'camera'
}

export class SpinnerLocalSettingsModel {
	public mode?: ApplicationSourceModeEnum = ApplicationSourceModeEnum.directory;
	public recordVideoDuration?: string = '3.0';
}

export class SpinnerLocalSettingsViewModel extends SpinnerLocalSettingsModel  {
	@observable
	public mode?: ApplicationSourceModeEnum;

	@observable
	public recordVideoDuration?: string;
}
