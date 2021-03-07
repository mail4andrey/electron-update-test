import { GridListTile as UiGridListTile } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IGridListTileProps {
	/** Содержимое */
	children?: React.ReactNode;
	cols?: number;
	rows?: number;
	// alignContent?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
	// alignItems?: 'flex-start' | 'center' | 'flex-end'| 'stretch' | 'baseline';
	// container?: boolean;
	// item?: boolean;
	// spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	// wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
	// zeroMinWidth?: boolean;
	// /** Направление */
	// direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
	// justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
}
/** Кнопка */
export class GridListTile extends React.PureComponent<IGridListTileProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiGridListTile
				{...this.props}
			/>
		);
	}
}
