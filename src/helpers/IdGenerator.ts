/** Хелпер получения новых Идентификаторов */
 export class IdGenerator {
	/**
	 * Получает новый ИД, вида 2t8c52iti1f
	 */
	public static getNewGenericId = (): string => IdGenerator
		.getNewId()
		.toString(36)
		.substring(2);
	/**
	 * Получает новый ID из 9 символов (пример: 84op47cd2)
	 */
	public static getNewNotificationId = (): string => IdGenerator
		.getNewId()
		.toString(36)
		.substr(2, 9);
	/**
	 * Получает новый ИД
	 */
	public static getNewId = (): number => Math.random();
}