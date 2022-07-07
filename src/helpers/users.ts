// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { hash } from "bcrypt";
import { v4 } from "uuid";
import User from "../models/user";
import App from "../backend/app";

export const createUser = (displayName: string, unhashedPassword: string): Promise<void> =>
	new Promise<void>(async (resolve, reject) => {
		const hashedPassword: string = await hash(unhashedPassword, 12),
			queryParams: string[] = [displayName, hashedPassword],
			queryString: string = "insert into users values (?, ?)";

		App.DatabaseConnection.query(queryString, queryParams, (error, result) => {
			if (error) return reject(error);

			console.debug(result);
			return resolve();
		});
	});

export const fetchUsers = (): Promise<User[]> =>
	new Promise<User[]>((resolve, reject) => {
		const queryString: string = "select * from users order by display_name asc";

		App.DatabaseConnection.query(queryString, (error: any, results: any[]) => {
			if (error) return reject(error);

			return resolve(
				results.map((user) => {
					const { display_name: displayName, password } = user;
					return { displayName, password };
				})
			);
		});
	});

export const fetchUserByDisplayName = (displayName: String): Promise<User> =>
	new Promise<User>((resolve, reject) => {
		const queryString: string = "select * from users where display_name = ?";

		App.DatabaseConnection.query(queryString, displayName, (error, results: any[]) => {
			if (error) return reject(error);
			if (results.length !== 1) return reject(0);

			const [result] = results;

			try {
				return resolve({
					id: result["id"],
					displayName: result["display_name"],
					password: result["password"]
				});
			} catch (error) {
				return reject(error);
			}
		});
	});
