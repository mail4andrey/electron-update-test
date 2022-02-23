import { remote } from 'electron';

import fs from 'fs';
import path from 'path';

import { PathSourceFileModel } from '../src-front/models/PathSourceFileModel';
import { PathSourceFilesModel } from '../src-front/models/PathSourceFilesModel';

/** */
export class FilesHelper {
	/** aa */
	public static getUserFolder(subFolder: string, app?: Electron.App): string {
		const application = app ?? remote.app;
		const userData = application.getPath('userData');
		const folder = path.join(userData, subFolder);
		return folder;
	}

	/** */
	public static getFiles(directories?: string[]): PathSourceFilesModel[] {
		if (!directories) {
			return [];
		}

		const result: PathSourceFilesModel[] = [];
		for (const dirname of directories) {
			if (!dirname || !fs.existsSync(dirname)) {
				continue;
			}

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

		return result;
	}
}
