import { observer } from 'mobx-react';
import React from 'react';
import { inject, provider } from 'react-ioc';

import { ClipmakerSettingsController } from './ClipmakerSettingsController';
import { ClipmakerSettingsStore } from './ClipmakerSettingsStore';
import { SettingsLocalization } from '../../base/settings/SettingsLocalization';
import { DesignSettingsTab } from '../../base/settings/tabs/design/DesignSettingsTab';
import { GoProSettingsTab } from '../../base/settings/tabs/goPro/GoProSettingsTab';
import { IntroOutroSettingsTab } from '../../base/settings/tabs/introOutro/IntroOutroSettingsTab';
import { PathSourcesSettingsTab } from '../../base/settings/tabs/pathSources/PathSourcesSettingsTab';
import { VideoSettingsTab } from '../../base/settings/tabs/video/VideoSettingsTab';

import { BaseRoutedComponent } from '../../../common/BaseRoutedComponent';
import type { IMainRoutedProps } from '../../../common/props/IMainRoutedProps';
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
import { OverlaySettingsTab } from '../../base/settings/tabs/overlay/OverlaySettingsTab';
import { AudioSettingsTab } from '../../base/settings/tabs/audio/AudioSettingsTab';

/**
 *
 */
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

	/** Отображение */
	public render(): React.ReactNode {
		const { settings, tabSelected, language } = this.store;
		return (
			<div>
				<OneLine className='padding-left-12px box-sizing-border-box'>
					<h1>{SettingsLocalization.common.title(language)}</h1>
					<RightContainer className='padding-right-12px'>
						<ButtonGroup>
							<Button
								color='primary'
								onClick={this.onSaveClick}
							>
								{SettingsLocalization.common.saveButton(language)}
							</Button>
							<Button
								color='secondary'
								onClick={this.onCancelClick}
							>
								{SettingsLocalization.common.cancelButton(language)}
							</Button>
						</ButtonGroup>
					</RightContainer>
				</OneLine>

				<AppBar
					position='static'
					color='transparent'
				>
					<Tabs
						variant='scrollable'
						scrollButtons="on"
						indicatorColor="primary"
						textColor="primary"
						value={tabSelected}
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
							{...settings.pathSources}
							testPath='directory'
							language={language}
							onChange={this.controller.onPathSourceChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={1}
					>
						<GoProSettingsTab
							{...settings.goProSettings}
							language={language}
							onChange={this.controller.onGoProSettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={2}
					>
						<VideoSettingsTab
							{...settings.videoSettings}
							language={language}
							onChange={this.controller.onVideoSettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={3}
					>
						<IntroOutroSettingsTab
							{...settings.introOutroSettings}
							language={language}
							onChange={this.controller.onIntroOutroSettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={4}
					>
						<OverlaySettingsTab
							{...settings.overlaySettings}
							language={language}
							onChange={this.controller.onOverlaySettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={5}
					>
						<AudioSettingsTab
							{...settings.audioSettings}
							language={language}
							onChange={this.controller.onAudioSettingsChange}
						/>
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
							{...settings.designSettings}
							language={language}
							onChange={this.controller.onDesignSettingsChange}
						/>
					</TabPanel>
					<TabPanel
						value={tabSelected}
						index={8}
					>
						<ServerSettingsTab
							{...settings.serverSettings}
							language={language}
							onChange={this.controller.onServerSettingsChange}
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
