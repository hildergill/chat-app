// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import Joi from "joi";

export const convertValidationError = (errors: Joi.ValidationErrorItem[]): string[] => {
	return errors.map((error: Joi.ValidationErrorItem) => error.message);
};
