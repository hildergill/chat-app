import { Router, Request, Response } from "express";
import { createUser, fetchUserByDisplayName } from "../../helpers/users";
import User from "../../models/user";
import { UserSignUpValidator, UserLogInValidator } from "../../validators/uservalidators";

const UsersRoute: Router = Router();
export default UsersRoute;

UsersRoute.post("/signup/", async (req: Request, res: Response) => {
	const { error, value } = UserSignUpValidator.validate(req.body, { abortEarly: false });
	if (error) return res.status(400).end();

	await createUser(value.displayName, value.password, value.isAdmin);

	const createdUser: User = await fetchUserByDisplayName(value.displayName);
});
