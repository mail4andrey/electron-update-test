import * as nodemailer from 'nodemailer';

import { EmailSendingModel } from '../applications/kiosk/settings/EmailSendingModel';

/** */
export class EmailHelper {
	/** */
	public static async sendMail(email?: EmailSendingModel): Promise<void> {
		if (!email) {
			return;
		}

		const smtpConfig = {
			logger: true,
			// debug: true,
			host: email.server,
			secureConnection: false,
			// secure: false,
			port: 465,
			secure: true, // use SSL
			auth: {
				user: email.login,
				pass: email.password
			},
			tls: {
				// do not fail on invalid certs
				rejectUnauthorized: false
			}
			// tls: {
			// 	// rejectUnAuthorized: true
			// 	rejectUnauthorized: false
			// },
		};

		const attachments = email.attachments?.map((file: string) => ({ path: file }));
		const options = {
			from: email.login,
			to: email.to,
			subject: email.subject,
			text: email.content,
			attachments
		};

		try {
			// console.log('createTransport', smtpConfig);
			const transporter = nodemailer.createTransport(smtpConfig);
			// console.log('verify', options);
			// await transporter.verify();
			console.log('Message Sending', options);
			const info = await transporter.sendMail(options) as {response: string;};
			console.log('Message Sent', info.response);
		} catch (error) {
			console.error(`error: ${error}`);
			// throw error;
		}
	}
}
