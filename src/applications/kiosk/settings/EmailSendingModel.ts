
/** Модель отправки письма */
export class EmailSendingModel {
	/** */
	public server?: string;

	/** */
	public login?: string;

	/** */
	public password?: string;

	/** */
	// public from?: string;

	/** */
	public to?: string;

	/** */
	public subject?: string;

	/** */
	public content?: string;

	/** */
	public attachments?: string[];
}
