import App from "../backend/app";
import Message from "../models/message";

export const createMessage = (author: string, content: string): Promise<void> =>
	new Promise<void>((resolve, reject) => {
		const queryString: string = "insert into messages (author, content) values (?, ?)",
			queryParams = [author, content];

		App.DatabaseConnection.query(queryString, queryParams, (error) => {
			return error === null ? resolve() : reject(error);
		});
	});

export const fetchLatestMessages = (start: number = 0, limit: number = 20): Promise<Message[]> =>
	new Promise<Message[]>((resolve, reject) => {
		const queryString: string = "select id, author, content, timestamp from messages order by timestamp_data desc limit ?, ?",
			queryParams = [start, limit];

		App.DatabaseConnection.query(queryString, queryParams, (error, results: any[]) => {
			const messages: Message[] = results.map((result: any) => {
				const tempMessageObject: Message = {
					id: result["id"],
					author: result["author"],
					content: result["content"],
					timestamp: result["timestamp"]
				};

				return tempMessageObject;
			});

			return resolve(messages);
		});
	});
