/** */
export class ArrayHelper {/**
	/**
	* Преобразует массив строк в одну строку через разделитель.
	* По умолчанию разделитель - запятая
	*/
	public static arrayToString(array: string[], delimiter = ', '): string {
		if (array.length === 0) {
			return '';
		}
		return array.reduce((a: string, b: string) => `${a}${delimiter}${b}`);
	}

	/** */
	public static groupBy<T, K>(list: T[], getKey: (item: T) => K): Map<K, T[]> {
		const map = new Map<K, T[]>();
		list.forEach((item: T) => {
			const key = getKey(item);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		});
		return map;
	}
}
