import { PropsWithChildren } from "react";

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
		<div>
			<main>
				<h1>{title}</h1>
				{children}
				{ErrorComponents}
			</main>
		</div>
	);
};
