import { observer } from 'mobx-react';
import React from 'react';
import { inject, provider } from 'react-ioc';

import { DesignSettings } from './DesignSettings';
import { EmailSettings } from './EmailSettings';
import { PathSourceSettings } from './PathSourceSettings';
import { PrintSettings } from './PrintSettings';
import { ServerSettings } from './ServerSettings';
import { SettingsController } from './SettingsController';
import { SettingsLocalization } from './SettingsLocalization';
import { SettingsStore } from './SettingsStore';

import { BaseRoutedComponent } from '../common/BaseRoutedComponent';
import { IMainRoutedProps } from '../common/props/IMainRoutedProps';
import { AppBar } from '../elements/AppBar';
import { Button } from '../elements/Button';
import { ButtonGroup } from '../elements/ButtonGroup';
import { Folder, FormatSize, Mail, Print, SettingsEthernet } from '../elements/Icons';
import { OneLine } from '../elements/ommons/OneLine';
import { RightContainer } from '../elements/ommons/RightContainer';
import { Tab } from '../elements/Tab';
import { TabPanel } from '../elements/TabPanel';
import { Tabs } from '../elements/Tabs';

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
	// }

	/** Отображение */
	public render(): React.ReactNode {
		// const classes = useStyles();

		const {
			onPathSourceAdd,
			onPathSourceDelete,
			onPathSourceChange,
			onEmailSettingsChange,
			onPrintSettingsChange,
			onDesignSettingsChange,
			onServerSettingsChange,
			onPathSourceUp,
			onPathSourceDown
		} = this.controller;
		const { settings, tabSelected, language } = this.store;
		return (
			<div>
				<OneLine className='padding-left-12px box-sizing-border-box'>
					<h1>{SettingsLocalization.title(language)}</h1>
					<RightContainer className='padding-right-12px'>
						<ButtonGroup>
							<Button
								color='primary'
								onClick={this.onSaveClick}
							>
								{SettingsLocalization.saveButton(language)}
							</Button>
							<Button
								color='secondary'
								onClick={this.onCancelClick}
							>
								{SettingsLocalization.cancelButton(language)}
							</Button>
						</ButtonGroup>
					</RightContainer>
				</OneLine>

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
							label={SettingsLocalization.pathSourceTab.title(language)}
							index={0}
							// id = 'simple-tab-0'
							// 'aria-controls'= 'simple-tabpanel-0'
							icon={<Folder/>}
						/>
						<Tab
							label={SettingsLocalization.emailTab.title(language)}
							index={1}
							icon={<Mail/>}
						/>
						<Tab
							label={SettingsLocalization.printerTab.title(language)}
							index={2}
							icon={<Print/>}
						/>
						<Tab
							label={SettingsLocalization.designTab.title(language)}
							index={3}
							icon={<FormatSize/>}
						/>
						<Tab
							label={SettingsLocalization.serverTab.title(language)}
							index={4}
							icon={<SettingsEthernet/>}
						/>
					</Tabs>
					<TabPanel
						value={tabSelected}
						index={0}
					>
						<PathSourceSettings
							language={language}
							settings={settings.pathSources}
							onPathSourceAdd={onPathSourceAdd}
							onPathSourceChange={onPathSourceChange}
							onPathSourceUp={onPathSourceUp}
							onPathSourceDown={onPathSourceDown}
							onPathSourceDelete={onPathSourceDelete}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={1}
					>
						<EmailSettings
							language={language}
							settings={settings.emailSettings}
							onChange={onEmailSettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={2}
					>
						<PrintSettings
							language={language}
							settings={settings.printSettings}
							onChange={onPrintSettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={3}
					>
						<DesignSettings
							language={language}
							titleFrontPage={settings.designSettings.titleFrontPage}
							// size={settings.designSettings.size}
							background={settings.designSettings.background}
							backgroundToolbar={settings.designSettings.backgroundToolbar}
							backgroundGroupName={settings.designSettings.backgroundGroupName}
							backgroundFileCard={settings.designSettings.backgroundFileCard}
							iconColor={settings.designSettings.iconColor}
							onChange={onDesignSettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={4}
					>
						<ServerSettings
							language={language}
							port={settings.serverSettings.port}
							onChange={onServerSettingsChange}
						/>
					</TabPanel>
				</AppBar>
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
}
