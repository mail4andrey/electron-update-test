
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
	public error(message?: string, title?: string): void {
		this.log(message, LogMessageTypeEnum.error, title);
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
			// import log from 'electron-log';
			const log = require('electron-log')
			// var userAgent = navigator.userAgent.toLowerCase();
			// if (userAgent.indexOf(' electron/') > -1) {
			// // Electron-specific code
			// }
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

	// log.transports.file.resolvePath = () => path.join(APP_DATA, 'logs/main.log');

	// /** */
	// public static enable(message?: string): void {
	// 	log.catchErrors({
	// 		showDialog: false,
	// 		onError(error, versions, submitIssue) {
	// 		  electron.dialog.showMessageBox({
	// 			title: 'An error occurred',
	// 			message: error.message,
	// 			detail: error.stack,
	// 			type: 'error',
	// 			buttons: ['Ignore', 'Report', 'Exit'],
	// 		  })
	// 			.then((result) => {
	// 			  if (result.response === 1) {
	// 				submitIssue('https://github.com/my-acc/my-app/issues/new', {
	// 				  title: `Error report for ${versions.app}`,
	// 				  body: 'Error:\n```' + error.stack + '\n```\n' + `OS: ${versions.os}`
	// 				});
	// 				return;
	// 			  }
				
	// 			  if (result.response === 2) {
	// 				electron.app.quit();
	// 			  }
	// 			});
	// 		}
	// 	  });
	// }
}
