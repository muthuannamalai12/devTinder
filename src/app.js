const express = require("express");
const { checkAdminAccess, checkUserAccess } = require("./middleware/auth");

const app = express();

app.use("/admin", checkAdminAccess);

app.get("/admin/getAllData", (req, res) => {
  res.send("Data Retreived Successfully");
});

app.get("/admin/deleteData", (req, res) => {
  res.send("Data Deleted Successfully");
});

// If we have only one route we can directly pass the middleware in the app.get itself
app.get("/user/userData", checkUserAccess, (req, res) => {
  res.send("Details Fetched Successfully");
});

app.get("/user/login", (req, res) => {
  res.send("User Logged in Successfully");
});

// Instead of writing nested request handler we can also write like below with the same path now the 2nd route handler is in line 11 and works the same as before
app.get("/user", (req, res, next) => {
  console.log("Handling the route user 1!!");
  next();
});

app.get("/user", (req, res) => {
  console.log("Handling the route user 2!!");
  res.send("2nd Response");
});

app.listen(7777, () => {
  console.log("Application Successfully started on port 7777");
});
