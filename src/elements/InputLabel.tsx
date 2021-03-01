import { InputLabel as UiInputLabel } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IInputLabelProps {
	/** Содержимое */
	children?: React.ReactNode;

}
/** Кнопка */
export class InputLabel extends React.PureComponent<IInputLabelProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiInputLabel
				{...this.props}
			/>
		);
	}
}
