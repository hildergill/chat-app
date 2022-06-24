// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

module.exports = {
	ext: "ts",
	exec: ["npm run build:backend", "npm start"].join(" && "),
	watch: ["src/**/*.ts"]
};
