import { observer } from 'mobx-react';
import React from 'react';


import { DesignSettingsModel, DesignSettingsViewModel, DesignSizeEnum } from './DesignSettingsModel';
import { SettingsLocalization } from './SettingsLocalization';

import { FormControl } from '../elements/FormControl';
import { Mail } from '../elements/Icons';
import { InputLabel } from '../elements/InputLabel';
import { MenuItem } from '../elements/MenuItem';
import { ColorPicker } from '../elements/npm/ColorPicker';
import { OneLine } from '../elements/ommons/OneLine';
import { ISelectChangeEventProps, Select } from '../elements/Select';
import { Typography } from '../elements/Typography';


/** */
export interface DesignSettingsProps {
	settings?: DesignSettingsModel;

	onChange?: (event: ISelectChangeEventProps | undefined, settings: DesignSettingsModel) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class DesignSettings extends React.PureComponent<DesignSettingsProps> {
	/** */
	private readonly settings = new DesignSettingsViewModel();

	/** */
	public componentDidMount(): void {
		try {
			this.settings.size = this.props.settings?.size;
			this.settings.background = this.props.settings?.background;
		} catch (error) {
			console.error(error);
		}
	}

	/** Отображение */
	public render(): React.ReactNode {
		const color = this.settings.background ?? 'transparent';
		const size = this.settings.size ?? DesignSizeEnum.medium;
		const sizeValues = [
			(
				<MenuItem
					key={DesignSizeEnum.small}
					value={DesignSizeEnum.small}
				>
					<OneLine>
						<Mail
							fontSize='small'
						/>
						<div className='padding-left-12px'>
							{SettingsLocalization.designTab.sizeEnum(DesignSizeEnum.small)}
						</div>
					</OneLine>
				</MenuItem>
			), (
				<MenuItem
					key={DesignSizeEnum.medium}
					value={DesignSizeEnum.medium}
				>
					<OneLine>
						<Mail
							fontSize='default'
						/>
						<div className='padding-left-12px'>
							{SettingsLocalization.designTab.sizeEnum(DesignSizeEnum.medium)}
						</div>
					</OneLine>
				</MenuItem>
			// ), (
			// 	<MenuItem
			// 		key={DesignSizeEnum.large}
			// 		value={DesignSizeEnum.large}
			// 	>
			// 		<OneLine>
			// 			<Mail
			// 				fontSize='large'
			// 			/>
			// 			<div className='padding-left-12px'>
			// 				{SettingsLocalization.designTab.sizeEnum(DesignSizeEnum.large)}
			// 			</div>
			// 		</OneLine>
			// 	</MenuItem>
			)
		];

		return (
			<div className=''>
				<Typography
					variant='h5'
				>
					{SettingsLocalization.designTab.title}
				</Typography>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<ColorPicker
						floatingLabelText={SettingsLocalization.designTab.backgroundName}
						TextFieldProps={{ value: color }}
						internalValue={color}
						// defaultValue={color}
						// defaultValue={SettingsLocalization.designTab.backgroundName}
						// internalValue={color}
						onChange={this.onBackgroundChange}
						// showPicker={true}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel>
						{SettingsLocalization.designTab.sizeName}
					</InputLabel>
					<Select
						value={size}
						onChange={this.onSizeChange}
					>
						{sizeValues}
					</Select>
				</FormControl>
			</div>
		);
	}

	/** */
	private readonly onBackgroundChange = (color?: string): void => {
		if (color) {
			this.settings.background = color;
			this.onDesignSettingsChange();
		}
	};

	/** */
	private readonly onSizeChange = (event: ISelectChangeEventProps): void => {
		const value = event.target.value as DesignSizeEnum;
		this.settings.size = value;
		this.onDesignSettingsChange(event);
	};

	/**  */
	private onDesignSettingsChange(event?: ISelectChangeEventProps): void {
		const { onChange } = this.props;
		if (onChange) {
			const settings = {
				background: this.settings.background,
				size: this.settings.size,
			} as DesignSettingsModel;
			onChange(event, settings);
		}
	}
}
