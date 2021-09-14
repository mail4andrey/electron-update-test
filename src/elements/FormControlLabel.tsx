import { FormControlLabel as UiFormControlLabel } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IFormControlLabelProps {
	className?: string;

	/**
	 * If `true`, the component appears selected.
	 */
	checked?: boolean;
	/**
	 * A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`.
	 */
	control: React.ReactElement<any, any>;
	/**
	 * If `true`, the control will be disabled.
	 */
	disabled?: boolean;
	/**
	 * Pass a ref to the `input` element.
	 */
	// inputRef?: React.Ref<any>;
	/**
	 * The text to be used in an enclosing label element.
	 */
	label: React.ReactNode;
	/**
	 * The position of the label.
	 */
	labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
	name?: string;
	/**
	 * Callback fired when the state is changed.
	 *
	 * @param {object} event The event source of the callback.
	 * You can pull out the new checked state by accessing `event.target.checked` (boolean).
	 */
	onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
	/**
	 * The value of the component.
	 */
	value?: unknown;
}
/** Кнопка */
export class FormControlLabel extends React.PureComponent<IFormControlLabelProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiFormControlLabel
				{...this.props}
			/>
		);
	}
}
