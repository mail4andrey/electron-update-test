/** Типы ошибок */
export enum ErrorTypeEnum {
	/** Неизвестно */
	Unknown = 0,

	/** Ошибка подключения к серверу */
	ConnectionError = 1,

	/** Ошибка подключения */
	ServerError = 2,

	/** Ошибка 401: не авторизован */
	UnAuthorized = 3,

	/** Ошибка 403: нет доступа  */
	Blocked = 4,

	/** Ошибка 404: сущность не найденa */
	NotFound = 5,

	/** Ошибка 400: ошибка валидации */
	BadRequest = 6,

	/** Ошибка: 502 - Bad Gateway */
	BadGateway = 7,

	/** Ошибка: 503 - ServiceUnavailable */
	ServiceUnavailable = 8,

	/** Ошибка: 500 - InternalServerError */
	InternalServerError = 9,

	/** Ошибка - DOMException */
	DOMException = 10,

	/** Ошибка: 504 - GatewayTimeOut  */
	GatewayTimeOut = 11,

	/** Обычное текстовое сообщение  */
	String = 12,

	/** Ошибка 408: таймаут запроса */
	RequestTimeout = 13,

	/** Отмена запроса по времени */
	AbortError = 14,
}
