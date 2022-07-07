// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import Joi from "joi";
import LogInBody from "../../models/users/loginbody";
import ValidatorConstants from "../validatorconstants.json";
import ValidatorOptions from "../validatoroptions.json";

const LogInBodyValidator: Joi.ObjectSchema<LogInBody> = Joi.object<LogInBody, true, LogInBody>({
	displayName: Joi.string().required().max(ValidatorConstants.userInputs.displayMaxName).messages({
		"string.max": "errrors:inputs.displayName.max"
	}),
	password: Joi.string().required().min(ValidatorConstants.userInputs.passwordMinLength).messages({
		"string.min": "errors:inputs.password.min"
	})
}).messages({
	"any.required": "errors:inputs.required"
});

export type LogInBodyValidationResult = Joi.ValidationResult<LogInBody>;

export const validateLogInBody = (logInBody: LogInBody): LogInBodyValidationResult => {
	return LogInBodyValidator.validate(logInBody, ValidatorOptions);
};
