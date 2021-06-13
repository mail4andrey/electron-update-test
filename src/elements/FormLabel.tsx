import { FormLabel as UiFormLabel } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IFormLabelProps {
	/**
	 * The content of the component.
	 */
	children?: React.ReactNode;
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color?: 'primary' | 'secondary';
	/**
	 * If `true`, the label should be displayed in a disabled state.
	 */
	disabled?: boolean;
	/**
	 * If `true`, the label should be displayed in an error state.
	 */
	error?: boolean;
	/**
	 * If `true`, the label should use filled classes key.
	 */
	filled?: boolean;
	/**
	 * If `true`, the input of this label is focused (used by `FormGroup` components).
	 */
	focused?: boolean;
	/**
	 * If `true`, the label will indicate that the input is required.
	 */
	required?: boolean;

	component?: React.ElementType;
}
/** Кнопка */
export class FormLabel extends React.PureComponent<IFormLabelProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiFormLabel
				{...this.props}
			/>
		);
	}
}
