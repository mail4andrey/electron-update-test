import { observer } from 'mobx-react';
import React from 'react';

import type { PathSourcesSettingsModel } from './PathSourcesSettingsModel';

import { PathSelectorComponent } from '../../../../../common/PathSelectorComponent';
import { FormControl } from '../../../../../elements/FormControl';
import type { ITextFieldChangeEventProps } from '../../../../../elements/TextField';
import { TextField } from '../../../../../elements/TextField';
import { Typography } from '../../../../../elements/Typography';
import type { LanguageEnum } from '../../../../../src-front/models/LanguageEnum';
import { SettingsLocalization } from '../../SettingsLocalization';


/** */
export interface PathSourcesSettingsTabProps {
	language?: LanguageEnum;
	testPath: 'file' | 'directory'

	pathSource?: string;
	pathDestination?: string;
	fileNamePattern?: string;
	pathTestSource?: string;

	/** */
	// settings?: string[];

	// onPathSourceAdd?: (event: React.MouseEvent<Element, MouseEvent>) => void;
	onChange: (event: ITextFieldChangeEventProps, settings: PathSourcesSettingsModel) => void;
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
}