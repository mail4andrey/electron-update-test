import UiColorPicker from 'material-ui-color-picker';
import React from 'react';

import { ITextFieldProps } from '../TextField';

/** Свойства кнопки */
export interface IColorPickerProps {
	defaultValue?: string;
	onChange: (color: string) => void;
	// convert?: keyof converters;
	hintText?: string;
	floatingLabelText?: string;
	showPicker?: boolean;
	internalValue?: string;
	setShowPicker?: (open: boolean) => void;
	setValue?: (value: string) => void;
	TextFieldProps?: ITextFieldProps;

}
/** Кнопка */
export class ColorPicker extends React.PureComponent<IColorPickerProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiColorPicker
				{...this.props}
			/>
		);
	}
}
