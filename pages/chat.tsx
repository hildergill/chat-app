import { FormEvent, FormEventHandler, useEffect, useMemo, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext as Context } from "next";
import { Socket, io } from "socket.io-client";
import events from "../events.json";
import UserToken from "../models/usertoken";
import CookieParser from "cookie-parser";
import { getUserTokenCookieName } from "../helpers/cookies";
import { verifyUserToken } from "../helpers/usertokens";
import axios, { AxiosResponse } from "axios";
import Message from "../models/message";
import { MessageBox } from "../components/MessageBox";
import { fetchLatestMessages } from "../helpers/messages";

type Props = {
	userToken: UserToken;
	initialMessages: Message[];
};

const ChatPage = (props: Props) => {
	const { userToken, initialMessages }: Props = props;

	const socketClient: Socket = useMemo(() => io(), []);

	const [messages, setMessages] = useState<Message[]>(initialMessages);

	useEffect(() => {
		socketClient.on(events.message, async () => {
			try {
				const { data }: AxiosResponse<Message[]> = await axios.get("/api/messages/");
				setMessages(data);
			} catch (error) {
				// TODO Add error handling here later
				console.error(error);
			}
		});
	}, []);

	const onSubmitMessageForm: FormEventHandler = (event: FormEvent) => {
		event.preventDefault();

		const messageInput = (event.target as any).message,
			messageString: string = messageInput.value;

		messageInput.value = null;

		socketClient.emit(events.message, userToken.user, messageString);
	};

	const messageBoxes: JSX.Element[] = messages.map((item: Message, key: number) => {
		return <MessageBox {...item} key={key} />;
	});

	return (
		<div>
			<div>{messageBoxes}</div>

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
		userTokenString = signedCookies[getUserTokenCookieName()];

	if (!userTokenString) return { redirect: { permanent: false, destination: "/" } };

	const userToken: UserToken = CookieParser.JSONCookie(userTokenString) as UserToken;

	try {
		const isLoginValid: boolean = await verifyUserToken(userToken),
			initialMessages: Message[] = await fetchLatestMessages(true);

		return isLoginValid
			? {
					props: { userToken, initialMessages: initialMessages ?? [] }
			  }
			: {
					redirect: { permanent: false, destination: "/" }
			  };
	} catch (error) {
		console.error(error);
		return { redirect: { permanent: false, destination: "/" } };
	}
};

export default ChatPage;
