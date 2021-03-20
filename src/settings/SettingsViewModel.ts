import { observable } from 'mobx';

import { DesignSettingsModel } from './DesignSettingsModel';
import { EmailSettingsViewModel } from './EmailSettingsViewModel';
import { PrintSettingsModel } from './PrintSettingsModel';
import { SettingsModel } from './SettingsModel';

/** Можель настроек приложения */
export class SettingsViewModel extends SettingsModel {
	@observable
	/** */
	public pathSources?: string[] = [];

	// @observable
	/** */
	public emailSettings = new EmailSettingsViewModel();

	// @observable
	/** */
	public printSettings = {} as PrintSettingsModel;

	/** */
	public designSettings = {} as DesignSettingsModel;

	/** Патерн выборки файлов из папок */
	public filesPattern = '*';

	/** */
	public viewSetting?: string;

	/** */
	public theme?: string;
}
