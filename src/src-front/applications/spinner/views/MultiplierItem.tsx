import { remote } from 'electron';
import { observer } from 'mobx-react';
import React from 'react';
import { LanguageEnum } from '../../../models/LanguageEnum';
import { MultiplierEnum } from '../frontSettings/SpinnerSettingsFrontModel';
import { FormControl } from '../../../../elements/FormControl';
import { Slider, Mark } from '../../../../elements/Slider';
import { SpinnerLocalization } from '../../../../src-front/localization/SpinnerLocalization';

/** */
export interface MultiplierItemProps {
	value?: MultiplierEnum;
	position: number;
	language?: LanguageEnum;
	disabled?: boolean;
	onChange: (event: any, value: {value: MultiplierEnum, position: number}) => void;
	onChangeCommitted: (event: any, value: {value: MultiplierEnum, position: number}) => void;
}

/** */
@observer
export class MultiplierItem extends React.PureComponent<MultiplierItemProps> {

	/** Отображение */
	public render(): React.ReactNode {
		const marks: Mark[] = [
			{
				value: MultiplierEnum.slow10Times,
				label: SpinnerLocalization.frontSettings.multiplierValueShort(MultiplierEnum.slow10Times, this.props.language)
			},
			{
				value: MultiplierEnum.slow5Times,
				label: SpinnerLocalization.frontSettings.multiplierValueShort(MultiplierEnum.slow5Times, this.props.language)
			},
			{
				value: MultiplierEnum.normal,
				label: SpinnerLocalization.frontSettings.multiplierValueShort(MultiplierEnum.normal, this.props.language)
			},
			{
				value: MultiplierEnum.fast5Times,
				label: SpinnerLocalization.frontSettings.multiplierValueShort(MultiplierEnum.fast5Times, this.props.language)
			},
			{
				value: MultiplierEnum.fast10Times,
				label: SpinnerLocalization.frontSettings.multiplierValueShort(MultiplierEnum.fast10Times, this.props.language)
			},
			// {
			// 	value: this.props.value ?? MultiplierEnum.normal,
			// 	label: SpinnerLocalization.frontSettings.multiplierValueShort(this.props.value ?? MultiplierEnum.normal, this.props.language)
			// }
		];

		return (
			// <FormControl
			// 	fullWidth={true}
			// 	margin='dense'
			// >
			// 	<FormControl
			// 		fullWidth={true}
			// 		margin='dense'
			// 	>
					// <div
					// 	className='slider-container'
					// >
			<Slider
				track={false}
				marks={true}
				// marks={marks}
				max={MultiplierEnum.slow10Times}
				min={MultiplierEnum.fast10Times}
				// disabled={this.props.disabled}
				// label={SettingsLocalization.common.nameLabel(language)}
				value={this.props.value}
				onChangeCommitted={this.onMultiplierChangeCommitted}
				onChange={this.onMultiplierChange}
				// valueLabelFormat={this.getValueText}
				// getAriaValueText={this.getValueText}
				// valueLabelDisplay='on'
			/>
					// </div>
			// 	{/* </FormControl> */}
			// {/* </FormControl> */}
		);
	}

	/** */
	private readonly getValueText = (value: number, index: number): string => {
		return SpinnerLocalization.frontSettings.multiplierValue(value, this.props.language);
	};

	/** */
	private readonly onMultiplierChange = (event: React.ChangeEvent<{}>, value: number | number[]): void => {
		const multiplier: MultiplierEnum = value as number;
		this.props.onChange(event, { value: multiplier, position: this.props.position });
	};

	/** */
	private readonly onMultiplierChangeCommitted = (event: React.ChangeEvent<{}>, value: number | number[]): void => {
		const multiplier: MultiplierEnum = value as number;
		this.props.onChangeCommitted(event, { value: multiplier, position: this.props.position });
	};
}
