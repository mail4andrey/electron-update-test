// import { ButtonGroup, Button } from '@material-ui/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

import { BaseRoutedComponent } from './common/BaseRoutedComponent';
import { IMainRoutedProps } from './common/props/IMainRoutedProps';
import { Button } from './elements/Button';
import { ButtonGroup } from './elements/ButtonGroup';
import { Link } from './elements/Link';
import { LeftContainer } from './elements/ommons/LeftContainer';
import { OneLine } from './elements/ommons/OneLine';
import { RightContainer } from './elements/ommons/RightContainer';
import { Typography } from './elements/Typography';
import { SettingsLocalization } from './settings/SettingsLocalization';
import { ApplicationFront } from './src-front/ApplicationFront';
import { UrlHelper } from './src-front/helpers/UrlHelper';
import { KioskLocalization } from './src-front/localization/KioskLocalization';

@observer
/** Основное окно приложения */
export class App extends BaseRoutedComponent<IMainRoutedProps> {
	@observable
	private hostname?: string;

	@observable
	private localIp?: string;

	/** */
	public componentDidMount(): void {
		this.localIp = `http:\\\\${UrlHelper.getLocalIp()}:8001`;
		this.hostname = `http:\\\\${UrlHelper.getHostName()}:8001`;
	}

	/** Отображение */
	public render(): React.ReactNode {
		return (
			<>
				<OneLine className='padding-left-12px padding-right-12px box-sizing-border-box'>
					<h1>{KioskLocalization.administrative}</h1>
					<RightContainer>
						<ButtonGroup>
							<Button
								color='default'
								onClick={this.onSettingsClick}
							>
								{SettingsLocalization.title}
							</Button>
						</ButtonGroup>
					</RightContainer>
				</OneLine>
				<Typography
					align='center'
					variant='h6'
				>
					{this.localIp}
				</Typography>
				<Typography
					align='center'
					variant='h6'
				>
					{this.hostname}
				</Typography>
				{/* <Link target="_blank">
				</Link> */}

				<ApplicationFront/>
				{/* <Link to='/settings'>{'Settings'}</Link>
				<Link to='/profile'>{'Go back to profile'}</Link>
				<div>
					<ButtonGroup
						variant='contained'
						color='primary'
					>
						<Button
							color='primary'
						>
							{'Start'}
						</Button>
						<Button
							color='secondary'
						>
							{'Stop'}
						</Button>
						<Button
							color='default'
						>
							{'Test'}
						</Button>
					</ButtonGroup>
				</div> */}
			</>
		);
	}

	/** */
	private readonly onSettingsClick = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		this.navigateTo('settings');
	};
}
