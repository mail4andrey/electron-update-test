/* eslint-disable no-confusing-arrow */
/* eslint-disable max-classes-per-file */
import plural from 'plural-ru';

import { LanguageEnum } from '../views/LanguageEnum';

/** */
export class KioskLocalization {
	/** */
	public static administrative = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Administrative' : 'Администрирование';

	/** */
	public static sendEmailToError = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Enter email' : 'Укажите куда отправить письмо';

	/** */
	public static selectedFilesError = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Select files' : 'Выберите файл';

	/** */
	public static sendEmail = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Send enail' : 'Отправить письмо';

	/** */
	public static sendEmailTo = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Where to send email' : 'Куда отправить письмо';

	/** */
	// public static labelEmailTo = (language?: LanguageEnum): string =>
	// 	language !== LanguageEnum.rus ? 'Email' : 'Email';

	/** */
	public static print = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Print' : 'Распечатать';

	/** */
	public static printMiddleFrame = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Print middle frame' : 'Распечатать средний кадр';

	/** */
	public static printCurrentFrame = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Print current frame' : 'Распечатать текущий кадр';

	/** */
	// public static languageTitle = (language?: LanguageEnum): string =>
	// 	language !== LanguageEnum.rus ? 'Change language' : 'Изменить язык';

	/** */
	public static languageDescription = (language?: LanguageEnum): string => {
		switch (language) {
			case LanguageEnum.rus:
				return 'Рус';
			case LanguageEnum.eng:
			default:
				return 'Eng';
		}
	};

	/** */
	public static notificationSendedByEmail = (count: number, language?: LanguageEnum): string => language !== LanguageEnum.rus ? `${count === 1 ? '1 file' : `${count} files`} sended to email` : `${plural(count, '%d файл', '%d файла', '%d файлов')} отправлено на почту`;

	/** */
	public static notificationSendedByEmailError = (count: number, language?: LanguageEnum): string => language !== LanguageEnum.rus ? `Error when sending ${count === 1 ? '1 file' : `${count} files`} to email` : `Ошибка при отправке ${plural(count, '%d файла', '%d файлов')} на почту`;

	/** */
	public static notificationSendingByEmail = (count: number, language?: LanguageEnum): string => language !== LanguageEnum.rus ? `${count === 1 ? '1 file' : `${count} files`} sending to email` : `${plural(count, '%d файл', '%d файла', '%d файлов')} отправляется на почту`;

	/** */
	public static notificationPrinted = (count: number, language?: LanguageEnum): string => language !== LanguageEnum.rus ? `${count === 1 ? '1 file' : `${count} files`} sended to print` : `${plural(count, '%d файл', '%d файла', '%d файлов')} отправлен на печать`;

	/** */
	public static notificationPrintedError = (count: number, language?: LanguageEnum): string => language !== LanguageEnum.rus ? `Error when sending ${count === 1 ? '1 file' : `${count} files`} to print` : `Ошибка при печати ${plural(count, '%d файла', '%d файлов')}`;

	/** */
	public static notificationPrinting = (count: number, language?: LanguageEnum): string => language !== LanguageEnum.rus ? `${count === 1 ? '1 file' : `${count} files`} sending to print` : `${plural(count, '%d файл', '%d файла', '%d файлов')} отправляется на печать`;

	/** */
	public static fileSizeInMb = (filesize?: number): string => `${((filesize ?? 0) / 1024 / 1024).toFixed(2)} Mb`;

	/** */
	public static fileResolution = (width: number, height: number): string => `${width}:${height}`;
}
