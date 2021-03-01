import { EmailSettingsModel } from './EmailSettingsModel';

/** Можель настроек приложения */
export class SettingsModel {
	/** Патерн выборки файлов из папок */
	public filesPattern?: string;

	/** */
	public pathSources?: string[] = [];

	/** */
	public email = new EmailSettingsModel();

	/** */
	public printer?: string;

	/** */
	public viewSetting?: string;

	/** */
	public theme?: string;
}
