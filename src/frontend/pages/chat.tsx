import { FormEvent, FormEventHandler, useMemo } from "react";
import { Socket, io } from "socket.io-client";
import Events from "../../../events.json";

const ChatPage = () => {
	const socketClient: Socket = useMemo<Socket>(() => io(), []);

	const onSubmitMessageForm: FormEventHandler = (event: FormEvent) => {
		event.preventDefault();

		const messageInput: HTMLInputElement = (event.target as any).message,
			message: string = messageInput.value;

		messageInput.value = null;
		socketClient.emit(Events.message, "User", message);
	};

	return (
		<div>
			{/* TODO Add something here later */}
			{/* TODO Add something here later */}
			{/* TODO Add something here later */}

			<form onSubmit={onSubmitMessageForm}>
				<input type="text" id="message" name="message" required />
			</form>
		</div>
	);
};

export default ChatPage;
