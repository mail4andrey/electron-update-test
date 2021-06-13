/** Маппер */
export class MapperHelper {
	/** Клонируем массив */
	public static cloneArray<T>(sourceObject: T[]): T[] {
		return [...sourceObject];
	}

	/** Копируем значения и оставляем функции в объекте */
	public static map<T>(sourceObject: any, destType: new () => T): T {
		return Object.assign(new destType(), sourceObject);
	}

	/** Копируем только свойства из одного объекта в другой */
	public static mapProperties<T>(sourceObject: any, destObject: T): T {
		return Object.assign(destObject, sourceObject);
	}

	/** Копируем только значения из одного объекта в другой */
	public static mapValues<T>(sourceObject: any, destObject: T): T {
		for (const key in destObject) {
			if (Object.prototype.hasOwnProperty.call(destObject, key)
				&& Object.prototype.hasOwnProperty.call(sourceObject, key)) {
				destObject[key] = sourceObject[key];
			}
		}

		return destObject;
	}
}
