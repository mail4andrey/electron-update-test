/* eslint-disable max-classes-per-file */
import * as LocalStorage from 'local-storage';
import { inject } from 'react-ioc';

import type { DesignSizeEnum } from './DesignSizeEnum';
import type { GroupByEnum } from './GroupByEnum';
import type { KioskSettingsLocalStorage } from './KioskSettingsLocalStorage';
import { LanguageSettingsLocalStorage } from "../../../models/LanguageSettingsLocalStorage";
import { KioskViewFilesViewModel, KioskViewFileViewModel } from './KioskViewFileViewModel';
import type { KioskViewItemEventProps } from './KioskViewItemEventProps';
import { KioskViewStore } from './KioskViewStore';
import type { LanguageEnum } from '../../../models/LanguageEnum';
import type { VideoItemSizeEnum } from './SizeEnum';
import type { SortOrderEnum } from './SortOrderEnum';

import type { PrintSendingItemModel } from '../../../../applications/kiosk/settings/PrintSendingItemModel';
import type { ITextFieldChangeEventProps } from '../../../../elements/TextField';
import { EmailProxy } from '../../../../helpers/proxy/EmailProxy';
import { PrintProxy } from '../../../../helpers/proxy/PrintProxy';
import type { ITimer } from '../../../../helpers/Timer';
import { Timer } from '../../../../helpers/Timer';
import { UrlHelper } from '../../../helpers/UrlHelper';
import type { PathSourceFileModel } from '../../../models/PathSourceFileModel';
import type { PathSourceFilesModel } from '../../../models/PathSourceFilesModel';
import { LocalStorageConsts } from '../../../const/LocalStorageConsts';
import { UrlConsts } from '../../../../src-front/const/UrlConsts';

declare const fetch: Function;

/** */
export class KioskViewController {
	/** */
	@inject
	private readonly store!: KioskViewStore;

	/** */
	private readonly clientPrint = new PrintProxy();

	/** */
	private readonly clientEmail = new EmailProxy();

	private timer?: ITimer;

	/** */
	public init = async (): Promise<void> => {
		this.store.loaded = false;
		const localSettings = LocalStorage.get<KioskSettingsLocalStorage | undefined>(LocalStorageConsts.localSettings);
		this.store.groupBy = localSettings?.groupBy;
		this.store.currentItemSize = localSettings?.size;
		this.store.sortOrder = localSettings?.sortOrder;
		this.store.iconSize = localSettings?.iconSize;

		const languageSettings = LocalStorage.get<LanguageSettingsLocalStorage | undefined>(LocalStorageConsts.languageSettings);
		this.store.language = languageSettings?.language;

		await this.loadFiles();
		this.store.loaded = true;
		this.timer = new Timer(15000, this.loadFiles);
		this.timer.execute();
	};

	/** */
	public dispose = async (): Promise<void> => {
		this.timer?.stop();
	};

	/** zz */
	public readonly onChangeEmail = (event: ITextFieldChangeEventProps): void => {
		this.store.email = event.target.value;
	};

	/** */
	public readonly onSelectItem = (_event: React.ChangeEvent<HTMLInputElement>, value: KioskViewItemEventProps): void => {
		const selectedFile = this.store.groupsFiles
			.flatMap((file: KioskViewFilesViewModel) => file.files)
			.find((file: KioskViewFileViewModel) => file.fullpath === value.id);
		if (selectedFile) {
			selectedFile.isSelected = value.checked ?? false;
		}
	};

	/** */
	public readonly onSendByEmail = async (email: string, files: KioskViewFileViewModel[]): Promise<void> => {
		const sendFiles = files.map((file: KioskViewFileViewModel) => file.fullpath!);
		try {
			await this.clientEmail.sendMail(email, sendFiles);
		} catch (error) {
		}
	};

	/** */
	public readonly sendFilesToPrint = async (filesImageBase64Data: PrintSendingItemModel[]): Promise<void> => {
		try {
			await this.clientPrint.print(filesImageBase64Data);
		} catch (error) {
		}
	};

