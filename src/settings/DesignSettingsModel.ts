import { observable } from 'mobx';

/** Модель настроек приложения */
export interface DesignSettingsModel {
	/** */
	background?: string;

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
	public size?: DesignSizeEnum;
}

/** */
export enum DesignSizeEnum {
	small='small',
	medium='medium',
	// large='large',
}
