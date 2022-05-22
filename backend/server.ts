import express, { Express, Request, Response, json, urlencoded } from "express";
import { Server as HttpServer, createServer as createHttpServer } from "http";
import next from "next";

const { NODE_ENV, BACKEND_PORT } = process.env;

const port: number = Number(BACKEND_PORT);

const expressServer: Express = express(),
	httpServer: HttpServer = createHttpServer(expressServer),
	nextServer = next({ dev: NODE_ENV === "development" });

const requestHandler = nextServer.getRequestHandler();

nextServer.prepare().then(() => {
	expressServer.use(json(), urlencoded({ extended: false }));

	// TODO Add something here later

	expressServer.all("*", (request: Request, response: Response) => {
		return requestHandler(request, response);
	});

	httpServer.listen(port, () => {
		console.log(`Listening to port ${port}...`);
	});
});
