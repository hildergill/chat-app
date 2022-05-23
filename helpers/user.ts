import { Connection } from "mysql";
import { v4 } from "uuid";
import User from "../models/user";
import UserToken from "../models/usertoken";

export type CreateUserParams = {
	displayName: string;
	password: string;
};

export const createUser = (databaseConnection: Connection, params: CreateUserParams): Promise<User> =>
	new Promise<User>(async (resolve, reject) => {
		const id: string = v4(),
			queryString: string = "insert users values (?, ?, ?)";

		databaseConnection.query(queryString, [id, params.displayName, params.password], (error) => {
			if (error) return reject(error);
			return resolve({ id, ...params });
		});
	});
