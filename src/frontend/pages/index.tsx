import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { UserDialog } from "../components/userdialog";
import { FormEvent, FormEventHandler, useState } from "react";
import { DisplayNameMaxLength, PasswordMinLength } from "../../validators/uservalidators";
import axios from "axios";

const IndexPage = () => {
	const [isSignUp, setSignUp] = useState<boolean>(true);

	const { t } = useTranslation();

	const pageTitle: string = t(isSignUp ? "indexpage:pageTitles.signUp" : "indexpage:pageTitles.logIn");

	const onSubmitMainForm: FormEventHandler = async (event: FormEvent) => {
		event.preventDefault();

		const { displayName, password, confirmPassword }: any = event.target,
			paramsObject = {};

		paramsObject["displayName"] = displayName.value;
		paramsObject["password"] = password.value;
		if (confirmPassword === null) paramsObject["confirmPassword"] = confirmPassword.value;

		const requestUri: string = isSignUp ? "/api/users/signup/" : "/api/users/login/";

		try {
			await axios.post(requestUri, paramsObject);
			location.assign("/chat/");
		} catch (error) {
			// TODO Add the error handling stuff here later

			console.error(error);
		}
	};

	return (
		<UserDialog title={pageTitle}>
			<div>
				<button>{t("indexpage:modes.signUp")}</button>
				<button>{t("indexpage:modes.logIn")}</button>
			</div>

			<form onSubmit={onSubmitMainForm}>
				{isSignUp ? (
					<>
						<label htmlFor="displayName">{t("indexpage:inputs.displayName")}</label>
						<input type="text" name="displayName" id="displayName" maxLength={DisplayNameMaxLength} required />

						<label htmlFor="password">{t("indexpage:inputs.password")}</label>
						<input type="password" name="password" id="password" minLength={PasswordMinLength} required />

						<label htmlFor="confirmPassword">{t("indexpage:inputs.confirmPassword")}</label>
						<input type="password" name="confirmPassword" id="confirmPassword" minLength={PasswordMinLength} required />

						<input type="submit" value={t("indexpage:modes.signUp")} />
					</>
				) : (
					<>
						<label htmlFor="displayName">{t("indexpage:inputs.displayName")}</label>
						<input type="text" name="displayName" id="displayName" maxLength={DisplayNameMaxLength} required />

						<label htmlFor="password">{t("indexpage:inputs.password")}</label>
						<input type="password" name="password" id="password" minLength={PasswordMinLength} required />

						<input type="submit" value={t("indexpage:modes.logIn")} />
					</>
				)}
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
