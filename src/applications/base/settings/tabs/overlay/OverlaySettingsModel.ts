/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';

import type { OverlaySettingsItemModel } from './OverlaySettingsItemModel';
import { OverlaySettingsViewItemModel } from './OverlaySettingsItemModel';

/** */
export class OverlaySettingsModel {
	public enable?: boolean = false;

	public items?: OverlaySettingsItemModel[] = [];
}

/**
 *
 */
export class OverlaySettingsViewModel extends OverlaySettingsModel {
	@observable
	public enable?: boolean = false;

	@observable
	public items?: OverlaySettingsViewItemModel[] = [];
}
