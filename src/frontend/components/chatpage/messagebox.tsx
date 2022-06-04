export type MessageBoxProps = {
	content: string;
};

export const MessageBox = (props: MessageBoxProps) => {
	return (
		<div>
			<p>{props.content}</p>
		</div>
	);
};
