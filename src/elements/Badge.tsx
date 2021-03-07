import { Badge as UiBadge } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IBadgeProps {
	/**
	 * The anchor of the badge.
	 */
	// anchorOrigin?: BadgeOrigin;
	/**
	 * Wrapped shape the badge should overlap.
	 */
	overlap?: 'rectangle' | 'circle';
	/**
	 * The content rendered within the badge.
	 */
	badgeContent?: React.ReactNode;
	/**
	 * The badge will be added relative to this node.
	 */
	children?: React.ReactNode;
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color?: 'primary' | 'secondary' | 'default' | 'error';
	/**
	 * If `true`, the badge will be invisible.
	 */
	invisible?: boolean;
	/**
	 * Max count to show.
	 */
	max?: number;
	/**
	 * Controls whether the badge is hidden when `badgeContent` is zero.
	 */
	showZero?: boolean;
	/**
	 * The variant to use.
	 */
	variant?: 'standard' | 'dot';
}
/** Кнопка */
export class Badge extends React.PureComponent<IBadgeProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiBadge
				{...this.props}
			/>
		);
	}
}
