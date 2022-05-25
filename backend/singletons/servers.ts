import express, { Handler } from "express";
import { Express, Request, Response, json, urlencoded } from "express";
import { Server as HttpServer, createServer as createHttpServer } from "http";
import { NextServer } from "next/dist/server/next";
import CookieParser from "cookie-parser";
import next from "next";

class Servers {
	private static instance: Servers;

	private expressServer: Express;
	private httpServer: HttpServer;
	private nextServer: NextServer;

	constructor() {
		const { NODE_ENV } = process.env;

		this.expressServer = express();
		this.httpServer = createHttpServer(this.expressServer);
		this.nextServer = next({ dev: NODE_ENV === "development" });
	}

	public startServer(): void {
		const { BACKEND_PORT, BACKEND_SECRET } = process.env;

		const requestHandler = this.nextServer.getRequestHandler();
		const port: number = Number(BACKEND_PORT);

		this.nextServer.prepare().then(() => {
			this.expressServer.use(json(), urlencoded({ extended: false }));
			this.expressServer.use(CookieParser(BACKEND_SECRET));

			// TODO Add something here later

			this.expressServer.all("*", (request: Request, response: Response) => {
				return requestHandler(request, response);
			});

			this.httpServer.listen(3000, () => {
				console.log(`Listening to port ${port}...`);
			});
		});
	}

	public static get Instance(): Servers {
		return this.instance || (this.instance = new Servers());
	}
}

export default Servers.Instance;
