import { observable } from 'mobx';

import { ClipmakerSettingsViewModel } from './ClipmakerSettingsViewModel';

import { LanguageEnum } from '../../../src-front/models/LanguageEnum';


/** */
export class ClipmakerSettingsStore {
	@observable
	public settings = new ClipmakerSettingsViewModel();

	@observable
	/** */
	public tabSelected = 0;

	@observable
	public language?: LanguageEnum;
}
