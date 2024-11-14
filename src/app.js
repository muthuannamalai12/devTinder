const express = require("express");
const { connectToDb } = require("./config/database");
const { User } = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of User model with user obj
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

// Get all user with email Id
// We use find to get the data so even if 2 documents have the same emailId both will be returned
app.get("/user/emailId", async (req, res) => {
  try {
    const users = await User.find({ emailId: req.body.emailId });
    if (users.length === 0) {
      res.send("No User Found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
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

// Get one user with email Id
// We use findOne to get the data so even if 2 documents have the same emailId only one will be returned
// The result returned by findOne depends on the natural order of the documents in the collection.
// The "natural order" refers to the order in which documents are stored on disk, which is typically based on their insertion order
// If you want to control which document findOne returns (e.g., the earliest or latest document), you need to use sorting with findOne.
// Model.findOne(query).sort({ createdAt: 1 }); // Returns the earliest matching document
// Model.findOne(query).sort({ createdAt: -1 }); // Returns the latest matching document
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) {
      res.send("No User Found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    // Below is similar to findOneAndUpdate({ _id: userId }, ...)
    const user = await User.findByIdAndUpdate(userId, data);
    res.send("User Updated successfully");
  } catch {
    res.status(500).send("Something went wrong");
  }
});

app.patch("/user/emailId", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;
  try {
    const user = await User.findOneAndUpdate({ emailId: emailId }, data);
    res.send("User updated successfully");
  } catch {
    res.status(500).send("Something went wrong");
  }
});

// Update User with options returnDocument: before
// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;
//   try {
//     // Gives the value before updation in user
//     const user = await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "before",
//     });
//     console.log(user);
//     res.send("User Updated successfully");
//   } catch {
//     res.status(500).send("Something went wrong");
//   }
// });

// Update User with options returnDocument: after
// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;
//   try {
//     // Gives the value after updation in user
//     const user = await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "after",
//     });
//     console.log(user);
//     res.send("User Updated successfully");
//   } catch {
//     res.status(500).send("Something went wrong");
//   }
// });

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

// Get user by _id
// Similar to findOne({ _id: id })
// Always use findById instead of findOne
app.get("/getById", async (req, res) => {
  try {
    const userId = "6735d0b8af5e90d907991caa";
    const user = await User.findById(userId);
    res.send(user);
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
