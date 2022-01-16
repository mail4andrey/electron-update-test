import { LanguageEnum } from '../models/LanguageEnum';

/** */
export class CommonLocalization {
	/** */
	public static newItem = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'New item' : 'Новое значение';
	/** */
	public static title = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Name' : 'Название';
}
