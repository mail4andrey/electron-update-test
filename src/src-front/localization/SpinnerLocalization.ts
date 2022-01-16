/* eslint-disable no-confusing-arrow */
/* eslint-disable max-classes-per-file */
import plural from 'plural-ru';

import { LanguageEnum } from '../models/LanguageEnum';
import { ApplicationSourceModeEnum } from '../applications/spinner/views/SpinnerLocalSettingsViewModel';
import { VideoIsoLimit, EvComp, ProTune, FrameRate, CameraSubMode, CameraMode, PhotoIsoLimit, VideoResolution, PhotoResolution, CameraModeGoPro8 } from '../../src-front/models/CameraStateModel';
import { StatusEnum } from '../../src-front/applications/spinner/views/SpinnerViewStore';
import { MultiplierEnum } from '../../src-front/applications/spinner/frontSettings/SpinnerSettingsFrontModel';

/** */
export class SpinnerLocalization {
	/** */
	public static goProPreview = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'GoPro Preview' : 'Предпросмотр с камеры';

	/** */
	public static goProSettings = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'GoPro Settings' : 'Настройки камеры';

	/** */
	public static goProPreviewPhotos = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Photos' : 'Фотографии';

	/** */
	public static goProPreviewPhotosOverlayed = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Overlayed photos' : 'Брендированные фотографии';

	/** */
	public static goProPreviewVideos = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Videos' : 'Видео';

	/** */
	public static batteryLevel = (language?: LanguageEnum, value?: ApplicationSourceModeEnum): string =>
		language !== LanguageEnum.rus ? 'Battery level' : 'Уровень заряда';
	
	/** */
	public static modeLabel = (language?: LanguageEnum, value?: ApplicationSourceModeEnum): string =>
		language !== LanguageEnum.rus ? 'Mode' : 'Режим';

	/** */
	public static goPro = (language?: LanguageEnum, value?: ApplicationSourceModeEnum): string =>
		language !== LanguageEnum.rus ? 'GoPro' : 'GoPro';

	/** */
	public static goPro8 = (language?: LanguageEnum, value?: ApplicationSourceModeEnum): string =>
		language !== LanguageEnum.rus ? 'GoPro8' : 'GoPro8';

	/** */
	public static camera = (language?: LanguageEnum, value?: ApplicationSourceModeEnum): string =>
		language !== LanguageEnum.rus ? 'Camera' : 'Камера';

	/** */
	public static powerOff = (language?: LanguageEnum, value?: ApplicationSourceModeEnum): string =>
		language !== LanguageEnum.rus ? 'Power off camera' : 'Выключить камеру';

	/** */
	public static takePhoto = (language?: LanguageEnum, value?: ApplicationSourceModeEnum): string =>
		language !== LanguageEnum.rus ? 'Take photo' : 'Сфотографировать';

	/** */
	public static recordVideo = (language?: LanguageEnum, value?: ApplicationSourceModeEnum): string =>
		language !== LanguageEnum.rus ? 'Record video' : 'Записать видео';

	/** */
	public static durationForRecord = (language?: LanguageEnum, value?: ApplicationSourceModeEnum): string =>
		language !== LanguageEnum.rus ? 'Duration for record' : 'Продолжительность записи';

	/** */
	public static takePhotoOrRecordVideo = (language?: LanguageEnum, value?: ApplicationSourceModeEnum): string =>
		language !== LanguageEnum.rus ? 'Take photo or record video' : 'Сфотографировать или записать видео';

	/** */
	public static seconds = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'seconds' : 'секунд';

	/** */
	public static cameraNotFound = (language?: LanguageEnum, value?: boolean): string =>
		value ? language !== LanguageEnum.rus ? 'Camera not found. Check connection to camera!' : 'Камера не найдена. Проверьте подключение к камере.' : '';

	/** */
	public static videoSettings = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Video Settings' : 'Настройки Видео';

