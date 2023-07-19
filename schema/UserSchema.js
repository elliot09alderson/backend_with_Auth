import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

async function EncryptPassword() {
  const userPassword = this.password;
  const hashedPssword = await bcrypt.hash(userPassword, 10);
  this.password = hashedPssword;
}

UserSchema.pre("save", EncryptPassword);
