import { validationResult } from "express-validator";
import { imageUpload } from "./upload.middleware.js";

export function validateReq(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty() && !req.fileError) return next();

  if (req.file) imageUpload._delete(req.file.filename);

  let errors = {};

  result?.errors?.forEach?.((err) => {
    errors[err.path] = err.msg;
  });

  if (req.fileError) {
    errors = {
      ...errors,
      ...req.fileError,
    };
  }
  console.log({ errors });

  res.status(400).json({
    status: "error",
    message: "validation error",
    errors,
  });
}
