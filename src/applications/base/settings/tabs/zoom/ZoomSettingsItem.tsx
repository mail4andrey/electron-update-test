import { observer } from 'mobx-react';
import React from 'react';

import { ZoomSettingsItemModel } from './ZoomSettingsItemModel';

import { InputAdornment } from '../../../../../elements/InputAdornment';
import type { ITextFieldChangeEventProps } from '../../../../../elements/TextField';
import { TextField } from '../../../../../elements/TextField';
import { MapperHelper } from '../../../../../helpers/MapperHelper';
import type { LanguageEnum } from '../../../../../src-front/models/LanguageEnum';
import { SettingsLocalization } from '../../SettingsLocalization';
import { FormControl } from '../../../../../elements/FormControl';


/** */
export interface ZoomSettingsItemProps extends ZoomSettingsItemModel {
	language?: LanguageEnum;
	disabled?: boolean;
	onChange: (event: any, value: ZoomSettingsItemModel) => void;
}

// @provider(SettingsController, SettingsStore)
/** */
@observer
export class ZoomSettingsItem extends React.PureComponent<ZoomSettingsItemProps> {

	/** Отображение */
	public render(): React.ReactNode {
		const {language} =this.props;

		const seconds = (
			<InputAdornment position='end'>
				{SettingsLocalization.common.seconds(language)}
			</InputAdornment>
		);
		const percent = (
			<InputAdornment position='end'>
				{SettingsLocalization.common.percent(language)}
			</InputAdornment>
		);

		const durationValid = Number(this.props.duration) >= 0;
		const zoomPercentValid = Number(this.props.zoomPercent) >= 0;
		const startFromSecondsValid = Number(this.props.startFromSeconds) >= 0;

		const debug = process.env.NODE_ENV === 'development'
			? (
				<div>
					{'guid:' + this.props.guid}
				</div>
			)
			: null;
		return (
			<FormControl
				fullWidth={true}
				margin='dense'
			>
				{debug}
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						disabled={this.props.disabled}
						label={SettingsLocalization.common.nameLabel(language)}
						value={this.props.name}
						onChange={this.onNameChange}
						fullWidth={true}
					/>
				</FormControl>

				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						value={this.props.startFromSeconds}
						label={SettingsLocalization.zoomTab.startFromSeconds(language)}
						placeholder='0.0'
						disabled={this.props.disabled}
						error={!startFromSecondsValid}
						onChange={this.onStartFromSecondsChange}
						InputProps={{
							endAdornment: seconds
						}}
					/>
				</FormControl>

				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						value={this.props.zoomPercent}
						label={SettingsLocalization.zoomTab.zoom(language)}
						placeholder='0.0'
						disabled={this.props.disabled}
						error={!zoomPercentValid}
						onChange={this.onZoomPercentChange}
						InputProps={{
							endAdornment: percent
						}}
					/>
				</FormControl>

				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						value={this.props.duration}
						label={SettingsLocalization.common.duration(language)}
						placeholder='0.0'
						disabled={this.props.disabled}
						error={!durationValid}
						onChange={this.onDurationChange}
						InputProps={{
							endAdornment: seconds
						}}
					/>
				</FormControl>
			</FormControl>
		);
	}

	/** */
	private readonly onNameChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { name: event.target.value });
	};

	/** */
	private readonly onStartFromSecondsChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { startFromSeconds: event.target.value });
	};

	/** */
	private readonly onZoomPercentChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { zoomPercent: event.target.value });
	};

	/** */
	private readonly onDurationChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { duration: event.target.value });
	};


	/** */
	private readonly onChange = (event: any, value: ZoomSettingsItemModel): void => {
		const result = new ZoomSettingsItemModel();

		MapperHelper.mapValues(this.props, result);
		MapperHelper.mapValues(value, result);

		this.props.onChange(event, result);
	};
}
