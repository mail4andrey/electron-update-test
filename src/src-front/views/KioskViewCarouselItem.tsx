import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';


import { DesignSizeEnum } from './DesignSizeEnum';
import { GroupByEnum } from './GroupByEnum';
import { KioskItemStateEnum } from './KioskItemStateEnum';
import { KioskViewFilesViewModel, KioskViewFileViewModel } from './KioskViewFileViewModel';
import { KioskViewItemEventProps } from './KioskViewItemEventProps';
import { LanguageEnum } from './LanguageEnum';
import { VideoItemSizeEnum } from './SizeEnum';
import { SortOrderEnum } from './SortOrderEnum';

import { Checkbox } from '../../elements/Checkbox';
import { OneLine } from '../../elements/commons/OneLine';
import { RightContainer } from '../../elements/commons/RightContainer';
import { Grid } from '../../elements/Grid';
import { IconButton } from '../../elements/IconButton';
import { CheckBox, CheckBoxOutlineBlank, KeyboardArrowLeft, KeyboardArrowRight, Mail, Print, PrintTwoTone } from '../../elements/Icons';
import { MobileStepper } from '../../elements/MobileStepper';
import { Skeleton } from '../../elements/Skeleton';
import { Tooltip } from '../../elements/Tooltip';
import { Typography } from '../../elements/Typography';
import { PrintSendingItemModel } from '../../applications/kiosk/settings/PrintSendingItemModel';
import { UrlHelper } from '../helpers/UrlHelper';
import { KioskLocalization } from '../localization/KioskLocalization';


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
	// iconSize?: VideoItemSizeEnum;

	/** Размер видео */
	buttonSize?: DesignSizeEnum;
	groupBy?: GroupByEnum;

	onSelectItemClick?: (event: React.ChangeEvent<HTMLInputElement>, value: KioskViewItemEventProps) => void;

	onPrintItemClick: (event: React.MouseEvent<Element, MouseEvent>, value?: PrintSendingItemModel) => Promise<void>;

	onSendByEmailItemClick: (event: React.MouseEvent<Element, MouseEvent>, value?: string) => Promise<void>;
}

// @provider(KioskViewController, KioskViewStore)
@observer
/** */
export class KioskViewCarouselItem extends React.PureComponent<KioskViewCarouselItemProps> {

	@observable
	/** */
	private selectedGroup?: string;

	@observable
	/** */
	private selectedFile?: string;

	// @observable
	// /** */
	// private fileState = KioskItemStateEnum.Initializing;

	/** Первое включение видео */
	private firstPlay = true;

	/** Ширина видео */
	private resolutionWidth = 0;

	/** Высота видео */
	private resolutionHeight = 0;

	/** */
	private readonly videoRef = React.createRef<HTMLVideoElement>();

	/** */
	private readonly canvasRef = React.createRef<HTMLCanvasElement>();

	/** */
	private readonly imageRef = React.createRef<HTMLImageElement>();

	// @inject
	// private readonly controller!: KioskViewController;

	// @inject
	// private readonly store!: KioskViewStore;

	/** */
	// public async componentDidMount(): Promise<void> {
	// 	// this.history = useHistory();
	// 	// this.store.settings
	// 	await this.controller.loadFiles();
	// }


	/** */
	// public email = { ...this.props.email ?? new EmailSettingsModel() };

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

		// const group = this.getGroup();
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
				{/* <MobileStepper
					steps={groupSteps}
					position='static'
					variant='text'
					activeStep={currentStep}
					nextButton={groupNextButton}
					backButton={groupBackButton}
				/> */}
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
		// const filenameShow = file.filename ?? '';

		if (!file.state
			|| file.state === KioskItemStateEnum.Hide) {
			return null;
		}

		const filename = encodeURI(file.fullpath ?? '');
		const url = UrlHelper.getUrl(`file?name=${filename}`);
		const widthSizeNumber = 800;
		const heightSizeNumber = 800;

