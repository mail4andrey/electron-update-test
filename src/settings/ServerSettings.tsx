import { observer } from 'mobx-react';
import React from 'react';

import { ServerSettingsModel } from './ServerSettingsModel';
import { SettingsLocalization } from './SettingsLocalization';

import { FormControl } from '../elements/FormControl';
import { ITextFieldChangeEventProps, TextField } from '../elements/TextField';
import { Typography } from '../elements/Typography';


/** */
export interface ServerSettingsProps {
	port?: number;

	onChange: (event: ITextFieldChangeEventProps, settings: ServerSettingsModel) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class ServerSettings extends React.PureComponent<ServerSettingsProps> {
	/** Отображение */
	public render(): React.ReactNode {
		const port = this.props.port ?? 8001;
		return (
			<div className=''>
				<Typography
					variant='h5'
				>
					{SettingsLocalization.serverTab.title}
				</Typography>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						label={SettingsLocalization.serverTab.port}
						value={port}
						onChange={this.onPortChange}
						fullWidth={true}
						required={true}
						helperText={SettingsLocalization.serverTab.portWarning}
					/>
				</FormControl>
			</div>
		);
	}

	/** */
	private readonly onPortChange = (event: ITextFieldChangeEventProps): void => {
		const port = Number(event.target.value);
		const value = { port };
		this.props.onChange(event, value);
	};
}
