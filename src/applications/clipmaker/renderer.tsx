import React from 'react';
import ReactDOM from 'react-dom';
import '../../src-front/content/style/normalize.css';
import '../../src-front/content/style/index.css';
import { MemoryRouter, Route, RouteComponentProps } from 'react-router-dom';

import { ClipmakerSettingsComponent } from './settings/ClipmakerSettingsComponent';

import { Layout } from '../../Layout';
import { ApplicationFront } from '../../src-front/ApplicationFront';
import { MainWindowPage } from '../MainWindowPage';

/** */
const getLayout = (props: RouteComponentProps): JSX.Element => (
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
