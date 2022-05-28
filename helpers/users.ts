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
			queryString: string = "insert users values (?, ?, ?)",
			queryParams = [id, displayName, password];

		DatabaseConnectionSingleton.DatabaseConnection.query(queryString, queryParams, (error) => {
			if (error) return reject(error);
			return resolve({ id, displayName, password });
		});
	});

export const fetchUsers = (): Promise<User[]> =>
	new Promise<User[]>((resolve, reject) => {
		const queryString: string = "select * from users order by display_name asc";

		DatabaseConnectionSingleton.DatabaseConnection.query(queryString, (error, results: any[]) => {
			if (error) return reject(error);

			const fetchedUser: User[] = results.map((user) => ({
				id: user["id"],
				displayName: user["display_name"],
				password: user["password"]
			}));

			return resolve(fetchedUser);
		});
	});

export const fetchUserByDisplayName = (displayName: String): Promise<User> =>
	new Promise<User>((resolve, reject) => {
		const queryString: string = "select * from users where display_name = ?";

		DatabaseConnectionSingleton.DatabaseConnection.query(queryString, displayName, (error, results: any[]) => {
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
