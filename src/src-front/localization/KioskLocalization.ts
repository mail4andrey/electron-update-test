/* eslint-disable max-classes-per-file */
import plural from 'plural-ru';

/** */
export class KioskLocalization {
	public static sendEmailToError = 'Укажите куда отправтиь письмо';

	public static selectedFilesError = 'Выберите файл';

	public static sendEmail = 'Отправить письмо';

	public static sendEmailTo = 'Куда отправтиь письмо';

	public static print = 'Распечатать';

	public static printMiddleFrame = 'Распечатать средний кадр';

	public static printCurrentFrame = 'Распечатать текущий кадр';

	/** */
	public static notificationSendedByEmail = (count: number): string => `${plural(count, '%d файл', '%d файла', '%d файлов')} отправлено на почту`;

	/** */
	public static notificationSendedByEmailError = (count: number): string => `Ошибка при отправке ${plural(count, '%d файла', '%d файлов')} на почту`;

	/** */
	public static notificationSendingByEmail = (count: number): string => `${plural(count, '%d файл', '%d файла', '%d файлов')} отправляется на почту`;

	/** */
	public static notificationPrinted = (count: number): string => `${plural(count, '%d файл', '%d файла', '%d файлов')} напечатан`;

	/** */
	public static notificationPrintedError = (count: number): string => `Ошибка при печати ${plural(count, '%d файла', '%d файлов')}`;

	/** */
	public static notificationPrinting = (count: number): string => `${plural(count, '%d файл', '%d файла', '%d файлов')} отправляется на печать`;

	/** */
	public static fileSizeInMb = (filesize?: number): string => `${((filesize ?? 0) / 1024 / 1024).toFixed(2)} Mb`;
}
