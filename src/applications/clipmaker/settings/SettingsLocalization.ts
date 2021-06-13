/* eslint-disable no-confusing-arrow */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable max-classes-per-file */

import { GoProStateEnum } from './tabs/goPro/GoProSettingsModel';
import { FitWithinEnum, RenderOnEnum } from './tabs/video/VideoSettingsModel';

import { LanguageEnum } from '../../../src-front/views/LanguageEnum';

/** */
export class SettingsLocalization {
	/** Вкладка Источники */
	public static pathSourcesTab = class {
		/** */
		public static title = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Folders' : 'Папки';

		/** */
		public static pathSource = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Source path' : 'Папка источник';

		/** */
		public static pathDestination = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Destination path' : 'Папка назначение';

		/** */
		public static pathTestSource = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Test source path' : 'Тестовая папка источник';

		/** */
		public static pathSelectButtonTitle = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Select source' : 'Выбрать папку';

		/** */
		public static fileNamePattern = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Pattern of file names ' : 'Шаблон для имени файлов';

		/** */
		public static fileNamePatternExtension = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? '_####.mp4' : '_####.mp4';

		// /** */
		// public static pathRemoveButtonTitle = (language?: LanguageEnum): string =>
		// 	language !== LanguageEnum.rus ? 'Remove source' : 'Удалить папку';

		// /** */
		// public static pathAddButtonTitle = (language?: LanguageEnum): string =>
		// 	language !== LanguageEnum.rus ? 'Add source' : 'Добавить папку';
	};

	/** Вкладка GoPro */
	public static goProTab = class {
		/** */
		public static title = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'GoPro' : 'GoPro';

		/** */
		public static removeFromGoPro = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Remove recorded file from GoPro' : 'Удалять записи с камеры GoPro';

		/** */
		public static legend = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Legend' : 'Описание цветов';

		/** */
		public static showColorStateGoPro = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Show indicator with camera status' : 'Показывать индикатор состояния камеры';

		/** */
		public static legendDescription = (language?: LanguageEnum, value?: GoProStateEnum): string => {
			if (language !== LanguageEnum.rus) {
				switch (value) {
					case GoProStateEnum.error:
						return 'Error';
					case GoProStateEnum.paired:
						return 'Connected';
					case GoProStateEnum.startRecord:
						return 'Start Record';
					case GoProStateEnum.success:
						return 'Success';
					case GoProStateEnum.waiting:
						return 'Waiting';
					default:
					case GoProStateEnum.unknown:
						return 'Unknown';
				}
			}
			switch (value) {
				case GoProStateEnum.error:
					return 'Ошибка';
				case GoProStateEnum.paired:
					return 'Подключена';
				case GoProStateEnum.startRecord:
					return 'Начало записи';
				case GoProStateEnum.success:
					return 'Успешно';
				case GoProStateEnum.waiting:
					return 'Ожидание';
				default:
				case GoProStateEnum.unknown:
					return 'Неизвестно';
			}
		};
	};

	/** Вкладка Video */
	public static videoTab = class {
		/** */
		public static title = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Video' : 'Видео';

		/** */
		public static addThumbnail = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Add thumbnail from middle frame' : 'Добавить эскиз из среднего кадра';

		/** */
		public static fadeIn = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Fade In' : 'Проявление';

		/** */
		public static fadeOut = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Fade Out' : 'Затухание';

		/** */
		public static duration = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Duration' : 'Длительность';

		/** */
		public static seconds = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'seconds' : 'секунд';

		/** */
		public static fps = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Fps' : 'Fps';

		/** */
		public static maxBitrate = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Max bitrate' : 'Максимальный битрейт';

		/** */
		public static kbitPerSeconds = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'KBit/s' : 'KBit/s';

		/** */
		public static resolution = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Resolution' : 'Разрешение';

		/** */
		public static width = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Width' : 'Ширина';

		/** */
		public static height = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Height' : 'Высота';

		/** */
		public static renderOn = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Render on' : 'Рендер на';

		/** */
		public static fitWithin = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Fit within' : 'Растяжение';

		/** */
		public static encode = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Encode video' : 'Создание видео';

		/** */
		public static fitWithinItemDescription = (language?: LanguageEnum, value?: FitWithinEnum): string => {
			if (language !== LanguageEnum.rus) {
				switch (value) {
					case FitWithinEnum.byHeight:
						return 'By Height';
					case FitWithinEnum.byWidth:
						return 'By Width';
					default:
					case FitWithinEnum.fitAll:
						return 'By Width and Height';
				}
			}
			switch (value) {
				case FitWithinEnum.byHeight:
					return 'По высоте';
				case FitWithinEnum.byWidth:
					return 'По ширине';
				default:
				case FitWithinEnum.fitAll:
					return 'По ширине и высоте';
			}
		};

		/** */
		public static renderOnItemDescription = (language?: LanguageEnum, value?: RenderOnEnum): string => {
			switch (value) {
				case RenderOnEnum.nvidiaH264:
					return 'Nvidia (h264qsv)';
				case RenderOnEnum.nvidiaNvench:
					return 'Nvidia (nvench264)';
				case RenderOnEnum.radeon:
					return 'Radeon (h264amf)';
				default:
				case RenderOnEnum.cpu:
					return 'CPU (libx264)';
			}
		};
	};

	/** Вкладка Intro Outro */
	public static introOutroTab = class {
		/** */
		public static title = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Intro/Outro' : 'Intro/Outro';
	};

	/** Вкладка Overlay */
	public static overlayTab = class {
		/** */
		public static title = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Overlay' : 'Наложение';
	};

