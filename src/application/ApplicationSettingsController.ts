// import { app as remoteApp } from '@electron/remote';
import { remote } from 'electron';

import { ApplicationSettingsStore } from './ApplicationSettingsStore';

import fs from 'fs';
import path from 'path';

import { MapperHelper } from '../helpers/MapperHelper';
import { SettingsModel } from '../settings/SettingsModel';


/** aa */
export class ApplicationSettingsController {
	/** aa */
	public static saveDefaultSettings(): void {
		const application = remote.app;
		const userData = application.getPath('userData');
		const settingsFile = path.join(userData, 'settings', 'settings.cfg');
		ApplicationSettingsController.saveSettings(settingsFile);
	}

	/** aa */
	public static saveSettings(settingsFile: string): void {
		const settingsPath = path.dirname(settingsFile);
		if (!fs.existsSync(settingsPath)) {
			fs.mkdirSync(settingsPath);
		}

		const fileData = JSON.stringify(ApplicationSettingsStore.settings);
		fs.writeFileSync(settingsFile, fileData, { encoding: 'utf-8' });
	}

	/** aa */
	public static loadDefaultSettings(app?: Electron.App): SettingsModel {
		const application = app ?? remote.app;
		const userData = application.getPath('userData');
		const settingsFile = path.join(userData, 'settings', 'settings.cfg');
		return ApplicationSettingsController.loadSettings(settingsFile);
	}

	/** aa */
	public static loadSettings(settingsFile: string): SettingsModel {
		if (!fs.existsSync(settingsFile)) {
			return new SettingsModel();
		}

		const settingsData = fs.readFileSync(settingsFile, { encoding: 'utf-8' });
		const settings = JSON.parse(settingsData) as SettingsModel;
		// const result = MapperHelper.Map(settings, SettingsModel);
		ApplicationSettingsStore.settings = settings;
		return settings;
	}
}
