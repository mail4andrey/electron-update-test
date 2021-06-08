import { observable } from 'mobx';

// import { EmailSettingsViewModel } from './tabs/email/EmailSettingsViewModel';
import { ClipmakerSettingsModel } from './ClipmakerSettingsModel';
// import { PrintSettingsModel } from './PrintSettingsModel';
import { DesignSettingsViewModel } from './tabs/design/DesignSettingsModel';
import { GoProSettingsViewModel } from './tabs/goPro/GoProSettingsModel';
import { PathSourcesSettingsViewModel } from './tabs/pathSources/PathSourcesSettingsModel';

import { ServerSettingsViewModel } from '../../base/settings/tabs/server/ServerSettingsModel';

/** Можель настроек приложения */
export class ClipmakerSettingsViewModel extends ClipmakerSettingsModel {
	@observable
	/** */
	public pathSources = new PathSourcesSettingsViewModel();

	@observable
	/** */
	public designSettings = new DesignSettingsViewModel();

	@observable
	/** */
	public serverSettings = new ServerSettingsViewModel();

	@observable
	/** */
	public goProSettings = new GoProSettingsViewModel();

	// // @observable
	// /** */
	// public emailSettings = new EmailSettingsViewModel();

	// // @observable
	// /** */
	// public printSettings = {} as PrintSettingsModel;

	/** Патерн выборки файлов из папок */
	// public filesPattern = '*';

	/** */
	public viewSetting?: string;

	/** */
	public theme?: string;
}
