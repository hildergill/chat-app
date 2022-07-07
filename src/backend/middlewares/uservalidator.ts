import { JSONCookie } from "cookie-parser";
import { Request, Response, NextFunction } from "express";
import { getUserTokenCookieName } from "../../helpers/cookies";
import { verifyUserToken } from "../../helpers/usertokens";
import UserToken from "../../models/usertoken";

const UserValidator = async (req: Request, res: Response, next: NextFunction) => {
	const userTokenString = req.signedCookies[getUserTokenCookieName()];
	if (!userTokenString) return res.status(401).json(["errors:accessDenied"]);

	const userToken = JSONCookie(userTokenString);
	if (!userToken) return res.status(401).json(["errors:accessDenied"]);

	const isLogInValid: boolean = await verifyUserToken(userToken as UserToken);
	if (!isLogInValid) return res.status(401).json(["errors:accessDenied"]);

	return next();
};

export default UserValidator;
