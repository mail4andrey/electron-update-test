import * as LocalStorage from 'local-storage';
import { inject } from 'react-ioc';


import { ClipmakerSettingsModel } from './ClipmakerSettingsModel';
import { ClipmakerSettingsStore } from './ClipmakerSettingsStore';
import { ClipmakerSettingsViewModel } from './ClipmakerSettingsViewModel';
import type { GoProSettingsModel } from '../../base/settings/tabs/goPro/GoProSettingsModel';
import type { IntroOutroSettingsModel } from '../../base/settings/tabs/introOutro/IntroOutroSettingsModel';
import type { PathSourcesSettingsModel } from '../../base/settings/tabs/pathSources/PathSourcesSettingsModel';
import type { VideoSettingsModel } from '../../base/settings/tabs/video/VideoSettingsModel';

import { ApplicationSettingsController } from '../../../application/ApplicationSettingsController';
import type { ISelectChangeEventProps } from '../../../elements/Select';
import type { ITextFieldChangeEventProps } from '../../../elements/TextField';
import { MapperHelper } from '../../../helpers/MapperHelper';
import type { DesignSettingsModel } from '../../../src-front/models/DesignSettingsModel';
import { LanguageSettingsLocalStorage } from "../../../src-front/models/LanguageSettingsLocalStorage";
import type { ServerSettingsModel } from '../../base/settings/tabs/server/ServerSettingsModel';
import { OverlaySettingsModel } from '../../base/settings/tabs/overlay/OverlaySettingsModel';
import { AudioSettingsModel } from '../../base/settings/tabs/audio/AudioSettingsModel';
import { LocalStorageConsts } from '../../../src-front/const/LocalStorageConsts';


/** */
export class ClipmakerSettingsController {
	@inject
	private readonly store!: ClipmakerSettingsStore;

	private readonly settingsController = new ApplicationSettingsController();

	/** */
	public loadSettings = (): void => {
		const languageSettings = LocalStorage.get<LanguageSettingsLocalStorage>(LocalStorageConsts.languageSettings) as LanguageSettingsLocalStorage | undefined;
		this.store.language = languageSettings?.language;

		const settings = this.settingsController.loadDefaultSettings();
		this.store.settings = MapperHelper.map(settings, ClipmakerSettingsViewModel);
	};

	/** */
	public onPathSourceChange = (_event: ITextFieldChangeEventProps | ISelectChangeEventProps, settings: PathSourcesSettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.pathSources);
	};

	/** */
	public readonly onDesignSettingsChange = (_event: ITextFieldChangeEventProps | undefined, settings: DesignSettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.designSettings);
	};

	/** */
	public readonly onServerSettingsChange = (_event: ITextFieldChangeEventProps, settings: ServerSettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.serverSettings);
	};

	/** */
	public readonly onGoProSettingsChange = (_event: ITextFieldChangeEventProps, settings: GoProSettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.goProSettings);
	};

	/** */
	public readonly onVideoSettingsChange = (_event: ITextFieldChangeEventProps, settings: VideoSettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.videoSettings);
	};

	/** */
	public readonly onIntroOutroSettingsChange = (_event: ITextFieldChangeEventProps, settings: IntroOutroSettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.introOutroSettings);
	};

	/** */
	public readonly onOverlaySettingsChange = (_event: ITextFieldChangeEventProps, settings:OverlaySettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.overlaySettings);
	};

	/** */
	public readonly onAudioSettingsChange = (_event: ITextFieldChangeEventProps, settings: AudioSettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.audioSettings);
	};

	/** */
	public readonly onSaveClick = (): void => {
		const settings = MapperHelper.map(this.store.settings, ClipmakerSettingsModel);
		this.settingsController.saveDefaultSettings(settings);
	};
}
