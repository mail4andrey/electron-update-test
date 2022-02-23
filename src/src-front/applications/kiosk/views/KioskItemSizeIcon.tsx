import { ViewStream } from '@material-ui/icons';
import React from 'react';


import { VideoItemSizeEnum } from './SizeEnum';

import { IconButton } from '../../../../elements/IconButton';
import { ViewCarousel, ViewComfy, ViewModule } from '../../../../elements/Icons';
import { DesignSizeEnum } from './DesignSizeEnum';

/**  */
export interface IKioskItemSizeIcon {
	buttonSize?: DesignSizeEnum;
	iconColor?: string;
	/**  */
	currentSize?: VideoItemSizeEnum;
	/**  */
	onClick: (event: React.MouseEvent<Element, MouseEvent>, newSize: VideoItemSizeEnum) => void;
}
/** Кнопка */
export class KioskItemSizeIcon extends React.PureComponent<IKioskItemSizeIcon> {
	/** Отображение */
	public render(): React.ReactNode {
		const icon = this.getIconCurrentSize(this.props.currentSize);
		return (
			<IconButton
				onClick={this.onClick}
			>
				{icon}
			</IconButton>
		);
	}

	/** */
	private getIconCurrentSize(currentSize?: VideoItemSizeEnum): React.ReactNode {
		switch (currentSize) {
			case VideoItemSizeEnum.medium:
				return (
					<ViewModule
						htmlColor={this.props.iconColor}
						fontSize={this.props.buttonSize}
					/>
				);
			case VideoItemSizeEnum.column:
				return (
					<ViewStream
						htmlColor={this.props.iconColor}
						fontSize={this.props.buttonSize}
					/>
				);
			case VideoItemSizeEnum.carousel:
				return (
					<ViewCarousel
						htmlColor={this.props.iconColor}
						fontSize={this.props.buttonSize}
					/>
				);

			case VideoItemSizeEnum.small:
			default:
				return (
					<ViewComfy
						htmlColor={this.props.iconColor}
						fontSize={this.props.buttonSize}
					/>
				);
		}
	}

	/** */
	private readonly onClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const nextSize = this.getNextSize(this.props.currentSize);
		this.props.onClick(event, nextSize);
	};

	/** */
	private getNextSize(currentSize?: VideoItemSizeEnum): VideoItemSizeEnum {
		switch (currentSize) {
			case VideoItemSizeEnum.small:
				return VideoItemSizeEnum.medium;
			case VideoItemSizeEnum.medium:
				return VideoItemSizeEnum.column;
			case VideoItemSizeEnum.column:
				return VideoItemSizeEnum.carousel;
			case VideoItemSizeEnum.carousel:
				return VideoItemSizeEnum.small;

			default:
				return VideoItemSizeEnum.medium;

		}
	}
}
