import React from 'react';
import ReactDOM from 'react-dom';
import '../../src-front/content/style/normalize.css';
import '../../src-front/content/style/index.css';
import type { RouteComponentProps } from 'react-router-dom';
import { MemoryRouter, Route } from 'react-router-dom';

import { ClipmakerSettingsComponent } from './settings/ClipmakerSettingsComponent';

import { Layout } from '../../Layout';
import { ApplicationFront } from '../../src-front/ApplicationFront';
import { MainWindowPage } from '../MainWindowPage';

/** */
export class Сlipmaker {
	/** */
	public static render(): void {
		/** */
		const getLayout = (props: RouteComponentProps): React.ReactNode => (
			<MainWindowPage {...props}>
				<ApplicationFront/>
			</MainWindowPage>
		);


		ReactDOM.render(
			(
				<Layout>
					<MemoryRouter>
						<div className="clipmaker">
							<Route
								path='/'
								exact={true}
								// component={App}
								render={getLayout}
							/>
							<Route
								path="/settings"
								exact
								component={ClipmakerSettingsComponent}
							/>
						</div>
					</MemoryRouter>
				</Layout>
			),
			document.getElementById('root')
		);
	}
}
