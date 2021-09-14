import { observable } from 'mobx';

import { SpinnerSettingsViewModel } from './SpinnerSettingsViewModel';

import { LanguageEnum } from '../../../src-front/models/LanguageEnum';


/** */
export class SpinnerSettingsStore {
	@observable
	public settings = new SpinnerSettingsViewModel();

	@observable
	/** */
	public tabSelected = 0;

	@observable
	public language?: LanguageEnum;
}
