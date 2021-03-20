import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react';
import React from 'react';


import { EmailSendingModel } from './EmailSendingModel';
import { EmailSettingsModel } from './EmailSettingsModel';
import { SettingsLocalization } from './SettingsLocalization';

import { ElectronCommands } from '../ElectronCommands';
import { Button } from '../elements/Button';
import { FormControl } from '../elements/FormControl';
import { Mail } from '../elements/Icons';
import { InputLabel } from '../elements/InputLabel';
import { ITextFieldChangeEventProps, TextField } from '../elements/TextField';
import { Typography } from '../elements/Typography';
import { EmailProxy } from '../helpers/EmailProxy';


/** */
export interface EmailSettingsProps {
	settings?: EmailSettingsModel;

	onChange?: (event: ITextFieldChangeEventProps, settings: EmailSettingsModel) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class EmailSettings extends React.PureComponent<EmailSettingsProps> {

	/** */
	private readonly client = new EmailProxy();

	/** */
	private settings = { ...this.props.settings ?? new EmailSettingsModel() };

	/** Отображение */
	public render(): React.ReactNode {
		const { login, password, server, subject, content } = this.settings;
		return (
			<div className=''>
				<Typography
					variant='h5'
				>
					{SettingsLocalization.emailTab.title}
				</Typography>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						label={SettingsLocalization.emailTab.server}
						value={server}
						onChange={this.onServerChange}
						fullWidth={true}
						required={true}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						label={SettingsLocalization.emailTab.login}
						value={login}
						onChange={this.onLoginChange}
						fullWidth={true}
						required={true}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						label={SettingsLocalization.emailTab.password}
						value={password}
						onChange={this.onPasswordChange}
						fullWidth={true}
						required={true}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						label={SettingsLocalization.emailTab.subject}
						value={subject}
						onChange={this.onSubjectChange}
						fullWidth={true}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						label={SettingsLocalization.emailTab.content}
						value={content}
						onChange={this.onContentChange}
						fullWidth={true}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<Button
						onClick={this.onEmailTestSend}
						color='primary'
						variant='contained'
						startIcon={<Mail />}
					>
						{SettingsLocalization.emailTab.testSendButton}
					</Button>
				</FormControl>
			</div>
		);
	}

	/** */
	private readonly onServerChange = (event: ITextFieldChangeEventProps): void => {
		const { onChange } = this.props;
		const { value } = event.target;
		this.settings.server = value;
		if (onChange) {
			const email = { ...this.settings };
			onChange(event, email);
		}
	};

	/** */
	private readonly onLoginChange = (event: ITextFieldChangeEventProps): void => {
		const { onChange } = this.props;
		const { value } = event.target;
		this.settings.login = value;
		if (onChange) {
			const email = { ...this.settings };
			onChange(event, email);
		}
	};

	/** */
	private readonly onPasswordChange = (event: ITextFieldChangeEventProps): void => {
		const { onChange } = this.props;
		const { value } = event.target;
		this.settings.password = value;
		if (onChange) {
			const email = { ...this.settings };
			onChange(event, email);
		}
	};

	/** */
	private readonly onSubjectChange = (event: ITextFieldChangeEventProps): void => {
		const { onChange } = this.props;
		const { value } = event.target;
		this.settings.subject = value;
		if (onChange) {
			const email = { ...this.settings };
			onChange(event, email);
		}
	};

	/** */
	private readonly onContentChange = (event: ITextFieldChangeEventProps): void => {
		const { onChange } = this.props;
		const { value } = event.target;
		this.settings.content = value;
		if (onChange) {
			const email = { ...this.settings };
			onChange(event, email);
		}
	};

	/** */
	private readonly onEmailTestSend = async (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
		try {
			await this.client.sendMailTest(this.settings);
		} catch (error) {

		}
		// const email = new EmailSendingModel();
		// email.server = this.email.server;
		// email.login = this.email.login;
		// email.password = this.email.password;
		// email.to = this.email.login;
		// email.subject = this.email.subject;
		// email.content = this.email.content;
		// await ipcRenderer.invoke(ElectronCommands.sendEmail, email);
	};
}
