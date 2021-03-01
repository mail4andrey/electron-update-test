import { FilesModel } from './FilesModel';

import fs from 'fs';
import path from 'path';

/** */
export class FilesHelper {
	/** */
	public static getFiles(directories?: string[]): FilesModel[] {
		if (!directories) {
			return [];
		}

		const allFiles: FilesModel[] = [];
		for (const directory of directories) {
			const files = fs.readdirSync(directory, { withFileTypes: true })
				.filter((item: fs.Dirent) => !item.isDirectory())
				.map((item: fs.Dirent) => item.name);

			// const files = await glob(`${directory}*.mp4`);
			const filesView = files.map((file: string) => {
				const fileView = new FilesModel();
				fileView.filename = file;
				fileView.extension = path.extname(file);
				fileView.fullpath = path.join(directory, file);
				fileView.dirname = directory;
				return fileView;
			});
			allFiles.push(...filesView);
		}

		return allFiles.sort((a: FilesModel, b: FilesModel) => a.filename.localeCompare(b.filename) * -1);
	}
}
