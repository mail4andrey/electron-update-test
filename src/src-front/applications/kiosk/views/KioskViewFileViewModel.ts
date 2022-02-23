/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';

import { KioskItemStateEnum } from './KioskItemStateEnum';

import { PrintSendingItemModel } from '../../../../applications/kiosk/settings/PrintSendingItemModel';


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
	public isSelected = false;

	/** Средний кадр видео в base64 */
	public middleImage?: PrintSendingItemModel;

	public filename?: string;

	public dirname?: string;

	public fullpath?: string;

	public fileSize?: number;

	public extension?: string;

}
