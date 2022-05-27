import { useTranslation } from "next-i18next";
import Error from "../models/error";

export const ErrorBox = (props: Error) => {
	const { errorKey, detailsKey }: Error = props;

	const { t } = useTranslation();

	return (
		<div>
			<p>{t(errorKey)}</p>
			{detailsKey && t(detailsKey)}
		</div>
	);
};
