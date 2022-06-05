import { hash } from "bcrypt";
import App from "../backend/app";
import User from "../models/user";

export const fetchUserByDisplayName = (displayName: string): Promise<User> =>
	new Promise<User>((resolve, reject) => {
		const queryString: string = "select * from users where display_name = ?";

		App.DatabaseConnection.query(queryString, displayName, (error, results: any[]) => {
			if (error) {
				console.error(error);
				return reject("errors:internalServerError");
			}

			if (results.length !== 1) {
				return reject("errors:inputs.displayName.notExists");
			}

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
			if (error) {
				console.error(error);

				if (error.errno === 1062) {
					return reject("errors:inputs.displayName.taken");
				}

				return reject("errors:internalServerError");
			}

			return resolve({ displayName, password, isAdmin });
		});
	});
