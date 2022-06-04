import { Socket } from "socket.io";
import Events from "../../events.json";
import { createMessage, fetchLatestMessages } from "../helpers/messages";
import Message from "../models/message";
import App from "./app";

export default (client: Socket) => {
	console.log(`Client ${client.id} connected!`);

	client.on(Events.message, async (author: string, content: string) => {
		try {
			await createMessage(author, content);

			const messages: Message[] = await fetchLatestMessages();
			App.SocketServer.emit(Events.message, ...messages);
		} catch (error) {
			console.error(error);
		}
	});

	client.on("disconnect", () => {
		console.log(`Client ${client.id} disconnected!`);
	});
};
