/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';

import { KioskItemStateEnum } from './KioskItemStateEnum';

import { PrintSendingItemModel } from '../../settings/PrintSendingItemModel';


/** */
export class KioskViewFilesViewModel {
	@observable
	public files: KioskViewFileViewModel[] = [];

	public dirname?: string;
}

/** */
export class KioskViewFileViewModel {

	@observable
	public state?: KioskItemStateEnum = KioskItemStateEnum.Initializing;

	@observable
	public isSelected?: boolean;

	/** Средний кадр видео в base64 */
	public middleImage?: PrintSendingItemModel;

	// @observable
	public filename?: string;

	// @observable
	public dirname?: string;

	// @observable
	public fullpath?: string;

	public fileSize?: number;

	// @observable
	public extension?: string;

	// public featured?: boolean;
}
