/* eslint-disable max-classes-per-file */
import * as LocalStorage from 'local-storage';
import { inject } from 'react-ioc';

import { DesignSizeEnum } from './DesignSizeEnum';
import { GroupByEnum } from './GroupByEnum';
import { KioskSettingsLocalStorage, LanguageSettingsLocalStorage } from './KioskSettingsLocalStorage';
import { KioskViewFilesViewModel, KioskViewFileViewModel } from './KioskViewFileViewModel';
import { KioskViewItemEventProps } from './KioskViewItemEventProps';
import { KioskViewStore } from './KioskViewStore';
import { LanguageEnum } from './LanguageEnum';
import { VideoItemSizeEnum } from './SizeEnum';
import { SortOrderEnum } from './SortOrderEnum';

import { ITextFieldChangeEventProps } from '../../elements/TextField';
import { EmailProxy } from '../../helpers/EmailProxy';
import { PrintProxy } from '../../helpers/PrintProxy';
import { ITimer, Timer } from '../../helpers/Timer';
import { PrintSendingItemModel } from '../../applications/kiosk/settings/PrintSendingItemModel';
import { UrlHelper } from '../helpers/UrlHelper';
import { PathSourceFileModel } from '../models/PathSourceFileModel';
import { PathSourceFilesModel } from '../models/PathSourceFilesModel';


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
		const localSettings = LocalStorage.get<KioskSettingsLocalStorage>('local-settings') as KioskSettingsLocalStorage|undefined;
		this.store.groupBy = localSettings?.groupBy;
		this.store.currentItemSize = localSettings?.size;
		this.store.sortOrder = localSettings?.sortOrder;
		this.store.iconSize = localSettings?.iconSize;

		const languageSettings = LocalStorage.get<LanguageSettingsLocalStorage>('language-settings') as LanguageSettingsLocalStorage|undefined;
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
		// const selectedFile = pathSource?.files.find((file: KioskViewFileViewModel) => file.filename === value.id);
		if (selectedFile) {
			selectedFile.isSelected = value.checked ?? false;
		}
	};

	/** */
	public readonly onSendByEmail = async (email: string, files: KioskViewFileViewModel[]): Promise<void> => {
		const sendFiles = files.map((file: KioskViewFileViewModel) => file.fullpath!);
		// this.store.sending = true;
		try {
			await this.clientEmail.sendMail(email, sendFiles);
		} catch (error) {
		}
		// this.store.sending = false;
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
			iconSize: this.store.iconSize,
		} as KioskSettingsLocalStorage;
		LocalStorage.set('local-settings', data);
	}

	/** */
	private readonly loadFiles = async (): Promise<void> => {
		const url = UrlHelper.getUrl('files');
		const response = await fetch(url);
		if (response.ok) {
			// console.dir(response);
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
