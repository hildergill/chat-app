import { useMemo } from "react";
import { Socket, io } from "socket.io-client";

const ChatPage = () => {
	const socketClient: Socket = useMemo<Socket>(() => io(), []);

	return (
		<div>
			{/* TODO Add something here later */}
			{/* TODO Add something here later */}
			{/* TODO Add something here later */}
		</div>
	);
};

export default ChatPage;
