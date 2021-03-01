import { observable } from 'mobx';

import { KioskViewFileViewModel } from './KioskViewFileViewModel';

/** */
export class KioskViewStore {
	@observable
	public loading = false;

	@observable
	public files: KioskViewFileViewModel[] = [];
}

