import { hash } from "bcrypt";
import { Connection } from "mysql";
import { v4 } from "uuid";
import User from "../models/user";

export type CreateUserParams = {
	displayName: string;
	password: string;
};

export const createUser = (databaseConnection: Connection, params: CreateUserParams): Promise<User> =>
	new Promise<User>(async (resolve, reject) => {
		const id: string = v4(),
			password: string = await hash(params.password, 12),
			{ displayName } = params,
			queryString: string = "insert users values (?, ?, ?)";

		databaseConnection.query(queryString, [id, displayName, password], (error) => {
			if (error) return reject(error);
			return resolve({ id, displayName, password });
		});
	});

export const fetchUserByDisplayName = (databaseConnection: Connection, displayName: String): Promise<User> =>
	new Promise<User>((resolve, reject) => {
		const queryString: string = "select * from users where display_name = ?";

		databaseConnection.query(queryString, displayName, (error, results: any[]) => {
			if (error) return reject(error);

			// TODO Add something here later
			if (results.length !== 1) return reject(0);

			const fetchedUser: any = results[0];

			return resolve({
				id: fetchedUser["id"],
				displayName: fetchedUser["display_name"],
				password: fetchedUser["password"]
			});
		});
	});