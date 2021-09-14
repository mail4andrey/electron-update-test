
import {AccordionDetails as UiAccordionDetails} from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IAccordionDetailsProps {
	/**
	 * The content of the accordion summary.
	 */
	children?: React.ReactNode;
	className?: string;
}
/** Кнопка */
export class AccordionDetails extends React.PureComponent<IAccordionDetailsProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiAccordionDetails
				{...this.props}
			/>
		);
	}
}
