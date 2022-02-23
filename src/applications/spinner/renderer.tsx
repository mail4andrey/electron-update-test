import React from 'react';
import ReactDOM from 'react-dom';
import '../../src-front/content/style/normalize.css';
import '../../src-front/content/style/index.css';
import type { RouteComponentProps } from 'react-router-dom';
import { MemoryRouter, Route } from 'react-router-dom';

import { SpinnerSettingsComponent } from './settings/SpinnerSettingsComponent';

import { Layout } from '../../Layout';
import { SpinnerFront } from '../../src-front/applications/spinner/SpinnerFront';
import { MainWindowPage } from '../MainWindowPage';

/** */
export class Spinner {
	/** */
	public static render(): void {
		/** */
		const getLayout = (props: RouteComponentProps): React.ReactNode => (
			<MainWindowPage {...props}>
				<SpinnerFront/>
			</MainWindowPage>
		);


		ReactDOM.render(
			(
				<Layout>
					<MemoryRouter>
						<div className=''>
							<Route
								path='/'
								exact={true}
								render={getLayout}
							/>
							<Route
								path="/settings"
								exact
								component={SpinnerSettingsComponent}
							/>
						</div>
					</MemoryRouter>
				</Layout>
			),
			document.getElementById('root')
		);
	}
}
