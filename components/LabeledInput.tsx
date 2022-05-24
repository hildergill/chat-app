export type LabelInputProps = {
	type: string;
	name: string;
	label: string;
	required: boolean;
};

export const LabelInput = (props: LabelInputProps) => {
	const { type, name, label, required }: LabelInputProps = props;

	return (
		<>
			<label htmlFor={name}>{label}</label>
			<input type={type} name={name} required={required} />
		</>
	);
};
