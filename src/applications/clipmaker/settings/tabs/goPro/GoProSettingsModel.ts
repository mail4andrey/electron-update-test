import { observable } from 'mobx';

/** */
export interface GoProSettingsModel {
	removeFromGoPro?: boolean;

	showColorStateGoPro?: boolean;
}

/**
 *
 */
export class GoProSettingsViewModel implements GoProSettingsModel {
	// @observable
	/** */

	@observable
	public removeFromGoPro = false;

	/** */
	@observable
	public showColorStateGoPro = false;
}

export enum GoProStateEnum {
	unknown='unknown',
	startRecord='startRecord',
	success='success',
	error='error',
	waiting='waiting',
	paired='paired'
}
