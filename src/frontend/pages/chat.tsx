import { createContext, useMemo, Context } from "react";
import { Socket, io } from "socket.io-client";
import { MessageInput } from "../components/chatpage/messageinput";
import { MessageList } from "../components/chatpage/messagelist";
import { GetServerSideProps } from "next";
import Message from "../../models/message";
import { fetchLatestMessages } from "../../helpers/messages";

export type ChatPageContextType = {
	socketClient: Socket;
	messages: Message[];
};

export const ChatPageContext: Context<ChatPageContextType> = createContext(null);

type Props = {
	initialMessage: Message[];
};

const ChatPage = (props: Props) => {
	const { initialMessage: messages }: Props = props;
	const socketClient: Socket = useMemo<Socket>(() => io(), []);

	return (
		<ChatPageContext.Provider value={{ socketClient, messages }}>
			<div>
				<MessageList />
				<MessageInput />
			</div>
		</ChatPageContext.Provider>
	);
};

type ServerSideProps = GetServerSideProps<Props>;

export const getServerSideProps: ServerSideProps = async () => {
	try {
		const initialMessage: Message[] = await fetchLatestMessages();

		return { props: { initialMessage } };
	} catch (error) {
		console.error(error);
		return { notFound: true };
	}
};

export default ChatPage;
