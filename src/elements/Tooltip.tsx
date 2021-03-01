import { Tooltip as UiTooltip } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface ITooltipProps {
	/** Содержимое */
	children: React.ReactElement;

	/** Тип кнопки */
	title: string;
}
/** Кнопка */
export class Tooltip extends React.PureComponent<ITooltipProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiTooltip
				{...this.props}
			/>
		);
	}
}
