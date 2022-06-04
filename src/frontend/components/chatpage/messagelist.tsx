import { useContext, useEffect, useState } from "react";
import { ChatPageContext } from "../../pages/chat";
import Events from "../../../../events.json";

export const MessageList = () => {
	const { socketClient } = useContext(ChatPageContext);
	const [messages, setMessages] = useState<JSX.Element[]>([]);

	useEffect(() => {
		socketClient.on(Events.message, (displayName: string, content: string) => {
			setMessages((previousMessages) => {
				const tempComponent: JSX.Element = (
					<div key={previousMessages.length}>
						<strong>{displayName}</strong>
						<p>{content}</p>
					</div>
				);

				return [...previousMessages, tempComponent];
			});
		});
	}, []);

	return <div>{messages}</div>;
};
