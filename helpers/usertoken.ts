import { Connection } from "mysql";
import UserToken from "../models/usertoken";
import { createHash } from "crypto";

export const createUserToken = (databaseConnection: Connection, user: string): Promise<UserToken> =>
	new Promise<UserToken>(async (resolve, reject) => {
		const token: string = createHash("SHA256").update(Date.now().toString()).digest("hex"),
			queryString: string = "insert into user_tokens values (?, ?)";

		databaseConnection.query(queryString, [token, user], (error) => {
			if (error) return reject(error);
			return resolve({ token, user });
		});
	});
