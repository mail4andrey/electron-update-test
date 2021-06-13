import { FormGroup as UiFormGroup } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IFormGroupProps {
	/**
	 * The content of the component.
	 */
	children?: React.ReactNode;
	/**
	 * Display group of elements in a compact row.
	 */
	row?: boolean;

	className?: string;
}
/** Кнопка */
export class FormGroup extends React.PureComponent<IFormGroupProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiFormGroup
				{...this.props}
			/>
		);
	}
}
