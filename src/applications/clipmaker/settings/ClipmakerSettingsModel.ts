import { GoProSettingsModel } from '../../base/settings/tabs/goPro/GoProSettingsModel';
import { PathSourcesSettingsModel } from '../../base/settings/tabs/pathSources/PathSourcesSettingsModel';
import { VideoSettingsModel } from '../../base/settings/tabs/video/VideoSettingsModel';

import { DesignSettingsModel } from '../../../src-front/models/DesignSettingsModel';
import { BaseApplicationSettingsModel } from '../../base/settings/BaseApplicationSettingsModel';
import { ServerSettingsModel } from '../../base/settings/tabs/server/ServerSettingsModel';
import { IntroOutroSettingsModel } from '../../base/settings/tabs/introOutro/IntroOutroSettingsModel';
import { OverlaySettingsModel } from '../../base/settings/tabs/overlay/OverlaySettingsModel';
import { AudioSettingsModel } from '../../base/settings/tabs/audio/AudioSettingsModel';

/** Модель настроек приложения */
export class ClipmakerSettingsModel extends BaseApplicationSettingsModel {
	/** */
	public pathSources?: PathSourcesSettingsModel;

	/** */
	public designSettings?: DesignSettingsModel;

	/** */
	public serverSettings?: ServerSettingsModel;

	/** */
	public goProSettings?: GoProSettingsModel;

	/** */
	public videoSettings?: VideoSettingsModel;

	/** */
	public introOutroSettings?: IntroOutroSettingsModel;

	/** */
	public overlaySettings?: OverlaySettingsModel;

	/** */
	public audioSettings?: AudioSettingsModel;
}
