import { Connection, createConnection } from "mysql";

export const createDatabaseConnection = (): Connection => {
	const { DATABASE_HOSTNAME: host, DATABASE_USERNAME: user, DATABASE_PASSWORD: password } = process.env,
		database: string = "chat_app";

	return createConnection({ host, user, password, database });
};
