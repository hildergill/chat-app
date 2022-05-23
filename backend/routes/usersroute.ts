import { Router, Request, Response } from "express";
import Joi, { ValidationOptions } from "joi";
import { LogInValidator, SignUpValidator } from "../../validators/uservalidators";
import { validationErrorToArray } from "../../helpers/error";
import { Connection, MysqlError } from "mysql";
import { createDatabaseConnection } from "../../helpers/database";
import User from "../../models/user";
import { createUser, fetchUserByDisplayName } from "../../helpers/user";
import UserToken from "../../models/usertoken";
import { createUserToken } from "../../helpers/usertoken";
import { getCookieOptions, getUserTokenCookieName } from "../../helpers/cookie";
import { compare } from "bcrypt";
import Error from "../../models/error";

const validationOptions: ValidationOptions = { abortEarly: false };

export type SignUpBody = {
	displayName: string;
	password: string;
	confirmPassword: string;
};

export type LogInBody = {
	displayName: string;
	password: string;
};

const UsersRoute: Router = Router();
export default UsersRoute;

UsersRoute.post("/signup/", async (request: Request, response: Response) => {
	const { value, error }: Joi.ValidationResult<SignUpBody> = SignUpValidator.validate(request.body, validationOptions);
	if (error) return response.status(400).json(validationErrorToArray(error));

	const databaseConnection: Connection = createDatabaseConnection();

	try {
		const createdUser: User = await createUser(databaseConnection, value),
			createdUserToken: UserToken = await createUserToken(databaseConnection, createdUser.id);

		return response.status(201).cookie(getUserTokenCookieName(), createdUserToken, getCookieOptions()).end();
	} catch (error) {
		console.log(error);

		if ((error as MysqlError).errno === 1062) {
			const error: Error = { errorKey: "errors:inputs.displayName.taken" };
			return response.status(401).json(error);
		} else {
			const error: Error = { errorKey: "errors:serverError" };
			return response.status(500).json(error);
		}
	} finally {
		databaseConnection.end();
	}
});

UsersRoute.post("/login/", async (request: Request, response: Response) => {
	const { value, error }: Joi.ValidationResult<LogInBody> = LogInValidator.validate(request.body, validationOptions);
	if (error) return response.status(400).json(validationErrorToArray(error));

	const databaseConnection: Connection = createDatabaseConnection();

	try {
		const fetchedUser: User = await fetchUserByDisplayName(databaseConnection, value.displayName);

		if (!(await compare(value.password, fetchedUser.password))) return response.status(401).end();

		const createdUserToken: UserToken = await createUserToken(databaseConnection, fetchedUser.id);
		return response.status(200).cookie(getUserTokenCookieName(), createdUserToken, getCookieOptions()).end();
	} catch (error) {
		console.log(error);

		if (error === 0) {
			const error: Error = { errorKey: "errors:inputs.displayName.notExist" };
			return response.status(401).json(error);
		} else {
			const error: Error = { errorKey: "errors:serverError" };
			return response.status(500).json(error);
		}
	} finally {
		databaseConnection.end();
	}
});
