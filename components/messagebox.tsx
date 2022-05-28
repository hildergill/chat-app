import Message from "../models/message";
import moment from "moment";

export const MessageBox = (props: Message) => {
	const { displayName, timestamp, content } = props;

	return (
		<div>
			<span>
				<strong>{displayName}</strong>
				<code>{moment(timestamp).format("DD-MM-YYYY hh:mm:ss")}</code>
			</span>

			<p>{content}</p>
		</div>
	);
};
