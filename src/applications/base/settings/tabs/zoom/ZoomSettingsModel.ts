/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';

import type { ZoomSettingsItemModel } from './ZoomSettingsItemModel';
import { ZoomSettingsViewItemModel } from './ZoomSettingsItemModel';

/** */
export class ZoomSettingsModel {
	public enable?: boolean = false;

	public items?: ZoomSettingsItemModel[] = [];
}

/**
 *
 */
export class ZoomSettingsViewModel extends ZoomSettingsModel {
	@observable
	public enable?: boolean = false;

	@observable
	public items?: ZoomSettingsViewItemModel[] = [];
}
