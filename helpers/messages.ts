import { v4 } from "uuid";
import Message from "../models/message";
import moment from "moment";
import DatabaseConnectionSingleton from "../backend/singletons/databaseconnection";

export const createMessage = (author: string, content: string): Promise<Message> =>
	new Promise<Message>((resolve, reject) => {
		const id: string = v4(),
			timestamp: number = moment.utc().valueOf(),
			queryString: string = "insert into messages values (?, ?, ?, ?)",
			queryParams = [id, author, content, timestamp];

		DatabaseConnectionSingleton.DatabaseConnection.query(queryString, queryParams, (error) => {
			if (error) return reject(error);
			return resolve({ id, author, displayName: null, content, timestamp });
		});
	});

export const fetchLatestMessages = (includeDisplayName: boolean = false, limit: number = 20): Promise<Message[]> =>
	new Promise<Message[]>(async (resolve, reject) => {
		const queryString: string = includeDisplayName
			? "select messages.*, users.display_name from messages join users on users.id = messages.author order by timestamp asc limit ?"
			: "select * from messages order by timestamp asc limit ?";

		DatabaseConnectionSingleton.DatabaseConnection.query(queryString, limit, (error, results) => {
			if (error) return reject(error);
			const sanitizedMessagesArray: Message[] = results.map((message: any) => ({
				id: message["id"],
				author: message["author"],
				displayName: message["display_name"] ?? null,
				content: message["content"],
				timestamp: message["timestamp"]
			}));

			return resolve(sanitizedMessagesArray);
		});
	});
