import { UrlConsts } from '../../src-front/const/UrlConsts';
import { TimerHelper } from '../TimerHelper';
import { CameraSettingEnum, CameraStateModel, CameraSubMode, CameraMode, GoProMediaList, GoProVersion, CameraModeGoPro8 } from '../../src-front/models/CameraStateModel';
import { NodeFetchHelper, ResponseType } from '../../helpers/NodeFetchHelper';
import { DownloadLastFileType } from '../../src-front/models/DownloadLastFileType';
import { SortHelper } from '../../helpers/SortHelper';


/** */
export class GoProBackendProxy {
	/** */
	public async getStatus(): Promise<CameraStateModel> {
		const status = await this.getRequest(UrlConsts.goPro.getStatus);
		const result = new CameraStateModel();
		// result.battery = status.status['1'];
		result.cameraOnline = true;

		result.batteryLevel = status.status['2'];
		// result.recordingStatus = status.status['8'];
		result.currentMode = status.status['43'];
		result.currentSubMode = status.status['44'];

		result.videoSettingsResolution = status.settings['2'];
		result.videoSettingsIsoLimit = status.settings['13'];
		result.videoSettingsEvComp = status.settings['15'];
		result.videoSettingsProTune = status.settings['10'];
		result.videoSettingsFrameRate = status.settings['3'];

		result.photoSettingsIsoLimit = status.settings['24'];
		result.photoSettingsEvComp = status.settings['26'];
		result.photoSettingsProTune = status.settings['21'];

		result.timeLapseSettingsResolution = status.settings['28'];
		result.timeLapseSettingsIsoLimit = status.settings['37'];
		result.timeLapseSettingsEvComp = status.settings['39'];
		result.timeLapseSettingsProTune = status.settings['34'];

		if (result.currentMode !== undefined) {
			result.cameraVersion = GoProVersion.GoPro7;
		} else {
			result.cameraVersion = GoProVersion.GoPro8;
			result.currentModeGoPro8 = status.settings['144'];
			result.videoSettingsProTuneGoPro8 = status.settings['114'];
			result.videoSettingsEvCompGoPro8 = status.settings['118'];
			result.photoSettingsProTuneGoPro8 = status.settings['114'];
			result.photoSettingsEvCompGoPro8 = status.settings['118'];

			// result.photoSettingsIsoLimit = status.settings['24'];
			// result.photoSettingsEvComp = status.settings['26'];
			// result.photoSettingsProTune = status.settings['21'];

			// result.timeLapseSettingsResolution = status.settings['28'];
			// result.timeLapseSettingsIsoLimit = status.settings['37'];
			// result.timeLapseSettingsEvComp = status.settings['39'];
			// result.timeLapseSettingsProTune = status.settings['34'];
		}

		return result;
	}
	/** */
	public async pairing(pcName: string): Promise<void> {
		return await this.getRequest(UrlConsts.goPro.pairing(pcName));
	}

