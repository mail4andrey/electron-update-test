import { InputAdornment as UiInputAdornment } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IInputAdornmentProps {
	/** Содержимое */
	children?: React.ReactNode;
	/** Тип */
	variant?: 'standard' | 'outlined' | 'filled';
	disablePointerEvents?: boolean;
	disableTypography?: boolean;
	position: 'start' | 'end';
	component?: React.ElementType;
}
/** Кнопка */
export class InputAdornment extends React.PureComponent<IInputAdornmentProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiInputAdornment
				{...this.props}
			/>
		);
	}
}
