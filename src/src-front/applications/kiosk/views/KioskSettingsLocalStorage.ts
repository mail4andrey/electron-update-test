import { DesignSizeEnum } from './DesignSizeEnum';
import { GroupByEnum } from './GroupByEnum';
import { VideoItemSizeEnum } from './SizeEnum';
import { SortOrderEnum } from './SortOrderEnum';


export interface KioskSettingsLocalStorage {
	groupBy?: GroupByEnum;
	size?: VideoItemSizeEnum;
	sortOrder?: SortOrderEnum;
	// language?: LanguageEnum;
	iconSize?: DesignSizeEnum;
}


