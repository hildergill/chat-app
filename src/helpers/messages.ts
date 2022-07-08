// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import Message from "../models/messages/message";
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

export const fetchLatestMessages = (offset: number = 0, limit: number = 20): Promise<Message[]> =>
	new Promise<Message[]>(async (resolve, reject) => {
		const queryParams: number[] = [limit, offset],
			queryString: string = [
				"select bin_to_uuid(id) as id, author, content,",
				`date_format(timestamp, "%Y-%m-%dT%TZ") as timestamp`,
				"from messages limit ? offset ?"
			].join(" ");

		App.DatabaseConnection.query(queryString, queryParams, (error: any, results: any[]) => {
			if (error) return reject(error);
			return resolve(results.map((result) => ({ ...result })));
		});
	});
