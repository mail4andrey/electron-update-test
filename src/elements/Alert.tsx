import { Alert as UiAlert } from '@material-ui/lab';
import React from 'react';

/** Свойства кнопки */
export interface IAlertProps {
	/**
	 * The action to display. It renders after the message, at the end of the alert.
	 */
	action?: React.ReactNode;
	/**
	 * Override the default label for the *close popup* icon button.
	 *
	 * For localization purposes, you can use the provided [translations](/guides/localization/).
	 */
	closeText?: string;
	/**
	 * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
	 */
	// color?: Color;
	/**
	 * The severity of the alert. This defines the color and icon used.
	 */
	// severity?: Color;
	/**
	 * Override the icon displayed before the children.
	 * Unless provided, the icon is mapped to the value of the `severity` prop.
	 */
	icon?: React.ReactNode | false;
	/**
	 * The ARIA role attribute of the element.
	 */
	role?: string;
	/**
	 * The component maps the `severity` prop to a range of different icons,
	 * for instance success to `<SuccessOutlined>`.
	 * If you wish to change this mapping, you can provide your own.
	 * Alternatively, you can use the `icon` prop to override the icon displayed.
	 */
	// iconMapping?: Partial<Record<Color, React.ReactNode>>;
	/**
	 * Callback fired when the component requests to be closed.
	 * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
	 *
	 * @param {object} event The event source of the callback.
	 */
	onClose?: (event: React.SyntheticEvent) => void;
	/**
	 * The variant to use.
	 */
	variant?: 'standard' | 'filled' | 'outlined';
}
/** Кнопка */
export class Alert extends React.PureComponent<IAlertProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiAlert
				{...this.props}
			/>
		);
	}
}