		const show = file.state === KioskItemStateEnum.Show;
		const showSkeleton = file.state === KioskItemStateEnum.Loading;
		const skeleton = this.getSkeleton(showSkeleton, widthSizeNumber, heightSizeNumber);
		const image = this.getImage(show, widthSizeNumber, heightSizeNumber);
		const video = this.getVideo(show, widthSizeNumber, heightSizeNumber, url);

		const hideItem = file.state === KioskItemStateEnum.Initializing;
		const background = this.props.backgroundFileCard ?? 'gray';

		const fileStepper = this.getFileStepper();

		return (
			// <Grid
			// 	item
			// 	className={hideItemClass}
			// >
			<div
				style={{ background }}
				className='grid-tile background-image-top-gray'
			>
				{/* {file.state} */}
				{fileStepper}
				{/* {topBlock} */}
				<div className='0video 0padding-12px position-relative0'>
					{/* {skeleton} */}
					{image}
					{video}
					<canvas
						className='display-none'
						// style={{ display: 'none' }}
						ref={this.canvasRef}
					/>
					{/* {insideBlock} */}
				</div>
				{/* {bottomBlock} */}
			</div>
			// </Grid>
		);
	}


	/** Отображение */
	public getFileStepper(): React.ReactNode {
		const { buttonSize, iconColor, language } = this.props;
		// if (groupBy === GroupByEnum.none) {
		// 	return null;
		// }

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
		const checkBox = (
			<Checkbox
				checked={file.isSelected}
				onChange={this.onSelect}
				// size={buttonSize}
				// style={{ color: iconColor }}
				icon={checkBoxIcon}
				checkedIcon={checkBoxCheckedIcon}
				// color='secondary'
			/>
		);

		const description = this.getDescription(file);

		const emailIcon = (
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
		);
		const printIcons = (
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
					</IconButton></Tooltip>
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
		);
		const infoBlock = (
			<OneLine>
				{/* {checkBox} */}
				{/* <div
					className='width-560px'
				> */}
				{description}
				{/* </div> */}
				<RightContainer className='padding-left-12px'>
					<OneLine>
						{/* {checkBox} */}
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
				{/* <MobileStepper
					steps={fileSteps}
					position='static'
					variant='text'
					activeStep={currentStep}
					nextButton={fileNextButton}
					backButton={fileBackButton}
				/> */}
				{/* {filename} */}
				{fileBackButton}
				{checkBox}
				{/* <OneLine></OneLine> */}
				{/* <div className='padding-right-12px'>
					{`${currentStep + 1}/${fileSteps}`}
				</div> */}
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
	};

	/** */
	private readonly onFileNextClick = (_event: React.MouseEvent<Element, MouseEvent>): void => {
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
			this.selectedFile = ''; // files[0].fullpath;
		} else {
			this.selectedFile = '';
		}
	};

	/** */
	private readonly onFileBackClick = (_event: React.MouseEvent<Element, MouseEvent>): void => {
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
					{KioskLocalization.fileSizeInMb(file.fileSize)}
				</div>
				<div className='padding-left-12px'>
					{KioskLocalization.fileResolution(this.resolutionWidth, this.resolutionHeight)}
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
				// width={widthSizeNumber}
				// height={heightSizeNumber}
			/>
		);
	}

	/** */
	private getImage(show: boolean, widthSizeNumber: 'auto' | number, heightSizeNumber: 'auto' | number): React.ReactNode {
		// const itemClass = show
		// 	? ''
		// 	: 'display-none';

		const className = this.getItemHeightClass();
		return (
			<img
				ref={this.imageRef}
				crossOrigin='anonymous'
				className={`display-none position-relative kiosk-item-image file-item-container-carousel-group-height ${className}`}
				// width={widthSizeNumber}
				// height={heightSizeNumber}
				onLoad={this.onImageLoadedData}
				// className={'position-absolute top-0 left-0 width100prc file-item-container-carousel-group-height'}
			/>
		);
	}

	/** */
	private getVideo(show: boolean, widthSizeNumber: 'auto' | number, heightSizeNumber: 'auto' | number, url: string): React.ReactNode {
		const itemClass = '';
		// const itemClass = show
		// 	? ''
		// 	: 'display-none';

		const className = this.getItemHeightClass();
		return (
			<video
				controls={true}
				// width={widthSizeNumber}
				// height={heightSizeNumber}
				// controlsList='nodownload'
				preload='metadata'
				// id={file.fullpath}
				onLoadedMetadata={this.onVideoLoadedMetadata}
				onTimeUpdate={this.onVideoTimeUpdate}
				onPlay={this.onPlay}
				ref={this.videoRef}
				crossOrigin='anonymous'
				className={`width100prc file-item-container-carousel-group-height ${itemClass} ${className}`}
				// className={`position-absolute top-0 left-0 width100prc file-item-container-carousel-group-height ${itemClass}`}
				src={url}
			>
				{/* <source
				// type={`video/${file.extension}`}
					src={url}
				/> */}
				{/* <source
				// type={`video/${file.extension}`}
				src={`file://${file.fullpath}`}
			/> */}
				{/* <source type='video/webm' src='http://media.w3.org/2010/05/sintel/trailer.webm' id='webm'></source>
			<source type='video/ogg' src='http://media.w3.org/2010/05/sintel/trailer.ogv' id='ogv'></source> */}
				{/* <p>Your user agent does not support the HTML5 Video element.</p> */}
			</video>
		);
	}

	/** Событие после загрузки данных о видеофайле */
	private readonly onVideoLoadedMetadata = (event: any): void => {
	// private readonly onLoadedMetadata = (event: {target?: {duration?: number; currentTime?: number; };}): void => {
		// console.dir(event);
		// console.dir(event.target?.duration);
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
		// console.dir(event);
		if (this.firstPlay && this.imageRef.current) {
			const middleImage = this.getVideoFrame();
			file.middleImage = middleImage;
			// if (this.props.size !== SizeEnum.carousel
			// 	&& this.props.size !== SizeEnum.column) {
			this.imageRef.current.src = middleImage.data ?? '';
			// } else {
			// 	this.props.file.state = KioskItemStateEnum.Show;
			// }
		}
		file.state = KioskItemStateEnum.Show;
	};

	/** Событие при воспроизведении */
	private readonly onPlay = (event: any): void => {
	// private readonly onPlay = (event: {type?: 'play'; target?: {duration?: number; currentTime?: number; };}): void => {
		// console.dir(event);
		// console.dir(event.target?.duration);
		if (!event.target || !event.type || event.type !== 'play' || !this.firstPlay) {
			return;
		}

		this.firstPlay = false;
		event.target.currentTime = 0;
	};

	/** Получаем кадр из видео */
	private getVideoFrame(): PrintSendingItemModel {
		const video = this.videoRef.current!;
		// const video = event.target;
		const canvas = this.canvasRef.current!;
		canvas.height = video.videoHeight;
		canvas.width = video.videoWidth;
		const context = canvas.getContext('2d');
		// context!.drawImage(video, 0, 0);
		context!.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
		// context!.canvas.toBlob(
		// 	blob => {
		// 		resolve(blob);
		// 	},
		// 	'image/jpeg',
		// 	0.75 /* quality */
		// );
		// image.src = canvas.toBlob();
		// console.log(canvas);
		// image.src = canvas.toDataURL('image/jpeg', 1);
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
		if (!file) {
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
		if (!file) {
			return;
		}
		const value = file.middleImage;
		await onPrintItemClick(event, value);
	};

	/** */
	private readonly onPrintCurrentFrameClick = async (event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
		const { onPrintItemClick } = this.props;
		const value = this.getVideoFrame();
		await onPrintItemClick(event, value);
	};

	/** */
	private readonly onImageLoadedData = (_event: React.SyntheticEvent<HTMLImageElement>): void => {
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
