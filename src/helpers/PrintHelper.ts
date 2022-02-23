import { BrowserWindow } from 'electron';

import { PrintSendingItemModel } from '../applications/kiosk/settings/PrintSendingItemModel';
import { PrintFitOnPageEnum, PrintLayoutEnum, PrintSettingsModel } from '../applications/kiosk/settings/tabs/print/PrintSettingsModel';

/** */
export class PrintHelper {
	/** */
	public static async printData(
		item?: PrintSendingItemModel,
		settings?: PrintSettingsModel
	): Promise<void> {
		const silent = true;
		const show = false;
		let win: BrowserWindow | undefined = new BrowserWindow({
			width: item?.width,
			height: item?.height,
			show,
		});
		// Could be redundant, try if you need this.
		if (!show) {
			win.once('ready-to-show', () => win?.hide());
		}
		const content = PrintHelper.getHtmlCoontent(item?.data, settings?.fitOnPage);
		await win.loadURL(content);
		win.webContents.print({
			silent,
			printBackground: true,
			deviceName: settings?.printer,
			landscape: settings?.layout !== PrintLayoutEnum.portrait
		},
		(success: boolean, errorType: string) => {
			if (!success) {
				console.error(errorType);
			}
			if (!show) {
				win?.close();
				win = undefined;
			}
		});
	}

	/**
	 */
	private static getHtmlCoontent(data?: string, fitOnPage?: PrintFitOnPageEnum): string {
		const size = PrintHelper.getSize(fitOnPage);
		return `data:text/html;charset=utf-8,
		<html>
			<body>
			</body>
			<style>
				body {
					background-image: url(${data});
					background-size: ${size};
					background-repeat: no-repeat;
					background-position: center center;
				}
			</style>
		</html>
	`;
	}

	/**
	 *
	 */
	private static getSize(fitOnPage?: PrintFitOnPageEnum): 'cover' | 'contain' {
		switch (fitOnPage) {
			case PrintFitOnPageEnum.cover:
				return 'cover';
			case PrintFitOnPageEnum.contain:
			default:
				return 'contain';
		}
	}
}
