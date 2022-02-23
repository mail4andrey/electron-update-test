import { ListSubheader as UiListSubheader } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IListSubheaderProps {
	/** Содержимое */
	children?: React.ReactNode;
}
/** Кнопка */
export class ListSubheader extends React.PureComponent<IListSubheaderProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiListSubheader
				{...this.props}
			/>
		);
	}
}
