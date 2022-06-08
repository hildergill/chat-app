// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

const { resolve } = require("path");

module.exports = {
	i18n: {
		defaultLocale: "en",
		locales: ["en"]
	},
	localePath: resolve("locales")
};
