import { UrlConsts } from '../../src-front/const/UrlConsts';
import { UrlHelper } from '../../src-front/helpers/UrlHelper';
import type { DesignSettingsModel } from '../../src-front/models/DesignSettingsModel';
import { FetchHelper } from '../../helpers/FetchHelper';
import { SpinnerSettingsFrontModel } from '../../src-front/applications/spinner/frontSettings/SpinnerSettingsFrontModel';
declare const fetch: Function;

/** */
export class SettingsProxy {
	/** */
	public async saveFrontSettings(setting?: SpinnerSettingsFrontModel): Promise<void> {
		const request = { setting };
		const url = UrlHelper.getUrl(UrlConsts.saveFrontSettings);
		await this.request(url, 'POST', request);
	}

	private async request(
		url: string,
		method: string = 'GET',
		request?: any,
		timeout: number = 3000
	): Promise<any> {
		const response = await FetchHelper.fetch(url, method, request, timeout);
		return response;
	}

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
