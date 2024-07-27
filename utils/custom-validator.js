import { check } from "express-validator";

export function validateEmail(key) {
  return check(key)
    .toLowerCase()
    .isEmail()

    .withMessage("Invalid Email Address");
}
export function validatePassword(key) {
  return check("password")
    .optional()
    .isStrongPassword({
      minLength: 6,
      maxLength: 32,
    })
    .withMessage("Weak password, password should be 6-32 characters long");
}
