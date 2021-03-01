import { observer } from 'mobx-react';
import React from 'react';

import { KioskViewFileViewModel } from './KioskViewFileViewModel';

import { Grid } from '../../elements/Grid';
import { UrlHelper } from '../helpers/UrlHelper';

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
}

// @provider(KioskViewController, KioskViewStore)
@observer
/** */
export class KioskViewItem extends React.PureComponent<KioskViewItemProps> {
	/** Первое включение видео */
	private firstPlay = true;
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

		return (
			<Grid
				item
				// key={file.fullpath}
			>
				<div className='padding-12px'>
					<video
						controls={true}
						width={sizeNumber}
						height={sizeNumber}
						// controlsList="nodownload"
						preload="metadata"
						// id={file.fullpath}
						onLoadedMetadata={this.onLoadedMetadata}
						onPlay={this.onPlay}
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
						<p>Your user agent does not support the HTML5 Video element.</p>
					</video>
					{/* <img
						src={file.fullpath}
					/> */}
					<div>
						{file.filename}
					</div>
					{/* {file.fullpath} */}
				</div>
			</Grid>
		);
	}

	/** Событие после загрузки данных о видеофайле */
	private readonly onLoadedMetadata = (event: any): void => {
	// private readonly onLoadedMetadata = (event: {target?: {duration?: number; currentTime?: number; };}): void => {
		// console.dir(event);
		// console.dir(event.target?.duration);
		if (!event.target?.duration) {
			return;
		}

		const middle = event.target.duration / 2;
		event.target.currentTime = middle;
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
