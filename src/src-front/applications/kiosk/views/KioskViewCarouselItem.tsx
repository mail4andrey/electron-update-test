import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';


import { DesignSizeEnum } from './DesignSizeEnum';
import { GroupByEnum } from './GroupByEnum';
import { KioskItemStateEnum } from './KioskItemStateEnum';
import { KioskViewFilesViewModel, KioskViewFileViewModel } from './KioskViewFileViewModel';
import { KioskViewItemEventProps } from './KioskViewItemEventProps';
import { LanguageEnum } from '../../../models/LanguageEnum';
import { SortOrderEnum } from './SortOrderEnum';

import { PrintSendingItemModel } from '../../../../applications/kiosk/settings/PrintSendingItemModel';
import { Checkbox } from '../../../../elements/Checkbox';
import { OneLine } from '../../../../elements/commons/OneLine';
import { RightContainer } from '../../../../elements/commons/RightContainer';
import { IconButton } from '../../../../elements/IconButton';
import { CheckBox, CheckBoxOutlineBlank, KeyboardArrowLeft, KeyboardArrowRight, Mail, Print, PrintTwoTone } from '../../../../elements/Icons';
import { Skeleton } from '../../../../elements/Skeleton';
import { Tooltip } from '../../../../elements/Tooltip';
import { Typography } from '../../../../elements/Typography';
import { UrlHelper } from '../../../helpers/UrlHelper';
import { KioskLocalization } from '../../../localization/KioskLocalization';


/** */
export interface KioskViewCarouselItemProps {
	language?: LanguageEnum;
	/** */
	backgroundFileCard?: string;
	/** */
	backgroundGroupName?: string;

	/** */
	iconColor?: string;

	/** Видеофайл */
	groups: KioskViewFilesViewModel[];

	sortOrder?: SortOrderEnum;

	/** Размер видео */
	buttonSize?: DesignSizeEnum;
	groupBy?: GroupByEnum;

	onSelectItemClick?: (event: React.ChangeEvent<HTMLInputElement>, value: KioskViewItemEventProps) => void;

	onPrintItemClick?: (event: React.MouseEvent<Element, MouseEvent>, value?: PrintSendingItemModel) => Promise<void>;

	onSendByEmailItemClick?: (event: React.MouseEvent<Element, MouseEvent>, value?: string) => Promise<void>;
}

@observer
/** */
export class KioskViewCarouselItem extends React.PureComponent<KioskViewCarouselItemProps> {

	@observable
	/** */
	private selectedGroup?: string;

	@observable
	/** */
	private selectedFile?: string;

	/** Первое включение видео */
	private firstPlay = true;

	/** Ширина видео */
	private resolutionWidth?: number;

	/** Высота видео */
	private resolutionHeight?: number;

	/** */
	private readonly videoRef = React.createRef<HTMLVideoElement>();

	/** */
	private readonly canvasRef = React.createRef<HTMLCanvasElement>();

	/** */
	private readonly middleFrameImageRef = React.createRef<HTMLImageElement>();

	/** */
	private readonly imageRef = React.createRef<HTMLImageElement>();

	/** Отображение */
	public render(): React.ReactNode {
		const { groups, buttonSize } = this.props;
		const groupBy = this.props.groupBy ?? GroupByEnum.groupByDir;
		const group = this.getGroup();
		const groupStepper = this.getGroupStepper(groupBy, group);
		const fileItem = this.getFileItem();

		return (
			<>
				{groupStepper}
				{fileItem}
			</>
		);
	}

	/** Отображение */
	public getGroupStepper(groupBy: GroupByEnum, group?: KioskViewFilesViewModel): React.ReactNode {
		const { buttonSize, iconColor } = this.props;
		if (groupBy === GroupByEnum.none) {
			return null;
		}

		const groupName = group?.dirname ?? '';
		const groupNextButton = (
			<IconButton
				onClick={this.onGroupNextClick}
			>
				<KeyboardArrowRight
					htmlColor={iconColor}
					fontSize={buttonSize}
				/>
			</IconButton>
		);
		const groupBackButton = (
			<IconButton
				onClick={this.onGroupBackClick}
			>
				<KeyboardArrowLeft
					htmlColor={iconColor}
					fontSize={buttonSize}
				/>
			</IconButton>
		);

		const background = this.props.backgroundGroupName ?? 'gray';
		return (
			<div
				className='stepper background-image-bottom-gray height60px'
				style={{ background }}
			>
				{groupBackButton}
				<Typography
					align='center'
					variant='h6'
					className='stepper-cut-text'
				>
					{groupName}
				</Typography>
				{groupNextButton}
			</div>
		);
	}

