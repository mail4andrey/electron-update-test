// import { ButtonGroup, Button } from '@material-ui/core';
import React from 'react';

import { BaseRoutedComponent } from './common/BaseRoutedComponent';
import { IMainRoutedProps } from './common/props/IMainRoutedProps';
import { Button } from './elements/Button';
import { ButtonGroup } from './elements/ButtonGroup';
import { LeftContainer } from './elements/ommons/LeftContainer';
import { OneLine } from './elements/ommons/OneLine';
import { RightContainer } from './elements/ommons/RightContainer';
import { SettingsLocalization } from './settings/SettingsLocalization';
import { ApplicationFront } from './src-front/ApplicationFront';


/** Основное окно приложения */
export class App extends BaseRoutedComponent<IMainRoutedProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<div>
				<OneLine>
					<LeftContainer>
						<h1>{'Application'}</h1>
					</LeftContainer>
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
			</div>
		);
	}

	/** */
	private readonly onSettingsClick = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		this.navigateTo('settings');
	};
}
