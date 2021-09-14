
import {AccordionSummary as UiAccordionSummary} from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IAccordionSummaryProps {
	/**
	 * The content of the accordion summary.
	 */
	children?: React.ReactNode;
	className?: string;
	/**
	 * The icon to display as the expand indicator.
	 */
	expandIcon?: React.ReactNode;
}
/** Кнопка */
export class AccordionSummary extends React.PureComponent<IAccordionSummaryProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiAccordionSummary
				{...this.props}
			/>
		);
	}
}
