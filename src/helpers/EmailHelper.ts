import * as nodemailer from 'nodemailer';

import { EmailSecndingModel } from '../settings/EmailSendingModel';

/** */
export class MailService {
	/** */
	public static async sendMail(email?: EmailSecndingModel): Promise<void> {
		if (!email) {
			return;
		}

		const smtpConfig = {
			logger: true,
			debug: true,
			host: email.server,
			secureConnection: false,
			port: 465,
			secure: true, // use SSL
			// tls: {
			// 	rejectUnAuthorized: true
			// },
			auth: {
				user: email.login,
				pass: email.password
			}
		};
		const transporter = nodemailer.createTransport(smtpConfig);

		const options = {
			from: email.login,
			to: email.to,
			subject: email.subject,
			text: email.content
		};

		try {
			const info = await transporter.sendMail(options) as {response: string;};
			console.log(`Message Sent ${info.response}`);
		} catch (error) {
			console.error(`error: ${error}`);
		}
	}
}
