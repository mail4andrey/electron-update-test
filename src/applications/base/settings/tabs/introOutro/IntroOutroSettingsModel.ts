/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';

import type { IntroOutroSettingsItemModel } from './IntroOutroSettingsItemModel';
import { IntroOutroSettingsViewItemModel } from './IntroOutroSettingsItemModel';

/** */
export class IntroOutroSettingsModel {
	public enable?: boolean = false;

	public items?: IntroOutroSettingsItemModel[] = [];
}

/**
 *
 */
export class IntroOutroSettingsViewModel extends IntroOutroSettingsModel {
	@observable
	public enable?: boolean = false;

	@observable
	public items?: IntroOutroSettingsViewItemModel[] = [];
}
