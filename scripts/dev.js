const nodemon = require("nodemon");

nodemon({
	ext: "ts",
	exec: ["npm run build:backend", "npm start"].join(" && "),
	env: {
		NODE_ENV: "development",

		DATABASE_HOSTNAME: "localhost",
		DATABASE_USERNAME: "chat_app",
		DATABASE_PASSWORD: "123456",

		BACKEND_PORT: 3000
	}
});
