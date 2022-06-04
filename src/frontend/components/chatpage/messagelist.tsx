import { useContext, useEffect, useState } from "react";
import { ChatPageContext } from "../../pages/chat";
import Events from "../../../../events.json";
import Message from "../../../models/message";

export type MessageListProps = {
	initialMessages: Message[];
};

export const MessageList = (props: MessageListProps) => {
	const { initialMessages }: MessageListProps = props;
	const { socketClient } = useContext(ChatPageContext);

	const convertToMessageBox = (messages: Message[]): JSX.Element[] => {
		const tempElements: JSX.Element[] = messages.map((message: Message, key: number) => {
			return (
				<div key={key}>
					<strong>{message.author}</strong>
					<p>{message.content}</p>
				</div>
			);
		});

		return tempElements;
	};

	const [messages, setMessages] = useState<JSX.Element[]>(convertToMessageBox(initialMessages));

	useEffect(() => {
		socketClient.on(Events.message, (...messages: Message[]) => {
			setMessages(convertToMessageBox(messages));
		});
	}, []);

	return <div>{messages}</div>;
};
