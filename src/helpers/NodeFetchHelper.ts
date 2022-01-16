import nodeFetch, { Response } from 'node-fetch';
// import crossFetch, { Response } from 'cross-fetch';
// import AbortController from 'abort-controller';
import { AbortController } from 'node-abort-controller';
import { throwException } from './CustomException';
import { HttpCodes } from './HttpCodes';
import { EventLogger } from './EventLogger';

import EventEmitter from 'events'

// export class AbortSignal extends EventEmitter {
//     aborted: boolean;
// 	constructor(signal) {
// 		super();
// 		this.signal = signal;
// 		this.aborted = false;
// 		signal.addEventListener('abort', (...e) => this.onabort(...e));
// 		this.onabort = () => 0
// 	}

// 	static get name() {
// 		return "AbortSignal";
// 	}

// 	addEventListener(...args) {
// 		this.on(...args);
// 	}

// 	removeEventListener(...args) {
// 		this.off(...args);
// 	}

// 	dispatchEvent(...args) {
// 		return true;
// 	}

// 	// _onAbort(...e) {
// 	// 	// noinspection JSConstantReassignment
// 	// 	this.aborted = true;
// 	// 	this.onabort();
// 	// 	this.emit('abort', ...e)
// 	// }
// 	onabort(...e) {
// 		// noinspection JSConstantReassignment
// 		this.aborted = true;
// 		this.onabort();
// 		this.emit('abort', ...e)
// 	}

// 	get [Symbol.toStringTag]() {
// 		return 'AbortSignal';
// 	}
// }

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
		const eventLogger = new EventLogger();
		eventLogger.info(url + ' ' + method + ' ' + timeout + ' ' + resposeType);

		let timer;
		try {
			// new AbortSignal(abortController.signal)
			const controller = new AbortController();
			timer = setTimeout(() => {
				eventLogger.info(url + ' controller.abort');
				controller.abort();
			}, timeout);

			const response = await nodeFetch(url, {
				method: method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body),
				signal: controller.signal
				// signal: new AbortSignal(controller.signal)
			});

			const status = response.status;
			const headers: any = {};
			if (response.headers
				&& response.headers.forEach) {
				response.headers.forEach((v: any, k: any) => headers[k] = v);
			};

			eventLogger.info(url + ' status: ' + status);
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
			if (timer) {
				clearTimeout(timer);
			}
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