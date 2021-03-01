import log from 'electron-log';

/**
 *
 */
export function setupUpdates(): void {
	try {
		require('update-electron-app')({
			repo: 'mail4andrey/electron-update-test',
			updateInterval: '1 hour',
			logger: log
		});
	} catch (err) {
		log.error(`Unable to enable updates: ${err}`);
	}
}