	/** */
	public static photoSettings = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Photo Settings' : 'Настройки Фото';

	/** */
	public static timeLapseSettings = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Time Lapse Settings' : 'Настройки Time Lapse';

	// /** */
	// public static legendDescription = (language?: LanguageEnum, value?: GoProStateEnum): string => {
	public static modeInfo = (language?: LanguageEnum, value?: ApplicationSourceModeEnum): string => {
		if (language !== LanguageEnum.rus) {
			switch (value) {
				case ApplicationSourceModeEnum.camera:
					return 'Mode: Camera';
				default:
				case ApplicationSourceModeEnum.directory:
					return 'Mode: Directory';
			}
		}
		switch (value) {
			case ApplicationSourceModeEnum.camera:
				return 'Режим: Камера';
			default:
			case ApplicationSourceModeEnum.directory:
				return 'Режим: Папка';
		}
	};

	/** */
	public static resolution = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Resolution' : 'Разрешение';

	/** */
	public static videoResolutionItem = (language?: LanguageEnum, value?: VideoResolution): string => {
		switch (value) {
			case VideoResolution.Resolution1080:
				return '1080p';
			case VideoResolution.Resolution1080SV:
				return '1080 SuperView';
			case VideoResolution.Resolution1440:
				return '1440p 4:3';
			case VideoResolution.Resolution27K:
				return '2.7K';
			case VideoResolution.Resolution27K43:
				return '2.7K 4:3';
			case VideoResolution.Resolution27KSV:
				return '2.7K SuperView';
			case VideoResolution.Resolution4K:
				return '4K';
			case VideoResolution.Resolution4KSV:
				return '4K SuperView';
			case VideoResolution.Resolution4K43:
				return '4K 4:3';
			case VideoResolution.Resolution720:
				return '720p';
			case VideoResolution.Resolution720SV:
				return '720p SuperView';
			case VideoResolution.Resolution960:
				return '960p 4:3';
			case VideoResolution.ResolutionWVGA:
				return 'WVGA';
			case VideoResolution.Resolution5K:
				return '5K';
			default:
				return language !== LanguageEnum.rus ? 'Unknown' : 'Неизвестно';
		}
	}
	// /** */
	// public static photoResolutionItem = (language?: LanguageEnum, value?: PhotoResolution): string => {
	// 	switch (value) {
	// 		case PhotoResolution.Resolution12MPWide:
	// 			return '12MP Wide';
	// 		case PhotoResolution.Resolution5MPWide:
	// 			return '5MP Wide';
	// 		case PhotoResolution.Resolution7MPWide:
	// 			return '7MP Wide';
	// 		case PhotoResolution.Resolution7MPMedium:
	// 			return '7MP Medium';
	// 		default:
	// 			return language !== LanguageEnum.rus ? 'Unknown' : 'Неизвестно';
	// 	}
	// }

	/** */
	public static isoLimit = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'ISO' : 'ISO';

	/** */
	public static videoIsoLimitItem = (language?: LanguageEnum, value?: VideoIsoLimit): string => {
		switch (value) {
			case VideoIsoLimit.Iso6400:
				return '6400';
			case VideoIsoLimit.Iso100:
				return '100';
			case VideoIsoLimit.Iso1600:
				return '1600';
			case VideoIsoLimit.Iso200:
				return '200';
			case VideoIsoLimit.Iso3200:
				return '3200';
			case VideoIsoLimit.Iso400:
				return '400';
			case VideoIsoLimit.Iso800:
				return '800';
			default:
				return language !== LanguageEnum.rus ? 'Unknown' : 'Неизвестно';
		}
	}

