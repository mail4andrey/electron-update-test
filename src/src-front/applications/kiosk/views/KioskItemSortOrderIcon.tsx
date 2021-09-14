import React from 'react';


import { SortOrderEnum } from './SortOrderEnum';

import { IconButton } from '../../../../elements/IconButton';
import { Sort } from '../../../../elements/Icons';
import { DesignSizeEnum } from './DesignSizeEnum';

/**  */
export interface IKioskItemSortOrderIcon {
	buttonSize?: DesignSizeEnum;
	iconColor?: string;
	/**  */
	sortOrder?: SortOrderEnum;
	/**  */
	onClick: (event: React.MouseEvent<Element, MouseEvent>, newOrder: SortOrderEnum) => void;
}
/** Кнопка */
export class KioskItemSortOrderIcon extends React.PureComponent<IKioskItemSortOrderIcon> {
	/** Отображение */
	public render(): React.ReactNode {
		const icon = this.getIcon(this.props.sortOrder);
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
	private getIcon(value?: SortOrderEnum): React.ReactNode {
		switch (value) {
			case SortOrderEnum.desc:
				return (
					<Sort
						htmlColor={this.props.iconColor}
						fontSize={this.props.buttonSize}
					/>
				);

			case SortOrderEnum.asc:
			default:
				return (
					<Sort
						className='transform-rotate-180deg'
						htmlColor={this.props.iconColor}
						fontSize={this.props.buttonSize}
					/>
				);
		}
	}

	/** */
	private readonly onClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const nextSortOrder = this.getNextItem(this.props.sortOrder);
		this.props.onClick(event, nextSortOrder);
	};

	/** */
	private getNextItem(value?: SortOrderEnum): SortOrderEnum {
		switch (value) {
			case SortOrderEnum.asc:
				return SortOrderEnum.desc;
			case SortOrderEnum.desc:
				return SortOrderEnum.asc;

			default:
				return SortOrderEnum.desc;

		}
	}
}
