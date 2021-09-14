import { observable } from 'mobx';

import { ClipmakerSettingsModel } from './ClipmakerSettingsModel';
import { DesignSettingsViewModel } from '../../base/settings/tabs/design/DesignSettingsViewModel';
import { GoProSettingsViewModel } from '../../base/settings/tabs/goPro/GoProSettingsModel';
import { IntroOutroSettingsViewModel } from '../../base/settings/tabs/introOutro/IntroOutroSettingsModel';
import { PathSourcesSettingsViewModel } from '../../base/settings/tabs/pathSources/PathSourcesSettingsModel';
import { VideoSettingsViewModel } from '../../base/settings/tabs/video/VideoSettingsModel';

import { ServerSettingsViewModel } from '../../base/settings/tabs/server/ServerSettingsModel';
import { OverlaySettingsViewModel } from '../../base/settings/tabs/overlay/OverlaySettingsModel';
import { AudioSettingsViewModel } from '../../base/settings/tabs/audio/AudioSettingsModel';

/** Модель настроек приложения */
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

	@observable
	/** */
	public videoSettings = new VideoSettingsViewModel();

	@observable
	/** */
	public introOutroSettings = new IntroOutroSettingsViewModel();

	@observable
	/** */
	public overlaySettings = new OverlaySettingsViewModel();

	@observable
	/** */
	public audioSettings = new AudioSettingsViewModel();
}
