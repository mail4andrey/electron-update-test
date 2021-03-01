// import { lookup } from 'dns';
// import { networkInterfaces, hostname } from 'os';

/** */
export class UrlHelper {
	/** */
	public static getUrl(path: string): string {
		const { hostname } = location;// UrlHelper.getLocalIp();
		// UrlHelper.getHostName();
		return `http://${hostname}:8001/${path}`;
	}

	/** */
	// private static getLocalIp(): string | undefined {
	// 	const nets = networkInterfaces();
	// 	const results = {};

	// 	for (const key of Object.keys(nets)) {
	// 		for (const net of nets[key]!) {
	// 			// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
	// 			if (net.family === 'IPv4' && !net.internal) {
	// 				console.log(net.address);
	// 				return net.address;
	// 				// if (!results[key]) {
	// 				// 	results[key] = [];
	// 				// }
	// 				// results[key].push(net.address);
	// 			}
	// 		}
	// 	}
	// }

	/** */
	// private static getHostName(): string | undefined {
	// lookup(hostname(), (error, address, fam) => {
	// 	console.log(`addr: ${address}`);
	// 	return address;
	// });
	// }
}
