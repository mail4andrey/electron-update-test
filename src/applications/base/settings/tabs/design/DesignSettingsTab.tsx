import React from 'react';

import { SettingsLocalization } from '../../SettingsLocalization';

import { FormControl } from '../../../../../elements/FormControl';
import { ColorPicker } from '../../../../../elements/npm/ColorPicker';
import { ISelectChangeEventProps } from '../../../../../elements/Select';
import { ITextFieldChangeEventProps, TextField } from '../../../../../elements/TextField';
import { Typography } from '../../../../../elements/Typography';
import { DesignSettingsModel } from '../../../../../src-front/models/DesignSettingsModel';
import { LanguageEnum } from '../../../../../src-front/models/LanguageEnum';


/** */
export interface DesignSettingsTabProps {
	language?: LanguageEnum;
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
	iconColor?: string;

	/** */
	onChange: (event: ITextFieldChangeEventProps | undefined, settings: DesignSettingsModel) => void;
}

/** */
export class DesignSettingsTab extends React.PureComponent<DesignSettingsTabProps> {

	/** Отображение */
	public render(): React.ReactNode {
		const { language } = this.props;
		const background = this.props.background ?? 'white';
		const backgroundToolbar = this.props.backgroundToolbar ?? 'gray';
		const backgroundGroupName = this.props.backgroundGroupName ?? 'gray';
		const backgroundFileCard = this.props.backgroundFileCard ?? 'gray';
		const iconColor = this.props.iconColor ?? 'gray';

		return (
			<div className=''>
				<Typography
					variant='h5'
				>
					{SettingsLocalization.designTab.title(language)}
				</Typography>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						label={SettingsLocalization.designTab.titleFrontPage(language)}
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
						floatingLabelText={SettingsLocalization.designTab.backgroundName(language)}
						TextFieldProps={{ value: background }}
						defaultValue={background}
						onChange={this.onBackgroundChange}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<ColorPicker
						floatingLabelText={SettingsLocalization.designTab.backgroundToolbarName(language)}
						TextFieldProps={{ value: backgroundToolbar }}
						defaultValue={backgroundToolbar}
						onChange={this.onBackgroundToolbarChange}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<ColorPicker
						floatingLabelText={SettingsLocalization.designTab.backgroundGroupName(language)}
						TextFieldProps={{ value: backgroundGroupName }}
						defaultValue={backgroundGroupName}
						onChange={this.onBackgroundGroupNameChange}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<ColorPicker
						floatingLabelText={SettingsLocalization.designTab.backgroundFileCardName(language)}
						TextFieldProps={{ value: backgroundFileCard }}
						defaultValue={backgroundFileCard}
						onChange={this.onBackgroundFileCardChange}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<ColorPicker
						floatingLabelText={SettingsLocalization.designTab.iconColorName(language)}
						TextFieldProps={{ value: iconColor }}
						defaultValue={iconColor}
						onChange={this.onIconColorChange}
					/>
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
				iconColor: this.props.iconColor,
			} as DesignSettingsModel;
			this.props.onChange(undefined, settings);
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
				iconColor: this.props.iconColor,
			} as DesignSettingsModel;
			this.props.onChange(undefined, settings);
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
				iconColor: this.props.iconColor,
			} as DesignSettingsModel;
			this.props.onChange(undefined, settings);
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
				iconColor: this.props.iconColor,
			} as DesignSettingsModel;
			this.props.onChange(undefined, settings);
		}
	};

	/** */
	private readonly onIconColorChange = (color?: string): void => {
		if (color) {
			const settings = {
				titleFrontPage: this.props.titleFrontPage,
				background: this.props.background,
				backgroundToolbar: this.props.backgroundToolbar,
				backgroundGroupName: this.props.backgroundGroupName,
				backgroundFileCard: this.props.backgroundFileCard,
				iconColor: color,
			} as DesignSettingsModel;
			this.props.onChange(undefined, settings);
		}
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
			iconColor: this.props.iconColor,
		} as DesignSettingsModel;
		this.props.onChange(event, settings);
	};
}
