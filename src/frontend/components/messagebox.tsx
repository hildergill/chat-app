// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import Message from "../../models/messages/message";
import MessageBoxStyle from "../stylesheets/components/messagebox.module.scss";

export const MessageBox = (props: Message) => {
	const { displayName, timestamp, content } = props;

	return (
		<li className={MessageBoxStyle.messageBox}>
			<span className={MessageBoxStyle.infoSection}>
				<strong>{displayName}</strong>
				<code>{new Date(timestamp).toLocaleString()}</code>
			</span>

			<p>{content}</p>
		</li>
	);
};
