import { Router, Request, Response } from "express";
import Error from "../../models/error";
import { fetchLatestMessages } from "../../helpers/messages";
import Message from "../../models/message";

const MessagesRoute: Router = Router();
export default MessagesRoute;

type FetchMessagesParams = {
	limit: number;
};

MessagesRoute.get("/", async (request: Request<FetchMessagesParams>, response: Response) => {
	const { limit } = request.params;

	try {
		const messages: Message[] = await fetchLatestMessages(true, limit);
		return response.status(200).send(messages);
	} catch (error) {
		console.error(error);

		const errors: Error[] = [{ errorKey: "errors:serverError" }];
		return response.status(500).json(errors);
	}
});
