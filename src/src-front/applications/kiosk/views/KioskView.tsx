import { observer } from 'mobx-react';
import { ProviderContext, withSnackbar } from 'notistack';
import React from 'react';
import { inject, provider } from 'react-ioc';

import { DesignSizeEnum } from './DesignSizeEnum';
import { GroupByEnum } from './GroupByEnum';
import { KioskIconsSizeIcon } from './KioskIconsSizeIcon';
import { KioskItemGroupIcon } from './KioskItemGroupIcon';
import { LanguageButton } from '../../LanguageButton';
import { KioskItemSizeIcon } from './KioskItemSizeIcon';
import { KioskItemSortOrderIcon } from './KioskItemSortOrderIcon';
import { KioskItemStateEnum } from './KioskItemStateEnum';
import { KioskViewCarouselItem } from './KioskViewCarouselItem';
import { KioskViewController } from './KioskViewController';
import { KioskViewFilesViewModel, KioskViewFileViewModel } from './KioskViewFileViewModel';
import { KioskViewGroupItems } from './KioskViewGroupItems';
import { KioskViewStore } from './KioskViewStore';
import { LanguageEnum } from '../../../models/LanguageEnum';
import { VideoItemSizeEnum } from './SizeEnum';
import { SortOrderEnum } from './SortOrderEnum';

import { AppBar } from '../../../../elements/AppBar';
import { Badge } from '../../../../elements/Badge';
import { IconButton } from '../../../../elements/IconButton';
import { Mail, Print, Send } from '../../../../elements/Icons';
import { InputAdornment } from '../../../../elements/InputAdornment';
import { Loader } from '../../../../elements/Loader';
import { OneLine } from '../../../../elements/commons/OneLine';
import { RightContainer } from '../../../../elements/commons/RightContainer';
import { TextField } from '../../../../elements/TextField';
import { Toolbar } from '../../../../elements/Toolbar';
import { Tooltip } from '../../../../elements/Tooltip';
import { Typography } from '../../../../elements/Typography';
import { PrintSendingItemModel } from '../../../../applications/kiosk/settings/PrintSendingItemModel';
import { KioskLocalization } from '../../../localization/KioskLocalization';


/** */
export interface KioskViewProps extends ProviderContext {
	title?: string;

	backgroundToolbar?: string;

	backgroundGroupName?: string;

	backgroundFileCard?: string;

	iconColor?: string;
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

