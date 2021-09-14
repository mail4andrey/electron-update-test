import AbortController from 'abort-controller';
import { throwException } from './CustomException';
import { HttpCodes } from './HttpCodes';



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

			
			// if (!response.ok) {
			// 	const error = {
			// 		message: `Ошибка HTTP: ${status}`,
			// 		status: response.status
			// 	};
			// 	// const error = `Ошибка HTTP: ${response.status}`;
			// 	throw new Error(error);
			// }

			// const data = await response.json();
			// return data;
		// } catch (error) {
		// 	console.error(error?.constructor);
		// 	console.error(error);
		// 	throw error;
		// 	// if (error.constructor === 'AbortError') {
		// 	// if (error instanceof AbortError) {
		// 	// 	console.log('request was aborted');
		// 	// }
		} catch (error) {
			// console.error(error?.constructor?.name);
			// console.error(error);
			// if (error instanceof nodeFetch.AbortError) {
			if (error?.name === 'AbortError'
				|| error?.constructor?.name === 'AbortError') {
				const headers = { url, method, timeout };
				throwException('TimeOut exception', HttpCodes.RequestTimeout, '', headers);
				// console.log('request was aborted');
			}

			throw error;
		} finally {
			clearTimeout(timer);
		}
	}
}

// protected processClientState(response: Response): Promise<AntifraudClientStateResponse> {
// 	if (status === 200) {
// 		return response.text().then((_responseText) => {
// 		let result200: any = null;
// 		let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
// 		result200 = AntifraudClientStateResponse.fromJS(resultData200);
// 		return result200;
// 		});
// 	} else if (status !== 200 && status !== 204) {
// 		return response.text().then((_responseText) => {
// 		return throwException("An unexpected server error occurred.", status, _responseText, _headers);
// 		});
// 	}
// 	return Promise.resolve<AntifraudClientStateResponse>(<any>null);
// }