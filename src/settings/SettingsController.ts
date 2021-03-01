import { ITextFieldChangeEventProps } from 'elements/TextField';
import { inject } from 'react-ioc';


import { EmailSettingsModel } from './EmailSettingsModel';
import { SettingsModel } from './SettingsModel';
import { SettingsStore } from './SettingsStore';
import { SettingsViewModel } from './SettingsViewModel';

import { ApplicationSettingsController } from '../application/ApplicationSettingsController';
import { ApplicationSettingsStore } from '../application/ApplicationSettingsStore';
import { MapperHelper } from '../helpers/MapperHelper';


/** */
export class SettingsController {
	@inject
	private readonly store!: SettingsStore;

	/** */
	public loadSettings = (): void => {
		this.store.settings = MapperHelper.Map(ApplicationSettingsStore.settings, SettingsViewModel);
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
	public readonly onEmailSettingsChange = (_event: ITextFieldChangeEventProps, email: EmailSettingsModel): void => {
		this.store.settings.email = email;
	};

	/** */
	public readonly onSaveClick = (): void => {
		ApplicationSettingsStore.settings = MapperHelper.Map(this.store.settings, SettingsModel);
		ApplicationSettingsController.saveDefaultSettings();
	};
}
