import { networkInterfaces, hostname } from 'os';

// import { ApplicationSettingsController } from '../application/ApplicationSettingsController';

/** */
export class UrlHelper {
	private static port?: number;

	/** */
	public static setport(port: number): void {
		this.port = port;
	}

	/** */
	public static getUrl(path: string): string {
		const { port } = this;
		if (port) {
			return `http://${hostname}:${port}/${path}`;
		}
		const { host } = location;
		// return `http://${host}/${path}`;
		// const applicationController = new ApplicationSettingsController();
		// const settings = applicationController.loadDefaultSettings();
		// const hostname = location.hostname && location.hostname.length > 0 ? location.hostname : UrlHelper.getHostName();
		return `http://${host}/${path}`;
	}

	/** */
	public static getLocalIp(): string | undefined {
		const nets = networkInterfaces();
		// const results = {};

		for (const key of Object.keys(nets)) {
			for (const net of nets[key]!) {
				// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
				if (net.family === 'IPv4' && !net.internal) {
					// console.log(net.address);
					return net.address;
					// if (!results[key]) {
					// 	results[key] = [];
					// }
					// results[key].push(net.address);
				}
			}
		}
	}

	/** */
	public static getHostName(): string {
		return hostname();
		// return new Promise((resolve, reject) => {
		// 	lookup(hostname(), (error, address, fam) => {
		// 		console.log(`addr: ${address}`);
		// 		resolve(address);
		// 		// return address;
		// 	});
		// });
	}
}
