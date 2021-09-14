/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';
import { IdGenerator } from '../../../../../helpers/IdGenerator';

/** */
export class ZoomSettingsItemModel {

	public guid?: string = IdGenerator.getNewGenericId();

	public name?: string = 'New item';

	public startFromSeconds?: string = '0.0';

	public zoomPercent?: string = '110';

	public duration?: string = '1.0';
}

/**
 *
 */
export class ZoomSettingsViewItemModel extends ZoomSettingsItemModel {
	@observable
	public name?: string = 'New item';

	@observable
	public startFromSeconds?: string = '0.0';

	@observable
	public zoomPercent?: string = '110';

	@observable
	public duration?: string = '1.0';
}
