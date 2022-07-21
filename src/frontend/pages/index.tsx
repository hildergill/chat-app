// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { useTranslation } from "next-i18next";
import { FormEvent, FormEventHandler, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps as PropsFunction, GetServerSidePropsContext as Context } from "next";
import axios, { AxiosError } from "axios";
import ValidatorConstants from "../../validators/validatorconstants.json";
import IndexPageStyle from "../stylesheets/pages/index.module.scss";
import Head from "next/head";

const IndexPage = () => {
	const [isSignUp, setSignUp] = useState<boolean>(true);
	const [errors, setErrors] = useState<string[]>([]);

	const { t } = useTranslation();

	const onSubmitMainForm: FormEventHandler = async (event: FormEvent) => {
		event.preventDefault();

		const { displayName, password, confirmPassword }: any = event.target as any;

		try {
			const requestUrl: string = isSignUp ? "/api/users/signup" : "/api/users/login",
				dataObject: any = {
					displayName: displayName.value,
					password: password.value
				};

			if (confirmPassword) dataObject["confirmPassword"] = confirmPassword.value;

			await axios.post(requestUrl, dataObject);
			location.assign("/chat/");
		} catch (error) {
			const { response }: AxiosError<string[]> = error as AxiosError<string[]>;
			setErrors(response!.data);
		}
	};

	const getErrorBoxes = (): JSX.Element[] => {
		return errors.map((error: string, key: number) => {
			return <p key={key}>{t(error)}</p>;
		});
	};

	return (
		<>
			<Head>
				<title>{isSignUp ? t("indexpage:pageTitle.signUp") : t("indexpage:pageTitle.logIn")}</title>
			</Head>

			<div className={IndexPageStyle.indexPage}>
				<main className={IndexPageStyle.mainContainer}>
					<h1>{isSignUp ? t("indexpage:pageTitle.signUp") : t("indexpage:pageTitle.logIn")}</h1>

					<div className={IndexPageStyle.tabSelector}>
						<button className={isSignUp ? IndexPageStyle.active : IndexPageStyle.inactive} onClick={() => setSignUp(true)}>
							{t("indexpage:modeTitles.signUp")}
						</button>

						<button className={isSignUp ? IndexPageStyle.inactive : IndexPageStyle.active} onClick={() => setSignUp(false)}>
							{t("indexpage:modeTitles.logIn")}
						</button>
					</div>

					<form onSubmit={onSubmitMainForm} className={IndexPageStyle.userForm}>
						{isSignUp ? (
							<>
								<label htmlFor="displayName">{t("indexpage:inputs.displayName")}</label>
								<input type="text" name="displayName" id="displayName" required maxLength={ValidatorConstants.userInputs.displayMaxName} />

								<label htmlFor="password">{t("indexpage:inputs.password")}</label>
								<input type="password" name="password" id="password" required minLength={ValidatorConstants.userInputs.passwordMinLength} />

								<label htmlFor="confirmPassword">{t("indexpage:inputs.confirmPassword")}</label>
								<input
									type="password"
									name="confirmPassword"
									id="confirmPassword"
									required
									minLength={ValidatorConstants.userInputs.passwordMinLength}
								/>

								<input type="submit" value={t("indexpage:modeTitles.signUp")} />
							</>
						) : (
							<>
								<label htmlFor="displayName">{t("indexpage:inputs.displayName")}</label>
								<input type="text" name="displayName" id="displayName" required maxLength={ValidatorConstants.userInputs.displayMaxName} />

								<label htmlFor="password">{t("indexpage:inputs.password")}</label>
								<input type="password" name="password" id="password" required minLength={ValidatorConstants.userInputs.passwordMinLength} />

								<input type="submit" value={t("indexpage:modeTitles.logIn")} />
							</>
						)}
					</form>

					{errors && getErrorBoxes()}
				</main>
			</div>
		</>
	);
};

export default IndexPage;

export const getServerSideProps: PropsFunction = async ({ locale }: Context) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? "en"))
		}
	};
};
