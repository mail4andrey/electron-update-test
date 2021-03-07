
import fs from 'fs';
import path from 'path';

import { FilesModel } from '../src-front/models/FilesModel';

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
				const fullpath = path.join(directory, file);
				const fileView = new FilesModel();
				fileView.filename = file;
				fileView.extension = path.extname(file);
				fileView.fullpath = fullpath;
				fileView.dirname = directory;
				const stats = fs.statSync(fullpath);
				const fileSizeInBytes = stats.size;
				// Convert the file size to megabytes (optional)
				// const fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
				fileView.fileSize = fileSizeInBytes;
				return fileView;
			});
			allFiles.push(...filesView);
		}

		return allFiles.sort((a: FilesModel, b: FilesModel) => a.filename.localeCompare(b.filename) * -1);
	}
}
