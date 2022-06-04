import { CookieOptions } from "express";

export const getCookieName = (): string => "USER_TOKEN";

export const getCookieOptions = (): CookieOptions => ({
	maxAge: 1209600000,
	signed: true,
	sameSite: "strict"
});
