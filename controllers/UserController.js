import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { customError } from "../utils/customError.js";

// __________LOGIN ___________

export const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please enter all fields");
    }
    const user = await UserModel.findOne({ email }).select("password");
    // console.log(user);
    if (!user) {
      throw new Error("Invalid Email or Password ");
    } else {
      const isAuthenticated = await bcrypt.compare(password, user.password);
      if (isAuthenticated) {
        generateToken(res, user, `User Validated Successfully`, 200);
      } else {
        throw new Error("Invalid Email or Password ");
      }
    }
  } catch (error) {
    customError(error, 400, false);
  }
};

// __________LOGOUT ___________

export const logOut = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    res.clearCookie("token");
  }
  res.status(200).json({
    success: true,
  });
};

// __________CREATING THE USER ___________

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password)
      throw new Error("Please give all user details");
    const isExist = await UserModel.findOne({ email });
    if (isExist) throw new Error("User already exists please login");

    const user = await UserModel.create({
      name,
      email,
      password,
    });
    // ******** TOKEN THINGS ******
    generateToken(res, user, `User Created Successfully`, 201);
  } catch (error) {
    customError(error, 500, false);
  }
};

// __________ DASHBOARD ___________

export const userDashboard = async (req, res, next) => {
  try {
    const user = await UserModel.findById({ _id: req.user.userId });
    if (!user) throw new Error("Something wrong happened try Re-Login");
    res.json({
      success: true,
      msg: `WELCOME ${user.name}`,
    });
  } catch (error) {
    customError(error, 400, false);
  }
};
