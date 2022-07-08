// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { Router, Request, Response, NextFunction } from "express";
import { getUserTokenCookieName, getCookieOptions } from "../../helpers/cookies";
import { convertValidationError } from "../../helpers/errors";
import { createUser } from "../../helpers/users";
import { createUserToken } from "../../helpers/usertokens";
import SignUpBody from "../../models/users/signupbody";
import UserToken from "../../models/usertoken";
import { SignUpBodyValidationResult, validateSignUpBody } from "../../validators/users/signupbody";

/*
import Joi, { ValidationOptions } from "joi";
import { LogInValidator, SignUpValidator } from "../../validators/uservalidators";
import { convertValidationError } from "../../helpers/errors";
import { MysqlError } from "mysql";
import User from "../../models/users/user";
import { createUser, fetchUserByDisplayName } from "../../helpers/users";
import UserToken from "../../models/usertoken";
import { createUserToken } from "../../helpers/usertokens";
import { getCookieOptions, getUserTokenCookieName } from "../../helpers/cookies";
import { compare } from "bcrypt";
import Error from "../../models/error";
import LogInBody from "../../models/users/loginbody";
import SignUpBody from "../../models/users/signupbody";
*/

const UsersRoute: Router = Router();
export default UsersRoute;

/*
UsersRoute.post("/signup/", async (request: Request, response: Response) => {
	const { value, error }: Joi.ValidationResult<SignUpBody> = SignUpValidator.validate(request.body, validationOptions);
	if (error) return response.status(400).json(convertValidationError(error));

	try {
		const createdUser: User = await createUser(value),
			createdUserToken: UserToken = await createUserToken(createdUser.id);
		return response.status(201).cookie(getUserTokenCookieName(), createdUserToken, getCookieOptions()).end();
	} catch (error) {
		if ((error as MysqlError).errno === 1062) {
			const errors: Error[] = [{ errorKey: "errors:inputs.displayName.taken" }];
			return response.status(401).json(errors);
		} else {
			console.error(error);

			const errors: Error[] = [{ errorKey: "errors:serverError" }];
			return response.status(500).json(errors);
		}
	}
});

UsersRoute.post("/login/", async (request: Request, response: Response) => {
	const { value, error }: Joi.ValidationResult<LogInBody> = LogInValidator.validate(request.body, validationOptions);
	if (error) return response.status(400).json(convertValidationError(error));

	try {
		const fetchedUser: User = await fetchUserByDisplayName(value.displayName);

		if (!(await compare(value.password, fetchedUser.password))) return response.status(401).end();

		const createdUserToken: UserToken = await createUserToken(fetchedUser.id);

		return response.status(200).cookie(getUserTokenCookieName(), createdUserToken, getCookieOptions()).end();
	} catch (error) {
		if (error === 0) {
			const errors: Error[] = [{ errorKey: "errors:inputs.displayName.notExist" }];
			return response.status(401).json(errors);
		} else {
			console.error(error);

			const errors: Error[] = [{ errorKey: "errors:serverError" }];
			return response.status(500).json(errors);
		}
	}
});
*/

UsersRoute.post("/signup/", async (req: Request, res: Response) => {
	const { value, error }: SignUpBodyValidationResult = validateSignUpBody(req.body);
	if (error) return res.status(400).json(convertValidationError(error.details)).end();

	try {
		await createUser(value.displayName, value.password);

		const userToken: UserToken = await createUserToken(value.displayName);
		return res.status(201).cookie(getUserTokenCookieName(), userToken, getCookieOptions()).end();
	} catch (error) {
		console.error(error);
		return res.status(500).end();
	}
});
