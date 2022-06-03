import { Connection, createConnection, ConnectionConfig } from "mysql";

class App {
	private static instance: App;

	private databaseConnection: Connection;

	constructor() {
		const { DATABASE_HOSTNAME, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env,
			connectionConfig: ConnectionConfig = {
				host: DATABASE_HOSTNAME,
				user: DATABASE_USERNAME,
				password: DATABASE_PASSWORD,
				database: "chat_app"
			};

		this.databaseConnection = createConnection(connectionConfig);
	}

	public static get Instance(): App {
		return this.instance || (this.instance = new App());
	}
}

export default App.Instance;
