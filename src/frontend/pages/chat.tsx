// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { createRef, FormEvent, FormEventHandler, RefObject, useEffect, useMemo, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext as Context } from "next";
import { Socket, io } from "socket.io-client";
import events from "../../../events.json";
import UserToken from "../../models/usertoken";
import CookieParser from "cookie-parser";
import { getUserTokenCookieName } from "../../helpers/cookies";
import { verifyUserToken } from "../../helpers/usertokens";
import axios, { AxiosResponse } from "axios";
import Message from "../../models/messages/message";
import { fetchLatestMessages } from "../../helpers/messages";
import { IconSend, IconTrash } from "@tabler/icons";
import ChatPageStyles from "../stylesheets/pages/chat.module.scss";
import { MessageBox } from "../components/messagebox";
import { fetchUsers } from "../../helpers/users";
import User from "../../models/users/user";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Connection } from "mysql";
import { createDatabaseConnection } from "../../helpers/database";

type Props = {
	userToken: UserToken;
	initialUsers: string[];
	initialMessages: Message[];
};

const ChatPage = (props: Props) => {
	const { userToken, initialUsers, initialMessages }: Props = props;

	const { t } = useTranslation();

	const socketClient: Socket = useMemo(() => io(), []);

	const messageBoxList: RefObject<HTMLUListElement> = createRef();

	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [users, setUsers] = useState<string[]>(initialUsers);

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

		socketClient.on(events.userAccount.registered, async () => {
			try {
				const { data }: AxiosResponse<string[]> = await axios.get("/api/users/");
				setUsers(data);
			} catch (error) {
				// TODO Add error handling here later
				console.error(error);
			}
		});
	}, []);

	useEffect(() => {
		messageBoxList.current!.scroll(0, messageBoxList.current!.scrollHeight);
	}, [messages]);

	const onSubmitMessageForm: FormEventHandler = (event: FormEvent) => {
		event.preventDefault();

		const messageInput = (event.target as any).message,
			messageString: string = messageInput.value;

		messageInput.value = null;

		socketClient.emit(events.message, userToken.user, messageString);
	};

	const messageBoxes: JSX.Element[] = messages.map((item: Message, key: number) => {
		return <MessageBox key={key} {...item} />;
	});

	const displayNames: JSX.Element[] = users.map((displayName: string, key: number) => {
		return <li key={key}>{displayName}</li>;
	});

	return (
		<>
			<Head>
				<title>{t("common:appTitle")}</title>
			</Head>

			<div className={ChatPageStyles.chatPage}>
				<div className={ChatPageStyles.usersList}>
					<h3>{t("chatpage:usersSection")}</h3>
					<ul>{displayNames}</ul>
				</div>

				<ul className={ChatPageStyles.messageBoxList} ref={messageBoxList}>
					{messageBoxes.reverse()}
				</ul>

				<form onSubmit={onSubmitMessageForm} className={ChatPageStyles.messageInput}>
					<input type="text" name="message" id="message" required placeholder={t("chatpage:messageInput.placeholder")} />

					<button type="reset" title={t("chatpage:resetButton.title")}>
						<IconTrash />
					</button>

					<button type="submit" title={t("chatpage:sendButton.title")}>
						<IconSend />
					</button>
				</form>
			</div>
		</>
	);
};

type ServerSideProps = GetServerSideProps<Props>;

export const getServerSideProps: ServerSideProps = async ({ req, locale }: Context) => {
	const { BACKEND_SECRET } = process.env;

	const userTokenString = CookieParser.signedCookie(req.cookies[getUserTokenCookieName()]!, String(BACKEND_SECRET));

	if (!userTokenString) return { redirect: { permanent: false, destination: "/" } };

	const userToken: UserToken = CookieParser.JSONCookie(userTokenString) as UserToken;

	const databaseConnection: Connection = createDatabaseConnection();

	try {
		const isLoginValid: boolean = await verifyUserToken(databaseConnection, userToken),
			initialMessages: Message[] = await fetchLatestMessages(databaseConnection),
			users: string[] = (await fetchUsers(databaseConnection)).map(({ displayName }: User) => displayName);

		return isLoginValid
			? {
					props: {
						userToken,
						initialUsers: users ?? [],
						initialMessages: initialMessages ?? [],
						...(await serverSideTranslations(locale ?? "en"))
					}
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
