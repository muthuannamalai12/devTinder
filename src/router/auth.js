const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { validateSignUpData } = require("../utils/validator");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req?.body;
  try {
    validateSignUpData(req);
    // API Level Validation for imageUrl
    // const imageUrlValidate = validator.isURL(req.body.imageUrl);
    // if (!imageUrlValidate) {
    //   throw new Error("Please provide a valid image URL");
    // }
    const passwordHash = await bcrypt.hash(password, 10);
    // Creating a new instance of User model with user info
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    return res.status(500).send("Error " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { password, emailId } = req.body;

  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJwtToken();
      // res.cookie("token", "abcdef");
      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      res.send(user);
    } else {
      res.status(500).send("Invalid credentials");
    }
  } catch (err) {
    return res.status(500).send("Error " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.json({
    message: "Logout successfull",
  });
});

module.exports = {
  authRouter,
};
