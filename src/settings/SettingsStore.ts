import { observable } from 'mobx';

import { SettingsViewModel } from './SettingsViewModel';

import { LanguageEnum } from '../src-front/views/LanguageEnum';


/** */
export class SettingsStore {
	@observable
	public settings = new SettingsViewModel();

	@observable
	/** */
	public tabSelected = 0;

	@observable
	public language?: LanguageEnum;
}
