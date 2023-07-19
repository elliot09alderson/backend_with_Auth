import jwt from "jsonwebtoken";
import { customError } from "../utils/customError.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("session expired Please Login !");
    const isVerified = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = isVerified;
    if (isVerified) return next();
    else {
      throw new Error("session expired Please Login !");
    }
  } catch (error) {
    customError(error, 404, false);
  }
};
