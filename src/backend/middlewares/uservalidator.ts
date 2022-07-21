// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { Request, Response, NextFunction } from "express";
import { Connection } from "mysql";
import { getUserTokenCookieName } from "../../helpers/cookies";
import { createDatabaseConnection } from "../../helpers/database";
import { verifyUserToken } from "../../helpers/usertokens";
import UserToken from "../../models/usertoken";

const UserValidator = async (req: Request, res: Response, next: NextFunction) => {
	const databaseConnection: Connection = createDatabaseConnection();

	try {
		const userToken = req.signedCookies[getUserTokenCookieName()];
		if (!userToken) return res.status(401).json(["errors:accessDenied"]);

		const isLogInValid: boolean = await verifyUserToken(databaseConnection, userToken as UserToken);
		if (!isLogInValid) return res.status(401).json(["errors:accessDenied"]);

		return next();
	} catch (error) {
		console.error(error);
		return res.clearCookie(getUserTokenCookieName()).redirect(307, "/");
	} finally {
		databaseConnection.end();
	}
};

export default UserValidator;
