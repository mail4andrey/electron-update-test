import { FormControl as UiFormControl } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IFormControlProps {
	/** Содержимое */
	children?: React.ReactNode;

	/** Тип */
	variant?: 'filled' | 'outlined' | 'standard';

	fullWidth?: boolean;
	margin?: 'dense' | 'none' | 'normal';

	className?: string;
}
/** Кнопка */
export class FormControl extends React.PureComponent<IFormControlProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiFormControl
				{...this.props}
			/>
		);
	}
}