	/** Отображение */
	public getFileItem(): React.ReactNode {
		const { buttonSize, iconColor } = this.props;

		const group = this.getGroup();
		if (!group) {
			return null;
		}
		const file = this.getFile(group);
		if (!file) {
			return null;
		}

		if (!file.state
			|| file.state === KioskItemStateEnum.Hide) {
			return null;
		}

		const filename = encodeURI(file.fullpath ?? '');
		const url = UrlHelper.getUrl(`file?name=${filename}`);
		const widthSizeNumber = 800;
		const heightSizeNumber = 800;

		const show = file.state === KioskItemStateEnum.Show;
		const showImage = file.state === KioskItemStateEnum.ShowImage;
		const showSkeleton = file.state !== KioskItemStateEnum.ShowImage && file.state !== KioskItemStateEnum.Show;
		const skeleton = this.getSkeleton(showSkeleton, widthSizeNumber, heightSizeNumber);
		const middleFrameImage = this.getMiddleFrameImage(show, widthSizeNumber, heightSizeNumber);
		const video = this.getVideo(show, widthSizeNumber, heightSizeNumber, url);
		const image = this.getImage(showImage, widthSizeNumber, heightSizeNumber, url);

		const hideItem = file.state === KioskItemStateEnum.Initializing;
		const background = this.props.backgroundFileCard ?? 'gray';

		const fileStepper = this.getFileStepper();

		return (
			<div
				style={{ background }}
				className='grid-tile background-image-top-gray'
			>
				{fileStepper}
				{skeleton}
				{image}
				<div className='0video 0padding-12px position-relative0'>
					{middleFrameImage}
					{video}
					<canvas
						className='display-none'
						ref={this.canvasRef}
					/>
				</div>
			</div>
		);
	}


	/** Отображение */
	public getFileStepper(): React.ReactNode {
		const { buttonSize, iconColor, language } = this.props;

		const group = this.getGroup();
		if (!group) {
			return null;
		}

		const files = this.getFiles();
		const selectedFileIndex = files.findIndex((fileItem: KioskViewFileViewModel) => fileItem.fullpath === this.selectedFile);
		const currentStep = selectedFileIndex >= 0
			? selectedFileIndex
			: 0;

		const fileSteps = files.length;

		const file = this.getFile(group);
		if (!file) {
			return null;
		}

		const fileNextButton = (
			<IconButton
				onClick={this.onFileNextClick}
			>
				<KeyboardArrowRight
					htmlColor={iconColor}
					fontSize={buttonSize}
				/>
			</IconButton>
		);
		const fileBackButton = (
			<IconButton
				onClick={this.onFileBackClick}
			>
				<KeyboardArrowLeft
					htmlColor={iconColor}
					fontSize={buttonSize}
				/>
			</IconButton>
		);

		const checkBoxIcon = (
			<CheckBoxOutlineBlank
				htmlColor={iconColor}
				fontSize={buttonSize}
			/>
		);
		const checkBoxCheckedIcon = (
			<CheckBox
				htmlColor={iconColor}
				fontSize={buttonSize}
			/>
		);
		const checkBox = this.props.onSelectItemClick
			? (
				<Checkbox
					checked={file.isSelected}
					onChange={this.onSelect}
					icon={checkBoxIcon}
					checkedIcon={checkBoxCheckedIcon}
				/>
			)
			: null;

		const description = this.getDescription(file);

		const emailIcon = this.props.onSendByEmailItemClick
			? (
				<IconButton
					aria-label={`send ${file.filename}`}
					className='icon'
					onClick={this.onSendClick}
				>
					<Mail
						htmlColor={iconColor}
						fontSize={buttonSize}
					/>
				</IconButton>
			)
			: null;
		const printIcons = this.props.onPrintItemClick
			? (
				<>
					<Tooltip title={KioskLocalization.printMiddleFrame(language)}>
						<IconButton
							aria-label={`print ${file.filename}` }
							className='icon'
							onClick={this.onPrintMiddleFrameClick}
						>
							<Print
								htmlColor={iconColor}
								fontSize={buttonSize}
							/>
						</IconButton>
					</Tooltip>
					<Tooltip title={KioskLocalization.printCurrentFrame(language)}>
						<IconButton
							aria-label={`print ${file.filename}` }
							className='icon'
							onClick={this.onPrintCurrentFrameClick}
						>
							<PrintTwoTone
								htmlColor={iconColor}
								fontSize={buttonSize}
							/>
						</IconButton>
					</Tooltip>
				</>
			)
			: null;
		const infoBlock = (
			<OneLine>
				{description}
				<RightContainer className='padding-left-12px'>
					<OneLine>
						{emailIcon}
						{printIcons}
					</OneLine>
				</RightContainer>
			</OneLine>
		);

		const background = this.props.backgroundFileCard ?? 'gray';
		return (
			<div
				className='stepper background-image-bottom-gray0 height60px'
				style={{ background }}
			>
				{fileBackButton}
				{checkBox}
				<Typography
					align='left'
					variant='h6'
					className='stepper-cut-text'
				>
					{`(${currentStep + 1}/${fileSteps}) ${file.filename}`}
				</Typography>
				<div className='padding-right-12px'>
					{infoBlock}
				</div>
				{fileNextButton}
			</div>
		);
	}

