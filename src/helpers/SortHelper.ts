export enum SortDirectionFrontEnum {
	Descending = 'Descending',
	Ascending = 'Ascending'
}
export class SortHelper {
	/** Сортировка в массиве по свойству */
	// todo: добавить типизацию и проверку что property существует
	public static dynamicSort(property: any, sortDirection?: SortDirectionFrontEnum) {
		const sortOrder = sortDirection !== SortDirectionFrontEnum.Descending
			? 1
			: -1;

		return function (a: any, b: any) {
			const aProperty = typeof a[property] === 'string' ? a[property].toLowerCase() : a[property];
			const bProperty = typeof b[property] === 'string' ? b[property].toLowerCase() : b[property];

			if (aProperty === undefined || aProperty === null) {
				return -1 * sortOrder;
			}
			if (bProperty === undefined || bProperty === null || aProperty > bProperty) {
				return sortOrder;
			}
			if (aProperty < bProperty) {
				return -1 * sortOrder;
			}
			return 0; // в случае равенства
		};
	}

	/** Сортировка в массиве по свойству свойства */
	public static sortBySubProperty(property: any, subProperty: any, sortDirection?: SortDirectionFrontEnum) {
		const sortOrder = sortDirection !== SortDirectionFrontEnum.Descending
			? 1
			: -1;

		return function (a: any, b: any) {
			const aProp = a[property];
			const bProp = b[property];
			const result = aProp[subProperty] < bProp[subProperty] ? -1 : aProp[subProperty] > bProp[subProperty] ? 1 : 0;
			return result * sortOrder;
		};
	}
}