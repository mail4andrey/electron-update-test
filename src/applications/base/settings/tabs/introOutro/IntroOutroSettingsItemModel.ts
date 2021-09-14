/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';
import { IdGenerator } from '../../../../../helpers/IdGenerator';

/** */
export class IntroOutroSettingsItemModel {
	// public id?: number = -1;

	public guid?: string = IdGenerator.getNewGenericId();

	public name?: string = 'New item';

	public file?: string = '';

	public imageDuration?: string = '4.0';

	public fadeIn?: boolean = false;

	public fadeInDuration?: string = '2.0';

	public fadeOut?: boolean = false;

	public fadeOutDuration?: string = '2.0';
}

/**
 *
 */
export class IntroOutroSettingsViewItemModel extends IntroOutroSettingsItemModel {
	@observable
	public fadeIn?: boolean = false;

	@observable
	public fadeOut?: boolean = false;

	@observable
	public name?: string = 'New item';

	@observable
	public file?: string = '';

	@observable
	public imageDuration?: string = '4.0';

	@observable
	public fadeInDuration?: string = '2.0';

	@observable
	public fadeOutDuration?: string = '2.0';
}
