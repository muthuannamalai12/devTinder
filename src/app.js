const express = require("express");
const { connectToDb } = require("./config/database");
const { User } = require("./models/user");
const validator = require("validator");
const { validateSignUpData } = require("./utils/validator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { checkUserAccess } = require("./middleware/auth");

const app = express();

const { authRouter } = require("./router/auth");
const { profileRouter } = require("./router/profile");
const { connectionRequestRouter } = require("./router/connectionRequestRouter");

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);

connectToDb()
  .then(() => {
    console.log("Database connection established Successfully");
    app.listen(7777, () => {
      console.log("Application Successfully started on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database connection not established successfully");
  });
