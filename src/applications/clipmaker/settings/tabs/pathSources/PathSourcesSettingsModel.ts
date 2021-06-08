import { observable } from 'mobx';

/** */
export interface PathSourcesSettingsModel {
	pathSource?: string;
	pathDestination?: string;
	fileNamePattern?: string;
	pathTestSource?: string;

}

/**
 *
 */
export class PathSourcesSettingsViewModel implements PathSourcesSettingsModel {
	@observable
	/** */
	public pathSource?: string;

	@observable
	/** */
	public pathDestination?: string;

	@observable
	/** */
	public fileNamePattern?: string;

	@observable
	public pathTestSource?: string;
}
