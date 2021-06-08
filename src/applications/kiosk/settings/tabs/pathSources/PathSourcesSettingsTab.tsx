import { observer } from 'mobx-react';
import React from 'react';

import { PathSelector } from '../../../../../common/PathSelector';
import { Button } from '../../../../../elements/Button';
import { FormControl } from '../../../../../elements/FormControl';
import { PlaylistAdd } from '../../../../../elements/Icons';
import { ITextFieldChangeEventProps } from '../../../../../elements/TextField';
import { Typography } from '../../../../../elements/Typography';
import { LanguageEnum } from '../../../../../src-front/views/LanguageEnum';
import { SettingsLocalization } from '../../SettingsLocalization';


/** */
export interface PathSourcesSettingsTabProps {
	language?: LanguageEnum;

	/** */
	settings?: string[];

	onPathSourceAdd?: (event: React.MouseEvent<Element, MouseEvent>) => void;
	onPathSourceChange?: (event: ITextFieldChangeEventProps, id?: number) => void;
	onPathSourceDelete?: (event: React.MouseEvent<Element, MouseEvent>, id?: number) => void;
	onPathSourceUp?: (event: React.MouseEvent<Element, MouseEvent>, id?: number) => void;
	onPathSourceDown?: (event: React.MouseEvent<Element, MouseEvent>, id?: number) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class PathSourceSettingsTab extends React.PureComponent<PathSourcesSettingsTabProps> {
	/** Отображение */
	public render(): React.ReactNode {
		const { language } = this.props;
		const paths = this.props.settings?.map((path: string, index: number, array: string[]) => {
			const disableUpButton = index === 0;
			const disableDownButton = index === array.length - 1;
			return (
				<div
					key={index}
				>
					<PathSelector
						id={index}
						path={path}
						removeButtonTitle={SettingsLocalization.pathSourcesTab.pathRemoveButtonTitle(language)}
						selectButtonTitle={SettingsLocalization.pathSourcesTab.pathSelectButtonTitle(language)}
						disableUpButton={disableUpButton}
						disableDownButton={disableDownButton}
						showUpButton={true}
						showDownButton={true}
						showDeleteButton={true}
						onPathChange={this.props.onPathSourceChange}
						onUpClick={this.props.onPathSourceUp}
						onDownClick={this.props.onPathSourceDown}
						onDeleteClick={this.props.onPathSourceDelete}
					/>
				</div>
			);
		});

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
					<Button
						onClick={this.props.onPathSourceAdd}
						color='primary'
						variant='contained'
						startIcon={<PlaylistAdd />}
					>
						{SettingsLocalization.pathSourcesTab.pathAddButtonTitle(language)}
					</Button>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					{paths}
				</FormControl>
			</div>
		);
	}
}
