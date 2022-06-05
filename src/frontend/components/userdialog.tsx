import { PropsWithChildren } from "react";

export type UserDialogProps = PropsWithChildren<{
	title: string;
}>;

export const UserDialog = (props: UserDialogProps) => {
	const { children, title }: UserDialogProps = props;

	return (
		<div>
			<main>
				<h1>{title}</h1>
				{children}
			</main>
		</div>
	);
};
