import { EmailSettingsModel } from '../../applications/kiosk/settings/tabs/email/EmailSettingsModel';
import { UrlHelper } from '../../src-front/helpers/UrlHelper';
import { UrlConsts } from '../../src-front/const/UrlConsts';
import { CameraSettingEnum, CameraStateModel } from '../../src-front/models/CameraStateModel';
import { FetchHelper } from '../../helpers/FetchHelper';
import { DownloadLastFileType } from '../../src-front/models/DownloadLastFileType';
import { SpinnerSettingsFrontViewModel, SpinnerSettingsFrontModel } from '../../src-front/applications/spinner/frontSettings/SpinnerSettingsFrontModel';

export class CameraNotFound extends Error {
}

/** */
export class CameraProxy {
	/** */
	public async pairing(): Promise<void> {
		const url = UrlHelper.getUrl(UrlConsts.camera.pairing);
		await this.request(url, 'POST');
	}
	/** */
	public async takePhoto(): Promise<void> {
		const url = UrlHelper.getUrl(UrlConsts.camera.takePhoto);
		await this.request(url, 'POST');
	}

	/** */
	public async recordVideo(duration: number): Promise<void> {
		const url = UrlHelper.getUrl(UrlConsts.camera.recordVideo);
		const request = { duration };
		await this.request(url, 'POST', request, duration + 5);
	}

	/** */
	public async getLastFile(fileType: DownloadLastFileType): Promise<string> {
		const url = UrlHelper.getUrl(UrlConsts.camera.getLastFile + '/' + fileType);
		const response = await this.request(url, 'GET');
		return response?.filename ?? '';
	}

	/** */
	public async downloadFile(fileType: DownloadLastFileType, filename: string): Promise<void> {
		const url = UrlHelper.getUrl(UrlConsts.camera.downloadFile + '/' + fileType + '/' + filename);
		// const request = { duration };
		await this.request(url, 'GET', undefined, 600000);
	}

	/** */
	public async deleteFile(filename: string): Promise<void> {
		const url = UrlHelper.getUrl(UrlConsts.camera.deleteFile);
		const request = { filename };
		await this.request(url, 'DELETE', request);
	}

	/** */
	public async getStatus(): Promise<CameraStateModel> {
		const url = UrlHelper.getUrl(UrlConsts.camera.getStatus);
		const settings = await this.request(url, 'GET');
		// const response = await fetch(
		// 	url, {
		// 	method: 'GET',
		// 	cache: 'no-cache',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// });

		// if (!response.ok) {
		// 	if (response.status === 404) {
		// 		throw new CameraNotFound();
		// 	}

		// 	const error = `Ошибка HTTP: ${response.status}`;
		// 	throw new Error(error);
		// }

		// const settings = await response.json();
		return settings as CameraStateModel;
	}

	/** */
	public async setSetting(setting: CameraSettingEnum, value: string): Promise<void> {
		const request = { setting, value };
		const url = UrlHelper.getUrl(UrlConsts.camera.setSetting);
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
}
