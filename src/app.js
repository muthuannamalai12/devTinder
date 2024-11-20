const express = require("express");
const { connectToDb } = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();

const { authRouter } = require("./router/auth");
const { profileRouter } = require("./router/profile");
const { connectionRequestRouter } = require("./router/connectionRequestRouter");
const { userRouter } = require("./router/user");

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);
app.use("/", userRouter);

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
