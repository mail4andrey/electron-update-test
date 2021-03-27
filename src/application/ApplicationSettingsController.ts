// import { app as remoteApp } from '@electron/remote';
import { remote } from 'electron';

import fs from 'fs';
import path from 'path';

import { SettingsModel } from '../settings/SettingsModel';

/** aa */
export class ApplicationSettingsController {
	/** aa */
	public saveDefaultSettings(settings: SettingsModel, app?: Electron.App): void {
		const application = app ?? remote.app;
		const userData = application.getPath('userData');
		const settingsFile = path.join(userData, 'settings', 'settings.cfg');
		this.saveSettings(settingsFile, settings);
	}

	/** aa */
	public saveSettings(settingsFile: string, settings: SettingsModel): void {
		const settingsPath = path.dirname(settingsFile);
		if (!fs.existsSync(settingsPath)) {
			fs.mkdirSync(settingsPath);
		}

		const fileData = JSON.stringify(settings);
		fs.writeFileSync(settingsFile, fileData, { encoding: 'utf-8' });
	}

	/** aa */
	public loadDefaultSettings(app?: Electron.App): SettingsModel {
		const application = app ?? remote.app;
		const userData = application.getPath('userData');
		const settingsFile = path.join(userData, 'settings', 'settings.cfg');
		return this.loadSettings(settingsFile);
	}

	/** aa */
	public loadSettings(settingsFile: string): SettingsModel {
		if (!fs.existsSync(settingsFile)) {
			return new SettingsModel();
		}

		const settingsData = fs.readFileSync(settingsFile, { encoding: 'utf-8' });
		const settings = JSON.parse(settingsData) as SettingsModel;
		return settings;
	}
}
