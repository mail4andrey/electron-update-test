import { observable } from 'mobx';

import { DesignSettingsViewModel } from './tabs/design/DesignSettingsModel';
import { EmailSettingsViewModel } from './tabs/email/EmailSettingsViewModel';
import { KioskSettingsModel } from './KioskSettingsModel';
import { PrintSettingsModel } from './tabs/print/PrintSettingsModel';
import { ServerSettingsViewModel } from './tabs/server/ServerSettingsModel';

/** Можель настроек приложения */
export class KioskSettingsViewModel extends KioskSettingsModel {
	@observable
	/** */
	public pathSources?: string[] = [];

	@observable
	/** */
	public designSettings = new DesignSettingsViewModel();

	@observable
	/** */
	public serverSettings = new ServerSettingsViewModel();

	// @observable
	/** */
	public emailSettings = new EmailSettingsViewModel();

	// @observable
	/** */
	public printSettings = {} as PrintSettingsModel;

	/** Патерн выборки файлов из папок */
	public filesPattern = '*';

	/** */
	public viewSetting?: string;

	/** */
	public theme?: string;
}
