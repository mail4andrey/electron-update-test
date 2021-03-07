import { observable } from 'mobx';

/** */
export class KioskViewFileViewModel {
	// @observable
	public filename?: string;

	// @observable
	public dirname?: string;

	// @observable
	public fullpath?: string;

	public fileSize?: number;

	// @observable
	public extension?: string;

	public featured?: boolean;

	// @observable
	public isSelected?: boolean;
}
