import { ErrorTypeEnum } from './ErrorTypeEnum';
import { HttpCodes } from './HttpCodes';
import { ArrayHelper } from './ArrayHelper';

/**
 * Хелпер для ошибок
 */
export class ErrorHelper {
	/** Получает тип ошибки по сообщению */
	public static getErrorType = (error: any): ErrorTypeEnum | undefined => {
		if (!error) {
			return undefined;
		}

		if (error.isCustomException) {
			const type = ErrorHelper.getErrorFromResponse(error);
			return type;
		}

		console.log(error.constructor);
		switch (error.constructor) {
			case TypeError:
				if (error.message === 'Failed to fetch') {
					return ErrorTypeEnum.ConnectionError;
				}
				return ErrorTypeEnum.Unknown;
			// case UnAuthException:
			// 	return ErrorTypeEnum.UnAuthorized;
			// case BadGatewayException:
			// 	return ErrorTypeEnum.BadGateway;
			// case ServiceUnavailableException:
			// 	return ErrorTypeEnum.ServiceUnavailable;
			// case GatewayTimeOutException:
			// 	return ErrorTypeEnum.GatewayTimeOut;
			case DOMException:
				if (error?.name === 'AbortError'
				|| error?.constructor?.name === 'AbortError') {
					return ErrorTypeEnum.AbortError;
				}

				return ErrorTypeEnum.DOMException;
			// case DOMException:
			// 	return ErrorTypeEnum.DOMException;
			case String:
				return ErrorTypeEnum.String;
			default:
				return ErrorTypeEnum.Unknown;
		}
	};

	/** Получает текст ошибки */
	public static readonly getErrorText = (error: any): string => {
		if (!error) {
			return '';
		}

		if (error.isCustomException) {
			return ErrorHelper.parseError(error.response);
		}

		switch (error.constructor) {
			// case UnAuthException:
			// case ServiceUnavailableException:
			// case GatewayTimeOutException:
			case Error:
				return error.message;
			case TypeError:
				if (error.message === 'Failed to fetch') {
					// return CommonLocalization.connectionError;
				}
				return error.message;
			case DOMException:
				return error.message;
			case String:
				return error;
			default:
				return JSON.stringify(error);
		}
	};

	/**
	 * Проверяем, что это ошибка валидации
	 * * Формат ошибки валидации: '{"SomeName": ["errorMessage","errorMessage 2"]}'
	 */
	public static parseError(error: string): string {
		try {
			const jsonObject = JSON.parse(error);
			let errorMessages: string[] = [];

			if (jsonObject.constructor === String) {
				return String(jsonObject);
			}

			for (const propertyName in jsonObject) {
				if (jsonObject.hasOwnProperty(propertyName)) {
					const errorMessage = jsonObject[propertyName];
					if (Array.isArray(errorMessage)) {
						errorMessages = errorMessages.concat(errorMessage);
					} else {
						errorMessages.push(errorMessage);
					}
				}
			}

			const message = ArrayHelper.arrayToString(
				errorMessages.map((a: string) => `* ${a}`),
				'\r\n'
			);

			return message;
		} catch (e) {
			return error;
		}
	}

	/** Получение типа ошибки из ответов сервера */
	private static getErrorFromResponse(error: any): ErrorTypeEnum {
		switch (error.status) {
			case HttpCodes.BadRequest:
				return ErrorTypeEnum.BadRequest;
			case HttpCodes.Forbidden:
				return ErrorTypeEnum.Blocked;
			case HttpCodes.NotFound:
				return ErrorTypeEnum.NotFound;
			case HttpCodes.Unauthorized:
				return ErrorTypeEnum.UnAuthorized;
			case HttpCodes.InternalServerError:
				return ErrorTypeEnum.InternalServerError;
			case HttpCodes.RequestTimeout:
				return ErrorTypeEnum.RequestTimeout;
			default:
				return ErrorTypeEnum.ServerError;
		}
	}
}
