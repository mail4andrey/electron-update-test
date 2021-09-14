import { observable } from 'mobx';
import { FilesHelper } from '../../../../../helpers/FilesHelper';

/** */
export class GoProSettingsModel {
	public removeFromGoPro?: boolean = false;

	public showColorStateGoPro?: boolean = false;

	public goProVideoPath?: string = FilesHelper.getUserFolder('GoProVideo');

	public goProPhotoPath?: string = FilesHelper.getUserFolder('GoProPhoto');

	public goProPhotoOverlayedPath?: string = FilesHelper.getUserFolder('GoProPhotoOverlayed');
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

	/** */
	@observable
	public goProVideoPath = FilesHelper.getUserFolder('GoProVideo');

	/** */
	@observable
	public goProPhotoPath?: string = FilesHelper.getUserFolder('GoProPhoto');

	/** */
	@observable
	public goProPhotoOverlayedPath?: string = FilesHelper.getUserFolder('GoProPhotoOverlayed');
}

export enum GoProStateEnum {
	unknown = 'unknown',
	startRecord = 'startRecord',
	success = 'success',
	error = 'error',
	waiting = 'waiting',
	paired = 'paired'
}
