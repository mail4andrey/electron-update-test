import { observer } from 'mobx-react';
import React from 'react';

import { SettingsLocalization } from './SettingsLocalization';

import { Button } from '../elements/Button';
import { PathSelector } from '../elements/combine/PathSelector';
import { FormControl } from '../elements/FormControl';
import { PlaylistAdd } from '../elements/Icons';
import { ITextFieldChangeEventProps } from '../elements/TextField';
import { Typography } from '../elements/Typography';


/** */
export interface PathSourceSettingsProps {
	/** */
	settings?: string[];

	onPathSourceAdd?: (event: React.MouseEvent<Element, MouseEvent>) => void;
	onPathSourceChange?: (event: ITextFieldChangeEventProps, id: number) => void;
	onPathSourceDelete?: (event: React.MouseEvent<Element, MouseEvent>, id: number) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class PathSourceSettings extends React.PureComponent<PathSourceSettingsProps> {
	/** Отображение */
	public render(): React.ReactNode {
		const paths = this.props.settings?.map((path: string, index: number) => (
			<div
				key={index}
			>
				<PathSelector
					id={index}
					path={path}
					onChange={this.props.onPathSourceChange}
					onDelete={this.props.onPathSourceDelete}
				/>
			</div>
		));

		return (
			<div className=''>
				<Typography
					variant='h5'
				>
					{SettingsLocalization.pathSourceTab.title}
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
						{SettingsLocalization.pathSourceTab.pathAddButtonTitle}
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
