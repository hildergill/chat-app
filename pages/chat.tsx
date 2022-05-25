import { FormEvent, FormEventHandler, useMemo } from "react";
import { Socket, io } from "socket.io-client";
import events from "../events.json";

const ChatPage = () => {
	const socketClient: Socket = useMemo(() => io(), []);

	const onSubmitMessageForm: FormEventHandler = (event: FormEvent) => {
		event.preventDefault();

		const messageInput = (event.target as any).message,
			messageString: string = messageInput.value;

		messageInput.value = null;

		socketClient.emit(events.message.user, messageString);
	};

	return (
		<div>
			<div>
				{/* TODO Add something here later */}
				{/* TODO Add something here later */}
				{/* TODO Add something here later */}
			</div>

			<form onSubmit={onSubmitMessageForm}>
				<label htmlFor="message">Message:</label>
				<input type="text" name="message" id="message" required />
				<input type="submit" value="Send Message" />
			</form>
		</div>
	);
};

export default ChatPage;
