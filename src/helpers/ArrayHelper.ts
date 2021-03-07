/** */
export class ArrayHelper {

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
