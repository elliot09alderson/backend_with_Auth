import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { DbConnect } from "./DB/db.js";
import { config } from "dotenv";
import { UserRouter } from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";

config({ path: "./.env" });

const app = express();

// ********** USING MIDDLEWARE *****************
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// ********** USING ROUTES *****************
app.use("/api/v1", UserRouter);

DbConnect();
app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`Server connected successfully ${process.env.PORT}`);
  } else console.log(error.message);
});
