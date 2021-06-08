import { lookup } from 'dns';
import { networkInterfaces, hostname } from 'os';

// import { ApplicationSettingsController } from '../application/ApplicationSettingsController';

/** */
export class StringHelper {
	/** */
	public static capitalizeFirstLetter(value?: string): string {
		if (!value) {
			return '';
		}
		if (value.length <= 1) {
			return value.toUpperCase();
		}

		return value.charAt(0).toUpperCase() + value.slice(1);
	}
}