	/** Отображение */
	public render(): React.ReactNode {
		const { groupsFiles, loaded, email, currentItemSize, sortOrder, language, groupBy, iconSize } = this.store;
		const { iconColor } = this.props;


		const items = this.getItems(groupsFiles, iconSize, currentItemSize, sortOrder, groupBy, language);

		const fileSizes = this.getFilesSize(groupsFiles);

		const allFiles = this.store.groupsFiles
			.flatMap((file: KioskViewFilesViewModel) => file.files);

		const filesSelected = allFiles
			.filter((file: KioskViewFileViewModel) => file.isSelected).length;
		const emailIcon = (
			<InputAdornment position='start'>
				<Mail
					htmlColor={iconColor}
					fontSize={iconSize}
				/>
			</InputAdornment>
		);
		const sendButton = (
			<InputAdornment position='end'>
				<Typography
				>
					{fileSizes}
				</Typography>
				<Tooltip
					title={KioskLocalization.sendEmail(language)}
				>
					<Badge
						badgeContent={filesSelected}
						color='secondary'
					>
						<IconButton
							onClick={this.onSendByEmailClick}
						>
							<Send
								htmlColor={iconColor}
								fontSize={iconSize}
							/>
						</IconButton>
					</Badge>
				</Tooltip>
			</InputAdornment>
		);

		const printButton = (
			<Tooltip
				title={KioskLocalization.print(language)}
			>
				<Badge
					badgeContent={filesSelected}
					color='secondary'
				>
					<IconButton
						onClick={this.onPrintClick}
					>
						<Print
							htmlColor={iconColor}
							fontSize={iconSize}
						/>
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
						className='padding-top-6px background-image-bottom-gray height65px'
						style={{ background }}
					>
						<Toolbar
							variant='dense'
						>
							<OneLine>
								<TextField
									value={email}
									onChange={this.controller.onChangeEmail}
									fullWidth={true}
									placeholder={KioskLocalization.sendEmailTo(language)}
									autoComplete='email'
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
										<OneLine
											className='padding-right-12px'
										>
											<KioskItemSortOrderIcon
												buttonSize={iconSize}
												iconColor={iconColor}
												sortOrder={sortOrder}
												onClick={this.controller.onSortOrderChange}
											/>
											<KioskItemGroupIcon
												buttonSize={iconSize}
												iconColor={iconColor}
												value={groupBy}
												onClick={this.controller.onGroupByChange}
											/>
											<KioskItemSizeIcon
												buttonSize={iconSize}
												iconColor={iconColor}
												currentSize={currentItemSize}
												onClick={this.controller.onItemSizeChange}
											/>
										</OneLine>
										<OneLine>
											<LanguageButton
												buttonSize={iconSize}
												iconColor={iconColor}
												language={language}
												onClick={this.controller.onLanguageChange}
											/>
											<KioskIconsSizeIcon
												buttonSize={iconSize}
												iconColor={iconColor}
												value={iconSize}
												onClick={this.controller.onSizeChange}
											/>
										</OneLine>
									</OneLine>
								</RightContainer>
							</OneLine>
						</Toolbar>
					</div>
				</AppBar>
				{items}
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
		const { email, language } = this.store;
		if (!email || email.length === 0) {
			this.props.enqueueSnackbar(KioskLocalization.sendEmailToError(language), { variant: 'error' });
			return;
		}

		if (filesSelected.length <= 0) {
			this.props.enqueueSnackbar(KioskLocalization.selectedFilesError(language), { variant: 'error' });
			return;
		}

		try {
			this.props.enqueueSnackbar(KioskLocalization.notificationSendingByEmail(filesSelected.length, language), { variant: 'info' });
			await this.controller.onSendByEmail(email, filesSelected);
			this.props.enqueueSnackbar(KioskLocalization.notificationSendedByEmail(filesSelected.length, language), { variant: 'success' });
		} catch (error) {
			console.error(error);
			const message = KioskLocalization.notificationSendedByEmailError(filesSelected.length, language);
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
		const { language } = this.store;
		if (filesImageBase64Data.length <= 0) {
			this.props.enqueueSnackbar(KioskLocalization.selectedFilesError(language), { variant: 'error' });
			return;
		}

		try {
			this.props.enqueueSnackbar(KioskLocalization.notificationPrinting(filesImageBase64Data.length, language), { variant: 'info' });
			await this.controller.sendFilesToPrint(filesImageBase64Data);
			this.props.enqueueSnackbar(KioskLocalization.notificationPrinted(filesImageBase64Data.length, language), { variant: 'success' });
		} catch (error) {
			console.error(error);
			const message = KioskLocalization.notificationPrintedError(filesImageBase64Data.length, language);
			this.props.enqueueSnackbar(message, { variant: 'error' });
		}
	};

	/** */
	private getItems(
		groupsFiles: KioskViewFilesViewModel[],
		iconSize?: DesignSizeEnum,
		currentItemSize?: VideoItemSizeEnum,
		sortOrder?: SortOrderEnum,
		groupBy?: GroupByEnum,
		language?: LanguageEnum
	): React.ReactNode {
		if (currentItemSize === VideoItemSizeEnum.carousel) {
			return (
				<KioskViewCarouselItem
					language={language}
					groupBy={groupBy}
					buttonSize={iconSize}
					groups={groupsFiles}
					sortOrder={sortOrder}
					onPrintItemClick={this.onPrintItemClick}
					onSendByEmailItemClick={this.onSendByEmailItemClick}
					onSelectItemClick={this.controller.onSelectItem}
					backgroundGroupName={this.props.backgroundGroupName}
					backgroundFileCard={this.props.backgroundFileCard}
					iconColor={this.props.iconColor}
				/>
			);
		}

		const allFiles = this.store.groupsFiles
			.flatMap((file: KioskViewFilesViewModel) => file.files);

		const anyFileVisible = allFiles
			.some((file: KioskViewFileViewModel) => file.state === KioskItemStateEnum.Show || file.state === KioskItemStateEnum.Loading);

		const allFileHidden = allFiles
			.every((file: KioskViewFileViewModel) => file.state === KioskItemStateEnum.Hide);

		const loader = !this.store.loaded || allFiles.length > 0 && !anyFileVisible && !allFileHidden
			? <Loader verticalCentered={true} />
			: null;

		if (groupBy === GroupByEnum.none) {
			const files = groupsFiles.flatMap((groupFiles: KioskViewFilesViewModel) => groupFiles.files);

			return (
				<>
					{loader}
					<KioskViewGroupItems
						language={language}
						size={iconSize}
						files={files}
						currentItemSize={currentItemSize}
						sortOrder={sortOrder}
						onPrintItemClick={this.onPrintItemClick}
						onSendByEmailItemClick={this.onSendByEmailItemClick}
						onSelectItemClick={this.controller.onSelectItem}
						backgroundGroupName={this.props.backgroundGroupName}
						backgroundFileCard={this.props.backgroundFileCard}
						iconColor={this.props.iconColor}
					/>
				</>
			);
		}

		const uniqueGroupsFiles = groupsFiles
			.filter((value: KioskViewFilesViewModel|undefined, index: number, array: (KioskViewFilesViewModel| undefined)[]) => {
				const findIndex = array.findIndex((item: KioskViewFilesViewModel|undefined) => item?.dirname === value?.dirname);
				return findIndex === index;
			});
		const groupsElemnts = uniqueGroupsFiles.map((groupFiles: KioskViewFilesViewModel, index: number) => (
			<KioskViewGroupItems
				key={index}
				language={language}
				size={iconSize}
				groupname={groupFiles.dirname}
				files={groupFiles.files}
				currentItemSize={currentItemSize}
				sortOrder={sortOrder}
				onPrintItemClick={this.onPrintItemClick}
				onSendByEmailItemClick={this.onSendByEmailItemClick}
				onSelectItemClick={this.controller.onSelectItem}
				backgroundGroupName={this.props.backgroundGroupName}
				backgroundFileCard={this.props.backgroundFileCard}
				iconColor={this.props.iconColor}
			/>
		));

		return (
			<>
				{loader}
				{groupsElemnts}
			</>
		);
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
