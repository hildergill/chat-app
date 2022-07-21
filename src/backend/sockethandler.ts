// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { Socket, Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import Events from "../../events.json";
import { createMessage } from "../helpers/messages";

let socketServer: SocketServer;

export const sendUserRegisteredEvent = () => {
	socketServer.emit(Events.userAccount.registered);
};

export const initializeSocketServer = (httpServer: HttpServer) => {
	socketServer = new SocketServer(httpServer);

	socketServer.on("connection", (client: Socket) => {
		console.log(`Client ${client.id} connected!`);

		client.on(Events.message, async (author: string, content: string) => {
			try {
				await createMessage(author, content);
				socketServer.emit(Events.message);
			} catch (error) {
				console.error(error);
			}
		});
	});
};
