import { observable } from 'mobx';

import { KioskViewFileViewModel } from './KioskViewFileViewModel';

/** */
export class KioskViewStore {
	@observable
	public loading = false;

	@observable
	public filesSelected = 0;

	@observable
	public files: KioskViewFileViewModel[] = [];

	@observable
	public openAlert?: string;

	@observable
	public alerts?: string;

	@observable
	public sending = false;

	public email?: string;
}

