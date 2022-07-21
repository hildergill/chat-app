// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { Connection, createConnection } from "mysql";

export const createDatabaseConnection = (): Connection => {
	const { DATABASE_HOSTNAME: host, DATABASE_USERNAME: user, DATABASE_PASSWORD: password } = process.env,
		database: string = "chat_app";

	return createConnection({ host, user, password, database });
};
