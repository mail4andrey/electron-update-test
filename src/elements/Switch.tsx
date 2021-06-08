
import { Switch as UiSwitch } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface ISwitchProps {
	/**
	 * The icon to display when the component is checked.
	 */
	checkedIcon?: React.ReactNode;
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color?: 'primary' | 'secondary' | 'default';
	/**
	 * If `true`, the switch will be disabled.
	 */
	disabled?: boolean;
	/**
	 * The icon to display when the component is unchecked.
	 */
	icon?: React.ReactNode;
	/**
	 * The size of the switch.
	 * `small` is equivalent to the dense switch styling.
	 */
	size?: 'small' | 'medium';
	/**
	 * The value of the component. The DOM API casts this to a string.
	 * The browser uses "on" as the default value.
	 */
	value?: unknown;
	autoFocus?: boolean;
	/**
	 * If `true`, the component is checked.
	 */
	checked?: boolean;
	defaultChecked?: boolean;
	/**
	 * If `true`, the ripple effect will be disabled.
	 */
	disableRipple?: boolean;
	/**
	 * The id of the `input` element.
	 */
	id?: string;
	/**
	 * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
	 */
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	/**
	 * Pass a ref to the `input` element.
	 */
	inputRef?: React.Ref<any>;
	/**
	 * Name attribute of the `input` element.
	 */
	name?: string;
	/**
	 * Callback fired when the state is changed.
	 *
	 * @param {object} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.value` (string).
	 * You can pull out the new checked state by accessing `event.target.checked` (boolean).
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	readOnly?: boolean;
	/**
	 * If `true`, the `input` element will be required.
	 */
	required?: boolean;
	tabIndex?: number;
	type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
}
/** Кнопка */
export class Switch extends React.PureComponent<ISwitchProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiSwitch
				{...this.props}
			/>
		);
	}
}
