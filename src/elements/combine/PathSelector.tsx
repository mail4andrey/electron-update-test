// import { remote } from 'electron';
import { remote } from 'electron';
import { observer } from 'mobx-react';
import React from 'react';
// import { inject, provider } from 'react-ioc';


// import { SettingsController } from './SettingsController';
// import { SettingsLocalization } from './SettingsLocalization';
// import { SettingsStore } from './SettingsStore';

import { IconButton } from '../../elements/IconButton';
import { Folder, Remove } from '../../elements/Icons';
import { InputAdornment } from '../../elements/InputAdornment';
import { ITextFieldChangeEventProps, TextField } from '../../elements/TextField';
import { SettingsLocalization } from '../../settings/SettingsLocalization';
import { Tooltip } from '../Tooltip';


/** */
export interface PathSelectorProps {
	label?: string;
	path?: string;
	canDelete?: boolean;
	id: number;
	onDelete?: (event: React.MouseEvent<Element, MouseEvent>, id: number) => void;
	onChange?: (event: ITextFieldChangeEventProps, id: number) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class PathSelector extends React.PureComponent<PathSelectorProps> {
	// @inject
	// private readonly controller!: SettingsController;

	// @inject
	// private readonly store!: SettingsStore;


	/** Отображение */
	public render(): React.ReactNode {
		const { label, path, onDelete } = this.props;
		const deleteButton = !onDelete
			? null
			: (
				<InputAdornment position='end'>
					<Tooltip
						title={SettingsLocalization.pathSourceTab.pathRemoveButtonTitle}
					>
						<IconButton
							size='small'
							onClick={this.onDelete}
						>
							<Remove />
						</IconButton>
					</Tooltip>
				</InputAdornment>
			);
		const selectFolder = (
			<InputAdornment position='start'>
				<Tooltip
					title={SettingsLocalization.pathSourceTab.pathSelectButtonTitle}
				>
					<IconButton
						size='small'
						onClick={this.onSelectFolder}
					>
						<Folder />
					</IconButton>
				</Tooltip>
			</InputAdornment>
		);
		return (
			<TextField
				label={label}
				value={path}
				onChange={this.onChange}
				fullWidth={true}
				InputProps={{
					startAdornment: selectFolder,
					endAdornment: deleteButton
				}}
			/>
		);
	}

	/** */
	private readonly onDelete = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const { onDelete, id } = this.props;
		if (onDelete) {
			onDelete(event, id);
		}
	};

	/** */
	private readonly onChange = (event: ITextFieldChangeEventProps): void => {
		const { onChange, id } = this.props;
		if (onChange) {
			onChange(event, id);
		}
	};

	/** */
	private readonly onSelectFolder = async (_event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
		const mainWindow = remote.getCurrentWindow();
		// const { dialog } = require('electron').remote;
		const result = await remote.dialog.showOpenDialog(mainWindow, {
			title: SettingsLocalization.pathSourceTab.pathSelectButtonTitle,
			properties: ['openDirectory']
		});
		if (!result.canceled) {
			const path = result.filePaths.length > 0 ? result.filePaths[0] : '';
			const { onChange, id } = this.props;
			if (onChange) {
				const onCahngeEvent = { target: { value: path } } as ITextFieldChangeEventProps;
				onChange(onCahngeEvent, id);
			}
		}
	};
}
