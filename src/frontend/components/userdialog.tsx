import { PropsWithChildren } from "react";
import UserDialogStyles from "../stylesheets/components/userdialog.module.scss";

export type UserDialogProps = PropsWithChildren<{
	title: string;
	errors: string[];
}>;

export const UserDialog = (props: UserDialogProps) => {
	const { children, title, errors }: UserDialogProps = props;

	const ErrorComponents: JSX.Element[] = errors.map((error: string, key: number) => {
		return <p key={key}>{error}</p>;
	});

	return (
		<div className={UserDialogStyles.userDialog}>
			<main className={UserDialogStyles.mainContainer}>
				<h1>{title}</h1>
				{children}
				{ErrorComponents}
			</main>
		</div>
	);
};
