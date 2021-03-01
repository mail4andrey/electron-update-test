import { Link as UiLink } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface ILinkProps {
	/** Содержимое */
	children?: React.ReactNode;

	color?: 'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';

	/** Тип кнопок */
	component?: React.ElementType;

	/** Тип */
	underline?: 'none' | 'hover' | 'always';
}
/** Кнопка */
export class Link extends React.PureComponent<ILinkProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiLink
				{...this.props}
			/>
		);
	}
}
