/** Интерфейс таймера */
export interface ITimer {
	/** Изменить интервал выполнения */
	changeInterval: (interval: number) => void;

	/** Запуск таймера */
	execute: () => void;

	/** Остановка таймера */
	stop: () => void;
}


/** Таймер */
export class Timer implements ITimer {
	/** Функция */
	private readonly action: () => Promise<void>;

	/** Выполнять один раз функцию */
	private readonly executeOneTime: boolean;

	/** Промежуток в миллисекундах, через которое должна запускаться функция */
	private interval: number;

	/** Флаг остановки таймера */
	private stopFlag = false;

	/** Таймер */
	private timer?: any;
	// private timer?: NodeJS.Timeout;

	/**
	 * @param interval - промежуток в миллисекундах, через которое должна запускаться функция
	 * @param action - функция, которая должна запускаться
	 */
	/** ctor */
	public constructor(interval: number, action: () => Promise<void>, executeOneTime: boolean = false) {
		this.interval = interval;
		this.action = action;
		this.executeOneTime = executeOneTime;
	}

	/** Изменить интервал выполнения */
	public changeInterval(interval: number): void {
		this.interval = interval;
		this.stop();
		this.execute();
	}

	/** Запускаем таймер */
	public execute(): void {
		const { interval } = this;
		this.timer = setTimeout(
			async () => {
				const { action, executeOneTime, stopFlag } = this;
				if (stopFlag) {
					return;
				}

				await action();
				if (!executeOneTime) {
					this.execute();
				}
			},
			interval
		);
	}

	/** Остановка таймера */
	public stop(): void {
		this.stopFlag = true;
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = undefined;
		}
	}
}

