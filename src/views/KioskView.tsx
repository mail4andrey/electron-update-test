import { observer } from 'mobx-react';
import React from 'react';
import { inject, provider } from 'react-ioc';

import { KioskViewController } from './KioskViewController';
import { KioskViewFileViewModel } from './KioskViewFileViewModel';
import { KioskViewItem } from './KioskViewItem';
import { KioskViewStore } from './KioskViewStore';

import { Grid } from '../elements/Grid';
import { Loader } from '../elements/Loader';


/** */
export interface KioskViewProps {
	// email?: EmailSettingsModel;

	// onEmailTestSend?: (event: React.MouseEvent<Element, MouseEvent>) => void;

	// onChange?: (event: ITextFieldChangeEventProps, email: EmailSettingsModel) => void;
}

@provider(KioskViewController, KioskViewStore)
@observer
/** */
export class KioskView extends React.PureComponent<KioskViewProps> {
	@inject
	private readonly controller!: KioskViewController;

	@inject
	private readonly store!: KioskViewStore;

	/** */
	public async componentDidMount(): Promise<void> {
		// this.history = useHistory();
		// this.store.settings
		await this.controller.loadFiles();
	}


	/** */
	// public email = { ...this.props.email ?? new EmailSettingsModel() };

	/** Отображение */
	public render(): React.ReactNode {
		const { files, loading } = this.store;

		if (loading) {
			return <Loader />;
		}

		const filesView = files.map((file: KioskViewFileViewModel) => (
			<KioskViewItem
				key={file.fullpath}
				file={file}
			/>
		));
		// applicationCache.
		// const { onEmailTestSend } = this.props;
		// const { login, password, server, subject, content } = this.email;
		return (
			// <Grid
			// 	container
			// 	spacing={1}
			// 	alignItems='center'
			// >
			<Grid
				container
				// direction="column"
				justify="center"
				alignItems="center"
			>
				{filesView}
			</Grid>
		);
	}

	/** */
	// private readonly onServerChange = (event: ITextFieldChangeEventProps): void => {
	// 	const { onChange } = this.props;
	// 	const { value } = event.target;
	// 	this.email.server = value;
	// 	if (onChange) {
	// 		const email = { ...this.email };
	// 		onChange(event, email);
	// 	}
	// };

	// /** */
	// private readonly onLoginChange = (event: ITextFieldChangeEventProps): void => {
	// 	const { onChange } = this.props;
	// 	const { value } = event.target;
	// 	this.email.login = value;
	// 	if (onChange) {
	// 		const email = { ...this.email };
	// 		onChange(event, email);
	// 	}
	// };

	// /** */
	// private readonly onPasswordChange = (event: ITextFieldChangeEventProps): void => {
	// 	const { onChange } = this.props;
	// 	const { value } = event.target;
	// 	this.email.password = value;
	// 	if (onChange) {
	// 		const email = { ...this.email };
	// 		onChange(event, email);
	// 	}
	// };

	// /** */
	// private readonly onSubjectChange = (event: ITextFieldChangeEventProps): void => {
	// 	const { onChange } = this.props;
	// 	const { value } = event.target;
	// 	this.email.subject = value;
	// 	if (onChange) {
	// 		const email = { ...this.email };
	// 		onChange(event, email);
	// 	}
	// };

	// /** */
	// private readonly onContentChange = (event: ITextFieldChangeEventProps): void => {
	// 	const { onChange } = this.props;
	// 	const { value } = event.target;
	// 	this.email.content = value;
	// 	if (onChange) {
	// 		const email = { ...this.email };
	// 		onChange(event, email);
	// 	}
	// };

	// /** */
	// private readonly onEmailTestSend = async (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
	// 	const email = new EmailSecndingModel();
	// 	email.server = this.email.server;
	// 	email.login = this.email.login;
	// 	email.password = this.email.password;
	// 	email.to = this.email.login;
	// 	email.subject = this.email.subject;
	// 	email.content = this.email.content;
	// 	await ipcRenderer.invoke(ElectronCommands.sendEmail, email);
	// };
}
