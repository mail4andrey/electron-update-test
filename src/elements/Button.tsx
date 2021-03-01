import { Button as UiButton } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IButtonProps {
	/** Содержимое */
	children?: React.ReactNode;

	/** Тип кнопки */
	color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;

	/** Тип */
	variant?: 'text' | 'outlined' | 'contained';

	/** Событие при нажатии на кнопку */
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	size?: 'large' | 'medium' | 'small';
}
/** Кнопка */
export class Button extends React.PureComponent<IButtonProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiButton
				{...this.props}
			/>
		);
	}
}
