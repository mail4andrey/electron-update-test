/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';
import { IdGenerator } from '../../../../../helpers/IdGenerator';

export enum AlignSettingEnum {
	top = 'top',
	bottom = 'bottom',
	stretch = 'stretch'
}

/** */
export class OverlaySettingsItemModel {
	public guid?: string = IdGenerator.getNewGenericId();

	public name?: string = 'New item';

	public file?: string = '';

	public repeateCountForVideo?: string = '-1';

	public align?: AlignSettingEnum = AlignSettingEnum.stretch;
}

/** */
export class OverlaySettingsViewItemModel extends OverlaySettingsItemModel {
	@observable
	public align?: AlignSettingEnum = AlignSettingEnum.stretch;

	@observable
	public name?: string = 'New item';

	@observable
	public file?: string = '';

	@observable
	public repeateCountForVideo?: string = '-1';
}
