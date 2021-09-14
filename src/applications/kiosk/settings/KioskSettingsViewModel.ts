import { observable } from 'mobx';

import { KioskSettingsModel } from './KioskSettingsModel';
import { ServerSettingsViewModel } from './tabs/-server/ServerSettingsModel';
import { DesignSettingsViewModel } from './tabs/design/DesignSettingsModel';
import { EmailSettingsViewModel } from './tabs/email/EmailSettingsViewModel';
import type { PrintSettingsModel } from './tabs/print/PrintSettingsModel';

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
