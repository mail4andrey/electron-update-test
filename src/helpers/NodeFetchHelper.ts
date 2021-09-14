import nodeFetch, { Response } from 'node-fetch';
import AbortController from 'abort-controller';
import { throwException } from './CustomException';
import { HttpCodes } from './HttpCodes';

export enum ResponseType {
	default = 'default',
	json = 'json',
	text = 'text',
	blob = 'blob',
	none = 'none'
}
/** */
export class NodeFetchHelper {
	public static async fetch(
		url: string,
		method: string = 'GET',
		body?: any,
		timeout: number = 3000,
		resposeType: ResponseType = ResponseType.default
	): Promise<any> {
		console.log(url, method, timeout, resposeType);
		const controller = new AbortController();
		const timer = setTimeout(() => {
			controller.abort();
		}, timeout);

		try {
			const response = await nodeFetch(url, {
				method: method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body),
				signal: controller.signal
			});

			const status = response.status;
			const headers: any = {};
			if (response.headers
				&& response.headers.forEach) {
				response.headers.forEach((v: any, k: any) => headers[k] = v);
			};

			if (status === 200) {
				const data = await NodeFetchHelper.parseResponse(response, resposeType);
				return data;
			} else if (status !== 200 && status !== 204) {
				const responseText = await response.text();
				return throwException("An unexpected server error occurred.", status, responseText, headers);
			}

			return null;
			// if (!response.ok) {
			// 	const error = `Ошибка HTTP: ${response.status}`;
			// 	throw new Error(error);
			// }

			// const data = await response.json();
			// return data;
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

	private static async parseResponse(response: Response, resposeType: ResponseType): Promise<void | Blob | string | any> {
		switch (resposeType) {
			case ResponseType.none: {
				return;
			}

			case ResponseType.blob: {
				const responseBlob = await response.blob();
				return responseBlob;
			}

			case ResponseType.text: {
				const responseText = await response.text();
				return responseText;
			}

			case ResponseType.json: {
				const responseJson = await response.json();
				return responseJson;
			}

			default:
			case ResponseType.default: {
				const responseText = await response.text();
				const data = responseText === "" ? null : JSON.parse(responseText);
				return data;
			}
		}
	}
}