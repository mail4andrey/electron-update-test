import { Snackbar } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { inject } from 'react-ioc';

import { KioskViewFileViewModel } from './KioskViewFileViewModel';
import { KioskViewItemEventProps } from './KioskViewItemEventProps';
import { KioskViewStore } from './KioskViewStore';

import { ITextFieldChangeEventProps } from '../../elements/TextField';
import { UrlHelper } from '../helpers/UrlHelper';
import { KioskLocalization } from '../localization/KioskLocalization';
import { FilesModel } from '../models/FilesModel';


/** */
export class KioskViewController {
	/** */
	@inject
	private readonly store!: KioskViewStore;

	/** */
	public loadFiles = async (): Promise<void> => {
		this.store.loading = true;
		const url = UrlHelper.getUrl('files');
		const response = await fetch(url);
		if (response.ok) {
			// console.dir(response);
			const serverFiles = await response.json() as FilesModel[];
			for (const existFile of this.store.files) {
				const existServerFile = serverFiles.findIndex((file: FilesModel) => file.fullpath === existFile.fullpath);
				if (existServerFile < 0) {
					const existFileIndex = this.store.files.findIndex((file: FilesModel) => file.fullpath === existFile.fullpath);
					this.store.files.splice(existFileIndex, 1);
				}
			}
			for (const serverFile of serverFiles) {
				const existFile = this.store.files.find((file: FilesModel) => file.fullpath === serverFile.fullpath);
				if (!existFile) {
					const newFile = new KioskViewFileViewModel();
					newFile.dirname = serverFile.dirname;
					newFile.extension = serverFile.extension;
					newFile.filename = serverFile.filename;
					newFile.fullpath = serverFile.fullpath;
					newFile.fileSize = serverFile.fileSize;
					newFile.featured = !(this.store.files.length % 5);
					this.store.files.push(newFile);
				}
			}
		} else {
			console.error(`Ошибка HTTP: ${response.status}`);
		}
		this.store.loading = false;
	};

	/** zz */
	public readonly onChangeEmail = (event: ITextFieldChangeEventProps): void => {
		this.store.email = event.target.value;
	};

	/** */
	public readonly onSelectItem = (_event: React.ChangeEvent<HTMLInputElement>, value: KioskViewItemEventProps): void => {
		const checkedFile = this.store.files.find((file: KioskViewFileViewModel) => file.fullpath === value.id);
		if (checkedFile) {
			checkedFile.isSelected = value.checked;
			this.store.filesSelected = this.store.files.filter((file: KioskViewFileViewModel) => file.isSelected).length;
		}
	};

	/** */
	public readonly onSendByEmail = async (email: string, files: KioskViewFileViewModel[]): Promise<void> => {
		const sendFiles = files.map((file: KioskViewFileViewModel) => file.fullpath);
		const request = { email, files: sendFiles };
		this.store.sending = true;
		const url = UrlHelper.getUrl('filesByEmail');
		try {
			const response = await fetch(url, {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				// mode: 'cors', // no-cors, *cors, same-origin
				// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				// credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				// redirect: 'follow', // manual, *follow, error
				// referrerPolicy: 'no-referrer', // no-referrer, *client
				body: JSON.stringify(request) // body data type must match "Content-Type" header
			});

			if (!response.ok) {
				const error = `Ошибка HTTP: ${response.status}`;
				throw new Error(error);
			}
		} catch (error) {
			this.store.sending = false;
			throw error;
		}

	};

	/** */
	public readonly sendFilesToPrint = async (files: KioskViewFileViewModel[]): Promise<void> => {
		const sendFiles = files.map((file: KioskViewFileViewModel) => file.fullpath);
		const request = { files: sendFiles };
		this.store.sending = true;
		const url = UrlHelper.getUrl('filesToPrint');
		const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			// mode: 'cors', // no-cors, *cors, same-origin
			// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			// redirect: 'follow', // manual, *follow, error
			// referrerPolicy: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(request) // body data type must match "Content-Type" header
		});
		this.store.sending = false;

		if (!response.ok) {
			const error = `Ошибка HTTP: ${response.status}`;
			throw new Error(error);
		}
	};
}
