import { GroupByEnum } from './GroupByEnum';
import { VideoItemSizeEnum } from './SizeEnum';
import { SortOrderEnum } from './SortOrderEnum';

import { LanguageEnum } from '../models/LanguageEnum';

export interface KioskSettingsLocalStorage {
	groupBy?: GroupByEnum;
	size?: VideoItemSizeEnum;
	sortOrder?: SortOrderEnum;
	language?: LanguageEnum;
}
