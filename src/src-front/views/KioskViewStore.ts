import { observable } from 'mobx';

import { GroupByEnum } from './GroupByEnum';
import { KioskViewFilesViewModel } from './KioskViewFileViewModel';
import { VideoItemSizeEnum } from './SizeEnum';
import { SortOrderEnum } from './SortOrderEnum';

import { LanguageEnum } from '../models/LanguageEnum';

/** */
export class KioskViewStore {
	@observable
	public loaded = false;

	@observable
	public groupsFiles: KioskViewFilesViewModel[] = [];

	// @observable
	// public openAlert?: string;

	// @observable
	// public alerts?: string;

	@observable
	public groupBy?: GroupByEnum;

	@observable
	public sortOrder?: SortOrderEnum;

	@observable
	public language?: LanguageEnum;

	// @observable
	// public sending = false;

	@observable
	public currentItemSize? = VideoItemSizeEnum.small;

	public email?: string;
}

