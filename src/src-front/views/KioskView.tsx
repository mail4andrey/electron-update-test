import { observer } from 'mobx-react';
import { ProviderContext, withSnackbar } from 'notistack';
import React from 'react';
import { inject, provider } from 'react-ioc';

import { GroupByEnum } from './GroupByEnum';
import { KioskItemGroupIcon } from './KioskItemGroupIcon';
import { KioskItemLanguageIcon } from './KioskItemLanguageIcon';
import { KioskItemSizeIcon } from './KioskItemSizeIcon';
import { KioskItemSortOrderIcon } from './KioskItemSortOrderIcon';
import { KioskItemStateEnum } from './KioskItemStateEnum';
import { KioskViewController } from './KioskViewController';
import { KioskViewFilesViewModel, KioskViewFileViewModel } from './KioskViewFileViewModel';
import { KioskViewGroupItems } from './KioskViewGroupItems';
import { KioskViewStore } from './KioskViewStore';
import { VideoItemSizeEnum } from './SizeEnum';
import { SortOrderEnum } from './SortOrderEnum';

import { AppBar } from '../../elements/AppBar';
import { Badge } from '../../elements/Badge';
import { IconButton } from '../../elements/IconButton';
import { Mail, Print, Send } from '../../elements/Icons';
import { InputAdornment } from '../../elements/InputAdornment';
import { Loader } from '../../elements/Loader';
import { OneLine } from '../../elements/ommons/OneLine';
import { RightContainer } from '../../elements/ommons/RightContainer';
import { TextField } from '../../elements/TextField';
import { Toolbar } from '../../elements/Toolbar';
import { Tooltip } from '../../elements/Tooltip';
import { Typography } from '../../elements/Typography';
import { DesignSizeEnum } from '../../settings/DesignSettingsModel';
import { PrintSendingItemModel } from '../../settings/PrintSendingItemModel';
import { KioskLocalization } from '../localization/KioskLocalization';


/** */
export interface KioskViewProps extends ProviderContext {
	// email?: EmailSettingsModel;
	title?: string;

	backgroundToolbar?: string;

	backgroundGroupName?: string;

	backgroundFileCard?: string;

