import { inject } from 'react-ioc';

import { KioskViewStore } from './KioskViewStore';

import { FilesModel } from '../helpers/FilesModel';
import { UrlHelper } from '../helpers/UrlHelper';


/** */
export class KioskViewController {
	@inject
	private readonly store!: KioskViewStore;

	/** */
	public loadFiles = async (): Promise<void> => {
		this.store.loading = true;
		const url = UrlHelper.getUrl('files');
		// const { pathSources } = ApplicationSettingsStore.settings;
		// src={`http://localhost:8001/file?name=${encodeURI(file.fullpath ?? '')}`}
		const response = await fetch(url);
		if (response.ok) { // если HTTP-статус в диапазоне 200-299
			console.dir(response);
			const allFiles = await response.json() as FilesModel[];
			this.store.files = allFiles;
		} else {
			console.error(`Ошибка HTTP: ${response.status}`);
		}
		this.store.loading = false;

		// const allFiles: KioskViewFileViewModel[] = [];
		// if (!pathSources) {
		// 	this.store.files = allFiles;
		// 	return;
		// }


		// for (const directory of pathSources) {
		// const files = fs.readdirSync(directory, { withFileTypes: true })
		// 	.filter((item: fs.Dirent) => !item.isDirectory())
		// 	.map((item: fs.Dirent) => item.name);

		// // const files = await glob(`${directory}*.mp4`);
		// const filesView = files.map((file: string) => {
		// 	const fileView = new KioskViewFileViewModel();
		// 	fileView.filename = file;
		// 	fileView.extension = path.extname(file);
		// 	fileView.fullpath = path.join(directory, file);
		// 	fileView.dirname = directory;
		// 	return fileView;
		// });
		// allFiles.push(...filesView);
		// }
	};
}
