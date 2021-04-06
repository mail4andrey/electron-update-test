import { PropTypes, Typography as UiTypography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import React from 'react';

/** Свойства кнопки */
export interface ITypographyProps {
	className?: string;
	align?: PropTypes.Alignment;
	/**
	 * The content of the component.
	 */
	children?: React.ReactNode;
	color?:
	| 'initial'
	| 'inherit'
	| 'primary'
	| 'secondary'
	| 'textPrimary'
	| 'textSecondary'
	| 'error';
	display?: 'initial' | 'block' | 'inline';
	gutterBottom?: boolean;
	noWrap?: boolean;
	paragraph?: boolean;
	variant?: Variant | 'inherit';
	variantMapping?: Partial<Record<Variant, string>>;
}
/** Кнопка */
export class Typography extends React.PureComponent<ITypographyProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiTypography
				{...this.props}
			/>
		);
	}
}
