import { observable } from 'mobx';

export enum ApplicationSourceModeEnum {
	directory = 'directory',
	camera = 'camera'
}

export class SpinnerLocalSettingsModel {
	public mode?: ApplicationSourceModeEnum = ApplicationSourceModeEnum.directory;
	public recordVideoDuration?: string = '3.0';
	public processGoProVideo?: boolean = false;
	public processVideo?: boolean = false;
}

export class SpinnerLocalSettingsViewModel extends SpinnerLocalSettingsModel  {
	@observable
	public mode?: ApplicationSourceModeEnum;

	@observable
	public recordVideoDuration?: string;
	@observable
	public processGoProVideo?: boolean = false;
	@observable
	public processVideo?: boolean = false;
}