	/** */
	private getGroup(): KioskViewFilesViewModel | undefined {
		const { groups } = this.props;
		const selectedGroupIndex = groups.findIndex((group: KioskViewFilesViewModel) => group.dirname === this.selectedGroup);
		if (selectedGroupIndex >= 0) {
			return groups[selectedGroupIndex];
		}

		if (groups.length > 0) {
			return groups[0];
		}

		return undefined;
	}

	/** */
	private getFile(group?: KioskViewFilesViewModel): KioskViewFileViewModel | undefined {
		if (!group) {
			return undefined;
		}

		const files = this.getFiles();
		const selectedFileIndex = files.findIndex((file: KioskViewFileViewModel) => file.fullpath === this.selectedFile);

		if (selectedFileIndex >= 0) {
			return files[selectedFileIndex];
		}

		if (files.length > 0) {
			return files[0];
		}

		return undefined;
	}

	/** */
	private readonly onGroupNextClick = (_event: React.MouseEvent<Element, MouseEvent>): void => {
		const { groups } = this.props;
		const selectedGroupIndex = groups.findIndex((group: KioskViewFilesViewModel) => group.dirname === this.selectedGroup);
		const currentStep = selectedGroupIndex >= 0
			? selectedGroupIndex
			: 0;
		if (groups.length > currentStep + 1) {
			this.selectedGroup = groups[currentStep + 1].dirname;
		} else if (groups.length > 0) {
			this.selectedGroup = groups[0].dirname;
		} else {
			this.selectedGroup = '';
		}

		this.selectedFile = '';
		this.resolutionWidth = undefined;
		this.resolutionHeight = undefined;
	};

	/** */
	private readonly onGroupBackClick = (_event: React.MouseEvent<Element, MouseEvent>): void => {
		const { groups } = this.props;
		const selectedGroupIndex = groups.findIndex((group: KioskViewFilesViewModel) => group.dirname === this.selectedGroup);
		if (selectedGroupIndex - 1 >= 0) {
			this.selectedGroup = groups[selectedGroupIndex - 1].dirname;
		} else if (groups.length > 0) {
			this.selectedGroup = groups[groups.length - 1].dirname;
		} else {
			this.selectedGroup = '';
		}

		this.selectedFile = '';
		this.resolutionWidth = undefined;
		this.resolutionHeight = undefined;
	};

	/** */
	private readonly onFileNextClick = (_event: React.MouseEvent<Element, MouseEvent>): void => {
		this.resolutionWidth = undefined;
		this.resolutionHeight = undefined;
		const group = this.getGroup();
		if (!group) {
			return;
		}

		const files = this.getFiles();
		const selectedFileIndex = files.findIndex((file: KioskViewFileViewModel) => file.fullpath === this.selectedFile);

		const currentStep = selectedFileIndex >= 0
			? selectedFileIndex
			: 0;
		if (files.length > currentStep + 1) {
			this.selectedFile = files[currentStep + 1].fullpath;
		} else if (files.length > 0) {
			/** Если 1ый элемент, то включается автообновление */
			this.selectedFile = '';
		} else {
			this.selectedFile = '';
		}
	};

