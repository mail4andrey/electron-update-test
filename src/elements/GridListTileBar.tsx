import { GridListTileBar as UiGridListTileBar } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IGridListTileBarProps {
	className?: string;
	/**
	 * An IconButton element to be used as secondary action target
	 * (primary action target is the tile itself).
	 */
	actionIcon?: React.ReactNode;
	/**
	 * Position of secondary action IconButton.
	 */
	actionPosition?: 'left' | 'right';
	/**
	 * String or element serving as subtitle (support text).
	 */
	subtitle?: React.ReactNode;
	/**
	 * Title to be displayed on tile.
	 */
	title?: React.ReactNode;
	/**
	 * Position of the title bar.
	 */
	titlePosition?: 'top' | 'bottom';
}
/** Кнопка */
export class GridListTileBar extends React.PureComponent<IGridListTileBarProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiGridListTileBar
				{...this.props}
			/>
		);
	}
}
