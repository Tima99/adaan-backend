import jwt from "jsonwebtoken";
export function generateJwtToken(payload) {
  try {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    return accessToken;
  } catch (error) {
    console.log("Error in SignIn", error.message);
  }
}
