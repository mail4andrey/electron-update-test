import AbortController from 'abort-controller';
import { throwException } from './CustomException';
import { HttpCodes } from './HttpCodes';
declare const fetch: Function;


 
/** */
export class FetchHelper {
	public static async fetch(
		url: string,
		method: string = 'GET',
		body?: any,
		timeout: number = 3000
	): Promise<any> {
		const controller = new AbortController();
		const timer = setTimeout(() => {
			controller.abort();
		}, timeout);

		try {
			const response = await fetch(url, {
				method: method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body),
				cache: 'no-cache',
				signal: controller.signal
			});

			const status = response.status;
			const headers: any = {};
			if (response.headers
				&& response.headers.forEach) {
				response.headers.forEach((v: any, k: any) => headers[k] = v);
			};

			if (status === 200) {
				const responseText = await response.text();
				const data = responseText === "" ? null : JSON.parse(responseText);
				return data;
			} else if (status !== 200 && status !== 204) {
				const responseText = await response.text();
				return throwException("An unexpected server error occurred.", status, responseText, headers);
			}

			return null;

		} catch (error) {
			if (error?.name === 'AbortError'
				|| error?.constructor?.name === 'AbortError') {
				const headers = { url, method, timeout };
				throwException('TimeOut exception', HttpCodes.RequestTimeout, '', headers);
			}

			throw error;
		} finally {
			clearTimeout(timer);
		}
	}
}
