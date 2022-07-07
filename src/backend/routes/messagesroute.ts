// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { Router, Request, Response } from "express";
import { fetchLatestMessages } from "../../helpers/messages";
import Message from "../../models/messages/message";

const MessagesRoute: Router = Router();
export default MessagesRoute;

MessagesRoute.get("/", async (request: Request, response: Response) => {
	try {
		const messages: Message[] = await fetchLatestMessages();
		return response.status(200).send(messages);
	} catch (error) {
		console.error(error);

		const errors: string[] = ["errors:serverError"];
		return response.status(500).json(errors);
	}
});
