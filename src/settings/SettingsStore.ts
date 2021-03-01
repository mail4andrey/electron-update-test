import { observable } from 'mobx';

import { SettingsViewModel } from './SettingsViewModel';

/** */
export class SettingsStore {
	@observable
	public settings = new SettingsViewModel();

	@observable
	/** */
	public tabSelected = 0;
}
