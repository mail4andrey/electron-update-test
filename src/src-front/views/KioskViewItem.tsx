import { observer } from 'mobx-react';
import React from 'react';


import { DesignSizeEnum } from './DesignSizeEnum';
import { KioskItemStateEnum } from './KioskItemStateEnum';
import { KioskViewFileViewModel } from './KioskViewFileViewModel';
import { KioskViewItemEventProps } from './KioskViewItemEventProps';
import { LanguageEnum } from './LanguageEnum';
import { VideoItemSizeEnum } from './SizeEnum';

import { Checkbox } from '../../elements/Checkbox';
import { OneLine } from '../../elements/commons/OneLine';
import { RightContainer } from '../../elements/commons/RightContainer';
import { Grid } from '../../elements/Grid';
import { IconButton } from '../../elements/IconButton';
import { CheckBox, CheckBoxOutlineBlank, Mail, Print, PrintTwoTone } from '../../elements/Icons';
import { Skeleton } from '../../elements/Skeleton';
import { Tooltip } from '../../elements/Tooltip';
import { PrintSendingItemModel } from '../../settings/PrintSendingItemModel';
import { UrlHelper } from '../helpers/UrlHelper';
import { KioskLocalization } from '../localization/KioskLocalization';

/** */
export interface KioskViewItemProps {
	language?: LanguageEnum;
	/** */
	backgroundFileCard?: string;
	/** */
	iconColor?: string;

	/** Видеофайл */
	file: KioskViewFileViewModel;

	/** Размер видео */
	size?: VideoItemSizeEnum;

	/** Размер видео */
	buttonSize?: DesignSizeEnum;

	// email?: EmailSettingsModel;

	// onEmailTestSend?: (event: React.MouseEvent<Element, MouseEvent>) => void;

	// onChange?: (event: ITextFieldChangeEventProps, email: EmailSettingsModel) => void;
	onSelect?: (event: React.ChangeEvent<HTMLInputElement>, value: KioskViewItemEventProps) => void;
	onSendClick?: (event: React.MouseEvent<Element, MouseEvent>, value?: string) => void;
	onPrintClick?: (event: React.MouseEvent<Element, MouseEvent>, value?: PrintSendingItemModel) => void;
}

// @provider(KioskViewController, KioskViewStore)
@observer
/** */
export class KioskViewItem extends React.PureComponent<KioskViewItemProps> {
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
		const { file, size, buttonSize, iconColor, language } = this.props;
		if (!file.state
			|| file.state === KioskItemStateEnum.Hide) {
			return null;
		}

		const filename = encodeURI(file.fullpath ?? '');
		const url = UrlHelper.getUrl(`file?name=${filename}`);
		const widthSizeNumber = this.getSize(size);
		const heightSizeNumber = this.getHeightSize(size);
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

		const show = file.state === KioskItemStateEnum.Show;
		const showSkeleton = file.state === KioskItemStateEnum.Loading;
		const skeletonHeight = size === VideoItemSizeEnum.column ? widthSizeNumber / 2 : heightSizeNumber;
		const skeleton = this.getSkeleton(showSkeleton, widthSizeNumber, skeletonHeight);
		const image = this.getImage(show, widthSizeNumber, heightSizeNumber);
		const video = this.getVideo(show, widthSizeNumber, heightSizeNumber, url);

		const hideItem = file.state === KioskItemStateEnum.Initializing;
		const hideItemClass = hideItem ? 'display-none' : '';
		const description = this.getDescription(file);
		const background = this.props.backgroundFileCard ?? 'gray';

		const gridView = !size
			|| size === VideoItemSizeEnum.small
			|| size === VideoItemSizeEnum.medium;
		const topBlock = gridView
			? null
			: (
				<OneLine>
					{checkBox}
					<div
						className='width-560px'
					>
						{description}
					</div>
					<RightContainer>
						{emailIcon}
						{printIcons}
					</RightContainer>
				</OneLine>
			);
		const insideBlock = gridView
			? (
				<div className='grid-tile-bar'>
					<OneLine>
						{checkBox}
						<RightContainer>
							{emailIcon}
							{printIcons}
						</RightContainer>
					</OneLine>
				</div>
			)
			: null;
		const bottomBlock = gridView ? description : null;

		// if (size === VideoItemSizeEnum.small
		// 	|| size === VideoItemSizeEnum.medium) {
		// 	return (
		// 		<Grid
		// 			item
		// 			className={hideItemClass}
		// 		>
		// 			<div
		// 				style={{ background }}
		// 				className='grid-tile'
		// 			>
		// 				<div className='0video 0padding-12px position-relative'>
		// 					{skeleton}
		// 					{image}
		// 					{video}
		// 					<canvas
		// 						style={{ display: 'none' }}
		// 						ref={this.canvasRef}
		// 					/>
		// 				</div>
		// 				{description}
		// 			</div>
		// 		</Grid>
		// 	);
		// }

