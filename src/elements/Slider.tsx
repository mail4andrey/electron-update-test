import { Slider as UiSlider } from '@material-ui/core';
import React from 'react';
export interface Mark {
	value: number;
	label?: React.ReactNode;
}

export interface ValueLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
	value: number;
	open: boolean;
	children: React.ReactElement;
}

/** Свойства кнопки */
export interface ISliderProps {
	className?: string;
	color?: 'primary' | 'secondary';
	defaultValue?: number | number[];
	disabled?: boolean;
	getAriaLabel?: (index: number) => string;
	getAriaValueText?: (value: number, index: number) => string;
	marks?: boolean | Mark[];
	max?: number;
	min?: number;
	name?: string;
	onChange?: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
	onChangeCommitted?: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
	orientation?: 'horizontal' | 'vertical';
	step?: number | null;
	scale?: (value: number) => number;
	ThumbComponent?: React.ElementType<React.HTMLAttributes<HTMLSpanElement>>;
	track?: 'normal' | false | 'inverted';
	value?: number | number[];
	ValueLabelComponent?: React.ElementType<ValueLabelProps>;
	valueLabelDisplay?: 'on' | 'auto' | 'off';
	valueLabelFormat?: string | ((value: number, index: number) => React.ReactNode);
}
/** Кнопка */
export class Slider extends React.PureComponent<ISliderProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiSlider
				{...this.props}
			/>
		);
	}
}
