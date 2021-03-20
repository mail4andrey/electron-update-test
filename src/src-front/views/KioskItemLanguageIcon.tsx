import React from 'react';

import { LanguageEnum } from '../models/LanguageEnum';

import { IconButton } from '../../elements/IconButton';
import { Language } from '../../elements/Icons';
import { OneLine } from '../../elements/ommons/OneLine';
import { Tooltip } from '../../elements/Tooltip';
import { KioskLocalization } from '../localization/KioskLocalization';

/**  */
export interface IKioskItemLanguageIcon {
	/**  */
	language?: LanguageEnum;
	/**  */
	onClick: (event: React.MouseEvent<Element, MouseEvent>, value: LanguageEnum) => void;
}
/** Кнопка */
export class KioskItemLanguageIcon extends React.PureComponent<IKioskItemLanguageIcon> {
	/** Отображение */
	public render(): React.ReactNode {
		const languageDescription = KioskLocalization.languageDescription(this.props.language);
		return (
			<Tooltip
				title={KioskLocalization.languageTitle}
			>
				<IconButton
					size='small'
					onClick={this.onClick}
				>
					<OneLine>
						<Language />
						{languageDescription}
					</OneLine>
				</IconButton>
			</Tooltip>
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
