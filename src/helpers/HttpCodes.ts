/** Список http кодов */
export class HttpCodes {
	/** BadRequest */
	public static readonly BadRequest = 400;

	/** Forbidden */
	public static readonly Forbidden = 403;

	/** NotFound */
	public static readonly NotFound = 404;

	/** Unauthorized  */
	public static readonly Unauthorized = 401;

	/** RequestTimeout  */
	public static readonly RequestTimeout = 408;

	/** Internal Server Error */
	public static readonly InternalServerError = 500;

	/** Bad Gateway */
	public static readonly BadGateway = 502;

	/** Service Unavailable */
	public static readonly ServiceUnavailable = 503;

	/** Gateway Time Out */
	public static readonly GatewayTimeOut = 504;
}
