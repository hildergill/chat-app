import Joi from "joi";
import { SignUpBody, LogInBody } from "../backend/routes/usersroute";

const DisplayNameMaxLength: number = 256;
const PasswordMinLength: number = 8;

export const SignUpValidator = Joi.object<SignUpBody, true, SignUpBody>({
	displayName: Joi.string().required().max(DisplayNameMaxLength),
	password: Joi.string().required().min(PasswordMinLength),
	confirmPassword: Joi.string().required().min(PasswordMinLength).valid(Joi.ref("password"))
});

export const LogInValidator = Joi.object<LogInBody, true, LogInBody>({
	displayName: Joi.string().required().max(DisplayNameMaxLength),
	password: Joi.string().required().min(PasswordMinLength)
});
