import { remote } from 'electron';
import { observer } from 'mobx-react';
import React from 'react';

import { AudioSettingsItemModel, AudioStartFromEnum, AudioStopToEnum } from './AudioSettingsItemModel';

import { IconButton } from '../../../../../elements/IconButton';
import { Folder } from '../../../../../elements/Icons';
import { InputAdornment } from '../../../../../elements/InputAdornment';
import type { ITextFieldChangeEventProps } from '../../../../../elements/TextField';
import { TextField } from '../../../../../elements/TextField';
import { Tooltip } from '../../../../../elements/Tooltip';
import { MapperHelper } from '../../../../../helpers/MapperHelper';
import type { LanguageEnum } from '../../../../../src-front/models/LanguageEnum';
import { SettingsLocalization } from '../../SettingsLocalization';
import { FormControlLabel } from '../../../../../elements/FormControlLabel';
import { Checkbox } from '../../../../../elements/Checkbox';
import { FormControl } from '../../../../../elements/FormControl';
import { InputLabel } from '../../../../../elements/InputLabel';
import { Select } from '../../../../../elements/Select';
import { MenuItem } from '../../../../../elements/MenuItem';
import { ISelectChangeEventProps } from '../../../../../elements/Select';


/** */
export interface AudioSettingsItemProps extends AudioSettingsItemModel {
	language?: LanguageEnum;
	disabled?: boolean;

	// settings?: AudioSettingsItemModel;

	// removeButtonTitle?: string;
	// selectButtonTitle: string;
	// label?: string;
	// path?: string;
	// canDelete?: boolean;
	// id?: number;
	// disableUpButton?: boolean;
	// disableDownButton?: boolean;
	// disableDeleteButton?: boolean;
	// showUpButton?: boolean;
	// showDownButton?: boolean;
	// showDeleteButton?: boolean;
	// onUpClick?: (event: React.MouseEvent<Element, MouseEvent>, id?: number) => void;
	// onDownClick?: (event: React.MouseEvent<Element, MouseEvent>, id?: number) => void;
	// onDeleteClick?: (event: React.MouseEvent<Element, MouseEvent>, id?: number) => void;
	onChange: (event: any, value: AudioSettingsItemModel) => void;
	// onNameChange?: (event: ITextFieldChangeEventProps, id?: number) => void;
}

// @provider(SettingsController, SettingsStore)
/** */
@observer
export class AudioSettingsItem extends React.PureComponent<AudioSettingsItemProps> {

