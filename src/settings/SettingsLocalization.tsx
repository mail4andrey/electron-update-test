/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable max-classes-per-file */

import { DesignSizeEnum } from './DesignSettingsModel';
import { PrintFitOnPageEnum, PrintLayoutEnum } from './PrintSettingsModel';

/**
 *
 */
export class SettingsLocalization {
	/** Вкладка Источники */
	public static pathSourceTab = class {
		public static filesPattern = 'Файлы';

		public static title = 'Источники';

		public static pathSource = 'Источник';

		public static pathSelectButtonTitle = 'Выбрать папку';

		public static pathRemoveButtonTitle = 'Удалить папку';

		public static pathAddButtonTitle = 'Добавить папку';
	};

	/** Вкладка email */
	public static emailTab = class {
		public static title = 'Электронная почта';

		public static server = 'Сервер';

		public static login = 'Логин';

		public static password = 'Пароль';

		public static subject = 'Тема письма';

		public static content = 'Текст письма';

		public static testSendButton = 'Отправить пробное письмо';
	};

	/** Вкладка Печать */
	public static printerTab = class {

		public static title = 'Печать';

		public static printerName = 'Принтер';

		public static layoutName = 'Ориентация';

		public static fitOnPageName = 'Заполнение';

		public static testPrintButton = 'Распечатать пустую страницу';

		/** Ориентация */
		public static layoutEnum = (value?: PrintLayoutEnum): string => {
			switch (value) {
				case PrintLayoutEnum.portrait:
					return 'Портретная';
				default:
				case PrintLayoutEnum.landscape:
					return 'Горизонтальная';
			}
		};

		/** Заполнение */
		public static fitOnPageEnum = (value?: PrintFitOnPageEnum): string => {
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

		public static title = 'Дизайн';

		public static backgroundName = 'Основной фон';

		public static titleFrontPage = 'Заголовок страницы';

		public static backgroundToolbarName = 'Фон заголовка страницы';

		public static backgroundGroupName = 'Фон заголовка группы файлов';

		public static backgroundFileCardName = 'Фон карточки файла';

		public static sizeName = 'Размер';

		/** Размер */
		public static sizeEnum = (value?: DesignSizeEnum): string => {
			switch (value) {
				// case DesignSizeEnum.large:
				// 	return 'Большой';
				case DesignSizeEnum.small:
					return 'Малый';
				default:
				case DesignSizeEnum.medium:
					return 'Средний';
			}
		};
	};

	/** Вкладка Web */
	public static serverTab = class {

		public static title = 'Web';

		public static port = 'Порт';

		public static portWarning = 'Необходимо перезапустить приложение';
	};

	public static title = 'Настройки';

	// public static cancel = 'Отмена';

	public static saveButton = 'Сохранить';

	public static cancelButton = 'Отменить';
}
