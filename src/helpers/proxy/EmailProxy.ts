import { EmailSettingsModel } from '../../applications/kiosk/settings/tabs/email/EmailSettingsModel';
import { UrlHelper } from '../../src-front/helpers/UrlHelper';
declare const fetch: Function;


/** */
export class EmailProxy {
	/** */
	public async sendMail(email?: string, files?: string[]): Promise<void> {
		const request = { email, files };
		const url = UrlHelper.getUrl('sendMail');
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request)
		});

		if (!response.ok) {
			const error = `Ошибка HTTP: ${response.status}`;
			throw new Error(error);
		}
	}

	/** */
	public async sendMailTest(email: EmailSettingsModel): Promise<void> {
		const request = { email };
		const url = UrlHelper.getUrl('sendMailTest');
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request)
		});

		if (!response.ok) {
			const error = `Ошибка HTTP: ${response.status}`;
			throw new Error(error);
		}
	}
}