	/** */
	private readonly onFileBackClick = (_event: React.MouseEvent<Element, MouseEvent>): void => {
		this.resolutionWidth = undefined;
		this.resolutionHeight = undefined;
		const group = this.getGroup();
		if (!group) {
			return;
		}

		const files = this.getFiles();

		const selectedFileIndex = files.findIndex((file: KioskViewFileViewModel) => file.fullpath === this.selectedFile);

		/** Если 1ый элемент, то включается автообновление */
		if (selectedFileIndex - 1 === 0) {
			this.selectedFile = '';
		}
		if (selectedFileIndex - 1 > 0) {
			this.selectedFile = files[selectedFileIndex - 1].fullpath;
		} else if (files.length > 0) {
			this.selectedFile = files[files.length - 1].fullpath;
		} else {
			this.selectedFile = '';
		}
	};

	/** */
	private getFiles(): KioskViewFileViewModel[] {
		const { groupBy, groups, sortOrder } = this.props;
		const sortMultiplexer = sortOrder === SortOrderEnum.desc ? -1 : 1;
		if (groupBy === GroupByEnum.none) {
			const allfiles = groups
				.flatMap((groupData: KioskViewFilesViewModel) => groupData.files)
				.slice()
				.sort((a: KioskViewFileViewModel, b: KioskViewFileViewModel) => a.filename!.localeCompare(b.filename!) * sortMultiplexer);
			return allfiles;
		}

		const group = this.getGroup();
		const files = group?.files
			.slice()
			.sort((a: KioskViewFileViewModel, b: KioskViewFileViewModel) => a.filename!.localeCompare(b.filename!) * sortMultiplexer);
		return files ?? [];
	}

	/** */
	private getDescription(file: KioskViewFileViewModel): React.ReactNode {
		return (
			<OneLine className='padding-left-12px padding-right-12px width200px0'>
				<div>
					{KioskLocalization.fileResolution(this.resolutionWidth, this.resolutionHeight)}
				</div>
				<div className='padding-left-12px'>
					{KioskLocalization.fileSizeInMb(file.fileSize)}
				</div>
			</OneLine>
		);
	}

	/** */
	private getSkeleton(show: boolean, widthSizeNumber: 'auto' | number, heightSizeNumber: 'auto' | number): React.ReactNode {
		if (!show) {
			return null;
		}

		const className = this.getItemHeightClass();
		return (
			<Skeleton
				className={`file-item-container-carousel-group-height ${className}`}
				animation='wave'
				variant='rect'
			/>
		);
	}

	/** */
	private getMiddleFrameImage(show: boolean, widthSizeNumber: 'auto' | number, heightSizeNumber: 'auto' | number): React.ReactNode {
		const hideClass = show
			? ''
			: 'display-none';

		const className = this.getItemHeightClass();
		return (
			<img
				ref={this.middleFrameImageRef}
				crossOrigin='anonymous'
				className={`display-none position-relative kiosk-item-image file-item-container-carousel-group-height ${className} ${hideClass}`}
				onLoad={this.onMiddleFrameImageLoadedData}
			/>
		);
	}

	/** */
	private getVideo(show: boolean, widthSizeNumber: 'auto' | number, heightSizeNumber: 'auto' | number, url: string): React.ReactNode {
		const hideClass = show
			? ''
			: 'display-none';

		const className = this.getItemHeightClass();
		return (
			<video
				controls={true}
				preload='metadata'
				onLoadedMetadata={this.onVideoLoadedMetadata}
				onTimeUpdate={this.onVideoTimeUpdate}
				onPlay={this.onPlay}
				ref={this.videoRef}
				crossOrigin='anonymous'
				className={`width100prc file-item-container-carousel-group-height ${hideClass} ${className}`}
				src={url}
			>
			</video>
		);
	}


	/** */
	private getImage(show: boolean, widthSizeNumber: 'auto' | number, heightSizeNumber: 'auto' | number, url: string): React.ReactNode {
		const className = this.getItemHeightClass();
		const hideClassName = show ? 'display-block' : 'display-none';
		return (
			<div className=''>
				<img
					ref={this.imageRef}
					crossOrigin='anonymous'
					className={`centered-container position-relative file-item-container-carousel-group-height ${className} ${hideClassName}`}
					onLoad={this.onImageLoadedData}
					src={url}
				/>
			</div>
		);

	}

