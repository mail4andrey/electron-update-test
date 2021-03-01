import { inject } from 'react-ioc';

import { KioskViewStore } from './KioskViewStore';

import { FilesModel } from '../helpers/FilesModel';
import { UrlHelper } from '../helpers/UrlHelper';


/** */
export class KioskViewController {
	/** */
	@inject
	private readonly store!: KioskViewStore;

	/** */
	public loadFiles = async (): Promise<void> => {
		this.store.loading = true;
		const url = UrlHelper.getUrl('files');
		const response = await fetch(url);
		if (response.ok) {
			console.dir(response);
			const allFiles = await response.json() as FilesModel[];
			this.store.files = allFiles;
		} else {
			console.error(`Ошибка HTTP: ${response.status}`);
		}
		this.store.loading = false;
	};
}
