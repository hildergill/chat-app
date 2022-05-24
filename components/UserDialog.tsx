import { useTranslation } from "next-i18next";
import { PropsWithChildren } from "react";
import Error from "../models/error";

export type UserDialogProps = PropsWithChildren<{
	title: string;
	errors?: Error[];
}>;

export const UserDialog = (props: UserDialogProps) => {
	const { title, children, errors }: UserDialogProps = props;

	const { t } = useTranslation();

	const getErrorBoxes = (): JSX.Element[] =>
		errors.map((error: Error, key: number) => {
			return (
				<div key={key}>
					<strong> {t(error.errorKey)}</strong>
					{error.detailsKey && <p>{t(error.detailsKey)}</p>}
				</div>
			);
		});

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
