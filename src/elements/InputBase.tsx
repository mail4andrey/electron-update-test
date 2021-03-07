import { InputBase as UiInputBase } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IInputBaseProps {
	/**
	 * The short hint displayed in the input before the user enters a value.
	 */
	placeholder?: string;
}
/** Кнопка */
export class InputBase extends React.PureComponent<IInputBaseProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiInputBase
				{...this.props}
			/>
		);
	}
}
