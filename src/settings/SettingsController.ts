import { ITextFieldChangeEventProps } from 'elements/TextField';
import { inject } from 'react-ioc';


import { DesignSettingsModel } from './DesignSettingsModel';
import { EmailSettingsModel } from './EmailSettingsModel';
import { PrintSettingsModel } from './PrintSettingsModel';
import { ServerSettingsModel } from './ServerSettingsModel';
import { SettingsModel } from './SettingsModel';
import { SettingsStore } from './SettingsStore';
import { SettingsViewModel } from './SettingsViewModel';

import { ApplicationSettingsController } from '../application/ApplicationSettingsController';
import { ISelectChangeEventProps } from '../elements/Select';
import { MapperHelper } from '../helpers/MapperHelper';


/** */
export class SettingsController {
	@inject
	private readonly store!: SettingsStore;

	private readonly settingsСontroller = new ApplicationSettingsController();

	/** */
	public loadSettings = (): void => {
		const settings = this.settingsСontroller.loadDefaultSettings();
		this.store.settings = MapperHelper.Map(settings, SettingsViewModel);
	};

	/** */
	public onPathSourceChange = (event: ITextFieldChangeEventProps, id: number): void => {
		if (this.store.settings.pathSources && id >= 0) {
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
	public readonly onPathSourceDelete = (_event: React.MouseEvent<Element, MouseEvent>, id: number): void => {
		if (this.store.settings.pathSources && id >= 0 && id < this.store.settings.pathSources.length) {
			this.store.settings.pathSources.splice(id, 1);
		}
	};

	/** */
	public readonly onPathSourceUp = (_event: React.MouseEvent<Element, MouseEvent>, id: number): void => {
		if (this.store.settings.pathSources && id >= 1 && id < this.store.settings.pathSources.length) {
			const newValue = this.store.settings.pathSources[id - 1];
			this.store.settings.pathSources[id - 1] = this.store.settings.pathSources[id];
			this.store.settings.pathSources[id] = newValue;
		}
	};

	/** */
	public readonly onPathSourceDown = (_event: React.MouseEvent<Element, MouseEvent>, id: number): void => {
		if (this.store.settings.pathSources && id >= 0 && id < this.store.settings.pathSources.length - 1) {
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
	public readonly onDesignSettingsChange = (_event: ISelectChangeEventProps | undefined, settings: DesignSettingsModel): void => {
		this.store.settings.designSettings.titleFrontPage = settings.titleFrontPage;
		this.store.settings.designSettings.background = settings.background;
		this.store.settings.designSettings.backgroundToolbar = settings.backgroundToolbar;
		this.store.settings.designSettings.backgroundGroupName = settings.backgroundGroupName;
		this.store.settings.designSettings.backgroundFileCard = settings.backgroundFileCard;
		this.store.settings.designSettings.size = settings.size;
	};

	/** */
	public readonly onServerSettingsChange = (_event: ISelectChangeEventProps, settings: ServerSettingsModel): void => {
		this.store.settings.serverSettings = settings;
	};

	/** */
	public readonly onSaveClick = (): void => {
		const settings = MapperHelper.Map(this.store.settings, SettingsModel);
		this.settingsСontroller.saveDefaultSettings(settings);
	};
}
