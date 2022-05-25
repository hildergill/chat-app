import Message from "../models/message";
import moment from "moment";

export const MessageBox = (message: Message) => {
	return (
		<div>
			<strong>{message.author}</strong>
			<p>{message.content}</p>
			<code>{moment(message.timestamp).toString()}</code>
		</div>
	);
};
