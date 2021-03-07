import { observer } from 'mobx-react';
import { ProviderContext, withSnackbar } from 'notistack';
import React from 'react';
import { inject, provider } from 'react-ioc';


import { KioskViewController } from './KioskViewController';
import { KioskViewFileViewModel } from './KioskViewFileViewModel';
import { KioskViewItem } from './KioskViewItem';
import { KioskViewStore } from './KioskViewStore';

import { AppBar } from '../../elements/AppBar';
import { Badge } from '../../elements/Badge';
import { Grid } from '../../elements/Grid';
import { IconButton } from '../../elements/IconButton';
import { Mail, Print, Send } from '../../elements/Icons';
import { InputAdornment } from '../../elements/InputAdornment';
import { Loader } from '../../elements/Loader';
import { OneLine } from '../../elements/ommons/OneLine';
import { TextField } from '../../elements/TextField';
import { Toolbar } from '../../elements/Toolbar';
import { Tooltip } from '../../elements/Tooltip';
import { Typography } from '../../elements/Typography';
import { ArrayHelper } from '../../helpers/ArrayHelper';
import { KioskLocalization } from '../localization/KioskLocalization';


/** */
export interface KioskViewProps extends ProviderContext {
	// email?: EmailSettingsModel;

}

/**
 *
 */
@provider(KioskViewController, KioskViewStore)
@observer
/** */
class KioskView extends React.PureComponent<KioskViewProps> {
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
		const { files, loading, email, filesSelected } = this.store;

		if (loading) {
			return <Loader />;
		}

		const fileSizes = this.getFilesSize(files);

		const filesGrouped = ArrayHelper.groupBy(files, (file: KioskViewFileViewModel) => file.dirname!);
		const filesView: JSX.Element[] = [];
		for (const filesInGroup of filesGrouped) {
			const [key, filesInGroupArray] = filesInGroup;
			// filesInGroup[0]
			// }
			// filesGrouped.forEach((filesInGroup: KioskViewFileViewModel[], key: string) => {
			// const filesView = filesGrouped.map((filesInGroup: KioskViewFileViewModel[]) => {
			const filesInGroupView = filesInGroupArray.map((file: KioskViewFileViewModel) => (
				<Grid
					key={file.fullpath}
					item={true}
				>
					<KioskViewItem
						file={file}
						onSelect={this.controller.onSelectItem}
						onSendClick={this.onSendByEmailItemClick}
						onPrintClick={this.onPrintItemClick}
					/>
				</Grid>
			));
			const filesGroupView = (
				<Grid
					key={key}
					container={true}
					spacing={1}
					alignContent='stretch'
					direction='column'
				>
					<Grid
						item={true}
					>
						<Typography>
							{key}
						</Typography>
					</Grid>
					<Grid
						container={true}
						spacing={1}
						alignItems='baseline'
						justify='space-evenly'
						// direction='column'
					>
						{filesInGroupView}
					</Grid>
				</Grid>
			);
			filesView.push(filesGroupView);
		}

