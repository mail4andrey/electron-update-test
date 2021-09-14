/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';
import { IdGenerator } from '../../../../../helpers/IdGenerator';

export enum AudioStartFromEnum {
	fromIntro = 'fromIntro',
	fromMovie = 'fromMovie'
}
export enum AudioStopToEnum {
	toOutro = 'toOutro',
	toMovie = 'toMovie'
}
/** */
export class AudioSettingsItemModel {

	public guid?: string = IdGenerator.getNewGenericId();

	public name?: string = 'New item';

	public file?: string = '';

	public startFromSeconds?: string = '0.0';

	public fadeIn?: boolean = false;

	public fadeInDuration?: string = '2.0';

	public fadeOut?: boolean = false;

	public fadeOutDuration?: string = '2.0';

	public startFrom?: AudioStartFromEnum = AudioStartFromEnum.fromIntro;
	public stopTo?: AudioStopToEnum = AudioStopToEnum.toOutro;
}

/**
 *
 */
export class AudioSettingsViewItemModel extends AudioSettingsItemModel {
	@observable
	public fadeIn?: boolean = false;

	@observable
	public fadeOut?: boolean = false;

	@observable
	public name?: string = 'New item';

	@observable
	public file?: string = '';

	@observable
	public startFromSeconds?: string = '0.0';

	@observable
	public fadeInDuration?: string = '2.0';

	@observable
	public fadeOutDuration?: string = '2.0';

	@observable
	public startFrom?: AudioStartFromEnum = AudioStartFromEnum.fromIntro;

	@observable
	public stopTo?: AudioStopToEnum = AudioStopToEnum.toOutro;
}
