import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { UserDialog } from "../components/userdialog";
import { FormEvent, FormEventHandler, useState } from "react";
import { DisplayNameMaxLength, PasswordMinLength } from "../../validators/uservalidators";
import axios, { AxiosError } from "axios";

import IndexStyles from "../stylesheets/pages/index.module.scss";

const IndexPage = () => {
	const [isSignUp, setSignUp] = useState<boolean>(true);
	const [errors, setErrors] = useState<string[]>([]);

	const { t } = useTranslation();

	const pageTitle: string = t(isSignUp ? "indexpage:pageTitles.signUp" : "indexpage:pageTitles.logIn"),
		submitButtonText: string = t(isSignUp ? "indexpage:modes.signUp" : "indexpage:modes.logIn"),
		requestUri: string = isSignUp ? "/api/users/signup/" : "/api/users/login/";

	const signUpModeButtonStyle: string = isSignUp ? IndexStyles.active : IndexStyles.inactive,
		logInModeButtonStyle: string = isSignUp ? IndexStyles.inactive : IndexStyles.active;

	const onSubmitMainForm: FormEventHandler = async (event: FormEvent) => {
		event.preventDefault();

		const { displayName, password, confirmPassword }: any = event.target,
			requestParams = {};

		requestParams["displayName"] = displayName.value;
		requestParams["password"] = password.value;
		if (confirmPassword === null) requestParams["confirmPassword"] = confirmPassword.value;

		try {
			await axios.post(requestUri, requestParams);
			location.assign("/chat/");
		} catch (error) {
			const { response }: AxiosError<string[]> = error,
				tempErrors: string[] = response.data.map((error: string) => t(error));

			setErrors(tempErrors);
		}
	};

	return (
		<UserDialog title={pageTitle} errors={errors}>
			<div className={IndexStyles.modeSwitcher}>
				<button className={signUpModeButtonStyle} onClick={() => setSignUp(true)}>
					{t("indexpage:modes.signUp")}
				</button>

				<button className={logInModeButtonStyle} onClick={() => setSignUp(false)}>
					{t("indexpage:modes.logIn")}
				</button>
			</div>

			<form onSubmit={onSubmitMainForm} className={IndexStyles.mainForm}>
				{isSignUp ? (
					<>
						<label htmlFor="displayName">{t("indexpage:inputs.displayName")}</label>
						<input type="text" name="displayName" id="displayName" maxLength={DisplayNameMaxLength} required />

						<label htmlFor="password">{t("indexpage:inputs.password")}</label>
						<input type="password" name="password" id="password" minLength={PasswordMinLength} required />

						<label htmlFor="confirmPassword">{t("indexpage:inputs.confirmPassword")}</label>
						<input type="password" name="confirmPassword" id="confirmPassword" minLength={PasswordMinLength} required />
					</>
				) : (
					<>
						<label htmlFor="displayName">{t("indexpage:inputs.displayName")}</label>
						<input type="text" name="displayName" id="displayName" maxLength={DisplayNameMaxLength} required />

						<label htmlFor="password">{t("indexpage:inputs.password")}</label>
						<input type="password" name="password" id="password" minLength={PasswordMinLength} required />
					</>
				)}

				<p>{t("indexpage:inputs.required")}</p>
				<input type="submit" value={t(submitButtonText)} />
			</form>
		</UserDialog>
	);
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	return {
		props: {
			...(await serverSideTranslations(context.locale))
		}
	};
};

export default IndexPage;
