import { Router, Request, Response, response } from "express";
import { createUser, fetchUserByDisplayName } from "../../helpers/users";
import { createUserToken } from "../../helpers/usertokens";
import User from "../../models/user";
import UserToken from "../../models/usertoken";
import { UserSignUpValidator, UserLogInValidator } from "../../validators/uservalidators";
import { getCookieName, getCookieOptions } from "../../helpers/cookie";

const UsersRoute: Router = Router();
export default UsersRoute;

UsersRoute.post("/signup/", async (req: Request, res: Response) => {
	const { error, value } = UserSignUpValidator.validate(req.body, { abortEarly: false });
	if (error) return res.status(400).end();

	await createUser(value.displayName, value.password, value.isAdmin);

	try {
		const user: User = await fetchUserByDisplayName(value.displayName),
			userToken: UserToken = await createUserToken(user.displayName);

		return response.status(201).cookie(getCookieName(), userToken, getCookieOptions()).end();
	} catch (error) {
		console.error(error);
		return res.status(500).end();
	}
});
