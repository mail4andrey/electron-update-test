import { networkInterfaces, hostname } from 'os';

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
		return `http://${host}/${path}`;
	}

	/** */
	public static getLocalIp(): string | undefined {
		const nets = networkInterfaces();

		for (const key of Object.keys(nets)) {
			for (const net of nets[key]!) {
				// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
				if (net.family === 'IPv4' && !net.internal) {
					return net.address;
				}
			}
		}
	}

	/** */
	public static getHostName(): string {
		return hostname();
	}
}
