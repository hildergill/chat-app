import express from "express";
import { Express, Request, Response, Handler, json, urlencoded } from "express";
import { Server as HttpServer, createServer as createHttpServer } from "http";
import { NextServer } from "next/dist/server/next";
import CookieParser from "cookie-parser";
import next from "next";
import { Socket, Server as SocketServer } from "socket.io";
import events from "../../events.json";

export type MiddlewareItem = {
	path: string;
	handler: Handler;
};

class Servers {
	private static instance: Servers;

	private expressServer: Express;
	private httpServer: HttpServer;
	private nextServer: NextServer;
	private socketServer: SocketServer;

	private middlewares: MiddlewareItem[];

	constructor() {
		const { NODE_ENV } = process.env;

		this.middlewares = [];

		this.expressServer = express();
		this.httpServer = createHttpServer(this.expressServer);
		this.nextServer = next({ dev: NODE_ENV === "development" });
		this.socketServer = new SocketServer(this.httpServer);

		this.socketServer.on("connection", (client: Socket) => {
			console.log(`Client ${client.id} connected!`);

			client.on(events.message.user, (author: string, messageString: string) => {
				// TODO Add something here later

				this.socketServer.emit(events.message.user);
			});
		});
	}

	public addMiddleware(path: string, handler: Handler): void {
		this.middlewares.push({ path, handler });
	}

	public startServer(): void {
		const { BACKEND_PORT, BACKEND_SECRET } = process.env;

		const requestHandler = this.nextServer.getRequestHandler();
		const port: number = Number(BACKEND_PORT);

		this.nextServer.prepare().then(() => {
			this.expressServer.use(json(), urlencoded({ extended: false }));
			this.expressServer.use(CookieParser(BACKEND_SECRET));

			this.middlewares.forEach(({ path, handler }: MiddlewareItem) => {
				this.expressServer.use(path, handler);
			});

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
