import { observer } from 'mobx-react';
import React from 'react';
import { inject, provider } from 'react-ioc';


import { DesignSettings } from './DesignSettings';
import { EmailSettings } from './EmailSettings';
import { PathSourceSettings } from './PathSourceSettings';
import { PrintSettings } from './PrintSettings';
import { SettingsController } from './SettingsController';
import { SettingsLocalization } from './SettingsLocalization';
import { SettingsStore } from './SettingsStore';

import { ApplicationSettingsController } from '../application/ApplicationSettingsController';
import { BaseRoutedComponent } from '../common/BaseRoutedComponent';
import { IMainRoutedProps } from '../common/props/IMainRoutedProps';
import { AppBar } from '../elements/AppBar';
import { Button } from '../elements/Button';
import { ButtonGroup } from '../elements/ButtonGroup';
import { Folder, FormatSize, Mail, Print } from '../elements/Icons';
import { OneLine } from '../elements/ommons/OneLine';
import { RightContainer } from '../elements/ommons/RightContainer';
import { Tab } from '../elements/Tab';
import { TabPanel } from '../elements/TabPanel';
import { Tabs } from '../elements/Tabs';
import { ITextFieldChangeEventProps } from '../elements/TextField';


/** */
// export interface SettingsProps extends Routed {
// }

// const useStyles = makeStyles((theme: Theme) => ({
// 	root: {
// 		flexGrow: 1,
// 		backgroundColor: theme.palette.background.paper,
// 		display: 'flex',
// 		height: 224,
// 	},
// 	tabs: {
// 		borderRight: `1px solid ${theme.palette.divider}`,
// 	},
// }));

@provider(SettingsController, SettingsStore)
@observer
/** */
export class SettingsComponent extends BaseRoutedComponent<IMainRoutedProps> {
	@inject
	private readonly controller!: SettingsController;

	@inject
	private readonly store!: SettingsStore;

	// private history = useHistory();

	/** */
	public componentDidMount(): void {
	// this.history = useHistory();
		// this.store.settings
		this.controller.loadSettings();
	}

	/** */
	// public componentWillUnmount(): void {
	// 	ApplicationSettingsController.saveDefaultSettings();
	// }

	/** Отображение */
	public render(): React.ReactNode {
		// const classes = useStyles();

		const { onPathSourceAdd, onPathSourceDelete, onPathSourceChange, onEmailSettingsChange, onPrintSettingsChange, onDesignSettingsChange } = this.controller;
		const { settings, tabSelected } = this.store;
		return (
			<div>
				<OneLine className='padding-left-12px box-sizing-border-box'>
					<h1>{SettingsLocalization.title}</h1>
					<RightContainer className='padding-right-12px'>
						<ButtonGroup>
							<Button
								color='primary'
								onClick={this.onSaveClick}
							>
								{SettingsLocalization.saveButton}
							</Button>
							<Button
								color='secondary'
								onClick={this.onCancelClick}
							>
								{SettingsLocalization.cancelButton}
							</Button>
							{/* <Link
								component='button'
								color='secondary'
								underline='none'
							>
								{SettingsLocalization.cancelButton}
							</Link> */}
						</ButtonGroup>
					</RightContainer>
				</OneLine>
				{/* <div
					className='flex-grow-1'
				> */}

				<AppBar
					position='static'
					color='transparent'
					// color="default"
				>
					<Tabs
						// orientation='vertical'
						variant='scrollable'
						scrollButtons="on"
						// variant="fullWidth"
						indicatorColor="primary"
						textColor="primary"
						value={tabSelected}
						// className={classes.tabs}
						// className='tabs'
						onChange={this.onTabChange}
					>
						<Tab
							label={SettingsLocalization.pathSourceTab.title}
							index={0}
							// id = 'simple-tab-0'
							// 'aria-controls'= 'simple-tabpanel-0'
							icon={<Folder/>}
						/>
						<Tab
							label={SettingsLocalization.emailTab.title}
							index={1}
							icon={<Mail/>}
						/>
						<Tab
							label={SettingsLocalization.printerTab.title}
							index={2}
							icon={<Print/>}
						/>
						<Tab
							label={SettingsLocalization.designTab.title}
							index={3}
							icon={<FormatSize/>}
						/>
					</Tabs>
					<TabPanel
						value={tabSelected}
						index={0}
					>
						<PathSourceSettings
							settings={settings.pathSources}
							onPathSourceAdd={onPathSourceAdd}
							onPathSourceChange={onPathSourceChange}
							onPathSourceDelete={onPathSourceDelete}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={1}
					>
						<EmailSettings
							settings={settings.emailSettings}
							onChange={onEmailSettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={2}
					>
						<PrintSettings
							settings={settings.printSettings}
							onChange={onPrintSettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={3}
					>
						<DesignSettings
							settings={settings.designSettings}
							onChange={onDesignSettingsChange}
						/>
					</TabPanel>
				</AppBar>
				{/* <OneLine>
					<Tooltip
						title={SettingsLocalization.pathAddButtonTitle}
					>
						<IconButton
							size='small'
							onClick={this.controller.onAddPath}
						>
							<PlaylistAdd />
						</IconButton>
					</Tooltip>
					<InputLabel>
						{SettingsLocalization.pathSource}
					</InputLabel>
				</OneLine> */}
				{/* <PathSelector
					label={SettingsLocalization.pathSource}
					path={this.store.settings.pathSource}
					onChange={this.controller.onChange}
				/>
				<TextField
					label={}
					value={}
					onChange={}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Folder />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									size='small'
								>
									<MoreHoriz />
								</IconButton>
							</InputAdornment>
						)
					}}
				/> */}
				{/* <Link to='/'>
					{SettingsLocalization.cancel}
				</Link> */}
			</div>
		);
	}

	/** */
	private readonly onSaveClick = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		this.controller.onSaveClick();
		this.navigateTo('');
	};

	/** */
	private readonly onCancelClick = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		this.navigateTo('');
	};

	/** zzz */
	private readonly onTabChange = (_event: React.ChangeEvent<unknown>, newValue: number): void => {
		this.store.tabSelected = newValue;
	};

	/** zzz */
	private readonly onFilesPatternChange = (event: ITextFieldChangeEventProps): void => {
		const { value } = event.target;
		this.store.settings.filesPattern = value;
	};
}