	size?: DesignSizeEnum;
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
		await this.controller.init();
	}

	/** */
	public async componentWillUnmount(): Promise<void> {
		await this.controller.dispose();
	}


	/** */
	// public email = { ...this.props.email ?? new EmailSettingsModel() };

	/** Отображение */
	public render(): React.ReactNode {
		const { groupsFiles, loaded, email, currentItemSize, sortOrder, language, groupBy } = this.store;
		const { size } = this.props;
		const items = this.getItems(groupsFiles, size, currentItemSize, sortOrder, groupBy);

		const fileSizes = this.getFilesSize(groupsFiles);
		// const filesGrouped = ArrayHelper.groupBy(files, (file: KioskViewFileViewModel) => file.dirname!);
		// const filesView: JSX.Element[] = [];
		// const direction = currentItemSize === VideoItemSizeEnum.column
		// 	? 'column'
		// 	: 'row';
		// for (const filesInGroup of filesGrouped) {
		// 	const [key, filesInGroupArray] = filesInGroup;
		// 	// filesInGroup[0]
		// 	// }
		// 	// filesGrouped.forEach((filesInGroup: KioskViewFileViewModel[], key: string) => {
		// 	// const filesView = filesGrouped.map((filesInGroup: KioskViewFileViewModel[]) => {
		// 	const filesInGroupArraySorted = filesInGroupArray.sort((a: KioskViewFileViewModel, b: KioskViewFileViewModel) => a.filename!.localeCompare(b.filename!) * sortMultiplexer);
		// 	const filesInGroupView = filesInGroupArraySorted.map((file: KioskViewFileViewModel) => (
		// 		// <Grid
		// 		// 	item={true}
		// 		// >
		// 		<KioskViewItem
		// 			key={file.fullpath}
		// 			file={file}
		// 			size={currentItemSize}
		// 			buttonSize={size}
		// 			onSelect={this.controller.onSelectItem}
		// 			onSendClick={this.onSendByEmailItemClick}
		// 			onPrintClick={this.onPrintItemClick}
		// 		/>
		// 		// </Grid>
		// 	));
		// 	const filesGroupView = (
		// 		<Grid
		// 			key={key}
		// 			container={true}
		// 			spacing={1}
		// 			alignContent='stretch'
		// 			direction='column'
		// 		>
		// 			<Grid
		// 				item={true}
		// 			>
		// 				<Typography
		// 					align='center'
		// 				>
		// 					{key}
		// 				</Typography>
		// 			</Grid>
		// 			<Grid
		// 				container={true}
		// 				spacing={1}
		// 				alignItems='center'
		// 				justify='space-evenly'
		// 				direction={direction}
		// 			>
		// 				{filesInGroupView}
		// 			</Grid>
		// 		</Grid>
		// 	);
		// 	filesView.push(filesGroupView);
		// }

		const allFiles = this.store.groupsFiles
			.flatMap((file: KioskViewFilesViewModel) => file.files);

		const anyFileVisible = allFiles
			.some((file: KioskViewFileViewModel) => file.state === KioskItemStateEnum.Show || file.state === KioskItemStateEnum.Loading);

		const allFileHidden = allFiles
			.every((file: KioskViewFileViewModel) => file.state === KioskItemStateEnum.Hide);

		const loader = !loaded || allFiles.length > 0 && !anyFileVisible && !allFileHidden
			? <Loader verticalCentered={true} />
			: null;

		const filesSelected = allFiles
			.filter((file: KioskViewFileViewModel) => file.isSelected).length;
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
							size={size}
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
						size={size}
						onClick={this.onPrintClick}
					>
						<Print />
					</IconButton>
				</Badge>
			</Tooltip>
		);

		const background = this.props.backgroundToolbar ?? 'gray';
		return (
			<div>
				{/* <CssBaseline /> */}
				<div
					className='padding-top-6px background-image-bottom-gray'
					style={{ background }}
				>
					<Typography
						align='center'
						variant='h5'
					>
						{this.props.title}
					</Typography>
				</div>
				<AppBar
					position='sticky'
					color='transparent'
				>
					<div
						className='padding-top-6px background-image-bottom-gray'
						style={{ background }}
					>
						<Toolbar
							variant='dense'
						>
							<OneLine>
								<TextField
								// label={KioskLocalization.labelEmailTo}
									value={email}
									onChange={this.controller.onChangeEmail}
									fullWidth={true}
									InputProps={{
										startAdornment: emailIcon,
										endAdornment: sendButton
									}}
								/>
								{printButton}
								<RightContainer
									className='padding-left-32px'
								>
									<OneLine>
										<OneLine className='padding-right-12px'>
											<KioskItemSortOrderIcon
												sortOrder={sortOrder}
												onClick={this.controller.onSortOrderChange}
											/>
											<KioskItemSizeIcon
												currentSize={currentItemSize}
												onClick={this.controller.onItemSizeChange}
											/>
											<KioskItemGroupIcon
												value={groupBy}
												onClick={this.controller.onGroupByChange}
											/>
										</OneLine>
										<KioskItemLanguageIcon
											language={language}
											onClick={this.controller.onLanguageChange}
										/>
									</OneLine>
								</RightContainer>
							</OneLine>
						</Toolbar>
					</div>
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
				{/* <div
					className='padding-12px'
				> */}
				{loader}
				{items}
				{/* </div> */}
				{/* </Grid> */}
			</div>
		);
	}

	/** zz */
	private readonly onSendByEmailItemClick = async (_event: React.MouseEvent<Element, MouseEvent>, value?: string): Promise<void> => {
		const filesSelected = this.store.groupsFiles
			.flatMap((file: KioskViewFilesViewModel) => file.files)
			.filter((file: KioskViewFileViewModel) => file.fullpath === value);
		await this.onSendByEmail(filesSelected);
	};

	/** zz */
	private readonly onSendByEmailClick = async (_event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
		const filesSelected = this.store.groupsFiles
			.flatMap((file: KioskViewFilesViewModel) => file.files)
			.filter((file: KioskViewFileViewModel) => file.isSelected);
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
		const filesImageBase64Data = this.store.groupsFiles
			.flatMap((file: KioskViewFilesViewModel) => file.files)
			.filter((file: KioskViewFileViewModel) => file.isSelected && file.middleImage)
			.map((file: KioskViewFileViewModel) => file.middleImage!);
		await this.onPrint(filesImageBase64Data);
	};

	/** zz */
	private readonly onPrintItemClick = async (_event: React.MouseEvent<Element, MouseEvent>, value?: PrintSendingItemModel): Promise<void> => {
		if (!value) {
			return;
		}
		const filesImageBase64Data = [value];
		await this.onPrint(filesImageBase64Data);
	};

	/** zz */
	private readonly onPrint = async (filesImageBase64Data: PrintSendingItemModel[]): Promise<void> => {
		if (filesImageBase64Data.length <= 0) {
			this.props.enqueueSnackbar(KioskLocalization.selectedFilesError, { variant: 'error' });
			return;
		}

		try {
			this.props.enqueueSnackbar(KioskLocalization.notificationPrinting(filesImageBase64Data.length), { variant: 'info' });
			await this.controller.sendFilesToPrint(filesImageBase64Data);
			this.props.enqueueSnackbar(KioskLocalization.notificationPrinted(filesImageBase64Data.length), { variant: 'success' });
		} catch (error) {
			console.error(error);
			const message = KioskLocalization.notificationPrintedError(filesImageBase64Data.length);
			this.props.enqueueSnackbar(message, { variant: 'error' });
			// TransitionComponent: Slide,
		}
	};

	/** */
	private getItems(groupsFiles: KioskViewFilesViewModel[], size?: DesignSizeEnum, currentItemSize?: VideoItemSizeEnum, sortOrder?: SortOrderEnum, groupBy?: GroupByEnum) {
		if (groupBy === GroupByEnum.none) {
			const files = groupsFiles.flatMap((groupFiles: KioskViewFilesViewModel) => groupFiles.files);

			return (
				<KioskViewGroupItems
					size={size}
					files={files}
					currentItemSize={currentItemSize}
					sortOrder={sortOrder}
					onPrintItemClick={this.onPrintItemClick}
					onSendByEmailItemClick={this.onSendByEmailItemClick}
					onSelectItemClick={this.controller.onSelectItem}
					backgroundGroupName={this.props.backgroundGroupName}
					backgroundFileCard={this.props.backgroundFileCard} />
			);
		}

		const uniqueGroupsFiles = groupsFiles
			.filter((value: KioskViewFilesViewModel|undefined, index: number, array: (KioskViewFilesViewModel| undefined)[]) => {
				const findIndex = array.findIndex((item: KioskViewFilesViewModel|undefined) => item?.dirname === value?.dirname);
				return findIndex === index;
			});
		return uniqueGroupsFiles.map((groupFiles: KioskViewFilesViewModel, index: number) => (
			<KioskViewGroupItems
				key={index}
				size={size}
				groupname={groupFiles.dirname}
				files={groupFiles.files}
				currentItemSize={currentItemSize}
				sortOrder={sortOrder}
				onPrintItemClick={this.onPrintItemClick}
				onSendByEmailItemClick={this.onSendByEmailItemClick}
				onSelectItemClick={this.controller.onSelectItem}
				backgroundGroupName={this.props.backgroundGroupName}
				backgroundFileCard={this.props.backgroundFileCard} />
		));
	}

	/** */
	private getFilesSize(files: KioskViewFilesViewModel[]): string {
		const selectedFiles = files
			.flatMap((file: KioskViewFilesViewModel) => file.files)
			.filter((file: KioskViewFileViewModel) => file.isSelected);
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
