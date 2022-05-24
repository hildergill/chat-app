import { useTranslation } from "next-i18next";
import { PropsWithChildren } from "react";
import Error from "../models/error";

export type UserDialogProps = PropsWithChildren<{
	title: string;
	errors?: Error[];
}>;

const ErrorBox = (error: Error) => {
	const { t } = useTranslation();

	return (
		<div>
			<strong> {t(error.errorKey)}</strong>
			{error.detailsKey && <p>{t(error.detailsKey)}</p>}
		</div>
	);
};

export const UserDialog = (props: UserDialogProps) => {
	const { title, children, errors }: UserDialogProps = props;

	const getErrorBoxes = (): JSX.Element[] => {
		return errors.map((error: Error, key: number) => {
			return <ErrorBox key={key} {...error} />;
		});
	};

	return (
		<div>
			<main>
				<h1>{title}</h1>
				{children}
				{errors && getErrorBoxes()}
			</main>
		</div>
	);
};
