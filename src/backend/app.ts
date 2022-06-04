import { Connection, createConnection, ConnectionConfig } from "mysql";
import express, { Express, Request, Response, json, urlencoded } from "express";
import { Server as HttpServer, createServer as createHttpServer } from "http";
import createNextServer, { NextServer, NextServerOptions } from "next/dist/server/next";
import { resolve } from "path";
import { Server as SocketServer } from "socket.io";
import EventsHandler from "./eventshandler";
import UsersRoute from "./routes/users";
import CookieParser from "cookie-parser";

class App {
	private static instance: App;

	private databaseConnection: Connection;

	private expressServer: Express;
	private httpServer: HttpServer;
	private nextServer: NextServer;
	private socketServer: SocketServer;

	constructor() {
		const { DATABASE_HOSTNAME, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env,
			connectionConfig: ConnectionConfig = {
				host: DATABASE_HOSTNAME,
				user: DATABASE_USERNAME,
				password: DATABASE_PASSWORD,
				database: "chat_app"
			};

		this.databaseConnection = createConnection(connectionConfig);

		const { NODE_ENV } = process.env,
			serverConfig: NextServerOptions = {
				dev: NODE_ENV === "development",
				dir: resolve("src", "frontend"),
				quiet: NODE_ENV !== "development"
			};

		this.expressServer = express();
		this.httpServer = createHttpServer(this.expressServer);
		this.nextServer = createNextServer(serverConfig);
		this.socketServer = new SocketServer(this.httpServer);
	}

	public runApp(): void {
		const { BACKEND_PORT } = process.env,
			port: number = Number(BACKEND_PORT);

		const requestHandler = this.nextServer.getRequestHandler();

		this.socketServer.on("connect", EventsHandler);

		this.nextServer.prepare().then(() => {
			this.expressServer.use(json(), urlencoded({ extended: false }));
			this.expressServer.use(CookieParser(process.env.BACKEND_SECRET));

			// TODO Add something here later

			this.expressServer.use("/api/users/", UsersRoute);

			this.expressServer.all("*", (req: Request, res: Response) => {
				return requestHandler(req, res);
			});

			this.httpServer.listen(port, () => {
				console.log(`Listening to port ${port}...`);
			});
		});
	}

	public get DatabaseConnection(): Connection {
		return this.databaseConnection;
	}

	public get SocketServer(): SocketServer {
		return this.socketServer;
	}

	public static get Instance(): App {
		return this.instance || (this.instance = new App());
	}
}

export default App.Instance;
