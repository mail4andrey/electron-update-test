import { InputLabel as UiInputLabel } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IInputLabelProps {
	id?: string;
	/**
	 * The contents of the `InputLabel`.
	 */
	children?: React.ReactNode;
	// color?: FormLabelProps['color'];
	/**
	 * If `true`, the transition animation is disabled.
	 */
	disableAnimation?: boolean;
	/**
	 * If `true`, apply disabled class.
	 */
	disabled?: boolean;
	/**
	 * If `true`, the label will be displayed in an error state.
	 */
	error?: boolean;
	/**
	 * If `true`, the input of this label is focused.
	 */
	focused?: boolean;
	/**
	 * If `dense`, will adjust vertical spacing. This is normally obtained via context from
	 * FormControl.
	 */
	margin?: 'dense';
	/**
	 * if `true`, the label will indicate that the input is required.
	 */
	required?: boolean;
	/**
	 * If `true`, the label is shrunk.
	 */
	shrink?: boolean;
	/**
	 * The variant to use.
	 */
	variant?: 'standard' | 'outlined' | 'filled';

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
