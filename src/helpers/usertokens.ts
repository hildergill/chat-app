// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import App from "../backend/app";
import UserToken from "../models/usertoken";
import { createHash } from "crypto";

export const createUserToken = (user: string): Promise<UserToken> =>
	new Promise<UserToken>(async (resolve, reject) => {
		const token: string = createHash("SHA256").update(Date.now().toString()).digest("hex"),
			queryString: string = "insert into user_tokens values (?, ?)";

		App.DatabaseConnection.query(queryString, [token, user], (error) => {
			if (error) return reject(error);
			return resolve({ token, user });
		});
	});

export const verifyUserToken = (userToken: UserToken): Promise<boolean> =>
	new Promise<boolean>((resolve, reject) => {
		const paramsArray = [userToken.token, userToken.user],
			queryString: string = "select count(*) as count from user_tokens where token = ? and user = ?";

		App.DatabaseConnection.query(queryString, paramsArray, (error, [results]) => {
			if (error) reject(error);
			return resolve(results["count"] === 1);
		});
	});