	/** */
	public readonly onItemSizeChange = (_event: React.MouseEvent<Element, MouseEvent>, value: VideoItemSizeEnum): void => {
		this.store.currentItemSize = value;
		this.saveSettingsToLocalStorage();
	};

	/** */
	public readonly onGroupByChange = (_event: React.MouseEvent<Element, MouseEvent>, value: GroupByEnum): void => {
		this.store.groupBy = value;
		this.saveSettingsToLocalStorage();
	};

	/** */
	public readonly onSortOrderChange = (_event: React.MouseEvent<Element, MouseEvent>, value: SortOrderEnum): void => {
		this.store.sortOrder = value;
		this.saveSettingsToLocalStorage();
	};

	/** */
	public readonly onLanguageChange = (_event: React.MouseEvent<Element, MouseEvent>, value: LanguageEnum): void => {
		this.store.language = value;
		this.saveSettingsToLocalStorage();
	};

	/** */
	public readonly onSizeChange = (_event: React.MouseEvent<Element, MouseEvent>, value: DesignSizeEnum): void => {
		this.store.iconSize = value;
		this.saveSettingsToLocalStorage();
	};

	/** Сохраняем в local storage */
	private saveSettingsToLocalStorage(): void {
		const data = {
			sizgroupBye: this.store.groupBy,
			size: this.store.currentItemSize,
			sortOrder: this.store.sortOrder,
			language: this.store.language,
			groupBy: this.store.groupBy,
			iconSize: this.store.iconSize
		} as KioskSettingsLocalStorage;
		LocalStorage.set(LocalStorageConsts.localSettings, data);
	}

	/** */
	private readonly loadFiles = async (): Promise<void> => {
		const url = UrlHelper.getUrl(UrlConsts.filesUrl);
		const response = await fetch(url);
		if (response.ok) {
			const serverFiles = await response.json() as PathSourceFilesModel[];
			this.updatePathSources(serverFiles, this.store.groupsFiles);
		} else {
			console.error(`Ошибка HTTP: ${response.status}`);
		}
	};

	/** */
	private updatePathSources(serverItems: PathSourceFilesModel[], viewItems: KioskViewFilesViewModel[]): void {
		for (const existItem of viewItems) {
			const existServerFile = serverItems.findIndex((file: PathSourceFilesModel) => file.dirname === existItem.dirname);
			if (existServerFile < 0) {
				const existFileIndex = viewItems.findIndex((file: KioskViewFilesViewModel) => file.dirname === existItem.dirname);
				viewItems.splice(existFileIndex, 1);
			}
		}
		for (const serverItem of serverItems) {
			const existItem = viewItems.find((file: KioskViewFilesViewModel) => file.dirname === serverItem.dirname);
			if (!existItem) {
				const newItem = new KioskViewFilesViewModel();
				newItem.dirname = serverItem.dirname;
				viewItems.push(newItem);
				this.updatePathSource(serverItem.files ?? [], newItem.files);
			} else {
				this.updatePathSource(serverItem.files ?? [], existItem.files);
			}
		}
	}

	/** */
	private updatePathSource(serverFiles: PathSourceFileModel[], viewFiles: KioskViewFileViewModel[]): void {
		for (const existFile of viewFiles) {
			const existServerFile = serverFiles.findIndex((file: PathSourceFileModel) => file.fullpath === existFile.fullpath);
			if (existServerFile < 0) {
				const existFileIndex = viewFiles.findIndex((file: KioskViewFileViewModel) => file.fullpath === existFile.fullpath);
				viewFiles.splice(existFileIndex, 1);
			}
		}
		for (const serverFile of serverFiles) {
			const existFile = viewFiles.find((file: KioskViewFileViewModel) => file.fullpath === serverFile.fullpath);
			if (!existFile) {
				const newFile = new KioskViewFileViewModel();
				newFile.dirname = serverFile.dirname;
				newFile.extension = serverFile.extension;
				newFile.filename = serverFile.filename;
				newFile.fullpath = serverFile.fullpath;
				newFile.fileSize = serverFile.fileSize;
				viewFiles.push(newFile);
			}
		}
	}
}
