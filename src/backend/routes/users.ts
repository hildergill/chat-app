import { Router, Request, Response } from "express";
import { createUser, fetchUserByDisplayName } from "../../helpers/users";
import { createUserToken } from "../../helpers/usertokens";
import User from "../../models/user";
import UserToken from "../../models/usertoken";
import { UserSignUpValidator, UserLogInValidator } from "../../validators/uservalidators";
import { getCookieName, getCookieOptions } from "../../helpers/cookie";
import { compare } from "bcrypt";
import { convertErrors } from "../../helpers/errors";

const UsersRoute: Router = Router();
export default UsersRoute;

UsersRoute.post("/signup/", async (req: Request, res: Response) => {
	const { error, value } = UserSignUpValidator.validate(req.body, { abortEarly: false });
	if (error) return res.json(convertErrors(error.details)).status(400).end();

	await createUser(value.displayName, value.password, value.isAdmin);

	try {
		const user: User = await fetchUserByDisplayName(value.displayName),
			userToken: UserToken = await createUserToken(user.displayName);

		return res.status(201).cookie(getCookieName(), userToken, getCookieOptions()).end();
	} catch (error) {
		console.error(error);
		return res.status(500).json([error]).end();
	}
});

UsersRoute.post("/login/", async (req: Request, res: Response) => {
	const { error, value } = UserLogInValidator.validate(req.body, { abortEarly: false });
	if (error) return res.json(convertErrors(error.details)).status(400).end();

	try {
		const user: User = await fetchUserByDisplayName(value.displayName);

		if (!(await compare(value.password, user.password))) {
			return res.status(401).json(["errors:inputs.password.invalid"]).end();
		}

		const userToken: UserToken = await createUserToken(user.displayName);
		return res.status(201).cookie(getCookieName(), userToken, getCookieOptions()).end();
	} catch (error) {
		console.error(error);
		return res.status(500).json([error]).end();
	}
});