	/** */
	public static photoIsoLimitItem = (language?: LanguageEnum, value?: PhotoIsoLimit): string => {
		switch (value) {
			case PhotoIsoLimit.Iso100:
				return '100';
			case PhotoIsoLimit.Iso1600:
				return '1600';
			case PhotoIsoLimit.Iso200:
				return '200';
			case PhotoIsoLimit.Iso3200:
				return '3200';
			case PhotoIsoLimit.Iso400:
				return '400';
			case PhotoIsoLimit.Iso800:
				return '800';
			default:
				return language !== LanguageEnum.rus ? 'Unknown' : 'Неизвестно';
		}
	}

	/** */
	public static evComp = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'EV' : 'EV';

	/** */
	public static evCompItem = (language?: LanguageEnum, value?: EvComp): string => {
		switch (value) {
			case EvComp.EvMinus2:
				return '-2';
			case EvComp.EvMinus1_5:
				return '-1.5';
			case EvComp.EvMinus1:
				return '-1';
			case EvComp.EvMinus0_5:
				return '-0.5';
			case EvComp.Ev0:
				return '0';
			case EvComp.EvPlus0_5:
				return '0.5';
			case EvComp.EvPlus1:
				return '1';
			case EvComp.EvPlus1_5:
				return '1.5';
			case EvComp.EvPlus2:
				return '2';
			default:
				return language !== LanguageEnum.rus ? 'Unknown' : 'Неизвестно';
		}
	}

	/** */
	public static proTune = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'ProTune' : 'ProTune';

	/** */
	public static proTuneItem = (language?: LanguageEnum, value?: ProTune): string => {
		switch (value) {
			case ProTune.On:
				return 'ON';
			case ProTune.Off:
				return 'OFF';
			default:
				return language !== LanguageEnum.rus ? 'Unknown' : 'Неизвестно';
		}
	}

	/** */
	public static frameRate = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'FPS' : 'FPS';

	/** */
	public static frameRateItem = (language?: LanguageEnum, value?: FrameRate): string => {
		switch (value) {
			case FrameRate.Fps100:
				return '100';
			case FrameRate.Fps120:
				return '120';
			case FrameRate.Fps12_5:
				return '12.5';
			case FrameRate.Fps15:
				return '15';
			case FrameRate.Fps24:
				return '24';
			case FrameRate.Fps240:
				return '240';
			case FrameRate.Fps25:
				return '25';
			case FrameRate.Fps30:
				return '30';
			case FrameRate.Fps48:
				return '48';
			case FrameRate.Fps50:
				return '50';
			case FrameRate.Fps60:
				return '60';
			case FrameRate.Fps80:
				return '80';
			case FrameRate.Fps90:
				return '90';
			case FrameRate.Fps200:
				return '200';
			default:
				return language !== LanguageEnum.rus ? 'Unknown' : 'Неизвестно';
		}
	}

	/** */
	public static mode = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Mode' : 'Режим';


	/** */
	public static modeHelper = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Select sub mode on camera manually' : 'Выберите дополнительный режим работы на камере в ручную';

	/** */
	public static usefull = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Usefull' : 'Полезные';

	/** */
	public static modeItem = (language?: LanguageEnum, value?: CameraMode): string => {
		switch (value) {
			case CameraMode.Photo:
				return 'Photo';
			case CameraMode.Video:
				return 'Video';
			case CameraMode.MultiShot:
				return 'Time Lapse';
			default:
				return language !== LanguageEnum.rus ? 'Unknown' : 'Неизвестно';
		}
	}

