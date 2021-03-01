import { observable } from 'mobx';

import { EmailSettingsViewModel } from './EmailSettingsViewModel';
import { SettingsModel } from './SettingsModel';

/** Можель настроек приложения */
export class SettingsViewModel extends SettingsModel {
	@observable
	/** */
	public pathSources?: string[] = [];

	@observable
	/** */
	public email = new EmailSettingsViewModel();

	/** Патерн выборки файлов из папок */
	public filesPattern = '*';

	/** */
	public printer?: string;

	/** */
	public viewSetting?: string;

	/** */
	public theme?: string;
}
