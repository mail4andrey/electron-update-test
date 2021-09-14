/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';

import type { AudioSettingsItemModel } from './AudioSettingsItemModel';
import { AudioSettingsViewItemModel } from './AudioSettingsItemModel';

/** */
export class AudioSettingsModel {
	public enable?: boolean = false;

	public items?: AudioSettingsItemModel[] = [];
}

/**
 *
 */
export class AudioSettingsViewModel extends AudioSettingsModel {
	@observable
	public enable?: boolean = false;

	@observable
	public items?: AudioSettingsViewItemModel[] = [];
}
