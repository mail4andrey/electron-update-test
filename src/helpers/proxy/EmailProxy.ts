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
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			// mode: 'cors', // no-cors, *cors, same-origin
			// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			// redirect: 'follow', // manual, *follow, error
			// referrerPolicy: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(request) // body data type must match "Content-Type" header
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
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			// mode: 'cors', // no-cors, *cors, same-origin
			// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			// redirect: 'follow', // manual, *follow, error
			// referrerPolicy: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(request) // body data type must match "Content-Type" header
		});

		if (!response.ok) {
			const error = `Ошибка HTTP: ${response.status}`;
			throw new Error(error);
		}
	}
}
