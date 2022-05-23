import Joi from "joi";
import { SignUpBody, LogInBody } from "../backend/routes/usersroute";

const DisplayNameMaxLength: number = 256;
const PasswordMinLength: number = 8;

export const SignUpValidator = Joi.object<SignUpBody, true, SignUpBody>({
	displayName: Joi.string().required().max(DisplayNameMaxLength).messages({
		"string.max": "errrors:inputs.displayName.max"
	}),
	password: Joi.string().required().min(PasswordMinLength).messages({
		"string.min": "errors:inputs.password.min"
	}),
	confirmPassword: Joi.string().required().min(PasswordMinLength).valid(Joi.ref("password")).messages({
		"string.min": "errors:inputs.password.min",
		"object.valid": "errors:confirmPassword.mismatch"
	})
}).messages({
	"any.required": "errors:inputs.required"
});

export const LogInValidator = Joi.object<LogInBody, true, LogInBody>({
	displayName: Joi.string().required().max(DisplayNameMaxLength).messages({
		"string.max": "errrors:inputs.displayName.max"
	}),
	password: Joi.string().required().min(PasswordMinLength).messages({
		"string.min": "errors:inputs.password.min"
	})
}).messages({
	"any.required": "errors:inputs.required"
});
