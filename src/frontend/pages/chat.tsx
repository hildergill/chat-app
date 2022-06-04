import { createContext, useMemo, Context } from "react";
import { Socket, io } from "socket.io-client";
import { MessageInput } from "../components/chatpage/messageinput";
import { MessageList, MessageListProps } from "../components/chatpage/messagelist";
import { GetServerSideProps } from "next";
import Message from "../../models/message";
import { fetchLatestMessages } from "../../helpers/messages";

export type ChatPageContextType = {
	socketClient: Socket;
};

export const ChatPageContext: Context<ChatPageContextType> = createContext(null);

type Props = {
	initialMessages: Message[];
};

const ChatPage = (props: Props) => {
	const { initialMessages }: Props = props;
	const socketClient: Socket = useMemo<Socket>(() => io(), []);

	const messageListProps: MessageListProps = { initialMessages };

	return (
		<ChatPageContext.Provider value={{ socketClient }}>
			<div>
				<MessageList {...messageListProps} />
				<MessageInput />
			</div>
		</ChatPageContext.Provider>
	);
};

type ServerSideProps = GetServerSideProps<Props>;

export const getServerSideProps: ServerSideProps = async () => {
	try {
		const initialMessages: Message[] = await fetchLatestMessages();

		return { props: { initialMessages } };
	} catch (error) {
		console.error(error);
		return { notFound: true };
	}
};

export default ChatPage;
