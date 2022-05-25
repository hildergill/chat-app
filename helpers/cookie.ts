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
