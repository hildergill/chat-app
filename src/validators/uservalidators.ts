import Joi from "joi";
import UserSignUp from "../models/usersignup";
import UserLogIn from "../models/userlogin";

export const DisplayNameMaxLength: number = 32;
export const PasswordMinLength: number = 8;

type UserSignUpValidator = Joi.ObjectSchema<UserSignUp>;
type UserLogInValidator = Joi.ObjectSchema<UserLogIn>;

export const UserSignUpValidator: UserSignUpValidator = Joi.object<UserSignUp, true, UserSignUp>({
	displayName: Joi.string().required().alphanum().max(DisplayNameMaxLength).messages({
		"string.max": "errors:inputs.displayName.max",
		"string.alphanum": "errors:inputs.displayName.alphanum"
	}),
	password: Joi.string().required().min(PasswordMinLength).messages({
		"string.min": "errors:inputs.password.min"
	}),
	confirmPassword: Joi.string().required().min(PasswordMinLength).valid(Joi.ref("password")).messages({
		"string.min": "errors:inputs.password.min",
		"any.only": "errors:inputs.password.mismatch"
	}),
	isAdmin: Joi.boolean().default(false)
}).messages({
	"any.required": "errors:inputs.required"
});

export const UserLogInValidator: UserLogInValidator = Joi.object<UserLogIn, true, UserLogIn>({
	displayName: Joi.string().required().alphanum().max(DisplayNameMaxLength).messages({
		"string.max": "errors:inputs.displayName.max",
		"string.alphanum": "errors:inputs.displayName.alphanum"
	}),
	password: Joi.string().required().min(PasswordMinLength).messages({
		"string.min": "errors:inputs.password.min"
	})
}).messages({
	"any.required": "errors:inputs.required"
});
