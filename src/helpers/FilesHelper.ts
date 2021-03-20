
import fs from 'fs';
import path from 'path';

import { PathSourceFileModel, PathSourceFilesModel } from '../src-front/models/FilesModel';

/** */
export class FilesHelper {
	/** */
	public static getFiles(directories?: string[]): PathSourceFilesModel[] {
		if (!directories) {
			return [];
		}

		const result: PathSourceFilesModel[] = [];
		for (const dirname of directories) {
			const files = fs.readdirSync(dirname, { withFileTypes: true })
				.filter((item: fs.Dirent) => !item.isDirectory())
				.map((item: fs.Dirent) => item.name);

			const filesView = files.map((filename: string) => {
				const fullpath = path.join(dirname, filename);
				const extension = path.extname(filename);
				const stats = fs.statSync(fullpath);
				const fileSize = stats.size;
				const fileView = {
					filename,
					extension,
					fullpath,
					dirname,
					fileSize
				} as PathSourceFileModel;
				return fileView;
			});
			const pathSourceFilesModel = {
				dirname,
				files: filesView
			} as PathSourceFilesModel;
			result.push(pathSourceFilesModel);
		}

		// .sort((a: PathSourceFilesModel, b: PathSourceFilesModel) => a.filename.localeCompare(b.filename) * -1);
		return result;
	}
}
