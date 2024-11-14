const express = require("express");
const { connectToDb } = require("./config/database");
const { User } = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Nanda Kishore",
    lastName: "Reddy",
    email: "nandakishore@gmail.com",
    password: "password",
  };
  // Creating a new instance of User model with user obj
  const user = new User(userObj);
  // Can also be written as
  //   const userObj = new User({
  //     firstName: "Muthu",
  //     lastName: "Annamalai",
  //     email: "muthuannamalai2002@gmail.com",
  //     password: "password",
  //   });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

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