	/** */
	public static modeGoPro8Item = (language?: LanguageEnum, value?: CameraModeGoPro8): string => {
		switch (value) {
			case CameraModeGoPro8.BurstPhoto:
				return 'Photo - Burst';
			case CameraModeGoPro8.LiveBurst:
				return 'Photo - Live-Burst';
			case CameraModeGoPro8.Looping:
				return 'Looping';
			case CameraModeGoPro8.NightLapsePhoto:
				return 'Night Lapse Photo';
			case CameraModeGoPro8.NightLapseVideo:
				return 'Night Lapse Video';
			case CameraModeGoPro8.NightPhoto:
				return 'Photo - Night';
			case CameraModeGoPro8.Photo:
				return 'Photo ';
			case CameraModeGoPro8.SloMo:
				return 'Video Slo-Mo';
			case CameraModeGoPro8.TimeLapsePhoto:
				return 'Time Lapse Photo';
			case CameraModeGoPro8.TimeLapseVideo:
				return 'Time Lapse Video';
			case CameraModeGoPro8.TimeWarpVideo:
				return 'Time Warp Video';
			case CameraModeGoPro8.Video:
				return 'Video';
			default:
				return language !== LanguageEnum.rus ? 'Unknown' : 'Неизвестно';
		}
	}

	/** */
	public static subModeItem = (language?: LanguageEnum, value?: CameraMode, subValue?: CameraSubMode): string => {
		switch (value) {
			case CameraMode.Photo:
				{
					switch (subValue) {
						case CameraSubMode.SubMode1:
							return 'Photo';
						case CameraSubMode.SubMode2:
							return 'Photo - Night';
						default:
							return language !== LanguageEnum.rus ? 'Photo - Unknown' : 'Photo - Неизвестно';
					}
				}
			case CameraMode.Video:
				{
					switch (subValue) {
						case CameraSubMode.SubMode0:
							return 'Video';
						case CameraSubMode.SubMode1:
							return 'Time Lapse Video';
						case CameraSubMode.SubMode3:
							return 'Looping';
						case CameraSubMode.SubMode4:
							return 'TimeWrap Video';
						default:
							return language !== LanguageEnum.rus ? 'Video - Unknown' : 'Video - Неизвестно';
					}
				}
			case CameraMode.MultiShot:
				{
					switch (subValue) {
						case CameraSubMode.SubMode0:
							return 'Photo - Burst';
						case CameraSubMode.SubMode1:
							return 'Time Lapse Photo';
						case CameraSubMode.SubMode2:
							return 'Night Lapse Photo';
						default:
							return language !== LanguageEnum.rus ? 'Time Lapse - Unknown' : 'Time Lapse - Неизвестно';
					}
				}
			default:
				return language !== LanguageEnum.rus ? 'Unknown' : 'Неизвестно';
		}
	}

	/** */
	public static shuttlerStatusLabel = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Status' : 'Статус';

	// /** */
	public static shuttlerStatus = (language?: LanguageEnum, value?: StatusEnum, file?: string): string => {
		const filename = file ?? '';
		if (language !== LanguageEnum.rus) {
			switch (value) {
				case StatusEnum.FileCreated:
					return 'File created ' + filename;
				case StatusEnum.DeleteFile:
					return 'Delete file ' + filename;
				case StatusEnum.DownloadFromCamera:
					return 'Download file ' + filename;
				// case StatusEnum.Pairing:
				// 	return 'Pairing';
				case StatusEnum.RecordVideo:
					return 'Record video';
				case StatusEnum.TakePhoto:
					return 'Take photo';
				case StatusEnum.GetLastFile:
					return 'Get last filename';
				default:
					return 'Unknown';
			}
		}
		switch (value) {
			case StatusEnum.FileCreated:
				return 'Файл создан ' + filename;
			case StatusEnum.DeleteFile:
				return 'Удаление файла ' + filename;
			case StatusEnum.DownloadFromCamera:
				return 'Скачивание файла ' + filename;
			// case StatusEnum.Pairing:
			// 	return 'Pairing';
			case StatusEnum.RecordVideo:
				return 'Запись видео';
			case StatusEnum.TakePhoto:
				return 'Фотографирование';
			case StatusEnum.GetLastFile:
				return 'Получение имени файла';
			default:
				return 'Unknown';
		}
	};

	
	/** */
	public static settings = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Settings' : 'Настройки';

	/** */
	public static buttonTest = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Test' : 'Тест';

