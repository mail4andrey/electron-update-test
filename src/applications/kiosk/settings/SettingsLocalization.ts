/* eslint-disable no-confusing-arrow */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable max-classes-per-file */

import { PrintFitOnPageEnum, PrintLayoutEnum } from './tabs/print/PrintSettingsModel';

import { LanguageEnum } from '../../../src-front/models/LanguageEnum';


/** */
export class SettingsLocalization {
	/** Вкладка Источники */
	public static pathSourcesTab = class {
		/** */
		public static title = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Sources' : 'Источники';

		/** */
		public static pathSource = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Source' : 'Источник';

		/** */
		public static pathSelectButtonTitle = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Select source' : 'Выбрать папку';

		/** */
		public static pathOpenButtonTitle = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Open source' : 'Открыть папку';

		/** */
		public static pathRemoveButtonTitle = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Remove source' : 'Удалить папку';

		/** */
		public static pathAddButtonTitle = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Add source' : 'Добавить папку';
	};

	/** Вкладка email */
	public static emailTab = class {
		/** */
		public static title = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Email' : 'Электронная почта';

		/** */
		public static server = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Smtp server' : 'Smtp сервер';

		/** */
		public static login = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Login' : 'Логин';

		/** */
		public static password = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Password' : 'Пароль';

		/** */
		public static subject = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Email theme' : 'Тема письма';

		/** */
		public static content = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Email text' : 'Текст письма';

		/** */
		public static testSendButton = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Send email to yourself' : 'Отправить пробное письмо';
	};

	/** Вкладка Печать */
	public static printerTab = class {

		/** */
		public static title = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Print' : 'Печать';

		/** */
		public static printerName = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Printer' : 'Принтер';

		/** */
		public static layoutName = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Orientation' : 'Ориентация';

		/** */
		public static fitOnPageName = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Fit on page' : 'Заполнение';

		/** */
		public static testPrintButton = (language?: LanguageEnum): string =>
			language !== LanguageEnum.rus ? 'Print empty page' : 'Распечатать пустую страницу';

		/** Ориентация */
		public static layoutEnum = (language?: LanguageEnum, value?: PrintLayoutEnum): string => {
			if (language !== LanguageEnum.rus) {
				switch (value) {
					case PrintLayoutEnum.portrait:
						return 'Portrait';
					default:
					case PrintLayoutEnum.landscape:
						return 'Landscape';
				}
			}
			switch (value) {
				case PrintLayoutEnum.portrait:
					return 'Портретная';
				default:
				case PrintLayoutEnum.landscape:
					return 'Горизонтальная';
			}
		};

		/** Заполнение */
		public static fitOnPageEnum = (language?: LanguageEnum, value?: PrintFitOnPageEnum): string => {
			if (language !== LanguageEnum.rus) {
				switch (value) {
					case PrintFitOnPageEnum.contain:
						return 'Contain';
					default:
					case PrintFitOnPageEnum.cover:
						return 'Cover';
				}
			}
			switch (value) {
				case PrintFitOnPageEnum.contain:
					return 'Все изображение';
				default:
				case PrintFitOnPageEnum.cover:
					return 'На всю страницу';
			}
		};
	};

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


	/** */
	public static saveButton = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Save' : 'Сохранить';

	/** */
	public static cancelButton = (language?: LanguageEnum): string =>
		language !== LanguageEnum.rus ? 'Cancel' : 'Отменить';
}
