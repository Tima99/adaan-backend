import jwt from "jsonwebtoken";
import User from "../models/user.model";

const isUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findOne({ phone: payload.phone });

      req.user = user;
    } catch (err) {
      console.error(err.message);
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default isUser;
