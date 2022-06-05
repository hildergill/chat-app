import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { UserDialog } from "../components/userdialog";
import { useState } from "react";

const IndexPage = () => {
	const [isSignUp, setSignUp] = useState<boolean>(true);

	const { t } = useTranslation();

	const pageTitle: string = t(isSignUp ? "indexpage:pageTitles.signUp" : "indexpage:pageTitles.logIn");

	return (
		<UserDialog title={pageTitle}>
			{/* TODO Add something here later */}
			{/* TODO Add something here later */}
			{/* TODO Add something here later */}
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
