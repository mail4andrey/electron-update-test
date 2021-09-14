
export class CustomException extends Error {
	message: string;
	status: number;
	response: string;
	headers: { [key: string]: any; };
	result: any;

	constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
		super();

		this.message = message;
		this.status = status;
		this.response = response;
		this.headers = headers;
		this.result = result;
	}

	protected isCustomException = true;

	static isCustomException(obj: any): obj is CustomException {
		return obj.isCustomException === true;
	}
}

export function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
	throw new CustomException(message, status, response, headers, result);
}