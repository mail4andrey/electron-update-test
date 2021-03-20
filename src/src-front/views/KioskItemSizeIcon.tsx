import { ViewStream } from '@material-ui/icons';
import React from 'react';


import { VideoItemSizeEnum } from './SizeEnum';

import { IconButton } from '../../elements/IconButton';
import { ViewCarousel, ViewComfy, ViewModule } from '../../elements/Icons';

/**  */
export interface IKioskItemSizeIcon {
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
				size='small'
				onClick={this.onClick}
			>
				{icon}
			</IconButton>
		);
	}

	/** */
	private getIconCurrentSize(currentSize?: VideoItemSizeEnum): React.ReactNode {
		switch (currentSize) {
			case VideoItemSizeEnum.small:
				return <ViewComfy/>;
			case VideoItemSizeEnum.medium:
				return <ViewModule/>;
			case VideoItemSizeEnum.column:
				return <ViewStream/>;
			case VideoItemSizeEnum.carousel:
				return <ViewCarousel/>;

			default:
				return <ViewComfy/>;
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
