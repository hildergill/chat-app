import { createContext, useMemo, Context } from "react";
import { Socket, io } from "socket.io-client";
import { MessageInput } from "../components/chatpage/messageinput";

type ChatPageContext = {
	socketClient: Socket;
};

export const ChatPageContext: Context<ChatPageContext> = createContext(null);

const ChatPage = () => {
	const socketClient: Socket = useMemo<Socket>(() => io(), []);

	return (
		<ChatPageContext.Provider value={{ socketClient }}>
			<div>
				<MessageInput />
			</div>
		</ChatPageContext.Provider>
	);
};

export default ChatPage;
