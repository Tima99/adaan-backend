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
    .toLowerCase()
    .isEmail()
    .withMessage("Invalid Email Address");
}
export function validatePassword(key) {

  return check(key)
    .isStrongPassword({
      minLength: 6,
      maxLength: 32,
    })
    .withMessage(
      "Weak password, password should be 6-32 characters long"
    );
}
