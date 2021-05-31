import React from 'react';
import ReactDOM from 'react-dom';
import '../../src-front/content/style/normalize.css';
import '../../src-front/content/style/index.css';
import { MemoryRouter, Route } from 'react-router-dom';

import { App } from '../../App';
import { Layout } from '../../Layout';
import { SettingsComponent } from '../../settings/SettingsComponent';
ReactDOM.render(
	(
		<Layout>
			<MemoryRouter>
				<div className="clipmaker">
					<Route
						path='/'
						exact={true}
						component={App} />
					<Route
						path="/settings"
						exact
						component={SettingsComponent} />
				</div>
			</MemoryRouter>
		</Layout>
	),
	document.getElementById('root')
);
