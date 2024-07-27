export const errorHandler = (err, req, res, next) => {
  if (!err) return;
  return res.status(500).json({
    status: "error",
    message: err?.message || "Internal Server Error",
  });
};
