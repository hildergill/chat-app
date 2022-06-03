import { Connection, createConnection, ConnectionConfig } from "mysql";
import express, { Express, Request, Response, json, urlencoded } from "express";
import { Server as HttpServer, createServer as createHttpServer } from "http";
import createNextServer, { NextServer, NextServerOptions } from "next/dist/server/next";
import { resolve } from "path";

class App {
	private static instance: App;

	private databaseConnection: Connection;

	private expressServer: Express;
	private httpServer: HttpServer;
	private nextServer: NextServer;

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
	}

	public runApp(): void {
		const { BACKEND_PORT } = process.env,
			port: number = Number(BACKEND_PORT);

		const requestHandler = this.nextServer.getRequestHandler();

		this.nextServer.prepare().then(() => {
			this.expressServer.use(json(), urlencoded({ extended: false }));

			// TODO Add something here later

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

	public static get Instance(): App {
		return this.instance || (this.instance = new App());
	}
}

export default App.Instance;
