import { GridList as UiGridList } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IGridListProps {
	/** Содержимое */
	children?: React.ReactNode;
	cellHeight?: number | 'auto';
	cols?: number;
	spacing?: number;
}
/** Кнопка */
export class GridList extends React.PureComponent<IGridListProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiGridList
				{...this.props}
			/>
		);
	}
}
