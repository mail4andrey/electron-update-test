import { observable } from 'mobx';

/**
 *
 */
export class KioskViewFileViewModel {
	@observable
	public filename?: string;

	@observable
	public dirname?: string;

	@observable
	public fullpath?: string;

	@observable
	public extension?: string;

	@observable
	public isSelected?: boolean;
}
