import express, { Express, Request, Response } from "express";
import { Server as HttpServer, createServer as createHttpServer } from "http";

class Servers {
	private static instance: Servers;

	private expressServer: Express;
	private httpServer: HttpServer;

	constructor() {
		this.expressServer = express();
		this.httpServer = createHttpServer(this.expressServer);
	}

	public startServer(): void {
		const { BACKEND_PORT } = process.env;

		const port: number = Number(BACKEND_PORT);

		// TODO Add something here later

		this.httpServer.listen(3000, () => {
			console.log(`Listening to port ${port}...`);
		});
	}

	public static get Instance(): Servers {
		return this.instance || (this.instance = new Servers());
	}
}

export default Servers.Instance;
