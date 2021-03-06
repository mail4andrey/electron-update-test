import * as LocalStorage from 'local-storage';
// import { ButtonGroup, Button } from '@material-ui/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';


import { BaseApplicationSettingsModel } from './base/settings/BaseApplicationSettingsModel';

import { ApplicationSettingsController } from '../application/ApplicationSettingsController';
import { BaseRoutedComponent } from '../common/BaseRoutedComponent';
import { IMainRoutedProps } from '../common/props/IMainRoutedProps';
import { OneLine } from '../elements/commons/OneLine';
import { RightContainer } from '../elements/commons/RightContainer';
import { Grid } from '../elements/Grid';
import { IconButton } from '../elements/IconButton';
import { Settings } from '../elements/Icons';
import { Typography } from '../elements/Typography';
import { UrlConsts } from '../src-front/const/UrlConsts';
import { UrlHelper } from '../src-front/helpers/UrlHelper';
import { KioskLocalization } from '../src-front/localization/KioskLocalization';
import { LanguageSettingsLocalStorage } from '../src-front/views/KioskSettingsLocalStorage';
import { LanguageEnum } from '../src-front/views/LanguageEnum';

@observer
/** Основное окно приложения */
export class MainWindowPage extends BaseRoutedComponent<IMainRoutedProps> {
	@observable
	private port?: number;

	@observable
	private hostname?: string;

	@observable
	private localIp?: string;

	@observable
	private language?: LanguageEnum;

	/** */
	public componentDidMount(): void {
		const applicationController = new ApplicationSettingsController();
		const settings = applicationController.loadDefaultSettings<BaseApplicationSettingsModel>();
		const port = settings.serverSettings?.port ?? Number(process.env.DEFAULTPORT);

		this.localIp = `http://${UrlHelper.getLocalIp()}:${port}`;
		this.hostname = `http://${UrlHelper.getHostName()}:${port}`;
		UrlHelper.setport(port);
		this.port = port;
		// location.host = this.hostname;

		const localSettings = LocalStorage.get<LanguageSettingsLocalStorage>('language-settings') as LanguageSettingsLocalStorage|undefined;
		// this.store.groupBy = localSettings?.groupBy;
		// this.store.currentItemSize = localSettings?.size;
		// this.store.sortOrder = localSettings?.sortOrder;
		this.language = localSettings?.language;
	}

	/** Отображение */
	public render(): React.ReactNode {
		const frontPage = this.getFrontPage(this.port);
		return (
			<>
				<Grid
					container={true}
					direction='row'
					justify='space-evenly'
				>
					<Grid
						item={true}
					>
						<Typography
							align='center'
							variant='h6'
						>
							{this.localIp}
						</Typography>
					</Grid>
					<Grid
						item={true}
					>
						<Typography
							align='center'
							variant='h6'
						>
							{this.hostname}
						</Typography>
					</Grid>
				</Grid>
				<OneLine className='padding-left-12px padding-right-12px box-sizing-border-box'>
					<h1>{KioskLocalization.administration(this.language)}</h1>
					<RightContainer>
						<IconButton
							onClick={this.onSettingsClick}
						>
							<Settings />
						</IconButton>
					</RightContainer>
				</OneLine>
				{frontPage}
			</>
		);
	}

	/** */
	private readonly getFrontPage = (port?: number): React.ReactNode => {
		if (!port) {
			return null;
		}
		return this.props.children;
	}
	;

	/** */
	private readonly onSettingsClick = (_event: React.MouseEvent<Element, MouseEvent>): void => {
		this.navigateTo(UrlConsts.settingsUrl);
	};
}
