export enum LogMessageTypeEnum {
	info,
	error,
	warn,
	success
}
export interface EventMessage {
	message: string;

	type: LogMessageTypeEnum;
}

export class EventLogger {
	/** */
	private messages: EventMessage[] = [];

	/** */
	public info(message?: string, title?: string): void {
		this.log(message, LogMessageTypeEnum.info, title);
	}
	/** */
	public success(message?: string, title?: string): void {
		this.log(message, LogMessageTypeEnum.success, title);
	}
	/** */
	public error(error?: any, title?: string): void {
		const errorMessage = error.constructor === String
			? error.toString()
			: JSON.stringify(error);
		this.log(errorMessage, LogMessageTypeEnum.error, title);
	}
	/** */
	public warn(message?: string, title?: string): void {
		this.log(message, LogMessageTypeEnum.warn, title);
	}

	/** */
	public log(message: string | undefined, type: LogMessageTypeEnum, title?: string): void {
		if (!message || message.length <= 0) {
			return;
		}

		this.messages.push({message: message, type: type });

		if (process.versions.hasOwnProperty('electron')) {
			const log = require('electron-log')
			switch (type) {
				case LogMessageTypeEnum.info:
					log.info(title, message);
					break;
				case LogMessageTypeEnum.error:
					log.error(title, message);
					break;
				case LogMessageTypeEnum.success:
					log.info(title, message);
					break;
				case LogMessageTypeEnum.warn:
					log.warn(title, message);
					break;
				default:
					log.log(title, message);
			}
		}
	}

}
