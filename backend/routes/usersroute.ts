import { Router, Request, Response } from "express";
import Joi, { ValidationOptions } from "joi";
import { LogInValidator, SignUpValidator } from "../../validators/uservalidators";
import { convertValidationError } from "../../helpers/errors";
import { MysqlError } from "mysql";
import User from "../../models/user";
import { createUser, fetchUserByDisplayName } from "../../helpers/users";
import UserToken from "../../models/usertoken";
import { createUserToken } from "../../helpers/usertokens";
import { getCookieOptions, getUserTokenCookieName } from "../../helpers/cookies";
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
	if (error) return response.status(400).json(convertValidationError(error));

	try {
		const createdUser: User = await createUser(value),
			createdUserToken: UserToken = await createUserToken(createdUser.id);

		console.debug(createdUser, createdUserToken);
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

		console.debug(fetchedUser, createdUserToken);
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
