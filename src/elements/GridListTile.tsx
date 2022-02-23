import { GridListTile as UiGridListTile } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IGridListTileProps {
	/** Содержимое */
	children?: React.ReactNode;
	cols?: number;
	rows?: number;
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
