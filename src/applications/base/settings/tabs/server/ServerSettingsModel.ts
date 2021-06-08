import { observable } from 'mobx';

/** Модель настроек приложения */
export interface ServerSettingsModel {
	/** */
	port?: number;
}

/** Модель настроек приложения */
export class ServerSettingsViewModel implements ServerSettingsModel {
	@observable
	/** */
	public port?: number;
}
