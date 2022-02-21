import { observer } from 'mobx-react';
import React from 'react';

import type { PathSourcesSettingsModel } from './PathSourcesSettingsModel';
import { FileExtension } from './PathSourcesSettingsModel';

import { PathSelectorComponent } from '../../../../../common/PathSelectorComponent';
import { FormControl } from '../../../../../elements/FormControl';
import type { ITextFieldChangeEventProps } from '../../../../../elements/TextField';
import { TextField } from '../../../../../elements/TextField';
import { Typography } from '../../../../../elements/Typography';
import type { LanguageEnum } from '../../../../../src-front/models/LanguageEnum';
import { SettingsLocalization } from '../../SettingsLocalization';
import { InputLabel } from '../../../../../elements/InputLabel';
import { Select, ISelectChangeEventProps } from '../../../../../elements/Select';
import { MenuItem } from '../../../../../elements/MenuItem';


/** */
export interface PathSourcesSettingsTabProps extends PathSourcesSettingsModel {
	language?: LanguageEnum;
	testPath: 'file' | 'directory'

	// pathSource?: string;
	// pathDestination?: string;
	// fileNamePattern?: string;
	// pathTestSource?: string;
	// fileExtension?: FileExtension;

	/** */
	// settings?: string[];

	// onPathSourceAdd?: (event: React.MouseEvent<Element, MouseEvent>) => void;
	onChange: (event: ITextFieldChangeEventProps | ISelectChangeEventProps, settings: PathSourcesSettingsModel) => void;
	// onPathSourceDelete?: (event: React.MouseEvent<Element, MouseEvent>, id: number) => void;
	// onPathSourceUp?: (event: React.MouseEvent<Element, MouseEvent>, id: number) => void;
	// onPathSourceDown?: (event: React.MouseEvent<Element, MouseEvent>, id: number) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class PathSourcesSettingsTab extends React.PureComponent<PathSourcesSettingsTabProps> {
	/** Отображение */
	public render(): React.ReactNode {
		const { language, pathSource, pathDestination, fileNamePattern, pathTestSource } = this.props;

		const fileNamePatternExtension = SettingsLocalization.pathSourcesTab.fileNamePatternExtension(language);
		const pathTestSourceLabel = this.props.testPath === 'file'
			? SettingsLocalization.pathSourcesTab.pathTestFileSource(language)
			: SettingsLocalization.pathSourcesTab.pathTestDirectorySource(language);

		return (
			<div className=''>
				<Typography
					variant='h5'
				>
					{SettingsLocalization.pathSourcesTab.title(language)}
				</Typography>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<PathSelectorComponent
						label={SettingsLocalization.pathSourcesTab.pathSource(language)}
						path={pathSource}
						selectButtonTitle={SettingsLocalization.pathSourcesTab.pathSelectButtonTitle(language)}
						openButtonTitle={SettingsLocalization.pathSourcesTab.pathOpenButtonTitle(language)}
						onPathChange={this.onPathSourceChange}
						properties={['openDirectory']}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<PathSelectorComponent
						label={pathTestSourceLabel}
						path={pathTestSource}
						selectButtonTitle={SettingsLocalization.pathSourcesTab.pathSelectButtonTitle(language)}
						openButtonTitle={SettingsLocalization.pathSourcesTab.pathOpenButtonTitle(language)}
						onPathChange={this.onPathTestSourceChange}
						properties={['openFile']}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<PathSelectorComponent
						label={SettingsLocalization.pathSourcesTab.pathDestination(language)}
						path={pathDestination}
						selectButtonTitle={SettingsLocalization.pathSourcesTab.pathSelectButtonTitle(language)}
						openButtonTitle={SettingsLocalization.pathSourcesTab.pathOpenButtonTitle(language)}
						onPathChange={this.onPathDestinationChange}
						properties={['openDirectory']}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						label={SettingsLocalization.pathSourcesTab.fileNamePattern(language)}
						value={fileNamePattern}
						onChange={this.onFileNamePatternChange}
						fullWidth={true}
						InputProps={{
							endAdornment: fileNamePatternExtension
						}}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='fileExtension-select-label'>
						{SettingsLocalization.pathSourcesTab.fileExtension(language)}
					</InputLabel>
					<Select
						// label={SettingsLocalization.videoTab.renderOn(language)}
						labelId='fileExtension-select-label'
						value={this.props.fileExtension}
						onChange={this.onFileExtensionOnChange}
					>
						<MenuItem value={FileExtension.mp4}>{SettingsLocalization.pathSourcesTab.fileExtensionItem(language, FileExtension.mp4)}</MenuItem>
						<MenuItem value={FileExtension.mov}>{SettingsLocalization.pathSourcesTab.fileExtensionItem(language, FileExtension.mov)}</MenuItem>
					</Select>
				</FormControl>
			</div>
		);
	}

	/** */
	private readonly onPathSourceChange = (event: ITextFieldChangeEventProps, _id?: number): void => {
		const { value } = event.target;
		const settings = {
			...this.props,
			pathSource: value
			// background: this.props.background,
			// backgroundToolbar: this.props.backgroundToolbar,
			// backgroundGroupName: this.props.backgroundGroupName,
			// backgroundFileCard: this.props.backgroundFileCard,
			// iconColor: this.props.iconColor,
		} as PathSourcesSettingsModel;
		this.props.onChange(event, settings);
	};

	/** */
	private readonly onPathDestinationChange = (event: ITextFieldChangeEventProps, _id?: number): void => {
		const { value } = event.target;
		const settings = {
			...this.props,
			pathDestination: value
			// background: this.props.background,
			// backgroundToolbar: this.props.backgroundToolbar,
			// backgroundGroupName: this.props.backgroundGroupName,
			// backgroundFileCard: this.props.backgroundFileCard,
			// iconColor: this.props.iconColor,
		} as PathSourcesSettingsModel;
		this.props.onChange(event, settings);
	};

	/** */
	private readonly onPathTestSourceChange = (event: ITextFieldChangeEventProps, _id?: number): void => {
		const { value } = event.target;
		const settings = {
			...this.props,
			pathTestSource: value
			// background: this.props.background,
			// backgroundToolbar: this.props.backgroundToolbar,
			// backgroundGroupName: this.props.backgroundGroupName,
			// backgroundFileCard: this.props.backgroundFileCard,
			// iconColor: this.props.iconColor,
		} as PathSourcesSettingsModel;
		this.props.onChange(event, settings);
	};

	/** */
	private readonly onFileNamePatternChange = (event: ITextFieldChangeEventProps): void => {
		const { value } = event.target;
		const settings = {
			...this.props,
			fileNamePattern: value
			// background: this.props.background,
			// backgroundToolbar: this.props.backgroundToolbar,
			// backgroundGroupName: this.props.backgroundGroupName,
			// backgroundFileCard: this.props.backgroundFileCard,
			// iconColor: this.props.iconColor,
		} as PathSourcesSettingsModel;
		this.props.onChange(event, settings);
	};
	
	/** */
	private readonly onFileExtensionOnChange = (event: ISelectChangeEventProps, _child: React.ReactNode): void => {
		const settings = {
			...this.props,
			fileExtension: event.target.value as FileExtension
		} as PathSourcesSettingsModel;
		this.props.onChange(event, settings);
	};
}
