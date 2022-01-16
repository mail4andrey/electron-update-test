import { Divider as UiDivider } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IDividerProps {
}
/** Кнопка */
export class Divider extends React.PureComponent<IDividerProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiDivider
				{...this.props}
			/>
		);
	}
}
