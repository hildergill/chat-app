// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import express, { Express, Request, Response } from "express";
import { json, urlencoded } from "express";
import { config } from "dotenv";
import { resolve } from "path";
import { Server as HttpServer, createServer as createHttpServer } from "http";
import cookieParser from "cookie-parser";
import next from "next";
import ApiRoutes from "../../apiroutes.json";
import UsersRoute from "./routes/usersroute";
import MessagesRoute from "./routes/messagesroute";
import { initializeSocketServer } from "./sockethandler";

config();

const { NODE_ENV, BACKEND_PORT, BACKEND_SECRET } = process.env,
	port: number = parseInt(BACKEND_PORT!),
	dev: boolean = NODE_ENV === "development";

const expressServer: Express = express(),
	httpServer: HttpServer = createHttpServer(expressServer),
	nextServer = next({ dev, dir: resolve("src", "frontend") });

const requestHandler = nextServer.getRequestHandler();

initializeSocketServer(httpServer);

nextServer.prepare().then(() => {
	expressServer.use(json(), urlencoded({ extended: false }));
	expressServer.use(cookieParser(BACKEND_SECRET!));

	expressServer.use(ApiRoutes.users, UsersRoute);
	expressServer.use(ApiRoutes.messages, MessagesRoute);

	// TODO Add something here later

	expressServer.all("*", (req: Request, res: Response) => {
		return requestHandler(req, res);
	});

	httpServer.listen(port, () => {
		console.log(`Listening to port ${port}`);
	});
});
