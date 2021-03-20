import { VideoItemSizeEnum } from './SizeEnum';
import { SortOrderEnum } from './SortOrderEnum';

import { LanguageEnum } from '../models/LanguageEnum';

export interface KioskSettingsLocalStorage {
	size?: VideoItemSizeEnum;
	sortOrder?: SortOrderEnum;
	language?: LanguageEnum;
}
