import express, { Express, Request, Response } from "express";
import { Server as HttpServer, createServer as createHttpServer } from "http";

const { NODE_ENV, BACKEND_PORT } = process.env;

const port: number = Number(BACKEND_PORT);

const expressServer: Express = express(),
	httpServer: HttpServer = createHttpServer(expressServer);

httpServer.listen(port, () => {
	console.log(`Listening to port ${port}...`);
});
