import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { UserDialog } from "../components/userdialog";
import { FormEvent, useState } from "react";
import { DisplayNameMaxLength, PasswordMinLength } from "../../validators/uservalidators";

const IndexPage = () => {
	const [isSignUp, setSignUp] = useState<boolean>(true);

	const { t } = useTranslation();

	const pageTitle: string = t(isSignUp ? "indexpage:pageTitles.signUp" : "indexpage:pageTitles.logIn");

	return (
		<UserDialog title={pageTitle}>
			<form onSubmit={(event: FormEvent) => event.preventDefault()}>
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
