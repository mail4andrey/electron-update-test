import React from 'react';

import { IconButton } from '../../../../elements/IconButton';
import { FormatSize } from '../../../../elements/Icons';
import { DesignSizeEnum } from './DesignSizeEnum';


/**  */
export interface IKioskIconsSizeIcon {
	buttonSize?: DesignSizeEnum;
	iconColor?: string;
	/** */
	value?: DesignSizeEnum;
	/** */
	onClick: (event: React.MouseEvent<Element, MouseEvent>, value: DesignSizeEnum) => void;
}
/** Кнопка */
export class KioskIconsSizeIcon extends React.PureComponent<IKioskIconsSizeIcon> {
	/** Отображение */
	public render(): React.ReactNode {
		const icon = this.getIcon(this.props.value);
		return (
			<IconButton
				// size='small'
				onClick={this.onClick}
			>
				{icon}
			</IconButton>
		);
	}

	/** */
	private getIcon(_value?: DesignSizeEnum): React.ReactNode {
		return (
			<FormatSize
				htmlColor={this.props.iconColor}
				fontSize={this.props.buttonSize}
			/>
		);
	}

	/** */
	private readonly onClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const nextValue = this.getNextItem(this.props.value);
		this.props.onClick(event, nextValue);
	};

	/** */
	private getNextItem(value?: DesignSizeEnum): DesignSizeEnum {
		switch (value) {
			case DesignSizeEnum.small:
				return DesignSizeEnum.medium;
			case DesignSizeEnum.medium:
				return DesignSizeEnum.large;
			case DesignSizeEnum.large:
				return DesignSizeEnum.small;

			default:
				return DesignSizeEnum.large;

		}
	}
}
