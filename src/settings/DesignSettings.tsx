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
import { ITextFieldChangeEventProps, TextField } from '../elements/TextField';
import { Typography } from '../elements/Typography';


/** */
export interface DesignSettingsProps {
	/** */
	titleFrontPage?: string;

	/** */
	background?: string;

	/** */
	backgroundToolbar?: string;

	/** */
	backgroundGroupName?: string;

	/** */
	backgroundFileCard?: string;

	/** */
	size?: DesignSizeEnum;
	// settings?: DesignSettingsModel;

	onChange: (event: ISelectChangeEventProps | undefined, settings: DesignSettingsModel) => void;
}

// @provider(SettingsController, SettingsStore)
// @observer
/** */
export class DesignSettings extends React.PureComponent<DesignSettingsProps> {
	/** */
	// private readonly settings = new DesignSettingsViewModel();

	/** */
	// public componentDidMount(): void {
	// 	try {
	// 		// this.settings.size = this.props.settings?.size;
	// 		// this.settings.background = this.props.settings?.background;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }

	/** Отображение */
	public render(): React.ReactNode {
		// const titleFrontPage = this.props.titleFrontPage && this.props.titleFrontPage.length ? this.props.titleFrontPage: 'Kiosk';
		const background = this.props.background ?? 'white';
		const backgroundToolbar = this.props.backgroundToolbar ?? 'gray';
		const backgroundGroupName = this.props.backgroundGroupName ?? 'gray';
		const backgroundFileCard = this.props.backgroundFileCard ?? 'gray';
		const size = this.props.size ?? DesignSizeEnum.medium;
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
					<TextField
						label={SettingsLocalization.designTab.titleFrontPage}
						value={this.props.titleFrontPage}
						onChange={this.onTitleFrontPageChange}
						fullWidth={true}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<ColorPicker
						floatingLabelText={SettingsLocalization.designTab.backgroundName}
						TextFieldProps={{ value: background }}
						// internalValue={background}
						defaultValue={background}
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
					<ColorPicker
						floatingLabelText={SettingsLocalization.designTab.backgroundToolbarName}
						TextFieldProps={{ value: backgroundToolbar }}
						// internalValue={backgroundToolbar}
						defaultValue={backgroundToolbar}
						// defaultValue={color}
						// defaultValue={SettingsLocalization.designTab.backgroundName}
						// internalValue={color}
						onChange={this.onBackgroundToolbarChange}
						// showPicker={true}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<ColorPicker
						floatingLabelText={SettingsLocalization.designTab.backgroundGroupName}
						TextFieldProps={{ value: backgroundGroupName }}
						// internalValue={backgroundToolbar}
						defaultValue={backgroundGroupName}
						// defaultValue={color}
						// defaultValue={SettingsLocalization.designTab.backgroundName}
						// internalValue={color}
						onChange={this.onBackgroundGroupNameChange}
						// showPicker={true}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<ColorPicker
						floatingLabelText={SettingsLocalization.designTab.backgroundFileCardName}
						TextFieldProps={{ value: backgroundFileCard }}
						// internalValue={backgroundToolbar}
						defaultValue={backgroundFileCard}
						// defaultValue={color}
						// defaultValue={SettingsLocalization.designTab.backgroundName}
						// internalValue={color}
						onChange={this.onBackgroundFileCardChange}
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
			const settings = {
				titleFrontPage: this.props.titleFrontPage,
				background: color,
				backgroundToolbar: this.props.backgroundToolbar,
				backgroundGroupName: this.props.backgroundGroupName,
				backgroundFileCard: this.props.backgroundFileCard,
				size: this.props.size,
			} as DesignSettingsModel;
			this.props.onChange(undefined, settings);
			// this.settings.background = color;
			// this.onDesignSettingsChange();
		}
	};

	/** */
	private readonly onBackgroundToolbarChange = (color?: string): void => {
		if (color) {
			const settings = {
				titleFrontPage: this.props.titleFrontPage,
				background: this.props.background,
				backgroundToolbar: color,
				backgroundGroupName: this.props.backgroundGroupName,
				backgroundFileCard: this.props.backgroundFileCard,
				size: this.props.size,
			} as DesignSettingsModel;
			this.props.onChange(undefined, settings);
			// this.settings.background = color;
			// this.onDesignSettingsChange();
		}
	};

	/** */
	private readonly onBackgroundGroupNameChange = (color?: string): void => {
		if (color) {
			const settings = {
				titleFrontPage: this.props.titleFrontPage,
				background: this.props.background,
				backgroundToolbar: this.props.backgroundToolbar,
				backgroundGroupName: color,
				backgroundFileCard: this.props.backgroundFileCard,
				size: this.props.size,
			} as DesignSettingsModel;
			this.props.onChange(undefined, settings);
			// this.settings.background = color;
			// this.onDesignSettingsChange();
		}
	};

	/** */
	private readonly onBackgroundFileCardChange = (color?: string): void => {
		if (color) {
			const settings = {
				titleFrontPage: this.props.titleFrontPage,
				background: this.props.background,
				backgroundToolbar: this.props.backgroundToolbar,
				backgroundGroupName: this.props.backgroundGroupName,
				backgroundFileCard: color,
				size: this.props.size,
			} as DesignSettingsModel;
			this.props.onChange(undefined, settings);
			// this.settings.background = color;
			// this.onDesignSettingsChange();
		}
	};

	/** */
	private readonly onSizeChange = (event: ISelectChangeEventProps): void => {
		const value = event.target.value as DesignSizeEnum;
		const settings = {
			titleFrontPage: this.props.titleFrontPage,
			background: this.props.background,
			backgroundToolbar: this.props.backgroundToolbar,
			backgroundGroupName: this.props.backgroundGroupName,
			backgroundFileCard: this.props.backgroundFileCard,
			size: value,
		} as DesignSettingsModel;
		this.props.onChange(event, settings);
		// this.settings.size = value;
		// this.onDesignSettingsChange(event);
	};

	/** */
	private readonly onTitleFrontPageChange = (event: ITextFieldChangeEventProps): void => {
		const { value } = event.target;
		const settings = {
			titleFrontPage: value,
			background: this.props.background,
			backgroundToolbar: this.props.backgroundToolbar,
			backgroundGroupName: this.props.backgroundGroupName,
			backgroundFileCard: this.props.backgroundFileCard,
			size: this.props.size,
		} as DesignSettingsModel;
		this.props.onChange(event, settings);
	};

	/**  */
	// private onDesignSettingsChange(event?: ISelectChangeEventProps): void {
	// 	const settings = {
	// 		background: this.props.settings?.background,
	// 		size: this.props.settings?.size,
	// 	} as DesignSettingsModel;
	// 	this.props.onChange(event, settings);
	// }
}
