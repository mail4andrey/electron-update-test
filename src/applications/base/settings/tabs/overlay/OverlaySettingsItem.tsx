import { remote } from 'electron';
import { observer } from 'mobx-react';
import React from 'react';

import { OverlaySettingsItemModel, AlignSettingEnum } from './OverlaySettingsItemModel';

import { IconButton } from '../../../../../elements/IconButton';
import { Folder } from '../../../../../elements/Icons';
import { InputAdornment } from '../../../../../elements/InputAdornment';
import type { ITextFieldChangeEventProps } from '../../../../../elements/TextField';
import { TextField } from '../../../../../elements/TextField';
import { Tooltip } from '../../../../../elements/Tooltip';
import { MapperHelper } from '../../../../../helpers/MapperHelper';
import type { LanguageEnum } from '../../../../../src-front/models/LanguageEnum';
import { SettingsLocalization } from '../../SettingsLocalization';
import { FormControl } from '../../../../../elements/FormControl';
import { InputLabel } from '../../../../../elements/InputLabel';
import { Select } from '../../../../../elements/Select';
import { MenuItem } from '../../../../../elements/MenuItem';
import { ISelectChangeEventProps } from '../../../../../elements/Select';


/** */
export interface OverlaySettingsItemProps extends OverlaySettingsItemModel {
	language?: LanguageEnum;
	disabled?: boolean;

	// settings?: OverlaySettingsItemModel;

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
	onChange: (event: any, value: OverlaySettingsItemModel) => void;
	// onNameChange?: (event: ITextFieldChangeEventProps, id?: number) => void;
}

// @provider(SettingsController, SettingsStore)
/** */
@observer
export class OverlaySettingsItem extends React.PureComponent<OverlaySettingsItemProps> {

	/** Отображение */
	public render(): React.ReactNode {
		const {language} =this.props;

		const repeateCountForVideoValid = Number(this.props.repeateCountForVideo) >= -1;
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
			{/* <div className=''> */}
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
						label={SettingsLocalization.overlayTab.imageOrVideo(language)}
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
						value={this.props.repeateCountForVideo}
						label={SettingsLocalization.overlayTab.repeateCountForVideo(language)}
						disabled={!this.props.file || this.props.disabled}
						error={!repeateCountForVideoValid}
						onChange={this.onRepeateCountForVideoChange}
						helperText={SettingsLocalization.overlayTab.repeateCountForVideoWarning(language)}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='align-select-label'>
						{SettingsLocalization.overlayTab.align(language)}
					</InputLabel>
					<Select
						labelId='align-select-label'
						value={this.props.align}
						onChange={this.onAlignChange}
					>
						<MenuItem value={AlignSettingEnum.stretch}>{SettingsLocalization.overlayTab.alignDescription(language, AlignSettingEnum.stretch)}</MenuItem>
						<MenuItem value={AlignSettingEnum.top}>{SettingsLocalization.overlayTab.alignDescription(language, AlignSettingEnum.top)}</MenuItem>
						<MenuItem value={AlignSettingEnum.bottom}>{SettingsLocalization.overlayTab.alignDescription(language, AlignSettingEnum.bottom)}</MenuItem>
					</Select>
				</FormControl>
			{/* </div> */}
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
	private readonly onRepeateCountForVideoChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { repeateCountForVideo: event.target.value });
	};

	/** */
	private readonly onAlignChange = (event: ISelectChangeEventProps, _child: React.ReactNode): void => {
		this.onChange(event, { align: event.target.value as AlignSettingEnum });
	};

	/** */
	private readonly onChange = (event: any, value: OverlaySettingsItemModel): void => {
		const result = new OverlaySettingsItemModel();

		MapperHelper.mapValues(this.props, result);
		MapperHelper.mapValues(value, result);

		this.props.onChange(event, result);
	};
}
