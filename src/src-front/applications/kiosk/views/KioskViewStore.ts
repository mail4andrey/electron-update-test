import { observable } from 'mobx';

import { DesignSizeEnum } from './DesignSizeEnum';
import { GroupByEnum } from './GroupByEnum';
import { KioskViewFilesViewModel } from './KioskViewFileViewModel';
import { LanguageEnum } from '../../../models/LanguageEnum';
import { VideoItemSizeEnum } from './SizeEnum';
import { SortOrderEnum } from './SortOrderEnum';


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
	public iconSize?: DesignSizeEnum;

	@observable
	public sortOrder?: SortOrderEnum;

	@observable
	public language?: LanguageEnum;

	// @observable
	// public sending = false;

	@observable
	public currentItemSize? = VideoItemSizeEnum.small;

	@observable
	public email = '';
}

