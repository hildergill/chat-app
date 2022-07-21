// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { compare } from "bcrypt";
import { Router, Request, Response } from "express";
import { Connection } from "mysql";
import { getUserTokenCookieName, getCookieOptions } from "../../helpers/cookies";
import { createDatabaseConnection } from "../../helpers/database";
import { convertValidationError } from "../../helpers/errors";
import { createUser, fetchUserByDisplayName, fetchUsers } from "../../helpers/users";
import { createUserToken } from "../../helpers/usertokens";
import User from "../../models/users/user";
import UserToken from "../../models/usertoken";
import { LogInBodyValidationResult, validateLogInBody } from "../../validators/users/loginbody";
import { SignUpBodyValidationResult, validateSignUpBody } from "../../validators/users/signupbody";
import UserValidator from "../middlewares/uservalidator";
import { sendUserRegisteredEvent } from "../sockethandler";

const UsersRoute: Router = Router();
export default UsersRoute;

UsersRoute.get("/", UserValidator, async (req: Request, res: Response) => {
	const databaseConnection: Connection = createDatabaseConnection();

	try {
		const fetchedUsers: User[] = await fetchUsers(databaseConnection),
			tempUserDisplayNames: string[] = fetchedUsers.map((user: User) => user.displayName);

		return res.status(200).json(tempUserDisplayNames).end();
	} catch (error) {
		console.error(error);

		const errors: string[] = ["errors:serverError"];
		return res.status(500).json(errors);
	} finally {
		databaseConnection.end();
	}
});

UsersRoute.post("/signup/", async (req: Request, res: Response) => {
	const { value, error }: SignUpBodyValidationResult = validateSignUpBody(req.body);
	if (error) return res.status(400).json(convertValidationError(error.details)).end();

	const databaseConnection: Connection = createDatabaseConnection();

	try {
		await createUser(databaseConnection, value.displayName, value.password);

		const userToken: UserToken = await createUserToken(databaseConnection, value.displayName);

		sendUserRegisteredEvent();
		return res.status(201).cookie(getUserTokenCookieName(), userToken, getCookieOptions()).end();
	} catch (error) {
		console.error(error);

		const errors: string[] = ["errors:serverError"];
		return res.status(500).json(errors);
	} finally {
		databaseConnection.end();
	}
});

UsersRoute.post("/login/", async (req: Request, res: Response) => {
	const { value, error }: LogInBodyValidationResult = validateLogInBody(req.body);
	if (error) return res.status(400).json(convertValidationError(error.details)).end();

	const databaseConnection: Connection = createDatabaseConnection();

	try {
		const fetchedUser: User = await fetchUserByDisplayName(databaseConnection, value.displayName);

		if (!(await compare(value.password, fetchedUser.password))) {
			return res.status(400).json(["error:invalidPassword"]).end();
		}

		const userToken: UserToken = await createUserToken(databaseConnection, fetchedUser.displayName);
		return res.status(202).cookie(getUserTokenCookieName(), userToken, getCookieOptions()).end();
	} catch (error) {
		if (error === 0) {
			const errors: string[] = ["errors:inputs.displayName.notExist"];
			return res.status(401).json(errors);
		} else {
			console.error(error);

			const errors: string[] = ["errors:serverError"];
			return res.status(500).json(errors);
		}
	} finally {
		databaseConnection.end();
	}
});
