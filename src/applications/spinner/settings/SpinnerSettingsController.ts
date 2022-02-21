import * as LocalStorage from 'local-storage';
import { inject } from 'react-ioc';


import { SpinnerSettingsModel } from './SpinnerSettingsModel';
import { SpinnerSettingsStore } from './SpinnerSettingsStore';
import { SpinnerSettingsViewModel } from './SpinnerSettingsViewModel';
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
import { ZoomSettingsModel } from '../../base/settings/tabs/zoom/ZoomSettingsModel';
import { SettingsProxy } from '../../../helpers/proxy/SettingsProxy';


/** */
export class SpinnerSettingsController {
	@inject
	private readonly store!: SpinnerSettingsStore;

	// private readonly settingsController = new ApplicationSettingsController();

	private readonly settingsProxy = new SettingsProxy();

	/** */
	public loadSettings = async (): Promise<void> => {
		const languageSettings = LocalStorage.get<LanguageSettingsLocalStorage>(LocalStorageConsts.languageSettings) as LanguageSettingsLocalStorage | undefined;
		this.store.language = languageSettings?.language;

		// const settings = this.settingsController.loadDefaultSettings<SpinnerSettingsModel>();
		const settings = await this.settingsProxy.getApplicationSettings();
		const settingsView = this.store.settings;
		// const settingsView = new SpinnerSettingsViewModel();

		// MapperHelper.mapValues(settings, settingsView);
		MapperHelper.mapValues(settings.audioSettings, settingsView.audioSettings);
		MapperHelper.mapValues(settings.designSettings, settingsView.designSettings);
		MapperHelper.mapValues(settings.goProSettings, settingsView.goProSettings);
		MapperHelper.mapValues(settings.introOutroSettings, settingsView.introOutroSettings);
		MapperHelper.mapValues(settings.overlaySettings, settingsView.overlaySettings);
		MapperHelper.mapValues(settings.pathSources, settingsView.pathSources);
		MapperHelper.mapValues(settings.serverSettings, settingsView.serverSettings);
		MapperHelper.mapValues(settings.videoSettings, settingsView.videoSettings);
		MapperHelper.mapValues(settings.zoomSettings, settingsView.zoomSettings);
		// MapperHelper.mapValues(settings.frontSettings, settingsView.frontSettings);
		// this.store.settings = settingsView;
		// this.store.settings = MapperHelper.map(settings, SpinnerSettingsViewModel);
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
	public readonly onOverlaySettingsChange = (_event: ITextFieldChangeEventProps, settings: OverlaySettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.overlaySettings);
	};

	/** */
	public readonly onZoomSettingsChange = (_event: ITextFieldChangeEventProps, settings: ZoomSettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.zoomSettings);
	};

	/** */
	public readonly onAudioSettingsChange = (_event: ITextFieldChangeEventProps, settings: AudioSettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.audioSettings);
	};

	/** */
	public readonly onSaveClick = async (): Promise<void> => {
		const settings = await this.settingsProxy.getApplicationSettings();
		// const settings = this.settingsController.loadDefaultSettings<SpinnerSettingsModel>();
		const settingsView = this.store.settings;

		MapperHelper.mapProperties(settingsView.audioSettings, settings.audioSettings);
		MapperHelper.mapProperties(settingsView.designSettings, settings.designSettings);
		MapperHelper.mapProperties(settingsView.goProSettings, settings.goProSettings);
		MapperHelper.mapProperties(settingsView.introOutroSettings, settings.introOutroSettings);
		MapperHelper.mapProperties(settingsView.overlaySettings, settings.overlaySettings);
		MapperHelper.mapProperties(settingsView.pathSources, settings.pathSources);
		MapperHelper.mapProperties(settingsView.serverSettings, settings.serverSettings);
		MapperHelper.mapProperties(settingsView.videoSettings, settings.videoSettings);
		MapperHelper.mapProperties(settingsView.zoomSettings, settings.zoomSettings);
		// const settings = MapperHelper.map(this.store.settings, SpinnerSettingsModel);
		// this.settingsController.saveDefaultSettings(settings);
		await this.settingsProxy.saveApplicationSettings(settings);
	};

	/** */
	public readonly onResetClick = (): void => {
		this.store.settings = new SpinnerSettingsViewModel();
	};
}
