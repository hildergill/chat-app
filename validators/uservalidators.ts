// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import Joi from "joi";
import { SignUpBody, LogInBody } from "../backend/routes/usersroute";

export const getDisplayNameMaxLength = (): number => 256;
export const getPasswordMinLength = (): number => 8;

export const SignUpValidator = Joi.object<SignUpBody, true, SignUpBody>({
	displayName: Joi.string().required().max(getDisplayNameMaxLength()).messages({
		"string.max": "errrors:inputs.displayName.max"
	}),
	password: Joi.string().required().min(getPasswordMinLength()).messages({
		"string.min": "errors:inputs.password.min"
	}),
	confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
		"any.only": "errors:inputs.confirmPassword.mismatch"
	})
}).messages({
	"any.required": "errors:inputs.required"
});

export const LogInValidator = Joi.object<LogInBody, true, LogInBody>({
	displayName: Joi.string().required().max(getDisplayNameMaxLength()).messages({
		"string.max": "errrors:inputs.displayName.max"
	}),
	password: Joi.string().required().min(getPasswordMinLength()).messages({
		"string.min": "errors:inputs.password.min"
	})
}).messages({
	"any.required": "errors:inputs.required"
});
