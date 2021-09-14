import { networkInterfaces, hostname } from 'os';

import fs from 'fs';
import path from 'path';

/** */
export class FileHelper {
	/** */
	public static async writeFile(blob: Blob | null, destonation: string, filename: string): Promise<void> {
		if (!blob
			|| !destonation) {
			return;
		}

		const fullname = path.join(destonation, filename);
		// const settingsPath = path.dirname(destonation);
		if (!fs.existsSync(destonation)) {
			fs.mkdirSync(destonation);
		}

		const buffer = Buffer.from( await blob.arrayBuffer() );

		// const fileData = JSON.stringify(settings);
		// fs.writeFileSync(destonation, fileData, { encoding: 'utf-8' });
		// fs.writeFileSync(destonation, blob, { encoding: 'utf-8' });
		return new Promise((resolve, reject) => {
			fs.writeFile(fullname, buffer, () => resolve() );
			// fs.writeFile(fullname, buffer, () => console.log('video saved!') );
		});
	}
}
