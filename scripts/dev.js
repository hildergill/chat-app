const nodemon = require("nodemon");

nodemon({
	ext: "ts",
	exec: ["npm run build:backend", "npm start"].join(" && "),
	env: {
		NODE_ENV: "development",

		BACKEND_SECRET: "chat_app",
		BACKEND_PORT: 3000
	}
});
