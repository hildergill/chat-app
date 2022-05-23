import { CookieOptions } from "express";

export const getUserTokenCookieName = (): string => "USER_TOKEN";

export const getCookieOptions = (): CookieOptions => ({
	secure: true,
	signed: true,
	maxAge: 1209600000,
	sameSite: true
});
