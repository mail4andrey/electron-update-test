import { Checkbox as UiCheckbox } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface ICheckboxProps {
	/** Содержимое */
	// children?: React.ReactNode;
	/**
	 * If `true`, the component is checked.
	 */
	checked?: boolean;
	/**
	 * The icon to display when the component is checked.
	 */
	checkedIcon?: React.ReactNode;
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color?: 'primary' | 'secondary' | 'default';
	/**
	 * If `true`, the checkbox will be disabled.
	 */
	disabled?: boolean;
	/**
	 * If `true`, the ripple effect will be disabled.
	 */
	// disableRipple?: SwitchBaseProps['disableRipple'];
	/**
	 * The icon to display when the component is unchecked.
	 */
	icon?: React.ReactNode;
	/**
	 * The id of the `input` element.
	 */
	// id?: SwitchBaseProps['id'];
	/**
	 * If `true`, the component appears indeterminate.
	 * This does not set the native input element to indeterminate due
	 * to inconsistent behavior across browsers.
	 * However, we set a `data-indeterminate` attribute on the input.
	 */
	indeterminate?: boolean;
	/**
	 * The icon to display when the component is indeterminate.
	 */
	indeterminateIcon?: React.ReactNode;
	/**
	 * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
	 */
	// inputProps?: SwitchBaseProps['inputProps'];
	/**
	 * Pass a ref to the `input` element.
	 */
	inputRef?: React.Ref<HTMLInputElement>;
	/**
	 * Callback fired when the state is changed.
	 *
	 * @param {object} event The event source of the callback.
	 * You can pull out the new checked state by accessing `event.target.checked` (boolean).
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	/**
	 * If `true`, the `input` element will be required.
	 */
	required?: boolean;
	/**
	 * The size of the checkbox.
	 * `small` is equivalent to the dense checkbox styling.
	 */
	size?: 'small' | 'medium';
	/**
	 * The value of the component. The DOM API casts this to a string.
	 * The browser uses "on" as the default value.
	 */
	value?: any;

}
/** Кнопка */
export class Checkbox extends React.PureComponent<ICheckboxProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiCheckbox
				{...this.props}
			/>
		);
	}
}
