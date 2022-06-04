import Joi from "joi";
import UserSignUp from "../models/usersignup";
import UserLogIn from "../models/userlogin";

export const DisplayNameMaxLength: number = 32;
export const PasswordMinLength: number = 8;

type UserSignUpValidator = Joi.ObjectSchema<UserSignUp>;
type UserLogInValidator = Joi.ObjectSchema<UserLogIn>;

export const UserSignUpValidator: UserSignUpValidator = Joi.object<UserSignUp, true, UserSignUp>({
	displayName: Joi.string().required().alphanum().max(DisplayNameMaxLength),
	password: Joi.string().required().min(PasswordMinLength),
	confirmPassword: Joi.string().required().min(PasswordMinLength).valid(Joi.ref("password")),
	isAdmin: Joi.boolean().default(false)
});

export const UserLogInValidator: UserLogInValidator = Joi.object<UserLogIn, true, UserLogIn>({
	displayName: Joi.string().required().alphanum().max(DisplayNameMaxLength),
	password: Joi.string().required().min(PasswordMinLength)
});
