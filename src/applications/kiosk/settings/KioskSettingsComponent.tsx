import { observer } from 'mobx-react';
import React from 'react';
import { inject, provider } from 'react-ioc';

import { DesignSettingsTab } from './tabs/design/DesignSettingsTab';
import { EmailSettingsTab } from './tabs/email/EmailSettingsTab';
import { PathSourceSettingsTab } from './tabs/pathSources/PathSourcesSettingsTab';
import { PrintSettingsTab } from './tabs/print/PrintSettingsTab';
import { ServerSettingsTab } from '../../base/settings/tabs/server/ServerSettingsTab';
import { KioskSettingsController } from './KioskSettingsController';
import { SettingsLocalization } from './SettingsLocalization';
import { KioskSettingsStore } from './KioskSettingsStore';

import { BaseRoutedComponent } from '../../../common/BaseRoutedComponent';
import { IMainRoutedProps } from '../../../common/props/IMainRoutedProps';
import { AppBar } from '../../../elements/AppBar';
import { Button } from '../../../elements/Button';
import { ButtonGroup } from '../../../elements/ButtonGroup';
import { OneLine } from '../../../elements/commons/OneLine';
import { RightContainer } from '../../../elements/commons/RightContainer';
import { Folder, FormatSize, Mail, Print, SettingsEthernet } from '../../../elements/Icons';
import { Tab } from '../../../elements/Tab';
import { TabPanel } from '../../../elements/TabPanel';
import { Tabs } from '../../../elements/Tabs';

@provider(KioskSettingsController, KioskSettingsStore)
@observer
/** */
export class KioskSettingsComponent extends BaseRoutedComponent<IMainRoutedProps> {
	@inject
	private readonly controller!: KioskSettingsController;

	@inject
	private readonly store!: KioskSettingsStore;

	/** */
	public componentDidMount(): void {
		this.controller.loadSettings();
	}

	/** */
	// public componentWillUnmount(): void {
	// }

	/** Отображение */
	public render(): React.ReactNode {

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
							label={SettingsLocalization.pathSourcesTab.title(language)}
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
						<PathSourceSettingsTab
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
						<EmailSettingsTab
							language={language}
							settings={settings.emailSettings}
							onChange={onEmailSettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={2}
					>
						<PrintSettingsTab
							language={language}
							settings={settings.printSettings}
							onChange={onPrintSettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={3}
					>
						<DesignSettingsTab
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
						<ServerSettingsTab
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
