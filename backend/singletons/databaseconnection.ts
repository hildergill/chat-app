import { Connection } from "mysql";

class DatabaseConnection {
	private static instance: DatabaseConnection;

	private databaseConnection: Connection;

	public get DatabaseConnection(): Connection {
		return this.databaseConnection;
	}

	public static get Instance(): DatabaseConnection {
		return this.instance || (this.instance = new DatabaseConnection());
	}
}

export default DatabaseConnection.Instance;
