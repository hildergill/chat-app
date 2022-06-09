// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import express from "express";
import { Express, Request, Response, json, urlencoded } from "express";
import { Server as HttpServer, createServer as createHttpServer } from "http";
import { NextServer } from "next/dist/server/next";
import CookieParser from "cookie-parser";
import next from "next";
import { Socket, Server as SocketServer } from "socket.io";
import events from "../../events.json";
import { createMessage } from "../helpers/messages";
import { resolve } from "path";
import UsersRoute from "./routes/usersroute";
import MessagesRoute from "./routes/messagesroute";
import { Connection, createConnection } from "mysql";

class App {
	private static instance: App;

	private databaseConnection: Connection;

	private expressServer: Express;
	private httpServer: HttpServer;
	private nextServer: NextServer;
	private socketServer: SocketServer;

	constructor() {
		const { NODE_ENV } = process.env;

		const { DATABASE_HOSTNAME: host, DATABASE_USERNAME: user, DATABASE_PASSWORD: password } = process.env,
			database: string = "chat_app";

		this.databaseConnection = createConnection({ host, user, password, database });

		this.expressServer = express();
		this.httpServer = createHttpServer(this.expressServer);
		this.nextServer = next({ dev: NODE_ENV === "development", dir: resolve("src", "frontend") });
		this.socketServer = new SocketServer(this.httpServer);

		this.socketServer.on("connection", (client: Socket) => {
			console.debug(`Client connected: ${client.id}`);

			client.on(events.message, async (author: string, content: string) => {
				try {
					await createMessage(author, content);
					this.socketServer.emit(events.message);

					console.debug(author, content);
				} catch (error) {
					console.error(error);
				}
			});
		});
	}

	public startServer(): void {
		const { BACKEND_PORT, BACKEND_SECRET } = process.env;

		const requestHandler = this.nextServer.getRequestHandler();
		const port: number = Number(BACKEND_PORT);

		this.nextServer.prepare().then(() => {
			this.expressServer.use(json(), urlencoded({ extended: false }));
			this.expressServer.use(CookieParser(BACKEND_SECRET));

			this.expressServer.use("/api/users/", UsersRoute);
			this.expressServer.use("/api/messages/", MessagesRoute);

			this.expressServer.all("*", (request: Request, response: Response) => {
				return requestHandler(request, response);
			});

			this.httpServer.listen(3000, () => {
				console.debug(`Listening to port ${port}...`);
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
