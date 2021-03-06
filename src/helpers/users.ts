// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { hash } from "bcrypt";
import User from "../models/users/user";
import { Connection } from "mysql";

export const createUser = (database: Connection, displayName: string, unhashedPassword: string): Promise<void> =>
	new Promise<void>(async (resolve, reject) => {
		const hashedPassword: string = await hash(unhashedPassword, 12),
			queryParams: string[] = [displayName, hashedPassword],
			queryString: string = "insert into users values (?, ?)";

		database.query(queryString, queryParams, (error) => {
			if (error) return reject(error);
			return resolve();
		});
	});

export const fetchUsers = (database: Connection): Promise<User[]> =>
	new Promise<User[]>((resolve, reject) => {
		const queryString: string = "select * from users order by display_name asc";

		database.query(queryString, (error: any, results: any[]) => {
			if (error) return reject(error);

			return resolve(
				results.map((user) => {
					const { display_name: displayName, password } = user;
					return { displayName, password };
				})
			);
		});
	});

export const fetchUserByDisplayName = (database: Connection, displayName: String): Promise<User> =>
	new Promise<User>((resolve, reject) => {
		const queryString: string = "select * from users where display_name = ?";

		database.query(queryString, displayName, (error, results: any[]) => {
			if (error) return reject(error);
			if (results.length !== 1) return reject(0);

			const [result] = results;

			try {
				return resolve({
					displayName: result["display_name"],
					password: result["password"]
				});
			} catch (error) {
				return reject(error);
			}
		});
	});
