import { observable } from 'mobx';
import { FilesHelper } from '../../../../../helpers/FilesHelper';

/** */
export class PathSourcesSettingsModel {
	// public pathSource?: string = '';
	public pathSource?: string = FilesHelper.getUserFolder('In');
	// public pathDestination?: string = '';
	public pathDestination?: string = FilesHelper.getUserFolder('Out');
	public fileNamePattern?: string = '';
	// public pathTestSource?: string = '';
	public pathTestSource?: string = FilesHelper.getUserFolder('Test');
	public fileExtension?: FileExtension = FileExtension.mp4;
}

/**
 *
 */
export class PathSourcesSettingsViewModel implements PathSourcesSettingsModel {
	@observable
	/** */
	// public pathSource?: string = '';
	public pathSource?: string = FilesHelper.getUserFolder('In');

	@observable
	/** */
	// public pathDestination?: string = '';
	public pathDestination?: string = FilesHelper.getUserFolder('Out');

	@observable
	/** */
	public fileNamePattern?: string = '';

	@observable
	// public pathTestSource?: string = '';
	public pathTestSource?: string = FilesHelper.getUserFolder('Test');

	@observable
	public fileExtension?: FileExtension = FileExtension.mp4;
}


export enum FileExtension {
	mp4 = 'mp4',
	mov = 'mov',
}