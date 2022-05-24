import { useTranslation } from "next-i18next";
import { FormEvent, FormEventHandler, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserDialog } from "../components/UserDialog";
import { GetServerSideProps as PropsFunction, GetServerSidePropsContext as Context } from "next";
import { LabelInput } from "../components/LabeledInput";
import axios, { AxiosError } from "axios";
import Error from "../models/error";

const IndexPage = () => {
	const [isSignUp, setSignUp] = useState<boolean>(true);
	const [errors, setErrors] = useState<Error[]>([]);

	const { t } = useTranslation();

	const onSubmitMainForm: FormEventHandler = async (event: FormEvent) => {
		event.preventDefault();

		const { displayName, password, confirmPassword }: any = event.target as any;

		try {
			const requestUrl: string = isSignUp ? "/api/users/signup" : "/api/users/login",
				dataObject = {
					displayName: displayName.value,
					password: password.value
				};

			if (confirmPassword) dataObject["confirmPassword"] = confirmPassword.value;

			await axios.post(requestUrl, dataObject);
			location.assign("/chat/");
		} catch (error) {
			const { response }: AxiosError<Error[]> = error;
			setErrors(response.data);
		}
	};

	return (
		<UserDialog title={isSignUp ? t("indexpage:pageTitle.signUp") : t("indexpage:pageTitle.logIn")}>
			<div>
				<button onClick={() => setSignUp(true)}>{t("indexpage:modeTitles.signUp")}</button>
				<button onClick={() => setSignUp(false)}>{t("indexpage:modeTitles.logIn")}</button>
			</div>

			<form onSubmit={onSubmitMainForm}>
				{isSignUp ? (
					<>
						<LabelInput type="text" name="displayName" label={t("indexpage:inputs.displayName")} required={true} />
						<LabelInput type="password" name="password" label={t("indexpage:inputs.password")} required={true} />
						<LabelInput type="password" name="confirmPassword" label={t("indexpage:inputs.confirmPassword")} required={true} />
					</>
				) : (
					<>
						<LabelInput type="text" name="displayName" label={t("indexpage:inputs.displayName")} required={true} />
						<LabelInput type="password" name="password" label={t("indexpage:inputs.password")} required={true} />
					</>
				)}

				<input type="submit" value={isSignUp ? t("indexpage:modeTitles.signUp") : t("indexpage:modeTitles.logIn")} />
			</form>
		</UserDialog>
	);
};

export default IndexPage;

export const getServerSideProps: PropsFunction = async (context: Context) => {
	const { locale }: Context = context;

	return {
		props: {
			...(await serverSideTranslations(locale))
		}
	};
};
