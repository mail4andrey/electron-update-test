import { PrintSendingItemModel } from '../../applications/kiosk/settings/PrintSendingItemModel';
import { PrinterModel, PrintSettingsModel } from '../../applications/kiosk/settings/tabs/print/PrintSettingsModel';
import { UrlHelper } from '../../src-front/helpers/UrlHelper';
declare const fetch: Function;


/** */
export class PrintProxy {
	/** */
	public async getPrinters(): Promise<PrinterModel[]> {
		const url = UrlHelper.getUrl('printers');
		const response = await fetch(url, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			headers: {
				'Content-Type': 'application/json'
			},
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
			headers: {
				'Content-Type': 'application/json'
			},
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
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request) // body data type must match "Content-Type" header
		});

		if (!response.ok) {
			const error = `Ошибка HTTP: ${response.status}`;
			throw new Error(error);
		}
	}
}