	/** Вкладка Audio */
	public static audioTab = class {
		/** */
		public static title = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Audio' : 'Звук';
	};

	/** Вкладка Transition */
	public static transitionTab = class {
		/** */
		public static title = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Transitions' : 'Переходы';
	};

	// /** Вкладка email */
	// public static emailTab = class {
	// 	/** */
	// 	public static title = (language?: LanguageEnum): string =>
	// 		language !== LanguageEnum.rus ? 'Email' : 'Электронная почта';

	// 	/** */
	// 	public static server = (language?: LanguageEnum): string =>
	// 		language !== LanguageEnum.rus ? 'Smtp server' : 'Smtp сервер';

	// 	/** */
	// 	public static login = (language?: LanguageEnum): string =>
	// 		language !== LanguageEnum.rus ? 'Login' : 'Логин';

	// 	/** */
	// 	public static password = (language?: LanguageEnum): string =>
	// 		language !== LanguageEnum.rus ? 'Password' : 'Пароль';

	// 	/** */
	// 	public static subject = (language?: LanguageEnum): string =>
	// 		language !== LanguageEnum.rus ? 'Email theme' : 'Тема письма';

	// 	/** */
	// 	public static content = (language?: LanguageEnum): string =>
	// 		language !== LanguageEnum.rus ? 'Email text' : 'Текст письма';

	// 	/** */
	// 	public static testSendButton = (language?: LanguageEnum): string =>
	// 		language !== LanguageEnum.rus ? 'Send email to yourself' : 'Отправить пробное письмо';
	// };

	// /** Вкладка Печать */
	// public static printerTab = class {

	// 	/** */
	// 	public static title = (language?: LanguageEnum): string =>
	// 		language !== LanguageEnum.rus ? 'Print' : 'Печать';

	// 	/** */
	// 	public static printerName = (language?: LanguageEnum): string =>
	// 		language !== LanguageEnum.rus ? 'Printer' : 'Принтер';

	// 	/** */
	// 	public static layoutName = (language?: LanguageEnum): string =>
	// 		language !== LanguageEnum.rus ? 'Orientation' : 'Ориентация';

	// 	/** */
	// 	public static fitOnPageName = (language?: LanguageEnum): string =>
	// 		language !== LanguageEnum.rus ? 'Fit on page' : 'Заполнение';

	// 	/** */
	// 	public static testPrintButton = (language?: LanguageEnum): string =>
	// 		language !== LanguageEnum.rus ? 'Print empty page' : 'Распечатать пустую страницу';

	// 	/** Ориентация */
	// 	public static layoutEnum = (language?: LanguageEnum, value?: PrintLayoutEnum): string => {
	// 		if (language !== LanguageEnum.rus) {
	// 			switch (value) {
	// 				case PrintLayoutEnum.portrait:
	// 					return 'Portrait';
	// 				default:
	// 				case PrintLayoutEnum.landscape:
	// 					return 'Landscape';
	// 			}
	// 		}
	// 		switch (value) {
	// 			case PrintLayoutEnum.portrait:
	// 				return 'Портретная';
	// 			default:
	// 			case PrintLayoutEnum.landscape:
	// 				return 'Горизонтальная';
	// 		}
	// 	};

	// 	/** Заполнение */
	// 	public static fitOnPageEnum = (language?: LanguageEnum, value?: PrintFitOnPageEnum): string => {
	// 		if (language !== LanguageEnum.rus) {
	// 			switch (value) {
	// 				case PrintFitOnPageEnum.contain:
	// 					return 'Contain';
	// 				default:
	// 				case PrintFitOnPageEnum.cover:
	// 					return 'Cover';
	// 			}
	// 		}
	// 		switch (value) {
	// 			case PrintFitOnPageEnum.contain:
	// 				return 'Все изображение';
	// 			default:
	// 			case PrintFitOnPageEnum.cover:
	// 				return 'На всю страницу';
	// 		}
	// 	};
	// };

	/** Вкладка Дизайн */
	public static designTab = class {

		/** */
		public static title = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Design' : 'Дизайн';

		/** */
		public static backgroundName = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Main background' : 'Основной фон';

		/** */
		public static titleFrontPage = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Title page' : 'Заголовок страницы';

		/** */
		public static backgroundToolbarName = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Toolbar background' : 'Фон заголовка страницы';

		/** */
		public static backgroundGroupName = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Group background' : 'Фон заголовка группы файлов';

		/** */
		public static backgroundFileCardName = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'File background' : 'Фон карточки файла';

		/** */
		public static iconColorName = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Icons color' : 'Цвет иконок';

		/** */
		// public static sizeName = (language?: LanguageEnum): string =>
		// 	language !== LanguageEnum.rus ? 'Size' : 'Размер';

		/** Размер */
		// public static sizeEnum = (value?: DesignSizeEnum): string => {
		// 	switch (value) {
		// 		case DesignSizeEnum.large:
		// 			return 'Большой';
		// 		case DesignSizeEnum.small:
		// 			return 'Малый';
		// 		default:
		// 		case DesignSizeEnum.medium:
		// 			return 'Средний';
		// 	}
		// };
	};

	/** Вкладка Web */
	public static serverTab = class {

		/** */
		public static title = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Web' : 'Web';

		/** */
		public static port = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Port' : 'Порт';

		/** */
		public static portWarning = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Need restart application' : 'Необходимо перезапустить приложение';
	};

	/** */
	public static title = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Settings' : 'Настройки';

	// public static cancel = 'Отмена';

	/** */
	public static saveButton = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Save' : 'Сохранить';

	/** */
	public static cancelButton = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Cancel' : 'Отменить';
}
