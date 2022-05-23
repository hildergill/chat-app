import Joi from "joi";

export const validationErrorToArray = (errors: Joi.ValidationError): string[] => {
	return errors.details.map((item: Joi.ValidationErrorItem) => {
		return item.message;
	});
};
