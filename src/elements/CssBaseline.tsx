import { CssBaseline as UiCssBaseline } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface ICssBaselineProps {
	/** Содержимое */
	children?: React.ReactNode;
}
/** Кнопка */
export class CssBaseline extends React.PureComponent<ICssBaselineProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiCssBaseline
				{...this.props}
			/>
		);
	}
}
