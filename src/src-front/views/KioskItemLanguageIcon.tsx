import React from 'react';


import { DesignSizeEnum } from './DesignSizeEnum';
import { LanguageEnum } from './LanguageEnum';

import { OneLine } from '../../elements/commons/OneLine';
import { IconButton } from '../../elements/IconButton';
import { Language } from '../../elements/Icons';
import { Tooltip } from '../../elements/Tooltip';
import { KioskLocalization } from '../localization/KioskLocalization';


/**  */
export interface IKioskItemLanguageIcon {
	buttonSize?: DesignSizeEnum;
	iconColor?: string;

	/** */
	language?: LanguageEnum;

	/** */
	onClick: (event: React.MouseEvent<Element, MouseEvent>, value: LanguageEnum) => void;
}
/** Кнопка */
export class KioskItemLanguageIcon extends React.PureComponent<IKioskItemLanguageIcon> {
	/** Отображение */
	public render(): React.ReactNode {
		const { iconColor } = this.props;
		const languageDescription = KioskLocalization.languageDescription(this.props.language);
		return (
			<IconButton
				onClick={this.onClick}
			>
				<OneLine
					style={{ color: iconColor }}
				>
					<Language
						htmlColor={this.props.iconColor}
						fontSize={this.props.buttonSize}
					/>
					{languageDescription}
				</OneLine>
			</IconButton>
		);
	}

	/** */
	private readonly onClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const nextSortOrder = this.getNextItem(this.props.language);
		this.props.onClick(event, nextSortOrder);
	};

	/** */
	private getNextItem(value?: LanguageEnum): LanguageEnum {
		switch (value) {
			case LanguageEnum.rus:
				return LanguageEnum.eng;

			case LanguageEnum.eng:
			default:
				return LanguageEnum.rus;

		}
	}
}
