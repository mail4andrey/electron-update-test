import { observable } from 'mobx';

import { KioskSettingsViewModel } from './KioskSettingsViewModel';

import { LanguageEnum } from '../../../src-front/views/LanguageEnum';


/** */
export class KioskSettingsStore {
	@observable
	public settings = new KioskSettingsViewModel();

	@observable
	/** */
	public tabSelected = 0;

	@observable
	public language?: LanguageEnum;
}