		return (
			<Grid
				item
				className={hideItemClass}
			>
				<div
					style={{ background }}
					className='grid-tile background-image-top-gray border-radius-3px'
				>
					{topBlock}
					<div className='0video 0padding-12px position-relative'>
						{skeleton}
						{image}
						{video}
						<canvas
							style={{ display: 'none' }}
							ref={this.canvasRef}
						/>
						{insideBlock}
					</div>
					{bottomBlock}
				</div>
			</Grid>
		);
	}

	/**
	 *
	 */
	private getDescription(file: KioskViewFileViewModel): React.ReactNode {
		return (
			<div
				className='padding-left-12px padding-bottom-6px padding-right-12px'
			>
				<div className='grid-tile-bar-title'>
					<div className='grid-tile-bar-title-cut-text'>
						{file.filename}
					</div>
				</div>
				<div
					className='grid-tile-bar-subtitle'
				>
					<OneLine>
						<div>
							{KioskLocalization.fileSizeInMb(file.fileSize)}
						</div>
						<div className='padding-left-12px'>
							{KioskLocalization.fileResolution(this.resolutionWidth, this.resolutionHeight)}
						</div>
					</OneLine>
				</div>
			</div>
		);
	}

	/** */
	private getSkeleton(show: boolean, widthSizeNumber: 'auto' | number, heightSizeNumber: 'auto' | number): React.ReactNode {
		if (!show) {
			return null;
		}

		return (
			<Skeleton
				animation='wave'
				variant='rect'
				width={widthSizeNumber}
				height={heightSizeNumber}
			/>
		);
	}

	/** */
	private getImage(show: boolean, widthSizeNumber: 'auto' | number, heightSizeNumber: 'auto' | number): React.ReactNode {
		const itemClass = show
			? ''
			: 'display-none';

		return (
			<img
				ref={this.imageRef}
				crossOrigin='anonymous'
				className={`position-relative kiosk-item-image width100prc0 height100prc0 ${itemClass}`}
				width={widthSizeNumber}
				height={heightSizeNumber}
				onLoad={this.onImageLoadedData}
			/>
		);
	}

	/** */
	private getVideo(show: boolean, widthSizeNumber: 'auto' | number, heightSizeNumber: 'auto' | number, url: string): React.ReactNode {
		const itemClass = show
			? ''
			: 'display-none';

		return (
			<video
				controls={true}
				width={widthSizeNumber}
				height={heightSizeNumber}
				// controlsList="nodownload"
				preload="metadata"
				// id={file.fullpath}
				onLoadedMetadata={this.onVideoLoadedMetadata}
				onTimeUpdate={this.onVideoTimeUpdate}
				onPlay={this.onPlay}
				ref={this.videoRef}
				crossOrigin='anonymous'
				className={`position-absolute top-0 left-0 ${itemClass}`}
			>
				<source
				// type={`video/${file.extension}`}
					src={url}
				/>
				{/* <source
				// type={`video/${file.extension}`}
				src={`file://${file.fullpath}`}
			/> */}
				{/* <source type="video/webm" src="http://media.w3.org/2010/05/sintel/trailer.webm" id="webm"></source>
			<source type="video/ogg" src="http://media.w3.org/2010/05/sintel/trailer.ogv" id="ogv"></source> */}
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

		this.resolutionWidth = event.target.videoWidth;
		this.resolutionHeight = event.target.videoHeight;
		const middle = event.target.duration / 2;
		event.target.currentTime = middle;
		this.props.file.state = KioskItemStateEnum.Loading;
	};

	/** Событие после загрузки данных о видеофайле */
	private readonly onVideoTimeUpdate = (): void => {
		// console.dir(event);
		if (this.firstPlay && this.imageRef.current) {
			const middleImage = this.getVideoFrame();
			this.props.file.middleImage = middleImage;
			// if (this.props.size !== SizeEnum.carousel
			// 	&& this.props.size !== SizeEnum.column) {
			this.imageRef.current.src = middleImage.data ?? '';
			// } else {
			// 	this.props.file.state = KioskItemStateEnum.Show;
			// }
		}
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
	private getSize(size?: VideoItemSizeEnum): number {
		switch (size) {
			case VideoItemSizeEnum.small:
				return 250;
			case VideoItemSizeEnum.medium:
				return 400;
			case VideoItemSizeEnum.column:
				return 800;
			case VideoItemSizeEnum.carousel:
				return 800;
			default:
				return 250;
		}
	}

	/** */
	private getHeightSize(size?: VideoItemSizeEnum): number | 'auto' {
		switch (size) {
			case VideoItemSizeEnum.small:
				return 250;
			case VideoItemSizeEnum.medium:
				return 400;
			case VideoItemSizeEnum.column:
				return 'auto';
			case VideoItemSizeEnum.carousel:
				return 'auto';
			default:
				return 250;
		}
	}

	/** */
	private readonly onSelect = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		const { onSelect } = this.props;
		if (onSelect) {
			const value = {
				checked,
				id: this.props.file.fullpath,
				dirname: this.props.file.dirname
			} as KioskViewItemEventProps;
			onSelect(event, value);
		}
	};

	/** */
	private readonly onSendClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const { onSendClick } = this.props;
		if (onSendClick) {
			const value = this.props.file.fullpath;
			onSendClick(event, value);
		}
	};

	/** */
	private readonly onPrintMiddleFrameClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const { onPrintClick } = this.props;
		if (onPrintClick) {
			const value = this.props.file.middleImage;
			onPrintClick(event, value);
		}
	};

	/** */
	private readonly onPrintCurrentFrameClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const { onPrintClick } = this.props;
		if (onPrintClick) {
			const value = this.getVideoFrame();
			onPrintClick(event, value);
		}
	};

	/** */
	private readonly onImageLoadedData = (_event: React.SyntheticEvent<HTMLImageElement>): void => {
		this.props.file.state = KioskItemStateEnum.Show;
	};


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
