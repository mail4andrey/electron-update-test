/* eslint-disable max-classes-per-file */
import plural from 'plural-ru';

import { LanguageEnum } from '../models/LanguageEnum';

/** */
export class KioskLocalization {
	public static administrative = 'Администрирование';

	public static sendEmailToError = 'Укажите куда отправить письмо';

	public static selectedFilesError = 'Выберите файл';

	public static sendEmail = 'Отправить письмо';

	public static sendEmailTo = 'Куда отправить письмо';

	public static labelEmailTo = 'Email';

	public static print = 'Распечатать';

	public static printMiddleFrame = 'Распечатать средний кадр';

	public static printCurrentFrame = 'Распечатать текущий кадр';

	public static languageTitle = 'Изменить язык';

	/** */
	public static languageDescription = (language?: LanguageEnum): string => {
		switch (language) {
			case LanguageEnum.rus:
				return 'Rus';
			case LanguageEnum.eng:
			default:
				return 'Eng';
		}
	};

	/** */
	public static notificationSendedByEmail = (count: number): string => `${plural(count, '%d файл', '%d файла', '%d файлов')} отправлено на почту`;

	/** */
	public static notificationSendedByEmailError = (count: number): string => `Ошибка при отправке ${plural(count, '%d файла', '%d файлов')} на почту`;

	/** */
	public static notificationSendingByEmail = (count: number): string => `${plural(count, '%d файл', '%d файла', '%d файлов')} отправляется на почту`;

	/** */
	public static notificationPrinted = (count: number): string => `${plural(count, '%d файл', '%d файла', '%d файлов')} отправлен на печать`;

	/** */
	public static notificationPrintedError = (count: number): string => `Ошибка при печати ${plural(count, '%d файла', '%d файлов')}`;

	/** */
	public static notificationPrinting = (count: number): string => `${plural(count, '%d файл', '%d файла', '%d файлов')} отправляется на печать`;

	/** */
	public static fileSizeInMb = (filesize?: number): string => `${((filesize ?? 0) / 1024 / 1024).toFixed(2)} Mb`;

	/** */
	public static fileResolution = (width: number, height: number): string => `${width}:${height}`;
}
