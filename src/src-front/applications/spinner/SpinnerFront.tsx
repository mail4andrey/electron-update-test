/* eslint-disable import/no-unassigned-import */
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';

import '../../content/style/normalize.css';
import '../../content/style/index.css';

import { StringHelper } from '../../helpers/StringHelper';
import { DesignSettingsModel } from '../../models/DesignSettingsModel';
import SpinnerView from './views/SpinnerView';

import { Loader } from '../../../elements/Loader';
import { SettingsProxy } from '../../../helpers/proxy/SettingsProxy';
import { provider, inject } from 'react-ioc';
import { EventLogger } from '../../../helpers/EventLogger';

/** Приложение */
@provider(EventLogger)
@observer
export class SpinnerFront extends React.PureComponent {
	@inject
	private eventLogger!: EventLogger;

	@observable
	private loaded = false;

	@observable
	private settings?: DesignSettingsModel;

	private readonly client = new SettingsProxy();

	/** */
	public async componentDidMount(): Promise<void> {
		this.settings = await this.client.getSettings();
		const { titleFrontPage } = this.settings;
		document.title = titleFrontPage && titleFrontPage.length > 0 ? titleFrontPage : StringHelper.capitalizeFirstLetter(process.env.APPLICATION);
		this.loaded = true;
		this.eventLogger.info('Settings is loaded');
	}

	/** Отображение */
	public render(): React.ReactNode {
		if (!this.loaded) {
			return (
				<Loader
					verticalCentered={true}
				/>
			);
		}

		const background = this.settings?.background ?? 'white';
		return (
			<div
				className='height-min-100vh'
				style={{ background }}
			>
				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right'
					}}
				>
					<SpinnerView
						title={this.settings?.titleFrontPage}
						backgroundToolbar={this.settings?.backgroundToolbar}
						backgroundGroupName={this.settings?.backgroundGroupName}
						backgroundFileCard={this.settings?.backgroundFileCard}
						iconColor={this.settings?.iconColor}
					/>
				</SnackbarProvider>
			</div>
		);
	}
}
