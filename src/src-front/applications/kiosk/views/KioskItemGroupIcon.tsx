import React from 'react';


import { GroupByEnum } from './GroupByEnum';

import { IconButton } from '../../../../elements/IconButton';
import { PhotoLibrary, Image } from '../../../../elements/Icons';
import { DesignSizeEnum } from './DesignSizeEnum';


/**  */
export interface IKioskItemGroupIcon {
	buttonSize?: DesignSizeEnum;
	iconColor?: string;
	/** */
	value?: GroupByEnum;
	/** */
	onClick: (event: React.MouseEvent<Element, MouseEvent>, value: GroupByEnum) => void;
}
/** Кнопка */
export class KioskItemGroupIcon extends React.PureComponent<IKioskItemGroupIcon> {
	/** Отображение */
	public render(): React.ReactNode {
		const icon = this.getIcon(this.props.value);
		return (
			<IconButton
				onClick={this.onClick}
			>
				{icon}
			</IconButton>
		);
	}

	/** */
	private getIcon(value?: GroupByEnum): React.ReactNode {
		switch (value) {
			case GroupByEnum.none:
				return (
					<Image
						htmlColor={this.props.iconColor}
						fontSize={this.props.buttonSize}
					/>
				);
			case GroupByEnum.groupByDir:
			default:
				return (
					<PhotoLibrary
						htmlColor={this.props.iconColor}
						fontSize={this.props.buttonSize}
					/>
				);
		}
	}

	/** */
	private readonly onClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const nextValue = this.getNextItem(this.props.value);
		this.props.onClick(event, nextValue);
	};

	/** */
	private getNextItem(value?: GroupByEnum): GroupByEnum {
		switch (value) {
			case GroupByEnum.none:
				return GroupByEnum.groupByDir;
			case GroupByEnum.groupByDir:
				return GroupByEnum.none;

			default:
				return GroupByEnum.none;

		}
	}
}
