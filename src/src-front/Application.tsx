import * as React from 'react';
// import { hot } from 'react-hot-loader';
// import { provider } from 'react-ioc';
import { BrowserRouter } from 'react-router-dom';

import { KioskView } from './views/KioskView';

// import { AuthLayoutComponent } from 'common/components/AuthLayoutComponent';
// import LayoutComponent from 'common/components/LayoutComponent';
// import { NotificationLayout } from 'common/components/NotificationLayout';
// import { ClientLogController } from 'common/controllers/ClientLogController';
// import { EventLogger } from 'common/controllers/EventLogger';
// import { ClientLogProxy } from 'common/proxies/ClientLogProxy';
// import { ApplicationVersionStore, AuthDataStore } from 'common/stores';
// import { EventNotificator, TimerFactory, RouteHelper } from 'core';


/** Приложение */
// @provider(
// 	ClientLogProxy,
// 	ClientLogController,
// 	EventLogger,
// 	TimerFactory,
// 	AuthDataStore,
// 	ApplicationVersionStore,
// 	EventNotificator
// )
class Application extends React.Component {

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
			<div>
				{/* <OneLine>
					<LeftContainer>
						<h1>{'Application'}</h1>
					</LeftContainer>
					<RightContainer>
						<ButtonGroup>
							<Button
								color='default'
								onClick={this.onSettingsClick}
							>
								{SettingsLocalization.title}
							</Button>
						</ButtonGroup>
					</RightContainer>
				</OneLine> */}
				<KioskView/>
			</div>
		);
	}
}

// export default process.env.NODE_ENV === 'development'
// 	? hot(module)(Application)
// 	: Application;
export default Application;
