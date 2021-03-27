import { Toolbar as UiToolbar } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IToolbarProps {
	variant?: 'regular' | 'dense';

	/** Содержимое */
	children?: React.ReactNode;
}
/** Кнопка */
export class Toolbar extends React.PureComponent<IToolbarProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiToolbar
				{...this.props}
			/>
		);
	}
}
