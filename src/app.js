const express = require("express");
const { checkAdminAccess, checkUserAccess } = require("./middleware/auth");

const app = express();

app.get("/user/getUserData", (req, res) => {
  try {
    throw new Error("edgbhnjmkl");
  } catch (err) {
    res.send("Error occured contact support team");
  }
});

// One way to handle error other than try catch
// Always have this error at the bottom of code
// Even if we move this code above the route of /user/getUserData Error occured contact support team will only be printed since the below works only after we throw the error
// If we do not have try catch and move below at the top above the route of /user/getUserData we will get ungraceful error which we got first time
app.use("/", (err, req, res, next) => {
  if (err) {
    res.send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Application Successfully started on port 7777");
});
