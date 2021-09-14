import { observable } from 'mobx';
import { FilesHelper } from '../../../../../helpers/FilesHelper';

/** */
export class PathSourcesSettingsModel {
	public pathSource?: string = FilesHelper.getUserFolder('In');
	public pathDestination?: string = FilesHelper.getUserFolder('Out');
	public fileNamePattern?: string = '';
	public pathTestSource?: string = FilesHelper.getUserFolder('Test');
}

/**
 *
 */
export class PathSourcesSettingsViewModel implements PathSourcesSettingsModel {
	@observable
	/** */
	public pathSource?: string = FilesHelper.getUserFolder('In');

	@observable
	/** */
	public pathDestination?: string = FilesHelper.getUserFolder('Out');

	@observable
	/** */
	public fileNamePattern?: string = '';

	@observable
	public pathTestSource?: string = FilesHelper.getUserFolder('Test');
}
