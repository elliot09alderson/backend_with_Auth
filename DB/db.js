import mongoose from "mongoose";

export const DbConnect = async () => {
  try {
    await mongoose
      .connect(`${process.env.MONGO_URI}`, { dbName: "GameData" })
      .then((res) => console.log("database connected"));
  } catch (error) {
    console.log(error);
  }
};
