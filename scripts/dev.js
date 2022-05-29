// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

const nodemon = require("nodemon");

nodemon({
	ext: "ts",
	exec: ["npm run build:backend", "npm start"].join(" && "),
	env: {
		NODE_ENV: "development",

		BACKEND_SECRET: "chat_app",
		BACKEND_PORT: 3000,

		DATABASE_HOSTNAME: "localhost",
		DATABASE_USERNAME: "chat_app",
		DATABASE_PASSWORD: "123456"
	}
});
