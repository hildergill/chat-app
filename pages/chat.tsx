import { FormEvent, FormEventHandler, useMemo } from "react";
import { GetServerSideProps, GetServerSidePropsContext as Context } from "next";
import { Socket, io } from "socket.io-client";
import events from "../events.json";
import UserToken from "../models/usertoken";
import CookieParser from "cookie-parser";
import { getUserTokenCookieName } from "../helpers/cookie";

type Props = {
	userToken: UserToken;
};

const ChatPage = (props: Props) => {
	const socketClient: Socket = useMemo(() => io(), []);

	const onSubmitMessageForm: FormEventHandler = (event: FormEvent) => {
		event.preventDefault();

		const messageInput = (event.target as any).message,
			messageString: string = messageInput.value;

		messageInput.value = null;

		socketClient.emit(events.message.user, messageString);
	};

	return (
		<div>
			<div>
				{/* TODO Add something here later */}
				{/* TODO Add something here later */}
				{/* TODO Add something here later */}
			</div>

			<form onSubmit={onSubmitMessageForm}>
				<label htmlFor="message">Message:</label>
				<input type="text" name="message" id="message" required />
				<input type="submit" value="Send Message" />
			</form>
		</div>
	);
};

type ServerSideProps = GetServerSideProps<Props>;

export const getServerSideProps: ServerSideProps = async (context: Context) => {
	const signedCookies = CookieParser.signedCookies(context.req.cookies, process.env.BACKEND_SECRET),
		userToken = signedCookies[getUserTokenCookieName()];

	if (!userToken) return { redirect: { permanent: false, destination: "/" } };

	return {
		props: {
			userToken: CookieParser.JSONCookie(userToken) as UserToken
		}
	};
};

export default ChatPage;
