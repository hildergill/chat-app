import Joi from "joi";

const DisplayNameMaxLength: number = 256;
const PasswordMinLength: number = 8;

export const CreateUserValidators = Joi.object({
	displayName: Joi.string().required().max(DisplayNameMaxLength),
	password: Joi.string().required().min(PasswordMinLength),
	confirmPassword: Joi.string().required().min(PasswordMinLength).valid(Joi.ref("password"))
});
