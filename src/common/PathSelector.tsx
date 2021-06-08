import { remote } from 'electron';
import { observer } from 'mobx-react';
import React from 'react';

import { OneLine } from '../elements/commons/OneLine';
import { IconButton } from '../elements/IconButton';
import { Folder, KeyboardArrowDown, KeyboardArrowUp, Remove } from '../elements/Icons';
import { InputAdornment } from '../elements/InputAdornment';
import { ITextFieldChangeEventProps, TextField } from '../elements/TextField';
import { Tooltip } from '../elements/Tooltip';


/** */
export interface PathSelectorProps {
	removeButtonTitle?: string;
	selectButtonTitle: string;
	label?: string;
	path?: string;
	canDelete?: boolean;
	id?: number;
	disableUpButton?: boolean;
	disableDownButton?: boolean;
	disableDeleteButton?: boolean;
	showUpButton?: boolean;
	showDownButton?: boolean;
	showDeleteButton?: boolean;
	onUpClick?: (event: React.MouseEvent<Element, MouseEvent>, id?: number) => void;
	onDownClick?: (event: React.MouseEvent<Element, MouseEvent>, id?: number) => void;
	onDeleteClick?: (event: React.MouseEvent<Element, MouseEvent>, id?: number) => void;
	onPathChange?: (event: ITextFieldChangeEventProps, id?: number) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class PathSelector extends React.PureComponent<PathSelectorProps> {

	/** Отображение */
	public render(): React.ReactNode {
		const { label, path, disableUpButton, disableDownButton, disableDeleteButton, removeButtonTitle, selectButtonTitle, showDeleteButton, showDownButton, showUpButton } = this.props;
		const upButton = showUpButton
			? (
				<IconButton
					size='small'
					disabled={disableUpButton}
					onClick={this.onUpClick}
				>
					<KeyboardArrowUp />
				</IconButton>
			)
			: null;
		const downButton = showDownButton
			? (
				<IconButton
					size='small'
					disabled={disableDownButton}
					onClick={this.onDownClick}
				>
					<KeyboardArrowDown />
				</IconButton>
			)
			: null;
		const deleteButton = showDeleteButton
			? (
				<Tooltip
					title={removeButtonTitle ?? ''}
				>
					<IconButton
						size='small'
						disabled={disableDeleteButton}
						onClick={this.onDeleteClick}
					>
						<Remove />
					</IconButton>
				</Tooltip>
			)
			: null;
		const rightButtons = (
			<InputAdornment position='end'>
				<OneLine>
					{upButton}
					{downButton}
					{deleteButton}
				</OneLine>
			</InputAdornment>
		);
		const selectFolder = (
			<InputAdornment position='start'>
				<Tooltip
					title={selectButtonTitle}
				>
					<IconButton
						size='small'
						onClick={this.onSelectFolderClick}
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
					endAdornment: rightButtons
				}}
			/>
		);
	}

	/** */
	private readonly onDeleteClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const { onDeleteClick, id } = this.props;
		if (onDeleteClick) {
			onDeleteClick(event, id);
		}
	};

	/** */
	private readonly onUpClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const { onUpClick, id } = this.props;
		if (onUpClick) {
			onUpClick(event, id);
		}
	};

	/** */
	private readonly onDownClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const { onDownClick, id } = this.props;
		if (onDownClick) {
			onDownClick(event, id);
		}
	};

	/** */
	private readonly onChange = (event: ITextFieldChangeEventProps): void => {
		const { onPathChange, id } = this.props;
		if (onPathChange) {
			onPathChange(event, id);
		}
	};

	/** */
	private readonly onSelectFolderClick = async (_event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
		const { selectButtonTitle } = this.props;
		const mainWindow = remote.getCurrentWindow();
		// const { dialog } = require('electron').remote;
		const result = await remote.dialog.showOpenDialog(mainWindow, {
			title: selectButtonTitle,
			properties: ['openDirectory']
		});
		if (!result.canceled) {
			const path = result.filePaths.length > 0 ? result.filePaths[0] : '';
			const { onPathChange, id } = this.props;
			if (onPathChange) {
				const onCahngeEvent = { target: { value: path } } as ITextFieldChangeEventProps;
				onPathChange(onCahngeEvent, id);
			}
		}
	};
}
