import { useMemo } from "react";
import { Socket, io } from "socket.io-client";

const ChatPage = () => {
	const socketClient: Socket = useMemo(() => io(), []);

	return <></>;
};

export default ChatPage;
