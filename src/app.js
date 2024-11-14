const express = require("express");
const { connectToDb } = require("./config/database");
const { User } = require("./models/user");
const validator = require("validator");
const { validateSignUpData } = require("./utils/validator");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { password, emailId } = req.body;

  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login Successfull");
    } else {
      res.status(500).send("Invalid credentials");
    }
  } catch (err) {
    return res.status(500).send("Error " + err.message);
  }
});

// Get all user with email Id
// We use find to get the data so even if 2 documents have the same emailId both will be returned
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req?.params.userId;
  const data = req?.body;
  try {
    const ALLOWED_UPDATES = ["imageUrl", "skills", "aboutUs", "gender", "age"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("Skills should not be more than 10");
    }
    // Below is similar to findOneAndUpdate({ _id: userId }, ...)
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("User Updated successfully");
  } catch (err) {
    res.status(500).send("Something went wrong" + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // We can also do findOneAndDelete({ _id: userId })
    const user = await User.findOneAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
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