	/** Событие после загрузки данных о видеофайле */
	private readonly onVideoLoadedMetadata = (event: any): void => {
		if (!event.target?.duration) {
			return;
		}

		const group = this.getGroup();
		const file = this.getFile(group);
		if (!file) {
			return;
		}

		this.resolutionWidth = event.target.videoWidth;
		this.resolutionHeight = event.target.videoHeight;
		const middle = event.target.duration / 2;
		event.target.currentTime = middle;
		file.state = KioskItemStateEnum.Loading;
	};

	/** Событие после загрузки данных о видеофайле */
	private readonly onVideoTimeUpdate = (): void => {
		const group = this.getGroup();
		const file = this.getFile(group);
		if (!file) {
			return;
		}
		if (this.firstPlay && this.middleFrameImageRef.current && this.videoRef.current?.duration) {
			const middleImage = this.getVideoFrame();
			file.middleImage = middleImage;
			this.middleFrameImageRef.current.src = middleImage.data ?? '';

			file.state = KioskItemStateEnum.Show;
		}
	};

	/** Событие при воспроизведении */
	private readonly onPlay = (event: any): void => {
		if (!event.target || !event.type || event.type !== 'play' || !this.firstPlay) {
			return;
		}

		this.firstPlay = false;
		event.target.currentTime = 0;
	};

	/** Получаем кадр из видео */
	private getVideoFrame(): PrintSendingItemModel {
		const video = this.videoRef.current!;
		const canvas = this.canvasRef.current!;
		canvas.height = video.videoHeight;
		canvas.width = video.videoWidth;
		const context = canvas.getContext('2d');
		context!.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
		const result = {
			width: video.videoWidth,
			height: video.videoHeight,
			data: canvas.toDataURL('image/jpeg', 1)
		} as PrintSendingItemModel;
		return result;
	}

	/** */
	private readonly onSelect = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		const { onSelectItemClick } = this.props;
		const group = this.getGroup();
		const file = this.getFile(group);
		if (!file) {
			return;
		}
		if (onSelectItemClick) {
			const value = {
				checked,
				id: file.fullpath,
				dirname: file.dirname
			} as KioskViewItemEventProps;
			onSelectItemClick(event, value);
		}
	};

	/** */
	private readonly onSendClick = async (event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
		const { onSendByEmailItemClick } = this.props;
		const group = this.getGroup();
		const file = this.getFile(group);
		if (!file
			|| !onSendByEmailItemClick) {
			return;
		}
		const value = file.fullpath;
		await onSendByEmailItemClick(event, value);
	};

	/** */
	private readonly onPrintMiddleFrameClick = async (event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
		const { onPrintItemClick } = this.props;
		const group = this.getGroup();
		const file = this.getFile(group);
		if (!file
			|| !onPrintItemClick) {
			return;
		}
		const value = file.middleImage;
		await onPrintItemClick(event, value);
	};

	/** */
	private readonly onPrintCurrentFrameClick = async (event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
		const { onPrintItemClick } = this.props;
		const value = this.getVideoFrame();
		if (onPrintItemClick) {
			await onPrintItemClick(event, value);
		}
	};

	/** */
	private readonly onImageLoadedData = (_event: React.SyntheticEvent<HTMLImageElement>): void => {
		const group = this.getGroup();
		const file = this.getFile(group);
		if (!file) {
			return;
		}
		file.state = KioskItemStateEnum.ShowImage;
		this.resolutionWidth = this.imageRef.current?.naturalWidth;
		this.resolutionHeight = this.imageRef.current?.naturalHeight;
	};

	/** */
	private readonly onMiddleFrameImageLoadedData = (_event: React.SyntheticEvent<HTMLImageElement>): void => {
		const group = this.getGroup();
		const file = this.getFile(group);
		if (!file) {
			return;
		}
		file.state = KioskItemStateEnum.Show;
	};

	/** */
	private getItemHeightClass(): string {
		if (this.props.groupBy === GroupByEnum.none) {
			return 'file-item-container-carousel-nogroup-height';
		}

		return 'file-item-container-carousel-group-height';
	}
}
