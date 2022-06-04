import App from "../backend/app";
import UserToken from "../models/usertoken";
import { createHash } from "crypto";

export const createUserToken = (user: string): Promise<UserToken> =>
	new Promise<UserToken>((resolve, reject) => {
		const token: string = createHash("SHA256").update(Date.now().toString()).digest("hex"),
			queryString: string = "insert into user_tokens values (?, ?)";

		App.DatabaseConnection.query(queryString, [token, user], (error) => {
			if (error) return reject(error);
			return resolve({ user, token });
		});
	});