	/** */
	public static buttonManualStart = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Start' : 'Запуск';

	/** */
	public static buttonAutoMode = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Auto mode' : 'Авт. режим';

	/** Вкладка Источники */
	public static frontSettings = class {
		/** */
		public static newPreset = (number: number, language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Preset ' + number : 'Набор ' + number;
		/** */
		public static createNewPreset = (number: number, language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Create new preset' : 'Создать новый набор';
		/** */
		public static preset = (name?: string, language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Preset: ' + (name ?? '') : 'Набор: ' + (name ?? '');
		/** */
		public static presets = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Presets' : 'Наборы';
		/** */
		public static presetName = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Preset name' : 'Название набора';
		/** */
		public static pingPong = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Ping pong' : 'Бумеранг';
		/** */
		public static multiplier = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Multiplier' : 'Множитель';
		/** */
		public static multiplierValue = (value: MultiplierEnum, language?: LanguageEnum): string => {
			if (language !== LanguageEnum.rus) {
				switch (value) {
					case MultiplierEnum.fast10Times:
						return '10 times faster';
					case MultiplierEnum.fast9Times:
						return '9 times faster';
					case MultiplierEnum.fast8Times:
						return '8 times faster';
					case MultiplierEnum.fast7Times:
						return '7 times faster';
					case MultiplierEnum.fast6Times:
						return '6 times faster';
					case MultiplierEnum.fast5Times:
						return '5 times faster';
					case MultiplierEnum.fast4Times:
						return '4 times faster';
					case MultiplierEnum.fast3Times:
						return '3 times faster';
					case MultiplierEnum.fast2Times:
						return '2 times faster';

					case MultiplierEnum.slow10Times:
						return '10 times slower';
					case MultiplierEnum.slow9Times:
						return '9 times slower';
					case MultiplierEnum.slow8Times:
						return '8 times slower';
					case MultiplierEnum.slow7Times:
						return '7 times slower';
					case MultiplierEnum.slow6Times:
						return '6 times slower';
					case MultiplierEnum.slow5Times:
						return '5 times slower';
					case MultiplierEnum.slow4Times:
						return '4 times slower';
					case MultiplierEnum.slow3Times:
						return '3 times slower';
					case MultiplierEnum.slow2Times:
						return '2 times slower';
				
					case MultiplierEnum.normal:
					default:
						return 'Normal speed';
				}
			}

			switch (value) {
				case MultiplierEnum.fast10Times:
					return 'Ускорение в 10 раз';
				case MultiplierEnum.fast9Times:
					return 'Ускорение в 9 раз';
				case MultiplierEnum.fast8Times:
					return 'Ускорение в 8 раз';
				case MultiplierEnum.fast7Times:
					return 'Ускорение в 7 раз';
				case MultiplierEnum.fast6Times:
					return 'Ускорение в 6 раз';
				case MultiplierEnum.fast5Times:
					return 'Ускорение в 5 раз';
				case MultiplierEnum.fast4Times:
					return 'Ускорение в 4 раза';
				case MultiplierEnum.fast3Times:
					return 'Ускорение в 3 раза';
				case MultiplierEnum.fast2Times:
					return 'Ускорение в 2 раза';

				case MultiplierEnum.slow10Times:
					return 'Замедление в 10 раз';
				case MultiplierEnum.slow9Times:
					return 'Замедление в 9 раз';
				case MultiplierEnum.slow8Times:
					return 'Замедление в 8 раз';
				case MultiplierEnum.slow7Times:
					return 'Замедление в 7 раз';
				case MultiplierEnum.slow6Times:
					return 'Замедление в 6 раз';
				case MultiplierEnum.slow5Times:
					return 'Замедление в 5 раз';
				case MultiplierEnum.slow4Times:
					return 'Замедление в 4 раза';
				case MultiplierEnum.slow3Times:
					return 'Замедление в 3 раза';
				case MultiplierEnum.slow2Times:
					return 'Замедление в 2 раза';
			
				case MultiplierEnum.normal:
				default:
					return 'Нормальная скорость';
			}
		}
		/** */
		public static multiplierValueShort0 = (value: MultiplierEnum, language?: LanguageEnum): string => {
			if (language !== LanguageEnum.rus) {
				switch (value) {
					case MultiplierEnum.fast10Times:
						return 'Faster 10x';
					case MultiplierEnum.fast9Times:
						return 'Faster 9x';
					case MultiplierEnum.fast8Times:
						return 'Faster 8x';
					case MultiplierEnum.fast7Times:
						return 'Faster 7x';
					case MultiplierEnum.fast6Times:
						return 'Faster 6x';
					case MultiplierEnum.fast5Times:
						return 'Faster 5x';
					case MultiplierEnum.fast4Times:
						return 'Faster 4x';
					case MultiplierEnum.fast3Times:
						return 'Faster 3x';
					case MultiplierEnum.fast2Times:
						return 'Faster 2x';

					case MultiplierEnum.slow10Times:
						return 'Slower 10x';
					case MultiplierEnum.slow9Times:
						return 'Slower 9x';
					case MultiplierEnum.slow8Times:
						return 'Slower 8x';
					case MultiplierEnum.slow7Times:
						return 'Slower 7x';
					case MultiplierEnum.slow6Times:
						return 'Slower 6x';
					case MultiplierEnum.slow5Times:
						return 'Slower 5x';
					case MultiplierEnum.slow4Times:
						return 'Slower 4x';
					case MultiplierEnum.slow3Times:
						return 'Slower 3x';
					case MultiplierEnum.slow2Times:
						return 'Slower 2x';
				
					case MultiplierEnum.normal:
					default:
						return 'Normal';
				}
			}


			switch (value) {
				case MultiplierEnum.fast10Times:
					return 'Ускорение 10x';
				case MultiplierEnum.fast9Times:
					return 'Ускорение 9x';
				case MultiplierEnum.fast8Times:
					return 'Ускорение 8x';
				case MultiplierEnum.fast7Times:
					return 'Ускорение 7x';
				case MultiplierEnum.fast6Times:
					return 'Ускорение 6x';
				case MultiplierEnum.fast5Times:
					return 'Ускорение 5x';
				case MultiplierEnum.fast4Times:
					return 'Ускорение 4x';
				case MultiplierEnum.fast3Times:
					return 'Ускорение 3x';
				case MultiplierEnum.fast2Times:
					return 'Ускорение 2x';

				case MultiplierEnum.slow10Times:
					return 'Замедление 10x';
				case MultiplierEnum.slow9Times:
					return 'Замедление 9x';
				case MultiplierEnum.slow8Times:
					return 'Замедление 8x';
				case MultiplierEnum.slow7Times:
					return 'Замедление 7x';
				case MultiplierEnum.slow6Times:
					return 'Замедление 6x';
				case MultiplierEnum.slow5Times:
					return 'Замедление 5x';
				case MultiplierEnum.slow4Times:
					return 'Замедление 4x';
				case MultiplierEnum.slow3Times:
					return 'Замедление 3x';
				case MultiplierEnum.slow2Times:
					return 'Замедление 2x';
			
				case MultiplierEnum.normal:
				default:
					return 'Нормально';
			}
		}
		/** */
		public static multiplierValueShort = (value: MultiplierEnum, language?: LanguageEnum): string => {
			if (language !== LanguageEnum.rus) {
				switch (value) {
					case MultiplierEnum.fast10Times:
						return '10x';
					case MultiplierEnum.fast9Times:
						return '9x';
					case MultiplierEnum.fast8Times:
						return '8x';
					case MultiplierEnum.fast7Times:
						return '7x';
					case MultiplierEnum.fast6Times:
						return '6x';
					case MultiplierEnum.fast5Times:
						return '5x';
					case MultiplierEnum.fast4Times:
						return '4x';
					case MultiplierEnum.fast3Times:
						return '3x';
					case MultiplierEnum.fast2Times:
						return '2x';

					case MultiplierEnum.slow10Times:
						return '10x';
					case MultiplierEnum.slow9Times:
						return '9x';
					case MultiplierEnum.slow8Times:
						return '8x';
					case MultiplierEnum.slow7Times:
						return '7x';
					case MultiplierEnum.slow6Times:
						return '6x';
					case MultiplierEnum.slow5Times:
						return '5x';
					case MultiplierEnum.slow4Times:
						return '4x';
					case MultiplierEnum.slow3Times:
						return '3x';
					case MultiplierEnum.slow2Times:
						return '2x';
				
					case MultiplierEnum.normal:
					default:
						return 'Normal speed';
				}
			}


			switch (value) {
				case MultiplierEnum.fast10Times:
					return 'Ускорение 10x';
				case MultiplierEnum.fast9Times:
					return 'Ускорение 9x';
				case MultiplierEnum.fast8Times:
					return 'Ускорение 8x';
				case MultiplierEnum.fast7Times:
					return 'Ускорение 7x';
				case MultiplierEnum.fast6Times:
					return 'Ускорение 6x';
				case MultiplierEnum.fast5Times:
					return 'Ускорение 5x';
				case MultiplierEnum.fast4Times:
					return 'Ускорение 4x';
				case MultiplierEnum.fast3Times:
					return 'Ускорение 3x';
				case MultiplierEnum.fast2Times:
					return 'Ускорение 2x';

				case MultiplierEnum.slow10Times:
					return 'Замедление 10x';
				case MultiplierEnum.slow9Times:
					return 'Замедление 9x';
				case MultiplierEnum.slow8Times:
					return 'Замедление 8x';
				case MultiplierEnum.slow7Times:
					return 'Замедление 7x';
				case MultiplierEnum.slow6Times:
					return 'Замедление 6x';
				case MultiplierEnum.slow5Times:
					return 'Замедление 5x';
				case MultiplierEnum.slow4Times:
					return 'Замедление 4x';
				case MultiplierEnum.slow3Times:
					return 'Замедление 3x';
				case MultiplierEnum.slow2Times:
					return 'Замедление 2x';
			
				case MultiplierEnum.normal:
				default:
					return 'Нормальная скорость';
			}
		}

		/** */
		public static speedMultipliers = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Speed multipliers' : 'Множители скорости';
		/** */
		public static intro = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Intro' : 'Intro';
		/** */
		public static outro = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Outro' : 'Outro';
		/** */
		public static audio = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Audio' : 'Аудио';
		/** */
		public static overlay = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Overlay' : 'Наложение';
		/** */
		public static zoom = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Zoom' : 'Увеличение';
		/** */
		public static disable = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Disable' : 'Отключить';
		/** */
		public static beforeSlow = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Before slow' : 'До замедления';
		/** */
		public static afterSlow = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'After slow' : 'После замедления';
		/** */
		public static afterPingPong = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'After pong pong' : 'После бумеранга';
		/** */
		public static forPhoto = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'For photo' : 'Для фото';
		/** */
		public static addButton = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Add item' : 'Добавить значение';
		/** */
		public static deleteButton = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Delete' : 'Удалить';
		/** */
		public static deletePresetButton = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Delete preset' : 'Удалить набор';
		/** */
		public static none = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'None' : 'Нет';
		/** */
		public static preview = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Preview' : 'Предпросмотр';
	};
	/** */
	// public static administration = (language?: LanguageEnum): string =>
	// 	language !== LanguageEnum.rus ? 'Administration' : 'Администрирование';

	// /** */
	// public static sendEmailToError = (language?: LanguageEnum): string =>
	// 	language !== LanguageEnum.rus ? 'Enter email' : 'Укажите куда отправить письмо';

	// /** */
	// public static selectedFilesError = (language?: LanguageEnum): string =>
	// 	language !== LanguageEnum.rus ? 'Select files' : 'Выберите файл';

	// /** */
	// public static sendEmail = (language?: LanguageEnum): string =>
	// 	language !== LanguageEnum.rus ? 'Send enail' : 'Отправить письмо';

	// /** */
	// public static sendEmailTo = (language?: LanguageEnum): string =>
	// 	language !== LanguageEnum.rus ? 'Where to send email' : 'Куда отправить письмо';

	// /** */
	// // public static labelEmailTo = (language?: LanguageEnum): string =>
	// // 	language !== LanguageEnum.rus ? 'Email' : 'Email';

	// /** */
	// public static print = (language?: LanguageEnum): string =>
	// 	language !== LanguageEnum.rus ? 'Print' : 'Распечатать';

	// /** */
	// public static printMiddleFrame = (language?: LanguageEnum): string =>
	// 	language !== LanguageEnum.rus ? 'Print middle frame' : 'Распечатать средний кадр';

	// /** */
	// public static printCurrentFrame = (language?: LanguageEnum): string =>
	// 	language !== LanguageEnum.rus ? 'Print current frame' : 'Распечатать текущий кадр';

	// /** */
	// // public static languageTitle = (language?: LanguageEnum): string =>
	// // 	language !== LanguageEnum.rus ? 'Change language' : 'Изменить язык';

	// /** */
	// public static languageDescription = (language?: LanguageEnum): string => {
	// 	switch (language) {
	// 		case LanguageEnum.rus:
	// 			return 'Рус';
	// 		case LanguageEnum.eng:
	// 		default:
	// 			return 'Eng';
	// 	}
	// };

	// /** */
	// public static notificationSendedByEmail = (count: number, language?: LanguageEnum): string => language !== LanguageEnum.rus ? `${count === 1 ? '1 file' : `${count} files`} sended to email` : `${plural(count, '%d файл', '%d файла', '%d файлов')} отправлено на почту`;

	// /** */
	// public static notificationSendedByEmailError = (count: number, language?: LanguageEnum): string => language !== LanguageEnum.rus ? `Error when sending ${count === 1 ? '1 file' : `${count} files`} to email` : `Ошибка при отправке ${plural(count, '%d файла', '%d файлов')} на почту`;

	// /** */
	// public static notificationSendingByEmail = (count: number, language?: LanguageEnum): string => language !== LanguageEnum.rus ? `${count === 1 ? '1 file' : `${count} files`} sending to email` : `${plural(count, '%d файл', '%d файла', '%d файлов')} отправляется на почту`;

	// /** */
	// public static notificationPrinted = (count: number, language?: LanguageEnum): string => language !== LanguageEnum.rus ? `${count === 1 ? '1 file' : `${count} files`} sended to print` : `${plural(count, '%d файл', '%d файла', '%d файлов')} отправлен на печать`;

	// /** */
	// public static notificationPrintedError = (count: number, language?: LanguageEnum): string => language !== LanguageEnum.rus ? `Error when sending ${count === 1 ? '1 file' : `${count} files`} to print` : `Ошибка при печати ${plural(count, '%d файла', '%d файлов')}`;

	// /** */
	// public static notificationPrinting = (count: number, language?: LanguageEnum): string => language !== LanguageEnum.rus ? `${count === 1 ? '1 file' : `${count} files`} sending to print` : `${plural(count, '%d файл', '%d файла', '%d файлов')} отправляется на печать`;

	// /** */
	// public static fileSizeInMb = (filesize?: number): string => `${((filesize ?? 0) / 1024 / 1024).toFixed(2)} Mb`;

	// /** */
	// public static fileResolution = (width: number, height: number): string => `${width}:${height}`;
}
