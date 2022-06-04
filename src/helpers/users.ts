import { hash } from "bcrypt";
import App from "../backend/app";
import User from "../models/user";

export const fetchUserByDisplayName = (displayName: string): Promise<User> =>
	new Promise<User>((resolve, reject) => {
		const queryString: string = "select * from users where display_name = ?";

		App.DatabaseConnection.query(queryString, displayName, (error, results: any[]) => {
			if (error) return reject(error);
			if (results.length !== 1) return reject(0);

			const [result] = results;
			return resolve({
				displayName: result["display_name"],
				password: result["password"],
				isAdmin: result["is_admin"]
			});
		});
	});

export const createUser = (displayName: string, unhashedPassword: string, isAdmin: boolean = true): Promise<User> =>
	new Promise<User>(async (resolve, reject) => {
		const password: string = await hash(unhashedPassword, 12),
			queryString: string = "insert into users () values (?, ?, ?)",
			queryParams = [displayName, password, isAdmin ? 1 : 0];

		App.DatabaseConnection.query(queryString, queryParams, (error) => {
			if (error) return reject(error);
			return resolve({ displayName, password, isAdmin });
		});
	});
