import { observable } from 'mobx';

/** Модель настроек приложения */
export class ServerSettingsModel {
	/** */
	public port?: number = Number(process.env.DEFAULTPORT);
}

/** Модель настроек приложения */
export class ServerSettingsViewModel extends ServerSettingsModel {
	@observable
	/** */
	public port?: number = Number(process.env.DEFAULTPORT);
}
