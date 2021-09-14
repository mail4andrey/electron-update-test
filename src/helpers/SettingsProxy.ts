import { UrlConsts } from '../src-front/const/UrlConsts';
import { UrlHelper } from '../src-front/helpers/UrlHelper';
import type { DesignSettingsModel } from '../src-front/models/DesignSettingsModel';


/** */
export class SettingsProxy {
	/** */
	public async getSettings(): Promise<DesignSettingsModel> {
		const url = UrlHelper.getUrl(UrlConsts.settingsUrl);
		const response = await fetch(url, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			// mode: 'cors', // no-cors, *cors, same-origin
			// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
			// redirect: 'follow', // manual, *follow, error
			// referrerPolicy: 'no-referrer', // no-referrer, *client
			// body: JSON.stringify(value?.data) // body data type must match "Content-Type" header
		});

		if (!response.ok) {
			const error = `Ошибка HTTP: ${response.status}`;
			throw new Error(error);
		}

		const settings = await response.json() as DesignSettingsModel;
		return settings;
	}
}
