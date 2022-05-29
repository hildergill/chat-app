// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import Joi from "joi";
import Error from "../models/error";

export const convertValidationError = (errors: Joi.ValidationError): Error[] => {
	return errors.details.map((item: Joi.ValidationErrorItem) => {
		return { errorKey: item.message };
	});
};
