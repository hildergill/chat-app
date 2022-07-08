// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { compare } from "bcrypt";
import { Router, Request, Response } from "express";
import { getUserTokenCookieName, getCookieOptions } from "../../helpers/cookies";
import { convertValidationError } from "../../helpers/errors";
import { createUser, fetchUserByDisplayName } from "../../helpers/users";
import { createUserToken } from "../../helpers/usertokens";
import User from "../../models/users/user";
import UserToken from "../../models/usertoken";
import { LogInBodyValidationResult, validateLogInBody } from "../../validators/users/loginbody";
import { SignUpBodyValidationResult, validateSignUpBody } from "../../validators/users/signupbody";

const UsersRoute: Router = Router();
export default UsersRoute;

UsersRoute.post("/signup/", async (req: Request, res: Response) => {
	const { value, error }: SignUpBodyValidationResult = validateSignUpBody(req.body);
	if (error) return res.status(400).json(convertValidationError(error.details)).end();

	try {
		await createUser(value.displayName, value.password);

		const userToken: UserToken = await createUserToken(value.displayName);
		return res.status(201).cookie(getUserTokenCookieName(), userToken, getCookieOptions()).end();
	} catch (error) {
		console.error(error);

		const errors: string[] = ["errors:serverError"];
		return res.status(500).json(errors);
	}
});

UsersRoute.post("/login/", async (req: Request, res: Response) => {
	const { value, error }: LogInBodyValidationResult = validateLogInBody(req.body);
	if (error) return res.status(400).json(convertValidationError(error.details)).end();

	try {
		const fetchedUser: User = await fetchUserByDisplayName(value.displayName);

		if (!(await compare(value.password, fetchedUser.password))) {
			return res.status(400).json(["error:invalidPassword"]).end();
		}

		const userToken: UserToken = await createUserToken(fetchedUser.displayName);
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
	}
});
