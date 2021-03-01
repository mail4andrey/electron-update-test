
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/layout';
import routes from './routes';

/** */
export default () => (
	<Layout>
		<Switch>
			{
				routes.map(props => {
          props.component = require(`./${props.componentName}`); // eslint-disable-line
          if (props.component.default) { // eslint-disable-line
            props.component = props.component.default; // eslint-disable-line
					}
          return <Route key={props.path} {...props} />; // eslint-disable-line
				})
			}
		</Switch>
	</Layout>
);
