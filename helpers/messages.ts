import { v4 } from "uuid";
import Message from "../models/message";
import moment from "moment";
import DatabaseConnectionSingleton from "../backend/singletons/databaseconnection";

export const createMessage = (author: string, content: string): Promise<Message> =>
	new Promise<Message>((resolve, reject) => {
		const id: string = v4(),
			timestamp: number = moment.utc().valueOf(),
			queryString: string = "insert into messages values (?, ?, ?, ?)",
			queryParams = [id, author, content, moment(timestamp).format("YYYY-MM-DD hh:mm:ss")];

		DatabaseConnectionSingleton.DatabaseConnection.query(queryString, queryParams, (error) => {
			if (error) return reject(error);
			return resolve({ id, author, content, timestamp });
		});
	});

export const fetchLatestMessages = (limit: number = 20): Promise<Message[]> =>
	new Promise<Message[]>(async (resolve, reject) => {
		const queryString: string = "select * from messages order by timestamp asc limit ?";

		DatabaseConnectionSingleton.DatabaseConnection.query(queryString, limit, (error, results: Message[]) => {
			if (error) return reject(error);
			const sanitizedMessagesArray: Message[] = results.map((message: Message) => ({
				id: message.id,
				author: message.author,
				content: message.content,
				timestamp:message.timestamp
			}));

			return resolve(sanitizedMessagesArray);
		});
	});
