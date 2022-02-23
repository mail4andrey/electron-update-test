import * as nodemailer from 'nodemailer';

import type { EmailSendingModel } from '../applications/kiosk/settings/EmailSendingModel';

/** */
export class EmailHelper {
	/** */
	public static async sendMail(email?: EmailSendingModel): Promise<void> {
		if (!email) {
			return;
		}

		const smtpConfig = {
			logger: true,
			host: email.server,
			secureConnection: false,
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
			const transporter = nodemailer.createTransport(smtpConfig);
			console.log('Message Sending', options);
			const info = await transporter.sendMail(options);
			console.log('Message Sent');
		} catch (error) {
			console.error(`error: ${error}`);
		}
	}
}
