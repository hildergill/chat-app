import { Connection, createConnection } from "mysql";

class DatabaseConnection {
	private static instance: DatabaseConnection;

	private databaseConnection: Connection;

	constructor() {
		const { DATABASE_HOSTNAME: host, DATABASE_USERNAME: user, DATABASE_PASSWORD: password } = process.env,
			database: string = "chat_app";

		this.databaseConnection = createConnection({ host, user, password, database });
	}

	public get DatabaseConnection(): Connection {
		return this.databaseConnection;
	}

	public static get Instance(): DatabaseConnection {
		return this.instance || (this.instance = new DatabaseConnection());
	}
}

export default DatabaseConnection.Instance;
