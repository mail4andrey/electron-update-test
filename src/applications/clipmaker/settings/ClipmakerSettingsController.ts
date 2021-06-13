import * as LocalStorage from 'local-storage';
import { inject } from 'react-ioc';


import { ClipmakerSettingsModel } from './ClipmakerSettingsModel';
import { ClipmakerSettingsStore } from './ClipmakerSettingsStore';
import { ClipmakerSettingsViewModel } from './ClipmakerSettingsViewModel';
import { GoProSettingsModel } from './tabs/goPro/GoProSettingsModel';
import { PathSourcesSettingsModel } from './tabs/pathSources/PathSourcesSettingsModel';
import { VideoSettingsModel } from './tabs/video/VideoSettingsModel';

import { ApplicationSettingsController } from '../../../application/ApplicationSettingsController';
import { ISelectChangeEventProps } from '../../../elements/Select';
import { ITextFieldChangeEventProps } from '../../../elements/TextField';
import { MapperHelper } from '../../../helpers/MapperHelper';
import { DesignSettingsModel } from '../../../src-front/models/DesignSettingsModel';
import { LanguageSettingsLocalStorage } from '../../../src-front/views/KioskSettingsLocalStorage';
import { ServerSettingsModel } from '../../base/settings/tabs/server/ServerSettingsModel';


/** */
export class ClipmakerSettingsController {
	@inject
	private readonly store!: ClipmakerSettingsStore;

	private readonly settingsСontroller = new ApplicationSettingsController();

	/** */
	public loadSettings = (): void => {
		// const localSettings = LocalStorage.get<KioskSettingsLocalStorage>('local-settings') as KioskSettingsLocalStorage|undefined;
		const languageSettings = LocalStorage.get<LanguageSettingsLocalStorage>('language-settings') as LanguageSettingsLocalStorage|undefined;
		this.store.language = languageSettings?.language;

		const settings = this.settingsСontroller.loadDefaultSettings();
		this.store.settings = MapperHelper.map(settings, ClipmakerSettingsViewModel);
	};

	/** */
	public onPathSourceChange = (_event: ITextFieldChangeEventProps, settings: PathSourcesSettingsModel): void => {
		this.store.settings.pathSources.pathSource = settings.pathSource ?? '';
		this.store.settings.pathSources.pathTestSource = settings.pathTestSource ?? '';
		this.store.settings.pathSources.pathDestination = settings.pathDestination ?? '';
		this.store.settings.pathSources.fileNamePattern = settings.fileNamePattern ?? '';
		// if (this.store.settings.pathSources && id >= 0) {
		// 	const { value } = event.target;
		// 	this.store.settings.pathSources[id] = value;
		// }
	};

	/** */
	// public readonly onPathSourceAdd = (_event: React.MouseEvent<Element, MouseEvent>): void => {
	// 	if (!this.store.settings.pathSources) {
	// 		this.store.settings.pathSources = [];
	// 	}
	// 	this.store.settings.pathSources.push('');
	// };

	// /** */
	// public readonly onPathSourceDelete = (_event: React.MouseEvent<Element, MouseEvent>, id: number): void => {
	// 	if (this.store.settings.pathSources && id >= 0 && id < this.store.settings.pathSources.length) {
	// 		this.store.settings.pathSources.splice(id, 1);
	// 	}
	// };

	// /** */
	// public readonly onPathSourceUp = (_event: React.MouseEvent<Element, MouseEvent>, id: number): void => {
	// 	if (this.store.settings.pathSources && id >= 1 && id < this.store.settings.pathSources.length) {
	// 		const newValue = this.store.settings.pathSources[id - 1];
	// 		this.store.settings.pathSources[id - 1] = this.store.settings.pathSources[id];
	// 		this.store.settings.pathSources[id] = newValue;
	// 	}
	// };

	// /** */
	// public readonly onPathSourceDown = (_event: React.MouseEvent<Element, MouseEvent>, id: number): void => {
	// 	if (this.store.settings.pathSources && id >= 0 && id < this.store.settings.pathSources.length - 1) {
	// 		const newValue = this.store.settings.pathSources[id + 1];
	// 		this.store.settings.pathSources[id + 1] = this.store.settings.pathSources[id];
	// 		this.store.settings.pathSources[id] = newValue;
	// 	}
	// };

	/** */
	// public readonly onEmailSettingsChange = (_event: ITextFieldChangeEventProps, settings: EmailSettingsModel): void => {
	// 	this.store.settings.emailSettings = settings;
	// };

	// /** */
	// public readonly onPrintSettingsChange = (_event: ISelectChangeEventProps, settings: PrintSettingsModel): void => {
	// 	this.store.settings.printSettings = settings;
	// };

	/** */
	public readonly onDesignSettingsChange = (_event: ISelectChangeEventProps | undefined, settings: DesignSettingsModel): void => {
		this.store.settings.designSettings.titleFrontPage = settings.titleFrontPage ?? '';
		this.store.settings.designSettings.background = settings.background ?? 'white';
		this.store.settings.designSettings.backgroundToolbar = settings.backgroundToolbar ?? 'gray';
		this.store.settings.designSettings.backgroundGroupName = settings.backgroundGroupName ?? 'gray';
		this.store.settings.designSettings.backgroundFileCard = settings.backgroundFileCard ?? 'gray';
		this.store.settings.designSettings.iconColor = settings.iconColor ?? 'gray';
		// this.store.settings.designSettings.size = settings.size;
	};

	/** */
	public readonly onServerSettingsChange = (_event: ISelectChangeEventProps, settings: ServerSettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.serverSettings);
		// this.store.settings.serverSettings.port = settings.port;
	};

	/** */
	public readonly onGoProSettingsChange = (_event: ISelectChangeEventProps, settings: GoProSettingsModel): void => {
		MapperHelper.mapValues(settings, this.store.settings.goProSettings);
		// this.store.settings.goProSettings.removeFromGoPro = settings.removeFromGoPro;
		// this.store.settings.goProSettings.showColorStateGoPro = settings.showColorStateGoPro;
	};

	/** */
	public readonly onVideoSettingsChange = (_event: ISelectChangeEventProps, settings: VideoSettingsModel): void => {
		// this.store.settings.videoSettings.fadeInDuration = settings.fadeInDuration;
		MapperHelper.mapValues(settings, this.store.settings.videoSettings);
	};

	/** */
	public readonly onSaveClick = (): void => {
		// const pathSources = this.store.settings.pathSources ?? [];
		// this.store.settings.pathSources = pathSources
		// 	.filter((value: string, index: number, array: string[]) => array.indexOf(value) === index);
		const settings = MapperHelper.map(this.store.settings, ClipmakerSettingsModel);
		this.settingsСontroller.saveDefaultSettings(settings);
	};
}
