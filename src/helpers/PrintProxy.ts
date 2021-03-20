import { PrintSendingItemModel } from '../settings/PrintSendingItemModel';
import { PrintSendingModel } from '../settings/PrintSendingModel';
import { PrinterModel, PrintSettingsModel } from '../settings/PrintSettingsModel';
import { UrlHelper } from '../src-front/helpers/UrlHelper';


/** */
export class PrintProxy {
	/** */
	public async getPrinters(): Promise<PrinterModel[]> {
		const url = UrlHelper.getUrl('printers');
		const response = await fetch(url, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			// mode: 'cors', // no-cors, *cors, same-origin
			// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			// redirect: 'follow', // manual, *follow, error
			// referrerPolicy: 'no-referrer', // no-referrer, *client
			// body: JSON.stringify(value?.data) // body data type must match "Content-Type" header
		});

		if (!response.ok) {
			const error = `Ошибка HTTP: ${response.status}`;
			throw new Error(error);
		}

		const printers = await response.json() as PrinterModel[];
		return printers;
	}

	/** */
	public async print(printModel?: PrintSendingItemModel[]): Promise<void> {
		const request = { printModel };
		const url = UrlHelper.getUrl('printData');
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
	public async printTest(printModel?: PrintSettingsModel): Promise<void> {
		const request = { printModel };
		const url = UrlHelper.getUrl('printTest');
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
