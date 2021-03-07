import { AppBar as UiAppBar } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IAppBarProps {
	/** Содержимое */
	children?: React.ReactNode;
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color?: 'inherit' | 'primary' | 'secondary' | 'default' | 'transparent';
	/**
	 * The positioning type. The behavior of the different options is described
	 * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
	 * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
	 */
	position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}
/** Кнопка */
export class AppBar extends React.PureComponent<IAppBarProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiAppBar
				{...this.props}
			/>
		);
	}
}
