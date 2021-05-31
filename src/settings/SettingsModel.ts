
import { EmailSettingsModel } from './EmailSettingsModel';
import { PrintSettingsModel } from './PrintSettingsModel';
import { ServerSettingsModel } from './ServerSettingsModel';

import { DesignSettingsModel } from '../src-front/models/DesignSettingsModel';

/** Модель настроек приложения */
export class SettingsModel {
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
	public serverSettings?: ServerSettingsModel;

	/** */
	// public language?: LanguageEnum;

	/** */
	public viewSetting?: string;

	/** */
	public theme?: string;
}
