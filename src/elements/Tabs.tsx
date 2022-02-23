import { Tabs as UiTabs } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface ITabsProps {
	/**
	 * The label for the Tabs as a string.
	 */
	'aria-label'?: string;
	/**
	 * An id or list of ids separated by a space that label the Tabs.
	 */
	'aria-labelledby'?: string;
	/**
	 * If `true`, the tabs will be centered.
	 * This property is intended for large views.
	 */
	centered?: boolean;
	/**
	 * The content of the component.
	 */
	children?: React.ReactNode;
	/**
	 * Determines the color of the indicator.
	 */
	indicatorColor?: 'secondary' | 'primary';
	/**
	 * Callback fired when the value changes.
	 *
	 * @param {object} event The event source of the callback
	 * @param {any} value We default to the index of the child (number)
	 */
	onChange?: (event: React.ChangeEvent<unknown>, value: any) => void;
	/**
	 * The tabs orientation (layout flow direction).
	 */
	orientation?: 'horizontal' | 'vertical';
	/**
	 * Determine behavior of scroll buttons when tabs are set to scroll:
	 *
	 * - `auto` will only present them when not all the items are visible.
	 * - `desktop` will only present them on medium and larger viewports.
	 * - `on` will always present them.
	 * - `off` will never present them.
	 */
	scrollButtons?: 'auto' | 'desktop' | 'on' | 'off';
	/**
	 * If `true` the selected tab changes on focus. Otherwise it only
	 * changes on activation.
	 */
	selectionFollowsFocus?: boolean;
	/**
	 * Determines the color of the `Tab`.
	 */
	textColor?: 'secondary' | 'primary' | 'inherit';
	/**
	 * The value of the currently selected `Tab`.
	 * If you don't want any selected `Tab`, you can set this property to `false`.
	 */
	value?: any;
	/**
	 *  Determines additional display behavior of the tabs:
	 *
	 *  - `scrollable` will invoke scrolling properties and allow for horizontally
	 *  scrolling (or swiping) of the tab bar.
	 *  -`fullWidth` will make the tabs grow to use all the available space,
	 *  which should be used for small views, like on mobile.
	 *  - `standard` will render the default state.
	 */
	variant?: 'standard' | 'scrollable' | 'fullWidth';
	className?: string;
}

/** Кнопка */
export class Tabs extends React.PureComponent<ITabsProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiTabs
				{...this.props}
			/>
		);
	}
}
