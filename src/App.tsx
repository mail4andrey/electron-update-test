// import { ButtonGroup, Button } from '@material-ui/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

import { ApplicationSettingsController } from './application/ApplicationSettingsController';
import { BaseRoutedComponent } from './common/BaseRoutedComponent';
import { IMainRoutedProps } from './common/props/IMainRoutedProps';
import { Grid } from './elements/Grid';
import { IconButton } from './elements/IconButton';
import { Settings } from './elements/Icons';
import { OneLine } from './elements/commons/OneLine';
import { RightContainer } from './elements/commons/RightContainer';
import { Typography } from './elements/Typography';
import { ApplicationFront } from './src-front/ApplicationFront';
import { UrlHelper } from './src-front/helpers/UrlHelper';
import { KioskLocalization } from './src-front/localization/KioskLocalization';

@observer
/** Основное окно приложения */
export class App extends BaseRoutedComponent<IMainRoutedProps> {
	@observable
	private port?: number;

	@observable
	private hostname?: string;

	@observable
	private localIp?: string;

	/** */
	public componentDidMount(): void {
		const applicationController = new ApplicationSettingsController();
		const settings = applicationController.loadDefaultSettings();
		const port = settings.serverSettings?.port ?? 8001;

		this.localIp = `http://${UrlHelper.getLocalIp()}:${port}`;
		this.hostname = `http://${UrlHelper.getHostName()}:${port}`;
		UrlHelper.setport(port);
		this.port = port;
		// location.host = this.hostname;
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
					<h1>{KioskLocalization.administrative()}</h1>
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
		return <ApplicationFront/>;
	}
	;

	/** */
	private readonly onSettingsClick = (_event: React.MouseEvent<Element, MouseEvent>): void => {
		this.navigateTo('settings');
	};
}