	/** */
	public async setSetting(setting: CameraSettingEnum, value: string): Promise<void> {
		switch (setting) {
			case CameraSettingEnum.Mode:
				await this.getRequest(UrlConsts.goPro.setMode(value));
				break;
			case CameraSettingEnum.SubMode:
				const values = value.split('_');
				const mode = values[0];
				const subMode = values[1];
				await this.getRequest(UrlConsts.goPro.setSubMode(mode, subMode));
				break;
			case CameraSettingEnum.PowerOff:
				await this.getRequest(UrlConsts.goPro.powerOff);
				break;
			case CameraSettingEnum.VideoResolution:
				await this.getRequest(UrlConsts.goPro.setVideoResolution(value));
				break;
			case CameraSettingEnum.VideoIsoLimit:
				await this.getRequest(UrlConsts.goPro.setVideoIsoLimit(value));
				break;
			case CameraSettingEnum.VideoEvComp:
				await this.getRequest(UrlConsts.goPro.setVideoEvComp(value));
				break;
			case CameraSettingEnum.VideoProTune:
				await this.getRequest(UrlConsts.goPro.setVideoProTune(value));
				break;
			case CameraSettingEnum.VideoFrameRate:
				await this.getRequest(UrlConsts.goPro.setVideoFrameRate(value));
				break;
			case CameraSettingEnum.PhotoResolution:
				await this.getRequest(UrlConsts.goPro.setPhotoResolution(value));
				break;
			case CameraSettingEnum.PhotoIsoLimit:
				await this.getRequest(UrlConsts.goPro.setPhotoIsoLimit(value));
				break;
			case CameraSettingEnum.PhotoEvComp:
				await this.getRequest(UrlConsts.goPro.setPhotoEvComp(value));
				break;
			case CameraSettingEnum.PhotoProTune:
				await this.getRequest(UrlConsts.goPro.setPhotoProTune(value));
				break;
			case CameraSettingEnum.TimeLapseResolution:
				await this.getRequest(UrlConsts.goPro.setTimeLapseResolution(value));
				break;
			case CameraSettingEnum.TimeLapseIsoLimit:
				await this.getRequest(UrlConsts.goPro.setTimeLapseIsoLimit(value));
				break;
			case CameraSettingEnum.TimeLapseEvComp:
				await this.getRequest(UrlConsts.goPro.setTimeLapseEvComp(value));
				break;
			case CameraSettingEnum.TimeLapseProTune:
				await this.getRequest(UrlConsts.goPro.setTimeLapseProTune(value));
				break;
			
			// GoPro8
			case CameraSettingEnum.ModeGoPro8:
				await this.getRequest(UrlConsts.goPro.setModeGoPro8(value));
				break;
			case CameraSettingEnum.VideoEvCompGoPro8:
				await this.getRequest(UrlConsts.goPro.setVideoEvCompGoPro8(value));
				break;
			case CameraSettingEnum.VideoProTuneGoPro8:
				await this.getRequest(UrlConsts.goPro.setVideoProTuneGoPro8(value));
				break;
			case CameraSettingEnum.PhotoEvCompGoPro8:
				await this.getRequest(UrlConsts.goPro.setPhotoEvCompGoPro8(value));
				break;
			case CameraSettingEnum.PhotoProTuneGoPro8:
				await this.getRequest(UrlConsts.goPro.setPhotoProTuneGoPro8(value));
				break;

			default:
				break;
		}
	}

	/** */
	public async recordVideo(durationMilliseconds: number, delayMillisecondsAfterCommand: number = 1000): Promise<void> {
		// const status = await this.getStatus();
		// if (status.cameraVersion === GoProVersion.GoPro7
		// 	&& (status.currentMode !== CameraMode.Video
		// 	|| status.currentSubMode !== CameraSubMode.SubMode0)) {
		// 	await this.getRequest(UrlConsts.goPro.setVideoSubMode);
		// 	await TimerHelper.delay(delayMillisecondsAfterCommand);
		// }
		// if (status.cameraVersion === GoProVersion.GoPro8
		// 	&& status.currentModeGoPro8 !== CameraModeGoPro8.Video
		// 	&& status.currentModeGoPro8 !== CameraModeGoPro8.SloMo
		// 	&& status.currentModeGoPro8 !== CameraModeGoPro8.Looping) {
		// 	await this.getRequest(UrlConsts.goPro.setMode(CameraMode.Video.toString()));
		// 	await TimerHelper.delay(delayMillisecondsAfterCommand);
		// }

		await this.getRequest(UrlConsts.goPro.shuttler);
		await TimerHelper.delay(durationMilliseconds);
		await this.getRequest(UrlConsts.goPro.stopShuttler);
		await TimerHelper.delay(delayMillisecondsAfterCommand*2);
	}

