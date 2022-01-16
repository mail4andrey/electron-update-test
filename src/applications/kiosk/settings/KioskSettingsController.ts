import * as LocalStorage from 'local-storage';
import { inject } from 'react-ioc';


import { KioskSettingsModel } from './KioskSettingsModel';
import { KioskSettingsStore } from './KioskSettingsStore';
import { KioskSettingsViewModel } from './KioskSettingsViewModel';
import { EmailSettingsModel } from './tabs/email/EmailSettingsModel';
import { PrintSettingsModel } from './tabs/print/PrintSettingsModel';


import { ApplicationSettingsController } from '../../../application/ApplicationSettingsController';
import { ISelectChangeEventProps } from '../../../elements/Select';
import { ITextFieldChangeEventProps } from '../../../elements/TextField';
import { MapperHelper } from '../../../helpers/MapperHelper';
import { DesignSettingsModel } from '../../../src-front/models/DesignSettingsModel';
import { LanguageSettingsLocalStorage } from "../../../src-front/models/LanguageSettingsLocalStorage";
import { ServerSettingsModel } from '../../base/settings/tabs/server/ServerSettingsModel';
import { LocalStorageConsts } from '../../../src-front/const/LocalStorageConsts';


/** */
export class KioskSettingsController {
	@inject
	private readonly store!: KioskSettingsStore;

	private readonly settingsСontroller = new ApplicationSettingsController();

	/** */
	public loadSettings = (): void => {
		const languageSettings = LocalStorage.get<LanguageSettingsLocalStorage>(LocalStorageConsts.languageSettings) as LanguageSettingsLocalStorage|undefined;
		this.store.language = languageSettings?.language;

		const settings = this.settingsСontroller.loadDefaultSettings<KioskSettingsModel>();
		this.store.settings = MapperHelper.map(settings, KioskSettingsViewModel);
	};

	/** */
	public onPathSourceChange = (event: ITextFieldChangeEventProps, id?: number): void => {
		if (this.store.settings.pathSources && id && id >= 0) {
			const { value } = event.target;
			this.store.settings.pathSources[id] = value;
		}
	};

	/** */
	public readonly onPathSourceAdd = (_event: React.MouseEvent<Element, MouseEvent>): void => {
		if (!this.store.settings.pathSources) {
			this.store.settings.pathSources = [];
		}
		this.store.settings.pathSources.push('');
	};

	/** */
	public readonly onPathSourceDelete = (_event: React.MouseEvent<Element, MouseEvent>, id?: number): void => {
		if (this.store.settings.pathSources && id && id >= 0 && id < this.store.settings.pathSources.length) {
			this.store.settings.pathSources.splice(id, 1);
		}
	};

	/** */
	public readonly onPathSourceUp = (_event: React.MouseEvent<Element, MouseEvent>, id?: number): void => {
		if (this.store.settings.pathSources && id && id >= 1 && id < this.store.settings.pathSources.length) {
			const newValue = this.store.settings.pathSources[id - 1];
			this.store.settings.pathSources[id - 1] = this.store.settings.pathSources[id];
			this.store.settings.pathSources[id] = newValue;
		}
	};

	/** */
	public readonly onPathSourceDown = (_event: React.MouseEvent<Element, MouseEvent>, id?: number): void => {
		if (this.store.settings.pathSources && id && id >= 0 && id < this.store.settings.pathSources.length - 1) {
			const newValue = this.store.settings.pathSources[id + 1];
			this.store.settings.pathSources[id + 1] = this.store.settings.pathSources[id];
			this.store.settings.pathSources[id] = newValue;
		}
	};

	/** */
	public readonly onEmailSettingsChange = (_event: ITextFieldChangeEventProps, settings: EmailSettingsModel): void => {
		this.store.settings.emailSettings = settings;
	};

	/** */
	public readonly onPrintSettingsChange = (_event: ISelectChangeEventProps, settings: PrintSettingsModel): void => {
		this.store.settings.printSettings = settings;
	};

	/** */
	public readonly onDesignSettingsChange = (_event: ITextFieldChangeEventProps | undefined, settings: DesignSettingsModel): void => {
		this.store.settings.designSettings.titleFrontPage = settings.titleFrontPage ?? '';
		this.store.settings.designSettings.background = settings.background ?? 'white';
		this.store.settings.designSettings.backgroundToolbar = settings.backgroundToolbar ?? 'gray';
		this.store.settings.designSettings.backgroundGroupName = settings.backgroundGroupName ?? 'gray';
		this.store.settings.designSettings.backgroundFileCard = settings.backgroundFileCard ?? 'gray';
		this.store.settings.designSettings.iconColor = settings.iconColor ?? 'gray';
		// this.store.settings.designSettings.size = settings.size;
	};

	/** */
	public readonly onServerSettingsChange = (_event: ITextFieldChangeEventProps, settings: ServerSettingsModel): void => {
		this.store.settings.serverSettings = settings;
	};

	/** */
	public readonly onSaveClick = (): void => {
		const pathSources = this.store.settings.pathSources ?? [];
		this.store.settings.pathSources = pathSources
			.filter((value: string, index: number, array: string[]) => array.indexOf(value) === index);
		const settings = MapperHelper.map(this.store.settings, KioskSettingsModel);
		this.settingsСontroller.saveDefaultSettings(settings);
	};
}
