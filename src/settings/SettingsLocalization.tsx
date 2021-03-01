/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable max-classes-per-file */
/**
 *
 */
export class SettingsLocalization {
	/** Вкладка Источники */
	public static sourceTab = class {
		public static filesPattern = 'Файлы';

		public static title = 'Источники';

		public static pathSource = 'Источник';
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

	public static title = 'Настройки';

	// public static cancel = 'Отмена';

	public static pathSelectButtonTitle = 'Выбрать папку';

	public static pathRemoveButtonTitle = 'Удалить папку';

	public static pathAddButtonTitle = 'Добавить папку';

	public static saveButton = 'Сохранить';

	public static cancelButton = 'Отменить';
}
