import { observable } from 'mobx';

import { EmailSettingsModel } from './EmailSettingsModel';

/** Можель настроек приложения */
export class EmailSettingsViewModel extends EmailSettingsModel {
	/** */
	@observable
	public server?: string;

	/** */
	@observable
	public login?: string;

	/** */
	@observable
	public password?: string;

	/** */
	@observable
	public subject?: string;

	/** */
	@observable
	public content?: string;
}
