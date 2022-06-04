import { Socket } from "socket.io";
import Events from "../../events.json";
import App from "./app";

export default (client: Socket) => {
	console.log(`Client ${client.id} connected!`);

	client.on(Events.message, (displayName: string, content: string) => {
		const queryString: string = "insert into messages (author, content) values (?, ?)";

		App.DatabaseConnection.query(queryString, [displayName, content], (error) => {
			if (error) {
				console.error(error);
				return;
			}

			App.SocketServer.emit(Events.message, displayName, content);
		});
	});

	client.on("disconnect", () => {
		console.log(`Client ${client.id} disconnected!`);
	});
};
