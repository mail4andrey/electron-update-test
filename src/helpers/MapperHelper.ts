/** Маппер */
export class MapperHelper {
	/** Клонируем массив */
	public static CloneArray<T>(sourceObject: T[]): T[] {
		return [...sourceObject];
	}

	/** Копируем значения и оставляем функции в объекте */
	public static Map<T>(sourceObject: any, destType: new () => T): T {
		return Object.assign(new destType(), sourceObject);
	}

	/** Копируем только свойства из одного объекта в другой */
	public static MapProperties<T>(sourceObject: any, destObject: T): T {
		return Object.assign(destObject, sourceObject);
	}
}
