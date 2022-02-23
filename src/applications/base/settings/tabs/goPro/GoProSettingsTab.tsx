import { observer } from 'mobx-react';
import React from 'react';

import { GoProSettingsModel } from './GoProSettingsModel';

import { Checkbox } from '../../../../../elements/Checkbox';
import { FormControl } from '../../../../../elements/FormControl';
import { FormControlLabel } from '../../../../../elements/FormControlLabel';
import { ITextFieldChangeEventProps } from '../../../../../elements/TextField';
import { Typography } from '../../../../../elements/Typography';
import { LanguageEnum } from '../../../../../src-front/models/LanguageEnum';
import { SettingsLocalization } from '../../SettingsLocalization';
import { PathSelectorComponent } from '../../../../../common/PathSelectorComponent';
import { MapperHelper } from '../../../../../helpers/MapperHelper';


/** */
export interface GoProSettingsTabProps extends GoProSettingsModel {
	language?: LanguageEnum;

	onChange: (event: ITextFieldChangeEventProps, settings: GoProSettingsModel) => void;
}

@observer
/** */
export class GoProSettingsTab extends React.PureComponent<GoProSettingsTabProps> {
	/** Отображение */
	public render(): React.ReactNode {
		const { language } = this.props;

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
					<PathSelectorComponent
						label={SettingsLocalization.goProTab.goProVideoDestination(language)}
						path={this.props.goProVideoPath}
						selectButtonTitle={SettingsLocalization.pathSourcesTab.pathSelectButtonTitle(language)}
						openButtonTitle={SettingsLocalization.pathSourcesTab.pathOpenButtonTitle(language)}
						onPathChange={this.onGoProVideoPathChange}
						properties={['openDirectory']}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<PathSelectorComponent
						label={SettingsLocalization.goProTab.goProPhotoDestination(language)}
						path={this.props.goProPhotoPath}
						selectButtonTitle={SettingsLocalization.pathSourcesTab.pathSelectButtonTitle(language)}
						openButtonTitle={SettingsLocalization.pathSourcesTab.pathOpenButtonTitle(language)}
						onPathChange={this.onGoProPhotoPathChange}
						properties={['openDirectory']}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<PathSelectorComponent
						label={SettingsLocalization.goProTab.goProPhotoOverlayedDestination(language)}
						path={this.props.goProPhotoOverlayedPath}
						selectButtonTitle={SettingsLocalization.pathSourcesTab.pathSelectButtonTitle(language)}
						openButtonTitle={SettingsLocalization.pathSourcesTab.pathOpenButtonTitle(language)}
						onPathChange={this.onGoProPhotoOverlayedPathChange}
						properties={['openDirectory']}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<FormControlLabel
						control={
							<Checkbox
								checked={this.props.removeFromGoPro}
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
								checked={this.props.showColorStateGoPro}
								onChange={this.onShowColorStateGoProChange}
								color="primary"
							/>
						}
						label={SettingsLocalization.goProTab.showColorStateGoPro(language)}
					/>
				</FormControl>
			</div>
		);
	}

	/** */
	private readonly onRemoveFromGoProChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { removeFromGoPro: checked });
	};

	/** */
	private readonly onShowColorStateGoProChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { showColorStateGoPro: checked });
	};

	/** */
	private readonly onGoProVideoPathChange = (event: ITextFieldChangeEventProps, _id?: number): void => {
		this.onChange(event, { goProVideoPath: event.target.value });
	};

	/** */
	private readonly onGoProPhotoPathChange = (event: ITextFieldChangeEventProps, _id?: number): void => {
		this.onChange(event, { goProPhotoPath: event.target.value });
	};

	/** */
	private readonly onGoProPhotoOverlayedPathChange = (event: ITextFieldChangeEventProps, _id?: number): void => {
		this.onChange(event, { goProPhotoOverlayedPath: event.target.value });
	};

	/** */
	private readonly onChange = (event: any, value: GoProSettingsModel): void => {
		const result = new GoProSettingsModel();

		MapperHelper.mapValues(this.props, result);
		MapperHelper.mapValues(value, result);

		this.props.onChange(event, result);
	};
}
