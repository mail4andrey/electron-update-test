/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MemoryRouter, Route } from 'react-router-dom';

import { App } from './App';
import Profile from './Profile';
// console.log('👋 This message is being logged by "renderer.js", included via webpack');
ReactDOM.render(
	<React.StrictMode>
		<MemoryRouter>
			<div className="App">
				<Route
					path='/'
					exact={true}
					component={App} />
				<Route
					path="/profile"
					exact
					component={Profile} />
				{/* <Route path="/Profile" exact component={Profile} /> */}
			</div>
		</MemoryRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
