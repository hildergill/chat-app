import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";

const IndexPage = () => {
	const { t } = useTranslation();

	return <h1>{t("common:appName")}</h1>;
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	return {
		props: {
			...(await serverSideTranslations(context.locale))
		}
	};
};

export default IndexPage;
