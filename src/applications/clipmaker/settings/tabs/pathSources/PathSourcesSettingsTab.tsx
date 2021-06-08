import { observer } from 'mobx-react';
import React from 'react';

import { PathSourcesSettingsModel } from './PathSourcesSettingsModel';

import { PathSelector } from '../../../../../common/PathSelector';
import { FormControl } from '../../../../../elements/FormControl';
import { ITextFieldChangeEventProps, TextField } from '../../../../../elements/TextField';
import { Typography } from '../../../../../elements/Typography';
import { LanguageEnum } from '../../../../../src-front/views/LanguageEnum';
import { SettingsLocalization } from '../../SettingsLocalization';


/** */
export interface PathSourcesSettingsTabProps {
	language?: LanguageEnum;

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
					<PathSelector
						label={SettingsLocalization.pathSourcesTab.pathSource(language)}
						path={pathSource}
						selectButtonTitle={SettingsLocalization.pathSourcesTab.pathSelectButtonTitle(language)}
						onPathChange={this.onPathSourceChange}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<PathSelector
						label={SettingsLocalization.pathSourcesTab.pathTestSource(language)}
						path={pathTestSource}
						selectButtonTitle={SettingsLocalization.pathSourcesTab.pathSelectButtonTitle(language)}
						onPathChange={this.onPathTestSourceChange}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<PathSelector
						label={SettingsLocalization.pathSourcesTab.pathDestination(language)}
						path={pathDestination}
						selectButtonTitle={SettingsLocalization.pathSourcesTab.pathSelectButtonTitle(language)}
						onPathChange={this.onPathDestinationChange}
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
			pathSource: value,
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
			pathDestination: value,
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
			pathTestSource: value,
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
			fileNamePattern: value,
			// background: this.props.background,
			// backgroundToolbar: this.props.backgroundToolbar,
			// backgroundGroupName: this.props.backgroundGroupName,
			// backgroundFileCard: this.props.backgroundFileCard,
			// iconColor: this.props.iconColor,
		} as PathSourcesSettingsModel;
		this.props.onChange(event, settings);
	};
}
