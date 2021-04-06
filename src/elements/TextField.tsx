import { TextField as UiTextField } from '@material-ui/core';
import React from 'react';

export interface ITextFieldChangeEventProps {
	target: {
		value: string;
	};
}

/** Свойства кнопки */
export interface ITextFieldProps {
	/** Описание */
	label?: string;

	/** Обязательное поле */
	required?: boolean;

	// /** Элементы вначале */
	// startAdornment?: React.ReactNode;

	// /** Элементы вконце */
	// endAdornment?: React.ReactNode;

	/** Дизайн ввода */
	variant?: 'filled' | 'outlined';

	/** event.target.value (string) */
	onChange?: (event: ITextFieldChangeEventProps) => void;

	value?: React.ReactNode;
	defaultValue?: React.ReactNode;
	placeholder?: string;
	autoComplete?: string;
	InputProps?: object;
	fullWidth?: boolean;

	// /** Тип кнопки */
	// color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;

	// /** Тип */
	// variant?: 'text' | 'outlined' | 'contained';

	// /** Событие при нажатии на кнопку */
	// onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	helperText?: React.ReactNode;
}
/** Кнопка */
export class TextField extends React.PureComponent<ITextFieldProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiTextField
				{...this.props}
				// size='large'
			/>
		);
	}
}
