import { FormEvent, FormEventHandler, useMemo } from "react";
import { Socket, io } from "socket.io-client";

const ChatPage = () => {
	const socketClient: Socket = useMemo(() => io(), []);

	const onSubmitMessageForm: FormEventHandler = (event: FormEvent) => {
		event.preventDefault();

		const messageString: string = (event.target as any).message.value;

		console.log(messageString);
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
