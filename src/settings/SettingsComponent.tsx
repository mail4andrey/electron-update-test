import { observer } from 'mobx-react';
import React from 'react';
import { inject, provider } from 'react-ioc';


import { EmailSettings } from './EmailSettings';
import { SettingsController } from './SettingsController';
import { SettingsLocalization } from './SettingsLocalization';
import { SettingsStore } from './SettingsStore';

import { BaseRoutedComponent } from '../common/BaseRoutedComponent';
import { IMainRoutedProps } from '../common/props/IMainRoutedProps';
import { Button } from '../elements/Button';
import { ButtonGroup } from '../elements/ButtonGroup';
import { PathSelector } from '../elements/combine/PathSelector';
import { Grid } from '../elements/Grid';
import { IconButton } from '../elements/IconButton';
import { PlaylistAdd } from '../elements/Icons';
import { InputLabel } from '../elements/InputLabel';
import { LeftContainer } from '../elements/ommons/LeftContainer';
import { OneLine } from '../elements/ommons/OneLine';
import { RightContainer } from '../elements/ommons/RightContainer';
import { Tab } from '../elements/Tab';
import { TabPanel } from '../elements/TabPanel';
import { Tabs } from '../elements/Tabs';
import { ITextFieldChangeEventProps, TextField } from '../elements/TextField';
import { Tooltip } from '../elements/Tooltip';


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


	/** Отображение */
	public render(): React.ReactNode {
		// const classes = useStyles();

		const { onPathSourceAdd, onPathSourceDelete, onPathSourceChange, onEmailSettingsChange } = this.controller;
		const { settings, tabSelected } = this.store;
		const paths = this.store.settings.pathSources?.map((path: string, index: number) => (
			<div
				key={index}
			>
				<PathSelector
					id={index}
					// label={SettingsLocalization.pathSource}
					path={path}
					onChange={onPathSourceChange}
					onDelete={onPathSourceDelete}
				/>
			</div>
		));
		return (
			<div>
				<OneLine>
					<LeftContainer>
						<h1>{SettingsLocalization.title}</h1>
					</LeftContainer>
					<RightContainer>
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
				<div
					className='flex-grow-1'
				>
					<Tabs
						orientation='vertical'
						variant='scrollable'
						// variant="fullWidth"
						indicatorColor="primary"
						textColor="primary"
						value={tabSelected}
						// className={classes.tabs}
						// className='tabs'
						onChange={this.onTabChange}
					>
						<Tab
							label={SettingsLocalization.sourceTab.title}
							index={0}
							// id = 'simple-tab-0'
							// 'aria-controls'= 'simple-tabpanel-0'
						/>
						<Tab
							label={SettingsLocalization.emailTab.title}
							index={1}
						/>
					</Tabs>
					<TabPanel
						value={tabSelected}
						index={0}
					>
						<Grid
							container
							spacing={1}
							alignItems='center'
						>
							<Grid item>
								<TextField
									label={SettingsLocalization.sourceTab.filesPattern}
									value={settings.filesPattern}
									onChange={this.onFilesPatternChange}
									fullWidth={true}
									required={true}
								/>
							</Grid>
							<Grid item>
								<IconButton
									size='small'
									onClick={onPathSourceAdd}
								>
									<Tooltip
										title={SettingsLocalization.pathAddButtonTitle}
									>
										<PlaylistAdd />
									</Tooltip>
								</IconButton>
							</Grid>
							<Grid item>
								<InputLabel>
									{SettingsLocalization.sourceTab.pathSource}
								</InputLabel>
							</Grid>
						</Grid>
						<div>
							{paths}
						</div>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={1}
					>
						<EmailSettings
							email={settings.email}
							onChange={onEmailSettingsChange}
							// emailLogin={settings.email?.emailLogin}
							// emailPassword={settings.email?.emailPassword}
							// emailServer={settings.email?.emailServer}
						/>
					</TabPanel>
				</div>

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
