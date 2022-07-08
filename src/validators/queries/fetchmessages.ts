// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import Joi from "joi";
import ValidatorOptions from "../validatoroptions.json";
import FetchMessagesQuery from "../../models/queries/fetchmessages";

const FetchMessagesQueryValidator: Joi.ObjectSchema<FetchMessagesQuery> = Joi.object<FetchMessagesQuery, true, FetchMessagesQuery>({
	page: Joi.number().optional().positive().greater(0).default(1)
});

export type FetchMessagesQueryValidationResult = Joi.ValidationResult<FetchMessagesQuery>;

export const validateFetchMessagesQuery = (fetchMessagesQuery: FetchMessagesQuery): FetchMessagesQueryValidationResult => {
	return FetchMessagesQueryValidator.validate(fetchMessagesQuery, ValidatorOptions);
};
