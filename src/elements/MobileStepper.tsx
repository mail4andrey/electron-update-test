import { MobileStepper as UiMobileStepper } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IMobileStepperProps {
	/**
	 * Set the active step (zero based index).
	 * Defines which dot is highlighted when the variant is 'dots'.
	 */
	activeStep?: number;
	/**
	 * A back button element. For instance, it can be a `Button` or an `IconButton`.
	 */
	backButton: React.ReactNode;
	/**
	 * Props applied to the `LinearProgress` element.
	 */
	//    LinearProgressProps?: Partial<LinearProgressProps>;
	/**
	 * A next button element. For instance, it can be a `Button` or an `IconButton`.
	 */
	nextButton: React.ReactNode;
	/**
	 * Set the positioning type.
	 */
	position?: 'bottom' | 'top' | 'static';
	/**
	 * The total steps.
	 */
	steps: number;
	/**
	 * The variant to use.
	 */
	variant?: 'text' | 'dots' | 'progress';
}
/** Кнопка */
export class MobileStepper extends React.PureComponent<IMobileStepperProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiMobileStepper
				{...this.props}
			/>
		);
	}
}
