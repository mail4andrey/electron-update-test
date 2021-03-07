import { observer } from 'mobx-react';
import React, { CanvasHTMLAttributes, LiHTMLAttributes, VideoHTMLAttributes } from 'react';


import { KioskViewFileViewModel } from './KioskViewFileViewModel';
import { KioskViewItemEventProps } from './KioskViewItemEventProps';

import { Checkbox } from '../../elements/Checkbox';
import { GridListTile } from '../../elements/GridListTile';
import { GridListTileBar } from '../../elements/GridListTileBar';
import { IconButton } from '../../elements/IconButton';
import { Mail, Print, PrintTwoTone } from '../../elements/Icons';
import { OneLine } from '../../elements/ommons/OneLine';
import { RightContainer } from '../../elements/ommons/RightContainer';
import { Tooltip } from '../../elements/Tooltip';
import { UrlHelper } from '../helpers/UrlHelper';
import { KioskLocalization } from '../localization/KioskLocalization';

export enum Size {
	small = 'small',
	medium='medium',
	large='large',
	extralarge='extralarge'
}
/** */
export interface KioskViewItemProps {
	/** Видеофайл */
	file: KioskViewFileViewModel;

	/** Размер видео */
	size?: Size;
	// email?: EmailSettingsModel;

	// onEmailTestSend?: (event: React.MouseEvent<Element, MouseEvent>) => void;

	// onChange?: (event: ITextFieldChangeEventProps, email: EmailSettingsModel) => void;
	onSelect?: (event: React.ChangeEvent<HTMLInputElement>, value: KioskViewItemEventProps) => void;
	onSendClick?: (event: React.MouseEvent<Element, MouseEvent>, value?: string) => void;
	onPrintClick?: (event: React.MouseEvent<Element, MouseEvent>, value?: string) => void;
}

// @provider(KioskViewController, KioskViewStore)
@observer
/** */
export class KioskViewItem extends React.PureComponent<KioskViewItemProps> {
	/** Первое включение видео */
	private firstPlay = true;

	/** Средний кадр видео в base64 */
	private middleImage?: string;

	/** */
	private readonly videoRef = React.createRef<HTMLVideoElement>();

	/** */
	private readonly canvasRef = React.createRef<HTMLCanvasElement>();

	/** */
	// private readonly imageRef = React.createRef<HTMLImageElement>();
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
		const { file, size } = this.props;
		const filename = encodeURI(file.fullpath ?? '');
		const url = UrlHelper.getUrl(`file?name=${filename}`);
		const sizeNumber = this.getSize(size);
		const emailIcon = (
			<IconButton
				aria-label={`send ${file.filename}`}
				className='icon'
				onClick={this.onSendClick}
			>
				<Mail />
			</IconButton>
		);
		const printIcons = (
			<>
				<Tooltip title={KioskLocalization.printMiddleFrame}>
					<IconButton
						aria-label={`print ${file.filename}` }
						className='icon'
						onClick={this.onPrintMiddleFrameClick}
					>
						<Print />
					</IconButton></Tooltip>
				<Tooltip title={KioskLocalization.printCurrentFrame}>
					<IconButton
						aria-label={`print ${file.filename}` }
						className='icon'
						onClick={this.onPrintCurrentFrameClick}
					>
						<PrintTwoTone />
					</IconButton>
				</Tooltip>
			</>
		);
		const checkBox = (
			<Checkbox
				checked={file.isSelected}
				onChange={this.onSelect}
				color='secondary'
			/>
		);
		return (
			// <Grid
			// 	item
			// key={file.fullpath}
			// >
			// <GridListTile
			// 	cols={cols}
			// 	rows={cols}
			// >
			<div className='grid-tile background-gray'>
				<div className='0video 0padding-12px'>
					<video
						controls={true}
						width={sizeNumber}
						height={sizeNumber}
						// controlsList="nodownload"
						preload="metadata"
						// id={file.fullpath}
						onLoadedMetadata={this.onVideoLoadedMetadata}
						onTimeUpdate={this.onVideoTimeUpdate}
						onPlay={this.onPlay}
						ref={this.videoRef}
						crossOrigin='anonymous'
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
					<canvas
						style={{ display: 'none' }}
						ref={this.canvasRef}
					/>
					{/* <img
						ref={this.imageRef}
						crossOrigin='anonymous'
					/> */}
					{/* <img
						src={file.fullpath}
					/> */}
					{/* <div>
						{file.filename}
					</div> */}
					{/* {file.fullpath} */}
					<div className='grid-tile-bar'>
						<OneLine>
							{checkBox}
							<RightContainer>
								{emailIcon}
								{printIcons}
							</RightContainer>
						</OneLine>
					</div>
				</div>
				<div className='grid-tile-bar-title padding-left-12px padding-bottom-6px'>
					{file.filename}
				</div>
				{/* <div className='grid-tile-bar-subtitle padding-left-12px padding-bottom-6px'>
					{file.dirname}
				</div> */}
				<div className='grid-tile-bar-subtitle padding-left-12px padding-bottom-6px'>
					{KioskLocalization.fileSizeInMb(file.fileSize)}
				</div>
				{/* <GridListTileBar
					titlePosition="top"
					title={checkBox}
					subtitle={<span>{file.dirname}</span>}
					className='titleBar-top'
					actionIcon={(
						<OneLine>
							{emailIcon}
							{printIcon}
						</OneLine>
					)}
				/> */}
				{/* <GridListTileBar
					title={file.filename}
					subtitle={<span>{file.dirname}</span>}
					className='titleBar-bottom'
				/> */}
				{/* </GridListTile> */}
			</div>
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

		const middle = event.target.duration / 2;
		event.target.currentTime = middle;
	};

	/** Событие после загрузки данных о видеофайле */
	private readonly onVideoTimeUpdate = (event: any): void => {
		// console.dir(event);
		if (this.firstPlay) {
			this.middleImage = this.getVideoFrame();
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
	private getVideoFrame(): string {
		const video = this.videoRef.current!;
		// const video = event.target;
		const canvas = this.canvasRef.current!;
		// const image = this.imageRef.current!;
		canvas.height = Number(video.videoHeight);
		canvas.width = Number(video.videoWidth);
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
		return canvas.toDataURL('image/jpeg', 1);
	}

	/** */
	private getSize(size?: Size): number {
		switch (size) {
			case Size.small:
				return 250;
			case Size.large:
				return 400;
			case Size.extralarge:
				return 600;
			case Size.medium:
			default:
				return 250;
		}
	}

	/** */
	private readonly onSelect = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		const { onSelect } = this.props;
		if (onSelect) {
			const value = { checked, id: this.props.file.fullpath } as KioskViewItemEventProps;
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
			const value = this.middleImage;
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
	private readonly onPrintCurrentClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const { onPrintClick } = this.props;
		if (onPrintClick) {
			const value = this.middleImage;
			onPrintClick(event, value);
		}
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
