import { ButtonGroup as UiButtonGroup } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IButtonGroupProps {
	/** Содержимое */
	children?: React.ReactNode;

	/** Тип кнопок */
	color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;

	/** Тип */
	variant?: 'text' | 'outlined' | 'contained';
}
/** Кнопка */
export class ButtonGroup extends React.PureComponent<IButtonGroupProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiButtonGroup
				{...this.props}
			/>
		);
	}
}
