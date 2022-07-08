// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { Request, Response, NextFunction } from "express";
import { getUserTokenCookieName } from "../../helpers/cookies";
import { verifyUserToken } from "../../helpers/usertokens";
import UserToken from "../../models/usertoken";

const UserValidator = async (req: Request, res: Response, next: NextFunction) => {
	const userToken = req.signedCookies[getUserTokenCookieName()];
	if (!userToken) return res.status(401).json(["errors:accessDenied"]);

	const isLogInValid: boolean = await verifyUserToken(userToken as UserToken);
	if (!isLogInValid) return res.status(401).json(["errors:accessDenied"]);

	return next();
};

export default UserValidator;
