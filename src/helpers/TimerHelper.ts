/** */
export class TimerHelper {
	public static delay(milliseconds: number): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, milliseconds);
		});
	}
}