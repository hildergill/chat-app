// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import Joi from "joi";
import SignUpBody from "../../models/users/signupbody";
import ValidatorConstants from "../validatorconstants.json";
import ValidatorOptions from "../validatoroptions.json";

const SignUpBodyValidator: Joi.ObjectSchema<SignUpBody> = Joi.object<SignUpBody, true, SignUpBody>({
	displayName: Joi.string().required().max(ValidatorConstants.userInputs.displayMaxName).messages({
		"string.max": "errrors:inputs.displayName.max"
	}),
	password: Joi.string().required().min(ValidatorConstants.userInputs.passwordMinLength).messages({
		"string.min": "errors:inputs.password.min"
	}),
	confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
		"any.only": "errors:inputs.confirmPassword.mismatch"
	})
}).messages({
	"any.required": "errors:inputs.required"
});

export type SignUpBodyValidationResult = Joi.ValidationResult<SignUpBody>;

export const validateSignUpBody = (signUpBody: SignUpBody): SignUpBodyValidationResult => {
	return SignUpBodyValidator.validate(signUpBody, ValidatorOptions);
};
