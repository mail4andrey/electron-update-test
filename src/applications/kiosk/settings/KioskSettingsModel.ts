
import { EmailSettingsModel } from './tabs/email/EmailSettingsModel';
import { PrintSettingsModel } from './tabs/print/PrintSettingsModel';


import { DesignSettingsModel } from '../../../src-front/models/DesignSettingsModel';
import { BaseApplicationSettingsModel } from '../../base/settings/BaseApplicationSettingsModel';

/** Модель настроек приложения */
export class KioskSettingsModel extends BaseApplicationSettingsModel {
	/** Патерн выборки файлов из папок */
	public filesPattern?: string;

	/** */
	public pathSources?: string[] = [];

	/** */
	public emailSettings = new EmailSettingsModel();

	/** */
	public printSettings?: PrintSettingsModel;

	/** */
	public designSettings?: DesignSettingsModel;

	/** */
	// public serverSettings?: ServerSettingsModel;

	/** */
	// public language?: LanguageEnum;

	/** */
	public viewSetting?: string;

	/** */
	public theme?: string;
}
