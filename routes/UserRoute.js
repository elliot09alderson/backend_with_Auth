import express from "express";
import {
  createUser,
  logIn,
  logOut,
  userDashboard,
} from "../controllers/UserController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
export const UserRouter = express.Router();

UserRouter.post("/register", createUser);
UserRouter.post("/login", logIn);
UserRouter.delete("/logout", logOut);
UserRouter.post("/me", isAuthenticated, userDashboard);
UserRouter.get("/test", (req, res) => res.json({ msg: "working.." }));
