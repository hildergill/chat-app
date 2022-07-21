// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { Router, Request, Response } from "express";
import { Connection } from "mysql";
import { createDatabaseConnection } from "../../helpers/database";
import { convertValidationError } from "../../helpers/errors";
import { fetchLatestMessages } from "../../helpers/messages";
import Message from "../../models/messages/message";
import { validateFetchMessagesQuery, FetchMessagesQueryValidationResult } from "../../validators/queries/fetchmessages";

const MessagesRoute: Router = Router();
export default MessagesRoute;

MessagesRoute.get("/", async (req: Request, res: Response) => {
	const { value, error }: FetchMessagesQueryValidationResult = validateFetchMessagesQuery(req.body);
	if (error) return res.status(400).json(convertValidationError(error.details)).end();

	const databaseConnection: Connection = createDatabaseConnection();

	try {
		const messages: Message[] = await fetchLatestMessages(databaseConnection);
		return res.status(200).send(messages);
	} catch (error) {
		console.error(error);

		const errors: string[] = ["errors:serverError"];
		return res.status(500).json(errors);
	}
});
