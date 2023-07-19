import mongoose from "mongoose";
import { UserSchema } from "../schema/userSchema.js";
export const UserModel = mongoose.model("User", UserSchema);
