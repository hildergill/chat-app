import { Router, Request, Response } from "express";
import Joi, { ValidationOptions } from "joi";
import { CreateUserValidators } from "../../validators/uservalidators";
import { validationErrorToArray } from "../../helpers/error";
import { Connection } from "mysql";
import { createDatabaseConnection } from "../../helpers/database";

const validationOptions: ValidationOptions = { abortEarly: false };

export type CreateUserRequestBody = {
	displayName: string;
	password: string;
	confirmPassword: string;
};

const UsersRoute: Router = Router();
export default UsersRoute;

UsersRoute.post("/signup/", async (request: Request, response: Response) => {
	const { value, error }: Joi.ValidationResult<CreateUserRequestBody> = CreateUserValidators.validate(request.body, validationOptions);
	if (error) return response.status(400).json(validationErrorToArray(error));

	const databaseConnection: Connection = createDatabaseConnection();

	try {
		// TODO Add something here later

		return response.status(200).end();
	} catch (error) {
		// TODO Add something here later

		return response.status(500).end();
	} finally {
		databaseConnection.end();
	}
});
