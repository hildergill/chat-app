import { FormEventHandler, FormEvent, useContext } from "react";
import { ChatPageContext } from "../../pages/chat";
import Events from "../../../../events.json";

export const MessageInput = () => {
	const chatPageContext = useContext(ChatPageContext);

	const onSubmitMessageForm: FormEventHandler = (event: FormEvent) => {
		event.preventDefault();

		const messageInput: HTMLInputElement = (event.target as any).message,
			message: string = messageInput.value;

		messageInput.value = null;
		chatPageContext.socketClient.emit(Events.message, "User", message);
	};

	return (
		<form onSubmit={onSubmitMessageForm}>
			<input type="text" name="message" id="message" required />
		</form>
	);
};
