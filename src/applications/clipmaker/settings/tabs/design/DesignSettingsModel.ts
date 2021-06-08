import { observable } from 'mobx';

import { DesignSettingsModel } from '../../../../../src-front/models/DesignSettingsModel';

/** Модель настроек приложения */
export class DesignSettingsViewModel implements DesignSettingsModel {
	@observable
	/** */
	public background = 'white';

	@observable
	/** */
	public backgroundToolbar = 'gray';

	@observable
	/** */
	public backgroundGroupName = 'gray';

	@observable
	/** */
	public backgroundFileCard = 'gray';

	@observable
	/** */
	public iconColor = 'gray';

	// @observable
	// /** */
	// public size?: DesignSizeEnum;

	@observable
	// Редактирование тесктового поля
	/** */
	public titleFrontPage = '';
}

