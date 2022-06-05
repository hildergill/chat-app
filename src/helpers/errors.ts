import { ValidationErrorItem } from "joi";

export const convertErrors = (errors: ValidationErrorItem[]): string[] => {
	return errors.map((error: ValidationErrorItem) => {
		console.log(error.type);
		return error.message;
	});
};
