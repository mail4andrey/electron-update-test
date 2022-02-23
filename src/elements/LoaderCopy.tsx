import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

import { EventListener } from './core/EventListener';

/** Свойства кнопки */
export interface ILoaderProps {
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color?: 'primary' | 'secondary' | 'inherit';
	/**
	 * If `true`, the shrink animation is disabled.
	 * This only works if variant is `indeterminate`.
	 */
	disableShrink?: boolean;
	/**
	 * The size of the circle.
	 * If using a number, the pixel unit is assumed.
	 * If using a string, you need to provide the CSS unit, e.g '3rem'.
	 */
	size?: number | string;
	/**
	 * The thickness of the circle.
	 */
	thickness?: number;
	/**
	 * The value of the progress indicator for the determinate and static variants.
	 * Value between 0 and 100.
	 */
	value?: number;
	/**
	 * The variant to use.
	 * Use indeterminate when there is no progress value.
	 */
	variant?: 'determinate' | 'indeterminate' | 'static';

	/** Центрировать по вертикали */
	verticalCentered?: boolean;
}

/** */
export class LoaderCopy extends React.PureComponent<ILoaderProps> {

	/** Отображение */
	public render(): React.ReactNode {
		const { verticalCentered, ...otherProps } = this.props;
		const classPosition = verticalCentered ? 'vertical-center' : 'centered-container';
		return (
			<div
				className='position-relative'
			>
				<div
					className={`width40px ${classPosition}`}
				>
					<CircularProgress {...otherProps} />
				</div>
			</div>
		);
	}
}
