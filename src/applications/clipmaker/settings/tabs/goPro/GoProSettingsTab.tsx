import { observer } from 'mobx-react';
import React from 'react';

import { GoProSettingsModel } from './GoProSettingsModel';

import { PathSelector } from '../../../../../common/PathSelector';
import { Checkbox } from '../../../../../elements/Checkbox';
import { FormControl } from '../../../../../elements/FormControl';
import { FormControlLabel } from '../../../../../elements/FormControlLabel';
import { Switch } from '../../../../../elements/Switch';
import { ITextFieldChangeEventProps, TextField } from '../../../../../elements/TextField';
import { Typography } from '../../../../../elements/Typography';
import { LanguageEnum } from '../../../../../src-front/views/LanguageEnum';
import { SettingsLocalization } from '../../SettingsLocalization';


/** */
export interface GoProSettingsTabProps {
	language?: LanguageEnum;

	removeFromGoPro?: boolean;

	showColorStateGoPro?: boolean;

	onChange: (event: ITextFieldChangeEventProps, settings: GoProSettingsModel) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class GoProSettingsTab extends React.PureComponent<GoProSettingsTabProps> {
	/** Отображение */
	public render(): React.ReactNode {
		const { language, removeFromGoPro, showColorStateGoPro } = this.props;

		return (
			<div className=''>
				<Typography
					variant='h5'
				>
					{SettingsLocalization.goProTab.title(language)}
				</Typography>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<FormControlLabel
						control={
							<Checkbox
								checked={removeFromGoPro}
								onChange={this.onRemoveFromGoProChange}
								color="primary"
							/>
						}
						label={SettingsLocalization.goProTab.removeFromGoPro(language)}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<FormControlLabel
						control={
							<Checkbox
								checked={showColorStateGoPro}
								onChange={this.onShowColorStateGoProChange}
								color="primary"
							/>
						}
						label={SettingsLocalization.goProTab.showColorStateGoPro(language)}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<Switch
						checked={removeFromGoPro}
						// onChange={this.onSelect}
						// size={buttonSize}
						// style={{ color: iconColor }}
						// icon={checkBoxIcon}
						// checkedIcon={checkBoxCheckedIcon}
						// color='secondary'
					/>
				</FormControl>
				{/* <FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						label={SettingsLocalization.goProTab.fileNamePattern(language)}
						value={fileNamePattern}
						onChange={this.onFileNamePatternChange}
						fullWidth={true}
						InputProps={{
							endAdornment: fileNamePatternExtension
						}}
					/>
				</FormControl> */}
			</div>
		);
	}

	/** */
	private readonly onRemoveFromGoProChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		const value = checked;
		const settings = {
			...this.props,
			removeFromGoPro: value
		} as GoProSettingsModel;
		this.props.onChange(event, settings);
	};

	/** */
	private readonly onShowColorStateGoProChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		const value = checked;
		const settings = {
			...this.props,
			showColorStateGoPro: value
		} as GoProSettingsModel;
		this.props.onChange(event, settings);
	};
}
