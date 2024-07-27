import { body, param, query, validationResult } from "express-validator";

const validators = {
  ":": param,
  "?": query,
  "@": body,
};

function check(key) {
  const validator = validators[key.at(0)];
  if (!validator)
    throw new Error(
      "Missing type of key, append - [: for param] | [? for query] | [@ for body]"
    );
  return validator(key.slice(1));
}

export function validateEmail(key) {
  return check(key)
    .optional()
    .toLowerCase()
    .isEmail()

    .withMessage("invalid email id");
}
export function validatePassword(key) {
  return check(key)
    .optional()
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      maxLength: 32,
    })
    .withMessage(
      "weak password, password should be 8-32 characters long with at least 1 uppercase, 1 lowercase, 1 number and 1 symbol"
    );
}

export function validateEnum(key, type) {
  if (!type?.enum || !key)
    throw new Error("invalid or no (type or key) passed to validate");

  return check(key)
    .optional()
    .toLowerCase()
    .isIn(type.enum)
    .withMessage(`${key.slice(1)} can be - ${type.enum.join(" | ")}`);
}
