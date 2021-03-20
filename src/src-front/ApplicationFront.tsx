/* eslint-disable import/no-unassigned-import */
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';

import KioskView from './views/KioskView';

import './content/style/normalize.css';
import './content/style/index.css';

import { Loader } from '../elements/Loader';
import { SettingsProxy } from '../helpers/SettingsProxy';
import { DesignSettingsModel } from '../settings/DesignSettingsModel';

@observer
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

	@observable
	private loaded = false;

	@observable
	private settings?: DesignSettingsModel;

	private readonly client = new SettingsProxy();

	/** */
	public async componentDidMount(): Promise<void> {
		this.settings = await this.client.getSettings();
		this.loaded = true;
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

		const background = this.settings?.background ?? 'transparent';
		return (
			<div
				className='height-min-100vh'
				style={{ background }}
			>
				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
				>
					<KioskView
						size={this.settings?.size}
					/>
				</SnackbarProvider>
			</div>
		);
	}
}

// export default process.env.NODE_ENV === 'development'
// 	? hot(module)(Application)
// 	: Application;
