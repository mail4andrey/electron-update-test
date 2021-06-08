import { GoProSettingsModel } from './tabs/goPro/GoProSettingsModel';
import { PathSourcesSettingsModel } from './tabs/pathSources/PathSourcesSettingsModel';

import { DesignSettingsModel } from '../../../src-front/models/DesignSettingsModel';
import { BaseApplicationSettingsModel } from '../../base/settings/BaseApplicationSettingsModel';

/** Модель настроек приложения */
export class ClipmakerSettingsModel extends BaseApplicationSettingsModel {
	/** Патерн выборки файлов из папок */
	public filesPattern?: string;

	/** */
	public pathSources?: PathSourcesSettingsModel;

	/** */
	public goProSettings?: GoProSettingsModel;

	/** */
	// public emailSettings = new EmailSettingsModel();

	/** */
	// public printSettings?: PrintSettingsModel;

	/** */
	public designSettings?: DesignSettingsModel;

	/** */
	// public serverSettings?: ServerSettingsModel;

	/** */
	// public language?: LanguageEnum;

	/** */
	public viewSetting?: string;

	// /** */
	// public theme?: string;
}
