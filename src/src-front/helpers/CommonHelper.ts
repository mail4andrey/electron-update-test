import { CommonLocalization } from '../localization/CommonLocalization';
import { LanguageEnum } from '../models/LanguageEnum';

interface iName {
	name?: string;
}

export class CommonHelper {
	public static getFreeName(items: {name?: string}[], language?: LanguageEnum): string {
		const basename = CommonLocalization.newItem(language);
		let findname = basename;
		let foundedName = false;
		let index = 0
		do {
			const item = items.find(item => item.name === findname);
			if (!item) {
				foundedName = true;
			} else {
				index++;
				findname = basename + ' ' + index;
			}
		} while (!foundedName);
		return findname;
	}
}