	/** */
	public async takePhoto(delayMillisecondsAfterCommand: number = 1000): Promise<void> {
		// const status = await this.getStatus();
		// if (status.cameraVersion === GoProVersion.GoPro7
		// 	&& (status.currentMode !== CameraMode.Photo
		// 	|| status.currentSubMode !== CameraSubMode.SubMode1)) {
		// 	await this.getRequest(UrlConsts.goPro.setPhotoSingleSubMode);
		// 	await TimerHelper.delay(delayMillisecondsAfterCommand);
		// }

		// if (status.cameraVersion === GoProVersion.GoPro8
		// 	&& status.currentModeGoPro8 !== CameraModeGoPro8.Photo
		// 	&& status.currentModeGoPro8 !== CameraModeGoPro8.BurstPhoto
		// 	&& status.currentModeGoPro8 !== CameraModeGoPro8.LiveBurst
		// 	&& status.currentModeGoPro8 !== CameraModeGoPro8.NightPhoto) {
		// 	await this.getRequest(UrlConsts.goPro.setMode(CameraMode.Photo.toString()));
		// 	await TimerHelper.delay(delayMillisecondsAfterCommand);
		// }

		await this.getRequest(UrlConsts.goPro.shuttler);
		await TimerHelper.delay(delayMillisecondsAfterCommand*2);
	}

	/** */
	public async getLastFile(fileType: DownloadLastFileType): Promise<string | undefined> {
		const extension = fileType === DownloadLastFileType.Video
			? '.MP4'
			: '.JPG';

		const mediaList = await this.getRequest(UrlConsts.goPro.getMediaList) as GoProMediaList;
		// console.log(mediaList);
		const directories = mediaList?.media?.filter(dir => dir.fs && dir.fs.filter(file => file.n?.endsWith(extension)).length > 0);
		// console.log(directories);
		const lastDirectory = directories?.sort(SortHelper.dynamicSort('d')).pop();
		// console.log(lastDirectory);
		const lastFile = lastDirectory?.fs?.filter(file => file.n?.endsWith(extension))
			.sort(SortHelper.dynamicSort('cre')).pop();
		console.log(lastFile);
		if (!lastDirectory || !lastFile) {
			return;
		}

		const filename = lastDirectory.d + '/' + lastFile.n;
		return filename;
	}


	/** */
	public async downloadFile(directory: string, filename: string): Promise<Blob | null> {
		if (!directory || ! filename) {
			return null;
		}

		const fileData = await this.getRequest(UrlConsts.goPro.getFileData(directory, filename), ResponseType.blob, 300000) as Blob;
		return fileData;

		// const status = await this.getStatus();
		// if (status.currentMode !== CameraMode.Photo
		// 	|| status.currentSubMode !== CameraSubMode.SubMode1) {
		// 	await this.getRequest(UrlConsts.goPro.setPhotoSingleMode);
		// 	await TimerHelper.delay(delayMillisecondsAfterCommand);
		// }

		// await this.getRequest(UrlConsts.goPro.shuttler);
		// await TimerHelper.delay(delayMillisecondsAfterCommand);
	}

	/** */
	public async deleteFile(filename: string): Promise<void> {
		if (!filename) {
			return;
		}

		await this.getRequest(UrlConsts.goPro.deleteFile(filename));
	}

	/** */
	// private async sendRequest(url: string): Promise<void> {
	// 	await NodeFetchHelper.fetch(url);
	// 	// const response = await nodeFetch(
	// 	// 	url, {
	// 	// 	method: 'GET',
	// 	// 	headers: {
	// 	// 		'Content-Type': 'application/json'
	// 	// 	},
	// 	// });

	// 	// if (!response.ok) {
	// 	// 	const error = `Ошибка HTTP: ${response.status}`;
	// 	// 	throw new Error(error);
	// 	// }
	// }

	/** */
	private async getRequest(
		url: string,
		// method?: string,
		// body?: any,
		resposeType?: ResponseType,
		timeout?: number
	): Promise<any> {
		const settings = await NodeFetchHelper.fetch(url, undefined, undefined, timeout, resposeType);
		// const settings = await NodeFetchHelper.fetch(url, method, body, timeout, resposeType);
		return settings;
	}
}
