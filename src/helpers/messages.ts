// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { v4 } from "uuid";
import Message from "../models/message";
import moment from "moment";
import App from "../backend/app";

export const createMessage = (author: string, content: string): Promise<void> =>
	new Promise<void>((resolve, reject) => {
		const queryParams: string[] = [author, content],
			queryString: string = "insert into messages (author, content) values (?, ?)";

		App.DatabaseConnection.query(queryString, queryParams, (error) => {
			if (error) return reject(error);
			return resolve();
		});
	});

// TODO Implement a better MySQL query that has a start index and limit
export const fetchLatestMessages = (includeDisplayName: boolean = false): Promise<Message[]> =>
	new Promise<Message[]>(async (resolve, reject) => {
		const queryString: string = includeDisplayName
			? "select messages.*, users.display_name from messages join users on users.id = messages.author order by timestamp desc"
			: "select * from messages order by timestamp desc";

		App.DatabaseConnection.query(queryString, (error, results) => {
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
