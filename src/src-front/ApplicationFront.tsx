/* eslint-disable import/no-unassigned-import */
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import KioskView from './views/KioskView';

import './content/style/normalize.css';
import './content/style/index.css';
import { SnackbarProvider } from 'notistack';

/** Приложение */
export class ApplicationFront extends React.PureComponent {

	/** ctor */
	// public constructor(props) {
	// 	super(props);
	// 	// todo при включении, при вводе в китовом инпуте каретка перескакивает в конец
	// 	/*setTimeout(() => {
	// 		configure({
	// 				reactionScheduler: f => {
	// 				setTimeout(f, MobXConsts.batchOperationsTimeout);
	// 			}
	// 		});
	// 	}, 0);*/
	// }

	/** Отображение */
	public render(): React.ReactNode {
		return (
			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				<KioskView/>
			</SnackbarProvider>
		);
	}
}

// export default process.env.NODE_ENV === 'development'
// 	? hot(module)(Application)
// 	: Application;
