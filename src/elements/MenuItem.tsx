import { MenuItem as UiMenuItem } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IMenuItemProps {
	value?: string | ReadonlyArray<string> | number;
		// value?: string;
}
/** Кнопка */
export class MenuItem extends React.PureComponent<IMenuItemProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiMenuItem
				{...this.props}
			/>
		);
	}
}
