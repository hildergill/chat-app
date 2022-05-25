import { v4 } from "uuid";
import Message from "../models/message";
import moment from "moment";
import DatabaseConnectionSingleton from "../backend/singletons/databaseconnection";

export const createMessage = (author: string, content: string): Promise<Message> =>
	new Promise<Message>((resolve, reject) => {
		const id: string = v4(),
			timestamp: Date = new Date(),
			queryString: string = "insert into messages values (?, ?, ?, ?)",
			queryParams = [id, author, content, moment(timestamp).format("YYYY-MM-DD hh:mm:ss")];

		DatabaseConnectionSingleton.DatabaseConnection.query(queryString, queryParams, (error) => {
			if (error) return reject(error);
			return resolve({ id, author, content, timestamp });
		});
	});
