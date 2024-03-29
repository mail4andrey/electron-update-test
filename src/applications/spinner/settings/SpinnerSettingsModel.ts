import { GoProSettingsModel } from '../../base/settings/tabs/goPro/GoProSettingsModel';
import { PathSourcesSettingsModel } from '../../base/settings/tabs/pathSources/PathSourcesSettingsModel';
import { VideoSettingsModel } from '../../base/settings/tabs/video/VideoSettingsModel';

import { DesignSettingsModel } from '../../../src-front/models/DesignSettingsModel';
import { BaseApplicationSettingsModel, BaseApplicationFrontSettingsModel as BaseApplicationFrontItemSettingsModel } from '../../base/settings/BaseApplicationSettingsModel';
import { ServerSettingsModel } from '../../base/settings/tabs/server/ServerSettingsModel';
import { IntroOutroSettingsModel } from '../../base/settings/tabs/introOutro/IntroOutroSettingsModel';
import { OverlaySettingsModel } from '../../base/settings/tabs/overlay/OverlaySettingsModel';
import { AudioSettingsModel } from '../../base/settings/tabs/audio/AudioSettingsModel';
import { ZoomSettingsModel } from '../../base/settings/tabs/zoom/ZoomSettingsModel';
import { SpinnerSettingsFrontModel } from '../../../src-front/applications/spinner/frontSettings/SpinnerSettingsFrontModel';

/** Модель настроек приложения */
export class SpinnerSettingsModel extends BaseApplicationSettingsModel {
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

	/** */
	public zoomSettings?: ZoomSettingsModel;

	/** */
	public frontSettings?: SpinnerSettingsFrontModel;
}