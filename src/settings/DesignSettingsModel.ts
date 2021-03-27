import { observable } from 'mobx';

/** Модель настроек приложения */
export interface DesignSettingsModel {
	/** */
	titleFrontPage?: string;
	/** */
	background?: string;

	/** */
	backgroundToolbar?: string;

	/** */
	backgroundGroupName?: string;

	/** */
	backgroundFileCard?: string;

	/** */
	size?: DesignSizeEnum;
}

/** Модель настроек приложения */
export class DesignSettingsViewModel implements DesignSettingsModel {
	@observable
	/** */
	public background?: string;

	@observable
	/** */
	public backgroundToolbar?: string;

	@observable
	/** */
	public backgroundGroupName?: string;

	@observable
	/** */
	public backgroundFileCard?: string;

	@observable
	/** */
	public size?: DesignSizeEnum;

	// @observable
	// Редактирование тесктового поля
	/** */
	public titleFrontPage?: string;
}

/** */
export enum DesignSizeEnum {
	small='small',
	medium='medium',
	// large='large',
}
