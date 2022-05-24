import { hash } from "bcrypt";
import { v4 } from "uuid";
import User from "../models/user";
import DatabaseConnectionSingleton from "../backend/singletons/databaseconnection";

export type CreateUserParams = {
	displayName: string;
	password: string;
};

export const createUser = (params: CreateUserParams): Promise<User> =>
	new Promise<User>(async (resolve, reject) => {
		const id: string = v4(),
			password: string = await hash(params.password, 12),
			{ displayName } = params,
			queryString: string = "insert users values (?, ?, ?)";

		DatabaseConnectionSingleton.DatabaseConnection.query(queryString, [id, displayName, password], (error) => {
			if (error) return reject(error);
			return resolve({ id, displayName, password });
		});
	});

export const fetchUserByDisplayName = (displayName: String): Promise<User> =>
	new Promise<User>((resolve, reject) => {
		const queryString: string = "select * from users where display_name = ?";

		DatabaseConnectionSingleton.DatabaseConnection.query(queryString, displayName, (error, results: any[]) => {
			if (error) return reject(error);

			if (results.length !== 1) return reject(0);

			const fetchedUser: any = results[0];

			return resolve({
				id: fetchedUser["id"],
				displayName: fetchedUser["display_name"],
				password: fetchedUser["password"]
			});
		});
	});
