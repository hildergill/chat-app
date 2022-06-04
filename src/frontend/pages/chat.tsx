import { createContext, useMemo, Context } from "react";
import { Socket, io } from "socket.io-client";
import { MessageInput } from "../components/chatpage/messageinput";
import { MessageList } from "../components/chatpage/messagelist";

export type ChatPageContextType = {
	socketClient: Socket;
};

export const ChatPageContext: Context<ChatPageContextType> = createContext(null);

const ChatPage = () => {
	const socketClient: Socket = useMemo<Socket>(() => io(), []);

	return (
		<ChatPageContext.Provider value={{ socketClient }}>
			<div>
				<MessageList />
				<MessageInput />
			</div>
		</ChatPageContext.Provider>
	);
};

export default ChatPage;
