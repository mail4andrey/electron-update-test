import { observer } from 'mobx-react';
import React from 'react';
import { inject, provider } from 'react-ioc';

import { ClipmakerSettingsController } from './ClipmakerSettingsController';
import { ClipmakerSettingsStore } from './ClipmakerSettingsStore';
import { SettingsLocalization } from './SettingsLocalization';
import { DesignSettingsTab } from './tabs/design/DesignSettingsTab';
import { GoProSettingsTab } from './tabs/goPro/GoProSettingsTab';
import { PathSourcesSettingsTab } from './tabs/pathSources/PathSourcesSettingsTab';


import { BaseRoutedComponent } from '../../../common/BaseRoutedComponent';
import { IMainRoutedProps } from '../../../common/props/IMainRoutedProps';
import { AppBar } from '../../../elements/AppBar';
import { Button } from '../../../elements/Button';
import { ButtonGroup } from '../../../elements/ButtonGroup';
import { OneLine } from '../../../elements/commons/OneLine';
import { RightContainer } from '../../../elements/commons/RightContainer';
import { Audiotrack, Camera, Folder, FormatSize, Movie, MovieFilter, PictureInPicture, SettingsEthernet, SwitchVideo } from '../../../elements/Icons';
import { Tab } from '../../../elements/Tab';
import { TabPanel } from '../../../elements/TabPanel';
import { Tabs } from '../../../elements/Tabs';
import { ServerSettingsTab } from '../../base/settings/tabs/server/ServerSettingsTab';

@provider(ClipmakerSettingsController, ClipmakerSettingsStore)
@observer
/** */
export class ClipmakerSettingsComponent extends BaseRoutedComponent<IMainRoutedProps> {
	@inject
	private readonly controller!: ClipmakerSettingsController;

	@inject
	private readonly store!: ClipmakerSettingsStore;

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
			onPathSourceChange,
			onDesignSettingsChange,
			onServerSettingsChange,
			onGoProSettingsChange
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
							icon={<Folder/>}
						/>
						<Tab
							label={SettingsLocalization.goProTab.title(language)}
							index={1}
							icon={<Camera/>}
						/>
						<Tab
							label={SettingsLocalization.videoTab.title(language)}
							index={2}
							icon={<Movie/>}
						/>
						<Tab
							label={SettingsLocalization.introOutroTab.title(language)}
							index={3}
							icon={<SwitchVideo/>}
						/>
						<Tab
							label={SettingsLocalization.overlayTab.title(language)}
							index={4}
							icon={<PictureInPicture/>}
						/>
						<Tab
							label={SettingsLocalization.audioTab.title(language)}
							index={5}
							icon={<Audiotrack/>}
						/>
						<Tab
							label={SettingsLocalization.transitionTab.title(language)}
							index={6}
							icon={<MovieFilter/>}
						/>
						<Tab
							label={SettingsLocalization.designTab.title(language)}
							index={7}
							icon={<FormatSize/>}
						/>
						<Tab
							label={SettingsLocalization.serverTab.title(language)}
							index={8}
							icon={<SettingsEthernet/>}
						/>
					</Tabs>
					<TabPanel
						value={tabSelected}
						index={0}
					>
						<PathSourcesSettingsTab
							language={language}
							pathSource={settings.pathSources.pathSource}
							pathTestSource={settings.pathSources.pathTestSource}
							pathDestination={settings.pathSources.pathDestination}
							fileNamePattern={settings.pathSources.fileNamePattern}
							// settings={settings.pathSources}
							// onPathSourceAdd={onPathSourceAdd}
							onChange={onPathSourceChange}
							// onPathSourceUp={onPathSourceUp}
							// onPathSourceDown={onPathSourceDown}
							// onPathSourceDelete={onPathSourceDelete}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={1}
					>
						<GoProSettingsTab
							language={language}
							removeFromGoPro={settings.goProSettings.removeFromGoPro}
							showColorStateGoPro={settings.goProSettings.showColorStateGoPro}
							onChange={onGoProSettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={2}
					>
						{/* <PrintSettingsTab
							language={language}
							settings={settings.printSettings}
							onChange={onPrintSettingsChange}
						/> */}
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={3}
					>
						{/* <PrintSettingsTab
							language={language}
							settings={settings.printSettings}
							onChange={onPrintSettingsChange}
						/> */}
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={4}
					>
						{/* <PrintSettingsTab
							language={language}
							settings={settings.printSettings}
							onChange={onPrintSettingsChange}
						/> */}
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={5}
					>
						{/* <PrintSettingsTab
							language={language}
							settings={settings.printSettings}
							onChange={onPrintSettingsChange}
						/> */}
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={6}
					>
						{/* <PrintSettingsTab
							language={language}
							settings={settings.printSettings}
							onChange={onPrintSettingsChange}
						/> */}
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={7}
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
						index={8}
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
