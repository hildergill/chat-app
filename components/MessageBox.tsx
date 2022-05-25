import Message from "../models/message";
import moment from "moment";

export const MessageBox = (message: Message) => {
	return (
		<div>
			{message.displayName && <strong>{message.displayName}</strong>}
			<code>{message.author}</code>
			<p>{message.content}</p>
			<code>{moment(message.timestamp).format("DD-MM-YY hh:mm:ssA")}</code>
		</div>
	);
};
