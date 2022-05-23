import express, { Express, Request, Response, json, urlencoded } from "express";
import { Server as HttpServer, createServer as createHttpServer } from "http";
import next from "next";
import CookieParser from "cookie-parser";
import UsersRoute from "./routes/usersroute";

const { NODE_ENV, BACKEND_PORT, BACKEND_SECRET } = process.env;

const port: number = Number(BACKEND_PORT);

const expressServer: Express = express(),
	httpServer: HttpServer = createHttpServer(expressServer),
	nextServer = next({ dev: NODE_ENV === "development" });

const requestHandler = nextServer.getRequestHandler();

nextServer.prepare().then(() => {
	expressServer.use(json(), urlencoded({ extended: false }));
	expressServer.use(CookieParser(BACKEND_SECRET));

	expressServer.use("/api/users/", UsersRoute);

	// TODO Add something here later

	expressServer.all("*", (request: Request, response: Response) => {
		return requestHandler(request, response);
	});

	httpServer.listen(port, () => {
		console.log(`Listening to port ${port}...`);
	});
});
