import { observer } from 'mobx-react';
import React from 'react';


import { ServerSettingsModel } from './ServerSettingsModel';


import { FormControl } from '../../../../../elements/FormControl';
import { ITextFieldChangeEventProps, TextField } from '../../../../../elements/TextField';
import { Typography } from '../../../../../elements/Typography';
import { LanguageEnum } from '../../../../../src-front/views/LanguageEnum';
import { SettingsLocalization } from '../../../../clipmaker/settings/SettingsLocalization';


/** */
export interface ServerSettingsTabProps {
	language?: LanguageEnum;
	port?: number;

	onChange: (event: ITextFieldChangeEventProps, settings: ServerSettingsModel) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class ServerSettingsTab extends React.PureComponent<ServerSettingsTabProps> {
	/** Отображение */
	public render(): React.ReactNode {
		const { language } = this.props;
		const port = this.props.port ?? process.env.DEFAULTPORT;
		return (
			<div className=''>
				<Typography
					variant='h5'
				>
					{SettingsLocalization.serverTab.title(language)}
				</Typography>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<TextField
						label={SettingsLocalization.serverTab.port(language)}
						value={port}
						onChange={this.onPortChange}
						fullWidth={true}
						required={true}
						helperText={SettingsLocalization.serverTab.portWarning(language)}
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
