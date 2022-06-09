// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import Message from "../../models/message";
import moment from "moment";
import MessageBoxStyle from "../stylesheets/components/messagebox.module.scss";

export const MessageBox = (props: Message) => {
	const { displayName, timestamp, content } = props;

	return (
		<li className={MessageBoxStyle.messageBox}>
			<span className={MessageBoxStyle.infoSection}>
				<strong>{displayName}</strong>
				<code>{moment(timestamp).format("DD-MM-YYYY hh:mm:ss")}</code>
			</span>

			<p>{content}</p>
		</li>
	);
};