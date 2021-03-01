// import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react';
import React from 'react';

import { EmailSecndingModel } from './EmailSendingModel';
import { EmailSettingsModel } from './EmailSettingsModel';
import { SettingsLocalization } from './SettingsLocalization';

import { ElectronCommands } from '../ElectronCommands';
import { Button } from '../elements/Button';
import { InputLabel } from '../elements/InputLabel';
import { ITextFieldChangeEventProps, TextField } from '../elements/TextField';


/** */
export interface EmailSettingsProps {
	email?: EmailSettingsModel;

	onEmailTestSend?: (event: React.MouseEvent<Element, MouseEvent>) => void;

	onChange?: (event: ITextFieldChangeEventProps, email: EmailSettingsModel) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class EmailSettings extends React.PureComponent<EmailSettingsProps> {
	/** */
	public email = { ...this.props.email ?? new EmailSettingsModel() };

	/** Отображение */
	public render(): React.ReactNode {
		const { onEmailTestSend } = this.props;
		const { login, password, server, subject, content } = this.email;
		return (
			// <Grid
			// 	container
			// 	direction="column"
			// 	justify="center"
			// 	alignItems="center"
			// >
			<div className=''>
				<div>
					<InputLabel>
						{SettingsLocalization.emailTab.title}
					</InputLabel>
				</div>
				<div>
					<TextField
						label={SettingsLocalization.emailTab.server}
						value={server}
						onChange={this.onServerChange}
						fullWidth={true}
						required={true}
					/>
				</div>
				<div>
					<TextField
						label={SettingsLocalization.emailTab.login}
						value={login}
						onChange={this.onLoginChange}
						fullWidth={true}
						required={true}
					/>
				</div>
				<div>
					<TextField
						label={SettingsLocalization.emailTab.password}
						value={password}
						onChange={this.onPasswordChange}
						fullWidth={true}
						required={true}
					/>
				</div>
				<div>
					<TextField
						label={SettingsLocalization.emailTab.subject}
						value={subject}
						onChange={this.onSubjectChange}
						fullWidth={true}
					/>
				</div>
				<div>
					<TextField
						label={SettingsLocalization.emailTab.content}
						value={content}
						onChange={this.onContentChange}
						fullWidth={true}
					/>
				</div>
				<div>
					<Button
						onClick={this.onEmailTestSend}
						color='primary'
						size='small'
					>
						{SettingsLocalization.emailTab.testSendButton}
					</Button>
					{/* </div> */}
				</div>
			</div>
		);
	}

	/** */
	private readonly onServerChange = (event: ITextFieldChangeEventProps): void => {
		const { onChange } = this.props;
		const { value } = event.target;
		this.email.server = value;
		if (onChange) {
			const email = { ...this.email };
			onChange(event, email);
		}
	};

	/** */
	private readonly onLoginChange = (event: ITextFieldChangeEventProps): void => {
		const { onChange } = this.props;
		const { value } = event.target;
		this.email.login = value;
		if (onChange) {
			const email = { ...this.email };
			onChange(event, email);
		}
	};

	/** */
	private readonly onPasswordChange = (event: ITextFieldChangeEventProps): void => {
		const { onChange } = this.props;
		const { value } = event.target;
		this.email.password = value;
		if (onChange) {
			const email = { ...this.email };
			onChange(event, email);
		}
	};

	/** */
	private readonly onSubjectChange = (event: ITextFieldChangeEventProps): void => {
		const { onChange } = this.props;
		const { value } = event.target;
		this.email.subject = value;
		if (onChange) {
			const email = { ...this.email };
			onChange(event, email);
		}
	};

	/** */
	private readonly onContentChange = (event: ITextFieldChangeEventProps): void => {
		const { onChange } = this.props;
		const { value } = event.target;
		this.email.content = value;
		if (onChange) {
			const email = { ...this.email };
			onChange(event, email);
		}
	};

	/** */
	private readonly onEmailTestSend = async (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
		const email = new EmailSecndingModel();
		email.server = this.email.server;
		email.login = this.email.login;
		email.password = this.email.password;
		email.to = this.email.login;
		email.subject = this.email.subject;
		email.content = this.email.content;
		// await ipcRenderer.invoke(ElectronCommands.sendEmail, email);
	};
}
