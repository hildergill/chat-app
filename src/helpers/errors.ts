import { ValidationErrorItem } from "joi";

export const convertError = (errors: ValidationErrorItem[]): string[] => {
	return errors.map((error: ValidationErrorItem) => error.message);
};
