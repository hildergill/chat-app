import { useTranslation } from "next-i18next";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserDialog } from "../components/UserDialog";
import { GetServerSideProps as PropsFunction, GetServerSidePropsContext as Context } from "next";
import { LabelInput } from "../components/LabeledInput";

const IndexPage = () => {
	const [isSignUp, setSignUp] = useState<boolean>(true);

	const { t } = useTranslation();

	return (
		<UserDialog title={isSignUp ? t("indexpage:pageTitle.signUp") : t("indexpage:pageTitle.logIn")}>
			<div>
				<button onClick={() => setSignUp(true)}>{t("indexpage:modeTitles.signUp")}</button>
				<button onClick={() => setSignUp(false)}>{t("indexpage:modeTitles.logIn")}</button>
			</div>

			<form>
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
