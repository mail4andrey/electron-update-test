import { IconButton as UiIconButton } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IIconButtonProps {
	/** Содержимое */
	children?: React.ReactNode;

	/** Тип кнопки */
	color?: 'default' | 'inherit' | 'primary' | 'secondary';
	size?: 'medium' | 'small';
	edge?: 'end' | 'start' | false;
	className?: string;
	disabled?: boolean;
	disableRipple?: boolean;
	disableFocusRipple?: boolean;

	/** Событие при нажатии на кнопку */
	// onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
}
/** Кнопка */
export class IconButton extends React.PureComponent<IIconButtonProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiIconButton
				{...this.props}
			/>
		);
	}
}
