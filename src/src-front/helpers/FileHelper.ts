import fs from 'fs';
import path from 'path';
import mv from 'mv';

/** */
export class FileHelper {
	/** */
	public static async writeFile(blob: Blob | null, destonation: string, filename: string): Promise<void> {
		if (!blob
			|| !destonation) {
			return;
		}

		const fullname = path.join(destonation, filename);
		if (!fs.existsSync(destonation)) {
			fs.mkdirSync(destonation);
		}

		const buffer = Buffer.from( await blob.arrayBuffer() );

		return new Promise((resolve, reject) => {
			fs.writeFile(fullname, buffer, () => resolve() );
		});
	}
	/** */
	public static async moveFile(sourceFile: string | undefined, pathDestination: string | undefined) {
		if (!sourceFile || !pathDestination) {
			return;
		}

		return new Promise((resolve, reject) => {
			mv(sourceFile, pathDestination, function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		});
	}
}
