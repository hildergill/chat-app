// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import Message from "../models/messages/message";
import { Connection } from "mysql";

export const createMessage = (database: Connection, author: string, content: string): Promise<void> =>
	new Promise<void>((resolve, reject) => {
		const queryParams: string[] = [author, content],
			queryString: string = "insert into messages (author, content) values (?, ?)";

		database.query(queryString, queryParams, (error) => {
			if (error) return reject(error);
			return resolve();
		});
	});

export const fetchLatestMessages = (database: Connection): Promise<Message[]> =>
	new Promise<Message[]>(async (resolve, reject) => {
		const queryString: string = [
			"select bin_to_uuid(id) as id, author, content,",
			`date_format(timestamp, "%Y-%m-%dT%TZ") as timestamp from messages`,
			"order by timestamp desc"
		].join(" ");

		database.query(queryString, (error: any, results: any[]) => {
			if (error) return reject(error);
			return resolve(results.map((result) => ({ ...result })));
		});
	});