	/** Отображение */
	public render(): React.ReactNode {
		const {language} =this.props;
		

		const seconds = (
			<InputAdornment position='end'>
				{SettingsLocalization.common.seconds(language)}
			</InputAdornment>
		);

		const fadeIn = (
			<div className='white-space-nowrap'>
				<FormControlLabel
					control={
						<Checkbox
							checked={this.props.fadeIn}
							onChange={this.onFadeInChange}
							color='primary'
							disabled={!this.props.file || this.props.disabled}
						/>
					}
					label={SettingsLocalization.common.fadeIn(language)}
					className='width-110px'
				/>
			</div>
		);

		const fadeOut = (
			<div className='white-space-nowrap'>
				<FormControlLabel
					control={
						<Checkbox
							checked={this.props.fadeOut}
							onChange={this.onFadeOutChange}
							color='primary'
							disabled={!this.props.file || this.props.disabled}
						/>
					}
					label={SettingsLocalization.common.fadeOut(language)}
					className='width-110px'
				/>
			</div>
		);

		const fadeInDurationValid = Number(this.props.fadeInDuration) >= 0;
		const fadeOutDurationValid = Number(this.props.fadeOutDuration) >= 0;
		const startFromSecondsValid = Number(this.props.startFromSeconds) >= 0;
		const selectFolder = (
			<InputAdornment position='start'>
				<Tooltip
					title={SettingsLocalization.common.selectFile(language)}
				>
					<IconButton
						disabled={this.props.disabled}
						size='small'
						onClick={this.onImageOrVideoFileClick}
					>
						<Folder />
					</IconButton>
				</Tooltip>
			</InputAdornment>
		);

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
						disabled={this.props.disabled}
						label={SettingsLocalization.audioTab.audio(language)}
						value={this.props.file}
						onChange={this.onImageOrVideoFileChange}
						fullWidth={true}
						InputProps={{
							startAdornment: selectFolder
						}}
					/>
				</FormControl>
				
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						value={this.props.startFromSeconds}
						label={SettingsLocalization.audioTab.startFromSeconds(language)}
						placeholder='0.0'
						disabled={!this.props.file || this.props.disabled}
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
					<InputLabel id='startFrom-select-label'>
						{SettingsLocalization.audioTab.startFrom(language)}
					</InputLabel>
					<Select
						labelId='startFrom-select-label'
						value={this.props.startFrom}
						onChange={this.onStartFromChange}
						disabled={!this.props.file || this.props.disabled}
					>
						<MenuItem value={AudioStartFromEnum.fromIntro}>{SettingsLocalization.audioTab.startFromDescription(language, AudioStartFromEnum.fromIntro)}</MenuItem>
						<MenuItem value={AudioStartFromEnum.fromMovie}>{SettingsLocalization.audioTab.startFromDescription(language, AudioStartFromEnum.fromMovie)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='stopTo-select-label'>
						{SettingsLocalization.audioTab.stopTo(language)}
					</InputLabel>
					<Select
						labelId='stopTo-select-label'
						value={this.props.stopTo}
						onChange={this.onStopToChange}
						disabled={!this.props.file || this.props.disabled}
					>
						<MenuItem value={AudioStopToEnum.toOutro}>{SettingsLocalization.audioTab.stopToDescription(language, AudioStopToEnum.toOutro)}</MenuItem>
						<MenuItem value={AudioStopToEnum.toMovie}>{SettingsLocalization.audioTab.stopToDescription(language, AudioStopToEnum.toMovie)}</MenuItem>
					</Select>
				</FormControl>

				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						value={this.props.fadeInDuration}
						placeholder='0.0'
						disabled={!this.props.fadeIn || this.props.disabled}
						onChange={this.onFadeInDurationChange}
						error={!fadeInDurationValid}
						InputProps={{
							startAdornment: fadeIn,
							endAdornment: seconds
						}}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						value={this.props.fadeOutDuration}
						placeholder='0.0'
						disabled={!this.props.fadeOut || this.props.disabled}
						error={!fadeOutDurationValid}
						onChange={this.onFadeOutDurationChange}
						InputProps={{
							startAdornment: fadeOut,
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
	private readonly onImageOrVideoFileChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { file: event.target.value });
	};

	/** */
	private readonly onImageOrVideoFileClick = async (_event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
		// const { selectButtonTitle } = this.props;
		const mainWindow = remote.getCurrentWindow();
		// const mainWindow = BrowserWindow.getFocusedWindow();
		// const { dialog } = require('electron').remote;
		// const result = await dialog.showOpenDialog(mainWindow!, {
		const result = await remote.dialog.showOpenDialog(mainWindow, {
			title: SettingsLocalization.common.selectFile(this.props.language)
			// properties: ['openDirectory']
		});
		if (!result.canceled) {
			const path = result.filePaths.length > 0 ? result.filePaths[0] : '';
			const onChangeEvent = { target: { value: path } } as ITextFieldChangeEventProps;
			this.onImageOrVideoFileChange(onChangeEvent);
			// this.onImageOrVideoFileChange(onCahngeEvent, id);
		}
	};

	/** */
	private readonly onStartFromSecondsChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { startFromSeconds: event.target.value });
	};

	/** */
	private readonly onFadeInChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { fadeIn: checked });
	};

	/** */
	private readonly onFadeInDurationChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { fadeInDuration: event.target.value });
	};

	/** */
	private readonly onFadeOutChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { fadeOut: checked });
	};

	/** */
	private readonly onFadeOutDurationChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { fadeOutDuration: event.target.value });
	};

	/** */
	private readonly onStartFromChange = (event: ISelectChangeEventProps, _child: React.ReactNode): void => {
		this.onChange(event, { startFrom: event.target.value as AudioStartFromEnum });
	};
	
	/** */
	private readonly onStopToChange = (event: ISelectChangeEventProps, _child: React.ReactNode): void => {
		this.onChange(event, { stopTo: event.target.value as AudioStopToEnum });
	};

	/** */
	private readonly onChange = (event: any, value: AudioSettingsItemModel): void => {
		const result = new AudioSettingsItemModel();

		MapperHelper.mapValues(this.props, result);
		MapperHelper.mapValues(value, result);

		this.props.onChange(event, result);
	};
}
