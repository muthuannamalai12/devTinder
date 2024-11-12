const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.end("Hello World");
});

app.use("/test", (req, res) => {
  res.end("Hello from Test");
});

app.use("/", (req, res) => {
  res.end("Namaste World, How are you!!");
});

app.listen(7777, () => {
  console.log("Application Successfully started on port 7777");
});
