import { observable } from 'mobx';

/** Модель настроек приложения */
export interface PrinterModel {
	/** */
	name?: string;

	/** */
	displayName?: string;

	/** */
	isDefault?: boolean;
}
/** Модель настроек приложения */
export interface PrintSettingsModel {
	/** */
	printer?: string;

	/** */
	fitOnPage?: PrintFitOnPageEnum;

	/** */
	layout?: PrintLayoutEnum;
}
/** Модель настроек приложения */
export class PrintSettingsViewModel implements PrintSettingsModel {
	@observable
	/** */
	public printer?: string;

	@observable
	/** */
	public fitOnPage?: PrintFitOnPageEnum;

	@observable
	/** */
	public layout?: PrintLayoutEnum;
}

/** */
export enum PrintFitOnPageEnum {
	/** Вся страница с сохранением масштаба */
	cover='cover',

	/** На странице */
	contain='contain'
}

/** Положение */
export enum PrintLayoutEnum {
	/** Широкая */
	landscape='landscape',

	/** Портретная */
	portrait='portrait'
}
