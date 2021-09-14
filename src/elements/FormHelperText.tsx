import { FormHelperText as UiFormHelperText } from '@material-ui/core';
import React from 'react';

/** Свойства кнопки */
export interface IFormHelperTextProps {
    /**
     * The content of the component.
     *
     * If `' '` is provided, the component reserves one line height for displaying a future message.
     */
    children?: React.ReactNode;
    /**
     * If `true`, the helper text should be displayed in a disabled state.
     */
    disabled?: boolean;
    /**
     * If `true`, helper text should be displayed in an error state.
     */
    error?: boolean;
    /**
     * If `true`, the helper text should use filled classes key.
     */
    filled?: boolean;
    /**
     * If `true`, the helper text should use focused classes key.
     */
    focused?: boolean;
    /**
     * If `dense`, will adjust vertical spacing. This is normally obtained via context from
     * FormControl.
     */
    margin?: 'dense';
    /**
     * If `true`, the helper text should use required classes key.
     */
    required?: boolean;
    /**
     * The variant to use.
     */
    variant?: 'standard' | 'outlined' | 'filled';
}
/** Кнопка */
export class FormHelperText extends React.PureComponent<IFormHelperTextProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiFormHelperText
				{...this.props}
			/>
		);
	}
}
