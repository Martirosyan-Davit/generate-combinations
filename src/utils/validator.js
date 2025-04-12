import Joi from 'joi';

import { AppError } from './error-handler.js';

const combinationSchema = Joi.object({
  items: Joi.array().items(Joi.number().integer().min(1).max(26)).required(),
  length: Joi.number().integer().min(1).max(10).required(),
}).required();

export const validateInput = (data) => {
  const { error, value } = combinationSchema.validate(data, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message).join('; ');

    throw new AppError(`Validation error: ${messages}`, 400);
  }

  return value;
};

export const validateCombinationLength = (items, length) => {
  // eslint-disable-next-line unicorn/prefer-code-point
  const uniquePrefixes = new Set(items.map((_, i) => String.fromCharCode(65 + i))).size;

  if (length > uniquePrefixes) {
    throw new AppError(
      `Combination length (${length}) cannot exceed number of unique prefixes (${uniquePrefixes})`,
      400,
    );
  }
};
