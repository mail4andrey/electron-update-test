import { PureComponent } from 'react';

import { ApplicationSettingsController } from './application/ApplicationSettingsController';
import { IBasicProps } from './common/props/IBasicProps';

/** Основное окно приложения */
export class Layout extends PureComponent<IBasicProps> {
	/** */
	// public componentDidMount(): void {
	// 	ApplicationSettingsController.loadDefaultSettings();
	// }

	// /** */
	// public componentWillUnmount(): void {
	// 	ApplicationSettingsController.saveDefaultSettings();
	// }

	/** Отображение */
	public render(): React.ReactNode {
		return this.props.children;
	}
}
