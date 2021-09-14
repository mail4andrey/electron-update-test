
import {Accordion as UiAccordion} from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IAccordionProps {
	children: NonNullable<React.ReactNode>;

	className?: string;
	
	/**
	* If `true`, expands the accordion, otherwise collapse it.
	* Setting this prop enables control over the accordion.
	*/
	expanded?: boolean;
	/**
	 * If `true`, the accordion will be displayed in a disabled state.
	 */
	disabled?: boolean;
}
/** Кнопка */
export class Accordion extends React.PureComponent<IAccordionProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiAccordion
				{...this.props}
			/>
		);
	}
}
