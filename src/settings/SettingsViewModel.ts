import { observable } from 'mobx';

import { DesignSettingsModel, DesignSettingsViewModel } from './DesignSettingsModel';
import { EmailSettingsViewModel } from './EmailSettingsViewModel';
import { PrintSettingsModel } from './PrintSettingsModel';
import { ServerSettingsViewModel } from './ServerSettingsModel';
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

	@observable
	/** */
	public designSettings = new DesignSettingsViewModel();

	@observable
	/** */
	public serverSettings = new ServerSettingsViewModel();

	/** Патерн выборки файлов из папок */
	public filesPattern = '*';

	/** */
	public viewSetting?: string;

	/** */
	public theme?: string;
}
