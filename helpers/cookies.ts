// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { CookieOptions } from "express";

export const getUserTokenCookieName = (): string => "USER_TOKEN";

export const getCookieOptions = (): CookieOptions => {
	const { NODE_ENV } = process.env;

	return {
		secure: NODE_ENV === "production",
		signed: true,
		maxAge: 1209600000,
		sameSite: true
	};
};
