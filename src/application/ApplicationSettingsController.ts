// import { app as remoteApp } from '@electron/remote';
import { remote } from 'electron';

import fs from 'fs';
import path from 'path';

/** aa */
export class ApplicationSettingsController {
	/** aa */
	public saveDefaultSettings<T>(settings: T, app?: Electron.App): void {
		const application = app ?? remote.app;
		const userData = application.getPath('userData');
		const settingsFile = path.join(userData, 'settings', 'settings.cfg');
		this.saveSettings(settingsFile, settings);
	}

	/** aa */
	public saveSettings<T>(settingsFile: string, settings: T): void {
		const settingsPath = path.dirname(settingsFile);
		if (!fs.existsSync(settingsPath)) {
			fs.mkdirSync(settingsPath);
		}

		const fileData = JSON.stringify(settings);
		fs.writeFileSync(settingsFile, fileData, { encoding: 'utf-8' });
	}

	/** aa */
	public loadDefaultSettings<T>(app?: Electron.App): T {
		const application = app ?? remote.app;
		const userData = application.getPath('userData');
		const settingsFile = path.join(userData, 'settings', 'settings.cfg');
		return this.loadSettings(settingsFile);
	}

	/** aa */
	public loadSettings<T>(settingsFile: string): T {
		if (!fs.existsSync(settingsFile)) {
			return {} as T;
		}

		const settingsData = fs.readFileSync(settingsFile, { encoding: 'utf-8' });
		const settings = JSON.parse(settingsData) as T;
		return settings;
	}
}
