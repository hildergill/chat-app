import { Socket } from "socket.io";

export default (client: Socket) => {
	console.log(`Client ${client.id} connected!`);

	client.on("disconnect", () => {
		console.log(`Client ${client.id} disconnected!`);
	});
};
