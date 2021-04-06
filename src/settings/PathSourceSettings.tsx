import { observer } from 'mobx-react';
import React from 'react';

import { PathSelector } from './PathSelector';
import { SettingsLocalization } from './SettingsLocalization';

import { Button } from '../elements/Button';
import { FormControl } from '../elements/FormControl';
import { PlaylistAdd } from '../elements/Icons';
import { ITextFieldChangeEventProps } from '../elements/TextField';
import { Typography } from '../elements/Typography';
import { LanguageEnum } from '../src-front/views/LanguageEnum';


/** */
export interface PathSourceSettingsProps {
	language?: LanguageEnum;

	/** */
	settings?: string[];

	onPathSourceAdd?: (event: React.MouseEvent<Element, MouseEvent>) => void;
	onPathSourceChange?: (event: ITextFieldChangeEventProps, id: number) => void;
	onPathSourceDelete?: (event: React.MouseEvent<Element, MouseEvent>, id: number) => void;
	onPathSourceUp?: (event: React.MouseEvent<Element, MouseEvent>, id: number) => void;
	onPathSourceDown?: (event: React.MouseEvent<Element, MouseEvent>, id: number) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class PathSourceSettings extends React.PureComponent<PathSourceSettingsProps> {
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
						language={language}
						id={index}
						path={path}
						disableUpButton={disableUpButton}
						disableDownButton={disableDownButton}
						onPathChange={this.props.onPathSourceChange}
						onUpClick={this.props.onPathSourceUp}
						onDownClick={this.props.onPathSourceDown}
						onDeleteClick={this.props.onPathSourceDelete} />
				</div>
			);
		});

		return (
			<div className=''>
				<Typography
					variant='h5'
				>
					{SettingsLocalization.pathSourceTab.title(language)}
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
						{SettingsLocalization.pathSourceTab.pathAddButtonTitle(language)}
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