		// const filesView = files.map((file: KioskViewFileViewModel) => (
		// 	<Grid
		// 		key={file.fullpath}
		// 		item={true}
		// 	>
		// 		{/* <GridListTile
		// 			key={file.fullpath}
		// 			cols={cols}
		// 		> */}
		// 		<KioskViewItem
		// 			file={file}
		// 			onSelect={this.controller.onSelectItem}
		// 			onSendClick={this.onSendByEmailItemClick}
		// 			onPrintClick={this.onPrintItemClick}
		// 		/>
		// 	</Grid>
		// ));
		// const { onEmailTestSend } = this.props;
		// const { login, password, server, subject, content } = this.email;
		const emailIcon = (
			<InputAdornment position='start'>
				<Tooltip
					title={KioskLocalization.sendEmailTo}
				>
					<Mail />
				</Tooltip>
			</InputAdornment>
		);
		const sendButton = (
			<InputAdornment position='end'>
				<Typography
				>
					{fileSizes}
				</Typography>
				<Tooltip
					title={KioskLocalization.sendEmail}
				>
					<Badge
						badgeContent={filesSelected}
						color='secondary'
					>
						<IconButton
							size='small'
							onClick={this.onSendByEmailClick}
						>
							<Send />
						</IconButton>
					</Badge>
				</Tooltip>
			</InputAdornment>
		);
		const printButton = (
			<Tooltip
				title={KioskLocalization.print}
			>
				<Badge
					badgeContent={filesSelected}
					color='secondary'
				>
					<IconButton
						size='small'
						onClick={this.onPrintClick}
					>
						<Print />
					</IconButton>
				</Badge>
			</Tooltip>
		);
		return (
			<>
				{/* <CssBaseline /> */}
				<AppBar
					position='sticky'
				>
					<Toolbar>
						<OneLine>
							<TextField
								// label={label}
								value={email}
								onChange={this.controller.onChangeEmail}
								fullWidth={true}
								InputProps={{
									startAdornment: emailIcon,
									endAdornment: sendButton
								}}
							/>
							{printButton}
						</OneLine>
					</Toolbar>
				</AppBar>
				{/* <Grid
					// container={true}
					// spacing={1}
				// alignItems='center'
				// direction="column"
				// justify="center"
				// alignItems="center"
				// >
					{/* <GridList
					// cellHeight='auto'
					cols={5}
					spacing={5}
				> */}
				{filesView}
				{/* </Grid> */}
			</>
		);
	}

	/** zz */
	private readonly onSendByEmailItemClick = async (_event: React.MouseEvent<Element, MouseEvent>, value?: string): Promise<void> => {
		const filesSelected = this.store.files.filter((file: KioskViewFileViewModel) => file.fullpath === value);
		await this.onSendByEmail(filesSelected);
	};

	/** zz */
	private readonly onSendByEmailClick = async (_event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
		const filesSelected = this.store.files.filter((file: KioskViewFileViewModel) => file.isSelected);
		await this.onSendByEmail(filesSelected);
	};

	/** zz */
	private readonly onSendByEmail = async (filesSelected: KioskViewFileViewModel[]): Promise<void> => {
		const { email } = this.store;
		if (!email || email.length === 0) {
			this.props.enqueueSnackbar(KioskLocalization.sendEmailToError, { variant: 'error' });
			return;
		}

		if (filesSelected.length <= 0) {
			this.props.enqueueSnackbar(KioskLocalization.selectedFilesError, { variant: 'error' });
			return;
		}

		try {
			this.props.enqueueSnackbar(KioskLocalization.notificationSendingByEmail(filesSelected.length), { variant: 'info' });
			await this.controller.onSendByEmail(email, filesSelected);
			this.props.enqueueSnackbar(KioskLocalization.notificationSendedByEmail(filesSelected.length), { variant: 'success' });
		} catch (error) {
			console.error(error);
			const message = KioskLocalization.notificationSendedByEmailError(filesSelected.length);
			this.props.enqueueSnackbar(message, { variant: 'error' });
		}
	};

	/** zz */
	private readonly onPrintClick = async (_event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
		const filesSelected = this.store.files.filter((file: KioskViewFileViewModel) => file.isSelected);
		await this.onPrint(filesSelected);
	};

	/** zz */
	private readonly onPrintItemClick = async (_event: React.MouseEvent<Element, MouseEvent>, value?: string): Promise<void> => {
		const filesSelected = this.store.files.filter((file: KioskViewFileViewModel) => file.fullpath === value);
		await this.onPrint(filesSelected);
	};

	/** zz */
	private readonly onPrint = async (filesSelected: KioskViewFileViewModel[]): Promise<void> => {
		if (filesSelected.length <= 0) {
			this.props.enqueueSnackbar(KioskLocalization.selectedFilesError, { variant: 'error' });
			return;
		}

		try {
			this.props.enqueueSnackbar(KioskLocalization.notificationPrinting(filesSelected.length), { variant: 'info' });
			await this.controller.sendFilesToPrint(filesSelected);
			this.props.enqueueSnackbar(KioskLocalization.notificationPrinted(filesSelected.length), { variant: 'success' });
		} catch (error) {
			console.error(error);
			const message = KioskLocalization.notificationPrintedError(filesSelected.length);
			this.props.enqueueSnackbar(message, { variant: 'error' });
			// TransitionComponent: Slide,
		}
	};

	/** */
	private getFilesSize(files: KioskViewFileViewModel[]): string {
		const selectedFiles = files.filter((file: KioskViewFileViewModel) => file.isSelected);
		if (selectedFiles.length <= 0) {
			return '';
		}

		const fileSizes = selectedFiles
			.map((file: KioskViewFileViewModel) => file.fileSize ?? 0)
			.reduce((a: number, b: number) => a + b);
		return KioskLocalization.fileSizeInMb(fileSizes);
	}
}

export default withSnackbar(KioskView);
