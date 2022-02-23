import React from 'react';
import ReactDOM from 'react-dom';
import '../../src-front/content/style/normalize.css';
import '../../src-front/content/style/index.css';
import type { RouteComponentProps } from 'react-router-dom';
import { MemoryRouter, Route } from 'react-router-dom';

import { ClipmakerSettingsComponent } from './settings/ClipmakerSettingsComponent';

import { Layout } from '../../Layout';
import { ClipmakerFront } from '../../src-front/applications/clipmaker/ClipmakerFront';
import { MainWindowPage } from '../MainWindowPage';

/** */
export class Clipmaker {
	/** */
	public static render(): void {
		/** */
		const getLayout = (props: RouteComponentProps): React.ReactNode => (
			<MainWindowPage {...props}>
				<ClipmakerFront/>
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
